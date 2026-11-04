import { PdfOcrEngine } from "../_engines/pdf-engine-ocr";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "ocr-pdf",
  category: "pdf",
  icon: "search",
  engine: { component: PdfOcrEngine },
  related: ["pdf-to-text", "pdf-to-word", "pdf-to-excel", "pdf-to-jpg", "compress-pdf", "split-pdf", "delete-pdf-pages", "pdf-to-ppt", "rotate-pdf", "merge-pdf"],
  copy: {
    en: {
      name: "OCR PDF",
      tagline:
        "Run OCR on scanned PDFs entirely in your browser — recognize English, Chinese, Japanese and more, then copy or save the text.",
      intro: [
        "Scanned contracts, receipts and books have no selectable text — OCR gives them one. Each page is rendered in your browser and read by the Tesseract engine, with language support for English, Simplified Chinese, Japanese, Spanish, Portuguese, French and German.",
        "On first use your browser downloads the OCR engine and the language model (10–20 MB) from a public CDN — that is the only network traffic, and it never includes your document. Recognition itself happens on your device.",
      
        "Each page is rendered by pdf.js to a canvas, then passed to Tesseract.js — the same WebAssembly OCR engine used by the image version — with the language pack fetched from a public CDN on first use. Multi-column pages and rotated text are handled as well as the underlying Tesseract layout analysis allows, which is good for clean scans.",
        "Compared with re-typing or paying for Acrobat's OCR, the whole pipeline is free and offline after the first model download — a scanned contract stays on your machine. Unlike tools that return only a text layer, the output text is editable before download, so the occasional misread character is fixed before it propagates.",
      ],
      steps: [
        "Drop a scanned PDF and pick the document's language.",
        "Optionally limit OCR to specific pages, then click Run OCR.",
        "Copy the recognized text or download it as a .txt file.",
      ],
      faqs: [
        {
          q: "Why does the first run need an internet connection?",
          a: "The Tesseract OCR engine and its language model are fetched from a CDN on first use (10–20 MB, cached afterwards). The PDF itself is never uploaded — recognition runs locally once the model is loaded.",
        },
        {
          q: "How can I improve recognition accuracy?",
          a: "Scan at 300 DPI, keep the page straight, and choose the correct language. Clean black-and-white pages reach well over 90% accuracy; crooked photos with shadows do much worse.",
        },
        {
          q: "Can it read handwriting?",
          a: "Not reliably. Tesseract is trained on printed text — neat typography works, cursive handwriting usually produces garbage.",
        },
      ],
    },
    zh: {
      name: "PDF OCR 识别",
      tagline: "在浏览器本地对扫描版 PDF 进行 OCR——支持英语、简体中文、日语等多种语言,识别结果可复制或保存。",
      intro: [
        "扫描的合同、票据和图书没有可选中文字——OCR 能补上。每页在你的浏览器里渲染,由 Tesseract 引擎识别,支持英语、简体中文、日语、西班牙语、葡萄牙语、法语和德语。",
        "首次使用时浏览器会从公共 CDN 下载 OCR 引擎和语言模型(10–20 MB)——这是唯一的网络流量,且不包含你的文档。识别本身完全在你的设备上进行。",
      ],
      steps: [
        "拖入扫描版 PDF,选择文档语言。",
        "可指定识别页码,然后点击“开始识别”。",
        "复制识别出的文字,或下载为 .txt 文件。",
      ],
      faqs: [
        {
          q: "为什么第一次运行需要联网?",
          a: "Tesseract OCR 引擎和语言模型首次使用时从 CDN 获取(10–20 MB,之后有缓存)。PDF 本身不会被上传——模型加载完成后识别在本地进行。",
        },
        {
          q: "怎么提高识别准确率?",
          a: "用 300 DPI 扫描、页面摆正、选对语言。干净的黑白页面准确率能超过 90%;歪斜、有阴影的手机照片效果会差很多。",
        },
        {
          q: "能识别手写字吗?",
          a: "不可靠。Tesseract 针对印刷体训练——规整的印刷文字效果好,连笔手写通常识别不出有意义的结果。",
        },
      ],
    },
    ja: {
      name: "PDF OCR(文字認識)",
      tagline: "スキャンした PDF に対しブラウザ内で OCR を実行。英語・簡体字中国語・日本語などに対応し、結果はコピーも .txt 保存も可能です。",
      intro: [
        "スキャンした契約書・レシート・書籍には選択可能なテキストがありません——OCR がそれを補います。各ページはブラウザ内でレンダリングされ、Tesseract エンジンが読み取ります。英語・簡体字中国語・日本語・スペイン語・ポルトガル語・フランス語・ドイツ語に対応します。",
        "初回のみ、OCR エンジンと言語モデル(10〜20 MB)を公開 CDN からダウンロードします。これが唯一の通信で、文書は一切含まれません。認識そのものは端末内で行われます。",
      ],
      steps: [
        "スキャンした PDF をドロップし、文書の言語を選びます。",
        "必要ならページを限定し、「OCR を実行」をクリックします。",
        "認識されたテキストをコピーするか、.txt として保存します。",
      ],
      faqs: [
        {
          q: "初回だけインターネット接続が必要なのはなぜ?",
          a: "Tesseract の OCR エンジンと言語モデルを初回に CDN から取得するためです(10〜20 MB、以降はキャッシュ)。PDF 自体はアップロードされず、モデル取得後の認識はローカルで行われます。",
        },
        {
          q: "認識精度を上げるには?",
          a: "300 DPI でスキャンし、ページをまっすぐ揃え、正しい言語を選んでください。きれいな白黒ページなら 90% を大きく超える精度が出ます。傾いた影つきの写真は大きく劣化します。",
        },
        {
          q: "手書き文字も読めますか?",
          a: "確実には読めません。Tesseract は印刷文字で学習しています。整った活字は得意ですが、筆記体の手書きは意味のある結果になりにくいです。",
        },
      ],
    },
    es: {
      name: "OCR PDF",
      tagline:
        "Ejecuta OCR sobre PDF escaneados por completo en tu navegador: reconoce inglés, chino, japonés y más, y copia o guarda el texto.",
      intro: [
        "Los contratos, recibos y libros escaneados no tienen texto seleccionable: el OCR se lo añade. Cada página se dibuja en tu navegador y la lee el motor Tesseract, con soporte para inglés, chino simplificado, japonés, español, portugués, francés y alemán.",
        "En el primer uso tu navegador descarga el motor de OCR y el modelo de idioma (10–20 MB) desde un CDN público: ese es el único tráfico de red y nunca incluye tu documento. El reconocimiento ocurre en tu dispositivo.",
      ],
      steps: [
        "Suelta un PDF escaneado y elige el idioma del documento.",
        "Limita el OCR a páginas concretas si quieres, y pulsa Ejecutar OCR.",
        "Copia el texto reconocido o descárgalo como .txt.",
      ],
      faqs: [
        {
          q: "¿Por qué la primera ejecución necesita internet?",
          a: "El motor Tesseract y su modelo de idioma se descargan de un CDN la primera vez (10–20 MB, luego quedan en caché). El PDF nunca se sube: una vez cargado el modelo, el reconocimiento es local.",
        },
        {
          q: "¿Cómo mejoro la precisión?",
          a: "Escanea a 300 DPI, mantén la página recta y elige el idioma correcto. Las páginas limpias en blanco y negro superan el 90% de acierto; las fotos torcidas y con sombras salen mucho peor.",
        },
        {
          q: "¿Lee escritura a mano?",
          a: "No de forma fiable. Tesseract está entrenado con texto impreso: la tipografía ordenada funciona bien, la cursiva suele producir resultados sin sentido.",
        },
      ],
    },
    pt: {
      name: "OCR PDF",
      tagline:
        "Rode OCR em PDFs digitalizados inteiramente no navegador — reconhece inglês, chinês, japonês e mais, e copia ou salva o texto.",
      intro: [
        "Contratos, recibos e livros digitalizados não têm texto selecionável — o OCR resolve isso. Cada página é renderizada no seu navegador e lida pelo motor Tesseract, com suporte a inglês, chinês simplificado, japonês, espanhol, português, francês e alemão.",
        "No primeiro uso, o navegador baixa o motor de OCR e o modelo de idioma (10–20 MB) de um CDN público — esse é o único tráfego de rede, e ele nunca inclui seu documento. O reconhecimento em si acontece no seu dispositivo.",
      ],
      steps: [
        "Solte um PDF digitalizado e escolha o idioma do documento.",
        "Se quiser, limite o OCR a páginas específicas e clique em Executar OCR.",
        "Copie o texto reconhecido ou baixe como .txt.",
      ],
      faqs: [
        {
          q: "Por que a primeira execução precisa de internet?",
          a: "O motor Tesseract e o modelo de idioma são baixados de um CDN no primeiro uso (10–20 MB, depois ficam em cache). O PDF nunca é enviado — com o modelo carregado, o reconhecimento roda localmente.",
        },
        {
          q: "Como melhorar a precisão do reconhecimento?",
          a: "Digitalize a 300 DPI, mantenha a página alinhada e escolha o idioma correto. Páginas limpas em preto e branco passam de 90% de acerto; fotos tortas e com sombras saem muito pior.",
        },
        {
          q: "Ele lê escrita à mão?",
          a: "Não de forma confiável. O Tesseract é treinado com texto impresso — tipografia limpa funciona bem; letras cursivas geralmente viram rabisco sem sentido.",
        },
      ],
    },
  },
});
