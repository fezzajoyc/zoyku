import { ImagesToPdfEngine } from "../_engines/pdf-engine-images-to-pdf";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "jpg-to-pdf",
  category: "pdf",
  icon: "image",
  featured: true,
  engine: { component: ImagesToPdfEngine, props: { kind: "jpg" } },
  related: ["png-to-pdf", "image-to-pdf", "merge-pdf", "compress-pdf", "heic-to-jpg", "split-pdf", "delete-pdf-pages", "pdf-to-ppt", "ocr-pdf", "rotate-pdf"],
  copy: {
    en: {
      name: "JPG to PDF",
      tagline:
        "Turn JPG photos into a clean PDF in your browser — batch import, drag-free reordering, and A4, Letter or fit-to-image page sizes.",
      intro: [
        "Convert any number of JPG photos into one tidy PDF: ID photos, receipts, homework scans or a camera roll you need to email as a single attachment. Add all the images at once, sort them with the arrow buttons, and choose whether each page hugs the photo or uses A4/Letter with a margin.",
        "The photos are embedded at full original quality — no resizing, no recompression, no watermark. Conversion happens on your device, so even private pictures never touch a server.",
        "Technical detail that matters: the JPEG data is embedded directly into the PDF using the standard DCTDecode filter, which is exactly how professional tools store photos in PDFs. Your camera's bytes are not decoded and re-encoded — quality is bit-identical to the source images, and the PDF grows only by the structure around them.",
        "The two page modes follow different conventions: the fit-to-image mode produces pages with the same aspect ratio as each photo (good for viewing and printing photos as-is), while A4 and Letter mode follow ISO 216 and North American paper standards with a margin you control, so the result prints predictably on office printers."
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
      deepDive: [
        {
          heading: "From camera roll to document: why this conversion exists",
          paragraphs: [
            "Institutions do not accept twenty separate JPEG attachments. A rental application, an insurance claim, an expense report — they want one PDF, pages in order, that can be printed, stamped and archived like a paper document. That is the entire reason JPG-to-PDF exists: it turns a pile of photos into a paginated, ordered, single-file document that bureaucratic systems can handle.",
            "The conversion itself is structurally simple: each JPEG becomes one PDF page, and the JPEG's compressed data can even be embedded as-is, because PDF supports JPEG (DCTDecode) as a native image filter. A well-built converter does not decompress and recompress your photos — it wraps the existing bytes in a page container, which means no quality loss and almost no size growth.",
            "What you choose matters more than what the tool does: the order of the images becomes the page order, and each image's resolution determines how the page behaves when zoomed or printed. The tool's job is to not get in the way — no forced re-compression, no surprise resizing, just faithful packaging.",
          ],
        },
        {
          heading: "Practical assembly habits that save rework",
          paragraphs: [
            "Name your files with leading numbers before you start: 01-front.jpg, 02-inside.jpg, 03-signature.jpg. Filename order is the only ordering everyone agrees on, and it survives every transfer method — messaging apps, cloud folders, email. Photos straight from a camera sort by timestamp, which is fine for chronological sets but useless for \"document order\" that follows a form's structure.",
            "Check orientation before converting. A photo taken with the camera rotated relies on an EXIF orientation flag, and some PDF viewers honor it while some do not, producing sideways pages for the recipient. If a photo displays upright in your file manager but sideways in the finished PDF, the flag is the culprit — rotating the actual pixels fixes it permanently.",
            "For documents meant to be printed, consider whether page size uniformity matters. Wrapping each image at its own size is fine for viewing and archiving; for print, mixed page dimensions can cause scaling surprises at the print shop. Converting first, then normalizing page size in a second pass, keeps each step simple and reversible.",
          ],
        },
        {
          heading: "Photos, IDs and the local-processing question",
          paragraphs: [
            "The most common things people convert with this tool are exactly the most sensitive: passport scans for a visa application, ID photos for account verification, receipts with card numbers visible. Uploading them to a converter site means a copy of your identity documents rests on an unknown server, governed by an unknown retention policy, before you have even checked the output.",
            "This tool performs the packaging in your browser: JPEGs are read locally, embedded into PDF structures by JavaScript, and the result is saved by your own device. The files never traverse the network in any direction, so there is no server log, no third-party copy, and no story to trust about deletion.",
            "There is also a practical dividend: no upload time and no size limits means you can convert a full folder — fifty photos of a property inspection, a whole shoebox of receipts — in one pass. Network-bound converters force you to split batches and wait; locally, the only limit is device memory, and the whole job typically finishes in seconds.",
          ],
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
      deepDive: [
        {
          heading: "从相册到文档:这个转换为什么存在",
          paragraphs: [
            "机构不收二十个单独的 JPEG 附件。租房申请、保险理赔、报销单——他们要的是一个 PDF,页序整齐,可以像纸质文件一样打印、盖章、归档。这就是 JPG 转 PDF 存在的全部理由:把一堆照片变成分页、有序、单文件的文档,让官僚系统能处理。",
            "转换本身结构上很简单:每张 JPEG 变成一页 PDF,而且 JPEG 的压缩数据甚至可以原样嵌入,因为 PDF 原生支持 JPEG(即 DCTDecode)作为图像滤镜。做得好的转换器不会把你的照片解压再压缩——它把现有字节包进页面容器,这意味着零画质损失、体积几乎不涨。",
            "你选什么比工具做什么更重要:图片的顺序就是页面的顺序,每张图的分辨率决定缩放和打印时页面的表现。工具的本分是不添乱——不强制重压缩,不擅自缩放,只做忠实的封装。",
          ],
        },
        {
          heading: "省返工的组装习惯",
          paragraphs: [
            "开始前先给文件加上序号前缀:01-首页.jpg、02-内页.jpg、03-签名.jpg。文件名顺序是唯一人人公认的排序,而且经得起任何传输方式——聊天应用、云盘、邮件都保得住。相机直出的照片按时间戳排序,对时间线素材没问题,对“跟着表单结构走”的文档顺序毫无用处。",
            "转换前检查方向。相机横着拍的照片依赖 EXIF 方向标记,有的 PDF 阅读器认,有的不认,对方看到的就是横着的页面。如果照片在文件管理器里是正的、进了 PDF 却是横的,问题就出在这个标记——把像素真正旋转一遍才能永久解决。",
            "如果要打印,考虑页面尺寸统一是否重要。按各图原尺寸包装适合阅读和归档;打印时页面尺寸混杂,可能在打印店遇到意外缩放。先转换、再用第二步归一化页面尺寸,每一步都简单、可回退。",
          ],
        },
        {
          heading: "照片、证件与本地处理问题",
          paragraphs: [
            "人们用这个工具转的东西,恰恰是最敏感的:签证用的护照扫描、账户验证的证件照、卡号可见的票据。传给转换网站意味着一份你身份证件的副本躺在某个不知名的服务器上,受制于某个你不知道的留存政策——而你还没检查过输出。",
            "本工具在浏览器里完成封装:JPEG 在本地读取,由 JavaScript 嵌入 PDF 结构,结果由你的设备自己保存。文件在任何方向上都不经过网络,所以没有服务器日志、没有第三方副本、没有需要你去相信的删除故事。",
            "还有一笔实际的红利:没有上传等待和体积限制,整个文件夹——一次房屋查验的五十张照片、一整盒票据——一次就能转完。靠网络的转换器逼你分批等;本地处理只受设备内存限制,整个活通常几秒收工。",
          ],
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
      deepDive: [
        {
          heading: "カメラロールから文書へ:この変換が存在する理由",
          paragraphs: [
            "窓口は 20 個のバラの JPEG 添付を受け付けません。賃貸申込、保険請求、経費精算——求められているのは 1 つの PDF で、ページ順が整い、紙の文書のように印刷・押印・保管できるもの。これが JPG から PDF への変換が存在する理由のすべてです。写真の山を、ページ化され、順序付きの、単一ファイルの文書に変え、事務処理システムが扱える形にします。",
            "変換自体は構造的に単純です。各 JPEG が 1 つの PDF ページになり、JPEG の圧縮データはそのまま埋め込めます。PDF は JPEG(DCTDecode)をネイティブの画像フィルタとしてサポートしているからです。きちんと作られた変換器は写真を展開して再圧縮しません。既存のバイト列をページ容器に包むだけで、品質劣化ゼロ、サイズ増もほぼゼロです。",
            "重要なのはツールが何をするかより、あなたが何を選ぶかです。画像の順序がページの順序になり、各画像の解像度が拡大時や印刷時のページの振る舞いを決めます。ツールの務めは邪魔をしないこと——強制的な再圧縮も、勝手なリサイズもなく、ただ忠実に梱包するだけです。",
          ],
        },
        {
          heading: "やり直しを節約する組み立ての習慣",
          paragraphs: [
            "始める前にファイルへ番号の接頭辞を付けます。01-表.jpg、02-中身.jpg、03-署名.jpg。ファイル名順は誰もが同意する唯一の順序で、あらゆる転送手段——チャットアプリ、クラウドフォルダ、メール——を生き延びます。カメラ直出しの写真はタイムスタンプ順に並びます。時系列の素材なら良いですが、フォームの構造に沿った「文書の順序」には役に立ちません。",
            "変換前に向きを確認します。カメラを回して撮った写真は EXIF の向きフラグに依存し、それを解釈する PDF ビューアと解釈しないビューアがあり、受け取り側には横向きページが見えます。ファイラーでは正立なのに完成 PDF では横向きになるなら、フラグが犯人です。実際のピクセルを回転させて初めて恒久解決になります。",
            "印刷を目的とするなら、ページサイズの統一が重要かを考えてください。各画像を原寸で包むのは閲覧と保管には十分です。印刷ではページ寸法の混在が印刷屋での想定外の拡大縮小を招きます。まず変換し、次の工程でページサイズを正規化する二段構えにすると、各段階が単純でやり直し可能です。",
          ],
        },
        {
          heading: "写真・身分証とローカル処理という問い",
          paragraphs: [
            "このツールで変換されるものは、まさに最も機密性の高いものです。ビザ申請のパスポート扫描、アカウント確認の身分証写真、カード番号の見える領収書。変換サイトへアップロードすることは、出力を確認する前に、あなたの身分証のコピーが不明なサーバー上に、不明な保持ポリシーの下で存在することを意味します。",
            "このツールはブラウザ内で梱包を完結させます。JPEG はローカルで読み込まれ、JavaScript が PDF 構造へ埋め込み、結果はあなたの端末が保存します。ファイルはどの方向にもネットワークを通らないので、サーバーログも、第三者のコピーも、削除について信じるべき物語もありません。",
            "実利もあります。アップロード待ちもサイズ制限もないので、フォルダ丸ごと——物件調査の写真 50 枚、領収書の箱ひとつ——を一括で変換できます。ネットワーク前提の変換器は分割と待ちを強いますが、ローカルでは端末メモリだけが制約で、全体は通常数秒で終わります。",
          ],
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
      deepDive: [
        {
          heading: "Del carrete al documento: por qué existe esta conversión",
          paragraphs: [
            "Las instituciones no aceptan veinte adjuntos JPEG sueltos. Una solicitud de alquiler, una reclamación de seguro, una nota de gastos — quieren un solo PDF, con las páginas en orden, que se pueda imprimir, sellar y archivar como un documento de papel. Esa es toda la razón de ser del paso de JPG a PDF: convierte una pila de fotos en un documento paginado, ordenado y de un solo archivo que los sistemas burocráticos pueden manejar.",
            "La conversión en sí es estructuralmente simple: cada JPEG se convierte en una página PDF, y los datos comprimidos del JPEG incluso pueden incrustarse tal cual, porque PDF admite JPEG (DCTDecode) como filtro de imagen nativo. Un conversor bien hecho no descomprime y recomprime tus fotos — envuelve los bytes existentes en un contenedor de página, lo que significa cero pérdida de calidad y casi cero crecimiento de tamaño.",
            "Lo que eliges importa más que lo que hace la herramienta: el orden de las imágenes se convierte en el orden de páginas, y la resolución de cada imagen determina cómo se comporta la página al hacer zoom o imprimir. El trabajo de la herramienta es no estorbar — sin re-compresión forzada, sin redimensionado sorpresa, solo un empaquetado fiel.",
          ],
        },
        {
          heading: "Hábitos de montaje que ahorran rehacer trabajo",
          paragraphs: [
            "Ponle números delante a tus archivos antes de empezar: 01-portada.jpg, 02-interior.jpg, 03-firma.jpg. El orden por nombre de archivo es el único que todo el mundo acepta, y sobrevive a cualquier método de transferencia — apps de mensajería, carpetas en la nube, correo. Las fotos recién salidas de la cámara se ordenan por marca de tiempo, lo cual sirve para series cronológicas pero no para el \"orden de documento\" que sigue la estructura de un formulario.",
            "Comprueba la orientación antes de convertir. Una foto tomada con la cámara girada depende de un indicador de orientación EXIF, y algunos visores de PDF lo respetan y otros no, dejando páginas ladeadas para el destinatario. Si una foto se ve derecha en tu explorador pero ladeada en el PDF final, el indicador es el culpable — rotar los píxeles reales lo arregla para siempre.",
            "Para documentos destinados a imprimirse, considera si importa la uniformidad del tamaño de página. Envolver cada imagen a su propio tamaño sirve para ver y archivar; al imprimir, las dimensiones mezcladas pueden provocar escalados inesperados en la copistería. Convertir primero y normalizar el tamaño de página en una segunda pasada mantiene cada paso simple y reversible.",
          ],
        },
        {
          heading: "Fotos, documentos de identidad y la cuestión del procesamiento local",
          paragraphs: [
            "Lo que la gente convierte con esta herramienta es justo lo más sensible: pasaportes escaneados para un visado, fotos del DNI para verificar cuentas, recibos con números de tarjeta a la vista. Subirlos a un sitio de conversión significa que una copia de tus documentos de identidad descansa en un servidor desconocido, bajo una política de retención desconocida, antes incluso de que hayas revisado el resultado.",
            "Esta herramienta hace el empaquetado en tu navegador: los JPEG se leen en local, se incrustan en estructuras PDF con JavaScript y el resultado lo guarda tu propio dispositivo. Los archivos no cruzan la red en ninguna dirección, así que no hay registro del servidor, ni copia de terceros, ni historia que creerse sobre el borrado.",
            "También hay un dividendo práctico: sin tiempo de subida ni límites de tamaño, puedes convertir una carpeta entera — cincuenta fotos de una inspección de inmueble, una caja entera de recibos — de una sola vez. Los conversores que dependen de la red te obligan a dividir y esperar; en local, el único límite es la memoria del dispositivo, y el trabajo completo suele acabar en segundos.",
          ],
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
      deepDive: [
        {
          heading: "Do rolo da câmera ao documento: por que essa conversão existe",
          paragraphs: [
            "Instituições não aceitam vinte anexos JPEG soltos. Uma inscrição de aluguel, uma reivindicação de seguro, um relatório de despesas — eles querem um só PDF, com as páginas em ordem, que possa ser impresso, carimbado e arquivado como um documento de papel. Essa é toda a razão de existir da conversão de JPG para PDF: transforma uma pilha de fotos num documento paginado, ordenado e de arquivo único que sistemas burocráticos conseguem lidar.",
            "A conversão em si é estruturalmente simples: cada JPEG vira uma página PDF, e os dados comprimidos do JPEG podem até ser embutidos como estão, porque o PDF suporta JPEG (DCTDecode) como filtro de imagem nativo. Um conversor bem feito não descomprime e recomprime suas fotos — ele embrulha os bytes existentes num contêiner de página, o que significa perda de qualidade zero e crescimento de tamanho quase zero.",
            "O que você escolhe importa mais do que o que a ferramenta faz: a ordem das imagens vira a ordem das páginas, e a resolução de cada imagem determina como a página se comporta ao dar zoom ou imprimir. O trabalho da ferramenta é não atrapalhar — sem recompressão forçada, sem redimensionamento surpresa, só um empacotamento fiel.",
          ],
        },
        {
          heading: "Hábitos de montagem que evitam retrabalho",
          paragraphs: [
            "Coloque números na frente dos nomes dos arquivos antes de começar: 01-frente.jpg, 02-miolo.jpg, 03-assinatura.jpg. A ordem por nome de arquivo é a única que todo mundo concorda, e sobrevive a qualquer método de transferência — apps de mensagem, pastas na nuvem, e-mail. Fotos direto da câmera ordenam por data, o que serve para séries cronológicas mas não para a \"ordem de documento\" que segue a estrutura de um formulário.",
            "Confira a orientação antes de converter. Uma foto tirada com a câmera girada depende de uma bandeira de orientação EXIF, e alguns visualizadores de PDF a respeitam e outros não, deixando páginas de lado para o destinatário. Se a foto aparece certa no seu gerenciador de arquivos mas de lado no PDF final, a bandeira é a culpada — girar os pixels de verdade resolve para sempre.",
            "Para documentos destinados a impressão, considere se a uniformidade do tamanho de página importa. Embrulhar cada imagem no próprio tamanho serve para ver e arquivar; ao imprimir, dimensões misturadas podem causar escalonamentos inesperados na gráfica. Converter primeiro e normalizar o tamanho de página numa segunda passada mantém cada passo simples e reversível.",
          ],
        },
        {
          heading: "Fotos, documentos de identidade e a questão do processamento local",
          paragraphs: [
            "O que as pessoas convertem com esta ferramenta é exatamente o mais sensível: passaportes digitalizados para visto, fotos de documentos para verificação de conta, recibos com números de cartão à vista. Enviá-los a um site conversor significa que uma cópia dos seus documentos de identidade repousa num servidor desconhecido, sob uma política de retenção desconhecida, antes mesmo de você conferir o resultado.",
            "Esta ferramenta faz o empacotamento no seu navegador: os JPEGs são lidos localmente, embutidos em estruturas PDF por JavaScript e o resultado é salvo pelo seu próprio dispositivo. Os arquivos não atravessam a rede em nenhuma direção, então não há registro do servidor, nem cópia de terceiros, nem história para acreditar sobre exclusão.",
            "Há também um dividendo prático: sem tempo de envio e sem limite de tamanho, você converte uma pasta inteira — cinquenta fotos de uma vistoria de imóvel, uma caixa inteira de recibos — de uma vez. Conversores dependentes de rede forçam você a dividir lotes e esperar; localmente, o único limite é a memória do dispositivo, e o trabalho todo costuma terminar em segundos.",
          ],
        },
      ],
    },
  },
});
