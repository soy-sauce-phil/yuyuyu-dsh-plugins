#!/usr/bin/env node
/**
 * Regenerate market.json (DSH plugin market index, format 1).
 *
 * Every plugin version is pinned to the current HEAD commit, which must
 * already be pushed to origin; the plugin code lives in that commit and
 * market.json is committed afterwards.
 *
 *   node tools/build-market.mjs
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const REPO = 'https://github.com/soy-sauce-phil/yuyuyu-dsh-plugins'
const PLUGINS = [
  { dir: 'dsh-tieba', category: 'community', keywords: ['贴吧', 'tieba', 'baidu', 'sidebar'] },
  { dir: 'dsh-novel-reader', category: 'reading', keywords: ['小说', 'novel', 'legado', '阅读', 'sidebar'] },
]

const git = (...args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim()
const commit = git('rev-parse', 'HEAD')
if (git('status', '--porcelain', '--', ...PLUGINS.map((p) => p.dir))) {
  throw new Error('plugin folders have uncommitted changes; commit and push them first')
}
const remote = git('ls-remote', 'origin')
if (!remote.includes(commit)) throw new Error(`HEAD ${commit} is not on origin yet; run git push first`)

const marketPath = path.join(ROOT, 'market.json')
const previous = fs.existsSync(marketPath) ? JSON.parse(fs.readFileSync(marketPath, 'utf8')) : { plugins: [] }
const now = Math.floor(Date.now() / 1000)

const plugins = PLUGINS.map(({ dir, category, keywords }) => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, dir, 'package.json'), 'utf8'))
  const zh = JSON.parse(fs.readFileSync(path.join(ROOT, dir, 'locale/zh.json'), 'utf8')).meta
  const en = JSON.parse(fs.readFileSync(path.join(ROOT, dir, 'locale/en.json'), 'utf8')).meta
  const old = previous.plugins.find((p) => p.name === pkg.name)
  // keep the history of earlier versions; a re-run for the same version moves it to this commit
  const versions = (old?.versions || []).filter((v) => v.version !== pkg.version)
  versions.unshift({
    version: pkg.version,
    publishTimestamp: now,
    source: { type: 'git', url: REPO, commit, path: dir },
  })
  return {
    name: pkg.name,
    title: { en: en.title, zh: zh.title },
    description: { en: en.description, zh: zh.description },
    icon: `https://raw.githubusercontent.com/soy-sauce-phil/yuyuyu-dsh-plugins/${commit}/${dir}/icon.svg`,
    author: 'soy-sauce-phil',
    homepage: `${REPO}/tree/main/${dir}#readme`,
    repository: { url: REPO, directory: dir },
    metadata: { category, keywords },
    versions,
  }
})

const index = {
  format: 1,
  title: { en: 'yuyuyu DSH plugins', zh: 'yuyuyu 的 DSH 插件' },
  description: { en: 'Personal sidebar widgets for DeepSeek Harness.', zh: '个人做的 DeepSeek Harness 侧栏小插件。' },
  metadata: {
    categories: {
      community: { title: { en: 'Community', zh: '社区' } },
      reading: { title: { en: 'Reading', zh: '阅读' } },
    },
  },
  plugins,
}
fs.writeFileSync(marketPath, JSON.stringify(index, null, 2) + '\n')
console.log(`market.json -> ${commit}`)
for (const p of plugins) console.log(`  ${p.name}@${p.versions[0].version}`)
