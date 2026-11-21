# 图片取色与网格切图：补齐优先级证据

调研日期：2026-11-21（Asia/Shanghai）

## 结论

建议先做独立的 **Image Color Sampler（图片像素取色）** 页面。现有 `color-picker` 是色板/屏幕取色，没有导入图片并采样像素的流程；这是明确的新能力。九宫格能力则已由 `image-splitter` 部分覆盖，下一步应作为现有工具的范围扩展，而不是再造一个重叠页面。

本轮没有完成浏览器交互或同输入比较。共享 Playwright 的默认上下文报错 `Browser is already in use ... mcp-chrome-9d326eb`；新建 `image-gap-research` 隔离上下文也返回同一错误。所有控件和产品能力结论因此分为官方页面/静态脚本声明与本地源码事实，不把它们写成运行正确性的证明。

## LDDGO 官方页面

### 图片颜色提取

来源：[LDDGO 中文页](https://www.lddgo.net/image/color-picker)、[英文页](https://www.lddgo.net/en/image/color-picker)。两页本轮 HTTP 200。中文标题/H1 为“在线图片颜色提取”，说明让用户上传图片并点击任意位置取色；UI 静态 HTML 有点击/拖放区、重新上传、画布和 HEX/HEX8/RGBA 三个值字段。

说明正文列出的输入格式是 PNG、JPG、JPEG、BMP、WebP；输出为 HEX、HEX8（带 alpha）和 RGBA。它没有在页面说明中给出清晰的隐私承诺或图片大小限制。页面脚本静态代码显示会将图片绘到 canvas，再用 `getImageData(x,y,1,1)` 取像素；点击位置经显示尺寸换算到画布坐标。此静态脚本证实实现路径是浏览器 Canvas，但不能代替浏览器网络记录来证明文件绝不发送。

有一处值得实测的格式不一致：说明正文列 WebP，却在压缩后的上传脚本字符串中看到扩展名白名单 `jpg|jpeg|png|gif|bmp|wbmp`，其中没有 WebP，反而包含 GIF/WBMP。不能据此认定最终浏览器行为；验收时应逐格式实传。

### 九宫格图片裁剪

来源：[LDDGO 中文页](https://www.lddgo.net/image/crop-image)、[英文页](https://www.lddgo.net/en/image/crop-image)、[图片像素限制说明](https://www.lddgo.net/image/image-size-doc)。上述三页本轮均 HTTP 200。页面标明“使用浏览器功能实现，文件不会被上传到云端”。

静态 HTML 控件与说明列出：

- 输入：JPG/JPEG、PNG、WebP；最大单文件 100 MB、最多同时打开 100 张；像素限制另见官方浏览器尺寸表。
- 切分方式：宫格（预设 2×2 至 6×6，或自定义，行列各可到 100）或指定块宽高。
- 可选圆角（一个整数或逗号分隔的四个整数）与背景色；背景色用于 JPEG 等非透明图加圆角后的空缺。
- 输出：按设置切分并自动下载；单张图片且宫格不超过 10×10 时支持预览；清空可恢复。
- 页面特别提示大图片受浏览器性能影响，建议逐张处理。像素限制页列出的 Chrome/Edge 常见画布面积上限是 16,384×16,384，即 268,435,456 像素；这是浏览器能力表，不是对每台设备的内存保证。

## 本地能力核对

### 图片取色

现有 [color-picker 工具定义](../../tools/calculators/color-picker.ts) 与 `calc-engine-color.tsx` 做色板选择及 EyeDropper 屏幕取色，展示 HEX/RGB/HSL；屏幕 API 只在支持它的浏览器出现。它没有图片上传、图像预览、像素坐标取色或 HEX8 alpha 输出。因此不能因 slug 同名而算作已具备 LDDGO 图片取色。

最小独立页面建议命名 `image-color-picker`（`image` 分类），避免与色板/屏幕取色争同一意图。首版：本地选择/拖放一张图；在预览上点像素；提供 HEX、HEX8、RGBA 和逐项复制；显示 alpha 棋盘格；用 X/Y 数值输入与方向键为鼠标取色提供可访问替代；重选/清空；错误状态说明无法解码的格式与大图边界。先不做远程 URL 输入、自动主色提取、账号保存或上传服务。

### 网格切图

现有 [image-splitter 定义](../../tools/image/image-splitter.ts)、[引擎](../../tools/_engines/image-engine-splitter.tsx) 与 [几何逻辑](../../tools/_lib/image-geometry.ts) 已有单图 2–6 行×2–6 列网格、实时预览、PNG 小块、逐张/ZIP 下载、行优先文件名；非整除余数落到最后一行/列，不拉伸。`tests/image-geometry.test.ts` 已覆盖尺寸整除、305×205 的余数、文件命名、无缝重组、非法尺寸和最小网格。

与 LDDGO 的实际差距：当前最低为 2×2，不能切 1×N 条带；最高 6×6；没有按固定块宽高切分、多个源图队列、圆角和 JPEG 背景选项。另有一处文案/实现不一致：工具正文谈到“长条模式/strip mode”，但当前引擎控件只有 rows/columns 网格，不存在条带模式。上线新能力前应实现该模式，或先删改这项承诺。

## 同类同行证据

### 图片取色：ImageColorPicker.com

来源：[Image Color Picker](https://www.imagecolorpicker.com/)。页面 HTTP 200；静态 HTML、内嵌页面文案及公开 FAQ 声明支持上传、粘贴图片、图片 URL、点击精确像素；展示 HEX/RGB/HSL，并声明支持 HSV、CMYK 等更多格式；页面有 10 个自动提取的图像颜色，用户 palette 最多 12 色，可复制、下载或保存。HTML 中色块带 `aria-label`、`tabindex=0`、`aria-keyshortcuts` 和 `focus-visible` 样式，是可检查的键盘语义证据，但本轮没有键盘实测。

隐私边界：它声明本地图片在浏览器处理、不上传服务器；**URL 模式不同**，页面明确说链接会交给 thum.io 读取，thum.io 会收到该 URL 和用户 IP。格式提示是 JPG/PNG/WebP/GIF；HEIC 通常不支持，文案建议转 JPG/PNG 或使用 Mac Safari；页面给出 `{maxSize}` MB 动态限制，本轮没有确认具体数值。页面有 canonical、Open Graph/Twitter 元数据和多语言 alternate 链接。以上均为页面证据，不是对其运行实现的独立验证。

### 网格/条带切图：PineTools

来源：[PineTools Split Image](https://pinetools.com/split-image)。页面 HTTP 200，静态 HTML 有浏览器 file input、拖放/粘贴/URL 输入、canvas，以及 Vertically / Horizontally / Both (grid) 三种方向。每个方向可按块数量或像素尺寸切分，可选择重叠像素；输出格式有保持原格式、PNG、JPG/JPEG、WebP、BMP（页面脚本按当前浏览器编码能力隐藏不支持项），有 JPEG/WebP 质量选项；多张输出可逐个下载或 ZIP 下载。

隐私/格式边界：页面源码表明图像在浏览器 Canvas 中处理；URL 路径经 `corsproxy.io` 代理解决跨域。本轮未取得 PineTools 对本地文件不上传的明确隐私声明，也没做网络请求追踪；因此不对文件是否上传作确定判断。它比 LDDGO 的两种切分方式更丰富，但其页面文案/静态控件仍不证明输出正确。

## 浏览器可行性与隐私设计

- 两项都适合在浏览器内完成；仓库已有 `DropZone`、`loadImage`、canvas 编码、对象 URL 清理、图片结果/ZIP 下载和可测几何库。取色可以在显示预览上换算到原图坐标，然后把对应源像素绘到 1×1 canvas 读 RGBA，避免另分配整幅 ImageData；仍需防范浏览器解码本身的内存压力。
- 取色只接收本地 `File`，不加 URL 输入。跨域 URL 会遇到 canvas taint/CORS，若通过代理解决会把链接和网络元数据交给第三方，破坏清晰的本地隐私承诺。
- 文件加载与采样期间不发网络请求；不持久化图片或采样历史；清空/卸载时释放 object URL。对超大边长、总像素、解码失败和浏览器限制给出真实错误，不把 100 MB 文件大小等同于可安全解码。
- 以 PNG/JPEG/WebP 作为首批明确支持的格式；BMP/GIF 按浏览器解码结果做真实兼容测试，并说明动画 GIF 只采首帧。HEIC/AVIF/SVG 不先作跨浏览器承诺；Canvas 色值是浏览器解码后的 sRGB 结果，宽色域显示、透明度与 EXIF 方向要在产品说明和验收中明确。
- 切图继续用单张本地文件，PNG 无损输出作为默认。若增加其他编码格式，需要单独说明 JPEG 有损、alpha 会丢失；ZIP/多块操作要限制总输出块数/内存，不能照搬 LDDGO 100×100 的最大网格而不加性能门槛。

## 建议验收用例

### 图片像素取色（必须双边功能验收；同行没有同输入结果证据）

1. 构造 2×2 RGBA PNG：左上不透明红 `#ff0000ff`、右上半透明绿 `#00ff0080`、左下透明蓝 `#0000ff00`、右下白色。验证点击每个象限边界取到正确 RGBA/HEX8，且 alpha 为 0、128、255 时保持精确；同时交叉核对 HEX RGB HSL（若提供）的转换公式。
2. 把预览缩到原尺寸的 25% 并分别在 390px/桌面点击四角，验证 CSS 展示坐标到 naturalWidth/naturalHeight 的映射、设备像素比与右/下边界不发生 off-by-one；再用 X/Y 字段和方向键取同一像素。
3. 用含 EXIF 旋转的 JPEG、不同自然宽高的图、透明 PNG 和 WebP 验证方向与坐标一致；不支持格式、损坏文件、零尺寸或超过产品像素预算时显示可恢复错误。
4. 在开发环境监听网络：选择、采样、复制、清空全过程不得上传图片；清空后预览、采样结果和对象 URL 均清理。键盘可完成文件选择、移动采样点、复制和重置；结果变化通过适当 live region 通知。

### 现有网格切图（先保留已有测试，再补浏览器端到端）

1. 305×205 图片按 3 列×2 行切：预期行优先 6 块；宽度序列每行 `101, 101, 103`，高度为 `102, 103` 两行；重新拼回后像素与输入一致。
2. 为新增条带/固定尺寸模式构造可辨识像素网格，核对 1×N、N×1、固定宽高、最后一块余数策略、文件名顺序和 ZIP 内文件数。
3. 输入透明 PNG 及 JPEG，分别验证 alpha、输出格式、圆角背景策略（若实现）和有损质量提示；取消/替换文件后不保留旧输出。
4. 在移动窄屏预览、键盘调行列/尺寸、读取边界错误与大输出降级；检查 10×10 以上网格预览和批处理是否会阻塞或造成过量内存。

## 执行顺序

1. 先实现并验证 `image-color-picker`，因为它填补完全不存在的工作流，范围清楚且可用确定性像素样本验收。
2. 紧接着修正 `image-splitter` 对 strip mode 的文案承诺，然后按实际需求加入 1×N 条带及固定宽/高切分；把 LDDGO 的 100×100 和 100 张文件视为对方标称上限，不当作需要追平的默认产品目标。
3. 两个页面均补唯一 title/H1/description、canonical、Open Graph、FAQ/操作说明；将支持格式、隐私和大图边界写成可验证事实。当前 LDDGO 取色页未在 HTML 静态扫描中看到清晰本地处理说明；切图页则明确说文件不上传云端。对方的 SEO/隐私文案都不能代替运行验证。
