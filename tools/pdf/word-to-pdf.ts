import { PdfOfficeEngine } from "../_engines/pdf-engine-office";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "word-to-pdf",
  category: "pdf",
  icon: "file",
  engine: { component: PdfOfficeEngine, props: { target: "fromdocx" } },
  related: ["pdf-to-word", "merge-pdf", "watermark-pdf", "compress-pdf", "sign-pdf", "split-pdf", "delete-pdf-pages", "pdf-to-ppt", "ocr-pdf", "rotate-pdf"],
  copy: {
    en: {
      name: "Word to PDF",
      tagline:
        "Convert Word .docx documents to PDF in your browser — text-focused typesetting with headings and bold, nothing ever uploaded.",
      intro: [
        "Turn a .docx into a clean, shareable PDF: paragraphs, headings and bold runs are re-typeset onto A4 pages with proper margins, so the output looks tidy even without Word installed. Reading, printing and sending become friction-free.",
        "This is an honest text-focused conversion, not a pixel clone of Word's layout: images, tables and page decorations from the original are not carried over. What you get is your document's text in a reliable, universally readable PDF — generated entirely on your device.",
      ],
      steps: [
        "Drop a .docx file (Word 2007 and newer).",
        "Click Convert to PDF.",
        "Download the typeset PDF.",
      ],
      faqs: [
        {
          q: "Why does my PDF look different from Word?",
          a: "This tool re-typesets the text with its own clean layout rather than emulating Word's engine. Fonts, spacing and images in the original are not reproduced — the words, headings and emphasis are.",
        },
        {
          q: "Are images and tables included?",
          a: "No, text only — including headings and bold. For documents where visuals matter, export the PDF from Word itself and use this tool for text-first drafts and notes.",
        },
        {
          q: "Does it support old .doc files or non-Latin text?",
          a: "Only .docx is supported. Text uses the PDF standard fonts, so Latin-based languages render correctly while other scripts (Chinese, Arabic…) are replaced with ? for now.",
        },
      ],
    },
    zh: {
      name: "Word 转 PDF",
      tagline: "在浏览器里把 Word .docx 文档转成 PDF——带标题和加粗的文本排版,文件不上传到任何地方。",
      intro: [
        "把 .docx 变成干净易分享的 PDF:段落、标题和加粗文本按合适页边距重新排版到 A4 页面上,输出整齐,对方没装 Word 也能看。阅读、打印、发送都顺畅。",
        "这是诚实的文本导向转换,不是 Word 版面的像素级复刻:原文档的图片、表格和页面装饰不会带入。你得到的是文档文字在可靠、通用可读的 PDF 中的呈现——完全在你的设备上生成。",
      ],
      steps: [
        "拖入 .docx 文件(Word 2007 及以后版本)。",
        "点击“转换为 PDF”。",
        "下载排版后的 PDF。",
      ],
      faqs: [
        {
          q: "为什么 PDF 看起来和 Word 里不一样?",
          a: "本工具用自己的干净排版重新排布文字,而不是模拟 Word 的排版引擎。原文件的字体、间距和图片不会复现,但文字内容、标题层级和加粗都会保留。",
        },
        {
          q: "图片和表格会包含吗?",
          a: "不会,只处理文字(含标题和加粗)。视觉效果重要的文档请从 Word 直接导出 PDF;本工具适合以文字为主的草稿和笔记。",
        },
        {
          q: "支持老版 .doc 或非拉丁文字吗?",
          a: "仅支持 .docx。文字使用 PDF 标准字体,拉丁语系显示正常;中文、阿拉伯文等其他文字目前会被替换为 ? 。",
        },
      ],
    },
    ja: {
      name: "Word を PDF に変換",
      tagline: "Word .docx 文書をブラウザ内で PDF に変換。見出しや太字を含むテキスト中心の組版で、ファイルはどこにもアップロードされません。",
      intro: [
        ".docx をきれいで共有しやすい PDF に変えます。段落・見出し・太字を適切な余白つきの A4 ページに組み直すため、Word が入っていない環境でも整った見た目になります。閲覧・印刷・送信がスムーズに。",
        "このツールはテキスト重視の変換であり、Word のレイアウトをピクセル単位で再現するものではありません。元の画像・表・装飾は引き継がれません。引き継がれるのは文書のテキストで、信頼性の高い PDF として端末内で生成されます。",
      ],
      steps: [
        ".docx ファイルをドロップします(Word 2007 以降)。",
        "「PDF に変換」をクリックします。",
        "組版済みの PDF をダウンロードします。",
      ],
      faqs: [
        {
          q: "PDF が Word の見た目と違うのはなぜ?",
          a: "このツールは Word のエンジンを模倣せず、独自の整ったレイアウトでテキストを組み直します。元のフォント・行間・画像は再現されませんが、文章・見出し・強調は保たれます。",
        },
        {
          q: "画像や表も含まれますか?",
          a: "含まれません。テキストのみ(見出しと太字を含む)です。見た目が重要な文書は Word から直接 PDF を書き出し、このツールはテキスト中心の下書きやメモにご利用ください。",
        },
        {
          q: "古い .doc や日本語は扱えますか?",
          a: ".docx のみ対応です。PDF 標準フォントを使うためラテン文字系言語は正しく表示されますが、日本語・中国語・アラビア語などは現在 ? に置き換えられます。",
        },
      ],
    },
    es: {
      name: "Word a PDF",
      tagline:
        "Convierte documentos Word .docx a PDF en tu navegador: maquetación de texto con títulos y negritas, y nada que se suba a la red.",
      intro: [
        "Pasa un .docx a un PDF limpio y compartible: párrafos, títulos y negritas se vuelven a maquetar en páginas A4 con márgenes adecuados, de modo que el resultado queda bien sin tener Word instalado. Leer, imprimir y enviar se vuelve trivial.",
        "Es una conversión honesta centrada en el texto, no un clon píxel a píxel del diseño de Word: las imágenes, tablas y decoraciones del original no se trasladan. Obtienes el texto de tu documento en un PDF fiable y legible en todas partes, generado íntegramente en tu dispositivo.",
      ],
      steps: [
        "Suelta un archivo .docx (Word 2007 o posterior).",
        "Pulsa Convertir a PDF.",
        "Descarga el PDF maquetado.",
      ],
      faqs: [
        {
          q: "¿Por qué mi PDF se ve distinto que en Word?",
          a: "La herramienta vuelve a maquetar el texto con su propio diseño limpio en lugar de emular el motor de Word. No se reproducen las fuentes, los espaciados ni las imágenes del original, pero sí las palabras, los títulos y el énfasis.",
        },
        {
          q: "¿Se incluyen imágenes y tablas?",
          a: "No, solo texto, incluidos títulos y negritas. Para documentos donde lo visual importa, exporta el PDF desde Word y reserva esta herramienta para borradores y notas de texto.",
        },
        {
          q: "¿Admite archivos .doc antiguos o texto no latino?",
          a: "Solo se admite .docx. El texto usa las fuentes estándar del PDF, así que los idiomas latinos se ven bien, mientras que otras escrituras (chino, árabe…) se sustituyen por ? por ahora.",
        },
      ],
    },
    pt: {
      name: "Word para PDF",
      tagline:
        "Converta documentos Word .docx em PDF no navegador — diagramação de texto com títulos e negrito, e nada que seja enviado.",
      intro: [
        "Transforme um .docx em um PDF limpo e fácil de compartilhar: parágrafos, títulos e negritos são rediagramados em páginas A4 com margens adequadas, então o resultado fica bom mesmo sem o Word instalado. Ler, imprimir e enviar fica sem atrito.",
        "Esta é uma conversão honesta focada em texto, não um clone pixel a pixel do layout do Word: imagens, tabelas e decorações do original não são levadas. Você recebe o texto do documento num PDF confiável e legível em qualquer lugar — gerado inteiramente no seu dispositivo.",
      ],
      steps: [
        "Solte um arquivo .docx (Word 2007 ou mais novo).",
        "Clique em Converter para PDF.",
        "Baixe o PDF diagramado.",
      ],
      faqs: [
        {
          q: "Por que meu PDF fica diferente do Word?",
          a: "A ferramenta rediagrama o texto com seu próprio layout limpo em vez de emular o motor do Word. Fontes, espaçamentos e imagens do original não são reproduzidos — as palavras, os títulos e o negrito sim.",
        },
        {
          q: "Imagens e tabelas são incluídas?",
          a: "Não, apenas texto — incluindo títulos e negrito. Para documentos em que o visual importa, exporte o PDF pelo próprio Word e use esta ferramenta para rascunhos e anotações de texto.",
        },
        {
          q: "Dá para usar .doc antigo ou texto não latino?",
          a: "Só .docx é aceito. O texto usa as fontes padrão do PDF, então idiomas latinos ficam corretos, mas outras escritas (chinês, árabe…) são trocadas por ? por enquanto.",
        },
      ],
    },
  },
});
