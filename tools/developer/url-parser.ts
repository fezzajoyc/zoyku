import { DevUrlParserEngine } from "../_engines/dev-url-parser";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "url-parser",
  category: "developer",
  icon: "link",
  engine: {
    component: DevUrlParserEngine,
    props: {
      sample: "https://example.com/shop/shoes?color=red&size=42&utm_source=newsletter#reviews",
    },
  },
  related: ["url-decoder", "url-encoder", "http-status-codes", "jwt-decoder", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "html-minifier"],
  copy: {
    en: {
      name: "URL Parser",
      tagline:
        "Paste any URL and see it decomposed live: protocol, host, port, each path segment, decoded query parameters and hash — with copy as JSON.",
      intro: [
        "A URL hides a dozen pieces of data in one line. This tool splits it into labeled rows — scheme, host, port, every path segment on its own line, each query parameter with its key and decoded value, plus the fragment — so you can audit tracking links, debug routing or reverse-engineer an API call.",
        "Parsing uses the browser's native URL API: values are decoded exactly the way the receiving server will decode them. URLs without a scheme get https:// assumed, and malformed input gets a plain-language error instead of a crash.",
      ],
      steps: [
        "Paste the URL into the input box.",
        "Read the decomposed table: parts, segments and parameters update live.",
        "Copy as JSON when you need the breakdown in code or documentation.",
      ],
      faqs: [
        {
          q: "What happens if I paste a URL without https://?",
          a: "The tool assumes https:// and tries again, since that is what browsers do for bare domains. A scheme you typed explicitly is always kept as-is.",
        },
        {
          q: "Are query values decoded?",
          a: "Yes. Keys and values are decoded via the URL standard, so %20 becomes a space and %2F becomes a slash, exactly as the server would read them.",
        },
        {
          q: "What about duplicate query keys like ?tag=a&tag=b?",
          a: "Each occurrence gets its own row, and the JSON export lists them as separate key/value pairs so nothing is silently overwritten.",
        },
      ],
      deepDive: [
        {
          heading: "Anatomy of a URL: the parts that matter",
          paragraphs: [
            "A URL has more structure than it appears to. In the WHATWG URL standard that browsers implement, a URL like https://example.com:8443/shop/shoes?color=red#reviews splits into scheme (https), host (example.com), port (8443 — https defaults to 443, so the URL is equivalent without it), path (/shop/shoes), query (?color=red) and fragment (#reviews). The fragment is special: it is never sent to the server, existing only in the browser — which is why single-page applications use it, and why you cannot detect it server-side.",
            "The path is not one opaque string but a hierarchy of segments. Splitting each segment onto its own line makes routing patterns visible: /shop/shoes is a collection with an item, and redirects or rewrites usually operate on segments rather than the whole path. Seeing them separately also exposes oddities like double slashes or empty segments that a single string hides.",
            "Ports, userinfo (the user:pass@host form, deprecated but still parsed) and even IPv6 hosts in square brackets are all part of the standard grammar. The browser's URL API handles all of it — which is exactly why this tool delegates to that API instead of a hand-rolled regex: the decomposition you see is the decomposition the server sees.",
          ],
        },
        {
          heading: "Encoding, decoding and the classic % pitfalls",
          paragraphs: [
            "Percent-encoding is where URL parsing gets subtle. A value like a%2Fb decodes to a/b — but if that value was encoded because it genuinely contains a slash, decoding it for display is correct, while treating it as a path separator would be wrong. This tool decodes keys and values exactly as the receiving server will, so what you read is what the application sees.",
            "The difference between + and %20 catches many people. In the application/x-www-form-urlencoded convention (forms, some frameworks), a space is written as +; in the URL standard proper, + is just a plus. The same string ?q=a+b therefore means q=a b or q=a+b depending on the framework. When in doubt, paste the parameter here and compare with what your backend logs.",
            "Encoding is also an audit tool: utm_source, fbclid, gclid and friends in a parsed list make tracking parameters impossible to miss. Stripping them from a link before sharing it is a small privacy win — the parameters exist to attribute you to a campaign, and they ride along into every copied URL unless you notice them.",
          ],
        },
        {
          heading: "Parsing happens in your browser",
          paragraphs: [
            "URLs you inspect are not always harmless: signed links (S3 pre-signed URLs, OAuth callbacks with code=… or token=…) carry credentials in the query string. Pasting one into a server-based parser would transmit a working credential to whoever runs it. This tool parses with your browser's native URL API, entirely locally — nothing leaves the device.",
            "Local parsing also means you can throw junk at it safely. A URL that is nearly malformed (missing scheme, stray spaces, unencoded characters) is accepted or explained, not rejected with a stack trace — because the browser's URL parser is more forgiving than a strict validator and matches what a server will actually receive.",
            "Chain it with the URL decoder when you need to inspect encoded segments manually, or with the encoder when building query strings — parse, adjust, re-encode is a faster loop than editing raw URLs by hand and hoping.",
          ],
        },
      ],
    },
    zh: {
      name: "URL 解析器",
      tagline: "粘贴任意 URL,实时拆解为协议、主机、端口、逐级路径、解码后的查询参数和锚点,并可一键复制为 JSON。",
      intro: [
        "一行 URL 里藏着十几段信息。这个工具把它拆成带标签的行——协议、主机、端口、每级路径单独一行、每个查询参数的键和解码后的值,加上锚点——排查推广链接、调试路由或逆向 API 调用时一目了然。",
        "解析使用浏览器原生 URL API:值的解码方式和接收服务器完全一致。没有协议头的 URL 会自动按 https:// 重试,畸形输入会给出友好提示而不是报错崩溃。",
      ],
      steps: [
        "把 URL 粘贴进输入框。",
        "阅读拆解结果:各部分、路径段和参数实时更新。",
        "需要写进代码或文档时,点击复制为 JSON。",
      ],
      faqs: [
        {
          q: "粘贴不带 https:// 的 URL 会怎样?",
          a: "工具会自动补上 https:// 重试,和浏览器处理裸域名的行为一致;如果显式写了协议头,则原样保留。",
        },
        {
          q: "查询参数的值会解码吗?",
          a: "会。键和值都按 URL 标准解码,%20 变空格、%2F 变斜杠,与服务器读取到的一致。",
        },
        {
          q: "像 ?tag=a&tag=b 这样重复的键怎么处理?",
          a: "每次出现各占一行,JSON 导出中也是独立的键值对,不会被悄悄覆盖。",
        },
      ],
      deepDive: [
        {
          heading: "一条 URL 的解剖:值得看的部分",
          paragraphs: [
            "URL 的结构比看上去多。在浏览器实现的 WHATWG URL 标准里,https://example.com:8443/shop/shoes?color=red#reviews 会拆成协议(https)、主机(example.com)、端口(8443——https 默认 443,所以省略时等价)、路径(/shop/shoes)、查询(?color=red)和锚点(#reviews)。锚点比较特殊:它永远不会发送到服务器,只存在于浏览器中——单页应用用它做路由,服务端也正因如此无法感知它。",
            "路径不是一整段不透明的字符串,而是逐级的段。把每一段单独一行,路由模式一目了然:/shop/shoes 是“集合 + 条目”结构,重定向和改写规则通常按段操作而不是整条路径。分开看还能暴露单个字符串藏不住的问题——双斜杠、空段。",
            "端口、userinfo(已废弃但仍在解析的 user:pass@host 形式)、方括号里的 IPv6 主机,都是标准语法的一部分。浏览器的 URL API 全都处理——这正是本工具直接委托该 API 而不用手写正则的原因:你看到的拆解,就是服务器看到的拆解。",
          ],
        },
        {
          heading: "编码、解码与 % 的经典坑",
          paragraphs: [
            "百分号编码是 URL 解析最微妙的地方。a%2Fb 解码后是 a/b——如果它当初被编码是因为确实含斜杠,那么展示时解码是对的,但把它当路径分隔符就是错的。本工具按键值将与接收服务器完全一致的方式解码,你读到的就是应用读到的。",
            "+ 和 %20 的区别坑过很多人。在 application/x-www-form-urlencoded 约定(表单、部分框架)里,空格写成 +;在 URL 标准本身里,+ 就是加号。同一个 ?q=a+b 因此既可能表示 q=a b,也可能表示 q=a+b,取决于框架。拿不准时,把参数贴到这里,和后端日志对照。",
            "编码也是审计工具:解析后的列表让 utm_source、fbclid、gclid 之类的追踪参数无处藏身。分享前把这些参数剥掉是个小而实在的隐私改进——它们存在的意义就是把你的点击归因到某次投放,而且只要你没注意到,它们会跟着每一次复制一路传下去。",
          ],
        },
        {
          heading: "解析发生在你的浏览器里",
          paragraphs: [
            "你检查的 URL 不总是无害的:签名链接(S3 预签名 URL、带 code=… 或 token=… 的 OAuth 回调)把凭据放在查询串里。贴给一个服务端解析器,等于把一份有效凭据传给运营者。本工具用浏览器原生 URL API 完全在本地解析——什么都不离开设备。",
            "本地解析也意味着可以放心地喂垃圾进去。接近畸形(缺协议头、杂散空格、未编码字符)的 URL 会被接受或给出解释,而不是甩一串堆栈——因为浏览器的 URL 解析器比严格校验器宽容,和服务器实际收到的东西一致。",
            "需要手动检查编码段时接着用 URL 解码工具,构造查询串时用编码工具——“解析、调整、再编码”的循环,比徒手改原始 URL 再祈祷快得多。",
          ],
        },
      ],
    },
    ja: {
      name: "URL パーサー",
      tagline:
        "URL を貼り付けるとプロトコル・ホスト・ポート・各パスセグメント・デコード済みクエリ・ハッシュにリアルタイム分解、JSON コピーも可能。",
      intro: [
        "1 行の URL には多くの情報が詰まっています。このツールはスキーム、ホスト、ポート、各パスセグメント、クエリのキーとデコード済みの値、フラグメントを行ごとに分解します。トラッキングリンクの監査、ルーティングのデバッグ、API 呼び出しの解析に役立ちます。",
        "解析にはブラウザ純正の URL API を使用し、値は受信サーバーと同じ規則でデコードされます。スキームのない URL は https:// を補って再試行し、不正な入力にはクラッシュではなくわかりやすいエラーを表示します。",
      ],
      steps: [
        "URL を入力欄に貼り付けます。",
        "分解結果を読みます:各部・セグメント・パラメータはリアルタイム更新。",
        "コードや文書に使うときは「JSON としてコピー」を押します。",
      ],
      faqs: [
        {
          q: "https:// を付けずに貼るとどうなりますか?",
          a: "ブラウザが素のドメインに対してそうするように、https:// を補って再試行します。明示的に書かれたスキームはそのまま使われます。",
        },
        {
          q: "クエリの値はデコードされますか?",
          a: "はい。キーと値は URL 標準に従ってデコードされ、%20 は空白、%2F はスラッシュになります。サーバーが読むのと同じ結果です。",
        },
        {
          q: "?tag=a&tag=b のような重複キーは?",
          a: "出現ごとに別の行として表示し、JSON 書き出しでも独立したキーと値のペアになるため、上書きされることはありません。",
        },
      ],
      deepDive: [
        {
          heading: "URL の解剖:見るべき部分",
          paragraphs: [
            "URL は見た目より構造を持っています。ブラウザが実装する WHATWG URL 標準では、https://example.com:8443/shop/shoes?color=red#reviews はスキーム(https)、ホスト(example.com)、ポート(8443——https の既定は 443 なので省略時は等価)、パス(/shop/shoes)、クエリ(?color=red)、フラグメント(#reviews)に分解されます。フラグメントは特別で、サーバーには決して送られずブラウザ内だけに存在します——SPA がそれをルーティングに使うのはこのためで、サーバー側からは感知できません。",
            "パスは不透明な一文字列ではなく、セグメントの階層です。各セグメントを行に分けるとルーティングの構造が見えてきます。/shop/shoes は「コレクション+項目」であり、リダイレクトやリライトは通常パス全体ではなくセグメント単位で行われます。分けて見ると、単一文字列では隠れる二重スラッシュや空セグメントも露呈します。",
            "ポート、userinfo(廃止予定ながら今も解析される user:pass@host 形式)、角括弧の IPv6 ホストもすべて標準文法の一部です。ブラウザの URL API はこれらを全部処理します——だからこそ本ツールは手書きの正規表現ではなくその API に委ねています。あなたが見る分解は、サーバーが見る分解と同じです。",
          ],
        },
        {
          heading: "エンコード、デコード、% の古典的落とし穴",
          paragraphs: [
            "百分率エンコーディングは URL 解析で最も微妙な部分です。a%2Fb はデコードすると a/b になります。それが本当にスラッシュを含むためにエンコードされたのなら、表示用のデコードは正しいけれど、パス区切りとして扱うのは間違いです。本ツールはキーと値を受信サーバーと同一の規則でデコードするので、あなたが読むものはアプリケーションが読むものです。",
            "+ と %20 の違いは多くの人を惑わします。application/x-www-form-urlencoded の慣習(フォーム、一部のフレームワーク)では空白は + と書きますが、URL 標準そのものでは + はただのプラスです。同じ ?q=a+b がフレームワーク次第で q=a b にも q=a+b にもなります。確信が持てないときはパラメータをここに貼り、バックエンドのログと突き合わせてください。",
            "エンコードは監査ツールにもなります。解析後のリストに utm_source、fbclid、gclid などのトラッキングパラメータが隠れ場所を持てなくなります。共有前にこれらを剥がすのは小さいけれど確かなプライバシー改善です。これらはあなたのクリックをキャンペーンに紐付けるために存在し、気づかない限りコピーのたびに付いて回ります。",
          ],
        },
        {
          heading: "解析はブラウザ内で行われる",
          paragraphs: [
            "あなたが調べる URL が無害とは限りません。署名付きリンク(S3 の事前署名 URL、code=… や token=… を持つ OAuth コールバック)はクエリ文字列に資格情報を運びます。サーバー型のパーサーに貼ることは、有効な資格情報を運営者へ送ることです。本ツールはブラウザ純正の URL API で完全にローカル解析します——何も端末の外に出ません。",
            "ローカル解析だから、変な入力も安心して投げ込めます。ほぼ不正形(スキーム欠け、余計な空白、未エンコード文字)の URL は拒否とスタックトレースではなく受け入れられるか説明されます。ブラウザの URL パーサーは厳格なバリデーターより寛容で、サーバーが実際に受信するものと一致するからです。",
            "エンコードされたセグメントを手動で調べるときは URL デコーダー、クエリ文字列を作るときはエンコーダーとつなげてください。「解析、調整、再エンコード」のループは、生の URL を手で直して祈るよりずっと速いです。",
          ],
        },
      ],
    },
    es: {
      name: "Analizador de URLs",
      tagline:
        "Pega cualquier URL y verla descompuesta en vivo: protocolo, host, puerto, cada segmento de ruta, parámetros decodificados y hash, con copia a JSON.",
      intro: [
        "Una URL esconde una docena de datos en una sola línea. Esta herramienta la separa en filas etiquetadas — esquema, host, puerto, cada segmento de ruta en su línea, cada parámetro con clave y valor decodificado, más el fragmento — para auditar enlaces de seguimiento, depurar rutas o reconstruir una llamada a una API.",
        "El análisis usa la API URL nativa del navegador: los valores se decodifican tal y como los leerá el servidor. Las URL sin esquema prueban con https://, y la entrada mal formada produce un error en lenguaje claro, no un fallo.",
      ],
      steps: [
        "Pega la URL en el cuadro de entrada.",
        "Lee la tabla descompuesta: partes, segmentos y parámetros se actualizan en vivo.",
        "Copia como JSON cuando necesites el desglose en código o documentación.",
      ],
      faqs: [
        {
          q: "¿Qué pasa si pego una URL sin https://?",
          a: "La herramienta asume https:// y reintenta, como hacen los navegadores con dominios desnudos. Un esquema escrito explícitamente se respeta tal cual.",
        },
        {
          q: "¿Se decodifican los valores de la query?",
          a: "Sí. Claves y valores se decodifican según el estándar URL: %20 pasa a espacio y %2F a barra, igual que los leerá el servidor.",
        },
        {
          q: "¿Y las claves duplicadas como ?tag=a&tag=b?",
          a: "Cada aparición tiene su propia fila, y la exportación JSON las lista como pares independientes para que nada se sobrescriba en silencio.",
        },
      ],
      deepDive: [
        {
          heading: "Anatomía de una URL: las partes que importan",
          paragraphs: [
            "Una URL tiene más estructura de la que aparenta. En el estándar WHATWG URL que implementan los navegadores, algo como https://example.com:8443/shop/shoes?color=red#reviews se separa en esquema (https), host (example.com), puerto (8443 — https usa 443 por defecto, así que la URL es equivalente sin él), ruta (/shop/shoes), query (?color=red) y fragmento (#reviews). El fragmento es especial: nunca se envía al servidor, existe solo en el navegador — por eso las aplicaciones de una sola página lo usan para enrutar, y por eso el servidor no puede detectarlo.",
            "La ruta no es una cadena opaca sino una jerarquía de segmentos. Ver cada segmento en su propia línea hace visibles los patrones de enrutado: /shop/shoes es una colección con un elemento, y las redirecciones o reescrituras suelen operar sobre segmentos, no sobre la ruta completa. Verlos por separado también expone rarezas como dobles barras o segmentos vacíos que una sola cadena esconde.",
            "Puertos, userinfo (la forma user:pass@host, desaconsejada pero aún parseada) e incluso hosts IPv6 entre corchetes forman parte de la gramática estándar. La API URL del navegador lo maneja todo — y precisamente por eso esta herramienta delega en esa API en lugar de una regex artesanal: la descomposición que ves es la descomposición que ve el servidor.",
          ],
        },
        {
          heading: "Codificación, decodificación y las trampas del %",
          paragraphs: [
            "El codificado porcentual es donde el parseo de URLs se vuelve sutil. a%2Fb se decodifica como a/b — si ese valor se codificó porque contiene de verdad una barra, decodificarlo para mostrarlo es correcto, mientras que tratarlo como separador de ruta sería un error. Esta herramienta decodifica claves y valores exactamente como lo hará el servidor receptor, así que lo que lees es lo que la aplicación ve.",
            "La diferencia entre + y %20 despista a mucha gente. En la convención application/x-www-form-urlencoded (formularios, algunos frameworks), un espacio se escribe como +; en el estándar URL en sí, + es solo un signo más. La misma cadena ?q=a+b significa q=a b o q=a+b según el framework. Si dudas, pega el parámetro aquí y compáralo con lo que registra tu backend.",
            "La decodificación también sirve para auditar: una lista parseada deja sin escondite los parámetros de rastreo — utm_source, fbclid, gclid y compañía. Quitarlos de un enlace antes de compartirlo es una pequeña victoria de privacidad: existen para atribuirte a una campaña y viajan pegados a cada URL copiada si no los detectas.",
          ],
        },
        {
          heading: "El parseo ocurre en tu navegador",
          paragraphs: [
            "Las URLs que inspeccionas no siempre son inofensivas: los enlaces firmados (URLs pre-firmadas de S3, callbacks de OAuth con code=… o token=…) llevan credenciales en la query. Pegar uno en un parser basado en servidor transmitiría una credencial válida a quien lo opere. Esta herramienta parsea con la API URL nativa de tu navegador, íntegramente en local — nada sale del dispositivo.",
            "El parseo local también significa que puedes lanzarle basura sin miedo. Una URL casi malformada (sin esquema, espacios sueltos, caracteres sin codificar) se acepta o se explica, no se rechaza con un stack trace — porque el parser de URLs del navegador es más tolerante que un validador estricto y coincide con lo que el servidor recibirá de verdad.",
            "Encadénala con el decodificador de URLs para inspeccionar segmentos codificados a mano, o con el codificador al construir query strings — parsear, ajustar y recodificar es un bucle más rápido que editar URLs crudas y esperar suerte.",
          ],
        },
      ],
    },
    pt: {
      name: "Analisador de URLs",
      tagline:
        "Cole qualquer URL e veja-a decomposta ao vivo: protocolo, host, porta, cada segmento do caminho, parâmetros decodificados e hash, com cópia em JSON.",
      intro: [
        "Uma URL esconde uma dúzia de dados numa linha só. Esta ferramenta separa tudo em linhas rotuladas — esquema, host, porta, cada segmento do caminho na sua linha, cada parâmetro com chave e valor decodificado, além do fragmento — para auditar links de rastreamento, depurar rotas ou reconstituir uma chamada de API.",
        "A análise usa a API URL nativa do navegador: os valores são decodificados exatamente como o servidor vai ler. URLs sem esquema tentam com https://, e entrada malformada gera um erro em linguagem clara, não um travamento.",
      ],
      steps: [
        "Cole a URL na caixa de entrada.",
        "Leia a tabela decomposta: partes, segmentos e parâmetros atualizam ao vivo.",
        "Copie como JSON quando precisar do detalhamento em código ou documentação.",
      ],
      faqs: [
        {
          q: "E se eu colar uma URL sem https://?",
          a: "A ferramenta assume https:// e tenta de novo, como os navegadores fazem com domínios puros. Um esquema digitado explicitamente é mantido como está.",
        },
        {
          q: "Os valores da query são decodificados?",
          a: "Sim. Chaves e valores são decodificados conforme o padrão URL: %20 vira espaço e %2F vira barra, igual ao que o servidor lê.",
        },
        {
          q: "E chaves duplicadas como ?tag=a&tag=b?",
          a: "Cada ocorrência ganha sua própria linha, e a exportação JSON as lista como pares independentes — nada é sobrescrito em silêncio.",
        },
      ],
      deepDive: [
        {
          heading: "Anatomia de uma URL: as partes que importam",
          paragraphs: [
            "Uma URL tem mais estrutura do que aparenta. No padrão WHATWG URL que os navegadores implementam, algo como https://example.com:8443/shop/shoes?color=red#reviews se separa em esquema (https), host (example.com), porta (8443 — https usa 443 por padrão, então a URL é equivalente sem ela), caminho (/shop/shoes), query (?color=red) e fragmento (#reviews). O fragmento é especial: nunca é enviado ao servidor, existe só no navegador — por isso aplicações de página única o usam para rotear, e por isso o servidor não consegue detectá-lo.",
            "O caminho não é uma string opaca, e sim uma hierarquia de segmentos. Ver cada segmento na própria linha torna visíveis os padrões de roteamento: /shop/shoes é uma coleção com um item, e redirects e rewrites geralmente operam sobre segmentos, não sobre o caminho inteiro. Vê-los separados também expõe esquisitices como barras duplas ou segmentos vazios que uma string única esconde.",
            "Portas, userinfo (a forma user:pass@host, desaconselhada mas ainda parseada) e até hosts IPv6 entre colchetes fazem parte da gramática padrão. A API URL do navegador lida com tudo isso — e é exatamente por isso que esta ferramenta delega a essa API em vez de uma regex artesanal: a decomposição que você vê é a decomposição que o servidor vê.",
          ],
        },
        {
          heading: "Codificação, decodificação e as armadilhas do %",
          paragraphs: [
            "A codificação porcentual é onde o parse de URLs fica sutil. a%2Fb decodifica para a/b — se esse valor foi codificado porque realmente contém uma barra, decodificá-lo para exibição é correto, mas tratá-lo como separador de caminho seria um erro. Esta ferramenta decodifica chaves e valores exatamente como o servidor receptor vai fazer, então o que você lê é o que a aplicação vê.",
            "A diferença entre + e %20 pega muita gente. Na convenção application/x-www-form-urlencoded (formulários, alguns frameworks), um espaço se escreve como +; no padrão URL em si, + é só um sinal de mais. A mesma string ?q=a+b significa q=a b ou q=a+b dependendo do framework. Na dúvida, cole o parâmetro aqui e compare com o que seu backend registra.",
            "A decodificação também serve de auditoria: uma lista parseada deixa sem esconderijo os parâmetros de rastreamento — utm_source, fbclid, gclid e afins. Removê-los de um link antes de compartilhar é uma pequena vitória de privacidade: eles existem para te atribuir a uma campanha e viajam grudados em cada URL copiada se você não os notar.",
          ],
        },
        {
          heading: "O parse acontece no seu navegador",
          paragraphs: [
            "As URLs que você inspeciona nem sempre são inofensivas: links assinados (URLs pré-assinadas do S3, callbacks de OAuth com code=… ou token=…) carregam credenciais na query. Colar um num parser baseado em servidor transmitiria uma credencial válida a quem o opera. Esta ferramenta parseia com a API URL nativa do seu navegador, totalmente em local — nada sai do dispositivo.",
            "O parse local também significa que você pode jogar lixo nele sem medo. Uma URL quase malformada (sem esquema, espaços soltos, caracteres não codificados) é aceita ou explicada, não rejeitada com um stack trace — porque o parser de URLs do navegador é mais tolerante que um validador estrito e coincide com o que o servidor realmente receberá.",
            "Encadeie com o decodificador de URLs quando precisar inspecionar segmentos codificados à mão, ou com o codificador ao construir query strings — parsear, ajustar e recodificar é um ciclo mais rápido que editar URLs cruas e torcer.",
          ],
        },
      ],
    },
  },
});
