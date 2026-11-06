import { DevCodeEngine } from "../_engines/dev-engine-code";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "javascript-minifier",
  category: "developer",
  icon: "crop",
  engine: { component: DevCodeEngine, props: { mode: "js-minify", showSize: true } },
  related: ["css-minifier", "html-minifier", "json-minifier", "regex-tester", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "url-encoder"],
  copy: {
    en: {
      name: "JavaScript Minifier",
      tagline:
        "A conservative JavaScript minifier: strips comments and collapses blank lines, keeping line breaks — no risky rewrites, your code semantics stay untouched.",
      intro: [
        "This minifier does exactly two things: it removes // and /* */ comments (even inside gnarly files — strings, template literals including nested ${…} and regex literals are respected), and it collapses blank lines and indentation. Line breaks between statements are preserved, so automatic semicolon insertion keeps working exactly as before.",
        "It will never rename variables, inline code or merge statements — that is the job of a full build tool. What you get is a meaningfully smaller, safely minified file plus a live byte-savings readout, entirely in your browser.",
      ],
      steps: [
        "Paste your JavaScript into the input box.",
        "The minified output appears instantly, with input/output sizes and the percentage saved.",
        "Copy the compact script or clear the input to minify another file.",
      ],
      faqs: [
        {
          q: "Why does it keep line breaks instead of joining everything into one line?",
          a: "Deliberate choice. JavaScript relies on automatic semicolon insertion, and removing newlines can silently change what a program does. Keeping line breaks makes this minifier safe for code that never goes through a real bundler.",
        },
        {
          q: "How is this different from Terser or UglifyJS?",
          a: "Those parse and rewrite the AST: mangling names, removing dead code, inlining. Much smaller output, but a real build step. This tool only removes comments and blank lines — zero risk of behavior change, no build required.",
        },
        {
          q: "Is my code uploaded anywhere?",
          a: "No. Everything runs locally in your browser — your source never leaves the device.",
        },
      ],
      deepDive: [
        {
          heading: "Minify, gzip and what actually saves bytes",
          paragraphs: [
            "Minification and compression are different layers, and knowing which one does the work matters. Minification is a lossy textual rewrite: comments and whitespace removed, names shortened, statements merged. Gzip or Brotli is lossless transport compression applied afterwards. Whitespace compresses extremely well — gzip alone can shrink a verbose script by 70-80% — so a minifier's marginal savings are much smaller than its raw percentage suggests.",
            "The real reason to minify is not gzip redundancy but parsing and execution cost: every comment and formatting character a browser must parse is CPU time on the visitor's device, which matters on low-end phones. Also remember that removing comments has a hidden cost if you rely on inline annotations — some tools (source maps aside, certain bundlers and frameworks read directives like /*#__PURE__*/ from comments) need those markers to survive.",
            "This tool takes the conservative lane deliberately: it strips comments and collapses blank lines but keeps line breaks between statements. If you serve the output with gzip or Brotli enabled, you capture most of the available savings without a build step — and without any risk of the rewrites that mangle, inline or rename doing something your code did not expect.",
          ],
        },
        {
          heading: "Automatic semicolon insertion — the reason line breaks stay",
          paragraphs: [
            "JavaScript is the only mainstream language where deleting a newline can change program behavior. Automatic semicolon insertion (ASI) inserts semicolons based on line boundaries and specific rules: a return followed by a newline returns undefined, not the expression on the next line; a++ on its own line, assignment continuation across lines — all depend on where breaks are. Naively joining everything into one line merges these boundaries and silently rewrites semantics.",
            "That is why full minifiers must parse the file into an AST before they touch it — they re-emit code where ASI hazards are resolved explicitly. Any tool that merely deletes whitespace without parsing (as quick regex-based minifiers do) can produce code that runs differently from the source. This tool sidesteps the entire class of bugs by keeping statement-boundary newlines intact.",
            "The trade-off is honest: you get a file somewhat larger than Terser's output, in exchange for a guarantee that behavior is byte-for-byte equivalent in structure. For scripts embedded in pages, extensions, user styles or environments without a build pipeline, that guarantee is usually worth the bytes.",
          ],
        },
        {
          heading: "Your source code stays on your device",
          paragraphs: [
            "Pasting unreleased source code into a web tool is a trust decision, and one most developers make too casually. Code you are about to ship may contain internal names, API endpoints, commented-out credentials or proprietary logic. Uploading it to a third-party minifier means a stranger's server stores a copy of your pre-release work — with no contract, no audit and no deletion guarantee.",
            "This tool processes everything in your browser: the minifier is JavaScript running locally on your input, with no network request carrying your code anywhere. The byte-savings readout is computed on the spot. Once the page is loaded, you can disconnect and keep minifying.",
            "For teams with real pipelines, keep using Terser/esbuild in CI where source maps and bundles are managed properly. For a single file, a quick check of what production will serve, or a codebase with no build system, this is the zero-setup, zero-risk path.",
          ],
        },
      ],
    },
    zh: {
      name: "JavaScript 压缩",
      tagline: "保守的 JS 压缩:只去注释、折叠空行并保留换行——不做危险改写,语义分毫不差。适合没有构建流程的场景。",
      intro: [
        "这个压缩器只做两件事:移除 // 和 /* */ 注释(字符串、模板字符串(含嵌套 ${…})和正则字面量都会被正确跳过),并折叠空行和缩进。语句之间的换行会保留,因此自动分号插入(ASI)的行为和原来完全一样。",
        "它绝不重命名变量、内联代码或合并语句——那是完整构建工具的工作。你得到的是一个明显变小、绝对安全的压缩文件,外加实时字节节省读数,全程在浏览器中完成。",
      ],
      steps: [
        "把 JavaScript 粘贴到输入框。",
        "压缩结果即时出现,并显示输入/输出大小和节省百分比。",
        "复制压缩后的脚本,或清空输入压缩下一个文件。",
      ],
      faqs: [
        {
          q: "为什么保留换行,不把所有语句并成一行?",
          a: "这是刻意选择。JavaScript 依赖自动分号插入(ASI),删掉换行可能悄悄改变程序行为。保留换行让这个压缩器对没走真实构建流程的代码也安全。",
        },
        {
          q: "和 Terser、UglifyJS 有什么区别?",
          a: "它们会解析并重写 AST:混淆变量名、删除死代码、内联展开——输出更小,但需要真正的构建步骤。本工具只删注释和空行——行为零风险,也无需构建。",
        },
        {
          q: "代码会被上传吗?",
          a: "不会。一切都在浏览器本地运行,源码不离开设备。",
        },
      ],
      deepDive: [
        {
          heading: "压缩、gzip 与真正省字节的地方",
          paragraphs: [
            "压缩(minify)和压缩(compress)是两个不同的层,分清谁在省字节很重要。minify 是有损的文本改写:去注释、去空白、缩短变量名、合并语句;gzip 或 Brotli 是之后施加的无损传输压缩。空白字符的压缩率极高——仅靠 gzip 就能把一个松散的脚本压掉七到八成——所以 minifier 的边际收益远比它的百分比数字看起来小。",
            "真正要 minify 的理由不是 gzip 冗余,而是解析和执行成本:浏览器要解析的每个注释和格式字符,都是访客设备上的 CPU 时间,在低端手机上尤其明显。另外提醒一句:如果你依赖内联注解,删注释有隐藏成本——除了 source map 之外,某些打包器和框架会从注释里读取 /*#__PURE__*/ 这类指令标记,这些标记必须活下来。",
            "本工具刻意走保守路线:去掉注释、折叠空行,但保留语句之间的换行。配合服务器开启 gzip 或 Brotli,你能在不引入构建步骤的前提下拿到大部分可省的字节——也没有任何混淆、内联、重命名改写代码的风险。",
          ],
        },
        {
          heading: "自动分号插入——换行必须保留的原因",
          paragraphs: [
            "JavaScript 是唯一一个删掉换行就能改变程序行为的主流语言。自动分号插入(ASI)按行边界和特定规则补分号:return 后面跟换行,返回的是 undefined 而不是下一行的表达式;单独成行的 a++;跨行的赋值续写——全都取决于换行的位置。天真的把所有语句并成一行,会把这些边界抹掉,悄悄改写语义。",
            "这就是为什么完整的 minifier 必须先把文件解析成 AST 再动手——重新生成的代码里 ASI 风险已被显式解决。任何不做解析、单纯删空白的工具(比如基于正则的快速压缩器)都可能产出和源码行为不同的代码。本工具靠保留语句边界的换行,绕开了这一整类 bug。",
            "代价很诚实:你会得到比 Terser 输出略大的文件,换来的是行为与源码结构逐字节等价的保证。对嵌入页面的脚本、浏览器扩展、用户样式,或没有构建流程的环境,这个保证通常值那些字节。",
          ],
        },
        {
          heading: "源码留在你的设备上",
          paragraphs: [
            "把未发布的源码贴进一个网页工具,是一次信任决策——而多数开发者做得很随意。即将上线的代码里可能有内部命名、API 端点、注释掉的凭据或专有逻辑。上传到第三方压缩服务,等于把你的未发布作品存了一份在陌生人的服务器上——没有合同、没有审计、没有删除保证。",
            "本工具的一切都在浏览器内处理:压缩器就是跑在你输入上的本地 JavaScript,没有任何网络请求带走你的代码。字节节省读数也是当场算的。页面加载后断网也能继续压缩。",
            "有正经构建流程的团队,请继续在 CI 里用 Terser/esbuild,source map 和打包在那边才管得到。对单个文件、快速看一眼生产环境要发什么,或没有构建系统的代码库,这里是零配置、零风险的路径。",
          ],
        },
      ],
    },
    ja: {
      name: "JavaScript ミニファイアー",
      tagline:
        "保守的な JS ミニファイアー:コメント除去と空行の折り畳みのみで改行は保持 — 危険な書き換えをせず、コードの意味はそのまま。ビルド不要の現場に。",
      intro: [
        "このミニファイアーは 2 つのことだけをします。// と /* */ のコメントを除去し(文字列・${…} を含むテンプレートリテラル・正規表現リテラルは正しく保護)、空行とインデントを折り畳みます。文の間の改行は保持されるため、自動セミコロン挿入(ASI)の挙動は以前とまったく同じです。",
        "変数名の変更・コードのインライン化・文の結合は絶対にしません。それは本格的なビルドツールの仕事です。手に入るのは、確実に小さく安全に圧縮されたファイルと、リアルタイムの節約バイト数表示だけ。すべてブラウザ内で完結します。",
      ],
      steps: [
        "JavaScript を入力欄に貼り付けます。",
        "圧縮結果が即座に表示され、入力/出力サイズと節約率も出ます。",
        "圧縮後のスクリプトをコピーするか、入力をクリアして次のファイルへ。",
      ],
      faqs: [
        {
          q: "なぜ改行を残して 1 行に結合しないのですか?",
          a: "意図的な選択です。JavaScript は自動セミコロン挿入に依存し、改行を削除するとプログラムの動作が静かに変わる可能性があります。改行を残すことで、本格的なバンドラーを通らないコードでも安全に使えます。",
        },
        {
          q: "Terser や UglifyJS との違いは?",
          a: "それらは AST を解析・書き換えます(名前の短縮、デッドコード除去、インライン化)。出力はさらに小さい一方、本物のビルド工程が必要です。このツールはコメントと空行だけを除去 — 挙動変化のリスクはゼロで、ビルドも不要です。",
        },
        {
          q: "コードはどこかにアップロードされますか?",
          a: "いいえ。すべてブラウザ内でローカルに実行され、ソースは端末の外に出ません。",
        },
      ],
      deepDive: [
        {
          heading: "ミニファイ、gzip、本当にバイトを節約するのはどれか",
          paragraphs: [
            "ミニファイと圧縮は別の層で、どちらが実際にバイトを減らしているかを知ることが重要です。ミニファイは非可逆のテキスト書き換えです:コメントと空白の除去、名前の短縮、文の結合。gzip や Brotli はその後で掛かる非可逆でない転送圧縮です。空白は極めて圧縮効率が良く、gzip だけで冗長なスクリプトを 7〜8 割減らせるので、ミニファイアーの限界節約はパーセント表示が示すよりずっと小さくなります。",
            "ミニファイの本当の理由は gzip の冗長性ではなく、パースと実行コストです。ブラウザが解析するコメントや整形文字の一つ一つが訪問者の端末での CPU 時間であり、低スペックなスマホでは顕著に出ます。もう一つ注意として、インライン注釈に頼っているならコメント除去には隠れた代償があります。source map 以外にも、一部のバンドラーやフレームワークはコメントから /*#__PURE__*/ のようなディレクティブを読むため、その印が生き残る必要があります。",
            "本ツールは意図的に保守路線を取ります。コメント除去と空行の折り畳みはするが、文の間の改行は残す。サーバーで gzip や Brotli を有効にして出力を配信すれば、ビルド工程なしで節約の大部分を手に入れられ、しかもマングリング・インライン化・リネームがコードに予期しないことをするリスクはゼロです。",
          ],
        },
        {
          heading: "自動セミコロン挿入——改行を残す理由",
          paragraphs: [
            "改行を削除するだけで動作が変わる主流言語は JavaScript だけです。自動セミコロン挿入(ASI)は行境界と特定の規則でセミコロンを補います。return の後の改行は次の行の式ではなく undefined を返し、単独行の a++ や行をまたぐ代入の続きも、すべて改行位置に依存します。すべてを一行に結合する素朴な処理はこれらの境界を消し、意味を静かに書き換えます。",
            "だから本格的なミニファイアーは触る前にファイルを AST に解析しなければなりません。再生成されるコードでは ASI の危険が明示的に解決されています。解析せず空白だけを削るツール(正規表現ベースの簡易ミニファイアー)は、ソースと違う動作をするコードを出せます。本ツールは文境界の改行を保つことで、このクラスのバグ全体を回避しています。",
            "トレードオフは正直です。Terser の出力よりやや大きいファイルを得る代わりに、構造として挙動が完全に等価である保証を得ます。ページ埋め込みのスクリプト、拡張機能、ユーザースタイル、ビルドパイプラインのない環境では、その保証は通常そのバイト数の価値があります。",
          ],
        },
        {
          heading: "ソースコードは端末に留まる",
          paragraphs: [
            "未公開のソースコードを Web ツールに貼るのは信頼の判断です。そして多くの開発者がこれを軽く考えがちです。まもなく公開するコードには内部名、API エンドポイント、コメントアウトされた認証情報、独自ロジックが含まれているかもしれません。サードパーティのミニファイアーにアップロードすることは、未公開の成果物のコピーを他人のサーバーに預けることです——契約も監査も削除の保証もありません。",
            "本ツールはすべてをブラウザ内で処理します。ミニファイアーは入力の上で動くローカルの JavaScript で、コードを運ぶネットワークリクエストはありません。節約バイト数の表示もその場で計算されます。ページを読み込んだ後は切断して作業を続けられます。",
            "本格的なパイプラインを持つチームは、source map とバンドルが適切に管理される CI で Terser や esbuild を使い続けてください。単一ファイル、本番で配信されるものの確認、ビルドシステムのないコードベースには、ここがゼロ設定・ゼロリスクの道です。",
          ],
        },
      ],
    },
    es: {
      name: "Minificador JavaScript",
      tagline:
        "Un minificador JS conservador: elimina comentarios y colapsa líneas en blanco conservando los saltos — sin reescrituras arriesgadas, tu código se comporta igual.",
      intro: [
        "Este minificador hace exactamente dos cosas: elimina los comentarios // y /* */ (respetando cadenas, plantillas literales con ${…} anidado y expresiones regulares) y colapsa líneas en blanco e indentación. Los saltos entre sentencias se conservan, así que la inserción automática de punto y coma sigue funcionando igual que siempre.",
        "Nunca renombra variables, inlinea código ni fusiona sentencias — eso es trabajo de una herramienta de build completa. Obtienes un archivo claramente más pequeño y minificado con seguridad, más un indicador de bytes ahorrados, todo en tu navegador.",
      ],
      steps: [
        "Pega tu JavaScript en el cuadro de entrada.",
        "La salida minificada aparece al instante, con tamaños de entrada/salida y el porcentaje ahorrado.",
        "Copia el script compacto o borra la entrada para minificar otro archivo.",
      ],
      faqs: [
        {
          q: "¿Por qué conserva los saltos de línea en vez de unir todo en una línea?",
          a: "Es una decisión deliberada. JavaScript depende de la inserción automática de punto y coma, y eliminar saltos puede cambiar silenciosamente el comportamiento de un programa. Conservarlos hace este minificador seguro para código que no pasa por un bundler real.",
        },
        {
          q: "¿En qué se diferencia de Terser o UglifyJS?",
          a: "Ellos analizan y reescriben el AST: ofuscan nombres, eliminan código muerto, inlinean. Salida más pequeña, pero un paso de build real. Esta herramienta solo quita comentarios y líneas en blanco: riesgo cero de cambiar el comportamiento y sin build.",
        },
        {
          q: "¿Mi código se sube a algún sitio?",
          a: "No. Todo corre localmente en tu navegador — tu fuente nunca sale del dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Minificar, gzip y lo que de verdad ahorra bytes",
          paragraphs: [
            "Minificar y comprimir son capas distintas, y saber cuál hace el trabajo importa. La minificación es una reescritura textual con pérdida: comentarios y espacios eliminados, nombres acortados, sentencias fusionadas. Gzip o Brotli es compresión de transporte sin pérdida aplicada después. El espacio en blanco comprime muy bien — solo gzip puede reducir un script verboso un 70-80% — así que el ahorro marginal de un minificador es mucho menor de lo que sugiere su porcentaje bruto.",
            "La razón real de minificar no es la redundancia de gzip sino el coste de parseo y ejecución: cada comentario y carácter de formato que el navegador debe procesar es tiempo de CPU en el dispositivo del visitante, algo crítico en móviles modestos. Un aviso además: si dependes de anotaciones en línea, eliminar comentarios tiene un coste oculto — además de los source maps, algunos bundlers y frameworks leen directivas como /*#__PURE__*/ desde los comentarios, y esas marcas deben sobrevivir.",
            "Esta herramienta toma el camino conservador a propósito: quita comentarios y colapsa líneas en blanco pero conserva los saltos entre sentencias. Si sirves la salida con gzip o Brotli activados, capturas la mayoría del ahorro posible sin paso de build — y sin ningún riesgo de las reescrituras que manglean, inlinean o renombran haciendo algo que tu código no esperaba.",
          ],
        },
        {
          heading: "La inserción automática de punto y coma — por qué se conservan los saltos",
          paragraphs: [
            "JavaScript es el único lenguaje mainstream donde borrar un salto de línea puede cambiar el comportamiento del programa. La inserción automática de punto y coma (ASI) añade puntos según fronteras de línea y reglas concretas: un return seguido de salto devuelve undefined, no la expresión de la línea siguiente; un a++ en su propia línea, una asignación continuada en varias líneas — todo depende de dónde están los saltos. Unirlo todo en una línea de forma ingenua fusiona esas fronteras y reescribe la semántica en silencio.",
            "Por eso los minificadores completos deben parsear el archivo a un AST antes de tocarlo — reemiten código donde los peligros de ASI están resueltos explícitamente. Cualquier herramienta que solo borra espacios sin parsear (como los minificadores rápidos basados en regex) puede producir código que se ejecuta distinto al original. Esta herramienta esquiva toda esa clase de bugs manteniendo los saltos en las fronteras de sentencia.",
            "El compromiso es honesto: obtienes un archivo algo mayor que el de Terser, a cambio de la garantía de equivalencia estructural con el original. Para scripts incrustados en páginas, extensiones, user styles o entornos sin pipeline de build, esa garantía suele valer los bytes.",
          ],
        },
        {
          heading: "Tu código fuente se queda en tu dispositivo",
          paragraphs: [
            "Pegar código fuente no publicado en una herramienta web es una decisión de confianza, y la mayoría de desarrolladores la toma con demasiada ligereza. El código a punto de lanzarse puede contener nombres internos, endpoints de API, credenciales comentadas o lógica propietaria. Subirlo a un minificador de terceros significa que el servidor de un desconocido guarda una copia de tu trabajo pre-release — sin contrato, sin auditoría y sin garantía de borrado.",
            "Esta herramienta procesa todo en tu navegador: el minificador es JavaScript corriendo localmente sobre tu entrada, sin ninguna petición de red que lleve tu código a ningún sitio. La lectura de bytes ahorrados se calcula en el momento. Una vez cargada la página, puedes desconectarte y seguir minificando.",
            "Para equipos con pipelines reales, sigan usando Terser/esbuild en CI donde los source maps y los bundles se gestionan bien. Para un archivo suelto, una comprobación rápida de lo que servirá producción, o un código sin sistema de build, este es el camino de cero configuración y cero riesgo.",
          ],
        },
      ],
    },
    pt: {
      name: "Minificador JavaScript",
      tagline:
        "Um minificador JS conservador: remove comentários e colapsa linhas em branco mantendo as quebras — sem reescritas arriscadas, sua semântica fica intacta.",
      intro: [
        "Este minificador faz exatamente duas coisas: remove comentários // e /* */ (respeitando strings, template literals com ${…} aninhado e regex) e colapsa linhas em branco e indentação. As quebras entre statements são preservadas, então a inserção automática de ponto e vírgula continua funcionando igual.",
        "Ele nunca renomeia variáveis, inlineia código ou funde statements — isso é papel de uma ferramenta de build completa. Você recebe um arquivo bem menor e minificado com segurança, mais um indicador de bytes economizados, tudo no seu navegador.",
      ],
      steps: [
        "Cole seu JavaScript na caixa de entrada.",
        "A saída minificada aparece na hora, com tamanhos de entrada/saída e a porcentagem economizada.",
        "Copie o script compacto ou limpe a entrada para minificar outro arquivo.",
      ],
      faqs: [
        {
          q: "Por que manter as quebras de linha em vez de juntar tudo em uma linha?",
          a: "Escolha deliberada. JavaScript depende da inserção automática de ponto e vírgula, e remover quebras pode mudar silenciosamente o comportamento do programa. Mantê-las torna este minificador seguro para código que não passa por um bundler real.",
        },
        {
          q: "Qual a diferença para Terser ou UglifyJS?",
          a: "Eles analisam e reescrevem a AST: encurtam nomes, removem código morto, fazem inlining. Saída menor, mas exige um build de verdade. Esta ferramenta só remove comentários e linhas em branco — risco zero de mudança de comportamento e sem build.",
        },
        {
          q: "Meu código é enviado para algum lugar?",
          a: "Não. Tudo roda localmente no seu navegador — seu código-fonte nunca sai do dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Minificar, gzip e o que de fato economiza bytes",
          paragraphs: [
            "Minificar e comprimir são camadas diferentes, e saber qual faz o trabalho importa. A minificação é uma reescritura textual com perda: comentários e espaços removidos, nomes encurtados, statements fundidos. Gzip ou Brotli é compressão de transporte sem perda aplicada depois. Espaço em branco comprime extremamente bem — só o gzip pode reduzir um script verboso em 70-80% — então a economia marginal de um minificador é bem menor do que o percentual bruto sugere.",
            "A razão real de minificar não é a redundância do gzip, e sim o custo de parse e execução: cada comentário e caractere de formatação que o navegador precisa processar é tempo de CPU no dispositivo do visitante, algo crítico em celulares modestos. Um aviso extra: se você depende de anotações inline, remover comentários tem custo oculto — além dos source maps, alguns bundlers e frameworks leem diretivas como /*#__PURE__*/ dos comentários, e essas marcas precisam sobreviver.",
            "Esta ferramenta toma o caminho conservador de propósito: remove comentários e colapsa linhas em branco, mas mantém as quebras entre statements. Se você servir a saída com gzip ou Brotli ativados, captura a maior parte da economia possível sem etapa de build — e sem nenhum risco das reescrituras que manglam, inlineiam ou renomeiam fazendo algo que seu código não esperava.",
          ],
        },
        {
          heading: "Inserção automática de ponto e vírgula — por que as quebras ficam",
          paragraphs: [
            "JavaScript é a única linguagem mainstream em que apagar uma quebra de linha pode mudar o comportamento do programa. A inserção automática de ponto e vírgula (ASI) insere vírgulas por fronteiras de linha e regras específicas: um return seguido de quebra retorna undefined, não a expressão da linha seguinte; um a++ em linha própria, uma atribuição continuada em várias linhas — tudo depende de onde estão as quebras. Juntar tudo numa linha de forma ingênua funde essas fronteiras e reescreve a semântica em silêncio.",
            "É por isso que minificadores completos precisam parsear o arquivo numa AST antes de tocá-lo — eles reemitem código com os perigos de ASI resolvidos explicitamente. Qualquer ferramenta que só apaga espaços sem parsear (como os minificadores rápidos baseados em regex) pode produzir código que roda diferente do original. Esta ferramenta evita toda essa classe de bugs mantendo as quebras nas fronteiras de statement.",
            "O trade-off é honesto: você recebe um arquivo um pouco maior que o do Terser, em troca da garantia de equivalência estrutural com o original. Para scripts embutidos em páginas, extensões, user styles ou ambientes sem pipeline de build, essa garantia geralmente vale os bytes.",
          ],
        },
        {
          heading: "Seu código-fonte fica no seu dispositivo",
          paragraphs: [
            "Colar código-fonte não publicado numa ferramenta web é uma decisão de confiança, e a maioria dos desenvolvedores a toma com muita leveza. Código prestes a ir para produção pode conter nomes internos, endpoints de API, credenciais comentadas ou lógica proprietária. Enviá-lo a um minificador de terceiros significa que o servidor de um estranho guarda uma cópia do seu trabalho pré-lançamento — sem contrato, sem auditoria e sem garantia de exclusão.",
            "Esta ferramenta processa tudo no seu navegador: o minificador é JavaScript rodando localmente sobre a sua entrada, sem nenhuma requisição de rede levando seu código a qualquer lugar. O indicador de bytes economizados é calculado na hora. Depois que a página carrega, você pode desconectar e continuar minificando.",
            "Para equipes com pipelines reais, continuem usando Terser/esbuild no CI, onde source maps e bundles são gerenciados direito. Para um arquivo solto, uma verificação rápida do que a produção vai servir, ou um código sem sistema de build, este é o caminho de configuração zero e risco zero.",
          ],
        },
      ],
    },
  },
});
