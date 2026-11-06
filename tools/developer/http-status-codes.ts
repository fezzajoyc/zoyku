import { DevHttpStatusEngine } from "../_engines/dev-http-status";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "http-status-codes",
  category: "developer",
  icon: "globe",
  engine: { component: DevHttpStatusEngine },
  related: ["url-parser", "regex-tester", "json-formatter", "hash-generator", "md5-generator", "sha256-generator", "base64-image", "json-validator", "url-encoder", "html-minifier"],
  copy: {
    en: {
      name: "HTTP Status Codes",
      tagline:
        "A searchable reference of 56 HTTP status codes grouped by class, each explained in one plain sentence — click any row to copy the number.",
      intro: [
        "Every important status code from 100 Continue to 511 Network Authentication Required, grouped by class and explained in one plain sentence: what actually happened on the wire and what to do next. The classics (200, 301, 404, 500) sit next to the ones that surprise people (207, 418, 451).",
        "Search filters live by number or name — type 30 to land on every redirect, or “teapot” to settle an argument. Clicking a row copies just the number, ready for code, docs or a bug report.",
      ],
      steps: [
        "Type a number or name in the search box, or browse by class.",
        "Read the one-line meaning — no RFC prose, just the practical sense.",
        "Click a row to copy the code number instantly.",
      ],
      faqs: [
        {
          q: "What is the difference between 301, 302 and 307?",
          a: "All three redirect, but 301 is permanent (search engines transfer rankings) while 302/307 are temporary. 307 additionally guarantees the method and body stay unchanged — use it when a POST must survive the redirect.",
        },
        {
          q: "Is 418 I'm a teapot a real status code?",
          a: "It started as an April Fools' joke in RFC 2324 and was later listed as reserved. Some real APIs return it for fun or rate limiting, and browsers handle it like any 4xx error.",
        },
        {
          q: "Why do 401 and 403 both say I can't get in?",
          a: "401 means “who are you?” — credentials are missing or wrong. 403 means “I know who you are and you still can't” — authentication succeeded but the resource is off-limits.",
        },
      ],
      deepDive: [
        {
          heading: "The five classes and how to read them",
          paragraphs: [
            "The first digit of a status code tells you which family is speaking. 1xx is informational — interim chatter like 100 Continue during large uploads, never a final answer. 2xx means success in some form: 200 is the plain OK, 201 says a resource was created, 204 says success with nothing to send back. 3xx is redirection — the resource lives elsewhere. 4xx is the client's fault, 5xx is the server's.",
            "The class split matters for debugging because it immediately assigns blame. A 4xx in your logs usually means the client sent something wrong — bad credentials (401), missing permissions (403), a bad request body (400), or asking for something that does not exist (404). A 5xx means the server hit an internal problem — an unhandled exception (500), an upstream failure (502 Bad Gateway), an overload (503). Reading the class first turns an error from a mystery into a direction.",
            "Two subtleties worth knowing: 202 Accepted means the request was received but not yet acted on — common with async job queues — and a 3xx does not always mean a redirect a browser will follow, since 304 Not Modified is the cache negotiation answer with no body at all.",
          ],
        },
        {
          heading: "Redirects, caching and the codes people get wrong",
          paragraphs: [
            "The 3xx family is where real-world mistakes concentrate. 301 is permanent: search engines transfer rankings, and browsers may cache the redirect aggressively. 302 is temporary but ambiguous about the method — clients historically switched POST to GET after a 302, which is exactly what 307 forbids. When a POST must survive a redirect intact, 307 (temporary) or 308 (permanent) are the correct answers; 303 See Other is the deliberate “convert this to a GET” instruction, classic after a form POST.",
            "Caching behavior is the other half the class does not tell you. A 200 can be cacheable or not depending on headers; 304 is explicitly the cache handshake; 410 Gone tells clients to stop asking, and search engines de-index it faster than 404. The status code sets the frame, but the headers decide the details — which is why an API that “returns 200 with an error object in the body” breaks caches and retries everywhere: the code says success, the semantics say failure.",
            "401 versus 403 deserves its own line: 401 is about identity (you have not authenticated, try again with credentials, usually with a WWW-Authenticate header), while 403 is about authorization (identity established, access denied). Returning 403 for missing login instead of 401 is one of the most common API design bugs — the client cannot tell whether re-authenticating would help.",
          ],
        },
        {
          heading: "A reference that stays on your machine",
          paragraphs: [
            "This page is a static reference rendered locally in your browser: no lookup request is made when you search or click, and once the page is loaded it works offline. That design suits how it gets used — mid-incident, on a call, with production logs open and the network half-broken. The copy-on-click exists because status codes usually end up pasted into bug reports, runbooks and code reviews, one keystroke at a time.",
            "Status codes come from the HTTP standards (the core classes in RFC 9110 and friends, the HTTP/2 extension codes like 425, and the April Fools' 418 that ended up reserved), and the set grows rarely — the last widely adopted additions were the 4xx range's more specific diagnoses. This reference covers the practical set and explains each in plain language rather than spec prose.",
            "Pair it with the URL parser when debugging: a 301 or 302 is meaningless until you see where the Location header points, and the parser shows the target URL's structure directly.",
          ],
        },
      ],
    },
    zh: {
      name: "HTTP 状态码速查",
      tagline: "按 1xx–5xx 分类收录 56 个 HTTP 状态码,每条一句平实解释,支持按号码或名称搜索,点击行即复制数字。",
      intro: [
        "从 100 Continue 到 511 Network Authentication Required,按类别分组,每条用一句平实的话讲清:线路上发生了什么、接下来该做什么。常见的 200、301、404、500 都在,冷门的 207、418、451 也在。",
        "搜索按号码或名称实时过滤——输入 30 定位所有重定向,输入 teapot 也能命中。点击行即可复制状态码数字,直接粘进代码、文档或工单。",
      ],
      steps: [
        "在搜索框输入数字或名称,或按类别浏览。",
        "读一行式解释:没有 RFC 原文,只有实际含义。",
        "点击任意一行,立即复制状态码数字。",
      ],
      faqs: [
        {
          q: "301、302 和 307 有什么区别?",
          a: "三者都是重定向,但 301 是永久的(搜索引擎会转移权重),302/307 是临时的。307 还保证方法和请求体不变——POST 需要跨重定向存活时用它。",
        },
        {
          q: "418 I'm a teapot 是真实的状态码吗?",
          a: "它源自 RFC 2324 的愚人节玩笑,后来被列为保留码。一些真实 API 会用它开玩笑或做限流,浏览器把它当普通 4xx 错误处理。",
        },
        {
          q: "401 和 403 都说进不去,区别在哪?",
          a: "401 的意思是「你是谁?」——缺少凭证或凭证错误。403 的意思是「我知道你是谁,但你还是不行」——认证成功但资源禁止访问。",
        },
      ],
      deepDive: [
        {
          heading: "五个类别以及怎么读它们",
          paragraphs: [
            "状态码的第一位数字告诉你说话的是哪个家族。1xx 是信息性——大文件上传过程中的 100 Continue 这类过渡性交互,从来不是最终答复。2xx 表示某种形式的成功:200 是普通的 OK,201 表示资源已创建,204 表示成功但无可返回内容。3xx 是重定向——资源在别处。4xx 是客户端的问题,5xx 是服务器的问题。",
            "类别划分对调试很重要,因为它立刻分派了责任。日志里出现 4xx,通常意味着客户端发错了东西——凭证错误(401)、缺权限(403)、请求体不合法(400)、要找的东西不存在(404)。5xx 意味着服务器内部出了问题——未处理的异常(500)、上游故障(502 Bad Gateway)、过载(503)。先读类别,错误就从谜团变成了方向。",
            "两个值得知道的细节:202 Accepted 表示请求已收到但尚未处理——异步任务队列的常态;而 3xx 不总是浏览器会跟进的重定向,304 Not Modified 是缓存协商的答复,连响应体都没有。",
          ],
        },
        {
          heading: "重定向、缓存与那些最容易被用错的状态码",
          paragraphs: [
            "3xx 家族是现实中错误最集中的地方。301 是永久的:搜索引擎会转移权重,浏览器也可能激进地缓存这个重定向。302 是临时的,但对方法的处理含糊——客户端历史上在 302 之后会把 POST 改成 GET,而 307 禁止的正是这件事。当 POST 必须原样穿过重定向时,正确答案是 307(临时)或 308(永久);303 See Other 是刻意的「把这个转成 GET」指令,表单 POST 之后最经典。",
            "缓存行为是类别没有告诉你的另一半。200 可缓存与否取决于响应头;304 就是缓存握手本身;410 Gone 告诉客户端别再问了,搜索引擎下架它也比 404 快。状态码定框架,头部定细节——这正是「返回 200 但把错误对象放在 body 里」的 API 到处搞坏缓存和重试的原因:代码说成功,语义说失败。",
            "401 与 403 值得单独一行:401 关于身份(你还没认证,带着凭证再试,通常带 WWW-Authenticate 头),403 关于授权(身份已确认,访问被拒)。把「未登录」返回成 403 而不是 401,是最常见的 API 设计错误之一——客户端无法判断重新认证有没有用。",
          ],
        },
        {
          heading: "留在你机器上的速查表",
          paragraphs: [
            "这一页是在你浏览器里本地渲染的静态参考:搜索和点击都不发出任何查询请求,页面加载后离线可用。这个设计贴合它的使用场景——事故进行中、开着会、生产日志摊在旁边、网络半瘫。点击即复制是因为状态码最终总被粘进故障工单、运维手册和代码评审里,一次一键。",
            "状态码来自 HTTP 标准(核心类别在 RFC 9110 等文档中,HTTP/2 扩展码如 425,以及愚人节玩笑出身、后来被列为保留的 418),集合增长得很慢,近年广泛采用的新增集中在 4xx 里更精细的诊断。本参考覆盖实用的集合,每条用平实语言解释,而不是规范原文。",
            "调试时可以搭配 URL 解析器:301 或 302 在你看到 Location 头指向哪里之前毫无意义,解析器直接展示目标 URL 的结构。",
          ],
        },
      ],
    },
    ja: {
      name: "HTTP ステータスコード一覧",
      tagline:
        "1xx から 5xx まで 56 個のステータスコードをクラス別に収録。各コードを一文で平易に解説し、検索とワンクリックコピーに対応。",
      intro: [
        "100 Continue から 511 Network Authentication Required まで、主要なステータスコードをクラス別に収録し、一文でわかりやすく説明します。実際に何が起き、次に何をすべきか。定番の 200・301・404・500 はもちろん、意外な 207・418・451 も載っています。",
        "検索は番号や名前でリアルタイムに絞り込み — 30 と打てばリダイレクト全種、teapot でも命中します。行をクリックすればコード番号だけをコピーでき、コードやドキュメント、バグ報告にすぐ貼れます。",
      ],
      steps: [
        "検索ボックスに番号や名前を入力するか、クラスごとに閲覧します。",
        "一文の説明を読みます。RFC の堅苦しい文ではなく実務的な意味だけ。",
        "行をクリックすると、ステータスコードの番号がすぐコピーされます。",
      ],
      faqs: [
        {
          q: "301・302・307 の違いは?",
          a: "いずれもリダイレクトですが、301 は恒久的(検索エンジンが評価を移す)、302/307 は一時的です。307 はさらにメソッドとボディが変わらないことを保証するので、POST をリダイレクト後も維持したいときに使います。",
        },
        {
          q: "418 I'm a teapot は本物のステータスコード?",
          a: "RFC 2324 のエイプリルフールから生まれ、後に予約コードとして登録されました。冗談やレート制限に使う実在の API もあり、ブラウザは通常の 4xx エラーとして扱います。",
        },
        {
          q: "401 と 403 はどこが違いますか?",
          a: "401 は「あなたは誰?」— 資格情報がないか誤っています。403 は「あなたが誰か分かった上でダメ」— 認証は成功したがリソースへの権限がない、という意味です。",
        },
      ],
      deepDive: [
        {
          heading: "五つのクラスとその読み方",
          paragraphs: [
            "ステータスコードの一桁目が、どのファミリーが話しているかを告げます。1xx は情報的——大きなアップロード中の 100 Continue のような中間のやり取りで、最終応答では決してありません。2xx は何らかの形の成功:200 は普通の OK、201 はリソースが作成されたこと、204 は成功だが返すものがないこと。3xx はリダイレクト——リソースは別の場所にあります。4xx はクライアントの落ち度、5xx はサーバーの落ち度です。",
            "クラス分けはデバッグで重要です。即座に責任の所在を割り当てるからです。ログに出た 4xx はたいていクライアントが何かを間違えたこと——資格情報の誤り(401)、権限の欠如(403)、不正なリクエストボディ(400)、存在しないものへの要求(404)。5xx はサーバー内部の問題——未処理の例外(500)、上流の障害(502 Bad Gateway)、過負荷(503)。クラスを先に読めば、エラーは謎から方向へ変わります。",
            "知っておくと価値のある二つの細かい点:202 Accepted はリクエストが受領されたがまだ処理されていないこと——非同期ジョブキューの常態——そして 3xx が常にブラウザが追うリダイレクトとは限らないこと。304 Not Modified はキャッシュ交渉の応答で、ボディすら持ちません。",
          ],
        },
        {
          heading: "リダイレクト、キャッシュ、そして間違われやすいコード",
          paragraphs: [
            "現実世界のミスが集中するのは 3xx ファミリーです。301 は恒久的:検索エンジンは評価を移し、ブラウザはそのリダイレクトを積極的にキャッシュするかもしれません。302 は一時的ですがメソッドの扱いが曖昧——クライアントは歴史的に 302 の後で POST を GET に変えてきました。それを禁じるのがまさに 307 です。POST をリダイレクトをそのまま生き延びさせたいなら、正解は 307(一時的)か 308(恒久)。303 See Other は意図的な「これを GET に変えよ」の指示で、フォーム POST の後の定番です。",
            "キャッシュの振る舞いはクラスが教えてくれないもう半分です。200 はヘッダー次第でキャッシュ可能にも不可能にもなります。304 はキャッシュハンドシェイクそのもの。410 Gone はクライアントに尋ねるのをやめるよう告げ、検索エンジンは 404 より速くインデックスから外します。ステータスコードが枠を決め、ヘッダーが細部を決めます——だから「ボディにエラーオブジェクトを入れて 200 を返す」API があらゆる場所でキャッシュとリトライを壊すのです。コードは成功と言い、意味論は失敗と言う。",
            "401 と 403 は一行を割く価値があります。401 はアイデンティティについて(まだ認証していない。資格情報付きでもう一度。通常は WWW-Authenticate ヘッダー付き)、403 は認可について(アイデンティティは確定、アクセスは拒否)。未ログインを 403 で返すのは最も一般的な API 設計バグの一つです——再認証が役に立つかどうかをクライアントが判断できません。",
          ],
        },
        {
          heading: "あなたの端末に留まるリファレンス",
          paragraphs: [
            "このページはブラウザ内でローカルに描画される静的なリファレンスです。検索やクリックで問い合わせリクエストは一つも飛ばず、ページを読み込めばオフラインで動きます。この設計は使いどころに合っています。障害の最中、電話をしながら、本番ログを開いて、ネットワークが半分壊れている状態で。クリックでコピーがあるのは、ステータスコードが最終的にバグ報告、ランブック、コードレビューに貼られる運命にあるからです。一度にワンキーずつ。",
            "ステータスコードは HTTP 標準に由来します(コアのクラスは RFC 9110 など、HTTP/2 の拡張コードのような 425、そしてエイプリルフール出身で後に予約された 418)。集合はめったに増えず、近年広く採用された追加は 4xx のより具体的な診断に集中しています。このリファレンスは実用的な集合をカバーし、仕様文ではなく平易な言語で一つずつ説明します。",
            "デバッグでは URL パーサーと組み合わせてください。301 や 302 は、Location ヘッダーがどこを指すかを見るまで意味がありません。パーサーは目標 URL の構造を直接示します。",
          ],
        },
      ],
    },
    es: {
      name: "Códigos de estado HTTP",
      tagline:
        "Referencia buscable de 56 códigos de estado HTTP agrupados por clase, cada uno explicado en una frase llana — pulsa una fila para copiar el número.",
      intro: [
        "Todos los códigos importantes, de 100 Continue a 511 Network Authentication Required, agrupados por clase y explicados en una frase llana: qué ocurrió realmente en la conexión y qué hacer después. Los clásicos (200, 301, 404, 500) junto a los que sorprenden (207, 418, 451).",
        "La búsqueda filtra en vivo por número o nombre — escribe 30 para ver todos los redireccionamientos, o «teapot» para ganar una discusión. Al pulsar una fila se copia solo el número, listo para código, documentación o un bug report.",
      ],
      steps: [
        "Escribe un número o nombre en el buscador, o navega por clase.",
        "Lee el significado de una línea: nada de prosa RFC, solo el sentido práctico.",
        "Pulsa una fila para copiar el número al instante.",
      ],
      faqs: [
        {
          q: "¿Qué diferencia hay entre 301, 302 y 307?",
          a: "Las tres redirigen, pero 301 es permanente (los buscadores trasladan el posicionamiento) y 302/307 son temporales. 307 además garantiza que el método y el cuerpo no cambian: úsalo cuando un POST deba sobrevivir a la redirección.",
        },
        {
          q: "¿Es 418 I'm a teapot un código real?",
          a: "Nació como broma del Día de los Inocentes en el RFC 2324 y luego quedó como código reservado. Algunas APIs reales lo devuelven por diversión o para limitar peticiones, y los navegadores lo tratan como un 4xx más.",
        },
        {
          q: "401 y 403 dicen ambos que no puedo entrar, ¿en qué se diferencian?",
          a: "401 dice «¿quién eres?» — faltan credenciales o son erróneas. 403 dice «sé quién eres y aun así no puedes» — la autenticación funcionó pero el recurso está vetado.",
        },
      ],
      deepDive: [
        {
          heading: "Las cinco clases y cómo leerlas",
          paragraphs: [
            "El primer dígito de un código de estado te dice qué familia está hablando. 1xx es informativo — parloteo provisional como 100 Continue durante subidas grandes, nunca una respuesta final. 2xx es éxito de alguna forma: 200 es el OK llano, 201 dice que se creó un recurso, 204 dice éxito sin nada que devolver. 3xx es redirección — el recurso vive en otro sitio. 4xx es culpa del cliente, 5xx culpa del servidor.",
            "La división por clases importa al depurar porque asigna la culpa de inmediato. Un 4xx en tus logs normalmente significa que el cliente envió algo mal — credenciales erróneas (401), permisos ausentes (403), un cuerpo de petición inválido (400), o pedir algo que no existe (404). Un 5xx significa que el servidor encontró un problema interno — una excepción no manejada (500), un fallo aguas arriba (502 Bad Gateway), una sobrecarga (503). Leer la clase primero convierte un error de misterio en dirección.",
            "Dos sutilezas que valen la pena: 202 Accepted significa que la petición llegó pero aún no se actuó — lo habitual en colas de trabajos asíncronas — y un 3xx no siempre es una redirección que el navegador siga, porque 304 Not Modified es la respuesta de negociación de caché sin cuerpo siquiera.",
          ],
        },
        {
          heading: "Redirecciones, caché y los códigos que la gente usa mal",
          paragraphs: [
            "La familia 3xx es donde se concentran los errores reales. 301 es permanente: los buscadores trasladan el posicionamiento y los navegadores pueden cachear la redirección con agresividad. 302 es temporal pero ambiguo con el método — los clientes históricamente cambiaban POST a GET tras un 302, que es justo lo que 307 prohíbe. Cuando un POST debe sobrevivir intacto a una redirección, las respuestas correctas son 307 (temporal) o 308 (permanente); 303 See Other es la instrucción deliberada de «convierte esto en un GET», clásico tras un POST de formulario.",
            "El comportamiento de caché es la otra mitad que la clase no te cuenta. Un 200 puede ser cacheable o no según las cabeceras; 304 es explícitamente el apretón de manos de caché; 410 Gone les dice a los clientes que dejen de preguntar, y los buscadores lo desindexan más rápido que un 404. El código de estado pone el marco, pero las cabeceras deciden los detalles — por eso una API que «devuelve 200 con un objeto de error en el cuerpo» rompe cachés y reintentos por todas partes: el código dice éxito, la semántica dice fallo.",
            "401 frente a 403 merece línea propia: 401 va de identidad (no te has autenticado, reintenta con credenciales, normalmente con una cabecera WWW-Authenticate), mientras que 403 va de autorización (identidad establecida, acceso denegado). Devolver 403 para un login ausente en vez de 401 es uno de los bugs de diseño de API más comunes — el cliente no puede saber si reautenticarse serviría de algo.",
          ],
        },
        {
          heading: "Una referencia que se queda en tu máquina",
          paragraphs: [
            "Esta página es una referencia estática renderizada localmente en tu navegador: no se hace ninguna petición de consulta al buscar o pulsar, y una vez cargada funciona sin conexión. El diseño encaja con cómo se usa — en pleno incidente, en una llamada, con logs de producción abiertos y la red a medias rota. El copiar al pulsar existe porque los códigos de estado suelen acabar pegados en bug reports, runbooks y revisiones de código, una pulsación por vez.",
            "Los códigos vienen de los estándares HTTP (las clases centrales en el RFC 9110 y compañía, los códigos de extensión como 425, y el 418 del Día de los Inocentes que acabó reservado), y el conjunto crece poco — las incorporaciones ampliamente adoptadas se concentraron en diagnósticos más específicos del rango 4xx. Esta referencia cubre el conjunto práctico y explica cada uno en lenguaje llano en vez de prosa de especificación.",
            "Emparéjala con el analizador de URLs al depurar: un 301 o 302 no significa nada hasta que ves a dónde apunta la cabecera Location, y el analizador muestra la estructura de la URL destino directamente.",
          ],
        },
      ],
    },
    pt: {
      name: "Códigos de status HTTP",
      tagline:
        "Referência pesquisável de 56 códigos de status HTTP agrupados por classe, cada um explicado numa frase simples — clique numa linha para copiar o número.",
      intro: [
        "Todos os códigos importantes, de 100 Continue a 511 Network Authentication Required, agrupados por classe e explicados numa frase simples: o que realmente aconteceu na conexão e o que fazer em seguida. Os clássicos (200, 301, 404, 500) ao lado dos que surpreendem (207, 418, 451).",
        "A busca filtra ao vivo por número ou nome — digite 30 para ver todos os redirecionamentos, ou “teapot” para encerrar uma discussão. Clicar numa linha copia apenas o número, pronto para código, documentação ou um bug report.",
      ],
      steps: [
        "Digite um número ou nome na busca, ou navegue por classe.",
        "Leia o significado de uma linha — sem prosa de RFC, só o sentido prático.",
        "Clique numa linha para copiar o número na hora.",
      ],
      faqs: [
        {
          q: "Qual a diferença entre 301, 302 e 307?",
          a: "Os três redirecionam, mas 301 é permanente (mecanismos de busca transferem o ranqueamento) enquanto 302/307 são temporários. O 307 ainda garante que método e corpo não mudam — use quando um POST precisa sobreviver ao redirect.",
        },
        {
          q: "O 418 I'm a teapot é um código de verdade?",
          a: "Nasceu como piada de primeiro de abril no RFC 2324 e depois ficou listado como reservado. Algumas APIs reais o devolvem por diversão ou para limitar requisições, e navegadores o tratam como qualquer 4xx.",
        },
        {
          q: "401 e 403 dizem os dois que não posso entrar — qual a diferença?",
          a: "401 diz “quem é você?” — faltam credenciais ou estão erradas. 403 diz “sei quem você é e ainda assim não pode” — a autenticação funcionou, mas o recurso é proibido.",
        },
      ],
      deepDive: [
        {
          heading: "As cinco classes e como lê-las",
          paragraphs: [
            "O primeiro dígito de um código de status diz qual família está falando. 1xx é informativo — conversa provisória como 100 Continue durante uploads grandes, nunca uma resposta final. 2xx significa sucesso de alguma forma: 200 é o OK simples, 201 diz que um recurso foi criado, 204 diz sucesso sem nada a devolver. 3xx é redirecionamento — o recurso vive em outro lugar. 4xx é culpa do cliente, 5xx culpa do servidor.",
            "A divisão por classes importa ao depurar porque atribui a responsabilidade de imediato. Um 4xx nos seus logs normalmente significa que o cliente enviou algo errado — credenciais erradas (401), permissões ausentes (403), um corpo de requisição inválido (400), ou pedir algo que não existe (404). Um 5xx significa que o servidor encontrou um problema interno — uma exceção não tratada (500), uma falha a montante (502 Bad Gateway), sobrecarga (503). Ler a classe primeiro transforma um erro de mistério em direção.",
            "Duas sutilezas que valem saber: 202 Accepted significa que a requisição chegou mas ainda não foi executada — o normal em filas de jobs assíncronos — e um 3xx nem sempre é um redirecionamento que o navegador seguirá, porque 304 Not Modified é a resposta da negociação de cache, sem corpo sequer.",
          ],
        },
        {
          heading: "Redirecionamentos, cache e os códigos que as pessoas erram",
          paragraphs: [
            "A família 3xx é onde os erros reais se concentram. 301 é permanente: mecanismos de busca transferem o ranqueamento, e navegadores podem cachear o redirecionamento agressivamente. 302 é temporário mas ambíguo quanto ao método — clientes historicamente trocavam POST por GET após um 302, que é exatamente o que o 307 proíbe. Quando um POST precisa sobreviver intacto a um redirect, as respostas corretas são 307 (temporário) ou 308 (permanente); 303 See Other é a instrução deliberada de “converta isto num GET”, clássico após um POST de formulário.",
            "O comportamento de cache é a outra metade que a classe não conta. Um 200 pode ser cacheável ou não dependendo dos cabeçalhos; 304 é explicitamente o aperto de mão do cache; 410 Gone diz aos clientes que parem de perguntar, e mecanismos de busca o desindexam mais rápido que um 404. O código de status define o quadro, mas os cabeçalhos decidem os detalhes — por isso uma API que “retorna 200 com um objeto de erro no corpo” quebra caches e retries por toda parte: o código diz sucesso, a semântica diz falha.",
            "401 contra 403 merece linha própria: 401 é sobre identidade (você não se autenticou, tente de novo com credenciais, normalmente com um cabeçalho WWW-Authenticate), enquanto 403 é sobre autorização (identidade estabelecida, acesso negado). Retornar 403 para um login ausente em vez de 401 é um dos bugs de design de API mais comuns — o cliente não consegue saber se reautenticar ajudaria.",
          ],
        },
        {
          heading: "Uma referência que fica na sua máquina",
          paragraphs: [
            "Esta página é uma referência estática renderizada localmente no seu navegador: nenhuma requisição de consulta é feita ao buscar ou clicar, e depois de carregada funciona offline. O design combina com o jeito de usar — em pleno incidente, numa chamada, com logs de produção abertos e a rede meio quebrada. O copiar ao clicar existe porque códigos de status normalmente acabam colados em bug reports, runbooks e revisões de código, uma tecla por vez.",
            "Os códigos vêm dos padrões HTTP (as classes centrais no RFC 9110 e companhia, os códigos de extensão como 425, e o 418 do dia da mentira que acabou reservado), e o conjunto cresce raramente — as incorporações amplamente adotadas se concentraram em diagnósticos mais específicos da faixa 4xx. Esta referência cobre o conjunto prático e explica cada um em linguagem simples em vez de prosa de especificação.",
            "Emparelhe com o analisador de URLs ao depurar: um 301 ou 302 não significa nada até você ver para onde o cabeçalho Location aponta, e o analisador mostra a estrutura da URL de destino diretamente.",
          ],
        },
      ],
    },
  },
});
