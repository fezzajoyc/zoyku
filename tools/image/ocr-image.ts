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
      deepDive: [
        {
          heading: "How OCR turns pixels into text",
          paragraphs: [
            "Optical character recognition is a pipeline, not a single step: first the image is preprocessed (contrast adjustment, noise reduction, deskewing), then the layout is analyzed to find regions that look like text blocks, then a recognition model maps each character shape to a letter, and finally the pieces are reassembled into lines and paragraphs.",
            "Accuracy depends heavily on the quality of the source. Clean, high-resolution scans of typed text with good contrast can approach perfect recognition; low-resolution photos, skewed pages, ornate fonts and handwriting all drop the accuracy sharply. The rule of thumb is: the closer the image looks to a photocopied document, the better the result.",
            "Language setting matters as much as image quality: the recognizer needs to know which alphabet and which word shapes to expect. OCR on a Japanese receipt with an English model produces confident nonsense — always match the model to the text's language.",
          ],
        },
        {
          heading: "Getting better results from imperfect sources",
          paragraphs: [
            "A few habits raise accuracy noticeably. Crop away irrelevant surroundings before running recognition, straighten or re-shoot skewed pages, and increase contrast if the text is faint — screenshots of text usually beat photos of screens because there is no perspective or glare.",
            "Beware of character confusions that models get wrong at low quality: 0 and O, 1 and l and I, rn and m. Numbers in tables, codes and amounts deserve a manual pass — a wrong digit in a bank account or a price is the classic OCR failure.",
            "Treat the output as a draft, not a transcript: proofread anything you will paste into a document, and keep the original image. The combination of fast machine recognition plus a short human check is far more reliable than either alone.",
          ],
        },
        {
          heading: "Privacy is why local OCR matters",
          paragraphs: [
            "The documents people OCR are exactly the sensitive ones: contracts, ID scans, payslips, receipts with card numbers, handwritten notes. Upload-based OCR services receive the full image — and therefore the text and any personal data in it — on someone else's infrastructure.",
            "This tool performs recognition entirely in your browser: the image is processed on your device and the extracted text stays on your screen. Nothing is transmitted, so OCR on confidential documents carries no upload risk at all.",
            "A practical consequence: you can OCR documents under NDA, medical paperwork or internal records without checking anyone's privacy policy first, because there is no external party involved in the processing at all.",
          ],
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
      deepDive: [
        {
          heading: "OCR 如何把像素变成文字",
          paragraphs: [
            "光学字符识别是一条流水线,不是单一动作:先对图像做预处理(调对比度、去噪、纠偏),再分析版面、找出像文字块的区域,然后用识别模型把每个字符形状映射成字母,最后把碎片重新拼装成行和段落。",
            "识别质量高度依赖源图质量。清晰高分辨率的印刷体扫描件、对比度良好时可以接近完美;低分辨率照片、歪斜的页面、花哨字体和手写体都会让准确率骤降。经验法则:图片看起来越像一份复印文档,结果越好。",
            "语言设置和图片质量同样重要:识别器需要知道该期待哪种字母系统、哪些词形。用英文模型识别日文小票,输出的是一本正经的胡说八道——模型语言永远要和文本语言对上。",
          ],
        },
        {
          heading: "让不完美的源图出更好的结果",
          paragraphs: [
            "几个习惯能明显提升准确率:识别前把无关的周边裁掉,把歪斜的页面转正或重拍,文字发虚就提高对比度——屏幕文字的截图通常胜过对着屏幕拍的照片,因为没有透视和反光。",
            "警惕低质量下模型最容易搞混的字符:0 和 O、1 和 l 和 I、rn 和 m。表格里的数字、编号和金额值得人工核对——银行账号或价格里错一个数字,是 OCR 的经典事故。",
            "把输出当草稿而不是誊写稿:凡是准备粘进文档的内容都通读一遍,并保留原图。机器快速识别加一段简短的人工校对,远比单独任何一端可靠。",
          ],
        },
        {
          heading: "隐私是本地 OCR 的意义所在",
          paragraphs: [
            "人们要 OCR 的恰恰是最敏感的文件:合同、证件扫描件、工资单、带卡号的小票、手写笔记。上传式 OCR 服务会在别人的基础设施上收到完整图片——连同其中的文字和任何个人数据。",
            "本工具完全在浏览器内完成识别:图片在你的设备上处理,提取出的文字只停留在你的屏幕上。什么都不外传,对机密文档做 OCR 因此不存在上传风险。",
            "一个实际结果:处理受保密协议约束的文件、医疗文书或内部记录时,你无需先查任何隐私政策——因为整个处理过程根本没有任何外部第三方参与。",
          ],
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
      deepDive: [
        {
          heading: "OCR がピクセルを文字に変える仕組み",
          paragraphs: [
            "光学文字認識は一本のパイプラインであって単一の動作ではありません:まず画像を前処理(コントラスト調整・ノイズ除去・傾き補正)し、次にレイアウトを解析してテキストブロックらしき領域を特定し、認識モデルが各文字の形を字母に対応させ、最後に断片を行と段落へ再組み立てします。",
            "精度は元画像の質に大きく依存します。鮮明で高解像度、コントラストの良い印刷体スキャンならほぼ完璧に近づきますが、低解像度の写真、傾いたページ、装飾フォント、手書きは精度を急落させます。経験則:画像が複写文書に見えるほど結果は良い。",
            "言語設定は画質と同じくらい重要です:認識器は、どの字母系とどの語形を期待すべきかを知る必要があります。日本語のレシートに英語モデルを使うと、自信満々のナンセンスが出力されます——モデルの言語は必ずテキストの言語に合わせてください。",
          ],
        },
        {
          heading: "不完全なソースから良い結果を得るには",
          paragraphs: [
            "精度を確実に上げる習慣がいくつかあります:認識の前に無関係な周囲をトリミングする、傾いたページは転正か撮り直す、文字が薄いならコントラストを上げる——画面に写った文字は、スクリーンショットの方が撮影写真よりほぼ常に勝ちます。透視と反射がないためです。",
            "低品質でモデルが誤りやすい文字混同に注意:0 と O、1 と l と I、rn と m。表の数字、コード、金額は必ず人間が通すべきです——口座番号や価格の桁違いは OCR の古典的事故です。",
            "出力は草稿として扱い、写しとは扱わない:文書に貼る予定のものはすべて読み返し、元画像を保管しておく。機械の高速認識に短い人間のチェックを重ねる方式は、どちらか単独よりはるかに信頼できます。",
          ],
        },
        {
          heading: "ローカル OCR が意味を持つのはプライバシーだから",
          paragraphs: [
            "人が OCR したい文書は、まさにセンシティブなものです:契約書、身分証のスキャン、給与明細、カード番号入りのレシート、手書きメモ。アップロード型の OCR サービスは完全な画像——中のテキストとあらゆる個人データも——を他人のインフラで受け取ります。",
            "このツールは認識を完全にブラウザ内で実行します:画像は端末上で処理され、抽出されたテキストはあなたの画面に留まります。送信は一切なく、機密文書の OCR にアップロードリスクが存在しません。",
            "実務的な帰結:NDA 下の文書、医療書類、社内記録の OCRでも、先に誰かのプライバシーポリシーを確認する必要がない——処理に関与する外部当事者が最初から存在しないためです。",
          ],
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
      deepDive: [
        {
          heading: "Cómo el OCR convierte píxeles en texto",
          paragraphs: [
            "El reconocimiento óptico de caracteres es una tubería, no un paso único: primero la imagen se preprocesa (ajuste de contraste, reducción de ruido, enderezado), después se analiza la maquetación para hallar regiones que parecen bloques de texto, luego un modelo de reconocimiento mapea cada forma de carácter a una letra y, por último, las piezas se reensamblan en líneas y párrafos.",
            "La exactitud depende en gran medida de la calidad de la fuente. Escaneos limpios de texto impreso a buena resolución y con buen contraste rozan el reconocimiento perfecto; las fotos de baja resolución, las páginas inclinadas, las fuentes ornamentadas y la escritura a mano hacen caer la precisión de golpe. La regla práctica: cuanto más se parezca la imagen a un documento fotocopiado, mejor el resultado.",
            "El ajuste de idioma importa tanto como la calidad de imagen: el reconocedor necesita saber qué alfabeto y qué formas de palabra esperar. Un OCR de un recibo japonés con un modelo inglés produce disparates convencidos — empareja siempre el modelo con el idioma del texto.",
          ],
        },
        {
          heading: "Sacar mejores resultados de fuentes imperfectas",
          paragraphs: [
            "Algunos hábitos suben la precisión de forma notable: recorta el entorno irrelevante antes de reconocer, endereza o repite la foto de páginas inclinadas, y sube el contraste si el texto es débil — las capturas de pantalla de texto casi siempre ganan a las fotos de pantalla, porque no hay perspectiva ni reflejos.",
            "Cuidado con las confusiones de caracteres que los modelos fallan en baja calidad: 0 y O, 1 y l e I, rn y m. Los números de tablas, códigos e importes merecen una pasada manual — un dígito equivocado en una cuenta bancaria o un precio es el fallo clásico del OCR.",
            "Trata la salida como borrador, no como transcripción: relee todo lo que vayas a pegar en un documento y conserva la imagen original. El reconocimiento rápido de la máquina más una comprobación humana breve es mucho más fiable que cualquiera de los dos por separado.",
          ],
        },
        {
          heading: "La privacidad es la razón del OCR local",
          paragraphs: [
            "Los documentos que la gente pasa por OCR son justo los sensibles: contratos, escaneos de documentos de identidad, nóminas, recibos con números de tarjeta, notas manuscritas. Los servicios de OCR basados en subida reciben la imagen completa — y por tanto el texto y cualquier dato personal que contenga — en la infraestructura de otra persona.",
            "Esta herramienta realiza el reconocimiento íntegramente en tu navegador: la imagen se procesa en tu dispositivo y el texto extraído se queda en tu pantalla. No se transmite nada, así que hacer OCR de documentos confidenciales no conlleva riesgo de subida alguno.",
            "Una consecuencia práctica: puedes pasar por OCR documentos bajo confidencialidad, papeleo médico o registros internos sin revisar antes la política de privacidad de nadie, porque no interviene ninguna parte externa en el procesado en absoluto.",
          ],
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
      deepDive: [
        {
          heading: "Como o OCR transforma pixels em texto",
          paragraphs: [
            "O reconhecimento óptico de caracteres é um pipeline, não um passo único: primeiro a imagem é pré-processada (ajuste de contraste, redução de ruído, correção de inclinação), depois o layout é analisado para achar regiões que parecem blocos de texto, então um modelo de reconhecimento mapeia cada forma de caractere a uma letra e, por fim, as peças são remontadas em linhas e parágrafos.",
            "A precisão depende muito da qualidade da fonte. Digitalizações limpas de texto impresso em boa resolução e com bom contraste se aproximam do reconhecimento perfeito; fotos de baixa resolução, páginas tortas, fontes ornamentadas e escrita à mão derrubam a precisão de repente. A regra prática: quanto mais a imagem parecer um documento fotocopiado, melhor o resultado.",
            "A configuração de idioma importa tanto quanto a qualidade da imagem: o reconhecedor precisa saber qual alfabeto e quais formas de palavra esperar. Um OCR de um recibo japonês com modelo inglês produz disparates confiantes — sempre emparelhe o modelo com o idioma do texto.",
          ],
        },
        {
          heading: "Extrair melhores resultados de fontes imperfeitas",
          paragraphs: [
            "Alguns hábitos elevam a precisão de forma notável: recorte o entorno irrelevante antes de reconhecer, endireite ou refotografe páginas tortas, e aumente o contraste se o texto estiver fraco — capturas de tela de texto quase sempre vencem fotos de tela, porque não há perspectiva nem reflexo.",
            "Cuidado com as confusões de caracteres que os modelos erram em baixa qualidade: 0 e O, 1 e l e I, rn e m. Os números de tabelas, códigos e valores merecem uma passada manual — um dígito errado numa conta bancária ou num preço é a falha clássica do OCR.",
            "Trate a saída como rascunho, não como transcrição: releia tudo o que for colar num documento e guarde a imagem original. O reconhecimento rápido da máquina mais uma conferência humana breve é muito mais confiável que qualquer um dos dois sozinho.",
          ],
        },
        {
          heading: "A privacidade é a razão do OCR local",
          paragraphs: [
            "Os documentos que as pessoas passam por OCR são exatamente os sensíveis: contratos, digitalizações de documentos de identidade, contracheques, recibos com números de cartão, notas manuscritas. Serviços de OCR baseados em envio recebem a imagem completa — e portanto o texto e qualquer dado pessoal nela — na infraestrutura de outra pessoa.",
            "Esta ferramenta realiza o reconhecimento inteiramente no seu navegador: a imagem é processada no seu dispositivo e o texto extraído fica na sua tela. Nada é transmitido, então fazer OCR de documentos confidenciais não carrega risco de envio algum.",
            "Uma consequência prática: você pode passar por OCR documentos sob confidencialidade, papelada médica ou registros internos sem conferir antes a política de privacidade de ninguém, porque nenhuma parte externa participa do processamento de forma alguma.",
          ],
        },
      ],
    },
  },
});
