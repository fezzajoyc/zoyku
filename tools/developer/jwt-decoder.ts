import { DevEncoderEngine } from "../_engines/dev-engine-encoder";
import { defineTool } from "../_lib/types";

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkYSBMb3ZlbGFjZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxODkzNDU2MDAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default defineTool({
  slug: "jwt-decoder",
  category: "developer",
  icon: "key",
  engine: { component: DevEncoderEngine, props: { codec: "jwt-decode", sample: SAMPLE } },
  related: ["base64-decoder", "hash-generator", "sha256-generator", "json-formatter", "md5-generator", "base64-image", "json-validator", "url-encoder", "html-minifier", "url-decoder"],
  copy: {
    en: {
      name: "JWT Decoder",
      tagline:
        "Decode JWT tokens online: inspect the header and payload claims with human-readable exp and iat timestamps. Decoding only — nothing is verified or uploaded.",
      intro: [
        "Debugging an auth flow, checking which claims a token really carries, or explaining to a teammate why the API returned 401 — paste the JWT here and its contents are on screen in a second, with nothing leaving the browser.",
        "The three dot-separated parts are split and pretty-printed separately: the header (alg, typ), the payload (iss, exp, sub and your custom claims) and the signature shown as-is. Malformed Base64URL is reported instead of silently producing garbage.",
        "Decoding follows RFC 7519: each segment is Base64URL — the JWT variant of Base64 that swaps +/ for -_ and drops padding — then parsed as JSON. Everything happens locally; the token is never transmitted and never verified.",
        "That last point is the crux: decoding shows what a token says, not what it is allowed to do. Signature verification (HS256 shared secret or RS256 public key) always happens on the server, so treat every claim you read here as untrusted until that check passes."
      ],
      steps: [
        "Paste the JWT (the three dot-separated parts) into the input box.",
        "Read the pretty-printed header and payload, with exp/iat shown as real dates.",
        "Fix your token or its server-side verification accordingly — copy the payload if needed.",
      ],
      faqs: [
        {
          q: "Does decoding a JWT verify it?",
          a: "No. Decoding is just Base64URL + JSON parsing and anyone can do it — including an attacker. A valid-looking decoded token proves nothing. Verification requires checking the signature with the secret (HMAC) or public key (RSA/EC), which needs the token issuer's key material.",
        },
        {
          q: "Can you recover or change a token's claims?",
          a: "You can read the claims, but you cannot forge a new token with modified claims without invalidating the signature — any change to header or payload breaks the signature check on the server.",
        },
        {
          q: "Is it safe to paste a real token here?",
          a: "The token is decoded entirely in your browser and never leaves your device — there is no upload. Still, treat tokens as credentials and avoid pasting production tokens anywhere you do not need to.",
        },
      ],
      deepDive: [
        {
          heading: "Decoding is not verification — the security fact that matters most",
          paragraphs: [
            "A JWT's first two segments are plain Base64URL-encoded JSON with no encryption whatsoever. Anyone who receives a token can read every claim in it, and any token can be constructed by hand in seconds. That is by design: JWTs are signed, not sealed. The signature at the end proves the token was issued by whoever holds the key and was not modified since — it does nothing to hide the contents.",
            "The consequence every developer must internalize: seeing a well-formed header, a plausible payload and a signature string proves nothing about the token's legitimacy. An attacker can change the payload — flip a role from user to admin — re-encode it and attach any signature bytes; it decodes beautifully and authenticates nowhere. Only the server, holding the HMAC secret or the public key, can tell the difference. This tool deliberately never verifies: it shows you what a token says, and what it says has no authority until your server checked the signature.",
            "Decode is also an auditing lens on what you are actually shipping. Paste a token from your own login flow and check the claims you may not have realized are exposed: internal user IDs, e-mail addresses, tenant names, permission lists. Everything in the payload is readable by the client — including anyone with browser dev tools open — so the rule is: never put a secret in a JWT payload. If it must be secret, it does not belong in the token; use an opaque session ID backed by server-side storage instead.",
          ],
        },
        {
          heading: "Reading the standard claims: exp, iat and the clock traps",
          paragraphs: [
            "The registered claims (RFC 7519) have agreed meanings: iss (issuer), sub (subject), aud (audience), exp (expiration), nbf (not before), iat (issued at). All times are seconds since the Unix epoch, not ISO strings — exp=1893456000 is a date, and this tool renders it in your timezone so nobody has to do epoch math to know whether a token expired.",
            "The classic failure is clock skew between the token issuer and the verifier: a server whose clock is a minute behind rejects tokens that are still valid from the issuer's perspective, and the fix is a small leeway window (libraries typically expose a 30-60 second tolerance). Another trap is exp being an absolute time, not a TTL — a token issued with a 30-day expiry cannot be shortened without reissuing, which is why short-lived access tokens paired with refresh tokens became the standard pattern.",
            "Check aud and iss too, not just exp. A token that is unexpired but issued for a different audience is exactly as invalid as an expired one — servers that only check exp accept tokens minted for another service. When debugging a 401, decode the token here first: more often than not the answer is visible in the payload before you touch any server logs.",
          ],
        },
        {
          heading: "Why the token never leaves your browser",
          paragraphs: [
            "A JWT is a bearer credential: whoever holds it can act as you until it expires. Pasting a live token into a server-side decoder would hand exactly that power to the server's operator — the single worst outcome of a debugging tool. This tool parses the Base64URL segments with browser JavaScript only; the token is never transmitted, logged or stored, and once the page is loaded the whole thing works offline.",
            "Even so, treat the paste box as you would any place a credential goes. Prefer pasting expired or test-environment tokens; if you must inspect a production token, do it once and let it expire rather than regenerating a long-lived one for the occasion.",
            "The same local, no-verification philosophy continues across the site: the base64 tools decode the raw segments if you want to go lower level, and the hash tools let you fingerprint a token to compare whether two issued tokens differ without ever exposing their contents.",
          ],
        },
      ],
    },
    zh: {
      name: "JWT 解码",
      tagline: "在线解码 JWT:分开查看 header 与 payload,exp/iat 显示为易读时间并标注是否过期。仅解码——不验证、不上传。",
      intro: [
        "粘贴 JSON Web Token,立即分开看到三个部分:header(算法和类型)、payload(实际声明)和签名。两段 JSON 都做了美化排版,iat、nbf、exp 等时间戳会换算成本地语言的直观日期,exp 还会标注已过期或仍然有效。",
        "全部通过 Base64URL 在本地解码——令牌不会被发送到任何地方,也不会被验证。请记住:解码只展示令牌说了什么,不决定它被允许做什么。签名验证永远需要在可信系统上用密钥或公钥完成。",
      ],
      steps: [
        "把 JWT(三段以点分隔)粘贴到输入框。",
        "阅读美化后的 header 和 payload,exp/iat 直接显示为真实日期。",
        "据此修正令牌或服务端验证逻辑;需要时可复制 payload。",
      ],
      faqs: [
        {
          q: "解码 JWT 等于验证 JWT 吗?",
          a: "不等于。解码只是 Base64URL 加 JSON 解析,任何人都能做——攻击者也不例外。看起来合法的解码结果不能证明任何事。验证必须用密钥(HMAC)或公钥(RSA/EC)核对签名,而密钥只在签发方手里。",
        },
        {
          q: "能恢复或修改令牌里的声明吗?",
          a: "声明可以读,但无法在不破坏签名的情况下伪造修改后的新令牌——header 或 payload 的任何改动都会让服务端签名校验失败。",
        },
        {
          q: "在这里粘贴真实令牌安全吗?",
          a: "令牌完全在你的浏览器里解码,不会离开设备——没有任何上传。不过令牌本质是凭据,非必要不要把生产环境令牌贴到任何地方。",
        },
      ],
      deepDive: [
        {
          heading: "解码不等于验证——最重要的一条安全事实",
          paragraphs: [
            "JWT 的前两段就是普通的 Base64URL 编码 JSON,没有任何加密。任何人拿到令牌都能读出其中全部声明,任何令牌也都能徒手拼出来。这是有意为之:JWT 是签名而不是封存。末尾的签名只证明令牌出自持钥者之手、此后未被修改——它完全不负责隐藏内容。",
            "每个开发者都必须刻进脑子里的推论是:看到一个格式良好的 header、貌似合理的 payload 和一串签名,不能证明令牌合法。攻击者可以改 payload——把 role 从 user 改成 admin——重新编码,再随便附上一段签名字节;它解码得漂漂亮亮,却通不过任何验证。只有握有 HMAC 密钥或公钥的服务器能分辨。本工具刻意不做验证:它展示令牌说了什么,而在你的服务器核对签名之前,这些话没有任何效力。",
            "解码同时也是一面审计透镜,照出你实际发出去的东西。把你登录流程里的令牌贴进来,检查那些你可能没意识到已暴露的声明:内部用户 ID、邮箱、租户名、权限列表。payload 里的一切客户端都能读——包括任何一个开着浏览器开发者工具的人——所以规则是:永远不要把秘密放进 JWT 的 payload。如果必须保密,它就不该在令牌里;改用由服务端存储支撑的不透明会话 ID。",
          ],
        },
        {
          heading: "读懂标准声明:exp、iat 与时钟的坑",
          paragraphs: [
            "注册声明(RFC 7519)有约定俗成的含义:iss(签发者)、sub(主体)、aud(受众)、exp(过期时间)、nbf(生效时间)、iat(签发时间)。所有时间都是 Unix 纪元秒,不是 ISO 字符串——exp=1893456000 是一个日期,本工具会按你的时区渲染出来,谁都不必做纪元换算才知道令牌过没过期。",
            "经典故障是签发方和校验方之间的时钟偏差:一台时钟慢一分钟的服务器,会拒绝从签发方视角仍然有效的令牌,解法是留一个小的宽限窗口(各库通常提供 30 到 60 秒的容差)。另一个坑是 exp 是绝对时间而非存活期——一个 30 天过期的令牌不能缩短,只能重新签发,这正是短效 access token 搭配 refresh token 成为标准模式的原因。",
            "aud 和 iss 也要查,别只看 exp。一个没过期但受众不同的令牌,和过期令牌一样无效——只查 exp 的服务器会接受为别的服务铸造的令牌。调试 401 时先在这里解码令牌:多数情况下,答案在你碰任何服务器日志之前就写在 payload 里。",
          ],
        },
        {
          heading: "为什么令牌永远不离开浏览器",
          paragraphs: [
            "JWT 是持有者凭据:谁拿着它,谁就能以你的身份行事,直到它过期。把有效令牌贴给一个服务端解码器,等于把这份权力拱手交给服务器运营者——这是调试工具最坏的结局。本工具只用浏览器 JavaScript 解析 Base64URL 各段;令牌不被传输、不被记录、不被存储,页面加载后全部功能离线可用。",
            "即便如此,对待这个粘贴框要像对待任何存放凭据的地方。优先贴过期的或测试环境的令牌;如果必须检查生产令牌,查一次就让它过期,别为这次检查专门再签发一个长效的。",
            "同样的本地、不验证哲学贯穿全站:想更底层可以直接用 base64 工具解码原始各段;哈希工具可以给令牌算指纹,比较两个签发的令牌是否相同,而无需暴露内容。",
          ],
        },
      ],
    },
    ja: {
      name: "JWT デコーダー",
      tagline:
        "JWT をオンラインでデコード:header と payload のクレームを確認し、exp・iat を人が読める時刻で表示。検証はせず、アップロードもありません。",
      intro: [
        "JSON Web Token を貼り付けると、3 つの部分が即座に分かれます:header(アルゴリズムとタイプ)、payload(実際のクレーム)、署名。両方の JSON は整形表示され、iat・nbf・exp といったタイムスタンプはロケールに応じた日時に変換され、exp は期限切れか有効かも示します。",
        "デコードはすべて Base64URL でローカルに行われます。トークンはどこにも送信されず、検証もされません。重要:デコードはトークンが何を「主張」しているかを示すだけで、何が「許可」されているかは示しません。署名検証には必ず秘密鍵または公開鍵と信頼できるシステムが必要です。",
      ],
      steps: [
        "JWT(ドット区切りの 3 部分)を入力欄に貼り付けます。",
        "整形された header と payload を読み、exp/iat を実際の日時で確認します。",
        "トークンやサーバー側の検証を修正します。必要なら payload をコピーします。",
      ],
      faqs: [
        {
          q: "JWT のデコードは検証になりますか?",
          a: "なりません。デコードは Base64URL と JSON パースだけです。攻撃者にもできます。デコードできても何も証明されません。検証には HMAC の秘密鍵や RSA/EC の公開鍵で署名を確認する必要があり、鍵は発行者だけが持っています。",
        },
        {
          q: "クレームを復元・改ざんできますか?",
          a: "クレームは読めますが、署名を無効化せずに改ざんした新しいトークンを作ることはできません。header や payload の変更はすべてサーバー側の署名検証を失敗させます。",
        },
        {
          q: "本物のトークンを貼っても安全ですか?",
          a: "トークンは完全にブラウザ内でデコードされ、端末の外には出ません。アップロードはありません。それでもトークンは認証情報です。必要のない場所に本番トークンを貼るのは避けてください。",
        },
      ],
      deepDive: [
        {
          heading: "デコードは検証ではない——最重要のセキュリティ事実",
          paragraphs: [
            "JWT の最初の 2 セグメントは、暗号化をまったく伴わない普通の Base64URL エンコード JSON です。トークンを受け取った人は誰でも中のクレームをすべて読めますし、トークンは手で組み立てることもできます。これは意図的な設計です。JWT は封印ではなく署名です。末尾の署名は、トークンが鍵の持ち主によって発行され、以後改変されていないことだけを証明します。内容を隠す機能はまったくありません。",
            "すべての開発者が身に刻むべき帰結はこうです。整形された header、それらしい payload、署名文字列が見えても、トークンの正当性は何も証明されません。攻撃者は payload を書き換え——role を user から admin に変え——再エンコードして適当な署名バイトを付けられます。デコードは美しく通り、認証はどこでも通りません。HMAC の秘密鍵か公開鍵を持つサーバーだけが違いを見抜けます。本ツールは意図的に検証しません。トークンが何を言っているかを示すだけで、サーバーが署名を確認するまで、その言葉には何の効力もありません。",
            "デコードは実際に出荷しているものを照らす監査のレンズにもなります。自分のログインフローのトークンを貼って、露出に気づいていなかったクレームを確認してください。内部ユーザー ID、メールアドレス、テナント名、権限リスト。payload の中身はクライアント——開発者ツールを開いている誰かにでも——読めます。だからルールはこうです。秘密を JWT の payload に入れてはならない。秘密であるべきものはトークンに属さず、サーバー側ストレージに支えられた不透明なセッション ID を使います。",
          ],
        },
        {
          heading: "標準クレームの読み方:exp、iat、時計の罠",
          paragraphs: [
            "登録クレーム(RFC 7519)には合意された意味があります。iss(発行者)、sub(主体)、aud(オーディエンス)、exp(失効時刻)、nbf(有効開始)、iat(発行時刻)。時刻はすべて Unix エポック秒であり ISO 文字列ではありません。exp=1893456000 は一つの日付であり、本ツールはあなたのタイムゾーンで表示するので、トークンが切れたかどうかを知るためにエポック計算をする人はいません。",
            "古典的な障害は発行者と検証者の時計のずれです。時計が 1 分遅れたサーバーは、発行者の視点ではまだ有効なトークンを拒否します。解決策は小さな許容幅で、多くのライブラリが 30〜60 秒のトレランスを用意しています。もう一つの罠は、exp が TTL ではなく絶対時刻であることです。30 日後失効のトークンは短縮できず再発行が必要で、だからこそ短命のアクセストークンとリフレッシュトークンの組み合わせが標準パターンになったのです。",
            "exp だけでなく aud と iss も確認してください。失効していないが別のオーディエンス向けに発行されたトークンは、失効したトークンと同じくらい無効です。exp だけを見るサーバーは、別のサービスのために作られたトークンを受け入れます。401 のデバッグでは、まずここでトークンをデコードしてください。多くの場合、サーバーログに触れる前に答えが payload に見えています。",
          ],
        },
        {
          heading: "なぜトークンがブラウザから出ないのか",
          paragraphs: [
            "JWT はベアラー資格情報です。持っている者が、期限が切れるまであなたとして振る舞えます。有効なトークンをサーバー型デコーダーに貼ることは、まさにその力をサーバー運営者に手渡すことです——デバッグツールとして最悪の帰結です。本ツールはブラウザの JavaScript だけで Base64URL セグメントを解析します。トークンは送信も記録も保存もされず、ページを読み込めば全体がオフラインで動きます。",
            "それでも、この貼り付け欄は資格情報を扱う場として扱ってください。期限切れのトークンやテスト環境のトークンを優先し、本番トークンを確認する必要があるなら一度だけにして、長命なトークンを作り直すのは避けましょう。",
            "同じローカル・非検証の哲学はサイト全体に続きます。base64 ツールでより低い層からセグメントを調べることも、ハッシュツールでトークンのフィンガープリントを取り、内容を晒さずに二つのトークンが異なるか比較することもできます。",
          ],
        },
      ],
    },
    es: {
      name: "Decodificador JWT",
      tagline:
        "Decodifica tokens JWT en línea: examina el header y los claims del payload con marcas iat y exp legibles. Solo decodifica — nada se verifica ni se sube.",
      intro: [
        "Pega un JSON Web Token y ve al instante sus tres partes por separado: el header (algoritmo y tipo), el payload (los claims reales) y la firma. Ambas secciones JSON se muestran formateadas, y las marcas de tiempo iat, nbf y exp se traducen a fechas legibles en tu idioma, con exp marcada como caducada o activa.",
        "Todo se decodifica localmente con Base64URL — el token nunca se envía a ningún sitio ni se verifica. Recuerda: decodificar muestra lo que un token dice, no lo que puede hacer. Verificar la firma siempre requiere la clave secreta o pública en un sistema de confianza.",
      ],
      steps: [
        "Pega el JWT (las tres partes separadas por puntos) en el cuadro de entrada.",
        "Lee el header y el payload formateados, con exp/iat como fechas reales.",
        "Corrige tu token o su verificación en el servidor — copia el payload si lo necesitas.",
      ],
      faqs: [
        {
          q: "¿Decodificar un JWT lo verifica?",
          a: "No. Decodificar es solo Base64URL + parseo JSON, y cualquiera puede hacerlo — también un atacante. Un token decodificado con buena pinta no prueba nada. La verificación exige comprobar la firma con el secreto (HMAC) o la clave pública (RSA/EC), que solo tiene quien emitió el token.",
        },
        {
          q: "¿Se pueden recuperar o cambiar los claims?",
          a: "Los claims se pueden leer, pero no se puede forjar un token nuevo con claims modificados sin invalidar la firma — cualquier cambio en header o payload rompe la verificación en el servidor.",
        },
        {
          q: "¿Es seguro pegar un token real aquí?",
          a: "El token se decodifica íntegramente en tu navegador y nunca sale de tu dispositivo — no hay subida. Aun así, los tokens son credenciales: evita pegar tokens de producción donde no haga falta.",
        },
      ],
      deepDive: [
        {
          heading: "Decodificar no es verificar — el hecho de seguridad que más importa",
          paragraphs: [
            "Los primeros dos segmentos de un JWT son JSON plano codificado en Base64URL sin cifrado alguno. Cualquiera que reciba un token puede leer todos sus claims, y cualquier token puede construirse a mano en segundos. Es por diseño: los JWT van firmados, no sellados. La firma del final prueba que el token fue emitido por quien posee la clave y no fue modificado desde entonces — no hace nada por ocultar el contenido.",
            "La consecuencia que todo desarrollador debe interiorizar: ver un header bien formado, un payload plausible y una cadena de firma no prueba nada sobre la legitimidad del token. Un atacante puede cambiar el payload — voltear un role de user a admin — recodificarlo y adjuntar cualquier bytes de firma; decodifica preciosamente y no autentica en ningún sitio. Solo el servidor, que posee el secreto HMAC o la clave pública, distingue la diferencia. Esta herramienta deliberadamente nunca verifica: te muestra lo que un token dice, y lo que dice no tiene autoridad alguna hasta que tu servidor comprobó la firma.",
            "Decodificar es también una lente de auditoría sobre lo que realmente envías. Pega un token de tu propio flujo de login y revisa los claims que quizá no sabías que expones: IDs internos, correos, nombres de tenant, listas de permisos. Todo el payload es legible por el cliente — incluyendo cualquiera con las herramientas de desarrollo abiertas — así que la regla es: nunca pongas un secreto en el payload de un JWT. Si debe ser secreto, no pertenece al token; usa un ID de sesión opaco respaldado por almacenamiento en el servidor.",
          ],
        },
        {
          heading: "Leer los claims estándar: exp, iat y las trampas del reloj",
          paragraphs: [
            "Los claims registrados (RFC 7519) tienen significados acordados: iss (emisor), sub (sujeto), aud (audiencia), exp (caducidad), nbf (no antes de), iat (emitido en). Todos los tiempos son segundos desde la época Unix, no cadenas ISO — exp=1893456000 es una fecha, y esta herramienta la muestra en tu zona horaria para que nadie tenga que hacer aritmética de época para saber si un token caducó.",
            "El fallo clásico es el desfase de reloj entre emisor y verificador: un servidor cuyo reloj va un minuto atrás rechaza tokens que siguen siendo válidos desde la perspectiva del emisor, y la solución es una pequeña ventana de tolerancia (las librerías suelen exponer 30-60 segundos). Otra trampa: exp es tiempo absoluto, no un TTL — un token emitido con 30 días de caducidad no se puede acortar sin reemitir, por eso el patrón estándar son tokens de acceso de vida corta emparejados con tokens de refresco.",
            "Revisa aud e iss también, no solo exp. Un token no caducado pero emitido para otra audiencia es exactamente tan inválido como uno caducado — los servidores que solo miran exp aceptan tokens acuñados para otro servicio. Al depurar un 401, decodifica el token aquí primero: casi siempre la respuesta es visible en el payload antes de tocar cualquier log del servidor.",
          ],
        },
        {
          heading: "Por qué el token nunca sale de tu navegador",
          paragraphs: [
            "Un JWT es una credencial de portador: quien lo posea puede actuar como tú hasta que caduque. Pegar un token vivo en un decodificador del lado del servidor entrega exactamente ese poder al operador del servidor — el peor desenlace posible para una herramienta de depuración. Esta herramienta parsea los segmentos Base64URL solo con JavaScript del navegador; el token nunca se transmite, registra ni almacena, y una vez cargada la página todo funciona sin conexión.",
            "Aun así, trata el cuadro de pegado como tratarías cualquier lugar donde va una credencial. Prefiere tokens caducados o de entorno de pruebas; si debes inspeccionar un token de producción, hazlo una vez y deja que caduque en vez de emitir uno de larga vida para la ocasión.",
            "La misma filosofía local y sin verificación continúa por todo el sitio: las herramientas base64 decodifican los segmentos crudos si quieres bajar un nivel, y las de hash permiten tomar la huella de un token para comparar si dos tokens emitidos difieren sin exponer su contenido.",
          ],
        },
      ],
    },
    pt: {
      name: "Decodificador JWT",
      tagline:
        "Decodifique tokens JWT on-line: examine o header e os claims do payload com iat e exp em datas legíveis. Só decodifica — nada é verificado ou enviado.",
      intro: [
        "Cole um JSON Web Token e veja instantaneamente as três partes separadas: o header (algoritmo e tipo), o payload (os claims de verdade) e a assinatura. As duas seções JSON aparecem formatadas, e os timestamps iat, nbf e exp viram datas legíveis no seu idioma, com exp marcado como expirado ou ativo.",
        "Tudo é decodificado localmente com Base64URL — o token nunca é enviado a lugar nenhum nem verificado. Lembre-se: decodificar mostra o que um token diz, não o que ele pode fazer. Verificar a assinatura sempre exige a chave secreta ou pública num sistema confiável.",
      ],
      steps: [
        "Cole o JWT (as três partes separadas por pontos) na caixa de entrada.",
        "Leia o header e o payload formatados, com exp/iat como datas reais.",
        "Ajuste seu token ou a verificação no servidor — copie o payload se precisar.",
      ],
      faqs: [
        {
          q: "Decodificar um JWT o verifica?",
          a: "Não. Decodificar é apenas Base64URL + parse de JSON, e qualquer pessoa consegue — inclusive um atacante. Um token decodificado com aparência válida não prova nada. A verificação exige conferir a assinatura com o segredo (HMAC) ou a chave pública (RSA/EC), que só o emissor tem.",
        },
        {
          q: "Dá para recuperar ou alterar os claims?",
          a: "Os claims podem ser lidos, mas não se pode forjar um token novo com claims modificados sem invalidar a assinatura — qualquer mudança no header ou payload quebra a verificação no servidor.",
        },
        {
          q: "É seguro colar um token real aqui?",
          a: "O token é decodificado inteiramente no seu navegador e nunca sai do seu dispositivo — não há upload. Ainda assim, tokens são credenciais: evite colar tokens de produção onde não for necessário.",
        },
      ],
      deepDive: [
        {
          heading: "Decodificar não é verificar — o fato de segurança que mais importa",
          paragraphs: [
            "Os dois primeiros segmentos de um JWT são JSON plano codificado em Base64URL sem nenhum ciframento. Qualquer pessoa que receba um token pode ler todos os claims, e qualquer token pode ser construído à mão em segundos. É por design: JWTs são assinados, não lacrados. A assinatura no final prova que o token foi emitido por quem possui a chave e não foi modificado desde então — ela não faz nada para esconder o conteúdo.",
            "A consequência que todo desenvolvedor precisa interiorizar: ver um header bem formado, um payload plausível e uma string de assinatura não prova nada sobre a legitimidade do token. Um atacante pode mudar o payload — trocar um role de user para admin — recodificar e anexar quaisquer bytes de assinatura; decodifica lindamente e não autentica em lugar nenhum. Só o servidor, que possui o segredo HMAC ou a chave pública, enxerga a diferença. Esta ferramenta deliberadamente nunca verifica: mostra o que um token diz, e o que ele diz não tem autoridade alguma até seu servidor conferir a assinatura.",
            "Decodificar é também uma lente de auditoria sobre o que você realmente envia. Cole um token do seu próprio fluxo de login e confira os claims que talvez não soubesse que estão expostos: IDs internos, e-mails, nomes de tenant, listas de permissões. Todo o payload é legível pelo cliente — incluindo qualquer um com as ferramentas de desenvolvedor abertas — então a regra é: nunca coloque um segredo no payload de um JWT. Se precisa ser secreto, não pertence ao token; use um ID de sessão opaco respaldado por armazenamento no servidor.",
          ],
        },
        {
          heading: "Lendo os claims padrão: exp, iat e as armadilhas do relógio",
          paragraphs: [
            "Os claims registrados (RFC 7519) têm significados acordados: iss (emissor), sub (sujeito), aud (audiência), exp (expiração), nbf (não antes de), iat (emitido em). Todos os tempos são segundos desde a época Unix, não strings ISO — exp=1893456000 é uma data, e esta ferramenta a exibe no seu fuso para que ninguém precise fazer aritmética de época para saber se um token expirou.",
            "A falha clássica é o desvio de relógio entre emissor e verificador: um servidor com o relógio um minuto atrás rejeita tokens que ainda são válidos da perspectiva do emissor, e a correção é uma pequena janela de tolerância (as bibliotecas costumam expor 30-60 segundos). Outra armadilha: exp é tempo absoluto, não um TTL — um token emitido com 30 dias de validade não pode ser encurtado sem reemitir, por isso o padrão atual são tokens de acesso de vida curta emparelhados com tokens de refresh.",
            "Confira aud e iss também, não só exp. Um token não expirado mas emitido para outra audiência é exatamente tão inválido quanto um expirado — servidores que só olham exp aceitam tokens cunhados para outro serviço. Ao depurar um 401, decodifique o token aqui primeiro: quase sempre a resposta está visível no payload antes de tocar em qualquer log do servidor.",
          ],
        },
        {
          heading: "Por que o token nunca sai do seu navegador",
          paragraphs: [
            "Um JWT é uma credencial de portador: quem o possui pode agir como você até expirar. Colar um token vivo num decodificador do lado do servidor entrega exatamente esse poder ao operador do servidor — o pior desfecho possível para uma ferramenta de depuração. Esta ferramenta analisa os segmentos Base64URL só com JavaScript do navegador; o token nunca é transmitido, registrado ou armazenado, e depois que a página carrega tudo funciona offline.",
            "Mesmo assim, trate a caixa de colagem como trataria qualquer lugar onde uma credencial vai. Prefira tokens expirados ou de ambiente de teste; se precisar inspecionar um token de produção, faça uma vez e deixe expirar em vez de emitir um de vida longa para a ocasião.",
            "A mesma filosofia local e sem verificação continua pelo site: as ferramentas base64 decodificam os segmentos crus se quiser descer um nível, e as de hash permitem tirar a impressão digital de um token para comparar se dois tokens emitidos diferem sem expor seu conteúdo.",
          ],
        },
      ],
    },
  },
});
