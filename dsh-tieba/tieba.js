/**
 * Read-only Baidu Tieba access for the sidebar plugin.
 *
 * Uses the (unofficial) mobile client API at c.tieba.baidu.com plus two web
 * endpoints. Requests only go to fixed Baidu hosts. The optional BDUSS login
 * cookie is kept in a 0600 file under the user's home directory and is never
 * sent back to the page.
 */
import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import httpModule from 'node:http'
import httpsModule from 'node:https'
import os from 'node:os'
import path from 'node:path'

export class TiebaError extends Error {}

const CLIENT_VERSION = '12.25.1.0'
const CLIENT_UA = `bdtb for Android ${CLIENT_VERSION}`
const WEB_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
const TIMEOUT_MS = 15000
const AUTH_DIR = path.join(os.homedir(), '.dsh-tieba')
const AUTH_FILE = path.join(AUTH_DIR, 'auth.json')

// ---------------------------------------------------------------- credentials

let authCache
async function loadAuth() {
  if (authCache !== undefined) return authCache
  try {
    const data = JSON.parse(await fs.readFile(AUTH_FILE, 'utf8'))
    authCache = data && typeof data.bduss === 'string' && data.bduss ? data : null
  } catch { authCache = null }
  return authCache
}

async function saveAuth(auth) {
  await fs.mkdir(AUTH_DIR, { recursive: true, mode: 0o700 })
  await fs.writeFile(AUTH_FILE, JSON.stringify(auth), { mode: 0o600 })
  await fs.chmod(AUTH_FILE, 0o600).catch(() => {})
  authCache = auth
}

/** Accept a bare BDUSS value or a whole Cookie header / `BDUSS=…; STOKEN=…`. */
function parseCredential(input) {
  const text = String(input ?? '').trim().replace(/^cookie:\s*/i, '')
  if (!text) throw new TiebaError('请粘贴 BDUSS')
  const pick = (name) => {
    const m = new RegExp(`(?:^|[;\\s])${name}=([^;\\s]+)`).exec(text)
      || new RegExp(`(?:^|\\s)${name}\\s+([\\w~\\-.]{60,})`).exec(text) // a row copied from the DevTools cookie table
    return m ? m[1] : ''
  }
  let bduss = pick('BDUSS')
  const stoken = pick('STOKEN')
  if (!bduss && !text.includes('=')) bduss = text.replace(/\s+/g, '')
  if (!/^[\w~\-.]{60,400}$/.test(bduss)) throw new TiebaError('BDUSS 格式不对：应为一长串字母数字（通常 192 位左右）')
  return { bduss, stoken }
}

// ---------------------------------------------------------------- http

function withTimeout(signal) {
  const t = AbortSignal.timeout(TIMEOUT_MS)
  return signal && typeof AbortSignal.any === 'function' ? AbortSignal.any([signal, t]) : t
}

function sign(params) {
  const raw = Object.keys(params).sort().map((k) => `${k}=${params[k]}`).join('') + 'tiebaclient!!!'
  return crypto.createHash('md5').update(raw, 'utf8').digest('hex').toUpperCase()
}

async function clientApi(apiPath, params, signal, auth) {
  const p = { _client_type: '2', _client_version: CLIENT_VERSION }
  if (auth?.bduss) p.BDUSS = auth.bduss
  if (auth?.stoken) p.stoken = auth.stoken
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== null) p[k] = String(v)
  p.sign = sign(p)
  let res
  try {
    res = await fetch(`http://c.tieba.baidu.com${apiPath}`, {
      method: 'POST',
      body: new URLSearchParams(p).toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': CLIENT_UA },
      signal: withTimeout(signal),
    })
  } catch (e) {
    throw new TiebaError(`网络请求失败（${e?.cause?.code || e?.name || e?.message}）`)
  }
  if (!res.ok) throw new TiebaError(`贴吧返回 HTTP ${res.status}`)
  let data
  try { data = await res.json() } catch { throw new TiebaError('贴吧返回的不是 JSON，可能触发了验证') }
  if (String(data.error_code ?? '0') !== '0') throw new TiebaError(data.error_msg || `贴吧错误 ${data.error_code}`)
  return data
}

/**
 * GET JSON with node:http(s) instead of fetch: inside Electron the global fetch
 * follows browser rules and silently drops a hand-written `Cookie` header.
 * Redirects (Baidu adds `?red_tag=…` hops) are followed only within baidu.com.
 */
function webJson(url, signal, auth, hops = 0) {
  const headers = { 'User-Agent': WEB_UA, Accept: 'application/json, text/plain, */*', Referer: 'https://tieba.baidu.com/' }
  if (auth?.bduss) headers.Cookie = `BDUSS=${auth.bduss}; BDUSS_BFESS=${auth.bduss}` + (auth.stoken ? `; STOKEN=${auth.stoken}` : '')
  const target = new URL(url)
  if (!/^https?:$/.test(target.protocol) || !(target.hostname === 'baidu.com' || target.hostname.endsWith('.baidu.com'))) {
    return Promise.reject(new TiebaError('贴吧把请求重定向到了非百度地址，已拦截'))
  }
  const mod = target.protocol === 'https:' ? httpsModule : httpModule
  return new Promise((resolve, reject) => {
    const req = mod.request(target, { method: 'GET', headers, signal: withTimeout(signal) }, (res) => {
      const status = res.statusCode || 0
      if (status >= 300 && status < 400 && res.headers.location) {
        res.resume()
        if (hops >= 5) return reject(new TiebaError('贴吧重定向次数过多'))
        return resolve(webJson(new URL(res.headers.location, target).toString(), signal, auth, hops + 1))
      }
      const chunks = []
      let size = 0
      res.on('data', (c) => { size += c.length; if (size > 5 * 1024 * 1024) req.destroy(new Error('response too large')); else chunks.push(c) })
      res.on('end', () => {
        if (status < 200 || status >= 300) return reject(new TiebaError(`贴吧返回 HTTP ${status}`))
        try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))) } catch { reject(new TiebaError('贴吧返回的不是 JSON')) }
      })
      res.on('error', (e) => reject(new TiebaError(`网络请求失败（${e?.code || e?.message}）`)))
    })
    req.on('error', (e) => reject(e instanceof TiebaError ? e : new TiebaError(`网络请求失败（${e?.code || e?.name || e?.message}）`)))
    req.end()
  })
}

// ---------------------------------------------------------------- normalizers

const https = (u) => (typeof u === 'string' ? u.replace(/^http:\/\//, 'https://') : '')

/** Tieba rich content -> small, render-safe parts. */
function parts(content) {
  if (!Array.isArray(content)) return []
  const out = []
  for (const c of content) {
    const type = Number(c?.type)
    const text = typeof c?.text === 'string' ? c.text : ''
    switch (type) {
      case 0: case 9: case 18: case 27: if (text) out.push({ t: 'text', v: text }); break
      case 1: out.push({ t: 'link', v: text || c.link, href: https(c.link || text) }); break
      case 2: out.push({ t: 'emo', v: c.c ? `[${c.c}]` : '' }); break
      case 3: {
        const [w, hgt] = String(c.bsize || '').split(',').map(Number)
        out.push({ t: 'img', src: https(c.cdn_src || c.big_cdn_src || c.origin_src), big: https(c.origin_src || c.big_cdn_src || c.cdn_src), w: w || 0, h: hgt || 0 })
        break
      }
      case 4: out.push({ t: 'at', v: text }); break
      case 5: out.push({ t: 'video', href: https(c.link || c.text), thumb: https(c.src) }); break
      case 10: out.push({ t: 'text', v: '[语音]' }); break
      case 11: case 20: if (c.src || c.static) out.push({ t: 'img', src: https(c.src || c.static), big: https(c.src || c.static), w: 0, h: 0, small: true }); break
      default: if (text) out.push({ t: 'text', v: text })
    }
  }
  return out
}

function userMap(list) {
  const m = new Map()
  for (const u of Array.isArray(list) ? list : []) m.set(String(u.id), u)
  return m
}

function userName(u) {
  return u ? String(u.name_show || u.name || '匿名') : '匿名'
}

const int = (v, d = 0) => (Number.isFinite(Number(v)) ? Number(v) : d)
const clampPage = (v) => Math.max(1, Math.min(10000, Math.floor(int(v, 1))))

// ---------------------------------------------------------------- operations

export async function status(signal) {
  const auth = await loadAuth()
  if (!auth) return { loggedIn: false }
  const data = await webJson('https://tieba.baidu.com/dc/common/tbs', signal, auth).catch(() => null)
  if (data && !data.is_login) return { loggedIn: false, expired: true }
  return { loggedIn: true, name: auth.name || '' }
}

export async function login(input, signal) {
  const auth = parseCredential(input)
  const data = await webJson('https://tieba.baidu.com/dc/common/tbs', signal, auth)
  if (!data.is_login) throw new TiebaError('BDUSS 无效或已过期，请重新复制')
  let name = ''
  try {
    const info = await clientApi('/c/s/login', {}, signal, auth)
    name = String(info?.user?.name_show || info?.user?.name || '')
  } catch {}
  await saveAuth({ ...auth, name })
  return { loggedIn: true, name }
}

export async function logout() {
  authCache = null
  await fs.rm(AUTH_FILE, { force: true })
  return { loggedIn: false }
}

export async function liked(signal) {
  const auth = await loadAuth()
  if (!auth) return { loggedIn: false, forums: [] }
  const data = await webJson('https://tieba.baidu.com/mo/q/newmoindex', signal, auth)
  if (!(data?.data?.is_login || (Number(data?.no) === 0 && data?.data?.uid))) return { loggedIn: false, expired: true, forums: [] }
  const forums = (data.data.like_forum || []).map((f) => ({
    name: String(f.forum_name || ''), level: int(f.user_level), exp: int(f.user_exp), signed: Boolean(Number(f.is_sign)),
  })).filter((f) => f.name)
  forums.sort((a, b) => b.level - a.level || b.exp - a.exp)
  return { loggedIn: true, forums }
}

export async function suggest(query, signal) {
  const q = String(query ?? '').trim()
  if (!q) return []
  const data = await webJson(`https://tieba.baidu.com/suggestion?query=${encodeURIComponent(q)}&ie=utf-8&_=${Date.now()}`, signal)
  const list = data?.query_match?.search_data || []
  return list.slice(0, 10).map((f) => ({
    name: String(f.fname || ''), members: int(f.member_num), threads: int(f.thread_num), desc: String(f.forum_desc || ''),
  })).filter((f) => f.name)
}

export async function forum({ kw, pn, sort, good }, signal) {
  const name = String(kw ?? '').trim()
  if (!name) throw new TiebaError('缺少吧名')
  const page = clampPage(pn)
  const data = await clientApi('/c/f/frs/page', {
    kw: name, pn: page, rn: 30, is_good: good ? 1 : 0, sort_type: sort === 'new' ? 1 : 0,
  }, signal, await loadAuth())
  if (!data.forum?.name) throw new TiebaError(`没有找到「${name}」吧`)
  const users = userMap(data.user_list)
  const threads = (data.thread_list || [])
    .filter((t) => !Number(t.is_tiebaplus_ad) && t.tid && t.title !== undefined)
    .map((t) => {
      const abstract = (t.abstract || []).map((a) => a?.text || '').join('').trim()
      const media = (t.media || []).filter((m) => Number(m.type) === 3).slice(0, 3)
        .map((m) => ({ src: https(m.small_pic || m.big_pic || m.src_pic), big: https(m.big_pic || m.src_pic || m.small_pic) }))
      return {
        tid: String(t.tid), title: String(t.title || '').trim() || abstract.slice(0, 40) || '（无标题）',
        abstract: abstract.slice(0, 120), replies: int(t.reply_num), views: int(t.view_num),
        author: userName(users.get(String(t.author_id)) || t.author), lastTime: int(t.last_time_int), createTime: int(t.create_time),
        top: Boolean(Number(t.is_top) || Number(t.is_membertop)), good: Boolean(Number(t.is_good)), media,
      }
    })
  const p = data.page || {}
  return {
    forum: {
      name: String(data.forum.name), members: int(data.forum.member_num), posts: int(data.forum.post_num),
      avatar: https(data.forum.avatar), slogan: String(data.forum.slogan || ''),
    },
    threads,
    page: { current: int(p.current_page, page), total: int(p.total_page, 0), hasMore: Boolean(Number(p.has_more)) },
  }
}

export async function thread({ tid, pn, lz }, signal) {
  const kz = String(tid ?? '').replace(/\D/g, '')
  if (!kz) throw new TiebaError('缺少帖子 ID')
  const page = clampPage(pn)
  const data = await clientApi('/c/f/pb/page', { kz, pn: page, rn: 20, lz: lz ? 1 : 0, r: 0 }, signal, await loadAuth())
  const users = userMap(data.user_list)
  const authorId = String(data.thread?.author?.id ?? data.post_list?.[0]?.author_id ?? '')
  const posts = (data.post_list || []).map((post) => {
    const u = users.get(String(post.author_id))
    const subs = Array.isArray(post.sub_post_list?.sub_post_list) ? post.sub_post_list.sub_post_list : []
    return {
      id: String(post.id), floor: int(post.floor), time: int(post.time),
      author: userName(u), level: int(u?.level_id), isLz: String(post.author_id) === authorId,
      parts: parts(post.content), subCount: int(post.sub_post_number),
      subs: subs.slice(0, 3).map((s) => ({ id: String(s.id), author: userName(s.author || users.get(String(s.author_id))), parts: parts(s.content) })),
    }
  })
  const p = data.page || {}
  return {
    thread: {
      tid: kz, title: String(data.thread?.title || '').trim() || '（无标题）', forum: String(data.forum?.name || ''),
      replies: int(data.thread?.reply_num),
    },
    posts,
    page: { current: int(p.current_page, page), total: int(p.total_page, 1) },
  }
}

export async function floor({ tid, pid, pn }, signal) {
  const kz = String(tid ?? '').replace(/\D/g, '')
  const id = String(pid ?? '').replace(/\D/g, '')
  if (!kz || !id) throw new TiebaError('缺少楼层 ID')
  const page = clampPage(pn)
  const data = await clientApi('/c/f/pb/floor', { kz, pid: id, pn: page }, signal, await loadAuth())
  const subs = (data.subpost_list || []).map((s) => ({
    id: String(s.id), author: userName(s.author), time: int(s.time), parts: parts(s.content),
  }))
  const p = data.page || {}
  return { subs, page: { current: int(p.current_page, page), total: int(p.total_page, 1), count: int(p.total_count) } }
}

/** The app's home "推荐" feed. Works best when logged in (personalized). */
export async function recommend({ pn }, signal) {
  const page = clampPage(pn)
  const data = await clientApi('/c/f/excellent/personalized', {
    load_type: page === 1 ? 1 : 2, pn: page, rn: 20, page_thread_count: 20, request_times: page - 1,
    need_tags: 0, pre_ad_thread_count: 0, sug_count: 0, tag_code: 0, q_type: 1, need_forumlist: 0,
    new_net_type: 1, new_install: 0, invoke_source: '', scr_dip: 3, scr_h: 1920, scr_w: 1080,
  }, signal, await loadAuth())
  const threads = (data.thread_list || [])
    .filter((t) => !Number(t.is_tiebaplus_ad) && !Number(t.is_deleted) && t.tid)
    .map((t) => {
      const abstract = (t.abstract || []).map((a) => a?.text || '').join('').trim()
      const media = (t.media || []).filter((m) => Number(m.type) === 3).slice(0, 3)
        .map((m) => ({ src: https(m.small_pic || m.big_pic || m.src_pic), big: https(m.big_pic || m.src_pic || m.small_pic) }))
      return {
        tid: String(t.tid), title: String(t.title || '').trim() || abstract.slice(0, 40) || '（无标题）',
        abstract: abstract.slice(0, 120), replies: int(t.reply_num), views: int(t.view_num),
        author: userName(t.author), forum: String(t.fname || t.forum_info?.forum_name || ''),
        lastTime: int(t.last_time_int), createTime: int(t.create_time), top: false, good: Boolean(Number(t.is_good)), media,
      }
    })
  return { threads, page }
}
