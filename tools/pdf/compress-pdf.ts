import { PdfCompressEngine } from "../_engines/pdf-engine-compress";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "compress-pdf",
  category: "pdf",
  icon: "sparkle",
  featured: true,
  engine: { component: PdfCompressEngine },
  related: ["merge-pdf", "split-pdf", "jpg-to-pdf", "image-compressor", "pdf-to-jpg", "delete-pdf-pages", "pdf-to-ppt", "ocr-pdf", "rotate-pdf", "pdf-to-text"],
  copy: {
    en: {
      name: "Compress PDF",
      tagline:
        "Shrink heavy PDFs by rasterizing pages at your chosen DPI and JPEG quality — batch support and exact before/after sizes, all offline.",
      intro: [
        "Scans and image-heavy reports are often 10× larger than they need to be. This tool re-renders each page at a resolution you pick (72–150 DPI covers screen reading and most printing) and re-encodes it as tuned JPEG, typically cutting file size by 50–90%.",
        "Process several files at once and see the exact savings per file before downloading. Optional grayscale squeezes black-and-white scans even further. Everything runs on your device — compressed or not, your documents stay put.",
        "Technically the tool rasterizes each page to a canvas, then re-encodes it as JPEG with an encoder quality tuned for documents — text stays legible at 150 DPI while blank areas collapse to almost nothing. Higher quality settings preserve more detail at a larger size, so you can preview the trade-off per file before committing.",
        "Because compression re-renders the pages, it is inherently lossy: the original vector text becomes an image, and the result is meant for sharing and archiving, not further editing. If you need a lossless pass, keep your source file — this tool never modifies it, and the page dimensions and page count are preserved exactly."
      ],
      steps: [
        "Drop one or more PDF files (batch is welcome).",
        "Pick the DPI and JPEG quality, or enable grayscale.",
        "Click Compress and compare the before/after sizes, then download.",
      ],
      faqs: [
        {
          q: "Will my PDF still have selectable text after compression?",
          a: "No — this method rasterizes pages into images, so text becomes pixels. It is the trade-off for large size reductions. If you need searchable text, keep the original and share the compressed copy only where size matters.",
        },
        {
          q: "Which settings should I choose?",
          a: "96 DPI at ~60% quality is a good default for email and web. Use 150 DPI when the PDF will be printed; 72 DPI with grayscale is aggressive but fine for pure-text archives.",
        },
        {
          q: "What if the file barely shrinks?",
          a: "Very sparse text-only PDFs are already efficient and may not compress — the table will tell you honestly. Lower the DPI or quality and try again, or accept that the original was already lean.",
        },
      ],
      deepDive: [
        {
          heading: "Lossy vs. lossless: what compression actually does to a PDF",
          paragraphs: [
            "A PDF is not a picture of pages — it is a program that describes them. Text is stored as glyphs and coordinates, vector graphics as drawing commands, and images as embedded compressed bitmaps. That structure is why a one-page text PDF can weigh only a few kilobytes, and why the same page rasterized at 150 DPI can weigh a hundred times more. When a PDF is heavy, the weight almost always lives in embedded images: photos, logos, and above all scans, where every page is one huge bitmap.",
            "This tool takes the deliberate trade-off of rasterizing: each page is re-rendered at the DPI you pick and re-encoded as JPEG. That is lossy compression — the original selectable text becomes pixels — and it should be said plainly, because many tools hide it. What you get in exchange is predictability: a scan that was 40 MB as a poorly-compressed bitmap becomes a few hundred kilobytes of well-tuned JPEG, and at 150 DPI printed output is still visually indistinguishable for most documents.",
            "There is no truly lossless shortcut for a scan-heavy PDF, because the source data is already pixels. For text-and-vector PDFs, lossless tricks (removing duplicate objects, recompressing streams) exist but typically save only a few percent, which is why this tool reports honestly when a file barely shrinks: if the pages are already lean, there is nothing to squeeze without going lossy.",
          ],
        },
        {
          heading: "Choosing DPI and quality: a decision table",
          paragraphs: [
            "DPI (dots per inch) decides how many pixels each page is rendered with; JPEG quality decides how aggressively those pixels are compressed. The two multiply: a US-letter page at 72 DPI is about 612×792 pixels, at 150 DPI about 1275×1650 — roughly four times the pixel count. For screen reading, 72–96 DPI is ample, because a typical laptop displays a PDF page at around that effective resolution anyway. For printing, 150 DPI is the practical floor for readable body text; 300 DPI only matters for photos or fine print you intend to blow up.",
            "JPEG quality matters less than people assume between 60 and 80 — that range is usually the sweet spot where artifacts are invisible in documents. Below ~50, JPEG's blocky artifacts start to smear character edges, and grayish halos appear around letters. Grayscale is the quiet third lever: a black-and-white scan stored in color wastes two-thirds of its bits, so switching to gray alone often cuts size by a third or more with zero visible difference.",
            "The workflow that works: compress one representative file first, open the result at 100% zoom, and check the smallest text you care about. If it reads cleanly, apply those settings to the whole batch. The before/after table shows per-file savings, so outliers (a file that barely shrank) are visible at a glance rather than hidden in an average.",
          ],
        },
        {
          heading: "Why local processing matters for documents",
          paragraphs: [
            "A PDF is a container, and unlike an image it routinely carries more than its visible content: form field values, annotations, embedded fonts, sometimes attachments and metadata that name authors, software versions and revision history. Uploading such a file to a compression service means handing over all of it — most people never audit what else is inside before they click upload. Contracts, medical records, payroll documents and scanned IDs are exactly the files that get compressed most often, and exactly the files least worth uploading.",
            "This tool runs entirely in your browser: the file is read into memory on your device, re-rendered by canvas and re-encoded by JavaScript, and never transmitted anywhere. There is no server-side queue, no retention window to trust, no deletion policy to verify. You can disconnect from the network mid-compression and it will still finish.",
            "Practically, this also changes the workflow. Because nothing is uploaded, there is no upload wait and no size cap imposed by a transfer limit — a 200 MB scan batch compresses just as smoothly as a 2 MB one, limited only by your machine's memory. The compressed file is written by your own browser's download mechanism, so it lands in your Downloads folder like any file you saved yourself.",
          ],
        },
      ],
    },
    zh: {
      name: "压缩 PDF",
      tagline: "按自选 DPI 和 JPEG 质量把页面重采样压缩 PDF——支持批量,精确显示压缩前后大小,全程离线运行。",
      intro: [
        "扫描件和图片型报告常常比实际需要大 10 倍。本工具按你选择的分辨率(72–150 DPI 覆盖屏幕阅读和大部分打印)重新渲染每页,再以调好的 JPEG 编码,通常能把体积压掉 50%–90%。",
        "支持一次处理多个文件,下载前就能看到每个文件的确切压缩效果。可选灰度进一步压缩黑白扫描件。所有处理都在本地进行,无论压不压缩,文档都不会离开你的设备。",
      ],
      steps: [
        "拖入一个或多个 PDF 文件(支持批量)。",
        "选择 DPI 和 JPEG 质量,或开启灰度。",
        "点击“开始压缩”,对比前后大小后下载。",
      ],
      faqs: [
        {
          q: "压缩后文字还能选中吗?",
          a: "不能——这种方式会把页面栅格化成图片,文字变成像素。这是大幅减体积的代价。如需可搜索文本,请保留原文件,只在在意体积的场合分享压缩版。",
        },
        {
          q: "参数应该怎么选?",
          a: "邮件和网页用途推荐 96 DPI + 约 60% 质量;要打印就用 150 DPI;纯文字存档可以用 72 DPI + 灰度,压缩最狠。",
        },
        {
          q: "文件几乎没变小怎么办?",
          a: "文字为主的 PDF 本身就很紧凑,可能压不动——表格会如实显示。可以降低 DPI 或质量再试,或者接受原文件已经足够小。",
        },
      ],
      deepDive: [
        {
          heading: "有损与无损:压缩到底对 PDF 做了什么",
          paragraphs: [
            "PDF 不是页面的图片,而是一段描述页面的程序:文字以字形和坐标存储,图形以绘图指令存储,图片以嵌入的压缩位图存储。正因如此,一页纯文本 PDF 可能只有几 KB,而同一页栅格化到 150 DPI 后可能大上百倍。PDF 变重,重量几乎总在嵌入图片里——照片、Logo,尤其是扫描件,每一页就是一张巨大的位图。",
            "本工具选择的是栅格化这条路线:按你指定的 DPI 重新渲染每一页,再编码为 JPEG。这是有损压缩——原来可选中复制的文字变成了像素——这一点明说不藏着,因为很多工具会回避。换来的是可预期的效果:一个 40 MB 的低效位图扫描件,能变成几百 KB 的调优 JPEG,而 150 DPI 下的打印观感对多数文档来说肉眼难辨差别。",
            "扫描件为主的 PDF 没有真正的无损捷径,因为源数据本来就是像素。纯文字加矢量的 PDF 可以做无损优化(去重对象、重压数据流),但通常只能省几个百分点——所以工具会在文件几乎没变小时如实告诉你:页面本身已经很精简,不转有损就没得压。",
          ],
        },
        {
          heading: "DPI 与质量怎么选:一张决策表",
          paragraphs: [
            "DPI 决定每页渲染出多少像素,JPEG 质量决定这些像素被压得多狠,两者相乘。一页 Letter 纸在 72 DPI 下约 612×792 像素,150 DPI 下约 1275×1650——像素量差四倍。屏幕阅读 72–96 DPI 足够,因为普通笔记本显示 PDF 页面的实际分辨率就在这个量级;要打印,150 DPI 是正文可读的实用底线,300 DPI 只在放大照片或细小字迹时才真正有意义。",
            "JPEG 质量在 60–80 之间的差别常被高估——这一段通常就是甜点区,文档里几乎看不出压缩痕迹。低于约 50 时,JPEG 的块状伪影开始糊掉笔画边缘,字周围出现灰色晕圈。灰度是第三个安静的开关:黑白扫描件按彩色存储浪费了三分之二的比特,只切灰度往往就能再省三分之一以上,而且肉眼零差别。",
            "可行的流程是:先压一个有代表性的文件,100% 缩放打开结果,检查你在意的最小字号是否清晰;清晰就把这组参数用到整批。前后对照表逐文件显示节省比例,哪些文件压不动一目了然,不会藏在平均值里。",
          ],
        },
        {
          heading: "文档类文件为什么必须本地处理",
          paragraphs: [
            "PDF 是个容器,和图片不同,它常常带着比可见内容更多的东西:表单字段值、批注、嵌入字体,有时还有附件和元数据——作者名、软件版本、修订历史。把这样的文件上传给压缩服务,等于把这些一并交出去,而多数人点上传前从不清点里面还有什么。合同、病历、工资单、扫描证件恰好是最常被压缩的文件,也恰好最不该上传的文件。",
            "本工具完全在浏览器里运行:文件读入本机内存,由 canvas 渲染、JavaScript 编码,全程不向任何地方传输。没有服务器队列,没有需要你信任的留存期,也没有需要核实的删除政策。压缩中途断网,它照样能跑完。",
            "实际使用体验也因此不同:不上传就没有上传等待,也没有传输上限强加的体积门槛——200 MB 的扫描件批次和 2 MB 的文件一样顺畅,瓶颈只有你机器的内存。压缩结果由你自己的浏览器下载机制写出,像你手动保存的任何文件一样落在下载文件夹里。",
          ],
        },
      ],
    },
    ja: {
      name: "PDF 圧縮",
      tagline: "選択した DPI と JPEG 品質でページを再レンダリングして PDF を軽量化。一括処理と圧縮前後の正確なサイズ表示、完全オフライン。",
      intro: [
        "スキャンや画像中心の資料は、必要なサイズの 10 倍を超えることがよくあります。このツールは各ページを指定解像度(72〜150 DPI で画面表示から印刷まで対応)で再描画し、JPEG に再エンコードして、一般的に 50〜90% の容量削減を実現します。",
        "複数ファイルを一度に処理し、ダウンロード前に各ファイルの削減結果を正確に確認できます。グレースケール化すると白黒スキャンはさらに小さくなります。処理はすべて端末内で行われ、文書はどこにも送られません。",
      ],
      steps: [
        "PDF ファイルを 1 つ以上ドロップします(一括処理OK)。",
        "DPI と JPEG 品質を選び、必要ならグレースケールを有効化します。",
        "「圧縮する」をクリックし、前後のサイズを比較してダウンロードします。",
      ],
      faqs: [
        {
          q: "圧縮後もテキストは選択できますか?",
          a: "できません。この方式はページを画像化するため、テキストはピクセルになります。大きな容量削減とのトレードオフです。検索可能なテキストが必要な場面では元ファイルを使ってください。",
        },
        {
          q: "どの設定を選ぶべきですか?",
          a: "メールや Web なら 96 DPI・品質約 60% が無難です。印刷するなら 150 DPI、テキスト中心のアーカイブなら 72 DPI+グレースケールが最も軽くなります。",
        },
        {
          q: "ほとんど小さくならない場合は?",
          a: "テキストだけの PDF はすでに効率的で、圧縮の余地が少ないことがあります。表には正直な結果が表示されます。DPI や品質を下げて再試行するか、元ファイルが十分軽いと判断してください。",
        },
      ],
      deepDive: [
        {
          heading: "非可逆と可逆:圧縮が PDF に何をするか",
          paragraphs: [
            "PDF はページの画像ではなく、ページを記述するプログラムです。テキストは字形と座標、図形は描画命令、画像は埋め込み圧縮ビットマップとして格納されています。だから純テキストの 1 ページが数 KB に収まる一方、同じページを 150 DPI でラスタライズすると百倍にもなり得ます。PDF が重い原因はほぼ常に埋め込み画像——写真、ロゴ、そしてスキャン。スキャンは各ページが巨大なビットマップそのものです。",
            "このツールはラスタライズという割り切りを選びます。各ページを指定 DPI で再描画し、JPEG に再エンコードします。これは非可逆圧縮で、選択できたテキストはピクセルになります。多くのツールが曖昧にする点を、ここでは明示します。引き換えに得られるのは予測可能性です。圧縮効率の悪いビットマップの 40 MB スキャンが、調整済み JPEG 数百 KB になり、150 DPI での印刷結果は多くの文書で見分けがつきません。",
            "スキャン中心の PDF に真の可逆圧縮の近道はありません。元データが既にピクセルだからです。テキストとベクタ中心の PDF なら重複オブジェクト除去やストリーム再圧縮といった可逆手法がありますが、削減は数パーセント程度。だからほとんど縮まないファイルについては、正直にその旨を表示します。ページが既に軽ければ、非可逆にしない限り余地はないのです。",
          ],
        },
        {
          heading: "DPI と品質の選び方:判断表",
          paragraphs: [
            "DPI は各ページを何ピクセルで描くか、JPEG 品質はそのピクセルをどれだけ圧縮するかを決め、両者は掛け算の関係です。レターサイズ 1 ページは 72 DPI で約 612×792 ピクセル、150 DPI で約 1275×1650——ピクセル数は約 4 倍です。画面表示なら 72〜96 DPI で十分です。一般的なノート PC が PDF を表示する実効解像度がその程度だからです。印刷するなら 150 DPI が本文可読の実用下限で、300 DPI が本当に必要になるのは写真や拡大する細かい文字だけです。",
            "JPEG 品質は 60〜80 の差が思ったより小さく、この帯が文書ではほぼ見た目に影響しないスイートスポットです。50 を下回るとブロックノイズが画数の縁をにじませ、文字の周りに灰色のハロが出始めます。グレースケールは静かな第三のレバーです。白黒スキャンをカラーのまま保持するのはビットの 3 分の 2 の無駄で、グレーへ切り替えるだけで 3 分の 1 以上削減でき、見た目の差はゼロです。",
            "実用的な手順はこうです。まず代表的なファイルを 1 つ圧縮し、結果を 100% 表示で開いて、気になる最小の文字が読めるか確認する。読めればその設定を一括に適用します。前後の表はファイルごとの削減率を出すので、ほとんど縮まない外れ値も平均に埋もれず見えます。",
          ],
        },
        {
          heading: "文書をローカル処理する意味",
          paragraphs: [
            "PDF はコンテナであり、画像と違って見えている内容以上を抱えていることが普通です。フォームの入力値、注釈、埋め込みフォント、ときには添付ファイルや、作者名・ソフト名・改訂履歴を含むメタデータ。こうしたファイルを圧縮サービスにアップロードすることは、その全部を手渡すことです。ほとんどの人はアップロード前に中身を点検しません。契約書、診療記録、給与明細、スキャンした身分証は、最も圧縮されやすい文書であり、最もアップロードすべきでない文書でもあります。",
            "このツールは完全にブラウザ内で動きます。ファイルは端末のメモリに読み込まれ、canvas で描画され、JavaScript でエンコードされ、どこにも送信されません。サーバー側の待ち行列も、信頼すべき保持期間も、確認すべき削除ポリシーもありません。圧縮の途中で回線を切っても処理は完走します。",
            "実用面でも違いが出ます。アップロードがないので待ち時間も転送容量の上限もなく、200 MB のスキャン束も 2 MB のファイルと同じように処理できます。制約は端末のメモリだけです。結果はブラウザ自身のダウンロード機構が書き出すので、自分で保存したファイルと同じくダウンロードフォルダに届きます。",
          ],
        },
      ],
    },
    es: {
      name: "Comprimir PDF",
      tagline:
        "Reduce PDFs pesados rasterizando las páginas al DPI y la calidad JPEG que elijas: procesamiento por lotes y tamaños exactos antes y después, sin conexión.",
      intro: [
        "Los escaneos y los informes con muchas imágenes suelen pesar 10 veces más de lo necesario. Esta herramienta vuelve a dibujar cada página a la resolución que elijas (72–150 DPI cubren pantalla y la mayoría de impresiones) y la re-codifica como JPEG, recortando normalmente entre el 50% y el 90% del tamaño.",
        "Procesa varios archivos a la vez y comprueba el ahorro exacto por archivo antes de descargar. La escala de grises opcional reduce aún más los escaneos en blanco y negro. Todo ocurre en tu dispositivo: comprimido o no, tus documentos no se mueven de ahí.",
      ],
      steps: [
        "Suelta uno o más archivos PDF (los lotes son bienvenidos).",
        "Elige el DPI y la calidad JPEG, o activa la escala de grises.",
        "Pulsa Comprimir, compara los tamaños y descarga.",
      ],
      faqs: [
        {
          q: "¿El PDF seguirá teniendo texto seleccionable?",
          a: "No: este método rasteriza las páginas a imágenes, así que el texto se convierte en píxeles. Es el precio de una gran reducción. Si necesitas texto buscable, conserva el original y comparte la copia comprimida solo donde importe el tamaño.",
        },
        {
          q: "¿Qué ajustes conviene elegir?",
          a: "96 DPI con ~60% de calidad es un buen punto de partida para correo y web. Usa 150 DPI si se va a imprimir; 72 DPI con escala de grises es agresivo pero suficiente para archivos de solo texto.",
        },
        {
          q: "¿Y si el archivo apenas se reduce?",
          a: "Los PDF de texto puro ya son eficientes y pueden no comprimir: la tabla te lo dirá con honestidad. Baja el DPI o la calidad e inténtalo de nuevo, o acepta que el original ya era ligero.",
        },
      ],
      deepDive: [
        {
          heading: "Con pérdida o sin ella: qué hace realmente la compresión a un PDF",
          paragraphs: [
            "Un PDF no es una imagen de páginas: es un programa que las describe. El texto se guarda como glifos y coordenadas, los gráficos como comandos de dibujo y las imágenes como mapas de bits comprimidos incrustados. Por eso un PDF de una página de texto puede pesar solo unos kilobytes, y por eso la misma página rasterizada a 150 DPI puede pesar cien veces más. Cuando un PDF pesa mucho, ese peso casi siempre vive en las imágenes incrustadas: fotos, logos y, sobre todo, escaneos, donde cada página es un mapa de bits enorme.",
            "Esta herramienta asume de forma deliberada la vía del rasterizado: cada página se vuelve a dibujar al DPI que elijas y se re-codifica como JPEG. Es compresión con pérdida — el texto seleccionable se convierte en píxeles — y se dice abiertamente, porque muchas herramientas lo ocultan. Lo que se gana a cambio es previsibilidad: un escaneo de 40 MB guardado como un bitmap mal comprimido pasa a unos cientos de kilobytes de JPEG bien ajustado, y a 150 DPI la impresión es visualmente indistinguible para la mayoría de los documentos.",
            "Para un PDF lleno de escaneos no hay un atajo realmente sin pérdidas, porque los datos de origen ya son píxeles. En PDFs de texto y vectores existen trucos sin pérdidas (quitar objetos duplicados, recomprimir flujos) pero suelen ahorrar solo unos pocos puntos porcentuales; por eso la herramienta avisa con honestidad cuando un archivo apenas se reduce: si las páginas ya son ligeras, no hay nada que apretar sin pasar a pérdidas.",
          ],
        },
        {
          heading: "Elegir DPI y calidad: una tabla de decisión",
          paragraphs: [
            "El DPI decide cuántos píxeles se dibujan por página; la calidad JPEG decide cuán agresivamente se comprimen esos píxeles. Los dos se multiplican: una página carta a 72 DPI ronda los 612×792 píxeles y a 150 DPI los 1275×1650 — unas cuatro veces más. Para leer en pantalla bastan 72–96 DPI, porque un portátil típico ya muestra una página de PDF a esa resolución efectiva. Para imprimir, 150 DPI es el suelo práctico para texto legible; los 300 DPI solo importan para fotos o letra fina que pienses ampliar.",
            "La calidad JPEG importa menos de lo que se cree entre 60 y 80 — esa franja suele ser el punto dulce donde los artefactos no se ven en documentos. Por debajo de ~50, los artefactos en bloque empiezan a difuminar los bordes de los caracteres y aparecen halos grises alrededor de las letras. La escala de grises es la tercera palanca silenciosa: un escaneo en blanco y negro guardado en color desperdicia dos tercios de sus bits, así que cambiar a gris solo suele recortar un tercio o más sin ninguna diferencia visible.",
            "El flujo que funciona: comprime primero un archivo representativo, abre el resultado al 100% y comprueba el texto más pequeño que te importe. Si se lee bien, aplica esos ajustes a todo el lote. La tabla antes/después muestra el ahorro por archivo, así que los valores atípicos (los que casi no se reducen) se ven de un vistazo en vez de esconderse en una media.",
          ],
        },
        {
          heading: "Por qué el procesamiento local importa con documentos",
          paragraphs: [
            "Un PDF es un contenedor y, a diferencia de una imagen, suele llevar más de lo que se ve: valores de campos de formulario, anotaciones, fuentes incrustadas y a veces adjuntos y metadatos que revelan autores, versiones de software e historial de revisiones. Subir ese archivo a un servicio de compresión significa entregar todo eso, y la mayoría de la gente nunca audita qué hay dentro antes de pulsar subir. Contratos, historiales médicos, nóminas e identificaciones escaneadas son justo los archivos que más se comprimen y justo los que menos vale la pena subir.",
            "Esta herramienta corre por completo en tu navegador: el archivo se lee en la memoria de tu dispositivo, se vuelve a dibujar con canvas y se re-codifica con JavaScript, sin transmitirse a ninguna parte. No hay cola en el servidor, ni ventana de retención que confiar, ni política de borrado que verificar. Puedes desconectar la red a mitad de la compresión y terminará igual.",
            "En la práctica esto también cambia el flujo: al no haber subida, no hay espera ni límite de tamaño impuesto por la transferencia. Un lote de escaneos de 200 MB se procesa con la misma fluidez que uno de 2 MB; el límite es la memoria de tu máquina. El resultado lo escribe el propio mecanismo de descargas del navegador, así que aterriza en tu carpeta de descargas como cualquier archivo que hayas guardado tú.",
          ],
        },
      ],
    },
    pt: {
      name: "Comprimir PDF",
      tagline:
        "Reduza PDFs pesados rasterizando as páginas no DPI e na qualidade JPEG escolhidos — lote, tamanhos exatos antes e depois, tudo offline.",
      intro: [
        "Digitalizações e relatórios cheios de imagens costumam ser 10 vezes maiores do que precisam ser. Esta ferramenta redesenha cada página na resolução escolhida (72–150 DPI cobrem tela e a maioria das impressões) e recodifica como JPEG, normalmente cortando 50–90% do tamanho.",
        "Processe vários arquivos de uma vez e veja a economia exata por arquivo antes de baixar. O modo tons de cinza comprime ainda mais digitalizações preto e branco. Tudo roda no seu dispositivo — comprimido ou não, seus documentos não saem do lugar.",
      ],
      steps: [
        "Solte um ou mais arquivos PDF (lotes são bem-vindos).",
        "Escolha o DPI e a qualidade JPEG, ou ative tons de cinza.",
        "Clique em Comprimir, compare os tamanhos e baixe.",
      ],
      faqs: [
        {
          q: "O PDF ainda terá texto selecionável depois?",
          a: "Não — este método rasteriza as páginas em imagens, então o texto vira pixels. É o preço de uma redução grande. Se precisar de texto pesquisável, guarde o original e compartilhe a cópia comprimida só onde o tamanho importa.",
        },
        {
          q: "Quais configurações escolher?",
          a: "96 DPI com ~60% de qualidade serve bem para e-mail e web. Use 150 DPI se for imprimir; 72 DPI em tons de cinza é agressivo, mas ok para acervos só de texto.",
        },
        {
          q: "E se o arquivo quase não diminuir?",
          a: "PDFs só de texto já são eficientes e podem não comprimir — a tabela mostra isso com honestidade. Reduza o DPI ou a qualidade e tente de novo, ou aceite que o original já era enxuto.",
        },
      ],
      deepDive: [
        {
          heading: "Com perdas ou sem: o que a compressão realmente faz a um PDF",
          paragraphs: [
            "Um PDF não é uma imagem das páginas — é um programa que as descreve. O texto é guardado como glifos e coordenadas, os gráficos como comandos de desenho e as imagens como bitmaps comprimidos embutidos. É por isso que um PDF de uma página de texto pode pesar poucos kilobytes e a mesma página rasterizada a 150 DPI pode pesar cem vezes mais. Quando um PDF fica pesado, o peso quase sempre mora nas imagens embutidas: fotos, logotipos e, sobretudo, digitalizações, em que cada página é um bitmap enorme.",
            "Esta ferramenta assume de propósito o caminho da rasterização: cada página é redesenhada no DPI que você escolher e recodificada como JPEG. É compressão com perdas — o texto selecionável vira pixels — e se diz isso abertamente, porque muitas ferramentas escondem. O que se ganha em troca é previsibilidade: uma digitalização de 40 MB guardada como bitmap mal comprimido vira alguns centenas de kilobytes de JPEG bem ajustado, e a 150 DPI a impressão fica visualmente indistinguível na maioria dos documentos.",
            "Para um PDF cheio de digitalizações não existe atalho realmente sem perdas, porque os dados de origem já são pixels. Em PDFs de texto e vetores há truques sem perdas (remover objetos duplicados, recomprimir fluxos), mas costumam economizar só alguns pontos percentuais; por isso a ferramenta avisa com honestidade quando um arquivo quase não diminui: se as páginas já são leves, não há nada a apertar sem entrar nas perdas.",
          ],
        },
        {
          heading: "Escolher DPI e qualidade: uma tabela de decisão",
          paragraphs: [
            "O DPI decide quantos pixels cada página recebe; a qualidade JPEG decide quão agressivamente esses pixels são comprimidos. Os dois se multiplicam: uma página carta a 72 DPI tem cerca de 612×792 pixels e a 150 DPI cerca de 1275×1650 — quase quatro vezes mais. Para ler na tela, 72–96 DPI bastam, porque um notebook típico já mostra uma página de PDF nessa resolução efetiva. Para imprimir, 150 DPI é o piso prático de texto legível; 300 DPI só importa para fotos ou letra fina que você pretenda ampliar.",
            "A qualidade JPEG pesa menos do que se imagina entre 60 e 80 — essa faixa costuma ser o ponto doce em que artefatos não aparecem em documentos. Abaixo de ~50, os artefatos em bloco começam a borrar as bordas dos caracteres e halos cinzas surgem ao redor das letras. Os tons de cinza são a terceira alavanca silenciosa: uma digitalização preto e branco guardada em cor desperdiça dois terços dos bits, então mudar para cinza sozinho costuma cortar um terço ou mais sem diferença visível.",
            "O fluxo que funciona: comprima primeiro um arquivo representativo, abra o resultado a 100% e confira o menor texto que importa. Se lê bem, aplique essas configurações ao lote inteiro. A tabela antes/depois mostra a economia por arquivo, então os casos fora da curva (os que quase não encolhem) aparecem de relance em vez de se esconder numa média.",
          ],
        },
        {
          heading: "Por que o processamento local importa com documentos",
          paragraphs: [
            "Um PDF é um contêiner e, diferente de uma imagem, costuma carregar mais do que se vê: valores de campos de formulário, anotações, fontes embutidas e às vezes anexos e metadados que revelam autores, versões de software e histórico de revisões. Enviar esse arquivo a um serviço de compressão significa entregar tudo isso — e a maioria das pessoas nunca audita o que há dentro antes de clicar em enviar. Contratos, prontuários, folhas de pagamento e documentos de identidade digitalizados são exatamente os arquivos mais comprimidos e exatamente os que menos valem ser enviados.",
            "Esta ferramenta roda inteiramente no navegador: o arquivo é lido na memória do seu dispositivo, redesenhado com canvas e recodificado com JavaScript, sem ser transmitido a lugar nenhum. Não há fila no servidor, nem janela de retenção para confiar, nem política de exclusão para verificar. Você pode desconectar a rede no meio da compressão e ela terminará do mesmo jeito.",
            "Na prática isso também muda o fluxo: sem envio, não há espera nem limite de tamanho imposto pela transferência. Um lote de digitalizações de 200 MB processa com a mesma fluidez de um de 2 MB; o limite é a memória da sua máquina. O resultado é escrito pelo próprio mecanismo de download do navegador, então cai na sua pasta de downloads como qualquer arquivo que você mesmo salvou.",
          ],
        },
      ],
    },
  },
});
