window.__ModuleLoader__.load({
  id: '@soy-sauce-phil/dsh-hot',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const { useEffect, useRef } = React
    // <yk-kit> generated from tools/kit/dock.js — do not edit here
    // Shared sidebar-dock kit, inlined into each plugin's client.js between the
    // <yk-kit> markers by `node tools/sync-kit.mjs`. Edit this file, not the copies.
    // Expects `React` and `h` (= React.createElement) in scope.
    const YK_CSS = `
    [class$="_footerActions"]{flex-wrap:wrap}
    .yk-card{box-sizing:border-box;width:100%;margin:0 2px 6px;border:.5px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);display:flex;flex-direction:column;overflow:hidden;font-size:13px;outline:none}
    .yk-grip{height:6px;cursor:ns-resize;flex:none;display:flex;justify-content:center;align-items:center}
    .yk-grip::after{content:"";width:28px;height:3px;border-radius:2px;background:var(--dsw-alias-border-l2);opacity:0;transition:opacity .15s}
    .yk-card:hover .yk-grip::after{opacity:1}
    .yk-head{display:flex;align-items:center;gap:2px;padding:0 6px 4px 8px;flex:none;min-width:0}
    .yk-title{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500}
    .yk-ibtn{width:24px;height:24px;flex:none;border:none;background:transparent;border-radius:6px;color:var(--dsw-alias-label-secondary);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;padding:0;font:inherit;font-size:12px}
    .yk-ibtn:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
    .yk-ibtn.yk-on{color:var(--dsw-alias-brand-primary)}
    .yk-ibtn:disabled{opacity:.4;cursor:default;background:transparent}
    .yk-body{flex:none;display:flex;flex-direction:column;border-top:.5px solid var(--dsw-alias-border-l1);min-height:0}
    .yk-scroll{flex:1;min-height:0;overflow-y:auto;padding:4px}
    .yk-pad{padding:6px 8px}
    .yk-muted{color:var(--dsw-alias-label-secondary);font-size:12px}
    .yk-err{color:var(--dsw-alias-state-error-primary);font-size:12px;word-break:break-word;padding:6px 8px}
    .yk-row{padding:6px 8px;border-radius:6px;cursor:pointer;min-width:0}
    .yk-row:hover{background:var(--dsw-alias-bg-layer-2)}
    .yk-ell{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .yk-form{display:flex;gap:4px;padding:6px 6px 4px;flex:none;align-items:center;flex-wrap:wrap}
    .yk-input,.yk-textarea,.yk-select{box-sizing:border-box;border:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border-radius:6px;font:inherit;font-size:12px;padding:3px 6px;min-width:0}
    .yk-input{flex:1}
    .yk-textarea{width:100%;height:70px;resize:vertical;font-family:ui-monospace,monospace;font-size:11px}
    .yk-input:focus,.yk-textarea:focus,.yk-select:focus{outline:1px solid var(--dsw-alias-brand-primary);outline-offset:-1px}
    .yk-btn{border:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border-radius:6px;padding:2px 8px;font:inherit;font-size:12px;cursor:pointer;white-space:nowrap}
    .yk-btn:hover{background:var(--dsw-alias-bg-layer-2)}
    .yk-btn:disabled{opacity:.45;cursor:default}
    .yk-btn.yk-on{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary)}
    .yk-btn.yk-primary{background:color-mix(in srgb,var(--dsw-alias-brand-primary) 15%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-brand-primary) 50%,transparent);color:var(--dsw-alias-brand-primary);font-weight:500}
    .yk-btn.yk-primary:hover{background:color-mix(in srgb,var(--dsw-alias-brand-primary) 24%,transparent)}
    .yk-sec{font-size:11px;color:var(--dsw-alias-label-secondary);padding:8px 8px 2px}
    .yk-link{color:var(--dsw-alias-brand-primary);cursor:pointer;font-size:12px;background:none;border:none;padding:0;font-family:inherit}
    .yk-foot{flex:none;display:flex;align-items:center;justify-content:space-between;gap:4px;padding:4px 6px;border-top:.5px solid var(--dsw-alias-border-l1)}
    .yk-tabs{display:flex;gap:2px;padding:6px 6px 2px;flex:none;overflow-x:auto;scrollbar-width:none}
    .yk-tabs::-webkit-scrollbar{display:none}
    .yk-tab{flex:1 0 auto;border:none;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;padding:3px 6px;border-radius:6px;cursor:pointer;white-space:nowrap}
    .yk-tab:hover{background:var(--dsw-alias-bg-layer-2)}
    .yk-tab.yk-on{color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2);font-weight:500}
    .yk-check{display:inline-flex;align-items:center;gap:4px;font-size:12px;cursor:pointer;user-select:none}
    .yk-check input{margin:0;accent-color:var(--dsw-alias-brand-primary);cursor:pointer}
    .yk-mini{margin:0 0 6px 6px;min-width:26px;height:26px;border-radius:7px;border:.5px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);display:inline-flex;align-items:center;justify-content:center;gap:4px;cursor:pointer;padding:0;flex:none;font:inherit;font-size:11px;font-variant-numeric:tabular-nums;white-space:nowrap}
    .yk-mini.yk-wide{padding:0 7px 0 5px}
    .yk-mini:hover{color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2)}
    .yk-up{color:#e5534b}.yk-down{color:#3fa66b}
    .yk-hub{display:grid;grid-template-columns:repeat(auto-fill,minmax(76px,1fr));gap:5px;padding:6px}
    .yk-hub-tile{display:flex;flex-direction:column;align-items:center;gap:2px;padding:7px 4px 5px;border:.5px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);cursor:pointer;font:inherit;font-size:11px;min-width:0;position:relative}
    .yk-hub-tile:hover{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2)}
    .yk-hub-tile.yk-on{border-color:var(--dsw-alias-brand-primary)}
    .yk-hub-tile .yk-hub-ico{display:inline-flex;color:var(--dsw-alias-label-secondary)}
    .yk-hub-tile:hover .yk-hub-ico{color:var(--dsw-alias-brand-primary)}
    .yk-hub-tile .yk-hub-name{max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .yk-hub-badge{position:absolute;top:1px;right:2px;font-size:10px;line-height:1.2;color:var(--dsw-alias-brand-primary);font-variant-numeric:tabular-nums}
    .yk-hub-key{font-size:9px;color:var(--dsw-alias-label-secondary);opacity:.75}
    .yk-lb{position:fixed;inset:0;z-index:2147483000;background:rgba(0,0,0,.82);display:flex;align-items:center;justify-content:center;cursor:zoom-out}
    .yk-lb img{max-width:92vw;max-height:88vh;object-fit:contain;border-radius:4px;cursor:default;background:#222}
    .yk-lb-btn{position:absolute;border:none;background:rgba(255,255,255,.14);color:#fff;border-radius:50%;width:36px;height:36px;font-size:20px;line-height:36px;text-align:center;cursor:pointer;padding:0}
    .yk-lb-btn:hover{background:rgba(255,255,255,.28)}
    .yk-lb-bar{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);display:flex;gap:12px;align-items:center;color:#ddd;font-size:12px}
    .yk-lb-bar button{border:none;background:rgba(255,255,255,.14);color:#fff;border-radius:6px;padding:4px 10px;font:inherit;font-size:12px;cursor:pointer}
    `
    const ykSvg = (d, size = 15) => h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }, ...d.map((p, i) => h('path', { key: i, d: p })))
    const YkIcons = {
      svg: ykSvg,
      back: () => ykSvg(['M15 6l-6 6 6 6']),
      down: () => ykSvg(['M6 9l6 6 6-6']),
      refresh: () => ykSvg(['M20 11a8 8 0 1 0-2.3 5.7', 'M20 4v7h-7'], 14),
      external: () => ykSvg(['M14 4h6v6', 'M20 4l-9 9', 'M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5'], 14),
      gear: () => ykSvg(['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z'], 14),
      plus: () => ykSvg(['M12 5v14', 'M5 12h14'], 14),
      trash: () => ykSvg(['M4 7h16', 'M10 11v6', 'M14 11v6', 'M6 7l1 13h10l1-13', 'M9 7V4h6v3'], 14),
      hide: () => ykSvg(['M3 3l18 18', 'M10.6 6.1A9.8 9.8 0 0 1 12 6c5 0 9 6 9 6a16 16 0 0 1-2.6 3.2', 'M6.6 6.6C4.3 8.1 3 12 3 12s4 6 9 6a8.6 8.6 0 0 0 4.4-1.2', 'M9.9 9.9a3 3 0 0 0 4.2 4.2'], 14),
    }
    const ykIsMac = /Mac|iP(hone|ad)/.test((typeof navigator !== 'undefined' && (navigator.platform || navigator.userAgent)) || '')
    const ykKey = (k) => (ykIsMac ? '⌥⇧' + k : 'Alt+Shift+' + k)
    const ykOpenExternal = (url) => { if (/^https?:\/\//i.test(String(url))) window.open(url, '_blank', 'noopener,noreferrer') }
    const ykAgo = (ms) => {
      if (!ms) return ''
      const d = (Date.now() - ms) / 1000
      if (d < 60) return '刚刚'
      if (d < 3600) return Math.floor(d / 60) + ' 分钟前'
      if (d < 86400) return Math.floor(d / 3600) + ' 小时前'
      if (d < 86400 * 7) return Math.floor(d / 86400) + ' 天前'
      const t = new Date(ms)
      return `${t.getFullYear() === new Date().getFullYear() ? '' : t.getFullYear() + '-'}${t.getMonth() + 1}-${t.getDate()}`
    }

    function ykStore(key, defaults) {
      let state
      try { state = { ...defaults, ...JSON.parse(localStorage.getItem(key) || '{}') } } catch { state = { ...defaults } }
      const listeners = new Set()
      let timer = null
      const save = () => { timer = null; try { localStorage.setItem(key, JSON.stringify(state)) } catch {} }
      return {
        get: () => state,
        subscribe: (fn) => { listeners.add(fn); return () => listeners.delete(fn) },
        set(patch) {
          const next = typeof patch === 'function' ? patch(state) : patch
          if (!next) return
          state = { ...state, ...next }
          if (!timer) timer = setTimeout(save, 300)
          for (const fn of [...listeners]) fn()
        },
        flush: () => { if (timer) { clearTimeout(timer); save() } },
      }
    }

    /** A tiny external store for non-persisted shared state. */
    function ykAtom(initial) {
      let value = initial
      const listeners = new Set()
      return {
        get: () => value,
        set: (v) => { value = typeof v === 'function' ? v(value) : v; for (const fn of [...listeners]) fn() },
        subscribe: (fn) => { listeners.add(fn); return () => listeners.delete(fn) },
        use: () => React.useSyncExternalStore((fn) => { listeners.add(fn); return () => listeners.delete(fn) }, () => value),
      }
    }

    /**
     * The shared bus on window (also used by the novel / tieba plugins):
     * one expanded widget at a time, ⌥⇧H hides / shows all of them.
     */
    function ykBus() {
      const b = window.__dshSidebarDocks2 || (window.__dshSidebarDocks2 = { open: null, hidden: false, docks: {}, listeners: new Set() })
      if (!b.__yk) {
        b.__yk = true
        b.extras = b.extras || {}
        if (b.hidden === undefined) b.hidden = false
        try { if (localStorage.getItem('dsh-sidebar-docks:hidden') === '1') b.hidden = true } catch {}
        b.emit = () => { for (const fn of [...b.listeners]) fn() }
        b.setOpen = (id) => { if (b.open !== id) { b.open = id; b.emit() } }
        b.setHidden = (v) => { if (b.hidden === v) return; b.hidden = v; try { localStorage.setItem('dsh-sidebar-docks:hidden', v ? '1' : '0') } catch {}; b.emit() }
        // hub mode: every widget hides its own icon and keeps only the 总入口 one.
        // It only takes effect while a dock with id 'hub' is registered, so uninstalling the hub is safe.
        b.hub = true
        try { if (localStorage.getItem('dsh-sidebar-docks:hub') === '0') b.hub = false } catch {}
        b.setHub = (v) => {
          if (b.hub === v) return
          b.hub = v
          try { localStorage.setItem('dsh-sidebar-docks:hub', v ? '1' : '0') } catch {}
          b.emit()
        }
        b.hubOn = () => Boolean(b.hub && b.docks.hub)
      }
      b.extras = b.extras || {}
      b.help = () => Object.values(b.docks).filter((d) => d.key).sort((x, y) => (x.order || 0) - (y.order || 0)).map((d) => `${ykKey(d.key)} ${d.label}`)
        .concat(Object.entries(b.extras).map(([k, label]) => `${ykKey(k)} ${label}`))
        .concat(`${ykKey('H')} 全部隐藏/显示`).join('\n')
      return b
    }

    const ykLightbox = ykAtom({ list: [], index: -1 })
    function YkLightbox() {
      const { list, index } = ykLightbox.use()
      const open = index >= 0 && list[index]
      React.useEffect(() => {
        if (!open) return
        const onKey = (e) => {
          if (e.key === 'Escape') ykLightbox.set({ list: [], index: -1 })
          else if (e.key === 'ArrowLeft' && index > 0) ykLightbox.set({ list, index: index - 1 })
          else if (e.key === 'ArrowRight' && index < list.length - 1) ykLightbox.set({ list, index: index + 1 })
          else return
          e.preventDefault(); e.stopPropagation()
        }
        window.addEventListener('keydown', onKey, true)
        return () => window.removeEventListener('keydown', onKey, true)
      }, [open, index, list])
      if (!open) return null
      const close = () => ykLightbox.set({ list: [], index: -1 })
      const stop = (e) => e.stopPropagation()
      const node = h('div', { className: 'yk-lb', onClick: close, role: 'dialog', 'aria-label': '查看图片' },
        h('style', null, YK_CSS),
        h('img', { key: list[index], src: list[index], referrerPolicy: 'no-referrer', alt: '', onClick: stop }),
        h('button', { className: 'yk-lb-btn', style: { top: 14, right: 14 }, title: '关闭 (Esc)', onClick: close }, '×'),
        index > 0 && h('button', { className: 'yk-lb-btn', style: { left: 14, top: '50%' }, onClick: (e) => { stop(e); ykLightbox.set({ list, index: index - 1 }) } }, '‹'),
        index < list.length - 1 && h('button', { className: 'yk-lb-btn', style: { right: 14, top: '50%' }, onClick: (e) => { stop(e); ykLightbox.set({ list, index: index + 1 }) } }, '›'),
        h('div', { className: 'yk-lb-bar', onClick: stop },
          list.length > 1 && h('span', null, `${index + 1} / ${list.length}`),
          h('button', { onClick: () => ykOpenExternal(list[index]) }, '在浏览器中打开')))
      let RD = null
      try { RD = ykRequire('react-dom') } catch {}
      return RD?.createPortal && typeof document !== 'undefined' ? RD.createPortal(node, document.body) : node
    }
    const ykShowImages = (list, index) => ykLightbox.set({ list, index })
    let ykRequire = () => null

    /**
     * createDock(ctx, cfg) wires one widget into the sidebar.
     *   cfg: { id, key, label, order, icon, storageKey, defaults, height, ns }
     * Returns { store, useStore, bus, call, mount }.
     * mount({ Body, title, actions, mini, onKey }) registers the slot:
     *   Body(): the card content; title(state) string; actions(state) header buttons;
     *   mini(state) optional { text, className } badge on the collapsed icon;
     *   onKey(e) extra ⌥⇧ shortcuts while this widget is expanded (return true if handled).
     */
    function createDock(ctx, cfg) {
      const store = ykStore(cfg.storageKey, { collapsed: true, height: cfg.height || 300, ...(cfg.defaults || {}) })
      const useStore = () => React.useSyncExternalStore(store.subscribe, store.get)
      const bus = ykBus()
      const useBus = (pick) => React.useSyncExternalStore((fn) => { bus.listeners.add(fn); return () => bus.listeners.delete(fn) }, () => pick(bus))
      let extraKey = null

      let miniFn = null
      ctx.effect(() => {
        bus.docks[cfg.id] = {
          id: cfg.id, key: cfg.key, label: cfg.label, order: cfg.order, icon: cfg.icon,
          expand: () => store.set({ collapsed: false }),
          collapse: () => store.set({ collapsed: true }),
          isOpen: () => !store.get().collapsed,
          badge: () => (miniFn ? miniFn(store.get()) : null),
        }
        bus.emit()
        const isOpen = () => !store.get().collapsed && !bus.hidden
        const sync = () => { if (isOpen()) bus.setOpen(cfg.id); else if (bus.open === cfg.id) bus.setOpen(null) }
        const onBus = () => { if (bus.open && bus.open !== cfg.id && isOpen()) store.set({ collapsed: true }); else sync() }
        const onKey = (e) => {
          if (!e.altKey || !e.shiftKey || e.metaKey || e.ctrlKey || e.isComposing || e.repeat) return
          if (cfg.key && e.code === 'Key' + cfg.key) {
            e.preventDefault()
            if (bus.hidden) { bus.setHidden(false); store.set({ collapsed: false }) } else store.set((st) => ({ collapsed: !st.collapsed }))
          } else if (e.code === 'KeyH' && !e.__dshDockHandled) {
            e.__dshDockHandled = true
            e.preventDefault()
            bus.setHidden(!bus.hidden)
          } else if (extraKey && bus.open === cfg.id && extraKey(e)) {
            e.preventDefault()
          }
        }
        bus.listeners.add(onBus)
        const unsubscribe = store.subscribe(sync)
        window.addEventListener('keydown', onKey, true)
        sync()
        return () => {
          bus.listeners.delete(onBus); unsubscribe(); window.removeEventListener('keydown', onKey, true)
          delete bus.docks[cfg.id]
          bus.emit()
          if (bus.open === cfg.id) bus.setOpen(null)
          store.flush()
        }
      }, cfg.id + ': sidebar dock')

      async function call(op, payload, signal) {
        const connection = ctx.get('connection')
        if (!connection) throw new Error('Host 连接不可用')
        const result = await connection.rpc.call('/api', `${cfg.ns}/${op}`, payload || {}, signal)
        if (!result.ok) throw new Error(result.error?.message || '请求失败')
        return result.value
      }

      function onResize(e) {
        e.preventDefault()
        const startY = e.clientY
        const startH = store.get().height
        const move = (ev) => {
          const max = Math.max(180, window.innerHeight - 240)
          store.set({ height: Math.round(Math.min(max, Math.max(140, startH + (startY - ev.clientY)))) })
        }
        const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
        window.addEventListener('pointermove', move)
        window.addEventListener('pointerup', up)
      }

      function mount({ Body, title, actions, mini, onKey }) {
        extraKey = onKey || null
        miniFn = mini || null
        function Dock(props) {
          const state = useStore()
          const open = useBus((b) => b.open)
          const hidden = useBus((b) => b.hidden)
          const hubOn = useBus((b) => b.hubOn())
          if (props.wide === false || hidden) return null
          const t = (title && title(state)) || cfg.label
          if (state.collapsed) {
            if (open && open !== cfg.id) return null
            if (cfg.id !== 'hub' && hubOn) return null
            const badge = mini && mini(state)
            return h('button', {
              className: 'yk-mini' + (badge?.text ? ' yk-wide' : ''), 'aria-label': '展开' + cfg.label,
              title: `${t}${badge?.tip ? '\n' + badge.tip : ''}\n\n快捷键：\n${bus.help()}`,
              onClick: () => store.set({ collapsed: false }),
            }, h('style', null, YK_CSS), cfg.icon(), badge?.text ? h('span', { className: badge.className || '' }, badge.text) : null)
          }
          // in hub mode a card leads back to the launcher grid instead of vanishing
          const backToHub = () => {
            const hub = bus.docks.hub
            if (cfg.id !== 'hub' && hub && hub.expand) { hub.expand(); bus.setOpen('hub') } else store.set({ collapsed: true })
          }
          const collapse = () => (hubOn && cfg.id !== 'hub' ? backToHub() : store.set({ collapsed: true }))
          return h('div', { className: 'yk-card yk-card-' + cfg.id },
            h('style', null, YK_CSS),
            h('div', { className: 'yk-grip', title: '拖动调整高度', onPointerDown: onResize }),
            h('div', { className: 'yk-head' },
              hubOn && cfg.id !== 'hub' && h('button', { key: 'hub-back', className: 'yk-ibtn', title: '返回总入口', 'aria-label': '返回总入口', onClick: backToHub }, YkIcons.back()),
              h('span', { style: { display: 'inline-flex', color: 'var(--dsw-alias-label-secondary)', marginRight: 4 } }, cfg.icon()),
              h('div', { className: 'yk-title', title: t }, t),
              actions ? actions(state) : null,
              h('button', { className: 'yk-ibtn', title: `隐藏所有侧栏小部件（${ykKey('H')}）\n\n${bus.help()}`, 'aria-label': '隐藏', onClick: () => bus.setHidden(true) }, YkIcons.hide()),
              h('button', { className: 'yk-ibtn', title: hubOn && cfg.id !== 'hub' ? '返回总入口' : cfg.key ? `收起（${ykKey(cfg.key)}）` : '收起', 'aria-label': '收起', onClick: collapse }, YkIcons.down())),
            h('div', { className: 'yk-body', style: { height: state.height } }, h(Body)),
            h(YkLightbox))
        }
        class Boundary extends React.Component {
          constructor(p) { super(p); this.state = { error: null } }
          static getDerivedStateFromError(error) { return { error } }
          componentDidCatch(error) { console.error(`[${cfg.id}] render failed`, error) }
          render() {
            if (this.state.error) {
              return h('div', { style: { margin: '0 2px 6px', padding: 8, border: '.5px solid var(--dsw-alias-state-error-primary)', borderRadius: 8, fontSize: 12, color: 'var(--dsw-alias-state-error-primary)', wordBreak: 'break-word', width: '100%', boxSizing: 'border-box' } },
                `${cfg.label}插件出错：` + (this.state.error?.message || String(this.state.error)),
                h('button', { style: { marginLeft: 6 }, onClick: () => { cfg.onReset && cfg.onReset(); this.setState({ error: null }) } }, '重试'))
            }
            return h(Dock, this.props)
          }
        }
        ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({
          name: 'sidebar.footer.action', id: cfg.id, order: cfg.order, label: () => cfg.label,
        }, Boundary))
      }

      return { store, useStore, bus, useBus, call, mount }
    }
    // </yk-kit>
    ykRequire = require

    const BOARDS = [
      { id: 'zhihu', name: '知乎' }, { id: 'baidu', name: '百度' }, { id: 'bili', name: 'B站' },
      { id: 'douyin', name: '抖音' }, { id: 'toutiao', name: '头条' }, { id: 'juejin', name: '掘金' },
      { id: 'hn', name: 'HN' }, { id: 'github', name: 'GitHub' }, { id: 'v2ex', name: 'V2EX' },
    ]
    const CSS = `
.hot-rank{display:inline-block;width:18px;flex:none;text-align:right;margin-right:6px;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary);font-size:12px}
.hot-rank.hot-top{color:#e5534b;font-weight:600}
.hot-line{display:flex;align-items:baseline;min-width:0}
.hot-t{flex:1;min-width:0}
.hot-v{flex:none;margin-left:6px;font-size:11px;color:var(--dsw-alias-label-secondary)}
.hot-visited .hot-t{color:var(--dsw-alias-label-secondary)}
.hot-sub{padding-left:24px;margin-top:1px}
.hot-pic{width:64px;height:40px;object-fit:cover;border-radius:4px;flex:none;margin-left:6px;background:var(--dsw-alias-bg-layer-2)}
`
    const Icon = () => YkIcons.svg(['M12 3c1 3 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 1-3 0 2 1 3 2 3 0-3-1-6 1-9z', 'M8 21h8'])

    return {
      inject: ['slots'],
      apply(ctx) {
        const dock = createDock(ctx, {
          id: 'hot', key: 'B', label: '热榜', order: -70, ns: 'hot', icon: Icon, storageKey: 'dsh-hot:v1', height: 320,
          defaults: { board: 'zhihu', hidden: [], visited: [], showDesc: true, showPics: true },
        })
        const { store, useStore, call } = dock
        // in-memory per-board results; survive collapse / tab switching
        const boards = ykAtom({})
        const loading = new Set()
        async function load(id, refresh) {
          if (loading.has(id)) return
          loading.add(id)
          boards.set((b) => ({ ...b, [id]: { ...(b[id] || {}), loading: true, error: null } }))
          try {
            const d = await call('board', { id, refresh: Boolean(refresh) })
            boards.set((b) => ({ ...b, [id]: { items: d.items, fetchedAt: d.fetchedAt, loading: false, error: null } }))
          } catch (e) {
            boards.set((b) => ({ ...b, [id]: { ...(b[id] || {}), loading: false, error: e?.message || String(e) } }))
          } finally { loading.delete(id) }
        }
        const refresh = () => load(store.get().board, true)
        const markVisited = (url) => store.set((s) => ({ visited: [url, ...s.visited.filter((x) => x !== url)].slice(0, 400) }))

        function Settings() {
          const s = useStore()
          return h('div', { className: 'yk-scroll yk-pad' },
            h('div', { className: 'yk-sec', style: { paddingLeft: 0 } }, '显示哪些榜单'),
            BOARDS.map((b) => h('label', { key: b.id, className: 'yk-check', style: { display: 'flex', padding: '3px 0' } },
              h('input', { type: 'checkbox', checked: !s.hidden.includes(b.id), onChange: (e) => store.set((st) => ({ hidden: e.target.checked ? st.hidden.filter((x) => x !== b.id) : [...st.hidden, b.id] })) }),
              b.name, b.id === 'v2ex' ? h('span', { className: 'yk-muted' }, '（部分网络访问不了）') : null)),
            h('div', { className: 'yk-sec', style: { paddingLeft: 0 } }, '显示'),
            h('label', { className: 'yk-check', style: { display: 'flex', padding: '3px 0' } }, h('input', { type: 'checkbox', checked: s.showDesc, onChange: (e) => store.set({ showDesc: e.target.checked }) }), '摘要 / 作者'),
            h('label', { className: 'yk-check', style: { display: 'flex', padding: '3px 0' } }, h('input', { type: 'checkbox', checked: s.showPics, onChange: (e) => store.set({ showPics: e.target.checked }) }), '封面图（B 站）'),
            h('div', { style: { marginTop: 10 } }, h('button', { className: 'yk-btn', onClick: () => store.set({ visited: [] }) }, '清除已读标记')),
            h('div', { className: 'yk-muted', style: { marginTop: 10, lineHeight: 1.6 } }, '点击条目会在浏览器中打开原网页。数据来自各站公开接口，接口改版时可能失效。'))
        }

        function Board({ id }) {
          const all = boards.use()
          const s = useStore()
          const b = all[id]
          const ref = useRef(null)
          useEffect(() => { if (!b || (!b.items && !b.loading && !b.error) || (b.fetchedAt && Date.now() - b.fetchedAt > 10 * 60000)) load(id) }, [id])
          useEffect(() => { if (ref.current) ref.current.scrollTop = 0 }, [id, b?.fetchedAt])
          const visited = new Set(s.visited)
          return h('div', { className: 'yk-scroll', ref },
            b?.error && h('div', { className: 'yk-err' }, b.error, ' ', h('button', { className: 'yk-link', onClick: () => load(id, true) }, '重试')),
            !b?.items && b?.loading && h('div', { className: 'yk-muted yk-pad' }, '加载中…'),
            b?.items && b.items.map((x, i) => h('div', {
              key: x.url + i, className: 'yk-row' + (visited.has(x.url) ? ' hot-visited' : ''), style: b.loading ? { opacity: 0.6 } : undefined, title: x.desc || x.title,
              onClick: () => { markVisited(x.url); ykOpenExternal(x.url) },
            },
              h('div', { className: 'hot-line' },
                h('span', { className: 'hot-rank' + (i < 3 && !x.top ? ' hot-top' : '') }, x.top ? '顶' : i + 1 - (b.items[0].top ? 1 : 0)),
                h('span', { className: 'hot-t' }, x.title),
                s.showPics && x.pic ? h('img', { className: 'hot-pic', src: x.pic, loading: 'lazy', referrerPolicy: 'no-referrer', alt: '' }) : h('span', { className: 'hot-v' }, x.hot)),
              s.showDesc && (x.desc || (x.pic && x.hot)) && h('div', { className: 'yk-muted yk-ell hot-sub' }, [x.pic ? x.hot : '', x.desc].filter(Boolean).join(' · ')),
              x.comments && x.comments !== x.url && h('div', { className: 'hot-sub' }, h('button', { className: 'yk-link', style: { fontSize: 11 }, onClick: (e) => { e.stopPropagation(); ykOpenExternal(x.comments) } }, '讨论')))),
            b?.fetchedAt && h('div', { className: 'yk-muted', style: { textAlign: 'center', padding: 8 } }, `更新于 ${ykAgo(b.fetchedAt)} · 共 ${b.items.length} 条`))
        }

        function Body() {
          const s = useStore()
          const list = BOARDS.filter((b) => !s.hidden.includes(b.id))
          const current = s.board === 'settings' ? 'settings' : (list.find((b) => b.id === s.board) || list[0] || {}).id
          return h(React.Fragment, null,
            h('style', null, CSS),
            h('div', { className: 'yk-tabs' }, list.map((b) => h('button', {
              key: b.id, className: 'yk-tab' + (current === b.id ? ' yk-on' : ''),
              title: current === b.id ? '再点一次刷新' : undefined,
              onClick: () => (current === b.id ? load(b.id, true) : store.set({ board: b.id })),
            }, b.name))),
            current === 'settings' ? h(Settings) : current ? h(Board, { key: current, id: current }) : h('div', { className: 'yk-muted yk-pad' }, '所有榜单都被隐藏了，点右上角设置打开。'))
        }

        dock.mount({
          Body,
          title: (s) => s.board === 'settings' ? '热榜 · 设置' : '热榜 · ' + (BOARDS.find((b) => b.id === s.board)?.name || ''),
          actions: (s) => [
            s.board !== 'settings' && h('button', { key: 'r', className: 'yk-ibtn', title: `刷新（${ykKey('R')}）`, 'aria-label': '刷新', onClick: refresh }, YkIcons.refresh()),
            h('button', { key: 's', className: 'yk-ibtn' + (s.board === 'settings' ? ' yk-on' : ''), title: '设置', 'aria-label': '设置', onClick: () => store.set((st) => ({ board: st.board === 'settings' ? (st.lastBoard || 'zhihu') : 'settings', lastBoard: st.board === 'settings' ? st.lastBoard : st.board })) }, YkIcons.gear()),
          ],
          onKey: (e) => { if (e.code === 'KeyR') { refresh(); return true } },
        })
      },
    }
  },
})
