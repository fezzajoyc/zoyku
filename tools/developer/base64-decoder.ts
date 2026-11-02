import { DevEncoderEngine } from "../_engines/dev-engine-encoder";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "base64-decoder",
  category: "developer",
  icon: "swap",
  engine: { component: DevEncoderEngine, props: { codec: "base64-decode" } },
  related: ["base64-encoder", "url-decoder", "jwt-decoder", "hash-generator"],
  copy: {
    en: {
      name: "Base64 Decoder",
      tagline:
        "Decode Base64 back into readable text with proper UTF-8 handling — data URIs, API payloads and encoded config values become clear instantly. Private and free.",
      intro: [
        "Paste Base64 and see the decoded text live. Decoding goes through the standard TextDecoder, so multibyte UTF-8 content — accents, emoji, CJK — comes out correctly instead of turning into mojibake.",
        "It is forgiving in the useful ways: whitespace and line breaks in the input are ignored, and data URI prefixes such as data:image/png;base64, are stripped automatically before decoding.",
      ],
      steps: [
        "Paste the Base64 string into the input box.",
        "The decoded text appears instantly — copy it with one click.",
        "If decoding fails, check for truncated or non-Base64 characters in the input.",
      ],
      faqs: [
        {
          q: "The output looks like garbage symbols — why?",
          a: "The input is probably not UTF-8 text. Base64 can encode arbitrary bytes: images, PDFs, binary blobs. This tool decodes bytes as UTF-8 text, so binary data shows as replacement characters.",
        },
        {
          q: "Can it decode URL-safe Base64?",
          a: "Yes — it is aimed at JWT-style data, where - and _ replace + and /. Standard Base64 with or without padding works too.",
        },
        {
          q: "Is decoding done on a server?",
          a: "No. Everything runs in your browser; the string never leaves your device.",
        },
      ],
    },
    zh: {
      name: "Base64 解码",
      tagline: "把 Base64 解码回可读文本,UTF-8 处理完整——data URI、API 负载、编码后的配置值即时还原。私密免费,本地完成。",
      intro: [
        "粘贴 Base64,解码文本实时呈现。解码走标准 TextDecoder,多字节 UTF-8 内容——重音符号、emoji、中日韩文字——都能正确还原,不会变成乱码。",
        "对常见情况很宽容:输入中的空白和换行会被忽略,data:image/png;base64, 这类 data URI 前缀会在解码前自动去掉。",
      ],
      steps: [
        "把 Base64 字符串粘贴到输入框。",
        "解码文本即时出现,一键复制。",
        "如果解码失败,检查输入是否被截断或混入了非 Base64 字符。",
      ],
      faqs: [
        {
          q: "输出看起来是乱码,为什么?",
          a: "输入可能不是 UTF-8 文本。Base64 可以编码任意字节:图片、PDF、二进制块。本工具按 UTF-8 文本解码字节,二进制数据会显示为替换字符。",
        },
        {
          q: "能解码 URL 安全的 Base64 吗?",
          a: "可以——它按 JWT 风格处理,即用 - 和 _ 代替 + 和 /。带或不带填充的标准 Base64 也都支持。",
        },
        {
          q: "解码是在服务器上做的吗?",
          a: "不是。一切都在浏览器中完成,字符串不会离开你的设备。",
        },
      ],
    },
    ja: {
      name: "Base64 デコーダー",
      tagline:
        "Base64 を UTF-8 を正しく扱って読めるテキストへ復元。data URI・API ペイロード・エンコード済み設定値が瞬時に分かります。",
      intro: [
        "Base64 を貼り付けると、デコード結果がリアルタイムに表示されます。標準の TextDecoder を通すため、アクセント記号・絵文字・CJK などのマルチバイト UTF-8 も文字化けせず正しく出ます。",
        "実用面では寛容です。入力内の空白や改行は無視され、data:image/png;base64, のような data URI プレフィックスはデコード前に自動で取り除かれます。",
      ],
      steps: [
        "Base64 文字列を入力欄に貼り付けます。",
        "デコードされたテキストが即座に表示され、ワンクリックでコピーできます。",
        "デコードに失敗する場合は、入力が途中で切れていないか・Base64 以外の文字が混在していないか確認します。",
      ],
      faqs: [
        {
          q: "出力が意味不明な記号になるのはなぜ?",
          a: "入力はおそらく UTF-8 テキストではありません。Base64 は画像・PDF・バイナリなど任意のバイトを扱えます。このツールはバイトを UTF-8 テキストとして解釈するため、バイナリは置換文字として表示されます。",
        },
        {
          q: "URL セーフな Base64 もデコードできますか?",
          a: "はい。+ と / の代わりに - と _ を使う JWT 風のデータを想定しています。パディングの有無を問わず標準 Base64 も OK です。",
        },
        {
          q: "デコードはサーバー上で行われますか?",
          a: "いいえ。すべてブラウザ内で完結し、文字列が端末の外に出ることはありません。",
        },
      ],
    },
    es: {
      name: "Decodificador Base64",
      tagline:
        "Decodifica Base64 a texto legible con manejo UTF-8 correcto: data URIs, payloads de API y valores codificados se aclaran al instante. Privado y gratis.",
      intro: [
        "Pega Base64 y ve el texto decodificado en vivo. La decodificación usa el TextDecoder estándar, así que el contenido UTF-8 multibyte — acentos, emojis, CJK — sale correcto en lugar de convertirse en caracteres extraños.",
        "Es tolerante donde importa: los espacios y saltos de línea de la entrada se ignoran, y los prefijos data URI como data:image/png;base64, se quitan automáticamente antes de decodificar.",
      ],
      steps: [
        "Pega la cadena Base64 en el cuadro de entrada.",
        "El texto decodificado aparece al instante: cópialo con un clic.",
        "Si la decodificación falla, revisa que la entrada no esté truncada ni contenga caracteres no Base64.",
      ],
      faqs: [
        {
          q: "La salida son símbolos extraños, ¿por qué?",
          a: "La entrada probablemente no es texto UTF-8. Base64 puede codificar bytes arbitrarios: imágenes, PDFs, binarios. Esta herramienta decodifica los bytes como texto UTF-8, así que los datos binarios aparecen como caracteres de reemplazo.",
        },
        {
          q: "¿Decodifica Base64 URL-safe?",
          a: "Sí — está pensado para datos estilo JWT, donde - y _ reemplazan a + y /. También funciona el Base64 estándar con o sin relleno.",
        },
        {
          q: "¿La decodificación ocurre en un servidor?",
          a: "No. Todo corre en tu navegador; la cadena nunca sale de tu dispositivo.",
        },
      ],
    },
    pt: {
      name: "Decodificador Base64",
      tagline:
        "Decodifique Base64 de volta para texto legível com tratamento UTF-8 correto — data URIs, payloads de API e valores codificados ficam claros na hora.",
      intro: [
        "Cole Base64 e veja o texto decodificado ao vivo. A decodificação passa pelo TextDecoder padrão, então conteúdo UTF-8 multibyte — acentos, emojis, CJK — sai correto em vez de virar caracteres estranhos.",
        "É tolerante onde importa: espaços e quebras de linha na entrada são ignorados, e prefixos data URI como data:image/png;base64, são removidos automaticamente antes da decodificação.",
      ],
      steps: [
        "Cole a string Base64 na caixa de entrada.",
        "O texto decodificado aparece na hora — copie com um clique.",
        "Se a decodificação falhar, verifique se a entrada não está truncada ou com caracteres que não são Base64.",
      ],
      faqs: [
        {
          q: "A saída parece símbolos sem sentido, por quê?",
          a: "A entrada provavelmente não é texto UTF-8. Base64 pode codificar bytes arbitrários: imagens, PDFs, dados binários. Esta ferramenta decodifica os bytes como texto UTF-8, então dados binários aparecem como caracteres de substituição.",
        },
        {
          q: "Decodifica Base64 URL-safe?",
          a: "Sim — pensado para dados estilo JWT, onde - e _ substituem + e /. Base64 padrão, com ou sem padding, também funciona.",
        },
        {
          q: "A decodificação acontece num servidor?",
          a: "Não. Tudo roda no seu navegador; a string nunca sai do seu dispositivo.",
        },
      ],
    },
  },
});
