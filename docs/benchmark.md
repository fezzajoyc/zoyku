# 同行对标报告(2026-10-31)

对标对象:convert.csidehsp.org(直接竞品)、iLovePDF、TinyWow。数据来源:三方 sitemap 全量抓取。

## 一、体量与结构对比

| | convert.csidehsp | iLovePDF | TinyWow | **Zoyku** |
|---|---|---|---|---|
| 工具数 | 123(含自重复) | ~30 | 300+ | **123** |
| 工具页 HTML | 全站同一个 SPA 空壳 | 每页独立 SSR | 每页独立 SSR | **每页独立 SSR** |
| 标题格式 | 全站首页标题 | "Merge PDF - Combine PDF files online for free" | 工具名 | **"{name} — Free, No Upload"(隐私 USP 后缀)** |
| 语言 | 1 | 25+ | 1+机器翻 | **5(人工)** |
| canonical | 全指向首页(自杀式) | 自指 | 自指 | **自指** |
| 文件处理 | 服务器上传 | 服务器上传 | 服务器上传 | **100% 浏览器本地** |
| 结构化数据 | 无 | 有 | 有 | **WebApplication+Breadcrumb+FAQ+ItemList** |
| AI 答案页/.md/llms.txt | 无 | 无 | 无 | **有(600+ .md)** |

核心结论:**我们的单页 SEO 质量与 AEO 配置已是同类最强;短板是域名年纪(0)与外链(≈0)**——按排名公式(域名 40% / 页面 30% / 外链 20% / 词技术 10%),本轮补的是外链引擎(徽章)与页面量(+4 工具),域名爬坡期预计 2–3 个月,期间只执行不慌改。

## 二、本轮从对标吸收并已实现

1. **page-numbers-pdf**(iLovePDF 的 add_pdf_page_number):PDF 加页码,六宫格定位、三种格式、自定义起始号。
2. **watermark-image**(iLovePDF/TinyWow 均有):批量文字水印,九宫格定位 + 平铺模式。
3. **merge-images**(TinyWow combine/collage):2–9 图拼接,横/纵/网格 + 间距背景。
4. **grayscale-image**(TinyWow image/grayscale):批量黑白化。
5. **隐私 USP 进 title**:竞品标题堆 "online free",我们每条结果带 "Free, No Upload / 免费·不上传"。

## 三、对标后判断不做(诚实原则)

- **unlock/protect/repair-pdf**:客户端无法可靠解密与修复损坏 PDF 结构。
- **office↔pdf 高保真互转**(iLovePDF 招牌):浏览器端做不出版式保真,已有 text-focused 版,不再加码。
- **视频/音频转换**(TinyWow 大类):需要 ffmpeg-wasm(30MB+ 下载),v2 评估。
- **电子书转换**(TinyWow azw3/mobi/epub 互转):niche 但可行,v2 候选。
- **AI 写作/AI 检测类**(TinyWow content-machine):需服务端 LLM,违背"无后端"架构,不做。

## 四、外链引擎(本轮上线)

- `/badge/{variant}.svg` shields 风格徽章:5 个通用款 + 7 个分类款(自动带工具数),CORS 全开、强缓存。
- `/{lang}/badge` 嵌入页:预览 + Markdown/HTML 嵌入码一键复制,**自愿嵌入**(红线:不强制署名)。
- 分发路径:README/文档作者 → 嵌徽章 → 每次嵌入 = 一条真实外链(star-history 验证过的模式)。

## 五、后续 SEO 里程碑(按 playbook)

1. 部署后:GSC/Bing/百度提交 + IndexNow 接入 + sitemap 喂食。
2. 上线周:Lighthouse/CrUX 基线(	playbook §2.11)。
3. 目录/榜单提交:各类 "free online tools" 列表、awesome 列表 PR(用徽章页做落地页)。
4. 域名爬坡期(2–3 个月):只执行既定清单 + 记录变更,不反复改版。
