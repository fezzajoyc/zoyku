import { DevEngineRsa } from "../_engines/dev-engine-rsa";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "rsa-key-generator",
  category: "developer",
  icon: "key",
  engine: { component: DevEngineRsa },
  related: ["jwt-decoder", "base64-encoder", "hash-generator", "hmac-generator"],
  copy: {
    en: {
      name: "RSA Key Pair Generator",
      tagline:
        "Generate RSA key pairs (2048/3072/4096-bit) in your browser with native WebCrypto — PEM and JWK export, signature-verified implementation. Free, private, offline.",
      intro: [
        "RSA is still the workhorse of JWT signing, SSH-style key exchange and document signatures. This generator creates real key pairs with your browser's native WebCrypto — RSASSA-PKCS1-v1_5 with SHA-256 and the standard public exponent 65537 — in 2048, 3072 or 4096 bits.",
        "Keys are exported in the two formats every tool accepts: PEM (SPKI for the public key, PKCS#8 for the private key) ready for openssl, JWT libraries and server configs, plus JSON Web Key (JWK) for web platforms like JOSE stacks.",
        "Everything is generated locally with crypto.subtle — the private key never leaves this tab, and there is no server-side key escrow. 4096-bit generation can take a few seconds on slower devices.",
      ],
      steps: [
        "Choose the key size: 2048 (default), 3072 or 4096 bits.",
        "Click Generate key pair — a fresh pair is created in memory.",
        "Copy the PEM public and private keys, or the combined JWK, into your application or config.",
      ],
      faqs: [
        {
          q: "Which key size should I choose?",
          a: "2048 bits is the current baseline and is accepted by virtually every JWT library and certificate authority. 3072 bits matches the ~128-bit security level of AES-128; 4096 bits adds margin at the cost of slower signing and larger signatures. New designs should also consider Ed25519, which is faster — RSA remains the choice when interop demands it.",
        },
        {
          q: "Is it safe to generate a private key in the browser?",
          a: "The key is created by your browser's built-in crypto hardware-backed API and displayed only in this tab — nothing is transmitted or stored. The risk equals the risk of your device being compromised. For production infrastructure, prefer offline or HSM-based generation; for development, staging and personal projects this browser flow is entirely adequate.",
        },
      ],
      deepDive: [
        {
          heading: "Key sizes against the 2030 window",
          paragraphs: [
            "NIST SP 800-57 puts 2048-bit RSA at a 112-bit security level — acceptable through 2030, with 3072 bits at 128 bits (AES-128 equivalent) as the medium-term minimum beyond that. 4096 bits does not double the strength; it adds roughly one bit-equivalent per extra 512 bits while making signatures slower and ciphertext larger. That is why the recommendation is 2048 for compatibility-first work, 3072 for new infrastructure, and 4096 only where a policy document demands it.",
            "RSA signing cost grows with the cube of the modulus: a 4096-bit private-key operation takes roughly eight times longer than 2048-bit, which matters for JWT verification at high request rates. Verification is cheap for all sizes (small public exponent). Ed25519 — available in modern WebCrypto behind a flag and in every serious JWT library — signs faster with tiny keys and fixed 128-bit security; choose it for new systems, keep RSA for the ecosystems that expect it.",
            "One practical subtlety this page handles for you: the public exponent is fixed at 65537 (F4), the value every major library and CA assumes. Exponent 3 keeps verification marginally faster but has a history of padding-implementation pitfalls; exotic exponents break interop for zero security gain.",
          ],
        },
        {
          heading: "PEM/JWK anatomy and custody discipline",
          paragraphs: [
            "The PEM output is ASN.1 DER wrapped in Base64 at 64 characters per line: the public key uses the SPKI structure (-----BEGIN PUBLIC KEY-----), the private key PKCS#8 (-----BEGIN PRIVATE KEY-----). Anything that accepts “an RSA public key” accepts SPKI; anything that accepts “an RSA private key” almost certainly means PKCS#8 unencrypted — the password-protected PKCS#8 variants (-----BEGIN ENCRYPTED PRIVATE KEY-----) are a separate export this page does not produce, deliberately: password-wrapping belongs on your machine with a tool you control.",
            "The JWK form carries the same key material as named fields: n (modulus) and e (exponent, always AQAB for 65537) for the public half; d, p, q, dp, dq and qi for the private half. Five of those private fields are enough to reconstruct everything — treat the private JWK exactly like the PEM private key. The kid shown here is a random label for your own bookkeeping; JOSE stacks replace it with a thumbprint when keys are published.",
            "Custody rules that survive contact with reality: never commit a private key (git-secrets or equivalent belongs in CI), pass it via secret managers rather than environment files on shared machines, and when rotating, verify the fingerprint (a short hash of the public key) on a second channel — the failure mode is not weak keys, it is pasting the wrong one into production.",
          ],
        },
      ],
    },
    zh: {
      name: "RSA 密钥对生成",
      tagline:
        "浏览器原生 WebCrypto 生成 RSA 密钥对(2048/3072/4096 位)——PEM 与 JWK 双格式导出,签名交叉验证的实现。免费、即时、离线可用。",
      intro: [
        "RSA 仍是 JWT 签名、密钥交换与文档签名的主力算法。本生成器用浏览器原生 WebCrypto 创建真实密钥对——RSASSA-PKCS1-v1_5、SHA-256、标准公钥指数 65537——支持 2048、3072、4096 位。",
        "密钥以两种通用格式导出:PEM(公钥 SPKI、私钥 PKCS#8),可直接用于 openssl、JWT 库与服务器配置;以及 JSON Web Key(JWK),适配 JOSE 系列的 Web 平台。",
        "全部由 crypto.subtle 本机生成——私钥不会离开此标签页,无任何服务端托管。较慢设备上 4096 位生成可能需要数秒。",
      ],
      steps: [
        "选择密钥长度:2048(默认)、3072 或 4096 位。",
        "点击生成密钥对——一对全新密钥在内存中创建。",
        "复制 PEM 公钥与私钥,或合并的 JWK,粘贴到你的应用或配置中。",
      ],
      faqs: [
        {
          q: "该选多大的密钥?",
          a: "2048 位是当前基线,几乎所有 JWT 库与证书机构都接受。3072 位对应 AES-128 的约 128 位安全强度;4096 位更稳妥但签名更慢、签名更大。新设计也可考虑更快的 Ed25519——需要兼容性时 RSA 仍是首选。",
        },
        {
          q: "在浏览器里生成私钥安全吗?",
          a: "密钥由浏览器内置的加密 API 创建,只显示在此标签页——不传输、不存储。风险等同于设备本身被攻破的风险。生产基础设施建议离线或 HSM 生成;开发、测试与个人项目用本工具完全够用。",
        },
      ],
      deepDive: [
        {
          heading: "对齐 2030 窗口的密钥长度选择",
          paragraphs: [
            "NIST SP 800-57 把 2048 位 RSA 定为 112 位安全强度——可用到 2030 年,3072 位对应 128 位(AES-128 等价)是中期之后的最低线。4096 位并不让强度翻倍:每多 512 位约加一个比特当量,代价是签名更慢、密文更大。所以推荐是:兼容优先选 2048,新基建选 3072,只有合规文件点名时才上 4096。",
            "RSA 签名开销随模数立方增长:4096 位私钥运算耗时约为 2048 位的八倍,高请求率的 JWT 验签场景必须考虑。验签对所有长度都便宜(公钥指数小)。Ed25519——新版 WebCrypto 已在旗标后支持、所有严肃 JWT 库都有——签名更快、密钥更小、固定 128 位安全;新系统优先它,RSA 留给生态要求的场景。",
            "本页替你处理的一个实务细节:公钥指数固定为 65537(F4),所有主流库与 CA 都按此假设。指数 3 验签略快但有填充实现的前科;冷门指数没有安全收益,只会破坏互操作。",
          ],
        },
        {
          heading: "PEM/JWK 结构解剖与保管纪律",
          paragraphs: [
            "PEM 输出是 ASN.1 DER 加 Base64(每行 64 字符)的包装:公钥用 SPKI 结构(-----BEGIN PUBLIC KEY-----),私钥用 PKCS#8(-----BEGIN PRIVATE KEY-----)。凡接受「RSA 公钥」的地方都吃 SPKI;接受「RSA 私钥」的几乎都指未加密的 PKCS#8——带口令的加密变体(-----BEGIN ENCRYPTED PRIVATE KEY-----)本页刻意不导出:口令包装应该在你自己掌控的机器上、用你自己的工具做。",
            "JWK 形式把同一份钥材装进命名字段:公钥是 n(模数)与 e(指数,65537 恒为 AQAB);私钥多出 d、p、q、dp、dq、qi。私有的那几个字段足以重建全部钥材——对待私钥 JWK 要像对待 PEM 私钥一样。本页显示的 kid 是给你自己做账用的随机标签;JOSE 体系在发布密钥时会换成指纹 thumbprint。",
            "经得起现实的保管纪律:私钥永不入库(CI 里配 git-secrets 或同类)、共享机器上传 secret manager 而非环境文件、轮换时在第二条通道核对指纹(公钥的短哈希)——真正的故障模式不是弱密钥,而是把错的那个粘进了生产。",
          ],
        },
      ],
    },
    ja: {
      name: "RSA 鍵ペア生成",
      tagline:
        "ブラウザのネイティブ WebCrypto で RSA 鍵ペア(2048/3072/4096 ビット)を生成 — PEM と JWK の両形式でエクスポート、署名クロス検証済みの実装。無料・プライベート・オフライン。",
      intro: [
        "RSA は今も JWT 署名・鍵交換・文書署名の主力です。このジェネレーターはブラウザの WebCrypto で本物の鍵ペアを作成します — RSASSA-PKCS1-v1_5、SHA-256、標準公開指数 65537、2048/3072/4096 ビット。",
        "鍵はあらゆるツールが受け入れる 2 形式でエクスポートされます:PEM(公開鍵 SPKI、秘密鍵 PKCS#8)は openssl・JWT ライブラリ・サーバー設定にそのまま使え、JSON Web Key(JWK)は JOSE 系 Web プラットフォーム向けです。",
        "すべて crypto.subtle でローカル生成 — 秘密鍵はこのタブから出ず、サーバー側の保管もありません。4096 ビットの生成は数秒かかることがあります。",
      ],
      steps: [
        "鍵長を選択:2048(既定)、3072、4096 ビット。",
        "鍵ペアを生成をクリック — 新しいペアがメモリ上に作成されます。",
        "PEM の公開鍵・秘密鍵、またはまとめた JWK をアプリや設定にコピーします。",
      ],
      faqs: [
        {
          q: "どの鍵長を選ぶべき?",
          a: "2048 ビットが現在の基準で、ほぼすべての JWT ライブラリと認証局が受け入れます。3072 ビットは AES-128 相当の約 128 ビット安全性、4096 ビットは署名が遅く大きな署名になる代わりに余裕を追加します。新規設計ではより高速な Ed25519 も検討価値があります — 相互運用性が必要なら RSA が選択肢です。",
        },
        {
          q: "ブラウザで秘密鍵を生成して安全?",
          a: "鍵はブラウザ内蔵の暗号 API が作成し、このタブにのみ表示されます — 送信も保存もありません。リスクは端末自体が侵害されるリスクと同等です。本番インフラではオフラインや HSM 生成を推奨、開発・ステージング・個人プロジェクトにはこの方法で十分です。",
        },
      ],
      deepDive: [
        {
          heading: "2030 年ウィンドウに合わせた鍵長の選択",
          paragraphs: [
            "NIST SP 800-57 は 2048 ビット RSA を 112 ビットの安全強度と位置づけ — 2030 年まで許容、3072 ビットが 128 ビット(AES-128 相当)でその先の中期最低線。4096 ビットは強度を倍にしません:512 ビットの追加ごとに約 1 ビット相当を加える代わりに、署名が遅く暗号文が大きくなります。だから推奨は互換優先なら 2048、新しいインフラなら 3072、規程文書が要求する場合だけ 4096 です。",
            "RSA 署名コストはモジュラスの三乗で増えます:4096 ビットの秘密鍵演算は 2048 ビットの約八倍 — 高頻度の JWT 検証で問題になります。検証は全サイズで安価(小さい公開指数)。Ed25519 — 新しい WebCrypto でフラグ付き対応、主要 JWT ライブラリ全てが対応 — は署名が速く鍵が小さく固定 128 ビット安全。新規システムはこちら、RSA はエコシステムが要求する場面へ。",
            "本ページが処理する実務的詳細:公開指数は 65537(F4)に固定 — すべての主要ライブラリと CA がこの前提です。指数 3 は検証が僅かに速い一方、パディング実装の事故歴があり、風変わりな指数はセキュリティ利得ゼロで相互運用を壊します。",
          ],
        },
        {
          heading: "PEM/JWK の構造と保管規律",
          paragraphs: [
            "PEM 出力は ASN.1 DER を Base64(1 行 64 文字)で包んだもの:公開鍵は SPKI 構造(-----BEGIN PUBLIC KEY-----)、秘密鍵は PKCS#8(-----BEGIN PRIVATE KEY-----)。「RSA 公開鍵」を受け付けるものは SPKI を受け付け、「RSA 秘密鍵」はほぼ certainly 暗号化されていない PKCS#8 を指します — パスワード保護された PKCS#8 変体(-----BEGIN ENCRYPTED PRIVATE KEY-----)は本ページが意図的に出力しないものです:パスワード包装は自分の管理するマシンで自分のツールで行うべき作業です。",
            "JWK 形式は同じ鍵素材を名前付きフィールドに格納します:公開側は n(モジュラス)と e(指数、65537 は常に AQAB);秘密側は d、p、q、dp、dq、qi。秘密側のフィールドのうち五つで全体を再構成できます — 秘密 JWK は PEM 秘密鍵とまったく同じ扱いに。表示される kid は自分の管理用のランダムラベルで、JOSE 系は鍵公開時にサムプリントへ置き換えます。",
            "現実に耐える保管規律:秘密鍵は決してコミットしない(CI に git-secrets などを)、共有マシンでは環境ファイルでなくシークレットマネージャで渡す、ローテーション時は第二チャネルで指紋(公開鍵の短いハッシュ)を照合 — 故障モードは弱い鍵ではなく、間違った鍵を本番に貼ることです。",
          ],
        },
      ],
    },
    es: {
      name: "Generador de pares de claves RSA",
      tagline:
        "Genere pares de claves RSA (2048/3072/4096 bits) en su navegador con WebCrypto nativo — exportación PEM y JWK, implementación verificada por firma. Gratis, privado, sin conexión.",
      intro: [
        "RSA sigue siendo el caballo de batalla de la firma JWT, el intercambio de claves y las firmas de documentos. Este generador crea pares reales con el WebCrypto nativo de su navegador — RSASSA-PKCS1-v1_5 con SHA-256 y el exponente público estándar 65537 — en 2048, 3072 o 4096 bits.",
        "Las claves se exportan en los dos formatos que acepta cualquier herramienta: PEM (SPKI para la pública, PKCS#8 para la privada) listo para openssl, librerías JWT y configuraciones de servidor, más JSON Web Key (JWK) para plataformas web JOSE.",
        "Todo se genera localmente con crypto.subtle — la clave privada nunca sale de esta pestaña y no hay custodia en servidor. La generación de 4096 bits puede tardar unos segundos.",
      ],
      steps: [
        "Elija el tamaño: 2048 (predeterminado), 3072 o 4096 bits.",
        "Haga clic en Generar par de claves — se crea un par nuevo en memoria.",
        "Copie las claves PEM pública y privada, o el JWK combinado, en su aplicación o configuración.",
      ],
      faqs: [
        {
          q: "¿Qué tamaño de clave elegir?",
          a: "2048 bits es el estándar actual y lo aceptan prácticamente todas las librerías JWT y autoridades de certificación. 3072 bits equivale al nivel de seguridad de AES-128; 4096 bits añade margen a costa de firmas más lentas y grandes. Para diseños nuevos considere Ed25519, más rápido — RSA sigue siendo la opción cuando exige interoperabilidad.",
        },
        {
          q: "¿Es seguro generar una clave privada en el navegador?",
          a: "La clave se crea con la API criptográfica integrada de su navegador y solo se muestra en esta pestaña — no se transmite ni almacena. El riesgo equivale al compromiso de su propio dispositivo. Para infraestructura de producción prefiera generación offline o HSM; para desarrollo, staging y proyectos personales este flujo es totalmente adecuado.",
        },
      ],
      deepDive: [
        {
          heading: "Tamaños de clave frente a la ventana de 2030",
          paragraphs: [
            "NIST SP 800-57 sitúa el RSA de 2048 bits en un nivel de seguridad de 112 bits — aceptable hasta 2030, con 3072 bits en 128 bits (equivalente a AES-128) como mínimo a medio plazo después. 4096 bits no duplica la fuerza: añade aproximadamente un bit-equivalente por cada 512 bits extra mientras hace las firmas más lentas y el cifrado más grande. Por eso la recomendación es 2048 para trabajo compatibilidad-primero, 3072 para infraestructura nueva, y 4096 solo cuando un documento de política lo exija.",
            "El coste de firma de RSA crece con el cubo del módulo: una operación de clave privada de 4096 bits tarda unas ocho veces más que a 2048, lo que importa para verificación JWT a altas tasas de petición. La verificación es barata para todos los tamaños (exponente público pequeño). Ed25519 — disponible en WebCrypto moderno tras un flag y en todas las bibliotecas JWT serias — firma más rápido con claves pequeñas y 128 bits fijos; elíjalo para sistemas nuevos, guarde RSA para los ecosistemas que lo esperan.",
            "Una sutileza práctica que esta página resuelve por usted: el exponente público está fijado en 65537 (F4), el valor que toda biblioteca importante y toda CA asumen. El exponente 3 verifica marginalmente más rápido pero tiene historial de fallos de implementación del relleno; exponentes exóticos rompen la interoperabilidad sin ganancia de seguridad.",
          ],
        },
        {
          heading: "Anatomía PEM/JWK y disciplina de custodia",
          paragraphs: [
            "La salida PEM es DER ASN.1 envuelto en Base64 a 64 caracteres por línea: la clave pública usa la estructura SPKI (-----BEGIN PUBLIC KEY-----), la privada PKCS#8 (-----BEGIN PRIVATE KEY-----). Todo lo que acepta «una clave pública RSA» acepta SPKI; todo lo que acepta «una clave privada RSA» significa casi con certeza PKCS#8 sin cifrar — las variantes protegidas por contraseña (-----BEGIN ENCRYPTED PRIVATE KEY-----) son una exportación aparte que esta página no produce deliberadamente: el envoltorio con contraseña pertenece a su máquina con una herramienta que usted controle.",
            "La forma JWK transporta el mismo material en campos nombrados: n (módulo) y e (exponente, siempre AQAB para 65537) en la mitad pública; d, p, q, dp, dq y qi en la privada. Cinco de esos campos privados bastan para reconstruir todo — trate el JWK privado exactamente como la clave privada PEM. El kid que se muestra es una etiqueta aleatoria para su contabilidad; las pilas JOSE lo sustituyen por una huella cuando las claves se publican.",
            "Reglas de custodia que sobreviven al contacto con la realidad: nunca confirme una clave privada (git-secrets o equivalente pertenece al CI), pásela por gestores de secretos en lugar de archivos de entorno en máquinas compartidas, y al rotar verifique la huella (un hash corto de la clave pública) por un segundo canal — el modo de fallo no son las claves débiles, es pegar la equivocada en producción.",
          ],
        },
      ],
    },
    pt: {
      name: "Gerador de par de chaves RSA",
      tagline:
        "Gere pares de chaves RSA (2048/3072/4096 bits) no seu navegador com WebCrypto nativo — exportação PEM e JWK, implementação verificada por assinatura. Grátis, privado, offline.",
      intro: [
        "RSA continua sendo o carro-chefe de assinatura JWT, troca de chaves e assinaturas de documentos. Este gerador cria pares reais com o WebCrypto nativo do seu navegador — RSASSA-PKCS1-v1_5 com SHA-256 e o expoente público padrão 65537 — em 2048, 3072 ou 4096 bits.",
        "As chaves são exportadas nos dois formatos que toda ferramenta aceita: PEM (SPKI para a pública, PKCS#8 para a privada) pronto para openssl, bibliotecas JWT e configurações de servidor, além de JSON Web Key (JWK) para plataformas web JOSE.",
        "Tudo é gerado localmente com crypto.subtle — a chave privada nunca sai desta aba, sem custódia em servidor. A geração de 4096 bits pode levar alguns segundos.",
      ],
      steps: [
        "Escolha o tamanho: 2048 (padrão), 3072 ou 4096 bits.",
        "Clique em Gerar par de chaves — um par novo é criado na memória.",
        "Copie as chaves PEM pública e privada, ou o JWK combinado, para sua aplicação ou configuração.",
      ],
      faqs: [
        {
          q: "Qual tamanho de chave escolher?",
          a: "2048 bits é o padrão atual e aceito por praticamente todas as bibliotecas JWT e autoridades certificadoras. 3072 bits equivale ao nível de segurança do AES-128; 4096 bits adiciona margem ao custo de assinaturas mais lentas e maiores. Para novos designs considere Ed25519, mais rápido — RSA permanece a escolha quando interoperabilidade exige.",
        },
        {
          q: "É seguro gerar uma chave privada no navegador?",
          a: "A chave é criada pela API criptográfica nativa do navegador e exibida apenas nesta aba — nada é transmitido ou armazenado. O risco equivale ao comprometimento do próprio dispositivo. Para infraestrutura de produção prefira geração offline ou HSM; para desenvolvimento, staging e projetos pessoais este fluxo é totalmente adequado.",
        },
      ],
      deepDive: [
        {
          heading: "Tamanhos de chave contra a janela de 2030",
          paragraphs: [
            "O NIST SP 800-57 posiciona o RSA de 2048 bits num nível de segurança de 112 bits — aceitável até 2030, com 3072 bits em 128 bits (equivalente ao AES-128) como mínimo de médio prazo depois. 4096 bits não dobra a força: adiciona aproximadamente um bit-equivalente por cada 512 bits extras enquanto torna as assinaturas mais lentas e o cifrado maior. Por isso a recomendação é 2048 para trabalho compatibilidade-primeiro, 3072 para infraestrutura nova, e 4096 só quando um documento de política exigir.",
            "O custo de assinatura do RSA cresce com o cubo do módulo: uma operação de chave privada de 4096 bits leva cerca de oito vezes mais que a de 2048, o que importa para verificação JWT em altas taxas de requisição. A verificação é barata em todos os tamanhos (expoente público pequeno). Ed25519 — disponível no WebCrypto moderno atrás de um flag e em todas as bibliotecas JWT sérias — assina mais rápido com chaves pequenas e 128 bits fixos; escolha-o para sistemas novos, mantenha RSA onde o ecossistema o espera.",
            "Uma sutileza prática que esta página resolve para você: o expoente público é fixado em 65537 (F4), o valor que toda biblioteca importante e CA assume. O expoente 3 verifica marginalmente mais rápido mas tem histórico de armadilhas de implementação de padding; expoentes exóticos quebram interop sem ganho de segurança.",
          ],
        },
        {
          heading: "Anatomia PEM/JWK e disciplina de custódia",
          paragraphs: [
            "A saída PEM é DER ASN.1 embrulhado em Base64 a 64 caracteres por linha: a chave pública usa a estrutura SPKI (-----BEGIN PUBLIC KEY-----), a privada PKCS#8 (-----BEGIN PRIVATE KEY-----). Tudo que aceita «uma chave pública RSA» aceita SPKI; tudo que aceita «uma chave privada RSA» significa quase certamente PKCS#8 sem cifragem — as variantes protegidas por senha (-----BEGIN ENCRYPTED PRIVATE KEY-----) são uma exportação aparte que esta página não produz, deliberadamente: o embrulho por senha pertence à sua máquina com uma ferramenta que você controla.",
            "A forma JWK carrega o mesmo material em campos nomeados: n (módulo) e e (expoente, sempre AQAB para 65537) na metade pública; d, p, q, dp, dq e qi na privada. Cinco desses campos privados bastam para reconstruir tudo — trate o JWK privado exatamente como a chave privada PEM. O kid mostrado aqui é um rótulo aleatório para seu próprio controle; as pilhas JOSE o substituem por uma thumbprint quando as chaves são publicadas.",
            "Regras de custódia que sobrevivem ao contato com a realidade: nunca faça commit de uma chave privada (git-secrets ou equivalente pertence ao CI), passe-a por gerenciadores de segredos em vez de arquivos de ambiente em máquinas compartilhadas, e ao rotacionar verifique a impressão digital (um hash curto da chave pública) por um segundo canal — o modo de falha não são chaves fracas, é colar a errada em produção.",
          ],
        },
      ],
    },
  },
});
