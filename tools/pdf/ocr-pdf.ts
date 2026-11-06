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
      deepDive: [
        {
          heading: "What OCR can and cannot recover from a scanned page",
          paragraphs: [
            "A scan is just a photograph of paper — the computer sees gray pixels, not letters. OCR (optical character recognition) is the process of recognizing letter shapes in those pixels and attaching the recognized text to the page as an invisible, searchable layer underneath the original image. After OCR, you can select text, search for a phrase, and copy a paragraph, even though the visible page is still the scanned photo.",
            "Honest limits matter here. OCR accuracy depends on scan quality above all: 300 DPI scans of clean typed text typically recognize very well, while low-resolution photos, skewed pages, faint photocopies and handwriting degrade quickly. Recognized text is never guaranteed perfect — a stray mark can become a wrong character, and crucial detail like amounts or names deserves human proofreading before you rely on the extracted text.",
            "What OCR genuinely cannot do: recover text that is not legible in the image, translate, or fix a fundamentally bad scan. If the human eye struggles with a page, recognition will struggle more. Rescanning at higher resolution is often a better investment than any post-processing.",
          ],
        },
        {
          heading: "Language settings and searchability: getting usable output",
          paragraphs: [
            "OCR is language-aware, and picking the wrong language is the most common quality killer. Recognition engines score letter sequences against the statistics of the chosen language — run Spanish text through an English-only model and every accented character becomes a suspect, and ñ, á, ü dissolve into noise. Multi-language documents need the corresponding languages enabled, or the minority-language passages come out as gibberish.",
            "Searchability has one more layer: the recognized text layer sits behind the image, so searching in a viewer finds the phrase and jumps to the right page, but the underlying pixels stay untouched. That is the standard \"sandwich\" structure every serious OCR product produces, and it means your archive keeps its original appearance while gaining full-text search — the best of both for records retention.",
            "A practical workflow for archives: OCR the whole batch once with the correct language, then spot-check by searching for a few known phrases (a name, a date, an invoice number). If searches hit, the text layer works; if they miss, either the language is wrong or the scan quality is below the recognition threshold — the search result tells you which pages to rescan.",
          ],
        },
        {
          heading: "Recognition on your device, not in someone's archive",
          paragraphs: [
            "The documents that need OCR are disproportionately the sensitive ones: old tax records, medical histories, personnel files, deeds, academic transcripts. Running them through a web OCR service means the full readable text of your records — extracted, indexed and machine-searchable — sits on infrastructure you know nothing about. Text is even more portable than the scanned image itself: once extracted, it can be copied, indexed or mined without your knowledge.",
            "This tool recognizes text entirely in your browser: the scanned pages are processed on your device, the text layer is attached locally, and the searchable PDF is written straight to disk. No page of your archive is uploaded, and no extracted text leaves your machine. Offline operation works the same, which suits archives that for good reason live on air-gapped machines.",
            "Expect a trade-off you should know upfront: browser-based recognition of a large batch takes time and memory, because the computation happens on your hardware instead of a data center. For a 20-page scan that is seconds; for a 500-page archive it is a coffee break. The payoff is that the most private step of digitizing your records happens entirely under your control.",
          ],
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
      deepDive: [
        {
          heading: "OCR 能从扫描页里找回什么,找不回什么",
          paragraphs: [
            "扫描件只是纸的照片——计算机看到的是灰色像素,不是字母。OCR(光学字符识别)做的事,是辨认这些像素里的字形,把识别出的文字以一个不可见的可搜索层附在原图下面。OCR 之后,你可以选中文字、搜索词句、复制段落,尽管页面上看到的仍是那张扫描照片。",
            "诚实的边界很重要。OCR 的准确率首先取决于扫描质量:干净打印文字的 300 DPI 扫描通常识别得很好,而低分辨率拍照、歪斜的页面、淡的复印件和手写体会迅速劣化。识别文本从不保证完美——一个污点可能变成一个错字,金额、姓名这类关键信息,在依赖提取文本前必须人工校对。",
            "OCR 真正做不到的:找回图像里肉眼都看不清的文字、翻译、修复根本性的烂扫描。如果人眼都费劲,识别只会更费劲。重新以更高分辨率扫一遍,往往比任何后期处理都值。",
          ],
        },
        {
          heading: "语言设置与可搜索性:拿到能用的输出",
          paragraphs: [
            "OCR 是认语言的,选错语言是头号质量杀手。识别引擎按所选语言的统计规律给字形序列打分——把西语文本喂给纯英文模型,每个重音字符都可疑,ñ、á、ü 化为噪声。多语文档需要同时启用相应语言,否则少数语言段落出来就是乱码。",
            "可搜索性还有一层:识别出的文字层藏在图像后面,在阅读器里搜索能命中并跳到正确页面,而底层像素原封不动。这是所有严肃 OCR 产品的标准“三明治”结构——档案保持原貌,同时获得全文检索,对存档合规是最好的两全。",
            "给档案管理的实用流程:用正确语言对整批做一次 OCR,然后搜索几个已知词句(人名、日期、发票号)抽查。搜得到,说明文字层可用;搜不到,要么语言选错,要么扫描质量低于识别阈值——搜索结果直接告诉你哪些页要重扫。",
          ],
        },
        {
          heading: "在你设备上识别,而不是在别人的档案库里",
          paragraphs: [
            "需要 OCR 的文档,敏感的比例格外高:旧报税记录、病史、人事档案、房契、成绩单。把它们交给网页 OCR 服务,意味着你的记录全文——被提取、被索引、可被机器检索的文本——躺在你一无所知的基础设施上。文本甚至比扫描图更易流动:一旦被提取,就可以在你不知情时被复制、索引或挖掘。",
            "本工具完全在浏览器里识别:扫描页在你设备上处理,文字层本地附加,可搜索的 PDF 直接写盘。档案没有任何一页被上传,提取出的任何文字不离开你的机器。离线一样可用,这正适合那些有充分理由待在隔离网络机器上的档案。",
            "有一个应该提前知道的取舍:浏览器里对大批量做识别要花时间和内存,因为计算发生在你的硬件而不是数据中心。20 页的扫描件是几秒钟;500 页的档案是一杯咖啡的时间。回报是:数字化你记录中最私密的一步,完全在你掌控之下完成。",
          ],
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
      deepDive: [
        {
          heading: "OCR が走査ページから取り戻せるもの、取り戻せないもの",
          paragraphs: [
            "スキャンは紙の写真にすぎません。コンピュータが見るのは灰色のピクセルであって、文字ではありません。OCR(光学文字認識)は、そのピクセルの中の字形を認識し、認識したテキストを元画像の下に隠れる検索可能なレイヤーとしてページに付与する処理です。OCR 後はテキストを選択し、語句を検索し、段落をコピーできます。見た目は依然として走査写真のままです。",
            "正直な限界が重要です。精度は何よりも走査品質に依存します。きれいな活字の 300 DPI 走査なら良好に認識できますが、低解像度の写真、傾いたページ、薄いコピー、手書きは急速に劣化します。認識テキストは決して完璧を保証しません。一つの汚れが一文字の誤りになり、金額や名前のような重要情報は、抽出テキストに頼る前に必ず人間の校正が必要です。",
            "OCR に本来できないことも明確です。画像の中で肉眼に読めない文字の復元、翻訳、根本的に悪い走査の修復。人間の目が苦しむページは、認識はもっと苦しみます。より高い解像度での再走査は、どんな後処理より有益なことが多い投資です。",
          ],
        },
        {
          heading: "言語設定と検索可能性:使える出力を得るには",
          paragraphs: [
            "OCR は言語を前提に動き、言語の選択間違いが最大の品質殺しです。認識エンジンは選ばれた言語の統計に照らして字形列を採点します。スペイン語のテキストを英語専用モデルに通すと、アクセント付き文字はすべて疑わしくなり、ñ、á、ü はノイズに溶けます。多言語文書では対応する言語を同時に有効にしないと、少数言語の部分が文字化けして出ます。",
            "検索可能性にはもう一層あります。認識テキスト層は画像の後ろに座るので、ビューアで検索すると語句がヒットして該当ページへ跳びますが、下のピクセルは無傷です。これは真面目な OCR 製品がすべて出す標準的な「サンドイッチ」構造で、保管記録にとっては外観を保ちつつ全文検索を得られる最良の両立です。",
            "アーカイブ運用の実践手順:正しい言語で一括に一度 OCR し、既知の語句(人名、日付、請求書番号)を数個検索して抜き取り検査します。ヒットすればテキスト層は機能しています。外れた場合は言語が違うか、走査品質が認識閾値を下回っています。検索結果が再走査すべきページを教えてくれます。",
          ],
        },
        {
          heading: "誰かのアーカイブではなく、端末上で認識する",
          paragraphs: [
            "OCR を必要とする文書は、機密性の高いものに偏っています。古い税務記録、病歴、人事ファイル、権利書、成績証明。これらを Web の OCR サービスに通すことは、あなたの記録の読める全文——抽出され、索引化され、機械検索可能になったテキスト——が、あなたの知らないインフラの上に置かれることを意味します。テキストは走査画像よりさらに流動的です。一度抽出されれば、あなたの知らないうちに複製・索引・採掘され得ます。",
            "このツールは認識を完全にブラウザ内で行います。走査ページは端末上で処理され、テキスト層はローカルで付与され、検索可能な PDF は直接ディスクに書き込まれます。アーカイブのどのページもアップロードされず、抽出されたテキストは端末の外に出ません。オフラインでも同様に動き、これは意図的に隔離されたネットワーク上のマシンで眠るアーカイブに合っています。",
            "前もって知っておくべき取引があります。ブラウザでの大規模バッチの認識は時間とメモリを要します。計算がデータセンターではなくあなたのハードウェアで行われるからです。20 ページなら数秒、500 ページのアーカイブならコーヒー一杯の時間。見返りは、記録のデジタル化で最も私的な工程が、完全にあなたの管理下で完結することです。",
          ],
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
      deepDive: [
        {
          heading: "Lo que el OCR puede y no puede recuperar de una página escaneada",
          paragraphs: [
            "Un escaneo es solo una fotografía del papel — el ordenador ve píxeles grises, no letras. El OCR (reconocimiento óptico de caracteres) es el proceso de reconocer las formas de las letras en esos píxeles y adjuntar el texto reconocido a la página como una capa invisible y buscable bajo la imagen original. Tras el OCR puedes seleccionar texto, buscar una frase y copiar un párrafo, aunque lo que se ve sigue siendo la foto escaneada.",
            "Los límites honestos importan. La precisión del OCR depende ante todo de la calidad del escaneo: escaneos de 300 DPI de texto limpio e impreso se reconocen típicamente muy bien, mientras que fotos de baja resolución, páginas torcidas, fotocopias tenues y escritura a mano se degradan rápido. El texto reconocido nunca está garantizado como perfecto — una marca suelta puede convertirse en un carácter erróneo, y detalles cruciales como importes o nombres merecen revisión humana antes de fiarte del texto extraído.",
            "Lo que el OCR genuinamente no puede: recuperar texto que no es legible en la imagen, traducir, o arreglar un escaneo fundamentalmente malo. Si el ojo humano sufre con una página, el reconocimiento sufrirá más. Reescanear a mayor resolución suele ser mejor inversión que cualquier post-procesado.",
          ],
        },
        {
          heading: "Configuración de idioma y buscabilidad: obtener salida utilizable",
          paragraphs: [
            "El OCR depende del idioma, y elegir el idioma equivocado es el mayor asesino de calidad. Los motores puntúan las secuencias de letras contra la estadística del idioma elegido — pasar texto español por un modelo solo inglés convierte cada carácter acentuado en un sospechoso, y ñ, á, ü se disuelven en ruido. Los documentos multilingües necesitan los idiomas correspondientes activados, o los pasajes en lengua minoritaria salen como galimatías.",
            "La buscabilidad tiene una capa más: el texto reconocido se sitúa detrás de la imagen, así que buscar en el visor encuentra la frase y salta a la página correcta, pero los píxeles subyacentes quedan intactos. Es la estructura \"sándwich\" estándar que produce todo producto OCR serio, y significa que tu archivo conserva su apariencia original mientras gana búsqueda a texto completo — lo mejor de ambos para conservar registros.",
            "Un flujo práctico para archivos: haz OCR del lote completo una vez con el idioma correcto y luego verifica buscando unas frases conocidas (un nombre, una fecha, un número de factura). Si las búsquedas aciertan, la capa de texto funciona; si fallan, el idioma está mal o la calidad del escaneo está por debajo del umbral — el resultado de búsqueda te dice qué páginas reescanear.",
          ],
        },
        {
          heading: "Reconocimiento en tu dispositivo, no en el archivo de otro",
          paragraphs: [
            "Los documentos que necesitan OCR son desproporcionadamente los sensibles: registros fiscales antiguos, historiales médicos, archivos de personal, escrituras, expedientes académicos. Pasarlos por un servicio web de OCR significa que el texto legible completo de tus registros — extraído, indexado y buscable por máquina — reside en una infraestructura de la que no sabes nada. El texto es incluso más transportable que la propia imagen escaneada: una vez extraído, puede copiarse, indexarse o explotarse sin que lo sepas.",
            "Esta herramienta reconoce el texto por completo en tu navegador: las páginas escaneadas se procesan en tu dispositivo, la capa de texto se adjunta en local y el PDF buscable se escribe directamente al disco. Ninguna página de tu archivo se sube, y ningún texto extraído sale de tu máquina. Funciona igual sin conexión, lo cual encaja con archivos que por buenas razones viven en máquinas aisladas de la red.",
            "Espera un intercambio que conviene conocer de antemano: el reconocimiento por navegador de un lote grande toma tiempo y memoria, porque el cálculo ocurre en tu hardware en vez de en un centro de datos. Para un escaneo de 20 páginas son segundos; para un archivo de 500 páginas, un café. La recompensa es que el paso más privado de digitalizar tus registros ocurre enteramente bajo tu control.",
          ],
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
      deepDive: [
        {
          heading: "O que o OCR pode e não pode recuperar de uma página digitalizada",
          paragraphs: [
            "Uma digitalização é só uma fotografia do papel — o computador vê pixels cinzas, não letras. OCR (reconhecimento óptico de caracteres) é o processo de reconhecer as formas das letras nesses pixels e anexar o texto reconhecido à página como uma camada invisível e pesquisável sob a imagem original. Depois do OCR, você seleciona texto, busca uma frase e copia um parágrafo, mesmo que o que se vê continue sendo a foto digitalizada.",
            "Limites honestos importam. A precisão do OCR depende antes de tudo da qualidade da digitalização: scans de 300 DPI de texto limpo impresso normalmente reconhecem muito bem, enquanto fotos de baixa resolução, páginas tortas, fotocópias fracas e escrita à mão degradam rápido. O texto reconhecido nunca é garantido perfeito — uma marca solta pode virar um caractere errado, e detalhes cruciais como valores ou nomes merecem revisão humana antes de você confiar no texto extraído.",
            "O que o OCR genuinamente não faz: recuperar texto que não está legível na imagem, traduzir, ou consertar uma digitalização fundamentalmente ruim. Se o olho humano sofre com uma página, o reconhecimento sofre mais. Redigitalizar em resolução maior costuma ser um investimento melhor que qualquer pós-processamento.",
          ],
        },
        {
          heading: "Configuração de idioma e pesquisabilidade: obtendo saída útil",
          paragraphs: [
            "OCR depende do idioma, e escolher o idioma errado é o maior matador de qualidade. Os motores pontuam sequências de letras contra a estatística do idioma escolhido — passar texto em português por um modelo só de inglês transforma cada caractere acentuado num suspeito, e ç, ã, é se dissolvem em ruído. Documentos multilíngues precisam dos idiomas correspondentes ativados, senão as passagens na língua minoritária saem como palavrório.",
            "A pesquisabilidade tem mais uma camada: o texto reconhecido fica atrás da imagem, então buscar no visualizador encontra a frase e salta para a página certa, mas os pixels de baixo ficam intactos. Essa é a estrutura \"sanduíche\" padrão que todo produto OCR sério produz, e significa que seu acervo mantém a aparência original enquanto ganha busca em texto completo — o melhor dos dois mundos para guarda de registros.",
            "Um fluxo prático para acervos: faça OCR do lote todo uma vez no idioma correto e depois confira buscando algumas frases conhecidas (um nome, uma data, um número de nota fiscal). Se as buscas acertam, a camada de texto funciona; se erram, ou o idioma está errado ou a qualidade do scan está abaixo do limite — o resultado da busca diz quais páginas redigitalizar.",
          ],
        },
        {
          heading: "Reconhecimento no seu dispositivo, não no arquivo dos outros",
          paragraphs: [
            "Os documentos que precisam de OCR são desproporcionalmente os sensíveis: registros fiscais antigos, históricos médicos, pastas de pessoal, escrituras, históricos escolares. Passá-los por um serviço web de OCR significa que o texto legível completo dos seus registros — extraído, indexado e pesquisável por máquina — fica numa infraestrutura que você não conhece. Texto é ainda mais transportável que a própria imagem digitalizada: uma vez extraído, pode ser copiado, indexado ou minerado sem que você saiba.",
            "Esta ferramenta reconhece o texto inteiramente no seu navegador: as páginas digitalizadas são processadas no seu dispositivo, a camada de texto é anexada localmente e o PDF pesquisável é escrito direto no disco. Nenhuma página do seu acervo é enviada, e nenhum texto extraído sai da sua máquina. Funciona igual offline, o que serve para acervos que por boas razões vivem em máquinas isoladas da rede.",
            "Espere uma troca que vale saber de antemão: o reconhecimento em navegador de um lote grande leva tempo e memória, porque o cálculo acontece no seu hardware em vez de um data center. Para uma digitalização de 20 páginas são segundos; para um acervo de 500 páginas, um café. O retorno é que o passo mais privado de digitalizar seus registros acontece inteiramente sob seu controle.",
          ],
        },
      ],
    },
  },
});
