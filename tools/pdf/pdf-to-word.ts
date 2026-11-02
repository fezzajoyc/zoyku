import { PdfOfficeEngine } from "../_engines/pdf-engine-office";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "pdf-to-word",
  category: "pdf",
  icon: "text",
  featured: true,
  engine: { component: PdfOfficeEngine, props: { target: "docx" } },
  related: ["word-to-pdf", "pdf-to-text", "ocr-pdf", "pdf-to-excel", "merge-pdf"],
  copy: {
    en: {
      name: "PDF to Word",
      tagline:
        "Turn PDF text into an editable Word document (.docx) in your browser — a text-focused conversion, free, with nothing uploaded.",
      intro: [
        "Extract the words from a PDF into a .docx you can edit in Word, Google Docs or LibreOffice. Headings are detected from font sizes, paragraphs are rebuilt from line positions, and the result is a clean, lightweight document you can rework.",
        "This is an honest text-focused conversion: it does not reconstruct complex page layouts, columns or image placement. The upside is total privacy — the analysis and the .docx generation happen entirely on your device.",
      ],
      steps: [
        "Drop a text-based PDF (one whose text you can select).",
        "Click Convert to Word and wait a moment.",
        "Download the .docx and edit it anywhere.",
      ],
      faqs: [
        {
          q: "Why does the layout differ from the original PDF?",
          a: "This is a text-focused conversion: it rebuilds paragraphs and heading levels rather than reproducing the page pixel-for-pixel. Expect the same words in a cleaner, editable flow — not a visual clone.",
        },
        {
          q: "My PDF is a scan and produces an empty document.",
          a: "Scanned PDFs contain pictures of text, not text. Run it through our OCR tool first, then paste or convert the recognized text to Word.",
        },
        {
          q: "Do tables and images survive?",
          a: "Images are not carried into the .docx. Tables come through as plain lines of text — usable, but you will want to rebuild real tables in Word for anything complex.",
        },
      ],
    },
    zh: {
      name: "PDF 转 Word",
      tagline: "在浏览器里把 PDF 文字转成可编辑的 Word 文档(.docx)——专注文本的转换,免费,文件不上传。",
      intro: [
        "把 PDF 中的文字提取成可在 Word、Google Docs 或 LibreOffice 中编辑的 .docx。工具根据字号识别标题、按行位置重建段落,输出一份干净轻便、可以继续加工的文档。",
        "这是诚实的文本导向转换:不会复原复杂的版面、分栏或图片位置。换来的是完全的隐私——分析和 .docx 生成全部在你的设备上完成。",
      ],
      steps: [
        "拖入文本型 PDF(文字可以被选中的那种)。",
        "点击“转换为 Word”,稍等片刻。",
        "下载 .docx,在任何编辑器里继续加工。",
      ],
      faqs: [
        {
          q: "为什么版式和原 PDF 不一样?",
          a: "这是文本导向的转换:重建段落和标题层级,而不是逐像素复刻页面。你会得到同样内容的干净可编辑版本,而不是视觉克隆。",
        },
        {
          q: "扫描版 PDF 转出来是空的?",
          a: "扫描件里是文字的图片而不是文字本身。请先用我们的 OCR 工具识别,再把识别结果转成 Word。",
        },
        {
          q: "表格和图片会保留吗?",
          a: "图片不会带入 .docx。表格会变成普通文本行——内容可用,但复杂表格建议在 Word 里重新制作。",
        },
      ],
    },
    ja: {
      name: "PDF を Word に変換",
      tagline: "PDF のテキストをブラウザ内で編集可能な Word 文書(.docx)に変換。テキスト重視の変換で、無料・アップロード不要です。",
      intro: [
        "PDF の文章を、Word・Google Docs・LibreOffice で編集できる .docx に取り出します。フォントサイズから見出しを検出し、行位置から段落を再構築して、手を加えやすい軽量な文書を作ります。",
        "このツールはテキスト重視の変換であることを正直にお伝えします。複雑なレイアウト・段組み・画像配置は再現しません。その代わり完全なプライバシーを実現します。解析も .docx 生成もすべて端末内で行われます。",
      ],
      steps: [
        "テキストベースの PDF(文字を選択できるもの)をドロップします。",
        "「Word に変換」をクリックして少し待ちます。",
        ".docx をダウンロードし、どこでも編集します。",
      ],
      faqs: [
        {
          q: "レイアウトが元の PDF と違うのはなぜ?",
          a: "テキスト重視の変換のためです。ページをピクセル単位で再現するのではなく、段落や見出しの階層を組み立て直します。同じ言葉を、より整った編集可能な流れで受け取れます。",
        },
        {
          q: "スキャンした PDF から空の文書が出ます。",
          a: "スキャン PDF のテキストは画像であり、文字データではありません。まず OCR ツールで認識し、その結果を Word に変換してください。",
        },
        {
          q: "表や画像は残りますか?",
          a: "画像は .docx には取り込まれません。表は通常のテキスト行として抽出されます。複雑な表は Word で組み直すのがおすすめです。",
        },
      ],
    },
    es: {
      name: "PDF a Word",
      tagline:
        "Pasa el texto de un PDF a un documento de Word editable (.docx) en tu navegador: conversión centrada en el texto, gratis y sin subidas.",
      intro: [
        "Extrae las palabras de un PDF a un .docx editable en Word, Google Docs o LibreOffice. Los títulos se detectan por su tamaño de fuente, los párrafos se reconstruyen desde la posición de las líneas y el resultado es un documento limpio y ligero, listo para rehacer.",
        "Es una conversión honesta centrada en el texto: no reconstruye maquetaciones complejas, columnas ni colocación de imágenes. A cambio, privacidad total: el análisis y la generación del .docx ocurren por completo en tu dispositivo.",
      ],
      steps: [
        "Suelta un PDF con texto (uno cuyo texto puedas seleccionar).",
        "Pulsa Convertir a Word y espera un momento.",
        "Descarga el .docx y edítalo donde quieras.",
      ],
      faqs: [
        {
          q: "¿Por qué la maquetación difiere del PDF original?",
          a: "Es una conversión centrada en el texto: reconstruye párrafos y niveles de título en lugar de clonar la página píxel a píxel. Obtienes las mismas palabras en un flujo más limpio y editable, no una copia visual.",
        },
        {
          q: "Mi PDF es un escaneo y sale un documento vacío.",
          a: "Los PDF escaneados contienen imágenes del texto, no texto. Pásalo primero por nuestra herramienta de OCR y convierte el texto reconocido a Word.",
        },
        {
          q: "¿Sobreviven las tablas y las imágenes?",
          a: "Las imágenes no se llevan al .docx. Las tablas llegan como líneas de texto planas: sirven, pero conviene reconstruir las tablas complejas en Word.",
        },
      ],
    },
    pt: {
      name: "PDF para Word",
      tagline:
        "Transforme o texto de um PDF em um documento Word editável (.docx) no navegador — conversão focada em texto, grátis e sem upload.",
      intro: [
        "Extraia as palavras de um PDF para um .docx editável no Word, Google Docs ou LibreOffice. Os títulos são detectados pelo tamanho da fonte, os parágrafos são reconstruídos pela posição das linhas e o resultado é um documento limpo e leve, pronto para retrabalhar.",
        "Esta é uma conversão honesta focada em texto: ela não reconstrói layouts complexos, colunas nem posicionamento de imagens. Em troca, privacidade total — a análise e a geração do .docx acontecem inteiramente no seu dispositivo.",
      ],
      steps: [
        "Solte um PDF com texto (um em que dê para selecionar o texto).",
        "Clique em Converter para Word e aguarde um instante.",
        "Baixe o .docx e edite em qualquer lugar.",
      ],
      faqs: [
        {
          q: "Por que o layout fica diferente do PDF original?",
          a: "É uma conversão focada em texto: ela reconstrói parágrafos e níveis de título em vez de clonar a página pixel a pixel. Você recebe as mesmas palavras num fluxo mais limpo e editável — não um clone visual.",
        },
        {
          q: "Meu PDF é digitalizado e gera um documento vazio.",
          a: "PDFs digitalizados contêm imagens do texto, não texto. Passe primeiro pela nossa ferramenta de OCR e converta o texto reconhecido para Word.",
        },
        {
          q: "Tabelas e imagens sobrevivem?",
          a: "Imagens não vão para o .docx. Tabelas chegam como linhas de texto simples — dá para usar, mas o ideal é reconstruir tabelas complexas no Word.",
        },
      ],
    },
  },
});
