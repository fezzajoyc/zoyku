import { DevRegexEngine } from "../_engines/dev-engine-regex";
import { defineTool } from "../_lib/types";

const SAMPLE = "Contact ada@example.com or grace+ops@example.org — call 555-0142 or 555-7719.";
const PATTERN = "([\\w.+-]+)@([\\w-]+\\.)+[\\w-]{2,}";

export default defineTool({
  slug: "regex-tester",
  category: "developer",
  icon: "search",
  engine: { component: DevRegexEngine, props: { defaultPattern: PATTERN, sample: SAMPLE } },
  related: ["json-validator", "word-counter", "case-converter", "text-diff"],
  copy: {
    en: {
      name: "Regex Tester",
      tagline:
        "Test regular expressions live: highlight every match as you type, inspect capture groups and debug patterns for JavaScript, with common flags one click away.",
      intro: [
        "Type a pattern, flip the flags you need (global, case-insensitive, multiline, dotAll, unicode) and paste your test string — every match is highlighted in place while a list below shows each match with its index and capture groups, named groups included.",
        "Invalid patterns are reported immediately with the parser's own message instead of a broken page, and zero-length matches are handled safely, so patterns like a* behave the way your runtime would.",
      ],
      steps: [
        "Enter your regular expression in the pattern field.",
        "Toggle flags (g, i, m, s, u) and paste your test string.",
        "Read the highlighted matches and the list of groups; adjust the pattern until it captures exactly what you need.",
      ],
      faqs: [
        {
          q: "Which regex flavor does this use?",
          a: "JavaScript (ECMAScript) RegExp — the same engine that runs in your browser and Node. Patterns for PCRE, Python or Java are usually compatible, but lookahead/lookbehind and unicode handling can differ slightly.",
        },
        {
          q: "Why does my pattern match strange empty positions?",
          a: "Patterns that can match an empty string (like a* or (?:)?) produce zero-length matches. The tester advances one character after each, exactly like JavaScript's own iteration does.",
        },
        {
          q: "Is my test data sent anywhere?",
          a: "No. Matching runs live in your browser — nothing is uploaded or stored.",
        },
      ],
    },
    zh: {
      name: "正则测试器",
      tagline: "实时测试正则表达式:输入即高亮全部匹配,逐条查看捕获组,支持 g/i/m/s/u 标志——专为 JavaScript 正则调试打造。",
      intro: [
        "输入模式,打开需要的标志(global、忽略大小写、多行、dotAll、unicode),粘贴测试文本——每个匹配都会在原文中就地高亮,下方列表逐条列出匹配内容、位置和捕获组,命名组也包含在内。",
        "非法模式会立即给出解析器的原始报错而不是白屏,零宽匹配也被安全处理,像 a* 这类模式的行为与你的运行时完全一致。",
      ],
      steps: [
        "在模式框输入正则表达式。",
        "切换标志(g、i、m、s、u)并粘贴测试文本。",
        "查看高亮匹配和捕获组列表;调整模式直到恰好捕获所需内容。",
      ],
      faqs: [
        {
          q: "这里用的是什么正则方言?",
          a: "JavaScript(ECMAScript)RegExp——与浏览器和 Node 中运行的是同一个引擎。PCRE、Python、Java 的模式通常兼容,但断言先行/后行和 unicode 处理可能有细微差别。",
        },
        {
          q: "为什么我的模式会匹配到奇怪的空位置?",
          a: "能匹配空串的模式(如 a*)会产生零宽匹配。测试器会像 JavaScript 自身一样,在每次零宽匹配后前进一个字符。",
        },
        {
          q: "测试数据会被发送到别处吗?",
          a: "不会。匹配在浏览器中实时完成,不上传也不存储。",
        },
      ],
    },
    ja: {
      name: "正規表現テスター",
      tagline:
        "正規表現をリアルタイムでテスト:入力と同時にすべての一致をハイライトし、キャプチャグループを確認。JavaScript 向けデバッグに、フラグもワンクリック。",
      intro: [
        "パターンを入力し、必要なフラグ(global・大文字小文字なし・複数行・dotAll・unicode)を切り替え、テスト文字列を貼り付ける — すべての一致がその場でハイライトされ、下のリストに各一致の位置とキャプチャグループ(名前付きも)が表示されます。",
        "不正なパターンはページを壊さず、パーサー自身のエラーメッセージで即時に報告されます。長さゼロの一致も安全に処理され、a* のようなパターンもランタイムと同じ挙動になります。",
      ],
      steps: [
        "パターン欄に正規表現を入力します。",
        "フラグ(g・i・m・s・u)を切り替え、テスト文字列を貼り付けます。",
        "ハイライトされた一致とグループ一覧を確認し、必要なものだけを捕らえるまで調整します。",
      ],
      faqs: [
        {
          q: "どの正規表現方言を使っていますか?",
          a: "JavaScript(ECMAScript)の RegExp です。ブラウザや Node で動くのと同じエンジン。PCRE・Python・Java のパターンはたいてい互換ですが、先読み/後読みや Unicode の扱いが微妙に異なることがあります。",
        },
        {
          q: "奇妙な空の位置に一致するのはなぜ?",
          a: "空文字列に一致しうるパターン(a* など)は長さゼロの一致を生みます。テスターは JavaScript 本来の反復と同じく、それぞれの後に 1 文字進みます。",
        },
        {
          q: "テストデータはどこかに送信されますか?",
          a: "いいえ。マッチングはブラウザ内でリアルタイムに行われ、アップロードも保存もありません。",
        },
      ],
    },
    es: {
      name: "Probador de Regex",
      tagline:
        "Prueba expresiones regulares en vivo: resalta cada coincidencia mientras escribes, inspecciona grupos de captura y depura patrones de JavaScript al instante.",
      intro: [
        "Escribe un patrón, activa las opciones que necesites (global, sin mayúsculas, multilínea, dotAll, unicode) y pega tu texto de prueba — cada coincidencia se resalta en su sitio mientras una lista inferior muestra cada una con su índice y grupos de captura, incluidos los nombrados.",
        "Los patrones inválidos se informan al instante con el mensaje del propio parser en lugar de romper la página, y las coincidencias de longitud cero se gestionan con seguridad, así que patrones como a* se comportan igual que en tu runtime.",
      ],
      steps: [
        "Introduce tu expresión regular en el campo de patrón.",
        "Activa las opciones (g, i, m, s, u) y pega tu texto de prueba.",
        "Lee las coincidencias resaltadas y la lista de grupos; ajusta el patrón hasta capturar exactamente lo que necesitas.",
      ],
      faqs: [
        {
          q: "¿Qué sabor de regex usa?",
          a: "RegExp de JavaScript (ECMAScript) — el mismo motor que corre en tu navegador y en Node. Los patrones de PCRE, Python o Java suelen ser compatibles, pero lookbehind y el manejo unicode pueden diferir algo.",
        },
        {
          q: "¿Por qué mi patrón coincide en posiciones vacías extrañas?",
          a: "Los patrones que pueden coincidir con la cadena vacía (como a*) producen coincidencias de longitud cero. El probador avanza un carácter después de cada una, igual que la iteración nativa de JavaScript.",
        },
        {
          q: "¿Mis datos de prueba se envían a algún sitio?",
          a: "No. El emparejamiento corre en vivo en tu navegador — nada se sube ni se almacena.",
        },
      ],
    },
    pt: {
      name: "Testador de Regex",
      tagline:
        "Teste expressões regulares ao vivo: destaque cada correspondência enquanto digita, inspecione grupos de captura e depure padrões de JavaScript na hora.",
      intro: [
        "Digite um padrão, ative as flags que precisar (global, sem maiúsculas, multilinha, dotAll, unicode) e cole seu texto de teste — cada correspondência é destacada no lugar, e uma lista abaixo mostra cada uma com o índice e os grupos de captura, incluindo os nomeados.",
        "Padrões inválidos são relatados na hora com a mensagem do próprio parser em vez de quebrar a página, e correspondências de comprimento zero são tratadas com segurança, então padrões como a* se comportam como no seu runtime.",
      ],
      steps: [
        "Digite sua expressão regular no campo de padrão.",
        "Ative as flags (g, i, m, s, u) e cole seu texto de teste.",
        "Leia as correspondências destacadas e a lista de grupos; ajuste o padrão até capturar exatamente o que precisa.",
      ],
      faqs: [
        {
          q: "Qual sabor de regex este testador usa?",
          a: "RegExp de JavaScript (ECMAScript) — o mesmo motor que roda no seu navegador e no Node. Padrões de PCRE, Python ou Java costumam ser compatíveis, mas lookahead/lookbehind e o tratamento de unicode podem diferir um pouco.",
        },
        {
          q: "Por que meu padrão casa em posições vazias estranhas?",
          a: "Padrões que podem casar com a string vazia (como a*) produzem correspondências de comprimento zero. O testador avança um caractere depois de cada uma, exatamente como a iteração nativa do JavaScript.",
        },
        {
          q: "Meus dados de teste são enviados a algum lugar?",
          a: "Não. O casamento roda ao vivo no seu navegador — nada é enviado ou armazenado.",
        },
      ],
    },
  },
});
