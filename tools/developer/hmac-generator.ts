import { DevHmacEngine } from "../_engines/dev-engine-hmac";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "hmac-generator",
  category: "developer",
  icon: "key",
  engine: { component: DevHmacEngine, props: { algos: ["SHA-256", "SHA-384", "SHA-512", "SHA-1"], defaultAlgo: "SHA-256" } },
  related: ["sha256-generator", "sha512-generator", "jwt-decoder", "totp-generator"],
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
    },
  },
});
