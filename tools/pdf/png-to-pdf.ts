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
    },
  },
});
