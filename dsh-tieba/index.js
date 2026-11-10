/**
 * Host half of the sidebar Tieba browser: exact Connection Fetch routes under
 * /api/tieba/<op>, speaking the Connection RPC envelope.
 */
import { TiebaError, floor, forum, liked, login, logout, recommend, status, suggest, thread } from './tieba.js'

export const inject = ['connection']

const OPERATIONS = {
  status: (p, signal) => status(signal),
  login: (p, signal) => login(p?.credential, signal),
  logout: () => logout(),
  liked: (p, signal) => liked(signal),
  suggest: (p, signal) => suggest(p?.query, signal),
  forum: (p, signal) => forum(p ?? {}, signal),
  thread: (p, signal) => thread(p ?? {}, signal),
  floor: (p, signal) => floor(p ?? {}, signal),
  recommend: (p, signal) => recommend(p ?? {}, signal),
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
      path: `/api/tieba/${name}`,
      methods: ['POST'],
      requestBody: 'buffered',
      async fetch(request) {
        let message
        try { message = await request.json() } catch { return new Response('body is not JSON', { status: 400 }) }
        const rpcId = typeof message?.rpcId === 'string' ? message.rpcId : 'invalid-request'
        try {
          return envelope(rpcId, { ok: true, value: await run(message?.payload ?? {}, request.signal) })
        } catch (error) {
          const known = error instanceof TiebaError
          if (!known) console.warn('[tieba]', error)
          return envelope(rpcId, {
            ok: false,
            error: { code: known ? 'tieba/remote' : 'tieba/internal', message: error instanceof Error ? error.message : String(error), details: {} },
          })
        }
      },
    })
  }
}
