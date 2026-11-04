import type { Dictionary } from "../i18n";

const zh: Dictionary = {
  brand: "Zoyku",
  tagline: "所有工具都在你的浏览器里运行。",
  metaDesc:
    "{n} 个免费在线工具:PDF、图片、文本、开发者工具与日常计算。全部在浏览器本地运行——文件不上传,免注册,即开即用。",

  nav: {
    tools: "全部工具",
    categories: "分类",
    about: "关于",
    search: "搜索",
    menu: "菜单",
    language: "语言",
  },

  home: {
    heroTitle: "免费工具,文件永不离开你的设备",
    heroSub:
      "{n} 个覆盖 PDF、图片、文本、代码与日常计算的工具。全部在浏览器本地运行——快、免费、免注册、零上传。",
    browseAll: "浏览全部工具",
    pinned: "置顶",
    pin: "置顶到首页",
    unpin: "取消置顶",
    popular: "大家都在用",
    categoriesTitle: "分类",
    featuredTitle: "热门工具",
    trustLocal: "文件留在你的设备上",
    trustFree: "免费,无需账号",
    trustFast: "即开即用,离线可用",
    rotating: [
      "20 个 PDF 合成一份,不用开会员、不用上传",
      "照片压到四分之一大小,断网也能继续用",
      "合同、扫描件、截图——打开网页就能处理",
      "没有账号、没有水印、没有文件大小限制的弹窗",
    ],
    statsLabels: { tools: "工具", languages: "语言", uploads: "上传", accounts: "账号" },
    eyebrow: "永久免费",
    heroCtaSecondary: "了解工作方式",
    statsTools: "{n} 个工具",
    statsLanguages: "{n} 种语言",
    statsUploads: "0 次上传",
    statsAccounts: "0 个账号",
    categoriesSub: "七大类工具,全部在你的设备上运行。",
    popularSub: "大家最常用的工具。",
    privacyTitle: "你的文件,从不离开你的设备。",
    privacySub: "这里没有“上传”这个步骤——工具就是运行在你浏览器里的 JavaScript。这不是政策承诺,而是构造方式。",
    privacyPoint1T: "本地处理",
    privacyPoint1D: "文件通过浏览器 File API 读取,在内存中处理,不对外传输。",
    privacyPoint2T: "没有账号",
    privacyPoint2D: "无需注册、不要邮箱、不留历史,打开即用。",
    privacyPoint3T: "诚实设计",
    privacyPoint3D: "浏览器做不到的事,我们直说,而不是假装做到。",
    privacyLink: "阅读完整隐私说明",
    endTitle: "挑一个工具,打开就能用。",
    endSub: "十五个语言版本,零上传,无需安装。",
    allToolsTitle: "全部工具,一页看全",
    allToolsSub: "完整目录——7 大类 {count} 个工具,全部本地运行。",
    faqs: [
      { q: "Zoyku 真的免费吗?", a: "是的——每个工具都免费,免注册、无水印、不限次数。没有把你真正需要的功能藏在付费墙后面。" },
      { q: "文件会被上传到服务器吗?", a: "不会。每个工具都是运行在浏览器标签页里的 JavaScript:文件通过浏览器自带的 File API 读取、在内存中处理,不会向任何地方传输。" },
      { q: "一共有多少个工具?", a: "7 大类共 {n} 个工具——PDF、图片、文本、开发者、SEO、安全和实用计算,而且每次更新都会增加。" },
      { q: "离线能用吗?", a: "工具页面加载过一次之后,断网也能继续用,因为所有处理都在本地完成;只有第一次打开新工具需要联网取页面。" },
      { q: "需要注册账号吗?", a: "永远不需要。没有注册、没有邮箱、没有历史记录——打开工具就能用。" },
      { q: "支持哪些文件格式?", a: "PDF 系列支持合并、拆分、压缩以及与 Word、JPG 等格式的互转;图片系列支持 HEIC、WebP、PNG、SVG 等。每个工具页都会列明确切支持的格式。" },
    ],

  },

  tools: {
    noResults: "没有匹配的工具。",
    title: "全部工具",
    subtitle: "搜索 {count} 个免费浏览器工具。无需上传,无需注册。",
    filterPlaceholder: "搜索工具…",
    count: "{count} 个工具",
    empty: "没有匹配“{query}”的工具。",
  },

  categories: {
    pdf: { name: "PDF", desc: "合并、拆分、转换、编辑 PDF,全程无需上传到任何服务器。" },
    image: { name: "图片", desc: "压缩、缩放、裁剪、格式转换,直接在浏览器里完成。" },
    text: { name: "文本", desc: "统计、清洗、排序、变换,边输入边出结果。" },
    developer: { name: "开发者", desc: "格式化、编解码、生成器,日常开发随手用。" },
    seo: { name: "SEO", desc: "Meta 标签、结构化数据、SERP 预览等页面级 SEO 助手。" },
    security: { name: "安全", desc: "密码、哈希与查询——都在你的设备上生成与校验。" },
    utility: { name: "实用工具", desc: "单位换算、计算器与日常小工具。" },
  },

  tool: {
    howTo: "使用方法",
    faq: "常见问题",
    related: "相关工具",
    nextStep: "下一步",
    copyLink: "复制链接",
    privacyNote:
      "该工具完全在你的浏览器中运行,数据不会离开你的设备,不会上传到任何服务器。",
    inCategory: "{category}分类下的更多工具",
    backToCategory: "全部{category}工具",
  },

  common: {
    openTool: "打开工具",
    copy: "复制",
    close: "关闭",
    copied: "已复制",
    download: "下载",
    reset: "重置",
    swap: "交换",
    clear: "清空",
    error: "出错了,请检查输入后重试。",
    input: "输入",
    output: "结果",
    settings: "选项",
    dropFiles: "拖拽文件到此处,或点击选择",
    dropFile: "拖拽文件到此处,或点击选择",
    processing: "处理中…",
    fileSize: "大小",
    sample: "试个例子",
    uppercase: "大写",
  },

  unit: {
    from: "从",
    to: "到",
    amount: "数值",
    result: "结果",
    common: "常用换算",
    formula: "公式",
    allUnits: "全部单位",
  },

  text: {
    stats: {
      words: "词数",
      characters: "字符数",
      charsNoSpaces: "不含空格",
      sentences: "句数",
      paragraphs: "段落数",
      lines: "行数",
      readingTime: "阅读时长",
      readingMinutes: "约 {n} 分钟",
      uniqueWords: "不重复词",
      avgWordLen: "平均词长",
      pages: "页数",
      speakingTime: "演讲时长",
      keywordsTitle: "高频词",
      keywordCount: "{count}次({pct}%)",
      avgSentence: "平均句长(词)",
      longestSentence: "最长句(词)",
      readingLevel: "阅读年级",
      limitsTitle: "平台字数限制",
      charsLeft: "剩 {n}",
      charsOver: "超 {n}",
    },
  },

  footer: {
    line: "免费浏览器工具。你在这里做的一切都不会离开你的设备。",
    privacy: "隐私",
    terms: "条款",
    about: "关于",
    badges: "徽章",
    language: "语言",
  },

  badge: {
    title: "Zoyku 徽章",
    desc: "把 Zoyku 徽章放到你的网站、README 或文档里。它会链接回本站,并告诉访问者:这些工具完全在浏览器里运行。",
    voluntary: "嵌入完全出于自愿——喜欢这个项目就挑一枚,无需申请授权。",
    md: "Markdown(README)",
    html: "HTML(网页)",
    thanks: "感谢帮忙传播——每一次嵌入,都让更多人发现尊重自己文件的工具。",
  },

    embed: {
    title: "嵌入这个工具",
    desc: "一行代码把工具放到你的网站——它在访客的浏览器里运行。",
  },

    mcp: {
    title: "MCP 服务器——AI 可调用的工具",
    desc1: "Zoyku 提供 MCP(Model Context Protocol)服务器:Claude、Cursor 等 AI 助手可以直接执行本站的计算器和换算器——同一套经过测试的逻辑,不是重新实现。",
    desc2: "这些工具运行本站的纯函数(单位换算、金融、健康估算、文本处理)。通过 npx 在 AI 客户端所在的机器上执行——不会发送到我们的服务器。",
    toolsTitle: "可执行工具({n} 个)",
    requiresNode: "需要 Node.js 18+。服务器通过 stdio 在本地运行;只有你发起的工具调用会在本机计算。",
    privacy: "需要 Node.js 18+。服务器通过 stdio 在本地运行;只有你发起的工具调用会在本机计算。",
  },

    notFound: {
    title: "页面不存在",
    body: "你要找的工具不存在,去看看全部工具吧。",
    home: "回到首页",
  },
};

export default zh;
