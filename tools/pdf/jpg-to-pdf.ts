import { ImagesToPdfEngine } from "../_engines/pdf-engine-images-to-pdf";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "jpg-to-pdf",
  category: "pdf",
  icon: "image",
  featured: true,
  engine: { component: ImagesToPdfEngine, props: { kind: "jpg" } },
  related: ["png-to-pdf", "image-to-pdf", "merge-pdf", "compress-pdf", "heic-to-jpg"],
  copy: {
    en: {
      name: "JPG to PDF",
      tagline:
        "Turn JPG photos into a clean PDF in your browser — batch import, drag-free reordering, and A4, Letter or fit-to-image page sizes.",
      intro: [
        "Convert any number of JPG photos into one tidy PDF: ID photos, receipts, homework scans or a camera roll you need to email as a single attachment. Add all the images at once, sort them with the arrow buttons, and choose whether each page hugs the photo or uses A4/Letter with a margin.",
        "The photos are embedded at full original quality — no resizing, no recompression, no watermark. Conversion happens on your device, so even private pictures never touch a server.",
      ],
      steps: [
        "Drop all the JPG images you want to include.",
        "Arrange the order and pick a page size (fit, A4 or Letter).",
        "Click Create PDF and download the result.",
      ],
      faqs: [
        {
          q: "Will the photos lose quality in the PDF?",
          a: "No. Your JPG files are embedded byte-for-byte, so the image data inside the PDF is identical to the originals. Quality only drops if you compress the PDF afterwards.",
        },
        {
          q: "How many images can I convert at once?",
          a: "As many as your browser's memory allows — dozens are routine; hundreds of multi-megabyte photos may be slow but still work locally.",
        },
        {
          q: "Can I mix JPG with PNG or other formats?",
          a: "Yes — use the general Image to PDF tool for mixed batches; it converts other formats automatically before embedding.",
        },
      ],
    },
    zh: {
      name: "JPG 转 PDF",
      tagline: "把 JPG 照片转成排版整齐的 PDF——批量导入、箭头排序,可选 A4、Letter 或随图尺寸,全程浏览器本地处理。",
      intro: [
        "把任意数量的 JPG 照片合成一份 PDF:证件照、收据、作业扫描,或需要作为单个附件发送的手机相册。一次添加全部图片,用箭头排序,再选择每页是贴合照片还是使用带边距的 A4/Letter。",
        "照片按原始数据完整嵌入——不缩放、不重压缩、无水印。转换在你的设备上完成,私密照片也不会经过任何服务器。",
      ],
      steps: [
        "把要用的 JPG 图片一起拖进来。",
        "调整顺序并选择页面尺寸(随图、A4 或 Letter)。",
        "点击“生成 PDF”并下载结果。",
      ],
      faqs: [
        {
          q: "照片在 PDF 里会降低画质吗?",
          a: "不会。JPG 文件按原始字节嵌入,PDF 里的图像数据与原文件完全一致。只有事后再压缩 PDF 才会有损。",
        },
        {
          q: "一次能转多少张?",
          a: "取决于浏览器内存——几十张很轻松;数百张多兆照片会慢一些,但依然可以在本地完成。",
        },
        {
          q: "可以混用 JPG 和 PNG 等其他格式吗?",
          a: "可以——混合批次请使用通用的“图片转 PDF”,它会在嵌入前自动转换其他格式。",
        },
      ],
    },
    ja: {
      name: "JPG を PDF に変換",
      tagline: "JPG 写真を見やすい PDF に変換。一括取り込み、矢印での並べ替え、A4・レター・画像サイズ合わせのページ設定に対応。ブラウザ内で完結します。",
      intro: [
        "枚数を問わず JPG 写真を 1 冊の PDF にまとめます。証明写真、レシート、宿題のスキャン、1 つの添付ファイルとして送りたいカメラロールに。画像をまとめて追加し、矢印で並べ替え、各ページを写真に合わせるか A4/レター+余白にするかを選べます。",
        "写真は元データのまま埋め込まれます。リサイズも再圧縮も透かしもありません。変換は端末内で行われるため、プライベートな写真がサーバーに触れることはありません。",
      ],
      steps: [
        "使いたい JPG 画像をまとめてドロップします。",
        "順序を整え、ページサイズ(画像に合わせる・A4・レター)を選びます。",
        "「PDF を作成」をクリックしてダウンロードします。",
      ],
      faqs: [
        {
          q: "PDF 内で画質は落ちますか?",
          a: "落ちません。JPG はバイト単位で埋め込まれるため、PDF 内の画像データは元ファイルと同一です。画質が下がるとすれば、後から PDF を圧縮した場合だけです。",
        },
        {
          q: "一度に何枚まで変換できますか?",
          a: "ブラウザのメモリしだいです。数十枚は日常的です。数百枚の大容量写真は時間がかかりますが、ローカルで処理できます。",
        },
        {
          q: "JPG と PNG など他形式を混ぜられますか?",
          a: "はい。形式が混ざる場合は汎用の「画像を PDF に」ツールをご利用ください。他形式も埋め込み前に自動変換します。",
        },
      ],
    },
    es: {
      name: "JPG a PDF",
      tagline:
        "Convierte fotos JPG en un PDF limpio en tu navegador: importación por lotes, reordenado con flechas y páginas A4, Carta o a medida de la imagen.",
      intro: [
        "Pasa cualquier cantidad de fotos JPG a un PDF ordenado: fotos de identidad, recibos, deberes escaneados o un carrete que necesitas enviar como un único adjunto. Añade todas las imágenes a la vez, ordénalas con las flechas y decide si cada página se ajusta a la foto o usa A4/Carta con margen.",
        "Las fotos se incrustan con su calidad original intacta: sin redimensionar, sin re-comprimir, sin marcas de agua. La conversión ocurre en tu dispositivo, así que ni las fotos privadas tocan un servidor.",
      ],
      steps: [
        "Suelta todas las imágenes JPG que quieras incluir.",
        "Ordena la lista y elige el tamaño de página (ajustado, A4 o Carta).",
        "Pulsa Crear PDF y descarga el resultado.",
      ],
      faqs: [
        {
          q: "¿Las fotos pierden calidad dentro del PDF?",
          a: "No. Los JPG se incrustan byte a byte, así que los datos de imagen del PDF son idénticos a los originales. Solo se pierde calidad si después comprimes el PDF.",
        },
        {
          q: "¿Cuántas imágenes puedo convertir de una vez?",
          a: "Las que permita la memoria del navegador: decenas son habituales; cientos de fotos de varios megabytes pueden tardar, pero también funcionan en local.",
        },
        {
          q: "¿Puedo mezclar JPG con PNG u otros formatos?",
          a: "Sí: usa la herramienta general Imagen a PDF para lotes mixtos; convierte los demás formatos automáticamente antes de incrustarlos.",
        },
      ],
    },
    pt: {
      name: "JPG para PDF",
      tagline:
        "Transforme fotos JPG em um PDF organizado no navegador — importação em lote, reordenação por setas e páginas A4, Carta ou no tamanho da imagem.",
      intro: [
        "Converta quantas fotos JPG quiser em um PDF só: fotos de documento, recibos, tarefas escaneadas ou um rolo de câmera que precisa enviar como anexo único. Adicione todas as imagens de uma vez, ordene com as setas e escolha se cada página abraça a foto ou usa A4/Carta com margem.",
        "As fotos são embutidas com a qualidade original intacta — sem redimensionar, sem recomprimir, sem marca d'água. A conversão acontece no seu dispositivo, então nem fotos privadas passam por servidor.",
      ],
      steps: [
        "Solte todas as imagens JPG que quer incluir.",
        "Organize a ordem e escolha o tamanho de página (na imagem, A4 ou Carta).",
        "Clique em Criar PDF e baixe o resultado.",
      ],
      faqs: [
        {
          q: "As fotos perdem qualidade no PDF?",
          a: "Não. Os JPGs são embutidos byte a byte, então os dados de imagem dentro do PDF são idênticos aos originais. A qualidade só cai se você comprimir o PDF depois.",
        },
        {
          q: "Quantas imagens posso converter de uma vez?",
          a: "Quantas a memória do navegador permitir — dezenas são rotina; centenas de fotos de vários megabytes podem demorar, mas também funcionam localmente.",
        },
        {
          q: "Posso misturar JPG com PNG e outros formatos?",
          a: "Sim — use a ferramenta geral Imagem para PDF em lotes mistos; ela converte os outros formatos automaticamente antes de embutir.",
        },
      ],
    },
  },
});
