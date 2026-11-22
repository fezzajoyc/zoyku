import { DevEngineAes } from "../_engines/dev-engine-aes";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "aes-encrypt",
  category: "security",
  icon: "lock",
  engine: { component: DevEngineAes },
  related: ["rsa-key-generator", "hmac-generator", "hash-generator", "sm3-hash"],
  copy: {
    en: {
      name: "AES-256 Encrypt & Decrypt",
      tagline:
        "Encrypt and decrypt text with AES-256-GCM in your browser — PBKDF2-hardened passphrase, authenticated encryption that rejects tampering, self-describing Base64 payload. Free, private, offline.",
      intro: [
        "AES-GCM is the authenticated encryption the whole industry converged on: it protects confidentiality and integrity at once, so a wrong passphrase or a tampered payload is rejected instead of silently producing garbage. This tool derives a 256-bit key from your passphrase with PBKDF2-SHA256 at 210,000 iterations and encrypts with a fresh random salt and IV every time.",
        "The output is a single self-describing Base64 payload: salt ‖ IV ‖ ciphertext. Paste it back with the same passphrase and it decrypts — no separate salt/IV fields, no settings to reproduce. CBC mode is included only for compatibility with legacy systems that mandate it, clearly marked as unauthenticated.",
        "Everything runs locally with your browser's native WebCrypto — the passphrase and plaintext never leave this tab, and there is no server-side key escrow by design.",
      ],
      steps: [
        "Pick Encrypt or Decrypt, and the mode (GCM recommended; CBC only for legacy interop).",
        "Enter the passphrase and the text — for decryption, paste the full Base64 payload.",
        "Click Run — the result appears below with a copy button; wrong passphrases and tampering are explicitly rejected.",
      ],
      faqs: [
        {
          q: "Why does GCM fail loudly instead of decrypting to garbage?",
          a: "GCM is an authenticated mode: along with the ciphertext it computes an authentication tag, and decryption verifies that tag before returning anything. A wrong passphrase, a flipped bit, or a truncated payload all fail the tag check and are rejected — this is the property that makes GCM the industry default. CBC has no such tag, which is why it is marked legacy here.",
        },
        {
          q: "Is a passphrase as good as a random key?",
          a: "With PBKDF2 at 210,000 iterations, a genuinely random multi-word passphrase is strong for practical purposes; a short human password is not — the iteration count only slows brute force, it cannot rescue a guessable secret. For machine-to-machine flows, generate a high-entropy key and distribute it through a secret manager instead of a passphrase.",
        },
      ],
      deepDive: [
        {
          heading: "Why GCM replaced CBC + HMAC composition",
          paragraphs: [
            "Before authenticated modes became standard, the recommended construction was CBC plus a separate HMAC — and the composition order mattered fatally. Encrypt-then-MAC (verify first, decrypt second) is safe; MAC-then-encrypt, used by early TLS versions, enabled padding-oracle attacks like Lucky13 that leak plaintext byte by byte through timing. GCM eliminates the entire class: one pass computes confidentiality and the authentication tag together, so there is no ordering to get wrong.",
            "The one way to break GCM is IV reuse under the same key. GCM builds its authentication on CTR mode; reusing a nonce leaks the XOR of two plaintexts and, worse, allows forgery of the authentication tag itself. That is why this page generates a fresh random IV per operation and packs it into the payload rather than accepting one as input — it removes the single most dangerous user error.",
            "One consequence of the tag: GCM ciphertext is 16 bytes longer than the plaintext (the tag travels with it). If a payload is one byte short of what a system expects, the honest answer is that the system wants a different format — not that the tag can be trimmed.",
          ],
        },
        {
          heading: "The payload format, and why OpenSSL files will not decrypt here",
          paragraphs: [
            "The Base64 output decodes to salt(16) ‖ IV(12) ‖ ciphertext — a self-describing layout so the same passphrase decrypts it anywhere this format is understood. OpenSSL's enc command uses a different convention: the header Salted__ followed by an 8-byte salt, a KDF (legacy EVP_BytesToKey unless -pbkdf2 is passed) and different defaults. Encrypted blobs are not interchangeable between the two — matching the algorithm is not enough, the key derivation and container must match too.",
            "PBKDF2 iteration counts are a moving target across tools: 210,000 here reflects current OWASP guidance, OpenSSL defaults have changed between versions, and older software may use 1,000. When interoperating, confirm the count on both sides; a payload that decrypts to garbage with the correct passphrase usually means a KDF mismatch, not a broken implementation.",
            "For large files or streaming, this page's design (one Base64 payload in memory) is not the right shape — use age, OpenSSL or a dedicated tool that processes streams. Where this page shines: messages, config snippets, API secrets and recovery keys — text payloads up to the size limit that must be decryptable by a person, anywhere, without installing anything.",
          ],
        },
      ],
    },
    zh: {
      name: "AES-256 加解密",
      tagline:
        "浏览器内 AES-256-GCM 加解密——PBKDF2 加固口令、认证加密拒绝篡改、自描述 Base64 载荷。免费、即时、离线可用。",
      intro: [
        "AES-GCM 是全行业收敛的认证加密方案:同时保护机密性与完整性,口令错误或载荷被篡改会被明确拒绝,而不是静默解出乱码。本工具用 PBKDF2-SHA256(210,000 次迭代)把口令拉伸为 256 位密钥,每次运算使用全新的随机 salt 与 IV。",
        "输出是单个自描述的 Base64 载荷:salt ‖ IV ‖ 密文。同一口令粘贴回来即可解密——没有独立的 salt/IV 字段,也没有需要复现的设置。CBC 模式仅为兼容强制使用它的遗留系统而提供,并明确标注无认证。",
        "全部由浏览器原生 WebCrypto 本机完成——口令与明文不会离开此标签页,设计上不存在服务端密钥托管。",
      ],
      steps: [
        "选择加密或解密,以及模式(GCM 推荐;CBC 仅用于遗留互操作)。",
        "输入口令与文本——解密时粘贴完整 Base64 载荷。",
        "点击执行——结果显示在下方并带复制按钮;口令错误与篡改会被明确拒绝。",
      ],
      faqs: [
        {
          q: "为什么 GCM 解密失败是明确报错而不是解出乱码?",
          a: "GCM 是认证加密模式:除密文外还会计算认证标签,解密前先验证标签。口令错误、比特翻转、载荷截断都会导致标签校验失败而被拒绝——这正是它成为行业默认的特性。CBC 没有这种标签,所以在本页被标注为遗留模式。",
        },
        {
          q: "口令能顶随机密钥用吗?",
          a: "在 210,000 次 PBKDF2 迭代下,真正随机的多词口令在实用层面足够强;短的人类口令不行——迭代次数只能拖慢暴力破解,救不了可猜测的秘密。机器对机器的流程请生成高熵密钥并通过密钥管理服务分发,而不是靠口令。",
        },
      ],
      deepDive: [
        {
          heading: "GCM 为什么取代了 CBC + HMAC 组合",
          paragraphs: [
            "认证加密成为标准之前,推荐的做法是 CBC 外加独立的 HMAC——而组合顺序是致命细节。先加密后验签(EtM:先验证再解密)是安全的;先验签后加密(早期 TLS 的 MtE 顺序)催生了 Lucky13 这类填充预言攻击,通过时序逐字节泄露明文。GCM 消灭了整类问题:一次运算同时完成机密性与认证标签,不存在搞错顺序的可能。",
            "GCM 唯一的崩溃方式是同密钥下复用 IV。GCM 的认证建立在 CTR 模式上;复用 nonce 会泄露两条明文的异或,更糟的是连认证标签本身都能被伪造。这就是本页每次运算生成全新随机 IV、并把它打包进载荷而不是让用户输入的原因——直接消除了最危险的用户错误。",
            "认证标签的一个副作用:GCM 密文比明文长 16 字节(标签随行)。如果某个系统期望的载荷恰好差一个字节,诚实的答案是它要的是别的格式——而不是把标签剪掉。",
          ],
        },
        {
          heading: "载荷格式,以及为什么 OpenSSL 加密的文件在这里解不开",
          paragraphs: [
            "Base64 输出解码后是 salt(16) ‖ IV(12) ‖ 密文——自描述布局,任何理解此格式的地方用同一口令即可解密。OpenSSL 的 enc 命令用的是另一套约定:头 Salted__ 加 8 字节 salt,KDF(除非传 -pbkdf2,否则是老的 EVP_BytesToKey)与不同默认值。两边的加密产物不可互换——算法一致不够,密钥派生与容器格式也必须一致。",
            "PBKDF2 迭代次数在各类工具间是个移动目标:本页 210,000 次反映当前 OWASP 建议,OpenSSL 的默认值在版本间变过,更老的软件可能只有 1,000 次。互操作时先确认两侧的次数;口令正确却解出乱码的载荷,通常意味着 KDF 不匹配,而不是实现坏了。",
            "大文件或流式场景不适合本页的设计(单 Base64 载荷整载进内存)——请用 age、OpenSSL 或专门的流式工具。本页的最佳场景:消息、配置片段、API 密钥与恢复密钥——那些必须让任何人、任何地方、不装任何东西就能解密的文本载荷。",
          ],
        },
      ],
    },
    ja: {
      name: "AES-256 暗号化・復号",
      tagline:
        "ブラウザ内で AES-256-GCM の暗号化・復号 — PBKDF2 強化パスフレーズ、改ざんを拒否する認証暗号、自己記述型 Base64 ペイロード。無料・プライベート・オフライン。",
      intro: [
        "AES-GCM は業界全体が収束した認証暗号です:機密性と完全性を同時に守り、誤ったパスフレーズや改ざんされたペイロードは、黙ってゴミを生成するのではなく拒否します。本ツールは PBKDF2-SHA256(210,000 回)でパスフレーズから 256 ビット鍵を導出し、毎回新しいランダム salt と IV で暗号化します。",
        "出力は単一の自己記述型 Base64 ペイロード:salt ‖ IV ‖ 暗号文。同じパスフレーズで貼り付ければ復号できます — 独立した salt/IV フィールドも、再現すべき設定もありません。CBC はレガシーシステムとの互換のためのみ提供され、認証なしと明示されています。",
        "すべてブラウザのネイティブ WebCrypto でローカル実行 — パスフレーズと平文はこのタブから出ず、サーバー側の鍵保管は設計上存在しません。",
      ],
      steps: [
        "暗号化または復号、そしてモードを選択(GCM 推奨。CBC はレガシー互換のみ)。",
        "パスフレーズとテキストを入力 — 復号では Base64 ペイロード全体を貼り付けます。",
        "実行をクリック — 結果が下に表示されコピーボタンが付きます。誤ったパスフレーズと改ざんは明確に拒否されます。",
      ],
      faqs: [
        {
          q: "GCM がゴミを出さずに明確に失敗するのはなぜ?",
          a: "GCM は認証付きモードです:暗号文と共に認証タグを計算し、復号は何を返す前にタグを検証します。誤ったパスフレーズ、ビット反転、切断されたペイロードはすべてタグ検証に失敗して拒否されます — これが GCM が業界標準である理由です。CBC にはこのタグがないため、本ページではレガシーと明示しています。",
        },
        {
          q: "パスフレーズはランダム鍵の代わりになる?",
          a: "210,000 回の PBKDF2 の下では、真にランダムな多語パスフレーズは実用上十分に強いです。短い人間のパスワードは違います — 反復回数は総当たりを遅くするだけで、推測可能な秘密は救えません。マシン間フローでは高エントロピー鍵を生成し、パスフレーズではなくシークレットマネージャで配布してください。",
        },
      ],
      deepDive: [
        {
          heading: "GCM が CBC + HMAC 構成を置き換えた理由",
          paragraphs: [
            "認証モードが標準になる前、推奨構成は CBC と独立した HMAC の組み合わせでした — そして組み合わせ順序が致命的でした。Encrypt-then-MAC(先に検証、後に復号)は安全ですが、初期 TLS が使った MAC-then-encrypt は Lucky13 などのパディングオラクル攻撃を可能にし、タイミング経由で平文を一バイトずつ漏洩します。GCM はこの問題クラス全体を排除します:一回の処理で機密性と認証タグを同時に計算するため、順序を間違える余地がありません。",
            "GCM を破る唯一の方法は、同じ鍵での IV 再利用です。GCM の認証は CTR モードの上に構築され、ノンスを再利用すると二つの平文の XOR が漏れ、さらに認証タグ自体の偽造も可能になります。だから本ページは毎回新しいランダム IV を生成し、ユーザー入力として受け入れずにペイロードへ梱包します — 最も危険なユーザーエラーを排除するためです。",
            "タグの副作用:GCM 暗号文は平文より 16 バイト長くなります(タグが同行)。ペイロードがシステムの期待より一バイト短い場合、正直な答えは「タグを切り詰めるのではなく、別のフォーマットを求めている」です。",
          ],
        },
        {
          heading: "ペイロード形式、および OpenSSL のファイルがここで復号できない理由",
          paragraphs: [
            "Base64 出力は salt(16) ‖ IV(12) ‖ 暗号文 — 自己記述型レイアウトで、この形式を理解するどこでも同じパスフレーズで復号できます。OpenSSL の enc コマンドは別の規約を使います:ヘッダ Salted__ と 8 バイト salt、KDF(-pbkdf2 を渡さない限りレガシーの EVP_BytesToKey)、異なるデフォルト。暗号化产物は両者で互換しません — アルゴリズムの一致だけでは足りず、鍵導出とコンテナも一致が必要です。",
            "PBKDF2 反復回数はツール間で移動するターゲットです:本ページの 210,000 は現在の OWASP ガイダンスを反映し、OpenSSL のデフォルトは版によって変わり、古いソフトは 1,000 のことも。相互運用時は両側の回数を確認してください。正しいパスフレーズでもゴミに復号されるペイロードは、たいてい KDF の不一致です。",
            "大きなファイルやストリーミングには、本ページの設計(メモリ内の単一 Base64 ペイロード)は不適です — age、OpenSSL、ストリーム処理する専用ツールをお使いください。本ページが輝くのは:メッセージ、設定断片、API シークレット、リカバリキー — 何もインストールせず誰でもどこでも復号できるテキストペイロードです。",
          ],
        },
      ],
    },
    es: {
      name: "Cifrado y descifrado AES-256",
      tagline:
        "Cifre y descifre texto con AES-256-GCM en su navegador — frase reforzada con PBKDF2, cifrado autenticado que rechaza manipulaciones, carga Base64 autodescriptiva. Gratis, privado, sin conexión.",
      intro: [
        "AES-GCM es el cifrado autenticado hacia el que convergió toda la industria: protege confidencialidad e integridad a la vez, así que una frase incorrecta o una carga manipulada se rechazan en lugar de producir basura silenciosamente. Esta herramienta deriva una clave de 256 bits de su frase con PBKDF2-SHA256 a 210.000 iteraciones y cifra con salt e IV aleatorios nuevos cada vez.",
        "La salida es una única carga Base64 autodescriptiva: salt ‖ IV ‖ cifrado. Péguela de vuelta con la misma frase y se descifra — sin campos separados de salt/IV, sin ajustes que reproducir. El modo CBC se incluye solo por compatibilidad con sistemas antiguos que lo exigen, marcado claramente como sin autenticación.",
        "Todo se ejecuta localmente con el WebCrypto nativo de su navegador — la frase y el texto en claro nunca salen de esta pestaña, y no existe custodia de claves en servidor por diseño.",
      ],
      steps: [
        "Elija Cifrar o Descifrar, y el modo (GCM recomendado; CBC solo para interoperabilidad legada).",
        "Introduzca la frase y el texto — para descifrar, pegue la carga Base64 completa.",
        "Haga clic en Ejecutar — el resultado aparece abajo con botón de copia; frases incorrectas y manipulaciones se rechazan explícitamente.",
      ],
      faqs: [
        {
          q: "¿Por qué GCM falla loudly en lugar de descifrar a basura?",
          a: "GCM es un modo autenticado: junto con el cifrado calcula una etiqueta de autenticación, y el descifrado verifica esa etiqueta antes de devolver nada. Una frase incorrecta, un bit alterado o una carga truncada fallan la verificación y se rechazan — es la propiedad que hace de GCM el estándar de la industria. CBC no tiene esa etiqueta, por eso aquí se marca como legado.",
        },
        {
          q: "¿Una frase equivale a una clave aleatoria?",
          a: "Con PBKDF2 a 210.000 iteraciones, una frase genuinamente aleatoria de varias palabras es fuerte para fines prácticos; una contraseña humana corta no lo es — el conteo de iteraciones solo ralentiza la fuerza bruta, no rescata un secreto adivinable. Para flujos máquina a máquina, genere una clave de alta entropía y distribúyala mediante un gestor de secretos en lugar de una frase.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué GCM reemplazó a la composición CBC + HMAC",
          paragraphs: [
            "Antes de que los modos autenticados se estandarizaran, la construcción recomendada era CBC más un HMAC separado — y el orden de la composición era fatalmente importante. Encrypt-then-MAC (verificar primero, descifrar después) es seguro; MAC-then-encrypt, usado por las primeras versiones de TLS, habilitó ataques de oráculo de relleno como Lucky13 que filtran el texto en claro byte a byte a través del tiempo. GCM elimina toda esa clase: una sola pasada calcula confidencialidad y la etiqueta de autenticación juntas, así que no hay orden que equivocar.",
            "La única forma de romper GCM es reutilizar el IV bajo la misma clave. GCM construye su autenticación sobre el modo CTR; reutilizar un nonce filtra el XOR de dos textos en claros y, peor aún, permite falsificar la propia etiqueta de autenticación. Por eso esta página genera un IV aleatorio nuevo por operación y lo empaqueta en la carga en lugar de aceptarlo como entrada — elimina el error de usuario más peligroso.",
            "Una consecuencia de la etiqueta: el cifrado GCM es 16 bytes más largo que el texto en claro (la etiqueta viaja con él). Si una carga es un byte más corta de lo que un sistema espera, la respuesta honesta es que el sistema quiere otro formato — no que la etiqueta pueda recortarse.",
          ],
        },
        {
          heading: "El formato de la carga, y por qué los archivos de OpenSSL no se descifran aquí",
          paragraphs: [
            "La salida Base64 decodifica a salt(16) ‖ IV(12) ‖ cifrado — un diseño autodescriptivo para que la misma frase la descifre dondequiera que se entienda este formato. El comando enc de OpenSSL usa otra convención: el encabezado Salted__ seguido de un salt de 8 bytes, un KDF (EVP_BytesToKey heredado salvo que se pase -pbkdf2) y valores por defecto distintos. Los blobs cifrados no son intercambiables entre ambos — coincidir en el algoritmo no basta; la derivación de clave y el contenedor también deben coincidir.",
            "Los conteos de iteraciones de PBKDF2 son un objetivo móvil entre herramientas: 210.000 aquí refleja la guía OWASP actual, los valores por defecto de OpenSSL han cambiado entre versiones, y el software antiguo puede usar 1.000. Al interoperar, confirme el conteo en ambos lados; una carga que descifra a basura con la frase correcta suele significar una discrepancia de KDF, no una implementación rota.",
            "Para archivos grandes o flujo continuo, el diseño de esta página (una carga Base64 en memoria) no es la forma correcta — use age, OpenSSL o una herramienta dedicada que procese flujos. Donde brilla esta página: mensajes, fragmentos de configuración, secretos de API y claves de recuperación — cargas de texto que deben poder descifrar personas, en cualquier lugar, sin instalar nada.",
          ],
        },
      ],
    },
    pt: {
      name: "Cifragem e decifragem AES-256",
      tagline:
        "Cifre e decifre texto com AES-256-GCM no seu navegador — frase reforçada com PBKDF2, cifragem autenticada que rejeita adulteração, carga Base64 autodescritiva. Grátis, privado, offline.",
      intro: [
        "AES-GCM é a cifragem autenticada na qual toda a indústria convergiu: protege confidencialidade e integridade ao mesmo tempo, então uma frase errada ou uma carga adulterada é rejeitada em vez de produzir lixo silenciosamente. Esta ferramenta deriva uma chave de 256 bits da sua frase com PBKDF2-SHA256 a 210.000 iterações e cifra com salt e IV aleatórios novos a cada vez.",
        "A saída é uma única carga Base64 autodescritiva: salt ‖ IV ‖ cifrado. Cole de volta com a mesma frase e ela decifra — sem campos separados de salt/IV, sem ajustes a reproduzir. O modo CBC é incluído apenas por compatibilidade com sistemas legados que o exigem, claramente marcado como sem autenticação.",
        "Tudo roda localmente com o WebCrypto nativo do seu navegador — a frase e o texto em claro nunca saem desta aba, e não há custódia de chaves em servidor por desenho.",
      ],
      steps: [
        "Escolha Cifrar ou Decifrar, e o modo (GCM recomendado; CBC só para interoperabilidade legada).",
        "Digite a frase e o texto — para decifrar, cole a carga Base64 completa.",
        "Clique em Executar — o resultado aparece abaixo com botão de cópia; frases erradas e adulterações são rejeitadas explicitamente.",
      ],
      faqs: [
        {
          q: "Por que o GCM falha alto em vez de decifrar para lixo?",
          a: "GCM é um modo autenticado: junto com o cifrado calcula uma etiqueta de autenticação, e a decifragem verifica essa etiqueta antes de devolver qualquer coisa. Uma frase errada, um bit invertido ou uma carga truncada falham na verificação e são rejeitados — é a propriedade que faz do GCM o padrão da indústria. O CBC não tem essa etiqueta, por isso é marcado como legado aqui.",
        },
        {
          q: "Uma frase serve como chave aleatória?",
          a: "Com PBKDF2 a 210.000 iterações, uma frase genuinamente aleatória de várias palavras é forte para fins práticos; uma senha humana curta não é — o número de iterações apenas retarda a força bruta, não resgata um segredo adivinhável. Para fluxos máquina a máquina, gere uma chave de alta entropia e distribua por um gerenciador de segredos em vez de uma frase.",
        },
      ],
      deepDive: [
        {
          heading: "Por que o GCM substituiu a composição CBC + HMAC",
          paragraphs: [
            "Antes de os modos autenticados se padronizarem, a construção recomendada era CBC mais um HMAC separado — e a ordem da composição era fatalmente importante. Encrypt-then-MAC (verificar primeiro, decifrar depois) é seguro; MAC-then-encrypt, usado pelas primeiras versões do TLS, habilitou ataques de oráculo de padding como o Lucky13 que vazam o texto em claro byte a byte através do tempo. O GCM elimina toda essa classe: uma única passada calcula confidencialidade e a etiqueta de autenticação juntas, então não há ordem para errar.",
            "A única forma de quebrar o GCM é reutilizar o IV sob a mesma chave. O GCM constrói sua autenticação sobre o modo CTR; reutilizar um nonce vaza o XOR de dois textos em claros e, pior, permite falsificar a própria etiqueta de autenticação. Por isso esta página gera um IV aleatório novo por operação e o empacota na carga em vez de aceitá-lo como entrada — elimina o erro de usuário mais perigoso.",
            "Uma consequência da etiqueta: o cifrado GCM é 16 bytes mais longo que o texto em claro (a etiqueta viaja com ele). Se uma carga está um byte abaixo do que um sistema espera, a resposta honesta é que o sistema quer um formato diferente — não que a etiqueta possa ser cortada.",
          ],
        },
        {
          heading: "O formato da carga, e por que arquivos do OpenSSL não decifram aqui",
          paragraphs: [
            "A saída Base64 decodifica para salt(16) ‖ IV(12) ‖ cifrado — um layout autodescritivo para que a mesma frase a decifre ondequer que este formato seja entendido. O comando enc do OpenSSL usa outra convenção: o cabeçalho Salted__ seguido de um salt de 8 bytes, um KDF (EVP_BytesToKey legado a menos que -pbkdf2 seja passado) e padrões diferentes. Blobs cifrados não são intercambiáveis entre os dois — coincidir no algoritmo não basta; a derivação de chave e o contêiner também devem coincidir.",
            "Contagens de iterações do PBKDF2 são um alvo móvel entre ferramentas: 210.000 aqui reflete a orientação atual da OWASP, os padrões do OpenSSL mudaram entre versões, e software antigo pode usar 1.000. Ao interoperar, confirme a contagem em ambos os lados; uma carga que decifra para lixo com a frase correta geralmente significa uma discrepância de KDF, não uma implementação quebrada.",
            "Para arquivos grandes ou streaming, o desenho desta página (uma carga Base64 em memória) não é a forma certa — use age, OpenSSL ou uma ferramenta dedicada que processe fluxos. Onde esta página brilha: mensagens, trechos de configuração, segredos de API e chaves de recuperação — cargas de texto que devem ser decifráveis por uma pessoa, em qualquer lugar, sem instalar nada.",
          ],
        },
      ],
    },
  },
});
