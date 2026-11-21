# LDDGO 官方目录快照与 Zoyku 初步映射

抓取时间：2026-11-21T13:04:50Z。来源为 LDDGO 官方中英文首页及 20 个分类页。

## 计数

- 中文分类页卡片：420；语言归一化后的唯一目标：420。
- 英文分类页卡片：420。
- 本地 registry 定义扫描：214。
- 路由叶段与本地 slug 完全相同的候选：11；这只说明 slug 相同，不证明功能等价。
- 目标类型：`{"same_origin_tool": 411, "external": 2, "documentation": 5, "web_application": 2}`。

| 分类 | 中文卡片数 | 英文卡片数 |
| --- | ---: | ---: |
| 字符 STRING | 93 | 93 |
| 转换 CONVERTER | 39 | 39 |
| 加密 ENCRYPT | 50 | 50 |
| 网络 NETWORK | 18 | 18 |
| 更多 MORE | 82 | 82 |
| 图表 CHART | 16 | 16 |
| 数学 MATH | 27 | 27 |
| 坐标 COORDINATE | 23 | 23 |
| 图片 IMAGE | 49 | 49 |
| 文件 FILE | 23 | 23 |

## 映射规则与限制

- 每条卡片保留中英文标题、简介、目标链接及对应官方分类页证据。
- 只自动生成 route leaf 与 Zoyku slug 完全相同的候选；即使完全相同也保留 `needs-source`，需人工确认场景和功能范围。
- 外部链接、文档页、独立 Web 应用标记为 `not-comparable`；格式异常路径标记 `needs-source`。
- 未找到精确候选不等同于缺失；未逐页核查的同义能力不猜测，均保留 `needs-source`。
- 本快照不包含同输入功能测试、关键词搜索量/排名或同行无障碍审计。

## 详情页抽样

已请求 120 个详情页。可采的 410 对中英文链接共 820 页，本次覆盖率为 14.6%。HTTP 状态分布为 `{"200": 120}`。

样本按各分类中目录位置等距选取。每次串行请求间隔至少 0.6 秒。采集范围和排除路径依据采集时的 [robots.txt](https://www.lddgo.net/robots.txt)。仅选取官方目录中可按路径配对的同源工具，外链、文档、独立应用和路径异常归入未抽样项。

| 分类 | 可采配对 | 样本配对 | 已请求页面 | 成功页面 |
| --- | ---: | ---: | ---: | ---: |
| 字符 STRING | 92 | 6 | 12 | 12 |
| 转换 CONVERTER | 39 | 6 | 12 | 12 |
| 加密 ENCRYPT | 50 | 6 | 12 | 12 |
| 网络 NETWORK | 18 | 6 | 12 | 12 |
| 更多 MORE | 76 | 6 | 12 | 12 |
| 图表 CHART | 16 | 6 | 12 | 12 |
| 数学 MATH | 26 | 6 | 12 | 12 |
| 坐标 COORDINATE | 23 | 6 | 12 | 12 |
| 图片 IMAGE | 47 | 6 | 12 | 12 |
| 文件 FILE | 23 | 6 | 12 | 12 |

成功页面的字段计数为 `{"title": 120, "h1": 120, "meta_description": 120, "meta_keywords": 120, "canonical": 0, "self_canonical": 0, "json_ld_types": 0}`。自指 canonical 按实际响应 URL 比较。字段计数反映 HTML 内的标签，交互和渲染表现需另行验证。

机器可读逐行数据：[`2026-11-21-lddgo-catalog-matrix.json`](2026-11-21-lddgo-catalog-matrix.json)。

## 刷新

在 `toolsite` 目录运行：

```sh
python3 scripts/research/lddgo-catalog-snapshot.py
python3 scripts/research/lddgo-catalog-snapshot.py --fetch-page-metadata
```

## 11 个精确 slug 候选复核

本节重放既有 [精确 slug 复核记录](2026-11-21-lddgo-exact-slug-review.md) 的 11 条映射和 22 页元数据。证据来自 2026-11-21 的详情 HTML 与本地源码；本次重放未发起网络请求。历史记录中的浏览器占用说明保留在原报告，同行同输入运行仍未验证。

这些历史元数据保存在每行的 peer_review.page_seo，120 页分类分层抽样继续保存在 page_seo。两者去重合并共 142 页，重叠 0 页。原有抽样计数及分类覆盖率只统计那 120 页。

| ID | 精确同名 Zoyku | 判断 | 对照记录 |
| --- | --- | --- | --- |
| LDDGO-01-043 | `json-viewer` | **partial** | Core tree viewing is present locally with typed values, expand/collapse and formatted-source copy. The peer page exposes file open/download and a compress action; those workflows are not present in the local engine. |
| LDDGO-01-082 | `ulid-generator` | **partial** | Both generate ULIDs locally and expose batch output. The local tool uses crypto.getRandomValues, shows decoded timestamps and caps quantity at 100; the peer page exposes seed-time, monotonic and join-format controls plus download. Those option semantics are not equivalent. |
| LDDGO-01-084 | `json-diff` | **partial** | Both compare two JSON documents and report path-level changes. The local engine returns added/removed/changed entries and has a local copy action; the peer page additionally exposes per-side file open controls and an example/return workflow. |
| LDDGO-05-014 | `stopwatch` | **partial** | Core stopwatch and lap timing are present locally, with requestAnimationFrame display anchored to Date.now and explicit start/pause/resume/lap/reset states. The peer page exposes lap download; the local tool has no matching export control. |
| LDDGO-05-071 | `bmr-calculator` | **partial** | The local route calculates Mifflin-St Jeor BMR with metric/imperial input and a documented formula note. The peer route offers four formula choices, an optional body-fat field and kcal/kJ output plus share/clear controls; local formula selection and sharing are absent. |
| LDDGO-07-018 | `gpa-calculator` | **partial** | Both accept course rows and credits and calculate GPA. The local route supports letter grades, 4.0/5.0 scale, cumulative transcript blending, sample and clear; the peer route accepts 100-point, 5-point and grade inputs and has a weighted switch. Input conversion rules are therefore only partially comparable. |
| LDDGO-07-019 | `percentage-calculator` | **partial** | The local route covers three live modes: X% of Y, X as a percentage of Y, and percentage change with increase/decrease direction. The peer markup exposes several grouped input/result pairs, so its exact mode set is broader or differently organized; the two surfaces are not proven equivalent. |
| LDDGO-09-015 | `color-picker` | **partial** | The exact-slug color-picker remains a screen/swatch tool. The later image-color-picker route implements local-image pixel sampling and HEX/HEX8/RGB/RGBA output; it supersedes the historical missing-tool annotation. This capability mapping does not claim same-image equivalence with the peer. |
| LDDGO-09-016 | `crop-image` | **partial** | The local crop route supports free and fixed aspect-ratio crops, numeric coordinates and applying a selection to multiple files. The peer route explicitly supports grid/row-column splitting and a width-height mode; local grid splitting is a separate image-splitter route, so the exact route is only partial. |
| LDDGO-10-008 | `image-to-pdf` | **partial** | Both accept multiple images and expose page size, orientation, margin and ordering. The peer page has an explicit single-versus-multiple-PDF output mode; the local engine emits one PDF for the selected image list and does not expose that split-output mode. |
| LDDGO-10-011 | `compress-pdf` | **partial** | Both expose local PDF compression with downloadable output. The peer uses named compression presets; the local route exposes DPI, JPEG quality and grayscale, and explicitly rasterizes pages before rebuilding the PDF. The parameter models and preservation guarantees differ. |

图片颜色提取的旧“缺少独立工具”注释保存在 historical_mapping。当前能力映射为 `image-color-picker`（existing），表示本地已具备图片像素采样工作流；对同行的同图结果、完整格式和交互等价性保持未验证。
