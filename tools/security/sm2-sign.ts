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
      deepDive: [
        {
          heading: "The SM2 curve, the Z-value, and why C1C3C2 order matters",
          paragraphs: [
            "SM2 runs on a 256-bit prime-field curve with its own a and b constants — deliberately distinct from NIST P-256, which is why the two are incompatible at every layer. Signing hashes the message with SM3 first, and the hash input includes a Z-value: a hash of the signer's user ID (the standard defaults to the 16-byte ID 1234567812345678) concatenated with the public key coordinates. This binds every signature to a specific identity — two different user IDs produce different signatures for the same message and key.",
            "The ciphertext order was a real interoperability wound: the 2010 draft GM/T standard specified C1C2C3, while GB/T 32918-2016 mandates C1C3C2 (ciphertext point, hash, data). Implementations from the draft era decrypt differently from the final standard, and a payload that fails to decrypt across two tools is very often this ordering. This page uses the final standard order and states it explicitly.",
            "The 04 prefix on the public key is the SEC1 uncompressed-point marker: X coordinates (32 bytes) followed by Y coordinates (32 bytes). Some tools expect the raw X‖Y without the prefix — stripping or adding it is a format conversion, not a different key.",
          ],
        },
        {
          heading: "The k-reuse catastrophe, in concrete terms",
          paragraphs: [
            "Every SM2 signature and encryption draws a fresh random scalar k. If the same k is ever used twice with the same private key, the private key can be computed from the two outputs — this is exactly how the Sony PS3 signing key was extracted from ECDSA in 2010, and why Android wallet Bitcoin keys leaked in 2013. The standard rejects deterministic-k schemes for signatures precisely so implementations cannot accidentally repeat k.",
            "This page derives k from the browser's cryptographic random number generator per operation. Any deterministic-k SM2 implementation must hash the private key and the message into k — a construction that requires deliberate care and is easy to get subtly wrong; audit such implementations against known vectors before trusting them.",
            "For encryption, the k-reuse leak takes a different shape: the same k under the same public key produces identical C1 blocks, which reveals that two messages were encrypted with the same randomness — a traffic-analysis leak even before any algebraic attack.",
          ],
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
      deepDive: [
        {
          heading: "SM2 曲线、Z 值,以及 C1C3C2 顺序为什么重要",
          paragraphs: [
            "SM2 运行在 256 位素数域曲线上,a、b 常数刻意区别于 NIST P-256——这就是两者在每一层都不兼容的原因。签名先用 SM3 哈希消息,且哈希输入包含 Z 值:签名者用户 ID(标准默认 16 字节 ID 1234567812345678)与公钥坐标拼接后的哈希。这把每个签名绑定到特定身份——不同用户 ID 对同一消息同一密钥产生不同签名。",
            "密文顺序是一段真实的互操作伤史:2010 年草案 GM/T 规范写的是 C1C2C3,而 GB/T 32918-2016 强制 C1C3C2(密文点、哈希、数据)。草案时代的实现在解密时与最终标准不同,两个工具之间解密失败非常常见的原因就是这个顺序。本页使用最终标准顺序并明确标注。",
            "公钥开头的 04 是 SEC1 非压缩点标记:先 32 字节 X 坐标、后 32 字节 Y 坐标。有些工具期望不带前缀的裸 X‖Y——增删前缀只是格式转换,不是不同的密钥。",
          ],
        },
        {
          heading: "k 复用灾难,具体来说",
          paragraphs: [
            "SM2 的每次签名与加密都抽取全新的随机标量 k。同一私钥下同一个 k 只要用两次,私钥就能从两个输出中被计算出来——2010 年索尼 PS3 签名密钥正是这样从 ECDSA 中被提取的,2013 年安卓钱包比特币密钥泄露同源。标准对签名拒绝确定性 k 方案,正是防止实现不小心重复 k。",
            "本页的 k 每次运算都来自浏览器的密码学随机数发生器。任何确定性 k 的 SM2 实现必须把私钥与消息哈希进 k——这个构造需要刻意的细心,而且容易出错得很微妙;信任此类实现之前,请对照已知向量审计。",
            "加密方向的 k 复用泄露形态不同:同一公钥下相同 k 产生相同的 C1 块,暴露两条消息用了同一随机数——在任何代数攻击之前,这就是一次流量分析泄露。",
          ],
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
      deepDive: [
        {
          heading: "SM2 曲線、Z 値、そして C1C3C2 順序が重要な理由",
          paragraphs: [
            "SM2 は 256 ビット素体曲線上で動作し、a と b の定数が NIST P-256 とは意図的に異なります — だから両者はあらゆる層で互換しません。署名はまずメッセージを SM3 でハッシュし、ハッシュ入力には Z 値を含みます:署名者のユーザー ID(標準デフォルトは 16 バイトの ID 1234567812345678)と公開鍵座標を連結したハッシュです。これによりすべての署名は特定の ID に紐づきます — 異なるユーザー ID は同じメッセージ・同じ鍵でも異なる署名を生みます。",
            "暗号文の順序は実際の相互運用傷です:2010 年草案 GM/T 規格は C1C2C3 を規定し、GB/T 32918-2016 は C1C3C2(暗号文点、ハッシュ、データ)を義務付けます。草案時代の実装は最終標準と復号が異なり、二つのツール間で復号に失敗するペイロードの多くはこの順序です。本ページは最終標準の順序を使用し明示しています。",
            "公開鍵の 04 接頭辞は SEC1 非圧縮点マーカーです:X 座標(32 バイト)に Y 座標(32 バイト)が続きます。生の X‖Y を期待するツールもあり — 接頭辞の追加・除去はフォーマット変換であって、別の鍵ではありません。",
          ],
        },
        {
          heading: "k 再利用の惨事、具体的に",
          paragraphs: [
            "SM2 の毎回の署名と暗号化は新しいランダム スカラー k を引きます。同じ秘密鍵で同じ k を二度使うと、二つの出力から秘密鍵が計算できてしまいます — 2010 年にソニー PS3 の署名鍵が ECDSA から抽出されたのはまさにこれであり、2013 年の Android ウォレット Bitcoin 鍵漏洩も同源です。標準が署名で決定論的 k スキームを拒否するのは、実装が誤って k を繰り返さないようにするためです。",
            "本ページの k はブラウザの暗号ランダム生成器から毎回取得します。決定論的 k の SM2 実装は秘密鍵とメッセージを k へハッシュしなければならず、この構造は注意深い設計を要求し、微妙に間違えやすいです — 信頼する前に既知ベクトルに対して監査してください。",
            "暗号化での k 再利用の漏洩は別の形になります:同じ公開鍵で同じ k は同一の C1 ブロックを生み、二つのメッセージが同じランダム性で暗号化されたことを暴露します — 代数的攻撃の前のトラフィック分析漏洩です。",
          ],
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
      deepDive: [
        {
          heading: "La curva SM2, el valor Z, y por qué importa el orden C1C3C2",
          paragraphs: [
            "SM2 corre sobre una curva de cuerpo primo de 256 bits con sus propias constantes a y b — deliberadamente distintas de NIST P-256, razón por la que los dos son incompatibles en cada capa. La firma primero calcula el hash del mensaje con SM3, y la entrada del hash incluye un valor Z: un hash del ID de usuario del firmante (el estándar usa por defecto el ID de 16 bytes 1234567812345678) concatenado con las coordenadas de la clave pública. Esto vincula cada firma a una identidad específica — dos ID distintos producen firmas distintas para el mismo mensaje y clave.",
            "El orden del cifrado fue una herida real de interoperabilidad: el borrador GM/T de 2010 especificaba C1C2C3, mientras GB/T 32918-2016 exige C1C3C2 (punto de cifrado, hash, datos). Las implementaciones de la era del borrador descifran diferente del estándar final, y una carga que no descifra entre dos herramientas es muy a menudo este orden. Esta página usa el orden final del estándar y lo declara explícitamente.",
            "El prefijo 04 de la clave pública es el marcador de punto no comprimido SEC1: coordenada X (32 bytes) seguida de Y (32 bytes). Algunas herramientas esperan el X‖Y crudo sin el prefijo — quitarlo o añadirlo es una conversión de formato, no una clave diferente.",
          ],
        },
        {
          heading: "La catástrofe de la reutilización de k, en términos concretos",
          paragraphs: [
            "Cada firma y cifrado SM2 extrae un escalar aleatorio k fresco. Si el mismo k se usa dos veces con la misma clave privada, la clave privada puede calcularse a partir de las dos salidas — exactamente así se extrajo la clave de firma de Sony PS3 de ECDSA en 2010, y por eso las claves Bitcoin de carteras Android se filtraron en 2013. El estándar rechaza los esquemas de k determinista para firmas precisamente para que las implementaciones no repitan k accidentalmente.",
            "Esta página deriva k del generador aleatorio criptográfico del navegador por operación. Cualquier implementación SM2 de k determinista debe hacer el hash de la clave privada y el mensaje en k — una construcción que requiere cuidado deliberado y es fácil de equivocar sutilmente; audite dichas implementaciones contra vectores conocidos antes de confiar en ellas.",
            "Para el cifrado, la fuga por reutilización de k toma otra forma: el mismo k bajo la misma clave pública produce bloques C1 idénticos, lo que revela que dos mensajes se cifraron con la misma aleatoriedad — una fuga de análisis de tráfico incluso antes de cualquier ataque algebraico.",
          ],
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
      deepDive: [
        {
          heading: "A curva SM2, o valor Z, e por que a ordem C1C3C2 importa",
          paragraphs: [
            "O SM2 roda sobre uma curva de corpo primo de 256 bits com suas próprias constantes a e b — deliberadamente distintas de NIST P-256, razão pela qual os dois são incompatíveis em cada camada. A assinatura primeiro faz o hash da mensagem com SM3, e a entrada do hash inclui um valor Z: um hash do ID de usuário do signatário (o padrão usa por padrão o ID de 16 bytes 1234567812345678) concatenado com as coordenadas da chave pública. Isso vincula cada assinatura a uma identidade específica — dois IDs diferentes produzem assinaturas diferentes para a mesma mensagem e chave.",
            "A ordem do cifrado foi uma ferida real de interoperabilidade: o rascunho GM/T de 2010 especificava C1C2C3, enquanto a GB/T 32918-2016 exige C1C3C2 (ponto de cifrado, hash, dados). Implementações da era do rascunho decifram diferente do padrão final, e uma carga que não decifra entre duas ferramentas é muito frequentemente essa ordem. Esta página usa a ordem final do padrão e a declara explicitamente.",
            "O prefixo 04 da chave pública é o marcador de ponto não comprimido SEC1: coordenada X (32 bytes) seguida de Y (32 bytes). Algumas ferramentas esperam o X‖Y cru sem o prefixo — remover ou adicionar é uma conversão de formato, não uma chave diferente.",
          ],
        },
        {
          heading: "A catástrofe da reutilização de k, em termos concretos",
          paragraphs: [
            "Cada assinatura e cifragem SM2 sorteia um escalar aleatório k novo. Se o mesmo k for usado duas vezes com a mesma chave privada, a chave privada pode ser calculada a partir das duas saídas — exatamente assim a chave de assinatura do Sony PS3 foi extraída do ECDSA em 2010, e por isso as chaves Bitcoin de carteiras Android vazaram em 2013. O padrão rejeita esquemas de k determinístico para assinaturas precisamente para que implementações não repitam k acidentalmente.",
            "Esta página deriva k do gerador aleatório criptográfico do navegador por operação. Qualquer implementação SM2 de k determinístico deve fazer o hash da chave privada e da mensagem em k — uma construção que exige cuidado deliberado e é fácil de errar sutilmente; audite tais implementações contra vetores conhecidos antes de confiar nelas.",
            "Para cifragem, o vazamento por reutilização de k toma outra forma: o mesmo k sob a mesma chave pública produz blocos C1 idênticos, o que revela que duas mensagens foram cifradas com a mesma aleatoriedade — um vazamento de análise de tráfego mesmo antes de qualquer ataque algébrico.",
          ],
        },
      ],
    },
  },
});
