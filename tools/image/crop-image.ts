import { ImageCropEngine } from "../_engines/image-engine-crop";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "crop-image",
  category: "image",
  icon: "crop",
  engine: { component: ImageCropEngine },
  related: ["image-resizer", "rotate-image", "image-compressor", "screenshot-tool", "image-border", "image-splitter", "compress-image-to-size", "grayscale-image", "crop-circle-image", "heic-to-jpg"],
  copy: {
    en: {
      name: "Crop Image",
      tagline:
        "Crop photos to 1:1, 4:3, 16:9 or a free area with draggable handles and pixel-accurate offsets — fast, private and batch-ready.",
      intro: [
        "Drag the corner handles to frame exactly what you want to keep, or type X, Y, width and height directly for pixel-perfect crops. Ratio presets — 1:1 for avatars, 4:3 and 3:2 for prints, 16:9 and 9:16 for video and stories — snap the selection to the right shape instantly.",
        "Working with a set of photos? The same selection is scaled proportionally to every file in the batch, so a whole folder gets cropped consistently. Cropping only cuts pixels — it never rescales — so the kept area stays at full original quality.",
      ],
      steps: [
        "Drop one or more images; click a file name to preview and crop each one.",
        "Choose a ratio preset or drag the selection handles; fine-tune with the X / Y / W / H fields.",
        "Apply the crop and download the results.",
      ],
      faqs: [
        {
          q: "Does cropping reduce image quality?",
          a: "No. Cropping simply cuts away the outside pixels — the area you keep is copied at its full original resolution. Quality only changes if you later resize or compress the result.",
        },
        {
          q: "How does batch cropping work with different image sizes?",
          a: "The selection is stored relative to the image you preview. When applied to other files it is scaled proportionally to each image's own dimensions, so the composition of the crop stays consistent across the whole batch.",
        },
        {
          q: "Which ratio should I use for a profile picture?",
          a: "1:1 (square). Most social platforms crop avatars to a circle inside a square, so centering the subject in a 1:1 selection is the safest choice.",
        },
      ],
    },
    zh: {
      name: "图片裁剪",
      tagline: "拖拽手柄或输入精确坐标,按 1:1、4:3、16:9 或自由比例裁剪,批量套选区——本地处理,瞬间完成。",
      intro: [
        "拖动角部手柄框出想保留的区域,或直接输入 X、Y、宽、高实现像素级精准裁剪。比例预设一步到位:头像用 1:1,打印用 4:3 和 3:2,视频和短视频封面用 16:9 和 9:16。",
        "处理一组照片时,同一个选区会按各图尺寸等比缩放后套用,整个文件夹风格一致。裁剪只做像素切割、不做缩放,保留区域的画质与原图完全一致。",
      ],
      steps: [
        "拖入一张或多张图片;点击文件名可切换预览和逐张取景。",
        "选择比例预设或拖动选框;用 X / Y / 宽 / 高 数值框微调。",
        "点击裁剪,下载结果。",
      ],
      faqs: [
        {
          q: "裁剪会损失画质吗?",
          a: "不会。裁剪只是切掉外围像素,保留区域按原始分辨率原样复制。只有之后再去缩放或压缩,画质才会变化。",
        },
        {
          q: "批量裁剪时图片尺寸不一样怎么办?",
          a: "选区按你预览的那张图记录,套用到其他文件时会按各自尺寸等比缩放,因此整批图片的构图保持一致。",
        },
        {
          q: "头像应该用什么比例?",
          a: "1:1(正方形)。大多数社交平台的头像都是在正方形内裁圆形,把主体放在 1:1 选区中心最稳妥。",
        },
      ],
    },
    ja: {
      name: "画像切り抜き",
      tagline:
        "ドラッグハンドルとピクセル単位の座標指定で 1:1・4:3・16:9・自由比率に切り抜き。選択範囲を一括適用でき、すべてローカル処理です。",
      intro: [
        "四隅のハンドルをドラッグして残したい範囲を指定するか、X・Y・幅・高さを直接入力してピクセル単位の正確な切り抜きができます。比率プリセット(アイコン用 1:1、印刷用 4:3 と 3:2、動画やストーリーズ用 16:9 と 9:16)を選べば、一瞬で正しい形に揃います。",
        "複数枚の写真を扱う場合、同じ選択範囲が各画像のサイズに比例して拡大縮小され、フォルダ単位でも統一感のある切り抜きに。切り抜きはピクセルを切り取るだけの操作で再スケールしないため、残した部分は元画像と同じ画質を保ちます。",
      ],
      steps: [
        "画像を 1 枚以上ドロップします。ファイル名をクリックすると切り替えてプレビューできます。",
        "比率プリセットを選ぶかハンドルをドラッグし、X / Y / 幅 / 高さの数値で微調整します。",
        "切り抜きを適用して結果をダウンロードします。",
      ],
      faqs: [
        {
          q: "切り抜きで画質は落ちますか?",
          a: "落ちません。切り抜きは外側のピクセルを切り捨てるだけなので、残した領域は元の解像度のままコピーされます。画質が変わるのは、その後リサイズや圧縮をした場合だけです。",
        },
        {
          q: "サイズの違う画像の一括切り抜きはどう動きますか?",
          a: "選択範囲はプレビュー中の画像を基準に記録され、他のファイルに適用する際は各画像の寸法に比例して拡大縮小されます。そのためバッチ全体で構図がそろいます。",
        },
        {
          q: "プロフィール画像にはどの比率がいい?",
          a: "1:1(正方形)です。多くの SNS では正方形の中に円形でアイコンが切り抜かれるため、被写体を 1:1 選択範囲の中央に置くのが最も安全です。",
        },
      ],
    },
    es: {
      name: "Recortar imágenes",
      tagline:
        "Recorta fotos a 1:1, 4:3, 16:9 o un área libre con tiradores arrastrables y desfases exactos en píxeles: rápido, privado y por lotes.",
      intro: [
        "Arrastra los tiradores de las esquinas para enmarcar lo que quieres conservar, o escribe X, Y, ancho y alto directamente para recortes exactos al píxel. Los preajustes de proporción — 1:1 para avatares, 4:3 y 3:2 para impresión, 16:9 y 9:16 para vídeo y stories — ajustan la selección al instante.",
        "¿Trabajas con varias fotos? La misma selección se escala proporcionalmente en cada archivo del lote, así una carpeta entera queda recortada de forma consistente. Recortar solo corta píxeles, nunca reescala: el área conservada mantiene la calidad original completa.",
      ],
      steps: [
        "Suelta una o varias imágenes; haz clic en un nombre de archivo para previsualizar y enmarcar cada una.",
        "Elige un preajuste de proporción o arrastra los tiradores; afina con los campos X / Y / An / Al.",
        "Aplica el recorte y descarga los resultados.",
      ],
      faqs: [
        {
          q: "¿Recortar reduce la calidad de la imagen?",
          a: "No. Recortar simplemente corta los píxeles exteriores: el área que conservas se copia a su resolución original íntegra. La calidad solo cambia si después reescala o comprimes el resultado.",
        },
        {
          q: "¿Cómo funciona el recorte por lotes con tamaños distintos?",
          a: "La selección se guarda de forma relativa a la imagen previsualizada. Al aplicarla a otros archivos se escala proporcionalmente a las dimensiones de cada uno, así la composición del recorte se mantiene en todo el lote.",
        },
        {
          q: "¿Qué proporción usar para una foto de perfil?",
          a: "1:1 (cuadrado). Casi todas las redes recortan el avatar en un círculo dentro de un cuadrado, así que centrar el sujeto en una selección 1:1 es la opción más segura.",
        },
      ],
    },
    pt: {
      name: "Recortar imagens",
      tagline:
        "Recorte fotos em 1:1, 4:3, 16:9 ou área livre com alças arrastáveis e deslocamentos exatos em pixels — rápido, privado e em lote.",
      intro: [
        "Arraste as alças dos cantos para enquadrar o que quer manter, ou digite X, Y, largura e altura direto para recortes exatos ao pixel. As predefinições de proporção — 1:1 para avatares, 4:3 e 3:2 para impressão, 16:9 e 9:16 para vídeos e stories — ajustam a seleção na hora.",
        "Vai tratar um conjunto de fotos? A mesma seleção é escalada proporcionalmente em cada arquivo do lote, então uma pasta inteira sai recortada de forma consistente. Recortar apenas corta pixels — nunca reescala — e a área mantida conserva a qualidade original.",
      ],
      steps: [
        "Solte uma ou mais imagens; clique num nome de arquivo para visualizar e enquadrar cada uma.",
        "Escolha uma predefinição de proporção ou arraste as alças; ajuste fino com os campos X / Y / L / A.",
        "Aplique o recorte e baixe os resultados.",
      ],
      faqs: [
        {
          q: "Recortar reduz a qualidade da imagem?",
          a: "Não. Recortar apenas corta os pixels externos — a área mantida é copiada na resolução original completa. A qualidade só muda se você depois redimensionar ou comprimir o resultado.",
        },
        {
          q: "Como funciona o recorte em lote com tamanhos diferentes?",
          a: "A seleção é guardada em relação à imagem pré-visualizada. Ao aplicar nos outros arquivos, ela é escalada proporcionalmente às dimensões de cada um, então a composição fica consistente no lote inteiro.",
        },
        {
          q: "Qual proporção usar para foto de perfil?",
          a: "1:1 (quadrado). Quase todas as redes sociais recortam o avatar num círculo dentro de um quadrado, então centralizar o motivo numa seleção 1:1 é a escolha mais segura.",
        },
      ],
    },
  },
});
