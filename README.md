# Zoyku — 230 个浏览器工具

面向全球用户的免费工具站。**230 个工具 × 15 语言 = 3,450 个工具页**；工具文件和本地文本在浏览器处理，DNS、IP、汇率等联网步骤单独披露。托管、静态资源及外部服务仍有成本和使用限制，不能概括为“零服务器成本”。同行能力、功能差距和验收范围详见 [docs/benchmark.md](docs/benchmark.md)。

## 数字事实源(改任何数字前先跑)

| 事实 | 数值 | 来源(唯一事实源) |
|---|---|---|
| 工具数 | 230 | `tools/registry.ts` ALL_TOOLS.length(测试锚定 tests/registry.test.ts) |
| 语言数 | 15 | `lib/site.ts` LOCALES |
| 工具页 | 230 × 15 = 3,450 | registry × LOCALES |
| sitemap URL | 构建生成并审计 | 以本轮生成的 sitemap 与 SEO 报告为准，不能把本地改动当作已部署 |
| MCP 可执行工具 | 52 | `mcp/tools.ts` MCP_TOOLS.length |
| 测试 | 见最新验证记录 | `npx vitest run`，数量不等于全站功能或合规证明 |

**纪律:README/首页/文案里的每个统计数字必须能对上事实源;数字变了先改事实源,再改文档。**

## 架构

- **静态优先**:SSG 全量预渲染,Vercel edge 分发;逻辑全部客户端。
- **注册表驱动**:工具 = `tools/{category}/{slug}.ts` 一个定义文件(引擎接线 + 5 语文案);目录/sitemap/内链/搜索全部派生,禁止绕过注册表手写页面。
- **纯逻辑下沉 `tools/_lib/`**:数学/解析/换算可单测;引擎只做 UI 编排。
- **重库懒加载**:docx/pdf-lib/pdfjs/tesseract 等只在事件处理器内 `await import()`。
- **扩展语言 overlay**:`tools/_i18n/{locale}.ts` 覆盖层 ×10 语,`toolCopy()` 统一取词;契约测试强制覆盖全部 slug。

```
toolsite/
├── app/[lang]/          # 路由(page/tools/categories/legal/mcp)
├── components/          # UI kit + 引擎壳
├── lib/                 # i18n 字典 ×15 + meta + site 常量
├── tools/
│   ├── text/ unit/ pdf/ image/ calculators/ dev/ seo/ security/ utility/ media/
│   ├── _engines/        # 客户端引擎(React)
│   ├── _lib/            # 纯逻辑(可单测)+ unit-tool 工厂 + category-intros
│   └── _i18n/           # 10 overlay 语种覆盖层
├── tests/               # vitest(数学/SEO/注册表/overlay 契约/文件产物)
├── mcp/                 # 52 个 AI 可执行工具(zod + stdio/HTTP 双通道)
└── scripts/             # 部署前清理、生产巡检、SEO 审计
```

## 命令

```bash
npm run dev        # 开发
npm run build      # 生产构建
npx vitest run     # 全量测试
npm run audit:seo  # SEO 门禁(sitemap 逐条)
bash scripts/deploy-clean.sh   # 清旧部署(保留3)→ 生产部署
```

## 隐私口径(诚实三分,不许绝对化)

- **LOCAL**(绝大多数):文件/文本全程本地,PDF/图片/文本/密码/TOTP 等。
- **NETWORK**(明示):汇率(open.er-api.com)、DNS/IP/WHOIS(Google DNS / ipwho.is / rdap.org)——引擎内有 Network Notice。
- **CDN**(明示):OCR 引擎与语言包首次使用时从 CDN 下载(10–20 MB),文档本身不上传。

承诺写法:**"Your files never leave your device"**(文件级为真);禁用 "Nothing you do here leaves your device"(绝对句,与查询类工具冲突)。

## 已知边界(诚实清单)

- pdf-lib 不支持写加密 → 无"给 PDF 加密码"工具(能力边界,不做假功能)。
- OCR 输出为可编辑文本 + .txt(不重写 PDF;需要可搜索 PDF 的用户引导至桌面套件)。
- 移动端 iOS 高版本 HEIC 支持依赖浏览器解码能力。
