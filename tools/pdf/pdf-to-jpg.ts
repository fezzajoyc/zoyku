import { PdfToImagesEngine } from "../_engines/pdf-engine-pdf-to-images";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "pdf-to-jpg",
  category: "pdf",
  icon: "image",
  featured: true,
  engine: { component: PdfToImagesEngine, props: { format: "jpg" } },
  related: ["pdf-to-png", "jpg-to-pdf", "compress-pdf", "ocr-pdf", "split-pdf", "delete-pdf-pages", "pdf-to-ppt", "rotate-pdf", "pdf-to-text", "merge-pdf"],
  copy: {
    en: {
      name: "PDF to JPG",
      tagline:
        "Export every PDF page as a JPG image at up to 300 DPI — single pages or a ZIP for many, converted right on your device.",
      intro: [
        "Turn a PDF into shareable images: each page becomes a JPG at the resolution you choose, rendered exactly as the page looks — fonts, colors and images included. Ten pages give you ten numbered files; more than one and you also get a ZIP.",
        "JPG is the format chats, slides and social platforms accept everywhere. Rendering happens locally with pdf.js — the PDF is never uploaded, which matters for contracts and personal documents.",
        "Rendering is done with pdf.js, Mozilla's PDF engine — the same code that powers Firefox's built-in viewer — so complex pages with embedded fonts, transparency and color profiles come out as they look on screen. The resolution setting controls the canvas scale: 150 DPI is a good default for screen sharing, 300 DPI when the images will be printed.",
        "One inherent trade-off to know: JPG is a lossy format, so rendered pages are compressed with slight artifacts around sharp text edges. If you need pixel-perfect captures of text-heavy pages, a PNG-based export preserves those better; this tool is optimized for the universal compatibility and small file size that JPG guarantees."
      ],
      steps: [
        "Drop the PDF you want to convert.",
        "Choose the output resolution (150 DPI suits most screens).",
        "Click Convert and download each page or the ZIP.",
      ],
      faqs: [
        {
          q: "Which resolution should I pick?",
          a: "96 DPI is fine for screen viewing, 150 DPI is the balanced default, and 200–300 DPI suits printing. Higher DPI means bigger files and slower rendering on long documents.",
        },
        {
          q: "Why does text look softer than in the PDF?",
          a: "JPG is a lossy photo format — at low quality, sharp letter edges get slight artifacts. Raise the DPI or use the PDF to PNG tool for pixel-perfect text.",
        },
        {
          q: "Can I convert only some pages?",
          a: "This tool converts the whole document and names files by page number, so you can keep just the ones you need. Use Split PDF first if you want a specific range in advance.",
        },
      ],
      deepDive: [
        {
          heading: "Rasterization: what turning a page into a JPG means",
          paragraphs: [
            "A PDF page is a description — text glyphs, vector shapes, embedded images assembled by a renderer. A JPG is a flat pixel grid. Converting page-to-image means running that description through a renderer at a chosen resolution and saving the result as pixels. Everything that made the PDF special is left behind: text stops being selectable, vector lines stop being infinitely sharp, and the page becomes exactly as sharp as its pixel density allows.",
            "That trade is usually the right one for the intended jobs: dropping a page image into a presentation, posting a document screenshot in chat, attaching a visual preview to an email where the recipient shouldn't edit anything. A rasterized page is also a natural \"read-only\" format — what you send is what they see, with no fonts to substitute and no layout to reflow.",
            "Resolution is the one knob that matters. At 150 DPI, a letter-size page is roughly 1275×1650 pixels — crisp on screen and adequate for everyday printing. At 72 DPI it is lightweight and fine for thumbnails; at 300 DPI it is print-grade but heavy. Choosing by destination (screen vs. print) beats guessing.",
          ],
        },
        {
          heading: "One page or many: output structure and quality",
          paragraphs: [
            "A multi-page PDF cannot be one JPG, so converters either produce a numbered series (page-1.jpg, page-2.jpg, ...) or a ZIP archive. The numbered series is friendlier for picking single pages into other tools; the archive is friendlier for downloading dozens at once. Either way, the numbering follows the PDF's internal page order — which, as with all page tools, may not match any printed page labels if the document had odd numbering.",
            "JPEG compression suits pages with photos and color gradients, where its artifacts are invisible. For pages that are mostly sharp text or line art, JPEG's blocky artifacts can produce faint \"mosquito noise\" around letters at low quality settings; if your output looks slightly fuzzy around text, raise the quality or DPI rather than accepting it.",
            "White background matters more than people expect: JPEG has no transparency, so pages with transparent areas render onto white by default. That is usually desired for documents, but if the source had dark mode or colored backgrounds, check the first output image before running a whole batch.",
          ],
        },
        {
          heading: "Rendering your documents on your own device",
          paragraphs: [
            "A PDF often aggregates a person's paper trail: statements, letters, medical reports, agreements. Rendering pages to images and uploading them to a converter means the complete visual record leaves your device before you have chosen which single page you actually needed. It is worth noting the extracted images are also easy to redistribute — an image file travels further than a PDF with its metadata intact.",
            "This tool renders every page locally in your browser: the PDF is parsed and drawn on your device's canvas at the chosen DPI, encoded to JPEG in memory, and saved by your browser directly. No page image is uploaded, no server renders your documents, and the entire conversion runs with the network disconnected.",
            "Local rendering also means you can be selective with zero overhead: render all pages, then keep only the two you needed, deleting the rest before they ever existed outside your machine. For a one-page figure inside a 100-page report, that selectivity is the whole point — you get the image you wanted and nothing else.",
          ],
        },
      ],
    },
    zh: {
      name: "PDF 转 JPG",
      tagline: "把每一页 PDF 导出为最高 300 DPI 的 JPG 图片——单页逐一下载或多页打包 ZIP,全部在你的设备上转换。",
      intro: [
        "把 PDF 变成方便分享的图片:每一页按你选择的分辨率渲染成 JPG,字体、颜色、图片与原页面一致。10 页就是 10 个编号文件,多页时还会自动提供 ZIP。",
        "JPG 是聊天、幻灯片和社交平台通吃的格式。渲染由 pdf.js 在本地完成——PDF 不会被上传,这对合同和个人文档尤为重要。",
      ],
      steps: [
        "拖入要转换的 PDF。",
        "选择输出分辨率(150 DPI 适合大多数屏幕)。",
        "点击“转换”,逐页下载或下载 ZIP。",
      ],
      faqs: [
        {
          q: "应该选多大分辨率?",
          a: "屏幕查看 96 DPI 就够;150 DPI 是均衡的默认值;要打印选 200–300 DPI。DPI 越高文件越大,长文档渲染也越慢。",
        },
        {
          q: "为什么文字看起来比 PDF 里模糊?",
          a: "JPG 是有损的照片格式,低质量下锐利的笔画边缘会出现轻微伪影。提高 DPI,或改用“PDF 转 PNG”获得像素级清晰的文字。",
        },
        {
          q: "可以只转换部分页面吗?",
          a: "本工具转换整个文档并按页码命名文件,留下需要的即可。想提前圈定范围,可以先用“拆分 PDF”。",
        },
      ],
      deepDive: [
        {
          heading: "栅格化:把页面变成 JPG 意味着什么",
          paragraphs: [
            "PDF 页面是一份描述——文字字形、矢量形状、嵌入图片,由渲染器组装。JPG 是扁平的像素网格。页面转图像,就是让这份描述在选定分辨率下通过渲染器跑一遍,把结果存成像素。PDF 的所有特有优势都留在身后:文字不再可选中,矢量线条不再无限锐利,页面变得只有像素密度允许的那么清晰。",
            "对目标用途来说,这笔交换通常是划算的:把页面图插进演示文稿、在聊天里发文档截图、给不能编辑内容的人发邮件预览。栅格化页面也是一种天然的“只读”格式——你发什么对方看到什么,没有字体替换问题,也没有版式重排。",
            "分辨率是唯一真正重要的旋钮。150 DPI 下,Letter 页面约 1275×1650 像素——屏幕上清晰,日常打印也够。72 DPI 轻巧,适合缩略图;300 DPI 是打印级但很重。按目的地选(屏幕还是打印),比瞎猜强。",
          ],
        },
        {
          heading: "一页还是多页:输出结构与质量",
          paragraphs: [
            "多页 PDF 没法变成一张 JPG,所以转换器要么输出编号序列(page-1.jpg、page-2.jpg……),要么打成 ZIP 包。编号序列适合挑选单页送进其他工具;压缩包适合一次下载几十张。无论哪种,编号都遵循 PDF 的内部页序——和其他页面工具一样,如果文档的页码编排古怪,它未必和印刷页码一致。",
            "JPEG 压缩适合照片和色彩渐变多的页面,压缩痕迹看不出来。对以锐利文字或线稿为主的页面,低质量档位下 JPEG 的块状伪影会在字周围产生淡淡的“蚊噪”;如果输出的文字周围看着发糊,调高质量或 DPI,别硬接受。",
            "白色背景比想象的更重要:JPEG 不支持透明,所以带透明区域的页面默认衬白。文档场景通常正合适,但如果源文件是深色模式或彩色背景,先检查第一张输出图,再跑整批。",
          ],
        },
        {
          heading: "在你自己的设备上渲染文档",
          paragraphs: [
            "PDF 常常汇总着一个人的纸质轨迹:对账单、信件、医疗报告、协议。把页面渲染成图像再上传给转换器,意味着完整的视觉记录在你选出真正需要的那一页之前就离开了设备。值得注意:提取出的图像也更容易流转——图像文件带着元数据跑得比 PDF 还远。",
            "本工具在浏览器里本地渲染每一页:PDF 在你设备的 canvas 上按所选 DPI 解析并绘制,在内存里编码为 JPEG,由浏览器直接保存。没有任何页面图像被上传,没有服务器渲染你的文档,整个转换在断网状态下照跑。",
            "本地渲染还意味着选择成本为零:全部渲染出来,只留你需要的两张,其余在离开你机器之前就删掉。100 页报告里要一张图,选择性就是全部意义——你拿到想要的图,别的什么都不带走。",
          ],
        },
      ],
    },
    ja: {
      name: "PDF を JPG に変換",
      tagline: "PDF の各ページを最大 300 DPI の JPG 画像として書き出し。1 ページずつでも ZIP 一括でも、変換はすべて端末内で行われます。",
      intro: [
        "PDF を共有しやすい画像に変換します。各ページが選択した解像度の JPG になり、フォント・色・画像も見た目どおりに描画されます。10 ページなら 10 個の連番ファイル、複数ページなら ZIP も用意されます。",
        "JPG はチャット・スライド・SNS のどこでも使える形式です。描画は pdf.js によるローカル処理で、PDF はアップロードされません。契約書や個人文書でも安心です。",
      ],
      steps: [
        "変換したい PDF をドロップします。",
        "出力解像度を選びます(150 DPI が標準的です)。",
        "「変換」をクリックし、各ページまたは ZIP をダウンロードします。",
      ],
      faqs: [
        {
          q: "解像度はどれを選ぶべき?",
          a: "画面表示なら 96 DPI、バランス重視の既定は 150 DPI、印刷は 200〜300 DPI が目安です。DPI が高いほどファイルは大きく、長い文書の描画も遅くなります。",
        },
        {
          q: "文字が PDF よりにじんで見えるのはなぜ?",
          a: "JPG は非可逆の写真形式で、低品質では文字のエッジに軽いノイズが出ます。DPI を上げるか、「PDF を PNG に」を使うとテキストがピクセル単位でくっきりします。",
        },
        {
          q: "一部のページだけ変換できますか?",
          a: "このツールは文書全体を変換し、ページ番号付きで保存します。必要なものだけ残してください。範囲を先に絞りたい場合は「PDF 分割」を併用できます。",
        },
      ],
      deepDive: [
        {
          heading: "ラスタライズ:ページを JPG にすると何が起きるか",
          paragraphs: [
            "PDF のページは記述です。文字の字形、ベクタ図形、埋め込み画像がレンダラによって組み立てられます。JPG は平坦なピクセル格子です。ページから画像への変換は、その記述を選んだ解像度でレンダラに通し、結果をピクセルとして保存することです。PDF を特別にしていたものはすべて置き去りになります。テキストは選択できなくなり、ベクタの線は無限に鋭くなくなり、ページはピクセル密度が許す分しか鋭くなりません。",
            "意図した用途にはこの交換がたいてい正解です。プレゼンへのページ画像の差し込み、チャットでの文書スクリーンショット、受け手に編集してほしくないメール添付のプレビュー。ラスタライズされたページは自然な「読み取り専用」形式でもあります。送ったものがそのまま見え、フォントの代替も、レイアウトの流し直しもありません。",
            "解像度が唯一効くつまみです。150 DPI ではレターサイズ 1 ページは約 1275×1650 ピクセル。画面では鮮明で、日常印刷にも足ります。72 DPI は軽くサムネイル向き、300 DPI は印刷級ですが重い。宛先(画面か印刷か)で選ぶのが当て推量より確実です。",
          ],
        },
        {
          heading: "1 ページか複数か:出力構造と品質",
          paragraphs: [
            "複数ページの PDF は一枚の JPG にはなり得ないので、変換器は番号付きの連番(page-1.jpg、page-2.jpg…)を出すか、ZIP 書庫にまとめるかのどちらかです。連番は単一ページを他のツールへ拾うのに便利で、書庫は数十枚を一度に落とすのに便利です。どちらでも番号は PDF の内部ページ順に従います。すべてのページツールと同様、文書の番号付けが変わっていれば印刷ラベルとは一致しないことがあります。",
            "JPEG 圧縮は写真や色のグラデーションの多いページに適し、その圧縮跡は見えません。鋭い文字や線画が中心のページでは、低品質設定で JPEG のブロックノイズが文字の周りに淡い「モスキートノイズ」を出すことがあります。出力の文字の周りがわずかににじんで見えたら、受け入れるのではなく品質か DPI を上げてください。",
            "白背景は思ったより重要です。JPEG に透過はないので、透明領域のあるページは既定で白に載ります。文書ならたいてい望ましい動作ですが、ソースがダークモードや色付き背景なら、一括実行の前にまず最初の出力画像を確認してください。",
          ],
        },
        {
          heading: "自分の端末で文書をレンダリングする",
          paragraphs: [
            "PDF はよく、人の紙の軌跡を一つにまとめています。明細、手紙、診療記録、合意書。ページを画像にして変換器へアップロードすることは、本当に必要だった一页を選ぶ前に、視覚記録の全体が端末を離れることを意味します。付け加えると、取り出した画像は転がりやすいものです。メタデータを持った画像ファイルは PDF より遠くまで旅します。",
            "このツールは全ページをブラウザ内でローカルにレンダリングします。PDF は端末の canvas 上で選択 DPI により解析・描画され、メモリ内で JPEG に符号化され、ブラウザが直接保存します。ページ画像は一つもアップロードされず、サーバーがあなたの文書を描画することもなく、変換全体は回線を切って動きます。",
            "ローカル描画は選別のオーバーヘッドもゼロにします。全ページを描き、必要な二枚だけを残し、残りは端末の外に存在する前に削除する。100 ページの報告書の中の一枚の図には、この選別こそがすべての意味です。欲しい画像だけを受け取り、他は何も持ち出さない。",
          ],
        },
      ],
    },
    es: {
      name: "PDF a JPG",
      tagline:
        "Exporta cada página de un PDF como imagen JPG de hasta 300 DPI: páginas sueltas o un ZIP para muchas, convertido en tu propio dispositivo.",
      intro: [
        "Convierte un PDF en imágenes fáciles de compartir: cada página se convierte en un JPG a la resolución que elijas, dibujada tal y como se ve la página: fuentes, colores e imágenes incluidos. Diez páginas dan diez archivos numerados; si hay varios, también un ZIP.",
        "JPG es el formato que aceptan chats, presentaciones y redes sociales. El renderizado es local con pdf.js: el PDF nunca se sube, algo importante en contratos y documentos personales.",
      ],
      steps: [
        "Suelta el PDF que quieres convertir.",
        "Elige la resolución de salida (150 DPI va bien para pantalla).",
        "Pulsa Convertir y descarga cada página o el ZIP.",
      ],
      faqs: [
        {
          q: "¿Qué resolución elijo?",
          a: "96 DPI basta para ver en pantalla, 150 DPI es el valor equilibrado y 200–300 DPI sirve para imprimir. Cuanto mayor el DPI, más pesan los archivos y más tarda el renderizado en documentos largos.",
        },
        {
          q: "¿Por qué el texto se ve más suave que en el PDF?",
          a: "JPG es un formato fotográfico con pérdida: a baja calidad, los bordes de las letras sufren ligeras alteraciones. Sube el DPI o usa PDF a PNG para un texto píxel-perfecto.",
        },
        {
          q: "¿Puedo convertir solo algunas páginas?",
          a: "Esta herramienta convierte todo el documento y nombra los archivos por página, así que puedes quedarte con las que necesites. Usa Dividir PDF antes si quieres fijar un rango concreto.",
        },
      ],
      deepDive: [
        {
          heading: "Rasterización: qué significa convertir una página en JPG",
          paragraphs: [
            "Una página PDF es una descripción — glifos de texto, formas vectoriales, imágenes incrustadas ensambladas por un renderizador. Un JPG es una rejilla plana de píxeles. Convertir página a imagen significa pasar esa descripción por un renderizador a la resolución elegida y guardar el resultado como píxeles. Todo lo que hacía especial al PDF se queda atrás: el texto deja de ser seleccionable, las líneas vectoriales dejan de ser infinitamente nítidas, y la página queda exactamente tan nítida como su densidad de píxeles permita.",
            "Ese intercambio suele ser el correcto para los trabajos previstos: meter una imagen de página en una presentación, publicar una captura del documento en un chat, adjuntar una vista previa a un correo donde el destinatario no debería editar nada. Una página rasterizada es además un formato natural de \"solo lectura\" — lo que envías es lo que ven, sin fuentes que sustituir ni maquetación que refluir.",
            "La resolución es el único mando que importa. A 150 DPI, una página carta ronda los 1275×1650 píxeles — nítida en pantalla y suficiente para impresión cotidiana. A 72 DPI es ligera y vale para miniaturas; a 300 DPI es de imprenta pero pesada. Elegir según destino (pantalla o papel) vence a adivinar.",
          ],
        },
        {
          heading: "Una página o muchas: estructura y calidad de la salida",
          paragraphs: [
            "Un PDF multipágina no puede ser un solo JPG, así que los conversores producen o bien una serie numerada (pagina-1.jpg, pagina-2.jpg, ...) o bien un archivo ZIP. La serie numerada es más amable para elegir páginas sueltas hacia otras herramientas; el ZIP es más amable para descargar decenas de golpe. En cualquier caso, la numeración sigue el orden interno de páginas del PDF — que, como en todas las herramientas de páginas, puede no coincidir con las etiquetas impresas si el documento tenía numeración rara.",
            "La compresión JPEG favorece páginas con fotos y degradados de color, donde sus artefactos son invisibles. Para páginas de texto nítido o arte lineal, los artefactos en bloque del JPEG pueden producir un tenue \"ruido de mosquito\" alrededor de las letras en calidades bajas; si la salida se ve algo borrosa junto al texto, sube la calidad o el DPI en vez de aceptarlo.",
            "El fondo blanco importa más de lo que se espera: JPEG no tiene transparencia, así que las páginas con zonas transparentes se representan sobre blanco por defecto. Para documentos suele ser lo deseado, pero si el origen tenía modo oscuro o fondos de color, revisa la primera imagen antes de procesar el lote entero.",
          ],
        },
        {
          heading: "Renderizar tus documentos en tu propio dispositivo",
          paragraphs: [
            "Un PDF a menudo agrega el rastro en papel de una persona: extractos, cartas, informes médicos, acuerdos. Renderizar páginas a imágenes y subirlas a un conversor significa que el registro visual completo sale de tu dispositivo antes de que hayas elegido la única página que realmente necesitabas. Vale añadir que las imágenes extraídas también circulan con facilidad — un archivo de imagen viaja más lejos que un PDF con sus metadatos intactos.",
            "Esta herramienta renderiza cada página localmente en tu navegador: el PDF se analiza y se dibuja en el canvas de tu dispositivo al DPI elegido, se codifica a JPEG en memoria y tu navegador lo guarda directamente. No se sube ninguna imagen de página, ningún servidor renderiza tus documentos, y toda la conversión funciona con la red desconectada.",
            "El renderizado local también significa que puedes ser selectivo sin coste: renderiza todas las páginas, quédate solo con las dos que necesitabas y borra el resto antes de que existan fuera de tu máquina. Para una única figura dentro de un informe de 100 páginas, esa selectividad es todo el punto — obtienes la imagen que querías y nada más.",
          ],
        },
      ],
    },
    pt: {
      name: "PDF para JPG",
      tagline:
        "Exporte cada página de um PDF como imagem JPG de até 300 DPI — páginas individuais ou um ZIP para muitas, convertido no seu dispositivo.",
      intro: [
        "Transforme um PDF em imagens fáceis de compartilhar: cada página vira um JPG na resolução escolhida, renderizada exatamente como aparece — fontes, cores e imagens incluídas. Dez páginas geram dez arquivos numerados; com vários, você também recebe um ZIP.",
        "JPG é o formato aceito em chats, slides e redes sociais. A renderização é local com pdf.js — o PDF nunca é enviado, o que importa em contratos e documentos pessoais.",
      ],
      steps: [
        "Solte o PDF que quer converter.",
        "Escolha a resolução de saída (150 DPI serve para a maioria das telas).",
        "Clique em Converter e baixe cada página ou o ZIP.",
      ],
      faqs: [
        {
          q: "Qual resolução escolher?",
          a: "96 DPI basta para ver na tela, 150 DPI é o padrão equilibrado e 200–300 DPI servem para impressão. Quanto maior o DPI, maiores os arquivos e mais lenta a renderização em documentos longos.",
        },
        {
          q: "Por que o texto fica mais suave que no PDF?",
          a: "JPG é um formato fotográfico com perdas — em qualidade baixa, as bordas das letras ganham pequenos artefatos. Aumente o DPI ou use PDF para PNG para um texto pixel-perfect.",
        },
        {
          q: "Posso converter só algumas páginas?",
          a: "Esta ferramenta converte o documento inteiro e nomeia os arquivos por página, então basta manter as que precisar. Use Dividir PDF antes se quiser fixar um intervalo específico.",
        },
      ],
      deepDive: [
        {
          heading: "Rasterização: o que significa transformar uma página em JPG",
          paragraphs: [
            "Uma página PDF é uma descrição — glifos de texto, formas vetoriais, imagens embutidas montadas por um renderizador. Um JPG é uma grade plana de pixels. Converter página em imagem significa passar essa descrição por um renderizador na resolução escolhida e salvar o resultado como pixels. Tudo que fazia o PDF especial fica para trás: o texto deixa de ser selecionável, as linhas vetoriais deixam de ser infinitamente nítidas, e a página fica exatamente tão nítida quanto sua densidade de pixels permitir.",
            "Essa troca costuma ser a certa para os trabalhos pretendidos: colocar a imagem de uma página numa apresentação, postar uma captura do documento no chat, anexar uma prévia a um e-mail em que o destinatário não deveria editar nada. Uma página rasterizada é também um formato natural de \"somente leitura\" — o que você envia é o que veem, sem fontes para substituir nem layout para refluir.",
            "A resolução é o único botão que importa. A 150 DPI, uma página letter tem cerca de 1275×1650 pixels — nítida na tela e suficiente para impressão cotidiana. A 72 DPI é leve e serve para miniaturas; a 300 DPI é nível impressão mas pesada. Escolher pelo destino (tela ou papel) vence adivinhar.",
          ],
        },
        {
          heading: "Uma página ou muitas: estrutura e qualidade da saída",
          paragraphs: [
            "Um PDF multipágina não pode ser um único JPG, então os conversores produzem ou uma série numerada (pagina-1.jpg, pagina-2.jpg, ...) ou um arquivo ZIP. A série numerada é mais amigável para escolher páginas soltas para outras ferramentas; o ZIP é mais amigável para baixar dezenas de uma vez. Em qualquer caso, a numeração segue a ordem interna de páginas do PDF — que, como em todas as ferramentas de páginas, pode não bater com rótulos impressos se o documento tinha numeração esquisita.",
            "A compressão JPEG favorece páginas com fotos e degradês de cor, onde seus artefatos são invisíveis. Para páginas de texto nítido ou arte em linha, os artefatos em bloco do JPEG podem produzir um leve \"ruído de mosquito\" ao redor das letras em qualidades baixas; se a saída parecer um pouco borrada junto ao texto, suba a qualidade ou o DPI em vez de aceitar.",
            "O fundo branco importa mais do que se espera: JPEG não tem transparência, então páginas com áreas transparentes são renderizadas sobre branco por padrão. Para documentos costuma ser o desejado, mas se a origem tinha modo escuro ou fundos coloridos, confira a primeira imagem antes de rodar o lote inteiro.",
          ],
        },
        {
          heading: "Renderizar seus documentos no seu próprio dispositivo",
          paragraphs: [
            "Um PDF frequentemente agrega o rastro em papel de uma pessoa: extratos, cartas, laudos médicos, acordos. Renderizar páginas em imagens e enviá-las a um conversor significa que o registro visual completo sai do seu dispositivo antes de você ter escolhido a única página que realmente precisava. Vale acrescentar que as imagens extraídas também circulam com facilidade — um arquivo de imagem viaja mais longe que um PDF com seus metadados intactos.",
            "Esta ferramenta renderiza cada página localmente no seu navegador: o PDF é analisado e desenhado no canvas do seu dispositivo no DPI escolhido, codificado em JPEG na memória e salvo diretamente pelo navegador. Nenhuma imagem de página é enviada, nenhum servidor renderiza seus documentos, e toda a conversão roda com a rede desconectada.",
            "A renderização local também significa que você pode ser seletivo sem custo: renderize todas as páginas, fique só com as duas que precisava e apague o resto antes que existam fora da sua máquina. Para uma única figura dentro de um relatório de 100 páginas, essa seletividade é todo o ponto — você recebe a imagem que queria e nada mais.",
          ],
        },
      ],
    },
  },
});
