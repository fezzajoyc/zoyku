# Convertio 大型转换目录审计

研究日期：2026-11-21（Asia/Shanghai）  
对象：[Convertio](https://convertio.co/)；本报告是独立于既有 IT-Tools、PDF24、Toolbox365、10015、BeJSON 等景观样本的一批新证据。结构化数据见 [JSON 报告](2026-11-21-convertio-directory-audit.json)。

## 这次实际采集了什么

我抓取了 Convertio 官方 sitemap index 及其 30 个子 sitemap，得到 159,083 个 `<loc>`、158,950 个精确唯一 URL。去掉 16 个语言前缀后，得到 10,886 个唯一规范化路径。这个数字是 URL 路径规模，不是 10,886 个独立工具；其中包含语言、格式介绍页、转换器配对页和 OCR 语言页。

官方 `/formats/` 返回 200，页面有 10 个分类。分类表共 313 个格式行；去掉页面顶部的 9 个分类导航链接后，仍有 313 个分类格式链接。四个 slug（`pdb`、`pes`、`ps`、`svg`）各重复一次，因此得到 309 个唯一格式 slug，与页面“309 different formats”的说法吻合。本记录采用从分类链接独立计算的数量，而非直接采信营销数字。

分类行数为：Archives 23、Audios 62、CAD 1、Documents 23、EBooks 9、Fonts 16、Images 108、Presentations 10、Vectors 20、Videos 41。它说明 Convertio 的核心策略是大量“格式对格式”长尾页面，而不是只有几个通用工具页。

## 页面质量抽样

我对首页、图片转换、文档转换、JPG→PNG、PNG→JPG、DOCX→PDF、MP4→MP3、OCR、格式目录和一个旧 PDF→JPG 地址做了 HTTP 抽样：9 个页面返回 200，`/pdf-jpg/` 返回 410 Resource Gone。

200 页面中，代表性转换页普遍有任务型 title、H1、description、自指 canonical、1 个 JSON-LD 和 41 个 hreflang 标记；OCR 和格式目录有 canonical/hreflang，但没有 JSON-LD。首页返回的 HTML 本轮没有 canonical 和 JSON-LD。`/pdf-jpg/` 的 410 说明长尾目录需要持续做失效路由巡检，不能只看 sitemap 数量。

格式转换页的 HTML 可见多文件选择输入、格式搜索下拉、面包屑和 `aria-label`；全局样式在移动菜单和表格上有响应式规则。这里是静态 HTML/CSS 证据，没有把它写成真实键盘、读屏或 390px 无溢出合规结论。

## 隐私与产品取舍

Convertio 的隐私页声明：输入文件和临时文件在转换后立即删除；输出文件用户点击删除后立即删除，否则 24 小时后自动删除。页面和转换器采用服务端转换流程，和 Zoyku 当前本地 Canvas/PDF 路线不同。这个差异影响 SEO 文案、隐私承诺、文件大小限制、失败重试和基础设施成本：Zoyku 不能为了追目录数量而改成含糊的“安全”宣传。

Convertio 的 `robots.txt` 允许大部分路径，只禁止 `/tmp/`、`/*/tmp/` 和 `/download/`，并指向 sitemap index。它把大量可索引的格式页与下载临时路径分开，这是值得借鉴的索引边界；具体是否适合 Zoyku，要结合本地静态页面和真实下载路由验证。

## 与本地 213 工具的映射

本地 registry 与 Convertio 规范化路径只有两个精确同名 slug：`svg-converter`、`webp-converter`。这不意味着只有两个功能重合，因为命名风格不同。可复核的语义映射包括：

| Convertio 路径 | 本地工具 | 状态 | 当前能说到哪里 |
| --- | --- | --- | --- |
| `/image-converter/` | `convert-image` | `partial` | 大方向重合，格式矩阵和产物尚未同文件比较 |
| `/jpg-png/` | `jpg-to-png` | `partial` | 同名转换，未做双方同文件字节/视觉比较 |
| `/png-jpg/` | `png-to-jpg` | `partial` | 同名转换，有损质量和元数据差异未验证 |
| `/docx-pdf/` | `word-to-pdf` | `partial` | 工作流重合，布局保真度未验证 |
| `/pdf-png/` | `pdf-to-png` | `partial` | 大方向重合，未做同 PDF 像素/元数据比较 |
| `/png-pdf/` | `png-to-pdf` | `partial` | 大方向重合，未比较页面尺寸和 PDF 结构 |
| `/mp4-mp3/` | `extract-audio` | `partial` | 媒体抽取意图重合，编码矩阵未验证 |
| `/ocr/` | `ocr-pdf`、`ocr-image` | `partial` | OCR 工作流重合，语言/引擎/输出保真度未用同文件验证 |

另一个可执行发现是路由维护：Convertio 的 `/pdf-jpg/` 在本次请求中返回 410，而本地有 `pdf-to-jpg`。这不是功能优劣结论，却说明长尾 SEO 目录必须监控 4xx 和 canonical 漂移。

## 可执行学习项

1. 继续保留“工具页 + 解释/格式页”的 SEO 分层：格式页承担发现和内部链接，执行页承担明确输入输出与真实限制。
2. 对本地的图片、PDF、音频转换器做一个同文件批次，记录输出 MIME、尺寸、元数据、透明度、质量和错误态；没有结果前统一标 `unverified`。
3. 为本地 sitemap 做失效路由巡检，尤其关注旧 slug、语言变体、canonical 和 Markdown 答案页是否一致返回 200。
4. 研究 Convertio 的格式矩阵时只吸收目录结构和可验证的页面信息，不机械复制服务端上传模式；本地隐私承诺继续以实际浏览器网络行为为准。

## 证据边界

本批完成的是 Convertio 官方目录、sitemap、robots、隐私说明和 10 页 HTML 元数据抽样。没有上传用户文件，没有运行 Convertio 的同输入转换，也没有完成其全目录逐页键盘/axe/移动审计。因此不能据此声称 Convertio 或 Zoyku 在整体功能、样式、SEO、无障碍、速度或排名上更优。
