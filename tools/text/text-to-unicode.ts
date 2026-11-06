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
      deepDive: [
        {
          heading: "What Unicode conversion actually shows",
          paragraphs: [
            "Every character you type is a number. Unicode assigns each one a code point — \"A\" is U+0041, the euro sign € is U+20AC, an emoji is somewhere in the U+1F300 range. This tool displays that mapping: it shows the code point in several notations (U+XXXX, decimal, hexadecimal) and, for characters beyond the BMP, the UTF-16 surrogate pair that JavaScript actually holds in memory.",
            "The gap between \"what you see\" and \"what is stored\" is the reason this tool exists. A character that looks single — é, a flag emoji, a CJK ideograph — may be one code point, two surrogate halves, or a base character plus combining marks. Pasting text in shows which case you are dealing with, which matters when a script miscounts lengths or a database truncates at the wrong boundary.",
            "Code points are not the same as bytes: U+00E9 is the concept \"e with acute\", which becomes the two bytes 0xC3 0xA9 in UTF-8. If you need bytes rather than code points, the binary converter is the sibling tool for that question.",
          ],
        },
        {
          heading: "Escapes and encodings: \", &#, and friends",
          paragraphs: [
            "The same character has many spellings depending on context. In JSON and JavaScript strings, é can be written as \\u00e9 (or \\u{e9} in newer syntax). In HTML, &#233; or &eacute;. In CSS, \\00e9. In URLs, percent-encoded UTF-8: %C3%A9. None of these are different characters — they are different notation systems for the same number, and this tool outputs the variants you can paste directly into each context.",
            "Two common failure modes this prevents: double-encoding (\\u00e9 pasted into a system that escapes the backslash again, producing literal \"\\u00e9\" text), and encoding mismatch (a page declares one charset while the file is saved in another, so every non-ASCII character renders as replacement boxes).",
            "The BMP boundary at U+FFFF is the classic gotcha: characters above it — most emoji — cannot fit one UTF-16 unit, so their escapes look like \\ud83d\\ude00 rather than \\u1f600. Older systems that only handle \\uXXXX escapes cannot express them at all.",
          ],
        },
        {
          heading: "Local decoding, no round trip",
          paragraphs: [
            "Everything runs in browser JavaScript: code points are read directly from the string in memory. No upload, no API, works offline — relevant because the most common use is debugging a string you got from a log or API response that you may not want to paste into an arbitrary web service.",
            "The output updates per keystroke, so you can sweep through a suspicious string character by character and watch which code point appears where. Replacement character U+FFFD in the output means the source text was already corrupt before it reached the tool.",
            "Pair it with the binary converter for byte-level questions and the case converter when debugging case-mapping behavior on exotic characters — the three cover the everyday Unicode debugging workflow.",
          ],
        },
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
      deepDive: [
        {
          heading: "Unicode 转换到底在显示什么",
          paragraphs: [
            "你输入的每个字符都是一个数字。Unicode 给每个字符分配码位——“A” 是 U+0041,欧元符号 € 是 U+20AC,emoji 在 U+1F300 一带。本工具展示的就是这个映射:以多种记法(XX 十六进制、十进制)显示码位,超出 BMP 平面的字符还会给出 JavaScript 内存里实际存放的 UTF-16 代理对。",
            "“看到的”和“存储的”之间的落差,就是这个工具存在的原因。看起来是一个字符——é、一面旗的 emoji、一个汉字——可能是一个码位、两个代理半体,或“基础字符+组合符号”。把文本贴进来就知道是哪种情况;脚本数错长度、数据库在错误的边界截断,根源都在这里。",
            "码位不等于字节:U+00E9 是“带尖音符的 e”这个概念,在 UTF-8 里变成两个字节 0xC3 0xA9。如果你要的是字节而不是码位,本站的二进制转换器才是回答那个问题的工具。",
          ],
        },
        {
          heading: "转义与编码:\",&# 和朋友们",
          paragraphs: [
            "同一个字符在不同语境里有多种写法。JSON 和 JavaScript 字符串里,é 可写成 \\u00e9(新语法里是 \\u{e9});HTML 里是 &#233; 或 &eacute;;CSS 里是 \\00e9;URL 里是百分号编码的 UTF-8:%C3%A9。这些不是不同字符,而是同一个数字的不同记法体系,本工具输出的变体可以直接贴进各自语境。",
            "它能预防两种常见故障:双重编码(\\u00e9 贴进会再次转义反斜杠的系统,产出字面量 “\\u00e9” 文本)和编码错配(页面声明一种字符集、文件却按另一种保存,所有非 ASCII 字符显示成替换框)。",
            "U+FFFF 处的 BMP 边界是经典陷阱:超过它的字符——大多数 emoji——装不进一个 UTF-16 单元,所以它们的转义长得像 \\ud83d\\ude00 而不是 \\u1f600。只支持 \\uXXXX 转义的旧系统根本表达不了它们。",
          ],
        },
        {
          heading: "本地解码,无往返",
          paragraphs: [
            "一切都在浏览器 JavaScript 里完成:码位直接从内存里的字符串读取。不上传、无 API、离线可用——这很重要,因为最常见的用途是调试一条来自日志或 API 响应、未必想贴进随便哪个网络服务的字符串。",
            "输出随每次击键刷新,你可以逐字符扫过可疑字符串,看哪个码位出现在哪里。输出里出现替换符 U+FFFD,说明源文本在到达工具之前就已经损坏。",
            "字节层面的问题配二进制转换器,调试特殊字符的大小写映射行为配大小写转换器——三者覆盖日常 Unicode 调试工作流。",
          ],
        },
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
      deepDive: [
        {
          heading: "Unicode 変換は何を示しているのか",
          paragraphs: [
            "あなたが入力するすべての文字は数です。Unicode は各文字にコードポイントを割り当てます。「A」は U+0041、ユーロ記号 € は U+20AC、絵文字は U+1F300 辺り。このツールはその写像を表示します。複数の記法(U+XXXX、10 進、16 進)でコードポイントを示し、BMP を超える文字については JavaScript がメモリに実際に保持する UTF-16 のサロゲートペアも出します。",
            "「見えるもの」と「保存されているもの」の間の落差こそ、このツールが存在する理由です。1 文字に見えるもの——é、旗の絵文字、漢字——は、1 コードポイントかもしれないし、サロゲートの 2 半分かもしれないし、基底文字+結合記号かもしれません。テキストを貼ればどのケースかが分かります。スクリプトが長さを誤数えたり、データベースが誤った境界で切ったりする根源はここです。",
            "コードポイントはバイトと同じではありません。U+00E9 は「鋭アクセント付き e」という概念で、UTF-8 では 2 バイト 0xC3 0xA9 になります。必要なのがバイトでコードポイントでないなら、その問いに答えるのは姉妹ツールのバイナリ変換です。",
          ],
        },
        {
          heading: "エスケープとエンコーディング:u、&# とその仲間",
          paragraphs: [
            "同じ文字が文脈ごとに多くの綴りを持ちます。JSON と JavaScript の文字列では é は \\u00e9(新しい構文では \\u{e9})。HTML では &#233; か &eacute;。CSS では \\00e9。URL ではパーセント符号化された UTF-8 の %C3%A9。これらは別の文字ではなく、同じ数の別の記法体系です。このツールは各文脈に直接貼れる変種を出力します。",
            "防げる 2 つの定番故障:二重エンコード(\\u00e9 をバックスラッシュを再エスケープするシステムに貼ると、リテラルの「\\u00e9」というテキストになる)と、エンコーディングの不一致(ページが宣言する文字セットとファイルの保存文字セットが違い、非 ASCII 文字がすべて置換枠で表示される)。",
            "U+FFFF の BMP 境界は定番の罠です。それより上の文字——多くの絵文字——は 1 つの UTF-16 ユニットに入らないため、エスケープは \\u1f600 ではなく \\ud83d\\ude00 の形になります。\\uXXXX しか扱えない旧システムは、それらを表現すること自体ができません。",
          ],
        },
        {
          heading: "ローカル復号、往復なし",
          paragraphs: [
            "すべてはブラウザの JavaScript で動きます。コードポイントはメモリ内の文字列から直接読みます。アップロードも API もなく、オフラインで動く。重要なのは、最も一般的な用途が、ログや API レスポンスから得た、任意のウェブサービスに貼りたくない文字列のデバッグだという点です。",
            "出力はキー入力ごとに更新されるので、疑わしい文字列を 1 文字ずつ掃いて、どのコードポイントがどこに現れるかを見られます。出力に置換文字 U+FFFD が現れたら、ソーステキストはツールに届く前から既に壊れていた証拠です。",
            "バイト単位の問いにはバイナリ変換、変わった文字での大文字小文字マッピングのデバッグにはケース変換を。3 つで日常の Unicode デバッグの流れを覆います。",
          ],
        },
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
      deepDive: [
        {
          heading: "Qué muestra realmente la conversión Unicode",
          paragraphs: [
            "Cada carácter que escribes es un número. Unicode asigna a cada uno un punto de código — \"A\" es U+0041, el símbolo del euro € es U+20AC, un emoji anda por la gama U+1F300. Esta herramienta muestra ese mapeo: presenta el punto de código en varias notaciones (U+XXXX, decimal, hexadecimal) y, para caracteres fuera del BMP, el par sustituto UTF-16 que JavaScript realmente guarda en memoria.",
            "La brecha entre \"lo que ves\" y \"lo que se almacena\" es la razón de que esta herramienta exista. Un carácter que parece único — é, un emoji de bandera, un ideograma CJK — puede ser un punto de código, dos mitades sustitutas, o un carácter base más signos combinantes. Pegar el texto muestra qué caso te toca, lo que importa cuando un script cuenta mal longitudes o una base de datos corta en la frontera equivocada.",
            "Los puntos de código no son lo mismo que los bytes: U+00E9 es el concepto \"e con agudo\", que se convierte en los dos bytes 0xC3 0xA9 en UTF-8. Si necesitas bytes y no puntos de código, la herramienta hermana para esa pregunta es el conversor binario.",
          ],
        },
        {
          heading: "Escapes y codificaciones: u, &# y amigos",
          paragraphs: [
            "El mismo carácter tiene muchas grafías según el contexto. En cadenas JSON y JavaScript, é se escribe \\u00e9 (o \\u{e9} en sintaxis más nueva). En HTML, &#233; o &eacute;. En CSS, \\00e9. En URL, UTF-8 con codificación porcentual: %C3%A9. Ninguna es un carácter distinto — son sistemas de notación distintos para el mismo número, y esta herramienta saca las variantes que puedes pegar directamente en cada contexto.",
            "Dos modos de fallo habituales que esto evita: la doble codificación (\\u00e9 pegado en un sistema que escapa la barra invertida otra vez, produciendo el texto literal \"\\u00e9\") y el desajuste de codificación (una página declara un charset y el archivo está guardado en otro, así que cada carácter no ASCII se ve como cajas de reemplazo).",
            "La frontera BMP en U+FFFF es la trampa clásica: los caracteres por encima — la mayoría de los emoji — no caben en una unidad UTF-16, así que sus escapes parecen \\ud83d\\ude00 en vez de \\u1f600. Los sistemas viejos que solo manejan escapes \\uXXXX no pueden expresarlos en absoluto.",
          ],
        },
        {
          heading: "Decodificación local, sin viaje",
          paragraphs: [
            "Todo corre en JavaScript del navegador: los puntos de código se leen directamente de la cadena en memoria. Sin subida, sin API, funciona sin conexión — relevante porque el uso más común es depurar una cadena sacada de un registro o respuesta de API que quizá no quieres pegar en un servicio web cualquiera.",
            "La salida se actualiza por pulsación, así que puedes barrer una cadena sospechosa carácter a carácter y ver qué punto de código aparece dónde. El carácter de reemplazo U+FFFD en la salida significa que el texto fuente ya estaba corrupto antes de llegar a la herramienta.",
            "Combinarlo con el conversor binario para preguntas de bytes, y con el conversor de mayúsculas al depurar el mapeo de casos en caracteres exóticos — los tres cubren el flujo cotidiano de depuración Unicode.",
          ],
        },
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
      deepDive: [
        {
          heading: "O que a conversão Unicode realmente mostra",
          paragraphs: [
            "Cada caractere que você digita é um número. O Unicode atribui a cada um um ponto de código — \"A\" é U+0041, o símbolo do euro € é U+20AC, um emoji anda pela faixa U+1F300. Esta ferramenta mostra esse mapeamento: apresenta o ponto de código em várias notações (U+XXXX, decimal, hexadecimal) e, para caracteres fora do BMP, o par substituto UTF-16 que o JavaScript realmente guarda na memória.",
            "A lacuna entre \"o que você vê\" e \"o que é armazenado\" é a razão de esta ferramenta existir. Um caractere que parece único — é, um emoji de bandeira, um ideograma CJK — pode ser um ponto de código, duas metades substitutas, ou um caractere base mais sinais combinantes. Colar o texto mostra qual é o caso, o que importa quando um script conta mal os comprimentos ou um banco corta na fronteira errada.",
            "Pontos de código não são bytes: U+00E9 é o conceito \"e com agudo\", que vira os dois bytes 0xC3 0xA9 em UTF-8. Se você precisa de bytes e não de pontos de código, a ferramenta irmã para essa pergunta é o conversor binário.",
          ],
        },
        {
          heading: "Escapes e codificações: u, &# e amigos",
          paragraphs: [
            "O mesmo caractere tem muitas grafias conforme o contexto. Em strings JSON e JavaScript, é se escreve \\u00e9 (ou \\u{e9} na sintaxe mais nova). Em HTML, &#233; ou &eacute;. Em CSS, \\00e9. Em URL, UTF-8 com codificação percentual: %C3%A9. Nenhuma é um caractere diferente — são sistemas de notação diferentes para o mesmo número, e esta ferramenta emite as variantes que você pode colar direto em cada contexto.",
            "Dois modos de falha comuns que isso evita: a dupla codificação (\\u00e9 colado num sistema que escapa a barra invertida de novo, produzindo o texto literal \"\\u00e9\") e o descasamento de codificação (uma página declara um charset e o arquivo está salvo em outro, então cada caractere não ASCII aparece como quadros de substituição).",
            "A fronteira BMP em U+FFFF é a armadilha clássica: os caracteres acima — a maioria dos emoji — não cabem numa unidade UTF-16, então seus escapes parecem \\ud83d\\ude00 em vez de \\u1f600. Sistemas antigos que só lidam com escapes \\uXXXX não conseguem expressá-los de forma alguma.",
          ],
        },
        {
          heading: "Decodificação local, sem viagem",
          paragraphs: [
            "Tudo roda em JavaScript do navegador: os pontos de código são lidos direto da string na memória. Sem envio, sem API, funciona offline — relevante porque o uso mais comum é depurar uma string tirada de um log ou resposta de API que talvez você não queira colar num serviço web qualquer.",
            "A saída atualiza a cada tecla, então você pode varrer uma string suspeita caractere a caractere e ver qual ponto de código aparece onde. O caractere de substituição U+FFFD na saída significa que o texto-fonte já estava corrompido antes de chegar à ferramenta.",
            "Combine com o conversor binário para perguntas de bytes, e com o conversor de maiúsculas ao depurar o mapeamento de caixa em caracteres exóticos — os três cobrem o fluxo cotidiano de depuração Unicode.",
          ],
        },
      ],
    },
  },
});
