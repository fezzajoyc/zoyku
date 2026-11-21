# 同行目录扩展批次 3

2026 年 11 月 21 日（北京时间），从 10 个产品的官方页面抽取了 **1,799 个去重目录 URL**，另记录 **452 个 Ezgif sitemap URL**。本批 URL 与既有 Convertio 审计的统计口径分别保存。URL 计数同时包含同一工作流面向不同格式的入口。原始路由、标题、分组、响应体的 SHA-256 和 HTTP 响应信息见 [JSON 快照](2026-11-21-peer-catalog-batch3.json)。

## 官方目录

| 产品和入口 | 匹配的链接次数 | 源内去重 URL | 取样范围 |
| --- | ---: | ---: | --- |
| [Browserling](https://www.browserling.com/tools) | 444 | 345 | 11 个分类的工具链接，跨分类重复合并 |
| [OnlineTools Text](https://onlinetexttools.com/) | 210 | 210 | All tools 卡片 |
| [OnlineTools String](https://onlinestringtools.com/) | 79 | 79 | All tools 卡片 |
| [OnlineTools JSON](https://onlinetools.com/json) | 35 | 35 | All tools 卡片 |
| [OnlineTools Unicode](https://onlinetools.com/unicode) | 54 | 54 | All tools 卡片 |
| [OnlineTools Image](https://onlinetools.com/image) | 167 | 167 | All tools 卡片 |
| [OnlineTools PNG](https://onlinepngtools.com/) | 318 | 318 | All tools 卡片，例如通用裁剪和针对图标、徽标、签名的裁剪入口 |
| [Code Beautify](https://codebeautify.org/) | 357 | 352 | 首页正文的工具按钮 |
| [iLovePDF](https://www.ilovepdf.com/) | 33 | 32 | 首页同站工具卡片 |
| [iLoveIMG](https://www.iloveimg.com/) | 13 | 13 | 首页同站工具卡片 |
| [Text Mechanic](https://textmechanic.com/) | 36 | 36 | 官方导航菜单内的文本工具 |
| [TableConvert](https://tableconvert.com/) | 127 | 90 | 首页正文可达的“格式转格式”配对链接 |
| [CSS Portal](https://www.cssportal.com/css-generators.php) | 43 | 43 | 侧栏中路径以 `-generator` 结尾的链接，例如关键帧、网格和渐变 |
| [WebFX](https://www.webfx.com/tools/) | 25 | 25 | 官方工具页的 `/tools/` 卡片链接 |
| **HTML 合计** | **1,941** | **1,799** | 保留子目录归属，URL 去重使用同源路径 |
| [Ezgif sitemap](https://ezgif.com/sitemap.xml) | 452 | 452 | 316 个路径匹配“格式转格式”，124 个其他路径，12 个导航、资讯或归档 |

在线文本、字符串、JSON、Unicode、图片和 PNG 属于同一个 OnlineTools 产品族。图片与 PNG 目录有语义重叠，例如缩放和彩色提取。Browserling 的单个 URL 可以出现在多个分组，因此 JSON 里的分组数相加会高于它的 345 个去重 URL。TableConvert 的 90 条只覆盖首页能发现的配对，CSS Portal 的 43 条只覆盖所列的路径规则，两个数字都是样本口径。

## 详情抽查

15 个选取的目录链接均返回 200，原始 HTML 均可识别标题、描述和自指 canonical。8 页含 1 个 H1，OnlineTools 的 5 个样本各含 2 个，Browserling 的 2 个样本各含 6 个，其中包含登录等弹层标题。原始 HTML 的计数没有评估标题在浏览器中的可见性。6 页包含 JSON-LD，唯一含 hreflang 的样本是 TableConvert 的 Excel 转 SQL 页，返回 45 个语言链接。完整详情字段见 [JSON 快照](2026-11-21-peer-catalog-batch3.json)。

## 建议进入差距矩阵的条目

| 优先级 | 能力和证据 | Zoyku 对照与同输入验证 |
| --- | --- | --- |
| 维护已完成 | TSV 转 JSON 存在独立查询入口。[OnlineTools TSV 转 JSON](https://onlinetools.com/json/convert-tsv-to-json) | 本地已有 Tab 解析和渲染说明。本轮统一了较旧的工具定义及 15 语翻译源，没有增加解析器或路由。字段内 Tab、引号、换行与前导零的本地浏览器结果见 [TSV 记录](2026-11-21-tsv-browser.json)。同行运行时仍待验证。 |
| P1 | CSV 列互换、表转置有两个具体工作流。[交换列](https://www.browserling.com/tools/csv-swap-columns) · [转置](https://www.browserling.com/tools/csv-columns-to-rows) | 本地 CSV 转换和分隔符内核可复用，目录当前缺少对应的表格编辑操作。先用以逗号、双引号和空格开头的字段，以及列数不齐的行，明确空格保真和缺格处理。 |
| P1 | 从整图找代表色。[图片调色板](https://onlinetools.com/image/find-image-color-palette) · [PNG 调色板](https://onlinepngtools.com/extract-png-color-palette) | 本地 `image-color-picker` 检查一个坐标的像素。整图色板还需定义透明像素、半透明像素及近似颜色合并。用透明块和不同比例的灰、红、近红色块核对输出，再决定是否并入同一工具。 |
| P1 | 从表格生成 SQL INSERT。[TableConvert](https://tableconvert.com/excel-to-sql) | 本地 `sql-formatter` 格式化已有 SQL，`excel-to-csv` 导出表格文本。先明确一个方言和标识符转义规则，用 NULL、空串、引号和多行字段检查生成的文本。 |
| P2 | 拆出动画图像的帧。[Ezgif](https://ezgif.com/split) | 本地 `image-splitter` 以行、列和画布坐标分割图片。动画拆帧需读取帧时间、混合方式与处置规则，先选一种格式验证帧数、像素和导出体积。 |
| P2 | 为动画压到指定文件体积。[Ezgif](https://ezgif.com/target-size-compressor) | 本地 `compress-image-to-size` 已提供按目标大小压缩静态图片的入口。验收动画输出时应检查帧数、总时长及体积上限。 |
| P2 | 可视化编辑关键帧并生成 CSS。[CSS Portal](https://www.cssportal.com/css-animation-generator/) | 本地 `gradient-generator` 仅涉及渐变。若补关键帧，用 0/50/100% 三处属性和首尾一致的样例核对 CSS 和预览。 |
| 待同件测试 | 批量自定义尺寸与 PDF 区域裁剪已有重合入口。[iLoveIMG 批量缩放](https://www.iloveimg.com/resize-image) · [Ezgif 裁切 PDF](https://ezgif.com/crop-pdf) | 核对 `image-resizer` 的多文件、百分比、SVG 与 GIF 范围。核对 `pdf-crop` 在旋转页面、混合 page box 情况下的输出。 |

另有 PDF 修复和 Unicode 拆分的详情证据。PDF 修复有独立的错误恢复语义，需先构造损坏交叉引用和截断的文本流来验证恢复范围。Unicode 拆分应以 ZWJ、组合音标、旗帜等样本确定双方分的是码点还是用户可见字符。来源见 [iLovePDF 修复](https://www.ilovepdf.com/repair-pdf) 和 [OnlineTools Unicode 拆分](https://onlinetools.com/unicode/split-unicode-into-characters)。

本批证据来自公开目录与详情 HTML，完成了 15 个详情 HTTP 抽查和 0 个同输入执行。搜索量、真实上传行为、产物质量、移动布局和键盘表现均待验证。

从仓库根目录可复采集。输出到临时目录可保留此次快照作为对照。

```bash
python3 scripts/research/peer-catalog-batch3.py /tmp/zoyku-peer-catalog-batch3.json
```
