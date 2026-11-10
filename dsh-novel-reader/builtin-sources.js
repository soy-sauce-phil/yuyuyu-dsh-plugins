/**
 * Built-in book sources. Only public-domain catalogues are shipped; users add
 * their own Legado (阅读) book sources by URL or JSON from the reader UI.
 */
export const BUILTIN_SOURCES = [
  {
    bookSourceName: '古登堡计划 Project Gutenberg（公版书）',
    bookSourceUrl: 'https://www.gutenberg.org',
    bookSourceGroup: '内置',
    searchUrl: '/ebooks/search/?query={{key}}&start_index={{(page-1)*25+1}}',
    ruleSearch: {
      bookList: '@css:li.booklink',
      name: '@css:span.title@text##\\s*\\((Chinese|English)\\)$##',
      author: '@css:span.subtitle@text',
      intro: '@css:span.extra@text',
      bookUrl: '@css:a.link@href',
      coverUrl: '@css:img.cover-thumb@src',
    },
    ruleBookInfo: {
      name: '@css:#bibrec td[itemprop=headline]@text',
      author: '@css:#bibrec a[itemprop=creator]@text',
      tocUrl: '@css:a.read-online-button@href',
    },
    ruleToc: {
      x_splitRegex: '^(第[一二三四五六七八九十百千零〇两0-9０-９]+[回章节卷集部篇](\\s.*|　.*)?|卷[一二三四五六七八九十百千零〇]+.*|(CHAPTER|Chapter|BOOK|Book|PART|Part)\\s+[IVXLCDM0-9]+\\b.*)$',
      x_remove: '#pg-header,#pg-footer,#pg-machine-header,section.pg-boilerplate,.pg-boilerplate,script,style',
    },
    ruleContent: {},
  },
]
