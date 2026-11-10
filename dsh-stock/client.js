window.__ModuleLoader__.load({
  id: '@soy-sauce-phil/dsh-stock',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const { useState, useEffect, useRef } = React
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
.st-row{display:flex;align-items:center;gap:6px;padding:5px 8px;border-radius:6px;cursor:pointer;min-width:0}
.st-row:hover{background:var(--dsw-alias-bg-layer-2)}
.st-name{flex:1;min-width:0}
.st-name b{font-weight:500}
.st-code{font-size:10px;color:var(--dsw-alias-label-secondary);margin-left:4px}
.st-price{font-variant-numeric:tabular-nums;text-align:right;min-width:56px}
.st-pct{font-variant-numeric:tabular-nums;min-width:58px;text-align:center;border-radius:4px;padding:1px 4px;font-size:12px;color:var(--dsw-alias-bg-base);background:var(--dsw-alias-label-secondary)}
.st-pct.yk-up{background:#e5534b;color:#fff}.st-pct.yk-down{background:#3fa66b;color:#fff}
.st-sub{font-size:11px;color:var(--dsw-alias-label-secondary);padding:0 8px 4px;font-variant-numeric:tabular-nums}
.st-detail{margin:0 6px 6px;padding:6px 8px;border-radius:6px;background:var(--dsw-alias-bg-layer-2);font-size:12px}
.st-grid{display:grid;grid-template-columns:auto 1fr auto 1fr;gap:2px 8px;font-variant-numeric:tabular-nums}
.st-grid span:nth-child(odd){color:var(--dsw-alias-label-secondary)}
.st-sum{display:flex;gap:10px;flex-wrap:wrap;padding:6px 8px;font-size:12px;border-bottom:.5px solid var(--dsw-alias-border-l1);font-variant-numeric:tabular-nums}
.st-num{width:76px;flex:none}
`
    const Icon = () => YkIcons.svg(['M4 19h16', 'M5 15l4-5 4 3 6-7', 'M15 6h4v4'])

    // Market sessions in Beijing time (holidays are not modelled: data simply stops changing).
    function sessions(now = Date.now()) {
      const d = new Date(now + 8 * 3600e3)
      const day = d.getUTCDay()
      const min = d.getUTCHours() * 60 + d.getUTCMinutes()
      const wd = day >= 1 && day <= 5
      return {
        cn: wd && ((min >= 555 && min <= 692) || (min >= 778 && min <= 902)),
        hk: wd && ((min >= 570 && min <= 722) || (min >= 778 && min <= 972)),
        // US regular session, covering both DST (21:30-04:00) and winter (22:30-05:00)
        us: (min >= 1290 && day >= 1 && day <= 5) || (min <= 300 && day >= 2 && day <= 6),
      }
    }
    const marketOf = (it) => (it.kind === 'fund' ? 'fund' : it.code.slice(0, 2))
    const isOpen = (it, s) => { const m = marketOf(it); return m === 'hk' ? s.hk : m === 'us' ? s.us : m === 'fund' ? false : s.cn }
    const CURRENCY = { hk: 'HK$', us: '$' }

    const fmt = (v, d = 2) => (v === null || v === undefined || !Number.isFinite(v) ? '--' : v.toFixed(d))
    const signed = (v, d = 2) => (v === null || !Number.isFinite(v) ? '--' : (v > 0 ? '+' : '') + v.toFixed(d))
    const money = (v) => {
      if (v === null || !Number.isFinite(v)) return '--'
      const a = Math.abs(v)
      return (v > 0 ? '+' : v < 0 ? '-' : '') + (a >= 1e4 ? (a / 1e4).toFixed(2) + '万' : a.toFixed(2))
    }

    /** Normalise what the user typed into a watch item, or null. */
    function guessItem(text) {
      const s = String(text || '').trim()
      if (/^(sh|sz|bj|hk|us)[A-Za-z0-9.]+$/i.test(s)) {
        const m = s.slice(0, 2).toLowerCase()
        return { kind: 'stock', code: m + (m === 'us' ? s.slice(2).toUpperCase() : s.slice(2)) }
      }
      if (/^\d{6}$/.test(s)) {
        if (/^(6|9|5)/.test(s)) return { kind: 'stock', code: 'sh' + s }
        if (/^(0|3|1)/.test(s)) return { kind: 'stock', code: 'sz' + s }
        if (/^(8|4)/.test(s)) return { kind: 'stock', code: 'bj' + s }
      }
      if (/^\d{5}$/.test(s)) return { kind: 'stock', code: 'hk' + s }
      if (/^[A-Za-z]{1,6}$/.test(s)) return { kind: 'stock', code: 'us' + s.toUpperCase() }
      return null
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        const dock = createDock(ctx, {
          id: 'stock', key: 'G', label: '盯盘', order: -75, ns: 'stock', icon: Icon, storageKey: 'dsh-stock:v1', height: 300,
          defaults: {
            items: [
              { kind: 'stock', code: 'sh000001', name: '上证指数' },
              { kind: 'stock', code: 'sz399001', name: '深证成指' },
              { kind: 'stock', code: 'sz399006', name: '创业板指' },
              { kind: 'stock', code: 'hkHSI', name: '恒生指数' },
              { kind: 'stock', code: 'usIXIC', name: '纳斯达克' },
            ],
            pin: 'sh000001', redUp: true, privacy: false, adding: false, interval: 5,
          },
        })
        const { store, useStore, bus, call } = dock
        const quotes = ykAtom({ map: {}, at: 0, error: null, loading: false })

        let inflight = null
        function fetchQuotes() { return inflight || (inflight = doFetch().finally(() => { inflight = null })) }
        async function doFetch() {
          const { items } = store.get()
          const stocks = items.filter((x) => x.kind === 'stock').map((x) => x.code)
          const funds = items.filter((x) => x.kind === 'fund').map((x) => x.code)
          if (!stocks.length && !funds.length) return
          quotes.set((q) => ({ ...q, loading: true }))
          try {
            const [a, b] = await Promise.all([stocks.length ? call('quote', { codes: stocks }) : [], funds.length ? call('fund', { codes: funds }) : []])
            const map = { ...quotes.get().map }
            for (const x of a) map[x.code] = x
            for (const x of b) map['f' + x.code] = { ...x, price: x.est || x.nav, pct: x.est ? x.estPct : x.pct, time: x.est ? x.estTime + ' 估' : x.date }
            quotes.set({ map, at: Date.now(), error: null, loading: false })
            // remember names so the list renders before the first quote next time
            store.set((s) => ({ items: s.items.map((it) => { const qv = map[it.kind === 'fund' ? 'f' + it.code : it.code]; return qv?.name && qv.name !== it.name ? { ...it, name: qv.name } : it }) }))
          } catch (e) {
            quotes.set((q) => ({ ...q, loading: false, error: e?.message || String(e) }))
          }
        }
        const qOf = (it, map) => map[it.kind === 'fund' ? 'f' + it.code : it.code]

        // Poll: fast while expanded and a watched market is open, slower otherwise.
        ctx.effect(() => {
          let last = 0
          let stopped = false
          const tick = () => {
            if (stopped) return
            const s = store.get()
            const now = Date.now()
            const open = s.items.some((it) => isOpen(it, sessions(now)))
            const expanded = !s.collapsed && !bus.hidden
            const every = bus.hidden ? 0 : open ? (expanded ? s.interval : 20) * 1000 : expanded ? 120000 : 600000
            if (every && now - last >= every) { last = now; fetchQuotes() }
          }
          const timer = setInterval(tick, 1000)
          tick()
          // refresh right away when the card is expanded (only on the collapsed -> expanded edge)
          let wasCollapsed = store.get().collapsed
          const unsub = store.subscribe(() => {
            const c = store.get().collapsed
            if (wasCollapsed && !c && Date.now() - last > 4000) { last = 0; tick() }
            wasCollapsed = c
          })
          return () => { stopped = true; clearInterval(timer); unsub() }
        }, 'stock: polling')

        const tone = (v, s) => (!v ? '' : (v > 0) === s.redUp ? 'yk-up' : 'yk-down')
        const mask = (s, text) => (s.privacy ? '****' : text)

        function pnlOf(it, q) {
          if (!q || !it.shares) return null
          const sh = Number(it.shares)
          if (it.kind === 'fund') {
            const nav = q.price
            const today = q.pct !== null ? sh * nav * q.pct / (100 + q.pct) : null
            return { today, hold: it.cost ? sh * (nav - Number(it.cost)) : null, value: sh * nav }
          }
          if (q.price === null || q.suspended) return null
          return { today: q.prev ? sh * (q.price - q.prev) : null, hold: it.cost ? sh * (q.price - Number(it.cost)) : null, value: sh * q.price }
        }
        function totals(items, map) {
          let today = 0, hold = 0, value = 0, has = false
          for (const it of items) {
            const m = marketOf(it)
            if (m === 'hk' || m === 'us') continue // only CNY assets are summed
            const p = pnlOf(it, qOf(it, map))
            if (!p) continue
            has = true; today += p.today || 0; hold += p.hold || 0; value += p.value || 0
          }
          return has ? { today, hold, value } : null
        }

        function AddBar() {
          const [q, setQ] = useState('')
          const [res, setRes] = useState({ list: [], loading: false, error: null })
          const s = useStore()
          useEffect(() => {
            const text = q.trim()
            if (!text) { setRes({ list: [], loading: false, error: null }); return }
            const ac = new AbortController()
            const t = setTimeout(async () => {
              setRes((r) => ({ ...r, loading: true }))
              try { setRes({ list: await call('search', { q: text }, ac.signal), loading: false, error: null }) } catch (e) { if (!ac.signal.aborted) setRes({ list: [], loading: false, error: e.message }) }
            }, 300)
            return () => { clearTimeout(t); ac.abort() }
          }, [q])
          const have = new Set(s.items.map((x) => x.kind + x.code))
          const add = (it) => { if (have.has(it.kind + it.code)) return; store.set((st) => ({ items: [...st.items, { kind: it.kind, code: it.code, name: it.name || it.code }] })); setTimeout(fetchQuotes, 50) }
          const guess = guessItem(q)
          return h('div', { style: { borderBottom: '.5px solid var(--dsw-alias-border-l1)' } },
            h('div', { className: 'yk-form' },
              h('input', { className: 'yk-input', autoFocus: true, placeholder: '代码 / 名称 / 拼音，如 茅台、00700、AAPL、161725', value: q, onChange: (e) => setQ(e.target.value), onKeyDown: (e) => { if (e.key === 'Escape') store.set({ adding: false }); if (e.key === 'Enter' && res.list[0]) add(res.list[0]) } }),
              h('button', { className: 'yk-btn', onClick: () => store.set({ adding: false }) }, '完成')),
            res.loading && h('div', { className: 'yk-muted yk-pad' }, '搜索中…'),
            res.error && h('div', { className: 'yk-err' }, res.error),
            h('div', { style: { maxHeight: 150, overflowY: 'auto' } },
              res.list.map((it) => h('div', { key: it.kind + it.code, className: 'st-row', onClick: () => add(it) },
                h('div', { className: 'st-name yk-ell' }, h('b', null, it.name), h('span', { className: 'st-code' }, `${it.kind === 'fund' ? it.code : it.code} · ${it.type}`)),
                h('span', { className: 'yk-link' }, have.has(it.kind + it.code) ? '已添加' : '添加'))),
              !res.loading && q.trim() && !res.list.length && guess && h('div', { className: 'st-row', onClick: () => add(guess) }, h('div', { className: 'st-name' }, '直接添加代码 ', h('b', null, guess.code)), h('span', { className: 'yk-link' }, '添加'))))
        }

        function Detail({ it, q }) {
          const s = useStore()
          const update = (patch) => store.set((st) => ({ items: st.items.map((x) => (x.kind === it.kind && x.code === it.code ? { ...x, ...patch } : x)) }))
          const idx = s.items.findIndex((x) => x.kind === it.kind && x.code === it.code)
          const p = pnlOf(it, q)
          const cur = CURRENCY[marketOf(it)] || ''
          return h('div', { className: 'st-detail', onClick: (e) => e.stopPropagation() },
            q && it.kind === 'stock' && h('div', { className: 'st-grid' },
              h('span', null, '今开'), h('span', null, fmt(q.open)), h('span', null, '昨收'), h('span', null, fmt(q.prev)),
              h('span', null, '最高'), h('span', null, fmt(q.high)), h('span', null, '最低'), h('span', null, fmt(q.low)),
              h('span', null, '涨跌'), h('span', { className: tone(q.change, s) }, signed(q.change)), h('span', null, '时间'), h('span', null, q.time || '--')),
            q && it.kind === 'fund' && h('div', { className: 'st-grid' },
              h('span', null, '净值'), h('span', null, fmt(q.nav, 4)), h('span', null, '日期'), h('span', null, q.date || '--'),
              h('span', null, '日涨幅'), h('span', { className: tone(q.pct, s) }, signed(q.pct) + '%'), h('span', null, ''), h('span', null, '')),
            h('div', { className: 'yk-form', style: { padding: '6px 0 2px' } },
              h('span', { className: 'yk-muted' }, it.kind === 'fund' ? '份额' : '股数'),
              h('input', { className: 'yk-input st-num', type: 'number', min: 0, value: it.shares ?? '', placeholder: '0', onChange: (e) => update({ shares: e.target.value === '' ? undefined : Math.max(0, Number(e.target.value)) }) }),
              h('span', { className: 'yk-muted' }, '成本'),
              h('input', { className: 'yk-input st-num', type: 'number', min: 0, step: 'any', value: it.cost ?? '', placeholder: '单价', onChange: (e) => update({ cost: e.target.value === '' ? undefined : Math.max(0, Number(e.target.value)) }) })),
            p && h('div', { className: 'yk-muted', style: { padding: '2px 0' } }, `市值 ${mask(s, cur + fmt(p.value))} · 今日 `, h('span', { className: tone(p.today, s) }, mask(s, money(p.today))), ' · 持仓 ', h('span', { className: tone(p.hold, s) }, mask(s, money(p.hold)))),
            h('div', { className: 'yk-form', style: { padding: '4px 0 0' } },
              h('button', { className: 'yk-btn' + (s.pin === it.code ? ' yk-on' : ''), onClick: () => store.set({ pin: s.pin === it.code ? null : it.code }) }, s.pin === it.code ? '✓ 小图标显示' : '在小图标显示'),
              h('button', { className: 'yk-btn', disabled: idx <= 0, onClick: () => store.set((st) => { const a = [...st.items]; [a[idx - 1], a[idx]] = [a[idx], a[idx - 1]]; return { items: a } }) }, '上移'),
              h('button', { className: 'yk-btn', onClick: () => ykOpenExternal(it.kind === 'fund' ? `https://fund.eastmoney.com/${it.code}.html` : `https://gu.qq.com/${it.code}`) }, '详情'),
              h('button', { className: 'yk-btn', onClick: () => store.set((st) => ({ items: st.items.filter((x) => !(x.kind === it.kind && x.code === it.code)), expanded: null, pin: st.pin === it.code ? null : st.pin })) }, '删除')))
        }

        function Body() {
          const s = useStore()
          const qs = quotes.use()
          useEffect(() => { if (!qs.at || Date.now() - qs.at > 5000) fetchQuotes() }, [])
          const tot = totals(s.items, qs.map)
          const sess = sessions()
          return h(React.Fragment, null,
            h('style', null, CSS),
            s.adding && h(AddBar),
            tot && h('div', { className: 'st-sum' },
              h('span', null, '今日 ', h('b', { className: tone(tot.today, s) }, mask(s, money(tot.today)))),
              h('span', null, '持仓 ', h('b', { className: tone(tot.hold, s) }, mask(s, money(tot.hold)))),
              h('span', { className: 'yk-muted' }, '市值 ' + mask(s, money(tot.value).replace(/^\+/, ''))),
              h('button', { className: 'yk-link', style: { marginLeft: 'auto' }, onClick: () => store.set({ pin: s.pin === 'pnl' ? null : 'pnl' }) }, s.pin === 'pnl' ? '✓ 小图标显示盈亏' : '小图标显示盈亏')),
            h('div', { className: 'yk-scroll', style: { padding: '2px 0' } },
              qs.error && h('div', { className: 'yk-err' }, qs.error, ' ', h('button', { className: 'yk-link', onClick: fetchQuotes }, '重试')),
              !s.items.length && h('div', { className: 'yk-muted yk-pad' }, '还没有自选，点右上角 ＋ 添加。'),
              s.items.map((it) => {
                const q = qOf(it, qs.map)
                const p = pnlOf(it, q)
                const open = s.expanded === it.kind + it.code
                return h(React.Fragment, { key: it.kind + it.code },
                  h('div', { className: 'st-row', onClick: () => store.set({ expanded: open ? null : it.kind + it.code }), title: it.code },
                    h('div', { className: 'st-name yk-ell' }, s.pin === it.code ? '📌 ' : '', h('b', null, it.name || it.code), h('span', { className: 'st-code' }, it.kind === 'fund' ? '基金' : it.code.slice(2))),
                    h('span', { className: 'st-price ' + tone(q?.pct, s) }, q ? (q.suspended ? '停牌' : fmt(q.price, it.kind === 'fund' ? 4 : q.price >= 1000 ? 2 : q.price < 10 ? 3 : 2)) : '…'),
                    h('span', { className: 'st-pct ' + tone(q?.pct, s) }, q && !q.suspended ? signed(q.pct) + '%' : '--')),
                  p && !open && h('div', { className: 'st-sub' }, `今日 `, h('span', { className: tone(p.today, s) }, mask(s, money(p.today))), ' · 持仓 ', h('span', { className: tone(p.hold, s) }, mask(s, money(p.hold)))),
                  open && h(Detail, { it, q }))
              })),
            h('div', { className: 'yk-foot' },
              h('span', { className: 'yk-muted' }, (sess.cn ? 'A股交易中' : 'A股休市') + (qs.at ? ` · ${new Date(qs.at).toLocaleTimeString('zh-CN', { hour12: false })}` : '') + (qs.loading ? ' · 刷新中' : '')),
              h('span', { style: { display: 'flex', gap: 6 } },
                h('label', { className: 'yk-check', title: '隐藏金额，防偷看' }, h('input', { type: 'checkbox', checked: s.privacy, onChange: (e) => store.set({ privacy: e.target.checked }) }), '藏金额'),
                h('label', { className: 'yk-check', title: '关掉则为绿涨红跌（欧美习惯）' }, h('input', { type: 'checkbox', checked: s.redUp, onChange: (e) => store.set({ redUp: e.target.checked }) }), '红涨'))))
        }

        dock.mount({
          Body,
          title: () => '盯盘',
          actions: (s) => [
            h('button', { key: 'r', className: 'yk-ibtn', title: `刷新（${ykKey('R')}）`, 'aria-label': '刷新', onClick: fetchQuotes }, YkIcons.refresh()),
            h('button', { key: 'a', className: 'yk-ibtn' + (s.adding ? ' yk-on' : ''), title: '添加自选', 'aria-label': '添加', onClick: () => store.set({ adding: !s.adding }) }, YkIcons.plus()),
          ],
          mini: (s) => {
            const { map } = quotes.get()
            if (s.pin === 'pnl') {
              const t = totals(s.items, map)
              return t ? { text: s.privacy ? '**' : money(t.today), className: tone(t.today, s), tip: '今日盈亏' } : null
            }
            const it = s.items.find((x) => x.code === s.pin)
            const q = it && qOf(it, map)
            if (!q || q.suspended) return null
            return { text: signed(q.pct) + '%', className: tone(q.pct, s), tip: `${it.name} ${fmt(q.price)} ${signed(q.pct)}%` }
          },
          onKey: (e) => { if (e.code === 'KeyR') { fetchQuotes(); return true } },
        })
        // the collapsed badge must re-render when quotes arrive
        ctx.effect(() => quotes.subscribe(() => store.set({ tick: Date.now() })), 'stock: badge')
      },
    }
  },
})
