import { ImageFaviconEngine } from "../_engines/image-engine-favicon";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "favicon-generator",
  category: "image",
  icon: "sparkle",
  engine: { component: ImageFaviconEngine },
  related: ["crop-image", "image-resizer", "convert-image", "image-compressor", "png-to-jpg", "image-border", "image-splitter", "compress-image-to-size", "grayscale-image", "crop-circle-image"],
  copy: {
    en: {
      name: "Favicon Generator",
      tagline:
        "Turn any logo or image into a complete favicon set — 16 to 512 px PNGs with optional rounded corners, plus the HTML to paste. Runs in your browser.",
      intro: [
        "Drop in one square-ish image and get the six PNG sizes real projects need: 16, 32 and 48 px favicons, a 180 px apple-touch-icon, and 192 / 512 px icons for Android and PWA manifests. Non-square images are centered on a square canvas padded with the background color you pick, and corners can stay square, rounded or become a full circle.",
        "Each size is rendered at its true pixel dimensions and can be downloaded on its own or as a single .zip, together with a copy-paste <head> snippet that references the same filenames — so the files drop straight into your project's public folder.",
      
        "Under the hood each size is produced by drawing your image onto a canvas at its exact pixel dimensions — 16 px stays 16 px rather than being a resized preview — with the browser's own encoder writing the PNG. The corner styles clip the canvas path before rendering, so rounded and circular variants are baked into the pixels, not CSS.",
        "Compared with generating one 32 px favicon and letting browsers upscale it, this set covers every context a real deployment meets: tab, bookmark bar, iOS home screen, Android launcher and PWA install prompt. Unlike paid icon generators, there is no watermark, no account, and the HTML snippet is ready to paste — no string editing needed.",
      ],
      steps: [
        "Drop in one image — a square logo works best.",
        "Pick a padding background color and a corner style (square, rounded or circle).",
        "Generate the set, then download individual sizes or the whole .zip.",
        "Paste the HTML snippet into your page's <head> and upload the PNGs.",
      ],
      faqs: [
        {
          q: "Which favicon sizes do I actually need?",
          a: "16 and 32 px cover browser tabs, 48 px helps shortcuts and bookmarks, 180 px is what iOS home screens ask for, and 192 / 512 px are the sizes Android and web app manifests look for. Generating all six once means you never think about it again.",
        },
        {
          q: "Why does my logo look blurry at 16 px?",
          a: "A 16 px tab icon has 256 pixels in total, so fine detail and thin strokes simply disappear. Favicon sets look best when generated from a bold, high-contrast mark — if your logo is detailed, consider drawing a simplified small variant as the source image.",
        },
        {
          q: "Do I still need a .ico file?",
          a: "Modern browsers happily use PNG favicons via <link> tags, and the snippet this tool generates is all they need. A legacy .ico only matters for very old browsers, which are rare enough to ignore for most sites.",
        },
      ],
    },
    zh: {
      name: "Favicon 生成器",
      tagline:
        "把任意图片变成完整 favicon 套件:16–512 px 六种尺寸 PNG,圆角样式可选,附可直接粘贴的 HTML 代码,全部在浏览器本地生成。",
      intro: [
        "拖入一张接近正方形的图片,一次得到项目真正需要的六种 PNG:16 / 32 / 48 px 网站图标、180 px 的 apple-touch-icon,以及 192 / 512 px 的 Android / PWA 图标。非正方形图片会居中放在正方形画布上,留白填充你选的背景色;直角、圆角、圆形三种边角样式可选。",
        "每种尺寸都按真实像素渲染,可单独下载,也可打包成一个 .zip;同时生成一段可直接复制的 <head> 代码,文件名与压缩包一致,解压放进项目静态目录就能用。",
      ],
      steps: [
        "拖入一张图片,最好是正方形的 logo。",
        "选择留白背景色和边角样式(直角 / 圆角 / 圆形)。",
        "生成套件,逐个下载或打包下载 .zip。",
        "把 HTML 代码粘贴进页面 <head>,PNG 文件放入静态资源目录。",
      ],
      faqs: [
        {
          q: "到底需要哪几种尺寸?",
          a: "16 和 32 px 覆盖浏览器标签页,48 px 用于书签和快捷方式,180 px 是 iOS 主屏图标要求的尺寸,192 和 512 px 是 Android 与 PWA manifest 需要的。一次生成六种,以后就不用再想了。",
        },
        {
          q: "为什么 logo 缩到 16 px 就糊了?",
          a: "16 px 的图标总共只有 256 个像素,细节和细线条必然丢失。生成 favicon 最好用笔画粗、对比强的简洁图形;如果原 logo 很复杂,建议专门做一版简化的小尺寸图案。",
        },
        {
          q: "还需要 .ico 文件吗?",
          a: "现代浏览器通过 <link> 标签直接使用 PNG favicon,本工具生成的代码就够用了。只有非常老的浏览器才依赖 .ico,对绝大多数网站可以忽略。",
        },
      ],
    },
    ja: {
      name: "Favicon ジェネレーター",
      tagline:
        "ロゴや画像から完全な favicon セットを生成。16〜512 px の 6 サイズ PNG、角丸オプション、貼り付けるだけの HTML 付き。すべてブラウザ内で処理します。",
      intro: [
        "ほぼ正方形の画像を 1 枚ドロップするだけで、実際のプロジェクトに必要な 6 種類の PNG を一度に生成します:16・32・48 px のファビコン、180 px の apple-touch-icon、Android や PWA マニフェスト用の 192・512 px。正方形以外の画像は、選んだ背景色で余白を埋めて正方形キャンバスの中央に配置され、角は四角・角丸・円から選べます。",
        "各サイズは実際のピクセル数で描画され、個別ダウンロードも .zip 一括も可能です。ファイル名と一致する <head> 用スニペットも生成されるので、PNG をプロジェクトの公開フォルダに置けばすぐ使えます。",
      ],
      steps: [
        "画像を 1 枚ドロップします(正方形のロゴが最適)。",
        "余白の背景色と角のスタイル(四角 / 角丸 / 円)を選びます。",
        "セットを生成し、各サイズまたは .zip をダウンロードします。",
        "HTML スニペットをページの <head> に貼り、PNG を公開フォルダへ置きます。",
      ],
      faqs: [
        {
          q: "実際に必要な favicon サイズは?",
          a: "16 と 32 px がブラウザタブ、48 px はショートカットやブックマーク、180 px は iOS のホーム画面、192 と 512 px は Android や PWA マニフェストが求めるサイズです。6 種類を一度生成しておけば後は考えなくて済みます。",
        },
        {
          q: "16 px でロゴがにじむのはなぜ?",
          a: "16 px のアイコンは合計 256 ピクセルしかなく、細部や細い線は消えてしまいます。太い線と強いコントラストのシンプルな図形が最適です。複雑なロゴなら、小サイズ用に簡略化した別バージョンを用意するのがおすすめです。",
        },
        {
          q: ".ico ファイルはまだ必要?",
          a: "最新のブラウザは <link> タグ経由の PNG favicon で動作するため、このツールが生成するコードで十分です。レガシーな .ico が必要なのは非常に古いブラウザだけで、多くのサイトでは無視できます。",
        },
      ],
    },
    es: {
      name: "Generador de favicons",
      tagline:
        "Convierte cualquier logo o imagen en un set de favicons completo: PNG de 16 a 512 px con esquinas redondeadas y el HTML listo para pegar. En tu navegador.",
      intro: [
        "Suelta una imagen cuadrada (o casi) y obtén los seis tamaños PNG que los proyectos reales necesitan: favicons de 16, 32 y 48 px, un apple-touch-icon de 180 px e iconos de 192 / 512 px para Android y manifiestos PWA. Las imágenes no cuadradas se centran en un lienzo cuadrado rellenado con el color de fondo que elijas, y las esquinas pueden ser rectas, redondeadas o un círculo completo.",
        "Cada tamaño se genera a sus píxeles reales y se puede descargar por separado o todo junto en un .zip, junto con un fragmento <head> para copiar y pegar que usa los mismos nombres de archivo: suelta los PNG en la carpeta pública de tu proyecto y listo.",
      ],
      steps: [
        "Suelta una imagen; un logo cuadrado funciona mejor.",
        "Elige el color de relleno y el estilo de esquina (rectas, redondeadas o círculo).",
        "Genera el set y descarga cada tamaño o el .zip completo.",
        "Pega el fragmento HTML en el <head> de tu página y sube los PNG.",
      ],
      faqs: [
        {
          q: "¿Qué tamaños de favicon necesito de verdad?",
          a: "16 y 32 px cubren las pestañas del navegador, 48 px ayuda con accesos directos y marcadores, 180 px es lo que piden las pantallas de inicio de iOS, y 192 / 512 px son los tamaños que buscan Android y los manifiestos de web apps. Generar los seis de una vez te libra de volver a pensarlo.",
        },
        {
          q: "¿Por qué se ve borroso a 16 px?",
          a: "Un icono de 16 px tiene 256 píxeles en total: los detalles finos y los trazos delgados desaparecen. Los favicons quedan mejor con marcas simples, de trazo grueso y alto contraste; si tu logo es muy detallado, prepara una versión simplificada como imagen de origen.",
        },
        {
          q: "¿Sigo necesitando un .ico?",
          a: "Los navegadores modernos usan favicons PNG mediante etiquetas <link>, y el fragmento que genera esta herramienta es todo lo que necesitan. Un .ico clásico solo importa para navegadores muy antiguos, que hoy son raros en la mayoría de los sitios.",
        },
      ],
    },
    pt: {
      name: "Gerador de favicon",
      tagline:
        "Transforme qualquer logo ou imagem em um set completo de favicons — PNGs de 16 a 512 px com cantos arredondados e o HTML pronto para colar. No navegador.",
      intro: [
        "Solte uma imagem quadrada (ou quase) e receba os seis tamanhos PNG que projetos reais precisam: favicons de 16, 32 e 48 px, um apple-touch-icon de 180 px e ícones de 192 / 512 px para Android e manifests PWA. Imagens não quadradas ficam centralizadas em um canvas quadrado preenchido com a cor de fundo escolhida, e os cantos podem ser retos, arredondados ou um círculo completo.",
        "Cada tamanho é renderizado nos pixels reais e pode ser baixado separadamente ou tudo de uma vez em um .zip, junto com um trecho <head> de copiar e colar que usa os mesmos nomes de arquivo — basta soltar os PNGs na pasta pública do projeto.",
      ],
      steps: [
        "Solte uma imagem — um logo quadrado funciona melhor.",
        "Escolha a cor de preenchimento e o estilo de canto (retos, arredondados ou círculo).",
        "Gere o set e baixe cada tamanho ou o .zip completo.",
        "Cole o trecho HTML no <head> da página e envie os PNGs.",
      ],
      faqs: [
        {
          q: "Quais tamanhos de favicon eu realmente preciso?",
          a: "16 e 32 px cobrem as abas do navegador, 48 px ajuda em atalhos e favoritos, 180 px é o que as telas iniciais do iOS pedem, e 192 / 512 px são os tamanhos que Android e manifests de web apps procuram. Gerar os seis de uma vez resolve para sempre.",
        },
        {
          q: "Por que meu logo fica borrado a 16 px?",
          a: "Um ícone de 16 px tem 256 pixels no total — detalhes finos e traços delicados simplesmente desaparecem. Favicons ficam melhores com marcas simples, de traço grosso e alto contraste; se o seu logo é detalhado, faça uma versão simplificada como imagem de origem.",
        },
        {
          q: "Ainda preciso de um .ico?",
          a: "Navegadores modernos usam favicons PNG por meio de tags <link>, e o trecho gerado por esta ferramenta é tudo de que eles precisam. O .ico clássico só importa para navegadores muito antigos, cada vez mais raros na maioria dos sites.",
        },
      ],
    },
  },
});
