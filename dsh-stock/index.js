/**
 * Host half of the stock-watch widget.
 *   quote  { codes: ['sh600519','hk00700','usAAPL', ...] } -> quotes (Tencent qt)
 *   fund   { codes: ['161725', ...] }                       -> latest NAV (Eastmoney)
 *   search { q }                                             -> suggestions
 */
import { RemoteError, getJson, registerOps, request } from './net.js'

export const inject = ['connection']

const CODE = /^(sh|sz|bj|hk|us)[A-Za-z0-9.]{1,12}$/
const FUND = /^\d{6}$/
const n = (v) => { if (v === null || v === undefined || v === '') return null; const x = Number(v); return Number.isFinite(x) ? x : null }

function parseTime(market, s) {
  s = String(s || '')
  let m = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/.exec(s)
  if (m) return `${m[2]}-${m[3]} ${m[4]}:${m[5]}`
  m = /^(\d{4})[/-](\d{2})[/-](\d{2}) (\d{2}):(\d{2})/.exec(s)
  if (m) return `${m[2]}-${m[3]} ${m[4]}:${m[5]}${market === 'us' ? ' 美东' : ''}`
  return ''
}

async function quote({ codes }, signal) {
  const list = [...new Set((Array.isArray(codes) ? codes : []).map(String).filter((c) => CODE.test(c)))].slice(0, 80)
  if (!list.length) return []
  const res = await request(`https://qt.gtimg.cn/q=${list.join(',')}`, { signal, encoding: 'gb18030', headers: { Referer: 'https://gu.qq.com/' }, timeoutMs: 10000 })
  if (res.status !== 200) throw new RemoteError(`行情接口 HTTP ${res.status}`)
  const out = []
  for (const line of res.text.split(';')) {
    const m = /v_([A-Za-z0-9.]+)="([^"]*)"/.exec(line)
    if (!m || !m[2] || !m[2].includes('~')) continue
    const f = m[2].split('~')
    const market = m[1].slice(0, 2)
    const price = n(f[3])
    const prev = n(f[4])
    out.push({
      code: m[1], market, name: f[1], symbol: f[2], price, prev, open: n(f[5]),
      change: n(f[31]), pct: n(f[32]), high: n(f[33]), low: n(f[34]),
      time: parseTime(market, f[30]),
      // a suspended / not-yet-open security reports price 0
      suspended: !price,
    })
  }
  return out
}

async function fund({ codes }, signal) {
  const list = [...new Set((Array.isArray(codes) ? codes : []).map(String).filter((c) => FUND.test(c)))].slice(0, 50)
  if (!list.length) return []
  const d = await getJson(`https://fundmobapi.eastmoney.com/FundMNewApi/FundMNFInfo?pageIndex=1&pageSize=50&plat=Android&appType=ttjj&product=EFund&Version=1&deviceid=dsh&Fcodes=${list.join(',')}`, { signal, timeoutMs: 10000 })
  return (d.Datas || []).map((x) => ({
    code: x.FCODE, name: x.SHORTNAME, nav: n(x.NAV), pct: n(x.NAVCHGRT), date: x.PDATE,
    // intraday estimate, when the data source still publishes one
    est: n(x.GSZ), estPct: n(x.GSZZL), estTime: x.GZTIME || '',
  }))
}

const TYPE = { 'GP-A': 'A股', 'GP-B': 'B股', GP: '股票', ZS: '指数', ETF: 'ETF', LOF: 'LOF', KJ: '基金', QDII: 'QDII', FJ: '基金', JJ: '基金' }

async function search({ q }, signal) {
  const query = String(q || '').trim().slice(0, 30)
  if (!query) return []
  const [stocks, funds] = await Promise.all([
    request(`https://smartbox.gtimg.cn/s3/?v=2&t=all&q=${encodeURIComponent(query)}`, { signal, timeoutMs: 8000, headers: { Referer: 'https://gu.qq.com/' } })
      .then((r) => {
        const body = /v_hint="([^"]*)"/.exec(r.text)?.[1] || ''
        if (!body || body === 'N') return []
        const decoded = body.replace(/\\u([0-9a-fA-F]{4})/g, (_, x) => String.fromCharCode(parseInt(x, 16)))
        return decoded.split('^').map((row) => row.split('~')).filter((f) => f.length >= 5 && /^(sh|sz|bj|hk|us)$/.test(f[0]))
          .map((f) => {
            const sym = f[0] === 'us' ? f[1].split('.')[0].toUpperCase() : f[1]
            return { kind: 'stock', code: f[0] + sym, name: f[2], type: TYPE[f[4]] || f[4], market: f[0] }
          })
      }).catch(() => []),
    getJson(`https://fundsuggest.eastmoney.com/FundSearch/api/FundSearchAPI.ashx?m=1&key=${encodeURIComponent(query)}`, { signal, timeoutMs: 8000 })
      .then((d) => (d.Datas || []).filter((x) => x.CATEGORY === 700 && FUND.test(x.CODE)).slice(0, 8).map((x) => ({ kind: 'fund', code: x.CODE, name: x.NAME, type: x.FundBaseInfo?.FTYPE || '基金' })))
      .catch(() => []),
  ])
  return [...stocks.slice(0, 12), ...funds]
}

export const __ops = { quote, fund, search }

export function apply(ctx) {
  registerOps(ctx, 'stock', {
    quote: (p, signal) => quote(p ?? {}, signal),
    fund: (p, signal) => fund(p ?? {}, signal),
    search: (p, signal) => search(p ?? {}, signal),
  })
}
