import { DevEncoderEngine } from "../_engines/dev-engine-encoder";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "url-encoder",
  category: "developer",
  icon: "link",
  engine: { component: DevEncoderEngine, props: { codec: "url-encode" } },
  related: ["url-decoder", "base64-encoder", "base64-decoder", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "html-minifier", "json-path-query"],
  copy: {
    en: {
      name: "URL Encoder",
      tagline:
        "Percent-encode URLs and query strings online — choose component encoding or full URI encoding, with live output for links, parameters and path segments.",
      intro: [
        "Paste any text or URL and see the percent-encoded result live. Two modes cover the two real-world cases: component encoding (encodeURIComponent) escapes every reserved character for a single parameter value, while full URI encoding (encodeURI) keeps the URL structure — :, /, ? and & — intact. It is the everyday tool for building query strings by hand.",
        "Encoding follows percent-encoding from RFC 3986: unreserved characters (A–Z, a–z, 0–9, - . _ ~) pass through untouched, and every other byte becomes a %XX escape. Non-ASCII text is first converted to UTF-8, so é becomes %C3%A9 and 日 becomes %E6%97%A5 — the same output as encodeURIComponent in every language.",
        "The two modes differ concretely: component encoding escapes the 11 reserved characters including =, & and ?, so a value like a=1&b=2 becomes a%3D1%26b%3D2 and cannot break the surrounding query string; URI encoding leaves those separators alone and is meant only for a complete URL you are embedding somewhere else.",
        "Spaces are the classic trap: strict RFC 3986 encoding yields %20, while HTML form submission (application/x-www-form-urlencoded) historically used +. This tool produces the unambiguous %20 form, which round-trips correctly everywhere; a search-and-replace in an editor can't, because which characters are reserved depends on the URI component.",

      ],
      steps: [
        "Paste the text, parameter value or URL to encode.",
        "Choose component encoding for a value, or full URI to keep the URL structure.",
        "Copy the encoded result straight into your link or request.",
      ],
      faqs: [
        {
          q: "When should I use encodeURIComponent instead of encodeURI?",
          a: "Use encodeURIComponent for individual values you insert into a URL — it escapes &, =, ?, / and more, so a value can never break the query string. Use encodeURI only for a complete URL you want to make transport-safe while keeping its structure.",
        },
        {
          q: "Why do spaces become %20 and not +?",
          a: "%20 is the standard percent-encoding of a space; the + shortcut is a form-encoding convention handled separately by application/x-www-form-urlencoded. This tool uses the standard %20.",
        },
        {
          q: "Does it handle non-Latin characters?",
          a: "Yes — characters outside ASCII are UTF-8 encoded first, then percent-encoded, exactly as browsers do.",
        },
      ],
      deepDive: [
        {
          heading: "Reserved characters and the two encoding modes",
          paragraphs: [
            "A URL is built from characters with jobs: / separates path segments, ? starts the query, & separates parameters, = joins a key to its value, : and // anchor the scheme. RFC 3986 calls these reserved because they are part of the URL's grammar, and that is exactly where the two modes diverge. Component encoding treats your entire input as one inert value — every reserved character is escaped, so a=b&c=d becomes a%3Db%26c%3Dd and travels as a single parameter instead of rewriting the query string.",
            "Full URI encoding assumes you have a complete, already-structured URL and only wants it transport-safe: the structural characters stay literal, and anything outside the unreserved set (letters, digits, - . _ ~) is escaped. Encoding a whole URL with component mode is the classic mistake — you get %3A%2F%2F everywhere and the link stops being a link.",
            "The safe rule of thumb: encode each value separately with component mode, then join them into the URL by hand. If you find yourself encoding a URL inside another URL — a redirect target, a callback parameter — the inner one is a value, so it gets component encoding even though it looks like a URL.",
          ],
        },
        {
          heading: "The plus-space ambiguity and UTF-8 behind every %XX",
          paragraphs: [
            "Spaces have two encodings in the wild, and mixing them is a perennial source of bugs. The standards-based form is %20: RFC 3986 percent-encodes the space like any other byte. The + form comes from HTML form submission under application/x-www-form-urlencoded, an older convention that predates careful spec work. Some servers and frameworks decode + back into a space — but only in form-encoded bodies and query strings under that convention; in a path segment, a literal + usually means a plus.",
            "This tool always emits %20, which decodes correctly everywhere. The practical consequence: if you paste a form-encoded string containing + into a plain percent-decoder, you may get plus signs instead of spaces — that is not a bug, it is the two conventions colliding.",
            "Non-ASCII text has one extra layer: characters are first converted to UTF-8 bytes, then each byte is percent-escaped. That is why é becomes %C3%A9 — two bytes — and why a single Japanese character can turn into nine escape sequences. Modern browsers show you the pretty Unicode URL in the address bar, but what travels on the wire is always the escaped form.",
          ],
        },
        {
          heading: "Encoding happens locally, byte by byte",
          paragraphs: [
            "URLs often carry data you would rather not share: tracking parameters, session tokens, OAuth redirect URIs, internal endpoints with identifiers. Pasting one into a random online encoder that proxies to a server is unnecessary exposure. Here the conversion runs in your browser's JavaScript — the input never leaves your device, and there is no server to log it.",
            "Being local also means being offline and instant. No round-trip latency, no size caps imposed by an API, no rate limiting when you are encoding a batch of parameters one at a time. Pair it with the URL decoder to verify: encode, decode, and confirm you get the original bytes back — a two-second round trip that catches mode-selection mistakes before they reach production.",
            "One debugging habit worth adopting: when a link misbehaves, decode it fully and inspect what actually arrived. Most broken URLs are double-encoded (the %25 of a percent sign appearing once too often) or encoded with the wrong mode — both visible immediately once you look at the decoded form.",
          ],
        },
      ],
    },
    zh: {
      name: "URL 编码",
      tagline: "在线百分号编码 URL 和查询字符串——组件编码或整条 URI 编码任选,链接、参数、路径段实时转义,一键复制。",
      intro: [
        "粘贴任意文本或 URL,百分号编码结果实时呈现。两种模式对应两种真实场景:组件编码(encodeURIComponent)会转义所有保留字符,适合单个参数值;整条 URI 编码(encodeURI)保留 :、/、?、& 等 URL 结构。",
        "手工拼查询字符串、把 URL 嵌进另一个 URL、生成 mailto 链接,或让带空格、& 和非拉丁字符的值安全通过 GET 参数时必备。",
      ],
      steps: [
        "粘贴要编码的文本、参数值或 URL。",
        "参数值选组件编码;想保留 URL 结构选整条 URI 编码。",
        "把编码结果直接复制进你的链接或请求。",
      ],
      faqs: [
        {
          q: "什么时候用 encodeURIComponent,什么时候用 encodeURI?",
          a: "要塞进 URL 的单个值用 encodeURIComponent——它转义 &、=、?、/ 等,值永远不会破坏查询串。只有想保留结构的完整 URL 才用 encodeURI 做传输安全化。",
        },
        {
          q: "为什么空格变成 %20 而不是 +?",
          a: "%20 是空格的标准百分号编码;+ 是 application/x-www-form-urlencoded 表单编码的约定,属于另一套机制。本工具使用标准的 %20。",
        },
        {
          q: "支持非拉丁字符吗?",
          a: "支持——ASCII 之外的字符先做 UTF-8 编码再百分号转义,与浏览器的行为一致。",
        },
      ],
      deepDive: [
        {
          heading: "保留字符与两种编码模式",
          paragraphs: [
            "URL 里的字符是有职责的:/ 分隔路径段,? 开启查询串,& 分隔参数,= 连接键和值,: 和 // 锚定协议。RFC 3986 把它们称为保留字符,因为它们是 URL 语法的骨架——两种模式的分歧正在于此。组件编码把你的整个输入当成一个惰性的值,所有保留字符都被转义:a=b&c=d 变成 a%3Db%26c%3Dd,作为一个完整参数原样传输,不会改写外层的查询串。",
            "整条 URI 编码的前提是你手里已经是一条结构完整的 URL,只是要它传输安全:结构性字符保持原样,保留集之外的部分(字母、数字、- . _ ~)才被转义。把整条 URL 用组件模式编码是经典错误——你会得到满屏 %3A%2F%2F,链接就不再是链接。",
            "稳妥的经验法则:先用组件模式逐个编码每个值,再手工拼成 URL。如果发现要把一条 URL 塞进另一条 URL——跳转目标、callback 参数——里面那条是一个值,尽管它长得像 URL,也要用组件编码。",
          ],
        },
        {
          heading: "加号与空格的歧义,以及每个 %XX 背后的 UTF-8",
          paragraphs: [
            "空格在现实中存在两种编码,混用是经久不衰的 bug 来源。标准形态是 %20:RFC 3986 把空格像其他字节一样百分号转义。+ 形态来自 HTML 表单提交的 application/x-www-form-urlencoded,一套早于严谨规范工作的旧约定。有些服务器和框架会把 + 解码回空格——但只在那套约定的表单体和查询串里;在路径段中,字面 + 通常就是加号。",
            "本工具始终输出 %20,它在任何地方都能正确解码。实际后果是:如果把含 + 的表单编码字符串粘进普通百分号解码器,可能得到加号而不是空格——这不是 bug,是两套约定在打架。",
            "非 ASCII 文本多一层转换:先转成 UTF-8 字节,再逐字节百分号转义。所以 é 变成 %C3%A9——两个字节;一个日文字符能展开成九段转义序列。现代浏览器地址栏显示的是好看的 Unicode,但真正在线上跑的永远是转义后的形态。",
          ],
        },
        {
          heading: "编码在本机逐字节完成",
          paragraphs: [
            "URL 里常常带着你不愿示人的数据:埋点参数、会话 token、OAuth 回调地址、带内部标识的端点。把这种东西粘进一个会转发到服务器的在线编码器,是完全没有必要的暴露。这里的转换在浏览器 JavaScript 里完成——输入不离开设备,也没有服务器可以记日志。",
            "本地还意味着离线、即时。没有往返延迟,没有 API 设的大小上限,逐个编码一批参数时也没有速率限制。配合 URL 解码工具做个闭环验证:编码、解码、确认拿回原字节——花两秒就能在上线前抓住选错模式的问题。",
            "值得养成的调试习惯:链接行为不对时,先完整解码再检查实际传过去的是什么。大多数坏 URL 要么被双重编码(百分号的 %25 出现了两次)要么用错了模式——看过解码后的形态,这两种问题一眼可见。",
          ],
        },
      ],
    },
    ja: {
      name: "URL エンコーダー",
      tagline:
        "URL やクエリ文字列をオンラインでパーセントエンコード。コンポーネント方式と URI 全体方式を選べ、リンク・パラメータ・パスにそのまま使えます。",
      intro: [
        "テキストや URL を貼り付けると、パーセントエンコード結果がリアルタイムに表示されます。2 つのモードが実務の 2 例に対応:コンポーネント方式(encodeURIComponent)は 1 つのパラメータ値に必要なすべての予約文字をエスケープし、URI 全体方式(encodeURI)は :、/、?、& などの構造を保ったまま安全化します。",
        "クエリ文字列の手組み、URL の中への URL 埋め込み、mailto リンクの生成、空白や &・非ラテン文字を含む値の GET 送信に必須です。",
      ],
      steps: [
        "エンコードしたいテキスト・パラメータ値・URL を貼り付けます。",
        "値にはコンポーネント方式、URL 構造を残したい場合は URI 全体方式を選びます。",
        "エンコード結果をリンクやリクエストにそのままコピーします。",
      ],
      faqs: [
        {
          q: "encodeURI ではなく encodeURIComponent を使うのはいつ?",
          a: "URL に挿入する個々の値には encodeURIComponent を使います。&・=・?・/ などもエスケープされるため、値がクエリ文字列を壊しません。encodeURI は、構造を保ったまま URL 全体を安全化したいときだけ使います。",
        },
        {
          q: "スペースが %20 になり + にならないのはなぜ?",
          a: "%20 がスペースの標準的なパーセントエンコーディングです。+ は application/x-www-form-urlencoded の別規約です。このツールは標準の %20 を使います。",
        },
        {
          q: "非ラテン文字にも対応しますか?",
          a: "はい。ASCII 外の文字はまず UTF-8 でエンコードされ、その後パーセントエンコードされます。ブラウザと同じ挙動です。",
        },
      ],
      deepDive: [
        {
          heading: "予約文字と 2 つのエンコード方式",
          paragraphs: [
            "URL の文字には役割があります。/ はパスセグメントの区切り、? はクエリの開始、& はパラメータの区切り、= はキーと値の接続、: と // はスキームの固定です。RFC 3986 はこれらを「予約文字」と呼びます。URL の文法の骨格だからで、2 つの方式の分かれ目もここにあります。コンポーネント方式は入力全体を不活性な 1 つの値として扱い、予約文字を全部エスケープします。a=b&c=d は a%3Db%26c%3Dd になり、クエリ文字列を書き換えずに 1 個のパラメータとして運ばれます。",
            "URI 全体方式は、手元に構造が完成した URL があり、それを転送安全にしたいだけという前提です。構造を担う文字はリテラルのまま残り、非予約集合(英字・数字・- . _ ~)の外だけがエスケープされます。URL 全体をコンポーネント方式でエンコードするのが定番の失敗です。%3A%2F%2F だらけになり、リンクはもうリンクではありません。",
            "安全な経験則はこうです。値を 1 個ずつコンポーネント方式でエンコードし、手で URL に組み立てる。URL を別の URL の中に入れる——リダイレクト先、callback パラメータ——場合、内側は「値」なので、URL に見えてもコンポーネント方式を使います。",
          ],
        },
        {
          heading: "プラスと空白の曖昧さ、そして %XX の裏の UTF-8",
          paragraphs: [
            "空白には現場で 2 つの符号化があり、混在は絶えないバグの温床です。標準の形は %20 です。RFC 3986 は空白も他のバイト同様にパーセントエンコードします。+ の形は HTML フォーム送信の application/x-www-form-urlencoded に由来する、厳密な仕様策定より古い慣行です。サーバーやフレームワークの一部は + を空白へ復号しますが、それはその慣行のフォームボディとクエリ文字列に限ります。パスセグメントではリテラルの + は普通にプラス記号です。",
            "このツールは常に %20 を出します。どこでも正しく復号される形です。実際面の帰結として、+ を含むフォームエンコード文字列を普通のパーセント復号器に貼ると、空白ではなくプラス記号が出ることがあります。これはバグではなく、2 つの慣行の衝突です。",
            "非 ASCII テキストにはもう一段層があります。文字をまず UTF-8 のバイト列に変え、各バイトをパーセントエスケープします。é が %C3%A9(2 バイト)になるのはこのためで、日本語 1 文字が 9 個のエスケープに展開されることもあります。モダンブラウザのアドレスバーは整形済みの Unicode を見せますが、回線を流れるのは常にエスケープ後の形です。",
          ],
        },
        {
          heading: "エンコードは端末内でバイト単位に",
          paragraphs: [
            "URL には見られたくないデータが乗ることがあります。トラッキングパラメータ、セッショントークン、OAuth のリダイレクト URI、内部 ID 入りエンドポイント。サーバーへ中継する未知のオンラインエンコーダーに貼るのは、不要な露出でしかありません。ここでは変換がブラウザの JavaScript で完結し、入力は端末の外に出ず、記録するサーバーも存在しません。",
            "ローカルであることはオフラインで即時ということでもあります。往復の遅延はなく、API 由来のサイズ上限もなく、パラメータを 1 個ずつ処理してもレート制限はありません。URL デコーダーと対にして検証しましょう。エンコードして、復号して、元のバイトが戻ることを確認する。2 秒の往復で、方式選択のミスを本番前に潰せます。",
            "身につけておきたいデバッグ習慣が一つあります。リンクの挙動がおかしいとき、まず完全に復号して実際に届いたものを見る。壊れた URL の大半は二重エンコード(パーセント記号の %25 が一度余計に現れる)か、方式の取り違えです。復号形を見ればどちらも一目で分かります。",
          ],
        },
      ],
    },
    es: {
      name: "Codificador URL",
      tagline:
        "Codifica en porcentaje URLs y cadenas de consulta en línea: elige codificación de componente o de URI completa, con salida en vivo para enlaces y parámetros.",
      intro: [
        "Pega cualquier texto o URL y ve el resultado percent-encoded en vivo. Dos modos cubren los dos casos reales: la codificación de componente (encodeURIComponent) escapa todos los caracteres reservados para un valor de parámetro, mientras que la de URI completa (encodeURI) mantiene la estructura — :, /, ? y & — intacta.",
        "Imprescindible al construir cadenas de consulta a mano, incrustar URLs dentro de otras URLs, generar enlaces mailto o pasar valores con espacios, ampersands y caracteres no latinos por parámetros GET.",
      ],
      steps: [
        "Pega el texto, el valor del parámetro o la URL a codificar.",
        "Elige codificación de componente para un valor, o URI completa para conservar la estructura.",
        "Copia el resultado codificado directo a tu enlace o petición.",
      ],
      faqs: [
        {
          q: "¿Cuándo uso encodeURIComponent en vez de encodeURI?",
          a: "Usa encodeURIComponent para valores individuales que insertas en una URL — escapa &, =, ?, / y más, así que un valor nunca rompe la cadena de consulta. Usa encodeURI solo para una URL completa que quieras hacer segura manteniendo su estructura.",
        },
        {
          q: "¿Por qué los espacios se vuelven %20 y no +?",
          a: "%20 es la codificación porcentual estándar del espacio; el atajo + es una convención de form-encoding (application/x-www-form-urlencoded). Esta herramienta usa el %20 estándar.",
        },
        {
          q: "¿Maneja caracteres no latinos?",
          a: "Sí — los caracteres fuera del ASCII se codifican primero en UTF-8 y luego en porcentaje, exactamente como hacen los navegadores.",
        },
      ],
      deepDive: [
        {
          heading: "Caracteres reservados y los dos modos de codificación",
          paragraphs: [
            "Los caracteres de una URL tienen funciones: / separa segmentos de ruta, ? abre la consulta, & separa parámetros, = une clave y valor, : y // anclan el esquema. El RFC 3986 los llama reservados porque son el esqueleto de la gramática de la URL, y ahí mismo divergen los dos modos. La codificación de componente trata toda tu entrada como un valor inerte — escapa todos los reservados, así que a=b&c=d se convierte en a%3Db%26c%3Dd y viaja como un único parámetro sin reescribir la cadena de consulta.",
            "La codificación de URI completa asume que ya tienes una URL estructurada y solo quieres que sea segura para el transporte: los caracteres estructurales quedan literales y solo se escapa lo que está fuera del conjunto no reservado (letras, dígitos, - . _ ~). Codificar una URL entera en modo componente es el error clásico — acabas con %3A%2F%2F por todas partes y el enlace deja de ser un enlace.",
            "La regla segura: codifica cada valor por separado en modo componente y arma la URL a mano después. Cuando necesitas meter una URL dentro de otra URL — un destino de redirección, un parámetro de callback — la de adentro es un valor, así que recibe codificación de componente aunque parezca una URL.",
          ],
        },
        {
          heading: "La ambigüedad del más-espacio y el UTF-8 detrás de cada %XX",
          paragraphs: [
            "El espacio tiene dos codificaciones en la naturaleza, y mezclarlas es una fuente de errores interminable. La forma estándar es %20: el RFC 3986 escapa el espacio como cualquier otro byte. La forma + viene del envío de formularios HTML bajo application/x-www-form-urlencoded, una convención anterior al trabajo riguroso de especificación. Algunos servidores y frameworks decodifican + de vuelta a espacio — pero solo en cuerpos form-encoded y cadenas de consulta bajo esa convención; en un segmento de ruta, un + literal suele ser un signo más.",
            "Esta herramienta emite siempre %20, que se decodifica bien en todas partes. La consecuencia práctica: si pegas una cadena form-encoded con + en un decodificador porcentual simple, puedes obtener signos más en lugar de espacios — no es un fallo, es el choque de dos convenciones.",
            "El texto no ASCII lleva una capa extra: primero se convierte a bytes UTF-8 y luego cada byte se escapa en porcentaje. Por eso é se convierte en %C3%A9 — dos bytes — y un solo carácter japonés puede convertirse en nueve secuencias de escape. Los navegadores modernos te muestran la URL Unicode bonita en la barra de direcciones, pero lo que viaja por el cable es siempre la forma escapada.",
          ],
        },
        {
          heading: "La codificación ocurre en local, byte a byte",
          paragraphs: [
            "Las URL a menudo llevan datos que preferirías no compartir: parámetros de seguimiento, tokens de sesión, URIs de redirección OAuth, endpoints internos con identificadores. Pegarlas en un codificador online aleatorio que hace proxy a un servidor es exposición innecesaria. Aquí la conversión corre en el JavaScript de tu navegador — la entrada nunca sale de tu dispositivo y no hay servidor que la registre.",
            "Ser local significa también ser offline e instantáneo. Sin latencia de ida y vuelta, sin límites de tamaño impuestos por una API, sin rate limiting cuando codificas un lote de parámetros uno a uno. Combínalo con el decodificador URL para verificar: codifica, decodifica y confirma que recuperas los bytes originales — un ciclo de dos segundos que caza los errores de modo antes de llegar a producción.",
            "Un hábito de depuración que vale la pena: cuando un enlace se porta mal, decodifícalo por completo e inspecciona qué llegó de verdad. La mayoría de las URL rotas están doblemente codificadas (el %25 del signo porcentaje aparece de más) o codificadas con el modo equivocado — ambas cosas se ven de inmediato al mirar la forma decodificada.",
          ],
        },
      ],
    },
    pt: {
      name: "Codificador de URL",
      tagline:
        "Codifique URLs e query strings com percent-encoding on-line — escolha codificação de componente ou URI completa, com saída ao vivo para links e parâmetros.",
      intro: [
        "Cole qualquer texto ou URL e veja o resultado percent-encoded ao vivo. Dois modos cobrem os dois casos reais: a codificação de componente (encodeURIComponent) escapa todos os caracteres reservados para um valor de parâmetro, enquanto a de URI completa (encodeURI) mantém a estrutura — :, /, ? e & — intacta.",
        "Essencial para montar query strings na mão, embutir URLs dentro de outras URLs, gerar links mailto ou passar valores com espaços, e-comercial e caracteres não latinos em parâmetros GET.",
      ],
      steps: [
        "Cole o texto, o valor do parâmetro ou a URL para codificar.",
        "Escolha codificação de componente para um valor, ou URI completa para manter a estrutura.",
        "Copie o resultado codificado direto para o seu link ou requisição.",
      ],
      faqs: [
        {
          q: "Quando uso encodeURIComponent em vez de encodeURI?",
          a: "Use encodeURIComponent para valores individuais inseridos numa URL — ele escapa &, =, ?, / e mais, então um valor nunca quebra a query string. Use encodeURI só para uma URL completa que você quer tornar segura mantendo a estrutura.",
        },
        {
          q: "Por que espaços viram %20 e não +?",
          a: "%20 é o percent-encoding padrão do espaço; o atalho + é uma convenção do form-encoding (application/x-www-form-urlencoded). Esta ferramenta usa o %20 padrão.",
        },
        {
          q: "Lida com caracteres não latinos?",
          a: "Sim — caracteres fora do ASCII são codificados em UTF-8 primeiro e depois em percent-encoding, exatamente como os navegadores fazem.",
        },
      ],
      deepDive: [
        {
          heading: "Caracteres reservados e os dois modos de codificação",
          paragraphs: [
            "Os caracteres de uma URL têm funções: / separa segmentos de caminho, ? abre a query, & separa parâmetros, = liga chave e valor, : e // ancoram o esquema. O RFC 3986 os chama de reservados porque são o esqueleto da gramática da URL — e é exatamente aí que os dois modos divergem. A codificação de componente trata toda a sua entrada como um valor inerte — escapa todos os reservados, então a=b&c=d vira a%3Db%26c%3Dd e viaja como um único parâmetro sem reescrever a query string.",
            "A codificação de URI completa assume que você já tem uma URL estruturada e só quer torná-la segura para transporte: os caracteres estruturais ficam literais, e só escapa o que está fora do conjunto não reservado (letras, dígitos, - . _ ~). Codificar uma URL inteira em modo componente é o erro clássico — você termina com %3A%2F%2F por toda parte e o link deixa de ser um link.",
            "A regra segura: codifique cada valor separadamente em modo componente e monte a URL à mão depois. Quando você precisa colocar uma URL dentro de outra — um destino de redirecionamento, um parâmetro de callback — a de dentro é um valor, então recebe codificação de componente mesmo parecendo uma URL.",
          ],
        },
        {
          heading: "A ambiguidade do mais-espaço e o UTF-8 por trás de cada %XX",
          paragraphs: [
            "O espaço tem duas codificações na natureza, e misturá-las é uma fonte interminável de bugs. A forma padrão é %20: o RFC 3986 escapa o espaço como qualquer outro byte. A forma + vem do envio de formulários HTML sob application/x-www-form-urlencoded, uma convenção anterior ao trabalho rigoroso de especificação. Alguns servidores e frameworks decodificam + de volta para espaço — mas só em corpos form-encoded e query strings sob essa convenção; num segmento de caminho, um + literal geralmente é um sinal de mais.",
            "Esta ferramenta sempre emite %20, que decodifica corretamente em todo lugar. A consequência prática: se você colar uma string form-encoded com + num decodificador percentual simples, pode receber sinais de mais em vez de espaços — não é um defeito, é o choque de duas convenções.",
            "Texto não ASCII tem uma camada extra: primeiro os caracteres viram bytes UTF-8, depois cada byte é escapado em porcentagem. Por isso é vira %C3%A9 — dois bytes — e um único caractere japonês pode virar nove sequências de escape. Navegadores modernos mostram a URL Unicode bonita na barra de endereço, mas o que trafega na rede é sempre a forma escapada.",
          ],
        },
        {
          heading: "A codificação acontece localmente, byte a byte",
          paragraphs: [
            "URLs costumam carregar dados que você preferiria não compartilhar: parâmetros de rastreamento, tokens de sessão, URIs de redirecionamento OAuth, endpoints internos com identificadores. Colar isso num codificador online aleatório que faz proxy para um servidor é exposição desnecessária. Aqui a conversão roda no JavaScript do seu navegador — a entrada nunca sai do seu dispositivo e não há servidor para registrá-la.",
            "Ser local também significa ser offline e instantâneo. Sem latência de ida e volta, sem limites de tamanho impostos por uma API, sem rate limiting quando você codifica um lote de parâmetros um por um. Combine com o decodificador de URL para verificar: codifique, decodifique e confirme que recuperou os bytes originais — um ciclo de dois segundos que caza erros de escolha de modo antes de chegarem à produção.",
            "Um hábito de depuração que vale adotar: quando um link se comporta mal, decodifique por completo e inspecione o que realmente chegou. A maioria das URLs quebradas está duplamente codificada (o %25 do sinal de porcentagem aparecendo uma vez a mais) ou codificada no modo errado — as duas coisas ficam visíveis de imediato ao olhar a forma decodificada.",
          ],
        },
      ],
    },
  },
});
