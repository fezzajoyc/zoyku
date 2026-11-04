import { ImageCircleEngine } from "../_engines/image-engine-circle";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "crop-circle-image",
  category: "image",
  icon: "palette",
  engine: { component: ImageCircleEngine },
  related: ["round-corners-image", "crop-image", "image-resizer", "grayscale-image", "image-compressor", "image-border", "image-splitter", "compress-image-to-size", "heic-to-jpg", "image-metadata-viewer"],
  copy: {
    en: {
      name: "Circle Crop Image",
      tagline:
        "Crop one image or a whole batch into a centered circle with transparent corners — shrink slider, live preview, lossless PNG output, in your browser.",
      intro: [
        "Circular avatars, profile pictures, badges and stickers all start with a circle crop. The tool centers a circle on each image, keeps everything inside it and discards the corners as transparency — the diameter starts at the shorter side, and a slider shrinks it in percent if you want more margin.",
        "Output is always PNG so the corners stay genuinely transparent, not white. Drop a whole batch to convert many images at once, preview the first one live, and download each circle on its own.",
      ],
      steps: [
        "Drop in one image or a whole batch.",
        "Drag the shrink slider if you want the circle smaller than the full shorter side.",
        "Check the live preview of the first image.",
        "Crop all images into circles and download each PNG.",
      ],
      faqs: [
        {
          q: "What determines the circle's size?",
          a: "By default the diameter equals the image's shorter side: a square image becomes a full circle, and a rectangle is cropped to the largest centered circle that fits. The shrink slider reduces that diameter in percent.",
        },
        {
          q: "Are the corners white?",
          a: "No — output is PNG with a real alpha channel, so the area outside the circle is fully transparent and the result sits cleanly on any background.",
        },
        {
          q: "Is my image re-encoded and degraded?",
          a: "The pixels inside the circle are copied as-is into a lossless PNG. Only the area outside the circle disappears; nothing inside is rescaled or recompressed.",
        },
      ],
    },
    zh: {
      name: "圆形裁剪",
      tagline:
        "把一张或多张图片裁成居中圆形、四角透明:直径可按百分比缩小,实时预览,输出无损 PNG,全程浏览器本地完成。",
      intro: [
        "圆形头像、徽章、贴纸都要先做圆形裁剪。工具会在每张图片上取居中圆,保留圆内内容,四角以透明舍弃——直径默认取短边,需要留边时用滑块按百分比缩小。",
        "输出一律是 PNG,四角是真正的透明而不是白色。支持整批处理,第一张图实时预览,结果逐张下载。",
      ],
      steps: [
        "拖入一张或多张图片。",
        "需要留边时,拖动缩小滑块让圆小于短边。",
        "查看第一张图的实时预览。",
        "批量裁成圆形,逐张下载 PNG。",
      ],
      faqs: [
        {
          q: "圆形的大小是怎么定的?",
          a: "直径默认等于图片短边:正方形图会变成完整圆形,长方形图取能放下的最大居中圆。缩小滑块按百分比调小这个直径。",
        },
        {
          q: "四角是白色的吗?",
          a: "不是。输出是带真实 alpha 通道的 PNG,圆外完全透明,放在任何背景上都很干净。",
        },
        {
          q: "画质会下降吗?",
          a: "圆内的像素原样复制进无损 PNG,只有圆外被舍弃,圆内不做缩放或重新压缩。",
        },
      ],
    },
    ja: {
      name: "円形に切り抜き",
      tagline:
        "1 枚でもまとめてでも画像を中央の円に切り抜き、四隅は透明に。直径はパーセントで縮小でき、プレビューはリアルタイム、出力はロスレス PNG。",
      intro: [
        "円形のアイコン・プロフィール画像・バッジ・ステッカーは、円形への切り抜きから始まります。各画像の中央に円を置き、円の内側を残して四隅は透明として切り捨てます。直径は短辺が基準で、余白が欲しいときはスライダーでパーセント縮小できます。",
        "出力は常に PNG なので、四隅は白ではなく本当に透過します。まとめて一括変換でき、1 枚目はリアルタイムにプレビュー、結果は個別にダウンロードします。",
      ],
      steps: [
        "画像を 1 枚でもまとめてでもドロップします。",
        "余白が欲しいときは、縮小スライダーで円を短辺より小さくします。",
        "1 枚目のライブプレビューを確認します。",
        "全画像を円形に切り抜き、各 PNG をダウンロードします。",
      ],
      faqs: [
        {
          q: "円の大きさはどう決まりますか?",
          a: "直径は既定で画像の短辺と同じです。正方形ならぴったりの正円に、長方形なら収まる最大の中央円に切り抜かれます。縮小スライダーでこの直径をパーセントで小さくできます。",
        },
        {
          q: "四隅は白くなりますか?",
          a: "なりません。出力はアルファ付き PNG で、円の外側は完全に透明です。どんな背景にもきれいに置けます。",
        },
        {
          q: "画質は劣化しますか?",
          a: "円の内側のピクセルはそのままロスレス PNG にコピーされます。外側が消えるだけで、内側の拡大縮小や再圧縮はありません。",
        },
      ],
    },
    es: {
      name: "Recorte circular",
      tagline:
        "Recorta una imagen o un lote en un círculo centrado con esquinas transparentes: deslizador de reducción, vista previa en vivo, salida PNG.",
      intro: [
        "Los avatares circulares, fotos de perfil, insignias y pegatinas empiezan con un recorte circular. La herramienta centra un círculo en cada imagen, conserva su interior y descarta las esquinas como transparencia: el diámetro parte del lado corto, y un deslizador lo reduce en porcentaje si quieres margen.",
        "La salida siempre es PNG, así que las esquinas quedan transparentes de verdad, no blancas. Suelta un lote entero para convertir muchas imágenes a la vez, previsualiza la primera en vivo y descarga cada círculo por separado.",
      ],
      steps: [
        "Suelta una imagen o un lote entero.",
        "Mueve el deslizador de reducción si quieres el círculo más pequeño que el lado corto.",
        "Comprueba la vista previa en vivo de la primera imagen.",
        "Recorta todas en círculos y descarga cada PNG.",
      ],
      faqs: [
        {
          q: "¿Qué determina el tamaño del círculo?",
          a: "Por defecto el diámetro es igual al lado corto de la imagen: una imagen cuadrada se convierte en un círculo completo y una rectangular se recorta al mayor círculo centrado que cabe. El deslizador de reducción disminuye ese diámetro en porcentaje.",
        },
        {
          q: "¿Las esquinas quedan blancas?",
          a: "No: la salida es PNG con canal alfa real, así que el área fuera del círculo es totalmente transparente y el resultado encaja limpio en cualquier fondo.",
        },
        {
          q: "¿Se recodifica y pierde calidad mi imagen?",
          a: "Los píxeles dentro del círculo se copian tal cual en un PNG sin pérdida. Solo desaparece el área exterior; nada interior se reescala o recomprime.",
        },
      ],
    },
    pt: {
      name: "Corte circular",
      tagline:
        "Recorte uma imagem ou um lote em um círculo centralizado com cantos transparentes — controle de redução, pré-visualização ao vivo, PNG sem perdas.",
      intro: [
        "Avatares circulares, fotos de perfil, emblemas e figurinhas começam com um corte circular. A ferramenta centraliza um círculo em cada imagem, mantém o interior e descarta os cantos como transparência — o diâmetro parte do lado menor, e um controle o reduz em porcentagem se você quiser margem.",
        "A saída é sempre PNG, então os cantos ficam realmente transparentes, não brancos. Solte um lote inteiro para converter várias imagens de uma vez, veja a pré-visualização da primeira ao vivo e baixe cada círculo separadamente.",
      ],
      steps: [
        "Solte uma imagem ou um lote inteiro.",
        "Arraste o controle de redução se quiser o círculo menor que o lado menor.",
        "Confira a pré-visualização ao vivo da primeira imagem.",
        "Corte todas em círculos e baixe cada PNG.",
      ],
      faqs: [
        {
          q: "O que determina o tamanho do círculo?",
          a: "Por padrão o diâmetro é igual ao lado menor da imagem: uma imagem quadrada vira um círculo completo e uma retangular é cortada no maior círculo centrado que cabe. O controle de redução diminui esse diâmetro em porcentagem.",
        },
        {
          q: "Os cantos ficam brancos?",
          a: "Não — a saída é PNG com canal alfa real, então a área fora do círculo é totalmente transparente e o resultado assenta limpo em qualquer fundo.",
        },
        {
          q: "Minha imagem é recodificada e perde qualidade?",
          a: "Os pixels dentro do círculo são copiados como estão para um PNG sem perdas. Só a área externa desaparece; nada internamente é redimensionado ou recomprimido.",
        },
      ],
    },
  },
});
