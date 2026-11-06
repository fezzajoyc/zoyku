import { DevEncoderEngine } from "../_engines/dev-engine-encoder";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "base64-encoder",
  category: "developer",
  icon: "swap",
  engine: { component: DevEncoderEngine, props: { codec: "base64-encode" } },
  related: ["base64-decoder", "url-encoder", "hash-generator", "jwt-decoder", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "html-minifier"],
  copy: {
    en: {
      name: "Base64 Encoder",
      tagline:
        "Encode text to Base64 instantly with full UTF-8 support — emojis, accents and CJK characters survive intact. Free, private, nothing ever leaves your browser.",
      intro: [
        "Type or paste any text and get its Base64 representation live as you type. Encoding is UTF-8 safe via the standard TextEncoder, so multilingual text, emoji and symbols produce exactly the same bytes every programming language's base64 functions produce. Typical jobs: HTTP Basic Auth headers, data URI prefixes and API payloads that demand Base64.",
        "The output follows RFC 4648 exactly: every 3 input bytes become 4 characters from the 64-character alphabet A–Z, a–z, 0–9, + and /, and leftover bytes are padded with = signs — so length is always a multiple of 4 and the result is about 33% larger than the input. Empty input yields empty output, matching every reference implementation.",
        "Because Base64 operates on bytes, the character encoding matters: this tool always uses UTF-8, which is what btoa replacements, Node's Buffer.from(s, 'utf-8') and Python's base64.b64encode(s.encode()) do — so the result pastes into code without mismatched bytes or a corrupted first character.",
        "The URL-safe variant defined in the same RFC swaps + and / for - and _; this tool emits the standard alphabet used by Authorization headers and data: URIs, where the URL-safe form would be rejected. Compared with shelling out to echo -n … | base64, there is no trailing-newline trap, no quoting mistakes and no terminal needed.",

      ],
      steps: [
        "Paste or type the text you want to encode.",
        "The Base64 output updates live — copy it whenever you are ready.",
        "Paste Base64 back with the linked decoder to round-trip and verify.",
      ],
      faqs: [
        {
          q: "Why does Base64 make my text longer?",
          a: "Base64 represents every 3 bytes as 4 characters, so output is about 33% larger than the input — that is the cost of making binary-safe text.",
        },
        {
          q: "Is Base64 encryption?",
          a: "No. Base64 is an encoding, not encryption — anyone can decode it instantly. Never use it to hide secrets; use real cryptography instead.",
        },
        {
          q: "Are Unicode and emoji supported?",
          a: "Yes. Input is converted to UTF-8 bytes before encoding, which matches what btoa-with-TextEncoder, Python, Java and Node produce for the same string.",
        },
      ],
      deepDive: [
        {
          heading: "The math behind the alphabet",
          paragraphs: [
            "Base64 defined by RFC 4648 works in 6-bit groups: 64 characters need exactly 6 bits, so every 3 bytes (24 bits) pack into 4 characters (4 × 6 bits). Input whose length is not a multiple of 3 leaves 1 or 2 bytes over, and the = padding marks how much the last group is short — one = for 2 bytes, two = for 1. That is why valid Base64 always has a length divisible by 4, and why the output is about 33% larger than the input. That inflation is the price of binary safety, and it matters when you embed images in data URIs or stuff payloads into cookies with size limits.",
            "Before encoding, text must become bytes, and the encoding choice changes everything. This tool always uses UTF-8 via the standard TextEncoder, which is the modern consensus: Python's base64.b64encode(s.encode()), Node's Buffer.from(s).toString('base64') and Java's Base64.getEncoder() all assume UTF-8 for the same string. The browser's legacy btoa() instead throws on characters outside Latin-1 — the classic source of corrupted emoji — which is exactly the mistake UTF-8-first encoding avoids.",
            "Two alphabet variants coexist. The standard one uses + and / and is what HTTP Basic Auth and data: URIs require. The URL-safe variant defined in the same RFC swaps them for - and _ so the string can travel in query parameters and filenames without percent-encoding; JWTs use it. Producing the wrong variant is a common bug — the data decodes either way, but strict consumers reject mismatched characters.",
          ],
        },
        {
          heading: "Encoding is not encryption — and where Base64 belongs",
          paragraphs: [
            "No matter how unreadable the output looks, Base64 offers zero secrecy. There is no key, no round of transformations — just a fixed character map anyone can reverse with one function call, including this tool's decoder. Storing passwords, tokens or license keys “encoded” with Base64 is a real vulnerability pattern seen in misconfigured systems. If the goal is confidentiality, use a real cipher (AES-GCM for data, bcrypt/argon2 for passwords); use Base64 only when a text-only channel must carry bytes.",
            "Where it does belong: HTTP Basic Auth (username:password encoded once per request), inline images inside CSS or HTML via data: URIs, small binary blobs inside JSON, email attachments under MIME, and JWT segments. In all of these the goal is transport, not protection — the receiver decodes deterministically, byte for byte.",
            "A round-trip test is the cheapest sanity check: encode here, then paste the output into the linked decoder and confirm you get the original back — including trailing spaces, emoji and mixed-script text. If a consumer of your Base64 misbehaves, the difference is almost always padding stripping, line wrapping, or the URL-safe alphabet, not the bytes themselves.",
          ],
        },
        {
          heading: "Local encoding, no terminal traps",
          paragraphs: [
            "Everything runs in your browser with JavaScript — the text you paste never leaves your device, nothing is uploaded or logged, and the page works offline once loaded. That matters more than it seems for encoding: Basic Auth credentials, internal API tokens and customer data routinely pass through a Base64 step, and sending them to a third-party site to be encoded defeats the point of the exercise.",
            "Compared with the shell one-liner echo -n 'text' | base64, this tool avoids the classic traps: forgetting -n so a newline gets encoded into the output, quoting mistakes that mangle spaces, and platform differences (macOS base64 wraps at 76 characters, some Windows tools need flags to skip line breaks). The output here is a clean single line you can paste straight into a header or config — with the same privacy guarantee and nothing stored in your shell history.",
          ],
        },
      ],
    },
    zh: {
      name: "Base64 编码",
      tagline: "在线把文本编码为 Base64,完整支持 UTF-8——emoji、重音符号、中日韩文字都不会损坏。免费、私密、数据不出浏览器。",
      intro: [
        "输入或粘贴任意文本,Base64 结果随输入实时刷新。编码通过标准 TextEncoder 做到 UTF-8 安全,多语言文本、emoji 和符号的结果与各种编程语言的 base64 函数完全一致。",
        "适合构造 HTTP Basic Auth 头、data URI 前缀、邮件附件,或任何需要 Base64 负载的 API——不用再翻终端或代码片段。",
      ],
      steps: [
        "粘贴或输入要编码的文本。",
        "Base64 输出实时更新,随时复制。",
        "用配套的解码器把 Base64 解回来,验证往返一致。",
      ],
      faqs: [
        {
          q: "为什么 Base64 会让文本变长?",
          a: "Base64 把每 3 个字节表示成 4 个字符,输出大约比输入长 33%——这是换取二进制安全文本的代价。",
        },
        {
          q: "Base64 是加密吗?",
          a: "不是。Base64 是编码不是加密——任何人都能立即解开。别用它藏秘密,请使用真正的加密算法。",
        },
        {
          q: "支持 Unicode 和 emoji 吗?",
          a: "支持。输入会先转成 UTF-8 字节再编码,与 Python、Java、Node 等对同一字符串的 base64 结果完全一致。",
        },
      ],
      deepDive: [
        {
          heading: "字母表背后的数学",
          paragraphs: [
            "RFC 4648 定义的 Base64 按 6 比特一组工作:64 个字符恰好需要 6 个比特,所以每 3 个字节(24 比特)打包成 4 个字符(4 × 6 比特)。输入长度不是 3 的倍数时会剩下 1 或 2 个字节,= 填充就用来标记最后一组差多少——一个 = 表示 2 字节,两个 = 表示 1 字节。这也是合法 Base64 长度总能被 4 整除、输出比输入大约长 33% 的原因。这个膨胀是二进制安全的代价,在 data URI 内嵌图片或往有大小限制的 cookie 塞负载时需要留意。",
            "编码之前,文本必须先变成字节,而编码方式的选择决定一切。本工具始终通过标准 TextEncoder 使用 UTF-8,这也是现代的共识:Python 的 base64.b64encode(s.encode())、Node 的 Buffer.from(s).toString('base64') 和 Java 的 Base64.getEncoder() 对同一字符串都默认 UTF-8。浏览器遗留的 btoa() 则相反,遇到拉丁字符以外的字符会直接报错——这是 emoji 被损坏的经典来源,而 UTF-8 优先的编码正好避开这个坑。",
            "两种字母表变体并存。标准版使用 + 和 /,是 HTTP Basic Auth 和 data: URI 所要求的。同一 RFC 定义的 URL 安全版把它们换成 - 和 _,让字符串能不带百分号编码地放进查询参数和文件名;JWT 用的就是它。产出错误的变体是常见 bug——数据两种方式都能解码,但严格的消费方会拒绝不匹配的字符。",
          ],
        },
        {
          heading: "编码不是加密——以及 Base64 该用在哪",
          paragraphs: [
            "无论输出看起来多么难懂,Base64 提供的保密性是零。没有密钥、没有多轮变换,只是一个任何人用一个函数调用就能反转的固定字符映射,本工具的解码器也是如此。把密码、token 或 license key 用 Base64 “编码”后存储,是配置不当系统里真实存在的漏洞模式。目标是保密就用真正的密码学(数据用 AES-GCM,密码用 bcrypt/argon2);Base64 只用于纯文本通道需要承载字节的场合。",
            "它真正属于的地方:HTTP Basic Auth(每个请求编码一次 username:password)、通过 data: URI 内嵌到 CSS 或 HTML 的图片、JSON 里的小块二进制、MIME 下的邮件附件、JWT 的各段。这些场景的目标都是传输而不是保护——接收方逐字节确定性地解码。",
            "往返测试是最便宜的健全性检查:在这里编码,再把输出贴进配套解码器,确认能还原原文——包括尾部空格、emoji 和混合文字。如果你的 Base64 消费方表现异常,差别几乎总在填充被去掉、按行折行或 URL 安全字母表,而不在字节本身。",
          ],
        },
        {
          heading: "本地编码,避开终端的坑",
          paragraphs: [
            "一切都在你的浏览器里用 JavaScript 运行——粘贴的文本不会离开设备,不上传、不留记录,页面加载后离线也能用。这对编码来说比看上去更重要:Basic Auth 凭据、内部 API token、客户数据都会经过 Base64 这一步,把它们发给第三方网站去编码,反而破坏了整个操作的意义。",
            "和 shell 一行命令 echo -n 'text' | base64 相比,本工具避开那些经典陷阱:忘记 -n 导致换行符被编进输出、引号写错弄乱空格、平台差异(macOS 的 base64 按 76 字符折行,某些 Windows 工具需要额外参数才能不换行)。这里输出的是干净的单行字符串,可以直接贴进请求头或配置——隐私保障相同,shell 历史里也不会留下任何东西。",
          ],
        },
      ],
    },
    ja: {
      name: "Base64 エンコーダー",
      tagline:
        "テキストを UTF-8 対応で即座に Base64 エンコード。絵文字・アクセント記号・CJK 文字も確実に保持。無料・完全ブラウザ内処理です。",
      intro: [
        "テキストを入力または貼り付けると、Base64 がリアルタイムに得られます。標準の TextEncoder による UTF-8 安全なエンコードなので、多言語テキスト・絵文字・記号の結果は、各言語の base64 関数と完全に一致します。",
        "HTTP Basic Auth ヘッダー、data URI プレフィックス、メール添付、Base64 を要求する API などに。ターミナルやコード断片は不要です。",
      ],
      steps: [
        "エンコードしたいテキストを入力または貼り付けます。",
        "Base64 出力がリアルタイムに更新されるので、好きなときにコピーします。",
        "付属のデコーダーで Base64 を戻し、往復を確認できます。",
      ],
      faqs: [
        {
          q: "Base64 にするとテキストが長くなるのはなぜ?",
          a: "Base64 は 3 バイトを 4 文字で表すため、出力は入力の約 33% 増になります。バイナリセーフなテキストにするための代价です。",
        },
        {
          q: "Base64 は暗号化ですか?",
          a: "いいえ。Base64 はエンコードであって暗号化ではありません。誰でも即座にデコードできます。秘密の隠蔽には使わず、本物の暗号技術を使ってください。",
        },
        {
          q: "Unicode や絵文字は対応していますか?",
          a: "はい。入力は UTF-8 バイトに変換してからエンコードされるため、Python・Java・Node などと同じ結果になります。",
        },
      ],
      deepDive: [
        {
          heading: "アルファベットの裏にある計算",
          paragraphs: [
            "RFC 4648 が定義する Base64 は 6 ビット単位で動きます。64 文字にはちょうど 6 ビットが必要で、3 バイト(24 ビット)が 4 文字(4 × 6 ビット)に詰め込まれます。入力長が 3 の倍数でないと 1〜2 バイト余ります。= パディングは最後のグループがどれだけ足りないかを示すもので、1 つなら 2 バイト、2 つなら 1 バイトです。だから正しい Base64 の長さは必ず 4 の倍数で、出力は入力より約 33% 大きくなります。この膨張はバイナリセーフにするための代償で、data URI への画像埋め込みやサイズ上限のある cookie への詰め込みでは注意が必要です。",
            "エンコードの前にテキストをバイトにする必要があり、その符号化方式の選択がすべてを左右します。このツールは常に標準の TextEncoder で UTF-8 を使います。これが現代の合意です。Python の base64.b64encode(s.encode())、Node の Buffer.from(s).toString('base64')、Java の Base64.getEncoder() は同じ文字列に対して UTF-8 を前提にします。ブラウザの古い btoa() はラテン文字以外で例外を出します。絵文字が壊れる古典的な原因で、UTF-8 優先のエンコードはまさにそれを避けます。",
            "2 つのアルファベット変数が併存しています。標準形は + と / を使い、HTTP Basic Auth と data: URI はこちらを要求します。同じ RFC で定義された URL セーフ形はこれらを - と _ に置き換え、クエリパラメータやファイル名にパーセントエンコードなしで通せるようにします。JWT はこちらです。間違った形を生成するのはよくあるバグで、データはどちらでもデコードできますが、厳密な消費側は不一致の文字を拒否します。",
          ],
        },
        {
          heading: "エンコードは暗号化ではない——Base64 の適所",
          paragraphs: [
            "出力がどれほど読みにくく見えても、Base64 の秘匿性はゼロです。鍵も多段の変換もなく、誰でも関数一つで逆変換できる固定の文字対応表にすぎません。このツールのデコーダーも同様です。パスワードやトークン、ライセンスキーを Base64 で「エンコード」して保存するのは、設定ミスのあるシステムで実際に見られる脆弱性パターンです。機密性が目的なら本物の暗号(データは AES-GCM、パスワードは bcrypt/argon2)を使い、Base64 はテキスト専用チャネルがバイトを運ぶためだけに使ってください。",
            "適しているのは次のような場面です。HTTP Basic Auth(リクエストごとに username:password を一度エンコード)、data: URI による CSS・HTML へのインライン画像、JSON 内の小さなバイナリ、MIME のメール添付、JWT の各セグメント。いずれも目的は保護ではなく輸送で、受信側はバイト単位で決定論的にデコードします。",
            "往復テストは最も安価な健全性チェックです。ここでエンコードし、出力をデコーダーに貼って元に戻るか確認します。末尾の空白・絵文字・混在文字も含めてです。Base64 の消費側がうまく動かない場合、原因はほぼ必ずパディングの除去、行折り返し、URL セーフ文字の不一致のいずれかで、バイトそのものではありません。",
          ],
        },
        {
          heading: "ローカルでエンコード、ターミナルの落とし穴を回避",
          paragraphs: [
            "すべてはブラウザ内の JavaScript で動きます。貼り付けたテキストが端末の外に出ることはなく、アップロードも記録もされず、ページを読み込めばオフラインでも使えます。エンコードではこれは見た目以上に重要です。Basic Auth の資格情報、内部 API トークン、顧客データは Base64 のステップを経由しがちで、それをエンコードしてもらうために第三者のサイトへ送るのは本末転倒です。",
            "シェルのワンライナー echo -n 'text' | base64 と比べると、このツールは古典的な罠を回避します。-n を忘れて改行がエンコードに混ざる、引用符の書き間違いで空白が壊れる、プラットフォーム差(macOS の base64 は 76 文字で折り返し、Windows の一部ツールは改行なしにするのにフラグが要る)などです。出力はヘッダーや設定にそのまま貼れる清潔な 1 行で、プライバシーは同等、シェル履歴には何も残りません。",
          ],
        },
      ],
    },
    es: {
      name: "Codificador Base64",
      tagline:
        "Codifica texto a Base64 al instante con soporte UTF-8 completo: emojis, acentos y caracteres CJK sobreviven intactos. Gratis, privado, nada sale de tu navegador.",
      intro: [
        "Escribe o pega cualquier texto y obtén su Base64 en vivo mientras tecleas. La codificación es UTF-8 segura mediante el TextEncoder estándar, así que el texto multilingüe, los emojis y los símbolos producen exactamente los mismos bytes que las funciones base64 de cualquier lenguaje.",
        "Úsalo para cabeceras HTTP Basic Auth, prefijos data URI, adjuntos de correo o cualquier API que espere payloads Base64 — sin terminal ni fragmentos de código.",
      ],
      steps: [
        "Pega o escribe el texto que quieres codificar.",
        "La salida Base64 se actualiza en vivo: cópiala cuando quieras.",
        "Pega el Base64 en el decodificador vinculado para verificar la ida y vuelta.",
      ],
      faqs: [
        {
          q: "¿Por qué Base64 alarga mi texto?",
          a: "Base64 representa cada 3 bytes como 4 caracteres, así que la salida es un 33 % mayor que la entrada: es el precio de un texto seguro para binario.",
        },
        {
          q: "¿Base64 es cifrado?",
          a: "No. Base64 es una codificación, no cifrado — cualquiera puede decodificarlo al instante. Nunca lo uses para ocultar secretos; usa criptografía real.",
        },
        {
          q: "¿Se admiten Unicode y emojis?",
          a: "Sí. La entrada se convierte a bytes UTF-8 antes de codificar, igual que lo que producen Python, Java o Node para la misma cadena.",
        },
      ],
      deepDive: [
        {
          heading: "Las matemáticas detrás del alfabeto",
          paragraphs: [
            "El Base64 definido por el RFC 4648 trabaja en grupos de 6 bits: 64 caracteres necesitan exactamente 6 bits, así que cada 3 bytes (24 bits) se empaquetan en 4 caracteres (4 × 6 bits). Si la longitud no es múltiplo de 3 quedan 1 o 2 bytes fuera, y el relleno con = indica cuánto le falta al último grupo — un = para 2 bytes, dos = para 1. Por eso un Base64 válido siempre tiene longitud divisible entre 4, y por eso la salida es un 33 % mayor que la entrada. Esa inflación es el precio de la seguridad binaria, y importa al incrustar imágenes en data URIs o meter payloads en cookies con límites de tamaño.",
            "Antes de codificar, el texto debe convertirse en bytes, y la elección de la codificación lo cambia todo. Esta herramienta siempre usa UTF-8 mediante el TextEncoder estándar, que es el consenso moderno: el base64.b64encode(s.encode()) de Python, el Buffer.from(s).toString('base64') de Node y el Base64.getEncoder() de Java asumen UTF-8 para la misma cadena. El antiguo btoa() del navegador en cambio lanza error con caracteres fuera de Latin-1 — la fuente clásica de emojis corruptos — que es justo el error que una codificación UTF-8-first evita.",
            "Dos variantes del alfabeto coexisten. La estándar usa + y / y es la que exigen HTTP Basic Auth y los data: URIs. La variante URL-safe definida en el mismo RFC las cambia por - y _ para que la cadena pueda viajar en parámetros de consulta y nombres de archivo sin percent-encoding; los JWT la usan. Producir la variante equivocada es un bug común — los datos se decodifican de cualquier forma, pero los consumidores estrictos rechazan los caracteres que no coinciden.",
          ],
        },
        {
          heading: "Codificar no es cifrar — y dónde pertenece Base64",
          paragraphs: [
            "Por más ilegible que parezca la salida, Base64 ofrece cero confidencialidad. No hay clave ni rondas de transformaciones — solo un mapa fijo de caracteres que cualquiera puede invertir con una llamada de función, incluido el decodificador de esta herramienta. Guardar contraseñas, tokens o claves de licencia “codificados” con Base64 es un patrón de vulnerabilidad real visto en sistemas mal configurados. Si el objetivo es confidencialidad, usa un cifrado real (AES-GCM para datos, bcrypt/argon2 para contraseñas); usa Base64 solo cuando un canal de solo texto deba transportar bytes.",
            "Donde sí pertenece: HTTP Basic Auth (usuario:contraseña codificado una vez por petición), imágenes en línea dentro de CSS o HTML mediante data: URIs, blobs binarios pequeños dentro de JSON, adjuntos de correo bajo MIME y los segmentos de un JWT. En todos estos casos el objetivo es el transporte, no la protección — el receptor decodifica de forma determinista, byte a byte.",
            "Una prueba de ida y vuelta es la comprobación más barata: codifica aquí, pega la salida en el decodificador enlazado y confirma que recuperas el original — incluyendo espacios finales, emojis y texto mixto. Si un consumidor de tu Base64 se porta mal, la diferencia casi siempre es el relleno eliminado, el salto de línea o el alfabeto URL-safe, no los bytes en sí.",
          ],
        },
        {
          heading: "Codificación local, sin trampas de terminal",
          paragraphs: [
            "Todo se ejecuta en tu navegador con JavaScript — el texto que pegas nunca sale de tu dispositivo, nada se sube ni se registra, y la página funciona sin conexión una vez cargada. Para codificar esto importa más de lo que parece: credenciales de Basic Auth, tokens internos de API y datos de clientes pasan a menudo por un paso de Base64, y enviarlos a un sitio de terceros para codificarlos arruina el propósito del ejercicio.",
            "Comparado con el one-liner echo -n 'text' | base64, esta herramienta evita las trampas clásicas: olvidar -n para que un salto de línea quede codificado en la salida, errores de comillas que estropean espacios, y diferencias entre plataformas (el base64 de macOS parte a los 76 caracteres, algunas herramientas de Windows necesitan flags para no añadir saltos). La salida aquí es una línea limpia que puedes pegar directo en una cabecera o configuración — con la misma garantía de privacidad y sin nada guardado en tu historial del shell.",
          ],
        },
      ],
    },
    pt: {
      name: "Codificador Base64",
      tagline:
        "Codifique texto em Base64 na hora com suporte total a UTF-8 — emojis, acentos e caracteres CJK ficam intactos. Grátis, privado, nada sai do navegador.",
      intro: [
        "Digite ou cole qualquer texto e receba o Base64 ao vivo enquanto escreve. A codificação é UTF-8 segura via TextEncoder padrão, então texto multilíngue, emojis e símbolos produzem exatamente os mesmos bytes que as funções base64 de qualquer linguagem.",
        "Use para cabeçalhos HTTP Basic Auth, prefixos data URI, anexos de e-mail ou qualquer API que espere payloads Base64 — sem terminal nem trecho de código.",
      ],
      steps: [
        "Cole ou digite o texto que quer codificar.",
        "A saída Base64 atualiza ao vivo — copie quando quiser.",
        "Cole o Base64 de volta no decodificador para verificar a ida e volta.",
      ],
      faqs: [
        {
          q: "Por que o Base64 deixa o texto mais longo?",
          a: "O Base64 representa cada 3 bytes como 4 caracteres, então a saída fica cerca de 33% maior que a entrada — é o custo de um texto seguro para binário.",
        },
        {
          q: "Base64 é criptografia?",
          a: "Não. Base64 é codificação, não criptografia — qualquer pessoa pode decodificar na hora. Nunca use para esconder segredos; use criptografia de verdade.",
        },
        {
          q: "Unicode e emoji são suportados?",
          a: "Sim. A entrada é convertida em bytes UTF-8 antes da codificação, igual ao que Python, Java e Node produzem para a mesma string.",
        },
      ],
      deepDive: [
        {
          heading: "A matemática por trás do alfabeto",
          paragraphs: [
            "O Base64 definido pelo RFC 4648 trabalha em grupos de 6 bits: 64 caracteres precisam de exatamente 6 bits, então cada 3 bytes (24 bits) são empacotados em 4 caracteres (4 × 6 bits). Quando o comprimento não é múltiplo de 3, sobram 1 ou 2 bytes, e o padding com = marca quanto falta ao último grupo — um = para 2 bytes, dois = para 1. Por isso um Base64 válido sempre tem comprimento divisível por 4, e por isso a saída fica cerca de 33% maior que a entrada. Essa inflação é o preço da segurança binária, e importa ao embutir imagens em data URIs ou colocar payloads em cookies com limite de tamanho.",
            "Antes de codificar, o texto precisa virar bytes, e a escolha da codificação muda tudo. Esta ferramenta sempre usa UTF-8 via o TextEncoder padrão, que é o consenso moderno: o base64.b64encode(s.encode()) do Python, o Buffer.from(s).toString('base64') do Node e o Base64.getEncoder() do Java assumem UTF-8 para a mesma string. O antigo btoa() do navegador, em vez disso, lança erro com caracteres fora do Latin-1 — a fonte clássica de emojis corrompidos — que é exatamente o erro que uma codificação UTF-8-first evita.",
            "Duas variantes do alfabeto coexistem. A padrão usa + e / e é a exigida por HTTP Basic Auth e data: URIs. A variante URL-safe definida no mesmo RFC as troca por - e _ para que a string possa viajar em parâmetros de consulta e nomes de arquivo sem percent-encoding; os JWTs a usam. Produzir a variante errada é um bug comum — os dados decodificam de qualquer forma, mas consumidores estritos rejeitam os caracteres que não batem.",
          ],
        },
        {
          heading: "Codificar não é criptografar — e onde o Base64 pertence",
          paragraphs: [
            "Por mais ilegível que a saída pareça, o Base64 oferece sigilo zero. Não há chave nem rodadas de transformações — apenas um mapa fixo de caracteres que qualquer pessoa pode reverter com uma chamada de função, incluindo o decodificador desta ferramenta. Armazenar senhas, tokens ou chaves de licença “codificados” com Base64 é um padrão de vulnerabilidade real visto em sistemas mal configurados. Se o objetivo é confidencialidade, use criptografia de verdade (AES-GCM para dados, bcrypt/argon2 para senhas); use Base64 apenas quando um canal somente-texto precisa transportar bytes.",
            "Onde ele pertence: HTTP Basic Auth (usuário:senha codificado uma vez por requisição), imagens inline dentro de CSS ou HTML via data: URIs, blobs binários pequenos dentro de JSON, anexos de e-mail sob MIME e os segmentos de um JWT. Em todos esses casos o objetivo é transporte, não proteção — o receptor decodifica de forma determinística, byte a byte.",
            "Um teste de ida e volta é a verificação mais barata: codifique aqui, cole a saída no decodificador linkado e confirme que você recupera o original — incluindo espaços finais, emojis e texto misto. Se um consumidor do seu Base64 se comporta mal, a diferença quase sempre é padding removido, quebra de linha ou o alfabeto URL-safe, não os bytes em si.",
          ],
        },
        {
          heading: "Codificação local, sem armadilhas de terminal",
          paragraphs: [
            "Tudo roda no seu navegador com JavaScript — o texto que você cola nunca sai do seu dispositivo, nada é enviado ou registrado, e a página funciona offline depois de carregada. Para codificação isso importa mais do que parece: credenciais de Basic Auth, tokens internos de API e dados de clientes passam com frequência por uma etapa de Base64, e enviá-los a um site de terceiros para codificar arruína o propósito do exercício.",
            "Comparado com o one-liner echo -n 'text' | base64, esta ferramenta evita as armadilhas clássicas: esquecer o -n para que uma quebra de linha entre na saída, erros de aspas que estragam espaços, e diferenças entre plataformas (o base64 do macOS quebra a cada 76 caracteres, algumas ferramentas do Windows precisam de flags para não adicionar quebras). A saída aqui é uma linha limpa que você pode colar direto num cabeçalho ou configuração — com a mesma garantia de privacidade e sem nada guardado no histórico do shell.",
          ],
        },
      ],
    },
  },
});
