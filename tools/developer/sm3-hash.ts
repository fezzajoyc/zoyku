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
    },
  },
});
