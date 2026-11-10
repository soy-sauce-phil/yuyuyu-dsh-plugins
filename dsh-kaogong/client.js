window.__ModuleLoader__.load({
  id: '@soy-sauce-phil/dsh-kaogong',
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
    // <kg-bank> generated from dsh-kaogong/bank.js — do not edit here
    // Built-in sample bank (original questions written for this plugin; data in 资料分析 is fictional).
    // Concatenated into client.js by tools/sync-kit.mjs between the <kg-bank> markers.
    const BUILTIN_BANK = [
      // ------------------------------------------------------------ 常识判断
      { cat: '常识判断', q: '我国现行宪法是在哪一年通过的？', opts: ['1954 年', '1975 年', '1978 年', '1982 年'], ans: 3, exp: '现行宪法于 1982 年 12 月 4 日由五届全国人大五次会议通过，此后经 1988、1993、1999、2004、2018 年五次修正。' },
      { cat: '常识判断', q: '全国人民代表大会每届任期为：', opts: ['3 年', '4 年', '5 年', '6 年'], ans: 2, exp: '宪法规定全国人民代表大会每届任期五年。' },
      { cat: '常识判断', q: '下列哪一项属于我国的根本政治制度，而不是基本政治制度？', opts: ['人民代表大会制度', '中国共产党领导的多党合作和政治协商制度', '民族区域自治制度', '基层群众自治制度'], ans: 0, exp: '人民代表大会制度是根本政治制度；其余三项是基本政治制度。' },
      { cat: '常识判断', q: '我国最高国家行政机关是：', opts: ['全国人民代表大会', '国务院', '最高人民法院', '全国政协'], ans: 1, exp: '国务院即中央人民政府，是最高国家权力机关的执行机关，是最高国家行政机关。' },
      { cat: '常识判断', q: '根据《民法典》，一般情况下成年人为完全民事行为能力人，成年的年龄是：', opts: ['16 周岁', '18 周岁', '14 周岁', '20 周岁'], ans: 1, exp: '十八周岁以上的自然人为成年人。另外，十六周岁以上、以自己的劳动收入为主要生活来源的未成年人，视为完全民事行为能力人。' },
      { cat: '常识判断', q: '“四书”不包括：', opts: ['《大学》', '《中庸》', '《论语》', '《诗经》'], ans: 3, exp: '四书是《大学》《中庸》《论语》《孟子》；《诗经》属于“五经”。' },
      { cat: '常识判断', q: '下列成语与人物对应错误的是：', opts: ['卧薪尝胆——勾践', '破釜沉舟——项羽', '纸上谈兵——赵括', '三顾茅庐——曹操'], ans: 3, exp: '三顾茅庐说的是刘备三次拜访诸葛亮。' },
      { cat: '常识判断', q: '“三省六部制”中的“三省”不包括：', opts: ['中书省', '门下省', '尚书省', '御史台'], ans: 3, exp: '三省为中书省（起草）、门下省（审议）、尚书省（执行）；御史台是监察机构。' },
      { cat: '常识判断', q: '我国第一部纪传体通史是：', opts: ['《史记》', '《汉书》', '《资治通鉴》', '《春秋》'], ans: 0, exp: '《史记》为西汉司马迁所著，是第一部纪传体通史；《汉书》是第一部纪传体断代史；《资治通鉴》是编年体通史。' },
      { cat: '常识判断', q: '下列诗句描写的季节与其他三项不同的是：', opts: ['接天莲叶无穷碧', '小荷才露尖尖角', '停车坐爱枫林晚', '绿树阴浓夏日长'], ans: 2, exp: '“停车坐爱枫林晚”写的是秋天，其余三句都写夏天。' },
      { cat: '常识判断', q: '我国陆地面积最大的省级行政区是：', opts: ['西藏自治区', '新疆维吾尔自治区', '内蒙古自治区', '青海省'], ans: 1, exp: '新疆面积约 166 万平方千米，居全国第一。' },
      { cat: '常识判断', q: '“光年”是哪一类物理量的单位？', opts: ['时间', '长度（距离）', '速度', '亮度'], ans: 1, exp: '光年是光在真空中一年所走的距离，是长度单位。' },
      { cat: '常识判断', q: '下列能源中属于可再生能源的是：', opts: ['煤炭', '天然气', '太阳能', '石油'], ans: 2, exp: '太阳能、风能、水能、生物质能等属于可再生能源；化石能源不可再生。' },
      { cat: '常识判断', q: '在北半球，一年中白昼最长的节气是：', opts: ['夏至', '立夏', '小暑', '芒种'], ans: 0, exp: '夏至时太阳直射北回归线，北半球白昼最长。' },
      { cat: '常识判断', q: '把筷子斜插入水中，看起来像是“折断”了，这是由于：', opts: ['光的直线传播', '光的折射', '光的反射', '光的色散'], ans: 1, exp: '光从水进入空气时发生折射。小孔成像、影子是直线传播；平面镜成像是反射。' },
      { cat: '常识判断', q: '一般物价水平在一段时间内持续上涨的经济现象称为：', opts: ['通货紧缩', '通货膨胀', '流动性陷阱', '边际效应'], ans: 1, exp: '通货膨胀指货币供给过多导致物价总水平持续上涨、货币购买力下降。' },
      { cat: '常识判断', q: '人体中面积最大的器官是：', opts: ['肝脏', '皮肤', '肺', '大脑'], ans: 1, exp: '皮肤是人体面积最大的器官；肝脏是最大的实质性内脏器官。' },

      // ------------------------------------------------------------ 言语理解与表达
      { cat: '言语理解', q: '依次填入横线处最恰当的一项：面对困难，他没有______，而是______地寻找解决办法。', opts: ['退缩　积极', '退让　消极', '畏惧　被动', '逃避　敷衍'], ans: 0, exp: '“而是”表转折，后空应为正面词“积极”，排除 B、C、D；“退缩”与之对应。' },
      { cat: '言语理解', q: '下列句子中没有语病的一项是：', opts: ['通过这次学习，使我们提高了认识。', '能否坚持锻炼，是身体健康的保证。', '我们要认真改正并检查自己的错误。', '他的发言赢得了大家的一致好评。'], ans: 3, exp: 'A 滥用介词导致缺主语；B “能否”两面对“保证”一面；C 语序不当，应先检查后改正。' },
      { cat: '言语理解', q: '下列词语中没有错别字的一项是：', opts: ['再接再励', '迫不急待', '世外桃源', '一愁莫展'], ans: 2, exp: '正确写法：再接再厉、迫不及待、一筹莫展。' },
      { cat: '言语理解', q: '下列句子中，成语“首当其冲”使用恰当的一项是：', opts: ['抗洪救灾中，党员干部首当其冲，冲在最前面。', '地震发生时，靠近震中的村庄首当其冲，损失最为严重。', '这次评比，我们班首当其冲拿了第一。', '会议上他首当其冲地发言，提出了很多建议。'], ans: 1, exp: '“首当其冲”比喻最先受到攻击或遭遇灾难，不是“冲在最前面”或“第一个”的意思。' },
      { cat: '言语理解', q: '下列句子中成语使用恰当的一项是：', opts: ['这部小说情节曲折，人物形象栩栩如生。', '他做事首鼠两端，深受领导信任。', '这次比赛他发挥得差强人意，轻松夺冠。', '他写文章文不加点，经常忘记加标点符号。'], ans: 0, exp: '“首鼠两端”指犹豫不决，与“深受信任”矛盾；“差强人意”指大体还能使人满意；“文不加点”形容文思敏捷、不用涂改。' },
      { cat: '言语理解', q: '依次填入横线处最恰当的一项：①报名将于 10 月 31 日______。②______目前，已有 300 人报名。', opts: ['截止　截至', '截至　截止', '截止　截止', '截至　截至'], ans: 0, exp: '“截止”指到一定期限停止，后面一般不接时间；“截至”指截止到某个时间，后面要接时间。' },
      { cat: '言语理解', q: '依次填入横线处最恰当的一项：______遇到多大的困难，我们______要按时完成任务。', opts: ['无论　都', '即使　也', '因为　所以', '虽然　但是'], ans: 0, exp: '“多大”表示任指，需要与“无论 / 不管”搭配，后面用“都”。' },
      { cat: '言语理解', q: '填入横线处最恰当的一项：科技创新不可能______，需要长期的投入和积累。', opts: ['一蹴而就', '循序渐进', '按部就班', '水到渠成'], ans: 0, exp: '“一蹴而就”指一下子就成功，与“需要长期积累”形成对照。' },
      { cat: '言语理解', q: '“垃圾分类看似小事，实则关系资源循环利用和生态环境保护。只有每个人从自身做起，养成分类投放的习惯，再配合分类收运、分类处理的完整体系，垃圾分类才能真正见效。”这段文字意在强调：', opts: ['垃圾分类关系到生态环境保护', '垃圾分类需要个人习惯与完整处理体系共同发力', '目前分类收运体系还不完善', '个人习惯比处理体系更重要'], ans: 1, exp: '“只有……再配合……才能……”是条件关系，重点在后半句：个人与体系缺一不可。A 是背景，C、D 无中生有。' },
      { cat: '言语理解', q: '“数字经济蓬勃发展的同时，也带来了数据安全、算法歧视等新问题。发展与规范如同车之两轮、鸟之两翼，只有在规范中发展、在发展中规范，数字经济才能行稳致远。”这段文字主要说明：', opts: ['数字经济带来了很多新问题', '数字经济应坚持发展与规范并重', '算法歧视问题亟待治理', '规范比发展更为重要'], ans: 1, exp: '比喻“车之两轮、鸟之两翼”和条件句都指向发展与规范并重。' },
      { cat: '言语理解', q: '将以下句子排列成语意连贯的一段，顺序最恰当的是：①因此，读书要讲究方法　②书籍是人类进步的阶梯　③但书海无涯，人的精力有限　④否则只会事倍功半', opts: ['②③①④', '②①③④', '③②①④', '①②③④'], ans: 0, exp: '②总起；③“但”转折出矛盾；①“因此”得出结论；④“否则”补充说明。' },
      { cat: '言语理解', q: '下列各句中，标点符号使用正确的一项是：', opts: ['他问我：“你明天去不去？”', '我不知道他明天去不去？', '这里出产苹果、梨、桃、等水果。', '“我们走吧，”他说：“天快黑了。”'], ans: 0, exp: 'B 是陈述句，应用句号；C “等”前不用顿号；D 插在中间的“他说”后应用逗号。' },

      // ------------------------------------------------------------ 数量关系
      { cat: '数量关系', q: '找规律：1，3，7，15，31，（　）', opts: ['47', '55', '63', '62'], ans: 2, exp: '后项 = 前项 × 2 + 1，31 × 2 + 1 = 63。' },
      { cat: '数量关系', q: '找规律：2，6，12，20，30，（　）', opts: ['40', '42', '44', '36'], ans: 1, exp: '各项为 n(n+1)：1×2，2×3，3×4，4×5，5×6，下一项 6×7 = 42。' },
      { cat: '数量关系', q: '找规律：1，1，2，3，5，8，（　）', opts: ['11', '12', '13', '15'], ans: 2, exp: '从第三项起，每项等于前两项之和（斐波那契数列），5 + 8 = 13。' },
      { cat: '数量关系', q: '一项工程，甲单独做需 12 天完成，乙单独做需 6 天完成。两人合作需要几天？', opts: ['3 天', '4 天', '5 天', '6 天'], ans: 1, exp: '设总量为 12，甲效率 1、乙效率 2，合作效率 3，12 ÷ 3 = 4 天。' },
      { cat: '数量关系', q: '甲、乙两地相距 300 千米，两车同时从两地相向而行，速度分别为 60 千米/时和 40 千米/时，几小时后相遇？', opts: ['2 小时', '2.5 小时', '3 小时', '5 小时'], ans: 2, exp: '相遇时间 = 路程 ÷ 速度和 = 300 ÷ 100 = 3 小时。' },
      { cat: '数量关系', q: '某商品先提价 20%，再降价 20%，现价与原价相比：', opts: ['不变', '降低 4%', '提高 4%', '降低 2%'], ans: 1, exp: '1.2 × 0.8 = 0.96，比原价低 4%。' },
      { cat: '数量关系', q: '100 克浓度为 10% 的盐水，加入多少克水后浓度变为 5%？', opts: ['50 克', '100 克', '150 克', '200 克'], ans: 1, exp: '盐 10 克不变，浓度 5% 时溶液应为 200 克，需加水 100 克。' },
      { cat: '数量关系', q: '5 人排成一排，其中甲必须站在两端之一，共有多少种排法？', opts: ['24', '48', '96', '120'], ans: 1, exp: '甲有 2 种位置，其余 4 人全排列 4! = 24，共 2 × 24 = 48 种。' },
      { cat: '数量关系', q: '笼中鸡兔共 35 只，共有 94 只脚，兔有多少只？', opts: ['12', '23', '10', '14'], ans: 0, exp: '假设全是鸡，有 70 只脚，少 24 只；每只兔比鸡多 2 只脚，兔 = 24 ÷ 2 = 12 只。' },
      { cat: '数量关系', q: '父亲今年 40 岁，儿子 10 岁，几年后父亲的年龄是儿子的 2 倍？', opts: ['10 年', '15 年', '20 年', '25 年'], ans: 2, exp: '年龄差 30 岁不变，父为子 2 倍时子为 30 岁，30 − 10 = 20 年。' },
      { cat: '数量关系', q: '某商品成本 80 元，按标价打八折出售后仍可获利 20%，标价是多少元？', opts: ['100', '110', '120', '125'], ans: 2, exp: '售价 = 80 × 1.2 = 96 元，标价 = 96 ÷ 0.8 = 120 元。' },
      { cat: '数量关系', q: '在一条长 100 米的道路一侧每隔 5 米种一棵树，两端都种，共需多少棵？', opts: ['19', '20', '21', '22'], ans: 2, exp: '单边两端都种：棵数 = 全长 ÷ 间隔 + 1 = 20 + 1 = 21。' },
      { cat: '数量关系', q: '同时掷两枚均匀骰子，点数之和为 7 的概率是：', opts: ['1/6', '1/12', '1/9', '5/36'], ans: 0, exp: '共 36 种等可能结果，和为 7 的有 (1,6)(2,5)(3,4)(4,3)(5,2)(6,1) 共 6 种，6/36 = 1/6。' },
      { cat: '数量关系', q: '某班 50 人，喜欢数学的 30 人，喜欢语文的 25 人，两科都喜欢的 10 人，两科都不喜欢的有多少人？', opts: ['5', '10', '15', '0'], ans: 0, exp: '至少喜欢一科：30 + 25 − 10 = 45 人，都不喜欢：50 − 45 = 5 人。' },

      // ------------------------------------------------------------ 判断推理
      { cat: '判断推理', q: '医生 ∶ 医院，与之逻辑关系最为相似的一项是：', opts: ['教师 ∶ 学校', '学生 ∶ 作业', '农民 ∶ 粮食', '厨师 ∶ 菜肴'], ans: 0, exp: '职业与其工作场所的对应关系。C、D 是职业与产出。' },
      { cat: '判断推理', q: '刀 ∶ 切，与之逻辑关系最为相似的一项是：', opts: ['笔 ∶ 写', '书 ∶ 知识', '锅 ∶ 厨房', '鞋 ∶ 脚'], ans: 0, exp: '工具与其功能的对应关系。' },
      { cat: '判断推理', q: '春 ∶ 夏，与之逻辑关系最为相似的一项是：', opts: ['早晨 ∶ 中午', '东 ∶ 西', '大 ∶ 小', '一月 ∶ 十二月'], ans: 0, exp: '时间上相邻的先后顺序。B、C 是反义，D 不相邻。' },
      { cat: '判断推理', q: '已知：所有的 A 都是 B，有些 B 是 C。由此一定可以推出：', opts: ['有些 A 是 C', '有些 C 是 B', '所有的 C 都是 A', '有些 A 不是 C'], ans: 1, exp: '“有些 B 是 C”可以换位为“有些 C 是 B”。A、D 都无法确定。' },
      { cat: '判断推理', q: '如果下雨，地面就会湿。现在地面没有湿，由此可以推出：', opts: ['下雨了', '没有下雨', '无法确定是否下雨', '有人在地面洒了水'], ans: 1, exp: '充分条件假言推理：否定后件可以否定前件（否后必否前）。' },
      { cat: '判断推理', q: '如果下雨，地面就会湿。现在地面湿了，由此可以推出：', opts: ['一定下雨了', '一定没下雨', '无法确定是否下雨', '一定有人洒水'], ans: 2, exp: '肯定后件不能推出前件，地面湿也可能是洒水等原因。' },
      { cat: '判断推理', q: '甲、乙、丙三人中只有一人做了某件好事，且三人中只有一人说了真话。甲：“是乙做的。”乙：“不是我做的。”丙：“不是我做的。”做好事的是：', opts: ['甲', '乙', '丙', '无法确定'], ans: 2, exp: '甲和乙的话矛盾，必有一真，所以丙说的是假话，即“是丙做的”。验证：甲假、乙真、丙假，恰好一人说真话。' },
      { cat: '判断推理', q: '甲比乙高，丙比甲高，丁比乙矮。四人中最高的是：', opts: ['甲', '乙', '丙', '丁'], ans: 2, exp: '丙 > 甲 > 乙 > 丁。' },
      { cat: '判断推理', q: '机会成本是指为了得到某种东西而放弃的其他选择中价值最大的那一个。下列属于机会成本的是：', opts: ['小王花 100 元买了一本书', '小李辞职读研，放弃了每年 10 万元的工资收入', '公司花 50 万元购买新设备', '小张的存款获得了利息'], ans: 1, exp: '关键是“因选择而放弃的收益”。A、C 是直接支出，D 是收益。' },
      { cat: '判断推理', q: '从众效应是指个体受群体影响，怀疑、改变自己的观点、判断或行为，以和他人保持一致。下列属于从众效应的是：', opts: ['看到很多人排队买某款奶茶，小刘也跟着去排队', '小王在讨论中坚持自己的观点', '学校要求学生统一穿校服', '小李按照说明书组装家具'], ans: 0, exp: 'A 是受群体影响而改变行为；C 是规章要求，不是群体压力导致的自发改变。' },
      { cat: '判断推理', q: '研究发现，经常喝咖啡的人患某种疾病的比例较低，研究者据此认为喝咖啡可以预防该病。以下哪项如果为真，最能削弱上述结论？', opts: ['咖啡中含有多种抗氧化物质', '经常喝咖啡的人普遍更年轻，而该病多发于老年人', '有些人不喝咖啡也没有患该病', '近年来咖啡价格逐年上涨'], ans: 1, exp: 'B 指出另有原因（年龄）导致发病率低，属于“另有他因”削弱。A 是加强，C 是个例，D 无关。' },
      { cat: '判断推理', q: '某单位规定：只有通过考核的人才能评优。小张评上了优秀。由此可以推出：', opts: ['小张通过了考核', '小张没有通过考核', '通过考核的人都能评优', '无法确定小张是否通过考核'], ans: 0, exp: '“只有 P 才 Q”：Q 推出 P。评上优秀（Q）可推出通过考核（P）。' },

      // ------------------------------------------------------------ 资料分析（数据为虚构）
      { cat: '资料分析', q: '【材料】某市 2025 年地区生产总值 5000 亿元，同比增长 8%；其中第三产业增加值 2800 亿元，同比增长 10%。（数据虚构）\n\n问：2024 年该市地区生产总值约为多少亿元？', opts: ['4600', '4630', '4700', '4800'], ans: 1, exp: '基期量 = 现期量 ÷ (1 + 增长率) = 5000 ÷ 1.08 ≈ 4630 亿元。' },
      { cat: '资料分析', q: '【材料】某市 2025 年地区生产总值 5000 亿元，同比增长 8%；其中第三产业增加值 2800 亿元，同比增长 10%。（数据虚构）\n\n问：2025 年第三产业增加值占地区生产总值的比重为：', opts: ['52%', '54%', '56%', '58%'], ans: 2, exp: '2800 ÷ 5000 = 56%。' },
      { cat: '资料分析', q: '【材料】某市 2025 年地区生产总值 5000 亿元，同比增长 8%；其中第三产业增加值 2800 亿元，同比增长 10%。（数据虚构）\n\n问：2025 年第三产业占比与上年相比：', opts: ['上升约 1 个百分点', '下降约 1 个百分点', '上升约 3 个百分点', '基本不变'], ans: 0, exp: '部分增速 10% 大于整体增速 8%，比重上升。变化量 = 56% × (10% − 8%) ÷ (1 + 10%) ≈ 1.0 个百分点。' },
      { cat: '资料分析', q: '【材料】某市 2025 年地区生产总值 5000 亿元，同比增长 8%；其中第三产业增加值 2800 亿元，同比增长 10%。（数据虚构）\n\n问：2025 年第三产业增加值比上年增加约多少亿元？', opts: ['245', '255', '280', '300'], ans: 1, exp: '增长量 = 现期量 ÷ (1 + r) × r = 2800 ÷ 1.1 × 0.1 ≈ 254.5 亿元，约 255 亿元。' },
      { cat: '资料分析', q: '【材料】某公司 2025 年第一季度销售额 120 万元，第二季度 150 万元。（数据虚构）\n\n问：第二季度销售额环比增长率为：', opts: ['20%', '25%', '30%', '15%'], ans: 1, exp: '(150 − 120) ÷ 120 = 25%。注意基期是上一季度。' },
      { cat: '资料分析', q: '【材料】某公司 2025 年第一季度销售额 120 万元，第二季度 150 万元。（数据虚构）\n\n问：若第三季度环比增长率与第二季度相同，第三季度销售额为多少万元？', opts: ['180', '187.5', '190', '200'], ans: 1, exp: '150 × (1 + 25%) = 187.5 万元。' },
    ]
    // </kg-bank>

    const CSS = `
.kg-q{padding:8px 10px 4px;line-height:1.7;white-space:pre-wrap;word-break:break-word}
.kg-meta{display:flex;gap:6px;align-items:center;font-size:11px;color:var(--dsw-alias-label-secondary);padding:6px 10px 0}
.kg-tag{border:.5px solid var(--dsw-alias-border-l2);border-radius:8px;padding:0 6px}
.kg-opts{display:flex;flex-direction:column;gap:4px;padding:4px 8px}
.kg-opt{display:flex;gap:6px;text-align:left;border:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border-radius:8px;padding:6px 8px;font:inherit;font-size:13px;cursor:pointer;line-height:1.5}
.kg-opt:hover{background:var(--dsw-alias-bg-layer-2)}
.kg-opt b{flex:none;width:16px;color:var(--dsw-alias-label-secondary)}
.kg-opt.kg-pick{border-color:var(--dsw-alias-brand-primary)}
.kg-opt.kg-right{border-color:#2e9e4f;background:color-mix(in srgb,#2e9e4f 14%,transparent)}
.kg-opt.kg-wrong{border-color:#e5534b;background:color-mix(in srgb,#e5534b 14%,transparent)}
.kg-opt:disabled{cursor:default}
.kg-exp{margin:6px 8px;padding:8px 10px;border-radius:8px;background:var(--dsw-alias-bg-layer-2);font-size:12px;line-height:1.7;white-space:pre-wrap}
.kg-cats{display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:6px 8px}
.kg-cat{border:.5px solid var(--dsw-alias-border-l2);border-radius:8px;padding:8px;cursor:pointer;background:var(--dsw-alias-bg-layer-1);text-align:left;font:inherit;color:inherit}
.kg-cat:hover{background:var(--dsw-alias-bg-layer-2)}
.kg-cat b{display:block;font-weight:500;margin-bottom:2px}
.kg-bar{height:4px;border-radius:2px;background:var(--dsw-alias-bg-layer-2);overflow:hidden;margin-top:4px}
.kg-bar i{display:block;height:100%;background:var(--dsw-alias-brand-primary)}
.kg-stat{display:flex;justify-content:space-around;padding:8px;text-align:center;font-size:11px;color:var(--dsw-alias-label-secondary)}
.kg-stat b{display:block;font-size:16px;color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums}
`
    const Icon = () => YkIcons.svg(['M4 5h7a3 3 0 0 1 1 1v13a2 2 0 0 0-2-2H4z', 'M20 5h-7a3 3 0 0 0-1 1v13a2 2 0 0 1 2-2h6z'])
    const LETTERS = 'ABCDEFGH'
    const CATS = ['常识判断', '言语理解', '数量关系', '判断推理', '资料分析']
    const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` }
    function hashId(s) { let x = 5381; for (let i = 0; i < s.length; i++) x = ((x << 5) + x + s.charCodeAt(i)) | 0; return (x >>> 0).toString(36) }
    const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a }

    /** Answer to a sorted array of option indexes; accepts 2, 'C', 'AC', [0, 2], ['A','C']. */
    function normAns(a, n) {
      const list = Array.isArray(a) ? a : typeof a === 'number' ? [a] : String(a || '').toUpperCase().replace(/[^A-H0-9]/g, '').split('')
      const out = [...new Set(list.map((x) => (typeof x === 'number' ? x : /^\d$/.test(x) ? Number(x) - 1 : LETTERS.indexOf(String(x).toUpperCase()))).filter((x) => x >= 0 && x < n))].sort()
      return out
    }
    function normalize(raw, bank) {
      const q = String(raw.q ?? raw.question ?? raw.title ?? raw.stem ?? '').trim()
      let opts = raw.opts ?? raw.options ?? raw.choices
      if (opts && !Array.isArray(opts) && typeof opts === 'object') opts = Object.keys(opts).sort().map((k) => opts[k])
      opts = (Array.isArray(opts) ? opts : []).map((x) => String(typeof x === 'object' ? x.text ?? x.content ?? '' : x).replace(/^\s*[A-H][.、．:：)）]\s*/, '').trim()).filter(Boolean)
      const ans = normAns(raw.ans ?? raw.answer ?? raw.key, opts.length)
      if (!q || opts.length < 2 || !ans.length) return null
      return { id: hashId(bank + '|' + q + '|' + opts.join('|')), bank, cat: String(raw.cat ?? raw.category ?? raw.type ?? '').trim() || bank, q, opts, ans, exp: String(raw.exp ?? raw.analysis ?? raw.explain ?? raw.explanation ?? '').trim() }
    }
    /**
     * Plain-text format:
     *   1. 题干（可多行）
     *   A. 选项   B. 选项 …（每行一个，或同一行用空格隔开）
     *   答案：B      解析：…（可多行）     可选：【分类】行
     */
    function parseText(src, bank) {
      const lines = String(src).replace(/\r/g, '').split('\n')
      const out = []
      let cur = null
      let cat = ''
      let mode = 'q'
      const flush = () => { if (cur) { const x = normalize({ ...cur, cat: cur.cat || cat }, bank); if (x) out.push(x) } cur = null; mode = 'q' }
      for (const raw of lines) {
        const line = raw.trim()
        if (!line) { if (mode === 'exp') mode = 'gap'; continue }
        const catM = /^【([^】]{1,12})】$/.exec(line) || /^#+\s*(.{1,12})$/.exec(line)
        if (catM) { flush(); cat = catM[1].trim(); continue }
        const ansM = /^(?:【?答案】?|正确答案|参考答案)\s*[:：]?\s*([A-Ha-h0-9 ,，、]+)\s*$/.exec(line)
        if (ansM && cur) { cur.ans = ansM[1]; mode = 'ans'; continue }
        const expM = /^(?:【?解析】?|答案解析|解析)\s*[:：]?\s*(.*)$/.exec(line)
        if (expM && cur) { cur.exp = expM[1]; mode = 'exp'; continue }
        if (mode === 'exp') { cur.exp += '\n' + line; continue }
        const optParts = line.split(/\s+(?=[A-H][.、．:：)）])/)
        if (cur && /^[A-H][.、．:：)）]/.test(line)) { for (const p of optParts) if (/^[A-H][.、．:：)）]/.test(p)) cur.opts.push(p); mode = 'opts'; continue }
        const numM = /^(?:第\s*)?\d{1,4}\s*(?:题)?\s*[.、．:：)）]\s*(.*)$/.exec(line)
        if (numM || !cur || mode === 'ans' || mode === 'gap') { flush(); cur = { q: numM ? numM[1] : line, opts: [] }; continue }
        if (mode === 'q') cur.q += '\n' + line
      }
      flush()
      return out
    }
    function parseBank(src, bank) {
      const t = String(src || '').trim()
      if (/^[[{]/.test(t)) {
        let j
        try { j = JSON.parse(t) } catch (e) { throw new Error('JSON 格式错误：' + e.message) }
        const list = Array.isArray(j) ? j : j.questions || j.data || j.list || []
        return list.map((x) => normalize(x, bank)).filter(Boolean)
      }
      return parseText(t, bank)
    }
    // Rotate built-in options so the right letter is spread evenly; skipped when the explanation names letters.
    const BUILTIN = BUILTIN_BANK.map((x, n) => {
      const q = normalize(x, '内置示例')
      if (!q || q.ans.length !== 1 || /(^|[^A-Za-z])[A-H](?=[ 、，是项])/.test(q.exp)) return q
      const len = q.opts.length
      const shift = ((n * 7 + 3) % len - q.ans[0] + len) % len
      return { ...q, opts: q.opts.map((_, i) => q.opts[(i - shift + len) % len]), ans: [(q.ans[0] + shift) % len] }
    }).filter(Boolean)

    return {
      inject: ['slots'],
      apply(ctx) {
        const dock = createDock(ctx, {
          id: 'kaogong', key: 'K', label: '考公刷题', order: -65, icon: Icon, storageKey: 'dsh-kaogong:v1', height: 360,
          defaults: { view: 'home', banks: [], prog: {}, days: {}, goal: 20, session: null, recite: false, shuffleOpts: false, useBuiltin: true },
          onReset: () => store.set({ view: 'home', session: null }),
        })
        const { store, useStore, bus } = dock

        const allQuestions = (s) => [...(s.useBuiltin ? BUILTIN : []), ...s.banks.flatMap((b) => b.questions)]
        const byId = (s) => { const m = new Map(); for (const q of allQuestions(s)) m.set(q.id, q); return m }
        const dayOf = (s, d = today()) => s.days[d] || { done: 0, right: 0 }
        function streak(s) {
          let n = 0
          const d = new Date()
          if (!(s.days[today()]?.done >= s.goal)) d.setDate(d.getDate() - 1) // today not finished yet doesn't break the streak
          for (;;) {
            const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
            if (!(s.days[k]?.done >= s.goal)) return n
            n++; d.setDate(d.getDate() - 1)
          }
        }
        const wrongList = (s) => Object.entries(s.prog).filter(([, p]) => p.wrongBook).map(([id]) => id)
        const favList = (s) => Object.entries(s.prog).filter(([, p]) => p.fav).map(([id]) => id)

        function start(kind, arg) {
          const s = store.get()
          const map = byId(s)
          let ids
          if (kind === 'cat') {
            const pool = allQuestions(s).filter((q) => arg === '全部' || q.cat === arg)
            const fresh = pool.filter((q) => !s.prog[q.id]?.seen)
            ids = shuffle(fresh.map((q) => q.id)).concat(shuffle(pool.filter((q) => s.prog[q.id]?.seen).map((q) => q.id)))
          } else if (kind === 'wrong') ids = shuffle(wrongList(s).filter((id) => map.has(id)))
          else if (kind === 'fav') ids = favList(s).filter((id) => map.has(id))
          else if (kind === 'daily') {
            const pool = allQuestions(s)
            const wrong = shuffle(wrongList(s).filter((id) => map.has(id))).slice(0, Math.ceil(s.goal / 4))
            const fresh = shuffle(pool.filter((q) => !s.prog[q.id]?.seen && !wrong.includes(q.id)).map((q) => q.id))
            const old = shuffle(pool.filter((q) => s.prog[q.id]?.seen && !wrong.includes(q.id)).map((q) => q.id))
            ids = shuffle([...wrong, ...fresh, ...old].slice(0, s.goal))
          }
          if (!ids || !ids.length) return false
          store.set({ view: 'quiz', session: { kind, arg, ids: ids.slice(0, 200), i: 0, picks: {}, done: {}, right: 0, wrong: 0 } })
          return true
        }

        function submit(q, pick) {
          const s = store.get()
          const sess = s.session
          if (!sess || sess.done[q.id] !== undefined) return
          const ok = pick.length === q.ans.length && pick.every((x, i) => x === q.ans[i])
          const p = s.prog[q.id] || {}
          const next = { ...p, seen: (p.seen || 0) + 1, right: (p.right || 0) + (ok ? 1 : 0), wrong: (p.wrong || 0) + (ok ? 0 : 1), last: Date.now() }
          if (!ok) { next.wrongBook = true; next.streak = 0 } else {
            next.streak = (p.streak || 0) + 1
            // a wrong-book question answered right twice in a row graduates
            if (p.wrongBook && next.streak >= 2) next.wrongBook = false
          }
          const d = dayOf(s)
          store.set({
            prog: { ...s.prog, [q.id]: next },
            days: { ...s.days, [today()]: { done: d.done + 1, right: d.right + (ok ? 1 : 0) } },
            session: { ...sess, picks: { ...sess.picks, [q.id]: pick }, done: { ...sess.done, [q.id]: ok }, right: sess.right + (ok ? 1 : 0), wrong: sess.wrong + (ok ? 0 : 1) },
          })
        }

        function Quiz() {
          const s = useStore()
          const ref = useRef(null)
          const sess = s.session
          const map = byId(s)
          const [sel, setSel] = useState([])
          const id = sess?.ids[sess.i]
          const q = id ? map.get(id) : null
          useEffect(() => { setSel([]); if (ref.current) ref.current.scrollTop = 0 }, [id])
          const order = React.useMemo(() => (q ? (s.shuffleOpts ? shuffle(q.opts.map((_, i) => i)) : q.opts.map((_, i) => i)) : []), [id, s.shuffleOpts])
          const answered = q && (sess.done[q.id] !== undefined || s.recite)
          const multi = q && q.ans.length > 1
          const next = () => store.set((st) => ({ session: { ...st.session, i: st.session.i + 1 } }))
          const prev = () => store.set((st) => ({ session: { ...st.session, i: Math.max(0, st.session.i - 1) } }))
          const choose = (k) => {
            if (!q || answered) return
            if (multi) setSel((cur) => (cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k].sort()))
            else submit(q, [k])
          }
          useEffect(() => {
            const onKey = (e) => {
              if (bus.open !== 'kaogong' || e.metaKey || e.ctrlKey || e.altKey) return
              const card = ref.current?.closest?.('.yk-card')
              if (!card || !(card.contains(document.activeElement) || card.matches(':hover'))) return
              if (/^(INPUT|TEXTAREA|SELECT)$/.test(String(document.activeElement?.tagName || ''))) return
              const k = e.key.toUpperCase()
              const n = /^[1-8]$/.test(k) ? Number(k) - 1 : LETTERS.indexOf(k)
              if (k.length === 1 && n >= 0 && n < order.length) { choose(order[n]); e.preventDefault() }
              else if (e.key === 'Enter' || e.key === 'ArrowRight' || e.key === ' ') { if (answered) next(); else if (multi && sel.length) submit(q, sel); e.preventDefault() }
              else if (e.key === 'ArrowLeft') { prev(); e.preventDefault() }
            }
            window.addEventListener('keydown', onKey, true)
            return () => window.removeEventListener('keydown', onKey, true)
          })
          if (!sess) return h('div', { className: 'yk-muted yk-pad' }, '没有进行中的练习。')
          if (!q) {
            const total = sess.right + sess.wrong
            return h('div', { className: 'yk-scroll', style: { textAlign: 'center', padding: 16 } },
              h('div', { style: { fontSize: 28, margin: '8px 0' } }, total && sess.right / total >= 0.8 ? '🎉' : '💪'),
              h('div', null, `本轮完成 ${total} 题，答对 ${sess.right} 题`),
              total > 0 && h('div', { className: 'yk-muted', style: { margin: '4px 0 12px' } }, `正确率 ${Math.round((sess.right / total) * 100)}%`),
              h('div', { style: { display: 'flex', gap: 6, justifyContent: 'center' } },
                sess.wrong > 0 && h('button', { className: 'yk-btn', onClick: () => start('wrong') }, '练错题'),
                h('button', { className: 'yk-btn yk-primary', onClick: () => start(sess.kind, sess.arg) || store.set({ view: 'home' }) }, '再来一轮'),
                h('button', { className: 'yk-btn', onClick: () => store.set({ view: 'home', session: null }) }, '返回')))
          }
          const p = s.prog[q.id] || {}
          const picked = sess.picks[q.id] || []
          const ok = sess.done[q.id]
          return h(React.Fragment, null,
            h('div', { className: 'yk-scroll', ref, tabIndex: 0, style: { outline: 'none', padding: 0 } },
              h('div', { className: 'kg-meta' },
                h('span', null, `${sess.i + 1} / ${sess.ids.length}`),
                h('span', { className: 'kg-tag' }, q.cat), multi && h('span', { className: 'kg-tag' }, '多选'),
                p.seen ? h('span', null, `做过 ${p.seen} 次 · 错 ${p.wrong || 0}`) : h('span', null, '新题'),
                h('span', { style: { flex: 1 } }),
                h('button', { className: 'yk-link', title: '收藏', onClick: () => store.set((st) => ({ prog: { ...st.prog, [q.id]: { ...(st.prog[q.id] || {}), fav: !p.fav } } })) }, p.fav ? '★ 已收藏' : '☆ 收藏')),
              h('div', { className: 'kg-q' }, q.q),
              h('div', { className: 'kg-opts' }, order.map((k, n) => {
                const isAns = q.ans.includes(k)
                const cls = answered ? (isAns ? ' kg-right' : picked.includes(k) ? ' kg-wrong' : '') : sel.includes(k) ? ' kg-pick' : ''
                return h('button', { key: k, className: 'kg-opt' + cls, disabled: answered, onClick: () => choose(k) }, h('b', null, LETTERS[n]), h('span', null, q.opts[k]))
              })),
              multi && !answered && h('div', { style: { padding: '4px 8px' } }, h('button', { className: 'yk-btn yk-primary', disabled: !sel.length, onClick: () => submit(q, sel) }, '提交')),
              answered && h('div', { className: 'kg-exp' },
                h('div', { style: { marginBottom: 4, fontWeight: 500, color: s.recite && ok === undefined ? undefined : ok ? '#2e9e4f' : '#e5534b' } },
                  (s.recite && ok === undefined ? '' : ok ? '✓ 回答正确　' : '✗ 回答错误　') + '正确答案：' + q.ans.map((k) => LETTERS[order.indexOf(k)]).join('')),
                q.exp || '（暂无解析）'),
              p.wrongBook && answered && h('div', { className: 'yk-muted', style: { padding: '0 10px 8px' } }, '已在错题本，连续答对 2 次后自动移出。 ',
                h('button', { className: 'yk-link', onClick: () => store.set((st) => ({ prog: { ...st.prog, [q.id]: { ...st.prog[q.id], wrongBook: false } } })) }, '现在移出'))),
            h('div', { className: 'yk-foot' },
              h('button', { className: 'yk-btn', disabled: sess.i === 0, onClick: prev }, '上一题'),
              h('span', { className: 'yk-muted' }, `对 ${sess.right} · 错 ${sess.wrong}`),
              h('button', { className: 'yk-btn' + (answered ? ' yk-primary' : ''), onClick: next }, answered ? '下一题' : '跳过')))
        }

        function Home() {
          const s = useStore()
          const all = allQuestions(s)
          const d = dayOf(s)
          const wrong = wrongList(s).length
          const fav = favList(s).length
          const cats = [...new Set([...CATS.filter((c) => all.some((q) => q.cat === c)), ...all.map((q) => q.cat)])]
          const [msg, setMsg] = useState('')
          const go = (kind, arg) => { if (!start(kind, arg)) setMsg(kind === 'wrong' ? '错题本是空的 👍' : kind === 'fav' ? '还没有收藏的题' : '没有题目') }
          const totalSeen = all.filter((q) => s.prog[q.id]?.seen).length
          return h('div', { className: 'yk-scroll', style: { padding: 0 } },
            h('div', { className: 'kg-stat' },
              h('div', null, h('b', null, `${d.done}/${s.goal}`), '今日'),
              h('div', null, h('b', null, d.done ? Math.round((d.right / d.done) * 100) + '%' : '--'), '今日正确率'),
              h('div', null, h('b', null, streak(s)), '连续达标天'),
              h('div', null, h('b', null, `${totalSeen}/${all.length}`), '已做题目')),
            h('div', { style: { padding: '0 8px' } }, h('div', { className: 'kg-bar' }, h('i', { style: { width: Math.min(100, (d.done / s.goal) * 100) + '%' } }))),
            h('div', { style: { display: 'flex', gap: 6, padding: '8px 8px 2px' } },
              h('button', { className: 'yk-btn yk-primary', style: { flex: 1 }, onClick: () => go('daily') }, `今日一练（${s.goal} 题）`),
              h('button', { className: 'yk-btn', onClick: () => go('wrong') }, `错题本 ${wrong}`),
              h('button', { className: 'yk-btn', onClick: () => go('fav') }, `收藏 ${fav}`)),
            msg && h('div', { className: 'yk-muted', style: { padding: '4px 8px' } }, msg),
            s.session && s.session.ids[s.session.i] && h('div', { style: { padding: '4px 8px' } }, h('button', { className: 'yk-link', onClick: () => store.set({ view: 'quiz' }) }, `继续上次练习（第 ${s.session.i + 1}/${s.session.ids.length} 题）→`)),
            h('div', { className: 'yk-sec' }, '分类练习'),
            h('div', { className: 'kg-cats' },
              cats.map((c) => {
                const list = all.filter((q) => q.cat === c)
                const seen = list.filter((q) => s.prog[q.id]?.seen)
                const right = seen.reduce((n, q) => n + (s.prog[q.id].right || 0), 0)
                const times = seen.reduce((n, q) => n + (s.prog[q.id].seen || 0), 0)
                return h('button', { key: c, className: 'kg-cat', onClick: () => go('cat', c) },
                  h('b', null, c), h('span', { className: 'yk-muted' }, `${seen.length}/${list.length} 题${times ? ` · 正确率 ${Math.round((right / times) * 100)}%` : ''}`),
                  h('div', { className: 'kg-bar' }, h('i', { style: { width: (list.length ? (seen.length / list.length) * 100 : 0) + '%' } })))
              }),
              h('button', { className: 'kg-cat', onClick: () => go('cat', '全部') }, h('b', null, '全部混合'), h('span', { className: 'yk-muted' }, `${all.length} 题`))),
            !all.length && h('div', { className: 'yk-muted yk-pad' }, '题库是空的，点右上角 ⚙ 导入题库。'))
        }

        const SAMPLE = `【常识判断】\n1. 我国的首都是？\nA. 上海\nB. 北京\nC. 广州\nD. 深圳\n答案：B\n解析：北京是中华人民共和国首都。\n\n2. 下列属于可再生能源的有（多选）\nA. 风能  B. 煤炭  C. 太阳能  D. 石油\n答案：AC\n解析：风能、太阳能可再生。`
        function Banks() {
          const s = useStore()
          const [name, setName] = useState('')
          const [text, setText] = useState('')
          const [msg, setMsg] = useState('')
          const fileRef = useRef(null)
          const doImport = (src, bankName) => {
            const bank = (bankName || name).trim() || `我的题库 ${s.banks.length + 1}`
            try {
              const qs = parseBank(src, bank)
              if (!qs.length) throw new Error('没有识别出题目，请对照下面的格式检查')
              const existing = s.banks.find((b) => b.name === bank)
              const merged = existing ? [...existing.questions, ...qs.filter((q) => !existing.questions.some((x) => x.id === q.id))] : qs
              const size = JSON.stringify(merged).length
              if (size > 3.5e6) throw new Error('题库太大（超过约 3.5MB），请拆分后分别导入')
              store.set((st) => ({ banks: existing ? st.banks.map((b) => (b.name === bank ? { ...b, questions: merged } : b)) : [...st.banks, { name: bank, questions: qs, at: Date.now() }] }))
              setMsg(`已导入「${bank}」${qs.length} 题${existing ? `（合并后共 ${merged.length} 题）` : ''}，分类：${[...new Set(qs.map((q) => q.cat))].join('、')}`)
              setText('')
            } catch (e) { setMsg('导入失败：' + e.message) }
          }
          const exportWrong = () => {
            const map = byId(s)
            const list = wrongList(s).map((id) => map.get(id)).filter(Boolean)
            const txt = list.map((q, i) => `${i + 1}. ${q.q}\n${q.opts.map((o, k) => `${LETTERS[k]}. ${o}`).join('\n')}\n答案：${q.ans.map((k) => LETTERS[k]).join('')}\n解析：${q.exp || '无'}\n`).join('\n')
            const a = document.createElement('a')
            a.href = URL.createObjectURL(new Blob([txt], { type: 'text/plain;charset=utf-8' })); a.download = `错题本-${today()}.txt`
            document.body.appendChild(a); a.click(); a.remove()
          }
          return h('div', { className: 'yk-scroll' },
            h('div', { className: 'yk-sec' }, '题库'),
            h('label', { className: 'yk-check', style: { display: 'flex', padding: '4px 8px' } }, h('input', { type: 'checkbox', checked: s.useBuiltin, onChange: (e) => store.set({ useBuiltin: e.target.checked }) }), `内置示例题库（${BUILTIN.length} 题，原创样题，仅供体验）`),
            s.banks.map((b) => h('div', { key: b.name, className: 'yk-form', style: { padding: '2px 8px' } },
              h('span', { style: { flex: 1 } }, `${b.name}（${b.questions.length} 题）`),
              h('button', { className: 'yk-ibtn', title: '删除这个题库', 'aria-label': '删除题库', onClick: () => store.set((st) => ({ banks: st.banks.filter((x) => x.name !== b.name) })) }, YkIcons.trash()))),
            h('div', { className: 'yk-sec' }, '导入题库（支持 JSON 或文本）'),
            h('div', { className: 'yk-form' },
              h('input', { className: 'yk-input', placeholder: '题库名（可选，同名会合并）', value: name, onChange: (e) => setName(e.target.value) }),
              h('button', { className: 'yk-btn', onClick: () => fileRef.current?.click() }, '选文件'),
              h('input', { ref: fileRef, type: 'file', accept: '.txt,.json,.md', style: { display: 'none' }, onChange: async (e) => { const f = e.target.files?.[0]; if (f) doImport(await f.text(), name || f.name.replace(/\.\w+$/, '')); e.target.value = '' } })),
            h('div', { style: { padding: '0 6px' } },
              h('textarea', { className: 'yk-textarea', style: { height: 110 }, value: text, placeholder: SAMPLE, onChange: (e) => setText(e.target.value) }),
              h('div', { className: 'yk-form', style: { padding: '4px 0' } },
                h('button', { className: 'yk-btn yk-primary', disabled: !text.trim(), onClick: () => doImport(text) }, '导入粘贴的内容'),
                h('button', { className: 'yk-btn', onClick: () => setText(SAMPLE) }, '填入格式示例'))),
            msg && h('div', { className: 'yk-muted', style: { padding: '0 8px 4px' } }, msg),
            h('div', { className: 'yk-muted', style: { padding: '2px 8px', lineHeight: 1.6 } },
              '文本格式：题号开头，选项用 A. B. …，“答案：B”（多选写 AC），“解析：…”可多行；用【分类名】单独一行给后面的题分类。JSON 格式：[{"q","opts":[…],"ans":"B","exp","cat"}]。'),
            h('div', { className: 'yk-sec' }, '设置'),
            h('div', { className: 'yk-form' },
              h('span', { className: 'yk-muted' }, '每日目标'),
              h('select', { className: 'yk-select', value: s.goal, onChange: (e) => store.set({ goal: Number(e.target.value) }) }, [10, 20, 30, 50, 100].map((n) => h('option', { key: n, value: n }, n + ' 题'))),
              h('label', { className: 'yk-check' }, h('input', { type: 'checkbox', checked: s.recite, onChange: (e) => store.set({ recite: e.target.checked }) }), '背题模式'),
              h('label', { className: 'yk-check' }, h('input', { type: 'checkbox', checked: s.shuffleOpts, onChange: (e) => store.set({ shuffleOpts: e.target.checked }) }), '打乱选项')),
            h('div', { className: 'yk-form' },
              h('button', { className: 'yk-btn', disabled: !wrongList(s).length, onClick: exportWrong }, '导出错题本'),
              h('button', { className: 'yk-btn', onClick: () => { if (window.confirm?.('清空所有做题记录、错题本和收藏？') !== false) store.set({ prog: {}, days: {}, session: null }) } }, '清空做题记录')),
            h('div', { className: 'yk-muted', style: { padding: '4px 8px 8px', lineHeight: 1.6 } }, '答题时可按 A-D / 1-4 选择，回车下一题（鼠标在卡片上时生效）。数据只保存在本机浏览器。'))
        }

        function Body() {
          const s = useStore()
          return h(React.Fragment, null, h('style', null, CSS), s.view === 'quiz' ? h(Quiz) : s.view === 'banks' ? h(Banks) : h(Home))
        }
        dock.mount({
          Body,
          title: (s) => (s.view === 'quiz' && s.session ? `考公 · ${s.session.kind === 'daily' ? '今日一练' : s.session.kind === 'wrong' ? '错题本' : s.session.kind === 'fav' ? '收藏' : s.session.arg}` : s.view === 'banks' ? '考公 · 题库与设置' : '考公刷题'),
          actions: (s) => [
            s.view !== 'home' && h('button', { key: 'b', className: 'yk-ibtn', title: '返回首页', 'aria-label': '返回', onClick: () => store.set({ view: 'home' }) }, YkIcons.back()),
            h('button', { key: 'g', className: 'yk-ibtn' + (s.view === 'banks' ? ' yk-on' : ''), title: '题库与设置', 'aria-label': '题库与设置', onClick: () => store.set({ view: s.view === 'banks' ? 'home' : 'banks' }) }, YkIcons.gear()),
          ],
          mini: (s) => { const d = dayOf(s); return { text: `${d.done}/${s.goal}`, className: d.done >= s.goal ? 'yk-down' : '', tip: `今日已做 ${d.done} 题` } },
        })
      },
    }
  },
})
