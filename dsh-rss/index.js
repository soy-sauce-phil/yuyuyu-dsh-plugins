/**
 * Host half of the RSS widget: fetches feed documents (the page parses them with DOMParser).
 *   fetch { url } -> { url, text, kind: 'feed' | 'html', candidates? }
 * For an HTML page, `candidates` lists the <link rel="alternate"> feeds it advertises.
 */
import { RemoteError, registerOps, request } from './net.js'

export const inject = ['connection']

const FEED_TYPES = /(rss|atom|rdf|xml)/i

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", raquo: '»', laquo: '«', nbsp: ' ', mdash: '—', ndash: '–', middot: '·' }
const decode = (x) => x.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (m, e) => (e[0] === '#' ? String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : Number(e.slice(1))) : ENTITIES[e.toLowerCase()] ?? m))
const COMMON = ['/feed', '/rss', '/feed.xml', '/rss.xml', '/atom.xml', '/index.xml']

function discover(html, base) {
  const out = []
  for (const tag of html.match(/<link\b[^>]*>/gi) || []) {
    const attr = (name) => new RegExp(`${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i').exec(tag)
    const pick = (m) => (m ? m[1] ?? m[2] ?? m[3] : '')
    if (!/alternate/i.test(pick(attr('rel'))) || !FEED_TYPES.test(pick(attr('type')))) continue
    const href = pick(attr('href'))
    if (!href) continue
    try { out.push({ url: new URL(decode(href), base).toString(), title: decode(pick(attr('title'))).trim() }) } catch {}
  }
  return out.filter((x, i) => /^https?:/.test(x.url) && out.findIndex((y) => y.url === x.url) === i).slice(0, 8)
}

async function fetchFeed({ url }, signal) {
  let target = String(url || '').trim()
  if (!target) throw new RemoteError('请输入订阅地址')
  if (!/^https?:\/\//i.test(target)) target = 'https://' + target
  const res = await request(target, { signal, timeoutMs: 20000, maxBytes: 8 * 1024 * 1024, headers: { Accept: 'application/rss+xml, application/atom+xml, application/xml;q=0.9, text/xml;q=0.9, text/html;q=0.8, */*;q=0.5' } })
  if (res.status < 200 || res.status >= 300) throw new RemoteError(`HTTP ${res.status}`)
  const head = res.text.slice(0, 2000).trimStart()
  // the first real element (after the XML declaration, comments, doctype and stylesheet PIs) decides
  const root = /<([A-Za-z][\w:.-]*)/.exec(res.text.slice(0, 8000).replace(/<\?[\s\S]*?\?>|<!--[\s\S]*?-->|<!DOCTYPE[^>]*>/gi, ''))?.[1]?.toLowerCase()
  const isFeed = root === 'rss' || root === 'feed' || root === 'rdf:rdf' || root === 'rdf'
  if (isFeed) return { url: res.url, text: res.text, kind: 'feed' }
  if (/^\s*\{/.test(head) && /"version"\s*:\s*"https:\/\/jsonfeed\.org/i.test(head)) return { url: res.url, text: res.text, kind: 'json' }
  const candidates = discover(res.text, res.url)
  if (!candidates.length) {
    // the page declares nothing: probe the usual feed paths on the same site
    const origin = new URL(res.url).origin
    const found = await Promise.all(COMMON.map((p) => request(origin + p, { signal, timeoutMs: 8000 }).then((r) => {
      const root = /<([A-Za-z][\w:.-]*)/.exec(r.text.slice(0, 8000).replace(/<\?[\s\S]*?\?>|<!--[\s\S]*?-->|<!DOCTYPE[^>]*>/gi, ''))?.[1]?.toLowerCase()
      return r.status === 200 && ['rss', 'feed', 'rdf:rdf', 'rdf'].includes(root) ? { url: r.url, title: '' } : null
    }).catch(() => null)))
    const seen = new Set()
    for (const f of found) if (f && !seen.has(f.url)) { seen.add(f.url); candidates.push(f) }
  }
  return { url: res.url, kind: 'html', candidates }
}

export const __ops = { fetch: fetchFeed }

export function apply(ctx) {
  registerOps(ctx, 'rss', { fetch: (p, signal) => fetchFeed(p ?? {}, signal) })
}
