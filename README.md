# Zoyku — 175 个纯浏览器端工具站

对标 convert.csidehsp.org(123 个工具)的出海工具站。每个工具页独立 SEO × 15 语言 + 独立 OG 分享图,全部逻辑在浏览器本地执行,无后端、无上传。同行对标详见 [docs/benchmark.md](docs/benchmark.md)。

## 快速开始

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 全站 1257 页 SSG
npm test           # 注册表完整性 + 文案契约测试
```

## 竞品对比(为什么我们能赢)

| 维度 | convert.csidehsp.org | Zoyku |
|---|---|---|
| 工具页 HTML | 全站同一个 SPA 空壳 | 每页独立 SSR,title/desc/正文全唯一 |
| canonical | 全部指向首页(自封收录) | 每页自指 |
| 结构化数据 | 无 | WebApplication + BreadcrumbList + FAQPage |
| 多语言 | 仅英文 | 5 语(en/zh/ja/es/pt)× hreflang 全套 |
| 文件处理 | 需上传服务器 | 100% 浏览器本地 |
| sitemap 自重复 | 有(uuid×2 等) | 测试强制唯一 |

## 架构(刻意不臃肿)

```
app/[lang]/            # 页面层:home / tools/[slug] / categories/[cat] / .md 答案页
tools/
  registry.ts          # 唯一事实源:sitemap/目录/内链全部派生于此
  _lib/types.ts        # ToolDef + ToolCopy(5 语)契约,vitest 强制
  _engines/            # 共享引擎,一个引擎覆盖一族工具页
  <category>/          # 工具 = 定义文件(引擎接线 + 五语文案)
```

- **一个引擎一族页面**:单位换算引擎 → 10 页;canvas 图像引擎 → 8 页;PDF 页操作引擎 → 5 页。
- **重库全部动态加载**:pdf.js / xlsx / pptxgenjs / heic2any / zxcvbn / qrcode 只在对应工具触发时 `await import()`。SSR HTML 49–67KB(未压缩)。
- **props 必须可序列化**:工具页是服务端组件,函数不可跨越 RSC 边界——文本变换走 `transform-registry.ts` 的 ID 引用。
- **诚实 404**:注册表里没有的 slug 真返回 404。

## SEO 清单(对应 playbook)

- [x] URL 矩阵:119 工具 × 5 语 = 595 工具页,`/{lang}/tools/{slug}`
- [x] hreflang 全套 + x-default + 每页自指 canonical
- [x] sitemap 640 条(含 hreflang alternates);robots.txt 放行 21 家 AI 爬虫
- [x] JSON-LD:WebApplication / BreadcrumbList / FAQPage / WebSite / Organization,出口统一 `\u003c` 转义
- [x] llms.txt + `/{lang}/tools/{slug}.md` AI 答案页(600+ 页,force-static)
- [x] **OG 动态分享图**:171 工具 × 15 语 + 35 分类 + 15 首页 = 2615 张构建期生成(next/og)
- [x] **外链引擎**:`/badge/{variant}.svg` shields 风格徽章(5 通用款 + 7 分类款,CORS 全开)+ `/{lang}/badge` 嵌入页(MD/HTML 一键复制,自愿嵌入)
- [x] **title 隐私 USP 后缀**:"Merge PDF — Free, No Upload | Zoyku"(五语)
- [x] RSS feed(feed.xml:分类集合 + 精选工具)
- [x] 内链三层:首页→分类→工具;工具页 FAQ/步骤/related 互链;分类页全量列表
- [x] proxy.ts 语言协商(`/` → Accept-Language 匹配 → 302)

## 有意跳过的工具(不做假的)

- **unlock/protect-pdf、edit-pdf**:客户端无法可靠加解密 PDF 权限口令
- **excel-to-pdf、ppt-to-pdf**:版式保真做不出来,拒绝"文字凑数版"
- **background-remover、image-upscaler**:需要大模型,列为 v2(wasm 方案)
- **website-speed-test**:v2 接 PageSpeed API
- **broken-link-checker**:浏览器 CORS 决定不可行
- **ssl-checker**:JS 无法读取任意站点证书
- **AI 写作类(11 个)**:竞品的 ai-writer/ai-humanizer 等需要服务端 LLM;按"不编造、不假装"原则整类不做,以 20+ 个新增真工具替代(text-diff、regex-tester、totp、EXIF 系列、slug、UTM、hreflang 生成器等)

## 网络依赖披露(仅 4 个工具)

currency-converter(open.er-api.com 汇率)、email-validator/dns-lookup(DoH 查询)、ip-lookup(ipwho.is)、whois-lookup(RDAP)——UI 内有披露行,FAQ 说明,失败有兜底。其余 115 个工具完全离线可用。

## 已知待办

- [ ] 上线前:域名拍板后改 `lib/site.ts` 的 `SITE.domain` + `NEXT_PUBLIC_SITE_DOMAIN`
- [ ] OG 动态图(每工具)——目前有静态默认卡,v2 用 satori 生成
- [ ] CWV 基线:上线当周跑 Lighthouse/CrUX 记录
- [ ] GSC/必应/IndexNow 接入(部署后)
- [ ] ja/es/pt 文案二轮润色(en/zh 已精修)

## 交互测试记录(2026-10-31,浏览器真实驱动)

用 Playwright 注入真实文件/输入,逐引擎验证过(非仅页面渲染):

- **修复的真 bug**:① 拆分 PDF 页码分组 0 基/1 基混用,`copyPages([-1,0])` 越界,拆分功能自上线起不可用(已修:补 +1,5 页文档按每 2 页一份正确产出 p1-2/p3-4);② 合并等多文件工具选第一个文件后拖放区消失,无法继续添加(已修:多文件操作拖放区常驻,支持单行移除)。
- **数值正确性抽查**:SHA-256("abc")=ba7816bf…、25cm=9.8425197in、EMI(100000/9%/5y)=2075.84、TOTP 出码与 Node 独立 RFC 6238 计算逐位一致、7×8=56、JSON 格式化/正则高亮/词数统计/文本 diff/查找替换计数全部正确。
- **诚实降级抽查**:compress-pdf 对近乎空白的测试 PDF 正确显示"no gain";加密 PDF 有专门文案。
- **范围**:文件注入用 DataTransfer 构造(含字节级合法 PDF 生成器);联网工具(currency/DNS/IP/whois)验证到请求链路,汇率数值依赖运行时网络。
