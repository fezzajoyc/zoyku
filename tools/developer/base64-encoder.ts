import { DevEncoderEngine } from "../_engines/dev-engine-encoder";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "base64-encoder",
  category: "developer",
  icon: "swap",
  engine: { component: DevEncoderEngine, props: { codec: "base64-encode" } },
  related: ["base64-decoder", "url-encoder", "hash-generator", "jwt-decoder"],
  copy: {
    en: {
      name: "Base64 Encoder",
      tagline:
        "Encode text to Base64 instantly with full UTF-8 support — emojis, accents and CJK characters survive intact. Free, private, nothing ever leaves your browser.",
      intro: [
        "Type or paste any text and get its Base64 representation live as you type. Encoding is UTF-8 safe via the standard TextEncoder, so multilingual text, emoji and symbols produce exactly the same bytes every programming language's base64 functions produce.",
        "Use it for HTTP Basic Auth headers, data URI prefixes, email attachments on the go, or any API that expects Base64 payloads — no terminal or code snippet needed.",
      ],
      steps: [
        "Paste or type the text you want to encode.",
        "The Base64 output updates live — copy it whenever you are ready.",
        "Paste Base64 back with the linked decoder to round-trip and verify.",
      ],
      faqs: [
        {
          q: "Why does Base64 make my text longer?",
          a: "Base64 represents every 3 bytes as 4 characters, so output is about 33% larger than the input — that is the cost of making binary-safe text.",
        },
        {
          q: "Is Base64 encryption?",
          a: "No. Base64 is an encoding, not encryption — anyone can decode it instantly. Never use it to hide secrets; use real cryptography instead.",
        },
        {
          q: "Are Unicode and emoji supported?",
          a: "Yes. Input is converted to UTF-8 bytes before encoding, which matches what btoa-with-TextEncoder, Python, Java and Node produce for the same string.",
        },
      ],
    },
    zh: {
      name: "Base64 编码",
      tagline: "在线把文本编码为 Base64,完整支持 UTF-8——emoji、重音符号、中日韩文字都不会损坏。免费、私密、数据不出浏览器。",
      intro: [
        "输入或粘贴任意文本,Base64 结果随输入实时刷新。编码通过标准 TextEncoder 做到 UTF-8 安全,多语言文本、emoji 和符号的结果与各种编程语言的 base64 函数完全一致。",
        "适合构造 HTTP Basic Auth 头、data URI 前缀、邮件附件,或任何需要 Base64 负载的 API——不用再翻终端或代码片段。",
      ],
      steps: [
        "粘贴或输入要编码的文本。",
        "Base64 输出实时更新,随时复制。",
        "用配套的解码器把 Base64 解回来,验证往返一致。",
      ],
      faqs: [
        {
          q: "为什么 Base64 会让文本变长?",
          a: "Base64 把每 3 个字节表示成 4 个字符,输出大约比输入长 33%——这是换取二进制安全文本的代价。",
        },
        {
          q: "Base64 是加密吗?",
          a: "不是。Base64 是编码不是加密——任何人都能立即解开。别用它藏秘密,请使用真正的加密算法。",
        },
        {
          q: "支持 Unicode 和 emoji 吗?",
          a: "支持。输入会先转成 UTF-8 字节再编码,与 Python、Java、Node 等对同一字符串的 base64 结果完全一致。",
        },
      ],
    },
    ja: {
      name: "Base64 エンコーダー",
      tagline:
        "テキストを UTF-8 対応で即座に Base64 エンコード。絵文字・アクセント記号・CJK 文字も確実に保持。無料・完全ブラウザ内処理です。",
      intro: [
        "テキストを入力または貼り付けると、Base64 がリアルタイムに得られます。標準の TextEncoder による UTF-8 安全なエンコードなので、多言語テキスト・絵文字・記号の結果は、各言語の base64 関数と完全に一致します。",
        "HTTP Basic Auth ヘッダー、data URI プレフィックス、メール添付、Base64 を要求する API などに。ターミナルやコード断片は不要です。",
      ],
      steps: [
        "エンコードしたいテキストを入力または貼り付けます。",
        "Base64 出力がリアルタイムに更新されるので、好きなときにコピーします。",
        "付属のデコーダーで Base64 を戻し、往復を確認できます。",
      ],
      faqs: [
        {
          q: "Base64 にするとテキストが長くなるのはなぜ?",
          a: "Base64 は 3 バイトを 4 文字で表すため、出力は入力の約 33% 増になります。バイナリセーフなテキストにするための代价です。",
        },
        {
          q: "Base64 は暗号化ですか?",
          a: "いいえ。Base64 はエンコードであって暗号化ではありません。誰でも即座にデコードできます。秘密の隠蔽には使わず、本物の暗号技術を使ってください。",
        },
        {
          q: "Unicode や絵文字は対応していますか?",
          a: "はい。入力は UTF-8 バイトに変換してからエンコードされるため、Python・Java・Node などと同じ結果になります。",
        },
      ],
    },
    es: {
      name: "Codificador Base64",
      tagline:
        "Codifica texto a Base64 al instante con soporte UTF-8 completo: emojis, acentos y caracteres CJK sobreviven intactos. Gratis, privado, nada sale de tu navegador.",
      intro: [
        "Escribe o pega cualquier texto y obtén su Base64 en vivo mientras tecleas. La codificación es UTF-8 segura mediante el TextEncoder estándar, así que el texto multilingüe, los emojis y los símbolos producen exactamente los mismos bytes que las funciones base64 de cualquier lenguaje.",
        "Úsalo para cabeceras HTTP Basic Auth, prefijos data URI, adjuntos de correo o cualquier API que espere payloads Base64 — sin terminal ni fragmentos de código.",
      ],
      steps: [
        "Pega o escribe el texto que quieres codificar.",
        "La salida Base64 se actualiza en vivo: cópiala cuando quieras.",
        "Pega el Base64 en el decodificador vinculado para verificar la ida y vuelta.",
      ],
      faqs: [
        {
          q: "¿Por qué Base64 alarga mi texto?",
          a: "Base64 representa cada 3 bytes como 4 caracteres, así que la salida es un 33 % mayor que la entrada: es el precio de un texto seguro para binario.",
        },
        {
          q: "¿Base64 es cifrado?",
          a: "No. Base64 es una codificación, no cifrado — cualquiera puede decodificarlo al instante. Nunca lo uses para ocultar secretos; usa criptografía real.",
        },
        {
          q: "¿Se admiten Unicode y emojis?",
          a: "Sí. La entrada se convierte a bytes UTF-8 antes de codificar, igual que lo que producen Python, Java o Node para la misma cadena.",
        },
      ],
    },
    pt: {
      name: "Codificador Base64",
      tagline:
        "Codifique texto em Base64 na hora com suporte total a UTF-8 — emojis, acentos e caracteres CJK ficam intactos. Grátis, privado, nada sai do navegador.",
      intro: [
        "Digite ou cole qualquer texto e receba o Base64 ao vivo enquanto escreve. A codificação é UTF-8 segura via TextEncoder padrão, então texto multilíngue, emojis e símbolos produzem exatamente os mesmos bytes que as funções base64 de qualquer linguagem.",
        "Use para cabeçalhos HTTP Basic Auth, prefixos data URI, anexos de e-mail ou qualquer API que espere payloads Base64 — sem terminal nem trecho de código.",
      ],
      steps: [
        "Cole ou digite o texto que quer codificar.",
        "A saída Base64 atualiza ao vivo — copie quando quiser.",
        "Cole o Base64 de volta no decodificador para verificar a ida e volta.",
      ],
      faqs: [
        {
          q: "Por que o Base64 deixa o texto mais longo?",
          a: "O Base64 representa cada 3 bytes como 4 caracteres, então a saída fica cerca de 33% maior que a entrada — é o custo de um texto seguro para binário.",
        },
        {
          q: "Base64 é criptografia?",
          a: "Não. Base64 é codificação, não criptografia — qualquer pessoa pode decodificar na hora. Nunca use para esconder segredos; use criptografia de verdade.",
        },
        {
          q: "Unicode e emoji são suportados?",
          a: "Sim. A entrada é convertida em bytes UTF-8 antes da codificação, igual ao que Python, Java e Node produzem para a mesma string.",
        },
      ],
    },
  },
});
