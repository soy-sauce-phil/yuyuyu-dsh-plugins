/**
 * Host half of the sidebar novel reader.
 *
 * Network access happens here (no browser CORS limits). Each operation is an
 * exact Connection Fetch route under /api/novelReader/<op>, speaking the
 * Connection RPC envelope so the Client can call it with
 * `ctx.connection.rpc.call('/api', 'novelReader/<op>', payload)`.
 */
import { BUILTIN_SOURCES } from './builtin-sources.js'
import { SourceError, bookInfo, content, loadSources, search, toc } from './engine.js'

export const inject = ['connection']

function sourceFrom(payload) {
  const source = payload?.source
  if (!source || typeof source !== 'object' || typeof source.bookSourceUrl !== 'string') {
    throw new SourceError('missing book source')
  }
  return source
}

function bookFrom(payload) {
  const b = payload?.book && typeof payload.book === 'object' ? payload.book : {}
  const str = (v) => (v === undefined || v === null ? '' : String(v))
  const variables = b.variables && typeof b.variables === 'object' ? b.variables : {}
  return {
    name: str(b.name), author: str(b.author), bookUrl: str(b.bookUrl ?? payload?.bookUrl),
    tocUrl: str(b.tocUrl ?? payload?.tocUrl), origin: str(payload?.source?.bookSourceUrl), variables,
  }
}

const OPERATIONS = {
  builtinSources: async () => BUILTIN_SOURCES,
  loadSources: (p, signal) => loadSources(p?.input, signal),
  search: (p, signal) => search(sourceFrom(p), String(p.key ?? ''), Number(p.page) || 1, signal),
  bookInfo: (p, signal) => bookInfo(sourceFrom(p), bookFrom(p), signal),
  toc: (p, signal) => toc(sourceFrom(p), bookFrom(p), p.tocUrl ? String(p.tocUrl) : undefined, signal),
  content: (p, signal) => content(
    sourceFrom(p),
    bookFrom(p),
    { url: String(p.chapter?.url ?? p.chapterUrl), title: String(p.chapter?.title ?? ''), index: Number(p.chapter?.index) || 0 },
    p.nextChapterUrl ? String(p.nextChapterUrl) : undefined,
    signal,
  ),
}

function envelope(rpcId, result) {
  return new Response(JSON.stringify({ type: 'server-response', rpcId, result }), {
    status: 200,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })
}

export function apply(ctx) {
  for (const [name, run] of Object.entries(OPERATIONS)) {
    ctx.connection.fetch.register({
      path: `/api/novelReader/${name}`,
      methods: ['POST'],
      requestBody: 'buffered',
      async fetch(request) {
        let message
        try {
          message = await request.json()
        } catch {
          return new Response('body is not JSON', { status: 400 })
        }
        const rpcId = typeof message?.rpcId === 'string' ? message.rpcId : 'invalid-request'
        try {
          const value = await run(message?.payload ?? {}, request.signal)
          return envelope(rpcId, { ok: true, value })
        } catch (error) {
          const known = error instanceof SourceError
          if (!known) console.warn('[novel-reader]', error)
          return envelope(rpcId, {
            ok: false,
            error: {
              code: known ? 'novelReader/source' : 'novelReader/internal',
              message: error instanceof Error ? error.message : String(error),
              details: {},
            },
          })
        }
      },
    })
  }
}
