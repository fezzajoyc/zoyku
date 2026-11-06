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
      
        "Non-PDF-native formats (WebP, GIF, BMP) are decoded to canvas and re-encoded as JPEG before embedding, while JPG and PNG go into the PDF directly via pdf-lib — no double re-compression for formats the PDF spec already supports. Page size either hugs each image's pixels or snaps to A4/Letter with a margin you set.",
        "Compared with converting each image to PDF one at a time, the mixed-batch mode normalizes formats automatically — a PNG chart, a WebP screenshot and a JPG photo land in one document in one pass. And unlike Word's insert-then-export flow, the output keeps each image's native resolution instead of being downsampled to screen DPI.",
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
      deepDive: [
        {
          heading: "Why images and PDFs are different animals",
          paragraphs: [
            "A JPEG or PNG file is a flat grid of pixels with no concept of pages, size or layout — it just is an image. A PDF, by contrast, is a page-description format: it defines pages with physical dimensions (in points, where 72 points equal one inch) and places content onto those pages. Turning images into a PDF therefore means making a real layout decision, not just changing the file extension.",
            "This tool wraps each image in a PDF page sized to the image, preserving the image's own pixel data rather than re-compressing it. That is why an image-to-PDF conversion done this way is visually lossless: the pixels you see in the output are the pixels you put in. File size also stays close to the sum of the images, because PDF is just the container.",
            "It is worth understanding the alternative: some converters re-encode everything into one JPEG quality setting, which can silently degrade PNGs with sharp text or line art. Keeping original image data inside the PDF container avoids that failure mode entirely — your screenshot stays exactly as crisp inside the PDF as it was outside.",
          ],
        },
        {
          heading: "Order, orientation and multi-page assembly",
          paragraphs: [
            "Because a PDF is an ordered sequence of pages, the order in which you add images becomes the page order of the document. For a scanned contract, receipt book or photo set, sorting images by filename before adding is the reliable habit — filenames sort deterministically, while memory of \"I think I uploaded them in order\" does not. Rearranging afterwards is possible with a page-reorder tool, but getting it right at insert time is cheaper.",
            "Mixed sizes are normal and handled per page: a batch of photos where some are landscape and some portrait produces pages that match each image's aspect. If you need a uniform paper size (A4 pages for printing, for example), run the output through a crop or resize step afterwards — wrapping images at native size first, then normalizing, beats trying to force everything into one page size at creation time.",
            "A note on resolution: the PDF page adopts the image's pixel dimensions mapped at 72 pixels per inch, so a 3000-pixel-wide photo lands as a very large page. That is correct for archiving and zooming; for print-sized output, what matters is that the source image has enough pixels for the target print size, which wrapping does not change either way.",
          ],
        },
        {
          heading: "Your images stay on your device",
          paragraphs: [
            "Photos and scans are among the most personal files people own — family pictures, ID scans, receipts, medical images. Sending them to an online converter means copies exist on someone else's storage before you have even seen the result. This tool does the wrapping entirely in your browser: images are read from disk into memory, embedded into PDF page objects by JavaScript, and the finished file is written locally. No upload, no server copy, no retention.",
            "Because there is no transfer, the size ceiling disappears with it. Online converters commonly cap uploads at 10–20 MB or rate-limit free users; here, a folder of 50 large photos converts as smoothly as three, limited only by device memory. Batch conversion is also faster without network round-trips — the slowest step becomes your disk, not someone else's bandwidth.",
            "One privacy habit worth adopting: photos taken on phones carry EXIF metadata including GPS coordinates. Embedding them into a PDF preserves that data just as the original image had it. If you share converted PDFs widely, consider stripping location data at the source — wrapping images into a PDF neither adds nor removes metadata, it preserves what was there.",
          ],
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
      deepDive: [
        {
          heading: "图片和 PDF 为什么是两种东西",
          paragraphs: [
            "JPEG 或 PNG 是一张扁平的像素网格,没有页、尺寸、版式的概念——它就是一张图。PDF 则是页面描述格式:它定义带有物理尺寸的页面(以磅为单位,72 磅等于一英寸),再把内容放到页面上。所以把图片变成 PDF 是一次真正的排版决策,不是改个扩展名。",
            "本工具把每张图片包进一个与图片等大的 PDF 页面,保留图片自身的像素数据而不重新压缩。这样做出来的转换在视觉上是无损的:输出里看到的像素就是你放进去的像素。文件体积也接近图片之和,因为 PDF 只是容器。",
            "值得了解另一种做法:有些转换器会把所有图重新编码成同一档 JPEG 质量,可能悄悄毁掉带锐利文字或线稿的 PNG。把原始图片数据留在 PDF 容器里就完全避开了这个坑——你的截图在 PDF 里和在 PDF 外一样清晰。",
          ],
        },
        {
          heading: "顺序、方向与多页组装",
          paragraphs: [
            "PDF 是有序的页面序列,所以添加图片的顺序就是文档的页序。扫描合同、票据册、照片集这类材料,添加前先按文件名排序是可靠的习惯——文件名排序是确定性的,“我记得是按顺序传的”不是。之后可以用页面重排工具调整,但在插入时就排对,成本最低。",
            "尺寸混杂很正常,按页处理:一批照片有横有竖,产出的页面会各自贴合图片的比例。如果你需要统一的纸张尺寸(比如打印用 A4),先按原始尺寸包装,之后再用裁剪或缩放步骤归一化——比在创建时就强行塞进同一页尺寸更稳。",
            "关于分辨率:PDF 页面采用图片的像素尺寸、按每英寸 72 像素映射,所以一张 3000 像素宽的照片会落成很大的页面。这对存档和缩放是正确的;对打印尺寸输出,关键是源图要有足够像素支撑目标打印尺寸,包装这一步无论如何都不会改变这一点。",
          ],
        },
        {
          heading: "图片始终留在你的设备上",
          paragraphs: [
            "照片和扫描件是人最私人的文件之列——家庭照片、证件扫描、票据、医学影像。传给在线转换器意味着结果还没看到,副本已经躺在别人的存储里。本工具完全在浏览器里完成包装:图片从磁盘读入内存,由 JavaScript 嵌入 PDF 页面对象,成品在本地写出。没有上传,没有服务器副本,没有留存。",
            "因为不传输,体积上限也随之消失。在线转换器通常把上传限在 10–20 MB 或对免费用户限速;这里 50 张大图和 3 张一样顺畅,瓶颈只有设备内存。没有网络往返,批量转换也更快——最慢的一步是你的磁盘,不是别人的带宽。",
            "一个值得养成的隐私习惯:手机拍的照片带 EXIF 元数据,包括 GPS 坐标。嵌入 PDF 会原样保留这些数据。如果转换出的 PDF 会广泛分享,考虑在源头先去掉位置信息——包装这一步既不添加也不删除元数据,它保留原有的一切。",
          ],
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
      deepDive: [
        {
          heading: "画像と PDF が別物である理由",
          paragraphs: [
            "JPEG や PNG は平坦なピクセルの格子で、ページ・サイズ・レイアウトという概念を持ちません。ただの画像です。一方 PDF はページ記述形式です。物理サイズを持つページ(ポイント単位、72 ポイントで 1 インチ)を定義し、そのページへ内容を配置します。したがって画像を PDF にすることは、拡張子を替えるのではなく、本物のレイアウト判断をすることです。",
            "このツールは各画像を画像と同じ大きさの PDF ページに包み込み、画像自身のピクセルデータを保ちます。再圧縮はしません。だからこの方式の変換は視覚的に可逆です。出力で見えるピクセルは、入れたピクセルそのものです。ファイルサイズも画像の合計に近く保たれます。PDF は単なる容器だからです。",
            "別の方式も知っておく価値があります。一部の変換器はすべてを一定の JPEG 品質に再エンコードし、鋭い文字や線画を含む PNG を静かに劣化させることがあります。元の画像データを PDF コンテナに保持する方式はこの失敗を根本的に避けられます。スクリーンショットは PDF の中でも外と同様に鮮明なままです。",
          ],
        },
        {
          heading: "順序・向き・複数ページの組み立て",
          paragraphs: [
            "PDF は順序付きのページ列なので、画像を追加した順がそのまま文書のページ順になります。スキャンした契約書、領収書ファイル、写真集では、追加前にファイル名で並べ替えるのが確実な習慣です。ファイル名のソートは決定論的ですが、「順番に上げたはず」という記憶は決定論的ではありません。後からページ並べ替えツールで直すことも可能ですが、挿入時に正しく並べるほうが安上がりです。",
            "サイズの混在は正常で、ページごとに扱われます。横と縦が混ざった写真の束は、各画像のアスペクト比に合ったページを産みます。統一した用紙サイズ(印刷用 A4 など)が必要なら、まず原寸で包み、後から切り抜きやリサイズで正規化するほうが、作成時に全ページを一つのサイズへ無理に押し込むより安定します。",
            "解像度について:PDF ページは画像のピクセル寸法を 72 ピクセル/インチで対応付けます。幅 3000 ピクセルの写真はかなり大きなページになります。アーカイブや拡大表示にはこれが正しいです。印刷サイズの出力で問題になるのは、元画像が目標の印刷サイズに対して十分なピクセルを持つかどうかで、包み込む操作はどちらの方向にもこれを変えません。",
          ],
        },
        {
          heading: "画像は端末から出ない",
          paragraphs: [
            "写真とスキャンは、人が持つ最も私的なファイルの一種です。家族の写真、身分証のスキャン、領収書、医療画像。オンライン変換器に送るということは、結果を見る前にコピーが他人のストレージに存在することを意味します。このツールはブラウザ内で包み込みを完結させます。画像はディスクからメモリへ読み込まれ、JavaScript が PDF ページオブジェクトに埋め込み、完成ファイルはローカルに書き出されます。アップロードも、サーバー側のコピーも、保持もありません。",
            "転送がないので容量の上限も消えます。オンライン変換器はアップロードを 10〜20 MB に制限したり無料ユーザーを絞ったりしがちです。ここでは大きな写真 50 枚でも 3 枚と同じように処理でき、制約は端末のメモリだけです。ネットワーク往復がない分、一括変換も速くなります。律速になるのはあなたのディスクであって、他人の帯域ではありません。",
            "採る価値のあるプライバシー習慣:スマホ写真には GPS 座標を含む EXIF メタデータが載っています。PDF への埋め込みはそのデータを元画像のまま保持します。変換した PDF を広く共有するなら、位置情報は元の時点で剥がすのが確実です。包み込み操作はメタデータを加えず、消しもせず、あるものを保ちます。",
          ],
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
      deepDive: [
        {
          heading: "Por qué imágenes y PDF son animales distintos",
          paragraphs: [
            "Un archivo JPEG o PNG es una rejilla plana de píxeles sin concepto de páginas, tamaño ni maquetación — simplemente es una imagen. Un PDF, en cambio, es un formato de descripción de páginas: define páginas con dimensiones físicas (en puntos, donde 72 puntos equivalen a una pulgada) y coloca contenido sobre ellas. Convertir imágenes a PDF supone, por tanto, tomar una decisión real de maquetación, no solo cambiar la extensión del archivo.",
            "Esta herramienta envuelve cada imagen en una página PDF del tamaño de la imagen, conservando los datos de píxeles propios en lugar de re-comprimirlos. Por eso una conversión así es visualmente sin pérdidas: los píxeles que ves en la salida son los que metiste. El tamaño del archivo también queda cerca de la suma de las imágenes, porque el PDF es solo el contenedor.",
            "Merece entender la alternativa: algunos conversores re-codifican todo a un único nivel de calidad JPEG, lo que puede degradar en silencio los PNG con texto nítido o arte lineal. Mantener los datos originales de imagen dentro del contenedor PDF evita por completo ese modo de fallo — tu captura de pantalla sigue exactamente tan nítida dentro del PDF como fuera.",
          ],
        },
        {
          heading: "Orden, orientación y montaje multipágina",
          paragraphs: [
            "Como un PDF es una secuencia ordenada de páginas, el orden en que añades las imágenes se convierte en el orden de páginas del documento. Para un contrato escaneado, un libro de recibos o un set de fotos, ordenar las imágenes por nombre de archivo antes de añadirlas es el hábito fiable — los nombres se ordenan de forma determinista, mientras que \"creo que las subí en orden\" no. Reordenar después es posible con una herramienta de reordenar páginas, pero acertar al insertar cuesta menos.",
            "Los tamaños mezclados son normales y se tratan por página: un lote de fotos con algunas horizontales y otras verticales produce páginas que se ajustan a la proporción de cada imagen. Si necesitas un tamaño de papel uniforme (páginas A4 para imprimir, por ejemplo), pasa el resultado luego por un recorte o redimensionado — envolver a tamaño nativo primero y normalizar después funciona mejor que forzar todo a un tamaño de página en el momento de crear.",
            "Una nota sobre resolución: la página PDF adopta las dimensiones en píxeles de la imagen mapeadas a 72 píxeles por pulgada, así que una foto de 3000 píxeles de ancho aterriza como una página muy grande. Es correcto para archivar y hacer zoom; para salida de tamaño de imprenta, lo que importa es que la imagen de origen tenga suficientes píxeles para el tamaño impreso objetivo, algo que el envoltorio no cambia en ningún caso.",
          ],
        },
        {
          heading: "Tus imágenes se quedan en tu dispositivo",
          paragraphs: [
            "Las fotos y los escaneos están entre los archivos más personales que posee la gente: imágenes de familia, escaneos de documentos, recibos, imágenes médicas. Enviarlas a un conversor en línea significa que existen copias en el almacenamiento de otra persona antes incluso de que hayas visto el resultado. Esta herramienta hace el envoltorio por completo en tu navegador: las imágenes se leen del disco a la memoria, se incrustan en objetos de página PDF con JavaScript y el archivo final se escribe en local. Sin subida, sin copia en el servidor, sin retención.",
            "Como no hay transferencia, el techo de tamaño desaparece con ella. Los conversores en línea suelen limitar las subidas a 10–20 MB o limitar a los usuarios gratuitos; aquí una carpeta de 50 fotos grandes convierte con la misma fluidez que tres, con el límite puesto por la memoria del dispositivo. El proceso por lotes también es más rápido sin los viajes de red — el paso más lento pasa a ser tu disco, no el ancho de banda de otro.",
            "Un hábito de privacidad que vale adoptar: las fotos hechas con móviles llevan metadatos EXIF que incluyen coordenadas GPS. Incrustarlas en un PDF conserva esos datos tal como los tenía la imagen original. Si vas a compartir mucho los PDF convertidos, considera quitar los datos de ubicación en el origen — envolver imágenes en un PDF no añade ni quita metadatos, conserva lo que había.",
          ],
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
      deepDive: [
        {
          heading: "Por que imagens e PDF são bichos diferentes",
          paragraphs: [
            "Um arquivo JPEG ou PNG é uma grade plana de pixels sem conceito de páginas, tamanho ou layout — ele simplesmente é uma imagem. Um PDF, ao contrário, é um formato de descrição de páginas: define páginas com dimensões físicas (em pontos, onde 72 pontos equivalem a uma polegada) e coloca conteúdo sobre elas. Converter imagens para PDF é, portanto, uma decisão real de layout, não só trocar a extensão do arquivo.",
            "Esta ferramenta embrulha cada imagem numa página PDF do tamanho da imagem, preservando os dados de pixels da própria imagem em vez de recomprimi-los. Por isso uma conversão assim é visualmente sem perdas: os pixels que você vê na saída são os que você colocou. O tamanho do arquivo também fica perto da soma das imagens, porque o PDF é só o contêiner.",
            "Vale entender a alternativa: alguns conversores recodificam tudo numa única qualidade JPEG, o que pode degradar em silêncio PNGs com texto nítido ou arte em linha. Manter os dados originais da imagem dentro do contêiner PDF evita inteiramente esse modo de falha — seu print fica exatamente tão nítido dentro do PDF quanto fora.",
          ],
        },
        {
          heading: "Ordem, orientação e montagem multipágina",
          paragraphs: [
            "Como um PDF é uma sequência ordenada de páginas, a ordem em que você adiciona as imagens vira a ordem de páginas do documento. Para um contrato digitalizado, um fichário de recibos ou um conjunto de fotos, ordenar as imagens por nome de arquivo antes de adicionar é o hábito confiável — nomes ordenam de forma determinística, enquanto \"acho que subi na ordem\" não. Reordenar depois é possível com uma ferramenta de reordenação, mas acertar na hora de inserir custa menos.",
            "Tamanhos misturados são normais e tratados por página: um lote de fotos com algumas na horizontal e outras na vertical produz páginas que acompanham a proporção de cada imagem. Se você precisa de um tamanho de papel uniforme (páginas A4 para imprimir, por exemplo), passe o resultado depois por um recorte ou redimensionamento — embrulhar no tamanho nativo primeiro e normalizar depois funciona melhor que forçar tudo num tamanho de página na criação.",
            "Uma nota sobre resolução: a página PDF adota as dimensões em pixels da imagem mapeadas a 72 pixels por polegada, então uma foto de 3000 pixels de largura vira uma página bem grande. Isso é correto para arquivar e dar zoom; para saída em tamanho de impressão, o que importa é a imagem de origem ter pixels suficientes para o tamanho impresso alvo, e o embrulho não muda isso de jeito nenhum.",
          ],
        },
        {
          heading: "Suas imagens ficam no seu dispositivo",
          paragraphs: [
            "Fotos e digitalizações estão entre os arquivos mais pessoais que existem — fotos de família, scans de documentos, recibos, imagens médicas. Enviá-las a um conversor online significa que cópias existem no armazenamento de outra pessoa antes mesmo de você ver o resultado. Esta ferramenta faz o embrulho inteiro no seu navegador: as imagens são lidas do disco para a memória, embutidas em objetos de página PDF por JavaScript e o arquivo pronto é escrito localmente. Sem envio, sem cópia no servidor, sem retenção.",
            "Como não há transferência, o teto de tamanho desaparece junto. Conversores online costumam limitar envios a 10–20 MB ou limitar usuários gratuitos; aqui, uma pasta com 50 fotos grandes converte com a mesma fluidez de três, com limite só da memória do dispositivo. O lote também é mais rápido sem as idas e vindas de rede — o passo mais lento passa a ser o seu disco, não a banda de outro.",
            "Um hábito de privacidade que vale adotar: fotos tiradas em celulares carregam metadados EXIF incluindo coordenadas GPS. Embutir no PDF preserva esses dados como a imagem original tinha. Se você compartilha muito os PDFs convertidos, considere tirar os dados de localização na origem — embrulhar imagens num PDF não adiciona nem remove metadados, preserva o que estava lá.",
          ],
        },
      ],
    },
  },
});
