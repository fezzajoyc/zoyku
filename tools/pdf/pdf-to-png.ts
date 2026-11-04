import { PdfToImagesEngine } from "../_engines/pdf-engine-pdf-to-images";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "pdf-to-png",
  category: "pdf",
  icon: "image",
  engine: { component: PdfToImagesEngine, props: { format: "png" } },
  related: ["pdf-to-jpg", "png-to-pdf", "pdf-to-text", "ocr-pdf", "split-pdf", "delete-pdf-pages", "pdf-to-ppt", "compress-pdf", "rotate-pdf", "merge-pdf"],
  copy: {
    en: {
      name: "PDF to PNG",
      tagline:
        "Convert PDF pages to lossless PNG images at your chosen resolution — crisp slides and scans, with a ZIP when there are many pages.",
      intro: [
        "When JPG artifacts are not welcome — screenshots of slides, diagrams, forms with small print — export pages as PNG. The lossless format keeps letter edges and thin lines pixel-sharp, at 96 up to 300 DPI.",
        "Every page renders locally with pdf.js at the exact appearance the PDF defines. Files are named by page number, and multi-page results arrive with a one-click ZIP.",
      
        "Each page is rasterized by pdf.js at the DPI you pick: 96 for screen previews, 150 for readable thumbnails, 300 for print-ready output. Because PNG is lossless, hairlines, small print and diagram edges stay pixel-sharp — the artifacts that JPG introduces at those sizes simply are not present.",
        "Compared with screenshotting a PDF viewer (which captures the screen at whatever zoom is current), the render is at true page resolution with predictable output size per page. And unlike cloud converters, a confidential contract or a private deck never touches a server — the pages are drawn by the same engine Firefox uses to display PDFs.",
      ],
      steps: [
        "Drop your PDF into the box.",
        "Pick the resolution — 150 DPI is a solid default.",
        "Click Convert to PNG, then download pages or the ZIP.",
      ],
      faqs: [
        {
          q: "When should I use PNG instead of JPG?",
          a: "Whenever the pages contain text, flat colors or line art: PNG keeps those perfectly sharp. JPG suits photographic pages where small file size matters more.",
        },
        {
          q: "Why are the PNG files large?",
          a: "Lossless compression preserves every pixel, so sizes grow with DPI. 300 DPI scans of a dense page can be several megabytes; drop to 96–150 DPI for on-screen use.",
        },
        {
          q: "Is transparency preserved?",
          a: "Pages are rendered onto a white background, so output is opaque PNG. That matches how PDFs print and avoids black-background surprises in viewers.",
        },
      ],
    },
    zh: {
      name: "PDF 转 PNG",
      tagline: "把 PDF 页面转换为所选分辨率的无损 PNG——幻灯片和扫描件依然锐利,多页时一键打包 ZIP。",
      intro: [
        "当 JPG 压缩痕迹不可接受时——幻灯片截图、图表、小字号表格——把页面导出为 PNG。无损格式保留文字边缘和细线的像素级锐度,支持 96 到 300 DPI。",
        "每页都由 pdf.js 在本地按 PDF 定义的精确外观渲染。文件按页码命名,多页结果附带一键 ZIP 打包。",
      ],
      steps: [
        "把 PDF 拖入方框。",
        "选择分辨率——150 DPI 是稳妥的默认值。",
        "点击“转换为 PNG”,逐页下载或下载 ZIP。",
      ],
      faqs: [
        {
          q: "什么时候该用 PNG 而不是 JPG?",
          a: "页面包含文字、纯色块或线条图时用 PNG,它能保持完美锐利;JPG 更适合以照片为主、更在意体积的页面。",
        },
        {
          q: "为什么 PNG 文件比较大?",
          a: "无损压缩保留每个像素,体积随 DPI 增长。信息密集的页面在 300 DPI 下可能有好几兆;屏幕使用建议降到 96–150 DPI。",
        },
        {
          q: "透明度会保留吗?",
          a: "页面会渲染到白色背景上,输出不透明的 PNG。这与 PDF 的打印效果一致,也避免了某些查看器黑底显示的问题。",
        },
      ],
    },
    ja: {
      name: "PDF を PNG に変換",
      tagline: "PDF のページを指定解像度のロスレス PNG に変換。スライドやスキャンもくっきり、ページが多いときは ZIP で一括ダウンロード。",
      intro: [
        "JPG の劣化が困る場面——スライドの図、ダイアグラム、小さな活字のフォーム——では、ページを PNG で書き出しましょう。ロスレス形式なら文字のエッジや細い線もピクセル単位でシャープです。96〜300 DPI に対応します。",
        "各ページは pdf.js によりローカルで、PDF が定義するとおりの見た目で描画されます。ファイルはページ番号付きの名前で、複数ページの結果はワンクリックの ZIP と一緒に届きます。",
      ],
      steps: [
        "PDF をボックスにドロップします。",
        "解像度を選びます(150 DPI が無難な既定値です)。",
        "「変換」をクリックし、各ページまたは ZIP をダウンロードします。",
      ],
      faqs: [
        {
          q: "JPG ではなく PNG を使うべき場面は?",
          a: "ページにテキスト・ベタ塗り・線画が含まれる場合です。PNG はそれらを完全にシャープに保ちます。JPG は写真中心でファイルサイズを優先したいページ向きです。",
        },
        {
          q: "PNG ファイルが大きいのはなぜ?",
          a: "ロスレス圧縮は全ピクセルを保持するため、サイズは DPI に比例して増えます。情報量の多いページの 300 DPI は数 MB になることも。画面用途なら 96〜150 DPI に下げてください。",
        },
        {
          q: "透過は保持されますか?",
          a: "ページは白背景にレンダリングされるため、出力は不透明な PNG です。これは PDF の印刷結果と一致し、ビューアでの黒背景問題も避けられます。",
        },
      ],
    },
    es: {
      name: "PDF a PNG",
      tagline:
        "Convierte las páginas de un PDF a imágenes PNG sin pérdidas y a la resolución que elijas: diapositivas y escaneos nítidos, con ZIP si son muchas.",
      intro: [
        "Cuando los artefactos del JPG no son aceptables —capturas de diapositivas, diagramas, formularios con letra pequeña— exporta las páginas como PNG. El formato sin pérdidas mantiene los bordes de las letras y las líneas finas píxel-perfectos, de 96 a 300 DPI.",
        "Cada página se dibuja en local con pdf.js con la apariencia exacta que define el PDF. Los archivos se nombran por número de página y los resultados multipágina incluyen un ZIP de un clic.",
      ],
      steps: [
        "Suelta tu PDF en el recuadro.",
        "Elige la resolución: 150 DPI es un valor sólido.",
        "Pulsa Convertir a PNG y descarga las páginas o el ZIP.",
      ],
      faqs: [
        {
          q: "¿Cuándo conviene PNG en vez de JPG?",
          a: "Cuando las páginas contengan texto, colores planos o gráficos de líneas: PNG los mantiene perfectamente nítidos. JPG va bien en páginas fotográficas donde importa más el tamaño.",
        },
        {
          q: "¿Por qué los archivos PNG pesan tanto?",
          a: "La compresión sin pérdidas conserva cada píxel, así que el tamaño crece con el DPI. Un escaneo denso a 300 DPI puede ocupar varios megabytes; baja a 96–150 DPI para uso en pantalla.",
        },
        {
          q: "¿Se conserva la transparencia?",
          a: "Las páginas se dibujan sobre fondo blanco, así que el PNG sale opaco. Coincide con cómo se imprime un PDF y evita sorpresas de fondo negro en algunos visores.",
        },
      ],
    },
    pt: {
      name: "PDF para PNG",
      tagline:
        "Converta páginas de PDF em imagens PNG sem perdas na resolução escolhida — slides e digitalizações nítidos, com ZIP para muitas páginas.",
      intro: [
        "Quando os artefatos do JPG não são bem-vindos — capturas de slides, diagramas, formulários com letras pequenas — exporte as páginas como PNG. O formato sem perdas mantém bordas de letras e linhas finas pixel-perfect, de 96 a 300 DPI.",
        "Cada página é renderizada localmente com pdf.js na aparência exata que o PDF define. Os arquivos são nomeados por número de página e resultados com várias páginas vêm com um ZIP de um clique.",
      ],
      steps: [
        "Solte seu PDF na área.",
        "Escolha a resolução — 150 DPI é um padrão seguro.",
        "Clique em Converter para PNG e baixe as páginas ou o ZIP.",
      ],
      faqs: [
        {
          q: "Quando usar PNG em vez de JPG?",
          a: "Sempre que as páginas tiverem texto, cores chapadas ou desenhos lineares: PNG os mantém perfeitamente nítidos. JPG serve para páginas fotográficas, onde o tamanho importa mais.",
        },
        {
          q: "Por que os arquivos PNG são grandes?",
          a: "A compressão sem perdas preserva cada pixel, então o tamanho cresce com o DPI. Uma página densa a 300 DPI pode ter vários megabytes; baixe para 96–150 DPI para uso na tela.",
        },
        {
          q: "A transparência é mantida?",
          a: "As páginas são renderizadas sobre fundo branco, então o PNG sai opaco. Isso combina com a impressão de um PDF e evita surpresas de fundo negro em alguns visualizadores.",
        },
      ],
    },
  },
});
