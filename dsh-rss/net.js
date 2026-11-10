// Shared host network kit, copied into each host plugin as net.js by
// `node tools/sync-kit.mjs`. Edit tools/kit/net.js, not the copies.
import dns from 'node:dns'
import httpModule from 'node:http'
import httpsModule from 'node:https'
import net from 'node:net'
import zlib from 'node:zlib'

export class RemoteError extends Error {}

export const BROWSER_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

/** Private / loopback / link-local ranges. 198.18/15 is allowed: proxy "fake-ip" DNS maps public hosts there. */
function isPrivateAddress(address) {
  if (net.isIPv4(address)) {
    const [a, b] = address.split('.').map(Number)
    return a === 0 || a === 10 || a === 127 || (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || a >= 224
  }
  const x = address.toLowerCase()
  if (x.startsWith('::ffff:')) return isPrivateAddress(x.slice(7))
  return x === '::' || x === '::1' || x.startsWith('fc') || x.startsWith('fd') || x.startsWith('fe8') || x.startsWith('fe9') || x.startsWith('fea') || x.startsWith('feb')
}

function guardedLookup(hostname, options, callback) {
  dns.lookup(hostname, { ...options, all: true }, (err, addresses) => {
    if (err) return callback(err)
    const list = Array.isArray(addresses) ? addresses : [{ address: addresses, family: options.family || 4 }]
    const bad = list.find((a) => isPrivateAddress(a.address))
    if (bad) return callback(Object.assign(new Error('blocked private address'), { code: 'EBLOCKED' }))
    if (options.all) callback(null, list)
    else callback(null, list[0].address, list[0].family)
  })
}

function charsetOf(contentType, head) {
  const m = /charset=["']?([\w-]+)/i.exec(contentType || '') ||
    /<\?xml[^>]*encoding=["']([\w-]+)/i.exec(head) ||
    /<meta[^>]+charset=["']?([\w-]+)/i.exec(head)
  const cs = (m ? m[1] : 'utf-8').toLowerCase()
  return cs === 'gb2312' || cs === 'gbk' ? 'gb18030' : cs
}

/**
 * GET/POST a public http(s) URL. Follows up to 5 redirects (each re-checked),
 * decompresses gzip/deflate/br, decodes the declared charset.
 * @returns {Promise<{ status:number, url:string, contentType:string, text:string }>}
 */
export function request(url, { method = 'GET', headers = {}, body, timeoutMs = 15000, maxBytes = 5 * 1024 * 1024, signal, encoding } = {}, hops = 0) {
  let target
  try { target = new URL(url) } catch { return Promise.reject(new RemoteError('网址格式不对')) }
  if (!/^https?:$/.test(target.protocol)) return Promise.reject(new RemoteError('只支持 http / https 网址'))
  if (target.username || target.password) return Promise.reject(new RemoteError('网址里不能带账号密码'))
  if (net.isIP(target.hostname.replace(/^\[|\]$/g, '')) && isPrivateAddress(target.hostname.replace(/^\[|\]$/g, ''))) {
    return Promise.reject(new RemoteError('不允许访问本机或内网地址'))
  }
  const mod = target.protocol === 'https:' ? httpsModule : httpModule
  const timeout = AbortSignal.timeout(timeoutMs)
  const sig = signal ? AbortSignal.any([signal, timeout]) : timeout
  return new Promise((resolve, reject) => {
    const req = mod.request(target, {
      method, signal: sig, lookup: guardedLookup,
      headers: { 'User-Agent': BROWSER_UA, Accept: '*/*', 'Accept-Encoding': 'gzip, deflate, br', 'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.6', ...headers },
    }, (res) => {
      const status = res.statusCode || 0
      if (status >= 300 && status < 400 && res.headers.location) {
        res.resume()
        if (hops >= 5) return reject(new RemoteError('重定向次数过多'))
        const next = new URL(res.headers.location, target).toString()
        const keep = status === 307 || status === 308
        return resolve(request(next, { method: keep ? method : 'GET', headers, body: keep ? body : undefined, timeoutMs, maxBytes, signal, encoding }, hops + 1))
      }
      const enc = String(res.headers['content-encoding'] || '').toLowerCase()
      const stream = enc === 'gzip' ? res.pipe(zlib.createGunzip()) : enc === 'deflate' ? res.pipe(zlib.createInflate()) : enc === 'br' ? res.pipe(zlib.createBrotliDecompress()) : res
      const chunks = []
      let size = 0
      stream.on('data', (c) => {
        size += c.length
        if (size > maxBytes) { req.destroy(); reject(new RemoteError('返回内容太大')) } else chunks.push(c)
      })
      stream.on('end', () => {
        const buf = Buffer.concat(chunks)
        const contentType = String(res.headers['content-type'] || '')
        let text
        try { text = new TextDecoder(encoding || charsetOf(contentType, buf.subarray(0, 2048).toString('latin1'))).decode(buf) } catch { text = buf.toString('utf8') }
        resolve({ status, url: target.toString(), contentType, text })
      })
      stream.on('error', (e) => reject(new RemoteError(`读取失败（${e.code || e.message}）`)))
    })
    req.on('error', (e) => {
      if (e instanceof RemoteError) return reject(e)
      if (e.code === 'EBLOCKED') return reject(new RemoteError('不允许访问本机或内网地址'))
      if (e.name === 'AbortError' || e.code === 'ABORT_ERR') return reject(new RemoteError(timeout.aborted ? '请求超时' : '请求已取消'))
      reject(new RemoteError(`网络请求失败（${e.code || e.message}）`))
    })
    if (body !== undefined) req.write(body)
    req.end()
  })
}

export async function getJson(url, options) {
  const res = await request(url, options)
  if (res.status < 200 || res.status >= 300) throw new RemoteError(`HTTP ${res.status}`)
  try { return JSON.parse(res.text) } catch { throw new RemoteError('返回的不是 JSON') }
}

function envelope(rpcId, result) {
  return new Response(JSON.stringify({ type: 'server-response', rpcId, result }), {
    status: 200,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })
}

/** Register POST /api/<ns>/<op> Connection RPC routes. */
export function registerOps(ctx, ns, operations) {
  for (const [name, run] of Object.entries(operations)) {
    ctx.connection.fetch.register({
      path: `/api/${ns}/${name}`,
      methods: ['POST'],
      requestBody: 'buffered',
      async fetch(req) {
        let message
        try { message = await req.json() } catch { return new Response('body is not JSON', { status: 400 }) }
        const rpcId = typeof message?.rpcId === 'string' ? message.rpcId : 'invalid-request'
        try {
          return envelope(rpcId, { ok: true, value: await run(message?.payload ?? {}, req.signal) })
        } catch (error) {
          const known = error instanceof RemoteError
          if (!known) console.warn(`[${ns}]`, error)
          return envelope(rpcId, { ok: false, error: { code: known ? `${ns}/remote` : `${ns}/internal`, message: error instanceof Error ? error.message : String(error), details: {} } })
        }
      },
    })
  }
}
