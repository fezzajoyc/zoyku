import { ImageRoundEngine } from "../_engines/image-engine-round";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "round-corners-image",
  category: "image",
  icon: "crop",
  engine: { component: ImageRoundEngine },
  related: ["crop-image", "image-resizer", "watermark-image", "grayscale-image", "image-compressor"],
  copy: {
    en: {
      name: "Round Image Corners",
      tagline:
        "Give one image or a whole batch rounded corners — transparent PNG corners or a solid color, live preview, output in PNG or JPG. Runs in your browser.",
      intro: [
        "Rounded corners soften screenshots, avatars and product shots without opening an editor. Drop one image or a whole batch, drag the radius slider and watch the preview update live — the radius goes all the way to a full circle, capped at half of the shorter side.",
        "Choose whether the clipped corners stay transparent (PNG) or get filled with a solid color, which is also what JPG output needs since it has no alpha channel. Every file is processed on your device and downloaded individually.",
      ],
      steps: [
        "Drop in one image or a whole batch.",
        "Drag the radius slider — the preview shows the first image live.",
        "Pick transparent or solid-color corners and the output format.",
        "Round them all and download each result.",
      ],
      faqs: [
        {
          q: "Can the corners be transparent instead of white?",
          a: "Yes — pick PNG output and the Transparent option, and the corners stay see-through. JPG has no alpha channel, so it always fills the corners with the solid color you chose.",
        },
        {
          q: "The same radius looks different on each image — why?",
          a: "The slider sets the radius in pixels, and every file is rounded with exactly that radius, clamped to half of its own shorter side. For a uniform look across differently sized images, match their sizes first (for example with the image resizer).",
        },
        {
          q: "Does rounding reduce image quality?",
          a: "Only the corners are touched — the pixels inside stay untouched. PNG output is lossless, while JPG is re-encoded at high quality, which can shift the file size a little either way.",
        },
      ],
    },
    zh: {
      name: "图片圆角",
      tagline:
        "给一张或多张图片加上圆角——角可以透明(PNG)或填充纯色,实时预览,输出 PNG 或 JPG,全部在浏览器本地完成。",
      intro: [
        "圆角能让截图、头像和产品图看起来更柔和,不必打开编辑器。拖入一张或多张图片,拉动半径滑块即可实时预览——半径最大可到正圆,上限是短边的一半。",
        "裁掉的角可以保持透明(PNG),也可以填充纯色;JPG 没有透明通道,必须用纯色填充。每个文件都在你的设备上处理,逐张下载。",
      ],
      steps: [
        "拖入一张或多张图片。",
        "拉动半径滑块,预览区实时显示第一张图的效果。",
        "选择透明角或纯色角,以及输出格式。",
        "一键批量处理,逐张下载结果。",
      ],
      faqs: [
        {
          q: "角可以是透明的吗?",
          a: "可以。选择 PNG 输出和「透明」选项,四角就是透明的。JPG 没有透明通道,只能用你选的纯色填充四角。",
        },
        {
          q: "同样的半径在不同图上看起来不一样?",
          a: "滑块设定的是像素半径,每张图都按这个半径处理,上限是各自短边的一半。如果想让尺寸不同的图片看起来一致,先用改尺寸工具把它们调成一样大。",
        },
        {
          q: "加圆角会降低画质吗?",
          a: "只有四个角被改动,内部的像素原样保留。PNG 输出无损;JPG 会以高质量重新编码,体积可能略有变化。",
        },
      ],
    },
    ja: {
      name: "画像の角を丸く",
      tagline:
        "1 枚でもまとめてでも画像の角を丸く加工。角は透明(PNG)または単色で選べ、プレビューはリアルタイム、出力は PNG / JPG。すべてブラウザ内で処理します。",
      intro: [
        "角を丸くするだけで、スクリーンショットやアバター、商品画像がぐっと柔らかくなります。画像を 1 枚でもまとめてでもドロップし、半径スライダーを動かせばプレビューがリアルタイムで更新——最大は正円で、短辺の半分まで設定できます。",
        "切り取られた角は透明のまま(PNG)にも、単色で埋めることもできます。JPG にはアルファチャンネルがないため、必ず単色で埋めます。各ファイルは端末内で処理され、個別にダウンロードします。",
      ],
      steps: [
        "画像を 1 枚でもまとめてでもドロップします。",
        "半径スライダーを動かすと、1 枚目のプレビューがリアルタイムに変わります。",
        "角を透明にするか単色にするか、出力フォーマットを選びます。",
        "一括で丸め、各結果をダウンロードします。",
      ],
      faqs: [
        {
          q: "角を白ではなく透明にできますか?",
          a: "できます。PNG 出力と「透明」を選べば、角は透過したままです。JPG にはアルファチャンネルがないため、選んだ単色で埋められます。",
        },
        {
          q: "同じ半径でも画像によって見え方が違うのは?",
          a: "スライダーはピクセル単位の半径を設定し、各ファイルはその半径(それぞれの短辺の半分を上限)で丸められます。サイズの違う画像で見た目を揃えたい場合は、先にリサイズツールで揃えてください。",
        },
        {
          q: "角を丸めると画質は落ちますか?",
          a: "触るのは四隅だけで、内側のピクセルはそのままです。PNG 出力はロスレス、JPG は高品質で再エンコードされるため、ファイルサイズは前後することがあります。",
        },
      ],
    },
    es: {
      name: "Esquinas redondeadas",
      tagline:
        "Redondea las esquinas de una imagen o de un lote entero: transparentes en PNG o de color sólido, vista previa en vivo, salida en PNG o JPG. En tu navegador.",
      intro: [
        "Las esquinas redondeadas suavizan capturas, avatares y fotos de producto sin abrir un editor. Suelta una imagen o un lote entero, mueve el deslizador de radio y mira la vista previa actualizarse en vivo: el radio llega hasta el círculo completo, con tope en la mitad del lado corto.",
        "Elige si las esquinas recortadas quedan transparentes (PNG) o se rellenan con un color sólido, que es lo que necesita la salida JPG al no tener canal alfa. Cada archivo se procesa en tu dispositivo y se descarga por separado.",
      ],
      steps: [
        "Suelta una imagen o un lote entero.",
        "Mueve el deslizador de radio: la vista previa muestra la primera imagen en vivo.",
        "Elige esquinas transparentes o de color, y el formato de salida.",
        "Redondea todo y descarga cada resultado.",
      ],
      faqs: [
        {
          q: "¿Pueden quedar transparentes en vez de blancas?",
          a: "Sí: elige salida PNG y la opción Transparente, y las esquinas quedan translúcidas. JPG no tiene canal alfa, así que siempre rellena las esquinas con el color sólido que elijas.",
        },
        {
          q: "El mismo radio se ve distinto en cada imagen, ¿por qué?",
          a: "El deslizador fija el radio en píxeles y cada archivo se redondea con ese radio exacto, limitado a la mitad de su propio lado corto. Para un aspecto uniforme en imágenes de tamaños distintos, primero iguálalas con el redimensionador.",
        },
        {
          q: "¿Redondear reduce la calidad?",
          a: "Solo se tocan las esquinas: los píxeles interiores quedan intactos. La salida PNG es sin pérdida, mientras que JPG se recodifica con alta calidad, lo que puede mover un poco el tamaño del archivo.",
        },
      ],
    },
    pt: {
      name: "Cantos arredondados",
      tagline:
        "Arredonde os cantos de uma imagem ou de um lote inteiro — cantos transparentes em PNG ou cor sólida, pré-visualização ao vivo, saída em PNG ou JPG. No navegador.",
      intro: [
        "Cantos arredondados deixam capturas de tela, avatares e fotos de produto mais suaves sem abrir um editor. Solte uma imagem ou um lote inteiro, arraste o controle de raio e veja a pré-visualização mudar ao vivo — o raio vai até o círculo completo, limitado à metade do lado menor.",
        "Escolha se os cantos cortados ficam transparentes (PNG) ou recebem uma cor sólida, que é o que a saída JPG precisa por não ter canal alfa. Cada arquivo é processado no seu dispositivo e baixado separadamente.",
      ],
      steps: [
        "Solte uma imagem ou um lote inteiro.",
        "Arraste o controle de raio — a pré-visualização mostra a primeira imagem ao vivo.",
        "Escolha cantos transparentes ou de cor sólida, e o formato de saída.",
        "Arredonde tudo e baixe cada resultado.",
      ],
      faqs: [
        {
          q: "Os cantos podem ficar transparentes em vez de brancos?",
          a: "Sim — escolha saída PNG e a opção Transparente, e os cantos ficam translúcidos. O JPG não tem canal alfa, então sempre preenche os cantos com a cor sólida escolhida.",
        },
        {
          q: "O mesmo raio fica diferente em cada imagem — por quê?",
          a: "O controle define o raio em pixels, e cada arquivo é arredondado com exatamente esse raio, limitado à metade do próprio lado menor. Para um visual uniforme em imagens de tamanhos diferentes, iguale os tamanhos antes (por exemplo com o redimensionador).",
        },
        {
          q: "Arredondar reduz a qualidade da imagem?",
          a: "Só os cantos são tocados — os pixels internos ficam intactos. A saída PNG é sem perdas; o JPG é recodificado em alta qualidade, o que pode mudar um pouco o tamanho do arquivo.",
        },
      ],
    },
  },
});
