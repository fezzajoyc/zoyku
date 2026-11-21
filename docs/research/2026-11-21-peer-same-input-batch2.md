# 同行同输入对照批次 2

研究日期：2026-11-21（Asia/Shanghai）  
结构化证据：[JSON 报告](2026-11-21-peer-same-input-batch2.json)  
范围：Zoyku 与 IT-Tools 的 URL 编码、URL 解析、日期时间、IPv4 子网、UUID 五组高重合工具。证据来自真实浏览器输入、可见结果和页面契约抽样，不是全站排名。

## 结论

五组样本的核心成功路径都能复现。URL 编码的组件编码、URL Parser 的协议/主机/端口/路径、IPv4 `/26` 的网络结果和 UUID v4 的格式符合独立预期；日期转换同一时间点的秒级结果也一致。

差异主要在语义边界和页面层：Zoyku 的 URL Parser 对重复 query key 分行呈现，IPv4 页补充 usable/private 字段，非法输入提示更具体；IT-Tools 的 UUID 页面运行时提供 NIL、v1、v3、v4、v5 多版本按钮。日期页对负数字的自动识别不同，不能把两个输入方向当成同一规则。

## 五组证据

| 工具 | 固定输入 | 结果 | 边界或产品差异 |
| --- | --- | --- | --- |
| URL Encoder | `a=1&b=2 / café` | 两边 `encodeURIComponent` 输出完全一致；Zoyku 另有 `encodeURI` 模式 | IT-Tools 把 Encode/Decode 分成两个面板 |
| URL Parser | `https://example.com:8443/shop/shoes?color=red&color=blue#reviews` | 协议、主机、端口、路径一致 | Zoyku 将重复 `color` 分两行；IT-Tools 观察到的 UI 只显示最后一个值；非法输入双方都拒绝，Zoyku 提示含修复动作 |
| Timestamp / Date-time | `2023-11-14T22:13:20Z ↔ 1700000000` | 秒级时间戳、UTC 和 Asia/Shanghai 时间一致 | `-1` 时 Zoyku 按 Unix 秒，IT-Tools 日期页按 Excel 日期语义；无效日期错误文案不同 |
| IPv4 Subnet | `192.168.1.130/26` | 双方网络 `192.168.1.128/26`、广播 `.191`、掩码和主机范围一致 | Zoyku 还显示 usable hosts、total addresses、private range；`/33` 双方均拒绝，Zoyku 给出 `/0–32` 范围 |
| UUID Generator | count 1, v4 | Zoyku 运行时输出合法 v4 UUID；随机值不作字面比较 | IT-Tools 运行时提供 NIL/v1/v3/v4/v5 版本选择；数量 0 的交互约束不同。当前本地运行时只显示 v4 控件，但源码引擎包含更多版本分支，应先做构建/运行时对齐复核 |

## 页面质量、SEO 与无障碍观察

- Zoyku 五页都有任务型 title、meta description、H1 和自指 canonical；文案说明本地处理和输入规则。
- IT-Tools 运行时页面有任务型 title/H1/description，但 `curl` 读取的初始 HTML 五页都使用通用站点 title、description 和 `https://it-tools.tech` canonical。这个差异足以列为 SEO 模板风险，不能直接推断排名结果。
- 十个 URL 在 `390x844` 均测得 `document.documentElement.scrollWidth = document.body.scrollWidth = 390`，本批没有页面级横向溢出。
- Zoyku 五页首次 Tab 聚焦 `Skip to content`；IT-Tools 的首次焦点落在品牌链接、Timestamp 控件或 Refresh 按钮，首焦点顺序不统一。该观察不构成 WCAG 合规评分。

## 对 Zoyku 的可执行学习项

1. 继续保持每个工具页的任务型 title、description、H1 和自指 canonical，并对所有语言跑唯一性审计。
2. 给 Unix 时间戳输入明确的秒/毫秒约束；负数和非法日期要有可操作提示，避免与 Excel 日期语义混淆。
3. 先复核 UUID 本地开发运行时与 `tools/_engines/dev-engine-uuid.tsx` 的版本分支是否使用同一构建产物，再让版本按钮、页面 tagline 和引擎实现保持一致；补 NIL、v1、v3、v5、v7 标准向量，数量 0/501 要有明确反馈。
4. 保留 URL Parser 对重复 query key 的逐行呈现和 Copy as JSON；补 IPv6、credential、空 key、自定义 scheme 的回归矩阵。
5. 把 IPv4 的 `/31`、`/32`、非法八位组、双 IP 最小覆盖 CIDR 加入浏览器验收，锁定可用主机数口径。

## 未验证范围

本批没有测大文件性能、下载产物、真实设备读屏、axe 全量、网络请求、搜索量、排名、流量、反向链接或转化。UUID 只验证格式和版本/数量约束，不比较随机字符串本身。完整输入、输出、URL、元数据和限制见 JSON 报告。
