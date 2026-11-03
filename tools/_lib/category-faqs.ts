import type { CategoryId, Locale } from "@/lib/site";
import type { ToolCopy } from "./types";

/**
 * 类目 FAQ 池:工具页 FAQ 不足 6 条时按类目补齐(JSON-LD 同源走 toolCopy)。
 * 内容写"这个类目共同的真问题"(隐私/收费/格式/精度/浏览器支持),不是凑数占位。
 * 只写核心 5 语(en/zh/ja/es/pt);其他 locale toolCopy 本来就走 overlay 或回退 en。
 */
type Faq = { q: string; a: string };

const GLOBAL: Partial<Record<Locale, Faq[]>> = {
  en: [
    {
      q: "Is this tool free to use?",
      a: "Yes, completely free — no signup, no subscription, no daily limits, and no watermarks on the output.",
    },
    {
      q: "Does my data leave my device?",
      a: "No. The tool runs entirely in your browser with JavaScript. Nothing you type or upload is sent to a server, so it even works offline once the page has loaded.",
    },
    {
      q: "Which browsers does it work in?",
      a: "Any modern browser — Chrome, Firefox, Safari and Edge on desktop and mobile. No plugins or extensions are needed.",
    },
  ],
  zh: [
    {
      q: "这个工具免费吗?",
      a: "完全免费 — 无需注册、没有订阅、无每日限额,输出不带水印。",
    },
    {
      q: "我的数据会传到服务器吗?",
      a: "不会。工具完全在浏览器里用 JavaScript 运行,输入的文件和内容不会发送到任何服务器;页面加载后断网也能用。",
    },
    {
      q: "支持哪些浏览器?",
      a: "所有现代浏览器 — Chrome、Firefox、Safari、Edge,桌面和移动端通用,无需安装插件。",
    },
  ],
  ja: [
    {
      q: "このツールは無料ですか?",
      a: "完全無料です。登録・課金・回数制限はなく、出力にウォーターマークも入りません。",
    },
    {
      q: "入力したデータは外部に送信されますか?",
      a: "送信されません。すべてブラウザ内の JavaScript で処理されるため、入力・ファイルはサーバーに送られず、読み込み後はオフラインでも動作します。",
    },
    {
      q: "対応ブラウザは?",
      a: "Chrome / Firefox / Safari / Edge の最新版(デスクトップ・モバイル共通)。プラグインや拡張機能は不要です。",
    },
  ],
  es: [
    {
      q: "¿Esta herramienta es gratis?",
      a: "Sí, totalmente gratis: sin registro, sin suscripción, sin límites diarios y sin marcas de agua.",
    },
    {
      q: "¿Mis datos salen de mi dispositivo?",
      a: "No. Todo se procesa con JavaScript en tu navegador; nada se envía a un servidor. Incluso funciona sin conexión una vez cargada la página.",
    },
    {
      q: "¿En qué navegadores funciona?",
      a: "Cualquier navegador moderno: Chrome, Firefox, Safari y Edge, en escritorio y móvil. Sin plugins ni extensiones.",
    },
  ],
  pt: [
    {
      q: "Esta ferramenta é gratuita?",
      a: "Sim, totalmente gratuita — sem cadastro, sem assinatura, sem limites diários e sem marcas d'água.",
    },
    {
      q: "Meus dados saem do dispositivo?",
      a: "Não. A ferramenta roda inteiramente no seu navegador com JavaScript; nada é enviado a servidores e funciona até offline depois de carregada.",
    },
    {
      q: "Quais navegadores são suportados?",
      a: "Qualquer navegador moderno — Chrome, Firefox, Safari e Edge, no desktop e no celular. Nenhum plugin necessário.",
    },
  ],
};

const BY_CATEGORY: Record<CategoryId, Partial<Record<Locale, Faq[]>>> = {
  pdf: {
    en: [
      {
        q: "Will my PDF lose quality?",
        a: "No — the file is processed as a document structure, not re-encoded page by page, so text, fonts and embedded images keep their original quality. If anything changes it is shown before you download.",
      },
      {
        q: "Is there a file size limit?",
        a: "The practical limit is your browser's memory, not an artificial cap. Most PDFs up to a few hundred megabytes process fine on a normal computer.",
      },
      {
        q: "Can I use it on scanned documents?",
        a: "Yes. Structure operations (merge, split, rotate, page numbers) work on any PDF including scans. Text extraction needs OCR, which is a separate tool.",
      },
    ],
    zh: [
      {
        q: "处理后 PDF 会变糊吗?",
        a: "不会。这里处理的是文档结构,不是把页面重编码一遍,文字、字体和内嵌图片保持原画质;有变化会在下载前标明。",
      },
      {
        q: "文件大小有限制吗?",
        a: "实际上限是浏览器内存,不是人为阈值。几百 MB 的 PDF 在普通电脑上都能正常处理。",
      },
      {
        q: "扫描件能用吗?",
        a: "可以。合并、拆分、旋转、加页码等结构操作对任何 PDF 都适用,包括扫描件;提取文字则需要 OCR 工具。",
      },
    ],
    ja: [
      {
        q: "PDF の画質は落ちますか?",
        a: "落ちません。ページを再エンコードするのではなく文書構造として処理するため、文字・フォント・埋め込み画像は元の品質のままです。",
      },
      {
        q: "ファイルサイズの上限は?",
        a: "実質的な上限はブラウザのメモリです。数百 MB の PDF も通常のパソコンで問題なく処理できます。",
      },
      {
        q: "スキャン文書でも使えますか?",
        a: "結合・分割・回転・ページ番号など構造系の操作はスキャン PDF でも動作します。文字抽出は別ツールの OCR をご利用ください。",
      },
    ],
  },
  image: {
    en: [
      {
        q: "Which formats are supported?",
        a: "All common formats — PNG, JPG, WebP, AVIF, GIF and SVG — and the output can be downloaded in any of them. HEIC files from iPhones are also handled.",
      },
      {
        q: "Does editing reduce image quality?",
        a: "Lossless operations (crop, rotate, metadata strip) do not change pixels at all. Lossy exports (JPG/WebP) let you pick the quality slider, with the file size shown before you save.",
      },
    ],
    zh: [
      {
        q: "支持哪些图片格式?",
        a: "PNG、JPG、WebP、AVIF、GIF、SVG 全部支持,导出也可任选;iPhone 的 HEIC 也能直接处理。",
      },
      {
        q: "处理会影响画质吗?",
        a: "无损操作(裁剪、旋转、删元数据)不改像素;有损导出(JPG/WebP)可手动调质量,保存前能看到文件大小。",
      },
    ],
    ja: [
      {
        q: "対応フォーマットは?",
        a: "PNG / JPG / WebP / AVIF / GIF / SVG に対応し、出力形式も自由に選べます。iPhone の HEIC もそのまま処理できます。",
      },
      {
        q: "画質は劣化しますか?",
        a: "切り抜き・回転・メタデータ削除などの可逆操作はピクセルを一切変えません。JPG/WebP などの不可逆書き出しは品質スライダーで調整でき、保存前にファイルサイズが確認できます。",
      },
    ],
  },
  text: {
    en: [
      {
        q: "Is there a length limit?",
        a: "No artificial limit. Text is processed entirely in memory, so even very large documents work — the only practical bound is your device's RAM.",
      },
      {
        q: "Can I process multiple files at once?",
        a: "Text tools work on the text you paste or drop in; batch operations that support it show an explicit multi-file picker.",
      },
    ],
    zh: [
      {
        q: "文本长度有限制吗?",
        a: "没有人造上限。文本完全在内存里处理,大文档也能用,实际上限只取决于设备内存。",
      },
      {
        q: "能一次处理多个文件吗?",
        a: "支持批处理的工具会有明确的多文件选择入口;普通文本工具处理粘贴或拖入的文本。",
      },
    ],
    ja: [
      {
        q: "文字数に上限はありますか?",
        a: "人為的な上限はありません。テキストはメモリ内で処理されるため、大きな文書も動作します(実質的な上限は端末の RAM のみ)。",
      },
      {
        q: "複数ファイルをまとめて処理できますか?",
        a: "バッチ対応のツールには複数ファイル選択の UI があります。通常のテキストツールは貼り付け・ドロップしたテキストを処理します。",
      },
    ],
  },
  developer: {
    en: [
      {
        q: "Is the output safe to paste into production code?",
        a: "Yes. Formatting, escaping and conversion follow the relevant specs (RFCs, W3C, JSON Schema), and nothing is sent anywhere — you can verify the output locally before committing it.",
      },
      {
        q: "Does it work on large inputs?",
        a: "Yes — everything runs locally. A multi-megabyte JSON file or a long regex session is limited only by your machine, not by a request size cap.",
      },
    ],
    zh: [
      {
        q: "输出能直接进生产代码吗?",
        a: "可以。格式化、转义、转换都遵循对应规范(RFC、W3C、JSON Schema),而且全程本地执行,提交前你可以先本地验证结果。",
      },
      {
        q: "大输入能处理吗?",
        a: "可以。全部本地运行,几 MB 的 JSON 或超长正则测试只受你机器性能限制,不受请求大小限制。",
      },
    ],
    ja: [
      {
        q: "出力をそのまま本番コードに使えますか?",
        a: "使えます。フォーマット・エスケープ・変換は対応する仕様(RFC / W3C / JSON Schema)に準拠し、全てローカルで処理されるのでコミット前に結果を検証できます。",
      },
      {
        q: "大きな入力でも動きますか?",
        a: "動きます。全てローカル実行のため、数 MB の JSON や長い正規表現セッションもリクエスト上限ではなくマシン性能だけが制約です。",
      },
    ],
  },
  seo: {
    en: [
      {
        q: "Will generated tags hurt my existing site?",
        a: "No — you copy only the snippets you need. Generators produce standards-compliant markup (Open Graph, JSON-LD, hreflang) that you paste manually, so nothing is applied automatically.",
      },
      {
        q: "Do the previews match real Google results?",
        a: "The SERP preview reproduces Google's current pixel-width truncation rules for titles and descriptions, which is the same math used to warn about over-length metadata.",
      },
    ],
    zh: [
      {
        q: "生成的标签会影响现有网站吗?",
        a: "不会。只复制你需要的片段 — 生成的都是符合标准的标记(Open Graph、JSON-LD、hreflang),由你手动粘贴,不会自动写入任何页面。",
      },
      {
        q: "预览和真实 Google 结果一致吗?",
        a: "SERP 预览复现了 Google 目前对 title/description 的像素宽度截断规则,和超长 meta 的提示逻辑同源。",
      },
    ],
    ja: [
      {
        q: "生成タグは既存サイトに影響しますか?",
        a: "しません。必要なスニペットだけをコピーして手動で貼る方式です。Open Graph・JSON-LD・hreflang など標準準拠のマークアップを生成し、自動適用は一切しません。",
      },
      {
        q: "プレビューは実際の Google 表示と一致しますか?",
        a: "SERP プレビューは Google 現在のピクセル幅ベースのタイトル/説明の切り詰めルールを再現しており、メタ長チェックと同じ計算です。",
      },
    ],
  },
  security: {
    en: [
      {
        q: "Is it safe to paste secrets here?",
        a: "Yes — generation and checking run locally in your browser. Nothing you type (passwords, tokens, hashes) is transmitted or stored; closing the tab erases everything.",
      },
      {
        q: "Are the generated secrets cryptographically strong?",
        a: "Yes — they come from the Web Crypto API (crypto.getRandomValues), the same source your OS uses, not Math.random.",
      },
    ],
    zh: [
      {
        q: "在这里输入密码/密钥安全吗?",
        a: "安全。生成和检测全部在浏览器本地执行,输入的密码、令牌、哈希不会传输或存储,关掉标签页即清空。",
      },
      {
        q: "生成的密钥够随机吗?",
        a: "够。来自 Web Crypto API(crypto.getRandomValues),和操作系统同源,不是 Math.random 伪随机。",
      },
    ],
    ja: [
      {
        q: "ここにシークレットを入力しても安全ですか?",
        a: "安全です。生成・チェックはすべてブラウザ内で完結し、入力したパスワード・トークン・ハッシュは送信・保存されません。タブを閉じれば消えます。",
      },
      {
        q: "生成されるシークレットは暗号学的に強いですか?",
        a: "はい。Web Crypto API(crypto.getRandomValues)を使用しており、OS と同じ乱数源です。Math.random ではありません。",
      },
    ],
  },
  utility: {
    en: [
      {
        q: "How accurate are the results?",
        a: "Calculations follow the official definitions — SI conversion factors, NIST constants, or the governing formula shown on the page — and results display to enough significant digits for real-world use.",
      },
      {
        q: "Can I use it on mobile?",
        a: "Yes. The interface is responsive and all inputs adapt to touch; the calculation itself runs offline once loaded.",
      },
    ],
    zh: [
      {
        q: "结果准确吗?",
        a: "计算遵循官方定义 — SI 换算系数、NIST 常量或页面上给出的公式,结果按实际需要的有效数字显示。",
      },
      {
        q: "手机上能用吗?",
        a: "可以。界面自适应触屏输入,加载完成后计算在离线状态下也能跑。",
      },
    ],
    ja: [
      {
        q: "結果は正確ですか?",
        a: "計算は公式の定義(SI 換算係数・NIST 定数・ページ内に明示された計算式)に従い、実用上十分な有効数字で表示します。",
      },
      {
        q: "スマホでも使えますか?",
        a: "使えます。UI はタッチ対応のレスポンシブ設計で、読み込み後の計算はオフラインでも動作します。",
      },
    ],
  },
};

/** 取某类目的补充 FAQ 池(global 池 + 类目池,en 缺省回退) */
export function categoryFaqPool(category: CategoryId, locale: Locale): Faq[] {
  const extra = BY_CATEGORY[category]?.[locale] ?? BY_CATEGORY[category]?.en ?? [];
  const global = GLOBAL[locale] ?? GLOBAL.en ?? [];
  return [...extra, ...global];
}
