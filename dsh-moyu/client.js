window.__ModuleLoader__.load({
  id: '@soy-sauce-phil/dsh-moyu',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const { useState, useEffect } = React
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
.my-big{font-size:26px;font-weight:600;font-variant-numeric:tabular-nums;letter-spacing:.5px;text-align:center;padding:8px 0 2px}
.my-cap{text-align:center;font-size:12px;color:var(--dsw-alias-label-secondary)}
.my-bar{height:6px;border-radius:3px;background:var(--dsw-alias-bg-layer-2);overflow:hidden;margin:8px 12px 4px}
.my-bar i{display:block;height:100%;background:linear-gradient(90deg,var(--dsw-alias-brand-primary),#3fa66b)}
.my-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:8px}
.my-tile{border:.5px solid var(--dsw-alias-border-l2);border-radius:8px;padding:6px 8px;min-width:0}
.my-tile b{display:block;font-size:15px;font-variant-numeric:tabular-nums;font-weight:600}
.my-tile span{font-size:11px;color:var(--dsw-alias-label-secondary)}
.my-line{display:flex;align-items:center;gap:6px;padding:4px 8px;font-size:12px}
.my-line .yk-input{flex:none;width:72px}
.my-line .my-grow{flex:1;min-width:0}
.my-toast{position:fixed;right:18px;bottom:18px;z-index:2147483000;max-width:300px;padding:10px 12px;border-radius:10px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border:.5px solid var(--dsw-alias-border-l2);box-shadow:0 6px 24px rgba(0,0,0,.18);font-size:13px;line-height:1.5;display:flex;gap:8px;align-items:flex-start}
.my-toast.my-code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px}
.my-toast button{margin-left:auto}
.my-clock{flex-wrap:wrap}
.my-clock .yk-input{width:78px}
.my-hrow{display:flex;align-items:center;gap:4px;padding:2px 8px;font-size:12px;font-variant-numeric:tabular-nums}
.my-hrow .yk-input{width:74px;padding:1px 4px}
.my-hrow .my-d{width:62px;flex:none}
.my-hrow .my-w{width:40px;flex:none;text-align:right}
.my-hrow .my-o{width:46px;flex:none;text-align:right;color:var(--dsw-alias-label-secondary)}
.my-hrow.my-off .my-d{color:var(--dsw-alias-label-secondary)}
.my-over{color:#d9822b}
`
    // Disguise: every sidebar widget (these plugins, the novel reader and Tieba) renders as source code.
    const CARDS = '.yk-card,.tb-card,.nr-card'
    const scoped = (sel) => CARDS.split(',').map((c) => `body.yk-disguise ${c} ${sel}`).join(',')
    const DISGUISE_CSS = `
body.yk-disguise :is(${CARDS}){font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace!important;font-size:12px!important;background:var(--dsw-alias-bg-base)!important;border-color:var(--dsw-alias-border-l1)!important}
${scoped('*')}{font-family:inherit!important;font-weight:400!important;color:var(--dsw-alias-label-secondary)!important;background-image:none!important;text-shadow:none!important;letter-spacing:0!important}
${scoped(':is(img,video,svg,canvas,picture)')}{opacity:0!important;max-height:0!important;margin:0!important}
${scoped(':is(button,select,input,textarea)')}{background:transparent!important;border-color:var(--dsw-alias-border-l1)!important;box-shadow:none!important}
${scoped(':is(.yk-row,.tb-row,.nr-row,.rs-item,.st-row,.kg-opt,.yk-tab,.tb-post,p)')}{background:transparent!important}
${scoped(':is(.yk-row,.tb-row,.nr-row,.rs-item,.tb-post)')}::before{content:"// ";color:#6a9955}
${scoped(':is(.yk-title,.tb-title,.nr-title)')}{font-size:0!important}
${scoped(':is(.yk-title,.tb-title,.nr-title)')}::after{content:var(--yk-fake-file,"src/utils/request.ts");font-size:12px;color:var(--dsw-alias-label-primary)}
${scoped(':is(.yk-up,.yk-down,.st-pct,.hot-rank,.kg-right,.kg-wrong,.g2-cell,.ms-cell,.sd-cell)')}{background:transparent!important;color:#9cdcfe!important;border-color:var(--dsw-alias-border-l1)!important}
body.yk-disguise :is(.yk-mini,.tb-mini,.nr-mini){font-family:ui-monospace,Menlo,monospace!important;color:var(--dsw-alias-label-secondary)!important}
body.yk-disguise :is(.yk-mini,.tb-mini,.nr-mini) :is(svg,span){display:none!important}
body.yk-disguise :is(.yk-hub-name,.yk-hub-key,.yk-hub-badge){display:none!important}
body.yk-disguise .yk-hub-tile{background:transparent!important;border-color:var(--dsw-alias-border-l1)!important}
body.yk-disguise :is(.yk-mini,.tb-mini,.nr-mini)::after{content:"{}";font-size:11px}
body.yk-disguise .yk-mini.yk-wide::after{content:"{ }"}
`
    const FAKE_FILES = ['src/utils/request.ts', 'src/api/order.service.ts', 'src/hooks/usePagination.ts', 'server/middleware/auth.go', 'src/components/Table/index.tsx', 'scripts/migrate_2026_11.sql']

    const Icon = () => YkIcons.svg(['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M12 7v5l3 2'])

    // Festival days (lunar dates resolved ahead); actual days off follow the State Council notice.
    const FESTIVALS = [
      ['元旦', '01-01'], ['劳动节', '05-01'], ['国庆节', '10-01'],
      ['春节', '2027-02-06', '2028-01-26', '2029-02-13', '2030-02-03'],
      ['清明节', '2027-04-05', '2028-04-04', '2029-04-04', '2030-04-05'],
      ['端午节', '2027-06-09', '2028-05-28', '2029-06-16', '2030-06-05'],
      ['中秋节', '2026-09-25', '2027-09-15', '2028-10-03', '2029-09-22', '2030-09-12'],
    ]
    const dayStart = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
    const parseDay = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d) }
    const daysUntil = (target, now) => Math.round((dayStart(target) - dayStart(now)) / 86400000)
    function nextFestivals(now) {
      const out = []
      for (const [name, ...dates] of FESTIVALS) {
        const cands = dates[0].length === 5 ? [now.getFullYear(), now.getFullYear() + 1].map((y) => parseDay(`${y}-${dates[0]}`)) : dates.map(parseDay)
        const next = cands.find((d) => daysUntil(d, now) >= 0)
        if (next) out.push({ name, date: next, days: daysUntil(next, now) })
      }
      return out.sort((a, b) => a.days - b.days)
    }

    const pad = (n) => String(n).padStart(2, '0')
    const hm = (s) => { const m = /^(\d{1,2}):(\d{2})$/.exec(String(s || '')); return m ? Number(m[1]) * 60 + Number(m[2]) : null }
    function dur(sec) {
      sec = Math.max(0, Math.floor(sec))
      const h2 = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60
      return h2 ? `${h2}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`
    }

    /** Where we are in the working day. All times local. */
    function workState(cfg, now = new Date()) {
      const isWorkday = cfg.workdays.includes(now.getDay())
      const sec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()
      const start = (hm(cfg.start) ?? 540) * 60, end = (hm(cfg.end) ?? 1080) * 60
      const ls = cfg.lunch ? (hm(cfg.lunchStart) ?? 720) * 60 : 0, le = cfg.lunch ? (hm(cfg.lunchEnd) ?? 780) * 60 : 0
      const lunchLen = cfg.lunch ? Math.max(0, le - ls) : 0
      const total = Math.max(1, end - start - lunchLen)
      const worked = (t) => Math.max(0, Math.min(t, end) - start - (cfg.lunch ? Math.max(0, Math.min(t, le) - ls) : 0))
      let phase
      if (!isWorkday) phase = 'off-day'
      else if (sec < start) phase = 'before'
      else if (sec >= end) phase = 'after'
      else if (cfg.lunch && sec >= ls && sec < le) phase = 'lunch'
      else phase = 'work'
      const done = phase === 'after' ? total : phase === 'before' || phase === 'off-day' ? 0 : worked(sec)
      // next workday's start for the "before / off-day" view
      let nextStartIn = 0
      if (phase !== 'work' && phase !== 'lunch') {
        const d = new Date(now)
        if (phase === 'after' || phase === 'off-day') d.setDate(d.getDate() + (phase === 'after' ? 1 : 0))
        for (let i = 0; i < 8 && !cfg.workdays.includes(d.getDay()); i++) d.setDate(d.getDate() + 1)
        if (phase === 'off-day') { while (!cfg.workdays.includes(d.getDay())) d.setDate(d.getDate() + 1) }
        const t = new Date(d.getFullYear(), d.getMonth(), d.getDate(), Math.floor(start / 3600), Math.floor((start % 3600) / 60))
        nextStartIn = Math.max(0, (t - now) / 1000)
      }
      return { phase, toEnd: end - sec, toLunch: cfg.lunch ? ls - sec : -1, toLunchEnd: cfg.lunch ? le - sec : -1, done, total, ratio: done / total, nextStartIn }
    }
    function weekendIn(cfg, now) {
      if (!cfg.workdays.includes(now.getDay())) return 0
      let n = 0
      const d = new Date(now)
      while (cfg.workdays.includes(d.getDay()) && n < 7) { d.setDate(d.getDate() + 1); n++ }
      return n
    }
    function paydayIn(day, now) {
      const clamp = (y, m) => Math.min(day, new Date(y, m + 1, 0).getDate())
      let t = new Date(now.getFullYear(), now.getMonth(), clamp(now.getFullYear(), now.getMonth()))
      if (daysUntil(t, now) < 0) t = new Date(now.getFullYear(), now.getMonth() + 1, clamp(now.getFullYear(), now.getMonth() + 1))
      return daysUntil(t, now)
    }

    // ---- work hours. A "work day" runs 04:00 → 04:00, so staying past midnight still counts for that day.
    const BOUNDARY = 4 * 60
    const dayKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
    const workDayOf = (now) => dayKey(new Date(now.getTime() - BOUNDARY * 60000))
    const nowHM = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`
    const WEEK = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    function spanOf(rec) {
      const a = hm(rec?.in), b0 = hm(rec?.out)
      if (a == null || b0 == null) return null
      return [a, b0 < a ? b0 + 1440 : b0]
    }
    /** Minutes worked: clock-in to clock-out minus the lunch break it covers. */
    function workedMin(rec, cfg) {
      const sp = spanOf(rec)
      if (!sp) return 0
      let m = sp[1] - sp[0]
      if (cfg.lunch) { const ls = hm(cfg.lunchStart) ?? 720, le = hm(cfg.lunchEnd) ?? 780; m -= Math.max(0, Math.min(sp[1], le) - Math.max(sp[0], ls)) }
      return Math.max(0, m)
    }
    const planMin = (cfg) => Math.round(workState(cfg).total / 60)
    const isWorkKey = (k, cfg) => cfg.workdays.includes(parseDay(k).getDay())
    /** Worked minus planned; on a day off every minute is overtime. */
    const overMin = (k, rec, cfg) => workedMin(rec, cfg) - (isWorkKey(k, cfg) ? planMin(cfg) : 0)
    const fmtM = (m) => `${m < 0 ? '-' : ''}${Math.floor(Math.abs(m) / 60)}:${pad(Math.abs(m) % 60)}`
    const fmtOver = (m) => (m > 0 ? '+' + fmtM(m) : m < 0 ? fmtM(m) : '±0')
    /** Totals over the given day keys. */
    function sumUp(keys, clock, cfg) {
      const recs = keys.filter((k) => spanOf(clock[k]))
      // today only counts towards overtime / average once it's over (clocked out, or past the planned end)
      const today = workDayOf(new Date())
      const finished = (k) => k !== today || clock[k].outM || workState(cfg).phase === 'after' || !isWorkKey(k, cfg)
      const done = recs.filter(finished)
      const worked = recs.reduce((n, k) => n + workedMin(clock[k], cfg), 0)
      const over = done.reduce((n, k) => n + overMin(k, clock[k], cfg), 0)
      const doneWorked = done.reduce((n, k) => n + workedMin(clock[k], cfg), 0)
      return { days: recs.length, worked, over, avg: done.length ? Math.round(doneWorked / done.length) : 0 }
    }
    function keysBack(fromKey, n) {
      const d = parseDay(fromKey)
      const out = []
      for (let i = 0; i < n; i++) { out.push(dayKey(d)); d.setDate(d.getDate() - 1) }
      return out
    }

    const REMINDERS = [
      { id: 'water', label: '喝水', every: 45, text: '起来喝口水吧 💧', code: '✓ Compiled successfully in 1.2s (water)' },
      { id: 'move', label: '起身活动', every: 60, text: '坐太久了，站起来走两步 🚶', code: 'warn: process has been idle for 60m (stretch)' },
      { id: 'eye', label: '护眼 20-20-20', every: 20, text: '看看 6 米外的地方 20 秒 👀', code: 'info: GC pause 20s (look away)' },
      { id: 'fish', label: '摸鱼时间', every: 90, text: '辛苦了，摸会儿鱼吧 🐟', code: 'info: background sync finished (break)' },
    ]

    return {
      inject: ['slots'],
      apply(ctx) {
        let storeRef = null
        /** The widget's own name: what the user chose, or a neutral one while staying low-key. */
        const nameOf = () => {
          const s = storeRef && storeRef.get()
          const alias = String(s?.alias || '').trim()
          return alias || (s?.stealth ? '日程' : '摸鱼')
        }
        const dock = createDock(ctx, {
          id: 'moyu', key: 'Y', label: () => nameOf(), order: -55, icon: Icon, storageKey: 'dsh-moyu:v1', height: 300,
          defaults: {
            view: 'home', start: '09:00', end: '18:00', lunch: true, lunchStart: '12:00', lunchEnd: '13:00', workdays: [1, 2, 3, 4, 5],
            salary: 0, showMoney: false, payday: 10, countdowns: [], reminders: { water: true, move: true, eye: false, fish: true }, every: {}, sysNotify: false, workOnly: true,
            disguise: false, fakeFile: 0, badge: 'end', alias: '', stealth: false,
            track: true, clock: {},
          },
        })
        const { store, useStore, bus } = dock
        storeRef = store
        bus.extras.D = '伪装成代码（假装工作）'

        // ---------------------------------------------------------- disguise mode
        const applyDisguise = () => {
          if (typeof document === 'undefined' || !document.body) return
          const on = store.get().disguise
          document.body.classList.toggle('yk-disguise', Boolean(on))
          document.body.style.setProperty('--yk-fake-file', JSON.stringify(FAKE_FILES[store.get().fakeFile % FAKE_FILES.length]))
        }
        ctx.effect(() => {
          let style = null
          if (typeof document !== 'undefined' && document.head) {
            style = document.createElement('style')
            style.setAttribute('data-yk', 'disguise')
            style.textContent = DISGUISE_CSS
            document.head.appendChild(style)
          }
          applyDisguise()
          const unsub = store.subscribe(applyDisguise)
          const onKey = (e) => {
            if (!e.altKey || !e.shiftKey || e.metaKey || e.ctrlKey || e.repeat || e.code !== 'KeyD') return
            e.preventDefault()
            store.set((s) => ({ disguise: !s.disguise, fakeFile: s.disguise ? s.fakeFile : s.fakeFile + 1 }))
          }
          window.addEventListener('keydown', onKey, true)
          return () => {
            unsub(); window.removeEventListener('keydown', onKey, true)
            style?.remove()
            if (typeof document !== 'undefined') document.body?.classList.remove('yk-disguise')
            delete bus.extras.D
          }
        }, 'moyu: disguise')

        // ---------------------------------------------------------- work hours
        // Clock-in = first activity of the day in DSH, clock-out = last activity (until clocked out by hand).
        // "Activity" means input in this page within the last 10 minutes, so a page left open overnight doesn't count.
        let lastActive = Date.now()
        const ACTIVE_MS = 10 * 60000
        const isActive = () => Date.now() - lastActive < ACTIVE_MS
        function setClock(k, patch) {
          store.set((st) => {
            const clock = { ...st.clock }
            const rec = { ...(clock[k] || {}), ...patch }
            for (const f of Object.keys(rec)) if (rec[f] === undefined || rec[f] === '') delete rec[f]
            if (!rec.in && !rec.out) delete clock[k]
            else clock[k] = rec
            const keys = Object.keys(clock).sort()
            for (const old of keys.slice(0, Math.max(0, keys.length - 400))) delete clock[old]
            return { clock }
          })
        }
        function beat() {
          const s = store.get()
          if (!s.track || !isActive()) return
          const now = new Date()
          const k = workDayOf(now), t = nowHM(now), rec = s.clock[k] || {}
          const patch = {}
          if (!rec.in) patch.in = t
          if (!rec.outM && rec.out !== t) patch.out = t
          if (Object.keys(patch).length) setClock(k, patch)
        }
        ctx.effect(() => {
          const mark = () => { lastActive = Date.now() }
          const EVS = ['pointerdown', 'keydown', 'wheel', 'mousemove']
          for (const e of EVS) window.addEventListener(e, mark, true)
          beat()
          const t = setInterval(beat, 60000)
          return () => { for (const e of EVS) window.removeEventListener(e, mark, true); clearInterval(t) }
        }, 'moyu: work hours')
        /** Still at work past the planned end (auto-tracked, not clocked out, recently active)? */
        const stayingLate = (s, now = new Date()) => {
          if (!s.track) return false
          const rec = s.clock[workDayOf(now)]
          return Boolean(rec && rec.in && !rec.outM && isActive())
        }

        // ---------------------------------------------------------- reminders
        const toast = ykAtom(null)
        const notify = (r) => {
          const s = store.get()
          const quiet = s.disguise || s.stealth
          toast.set({ id: r.id, text: quiet ? r.code : r.text, code: quiet, at: Date.now() })
          if (s.sysNotify && typeof Notification !== 'undefined' && Notification.permission === 'granted' && !s.disguise) {
            try { new Notification('摸鱼助手', { body: r.text, silent: true }) } catch {}
          }
        }
        ctx.effect(() => {
          const last = {}
          const t = setInterval(() => {
            const s = store.get()
            const now = Date.now()
            const ws = workState(s)
            if (s.workOnly && ws.phase !== 'work') { for (const r of REMINDERS) last[r.id] = now; return }
            for (const r of REMINDERS) {
              if (!s.reminders[r.id]) { last[r.id] = now; continue }
              const every = (s.every[r.id] || r.every) * 60000
              if (!last[r.id]) last[r.id] = now
              if (now - last[r.id] >= every) { last[r.id] = now; notify(r) }
            }
          }, 15000)
          return () => clearInterval(t)
        }, 'moyu: reminders')

        function Toast() {
          const t = toast.use()
          useEffect(() => { if (!t) return; const x = setTimeout(() => toast.set(null), 12000); return () => clearTimeout(x) }, [t])
          if (!t) return null
          const node = h('div', { className: 'my-toast' + (t.code ? ' my-code' : ''), role: 'status' }, h('style', null, CSS), h('span', null, t.text), h('button', { className: 'yk-ibtn', 'aria-label': '关闭提醒', onClick: () => toast.set(null) }, '×'))
          let RD = null
          try { RD = require('react-dom') } catch {}
          return RD?.createPortal && typeof document !== 'undefined' && document.body ? RD.createPortal(node, document.body) : node
        }

        // the collapsed countdown badge ticks once a second
        ctx.effect(() => { const t = setInterval(() => { if (!bus.hidden && store.get().collapsed) store.set({ tick: Date.now() }) }, 1000); return () => clearInterval(t) }, 'moyu: badge tick')

        const earnedPerSec = (s) => (s.salary > 0 ? s.salary / 21.75 / Math.max(1, workState(s).total) : 0)

        function Home() {
          const s = useStore()
          const [, tick] = useState(0)
          useEffect(() => { const t = setInterval(() => tick((n) => n + 1), 1000); return () => clearInterval(t) }, [])
          const now = new Date()
          const ws = workState(s, now)
          const late = ws.phase === 'after' && stayingLate(s, now)
          const big = ws.phase === 'work' ? dur(ws.toEnd) : ws.phase === 'lunch' ? dur(ws.toLunchEnd) : late ? dur(-ws.toEnd) : ws.phase === 'after' ? '已下班 🎉' : ws.phase === 'before' ? dur(ws.nextStartIn) : '休息日 🛋️'
          const cap = ws.phase === 'work' ? `距离下班（${s.end}）${ws.toLunch > 0 ? ` · 距午饭 ${dur(ws.toLunch)}` : ''}` : ws.phase === 'lunch' ? '午休中，距离下午上班' : late ? `已经过了下班时间（${s.end}），走的时候点「下班打卡」` : ws.phase === 'before' ? '距离上班' : ws.phase === 'after' ? `明天 ${s.start} 见` : `距下次上班 ${Math.floor(ws.nextStartIn / 86400)} 天 ${dur(ws.nextStartIn % 86400)}`
          const earned = earnedPerSec(s) * ws.done
          const fest = nextFestivals(now)
          const wk = weekendIn(s, now)
          const tiles = [
            wk ? { v: wk === 1 ? '明天' : `${wk} 天`, l: '距离周末' } : { v: '就是今天', l: '周末 / 休息日' },
            { v: (() => { const d = paydayIn(s.payday, now); return d === 0 ? '今天！' : d + ' 天' })(), l: `发薪日（每月 ${s.payday} 号）` },
            ...fest.slice(0, 2).map((f) => ({ v: f.days === 0 ? '今天' : f.days + ' 天', l: `${f.name} ${f.date.getMonth() + 1}/${f.date.getDate()}` })),
            ...s.countdowns.map((c) => { const d = daysUntil(parseDay(c.date), now); return { v: d === 0 ? '今天' : d > 0 ? d + ' 天' : `已过 ${-d} 天`, l: c.name } }),
          ]
          return h('div', { className: 'yk-scroll', style: { padding: 0 } },
            h('div', { className: 'my-big' }, big),
            h('div', { className: 'my-cap' }, cap),
            (ws.phase === 'work' || ws.phase === 'lunch') && h('div', { className: 'my-bar', title: `今日已完成 ${Math.round(ws.ratio * 100)}%` }, h('i', { style: { width: ws.ratio * 100 + '%' } })),
            !s.stealth && s.salary > 0 && s.showMoney && h('div', { className: 'my-cap', style: { marginTop: 4 } }, `今日已赚 ¥${earned.toFixed(2)}${ws.phase === 'work' ? ` · 每秒 ¥${earnedPerSec(s).toFixed(4)}` : ''}`),
            !s.stealth && s.salary > 0 && !s.showMoney && h('div', { className: 'my-cap', style: { marginTop: 4 } }, h('button', { className: 'yk-link', onClick: () => store.set({ showMoney: true }) }, '显示今日已赚')),
            h(Today, { now }),
            h('div', { className: 'my-grid' }, tiles.map((t, i) => h('div', { key: i, className: 'my-tile' }, h('b', null, t.v), h('span', null, t.l)))),
            h('div', { className: 'my-line' },
              h('label', { className: 'yk-check my-grow', title: `快捷键 ${ykKey('D')}` }, h('input', { type: 'checkbox', checked: s.disguise, onChange: (e) => store.set((st) => ({ disguise: e.target.checked, fakeFile: e.target.checked ? st.fakeFile + 1 : st.fakeFile })) }), `假装工作：所有侧栏小部件伪装成代码（${ykKey('D')}）`)),
            h('div', { className: 'yk-muted', style: { padding: '0 8px 8px', lineHeight: 1.6 } }, `老板来了按 ${ykKey('H')} 隐藏全部小部件。节假日按节日当天计算，实际放假以国务院通知为准。`))
        }

        function Today({ now }) {
          const s = useStore()
          if (!s.track) return null
          const k = workDayOf(now)
          const rec = s.clock[k] || {}
          const worked = workedMin(rec, s)
          const over = overMin(k, rec, s)
          const time = (f) => h('input', { className: 'yk-input', type: 'time', value: rec[f] || '', 'aria-label': f === 'in' ? '上班时间' : '下班时间', onChange: (e) => setClock(k, { [f]: e.target.value, [f + 'M']: e.target.value ? true : undefined }) })
          return h(React.Fragment, null,
            h('div', { className: 'yk-sec' }, '今日工时'),
            h('div', { className: 'my-line my-clock' },
              h('span', { className: 'yk-muted' }, '上班'), time('in'), h('span', { className: 'yk-muted' }, '下班'), time('out'),
              h('span', { className: 'my-grow' }),
              rec.outM
                ? h('button', { className: 'yk-link', title: '继续自动记录下班时间', onClick: () => setClock(k, { outM: undefined, out: nowHM(new Date()) }) }, '撤销打卡')
                : h('button', { className: 'yk-btn', disabled: !rec.in, onClick: () => setClock(k, { out: nowHM(new Date()), outM: true }) }, '下班打卡')),
            h('div', { className: 'my-cap', style: { textAlign: 'left', padding: '0 8px' } },
              rec.in ? [`已工作 ${fmtM(worked)}`, isWorkKey(k, s) ? `计划 ${fmtM(planMin(s))}` : '今天是休息日', over > 0 ? h('span', { key: 'o', className: 'my-over' }, `加班 ${fmtM(over)}`) : over < 0 && rec.outM ? `少 ${fmtM(-over)}` : null].filter(Boolean).flatMap((x, i) => (i ? [' · ', x] : [x])) : '今天还没有记录，在 DSH 里有操作时会自动记上班时间',
              ' ', h('button', { className: 'yk-link', onClick: () => store.set({ view: 'hours' }) }, '统计 →')))
        }

        function Hours() {
          const s = useStore()
          const today = workDayOf(new Date())
          const [n, setN] = useState(14)
          const d0 = parseDay(today)
          const weekKeys = keysBack(today, ((d0.getDay() + 6) % 7) + 1) // Monday → today
          const monthKeys = keysBack(today, d0.getDate())
          const prevMonthEnd = new Date(d0.getFullYear(), d0.getMonth(), 0)
          const prevKeys = keysBack(dayKey(prevMonthEnd), prevMonthEnd.getDate())
          const blocks = [['本周', sumUp(weekKeys, s.clock, s)], ['本月', sumUp(monthKeys, s.clock, s)], [`${prevMonthEnd.getMonth() + 1} 月`, sumUp(prevKeys, s.clock, s)]]
          const rows = keysBack(today, n).filter((k) => s.clock[k] || isWorkKey(k, s))
          const exportCsv = () => {
            const keys = Object.keys(s.clock).sort()
            const csv = '\ufeff日期,星期,上班,下班,工时(分钟),加班(分钟)\n' + keys.map((k) => { const r = s.clock[k]; return [k, WEEK[parseDay(k).getDay()], r.in || '', r.out || '', spanOf(r) ? workedMin(r, s) : '', spanOf(r) ? overMin(k, r, s) : ''].join(',') }).join('\n')
            const a = document.createElement('a')
            a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); a.download = `工时-${today}.csv`
            document.body.appendChild(a); a.click(); a.remove()
          }
          return h('div', { className: 'yk-scroll', style: { padding: '2px 0 8px' } },
            h('div', { className: 'my-grid', style: { gridTemplateColumns: '1fr 1fr 1fr' } }, blocks.map(([label, x]) => h('div', { key: label, className: 'my-tile' },
              h('b', null, fmtM(x.worked)), h('span', null, `${label} · ${x.days} 天`), h('div', { className: 'yk-muted', style: { fontSize: 11 } }, `日均 ${fmtM(x.avg)}`),
              h('div', { className: x.over > 0 ? 'my-over' : 'yk-muted', style: { fontSize: 11 } }, `加班 ${fmtOver(x.over)}`)))),
            h('div', { className: 'yk-sec' }, '每日记录（可以直接改时间）'),
            rows.map((k) => {
              const r = s.clock[k] || {}
              const off = !isWorkKey(k, s)
              const d = parseDay(k)
              const has = spanOf(r)
              const o = has ? overMin(k, r, s) : 0
              const time = (f) => h('input', { className: 'yk-input', type: 'time', value: r[f] || '', 'aria-label': `${k} ${f === 'in' ? '上班' : '下班'}`, onChange: (e) => setClock(k, { [f]: e.target.value, [f + 'M']: e.target.value ? true : undefined }) })
              return h('div', { key: k, className: 'my-hrow' + (off ? ' my-off' : '') },
                h('span', { className: 'my-d' }, `${d.getMonth() + 1}/${d.getDate()} ${WEEK[d.getDay()]}`), time('in'), time('out'),
                h('span', { className: 'my-w' }, has ? fmtM(workedMin(r, s)) : off ? '休' : '—'),
                h('span', { className: 'my-o' + (o > 0 ? ' my-over' : '') }, has ? fmtOver(o) : ''),
                (r.in || r.out) && h('button', { className: 'yk-ibtn', 'aria-label': `删除 ${k} 的记录`, title: '删除这天的记录', onClick: () => setClock(k, { in: undefined, out: undefined, inM: undefined, outM: undefined }) }, YkIcons.trash()))
            }),
            h('div', { className: 'my-line' },
              n < 400 && h('button', { className: 'yk-link', onClick: () => setN(n < 31 ? 62 : n * 2) }, '看更早的'),
              h('span', { className: 'my-grow' }),
              h('button', { className: 'yk-btn', disabled: !Object.keys(s.clock).length, onClick: exportCsv }, '导出 CSV')),
            h('div', { className: 'yk-muted', style: { padding: '2px 8px', lineHeight: 1.6 } },
              `工时 = 下班 − 上班 − 午休（${s.lunch ? `${s.lunchStart}–${s.lunchEnd}` : '未设'}），计划每天 ${fmtM(planMin(s))}；休息日的工时全部算加班。凌晨 4 点前离开算前一天。记录只存在本机浏览器。`))
        }

        function Settings() {
          const s = useStore()
          const [cd, setCd] = useState({ name: '', date: '' })
          const time = (k) => h('input', { className: 'yk-input', type: 'time', value: s[k], onChange: (e) => store.set({ [k]: e.target.value }) })
          const DAYS = ['日', '一', '二', '三', '四', '五', '六']
          return h('div', { className: 'yk-scroll', style: { padding: '2px 0 8px' } },
            h('div', { className: 'yk-sec' }, '作息'),
            h('div', { className: 'my-line' }, h('span', { className: 'my-grow' }, '上班 / 下班'), time('start'), time('end')),
            h('div', { className: 'my-line' }, h('label', { className: 'yk-check my-grow' }, h('input', { type: 'checkbox', checked: s.lunch, onChange: (e) => store.set({ lunch: e.target.checked }) }), '午休'), s.lunch && time('lunchStart'), s.lunch && time('lunchEnd')),
            h('div', { className: 'my-line' }, h('span', { className: 'my-grow' }, '工作日'),
              [1, 2, 3, 4, 5, 6, 0].map((d) => h('button', { key: d, className: 'yk-btn' + (s.workdays.includes(d) ? ' yk-on' : ''), style: { padding: '1px 5px' }, onClick: () => store.set((st) => ({ workdays: st.workdays.includes(d) ? st.workdays.filter((x) => x !== d) : [...st.workdays, d] })) }, DAYS[d]))),
            h('div', { className: 'my-line' }, h('label', { className: 'yk-check my-grow' }, h('input', { type: 'checkbox', checked: s.track, onChange: (e) => store.set({ track: e.target.checked }) }), '自动记录每天的上下班时间')),
            h('div', { className: 'yk-muted', style: { padding: '0 8px 4px', lineHeight: 1.6 } }, '当天第一次在 DSH 里操作算上班，最后一次操作算下班（超过 10 分钟没操作就不再往后记）。可以手动「下班打卡」或直接改时间。'),
            h('div', { className: 'yk-sec' }, '名称与低调'),
            h('div', { className: 'my-line' },
              h('span', { className: 'my-grow' }, '显示名称'),
              h('input', { className: 'yk-input', placeholder: nameOf(), value: s.alias, onChange: (e) => store.set({ alias: e.target.value }) })),
            h('div', { className: 'my-line' }, h('label', { className: 'yk-check my-grow' }, h('input', { type: 'checkbox', checked: s.stealth, onChange: (e) => store.set({ stealth: e.target.checked }) }), '低调模式：不显示倒计时数字，提醒也换成普通文字')),
            h('div', { className: 'yk-sec' }, '工资（只存在本机，用来算“今日已赚”）'),
            h('div', { className: 'my-line' }, h('span', { className: 'my-grow' }, '月薪（元）'), h('input', { className: 'yk-input', type: 'number', min: 0, value: s.salary || '', placeholder: '不填则不显示', onChange: (e) => store.set({ salary: Math.max(0, Number(e.target.value) || 0) }) })),
            h('div', { className: 'my-line' }, h('label', { className: 'yk-check my-grow' }, h('input', { type: 'checkbox', checked: s.showMoney, onChange: (e) => store.set({ showMoney: e.target.checked }) }), '显示今日已赚')),
            h('div', { className: 'my-line' }, h('span', { className: 'my-grow' }, '每月发薪日'), h('input', { className: 'yk-input', type: 'number', min: 1, max: 31, value: s.payday, onChange: (e) => store.set({ payday: Math.min(31, Math.max(1, Number(e.target.value) || 1)) }) })),
            h('div', { className: 'yk-sec' }, '自定义倒计时（考试、旅行、纪念日…）'),
            s.countdowns.map((c, i) => h('div', { key: i, className: 'my-line' }, h('span', { className: 'my-grow' }, `${c.name} · ${c.date}`), h('button', { className: 'yk-ibtn', 'aria-label': '删除倒计时', onClick: () => store.set((st) => ({ countdowns: st.countdowns.filter((_, k) => k !== i) })) }, YkIcons.trash()))),
            h('div', { className: 'my-line' },
              h('input', { className: 'yk-input my-grow', style: { width: 'auto' }, placeholder: '名称，如 国考笔试', value: cd.name, onChange: (e) => setCd({ ...cd, name: e.target.value }) }),
              h('input', { className: 'yk-input', style: { width: 120 }, type: 'date', value: cd.date, onChange: (e) => setCd({ ...cd, date: e.target.value }) }),
              h('button', { className: 'yk-btn', disabled: !cd.name.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(cd.date), onClick: () => { store.set((st) => ({ countdowns: [...st.countdowns, { name: cd.name.trim(), date: cd.date }] })); setCd({ name: '', date: '' }) } }, '添加')),
            h('div', { className: 'yk-sec' }, '提醒'),
            REMINDERS.map((r) => h('div', { key: r.id, className: 'my-line' },
              h('label', { className: 'yk-check my-grow' }, h('input', { type: 'checkbox', checked: Boolean(s.reminders[r.id]), onChange: (e) => store.set((st) => ({ reminders: { ...st.reminders, [r.id]: e.target.checked } })) }), r.label),
              h('span', { className: 'yk-muted' }, '每'),
              h('input', { className: 'yk-input', type: 'number', min: 5, max: 240, style: { width: 52 }, value: s.every[r.id] || r.every, onChange: (e) => store.set((st) => ({ every: { ...st.every, [r.id]: Math.min(240, Math.max(5, Number(e.target.value) || r.every)) } })) }),
              h('span', { className: 'yk-muted' }, '分钟'),
              h('button', { className: 'yk-link', onClick: () => notify(r) }, '试试'))),
            h('div', { className: 'my-line' }, h('label', { className: 'yk-check' }, h('input', { type: 'checkbox', checked: s.workOnly, onChange: (e) => store.set({ workOnly: e.target.checked }) }), '只在上班时间提醒')),
            h('div', { className: 'my-line' }, h('label', { className: 'yk-check' }, h('input', {
              type: 'checkbox', checked: s.sysNotify,
              onChange: async (e) => {
                const on = e.target.checked
                if (on && typeof Notification !== 'undefined' && Notification.permission !== 'granted') { try { if ((await Notification.requestPermission()) !== 'granted') return } catch { return } }
                store.set({ sysNotify: on })
              },
            }), '同时发系统通知（伪装模式下不发）')),
            h('div', { className: 'yk-sec' }, '收起时小图标显示'),
            h('div', { className: 'my-line' }, h('select', { className: 'yk-select', value: s.badge, onChange: (e) => store.set({ badge: e.target.value }) },
              h('option', { value: 'end' }, '下班倒计时'), h('option', { value: 'money' }, '今日已赚'), h('option', { value: 'pct' }, '今日进度 %'), h('option', { value: 'none' }, '不显示'))))
        }

        function Body() {
          const s = useStore()
          return h(React.Fragment, null, h('style', null, CSS), s.view === 'settings' ? h(Settings) : s.view === 'hours' ? h(Hours) : h(Home))
        }

        dock.mount({
          Body,
          title: (s) => (s.view === 'settings' ? nameOf() + ' · 设置' : s.view === 'hours' ? nameOf() + ' · 工时' : nameOf()),
          actions: (s) => [
            s.view === 'hours' && h('button', { key: 'b', className: 'yk-ibtn', title: '返回', 'aria-label': '返回', onClick: () => store.set({ view: 'home' }) }, YkIcons.back()),
            s.track && h('button', { key: 'h', className: 'yk-ibtn' + (s.view === 'hours' ? ' yk-on' : ''), title: '工时统计', 'aria-label': '工时统计', onClick: () => store.set({ view: s.view === 'hours' ? 'home' : 'hours' }) }, YkIcons.svg(['M5 20V11', 'M12 20V5', 'M19 20v-6'])),
            h('button', { key: 'd', className: 'yk-ibtn' + (s.disguise ? ' yk-on' : ''), title: `假装工作（${ykKey('D')}）`, 'aria-label': '假装工作', onClick: () => store.set((st) => ({ disguise: !st.disguise, fakeFile: st.disguise ? st.fakeFile : st.fakeFile + 1 })) }, '</>'),
            h('button', { key: 'g', className: 'yk-ibtn' + (s.view === 'settings' ? ' yk-on' : ''), title: '设置', 'aria-label': '设置', onClick: () => store.set({ view: s.view === 'settings' ? 'home' : 'settings' }) }, YkIcons.gear()),
          ],
          mini: (s) => {
            if (s.badge === 'none' || s.stealth) return null
            const ws = workState(s)
            if (ws.phase === 'after' && stayingLate(s)) { const m = Math.floor(-ws.toEnd / 60); return { text: `+${Math.floor(m / 60)}:${pad(m % 60)}`, tip: `已过下班时间 ${dur(-ws.toEnd)}` } }
            if (ws.phase === 'after') return { text: '下班', className: 'yk-down', tip: '已下班' }
            if (ws.phase === 'off-day') return { text: '休', tip: '休息日' }
            if (ws.phase === 'before') return null
            if (s.badge === 'money' && s.salary > 0) return { text: '¥' + (earnedPerSec(s) * ws.done).toFixed(0), tip: '今日已赚' }
            if (s.badge === 'pct') return { text: Math.round(ws.ratio * 100) + '%', tip: '今日进度' }
            const m = Math.ceil(ws.toEnd / 60)
            return { text: m >= 60 ? `${Math.floor(m / 60)}:${pad(m % 60)}` : `${m}分`, tip: `距离下班 ${dur(ws.toEnd)}` }
          },
        })
        // toast lives outside the dock so it shows even when the card is collapsed or hidden
        ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({ name: 'sidebar.footer.action', id: 'moyu-toast', order: 100, label: () => '摸鱼提醒' }, Toast))
      },
    }
  },
})
