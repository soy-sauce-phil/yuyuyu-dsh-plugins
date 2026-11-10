/**
 * An engine for Legado (阅读) style book sources.
 *
 * Rules: `@css:`, `@json:` / `$.` JSONPath, default JSOUP syntax
 * (class./tag./id./text./children with indexes), `:regex` AllInOne lists,
 * `||` / `&&` / `%%`, `##regex##replacement`, `{{rule-or-js}}` and `{$.x}`
 * templates, `@put:{}` / `@get:{}`, a leading `-` to reverse, nextTocUrl /
 * nextContentUrl, `url,{options}`, `<a,b>` page lists.
 * JavaScript (`@js:`, `<js>…</js>`, `{{js}}`, jsLib, java.*) runs in the
 * QuickJS sandbox of ./js-runtime.js. XPath rules are not supported.
 *
 * Network guard: only http(s), no loopback / private / link-local targets
 * (checked on every redirect hop), per-request and per-operation deadlines,
 * and a request budget per operation.
 *
 * Extension (not part of Legado): `ruleToc.x_splitRegex` splits one long page
 * (e.g. a Project Gutenberg HTML book) into chapters by heading lines.
 */
import crypto from 'node:crypto'
import dns from 'node:dns/promises'
import net from 'node:net'
import * as cheerio from 'cheerio'
import iconv from 'iconv-lite'
import { JSONPath } from 'jsonpath-plus'
import { JsError, createJsRuntime } from './js-runtime.js'

const UA = 'Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36'
const REQUEST_TIMEOUT_MS = 20000
const LONG_REQUEST_TIMEOUT_MS = 60000
const REQUEST_BUDGET = 150
const MAX_BODY_BYTES = 30 * 1024 * 1024
const ALLOW_PRIVATE = process.env.NOVEL_READER_ALLOW_PRIVATE === '1'
const DEVICE_ID = crypto.randomBytes(8).toString('hex')

export class SourceError extends Error {}

// ---------------------------------------------------------------- shared state (process memory)

const sourceVarStore = new Map()
const cookieJar = new Map()

function sourceVars(source) {
  let m = sourceVarStore.get(source.bookSourceUrl)
  if (!m) { m = new Map(); sourceVarStore.set(source.bookSourceUrl, m) }
  return m
}

const cookies = {
  forUrl(url) {
    let host
    try { host = new URL(url).hostname } catch { return '' }
    const out = new Map()
    for (const [domain, jar] of cookieJar) {
      if (host === domain || host.endsWith('.' + domain)) for (const [k, v] of jar) out.set(k, v)
    }
    return [...out].map(([k, v]) => `${k}=${v}`).join('; ')
  },
  store(url, setCookies) {
    let host
    try { host = new URL(url).hostname } catch { return }
    for (const line of setCookies) {
      const [pair, ...attrs] = line.split(';')
      const i = pair.indexOf('=')
      if (i <= 0) continue
      const domainAttr = attrs.map((a) => a.trim()).find((a) => /^domain=/i.test(a))
      const domain = domainAttr ? domainAttr.slice(7).replace(/^\./, '').toLowerCase() : host
      if (host !== domain && !host.endsWith('.' + domain)) continue
      let jar = cookieJar.get(domain)
      if (!jar) { jar = new Map(); cookieJar.set(domain, jar) }
      jar.set(pair.slice(0, i).trim(), pair.slice(i + 1).trim())
    }
  },
  set(url, text) { cookies.store(url, String(text || '').split(/;\s*/).filter(Boolean)) },
  key(url, k) {
    const m = new RegExp(`(?:^|; )${String(k).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=([^;]*)`).exec(cookies.forUrl(url))
    return m ? m[1] : ''
  },
  remove(url) {
    let host
    try { host = new URL(url).hostname } catch { return }
    for (const domain of [...cookieJar.keys()]) if (host === domain || host.endsWith('.' + domain) || domain.endsWith('.' + host)) cookieJar.delete(domain)
  },
}

// ---------------------------------------------------------------- network guard

function isPrivateIp(ip) {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split('.').map(Number)
    return a === 0 || a === 10 || a === 127 || (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || a >= 224
    // 198.18.0.0/15 is deliberately allowed: proxy tools (Clash/Surge fake-ip) resolve every domain into it.
  }
  const v6 = ip.toLowerCase()
  if (v6 === '::' || v6 === '::1') return true
  const mapped = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/.exec(v6)
  if (mapped) return isPrivateIp(mapped[1])
  return /^f[cd]/.test(v6) || /^fe[89ab]/.test(v6) || /^ff/.test(v6)
}

async function assertPublicUrl(target) {
  let u
  try { u = new URL(target) } catch { throw new SourceError(`invalid URL: ${target}`) }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') throw new SourceError(`only http(s) URLs are allowed: ${target}`)
  if (ALLOW_PRIVATE) return
  const host = u.hostname.replace(/^\[|\]$/g, '')
  if (/^localhost$/i.test(host) || /\.localhost$/i.test(host)) throw new SourceError(`blocked local address: ${host}`)
  let addrs
  if (net.isIP(host)) addrs = [{ address: host }]
  else {
    try { addrs = await dns.lookup(host, { all: true }) } catch { throw new SourceError(`cannot resolve ${host}`) }
  }
  if (addrs.some((a) => isPrivateIp(a.address))) throw new SourceError(`blocked private-network address: ${host}`)
}

// ---------------------------------------------------------------- url helpers

function encodeWith(charset, value) {
  const bytes = !charset || /^utf-?8$/i.test(charset) ? Buffer.from(value, 'utf8') : iconv.encode(value, charset)
  let out = ''
  for (const b of bytes) {
    const c = String.fromCharCode(b)
    out += /[A-Za-z0-9\-_.~]/.test(c) ? c : '%' + b.toString(16).toUpperCase().padStart(2, '0')
  }
  return out
}

function encodePart(value, charset) {
  if (/^[\x21-\x7e]*$/.test(value) && !/["<>\\^`{|}]/.test(value)) return value
  return encodeWith(charset, value)
}

function encodeQuery(qs, charset) {
  return qs.split('&').map((pair) => {
    const i = pair.indexOf('=')
    return i < 0 ? encodePart(pair, charset) : pair.slice(0, i) + '=' + encodePart(pair.slice(i + 1), charset)
  }).join('&')
}

function splitUrlOptions(raw) {
  const text = String(raw ?? '')
  const idx = text.search(/,\s*\{/)
  if (idx < 0) return { url: text.trim(), options: {} }
  const tail = text.slice(idx + 1).trim()
  for (const candidate of [tail, tail.replace(/'/g, '"')]) {
    try { return { url: text.slice(0, idx).trim(), options: JSON.parse(candidate) } } catch {}
  }
  return { url: text.trim(), options: {} }
}

function absolute(url, base) {
  if (!url) return ''
  const { url: u, options } = splitUrlOptions(url)
  let abs
  try { abs = new URL(u, base).href } catch { abs = u }
  return Object.keys(options).length ? `${abs},${JSON.stringify(options)}` : abs
}

function sniffCharset(buf, contentType) {
  const m = /charset=["']?([\w-]+)/i.exec(contentType || '')
  if (m) return m[1]
  const head = buf.subarray(0, 4096).toString('latin1')
  const meta = /<meta[^>]+charset=["']?([\w-]+)/i.exec(head)
  return meta ? meta[1] : 'utf-8'
}

function parseJsonLoose(text) {
  if (!text) return {}
  if (typeof text === 'object') return text
  const t = String(text).trim()
  for (const c of [t, t.replace(/'/g, '"')]) { try { return JSON.parse(c) } catch {} }
  return {}
}

// ---------------------------------------------------------------- documents

function makeDoc(text, url) {
  const raw = typeof text === 'string' ? text : text === null || text === undefined ? '' : typeof text === 'object' ? JSON.stringify(text) : String(text)
  const t = raw.trim()
  if (t.startsWith('{') || t.startsWith('[')) {
    try { return { kind: 'json', json: JSON.parse(t), url, raw } } catch {}
  }
  return { kind: 'html', $: cheerio.load(raw), url, raw }
}

function rootNode(doc) {
  return doc.kind === 'json' ? { doc, node: doc.json, root: true } : { doc, node: doc.$.root()[0], root: true }
}

function jsonCtx(value, url) {
  return { doc: { kind: 'json', json: value, url, raw: null }, node: value }
}

// ---------------------------------------------------------------- rule parsing

function splitJs(rule) {
  const out = []
  const re = /<js>([\s\S]*?)<\/js>|@js:([\s\S]*)$/gi
  let last = 0
  let m
  while ((m = re.exec(rule))) {
    if (m.index > last) out.push({ js: false, text: rule.slice(last, m.index) })
    out.push({ js: true, code: m[1] ?? m[2] })
    last = re.lastIndex
    if (m[2] !== undefined) break
  }
  if (last < rule.length) out.push({ js: false, text: rule.slice(last) })
  return out
}

const hasJs = (s) => /<js>|@js:/i.test(String(s ?? ''))

function splitTop(rule, op) {
  const parts = []
  let depth = 0
  let quote = null
  let start = 0
  for (let i = 0; i < rule.length; i++) {
    const c = rule[i]
    if (quote) { if (c === quote) quote = null; continue }
    if (c === '"' || c === "'") { quote = c; continue }
    if (c === '[' || c === '(' || c === '{') depth++
    else if (c === ']' || c === ')' || c === '}') depth--
    else if (depth === 0 && rule.startsWith(op, i)) {
      parts.push(rule.slice(start, i))
      i += op.length - 1
      start = i + 1
    }
  }
  parts.push(rule.slice(start))
  return parts
}

function splitReplace(rule) {
  const i = rule.indexOf('##')
  if (i < 0) return { body: rule, replace: null }
  const rest = rule.slice(i + 2).split('##')
  return { body: rule.slice(0, i), replace: { pattern: rest[0] ?? '', replacement: rest[1] ?? '', first: rest.length > 2 } }
}

function applyReplace(value, replace) {
  if (!replace || !replace.pattern) return value
  let re
  try { re = new RegExp(replace.pattern, replace.first ? '' : 'g') } catch { return value.split(replace.pattern).join(replace.replacement) }
  if (replace.first) {
    const m = re.exec(value)
    return m ? m[0].replace(re, replace.replacement) : ''
  }
  return value.replace(re, replace.replacement)
}

function detectMode(rule) {
  if (/^@css:/i.test(rule)) return { mode: 'css', rule: rule.replace(/^@css:/i, '') }
  if (/^@json:/i.test(rule)) return { mode: 'json', rule: rule.replace(/^@json:/i, '') }
  if (/^@xpath:/i.test(rule) || rule.startsWith('//')) throw new SourceError('XPath rules are not supported')
  if (rule.startsWith('$.') || rule.startsWith('$[')) return { mode: 'json', rule }
  if (rule.startsWith('@@')) return { mode: 'default', rule: rule.slice(2) }
  return { mode: 'default', rule }
}

function jsonQuery(node, path) {
  if (node === undefined || node === null) return []
  try { return JSONPath({ path, json: node, wrap: true }) ?? [] } catch { return [] }
}

function parseIndexSpec(spec) {
  const out = { pick: [] }
  for (const part of spec.split(',')) {
    const p = part.trim()
    if (!p) continue
    if (p.includes(':')) {
      const [s, e, st] = p.split(':').map((x) => (x.trim() === '' ? undefined : Number(x)))
      out.pick.push({ range: [s, e, st] })
    } else out.pick.push({ index: Number(p) })
  }
  return out
}

function applyIndex(list, spec, exclude) {
  if (!spec) return list
  const n = list.length
  const norm = (i) => (i < 0 ? n + i : i)
  const chosen = []
  for (const item of spec.pick) {
    if ('index' in item) chosen.push(norm(item.index))
    else {
      let [s, e, st] = item.range
      s = s === undefined ? 0 : norm(s)
      e = e === undefined ? n - 1 : norm(e)
      st = st || 1
      if (s <= e) for (let i = s; i <= e; i += Math.abs(st)) chosen.push(i)
      else for (let i = s; i >= e; i -= Math.abs(st)) chosen.push(i)
    }
  }
  if (exclude) {
    const set = new Set(chosen)
    return list.filter((_, i) => !set.has(i))
  }
  return chosen.filter((i) => i >= 0 && i < n).map((i) => list[i])
}

function parseSegment(seg) {
  let s = seg.trim()
  let index = null
  let exclude = false
  const bracket = /\[([-!\d,:\s]+)\]$/.exec(s)
  if (bracket) {
    s = s.slice(0, bracket.index)
    exclude = bracket[1].trim().startsWith('!')
    index = parseIndexSpec(bracket[1].trim().replace(/^!/, ''))
  } else {
    const bang = /!([-\d:,]+)$/.exec(s)
    if (bang) {
      s = s.slice(0, bang.index)
      index = parseIndexSpec(bang[1])
      exclude = true
    }
  }
  const typed = /^(class|tag|id|text|children)(?:\.(.*))?$/.exec(s)
  if (typed) {
    let name = typed[2] ?? ''
    if (!index) {
      const m = /\.(-?\d+(?::-?\d+)*)$/.exec(name)
      if (m && typed[1] !== 'text') {
        name = name.slice(0, m.index)
        index = parseIndexSpec(m[1].includes(':') ? m[1].split(':').join(',') : m[1])
      }
    }
    return { type: typed[1], name, index, exclude }
  }
  // Legado shorthand: `a.0`, `span.-1`, `div.2:4` = CSS selector + index.
  if (!index) {
    const m = /\.(-?\d+(?::-?\d+)*)$/.exec(s)
    if (m) {
      index = parseIndexSpec(m[1].includes(':') ? m[1].split(':').join(',') : m[1])
      s = s.slice(0, m.index)
    }
  }
  return { type: 'css', name: s, index, exclude }
}

function cssEscape(s) { return s.replace(/([^\w-])/g, '\\$1') }

function ownText($, el) {
  return $(el).contents().toArray().filter((c) => c.type === 'text').map((c) => c.data).join('').trim()
}

function selectSegment($, nodes, seg) {
  const out = []
  for (const node of nodes) {
    const $n = $(node)
    let found
    switch (seg.type) {
      case 'children': found = $n.children().toArray(); break
      case 'class': {
        const sel = seg.name.trim().split(/\s+/).map((c) => '.' + cssEscape(c)).join('')
        found = $n.find(sel).toArray()
        break
      }
      case 'tag': found = $n.find(seg.name).toArray(); break
      case 'id': found = $n.find('#' + cssEscape(seg.name)).toArray(); break
      case 'text': found = $n.find('*').toArray().filter((el) => ownText($, el).includes(seg.name)); break
      default: {
        try { found = $n.find(seg.name).toArray() } catch { throw new SourceError(`invalid selector: ${seg.name}`) }
      }
    }
    out.push(...applyIndex(found, seg.index, seg.exclude))
  }
  return out
}

const ATTR_GETTERS = new Set(['text', 'textNodes', 'ownText', 'html', 'all', 'href', 'src'])

function getAttr($, el, attr, baseUrl) {
  switch (attr) {
    case 'text': return $(el).text().replace(/[ \t\r\n]+/g, ' ').trim()
    case 'textNodes': return $(el).contents().toArray().filter((c) => c.type === 'text').map((c) => c.data.trim()).filter(Boolean).join('\n')
    case 'ownText': return ownText($, el)
    case 'html': {
      const $c = $(el).clone()
      $c.find('script,style').remove()
      return $c.html() ?? ''
    }
    case 'all': return $.html(el)
    default: {
      const abs = attr.startsWith('abs:')
      const name = abs ? attr.slice(4) : attr
      const v = $(el).attr(name)
      if (v === undefined) return ''
      if ((abs || name === 'href' || name === 'src') && baseUrl) {
        try { return new URL(v, baseUrl).href } catch { return v }
      }
      return v
    }
  }
}

// ---------------------------------------------------------------- analyzer (one book operation)

class Analyzer {
  constructor(source, { book, chapter, signal, timeoutMs, bindings } = {}) {
    this.source = source
    this.book = book || null
    this.chapter = chapter || null
    this.signal = signal
    this.deadline = Date.now() + (timeoutMs ?? 120000)
    this.requests = 0
    this.bindings = bindings || {}
    this.sourceVars = sourceVars(source)
    this.bookVars = new Map(Object.entries(book?.variables || {}))
    this.chapterVars = new Map()
    this.elements = []
    this.current = null
    this.logs = []
    this.runtime = null
  }

  get vars() {
    return {
      get: (k) => (this.bookVars.has(k) ? this.bookVars.get(k) : this.sourceVars.get(k)),
      set: (k, v) => { this.bookVars.set(k, v); if (!this.book) this.sourceVars.set(k, v) },
    }
  }

  exportVars() { return Object.fromEntries(this.bookVars) }

  dispose() { this.runtime?.then((r) => r.dispose(), () => {}) }

  checkTime() {
    if (this.signal?.aborted) throw new SourceError('cancelled')
    if (Date.now() > this.deadline) throw new SourceError('operation timed out')
  }

  // ------------------------------------------------ JS bridge

  getRuntime() {
    if (!this.runtime) {
      this.runtime = (async () => {
        const rt = await createJsRuntime(this.jsHost())
        try {
          const lib = await this.loadJsLib()
          if (lib) await rt.eval(lib, {}, true)
        } catch (e) { rt.dispose(); throw e }
        return rt
      })()
      this.runtime.catch(() => {})
    }
    return this.runtime
  }

  async loadJsLib() {
    const lib = this.source.jsLib
    if (!lib || typeof lib !== 'string' || !lib.trim()) return ''
    const t = lib.trim()
    if (t.startsWith('{')) {
      const parts = []
      for (const u of Object.values(parseJsonLoose(t))) {
        if (typeof u === 'string' && /^https?:/i.test(u)) parts.push((await this.request(u)).body)
      }
      return parts.join('\n;\n')
    }
    return t
  }

  toJs(value) {
    if (value === null || value === undefined) return null
    if (Array.isArray(value)) return value.map((v) => this.toJs(v))
    if (typeof value !== 'object') return value
    if (value.doc) {
      if (value.root) return value.doc.raw ?? (value.doc.kind === 'json' ? value.doc.json : '')
      if (value.doc.kind === 'html') { this.elements.push(value); return { __nr: this.elements.length - 1 } }
      if (value.doc.kind === 'regex') return value.node
      return value.node
    }
    return value
  }

  fromHandle(v) {
    if (v && typeof v === 'object' && typeof v.__nr === 'number' && this.elements[v.__nr]) return this.elements[v.__nr]
    return null
  }

  async js(code, extra = {}) {
    this.checkTime()
    const rt = await this.getRuntime()
    const cur = this.current
    const bindings = {
      baseUrl: extra.baseUrl ?? cur?.doc?.url ?? this.source.bookSourceUrl,
      src: cur?.doc?.raw ?? null,
      title: this.chapter?.title ?? null,
      nextChapterUrl: this.bindings.nextChapterUrl ?? null,
      key: this.bindings.key ?? null,
      page: this.bindings.page ?? 1,
      ...extra,
    }
    bindings.result = this.toJs(extra.result)
    try {
      return await rt.eval(code, bindings)
    } catch (e) {
      if (e instanceof JsError) throw new SourceError(e.message)
      throw e
    }
  }

  resolveContent(content) {
    if (content === null || content === undefined) return this.current ?? rootNode(makeDoc('', this.source.bookSourceUrl))
    const el = this.fromHandle(content)
    if (el) return el
    if (typeof content === 'object') return jsonCtx(content, this.current?.doc?.url)
    return rootNode(makeDoc(String(content), this.current?.doc?.url ?? this.source.bookSourceUrl))
  }

  jsHost() {
    const self = this
    return {
      source: this.source,
      book: this.book ? { ...this.book, variables: undefined } : null,
      chapter: this.chapter,
      vars: this.vars,
      sourceVars: this.sourceVars,
      bookVars: this.bookVars,
      chapterVars: this.chapterVars,
      cookies: {
        get: (u) => cookies.forUrl(String(u)),
        key: (u, k) => cookies.key(String(u), k),
        set: (u, c) => cookies.set(String(u), c),
        remove: (u) => cookies.remove(String(u)),
      },
      deviceId: DEVICE_ID,
      userAgent: UA,
      deadline: this.deadline,
      log: (m) => { self.logs.push(String(m).slice(0, 500)); if (self.logs.length > 50) self.logs.shift() },
      htmlFormat: (s) => htmlToParagraphs(s).join('\n'),
      request: async (rawUrl, opts = {}) => {
        const req = await self.buildUrl(String(rawUrl), {}, false)
        if (opts.method) req.method = opts.method
        if (opts.body !== undefined) req.body = opts.body
        if (opts.headers) Object.assign(req.headers, opts.headers)
        const res = await self.request(req)
        return { body: res.body, code: res.code, url: res.url, headers: res.headers }
      },
      getStrings: async (rule, content, isUrl) => {
        const ctx = self.resolveContent(content)
        const saved = self.current
        try {
          const list = await self.getStrings(ctx, String(rule ?? ''))
          return isUrl ? list.map((s) => absolute(s, ctx.doc.url)) : list
        } finally { self.current = saved }
      },
      getElements: async (rule, content) => {
        const ctx = self.resolveContent(content)
        const saved = self.current
        try { return self.toJs(await self.getElements(ctx, String(rule ?? ''))) } finally { self.current = saved }
      },
      setContent: (content, baseUrl) => {
        self.current = rootNode(makeDoc(content, baseUrl ? String(baseUrl) : self.current?.doc?.url ?? self.source.bookSourceUrl))
      },
      parseHtml: (html) => {
        const doc = makeDoc(String(html), self.current?.doc?.url ?? self.source.bookSourceUrl)
        if (doc.kind !== 'html') doc.$ = cheerio.load(doc.raw)
        doc.kind = 'html'
        return self.toJs({ doc, node: doc.$.root()[0] })
      },
      element: (id, op, arg) => {
        const ctx = self.elements[id]
        if (!ctx) throw new SourceError('stale element')
        const $ = ctx.doc.$
        const el = ctx.node
        const wrap = (nodes) => self.toJs(nodes.map((node) => ({ doc: ctx.doc, node })))
        switch (op) {
          case 'text': return getAttr($, el, 'text')
          case 'ownText': return ownText($, el)
          case 'html': return $(el).html() ?? ''
          case 'outerHtml': return $.html(el)
          case 'attr': return getAttr($, el, String(arg ?? ''), null)
          case 'absUrl': return getAttr($, el, 'abs:' + String(arg ?? ''), ctx.doc.url)
          case 'hasClass': return $(el).hasClass(String(arg ?? ''))
          case 'tagName': return el.tagName || el.name || ''
          case 'select': try { return wrap($(el).find(String(arg ?? '')).toArray()) } catch { return [] }
          case 'children': return wrap($(el).children().toArray())
          case 'parent': return wrap($(el).parent().toArray())[0] ?? null
          default: throw new SourceError(`unsupported element method ${op}`)
        }
      },
    }
  }

  // ------------------------------------------------ network

  async headers() {
    let h = this.source.header
    if (!h) return {}
    if (typeof h === 'string' && hasJs(h)) {
      if (this._headers) return this._headers
      let result = ''
      for (const s of splitJs(h.trim())) result = s.js ? await this.js(s.code, { result }) : s.text.trim() || result
      h = result
    }
    const parsed = parseJsonLoose(h)
    this._headers = parsed && typeof parsed === 'object' ? parsed : {}
    return this._headers
  }

  async buildUrl(ruleUrl, vars = {}, fill = true) {
    let text = String(ruleUrl ?? '').trim()
    const key = vars.key ?? this.bindings.key ?? ''
    const page = vars.page ?? this.bindings.page ?? 1
    if (hasJs(text)) {
      let result = ''
      for (const s of splitJs(text)) result = s.js ? String((await this.js(s.code, { result, key, page })) ?? '') : s.text.trim() || result
      text = result.trim()
    }
    if (fill || text.includes('{{')) {
      if (fill) {
        text = text.replace(/<([^<>]*,[^<>]*)>/g, (_, list) => {
          const items = list.split(',')
          return (items[page - 1] ?? items[items.length - 1]).trim()
        })
      }
      const parts = []
      let last = 0
      const re = /\{\{([\s\S]+?)\}\}/g
      let m
      while ((m = re.exec(text))) {
        parts.push(text.slice(last, m.index))
        const e = m[1].trim()
        let v
        if (e === 'key') v = key
        else if (e === 'page') v = String(page)
        else {
          const arith = e.replace(/\bpage\b/g, String(page))
          // eslint-disable-next-line no-new-func
          if (/^[\d\s+\-*/().]+$/.test(arith)) v = String(Function(`"use strict";return (${arith})`)())
          else v = String((await this.js(e, { key, page, result: '' })) ?? '')
        }
        parts.push(v)
        last = re.lastIndex
      }
      parts.push(text.slice(last))
      text = parts.join('')
    }
    let { url, options } = splitUrlOptions(text)
    if (options.js) url = String((await this.js(options.js, { result: url, key, page })) ?? url)
    const charset = options.charset
    const q = url.indexOf('?')
    let path = q < 0 ? url : url.slice(0, q)
    path = path.replace(/[^\x00-\x7f]+/g, (s) => encodeWith(charset, s)).replace(/ /g, '%20')
    url = q < 0 ? path : path + '?' + encodeQuery(url.slice(q + 1), charset)
    let target
    for (const base of [this.current?.doc?.url, this.source.bookSourceUrl.split('#')[0], undefined]) {
      try { target = new URL(url, base || undefined).href; break } catch {}
    }
    if (!target) throw new SourceError(`invalid URL: ${url}`)
    const method = String(options.method || 'GET').toUpperCase()
    const headers = { 'User-Agent': UA, ...(await this.headers()), ...parseJsonLoose(options.headers) }
    let body
    if (method === 'POST') {
      body = options.body === undefined ? '' : typeof options.body === 'string' ? options.body : JSON.stringify(options.body)
      const json = /^\s*[{[]/.test(body)
      if (!json) body = encodeQuery(body, charset)
      if (!Object.keys(headers).some((k) => k.toLowerCase() === 'content-type')) {
        headers['Content-Type'] = json ? 'application/json' : `application/x-www-form-urlencoded${charset ? '; charset=' + charset : ''}`
      }
    }
    return { url: target, method, headers, body, charset, long: false }
  }

  async request(req) {
    if (typeof req === 'string') req = await this.buildUrl(req, {}, false)
    if (++this.requests > REQUEST_BUDGET) throw new SourceError('too many requests in one operation')
    const target = req.url
    for (let attempt = 0; ; attempt++) {
      this.checkTime()
      let method = req.method || 'GET'
      let body = req.body
      const timeoutMs = Math.max(1000, Math.min(req.long ? LONG_REQUEST_TIMEOUT_MS : REQUEST_TIMEOUT_MS, this.deadline - Date.now()))
      const timeout = AbortSignal.timeout(timeoutMs)
      const signal = this.signal && typeof AbortSignal.any === 'function' ? AbortSignal.any([this.signal, timeout]) : timeout
      try {
        let url = target
        let res
        for (let hop = 0; ; hop++) {
          await assertPublicUrl(url)
          const headers = { ...req.headers }
          const jar = cookies.forUrl(url)
          if (jar && !Object.keys(headers).some((k) => k.toLowerCase() === 'cookie')) headers.Cookie = jar
          res = await fetch(url, { method, headers, body: method === 'GET' || method === 'HEAD' ? undefined : body, redirect: 'manual', signal })
          const setCookie = typeof res.headers.getSetCookie === 'function' ? res.headers.getSetCookie() : []
          if (setCookie.length) cookies.store(url, setCookie)
          const loc = res.headers.get('location')
          if (res.status >= 300 && res.status < 400 && loc) {
            if (hop >= 8) throw new SourceError('too many redirects')
            url = new URL(loc, url).href
            if (res.status !== 307 && res.status !== 308) { method = 'GET'; body = undefined }
            await res.body?.cancel().catch(() => {})
            continue
          }
          break
        }
        const len = Number(res.headers.get('content-length') || 0)
        if (len > MAX_BODY_BYTES) throw new SourceError('response is too large')
        const buf = Buffer.from(await res.arrayBuffer())
        if (buf.length > MAX_BODY_BYTES) throw new SourceError('response is too large')
        const cs = req.charset || sniffCharset(buf, res.headers.get('content-type'))
        const text = iconv.encodingExists(cs) ? iconv.decode(buf, cs) : buf.toString('utf8')
        const headers = {}
        res.headers.forEach((v, k) => { headers[k] = v })
        return { url, code: res.status, body: text, headers }
      } catch (error) {
        if (error instanceof SourceError) throw error
        if (attempt < 1 && !this.signal?.aborted && Date.now() < this.deadline - 2000) continue
        throw new SourceError(`request failed: ${target} (${error?.cause?.code || error?.name || error?.message || error})`)
      }
    }
  }

  async fetchPage(rawUrl) {
    const req = typeof rawUrl === 'string' ? await this.buildUrl(rawUrl, {}, false) : rawUrl
    const res = await this.request(req)
    if (res.code >= 400) throw new SourceError(`HTTP ${res.code} from ${res.url}`)
    return res
  }

  // ------------------------------------------------ rules

  async applyPut(ctx, rule) {
    const re = /@put:(\{[^}]*\})/g
    for (const m of [...rule.matchAll(re)]) {
      for (const [k, r] of Object.entries(parseJsonLoose(m[1]))) this.vars.set(k, await this.getString(ctx, String(r)))
    }
    return rule.replace(re, '').replace(/@get:\{([^}]*)\}/g, (_, k) => this.vars.get(k.trim()) ?? '')
  }

  async elementsRule(ctx, rule) {
    rule = (await this.applyPut(ctx, rule)).trim()
    if (!rule) return []
    let reverse = false
    if (rule.startsWith('-')) { reverse = true; rule = rule.slice(1) }
    if (rule.startsWith('+')) rule = rule.slice(1)
    let result = null
    if (rule.startsWith(':')) {
      let re
      try { re = new RegExp(rule.slice(1), 'g') } catch { throw new SourceError('invalid AllInOne regex') }
      const text = ctx.doc.raw ?? (ctx.doc.kind === 'html' ? ctx.doc.$.html(ctx.node) : JSON.stringify(ctx.node))
      result = [...text.matchAll(re)].map((m) => ({ doc: { kind: 'regex', url: ctx.doc.url, raw: m[0] }, node: [...m] }))
    } else {
      for (const op of ['||', '&&', '%%']) {
        const parts = splitTop(rule, op)
        if (parts.length > 1) {
          const lists = parts.map((p) => this.elementsSingle(ctx, p))
          if (op === '||') result = lists.find((l) => l.length > 0) ?? []
          else if (op === '&&') result = lists.flat()
          else {
            result = []
            const max = Math.max(...lists.map((l) => l.length))
            for (let i = 0; i < max; i++) for (const l of lists) if (i < l.length) result.push(l[i])
          }
          break
        }
      }
      if (!result) result = this.elementsSingle(ctx, rule)
    }
    return reverse ? result.reverse() : result
  }

  elementsSingle(ctx, rule) {
    let { mode, rule: body } = detectMode(rule.trim())
    if (mode === 'default' && ctx.doc.kind === 'json') { mode = 'json'; body = '$.' + body }
    if (mode === 'json') {
      if (ctx.doc.kind !== 'json') return []
      return jsonQuery(ctx.node, body).flatMap((v) => (Array.isArray(v) ? v : [v])).map((node) => ({ doc: ctx.doc, node }))
    }
    if (ctx.doc.kind !== 'html') return []
    const $ = ctx.doc.$
    if (mode === 'css') {
      try { return $(ctx.node).find(body).toArray().map((node) => ({ doc: ctx.doc, node })) } catch { throw new SourceError(`invalid selector: ${body}`) }
    }
    let nodes = [ctx.node]
    for (const part of body.split('@').filter((p) => p.trim() !== '')) nodes = selectSegment($, nodes, parseSegment(part))
    return nodes.map((node) => ({ doc: ctx.doc, node }))
  }

  jsToList(value, baseUrl) {
    if (value === null || value === undefined || value === '') return []
    if (typeof value === 'string') {
      const doc = makeDoc(value, baseUrl)
      if (doc.kind === 'json' && Array.isArray(doc.json)) return doc.json.map((v) => ({ doc, node: v }))
      return [rootNode(doc)]
    }
    const list = Array.isArray(value) ? value : [value]
    return list.map((v) => this.fromHandle(v) ?? (typeof v === 'string' ? rootNode(makeDoc(v, baseUrl)) : jsonCtx(v, baseUrl)))
  }

  asCtx(cur, baseUrl) {
    if (Array.isArray(cur)) cur = cur[0]
    if (!cur) return rootNode(makeDoc('', baseUrl))
    if (cur.doc) return cur
    return rootNode(makeDoc(String(cur), baseUrl))
  }

  textOf(v) {
    if (v === null || v === undefined) return ''
    if (typeof v !== 'object') return String(v)
    const el = this.fromHandle(v)
    if (el) return getAttr(el.doc.$, el.node, 'text')
    return JSON.stringify(v)
  }

  async getElements(ctx, rawRule) {
    if (!rawRule || !String(rawRule).trim()) return []
    const baseUrl = ctx.doc.url
    let cur = ctx
    for (const seg of splitJs(String(rawRule).trim())) {
      if (seg.js) {
        this.current = this.asCtx(cur, baseUrl)
        cur = this.jsToList(await this.js(seg.code, { result: cur, baseUrl }), baseUrl)
      } else {
        const t = seg.text.trim()
        if (!t) continue
        cur = await this.elementsRule(this.asCtx(cur, baseUrl), t)
      }
    }
    return Array.isArray(cur) ? cur : [cur]
  }

  async stringsSingle(ctx, rule) {
    const { body, replace } = splitReplace(rule)
    const trimmed = body.trim()
    let values
    if (ctx.doc.kind === 'regex') {
      values = [trimmed.replace(/\$(\d+)/g, (_, n) => ctx.node[Number(n)] ?? '')]
    } else if (!trimmed) {
      values = [ctx.doc.raw ?? (ctx.doc.kind === 'html' ? ctx.doc.$.html(ctx.node) : JSON.stringify(ctx.node))]
    } else {
      let { mode, rule: r } = detectMode(trimmed)
      if (mode === 'default' && ctx.doc.kind === 'json') { mode = 'json'; r = '$.' + r }
      if (mode === 'json') {
        if (ctx.doc.kind !== 'json') return []
        values = jsonQuery(ctx.node, r).flatMap((v) => (Array.isArray(v) ? v : [v])).map((v) => (v === null || v === undefined ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v)))
      } else {
        if (ctx.doc.kind !== 'html') return []
        const $ = ctx.doc.$
        const parts = r.split('@').filter((p) => p.trim() !== '')
        if (parts.length === 0) return []
        let attr = 'text'
        const last = parts[parts.length - 1].trim()
        let selectors = parts
        if (ATTR_GETTERS.has(last) || (parts.length > 1 && /^[\w:-]+$/.test(last) && !/^(class|tag|id|text|children)\./.test(last))) {
          attr = last
          selectors = parts.slice(0, -1)
        }
        let nodes = [ctx.node]
        if (mode === 'css' && selectors.length) {
          try { nodes = $(ctx.node).find(selectors.join('@')).toArray() } catch { throw new SourceError(`invalid selector: ${selectors.join('@')}`) }
        } else for (const part of selectors) nodes = selectSegment($, nodes, parseSegment(part))
        values = nodes.map((el) => getAttr($, el, attr, ctx.doc.url))
      }
    }
    return values.map((v) => applyReplace(v, replace))
  }

  async fillTemplate(ctx, rule) {
    const parts = []
    let last = 0
    const re = /\{\{([\s\S]+?)\}\}/g
    let m
    while ((m = re.exec(rule))) {
      parts.push(rule.slice(last, m.index))
      const inner = m[1].trim()
      if (/^(@|\$\.|\$\[|\/\/)/.test(inner)) parts.push(await this.getString(ctx, inner))
      else {
        this.current = ctx
        parts.push(this.textOf(await this.js(inner, { result: ctx, baseUrl: ctx.doc.url })))
      }
      last = re.lastIndex
    }
    parts.push(rule.slice(last))
    let out = parts.join('')
    if (ctx.doc.kind === 'json') {
      const pieces = []
      let l = 0
      const re2 = /\{(\$[.[][^}]*)\}/g
      while ((m = re2.exec(out))) {
        pieces.push(out.slice(l, m.index), await this.getString(ctx, m[1]))
        l = re2.lastIndex
      }
      pieces.push(out.slice(l))
      out = pieces.join('')
    }
    return out
  }

  async stringsRule(ctx, rawRule) {
    const rule = (await this.applyPut(ctx, rawRule.trim())).trim()
    if (!rule) return []
    if (rule.includes('{{') || (ctx.doc.kind === 'json' && /\{\$[.[]/.test(rule) && !rule.startsWith('$'))) {
      const { body, replace } = splitReplace(rule)
      return [applyReplace(await this.fillTemplate(ctx, body), replace)]
    }
    for (const op of ['||', '&&', '%%']) {
      const parts = splitTop(rule, op)
      if (parts.length > 1) {
        const lists = []
        for (const p of parts) {
          const l = await this.stringsSingle(ctx, p)
          if (op === '||' && l.some((s) => s.trim() !== '')) return l
          lists.push(l)
        }
        if (op === '||') return []
        if (op === '&&') return lists.flat()
        const out = []
        const max = Math.max(...lists.map((l) => l.length))
        for (let i = 0; i < max; i++) for (const l of lists) if (i < l.length) out.push(l[i])
        return out
      }
    }
    return this.stringsSingle(ctx, rule)
  }

  async getStrings(ctx, rawRule) {
    if (!rawRule || !String(rawRule).trim()) return []
    const baseUrl = ctx.doc.url
    let cur = ctx
    let isStrings = false
    for (const seg of splitJs(String(rawRule).trim())) {
      if (seg.js) {
        this.current = isStrings ? rootNode(makeDoc(cur.join('\n'), baseUrl)) : this.asCtx(cur, baseUrl)
        const v = await this.js(seg.code, { result: isStrings ? cur.join('\n') : cur, baseUrl })
        cur = v === null || v === undefined ? [] : Array.isArray(v) ? v.map((x) => this.textOf(x)) : [this.textOf(v)]
        isStrings = true
      } else {
        const t = seg.text.trim()
        if (!t) continue
        const base = isStrings ? rootNode(makeDoc(cur.join('\n'), baseUrl)) : this.asCtx(cur, baseUrl)
        cur = await this.stringsRule(base, t)
        isStrings = true
      }
    }
    return isStrings ? cur : []
  }

  async getString(ctx, rule, isUrl = false) {
    const s = (await this.getStrings(ctx, rule)).join('\n').trim()
    return isUrl ? absolute(s.split('\n')[0].trim(), ctx.doc.url) : s
  }
}

// ---------------------------------------------------------------- text extraction

const BLOCK = 'p,div,h1,h2,h3,h4,h5,h6,li,tr,section,article,blockquote,dd,dt,pre'
const CJK = /[\u3000-\u303f\u3400-\u9fff\uff00-\uffef]/

/** Convert HTML (or plain text) into an array of paragraphs. */
export function htmlToParagraphs(html, headingRe) {
  const PARA = '\u2029'
  let text
  html = String(html ?? '')
  if (/<[a-z!/][^>]*>/i.test(html)) {
    const $ = cheerio.load(html, null, false)
    $('script,style,noscript').remove()
    $('br').replaceWith(PARA)
    $(BLOCK).each((_, el) => { $(el).before(PARA); $(el).after(PARA) })
    text = $.root().text()
  } else {
    text = html
  }
  text = text.replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ')
  const hasMarkers = text.includes(PARA)
  const out = []
  for (const block of text.split(PARA)) {
    const lines = block.split(/\r?\n/)
    let cur = ''
    const flush = () => { const t = cur.replace(/^[—\-－_=＝]{6,}\s*/, '').trim(); if (t) out.push(t); cur = '' }
    for (const raw of lines) {
      const line = raw.replace(/[ \t]+$/g, '')
      const trimmed = line.trim()
      if (!trimmed) { if (!hasMarkers) flush(); continue }
      const startsPara = /^[ \t]*[\u3000]/.test(line) || /^[ \t]{2,}/.test(line) || (headingRe && headingRe.test(trimmed))
      if (!hasMarkers || startsPara || !cur) {
        flush()
        cur = trimmed
        if (headingRe && headingRe.test(trimmed)) flush()
      } else {
        const prev = cur[cur.length - 1]
        cur += CJK.test(prev) && CJK.test(trimmed[0]) ? trimmed : ' ' + trimmed
      }
    }
    flush()
  }
  return out
}

// ---------------------------------------------------------------- operations

function rules(source, key) {
  const r = source[key]
  if (!r) return {}
  if (typeof r === 'string') return parseJsonLoose(r)
  return r
}

function cleanAuthor(s) {
  return String(s || '').replace(/^\s*(作\s*者|著)\s*[:：]?\s*/, '').trim()
}

async function parseBookInfo(an, root, url) {
  const rb = rules(an.source, 'ruleBookInfo')
  let ctx = root
  if (rb.init) {
    const init = await an.getElements(root, rb.init)
    if (init.length) ctx = init[0]
  }
  const get = async (r, isUrl) => {
    if (!r) return ''
    an.current = root
    return an.getString(ctx, r, isUrl)
  }
  return {
    name: (await get(rb.name)).trim(),
    author: cleanAuthor(await get(rb.author)),
    intro: (await get(rb.intro)).slice(0, 1000),
    lastChapter: await get(rb.lastChapter),
    tocUrl: (await get(rb.tocUrl, true)) || url,
  }
}

export async function search(source, key, page = 1, signal) {
  if (!source.searchUrl) throw new SourceError('this source has no searchUrl')
  const an = new Analyzer(source, { signal, timeoutMs: 30000, bindings: { key, page } })
  try {
    const req = await an.buildUrl(source.searchUrl, { key, page }, true)
    const res = await an.fetchPage(req)
    const root = rootNode(makeDoc(res.body, res.url))
    an.current = root
    if (source.bookUrlPattern) {
      let re
      try { re = new RegExp(source.bookUrlPattern) } catch {}
      if (re && re.test(res.url)) {
        const info = await parseBookInfo(an, root, res.url)
        return info.name ? [{ name: info.name, author: info.author, intro: info.intro.slice(0, 300), lastChapter: info.lastChapter, bookUrl: res.url, variables: an.exportVars() }] : []
      }
    }
    const rs = rules(source, 'ruleSearch')
    const items = await an.getElements(root, rs.bookList)
    const out = []
    for (const item of items.slice(0, 60)) {
      const get = async (r, isUrl) => {
        if (!r) return ''
        an.current = root
        try { return await an.getString(item, r, isUrl) } catch (e) { if (r === rs.name) throw e; return '' }
      }
      const name = (await get(rs.name)).trim()
      if (!name) continue
      out.push({
        name,
        author: cleanAuthor(await get(rs.author)),
        intro: (await get(rs.intro)).slice(0, 300),
        kind: await get(rs.kind),
        lastChapter: await get(rs.lastChapter),
        bookUrl: (await get(rs.bookUrl, true)) || res.url,
        variables: an.exportVars(),
      })
    }
    return out
  } finally { an.dispose() }
}

export async function bookInfo(source, book, signal) {
  if (typeof book === 'string') book = { bookUrl: book }
  const an = new Analyzer(source, { book, signal, timeoutMs: 60000 })
  try {
    const res = await an.fetchPage(book.bookUrl)
    const root = rootNode(makeDoc(res.body, res.url))
    an.current = root
    const info = await parseBookInfo(an, root, res.url)
    return { ...info, variables: an.exportVars() }
  } finally { an.dispose() }
}

const splitCache = new Map()

function remember(key, value) {
  splitCache.set(key, value)
  while (splitCache.size > 4) splitCache.delete(splitCache.keys().next().value)
}

async function splitBook(source, tocUrl, signal) {
  const cached = splitCache.get(tocUrl)
  if (cached) return cached
  const rt = rules(source, 'ruleToc')
  let headingRe
  try { headingRe = new RegExp(rt.x_splitRegex) } catch { throw new SourceError('invalid ruleToc.x_splitRegex') }
  const an = new Analyzer(source, { signal, timeoutMs: 180000 })
  let res
  try {
    const req = await an.buildUrl(tocUrl, {}, false)
    req.long = true
    res = await an.fetchPage(req)
  } finally { an.dispose() }
  const doc = makeDoc(res.body, res.url)
  if (doc.kind === 'html' && rt.x_remove) doc.$(rt.x_remove).remove()
  const html = doc.kind === 'html' ? (rt.x_text ? doc.$(rt.x_text).html() : doc.$('body').html()) ?? '' : res.body
  const paragraphs = htmlToParagraphs(html, headingRe)
  const chapters = []
  let current = { name: '', paragraphs: [] }
  for (const p of paragraphs) {
    if (p.length <= 60 && headingRe.test(p)) {
      if (current.paragraphs.length || current.name) chapters.push(current)
      current = { name: p, paragraphs: [] }
    } else current.paragraphs.push(p)
  }
  if (current.paragraphs.length || current.name) chapters.push(current)
  const result = chapters
    .filter((c, i) => c.name || (i === 0 && c.paragraphs.join('').length > 200))
    .map((c, i) => ({ name: c.name || '前言', paragraphs: c.paragraphs, url: `${tocUrl}#novel-reader-${i}` }))
  if (result.length === 0) throw new SourceError('no chapter headings found')
  remember(tocUrl, result)
  return result
}

export async function toc(source, book, tocUrl, signal) {
  if (typeof book === 'string') { tocUrl = book; book = { bookUrl: tocUrl } }
  tocUrl = tocUrl || book.tocUrl || book.bookUrl
  const rt = rules(source, 'ruleToc')
  if (rt.x_splitRegex) {
    const chapters = await splitBook(source, tocUrl, signal)
    return { chapters: chapters.map(({ name, url }) => ({ name, url })), variables: book.variables || {} }
  }
  const an = new Analyzer(source, { book: { ...book, tocUrl }, signal, timeoutMs: 120000 })
  try {
    const chapters = []
    const seen = new Set()
    const next = [tocUrl]
    let listRule = String(rt.chapterList || '').trim()
    let reverse = false
    if (listRule.startsWith('-')) { reverse = true; listRule = listRule.slice(1) }
    for (let pageNo = 0; next.length && pageNo < 60; pageNo++) {
      const url = next.shift()
      if (seen.has(url)) continue
      seen.add(url)
      const res = await an.fetchPage(url)
      const root = rootNode(makeDoc(res.body, res.url))
      an.current = root
      const items = await an.getElements(root, listRule)
      for (const item of items) {
        an.current = root
        const name = (rt.chapterName ? await an.getString(item, rt.chapterName) : '').trim()
        if (!name) continue
        an.current = root
        const chapterUrl = rt.chapterUrl ? await an.getString(item, rt.chapterUrl, true) : ''
        chapters.push({ name, url: chapterUrl || res.url })
      }
      if (rt.nextTocUrl) {
        an.current = root
        for (const n of await an.getStrings(root, rt.nextTocUrl)) {
          for (const line of n.split('\n')) {
            const abs = absolute(line.trim(), res.url)
            if (abs && !seen.has(abs) && abs !== res.url) next.push(abs)
          }
        }
      }
    }
    if (reverse) chapters.reverse()
    return { chapters, variables: an.exportVars() }
  } finally { an.dispose() }
}

export async function content(source, book, chapter, nextChapterUrl, signal) {
  if (typeof book === 'string') { chapter = { url: book }; book = null }
  const chapterUrl = chapter.url
  const rt = rules(source, 'ruleToc')
  if (rt.x_splitRegex) {
    const tocUrl = chapterUrl.replace(/#novel-reader-\d+$/, '')
    const chapters = await splitBook(source, tocUrl, signal)
    const found = chapters.find((c) => c.url === chapterUrl)
    if (!found) throw new SourceError('chapter not found')
    return { paragraphs: found.paragraphs }
  }
  const rc = rules(source, 'ruleContent')
  if (!rc.content) throw new SourceError('this source has no ruleContent.content')
  const an = new Analyzer(source, {
    book: book || {}, chapter: { title: chapter.title || chapter.name || '', url: chapterUrl, index: chapter.index ?? 0 },
    signal, timeoutMs: 90000, bindings: { nextChapterUrl },
  })
  try {
    const paragraphs = []
    const seen = new Set()
    let url = chapterUrl
    const nextBase = String(nextChapterUrl || '').split(',{')[0]
    for (let pageNo = 0; url && pageNo < 20; pageNo++) {
      seen.add(url)
      const res = await an.fetchPage(url)
      const root = rootNode(makeDoc(res.body, res.url))
      an.current = root
      const raw = (await an.getStrings(root, rc.content)).join('\n')
      let paras = htmlToParagraphs(raw)
      if (rc.replaceRegex) {
        let text = paras.join('\n')
        const rr = String(rc.replaceRegex)
        if (hasJs(rr)) {
          an.current = root
          text = (await an.getStrings(rootNode(makeDoc(text, res.url)), rr)).join('\n')
        } else {
          for (const piece of rr.split(/(?=##)/)) text = applyReplace(text, splitReplace(piece.startsWith('##') ? piece : '##' + piece).replace)
        }
        paras = text.split('\n').map((s) => s.trim()).filter(Boolean)
      }
      paragraphs.push(...paras)
      url = ''
      if (rc.nextContentUrl) {
        an.current = root
        const n = absolute((await an.getString(root, rc.nextContentUrl)).split('\n')[0]?.trim(), res.url)
        if (n && !seen.has(n) && n.split(',{')[0] !== nextBase) url = n
      }
    }
    return { paragraphs, variables: an.exportVars() }
  } finally { an.dispose() }
}

/** Load sources from a URL or from JSON text; returns an array of book sources. */
export async function loadSources(input, signal) {
  let text = String(input ?? '').trim()
  if (/^https?:\/\//i.test(text)) {
    const an = new Analyzer({ bookSourceUrl: text }, { signal, timeoutMs: 90000 })
    try {
      const req = await an.buildUrl(text, {}, false)
      req.long = true
      text = (await an.fetchPage(req)).body.trim()
    } finally { an.dispose() }
  }
  let data
  try { data = JSON.parse(text.replace(/^\ufeff/, '')) } catch { throw new SourceError('book source text is not valid JSON') }
  const list = Array.isArray(data) ? data : [data]
  return list.filter((s) => s && typeof s === 'object' && typeof s.bookSourceUrl === 'string' && s.bookSourceUrl)
}

export { Analyzer, makeDoc, rootNode }
