import { SecEngineSm2 } from "../_engines/sec-engine-sm2";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "sm2-sign",
  category: "security",
  icon: "key",
  engine: { component: SecEngineSm2 },
  related: ["sm3-hash", "sm4-encrypt", "rsa-key-generator", "hmac-generator"],
  copy: {
    en: {
      name: "SM2 Key Pair, Signature & Encryption",
      tagline:
        "Generate SM2 key pairs, sign and verify messages, encrypt and decrypt — the elliptic-curve algorithm of the Chinese national standard (GB/T 32918-2016) with SM3-hashed signatures and C1C3C2 encryption. Free, private, offline.",
      intro: [
        "SM2 is the elliptic-curve algorithm of the Chinese commercial cryptography suite: it plays the role ECDSA plays internationally, and it is mandated wherever Chinese-standard workflows require an asymmetric primitive — government, finance, e-seals and GM/T protocol stacks. This tool covers the complete workflow: key pair generation, signing with SM3 hashing, signature verification, and encryption/decryption in the standard's C1C3C2 ciphertext order.",
        "Paste your own keys or generate a fresh pair with one click (private key 64 hex characters, public key 130 hex characters with the 04 uncompressed-point prefix). Every signature and encryption introduces a fresh random k per the standard, so outputs differ each time — verification and decryption stay valid regardless, and deterministic-signature rejections disappear.",
        "SM2 keys belong to the SM2 curve: they are not ECDSA (P-256) or RSA keys, and the reverse also holds. Everything runs locally with the sm-crypto library — the private key never leaves this tab, and there is no server-side escrow.",
      ],
      steps: [
        "Generate a key pair or paste your own (private 64 hex, public 130 hex).",
        "Sign a message and verify it — or encrypt with the public key and decrypt with the private key.",
        "Copy the signature or ciphertext; invalid key formats are rejected with the exact expectation stated.",
      ],
      faqs: [
        {
          q: "Do SM2 keys work with ECDSA or RSA?",
          a: "No. SM2 uses its own curve and its own signature scheme, fully separate from ECDSA (P-256) and RSA. A counterparty that verifies with standard algorithms cannot read SM2 signatures, and vice versa — use SM2 only in workflows that require it, typically Chinese-standard or GM/T integrations.",
        },
        {
          q: "Why is the signature different every time for the same message?",
          a: "SM2 introduces a fresh random number k at every signing operation — a security requirement of the standard (reuse of k leaks the private key). The resulting signature differs each time while remaining equally valid; some verification standards reject deterministic signature schemes for exactly this reason.",
        },
      ],
    },
    zh: {
      name: "SM2 密钥对、签名与加密",
      tagline:
        "生成 SM2 密钥对、签名验签、加解密一站式——中国国家标准椭圆曲线算法(GB/T 32918-2016),SM3 摘要签名与 C1C3C2 加密。免费、即时、离线可用。",
      intro: [
        "SM2 是中国商用密码体系的椭圆曲线算法:国际上的对应物是 ECDSA,凡中国标准流程要求非对称原语的场景——政务、金融、电子签章与 GM/T 协议栈——都强制使用。本工具覆盖完整工作流:密钥对生成、含 SM3 摘要的签名、验签,以及标准 C1C3C2 密文顺序的加解密。",
        "粘贴自己的密钥或一键生成全新密钥对(私钥 64 位十六进制,公钥 130 位十六进制、04 非压缩点前缀)。每次签名与加密都按标准引入全新随机 k,输出每次不同——验签与解密不受影响,且免于\"确定性签名被拒\"的麻烦。",
        "SM2 密钥属于 SM2 曲线:不是 ECDSA(P-256)或 RSA 密钥,反之亦然。全部由本机 sm-crypto 库完成——私钥不会离开此标签页,设计上无服务端托管。",
      ],
      steps: [
        "生成密钥对或粘贴自己的(私钥 64 位、公钥 130 位十六进制)。",
        "签名消息并验签——或用公钥加密、私钥解密。",
        "复制签名或密文;非法密钥格式会被拒绝并给出明确预期。",
      ],
      faqs: [
        {
          q: "SM2 密钥能用于 ECDSA 或 RSA 吗?",
          a: "不能。SM2 使用自己的曲线与签名方案,与 ECDSA(P-256)和 RSA 完全分离。以标准算法验签的对方无法读取 SM2 签名,反之亦然——只在要求 SM2 的流程中使用,典型是中国标准或 GM/T 集成。",
        },
        {
          q: "同一消息的签名为什么每次都不同?",
          a: "SM2 在每次签名时引入全新随机数 k——这是标准的安全要求(k 复用会泄露私钥)。结果签名每次不同但有效性完全相同;部分验证规范正是因为这个理由拒绝确定性签名方案。",
        },
      ],
    },
    ja: {
      name: "SM2 鍵ペア・署名・暗号化",
      tagline:
        "SM2 鍵ペアの生成、署名と検証、暗号化と復号を一括 — 中国国家標準の楕円曲線アルゴリズム(GB/T 32918-2016)、SM3 ハッシュ署名と C1C3C2 暗号。無料・プライベート・オフライン。",
      intro: [
        "SM2 は中国商用暗号スイートの楕円曲線アルゴリズム:国際対応は ECDSA で、中国標準ワークフローが非対称プリミティブを要求する場面 — 政府・金融・電子印章・GM/T プロトコルスタック — で必須です。本ツールは完全なワークフローを網羅:鍵ペア生成、SM3 ハッシュ付き署名、署名検証、標準の C1C3C2 暗号文順での暗号化・復号。",
        "自分の鍵を貼り付けるか、ワンクリックで新しいペアを生成(秘密鍵 64 桁十六進、公開鍵 04 非圧縮点プレフィックス付き 130 桁)。署名と暗号のたびに標準に従い新しいランダム k が導入されるため出力は毎回変わります — 検証と復号は常に有効で、決定論的署名の拒否問題もありません。",
        "SM2 鍵は SM2 曲線の鍵です:ECDSA(P-256)や RSA の鍵ではなく、その逆も同様です。すべて sm-crypto ライブラリでローカル実行 — 秘密鍵はこのタブから出ず、サーバー側保管はありません。",
      ],
      steps: [
        "鍵ペアを生成するか、自分の鍵(秘密 64 桁、公開 130 桁十六進)を貼り付けます。",
        "メッセージに署名して検証 — または公開鍵で暗号化、秘密鍵で復号します。",
        "署名や暗号文をコピー;不正な鍵形式は期待値とともに拒否されます。",
      ],
      faqs: [
        {
          q: "SM2 鍵は ECDSA や RSA で使えますか?",
          a: "いいえ。SM2 は独自の曲線と署名スキームを持ち、ECDSA(P-256)や RSA とは完全に分離されています。標準アルゴリズムで検証する相手は SM2 署名を読めず、その逆もまた然り — 中国標準や GM/T 統合など、SM2 を要求するワークフローでのみ使用してください。",
        },
        {
          q: "同じメッセージなのに署名が毎回変わるのはなぜ?",
          a: "SM2 は署名のたびに新しい乱数 k を導入します — 標準のセキュリティ要件(k の再利用は秘密鍵を漏洩)です。結果の署名は毎回異なりますが有効性は同等で、一部の検証規格はまさにこの理由で決定論的署名を拒否しています。",
        },
      ],
    },
    es: {
      name: "SM2 Par de claves, firma y cifrado",
      tagline:
        "Genere pares de claves SM2, firme/verifique mensajes y cifre/descifre — el algoritmo de curva elíptica del estándar nacional chino (GB/T 32918-2016), con firmas SM3 y cifrado C1C3C2. Gratis, privado, sin conexión.",
      intro: [
        "SM2 es el algoritmo de curva elíptica del conjunto de criptografía comercial chino: juega el papel que ECDSA juega internacionalmente y es obligatorio donde los flujos de estándar chino exigen una primitiva asimétrica — gobierno, finanzas, sellos electrónicos y pilas GM/T. Esta herramienta cubre el flujo completo: generación de pares de claves, firma con hash SM3, verificación de firmas y cifrado/descifrado en el orden C1C3C2 del estándar.",
        "Pegue sus propias claves o genere un par nuevo con un clic (privada de 64 caracteres hex, pública de 130 con el prefijo de punto no comprimido 04). Cada firma y cifrado introduce un k aleatorio nuevo según el estándar, así que las salidas difieren cada vez — la verificación y el descifrado siguen siendo válidos, y desaparecen los rechazos por firmas deterministas.",
        "Las claves SM2 pertenecen a la curva SM2: no son claves ECDSA (P-256) ni RSA, y viceversa. Todo se ejecuta localmente con la librería sm-crypto — la clave privada nunca sale de esta pestaña y no hay custodia en servidor.",
      ],
      steps: [
        "Genere un par de claves o pegue el suyo (privada 64 hex, pública 130 hex).",
        "Firme un mensaje y verifíquelo — o cifre con la clave pública y descifre con la privada.",
        "Copie la firma o el cifrado; los formatos de clave no válidos se rechazan indicando la expectativa exacta.",
      ],
      faqs: [
        {
          q: "¿Funcionan las claves SM2 con ECDSA o RSA?",
          a: "No. SM2 usa su propia curva y su propio esquema de firma, completamente separados de ECDSA (P-256) y RSA. Una contraparte que verifique con algoritmos estándar no puede leer firmas SM2, y viceversa — use SM2 solo en flujos que lo exijan, típicamente integraciones de estándar chino o GM/T.",
        },
        {
          q: "¿Por qué la firma es diferente cada vez para el mismo mensaje?",
          a: "SM2 introduce un número aleatorio k nuevo en cada operación de firma — un requisito de seguridad del estándar (la reutilización de k filtra la clave privada). La firma resultante difiere cada vez pero es igualmente válida; algunas normas de verificación rechazan los esquemas de firma deterministas precisamente por esta razón.",
        },
      ],
    },
    pt: {
      name: "SM2 Par de chaves, assinatura e cifragem",
      tagline:
        "Gere pares de chaves SM2, assine/verifique mensagens e cifre/decifre — o algoritmo de curva elíptica do padrão nacional chinês (GB/T 32918-2016), com assinaturas SM3 e cifragem C1C3C2. Grátis, privado, offline.",
      intro: [
        "SM2 é o algoritmo de curva elíptica do conjunto de criptografia comercial chinês: desempenha o papel que o ECDSA desempenha internacionalmente e é obrigatório onde os fluxos de padrão chinês exigem uma primitiva assimétrica — governo, finanças, selos eletrônicos e pilhas GM/T. Esta ferramenta cobre o fluxo completo: geração de pares de chaves, assinatura com hashing SM3, verificação de assinaturas e cifragem/decifragem na ordem C1C3C2 do padrão.",
        "Cole seus próprios pares de chaves (privada 64 hex, pública 130 hex com o prefixo de ponto não comprimido 04) ou gere um novo com um clique. Cada assinatura e cifragem introduz um k aleatório novo conforme o padrão, então as saídas diferem a cada vez — a verificação e a decifragem continuam válidas, e as rejeições por assinaturas deterministas desaparecem.",
        "As chaves SM2 pertencem à curva SM2: não são chaves ECDSA (P-256) nem RSA, e o inverso também vale. Tudo roda localmente com a biblioteca sm-crypto — a chave privada nunca sai desta aba e não há custódia em servidor.",
      ],
      steps: [
        "Gere um par de chaves ou cole o seu (privada 64 hex, pública 130 hex).",
        "Assine uma mensagem e verifique — ou cifre com a chave pública e decifre com a privada.",
        "Copie a assinatura ou o cifrado; formatos de chave inválidos são rejeitados com a expectativa exata informada.",
      ],
      faqs: [
        {
          q: "Chaves SM2 funcionam com ECDSA ou RSA?",
          a: "Não. O SM2 usa sua própria curva e seu próprio esquema de assinatura, totalmente separados do ECDSA (P-256) e RSA. Uma contraparte que verifica com algoritmos padrão não consegue ler assinaturas SM2, e vice-versa — use SM2 apenas em fluxos que o exijam, tipicamente integrações de padrão chinês ou GM/T.",
        },
        {
          q: "Por que a assinatura é diferente a cada vez para a mesma mensagem?",
          a: "O SM2 introduz um número aleatório k novo em cada operação de assinatura — um requisito de segurança do padrão (reutilizar k vaza a chave privada). A assinatura resultante difere a cada vez mas permanece igualmente válida; algumas normas de verificação rejeitam esquemas de assinatura determinísticos precisamente por esta razão.",
        },
      ],
    },
  },
});
