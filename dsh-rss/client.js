window.__ModuleLoader__.load({
  id: '@soy-sauce-phil/dsh-rss',
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
      b.help = () => Object.values(b.docks).filter((d) => d.key).sort((x, y) => (x.order || 0) - (y.order || 0)).map((d) => `${ykKey(d.key)} ${d.labelOf ? d.labelOf() : d.label}`)
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
      const labelOf = () => String((typeof cfg.label === 'function' ? cfg.label(store.get()) : cfg.label) || '')
      let extraKey = null

      let miniFn = null
      ctx.effect(() => {
        bus.docks[cfg.id] = {
          id: cfg.id, key: cfg.key, label: labelOf(), labelOf, order: cfg.order, icon: cfg.icon,
          expand: () => store.set({ collapsed: false }),
          collapse: () => store.set({ collapsed: true }),
          isOpen: () => !store.get().collapsed,
          badge: () => (miniFn ? miniFn(store.get()) : null),
        }
        bus.emit()
        const isOpen = () => !store.get().collapsed && !bus.hidden
        const sync = () => { if (isOpen()) bus.setOpen(cfg.id); else if (bus.open === cfg.id) bus.setOpen(null) }
        const onBus = () => { if (bus.open && bus.open !== cfg.id && isOpen()) store.set({ collapsed: true }); else sync() }
        const onRename = () => { const meta = bus.docks[cfg.id]; const name = labelOf(); if (meta && meta.label !== name) { meta.label = name; bus.emit() } }
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
        const unsubscribe = store.subscribe(() => { sync(); onRename() })
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
          const t = (title && title(state)) || labelOf()
          if (state.collapsed) {
            if (open && open !== cfg.id) return null
            if (cfg.id !== 'hub' && hubOn) return null
            const badge = mini && mini(state)
            return h('button', {
              className: 'yk-mini' + (badge?.text ? ' yk-wide' : ''), 'aria-label': '展开' + t,
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
                `${labelOf()}插件出错：` + (this.state.error?.message || String(this.state.error)),
                h('button', { style: { marginLeft: 6 }, onClick: () => { cfg.onReset && cfg.onReset(); this.setState({ error: null }) } }, '重试'))
            }
            return h(Dock, this.props)
          }
        }
        ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({
          name: 'sidebar.footer.action', id: cfg.id, order: cfg.order, label: () => labelOf(),
        }, Boundary))
      }

      return { store, useStore, bus, useBus, call, mount }
    }
    // </yk-kit>
    ykRequire = require

    const CSS = `
.rs-bar{display:flex;gap:4px;align-items:center;padding:6px 6px 4px;flex:none;border-bottom:.5px solid var(--dsw-alias-border-l1)}
.rs-bar .yk-select{flex:1;min-width:0}
.rs-item{padding:6px 8px;border-radius:6px;cursor:pointer;min-width:0}
.rs-item:hover{background:var(--dsw-alias-bg-layer-2)}
.rs-item .rs-t{font-weight:500;line-height:1.4}
.rs-item.rs-read .rs-t{font-weight:400;color:var(--dsw-alias-label-secondary)}
.rs-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--dsw-alias-brand-primary);margin-right:5px;vertical-align:2px}
.rs-meta{font-size:11px;color:var(--dsw-alias-label-secondary);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rs-sum{font-size:12px;color:var(--dsw-alias-label-secondary);margin-top:2px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;line-height:1.5}
.rs-art{padding:8px 10px;line-height:1.7;word-break:break-word}
.rs-art h1{font-size:15px;margin:0 0 4px;line-height:1.4}
.rs-art img,.rs-art video{max-width:100%;height:auto;border-radius:6px;cursor:zoom-in}
.rs-art a{color:var(--dsw-alias-brand-primary)}
.rs-art pre{white-space:pre-wrap;background:var(--dsw-alias-bg-layer-2);padding:6px;border-radius:6px;font-size:12px;overflow-x:auto}
.rs-art code{font-size:12px}
.rs-art blockquote{margin:6px 0;padding-left:8px;border-left:3px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary)}
.rs-art table{border-collapse:collapse;font-size:12px;display:block;overflow-x:auto}
.rs-art td,.rs-art th{border:.5px solid var(--dsw-alias-border-l2);padding:2px 4px}
.rs-feed{display:flex;align-items:center;gap:6px;padding:5px 8px;border-radius:6px;min-width:0}
.rs-feed:hover{background:var(--dsw-alias-bg-layer-2)}
.rs-feed .rs-name{flex:1;min-width:0}
`
    const Icon = () => YkIcons.svg(['M5 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2z', 'M4 11a9 9 0 0 1 9 9', 'M4 4a16 16 0 0 1 16 16'])

    const DEFAULT_FEEDS = [
      { url: 'https://sspai.com/feed', title: '少数派' },
      { url: 'https://www.ithome.com/rss/', title: 'IT之家' },
      { url: 'https://www.ruanyifeng.com/blog/atom.xml', title: '阮一峰的网络日志' },
      { url: 'https://feeds.appinn.com/appinns/', title: '小众软件' },
      { url: 'https://www.solidot.org/index.rss', title: 'Solidot' },
    ]
    const MAX_ITEMS = 60

    // ------------------------------------------------------------ parsing
    const el = (n) => n && n.nodeType === 1
    const kids = (node) => Array.from(node?.childNodes || []).filter(el)
    const nameOf = (n) => String(n.nodeName || '').toLowerCase()
    const child = (node, ...names) => kids(node).find((k) => names.includes(nameOf(k)) || names.includes(String(k.localName || '').toLowerCase()))
    const text = (node) => (node ? String(node.textContent || '').trim() : '')
    const stripTags = (html) => {
      try { return text(new DOMParser().parseFromString(`<!doctype html><html><head></head><body>${html}</body></html>`, 'text/html').body).replace(/\s+/g, ' ') } catch { return String(html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() }
    }
    const parseDate = (s) => { const t = Date.parse(String(s || '').trim()); return Number.isFinite(t) ? t : 0 }
    function hashId(s) { let x = 5381; for (let i = 0; i < s.length; i++) x = ((x << 5) + x + s.charCodeAt(i)) | 0; return (x >>> 0).toString(36) }

    /** Parse RSS 2.0 / RSS 1.0 (RDF) / Atom / JSON Feed into { title, link, items }. */
    function parseFeed(source, base, kind) {
      if (kind === 'json') {
        const j = JSON.parse(source)
        return {
          title: j.title || base, link: j.home_page_url || base,
          items: (j.items || []).map((x) => ({ title: x.title || stripTags(x.content_html || x.content_text || '').slice(0, 60), link: x.url || x.external_url || '', date: parseDate(x.date_published || x.date_modified), author: x.authors?.[0]?.name || x.author?.name || '', html: x.content_html || (x.content_text ? `<p>${escapeHtml(x.content_text)}</p>` : x.summary || '') })),
        }
      }
      const doc = new DOMParser().parseFromString(source.replace(/^\uFEFF/, ''), 'application/xml')
      const root = doc.documentElement
      if (!root || nameOf(root) === 'parsererror' || doc.getElementsByTagName('parsererror').length) throw new Error('不是有效的 RSS / Atom 订阅（XML 解析失败）')
      const resolve = (href) => { try { return new URL(href, base).toString() } catch { return href || '' } }
      const rn = String(root.localName || root.nodeName).toLowerCase()
      if (rn === 'feed') {
        const linkOf = (n) => { const links = kids(n).filter((k) => nameOf(k) === 'link' || k.localName === 'link'); const alt = links.find((l) => !l.getAttribute('rel') || l.getAttribute('rel') === 'alternate') || links[0]; return alt ? resolve(alt.getAttribute('href')) : '' }
        return {
          title: text(child(root, 'title')), link: linkOf(root),
          items: kids(root).filter((k) => String(k.localName || k.nodeName).toLowerCase() === 'entry').map((e) => ({
            title: stripTags(text(child(e, 'title'))), link: linkOf(e), guid: text(child(e, 'id')),
            date: parseDate(text(child(e, 'published')) || text(child(e, 'updated'))),
            author: text(child(child(e, 'author'), 'name')),
            html: text(child(e, 'content')) || text(child(e, 'summary')),
          })),
        }
      }
      const channel = rn === 'rss' ? child(root, 'channel') : child(root, 'channel') || root
      const itemsHost = rn === 'rss' ? channel : root // RSS 1.0 keeps <item> beside <channel>
      if (!channel) throw new Error('不认识的订阅格式')
      return {
        title: text(child(channel, 'title')), link: resolve(text(child(channel, 'link'))),
        items: kids(itemsHost).filter((k) => String(k.localName || k.nodeName).toLowerCase() === 'item').map((e) => {
          const enclosure = child(e, 'enclosure')
          const img = enclosure && /^image\//.test(enclosure.getAttribute('type') || '') ? `<p><img src="${escapeHtml(enclosure.getAttribute('url') || '')}"></p>` : ''
          return {
            title: stripTags(text(child(e, 'title'))) || stripTags(text(child(e, 'description'))).slice(0, 60),
            link: resolve(text(child(e, 'link')) || (e.getAttribute('rdf:about') || '')),
            guid: text(child(e, 'guid')),
            date: parseDate(text(child(e, 'pubdate')) || text(child(e, 'dc:date', 'date'))),
            author: text(child(e, 'dc:creator', 'creator')) || text(child(e, 'author')),
            html: (text(child(e, 'content:encoded', 'encoded')) || text(child(e, 'description'))) + img,
          }
        }),
      }
    }
    const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

    // ------------------------------------------------------------ sanitising
    const ALLOWED = new Set('a abbr b blockquote br caption code del details dd div dl dt em figcaption figure h1 h2 h3 h4 h5 h6 hr i img ins kbd li mark ol p pre q s small span strong sub summary sup table tbody td tfoot th thead tr u ul'.split(' '))
    const DROP = new Set('script style iframe object embed form input button textarea select link meta noscript svg math frame frameset base template'.split(' '))
    /** Rebuild the article as React elements from an allow-list: no scripts, no inline handlers, no styles. */
    function renderHtml(html, base, images) {
      let body
      try { body = new DOMParser().parseFromString(`<!doctype html><html><head></head><body>${String(html || '')}</body></html>`, 'text/html').body } catch { return [String(html || '')] }
      const abs = (u) => { try { const x = new URL(u, base); return /^https?:$/.test(x.protocol) ? x.toString() : '' } catch { return '' } }
      let key = 0
      const walk = (node) => {
        if (node.nodeType === 3) return node.nodeValue
        if (node.nodeType !== 1) return null
        const tag = nameOf(node)
        if (DROP.has(tag)) return null
        const children = Array.from(node.childNodes).map(walk).filter((x) => x !== null && x !== '')
        if (!ALLOWED.has(tag)) return children.length ? h(React.Fragment, { key: key++ }, ...children) : null
        if (tag === 'img') {
          const src = abs(node.getAttribute('data-src') || node.getAttribute('data-original') || node.getAttribute('src') || '')
          if (!src) return null
          const index = images.push(src) - 1
          return h('img', { key: key++, src, alt: node.getAttribute('alt') || '', loading: 'lazy', referrerPolicy: 'no-referrer', onClick: () => ykShowImages(images, index) })
        }
        if (tag === 'a') {
          const href = abs(node.getAttribute('href') || '')
          return h('a', { key: key++, href: href || undefined, title: href, onClick: (e) => { e.preventDefault(); if (href) ykOpenExternal(href) } }, ...children)
        }
        if (tag === 'br' || tag === 'hr') return h(tag, { key: key++ })
        const props = { key: key++ }
        if ((tag === 'td' || tag === 'th') && node.getAttribute('colspan')) props.colSpan = Number(node.getAttribute('colspan')) || undefined
        return h(tag, props, ...children)
      }
      return Array.from(body.childNodes).map(walk).filter((x) => x !== null)
    }

    // ------------------------------------------------------------ OPML
    function parseOpml(src) {
      const doc = new DOMParser().parseFromString(src, 'application/xml')
      if (doc.getElementsByTagName('parsererror').length) throw new Error('OPML 解析失败')
      return Array.from(doc.getElementsByTagName('outline')).map((o) => ({ url: o.getAttribute('xmlUrl') || o.getAttribute('xmlurl') || '', title: o.getAttribute('title') || o.getAttribute('text') || '' })).filter((f) => /^https?:\/\//.test(f.url))
    }
    const toOpml = (feeds) => `<?xml version="1.0" encoding="UTF-8"?>\n<opml version="2.0">\n  <head><title>DSH RSS 订阅</title></head>\n  <body>\n${feeds.map((f) => `    <outline type="rss" text="${escapeHtml(f.title || f.url)}" title="${escapeHtml(f.title || f.url)}" xmlUrl="${escapeHtml(f.url)}"${f.link ? ` htmlUrl="${escapeHtml(f.link)}"` : ''}/>`).join('\n')}\n  </body>\n</opml>\n`

    return {
      inject: ['slots'],
      apply(ctx) {
        const dock = createDock(ctx, {
          id: 'rss', key: 'S', label: 'RSS', order: -80, ns: 'rss', icon: Icon, storageKey: 'dsh-rss:v1', height: 340,
          defaults: { feeds: DEFAULT_FEEDS.map((f) => ({ ...f, id: hashId(f.url) })), items: {}, read: {}, filter: 'all', unreadOnly: false, view: 'list', article: null, fontSize: 13, every: 30 },
          onReset: () => store.set({ view: 'list', article: null }),
        })
        const { store, useStore, bus, call } = dock
        const contents = new Map() // item id -> html (kept in memory only)
        const status = ykAtom({}) // feed id -> { loading, error, at }

        const itemId = (feedId, x) => feedId + ':' + hashId(x.guid || x.link || x.title + x.date)
        async function refreshFeed(feed) {
          if (status.get()[feed.id]?.loading) return
          status.set((s) => ({ ...s, [feed.id]: { ...(s[feed.id] || {}), loading: true, error: null } }))
          try {
            const res = await call('fetch', { url: feed.url })
            if (res.kind === 'html') throw new Error(res.candidates?.length ? '这个地址是网页，不是订阅源' : '没找到订阅内容')
            const parsed = parseFeed(res.text, res.url, res.kind)
            const now = Date.now()
            const items = parsed.items.filter((x) => x.title || x.link).slice(0, MAX_ITEMS).map((x, i) => {
              const id = itemId(feed.id, x)
              contents.set(id, x.html || '')
              return { id, feed: feed.id, title: x.title || '(无标题)', link: x.link, date: x.date || now - i * 1000, author: x.author || '', sum: stripTags(x.html || '').slice(0, 140) }
            })
            store.set((s) => {
              const old = new Map((s.items[feed.id] || []).map((x) => [x.id, x]))
              const merged = items.map((x) => (old.has(x.id) ? { ...x, date: old.get(x.id).date || x.date } : x))
              const ids = new Set(merged.map((x) => x.id))
              const read = (s.read[feed.id] || []).filter((x) => ids.has(x))
              return {
                items: { ...s.items, [feed.id]: merged },
                read: { ...s.read, [feed.id]: read },
                feeds: s.feeds.map((f) => (f.id === feed.id ? { ...f, title: f.title || parsed.title || f.url, link: parsed.link || f.link } : f)),
              }
            })
            status.set((s) => ({ ...s, [feed.id]: { loading: false, error: null, at: now } }))
          } catch (e) {
            status.set((s) => ({ ...s, [feed.id]: { ...(s[feed.id] || {}), loading: false, error: e?.message || String(e) } }))
          }
        }
        async function refreshAll(force) {
          const { feeds } = store.get()
          const st = status.get()
          const stale = feeds.filter((f) => force || !st[f.id]?.at || Date.now() - st[f.id].at > 5 * 60000)
          for (let i = 0; i < stale.length; i += 4) await Promise.all(stale.slice(i, i + 4).map(refreshFeed))
        }

        ctx.effect(() => {
          let last = 0
          const t = setInterval(() => {
            if (bus.hidden) return
            if (Date.now() - last > store.get().every * 60000) { last = Date.now(); refreshAll(false) }
          }, 30000)
          const first = setTimeout(() => { last = Date.now(); refreshAll(false) }, 4000)
          return () => { clearInterval(t); clearTimeout(first) }
        }, 'rss: periodic refresh')
        ctx.effect(() => status.subscribe(() => store.set({ tick: Date.now() })), 'rss: status')

        const unreadOf = (s, fid) => { const r = new Set(s.read[fid] || []); return (s.items[fid] || []).filter((x) => !r.has(x.id)).length }
        const totalUnread = (s) => s.feeds.reduce((n, f) => n + unreadOf(s, f.id), 0)
        const markRead = (it, v = true) => store.set((s) => {
          const cur = new Set(s.read[it.feed] || [])
          if (v) cur.add(it.id); else cur.delete(it.id)
          return { read: { ...s.read, [it.feed]: [...cur] } }
        })
        const markAllRead = () => store.set((s) => {
          const read = { ...s.read }
          for (const f of s.feeds) if (s.filter === 'all' || s.filter === f.id) read[f.id] = (s.items[f.id] || []).map((x) => x.id)
          return { read }
        })

        function List() {
          const s = useStore()
          const st = status.use()
          const ref = useRef(null)
          const feedsById = Object.fromEntries(s.feeds.map((f) => [f.id, f]))
          const sel = s.filter === 'all' ? s.feeds : s.feeds.filter((f) => f.id === s.filter)
          const readSets = Object.fromEntries(sel.map((f) => [f.id, new Set(s.read[f.id] || [])]))
          let items = sel.flatMap((f) => s.items[f.id] || []).sort((a, b) => b.date - a.date)
          if (s.unreadOnly) items = items.filter((x) => !readSets[x.feed]?.has(x.id))
          items = items.slice(0, 300)
          const errors = sel.filter((f) => st[f.id]?.error)
          const loading = sel.some((f) => st[f.id]?.loading)
          useEffect(() => { if (ref.current) ref.current.scrollTop = s.scroll || 0 }, [])
          return h(React.Fragment, null,
            h('div', { className: 'rs-bar' },
              h('select', { className: 'yk-select', value: s.filter, onChange: (e) => store.set({ filter: e.target.value, scroll: 0 }) },
                h('option', { value: 'all' }, `全部订阅（${totalUnread(s)} 未读）`),
                s.feeds.map((f) => h('option', { key: f.id, value: f.id }, `${f.title || f.url}（${unreadOf(s, f.id)}）`))),
              h('label', { className: 'yk-check', title: '只看未读' }, h('input', { type: 'checkbox', checked: s.unreadOnly, onChange: (e) => store.set({ unreadOnly: e.target.checked }) }), '未读'),
              h('button', { className: 'yk-btn', title: '把当前列表标为已读', onClick: markAllRead }, '全读')),
            h('div', { className: 'yk-scroll', ref, onScroll: (e) => { s.scroll = e.currentTarget.scrollTop } },
              errors.map((f) => h('div', { key: f.id, className: 'yk-err' }, `${f.title || f.url}：${st[f.id].error} `, h('button', { className: 'yk-link', onClick: () => refreshFeed(f) }, '重试'))),
              loading && !items.length && h('div', { className: 'yk-muted yk-pad' }, '加载中…'),
              !loading && !items.length && !errors.length && h('div', { className: 'yk-muted yk-pad' }, s.feeds.length ? (s.unreadOnly ? '没有未读文章 🎉' : '还没有文章，点右上角刷新。') : '还没有订阅，点右上角 ⚙ 添加。'),
              items.map((it) => {
                const read = readSets[it.feed]?.has(it.id)
                return h('div', { key: it.id, className: 'rs-item' + (read ? ' rs-read' : ''), title: it.link,
                  onClick: () => { markRead(it); store.set({ view: 'article', article: it.id, scroll: ref.current?.scrollTop || 0 }) } },
                  h('div', { className: 'rs-t' }, !read && h('span', { className: 'rs-dot' }), it.title),
                  h('div', { className: 'rs-meta' }, [s.filter === 'all' ? feedsById[it.feed]?.title : '', it.author, ykAgo(it.date)].filter(Boolean).join(' · ')),
                  s.showSummary !== false && it.sum && h('div', { className: 'rs-sum' }, it.sum))
              })))
        }

        function Article() {
          const s = useStore()
          const it = Object.values(s.items).flat().find((x) => x.id === s.article)
          const [, force] = useState(0)
          const ref = useRef(null)
          useEffect(() => { if (ref.current) ref.current.scrollTop = 0 }, [s.article])
          useEffect(() => {
            if (it && !contents.has(it.id)) { const f = s.feeds.find((x) => x.id === it.feed); if (f) refreshFeed(f).then(() => force((n) => n + 1)) }
          }, [s.article])
          if (!it) return h('div', { className: 'yk-muted yk-pad' }, '文章已不在列表中。', h('button', { className: 'yk-link', onClick: () => store.set({ view: 'list' }) }, '返回'))
          const feed = s.feeds.find((x) => x.id === it.feed)
          const html = contents.get(it.id)
          const images = []
          const body = html === undefined ? h('p', { className: 'yk-muted' }, '加载中…') : renderHtml(html, it.link || feed?.url, images)
          // neighbours in the current list order
          const sel = s.filter === 'all' ? s.feeds : s.feeds.filter((f) => f.id === s.filter)
          const list = sel.flatMap((f) => s.items[f.id] || []).sort((a, b) => b.date - a.date)
          const i = list.findIndex((x) => x.id === it.id)
          const go = (x) => { if (x) { markRead(x); store.set({ article: x.id }) } }
          return h(React.Fragment, null,
            h('div', { className: 'yk-scroll', ref },
              h('div', { className: 'rs-art', style: { fontSize: s.fontSize } },
                h('h1', null, it.title),
                h('div', { className: 'rs-meta', style: { marginBottom: 8 } }, [feed?.title, it.author, it.date ? new Date(it.date).toLocaleString('zh-CN', { hour12: false }) : ''].filter(Boolean).join(' · ')),
                ...(Array.isArray(body) && !body.length ? [h('p', { key: 'e', className: 'yk-muted' }, '订阅里没有正文，点下方「原文」在浏览器中看。')] : [].concat(body)))),
            h('div', { className: 'yk-foot' },
              h('button', { className: 'yk-btn', disabled: i <= 0, onClick: () => go(list[i - 1]) }, '上一篇'),
              h('button', { className: 'yk-btn', onClick: () => { markRead(it, false); store.set({ view: 'list' }) } }, '标为未读'),
              h('button', { className: 'yk-btn', disabled: !it.link, onClick: () => ykOpenExternal(it.link) }, '原文'),
              h('button', { className: 'yk-btn', disabled: i < 0 || i >= list.length - 1, onClick: () => go(list[i + 1]) }, '下一篇')))
        }

        function Feeds() {
          const s = useStore()
          const st = status.use()
          const [url, setUrl] = useState('')
          const [busy, setBusy] = useState(false)
          const [msg, setMsg] = useState(null)
          const [cands, setCands] = useState([])
          const [opml, setOpml] = useState(null)
          const fileRef = useRef(null)
          const add = async (u, title) => {
            const target = String(u || '').trim()
            if (!target) return
            const full = /^https?:\/\//i.test(target) ? target : 'https://' + target
            if (s.feeds.some((f) => f.url === full)) { setMsg('已经订阅过了'); return }
            setBusy(true); setMsg(null); setCands([])
            try {
              const res = await call('fetch', { url: full })
              if (res.kind === 'html') {
                if (!res.candidates?.length) throw new Error('这个网页没有声明 RSS 订阅地址，请直接粘贴订阅链接')
                if (res.candidates.length > 1) { setCands(res.candidates); setMsg('这个网页有多个订阅，选一个：'); return }
                return add(res.candidates[0].url, res.candidates[0].title)
              }
              const parsed = parseFeed(res.text, res.url, res.kind)
              const feed = { id: hashId(full), url: full, title: title || parsed.title || full, link: parsed.link }
              store.set((st2) => ({ feeds: [...st2.feeds, feed] }))
              setUrl(''); setMsg(`已添加「${feed.title}」，共 ${parsed.items.length} 篇`)
              refreshFeed(feed)
            } catch (e) { setMsg('添加失败：' + (e?.message || e)) } finally { setBusy(false) }
          }
          const remove = (f) => store.set((st2) => {
            const items = { ...st2.items }; delete items[f.id]
            const read = { ...st2.read }; delete read[f.id]
            return { feeds: st2.feeds.filter((x) => x.id !== f.id), items, read, filter: st2.filter === f.id ? 'all' : st2.filter }
          })
          const importOpml = (src) => {
            try {
              const list = parseOpml(src)
              const have = new Set(store.get().feeds.map((f) => f.url))
              const fresh = list.filter((f) => !have.has(f.url)).map((f) => ({ ...f, id: hashId(f.url) }))
              store.set((st2) => ({ feeds: [...st2.feeds, ...fresh] }))
              setMsg(`导入 ${fresh.length} 个订阅（跳过重复 ${list.length - fresh.length} 个）`); setOpml(null)
              fresh.forEach((f, i) => setTimeout(() => refreshFeed(f), i * 300))
            } catch (e) { setMsg('导入失败：' + e.message) }
          }
          const exportOpml = () => {
            const blob = new Blob([toOpml(store.get().feeds)], { type: 'text/x-opml' })
            const a = document.createElement('a')
            a.href = URL.createObjectURL(blob); a.download = 'dsh-rss.opml'
            document.body.appendChild(a); a.click(); a.remove()
            setTimeout(() => URL.revokeObjectURL(a.href), 1000)
          }
          return h('div', { className: 'yk-scroll' },
            h('div', { className: 'yk-form' },
              h('input', { className: 'yk-input', placeholder: '订阅地址或网站首页，如 sspai.com', value: url, onChange: (e) => setUrl(e.target.value), onKeyDown: (e) => e.key === 'Enter' && add(url) }),
              h('button', { className: 'yk-btn yk-primary', disabled: busy || !url.trim(), onClick: () => add(url) }, busy ? '…' : '订阅')),
            msg && h('div', { className: 'yk-muted', style: { padding: '0 8px 4px' } }, msg),
            cands.map((c) => h('div', { key: c.url, className: 'yk-row', onClick: () => add(c.url, c.title) }, h('div', { className: 'yk-ell' }, c.title || c.url), h('div', { className: 'yk-muted yk-ell' }, c.url))),
            h('div', { className: 'yk-sec' }, `已订阅 ${s.feeds.length} 个`),
            s.feeds.map((f, i) => h('div', { key: f.id, className: 'rs-feed', title: f.url },
              h('div', { className: 'rs-name' },
                h('div', { className: 'yk-ell' }, f.title || f.url),
                h('div', { className: 'yk-muted yk-ell', style: { fontSize: 11 } }, st[f.id]?.error ? '⚠️ ' + st[f.id].error : st[f.id]?.loading ? '刷新中…' : `${(s.items[f.id] || []).length} 篇 · ${unreadOf(s, f.id)} 未读${st[f.id]?.at ? ' · ' + ykAgo(st[f.id].at) : ''}`)),
              h('button', { className: 'yk-ibtn', title: '上移', disabled: i === 0, onClick: () => store.set((st2) => { const a = [...st2.feeds]; [a[i - 1], a[i]] = [a[i], a[i - 1]]; return { feeds: a } }) }, '↑'),
              h('button', { className: 'yk-ibtn', title: '刷新', onClick: () => refreshFeed(f) }, YkIcons.refresh()),
              h('button', { className: 'yk-ibtn', title: '退订', 'aria-label': '退订', onClick: () => remove(f) }, YkIcons.trash()))),
            h('div', { className: 'yk-sec' }, '导入 / 导出'),
            h('div', { className: 'yk-form' },
              h('button', { className: 'yk-btn', onClick: () => fileRef.current?.click() }, '导入 OPML 文件'),
              h('button', { className: 'yk-btn', onClick: () => setOpml(opml === null ? '' : null) }, '粘贴 OPML'),
              h('button', { className: 'yk-btn', disabled: !s.feeds.length, onClick: exportOpml }, '导出 OPML'),
              h('input', { ref: fileRef, type: 'file', accept: '.opml,.xml,text/xml', style: { display: 'none' }, onChange: async (e) => { const f = e.target.files?.[0]; if (f) importOpml(await f.text()); e.target.value = '' } })),
            opml !== null && h('div', { style: { padding: '0 6px 6px' } },
              h('textarea', { className: 'yk-textarea', value: opml, placeholder: '<opml>…</opml>', onChange: (e) => setOpml(e.target.value) }),
              h('button', { className: 'yk-btn', disabled: !opml.trim(), onClick: () => importOpml(opml) }, '导入')),
            h('div', { className: 'yk-sec' }, '设置'),
            h('div', { className: 'yk-form' },
              h('span', { className: 'yk-muted' }, '自动刷新'),
              h('select', { className: 'yk-select', value: s.every, onChange: (e) => store.set({ every: Number(e.target.value) }) }, [15, 30, 60, 180].map((m) => h('option', { key: m, value: m }, m < 60 ? `${m} 分钟` : `${m / 60} 小时`))),
              h('label', { className: 'yk-check' }, h('input', { type: 'checkbox', checked: s.showSummary !== false, onChange: (e) => store.set({ showSummary: e.target.checked }) }), '列表显示摘要')),
            h('div', { className: 'yk-muted', style: { padding: '4px 8px 8px', lineHeight: 1.6 } }, '订阅列表和已读状态保存在本机浏览器；正文只在内存里，不落盘。文章里的脚本和样式会被去掉，链接在浏览器中打开。'))
        }

        function Body() {
          const s = useStore()
          return h(React.Fragment, null, h('style', null, CSS), s.view === 'feeds' ? h(Feeds) : s.view === 'article' ? h(Article) : h(List))
        }

        dock.mount({
          Body,
          title: (s) => (s.view === 'feeds' ? 'RSS · 订阅管理' : s.view === 'article' ? (Object.values(s.items).flat().find((x) => x.id === s.article)?.title || 'RSS') : 'RSS'),
          actions: (s) => [
            s.view !== 'list' && h('button', { key: 'b', className: 'yk-ibtn', title: '返回列表', 'aria-label': '返回', onClick: () => store.set({ view: 'list' }) }, YkIcons.back()),
            s.view === 'article' && h('button', { key: 'a-', className: 'yk-ibtn', title: '缩小字号', onClick: () => store.set({ fontSize: Math.max(11, s.fontSize - 1) }) }, 'A-'),
            s.view === 'article' && h('button', { key: 'a+', className: 'yk-ibtn', title: '放大字号', onClick: () => store.set({ fontSize: Math.min(20, s.fontSize + 1) }) }, 'A+'),
            s.view === 'list' && h('button', { key: 'r', className: 'yk-ibtn', title: `刷新全部（${ykKey('R')}）`, 'aria-label': '刷新', onClick: () => refreshAll(true) }, YkIcons.refresh()),
            h('button', { key: 'g', className: 'yk-ibtn' + (s.view === 'feeds' ? ' yk-on' : ''), title: '订阅管理', 'aria-label': '订阅管理', onClick: () => store.set({ view: s.view === 'feeds' ? 'list' : 'feeds' }) }, YkIcons.gear()),
          ],
          mini: (s) => { const n = totalUnread(s); return n ? { text: n > 99 ? '99+' : String(n), tip: `${n} 篇未读` } : null },
          onKey: (e) => { if (e.code === 'KeyR') { refreshAll(true); return true } },
        })
      },
    }
  },
})
