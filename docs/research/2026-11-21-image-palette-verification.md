# Image Palette Generator：本地实现验证

日期：2026-11-21。工具 slug：`image-palette-generator`。本记录覆盖独立实现与聚焦验证；注册、MCP、全仓构建与浏览器验收由本轮主任务统筹，并在主任务记录结果。本工具本次未提交或发布。

需求来源为 [同行目录批次 3](2026-11-21-peer-catalog-batch3.md) 的整图颜色提取缺口：[OnlineTools](https://onlinetools.com/image/find-image-color-palette)、[OnlinePNGTools](https://onlinepngtools.com/extract-png-color-palette)。该来源是目录及详情证据，不代表本次完成了同行同件执行。

## 实现口径

- 浏览器只处理本地位图，不支持远程图片 URL、不上传文件。单文件 25 MiB、每边 16,384 像素、总计 40,000,000 像素；在分配画布和 ImageData 之前检查解码后的尺寸。浏览器本身的图片解码先于尺寸检查。
- `extractImagePalette(rgba, width, height, { colorCount?, maxSamples? })` 接收已解码的行优先 RGBA，不解码图片文件。完整校验尺寸与精确缓冲区长度；普通数组逐通道校验 0–255 整数，字节类型数组本身保证通道范围。
- 最多均匀抽取 65,536 个像素，位置为每个行优先区间的中点。每个 RGB 通道右移三位形成 5 位分组；忽略 alpha=0，以整数 alpha 字节累计权重与原始 RGB 加权和，再计算组内 RGB 均值并四舍五入。按权重降序、数字组号升序稳定排序。
- 默认显示八组，可选 1–12。百分比为该组 alpha 总和除以全部已采样像素的 alpha 总和，单位 0–100；未显示组仍在分母里，因此显示之和可低于 100%。这是采样颜色频率的近似摘要，不承诺精确主色或最优设计配色。
- UI 展示原图尺寸、样本数、可见样本数、HEX、RGB、近似占比；可复制单个 HEX/RGB、HEX 列表、CSS 变量。内置示例绘制红色 300×200、蓝色 100×200，总画布 400×200。完全透明或未取到可见像素时显示中性说明，保留清空入口。
- 采用请求版本与可取消读取处理文件替换、清空及卸载；清空/卸载释放画布尺寸。调整显示组数只截取已算出的 12 组，不重新读取全图 RGBA。
- 页面与运行时消息均有原生 15 语；阿拉伯语容器 RTL，数值与颜色代码保持 LTR。使用共享 CopyButton 的复制成功/失败反馈与主题变量。

## 聚焦验证

测试先于对应模块创建运行，分别因缺少纯函数模块/引擎而失败；实现后运行：

```sh
npm test -- tests/image-palette.test.ts tests/image-palette-ui.test.tsx
npx tsc --noEmit --incremental false
npx eslint tools/_lib/image-palette.ts tools/_lib/image-palette-copy.ts tools/_engines/image-engine-palette.tsx tools/image/image-palette-generator.ts tests/image-palette.test.ts tests/image-palette-ui.test.tsx
```

聚焦测试 2 个文件、23 项通过。类型检查退出 0。首次局部 lint 有请求版本 ref 清理提示，改为捕获稳定对象后复跑，退出 0 且无警告。

纯函数向量包含：75/25 红蓝占比、零 alpha 排除、85/170/255 alpha 的独立加权均值、5 位边界、等权组号排序、隐藏组保留在分母、完全透明空输出、80,000 像素采样封顶与确定性、畸形缓冲区/通道/尺寸/选项。语言契约验证 15 语页面摘要长度、三步骤、至少两 FAQ 和运行时字段齐全。15 语 SSR 测试核对真实空状态、标签/选项、默认八组、方法披露、示例入口和阿拉伯语方向，初始不伪造配色结果。

局部测试不替代真实浏览器文件读取、剪贴板、移动布局、暗色与文件竞争验证；这部分由主任务完成后统一补证。此工作单元没有执行全量构建或全仓回归。
