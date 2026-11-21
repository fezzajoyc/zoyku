# 同行同输入对照批次 1

研究日期：2026-11-21（Asia/Shanghai）  
结构化证据：[JSON 报告](2026-11-21-peer-same-input-batch1.json)  
范围：Zoyku 与 IT-Tools 的 5 个高重合工具。样本是可复现的运行时证据，不是全站排名。

## 结论

这批的共同成功路径已经覆盖哈希、Base64、JSON、文本统计和正则五类：哈希的 MD5/SHA-1/SHA-256、Base64 的 UTF-8 解码、JSON 基本格式化、英语字数统计、正则匹配索引和捕获组都能在双方得到一致结果。

差异集中在边界与产品取舍：Zoyku 的 JSON Formatter 保留大整数、重复键、负零和原始字面量，IT-Tools 的 JSON.parse/JSON.stringify 路径会舍入、合并或规范化这些值；Zoyku 把 CJK 字符逐字计入词数，IT-Tools 的文本统计把 `你好世界` 计为一个词，但 IT-Tools 额外显示 UTF-8 字节数；空输入哈希结果也不同。

## 五组证据

| 工具 | 固定输入 | 结果 | 边界差异 |
| --- | --- | --- | --- |
| Hash | `abc` | 共同 MD5/SHA-1/SHA-256 与标准向量一致 | IT-Tools 还提供 SHA-224、RIPEMD-160、SHA3 等；空输入 IT-Tools 显示摘要，Zoyku 不显示 |
| Base64 Decoder | `Y2Fmw6kg8J+Zgg==` | 双方均输出 `café 🙂` | `@@@` 都拒绝；Zoyku 展示原生 atob 异常，IT-Tools 展示 `Invalid base64 string` |
| JSON Formatter | `{"b":1,"a":2}` | 双方均成功格式化 | `9007199254740993`、重复 `x`、`-0` 的保真不同；非法 JSON 的错误定位粒度不同 |
| Word Counter / Text statistics | `one two three` | 3 words、13 chars、1 line 一致 | `你好世界`：Zoyku 4 words，IT-Tools 1 word；IT-Tools 显示 12 bytes |
| Regex Tester | `\\b(cat|dog)\\s+(\\d+)\\b` + `cat 12 dog xx dog 34` | 双方 2 个匹配，索引 0/14，capture groups 一致 | `(` 都能恢复；Zoyku 显示 `Unterminated group`，IT-Tools 显示 `Invalid regex` |

## 页面质量观察

- 五个 Zoyku 页面都返回页面级 title、meta description 和 H1；文案包含工具任务、隐私/本地处理或输入规则。
- IT-Tools 的运行时页面标题和 H1 是页面级的，但本批 HTML 响应的 title 与 description 都是站点通用文本；这是需要独立生产抓取确认的 SEO 风险观察，不能直接等同于搜索排名结论。
- word-counter、regex-tester 与对应 IT-Tools 页面在 `390x844` 视口均测得 `document/body.scrollWidth = 390`，本批没有页面级横向溢出。
- Zoyku 两个页面首次 Tab 聚焦 `Skip to content`；IT-Tools 对应页面首次 Tab 聚焦品牌链接。该结果只说明本次键盘路径，不构成 WCAG 合规评分。
- IT-Tools 正则页在正常样本下提供匹配表、正则图和 cheatsheet 入口；Zoyku 提供捕获组清单、错误原因和本地处理说明。

## 对 Zoyku 的可执行学习项

1. 评估哈希算法扩展：SHA-224、RIPEMD-160、SHA3 族必须配独立标准向量和兼容性口径。
2. 把 Base64 原生异常替换成用户可读错误，并补 padding、换行和二进制边界。
3. 保留 CJK 逐字计数规则，同时可以加一个独立的 UTF-8 byte size 指标，避免用户把字符数和传输字节数混淆。
4. 评估正则图/解释和多方言说明，但继续锁定错误恢复、零宽匹配和 ReDoS 限制。
5. 继续保持每个工具的页面级 title、description、H1、键盘跳过链接和移动无溢出回归；不能用站点通用 description 代替工具意图。

## 未验证范围

本批没有测大文件性能、下载产物、真实设备读屏、全量 axe、网络请求、搜索量、排名、流量、反向链接或转化。同行目录数量、页面说明和营销文案都没有被当作正确性证据；五组样本也不能推出“Zoyku 全面优于同行”。

完整输入、输出、URL、元数据和限制见 JSON 报告。
