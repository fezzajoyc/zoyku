# IPv4 地址区间展开验收

2026-11-21，北京时间。Zoyku 新增 `ipv4-range-expander` 工具页与 `ipv4_range_expand` MCP 调用，复用子网工具的 IPv4 解析与无符号整数计算。工具处理首尾都包含的地址区间，按升序输出，每行一条。网页的展示和复制上限是 65,536 条。MCP 默认返回 256 条，调用方可设为 1–4,096 条。完整区间总数独立计算，两端界面都提示截断。

## 同行入口与工作流

旧 G15 引用了 IT-Tools 的同名页面。回读官方 Vue 和 TypeScript 后确认，IT-Tools 把首尾两个地址扩成一个最小覆盖 CIDR，并显示扩展前后的端点和数量。Zoyku 的子网计算器有独立的最小覆盖 CIDR 模式。此次交付增加的是逐地址列表与复制工作流。[IT-Tools 界面源码](https://github.com/CorentinTh/it-tools/blob/main/src/tools/ipv4-range-expander/ipv4-range-expander.vue) · [计算逻辑](https://github.com/CorentinTh/it-tools/blob/main/src/tools/ipv4-range-expander/ipv4-range-expander.service.ts)

逐地址输出有开源实现作为需求参照。另有公开网页按 CIDR 生成地址列表，其输入形式不同。本轮同行证据来自仓库与公开页面。跨产品功能、性能和搜索数据仍需验证。[IPv4 起止区间生成库](https://github.com/ezpaarse-project/ip-range-generator) · [IP Subnet Mask Expander](https://0xbrock.github.io/IPSubnetMaskExpander/)

## 本地验证

| 项目 | 本轮实测 |
| --- | --- |
| 测试和构建 | 2026-11-21 21:18（北京时间）工作树有 99 个测试文件、2,528 项测试全部通过。较早的 2,508 项结果保留为历史检查点，增量来自会话期间的工作树更新。独立 TypeScript 检查、生产构建和 MCP 构建通过，注册 40 个 MCP 工具。全仓 ESLint 0 错误、57 条警告。 |
| SEO 路由 | 3,345/3,345 个 sitemap URL 通过生成 HTML 审计。新工具的 15 个 HTML 页面和 15 个 Markdown 答案页均 HTTP 200。HTML 核验 description、自指 canonical、一处 H1、唯一标题、hreflang、结构化数据和 OG。工具已进入 `llms.txt`。 |
| Chromium 生产网页 | 英文 320px 核对跨八位组的列表、倒序、无效八位组、最大单地址、完整空间 4,294,967,296 条的精确总数和 65,536 条截断。键盘可从两个输入移动到复制按钮，真实剪贴板与四行样例一致。 |
| 移动与无障碍 | 英文深色和中文浅色 390px、阿拉伯语深色 320px 无页面级横向溢出。阿语文档方向为 RTL，地址输入和输出保持 LTR。三次 axe 扫描各报告 0 项违规，`color-contrast` 均需要人工核对。真机键盘与读屏尚未验证。 |
| MCP 协议 | 内存协议测试验证跨八位组、默认返回量、自设截断、准确总数、倒序、非法地址和非法上限。 |

本轮交付保留在本地工作树。当前为 214 个工具、15 种语言、3,210 个工具页。

原始记录：[浏览器](2026-11-21-ipv4-range-browser.json) · [静态 SEO](2026-11-21-continuation-static-seo.json)
