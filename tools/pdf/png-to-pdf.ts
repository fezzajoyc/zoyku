import { ImagesToPdfEngine } from "../_engines/pdf-engine-images-to-pdf";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "png-to-pdf",
  category: "pdf",
  icon: "image",
  engine: { component: ImagesToPdfEngine, props: { kind: "png" } },
  related: ["jpg-to-pdf", "image-to-pdf", "merge-pdf", "split-pdf", "compress-pdf", "delete-pdf-pages", "pdf-to-ppt", "ocr-pdf", "rotate-pdf", "pdf-to-text"],
  copy: {
    en: {
      name: "PNG to PDF",
      tagline:
        "Convert PNG screenshots and images into one PDF without recompressing them — batch import, custom order, processed on your device.",
      intro: [
        "Screenshots, charts, diagrams and design exports are usually PNG — and people usually want them as a PDF. Drop a whole batch, order it with the arrow buttons, and get a lossless PDF: PNG data is embedded as-is, so text in screenshots stays razor sharp.",
        "Choose fit-to-image pages for pixel-perfect sizing, or A4/Letter with a margin for printing. Everything is built with pdf-lib on your device; no upload, no quality gamble.",
      
        "PNG data is embedded into the PDF as-is rather than re-encoded — pdf-lib places the exact PNG stream on each page, so text in screenshots stays razor sharp and file size equals the sum of the sources plus minimal wrapper. Fit-to-image sizing keeps the page at pixel dimensions; A4/Letter adds a margin for printing.",
        "Compared with printing a PNG to a virtual PDF printer (which rasterizes at screen DPI), embedding preserves native resolution — a 4K screenshot stays 4K in the PDF. And unlike upload-based assemblers, a folder of sensitive screenshots, mockups or scans binds into one document without ever leaving your browser.",
      ],
      steps: [
        "Drop the PNG files you want to combine.",
        "Sort them and choose fit-to-image or A4/Letter pages.",
        "Click Create PDF and download it.",
      ],
      faqs: [
        {
          q: "Is PNG quality preserved exactly?",
          a: "Yes. The PNG stream is embedded unchanged, so sharp edges, small text and transparency-backed areas look exactly like the source files.",
        },
        {
          q: "Which page size should I pick for screenshots?",
          a: "“Fit to image” keeps each screenshot at its native pixel size — best for screen reading. Choose A4 or Letter with a margin when the PDF will be printed.",
        },
        {
          q: "Why is my PNG-based PDF still large?",
          a: "Lossless PNG data is big by nature. If you need a smaller file, run the result through Compress PDF, which trades a little fidelity for size.",
        },
      ],
      deepDive: [
        {
          heading: "Why PNG input deserves different handling than JPEG",
          paragraphs: [
            "PNG and JPEG look similar to a casual eye but encode pixels with opposite trade-offs. PNG is lossless: every pixel is preserved exactly, which makes it the format of screenshots, diagrams, scanned text and anything with sharp edges. JPEG is lossy and tuned for photographs. Wrapping PNGs into a PDF therefore usually means handling content that benefits from staying lossless — and a converter that silently re-encodes PNG to JPEG throws away exactly the property you chose PNG for.",
            "This tool embeds the image data without destructive re-compression, so screenshots stay pixel-crisp inside the PDF: text in the screenshot remains readable at any zoom, and diagram lines stay clean. The PDF is the container; the PNG's lossless pixels ride inside it untouched.",
            "One subtle detail worth knowing: PNG supports transparency, PDF pages do not. A transparent PNG placed on a PDF page gets composited onto a background — white by convention. If your screenshot has transparency that matters (a logo, an overlay), check the first page of the output rather than assuming.",
          ],
        },
        {
          heading: "Screenshots, scans and assembling them in order",
          paragraphs: [
            "The most common PNG-to-PDF jobs are documentation-shaped: a sequence of screenshots forming a tutorial, a bug report with evidence images, scanned certificates or forms saved as PNG. For all of these, page order is the whole game — a tutorial whose screenshots arrive out of sequence is useless. Naming files 01-..., 02-... before adding them makes the intended order explicit and survives every file-picker's sorting.",
            "Screenshots have pixel-exact dimensions that rarely match paper sizes, so the output pages will typically be sized to each image. That is ideal for on-screen reading and archiving. If the destination is print, the mismatch matters more: consider whether the screenshots' text is large enough at the printed size, since shrinking a 1080p screenshot onto A4 makes small UI text hard to read.",
            "For multi-image documents, consistency beats variety: screenshots from the same app session share dimensions and style, and the resulting PDF reads as one coherent document. Mixed sources — screenshots plus photos plus scans — produce pages of wildly different scale; normalizing (resizing or cropping the sources first) produces a far more professional result.",
          ],
        },
        {
          heading: "Packaging evidence locally, without a middleman",
          paragraphs: [
            "The content people package from PNG to PDF is often evidentiary or private: screenshots of a fraudulent transaction, chat logs for a dispute, ID scans for verification, medical test results. Each of these is the kind of thing you would never hand to a stranger — yet uploading to a converter does exactly that, before the PDF even exists.",
            "This tool does the packaging entirely in your browser: PNGs are read locally, embedded losslessly into PDF page objects, and the finished document is saved by your device. Nothing is uploaded at any point, so the screenshots of your banking app never exist on any server, and the operation runs the same with no internet connection.",
            "There is a quality dividend too: because the PNG data is embedded as-is, the PDF preserves the exact pixels you captured — important when the content is evidence, where a compression artifact on a timestamp or account number could raise doubts about authenticity. What you screenshot is precisely what the reader will see.",
          ],
        },
      ],
    },
    zh: {
      name: "PNG 转 PDF",
      tagline: "把 PNG 截图和图片合成 PDF,不重新压缩——批量导入、自定义顺序,全部在你的设备上处理。",
      intro: [
        "截图、图表、设计稿导出通常是 PNG 格式,而接收方往往要 PDF。批量拖入,用箭头排序,得到无损 PDF:PNG 数据原样嵌入,截图里的文字依然锐利。",
        "选“随图尺寸”可获得像素级精确的页面,打印则用带边距的 A4/Letter。全部由 pdf-lib 在本地生成——不上传、不赌画质。",
      ],
      steps: [
        "拖入要合并的 PNG 文件。",
        "排序并选择随图尺寸或 A4/Letter 页面。",
        "点击“生成 PDF”并下载。",
      ],
      faqs: [
        {
          q: "PNG 画质能原样保留吗?",
          a: "能。PNG 数据流不做任何改动直接嵌入,锐利边缘、小号文字和带透明的区域都和源文件一模一样。",
        },
        {
          q: "截图应该选什么页面尺寸?",
          a: "“随图尺寸”让每张截图保持原始像素大小,适合屏幕阅读;要打印就选带边距的 A4 或 Letter。",
        },
        {
          q: "为什么 PNG 生成的 PDF 还是比较大?",
          a: "无损 PNG 本身数据量就大。需要更小的文件,可以把结果放进“压缩 PDF”再处理一次,用少量画质换取体积。",
        },
      ],
      deepDive: [
        {
          heading: "为什么 PNG 输入需要和 JPEG 不同的待遇",
          paragraphs: [
            "PNG 和 JPEG 在随意一瞥下相似,但编码像素的取舍相反。PNG 无损:每个像素都被精确保留,所以它是截图、图表、扫描文字和一切锐利边缘的格式。JPEG 有损、面向照片。把 PNG 包进 PDF 通常意味着处理那些受益于保持无损的内容——而悄悄把 PNG 重编码成 JPEG 的转换器,扔掉的恰恰是你选 PNG 的那个理由。",
            "本工具不做破坏性重压缩地嵌入图像数据,所以截图在 PDF 里保持像素级锐利:截图里的文字任意缩放都清晰可读,图表线条保持干净。PDF 只是容器,PNG 的无损像素原封不动地待在里面。",
            "一个值得知道的细节:PNG 支持透明,PDF 页面不支持。透明 PNG 放到 PDF 页面上会被合成到一个背景上——惯例是白色。如果你的截图的透明度有讲究(Logo、叠加层),别想当然,先检查输出的第一页。",
          ],
        },
        {
          heading: "截图、扫描与按序组装",
          paragraphs: [
            "最常见的 PNG 转 PDF 活儿都是文档形态的:一组截图构成教程、带证据图的 bug 报告、存成 PNG 的证书或表单扫描。这些场景里页序就是一切——截图顺序错乱的教程毫无用处。添加前先按 01-、02- 命名,让预期顺序显式化,而且经得起任何文件选择器的排序。",
            "截图有像素级的精确尺寸,很少恰好是纸型,所以输出页面通常按各自图片的尺寸来。这对屏幕阅读和归档是理想的。如果目的地是打印,错配就更重要:想想截图文字在打印尺寸下是否够大——把 1080p 截图缩到 A4 上,界面里的小字就很难读了。",
            "多图文档,一致性胜过多样性:同一次应用会话的截图共享尺寸和风格,产出的 PDF 读起来是一个连贯的文档。混杂来源——截图加照片加扫描——产出尺度悬殊的页面;先归一化(缩放或裁剪源图)会得到专业得多的结果。",
          ],
        },
        {
          heading: "本地打包证据,不经过中间人",
          paragraphs: [
            "人们从 PNG 打包成 PDF 的内容,常常是证据性质或私密的:可疑交易的截图、纠纷用的聊天记录、验证用的证件扫描、体检报告。哪一样都是你不会亲手交给陌生人的东西——然而上传给转换器恰恰就是这么做了,而且发生在 PDF 还没生出来之前。",
            "本工具完全在浏览器里打包:PNG 本地读取,无损嵌入 PDF 页面对象,成品由你的设备保存。任何时刻都不上传,所以你银行应用的截图从不存在于任何服务器上,断网时操作照常进行。",
            "质量上还有一笔红利:因为 PNG 数据是原样嵌入的,PDF 保留你截取的精确像素——内容是证据时这点很重要,时间戳或账号上一个压缩伪影都可能引来对真实性的怀疑。你截到什么,读者就精确地看到什么。",
          ],
        },
      ],
    },
    ja: {
      name: "PNG を PDF に変換",
      tagline: "PNG のスクリーンショットや画像を再圧縮せず 1 冊の PDF に。一括取り込み、自由な順序、処理はすべて端末内で完結します。",
      intro: [
        "スクリーンショット・図表・グラフ・デザイン書き出しはたいてい PNG 形式で、提出先は PDF を求めることが多いもの。一括でドロップし、矢印で並べ替えると、ロスレスの PDF が得られます。PNG データはそのまま埋め込まれるため、スクリーンショット内の文字もくっきりしています。",
        "「画像に合わせる」でピクセルどおりのサイズに、印刷用なら A4/レター+余白に。生成は pdf-lib による端末内処理で、アップロードも品質の心配もありません。",
      ],
      steps: [
        "結合したい PNG ファイルをドロップします。",
        "並べ替え、「画像に合わせる」か「A4/レター」を選びます。",
        "「PDF を作成」をクリックしてダウンロードします。",
      ],
      faqs: [
        {
          q: "PNG の品質はそのまま保たれますか?",
          a: "はい。PNG のデータは無変更で埋め込まれるため、輪郭・小さな文字・透明部分もソースファイルどおりに再現されます。",
        },
        {
          q: "スクリーンショットにはどのページサイズが良い?",
          a: "「画像に合わせる」なら各スクリーンショットが元のピクセルサイズのままになり、画面閲覧に最適です。印刷するなら A4 かレター+余白を選んでください。",
        },
        {
          q: "PNG 由来の PDF が大きいのはなぜ?",
          a: "ロスレスの PNG はもともとデータ量が多い形式です。より小さくしたい場合は「PDF 圧縮」に通すと、わずかな忠実性と引き換えに軽量化できます。",
        },
      ],
      deepDive: [
        {
          heading: "PNG 入力が JPEG と異なる扱いを要する理由",
          paragraphs: [
            "PNG と JPEG は流し見には似ていますが、ピクセルの符号化の引き換えが正反対です。PNG は可逆です。すべてのピクセルが正確に保たれ、だからこそスクリーンショット、図表、走査テキスト、鋭い縁を持つすべての形式になっています。JPEG は非可逆で写真向きです。したがって PNG を PDF に包むことは、たいてい可逆であり続ける利益のある内容を扱うことを意味します。PNG を黙って JPEG に再符号化する変換器は、あなたが PNG を選んだその性質を捨てます。",
            "このツールは破壊的な再圧縮なしに画像データを埋め込みます。だからスクリーンショットは PDF の中でもピクセル鋭度を保ちます。スクリーンショット内の文字はどの拡大でも読め、図の線はきれいなままです。PDF は容器であり、PNG の可逆ピクセルはその中を無傷で旅します。",
            "知っておく価値のある細かい点:PNG は透過をサポートし、PDF ページはしません。透過のある PNG はページ上で背景に合成されます——慣習では白です。スクリーンショットの透過が意味を持つ場合(ロゴ、オーバーレイ)、想定せずに出力の第一ページを確認してください。",
          ],
        },
        {
          heading: "スクリーンショット、走査、順序どおりの組み立て",
          paragraphs: [
            "PNG から PDF への最も多い仕事はドキュメントの形をしています。チュートリアルを作る一連のスクリーンショット、証拠画像付きのバグレポート、PNG で保存された証明書やフォームの走査。どれでもページ順がすべてです。順序の狂ったスクリーンショットのチュートリアルは役に立ちません。追加前に 01-、02- と命名すれば、意図した順が明示され、ファイルピッカーのどんな並べ替えにも耐えます。",
            "スクリーンショットはピクセル精度の寸法を持ち、用紙サイズと一致することはまれです。だから出力ページはたいてい各画像のサイズになります。画面表示と保管には理想です。印刷が行き先なら、不一致の重要度が上がります。スクリーンショットの文字が印刷サイズで十分大きいか考えてください。1080p のスクリーンショットを A4 に縮めると、UI の小さな文字は読みにくくなります。",
            "複数画像の文書では一貫性が変化に勝ります。同じセッションのスクリーンショットは寸法と様式を共有し、出力 PDF は一つの連貫した文書として読めます。混在ソース——スクリーンショットに写真に走査——は尺度が桁違いに異なるページを産みます。先に正規化(ソースのリサイズか切り抜き)すれば、はるかに職業的な結果になります。",
          ],
        },
        {
          heading: "証拠を仲介者なしでローカルに梱包する",
          paragraphs: [
            "人が PNG から PDF へ梱包する内容は、しばしば証拠的あるいは私的です。不正取引のスクリーンショット、争議のためのチャット記録、確認用の身分証走査、検査結果。どれも見知らぬ人に手渡しはしない類のものです。しかし変換器へのアップロードはまさにそれを、PDF が存在する前に、実行しています。",
            "このツールは梱包を完全にブラウザ内で行います。PNG はローカルで読み込まれ、可逆のまま PDF ページオブジェクトに埋め込まれ、完成文書は端末が保存します。どの時点でもアップロードはなく、あなたの銀行アプリのスクリーンショットがサーバー上に存在することは決してなく、回線がなくても操作は同じように動きます。",
            "品質の配当もあります。PNG データはそのまま埋め込まれるので、PDF はあなたが取得した正確なピクセルを保ちます。内容が証拠である場合、これは重要です。タイムスタンプや口座番号の上の圧縮跡は、真実性に疑いを呼び得ます。あなたが撮ったものこそ、読み手が正確に見るものです。",
          ],
        },
      ],
    },
    es: {
      name: "PNG a PDF",
      tagline:
        "Convierte capturas e imágenes PNG en un PDF sin recomprimirlas: importación por lotes, orden personalizado, todo procesado en tu dispositivo.",
      intro: [
        "Las capturas, gráficas y exportaciones de diseño suelen ser PNG, y quien las recibe suele pedir un PDF. Suelta un lote completo, ordénalo con las flechas y obtén un PDF sin pérdidas: los datos PNG se incrustan tal cual, así que el texto de las capturas sigue nítido.",
        "Elige páginas ajustadas a la imagen para un tamaño píxel-perfecto, o A4/Carta con margen para imprimir. Todo se genera con pdf-lib en tu dispositivo: sin subidas y sin jugar con la calidad.",
      ],
      steps: [
        "Suelta los archivos PNG que quieras combinar.",
        "Ordénalos y elige páginas ajustadas o A4/Carta.",
        "Pulsa Crear PDF y descárgalo.",
      ],
      faqs: [
        {
          q: "¿Se conserva la calidad PNG tal cual?",
          a: "Sí. El flujo PNG se incrusta sin cambios: los bordes duros, el texto pequeño y las zonas transparentes se ven exactamente igual que en los archivos de origen.",
        },
        {
          q: "¿Qué tamaño de página elegir para capturas?",
          a: "“Ajustar a la imagen” mantiene cada captura en su tamaño nativo en píxeles, ideal para leer en pantalla. Elige A4 o Carta con margen si el PDF se va a imprimir.",
        },
        {
          q: "¿Por qué mi PDF con PNG sigue siendo grande?",
          a: "Los datos PNG sin pérdida son grandes por naturaleza. Si necesitas un archivo menor, pásalo por Comprimir PDF, que cambia un poco de fidelidad por tamaño.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué la entrada PNG merece un trato distinto al JPEG",
          paragraphs: [
            "PNG y JPEG parecen similares a la vista casera, pero codifican píxeles con intercambios opuestos. PNG es sin pérdidas: cada píxel se conserva exactamente, lo que lo hace el formato de capturas de pantalla, diagramas, texto escaneado y todo lo de bordes nítidos. JPEG es con pérdidas y está afinado para fotografías. Envolver PNGs en un PDF significa por tanto manejar contenido que se beneficia de seguir siendo sin pérdidas — y un conversor que re-codifica silenciosamente PNG a JPEG tira justo la propiedad por la que elegiste PNG.",
            "Esta herramienta incrusta los datos de imagen sin re-compresión destructiva, así que las capturas se quedan nítidas al píxel dentro del PDF: el texto de la captura sigue legible a cualquier zoom y las líneas de los diagramas permanecen limpias. El PDF es el contenedor; los píxeles sin pérdidas del PNG viajan dentro intactos.",
            "Un detalle sutil que vale conocer: PNG admite transparencia, las páginas PDF no. Un PNG transparente colocado en una página PDF se compone sobre un fondo — blanco por convención. Si tu captura tiene transparencia que importa (un logo, una superposición), revisa la primera página de la salida en vez de darlo por hecho.",
          ],
        },
        {
          heading: "Capturas, escaneos y ensamblado en orden",
          paragraphs: [
            "Los trabajos más comunes de PNG a PDF tienen forma de documentación: una secuencia de capturas formando un tutorial, un reporte de error con imágenes de evidencia, certificados o formularios escaneados y guardados como PNG. En todos ellos, el orden de páginas es todo el juego — un tutorial cuyas capturas llegan fuera de secuencia no sirve de nada. Nombrar los archivos 01-..., 02-... antes de añadirlos hace explícito el orden previsto y sobrevive a la ordenación de cualquier selector de archivos.",
            "Las capturas tienen dimensiones exactas al píxel que rara vez coinciden con tamaños de papel, así que las páginas de salida suelen medir cada imagen. Eso es ideal para lectura en pantalla y archivo. Si el destino es imprimir, el desajuste importa más: considera si el texto de las capturas es suficientemente grande al tamaño impreso, porque reducir una captura de 1080p a A4 hace ilegible el texto pequeño de la interfaz.",
            "Para documentos de varias imágenes, la consistencia vence a la variedad: las capturas de una misma sesión comparten dimensiones y estilo, y el PDF resultante se lee como un documento coherente. Fuentes mezcladas — capturas más fotos más escaneos — producen páginas de escala dispar; normalizar (redimensionar o recortar los originales primero) produce un resultado mucho más profesional.",
          ],
        },
        {
          heading: "Empaquetar evidencia en local, sin intermediario",
          paragraphs: [
            "El contenido que la gente empaqueta de PNG a PDF es a menudo probatorio o privado: capturas de una transacción fraudulenta, registros de chat para una disputa, escaneos de documentos para verificación, resultados de análisis médicos. Cada una de esas cosas es de las que nunca entregarías a un desconocido — y subir a un conversor hace exactamente eso, antes incluso de que exista el PDF.",
            "Esta herramienta hace el empaquetado por completo en tu navegador: los PNG se leen en local, se incrustan sin pérdidas en objetos de página PDF, y el documento terminado lo guarda tu dispositivo. Nada se sube en ningún momento, así que las capturas de tu aplicación bancaria nunca existen en ningún servidor, y la operación funciona igual sin conexión a internet.",
            "Hay también un dividendo de calidad: como los datos PNG se incrustan tal cual, el PDF conserva los píxeles exactos que capturaste — importante cuando el contenido es evidencia, donde un artefacto de compresión sobre una fecha o un número de cuenta podría sembrar dudas de autenticidad. Lo que capturaste es precisamente lo que el lector verá.",
          ],
        },
      ],
    },
    pt: {
      name: "PNG para PDF",
      tagline:
        "Converta capturas de tela e imagens PNG em um PDF sem recomprimir — importação em lote, ordem personalizada, processado no seu dispositivo.",
      intro: [
        "Capturas de tela, gráficos e exportações de design geralmente são PNG — e quem recebe costuma pedir PDF. Solte um lote inteiro, ordene com as setas e receba um PDF sem perdas: os dados PNG são embutidos como estão, então o texto das capturas continua nítido.",
        "Escolha páginas no tamanho da imagem para dimensionamento perfeito, ou A4/Carta com margem para imprimir. Tudo é gerado com pdf-lib no seu dispositivo: sem upload e sem apostar na qualidade.",
      ],
      steps: [
        "Solte os arquivos PNG que quer combinar.",
        "Ordene e escolha páginas na imagem ou A4/Carta.",
        "Clique em Criar PDF e baixe.",
      ],
      faqs: [
        {
          q: "A qualidade do PNG é preservada exatamente?",
          a: "Sim. O fluxo PNG é embutido sem alteração, então bordas firmes, textos pequenos e áreas com transparência ficam idênticos aos arquivos de origem.",
        },
        {
          q: "Que tamanho de página escolher para capturas de tela?",
          a: "“Na imagem” mantém cada captura no tamanho nativo em pixels — melhor para leitura na tela. Escolha A4 ou Carta com margem quando o PDF for impresso.",
        },
        {
          q: "Por que meu PDF com PNG ainda é grande?",
          a: "Dados PNG sem perdas são grandes por natureza. Se precisar de um arquivo menor, passe o resultado pelo Comprimir PDF, que troca um pouco de fidelidade por tamanho.",
        },
      ],
      deepDive: [
        {
          heading: "Por que entrada PNG merece tratamento diferente do JPEG",
          paragraphs: [
            "PNG e JPEG parecem semelhantes a um olhar desatento, mas codificam pixels com trocas opostas. PNG é sem perdas: cada pixel é preservado exatamente, o que o torna o formato de prints, diagramas, texto digitalizado e tudo de bordas nítidas. JPEG é com perdas e afinado para fotografias. Embrulhar PNGs num PDF significa portanto lidar com conteúdo que se beneficia de continuar sem perdas — e um conversor que re-encode PNG em JPEG em silêncio joga fora exatamente a propriedade pela qual você escolheu PNG.",
            "Esta ferramenta embute os dados de imagem sem re-compressão destrutiva, então os prints ficam nítidos ao pixel dentro do PDF: o texto do print continua legível em qualquer zoom e as linhas dos diagramas permanecem limpas. O PDF é o contêiner; os pixels sem perdas do PNG viajam dentro intactos.",
            "Um detalhe sutil que vale saber: PNG suporta transparência, páginas PDF não. Um PNG transparente colocado numa página PDF é composto sobre um fundo — branco por convenção. Se o seu print tem transparência que importa (um logo, uma sobreposição), confira a primeira página da saída em vez de dar como certo.",
          ],
        },
        {
          heading: "Prints, digitalizações e montagem em ordem",
          paragraphs: [
            "Os trabalhos mais comuns de PNG para PDF têm forma de documentação: uma sequência de prints formando um tutorial, um relatório de bug com imagens de evidência, certificados ou formulários digitalizados salvos como PNG. Em todos, a ordem das páginas é todo o jogo — um tutorial cujos prints chegam fora de sequência não serve de nada. Nomear os arquivos 01-..., 02-... antes de adicionar deixa a ordem pretendida explícita e sobrevive à ordenação de qualquer seletor de arquivos.",
            "Prints têm dimensões exatas ao pixel que raramente batem com tamanhos de papel, então as páginas de saída costumam ficar no tamanho de cada imagem. Isso é ideal para leitura em tela e arquivamento. Se o destino é impressão, o descompasso importa mais: considere se o texto dos prints é grande o bastante no tamanho impresso, porque encolher um print de 1080p para A4 torna o texto pequeno da interface ilegível.",
            "Para documentos de várias imagens, consistência vence variedade: prints da mesma sessão compartilham dimensões e estilo, e o PDF resultante se lê como um documento coeso. Fontes mistas — prints mais fotos mais digitalizações — produzem páginas de escalas disparatadas; normalizar (redimensionar ou recortar as origens primeiro) produz um resultado bem mais profissional.",
          ],
        },
        {
          heading: "Empacotar evidência localmente, sem intermediário",
          paragraphs: [
            "O conteúdo que as pessoas empacotam de PNG para PDF é frequentemente probatório ou privado: prints de uma transação fraudulenta, registros de conversa para uma disputa, scans de documentos para verificação, resultados de exames. Cada uma dessas coisas é do tipo que você nunca entregaria a um estranho — e enviar a um conversor faz exatamente isso, antes mesmo de o PDF existir.",
            "Esta ferramenta faz o empacotamento inteiramente no seu navegador: os PNGs são lidos localmente, embutidos sem perdas em objetos de página PDF, e o documento pronto é salvo pelo seu dispositivo. Nada é enviado em nenhum momento, então os prints do seu aplicativo bancário nunca existem em nenhum servidor, e a operação funciona igual sem internet.",
            "Há também um dividendo de qualidade: como os dados PNG são embutidos como estão, o PDF preserva os pixels exatos que você capturou — importante quando o conteúdo é evidência, onde um artefato de compressão sobre uma data ou número de conta poderia levantar dúvidas de autenticidade. O que você capturou é precisamente o que o leitor verá.",
          ],
        },
      ],
    },
  },
});
