/**
 * Host half of the hot-list widget: POST /api/hot/board { id } -> { items, fetchedAt }.
 * Every source is a public endpoint; results are cached for a minute.
 */
import { RemoteError, getJson, registerOps } from './net.js'

export const inject = ['connection']

const num = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0)
const wan = (n) => (n >= 1e8 ? (n / 1e8).toFixed(1) + '亿' : n >= 1e4 ? (n / 1e4).toFixed(n >= 1e6 ? 0 : 1) + '万' : n ? String(n) : '')
const https = (u) => String(u || '').replace(/^http:\/\//, 'https://')
const daysAgo = (d) => new Date(Date.now() - d * 86400000).toISOString().slice(0, 10)

const SOURCES = {
  zhihu: async (signal) => {
    const d = await getJson('https://api.zhihu.com/topstory/hot-list?limit=50', { signal })
    return (d.data || []).map((x) => {
      const id = /questions\/(\d+)/.exec(x.target?.url || '')?.[1]
      return { title: x.target?.title, url: id ? `https://www.zhihu.com/question/${id}` : x.target?.url, hot: x.detail_text || '', desc: x.target?.excerpt || '' }
    })
  },
  baidu: async (signal) => {
    const d = await getJson('https://top.baidu.com/api/board?platform=wise&tab=realtime', { signal })
    const list = d.data?.cards?.[0]?.content?.[0]?.content || d.data?.cards?.[0]?.content || []
    return list.map((x) => ({ title: x.word || x.query, url: `https://www.baidu.com/s?wd=${encodeURIComponent(x.word || x.query || '')}`, hot: x.hotScore ? wan(num(x.hotScore)) : '', top: Boolean(x.isTop), desc: x.desc || '' }))
  },
  bili: async (signal) => {
    const d = await getJson('https://api.bilibili.com/x/web-interface/popular?ps=50&pn=1', { signal, headers: { Referer: 'https://www.bilibili.com/' } })
    if (d.code !== 0) throw new RemoteError(d.message || 'B 站返回错误')
    return (d.data?.list || []).map((x) => ({ title: x.title, url: `https://www.bilibili.com/video/${x.bvid}`, hot: wan(num(x.stat?.view)) + '播放', desc: `${x.owner?.name || ''}${x.rcmd_reason?.content ? ' · ' + x.rcmd_reason.content : ''}`, pic: https(x.pic) }))
  },
  douyin: async (signal) => {
    const d = await getJson('https://www.iesdouyin.com/web/api/v2/hotsearch/billboard/word/', { signal })
    return (d.word_list || []).map((x) => ({ title: x.word, url: `https://www.douyin.com/search/${encodeURIComponent(x.word)}`, hot: wan(num(x.hot_value)) }))
  },
  toutiao: async (signal) => {
    const d = await getJson('https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc', { signal })
    return (d.data || []).map((x) => ({ title: x.Title, url: String(x.Url || '').split('?')[0], hot: wan(num(x.HotValue)) }))
  },
  juejin: async (signal) => {
    const d = await getJson('https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot', { signal })
    return (d.data || []).map((x) => ({ title: x.content?.title, url: `https://juejin.cn/post/${x.content?.content_id}`, hot: wan(num(x.content_counter?.view)) + '阅读', desc: x.author?.name || '' }))
  },
  hn: async (signal) => {
    const d = await getJson('https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=50', { signal })
    return (d.hits || []).sort((a, b) => num(b.points) - num(a.points)).map((x) => ({
      title: x.title, url: x.url || `https://news.ycombinator.com/item?id=${x.objectID}`, hot: `${num(x.points)} 分`,
      desc: `${num(x.num_comments)} 评论 · ${x.author}`, comments: `https://news.ycombinator.com/item?id=${x.objectID}`,
    }))
  },
  github: async (signal) => {
    const d = await getJson(`https://api.github.com/search/repositories?q=created:%3E${daysAgo(7)}&sort=stars&order=desc&per_page=40`, { signal, headers: { Accept: 'application/vnd.github+json' }, timeoutMs: 20000 })
    return (d.items || []).map((x) => ({ title: x.full_name, url: x.html_url, hot: `★ ${wan(num(x.stargazers_count))}`, desc: [x.language, x.description].filter(Boolean).join(' · ') }))
  },
  v2ex: async (signal) => {
    const d = await getJson('https://www.v2ex.com/api/topics/hot.json', { signal, timeoutMs: 20000 })
    return (Array.isArray(d) ? d : []).map((x) => ({ title: x.title, url: x.url, hot: `${num(x.replies)} 回复`, desc: x.node?.title || '' }))
  },
}

const cache = new Map()
async function board({ id, refresh }, signal) {
  const load = SOURCES[id]
  if (!load) throw new RemoteError('未知的榜单')
  const hit = cache.get(id)
  if (hit && !refresh && Date.now() - hit.fetchedAt < 60000) return hit
  const items = (await load(signal)).filter((x) => x.title && /^https?:\/\//.test(x.url || '')).slice(0, 50)
    .map((x) => ({ ...x, title: String(x.title).trim(), desc: String(x.desc || '').replace(/\s+/g, ' ').trim().slice(0, 120) }))
  if (!items.length) throw new RemoteError('榜单是空的，可能接口改版了')
  const value = { items, fetchedAt: Date.now() }
  cache.set(id, value)
  return value
}

export function apply(ctx) {
  registerOps(ctx, 'hot', { board: (p, signal) => board(p ?? {}, signal) })
}

export const __test = { board, SOURCES }
export const __ops = { board }
