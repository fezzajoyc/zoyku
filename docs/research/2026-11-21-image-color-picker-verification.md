# 图片像素取色器实现与验收

日期：2026-11-21（Asia/Shanghai）  
工具：`image-color-picker`，`image` 分类；MCP 同源函数：`image_pixel_color`。

## 需求与同行依据

LDDGO 的图片颜色提取页明确提供本地图片上传、画布像素取样、HEX/HEX8/RGBA 输出；这与现有 `color-picker` 的色板/屏幕 EyeDropper 工作流不同，因此新增独立 slug。ImageColorPicker.com 还展示 URL 输入和自动主色提取，但 URL 会引入第三方读取链路；本实现只接受本地文件，保持隐私边界清晰。完整差距证据见 [图片工具差距证据](2026-11-21-image-tools-gap-design-evidence.md)。

## 实现口径

- 浏览器端读取单张本地栅格图，Canvas 解码和采样不发送图片请求；清空、替换和卸载都会取消未完成加载并释放 object URL。
- 支持浏览器可解码的 PNG、JPG/JPEG、WebP、GIF、BMP 等栅格格式；明确拒绝 SVG 和无法解码的文件。动画图片取浏览器解码的当前帧，不承诺格式元数据或色彩配置保留。
- 限制为 25 MiB、单边 16,384 像素、总计 40 MP；这些是解码预算，不是任意设备都能承受的保证。
- 点击预览通过显示矩形映射到原始像素，右/下边界夹紧；X/Y 数字输入和画布方向键复用同一取样路径。
- 输出同时提供 HEX、HEX8、RGB、RGBA；HEX8 保留精确 8 位 alpha，RGBA alpha 保留五位小数。浏览器 Canvas 对完全透明像素的 RGB 通道可能返回 0，这是取样 API 的实际语义，页面不伪造原始透明 RGB。

## 浏览器验收

环境：本地生产服务 `http://localhost:3000`，ChatGPT in-app browser，fixture `/tmp/image-color-picker-fixture.png`（2×2 RGBA，左上红、右上半透明绿、左下透明蓝、右下白；101 B；仅测试数据）。

| 场景 | 实际结果 | 证据状态 |
| --- | --- | --- |
| 初始文件加载 | 页面显示 `2 × 2`，首像素 `(0, 0)` 为 `#FF0000` / `#FF0000FF` / `rgba(255, 0, 0, 1)` | 已观察 |
| X 坐标输入 | 将 X 从 0 改为 1，结果变为 `(1, 0)`、`#00FF00`、`#00FF0080`、`rgba(0, 255, 0, 0.50196)` | 已观察 |
| 画布点击 | 点击预览中心取到右下白色像素 `(1, 1)` | 已观察 |
| 画布方向键 | 从 `(1, 1)` 按左到 `(0, 1)`，Canvas 实际返回 `#00000000` / `rgba(0, 0, 0, 0)`；再按上回到 `(0, 0)`，边界没有越界 | 已观察 |
| 复制按钮 | 点击 HEX 复制按钮后按钮状态显示 `Copied` | 已观察；浏览器剪贴板读取在当前受限上下文返回空，未把它写成字节级剪贴板证明 |
| 清空 | `Clear image` 移除画布、坐标、结果和文件信息，回到上传态 | 已观察 |
| 非图片文件 | 上传 `package.json` 后显示 `This image could not be decoded by your browser.`，没有保留旧结果 | 已观察 |
| 390px 窄屏 | `document.documentElement.scrollWidth = 390`、`clientWidth = 390`、`window.innerWidth = 390`；截图未见横向溢出 | 已观察 |

本轮未把 LDDGO 或 ImageColorPicker.com 的静态页面描述写成同输入正确性结论；同行仍缺少双方对同一图片的完整运行时结果。也未声称 axe、真实读屏、EXIF 方向、WebP/BMP/GIF 全格式矩阵已经完成。

## 自动化与构建验证

- `tests/image-color-picker.test.ts`：纯逻辑坐标映射、边界、RGBA/HEX 格式和非法输入覆盖。
- `tests/image-color-picker-ui.test.ts`：15 语文案、可访问画布/键盘/X-Y 控件、错误与资源清理契约。
- 注册表、overlay、MCP 测试覆盖 `image-color-picker` 与 `image_pixel_color`；当前总数以 README 和新鲜测试输出为准。
- 页面含 title、H1、description、canonical、JSON-LD、步骤、FAQ 和相关工具链接；未在本记录中把这些静态字段等同于排名或 WCAG 合规。

### 本次新鲜复核结果

- `npx vitest run tests/image-color-picker.test.ts tests/image-color-picker-ui.test.ts tests/registry.test.ts tests/overlays.test.ts tests/mcp.test.ts`：5 个文件、28 项通过。
- 图片取色器相关文件 ESLint：0 errors、0 warnings；全仓 `npm run lint`：0 errors、55 条既有 warnings。
- `git diff --check`：通过。
- 页面 HTTP 抽检：`/en/tools/image-color-picker`、`/zh/tools/image-color-picker`、`/en/tools/image-color-picker.md` 均为 `200`；中英文 HTML 页的 title、H1、description、自指 canonical 和 JSON-LD 均存在。
- 全量 `npx vitest run`：96 个文件中 95 个通过、1 个失败，2,471 项通过、6 项失败；失败全部来自未参与本轮的 `tests/hash-digests.test.ts` RIPEMD-160 向量。当前不能把全量测试写成通过。
- 新鲜 `npx tsc --noEmit` 与 `npm run build`：均被未参与本轮的 `tools/_lib/hash-digests.ts:78,82` `Uint8Array<ArrayBufferLike>` 类型错误阻断。`npm run build:mcp` 通过。
- 交接前已有一次生产构建成功并生成 9,937 条路径；本次复核因上述类型错误未能重现该成功结果。

## 后续

1. 先独立修复并复验未参与图片功能的 `hash-digests`：RIPEMD-160 输出与官方向量不符，且 SHA-224/SHA-256 返回类型阻断 TypeScript 与生产构建。
2. 为图片工具矩阵补 EXIF 旋转、WebP/BMP/GIF、损坏/超大图片和设备像素比案例，并记录真实浏览器结果。
3. 评估 `image-splitter` 的 1×N/N×1 条带和固定块尺寸模式；先修正文案中当前尚未实现的 strip mode 承诺。
4. 继续按 LDDGO 420 行目录和全球同行差距表分批做高重合工具同输入对照；未实测项目继续标为 `unverified`，不汇总成整体优于同行的结论。
