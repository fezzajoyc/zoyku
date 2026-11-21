# LDDGO 语义能力映射批次 1

日期：2026-11-21。读取官方已保存的中英文目录与本地当前源码；本批没有新增网络请求、提交表单或运行同行工具。

复核 **72 个目录条目**：字符 32、图片 22、文件 18。状态为 **existing 22、partial 19、missing 29、not-comparable 1、needs-source 1**。映射涉及 46 个不同的本地 slug、54 个工作流分组；这些数字都不是新增工具数、独立能力总数或完整等价率。

原矩阵的 11 个精确 slug 历史复核全部排除；本批为新的目录 ID 语义复核。复用原 120 页分层样本中的 7 对 / 14 页元数据；它们仍是原抽样证据，不增加抓取覆盖率，也不升级为控件或运行时证据。

所有条目的证据等级为 `E1-directory-and-local-source`：同行功能范围取自官方已保存的目录声明，本地功能取自实际引擎、注册参数和源码锚点。`existing` 只表示目录所述核心任务已可用，完整参数、结果、格式、速度、隐私、SEO 和无障碍均未证实等价。72 行的 `same_input_status` 均为 `unverified`。

## 优先处理的工作流

1. **先修正覆盖口径。** 图片水平/垂直翻转已在 `rotate-image`；PDF 顺序、删除和旋转已有三个注册入口；图片坐标拾取已在 `image-color-picker`。不应仅因目录名不同再次建内核。
2. **图片/PDF 覆盖层合并排期。** 图片单张与批量水印都缺图片/logo 输入；PDF 水印和盖章也缺任意上传图片覆盖。对应 4 个目录条目（09-017、09-035、10-004、10-012），应先设计共享覆盖层，分别核验旋转、缩放、透明度及 PDF 页范围。
3. **开发者工具按实际语法核对边界。** `json-path-query` 只解析点路径和数组索引；JSON5、JSON Schema 校验/推断/生成、XPath 和 Java/Golang/Python 正则运行时均不能用相邻工具充数。`json-yaml-converter` 注册的是 JSON→YAML，未挂载的反向引擎分支不算已交付。
4. **扩展现有图片引擎。** 批量任意角旋转、JPEG/WebP 的 SVG 缩放输出、图片水印、额外滤镜、DPI 元数据编辑及更广元数据解析应分别定义输入输出契约。通用 `image/*` 接收范围不能作全格式支持证明。
5. **文件工作流是实质缺口。** 通用 ZIP 压缩/解压、批量重命名、文件拆分、字符集检测/转换与魔数类型检测没有注册实现。内部 ZIP 下载、输出文件名 helper、MIME 静态表都不能作为完成证据。
6. **PDF 密码能力保持未完成。** `unlock-pdf` 能检测加密但不会生成解锁产物；没有加密/权限设置能力。`flatten-pdf` 的表单扁平化不能代替加密或解密。PDF 页码的字体/颜色和 PDF 元数据编辑是另外的明确边界。

这些优先级依据可复用内核、明确源码边界与客户端可行性整理；本批没有搜索量、排名或流量证据，实施前仍需目标工作流的同行控件/同输入核验。

## 与并行实现的边界

已读取 `lib/tool-copy.ts`：`unlockCopy`、`imageCompressionCopy`、`jsonCapabilityCopy` 等会覆盖定义文件的原始文案，判断以引擎可达分支、注册 props 和最终能力说明为依据。没有把旧 authored copy 的遗漏自动判成缺能力。

检查时工作树扫描与注册数组有 216 个 slug。父任务正整合 `csv-table-editor` 与 `image-palette-generator`；本批未验证这两个新工具，也未将其或父任务的 Browserling 同输入记录算作本批成果。工作树数量不代表生产发布数量。

## 逐行索引

| 目录 ID | 中英文目录名称 | 状态 | 本地工作流 slug | 分组 |
| --- | --- | --- | --- | --- |
| [LDDGO-01-001](#lddgo-01-001) | Java正则表达式测试 / Java Regular Expression Test | `missing` | — | `regex-runtime` |
| [LDDGO-01-002](#lddgo-01-002) | JavaScript正则表达式测试 / JavaScript Regular Expression Test | `existing` | `regex-tester`, `find-and-replace` | `js-regex` |
| [LDDGO-01-003](#lddgo-01-003) | Golang正则表达式在线测试 / Golang Regular Expression Test Online | `missing` | — | `regex-runtime` |
| [LDDGO-01-004](#lddgo-01-004) | Python正则表达式在线测试 / Python Regular Expression Test Online | `missing` | — | `regex-runtime` |
| [LDDGO-01-007](#lddgo-01-007) | 字符串长度计算 / String Length Calculation | `existing` | `character-counter`, `word-counter` | `text-count` |
| [LDDGO-01-010](#lddgo-01-010) | 在线JSON5格式化校验 / JSON5 Beautify / Validator Online | `missing` | — | `json5` |
| [LDDGO-01-011](#lddgo-01-011) | 英文大小写转换 / Toggle String Case | `existing` | `case-converter` | `case` |
| [LDDGO-01-013](#lddgo-01-013) | 在线JSON格式化-JSON解析 / JSON Format/JSON Parse Online | `partial` | `json-formatter`, `json-minifier`, `json-validator` | `json-core` |
| [LDDGO-01-015](#lddgo-01-015) | SQL格式化压缩 / SQL Format / Compress | `partial` | `sql-formatter` | `sql` |
| [LDDGO-01-016](#lddgo-01-016) | 在线JSONPath解析器 / JSONPath Evaluator Online | `partial` | `json-path-query` | `jsonpath` |
| [LDDGO-01-017](#lddgo-01-017) | JSON转Java实体类 / JSON to Java Class Converter | `missing` | — | `json-language-emitters` |
| [LDDGO-01-018](#lddgo-01-018) | JSON转C#实体类 / JSON to C# Class Converter | `missing` | — | `json-language-emitters` |
| [LDDGO-01-019](#lddgo-01-019) | JSON转Golang结构体 / JSON to Golang Struct Converter | `missing` | — | `json-language-emitters` |
| [LDDGO-01-025](#lddgo-01-025) | 在线文本增加行号 / Text Add Line Number Online | `missing` | — | `text-lines` |
| [LDDGO-01-026](#lddgo-01-026) | 在线文本筛选工具 / Text Filter Online | `missing` | — | `text-filter` |
| [LDDGO-01-027](#lddgo-01-027) | 在线文本替换工具 / Find and Replace Text Online | `existing` | `find-and-replace` | `text-replace` |
| [LDDGO-01-028](#lddgo-01-028) | 在线文本去重工具 / Duplicate Text Remove Online | `partial` | `remove-duplicate-lines` | `text-dedupe` |
| [LDDGO-01-029](#lddgo-01-029) | 在线Markdown编辑器 / Free Markdown Editor Online | `partial` | `markdown-previewer` | `markdown` |
| [LDDGO-01-030](#lddgo-01-030) | 在线免费SQL测试 / Free SQL Test Online | `not-comparable` | — | `external-sql` |
| [LDDGO-01-032](#lddgo-01-032) | 在线文本比较 / Text Compare Online | `existing` | `text-diff` | `text-diff` |
| [LDDGO-01-034](#lddgo-01-034) | 在线YAML编辑器 / YAML Editor Online | `partial` | `json-yaml-converter` | `yaml` |
| [LDDGO-01-035](#lddgo-01-035) | CSS格式化、压缩 / CSS Beautify and Minify | `partial` | `css-minifier` | `css` |
| [LDDGO-01-036](#lddgo-01-036) | JS格式化、压缩 / JS Beautify and Minify | `partial` | `javascript-minifier` | `javascript` |
| [LDDGO-01-037](#lddgo-01-037) | HTML格式化、压缩 / HTML Beautify and Minify | `existing` | `html-formatter`, `html-minifier` | `html` |
| [LDDGO-01-039](#lddgo-01-039) | 在线文本长度过滤工具 / Text Length Filter Tool Online | `missing` | — | `text-filter` |
| [LDDGO-01-040](#lddgo-01-040) | 在线文本提取工具 / Text Extraction Tool Online | `missing` | — | `text-extraction` |
| [LDDGO-01-041](#lddgo-01-041) | 在线JSON格式解析校验工具 / JSON Format Parsing and Verification Tool Online | `existing` | `json-formatter`, `json-minifier`, `json-validator` | `json-core` |
| [LDDGO-01-042](#lddgo-01-042) | 在线文字反转工具 / Text Reverse Tool Online | `needs-source` | `reverse-text` | `text-reverse` |
| [LDDGO-01-044](#lddgo-01-044) | 在线JSON Schema校验 / JSON Schema Validate Online | `missing` | — | `json-schema` |
| [LDDGO-01-045](#lddgo-01-045) | 在线随机JSON数据生成 / Random JSON Data Generator Online | `missing` | — | `json-schema` |
| [LDDGO-01-046](#lddgo-01-046) | 在线JSON数据生成JSON Schema / Generate JSON Schema Online | `missing` | — | `json-schema` |
| [LDDGO-01-049](#lddgo-01-049) | 在线XPath测试 / XPath Tester Online | `missing` | — | `xpath` |
| [LDDGO-09-003](#lddgo-09-003) | 在线图片压缩工具 / Image Compression Online | `partial` | `image-compressor`, `image-resizer` | `image-compress` |
| [LDDGO-09-007](#lddgo-09-007) | 图片大小裁剪 / Image Crop | `existing` | `crop-image`, `crop-circle-image` | `image-crop` |
| [LDDGO-09-008](#lddgo-09-008) | 在线图片文字识别(OCR) / OCR Online | `partial` | `ocr-image` | `image-ocr` |
| [LDDGO-09-009](#lddgo-09-009) | 在线PDF文字识别 / PDF Text Recognition Online | `existing` | `ocr-pdf` | `pdf-ocr` |
| [LDDGO-09-013](#lddgo-09-013) | 在线图片格式转换 / Image Format Converter Online | `partial` | `convert-image`, `svg-converter` | `image-convert` |
| [LDDGO-09-014](#lddgo-09-014) | 在线制作favicon / Make Favicon Online | `existing` | `favicon-generator` | `favicon` |
| [LDDGO-09-017](#lddgo-09-017) | 在线图片加水印 / Add Watermark to Image Online | `partial` | `watermark-image` | `image-watermark` |
| [LDDGO-09-019](#lddgo-09-019) | 在线图片旋转工具 / Image Rotate Online | `existing` | `rotate-image` | `image-rotate` |
| [LDDGO-09-020](#lddgo-09-020) | 在线镜像翻转图片 / Image Mirror Flip Online | `existing` | `rotate-image` | `image-rotate` |
| [LDDGO-09-021](#lddgo-09-021) | 在线圆角图片生成 / Round Corner Image Generate Online | `existing` | `round-corners-image` | `image-rounded` |
| [LDDGO-09-023](#lddgo-09-023) | 在线图片拼接 / Image Stitching Online | `existing` | `merge-images` | `image-stitch` |
| [LDDGO-09-024](#lddgo-09-024) | 彩色照片转黑白照片 / Convert Color Photos to Black and White Photos | `existing` | `grayscale-image` | `image-filters` |
| [LDDGO-09-032](#lddgo-09-032) | 在线字符图生成 / Image Ascii Converter Online | `missing` | — | `image-ascii` |
| [LDDGO-09-035](#lddgo-09-035) | 在线批量图片添加水印 / Add Watermarks to Batch Images Online | `partial` | `watermark-image` | `image-watermark` |
| [LDDGO-09-036](#lddgo-09-036) | 在线批量修改图片尺寸 / Batch Modify Image Size Online | `existing` | `image-resizer` | `image-resize` |
| [LDDGO-09-037](#lddgo-09-037) | 在线GIF拆分 / GIF Splitter Online | `missing` | — | `gif` |
| [LDDGO-09-039](#lddgo-09-039) | 在线SVG转PNG&JPEG&WEBP / SVG to PNG&JPEG&WEBP Online | `partial` | `svg-converter`, `convert-image` | `image-convert` |
| [LDDGO-09-042](#lddgo-09-042) | 在线批量图片旋转 / Batch Image Rotate Online | `partial` | `rotate-image` | `image-rotate` |
| [LDDGO-09-043](#lddgo-09-043) | 在线图片元数据查看和移除 / View and Remove Image Metadata Online | `partial` | `image-metadata-viewer`, `exif-remover` | `image-metadata` |
| [LDDGO-09-045](#lddgo-09-045) | 在线修改图片DPI / Modify Image DPI Online | `missing` | — | `image-dpi` |
| [LDDGO-09-047](#lddgo-09-047) | 在线图片坐标拾取 / Image Coordinate Picking Online | `existing` | `image-color-picker` | `image-coordinate` |
| [LDDGO-09-048](#lddgo-09-048) | 在线批量图片添加滤镜 / Add Filters to Batch Images Online | `partial` | `grayscale-image` | `image-filters` |
| [LDDGO-10-001](#lddgo-10-001) | 在线ZIP文件解压 / Unzip Files Online | `missing` | — | `zip` |
| [LDDGO-10-002](#lddgo-10-002) | 在线ZIP压缩 / ZIP Compression Online | `missing` | — | `zip` |
| [LDDGO-10-003](#lddgo-10-003) | 在线文本文件拆分 / Text File Split Online | `missing` | — | `file-split` |
| [LDDGO-10-004](#lddgo-10-004) | 在线文件盖章 / Document Stamp Online | `missing` | — | `image-overlays` |
| [LDDGO-10-005](#lddgo-10-005) | 在线PDF文件拆分 / Split PDF Files Online | `existing` | `split-pdf` | `pdf-pages` |
| [LDDGO-10-006](#lddgo-10-006) | 在线PDF合并 / PDF Files Merge Online | `existing` | `merge-pdf` | `pdf-pages` |
| [LDDGO-10-007](#lddgo-10-007) | 在线PDF转图片 / PDF to Image Converter Online | `existing` | `pdf-to-jpg`, `pdf-to-png` | `pdf-raster` |
| [LDDGO-10-009](#lddgo-10-009) | 在线PDF添加页码 / Add Page Numbers to PDF Online | `partial` | `page-numbers-pdf` | `pdf-numbers` |
| [LDDGO-10-010](#lddgo-10-010) | 在线PDF编辑 / PDF Editor Online | `existing` | `rearrange-pdf-pages`, `delete-pdf-pages`, `rotate-pdf` | `pdf-pages` |
| [LDDGO-10-012](#lddgo-10-012) | 在线PDF添加水印 / Add Watermark to PDF Online | `partial` | `watermark-pdf` | `image-overlays` |
| [LDDGO-10-013](#lddgo-10-013) | 在线PDF解密 / PDF Decryption Online | `missing` | — | `pdf-protection` |
| [LDDGO-10-014](#lddgo-10-014) | 在线PDF加密 / PDF Encryption Online | `missing` | — | `pdf-protection` |
| [LDDGO-10-015](#lddgo-10-015) | 在线PDF签名 / PDF Signature Online | `existing` | `sign-pdf` | `pdf-sign` |
| [LDDGO-10-016](#lddgo-10-016) | 在线修改PDF元数据 / Modify PDF Metadata Online | `missing` | — | `pdf-metadata` |
| [LDDGO-10-017](#lddgo-10-017) | 在线批量文件重命名 / Batch File Rename Online | `missing` | — | `batch-rename` |
| [LDDGO-10-021](#lddgo-10-021) | 在线字幕格式转换 / Subtitle Format Converter Online | `missing` | — | `subtitles` |
| [LDDGO-10-022](#lddgo-10-022) | 在线文件编码检测和转换工具 / File Encoding Detect and Convert Online | `missing` | — | `file-charset` |
| [LDDGO-10-023](#lddgo-10-023) | 在线文件类型检测 / File Type Detection Online | `missing` | — | `file-identification` |

## 逐行工作流与证据

### LDDGO-01-001

**Java正则表达式测试 / Java Regular Expression Test — `missing`**

同行：[中文详情](https://www.lddgo.net/string/regex) · [English](https://www.lddgo.net/en/string/regex) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：java正则表达式在线测试，提供java正则表达式在线匹配和替换功能。通过控制参数设置，可以控制正则表达式的行为，比如忽略大小写，多行模式等。

匹配工作流：Nearby regex-tester executes JavaScript RegExp, not Java.

边界：No registered Java regex runtime; syntax, Unicode and replacement behavior cannot be inferred from JavaScript.

下一步（P3）：Keep as distinct runtime dependency; review a browser-compatible runtime before implementation.

相邻但不等价：`regex-tester`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/regex-tester.ts:8](../../tools/developer/regex-tester.ts#L8)；[tools/_engines/dev-engine-regex.tsx:80](../../tools/_engines/dev-engine-regex.tsx#L80)；[tools/_lib/regex.ts:36](../../tools/_lib/regex.ts#L36)。

### LDDGO-01-002

**JavaScript正则表达式测试 / JavaScript Regular Expression Test — `existing`**

同行：[中文详情](https://www.lddgo.net/string/jsregex) · [English](https://www.lddgo.net/en/string/jsregex) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：JavaScript正则表达式(js正则表达式)在线测试，提供JavaScript正则表达式在线匹配和替换功能。通过控制参数设置，可以控制正则表达式的行为，比如忽略大小写，全局模式，多行模式等。

匹配工作流：JavaScript matching with flags/capture groups plus literal or regex replacement in a separate route.

边界：Matching and replacement are split across routes; no claim of identical flags, index rendering or replacement output.

下一步（P2）：Run the same JavaScript patterns and replacement references on both products.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/regex-tester.ts:8](../../tools/developer/regex-tester.ts#L8)；[tools/_engines/dev-engine-regex.tsx:80](../../tools/_engines/dev-engine-regex.tsx#L80)；[tools/text/find-and-replace.ts:5](../../tools/text/find-and-replace.ts#L5)；[tools/_engines/text-engine-findreplace.tsx:38](../../tools/_engines/text-engine-findreplace.tsx#L38)；[tools/_lib/regex.ts:36](../../tools/_lib/regex.ts#L36)；[tools/_engines/text-engine-findreplace.tsx:59](../../tools/_engines/text-engine-findreplace.tsx#L59)。

### LDDGO-01-003

**Golang正则表达式在线测试 / Golang Regular Expression Test Online — `missing`**

同行：[中文详情](https://www.lddgo.net/string/golangregex) · [English](https://www.lddgo.net/en/string/golangregex) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：golang正则表达式在线测试，提供golang正则表达式在线匹配和替换功能。本工具支持golang正则表达式匹配，golang正则表达式拆分字符串，golang正则表达式替换字符串功能。

匹配工作流：Nearby regex-tester executes JavaScript RegExp, not Golang/RE2.

边界：No registered Golang/RE2 regex runtime; syntax, Unicode and replacement behavior cannot be inferred from JavaScript.

下一步（P3）：Keep as distinct runtime dependency; review a browser-compatible runtime before implementation.

相邻但不等价：`regex-tester`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/regex-tester.ts:8](../../tools/developer/regex-tester.ts#L8)；[tools/_engines/dev-engine-regex.tsx:80](../../tools/_engines/dev-engine-regex.tsx#L80)；[tools/_lib/regex.ts:36](../../tools/_lib/regex.ts#L36)。

### LDDGO-01-004

**Python正则表达式在线测试 / Python Regular Expression Test Online — `missing`**

同行：[中文详情](https://www.lddgo.net/string/pythonregex) · [English](https://www.lddgo.net/en/string/pythonregex) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：python正则表达式在线测试，提供python正则表达式在线匹配和替换功能。本工具支持python正则表达式匹配，python正则表达式拆分字符串，python正则表达式替换字符串功能。

匹配工作流：Nearby regex-tester executes JavaScript RegExp, not Python.

边界：No registered Python regex runtime; syntax, Unicode and replacement behavior cannot be inferred from JavaScript.

下一步（P3）：Keep as distinct runtime dependency; review a browser-compatible runtime before implementation.

相邻但不等价：`regex-tester`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/regex-tester.ts:8](../../tools/developer/regex-tester.ts#L8)；[tools/_engines/dev-engine-regex.tsx:80](../../tools/_engines/dev-engine-regex.tsx#L80)；[tools/_lib/regex.ts:36](../../tools/_lib/regex.ts#L36)。

### LDDGO-01-007

**字符串长度计算 / String Length Calculation — `existing`**

同行：[中文详情](https://www.lddgo.net/string/stringlength) · [English](https://www.lddgo.net/en/string/stringlength) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线计算字符串的长度，包含输入字符串中的总字符数，有效字符数(不包含空白字符)，单词数和段落数。

匹配工作流：Count total characters, non-whitespace characters, words and paragraphs.

边界：Local characters use Unicode code points; CJK words are counted per character. Peer counting conventions remain unverified.

下一步（P2）：Same-input check emoji, combining marks, CJK and blank-line paragraphs.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/text/character-counter.ts:5](../../tools/text/character-counter.ts#L5)；[tools/_engines/text-stats.tsx:12](../../tools/_engines/text-stats.tsx#L12)；[tools/text/word-counter.ts:5](../../tools/text/word-counter.ts#L5)；[tools/_lib/transforms.ts:1018](../../tools/_lib/transforms.ts#L1018)；[tools/_lib/transforms.ts:1023](../../tools/_lib/transforms.ts#L1023)。

### LDDGO-01-010

**在线JSON5格式化校验 / JSON5 Beautify / Validator Online — `missing`**

同行：[中文详情](https://www.lddgo.net/string/json5) · [English](https://www.lddgo.net/en/string/json5) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线JSON5格式化校验工具，提供在线JSON5格式校验，JSON5格式化，JSON5数据压缩，JSON5数据美化功能。

匹配工作流：Nearby JSON formatting and validation accept strict JSON.

边界：JSON5 comments, single quotes, unquoted keys and trailing commas are not implemented as JSON5 parsing.

下一步（P2）：Evaluate a JSON5 parser and explicit conversion/preservation policy.

相邻但不等价：`json-formatter`, `json-validator`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/json-formatter.ts:7](../../tools/developer/json-formatter.ts#L7)；[tools/_engines/dev-engine-code.tsx:159](../../tools/_engines/dev-engine-code.tsx#L159)；[tools/developer/json-validator.ts:7](../../tools/developer/json-validator.ts#L7)；[tools/_lib/transforms.ts:419](../../tools/_lib/transforms.ts#L419)；[lib/tool-copy.ts:12](../../lib/tool-copy.ts#L12)。

### LDDGO-01-011

**英文大小写转换 / Toggle String Case — `existing`**

同行：[中文详情](https://www.lddgo.net/string/lowerupper) · [English](https://www.lddgo.net/en/string/lowerupper) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：英文字符大小写转换工具，包含字符大写转小写，小写转大写和大小写反转功能。

匹配工作流：Uppercase, lowercase and inverse case are implemented.

边界：Local inverse case uses character casing rules; no same-text locale or Unicode equivalence result.

下一步（P2）：Compare mixed ASCII, accented text and characters with expanding case mappings.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/text/case-converter.ts:5](../../tools/text/case-converter.ts#L5)；[tools/_engines/case-converter.tsx:38](../../tools/_engines/case-converter.tsx#L38)；[tools/_lib/transforms.ts:140](../../tools/_lib/transforms.ts#L140)。

### LDDGO-01-013

**在线JSON格式化-JSON解析 / JSON Format/JSON Parse Online — `partial`**

同行：[中文详情](https://www.lddgo.net/string/json) · [English](https://www.lddgo.net/en/string/json) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线JSON格式化工具，JSON解析工具，支持在线校验JSON数据格式，格式化JSON数据显示，解析JSON数据，压缩JSON数据，转义JSON数据。JSON数据源支持输入字符串，打开本地文件和打开URL。

匹配工作流：Validate, format and minify JSON through existing separate routes.

边界：No file-open or URL-import UI in DevCodeEngine; the peer directory also promises JSON escaping. Lossless local formatting does not imply complete workflow parity.

下一步（P1）：Prefer source import/export and escape options in existing tools after peer UI verification.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/json-formatter.ts:7](../../tools/developer/json-formatter.ts#L7)；[tools/_engines/dev-engine-code.tsx:159](../../tools/_engines/dev-engine-code.tsx#L159)；[tools/developer/json-minifier.ts:7](../../tools/developer/json-minifier.ts#L7)；[tools/developer/json-validator.ts:7](../../tools/developer/json-validator.ts#L7)；[tools/_engines/dev-engine-code.tsx:161](../../tools/_engines/dev-engine-code.tsx#L161)；[tools/_lib/json-capability-copy.ts:16](../../tools/_lib/json-capability-copy.ts#L16)；[lib/tool-copy.ts:12](../../lib/tool-copy.ts#L12)。

### LDDGO-01-015

**SQL格式化压缩 / SQL Format / Compress — `partial`**

同行：[中文详情](https://www.lddgo.net/string/sql) · [English](https://www.lddgo.net/en/string/sql) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线SQL语句格式化(美化)、压缩工具，支持SQL-2011,MariaDB,MySQL,PostgreSQL,IBM DB2,Oracle PL/SQL,Spark,SQL Server T-SQL等SQL语句的格式化与压缩。

匹配工作流：Format SQL using sql-formatter.

边界：Engine fixes the formatter options; no exposed dialect selection or SQL minification route/control.

下一步（P1）：Verify peer dialect/minifier cases, then extend the existing route instead of duplicating it.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/sql-formatter.ts:8](../../tools/developer/sql-formatter.ts#L8)；[tools/_engines/dev-engine-code.tsx:159](../../tools/_engines/dev-engine-code.tsx#L159)；[tools/_engines/dev-engine-code.tsx:181](../../tools/_engines/dev-engine-code.tsx#L181)。

### LDDGO-01-016

**在线JSONPath解析器 / JSONPath Evaluator Online — `partial`**

同行：[中文详情](https://www.lddgo.net/string/jsonpath) · [English](https://www.lddgo.net/en/string/jsonpath) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：JSONPath在线解析器，提供JSONPath在线运行功能。你可以输入JSON数据，然后使用JSONPath提取JSON中的数据。

匹配工作流：Read a JSON value by simple child/property and numeric array-index path.

边界：jsonQuery tokenizes dot/bracket paths; no wildcard, recursive descent, slices or filter expression evaluator is implemented.

下一步（P1）：Document limited path grammar; decide between full JSONPath support and honest simple-path naming.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/json-path-query.ts:5](../../tools/developer/json-path-query.ts#L5)；[tools/_engines/dev-engine-jsonplus.tsx:21](../../tools/_engines/dev-engine-jsonplus.tsx#L21)；[tools/_lib/jsontool.ts:124](../../tools/_lib/jsontool.ts#L124)；[tools/_lib/jsontool.ts:130](../../tools/_lib/jsontool.ts#L130)。

### LDDGO-01-017

**JSON转Java实体类 / JSON to Java Class Converter — `missing`**

同行：[中文详情](https://www.lddgo.net/string/jsontojava) · [English](https://www.lddgo.net/en/string/jsontojava) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线JSON字符串生成Java实体类，JSON字符串生成JavaBean，JSON字符串生成Java POJO对象，支持智能处理关键字、特殊类名、命名规则检查等特性。

匹配工作流：Nearby JSON code generation emits TypeScript interfaces.

边界：No Java/POJO emitter or target-language identifier/keyword handling is registered. TypeScript is a separate output workflow.

下一步（P2）：Treat Java/POJO as an emitter option within one shared schema-inference kernel if user demand warrants.

相邻但不等价：`json-to-typescript`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/json-to-typescript.ts:5](../../tools/developer/json-to-typescript.ts#L5)；[tools/_engines/dev-engine-jsonplus.tsx:21](../../tools/_engines/dev-engine-jsonplus.tsx#L21)；[tools/_lib/jsontool.ts:54](../../tools/_lib/jsontool.ts#L54)。

### LDDGO-01-018

**JSON转C#实体类 / JSON to C# Class Converter — `missing`**

同行：[中文详情](https://www.lddgo.net/string/jsontocsharp) · [English](https://www.lddgo.net/en/string/jsontocsharp) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线JSON字符串生成C#实体类，JSON字符串生成C#对象，支持智能处理关键字、特殊类名、命名规则检查等特性。

匹配工作流：Nearby JSON code generation emits TypeScript interfaces.

边界：No C# emitter or target-language identifier/keyword handling is registered. TypeScript is a separate output workflow.

下一步（P2）：Treat C# as an emitter option within one shared schema-inference kernel if user demand warrants.

相邻但不等价：`json-to-typescript`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/json-to-typescript.ts:5](../../tools/developer/json-to-typescript.ts#L5)；[tools/_engines/dev-engine-jsonplus.tsx:21](../../tools/_engines/dev-engine-jsonplus.tsx#L21)；[tools/_lib/jsontool.ts:54](../../tools/_lib/jsontool.ts#L54)。

### LDDGO-01-019

**JSON转Golang结构体 / JSON to Golang Struct Converter — `missing`**

同行：[中文详情](https://www.lddgo.net/string/jsontogolang) · [English](https://www.lddgo.net/en/string/jsontogolang) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线JSON字符串生成Golang struct结构体，JSON字符串Golang对象，支持智能处理关键字、特殊类名、命名规则检查等特性。

匹配工作流：Nearby JSON code generation emits TypeScript interfaces.

边界：No Golang struct emitter or target-language identifier/keyword handling is registered. TypeScript is a separate output workflow.

下一步（P2）：Treat Golang struct as an emitter option within one shared schema-inference kernel if user demand warrants.

相邻但不等价：`json-to-typescript`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/json-to-typescript.ts:5](../../tools/developer/json-to-typescript.ts#L5)；[tools/_engines/dev-engine-jsonplus.tsx:21](../../tools/_engines/dev-engine-jsonplus.tsx#L21)；[tools/_lib/jsontool.ts:54](../../tools/_lib/jsontool.ts#L54)。

### LDDGO-01-025

**在线文本增加行号 / Text Add Line Number Online — `missing`**

同行：[中文详情](https://www.lddgo.net/string/text-line) · [English](https://www.lddgo.net/en/string/text-line) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线多行文本增加行号，你可以自定义增加行号的格式，是否对齐，出现在行首或者行尾。

匹配工作流：No registered text line-numbering tool.

边界：Text transforms expose cleaning, sorting, dedupe and reversal; none prepend/append aligned custom line numbering.

下一步（P2）：Add as a text operation only after confirming numbering templates and start/step requirements.

相邻但不等价：`text-cleaner`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/text/text-cleaner.ts:5](../../tools/text/text-cleaner.ts#L5)；[tools/_engines/text-tool.tsx:24](../../tools/_engines/text-tool.tsx#L24)；[tools/_lib/transforms.ts:69](../../tools/_lib/transforms.ts#L69)。

### LDDGO-01-026

**在线文本筛选工具 / Text Filter Online — `missing`**

同行：[中文详情](https://www.lddgo.net/string/text-filter) · [English](https://www.lddgo.net/en/string/text-filter) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线文本筛选工具，使用普通文本、行号或者正则表达式筛选文本中符合规则的行，使用分隔符或者正则表达式提取文本中符合规则的列。

匹配工作流：No registered structured line/column filter.

边界：Find/replace can transform matches, but does not expose retaining lines by text/number/regex and selecting delimiter/regex columns.

下一步（P2）：Group line filters, length filters and extraction in a shared text-processing design.

相邻但不等价：`find-and-replace`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/text/find-and-replace.ts:5](../../tools/text/find-and-replace.ts#L5)；[tools/_engines/text-engine-findreplace.tsx:38](../../tools/_engines/text-engine-findreplace.tsx#L38)；[tools/_engines/text-engine-findreplace.tsx:61](../../tools/_engines/text-engine-findreplace.tsx#L61)。

### LDDGO-01-027

**在线文本替换工具 / Find and Replace Text Online — `existing`**

同行：[中文详情](https://www.lddgo.net/string/text-replace) · [English](https://www.lddgo.net/en/string/text-replace) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线文本查找替换工具，使用普通文本或者正则表达式查询目标文本，然后替换为新的内容。替换内容支持普通文本和正则表达式的反向引用。

匹配工作流：Literal and regex search/replacement with capture references and case sensitivity.

边界：Local regex uses JavaScript; browser timeout and peer replacement syntax were not compared.

下一步（P2）：Compare literal dollar signs, $1 groups, zero-width matches and empty patterns.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/text/find-and-replace.ts:5](../../tools/text/find-and-replace.ts#L5)；[tools/_engines/text-engine-findreplace.tsx:38](../../tools/_engines/text-engine-findreplace.tsx#L38)；[tools/_engines/text-engine-findreplace.tsx:59](../../tools/_engines/text-engine-findreplace.tsx#L59)。

### LDDGO-01-028

**在线文本去重工具 / Duplicate Text Remove Online — `partial`**

同行：[中文详情](https://www.lddgo.net/string/duplicate-remove) · [English](https://www.lddgo.net/en/string/duplicate-remove) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线文本去重工具，去除全局重复的行或者连续重复的行。支持自定义行拆分字符，是否去除行首行尾空白等自定义参数。

匹配工作流：Remove globally duplicate newline-delimited lines, with trim/case/empty options.

边界：No consecutive-only dedupe mode and no user-defined line separator in dedupeLines.

下一步（P2）：Extend the existing tool with explicit global/consecutive mode and delimiter if peer tests support it.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/text/remove-duplicate-lines.ts:5](../../tools/text/remove-duplicate-lines.ts#L5)；[tools/_engines/text-tool.tsx:24](../../tools/_engines/text-tool.tsx#L24)；[tools/_lib/transforms.ts:5](../../tools/_lib/transforms.ts#L5)；[tools/_lib/transforms.ts:11](../../tools/_lib/transforms.ts#L11)。

### LDDGO-01-029

**在线Markdown编辑器 / Free Markdown Editor Online — `partial`**

同行：[中文详情](https://www.lddgo.net/string/markdown-editor) · [English](https://www.lddgo.net/en/string/markdown-editor) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线免费Markdown编辑器，支持CommonMark和GFM规范，支持实时预览。支持导出Markdown,HTML和PDF文件。

匹配工作流：Edit Markdown and display a sanitized live HTML preview; copy generated HTML.

边界：No Markdown/HTML file download or PDF export in the preview engine. Peer CommonMark/GFM conformance is unverified.

下一步（P2）：Verify rendering fixtures, then add export workflows to the existing route.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/markdown-previewer.ts:8](../../tools/developer/markdown-previewer.ts#L8)；[tools/_engines/dev-engine-markdown.tsx:99](../../tools/_engines/dev-engine-markdown.tsx#L99)；[tools/_engines/dev-engine-markdown.tsx:119](../../tools/_engines/dev-engine-markdown.tsx#L119)。

### LDDGO-01-030

**在线免费SQL测试 / Free SQL Test Online — `not-comparable`**

同行：[中文详情](https://sqliteonline.com/) · [English](https://sqliteonline.com/) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线免费SQL测试工具，支持SQLite，MariaDB，PostgreSQL,MS SQL Server数据库。你可以使用SQL脚本创建表格，插入数据，检索数据。

匹配工作流：Directory target is the external sqliteonline.com database workbench.

边界：An external SQL execution service is not a native LDDGO capability and is outside the static formatter comparison.

下一步（P3）：Keep external attribution; do not count it as a missing native LDDGO tool.

相邻但不等价：`sql-formatter`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/sql-formatter.ts:8](../../tools/developer/sql-formatter.ts#L8)；[tools/_engines/dev-engine-code.tsx:159](../../tools/_engines/dev-engine-code.tsx#L159)。

### LDDGO-01-032

**在线文本比较 / Text Compare Online — `existing`**

同行：[中文详情](https://www.lddgo.net/string/text-compare) · [English](https://www.lddgo.net/en/string/text-compare) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线文本比较工具，在线比较两边输入文本的不同之处。也可以用来比较代码的不同之处。

匹配工作流：Compare two text/code inputs and show differences.

边界：Core text diff is implemented; algorithm, whitespace policy and export behavior have not been compared on the same inputs.

下一步（P2）：Test line endings, insert/delete/replace, emoji and large documents.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/text/text-diff.ts:5](../../tools/text/text-diff.ts#L5)；[tools/_engines/text-diff.tsx:32](../../tools/_engines/text-diff.tsx#L32)。

### LDDGO-01-034

**在线YAML编辑器 / YAML Editor Online — `partial`**

同行：[中文详情](https://www.lddgo.net/string/yaml) · [English](https://www.lddgo.net/en/string/yaml) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线YAML编辑器，在线编辑YAML、YML文档，可以复制或者下载编辑后的文档。

匹配工作流：Generate YAML from JSON using js-yaml and copy the result.

边界：The registered route fixes mode=json2yaml; arbitrary YAML editing/validation and YAML download are not provided by this route. An unused yaml2json engine branch is not a registered workflow.

下一步（P1）：Expose deliberate YAML input/edit/validate/export behavior after deciding round-trip limitations.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/json-yaml-converter.ts:5](../../tools/developer/json-yaml-converter.ts#L5)；[tools/_engines/dev-engine-yaml.tsx:17](../../tools/_engines/dev-engine-yaml.tsx#L17)；[tools/developer/json-yaml-converter.ts:8](../../tools/developer/json-yaml-converter.ts#L8)；[tools/_engines/dev-engine-yaml.tsx:32](../../tools/_engines/dev-engine-yaml.tsx#L32)。

### LDDGO-01-035

**CSS格式化、压缩 / CSS Beautify and Minify — `partial`**

同行：[中文详情](https://www.lddgo.net/string/css-beautify-minify) · [English](https://www.lddgo.net/en/string/css-beautify-minify) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线CSS格式化工具、压缩工具，提供一键CSS美化、CSS格式化功能，一键CSS最小化压缩功能。

匹配工作流：Minify CSS with a string-preserving transform.

边界：No CSS beautifier/formatter is registered; peer also declares formatting. Full CSS parser equivalence is unverified.

下一步（P2）：Add formatting to the existing CSS workflow after choosing a parser and semantic fixtures.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/css-minifier.ts:5](../../tools/developer/css-minifier.ts#L5)；[tools/_engines/dev-engine-code.tsx:159](../../tools/_engines/dev-engine-code.tsx#L159)；[tools/_lib/transforms.ts:659](../../tools/_lib/transforms.ts#L659)。

### LDDGO-01-036

**JS格式化、压缩 / JS Beautify and Minify — `partial`**

同行：[中文详情](https://www.lddgo.net/string/js-beautify-minify) · [English](https://www.lddgo.net/en/string/js-beautify-minify) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线JS格式化工具、压缩工具，提供一键JS美化、JS格式化功能，一键JS最小化压缩功能。

匹配工作流：Minify JavaScript while retaining lexical structures in the local transformer.

边界：No JavaScript beautifier/formatter is registered. This is not a bundled optimizing JS compiler/minifier.

下一步（P2）：Define intended syntax coverage and parser-based formatting before expanding the tool.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/javascript-minifier.ts:5](../../tools/developer/javascript-minifier.ts#L5)；[tools/_engines/dev-engine-code.tsx:159](../../tools/_engines/dev-engine-code.tsx#L159)；[tools/_lib/transforms.ts:688](../../tools/_lib/transforms.ts#L688)。

### LDDGO-01-037

**HTML格式化、压缩 / HTML Beautify and Minify — `existing`**

同行：[中文详情](https://www.lddgo.net/string/html-beautify-minify) · [English](https://www.lddgo.net/en/string/html-beautify-minify) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线HTML格式化工具、压缩工具，提供一键HTML美化、HTML格式化功能，一键HTML最小化压缩功能。

匹配工作流：Format and minify HTML through two registered routes.

边界：Local HTML transforms are token based; no proof of semantic equivalence for malformed HTML or embedded script/style across peers.

下一步（P2）：Compare raw-text elements, whitespace-sensitive tags and malformed markup.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/html-formatter.ts:7](../../tools/developer/html-formatter.ts#L7)；[tools/_engines/dev-engine-code.tsx:159](../../tools/_engines/dev-engine-code.tsx#L159)；[tools/developer/html-minifier.ts:5](../../tools/developer/html-minifier.ts#L5)；[tools/_lib/transforms.ts:620](../../tools/_lib/transforms.ts#L620)；[tools/_lib/transforms.ts:626](../../tools/_lib/transforms.ts#L626)。

### LDDGO-01-039

**在线文本长度过滤工具 / Text Length Filter Tool Online — `missing`**

同行：[中文详情](https://www.lddgo.net/string/text-length-filter) · [English](https://www.lddgo.net/en/string/text-length-filter) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线文本长度过滤，筛选每行长度在指定范围内的文本。

匹配工作流：No registered line-length filter.

边界：Text statistics count whole documents and text-sorter sorts by length; neither retains only lines within a selected length interval.

下一步（P2）：Combine with generic text line/column filtering rather than a duplicate count tool.

相邻但不等价：`text-sorter`, `character-counter`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/text/text-sorter.ts:5](../../tools/text/text-sorter.ts#L5)；[tools/_engines/text-sorter.tsx:19](../../tools/_engines/text-sorter.tsx#L19)；[tools/text/character-counter.ts:5](../../tools/text/character-counter.ts#L5)；[tools/_engines/text-stats.tsx:12](../../tools/_engines/text-stats.tsx#L12)；[tools/_lib/transforms.ts:42](../../tools/_lib/transforms.ts#L42)。

### LDDGO-01-040

**在线文本提取工具 / Text Extraction Tool Online — `missing`**

同行：[中文详情](https://www.lddgo.net/string/text-extract) · [English](https://www.lddgo.net/en/string/text-extract) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线文本提取工具，从输入文本中提取手机号，邮箱，IP地址，域名，数字，汉字，邮编等信息。

匹配工作流：No registered extraction workflow for phones, email addresses, IPs, domains, numbers, CJK or postcodes.

边界：Email validation checks an entered address; regex testing exposes raw matching, not the declared typed bulk extraction workflow.

下一步（P2）：Build explicit extractor definitions with regional boundaries and same-input false-positive fixtures.

相邻但不等价：`regex-tester`, `email-validator`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/regex-tester.ts:8](../../tools/developer/regex-tester.ts#L8)；[tools/_engines/dev-engine-regex.tsx:80](../../tools/_engines/dev-engine-regex.tsx#L80)；[tools/security/email-validator.ts:5](../../tools/security/email-validator.ts#L5)；[tools/_engines/sec-engine-email.tsx:247](../../tools/_engines/sec-engine-email.tsx#L247)；[tools/_lib/regex.ts:28](../../tools/_lib/regex.ts#L28)。

历史详情元数据：复用原 120 页样本中的中英文记录；本批未重新请求，没有运行时证据。

### LDDGO-01-041

**在线JSON格式解析校验工具 / JSON Format Parsing and Verification Tool Online — `existing`**

同行：[中文详情](https://www.lddgo.net/string/json-format) · [English](https://www.lddgo.net/en/string/json-format) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线JSON格式解析校验工具，支持JSON格式验证，JSON数据解析和JSON数据压缩功能。

匹配工作流：Strict JSON validation, formatting and minification are implemented.

边界：This is the same local JSON core mapped for directory row 01-013; do not count a second independent capability.

下一步（P2）：Share one same-input JSON core fixture batch for both catalog entries.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/json-formatter.ts:7](../../tools/developer/json-formatter.ts#L7)；[tools/_engines/dev-engine-code.tsx:159](../../tools/_engines/dev-engine-code.tsx#L159)；[tools/developer/json-minifier.ts:7](../../tools/developer/json-minifier.ts#L7)；[tools/developer/json-validator.ts:7](../../tools/developer/json-validator.ts#L7)；[tools/_lib/transforms.ts:399](../../tools/_lib/transforms.ts#L399)；[tools/_lib/transforms.ts:409](../../tools/_lib/transforms.ts#L409)；[tools/_lib/transforms.ts:419](../../tools/_lib/transforms.ts#L419)；[lib/tool-copy.ts:12](../../lib/tool-copy.ts#L12)。

### LDDGO-01-042

**在线文字反转工具 / Text Reverse Tool Online — `needs-source`**

同行：[中文详情](https://www.lddgo.net/string/text-reverse) · [English](https://www.lddgo.net/en/string/text-reverse) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线文字翻转工具，提供文字的逐句前后翻转，或者逐行的上下翻转。

匹配工作流：Reverse Unicode code-point order or reverse line order.

边界：Peer directory says sentence-level front/back reversal and line up/down reversal; its exact sentence segmentation and preservation of newline order need detail/runtime evidence.

下一步（P2）：Read the peer controls and compare multi-line sentences before declaring full coverage.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/text/reverse-text.ts:5](../../tools/text/reverse-text.ts#L5)；[tools/_engines/text-tool.tsx:24](../../tools/_engines/text-tool.tsx#L24)；[tools/_lib/transforms.ts:63](../../tools/_lib/transforms.ts#L63)。

### LDDGO-01-044

**在线JSON Schema校验 / JSON Schema Validate Online — `missing`**

同行：[中文详情](https://www.lddgo.net/string/json-schema) · [English](https://www.lddgo.net/en/string/json-schema) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线JSON Schema校验工具，输入JSON数据和JSON Schema格式，校验JSON数据是否符合Schema定义的格式。

匹配工作流：No registered JSON Schema instance validator.

边界：json-validator checks JSON syntax; schema-markup-generator creates SEO JSON-LD and does not validate a JSON document against JSON Schema.

下一步（P1）：Use a standards validator with declared draft coverage; keep it separate from JSON syntax validation.

相邻但不等价：`json-validator`, `schema-markup-generator`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/json-validator.ts:7](../../tools/developer/json-validator.ts#L7)；[tools/_engines/dev-engine-code.tsx:159](../../tools/_engines/dev-engine-code.tsx#L159)；[tools/seo/schema-markup-generator.ts:5](../../tools/seo/schema-markup-generator.ts#L5)；[tools/_engines/seo-engine-schema.tsx:226](../../tools/_engines/seo-engine-schema.tsx#L226)；[tools/_lib/transforms.ts:419](../../tools/_lib/transforms.ts#L419)。

### LDDGO-01-045

**在线随机JSON数据生成 / Random JSON Data Generator Online — `missing`**

同行：[中文详情](https://www.lddgo.net/string/random-json) · [English](https://www.lddgo.net/en/string/random-json) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：使用JSON Schema定义的格式，随机生成JSON数据。

匹配工作流：No registered generator of test JSON from a JSON Schema.

边界：Random number and identifier tools are not schema-driven object/array generation.

下一步（P2）：Evaluate schema-generator coverage and bounded recursion; share schema infrastructure with validation.

相邻但不等价：`json-to-typescript`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/json-to-typescript.ts:5](../../tools/developer/json-to-typescript.ts#L5)；[tools/_engines/dev-engine-jsonplus.tsx:21](../../tools/_engines/dev-engine-jsonplus.tsx#L21)；[tools/_lib/jsontool.ts:54](../../tools/_lib/jsontool.ts#L54)。

### LDDGO-01-046

**在线JSON数据生成JSON Schema / Generate JSON Schema Online — `missing`**

同行：[中文详情](https://www.lddgo.net/string/generate-json-schema) · [English](https://www.lddgo.net/en/string/generate-json-schema) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线JSON数据生成JSON Schema工具，输入JSON数据或者打开JSON数据文件，从数据中提取对应的JSON Schema。本工具支持JSON Schema Draft-07，Draft-06，Draft-04规范。

匹配工作流：No registered JSON-to-JSON-Schema inference workflow.

边界：json-to-typescript infers TypeScript interfaces only; it does not emit Draft-04/06/07 schema documents.

下一步（P2）：Share inference internals where suitable but define JSON Schema draft and required/nullable policy explicitly.

相邻但不等价：`json-to-typescript`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/json-to-typescript.ts:5](../../tools/developer/json-to-typescript.ts#L5)；[tools/_engines/dev-engine-jsonplus.tsx:21](../../tools/_engines/dev-engine-jsonplus.tsx#L21)；[tools/_lib/jsontool.ts:54](../../tools/_lib/jsontool.ts#L54)。

### LDDGO-01-049

**在线XPath测试 / XPath Tester Online — `missing`**

同行：[中文详情](https://www.lddgo.net/string/xml-xpath) · [English](https://www.lddgo.net/en/string/xml-xpath) · [官方分类](https://www.lddgo.net/base/class?classID=1)。目录声明：在线免费XPath测试工具，输入XML数据或者打开XML文件，使用填写的XPath表达式，遍历XML数据。本工具支持XML命名空间，支持将查询结果下载为文件。

匹配工作流：No registered XPath evaluator.

边界：XML formatting/validation and XML-to-JSON conversion do not evaluate namespace-aware XPath expressions.

下一步（P2）：Evaluate browser DOM XPath support and declare XPath version/namespaces before implementation.

相邻但不等价：`xml-validator`, `xml-to-json`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/xml-validator.ts:7](../../tools/developer/xml-validator.ts#L7)；[tools/_engines/dev-engine-code.tsx:159](../../tools/_engines/dev-engine-code.tsx#L159)；[tools/developer/xml-to-json.ts:8](../../tools/developer/xml-to-json.ts#L8)；[tools/_engines/dev-engine-xml-to-json.tsx:28](../../tools/_engines/dev-engine-xml-to-json.tsx#L28)；[tools/_lib/transforms.ts:607](../../tools/_lib/transforms.ts#L607)。

### LDDGO-09-003

**在线图片压缩工具 / Image Compression Online — `partial`**

同行：[中文详情](https://www.lddgo.net/image/compress) · [English](https://www.lddgo.net/en/image/compress) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线图片压缩工具，支持PNG，JPG，JPEG，GIF，BMP，WBMP等常见图片格式的在线压缩。你可以通过参数设置，压缩图片的文件大小，压缩图片的像素大小，可免费导出压缩后的图片。

匹配工作流：Re-encode browser-decodable images to reduce bytes and resize pixels through existing routes.

边界：Compression and resizing are separate; local output is PNG/JPEG/WebP/optional AVIF, not the peer format list. Animation is lost and smaller output is not guaranteed.

下一步（P2）：Run same-file static/animated, transparent and malformed format fixtures before extending formats.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/image/image-compressor.ts:5](../../tools/image/image-compressor.ts#L5)；[tools/_engines/image-engine-canvas.tsx:149](../../tools/_engines/image-engine-canvas.tsx#L149)；[tools/image/image-resizer.ts:5](../../tools/image/image-resizer.ts#L5)；[tools/_lib/image-capability-copy.ts:7](../../tools/_lib/image-capability-copy.ts#L7)；[tools/_engines/image-engine-canvas.tsx:260](../../tools/_engines/image-engine-canvas.tsx#L260)；[lib/tool-copy.ts:12](../../lib/tool-copy.ts#L12)。

### LDDGO-09-007

**图片大小裁剪 / Image Crop — `existing`**

同行：[中文详情](https://www.lddgo.net/image/crop) · [English](https://www.lddgo.net/en/image/crop) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线免费图片大小裁剪，可以在线裁剪选取图片的部分区域，下载为新的图片。裁剪支持矩形裁剪和圆形裁剪，支持自定义选取区域大小。

匹配工作流：Free/numeric rectangle crops and centered circle crops are available.

边界：Rectangle and centered-circle crops are in separate routes. The local circle uses a centered diameter/shrink control; the peer directory does not establish movable-circle selection, so no unsupported peer advantage is inferred.

下一步（P2）：Inspect the peer circle selection controls and compare identical rectangle/circle fixtures before adding crop options.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/image/crop-image.ts:5](../../tools/image/crop-image.ts#L5)；[tools/_engines/image-engine-crop.tsx:62](../../tools/_engines/image-engine-crop.tsx#L62)；[tools/image/crop-circle-image.ts:5](../../tools/image/crop-circle-image.ts#L5)；[tools/_engines/image-engine-circle.tsx:43](../../tools/_engines/image-engine-circle.tsx#L43)。

### LDDGO-09-008

**在线图片文字识别(OCR) / OCR Online — `partial`**

同行：[中文详情](https://www.lddgo.net/ai/image/ocr) · [English](https://www.lddgo.net/en/ai/image/ocr) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线图片文字识别工具，支持对图片中的文字进行检测和识别，支持中文简体/繁体、英语、日语、阿拉伯语、俄语、德语、法语、西班牙语和印度语等多种语言的文字识别。

匹配工作流：Recognize a local image using on-demand Tesseract and download/copy text.

边界：Local language picker has eng/chi_sim/jpn/spa/por/fra/deu; no chi_tra/ara/rus/hin. Images are downscaled to a 2400px long edge and model downloads require network. Peer accuracy is unverified.

下一步（P2）：Prioritize missing language models only after language-specific same-image fixtures.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/image/ocr-image.ts:5](../../tools/image/ocr-image.ts#L5)；[tools/_engines/image-engine-ocr.tsx:22](../../tools/_engines/image-engine-ocr.tsx#L22)；[tools/_engines/pdf-locales.ts:61](../../tools/_engines/pdf-locales.ts#L61)；[tools/_engines/image-engine-ocr.tsx:20](../../tools/_engines/image-engine-ocr.tsx#L20)。

### LDDGO-09-009

**在线PDF文字识别 / PDF Text Recognition Online — `existing`**

同行：[中文详情](https://www.lddgo.net/ai/image/pdf-ocr) · [English](https://www.lddgo.net/en/ai/image/pdf-ocr) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线PDF文字识别工具，支持对PDF文件中的文字进行检测和识别，本工具识别准确率高，服务性能稳定。

匹配工作流：Render PDF pages and OCR them locally to copyable/downloadable text.

边界：Outputs plain text rather than a searchable PDF; CDN engine/model loads are required. Peer accuracy/performance marketing is not evidence.

下一步（P2）：Compare a selectable-text PDF and a scanned multilingual fixture, including page ranges.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/pdf/ocr-pdf.ts:5](../../tools/pdf/ocr-pdf.ts#L5)；[tools/_engines/pdf-engine-ocr.tsx:16](../../tools/_engines/pdf-engine-ocr.tsx#L16)；[tools/_engines/pdf-engine-ocr.tsx:74](../../tools/_engines/pdf-engine-ocr.tsx#L74)。

### LDDGO-09-013

**在线图片格式转换 / Image Format Converter Online — `partial`**

同行：[中文详情](https://www.lddgo.net/convert/image-format) · [English](https://www.lddgo.net/en/convert/image-format) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线图片格式转换工具，支持jpg,jpeg,png,gif,webp,svg等图片格式之间互相转换。

匹配工作流：Convert browser-decodable raster images and render SVG to raster.

边界：No GIF encoder, SVG vector-output conversion or animation preservation. Accept=image/* is not proof of input decoding coverage.

下一步（P2）：Keep format matrix separate by input decoder, output encoder, transparency and animation.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/image/convert-image.ts:5](../../tools/image/convert-image.ts#L5)；[tools/_engines/image-engine-canvas.tsx:149](../../tools/_engines/image-engine-canvas.tsx#L149)；[tools/image/svg-converter.ts:5](../../tools/image/svg-converter.ts#L5)；[tools/_engines/image-engine-svg.tsx:102](../../tools/_engines/image-engine-svg.tsx#L102)；[tools/_engines/image-engine-canvas.tsx:250](../../tools/_engines/image-engine-canvas.tsx#L250)；[tools/_engines/image-engine-svg.tsx:154](../../tools/_engines/image-engine-svg.tsx#L154)。

### LDDGO-09-014

**在线制作favicon / Make Favicon Online — `existing`**

同行：[中文详情](https://www.lddgo.net/common/make-favicon) · [English](https://www.lddgo.net/en/common/make-favicon) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线制作favicon工具，支持上传jpg,jpeg,png,webp等格式的图片，制作网站使用的favicon图标。

匹配工作流：Upload an image and produce downloadable favicon PNG sizes plus ZIP.

边界：Local generator emits six PNG sizes; the peer directory does not establish its ICO support, so ICO parity remains unknown.

下一步（P2）：Inspect actual peer downloads and compare dimensions/MIME before adding ICO.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/image/favicon-generator.ts:5](../../tools/image/favicon-generator.ts#L5)；[tools/_engines/image-engine-favicon.tsx:135](../../tools/_engines/image-engine-favicon.tsx#L135)；[tools/_engines/image-engine-favicon.tsx:17](../../tools/_engines/image-engine-favicon.tsx#L17)。

历史详情元数据：复用原 120 页样本中的中英文记录；本批未重新请求，没有运行时证据。

### LDDGO-09-017

**在线图片加水印 / Add Watermark to Image Online — `partial`**

同行：[中文详情](https://www.lddgo.net/image/watermark) · [English](https://www.lddgo.net/en/image/watermark) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线图片加水印工具，支持给图片添加文字水印和图片水印。

匹配工作流：Apply a text watermark to one image or a batch with position, size, opacity and tiling.

边界：No image/logo watermark input; both LDDGO single and batch directory entries declare text and image watermarks.

下一步（P1）：One shared image/logo watermark enhancement can address both catalog entries; verify rotation/scale requirements first.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/image/watermark-image.ts:5](../../tools/image/watermark-image.ts#L5)；[tools/_engines/image-engine-watermark.tsx:23](../../tools/_engines/image-engine-watermark.tsx#L23)；[tools/_engines/image-engine-watermark.tsx:26](../../tools/_engines/image-engine-watermark.tsx#L26)；[tools/_engines/image-engine-watermark.tsx:75](../../tools/_engines/image-engine-watermark.tsx#L75)。

### LDDGO-09-019

**在线图片旋转工具 / Image Rotate Online — `existing`**

同行：[中文详情](https://www.lddgo.net/image/rotate) · [English](https://www.lddgo.net/en/image/rotate) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线图片旋转工具，支持顺时针或者逆时针旋转图片，支持jpg,jpeg,png,webp,bmp等格式的图片。

匹配工作流：Rotate browser-decodable images clockwise/counterclockwise by quarter turns.

边界：No arbitrary angle control; directory row 09-019 only promises clockwise/counterclockwise rotation. Supported input formats remain browser-dependent.

下一步（P2）：Compare a non-square fixture, dimensions and orientation metadata.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/image/rotate-image.ts:5](../../tools/image/rotate-image.ts#L5)；[tools/_engines/image-engine-canvas.tsx:149](../../tools/_engines/image-engine-canvas.tsx#L149)；[tools/_engines/image-engine-canvas.tsx:142](../../tools/_engines/image-engine-canvas.tsx#L142)。

### LDDGO-09-020

**在线镜像翻转图片 / Image Mirror Flip Online — `existing`**

同行：[中文详情](https://www.lddgo.net/image/flip) · [English](https://www.lddgo.net/en/image/flip) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线图片镜像翻转工具，支持左右翻转图片，上下翻转图片。

匹配工作流：Flip images horizontally and vertically inside the existing rotation tool.

边界：This is an option on rotate-image, not a missing standalone flip implementation.

下一步（P1）：Use the existing route for coverage; compare a distinct-corner RGBA fixture.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/image/rotate-image.ts:5](../../tools/image/rotate-image.ts#L5)；[tools/_engines/image-engine-canvas.tsx:149](../../tools/_engines/image-engine-canvas.tsx#L149)；[tools/_engines/image-engine-canvas.tsx:143](../../tools/_engines/image-engine-canvas.tsx#L143)。

### LDDGO-09-021

**在线圆角图片生成 / Round Corner Image Generate Online — `existing`**

同行：[中文详情](https://www.lddgo.net/image/round-image) · [English](https://www.lddgo.net/en/image/round-image) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线圆角图片生成工具，上传本地图片，设置圆角大小，生成圆角图片。

匹配工作流：Set corner radius, preview and export a rounded local image.

边界：Radius is capped at half the shorter side; PNG transparency and JPG/background choices are explicit. Peer visual/output parity unverified.

下一步（P2）：Compare radius extremes, transparent pixels and non-square dimensions.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/image/round-corners-image.ts:5](../../tools/image/round-corners-image.ts#L5)；[tools/_engines/image-engine-round.tsx:58](../../tools/_engines/image-engine-round.tsx#L58)；[tools/_engines/image-engine-round.tsx:184](../../tools/_engines/image-engine-round.tsx#L184)。

### LDDGO-09-023

**在线图片拼接 / Image Stitching Online — `existing`**

同行：[中文详情](https://www.lddgo.net/image/stitching-image) · [English](https://www.lddgo.net/en/image/stitching-image) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线图片拼接工具，支持打开多张本地图片，拼接为一张图片。拼接的图片结果支持下载到本地。本地图片格式支持jpg,jpeg,png,webp等。

匹配工作流：Stitch multiple local images horizontally, vertically or in a grid and download PNG.

边界：Images are scaled into layout; local output is PNG. The peer description does not prove matching scale/background/order policy.

下一步（P2）：Compare a mixed-size/alpha fixture and resulting dimensions/order.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/image/merge-images.ts:5](../../tools/image/merge-images.ts#L5)；[tools/_engines/image-engine-merge.tsx:23](../../tools/_engines/image-engine-merge.tsx#L23)；[tools/_engines/image-engine-merge.tsx:10](../../tools/_engines/image-engine-merge.tsx#L10)。

### LDDGO-09-024

**彩色照片转黑白照片 / Convert Color Photos to Black and White Photos — `existing`**

同行：[中文详情](https://www.lddgo.net/image/white-black-image) · [English](https://www.lddgo.net/en/image/white-black-image) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线彩色照片转黑白照片工具，上传彩色照片，一键去除照片色彩，转换为黑白照片。转换后的黑白照片支持下载到本地。

匹配工作流：Convert color images to grayscale files with downloadable JPG or PNG output.

边界：Uses canvas grayscale(1), not a thresholded two-color black/white conversion. Peer algorithm is unverified.

下一步（P2）：Compare known color patches and alpha; separate grayscale from threshold modes.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/image/grayscale-image.ts:5](../../tools/image/grayscale-image.ts#L5)；[tools/_engines/image-engine-grayscale.tsx:11](../../tools/_engines/image-engine-grayscale.tsx#L11)；[tools/_engines/image-engine-grayscale.tsx:42](../../tools/_engines/image-engine-grayscale.tsx#L42)。

### LDDGO-09-032

**在线字符图生成 / Image Ascii Converter Online — `missing`**

同行：[中文详情](https://www.lddgo.net/image/image-ascii-converter) · [English](https://www.lddgo.net/en/image/image-ascii-converter) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线字符图生成工具，将图片转换为ASCII字符图，支持生成彩色和黑白字符图。支持设置大小，使用字符，翻转，背景等字符图参数。

匹配工作流：No registered raster-image-to-ASCII-art workflow.

边界：Fancy-text converts Unicode letter styles; it does not sample image luminance or emit colored/monochrome glyph grids.

下一步（P2）：Treat as a separate client image sampling/text export tool if demand is confirmed.

相邻但不等价：`fancy-text-generator`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/text/fancy-text-generator.ts:5](../../tools/text/fancy-text-generator.ts#L5)；[tools/_engines/text-fancy.tsx:68](../../tools/_engines/text-fancy.tsx#L68)；[tools/_lib/transforms.ts:948](../../tools/_lib/transforms.ts#L948)。

### LDDGO-09-035

**在线批量图片添加水印 / Add Watermarks to Batch Images Online — `partial`**

同行：[中文详情](https://www.lddgo.net/image/batch-watermark) · [English](https://www.lddgo.net/en/image/batch-watermark) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线批量图片添加水印工具，支持给 jpeg, jpg, png, webp 图片添加水印。支持给批量图片添加水印，水印类型支持文字和图片。

匹配工作流：Apply a text watermark to one image or a batch with position, size, opacity and tiling.

边界：No image/logo watermark input; both LDDGO single and batch directory entries declare text and image watermarks.

下一步（P1）：One shared image/logo watermark enhancement can address both catalog entries; verify rotation/scale requirements first.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/image/watermark-image.ts:5](../../tools/image/watermark-image.ts#L5)；[tools/_engines/image-engine-watermark.tsx:23](../../tools/_engines/image-engine-watermark.tsx#L23)；[tools/_engines/image-engine-watermark.tsx:26](../../tools/_engines/image-engine-watermark.tsx#L26)；[tools/_engines/image-engine-watermark.tsx:75](../../tools/_engines/image-engine-watermark.tsx#L75)。

### LDDGO-09-036

**在线批量修改图片尺寸 / Batch Modify Image Size Online — `existing`**

同行：[中文详情](https://www.lddgo.net/image/modify-image-size) · [English](https://www.lddgo.net/en/image/modify-image-size) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线批量修改图片尺寸工具，支持批量打开 jpeg, jpg, png, webp, gif 图片，批量修改图片的大小，修改大小后的图片支持下载到本地。

匹配工作流：Batch resize decoded images in pixels or percent, with aspect lock and downloads.

边界：Local canvas output is static; GIF animation is not preserved. The peer directory lists GIF input but does not establish animation preservation, so this remains a boundary to test rather than a proven peer advantage.

下一步（P2）：Compare still and animated GIF input behavior and resulting dimensions; record whether either workflow preserves animation.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/image/image-resizer.ts:5](../../tools/image/image-resizer.ts#L5)；[tools/_engines/image-engine-canvas.tsx:149](../../tools/_engines/image-engine-canvas.tsx#L149)；[tools/_engines/image-engine-canvas.tsx:235](../../tools/_engines/image-engine-canvas.tsx#L235)；[tools/_engines/image-engine-canvas.tsx:261](../../tools/_engines/image-engine-canvas.tsx#L261)。

### LDDGO-09-037

**在线GIF拆分 / GIF Splitter Online — `missing`**

同行：[中文详情](https://www.lddgo.net/image/gif-splitter) · [English](https://www.lddgo.net/en/image/gif-splitter) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线 GIF 拆分工具，打开 gif 图片，将 gif 图片中的每一帧内容拆分成图片，支持生成 jpeg,png,webp,gif 格式的图片。拆分的图片支持单张和批量下载。

匹配工作流：No registered animated GIF frame decoder/exporter.

边界：image-splitter cuts a spatial grid from one still image; it does not split animation frames.

下一步（P1）：Add a GIF animation decoder only after defining disposal/timing/transparency and memory limits.

相邻但不等价：`image-splitter`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/image/image-splitter.ts:5](../../tools/image/image-splitter.ts#L5)；[tools/_engines/image-engine-splitter.tsx:54](../../tools/_engines/image-engine-splitter.tsx#L54)。

### LDDGO-09-039

**在线SVG转PNG&JPEG&WEBP / SVG to PNG&JPEG&WEBP Online — `partial`**

同行：[中文详情](https://www.lddgo.net/image/svg-format-converter) · [English](https://www.lddgo.net/en/image/svg-format-converter) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线 svg 图片转 png, jpeg, webp 工具，支持将 svg 图片转换为 png, jpeg, webp 等格式。支持设置大小，图片质量等参数，支持批量转换。

匹配工作流：Batch SVG-to-PNG with scale is directly implemented; convert-image can request JPEG/WebP from browser-decodable SVG.

边界：The dedicated svg-converter engine hardcodes PNG. Generic convert-image provides JPEG/WebP/quality for browser-decodable SVG but no resize control, so the declared batch scale-plus-format-plus-quality workflow requires separate steps and is not proven equivalent.

下一步（P1）：Test SVG fixtures via both routes; expose output format/quality directly in svg-converter only after verifying supported encoders.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/image/svg-converter.ts:5](../../tools/image/svg-converter.ts#L5)；[tools/_engines/image-engine-svg.tsx:102](../../tools/_engines/image-engine-svg.tsx#L102)；[tools/image/convert-image.ts:5](../../tools/image/convert-image.ts#L5)；[tools/_engines/image-engine-canvas.tsx:149](../../tools/_engines/image-engine-canvas.tsx#L149)；[tools/_engines/image-engine-svg.tsx:154](../../tools/_engines/image-engine-svg.tsx#L154)；[tools/_engines/image-engine-canvas.tsx:238](../../tools/_engines/image-engine-canvas.tsx#L238)。

### LDDGO-09-042

**在线批量图片旋转 / Batch Image Rotate Online — `partial`**

同行：[中文详情](https://www.lddgo.net/image/batch-image-rotate) · [English](https://www.lddgo.net/en/image/batch-image-rotate) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线批量图片旋转工具，支持批量旋转 jpeg, jpg, webp, png 和 svg 格式的图片。支持任意设置旋转角度，旋转后的图片支持下载到本地。

匹配工作流：Batch quarter-turn rotations and downloads are implemented.

边界：The peer directory explicitly promises arbitrary angles; local integer rot is applied in multiples of 90 degrees.

下一步（P1）：Extend the shared rotation kernel/UI for arbitrary angles and define expanded-canvas/background behavior.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/image/rotate-image.ts:5](../../tools/image/rotate-image.ts#L5)；[tools/_engines/image-engine-canvas.tsx:149](../../tools/_engines/image-engine-canvas.tsx#L149)；[tools/_engines/image-engine-canvas.tsx:142](../../tools/_engines/image-engine-canvas.tsx#L142)。

### LDDGO-09-043

**在线图片元数据查看和移除 / View and Remove Image Metadata Online — `partial`**

同行：[中文详情](https://www.lddgo.net/image/image-metadata) · [English](https://www.lddgo.net/en/image/image-metadata) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线图片元数据查看和移除工具，支持查看和移除图片的 EXIF,GPS,IPTC,XMP,JFIF等多种元数据信息，支持JPEG,JPG,PNG,WEBP,GIF,SVG等多种图片格式。本工具支持批量查看和移除图片元数据。

匹配工作流：Batch inspect image dimensions/basic metadata and JPEG EXIF; re-encode to remove original metadata.

边界：Viewer only calls parseExif for JPEG plus parsePngHeader; broad IPTC/XMP/JFIF multi-format inspection is not established. Remover is canvas re-encoding, not lossless selective metadata removal.

下一步（P1）：Audit parsers and byte-level metadata fixtures before broadening claims.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/image/image-metadata-viewer.ts:5](../../tools/image/image-metadata-viewer.ts#L5)；[tools/_engines/image-engine-metadata.tsx:75](../../tools/_engines/image-engine-metadata.tsx#L75)；[tools/image/exif-remover.ts:5](../../tools/image/exif-remover.ts#L5)；[tools/_engines/image-engine-canvas.tsx:149](../../tools/_engines/image-engine-canvas.tsx#L149)；[tools/_engines/image-engine-metadata.tsx:108](../../tools/_engines/image-engine-metadata.tsx#L108)；[tools/_engines/image-engine-canvas.tsx:284](../../tools/_engines/image-engine-canvas.tsx#L284)。

### LDDGO-09-045

**在线修改图片DPI / Modify Image DPI Online — `missing`**

同行：[中文详情](https://www.lddgo.net/image/modify-dpi) · [English](https://www.lddgo.net/en/image/modify-dpi) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线修改图片DPI工具，支持单个或者批量修改图片的DPI（每英寸点数），支持修改 jpg, jpeg, png, bmp, webp 格式的图片。

匹配工作流：No registered image DPI metadata editor.

边界：Pixel resizing is implemented, but does not expose preserving pixels while changing density metadata to a requested DPI.

下一步（P1）：Add binary-format metadata editing with pixel-byte preservation checks; do not reuse resizing as a false equivalent.

相邻但不等价：`image-resizer`, `image-metadata-viewer`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/image/image-resizer.ts:5](../../tools/image/image-resizer.ts#L5)；[tools/_engines/image-engine-canvas.tsx:149](../../tools/_engines/image-engine-canvas.tsx#L149)；[tools/image/image-metadata-viewer.ts:5](../../tools/image/image-metadata-viewer.ts#L5)；[tools/_engines/image-engine-metadata.tsx:75](../../tools/_engines/image-engine-metadata.tsx#L75)；[tools/_engines/image-engine-canvas.tsx:286](../../tools/_engines/image-engine-canvas.tsx#L286)。

### LDDGO-09-047

**在线图片坐标拾取 / Image Coordinate Picking Online — `existing`**

同行：[中文详情](https://www.lddgo.net/image/coordinate-pick) · [English](https://www.lddgo.net/en/image/coordinate-pick) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线图片坐标拾取工具，在线拾取图片上的位置的像素坐标。

匹配工作流：Click a local image or type pixel coordinates and sample that pixel; coordinates are displayed.

边界：This is a coordinate-picking option in image-color-picker, not an independent coordinate-history/list/export tool. The directory only establishes picking; no extra peer export feature is inferred.

下一步（P2）：Compare coordinate origin, scaled-display mapping, transparent/edge pixels and clamping on the same image.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/image/image-color-picker.ts:5](../../tools/image/image-color-picker.ts#L5)；[tools/_engines/image-engine-color-picker.tsx:59](../../tools/_engines/image-engine-color-picker.tsx#L59)；[tools/_engines/image-engine-color-picker.tsx:68](../../tools/_engines/image-engine-color-picker.tsx#L68)；[tools/_engines/image-engine-color-picker.tsx:183](../../tools/_engines/image-engine-color-picker.tsx#L183)。

### LDDGO-09-048

**在线批量图片添加滤镜 / Add Filters to Batch Images Online — `partial`**

同行：[中文详情](https://www.lddgo.net/image/add-filters-to-image) · [English](https://www.lddgo.net/en/image/add-filters-to-image) · [官方分类](https://www.lddgo.net/base/class?classID=9)。目录声明：在线图片批量添加滤镜工具，支持批量打开jpe,jpeg,png,webp格式的图片，给图片添加灰度，黑白，反转，噪声，马赛克等滤镜。处理后的图片支持下载到本地。

匹配工作流：Batch grayscale filtering is implemented.

边界：Peer directory also declares black/white, inversion, noise and mosaic filters; those filters are not available in the local grayscale engine.

下一步（P1）：One shared filter pipeline can address these modes; lock pixel semantics with fixtures.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/image/grayscale-image.ts:5](../../tools/image/grayscale-image.ts#L5)；[tools/_engines/image-engine-grayscale.tsx:11](../../tools/_engines/image-engine-grayscale.tsx#L11)；[tools/_engines/image-engine-grayscale.tsx:42](../../tools/_engines/image-engine-grayscale.tsx#L42)。

### LDDGO-10-001

**在线ZIP文件解压 / Unzip Files Online — `missing`**

同行：[中文详情](https://www.lddgo.net/file/unzip) · [English](https://www.lddgo.net/en/file/unzip) · [官方分类](https://www.lddgo.net/base/class?classID=10)。目录声明：在线ZIP文件解压工具，在线打开ZIP文件，并进行解压缩，解压后的文件支持下载到本地。

匹配工作流：No registered user ZIP upload/extraction tool.

边界：Internal JSZip packaging of generated results does not provide archive browsing/extraction or malformed-archive handling.

下一步（P1）：Prioritize a bounded client unzip workflow with path and decompressed-size checks.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/_engines/pdf-engine-pages.tsx:422](../../tools/_engines/pdf-engine-pages.tsx#L422)。

### LDDGO-10-002

**在线ZIP压缩 / ZIP Compression Online — `missing`**

同行：[中文详情](https://www.lddgo.net/file/zip) · [English](https://www.lddgo.net/en/file/zip) · [官方分类](https://www.lddgo.net/base/class?classID=10)。目录声明：在线 ZIP 压缩工具，打开文件或者文件夹，在线生成 ZIP 压缩文件。本工具支持文件多选，设置压缩比等参数。

匹配工作流：No registered arbitrary-file/folder ZIP creator.

边界：Internal ZIP downloads package generated tool outputs; they do not expose arbitrary upload/folders or compression-level controls.

下一步（P1）：Share a ZIP input/output foundation with unzip; define folder paths and compression options.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/_engines/pdf-engine-pages.tsx:423](../../tools/_engines/pdf-engine-pages.tsx#L423)。

历史详情元数据：复用原 120 页样本中的中英文记录；本批未重新请求，没有运行时证据。

### LDDGO-10-003

**在线文本文件拆分 / Text File Split Online — `missing`**

同行：[中文详情](https://www.lddgo.net/file/text-file-split) · [English](https://www.lddgo.net/en/file/text-file-split) · [官方分类](https://www.lddgo.net/base/class?classID=10)。目录声明：在线文本文件拆分，打开文本文件，按照文件大小，文字数量，行数，文件个数等方式拆分为多个文件文件，拆分后的文件支持下载到本地。

匹配工作流：No registered text-file splitter by size, characters, lines or number of output files.

边界：Editing or counting text is not a file partition/download workflow; encoding and multibyte boundaries need explicit policy.

下一步（P1）：Share file splitting core but preserve line/character and byte modes separately.

相邻但不等价：`character-counter`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/text/character-counter.ts:5](../../tools/text/character-counter.ts#L5)；[tools/_engines/text-stats.tsx:12](../../tools/_engines/text-stats.tsx#L12)；[tools/_lib/transforms.ts:1012](../../tools/_lib/transforms.ts#L1012)。

### LDDGO-10-004

**在线文件盖章 / Document Stamp Online — `missing`**

同行：[中文详情](https://www.lddgo.net/file/stamp) · [English](https://www.lddgo.net/en/file/stamp) · [官方分类](https://www.lddgo.net/base/class?classID=10)。目录声明：在线文件盖章工具，打开 pdf 或者图片文件，打开印章图片，将印章盖到文件上。支持设置印章图片的大小、旋转角、透明度等参数，支持设置盖章的文件页数范围。

匹配工作流：Nearby tools create text watermarks or a newly drawn handwritten PDF signature.

边界：No uploaded stamp-image overlay workflow for both PDF and images, with stamp rotation/opacity/page ranges. A drawn signature is not arbitrary image upload.

下一步（P1）：Reuse an image-overlay kernel across image watermark and PDF stamp, with independent page-range behavior.

相邻但不等价：`sign-pdf`, `watermark-pdf`, `watermark-image`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/pdf/sign-pdf.ts:5](../../tools/pdf/sign-pdf.ts#L5)；[tools/_engines/pdf-engine-sign.tsx:23](../../tools/_engines/pdf-engine-sign.tsx#L23)；[tools/pdf/watermark-pdf.ts:5](../../tools/pdf/watermark-pdf.ts#L5)；[tools/_engines/pdf-engine-watermark.tsx:28](../../tools/_engines/pdf-engine-watermark.tsx#L28)；[tools/image/watermark-image.ts:5](../../tools/image/watermark-image.ts#L5)；[tools/_engines/image-engine-watermark.tsx:23](../../tools/_engines/image-engine-watermark.tsx#L23)；[tools/_engines/pdf-engine-sign.tsx:131](../../tools/_engines/pdf-engine-sign.tsx#L131)；[tools/_engines/pdf-engine-watermark.tsx:73](../../tools/_engines/pdf-engine-watermark.tsx#L73)。

### LDDGO-10-005

**在线PDF文件拆分 / Split PDF Files Online — `existing`**

同行：[中文详情](https://www.lddgo.net/file/pdf-splitter) · [English](https://www.lddgo.net/en/file/pdf-splitter) · [官方分类](https://www.lddgo.net/base/class?classID=10)。目录声明：在线PDF文件拆分工具，支持通过多种方式指定PDF文件页数范围，将一个PDF文件拆分为多个PDF文件。

匹配工作流：Split PDF into groups by every N pages or specified ranges and download individual PDFs/ZIP.

边界：No claim that every peer split mode is identical. Encrypted PDFs are rejected; local memory governs capacity.

下一步（P2）：Use unique-page-width fixtures to compare range semantics and page order.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/pdf/split-pdf.ts:5](../../tools/pdf/split-pdf.ts#L5)；[tools/_engines/pdf-engine-pages.tsx:35](../../tools/_engines/pdf-engine-pages.tsx#L35)；[tools/_engines/pdf-engine-pages.tsx:46](../../tools/_engines/pdf-engine-pages.tsx#L46)；[tools/_engines/pdf-engine-pages.tsx:214](../../tools/_engines/pdf-engine-pages.tsx#L214)。

### LDDGO-10-006

**在线PDF合并 / PDF Files Merge Online — `existing`**

同行：[中文详情](https://www.lddgo.net/file/pdf-merge) · [English](https://www.lddgo.net/en/file/pdf-merge) · [官方分类](https://www.lddgo.net/base/class?classID=10)。目录声明：在线PDF合并工具，将多个PDF文件合并为一个PDF文件，合并后的文件支持下载到本地。

匹配工作流：Merge ordered PDF inputs into one downloadable PDF via copied pages.

边界：Document-level bookmarks/forms/signatures and encrypted inputs are not proven preserved. No same-document peer comparison.

下一步（P2）：Compare page counts, unique page sizes/order and document structures.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/pdf/merge-pdf.ts:5](../../tools/pdf/merge-pdf.ts#L5)；[tools/_engines/pdf-engine-pages.tsx:35](../../tools/_engines/pdf-engine-pages.tsx#L35)；[tools/_engines/pdf-engine-pages.tsx:182](../../tools/_engines/pdf-engine-pages.tsx#L182)。

历史详情元数据：复用原 120 页样本中的中英文记录；本批未重新请求，没有运行时证据。

### LDDGO-10-007

**在线PDF转图片 / PDF to Image Converter Online — `existing`**

同行：[中文详情](https://www.lddgo.net/file/pdf-to-image) · [English](https://www.lddgo.net/en/file/pdf-to-image) · [官方分类](https://www.lddgo.net/base/class?classID=10)。目录声明：在线PDF转图片工具，将打开的PDF文件转换为JPEG和PNG图片，转换后的图片支持下载到本地。

匹配工作流：Render every PDF page to JPG or PNG with resolution options and ZIP output.

边界：Local routes are separate output intents; raster output is not embedded-image extraction. Peer DPI/color/alpha parity unverified.

下一步（P2）：Compare page image MIME, dimensions and color using the same PDF.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/pdf/pdf-to-jpg.ts:5](../../tools/pdf/pdf-to-jpg.ts#L5)；[tools/_engines/pdf-engine-pdf-to-images.tsx:19](../../tools/_engines/pdf-engine-pdf-to-images.tsx#L19)；[tools/pdf/pdf-to-png.ts:5](../../tools/pdf/pdf-to-png.ts#L5)；[tools/_engines/pdf-engine-pdf-to-images.tsx:55](../../tools/_engines/pdf-engine-pdf-to-images.tsx#L55)。

### LDDGO-10-009

**在线PDF添加页码 / Add Page Numbers to PDF Online — `partial`**

同行：[中文详情](https://www.lddgo.net/file/pdf-add-page-number) · [English](https://www.lddgo.net/en/file/pdf-add-page-number) · [官方分类](https://www.lddgo.net/base/class?classID=10)。目录声明：在线PDF文件添加页码工具，打开PDF文件，添加页码。支持设置页码样式，位置，字体，颜色等参数。

匹配工作流：Add numbered page labels with start number, label formats and page positions.

边界：Local font is fixed Helvetica, size 11 and gray color; peer declares font and color configuration.

下一步（P1）：Extend the current numbering UI after verifying Unicode fonts and format controls.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/pdf/page-numbers-pdf.ts:5](../../tools/pdf/page-numbers-pdf.ts#L5)；[tools/_engines/pdf-engine-pagenum.tsx:24](../../tools/_engines/pdf-engine-pagenum.tsx#L24)；[tools/_engines/pdf-engine-pagenum.tsx:58](../../tools/_engines/pdf-engine-pagenum.tsx#L58)；[tools/_engines/pdf-engine-pagenum.tsx:59](../../tools/_engines/pdf-engine-pagenum.tsx#L59)。

### LDDGO-10-010

**在线PDF编辑 / PDF Editor Online — `existing`**

同行：[中文详情](https://www.lddgo.net/file/pdf-editor) · [English](https://www.lddgo.net/en/file/pdf-editor) · [官方分类](https://www.lddgo.net/base/class?classID=10)。目录声明：在线PDF编辑工具，支持编辑PDF页面顺序，删除PDF页面和旋转PDF页面。编辑后的PDF文件支持下载到本地。

匹配工作流：Reorder, delete and rotate PDF pages through three registered tools.

边界：Peer editor is one surface; local tasks are separate routes and cannot be assumed to retain combined unsaved edits.

下一步（P1）：Use shared page fixtures, then decide whether a combined editing surface improves the workflow.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/pdf/rearrange-pdf-pages.ts:5](../../tools/pdf/rearrange-pdf-pages.ts#L5)；[tools/_engines/pdf-engine-pages.tsx:35](../../tools/_engines/pdf-engine-pages.tsx#L35)；[tools/pdf/delete-pdf-pages.ts:5](../../tools/pdf/delete-pdf-pages.ts#L5)；[tools/pdf/rotate-pdf.ts:5](../../tools/pdf/rotate-pdf.ts#L5)；[tools/_engines/pdf-engine-pages.tsx:14](../../tools/_engines/pdf-engine-pages.tsx#L14)。

历史详情元数据：复用原 120 页样本中的中英文记录；本批未重新请求，没有运行时证据。

### LDDGO-10-012

**在线PDF添加水印 / Add Watermark to PDF Online — `partial`**

同行：[中文详情](https://www.lddgo.net/file/pdf-add-watermark) · [English](https://www.lddgo.net/en/file/pdf-add-watermark) · [官方分类](https://www.lddgo.net/base/class?classID=10)。目录声明：在线PDF添加水印工具，支持给PDF添加文字和图片水印。支持设置文字水印的字体、文字大小、颜色、旋转角度等参数，支持设置图片水印的缩放、旋转角度、透明度等参数。

匹配工作流：Apply a text watermark with size/color/opacity and center/tile layout.

边界：No uploaded image watermark; font is fixed HelveticaBold, and angles are fixed by layout rather than freely configured.

下一步（P1）：Reuse an image-overlay kernel with PDF stamping; validate fonts, opacity, page range and angle.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/pdf/watermark-pdf.ts:5](../../tools/pdf/watermark-pdf.ts#L5)；[tools/_engines/pdf-engine-watermark.tsx:28](../../tools/_engines/pdf-engine-watermark.tsx#L28)；[tools/_engines/pdf-engine-watermark.tsx:66](../../tools/_engines/pdf-engine-watermark.tsx#L66)；[tools/_engines/pdf-engine-watermark.tsx:95](../../tools/_engines/pdf-engine-watermark.tsx#L95)。

### LDDGO-10-013

**在线PDF解密 / PDF Decryption Online — `missing`**

同行：[中文详情](https://www.lddgo.net/file/decrypt-pdf) · [English](https://www.lddgo.net/en/file/decrypt-pdf) · [官方分类](https://www.lddgo.net/base/class?classID=10)。目录声明：在线PDF解密工具，在线移除PDF密码和PDF文档限制。

匹配工作流：unlock-pdf can inspect whether a file is encrypted.

边界：PdfProtectEngine returns without creating output for both encrypted and unencrypted unlock cases; it cannot remove a password or permissions.

下一步（P1）：Retain the honest detection limitation. Treat decryption as an unresolved PDF-engine dependency, not completed parity.

相邻但不等价：`unlock-pdf`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/pdf/unlock-pdf.ts:6](../../tools/pdf/unlock-pdf.ts#L6)；[tools/_engines/pdf-engine-protect.tsx:15](../../tools/_engines/pdf-engine-protect.tsx#L15)；[tools/_engines/pdf-engine-protect.tsx:59](../../tools/_engines/pdf-engine-protect.tsx#L59)；[tools/_engines/pdf-engine-protect.tsx:63](../../tools/_engines/pdf-engine-protect.tsx#L63)；[tools/_lib/pdf-capability-copy.ts:6](../../tools/_lib/pdf-capability-copy.ts#L6)；[lib/tool-copy.ts:12](../../lib/tool-copy.ts#L12)。

### LDDGO-10-014

**在线PDF加密 / PDF Encryption Online — `missing`**

同行：[中文详情](https://www.lddgo.net/file/encrypt-pdf) · [English](https://www.lddgo.net/en/file/encrypt-pdf) · [官方分类](https://www.lddgo.net/base/class?classID=10)。目录声明：在线 PDF 加密工具，支持给PDF文件设置密码保护，支持选择不同的加密算法和设置不同的 PDF 保护限制。

匹配工作流：No registered PDF password encryption/permission-setting workflow.

边界：PDF protection engine only offers unlock detection and form flattening; neither encrypts or sets permissions.

下一步（P3）：Evaluate an actual encryption-capable client PDF library and interoperability before scheduling.

相邻但不等价：`unlock-pdf`, `flatten-pdf`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/pdf/unlock-pdf.ts:6](../../tools/pdf/unlock-pdf.ts#L6)；[tools/_engines/pdf-engine-protect.tsx:15](../../tools/_engines/pdf-engine-protect.tsx#L15)；[tools/pdf/flatten-pdf.ts:5](../../tools/pdf/flatten-pdf.ts#L5)；[tools/_engines/pdf-engine-protect.tsx:12](../../tools/_engines/pdf-engine-protect.tsx#L12)；[lib/tool-copy.ts:12](../../lib/tool-copy.ts#L12)。

历史详情元数据：复用原 120 页样本中的中英文记录；本批未重新请求，没有运行时证据。

### LDDGO-10-015

**在线PDF签名 / PDF Signature Online — `existing`**

同行：[中文详情](https://www.lddgo.net/file/pdf-signature) · [English](https://www.lddgo.net/en/file/pdf-signature) · [官方分类](https://www.lddgo.net/base/class?classID=10)。目录声明：在线PDF签名工具，在线给PDF文件添加手写签名，签名后的PDF文件支持下载到本地。

匹配工作流：Draw a handwritten signature, place its PNG representation on selected PDF pages and download.

边界：This is a visual handwritten signature, not a cryptographic/digital certificate signature. No peer same-output or legal validity claim.

下一步（P2）：Compare trim, page ranges, placement and output page geometry.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/pdf/sign-pdf.ts:5](../../tools/pdf/sign-pdf.ts#L5)；[tools/_engines/pdf-engine-sign.tsx:23](../../tools/_engines/pdf-engine-sign.tsx#L23)；[tools/_engines/pdf-engine-sign.tsx:142](../../tools/_engines/pdf-engine-sign.tsx#L142)。

### LDDGO-10-016

**在线修改PDF元数据 / Modify PDF Metadata Online — `missing`**

同行：[中文详情](https://www.lddgo.net/file/modify-pdf-metadata) · [English](https://www.lddgo.net/en/file/modify-pdf-metadata) · [官方分类](https://www.lddgo.net/base/class?classID=10)。目录声明：在线修改PDF元数据工具，支持修改PDF文件的标题，作者，主题，时间等元数据信息，修改元数据后的PDF文件支持下载到本地。

匹配工作流：No registered PDF metadata editor for title, author, subject or timestamps.

边界：Image metadata viewing and EXIF removal do not edit a PDF Info/XMP record.

下一步（P1）：Add a client PDF metadata editor with explicit Info/XMP/timezone semantics and read-back checks.

相邻但不等价：`image-metadata-viewer`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/image/image-metadata-viewer.ts:5](../../tools/image/image-metadata-viewer.ts#L5)；[tools/_engines/image-engine-metadata.tsx:75](../../tools/_engines/image-engine-metadata.tsx#L75)；[tools/pdf/index.ts:29](../../tools/pdf/index.ts#L29)。

### LDDGO-10-017

**在线批量文件重命名 / Batch File Rename Online — `missing`**

同行：[中文详情](https://www.lddgo.net/file/batch-file-rename) · [English](https://www.lddgo.net/en/file/batch-file-rename) · [官方分类](https://www.lddgo.net/base/class?classID=10)。目录声明：在线批量文件重命名工具，支持打开任意大小和数量的文件，使用替换，序号，大小写，正则替换等多种规则批量重命名文件。重命名后的文件支持打包下载和单个下载。

匹配工作流：No registered arbitrary-file batch renamer.

边界：Tool-generated outputName helpers are not a user rule/regex/sequence rename workflow with ZIP/single downloads.

下一步（P1）：Use a previewable rules pipeline and collision policy; share ZIP export foundation.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/_engines/image-util.ts:71](../../tools/_engines/image-util.ts#L71)。

### LDDGO-10-021

**在线字幕格式转换 / Subtitle Format Converter Online — `missing`**

同行：[中文详情](https://www.lddgo.net/file/subtitle-format-convert) · [English](https://www.lddgo.net/en/file/subtitle-format-convert) · [官方分类](https://www.lddgo.net/base/class?classID=10)。目录声明：在线字幕格式转换，支持字幕格式 lrc,srt,vtt,sbv,ass,ssa,sub,scc,stl,ttml,itt 互相转换，支持批量转换。字幕格式转换支持设置字符集编码等参数。

匹配工作流：No registered subtitle-format converter in the Zoyku registry.

边界：The workspace may contain other sites; capabilities of another brand are not credited to this site. No LRC/SRT/VTT/ASS/etc conversion is registered here.

下一步（P1）：Evaluate format loss/timing/charset contract; avoid claiming cross-format round-trip equivalence.

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/media/index.ts:3](../../tools/media/index.ts#L3)。

### LDDGO-10-022

**在线文件编码检测和转换工具 / File Encoding Detect and Convert Online — `missing`**

同行：[中文详情](https://www.lddgo.net/file/file-encoding-detect-convert) · [English](https://www.lddgo.net/en/file/file-encoding-detect-convert) · [官方分类](https://www.lddgo.net/base/class?classID=10)。目录声明：在线文件编码检测和转换工具，在线检测文本文件的字符集编码，支持文本文件的字符集编码互相转换。支持 utf-8,utf-16,utf-32,ascii,gbk,gb12030 等多种字符集编码。

匹配工作流：No registered text-file charset detection and conversion workflow.

边界：Base64/text codecs handle UTF-8-style data in existing tools; they do not detect or transcode arbitrary legacy-encoded files.

下一步（P1）：Declare supported charset set and uncertain detection results; preserve BOM/newline handling.

相邻但不等价：`base64-encoder`, `base64-decoder`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/developer/base64-encoder.ts:5](../../tools/developer/base64-encoder.ts#L5)；[tools/_engines/dev-engine-encoder.tsx:73](../../tools/_engines/dev-engine-encoder.tsx#L73)；[tools/developer/base64-decoder.ts:5](../../tools/developer/base64-decoder.ts#L5)；[tools/_lib/base64-file.ts:8](../../tools/_lib/base64-file.ts#L8)。

历史详情元数据：复用原 120 页样本中的中英文记录；本批未重新请求，没有运行时证据。

### LDDGO-10-023

**在线文件类型检测 / File Type Detection Online — `missing`**

同行：[中文详情](https://www.lddgo.net/file/file-type-detect) · [English](https://www.lddgo.net/en/file/file-type-detect) · [官方分类](https://www.lddgo.net/base/class?classID=10)。目录声明：在线文件类型检测，支持检测数百种二进制文件的格式。支持批量检测文件格式，检测结果支持下载到本地。

匹配工作流：mime-types searches a static extension/MIME table.

边界：No file upload/magic-byte sniffing, batch detection or downloadable detection report is implemented by that tool.

下一步（P1）：Implement actual bounded byte signatures and clearly separate extension hints from content detection.

相邻但不等价：`mime-types`。

源码：[tools/registry.ts:14](../../tools/registry.ts#L14)；[tools/utility/mime-types.ts:5](../../tools/utility/mime-types.ts#L5)；[tools/_engines/util-engine-mime.tsx:10](../../tools/_engines/util-engine-mime.tsx#L10)；[tools/_engines/util-engine-mime.tsx:13](../../tools/_engines/util-engine-mime.tsx#L13)。

## 复核与重放

机器可读数据保留各行的中英文官方目录原文、匹配/相邻 slug、工作流分组、源码路径/行号/摘录/SHA-256 与复用元数据：

- [JSON 报告](2026-11-21-lddgo-semantic-batch1.json)
- [校验和报告生成脚本](../../scripts/research/lddgo-semantic-batch1.py)

```sh
python3 scripts/research/lddgo-semantic-batch1.py --render
python3 scripts/research/lddgo-semantic-batch1.py --check
```

脚本默认只校验；`--render` 只从本批 JSON 重建本批 Markdown，不发网络请求，不修改原 420 行矩阵、中央文档或应用源码。源文件变化会让 SHA-256/行锚点校验失败，要求重新阅读受影响的能力边界。
