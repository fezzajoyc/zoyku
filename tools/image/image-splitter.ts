import { ImageSplitterEngine } from "../_engines/image-engine-splitter";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "image-splitter",
  category: "image",
  icon: "crop",
  engine: { component: ImageSplitterEngine },
  related: ["merge-images", "crop-image", "image-resizer", "image-compressor", "convert-image", "image-border", "compress-image-to-size", "grayscale-image", "crop-circle-image", "heic-to-jpg"],
  copy: {
    en: {
      name: "Split Image",
      tagline:
        "Slice one image into an even rows × columns grid of PNG tiles — live grid preview, ZIP download, everything processed locally in your browser.",
      intro: [
        "Cut a large picture into grid tiles for Instagram grids, print layouts, sprite sheets or slideshow steps. Choose 2–6 rows and 2–6 columns, watch the grid overlay snap onto your image, then export every tile as a lossless PNG.",
        "Tiles cut from the same image keep their pixel positions, so the pieces reassemble perfectly. When the size does not divide evenly, regular tiles use whole-pixel sizes and the last row and column absorb the leftover pixels — nothing is stretched.",
      
        "Each tile is produced by drawing the source image into a per-tile canvas offset — no scaling, no resampling, so a 3000×2000 image split into 3×2 yields six 1000×1000 tiles with pixel-perfect content. When dimensions do not divide evenly, the remainder lands on the last row and column as extra pixels rather than a stretch.",
        "Compared with manually cropping tiles in an editor or running an ImageMagick one-liner, the visual grid preview removes all arithmetic — you see the seams before cutting. And because everything is drawn locally, a 40-megapixel scan splits into tiles in your tab without uploading gigabytes or installing command-line tools.",
      ],
      steps: [
        "Drop in one image.",
        "Set the number of rows and columns (2–6 each) — the preview shows the grid.",
        "Split into tiles and check each piece.",
        "Download tiles individually or grab all of them in one ZIP.",
      ],
      faqs: [
        {
          q: "What happens if the size is not divisible by the grid?",
          a: "Regular tiles get floor(width ÷ columns) × floor(height ÷ rows) pixels, and the last row and column absorb the remainder. A 305 × 205 image in 3 columns × 2 rows gives 101 × 102 px tiles with the last column 103 px wide. Every tile is a whole number of pixels — no stretching, no gaps.",
        },
        {
          q: "In what order are the tiles named?",
          a: "Row by row, left to right: photo-r1c1.png, photo-r1c2.png … photo-r3c4.png. The rNcM suffix tells you exactly where each tile sits, so reassembly is trivial.",
        },
        {
          q: "Why PNG output?",
          a: "PNG is lossless, so tiles keep the exact pixels of the source. That matters when the pieces will be stitched back together or used as sprites.",
        },
      ],
      deepDive: [
        {
          heading: "How a clean split works — and why pixel math matters",
          paragraphs: [
            "Splitting an image is only lossless when the grid divides the dimensions evenly. A 1600×1200 photo split into 2×2 tiles gives four clean 800×600 pieces; the same photo split into 3 columns leaves a 4-pixel remainder that someone has to decide about — pad, stretch or shrink. This tool rounds the tile size down and keeps every cut on an exact pixel boundary, so no tile is resampled.",
            "That pixel-boundary rule is why grid mode asks for rows and columns rather than a target tile size in centimeters or inches: image coordinates live in pixels, and any conversion through physical units introduces fractional coordinates that force interpolation and soften edges.",
            "The strip mode is the same idea in one dimension: cut the image into horizontal bands of equal pixel height. It is the standard workflow for turning a tall full-page screenshot into carousel slides or step-by-step documentation images that read in order.",
          ],
        },
        {
          heading: "Choosing a layout: grid, strips and social presets",
          paragraphs: [
            "Grid mode (rows × columns) suits collages and puzzle-style posts where the pieces reassemble visually. Strip mode suits content with a reading order — tutorials, long receipts, chat logs — where each band continues the previous one. Picking the wrong mode is the most common mistake: a chat screenshot cut into a 3×3 grid reads in the wrong order on a carousel.",
            "For social carousels, think in the platform's aspect ratio first: a square 1080×1080 canvas means a wide screenshot should usually be cut into strips of that height, not squeezed into a grid. Some platforms re-crop off-ratio uploads, so keeping tiles at native ratio avoids double-cropping artifacts.",
            "Overlapping cuts are worth considering for readability: when a text line sits exactly on a cut line it gets sliced in half. Cutting slightly taller tiles, or re-cropping the source so lines fall between cuts, fixes what no splitting algorithm can.",
          ],
        },
        {
          heading: "Output format and local processing",
          paragraphs: [
            "PNG output keeps text and hard edges crisp — screenshots and documents should almost always stay PNG, because JPG's lossy compression adds ringing artifacts around letters at every re-save. JPG output suits photographic tiles where size matters more than pixel-perfect edges.",
            "Naming matters when tiles must reassemble: consistent numbered filenames (in row-major order) let you and your audience reconstruct the original. A 3×2 split of a diagram without ordered names is a folder of mystery fragments.",
            "Every cut happens in your browser: the image is decoded to a canvas, sliced and re-encoded locally. Nothing is uploaded — useful when splitting internal dashboards, client screenshots or any document you would not hand to a third-party service.",
          ],
        },
      ],
    },
    zh: {
      name: "图片切分",
      tagline:
        "把一张图片按行列切成网格 PNG 小块:实时网格预览、整数像素切块、ZIP 打包下载,可完美拼回原图,全程浏览器本地完成。",
      intro: [
        "把大图切成网格小块:九宫格发帖、打印拼版、精灵图或幻灯片都用得上。行数和列数各 2–6 可选,网格线实时叠在图片上,确认后导出全部无损 PNG 小块。",
        "同一张图切出的小块保持原始像素位置,可以完美拼回。尺寸除不尽时,常规小块按整数像素计算,余下的像素由最后一行和最后一列吸收——不会拉伸变形。",
      ],
      steps: [
        "拖入一张图片。",
        "设置行数和列数(各 2–6),预览区实时显示切分网格。",
        "点击切分,逐块检查。",
        "逐块下载,或打包成一个 ZIP。",
      ],
      faqs: [
        {
          q: "尺寸除不尽怎么办?",
          a: "常规小块取 floor(宽 ÷ 列数) × floor(高 ÷ 行数),余下的像素归最后一行和最后一列。比如 305 × 205 按 3 列 2 行切,小块是 101 × 102 像素,最后一列 103 像素宽。每块都是完整像素,不拉伸、不留缝。",
        },
        {
          q: "切块按什么顺序命名?",
          a: "按行从左到右:photo-r1c1.png、photo-r1c2.png……photo-r3c4.png。后缀 rNcM 标明每块的位置,拼回时一目了然。",
        },
        {
          q: "为什么输出 PNG?",
          a: "PNG 是无损格式,切块保留源图的精确像素。需要重新拼接或当精灵图使用时,这一点很重要。",
        },
      ],
      deepDive: [
        {
          heading: "干净切图的原理:像素对齐为什么重要",
          paragraphs: [
            "只有当网格能整除图片尺寸时,切图才是无损的。1600×1200 的照片按 2×2 切出四块干净的 800×600;同一张照片按 3 列切会剩下 4 像素的余数,必须决定怎么处理——补边、拉伸还是压缩。本工具把块尺寸向下取整,保证每条切线都落在精确的像素边界上,任何一块都不需要重采样。",
            "正因如此,网格模式按行数和列数来切,而不是按厘米或英寸的目标块尺寸:图片坐标以像素为单位,经过物理单位换算会产生小数坐标,迫使插值发生、边缘变糊。",
            "长条模式是同一思路的一维版本:把图片按等高的像素带横向切开。它是把竖长的整页截图变成轮播图或按步骤阅读的文档图的标准做法。",
          ],
        },
        {
          heading: "布局怎么选:网格、长条与社交预设",
          paragraphs: [
            "网格模式(行 × 列)适合拼贴和拼图式帖子,各块在视觉上能重新组合;长条模式适合有阅读顺序的内容——教程、长票据、聊天记录,每一带承接上一带。最常见的错误是选错模式:聊天截图按 3×3 网格切到轮播图上,阅读顺序全乱了。",
            "做社交轮播时先想平台的宽高比:1080×1080 的方形画布意味着宽截图通常应切成该高度的长条,而不是硬塞进网格。部分平台会对比例不符的上传再裁剪,保持每块原生比例能避免二次裁剪的痕迹。",
            "文字正好压在切线上会被切成两半,这种问题任何切图算法都救不了,只能靠把块切得略高一点,或者先微调原图让文字行落在切线之间。",
          ],
        },
        {
          heading: "输出格式与本地处理",
          paragraphs: [
            "PNG 输出能让文字和硬边缘保持锐利——截图和文档几乎永远该用 PNG,因为 JPG 的有损压缩会在每次保存时给字母周围加上振铃伪影。JPG 适合照片类切块,体积比逐像素还原更重要。",
            "当切块需要重新拼合时,命名很关键:一致的编号文件名(按行优先顺序)让你和读者都能还原原图。一张 3×2 切开的示意图,如果没有有序命名,就只是一文件夹不明碎片。",
            "所有切分都在浏览器内完成:图片解码到画布、切片、本地重新编码。什么都不上传——拆分内部后台截图、客户截图或任何不想交给第三方服务的文档时,这一点很关键。",
          ],
        },
      ],
    },
    ja: {
      name: "画像を分割",
      tagline:
        "1 枚の画像を行 × 列のグリッドに分割して PNG タイルとして書き出し。グリッドはリアルタイムプレビュー、ZIP 一括保存、元通りに組み立て直せます。",
      intro: [
        "大きな画像をグリッドに切り分けます。Instagram のグリッド投稿、印刷レイアウト、スプライトシート、スライド素材に。行・列とも 2〜6 を選べ、グリッド線が画像に重なってリアルタイムに表示され、全タイルをロスレス PNG で書き出せます。",
        "同じ画像から切ったタイルは元のピクセル位置を保つので、ぴったり組み立て直せます。サイズが割り切れない場合は通常タイルが整数ピクセルになり、余りは最終行・最終列が吸収します——引き伸ばしはありません。",
      ],
      steps: [
        "画像を 1 枚ドロップします。",
        "行数と列数を設定(それぞれ 2〜6)。プレビューにグリッドが表示されます。",
        "分割してタイルを確認します。",
        "タイルを個別にダウンロード、または ZIP で一括保存します。",
      ],
      faqs: [
        {
          q: "サイズが割り切れないときは?",
          a: "通常タイルは floor(幅 ÷ 列数) × floor(高さ ÷ 行数) ピクセルになり、余りは最終行・最終列が引き取ります。例えば 305 × 205 を 3 列 × 2 行に切ると 101 × 102 px、最終列だけ 103 px 幅です。全タイルが整数ピクセルで、伸縮も隙間もありません。",
        },
        {
          q: "タイルの名前はどんな順番?",
          a: "上の行から左→右へ:photo-r1c1.png、photo-r1c2.png……photo-r3c4.png。rNcM の接尾辞がタイルの位置を示すので、組み立て直しも簡単です。",
        },
        {
          q: "出力が PNG なのはなぜ?",
          a: "PNG はロスレスなので、タイルは元画像のピクセルをそのまま保ちます。再結合やスプライト用途では重要なポイントです。",
        },
      ],
      deepDive: [
        {
          heading: "きれいに分割する仕組み:ピクセル境界の重要性",
          paragraphs: [
            "画像の分割がロスレスになるのは、グリッドが寸法を割り切るときだけです。1600×1200 の写真を 2×2 に切れば 800×600 が4枚きれいに揃います。同じ写真を3列に切ると4ピクセルの余りが出て、パディングか引き伸ばしか縮小かの判断を迫られます。このツールはタイルサイズを切り捨て、全カットを正確なピクセル境界に置くため、再サンプリングは発生しません。",
            "だからこそグリッドモードはセンチやインチの目標サイズではなく、行数と列数で指定します。画像座標はピクセル単位であり、物理単位を経由すると小数座標が生まれ、補間が起きてエッジがにじみます。",
            "ストリップモードは同じ発想の一次元版:画像を等高のピクセル帯で横に切ります。縦長のフルページスクリーンショットをカルーセルや順序付きの手順画像に変換する標準ワークフローです。",
          ],
        },
        {
          heading: "レイアウトの選び方:グリッド・ストリップ・SNS プリセット",
          paragraphs: [
            "グリッドモード(行 × 列)は、ピースが視覚的に再構成されるコラージュやパズル風投稿向き。ストリップモードは、チュートリアル・長いレシート・チャットログなど読む順序があるコンテンツ向きで、各帯が前の帯に続きます。よくある失敗はモードの選び間違い:チャットのスクショを 3×3 で切るとカルーセル上で読む順番が崩れます。",
            "SNS カルーセルではまずプラットフォームのアスペクト比で考える:1080×1080 の正方形キャンバスなら、横長スクショは通常その高さのストリップに切るべきで、グリッドに無理に収めない。比率が違うアップロードを再クロップする平台もあり、タイルをネイティブ比率に保つことが二重クロップの痕跡を防ぎます。",
            "読みやすさのためにはカット位置の工夫も有効:テキスト行がちょうど切線上にあると真っ二つになります。タイルをやや高めに切る、元画像を調整して行を切線の間に置く——これが唯一の対策です。",
          ],
        },
        {
          heading: "出力形式とローカル処理",
          paragraphs: [
            "PNG 出力は文字とハードエッジをシャープに保ちます。スクリーンショットや文書はほぼ常に PNG であるべきで、JPG の非可逆圧縮は保存のたびに文字の周りにリンギングアーティファクトを足します。JPG はボリュームがピクセル一致より重要な写真タイル向きです。",
            "タイルを再構成するなら命名が重要:一貫した番号付きファイル名(行優先順)があれば、作者も読み手も元画像を復元できます。順序のない 3×2 分割の図解は、謎の断片フォルダでしかありません。",
            "すべてのカットはブラウザ内で実行:画像はキャンバスにデコードされ、スライスされ、ローカルで再エンコードされます。アップロードは一切なし。社内ダッシュボードやクライアントのスクショ、第三者サービスに渡したくない文書の分割に向いています。",
          ],
        },
      ],
    },
    es: {
      name: "Dividir imagen",
      tagline:
        "Corta una imagen en una cuadrícula de filas × columnas con mosaicos PNG: vista previa de la cuadrícula, descarga en ZIP, todo local.",
      intro: [
        "Divide una imagen grande en mosaicos para cuadrículas de Instagram, maquetación impresa, sprites o pasos de una presentación. Elige de 2 a 6 filas y de 2 a 6 columnas, mira la cuadrícula superponerse a tu imagen y exporta cada mosaico como PNG sin pérdida.",
        "Los mosaicos de una misma imagen conservan sus posiciones en píxeles, así que vuelven a encajar a la perfección. Si el tamaño no divide exacto, los mosaicos regulares usan píxeles enteros y la última fila y columna absorben el resto: nada se estira.",
      ],
      steps: [
        "Suelta una imagen.",
        "Fija el número de filas y columnas (2–6 cada una): la vista previa muestra la cuadrícula.",
        "Divide en mosaicos y revisa cada pieza.",
        "Descarga los mosaicos uno a uno o todos juntos en un ZIP.",
      ],
      faqs: [
        {
          q: "¿Qué pasa si el tamaño no es divisible por la cuadrícula?",
          a: "Cada mosaico regular mide floor(ancho ÷ columnas) × floor(alto ÷ filas), y la última fila y columna se quedan el resto. Por ejemplo, 305 × 205 en 3 columnas × 2 filas da mosaicos de 101 × 102 px, con la última columna de 103 px de ancho. Todos los mosaicos quedan en píxeles enteros: sin estirar ni dejar huecos.",
        },
        {
          q: "¿En qué orden se nombran los mosaicos?",
          a: "Fila a fila, de izquierda a derecha: foto-r1c1.png, foto-r1c2.png … foto-r3c4.png. El sufijo rNcM indica la posición exacta de cada mosaico, así que recomponer es trivial.",
        },
        {
          q: "¿Por qué salida PNG?",
          a: "PNG es sin pérdida: los mosaicos conservan los píxeles exactos del original. Importa cuando las piezas se van a volver a unir o usar como sprites.",
        },
      ],
      deepDive: [
        {
          heading: "Cómo funciona un corte limpio y por qué importan los píxeles",
          paragraphs: [
            "Dividir una imagen solo es sin pérdida cuando la rejilla reparte las dimensiones de forma exacta. Una foto de 1600×1200 dividida en 2×2 da cuatro piezas limpias de 800×600; la misma foto en 3 columnas deja un resto de 4 píxeles que alguien debe resolver: rellenar, estirar o encoger. Esta herramienta redondea el tamaño de tile hacia abajo y mantiene cada corte en un límite exacto de píxel, así que ningún tile se remuestrea.",
            "Esa regla del límite de píxel explica por qué el modo rejilla pide filas y columnas en vez de un tamaño de tile en centímetros o pulgadas: las coordenadas de imagen viven en píxeles, y cualquier conversión por unidades físicas introduce coordenadas fraccionarias que fuerzan interpolación y suavizan los bordes.",
            "El modo de tiras es la misma idea en una dimensión: cortar la imagen en bandas horizontales de igual altura en píxeles. Es el flujo estándar para convertir una captura de página completa en diapositivas de carrusel o imágenes de documentación que se leen en orden.",
          ],
        },
        {
          heading: "Elegir disposición: rejilla, tiras y plantillas sociales",
          paragraphs: [
            "El modo rejilla (filas × columnas) va bien para collages y publicaciones tipo puzle donde las piezas se recomponen a la vista. El modo tiras sirve para contenido con orden de lectura — tutoriales, tiques largos, chats — donde cada banda continúa la anterior. El error más común es elegir el modo equivocado: una captura de chat cortada en 3×3 se lee en desorden en un carrusel.",
            "Para carruseles sociales, piensa primero en la relación de aspecto de la plataforma: con un lienzo de 1080×1080, una captura ancha suele cortarse en tiras de esa altura, no estrujarse en una rejilla. Algunas plataformas recortan las subidas fuera de proporción, así que mantener los tiles en su proporción nativa evita dobles recortes.",
            "Los cortes solapados ayudan a la legibilidad: cuando una línea de texto cae justo sobre el corte, queda partida en dos. Hacer tiles algo más altos, o recortar antes la fuente para que las líneas caigan entre cortes, arregla lo que ningún algoritmo de división puede.",
          ],
        },
        {
          heading: "Formato de salida y procesado local",
          paragraphs: [
            "La salida PNG mantiene nítidos el texto y los bordes duros: las capturas y documentos deberían quedarse casi siempre en PNG, porque la compresión con pérdida del JPG añade artefactos de contorno alrededor de las letras en cada guardado. El JPG conviene a tiles fotográficos donde el tamaño pesa más que la perfección de los bordes.",
            "Los nombres importan cuando los tiles deben recomponerse: nombres numerados y consistentes (por orden de filas) permiten a ti y a tu audiencia reconstruir el original. Un diagrama dividido en 3×2 sin nombres ordenados es una carpeta de fragmentos inexplicables.",
            "Cada corte ocurre en tu navegador: la imagen se decodifica a un lienzo, se corta y se recodifica localmente. Nada se sube — útil al dividir paneles internos, capturas de clientes o cualquier documento que no entregarías a un servicio de terceros.",
          ],
        },
      ],
    },
    pt: {
      name: "Dividir imagem",
      tagline:
        "Corte uma imagem em uma grade de linhas × colunas com peças PNG — pré-visualização da grade, download em ZIP, tudo no navegador.",
      intro: [
        "Divida uma imagem grande em peças para grades do Instagram, diagramação de impressão, sprites ou etapas de apresentação. Escolha de 2 a 6 linhas e de 2 a 6 colunas, veja a grade se sobrepor à imagem e exporte cada peça como PNG sem perdas.",
        "As peças da mesma imagem mantêm suas posições em pixels, então se remontam perfeitamente. Quando o tamanho não divide exato, as peças regulares usam pixels inteiros e a última linha e coluna absorvem o resto — nada é esticado.",
      ],
      steps: [
        "Solte uma imagem.",
        "Defina o número de linhas e colunas (2–6 cada): a pré-visualização mostra a grade.",
        "Divida em peças e confira cada uma.",
        "Baixe as peças individualmente ou todas em um ZIP.",
      ],
      faqs: [
        {
          q: "E se o tamanho não for divisível pela grade?",
          a: "Cada peça regular mede floor(largura ÷ colunas) × floor(altura ÷ linhas), e a última linha e coluna ficam com o resto. Por exemplo, 305 × 205 em 3 colunas × 2 linhas gera peças de 101 × 102 px, com a última coluna com 103 px de largura. Todas as peças ficam em pixels inteiros: sem esticar, sem frestas.",
        },
        {
          q: "Em que ordem as peças são nomeadas?",
          a: "Linha por linha, da esquerda para a direita: foto-r1c1.png, foto-r1c2.png … foto-r3c4.png. O sufixo rNcM mostra onde cada peça está, então remontar é trivial.",
        },
        {
          q: "Por que saída PNG?",
          a: "PNG é sem perdas: as peças mantêm os pixels exatos da origem. Isso importa quando as partes serão remontadas ou usadas como sprites.",
        },
      ],
      deepDive: [
        {
          heading: "Como funciona um corte limpio e por que os pixels importam",
          paragraphs: [
            "Dividir uma imagem só é sem perdas quando a grade divide as dimensões de forma exata. Uma foto de 1600×1200 dividida em 2×2 dá quatro peças limpas de 800×600; a mesma foto em 3 colunas deixa um resto de 4 pixels que alguém precisa resolver: preencher, esticar ou encolher. Esta ferramenta arredonda o tamanho do bloco para baixo e mantém cada corte num limite exato de pixel, então nenhum bloco é reamostrado.",
            "Essa regra do limite de pixel explica por que o modo grade pede linhas e colunas em vez de um tamanho de bloco em centímetros ou polegadas: as coordenadas de imagem vivem em pixels, e qualquer conversão por unidades físicas introduz coordenadas fracionárias que forçam interpolação e suavizam as bordas.",
            "O modo de faixas é a mesma ideia em uma dimensão: cortar a imagem em bandas horizontais de mesma altura em pixels. É o fluxo padrão para transformar uma captura de página inteira em slides de carrossel ou imagens de documentação que se leem em ordem.",
          ],
        },
        {
          heading: "Escolhendo o layout: grade, faixas e predefinições sociais",
          paragraphs: [
            "O modo grade (linhas × colunas) serve para colagens e posts estilo quebra-cabeça em que as peças se recompondo visualmente. O modo faixas serve para conteúdo com ordem de leitura — tutoriais, recibos longos, conversas — em que cada banda continua a anterior. O erro mais comum é escolher o modo errado: uma captura de conversa cortada em 3×3 lê-se fora de ordem num carrossel.",
            "Para carrosséis sociais, pense primeiro na proporção da plataforma: com uma tela de 1080×1080, uma captura larga normalmente deve ser cortada em faixas dessa altura, não espremida numa grade. Algumas plataformas recortam envios fora de proporção, então manter os blocos na proporção nativa evita recortes duplos.",
            "Cortes sobrepostos ajudam a legibilidade: quando uma linha de texto cai exatamente sobre o corte, ela é partida ao meio. Fazer blocos um pouco mais altos, ou recortar antes a fonte para que as linhas caiam entre os cortes, resolve o que nenhum algoritmo de divisão consegue.",
          ],
        },
        {
          heading: "Formato de saída e processamento local",
          paragraphs: [
            "A saída PNG mantém nítidos o texto e as bordas duras: capturas e documentos deveriam quase sempre ficar em PNG, porque a compressão com perdas do JPG adiciona artefatos de contorno ao redor das letras a cada salvamento. O JPG serve para blocos fotográficos, onde o tamanho pesa mais que a perfeição das bordas.",
            "Os nomes importam quando os blocos precisam ser remontados: nomes numerados e consistentes (em ordem de linhas) permitem que você e seu público reconstruam o original. Um diagrama dividido em 3×2 sem nomes ordenados é uma pasta de fragmentos sem sentido.",
            "Cada corte acontece no seu navegador: a imagem é decodificada numa tela, cortada e recodificada localmente. Nada é enviado — útil ao dividir painéis internos, capturas de clientes ou qualquer documento que você não entregaria a um serviço de terceiros.",
          ],
        },
      ],
    },
  },
});
