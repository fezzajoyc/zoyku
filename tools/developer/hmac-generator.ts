import { DevHmacEngine } from "../_engines/dev-engine-hmac";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "hmac-generator",
  category: "developer",
  icon: "key",
  engine: { component: DevHmacEngine, props: { algos: ["SHA-256", "SHA-384", "SHA-512", "SHA-1"], defaultAlgo: "SHA-256" } },
  related: ["sha256-generator", "sha512-generator", "jwt-decoder", "totp-generator", "md5-generator", "base64-image", "json-validator", "json-formatter", "url-encoder", "html-minifier"],
  copy: {
    en: {
      name: "HMAC Generator",
      tagline: "Compute HMAC-SHA-256/384/512 signatures of any message with a secret key — right in your browser via WebCrypto. Essential for webhook verification, API auth, and request signing.",
      intro: [
        "HMAC (Hash-based Message Authentication Code) proves a message came from someone who holds the shared secret — without sending the secret itself. Stripe, GitHub, Slack and most webhook providers sign payloads this way; paste the signature header + your secret here to reproduce and verify it.",
        "Pick SHA-256 for the modern default, SHA-512 for maximal margin, or SHA-1 only when a legacy API demands it. Both hex and Base64 outputs are shown — whichever encoding the service expects.",
      ],
      steps: [
        "Enter the shared secret key — the same string the server or webhook provider gave you.",
        "Paste the raw message body (exact bytes: JSON, query string, timestamp+payload — whatever the API signs).",
        "Compare the produced hex or Base64 signature against the X-Signature header or verify it matches your own request.",
      ],
      faqs: [
        { q: "What's the difference between HMAC and plain hashing?", a: "Plain SHA-256(message) can be computed by anyone. HMAC(secret, message) requires the secret — only someone who holds it can reproduce the signature. That makes HMAC a proof of origin plus integrity, not just a checksum." },
        { q: "Why do webhooks use HMAC?", a: "When Stripe or GitHub posts to your endpoint, they include an HMAC signature of the body. Recompute it with your webhook secret; if it matches, the request genuinely came from them — nobody else can forge it without the key." },
        { q: "Is my secret safe here?", a: "Yes — all computation happens in your browser's WebCrypto engine. The secret and message never leave the device; nothing is logged or transmitted. Still, rotate secrets you paste into any website as a general habit." },
        { q: "HMAC-SHA-256 vs HMAC-SHA-512: which to pick?", a: "SHA-256 is the universal default and what most APIs use. SHA-512 is stronger on paper and actually faster on 64-bit CPUs; use it when the spec gives you a choice. Avoid SHA-1 unless a legacy system mandates it." },
      ],
      deepDive: [
        {
          heading: "How HMAC actually works: two passes, one key",
          paragraphs: [
            "Naively combining a key with a hash — SHA-256(key + message) — has known weaknesses: appending data and re-computing can be possible if the hash's internal state leaks, and key collisions at the block boundary are awkward. HMAC, standardized in RFC 2104 (1997) and later in NIST FIPS 198, avoids both by hashing the key twice in a fixed structure: first the message is hashed with a key XORed with a padding constant (opad), then that result is hashed again with the key XORed with another constant (ipad).",
            "The double construction means the output reveals nothing about the key even when the attacker controls messages, and the inner/outer split blocks the length-extension attacks that plague bare Merkle-Damgård hashes. This is why HMAC-SHA-256 remains secure even though raw SHA-256 has known structural quirks — the wrapper, not the hash alone, provides the authentication property.",
            "Implementation details matter more than people expect. The key is padded or hashed to the block size (64 bytes for SHA-256, 128 for SHA-512); a shorter key is padded with zeros, a longer one is first hashed. Keys substantially longer than the block size or shorter than a few bytes both degrade the construction — the practical sweet spot is a key of 32 to 64 random bytes, exactly what most webhook providers hand out.",
          ],
        },
        {
          heading: "Verifying webhooks without shooting yourself in the foot",
          paragraphs: [
            "The verification failure that fills support tickets is a byte mismatch, not a broken algorithm. Services sign the raw request body — the exact bytes as sent. If your framework re-serializes JSON (reordering keys, changing whitespace, converting line endings) before you verify, the recomputed signature will never match. Compare against the unparsed body, and beware of proxies or body parsers that \"helpfully\" normalize it first.",
            "Some providers (Stripe being the well-known example) sign a constructed string of timestamp plus payload rather than the body alone, and append a timestamp to the header so you can reject stale messages — a replay attack is otherwise possible since HMAC gives no freshness by itself. Always read the provider's verification guide rather than assuming the signed text is just the body. Also mind the encoding of the output: hex versus Base64 is the second most common source of false mismatches.",
            "When comparing signatures, use a constant-time comparison rather than string equality where timing can leak — most languages ship one (crypto.timingSafeEqual in Node, hmac.compare_digest in Python). A signature check that reveals how many leading bytes matched lets an attacker forge signatures byte by byte. It is a small detail, but it is the difference between a verification and an oracle.",
          ],
        },
        {
          heading: "Why local computation matters for a signing tool",
          paragraphs: [
            "A signing tool handles the most sensitive credential a developer has in flight: the shared secret for a payment provider or source control. That shapes the architecture. Everything here runs through the browser's WebCrypto API — the secret and the message are processed inside your own process, and no network request carries them anywhere. There is no server-side equivalent that could log, cache or subpoena them.",
            "The practical consequence is that you can verify a production webhook secret against a real payload without it ever being typed into someone else's log. Still keep the hygiene rule: a secret pasted into any browser tool has passed through clipboard history and possibly an extension's memory, so rotating webhook secrets periodically is good practice even when the tool itself never transmits them.",
            "For long-lived automation, prefer the same primitives in your own code (the Web Crypto API or an HMAC function in your language's standard library) with the secret read from an environment variable or secret manager. A browser tool like this one is for interactive verification and debugging — reproducing a signature to find out why a request was rejected — rather than for embedding into a deployment pipeline.",
          ],
        },
      ],
    },
    zh: {
      name: "HMAC 生成器",
      tagline: "在浏览器里用 WebCrypto 计算 HMAC-SHA-256/384/512 签名——验证 webhook、API 鉴权、请求签名的必备工具。密钥不出本机。",
      intro: [
        "HMAC(基于哈希的消息认证码)能证明一条消息确实来自持有共享密钥的人——而密钥本身无需传输。Stripe、GitHub、Slack 等 webhook 都用它给请求体签名;把签名头和你的密钥放进来即可重现并核对。",
        "默认选 SHA-256 即可;想留更大余量选 SHA-512;仅当旧 API 要求时才用 SHA-1。输出同时给出 hex 和 Base64——按服务端要求取用即可。",
      ],
      steps: [
        "输入共享密钥——与服务端或 webhook 提供方给你的字符串一致。",
        "粘贴原始消息体(精确字节:JSON、query string、时间戳+payload——按 API 签名规则)。",
        "把生成的 hex 或 Base64 签名与 X-Signature 头比对,或用它验证你发出的请求。",
      ],
      faqs: [
        { q: "HMAC 和普通哈希有何区别?", a: "任何人都能算 SHA-256(message),但 HMAC(secret, message) 必须持有密钥才能复现——它同时证明来源与完整性,不只是校验和。" },
        { q: "webhook 为什么用 HMAC?", a: "Stripe/GitHub 推送请求时会带上请求体的 HMAC 签名。你用 webhook 密钥重算一遍,匹配则说明请求确实来自他们——没有密钥的人无法伪造。" },
        { q: "在这里输入密钥安全吗?", a: "安全——全部计算由浏览器 WebCrypto 完成,密钥和消息不离开设备、不传输不记录。但作为习惯,贴进任何网站的密钥都建议定期轮换。" },
        { q: "SHA-256 还是 SHA-512?", a: "SHA-256 是绝大多数 API 的默认选择。SHA-512 理论更强、64 位 CPU 上反而更快,规范允许时可以选。SHA-1 只在旧系统强制时使用。" },
      ],
      deepDive: [
        {
          heading: "HMAC 到底是怎么算的:双重哈希、一把密钥",
          paragraphs: [
            "把密钥和哈希简单地拼起来——SHA-256(key + message)——是有已知缺陷的:一旦哈希内部状态泄露,攻击者可能追加数据并重新计算,密钥在分组边界上的碰撞处理也很别扭。HMAC 由 RFC 2104(1997 年)和后来的 NIST FIPS 198 标准化,用固定的双重结构规避了这些问题:先用与密钥异或一个填充常数(opad)的密钥对消息做哈希,再把结果用异或另一个常数(ipad)的密钥再哈希一次。",
            "双重构造意味着即使攻击者能控制消息,输出也不泄露密钥的任何信息;内外两层的设计挡住了困扰裸 Merkle-Damgård 哈希的长度扩展攻击。这就是为什么即便 SHA-256 本身有已知结构特性,HMAC-SHA-256 依然安全——提供认证属性的是外层包装,而不是哈希函数本身。",
            "实现细节比想象中重要。密钥要填充或哈希到分组长度(SHA-256 是 64 字节,SHA-512 是 128 字节):短密钥补零,长密钥先哈希一遍。密钥明显超过分组长度或只有几个字节都会削弱构造——实践上的甜点区是 32 到 64 字节的随机密钥,大多数 webhook 提供方发下来的正是这个规格。",
          ],
        },
        {
          heading: "验证 webhook 而不踩坑",
          paragraphs: [
            "验证失败里占客服工单最大头的不是算法坏了,而是字节不一致。服务签名的是原始请求体——发送时的精确字节。如果你的框架在验证前重新序列化了 JSON(重排键、改空白、转换换行符),重算的签名永远对不上。用未解析的请求体去验证,并警惕那些「好心」先做归一化的代理或 body parser。",
            "有些提供方(Stripe 是知名例子)签的是「时间戳加 payload」拼出的字符串而不是请求体本身,并在请求头附上时间戳让你可以拒绝过期消息——否则重放攻击可行,因为 HMAC 本身不提供新鲜度。别假设被签的就是请求体,先读提供方的验证文档。另外注意输出编码:hex 还是 Base64,是造成假性不匹配的第二大来源。",
            "比较签名时,在时序可能泄露的场合要用恒定时间比较而不是字符串相等——大多数语言都内置了(Node 的 crypto.timingSafeEqual,Python 的 hmac.compare_digest)。一个能暴露「前多少个字节匹配」的比较,等于让攻击者逐字节伪造签名。这是小细节,却是「验证」与「预言机」的分界线。",
          ],
        },
        {
          heading: "签名工具为什么必须本地算",
          paragraphs: [
            "签名工具经手的是开发者当下最敏感的凭据:支付平台或代码托管服务的共享密钥。这决定了架构。这里的一切都通过浏览器的 WebCrypto API 完成——密钥和消息在你自己的进程里被处理,没有任何网络请求把它们带出去。不存在一个可能在日志里记录、缓存或被调取的服务端副本。",
            "实际意义是:你可以拿生产 webhook 密钥核对真实 payload,而不必把它敲进别人的日志。但卫生规则仍然要守:贴进任何浏览器工具的密钥都经过剪贴板历史,也可能留在某个扩展的内存里,所以即便工具本身从不传输,定期轮换 webhook 密钥也是好习惯。",
            "长期自动化场景应优先在自己代码里用同样的原语(Web Crypto API 或标准库的 HMAC 函数),密钥从环境变量或密钥管理服务读取。浏览器工具适合交互式验证和调试——复现一个签名来查明请求为何被拒——而不是嵌入部署流水线。",
          ],
        },
      ],
    },
    ja: {
      name: "HMAC ジェネレーター",
      tagline: "ブラウザの WebCrypto で HMAC-SHA-256/384/512 署名を計算 — webhook 検証・API 認証・リクエスト署名に必須。鍵は端末から出ません。",
      intro: [
        "HMAC(Hash-based Message Authentication Code)は、共有シークレットを持つ者だけが再現できる署名で、メッセージの出自と完全性を証明します。Stripe・GitHub・Slack の webhook はこの方式でペイロードに署名します。署名ヘッダーと秘密鍵を入れれば、ここで再現して照合できます。",
        "既定は SHA-256、余裕を取るなら SHA-512、レガシー API 指定時のみ SHA-1 を選択。hex と Base64 の両方を出力するので、サービス側の形式に合わせて使えます。",
      ],
      steps: [
        "共有シークレット(サーバー/プロバイダーから渡された文字列)を入力します。",
        "生のメッセージ本体を貼り付けます(JSON、クエリ文字列、タイムスタンプ+ペイロードなど署名対象そのまま)。",
        "生成された hex または Base64 の署名を X-Signature ヘッダーと照合するか、自身のリクエストに使います。",
      ],
      faqs: [
        { q: "HMAC と普通のハッシュの違いは?", a: "SHA-256(message) は誰でも計算できますが、HMAC(secret, message) は秘密鍵を持つ者しか再現できません。チェックサムではなく、出自と完全性の証明になります。" },
        { q: "なぜ webhook で HMAC が使われるの?", a: "Stripe や GitHub がエンドポイントに POST する際、本文の HMAC 署名を添えます。webhook シークレットで再計算して一致すれば、正規の送信元であると確認できます。" },
        { q: "ここに秘密鍵を入れて安全?", a: "はい。計算はすべてブラウザの WebCrypto で行われ、鍵もメッセージも端末の外に出ません。とはいえ、Web サイトに貼った鍵は定期的にローテーションする習慣を推奨します。" },
        { q: "SHA-256 と SHA-512 どちらを選ぶ?", a: "SHA-256 が事実上の標準です。SHA-512 は強度の余裕が大きく、64 ビット CPU では高速なので仕様が許せば有効な選択です。SHA-1 はレガシー指定時のみ。" },
      ],
      deepDive: [
        {
          heading: "HMAC の仕組み:2 回のハッシュ、1 つの鍵",
          paragraphs: [
            "鍵とハッシュを素朴に連結する SHA-256(key + message) には既知の弱点があります。ハッシュの内部状態が漏れるとデータの追記と再計算が可能になったり、ブロック境界での鍵衝突の扱いが不細工だったり。RFC 2104(1997 年)、のちに NIST FIPS 198 で標準化された HMAC は、鍵を固定構造で 2 回ハッシュすることで両方を回避します。まず鍵をパディング定数(opad)と XOR したものを使ってメッセージをハッシュし、その結果を別の定数(ipad)と XOR した鍵でもう一度ハッシュします。",
            "この二重構造により、攻撃者がメッセージを自由に選べる状況でも出力は鍵について何も明かしません。内側と外側の分離は、素の Merkle-Damgård ハッシュを悩ませる長延長攻撃(length-extension)を阻みます。SHA-256 自体に構造的な性質が知られていても HMAC-SHA-256 が安全なのはこのためで、認証性を与えるのはハッシュ単体ではなくこのラッパーです。",
            "実装の細部は思った以上に重要です。鍵はブロック長(SHA-256 なら 64 バイト、SHA-512 なら 128 バイト)までパディングまたはハッシュされます。短い鍵はゼロ埋め、長い鍵は先にハッシュ。ブロック長を大きく超える鍵も数バイトの鍵も構造を弱めます。実務のスイートスポットは 32〜64 バイトのランダムな鍵で、ほとんどの webhook プロバイダーが発行するのはまさにこのサイズです。",
          ],
        },
        {
          heading: "webhook 検証で足を撃たないために",
          paragraphs: [
            "検証失敗の支持チケット一位はアルゴリズムの破綻ではなく、バイトの不一致です。サービスが署名するのは送信された生のリクエストボディ——そのままのバイト列です。フレームワークが検証前に JSON を再シリアライズ(キー順の変更、空白の書き換え、改行コード変換)すると、再計算した署名は永遠に一致しません。未パースのボディで検証し、親切心で正規化してくるプロキシや body parser にも注意してください。",
            "プロバイダーによっては(Stripe が有名)、ボディ単体ではなくタイムスタンプとペイロードを組み合わせた文字列を署名し、ヘッダーにタイムスタンプを添えて古いメッセージを拒否できるようにしています。HMAC 自体は新鮮さを保証しないため、これがないとリプレイ攻撃が可能です。署名対象はボディだと決め打ちせず、まずプロバイダーの検証ガイドを読んでください。出力エンコーディング——hex か Base64 か——は偽の不一致の二番目の原因です。",
            "署名の比較は、タイミングが漏れうる場面では文字列比較ではなく定数時間比較を使ってください。Node の crypto.timingSafeEqual、Python の hmac.compare_digest など、多くの言語に組み込みがあります。先頭から何バイト一致したかを漏らす比較は、攻撃者に 1 バイトずつ署名を偽造することを許します。細かい話ですが、「検証」と「オラクル」の分かれ目です。",
          ],
        },
        {
          heading: "署名ツールがローカル実行であるべき理由",
          paragraphs: [
            "署名ツールが扱うのは、開発者が今まさに手にしている最も敏感な認証情報——決済プロバイダーや SCM の共有シークレットです。それがアーキテクチャを決めます。ここでの処理はすべてブラウザの WebCrypto API が担い、鍵とメッセージは自分自身のプロセス内で処理され、ネットワークリクエストはどこへも運びません。記録やキャッシュ、召喚されうるサーバー側の複製は存在しないのです。",
            "実利面では、本番の webhook シークレットを実際のペイロードに対して検証できても、それが誰かのログに打ち込まれることはありません。とはいえ衛生ルールは保ちましょう。ブラウザツールに貼った鍵はクリップボード履歴を通りますし、拡張機能のメモリに残ることもあります。ツール自体が送信しなくても、webhook シークレットの定期ローテーションは良い習慣です。",
            "長期の自動化では、自分のコードで同じプリミティブ(Web Crypto API や標準ライブラリの HMAC 関数)を使い、鍵は環境変数やシークレットマネージャーから読む方が良い選択です。ブラウザツールは対話的な検証とデバッグ——リクエストが拒否された理由を知るために署名を再現する——のためのもので、デプロイパイプラインに組み込むものではありません。",
          ],
        },
      ],
    },
    es: {
      name: "Generador HMAC",
      tagline: "Calcula firmas HMAC-SHA-256/384/512 de cualquier mensaje con una clave secreta — en tu navegador con WebCrypto. Esencial para verificar webhooks, auth de API y firma de peticiones.",
      intro: [
        "HMAC (Hash-based Message Authentication Code) demuestra que un mensaje proviene de quien posee el secreto compartido — sin transmitir el secreto. Stripe, GitHub, Slack y la mayoría de webhooks firman así sus cargas; pega la cabecera de firma y tu secreto para reproducirla y verificarla aquí.",
        "Usa SHA-256 por defecto, SHA-512 para mayor margen y SHA-1 solo cuando una API heredada lo exija. Se muestran las salidas en hex y en Base64, según lo que espere el servicio.",
      ],
      steps: [
        "Introduce la clave secreta compartida — la misma cadena que te dio el servidor o proveedor del webhook.",
        "Pega el cuerpo del mensaje tal cual (bytes exactos: JSON, query string, timestamp+payload — lo que la API firme).",
        "Compara la firma hex o Base64 generada con la cabecera X-Signature, o úsala para firmar tu propia petición.",
      ],
      faqs: [
        { q: "¿Qué diferencia hay entre HMAC y un hash normal?", a: "Cualquiera puede calcular SHA-256(mensaje). HMAC(secreto, mensaje) requiere el secreto: solo quien lo posee puede reproducir la firma. Es prueba de origen e integridad, no un simple checksum." },
        { q: "¿Por qué los webhooks usan HMAC?", a: "Stripe o GitHub incluyen una firma HMAC del cuerpo al hacer POST a tu endpoint. Recalculándola con tu secreto de webhook confirmas que la petición viene realmente de ellos; sin la clave nadie puede falsificarla." },
        { q: "¿Es seguro pegar mi secreto aquí?", a: "Sí — todo se calcula en el WebCrypto de tu navegador. El secreto y el mensaje no salen del dispositivo ni se registran. Aun así, rota los secretos que pegues en cualquier web como hábito general." },
        { q: "¿HMAC-SHA-256 o HMAC-SHA-512?", a: "SHA-256 es el estándar universal. SHA-512 ofrece más margen y en CPU de 64 bits es incluso más rápido; úsalo cuando la especificación lo permita. Evita SHA-1 salvo que un sistema legado lo exija." },
      ],
      deepDive: [
        {
          heading: "Cómo funciona HMAC de verdad: dos pasadas, una clave",
          paragraphs: [
            "Combinar la clave con el hash de forma ingenua — SHA-256(clave + mensaje) — tiene debilidades conocidas: si el estado interno del hash se filtra, alguien puede añadir datos y recomputar, y las colisiones de clave en el límite de bloque se gestionan mal. HMAC, estandarizado en el RFC 2104 (1997) y después en NIST FIPS 198, evita ambas cosas con una estructura doble fija: primero se hashea el mensaje usando la clave XORed con una constante de relleno (opad), y luego ese resultado se vuelve a hashear con la clave XORed con otra constante (ipad).",
            "La doble construcción hace que la salida no revele nada sobre la clave aunque el atacante controle los mensajes, y la separación interior/exterior bloquea los ataques de extensión de longitud que acosan a los hashes Merkle-Damgård puros. Por eso HMAC-SHA-256 sigue siendo seguro aunque el SHA-256 crudo tenga peculiaridades estructurales conocidas — la propiedad de autenticación la da el envoltorio, no el hash solo.",
            "Los detalles de implementación importan más de lo que se espera. La clave se rellena o hashea hasta el tamaño de bloque (64 bytes para SHA-256, 128 para SHA-512); una clave más corta se rellena con ceros y una más larga se hashea primero. Claves muy por encima del tamaño de bloque o de apenas unos bytes degradan la construcción — el punto dulce práctico son 32 a 64 bytes aleatorios, exactamente lo que entregan la mayoría de proveedores de webhooks.",
          ],
        },
        {
          heading: "Verificar webhooks sin dispararse en el pie",
          paragraphs: [
            "El fallo de verificación que llena los tickets de soporte es una diferencia de bytes, no un algoritmo roto. Los servicios firman el cuerpo de la petición en bruto — los bytes exactos tal como se enviaron. Si tu framework re-serializa el JSON antes de verificar (reordenando claves, cambiando espacios, convirtiendo saltos de línea), la firma recalculada jamás coincidirá. Compara contra el cuerpo sin parsear y desconfía de proxies o body parsers que lo \"normalizan\" por adelantado.",
            "Algunos proveedores (Stripe es el ejemplo conocido) firman una cadena construida con timestamp más payload en lugar del cuerpo solo, y añaden un timestamp a la cabecera para que puedas rechazar mensajes viejos — sin eso, el replay es posible porque HMAC no aporta frescura por sí mismo. No des por hecho que lo firmado es el cuerpo: lee la guía de verificación del proveedor. Y vigila la codificación de la salida: hex frente a Base64 es la segunda causa más común de falsas discrepancias.",
            "Al comparar firmas, usa una comparación en tiempo constante en lugar de igualdad de cadenas donde el timing puede filtrar — casi todos los lenguajes traen una (crypto.timingSafeEqual en Node, hmac.compare_digest en Python). Una comparación que revela cuántos bytes iniciales coincidieron deja que un atacante forje la firma byte a byte. Es un detalle pequeño, pero es la línea entre una verificación y un oráculo.",
          ],
        },
        {
          heading: "Por qué una herramienta de firma debe correr en local",
          paragraphs: [
            "Una herramienta de firma maneja el credencial más sensible que un desarrollador tiene en vuelo: el secreto compartido de un proveedor de pagos o del repositorio de código. Eso condiciona la arquitectura. Todo aquí pasa por la API WebCrypto del navegador — el secreto y el mensaje se procesan dentro de tu propio proceso y ninguna petición de red los lleva a ninguna parte. No existe una réplica en servidor que pueda registrarlos, cachearlos o ser requisada.",
            "La consecuencia práctica es que puedes verificar un secreto de webhook de producción contra un payload real sin escribirlo jamás en el log de otro. Aun así mantén la regla de higiene: un secreto pegado en cualquier herramienta de navegador ha pasado por el historial del portapapeles y quizá por la memoria de alguna extensión, así que rotar los secretos de webhook periódicamente es buena práctica incluso cuando la herramienta nunca los transmite.",
            "Para automatización de larga vida, prefiere las mismas primitivas en tu propio código (la API Web Crypto o una función HMAC de la librería estándar de tu lenguaje) con el secreto leído de una variable de entorno o de un gestor de secretos. Una herramienta de navegador como esta es para verificación y depuración interactiva — reproducir una firma para averiguar por qué una petición fue rechazada — no para incrustarse en un pipeline de despliegue.",
          ],
        },
      ],
    },
    pt: {
      name: "Gerador HMAC",
      tagline: "Calcule assinaturas HMAC-SHA-256/384/512 de qualquer mensagem com uma chave secreta — no navegador via WebCrypto. Essencial para verificar webhooks, auth de API e assinatura de requisições.",
      intro: [
        "HMAC (Hash-based Message Authentication Code) prova que uma mensagem veio de quem detém o segredo compartilhado — sem transmitir o segredo. Stripe, GitHub, Slack e a maioria dos webhooks assinam os payloads assim; cole a assinatura e seu segredo para reproduzir e verificar aqui.",
        "Use SHA-256 como padrão, SHA-512 para margem extra e SHA-1 só quando uma API legada exigir. Saídas em hex e Base64 — use o formato que o serviço espera.",
      ],
      steps: [
        "Digite a chave secreta compartilhada — a mesma string que o servidor ou provedor do webhook te deu.",
        "Cole o corpo da mensagem tal qual (bytes exatos: JSON, query string, timestamp+payload — o que a API assina).",
        "Compare a assinatura hex ou Base64 gerada com o cabeçalho X-Signature, ou use para assinar sua própria requisição.",
      ],
      faqs: [
        { q: "Qual a diferença entre HMAC e hash comum?", a: "Qualquer um calcula SHA-256(mensagem). HMAC(segredo, mensagem) exige o segredo: só quem o possui reproduz a assinatura. É prova de origem e integridade, não apenas checksum." },
        { q: "Por que webhooks usam HMAC?", a: "Stripe ou GitHub incluem uma assinatura HMAC do corpo ao dar POST no seu endpoint. Recalculando com seu segredo de webhook, você confirma que a requisição veio deles de verdade — sem a chave ninguém forja." },
        { q: "É seguro colar meu segredo aqui?", a: "Sim — o cálculo roda no WebCrypto do navegador. Segredo e mensagem não saem do dispositivo nem são registrados. Mesmo assim, como hábito, rotacione segredos que você colar em qualquer site." },
        { q: "HMAC-SHA-256 ou HMAC-SHA-512?", a: "SHA-256 é o padrão universal. SHA-512 dá margem maior e em CPU de 64 bits chega a ser mais rápido; use quando a especificação permitir. Evite SHA-1 salvo exigência de sistema legado." },
      ],
      deepDive: [
        {
          heading: "Como o HMAC funciona de verdade: duas passadas, uma chave",
          paragraphs: [
            "Combinar a chave com o hash de forma ingênua — SHA-256(chave + mensagem) — tem fraquezas conhecidas: se o estado interno do hash vaza, alguém pode acrescentar dados e recomputar, e colisões da chave no limite de bloco ficam desconfortáveis. O HMAC, padronizado no RFC 2104 (1997) e depois no NIST FIPS 198, evita as duas coisas com uma estrutura dupla fixa: primeiro a mensagem é hasheada com a chave XORed com uma constante de padding (opad), e esse resultado é hasheado de novo com a chave XORed com outra constante (ipad).",
            "A construção dupla faz com que a saída não revele nada sobre a chave mesmo quando o atacante controla as mensagens, e a separação interna/externa bloqueia os ataques de extensão de comprimento que atormentam hashes Merkle-Damgård puros. Por isso o HMAC-SHA-256 segue seguro mesmo com as peculiaridades estruturais conhecidas do SHA-256 cru — a propriedade de autenticação vem do envoltório, não do hash sozinho.",
            "Detalhes de implementação importam mais do que se espera. A chave é preenchida ou hasheada até o tamanho de bloco (64 bytes para SHA-256, 128 para SHA-512); chave mais curta recebe zeros, mais longa é hasheada antes. Chaves muito acima do tamanho de bloco ou de poucos bytes degradam a construção — o ponto ideal na prática são 32 a 64 bytes aleatórios, exatamente o que a maioria dos provedores de webhook entrega.",
          ],
        },
        {
          heading: "Verificar webhooks sem se dar um tiro no pé",
          paragraphs: [
            "A falha de verificação que enche os tickets de suporte é uma diferença de bytes, não um algoritmo quebrado. Os serviços assinam o corpo da requisição em bruto — os bytes exatos como foram enviados. Se seu framework re-serializa o JSON antes de você verificar (reordenando chaves, mudando espaços, convertendo quebras de linha), a assinatura recalculada nunca vai bater. Compare contra o corpo não parseado e desconfie de proxies ou body parsers que o \"normalizam\" antes.",
            "Alguns provedores (Stripe é o exemplo conhecido) assinam uma string montada com timestamp mais payload em vez do corpo sozinho, e anexam um timestamp ao cabeçalho para você poder rejeitar mensagens velhas — sem isso, replay é possível porque o HMAC não traz frescor por si só. Não presuma que o que foi assinado é o corpo: leia o guia de verificação do provedor. E atente para a codificação da saída: hex versus Base64 é a segunda causa mais comum de falsas divergências.",
            "Ao comparar assinaturas, use comparação em tempo constante em vez de igualdade de strings onde o timing pode vazar — quase toda linguagem traz uma (crypto.timingSafeEqual no Node, hmac.compare_digest no Python). Uma comparação que revela quantos bytes iniciais bateram deixa o atacante forjar a assinatura byte a byte. É um detalhe pequeno, mas é a fronteira entre uma verificação e um oráculo.",
          ],
        },
        {
          heading: "Por que uma ferramenta de assinatura deve rodar localmente",
          paragraphs: [
            "Uma ferramenta de assinatura lida com o credencial mais sensível que um desenvolvedor tem em trânsito: o segredo compartilhado de um provedor de pagos ou do repositório de código. Isso molda a arquitetura. Tudo aqui passa pela API WebCrypto do navegador — o segredo e a mensagem são processados dentro do seu próprio processo, e nenhuma requisição de rede os leva a lugar algum. Não existe uma réplica em servidor que possa registrá-los, cacheá-los ou ser requisada.",
            "A consequência prática é que você pode verificar um segredo de webhook de produção contra um payload real sem nunca digitá-lo no log de outra pessoa. Mantenha ainda a regra de higiene: um segredo colado em qualquer ferramenta de navegador passou pelo histórico da área de transferência e talvez pela memória de uma extensão, então rotacionar segredos de webhook periodicamente é boa prática mesmo quando a ferramenta nunca os transmite.",
            "Para automação de longa vida, prefira as mesmas primitivas no seu próprio código (a API Web Crypto ou uma função HMAC da biblioteca padrão da sua linguagem) com o segredo lido de variável de ambiente ou de um gerenciador de segredos. Uma ferramenta de navegador como esta serve para verificação e depuração interativa — reproduzir uma assinatura para descobrir por que uma requisição foi rejeitada — e não para embutir num pipeline de deploy.",
          ],
        },
      ],
    },
  },
});
