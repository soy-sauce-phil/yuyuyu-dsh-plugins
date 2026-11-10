window.__ModuleLoader__.load({
  id: '@soy-sauce-phil/dsh-games',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const { useEffect, useRef, useState } = React
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

    const CSS = `
.gm-wrap{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column;align-items:center;padding:6px;outline:none}
.gm-stat{display:flex;gap:8px;align-items:center;justify-content:space-between;width:100%;max-width:300px;font-size:12px;margin-bottom:6px;font-variant-numeric:tabular-nums}
.gm-stat b{font-weight:600}
.g2-board{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;padding:5px;background:var(--dsw-alias-bg-layer-2);border-radius:8px;width:100%;max-width:260px;aspect-ratio:1;box-sizing:border-box;touch-action:none}
.g2-cell{border-radius:5px;display:flex;align-items:center;justify-content:center;font-weight:700;font-variant-numeric:tabular-nums;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);transition:background .1s}
.ms-board{display:grid;gap:1px;background:var(--dsw-alias-border-l2);border:1px solid var(--dsw-alias-border-l2);border-radius:4px;overflow:hidden;user-select:none}
.ms-cell{width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;background:var(--dsw-alias-bg-layer-2);cursor:pointer;padding:0;border:none;font-family:inherit;color:inherit}
.ms-cell:hover{filter:brightness(1.08)}
.ms-cell.ms-open{background:var(--dsw-alias-bg-layer-1);cursor:default}
.ms-cell.ms-boom{background:#e5534b}
.sd-board{display:grid;grid-template-columns:repeat(9,1fr);width:100%;max-width:270px;aspect-ratio:1;border:2px solid var(--dsw-alias-label-secondary);border-radius:4px;overflow:hidden;box-sizing:border-box}
.sd-cell{display:flex;align-items:center;justify-content:center;font-size:14px;font-variant-numeric:tabular-nums;border-right:.5px solid var(--dsw-alias-border-l2);border-bottom:.5px solid var(--dsw-alias-border-l2);cursor:pointer;user-select:none;position:relative}
.sd-cell.sd-r{border-right:2px solid var(--dsw-alias-label-secondary)}
.sd-cell.sd-b{border-bottom:2px solid var(--dsw-alias-label-secondary)}
.sd-cell.sd-given{font-weight:700}
.sd-cell.sd-user{color:var(--dsw-alias-brand-primary)}
.sd-cell.sd-peer{background:var(--dsw-alias-bg-layer-2)}
.sd-cell.sd-same{background:color-mix(in srgb,var(--dsw-alias-brand-primary) 18%,transparent)}
.sd-cell.sd-sel{background:color-mix(in srgb,var(--dsw-alias-brand-primary) 32%,transparent)}
.sd-cell.sd-bad{color:#e5534b}
.sd-notes{display:grid;grid-template-columns:repeat(3,1fr);width:100%;height:100%;font-size:8px;line-height:1;color:var(--dsw-alias-label-secondary)}
.sd-notes span{display:flex;align-items:center;justify-content:center}
.sd-pad{display:grid;grid-template-columns:repeat(9,1fr);gap:3px;width:100%;max-width:270px;margin-top:6px}
.sd-pad button{padding:4px 0;font-size:13px}
.gm-over{margin-top:8px;font-size:13px;text-align:center}
`
    const Icon = () => YkIcons.svg(['M6 11h4', 'M8 9v4', 'M15 12h.01', 'M18 10h.01', 'M7 6h10a5 5 0 0 1 5 5v1a5 5 0 0 1-9 3h-2a5 5 0 0 1-9-3v-1a5 5 0 0 1 5-5z'])
    const rand = (n) => Math.floor(Math.random() * n)
    const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = rand(i + 1); [a[i], a[j]] = [a[j], a[i]] } return a }
    const clock = (sec) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`

    // ================================================================ 2048
    const G2 = {
      fresh() { let b = Array(16).fill(0); b = G2.spawn(G2.spawn(b)); return { board: b, score: 0, over: false, won: false, keep: false } },
      spawn(b) { const empty = b.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0); if (!empty.length) return b; const n = [...b]; n[empty[rand(empty.length)]] = Math.random() < 0.9 ? 2 : 4; return n },
      /** Slide one row toward index 0. */
      slide(row) {
        const v = row.filter(Boolean); let gained = 0
        for (let i = 0; i < v.length - 1; i++) if (v[i] === v[i + 1]) { v[i] *= 2; gained += v[i]; v.splice(i + 1, 1) }
        while (v.length < 4) v.push(0)
        return { row: v, gained }
      },
      move(b, dir) {
        const idx = (r, c) => (dir === 'left' ? r * 4 + c : dir === 'right' ? r * 4 + 3 - c : dir === 'up' ? c * 4 + r : (3 - c) * 4 + r)
        const n = [...b]; let gained = 0
        for (let r = 0; r < 4; r++) {
          const res = G2.slide([0, 1, 2, 3].map((c) => b[idx(r, c)]))
          gained += res.gained
          res.row.forEach((v, c) => { n[idx(r, c)] = v })
        }
        return { board: n, gained, moved: n.some((v, i) => v !== b[i]) }
      },
      canMove: (b) => b.includes(0) || ['left', 'up'].some((d) => G2.move(b, d).moved),
      colors: { 2: ['#eee4da', '#776e65'], 4: ['#ede0c8', '#776e65'], 8: ['#f2b179', '#fff'], 16: ['#f59563', '#fff'], 32: ['#f67c5f', '#fff'], 64: ['#f65e3b', '#fff'], 128: ['#edcf72', '#fff'], 256: ['#edcc61', '#fff'], 512: ['#edc850', '#fff'], 1024: ['#edc53f', '#fff'], 2048: ['#edc22e', '#fff'] },
    }

    // ================================================================ 扫雷
    const MS_LEVELS = { easy: { w: 9, h: 9, mines: 10, name: '初级' }, mid: { w: 12, h: 12, mines: 24, name: '中级' }, hard: { w: 14, h: 16, mines: 40, name: '高级' } }
    const MS = {
      fresh(level) { const L = MS_LEVELS[level] || MS_LEVELS.easy; return { level, w: L.w, h: L.h, mines: L.mines, cells: null, open: [], flags: [], state: 'ready', start: 0, end: 0, boom: -1 } },
      neighbours(g, i) { const x = i % g.w, y = Math.floor(i / g.w), out = []; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { if (!dx && !dy) continue; const nx = x + dx, ny = y + dy; if (nx >= 0 && ny >= 0 && nx < g.w && ny < g.h) out.push(ny * g.w + nx) } return out },
      /** Lay mines on the first click, keeping the clicked cell and its neighbours safe. */
      lay(g, first) {
        const safe = new Set([first, ...MS.neighbours(g, first)])
        const pool = shuffle([...Array(g.w * g.h).keys()].filter((i) => !safe.has(i))).slice(0, g.mines)
        const mine = new Set(pool)
        return [...Array(g.w * g.h).keys()].map((i) => (mine.has(i) ? -1 : MS.neighbours(g, i).filter((j) => mine.has(j)).length))
      },
      reveal(g, i) {
        if (g.state === 'won' || g.state === 'lost') return g
        let cells = g.cells, state = g.state, start = g.start
        if (!cells) { cells = MS.lay(g, i); state = 'playing'; start = Date.now() }
        const open = new Set(g.open), flags = new Set(g.flags)
        if (flags.has(i) || open.has(i)) return g
        if (cells[i] === -1) return { ...g, cells, state: 'lost', boom: i, end: Date.now(), start, open: [...open, ...cells.map((v, k) => (v === -1 ? k : -1)).filter((k) => k >= 0)] }
        const stack = [i]
        while (stack.length) {
          const k = stack.pop()
          if (open.has(k) || flags.has(k)) continue
          open.add(k)
          if (cells[k] === 0) for (const n of MS.neighbours({ ...g, cells }, k)) if (!open.has(n)) stack.push(n)
        }
        const won = open.size === g.w * g.h - g.mines
        return { ...g, cells, open: [...open], state: won ? 'won' : state, start, end: won ? Date.now() : 0, flags: won ? cells.map((v, k) => (v === -1 ? k : -1)).filter((k) => k >= 0) : g.flags }
      },
      /** Clicking an opened number with enough flags around it opens the rest (chording). */
      chord(g, i) {
        if (g.state !== 'playing' || !g.open.includes(i) || g.cells[i] <= 0) return g
        const ns = MS.neighbours(g, i)
        const flags = new Set(g.flags)
        if (ns.filter((n) => flags.has(n)).length !== g.cells[i]) return g
        let next = g
        for (const n of ns) if (!flags.has(n) && !next.open.includes(n)) next = MS.reveal(next, n)
        return next
      },
      flag(g, i) {
        if (g.state === 'won' || g.state === 'lost' || g.open.includes(i)) return g
        const f = new Set(g.flags); f.has(i) ? f.delete(i) : f.add(i)
        return { ...g, flags: [...f] }
      },
      colors: ['', '#1e6fd9', '#2e9e4f', '#e5534b', '#6b3fb8', '#a3361f', '#1f8a8a', '#333', '#888'],
    }

    // ================================================================ 数独
    const SD_LEVELS = { easy: { holes: 36, name: '简单' }, mid: { holes: 46, name: '中等' }, hard: { holes: 53, name: '困难' } }
    const SD = {
      ok(b, i, v) {
        const r = Math.floor(i / 9), c = i % 9, br = r - (r % 3), bc = c - (c % 3)
        for (let k = 0; k < 9; k++) {
          if (b[r * 9 + k] === v || b[k * 9 + c] === v) return false
          if (b[(br + Math.floor(k / 3)) * 9 + bc + (k % 3)] === v) return false
        }
        return true
      },
      /** Count solutions up to `limit` (backtracking, most-constrained cell first). */
      count(b, limit = 2) {
        let best = -1, bestOpts = null
        for (let i = 0; i < 81; i++) {
          if (b[i]) continue
          const opts = []
          for (let v = 1; v <= 9; v++) if (SD.ok(b, i, v)) opts.push(v)
          if (!opts.length) return 0
          if (!bestOpts || opts.length < bestOpts.length) { best = i; bestOpts = opts; if (opts.length === 1) break }
        }
        if (best < 0) return 1
        let n = 0
        for (const v of bestOpts) { b[best] = v; n += SD.count(b, limit - n); b[best] = 0; if (n >= limit) break }
        return n
      },
      solved() {
        const b = Array(81).fill(0)
        const fill = (i) => {
          if (i === 81) return true
          for (const v of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) { if (SD.ok(b, i, v)) { b[i] = v; if (fill(i + 1)) return true; b[i] = 0 } }
          return false
        }
        fill(0)
        return b
      },
      /** A puzzle with a unique solution: dig holes while the solution stays unique. */
      make(level) {
        const target = (SD_LEVELS[level] || SD_LEVELS.easy).holes
        const solution = SD.solved()
        const puzzle = [...solution]
        let holes = 0
        for (const i of shuffle([...Array(81).keys()])) {
          if (holes >= target) break
          const keep = puzzle[i]
          puzzle[i] = 0
          if (SD.count([...puzzle], 2) === 1) holes++
          else puzzle[i] = keep
        }
        return { level, puzzle, solution, board: [...puzzle], notes: Array(81).fill(0), sel: -1, noteMode: false, mistakes: 0, start: Date.now(), end: 0, hints: 0 }
      },
      done: (g) => g.board.every((v, i) => v === g.solution[i]),
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        const dock = createDock(ctx, {
          id: 'games', key: 'M', label: '小游戏', order: -60, icon: Icon, storageKey: 'dsh-games:v1', height: 360,
          onReset: () => store.set({ g2: G2.fresh(), ms: MS.fresh('easy'), sd: null }),
          defaults: { game: '2048', g2: null, g2best: 0, ms: null, msLevel: 'easy', msBest: {}, sd: null, sdLevel: 'easy', sdBest: {} },
        })
        const { store, useStore, bus } = dock
        const s0 = store.get()
        if (!s0.g2) store.set({ g2: G2.fresh() })
        if (!s0.ms) store.set({ ms: MS.fresh(s0.msLevel) })

        function useTick(active) {
          const [, set] = useState(0)
          useEffect(() => { if (!active) return; const t = setInterval(() => set((n) => n + 1), 1000); return () => clearInterval(t) }, [active])
        }

        // Game keys only while the pointer / focus is inside the card, so editor typing is never captured.
        function useGameKeys(ref, handler) {
          useEffect(() => {
            const onKey = (e) => {
              if (bus.open !== 'games' || e.metaKey || e.ctrlKey || e.altKey) return
              const card = ref.current
              if (!card || !(card.contains(document.activeElement) || card.matches(':hover'))) return
              const tag = String(document.activeElement?.tagName || '')
              if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag)) return
              if (handler(e)) { e.preventDefault(); e.stopPropagation() }
            }
            window.addEventListener('keydown', onKey, true)
            return () => window.removeEventListener('keydown', onKey, true)
          })
        }

        // ------------------------------------------------------------ 2048 view
        function Game2048() {
          const s = useStore()
          const g = s.g2 || G2.fresh()
          const ref = useRef(null)
          const touch = useRef(null)
          const go = (dir) => {
            const cur = store.get().g2
            if (cur.over || (cur.won && !cur.keep)) return
            const r = G2.move(cur.board, dir)
            if (!r.moved) return
            const board = G2.spawn(r.board)
            const score = cur.score + r.gained
            const won = cur.won || board.includes(2048)
            store.set((st) => ({ g2: { ...cur, board, score, won, over: !G2.canMove(board), prev: { board: cur.board, score: cur.score } }, g2best: Math.max(st.g2best, score) }))
          }
          const undo = () => { const cur = store.get().g2; if (cur.prev) store.set({ g2: { ...cur, ...cur.prev, prev: null, over: false } }) }
          useGameKeys(ref, (e) => {
            const map = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down', a: 'left', d: 'right', w: 'up', s: 'down' }
            const dir = map[e.key] || map[String(e.key).toLowerCase()]
            if (dir) { go(dir); return true }
            if (e.key === 'z' || e.key === 'u') { undo(); return true }
          })
          const max = Math.max(...g.board)
          const fs = (v) => (v >= 1024 ? 16 : v >= 128 ? 19 : 22)
          return h('div', { className: 'gm-wrap', ref, tabIndex: 0 },
            h('div', { className: 'gm-stat' },
              h('span', null, '分数 ', h('b', null, g.score)), h('span', null, '最高 ', h('b', null, Math.max(s.g2best, g.score))),
              h('button', { className: 'yk-btn', disabled: !g.prev, onClick: undo, title: '撤销一步（Z）' }, '撤销'),
              h('button', { className: 'yk-btn', onClick: () => store.set({ g2: G2.fresh() }) }, '新局')),
            h('div', {
              className: 'g2-board',
              onPointerDown: (e) => { touch.current = [e.clientX, e.clientY]; ref.current?.focus() },
              onPointerUp: (e) => {
                if (!touch.current) return
                const dx = e.clientX - touch.current[0], dy = e.clientY - touch.current[1]
                touch.current = null
                if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return
                go(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : dy > 0 ? 'down' : 'up')
              },
            }, g.board.map((v, i) => {
              const [bg, fg] = G2.colors[v] || (v ? ['#3c3a32', '#fff'] : [])
              return h('div', { key: i, className: 'g2-cell', style: v ? { background: bg, color: fg, fontSize: fs(v) } : undefined }, v || '')
            })),
            (g.over || (g.won && !g.keep)) && h('div', { className: 'gm-over' },
              g.over ? `游戏结束，最大 ${max}` : '🎉 合成 2048！',
              ' ', g.won && !g.keep && !g.over && h('button', { className: 'yk-btn', onClick: () => store.set({ g2: { ...g, keep: true } }) }, '继续'),
              ' ', h('button', { className: 'yk-btn yk-primary', onClick: () => store.set({ g2: G2.fresh() }) }, '再来')),
            h('div', { className: 'yk-muted', style: { marginTop: 8 } }, '方向键 / WASD / 拖动；鼠标在卡片上时生效'))
        }

        // ------------------------------------------------------------ 扫雷 view
        function Mines() {
          const s = useStore()
          const g = s.ms || MS.fresh(s.msLevel)
          useTick(g.state === 'playing')
          const [flagMode, setFlagMode] = useState(false)
          const open = new Set(g.open), flags = new Set(g.flags)
          const set = (next) => {
            if (next === g) return
            const patch = { ms: next }
            if (next.state === 'won' && g.state !== 'won') {
              const t = Math.round((next.end - next.start) / 1000)
              const best = s.msBest[next.level]
              if (!best || t < best) patch.msBest = { ...s.msBest, [next.level]: t }
            }
            store.set(patch)
          }
          const elapsed = g.state === 'ready' ? 0 : Math.round(((g.end || Date.now()) - g.start) / 1000)
          return h('div', { className: 'gm-wrap' },
            h('div', { className: 'gm-stat' },
              h('select', { className: 'yk-select', value: g.level, onChange: (e) => store.set({ msLevel: e.target.value, ms: MS.fresh(e.target.value) }) },
                Object.entries(MS_LEVELS).map(([k, L]) => h('option', { key: k, value: k }, `${L.name} ${L.w}×${L.h}`))),
              h('span', null, '💣 ', h('b', null, g.mines - flags.size)), h('span', null, '⏱ ', h('b', null, clock(elapsed))),
              h('button', { className: 'yk-btn' + (flagMode ? ' yk-on' : ''), onClick: () => setFlagMode(!flagMode), title: '打开后左键也是插旗' }, '🚩'),
              h('button', { className: 'yk-btn', onClick: () => store.set({ ms: MS.fresh(g.level) }) }, g.state === 'lost' ? '😵' : g.state === 'won' ? '😎' : '🙂')),
            h('div', { className: 'ms-board', style: { gridTemplateColumns: `repeat(${g.w}, 20px)` }, onContextMenu: (e) => e.preventDefault() },
              [...Array(g.w * g.h).keys()].map((i) => {
                const isOpen = open.has(i)
                const v = g.cells ? g.cells[i] : 0
                const label = isOpen ? (v === -1 ? '💣' : v || '') : flags.has(i) ? (g.state === 'lost' && v !== -1 ? '❌' : '🚩') : ''
                return h('button', {
                  key: i, className: 'ms-cell' + (isOpen ? ' ms-open' : '') + (g.boom === i ? ' ms-boom' : ''),
                  style: isOpen && v > 0 ? { color: MS.colors[v] } : undefined,
                  'aria-label': `格子 ${i}`,
                  onClick: () => set(isOpen ? MS.chord(g, i) : flagMode ? MS.flag(g, i) : MS.reveal(g, i)),
                  onContextMenu: (e) => { e.preventDefault(); set(MS.flag(g, i)) },
                  onDoubleClick: () => set(MS.chord(g, i)),
                }, label)
              })),
            g.state === 'won' && h('div', { className: 'gm-over' }, `🎉 用时 ${clock(elapsed)}`, s.msBest[g.level] === elapsed ? '，新纪录！' : s.msBest[g.level] ? `（最佳 ${clock(s.msBest[g.level])}）` : ''),
            g.state === 'lost' && h('div', { className: 'gm-over' }, '踩雷了 💥 ', h('button', { className: 'yk-btn yk-primary', onClick: () => store.set({ ms: MS.fresh(g.level) }) }, '再来')),
            h('div', { className: 'yk-muted', style: { marginTop: 8 } }, '左键翻开，右键插旗，点数字快速翻周围'))
        }

        // ------------------------------------------------------------ 数独 view
        function Sudoku() {
          const s = useStore()
          const ref = useRef(null)
          const g = s.sd
          useTick(Boolean(g && !g.end))
          const newGame = (level) => store.set({ sdLevel: level, sd: SD.make(level) })
          useGameKeys(ref, (e) => {
            const cur = store.get().sd
            if (!cur || cur.end) return
            if (/^[1-9]$/.test(e.key)) { input(Number(e.key)); return true }
            if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') { input(0); return true }
            const mv = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -9, ArrowDown: 9 }[e.key]
            if (mv) { const sel = cur.sel < 0 ? 0 : cur.sel; const n = sel + mv; if (n >= 0 && n < 81 && !(Math.abs(mv) === 1 && Math.floor(n / 9) !== Math.floor(sel / 9))) store.set({ sd: { ...cur, sel: n } }); return true }
            if (e.key === 'n') { store.set({ sd: { ...cur, noteMode: !cur.noteMode } }); return true }
          })
          function input(v) {
            const cur = store.get().sd
            const i = cur.sel
            if (i < 0 || cur.puzzle[i] || cur.end) return
            if (cur.noteMode && v) {
              const notes = [...cur.notes]; notes[i] ^= 1 << v
              store.set({ sd: { ...cur, notes } }); return
            }
            const board = [...cur.board]; board[i] = v
            const notes = [...cur.notes]; notes[i] = 0
            if (v) { // clear this digit from peer notes
              const r = Math.floor(i / 9), c = i % 9
              for (let k = 0; k < 81; k++) { const kr = Math.floor(k / 9), kc = k % 9; if (kr === r || kc === c || (Math.floor(kr / 3) === Math.floor(r / 3) && Math.floor(kc / 3) === Math.floor(c / 3))) notes[k] &= ~(1 << v) }
            }
            const mistakes = cur.mistakes + (v && v !== cur.solution[i] ? 1 : 0)
            const next = { ...cur, board, notes, mistakes }
            if (SD.done(next)) {
              next.end = Date.now()
              const t = Math.round((next.end - next.start) / 1000)
              const best = store.get().sdBest[cur.level]
              store.set({ sd: next, sdBest: !best || t < best ? { ...store.get().sdBest, [cur.level]: t } : store.get().sdBest })
            } else store.set({ sd: next })
          }
          const hint = () => {
            const cur = store.get().sd
            const i = cur.sel >= 0 && !cur.puzzle[cur.sel] && cur.board[cur.sel] !== cur.solution[cur.sel] ? cur.sel : cur.board.findIndex((v, k) => v !== cur.solution[k])
            if (i < 0) return
            store.set({ sd: { ...cur, sel: i, hints: cur.hints + 1 } })
            setTimeout(() => { const c2 = store.get().sd; store.set({ sd: { ...c2, noteMode: false } }); input(c2.solution[i]) }, 0)
          }
          if (!g) {
            return h('div', { className: 'gm-wrap' },
              h('div', { style: { margin: '20px 0 10px' } }, '选择难度开始'),
              h('div', { style: { display: 'flex', gap: 6 } }, Object.entries(SD_LEVELS).map(([k, L]) => h('button', { key: k, className: 'yk-btn', onClick: () => newGame(k) }, L.name))))
          }
          const sel = g.sel
          const sr = Math.floor(sel / 9), sc = sel % 9
          const selVal = sel >= 0 ? g.board[sel] : 0
          const counts = Array(10).fill(0); g.board.forEach((v) => v && counts[v]++)
          const elapsed = Math.round(((g.end || Date.now()) - g.start) / 1000)
          return h('div', { className: 'gm-wrap', ref, tabIndex: 0 },
            h('div', { className: 'gm-stat' },
              h('select', { className: 'yk-select', value: g.level, onChange: (e) => newGame(e.target.value) }, Object.entries(SD_LEVELS).map(([k, L]) => h('option', { key: k, value: k }, L.name))),
              h('span', null, '⏱ ', h('b', null, clock(elapsed))), h('span', null, '错 ', h('b', null, g.mistakes)),
              h('button', { className: 'yk-btn', onClick: () => newGame(g.level) }, '新局')),
            h('div', { className: 'sd-board' }, g.board.map((v, i) => {
              const r = Math.floor(i / 9), c = i % 9
              const peer = sel >= 0 && (r === sr || c === sc || (Math.floor(r / 3) === Math.floor(sr / 3) && Math.floor(c / 3) === Math.floor(sc / 3)))
              const cls = ['sd-cell', c % 3 === 2 && c < 8 ? 'sd-r' : '', r % 3 === 2 && r < 8 ? 'sd-b' : '', g.puzzle[i] ? 'sd-given' : v ? 'sd-user' : '',
                i === sel ? 'sd-sel' : v && v === selVal ? 'sd-same' : peer ? 'sd-peer' : '', v && !g.puzzle[i] && v !== g.solution[i] ? 'sd-bad' : ''].filter(Boolean).join(' ')
              return h('div', { key: i, className: cls, onClick: () => { store.set({ sd: { ...store.get().sd, sel: i } }); ref.current?.focus() } },
                v || (g.notes[i] ? h('div', { className: 'sd-notes' }, [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => h('span', { key: n }, g.notes[i] & (1 << n) ? n : ''))) : ''))
            })),
            !g.end && h('div', { className: 'sd-pad' }, [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => h('button', { key: n, className: 'yk-btn', disabled: counts[n] >= 9, onClick: () => input(n) }, n))),
            !g.end && h('div', { style: { display: 'flex', gap: 6, marginTop: 6 } },
              h('button', { className: 'yk-btn', onClick: () => input(0) }, '擦除'),
              h('button', { className: 'yk-btn' + (g.noteMode ? ' yk-on' : ''), title: '快捷键 N', onClick: () => store.set({ sd: { ...g, noteMode: !g.noteMode } }) }, '笔记' + (g.noteMode ? '：开' : '')),
              h('button', { className: 'yk-btn', onClick: hint }, '提示' + (g.hints ? ` (${g.hints})` : ''))),
            g.end && h('div', { className: 'gm-over' }, `🎉 完成！用时 ${clock(elapsed)}，错 ${g.mistakes} 次`, s.sdBest[g.level] === elapsed ? '，新纪录！' : '', ' ', h('button', { className: 'yk-btn yk-primary', onClick: () => newGame(g.level) }, '再来')))
        }

        const GAMES = [{ id: '2048', name: '2048', C: Game2048 }, { id: 'ms', name: '扫雷', C: Mines }, { id: 'sd', name: '数独', C: Sudoku }]
        function Body() {
          const s = useStore()
          const cur = GAMES.find((x) => x.id === s.game) || GAMES[0]
          return h(React.Fragment, null,
            h('style', null, CSS),
            h('div', { className: 'yk-tabs' }, GAMES.map((x) => h('button', { key: x.id, className: 'yk-tab' + (cur.id === x.id ? ' yk-on' : ''), onClick: () => store.set({ game: x.id }) }, x.name))),
            h(cur.C))
        }
        dock.mount({ Body, title: (s) => '小游戏 · ' + (GAMES.find((x) => x.id === s.game) || GAMES[0]).name })
      },
    }
  },
})
