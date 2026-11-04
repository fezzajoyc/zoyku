import { ImagesToPdfEngine } from "../_engines/pdf-engine-images-to-pdf";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "image-to-pdf",
  category: "pdf",
  icon: "image",
  engine: { component: ImagesToPdfEngine, props: { kind: "any" } },
  related: ["jpg-to-pdf", "png-to-pdf", "heic-to-jpg", "merge-pdf", "compress-pdf", "split-pdf", "delete-pdf-pages", "pdf-to-ppt", "ocr-pdf", "rotate-pdf"],
  copy: {
    en: {
      name: "Image to PDF",
      tagline:
        "Combine images of any format — JPG, PNG, WebP, GIF and more — into a single PDF, with automatic conversion and zero uploads.",
      intro: [
        "One tool for every picture: drop a mixed batch of JPG, PNG, WebP, GIF or BMP files and they all land in one PDF. Anything that is not already PDF-ready is converted locally through a canvas, so mixed batches just work.",
        "Sort pages, pick fit-to-image or A4/Letter with margins, and export. It is the swiss-army version of our JPG and PNG converters, with the same promise: files never leave your device.",
      ],
      steps: [
        "Drop images in any mix of supported formats.",
        "Reorder the list and choose the page size.",
        "Click Create PDF and download your document.",
      ],
      faqs: [
        {
          q: "Which formats are supported?",
          a: "Everything your browser can display: JPG, PNG, WebP, GIF, BMP and AVIF on most systems. Files that are already JPG or PNG are embedded without re-encoding; others are converted to lossless PNG first.",
        },
        {
          q: "What happens to HEIC photos from an iPhone?",
          a: "Modern browsers often can't decode HEIC directly. Convert them with our HEIC to JPG tool first, then combine the JPGs here.",
        },
        {
          q: "Are animated GIFs animated in the PDF?",
          a: "No — a PDF page is static, so you get the first frame. Convert animations to video or use the GIF itself for sharing.",
        },
      ],
    },
    zh: {
      name: "图片转 PDF",
      tagline: "任意格式图片合成一个 PDF——JPG、PNG、WebP、GIF 等混批自动转换,零上传,全部本地完成。",
      intro: [
        "一个工具应对所有图片:JPG、PNG、WebP、GIF、BMP 混在一起拖进来,统一生成一份 PDF。不是 PDF 原生格式的图片会在本地经画布自动转换,混合批次照样顺畅。",
        "支持排序、选择随图尺寸或带边距的 A4/Letter,然后导出。它是 JPG、PNG 专用转换器的全能版,承诺不变:文件永远不离开你的设备。",
      ],
      steps: [
        "把各种受支持格式的图片一起拖进来。",
        "调整列表顺序并选择页面尺寸。",
        "点击“生成 PDF”并下载文档。",
      ],
      faqs: [
        {
          q: "支持哪些格式?",
          a: "浏览器能显示的基本都行:JPG、PNG、WebP、GIF、BMP,多数系统还包括 AVIF。本身是 JPG 或 PNG 的文件直接嵌入不重编码;其他格式先转换为无损 PNG。",
        },
        {
          q: "iPhone 的 HEIC 照片怎么办?",
          a: "很多浏览器无法直接解码 HEIC。先用我们的“HEIC 转 JPG”转换,再回到这里合并 JPG。",
        },
        {
          q: "动态 GIF 在 PDF 里还会动吗?",
          a: "不会——PDF 页面是静态的,只会取第一帧。要分享动图,请直接使用 GIF 本身。",
        },
      ],
    },
    ja: {
      name: "画像を PDF に変換",
      tagline: "あらゆる形式の画像(JPG・PNG・WebP・GIF など)を 1 つの PDF に結合。形式変換は自動、アップロードはゼロ、すべてローカル処理です。",
      intro: [
        "あらゆる画像に対応する 1 つのツール:JPG、PNG、WebP、GIF、BMP を混ぜてドロップしても、1 冊の PDF にまとまります。PDF に直接埋め込めない形式はキャンバス経由でローカル変換するため、混在バッチでもそのまま動きます。",
        "ページの並べ替え、画像サイズ合わせや A4/レター+余白の選択、書き出しまで。JPG・PNG 専用コンバーターの万能版で、約束も同じ:ファイルが端末から出ることはありません。",
      ],
      steps: [
        "対応形式の画像を自由に混ぜてドロップします。",
        "リストを並べ替え、ページサイズを選びます。",
        "「PDF を作成」をクリックしてダウンロードします。",
      ],
      faqs: [
        {
          q: "対応している形式は?",
          a: "ブラウザで表示できる形式なら基本すべて:JPG、PNG、WebP、GIF、BMP、多くの環境では AVIF。JPG・PNG はそのまま埋め込み、それ以外はまずロスレス PNG に変換されます。",
        },
        {
          q: "iPhone の HEIC 写真はどうすれば?",
          a: "多くのブラウザは HEIC を直接デコードできません。まず「HEIC を JPG に」で変換してから、ここで JPG を結合してください。",
        },
        {
          q: "アニメーション GIF は PDF でも動きますか?",
          a: "いいえ。PDF のページは静的なので、先頭フレームになります。アニメーションの共有は GIF 本体をご利用ください。",
        },
      ],
    },
    es: {
      name: "Imagen a PDF",
      tagline:
        "Combina imágenes de cualquier formato — JPG, PNG, WebP, GIF y más — en un solo PDF, con conversión automática y cero subidas.",
      intro: [
        "Una sola herramienta para todas las imágenes: suelta un lote mixto de JPG, PNG, WebP, GIF o BMP y todos acaban en un único PDF. Lo que no sea directamente compatible se convierte en local mediante un canvas, así que los lotes mixtos funcionan sin más.",
        "Ordena las páginas, elige ajustado a la imagen o A4/Carta con márgenes y exporta. Es la versión todoterreno de nuestros conversores JPG y PNG, con la misma promesa: los archivos nunca salen de tu dispositivo.",
      ],
      steps: [
        "Suelta imágenes en cualquier mezcla de formatos admitidos.",
        "Reordena la lista y elige el tamaño de página.",
        "Pulsa Crear PDF y descarga tu documento.",
      ],
      faqs: [
        {
          q: "¿Qué formatos admite?",
          a: "Todo lo que tu navegador pueda mostrar: JPG, PNG, WebP, GIF, BMP y AVIF en la mayoría de sistemas. Los JPG y PNG se incrustan sin re-codificar; el resto se convierte primero a PNG sin pérdidas.",
        },
        {
          q: "¿Y las fotos HEIC de un iPhone?",
          a: "Muchos navegadores no decodifican HEIC directamente. Conviértelas primero con nuestra herramienta HEIC a JPG y combina aquí los JPG.",
        },
        {
          q: "¿Los GIF animados se mueven en el PDF?",
          a: "No: la página de un PDF es estática, así que obtienes el primer fotograma. Para compartir animaciones usa el propio GIF.",
        },
      ],
    },
    pt: {
      name: "Imagem para PDF",
      tagline:
        "Junte imagens de qualquer formato — JPG, PNG, WebP, GIF e mais — em um único PDF, com conversão automática e zero upload.",
      intro: [
        "Uma ferramenta para todas as imagens: solte um lote misto de JPG, PNG, WebP, GIF ou BMP e todas viram um único PDF. O que não estiver pronto para PDF é convertido localmente via canvas, então lotes mistos funcionam de boa.",
        "Ordene as páginas, escolha na imagem ou A4/Carta com margens e exporte. É a versão canivete-suíço dos nossos conversores JPG e PNG, com a mesma promessa: os arquivos nunca saem do seu dispositivo.",
      ],
      steps: [
        "Solte imagens em qualquer mistura de formatos suportados.",
        "Reordene a lista e escolha o tamanho de página.",
        "Clique em Criar PDF e baixe seu documento.",
      ],
      faqs: [
        {
          q: "Quais formatos são aceitos?",
          a: "Tudo o que seu navegador exibir: JPG, PNG, WebP, GIF, BMP e AVIF na maioria dos sistemas. JPG e PNG são embutidos sem recodificação; os demais são convertidos para PNG sem perdas antes.",
        },
        {
          q: "E as fotos HEIC de um iPhone?",
          a: "Muitos navegadores não decodificam HEIC direto. Converta antes com nossa ferramenta HEIC para JPG e junte os JPGs aqui.",
        },
        {
          q: "GIFs animados ficam animados no PDF?",
          a: "Não — a página de um PDF é estática, então você recebe o primeiro quadro. Para compartilhar animações, use o próprio GIF.",
        },
      ],
    },
  },
});
