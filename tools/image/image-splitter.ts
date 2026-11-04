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
    },
  },
});
