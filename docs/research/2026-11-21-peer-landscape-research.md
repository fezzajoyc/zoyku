# 同行工具站景观与页面质量抽样

研究日期：2026-11-21（Asia/Shanghai）  
完整结构化数据见 [JSON 报告](2026-11-21-peer-landscape-research.json)。

这轮把同行范围从 LDDGO 扩展到 IT-Tools、PDF24、Toolbox365、10015、BeJSON、JSON.cn、Calculator.net、CyberChef、regex101、DevToys，并记录了 Omni Calculator 和 RapidTables 的访问受限情况。目录和首页的数量不能直接相加为独立工具数量，但实际抽到的规模已经超过 1,200 个跨站卡片/路由记录：LDDGO 420、IT-Tools 86、PDF24 133、Toolbox365 288、10015 278。

页面质量的可复核观察如下：

- IT-Tools 的运行时侧栏显示 86 个唯一工具路由，按 Crypto、Converter、Web、Images & Videos、Development、Network、Math、Measurement、Text、Data 分组；首页没有运行时 `h1`，但有清晰的 meta description、搜索和主题切换控件。
- PDF24 的 All Tools 页显示 133 个唯一英文工具路径，页面有 All Tools 的 `h1`、分类 `h2`、搜索框、收藏和最近使用区域；桌面和 390px 抽查均无页面级横向溢出。
- Toolbox365 首页 meta 仍写“160+”，实际 `.db-card` 选择器得到 288 个唯一卡片，说明公开计数和 DOM 卡片口径不同；不能直接说它有 288 个独立工具。
- 10015 首页有 278 个唯一 `/tools/` 路径，并使用 3 个 JSON-LD 脚本；390px 抽查无页面级横向溢出。
- BeJSON 首页的 390px 文档宽度为 914px，主要越界元素是 1000px 编辑区和 608px 下拉菜单；这是待复查的布局观察，不是完整 WCAG 结论。
- DevToys 是桌面应用官网，不应和浏览器工具目录直接排名；其 390px 落地页宽度为 490px，越界主要来自插图/截图布局。
- IT-Tools `hash-text` 输入 `abc` 后，SHA-256、SHA-224、RIPEMD-160 输出与标准向量一致。这是本轮唯一新增的同行同输入实测，不代表整站质量。

目前没有使用搜索摘要、流量、排名或营销数字证明优劣；被 Cloudflare 拦截或没有内容的站点按“未取得证据”记录。后续要做的是保存路由级清单、同义去重、20 个高重合工具的同输入双边实测，以及匹配页面的键盘、axe、移动和 SEO 字段审计。
