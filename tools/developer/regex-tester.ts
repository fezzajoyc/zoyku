import { DevRegexEngine } from "../_engines/dev-engine-regex";
import { defineTool } from "../_lib/types";

const SAMPLE = "Contact ada@example.com or grace+ops@example.org — call 555-0142 or 555-7719.";
const PATTERN = "([\\w.+-]+)@([\\w-]+\\.)+[\\w-]{2,}";

export default defineTool({
  slug: "regex-tester",
  category: "developer",
  icon: "search",
  engine: { component: DevRegexEngine, props: { defaultPattern: PATTERN, sample: SAMPLE } },
  related: ["json-validator", "word-counter", "case-converter", "text-diff", "md5-generator", "sha256-generator", "base64-image", "json-formatter", "url-encoder", "html-minifier"],
  copy: {
    en: {
      name: "Regex Tester",
      tagline:
        "Test regular expressions live: highlight every match as you type, inspect capture groups and debug patterns for JavaScript, with common flags one click away.",
      intro: [
        "Type a pattern, flip the flags you need (global, case-insensitive, multiline, dotAll, unicode) and paste your test string — every match is highlighted in place while a list below shows each match with its index and capture groups, named groups included.",
        "Invalid patterns are reported immediately with the parser's own message instead of a broken page, and zero-length matches are handled safely, so patterns like a* behave the way your runtime would.",
      ],
      steps: [
        "Enter your regular expression in the pattern field.",
        "Toggle flags (g, i, m, s, u) and paste your test string.",
        "Read the highlighted matches and the list of groups; adjust the pattern until it captures exactly what you need.",
      ],
      faqs: [
        {
          q: "Which regex flavor does this use?",
          a: "JavaScript (ECMAScript) RegExp — the same engine that runs in your browser and Node. Patterns for PCRE, Python or Java are usually compatible, but lookahead/lookbehind and unicode handling can differ slightly.",
        },
        {
          q: "Why does my pattern match strange empty positions?",
          a: "Patterns that can match an empty string (like a* or (?:)?) produce zero-length matches. The tester advances one character after each, exactly like JavaScript's own iteration does.",
        },
        {
          q: "Is my test data sent anywhere?",
          a: "No. Matching runs live in your browser — nothing is uploaded or stored.",
        },
      ],
      deepDive: [
        {
          heading: "Catastrophic backtracking: why some patterns freeze",
          paragraphs: [
            "A regex engine that backtracks tries every way the sub-patterns could split the input, and some combinations explode exponentially. The classic offender is a nested quantifier such as (a+)+ against a long string of \"a\"s that fails at the end: the engine re-splits the run in more ways than there are atoms in the universe. An input a few dozen characters long can hang a server thread for hours — this is the mechanism behind real outages, where a user-supplied pattern or field hit a validator built on such a pattern.",
            "Lookahead is often the recommended fix. Turning (a+)+ into (?=(a+))a+ or anchoring with ^ and $ prunes the search tree because the assertion consumes nothing and the engine commits sooner. Atomic groups (?>...) and possessive quantifiers a++ also remove backtrack points, but JavaScript RegExp supports neither — in JS you emulate them with lookahead or restructure the pattern.",
            "How to spot a dangerous pattern before production: nested quantifiers ((.+)*, (\\w+)+), alternation inside quantifiers ((a|a?)+), and optional tails that overlap a greedy head. Test them against a long non-matching string, not just a matching one — a pattern that passes happy-path tests can still take exponential time on input it is meant to reject. ReDoS hardening libraries and lint rules (like the safe-regex family) encode exactly these checks.",
          ],
        },
        {
          heading: "Lookahead, lookbehind and zero-width matches",
          paragraphs: [
            "Lookaround assertions check what surrounds a position without consuming it, which makes them the tool for \"contains but not preceded by\" logic. For example, \\d+(?= dollars) grabs the number only when the word dollars follows, and foo(?!bar) matches foo everywhere except before bar. Negative lookbehind (?<!@)\\w+ finally became available in JavaScript around 2018 (V8 6.2 era), so older Node and Safari versions reject patterns that recent browsers accept.",
            "Zero-length matches are the other subtle corner. A pattern like a* can succeed without consuming anything, so a naive loop would spin forever at the same index. The JavaScript spec's fix: when a match is empty, the engine advances one position before continuing. This tester follows that rule, which is why a* against \"baa\" yields an empty match at index 0, then real matches at 1 and 2 — matching what String.prototype.match with the g flag returns.",
            "Practical reading: capture groups from a lookahead still capture. (?=(a+)) gives you the run of \"a\"s as group 1 while matching positionally. Named groups (?<year>\\d{4}) make extraction self-documenting and survive pattern re-ordering. When a group may not participate, match it optional and check for undefined rather than assuming every group is always present on every match.",
          ],
        },
        {
          heading: "Dialect differences and why this runs locally",
          paragraphs: [
            "Regex is not one language. JavaScript supports \\d, \\w and \\s but not POSIX classes like [[:alpha:]]; PCRE adds recursion and \\K; Python adds (?P<name>...) for named groups while JS uses (?<name>...). The unicode flag changes what . and \\w mean for astral characters, and the s flag makes dot match newlines. When porting a pattern between languages, test the port — most mismatches hide in lookbehind, recursion and unicode property escapes (\\p{Script=Greek}, which need the u flag in JS).",
            "Everything here executes in your browser with JavaScript's own RegExp — your test strings, which may be log lines, API payloads or customer data, never leave the device. That is the structural advantage over regex services that POST your pattern and sample data to a server, where a paste of production data into a debugging session becomes a copy in someone else's logs. Nothing here is uploaded, stored or shared; close the tab and it is gone.",
          ],
        },
      ],
    },
    zh: {
      name: "正则测试器",
      tagline: "实时测试正则表达式:输入即高亮全部匹配,逐条查看捕获组,支持 g/i/m/s/u 标志——专为 JavaScript 正则调试打造。",
      intro: [
        "输入模式,打开需要的标志(global、忽略大小写、多行、dotAll、unicode),粘贴测试文本——每个匹配都会在原文中就地高亮,下方列表逐条列出匹配内容、位置和捕获组,命名组也包含在内。",
        "非法模式会立即给出解析器的原始报错而不是白屏,零宽匹配也被安全处理,像 a* 这类模式的行为与你的运行时完全一致。",
      ],
      steps: [
        "在模式框输入正则表达式。",
        "切换标志(g、i、m、s、u)并粘贴测试文本。",
        "查看高亮匹配和捕获组列表;调整模式直到恰好捕获所需内容。",
      ],
      faqs: [
        {
          q: "这里用的是什么正则方言?",
          a: "JavaScript(ECMAScript)RegExp——与浏览器和 Node 中运行的是同一个引擎。PCRE、Python、Java 的模式通常兼容,但断言先行/后行和 unicode 处理可能有细微差别。",
        },
        {
          q: "为什么我的模式会匹配到奇怪的空位置?",
          a: "能匹配空串的模式(如 a*)会产生零宽匹配。测试器会像 JavaScript 自身一样,在每次零宽匹配后前进一个字符。",
        },
        {
          q: "测试数据会被发送到别处吗?",
          a: "不会。匹配在浏览器中实时完成,不上传也不存储。",
        },
      ],
      deepDive: [
        {
          heading: "灾难性回溯:为什么有些模式会把页面卡死",
          paragraphs: [
            "回溯型正则引擎会尝试子模式切分输入的每一种方式,某些组合会指数爆炸。经典的雷区是嵌套量词:用 (a+)+ 去匹配一长串 \"a\" 且在末尾失败,引擎会把这段字符反复重切,切法数量超过宇宙原子数。几十个字符的输入就能把一个服务线程挂住数小时——这也是真实事故的机制:用户提交的字段或模式,撞上了一个用这类模式写的校验器。",
            "lookahead 常被推荐为解法。把 (a+)+ 改写成 (?=(a+))a+ 或用 ^ 与 $ 加锚点能剪枝搜索树,因为断言不消耗字符、引擎更早定局。原子组 (?>...) 与占有量词 a++ 也能消除回溯点,但 JavaScript RegExp 两者都不支持——JS 里只能用 lookahead 模拟,或者重构模式。",
            "上生产前怎么排查:嵌套量词((.+)*、(\\w+)+)、量词内的分支选择((a|a?)+)、可选尾部与贪婪头部重叠,都是高危特征。务必拿一段长的「不匹配」字符串去测,而不只是拿匹配的样例——通过正常用例的模式,照样可能在「本该拒绝」的输入上跑出指数耗时。ReDoS 加固库和 lint 规则(如 safe-regex 一族)查的就是这些东西。",
          ],
        },
        {
          heading: "断言先行后行与零宽匹配",
          paragraphs: [
            "先行/后行断言只检查位置周围的内容、不消耗字符,专门解决「要,但前面/后面不能是 X」这类逻辑。\\d+(?= dollars) 只在后面跟 dollars 时抓数字;foo(?!bar) 匹配除 bar 之前之外的所有 foo。负向后行 (?<!@)\\w+ 大约 2018 年才进入 JavaScript(V8 6.2 前后),所以旧版 Node 和 Safari 会直接拒绝新浏览器能用的模式。",
            "零宽匹配是另一处暗坑。像 a* 这种模式可以「成功但不吃掉任何字符」,朴素的循环会在同一位置永远打转。JavaScript 规范的对策:匹配为空时,引擎前进一个位置再继续。本测试器遵循同一条规则,所以 a* 对 \"baa\" 会先在索引 0 给出空匹配,再在 1 和 2 给出真匹配——和带 g 标志的 String.prototype.match 返回一致。",
            "实用要点:lookahead 里的捕获组照样捕获。(?=(a+)) 会把整串 \"a\" 交到组 1,而匹配本身不占位置。命名组 (?<year>\\d{4}) 让提取代码自说明,模式调整顺序也不会错位。组可能不参与匹配时,把它写成可选的,然后检查 undefined,别假设每组每次都存在。",
          ],
        },
        {
          heading: "方言差异,以及为什么本地运行",
          paragraphs: [
            "正则不是一门语言。JavaScript 支持 \\d、\\w、\\s 但没有 POSIX 类 [[:alpha:]];PCRE 有递归和 \\K;Python 的命名组写作 (?P<name>...),JS 是 (?<name>...)。u 标志会改变 . 和 \\w 对星形字符(超过基本平面)的含义,s 标志让点号匹配换行。跨语言移植模式时务必实测——差异大多藏在后行断言、递归和 unicode 属性类(\\p{Script=Greek},JS 里需要 u 标志)。",
            "这里的一切都在你的浏览器里用 JavaScript 原生 RegExp 执行——你的测试文本可能是日志、接口报文或客户数据,永远不会离开这台设备。这是与「把模式和样例 POST 到服务器」的在线正则服务的结构性差别:在后者那里,一次调试时粘贴的生产数据,就成了别人日志里的一份拷贝。这里不上传、不存储、不共享,关掉标签页就没了。",
          ],
        },
      ],
    },
    ja: {
      name: "正規表現テスター",
      tagline:
        "正規表現をリアルタイムでテスト:入力と同時にすべての一致をハイライトし、キャプチャグループを確認。JavaScript 向けデバッグに、フラグもワンクリック。",
      intro: [
        "パターンを入力し、必要なフラグ(global・大文字小文字なし・複数行・dotAll・unicode)を切り替え、テスト文字列を貼り付ける — すべての一致がその場でハイライトされ、下のリストに各一致の位置とキャプチャグループ(名前付きも)が表示されます。",
        "不正なパターンはページを壊さず、パーサー自身のエラーメッセージで即時に報告されます。長さゼロの一致も安全に処理され、a* のようなパターンもランタイムと同じ挙動になります。",
      ],
      steps: [
        "パターン欄に正規表現を入力します。",
        "フラグ(g・i・m・s・u)を切り替え、テスト文字列を貼り付けます。",
        "ハイライトされた一致とグループ一覧を確認し、必要なものだけを捕らえるまで調整します。",
      ],
      faqs: [
        {
          q: "どの正規表現方言を使っていますか?",
          a: "JavaScript(ECMAScript)の RegExp です。ブラウザや Node で動くのと同じエンジン。PCRE・Python・Java のパターンはたいてい互換ですが、先読み/後読みや Unicode の扱いが微妙に異なることがあります。",
        },
        {
          q: "奇妙な空の位置に一致するのはなぜ?",
          a: "空文字列に一致しうるパターン(a* など)は長さゼロの一致を生みます。テスターは JavaScript 本来の反復と同じく、それぞれの後に 1 文字進みます。",
        },
        {
          q: "テストデータはどこかに送信されますか?",
          a: "いいえ。マッチングはブラウザ内でリアルタイムに行われ、アップロードも保存もありません。",
        },
      ],
      deepDive: [
        {
          heading: "破滅的バックトラック:一部のパターンが固まる理由",
          paragraphs: [
            "バックトラック型の正規表現エンジンは、部分パターンが入力を切り分けるすべての方法を試します。組み合わせによっては指数関数的に爆発します。定番の落とし穴はネストした量指定子です。(a+)+ で長い \"a\" の連なりを末尾まで行って失敗すると、エンジンはその並びを何通りにも切り直し、その数は宇宙の原子数を超えます。数十文字の入力でサーバーのスレッドを数時間止められる——実際の障害でも同じ仕組みが現場で起きています。ユーザー入力のフィールドやパターンが、そうしたパターンで書かれたバリデータに当たったのです。",
            "解決策としてよく勧められるのが先読みです。(a+)+ を (?=(a+))a+ に書き換えたり、^ と $ でアンカーすると、アサーションは文字を消費しないため探索木が刈り込まれ、エンジンは早く確定します。原子グループ (?>...) や所有量的な a++ もバックトラック点を消せますが、JavaScript の RegExp はどちらも非対応——JS では先読みで代用するか、パターン自体を組み直します。",
            "本番前のチェックポイント:ネストした量指定子((.+)*、(\\w+)+)、量指定子の中の選択((a|a?)+)、greedy な先頭と重なる省略可能な末尾が危険信号です。テストには「マッチしない」長い文字列も必ず使ってください。正常系は通るのに、拒否すべき入力で指数時間を食うパターンは珍しくありません。ReDoS 対策ライブラリや lint ルール(safe-regex 系)が見ているのはまさにこの手の構造です。",
          ],
        },
        {
          heading: "先読み・後読みと長さゼロのマッチ",
          paragraphs: [
            "先読み・後読み(lookaround)は位置の前後を調べるだけで文字を消費しないため、「欲しいが、直前/直後が X であってほしくない」処理の定番です。\\d+(?= dollars) は後ろに dollars があるときだけ数値を取りますし、foo(?!bar) は bar の直前を除くすべての foo にマッチします。否定後読み (?<!@)\\w+ が JavaScript に入ったのは 2018 年頃(V8 6.2 前後)で、古い Node や Safari は新しいブラウザが受け付けるパターンを拒否します。",
            "もう一つの落とし穴が長さゼロのマッチです。a* のようなパターンは一文字も消費せずに「成功」できるため、素朴なループは同じ位置で永久に回ります。JavaScript の仕様はこれに対し、空のマッチの後は 1 文字進むと定めています。このテスターも同じ規則に従い、\"baa\" に対する a* はまずインデックス 0 で空マッチ、次に 1 と 2 で本当のマッチ——g フラグ付きの String.prototype.match と同じ結果になります。",
            "実用メモ:先読みの中のキャプチャグループは普通にキャプチャします。(?=(a+)) なら \"a\" の並び全体がグループ 1 に入り、マッチ自体は位置を占いません。名前付きグループ (?<year>\\d{4}) を使えば抽出コードが自己説明的になり、パターンの順序を入れ替えてもずれません。グループが参加しない可能性があるなら省略可能として書き、undefined をチェックしてください。",
          ],
        },
        {
          heading: "方言の違いと、ローカル実行である理由",
          paragraphs: [
            "正規表現は一つの言語ではありません。JavaScript は \\d、\\w、\\s を持ちますが POSIX クラス [[:alpha:]] はありません。PCRE には再帰と \\K があり、Python の名前付きグループは (?P<name>...)、JS は (?<name>...) です。u フラグは . や \\w がサロゲートペアの文字をどう扱うかを変え、s フラグはドットを改行にマッチさせます。言語をまたいでパターンを移植するときは必ず試してください——差異は後読み、再帰、Unicode プロパティエスケープ(\\p{Script=Greek}、JS では u フラグ必須)に潜りがちです。",
            "ここでの処理はすべて、ブラウザ内で JavaScript の RegExp が直接実行します。ログ行、API のペイロード、顧客データかもしれないテスト文字列は、端末の外へ一歩も出ません。パターンとサンプルデータをサーバーに POST するオンラインサービスとの構造的な違いです。そこではデバッグ中に貼り付けた本番データが、他人のログにコピーとして残ります。ここではアップロードも保存も共有もなく、タブを閉じれば終わりです。",
          ],
        },
      ],
    },
    es: {
      name: "Probador de Regex",
      tagline:
        "Prueba expresiones regulares en vivo: resalta cada coincidencia mientras escribes, inspecciona grupos de captura y depura patrones de JavaScript al instante.",
      intro: [
        "Escribe un patrón, activa las opciones que necesites (global, sin mayúsculas, multilínea, dotAll, unicode) y pega tu texto de prueba — cada coincidencia se resalta en su sitio mientras una lista inferior muestra cada una con su índice y grupos de captura, incluidos los nombrados.",
        "Los patrones inválidos se informan al instante con el mensaje del propio parser en lugar de romper la página, y las coincidencias de longitud cero se gestionan con seguridad, así que patrones como a* se comportan igual que en tu runtime.",
      ],
      steps: [
        "Introduce tu expresión regular en el campo de patrón.",
        "Activa las opciones (g, i, m, s, u) y pega tu texto de prueba.",
        "Lee las coincidencias resaltadas y la lista de grupos; ajusta el patrón hasta capturar exactamente lo que necesitas.",
      ],
      faqs: [
        {
          q: "¿Qué sabor de regex usa?",
          a: "RegExp de JavaScript (ECMAScript) — el mismo motor que corre en tu navegador y en Node. Los patrones de PCRE, Python o Java suelen ser compatibles, pero lookbehind y el manejo unicode pueden diferir algo.",
        },
        {
          q: "¿Por qué mi patrón coincide en posiciones vacías extrañas?",
          a: "Los patrones que pueden coincidir con la cadena vacía (como a*) producen coincidencias de longitud cero. El probador avanza un carácter después de cada una, igual que la iteración nativa de JavaScript.",
        },
        {
          q: "¿Mis datos de prueba se envían a algún sitio?",
          a: "No. El emparejamiento corre en vivo en tu navegador — nada se sube ni se almacena.",
        },
      ],
      deepDive: [
        {
          heading: "Backtracking catastrófico: por qué algunos patrones cuelgan la página",
          paragraphs: [
            "Un motor de regex con backtracking prueba todas las formas en que los subpatrones pueden repartir la entrada, y ciertas combinaciones explotan de forma exponencial. El ofensor clásico es el cuantificador anidado: (a+)+ contra una tira larga de \"a\" que falla al final obliga al motor a re-repartir la secuencia de más maneras de las que hay átomos en el universo. Una entrada de pocas decenas de caracteres puede dejar un hilo de servidor colgado durante horas — ese es el mecanismo de averías reales, donde un campo enviado por el usuario golpea un validador construido sobre un patrón así.",
            "El lookahead suele ser el remedio recomendado. Convertir (a+)+ en (?=(a+))a+ o anclar con ^ y $ poda el árbol de búsqueda, porque la aserción no consume nada y el motor se compromete antes. Los grupos atómicos (?>...) y los cuantificadores posesivos como a++ también eliminan puntos de backtrack, pero el RegExp de JavaScript no soporta ninguno — en JS se emulan con lookahead o se reestructura el patrón.",
            "Cómo detectar un patrón peligroso antes de producción: cuantificadores anidados ((.+)*, (\\w+)+), alternancia dentro de cuantificadores ((a|a?)+) y colas opcionales que se solapan con una cabeza greedy. Pruébalos contra una cadena larga que no coincida, no solo contra una que sí — un patrón que pasa los tests del caso feliz puede igualmente tardar tiempo exponencial en entradas que se supone debe rechazar. Las librerías y reglas de lint anti-ReDoS (como la familia safe-regex) comprueban exactamente esto.",
          ],
        },
        {
          heading: "Lookahead, lookbehind y coincidencias de longitud cero",
          paragraphs: [
            "Las aserciones de lookahead y lookbehind examinan lo que rodea a una posición sin consumirla, y son la herramienta para la lógica del tipo \"lo quiero, pero no precedido por X\". Por ejemplo, \\d+(?= dollars) captura el número solo si detrás va la palabra dollars, y foo(?!bar) matchea todos los foo menos los que preceden a bar. El lookbehind negativo (?<!@)\\w+ llegó a JavaScript hacia 2018 (por la época de V8 6.2), así que versiones antiguas de Node y Safari rechazan patrones que los navegadores recientes aceptan.",
            "Las coincidencias de longitud cero son la otra esquina sutil. Un patrón como a* puede tener éxito sin consumir nada, y un bucle ingenuo giraría eternamente en el mismo índice. El remedio de la especificación de JavaScript: cuando un match es vacío, el motor avanza una posición antes de continuar. Este probador sigue esa regla, por eso a* contra \"baa\" produce primero un match vacío en el índice 0 y luego matches reales en 1 y 2 — igual que String.prototype.match con la flag g.",
            "Lectura práctica: los grupos de captura dentro de un lookahead sí capturan. (?=(a+)) te entrega la tira de \"a\" como grupo 1 sin consumir posición. Los grupos con nombre (?<year>\\d{4}) hacen la extracción autodocumentada y sobreviven a reordenar el patrón. Cuando un grupo puede no participar, escríbelo opcional y comprueba undefined en vez de asumir que cada grupo está siempre presente.",
          ],
        },
        {
          heading: "Diferencias de dialecto y por qué esto corre en local",
          paragraphs: [
            "Regex no es un solo lenguaje. JavaScript soporta \\d, \\w y \\s pero no clases POSIX como [[:alpha:]]; PCRE añade recursión y \\K; Python escribe los grupos con nombre como (?P<name>...) mientras JS usa (?<name>...). La flag unicode cambia qué significan . y \\w para caracteres fuera del plano básico, y la flag s hace que el punto matchee saltos de línea. Al portar un patrón entre lenguajes, pruébalo — las discrepancias se esconden sobre todo en lookbehind, recursión y escapes de propiedades unicode (\\p{Script=Greek}, que en JS exigen la flag u).",
            "Todo aquí se ejecuta en tu navegador con el RegExp nativo de JavaScript — tus cadenas de prueba, que pueden ser líneas de log, payloads de API o datos de clientes, nunca salen del dispositivo. Esa es la diferencia estructural frente a los servicios que envían tu patrón y tus datos de muestra a un servidor, donde un pegado de datos de producción durante una depuración se convierte en una copia en los logs de otro. Aquí nada se sube, se guarda ni se comparte; cierras la pestaña y desaparece.",
          ],
        },
      ],
    },
    pt: {
      name: "Testador de Regex",
      tagline:
        "Teste expressões regulares ao vivo: destaque cada correspondência enquanto digita, inspecione grupos de captura e depure padrões de JavaScript na hora.",
      intro: [
        "Digite um padrão, ative as flags que precisar (global, sem maiúsculas, multilinha, dotAll, unicode) e cole seu texto de teste — cada correspondência é destacada no lugar, e uma lista abaixo mostra cada uma com o índice e os grupos de captura, incluindo os nomeados.",
        "Padrões inválidos são relatados na hora com a mensagem do próprio parser em vez de quebrar a página, e correspondências de comprimento zero são tratadas com segurança, então padrões como a* se comportam como no seu runtime.",
      ],
      steps: [
        "Digite sua expressão regular no campo de padrão.",
        "Ative as flags (g, i, m, s, u) e cole seu texto de teste.",
        "Leia as correspondências destacadas e a lista de grupos; ajuste o padrão até capturar exatamente o que precisa.",
      ],
      faqs: [
        {
          q: "Qual sabor de regex este testador usa?",
          a: "RegExp de JavaScript (ECMAScript) — o mesmo motor que roda no seu navegador e no Node. Padrões de PCRE, Python ou Java costumam ser compatíveis, mas lookahead/lookbehind e o tratamento de unicode podem diferir um pouco.",
        },
        {
          q: "Por que meu padrão casa em posições vazias estranhas?",
          a: "Padrões que podem casar com a string vazia (como a*) produzem correspondências de comprimento zero. O testador avança um caractere depois de cada uma, exatamente como a iteração nativa do JavaScript.",
        },
        {
          q: "Meus dados de teste são enviados a algum lugar?",
          a: "Não. O casamento roda ao vivo no seu navegador — nada é enviado ou armazenado.",
        },
      ],
      deepDive: [
        {
          heading: "Backtracking catastrófico: por que alguns padrões travam tudo",
          paragraphs: [
            "Um motor de regex com backtracking tenta todas as formas de repartir a entrada entre os subpadrões, e certas combinações explodem de forma exponencial. O ofensor clássico é o quantificador aninhado: (a+)+ contra uma sequência longa de \"a\" que falha no final força o motor a repartir tudo de novo de mais maneiras do que existem átomos no universo. Uma entrada de poucas dezenas de caracteres pode deixar uma thread de servidor travada por horas — esse é o mecanismo de falhas reais, em que um campo enviado pelo usuário bate num validador construído sobre um padrão assim.",
            "O lookahead costuma ser o remédio recomendado. Converter (a+)+ em (?=(a+))a+ ou ancorar com ^ e $ poda a árvore de busca, porque a asserção não consome nada e o motor se decide mais cedo. Grupos atômicos (?>...) e quantificadores possessivos como a++ também eliminam pontos de backtrack, mas o RegExp do JavaScript não suporta nenhum dos dois — em JS você emula com lookahead ou reestrutura o padrão.",
            "Como detectar um padrão perigoso antes de produção: quantificadores aninhados ((.+)*, (\\w+)+), alternância dentro de quantificadores ((a|a?)+) e caudas opcionais que se sobrepõem a uma cabeça greedy. Teste contra uma string longa que NÃO casa, não só contra uma que casa — um padrão que passa nos testes do caminho feliz pode igualmente levar tempo exponencial em entradas que deveria rejeitar. Bibliotecas e regras de lint anti-ReDoS (como a família safe-regex) verificam exatamente isso.",
          ],
        },
        {
          heading: "Lookahead, lookbehind e correspondências de comprimento zero",
          paragraphs: [
            "As asserções lookahead e lookbehind examinam o que cerca uma posição sem consumi-la, e são a ferramenta para lógica do tipo \"quero, mas não precedido por X\". Por exemplo, \\d+(?= dollars) captura o número só se a palavra dollars vier depois, e foo(?!bar) casa todos os foo exceto os que precedem bar. O lookbehind negativo (?<!@)\\w+ chegou ao JavaScript por volta de 2018 (na época do V8 6.2), então versões antigas de Node e Safari rejeitam padrões que navegadores recentes aceitam.",
            "As correspondências de comprimento zero são a outra esquina sutil. Um padrão como a* pode ter sucesso sem consumir nada, e um laço ingênuo giraria para sempre no mesmo índice. O remédio da especificação do JavaScript: quando um match é vazio, o motor avança uma posição antes de continuar. Este testador segue essa regra, por isso a* contra \"baa\" produz primeiro um match vazio no índice 0 e depois matches reais em 1 e 2 — igual ao String.prototype.match com a flag g.",
            "Leitura prática: grupos de captura dentro de um lookahead capturam normalmente. (?=(a+)) entrega a sequência de \"a\" como grupo 1 sem consumir posição. Grupos nomeados (?<year>\\d{4}) tornam a extração autodocumentada e sobrevivem a reordenações do padrão. Quando um grupo pode não participar, escreva-o opcional e verifique undefined em vez de assumir que todo grupo está sempre presente.",
          ],
        },
        {
          heading: "Diferenças de dialeto e por que isto roda localmente",
          paragraphs: [
            "Regex não é uma linguagem só. JavaScript suporta \\d, \\w e \\s mas não classes POSIX como [[:alpha:]]; PCRE tem recursão e \\K; Python escreve grupos nomeados como (?P<name>...) enquanto o JS usa (?<name>...). A flag unicode muda o que . e \\w significam para caracteres fora do plano básico, e a flag s faz o ponto casar com quebras de linha. Ao portar um padrão entre linguagens, teste — as discrepâncias se escondem sobretudo em lookbehind, recursão e escapes de propriedades unicode (\\p{Script=Greek}, que em JS exige a flag u).",
            "Tudo aqui executa no seu navegador com o RegExp nativo do JavaScript — suas strings de teste, que podem ser linhas de log, payloads de API ou dados de clientes, nunca saem do dispositivo. Essa é a diferença estrutural em relação a serviços que enviam seu padrão e seus dados de amostra a um servidor, onde um colar de dados de produção durante uma depuração vira uma cópia nos logs de outra pessoa. Aqui nada é enviado, guardado ou compartilhado; feche a aba e acabou.",
          ],
        },
      ],
    },
  },
});
