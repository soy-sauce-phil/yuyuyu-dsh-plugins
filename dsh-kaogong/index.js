/**
 * Host half of the 考公刷题 widget: serves question packs stored on this machine.
 *
 * A pack is a folder under ~/.dsh-kaogong/banks/<name>/ with
 *   pack.json  { format: 'dsh-kaogong-pack/1', name, note?, papers: [{ id, name, region, level, year, count }],
 *                materials: { [id]: text }, questions: [{ id, cat, tag?, papers?: [paperId], mat?, q, opts, ans: [i], exp? }] }
 *   img/       images referenced from text as {{img:path|WxH}} or {{fx:path}}
 * Nothing here is bundled with the plugin; packs are whatever the user puts in that folder.
 *
 *   packs                   -> { folder, packs: [{ id, name, note, papers, index: [[id, cat, tag, 'p1,p2', hasMaterial]] }] }
 *   questions { pack, ids } -> [{ id, cat, tag, papers, q, opts, ans, exp, material? }]
 *   image { pack, path }    -> { url: 'data:image/...;base64,...' }
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { RemoteError, registerOps } from './net.js'

export const inject = ['connection']

const ROOT = path.join(os.homedir(), '.dsh-kaogong', 'banks')
const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp' }
const cache = new Map() // pack id -> { mtime, data, byId }

function loadPack(id) {
  if (!/^[\w.-]+$/.test(String(id || ''))) throw new RemoteError('题库包名称不对')
  const file = path.join(ROOT, id, 'pack.json')
  let stat
  try { stat = fs.statSync(file) } catch { throw new RemoteError('找不到题库包：' + id) }
  const hit = cache.get(id)
  if (hit && hit.mtime === stat.mtimeMs) return hit
  let data
  try { data = JSON.parse(fs.readFileSync(file, 'utf8')) } catch (e) { throw new RemoteError(`题库包 ${id} 不是有效的 JSON：${e.message}`) }
  if (!Array.isArray(data.questions)) throw new RemoteError(`题库包 ${id} 缺少 questions`)
  const byId = new Map()
  for (const q of data.questions) if (q && q.id) byId.set(String(q.id), q)
  const entry = { mtime: stat.mtimeMs, data, byId }
  cache.set(id, entry)
  return entry
}

function listPacks() {
  let dirs = []
  try { dirs = fs.readdirSync(ROOT, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name) } catch {}
  const packs = []
  for (const id of dirs.sort()) {
    if (!/^[\w.-]+$/.test(id) || !fs.existsSync(path.join(ROOT, id, 'pack.json'))) continue
    try {
      const { data } = loadPack(id)
      packs.push({
        id,
        name: String(data.name || id),
        note: String(data.note || ''),
        papers: Array.isArray(data.papers) ? data.papers : [],
        index: data.questions.filter((q) => q && q.id).map((q) => [String(q.id), String(q.cat || '未分类'), String(q.tag || ''), (q.papers || []).join(','), q.mat ? 1 : 0]),
      })
    } catch (e) {
      packs.push({ id, name: id, note: '读取失败：' + e.message, papers: [], index: [] })
    }
  }
  return { folder: ROOT, packs }
}

function getQuestions({ pack, ids }) {
  const { data, byId } = loadPack(pack)
  const list = Array.isArray(ids) ? ids.slice(0, 300) : []
  return list.map((id) => byId.get(String(id))).filter(Boolean).map((q) => ({
    id: String(q.id), cat: q.cat, tag: q.tag || '', papers: q.papers || [], q: q.q, opts: q.opts, ans: q.ans, exp: q.exp || '',
    material: q.mat ? String(data.materials?.[q.mat] || '') : undefined,
  }))
}

function getImage({ pack, path: rel }) {
  loadPack(pack) // validates the pack id
  const p = String(rel || '')
  if (!p || p.includes('..') || path.isAbsolute(p) || p.includes('\0')) throw new RemoteError('图片路径不对')
  const base = path.join(ROOT, pack, 'img')
  const file = path.resolve(base, p)
  if (!file.startsWith(base + path.sep)) throw new RemoteError('图片路径不对')
  const mime = MIME[path.extname(file).toLowerCase()]
  if (!mime) throw new RemoteError('不支持的图片格式')
  let buf
  try { buf = fs.readFileSync(file) } catch { throw new RemoteError('图片不存在') }
  if (buf.length > 4 * 1024 * 1024) throw new RemoteError('图片太大')
  return { url: `data:${mime};base64,${buf.toString('base64')}` }
}

export function apply(ctx) {
  registerOps(ctx, 'kaogong', {
    packs: () => listPacks(),
    questions: (p) => getQuestions(p ?? {}),
    image: (p) => getImage(p ?? {}),
  })
}
