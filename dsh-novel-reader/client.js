window.__ModuleLoader__.load({
  id: '@soy-sauce-phil/dsh-novel-reader',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const { useState, useEffect, useRef, useSyncExternalStore, useCallback } = React

    const NS = 'novelReader'
    const STORAGE_KEY = 'dsh-novel-reader:v1'

    const zh = {
      title: '小说',
      shelf: '书架', search: '搜索', sources: '书源', toc: '目录',
      collapse: '收起', expand: '展开',
      prev: '上一章', next: '下一章',
      loading: '加载中…', retry: '重试',
      emptyShelf: '书架是空的，可以导入本地 TXT，或去「搜索」找本书。', importTxt: '导入本地 TXT',
      searchPlaceholder: '书名或作者',
      allSources: '全部书源', go: '搜索', noResult: '没有找到结果。',
      remove: '移除', importPlaceholder: '粘贴书源 JSON，或输入书源订阅链接 (http…)',
      import: '导入', importFile: '从文件导入', restoreBuiltin: '恢复内置书源', imported: '已导入 {n} 个书源',
      noSources: '还没有书源。', unsupportedNote: '支持「阅读 (Legado)」书源的 CSS / JSOUP / JSONPath 规则和 JS（在隔离沙箱里运行，不能访问本机和内网）；需要 WebView、验证码、XPath 的书源用不了。',
      chapterOf: '{i} / {n}', resize: '拖动调整高度', noChapters: '目录为空。', lastChapter: '已是最后一章',
      hide: '隐藏', collapseHint: '收起 / 展开：{k}', hideHint: '隐藏所有侧栏小部件：{k}',
      firstChapter: '已是第一章', fontSmaller: '缩小字号', fontLarger: '放大字号', openBook: '打开',
    }
    const en = {
      title: 'Novel',
      shelf: 'Shelf', search: 'Search', sources: 'Sources', toc: 'Contents',
      collapse: 'Collapse', expand: 'Expand',
      prev: 'Previous', next: 'Next',
      loading: 'Loading…', retry: 'Retry',
      emptyShelf: 'Your shelf is empty. Import a local TXT, or use Search to find a book.', importTxt: 'Import TXT',
      searchPlaceholder: 'Title or author',
      allSources: 'All sources', go: 'Search', noResult: 'No results.',
      remove: 'Remove', importPlaceholder: 'Paste book-source JSON, or a subscription URL (http…)',
      import: 'Import', importFile: 'From file', restoreBuiltin: 'Restore built-in sources', imported: 'Imported {n} sources',
      noSources: 'No book sources yet.', unsupportedNote: 'Supports CSS / JSOUP / JSONPath and JS rules of Legado book sources (JS runs in an isolated sandbox without local-network access); sources needing WebView, captchas or XPath will not work.',
      chapterOf: '{i} / {n}', resize: 'Drag to resize', noChapters: 'No chapters.', lastChapter: 'This is the last chapter',
      hide: 'Hide', collapseHint: 'Collapse / expand: {k}', hideHint: 'Hide all sidebar widgets: {k}',
      firstChapter: 'This is the first chapter', fontSmaller: 'Smaller text', fontLarger: 'Larger text', openBook: 'Open',
    }

    const CSS = `
.nr-card{box-sizing:border-box;width:100%;margin:0 2px 6px;border:.5px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);display:flex;flex-direction:column;overflow:hidden;font-size:13px;position:relative}
.nr-grip{height:6px;cursor:ns-resize;flex:none;display:flex;justify-content:center;align-items:center}
.nr-grip::after{content:"";width:28px;height:3px;border-radius:2px;background:var(--dsw-alias-border-l2);opacity:.0;transition:opacity .15s}
.nr-card:hover .nr-grip::after{opacity:1}
.nr-head{display:flex;align-items:center;gap:2px;padding:0 6px 4px 10px;flex:none;min-width:0}
.nr-title{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500;cursor:pointer}
.nr-ibtn{width:24px;height:24px;flex:none;border:none;background:transparent;border-radius:6px;color:var(--dsw-alias-label-secondary);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;padding:0}
.nr-ibtn:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.nr-ibtn.nr-on{color:var(--dsw-alias-brand-primary)}
.nr-ibtn:disabled{opacity:.4;cursor:default;background:transparent}
.nr-body{flex:none;display:flex;flex-direction:column;border-top:.5px solid var(--dsw-alias-border-l1);min-height:0}
.nr-scroll{flex:1;min-height:0;overflow-y:auto;padding:8px 12px}
.nr-chapter{font-weight:600;margin:2px 0 8px;font-size:1.05em}
.nr-p{margin:0 0 .55em;text-indent:2em;line-height:1.75;word-break:break-word}
.nr-muted{color:var(--dsw-alias-label-secondary);font-size:12px}
.nr-err{color:var(--dsw-alias-state-error-primary);font-size:12px;word-break:break-word}
.nr-foot{flex:none;display:flex;align-items:center;justify-content:space-between;gap:4px;padding:4px 6px;border-top:.5px solid var(--dsw-alias-border-l1)}
.nr-btn{border:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border-radius:6px;padding:2px 8px;font:inherit;font-size:12px;cursor:pointer;white-space:nowrap}
.nr-btn:hover{background:var(--dsw-alias-bg-layer-2)}
.nr-btn:disabled{opacity:.45;cursor:default}
.nr-row{display:flex;gap:6px;align-items:center;padding:6px 8px;border-radius:6px;cursor:pointer;min-width:0}
.nr-row:hover{background:var(--dsw-alias-bg-layer-2)}
.nr-row.nr-cur{color:var(--dsw-alias-brand-primary);font-weight:500}
.nr-rowmain{flex:1;min-width:0}
.nr-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.nr-list{padding:4px}
.nr-form{display:flex;gap:4px;padding:8px 8px 4px;flex:none}
.nr-input,.nr-select,.nr-textarea{box-sizing:border-box;border:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border-radius:6px;font:inherit;font-size:12px;padding:3px 6px;min-width:0}
.nr-input{flex:1}
.nr-mini{margin:0 2px 6px 6px;width:26px;height:26px;border-radius:7px;border:.5px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;padding:0;position:relative;flex:none}
.nr-mini:hover{color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2)}
.nr-mini-dot{position:absolute;right:3px;top:3px;width:5px;height:5px;border-radius:50%;background:var(--dsw-alias-brand-primary)}
.nr-select{width:100%;margin:0 8px;width:calc(100% - 16px);flex:none}
.nr-textarea{width:100%;height:64px;resize:vertical}
.nr-input:focus,.nr-select:focus,.nr-textarea:focus{outline:1px solid var(--dsw-alias-brand-primary);outline-offset:-1px}
`

    // ------------------------------------------------------------ persisted store
    const defaults = { sources: [], shelf: [], currentId: null, view: 'shelf', collapsed: false, hidden: false, height: 300, fontSize: 13 }
    function load() {
      try { return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } } catch { return { ...defaults } }
    }
    // Book sources can be tens of MB, so they live in IndexedDB (onSources) and
    // never in localStorage; everything else is small and saved synchronously.
    function createStore(onSources) {
      let state = load()
      const legacySources = state.sources
      state = { ...state, sources: [], sourcesLoaded: false }
      const listeners = new Set()
      let saveTimer = null
      const persist = () => {
        saveTimer = null
        const { sources, sourcesLoaded, ...rest } = state
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(rest)) } catch {}
      }
      const api = {
        legacySources,
        get: () => state,
        subscribe: (fn) => { listeners.add(fn); return () => listeners.delete(fn) },
        set(patch, { silent } = {}) {
          const prev = state
          state = { ...state, ...(typeof patch === 'function' ? patch(state) : patch) }
          if (!saveTimer) saveTimer = setTimeout(persist, 300)
          if (!silent && state.sources !== prev.sources && state.sourcesLoaded) onSources(state.sources)
          for (const fn of [...listeners]) fn()
        },
      }
      return api
    }

    function fmt(s, vars) { return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k])) }

    // ------------------------------------------------------------ icons
    const svg = (d, size = 15) => h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }, ...d.map((p, i) => h('path', { key: i, d: p })))
    const Icons = {
      book: () => svg(['M4 5.5C7 4.5 10 4.7 12 6v13c-2-1.3-5-1.5-8-.5z', 'M20 5.5c-3-1-6-.8-8 .5v13c2-1.3 5-1.5 8-.5z']),
      shelf: () => svg(['M5 4v16', 'M9 4v16', 'M13.5 5l3.5 14.5', 'M3 20h18']),
      search: () => svg(['M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z', 'M20 20l-4-4']),
      sources: () => svg(['M4 6h16', 'M4 12h16', 'M4 18h10']),
      toc: () => svg(['M9 6h11', 'M9 12h11', 'M9 18h11', 'M4.5 6h.01', 'M4.5 12h.01', 'M4.5 18h.01']),
      down: () => svg(['M6 9l6 6 6-6']),
      up: () => svg(['M6 15l6-6 6 6']),
      close: () => svg(['M6 6l12 12', 'M18 6L6 18'], 13),
      minus: () => svg(['M7 12h10'], 13),
      plus: () => svg(['M12 7v10', 'M7 12h10'], 13),
      hide: () => svg(['M3 3l18 18', 'M10.6 6.1A9.8 9.8 0 0 1 12 6c5 0 9 6 9 6a16 16 0 0 1-2.6 3.2', 'M6.6 6.6C4.3 8.1 3 12 3 12s4 6 9 6a8.6 8.6 0 0 0 4.4-1.2', 'M9.9 9.9a3 3 0 0 0 4.2 4.2'], 14),
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, 'zh', zh), 'novel-reader: zh dictionary')
        ctx.effect(() => ctx.locale.register(NS, 'en', en), 'novel-reader: en dictionary')
        const translate = ctx.locale.bind(NS)
        const localeSubscribe = (fn) => ctx.locale.subscribe(fn)
        const localeSnapshot = () => ctx.locale.getSnapshot()
        const isZh = () => { try { return /^zh/i.test(String(ctx.locale.getSnapshot()?.id ?? ctx.locale.getSnapshot()?.locale ?? navigator.language)) } catch { return true } }
        const safeT = (key) => {
          let out
          try { out = translate(key) } catch {}
          if (typeof out !== 'string' || out === key || out.endsWith('.' + key)) out = (isZh() ? zh : en)[key] ?? key
          return out
        }
        const store = createStore((list) => saveSources(list))

        // ---- Shared sidebar-dock protocol (same code in every sidebar widget plugin).
        // ⌥⇧<letter> expands / collapses one widget (the others collapse and their
        // icons hide); ⌥⇧H hides / shows ALL widgets at once. New widgets join by
        // registering their id + letter here.
        const DOCK_ID = 'novel-reader', DOCK_KEY = 'N', DOCK_LABEL = '小说'
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

            id: DOCK_ID, key: DOCK_KEY, label: DOCK_LABEL, order: -85, icon: () => Icons.book(),

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
          const result = await connection.rpc.call('/api', `novelReader/${op}`, payload, signal)
          if (!result.ok) throw new Error(result.error?.message || 'request failed')
          return result.value
        }

        // In-memory caches: tocs by book id, chapter text by url.
        const tocCache = new Map()
        const textCache = new Map()
        function sourceOf(book) {
          return store.get().sources.find((s) => s.bookSourceUrl === book.sourceKey)
        }
        // ---------------------------------------------------------- local TXT books (IndexedDB)
        const DB_NAME = 'dsh-novel-reader'
        const DB_STORE = 'localBooks'
        let dbPromise = null
        function openDb() {
          if (!dbPromise) {
            dbPromise = new Promise((resolve, reject) => {
              const req = indexedDB.open(DB_NAME, 1)
              req.onupgradeneeded = () => { req.result.createObjectStore(DB_STORE, { keyPath: 'id' }) }
              req.onsuccess = () => resolve(req.result)
              req.onerror = () => reject(req.error)
            })
            dbPromise.catch(() => { dbPromise = null })
          }
          return dbPromise
        }
        async function dbOp(mode, fn) {
          const db = await openDb()
          return new Promise((resolve, reject) => {
            const tx = db.transaction(DB_STORE, mode)
            const req = fn(tx.objectStore(DB_STORE))
            tx.oncomplete = () => resolve(req?.result)
            tx.onerror = () => reject(tx.error)
            tx.onabort = () => reject(tx.error || new Error('storage aborted'))
          })
        }
        // Book sources: one record in the same object store.
        const SOURCES_ID = '__sources__'
        let sourcesSave = Promise.resolve()
        function saveSources(list) {
          sourcesSave = sourcesSave.then(() => dbOp('readwrite', (s) => s.put({ id: SOURCES_ID, list }))).catch((e) => console.warn('[novel-reader] saving sources failed', e))
          return sourcesSave
        }
        const sourcesReady = (async () => {
          let list = null
          try { list = (await dbOp('readonly', (s) => s.get(SOURCES_ID)))?.list ?? null } catch (e) { console.warn('[novel-reader] loading sources failed', e) }
          const legacy = store.legacySources
          if (!list && Array.isArray(legacy) && legacy.length) list = legacy
          store.set({ sources: Array.isArray(list) ? list : [], sourcesLoaded: true }, { silent: true })
          if (Array.isArray(legacy) && legacy.length) {
            await saveSources(store.get().sources)
            store.set({}) // rewrites localStorage without the legacy sources
          }
        })()

        const localCache = new Map()
        async function loadLocal(id) {
          if (localCache.has(id)) return localCache.get(id)
          const rec = await dbOp('readonly', (s) => s.get(id))
          if (!rec) throw new Error('本地书籍内容已丢失，请重新导入')
          localCache.clear()
          localCache.set(id, rec)
          return rec
        }

        function decodeText(buf) {
          const bytes = new Uint8Array(buf)
          if (bytes[0] === 0xff && bytes[1] === 0xfe) return new TextDecoder('utf-16le').decode(bytes)
          if (bytes[0] === 0xfe && bytes[1] === 0xff) return new TextDecoder('utf-16be').decode(bytes)
          try { return new TextDecoder('utf-8', { fatal: true }).decode(bytes) } catch {}
          return new TextDecoder('gb18030').decode(bytes)
        }

        const HEADING = /^(?:正文\s*)?(?:第[\s零〇一二三四五六七八九十百千万两0-9０-９]{1,12}[章节回卷集部篇](?:[\s:：、.·—\-]*.{0,40})?|(?:序章|序言|序|楔子|引子|引言|前言|自序|后记|後記|尾声|尾聲|终章|番外)(?:[\s:：、.·—\-]+.{0,30})?|Chapter\s+\d+.{0,40})$/i

        function splitTxt(text, fallbackTitle) {
          const lines = text.replace(/\r\n?/g, '\n').split('\n')
          const chapters = []
          let cur = { name: '', paragraphs: [] }
          let headings = 0
          for (const raw of lines) {
            const line = raw.replace(/^[\s\u3000\ufeff]+|[\s\u3000]+$/g, '')
            if (!line) continue
            if (line.length <= 50 && HEADING.test(line)) {
              headings++
              if (cur.name || cur.paragraphs.length) chapters.push(cur)
              cur = { name: line, paragraphs: [] }
            } else cur.paragraphs.push(line)
          }
          if (cur.name || cur.paragraphs.length) chapters.push(cur)
          let result = chapters.filter((c) => c.paragraphs.length || c.name)
          if (headings < 2) {
            // No recognizable chapter headings: cut into ~6000 character parts.
            const all = result.flatMap((c) => (c.name ? [c.name, ...c.paragraphs] : c.paragraphs))
            result = []
            let part = []
            let size = 0
            for (const p of all) {
              part.push(p); size += p.length
              if (size >= 6000) { result.push({ name: `第${result.length + 1}部分`, paragraphs: part }); part = []; size = 0 }
            }
            if (part.length) result.push({ name: `第${result.length + 1}部分`, paragraphs: part })
          } else if (result[0] && !result[0].name) {
            result[0].name = '开篇'
          }
          if (!result.length) throw new Error('文件里没有可读的文字')
          return result
        }

        async function importTxt(file) {
          const text = decodeText(await file.arrayBuffer())
          const name = file.name.replace(/\.(txt|text)$/i, '') || '未命名'
          const chapters = splitTxt(text, name)
          const id = 'local:' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
          await dbOp('readwrite', (s) => s.put({ id, name, chapters }))
          const book = { id, local: true, name, author: '本地导入', chapter: 0, chapterName: chapters[0].name, scroll: 0, chapterCount: chapters.length }
          store.set((s) => ({ shelf: [book, ...s.shelf], currentId: id, view: 'reader', collapsed: false }))
          return book
        }

        async function removeLocal(id) {
          localCache.delete(id)
          await dbOp('readwrite', (s) => s.delete(id)).catch(() => {})
        }

        async function getToc(book, force) {
          if (book.local) {
            const rec = await loadLocal(book.id)
            return rec.chapters.map((c, i) => ({ name: c.name, url: book.id + '#' + i }))
          }
          if (!force && tocCache.has(book.id)) return tocCache.get(book.id)
          const source = await resolveSource(book)
          const res = await call('toc', { source, book: bookPayload(book), tocUrl: book.tocUrl })
          const list = Array.isArray(res) ? res : res.chapters
          if (res && res.variables) saveVars(book.id, res.variables)
          tocCache.set(book.id, list)
          return list
        }
        function bookPayload(book) {
          const cur = store.get().shelf.find((b) => b.id === book.id) || book
          return { name: cur.name, author: cur.author, bookUrl: cur.bookUrl, tocUrl: cur.tocUrl, variables: cur.variables || {} }
        }
        function saveVars(id, variables) {
          const cur = store.get().shelf.find((b) => b.id === id)
          if (cur && JSON.stringify(cur.variables || {}) !== JSON.stringify(variables)) updateBook(id, { variables })
        }
        let builtinCache = null
        async function resolveSource(book) {
          await sourcesReady
          let source = sourceOf(book)
          if (!source) {
            builtinCache = builtinCache || call('builtinSources', {})
            source = (await builtinCache).find((s) => s.bookSourceUrl === book.sourceKey)
          }
          if (!source) throw new Error('找不到这本书的书源（可能已被移除）：' + book.sourceKey)
          return source
        }
        async function getText(book, chapters, index) {
          const ch = chapters[index]
          if (!ch) return null
          if (book.local) {
            const rec = await loadLocal(book.id)
            return { paragraphs: rec.chapters[index]?.paragraphs ?? [] }
          }
          const key = ch.url
          if (!textCache.has(key)) {
            const p = resolveSource(book).then((source) => call('content', {
              source, book: bookPayload(book), chapter: { url: ch.url, title: ch.name, index }, chapterUrl: ch.url, nextChapterUrl: chapters[index + 1]?.url,
            })).then((res) => { if (res.variables) saveVars(book.id, res.variables); return res })
            textCache.set(key, p)
            p.catch(() => textCache.delete(key))
            while (textCache.size > 12) textCache.delete(textCache.keys().next().value)
          }
          return textCache.get(key)
        }

        async function ensureSources() {
          await sourcesReady
          if (store.get().sources.length) return
          const builtin = await call('builtinSources', {})
          if (!store.get().sources.length) store.set({ sources: builtin })
        }

        // First run: put one public-domain book on the shelf so there is something to read.
        const SAMPLE_BOOK = {
          id: 'https://www.gutenberg.org|https://www.gutenberg.org/ebooks/24264',
          name: '紅樓夢',
          author: '曹雪芹',
          bookUrl: 'https://www.gutenberg.org/ebooks/24264',
          tocUrl: 'https://www.gutenberg.org/cache/epub/24264/pg24264-images.html',
          sourceKey: 'https://www.gutenberg.org',
          chapter: 0,
          chapterName: '第一回　甄士隱夢幻識通靈　賈雨村風塵怀閨秀',
          scroll: 0,
        }
        if (!store.get().seeded) {
          store.set((s) => ({
            seeded: true,
            shelf: s.shelf.some((b) => b.id === SAMPLE_BOOK.id) ? s.shelf : [SAMPLE_BOOK, ...s.shelf],
            currentId: s.currentId || SAMPLE_BOOK.id,
            view: 'reader',
            collapsed: false,
          }))
        }

        function useStore() { return useSyncExternalStore(store.subscribe, store.get) }
        function useT() {
          useSyncExternalStore(localeSubscribe, localeSnapshot)
          return safeT
        }

        // ---------------------------------------------------------- views
        function Reader({ book, t }) {
          const [chapters, setChapters] = useState(tocCache.get(book.id) || null)
          const [text, setText] = useState(null)
          const [error, setError] = useState(null)
          const [nonce, setNonce] = useState(0)
          const scrollRef = useRef(null)
          const fontSize = useStore().fontSize
          const index = book.chapter || 0

          useEffect(() => {
            let live = true
            setError(null)
            setText(null)
            ;(async () => {
              const list = await getToc(book, false)
              if (!live) return
              setChapters(list)
              if (!list.length) return
              const i = Math.min(index, list.length - 1)
              const result = await getText(book, list, i)
              if (!live) return
              setText(result)
              getText(book, list, i + 1)?.catch(() => {})
              requestAnimationFrame(() => {
                const el = scrollRef.current
                if (el) el.scrollTop = (book.scroll || 0) * Math.max(0, el.scrollHeight - el.clientHeight)
              })
            })().catch((e) => { if (live) setError(e.message || String(e)) })
            return () => { live = false }
          }, [book.id, index, nonce])

          const onScroll = useCallback(() => {
            const el = scrollRef.current
            if (!el) return
            const ratio = el.scrollHeight > el.clientHeight ? el.scrollTop / (el.scrollHeight - el.clientHeight) : 0
            clearTimeout(onScroll.timer)
            onScroll.timer = setTimeout(() => updateBook(book.id, { scroll: Math.round(ratio * 1000) / 1000 }), 400)
          }, [book.id])

          const go = (delta) => {
            if (!chapters) return
            const next = index + delta
            if (next < 0 || next >= chapters.length) return
            updateBook(book.id, { chapter: next, chapterName: chapters[next].name, scroll: 0 })
          }

          const chapterName = chapters?.[index]?.name || book.chapterName || ''
          return h('div', { className: 'nr-body', style: { height: store.get().height } },
            h('div', { className: 'nr-scroll', ref: scrollRef, onScroll, style: { fontSize } },
              error
                ? h('div', null, h('div', { className: 'nr-err' }, error), h('button', { className: 'nr-btn', style: { marginTop: 8 }, onClick: () => { tocCache.delete(book.id); setNonce(nonce + 1) } }, t('retry')))
                : chapters && !chapters.length ? h('div', { className: 'nr-muted' }, t('noChapters'))
                : h(React.Fragment, null,
                  chapterName && h('div', { className: 'nr-chapter' }, chapterName),
                  text
                    ? text.paragraphs.map((p, i) => h('p', { key: i, className: 'nr-p' }, p))
                    : h('div', { className: 'nr-muted' }, t('loading')))),
            h('div', { className: 'nr-foot' },
              h('button', { className: 'nr-btn', disabled: !chapters || index <= 0, onClick: () => go(-1), title: index <= 0 ? t('firstChapter') : undefined }, '‹ ' + t('prev')),
              h('span', { className: 'nr-muted' }, chapters ? fmt(t('chapterOf'), { i: index + 1, n: chapters.length }) : ''),
              h('button', { className: 'nr-btn', disabled: !chapters || index >= chapters.length - 1, onClick: () => go(1) }, t('next') + ' ›')))
        }

        function Toc({ book, t }) {
          const [chapters, setChapters] = useState(tocCache.get(book.id) || null)
          const [error, setError] = useState(null)
          const curRef = useRef(null)
          useEffect(() => {
            let live = true
            getToc(book, false).then((l) => live && setChapters(l), (e) => live && setError(e.message))
            return () => { live = false }
          }, [book.id])
          useEffect(() => { curRef.current?.scrollIntoView({ block: 'center' }) }, [chapters])
          return h('div', { className: 'nr-body', style: { height: store.get().height } },
            h('div', { className: 'nr-scroll', style: { padding: 4 } },
              error ? h('div', { className: 'nr-err', style: { padding: 8 } }, error)
              : !chapters ? h('div', { className: 'nr-muted', style: { padding: 8 } }, t('loading'))
              : chapters.map((c, i) => h('div', {
                key: i,
                ref: i === (book.chapter || 0) ? curRef : undefined,
                className: 'nr-row' + (i === (book.chapter || 0) ? ' nr-cur' : ''),
                onClick: () => { updateBook(book.id, { chapter: i, chapterName: c.name, scroll: 0 }); store.set({ view: 'reader' }) },
              }, h('div', { className: 'nr-rowmain nr-ellipsis' }, c.name)))))
        }

        function Shelf({ t }) {
          const { shelf, currentId } = useStore()
          const fileRef = useRef(null)
          const [busy, setBusy] = useState(false)
          const [msg, setMsg] = useState(null)
          const onFiles = async (e) => {
            const files = [...(e.target.files || [])]
            e.target.value = ''
            if (!files.length) return
            setBusy(true); setMsg(null)
            try {
              let last
              for (const f of files) last = await importTxt(f)
              setMsg({ ok: true, text: `已导入《${last.name}》，共 ${last.chapterCount} 章` })
            } catch (err) {
              setMsg({ ok: false, text: '导入失败：' + (err?.message || err) })
            } finally { setBusy(false) }
          }
          return h('div', { className: 'nr-body', style: { height: store.get().height } },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px 0', flex: 'none' } },
              h('input', { ref: fileRef, type: 'file', accept: '.txt,text/plain', multiple: true, style: { display: 'none' }, onChange: onFiles }),
              h('button', { className: 'nr-btn', disabled: busy, onClick: () => fileRef.current?.click() }, busy ? '导入中…' : t('importTxt')),
              msg && h('span', { className: (msg.ok ? 'nr-muted' : 'nr-err') + ' nr-ellipsis', style: { minWidth: 0, flex: 1 }, title: msg.text }, msg.text)),
            h('div', { className: 'nr-scroll', style: { padding: 4 } },
              !shelf.length ? h('div', { className: 'nr-muted', style: { padding: 8 } }, t('emptyShelf'))
              : shelf.map((b) => h('div', {
                key: b.id,
                className: 'nr-row' + (b.id === currentId ? ' nr-cur' : ''),
                onClick: () => store.set({ currentId: b.id, view: 'reader' }),
              },
              h('div', { className: 'nr-rowmain' },
                h('div', { className: 'nr-ellipsis' }, b.name),
                h('div', { className: 'nr-muted nr-ellipsis' }, [b.author, b.chapterName].filter(Boolean).join(' · '))),
              h('button', {
                className: 'nr-ibtn', title: t('remove'), 'aria-label': t('remove'),
                onClick: (e) => {
                  e.stopPropagation()
                  if (b.local && !window.confirm(`移除《${b.name}》？本地导入的内容也会被删除。`)) return
                  if (b.local) removeLocal(b.id)
                  store.set((s) => ({ shelf: s.shelf.filter((x) => x.id !== b.id), currentId: s.currentId === b.id ? null : s.currentId }))
                },
              }, Icons.close())))))
        }

        function Search({ t }) {
          const { sources } = useStore()
          const [key, setKey] = useState('')
          const [sourceKey, setSourceKey] = useState('*')
          const [results, setResults] = useState(null)
          const [errors, setErrors] = useState([])
          const [busy, setBusy] = useState(false)
          const [rowState, setRowState] = useState({})
          const setRow = (id, v) => setRowState((m) => { const n = { ...m }; if (v) n[id] = v; else delete n[id]; return n })
          const [progress, setProgress] = useState(null)
          const runRef = useRef(null)
          useEffect(() => () => runRef.current?.abort(), [])
          const searchable = sources.filter((s) => (s.bookSourceType ?? 0) === 0 && s.searchUrl && s.enabled !== false)
          const stop = () => { runRef.current?.abort(); runRef.current = null; setBusy(false) }
          const run = async () => {
            const q = key.trim()
            if (!q) return
            runRef.current?.abort()
            const ac = new AbortController()
            runRef.current = ac
            setBusy(true); setResults([]); setErrors([])
            const targets = sourceKey === '*' ? searchable : sources.filter((s) => s.bookSourceUrl === sourceKey)
            let done = 0, failed = 0, next = 0
            const found = []
            const seen = new Set()
            const lastErrors = []
            setProgress({ done, total: targets.length, failed })
            const score = (b) => (b.name === q ? 0 : b.name.startsWith(q) ? 1 : b.name.includes(q) ? 2 : b.author && b.author.includes(q) ? 3 : 4)
            let flushTimer = null
            const flush = () => {
              flushTimer = null
              if (ac.signal.aborted && runRef.current !== ac) return
              setResults(runRef.current === ac ? [...found] : [...found].sort((a, b) => score(a) - score(b)))
              setProgress({ done, total: targets.length, failed })
              setErrors(targets.length === 1 ? [...lastErrors] : [])
            }
            const schedule = () => { if (!flushTimer) flushTimer = setTimeout(flush, 250) }
            const worker = async () => {
              while (!ac.signal.aborted && next < targets.length) {
                const source = targets[next++]
                try {
                  const list = await call('search', { source, key: q, page: 1 }, ac.signal)
                  for (const b of list) {
                    const id = source.bookSourceUrl + '|' + b.bookUrl
                    if (seen.has(id)) continue
                    seen.add(id)
                    found.push({ ...b, source })
                  }
                } catch (e) {
                  if (ac.signal.aborted) return
                  failed++
                  lastErrors.push(`${source.bookSourceName || source.bookSourceUrl}: ${e?.message || e}`)
                  if (lastErrors.length > 5) lastErrors.shift()
                }
                done++
                schedule()
              }
            }
            await Promise.all(Array.from({ length: Math.min(12, targets.length) }, worker))
            clearTimeout(flushTimer)
            if (runRef.current === ac) { runRef.current = null; flush(); setBusy(false) }
          }
          const open = async (b) => {
            const id = b.source.bookSourceUrl + '|' + b.bookUrl
            const existing = store.get().shelf.find((x) => x.id === id)
            if (existing) { store.set({ currentId: id, view: 'reader' }); return }
            if (rowState[id]?.loading) return
            setRow(id, { loading: true })
            try {
              const info = await call('bookInfo', { source: b.source, bookUrl: b.bookUrl, book: { name: b.name, author: b.author, bookUrl: b.bookUrl, variables: b.variables || {} } })
              const book = { id, name: info.name || b.name, author: info.author || b.author, bookUrl: b.bookUrl, tocUrl: info.tocUrl, sourceKey: b.source.bookSourceUrl, sourceName: b.source.bookSourceName, variables: info.variables || b.variables || {}, chapter: 0, scroll: 0 }
              if (!store.get().sources.some((s) => s.bookSourceUrl === b.source.bookSourceUrl)) store.set((s) => ({ sources: [...s.sources, b.source] }))
              setRow(id, null)
              store.set((s) => ({ shelf: [book, ...s.shelf.filter((x) => x.id !== id)], currentId: id, view: 'reader' }))
            } catch (e) {
              setRow(id, { error: e?.message || String(e) })
            }
          }
          return h('div', { className: 'nr-body', style: { height: store.get().height } },
            h('form', { className: 'nr-form', onSubmit: (e) => { e.preventDefault(); run() } },
              h('input', { className: 'nr-input', value: key, placeholder: t('searchPlaceholder'), onChange: (e) => setKey(e.target.value), autoFocus: true }),
              busy
                ? h('button', { className: 'nr-btn', type: 'button', onClick: stop }, '停止')
                : h('button', { className: 'nr-btn', type: 'submit', disabled: !key.trim() }, t('go'))),
            h('select', { className: 'nr-select', value: sourceKey, onChange: (e) => setSourceKey(e.target.value) },
              h('option', { value: '*' }, `${t('allSources')} (${searchable.length})`),
              searchable.map((s) => h('option', { key: s.bookSourceUrl, value: s.bookSourceUrl }, s.bookSourceName || s.bookSourceUrl))),
            progress && h('div', { className: 'nr-muted', style: { padding: '4px 10px 0' } },
              `${busy ? '搜索中' : '已完成'} ${progress.done}/${progress.total} 个书源，找到 ${results ? results.length : 0} 条` + (progress.failed ? `，${progress.failed} 个书源失败` : '')),
            h('div', { className: 'nr-scroll', style: { padding: 4 } },
              errors.map((e, i) => h('div', { key: 'e' + i, className: 'nr-err', style: { padding: '2px 8px' } }, e)),
              results && !results.length && !busy && progress && h('div', { className: 'nr-muted', style: { padding: 8 } }, t('noResult')),
              results && results.slice(0, 300).map((b) => {
                const id = b.source.bookSourceUrl + '|' + b.bookUrl
                const st = rowState[id]
                return h('div', { key: id, className: 'nr-row', onClick: () => open(b), title: b.intro || undefined, style: st?.loading ? { opacity: 0.7 } : undefined },
                  h('div', { className: 'nr-rowmain' },
                    h('div', { className: 'nr-ellipsis' }, b.name),
                    h('div', { className: 'nr-muted nr-ellipsis' }, [b.author, b.lastChapter, b.source.bookSourceName].filter(Boolean).join(' · ')),
                    st?.error && h('div', { className: 'nr-err' }, '打开失败：' + st.error + '（点击重试，或换一个书源）')),
                  st?.loading && h('span', { className: 'nr-muted', style: { flex: 'none' } }, '打开中…'))
              })))
        }

        function Sources({ t }) {
          const { sources } = useStore()
          const [input, setInput] = useState('')
          const [msg, setMsg] = useState(null)
          const [busy, setBusy] = useState(false)
          const fileRef = useRef(null)
          const merge = (list) => {
            store.set((s) => {
              const map = new Map(s.sources.map((x) => [x.bookSourceUrl, x]))
              for (const x of list) map.set(x.bookSourceUrl, x)
              return { sources: [...map.values()] }
            })
            const skipped = list.filter((x) => (x.bookSourceType ?? 0) !== 0 || !x.searchUrl).length
            setMsg({ ok: true, text: fmt(t('imported'), { n: list.length }) + (skipped ? `（其中 ${skipped} 个是漫画/音频书源或没有搜索规则，搜索时会跳过）` : '') })
          }
          const [filter, setFilter] = useState('')
          const shown = filter.trim()
            ? sources.filter((s) => (s.bookSourceName || '').includes(filter.trim()) || s.bookSourceUrl.includes(filter.trim()))
            : sources
          const doImport = async () => {
            setBusy(true); setMsg(null)
            try {
              merge(await call('loadSources', { input }))
              setInput('')
            } catch (e) { setMsg({ ok: false, text: e.message || String(e) }) } finally { setBusy(false) }
          }
          const onFiles = async (e) => {
            const files = [...(e.target.files || [])]
            e.target.value = ''
            if (!files.length) return
            setBusy(true); setMsg(null)
            try {
              const all = []
              for (const f of files) {
                let data
                try { data = JSON.parse((await f.text()).replace(/^\ufeff/, '')) } catch { throw new Error(`${f.name} 不是有效的 JSON`) }
                const list = (Array.isArray(data) ? data : [data]).filter((s) => s && typeof s === 'object' && typeof s.bookSourceUrl === 'string')
                if (!list.length) throw new Error(`${f.name} 里没有找到书源（需要包含 bookSourceUrl 字段）`)
                all.push(...list)
              }
              merge(all)
            } catch (err) { setMsg({ ok: false, text: err.message || String(err) }) } finally { setBusy(false) }
          }
          const restore = async () => {
            const builtin = await call('builtinSources', {})
            store.set((s) => {
              const map = new Map(s.sources.map((x) => [x.bookSourceUrl, x]))
              for (const x of builtin) map.set(x.bookSourceUrl, x)
              return { sources: [...map.values()] }
            })
          }
          return h('div', { className: 'nr-body', style: { height: store.get().height } },
            h('div', { className: 'nr-scroll', style: { padding: 8 } },
              h('textarea', { className: 'nr-textarea', value: input, placeholder: t('importPlaceholder'), onChange: (e) => setInput(e.target.value) }),
              h('div', { style: { display: 'flex', gap: 6, margin: '6px 0' } },
                h('button', { className: 'nr-btn', disabled: busy || !input.trim(), onClick: doImport }, busy ? t('loading') : t('import')),
                h('input', { ref: fileRef, type: 'file', accept: '.json,application/json,.txt', multiple: true, style: { display: 'none' }, onChange: onFiles }),
                h('button', { className: 'nr-btn', disabled: busy, onClick: () => fileRef.current?.click() }, t('importFile')),
                h('button', { className: 'nr-btn', onClick: () => restore().catch((e) => setMsg({ ok: false, text: e.message })) }, t('restoreBuiltin'))),
              msg && h('div', { className: msg.ok ? 'nr-muted' : 'nr-err', style: { marginBottom: 6 } }, msg.text),
              h('div', { className: 'nr-muted', style: { marginBottom: 6 } }, t('unsupportedNote')),
              !sources.length && h('div', { className: 'nr-muted' }, t('noSources')),
              sources.length > 0 && h('div', { style: { display: 'flex', gap: 6, alignItems: 'center', margin: '4px 0' } },
                h('input', { className: 'nr-input', value: filter, placeholder: `筛选书源（共 ${sources.length} 个）`, onChange: (e) => setFilter(e.target.value) }),
                h('button', { className: 'nr-btn', onClick: () => { if (window.confirm(`清空全部 ${sources.length} 个书源？`)) store.set({ sources: [] }) } }, '清空')),
              shown.length > 200 && h('div', { className: 'nr-muted' }, `只显示前 200 个，可用上面的筛选框查找`),
              shown.slice(0, 200).map((s) => h('div', { key: s.bookSourceUrl, className: 'nr-row', style: { cursor: 'default', padding: '4px 2px' } },
                h('div', { className: 'nr-rowmain' },
                  h('div', { className: 'nr-ellipsis' }, s.bookSourceName || s.bookSourceUrl),
                  h('div', { className: 'nr-muted nr-ellipsis' }, s.bookSourceUrl)),
                h('button', {
                  className: 'nr-ibtn', title: t('remove'), 'aria-label': t('remove'),
                  onClick: () => store.set((st) => ({ sources: st.sources.filter((x) => x.bookSourceUrl !== s.bookSourceUrl) })),
                }, Icons.close())))))
        }

        function updateBook(id, patch) {
          store.set((s) => ({ shelf: s.shelf.map((b) => (b.id === id ? { ...b, ...patch } : b)) }))
        }

        function useResize() {
          return (e) => {
            e.preventDefault()
            const startY = e.clientY
            const startH = store.get().height
            const move = (ev) => {
              const max = Math.max(160, window.innerHeight - 260)
              store.set({ height: Math.round(Math.min(max, Math.max(120, startH + (startY - ev.clientY)))) })
            }
            const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
            window.addEventListener('pointermove', move)
            window.addEventListener('pointerup', up)
          }
        }

        function NovelDock(props) {
          const t = useT()
          const state = useStore()
          const openDock = useOpenDock()
          const docksHidden = useDocksHidden()

          const hubMode = useBus((b) => Boolean(b.hub && b.docks.hub))
          const onResize = useResize()
          useEffect(() => { ensureSources().catch(() => {}) }, [])
          if (props.wide === false || docksHidden) return null
          const book = state.shelf.find((b) => b.id === state.currentId) || null
          let view = state.view
          if ((view === 'reader' || view === 'toc') && !book) view = 'shelf'
          const setView = (v) => store.set({ view: v, collapsed: false })
          const ibtn = (v, icon, label, disabled) => h('button', {
            className: 'nr-ibtn' + (!state.collapsed && view === v ? ' nr-on' : ''), title: label, 'aria-label': label, disabled,
            onClick: () => (!state.collapsed && view === v && v !== 'reader' ? setView(book ? 'reader' : 'shelf') : setView(v)),
          }, icon())
          const title = book ? book.name : t('title')
          let body = null
          if (!state.collapsed) {
            if (view === 'reader') body = h(Reader, { key: book.id, book, t })
            else if (view === 'toc') body = h(Toc, { key: book.id, book, t })
            else if (view === 'search') body = h(Search, { t })
            else if (view === 'sources') body = h(Sources, { t })
            else body = h(Shelf, { t })
          }
          const showFont = !state.collapsed && view === 'reader'
          if (state.collapsed) {
            if (openDock && openDock !== DOCK_ID) return null

            if (hubMode) return null
            const tip = (book ? book.name : t('title')) + '\n\n快捷键：\n' + bus.help()
            return h('button', { className: 'nr-mini', title: tip, 'aria-label': t('expand'), onClick: () => store.set({ collapsed: false }) },
              h('style', null, CSS), Icons.book(), book && h('span', { className: 'nr-mini-dot' }))
          }
          return h('div', { className: 'nr-card' },
            h('style', null, CSS),
            !state.collapsed ? h('div', { className: 'nr-grip', title: t('resize'), onPointerDown: onResize }) : h('div', { style: { height: 4 } }),
            h('div', { className: 'nr-head' },
              h('span', { style: { display: 'inline-flex', color: 'var(--dsw-alias-label-secondary)', marginRight: 4 } }, Icons.book()),
              h('div', { className: 'nr-title', title, onClick: () => (book ? setView('reader') : setView('shelf')) }, title),
              showFont && h('button', { className: 'nr-ibtn', title: t('fontSmaller'), 'aria-label': t('fontSmaller'), onClick: () => store.set({ fontSize: Math.max(11, state.fontSize - 1) }) }, Icons.minus()),
              showFont && h('button', { className: 'nr-ibtn', title: t('fontLarger'), 'aria-label': t('fontLarger'), onClick: () => store.set({ fontSize: Math.min(20, state.fontSize + 1) }) }, Icons.plus()),
              ibtn('toc', Icons.toc, t('toc'), !book),
              ibtn('shelf', Icons.shelf, t('shelf')),
              ibtn('search', Icons.search, t('search')),
              ibtn('sources', Icons.sources, t('sources')),
              h('button', {
                className: 'nr-ibtn', title: fmt(t('hideHint'), { k: KEY_HIDE }) + '\n\n' + bus.help(), 'aria-label': t('hide'),
                onClick: () => bus.setHidden(true),
              }, Icons.hide()),
              h('button', {
                className: 'nr-ibtn', title: fmt(t('collapseHint'), { k: KEY_TOGGLE }), 'aria-label': t('collapse'),
                onClick: () => store.set({ collapsed: true }),
              }, Icons.down())),
            body)
        }

        class Boundary extends React.Component {
          constructor(p) { super(p); this.state = { error: null } }
          static getDerivedStateFromError(error) { return { error } }
          componentDidCatch(error) { console.error('[novel-reader] render failed', error) }
          render() {
            if (this.state.error) {
              return h('div', { style: { margin: '0 2px 6px', padding: 8, border: '.5px solid var(--dsw-alias-state-error-primary)', borderRadius: 8, fontSize: 12, color: 'var(--dsw-alias-state-error-primary)', wordBreak: 'break-word', width: '100%', boxSizing: 'border-box' } },
                '小说插件出错：' + (this.state.error?.message || String(this.state.error)),
                h('button', { style: { marginLeft: 6 }, onClick: () => this.setState({ error: null }) }, '重试'))
            }
            return h(NovelDock, this.props)
          }
        }

        ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({
          name: 'sidebar.footer.action',
          id: 'novel-reader',
          order: -100,
          label: () => safeT('title'),
        }, Boundary))
      },
    }
  },
})
