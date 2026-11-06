import { ImageSvgEngine } from "../_engines/image-engine-svg";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "svg-converter",
  category: "image",
  icon: "layers",
  engine: { component: ImageSvgEngine },
  related: ["image-resizer", "convert-image", "screenshot-tool", "image-compressor", "image-border", "image-splitter", "compress-image-to-size", "grayscale-image", "crop-circle-image", "crop-image"],
  copy: {
    en: {
      name: "SVG to PNG Converter",
      tagline:
        "Turn SVG icons and graphics into crisp PNG rasters at 1× to 4× or any custom scale — transparency preserved, perfect for app assets.",
      intro: [
        "SVGs are perfect for design but many places — app stores, editors, messengers, older CMSs — demand a raster PNG. This tool renders your vector file at exactly the size you need: 1× for previews, 2× for retina screens, 3×–4× or a custom factor for print-quality exports.",
        "The PNG keeps the transparent background of your SVG, and the vector is re-rendered at the target resolution rather than stretched, so edges stay razor sharp. Drop a whole icon set at once — every file is converted in one pass.",
      
        "The SVG is drawn into a canvas at exactly the pixel dimensions you request — 1×, 2×, 3×, 4× or a custom size — so the vector paths re-rasterize at the target resolution rather than being stretched. The result is a real PNG with the SVG's transparency preserved, not a screenshot approximation.",
        "Compared with exporting at a fixed 1024 px and downscaling, choosing the exact factor means no second resize step and no softening. And unlike design-tool exports that require opening the project, a whole icon set drops in and converts in one pass — handy when the source SVGs arrive from a designer and the app store wants PNGs today.",
      ],
      steps: [
        "Drop one or more .svg files.",
        "Choose a scale: 1×–4× or type any custom factor.",
        "Download the PNG files individually or all at once.",
      ],
      faqs: [
        {
          q: "What scale should I export at?",
          a: "Use 2× for icons displayed on retina/high-DPI screens, 1× when the exact pixel size is known and final, and 3×–4× as a master asset you can downscale from later. For a favicon, export at 512 px equivalent and resize down.",
        },
        {
          q: "Does converting to PNG lose the scalability of SVG?",
          a: "Yes — a PNG is fixed-resolution. That is why this tool renders at the target size directly instead of rasterizing small and stretching. Keep your .svg source for future edits and export fresh PNGs whenever you need another size.",
        },
        {
          q: "Will transparent backgrounds survive the conversion?",
          a: "Yes. The output is a PNG with full alpha, so your icon keeps its transparency exactly as in the SVG. Only fonts and external images referenced by the SVG may need to be embedded in the file itself to render.",
        },
      ],
      deepDive: [
        {
          heading: "Why SVG scales forever and raster formats do not",
          paragraphs: [
            "A raster image (JPG, PNG, WebP) is a fixed grid of pixels: blow it up and the grid stretches, so edges blur and blocks appear. An SVG is not a grid at all — it is a list of drawing instructions (lines, curves, shapes, fills) that the renderer recomputes at whatever size is requested. Zoom to 5000% and every edge stays razor sharp because the edges are being redrawn, not enlarged.",
            "That is why logos, icons and diagrams are ideal SVG material: geometric shapes with flat colors survive the vector description perfectly. Photographs are the opposite case — a photo described as vectors becomes either enormous or an ugly approximation, which is why photo-to-SVG converters trace images into stylized shapes rather than true representations.",
            "SVG is also text: an XML file you can open in an editor, version-control like code, and tweak colors or paths by hand. That inspectability is a quiet superpower — an icon's color can be restyled with one attribute change instead of a re-export.",
          ],
        },
        {
          heading: "Raster to SVG versus SVG to raster: very different jobs",
          paragraphs: [
            "Converting SVG to raster is a faithful snapshot: the renderer draws the vector shapes at your chosen size and pixels the result. Pick the right size — the rendered PNG/JPG is fixed at that resolution and will behave like any other raster image from then on.",
            "Converting raster to SVG is interpretation, not translation. Tracing algorithms approximate pixel regions with curves and color areas, so the output is a stylized reconstruction: excellent for logos and simple graphics that need scalability, wrong for anything that must look pixel-identical to the original photo.",
            "Choose the direction by need: if your source is already vector and the destination platform accepts only raster, convert down and size it generously for retina displays. If your source is a simple graphic stuck in PNG and you need infinite scaling or tiny files, tracing to SVG is the upgrade.",
          ],
        },
        {
          heading: "Practical notes and local processing",
          paragraphs: [
            "SVG files are usually tiny — an icon described as a few paths can weigh a fraction of a kilobyte against tens of kilobytes for the PNG equivalent. For icon-heavy interfaces that difference multiplies across every asset and every page load.",
            "One compatibility note: some surfaces restrict SVG because it can contain scripts. If a platform blocks SVG uploads, exporting a large PNG version is the standard workaround — generate it at two or three times the display size so it stays sharp on high-density screens.",
            "Conversion here runs entirely in your browser: rendering and tracing happen on your device, with no upload step. Converting client logos, brand assets or internal diagrams never sends them to a server.",
          ],
        },
      ],
    },
    zh: {
      name: "SVG 转 PNG",
      tagline: "SVG 图标与图形按 1×–4× 或自定义倍率转成锐利 PNG,透明背景完整保留——应用素材导出利器,支持批量。",
      intro: [
        "SVG 适合设计,但应用商店、编辑器、聊天工具和不少旧系统只认位图 PNG。本工具按你需要的尺寸精确渲染矢量文件:预览用 1×,视网膜屏用 2×,印刷级导出用 3×–4× 或自定义倍率。",
        "输出 PNG 完整保留 SVG 的透明背景,矢量按目标分辨率重新渲染而非拉伸,边缘依旧锐利。整个图标集一次拖入,一次全部转换。",
      ],
      steps: [
        "拖入一个或多个 .svg 文件。",
        "选择倍率:1×–4×,或输入任意自定义倍数。",
        "逐张或一键下载 PNG。",
      ],
      faqs: [
        {
          q: "应该用多大的倍率导出?",
          a: "视网膜 / 高分屏上的图标用 2×;尺寸已知且不再变时用 1×;3×–4× 适合作为母版素材,以后再缩小。做网站图标可以按 512px 等效导出后再缩小。",
        },
        {
          q: "转成 PNG 后还像 SVG 一样无限缩放吗?",
          a: "不能——PNG 是固定分辨率。所以本工具直接按目标尺寸渲染,而不是先转小图再拉伸。请保留 .svg 源文件,需要其他尺寸时随时重新导出。",
        },
        {
          q: "透明背景在转换后还在吗?",
          a: "在。输出是带完整 alpha 通道的 PNG,图标的透明度与 SVG 中完全一致。只有 SVG 引用的外部字体和图片需要内嵌到文件里才能正常渲染。",
        },
      ],
      deepDive: [
        {
          heading: "SVG 为什么能无限放大,而位图不能",
          paragraphs: [
            "位图(JPG、PNG、WebP)是固定的像素网格:放大时网格跟着拉伸,于是边缘发糊、出现块状。SVG 根本不是网格——它是一份绘图指令清单(线、曲线、形状、填充),渲染器按请求的尺寸现场重算。放大到 5000%,每条边缘依旧锋利,因为边缘是被重新绘制的,不是被放大的。",
            "这就是 Logo、图标和示意图是理想 SVG 素材的原因:几何形状加平涂颜色,能被矢量描述完美承载。照片正相反——用矢量描述照片,要么文件巨大,要么变成粗糙的近似,所以照片转 SVG 的工具都是把图像描摹成风格化色块,而不是忠实再现。",
            "SVG 还是文本:一个可以在编辑器里打开的 XML 文件,能像代码一样进版本管理,手改颜色或路径。这种可检视性是个低调的超能力——图标配色改一个属性就行,不用重新导出。",
          ],
        },
        {
          heading: "位图转 SVG 与 SVG 转位图:两种完全不同的活",
          paragraphs: [
            "SVG 转位图是忠实的快照:渲染器按你选的尺寸绘制矢量形状,结果变成像素。尺寸要选好——渲染出的 PNG/JPG 就固定在这个分辨率,从此表现得和任何位图一样。",
            "位图转 SVG 是解读,不是翻译。描摹算法用曲线近似像素区域、用色块归并颜色区域,输出是风格化的重构:对需要无限缩放的 Logo 和简单图形非常好,对要求与原照片逐像素一致的内容则完全不对。",
            "按需求选方向:源图已经是矢量、而目标平台只收位图,就向下转,并给高分屏留足尺寸。源图是困在 PNG 里的简单图形、需要无限缩放或极小文件,那就描摹成 SVG 完成升级。",
          ],
        },
        {
          heading: "实用提示与本地处理",
          paragraphs: [
            "SVG 文件通常很小——几条路径描述的图标可能只有几百字节,而等效 PNG 要几十 KB。对图标密集的界面来说,这个差距会乘以每个资源、每次页面加载。",
            "一个兼容性提醒:有些平台限制 SVG,因为它可以内嵌脚本。如果平台拒收 SVG 上传,导出大尺寸 PNG 是标准解法——按显示尺寸的两三倍生成,高分屏上依然锐利。",
            "本站的转换完全在浏览器内进行:渲染和描摹都发生在你的设备上,没有上传环节。转换客户 Logo、品牌素材或内部示意图,永远不会把它们送到服务器。",
          ],
        },
      ],
    },
    ja: {
      name: "SVG から PNG へ変換",
      tagline:
        "SVG のアイコンやグラフィックを 1×〜4× や任意の倍率でシャープな PNG に変換。透過を保持し、アプリアセットの書き出しに最適です。",
      intro: [
        "SVG はデザインに最適でも、アプリストア・エディタ・メッセンジャー・古い CMS などはビットマップの PNG を求めがちです。このツールはベクターファイルを必要なサイズで正確にレンダリングします:プレビューは 1×、Retina 画面は 2×、印刷品質の書き出しは 3×〜4× かカスタム倍率で。",
        "出力 PNG は SVG の透過背景を保ち、ベクターは引き伸ばしではなく目標解像度で再レンダリングされるため、エッジはくっきりしたまま。アイコンセットをまとめてドロップすれば全ファイルを一括変換します。",
      ],
      steps: [
        ".svg ファイルを 1 つ以上ドロップします。",
        "倍率を選びます:1×〜4×、または任意の数値を入力。",
        "PNG を 1 枚ずつ、またはまとめてダウンロードします。",
      ],
      faqs: [
        {
          q: "どの倍率で書き出すべき?",
          a: "Retina / 高解像度スクリーンのアイコンは 2×、最終サイズが確定しているなら 1×、後から縮小できるマスター素材には 3×〜4× が便利です。ファビコンなら 512px 相当で書き出してから縮小しましょう。",
        },
        {
          q: "PNG にすると SVG のような拡大縮小はできなくなりますか?",
          a: "できなくなります——PNG は固定解像度です。だからこそこのツールは小さくラスタライズして引き伸ばすのではなく、目標サイズで直接レンダリングします。編集用に .svg のソースを残し、必要なサイズのたびに書き出し直しましょう。",
        },
        {
          q: "透過背景は変換後も保たれますか?",
          a: "保たれます。出力はフルアルファの PNG なので、SVG と同じ透過がそのまま維持されます。SVG が参照する外部フォントや画像だけは、ファイルに埋め込まれていないと描画されないことがあります。",
        },
      ],
      deepDive: [
        {
          heading: "SVG が無限に拡大でき、ラスタができない理由",
          paragraphs: [
            "ラスタ画像(JPG・PNG・WebP)は固定のピクセルグリッドです:拡大するとグリッドが引き伸ばされ、エッジがぼやけブロックが現れます。SVG はそもそもグリッドではなく、描画命令(線・曲線・形状・塗り)のリストであり、レンダラーが要求されたサイズでその場で再計算します。5000% にズームしても全エッジが鋭利なのは、エッジが「拡大」ではなく「再描画」されるからです。",
            "だからロゴ・アイコン・図表は理想的な SVG 素材です:フラットな色の幾何形状はベクター記述で完全に表現できます。写真は正反対で、写真をベクターで記述すると巨大になるか醜い近似になるため、写真→SVG 変換は画像を様式化された形状にトレースするのであって忠実再現ではありません。",
            "SVG はテキストでもあります:エディタで開ける XML ファイルであり、コードのようにバージョン管理でき、色やパスを手で調整できます。この検査可能性は静かな超能力で、アイコンの色は再書き出しではなく属性 1 つで変えられます。",
          ],
        },
        {
          heading: "ラスタ→SVG と SVG→ラスタ:まったく別の仕事",
          paragraphs: [
            "SVG→ラスタは忠実なスナップショットです:レンダラーが選んだサイズでベクター形状を描き、結果をピクセル化します。サイズ選びが肝心——書き出された PNG/JPG はその解像度に固定され、以後は普通のラスタ画像として振る舞います。",
            "ラスタ→SVG は翻訳ではなく解釈です。トレースアルゴリズムはピクセル領域を曲線と色面で近似するため、出力は様式化された再構成:拡張性を要するロゴや単純なグラフィックには最適で、元の写真とピクセル単位で一致する必要があるものには不正解です。",
            "必要に応じて方向を選ぶ:元がすでにベクターで行き先がラスタ限定なら下方向へ変換し、retina ディスプレイ用に大きめに書き出す。元が PNG に留まった単純なグラフィックで、無限拡大や軽量化が要るなら、SVG へのトレースがアップグレードです。",
          ],
        },
        {
          heading: "実用メモとローカル処理",
          paragraphs: [
            "SVG ファイルは通常ごく小さく、数パスで記述されたアイコンは数十 KB の PNG に対して数百バイト程度に収まります。アイコンの多いインターフェースでは、この差が全アセット・全ページ読み込みに掛け算されます。",
            "互換性の注意:SVG はスクリプトを含み得るため、制限する表面があります。プラットフォームが SVG アップロードを拒むなら、大きめの PNG 版を書き出すのが定番の回避策——表示サイズの 2〜3 倍で生成すれば高密度画面でも鋭利です。",
            "このサイトの変換は完全にブラウザ内で実行:レンダリングもトレースも端末上で、アップロード工程はありません。クライアントのロゴ、ブランド資産、内部の図表を変換してもサーバーに送られることはありません。",
          ],
        },
      ],
    },
    es: {
      name: "Convertidor SVG a PNG",
      tagline:
        "Convierte iconos y gráficos SVG en PNG nítidos a 1×–4× o cualquier escala personalizada — conserva la transparencia, ideal para recursos de apps.",
      intro: [
        "Los SVG son perfectos para diseñar, pero muchos sitios —stores de apps, editores, mensajerías, CMS antiguos— exigen un PNG rasterizado. Esta herramienta renderiza tu vector exactamente al tamaño que necesitas: 1× para vistas previas, 2× para pantallas retina, 3×–4× o un factor personalizado para calidad de imprenta.",
        "El PNG conserva el fondo transparente de tu SVG, y el vector se vuelve a renderizar a la resolución destino en lugar de estirarse, así los bordes siguen afiladísimos. Suelta un set de iconos entero: todos los archivos se convierten en una pasada.",
      ],
      steps: [
        "Suelta uno o varios archivos .svg.",
        "Elige una escala: 1×–4× o escribe cualquier factor personalizado.",
        "Descarga los PNG individualmente o todos a la vez.",
      ],
      faqs: [
        {
          q: "¿A qué escala conviene exportar?",
          a: "Usa 2× para iconos en pantallas retina/de alta densidad, 1× cuando el tamaño en píxeles es conocido y final, y 3×–4× como recurso maestro del que reducir después. Para un favicon, exporta a 512 px equivalentes y reduce.",
        },
        {
          q: "¿Convertir a PNG pierde la escalabilidad del SVG?",
          a: "Sí: un PNG es de resolución fija. Por eso esta herramienta renderiza directamente al tamaño destino en vez de rasterizar pequeño y estirar. Conserva tu .svg como fuente y exporta PNG frescos cada vez que necesites otro tamaño.",
        },
        {
          q: "¿Los fondos transparentes sobreviven a la conversión?",
          a: "Sí. La salida es un PNG con alfa completo, así tu icono mantiene la transparencia exacta del SVG. Solo las fuentes e imágenes externas que referencie el SVG deben estar incrustadas en el propio archivo para poder renderizarse.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué SVG escala para siempre y los ráster no",
          paragraphs: [
            "Una imagen ráster (JPG, PNG, WebP) es una rejilla fija de píxeles: al ampliarla, la rejilla se estira, así que los bordes se difuminan y aparecen bloques. Un SVG no es una rejilla — es una lista de instrucciones de dibujo (líneas, curvas, formas, rellenos) que el renderizador recalcula al tamaño pedido. Con un zoom del 5000 % cada borde sigue afilado porque los bordes se redibujan, no se agrandan.",
            "Por eso logos, iconos y diagramas son material SVG ideal: formas geométricas con colores planos sobreviven perfectamente a la descripción vectorial. Las fotografías son el caso opuesto — una foto descrita como vectores se vuelve enorme o una aproximación fea, razón por la que los conversores de foto a SVG trazan la imagen en formas estilizadas, no en representaciones fieles.",
            "SVG además es texto: un archivo XML que puedes abrir en un editor, versionar como código y retocar colores o trazados a mano. Esa inspeccionabilidad es un superpoder discreto — el color de un icono se cambia con un atributo, no con una reexportación.",
          ],
        },
        {
          heading: "Ráster a SVG frente a SVG a ráster: trabajos muy distintos",
          paragraphs: [
            "Convertir SVG a ráster es una instantánea fiel: el renderizador dibuja las formas vectoriales al tamaño elegido y pixelea el resultado. Elige bien el tamaño — el PNG/JPG renderizado queda fijo a esa resolución y a partir de ahí se comporta como cualquier otra imagen ráster.",
            "Convertir ráster a SVG es interpretación, no traducción. Los algoritmos de trazado aproximan regiones de píxeles con curvas y áreas de color, así que la salida es una reconstrucción estilizada: excelente para logos y gráficos simples que necesitan escalabilidad, errónea para nada que deba verse idéntico al píxel a la foto original.",
            "Elige la dirección según la necesidad: si tu fuente ya es vectorial y la plataforma de destino solo acepta ráster, convierte hacia abajo y dimensiona con margen para pantallas retina. Si tu fuente es un gráfico simple atrapado en PNG y necesitas escalado infinito o archivos diminutos, trazar a SVG es la mejora.",
          ],
        },
        {
          heading: "Notas prácticas y procesado local",
          paragraphs: [
            "Los archivos SVG suelen ser minúsculos — un icono descrito con unas cuantas trazas puede pesar una fracción de kilobyte frente a las decenas de kilobytes del PNG equivalente. En interfaces cargadas de iconos, esa diferencia se multiplica por cada recurso y cada carga de página.",
            "Una nota de compatibilidad: algunas superficies restringen el SVG porque puede contener scripts. Si una plataforma bloquea subidas de SVG, exportar una versión PNG grande es la solución estándar — generada a dos o tres veces el tamaño de visualización para que siga nítida en pantallas de alta densidad.",
            "La conversión aquí ocurre íntegramente en tu navegador: renderizar y trazar suceden en tu dispositivo, sin paso de subida. Convertir logos de clientes, recursos de marca o diagramas internos nunca los envía a un servidor.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor SVG para PNG",
      tagline:
        "Transforme ícones e gráficos SVG em PNGs nítidos em escala de 1× a 4× ou qualquer fator personalizado — transparência preservada, ótimo para assets de apps.",
      intro: [
        "SVG é perfeito para design, mas muitos lugares — lojas de apps, editores, mensageiros, CMSs antigos — exigem um PNG rasterizado. Esta ferramenta renderiza seu vetor exatamente no tamanho necessário: 1× para prévias, 2× para telas retina, 3×–4× ou fator personalizado para exportação com qualidade de impressão.",
        "O PNG mantém o fundo transparente do seu SVG, e o vetor é re-renderizado na resolução alvo em vez de esticado, então as bordas continuam afiadíssimas. Solte um conjunto de ícones inteiro — todos os arquivos são convertidos numa passada.",
      ],
      steps: [
        "Solte um ou mais arquivos .svg.",
        "Escolha a escala: 1×–4× ou digite qualquer fator personalizado.",
        "Baixe os PNGs individualmente ou todos de uma vez.",
      ],
      faqs: [
        {
          q: "Em que escala devo exportar?",
          a: "Use 2× para ícones em telas retina/alta densidade, 1× quando o tamanho em pixels é conhecido e final, e 3×–4× como asset mestre do qual reduzir depois. Para um favicon, exporte no equivalente a 512 px e reduza.",
        },
        {
          q: "Converter para PNG perde a escalabilidade do SVG?",
          a: "Perde — um PNG tem resolução fixa. Por isso a ferramenta renderiza direto no tamanho alvo em vez de rasterizar pequeno e esticar. Guarde seu .svg como fonte e exporte novos PNGs sempre que precisar de outro tamanho.",
        },
        {
          q: "Os fundos transparentes sobrevivem à conversão?",
          a: "Sim. A saída é um PNG com alfa completo, então seu ícone mantém a transparência exatamente como no SVG. Só fontes e imagens externas referenciadas pelo SVG precisam estar embutidas no próprio arquivo para renderizar.",
        },
      ],
      deepDive: [
        {
          heading: "Por que o SVG escala para sempre e os raster não",
          paragraphs: [
            "Uma imagem raster (JPG, PNG, WebP) é uma grade fixa de pixels: ao ampliá-la, a grade se estica, então as bordas desbotam e blocos aparecem. Um SVG não é uma grade — é uma lista de instruções de desenho (linhas, curvas, formas, preenchimentos) que o renderizador recalcula no tamanho pedido. Com zoom de 5000 %, cada borda segue afiada porque as bordas são redesenhadas, não ampliadas.",
            "Por isso logos, ícones e diagramas são material SVG ideal: formas geométricas com cores chapadas sobrevivem perfeitamente à descrição vetorial. Fotografias são o caso oposto — uma foto descrita como vetores fica enorme ou numa aproximação feia, razão pela qual conversores de foto para SVG rastreiam a imagem em formas estilizadas, não em representações fiéis.",
            "SVG também é texto: um arquivo XML que você abre num editor, versiona como código e ajusta cores ou traçados à mão. Essa inspecionabilidade é um superpoder discreto — a cor de um ícone muda com um atributo, sem nova exportação.",
          ],
        },
        {
          heading: "Raster para SVG versus SVG para raster: trabalhos bem diferentes",
          paragraphs: [
            "Converter SVG para raster é um retrato fiel: o renderizador desenha as formas vetoriais no tamanho escolhido e pixeliza o resultado. Escolha bem o tamanho — o PNG/JPG renderizado fica fixo nessa resolução e passa a se comportar como qualquer imagem raster.",
            "Converter raster para SVG é interpretação, não tradução. Os algoritmos de rastreio aproximam regiões de pixels com curvas e áreas de cor, então a saída é uma reconstrução estilizada: excelente para logos e gráficos simples que precisam de escalabilidade, errada para tudo que precisa parecer idêntico pixel a pixel à foto original.",
            "Escolha a direção pela necessidade: se sua fonte já é vetorial e a plataforma de destino só aceita raster, converta para baixo e dimensione com folga para telas retina. Se sua fonte é um gráfico simples preso em PNG e você precisa de escala infinita ou arquivos minúsculos, rastrear para SVG é a atualização.",
          ],
        },
        {
          heading: "Notas práticas e processamento local",
          paragraphs: [
            "Arquivos SVG costumam ser minúsculos — um ícone descrito com alguns traços pode pesar uma fração de kilobyte contra as dezenas de kilobytes do PNG equivalente. Em interfaces cheias de ícones, essa diferença se multiplica por cada recurso e cada carregamento de página.",
            "Uma nota de compatibilidade: algumas superfícies restringem SVG porque ele pode conter scripts. Se uma plataforma bloqueia envios de SVG, exportar uma versão PNG grande é o contorno padrão — gerada a duas ou três vezes o tamanho de exibição para continuar nítida em telas de alta densidade.",
            "A conversão aqui acontece inteiramente no seu navegador: renderizar e rastrear ocorrem no seu dispositivo, sem etapa de envio. Converter logos de clientes, recursos de marca ou diagramas internos nunca os envia a um servidor.",
          ],
        },
      ],
    },
  },
});
