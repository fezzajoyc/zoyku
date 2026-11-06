import { DevCodeEngine } from "../_engines/dev-engine-code";
import { defineTool } from "../_lib/types";

const SAMPLE = '<div class="card"><h1>Hi</h1><p>Some <b>bold</b> text</p><img src="x.png" alt="x"></div>';

export default defineTool({
  slug: "html-formatter",
  category: "developer",
  icon: "code",
  engine: { component: DevCodeEngine, props: { mode: "html-beautify", sample: SAMPLE } },
  related: ["html-minifier", "xml-formatter", "css-minifier", "markdown-previewer", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "url-encoder"],
  copy: {
    en: {
      name: "HTML Formatter",
      tagline:
        "Turn minified or one-line HTML into clean, indented markup — a simple, reliable beautifier for emails, templates and saved pages. 100% client-side.",
      intro: [
        "Paste crammed-together HTML and get readable, consistently indented markup back instantly. Void elements like img and br never break the indentation, common auto-closing tags such as li and p are handled sensibly, and the contents of pre, textarea, script and style blocks are preserved untouched.",
        "A deliberate simple formatter: no reordering, no attribute rewriting, no surprises — just whitespace and line breaks added so the structure is obvious at a glance.",
      ],
      steps: [
        "Paste your HTML into the input box.",
        "The indented result appears live as you type.",
        "Copy the formatted markup or clear the input to format another snippet.",
      ],
      faqs: [
        {
          q: "Does formatting change how my HTML renders?",
          a: "No — formatting only inserts whitespace and line breaks between tags. The contents of pre, textarea, script and style are preserved exactly, since whitespace there is meaningful.",
        },
        {
          q: "How does it handle unclosed tags like li or p?",
          a: "It knows the common auto-closing elements: a new li closes the previous one, and a closing tag for an ancestor pops all open children, so lists and paragraphs indent the way you expect.",
        },
        {
          q: "Is the HTML sent to a server?",
          a: "Never. The formatter is a local JavaScript tokenizer — your markup stays in your browser.",
        },
      ],
      deepDive: [
        {
          heading: "Where whitespace matters: the pre/textarea exception",
          paragraphs: [
            "The rule that governs any HTML formatter is that whitespace is not always free. Between block elements, a newline is collapsed to a single space and the browser ignores it almost everywhere — but not everywhere. Inside pre and textarea, whitespace is the content itself. Inside script and style, a stray line break can alter the meaning (a template literal in script, or an attribute selector in CSS, can be sensitive to formatting). A beautifier that blindly indents these blocks does not just make the code look odd — it can break it.",
            "There is a second, subtler case: inline elements. Whitespace between <a>, <b> or <img> tags inside a paragraph renders as a visible space. Adding line breaks there changes the rendered output in ways that are technically cosmetic but visibly different. That is why a careful formatter keeps inline content on one line rather than pushing every child onto its own row — the differences between browsers here are small but real.",
            "The formatter makes these decisions explicit: content of pre, textarea, script and style passes through untouched, and tags are classified as block, inline, or void (img, br, hr, input and friends, which have no closing tag at all and must not open an indentation level). This classification is the same one the HTML spec uses, and getting it wrong is what distinguishes a formatter from a markup mangler.",
          ],
        },
        {
          heading: "Auto-closing tags: how malformed HTML gets indent sanely",
          paragraphs: [
            "Real-world HTML — email templates, pages saved from browsers, legacy CMS output — rarely closes every tag. The HTML standard defines a set of elements with optional end tags: a new li implicitly closes the previous li, a p is closed by most block-level elements that follow, and a closing tag for an ancestor implicitly closes every open descendant. A formatter that ignores these rules nests everything inside the first unclosed tag, and the indentation becomes a lie.",
            "The practical approach here mirrors a browser parser: keep a stack of open elements, close them according to the standard's implicit-end rules, and let a closing tag for an ancestor pop every element opened after it. Malformed input degrades gracefully — unclosed tags still indent, mismatched close tags do not crash the run — but the tool does not invent structure it cannot see, which is why it deliberately does not re-order or \"fix\" your markup beyond whitespace.",
            "That restraint is a design position. Beautifiers exist that reorder attributes, convert self-closing syntax, or normalize quoting; useful for style-guides, dangerous when you need the output to match a diff or a strict template. When the goal is to read a minified email template or a saved page, whitespace-only transformation is the honest one: what you see is exactly your structure, just laid out to be visible.",
          ],
        },
        {
          heading: "Why the formatting runs in your browser",
          paragraphs: [
            "The kind of HTML people paste into a formatter is often confidential: transactional email templates with customer tokens, internal admin pages with API URLs, a competitor's page saved for study. Sending any of this to a formatter service puts your markup on a third-party server where it can be logged or retained. This tool tokenizes and indents locally in JavaScript — nothing crosses the network, there is no upload step, and the page works even offline.",
            "There is also a reliability benefit. Client-side formatting means no round-trip latency while typing, no rate limits, no file-size caps set by a service tier. A large saved page with thousands of nodes formats in the same session without hitting a quota.",
            "If you need formatter features beyond whitespace — Prettier-style wrapping, attribute sorting, configurable indent units — the honest path is running a proper formatter in your own project's toolchain. For the paste-and-read workflow, this tool's narrow scope is the point: one job, done predictably, with your markup never leaving the machine.",
          ],
        },
      ],
    },
    zh: {
      name: "HTML 格式化",
      tagline: "把压缩或挤成一行的 HTML 变成缩进规范的标记——简单可靠的代码美化,适合邮件模板和网页另存,纯本地处理。",
      intro: [
        "粘贴挤在一起的 HTML,立即得到缩进一致、可读性好的结果。img、br 等空元素不会破坏缩进,li、p 等常见可自动闭合的标签也能正确处理,pre、textarea、script、style 的内容原样保留。",
        "刻意保持简单:不重排、不改写属性、不出意外——只添加空白和换行,让结构一目了然。",
      ],
      steps: [
        "把 HTML 粘贴到输入框。",
        "边输入边实时显示缩进结果。",
        "复制格式化后的标记,或清空输入格式化下一段。",
      ],
      faqs: [
        {
          q: "格式化会改变 HTML 的渲染效果吗?",
          a: "不会——只在标签之间插入空白和换行。pre、textarea、script、style 的内容原样保留,因为这些地方空白是有意义的。",
        },
        {
          q: "li、p 这类未闭合标签怎么处理?",
          a: "格式化器了解常见的可自动闭合元素:新的 li 会闭合上一个 li,遇到祖先的闭合标签会回退所有子级,列表和段落的缩进符合直觉。",
        },
        {
          q: "HTML 会被发送到服务器吗?",
          a: "绝不会。格式化器是本地 JavaScript 解析器,标记只留在你的浏览器里。",
        },
      ],
      deepDive: [
        {
          heading: "空白什么时候有意义:pre/textarea 的例外",
          paragraphs: [
            "约束一切 HTML 格式化器的规则是:空白并不总是免费的。块级元素之间,换行会被折叠成一个空格,浏览器几乎一律忽略——但不是所有地方。在 pre 和 textarea 内部,空白本身就是内容。在 script 和 style 内部,一个多余的换行可能改变含义(script 里的模板字符串、CSS 里的属性选择器都可能对格式敏感)。盲目缩进这些块的美化器不只是让代码变怪——它可能直接把代码弄坏。",
            "还有一类更隐蔽的情况:行内元素。段落里 <a>、<b>、<img> 标签之间的空白会渲染成可见的空格,在那里加换行会改变渲染结果——技术上只是外观,但肉眼可见。所以谨慎的格式化器会让行内内容保持在同一行,而不是把每个子节点都推到新行。各浏览器在这上面的差异不大,但确实存在。",
            "本格式化器把这些决策显式化:pre、textarea、script、style 的内容原样通过;标签被分类为块级、行内或空元素(img、br、hr、input 这类根本没有闭合标签、绝不能开启缩进层)。这套分类正是 HTML 规范自己的分类,分类错了,格式化器就成了标记捣毁机。",
          ],
        },
        {
          heading: "自动闭合标签:畸形的 HTML 怎么被体面地缩进",
          paragraphs: [
            "现实中的 HTML——邮件模板、从浏览器另存的页面、遗留 CMS 的输出——很少把每个标签都闭合。HTML 标准定义了一组可省略结束标签的元素:新的 li 隐式闭合上一个 li,p 会被它后面大多数块级元素闭合,祖先的闭合标签会隐式闭合它之后所有打开的后代。无视这些规则的格式化器会把所有内容嵌进第一个未闭合的标签里,缩进于是变成了谎言。",
            "这里的做法对齐浏览器解析器:维护一个打开元素栈,按标准的隐式闭合规则出栈,祖先的闭合标签把它之后打开的元素全部弹出。畸形输入会优雅降级——未闭合的标签照样缩进,错配的闭合标签不会让整次运行崩溃——但工具不会发明它看不见的结构,这正是它刻意不重排、不做空白之外的「修复」的原因。",
            "这种克制是一种立场。有些美化器会重排属性、转换自闭合语法、统一引号风格;对代码风格指南有用,但当你需要输出能对上 diff 或严格模板时就很危险。目标是读懂一封压缩的邮件模板或一个另存页面时,只动空白是最诚实的变换:你看到的就是你的结构,只是排布得能看清而已。",
          ],
        },
        {
          heading: "为什么格式化要在浏览器里完成",
          paragraphs: [
            "人们贴进格式化器的 HTML 往往是机密的:带客户令牌的交易邮件模板、含 API 地址的内部管理页、为研究而另存的竞品页面。把其中任何一份发到格式化服务,你的标记就上了第三方服务器,可能被记录或留存。本工具在本地用 JavaScript 完成词法分析和缩进——没有任何数据跨过网络,没有上传环节,离线也能用。",
            "还有可靠性收益。客户端格式化意味着输入时没有往返延迟、没有速率限制、没有按套餐设置的大小上限。一个几千节点的另存大页面,同样在一个会话里完成格式化,不会撞上配额。",
            "如果需要的远不止空白处理——Prettier 风格的折行、属性排序、可配置缩进——诚实的路径是在自己项目的工具链里跑正规格式化器。至于「贴进去看一眼」的工作流,本工具的窄范围恰恰是卖点:只做一件事、结果可预期、标记永远不离开这台机器。",
          ],
        },
      ],
    },
    ja: {
      name: "HTML フォーマッター",
      tagline:
        "圧縮された 1 行 HTML を整理されたインデント付きマークアップに。メール・テンプレート・保存ページ向けのシンプルで確実な整形ツールです。",
      intro: [
        "詰め込まれた HTML を貼り付けると、即座に読みやすく統一されたインデントのマークアップに戻ります。img・br などの void 要素でインデントが崩れず、li・p といった暗黙閉じ要素も適切に処理され、pre・textarea・script・style の中身はそのまま保持されます。",
        "あえてシンプルに:並べ替えも属性の書き換えもせず、空白と改行を加えて構造がひと目で分かるようにするだけです。",
      ],
      steps: [
        "HTML を入力欄に貼り付けます。",
        "入力すると同時にインデント結果が表示されます。",
        "整形後のマークアップをコピーするか、入力をクリアして次の断片へ。",
      ],
      faqs: [
        {
          q: "整形すると HTML の表示は変わりますか?",
          a: "変わりません。タグ間に空白と改行を追加するだけです。pre・textarea・script・style の中身は空白が意味を持つため、完全にそのまま保持されます。",
        },
        {
          q: "li や p のような閉じないタグはどう扱われますか?",
          a: "よくある暗黙閉じ要素を把握しています。新しい li は前の li を閉じ、祖先の閉じタグで開いた子をまとめて閉じるため、リストや段落は期待どおりにインデントされます。",
        },
        {
          q: "HTML はサーバーに送られますか?",
          a: "いいえ。フォーマッターはローカルの JavaScript トークナイザーで、マークアップはブラウザから出ません。",
        },
      ],
      deepDive: [
        {
          heading: "空白が意味を持つ場所:pre/textarea の例外",
          paragraphs: [
            "あらゆる HTML フォーマッターを支配する規則は、空白が常に無料ではないというものです。ブロック要素間の改行は一つのスペースに畳まれ、ブラウザはほぼどこでもそれを無視します——しかしすべての場所ではありません。pre と textarea の中では空白そのものが内容です。script と style の中では、余分な改行が意味を変え得ます(script のテンプレートリテラルや CSS の属性セレクターは整形に敏感なことがあります)。これらのブロックを盲目的にインデントする整形ツールは、見た目を変えるだけでなく壊すこともあります。",
            "もう一つ、より厄介なケースがインライン要素です。段落内の a、b、img タグ間の空白は見えるスペースとして描画されるため、そこに改行を足すと表示結果が変わります——技術的には見た目の話ですが、目に見えて変わります。だから慎重なフォーマッターは行内コンテンツを 1 行に保ち、すべての子を新しい行に押し出しません。ブラウザ間の差は小さいものの、確かに存在します。",
            "このフォーマッターはこれらの判断を明示します。pre・textarea・script・style の中身は手を加えず通過させ、タグはブロック・インライン・void(img、br、hr、input など、閉じタグが存在せずインデント階層を開けない要素)に分類されます。この分類は HTML 仕様そのもののもので、ここを誤るとフォーマッターはマークアップ破壊機になります。",
          ],
        },
        {
          heading: "暗黙閉じタグ:壊れた HTML をどうまっすぐインデントするか",
          paragraphs: [
            "現実の HTML——メールテンプレート、ブラウザから保存したページ、レガシー CMS の出力——は、すべてのタグを閉じているとは限りません。HTML 標準は終了タグを省略できる要素群を定めています。新しい li は前の li を暗黙に閉じ、p はその後に来る多くのブロック要素で閉じられ、祖先の閉じタグはそれ以降に開いた子孫をすべて暗黙に閉じます。この規則を無視するフォーマッターはすべてを最初の未閉じタグの中にネストし、インデントは嘘になります。",
            "ここでの実装はブラウザのパーサーに寄せています。開いている要素のスタックを保持し、標準の暗黙終了規則に従って閉じ、祖先の閉じタグがそれ以降に開いた要素をすべてポップします。不正な入力は穏やかに劣化します。未閉じタグもインデントされ、対応の取れない閉じタグで実行全体が壊れることはありません。ただし見えない構造を invention はしません。空白以外の「修正」をしないのは意図的です。",
            "この抑制は設計方針です。属性を並べ替えたり、自己閉じ構文を変換したり、引用符を正規化したりする整形ツールもあります。スタイルガイドには有用ですが、diff や厳密なテンプレートと一致させる必要があるときには危険です。圧縮されたメールテンプレートや保存ページを読むことが目的なら、空白だけの変換が最も誠実です。見えるものはまさにあなたの構造で、視認できるよう並べただけのものです。",
          ],
        },
        {
          heading: "整形をブラウザで行う理由",
          paragraphs: [
            "フォーマッターに貼られる HTML は往々にして機密です。顧客トークンを含む取引メールのテンプレート、API の URL を持つ社内管理ページ、研究のために保存した競合ページ。これを整形サービスに送ると、マークアップは第三者のサーバーに乗り、ログに残ったり保持されたりします。このツールは JavaScript でローカルにトークン化とインデントを行い、ネットワークを跨ぐデータはなく、アップロード工程もなく、オフラインでも動作します。",
            "信頼性の面でも利点があります。クライアント側処理なら入力中の往復遅延がなく、レート制限も、サービスプランごとのサイズ上限もありません。数千ノードの保存ページでも、同じセッションでクォータに当たらず整形できます。",
            "空白以外が要るなら——Prettier 流の折り返し、属性ソート、設定可能なインデント——誠実な道は自分のプロジェクトのツールチェーンで正規のフォーマッターを動かすことです。「貼って読む」ワークフローには、このツールの狭い守備範囲こそが価値です。一つの仕事を予測可能にやり、マークアップは端末の外に出ません。",
          ],
        },
      ],
    },
    es: {
      name: "Formateador HTML",
      tagline:
        "Convierte HTML minificado o en una línea en marcado limpio e indentado: embellecedor simple y fiable para emails, plantillas y páginas guardadas.",
      intro: [
        "Pega HTML amontonado y recupera al instante un marcado legible y con indentación consistente. Los elementos vacíos como img y br no rompen la indentación, las etiquetas con cierre automático como li y p se tratan con sensatez, y el contenido de pre, textarea, script y style se conserva intacto.",
        "Un formateador deliberadamente simple: sin reordenar, sin reescribir atributos, sin sorpresas — solo espacios y saltos de línea para que la estructura se entienda de un vistazo.",
      ],
      steps: [
        "Pega tu HTML en el cuadro de entrada.",
        "El resultado indentado aparece en vivo mientras escribes.",
        "Copia el marcado formateado o borra la entrada para dar formato a otro fragmento.",
      ],
      faqs: [
        {
          q: "¿El formateo cambia cómo se renderiza mi HTML?",
          a: "No: solo inserta espacios y saltos entre etiquetas. El contenido de pre, textarea, script y style se conserva exactamente, porque allí el espacio en blanco importa.",
        },
        {
          q: "¿Cómo maneja etiquetas sin cerrar como li o p?",
          a: "Conoce los elementos de cierre automático comunes: un li nuevo cierra al anterior, y la etiqueta de cierre de un antepasado cierra todos los hijos abiertos, así que listas y párrafos se indentan como esperas.",
        },
        {
          q: "¿El HTML se envía a un servidor?",
          a: "Nunca. El formateador es un tokenizador JavaScript local: tu marcado se queda en tu navegador.",
        },
      ],
      deepDive: [
        {
          heading: "Dónde importa el espacio en blanco: la excepción pre/textarea",
          paragraphs: [
            "La regla que gobierna cualquier formateador de HTML es que el espacio en blanco no siempre es gratis. Entre elementos de bloque, un salto de línea se colapsa a un espacio y el navegador lo ignora casi en todas partes — pero no en todas. Dentro de pre y textarea, el espacio es el contenido mismo. Dentro de script y style, un salto de línea sobrante puede cambiar el significado (un template literal en script, o un selector de atributo en CSS, pueden ser sensibles al formato). Un embellecedor que indenta estos bloques a ciegas no solo deja el código raro — puede romperlo.",
            "Hay un segundo caso más sutil: los elementos en línea. El espacio entre etiquetas a, b o img dentro de un párrafo se renderiza como un espacio visible. Añadir saltos de línea ahí cambia la salida de formas técnicamente cosméticas pero visiblemente distintas. Por eso un formateador cuidadoso mantiene el contenido en línea en una sola línea en lugar de empujar cada hijo a su propia fila. Las diferencias entre navegadores aquí son pequeñas pero reales.",
            "El formateador hace explícitas estas decisiones: el contenido de pre, textarea, script y style pasa intacto, y las etiquetas se clasifican como bloque, en línea o void (img, br, hr, input y compañía, que no tienen etiqueta de cierre y no deben abrir un nivel de indentación). Esa clasificación es la misma que usa la especificación HTML, y equivocarla es lo que separa un formateador de un destrozador de marcado.",
          ],
        },
        {
          heading: "Etiquetas de cierre automático: cómo se indenta HTML malformado",
          paragraphs: [
            "El HTML real — plantillas de email, páginas guardadas del navegador, salida de CMS antiguos — rara vez cierra todas las etiquetas. El estándar HTML define un conjunto de elementos con etiqueta de cierre opcional: un li nuevo cierra implícitamente el li anterior, un p es cerrado por la mayoría de elementos de bloque que siguen, y la etiqueta de cierre de un antepasado cierra implícitamente todo descendiente abierto. Un formateador que ignora estas reglas anida todo dentro de la primera etiqueta sin cerrar, y la indentación se convierte en mentira.",
            "El enfoque práctico aquí refleja un parser de navegador: mantener una pila de elementos abiertos, cerrarlos según las reglas de cierre implícito del estándar, y dejar que la etiqueta de cierre de un antepasado saque todos los elementos abiertos después de él. La entrada malformada degrada con elegancia — las etiquetas sin cerrar se indentan igual, las etiquetas de cierre sin pareja no revientan la ejecución — pero la herramienta no inventa estructura que no puede ver, y por eso deliberadamente no reordena ni \"corrige\" tu marcado más allá del espacio en blanco.",
            "Esa contención es una postura de diseño. Existen embellecedores que reordenan atributos, convierten la sintaxis de autocierre o normalizan las comillas; útiles para guías de estilo, peligrosos cuando necesitas que la salida coincida con un diff o una plantilla estricta. Cuando el objetivo es leer una plantilla de email minificada o una página guardada, la transformación de solo-espacios es la honesta: lo que ves es exactamente tu estructura, simplemente desplegada para ser visible.",
          ],
        },
        {
          heading: "Por qué el formateo corre en tu navegador",
          paragraphs: [
            "El HTML que la gente pega en un formateador suele ser confidencial: plantillas de email transaccional con tokens de cliente, páginas de administración internas con URLs de API, la página de un competidor guardada para estudiarla. Enviar cualquiera de esto a un servicio de formateo pone tu marcado en un servidor de terceros donde puede quedar registrado o retenido. Esta herramienta tokeniza e indenta localmente en JavaScript — nada cruza la red, no hay paso de subida, y la página funciona incluso sin conexión.",
            "También hay un beneficio de fiabilidad. El formateo en cliente significa latencia cero mientras escribes, sin límites de tasa, sin topes de tamaño fijados por un plan de servicio. Una página guardada grande con miles de nodos se formatea en la misma sesión sin chocar con ninguna cuota.",
            "Si necesitas funciones más allá del espacio en blanco — envoltura estilo Prettier, ordenación de atributos, unidades de indentación configurables — el camino honesto es ejecutar un formateador completo en la toolchain de tu propio proyecto. Para el flujo de pegar y leer, el alcance estrecho de esta herramienta es el punto: un solo trabajo, hecho de forma predecible, con tu marcado sin salir de la máquina.",
          ],
        },
      ],
    },
    pt: {
      name: "Formatador HTML",
      tagline:
        "Transforme HTML minificado ou em uma linha em marcação limpa e indentada — embelezador simples e confiável para e-mails, templates e páginas salvas.",
      intro: [
        "Cole HTML amontoado e receba instantaneamente uma marcação legível e com indentação consistente. Elementos vazios como img e br não quebram a indentação, tags com fechamento automático como li e p são tratadas com bom senso, e o conteúdo de pre, textarea, script e style é preservado intacto.",
        "Um formatador propositalmente simples: sem reordenar, sem reescrever atributos, sem surpresas — apenas espaços e quebras de linha para que a estrutura fique óbvia de relance.",
      ],
      steps: [
        "Cole seu HTML na caixa de entrada.",
        "O resultado indentado aparece ao vivo enquanto você digita.",
        "Copie a marcação formatada ou limpe a entrada para formatar outro trecho.",
      ],
      faqs: [
        {
          q: "A formatação muda como meu HTML é renderizado?",
          a: "Não — ela só insere espaços e quebras entre as tags. O conteúdo de pre, textarea, script e style é preservado exatamente, pois ali o espaço em branco importa.",
        },
        {
          q: "Como lida com tags sem fechar, como li ou p?",
          a: "Ela conhece os elementos de fechamento automático comuns: um novo li fecha o anterior, e a tag de fechamento de um ancestral fecha todos os filhos abertos, então listas e parágrafos indentam como você espera.",
        },
        {
          q: "O HTML é enviado a um servidor?",
          a: "Nunca. O formatador é um tokenizador JavaScript local — sua marcação fica no seu navegador.",
        },
      ],
      deepDive: [
        {
          heading: "Onde o espaço em branco importa: a exceção pre/textarea",
          paragraphs: [
            "A regra que governa qualquer formatador de HTML é que espaço em branco nem sempre é grátis. Entre elementos de bloco, uma quebra de linha colapsa num único espaço e o navegador a ignora em quase todo lugar — mas não em todos. Dentro de pre e textarea, o espaço em branco é o próprio conteúdo. Dentro de script e style, uma quebra de linha sobrando pode mudar o significado (um template literal em script, ou um seletor de atributo em CSS, podem ser sensíveis à formatação). Um embelezador que indenta esses blocos cegamente não deixa só o código estranho — pode quebrá-lo.",
            "Há um segundo caso mais sutil: elementos inline. O espaço entre tags a, b ou img dentro de um parágrafo renderiza como um espaço visível. Acrescentar quebras de linha ali muda a saída de formas tecnicamente cosméticas mas visivelmente distintas. Por isso um formatador cuidadoso mantém o conteúdo inline numa linha só em vez de empurrar cada filho para a própria linha. As diferenças entre navegadores aqui são pequenas mas reais.",
            "O formatador explicita essas decisões: o conteúdo de pre, textarea, script e style passa intacto, e as tags são classificadas como bloco, inline ou void (img, br, hr, input e afins, que não têm tag de fechamento e não devem abrir um nível de indentação). Essa classificação é a mesma da especificação HTML, e errá-la é o que separa um formatador de um triturador de marcação.",
          ],
        },
        {
          heading: "Tags de fechamento automático: como indentar HTML malformado",
          paragraphs: [
            "HTML do mundo real — templates de e-mail, páginas salvas do navegador, saída de CMS antigos — raramente fecha todas as tags. O padrão HTML define um conjunto de elementos com tag de fechamento opcional: um novo li fecha implicitamente o li anterior, um p é fechado pela maioria dos elementos de bloco que vêm depois, e a tag de fechamento de um ancestral fecha implicitamente todo descendente aberto. Um formatador que ignora essas regras anida tudo dentro da primeira tag aberta, e a indentação vira mentira.",
            "A abordagem prática aqui espelha um parser de navegador: manter uma pilha de elementos abertos, fechá-los segundo as regras de fechamento implícito do padrão, e deixar que a tag de fechamento de um ancestral retire todos os elementos abertos depois dela. Entrada malformada degrada com elegância — tags sem fechar ainda indentam, tags de fechamento sem par não derrubam a execução — mas a ferramenta não inventa estrutura que não consegue ver, e por isso deliberadamente não reordena nem \"corrige\" sua marcação além do espaço em branco.",
            "Essa contenção é uma posição de design. Existem embelezadores que reordenam atributos, convertem sintaxe auto-fechada ou normalizam aspas; úteis para guias de estilo, perigosos quando você precisa que a saída bata com um diff ou um template estrito. Quando o objetivo é ler um template de e-mail minificado ou uma página salva, a transformação de só-espaços é a honesta: o que você vê é exatamente sua estrutura, apenas disposta para ficar visível.",
          ],
        },
        {
          heading: "Por que a formatação roda no seu navegador",
          paragraphs: [
            "O HTML que as pessoas colam num formatador costuma ser confidencial: templates de e-mail transacional com tokens de cliente, páginas de administração interna com URLs de API, a página de um concorrente salva para estudo. Enviar qualquer um destes a um serviço de formatação põe sua marcação num servidor de terceiros onde pode ser registrada ou retida. Esta ferramenta tokeniza e indenta localmente em JavaScript — nada cruza a rede, não há etapa de upload, e a página funciona até offline.",
            "Há também um benefício de confiabilidade. Formatação no cliente significa zero latência de ida e volta enquanto digita, sem limites de taxa, sem tetos de tamanho fixados por um plano de serviço. Uma página salva grande com milhares de nós formata na mesma sessão sem esbarrar em cota.",
            "Se você precisa de recursos além do espaço em branco — quebra de linha estilo Prettier, ordenação de atributos, unidades de indentação configuráveis — o caminho honesto é rodar um formatador completo na toolchain do seu próprio projeto. Para o fluxo de colar e ler, o escopo estreito desta ferramenta é o ponto: um único trabalho, feito de forma previsível, com sua marcação nunca saindo da máquina.",
          ],
        },
      ],
    },
  },
});
