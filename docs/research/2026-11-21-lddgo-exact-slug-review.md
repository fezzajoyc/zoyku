# LDDGO 精确 slug 候选复核

研究日期：2026-11-21（Asia/Shanghai）

本记录只覆盖 LDDGO 路径末段与 Zoyku registry slug 完全相同的 11 个候选。`slug` 相同只代表 URL 命名相同，不代表功能等价。每一项都读取了 LDDGO 中文/英文详情页的实时 HTML、title/H1/description/keywords，并核对了 Zoyku 对应工具定义与引擎源码。

## 证据边界

- 22 个语言详情页均返回 HTTP 200；页面 title 与 H1 一致，并有 meta description 与 meta keywords。
- 22 个页面均未在返回 HTML 中发现 canonical link 或 JSON-LD 脚本。这个观察不等于页面完全没有其他 SEO 配置，只表示本次抓取的 HTML 没有这些字段。
- 共享 Playwright 浏览器被其他任务占用，本轮无法取得浏览器实例；调用 `browser_tabs(list)` 返回 `Browser is already in use for ... mcp-chrome-9d326eb`。因此 `interaction_tested=false`，没有把页面描述或按钮文案当作同输入运行结果。
- “观察到的控件”来自详情页 HTML 的控件/文案；“本地能力”来自下列 Zoyku 源码文件。没有声称 11 项已经完成同输入、键盘、移动端或无障碍对照。

## 结论总表

| ID | LDDGO 页面 | Zoyku slug | 判断 | 主要差距 |
| --- | --- | --- | --- | --- |
| LDDGO-01-043 | [JSON 视图查看](https://www.lddgo.net/string/json-viewer) | `json-viewer` | **partial** | LDDGO 页面暴露文件打开/下载和压缩动作；本地是树形查看、格式化与复制，未见同等文件工作流。 |
| LDDGO-01-082 | [ULID 生成器](https://www.lddgo.net/string/ulid-generator) | `ulid-generator` | **partial** | LDDGO 有种子时间、单调模式、连接格式和下载；本地有安全随机批量生成与时间解码，但没有同样的选项语义。 |
| LDDGO-01-084 | [JSON 比较](https://www.lddgo.net/string/json-diff) | `json-diff` | **partial** | 两侧输入和差异结果都有；LDDGO 另有每侧文件打开及示例/返回流程。 |
| LDDGO-05-014 | [在线秒表](https://www.lddgo.net/common/stopwatch) | `stopwatch` | **partial** | 本地有开始/暂停/继续/计次/重置；LDDGO 页面声明支持计次下载，本地未见导出控件。 |
| LDDGO-05-071 | [BMR 计算器](https://www.lddgo.net/common/bmr-calculator) | `bmr-calculator` | **partial** | LDDGO 提供四种公式、体脂输入、kcal/kJ 与分享/清空；本地固定 Mifflin-St Jeor，未见公式选择与分享。 |
| LDDGO-07-018 | [GPA 计算器](https://www.lddgo.net/math/gpa-calculator) | `gpa-calculator` | **partial** | 本地支持字母成绩、4.0/5.0、累计成绩混合；LDDGO 页面暴露 100 分制、5 分制、等级输入与加权开关。 |
| LDDGO-07-019 | [百分比计算器](https://www.lddgo.net/math/percentage-calculator) | `percentage-calculator` | **partial** | 本地有三种实时模式；LDDGO HTML 暴露多个百分比输入/结果组，精确模式集合尚未运行验证。 |
| LDDGO-09-015 | [图片颜色提取](https://www.lddgo.net/image/color-picker) | `color-picker` | **partial** | 这是图片上传后取像素颜色；本地同名工具是色板/屏幕取色，没有图片像素采样。 |
| LDDGO-09-016 | [九宫格图片裁剪](https://www.lddgo.net/image/crop-image) | `crop-image` | **partial** | LDDGO 的核心是九宫格/自定义行列切图；本地 `crop-image` 是自由/比例裁剪，`image-splitter` 才更接近网格输出。 |
| LDDGO-10-008 | [图片转 PDF](https://www.lddgo.net/file/image-to-pdf) | `image-to-pdf` | **partial** | 两者都有多图、页面尺寸、方向、边距/排序；LDDGO 还声明支持生成多个 PDF，本地只输出一个 PDF。 |
| LDDGO-10-011 | [PDF 压缩](https://www.lddgo.net/file/compress-pdf) | `compress-pdf` | **partial** | LDDGO 用 screen/ebook/default/printer 预设；本地用 DPI/JPEG/灰度并会栅格化，文本、矢量、批注等结构可能丢失。 |

## 逐项核对

### LDDGO-01-043 `json-viewer`

- LDDGO 控件/文案：JSONEditor 树/文本视图、format、compress、open、download、copy、reset。
- 本地源码：[tools/developer/json-viewer.ts](../../tools/developer/json-viewer.ts)、`tools/_engines/dev-engine-json-viewer.tsx`。
- 对照：本地有类型着色、展开/折叠、格式化源码和复制；LDDGO 页面额外展示文件打开/下载和压缩工作流。判定 **partial**。
- 限制：没有同一 JSON 在两页的运行结果对照。

### LDDGO-01-082 `ulid-generator`

- LDDGO 控件/文案：批量数量、连接格式、连接字符串、种子时间、单调开关、生成、复制、下载、清空。
- 本地源码：`tools/developer/ulid-generator.ts`、`tools/_engines/dev-engine-ulid.tsx`、`tools/_lib/ulid.ts`。
- 对照：本地用 `crypto.getRandomValues` 生成批量 ULID，显示解码时间并限制数量 100；LDDGO 页面显示种子时间/单调/连接格式和下载。判定 **partial**。
- 限制：LDDGO 的批量下载只由页面文案/HTML 控件支持，未执行。

### LDDGO-01-084 `json-diff`

- LDDGO 控件/文案：两块 JSON 文本区、两侧 clear/copy/open、compare、example、return、clear。
- 本地源码：`tools/developer/json-diff.ts`、`tools/_engines/dev-engine-jsonplus.tsx`、`tools/_lib/jsontool.ts`。
- 对照：两者都比较两个 JSON 并报告路径级新增/删除/变化；本地有本地复制动作，LDDGO 另有每侧文件打开和示例/返回流程。判定 **partial**。
- 限制：未收集同输入的差异结果。

### LDDGO-05-014 `stopwatch`

- LDDGO 控件/文案：start/pause、lap、download、reset；description 声明毫秒精度、暂停、计次、下载。
- 本地源码：`tools/calculators/stopwatch.ts`、`tools/_engines/calc-engine-stopwatch.tsx`、`tools/_lib/stopwatch.ts`。
- 对照：本地用 `requestAnimationFrame` 显示并以 `Date.now` 锚定计时，具备开始/暂停/继续/计次/重置；未见对应导出按钮。判定 **partial**。
- 限制：未测计时漂移、毫秒显示或下载产物。

### LDDGO-05-071 `bmr-calculator`

- LDDGO 控件/文案：Harris-Benedict、修订 Harris-Benedict、Mifflin-St Jeor、Katch-McArdle 四种公式；性别、年龄、身高、体重、体脂；kcal/kJ；calculate/share/clear。
- 本地源码：`tools/calculators/bmr-calculator.ts`、`tools/_engines/calc-engine-health.tsx`、`tools/_lib/health.ts`。
- 对照：本地固定 Mifflin-St Jeor，支持公制/英制和公式说明；LDDGO 页面支持多公式、体脂和单位切换。判定 **partial**。
- 限制：未用相同输入交叉核对公式结果；健康结果应保持估算/非医疗建议表述。

### LDDGO-07-018 `gpa-calculator`

- LDDGO 控件/文案：100 分制、5 分制、等级输入；加权开关；增加/删除课程；calculate/clear。
- 本地源码：`tools/calculators/gpa-calculator.ts`、`tools/_engines/calc-engine-gpa.tsx`、`tools/_lib/grade.ts`。
- 对照：本地有字母成绩、4.0/5.0、累计成绩混合、示例和清空；LDDGO 页面把 100 分、5 分和等级作为不同输入类型，并提供加权开关。判定 **partial**。
- 限制：没有假定任何学校的 GPA 换算表，也未提交同一课程组。

### LDDGO-07-019 `percentage-calculator`

- LDDGO 控件/文案：多个百分比输入/结果组，clear；英文描述为 “various forms of percentage calculation”，并声明结果一键复制。
- 本地源码：`tools/calculators/percentage-calculator.ts`、`tools/_engines/calc-engine-basic.tsx`。
- 对照：本地覆盖 X% of Y、X as percentage of Y、百分比变化及增减方向三种实时模式；LDDGO 的 HTML 暴露多个结果组，但精确公式集合未运行确认。判定 **partial**。
- 限制：未把页面声明当作已验证公式，不能据此声称谁的覆盖更全。

### LDDGO-09-015 `color-picker`

- LDDGO 控件/文案：图片上传/拖放、canvas 取样、hex/hex8/rgba 字段、clear；description 明确为“提取图片任意位置的颜色值”。
- 本地源码：`tools/calculators/color-picker.ts`、`tools/_engines/calc-engine-color.tsx`。
- 对照：本地同名工具是色板/屏幕取色，输出 hex/RGB/HSL；没有图片上传后的像素采样。因此这是同名但不同工作流的真实缺口，判定 **partial**。
- 建议映射：新增独立 image color sampler；不要因已有 `color-picker` slug 而关闭此缺口。

### LDDGO-09-016 `crop-image`

- LDDGO 控件/文案：图片上传/拖放、九宫格或宽高模式、行/列、圆角/背景选项、generate、clear、download；英文 description 明确 3x3 或自定义行列。
- 本地源码：`tools/image/crop-image.ts`、`tools/_engines/image-engine-crop.tsx`、相关 `tools/image/image-splitter.ts`。
- 对照：本地 `crop-image` 支持自由/固定比例裁剪、坐标和多文件选择；网格切片在 `image-splitter`，不是该 slug 的主流程。判定 **partial**。
- 建议映射：用 `image-splitter` 继续覆盖网格输出，同时决定是否把九宫格模式补到 `crop-image`。

### LDDGO-10-008 `image-to-pdf`

- LDDGO 控件/文案：多图上传、页面尺寸、纵向/横向、顺序、边距、单个/多个 PDF 输出、generate/download/clear；页面 description 声明 JPEG/PNG、旋转和生成多个 PDF。
- 本地源码：`tools/pdf/image-to-pdf.ts`、`tools/_engines/pdf-engine-images-to-pdf.tsx`。
- 对照：本地已有多图、尺寸、方向、边距/排序并生成可下载 PDF；没有页面公开的单个/多个 PDF 拆分输出模式。判定 **partial**。
- 限制：格式兼容性和旋转行为未做穷举测试。

### LDDGO-10-011 `compress-pdf`

- LDDGO 控件/文案：PDF 上传/拖放、screen/ebook/default/printer 压缩级别、generate/download/clear。
- 本地源码：`tools/pdf/compress-pdf.ts`、`tools/_engines/pdf-engine-compress.tsx`。
- 对照：本地提供 DPI、JPEG 质量、灰度并在浏览器本地重建 PDF；LDDGO 采用命名压缩预设。两者参数模型不同。判定 **partial**。
- 质量限制：本地路线会把页面栅格化，可能移除可选文本、矢量、批注、表单和其他 PDF 结构；这项限制必须在页面说明中保持醒目，不能只宣传体积下降。

## 22 页 SEO 元数据快照

下表字段来自 2026-11-21 的 HTTP HTML 抓取；每一对中英文页面均 `HTTP 200`，`title == h1`，有 description/keywords，`canonical` 为空，`JSON-LD` 类型为空。

| ID | 语言 | title / H1 | description | keywords |
| --- | --- | --- | --- | --- |
| 01-043 | zh | 在线JSON视图查看 | 在线JSON视图查看器，在线JSON数据查看。 | json视图，json数据查看，在线JSON视图查看工具，在线JSON数据查看工具 |
| 01-043 | en | JSON Viewer Online | JSON viewer online, online JSON data viewing. | Json view, json data view, online JSON viewer tool, online JSON data viewing tool |
| 01-082 | zh | 在线ULID生成器 | 在线 ULID 生成器，支持批量生成 ULID，生成的 ULID 支持下载到本地。 | 在线ULID生成器 |
| 01-082 | en | ULID Generator Online | Online ULID generator, supports batch generation of ULIDs, and the generated ULIDs can be downloaded locally. | ULID Generator Online |
| 01-084 | zh | 在线JSON比较 | 在线JSON比较工具，输入两个JSON数据，比较他们之间的不同之处。比较结果会提示缺失的属性，值类型不同，值不同等。 | 在线JSON比较，JSON数据比较 |
| 01-084 | en | JSON Diff Online | Online JSON comparison tool, input two JSON data and compare their differences. The comparison result will indicate missing attributes, different value types, different values, etc. | json diff online, compare json data online |
| 05-014 | zh | 在线秒表计时器 | 在线秒表计时器，支持在线进行秒表计时，计时时间精确到毫秒级别。支持暂停、计次和下载功能。 | 秒表，秒表计时器，秒表在线，在线秒表计时器 |
| 05-014 | en | Stopwatch Online | Online stopwatch timer supports online stopwatch timing, millisecond time, pause, mark and download functions. | stopwatch, stopwatch timer, stopwatch online, online stopwatch timer |
| 05-071 | zh | 在线基础代谢率(BMR)计算器 | 在线基础代谢率计算器(BMR 计算器)，根据身高、体重、年龄等参数，使用多种公式，计算人体的基础代谢率，并支持评估人体在不同运动状态下，每日消耗的热量。 | 在线基础代谢率(BMR)计算器，BMR计算器，BMR计算公式 |
| 05-071 | en | Basal Metabolic Rate Calculator Online | The online basal metabolic rate calculator (BMR calculator) uses multiple formulas to calculate the body's basal metabolic rate based on parameters such as height, weight, and age, and supports evaluating the daily calorie consumption of the body under different exercise states. | basal metabolic rate calculator online, bmr calculator online |
| 07-018 | zh | 在线绩点(GPA)计算器 | 在线绩点(GPA)计算器，输入课程成绩和学分，计算平均学分绩点(GPA)，本工具支持多种绩GPA计算算法。 | 绩点计算器，gpa计算器，在线gpa计算器，绩点计算方法,gpa计算方法 |
| 07-018 | en | GPA Calculator Online | The online GPA calculator can input course grades and credits to calculate the GPA. This tool supports multiple GPA calculation algorithms. | gpa calculator online |
| 07-019 | zh | 在线百分比计算器 | 在线百分比计算，支持多种形式的百分比计算，计算结果支持一键复制。 | 在线百分比计算器，百分比计算器，百分比计算方式 |
| 07-019 | en | Percentage Calculator Online | Online percentage calculation, supports various forms of percentage calculation, and the calculation results can be copied with one click. | percentage calculator online |
| 09-015 | zh | 在线图片颜色提取 | 在线图片颜色提取工具，提取图片任意位置的颜色值。 | 图片颜色拾取，图片颜色提取，在线图片颜色拾取工具 |
| 09-015 | en | Image Color Picker Online | The image color picker online, extracts color values at any position of the image. | image color picker, image color extract, online image color pickup tool |
| 09-016 | zh | 在线九宫格图片裁剪 | 在线九宫格图片裁剪工具，支持九宫格或者自定义行列的图片裁剪，支持将裁剪后的图片下载到本地。 | 九宫格切图，图片切分，图片裁剪 |
| 09-016 | en | Image Crop Online | The online image cropping tool supports the image cropping of 3*3 or user-defined rows and columns, and supports downloading the cropped images to the local. | image crop, image cut, image crop tool online |
| 10-008 | zh | 在线图片转PDF | 在线图片转PDF工具，打开 JPEG 或者 PNG 图片，生成 PDF 文件。支持打开多个图片，设置 PDF 页面大小，旋转图片等参数，支持生成多个 PDF 文件。 | 在线图片转PDF, 图片转pdf, jpg转pdf, png转pdf, jpeg转pdf, 图片生成pdf |
| 10-008 | en | Image to PDF Converter Online | Online image to PDF tool, open JPEG or PNG images, and generate PDF files. Supports opening multiple images, setting PDF page size, rotating images, and generating multiple PDF files. | online image conversion to pdf, image to pdf, jpg to pdf, png to pdf, jpeg to pdf |
| 10-011 | zh | 在线PDF压缩 | 在线PDF压缩工具，对PDF文件的大小进行压缩，支持设置不同的压缩级别，压缩后的PDF文件支持下载到本地。 | 在线PDF压缩，PDF压缩，PDF文件大小压缩 |
| 10-011 | en | Compress PDF Online | Online PDF compression tool that compresses the size of PDF files, supports setting different compression levels, and supports downloading compressed PDF files locally. | compress pdf online, pdf file size compress, pdf file compress |

## 后续核验顺序

1. 浏览器可用后，用同一输入完成 JSON viewer/diff、ULID、BMR/GPA/百分比、图片取色/切片、图片转 PDF/PDF 压缩的双边结果记录。
2. 对 11 个页面补键盘顺序、焦点可见性、错误提示、窄屏（至少 390px）和 reduced-motion 抽查；不要把页面有按钮等同于无障碍合格。
3. 先处理两个最明确的能力缺口：图片像素取色，以及九宫格/自定义行列切图；随后评估 ULID 选项、BMR 多公式、GPA 输入制式、图片转 PDF 多文件输出和 PDF 压缩预设。
4. SEO 改进应以页面真实功能为依据：补 canonical/JSON-LD 前先确定模板规范，title/description/keywords 需要与实现的输入、输出和限制一致。
