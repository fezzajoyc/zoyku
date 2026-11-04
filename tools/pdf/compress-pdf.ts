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
    },
  },
});
