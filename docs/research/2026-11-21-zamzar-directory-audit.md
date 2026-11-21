# Zamzar 目录与转换页审计

研究日期：2026-11-21（Asia/Shanghai）  
对象：[Zamzar](https://www.zamzar.com/)；本报告补充 Convertio、FreeConvert 与既有同行景观。结构化证据见 [JSON 报告](2026-11-21-zamzar-directory-audit.json)。

## 目录规模与口径

官方 `sitemap-index.xml` 列出五个 sitemap：`format-to-format`、`format-converter`、`compress`、`other`、`tools`。XML 解析结果如下：

| sitemap | `<loc>` 数 | 精确唯一 URL | 页面角色 |
| --- | ---: | ---: | --- |
| format-to-format | 4,646 | 4,643 | `/convert/source-to-target/` 配对转换页 |
| format-converter | 165 | 165 | `/converters/` 格式目录页 |
| compress | 14 | 14 | 压缩页 |
| other | 19 | 19 | 首页、政策、帮助等 |
| tools | 131 | 131 | OCR/文本等工作流页 |
| **合计** | **4,975** | **4,971** | 4 个 URL 在多个 sitemap 重复 |

`format-to-format-sitemap.xml` 去重后有 `4,643` 条唯一 `/convert/source-to-target/` 路径，均为格式组合页，不应直接称为 4,643 个独立工具。Zamzar 首页文案写“over 1100 file-conversion types supported”，这是站方营销口径；本报告保留 sitemap 的页面类型和去重方法，不用营销数字推导独立能力数。

## 页面与交互抽样

`/convert/png-to-jpg/` 返回 200，HTTP HTML 解析得到：

- title：`PNG to JPG - Convert your PNG to JPG for Free Online`；
- H1：`PNG to JPG`；
- description 直接描述输入格式、输出格式和免费在线任务；
- 有自指 canonical、6 个语言 alternate（en/fr/es/de/ru/it）和 JSON-LD；
- 页面把主任务拆成 Step 1 选择文件、Step 2 选择输出格式、Step 3 Start converting，并提供 `Convert Now`；
- 页面下方有“How to convert a PNG to a JPG file?”三步说明、FAQ、Convert from PNG/Convert to JPG 双向格式内链和相关格式列表；
- 页面有多文件输入。真实浏览器下 `390x844` 的 document/body scrollWidth 都是 390，无页面级横向溢出；一次 Tab 后焦点落在品牌链接（这不是 WCAG 合规结论，也说明它没有像 Zoyku 一样把 Skip link 放在首焦点）。

这些结构值得作为本地转换页的内容质量基线：可执行三步、限制与错误状态、FAQ、输入/输出格式双向内链。不能把页面有 FAQ 或 JSON-LD 直接写成排名、可用性或无障碍优于本地的证据。

## 隐私与产品取舍

Zamzar 隐私页声明：其系统中的转换输出保留不超过 7 天，之后永久从存储系统移除。该页面是政策声明，不是本轮网络行为验证。它与 Zoyku 的本地浏览器处理方式不同，不能互换隐私文案。

## 与本地能力的映射

Zamzar 的 `/convert/png-to-jpg/`、`/convert/png-to-pdf/`、`/convert/pdf-to-jpg/`、`/tools/jpg-to-text/` 等页面与本地图片/PDF/OCR 族存在明显任务重合。当前只把它们记为 `needs_same_input_batch`：没有上传同一文件并比较 MIME、像素/页面尺寸、透明度、元数据、质量、错误和清理行为，因此不能声称谁更优。

高优先级同文件批次：PNG→JPG、PNG→PDF、PDF→JPG、JPG→文本/OCR。服务端上传流程需要同时记录文件保留策略和请求行为；本地路线则要保持“无上传”证据。

## 可执行学习项

1. 转换页采用“任务三步 + FAQ + 双向格式内链”结构，FAQ 只描述界面真实支持的输入、限制和失败恢复。
2. sitemap 账本分开记录配对页、格式目录页、工作流页、压缩页与政策页，避免长尾 URL 数量冒充独立工具数。
3. 每条长尾页都应能回到真实执行页；过期配对页要做 4xx/canonical 巡检。
4. 隐私页明确输出保留期限、删除时点和服务端存储事实；本地工具不复制服务端保留承诺。

## 证据边界

本批完成 Zamzar 官方 sitemap、robots、首页、PNG→JPG 页面和隐私页的 XML/HTML/浏览器抽样。没有上传用户文件，没有完成双方同文件产物、性能、网络或全目录键盘/axe/读屏对照，也没有取得流量、排名或转化数据。因此不能据此声称 Zamzar 或 Zoyku 在整体功能、样式、SEO、无障碍、速度或排名上更优。

## 可复核来源

- [Zamzar robots.txt](https://www.zamzar.com/robots.txt)
- [Zamzar sitemap index](https://www.zamzar.com/sitemap-index.xml)
- [Zamzar 首页](https://www.zamzar.com/)
- [Zamzar PNG to JPG](https://www.zamzar.com/convert/png-to-jpg/)
- [Zamzar Privacy Policy](https://www.zamzar.com/privacy/)
