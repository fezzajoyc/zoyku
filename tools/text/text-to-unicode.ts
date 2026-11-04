import { TextTransform } from "../_engines/text-tool";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "text-to-unicode",
  category: "text",
  icon: "hash",
  engine: {
    component: TextTransform,
    props: {
      transform: "text-unicode",
      options: [
        { key: 'decode', label: { en: 'Decode escapes to text', zh: '把转义解码回文本', ja: 'エスケープをテキストにデコード', es: 'Decodificar escapes a texto', pt: 'Decodificar escapes para texto' }, default: false },
        { key: 'ubraces', label: { en: '\\u{...} braces form', zh: '\\u{...} 花括号形式', ja: '\\u{...} 波括弧形式', es: 'Forma \\u{...}', pt: 'Forma \\u{...}' }, default: false },
        { key: 'uplus', label: { en: 'U+XXXX notation', zh: 'U+XXXX 记法', ja: 'U+XXXX 記法', es: 'Notación U+XXXX', pt: 'Notação U+XXXX' }, default: false },
        { key: 'decimal', label: { en: 'Decimal code points', zh: '十进制码点', ja: '10進コードポイント', es: 'Puntos de código decimales', pt: 'Pontos de código decimais' }, default: false }
      ],
      sample: 'Héllo 日'
    },
  },
  related: ["text-to-binary", "fancy-text-generator", "case-converter", "html-escape", "text-diff", "text-sorter", "remove-extra-spaces", "remove-duplicate-lines", "word-counter", "lorem-ipsum-generator"],
  copy: {
    en: {
      name: 'Text to Unicode',
      tagline: 'Escape any text to \\uXXXX, \\u{...}, U+XXXX or decimal code points — and decode them all back. Emoji-safe, instant, fully local.',
      intro: ['Unicode escapes are how source code, JSON payloads and config files represent characters that are hard to type or unsafe to embed. Paste any string and pick a notation: \\uXXXX for classic JavaScript/Java form, \\u{...} for full astral-plane support, U+XXXX for the code charts, or plain decimal code points.',
        'Decode mode understands all four notations mixed together, so you can paste anything from \\u00e9 to U+1F600 or &#128512; and get readable text back. Characters outside the BMP (emoji, rare CJK) fall back to \\u{...} automatically in \\uXXXX mode instead of producing broken surrogates.',
        "The \\uXXXX notation is the JavaScript/Java escape form, \\u{...} is the ES6 code-point form that handles the full Unicode range beyond U+FFFF, U+XXXX is the Unicode standard's code-chart notation, and decimal is the raw code-point number used by HTML entities and some databases. All four are mathematically equivalent — the same character, four spellings.",
        "Compared with looking up each character in a Unicode table or guessing the escape in a REPL, the tool encodes a whole string at once and decodes mixed notations back — \\u00e9, U+1F600 and &#128512; in one paste all resolve correctly. Characters outside the BMP automatically fall back to \\u{...} in \\uXXXX mode instead of producing a broken surrogate pair.",
      ],
      steps: ['Paste the text to escape — output updates live.',
        'Pick a notation with the checkboxes: \\uXXXX, \\u{...}, U+XXXX or decimal.',
        'Or turn on decode mode and paste escapes to get text back.'],
      faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
      ],
    },
    zh: {
      name: '文本转 Unicode',
      tagline: '把任意文本转义成 \\uXXXX、\\u{...}、U+XXXX 或十进制码点——也全部能解码回来。emoji 安全,即时,纯本地。',
      intro: ['Unicode 转义是源代码、JSON 数据和配置文件表示难输入或不安全字符的方式。粘贴任意字符串并选择记法:\\uXXXX 是经典 JavaScript/Java 形式,\\u{...} 完整支持增补平面,U+XXXX 对应码表,十进制码点则是纯数字。',
        '解码模式四种记法混着都能认——从 \\u00e9 到 U+1F600 或 &#128512; 都能还原成可读文本。在 \\uXXXX 模式下,BMP 之外的字符(emoji、生僻字)会自动落到 \\u{...} 形式,不会产生损坏的代理对。'],
      steps: ['粘贴要转义的文本——输出实时更新。',
        '用复选框选择记法:\\uXXXX、\\u{...}、U+XXXX 或十进制。',
        '或打开解码模式,粘贴转义串还原成文本。'],
      faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
      ],
    },
    ja: {
      name: 'テキスト→Unicode',
      tagline: '任意のテキストを \\uXXXX・\\u{...}・U+XXXX・10進コードポイントへエスケープ — すべてデコードも可能。絵文字対応、即時、完全ローカル。',
      intro: ['Unicode エスケープは、ソースコードや JSON、設定ファイルが打ちにくい文字や埋め込みに安全でない文字を表す方法です。文字列を貼って記法を選択:\\uXXXX は古典的な JavaScript/Java 形式、\\u{...} は追加面を完全サポート、U+XXXX はコード表の記法、10進は純粋な数字です。',
        'デコードモードは 4 記法の混在も理解します。\\u00e9 から U+1F600、&#128512; まで何を貼っても可読テキストに戻ります。BMP 外の文字(絵文字・稀な CJK)は \\uXXXX モードでは自動的に \\u{...} に切り替わり、壊れたサロゲートペアを作りません。'],
      steps: ['エスケープするテキストを貼り付け — 出力はリアルタイム更新。',
        'チェックボックスで記法を選択:\\uXXXX、\\u{...}、U+XXXX、10進。',
        'またはデコードモードを有効にし、エスケープ列を貼ってテキストに戻します。'],
      faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
      ],
    },
    es: {
      name: 'Texto a Unicode',
      tagline: 'Escapa cualquier texto a \\uXXXX, \\u{...}, U+XXXX o puntos de código decimales — y decodifícalos todos de vuelta. Compatible con emojis, instantáneo, 100% local.',
      intro: ['Los escapes Unicode son la forma en que el código fuente, los payloads JSON y los archivos de configuración representan caracteres difíciles de escribir o inseguros de incrustar. Pega cualquier cadena y elige notación: \\uXXXX para la forma clásica de JavaScript/Java, \\u{...} para soporte completo del plano astral, U+XXXX como en las tablas de códigos, o puntos decimales.',
        'El modo decodificar entiende las cuatro notaciones mezcladas: desde \\u00e9 hasta U+1F600 o &#128512; obtienes texto legible de vuelta. Los caracteres fuera del BMP (emojis, CJK raros) cambian automáticamente a \\u{...} en modo \\uXXXX en lugar de producir pares sustitutos rotos.'],
      steps: ['Pega el texto a escapar — la salida se actualiza en vivo.',
        'Elige la notación con las casillas: \\uXXXX, \\u{...}, U+XXXX o decimal.',
        'O activa el modo decodificar y pega escapes para recuperar el texto.'],
      faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
      ],
    },
    pt: {
      name: 'Texto para Unicode',
      tagline: 'Escape qualquer texto para \\uXXXX, \\u{...}, U+XXXX ou pontos de código decimais — e decodifique todos de volta. Seguro para emojis, instantâneo, 100% local.',
      intro: ['Escapes Unicode são a forma como código-fonte, payloads JSON e arquivos de configuração representam caracteres difíceis de digitar ou inseguros de embutir. Cole qualquer string e escolha a notação: \\uXXXX para a forma clássica de JavaScript/Java, \\u{...} para suporte completo ao plano suplementar, U+XXXX como nas tabelas de códigos, ou pontos decimais.',
        'O modo decodificar entende as quatro notações misturadas: de \\u00e9 a U+1F600 ou &#128512; você recupera texto legível. Caracteres fora do BMP (emojis, CJK raros) mudam automaticamente para \\u{...} no modo \\uXXXX em vez de produzir pares substitutos quebrados.'],
      steps: ['Cole o texto para escapar — a saída atualiza em tempo real.',
        'Escolha a notação nas caixas: \\uXXXX, \\u{...}, U+XXXX ou decimal.',
        'Ou ative o modo decodificar e cole escapes para recuperar o texto.'],
      faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
      ],
    },
  },
});
