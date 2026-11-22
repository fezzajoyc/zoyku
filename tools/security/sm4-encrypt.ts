import { DevEngineSm4 } from "../_engines/dev-engine-sm4";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "sm4-encrypt",
  category: "security",
  icon: "lock",
  engine: { component: DevEngineSm4 },
  related: ["sm3-hash", "aes-encrypt", "rsa-key-generator", "hmac-generator"],
  copy: {
    en: {
      name: "SM4 Encrypt & Decrypt",
      tagline:
        "Encrypt and decrypt text with SM4 (GB/T 32907-2016), the Chinese national-standard 128-bit block cipher — ECB and CBC modes, hex keys, spec-vector-validated implementation. Free, private, offline.",
      intro: [
        "SM4 is the symmetric block cipher of the Chinese commercial cryptography suite: 128-bit keys and blocks, the counterpart of SM3 hashing and SM2 signatures. It is mandated in Chinese government, finance and e-seal systems wherever a symmetric cipher is required alongside SM-series asymmetric primitives.",
        "This tool supports ECB and CBC modes with 128-bit hexadecimal keys (CBC adds a 32-hex IV). The implementation follows GB/T 32907-2016 exactly — the standard's Appendix A test vector validates it — and processes UTF-8 text directly, returning hexadecimal ciphertext.",
        "ECB and CBC carry no authentication tag, so a corrupted or tampered ciphertext is not detectable by decryption alone; pair the result with HMAC-SM3 when integrity matters. Everything runs locally with the sm-crypto library — keys and plaintext never leave this tab.",
      ],
      steps: [
        "Choose Encrypt or Decrypt, and the mode (ECB without IV, CBC with a 32-hex IV).",
        "Enter the 128-bit key as 32 hexadecimal characters, and the text — for decryption, paste the hex ciphertext.",
        "Click Run — the result appears below with a copy button; invalid keys, IVs and ciphertext lengths are rejected explicitly.",
      ],
      faqs: [
        {
          q: "SM4 or AES — which should I use?",
          a: "Follow your compliance requirement: Chinese commercial-cryptography schemes (密评, government and e-seal workflows) mandate SM4, while international systems default to AES. Neither is weaker at the same key size; they are simply different ecosystems. Interoperability decides — a counterparty expecting SM4 cannot read your AES payload.",
        },
        {
          q: "Why is there no authentication tag like AES-GCM?",
          a: "SM4 in ECB and CBC modes — the modes this page provides — are confidentiality-only; the Chinese standard's authenticated construction is built on top with HMAC-SM3. If tamper detection matters, compute HMAC-SM3 over the ciphertext with a separate key and verify it before decryption.",
        },
      ],
    },
    zh: {
      name: "SM4 加解密",
      tagline:
        "SM4(GB/T 32907-2016)国密分组密码加解密——ECB/CBC 双模式,128 位十六进制密钥,标准向量验证的实现。免费、即时、离线可用。",
      intro: [
        "SM4 是中国商用密码体系的对称分组密码:128 位密钥与分组,与 SM3 杂凑、SM2 签名配套,是政务、金融与电子签章系统中要求对称算法时的合规选择。",
        "本工具支持 ECB 与 CBC 两种模式,128 位十六进制密钥(CBC 需 32 位十六进制 IV)。实现严格遵循 GB/T 32907-2016——标准附录 A 测试向量已锚定验证——直接处理 UTF-8 文本,输出十六进制密文。",
        "ECB 与 CBC 均不带认证标签,仅凭解密无法检测密文被篡改;完整性敏感场景请配合 HMAC-SM3 使用。全部由本机 sm-crypto 库完成——密钥与明文不会离开此标签页。",
      ],
      steps: [
        "选择加密或解密,以及模式(ECB 无 IV,CBC 需 32 位十六进制 IV)。",
        "输入 128 位密钥(32 位十六进制)与文本——解密时粘贴十六进制密文。",
        "点击执行——结果显示在下方并带复制按钮;非法密钥、IV 与密文长度会被明确拒绝。",
      ],
      faqs: [
        {
          q: "SM4 还是 AES——该用哪个?",
          a: "跟随合规要求:中国商用密码体系(密评、政务与电子签章流程)强制 SM4,国际系统默认 AES。同等密钥长度下没有谁更弱,只是生态不同。互操作决定一切——期望 SM4 的对方读不了你的 AES 载荷。",
        },
        {
          q: "为什么没有像 AES-GCM 那样的认证标签?",
          a: "本页提供的 ECB 与 CBC 模式只做机密性;中国标准体系的认证构造是用 HMAC-SM3 在其上叠加的。如果需要防篡改,请用另一把密钥对密文计算 HMAC-SM3,并在解密前先验证。",
        },
      ],
    },
    ja: {
      name: "SM4 暗号化・復号",
      tagline:
        "SM4(GB/T 32907-2016)、中国国家标准の 128 ビットブロック暗号による暗号化・復号 — ECB/CBC モード、十六進鍵、標準ベクトル検証済みの実装。無料・プライベート・オフライン。",
      intro: [
        "SM4 は中国商用暗号スイートの共通鍵ブロック暗号です:128 ビットの鍵とブロックで、SM3 ハッシュ・SM2 署名の対になる部分であり、対称暗号が求められる中国の政府・金融・電子印章システムで必須です。",
        "本ツールは ECB と CBC モードに対応し、128 ビットの十六進鍵(CBC は 32 桁の十六進 IV を追加)を使用します。実装は GB/T 32907-2016 に厳密に従い — 標準の附属書 A テストベクトルで検証済み — UTF-8 テキストを直接処理して十六進暗号文を返します。",
        "ECB と CBC には認証タグがなく、解密だけでは改ざんを検出できません。整合性が重要な場合は HMAC-SM3 と併用してください。すべて sm-crypto ライブラリでローカル実行 — 鍵と平文はこのタブから出ません。",
      ],
      steps: [
        "暗号化または復号、そしてモードを選択(ECB は IV なし、CBC は 32 桁の十六進 IV)。",
        "128 ビットの鍵を 32 桁の十六進で入力し、テキストを入力 — 復号では十六進暗号文を貼り付けます。",
        "実行をクリック — 結果が下に表示されコピーボタンが付きます。不正な鍵・IV・暗号文長は明確に拒否されます。",
      ],
      faqs: [
        {
          q: "SM4 か AES か — どちらを使うべき?",
          a: "コンプライアンス要件に従います:中国商用暗号スキーム(密評・政府・電子印章ワークフロー)は SM4 を義務付け、国際システムは AES がデフォルトです。同じ鍵長でどちらかが弱いわけではなく、生態系が違うだけです。相互運用性が決め手 — SM4 を期待する相手は AES ペイロードを読めません。",
        },
        {
          q: "AES-GCM のような認証タグがないのはなぜ?",
          a: "本ページが提供する ECB と CBC は機密性のみです。中国標準体系の認証構造は HMAC-SM3 をその上に重ねて構築されます。改ざん検出が重要なら、別の鍵で暗号文の HMAC-SM3 を計算し、復号前に検証してください。",
        },
      ],
    },
    es: {
      name: "Cifrado y descifrado SM4",
      tagline:
        "Cifre y descifre texto con SM4 (GB/T 32907-2016), el cifrador en bloques de 128 bits del estándar nacional chino — modos ECB y CBC, claves hex, implementación validada con el vector del estándar. Gratis, privado, sin conexión.",
      intro: [
        "SM4 es el cifrador en bloques simétrico del conjunto de criptografía comercial chino: claves y bloques de 128 bits, la contraparte del hashing SM3 y las firmas SM2. Es obligatorio en sistemas chinos de gobierno, finanzas y sellos electrónicos donde se requiere un cifrador simétrico junto a las primitivas asimétricas de la serie SM.",
        "Esta herramienta admite los modos ECB y CBC con claves hexadecimales de 128 bits (CBC añade un IV de 32 hex). La implementación sigue GB/T 32907-2016 exactamente — el vector de prueba del Anexo A del estándar la valida — y procesa texto UTF-8 directamente, devolviendo cifrado hexadecimal.",
        "ECB y CBC no llevan etiqueta de autenticación, así que un cifrado dañado o manipulado no es detectable solo al descifrar; emparéjele con HMAC-SM3 cuando la integridad importe. Todo se ejecuta localmente con la librería sm-crypto — las claves y el texto en claro nunca salen de esta pestaña.",
      ],
      steps: [
        "Elija Cifrar o Descifrar, y el modo (ECB sin IV, CBC con un IV de 32 hex).",
        "Introduzca la clave de 128 bits como 32 caracteres hexadecimales, y el texto — para descifrar, pegue el cifrado hexadecimal.",
        "Haga clic en Ejecutar — el resultado aparece abajo con botón de copia; claves, IV y longitudes no válidos se rechazan explícitamente.",
      ],
      faqs: [
        {
          q: "¿SM4 o AES — cuál debo usar?",
          a: "Siga su requisito de cumplimiento: los esquemas chinos de criptografía comercial (evaluación, gobierno y flujos de sello electrónico) exigen SM4, mientras los sistemas internacionales usan AES por defecto. Ninguno es más débil con el mismo tamaño de clave; son simplemente ecosistemas diferentes. La interoperabilidad decide — una contraparte que espera SM4 no puede leer su carga AES.",
        },
        {
          q: "¿Por qué no hay etiqueta de autenticación como en AES-GCM?",
          a: "Los modos ECB y CBC que ofrece esta página son solo de confidencialidad; la construcción autenticada del estándar chino se construye encima con HMAC-SM3. Si importa la detección de manipulaciones, calcule HMAC-SM3 sobre el cifrado con una clave separada y verifíquelo antes de descifrar.",
        },
      ],
    },
    pt: {
      name: "Cifragem e decifragem SM4",
      tagline:
        "Cifre e decifre texto com SM4 (GB/T 32907-2016), a cifra em blocos de 128 bits do padrão nacional chinês — modos ECB e CBC, chaves hex, implementação validada com o vetor do padrão. Grátis, privado, offline.",
      intro: [
        "O SM4 é a cifra em blocos simétrica do conjunto de criptografia comercial chinês: chaves e blocos de 128 bits, a contraparte do hashing SM3 e das assinaturas SM2. É obrigatório em sistemas chineses de governo, finanças e selos eletrônicos onde uma cifra simétrica é exigida junto às primitivas assimétricas da série SM.",
        "Esta ferramenta suporta os modos ECB e CBC com chaves hexadecimais de 128 bits (CBC adiciona um IV de 32 hex). A implementação segue a GB/T 32907-2016 exatamente — o vetor de teste do Anexo A do padrão a valida — e processa texto UTF-8 diretamente, retornando cifrado hexadecimal.",
        "ECB e CBC não têm etiqueta de autenticação, então um cifrado corrompido ou adulterado não é detectável apenas decifrando; combine com HMAC-SM3 quando a integridade importar. Tudo roda localmente com a biblioteca sm-crypto — chaves e texto em claro nunca saem desta aba.",
      ],
      steps: [
        "Escolha Cifrar ou Decifrar, e o modo (ECB sem IV, CBC com um IV de 32 hex).",
        "Digite a chave de 128 bits como 32 caracteres hexadecimais, e o texto — para decifrar, cole o cifrado hexadecimal.",
        "Clique em Executar — o resultado aparece abaixo com botão de cópia; chaves, IVs e comprimentos inválidos são rejeitados explicitamente.",
      ],
      faqs: [
        {
          q: "SM4 ou AES — qual devo usar?",
          a: "Siga seu requisito de conformidade: esquemas chineses de criptografia comercial (avaliação, fluxos de governo e selo eletrônico) exigem SM4, enquanto sistemas internacionais usam AES por padrão. Nenhum é mais fraco no mesmo tamanho de chave; são apenas ecossistemas diferentes. A interoperabilidade decide — uma contraparte esperando SM4 não consegue ler sua carga AES.",
        },
        {
          q: "Por que não há etiqueta de autenticação como no AES-GCM?",
          a: "Os modos ECB e CBC que esta página oferece são apenas de confidencialidade; a construção autenticada do padrão chinês é construída em cima com HMAC-SM3. Se a detecção de adulteração importa, calcule HMAC-SM3 sobre o cifrado com uma chave separada e verifique antes de decifrar.",
        },
      ],
    },
  },
});
