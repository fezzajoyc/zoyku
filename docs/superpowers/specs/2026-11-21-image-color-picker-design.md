# 图片像素取色工具设计

日期：2026-11-21  
目标 slug：`image-color-picker`

## 背景与边界

LDDGO 的 `color-picker` 页面是上传图片后读取任意像素颜色；Zoyku 现有 `color-picker` 是屏幕 EyeDropper，输入来源和工作流不同。本工具使用独立 slug，避免同名页面承诺错误。图片只在浏览器内解码，绝不上传或写入 URL。

支持浏览器能解码的图片格式。单文件限制 25 MiB，单边不超过 16,384 px，解码后像素总量限制 40,000,000；超过限制明确报错。首批不做区域平均、颜色历史、调色板提取、批量文件和透明背景替换。

## 交互与数据流

1. `DropZone` 接收一张图片；引擎检查文件大小后用共享 `loadImage` 解码。
2. Canvas 以图片原始像素尺寸绘制，CSS 负责适应容器。点击 Canvas 按 `getBoundingClientRect()` 映射到原始坐标；聚焦 Canvas 时，方向键移动一个像素并更新取样。
3. 坐标输入框允许精确输入 `x`、`y`，与点击/键盘共用同一采样函数。
4. 纯函数从 RGBA 数组返回 `x/y/r/g/b/a`、`#RRGGBB`、`#RRGGBBAA`、`rgb(...)` 和 `rgba(...)`；alpha 为 255 时仍显示 RGBA，避免透明信息丢失。
5. 结果使用 `CopyButton` 分别复制 HEX 与 RGBA；清除动作释放 object URL、清空 Canvas 和结果。

## 可访问性与 SEO

- DropZone 使用既有文件输入和键盘触发；Canvas 设置 `role="img"`、可聚焦、动态 `aria-label`，状态消息用 `role="status"`，错误用 `role="alert"`。
- 每个坐标输入有可见 label、`min/max` 和 `aria-describedby`；键盘箭头不改变页面滚动。
- 工具页提供 5 语原生 copy、10 语 overlay、FAQ/步骤/隐私说明；meta 与 H1 只描述真实的本地图片取样能力。
- 页面沿用现有暗色变量、`field`、错误条和移动宽度约束；Canvas 在 390px 视口不产生横向滚动。

## 测试门槛

- 纯函数：单像素、不透明/半透明/全透明、四角坐标、越界、宽度/高度非法、RGBA 长度不足。
- 引擎契约：每个 UI 标签有 15 语翻译，错误状态有 15 语文案；源码静态检查确认键盘 handler、Canvas role、CopyButton 和清除路径存在。
- 注册表/overlay/MCP：slug 唯一、related 可解析、15 语 copy 完整、MCP 与纯函数同向量。
- 完成前运行全量 Vitest、TypeScript、lint、生产构建和 HTTP SEO 抽检；浏览器验收覆盖默认态、图片取样、错误态、键盘和 390px。
