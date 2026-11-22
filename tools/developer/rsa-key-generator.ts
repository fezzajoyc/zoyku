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
    },
  },
});
