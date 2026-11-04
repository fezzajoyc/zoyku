import { DevHtmlToMarkdownEngine } from "../_engines/dev-engine-html-to-markdown";
import { defineTool } from "../_lib/types";

const SAMPLE =
  '<h1>Release notes</h1><p>Our <strong>biggest</strong> update yet — see the <a href="https://example.com/changelog">changelog</a>.</p><ul><li>Faster exports</li><li>Dark mode</li><li>Bug fixes</li></ul><blockquote><p>Simply the best tool we have tried.</p></blockquote><pre><code>npm install zoyku</code></pre>';

export default defineTool({
  slug: "html-to-markdown",
  category: "developer",
  icon: "text",
  engine: { component: DevHtmlToMarkdownEngine, props: { sample: SAMPLE } },
  related: ["markdown-previewer", "html-formatter", "html-escape", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "url-encoder", "html-minifier"],
  copy: {
    en: {
      name: "HTML to Markdown",
      tagline:
        "Turn HTML into clean Markdown while you type — headings, lists, links, images and code, with ATX or Setext headings and your pick of bullet marker.",
      intro: [
        "Paste markup from a web page, a CMS export or an email and get readable Markdown back instantly. The conversion is handled by turndown, the standard HTML-to-Markdown library: headings, emphasis, links, images, ordered and unordered lists, blockquotes and code blocks all map to their Markdown equivalents.",
        "Two small options cover most style guides: render headings ATX-style (# Heading) or Setext-style (underlined), and choose -, * or + as the unordered list marker. The result updates live as you type or change an option.",
      ],
      steps: [
        "Paste your HTML into the input pane.",
        "The Markdown appears live — tweak heading style or bullet marker if your style guide prefers different output.",
        "Copy the Markdown or download it as a .md file.",
      ],
      faqs: [
        {
          q: "Which HTML is converted, and what happens to the rest?",
          a: "Standard document markup — headings, paragraphs, lists, links, images, emphasis, code, blockquotes and horizontal rules — converts fully. Elements without a Markdown equivalent, such as tables and forms, are flattened to their text content.",
        },
        {
          q: "What is the difference between ATX and Setext headings?",
          a: "ATX writes headings with leading hash marks (## Heading); Setext underlines them with === for H1 or --- for H2. Setext only supports two levels, so deeper headings always fall back to ATX hashes.",
        },
        {
          q: "Does my HTML leave the browser?",
          a: "No. The conversion runs locally with turndown in your browser — nothing is uploaded, even when you download the .md file.",
        },
      ],
    },
    zh: {
      name: "HTML 转 Markdown",
      tagline: "边粘贴边转换:HTML 实时变成干净的 Markdown——标题、列表、链接、图片、代码,可选 ATX/Setext 标题与列表符号。",
      intro: [
        "把网页、CMS 导出或邮件里的标记语言粘贴进来,立即得到可读的 Markdown。转换由事实标准库 turndown 完成:标题、强调、链接、图片、有序和无序列表、引用块、代码块都会映射到对应的 Markdown 写法。",
        "两个小选项覆盖大多数风格指南:标题用 ATX(# 标题)还是 Setext(下划线),无序列表用 -、* 还是 +。输入或切换选项时结果实时更新。",
      ],
      steps: [
        "把 HTML 粘贴到输入框。",
        "Markdown 实时生成——按你的风格指南调整标题风格或列表符号。",
        "复制 Markdown,或下载为 .md 文件。",
      ],
      faqs: [
        {
          q: "哪些 HTML 会被转换,其余的怎么办?",
          a: "标准文档标记——标题、段落、列表、链接、图片、强调、代码、引用块、水平线——都会完整转换。没有 Markdown 对应物的元素(如表格和表单)会被压平为纯文本内容。",
        },
        {
          q: "ATX 和 Setext 标题有什么区别?",
          a: "ATX 用行首井号写标题(## 标题);Setext 用 === 表示一级、--- 表示二级标题。Setext 只支持两级,更深的标题会自动回退为 ATX 井号。",
        },
        {
          q: "我的 HTML 会离开浏览器吗?",
          a: "不会。转换由浏览器内的 turndown 本地完成——即使下载 .md 文件,也不会有任何上传。",
        },
      ],
    },
    ja: {
      name: "HTML → Markdown 変換",
      tagline:
        "HTML を貼りながらその場で Markdown 化 — 見出し・リスト・リンク・画像・コードに対応し、ATX/Setext と箇条書きマーカーを選択できます。",
      intro: [
        "Web ページ、CMS のエクスポート、メールからマークアップを貼り付けると、すぐに読みやすい Markdown が得られます。変換は事実上の標準ライブラリ turndown が担当:見出し・強調・リンク・画像・順序付き/なしリスト・引用・コードブロックが Markdown の書き方に対応付けられます。",
        "ほとんどのスタイルガイドは 2 つの小さなオプションで対応できます:見出しは ATX(# 見出し)か Setext(下線付き)、箇条書きのマーカーは -、*、+ から選択。入力やオプション変更に合わせて結果がリアルタイムに更新されます。",
      ],
      steps: [
        "HTML を入力ペインに貼り付けます。",
        "Markdown がリアルタイムに生成されます — スタイルガイドに合わせて見出しスタイルやマーカーを調整できます。",
        "Markdown をコピーするか、.md ファイルとしてダウンロードします。",
      ],
      faqs: [
        {
          q: "どの HTML が変換され、残りはどうなりますか?",
          a: "標準的な文書マークアップ(見出し・段落・リスト・リンク・画像・強調・コード・引用・水平線)は完全に変換されます。表やフォームなど Markdown に対応する要素がないものは、テキスト内容に展開されます。",
        },
        {
          q: "ATX と Setext の見出しの違いは?",
          a: "ATX は行頭のハッシュ(## 見出し)、Setext は H1 を ===、H2 を --- で下線のように表します。Setext は 2 段階までしか対応しないため、それより深い見出しは自動的に ATX になります。",
        },
        {
          q: "HTML はブラウザの外に出ますか?",
          a: "いいえ。変換はブラウザ内の turndown でローカルに行われ、.md をダウンロードするときも何もアップロードされません。",
        },
      ],
    },
    es: {
      name: "HTML a Markdown",
      tagline:
        "Convierte HTML en Markdown limpio mientras escribes: encabezados, listas, enlaces, imágenes y código, con estilo ATX o Setext y tu viñeta preferida.",
      intro: [
        "Pega marcado de una página web, una exportación de CMS o un correo y recibe Markdown legible al instante. La conversión la hace turndown, la librería estándar de HTML a Markdown: encabezados, énfasis, enlaces, imágenes, listas ordenadas y sin orden, citas y bloques de código se mapean a sus equivalentes en Markdown.",
        "Dos opciones pequeñas cubren la mayoría de guías de estilo: encabezados al estilo ATX (# Encabezado) o Setext (subrayados), y elegir -, * o + como marcador de listas. El resultado se actualiza en vivo mientras escribes o cambias una opción.",
      ],
      steps: [
        "Pega tu HTML en el panel de entrada.",
        "El Markdown aparece en vivo — ajusta el estilo de encabezados o la viñeta si tu guía prefiere otra salida.",
        "Copia el Markdown o descárgalo como archivo .md.",
      ],
      faqs: [
        {
          q: "¿Qué HTML se convierte y qué pasa con el resto?",
          a: "El marcado de documento estándar — encabezados, párrafos, listas, enlaces, imágenes, énfasis, código, citas y líneas horizontales — se convierte por completo. Los elementos sin equivalente en Markdown, como tablas y formularios, se aplanan a su contenido de texto.",
        },
        {
          q: "¿Qué diferencia hay entre encabezados ATX y Setext?",
          a: "ATX escribe los encabezados con almohadillas (## Encabezado); Setext los subraya con === para H1 o --- para H2. Setext solo admite dos niveles, así que los más profundos vuelven a almohadillas ATX.",
        },
        {
          q: "¿Mi HTML sale del navegador?",
          a: "No. La conversión la ejecuta turndown localmente en tu navegador — no se sube nada, ni siquiera al descargar el archivo .md.",
        },
      ],
    },
    pt: {
      name: "HTML para Markdown",
      tagline:
        "Transforme HTML em Markdown limpo enquanto digita: títulos, listas, links, imagens e código, com títulos ATX ou Setext e o marcador que preferir.",
      intro: [
        "Cole marcação de uma página web, uma exportação de CMS ou um e-mail e receba Markdown legível na hora. A conversão fica por conta do turndown, a biblioteca padrão de HTML para Markdown: títulos, ênfase, links, imagens, listas ordenadas e não ordenadas, citações e blocos de código viram seus equivalentes em Markdown.",
        "Duas opções pequenas cobrem a maioria dos guias de estilo: títulos no estilo ATX (# Título) ou Setext (sublinhados), e escolher -, * ou + como marcador de lista. O resultado atualiza ao vivo enquanto você digita ou muda uma opção.",
      ],
      steps: [
        "Cole seu HTML no painel de entrada.",
        "O Markdown aparece ao vivo — ajuste o estilo de títulos ou o marcador se seu guia preferir outra saída.",
        "Copie o Markdown ou baixe como arquivo .md.",
      ],
      faqs: [
        {
          q: "Qual HTML é convertido e o que acontece com o resto?",
          a: "A marcação de documento padrão — títulos, parágrafos, listas, links, imagens, ênfase, código, citações e linhas horizontais — é convertida por completo. Elementos sem equivalente em Markdown, como tabelas e formulários, são achatados em seu conteúdo de texto.",
        },
        {
          q: "Qual a diferença entre títulos ATX e Setext?",
          a: "ATX escreve títulos com cerquilhas (## Título); Setext os sublinha com === para H1 ou --- para H2. Setext só suporta dois níveis, então níveis mais profundos voltam para cerquilhas ATX.",
        },
        {
          q: "Meu HTML sai do navegador?",
          a: "Não. A conversão roda localmente com o turndown no seu navegador — nada é enviado, nem quando você baixa o arquivo .md.",
        },
      ],
    },
  },
});
