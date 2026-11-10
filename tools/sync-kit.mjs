#!/usr/bin/env node
/**
 * Copy the shared kits into every plugin:
 *   tools/kit/dock.js -> between `// <yk-kit>` and `// </yk-kit>` in <plugin>/client.js
 *   tools/kit/net.js  -> <plugin>/net.js (only for plugins that already have one)
 *   <plugin>/bank.js  -> between `// <kg-bank>` and `// </kg-bank>` in that plugin's client.js
 *
 *   node tools/sync-kit.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dock = fs.readFileSync(path.join(ROOT, 'tools/kit/dock.js'), 'utf8').trimEnd()
const net = fs.readFileSync(path.join(ROOT, 'tools/kit/net.js'), 'utf8')

for (const dir of fs.readdirSync(ROOT)) {
  const client = path.join(ROOT, dir, 'client.js')
  if (!fs.existsSync(client)) continue
  let src = fs.readFileSync(client, 'utf8')
  const original = src
  const inline = (tag, content, origin) => {
    const begin = `// <${tag}>`, end = `// </${tag}>`
    const i = src.indexOf(begin)
    const j = src.indexOf(end)
    if (i < 0 || j < i) return
    const indent = src.slice(src.lastIndexOf('\n', i) + 1, i)
    const body = content.split('\n').map((l) => (l ? indent + l : l)).join('\n')
    src = src.slice(0, i) + begin + ` generated from ${origin} — do not edit here\n` + body + '\n' + indent + src.slice(j)
  }
  inline('yk-kit', dock, 'tools/kit/dock.js')
  const bank = path.join(ROOT, dir, 'bank.js')
  if (fs.existsSync(bank)) inline('kg-bank', fs.readFileSync(bank, 'utf8').trimEnd(), `${dir}/bank.js`)
  if (src !== original) { fs.writeFileSync(client, src); console.log('client kit ->', dir) }
  const netFile = path.join(ROOT, dir, 'net.js')
  if (fs.existsSync(netFile) && fs.readFileSync(netFile, 'utf8') !== net) { fs.writeFileSync(netFile, net); console.log('net kit    ->', dir) }
}
