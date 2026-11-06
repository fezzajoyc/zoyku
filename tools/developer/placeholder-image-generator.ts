import { CalcEnginePlaceholder } from "../_engines/calc-engine-placeholder";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "placeholder-image-generator",
  category: "developer",
  icon: "image",
  engine: { component: CalcEnginePlaceholder },
  related: ["qr-generator", "base64-image", "color-picker", "aspect-ratio-calculator", "md5-generator", "sha256-generator", "json-validator", "json-formatter", "url-encoder", "html-minifier"],
  copy: {
    en: {
      name: "Placeholder Image Generator",
      tagline: "Generate placeholder images of any size in SVG, PNG or JPG — pick colors and a label, preview instantly, then download the file or copy the SVG markup.",
      intro: [
        "Mockups and wireframes need image boxes before the real assets exist. Type a width and height — a hero at 1200×630, an avatar at 256×256, or anything from 1×1 up to 5000×5000 — choose background and text colors, optionally add a label, and the placeholder renders live as you type.",
        "Download the result as SVG, PNG or JPG, or copy the SVG markup straight to your clipboard: it is a handful of readable elements, not base64 soup, so you can paste it into HTML, JSX or Figma and edit the text and colors by hand. Everything is generated in your browser; nothing is uploaded.",
      ],
      steps: [
        "Enter the width and height in pixels.",
        "Set the background and text colors, and an optional label (defaults to the dimensions).",
        "Download as SVG, PNG or JPG — or copy the SVG markup and paste it anywhere.",
      ],
      faqs: [
        {
          q: "When should I use SVG instead of PNG or JPG?",
          a: "SVG is text: tiny, infinitely scalable and editable by hand, which makes it ideal for mockups, docs and e-mail-safe layouts. PNG is the safer pick for platforms that mangle inline SVG (some CMSes and chat apps), and JPG suits photo-like placeholders at small file sizes. The preview is identical in all three.",
        },
        {
          q: "What are the size and color limits?",
          a: "Width and height must be whole numbers between 1 and 5000 pixels; colors must be hex — #RRGGBB or the short #RGB form. Anything else is rejected with a hint rather than silently producing a broken image.",
        },
        {
          q: "Is anything sent to a server?",
          a: "No. The SVG is built from a string template in your browser and raster versions are drawn on a local canvas. Nothing leaves the page, so it works offline and is safe for unreleased designs.",
        },
      ],
      deepDive: [
        {
          heading: "SVG as the source format: text that scales",
          paragraphs: [
            "A placeholder does not need a raster file — it needs a rectangle with a label. Expressing it as SVG means the output is a few lines of readable markup: a rect, a text element, maybe a fill attribute. That text is the reason SVG copies cleanly into HTML, JSX, Figma or a README, and why it can be re-edited afterwards — change the label or the hex color in the markup and the image updates. A PNG of the same thing is frozen pixels nobody can adjust without regenerating.",
            "SVG also scales: the same 1 KB file renders crisply at 64×64 in an avatar slot and at 1200×630 in a hero mockup, because a vector drawing has no resolution. Raster placeholders either look blurry when stretched or waste bytes when oversized. For wireframes and documentation — the main habitats of placeholders — the vector path is usually strictly better.",
            "The two raster formats earn their place in specific niches. PNG suits platforms that sanitize or mangle inline SVG (some CMSes, email clients and chat apps strip or break it), and JPG wins when the placeholder mimics a photo because JPEG compression handles gradients and noise better than PNG's palette approach. Same preview, three delivery formats — the choice belongs to the target platform, not to taste.",
          ],
        },
        {
          heading: "The dimensions that matter in real layouts",
          paragraphs: [
            "Certain sizes recur because platforms fix them. The 1200×630 rectangle is the canonical open-graph / social-preview card size — the ratio most platforms crop link previews into. 256×256 and similar powers of two match avatar and icon slots. 16:9 rectangles (1280×720) line up with video embeds. Choosing a placeholder with the final asset's aspect ratio means the mockup never shifts when the real image arrives, because layout reflow is the expensive bug these images exist to prevent.",
            "The 1–5000 pixel cap is not arbitrary. Below 1 pixel an image cannot render meaningfully; above a few thousand, browsers and design tools start choking on canvas allocations — a 5000×5000 PNG at full quality is already tens of megabytes of raw pixel data before compression. Placeholder generators rarely need more, and rejecting extreme sizes with a clear message beats producing a file that will not open anywhere.",
            "One habit worth adopting: keep label text inside the image but keep real dimensions in the surrounding markup. An img tag with explicit width and height attributes plus a placeholder at the same ratio gives you a stable layout box now and a drop-in replacement later — no CSS surgery when the real asset lands.",
          ],
        },
        {
          heading: "Why generation stays on your machine",
          paragraphs: [
            "Placeholder images show up earliest in a project's life — wireframes of unreleased products, mockups of features under NDA, internal dashboards nobody outside the company should see. That makes the usual online-generator workflow uncomfortable: type your dimensions into a service and the request (often including a project-revealing label) hits someone else's server and may be logged. This tool builds the SVG from a string template and draws raster versions on a local canvas — no network request carries your design at any point.",
            "Local generation also removes the account-and-watermark economy that surrounds many placeholder services: no sign-up, no rate limits per day, no branding baked into the corner of your mockup. The file you download is exactly the file you specified, and the SVG markup you copy is yours to modify.",
            "It also works offline once the page is loaded, which matters more than it sounds: designers and developers often work in transit or on restricted networks, and a tool that dies without connectivity is useless in exactly the situations where a quick placeholder is needed. Generate, download, close the tab — nothing was ever transmitted.",
          ],
        },
      ],
    },
    zh: {
      name: "占位图生成器",
      tagline: "生成任意尺寸的占位图,支持 SVG、PNG、JPG 三种格式——自定义颜色与文字,即时预览,可下载文件或直接复制 SVG 标记。",
      intro: [
        "做原型和线框图时,真实素材往往还没到位,但版面里需要图片占位。输入宽高——首图 1200×630、头像 256×256,或 1×1 到 5000×5000 之间的任意尺寸——选好背景色和文字色,按需加一行文字,占位图随输入实时呈现。",
        "结果可下载为 SVG、PNG 或 JPG,也可以直接复制 SVG 标记:它是几行可读的标签而非 base64 长串,粘进 HTML、JSX 或 Figma 后还能继续手改文字和颜色。全部在浏览器本地生成,不上传任何内容。",
      ],
      steps: [
        "输入以像素为单位的宽度和高度。",
        "设置背景色与文字色,可选填一行文字(默认显示尺寸)。",
        "下载为 SVG、PNG 或 JPG——或复制 SVG 标记粘贴到任何地方。",
      ],
      faqs: [
        {
          q: "什么时候该用 SVG 而不是 PNG 或 JPG?",
          a: "SVG 是文本:体积极小、无限缩放、可手工编辑,适合原型、文档和对内联 SVG 友好的布局。PNG 更适合会破坏内联 SVG 的平台(部分 CMS 和聊天工具),JPG 适合照片感占位、文件更小。三种格式的预览效果完全一致。",
        },
        {
          q: "尺寸和颜色有什么限制?",
          a: "宽高必须是 1–5000 之间的整数(像素);颜色必须是十六进制格式——#RRGGBB 或简写 #RGB。非法输入会得到明确提示,而不是悄悄生成坏图。",
        },
        {
          q: "数据会被上传吗?",
          a: "不会。SVG 由浏览器里的字符串模板拼出,位图版本由本地画布渲染。没有任何数据离开页面,离线可用,也适合未发布的设计稿。",
        },
      ],
      deepDive: [
        {
          heading: "SVG 作为源格式:会缩放的文本",
          paragraphs: [
            "占位图不需要位图文件——它需要的只是一个带文字的矩形。用 SVG 表达,产物就是几行可读的标记:一个 rect、一个 text、或许一个 fill 属性。正因为它是文本,SVG 才能干净地复制进 HTML、JSX、Figma 或 README,并且事后可再编辑——直接改标记里的文字或十六进制色值,图片随之更新。同一内容的 PNG 是冻结的像素,不重新生成谁也改不了。",
            "SVG 还能任意缩放:同一个 1 KB 的文件,在 64×64 的头像位上清晰、在 1200×630 的首图位上也清晰,因为矢量图没有分辨率概念。位图占位图要么拉伸后发糊,要么尺寸过大浪费字节。占位图的主场——线框图和文档——矢量路径几乎总是严格更优。",
            "两种位图格式各有专攻。PNG 适合会清洗或破坏内联 SVG 的平台(部分 CMS、邮件客户端和聊天工具会把 SVG 剥掉或弄坏);当占位图要模仿照片时,JPG 胜出,因为 JPEG 压缩处理渐变和噪点比 PNG 的调色板方式更在行。预览完全相同、三种交付格式——选择取决于目标平台,而不是个人口味。",
          ],
        },
        {
          heading: "真实版面里的那些关键尺寸",
          paragraphs: [
            "有些尺寸反复出现,因为平台把它们定死了。1200×630 是开放图谱/社交预览卡片的经典尺寸——大多数平台按这个比例裁剪链接预览。256×256 这类 2 的幂对应头像和图标位。16:9 的矩形(1280×720)与视频嵌入对齐。占位图按最终素材的长宽比来做,真实图片到位时版面就不会跳动——布局回流正是这些图片存在的目的所要避免的那个 bug。",
            "1–5000 像素的上限不是拍脑袋。小于 1 像素的图无法有意义地渲染;超过几千像素,浏览器和设计工具就会在 canvas 分配上吃力——一张全质量 5000×5000 的 PNG,压缩前就是几十 MB 的原始像素数据。占位图几乎从不需要这么大,对极端尺寸给出明确拒绝,好过产出一个哪儿都打不开的文件。",
            "值得养成的习惯:文字写在图里,真实尺寸写在外层标记里。img 标签带显式的 width/height 属性,占位图用相同比例——现在版面盒稳定,将来真实素材直接换入即可,不需要动 CSS。",
          ],
        },
        {
          heading: "为什么生成要留在本机",
          paragraphs: [
            "占位图出现在项目最早期的阶段:未发布产品的线框图、保密协议下的功能稿、不该被外部看到的公司内部面板。这让常规的在线生成器工作流变得别扭:把尺寸输入某个服务,请求(常常带着能暴露项目的文字)就打到了别人的服务器上,还可能被记日志。本工具用字符串模板拼 SVG、用本地画布画位图——任何时刻都没有网络请求带走你的设计。",
            "本地生成还顺带绕开了许多占位图服务的账号与水印经济学:无需注册、没有每日次数限制、模型角落里也没有烙上的品牌标识。你下载的文件就是你所指定的文件,复制的 SVG 标记归你随意修改。",
            "页面加载后还能离线使用,这件事比听起来重要:设计师和开发者常在通勤路上或受限网络里工作,离线就死掉的工具,恰恰在急需一张占位图的时刻帮不上忙。生成、下载、关掉标签页——从头到尾没有传输过任何东西。",
          ],
        },
      ],
    },
    ja: {
      name: "プレースホルダー画像生成",
      tagline: "任意サイズのプレースホルダー画像を SVG・PNG・JPG で生成。色とラベルを指定して即時プレビュー、ファイルのダウンロードも SVG のコピーも可能。",
      intro: [
        "モックアップやワイヤーフレームでは、実素材が揃う前に画像ボックスが必要です。幅と高さを入力してください。ヒーローは 1200×630、アバターは 256×256、1×1 から 5000×5000 まで任意のサイズに対応します。背景色と文字色を選び、必要ならラベルを付けると、入力に合わせてリアルタイムに描画されます。",
        "結果は SVG・PNG・JPG でダウンロードできるほか、SVG のマークアップをそのままコピーすることもできます。base64 の塊ではなく数行の読める要素なので、HTML・JSX・Figma に貼り付けて文字や色を手で直せます。生成はすべてブラウザ内で行われ、アップロードは一切ありません。",
      ],
      steps: [
        "幅と高さをピクセルで入力します。",
        "背景色と文字色、任意のラベルを設定します(既定はサイズ表記)。",
        "SVG・PNG・JPG でダウンロードするか、SVG マークアップをコピーして好きな場所に貼り付けます。",
      ],
      faqs: [
        {
          q: "PNG や JPG ではなく SVG を使うべき場面は?",
          a: "SVG はテキストなので、軽量・無限に拡大可能・手で編集でき、モックアップやドキュメント、インライン SVG を壊さないレイアウトに最適です。CMS やチャットなどインライン SVG を壊すプラットフォームには PNG が無難で、写真風のプレースホルダーにはファイルサイズの小さい JPG が向きます。プレビューは 3 形式とも同じです。",
        },
        {
          q: "サイズと色の制限は?",
          a: "幅と高さは 1〜5000 ピクセルの整数、色は #RRGGBB または短縮形 #RGB の 16 進表記です。それ以外の入力は壊れた画像を黙って生成するのではなく、ヒント付きで拒否されます。",
        },
        {
          q: "データはサーバーに送られますか?",
          a: "いいえ。SVG はブラウザ内の文字列テンプレートから組み立てられ、ラスター版はローカルのキャンバスで描画されます。ページの外に出るデータはなく、オフラインで動作し、未公開デザインにも安全です。",
        },
      ],
      deepDive: [
        {
          heading: "SVG をソース形式に:拡大しても荒れないテキスト",
          paragraphs: [
            "プレースホルダーに必要なのはラスター画像ではなく、ラベル付きの長方形です。SVG で表現すれば、出力は数行の読めるマークアップ——rect、text、fill 属性くらい——になります。テキストだからこそ HTML・JSX・Figma・README にそのまま貼れ、後からも編集できます。ラベルや hex カラーをマークアップで書き換えれば画像が更新される。同じものの PNG は再生しない限り誰にも直せない固定ピクセルです。",
            "ページを読み込めばオフラインでも動きます。これは聞こえ以上に重要です。デザイナーや開発者は移動中や制限されたネットワークで作業することが多く、接続が死ぬと同時に死ぬツールは、素早くプレースホルダーが欲しいまさの瞬間に役に立ちません。生成、ダウンロード、タブを閉じる——何も送信されていません。",
          ],
        },
        {
          heading: "プラットフォームが決めたサイズ",
          paragraphs: [
            "特定のサイズが繰り返し現れるのは、プラットフォームが固定しているからです。1200×630 はオープングラフ/ソーシャルプレビューカードの標準寸法で、多くのプラットフォームはこの比率でリンクプレビューを切り抜きます。256×256 のような 2 の累乗はアバターやアイコン枠に対応します。",
            "1〜5000 ピクセルの上限には理由があります。1 ピクセル未満は意味のある描画ができず、数千ピクセルを超えるとブラウザやデザインツールが canvas の確保に苦労します。全品質の 5000×5000 PNG は数十 MB になり得ます。実用上限は仕様ではなく常識です。",
            "習慣にしたいこと:ラベルは画像の中に、実寸は外側のマークアップに。img 要素に明示的な width/height を付け、プレースホルダーを同じ比率で置く。今はレイアウトの箱が安定し、将来は実素材を入れ替えるだけで済みます。",
          ],
        },
        {
          heading: "未公開デザインで使える理由",
          paragraphs: [
            "プレースホルダーはプロジェクトの最も早い段階に現れます。未発表製品のワイヤー、NDA 下の機能案、外に出せない社内ダッシュボード。これが一般的なオンライン生成器を厄介にします:寸法をどこかのサービスに入力すると、そのリクエスト(プロジェクト名を晒しかねない参照元付き)が相手のサーバーログに残ります。",
            "ローカル生成は、多くのプレースホルダーサービスを取り巻くアカウントとウォーターマークの経済も回避します。登録不要、回数制限なし、モデルの隅に焼き付けられたブランド表示もなし。ダウンロードしたファイルは指定した通りのファイルで、コピーした SVG は自由に改変できます。",
          ],
        },
      ],
    },
    es: {
      name: "Generador de imágenes de marcador",
      tagline: "Genere imágenes de marcador de cualquier tamaño en SVG, PNG o JPG — elija colores y una etiqueta, previsualice al instante y descargue o copie el marcado SVG.",
      intro: [
        "En maquetas y wireframes hacen falta cajas de imagen antes de tener los recursos reales. Escriba un ancho y un alto — un hero de 1200×630, un avatar de 256×256, o cualquier tamaño de 1×1 a 5000×5000 — elija colores de fondo y de texto, añada una etiqueta opcional, y el marcador se dibuja en vivo mientras escribe.",
        "Descargue el resultado como SVG, PNG o JPG, o copie el marcado SVG directamente: son unos pocos elementos legibles, no una sopa de base64, así que puede pegarlo en HTML, JSX o Figma y editar el texto y los colores a mano. Todo se genera en su navegador; no se sube nada.",
      ],
      steps: [
        "Introduzca el ancho y el alto en píxeles.",
        "Fije los colores de fondo y del texto, y una etiqueta opcional (por defecto, las dimensiones).",
        "Descargue como SVG, PNG o JPG — o copie el marcado SVG y péguelo donde quiera.",
      ],
      faqs: [
        {
          q: "¿Cuándo conviene SVG en vez de PNG o JPG?",
          a: "El SVG es texto: minúsculo, escalable sin límite y editable a mano, ideal para maquetas, documentación y diseños donde el SVG en línea funciona. PNG es la opción más segura en plataformas que rompen el SVG en línea (algunos CMS y chats), y JPG encaja con marcadores fotográficos a menor peso. La vista previa es idéntica en los tres.",
        },
        {
          q: "¿Qué límites tienen tamaño y colores?",
          a: "Ancho y alto deben ser números enteros entre 1 y 5000 píxeles; los colores van en hexadecimal — #RRGGBB o la forma corta #RGB. Cualquier otra cosa se rechaza con una pista en lugar de producir en silencio una imagen rota.",
        },
        {
          q: "¿Se envía algo a un servidor?",
          a: "No. El SVG se construye con una plantilla de texto en su navegador y las versiones raster se dibujan en un lienzo local. Nada sale de la página: funciona sin conexión y es seguro para diseños sin publicar.",
        },
      ],
      deepDive: [
        {
          heading: "SVG como formato fuente: texto que escala",
          paragraphs: [
            "A un marcador no le hace falta un archivo raster — necesita un rectángulo con una etiqueta. Expresarlo como SVG hace que la salida sean unas líneas de marcado legible: un rect, un elemento de texto, quizá un atributo de relleno. Precisamente por ser texto, el SVG se copia limpio en HTML, JSX, Figma o un README, y se puede editar después: cambia la etiqueta o el color hexadecimal en el marcado y la imagen se actualiza. Un PNG de lo mismo son píxeles congelados que nadie puede retocar sin regenerarlo.",
            "El SVG además escala: el mismo archivo de 1 KB se ve nítido en un hueco de avatar de 64×64 y en un mockup hero de 1200×630, porque un dibujo vectorial no tiene resolución. Los marcadores raster o se ven borrosos al estirarlos o desperdician bytes al sobredimensionarse. Para wireframes y documentación — el hábitat natural de los marcadores — la vía vectorial es casi siempre estrictamente mejor.",
            "Los dos formatos raster tienen su nicho específico. PNG conviene en plataformas que sane o rompa el SVG en línea (algunos CMS, clientes de correo y chats lo eliminan o lo estropean), y JPG gana cuando el marcador imita una foto, porque la compresión JPEG maneja gradientes y ruido mejor que el enfoque de paleta de PNG. Misma vista previa, tres formatos de entrega — la elección la dicta la plataforma destino, no el gusto.",
          ],
        },
        {
          heading: "Las dimensiones que importan en diseños reales",
          paragraphs: [
            "Ciertos tamaños se repiten porque las plataformas los fijan. El rectángulo de 1200×630 es el tamaño canónico de las tarjetas open-graph / vista previa social — la proporción en la que la mayoría de plataformas recorta las vistas previas de enlaces. 256×256 y similares potencias de dos coinciden con los huecos de avatar e iconos. Los rectángulos 16:9 (1280×720) se alinean con los vídeos incrustados. Elegir un marcador con la relación de aspecto del recurso final significa que la maqueta no salta cuando llega la imagen real, porque el reflow del layout es el bug que estas imágenes existen para prevenir.",
            "El límite de 1–5000 píxeles no es arbitrario. Por debajo de 1 píxel una imagen no puede renderizar con sentido; por encima de unos miles, los navegadores y las herramientas de diseño empiezan a sufrir con las asignaciones de canvas — un PNG de 5000×5000 a calidad completa son ya decenas de megabytes de datos de píxel sin comprimir. Los generadores de marcadores casi nunca necesitan más, y rechazar tamaños extremos con un mensaje claro es mejor que producir un archivo que no abrirá nadie.",
            "Un hábito que merece adoptarse: la etiqueta dentro de la imagen, las dimensiones reales en el marcado que la rodea. Una etiqueta img con atributos width y height explícitos más un marcador con la misma proporción te da ahora una caja de layout estable y luego un reemplazo directo — sin cirugía de CSS cuando llegue el recurso real.",
          ],
        },
        {
          heading: "Por qué la generación se queda en tu máquina",
          paragraphs: [
            "Las imágenes de marcador aparecen en la etapa más temprana de un proyecto: wireframes de productos sin lanzar, mockups de funciones bajo NDA, dashboards internos que nadie fuera de la empresa debería ver. Eso hace incómodo el flujo habitual del generador en línea: escribes tus dimensiones en un servicio y la petición (a menudo con una etiqueta que revela el proyecto) golpea el servidor de otro y puede quedar registrada. Esta herramienta construye el SVG desde una plantilla de texto y dibuja las versiones raster en un canvas local — ninguna petición de red lleva tu diseño en ningún momento.",
            "La generación local también elimina la economía de cuentas y marcas de agua que rodea a muchos servicios de marcadores: sin registro, sin límites diarios, sin branding horneado en la esquina de tu mockup. El archivo que descargas es exactamente el que especificaste, y el marcado SVG que copias es tuyo para modificar.",
            "Además funciona sin conexión una vez cargada la página, lo que importa más de lo que suena: diseñadores y desarrolladores trabajan a menudo en tránsito o en redes restringidas, y una herramienta que muere sin conectividad es inútil justo en las situaciones donde hace falta un marcador rápido. Generar, descargar, cerrar la pestaña — nunca se transmitió nada.",
          ],
        },
      ],
    },
    pt: {
      name: "Gerador de imagem de marcador",
      tagline: "Gere imagens de marcador de qualquer tamanho em SVG, PNG ou JPG — escolha cores e um texto, visualize na hora e baixe o arquivo ou copie a marcação SVG.",
      intro: [
        "Mockups e wireframes precisam de caixas de imagem antes dos assets reais existirem. Digite uma largura e uma altura — um hero de 1200×630, um avatar de 256×256, ou qualquer tamanho de 1×1 a 5000×5000 — escolha as cores de fundo e do texto, adicione um texto opcional, e o marcador é renderizado ao vivo enquanto você digita.",
        "Baixe o resultado em SVG, PNG ou JPG, ou copie a marcação SVG direto para a área de transferência: são poucos elementos legíveis, não uma sopa de base64, então dá para colar em HTML, JSX ou Figma e editar texto e cores à mão. Tudo é gerado no seu navegador; nada é enviado.",
      ],
      steps: [
        "Informe a largura e a altura em pixels.",
        "Defina as cores de fundo e do texto, e um texto opcional (o padrão é a dimensão).",
        "Baixe em SVG, PNG ou JPG — ou copie a marcação SVG e cole em qualquer lugar.",
      ],
      faqs: [
        {
          q: "Quando usar SVG em vez de PNG ou JPG?",
          a: "SVG é texto: minúsculo, escalável sem limite e editável à mão, ideal para mockups, documentação e layouts onde o SVG inline funciona. PNG é a escolha mais segura em plataformas que quebram SVG inline (alguns CMS e apps de mensagens), e JPG serve para marcadores com cara de foto em arquivos menores. A prévia é idêntica nos três.",
        },
        {
          q: "Quais são os limites de tamanho e cor?",
          a: "Largura e altura devem ser números inteiros entre 1 e 5000 pixels; as cores vão em hexadecimal — #RRGGBB ou a forma curta #RGB. Qualquer outra coisa é rejeitada com uma dica, em vez de gerar silenciosamente uma imagem quebrada.",
        },
        {
          q: "Algo é enviado para um servidor?",
          a: "Não. O SVG é construído a partir de um template de texto no seu navegador e as versões raster são desenhadas num canvas local. Nada sai da página: funciona offline e é seguro para designs não publicados.",
        },
      ],
      deepDive: [
        {
          heading: "SVG como formato-fonte: texto que escala",
          paragraphs: [
            "Um placeholder não precisa de um arquivo raster — precisa de um retângulo com rótulo. Expressá-lo como SVG significa que a saída são algumas linhas de marcação legível: um rect, um text, talvez um fill. É esse texto que faz o SVG colar limpo em HTML, JSX, Figma ou README, e que permite reeditá-lo depois — mude o rótulo ou a cor hex na marcação e a imagem atualiza. Um PNG da mesma coisa são pixels congelados que ninguém ajusta sem regenerar.",
            "Também funciona offline depois que a página carrega, o que importa mais do que parece: designers e desenvolvedores trabalham em trânsito ou em redes restritas, e uma ferramenta que morre sem conexão é inútil exatamente nas situações em que um placeholder rápido é preciso. Gerar, baixar, fechar a aba — nada foi transmitido.",
          ],
        },
        {
          heading: "Tamanhos que as plataformas fixaram",
          paragraphs: [
            "Certos tamanhos se repetem porque as plataformas os fixam. O 1200×630 é a medida canônica de cartão de prévia social/open graph — a maioria das plataformas corta a prévia de link nessa proporção. Potências de dois como 256×256 correspondem a espaços de avatar e ícone.",
            "O limite de 1–5000 pixels não é arbitrário. Abaixo de 1 pixel a imagem não renderiza com significado; acima de alguns milhares, navegadores e ferramentas de design sofrem com a alocação de canvas — um PNG 5000×5000 em qualidade total pode dar dezenas de MB. O teto prático é senso comum, não especificação.",
            "Um hábito que vale adotar: o rótulo dentro da imagem, as dimensões reais na marcação externa. Tag img com width/height explícitos e o placeholder na mesma proporção — a caixa do layout fica estável agora, e o asset real entra depois sem mexer em nada.",
          ],
        },
        {
          heading: "Por que serve para designs não publicados",
          paragraphs: [
            "Placeholders aparecem na fase mais cedo da vida de um projeto — wireframes de produtos não lançados, rascunhos sob NDA, painéis internos que não podem ser vistos fora. É isso que torna o fluxo comum de geradores online constrangedor: digitar as dimensões em um serviço deixa a requisição (muitas vezes com o referer que expõe o nome do projeto) nos logs de um servidor alheio.",
            "A geração local também contorna a economia de conta-e-marca-d'água de muitos serviços de placeholder: sem cadastro, sem limite diário, sem marca queimada no canto do modelo. O arquivo que você baixa é o arquivo que você especificou, e o SVG copiado é seu para editar como quiser.",
          ],
        },
      ],
    },
  },
});
