# FreeConvert 目录与页面质量审计

研究日期：2026-11-21（Asia/Shanghai）  
对象：[FreeConvert](https://www.freeconvert.com/)；本报告补充既有 LDDGO、IT-Tools、PDF24、Toolbox365、10015、BeJSON、JSON.cn、Calculator.net、CyberChef、regex101、DevToys 与 Convertio 景观样本。结构化证据见 [JSON 报告](2026-11-21-freeconvert-directory-audit.json)。

## 这次实际采集了什么

FreeConvert 的 `robots.txt` 指向官方 sitemap index。index 当前列出 5 个主 sitemap、博客 sitemap index 和 API sitemap。五个主 sitemap 用 XML 解析完成，得到：

- `100,986` 个 `<loc>`，每个 URL 精确唯一；
- 去掉 15 个语言前缀（默认英文、de、es、fr、pt、it、nl、ja、zh-CN、zh-TW、ko、sv、tr、id、pl）后，得到 `6,752` 个唯一规范化路径；
- 其中 `6,499` 个路径包含 `-to-`，这是转换配对路由的近似分类，不是独立产品能力数；
- 其余路径混有格式介绍页、压缩/裁剪/合并工具、API、时区和单位页。`/time/` 规范化路径有 3,080 个，`/unit/` 有 732 个，不能把它们计入文件转换工具数。

这些数量来自 XML `<loc>` 计数，不采信页面营销文案中的“2000+ conversions”作为独立工具数。sitemap 只证明可索引 URL 规模；它没有证明每条路由的输入、输出、正确性或交互质量。

## 页面质量抽样

首页 `/` 与图片压缩页 `/image-compressor` 均返回 HTTP 200。两页都有自指 canonical、15 个语言 alternate 加 `x-default`、任务型 H1 和 meta description。

首页：

- title：`File Converter - FreeConvert.com`；
- H1：`File Converter`；
- description 声称支持 `2000+` 种转换；这是站方文案，不等同于本报告的 6,752 个路径或独立工具数；
- JSON-LD 类型为 `Organization`、`WebSite`、`WebApplication`。

图片压缩页：

- title：`Image Compressor - FreeConvert.com`；
- H1：`Image Compressor`；
- description 明确写 JPG、PNG、GIF 及“up to 80%”；压缩比例仍属于宣传承诺，未做同文件测量；
- JSON-LD 类型为 `Organization`、`WebSite`、`WebApplication`、`BreadcrumbList`、`HowTo`；
- 页面 HTML 里能看到多文件上传/拖放、格式和大小限制文案，以及任务状态文案，但本轮没有提交用户文件。

浏览器移动抽样（真实公开页面）：

- 视口 `390x844` 时 `document.documentElement.scrollWidth=390`、`document.body.scrollWidth=390`，本次页面级横向溢出检查通过；
- 页面有两个 `input[type=file]`，均支持多文件，`accept` 为 `.jpeg,.jpg,.png,.gif,.webp,.heic`；
- 本轮没有上传本地样本，因此没有把上传控件的产物、进度、失败恢复或网络请求写成已验证能力。

这说明可借鉴的页面分层是：执行页拥有明确输入输出、限制、步骤结构化数据；格式/转换配对页承担长尾发现和内部链接。不能把存在 `HowTo` JSON-LD 直接写成真实可用性或搜索排名证据。

## 隐私与产品取舍

FreeConvert 隐私页是一手声明：用户文件保存在 Amazon Web Services（爱尔兰）的 S3；上传到 FreeConvert 的文件会在 `8 小时`后自动且永久删除；页面还声明仅在授权或法律需要时访问文件。这里是服务端上传产品的政策口径，不是浏览器网络实测。

这与 Zoyku 当前本地浏览器处理路线形成清晰差异：本地工具可继续把“文件不上传”写成可验证的网络行为；若未来引入服务端转换，必须同步改隐私页、失败/重试状态、文件上限、保留期限和基础设施说明，不能沿用本地处理承诺。

## 与本地能力的可执行映射

FreeConvert 的路径层面与本地转换工具有明显重合，尤其是 image compressor、image converter、PDF/图片/音频转换和 crop/merge 类任务。当前只把它们记为待同文件比较：没有双方相同输入、输出 MIME、像素/页面尺寸、元数据、透明度、质量、失败错误或网络行为证据，因此不能声称哪一方更优。

高优先级的对照批次建议为：JPG→PNG、PNG→JPG、图片压缩、PDF→PNG、PNG→PDF、MP4→MP3。每项要记录原文件哈希、输出 MIME、尺寸/页数、元数据保留、透明通道、质量参数、失败提示和下载/清理行为。

## 可执行学习项

1. 保留“执行工具页 + 格式/转换解释页”的 SEO 分层；解释页必须链接到真实可执行路由，不能只做关键词门面。
2. 对每个工具页保持任务型 title、description、H1、自指 canonical、hreflang；有真实步骤时再加 `HowTo`，步骤内容要与界面一致。
3. 为 sitemap 维护增加分类统计和 4xx 巡检：把语言 URL、格式页、配对页、API 页分开统计，避免目录数字污染工具数量。
4. 如果引入上传型能力，公开保留期限、存储地域、删除动作和限制；如果保持本地处理，继续用浏览器网络审计证明没有上传。
5. 抽查移动 320/390px、键盘首焦点、错误/加载/删除状态和结构化数据，但把未实测项目标为 `unverified`。

## 证据边界

本批完成的是 FreeConvert 官方 sitemap、robots、首页、图片压缩页和隐私页的 HTTP/HTML/XML 证据。没有上传用户文件，没有完成双方同文件转换、速度/成本测试、真实读屏或 axe 全量，也没有取得搜索量、排名、流量或转化数据。因此不能据此声称 FreeConvert 或 Zoyku 在整体功能、样式、SEO、无障碍、速度或排名上更优。

## 可复核来源

- [FreeConvert robots.txt](https://www.freeconvert.com/robots.txt)
- [FreeConvert sitemap index](https://www.freeconvert.com/sitemap.xml)
- [FreeConvert 首页](https://www.freeconvert.com/)
- [FreeConvert Image Compressor](https://www.freeconvert.com/image-compressor)
- [FreeConvert Privacy Policy](https://www.freeconvert.com/privacy)
