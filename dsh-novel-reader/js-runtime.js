/**
 * Sandboxed JavaScript for Legado (阅读) book-source rules.
 *
 * Scripts run inside QuickJS compiled to WebAssembly: they cannot reach Node,
 * the file system, processes or the network except through the `java.*`
 * functions defined here, which route HTTP through the guarded request()
 * of the engine. Each runtime has a memory cap, a wall-clock deadline and an
 * interrupt handler, and is disposed after one book operation.
 */
import crypto from 'node:crypto'
import iconv from 'iconv-lite'
import { newAsyncContext } from 'quickjs-emscripten'

export class JsError extends Error {}

const MEMORY_LIMIT = 64 * 1024 * 1024
const DEADLINE_MS = 45000

// ------------------------------------------------------------------ helpers

function toBuffer(value, charset = 'utf-8') {
  if (value === null || value === undefined) return Buffer.alloc(0)
  if (Array.isArray(value)) return Buffer.from(value.map((b) => b & 0xff))
  if (typeof value === 'object' && Array.isArray(value.__bytes)) return Buffer.from(value.__bytes.map((b) => b & 0xff))
  const s = String(value)
  return iconv.encodingExists(charset) ? iconv.encode(s, charset) : Buffer.from(s, 'utf8')
}

function bytesOut(buf) {
  // Java bytes are signed.
  return Array.from(buf, (b) => (b > 127 ? b - 256 : b))
}

function isHex(s) {
  return typeof s === 'string' && s.length % 2 === 0 && /^[0-9a-fA-F]+$/.test(s)
}

function decodeData(data) {
  if (Array.isArray(data) || (data && typeof data === 'object')) return toBuffer(data)
  const s = String(data ?? '').trim()
  if (isHex(s)) return Buffer.from(s, 'hex')
  return Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64')
}

function cipherName(transformation, keyLen) {
  const [algo = 'AES', mode = 'ECB', padding = 'PKCS5Padding'] = String(transformation || 'AES').split('/')
  const a = algo.toUpperCase()
  const m = mode.toUpperCase()
  const autoPadding = !/NOPADDING/i.test(padding)
  let name
  if (a === 'AES') name = `aes-${keyLen * 8}-${m.toLowerCase()}`
  else if (a === 'DESEDE' || a === '3DES' || a === 'TRIPLEDES') name = m === 'ECB' ? 'des-ede3' : `des-ede3-${m.toLowerCase()}`
  else if (a === 'DES') name = m === 'ECB' ? 'des-ecb' : `des-${m.toLowerCase()}`
  else throw new JsError(`unsupported cipher ${transformation}`)
  return { name, autoPadding, ecb: m === 'ECB' }
}

function symmetric(transformation, key, iv, encrypt, data) {
  const k = toBuffer(key)
  const { name, autoPadding, ecb } = cipherName(transformation, k.length)
  const ivBuf = ecb ? null : iv === undefined || iv === null || iv === '' ? Buffer.alloc(name.startsWith('aes') ? 16 : 8) : toBuffer(iv)
  const c = encrypt ? crypto.createCipheriv(name, k, ivBuf) : crypto.createDecipheriv(name, k, ivBuf)
  c.setAutoPadding(autoPadding)
  return Buffer.concat([c.update(data), c.final()])
}

function hashName(algo) {
  return String(algo || 'MD5').replace(/^Hmac/i, '').replace(/-/g, '').toLowerCase()
}

function pad(n, w = 2) { return String(n).padStart(w, '0') }

function formatDate(ms, pattern = 'yyyy/MM/dd HH:mm', offsetHours) {
  let d = new Date(Number(ms))
  if (Number.isNaN(d.getTime())) return ''
  const utc = offsetHours !== undefined
  if (utc) d = new Date(d.getTime() + Number(offsetHours) * 3600000)
  const get = (f) => (utc ? d[`getUTC${f}`]() : d[`get${f}`]())
  return pattern.replace(/yyyy|yy|MM|dd|HH|mm|ss|SSS/g, (t) => ({
    yyyy: get('FullYear'), yy: pad(get('FullYear') % 100), MM: pad(get('Month') + 1), dd: pad(get('Date')),
    HH: pad(get('Hours')), mm: pad(get('Minutes')), ss: pad(get('Seconds')), SSS: pad(get('Milliseconds'), 3),
  })[t])
}

const CN_DIGIT = { 零: 0, 〇: 0, 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 }
const CN_UNIT = { 十: 10, 百: 100, 千: 1000, 万: 10000 }
function chineseToNumber(s) {
  let total = 0, section = 0, num = 0
  for (const c of s) {
    if (c in CN_DIGIT) num = CN_DIGIT[c]
    else if (c === '万') { section = (section + num) * 10000; total += section; section = 0; num = 0 }
    else if (c in CN_UNIT) { section += (num || 1) * CN_UNIT[c]; num = 0 }
  }
  return total + section + num
}
export function toNumChapter(s) {
  if (s === null || s === undefined) return s
  return String(s).replace(/第([零〇一二两三四五六七八九十百千万]+)([章节回卷集部篇])/g, (_, n, u) => `第${chineseToNumber(n)}${u}`)
}

// ------------------------------------------------------------------ prelude (runs inside QuickJS)

const PRELUDE = String.raw`
(function () {
  var H = globalThis.__host; delete globalThis.__host;
  function call(name, args) {
    var out = H(name, JSON.stringify(args));
    var r = JSON.parse(out);
    if (r.error) throw new Error(r.error);
    return wrap(r.value);
  }
  function Element(id) { this.__nr = id; }
  function elems(list) {
    var a = list.slice();
    a.text = function () { return a.map(function (e) { return e.text(); }).join(' '); };
    a.html = function () { return a.map(function (e) { return e.html(); }).join('\n'); };
    a.attr = function (n) { for (var i = 0; i < a.length; i++) { var v = a[i].attr(n); if (v) return v; } return ''; };
    a.get = function (i) { return a[i]; };
    a.size = function () { return a.length; };
    a.first = function () { return a[0] || null; };
    a.last = function () { return a[a.length - 1] || null; };
    a.select = function (q) { var o = []; a.forEach(function (e) { o.push.apply(o, e.select(q)); }); return elems(o); };
    a.eachText = function () { return a.map(function (e) { return e.text(); }); };
    a.eachAttr = function (n) { return a.map(function (e) { return e.attr(n); }); };
    a.toArray = function () { return a.slice(); };
    a.isEmpty = function () { return a.length === 0; };
    a.outerHtml = function () { return a.map(function (e) { return e.outerHtml(); }).join('\n'); };
    a.ownText = function () { return a.map(function (e) { return e.ownText(); }).join(' '); };
    a.toString = function () { return a.outerHtml(); };
    return a;
  }
  function wrap(v) {
    if (v && typeof v === 'object') {
      if (typeof v.__nr === 'number') return new Element(v.__nr);
      if (Array.isArray(v)) {
        var mapped = v.map(wrap);
        return (!mapped.length || mapped[0] instanceof Element) ? elems(mapped) : mapped;
      }
      if (v.__response) return response(v.__response);
      for (var k in v) v[k] = wrap(v[k]);
    }
    return v;
  }
  function el(op) { return function (a) { return call('el', [this.__nr, op, a === undefined ? null : a]); }; }
  Element.prototype.text = el('text');
  Element.prototype.ownText = el('ownText');
  Element.prototype.html = el('html');
  Element.prototype.outerHtml = el('outerHtml');
  Element.prototype.attr = el('attr');
  Element.prototype.absUrl = el('absUrl');
  Element.prototype.hasClass = el('hasClass');
  Element.prototype.tagName = el('tagName');
  Element.prototype.select = function (q) { return call('el', [this.__nr, 'select', q]); };
  Element.prototype.selectFirst = function (q) { var r = call('el', [this.__nr, 'select', q]); return r[0] || null; };
  Element.prototype.children = function () { return call('el', [this.__nr, 'children', null]); };
  Element.prototype.parent = function () { return call('el', [this.__nr, 'parent', null]); };
  Element.prototype.toString = function () { return this.outerHtml(); };
  function response(r) {
    return {
      body: function () { return r.body; }, code: function () { return r.code; }, statusCode: function () { return r.code; },
      url: function () { return r.url; }, header: function (n) { return r.headers[String(n).toLowerCase()] || null; },
      headers: function () { return r.headers; }, cookies: function () { return r.cookies || {}; }, toString: function () { return r.body; },
      raw: { request: function () { return { url: function () { return r.url; } }; } },
    };
  }
  globalThis.__wrap = wrap;
  function fn(name) { return function () { return call(name, Array.prototype.slice.call(arguments)); }; }
  var names = ${JSON.stringify([
    'ajax', 'ajaxAll', 'connect', 'post', 'head', 'getString', 'getStringList', 'getElements', 'getElement', 'setContent',
    'md5Encode', 'md5Encode16', 'base64Encode', 'base64Decode', 'base64DecodeToByteArray', 'encodeURI', 'timeFormat',
    'timeFormatUTC', 'log', 'logType', 'toast', 'longToast', 't2s', 's2t', 'toNumChapter', 'hexDecodeToString',
    'hexDecodeToByteArray', 'hexEncodeToString', 'strToBytes', 'bytesToStr', 'HMacHex', 'HMacBase64', 'digestHex',
    'digestBase64', 'aesBase64DecodeToString', 'aesDecodeToString', 'aesDecodeToByteArray', 'aesBase64DecodeToByteArray',
    'aesEncodeToString', 'aesEncodeToBase64String', 'aesEncodeToByteArray', 'aesEncodeToBase64ByteArray',
    'desBase64DecodeToString', 'desDecodeToString', 'desEncodeToString', 'desEncodeToBase64String',
    'tripleDESDecodeStr', 'tripleDESDecodeArgsBase64Str', 'tripleDESEncodeBase64Str', 'tripleDESEncodeArgsBase64Str',
    'randomUUID', 'androidId', 'deviceID', 'getCookie', 'importScript', 'cacheFile', 'htmlFormat', 'utf8ToGbk',
    'toURL', 'getVerificationCode', 'webView', 'webViewGetSource', 'webViewGetOverrideUrl', 'startBrowser',
    'startBrowserAwait', 'getWebViewUA', 'readFile', 'readTxtFile', 'downloadFile', 'unzipFile', 'deleteFile',
    'queryBase64TTF', 'queryTTF', 'replaceFont', 'getZipStringContent', 'getZipByteArrayContent', 'reGetBook', 'refreshTocUrl',
  ])};
  var java = {};
  names.forEach(function (n) { java[n] = fn(n); });
  java.get = function (a, b) { return b === undefined ? call('getVar', [a]) : call('httpGet', [a, b]); };
  java.put = function (k, v) { return call('putVar', [k, v]); };
  java.createSymmetricCrypto = function (t, key, iv) {
    var c = function (op) { return function (data) { return call('crypto', [t, key, iv === undefined ? null : iv, op, data]); }; };
    return {
      decrypt: c('decrypt'), decryptStr: c('decryptStr'), encrypt: c('encrypt'), encryptBase64: c('encryptBase64'),
      encryptHex: c('encryptHex'), setIv: function (v) { iv = v; return this; },
    };
  };
  java.createSign = function () { throw new Error('createSign is not supported'); };
  java.getSource = function () { return source; };
  // Minimal Rhino-style java.lang shims.
  java.lang = {
    String: function (v, cs) {
      if (v && typeof v === 'object' && typeof v.length === 'number') return call('bytesToStr', [Array.prototype.slice.call(v), cs || 'utf-8']);
      return String(v === undefined ? '' : v);
    },
    Integer: { parseInt: function (s, r) { return parseInt(s, r || 10); }, valueOf: function (s) { return parseInt(s, 10); } },
    Long: { parseLong: function (s) { return parseInt(s, 10); } },
    Math: Math,
    System: { currentTimeMillis: function () { return Date.now(); } },
  };
  java.util = {};
  globalThis.java = java;
  globalThis.Packages = { java: java };

  function vars(scope) {
    return {
      get: function (k) { return call('scopeGet', [scope, k]); },
      put: function (k, v) { return call('scopePut', [scope, k, v]); },
      getVariable: function (k) { return call('scopeGet', [scope, k === undefined ? '__custom' : k]); },
      putVariable: function (k, v) { return call('scopePut', [scope, k, v]); },
      setVariable: function (v) { return call('scopePut', [scope, '__custom', v]); },
    };
  }
  var src = JSON.parse(H('__source', '[]')).value || {};
  var source = vars('source');
  for (var k in src) source[k] = src[k];
  source.getKey = function () { return src.bookSourceUrl; };
  source.key = src.bookSourceUrl;
  source.getTag = function () { return src.bookSourceName; };
  source.getLoginInfo = function () { return call('scopeGet', ['source', '__login']) || ''; };
  source.getLoginInfoMap = function () { try { return JSON.parse(source.getLoginInfo() || '{}'); } catch (e) { return {}; } };
  source.putLoginInfo = function (v) { return call('scopePut', ['source', '__login', v]); };
  source.getLoginHeader = function () { return call('scopeGet', ['source', '__loginHeader']) || ''; };
  source.getLoginHeaderMap = function () { try { return JSON.parse(source.getLoginHeader() || '{}'); } catch (e) { return {}; } };
  source.putLoginHeader = function (v) { return call('scopePut', ['source', '__loginHeader', v]); };
  source.removeLoginHeader = function () { return call('scopePut', ['source', '__loginHeader', '']); };
  source.login = function () {};
  globalThis.source = source;

  function obj(scope, data) {
    var o = vars(scope);
    for (var k in data) o[k] = data[k];
    return o;
  }
  var bk = JSON.parse(H('__book', '[]')).value;
  globalThis.book = bk ? obj('book', bk) : obj('book', {});
  globalThis.book.setReverseToc = function () {};
  globalThis.book.getUseReplaceRule = function () { return false; };
  var ch = JSON.parse(H('__chapter', '[]')).value;
  globalThis.chapter = obj('chapter', ch || {});
  globalThis.cookie = {
    getCookie: function (u) { return call('cookieGet', [u]); },
    getKey: function (u, k) { return call('cookieKey', [u, k]); },
    setCookie: function (u, c) { return call('cookieSet', [u, c]); },
    replaceCookie: function (u, c) { return call('cookieSet', [u, c]); },
    removeCookie: function (u) { return call('cookieRemove', [u]); },
  };
  var mem = {};
  globalThis.cache = {
    get: function (k) { return mem[k] === undefined ? null : mem[k]; },
    put: function (k, v) { mem[k] = v; return v; },
    getFile: function () { return null; }, putFile: function () {},
    getFromMemory: function (k) { return mem[k] === undefined ? null : mem[k]; },
    putMemory: function (k, v) { mem[k] = v; },
    delete: function (k) { delete mem[k]; },
  };
  globalThis.org = { jsoup: { Jsoup: { parse: function (html) { return call('parseHtml', [String(html === undefined || html === null ? '' : html)]); } } } };
  globalThis.org.jsoup.nodes = { Document: {}, Element: {} };
  globalThis.Packages.org = globalThis.org;
  globalThis.JavaImporter = function () { throw new Error('JavaImporter is not supported'); };
})();
`

// ------------------------------------------------------------------ runtime

/**
 * @param host - bridge into the rule engine:
 *   request(rawUrl, options) -> {body, code, url, headers}
 *   getStrings(rule, content, isUrl) / getElements(rule, content) / setContent(content, baseUrl)
 *   element(id, op, arg), toHandles(values), vars, source, book, chapter, cookies, log
 */
export async function createJsRuntime(host) {
  const vm = await newAsyncContext()
  const deadline = Math.min(Date.now() + DEADLINE_MS, host.deadline ?? Infinity)
  vm.runtime.setMemoryLimit(MEMORY_LIMIT)
  vm.runtime.setMaxStackSize(1024 * 1024)
  vm.runtime.setInterruptHandler(() => Date.now() > deadline)
  const scopes = { source: host.sourceVars, book: host.bookVars, chapter: host.chapterVars }

  const sync = {
    __source: () => host.source,
    __book: () => host.book ?? null,
    __chapter: () => host.chapter ?? null,
    getVar: ([k]) => host.vars.get(String(k)) ?? '',
    putVar: ([k, v]) => { host.vars.set(String(k), v === undefined || v === null ? '' : String(v)); return v },
    scopeGet: ([scope, k]) => {
      if (scope === 'book' || scope === 'chapter') { const v = host.vars.get(String(k)); if (v !== undefined) return v }
      return scopes[scope]?.get(String(k)) ?? null
    },
    scopePut: ([scope, k, v]) => { scopes[scope]?.set(String(k), v === undefined || v === null ? '' : typeof v === 'string' ? v : JSON.stringify(v)); return v },
    md5Encode: ([s]) => crypto.createHash('md5').update(toBuffer(s)).digest('hex'),
    md5Encode16: ([s]) => crypto.createHash('md5').update(toBuffer(s)).digest('hex').slice(8, 24),
    base64Encode: ([s]) => toBuffer(s).toString('base64'),
    base64Decode: ([s, cs]) => { const b = Buffer.from(String(s ?? ''), 'base64'); return typeof cs === 'string' && iconv.encodingExists(cs) ? iconv.decode(b, cs) : b.toString('utf8') },
    base64DecodeToByteArray: ([s]) => bytesOut(Buffer.from(String(s ?? ''), 'base64')),
    encodeURI: ([s, enc]) => {
      const cs = enc || 'utf-8'
      const b = toBuffer(s, cs)
      let out = ''
      for (const x of b) { const c = String.fromCharCode(x); out += /[A-Za-z0-9\-_.*]/.test(c) ? c : x === 32 ? '+' : '%' + x.toString(16).toUpperCase().padStart(2, '0') }
      return out
    },
    timeFormat: ([ms]) => formatDate(ms),
    timeFormatUTC: ([ms, fmt, offset]) => formatDate(ms, fmt || 'yyyy-MM-dd HH:mm:ss', offset ?? 0),
    log: ([m]) => { host.log(m); return m },
    logType: ([m]) => { host.log(typeof m); return m },
    toast: ([m]) => { host.log(m) }, longToast: ([m]) => { host.log(m) },
    t2s: ([s]) => s, s2t: ([s]) => s,
    toNumChapter: ([s]) => toNumChapter(s),
    hexDecodeToString: ([s]) => Buffer.from(String(s), 'hex').toString('utf8'),
    hexDecodeToByteArray: ([s]) => bytesOut(Buffer.from(String(s), 'hex')),
    hexEncodeToString: ([s]) => toBuffer(s).toString('hex'),
    strToBytes: ([s, cs]) => bytesOut(toBuffer(s, cs || 'utf-8')),
    bytesToStr: ([b, cs]) => { const buf = toBuffer(b); return cs && iconv.encodingExists(cs) ? iconv.decode(buf, cs) : buf.toString('utf8') },
    utf8ToGbk: ([s]) => s,
    HMacHex: ([d, a, k]) => crypto.createHmac(hashName(a), toBuffer(k)).update(toBuffer(d)).digest('hex'),
    HMacBase64: ([d, a, k]) => crypto.createHmac(hashName(a), toBuffer(k)).update(toBuffer(d)).digest('base64'),
    digestHex: ([d, a]) => crypto.createHash(hashName(a)).update(toBuffer(d)).digest('hex'),
    digestBase64: ([d, a]) => crypto.createHash(hashName(a)).update(toBuffer(d)).digest('base64'),
    aesBase64DecodeToString: ([d, k, t, iv]) => symmetric(t, k, iv, false, Buffer.from(String(d), 'base64')).toString('utf8'),
    aesDecodeToString: ([d, k, t, iv]) => symmetric(t, k, iv, false, decodeData(d)).toString('utf8'),
    aesDecodeToByteArray: ([d, k, t, iv]) => bytesOut(symmetric(t, k, iv, false, decodeData(d))),
    aesBase64DecodeToByteArray: ([d, k, t, iv]) => bytesOut(symmetric(t, k, iv, false, Buffer.from(String(d), 'base64'))),
    aesEncodeToString: ([d, k, t, iv]) => symmetric(t, k, iv, true, toBuffer(d)).toString('hex'),
    aesEncodeToBase64String: ([d, k, t, iv]) => symmetric(t, k, iv, true, toBuffer(d)).toString('base64'),
    aesEncodeToByteArray: ([d, k, t, iv]) => bytesOut(symmetric(t, k, iv, true, toBuffer(d))),
    aesEncodeToBase64ByteArray: ([d, k, t, iv]) => bytesOut(Buffer.from(symmetric(t, k, iv, true, toBuffer(d)).toString('base64'))),
    desBase64DecodeToString: ([d, k, t, iv]) => symmetric(t || 'DES/ECB/PKCS5Padding', k, iv, false, Buffer.from(String(d), 'base64')).toString('utf8'),
    desDecodeToString: ([d, k, t, iv]) => symmetric(t || 'DES/ECB/PKCS5Padding', k, iv, false, decodeData(d)).toString('utf8'),
    desEncodeToString: ([d, k, t, iv]) => symmetric(t || 'DES/ECB/PKCS5Padding', k, iv, true, toBuffer(d)).toString('hex'),
    desEncodeToBase64String: ([d, k, t, iv]) => symmetric(t || 'DES/ECB/PKCS5Padding', k, iv, true, toBuffer(d)).toString('base64'),
    tripleDESDecodeStr: ([d, k, m, p, iv]) => symmetric(`DESede/${m || 'ECB'}/${p || 'PKCS5Padding'}`, k, iv, false, decodeData(d)).toString('utf8'),
    tripleDESDecodeArgsBase64Str: ([d, k, m, p, iv]) => symmetric(`DESede/${m || 'ECB'}/${p || 'PKCS5Padding'}`, Buffer.from(String(k), 'base64'), iv ? Buffer.from(String(iv), 'base64') : iv, false, decodeData(d)).toString('utf8'),
    tripleDESEncodeBase64Str: ([d, k, m, p, iv]) => symmetric(`DESede/${m || 'ECB'}/${p || 'PKCS5Padding'}`, k, iv, true, toBuffer(d)).toString('base64'),
    tripleDESEncodeArgsBase64Str: ([d, k, m, p, iv]) => symmetric(`DESede/${m || 'ECB'}/${p || 'PKCS5Padding'}`, Buffer.from(String(k), 'base64'), iv ? Buffer.from(String(iv), 'base64') : iv, true, toBuffer(d)).toString('base64'),
    crypto: ([t, key, iv, op, data]) => {
      if (op === 'decrypt') return bytesOut(symmetric(t, key, iv, false, decodeData(data)))
      if (op === 'decryptStr') return symmetric(t, key, iv, false, decodeData(data)).toString('utf8')
      const out = symmetric(t, key, iv, true, toBuffer(data))
      if (op === 'encrypt') return bytesOut(out)
      if (op === 'encryptHex') return out.toString('hex')
      return out.toString('base64')
    },
    randomUUID: () => crypto.randomUUID(),
    androidId: () => host.deviceId, deviceID: () => host.deviceId,
    getWebViewUA: () => host.userAgent,
    getCookie: ([u, k]) => (k ? host.cookies.key(u, k) : host.cookies.get(u)),
    cookieGet: ([u]) => host.cookies.get(u),
    cookieKey: ([u, k]) => host.cookies.key(u, k),
    cookieSet: ([u, c]) => { host.cookies.set(u, c) },
    cookieRemove: ([u]) => { host.cookies.remove(u) },
    toURL: ([u, base]) => {
      const x = new URL(String(u), base ? String(base) : undefined)
      return { host: x.hostname, origin: x.origin, pathname: x.pathname, search: x.search, port: x.port, protocol: x.protocol, searchParams: Object.fromEntries(x.searchParams) }
    },
    htmlFormat: ([s]) => host.htmlFormat(String(s ?? '')),
    reGetBook: () => {}, refreshTocUrl: () => {},
  }
  const unsupported = ['getVerificationCode', 'webView', 'webViewGetSource', 'webViewGetOverrideUrl', 'startBrowser', 'startBrowserAwait',
    'readFile', 'readTxtFile', 'downloadFile', 'unzipFile', 'deleteFile', 'queryBase64TTF', 'queryTTF', 'replaceFont',
    'getZipStringContent', 'getZipByteArrayContent']

  const async = {
    ajax: async ([u]) => {
      try {
        const target = Array.isArray(u) ? u[0] : u
        return (await host.request(String(target))).body
      } catch (e) { return String(e?.message || e) }
    },
    ajaxAll: async ([list]) => {
      const out = []
      for (const u of list || []) {
        try { out.push({ __response: await host.request(String(u)) }) } catch (e) { out.push({ __response: { body: String(e?.message || e), code: 500, url: String(u), headers: {} } }) }
      }
      return out
    },
    connect: async ([u, headers]) => ({ __response: await host.request(String(u), { headers: parseMaybeJson(headers) }) }),
    httpGet: async ([u, headers]) => ({ __response: await host.request(String(u), { headers: parseMaybeJson(headers) }) }),
    head: async ([u, headers]) => ({ __response: await host.request(String(u), { method: 'HEAD', headers: parseMaybeJson(headers) }) }),
    post: async ([u, body, headers]) => ({ __response: await host.request(String(u), { method: 'POST', body: body === undefined || body === null ? '' : typeof body === 'string' ? body : JSON.stringify(body), headers: parseMaybeJson(headers) }) }),
    importScript: async ([u]) => (/^https?:/i.test(String(u)) ? (await host.request(String(u))).body : (() => { throw new JsError('importScript only accepts http(s) URLs') })()),
    cacheFile: async ([u]) => (await host.request(String(u))).body,
    getString: async ([rule, content, isUrl]) => (await host.getStrings(rule, content, isUrl)).join('\n'),
    getStringList: async ([rule, content, isUrl]) => host.getStrings(rule, content, isUrl),
    getElements: async ([rule, content]) => host.getElements(rule, content),
    getElement: async ([rule, content]) => (await host.getElements(rule, content))[0] ?? null,
    setContent: async ([content, baseUrl]) => { host.setContent(content, baseUrl) },
    el: async ([id, op, arg]) => host.element(id, op, arg),
    parseHtml: async ([html]) => host.parseHtml(html),
  }

  const bridge = vm.newAsyncifiedFunction('__host', async (nameHandle, argsHandle) => {
    const name = vm.getString(nameHandle)
    let args
    try { args = JSON.parse(vm.getString(argsHandle)) } catch { args = [] }
    let out
    try {
      if (unsupported.includes(name)) throw new JsError(`java.${name} 不受支持（需要 WebView / 文件等能力）`)
      let value
      if (sync[name]) value = sync[name](args)
      else if (async[name]) value = await async[name](args)
      else throw new JsError(`java.${name} is not supported`)
      out = JSON.stringify({ value: value === undefined ? null : value })
    } catch (e) {
      out = JSON.stringify({ error: String(e?.message || e) })
    }
    return vm.newString(out)
  })
  vm.setProp(vm.global, '__host', bridge)
  bridge.dispose()

  const boot = await vm.evalCodeAsync(PRELUDE, 'prelude.js')
  if (boot.error) {
    const err = vm.dump(boot.error); boot.error.dispose(); vm.dispose()
    throw new JsError('sandbox prelude failed: ' + JSON.stringify(err))
  }
  boot.value.dispose()

  let disposed = false
  let busy = Promise.resolve()

  async function evalRaw(code, bindings, global) {
    if (Date.now() > deadline) throw new JsError('书源脚本运行超时')
    let script
    if (global) script = code
    else {
      // Each script gets its own scope (so `const` may repeat across rules); globals from jsLib stay visible.
      const names = Object.keys(bindings).filter((k) => /^[A-Za-z_$][\w$]*$/.test(k))
      const values = names.map((k) => `__wrap(${JSON.stringify(bindings[k] === undefined ? null : bindings[k])})`)
      script = `(function (${names.join(', ')}) { return eval(${JSON.stringify(code)}); })(${values.join(', ')})`
    }
    const res = await vm.evalCodeAsync(script, 'source.js')
    if (res.error) {
      const err = vm.dump(res.error)
      res.error.dispose()
      const msg = typeof err === 'object' && err ? `${err.name || 'Error'}: ${err.message}` : String(err)
      throw new JsError('书源 JS 出错：' + msg)
    }
    const value = vm.dump(res.value)
    res.value.dispose()
    return value
  }

  return {
    /** Evaluate one script; the completion value is returned as JSON-like data. */
    eval(code, bindings = {}, global = false) {
      if (disposed) throw new JsError('sandbox disposed')
      // QuickJS asyncify allows a single suspended evaluation at a time.
      const run = busy.then(() => evalRaw(code, bindings, global))
      busy = run.catch(() => {})
      return run
    },
    dispose() {
      if (disposed) return
      disposed = true
      busy.finally(() => { try { vm.dispose() } catch {} })
    },
  }
}

function parseMaybeJson(v) {
  if (!v) return undefined
  if (typeof v === 'object') return v
  try { return JSON.parse(String(v)) } catch { return undefined }
}
