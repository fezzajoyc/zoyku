import { ImageOcrEngine } from "../_engines/image-engine-ocr";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "ocr-image",
  category: "image",
  icon: "search",
  engine: { component: ImageOcrEngine },
  related: ["ocr-pdf", "pdf-to-text", "screenshot-tool", "image-metadata-viewer", "convert-image", "image-border", "image-splitter", "compress-image-to-size", "image-compressor", "grayscale-image"],
  copy: {
    en: {
      name: "Image to Text (OCR)",
      tagline:
        "Extract text from photos, scans and screenshots in 7 languages — review, edit, copy or download as .txt. Recognition runs entirely in your browser.",
      intro: [
        "Point at any image that contains text — a photo of a page, a scan, a screenshot — and get the characters back as editable text. Recognition is powered by Tesseract, loaded on demand inside your browser tab; the image itself is never uploaded anywhere.",
        "The output lands in an editable box, so you can fix the occasional misread before copying it or downloading it as a .txt file. Clean, evenly lit, straight-on shots give the best results.",
      
        "Recognition runs on Tesseract compiled to WebAssembly, loaded on demand inside the tab — the image is decoded locally and fed to the engine as raw pixels. Accuracy is best on clean, high-contrast text at natural size; a phone photo of a page benefits from good lighting and a straight-on angle far more than from any resolution bump.",
        "Compared with OS-level text extraction or cloud OCR APIs, the image never leaves your device and there is no account, quota or latency beyond the first model download. The editable output box exists because OCR is probabilistic — a quick scan-and-fix beats trusting a black-box result that silently misreads a serial number.",
      ],
      steps: [
        "Drop in one image (PNG, JPG or WebP) that contains text.",
        "Pick the language of the text — the matching model loads on first use.",
        "Run the recognition and edit the extracted text if needed.",
        "Copy it or download it as a .txt file.",
      ],
      faqs: [
        {
          q: "Does my image get uploaded to a server?",
          a: "No. The image is read and recognized in your own browser. Be aware that the OCR engine and the language model are downloaded from a public CDN on first use (roughly 10–20 MB per language) — that download goes from the CDN to you, but the image itself never leaves your device.",
        },
        {
          q: "Which languages are supported?",
          a: "English, Simplified Chinese, Japanese, Spanish, Portuguese, German and French. Each language loads its own trained model the first time you select it; afterwards it is cached by the browser and recognition starts faster.",
        },
        {
          q: "Why is some of the text wrong?",
          a: "OCR accuracy depends heavily on the source: blurry photos, curved pages, small fonts and busy backgrounds cause misreads. Use the sharpest image you have, crop to just the text area, and expect to proofread — especially numbers and similar-looking characters.",
        },
      ],
    },
    zh: {
      name: "图片转文字(OCR)",
      tagline:
        "从照片、扫描件和截图里提取文字,支持 7 种语言,结果可编辑、可复制、可下载为 .txt,识别全程在你的浏览器里完成。",
      intro: [
        "把任何含文字的图片——拍下来的书页、扫描件、截图——拖进来,识别结果以可编辑文本的形式返回。识别由 Tesseract 驱动,按需在浏览器标签页内加载;图片本身不会被上传到任何地方。",
        "识别结果放在可编辑的文本框里,先修掉偶尔认错的字,再复制或下载为 .txt。清晰、光线均匀、正对镜头的图片效果最好。",
      ],
      steps: [
        "拖入一张含文字的图片(PNG、JPG 或 WebP)。",
        "选择文字对应的语言——对应模型首次使用时加载。",
        "开始识别,必要时直接修改提取出的文本。",
        "复制结果,或下载为 .txt 文件。",
      ],
      faqs: [
        {
          q: "我的图片会被上传到服务器吗?",
          a: "不会。图片在你的浏览器里完成读取与识别。需要说明的是:OCR 引擎和语言模型首次使用时会从公共 CDN 下载(每种语言约 10–20 MB)——这是 CDN 下发给你,而图片本身从不离开你的设备。",
        },
        {
          q: "支持哪些语言?",
          a: "英语、简体中文、日语、西班牙语、葡萄牙语、德语和法语。每种语言第一次选用时会加载对应的训练模型,之后由浏览器缓存,再次识别会快很多。",
        },
        {
          q: "为什么有些字识别错了?",
          a: "识别准确率很大程度取决于原图:照片模糊、页面弯曲、字号太小、背景杂乱都会造成误读。尽量用最清晰的图,裁掉文字以外的区域,并做好校对的准备——数字和形近字尤其要核对。",
        },
      ],
    },
    ja: {
      name: "画像からテキスト抽出(OCR)",
      tagline:
        "写真・スキャン・スクリーンショットから 7 言語のテキストを抽出。結果は編集・コピー・.txt 保存でき、認識はすべてブラウザ内で完結します。",
      intro: [
        "文字入りの画像——撮影したページ、スキャン、スクリーンショット——をドロップすると、編集可能なテキストとして読み取ります。認識は Tesseract を使用し、ブラウザのタブ内で必要なときだけ読み込まれます。画像がどこかへアップロードされることはありません。",
        "結果は編集ボックスに入るので、時々読み間違えた文字を直してからコピーするか、.txt としてダウンロードできます。鮮明で明るさが均一な正面からの写真が最も正確です。",
      ],
      steps: [
        "文字入りの画像(PNG・JPG・WebP)を 1 枚ドロップします。",
        "テキストの言語を選びます(対応モデルは初回使用時に読み込み)。",
        "認識を実行し、抽出されたテキストがあれば修正します。",
        "コピーするか、.txt としてダウンロードします。",
      ],
      faqs: [
        {
          q: "画像はサーバーにアップロードされますか?",
          a: "いいえ。画像の読み取りも認識も自分のブラウザ内で行われます。ただし OCR エンジンと言語モデルは初回使用時に公共の CDN からダウンロードされます(言語ごとに約 10–20 MB)。これは CDN からあなたへの取得であり、画像そのものが端末の外に出ることはありません。",
        },
        {
          q: "対応言語は?",
          a: "英語・簡体字中国語・日本語・スペイン語・ポルトガル語・ドイツ語・フランス語。言語ごとに、最初に選んだとき専用の学習モデルを読み込み、以降はブラウザがキャッシュするため 2 回目からは速くなります。",
        },
        {
          q: "一部の文字が間違うのはなぜ?",
          a: "精度は元画像に大きく依存します。ぶれた写真、曲がったページ、小さな文字、背景のノイズが誤認識の原因です。できるだけ鮮明な画像を使い、文字部分だけに切り取ってから実行し、数字や似ている文字は必ず見直してください。",
        },
      ],
    },
    es: {
      name: "Imagen a texto (OCR)",
      tagline:
        "Extrae texto de fotos, escaneos y capturas en 7 idiomas: revisa, edita, copia o descarga como .txt. El reconocimiento ocurre en tu navegador.",
      intro: [
        "Toma cualquier imagen con texto —la foto de una página, un escaneo, una captura— y recupera los caracteres como texto editable. El reconocimiento usa Tesseract, que se carga a demanda dentro de la pestaña; la imagen nunca se sube a ningún sitio.",
        "El resultado aparece en un cuadro editable, así que puedes corregir alguna lectura equivocada antes de copiarlo o descargarlo como .txt. Las fotos nítidas, bien iluminadas y de frente dan los mejores resultados.",
      ],
      steps: [
        "Suelta una imagen con texto (PNG, JPG o WebP).",
        "Elige el idioma del texto: el modelo correspondiente se carga en el primer uso.",
        "Ejecuta el reconocimiento y edita el texto extraído si hace falta.",
        "Cópialo o descárgalo como archivo .txt.",
      ],
      faqs: [
        {
          q: "¿Mi imagen se sube a algún servidor?",
          a: "No. La imagen se lee y se reconoce en tu propio navegador. Ten en cuenta que el motor de OCR y el modelo de idioma se descargan de un CDN público en el primer uso (unos 10–20 MB por idioma): esa descarga va del CDN hacia ti, pero la imagen nunca sale de tu dispositivo.",
        },
        {
          q: "¿Qué idiomas están disponibles?",
          a: "Inglés, chino simplificado, japonés, español, portugués, alemán y francés. Cada idioma carga su propio modelo entrenado la primera vez que lo seleccionas; después queda en la caché del navegador y el reconocimiento arranca más rápido.",
        },
        {
          q: "¿Por qué hay texto mal reconocido?",
          a: "La precisión depende mucho del original: fotos borrosas, páginas curvadas, letras pequeñas y fondos con ruido provocan errores. Usa la imagen más nítida que tengas, recorta solo la zona del texto y revisa el resultado, sobre todo números y caracteres parecidos.",
        },
      ],
    },
    pt: {
      name: "Imagem para texto (OCR)",
      tagline:
        "Extraia texto de fotos, escaneamentos e capturas de tela em 7 idiomas — revise, edite, copie ou baixe como .txt. O reconhecimento roda no seu navegador.",
      intro: [
        "Pegue qualquer imagem com texto — a foto de uma página, um escaneamento, uma captura de tela — e receba os caracteres de volta como texto editável. O reconhecimento usa o Tesseract, carregado sob demanda dentro da aba do navegador; a imagem nunca é enviada para lugar nenhum.",
        "O resultado aparece em uma caixa editável, então você pode corrigir eventuais leituras erradas antes de copiar ou baixar como .txt. Fotos nítidas, bem iluminadas e feitas de frente dão os melhores resultados.",
      ],
      steps: [
        "Solte uma imagem com texto (PNG, JPG ou WebP).",
        "Escolha o idioma do texto — o modelo correspondente é carregado no primeiro uso.",
        "Execute o reconhecimento e edite o texto extraído, se precisar.",
        "Copie ou baixe como arquivo .txt.",
      ],
      faqs: [
        {
          q: "Minha imagem é enviada para algum servidor?",
          a: "Não. A imagem é lida e reconhecida no seu próprio navegador. Vale saber que o motor de OCR e o modelo de idioma são baixados de um CDN público no primeiro uso (cerca de 10–20 MB por idioma) — essa descarga vai do CDN até você, mas a imagem em si nunca sai do seu dispositivo.",
        },
        {
          q: "Quais idiomas são suportados?",
          a: "Inglês, chinês simplificado, japonês, espanhol, português, alemão e francês. Cada idioma carrega o próprio modelo treinado na primeira vez que você o seleciona; depois fica no cache do navegador e o reconhecimento começa mais rápido.",
        },
        {
          q: "Por que parte do texto sai errada?",
          a: "A precisão depende muito da origem: fotos tremidas, páginas curvadas, fontes pequenas e fundos poluídos causam erros. Use a imagem mais nítida que tiver, recorte só a área do texto e revise o resultado — principalmente números e caracteres parecidos.",
        },
      ],
    },
  },
});
