# 用户指定同行目录补查

日期：2026-11-21。SmallSEOTools.net 与 smallseotools.com 是不同域名。本轮只读取公开页面，未在外站提交用户数据。

| 来源 | 实际响应 | 唯一目录链接 | 范围 |
| --- | --- | --- | --- |
| SmallSEOTools.net | 200 | 147 | 首页 data-tool-name 的明确工具链接 |
| RapidTables home | 200 | 43 | 指定页面的分类、工具及参考链接，非全站完整清单 |
| RapidTables tools | 200 | 52 | 指定页面的分类、工具及参考链接，非全站完整清单 |
| Omni sitemap | unavailable | 0 | 指定页面的分类、工具及参考链接，非全站完整清单 |

SmallSEOTools.net 首页提取 147 个唯一工具入口。RapidTables 首页与工具索引去重合并为 89 个 URL，包含分类和参考入口，不能称为 89 个独立工具。Omni sitemap 本次返回 403；保持失败记录，既有 Omni 选定计算器的研究记录继续保留，未冒称全站采集。

## 具体排期方式

对缺失候选继续核对输入输出和依赖：SmallSEOTools.net 的 disavow 文件生成、SSL 检查/转换涉及不同的数据来源；RapidTables 的可编辑图表、ASCII参考表和电学计算属于新工作流。现有工具重合项先补选项与文案，不按URL再造内核。页面菜单或营销数量只作为发现线索，不能证明对应工具正确运行。

本轮同输入运行数为 0。可复采集脚本为 scripts/research/named-peer-catalogs.py，逐链接条目、响应状态、原文 SHA-256 见[JSON](2026-11-21-named-peer-catalogs.json)。
