import { DevEngineSm3 } from "../_engines/dev-engine-sm3";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "sm3-hash",
  category: "developer",
  icon: "hash",
  engine: { component: DevEngineSm3 },
  related: ["hash-generator", "crc16-modbus", "hmac-generator", "base64-encoder"],
  copy: {
    en: {
      name: "SM3 Hash Calculator",
      tagline:
        "Compute SM3 (GB/T 32905-2016) digests from text, hex or Base64 input — the Chinese national-standard 256-bit cryptographic hash. Free, private, offline.",
      intro: [
        "SM3 is the cryptographic hash function of the Chinese commercial cryptography standard (国密), defined in GB/T 32905-2016. It produces a 256-bit digest — the same output length as SHA-256 — and is required in Chinese e-signature, e-invoice and government workflows.",
        "Paste your data as UTF-8 text, raw hexadecimal bytes, or Base64. The digest is returned as lowercase hex and Base64, ready to paste into verification forms or cross-check against a signature document.",
        "All hashing runs locally in your browser through the sm-crypto library — no uploads, no tracking. Binary files can be hashed by dropping them into the companion hash tool; this page focuses on the SM3 algorithm itself.",
      ],
      steps: [
        "Choose the input format: text, hex or Base64.",
        "Paste the data whose SM3 digest you need.",
        "Click Compute — the hex and Base64 digests appear below, each with a copy button.",
      ],
      faqs: [
        {
          q: "What is the difference between SM3 and SHA-256?",
          a: "Both produce a 256-bit digest, but they use different compression functions and constants, so digests are not interchangeable. SM3 is mandated by Chinese national standards (GB/T 32905-2016); SHA-256 is the international default. Use whichever your verification counterpart requires.",
        },
        {
          q: "Can I hash a file with SM3 here?",
          a: "This page hashes text, hex and Base64 input directly. For files, convert the file content to Base64 first, or use the general hash tool for streaming file hashing with the SHA family.",
        },
      ],
      deepDive: [
        {
          heading: "Where SM3 sits in the Chinese cryptography suite",
          paragraphs: [
            "SM3 is one third of the core Chinese commercial cryptography trio: SM2 provides elliptic-curve signatures and key exchange, SM4 provides symmetric block encryption, and SM3 provides hashing. All three are standardized in GB/T 32905-2016 (SM3), GB/T 32907-2016 (SM4) and GB/T 32918 (SM2), and they appear together in practical specs such as GB/T 38540 secure e-seals, GM/T 0024 SSL VPNs and the GM/T series for smart cards.",
            "SM3 produces a 256-bit digest — the same length as SHA-256 — which sometimes misleads people into assuming compatibility. The compression functions are completely different, so an SM3 digest of a message cannot be compared against its SHA-256 digest under any circumstances. When a counterparty asks for “the hash”, confirm which algorithm they verified against; compliance reviews (commercial cryptography assessment) in China explicitly check that SM3 is used where the scheme mandates it.",
            "Typical engineering touchpoints: verifying the digest inside SM2-signed documents, HMAC-SM3 for message authentication in GM/T protocols, and key-derivation inputs in legacy smart-card pipelines. This page covers the plain hash; HMAC-SM3 requires keyed WebCrypto-style support that browsers do not ship natively.",
          ],
        },
        {
          heading: "Practical details that trip people up",
          paragraphs: [
            "Encoding consistency dominates real-world mismatches. The same content hashed as UTF-8 text versus Latin-1 bytes produces different digests; the same bytes written as uppercase versus lowercase hex produce the same digest here (case is normalized), but an odd-length hex string is rejected rather than silently zero-padded. Base64 input must use the standard alphabet with correct padding — URL-safe Base64 without “=” padding is intentionally refused so that trailing-byte mistakes cannot slip through.",
            "For files, the safest workflow is: convert the file to Base64 with a byte-exact tool, paste it here in Base64 mode, and compare digests — text copy-paste of binary content always corrupts bytes. Digests quoted in documents produced before the 2016 standard should be treated with suspicion: early SM3 drafts circulated with different padding constants, and a handful of old implementations diverge from the final GB/T 32905-2016 algorithm.",
            "Finally, SM3 digests are lowercase hex by convention in Chinese tooling (this page outputs lowercase) but some government forms expect uppercase — the digest is identical, only the presentation differs, so reformat rather than re-hash when a form rejects your paste.",
          ],
        },
      ],
    },
    zh: {
      name: "SM3 哈希计算",
      tagline:
        "在线计算 SM3(GB/T 32905-2016)摘要——支持文本、十六进制、Base64 输入,输出十六进制与 Base64 双格式。国密哈希标准,免费、即时、离线可用。",
      intro: [
        "SM3 是中国商用密码标准(国密)中的密码杂凑算法,定义于 GB/T 32905-2016,输出 256 位摘要——与 SHA-256 相同长度,是电子签章、电子发票、政务系统等场景的合规要求。",
        "支持三种输入格式:UTF-8 文本、原始十六进制字节、Base64。结果同时给出小写十六进制与 Base64 两种编码,可直接粘贴到校验表单或与签章文件交叉核对。",
        "哈希全部由本机的 sm-crypto 库完成——无需注册、不上传,数据不会离开浏览器。",
      ],
      steps: [
        "选择输入格式:文本、十六进制或 Base64。",
        "粘贴需要计算 SM3 摘要的数据。",
        "点击计算——下方同时显示十六进制与 Base64 摘要,各带一键复制。",
      ],
      faqs: [
        {
          q: "SM3 和 SHA-256 有什么区别?",
          a: "两者都输出 256 位摘要,但压缩函数和常数完全不同,摘要不可互换。SM3 是中国国家标准(GB/T 32905-2016)强制算法,SHA-256 是国际通用算法——按校验对方的要求选择。",
        },
        {
          q: "可以直接计算文件吗?",
          a: "本页支持文本、十六进制、Base64 输入。文件场景可先转 Base64 再粘贴,或使用通用哈希工具对文件做 SHA 系列流式计算。",
        },
      ],
      deepDive: [
        {
          heading: "SM3 在国密体系中的位置",
          paragraphs: [
            "SM3 与 SM2、SM4 构成国密三件套:SM2 负责椭圆曲线签名与密钥交换,SM4 负责对称分组加密,SM3 负责杂凑。三者分别标准化于 GB/T 32905-2016(SM3)、GB/T 32907-2016(SM4)与 GB/T 32918(SM2),并在实际规范中成套出现:GB/T 38540 安全电子签章、GM/T 0024 SSL VPN、以及智能卡方向的 GM/T 系列。",
            "SM3 输出 256 位——与 SHA-256 等长——这让不少人误以为可以互相替换。两者的压缩函数完全不同,同一段消息的 SM3 摘要与 SHA-256 摘要在任何场景下都不可比较。当对方说\"给我哈希值\"时,务必确认其验证用的是哪个算法;商用密码应用安全性评估(密评)会明确检查方案要求 SM3 的地方是否真的用了 SM3。",
            "工程上的常见接触点:SM2 签名文档内部的摘要校验、GM/T 协议里的 HMAC-SM3 消息认证、老智能卡流水线的密钥派生输入。本页覆盖纯哈希;HMAC-SM3 需要带密钥的原语,浏览器原生 crypto 不提供,需引入专门库。",
          ],
        },
        {
          heading: "实际使用中最容易踩的细节",
          paragraphs: [
            "编码一致性是真实校验失败的第一大原因。同一份内容按 UTF-8 文本与按 Latin-1 字节计算会得到不同摘要;十六进制的大小写在本页被归一化(大写小写结果一致),但奇数长度的 hex 会被拒绝而不是静默补零——这是刻意设计,防止尾部字节错误悄悄溜过。Base64 输入必须使用标准字母表与规范填充;不带 \"=\" 的 URL-safe Base64 会被明确拒绝,宁可报错也不放过尾部字节风险。",
            "文件哈希最稳妥的流程是:先用按字节精确的工具把文件转成 Base64,粘贴到本页 Base64 模式,再比对摘要——直接复制粘贴二进制内容一定会损坏字节。2016 年标准发布前文档里引用的摘要要额外小心:早期 SM3 草案流传过不同填充常数,少数老实现与最终 GB/T 32905-2016 不一致,遇到对不上的摘要先核对实现年代。",
            "最后,中文工具链习惯输出小写十六进制(本页即小写),个别政务表单要求大写——摘要本身完全相同,只是表示形式不同,直接转换大小写即可,不需要重新计算。",
          ],
        },
      ],
    },
    ja: {
      name: "SM3 ハッシュ計算",
      tagline:
        "SM3(GB/T 32905-2016)ダイジェストをテキスト・16 進・Base64 入力から計算 — 中国国家標準の 256 ビット暗号ハッシュ。無料・プライベート・オフライン。",
      intro: [
        "SM3 は中国商用暗号標準(国密)の暗号ハッシュ関数で、GB/T 32905-2016 に定義されています。SHA-256 と同じ 256 ビットのダイジェストを生成し、中国の電子署名・電子請求書・政府ワークフローで必須です。",
        "UTF-8 テキスト、生の 16 進バイト、Base64 のいずれかでデータを貼り付けます。ダイジェストは小文字の 16 進と Base64 で返され、検証フォームや署名文書との照合にそのまま使えます。",
        "すべてのハッシュ計算はブラウザ内の sm-crypto ライブラリで行われます — アップロードなし、トラッキングなし。",
      ],
      steps: [
        "入力形式(テキスト、16 進、Base64)を選択します。",
        "SM3 ダイジェストが必要なデータを貼り付けます。",
        "計算ボタンをクリック — 16 進と Base64 のダイジェストが下に表示され、各コピーボタンが付きます。",
      ],
      faqs: [
        {
          q: "SM3 と SHA-256 の違いは?",
          a: "どちらも 256 ビットのダイジェストを生成しますが、圧縮関数と定数が異なるため、ダイジェストは互換ではありません。SM3 は中国の国家標準(GB/T 32905-2016)、SHA-256 は国際標準です。検証先の要件に合わせて選択してください。",
        },
        {
          q: "ファイルをハッシュできますか?",
          a: "このページはテキスト・16 進・Base64 入力を対象にします。ファイルはまず Base64 に変換して貼り付けるか、汎用ハッシュツールで SHA 系のファイルストリーミング計算をご利用ください。",
        },
      ],
      deepDive: [
        {
          heading: "国密体系における SM3 の位置",
          paragraphs: [
            "SM3 は中国商用暗号の中核三兄弟の一つです:SM2 が楕円曲線署名と鍵交換、SM4 が共通鍵ブロック暗号、SM3 がハッシュを担います。それぞれ GB/T 32905-2016(SM3)、GB/T 32907-2016(SM4)、GB/T 32918(SM2)として標準化され、GB/T 38540 電子印章や GM/T 0024 SSL VPN など実務仕様にセットで現れます。",
            "SM3 は 256 ビットのダイジェストを生成します — SHA-256 と同じ長さ — ため互換と誤解されがちです。圧縮関数はまったく異なるため、同一メッセージの SM3 ダイジェストと SHA-256 ダイジェストは比較できません。「ハッシュをください」と言われたら、相手がどのアルゴリズムで検証したか必ず確認してください。商用暗号評価(密評)では、SM3 を要求する箇所で実際に SM3 が使われているかを明示的にチェックします。",
            "エンジニアリング上の接点:SM2 署名文書内のダイジェスト検証、GM/T プロトコルの HMAC-SM3 メッセージ認証、レガシー smart-card パイプラインの鍵導入入力。このページは純粋ハッシュをカバーし、HMAC-SM3 には鍵付きプリミティブが必要でブラウザのネイティブ crypto では提供されません。",
          ],
        },
        {
          heading: "実務でつまずきやすい詳細",
          paragraphs: [
            "エンコーディング整合性が検証失敗の最大の原因です。同じ内容でも UTF-8 テキストとしてと Latin-1 バイトとしてでは異なるダイジェストになります。十六進の大小文字は本ページで正規化され結果は同じですが、奇数長の hex は暗黙のゼロ埋めではなく拒否されます — 末尾バイトのミスを防ぐ意図的な設計です。Base64 入力は標準アルファベットと正しいパディングが必要で、「=」なしの URL-safe Base64 は明確に拒否されます。",
            "ファイルの最も安全なワークフロー:バイト厳密なツールでファイルを Base64 に変換し、本ページの Base64 モードに貼り付けてダイジェスト比較 — バイナリを直接コピーペーストすると必ずバイトが壊れます。2016 年標準以前の文書が引用するダイジェストは要注意:初期の SM3 草案には異なるパディング定数が流通しており、少数の旧実装は最終 GB/T 32905-2016 と一致しません。",
            "最後に、中国のツールチェーンは小文字十六進を出力する慣習があります(本ページも小文字)。一部の政府フォームは大文字を求めます — ダイジェストは同一で表現だけが異なるため、再計算ではなく文字変換で対応してください。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de hash SM3",
      tagline:
        "Calcule digests SM3 (GB/T 32905-2016) desde texto, hexadecimal o Base64 — el estándar nacional chino de hash criptográfico de 256 bits. Gratis, privado, sin conexión.",
      intro: [
        "SM3 es la función hash criptográfica del estándar chino de criptografía comercial (国密), definida en GB/T 32905-2016. Produce un resumen de 256 bits — la misma longitud que SHA-256 — y es obligatoria en flujos chinos de firma electrónica, facturación y gobierno.",
        "Pegue sus datos como texto UTF-8, bytes hexadecimales crudos o Base64. El resumen se devuelve en hexadecimal minúscula y Base64, listo para pegar en formularios de verificación.",
        "Todo el cálculo se ejecuta localmente en su navegador con la librería sm-crypto — sin subidas, sin rastreo.",
      ],
      steps: [
        "Elija el formato de entrada: texto, hexadecimal o Base64.",
        "Pegue los datos cuyo digest SM3 necesite.",
        "Haga clic en Calcular — los digests en hex y Base64 aparecen abajo, cada uno con botón de copia.",
      ],
      faqs: [
        {
          q: "¿Cuál es la diferencia entre SM3 y SHA-256?",
          a: "Ambos producen un resumen de 256 bits, pero usan funciones de compresión y constantes distintas, por lo que los digests no son intercambiables. SM3 está exigido por los estándares nacionales chinos (GB/T 32905-2016); SHA-256 es el estándar internacional. Use el que requiera su contraparte de verificación.",
        },
        {
          q: "¿Puedo calcular el hash de un archivo aquí?",
          a: "Esta página calcula texto, hexadecimal y Base64 directamente. Para archivos, convierta el contenido a Base64 primero, o use la herramienta hash general para cálculo de archivos con la familia SHA.",
        },
      ],
      deepDive: [
        {
          heading: "El lugar de SM3 en la suite criptográfica china",
          paragraphs: [
            "SM3 es un tercio del trío central de la criptografía comercial china: SM2 proporciona firmas de curva elíptica e intercambio de claves, SM4 cifrado simétrico en bloques, y SM3 el hashing. Los tres están estandarizados en GB/T 32905-2016 (SM3), GB/T 32907-2016 (SM4) y GB/T 32918 (SM2), y aparecen juntos en especificaciones prácticas como GB/T 38540 sellos electrónicos seguros, GM/T 0024 SSL VPN y la serie GM/T para tarjetas inteligentes.",
            "SM3 produce un resumen de 256 bits — la misma longitud que SHA-256 — lo que a veces induce a asumir compatibilidad. Las funciones de compresión son completamente diferentes, así que el resumen SM3 de un mensaje no puede compararse con su resumen SHA-256 bajo ninguna circunstancia. Cuando la contraparte pide «el hash», confirme contra qué algoritmo verificó; las revisiones de cumplimiento (evaluación de criptografía comercial) comprueban explícitamente que SM3 se use donde el esquema lo exige.",
            "Puntos de contacto típicos de ingeniería: verificar el resumen dentro de documentos firmados con SM2, HMAC-SM3 para autenticación de mensajes en protocolos GM/T, y entradas de derivación de claves en pipelines de tarjetas inteligentes antiguas. Esta página cubre el hash plano; HMAC-SM3 requiere primitivas con clave que los navegadores no incluyen de forma nativa.",
          ],
        },
        {
          heading: "Detalles prácticos donde la gente se tropieza",
          paragraphs: [
            "La consistencia de codificación domina las discrepancias reales. El mismo contenido calculado como texto UTF-8 versus bytes Latin-1 produce resúmenes diferentes; los mismos bytes en hexadecimal mayúscula versus minúscula producen el mismo resumen aquí (se normaliza), pero una cadena hex de longitud impar se rechaza en lugar de rellenarse con ceros silenciosamente — es un diseño deliberado para que los errores de bytes finales no pasen inadvertidos. La entrada Base64 debe usar el alfabeto estándar con relleno correcto — Base64 URL-safe sin «=» se rechaza intencionalmente.",
            "Para archivos, el flujo más seguro es: convertir el archivo a Base64 con una herramienta byte-exacta, pegarlo aquí en modo Base64 y comparar resúmenes — el copiado directo de contenido binario siempre corrompe bytes. Los resúmenes citados en documentos anteriores al estándar de 2016 deben tratarse con cautela: circulaban borradores tempranos de SM3 con constantes de relleno distintas, y un puñado de implementaciones antiguas divergen del algoritmo final GB/T 32905-2016.",
            "Finalmente, los resúmenes SM3 se escriben en hexadecimal minúscula por convención en las herramientas chinas (esta página sale en minúscula), pero algunos formularios gubernamentales esperan mayúscula — el resumen es idéntico, solo cambia la presentación, así que reformatee en lugar de recalcular cuando un formulario rechace su pegado.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de hash SM3",
      tagline:
        "Calcule digests SM3 (GB/T 32905-2016) a partir de texto, hexadecimal ou Base64 — o padrão nacional chinês de hash criptográfico de 256 bits. Grátis, privado, offline.",
      intro: [
        "SM3 é a função hash criptográfica do padrão chinês de criptografia comercial (国密), definida na GB/T 32905-2016. Produz um resumo de 256 bits — o mesmo comprimento do SHA-256 — e é exigida em fluxos chineses de assinatura eletrônica, faturamento e governo.",
        "Cole seus dados como texto UTF-8, bytes hexadecimais brutos ou Base64. O resumo é retornado em hexadecimal minúscula e Base64, pronto para colar em formulários de verificação.",
        "Todo o cálculo é executado localmente no seu navegador pela biblioteca sm-crypto — sem uploads, sem rastreamento.",
      ],
      steps: [
        "Escolha o formato de entrada: texto, hexadecimal ou Base64.",
        "Cole os dados cujo digest SM3 você precisa.",
        "Clique em Calcular — os digests em hex e Base64 aparecem abaixo, cada um com botão de cópia.",
      ],
      faqs: [
        {
          q: "Qual é a diferença entre SM3 e SHA-256?",
          a: "Ambos produzem um resumo de 256 bits, mas usam funções de compressão e constantes diferentes, então os digests não são intercambiáveis. SM3 é exigido pelos padrões nacionais chineses (GB/T 32905-2016); SHA-256 é o padrão internacional. Use o que sua contraparte de verificação exigir.",
        },
        {
          q: "Posso calcular o hash de um arquivo aqui?",
          a: "Esta página calcula texto, hexadecimal e Base64 diretamente. Para arquivos, converta o conteúdo para Base64 primeiro, ou use a ferramenta hash geral para cálculo de arquivos com a família SHA.",
        },
      ],
      deepDive: [
        {
          heading: "O lugar do SM3 no conjunto criptográfico chinês",
          paragraphs: [
            "O SM3 é um terço do trio central da criptografia comercial chinesa: o SM2 fornece assinaturas de curva elíptica e troca de chaves, o SM4 cifração simétrica em blocos, e o SM3 o hashing. Os três são padronizados na GB/T 32905-2016 (SM3), GB/T 32907-2016 (SM4) e GB/T 32918 (SM2), e aparecem juntos em especificações práticas como GB/T 38540 selos eletrônicos seguros, GM/T 0024 SSL VPNs e a série GM/T para smart cards.",
            "O SM3 produz um digest de 256 bits — o mesmo comprimento do SHA-256 — o que às vezes induz a assumir compatibilidade. As funções de compressão são completamente diferentes, então o digest SM3 de uma mensagem não pode ser comparado ao seu digest SHA-256 sob nenhuma circunstância. Quando a contraparte pede \"o hash\", confirme contra qual algoritmo ela verificou; as revisões de conformidade (avaliação de criptografia comercial) verificam explicitamente que o SM3 é usado onde o esquema o exige.",
            "Pontos de contato típicos de engenharia: verificar o digest dentro de documentos assinados com SM2, HMAC-SM3 para autenticação de mensagens em protocolos GM/T, e entradas de derivação de chaves em pipelines de smart cards antigos. Esta página cobre o hash puro; HMAC-SM3 requer primitivas com chave que os navegadores não fornecem nativamente.",
          ],
        },
        {
          heading: "Detalhes práticos que derrubam as pessoas",
          paragraphs: [
            "A consistência de codificação domina as discrepâncias reais. O mesmo conteúdo calculado como texto UTF-8 versus bytes Latin-1 produz digests diferentes; os mesmos bytes em hexadecimal maiúscula versus minúscula produzem o mesmo digest aqui (normalizado), mas uma string hex de comprimento ímpar é rejeitada em vez de preenchida com zeros silenciosamente — é um desenho deliberado para que erros de bytes finais não passem despercebidos. A entrada Base64 deve usar o alfabeto padrão com preenchimento correto — Base64 URL-safe sem \"=\" é recusado intencionalmente.",
            "Para arquivos, o fluxo mais seguro é: converter o arquivo para Base64 com uma ferramenta byte-exata, colar aqui no modo Base64 e comparar digests — copiar e colar conteúdo binário diretamente sempre corrompe bytes. Digests citados em documentos anteriores ao padrão de 2016 merecem cautela: rascunhos iniciais do SM3 circulavam com constantes de preenchimento diferentes, e um punhado de implementações antigas divergem do algoritmo final GB/T 32905-2016.",
            "Por fim, os digests SM3 são hex minúscula por convenção nas ferramentas chinesas (esta página sai em minúscula), mas alguns formulários governamentais esperam maiúscula — o digest é idêntico, apenas a apresentação muda, então reformate em vez de recalcular quando um formulário rejeitar sua colagem.",
          ],
        },
      ],
    },
  },
});
