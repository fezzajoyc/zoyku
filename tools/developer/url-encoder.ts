import { DevEncoderEngine } from "../_engines/dev-engine-encoder";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "url-encoder",
  category: "developer",
  icon: "link",
  engine: { component: DevEncoderEngine, props: { codec: "url-encode" } },
  related: ["url-decoder", "base64-encoder", "base64-decoder", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "html-minifier", "json-path-query"],
  copy: {
    en: {
      name: "URL Encoder",
      tagline:
        "Percent-encode URLs and query strings online — choose component encoding or full URI encoding, with live output for links, parameters and path segments.",
      intro: [
        "Paste any text or URL and see the percent-encoded result live. Two modes cover the two real-world cases: component encoding (encodeURIComponent) escapes every reserved character for a single parameter value, while full URI encoding (encodeURI) keeps the URL structure — :, /, ? and & — intact.",
        "Essential when building query strings by hand, embedding URLs inside other URLs, generating mailto links or passing values with spaces, ampersands and non-Latin characters through GET parameters.",
      ],
      steps: [
        "Paste the text, parameter value or URL to encode.",
        "Choose component encoding for a value, or full URI to keep the URL structure.",
        "Copy the encoded result straight into your link or request.",
      ],
      faqs: [
        {
          q: "When should I use encodeURIComponent instead of encodeURI?",
          a: "Use encodeURIComponent for individual values you insert into a URL — it escapes &, =, ?, / and more, so a value can never break the query string. Use encodeURI only for a complete URL you want to make transport-safe while keeping its structure.",
        },
        {
          q: "Why do spaces become %20 and not +?",
          a: "%20 is the standard percent-encoding of a space; the + shortcut is a form-encoding convention handled separately by application/x-www-form-urlencoded. This tool uses the standard %20.",
        },
        {
          q: "Does it handle non-Latin characters?",
          a: "Yes — characters outside ASCII are UTF-8 encoded first, then percent-encoded, exactly as browsers do.",
        },
      ],
    },
    zh: {
      name: "URL 编码",
      tagline: "在线百分号编码 URL 和查询字符串——组件编码或整条 URI 编码任选,链接、参数、路径段实时转义,一键复制。",
      intro: [
        "粘贴任意文本或 URL,百分号编码结果实时呈现。两种模式对应两种真实场景:组件编码(encodeURIComponent)会转义所有保留字符,适合单个参数值;整条 URI 编码(encodeURI)保留 :、/、?、& 等 URL 结构。",
        "手工拼查询字符串、把 URL 嵌进另一个 URL、生成 mailto 链接,或让带空格、& 和非拉丁字符的值安全通过 GET 参数时必备。",
      ],
      steps: [
        "粘贴要编码的文本、参数值或 URL。",
        "参数值选组件编码;想保留 URL 结构选整条 URI 编码。",
        "把编码结果直接复制进你的链接或请求。",
      ],
      faqs: [
        {
          q: "什么时候用 encodeURIComponent,什么时候用 encodeURI?",
          a: "要塞进 URL 的单个值用 encodeURIComponent——它转义 &、=、?、/ 等,值永远不会破坏查询串。只有想保留结构的完整 URL 才用 encodeURI 做传输安全化。",
        },
        {
          q: "为什么空格变成 %20 而不是 +?",
          a: "%20 是空格的标准百分号编码;+ 是 application/x-www-form-urlencoded 表单编码的约定,属于另一套机制。本工具使用标准的 %20。",
        },
        {
          q: "支持非拉丁字符吗?",
          a: "支持——ASCII 之外的字符先做 UTF-8 编码再百分号转义,与浏览器的行为一致。",
        },
      ],
    },
    ja: {
      name: "URL エンコーダー",
      tagline:
        "URL やクエリ文字列をオンラインでパーセントエンコード。コンポーネント方式と URI 全体方式を選べ、リンク・パラメータ・パスにそのまま使えます。",
      intro: [
        "テキストや URL を貼り付けると、パーセントエンコード結果がリアルタイムに表示されます。2 つのモードが実務の 2 例に対応:コンポーネント方式(encodeURIComponent)は 1 つのパラメータ値に必要なすべての予約文字をエスケープし、URI 全体方式(encodeURI)は :、/、?、& などの構造を保ったまま安全化します。",
        "クエリ文字列の手組み、URL の中への URL 埋め込み、mailto リンクの生成、空白や &・非ラテン文字を含む値の GET 送信に必須です。",
      ],
      steps: [
        "エンコードしたいテキスト・パラメータ値・URL を貼り付けます。",
        "値にはコンポーネント方式、URL 構造を残したい場合は URI 全体方式を選びます。",
        "エンコード結果をリンクやリクエストにそのままコピーします。",
      ],
      faqs: [
        {
          q: "encodeURI ではなく encodeURIComponent を使うのはいつ?",
          a: "URL に挿入する個々の値には encodeURIComponent を使います。&・=・?・/ などもエスケープされるため、値がクエリ文字列を壊しません。encodeURI は、構造を保ったまま URL 全体を安全化したいときだけ使います。",
        },
        {
          q: "スペースが %20 になり + にならないのはなぜ?",
          a: "%20 がスペースの標準的なパーセントエンコーディングです。+ は application/x-www-form-urlencoded の別規約です。このツールは標準の %20 を使います。",
        },
        {
          q: "非ラテン文字にも対応しますか?",
          a: "はい。ASCII 外の文字はまず UTF-8 でエンコードされ、その後パーセントエンコードされます。ブラウザと同じ挙動です。",
        },
      ],
    },
    es: {
      name: "Codificador URL",
      tagline:
        "Codifica en porcentaje URLs y cadenas de consulta en línea: elige codificación de componente o de URI completa, con salida en vivo para enlaces y parámetros.",
      intro: [
        "Pega cualquier texto o URL y ve el resultado percent-encoded en vivo. Dos modos cubren los dos casos reales: la codificación de componente (encodeURIComponent) escapa todos los caracteres reservados para un valor de parámetro, mientras que la de URI completa (encodeURI) mantiene la estructura — :, /, ? y & — intacta.",
        "Imprescindible al construir cadenas de consulta a mano, incrustar URLs dentro de otras URLs, generar enlaces mailto o pasar valores con espacios, ampersands y caracteres no latinos por parámetros GET.",
      ],
      steps: [
        "Pega el texto, el valor del parámetro o la URL a codificar.",
        "Elige codificación de componente para un valor, o URI completa para conservar la estructura.",
        "Copia el resultado codificado directo a tu enlace o petición.",
      ],
      faqs: [
        {
          q: "¿Cuándo uso encodeURIComponent en vez de encodeURI?",
          a: "Usa encodeURIComponent para valores individuales que insertas en una URL — escapa &, =, ?, / y más, así que un valor nunca rompe la cadena de consulta. Usa encodeURI solo para una URL completa que quieras hacer segura manteniendo su estructura.",
        },
        {
          q: "¿Por qué los espacios se vuelven %20 y no +?",
          a: "%20 es la codificación porcentual estándar del espacio; el atajo + es una convención de form-encoding (application/x-www-form-urlencoded). Esta herramienta usa el %20 estándar.",
        },
        {
          q: "¿Maneja caracteres no latinos?",
          a: "Sí — los caracteres fuera del ASCII se codifican primero en UTF-8 y luego en porcentaje, exactamente como hacen los navegadores.",
        },
      ],
    },
    pt: {
      name: "Codificador de URL",
      tagline:
        "Codifique URLs e query strings com percent-encoding on-line — escolha codificação de componente ou URI completa, com saída ao vivo para links e parâmetros.",
      intro: [
        "Cole qualquer texto ou URL e veja o resultado percent-encoded ao vivo. Dois modos cobrem os dois casos reais: a codificação de componente (encodeURIComponent) escapa todos os caracteres reservados para um valor de parâmetro, enquanto a de URI completa (encodeURI) mantém a estrutura — :, /, ? e & — intacta.",
        "Essencial para montar query strings na mão, embutir URLs dentro de outras URLs, gerar links mailto ou passar valores com espaços, e-comercial e caracteres não latinos em parâmetros GET.",
      ],
      steps: [
        "Cole o texto, o valor do parâmetro ou a URL para codificar.",
        "Escolha codificação de componente para um valor, ou URI completa para manter a estrutura.",
        "Copie o resultado codificado direto para o seu link ou requisição.",
      ],
      faqs: [
        {
          q: "Quando uso encodeURIComponent em vez de encodeURI?",
          a: "Use encodeURIComponent para valores individuais inseridos numa URL — ele escapa &, =, ?, / e mais, então um valor nunca quebra a query string. Use encodeURI só para uma URL completa que você quer tornar segura mantendo a estrutura.",
        },
        {
          q: "Por que espaços viram %20 e não +?",
          a: "%20 é o percent-encoding padrão do espaço; o atalho + é uma convenção do form-encoding (application/x-www-form-urlencoded). Esta ferramenta usa o %20 padrão.",
        },
        {
          q: "Lida com caracteres não latinos?",
          a: "Sim — caracteres fora do ASCII são codificados em UTF-8 primeiro e depois em percent-encoding, exatamente como os navegadores fazem.",
        },
      ],
    },
  },
});
