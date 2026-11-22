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
      deepDive: [
        {
          heading: "Inside SM4 — and why the ECB image silhouette is the textbook warning",
          paragraphs: [
            "SM4 runs 32 rounds of an unbalanced Feistel-style network over 128-bit blocks, with an S-box whose affine-over-GF(2⁸) construction is published in the standard, and round keys expanded from FK and CK constants. The published Appendix A vector (key = plaintext = 0123456789abcdeffedcba9876543210 → 681edf34d206965e86b3e94f536e4246) is the standard acceptance test — this implementation reproduces it exactly.",
            "ECB's danger is easiest to see with images: encrypting a bitmap in ECB keeps identical input blocks mapping to identical output blocks, so large uniform regions produce a visible silhouette of the original in the ciphertext. The same leakage applies to structured text — repeated records encrypt identically. That is why this page defaults to nothing less than an explicit choice, and why the note steers multi-block data toward CBC.",
            "CBC requires an unpredictable IV — a predictable IV in CBC lets an attacker flip bits of the FIRST block undetected (the rest decrypt fine). If your IV derives from a counter a peer can guess, use the previous ciphertext block as the IV instead, or move to a design with authenticated modes.",
          ],
        },
        {
          heading: "The no-authentication note, and the HMAC-SM3 pairing",
          paragraphs: [
            "Neither ECB nor CBC detects tampering: flipping ciphertext bytes changes the decrypted output in those positions without any error at decryption time. The Chinese standard's authenticated construction layers HMAC-SM3 over SM4 — compute HMAC-SM3 of the ciphertext with a separate key, ship both, and verify before decrypting. Verify-then-decrypt is the safe order; decrypt-then-verify processes attacker-controlled data with your key before knowing it is authentic.",
            "The reason SM4 has no native GCM-style mode in the standard is historical: GM/T specifications predate the wide adoption of GCM and define the composition manually. Some newer Chinese standards are moving toward SM4-GCM constructions, but interop today still means SM4 + HMAC-SM3.",
            "A practical workflow for tamper-safe SM4 exchange: encrypt with SM4-CBC under key A, compute HMAC-SM3 of the ciphertext under key B (never the same key), Base64 both, and have the receiver verify the MAC before touching the ciphertext. This page computes the SM4 half; the HMAC-SM3 half runs in the companion HMAC tool with the SM3 algorithm.",
          ],
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
      deepDive: [
        {
          heading: "SM4 内部结构,以及 ECB 图像剪影这个教科书级警告",
          paragraphs: [
            "SM4 对 128 位分组执行 32 轮非平衡 Feistel 型网络,S 盒的 GF(2⁸) 仿射构造在标准里公开,轮密钥由 FK 与 CK 常量扩展。附录 A 发布向量(密钥=明文=0123456789abcdeffedcba9876543210 → 681edf34d206965e86b3e94f536e4246)是标准的验收测试——本实现精确复现它。",
            "ECB 的危险在图像上最直观:用 ECB 加密位图,相同输入块映射到相同输出块,大片均匀区域在密文里显出原图的剪影。同样的泄露也适用于结构化文本——重复记录的密文完全一致。这就是本页连默认值都不给、要求用户显式选择模式的原因,也是提示把多块数据导向 CBC 的原因。",
            "CBC 要求 IV 不可预测——CBC 里可预测的 IV 会让攻击者不被察觉地翻转第一个块的位(其余块解密正常)。如果你的 IV 来自对方可猜测的计数器,改用上一个密文块当 IV,或换用带认证模式的设计。",
          ],
        },
        {
          heading: "无认证披露,以及 HMAC-SM3 的配对工作流",
          paragraphs: [
            "ECB 与 CBC 都不能检测篡改:翻转密文字节只会改变解密输出对应位置的内容,解密过程不报任何错。中国标准体系的认证构造是在 SM4 上叠加 HMAC-SM3——用另一把密钥对密文计算 HMAC-SM3、随密文一起传输、解密前先验证。先验证后解密是安全顺序;先解密后验证等于在确认真实性之前就拿自己的密钥处理攻击者的数据。",
            "SM4 在标准里没有原生 GCM 式模式的原因是历史性的:GM/T 规范早于 GCM 的普及,认证组合靠手工定义。部分较新的中国标准正转向 SM4-GCM 构造,但今天的互操作仍然意味着 SM4 + HMAC-SM3。",
            "防篡改 SM4 交换的实用流程:用密钥 A 做 SM4-CBC 加密,用密钥 B(绝不同钥)对密文计算 HMAC-SM3,两者一起 Base64,接收方先验 MAC 再碰密文。本页完成 SM4 半边;HMAC-SM3 半边在配套的 HMAC 工具里用 SM3 算法完成。",
          ],
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
      deepDive: [
        {
          heading: "SM4 の内部構造、そして ECB 画像シルエットという教科書的警告",
          paragraphs: [
            "SM4 は 128 ビットブロックに対して 32 ラウンドの非平衡 Feistel 型ネットワークを実行し、S ボックスの GF(2⁸) 上のアフィン構造は標準に公開され、ラウンド鍵は FK と CK 定数から拡張されます。附属書 A の公開ベクトル(鍵=平文=0123456789abcdeffedcba9876543210 → 681edf34d206965e86b3e94f536e4246)が標準の受け入れテスト — 本実装はそれを正確に再現します。",
            "ECB の危険性が最も分かりやすいのは画像です:ビットマップを ECB で暗号化すると、同一の入力ブロックが同一の出力ブロックに対応し続け、均一な領域が暗号文に元画像のシルエットとして現れます。同じ漏洩は構造化テキストにも当てはまり — 繰り返しレコードは同一に暗号化されます。だから本ページはデフォルト値すら設定せず明示的な選択を求め、複数ブロックデータは CBC へ誘導するのです。",
            "CBC は予測不可能な IV を要求します — CBC で予測可能な IV があると、攻撃者は最初のブロックのビットを検出されずに反転できます(残りは正常に復号)。IV が相手に推測できるカウンタから派生するなら、前の暗号文ブロックを IV にするか、認証付きモードの設計へ移行してください。",
          ],
        },
        {
          heading: "認証なしの開示、および HMAC-SM3 とのペアリング",
          paragraphs: [
            "ECB も CBC も改ざんを検出しません:暗号文のバイトを反転すると、対応する位置の復号出力が変わり、復号時に何もエラーが出ません。中国標準体系の認証構造は SM4 の上に HMAC-SM3 を重ねます — 別の鍵で暗号文の HMAC-SM3 を計算し、両方を送り、復号前に検証。検証してから復号が安全な順序です;復号してから検証は、本物か分からないデータを自分の鍵で処理することになります。",
            "SM4 に標準で GCM 型モードがないのは歴史的理由です:GM/T 規格は GCM の普及より前で、認証構成は手作業で定義されます。新しい中国標準の一部は SM4-GCM 構造へ移行しつつありますが、今日の相互運用は依然 SM4 + HMAC-SM3 を意味します。",
            "改ざん安全な SM4 交換の実務フロー:鍵 A で SM4-CBC 暗号化、別の鍵 B(絶対に同じ鍵は使わない)で暗号文の HMAC-SM3 を計算、両方を Base64 で送り、受信者は MAC を検証してから暗号文に触れます。本ページは SM4 半分を計算し、HMAC-SM3 半分は付属の HMAC ツールで SM3 アルゴリズムを使って計算できます。",
          ],
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
      deepDive: [
        {
          heading: "Dentro de SM4 — y por qué la silueta de imagen ECB es la advertencia de manual",
          paragraphs: [
            "SM4 ejecuta 32 rondas de una red estilo Feistel no balanceada sobre bloques de 128 bits, con una S-box cuya construcción afín sobre GF(2⁸) está publicada en el estándar, y claves de ronda expandidas desde las constantes FK y CK. El vector del Anexo A publicado (clave = texto = 0123456789abcdeffedcba9876543210 → 681edf34d206965e86b3e94f536e4246) es la prueba de aceptación del estándar — esta implementación lo reproduce exactamente.",
            "El peligro de ECB es más fácil de ver con imágenes: cifrar un mapa de bits en ECB mantiene que bloques de entrada idénticos correspondan a bloques de salida idénticos, así que las regiones uniformes grandes producen una silueta visible del original en el cifrado. La misma fuga aplica a texto estructurado — los registros repetidos se cifran idénticamente. Por eso esta página ni siquiera tiene un valor por defecto y pide una elección explícita, y por qué la nota dirige los datos de varios bloques hacia CBC.",
            "CBC requiere un IV impredecible — un IV predecible en CBC permite a un atacante voltear bits del PRIMER bloque sin ser detectado (el resto descifra bien). Si su IV se deriva de un contador que un tercero puede adivinar, use el bloque de cifrado anterior como IV, o pase a un diseño con modos autenticados.",
          ],
        },
        {
          heading: "La nota de no-autenticación, y el emparejamiento con HMAC-SM3",
          paragraphs: [
            "Ni ECB ni CBC detectan manipulaciones: voltear bytes del cifrado cambia la salida descifrada en esas posiciones sin ningún error en el momento del descifrado. La construcción autenticada del estándar chino superpone HMAC-SM3 sobre SM4 — calcule HMAC-SM3 del cifrado con una clave separada, envíe ambos y verifique antes de descifrar. Verificar-antes-de-descifrar es el orden seguro; descifrar-antes-de-verificar procesa datos controlados por el atacante con su clave antes de saber si son auténticos.",
            "La razón de que SM4 no tenga un modo nativo estilo GCM en el estándar es histórica: las especificaciones GM/T preceden a la adopción amplia de GCM y definen la composición manualmente. Algunos estándares chinos más nuevos están migrando hacia construcciones SM4-GCM, pero la interoperabilidad hoy todavía significa SM4 + HMAC-SM3.",
            "Un flujo práctico para intercambio SM4 a prueba de manipulaciones: cifre con SM4-CBC bajo la clave A, calcule HMAC-SM3 del cifrado bajo la clave B (nunca la misma clave), envíe ambos en Base64, y que el receptor verifique el MAC antes de tocar el cifrado. Esta página calcula la mitad SM4; la mitad HMAC-SM3 se ejecuta en la herramienta HMAC complementaria con el algoritmo SM3.",
          ],
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
      deepDive: [
        {
          heading: "Dentro do SM4 — e por que a silhueta de imagem ECB é o aviso de manual",
          paragraphs: [
            "O SM4 executa 32 rodadas de uma rede estilo Feistel não balanceada sobre blocos de 128 bits, com uma S-box cuja construção afim sobre GF(2⁸) está publicada no padrão, e chaves de rodada expandidas das constantes FK e CK. O vetor do Apêndice A publicado (chave = texto = 0123456789abcdeffedcba9876543210 → 681edf34d206965e86b3e94f536e4246) é o teste de aceitação do padrão — esta implementação o reproduz exatamente.",
            "O perigo do ECB é mais fácil de ver com imagens: cifrar um bitmap em ECB mantém blocos de entrada idênticos mapeando para blocos de saída idênticos, então regiões uniformes grandes produzem uma silhueta visível do original no cifrado. O mesmo vazamento se aplica a texto estruturado — registros repetidos cifram identicamente. É por isso que esta página nem tem um padrão e exige uma escolha explícita, e por que a nota direciona dados de múltiplos blocos para CBC.",
            "O CBC exige um IV imprevisível — um IV previsível no CBC permite que um atacante inverta bits do PRIMEIRO bloco sem ser detectado (o resto decifra bem). Se seu IV deriva de um contador que o par pode adivinhar, use o bloco de cifrado anterior como IV, ou passe para um desenho com modos autenticados.",
          ],
        },
        {
          heading: "A nota de sem-autenticação, e o pareamento com HMAC-SM3",
          paragraphs: [
            "Nem ECB nem CBC detectam adulteração: inverter bytes do cifrado muda a saída decifrada nessas posições sem nenhum erro na decifragem. A construção autenticada do padrão chinês sobrepõe HMAC-SM3 sobre SM4 — calcule HMAC-SM3 do cifrado com uma chave separada, envie ambos e verifique antes de decifrar. Verificar-antes-de-decifrar é a ordem segura; decifrar-antes-de-verificar processa dados controlados pelo atacante com sua chave antes de saber se são autênticos.",
            "A razão de o SM4 não ter um modo nativo estilo GCM no padrão é histórica: as especificações GM/T antecedem a adoção ampla do GCM e definem a composição manualmente. Alguns padrões chineses mais novos estão migrando para construções SM4-GCM, mas a interoperabilidade hoje ainda significa SM4 + HMAC-SM3.",
            "Um fluxo prático para troca SM4 segura contra adulteração: cifre com SM4-CBC sob a chave A, calcule HMAC-SM3 do cifrado sob a chave B (nunca a mesma chave), envie ambos em Base64, e o receptor verifique o MAC antes de tocar no cifrado. Esta página calcula a metade SM4; a metade HMAC-SM3 roda na ferramenta HMAC complementar com o algoritmo SM3.",
          ],
        },
      ],
    },
  },
});
