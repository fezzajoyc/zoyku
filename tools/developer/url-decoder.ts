import { DevEncoderEngine } from "../_engines/dev-engine-encoder";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "url-decoder",
  category: "developer",
  icon: "link",
  engine: { component: DevEncoderEngine, props: { codec: "url-decode" } },
  related: ["url-encoder", "base64-decoder", "base64-encoder", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "html-minifier", "json-path-query"],
  copy: {
    en: {
      name: "URL Decoder",
      tagline:
        "Decode percent-encoded URLs back into readable text — %20, %2F and query-string values become clear instantly. Handles + as space, fully in your browser.",
      intro: [
        "Paste an encoded URL, parameter or path segment and read the original text immediately. Two modes match the two encoders: component decoding (decodeURIComponent) for a single value, and full URI decoding (decodeURI) for a complete URL. Handy for reading server logs, debugging tracking parameters and unpicking redirect chains.",
        "Decoding is byte-exact: every %XX escape becomes the corresponding UTF-8 byte, and multi-byte sequences are reassembled into the original characters, so %C3%A9 returns é and %E6%97%A5 returns 日. Invalid or truncated escapes such as %E6% or %ZZ are reported instead of silently corrupting the output.",
        "A handy extra toggle treats + as a space, which is what form-encoded query strings (application/x-www-form-urlencoded) actually mean — so search params like hello+world decode to hello world instead of staying literal. Turn it off when decoding a path segment, where + is a legitimate literal character.",
        "Decoding with the wrong mode is a real failure mode: running decodeURI on an encoded parameter leaves %3D and %26 untouched because they look like URL separators, and the value then splits incorrectly. The two explicit modes here remove that guesswork, and everything runs locally — nothing is sent to a server to be analyzed.",

      ],
      steps: [
        "Paste the percent-encoded string or URL.",
        "Pick component decoding for values, or full URI decoding for complete URLs.",
        "Enable + as space for form-style query strings, then copy the decoded text.",
      ],
      faqs: [
        {
          q: "Why do I sometimes get an error when decoding?",
          a: "A lone % that is not followed by two hex digits, or a truncated escape sequence like %E4%BD, is invalid percent-encoding — the decoder reports it instead of guessing.",
        },
        {
          q: "Should I turn on the + as space option?",
          a: "For values extracted from an HTML form submission or many web frameworks' query strings, yes. For standard percent-encoded URLs that contain real + characters, keep it off.",
        },
        {
          q: "Is anything uploaded?",
          a: "No. Decoding runs locally in your browser — nothing leaves your device.",
        },
      ],
      deepDive: [
        {
          heading: "Decode errors are information, not obstacles",
          paragraphs: [
            "A strict decoder refuses three things: a lone % not followed by two hex digits, a truncated multi-byte sequence like %E4%BD that starts a character but never finishes it, and byte sequences that are not valid UTF-8 at all. Each of these is a genuine signal about the data you are looking at, which is why this tool reports them instead of substituting a placeholder.",
            "The truncated-sequence case deserves attention in log analysis. A multi-byte character such as 日 is three bytes (%E6%97%A5); if a log line was cut at a fixed width, the last character may survive as only two of its three bytes. A lenient decoder prints garbage; a strict one tells you the log was truncated — often the actual bug you were hunting.",
            "Silent replacement is worse than an error precisely because it hides the problem: a U+FFFD replacement character in your output usually means the source bytes were damaged somewhere upstream, and finding where is much easier when the decoder flags the exact position rather than burying it in readable-looking text.",
          ],
        },
        {
          heading: "Mode mistakes and the + convention",
          paragraphs: [
            "The two decoder modes exist because decoding a value with full-URI mode is a classic silent failure: %3D (=) and %26 (&) look like URL structure, so decodeURI leaves them untouched and the value arrives still half-encoded — only to split wrongly when you parse the query string. Decoding a whole URL with component mode, conversely, decodes separators you may have wanted to keep visible.",
            "The + toggle exists because of the split-brain history of the space character. In form-encoded query strings (application/x-www-form-urlencoded), + genuinely means a space; in paths and in strict RFC 3986 URLs, + is just a plus. Decode a form-built search string with the toggle off and you will see plus signs scattered through your text where spaces belong.",
            "One more trap worth knowing: double encoding. A percent sign itself encodes as %25, so a string that was encoded twice carries %253D where %3D should be. If a decoded result still contains % sequences, decode it again — most “broken” redirect URLs are just encoded twice by two different layers that each assumed the other had done it.",
          ],
        },
        {
          heading: "Reading encoded URLs without sending them anywhere",
          paragraphs: [
            "URLs you need to decode are rarely public: tracking parameters from an ad platform, session tokens inside redirect chains, signed URLs with expiry timestamps, internal endpoints from access logs. Sending them to an online decoder that proxies to a server means handing those tokens to an unknown party — unnecessary for a task a browser can do alone.",
            "Everything here runs in your browser's JavaScript. The encoded string is parsed on your device, invalid sequences are reported locally, and no history of what you pasted is stored anywhere. It also works offline — pasting a URL from a locked-down network's captive portal page or from an air-gapped machine's export works exactly the same.",
            "A practical workflow tip: pair this with the URL encoder. Decode a suspect URL, fix the part that is wrong, re-encode just that part, and assemble the final link by hand. That loop catches most real-world URL bugs — double encoding, wrong mode, + ambiguity — in under a minute, entirely on your machine.",
          ],
        },
      ],
    },
    zh: {
      name: "URL 解码",
      tagline: "把百分号编码的 URL 解回可读文本——%20、%2F 和查询参数即时还原,支持把 + 当空格,全程浏览器本地处理。",
      intro: [
        "粘贴编码过的 URL、参数或路径段,立即读出原始文本。两种模式对应两种编码器:组件解码(decodeURIComponent)用于单个值,整条 URI 解码(decodeURI)用于完整 URL。",
        "还提供一个实用开关:把 + 当作空格——这正是表单编码(application/x-www-form-urlencoded)查询串的真实含义,于是 hello+world 能解码成 hello world 而不是原样保留。",
      ],
      steps: [
        "粘贴百分号编码的字符串或 URL。",
        "单个值选组件解码;完整 URL 选整条 URI 解码。",
        "表单风格的查询串勾选「+ 当空格」,然后复制解码文本。",
      ],
      faqs: [
        {
          q: "为什么有时解码会报错?",
          a: "单独的 % 后面没有两个十六进制数字,或者转义序列被截断(如 %E4%BD),都是非法的百分号编码——解码器会明确报错而不是猜测。",
        },
        {
          q: "什么时候应该勾选「+ 当空格」?",
          a: "处理 HTML 表单提交或很多 Web 框架查询串里的值时勾上。如果 URL 里存在真实的 + 字符,就别勾。",
        },
        {
          q: "会上传任何内容吗?",
          a: "不会。解码在浏览器本地运行,数据不离开设备。",
        },
      ],
      deepDive: [
        {
          heading: "解码报错是信息,不是障碍",
          paragraphs: [
            "严格的解码器拒绝三种东西:后面没跟两个十六进制数字的孤立 %;截断的多字节序列,比如开始了却没结束的 %E4%BD;以及根本不是合法 UTF-8 的字节序列。每一种都是关于数据本身的真实信号,所以本工具选择明确报告,而不是默默替换占位符。",
            "截断序列的情况在日志分析里尤其值得注意。「日」这样的多字节字符是三个字节(%E6%97%A5);如果日志行按固定宽度切割,最后一个字符可能只剩下三个字节里的两个。宽松的解码器打出乱码,严格的解码器告诉你日志被截断过——这往往才是你真正要找的 bug。",
            "静默替换比报错更糟,恰恰因为它把问题藏起来:输出里出现 U+FFFD 替换字符,通常意味着上游某处的字节已经损坏;而定位损坏点,解码器标出确切位置远比把问题埋进看起来可读的文本容易得多。",
          ],
        },
        {
          heading: "模式选错与 + 的约定",
          paragraphs: [
            "两种解码模式的存在,是因为用整条 URI 模式解码单个值是经典的静默失败:%3D(等号)和 %26(与号)看起来像 URL 结构,decodeURI 就不去碰它们,值到达时仍是半编码状态——等你解析查询串时又切错位置。反过来,用组件模式解码整条 URL,会把你想保留可见的分隔符也解码掉。",
            "+ 开关来自空格字符的“精神分裂”历史。在表单编码的查询串(application/x-www-form-urlencoded)里,+ 真的表示空格;在路径和严格的 RFC 3986 URL 里,+ 就只是加号。解码表单拼出来的搜索串时不开开关,你会在本该是空格的地方看到散落的加号。",
            "再一个值得知道的坑:双重编码。百分号自己编码为 %25,所以被编码两次的字符串里,本该是 %3D 的地方会出现 %253D。如果解码结果里还有 % 序列,再解一次——大多数“坏掉”的跳转 URL 只是两层各以为对方做了编码,结果编了两次。",
          ],
        },
        {
          heading: "看懂编码 URL,但哪儿都不发",
          paragraphs: [
            "需要解码的 URL 很少是公开内容:广告平台的埋点参数、跳转链里的会话 token、带过期时间戳的签名 URL、访问日志里的内部端点。把它们发给一个会代理到服务器的在线解码器,等于把 token 交给不认识的一方——浏览器自己就能干的活,没必要冒这个险。",
            "这里的一切都在浏览器的 JavaScript 里跑。编码字符串在你的设备上解析,非法序列就地报告,粘贴过什么不留任何记录。离线也可用——从内网认证页或隔离机器的导出文件里贴一个 URL,处理方式完全相同。",
            "实用工作流:和 URL 编码器配对。解码可疑 URL,修好出错的部分,只对那部分重新编码,手工拼出最终链接。这个循环能在一分钟内抓住大多数真实 URL 问题——双重编码、模式选错、+ 歧义——全程在你自己的机器上。",
          ],
        },
      ],
    },
    ja: {
      name: "URL デコーダー",
      tagline:
        "パーセントエンコードされた URL を読めるテキストへ復元 — %20・%2F・クエリ値が瞬時に分かります。+ を空白扱いにも対応、完全ブラウザ内処理。",
      intro: [
        "エンコードされた URL・パラメータ・パス断片を貼り付けると、元のテキストがすぐに読めます。2 つのモードは 2 つのエンコーダーに対応:単一の値にはコンポーネント方式(decodeURIComponent)、URL 全体には URI 全体方式(decodeURI)です。",
        "実用的な追加オプションとして、+ を空白として扱うスイッチがあります。フォームエンコード(application/x-www-form-urlencoded)のクエリ文字列が本来の意味であり、hello+world が hello world に正しく復元されます。",
      ],
      steps: [
        "パーセントエンコードされた文字列や URL を貼り付けます。",
        "値にはコンポーネント方式、完全な URL には URI 全体方式を選びます。",
        "フォーム形式のクエリなら「+ を空白扱い」を有効にし、デコード結果をコピーします。",
      ],
      faqs: [
        {
          q: "デコード時にエラーが出ることがあるのはなぜ?",
          a: "後ろに 16 進 2 桁が続かない単独の % や、%E4%BD のような途中で切れたエスケープは不正なパーセントエンコーディングです。デコーダーは推測せずエラーを報告します。",
        },
        {
          q: "「+ を空白扱い」はいつオンにする?",
          a: "HTML フォーム送信や多くの Web フレームワークのクエリ文字列から取り出した値なら、オンにします。URL に本物の + が含まれる場合はオフのままにします。",
        },
        {
          q: "何かアップロードされますか?",
          a: "いいえ。デコードはブラウザ内でローカルに実行され、データは端末の外に出ません。",
        },
      ],
      deepDive: [
        {
          heading: "デコードのエラーは情報であり、障害ではない",
          paragraphs: [
            "厳密なデコーダーは三つのものを拒みます。後ろに 16 進 2 桁が続かない孤立した %。開始したのに終わらない %E4%BD のような途中切れのマルチバイト列。そしてそもそも正当な UTF-8 でないバイト列です。どれもデータそのものについての本物の信号なので、このツールは置き換えではなく明示的に報告します。",
            "途中切れのケースはログ分析で特に重要です。「日」のようなマルチバイト文字は 3 バイト(%E6%97%A5)です。ログ行が固定幅で切断されると、最後の文字は 3 バイトのうち 2 バイトしか残らないことがあります。寛容なデコーダーは文字化けを出し、厳密なデコーダーはログが切り詰められたと教えます。それこそが本命のバグであることも多いのです。",
            "黙置換がエラーより悪いのは、まさに問題を隠すからです。出力に U+FFFD 置換文字が出たら、上流のどこかでバイトが壊れた合図です。損傷位置を特定するには、一見読めるテキストに埋もれさせるより、デコーダーが正確な位置を示すほうがはるかに簡単です。",
          ],
        },
        {
          heading: "方式の取り違えと + の慣行",
          paragraphs: [
            "2 つの復号方式があるのは、値を URI 全体方式で復号するのが定番のサイレント失敗だからです。%3D(等号)と %26(アンパサンド)は URL 構造に見えるので decodeURI は触れず、値は半分エンコードのまま届き、クエリ文字列を解析する段階で誤って分割されます。逆に URL 全体をコンポーネント方式で復号すると、見えたまま保ちたかった区切り文字まで復号してしまいます。",
            "+ のスイッチは空白文字の「二重人格」の歴史から来ています。フォームエンコードのクエリ文字列(application/x-www-form-urlencoded)では + は本当に空白を意味し、パスや厳密な RFC 3986 URL では + はただのプラス記号です。フォーム組み立ての検索文字列をスイッチ オフのまま復号すると、空白のあるべき場所にプラス記号が散らばります。",
            "もう一つ知っておきたい罠が二重エンコードです。パーセント記号自体は %25 に符号化されるので、二度エンコードされた文字列では %3D のはずの場所に %253D が現れます。復号結果にまだ % の並びが残っていたら、もう一度復号してください。壊れたリダイレクト URL の大半は、互いを信じて二重にエンコードした 2 層の産物にすぎません。",
          ],
        },
        {
          heading: "どこにも送らずにエンコード済み URL を読む",
          paragraphs: [
            "復号が必要な URL は公開物であることが少ありません。広告プラットフォームのトラッキング パラメータ、リダイレクト連鎖の中のセッショントークン、有効期限付きの署名 URL、アクセスログの内部エンドポイント。サーバーへ中継するオンライン デコーダーに送るのは、トークンを未知の当事者に渡すことであり、ブラウザ単独でできる作業には過剰なリスクです。",
            "ここではすべてがブラウザの JavaScript で動きます。エンコード済み文字列は端末上で解析され、不正な列はその場で報告され、何を貼ったかの履歴もどこにも残りません。オフラインでも同じ — 閉鎖ネットワークの認証ページや隔離マシンのエクスポートから URL を貼っても処理は同一です。",
            "実務のコツは URL エンコーダーとのペア運用です。疑わしい URL を復号し、壊れている部分だけ直し、その部分だけ再エンコードして、最終リンクを手で組み立てる。二重エンコード、方式の取り違え、+ の曖昧さといった現実の URL バグの大半が 1 分以内に潰せて、しかも全部自分のマシンの中で完結します。",
          ],
        },
      ],
    },
    es: {
      name: "Decodificador URL",
      tagline:
        "Decodifica URLs con porcentaje a texto legible: %20, %2F y valores de consulta se aclaran al instante. Trata + como espacio, todo en tu navegador.",
      intro: [
        "Pega una URL, parámetro o segmento codificado y lee el texto original al momento. Dos modos que corresponden a los dos codificadores: decodificación de componente (decodeURIComponent) para un solo valor, y de URI completa (decodeURI) para una URL entera.",
        "Un extra práctico: un interruptor que trata + como espacio, que es lo que significan realmente las cadenas de consulta form-encoded (application/x-www-form-urlencoded) — así hello+world se decodifica como hello world en lugar de quedarse literal.",
      ],
      steps: [
        "Pega la cadena o URL percent-encoded.",
        "Elige decodificación de componente para valores, o de URI completa para URLs enteras.",
        "Activa «+ como espacio» en cadenas de formulario, y copia el texto decodificado.",
      ],
      faqs: [
        {
          q: "¿Por qué a veces da error al decodificar?",
          a: "Un % suelto sin dos dígitos hexadecimales detrás, o una secuencia truncada como %E4%BD, no es percent-encoding válido — el decodificador lo informa en lugar de adivinar.",
        },
        {
          q: "¿Cuándo activo la opción «+ como espacio»?",
          a: "Para valores sacados de un envío de formulario HTML o de las query strings de muchos frameworks, sí. Para URLs estándar que contienen caracteres + reales, déjalo apagado.",
        },
        {
          q: "¿Se sube algo?",
          a: "No. La decodificación corre localmente en tu navegador — nada sale de tu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Los errores de decodificación son información, no obstáculos",
          paragraphs: [
            "Un decodificador estricto rechaza tres cosas: un % suelto no seguido de dos dígitos hexadecimales, una secuencia multibyte truncada como %E4%BD que empieza un carácter sin terminarlo, y secuencias de bytes que no son UTF-8 válido en absoluto. Cada una es una señal genuina sobre los datos que tienes delante, y por eso esta herramienta las reporta en vez de sustituirlas por un marcador.",
            "El caso de la secuencia truncada merece atención en el análisis de logs. Un carácter multibyte como 日 son tres bytes (%E6%97%A5); si una línea de log se cortó a anchura fija, el último carácter puede sobrevivir con solo dos de sus tres bytes. Un decodificador indulgente imprime basura; uno estricto te dice que el log fue truncado — que suele ser el bug real que estabas cazando.",
            "La sustitución silenciosa es peor que un error precisamente porque esconde el problema: un carácter de reemplazo U+FFFD en tu salida suele indicar que los bytes fuente se dañaron aguas arriba, y localizar dónde es mucho más fácil cuando el decodificador señala la posición exacta en lugar de enterrarla en texto aparentemente legible.",
          ],
        },
        {
          heading: "Errores de modo y la convención del +",
          paragraphs: [
            "Los dos modos existen porque decodificar un valor con el modo de URI completa es un fallo silencioso clásico: %3D (=) y %26 (&) parecen estructura de URL, así que decodeURI los deja intactos y el valor llega todavía semicodificado — solo para partirse mal cuando parsees la cadena de consulta. Al revés, decodificar una URL entera en modo componente decodifica separadores que quizá querías mantener visibles.",
            "El interruptor de + existe por la historia bifurcada del carácter espacio. En cadenas form-encoded (application/x-www-form-urlencoded), + significa de verdad un espacio; en rutas y en URL estrictas del RFC 3986, + es simplemente un más. Decodifica una cadena de búsqueda construida por formulario con el interruptor apagado y verás signos más sembrados donde deberían ir espacios.",
            "Una trampa más que conviene conocer: la doble codificación. El propio signo porcentaje se codifica como %25, así que una cadena codificada dos veces lleva %253D donde debería haber %3D. Si el resultado decodificado todavía contiene secuencias %, decodifica otra vez — la mayoría de las URL de redirección “rotas” solo están codificadas dos veces por dos capas que cada una supuso que la otra lo había hecho.",
          ],
        },
        {
          heading: "Leer URL codificadas sin enviarlas a ningún lado",
          paragraphs: [
            "Las URL que necesitas decodificar rara vez son públicas: parámetros de seguimiento de una plataforma de publicidad, tokens de sesión dentro de cadenas de redirección, URL firmadas con fecha de caducidad, endpoints internos de los logs de acceso. Enviarlas a un decodificador online que hace proxy a un servidor significa entregar esos tokens a un tercero desconocido — innecesario para una tarea que un navegador puede hacer solo.",
            "Todo aquí corre en el JavaScript de tu navegador. La cadena codificada se parsea en tu dispositivo, las secuencias inválidas se reportan en local, y no se guarda ningún historial de lo que pegaste. Funciona también sin conexión — pegar una URL desde la página de portal cautivo de una red cerrada o desde la exportación de una máquina aislada funciona exactamente igual.",
            "Un consejo de flujo práctico: combínalo con el codificador URL. Decodifica la URL sospechosa, arregla la parte que está mal, re-codifica solo esa parte y arma el enlace final a mano. Ese ciclo caza la mayoría de los bugs reales de URL — doble codificación, modo equivocado, ambigüedad del + — en menos de un minuto, íntegramente en tu máquina.",
          ],
        },
      ],
    },
    pt: {
      name: "Decodificador de URL",
      tagline:
        "Decodifique URLs com percent-encoding de volta para texto legível — %20, %2F e valores de query ficam claros na hora. Trata + como espaço, no navegador.",
      intro: [
        "Cole uma URL, parâmetro ou segmento de caminho codificado e leia o texto original imediatamente. Dois modos correspondem aos dois codificadores: decodificação de componente (decodeURIComponent) para um valor único, e de URI completa (decodeURI) para uma URL inteira.",
        "Um extra prático: um interruptor que trata + como espaço, que é o que as query strings form-encoded (application/x-www-form-urlencoded) realmente significam — assim hello+world decodifica como hello world em vez de permanecer literal.",
      ],
      steps: [
        "Cole a string ou URL percent-encoded.",
        "Escolha decodificação de componente para valores, ou de URI completa para URLs completas.",
        "Ative «+ como espaço» para query strings de formulário e copie o texto decodificado.",
      ],
      faqs: [
        {
          q: "Por que às vezes dá erro ao decodificar?",
          a: "Um % sozinho sem dois dígitos hexadecimais depois, ou uma sequência truncada como %E4%BD, não é percent-encoding válido — o decodificador reporta em vez de adivinhar.",
        },
        {
          q: "Quando ativar a opção «+ como espaço»?",
          a: "Para valores extraídos de envios de formulário HTML ou das query strings de muitos frameworks, sim. Para URLs padrão que contêm caracteres + reais, mantenha desligado.",
        },
        {
          q: "Algo é enviado para a internet?",
          a: "Não. A decodificação roda localmente no seu navegador — nada sai do seu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Erros de decodificação são informação, não obstáculos",
          paragraphs: [
            "Um decodificador estrito recusa três coisas: um % sozinho não seguido de dois dígitos hexadecimais, uma sequência multibyte truncada como %E4%BD que começa um caractere sem terminá-lo, e sequências de bytes que não são UTF-8 válido de forma alguma. Cada uma é um sinal genuíno sobre os dados à sua frente, e por isso esta ferramenta as reporta em vez de substituir por marcador.",
            "O caso da sequência truncada merece atenção na análise de logs. Um caractere multibyte como 日 tem três bytes (%E6%97%A5); se uma linha de log foi cortada em largura fixa, o último caractere pode sobreviver com só dois de seus três bytes. Um decodificador permissivo imprime lixo; um estrito diz que o log foi truncado — que costuma ser o bug real que você estava caçando.",
            "A substituição silenciosa é pior que um erro justamente porque esconde o problema: um caractere de substituição U+FFFD na saída costuma indicar que os bytes de origem foram danificados em algum ponto a montante, e localizar onde é muito mais fácil quando o decodificador marca a posição exata em vez de enterrá-la num texto aparentemente legível.",
          ],
        },
        {
          heading: "Erros de modo e a convenção do +",
          paragraphs: [
            "Os dois modos existem porque decodificar um valor com o modo de URI completa é uma falha silenciosa clássica: %3D (=) e %26 (&) parecem estrutura de URL, então decodeURI os deixa intactos e o valor chega ainda semicodificado — só para se partir errado quando você parsear a query string. Ao contrário, decodificar uma URL inteira em modo componente decodifica separadores que talvez você quisesse manter visíveis.",
            "O interruptor do + existe pela história bifurcada do caractere espaço. Em query strings form-encoded (application/x-www-form-urlencoded), + significa de verdade um espaço; em caminhos e em URLs estritas do RFC 3986, + é simplesmente um mais. Decodifique uma string de busca montada por formulário com o interruptor desligado e verás sinais de mais espalhados onde deveriam estar espaços.",
            "Mais uma armadilha que vale conhecer: dupla codificação. O próprio sinal de porcentagem se codifica como %25, então uma string codificada duas vezes carrega %253D onde deveria haver %3D. Se o resultado decodificado ainda contém sequências %, decodifique de novo — a maioria das URLs de redirecionamento \"quebradas\" só está codificada duas vezes por duas camadas em que cada uma assumiu que a outra já tinha feito.",
          ],
        },
        {
          heading: "Ler URL codificadas sem enviá-las para lugar nenhum",
          paragraphs: [
            "As URL que você precisa decodificar raramente são públicas: parâmetros de rastreamento de plataforma de anúncios, tokens de sessão dentro de cadeias de redirecionamento, URL assinadas com data de validade, endpoints internos vindos de logs de acesso. Enviá-las a um decodificador online que faz proxy a um servidor significa entregar esses tokens a uma parte desconhecida — desnecessário para uma tarefa que um navegador sozinho consegue fazer.",
            "Tudo aqui roda no JavaScript do seu navegador. A string codificada é parseada no seu dispositivo, as sequências inválidas são reportadas localmente, e nenhum histórico do que você colou é guardado em qualquer lugar. Funciona também offline — colar uma URL da página de portal cativo de uma rede fechada ou da exportação de uma máquina isolada funciona exatamente igual.",
            "Uma dica de fluxo prática: combine com o codificador de URL. Decodifique a URL suspeita, conserte a parte errada, re-codifique só essa parte e monte o link final à mão. Esse ciclo caza a maioria dos bugs reais de URL — dupla codificação, modo errado, ambiguidade do + — em menos de um minuto, inteiramente na sua máquina.",
          ],
        },
      ],
    },
  },
});
