import { DevEncoderEngine } from "../_engines/dev-engine-encoder";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "url-decoder",
  category: "developer",
  icon: "link",
  engine: { component: DevEncoderEngine, props: { codec: "url-decode" } },
  related: ["url-encoder", "base64-decoder", "base64-encoder", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "html-minifier", "json-path-query"],
  copy: {
    en: {
      name: "URL Decoder",
      tagline:
        "Decode percent-encoded URLs back into readable text — %20, %2F and query-string values become clear instantly. Handles + as space, fully in your browser.",
      intro: [
        "Paste an encoded URL, parameter or path segment and read the original text immediately. Two modes match the two encoders: component decoding (decodeURIComponent) for a single value, and full URI decoding (decodeURI) for a complete URL. Handy for reading server logs, debugging tracking parameters and unpicking redirect chains.",
        "Decoding is byte-exact: every %XX escape becomes the corresponding UTF-8 byte, and multi-byte sequences are reassembled into the original characters, so %C3%A9 returns é and %E6%97%A5 returns 日. Invalid or truncated escapes such as %E6% or %ZZ are reported instead of silently corrupting the output.",
        "A handy extra toggle treats + as a space, which is what form-encoded query strings (application/x-www-form-urlencoded) actually mean — so search params like hello+world decode to hello world instead of staying literal. Turn it off when decoding a path segment, where + is a legitimate literal character.",
        "Decoding with the wrong mode is a real failure mode: running decodeURI on an encoded parameter leaves %3D and %26 untouched because they look like URL separators, and the value then splits incorrectly. The two explicit modes here remove that guesswork, and everything runs locally — nothing is sent to a server to be analyzed.",

      ],
      steps: [
        "Paste the percent-encoded string or URL.",
        "Pick component decoding for values, or full URI decoding for complete URLs.",
        "Enable + as space for form-style query strings, then copy the decoded text.",
      ],
      faqs: [
        {
          q: "Why do I sometimes get an error when decoding?",
          a: "A lone % that is not followed by two hex digits, or a truncated escape sequence like %E4%BD, is invalid percent-encoding — the decoder reports it instead of guessing.",
        },
        {
          q: "Should I turn on the + as space option?",
          a: "For values extracted from an HTML form submission or many web frameworks' query strings, yes. For standard percent-encoded URLs that contain real + characters, keep it off.",
        },
        {
          q: "Is anything uploaded?",
          a: "No. Decoding runs locally in your browser — nothing leaves your device.",
        },
      ],
    },
    zh: {
      name: "URL 解码",
      tagline: "把百分号编码的 URL 解回可读文本——%20、%2F 和查询参数即时还原,支持把 + 当空格,全程浏览器本地处理。",
      intro: [
        "粘贴编码过的 URL、参数或路径段,立即读出原始文本。两种模式对应两种编码器:组件解码(decodeURIComponent)用于单个值,整条 URI 解码(decodeURI)用于完整 URL。",
        "还提供一个实用开关:把 + 当作空格——这正是表单编码(application/x-www-form-urlencoded)查询串的真实含义,于是 hello+world 能解码成 hello world 而不是原样保留。",
      ],
      steps: [
        "粘贴百分号编码的字符串或 URL。",
        "单个值选组件解码;完整 URL 选整条 URI 解码。",
        "表单风格的查询串勾选「+ 当空格」,然后复制解码文本。",
      ],
      faqs: [
        {
          q: "为什么有时解码会报错?",
          a: "单独的 % 后面没有两个十六进制数字,或者转义序列被截断(如 %E4%BD),都是非法的百分号编码——解码器会明确报错而不是猜测。",
        },
        {
          q: "什么时候应该勾选「+ 当空格」?",
          a: "处理 HTML 表单提交或很多 Web 框架查询串里的值时勾上。如果 URL 里存在真实的 + 字符,就别勾。",
        },
        {
          q: "会上传任何内容吗?",
          a: "不会。解码在浏览器本地运行,数据不离开设备。",
        },
      ],
    },
    ja: {
      name: "URL デコーダー",
      tagline:
        "パーセントエンコードされた URL を読めるテキストへ復元 — %20・%2F・クエリ値が瞬時に分かります。+ を空白扱いにも対応、完全ブラウザ内処理。",
      intro: [
        "エンコードされた URL・パラメータ・パス断片を貼り付けると、元のテキストがすぐに読めます。2 つのモードは 2 つのエンコーダーに対応:単一の値にはコンポーネント方式(decodeURIComponent)、URL 全体には URI 全体方式(decodeURI)です。",
        "実用的な追加オプションとして、+ を空白として扱うスイッチがあります。フォームエンコード(application/x-www-form-urlencoded)のクエリ文字列が本来の意味であり、hello+world が hello world に正しく復元されます。",
      ],
      steps: [
        "パーセントエンコードされた文字列や URL を貼り付けます。",
        "値にはコンポーネント方式、完全な URL には URI 全体方式を選びます。",
        "フォーム形式のクエリなら「+ を空白扱い」を有効にし、デコード結果をコピーします。",
      ],
      faqs: [
        {
          q: "デコード時にエラーが出ることがあるのはなぜ?",
          a: "後ろに 16 進 2 桁が続かない単独の % や、%E4%BD のような途中で切れたエスケープは不正なパーセントエンコーディングです。デコーダーは推測せずエラーを報告します。",
        },
        {
          q: "「+ を空白扱い」はいつオンにする?",
          a: "HTML フォーム送信や多くの Web フレームワークのクエリ文字列から取り出した値なら、オンにします。URL に本物の + が含まれる場合はオフのままにします。",
        },
        {
          q: "何かアップロードされますか?",
          a: "いいえ。デコードはブラウザ内でローカルに実行され、データは端末の外に出ません。",
        },
      ],
    },
    es: {
      name: "Decodificador URL",
      tagline:
        "Decodifica URLs con porcentaje a texto legible: %20, %2F y valores de consulta se aclaran al instante. Trata + como espacio, todo en tu navegador.",
      intro: [
        "Pega una URL, parámetro o segmento codificado y lee el texto original al momento. Dos modos que corresponden a los dos codificadores: decodificación de componente (decodeURIComponent) para un solo valor, y de URI completa (decodeURI) para una URL entera.",
        "Un extra práctico: un interruptor que trata + como espacio, que es lo que significan realmente las cadenas de consulta form-encoded (application/x-www-form-urlencoded) — así hello+world se decodifica como hello world en lugar de quedarse literal.",
      ],
      steps: [
        "Pega la cadena o URL percent-encoded.",
        "Elige decodificación de componente para valores, o de URI completa para URLs enteras.",
        "Activa «+ como espacio» en cadenas de formulario, y copia el texto decodificado.",
      ],
      faqs: [
        {
          q: "¿Por qué a veces da error al decodificar?",
          a: "Un % suelto sin dos dígitos hexadecimales detrás, o una secuencia truncada como %E4%BD, no es percent-encoding válido — el decodificador lo informa en lugar de adivinar.",
        },
        {
          q: "¿Cuándo activo la opción «+ como espacio»?",
          a: "Para valores sacados de un envío de formulario HTML o de las query strings de muchos frameworks, sí. Para URLs estándar que contienen caracteres + reales, déjalo apagado.",
        },
        {
          q: "¿Se sube algo?",
          a: "No. La decodificación corre localmente en tu navegador — nada sale de tu dispositivo.",
        },
      ],
    },
    pt: {
      name: "Decodificador de URL",
      tagline:
        "Decodifique URLs com percent-encoding de volta para texto legível — %20, %2F e valores de query ficam claros na hora. Trata + como espaço, no navegador.",
      intro: [
        "Cole uma URL, parâmetro ou segmento de caminho codificado e leia o texto original imediatamente. Dois modos correspondem aos dois codificadores: decodificação de componente (decodeURIComponent) para um valor único, e de URI completa (decodeURI) para uma URL inteira.",
        "Um extra prático: um interruptor que trata + como espaço, que é o que as query strings form-encoded (application/x-www-form-urlencoded) realmente significam — assim hello+world decodifica como hello world em vez de permanecer literal.",
      ],
      steps: [
        "Cole a string ou URL percent-encoded.",
        "Escolha decodificação de componente para valores, ou de URI completa para URLs completas.",
        "Ative «+ como espaço» para query strings de formulário e copie o texto decodificado.",
      ],
      faqs: [
        {
          q: "Por que às vezes dá erro ao decodificar?",
          a: "Um % sozinho sem dois dígitos hexadecimais depois, ou uma sequência truncada como %E4%BD, não é percent-encoding válido — o decodificador reporta em vez de adivinhar.",
        },
        {
          q: "Quando ativar a opção «+ como espaço»?",
          a: "Para valores extraídos de envios de formulário HTML ou das query strings de muitos frameworks, sim. Para URLs padrão que contêm caracteres + reais, mantenha desligado.",
        },
        {
          q: "Algo é enviado para a internet?",
          a: "Não. A decodificação roda localmente no seu navegador — nada sai do seu dispositivo.",
        },
      ],
    },
  },
});
