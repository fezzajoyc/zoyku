import { ImageBorderEngine } from "../_engines/image-engine-border";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "image-border",
  category: "image",
  icon: "crop",
  engine: { component: ImageBorderEngine },
  related: ["image-resizer", "round-corners-image", "watermark-image", "crop-image", "image-compressor"],
  copy: {
    en: {
      name: "Image Border",
      tagline:
        "Add a solid-color or transparent border around one image or a whole batch — live preview, PNG or JPG output, runs entirely in your browser.",
      intro: [
        "A border frames screenshots, product shots and avatars without opening an editor. Drop in one image or a whole batch, drag the width slider and pick a padding style: the canvas expands outward, so no pixel of the original is cropped or rescaled.",
        "Transparent padding keeps the frame see-through in PNG output — handy for stickers and cut-outs on any background. A solid color works everywhere, including JPG, and every file is processed on your device.",
      ],
      steps: [
        "Drop in one image or a whole batch.",
        "Drag the border width slider and watch the live preview.",
        "Choose transparent padding or a solid color, and PNG or JPG output.",
        "Add borders to all images and download each result, or grab one ZIP.",
      ],
      faqs: [
        {
          q: "Does the border shrink or crop my image?",
          a: "No. The canvas grows by twice the border width — one border on every side — and your image is placed inside at full size. Nothing is cropped, scaled or moved.",
        },
        {
          q: "When should I pick a transparent border?",
          a: "Transparent padding only makes sense in PNG output: the frame stays see-through so the image works on any background. JPG has no alpha channel, so there the border is filled with the solid color you chose.",
        },
        {
          q: "Why is JPG not available with transparent padding?",
          a: "JPG cannot store transparency — saving would turn the frame white. The tool switches to PNG automatically whenever transparent padding is selected; pick the Color option if you want a JPG.",
        },
      ],
    },
    zh: {
      name: "图片加边框",
      tagline:
        "给一张或多张图片加纯色或透明边框,实时预览,输出 PNG 或 JPG,画布向外扩展、原图不被裁剪,全程浏览器本地完成。",
      intro: [
        "边框能让截图、产品图和头像更完整,不必打开编辑器。拖入一张或多张图片,拖动宽度滑块并选择边框样式:画布向四周各扩展一个边宽,原图一个像素都不会被裁剪或缩放。",
        "透明边框在 PNG 输出下保持透空,适合贴纸和抠图素材;纯色边框任何场景都适用,JPG 也支持。所有处理都在你的设备上完成。",
      ],
      steps: [
        "拖入一张或多张图片。",
        "拖动边框宽度滑块,实时预览效果。",
        "选择透明边框或纯色边框,以及 PNG / JPG 输出。",
        "批量加边框,逐张下载,或打包成一个 ZIP。",
      ],
      faqs: [
        {
          q: "加边框会裁剪或缩小原图吗?",
          a: "不会。画布向四周各扩展一个边宽,原图完整放入中间,不做任何裁剪、缩放或位移。",
        },
        {
          q: "什么时候选透明边框?",
          a: "透明边框只在 PNG 输出下有意义:边框保持透空,放在任何背景上都自然。JPG 没有透明通道,只能用所选纯色填充。",
        },
        {
          q: "为什么透明边框不能选 JPG?",
          a: "JPG 不支持透明,保存后边框会变成白色。选择「透明」时工具会自动改用 PNG;想输出 JPG 请选「纯色」。",
        },
      ],
    },
    ja: {
      name: "画像に枠を追加",
      tagline:
        "1 枚でもまとめてでも画像に単色または透明の枠を追加。リアルタイムプレビュー、出力は PNG / JPG、キャンバスは外側に広がり元画像は切り抜かれません。",
      intro: [
        "枠を付けるだけで、スクリーンショット・商品画像・アバターが引き締まります。画像を 1 枚でもまとめてでもドロップし、幅スライダーとスタイルを選ぶだけ——キャンバスは外側に拡張され、元のピクセルは 1 つも切り取られず縮小もされません。",
        "透明の枠は PNG 出力で透過したままになり、ステッカーや切り抜き素材に便利です。単色ならどんな場面でも使え、JPG にも対応します。処理はすべて端末内で行われます。",
      ],
      steps: [
        "画像を 1 枚でもまとめてでもドロップします。",
        "幅スライダーを動かすと、プレビューがリアルタイムに変わります。",
        "透明または単色の枠、出力フォーマット(PNG / JPG)を選びます。",
        "一括で枠を付け、各結果をダウンロード——ZIP 一括保存も可能です。",
      ],
      faqs: [
        {
          q: "枠を付けると画像は切り抜かれますか?",
          a: "いいえ。キャンバスが各辺 1 枠ぶん広がり、元画像はそのままのサイズで中央に置かれます。切り抜きも縮小も移動もありません。",
        },
        {
          q: "透明の枠はどんなときに使いますか?",
          a: "透明な枠は PNG 出力でのみ意味があります。枠が透過したままなので、どんな背景にもなじみます。JPG にはアルファがないため、選んだ単色で埋められます。",
        },
        {
          q: "透明枠なのに JPG を選べないのは?",
          a: "JPG は透過を保存できず、枠が白くなってしまいます。「透明」を選ぶと自動で PNG に切り替わります。JPG が必要な場合は「単色」を選んでください。",
        },
      ],
    },
    es: {
      name: "Borde de imagen",
      tagline:
        "Añade un borde de color sólido o transparente a una imagen o a un lote: vista previa en vivo, salida en PNG o JPG, todo en tu navegador.",
      intro: [
        "Un borde enmarca capturas, fotos de producto y avatares sin abrir un editor. Suelta una imagen o un lote entero, mueve el deslizador de ancho y elige el estilo: el lienzo se expande hacia fuera, así que no se recorta ni reescala ni un píxel del original.",
        "El relleno transparente deja el marco translúcido en la salida PNG, ideal para pegatinas y recortes sobre cualquier fondo. El color sólido funciona en todos los casos, incluido JPG, y todo se procesa en tu dispositivo.",
      ],
      steps: [
        "Suelta una imagen o un lote entero.",
        "Mueve el deslizador de ancho y mira la vista previa en vivo.",
        "Elige relleno transparente o color sólido, y salida PNG o JPG.",
        "Añade bordes a todo y descarga cada resultado, o llévatelos en un ZIP.",
      ],
      faqs: [
        {
          q: "¿El borde recorta o reduce mi imagen?",
          a: "No. El lienzo crece el doble del ancho del borde —uno por lado— y tu imagen se coloca dentro a tamaño completo. Nada se recorta, escala ni desplaza.",
        },
        {
          q: "¿Cuándo conviene un borde transparente?",
          a: "El relleno transparente solo tiene sentido en PNG: el marco queda translúcido y la imagen encaja en cualquier fondo. JPG no tiene canal alfa, así que allí el borde se rellena con el color sólido elegido.",
        },
        {
          q: "¿Por qué no hay JPG con relleno transparente?",
          a: "JPG no puede guardar transparencia: al guardar, el marco sería blanco. La herramienta cambia a PNG automáticamente con relleno transparente; elige Color si quieres un JPG.",
        },
      ],
    },
    pt: {
      name: "Borda de imagem",
      tagline:
        "Adicione uma borda de cor sólida ou transparente a uma imagem ou a um lote — pré-visualização ao vivo, saída em PNG ou JPG, tudo no navegador.",
      intro: [
        "Uma borda emoldura capturas de tela, fotos de produto e avatares sem abrir um editor. Solte uma imagem ou um lote inteiro, arraste o controle de largura e escolha o estilo: a tela se expande para fora, então nenhum pixel do original é cortado ou redimensionado.",
        "O preenchimento transparente mantém a moldura translúcida na saída PNG — ótimo para figurinhas e recortes em qualquer fundo. A cor sólida funciona em todo caso, inclusive JPG, e tudo é processado no seu dispositivo.",
      ],
      steps: [
        "Solte uma imagem ou um lote inteiro.",
        "Arraste o controle de largura e veja a pré-visualização ao vivo.",
        "Escolha preenchimento transparente ou cor sólida, e saída PNG ou JPG.",
        "Aplique bordas em todas e baixe cada resultado, ou tudo em um ZIP.",
      ],
      faqs: [
        {
          q: "A borda corta ou reduz minha imagem?",
          a: "Não. A tela cresce o dobro da largura da borda — uma em cada lado — e a imagem é colocada dentro em tamanho integral. Nada é cortado, redimensionado ou deslocado.",
        },
        {
          q: "Quando escolher borda transparente?",
          a: "O preenchimento transparente só faz sentido em PNG: a moldura fica translúcida e a imagem serve para qualquer fundo. O JPG não tem canal alfa, então ali a borda é preenchida com a cor sólida escolhida.",
        },
        {
          q: "Por que não há JPG com preenchimento transparente?",
          a: "O JPG não guarda transparência — ao salvar, a moldura ficaria branca. A ferramenta muda para PNG automaticamente com preenchimento transparente; escolha Cor para ter um JPG.",
        },
      ],
    },
  },
});
