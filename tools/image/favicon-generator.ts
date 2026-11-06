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
      deepDive: [
        {
          heading: "Why favicons need multiple sizes",
          paragraphs: [
            "A favicon is not one file: the same mark gets displayed at 16 px in a browser tab, 32 px in some retina tabs and task bars, around 180 px as an Apple touch icon on iOS home screens, and 512 px for Android and PWA installation screens. Serving a single 16 px file to all of those contexts makes the home-screen icon look like a smear of pixels.",
            "Browsers pick the largest declared icon that fits the context and scale down gracefully, but they cannot scale up — a 16 px source stretched to 512 px is unrecoverably blurry. That is why the generator starts from a high-resolution source image and produces the whole size ladder at once.",
            "The practical set to declare covers the common ground: 16 and 32 px for tabs, 180 px for iOS, 192 and 512 px for Android/PWA manifests. Declaring all of them in your HTML with correct link tags lets each platform choose its best fit.",
          ],
        },
        {
          heading: "Designing a mark that survives 16 pixels",
          paragraphs: [
            "Most logos die at 16 px: fine lines merge into noise, letterforms become blobs, two-color details vanish. The favicon-safe approach is to reduce the mark to its single most recognizable element — one letter, one symbol, one shape — rather than shrinking the full logo lockup.",
            "Test at the target sizes, not at full resolution: what reads clearly at 512 px may be illegible at 16 px. High contrast, thick strokes and a simple silhouette survive downscaling; gradients and thin outlines do not.",
            "Also consider the dark side: tabs and OSes render icons on both light and dark backgrounds. A mark that is pure black on transparency disappears in dark mode, and pure white disappears in light mode. Adding a subtle contrasting outline or a filled background shape makes the icon work in both.",
          ],
        },
        {
          heading: "Local generation and brand privacy",
          paragraphs: [
            "A favicon is the seed of a brand's visual identity, and brand-in-progress logos are often confidential — unreleased product marks, redesign candidates. Generating favicon sets locally in the browser means a design that has never been shown publicly never touches an upload queue.",
            "The tool renders your source image down to each target size in your device's browser, producing clean downscales from the full-resolution original. No server sees the artwork, and the generated files download straight to your disk.",
            "Workflow tip: regenerate the set whenever the source mark changes, and keep the generation reproducible — the same source image should always produce the same favicon set, so a missing size can be recreated at any time.",
          ],
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
      deepDive: [
        {
          heading: "favicon 为什么要多个尺寸",
          paragraphs: [
            "favicon 不是一个文件:同一枚标志要在浏览器标签页以 16 px 显示,部分高分屏标签和任务栏用 32 px,iOS 主屏幕的 Apple touch icon 约 180 px,Android 和 PWA 安装屏则要 512 px。让所有场景共用一个 16 px 文件,主屏图标就会糊成一团色块。",
            "浏览器会挑声明尺寸中最合适的一个并向下缩放,但不会向上放大——16 px 的源图拉伸到 512 px 是不可救药的模糊。所以生成器从高分辨率源图出发,一次性产出整条尺寸阶梯。",
            "实用声明集合覆盖常见场景:标签页用 16 和 32 px,iOS 用 180 px,Android/PWA 清单用 192 和 512 px。在 HTML 里用正确的 link 标签全部声明,让每个平台各取所需。",
          ],
        },
        {
          heading: "设计一枚在 16 像素下还能活的标志",
          paragraphs: [
            "多数 Logo 撑不过 16 px:细线条糊成噪点,字形变成一团,双色细节消失。favicon 安全的做法是把标志压缩成它最具辨识度的那个元素——一个字母、一个符号、一个形状——而不是把整个 Logo 组合原样缩小。",
            "在目标尺寸下测试,而不是看全尺寸效果:512 px 下一目了然的东西,16 px 时可能完全无法辨认。高对比、粗笔画、简单剪影能扛住缩小;渐变和细描边扛不住。",
            "还要考虑暗色场景:标签页和操作系统会在浅色和深色背景上渲染图标。透明底上的纯黑标志在深色模式里会消失,纯白则在浅色模式里消失。加一圈淡对比描边,或者垫一个有底色的形状,能让图标两边都立得住。",
          ],
        },
        {
          heading: "本地生成与品牌隐私",
          paragraphs: [
            "favicon 是品牌视觉识别的种子,而进行中的品牌标志往往涉密——未发布的产品标志、改版备选方案。在浏览器本地生成 favicon 全套,意味着从未公开亮相的设计不会进入任何上传队列。",
            "本工具在你的设备浏览器里把源图渲染到各个目标尺寸,从全分辨率原图产出干净的缩小版本。没有任何服务器见过这件作品,生成的文件直接下载到你的磁盘。",
            "工作流提示:源标志一旦变更就重新生成整套,并保持生成可复现——同一张源图应永远产出同一套 favicon,这样任何缺失的尺寸都能随时补齐。",
          ],
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
      deepDive: [
        {
          heading: "favicon に複数サイズが必要な理由",
          paragraphs: [
            "favicon は1つのファイルではありません:同じマークが、ブラウザタブでは 16 px、一部の retina タブやタスクバーでは 32 px、iOS ホーム画面の Apple touch icon では約 180 px、Android や PWA のインストール画面では 512 px で表示されます。すべての文脈に 1 つの 16 px ファイルを流用すると、ホーム画面のアイコンは色の滲みのようになります。",
            "ブラウザは文脈に合う宣言済み最大サイズを選び、縮小はうまく処理しますが、拡大はできません——16 px のソースを 512 px に伸ばすと修復不可能なぼやけになります。だからジェネレーターは高解像度の元画像から、サイズの階段全体を一度に生成します。",
            "実用的な宣言セットは定番の地面を覆います:タブには 16 と 32 px、iOS には 180 px、Android/PWA マニフェストには 192 と 512 px。HTML に正しい link タグで全部宣言すれば、各プラットフォームが最適なものを選びます。",
          ],
        },
        {
          heading: "16 ピクセルで生き残るマークの設計",
          paragraphs: [
            "多くのロゴは 16 px で死にます:細い線はノイズに溶け、文字は塊になり、2色のディテールは消える。favicon 向けの発想は、マークを最も認識しやすい要素一つ——1 文字、1 記号、1 形状——に絞ることであって、ロゴ全体を縮小することではありません。",
            "フル解像度ではなくターゲットサイズでテストする:512 px では明瞭なものが 16 px では判読不能になり得ます。高コントラスト・太いストローク・シンプルなシルエットは縮小に耐え、グラデーションと細いアウトラインは耐えません。",
            "暗い側も考慮:タブや OS は明るい背景にも暗い背景にもアイコンを描画します。透明背景の純黒マークはダークモードで消え、純白はライトモードで消えます。淡いコントラストのアウトラインか、塗りつぶしの下地形状を足せば、両方で機能します。",
          ],
        },
        {
          heading: "ローカル生成とブランドのプライバシー",
          paragraphs: [
            "favicon はブランドの視覚認識の種であり、進行中のブランドロゴはしばしば機密です——未発表のプロダクトマーク、リデザイン候補。ブラウザ内でローカルに favicon セットを生成すれば、一度も公開されたことのないデザインがアップロードキューに触れることはありません。",
            "このツールは端末のブラウザ内で元画像を各ターゲットサイズへレンダリングし、フル解像度の元画像からきれいな縮小版を生み出します。作品を見るサーバーは存在せず、生成ファイルはディスクに直接ダウンロードされます。",
            "ワークフローのヒント:元マークが変わるたびにセットを再生成し、生成を再現可能に保つ——同じ元画像は常に同じ favicon セットを生むべきで、欠けたサイズはいつでも作り直せます。",
          ],
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
      deepDive: [
        {
          heading: "Por qué los favicons necesitan varios tamaños",
          paragraphs: [
            "Un favicon no es un archivo: la misma marca se muestra a 16 px en la pestaña del navegador, a 32 px en algunas pestañas retina y barras de tareas, a unos 180 px como icono táctil de Apple en las pantallas de inicio de iOS, y a 512 px para Android y las pantallas de instalación de PWA. Servir un único archivo de 16 px a todos esos contextos convierte el icono de inicio en una mancha de píxeles.",
            "Los navegadores eligen el icono declarado más grande que encaje en el contexto y reducen con elegancia, pero no pueden ampliar — una fuente de 16 px estirada a 512 px es borrosa sin remedio. Por eso el generador parte de una imagen fuente de alta resolución y produce toda la escalera de tamaños de una vez.",
            "El conjunto práctico a declarar cubre el terreno común: 16 y 32 px para pestañas, 180 px para iOS, 192 y 512 px para manifiestos Android/PWA. Declararlos todos en tu HTML con las etiquetas link correctas permite a cada plataforma elegir su mejor ajuste.",
          ],
        },
        {
          heading: "Diseñar una marca que sobreviva a 16 píxeles",
          paragraphs: [
            "La mayoría de los logos mueren a 16 px: las líneas finas se funden en ruido, las letras se vuelven manchas, los detalles de dos colores desaparecen. El enfoque seguro para favicon es reducir la marca a su elemento más reconocible — una letra, un símbolo, una forma — en lugar de encoger el conjunto completo del logo.",
            "Prueba en los tamaños objetivo, no a resolución completa: lo que se lee con claridad a 512 px puede ser ilegible a 16 px. El alto contraste, los trazos gruesos y una silueta simple sobreviven a la reducción; los degradados y los contornos finos, no.",
            "Considera también el lado oscuro: las pestañas y los sistemas operativos dibujan iconos sobre fondos claros y oscuros. Una marca negra pura sobre transparencia desaparece en modo oscuro, y una blanca pura en modo claro. Añadir un contorno de contraste sutil o una forma de fondo rellena hace que el icono funcione en ambos.",
          ],
        },
        {
          heading: "Generación local y privacidad de marca",
          paragraphs: [
            "Un favicon es la semilla de la identidad visual de una marca, y los logos en desarrollo suelen ser confidenciales — marcas de producto no lanzadas, candidatos de rediseño. Generar los juegos de favicon localmente en el navegador significa que un diseño jamás mostrado en público nunca toca una cola de subida.",
            "La herramienta renderiza tu imagen fuente a cada tamaño objetivo en el navegador de tu dispositivo, produciendo reducciones limpias desde el original de alta resolución. Ningún servidor ve la obra, y los archivos generados se descargan directamente a tu disco.",
            "Consejo de flujo: regenera el set cada vez que cambie la marca fuente y mantén la generación reproducible — la misma imagen fuente debe producir siempre el mismo set de favicons, así cualquier tamaño perdido puede recrearse en cualquier momento.",
          ],
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
      deepDive: [
        {
          heading: "Por que favicons precisam de vários tamanhos",
          paragraphs: [
            "Um favicon não é um arquivo: a mesma marca é exibida a 16 px na aba do navegador, a 32 px em algumas abas retina e barras de tarefas, a cerca de 180 px como ícone de toque da Apple nas telas de início do iOS, e a 512 px para Android e telas de instalação de PWA. Servir um único arquivo de 16 px a todos esses contextos transforma o ícone de início numa mancha de pixels.",
            "Os navegadores escolhem o ícone declarado maior que cabe no contexto e reduzem com elegância, mas não podem ampliar — uma fonte de 16 px esticada a 512 px é borrada sem remédio. Por isso o gerador parte de uma imagem fonte de alta resolução e produz toda a escada de tamanhos de uma vez.",
            "O conjunto prático a declarar cobre o terreno comum: 16 e 32 px para abas, 180 px para iOS, 192 e 512 px para manifestos Android/PWA. Declarar todos no seu HTML com as tags link corretas permite que cada plataforma escolha seu melhor ajuste.",
          ],
        },
        {
          heading: "Desenhar uma marca que sobrevive a 16 pixels",
          paragraphs: [
            "A maioria dos logos morre a 16 px: linhas finas se fundem em ruído, letras viram manchas, detalhes de duas cores somem. A abordagem segura para favicon é reduzir a marca ao seu elemento mais reconhecível — uma letra, um símbolo, uma forma — em vez de encolher o conjunto completo do logo.",
            "Teste nos tamanhos-alvo, não na resolução total: o que se lê claramente a 512 px pode ser ilegível a 16 px. Alto contraste, traços grossos e uma silhueta simples sobrevivem à redução; gradientes e contornos finos não.",
            "Considere também o lado escuro: abas e sistemas operacionais desenham ícones sobre fundos claros e escuros. Uma marca preta pura sobre transparência desaparece no modo escuro, e uma branca pura no modo claro. Adicionar um contorno de contraste sutil ou uma forma de fundo preenchida faz o ícone funcionar nos dois.",
          ],
        },
        {
          heading: "Geração local e privacidade da marca",
          paragraphs: [
            "Um favicon é a semente da identidade visual de uma marca, e logos em desenvolvimento costumam ser confidenciais — marcas de produto não lançadas, candidatos de redesenho. Gerar os conjuntos de favicon localmente no navegador significa que um design jamais mostrado em público nunca toca uma fila de envio.",
            "A ferramenta renderiza sua imagem fonte em cada tamanho-alvo no navegador do seu dispositivo, produzindo reduções limpas a partir do original em alta resolução. Nenhum servidor vê a obra, e os arquivos gerados baixam direto para o seu disco.",
            "Dica de fluxo: regenere o conjunto sempre que a marca fonte mudar e mantenha a geração reproduzível — a mesma imagem fonte deve produzir sempre o mesmo conjunto de favicons, assim qualquer tamanho perdido pode ser recriado a qualquer momento.",
          ],
        },
      ],
    },
  },
});
