import { PdfExtractImagesEngine } from "../_engines/pdf-engine-extract-images";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "extract-images-pdf",
  category: "pdf",
  icon: "image",
  engine: { component: PdfExtractImagesEngine },
  related: ["pdf-to-jpg", "pdf-to-png", "compress-pdf", "merge-pdf", "redact-pdf", "split-pdf", "rotate-pdf", "delete-pdf-pages"],
  copy: {
    en: {
      name: "Extract Images from PDF",
      tagline: "Recover the actual embedded photos and graphics at their stored resolution — full quality, no page screenshots, everything local.",
      intro: [
        "PDFs carry photos as embedded bitmaps: scanned signatures, product shots, charts pasted from other tools. This tool walks the file's internals and hands you those original images at full stored resolution — exactly the bytes that went into the PDF, not downsized page snapshots.",
        "The difference from page-to-image converters is the difference between the negative and the print. A page render fixes images at whatever size they appear on the page; extraction gives you the source bitmap, which is often much larger and always free of surrounding content.",
        "Vector graphics, text and fonts are not bitmaps and are correctly skipped, so what you get is exactly the photographic material. Files with no embedded images are reported honestly instead of returning fake screenshots. Everything runs in your browser via pdf.js — the PDF never leaves your device.",
      ],
      steps: [
        "Drop the PDF; scanning runs page by page and shows a progress bar.",
        "Browse the recovered images as a thumbnail grid with page numbers and dimensions.",
        "Click a thumbnail to download it, or grab everything at once as a ZIP.",
      ],
      faqs: [
        {
          q: "How is this different from PDF-to-JPG?",
          a: "PDF-to-JPG renders whole pages — layout, text and all — at a chosen resolution. This tool pulls out the original embedded bitmaps themselves, at their full stored resolution, with no page furniture around them. Use the converter for page captures, this one for source images.",
        },
        {
          q: "Why do some PDFs return nothing?",
          a: "Because they contain no embedded bitmaps. Documents typeset from vectors and text — contracts, typeset reports — have no photographs inside, and this tool says so honestly rather than fabricating screenshots. Scanned PDFs are the opposite extreme: every page is one big image, and those all appear here.",
        },
        {
          q: "Are the images re-compressed?",
          a: "PNG for smaller graphics, JPEG at 92% quality for larger photos — a balance that keeps extracted files practical without visible loss. The bitmap data itself comes straight from the PDF's stored objects; only the container format changes to something your tools can open.",
        },
        {
          q: "Does the file get uploaded?",
          a: "No. The scan runs through pdf.js entirely in your browser; the PDF and the extracted images never leave your device. That matters here more than usual, because the images inside a PDF are frequently the most sensitive part of it — ID photos, scans, screenshots of internal systems.",
        },
      ],
      deepDive: [
        {
          heading: "What lives inside a PDF's image objects",
          paragraphs: [
            "When you paste a photo into a document and export it as PDF, the exporter does not screenshot anything — it stores the bitmap as a standalone object (usually JPEG or Flate-encoded) and the page content stream merely draws that object at a position and size. The full-resolution original rides along inside the file forever, no matter how small it looks on the page.",
            "That is why extraction beats page rendering for source material: a 4000×3000 photo placed in a 2×2 cm corner is still 4000×3000 inside the file. Page renders would hand you a few hundred pixels of it; object extraction hands you the negative.",
            "This tool walks each page's drawing commands, finds every paint-image operation, and pulls the referenced object's bytes — then dedupes by content signature, because logos and backgrounds are typically drawn once and reused across pages, and you want one copy, not thirty.",
          ],
        },
        {
          heading: "The edge cases the honest version has to handle",
          paragraphs: [
            "Image objects in real PDFs come in several encodings — plain JPEG (DCTDecode), Flate-compressed raw rows, and various color models from grayscale to CMYK with masks. A robust extractor normalizes all of them to RGBA before showing anything, which is why a result grid here never shows the pink- or inverted-looking images that naive byte-dump tools produce.",
            "Decorative tiles and soft masks are also image objects, usually 16×16 or smaller — extracting them would bury the real photos in noise, so they are filtered by size. Duplicate hits (the same logo on every page) collapse to one entry via pixel signatures. Inline images — rare, but legal — are handled too rather than silently skipped.",
            "The honest boundary: this is not OCR and not a page renderer. If a page is a single scanned bitmap, you get that one bitmap per page at scan resolution; if a document is pure vector, you get an empty result and a clear statement, not a fabricated screenshot.",
          ],
        },
        {
          heading: "Extraction, privacy and the practical workflow",
          paragraphs: [
            "The images inside a PDF are often its most sensitive cargo: passport scans, ID photos, screenshots of internal dashboards, medical imagery. Running extraction through a random website means uploading exactly those assets to an unknown server. Here the entire scan — operator-list walk, object decode, thumbnail rendering, ZIP assembly — runs in your browser via pdf.js, and the file never leaves the device.",
            "A practical sequence that covers most needs: extract everything first and skim the grid — page numbers in the labels tell you where each image lived. Pull single files by clicking thumbnails; grab the ZIP for the full set. If you then need the text around those images, the PDF-to-text tool operates on the same local-first model.",
            "And when the images you recovered are themselves sensitive — say you extracted ID photos from a form someone sent — remember the other direction too: the redaction tool destroys content for real before a PDF leaves your hands. Extraction and redaction are two ends of the same discipline: know what your PDFs carry.",
          ],
        },
      ],
    },
    zh: {
      name: "提取 PDF 图片",
      tagline: "按存储分辨率恢复 PDF 里的原始照片与图形——完整画质,不是页面截图,全程本地。",
      intro: [
        "PDF 里的照片以内嵌位图存在:扫描签名、产品图、从别的工具粘贴的图表。本工具深入文件内部,把那些原始图像按存储分辨率完整取出来——就是当初放进 PDF 的那些字节,而不是缩水版的页面快照。",
        "这和“页面转图片”的区别,是底片和照片的区别。页面渲染把图像固定在它在页面上出现的尺寸;提取拿到的是源位图,通常大得多,而且周围没有别的内容。",
        "矢量图形、文字、字体不是位图,会被正确跳过——你拿到的就是图片素材本身。没有内嵌图像的文件会如实报告,而不是返回假截图。一切由 pdf.js 在浏览器内完成,PDF 不离开你的设备。",
      ],
      steps: [
        "拖入 PDF;逐页扫描并显示进度条。",
        "在缩略图网格里浏览恢复出的图片,带页码和尺寸标注。",
        "点缩略图单独下载,或一键把全部打包成 ZIP。",
      ],
      faqs: [
        {
          q: "这和 PDF 转 JPG 有什么区别?",
          a: "PDF 转 JPG 渲染整页——版式、文字全都在,按你选的分辨率。本工具取出的是内嵌的原始位图本身,保持完整存储分辨率,周围没有任何页面元素。要页面快照用转图,要源图用这个。",
        },
        {
          q: "为什么有些 PDF 什么都没提取到?",
          a: "因为它没有内嵌位图。纯文字排版文件——合同、排版报告——里面本来就没有照片,工具会如实说明,而不是伪造截图。扫描版 PDF 是另一个极端:每页就是一张大图,全都会出现在这里。",
        },
        {
          q: "图片会被重新压缩吗?",
          a: "小图用 PNG,较大的照片用 92% 质量的 JPEG——在不产生可见损失的前提下让文件体积可用。位图数据本身直接来自 PDF 的存储对象,只是换了一个你的工具能打开的容器格式。",
        },
        {
          q: "文件会被上传吗?",
          a: "不会。扫描全程由 pdf.js 在浏览器内完成,PDF 和提取出的图片都不离开设备。这一点在这里格外重要——PDF 里的图片往往正是文件最敏感的部分:证件照、扫描件、内部系统截图。",
        },
      ],
      deepDive: [
        {
          heading: "PDF 的图像对象里装着什么",
          paragraphs: [
            "把照片贴进文档再导出成 PDF 时,导出器不会截图——它把位图作为独立对象存储(通常是 JPEG 或 Flate 编码),页面内容流只是在某个位置按某个尺寸“画”一下这个对象。完整分辨率的原图从此一直躺在文件里,不管它在页面上显示得多小。",
            "这就是提取优于页面渲染的原因:一张 4000×3000 的照片被摆在 2×2 厘米的角落里,文件内它依然是 4000×3000。页面渲染只能给你几百像素;对象提取给你的是底片。",
            "本工具遍历每页的绘制指令,找到每个画图操作,取出被引用对象的字节——然后按内容签名去重,因为 logo 和背景通常画一次、全文件复用,你要的是一份,不是三十份。",
          ],
        },
        {
          heading: "诚实版本必须处理的边角情况",
          paragraphs: [
            "真实 PDF 里的图像对象有好几种编码——纯 JPEG(DCTDecode)、Flate 压缩的原始行、从灰度到带蒙版的 CMYK 等多种色彩模型。可靠的提取器会先把它们统一转成 RGBA 再展示,这就是为什么这里的缩略图网格不会出现那些字节转储工具产出的偏粉或反色图像。",
            "装饰性小块和软蒙版也是图像对象,通常 16×16 以下——把它们提取出来会把真正的照片淹没在噪音里,所以按尺寸过滤。重复命中(每页同一个 logo)经像素签名合并成一条。内联图像——少见但合法——也被处理,而不是悄悄跳过。",
            "诚实的边界:这不是 OCR 也不是页面渲染器。如果一页就是一张扫描位图,你会按扫描分辨率拿到那一张;如果文档是纯矢量,你会得到空结果和一句明确的说明,而不是伪造的截图。",
          ],
        },
        {
          heading: "提取、隐私与实用工作流",
          paragraphs: [
            "PDF 里的图片往往是最敏感的货物:证件照、身份证扫描、内部后台截图、医学影像。用随机网站跑提取,等于把这些资产上传到未知服务器。这里整个扫描——指令遍历、对象解码、缩略图渲染、ZIP 打包——都在浏览器内由 pdf.js 完成,文件不离开设备。",
            "一个覆盖大多数需求的流程:先全部提取、浏览缩略图网格——标签里的页码告诉你每张图原来在哪页。点缩略图拿单个文件;要全套就抓 ZIP。如果还需要图片周围的文字,PDF 转文本工具同样是本地优先模型。",
            "反过来也一样:如果你提取出的图片本身敏感——比如你从别人发来的表单里提取了证件照——记住红线的另一头:涂黑工具会在 PDF 离开你手之前真正销毁内容。提取和涂黑是同一件事的两端:搞清楚你的 PDF 里装着什么。",
          ],
        },
      ],
    },
    ja: {
      name: "PDF 画像抽出",
      tagline: "PDF 内の埋め込み写真・グラフィックを保存解像度のまま復元——フル品質、ページのスクリーンショットでは不要、完全ローカル。",
      intro: [
        "PDF の写真は埋め込みビットマップとして格納されています:スキャンした署名、製品写真、他ツールから貼ったグラフ。このツールはファイルの内部をたどり、元の画像を保存解像度のまま取り出します——ページに表示されるサイズに縮められたスナップショットではなく、PDF に入れたそのバイトそのものです。",
        "ページ変換との違いは、ネガとプリントの違いです。ページ描画は画像をページ上の見た目のサイズに固定します。オブジェクト抽出はソースのビットマップを渡します。多くの場合それはずっと大きく、周囲の要素もありません。",
        "ベクター図形・テキスト・フォントはビットマップではないため正しくスキップされます。手元に来るのは写真素材そのものです。埋め込み画像のないファイルは偽のスクリーンショットを返さず、正直に報告します。処理はすべて pdf.js によりブラウザ内で完結し、PDF は端末の外に出ません。",
      ],
      steps: [
        "PDF をドロップします。ページごとに走査し、進行状況を表示します。",
        "サムネイルグリッドで復元された画像を閲覧——ページ番号と寸法付き。",
        "サムネイルをクリックして個別にダウンロード、または ZIP で一括取得。",
      ],
      faqs: [
        {
          q: "PDF→JPG との違いは?",
          a: "PDF→JPG はページ全体(レイアウトもテキストも)を選択した解像度で描画します。このツールは内蔵された元のビットマップそのものを、保存解像度のまま、周囲の要素なしで取り出します。ページのキャプチャには変換を、ソース画像にはこちらを。",
        },
        {
          q: "何も見つからない PDF があるのは?",
          a: "埋め込みビットマップがないからです。ベクターとテキストで組まれた文書——契約書、組版レポート——には写真が入っておらず、偽のスクリーンショットを作る代わりに正直に報告します。スキャン PDF はその逆で、各ページが一枚の大きな画像なので、すべてここに現れます。",
        },
        {
          q: "画像は再圧縮されますか?",
          a: "小さいグラフィックは PNG、大きな写真は品質 92% の JPEG——見た目の劣化なしに実用的なサイズへ。ビットマップのデータ自体は PDF の格納オブジェクトから直接来ており、コンテナ形式が変わるだけです。",
        },
        {
          q: "ファイルはアップロードされますか?",
          a: "されません。走査は pdf.js により完全にブラウザ内で実行され、PDF も抽出画像も端末の外に出ません。PDF 内の画像は往々にして最も機密性が高い部分——証明写真、スキャン、社内システムのスクリーンショット——だからこそ重要です。",
        },
      ],
      deepDive: [
        {
          heading: "PDF の画像オブジェクトの中身",
          paragraphs: [
            "写真を文書に貼って PDF に書き出すとき、書き出し器はスクリーンショットを撮りません。ビットマップを独立したオブジェクト(通常 JPEG か Flate 圧縮)として格納し、ページのコンテンツストリームはそのオブジェクトを位置とサイズを指定して「描く」だけです。フル解像度の元画像は、ページ上でどれだけ小さく見えても、永遠にファイルの中を旅します。",
            "だからソース素材にはページ描画より抽出が勝ります。4000×3000 の写真が 2×2 cm の隅に置かれても、ファイル内では 4000×3000 のまま。ページ描画は数百ピクセルしか渡しませんが、オブジェクト抽出はネガを渡します。",
            "このツールは各ページの描画命令をたどり、画像描画操作を見つけ、参照先オブジェクトのバイトを取り出します。その後、内容シグネチャで重複排除——ロゴや背景は一度描いて全ページで再利用されることが多く、必要なのは 1 部であって 30 部ではありません。",
          ],
        },
        {
          heading: "誠実な実装が扱うエッジケース",
          paragraphs: [
            "実在の PDF の画像オブジェクトは複数のエンコーディングを持ちます——素の JPEG(DCTDecode)、Flate 圧縮の生の行、グレースケールからマスク付き CMYK まで。堅牢な抽出器は表示前にすべて RGBA へ正規化します。だからこそ、このツールのサムネイルグリッドには、素朴なバイトダンプツールが出しがちなピンクがかった反転画像は現れません。",
            "装飾タイルやソフトマスクも画像オブジェクトですが、通常 16×16 以下です。これらを抽出すると本物の写真がノイズに埋もれるため、サイズでフィルタします。毎ページ同じロゴ、という重複ヒットはピクセルシグネチャで 1 件にまとまります。インライン画像——稀ですが合法——も黙ってスキップされずに処理されます。",
            "誠実な境界線:これは OCR でもページレンダラでもありません。ページが一枚のスキャンビットマップなら、その 1 枚をスキャン解像度で渡します。文書が純ベクターなら、偽のスクリーンショットではなく空の結果と明確な一言を返します。",
          ],
        },
        {
          heading: "抽出・プライバシー・実務ワークフロー",
          paragraphs: [
            "PDF 内の画像はしばしば最も機密性の高い積荷です:パスポートのスキャン、証明写真、社内ダッシュボードのスクリーンショット、医療画像。見知らぬサイトで抽出を実行することは、まさにその資産を未知のサーバーへアップロードすることを意味します。ここでは、命令走査・オブジェクトデコード・サムネイル描画・ZIP 組み立ての全てが pdf.js によりブラウザ内で走り、ファイルは端末の外に出ません。",
            "大半の需要を覆う実務シーケンス:まず全部抽出してグリッドを流し見——ラベルのページ番号が各画像の居場所を教えます。サムネイルをクリックして単独ファイルを取り、全部なら ZIP を。画像の周囲のテキストも必要なら、PDF→テキストツールが同じローカル優先モデルで動きます。",
            "逆方向も同じです:取り出した画像そのものが機密なら——他人から送られたフォームから証明写真を抽出した、など——黒塗りツールが PDF を手放す前に本当に内容を破壊します。抽出と黒塗りは同じ規律の両端です:自分の PDF に何が入っているかを知ること。",
          ],
        },
      ],
    },
    es: {
      name: "Extraer imágenes de PDF",
      tagline: "Recupere las fotos y gráficos incrustados reales a su resolución almacenada — calidad completa, sin capturas de página, todo local.",
      intro: [
        "Los PDF llevan las fotos como mapas de bits incrustados: firmas escaneadas, fotos de producto, gráficos pegados de otras herramientas. Esta herramienta recorre las interioridades del archivo y le entrega esas imágenes originales a resolución almacenada completa — exactamente los bytes que entraron en el PDF, no instantáneas de página reducidas.",
        "La diferencia con los conversores de página a imagen es la que hay entre el negativo y la copia. Un renderizado de página fija las imágenes al tamaño con que aparecen en ella; la extracción le da el mapa de bits fuente, que suele ser mucho mayor y viene libre de contenido circundante.",
        "Los gráficos vectoriales, el texto y las fuentes no son mapas de bits y se omiten correctamente: lo que recibe es exactamente el material fotográfico. Los archivos sin imágenes incrustadas se informan con honestidad en lugar de devolver capturas falsas. Todo corre en su navegador vía pdf.js — el PDF nunca sale de su dispositivo.",
      ],
      steps: [
        "Suelte el PDF; el escaneo corre página a página con una barra de progreso.",
        "Explore las imágenes recuperadas en una cuadrícula de miniaturas con páginas y dimensiones.",
        "Haga clic en una miniatura para descargarla, o llévelo todo de una vez en un ZIP.",
      ],
      faqs: [
        {
          q: "¿En qué se diferencia de PDF a JPG?",
          a: "PDF a JPG renderiza páginas completas — maquetación, texto y todo — a la resolución elegida. Esta herramienta saca los mapas de bits incrustados originales, a su resolución almacenada completa, sin el mobiliario de la página alrededor. Para capturas de página, el conversor; para imágenes fuente, este.",
        },
        {
          q: "¿Por qué algunos PDF no devuelven nada?",
          a: "Porque no contienen mapas de bits incrustados. Los documentos compuestos con vectores y texto — contratos, informes tipografiados — no llevan fotos dentro, y esta herramienta lo dice con honestidad en vez de fabricar capturas. Los PDF escaneados son el extremo opuesto: cada página es una gran imagen y todas aparecen aquí.",
        },
        {
          q: "¿Las imágenes se recomprimen?",
          a: "PNG para gráficos pequeños, JPEG al 92 % para fotos grandes — un equilibrio que mantiene los archivos prácticos sin pérdida visible. Los datos del bitmap vienen directos de los objetos almacenados del PDF; solo cambia el contenedor a un formato que sus herramientas pueden abrir.",
        },
        {
          q: "¿Se sube el archivo?",
          a: "No. El escaneo corre con pdf.js por completo en su navegador; el PDF y las imágenes extraídas nunca salen de su dispositivo. Aquí importa más que de costumbre, porque las imágenes dentro de un PDF suelen ser su parte más sensible: fotos de documento, escaneos, capturas de sistemas internos.",
        },
      ],
      deepDive: [
        {
          heading: "Qué vive dentro de los objetos de imagen de un PDF",
          paragraphs: [
            "Cuando pega una foto en un documento y la exporta como PDF, el exportador no captura pantalla — almacena el bitmap como objeto independiente (normalmente JPEG o codificado con Flate) y el flujo de contenido de la página solo dibuja ese objeto en una posición y tamaño. El original a resolución completa viaja dentro del archivo para siempre, por pequeño que se vea en la página.",
            "Por eso la extracción gana al renderizado de página para material fuente: una foto de 4000×3000 colocada en una esquina de 2×2 cm sigue siendo 4000×3000 dentro del archivo. El renderizado de página le daría unos cientos de píxeles; la extracción de objetos le da el negativo.",
            "Esta herramienta recorre los comandos de dibujo de cada página, encuentra cada operación de pintado de imagen y extrae los bytes del objeto referenciado — luego deduplica por firma de contenido, porque los logos y fondos suelen dibujarse una vez y reutilizarse en todas las páginas, y usted quiere una copia, no treinta.",
          ],
        },
        {
          heading: "Los casos límite que la versión honesta debe manejar",
          paragraphs: [
            "Los objetos de imagen en PDFs reales vienen en varias codificaciones — JPEG puro (DCTDecode), filas sin procesar comprimidas con Flate, y modelos de color desde escala de grises hasta CMYK con máscaras. Un extractor robusto los normaliza todos a RGBA antes de mostrar nada; por eso la cuadrícula de resultados aquí nunca muestra esas imágenes rosadas o invertidas que producen las herramientas de volcado de bytes ingenuas.",
            "Los mosaicos decorativos y las máscaras suaves también son objetos de imagen, normalmente de 16×16 o menos — extraerlos enterraría las fotos reales en ruido, así que se filtran por tamaño. Los aciertos duplicados (el mismo logo en cada página) colapsan a una entrada mediante firmas de píxeles. Las imágenes en línea — raras, pero legales — también se manejan, sin saltarse en silencio.",
            "El límite honesto: esto no es OCR ni un renderizador de páginas. Si una página es un único bitmap escaneado, recibe ese bitmap por página a resolución de escaneo; si el documento es vectorial puro, obtiene un resultado vacío y una declaración clara, no una captura fabricada.",
          ],
        },
        {
          heading: "Extracción, privacidad y el flujo práctico",
          paragraphs: [
            "Las imágenes dentro de un PDF son a menudo su carga más sensible: escaneos de pasaporte, fotos de documento, capturas de paneles internos, imágenes médicas. Ejecutar la extracción en un sitio web aleatorio significa subir exactamente esos activos a un servidor desconocido. Aquí todo el escaneo — recorrido de la lista de operadores, decodificación de objetos, renderizado de miniaturas, ensamblado del ZIP — corre en su navegador vía pdf.js, y el archivo nunca sale del dispositivo.",
            "Una secuencia práctica que cubre la mayoría de necesidades: extraiga todo primero y repase la cuadrícula — los números de página en las etiquetas le dicen dónde vivía cada imagen. Descargue archivos individuales con clic en las miniaturas; lleve el conjunto completo con el ZIP. Si luego necesita el texto alrededor de esas imágenes, la herramienta PDF a texto opera con el mismo modelo local primero.",
            "Y en la dirección contraria: si las imágenes que recuperó son sensibles — por ejemplo, extrajo fotos de documento de un formulario que le enviaron — recuerde que la herramienta de censura destruye el contenido de verdad antes de que un PDF salga de sus manos. Extracción y censura son dos extremos de la misma disciplina: saber qué llevan sus PDF.",
          ],
        },
      ],
    },
    pt: {
      name: "Extrair imagens de PDF",
      tagline: "Recupere as fotos e gráficos incrustados reais na resolução armazenada — qualidade total, sem capturas de página, tudo local.",
      intro: [
        "Os PDFs carregam fotos como bitmaps incrustados: assinaturas escaneadas, fotos de produto, gráficos colados de outras ferramentas. Esta ferramenta percorre o interior do arquivo e entrega essas imagens originais na resolução armazenada completa — exatamente os bytes que entraram no PDF, não instantâneos de página reduzidos.",
        "A diferença para conversores de página em imagem é a que existe entre o negativo e a cópia. Um render de página fixa as imagens no tamanho com que aparecem nela; a extração entrega o bitmap-fonte, que costuma ser bem maior e vem livre do conteúdo ao redor.",
        "Gráficos vetoriais, texto e fontes não são bitmaps e são corretamente ignorados: o que você recebe é exatamente o material fotográfico. Arquivos sem imagens incrustadas são reportados com honestidade em vez de devolver capturas falsas. Tudo roda no seu navegador via pdf.js — o PDF nunca sai do seu dispositivo.",
      ],
      steps: [
        "Solte o PDF; a varredura roda página a página com barra de progresso.",
        "Navegue pelas imagens recuperadas numa grade de miniaturas com páginas e dimensões.",
        "Clique numa miniatura para baixá-la, ou leve tudo de uma vez num ZIP.",
      ],
      faqs: [
        {
          q: "Qual a diferença para PDF em JPG?",
          a: "PDF em JPG renderiza páginas inteiras — layout, texto e tudo — na resolução escolhida. Esta ferramenta puxa os bitmaps incrustados originais, na resolução armazenada completa, sem o mobiliário da página em volta. Para capturas de página, o conversor; para imagens-fonte, este.",
        },
        {
          q: "Por que alguns PDFs não retornam nada?",
          a: "Porque não contêm bitmaps incrustados. Documentos compostos com vetores e texto — contratos, relatórios tipografados — não têm fotos dentro, e a ferramenta diz isso com honestidade em vez de fabricar capturas. PDFs escaneados são o extremo oposto: cada página é uma grande imagem e todas aparecem aqui.",
        },
        {
          q: "As imagens são recomprimidas?",
          a: "PNG para gráficos menores, JPEG a 92% para fotos maiores — um equilíbrio que mantém os arquivos práticos sem perda visível. Os dados do bitmap vêm direto dos objetos armazenados do PDF; só o contenedor muda para um formato que suas ferramentas abrem.",
        },
        {
          q: "O arquivo é enviado?",
          a: "Não. A varredura roda com pdf.js inteiramente no seu navegador; o PDF e as imagens extraídas nunca saem do seu dispositivo. Aqui isso importa mais que o normal, porque as imagens dentro de um PDF costumam ser a parte mais sensível: fotos de documento, escaneamentos, capturas de sistemas internos.",
        },
      ],
      deepDive: [
        {
          heading: "O que vive dentro dos objetos de imagem de um PDF",
          paragraphs: [
            "Quando você cola uma foto num documento e exporta como PDF, o exportador não faz captura de tela — ele armazena o bitmap como objeto independente (geralmente JPEG ou codificado com Flate) e o fluxo de conteúdo da página apenas desenha esse objeto numa posição e tamanho. O original em resolução total viaja dentro do arquivo para sempre, por menor que pareça na página.",
            "É por isso que a extração ganha do render de página para material-fonte: uma foto de 4000×3000 colocada num canto de 2×2 cm continua sendo 4000×3000 dentro do arquivo. O render da página entregaria alguns centenas de pixels; a extração de objetos entrega o negativo.",
            "Esta ferramenta percorre os comandos de desenho de cada página, encontra cada operação de pintura de imagem e puxa os bytes do objeto referenciado — depois deduplica por assinatura de conteúdo, porque logos e fundos costumam ser desenhados uma vez e reutilizados em todas as páginas, e você quer uma cópia, não trinta.",
          ],
        },
        {
          heading: "Os casos de borda que a versão honesta precisa tratar",
          paragraphs: [
            "Objetos de imagem em PDFs reais vêm em várias codificações — JPEG puro (DCTDecode), linhas cruas comprimidas com Flate, e modelos de cor do escala de cinza ao CMYK com máscaras. Um extrator robusto normaliza tudo para RGBA antes de mostrar qualquer coisa; por isso a grade de resultados aqui nunca mostra aquelas imagens rosadas ou invertidas que ferramentas ingênuas de despejo de bytes produzem.",
            "Ladrilhos decorativos e máscaras suaves também são objetos de imagem, normalmente 16×16 ou menos — extraí-los enterraria as fotos reais em ruído, então são filtrados por tamanho. Acertos duplicados (o mesmo logo em cada página) colapsam numa entrada via assinaturas de pixels. Imagens inline — raras, mas legais — também são tratadas, sem serem ignoradas em silêncio.",
            "O limite honesto: isto não é OCR nem um renderizador de páginas. Se uma página é um único bitmap escaneado, você recebe aquele bitmap por página na resolução do escaneamento; se o documento é vetorial puro, você recebe um resultado vazio e uma declaração clara, não uma captura fabricada.",
          ],
        },
        {
          heading: "Extração, privacidade e o fluxo prático",
          paragraphs: [
            "As imagens dentro de um PDF são frequentemente sua carga mais sensível: escaneamentos de passaporte, fotos de documento, capturas de painéis internos, imagens médicas. Rodar a extração num site aleatório significa enviar exatamente esses ativos a um servidor desconhecido. Aqui toda a varredura — percurso da lista de operadores, decodificação de objetos, render de miniaturas, montagem do ZIP — roda no seu navegador via pdf.js, e o arquivo nunca sai do dispositivo.",
            "Uma sequência prática que cobre a maioria das necessidades: extraia tudo primeiro e repasse a grade — os números de página nas etiquetas dizem onde cada imagem vivia. Baixe arquivos individuais clicando nas miniaturas; leve o conjunto completo no ZIP. Se precisar do texto ao redor dessas imagens, a ferramenta PDF para texto opera no mesmo modelo local-primeiro.",
            "E na direção contrária: se as imagens que você recuperou são sensíveis — por exemplo, extraiu fotos de documento de um formulário que enviaram — lembre do outro lado: a ferramenta de tachadura destrói o conteúdo de verdade antes de um PDF sair das suas mãos. Extração e tachadura são duas pontas da mesma disciplina: saber o que seus PDFs carregam.",
          ],
        },
      ],
    },
  },
});
