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
    },
  },
});
