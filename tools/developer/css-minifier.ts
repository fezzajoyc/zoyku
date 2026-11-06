import { DevCodeEngine } from "../_engines/dev-engine-code";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "css-minifier",
  category: "developer",
  icon: "crop",
  engine: { component: DevCodeEngine, props: { mode: "css-minify", showSize: true } },
  related: ["html-minifier", "javascript-minifier", "json-minifier", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "url-encoder", "url-decoder"],
  copy: {
    en: {
      name: "CSS Minifier",
      tagline:
        "Minify CSS online: remove comments and needless spaces to cut stylesheet size for faster loads. Instant, private, and safe for your rules.",
      intro: [
        "Paste any stylesheet and get a compact one-line version in real time: comments are stripped, redundant whitespace collapses, and separators tighten up — while the contents of strings, url() values and your selector/property semantics remain exactly as written.",
        "Use it to prepare critical CSS, slim down a theme before committing, or check how many bytes a cleanup would actually save. The live size readout shows input size, output size and the percentage saved.",
      ],
      steps: [
        "Paste your CSS into the input box.",
        "The minified output appears instantly, with the size saved shown below.",
        "Copy the compact stylesheet or clear the input to minify another file.",
      ],
      faqs: [
        {
          q: "Will minification change how my CSS behaves?",
          a: "No. Only comments and whitespace are removed — and even those carefully: strings and url() contents are preserved byte-for-byte, so content values and data URIs stay intact.",
        },
        {
          q: "Does it optimize colors, merge rules or autoprefix?",
          a: "No — this is a safe, syntax-level minifier. Structural optimization (merging duplicate rules, shortening colors) needs a full postprocessor; this tool guarantees zero semantic change.",
        },
        {
          q: "Where does my CSS go?",
          a: "Nowhere. Minification runs locally in your browser; nothing is uploaded or stored.",
        },
      ],
      deepDive: [
        {
          heading: "What a safe minifier removes — and what it must not",
          paragraphs: [
            "A stylesheet minifier walks a narrow line. The parts it can safely remove: comments, whitespace between declarations, the last semicolon before a closing brace, and spaces around separators like : and ,. The parts that look removable but are not: any space inside a string (content: “a b” means something different from “ab”), anything inside url(), and — the subtle one — whitespace inside selectors. .a .b (descendant combinator) and .a.b (same element with two classes) differ by exactly one space, so stripping the wrong space changes which elements get styled.",
            "This is why a conservative minifier is mostly a whitespace engine, not a rewriter. Aggressive postprocessors can go further — merge duplicate rules, convert #ffffff to #fff, drop overridden declarations — but each of those steps can change behavior in edge cases (cascade order, specificity interactions, later browser support for color syntaxes). A tool that guarantees zero semantic change trades a few bytes for the certainty that the minified file renders identically; for production stylesheets, that trade is usually the right one.",
            "Comments deserve one special note: legal notices, license headers and browser-hack annotations sometimes live in comments. If a stylesheet carries a license header that must survive distribution, re-add it after minification — or keep the unminified source as the canonical copy, which is good practice regardless.",
          ],
        },
        {
          heading: "Minification vs. gzip: they multiply, they do not compete",
          paragraphs: [
            "A common misconception is that enabling server compression makes minification pointless. The two attack different redundancy. Minification removes tokens the language does not need; gzip then compresses the surviving bytes with a dictionary. Because whitespace and long repeated property names are exactly the kind of predictable content gzip eats well, minified+gzipped is consistently smaller than unminified+gzipped — the savings compound rather than overlap.",
            "The size readout here reports the raw byte difference, which is the honest upper bound of the win. Real transfer size also depends on your server's compression level and whether the stylesheet is cached. Typical hand-written CSS loses 15-30% from whitespace-and-comments stripping alone; generated or heavily formatted CSS can lose more, vendor-bloated files sometimes less.",
            "One caveat minifiers cannot fix: render-blocking. A smaller stylesheet downloads faster but still blocks first paint while parsed. If the goal is faster first render, minification is step one; the bigger levers are splitting critical CSS, deferring non-critical styles and removing dead rules entirely — none of which a safe minifier will do for you.",
          ],
        },
        {
          heading: "Working locally is a feature, not a fallback",
          paragraphs: [
            "Stylesheets are less obviously sensitive than a database dump, but they leak more than people expect: pre-release class names and feature flags, internal design-token values, commented-out experiments with product names, absolute URLs from staging environments. Pasting a not-yet-shipped theme into a web service that stores inputs means that material lands on someone else's infrastructure before the code even has a home in git.",
            "This minifier runs entirely in your browser with JavaScript — the input never leaves the page, nothing is stored or logged, and the tool keeps working offline once loaded. There is also a practical angle: no file-size ceiling imposed by an upload limit, and no waiting on a network round-trip. The output updates as fast as you can paste, which makes the size readout a usable feedback loop while you decide how much cleanup is worth doing.",
          ],
        },
      ],
    },
    zh: {
      name: "CSS 压缩",
      tagline: "在线压缩 CSS:去掉注释和多余空白,减小样式表体积、加快页面加载。即时、私密、规则零改动,数据不上传。",
      intro: [
        "粘贴任意样式表,实时得到紧凑的单行版本:注释被移除,冗余空白被折叠,分隔符被收紧——而字符串、url() 的内容以及选择器/属性的语义与原文完全一致。",
        "适合准备关键 CSS、提交前给主题瘦身,或者看看一次清理到底能省多少字节。实时大小读数显示输入大小、输出大小和节省的百分比。",
      ],
      steps: [
        "把 CSS 粘贴到输入框。",
        "压缩结果即时出现,下方显示节省的比例。",
        "复制紧凑样式表,或清空输入压缩下一个文件。",
      ],
      faqs: [
        {
          q: "压缩会改变 CSS 的表现吗?",
          a: "不会。只移除注释和空白——而且处理得很小心:字符串和 url() 的内容逐字节保留,content 值和 data URI 完整无损。",
        },
        {
          q: "会做颜色优化、规则合并或自动加前缀吗?",
          a: "不会——这是语法层面的安全压缩器。结构性优化(合并重复规则、缩短颜色值)需要完整的后处理器;本工具保证零语义变化。",
        },
        {
          q: "我的 CSS 会去哪里?",
          a: "哪儿也不去。压缩在浏览器本地运行,不上传、不存储。",
        },
      ],
      deepDive: [
        {
          heading: "安全的压缩器删什么、绝不删什么",
          paragraphs: [
            "样式表压缩器走在一条窄线上。可以安全移除的部分:注释、声明之间的空白、右花括号前的最后一个分号、: 和 , 等分隔符周围的空间。看起来可删其实不能删的部分:字符串里的任何空格(content: “a b” 和 “ab” 含义不同)、url() 里的任何内容,以及最微妙的一处——选择器内部的空白。.a .b(后代组合器)和 .a.b(同一元素带两个类)恰好只差一个空格,删错空格就会改变哪些元素被选中。",
            "所以保守的压缩器本质上是一台空白处理器,而不是重写器。激进的后处理器可以走得更远——合并重复规则、把 #ffffff 缩成 #fff、删掉被覆盖的声明——但每一步都可能在边界情况下改变行为(级联顺序、优先级的相互作用、浏览器对新颜色语法的支持)。保证零语义变化的工具,用几个字节换来「压缩后的文件渲染结果完全一致」的确定性;对生产环境的样式表来说,这笔交易通常是对的。",
            "注释值得单独提醒:法律声明、许可证头、浏览器兼容 hack 的标注有时就写在注释里。如果样式表带有必须随分发的许可证头,压缩后要重新加回去——或者把未压缩的源文件留作正本,无论怎样这都是好习惯。",
          ],
        },
        {
          heading: "压缩与 gzip:相乘的关系,不是竞争",
          paragraphs: [
            "一个常见误解是开了服务器压缩就没必要再压缩了。两者针对的冗余不同:压缩移除语言不需要的 token,gzip 再用字典压缩剩下的字节。空白和长而重复的属性名恰恰是 gzip 最擅长的可预测内容,所以「压缩后+gzip」一致地小于「不压缩+gzip」——收益是叠加的,不是重叠的。",
            "这里的体积读数显示的是原始字节差,这是收益的诚实上限。真实传输体积还取决于服务器的压缩级别和样式表是否被缓存。手写 CSS 通常仅靠去空白和注释就能瘦 15-30%;生成或格式化过度的 CSS 能省更多,被 vendor 文件撑大的有时更少。",
            "还有一件事压缩器管不了:渲染阻塞。更小的样式表下载更快,但解析期间仍会阻塞首屏绘制。目标是更快的首屏渲染时,压缩只是第一步;更大的杠杆是拆分关键 CSS、延后非关键样式、彻底删掉死规则——这些都不会由安全的压缩器替你完成。",
          ],
        },
        {
          heading: "本地运行是功能,不是退路",
          paragraphs: [
            "样式表看起来不如数据库转储敏感,但它泄漏的东西比想象的多:未发布的类名和功能开关、内部设计 token 的值、带产品名的注释掉的实验、指向预发环境的绝对 URL。把还没上线的主题贴进一个会存储输入的网络服务,意味着这些材料在代码进 git 之前就落到了别人的基础设施上。",
            "这个压缩器完全在浏览器里用 JavaScript 运行——输入不离开页面,不存储、不记录,页面加载后离线也能用。实用层面还有一点:没有上传限制强加的文件大小上限,也没有网络往返的等待。输出随粘贴即时更新,体积读数因此成了可用的反馈回路,你可以边看省了多少边决定清理到什么程度。",
          ],
        },
      ],
    },
    ja: {
      name: "CSS ミニファイアー",
      tagline:
        "CSS をオンラインで圧縮:コメントと余分な空白を取り除き、スタイルシートを軽量化して表示を高速化。プライベートで安全、アップロードは一切ありません。",
      intro: [
        "スタイルシートを貼り付けると、リアルタイムでコンパクトな 1 行版に。コメントの除去・冗長な空白の折り畳み・区切りの整形を行いますが、文字列や url() の内容、セレクタとプロパティの意味は書いたまま保たれます。",
        "クリティカル CSS の準備、コミット前のテーマ軽量化、クリーンアップで実際に何バイト節約できるかの確認に使えます。入力サイズ・出力サイズ・節約率を常時表示します。",
      ],
      steps: [
        "CSS を入力欄に貼り付けます。",
        "圧縮結果が即座に表示され、節約率も下部に出ます。",
        "圧縮後のスタイルシートをコピーするか、入力をクリアして次のファイルへ。",
      ],
      faqs: [
        {
          q: "圧縮すると CSS の挙動は変わりますか?",
          a: "変わりません。コメントと空白を取り除くだけです。しかも慎重に:文字列と url() の内容はバイト単位で保持され、content の値や data URI もそのままです。",
        },
        {
          q: "色の最適化やルール統合、自動プレフィックスもしますか?",
          a: "しません。構文レベルの安全な圧縮に特化しています。構造の最適化(重複ルールの統合、色の短縮)には本格的なポストプロセッサが必要です。このツールは意味の変化ゼロを保証します。",
        },
        {
          q: "CSS はどこかへ送られますか?",
          a: "どこへも行きません。圧縮はブラウザ内でローカルに実行され、アップロードも保存もありません。",
        },
      ],
      deepDive: [
        {
          heading: "安全なミニファイアーが削るもの、削ってはいけないもの",
          paragraphs: [
            "スタイルシートのミニファイアーは狭い線の上を歩きます。安全に削れるのは、コメント、宣言間の空白、閉じ波括弧の直前のセミコロン、: や , の前後の空白です。削れそうで削れないのは、文字列内のあらゆる空白(content: “a b” は “ab” と意味が違います)、url() の中身、そして最も微妙な——セレクタ内部の空白です。.a .b(子孫結合子)と .a.b(同じ要素に 2 クラス)はちょうど 1 空白の違いで、間違った空白を削るとスタイルの当たる要素が変わります。",
            "だから保守的なミニファイアーの本質は空白エンジンであって、リライターではありません。積極的なポストプロセッサならさらに進めます——重複ルールの統合、#ffffff の #fff 化、上書きされた宣言の削除——しかし一歩ごとにエッジケースで挙動が変わる危険(カスケード順、詳細度の相互作用、色構文への対応差)があります。意味変化ゼロを保証するツールは数バイトと引き換えに「圧縮後も同一に描画される」確実性をくれます。本番のスタイルシートでは、通常この取引が正解です。",
            "コメントには特別な注意が一つ。法的事項、ライセンスヘッダー、ブラウザハックの注釈がコメントに書かれていることがあります。配布時に残すべきライセンスヘッダーがあるなら、圧縮後に再追加するか、非圧縮ソースを正本として残してください。どちらにせよ良い習慣です。",
          ],
        },
        {
          heading: "ミニファイと gzip:競合ではなく掛け算",
          paragraphs: [
            "サーバー圧縮を有効にすればミニファイは不要、というのはよくある誤解です。両者は別の冗長性を狙います。ミニファイは言語が不要なトークンを削り、gzip は残ったバイトを辞書で圧縮する。空白や長く繰り返されるプロパティ名はまさに gzip が得意な予測可能な内容なので、「ミニファイ+gzip」は「非圧縮+gzip」より常に小さくなります。効果は重複ではなく累積します。",
            "ここのサイズ表示は生のバイト差で、これは利益の正直な上限です。実際の転送量はサーバーの圧縮レベルやキャッシュにも依存します。手書きの CSS は空白とコメントの除去だけで 15〜30% 減ることが多く、生成された CSS はさらに、vendor で肥大化したファイルはそれより少ないこともあります。",
            "ミニファイアーが解決できない注意点:レンダリングブロックです。小さくなったスタイルシートは速くダウンロードできますが、解析中は最初の描画をまだ塞ぎます。初回描画を速めるのが目的なら、ミニファイは第一歩で、より大きなレバーはクリティカル CSS の分割、非重要スタイルの後回し、死んでいるルールの完全削除です。安全なミニファイアーがこれを代行することはありません。",
          ],
        },
        {
          heading: "ローカル実行は機能であって、代替策ではない",
          paragraphs: [
            "スタイルシートはデータベースのダンプほど敏感に見えませんが、思った以上に漏れます。リリース前のクラス名やフィーチャーフラグ、内部デザイントークンの値、製品名を含むコメントアウトされた実験、ステージング環境の絶対 URL。未公開のテーマを入力を保存するウェブサービスに貼ることは、そのコードが git に入る前に他人のインフラに資料が着地することを意味します。",
            "このミニファイアーは完全にブラウザ内の JavaScript で動きます。入力はページの外に出ず、保存も記録もなく、読み込み後はオフラインでも使えます。実用面では、アップロード上限によるサイズ制限がなく、ネットワーク往復の待ちもありません。出力は貼り付けたそばから更新されるので、サイズ表示がフィードバックループとして機能し、どれだけ掃除する価値があるかを見ながら進められます。",
          ],
        },
      ],
    },
    es: {
      name: "Minificador CSS",
      tagline:
        "Minifica CSS en línea: elimina comentarios y espacios innecesarios para aligerar tus hojas de estilo y cargar más rápido. Instantáneo, privado y sin cambios en tus reglas.",
      intro: [
        "Pega cualquier hoja de estilos y obtén en tiempo real una versión compacta de una línea: se quitan los comentarios, el espacio redundante se colapsa y los separadores se ajustan — mientras las cadenas, los valores url() y la semántica de selectores y propiedades quedan tal cual.",
        "Úsalo para preparar CSS crítico, adelgazar un tema antes de hacer commit o comprobar cuántos bytes ahorraría una limpieza. El indicador muestra tamaño de entrada, de salida y el porcentaje ahorrado.",
      ],
      steps: [
        "Pega tu CSS en el cuadro de entrada.",
        "La salida minificada aparece al instante, con el ahorro indicado debajo.",
        "Copia la hoja compacta o borra la entrada para minificar otro archivo.",
      ],
      faqs: [
        {
          q: "¿La minificación cambia el comportamiento del CSS?",
          a: "No. Solo se eliminan comentarios y espacios — y con cuidado: las cadenas y el contenido de url() se conservan byte a byte, así que los content y los data URI quedan intactos.",
        },
        {
          q: "¿Optimiza colores, fusiona reglas o autoprefija?",
          a: "No: es un minificador seguro a nivel sintáctico. La optimización estructural (fusionar reglas duplicadas, acortar colores) requiere un postprocesador completo; esta herramienta garantiza cero cambios semánticos.",
        },
        {
          q: "¿Adónde va mi CSS?",
          a: "A ninguna parte. La minificación corre localmente en tu navegador; nada se sube ni se almacena.",
        },
      ],
      deepDive: [
        {
          heading: "Lo que un minificador seguro elimina — y lo que no debe",
          paragraphs: [
            "Un minificador de hojas de estilo camina por una línea estrecha. Lo que puede eliminar con seguridad: comentarios, espacios entre declaraciones, el último punto y coma antes de una llave de cierre y los espacios alrededor de separadores como : y ,. Lo que parece eliminable y no lo es: cualquier espacio dentro de una cadena (content: “a b” significa algo distinto de “ab”), cualquier cosa dentro de url() y — el caso sutil — los espacios dentro de selectores. .a .b (combinador descendiente) y .a.b (un mismo elemento con dos clases) difieren en exactamente un espacio, así que quitar el espacio equivocado cambia qué elementos reciben estilos.",
            "Por eso un minificador conservador es sobre todo un motor de espacios, no un reescritor. Los posprocesadores agresivos pueden ir más lejos — fusionar reglas duplicadas, convertir #ffffff en #fff, descartar declaraciones anuladas — pero cada paso puede cambiar el comportamiento en casos límite (orden de cascada, interacciones de especificidad, soporte de navegadores para sintaxis de color nuevas). Una herramienta que garantiza cero cambios semánticos cambia unos bytes por la certeza de que el archivo minificado se renderiza igual; para hojas de estilo en producción, ese intercambio suele ser el correcto.",
            "Una nota especial para los comentarios: avisos legales, cabeceras de licencia y anotaciones de hacks de navegador a veces viven en comentarios. Si una hoja lleva una cabecera de licencia que debe sobrevivir a la distribución, vuélvela a añadir tras minificar — o conserva el fuente sin minificar como copia canónica, lo cual es buena práctica de todos modos.",
          ],
        },
        {
          heading: "Minificar contra gzip: se multiplican, no compiten",
          paragraphs: [
            "Un error común es pensar que activar la compresión del servidor hace innecesaria la minificación. Atacan redundancias distintas. Minificar elimina tokens que el lenguaje no necesita; gzip comprime después los bytes supervivientes con un diccionario. Como los espacios y los nombres de propiedad largos y repetidos son justo el tipo de contenido predecible que gzip digiere bien, minificado+gzip es consistentemente más pequeño que sin minificar+gzip — los ahorros se componen en lugar de solaparse.",
            "El indicador de tamaño aquí muestra la diferencia bruta de bytes, que es el límite superior honesto de la ganancia. El tamaño de transferencia real depende del nivel de compresión del servidor y de si la hoja se cachea. Un CSS escrito a mano suele perder un 15-30 % solo quitando espacios y comentarios; el CSS generado puede perder más, y los archivos hinchados de vendor a veces menos.",
            "Una advertencia que ningún minificador arregla: el bloqueo del renderizado. Una hoja más pequeña se descarga más rápido pero sigue bloqueando la primera pintura mientras se parsea. Si el objetivo es un primer render más rápido, minificar es el paso uno; las palancas mayores son dividir el CSS crítico, aplazar los estilos no críticos y eliminar del todo las reglas muertas — nada de lo cual hará un minificador seguro por ti.",
          ],
        },
        {
          heading: "Trabajar en local es una función, no un parche",
          paragraphs: [
            "Las hojas de estilo parecen menos sensibles que un volcado de base de datos, pero filtran más de lo esperado: nombres de clase y feature flags pre-lanzamiento, valores internos de design tokens, experimentos comentados con nombres de producto, URLs absolutas de entornos de staging. Pegar un tema aún no publicado en un servicio web que guarda las entradas significa que ese material aterriza en la infraestructura de otra persona antes de que el código tenga sitio en git.",
            "Este minificador corre por completo en tu navegador con JavaScript — la entrada nunca sale de la página, nada se almacena ni se registra, y la herramienta sigue funcionando sin conexión una vez cargada. También hay un ángulo práctico: sin techo de tamaño impuesto por un límite de subida y sin esperas de ida y vuelta por la red. La salida se actualiza a la velocidad del pegado, lo que convierte el indicador de tamaño en un bucle de retroalimentación útil mientras decides cuánta limpieza merece la pena.",
          ],
        },
      ],
    },
    pt: {
      name: "Minificador CSS",
      tagline:
        "Minifique CSS on-line: remova comentários e espaços desnecessários para deixar as folhas de estilo mais leves e o carregamento mais rápido. Nada é enviado.",
      intro: [
        "Cole qualquer folha de estilos e receba em tempo real uma versão compacta em uma linha: comentários saem, espaços redundantes colapsam e separadores encolhem — enquanto strings, valores de url() e a semântica de seletores e propriedades ficam exatamente como escritos.",
        "Use para preparar CSS crítico, enxugar um tema antes do commit ou ver quantos bytes uma limpeza realmente economizaria. O indicador mostra tamanho de entrada, de saída e a porcentagem economizada.",
      ],
      steps: [
        "Cole seu CSS na caixa de entrada.",
        "A saída minificada aparece na hora, com a economia indicada abaixo.",
        "Copie a folha compacta ou limpe a entrada para minificar outro arquivo.",
      ],
      faqs: [
        {
          q: "A minificação muda o comportamento do CSS?",
          a: "Não. Apenas comentários e espaços são removidos — e com cuidado: strings e o conteúdo de url() são preservados byte a byte, então content e data URIs ficam intactos.",
        },
        {
          q: "Ela otimiza cores, funde regras ou adiciona prefixos?",
          a: "Não — é um minificador seguro, a nível de sintaxe. Otimização estrutural (fundir regras duplicadas, encurtar cores) exige um pós-processador completo; esta ferramenta garante zero mudança semântica.",
        },
        {
          q: "Para onde vai meu CSS?",
          a: "Para lugar nenhum. A minificação roda localmente no seu navegador; nada é enviado ou armazenado.",
        },
      ],
      deepDive: [
        {
          heading: "O que um minificador seguro remove — e o que não deve",
          paragraphs: [
            "Um minificador de folhas de estilo anda numa linha estreita. O que pode remover com segurança: comentários, espaços entre declarações, o último ponto e vírgula antes de uma chave de fechamento e os espaços em torno de separadores como : e ,. O que parece removível e não é: qualquer espaço dentro de uma string (content: “a b” significa algo diferente de “ab”), qualquer coisa dentro de url() e — o caso sutil — os espaços dentro de seletores. .a .b (combinador descendente) e .a.b (um mesmo elemento com duas classes) diferem em exatamente um espaço, então tirar o espaço errado muda quais elementos recebem estilos.",
            "É por isso que um minificador conservador é essencialmente um motor de espaços, não um reescritor. Pós-processadores agressivos podem ir além — fundir regras duplicadas, converter #ffffff em #fff, descartar declarações anuladas — mas cada passo pode mudar o comportamento em casos de borda (ordem da cascata, interações de especificidade, suporte de navegadores a sintaxes de cor novas). Uma ferramenta que garante zero mudança semântica troca alguns bytes pela certeza de que o arquivo minificado renderiza idêntico; para folhas de estilo em produção, essa troca costuma ser a certa.",
            "Uma nota especial para os comentários: avisos legais, cabeçalhos de licença e anotações de hacks de navegador às vezes vivem em comentários. Se uma folha carrega um cabeçalho de licença que precisa sobreviver à distribuição, readicione-o depois de minificar — ou mantenha o código-fonte não minificado como cópia canônica, o que é boa prática de qualquer forma.",
          ],
        },
        {
          heading: "Minificação versus gzip: multiplicam, não competem",
          paragraphs: [
            "Um equívoco comum é achar que ativar a compressão do servidor torna a minificação desnecessária. As duas atacam redundâncias diferentes. Minificar remove tokens que a linguagem não precisa; o gzip comprime depois os bytes sobreviventes com um dicionário. Como espaços e nomes de propriedade longos e repetidos são exatamente o tipo de conteúdo previsível que o gzip digere bem, minificado+gzip é consistentemente menor que não-minificado+gzip — as economias se compõem em vez de se sobrepor.",
            "O indicador de tamanho aqui mostra a diferença bruta de bytes, que é o limite superior honesto do ganho. O tamanho de transferência real depende do nível de compressão do servidor e de se a folha está em cache. CSS escrito à mão costuma perder 15-30% só removendo espaços e comentários; CSS gerado pode perder mais, e arquivos inchados de vendor às vezes menos.",
            "Uma ressalva que nenhum minificador conserta: o bloqueio de renderização. Uma folha menor baixa mais rápido mas ainda bloqueia a primeira pintura enquanto é parseada. Se o objetivo é uma primeira renderização mais rápida, minificar é o passo um; as alavancas maiores são dividir o CSS crítico, adiar os estilos não críticos e remover de vez as regras mortas — nada disso um minificador seguro fará por você.",
          ],
        },
        {
          heading: "Trabalhar em local é um recurso, não um fallback",
          paragraphs: [
            "Folhas de estilo parecem menos sensíveis que um dump de banco de dados, mas vazam mais do que se espera: nomes de classe e feature flags pré-lançamento, valores internos de design tokens, experimentos comentados com nomes de produto, URLs absolutas de ambientes de staging. Colar um tema ainda não lançado num serviço web que guarda as entradas significa que esse material pousa na infraestrutura de outra pessoa antes de o código ter lugar no git.",
            "Este minificador roda inteiramente no seu navegador com JavaScript — a entrada nunca sai da página, nada é armazenado ou registrado, e a ferramenta continua funcionando offline depois de carregada. Também há um ângulo prático: sem teto de tamanho imposto por limite de upload e sem espera de ida e volta pela rede. A saída atualiza na velocidade do colar, o que transforma o indicador de tamanho num ciclo de feedback útil enquanto você decide quanto vale a pena limpar.",
          ],
        },
      ],
    },
  },
});
