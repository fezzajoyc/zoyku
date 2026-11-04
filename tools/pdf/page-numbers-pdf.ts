import { PdfPageNumEngine } from "../_engines/pdf-engine-pagenum";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "page-numbers-pdf",
  category: "pdf",
  icon: "file",
  engine: { component: PdfPageNumEngine },
  related: ["merge-pdf", "split-pdf", "watermark-pdf", "compress-pdf", "rotate-pdf", "delete-pdf-pages", "pdf-to-ppt", "ocr-pdf", "pdf-to-text", "rearrange-pdf-pages"],
  copy: {
    en: {
      name: "Add Page Numbers to PDF",
      tagline: "Stamp page numbers on a PDF — choose format, corner and starting number, all locally in your browser.",
      intro: [
        "Give a PDF proper page numbers before printing or sharing: pick a format (1, 1/N or Page 1 of N), pick one of six corners, set the starting number — the file is rebuilt on your device and ready to download.",
        "Useful for reports, contracts, scanned bundles and anything that gets referenced by page in a meeting.",
      ],
      steps: [
        "Drop in the PDF you want to number.",
        "Pick the format, the corner and the starting number.",
        "Click Add page numbers and download the stamped file.",
      ],
      faqs: [
        {
          q: "Can I skip the cover page?",
          a: "Set 'Start numbering at' to 0 and the cover gets number 0 — or split the cover off first, number the rest, then merge them back.",
        },
        {
          q: "Will the numbers look consistent across page sizes?",
          a: "Each page is stamped relative to its own width and height, so mixed orientations and page sizes all get their number in the same visual corner.",
        },
      ],
    },
    zh: {
      name: "PDF 添加页码",
      tagline: "给 PDF 盖上页码:格式、角落、起始号自选,全程浏览器本地处理,文件不上传。",
      intro: [
        "打印或分享前给 PDF 加上像样的页码:三种格式(1、1/N、Page 1 of N)、六个角落、自定义起始号——文件在你的设备上重建,完成后直接下载。",
        "适合报告、合同、扫描合集,以及任何会上按页码讨论的材料。",
      ],
      steps: [
        "拖入要加页码的 PDF。",
        "选择格式、角落和起始页码。",
        "点击“添加页码”,下载盖章后的文件。",
      ],
      faqs: [
        {
          q: "能跳过封面页吗?",
          a: "把起始页码设为 0,封面就是第 0 页;或者先把封面拆出来,给剩余部分加页码,再合并回去。",
        },
        {
          q: "页面尺寸不一时页码位置一致吗?",
          a: "每页按自身宽高定位,横竖混排、大小不一的页面都会出现在同一个视觉角落。",
        },
      ],
    },
    ja: {
      name: "PDF にページ番号を追加",
      tagline: "PDF にページ番号を焼き込みます。形式・隅・開始番号を選べる、すべてブラウザ内で処理。",
      intro: [
        "印刷や共有の前に PDF にページ番号を付けましょう。形式(1、1/N、Page 1 of N)、6 つの隅、開始番号を選ぶだけ。ファイルは端末内で再構築され、すぐダウンロードできます。",
        "報告書、契約書、スキャン資料など、ページ番号で参照される資料に便利です。",
      ],
      steps: [
        "番号を付けたい PDF をドロップします。",
        "形式・隅・開始番号を選びます。",
        "「ページ番号を追加」を押してダウンロードします。",
      ],
      faqs: [
        {
          q: "表紙に番号を付けずに済みますか?",
          a: "開始番号を 0 にすると表紙が 0 ページになります。または表紙を先に分割し、残りに番号を付けてから結合し直してください。",
        },
        {
          q: "ページサイズが混在していても位置は揃いますか?",
          a: "各ページは自分の幅と高さを基準に配置されるため、横向きやサイズが違うページでも同じ見た目の隅に入ります。",
        },
      ],
    },
    es: {
      name: "Añadir números de página al PDF",
      tagline: "Estampa números de página en un PDF: formato, esquina y número inicial a elegir, todo local en tu navegador.",
      intro: [
        "Dale números de página a un PDF antes de imprimirlo o compartirlo: elige formato (1, 1/N o Page 1 of N), una de seis esquinas y el número inicial; el archivo se reconstruye en tu dispositivo y se descarga al instante.",
        "Útil para informes, contratos, escaneos y cualquier documento que se cite por página.",
      ],
      steps: [
        "Suelta el PDF que quieres numerar.",
        "Elige formato, esquina y número inicial.",
        "Pulsa Añadir números y descarga el archivo.",
      ],
      faqs: [
        {
          q: "¿Puedo saltarme la portada?",
          a: "Pon 'Empezar en' en 0 y la portada tendrá el número 0; o separa la portada, numera el resto y vuelve a combinarlos.",
        },
        {
          q: "¿La posición queda igual con tamaños de página distintos?",
          a: "Cada página se estampa según su propio ancho y alto, así que orientaciones y tamaños mezclados llevan el número en la misma esquina visual.",
        },
      ],
    },
    pt: {
      name: "Adicionar números de página ao PDF",
      tagline: "Estampe números de página num PDF — formato, canto e número inicial à sua escolha, tudo local no navegador.",
      intro: [
        "Dê números de página a um PDF antes de imprimir ou compartilhar: escolha o formato (1, 1/N ou Page 1 of N), um de seis cantos e o número inicial — o arquivo é reconstruído no seu dispositivo e sai pronto para download.",
        "Útil para relatórios, contratos, escaneamentos e qualquer material citado por página.",
      ],
      steps: [
        "Solte o PDF que quer numerar.",
        "Escolha formato, canto e número inicial.",
        "Clique em Adicionar números e baixe o arquivo.",
      ],
      faqs: [
        {
          q: "Dá para pular a capa?",
          a: "Defina 'Começar em' como 0 e a capa fica com o número 0 — ou separe a capa, numere o resto e junte tudo de novo.",
        },
        {
          q: "A posição fica igual com tamanhos de página diferentes?",
          a: "Cada página é estampada pela própria largura e altura, então orientações e tamanhos mistos recebem o número no mesmo canto visual.",
        },
      ],
    },
  },
});
