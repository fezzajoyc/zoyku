---
name: zoyku-engineering
description: Zoyku 工具站的功能质量标准。添加或修改任何工具、引擎、_lib 纯函数、数据集或 SEO 路由时必须使用;写测试代码、审查功能质量、修 bug 后回归时也必须使用。核心:每个功能带全覆盖引擎测试(正常/边界/非法/Unicode/空值)+ 浏览器交互验收,反复打磨直到没有已知瑕疵。
---

# Zoyku 工程质量标准

一份功能从"能跑"到"可发布"要过四道关:**实现 → 测试 → 交互验收 → 回归**。四道全过才算完成;跳过任何一道都是滥竽充数。

## 0. 铁律(每次改动都适用)

1. **RSC 边界**:工具定义文件是服务端组件,传给引擎的 props 必须可序列化。函数一律走 `tools/_lib/transform-registry.ts` 的 ID 引用。
2. **重库懒加载**:pdf-lib / pdf.js / tesseract / heic2any / jszip 等只在事件处理器内 `await import()`,绝不进主包。
3. **诚实状态**:空态 / 加载态 / 错误态 / 降级态都要真实呈现。做不到的能力直说(参考 unlock-pdf 的跳过理由),联网步骤必须披露。
4. **纯逻辑下沉 `_lib`**:可测的数学、解析、变换逻辑写在 `tools/_lib/*.ts` 并导出;引擎组件只做 UI 编排。新写引擎时先想清楚"哪些部分要测试"。
5. **五语契约**:每个工具 en/zh/ja/es/pt 五语文案齐全(name/tagline 110–160 字符、steps ≥3、faqs ≥2),`tests/registry.test.ts` 强制。
6. **自愿嵌入**:任何"被他人引用"的资产(徽章等)必须自愿使用,不强制署名。

## 1. 测试标准(核心)

每个功能必须有 `tests/*.test.ts`,放 `tests/` 目录,`@` 别名指向项目根。覆盖矩阵:

| 层 | 必测 | 例 |
|---|---|---|
| 纯函数 | 正常值、**空输入**、**边界**(0/负/极大极小)、**非法输入**(不得抛未处理异常)、**Unicode 与 CJK**、**往返一致性** | slugify(" Café!")、formatNumber(1e21)、dedupeLines("") |
| 数据集 | 唯一性、字段完整、格式合法、条数达标 | emoji 无重复字符、状态码分组正确 |
| 文件操作 | Node 里用**字节级构造的合法文件 + 畸形文件**跑真实流程,断言语义 | 合并/拆分/加页码:页数、输出文件名、**页码规格 1 基** |
| 加密/随机 | 与独立实现比对(TOTP 与 RFC 6238)、统计分布 | qr 生成→解码往返 |
| SEO 面 | sitemap 覆盖每个工具×每语言、robots 放行清单、badge 变体可渲染、.md 路由内容 | `app/sitemap.ts` 可直接导入断言 |
| 注册表 | slug 唯一、五语齐全、related 可解析、分类非空(已有) | registry.test.ts |

**回归铁律:每修一个 bug,必须同时提交一个能抓住它的测试。** 例:拆分 PDF 的 0 基/1 基页码 bug → `pdf-ops.test.ts` 里 "split every-N groups are 1-based" 永久存在。没有测试的修复等于没修。

**测试纪律:**
- 不许为让测试通过而改产品语义;发现语义错误先修产品。
- 不许 mock 掉被测逻辑本身;只 mock 环境(Canvas、fetch)。
- 不许 skip / todo 掉失败的测试;失败要么修,要么删功能。
- 测试名写行为不写实现:"split every-N groups are 1-based" ✓,"test split" ✗。
- 边界必查清单:空字符串、空数组、单元素、0、负数、1e21/1e-9、非 ASCII、表情符号、超长输入(≥10⁴ 字符)、畸形文件字节。

## 2. 交互验收标准(测试之外的浏览器实测)

单元测试绿了不等于能发布。每个功能上线前用浏览器真实驱动一次:

- 注入**真实字节**的文件(DataTransfer 构造),不是点一下看有没有反应。
- 断言**可见结果**:产出行、数字、文件名、下载按钮——用 `textContent`/DOM 断言,不凭感觉。
- 联网工具:至少验证降级路径(断网/失败态文案)。
- 结果数字要**第三方核对**:换算值、公式结果与独立计算比对(如 EMI 对公式、TOTP 对 RFC 6238 独立实现)。
- 五语各开一遍工具页,抽查 H1 与引擎文案。

## 3. 打磨循环

实现 → `npx tsc --noEmit` → `npm test` → 浏览器交互验收 → 找边界再补测试 → 全量回归 → 才算完成。改一个共享文件(transforms / registry / 引擎)必须跑全量测试 + 全量构建。

## 4. 文件组织

```
tests/*.test.ts          # vitest,environment: node,alias @ → 项目根
tools/_lib/*.ts          # 可测纯逻辑(转换、单位、金融数学、布局)
tools/_engines/*.tsx     # "use client" UI 编排 + 内嵌数据集(数据完整性也要测)
tools/<cat>/index.ts     # 分类注册(追加式)
```

## 5. 参考实现

- 纯函数 + 全覆盖测试:`tools/_lib/transforms.ts` ↔ `tests/transforms.test.ts`
- 数学核对:`tools/_lib/finance.ts` ↔ `tests/finance.test.ts`(复利对封闭公式)
- 字节级文件测试:`tests/pdf-ops.test.ts`(1 基页码回归)
- 数据集:`tests/data.test.ts`(emoji/http-status/fancy 映射完整性)
- SEO 面:`tests/seo.test.ts`(sitemap/robots/badge/.md 一致性)
- 往返:`tests/qr.test.ts`(qrcode 生成 → jsqr 解码)
