import { DevEngineTokenGenerator } from "../_engines/dev-engine-token";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "token-generator",
  category: "security",
  icon: "key",
  engine: { component: DevEngineTokenGenerator },
  related: ["password-generator", "password-strength", "uuid-generator", "ulid-generator", "totp-generator", "hmac-generator", "sha256-generator"],
  copy: {
    en: {
      name: "Token Generator",
      tagline: "Generate cryptographically random API tokens, session IDs and secrets in your browser — crypto.getRandomValues, batch output, entropy shown per token.",
      intro: [
        "API keys, bearer tokens, webhook secrets, session identifiers, CSV export nonces — most of them are just random strings, and the wrong way to make them is Math.random(). This generator uses crypto.getRandomValues, the browser's cryptographic random source, so every token is uniformly drawn from its character set with no predictable bias.",
        "Choose a length from 8 to 128 characters, a character set (alphanumeric, hex, or alphanumeric plus URL-safe symbols), an optional prefix for grep-ability in logs, and generate up to 50 at once — useful when seeding test fixtures or provisioning multiple services. The estimated entropy in bits is shown for the current settings, so you can see that a 32-character alphanumeric token carries ~190 bits.",
        "Tokens are generated in memory and never transmitted: reload the page and they are gone. That makes the tool safe for production secrets, not just test data — though for anything long-lived, a password manager or secret store remains the right place to keep them.",
      ],
      steps: [
        "Set the length, character set, optional prefix and how many tokens you need.",
        "Click Generate — the tokens appear as a list, each with a one-click copy button.",
        "Click Refresh for a new batch; copy the ones you need before leaving the page.",
      ],
      faqs: [
        {
          q: "Is this safe for production API keys?",
          a: "Yes. crypto.getRandomValues is the same CSPRNG that TLS and password managers rely on, and generation happens entirely in your browser's memory — nothing is sent over the network or persisted. The theoretical security of the token equals the entropy shown, so pick a length that matches your threat model.",
        },
        {
          q: "How long should my token be?",
          a: "For internal API keys and session IDs, 32 alphanumeric characters (~190 bits) is far beyond brute-force reach. Hex tokens are popular because they map to bytes exactly: 32 hex characters = 16 random bytes. Symbols add entropy per character but can break systems that don't URL-encode headers — use them only where the consumer handles them.",
        },
        {
          q: "Token vs UUID vs ULID — which one?",
          a: "Use opaque random tokens (this tool) when the identifier must be unguessable: API keys, session tokens, webhook secrets. UUIDs/ULIDs are for identifiers that may need to be generated in parallel or sorted by time — they leak timing or count information and should not carry security weight. If you need a sortable ID instead of a secret, use the ULID generator.",
        },
      ],
      deepDive: [
        {
          heading: "Token length and the arithmetic of brute force",
          paragraphs: [
            "A token's security is its entropy, and entropy is simple arithmetic: log2 of the character-set size, times the length. The 62-character alphanumeric set gives about 5.95 bits per character, so 32 characters is ~190 bits — a search space no conceivable hardware can walk. Even 16 alphanumeric characters (~95 bits) sits comfortably beyond online guessing and most offline scenarios.",
            "What length actually buys you is margin against two realities: the token leaks partially (a log, a referrer header, a screenshot) and algorithms improve. A 128-bit token with 30 bits leaked still carries 98 — fine; a 40-bit token leaked by 10 is nearly spent. This is why the honest recommendation is “more than you think you need”: entropy is cheap, rotations after exposure are expensive.",
            "One caveat the readout cannot see: entropy measures the generation process, not the handling. A perfectly random 190-bit token pasted into a ticket, committed to a repository or logged by a proxy has an effective strength of zero until rotated. Length protects against guessing; hygiene protects against everything else.",
          ],
        },
        {
          heading: "Opaque tokens vs. UUIDs: not the same job",
          paragraphs: [
            "It is tempting to treat any random-looking string as a secret, but identifiers split into two families with opposite requirements. UUIDs and ULIDs are designed to be generated anywhere, in parallel, and (for ULID) sorted by time — which means they deliberately encode information: version bits, timestamps, sometimes a counter. Guessability is not their concern.",
            "An opaque random token is the opposite: it encodes nothing and exists only to be unguessable. That is the right primitive for API keys, bearer tokens, session identifiers and webhook secrets. Using a UUID v1 as a session ID, for example, leaks the machine's MAC address and generation time — a real historical vulnerability class, not a theoretical one.",
            "Hex deserves a note: it maps exactly to bytes (32 hex characters = 16 random bytes), which is why so many protocols display secrets that way, but it carries only 4 bits per character — half the density of alphanumeric. Symbols raise density but break consumers that do not URL-encode headers; pick the set your consumer actually accepts.",
          ],
        },
        {
          heading: "Why Math.random fails secrets, and local generation",
          paragraphs: [
            "Math.random() is a pseudo-random generator whose internal state is finite and reconstructible: an attacker who observes enough outputs — or who knows roughly when the token was generated — can reproduce it. Tokens built on it have looked random and been predicted in real incidents; the shortcut survives in tutorials and Stack Overflow answers, which is exactly why it keeps happening.",
            "crypto.getRandomValues is the browser's cryptographically secure source, seeded by the OS from hardware entropy and designed so that no observer can predict the next output from the previous ones. This tool draws from it and maps bytes onto your chosen charset without bias, then displays the resulting entropy so the number is auditable rather than asserted.",
            "Generation is also local: tokens are created in your browser's memory and never transmitted, so a production secret born here never appears in a third-party server log. Reload the page and they are gone — copy them into your secret store in the same session. For long-lived credentials, that store is the permanent home; the generator is the birthplace, not the archive.",
          ],
        },
      ],
    },
    zh: {
      name: "Token 生成器",
      tagline: "在浏览器里生成密码学安全的 API Token、会话 ID 和密钥——crypto.getRandomValues 驱动,支持批量生成,实时显示每个 Token 的熵。",
      intro: [
        "API 密钥、Bearer Token、webhook 密钥、会话 ID、导出文件随机名——大多数就是一串随机字符,而错误的生成方式是 Math.random()。本工具使用 crypto.getRandomValues(浏览器的密码学随机源),每个 Token 都从字符集中均匀抽取,没有任何可预测偏差。",
        "可选 8–128 位长度、字符集(字母数字/十六进制/加 URL 安全符号)、可选前缀(方便在日志里 grep),一次最多生成 50 个——批量造测试数据或同时给多个服务发密钥时很方便。当前设置下每个 Token 的估算熵(比特)会实时显示,比如 32 位字母数字约 190 比特。",
        "Token 只在内存里生成、从不传输:刷新页面即消失。因此它不仅能造测试数据,生产密钥也安全——不过长期使用的密钥,最终归宿还是密码管理器或密钥管理服务。",
      ],
      steps: [
        "设置长度、字符集、可选前缀和生成数量。",
        "点击生成——Token 以列表显示,每个都有一键复制按钮。",
        "点「换一批」重新生成;离开页面前把需要的复制走。",
      ],
      faqs: [
        {
          q: "能用来生成生产环境的 API 密钥吗?",
          a: "可以。crypto.getRandomValues 与 TLS、密码管理器用的是同一类密码学安全随机源,且生成完全发生在浏览器内存里——不经过网络、不留存。Token 的理论强度就是显示的熵值,按你的威胁模型选长度即可。",
        },
        {
          q: "Token 应该多长?",
          a: "内部 API 密钥和会话 ID 用 32 位字母数字(约 190 比特)已经远超暴力破解范围。十六进制 Token 流行的原因是与字节精确对应:32 个十六进制字符 = 16 个随机字节。符号能提高单字符熵,但遇到不做 URL 编码的系统会出问题——只在消费方能处理时使用。",
        },
        {
          q: "Token、UUID、ULID 怎么选?",
          a: "需要不可猜测时用不透明随机 Token(API 密钥、会话、webhook 密钥)。UUID/ULID 适合并行生成或按时间排序的标识符——它们会泄露时序或数量信息,不应承担安全职责。要可排序 ID 而非密钥,用 ULID 生成器。",
        },
      ],
      deepDive: [
        {
          heading: "Token 长度与暴力破解的算术",
          paragraphs: [
            "Token 的安全性就是它的熵,而熵是简单的算术:字符集大小取 log2,乘以长度。62 字符的字母数字集每字符约 5.95 比特,32 个字符约 190 比特——这是一个任何想象得到的硬件都走不完的搜索空间。即便 16 位字母数字(约 95 比特)也已稳稳超出在线猜测和大多数离线攻击场景。",
            "长度真正买到的是对两件事的余量:Token 被部分泄露(日志、Referer 头、截图),以及算法进步。128 比特的 Token 泄掉 30 比特还剩 98 比特——没事;40 比特的 Token 泄掉 10 比特就快见底了。所以诚实的建议是“比你以为需要的更长”:熵很便宜,泄露后轮换很贵。",
            "读数看不见的一个提醒:熵衡量的是生成过程,不是保管过程。一个完美随机的 190 比特 Token,被贴进工单、提交进仓库或被代理记进日志,在轮换之前的有效强度就是零。长度防猜测,卫生防其余一切。",
          ],
        },
        {
          heading: "不透明 Token 与 UUID:干的是两种活",
          paragraphs: [
            "把任何长得随机的字符串都当秘密很有诱惑力,但标识符分两类,要求相反。UUID 和 ULID 的设计目标是随处并行生成、(ULID)按时间排序——这意味着它们刻意编码信息:版本位、时间戳、有时还有计数器。可猜测性从来不在它们的考虑范围。",
            "不透明随机 Token 正相反:不编码任何东西,存在的唯一意义就是不可猜测。API 密钥、Bearer Token、会话 ID、webhook 密钥都该用这个原语。拿 UUID v1 当会话 ID,泄露的是机器 MAC 地址和生成时间——这是真实存在过的漏洞类型,不是理论上的。",
            "十六进制值得单独一提:它与字节精确对应(32 个十六进制字符 = 16 个随机字节),所以很多协议都用这种形式展示密钥;但每字符只携带 4 比特,密度是字母数字的一半。符号密度更高,却会让不做 URL 编码的消费方出错;选你的消费方真正接受的字符集就好。",
          ],
        },
        {
          heading: "为什么 Math.random 不能用来造密钥,以及本地生成",
          paragraphs: [
            "Math.random() 是伪随机数生成器,内部状态有限且可重建:攻击者观察到足够多输出——或大致知道 Token 的生成时间——就能复现它。基于它的 Token“看起来随机”却在真实事故中被预测过;这个捷径至今还活在教程和 Stack Overflow 答案里,所以事故才会反复发生。",
            "crypto.getRandomValues 是浏览器的加密安全随机源,种子来自操作系统的硬件熵,设计目标是任何观察者都无法从之前的输出预测下一个。本工具从它取样,无偏地映射到你选的字符集,并把结果熵显示出来——这个数字是可审计的,不是一句口头保证。",
            "生成也是本地的:Token 只在你的浏览器内存中诞生、从不传输,在这里出生的生产密钥不会出现在任何第三方服务器日志里。刷新页面它们就消失——请在同一会话里复制进密钥库。长期凭据的常驻之所是密钥库;生成器是出生地,不是档案室。",
          ],
        },
      ],
    },
    ja: {
      name: "トークンジェネレーター",
      tagline: "ブラウザ内で暗号学的に安全な API トークン・セッション ID を生成 — crypto.getRandomValues 使用、一括生成対応、トークンごとのエントロピーを表示。",
      intro: [
        "API キー、Bearer トークン、webhook シークレット、セッション ID、エクスポート用ナンス — その多くは単なるランダム文字列であり、誤った生成方法は Math.random() です。このツールはブラウザの暗号学的乱数源 crypto.getRandomValues を使用し、各トークンを文字集合から偏りなく一様に抽出します。",
        "長さ 8〜128 文字、文字集合(英数字 / 16 進 / URL 安全な記号付き)、ログ検索用の接頭辞を指定でき、最大 50 個を一括生成 — テストデータの投入や複数サービスへのキー発行に便利です。現在の設定での推定エントロピー(ビット)をリアルタイム表示します(例:32 文字の英数字で約 190 ビット)。",
        "トークンはメモリ上で生成され送信されません:ページを再読み込みすれば消えます。テストデータだけでなく本番用シークレットにも安全ですが、長期利用する鍵の最終的な保管先はパスワードマネージャーやシークレットストアです。",
      ],
      steps: [
        "長さ・文字集合・接頭辞(任意)・生成数を設定します。",
        "生成をクリック — トークンがリスト表示され、各項目にワンクリックコピーが付きます。",
        "「再生成」で新しいバッチに切り替え;必要なものをコピーしてからページを離れます。",
      ],
      faqs: [
        {
          q: "本番環境の API キーに使えますか?",
          a: "はい。crypto.getRandomValues は TLS やパスワードマネージャーと同じクラスの CSPRNG で、生成は完全にブラウザのメモリ内で行われます — ネットワーク送信も保存もありません。トークンの理論強度は表示されたエントロピーそのものなので、脅威モデルに応じた長さを選んでください。",
        },
        {
          q: "トークンの長さはどれくらいが適切?",
          a: "内部 API キーやセッション ID なら 32 文字の英数字(約 190 ビット)でブルートフォースの範囲を遥かに超えます。16 進トークンが好まれるのはバイトと正確に対応するからです:32 文字の 16 進 = 16 ランダムバイト。記号を加えると文字あたりのエントロピーは増えますが、URL エンコードしないシステムでは壊れることがあります。",
        },
        {
          q: "トークン・UUID・ULID の使い分けは?",
          a: "推測されては困る識別子(API キー、セッショントークン、webhook シークレット)には不透明なランダムトークン(このツール)を使います。UUID/ULID は並列生成や時刻順ソートが必要な識別子向けで、時序や個数の情報が漏れるためセキュリティ用途には向きません。ソート可能な ID が必要なら ULID ジェネレーターを。",
        },
      ],
      deepDive: [
        {
          heading: "トークンの長さと総当たりの算術",
          paragraphs: [
            "トークンの安全性はそのエントロピーであり、エントロピーは単純な算数です。文字集合の大きさの log2 × 長さ。62 文字の英数字集合は 1 文字あたり約 5.95 ビットなので、32 文字で約 190 ビット——考えうるどんなハードウェアでも歩き切れない探索空間です。16 文字の英数字(約 95 ビット)でも、オンライン推測や大半のオフラインシナリオを余裕で超えます。",
            "長さが実際に買うのは、二つの現実への余裕です。トークンが部分的に漏れること(ログ、Referer ヘッダー、スクリーンショット)と、アルゴリズムが進歩すること。128 ビットのトークンは 30 ビット漏れても 98 残り、十分です。40 ビットのトークンは 10 漏れればほぼ底を尽きます。だから誠実な推奨は「自分が思う必要量より長く」。エントロピーは安く、漏洩後のローテーションは高いのです。",
            "表示が見えない注意点も一つ。エントロピーは生成過程を測るのであって、取り扱いを測るのではありません。完璧にランダムな 190 ビットのトークンも、チケットに貼られ、リポジトリにコミットされ、プロキシにログされれば、ローテーションするまで実効強度はゼロです。長さは推測に効き、衛生管理はそれ以外のすべてに効きます。",
          ],
        },
        {
          heading: "不透明トークンと UUID:やっている仕事が違う",
          paragraphs: [
            "ランダムに見える文字列をすべて秘密として扱う誘惑はありますが、識別子は要件が正反対の二つの家族に分かれます。UUID や ULIDは、どこでも並列に生成でき、(ULIDは)時刻順にソートできるよう設計されています。つまり意図的に情報を刻んでいる——バージョンビット、タイムスタンプ、場合によってはカウンターです。推測不可能性は彼らの関心事ではありません。",
            "不透明なランダムトークンはその対極です。何も刻まず、存在理由は推測不可能であることだけ。API キー、Bearer トークン、セッション識別子、webhook シークレットにふさわしい原始部品はこれです。たとえば UUID v1 をセッション ID に使うと、そのマシンの MAC アドレスと生成時刻が漏れます——理論ではなく、実在した脆弱性の型です。",
            "16 進にも触れておきます。バイトと正確に対応し(32 文字の 16 進 = 16 ランダムバイト)、多くのプロトコルがこの形式でシークレットを表示する理由ですが、1 文字あたりの運搬量は 4 ビットで、英数字の半分です。記号は密度を上げる一方、URL エンコードしない消費側を壊します。消費側が実際に受け付ける集合を選んでください。",
          ],
        },
        {
          heading: "Math.random がシークレットに使えない理由と、ローカル生成",
          paragraphs: [
            "Math.random() は内部状態が有限で再構成可能な擬似乱数生成器です。十分な出力を観察した攻撃者——あるいはトークンの生成時刻を大まかに知る攻撃者——はそれを再現できます。それで作られたトークンは「ランダムに見える」のに実際の事故で予測された例があり、この近道は今もチュートリアルや Stack Overflow の回答に生き続けているので、事故は繰り返されます。",
            "crypto.getRandomValues はブラウザの暗号論的に安全な乱数源で、OS がハードウェアエントロピーから播種し、観測者が過去の出力から次の出力を予測できないよう設計されています。このツールはそこから抽出し、選ばれた文字集合へ偏りなく写像したうえで、結果のエントロピーを表示します。その数字は主張ではなく監査可能な値です。",
            "生成もローカルです。トークンはブラウザのメモリで生まれ、送信はされないので、ここで生まれた本番用シークレットは第三者サーバーのログに現れません。ページを再読み込みすれば消えます——同じセッション中にシークレットストアへコピーしてください。長期の認証情報が住むのはストアであり、生成器は出生地であって保管庫ではありません。",
          ],
        },
      ],
    },
    es: {
      name: "Generador de Tokens",
      tagline: "Genera tokens de API, IDs de sesión y secretos criptográficamente aleatorios en tu navegador — con crypto.getRandomValues, salida por lotes y entropía mostrada por token.",
      intro: [
        "Claves de API, bearer tokens, secretos de webhook, identificadores de sesión, nonces de exportación — la mayoría son solo cadenas aleatorias, y la forma incorrecta de crearlas es Math.random(). Este generador usa crypto.getRandomValues, la fuente criptográfica del navegador, así que cada token sale de su conjunto de caracteres sin sesgo predecible.",
        "Elige longitud de 8 a 128 caracteres, conjunto de caracteres (alfanumérico, hexadecimal, o alfanumérico más símbolos seguros para URL), un prefijo opcional para poder grep-ear en logs, y genera hasta 50 de una vez — útil al sembrar datos de prueba o aprovisionar varios servicios. La entropía estimada en bits se muestra en vivo para la configuración actual: un token de 32 caracteres alfanuméricos lleva ~190 bits.",
        "Los tokens se generan en memoria y nunca se transmiten: al recargar la página desaparecen. Eso lo hace seguro para secretos de producción, no solo datos de prueba — aunque lo que vive mucho tiempo belongs en un gestor de contraseñas o un almacén de secretos.",
      ],
      steps: [
        "Configura longitud, conjunto de caracteres, prefijo opcional y cuántos tokens necesitas.",
        "Pulsa Generar — los tokens aparecen en lista, cada uno con botón de copia en un clic.",
        "Pulsa Actualizar para un lote nuevo; copia los que necesites antes de salir de la página.",
      ],
      faqs: [
        {
          q: "¿Es seguro para claves de API de producción?",
          a: "Sí. crypto.getRandomValues es el mismo CSPRNG en el que confían TLS y los gestores de contraseñas, y la generación ocurre por completo en la memoria del navegador — nada viaja por la red ni se guarda. La seguridad teórica del token equivale a la entropía mostrada: elige una longitud acorde a tu modelo de amenazas.",
        },
        {
          q: "¿Cuánto debe medir mi token?",
          a: "Para claves internas e IDs de sesión, 32 caracteres alfanuméricos (~190 bits) sobra con creces frente a la fuerza bruta. Los tokens hexadecimales gustan porque mapean a bytes exactos: 32 caracteres hex = 16 bytes aleatorios. Los símbolos añaden entropía por carácter pero rompen sistemas que no codifican URL en las cabeceras — úsalos solo si el consumidor los maneja.",
        },
        {
          q: "¿Token, UUID o ULID?",
          a: "Usa tokens aleatorios opacos (esta herramienta) cuando el identificador debe ser imposible de adivinar: claves de API, sesiones, secretos de webhook. UUID/ULID son para identificadores generados en paralelo u ordenables por tiempo — filtran información de ritmo o de conteo y no deben cargar peso de seguridad. Si necesitas un ID ordenable en vez de un secreto, usa el generador ULID.",
        },
      ],
      deepDive: [
        {
          heading: "Longitud del token y la aritmética de la fuerza bruta",
          paragraphs: [
            "La seguridad de un token es su entropía, y la entropía es aritmética simple: log2 del tamaño del conjunto de caracteres, por la longitud. El conjunto alfanumérico de 62 caracteres da unos 5,95 bits por carácter, así que 32 caracteres son ~190 bits — un espacio de búsqueda que ningún hardware concebible puede recorrer. Incluso 16 caracteres alfanuméricos (~95 bits) quedan con holgura fuera del alcance de la adivinación online y de la mayoría de los escenarios offline.",
            "Lo que compra realmente la longitud es margen contra dos realidades: que el token se filtre parcialmente (un log, una cabecera de referer, una captura) y que los algoritmos mejoren. Un token de 128 bits al que se le filtran 30 sigue con 98 — bien; uno de 40 bits al que se le filtran 10 está casi agotado. De ahí la recomendación honesta de “más de lo que crees necesitar”: la entropía es barata, la rotación tras una exposición es cara.",
            "Un aviso que el indicador no puede ver: la entropía mide el proceso de generación, no el manejo. Un token perfecto de 190 bits pegado en un ticket, comprometido a un repositorio o registrado por un proxy tiene fuerza efectiva cero hasta que se rote. La longitud protege de adivinar; la higiene, de todo lo demás.",
          ],
        },
        {
          heading: "Tokens opacos frente a UUIDs: trabajos distintos",
          paragraphs: [
            "Es tentador tratar cualquier cadena de aspecto aleatorio como un secreto, pero los identificadores se dividen en dos familias con requisitos opuestos. Los UUID y ULID están diseñados para generarse en cualquier lugar, en paralelo, y (el ULID) ordenarse por tiempo — lo que significa que codifican información a propósito: bits de versión, marcas de tiempo, a veces un contador. La adivinabilidad no les importa.",
            "Un token aleatorio opaco es lo contrario: no codifica nada y existe solo para ser imposible de adivinar. Esa es la primitiva correcta para claves de API, bearer tokens, identificadores de sesión y secretos de webhook. Usar un UUID v1 como ID de sesión, por ejemplo, filtra la dirección MAC de la máquina y la hora de generación — una clase de vulnerabilidad real e histórica, no teórica.",
            "El hexadecimal merece una nota: mapea exactamente a bytes (32 caracteres hex = 16 bytes aleatorios), por eso tantos protocolos muestran secretos así, pero solo lleva 4 bits por carácter — la mitad de la densidad del alfanumérico. Los símbolos suben la densidad pero rompen consumidores que no codifican URL en cabeceras; elige el conjunto que tu consumidor acepta de verdad.",
          ],
        },
        {
          heading: "Por qué Math.random falla con secretos, y la generación local",
          paragraphs: [
            "Math.random() es un generador pseudoaleatorio cuyo estado interno es finito y reconstruible: un atacante que observe suficientes salidas — o que sepa más o menos cuándo se generó el token — puede reproducirlo. Tokens construidos con él han parecido aleatorios y sido predichos en incidentes reales; el atajo sobrevive en tutoriales y respuestas de Stack Overflow, y por eso el problema se repite.",
            "crypto.getRandomValues es la fuente criptográficamente segura del navegador, sembrada por el sistema operativo desde entropía de hardware y diseñada para que ningún observador prediga la siguiente salida a partir de las anteriores. Esta herramienta extrae de ella, mapea los bytes a tu conjunto elegido sin sesgo y muestra la entropía resultante, para que el número sea auditable y no una afirmación.",
            "La generación además es local: los tokens nacen en la memoria de tu navegador y nunca se transmiten, así que un secreto de producción nacido aquí no aparece en el log de ningún servidor de terceros. Recarga la página y desaparecen — cópialos a tu almacén de secretos en la misma sesión. Para credenciales de larga vida, ese almacén es la casa permanente; el generador es la cuna, no el archivo.",
          ],
        },
      ],
    },
    pt: {
      name: "Gerador de Tokens",
      tagline: "Gere tokens de API, IDs de sessão e segredos criptograficamente aleatórios no navegador — crypto.getRandomValues, saída em lote e entropia exibida por token.",
      intro: [
        "Chaves de API, bearer tokens, segredos de webhook, identificadores de sessão, nonces de exportação — a maioria é apenas uma sequência aleatória, e o jeito errado de criá-las é Math.random(). Este gerador usa crypto.getRandomValues, a fonte criptográfica do navegador, então cada token é extraído do conjunto de caracteres sem viés previsível.",
        "Escolha o comprimento de 8 a 128 caracteres, o conjunto (alfanumérico, hexadecimal, ou alfanumérico com símbolos seguros para URL), um prefixo opcional para facilitar o grep em logs, e gere até 50 de uma vez — útil ao semear dados de teste ou provisionar vários serviços. A entropia estimada em bits aparece em tempo real para a configuração atual: um token de 32 caracteres alfanuméricos carrega ~190 bits.",
        "Os tokens são gerados na memória e nunca transmitidos: recarregar a página e eles somem. Isso torna a ferramenta segura para segredos de produção, não apenas dados de teste — embora o destino final de segredos duradouros seja um gerenciador de senhas ou cofre de segredos.",
      ],
      steps: [
        "Defina comprimento, conjunto de caracteres, prefixo opcional e quantos tokens precisa.",
        "Clique em Gerar — os tokens aparecem em lista, cada um com botão de copiar em um clique.",
        "Clique em Atualizar para um novo lote; copie os que precisar antes de sair da página.",
      ],
      faqs: [
        {
          q: "É seguro para chaves de API de produção?",
          a: "Sim. crypto.getRandomValues é o mesmo CSPRNG usado por TLS e gerenciadores de senhas, e a geração acontece inteiramente na memória do navegador — nada trafega pela rede nem é persistido. A segurança teórica do token equivale à entropia exibida: escolha um comprimento compatível com seu modelo de ameaças.",
        },
        {
          q: "Qual deve ser o tamanho do token?",
          a: "Para chaves internas e IDs de sessão, 32 caracteres alfanuméricos (~190 bits) estão muito além do alcance de força bruta. Tokens hexadecimais são populares por mapearem bytes exatos: 32 caracteres hex = 16 bytes aleatórios. Símbolos aumentam a entropia por caractere mas quebram sistemas que não fazem URL-encode de cabeçalhos — use apenas se o consumidor os tratar.",
        },
        {
          q: "Token, UUID ou ULID?",
          a: "Use tokens aleatórios opacos (esta ferramenta) quando o identificador precisa ser inadivinhável: chaves de API, sessões, segredos de webhook. UUID/ULID são para identificadores gerados em paralelo ou ordenáveis por tempo — vazam informação de tempo ou contagem e não devem carregar peso de segurança. Se precisa de um ID ordenável em vez de segredo, use o gerador ULID.",
        },
      ],
      deepDive: [
        {
          heading: "Comprimento do token e a aritmética da força bruta",
          paragraphs: [
            "A segurança de um token é sua entropia, e a entropia é aritmética simples: log2 do tamanho do conjunto de caracteres, vezes o comprimento. O conjunto alfanumérico de 62 caracteres dá cerca de 5,95 bits por caractere, então 32 caracteres são ~190 bits — um espaço de busca que nenhum hardware concebível percorre. Até 16 caracteres alfanuméricos (~95 bits) ficam folgados fora do alcance de adivinhação online e da maioria dos cenários offline.",
            "O que o comprimento realmente compra é margem contra duas realidades: o token vazar parcialmente (um log, um cabeçalho de referer, uma captura de tela) e os algoritmos melhorarem. Um token de 128 bits com 30 bits vazados ainda carrega 98 — ok; um de 40 bits com 10 vazados está quase esgotado. Daí a recomendação honesta de “mais do que você acha que precisa”: entropia é barata, rotação depois da exposição é cara.",
            "Um aviso que o indicador não enxerga: a entropia mede o processo de geração, não o manuseio. Um token perfeito de 190 bits colado num ticket, commitado num repositório ou logado por um proxy tem força efetiva zero até ser rotacionado. Comprimento protege contra adivinhar; higiene protege contra todo o resto.",
          ],
        },
        {
          heading: "Tokens opacos versus UUIDs: trabalhos diferentes",
          paragraphs: [
            "É tentador tratar qualquer string com cara de aleatória como segredo, mas identificadores se dividem em duas famílias com requisitos opostos. UUIDs e ULIDs são desenhados para serem gerados em qualquer lugar, em paralelo, e (o ULID) ordenados por tempo — o que significa que eles codificam informação de propósito: bits de versão, timestamps, às vezes um contador. Adivinhabilidade não é a preocupação deles.",
            "Um token aleatório opaco é o oposto: não codifica nada e existe só para ser inadivinhável. Essa é a primitiva certa para chaves de API, bearer tokens, identificadores de sessão e segredos de webhook. Usar um UUID v1 como ID de sessão, por exemplo, vaza o endereço MAC da máquina e o horário de geração — uma classe de vulnerabilidade real e histórica, não teórica.",
            "O hexadecimal merece uma nota: mapeia exatamente para bytes (32 caracteres hex = 16 bytes aleatórios), por isso tantos protocolos exibem segredos assim, mas carrega só 4 bits por caractere — metade da densidade do alfanumérico. Símbolos elevam a densidade mas quebram consumidores que não fazem URL-encode de cabeçalhos; escolha o conjunto que seu consumidor realmente aceita.",
          ],
        },
        {
          heading: "Por que Math.random falha com segredos, e a geração local",
          paragraphs: [
            "Math.random() é um gerador pseudoaleatório cujo estado interno é finito e reconstrutível: um atacante que observe saídas suficientes — ou saiba mais ou menos quando o token foi gerado — consegue reproduzi-lo. Tokens construídos com ele pareceram aleatórios e foram previstos em incidentes reais; o atalho sobrevive em tutoriais e respostas de Stack Overflow, e é por isso que o problema se repete.",
            "O crypto.getRandomValues é a fonte criptograficamente segura do navegador, semeada pelo sistema operacional a partir de entropia de hardware e desenhada para que nenhum observador preveja a próxima saída a partir das anteriores. Esta ferramenta extrai dela, mapeia os bytes para o conjunto escolhido sem viés e mostra a entropia resultante, para que o número seja auditável e não uma afirmação.",
            "A geração também é local: os tokens nascem na memória do navegador e nunca são transmitidos, então um segredo de produção nascido aqui não aparece no log de nenhum servidor de terceiros. Recarregue a página e eles somem — copie-os para seu cofre de segredos na mesma sessão. Para credenciais de longa vida, esse cofre é a casa permanente; o gerador é o berço, não o arquivo.",
          ],
        },
      ],
    },
  },
});
