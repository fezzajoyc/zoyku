import { DevEngineChart } from "../_engines/dev-engine-chart";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "chart-generator",
  category: "developer",
  icon: "grid",
  engine: { component: DevEngineChart },
  related: ["csv-table-editor", "json-to-csv", "csv-to-json", "keyword-density-checker"],
  copy: {
    en: {
      name: "SVG Chart Generator",
      tagline:
        "Turn pasted CSV, tab or semicolon data into a bar, line, area, pie, donut, radar or funnel chart — rendered as plain SVG you can download and paste into slides, docs or a web page. No chart library, no upload.",
      intro: [
        "Paste your data the way you would into a spreadsheet: the first column is the label, the following columns are one or more series. The tool detects the delimiter (tab, semicolon or comma), reads an optional header row, and draws the chart live as you type.",
        "Seven chart types are built from SVG primitives rather than a charting library, which keeps the page light and the output portable: every pixel is a path or a rect you can inspect, recolor or animate yourself after export. Bar and area charts always anchor the Y axis at zero — a flat-looking series then reflects the data, not a truncated axis chosen to look dramatic.",
        "Export is a genuine .svg file. It carries its own white background so it renders identically in PowerPoint, Google Slides, Notion or a browser, and all text is escaped before it enters the SVG, so labels containing < or & characters cannot break the file.",
      ],
      steps: [
        "Paste data: label, then values, separated by commas, tabs or semicolons.",
        "Pick a chart type and, if needed, say whether the first row is a header (numeric series names like 2025 need Yes).",
        "Download the .svg or copy its source — the preview is exactly what gets exported.",
      ],
      faqs: [
        {
          q: "Why does the axis start at zero instead of fitting the data?",
          a: "Because a truncated axis exaggerates small differences. A series that moves from 98 to 102 looks like a dramatic climb when the axis starts at 97, and like what it is — a 4% change — when it starts at zero. Column and area charts encode magnitude by length, so the baseline must be meaningful. If you need a zoomed view, that is a legitimate request but it belongs to a chart with an explicit, labelled axis break, which this tool deliberately does not fake.",
        },
        {
          q: "What happens when I have more columns than the chart can show?",
          a: "Bar, line, area and radar draw every series you give them. Pie, donut and funnel are single-value charts by definition, so they use the first value column and list the dropped columns in a visible Notes line rather than silently discarding them. Nothing disappears without being reported.",
        },
        {
          q: "Can I edit the exported SVG in Illustrator or Figma?",
          a: "Yes — that is the point of emitting SVG instead of PNG. Paths, rects, circles and text elements are individually addressable, text is real text (not outlines) using a standard font stack, and no filters or foreign objects are used. Colors are plain hex literals, so a global find-and-replace of #2563eb recolors the first series everywhere.",
        },
        {
          q: "How are numbers formatted in labels?",
          a: "Six significant digits, the same standard used by the unit converters on this site. That keeps 37.777778 from becoming noise while staying precise enough for typical business data. Very large or very small magnitudes switch to exponential notation instead of printing a long run of zeros.",
        },
      ],
      deepDive: [
        {
          heading: "Why hand-written SVG beats a charting library here",
          paragraphs: [
            "A bar chart is rectangles, a line chart is a path, a pie is arcs, and a radar is a closed polygon. All four are native SVG primitives; a charting library earns its size when you need interactions, brushing, zooming, stacked series, dual axes, annotations and layout engine work. This tool does none of those, so shipping a megabyte of chart runtime to draw seven static shapes would be paying for capability that never runs.",
            "The second reason is export fidelity. What you download is not a screenshot of the library's DOM but the drawing itself: a document of paths you can open in Illustrator, recolor with find-and-replace, or animate with CSS after import. Library exports usually carry their own class names, style blocks and sometimes foreignObject wrappers, which makes hand-editing an exported file a negotiation with the library rather than work on your own drawing.",
            "The honest cost is the feature set: no hover tooltips, no zoom, no legend toggling, no stacked bars, no dual axes, no animation. If a chart needs those, this is the wrong tool and a charting library is the right one — the note under the chart says as much rather than implying the output competes with interactive dashboards.",
          ],
        },
        {
          heading: "Chart honesty: zero baselines, dropped columns and escaping",
          paragraphs: [
            "The most consequential decision in any chart is where the axis starts. Column length encodes magnitude, so a baseline above zero misrepresents ratios: 98 to 102 on a zero-based axis is a 4% rise, and on a 97-based axis it looks like a doubling. This generator always puts the baseline at zero for non-negative data, and only extends below zero when negative values exist, which is the one case where a non-zero baseline is structurally necessary rather than cosmetic.",
            "Multi-series charts in bar mode are grouped side by side rather than stacked, because stacking changes what a reader can compare: stacked bars compare totals well but make individual series impossible to track, and the choice should belong to the person making the chart, not be silently baked in. Since stacking is not offered, the visual never implies it. Pie, donut and funnel are single-value shapes by definition; when the input carries extra columns, the export lists them by name so the reader knows what was ignored.",
            "Text handling is where SVG generators usually break: an unescaped ampersand or angle bracket in a label produces malformed XML that some viewers render blank and others refuse to open. Every user-supplied string here passes through an XML escape before it reaches the document, and a test asserts that a label like `</svg><script>` cannot close the root element early. The generated file survives data that would break a naive template.",
          ],
        },
      ],
    },
    zh: {
      name: "SVG 图表生成器",
      tagline:
        "把粘贴进来的 CSV、制表符或分号数据变成柱状、折线、面积、饼图、环图、雷达或漏斗图——输出是可下载、可粘进幻灯片/文档/网页的纯 SVG。不引入图表库,不上传数据。",
      intro: [
        "像往表格里填数一样粘贴数据:第一列是标签,后面各列是一个或多个系列。工具自动识别分隔符(制表符、分号、逗号),识别可选的表头行,边输入边实时绘制。",
        "七种图表用 SVG 基本元素手工绘制,而不是引入图表库——这让页面更轻,也让输出可移植:每个像素都是你能检视、改色、甚至二次动画的路径或矩形。柱图与面积图的纵轴恒从 0 起,所以看起来「平」的序列反映的是数据本身,而不是一条为了戏剧性被截断的轴。",
        "导出的是真正的 .svg 文件:自带白色背景,在 PowerPoint、Google Slides、Notion 或浏览器里渲染一致;所有文本进 SVG 前都做了转义,含 < 或 & 的标签不会破坏文件。",
      ],
      steps: [
        "粘贴数据:标签在前,数值在后,用逗号、制表符或分号分隔。",
        "选择图表类型;必要时说明首行是否为表头(像 2025 这样的数字系列名要选「是」)。",
        "下载 .svg 或复制源码——预览所见即导出所得。",
      ],
      faqs: [
        {
          q: "为什么纵轴从 0 开始,而不是贴着数据范围?",
          a: "因为截断的纵轴会放大微小差异。一个从 98 到 102 的序列,轴从 97 起看起来像剧烈攀升,从 0 起则是它真实的模样——4% 的变化。柱图与面积图用长度编码大小,基线必须有意义。确实需要放大视角时,那是另一种带明确标注断轴的图表该做的事,本工具刻意不伪造这种能力。",
        },
        {
          q: "列数比图表能显示的更多时会怎样?",
          a: "柱状、折线、面积与雷达图会画出你给的每一个系列。饼图、环图、漏斗图按定义只承载单一数值,所以它们使用第一列数值,并在可见的「提示」区列出被丢弃的列——不静默丢数据。",
        },
        {
          q: "导出的 SVG 能在 Illustrator 或 Figma 里编辑吗?",
          a: "能——这正是输出 SVG 而非 PNG 的意义。路径、矩形、圆与文字元素都是独立可寻址的,文字是真正的文字(不是轮廓)并使用标准字体栈,没有滤镜或 foreignObject。颜色是普通十六进制字面量,全局把 #2563eb 替换掉就能重染第一个系列。",
        },
        {
          q: "数值标签怎么格式化?",
          a: "6 位有效数字,与本站单位换算使用同一标准。这样 37.777778 不会变成视觉噪声,同时保留足够精度。极大或极小的量级改用指数记法,而不是打印一长串 0。",
        },
      ],
      deepDive: [
        {
          heading: "为什么这里手写 SVG 比用图表库更好",
          paragraphs: [
            "柱图就是矩形,折线就是一条路径,饼图是若干弧,雷达图是闭合多边形。四者都是 SVG 原生元素;图表库的体积是靠交互、刷选、缩放、堆叠、双轴、标注与布局引擎赚回来的。本工具这些都不做,所以为了画七种静态图形而加载一兆字节的图表运行时,是在为永远不会执行的代码付费。",
            "第二个理由是导出的保真度。你下载的不是库的 DOM 截图,而是图形本身:一份可以丢进 Illustrator、用查找替换改色、或导入后用 CSS 做动画的路径文档。库的导出通常带着自己的类名、样式块甚至 foreignObject 包装,于是手动编辑导出文件就变成了与库谈判,而不是在改自己的图形。",
            "代价是诚实的:没有悬停提示、没有缩放、没有图例点选、没有堆叠柱、没有双轴、没有动画。需要这些的图表就该用图表库——图表下方的说明也这么写,而不是暗示这份输出能跟交互式仪表盘竞争。",
          ],
        },
        {
          heading: "图表的诚实:零基线、被丢弃的列与转义",
          paragraphs: [
            "任何图表最关键的决定是轴从哪里开始。柱长编码大小,基线高于 0 就会歪曲比例:98 到 102 在零基轴上是上涨 4%,在 97 起的轴上看起来像翻倍。本生成器对非负数据一律把基线放在 0,只有存在负值时才向 0 以下延伸——那是非零基线在结构上必要的唯一情形,而不是为了好看。",
            "柱图模式下多系列并排分组而不是堆叠,因为堆叠会改变读者能比较的东西:堆叠柱比较总量很好,但让单一系列不可追踪,这个选择应当由画图的人决定,而不该被静默固化。既然不提供堆叠,视觉上就永远不会暗示它是堆叠。饼、环、漏斗按定义是单值图形;输入带多余列时,导出结果会按名字列出被忽略的列。",
            "文本处理是 SVG 生成器通常翻车的地方:标签里一个未转义的 & 或尖括号就会产出畸形 XML,有的查看器渲染成空白,有的干脆拒绝打开。这里每个用户可控字符串进文档前都先过 XML 转义,并有测试断言 `</svg><script>` 这样的标签无法提前闭合根元素。生成的文件能扛住会让朴素模板崩掉的数据。",
          ],
        },
      ],
    },
    ja: {
      name: "SVG グラフ生成ツール",
      tagline:
        "貼り付けた CSV・タブ・セミコロン区切りのデータを、棒・折線・面・円・ドーナツ・レーダー・ファネルに変換。素の SVG として出力されるので、スライド・文書・Web ページにそのまま貼れます。グラフライブラリなし、アップロードなし。",
      intro: [
        "表計算に入力するのと同じ感覚でデータを貼り付けます:1 列目がラベル、以降の列が 1 つ以上の系列です。区切り文字(タブ・セミコロン・カンマ)を自動判定し、任意の見出し行を読み、入力しながらリアルタイムに描画します。",
        "7 種類のグラフはチャートライブラリではなく SVG の基本要素で描きます。ページは軽く、出力は可搬です:どのピクセルも、検査・色替え・二次的なアニメーションまでできるパスや矩形です。棒・面グラフの縦軸は常に 0 起点なので、平らに見える系列はデータそのものを反映し、演出のために切り詰めた軸ではありません。",
        "書き出すのは本物の .svg ファイルです。独自の白背景を持つため PowerPoint・Google スライド・Notion・ブラウザで同じに描画され、すべてのテキストは SVG に入る前にエスケープされるため、< や & を含むラベルがファイルを壊すことはありません。",
      ],
      steps: [
        "データを貼り付けます:ラベル、続いて数値。区切りはカンマ・タブ・セミコロン。",
        "グラフの種類を選び、必要なら先頭行が見出しかを指定します(2025 のような数字の系列名は「はい」)。",
        ".svg をダウンロードするかソースをコピー — プレビューがそのまま書き出されます。",
      ],
      faqs: [
        {
          q: "軸がデータ範囲に合わせず 0 から始まるのはなぜですか?",
          a: "切り詰めた軸は小さな差を誇張するからです。98 から 102 への系列は、軸が 97 起点だと劇的な上昇に見え、0 起点だと実際の姿 — 4% の変化 — に見えます。棒・面グラフは長さで大きさを符号化するので、基準線は意味を持つ必要があります。拡大表示が必要な場合は、明示的にラベル付けした軸の断絶を伴う別のグラフの仕事であり、本ツールはそれを偽装しません。",
        },
        {
          q: "グラフに表示できるより多い列を渡すとどうなりますか?",
          a: "棒・折線・面・レーダーは与えられたすべての系列を描きます。円・ドーナツ・ファネルは定義上単一値のグラフなので最初の数値列を使い、捨てた列を表示される「注意」欄に列挙します。黙って捨てることはありません。",
        },
        {
          q: "書き出した SVG は Illustrator や Figma で編集できますか?",
          a: "できます — PNG ではなく SVG を出力する理由がまさにそれです。パス・矩形・円・テキスト要素は個別に扱え、テキストはアウトライン化されない本物のテキストで標準フォントスタックを使い、フィルタや foreignObject は使っていません。色は通常の 16 進リテラルなので、#2563eb を一括置換すれば最初の系列をどこでも塗り替えられます。",
        },
        {
          q: "数値ラベルの書式は?",
          a: "有効数字 6 桁で、本サイトの単位換算と同じ基準です。37.777778 が視覚的ノイズにならず、業務データに十分な精度を保ちます。極端に大きい・小さい値は 0 の長い列を印字せず指数表記に切り替えます。",
        },
      ],
      deepDive: [
        {
          heading: "なぜここではチャートライブラリより手書き SVG が優るのか",
          paragraphs: [
            "棒グラフは矩形、折線グラフは 1 本のパス、円グラフは弧の集合、レーダーは閉じた多角形です。4 つとも SVG の基本要素で、ライブラリのサイズはインタラクション・ブラッシング・ズーム・積み重ね・二軸・注釈・レイアウトエンジンで稼いだものです。本ツールはそれらを一切しないので、7 つの静的図形のために 1 MB のランタイムを積むのは、決して実行されない機能に対価を払うことになります。",
            "2 つ目の理由は書き出しの忠実度です。ダウンロードされるのはライブラリの DOM のスクリーンショットではなく図形そのもの、つまり Illustrator に投げ込める、検索置換で色を変えられる、インポート後に CSS で動かせるパスの文書です。ライブラリの書き出しは自前のクラス名・スタイルブロック・時には foreignObject を伴うため、書き出したファイルの手直しは自分の図形ではなくライブラリとの交渉になります。",
            "正直な代償は機能セットです:ホバー ツールチップなし、ズームなし、凡例の切替なし、積み重ね棒なし、二軸なし、アニメーションなし。それらが必要なグラフは別のツールの仕事で、ライブラリが正解です — グラフ下の注記もそう書いており、この出力がインタラクティブなダッシュボードと競合するとは示唆しません。",
          ],
        },
        {
          heading: "グラフの誠実さ:ゼロ基準・捨てた列・エスケープ",
          paragraphs: [
            "どんなグラフでも最重要の決定は軸の起点です。棒の長さは大きさを符号化するので、0 より上の基準線は比率を歪めます:98 から 102 は 0 起点で 4% の上昇、97 起点だと倍増に見えます。本生成器は非負データでは常に基準線を 0 に置き、負値があるときだけ 0 未満へ延ばします — 非ゼロ基準が構造上必要な唯一のケースであり、見栄えのためではありません。",
            "棒モードの複数系列は積み重ねではなく並列グループにします。積み重ねは読者が比較できるものを変えるからです:積み重ね棒は合計の比較に優れますが個々の系列は追えなくなり、その選択は作図する人のもので、黙って焼き込むべきではありません。積み重ねを提供しないので、視覚がそれを示唆することもありません。円・ドーナツ・ファネルは定義上単一値の図形で、入力に余分な列があるときは名前を挙げて無視したことを示します。",
            "テキスト処理は SVG 生成器がよく壊れる箇所です:ラベル内のエスケープされていない & や山括弧は不正な XML を生み、空白として描画するビューアもあれば開くのを拒むものもあります。ここではユーザー由来の文字列が文書に届く前に XML エスケープを通り、`</svg><script>` のようなラベルがルート要素を早期に閉じられないことをテストが断言します。素朴なテンプレートを壊すデータにも耐えるファイルになります。",
          ],
        },
      ],
    },
    es: {
      name: "Generador de gráficos SVG",
      tagline:
        "Convierta datos CSV, tabulados o separados por punto y coma en barras, líneas, área, circular, anillo, radar o embudo — dibujados como SVG puro que puedes descargar y pegar en diapositivas, documentos o una web. Sin biblioteca de gráficos y sin subir nada.",
      intro: [
        "Pega los datos como lo harías en una hoja de cálculo: la primera columna es la etiqueta y las siguientes son una o más series. La herramienta detecta el separador (tabulador, punto y coma o coma), lee una fila de cabecera opcional y dibuja en vivo mientras escribes.",
        "Los siete tipos se construyen con primitivas SVG en lugar de una biblioteca de gráficos, lo que mantiene la página ligera y la salida portable: cada píxel es una ruta o un rectángulo que puedes inspeccionar, recolorear o animar tú mismo después de exportar. Las barras y las áreas anclan siempre el eje Y en cero: una serie que parece plana refleja entonces los datos, no un eje truncado para parecer dramático.",
        "La exportación es un archivo .svg de verdad. Lleva su propio fondo blanco para renderizarse igual en PowerPoint, Google Slides, Notion o un navegador, y todo el texto se escapa antes de entrar en el SVG, así que etiquetas con < o & no pueden romper el archivo.",
      ],
      steps: [
        "Pega los datos: etiqueta y luego valores, separados por comas, tabuladores o punto y coma.",
        "Elige un tipo de gráfico y, si hace falta, indica si la primera fila es cabecera (nombres de serie numéricos como 2025 requieren Sí).",
        "Descarga el .svg o copia su código: la vista previa es exactamente lo que se exporta.",
      ],
      faqs: [
        {
          q: "¿Por qué el eje empieza en cero en lugar de ajustarse a los datos?",
          a: "Porque un eje truncado exagera diferencias pequeñas. Una serie que pasa de 98 a 102 parece una subida dramática con el eje en 97, y parece lo que es — un cambio del 4% — con el eje en cero. Las barras y las áreas codifican magnitud por longitud, así que la línea base debe ser significativa. Si necesitas una vista ampliada, es una petición legítima pero pertenece a un gráfico con un corte de eje explícito y etiquetado, que esta herramienta deliberadamente no falsifica.",
        },
        {
          q: "¿Qué pasa cuando hay más columnas de las que el gráfico puede mostrar?",
          a: "Barras, líneas, área y radar dibujan todas las series que reciben. Circular, anillo y embudo son gráficos de valor único por definición, así que usan la primera columna de valores y enumeran las columnas descartadas en una línea de Notas visible, en lugar de descartarlas en silencio.",
        },
        {
          q: "¿Puedo editar el SVG exportado en Illustrator o Figma?",
          a: "Sí: esa es la razón de emitir SVG en vez de PNG. Rutas, rectángulos, círculos y elementos de texto son direccionables por separado, el texto es texto real (no contornos) con una pila de fuentes estándar, y no se usan filtros ni foreignObject. Los colores son literales hexadecimales, así que un buscar-y-reemplazar global de #2563eb recolorea la primera serie en todas partes.",
        },
        {
          q: "¿Cómo se formatean los números en las etiquetas?",
          a: "Seis dígitos significativos, el mismo estándar que usan los conversores de unidades de este sitio. Eso evita que 37.777778 se vuelva ruido y conserva precisión suficiente para datos de negocio típicos. Magnitudes muy grandes o muy pequeñas pasan a notación exponencial en vez de imprimir una ristra de ceros.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué el SVG escrito a mano gana aquí a una biblioteca de gráficos",
          paragraphs: [
            "Un gráfico de barras son rectángulos, uno de líneas es una ruta, uno circular son arcos y un radar es un polígono cerrado. Los cuatro son primitivas SVG nativas; una biblioteca de gráficos justifica su tamaño cuando necesitas interacción, selección por arrastre, zoom, series apiladas, ejes duales, anotaciones y trabajo de motor de maquetación. Esta herramienta no hace nada de eso, así que cargar un megabyte de runtime de gráficos para dibujar siete formas estáticas sería pagar por capacidad que nunca se ejecuta.",
            "La segunda razón es la fidelidad de exportación. Lo que descargas no es una captura del DOM de la biblioteca sino el dibujo mismo: un documento de rutas que puedes abrir en Illustrator, recolorear con buscar-y-reemplazar, o animar con CSS después de importar. Las exportaciones de bibliotecas suelen traer sus propios nombres de clase, bloques de estilo y a veces envoltorios foreignObject, lo que convierte la edición manual de un archivo exportado en una negociación con la biblioteca en vez de trabajo sobre tu propio dibujo.",
            "El coste honesto es el conjunto de funciones: sin tooltips, sin zoom, sin alternar la leyenda, sin barras apiladas, sin ejes duales, sin animación. Si un gráfico necesita eso, esta no es la herramienta correcta y la biblioteca sí lo es — la nota bajo el gráfico lo dice, en vez de insinuar que esta salida compite con paneles interactivos.",
          ],
        },
        {
          heading: "Honestidad del gráfico: base cero, columnas descartadas y escape",
          paragraphs: [
            "La decisión más trascendente en cualquier gráfico es dónde empieza el eje. La longitud codifica magnitud, así que una línea base por encima de cero tergiversa las proporciones: de 98 a 102 en un eje desde cero es un 4% de subida, y en un eje desde 97 parece duplicarse. Este generador pone siempre la base en cero para datos no negativos, y solo baja por debajo de cero cuando hay valores negativos, que es el único caso donde una base distinta de cero es estructuralmente necesaria y no cosmética.",
            "Los gráficos de varias series en modo barras van agrupados lado a lado en vez de apilados, porque apilar cambia lo que el lector puede comparar: las barras apiladas comparan totales bien pero hacen imposible seguir series individuales, y esa elección debe pertenecer a quien hace el gráfico, no quedar cocida en silencio. Como el apilado no se ofrece, lo visual nunca lo insinúa. Circular, anillo y embudo son formas de valor único por definición; cuando la entrada trae columnas extra, la exportación las enumera para que se sepa qué se ignoró.",
            "El manejo de texto es donde los generadores SVG suelen romperse: un ampersand o un ángulo sin escapar en una etiqueta produce XML malformado que algunos visores pintan en blanco y otros se niegan a abrir. Cada cadena del usuario pasa aquí por un escape XML antes de llegar al documento, y una prueba afirma que una etiqueta como `</svg><script>` no puede cerrar el elemento raíz antes de tiempo. El archivo generado sobrevive a datos que romperían una plantilla ingenua.",
          ],
        },
      ],
    },
    pt: {
      name: "Gerador de gráficos SVG",
      tagline:
        "Transforme dados CSV, tabulados ou separados por ponto e vírgula em barras, linhas, área, pizza, rosca, radar ou funil — desenhados como SVG puro que você baixa e cola em slides, documentos ou numa página web. Sem biblioteca de gráficos e sem enviar dados.",
      intro: [
        "Cole os dados como faria numa planilha: a primeira coluna é o rótulo e as seguintes são uma ou mais séries. A ferramenta detecta o separador (tabulação, ponto e vírgula ou vírgula), lê uma linha de cabeçalho opcional e desenha ao vivo enquanto você digita.",
        "Os sete tipos são construídos com primitivas SVG em vez de uma biblioteca de gráficos, o que mantém a página leve e a saída portável: cada pixel é um caminho ou retângulo que você pode inspecionar, recolorir ou animar depois de exportar. Barras e áreas ancoram sempre o eixo Y em zero: uma série que parece plana então reflete os dados, e não um eixo truncado para parecer dramático.",
        "A exportação é um arquivo .svg de verdade. Ele carrega o próprio fundo branco para renderizar igual no PowerPoint, Google Slides, Notion ou num navegador, e todo texto é escapado antes de entrar no SVG, então rótulos com < ou & não quebram o arquivo.",
      ],
      steps: [
        "Cole os dados: rótulo e depois valores, separados por vírgula, tabulação ou ponto e vírgula.",
        "Escolha um tipo de gráfico e, se preciso, diga se a primeira linha é cabeçalho (nomes de série numéricos como 2025 exigem Sim).",
        "Baixe o .svg ou copie o código — a prévia é exatamente o que é exportado.",
      ],
      faqs: [
        {
          q: "Por que o eixo começa em zero em vez de ajustar aos dados?",
          a: "Porque um eixo truncado exagera diferenças pequenas. Uma série de 98 a 102 parece uma subida dramática com o eixo em 97, e parece o que é — uma mudança de 4% — com o eixo em zero. Barras e áreas codificam magnitude por comprimento, então a linha de base precisa ser significativa. Se você precisa de uma visão ampliada, é um pedido legítimo, mas pertence a um gráfico com corte de eixo explícito e rotulado, que esta ferramenta deliberadamente não falsifica.",
        },
        {
          q: "O que acontece quando há mais colunas do que o gráfico mostra?",
          a: "Barras, linhas, área e radar desenham todas as séries recebidas. Pizza, rosca e funil são gráficos de valor único por definição, então usam a primeira coluna de valores e listam as colunas descartadas numa linha de Notas visível, em vez de descartá-las em silêncio.",
        },
        {
          q: "Posso editar o SVG exportado no Illustrator ou Figma?",
          a: "Sim — é justamente por isso que emitimos SVG em vez de PNG. Caminhos, retângulos, círculos e elementos de texto são endereçáveis individualmente, o texto é texto real (não contornos) com uma pilha de fontes padrão, e não há filtros nem foreignObject. As cores são literais hexadecimais, então um localizar-e-substituir global de #2563eb recolore a primeira série em todo lugar.",
        },
        {
          q: "Como os números são formatados nos rótulos?",
          a: "Seis dígitos significativos, o mesmo padrão usado pelos conversores de unidades deste site. Isso impede que 37.777778 vire ruído e mantém precisão suficiente para dados de negócio típicos. Magnitudes muito grandes ou muito pequenas passam a notação exponencial em vez de imprimir uma fileira de zeros.",
        },
      ],
      deepDive: [
        {
          heading: "Por que SVG escrito à mão ganha aqui de uma biblioteca de gráficos",
          paragraphs: [
            "Um gráfico de barras são retângulos, um de linhas é um caminho, uma pizza são arcos e um radar é um polígono fechado. Todos são primitivas SVG nativas; uma biblioteca de gráficos justifica seu tamanho quando você precisa de interação, seleção por arrasto, zoom, séries empilhadas, eixos duplos, anotações e trabalho de motor de layout. Esta ferramenta não faz nada disso, então carregar um megabyte de runtime de gráficos para desenhar sete formas estáticas seria pagar por capacidade que nunca roda.",
            "A segunda razão é a fidelidade da exportação. O que você baixa não é uma captura do DOM da biblioteca, mas o desenho em si: um documento de caminhos que você abre no Illustrator, recolore com localizar-e-substituir, ou anima com CSS depois de importar. Exportações de bibliotecas costumam trazer nomes de classe próprios, blocos de estilo e às vezes invólucros foreignObject, o que transforma a edição manual de um arquivo exportado numa negociação com a biblioteca em vez de trabalho sobre o seu próprio desenho.",
            "O custo honesto é o conjunto de recursos: sem tooltips, sem zoom, sem alternar legenda, sem barras empilhadas, sem eixos duplos, sem animação. Se o gráfico precisa disso, esta não é a ferramenta certa e a biblioteca é — a nota sob o gráfico diz isso, em vez de insinuar que esta saída compete com painéis interativos.",
          ],
        },
        {
          heading: "Honestidade do gráfico: base zero, colunas descartadas e escape",
          paragraphs: [
            "A decisão mais consequente em qualquer gráfico é onde o eixo começa. O comprimento codifica magnitude, então uma base acima de zero distorce proporções: de 98 a 102 num eixo desde zero é uma alta de 4%, e num eixo desde 97 parece duplicar. Este gerador coloca sempre a base em zero para dados não negativos, e só desce abaixo de zero quando há valores negativos, o único caso em que uma base diferente de zero é estruturalmente necessária e não cosmética.",
            "Gráficos de várias séries no modo barras vão agrupados lado a lado em vez de empilhados, porque empilhar muda o que o leitor pode comparar: barras empilhadas comparam totais bem mas tornam impossível acompanhar séries individuais, e essa escolha deve pertencer a quem faz o gráfico, não ficar assada em silêncio. Como o empilhamento não é oferecido, o visual nunca o insinua. Pizza, rosca e funil são formas de valor único por definição; quando a entrada traz colunas extras, a exportação as enumera para que se saiba o que foi ignorado.",
            "O tratamento de texto é onde geradores SVG costumam quebrar: um ampersand ou ângulo não escapado num rótulo produz XML malformado que alguns visores pintam em branco e outros se recusam a abrir. Toda string do usuário passa aqui por um escape XML antes de chegar ao documento, e um teste afirma que um rótulo como `</svg><script>` não pode fechar o elemento raiz cedo. O arquivo gerado sobrevive a dados que quebrariam um template ingênuo.",
          ],
        },
      ],
    },
  },
});
