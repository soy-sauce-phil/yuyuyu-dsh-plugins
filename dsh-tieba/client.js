window.__ModuleLoader__.load({
  id: '@soy-sauce-phil/dsh-tieba',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const { useState, useEffect, useRef, useSyncExternalStore } = React
    let ReactDOM = null
    try { ReactDOM = require('react-dom') } catch {}

    const STORAGE_KEY = 'dsh-tieba:v1'

    const CSS = `
.tb-card{box-sizing:border-box;width:100%;margin:0 2px 6px;border:.5px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);display:flex;flex-direction:column;overflow:hidden;font-size:13px}
.tb-grip{height:6px;cursor:ns-resize;flex:none;display:flex;justify-content:center;align-items:center}
.tb-grip::after{content:"";width:28px;height:3px;border-radius:2px;background:var(--dsw-alias-border-l2);opacity:0;transition:opacity .15s}
.tb-card:hover .tb-grip::after{opacity:1}
.tb-head{display:flex;align-items:center;gap:2px;padding:0 6px 4px 8px;flex:none;min-width:0}
.tb-title{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500}
.tb-ibtn{width:24px;height:24px;flex:none;border:none;background:transparent;border-radius:6px;color:var(--dsw-alias-label-secondary);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;padding:0}
.tb-ibtn:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.tb-ibtn.tb-on{color:var(--dsw-alias-brand-primary)}
.tb-ibtn:disabled{opacity:.4;cursor:default;background:transparent}
.tb-body{flex:none;display:flex;flex-direction:column;border-top:.5px solid var(--dsw-alias-border-l1);min-height:0}
.tb-scroll{flex:1;min-height:0;overflow-y:auto;padding:4px}
.tb-muted{color:var(--dsw-alias-label-secondary);font-size:12px}
.tb-err{color:var(--dsw-alias-state-error-primary);font-size:12px;word-break:break-word;padding:6px 8px}
.tb-row{padding:6px 8px;border-radius:6px;cursor:pointer;min-width:0}
.tb-row:hover{background:var(--dsw-alias-bg-layer-2)}
.tb-ell{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tb-tag{display:inline-block;font-size:10px;line-height:14px;padding:0 3px;border-radius:3px;margin-right:4px;vertical-align:1px;color:#fff}
.tb-form{display:flex;gap:4px;padding:6px 6px 4px;flex:none}
.tb-input,.tb-textarea{box-sizing:border-box;border:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border-radius:6px;font:inherit;font-size:12px;padding:3px 6px;min-width:0}
.tb-input{flex:1}
.tb-textarea{width:100%;height:60px;resize:vertical;font-family:ui-monospace,monospace;font-size:11px}
.tb-input:focus,.tb-textarea:focus{outline:1px solid var(--dsw-alias-brand-primary);outline-offset:-1px}
.tb-btn{border:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border-radius:6px;padding:2px 8px;font:inherit;font-size:12px;cursor:pointer;white-space:nowrap}
.tb-btn:hover{background:var(--dsw-alias-bg-layer-2)}
.tb-btn:disabled{opacity:.45;cursor:default}
.tb-btn.tb-on{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary)}
.tb-sec{font-size:11px;color:var(--dsw-alias-label-secondary);padding:8px 8px 2px}
.tb-chips{display:flex;flex-wrap:wrap;gap:4px;padding:4px 6px}
.tb-chip{border:.5px solid var(--dsw-alias-border-l2);border-radius:10px;padding:1px 8px;font-size:12px;cursor:pointer;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;background:transparent;color:inherit;font-family:inherit}
.tb-chip:hover{background:var(--dsw-alias-bg-layer-2)}
.tb-post{padding:8px 8px 6px;border-bottom:.5px solid var(--dsw-alias-border-l1)}
.tb-post:last-child{border-bottom:none}
.tb-meta{display:flex;gap:6px;align-items:baseline;font-size:11px;color:var(--dsw-alias-label-secondary);margin-bottom:3px;min-width:0}
.tb-author{font-weight:500;color:var(--dsw-alias-label-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
.tb-lz{color:var(--dsw-alias-brand-primary);background:color-mix(in srgb,var(--dsw-alias-brand-primary) 15%,transparent);border-radius:3px;padding:0 3px;font-size:10px}
.tb-content{line-height:1.65;word-break:break-word;white-space:pre-wrap}
.tb-content a{color:var(--dsw-alias-brand-primary)}
.tb-img{display:block;max-width:100%;max-height:180px;border-radius:6px;margin:4px 0;cursor:zoom-in;background:var(--dsw-alias-bg-layer-2)}
.tb-img.tb-small{display:inline-block;max-height:40px;margin:0 2px;vertical-align:middle}
.tb-thumbs{display:flex;gap:4px;margin-top:4px}
.tb-thumbs img{width:56px;height:56px;object-fit:cover;border-radius:4px;background:var(--dsw-alias-bg-layer-2)}
.tb-subs{margin-top:6px;padding:4px 8px;border-radius:6px;background:var(--dsw-alias-bg-layer-2);font-size:12px}
.tb-sub{padding:3px 0;line-height:1.55;word-break:break-word;white-space:pre-wrap}
.tb-link{color:var(--dsw-alias-brand-primary);cursor:pointer;font-size:12px;background:none;border:none;padding:0;font-family:inherit}
.tb-foot{flex:none;display:flex;align-items:center;justify-content:space-between;gap:4px;padding:4px 6px;border-top:.5px solid var(--dsw-alias-border-l1)}
.tb-tabs{display:flex;gap:2px;padding:6px 6px 2px;flex:none}
.tb-tab{flex:1;border:none;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;padding:3px 0;border-radius:6px;cursor:pointer}
.tb-tab:hover{background:var(--dsw-alias-bg-layer-2)}
.tb-tab.tb-on{color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2);font-weight:500}
.tb-lb{position:fixed;inset:0;z-index:2147483000;background:rgba(0,0,0,.82);display:flex;align-items:center;justify-content:center;cursor:zoom-out}
.tb-lb img{max-width:92vw;max-height:88vh;object-fit:contain;border-radius:4px;box-shadow:0 8px 40px rgba(0,0,0,.5);cursor:default;background:#222}
.tb-lb-btn{position:absolute;border:none;background:rgba(255,255,255,.14);color:#fff;border-radius:50%;width:36px;height:36px;font-size:20px;line-height:36px;text-align:center;cursor:pointer;padding:0}
.tb-lb-btn:hover{background:rgba(255,255,255,.28)}
.tb-lb-bar{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);display:flex;gap:12px;align-items:center;color:#ddd;font-size:12px}
.tb-lb-bar button{border:none;background:rgba(255,255,255,.14);color:#fff;border-radius:6px;padding:4px 10px;font:inherit;font-size:12px;cursor:pointer}
.tb-check{display:inline-flex;align-items:center;gap:4px;font-size:12px;cursor:pointer;user-select:none;padding:2px 6px 2px 2px;border-radius:6px}
.tb-check:hover{background:var(--dsw-alias-bg-layer-2)}
.tb-check input{margin:0;accent-color:var(--dsw-alias-brand-primary);cursor:pointer}
.tb-check.tb-on{color:var(--dsw-alias-brand-primary)}
.tb-spin{animation:tb-spin .8s linear infinite}
@keyframes tb-spin{to{transform:rotate(360deg)}}
.tb-mini{margin:0 2px 6px 6px;width:26px;height:26px;border-radius:7px;border:.5px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;padding:0;flex:none}
.tb-mini:hover{color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2)}
`

    // ------------------------------------------------------------ icons
    const svg = (d, size = 15) => h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }, ...d.map((p, i) => h('path', { key: i, d: p })))
    const Icons = {
      tieba: () => svg(['M4 5h16v11H9l-5 4z', 'M8 9h8', 'M8 12.5h5']),
      back: () => svg(['M15 6l-6 6 6 6']),
      home: () => svg(['M4 11l8-7 8 7', 'M6 9.5V20h12V9.5']),
      user: () => svg(['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6']),
      refresh: () => svg(['M20 11a8 8 0 1 0-2.3 5.7', 'M20 4v7h-7'], 14),
      external: () => svg(['M14 4h6v6', 'M20 4l-9 9', 'M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5'], 14),
      down: () => svg(['M6 9l6 6 6-6']),
      hide: () => svg(['M3 3l18 18', 'M10.6 6.1A9.8 9.8 0 0 1 12 6c5 0 9 6 9 6a16 16 0 0 1-2.6 3.2', 'M6.6 6.6C4.3 8.1 3 12 3 12s4 6 9 6a8.6 8.6 0 0 0 4.4-1.2', 'M9.9 9.9a3 3 0 0 0 4.2 4.2'], 14),
    }

    // ------------------------------------------------------------ helpers
    function ago(sec) {
      if (!sec) return ''
      const d = Date.now() / 1000 - sec
      if (d < 60) return '刚刚'
      if (d < 3600) return Math.floor(d / 60) + ' 分钟前'
      if (d < 86400) return Math.floor(d / 3600) + ' 小时前'
      const dt = new Date(sec * 1000)
      const now = new Date()
      const md = `${dt.getMonth() + 1}-${dt.getDate()}`
      return dt.getFullYear() === now.getFullYear() ? md : `${dt.getFullYear()}-${md}`
    }
    const num = (n) => (n >= 10000 ? (n / 10000).toFixed(n >= 100000 ? 0 : 1) + '万' : String(n))
    // Replying happens on the Tieba web page (no posting from the plugin); ?pid=…#… jumps to that floor.
    const replyInBrowser = (tid, pid) => openExternal(pid ? `https://tieba.baidu.com/p/${tid}?pid=${pid}#${pid}` : `https://tieba.baidu.com/p/${tid}`)
    const openExternal = (url) => { if (/^https?:\/\//.test(url)) window.open(url, '_blank', 'noopener,noreferrer') }

    // ------------------------------------------------------------ store
    const defaults = { stack: [{ view: 'home' }], homeTab: 'rec', recent: [], collapsed: false, hidden: false, height: 320, fontSize: 13 }
    function createStore() {
      let state
      try { state = { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } } catch { state = { ...defaults } }
      if (!Array.isArray(state.stack) || !state.stack.length) state.stack = defaults.stack
      const listeners = new Set()
      let timer = null
      return {
        get: () => state,
        subscribe: (fn) => { listeners.add(fn); return () => listeners.delete(fn) },
        set(patch) {
          state = { ...state, ...(typeof patch === 'function' ? patch(state) : patch) }
          if (!timer) timer = setTimeout(() => { timer = null; try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch {} }, 300)
          for (const fn of [...listeners]) fn()
        },
      }
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        const store = createStore()
        const useStore = () => useSyncExternalStore(store.subscribe, store.get)

        // ---- Shared sidebar-dock protocol (same code in every sidebar widget plugin).
        // ⌥⇧<letter> expands / collapses one widget (the others collapse and their
        // icons hide); ⌥⇧H hides / shows ALL widgets at once. New widgets join by
        // registering their id + letter here.
        const DOCK_ID = 'tieba', DOCK_KEY = 'T', DOCK_LABEL = '贴吧'
        const isMacKb = /Mac|iP(hone|ad)/.test(navigator.platform || navigator.userAgent)
        const keyLabel = (k) => (isMacKb ? '⌥⇧' + k : 'Alt+Shift+' + k)
        const KEY_TOGGLE = keyLabel(DOCK_KEY)
        const KEY_HIDE = keyLabel('H')
        const bus = window.__dshSidebarDocks2 || (window.__dshSidebarDocks2 = (() => {
          const b = { open: null, hidden: false, docks: {}, listeners: new Set() }
          try { b.hidden = localStorage.getItem('dsh-sidebar-docks:hidden') === '1' } catch {}
          b.emit = () => { for (const fn of [...b.listeners]) fn() }
          b.setOpen = (id) => { if (b.open !== id) { b.open = id; b.emit() } }
          b.setHidden = (v) => { if (b.hidden === v) return; b.hidden = v; try { localStorage.setItem('dsh-sidebar-docks:hidden', v ? '1' : '0') } catch {}; b.emit() }
          b.help = () => Object.values(b.docks).map((d) => `${keyLabel(d.key)} ${d.label}`).concat(`${keyLabel('H')} 全部隐藏/显示`).join('\n')
          return b
        })())
        const useBus = (pick) => useSyncExternalStore((fn) => { bus.listeners.add(fn); return () => bus.listeners.delete(fn) }, () => pick(bus))
        const useOpenDock = () => useBus((b) => b.open)
        const useDocksHidden = () => useBus((b) => b.hidden)
        ctx.effect(() => {
          bus.docks[DOCK_ID] = {

            id: DOCK_ID, key: DOCK_KEY, label: DOCK_LABEL, order: -90, icon: () => Icons.tieba(),

            expand: () => store.set({ collapsed: false }),

            collapse: () => store.set({ collapsed: true }),

            isOpen: () => !store.get().collapsed,

            badge: () => null,

          }

          bus.emit && bus.emit()
          if (store.get().hidden) store.set({ hidden: false }) // per-widget hide replaced by the shared one
          const isOpen = () => !store.get().collapsed && !bus.hidden
          const sync = () => { if (isOpen()) bus.setOpen(DOCK_ID); else if (bus.open === DOCK_ID) bus.setOpen(null) }
          const onBus = () => { if (bus.open && bus.open !== DOCK_ID && isOpen()) store.set({ collapsed: true }); else sync() }
          const onKey = (e) => {
            if (!e.altKey || !e.shiftKey || e.metaKey || e.ctrlKey || e.isComposing || e.repeat) return
            if (e.code === 'Key' + DOCK_KEY) {
              e.preventDefault()
              if (bus.hidden) { bus.setHidden(false); store.set({ collapsed: false }) } else store.set((st) => ({ collapsed: !st.collapsed }))
            } else if (e.code === 'KeyR' && DOCK_ID === 'tieba' && bus.open === DOCK_ID) {
              e.preventDefault()
              refresh()
            } else if (e.code === 'KeyH' && !e.__dshDockHandled) {
              e.__dshDockHandled = true // several widgets listen; toggle only once
              e.preventDefault()
              bus.setHidden(!bus.hidden)
            }
          }
          bus.listeners.add(onBus)
          const unsubscribe = store.subscribe(sync)
          window.addEventListener('keydown', onKey, true)
          sync()
          return () => {
            bus.listeners.delete(onBus); unsubscribe(); window.removeEventListener('keydown', onKey, true)
            delete bus.docks[DOCK_ID]
            if (bus.open === DOCK_ID) bus.setOpen(null)
          }
        }, DOCK_ID + ': sidebar dock')

        async function call(op, payload, signal) {
          const connection = ctx.get('connection')
          if (!connection) throw new Error('Host connection is not available')
          const result = await connection.rpc.call('/api', `tieba/${op}`, payload || {}, signal)
          if (!result.ok) throw new Error(result.error?.message || '请求失败')
          return result.value
        }

        // navigation
        const top = () => store.get().stack[store.get().stack.length - 1]
        const push = (entry) => store.set((s) => ({ stack: [...s.stack.slice(-19), entry], collapsed: false }))
        const replaceTop = (patch) => store.set((s) => ({ stack: [...s.stack.slice(0, -1), { ...s.stack[s.stack.length - 1], ...patch }] }))
        const back = () => store.set((s) => ({ stack: s.stack.length > 1 ? s.stack.slice(0, -1) : s.stack }))
        const goHome = () => store.set({ stack: [{ view: 'home' }] })
        const refresh = () => store.set((s) => ({ refreshTick: (s.refreshTick || 0) + 1 }))
        const openForum = (kw) => {
          const name = String(kw || '').trim().replace(/吧$/, '') || String(kw || '').trim()
          if (!name) return
          store.set((s) => ({ recent: [name, ...s.recent.filter((x) => x !== name)].slice(0, 12) }))
          push({ view: 'forum', kw: name, pn: 1, sort: 'reply', good: false })
        }
        const openThread = (tid, title) => push({ view: 'thread', tid: String(tid), title: title || '', pn: 1, lz: false })

        /** Load data for `key`; re-runs when key changes. */
        function useLoad(op, payload, key) {
          const [st, setSt] = useState({ loading: true, data: null, error: null })
          const [nonce, setNonce] = useState(0)
          useEffect(() => {
            const ac = new AbortController()
            setSt((s) => ({ loading: true, data: s.data, error: null }))
            call(op, payload, ac.signal)
              .then((data) => { if (!ac.signal.aborted) setSt({ loading: false, data, error: null }) })
              .catch((e) => { if (!ac.signal.aborted) setSt({ loading: false, data: null, error: e?.message || String(e) }) })
            return () => ac.abort()
          }, [key, nonce])
          return { ...st, reload: () => setNonce((n) => n + 1) }
        }

        // auth status shared across views
        let auth = { loggedIn: false, checked: false }
        const authListeners = new Set()
        const setAuth = (a) => { auth = { ...a, checked: true }; for (const fn of [...authListeners]) fn() }
        const useAuth = () => useSyncExternalStore((fn) => { authListeners.add(fn); return () => authListeners.delete(fn) }, () => auth)
        const refreshAuth = () => call('status').then(setAuth, () => setAuth({ loggedIn: false }))
        refreshAuth()

        // ---------------------------------------------------------- lightbox
        const lb = { list: [], index: -1, listeners: new Set() }
        lb.snap = { list: lb.list, index: lb.index }
        const lbSet = (list, index) => { lb.list = list; lb.index = index; lb.snap = { list, index }; for (const fn of [...lb.listeners]) fn() }
        const useLightbox = () => useSyncExternalStore((fn) => { lb.listeners.add(fn); return () => lb.listeners.delete(fn) }, () => lb.snap)
        function openGallery(img) {
          const scope = img.closest('.tb-scroll') || img.parentNode
          const imgs = [...scope.querySelectorAll('img[data-big]')].filter((x) => !x.classList.contains('tb-small') || x === img)
          const list = imgs.map((x) => x.getAttribute('data-big'))
          lbSet(list, Math.max(0, imgs.indexOf(img)))
        }
        function Lightbox() {
          const { list, index } = useLightbox()
          const open = index >= 0 && list[index]
          useEffect(() => {
            if (!open) return
            const onKey = (e) => {
              if (e.key === 'Escape') lbSet([], -1)
              else if (e.key === 'ArrowLeft' && index > 0) lbSet(list, index - 1)
              else if (e.key === 'ArrowRight' && index < list.length - 1) lbSet(list, index + 1)
              else return
              e.preventDefault(); e.stopPropagation()
            }
            window.addEventListener('keydown', onKey, true)
            return () => window.removeEventListener('keydown', onKey, true)
          }, [open, index, list])
          if (!open) return null
          const stop = (e) => e.stopPropagation()
          const node = h('div', { className: 'tb-lb', onClick: () => lbSet([], -1), role: 'dialog', 'aria-label': '查看图片' },
            h('style', null, CSS),
            h('img', { key: list[index], src: list[index], referrerPolicy: 'no-referrer', alt: '', onClick: stop }),
            h('button', { className: 'tb-lb-btn', style: { top: 14, right: 14 }, title: '关闭 (Esc)', onClick: () => lbSet([], -1) }, '×'),
            index > 0 && h('button', { className: 'tb-lb-btn', style: { left: 14, top: '50%' }, title: '上一张 (←)', onClick: (e) => { stop(e); lbSet(list, index - 1) } }, '‹'),
            index < list.length - 1 && h('button', { className: 'tb-lb-btn', style: { right: 14, top: '50%' }, title: '下一张 (→)', onClick: (e) => { stop(e); lbSet(list, index + 1) } }, '›'),
            h('div', { className: 'tb-lb-bar', onClick: stop },
              list.length > 1 && h('span', null, `${index + 1} / ${list.length}`),
              h('button', { onClick: () => openExternal(list[index]) }, '在浏览器中打开')))
          return ReactDOM?.createPortal && typeof document !== 'undefined' ? ReactDOM.createPortal(node, document.body) : node
        }

        // ---------------------------------------------------------- content
        function Parts({ parts }) {
          return h(React.Fragment, null, parts.map((p, i) => {
            switch (p.t) {
              case 'text': return p.v
              case 'emo': return h('span', { key: i, className: 'tb-muted' }, p.v)
              case 'at': return h('span', { key: i, style: { color: 'var(--dsw-alias-brand-primary)' } }, p.v)
              case 'link': return h('a', { key: i, href: p.href, onClick: (e) => { e.preventDefault(); openExternal(p.href) } }, p.v || p.href)
              case 'video': return h('a', { key: i, href: p.href, onClick: (e) => { e.preventDefault(); openExternal(p.href) } }, '[视频]')
              case 'img': return h('img', {
                key: i, src: p.src, className: 'tb-img' + (p.small ? ' tb-small' : ''), loading: 'lazy', referrerPolicy: 'no-referrer', alt: '',
                'data-big': p.big || p.src,
                onClick: (e) => openGallery(e.currentTarget),
              })
              default: return null
            }
          }))
        }

        // ---------------------------------------------------------- views
        function ThreadRow({ t, dim, showForum }) {
          return h('div', { className: 'tb-row', style: dim ? { opacity: 0.6 } : undefined, onClick: () => openThread(t.tid, t.title), title: t.abstract || t.title },
            h('div', { className: 'tb-ell' },
              t.top && h('span', { className: 'tb-tag', style: { background: '#e5534b' } }, '置顶'),
              t.good && h('span', { className: 'tb-tag', style: { background: '#d29922' } }, '精'),
              t.title),
            t.abstract && t.abstract !== t.title && h('div', { className: 'tb-muted tb-ell' }, t.abstract),
            t.media.length > 0 && h('div', { className: 'tb-thumbs' }, t.media.map((m, i) => h('img', { key: i, src: m.src, loading: 'lazy', referrerPolicy: 'no-referrer', alt: '' }))),
            h('div', { className: 'tb-muted tb-ell', style: { marginTop: 2 } },
              showForum && t.forum && h('span', { className: 'tb-link', style: { fontSize: 11 }, onClick: (e) => { e.stopPropagation(); openForum(t.forum) } }, t.forum + '吧 · '),
              `${t.author} · ${t.replies} 回复 · ${ago(t.lastTime || t.createTime)}`))
        }

        // Feed survives switching tabs / opening a thread and coming back.
        const feed = { threads: [], pn: 0, loading: false, refreshing: false, error: null, listeners: new Set(), scroll: 0, resets: 0 }
        const feedEmit = () => { feed.snap = { ...feed }; for (const fn of [...feed.listeners]) fn() }
        feed.snap = { ...feed }
        const useFeed = () => useSyncExternalStore((fn) => { feed.listeners.add(fn); return () => feed.listeners.delete(fn) }, () => feed.snap)
        async function loadFeed(reset) {
          if (feed.loading) return
          feed.loading = true; feed.refreshing = Boolean(reset); feed.error = null
          feedEmit()
          try {
            if (reset) {
              // a fresh batch (the server never repeats a feed), shown in place of the old list
              const d = await call('recommend', { pn: 1 })
              feed.threads = d.threads; feed.pn = 1; feed.scroll = 0; feed.resets += 1
            } else {
              const d = await call('recommend', { pn: feed.pn + 1 })
              const seen = new Set(feed.threads.map((t) => t.tid))
              feed.threads = [...feed.threads, ...d.threads.filter((t) => !seen.has(t.tid))].slice(-300)
              feed.pn += 1
            }
          } catch (e) { feed.error = e?.message || String(e) }
          feed.loading = false; feed.refreshing = false
          feedEmit()
        }

        function Recommend() {
          const f = useFeed()
          const a = useAuth()
          const ref = useRef(null)
          useEffect(() => {
            if (!feed.threads.length && !feed.loading) loadFeed(true)
            if (ref.current) ref.current.scrollTop = feed.scroll
          }, [])
          useEffect(() => { if (ref.current && f.resets) ref.current.scrollTop = 0 }, [f.resets])
          const { refreshTick } = useStore()
          const seenTick = useRef(refreshTick)
          useEffect(() => { if (refreshTick !== seenTick.current) { seenTick.current = refreshTick; loadFeed(true) } }, [refreshTick])
          const onScroll = (e) => {
            const el = e.currentTarget
            feed.scroll = el.scrollTop
            if (el.scrollHeight - el.scrollTop - el.clientHeight < 120 && !feed.loading && !feed.error && feed.threads.length) loadFeed(false)
          }
          return h('div', { className: 'tb-scroll', ref, onScroll },
            a.checked && !a.loggedIn && h('div', { className: 'tb-muted', style: { padding: '4px 8px' } }, '未登录，推荐不是个性化的'),
            f.refreshing && f.threads.length > 0 && h('div', { className: 'tb-muted', style: { padding: '4px 8px' } }, '正在刷新…'),
            f.threads.map((t) => h(ThreadRow, { key: t.tid, t, showForum: true, dim: f.refreshing })),
            f.error && h('div', { className: 'tb-err' }, f.error, ' ', h('button', { className: 'tb-link', onClick: () => loadFeed(false) }, '重试')),
            h('div', { className: 'tb-muted', style: { padding: 8, textAlign: 'center' } },
              f.loading ? '加载中…' : f.threads.length ? h('button', { className: 'tb-link', onClick: () => loadFeed(false) }, '加载更多') : null))
        }

        function HomeTabs() {
          const { homeTab } = useStore()
          const tab = homeTab === 'forums' ? 'forums' : 'rec'
          const btn = (id, label) => h('button', { className: 'tb-tab' + (tab === id ? ' tb-on' : ''), onClick: () => (tab === id && id === 'rec' ? refresh() : store.set({ homeTab: id })), title: id === 'rec' && tab === 'rec' ? '再点一次刷新' : undefined }, label)
          return h(React.Fragment, null,
            h('div', { className: 'tb-tabs' }, btn('rec', '推荐'), btn('forums', '进吧')),
            tab === 'rec' ? h(Recommend) : h(Home))
        }

        function Home() {
          const { recent } = useStore()
          const a = useAuth()
          const [q, setQ] = useState('')
          const [sug, setSug] = useState([])
          const likedState = useLoad('liked', {}, a.loggedIn ? 'in' : 'out')
          useEffect(() => {
            const text = q.trim()
            if (!text) { setSug([]); return }
            const ac = new AbortController()
            const tm = setTimeout(() => call('suggest', { query: text }, ac.signal).then(setSug, () => {}), 250)
            return () => { clearTimeout(tm); ac.abort() }
          }, [q])
          const liked = likedState.data?.forums || []
          return h('div', { className: 'tb-scroll' },
            h('form', { className: 'tb-form', style: { padding: '4px 2px' }, onSubmit: (e) => { e.preventDefault(); openForum(q) } },
              h('input', { className: 'tb-input', value: q, placeholder: '输入吧名，回车进入', onChange: (e) => setQ(e.target.value) }),
              h('button', { className: 'tb-btn', type: 'submit', disabled: !q.trim() }, '进吧')),
            sug.length > 0 && h('div', null, sug.map((f) => h('div', { key: f.name, className: 'tb-row', onClick: () => openForum(f.name) },
              h('div', { className: 'tb-ell' }, f.name + '吧'),
              h('div', { className: 'tb-muted tb-ell' }, `关注 ${num(f.members)} · 帖子 ${num(f.threads)}` + (f.desc ? ' · ' + f.desc : ''))))),
            !sug.length && recent.length > 0 && h(React.Fragment, null,
              h('div', { className: 'tb-sec' }, '最近访问'),
              h('div', { className: 'tb-chips' }, recent.map((n) => h('button', { key: n, className: 'tb-chip', onClick: () => openForum(n) }, n)))),
            !sug.length && a.loggedIn && h(React.Fragment, null,
              h('div', { className: 'tb-sec' }, `我关注的吧${liked.length ? `（${liked.length}）` : ''}`),
              likedState.loading && !liked.length && h('div', { className: 'tb-muted', style: { padding: 8 } }, '加载中…'),
              likedState.error && h('div', { className: 'tb-err' }, likedState.error),
              likedState.data?.expired && h('div', { className: 'tb-err' }, '登录已过期，请到账号页重新粘贴 BDUSS'),
              h('div', { className: 'tb-chips' }, liked.map((f) => h('button', { key: f.name, className: 'tb-chip', title: `等级 ${f.level}`, onClick: () => openForum(f.name) }, `${f.name} ${f.level ? 'Lv' + f.level : ''}`)))),
            !sug.length && a.checked && !a.loggedIn && h('div', { className: 'tb-muted', style: { padding: '10px 8px' } },
              '未登录也能浏览公开内容。想看「我关注的吧」，可以点右上角 ',
              h('button', { className: 'tb-link', onClick: () => push({ view: 'account' }) }, '账号'),
              ' 粘贴 BDUSS。'))
        }

        function Forum({ entry }) {
          const { kw, pn, sort, good } = entry
          const { refreshTick } = useStore()
          const st = useLoad('forum', { kw, pn, sort, good }, `${kw}|${pn}|${sort}|${good}|${refreshTick || 0}`)
          const scrollRef = useRef(null)
          useEffect(() => { if (scrollRef.current && !st.loading) scrollRef.current.scrollTop = 0 }, [pn, sort, good])
          const d = st.data
          const total = d?.page.total || 0
          const setPage = (p) => replaceTop({ pn: Math.max(1, p) })
          return h(React.Fragment, null,
            h('div', { className: 'tb-form', style: { alignItems: 'center' } },
              h('button', { className: 'tb-btn' + (sort === 'reply' && !good ? ' tb-on' : ''), onClick: () => replaceTop({ sort: 'reply', good: false, pn: 1 }) }, '最新回复'),
              h('button', { className: 'tb-btn' + (sort === 'new' && !good ? ' tb-on' : ''), onClick: () => replaceTop({ sort: 'new', good: false, pn: 1 }) }, '最新发布'),
              h('button', { className: 'tb-btn' + (good ? ' tb-on' : ''), onClick: () => replaceTop({ good: !good, pn: 1 }) }, '精品'),
              h('span', { style: { flex: 1 } }),
              d && h('span', { className: 'tb-muted', title: d.forum.slogan }, `${num(d.forum.members)} 关注`)),
            h('div', { className: 'tb-scroll', ref: scrollRef },
              st.error && h('div', { className: 'tb-err' }, st.error, ' ', h('button', { className: 'tb-link', onClick: st.reload }, '重试')),
              st.loading && !d && h('div', { className: 'tb-muted', style: { padding: 8 } }, '加载中…'),
              d && !d.threads.length && h('div', { className: 'tb-muted', style: { padding: 8 } }, '这一页没有帖子'),
              d && d.threads.map((t) => h(ThreadRow, { key: t.tid, t, dim: st.loading }))),
            h('div', { className: 'tb-foot' },
              h('button', { className: 'tb-btn', disabled: pn <= 1 || st.loading, onClick: () => setPage(pn - 1) }, '上一页'),
              h('span', { className: 'tb-muted' }, st.loading && d ? '加载中…' : `第 ${pn} 页` + (total ? ` / ${num(total)}` : '')),
              h('button', { className: 'tb-btn', disabled: st.loading || (d && !d.page.hasMore), onClick: () => setPage(pn + 1) }, '下一页')))
        }

        function Floor({ tid, post }) {
          const [open, setOpen] = useState(false)
          const [pn, setPn] = useState(1)
          const [st, setSt] = useState({ loading: false, subs: null, page: null, error: null })
          useEffect(() => {
            if (!open) return
            const ac = new AbortController()
            setSt((s) => ({ ...s, loading: true, error: null }))
            call('floor', { tid, pid: post.id, pn }, ac.signal)
              .then((d) => setSt({ loading: false, subs: d.subs, page: d.page, error: null }))
              .catch((e) => { if (!ac.signal.aborted) setSt((s) => ({ ...s, loading: false, error: e?.message || String(e) })) })
            return () => ac.abort()
          }, [open, pn])
          if (!post.subCount && !post.subs.length) return null
          const list = open && st.subs ? st.subs : post.subs
          return h('div', { className: 'tb-subs' },
            list.map((s) => h('div', { key: s.id, className: 'tb-sub' }, h('span', { style: { fontWeight: 500 } }, s.author + '：'), h(Parts, { parts: s.parts }))),
            st.error && h('div', { className: 'tb-err', style: { padding: 0 } }, st.error),
            h('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
              !open && post.subCount > list.length && h('button', { className: 'tb-link', onClick: () => setOpen(true) }, `查看全部 ${post.subCount} 条回复`),
              !open && post.subCount > 0 && !list.length && null,
              open && st.loading && h('span', { className: 'tb-muted' }, '加载中…'),
              open && st.page && st.page.total > 1 && h(React.Fragment, null,
                h('button', { className: 'tb-link', disabled: pn <= 1, onClick: () => setPn(pn - 1) }, '上一页'),
                h('span', { className: 'tb-muted' }, `${pn}/${st.page.total}`),
                h('button', { className: 'tb-link', disabled: pn >= st.page.total, onClick: () => setPn(pn + 1) }, '下一页')),
              open && h('button', { className: 'tb-link', onClick: () => { setOpen(false); setPn(1) } }, '收起')))
        }

        function Thread({ entry }) {
          const { tid, pn, lz } = entry
          const { fontSize } = useStore()
          const { refreshTick } = useStore()
          const st = useLoad('thread', { tid, pn, lz }, `${tid}|${pn}|${lz}|${refreshTick || 0}`)
          const scrollRef = useRef(null)
          // jump to top when the page / filter changes, but keep the position on a plain refresh
          const shownKey = useRef('')
          useEffect(() => {
            const k = `${pn}|${lz}`
            if (st.data && shownKey.current !== k) { shownKey.current = k; if (scrollRef.current) scrollRef.current.scrollTop = 0 }
          }, [st.data])
          useEffect(() => { if (st.data?.thread.title && st.data.thread.title !== entry.title) replaceTop({ title: st.data.thread.title }) }, [st.data])
          const d = st.data
          const total = d?.page.total || 1
          const setPage = (p) => replaceTop({ pn: Math.min(total, Math.max(1, p)) })
          return h(React.Fragment, null,
            h('div', { className: 'tb-form', style: { alignItems: 'center' } },
              h('label', { className: 'tb-check' + (lz ? ' tb-on' : ''), title: '只显示楼主发的楼层' },
                h('input', { type: 'checkbox', checked: Boolean(lz), onChange: (e) => replaceTop({ lz: e.target.checked, pn: 1 }) }),
                '只看楼主'),
              d?.thread.forum && h('button', { className: 'tb-btn', onClick: () => openForum(d.thread.forum) }, d.thread.forum + '吧'),
              h('span', { style: { flex: 1 } }),
              h('button', { className: 'tb-ibtn', title: '在浏览器中打开', onClick: () => openExternal(`https://tieba.baidu.com/p/${tid}`) }, Icons.external())),
            h('div', { className: 'tb-scroll', ref: scrollRef, style: { fontSize } },
              st.error && h('div', { className: 'tb-err' }, st.error, ' ', h('button', { className: 'tb-link', onClick: st.reload }, '重试')),
              st.loading && !d && h('div', { className: 'tb-muted', style: { padding: 8 } }, '加载中…'),
              d && pn === 1 && h('div', { style: { fontWeight: 600, padding: '6px 8px 2px', fontSize: '1.05em' } }, d.thread.title),
              d && d.posts.map((p) => h('div', { key: p.id, className: 'tb-post', style: st.loading ? { opacity: 0.6 } : undefined },
                h('div', { className: 'tb-meta' },
                  h('span', { className: 'tb-author' }, p.author),
                  p.isLz && h('span', { className: 'tb-lz' }, '楼主'),
                  p.level > 0 && h('span', null, 'Lv' + p.level),
                  h('span', { style: { flex: 1 } }),
                  h('span', null, `${p.floor}楼 · ${ago(p.time)}`),
                  h('button', { className: 'tb-link', style: { fontSize: 11 }, title: '在浏览器中打开并定位到这一楼，在网页上回复（回复完回来点刷新）', onClick: () => replyInBrowser(tid, p.id) }, '回复')),
                h('div', { className: 'tb-content' }, h(Parts, { parts: p.parts })),
                h(Floor, { tid, post: p })))),
            h('div', { className: 'tb-foot' },
              h('button', { className: 'tb-btn', disabled: pn <= 1 || st.loading, onClick: () => setPage(pn - 1) }, '上一页'),
              h('span', { className: 'tb-muted' }, st.loading && d ? '加载中…' : `${pn} / ${total}`),
              h('button', { className: 'tb-btn', title: '在浏览器中打开帖子，在网页上回复（回复完回来点刷新）', onClick: () => replyInBrowser(tid) }, '回复帖子'),
              h('button', { className: 'tb-btn', disabled: pn >= total || st.loading, onClick: () => setPage(pn + 1) }, '下一页')))
        }

        function Account() {
          const a = useAuth()
          const [text, setText] = useState('')
          const [busy, setBusy] = useState(false)
          const [msg, setMsg] = useState(null)
          const doLogin = async () => {
            setBusy(true); setMsg(null)
            try { setAuth(await call('login', { credential: text })); setText(''); setMsg({ ok: true, text: '登录成功' }) } catch (e) { setMsg({ ok: false, text: e?.message || String(e) }) } finally { setBusy(false) }
          }
          const doLogout = async () => {
            setBusy(true)
            try { setAuth(await call('logout')) } catch (e) { setMsg({ ok: false, text: e?.message || String(e) }) } finally { setBusy(false) }
          }
          return h('div', { className: 'tb-scroll', style: { padding: 10 } },
            a.loggedIn
              ? h(React.Fragment, null,
                h('div', { style: { marginBottom: 8 } }, '已登录' + (a.name ? `：${a.name}` : '')),
                h('button', { className: 'tb-btn', disabled: busy, onClick: doLogout }, '退出登录（删除本机保存的 BDUSS）'))
              : h(React.Fragment, null,
                a.expired && h('div', { className: 'tb-err', style: { padding: '0 0 6px' } }, '之前保存的 BDUSS 已失效，请重新粘贴。'),
                h('div', { className: 'tb-muted', style: { lineHeight: 1.6, marginBottom: 6 } },
                  '1. 用浏览器登录 tieba.baidu.com', h('br'),
                  '2. 打开开发者工具 → Application(应用) → Cookies → https://tieba.baidu.com', h('br'),
                  '3. 复制 BDUSS 的值（也可以把整段 Cookie 粘进来）'),
                h('textarea', { className: 'tb-textarea', value: text, placeholder: 'BDUSS', onChange: (e) => setText(e.target.value), spellCheck: false, autoComplete: 'off' }),
                h('div', { style: { margin: '6px 0' } }, h('button', { className: 'tb-btn', disabled: busy || !text.trim(), onClick: doLogin }, busy ? '验证中…' : '登录'))),
            msg && h('div', { className: msg.ok ? 'tb-muted' : 'tb-err', style: { padding: '4px 0' } }, msg.text),
            h('div', { className: 'tb-muted', style: { lineHeight: 1.6, marginTop: 10 } },
              '⚠️ BDUSS 等同于百度账号的登录凭证，泄露后别人可以直接登录你的账号。它只保存在本机 ~/.dsh-tieba/auth.json（仅你可读），只会发给百度，不会回传到页面。本插件只读，不会发帖、回帖或签到。'),
            h('div', { className: 'tb-muted', style: { lineHeight: 1.6, marginTop: 8 } }, '快捷键：' + bus.help().split('\n').join('，')))
        }

        function useResize() {
          return (e) => {
            e.preventDefault()
            const startY = e.clientY
            const startH = store.get().height
            const move = (ev) => {
              const max = Math.max(160, window.innerHeight - 260)
              store.set({ height: Math.round(Math.min(max, Math.max(140, startH + (startY - ev.clientY)))) })
            }
            const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
            window.addEventListener('pointermove', move)
            window.addEventListener('pointerup', up)
          }
        }

        function TiebaDock(props) {
          const state = useStore()
          const openDock = useOpenDock()
          const docksHidden = useDocksHidden()

          const hubMode = useBus((b) => Boolean(b.hub && b.docks.hub))
          const onResize = useResize()
          if (props.wide === false || docksHidden) return null
          const entry = state.stack[state.stack.length - 1] || { view: 'home' }
          const title = entry.view === 'forum' ? entry.kw + '吧' : entry.view === 'thread' ? (entry.title || '帖子') : entry.view === 'account' ? '账号' : '贴吧'
          if (state.collapsed) {
            if (openDock && openDock !== DOCK_ID) return null

            if (hubMode) return null
            return h('button', {
              className: 'tb-mini', title: `${title}\n\n快捷键：\n${bus.help()}`, 'aria-label': '展开贴吧',
              onClick: () => store.set({ collapsed: false }),
            }, h('style', null, CSS), Icons.tieba())
          }
          let body
          if (entry.view === 'forum') body = h(Forum, { key: 'f' + entry.kw, entry })
          else if (entry.view === 'thread') body = h(Thread, { key: 't' + entry.tid, entry })
          else if (entry.view === 'account') body = h(Account)
          else body = h(HomeTabs)
          const backToHub = () => { const hub = bus.docks.hub; if (hub && hub.expand) { hub.expand(); bus.setOpen('hub') } else store.set({ collapsed: true }) }
          const showFont = entry.view === 'thread'
          const canRefresh = entry.view === 'forum' || entry.view === 'thread' || (entry.view === 'home' && state.homeTab !== 'forums')
          return h('div', { className: 'tb-card' },
            h('style', null, CSS),
            h('div', { className: 'tb-grip', title: '拖动调整高度', onPointerDown: onResize }),
            h('div', { className: 'tb-head' },
              hubMode && h('button', { className: 'tb-ibtn', title: '返回总入口', 'aria-label': '返回总入口', onClick: backToHub }, Icons.back()),
              state.stack.length > 1
                ? h('button', { className: 'tb-ibtn', title: '返回', 'aria-label': '返回', onClick: back }, Icons.back())
                : h('span', { style: { display: 'inline-flex', color: 'var(--dsw-alias-label-secondary)', marginRight: 4 } }, Icons.tieba()),
              h('div', { className: 'tb-title', title }, title),
              showFont && h('button', { className: 'tb-ibtn', title: '缩小字号', onClick: () => store.set({ fontSize: Math.max(11, state.fontSize - 1) }) }, 'A-'),
              showFont && h('button', { className: 'tb-ibtn', title: '放大字号', onClick: () => store.set({ fontSize: Math.min(20, state.fontSize + 1) }) }, 'A+'),
              canRefresh && h('button', { className: 'tb-ibtn', title: `刷新（${keyLabel('R')}）`, 'aria-label': '刷新', onClick: refresh }, Icons.refresh()),
              h('button', { className: 'tb-ibtn' + (entry.view === 'home' ? ' tb-on' : ''), title: '首页', 'aria-label': '首页', onClick: goHome }, Icons.home()),
              h('button', { className: 'tb-ibtn' + (entry.view === 'account' ? ' tb-on' : ''), title: '账号', 'aria-label': '账号', onClick: () => (entry.view === 'account' ? back() : push({ view: 'account' })) }, Icons.user()),
              h('button', { className: 'tb-ibtn', title: `隐藏所有侧栏小部件（${KEY_HIDE}）\n\n${bus.help()}`, 'aria-label': '隐藏', onClick: () => bus.setHidden(true) }, Icons.hide()),
              h('button', { className: 'tb-ibtn', title: hubMode ? '返回总入口' : `收起（${KEY_TOGGLE}）`, 'aria-label': '收起', onClick: backToHub }, Icons.down())),
            h('div', { className: 'tb-body', style: { height: state.height } }, body),
            h(Lightbox))
        }

        class Boundary extends React.Component {
          constructor(p) { super(p); this.state = { error: null } }
          static getDerivedStateFromError(error) { return { error } }
          componentDidCatch(error) { console.error('[tieba] render failed', error) }
          render() {
            if (this.state.error) {
              return h('div', { style: { margin: '0 2px 6px', padding: 8, border: '.5px solid var(--dsw-alias-state-error-primary)', borderRadius: 8, fontSize: 12, color: 'var(--dsw-alias-state-error-primary)', wordBreak: 'break-word', width: '100%', boxSizing: 'border-box' } },
                '贴吧插件出错：' + (this.state.error?.message || String(this.state.error)),
                h('button', { style: { marginLeft: 6 }, onClick: () => { goHome(); this.setState({ error: null }) } }, '回到首页'))
            }
            return h(TiebaDock, this.props)
          }
        }

        ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({
          name: 'sidebar.footer.action',
          id: 'tieba',
          order: -90,
          label: () => '贴吧',
        }, Boundary))
      },
    }
  },
})
