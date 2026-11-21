# 同行工具对齐交接记录

日期：2026-11-21（Asia/Shanghai）  
项目：Zoyku / `toolsite`  
当前分支：`homepage-modern-redesign`

## 最新交付与验证

- 新完成 CSV 表格编辑器和整图色板，各有 15 语页面和同源 MCP 计算。当前为 **216 个工具、3,240 个工具页、42 个 MCP 工具**。[本批验收](2026-11-21-table-palette-verification.md)
- 最新全仓结果为 **105 个文件、2,639 项全部通过**，生产构建和全仓类型检查通过，生成 10,072 条路径。静态 SEO **3,375/3,375** 通过；新工具 60 个 HTML/Markdown 响应均 200。MCP 构建与启动通过；lint 0 错误、58 条警告。
- 实际浏览器核对表格保真和复制、图片透明度权重与采样、剪贴板、清空和迟到图片事件。两工具在中文/英文/阿语、深浅主题的 320/390px 视图无溢出；axe 六次 0 违规，颜色对比度仍待人工复核。
- Browserling CSV 转置/列互换的四组正常样本与本地语义一致，两组行宽不齐样本记录了补空位/拒绝的策略差异。完整证据见[同行运行记录](2026-11-21-csv-peer-runtime.json)。
- [72 项 LDDGO 语义映射](2026-11-21-lddgo-semantic-batch1.md)已完成：22 既有、19 部分、29 缺失、1 不可比、1 待证据。这是目录声明与本地实际源码的对照，没有增加同行运行数量。
- 上一批补完 IPv4 独立页面与 MCP 后为 214 个工具、40 个 MCP 工具。[IPv4 验收](2026-11-21-ipv4-range-expander-verification.md)
- 上一检查点 21:18（北京时间）为 99 个文件、2,528 项通过、3,345 个静态 SEO 页面通过、9,982 条构建路径，保留为历史。早前的 RIPEMD-160 和 TypeScript 阻塞在当前工作树中已无法复现。
- IPv4 的 15 个 HTML 页和 15 个 Markdown 答案页均返回 200。浏览器通过地址列表、错误提示、上限、键盘与剪贴板检查。320px 和 390px 抽查无溢出，自动无障碍扫描的颜色对比度仍待人工复核。
- 同行目录扩展覆盖 10 个产品，获得 1,799 个去重目录 URL，另存 Ezgif 的 452 个 sitemap URL。抽样 15 个详情页，全部返回 200，且含自指 canonical。[同行目录批次 3](2026-11-21-peer-catalog-batch3.md)
- 找回上一轮已保存的 [Convertio 审计](2026-11-21-convertio-directory-audit.md)和 [FreeConvert 审计](2026-11-21-freeconvert-directory-audit.md)。其 10,886 和 6,752 个语言归一化路径包含格式配对、说明和其他入口，保持原始证据口径。
- CSV 转 JSON 的工具定义及 15 语翻译源已与既有 Tab / TSV 能力统一。页面的 `csvCapabilityCopy` 原本已渲染 Tab 说明；这次维护只消除旧源文案偏差。浏览器验证字段内 Tab、换行、双写引号、前导零和非法引号错误。同行 OnlineTools 的本次页面未产生可见结果，双方同输入比较仍待验证。[TSV 记录](2026-11-21-tsv-browser.json)
- 修复 LDDGO 精确 slug 复核脚本的语法错误和重复运行问题。两次输出逐字节一致。120 个分层样本保持原样；另挂载 22 个历史详情记录，合并共 142 个 URL，分层抽样覆盖率仍按 120 页计算。
- LDDGO 中英文目录均有 420 张卡片。从 410 组符合采样条件的中英文配对中，按 10 个分类各抽 6 组，120/120 页返回 200。样本的初始 HTML 均有 title、H1、描述和关键词，均未读取到 canonical 或 JSON-LD。[LDDGO 矩阵与样本范围](2026-11-21-lddgo-catalog-matrix.md)
- IT-Tools 的同名 IPv4 工具输出最小覆盖 CIDR。旧全球矩阵 G15 的来源已改为明确区分这两种工作流的官方源码和逐地址生成库。工作树尚未推送或部署。

## LDDGO 目录核对

LDDGO 的“420 个工具”已经通过官网实时目录核对，**420 张工具卡片确实存在**，但这不等于 420 个工具都已经做过同输入交互、功能正确性、页面质量、SEO 或无障碍对比。

我逐一读取了中文和英文首页、10 个官方分类页（`/base/class?classID=1..10` 及英文对应页），按工具卡片的目标链接去重后得到 420 个唯一目录目标；分类计数如下：

| 官方分类 | 工具卡片数 |
| --- | ---: |
| 字符 STRING | 93 |
| 转换 CONVERTER | 39 |
| 加密 ENCRYPT | 50 |
| 网络 NETWORK | 18 |
| 更多 MORE | 82 |
| 图表 CHART | 16 |
| 数学 MATH | 27 |
| 坐标 COORDINATE | 23 |
| 图片 IMAGE | 49 |
| 文件 FILE | 23 |
| **合计** | **420** |

官网首页中英文当前都显示“420个在线工具”。目录卡片没有重复目标，但目录并不等于同源网页：其中有两个外部目标（`layui.lddgo.net`、`sqliteonline.com`），还包含 5 个文档参考页、语言专属的 `modernimg`/`modernsvg` 应用；英文目录的 Fibonacci 链接还出现了 `/en//math/fibonacci` 这种路径异常。

LDDGO 的 `sitemap.xml` 有 635 条 `<loc>`、633 个唯一地址，语言路径归一化后只覆盖目录中的 275/420 个目标，因此 sitemap 不能作为完整工具清单。后续清单必须以 10 个官方分类页为主证据，再把目标拆成同源工具、外部工具、文档/应用和异常链接。

## 我们已经做过什么

- 国内能力研究：47 条能力记录，按“缺失 / 已有基础需增强 / 已有且暂无可证明缺口”分类；不是 47 个新增路由。
- 全球能力研究：57 条能力/兼容性记录，覆盖 IT-Tools、PDF24、Omni Calculator、CyberChef；其中 48 条被标为真实缺口行，同行运行时测试数为 0。
- 既有工具同题研究：`image-compressor`、`merge-pdf`、`json-formatter`、`word-counter`、`compound-interest-calculator`、`regex-tester` 6 个工具做过 Zoyku 的真实输入/产物检查；同行主要读取官方页面，**没有做双方同输入完整交互**，所以不能据此给出总体排名。
- 中国信用代码与人民币对照：LDDGO 人民币转换页做过一条真实输入；365 工具箱 Mock 页读取过公开规格，但没有提交同样本表单。
- 设计/体验与工程质量：已有首页、移动布局、主题、键盘、部分 axe、静态 SEO 和代表性工具浏览器验收。它们是 Zoyku 自身质量证据，不是对 LDDGO 420 页逐页审计。
- 跨站同输入批次 1：已对 IT-Tools 与 Zoyku 的 hash、Base64、JSON、文字统计、正则各做正常输入及边界/错误观察；CJK 词数规则差异有单独记录，不能把输出不同直接判作谁正确。
- 跨站同输入批次 2：核对 URL 编码、URL 解析、日期时间、IPv4 子网和 UUID 的核心运行时场景。[同行同输入批次 2](2026-11-21-peer-same-input-batch2.md)
- 同行景观批次：13 个站点/产品的目录、页面元数据、移动宽度、结构化数据和证据限制见[同行景观报告](2026-11-21-peer-landscape-research.md)。目录样本共 1,205 条跨站卡片/路由记录，有重合，不能相加成独立能力数。

新增 `crc16-modbus` 与 `image-color-picker` 后的历史检查点为 213 个工具、39 个 MCP 工具和 3,195 个工具页。当前结果见文首。

## 目前不能声称的内容

- 不能声称“420 个同行工具都看过并逐个对比完成”。目前完成的是官方目录枚举和有限能力/质量抽样。
- 不能声称 Zoyku 在功能、样式、布局、SEO、关键词、说明、无障碍、速度或隐私上整体优于 LDDGO 或其他同行。
- 不能把同行目录存在、标题或营销说明当成正确性、性能、隐私或 WCAG 合规证据。
- 尚未完成 420 行的同输入矩阵，也没有拿到搜索量、排名、流量或转化数据；这些指标保持未知。

## 下一阶段执行顺序

用户已授权推进同行差距补齐。先做“目录清单 + 质量矩阵”，将所有确认适用的能力缺口纳入分批交付；外部站点、纯文档入口、政策/授权数据和不匹配产品范围的项目会记录原因与依赖，不会静默遗漏或机械复制：

1. 下一批优先验证图片/logo 水印与 PDF 图片覆盖层，按旋转、缩放、透明度和页范围拆验收；72 项语义矩阵识别出的四条目录工作流可共用内核。CSV 转置/列互换和整图色板已完成；色板的同行同件比较仍待验证。
2. 在已有 120 个详情样本的基础上扩展 LDDGO 元数据覆盖，保留异常路径和排除原因。官方分类页仍是目录事实源。
3. 将每行映射到 Zoyku 的 registry slug，状态只允许 `existing`、`partial`、`missing`、`not-comparable`、`needs-source`；同义工具、共享内核和不同工作流分开记录。
4. 每批抽 5–10 个高重合工具做同输入对照，记录正常值、边界、错误、下载产物、网络行为和证据等级；没有实测就标 `unverified`。
5. 为页面质量单独建列：移动 320/390px、键盘焦点、标签/状态/错误、暗色与 RTL、对比度、标题/H1/description、FAQ/步骤、内部链接、结构化数据、规范链接和 hreflang。样式借鉴只记录可验证的交互模式，不复制同行品牌或文案。
6. 按用户需求证据、纯客户端可行性、数据/授权依赖、维护成本和 SEO 意图排序，拆成连续交付批次；复杂 PDF、政策数据、密码学和需要外部服务的能力保留明确门槛。
7. 每个实现批次遵循现有工程约束：先测试，再写 `_lib` 纯逻辑、engine、15 语文案、registry/MCP/SEO，最后做浏览器、键盘、axe、构建和静态/HTTP SEO 回归。

### 实现前置门槛

已验收的独立缺口为 `crc16-modbus`、`image-color-picker`、`ipv4-range-expander`、`csv-table-editor` 和 `image-palette-generator`。LDDGO 逐项映射与剩余同行同输入验证仍在交付账本。

## 可复核来源

- [LDDGO 中文首页](https://www.lddgo.net/)
- [LDDGO English 首页](https://www.lddgo.net/en/index)
- [LDDGO 中文分类目录 1-10](https://www.lddgo.net/base/class?classID=1)（将 `classID` 替换为 2 至 10）
- [LDDGO English 分类目录 1-10](https://www.lddgo.net/en/base/class?classID=1)（将 `classID` 替换为 2 至 10）
- [LDDGO sitemap.xml](https://www.lddgo.net/sitemap.xml)
- [国内能力研究](2026-11-20-domestic-tool-gaps.md)
- [全球能力研究](2026-11-20-global-tool-gaps.md)
- [既有工具同题 benchmark](2026-11-20-shared-tool-benchmark.md)
- [综合交付账本](2026-11-20-delivery-ledger.md)
- [同行景观与页面质量抽样](2026-11-21-peer-landscape-research.md)
- [同行同输入批次 1](2026-11-21-peer-same-input-batch1.md)
- [同行同输入批次 2](2026-11-21-peer-same-input-batch2.md)
- [同行目录批次 3](2026-11-21-peer-catalog-batch3.md)
- [LDDGO 目录和分层元数据样本](2026-11-21-lddgo-catalog-matrix.md)
- [LDDGO 精确 slug 候选复核](2026-11-21-lddgo-exact-slug-review.md)
- [CRC-16/Modbus 验收记录](2026-11-21-crc16-modbus-verification.md)
- [CRC 页面 HTTP SEO 抽检](2026-11-21-crc16-http-seo-audit.json)
- [图片像素取色器实现与验收](2026-11-21-image-color-picker-verification.md)
- [IPv4 地址区间展开验收](2026-11-21-ipv4-range-expander-verification.md)
- [IPv4 浏览器原始记录](2026-11-21-ipv4-range-browser.json)
- [本轮全量静态 SEO 记录](2026-11-21-continuation-static-seo.json)
- [CSV 表格与整图色板集成验收](2026-11-21-table-palette-verification.md)
- [LDDGO 语义能力映射](2026-11-21-lddgo-semantic-batch1.md)

## 较早的验证记录

- LDDGO 中文/英文首页：均显示 420。
- 20 个分类页（中文 10、英文 10）：目录卡片计数与中文分类合计均为 420；中文目标链接无重复。
- sitemap：635 条 `<loc>`、633 个唯一地址；语言归一化后覆盖 275/420 目录目标。
- CRC/MCP/registry/overlay：此前 28 项定向测试通过；图片取色器新增定向测试见独立记录。最新全量结果以本交接末尾的复核命令输出为准。
- 图片取色器交付时，`hash-digests.ts` 的类型错误阻断了生产构建。图片取色器相关 ESLint 为 0 错误、0 警告，全仓 lint 为 0 错误、55 条警告，MCP 构建通过。
- HTTP SEO：24/24 sitemap 页面抽检通过（canonical、hreflang、H1、title、JSON-LD、OG、WebApplication）；CRC 页面直接响应 200、预渲染且缓存命中。
- 浏览器可访问性树确认 CRC 英文页的 H1、默认 `CDC5 / C5CD`、输入标签、skip link 与本地处理说明。尚未完成此工具的窄屏截图、键盘逐项操作和实际错误态浏览器截图。
- 11 个 LDDGO 精确 slug 候选复核完成，22 个中英文详情页元数据齐全；未伪造同输入交互结论。
- `image-color-picker` 浏览器验收完成：2×2 RGBA fixture 的红、半透明绿、透明、白色采样；坐标输入、方向键、复制状态、清空、无效文件错误和 390px 无横向溢出均有实际观察。完整边界与未覆盖格式见独立验证记录。
- 图片取色器阶段定向 28 项通过。该历史快照中全仓 2,471 项通过，6 个 RIPEMD-160 用例失败。已被文首列出的新一轮全量验证替代。
- 同行同输入批次 1：5 组、5/5 完成；JSON 大整数/重复键/-0 保真与 CJK 词数规则差异均已留证据。
- 未推送、未部署；工作树当前改动仍待 review/提交。

## FreeConvert 追加研究（2026-11-21）

已完成一批新的官方目录取证，详见 [FreeConvert 审计](2026-11-21-freeconvert-directory-audit.md) 和 [结构化报告](2026-11-21-freeconvert-directory-audit.json)：5 个主 sitemap 共 `100,986` 个精确唯一语言 URL；去掉 15 个语言前缀后为 `6,752` 个唯一路径，其中 `6,499` 条包含 `-to-`。这些是 URL/path 计数，不是独立工具数。首页和图片压缩页均观察到任务型 title/H1/description、自指 canonical、16 个 hreflang（含 x-default）；首页有 Organization/WebSite/WebApplication JSON-LD，图片压缩页另有 BreadcrumbList/HowTo。隐私页声明文件存储于 AWS S3 爱尔兰并在 8 小时后自动永久删除，属于服务端上传产品政策，不是网络行为实测。

本批没有上传文件，没有做 FreeConvert 与本地同文件产物比较，也没有做全目录键盘/axe/读屏审计。下一步仍是对图片/PDF/音频转换高重合项做同输入批次，记录 MIME、尺寸/页数、元数据、透明度、质量、错误和清理行为；未取得这些证据前状态保持 `needs_same_input_batch`/`unverified`。

浏览器补验：图片压缩页 `390x844` 下文档与 body 宽度均为 390，无页面级横向溢出；两个多文件输入的 `accept` 为 `.jpeg,.jpg,.png,.gif,.webp,.heic`。报告 JSON 数量一致性断言通过，`git diff --check` 通过。本轮没有跑应用测试或上传文件，因为没有改应用代码且第三方产物对照仍待专门的同文件批次。

## Zamzar 追加研究（2026-11-21）

已完成 [Zamzar 审计](2026-11-21-zamzar-directory-audit.md) 与 [结构化报告](2026-11-21-zamzar-directory-audit.json)：官方五个 sitemap 共 `4,975` 个 `<loc>`、`4,971` 个精确唯一 URL，其中 `4,643` 个唯一 `/convert/source-to-target/` 配对页、165 个格式目录页、14 个压缩页和 131 个工作流页；配对页是索引路由，不是独立工具数。`/convert/png-to-jpg/` 真实抽样有任务型 title/H1/description、canonical、6 个 hreflang、JSON-LD、三步流程、FAQ 和双向格式内链；390px 下无页面级横向溢出，首个 Tab 落在品牌链接。隐私页声明转换输出最长保留 7 天后永久移除。

本批没有上传文件，没有做 Zamzar 与本地 PNG→JPG/PDF→JPG/OCR 的同文件产物比较，也没有全目录键盘/axe/读屏审计。下一步仍按 `needs_same_input_batch` 处理，记录 MIME、尺寸/页数、透明度、元数据、质量、错误和删除行为。
