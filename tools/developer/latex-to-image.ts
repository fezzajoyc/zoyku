import { DevEngineLatex } from "../_engines/dev-engine-latex";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "latex-to-image",
  category: "developer",
  icon: "code",
  engine: { component: DevEngineLatex },
  related: ["chart-generator", "markdown-previewer", "svg-converter", "html-to-markdown"],
  copy: {
    en: {
      name: "LaTeX to SVG & PNG",
      tagline:
        "Type a LaTeX formula and get a crisp vector SVG or a high-resolution PNG — rendered by MathJax in your browser, no TeX install, no upload. Perfect for inserting equations into docs, slides and papers.",
      intro: [
        "Paste a formula — with or without the usual $$ / $ / \\( \\) delimiters, they are stripped automatically — and the tool renders it live through MathJax 4's SVG output. You get a real vector drawing of the equation, plus a PNG rasterized at up to 4× scale for documents that cannot embed SVG.",
        "The SVG carries the actual glyph outlines as <path> elements inside a <defs> cache plus <use> references, so it scales to any size without blurring and opens directly in Illustrator, Inkscape or Figma. Padding and a white or transparent background are applied by expanding the viewBox, never by touching glyph coordinates.",
        "MathJax deliberately tolerates malformed input: an unclosed \\frac{1}{ does not throw, it renders a small error box, and an unknown command like \\notacommand is quietly printed as literal text. That tolerance is useful for a live editor and dangerous for an export tool, so this page pre-checks brace and bracket balance and refuses obviously broken expressions instead of exporting a formula that is silently wrong.",
      ],
      steps: [
        "Type or paste the LaTeX expression (delimiters like $$ are optional).",
        "Choose padding, background and the PNG scale; the preview updates as you change them.",
        "Download the .svg for vector use or the .png for documents and chat, or copy the SVG source.",
      ],
      faqs: [
        {
          q: "Do I need a TeX distribution installed?",
          a: "No. Rendering uses MathJax 4, which implements TeX math parsing and SVG generation entirely in JavaScript. The first render downloads a 1.8 MB engine bundle once; after that every formula renders locally and instantly. Nothing is sent to a server, and no LaTeX compiler is involved.",
        },
        {
          q: "Why does the tool reject some formulas that MathJax would happily render?",
          a: "Because MathJax's tolerance produces silently wrong output for some broken input: an unclosed brace makes it render a partial expression with an error box instead of failing, and an unknown command is printed as text. For a live preview that is convenient; for an exported figure it is a trap. This tool pre-checks brace and bracket balance and shows a specific error with the position, so you fix the formula rather than shipping a broken equation.",
        },
        {
          q: "Does the SVG keep its fonts, or do I need to install math fonts?",
          a: "The glyphs are real vector outlines embedded as <path> data inside <defs>, not font references. The exported SVG therefore renders identically on any machine, with no font installation, and stays sharp at any zoom. That is why the file is a few kilobytes rather than a fraction of one.",
        },
        {
          q: "What limits are there on the PNG?",
          a: "The PNG is rasterized from the SVG on a canvas at 1×, 2×, 3× or 4× of the SVG's unit size, capped at 4000 pixels per side. The cap is reported in the size line, and the aspect ratio is preserved when it kicks in. Very large formulas at 4× shrink proportionally rather than producing a multi-megabyte image.",
        },
      ],
      deepDive: [
        {
          heading: "Why math in browsers is rendered as SVG paths, not text",
          paragraphs: [
            "Mathematical typesetting is not text layout with a fancier font. Fraction bars have to stretch, radicals must grow to cover their radicand, big operators carry limits above and below, and matrices align on a grid. MathJax parses TeX into a MathML tree, applies its own layout rules to compute every box position, and then emits either CHTML (CSS with web fonts) or SVG (path outlines). This tool chooses SVG because the result is a single self-contained drawing rather than markup that depends on a font being installed on the viewer's machine.",
            "The SVG output puts every distinct glyph outline into a <defs> block keyed by a generated id (something like MJX-3-NCM-I-1D465), then references those outlines with <use xlink:href=\"#id\"> elements. A formula that repeats a symbol therefore stores its outline once. Widely spaced positioning is achieved with transform attributes on <use>, so the drawing is composed from real glyph geometry the same way a PDF is, which is why it stays crisp under any scaling and opens correctly in vector editors.",
            "The practical consequence is portability. A CHTML equation breaks the moment the viewer lacks the matching webfont — common in Word, Keynote, email clients and PDF converters. A self-contained SVG with embedded outlines renders identically everywhere, prints at any resolution and can be edited as geometry. It is also why these files are small: an equation with a dozen unique characters needs a dozen glyph outlines, not a whole font.",
          ],
        },
        {
          heading: "MathJax is forgiving, which is exactly why a pre-check matters",
          paragraphs: [
            "MathJax is built for live authoring, so it never throws on bad input: an unclosed \\frac{1}{ produces a small node with an error indicator, and an unknown control sequence like \\notacommand renders the backslash and letters as literal text in a formula that otherwise looks plausible. In a live editor that behaviour is helpful — you see what you typed and fix it. In an export pipeline it is a silent failure mode: you ship a formula that is subtly wrong and nobody notices until a reader does the math.",
            "This tool therefore validates before rendering: it rejects empty input, expressions past 4000 characters, and any brace or bracket imbalance, reporting the offending position. Escaped braces like \\{ and \\} are excluded from the balance check because they are literal characters, and parentheses are not checked at all because they are ordinary characters in mathematical notation rather than grouping delimiters.",
            "The other deliberate choice is a full-fidelity export rather than a screenshot: after MathJax renders, the container wrapper is stripped so the saved file is a standalone <svg> with its namespaces intact, padding is added by expanding the viewBox (never by moving glyphs), and the background is a single <rect> inserted directly after the open tag. A test asserts the glyph path data is byte-identical before and after padding, because silently rewriting geometry would defeat the purpose of exporting vectors.",
          ],
        },
      ],
    },
    zh: {
      name: "LaTeX 转 SVG 与 PNG",
      tagline:
        "输入 LaTeX 公式,即可得到清晰的矢量 SVG 或高分辨率 PNG——由浏览器内的 MathJax 渲染,无需安装 TeX,不上传任何内容。适合把公式插进文档、幻灯片与论文。",
      intro: [
        "粘贴公式——带不带 $$ / $ / \\( \\) 这类分隔符都行,工具会自动剥掉——它经 MathJax 4 的 SVG 输出实时渲染。你得到的是公式的真实矢量图,以及最高 4 倍缩放栅格化的 PNG(用于无法嵌入 SVG 的文档)。",
        "SVG 里装的是真实的字形轮廓:<defs> 缓存中的 <path> 元素,加上 <use> 引用。所以它能无损放大到任意尺寸,也能直接在 Illustrator、Inkscape 或 Figma 中打开。内边距与白色/透明背景通过扩展 viewBox 实现,绝不触碰字形坐标。",
        "MathJax 刻意容忍畸形输入:未闭合的 \\frac{1}{ 不会抛异常,而是渲染成一个小错误框;\\notacommand 这样的未知命令会被悄悄当字面文本印出来。这种宽容对实时编辑器友好,对导出工具却危险,所以本页预检花括号与方括号的平衡,拒绝明显损坏的表达式,而不是导出一个悄悄错误的公式。",
      ],
      steps: [
        "输入或粘贴 LaTeX 表达式(分隔符如 $$ 可省略)。",
        "选择内边距、背景与 PNG 缩放;改动时预览即时更新。",
        "下载 .svg 用于矢量场景,或下载 .png 用于文档与聊天,也可以复制 SVG 源码。",
      ],
      faqs: [
        {
          q: "需要安装 TeX 发行版吗?",
          a: "不需要。渲染使用 MathJax 4,它以纯 JavaScript 实现 TeX 数学解析与 SVG 生成。首次渲染会下载一次 1.8 MB 的引擎包,之后每个公式都在本地瞬时渲染。没有任何内容被发往服务器,也不涉及 LaTeX 编译器。",
        },
        {
          q: "为什么有些 MathJax 明明能渲染的公式,本工具会拒绝?",
          a: "因为 MathJax 的宽容对某些畸形输入会产生悄悄错误的输出:未闭合的花括号会渲染出带错误框的残缺表达式而不报错,未知命令会被印成文本。对实时预览这很方便,对导出成图这是个陷阱。本工具预检花括号与方括号平衡,并给出带位置的具体错误,让你去修公式,而不是发布一个坏公式。",
        },
        {
          q: "SVG 会保留字体吗,还是我需要装数学字体?",
          a: "字形是真实的矢量轮廓,以 <path> 数据嵌在 <defs> 里,不是字体引用。因此导出的文件在任何机器上渲染一致,无需安装字体,任何缩放都保持锐利。这也是文件只有几 KB、而不是几十 KB 的原因。",
        },
        {
          q: "PNG 有什么限制?",
          a: "PNG 由 SVG 在 canvas 上按 SVG 单位尺寸的 1×、2×、3× 或 4× 栅格化,单边上限 4000 像素。上限会在尺寸行里明示,触发时保持宽高比。超大公式选 4× 会等比缩小,而不是产出几兆的位图。",
        },
      ],
      deepDive: [
        {
          heading: "为什么浏览器里的数学符号要画成 SVG 路径而不是文本",
          paragraphs: [
            "数学排版不是「换套更花哨字体的文本排版」。分数线要能拉长,根号要长大到盖住被开方项,大型运算符要把上下限放在上下方,矩阵要在网格上对齐。MathJax 把 TeX 解析成 MathML 树,用自身的排版规则计算每个盒子的位置,然后输出 CHTML(带网页字体的 CSS)或 SVG(路径轮廓)。本工具选 SVG,因为结果是单一的、自包含的图形文件,而不是依赖观看者机器上装了某个字体的标记。",
            "SVG 输出把每个不同的字形轮廓放进一个 <defs> 块,用生成的 id 作键(形如 MJX-3-NCM-I-1D465),再用 <use xlink:href=\"#id\"> 引用这些轮廓。因此重复出现的符号只存一份轮廓;位置靠 <use> 上的 transform 属性实现。整个图形和 PDF 一样由真实字形几何拼成,这正是它在任意缩放下都锐利、在矢量编辑器中能正确打开的原因。",
            "实际后果是可移植性。CHTML 公式一旦观看端缺对应网页字体就会崩——在 Word、Keynote、邮件客户端与 PDF 转换器里非常常见。自包含的、内嵌轮廓的 SVG 在任何地方渲染一致,任意分辨率打印,还能作为几何图形继续编辑。这也是文件小的原因:一个含十几个不同字符的公式只需要十几个字形轮廓,而不是整套字体。",
          ],
        },
        {
          heading: "MathJax 很宽容,所以预检才格外重要",
          paragraphs: [
            "MathJax 是为实时写作而造的,所以对坏输入从不抛异常:未闭合的 \\frac{1}{ 会产出一个带错误标记的小节点,而 \\notacommand 这样的未知控制序列会把反斜杠和字母当字面文本渲染进一个看起来还算像样的公式里。在实时编辑器里这很有用——你看见自己打了什么,然后去修。在导出流水线里,这是个静默失败模式:你发布了一个微妙地算错的公式,直到读者真的去算才发现。",
            "所以本工具在渲染前校验:拒绝空输入、超过 4000 字符的表达式,以及任何花括号或方括号不平衡,并报告出错位置。像 \\{ 与 \\} 这样的转义括号被排除在平衡检查之外,因为它们是字面字符;圆括号完全不检查,因为它们在数学记号里是普通字符而不是分组定界符。",
            "另一个刻意选择是全保真导出而不是截图:MathJax 渲染完成后,容器外壳被剥掉,保存的文件是命名空间完整的独立 <svg>;内边距通过扩展 viewBox 添加(绝不移动字形);背景是紧接开标签插入的单个 <rect>。有测试断言内边距前后的字形路径数据逐字节相同,因为悄悄改写几何会让「导出矢量」这件事失去意义。",
          ],
        },
      ],
    },
    ja: {
      name: "LaTeX → SVG ・ PNG 変換",
      tagline:
        "LaTeX の数式を入力すると、鮮明なベクター SVG または高解像度 PNG が得られます — ブラウザ内の MathJax が描画し、TeX のインストール不要、アップロード不要。文書・スライド・論文への数式挿入に最適です。",
      intro: [
        "数式を貼り付けます(通常の $$ / $ / \\( \\) などの区切りは自動で外されます)。MathJax 4 の SVG 出力でリアルタイムに描画され、数式の本物のベクター画像と、SVG を埋め込めない文書用に最大 4 倍でラスタライズした PNG が得られます。",
        "SVG には実際の字形アウトラインが <defs> キャッシュ内の <path> 要素として格納され、<use> で参照されます。そのため任意のサイズまでぼやけずに拡大でき、Illustrator・Inkscape・Figma で直接開けます。余白と白/透明背景は viewBox を広げて適用し、字形座標には一切触れません。",
        "MathJax は不正な入力を意図的に許容します。閉じていない \\frac{1}{ は例外を投げず小さなエラーボックスを描画し、\\notacommand のような未知の命令はそのまま文字として印字されます。この寛容さはライブエディタには便利ですが、書き出しツールには危険です。そこで本ページは波括弧・角括弧の対応を事前検査し、明らかに壊れた式を拒否します。静かに間違った数式を書き出す代わりに。",
      ],
      steps: [
        "LaTeX 式を入力または貼り付けます($$ などの区切りは任意)。",
        "余白・背景・PNG 倍率を選びます。変更に応じてプレビューが更新されます。",
        "ベクター用途なら .svg、文書やチャット用なら .png をダウンロードするか、SVG ソースをコピーします。",
      ],
      faqs: [
        {
          q: "TeX ディストリビューションのインストールは必要ですか?",
          a: "不要です。描画には MathJax 4 を使い、TeX の数式解析と SVG 生成を純 JavaScript で実装しています。初回描画時に 1.8 MB のエンジンバンドルを一度だけダウンロードし、その後はすべてローカルで即座に描画されます。サーバーへの送信はなく、LaTeX コンパイラも関与しません。",
        },
        {
          q: "MathJax が喜んで描画する式を本ツールが拒否するのはなぜ?",
          a: "MathJax の寛容さが一部の不正入力で静かに間違った出力を生むからです。閉じていない括弧はエラーボックス付きの部分式として描画され失敗しませんし、未知の命令は文字として印字されます。ライブプレビューには便利ですが、図の書き出しには罠です。本ツールは括弧の対応を事前検査し、位置付きの具体的なエラーを示すので、壊れた式を配布するのではなく式を直せます。",
        },
        {
          q: "SVG はフォントを保つのか、数式フォントを入れる必要があるのか?",
          a: "字形は <defs> 内に <path> データとして埋め込まれた本物のベクターアウトラインで、フォント参照ではありません。したがって書き出したファイルはどのマシンでも同一に描画され、フォント導入は不要で、どの倍率でも鮮明です。ファイルが数十 KB ではなく数 KB なのもこのためです。",
        },
        {
          q: "PNG に制限はありますか?",
          a: "PNG は SVG を canvas 上で SVG の単位サイズの 1×・2×・3×・4× でラスタライズし、片側 4000 ピクセルが上限です。上限はサイズ行に明示され、発動時は縦横比を保ちます。巨大な式を 4× で選ぶと数 MB のビットマップではなく等比縮小になります。",
        },
      ],
      deepDive: [
        {
          heading: "なぜブラウザの数学はテキストではなく SVG パスで描かれるのか",
          paragraphs: [
            "数学の組版は「凝ったフォントでのテキスト組版」ではありません。分数線は伸びる必要があり、根号は被開方数を覆うよう育ち、大型演算子は上下に極限を伴い、行列はグリッドに整列します。MathJax は TeX を MathML 木に解析し、独自の組版規則で全ボックスの位置を計算して、CHTML(ウェブフォント付き CSS)または SVG(パスアウトライン)を出力します。本ツールが SVG を選ぶのは、結果が視聴者のマシンに特定フォントが入っていることに依存するマークアップではなく、単一の自己完結した図になるからです。",
            "SVG 出力は各異形アウトラインを生成 id(例: MJX-3-NCM-I-1D465)をキーに <defs> ブロックへ入れ、<use xlink:href=\"#id\"> で参照します。同じ記号が繰り返す式はアウトラインを 1 つだけ保存します。位置は <use> の transform 属性で実現され、図は PDF と同じく実字形ジオメトリから合成されます。だから任意の倍率で鮮明で、ベクターエディタで正しく開けます。",
            "実務上の帰結は可搬性です。CHTML の式は視聴側に対応ウェブフォントが無い瞬間に崩れます — Word・Keynote・メールクライアント・PDF 変換でよく起きます。アウトラインを内包した自己完結 SVG はどこでも同一に描画され、任意の解像度で印刷でき、ジオメトリとして編集できます。ファイルが小さいのもこの理由で、十数種の異なる文字を含む式には十数個の字形アウトラインが必要で、フォント一式は要りません。",
          ],
        },
        {
          heading: "MathJax は寛容 — だからこそ事前検査が要る",
          paragraphs: [
            "MathJax はライブ執筆向けに作られているので、不正入力で決して例外を投げません。閉じていない \\frac{1}{ はエラー標識付きの小さなノードを生み、\\notacommand のような未知の制御列はバックスラッシュと文字を本文として描画し、式はもっともらしく見えます。ライブエディタでは役に立ち、書いたものを確認して直せます。しかし書き出しパイプラインでは静かな失敗モードであり、微妙に間違った式を配布し、読者が計算するまで誰も気づきません。",
            "そこで本ツールは描画前に検証します。空入力、4000 文字を超える式、波括弧・角括弧の不均衡を拒否し、問題の位置を報告します。\\{ や \\} のようなエスケープされた括弧はリテラル文字なので均衡検査から除外し、丸括弧は数学記法では通常の文字でありグループ化の区切りではないため一切検査しません。",
            "もう 1 つの意図的な選択はスクリーンショットではなく完全忠実な書き出しです。MathJax の描画後、コンテナ外殻を剥ぎ取り、保存ファイルは名前空間の整った単独 <svg> になります。余白は viewBox を広げて加え(字形は決して動かさず)、背景は開始タグ直後に挿入した 1 つの <rect> です。余白前後で字形パスデータがバイト一致することをテストが断言します。静かにジオメトリを書き換えれば「ベクターを書き出す」意味が失われるからです。",
          ],
        },
      ],
    },
    es: {
      name: "LaTeX a SVG y PNG",
      tagline:
        "Escribe una fórmula LaTeX y obtén un SVG vectorial nítido o un PNG de alta resolución — renderizados por MathJax en tu navegador, sin instalar TeX y sin subir nada. Ideal para insertar ecuaciones en documentos, diapositivas y artículos.",
      intro: [
        "Pega una fórmula — con o sin los delimitadores habituales $$ / $ / \\( \\), se eliminan automáticamente — y la herramienta la renderiza en vivo con la salida SVG de MathJax 4. Obtienes un dibujo vectorial real de la ecuación, más un PNG rasterizado hasta 4× para documentos que no admiten SVG.",
        "El SVG lleva los contornos de glifo reales como elementos <path> dentro de una caché <defs> más referencias <use>, así que escala a cualquier tamaño sin difuminarse y se abre directamente en Illustrator, Inkscape o Figma. El relleno y un fondo blanco o transparente se aplican expandiendo el viewBox, nunca tocando las coordenadas del glifo.",
        "MathJax tolera deliberadamente entradas malformadas: un \\frac{1}{ sin cerrar no lanza error, renderiza una pequeña caja de error, y un comando desconocido como \\notacommand se imprime en silencio como texto literal. Esa tolerancia es útil en un editor en vivo y peligrosa en una herramienta de exportación, así que esta página precomprueba el balance de llaves y corchetes y rechaza expresiones obviamente rotas en lugar de exportar una fórmula silenciosamente incorrecta.",
      ],
      steps: [
        "Escribe o pega la expresión LaTeX (los delimitadores como $$ son opcionales).",
        "Elige relleno, fondo y escala PNG; la vista previa se actualiza al cambiarlos.",
        "Descarga el .svg para uso vectorial o el .png para documentos y chat, o copia el código SVG.",
      ],
      faqs: [
        {
          q: "¿Necesito una distribución TeX instalada?",
          a: "No. El renderizado usa MathJax 4, que implementa el análisis de matemáticas TeX y la generación de SVG enteramente en JavaScript. El primer renderizado descarga una vez un paquete de motor de 1.8 MB; después cada fórmula se renderiza local e instantáneamente. Nada se envía a un servidor y no interviene ningún compilador LaTeX.",
        },
        {
          q: "¿Por qué la herramienta rechaza fórmulas que MathJax renderizaría sin problema?",
          a: "Porque la tolerancia de MathJax produce salida silenciosamente errónea para algunas entradas rotas: una llave sin cerrar hace que renderice una expresión parcial con una caja de error en vez de fallar, y un comando desconocido se imprime como texto. Para una vista previa en vivo eso es cómodo; para una figura exportada es una trampa. Esta herramienta precomprueba el balance de llaves y corchetes y muestra un error concreto con la posición, para que corrijas la fórmula en lugar de publicar una ecuación rota.",
        },
        {
          q: "¿El SVG conserva las fuentes o necesito instalar fuentes matemáticas?",
          a: "Los glifos son contornos vectoriales reales incrustados como datos <path> dentro de <defs>, no referencias a fuentes. Por eso el archivo exportado se renderiza igual en cualquier máquina, sin instalar fuentes, y permanece nítido a cualquier zoom. Es también la razón de que ocupe unos pocos kilobytes en vez de decenas.",
        },
        {
          q: "¿Qué límites tiene el PNG?",
          a: "El PNG se rasteriza desde el SVG en un canvas a 1×, 2×, 3× o 4× del tamaño unitario del SVG, con un tope de 4000 píxeles por lado. El tope se informa en la línea de tamaño y la relación de aspecto se mantiene cuando se activa. Fórmulas muy grandes a 4× se reducen proporcionalmente en vez de producir una imagen de varios megabytes.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué las matemáticas en el navegador se dibujan como rutas SVG y no como texto",
          paragraphs: [
            "La composición matemática no es composición de texto con una fuente más elegante. Las barras de fracción tienen que estirarse, los radicales crecer para cubrir su radicando, los operadores grandes llevan límites arriba y abajo, y las matrices se alinean en una rejilla. MathJax analiza TeX en un árbol MathML, aplica sus propias reglas de composición para calcular la posición de cada caja y emite CHTML (CSS con fuentes web) o SVG (contornos de glifo). Esta herramienta elige SVG porque el resultado es un dibujo único y autocontenido, en lugar de un marcado que depende de que el visor tenga una fuente instalada.",
            "La salida SVG coloca cada contorno de glifo distinto en un bloque <defs> con clave de id generado (algo como MJX-3-NCM-I-1D465) y luego referencia esos contornos con elementos <use xlink:href=\"#id\">. Una fórmula que repite un símbolo guarda su contorno una sola vez. El posicionamiento se logra con atributos transform en <use>, así que el dibujo se compone de geometría real de glifos igual que un PDF, y por eso permanece nítido con cualquier escala y se abre correctamente en editores vectoriales.",
            "La consecuencia práctica es la portabilidad. Una ecuación CHTML se rompe en el momento en que el visor carece de la fuente web correspondiente — algo habitual en Word, Keynote, clientes de correo y convertidores a PDF. Un SVG autocontenido con contornos incrustados se renderiza igual en todas partes, se imprime a cualquier resolución y puede editarse como geometría. Es también la razón de que estos archivos sean pequeños: una ecuación con una docena de caracteres distintos necesita una docena de contornos, no una fuente entera.",
          ],
        },
        {
          heading: "MathJax es indulgente, y por eso la comprobación previa importa",
          paragraphs: [
            "MathJax está hecho para autoría en vivo, así que nunca lanza error con entrada mala: un \\frac{1}{ sin cerrar produce un nodo pequeño con un indicador de error, y una secuencia de control desconocida como \\notacommand renderiza la barra invertida y las letras como texto literal dentro de una fórmula que por lo demás parece plausible. En un editor en vivo ese comportamiento ayuda — ves lo que escribiste y lo corriges. En un proceso de exportación es un modo de fallo silencioso: publicas una fórmula sutilmente equivocada y nadie lo nota hasta que un lector hace la cuenta.",
            "Por eso esta herramienta valida antes de renderizar: rechaza entrada vacía, expresiones de más de 4000 caracteres y cualquier desequilibrio de llaves o corchetes, informando la posición del problema. Las llaves escapadas como \\{ y \\} quedan excluidas de la comprobación de balance porque son caracteres literales, y los paréntesis no se comprueban en absoluto porque en notación matemática son caracteres ordinarios, no delimitadores de agrupación.",
            "La otra decisión deliberada es exportar con fidelidad completa en vez de una captura: tras renderizar MathJax se quita el contenedor, de modo que el archivo guardado es un <svg> independiente con sus espacios de nombres intactos; el relleno se añade expandiendo el viewBox (nunca moviendo glifos), y el fondo es un único <rect> insertado inmediatamente después de la etiqueta de apertura. Una prueba afirma que los datos de ruta de los glifos son idénticos byte a byte antes y después del relleno, porque reescribir silenciosamente la geometría acabaría con el propósito de exportar vectores.",
          ],
        },
      ],
    },
    pt: {
      name: "LaTeX para SVG e PNG",
      tagline:
        "Digite uma fórmula LaTeX e obtenha um SVG vetorial nítido ou um PNG de alta resolução — renderizados pelo MathJax no seu navegador, sem instalar TeX e sem enviar nada. Ideal para inserir equações em documentos, slides e artigos.",
      intro: [
        "Cole uma fórmula — com ou sem os delimitadores usuais $$ / $ / \\( \\), eles são removidos automaticamente — e a ferramenta a renderiza ao vivo com a saída SVG do MathJax 4. Você recebe um desenho vetorial real da equação, além de um PNG rasterizado até 4× para documentos que não aceitam SVG.",
        "O SVG carrega os contornos de glifo reais como elementos <path> dentro de um cache <defs> mais referências <use>, então escala a qualquer tamanho sem desfoque e abre direto no Illustrator, Inkscape ou Figma. O preenchimento e um fundo branco ou transparente são aplicados expandindo o viewBox, nunca tocando nas coordenadas do glifo.",
        "O MathJax tolera deliberadamente entrada malformada: um \\frac{1}{ sem fechar não lança erro, renderiza uma pequena caixa de erro, e um comando desconhecido como \\notacommand é impresso em silêncio como texto literal. Essa tolerância é útil num editor ao vivo e perigosa numa ferramenta de exportação, então esta página pré-verifica o equilíbrio de chaves e colchetes e recusa expressões obviamente quebradas em vez de exportar uma fórmula silenciosamente errada.",
      ],
      steps: [
        "Digite ou cole a expressão LaTeX (delimitadores como $$ são opcionais).",
        "Escolha preenchimento, fundo e escala do PNG; a prévia atualiza ao mudá-los.",
        "Baixe o .svg para uso vetorial ou o .png para documentos e chat, ou copie o código SVG.",
      ],
      faqs: [
        {
          q: "Preciso de uma distribuição TeX instalada?",
          a: "Não. A renderização usa o MathJax 4, que implementa a análise de matemática TeX e a geração de SVG inteiramente em JavaScript. O primeiro render baixa uma vez um pacote de motor de 1,8 MB; depois cada fórmula renderiza local e instantaneamente. Nada é enviado a um servidor e nenhum compilador LaTeX está envolvido.",
        },
        {
          q: "Por que a ferramenta recusa fórmulas que o MathJax renderizaria sem problema?",
          a: "Porque a tolerância do MathJax produz saída silenciosamente errada para algumas entradas quebradas: uma chave sem fechar faz renderizar uma expressão parcial com uma caixa de erro em vez de falhar, e um comando desconhecido é impresso como texto. Para uma prévia ao vivo isso é conveniente; para uma figura exportada é uma armadilha. Esta ferramenta pré-verifica o equilíbrio de chaves e colchetes e mostra um erro específico com a posição, para você corrigir a fórmula em vez de publicar uma equação quebrada.",
        },
        {
          q: "O SVG conserva as fontes ou preciso instalar fontes matemáticas?",
          a: "Os glifos são contornos vetoriais reais embutidos como dados <path> dentro de <defs>, não referências a fontes. Por isso o arquivo exportado renderiza igual em qualquer máquina, sem instalar fontes, e permanece nítido em qualquer zoom. É também por isso que ocupa alguns kilobytes em vez de dezenas.",
        },
        {
          q: "Que limites o PNG tem?",
          a: "O PNG é rasterizado a partir do SVG num canvas a 1×, 2×, 3× ou 4× do tamanho unitário do SVG, com teto de 4000 pixels por lado. O teto é informado na linha de tamanho e a proporção é mantida quando ele entra em ação. Fórmulas muito grandes a 4× encolhem proporcionalmente em vez de produzir uma imagem de vários megabytes.",
        },
      ],
      deepDive: [
        {
          heading: "Por que matemática no navegador é desenhada como caminhos SVG e não como texto",
          paragraphs: [
            "A composição matemática não é composição de texto com uma fonte mais elegante. Barras de fração precisam esticar, radicais crescer para cobrir seu radicando, operadores grandes carregam limites acima e abaixo, e matrizes alinham numa grade. O MathJax analisa TeX em uma árvore MathML, aplica suas próprias regras de composição para calcular a posição de cada caixa e emite CHTML (CSS com fontes web) ou SVG (contornos de glifo). Esta ferramenta escolhe SVG porque o resultado é um desenho único e autocontido, em vez de uma marcação que depende de o visualizador ter uma fonte instalada.",
            "A saída SVG coloca cada contorno de glifo distinto num bloco <defs> com chave de id gerado (algo como MJX-3-NCM-I-1D465) e então referencia esses contornos com elementos <use xlink:href=\"#id\">. Uma fórmula que repete um símbolo guarda seu contorno uma única vez. O posicionamento vem de atributos transform em <use>, então o desenho é composto de geometria real de glifos como um PDF, e é por isso que permanece nítido em qualquer escala e abre corretamente em editores vetoriais.",
            "A consequência prática é a portabilidade. Uma equação CHTML quebra no instante em que o visualizador não tem a fonte web correspondente — comum no Word, Keynote, clientes de e-mail e conversores para PDF. Um SVG autocontido com contornos embutidos renderiza igual em toda parte, imprime em qualquer resolução e pode ser editado como geometria. É também por isso que esses arquivos são pequenos: uma equação com uma dúzia de caracteres distintos precisa de uma dúzia de contornos, não de uma fonte inteira.",
          ],
        },
        {
          heading: "O MathJax é indulgente, e é exatamente por isso que a pré-verificação importa",
          paragraphs: [
            "O MathJax foi feito para autoria ao vivo, então nunca lança erro com entrada ruim: um \\frac{1}{ sem fechar produz um nó pequeno com indicador de erro, e uma sequência de controle desconhecida como \\notacommand renderiza a barra invertida e as letras como texto literal dentro de uma fórmula que de resto parece plausível. Num editor ao vivo esse comportamento ajuda — você vê o que digitou e corrige. Num pipeline de exportação é um modo de falha silencioso: você publica uma fórmula sutilmente errada e ninguém percebe até um leitor fazer a conta.",
            "Por isso esta ferramenta valida antes de renderizar: recusa entrada vazia, expressões com mais de 4000 caracteres e qualquer desequilíbrio de chaves ou colchetes, informando a posição do problema. Chaves escapadas como \\{ e \\} ficam fora da checagem de equilíbrio porque são caracteres literais, e parênteses não são checados de forma alguma porque em notação matemática são caracteres comuns, não delimitadores de agrupamento.",
            "A outra decisão deliberada é exportar com fidelidade total em vez de uma captura: após o MathJax renderizar, o contêiner é removido, de modo que o arquivo salvo é um <svg> independente com seus namespaces intactos; o preenchimento é adicionado expandindo o viewBox (nunca movendo glifos), e o fundo é um único <rect> inserido logo após a tag de abertura. Um teste afirma que os dados de caminho dos glifos são idênticos byte a byte antes e depois do preenchimento, porque reescrever silenciosamente a geometria anularia o propósito de exportar vetores.",
          ],
        },
      ],
    },
  },
});
