import { FindReplace } from "../_engines/text-engine-findreplace";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "find-and-replace",
  category: "text",
  icon: "code",
  engine: { component: FindReplace },
  related: ["text-diff", "text-cleaner", "remove-duplicate-lines", "text-sorter", "remove-extra-spaces", "word-counter", "lorem-ipsum-generator", "sentence-counter", "text-to-binary", "reverse-text"],
  copy: {
    en: {
      name: "Find and Replace",
      tagline:
        "Find and replace across thousands of words with case, whole-word and regex modes — see the match count before you commit.",
      intro: [
        "One find box, one replace box, three matching modes. Plain text for quick swaps, whole-word mode so 'cat' never lands inside 'category', and regular expressions for patterns — dates, tags, repeated whitespace or anything else you can describe.",
        "Matches are counted as you type and the replacement previews live, so you can see exactly what will change before copying anything out.",
      
        "Regex mode compiles your pattern with the JavaScript RegExp engine — the same engine the browser's own find uses — so capture groups, lookaheads and unicode escapes all work as documented. Whole-word mode wraps the literal in word-boundary anchors, which is the difference between 'cat' matching 'category' and not.",
        "Compared with a text editor's find dialog, the live count plus live preview means you see the total matches and the result of the replacement before committing — no undo gymnastics. And because it runs in the tab, a pasted log file or a sensitive draft is processed locally rather than through an online tool's server.",
      ],
      steps: [
        "Paste the text, then type what to find and what to replace it with.",
        "Pick a mode: case-sensitive, whole words only, or regular expression.",
        "Check the match count, then copy the replaced result.",
      ],
      faqs: [
        {
          q: "Can I use capture groups in regex mode?",
          a: "Yes. Wrap parts of the pattern in parentheses and reference them in the replacement as $1, $2 and so on — for example find '(\\d{4})-(\\d{2})' and replace with '$2/$1'.",
        },
        {
          q: "What does 'whole words only' prevent?",
          a: "It matches only when the term stands alone: searching 'cat' will no longer match 'category' or 'concatenate'.",
        },
        {
          q: "Are $ signs in my replacement treated literally?",
          a: "In plain mode yes — '$100' stays '$100'. In regex mode $ patterns are special ($1 means group 1); escape as \\$ if you need a literal one.",
        },
      ],
      deepDive: [
        {
          heading: "Literal matching versus regular expressions",
          paragraphs: [
            "There are two fundamentally different matching modes. Literal mode treats your search string as plain text: searching for \"3.5\" finds exactly \"3.5\" and never \"335\" or \"365\". Regular-expression mode treats the pattern as a grammar: the dot means \"any character\", so the same pattern matches 3.5, 3x5 and 395. Choosing the wrong mode is the single most common cause of \"the replace did something weird\".",
            "Regular expressions earn their complexity when you need structure rather than strings: match any four-digit year with \\d{4}, capture a name and reuse it in the replacement with parentheses and back-references, or target a value only when it follows a specific label using lookarounds. If you only need to swap one fixed string, literal mode is faster to reason about and impossible to overmatch.",
            "A safe workflow for any nontrivial replacement: run the search first with replacing disabled and read every hit, then enable replace. If the match count surprises you, the pattern is broader than you think — tighten it before replacing, not after.",
          ],
        },
        {
          heading: "The classic replace pitfalls",
          paragraphs: [
            "Case sensitivity quietly halves or doubles your match count: \"Apple\" and \"apple\" are different strings in case-sensitive mode, which is usually what you want for code and not what you want for prose. Whole-word matching exists to stop \"cat\" from matching inside \"category\" — without it, a naive replace can produce \"categoryegory\".",
            "Replacement strings have their own traps: in regex mode, a $ or backslash in your replacement text can be interpreted as a group reference or escape. Writing a literal dollar amount into a regex replacement needs the dollar escaped, or it can pull in a capture group you did not intend.",
            "Multi-line text adds the newline question: patterns that look fine on one line over-match across lines because a dot can consume line breaks depending on the flags. Anchoring patterns to word boundaries or explicit line structure is the reliable fix.",
          ],
        },
        {
          heading: "Everything happens on the page",
          paragraphs: [
            "The matching and replacing run entirely in browser JavaScript over the text currently in the box. There is no upload, no preview service, no server-side index of your content — a contract draft, log file or personal note is processed by the same machine that displays it.",
            "This makes the tool a reasonable choice for text you would not paste into a random web app: internal documentation, customer data for a quick scrub, source code you are about to commit. Close the tab and nothing remains.",
            "For very large files, browser tools eventually hit memory limits — a half-megabyte log is comfortable, a gigabyte dump is not. At that scale a command-line sed stays the right tool; for everything under a few megabytes this page is faster to open than a terminal.",
          ],
        },
      ],
    },
    zh: {
      name: "查找替换",
      tagline: "区分大小写、整词匹配、正则表达式三种模式批量查找替换——先看匹配计数,再放心替换。",
      intro: [
        "一个查找框、一个替换框、三种匹配模式。纯文本模式适合快速替换,整词模式保证 'cat' 不会命中 'category' 内部,正则模式则能处理日期、标签、重复空白等任何模式。",
        "输入的同时统计匹配次数,替换结果实时预览,复制之前就能看清会改什么。",
      ],
      steps: [
        "粘贴文本,输入要查找的内容和替换成的内容。",
        "选择模式:区分大小写、仅整词或正则表达式。",
        "核对匹配计数,复制替换后的结果。",
      ],
      faqs: [
        {
          q: "正则模式里能用捕获组吗?",
          a: "可以。把模式的一部分用括号包起来,替换里用 $1、$2 引用,比如查找 '(\\d{4})-(\\d{2})',替换成 '$2/$1'。",
        },
        {
          q: "“仅整词匹配”防住了什么?",
          a: "它只在词独立出现时匹配:搜 'cat' 不会再命中 'category' 或 'concatenate' 内部。",
        },
        {
          q: "替换文本里的 $ 会按字面处理吗?",
          a: "普通模式会——'$100' 就是 '$100'。正则模式里 $ 是特殊符号($1 表示第 1 组),需要字面 $ 时写成 \\$。",
        },
      ],
      deepDive: [
        {
          heading: "字面匹配与正则表达式",
          paragraphs: [
            "匹配有两条根本不同的路线。字面模式把搜索串当纯文本:搜 “3.5” 就只命中 “3.5”,绝不会命中 “335” 或 “365”。正则模式把模式当语法:点号表示“任意字符”,同一个模式会同时命中 3.5、3x5 和 395。“替换后结果很奇怪”的最常见原因就是选错了模式。",
            "正则的复杂性在有结构需求时才值得:用 \\d{4} 匹配任意四位年份,用括号捕获组在替换里复用一段内容,用环视把命中限定在某个标签之后。如果只是换一个固定字符串,字面模式更好想、也不会过匹配。",
            "对任何不平凡的替换,稳妥流程是:先关掉替换只跑搜索,逐条看命中;再开启替换。如果命中数让你意外,说明模式比你想的宽——先收紧模式,别替换完再收拾。",
          ],
        },
        {
          heading: "替换的经典陷阱",
          paragraphs: [
            "大小写敏感会悄悄改变命中数:“Apple” 和 “apple” 在敏感模式下是两个字符串——写代码时通常正合适,改文章时通常不是你想要的。全词匹配的存在就是为了阻止 “cat” 命中 “category” 里的片段;没有它,一次朴素替换能把文本弄出 “categoryegory” 这种怪物。",
            "替换串自身也有坑:正则模式下,替换文本里的 $ 或反斜杠可能被解释成组引用或转义。往正则替换里写美元金额,要么转义美元符,要么它可能拉进一个你没打算用的捕获组。",
            "多行文本还有换行问题:单行上看不出毛病的模式,跨行时会过匹配——取决于开关,点号可能吞掉换行符。把模式锚定到词边界或显式行结构是最可靠的修法。",
          ],
        },
        {
          heading: "一切都在页面上发生",
          paragraphs: [
            "匹配与替换完全在浏览器 JavaScript 里、对当前文本框里的内容执行。没有上传、没有预览服务、没有服务端索引——合同草稿、日志文件、私人笔记,处理它们的机器就是显示它们的机器。",
            "这让本工具适合处理你不会随便贴进陌生网页应用的文本:内部文档、要快速清洗的客户数据、即将提交的源码。关掉标签页,什么都不留。",
            "超大文件终究受浏览器内存限制:半兆的日志很从容,一个 G 的导出文件不行。那个量级该用命令行的 sed;几兆以内,开这个页面比开终端快。",
          ],
        },
      ],
    },
    ja: {
      name: "検索と置換",
      tagline: "大文字小文字の区別・単語単位・正規表現の 3 モードで一括置換。マッチ数を確認してから確実に置き換えられます。",
      intro: [
        "検索欄 1 つ、置換欄 1 つ、マッチングモードは 3 種類。普通のテキスト置換はそのまま、単語単位なら 'cat' が 'category' の中で引っかからず、正規表現なら日付・タグ・連続する空白など任意のパターンを処理できます。",
        "入力しながらマッチ数を数え、置換結果もリアルタイムでプレビュー。コピーする前に変更内容を正確に確認できます。",
      ],
      steps: [
        "テキストを貼り付け、検索語と置換後の語を入力します。",
        "モードを選びます:大文字小文字を区別、単語単位、または正規表現。",
        "マッチ数を確認し、置換結果をコピーします。",
      ],
      faqs: [
        {
          q: "正規表現モードでキャプチャ グループは使えますか?",
          a: "使えます。パターンの一部を括弧で囲み、置換側で $1、$2 と参照します。例:「(\\d{4})-(\\d{2})」を検索し「$2/$1」に置換。",
        },
        {
          q: "「単語単位で検索」は何を防ぎますか?",
          a: "語が独立している場合だけマッチします。'cat' で検索しても 'category' や 'concatenate' の内部には引っかかりません。",
        },
        {
          q: "置換テキストの $ は文字通り扱われますか?",
          a: "通常モードでは文字通りです('$100' は '$100' のまま)。正規表現モードでは $ は特別な意味を持ち($1 はグループ 1)、文字として使う場合は \\$ とします。",
        },
      ],
      deepDive: [
        {
          heading: "リテラル一致と正規表現",
          paragraphs: [
            "マッチングには根本的に異なる 2 つのモードがあります。リテラルモードは検索文字列を素のテキストとして扱い、「3.5」の検索は「3.5」だけに一致し、「335」や「365」には決して一致しません。正規表現モードはパターンを文法として扱い、ドットは「任意の 1 文字」を意味するため、同じパターンが 3.5・3x5・395 のすべてに一致します。「置換後の結果がおかしい」最大の原因は、このモードの選択間違いです。",
            "正規表現の複雑さが報われるのは、文字列ではなく構造が必要なときです。\\d{4} で 4 桁の年を拾う、括弧のキャプチャで置換側に再利用する、先後読みで特定ラベルの後ろだけを対象にする。固定文字列の交換だけなら、リテラルモードのほうが考えやすく、過剰一致もしません。",
            "自明でない置換の安全な手順は、まず置換を無効のまま検索だけ走らせて全件を確認し、それから置換を有効にすることです。一致数が想定外なら、パターンが思ったより広い証拠です。後始末ではなく、置換の前に締めます。",
          ],
        },
        {
          heading: "置換の古典的な落とし穴",
          paragraphs: [
            "大文字小文字の区別は一致数を静かに変えます。コードでは区別が通常正しく、文章では通常望ましくない「Apple」と「apple」の差です。単語一致は「cat」が「category」の内部に一致するのを防ぐためのもので、なければ素朴な置換が「categoryegory」のような怪物を作ります。",
            "置換文字列にも罠があります。正規表現モードでは、置換側の $ やバックスラッシュがグループ参照やエスケープとして解釈され得ます。金額のドル記号を入れるにはエスケープが必要で、さもないと意図しないキャプチャを取り込むことがあります。",
            "複数行テキストでは改行の問題が加わります。1 行では問題なさそうなパターンが、フラグによってはドットが改行を飲み込んで行をまたいで過剰一致します。語境界や明示的な行構造へのアンカーが確実な修正です。",
          ],
        },
        {
          heading: "すべてはページの中で",
          paragraphs: [
            "一致と置換はブラウザの JavaScript が、テキストボックス内の現在の内容に対して完全に実行します。アップロードもプレビューサービスもサーバー側の索引もなく、契約書の下書き・ログファイル・個人的なメモを処理するのは、それを表示しているのと同じマシンです。",
            "そのため、見知らぬウェブアプリに貼る気になれないテキスト——社内ドキュメント、簡単に整形したい顧客データ、コミット前のソースコード——に適した選択肢になります。タブを閉じれば何も残りません。",
            "巨大ファイルは最終的にブラウザのメモリ制限に当たります。0.5 MB のログは余裕ですが、1 GB のダンプは無理です。その規模ではコマンドラインの sed が正解で、数 MB 以下ならこのページを開くほうがターミナルより速いです。",
          ],
        },
      ],
    },
    es: {
      name: "Buscar y reemplazar",
      tagline:
        "Busca y reemplaza en miles de palabras con modos de mayúsculas, palabra completa y expresiones regulares — cuenta las coincidencias antes de confirmar.",
      intro: [
        "Un cuadro para buscar, otro para reemplazar y tres modos de coincidencia. Texto plano para cambios rápidos, modo palabra completa para que «cat» no caiga dentro de «concatenate», y expresiones regulares para patrones: fechas, etiquetas, espacios repetidos o lo que puedas describir.",
        "Las coincidencias se cuentan mientras escribes y el reemplazo se previsualiza en vivo, así que ves exactamente qué cambiará antes de copiar nada.",
      ],
      steps: [
        "Pega el texto y escribe qué buscar y con qué reemplazar.",
        "Elige un modo: distinguir mayúsculas, solo palabras completas o expresión regular.",
        "Comprueba el recuento de coincidencias y copia el resultado reemplazado.",
      ],
      faqs: [
        {
          q: "¿Puedo usar grupos de captura en modo regex?",
          a: "Sí. Rodea partes del patrón con paréntesis y referencíalas en el reemplazo como $1, $2… por ejemplo busca '(\\d{4})-(\\d{2})' y reemplaza con '$2/$1'.",
        },
        {
          q: "¿Qué evita «solo palabras completas»?",
          a: "Solo coincide cuando el término va solo: buscar «cat» ya no dará con «category» ni caerá dentro de «concatenate».",
        },
        {
          q: "¿Los $ del reemplazo se toman literalmente?",
          a: "En modo normal sí: «$100» sigue siendo «$100». En modo regex los patrones $ son especiales ($1 = grupo 1); escapa como \\$ si necesitas uno literal.",
        },
      ],
      deepDive: [
        {
          heading: "Coincidencia literal frente a expresiones regulares",
          paragraphs: [
            "Hay dos modos de coincidencia fundamentalmente distintos. El modo literal trata la cadena como texto plano: buscar \"3.5\" encuentra exactamente \"3.5\" y nunca \"335\" ni \"365\". El modo de expresión regular trata el patrón como una gramática: el punto significa \"cualquier carácter\", así que el mismo patrón encuentra 3.5, 3x5 y 395. La causa más común de \"el reemplazo hizo algo raro\" es elegir el modo equivocado.",
            "La complejidad de las regex se paga sola cuando necesitas estructura, no cadenas: \\d{4} para cualquier año de cuatro dígitos, paréntesis para capturar y reutilizar en el reemplazo, o lookarounds para apuntar a un valor solo cuando sigue a una etiqueta concreta. Si solo quieres intercambiar una cadena fija, el modo literal es más fácil de razonar e imposible de sobre-coincidir.",
            "Flujo seguro para reemplazos nada triviales: ejecuta primero la búsqueda con el reemplazo desactivado y lee cada coincidencia; después activa el reemplazo. Si el número de coincidencias te sorprende, el patrón es más ancho de lo que crees — aprieta antes de reemplazar, no después.",
          ],
        },
        {
          heading: "Las trampas clásicas del reemplazo",
          paragraphs: [
            "La sensibilidad a mayúsculas cambia el recuento en silencio: \"Apple\" y \"apple\" son cadenas distintas en modo sensible, lo que suele ser lo correcto para código y no para prosa. La coincidencia de palabra completa existe para que \"cat\" no acierte dentro de \"category\" — sin ella, un reemplazo ingenuo puede fabricar \"categoryegory\".",
            "Las cadenas de reemplazo tienen sus propias trampas: en modo regex, un $ o una barra invertida en el texto de reemplazo puede interpretarse como referencia de grupo o escape. Escribir un importe en dólares en un reemplazo regex exige escapar el dólar, o puede arrastrar un grupo de captura no deseado.",
            "El texto multilínea añade la cuestión del salto de línea: patrones que se ven bien en una línea sobre-coinciden entre líneas porque el punto puede consumir saltos según las banderas. Anclar a límites de palabra o a estructura de línea explícita es la solución fiable.",
          ],
        },
        {
          heading: "Todo ocurre en la página",
          paragraphs: [
            "La búsqueda y el reemplazo se ejecutan por completo en JavaScript del navegador sobre el texto del cuadro. No hay subida, ni servicio de previsualización, ni índice en servidor: un borrador de contrato, un registro o una nota personal los procesa la misma máquina que los muestra.",
            "Por eso es una opción razonable para texto que no pegarías en una app web cualquiera: documentación interna, datos de clientes para un repaso rápido, código a punto de confirmar. Cierras la pestaña y no queda nada.",
            "Los archivos muy grandes acaban chocando con la memoria del navegador: medio megabyte de registro va cómodo, un volcado de un gigabyte no. A esa escala manda un sed de línea de comandos; por debajo de unos megabytes, abrir esta página es más rápido que abrir una terminal.",
          ],
        },
      ],
    },
    pt: {
      name: "Localizar e substituir",
      tagline:
        "Localize e substitua em milhares de palavras com modos de maiúsculas, palavra inteira e expressão regular — veja a contagem antes de confirmar.",
      intro: [
        "Uma caixa para localizar, outra para substituir e três modos de correspondência. Texto simples para trocas rápidas, modo de palavra inteira para que 'gato' nunca caia dentro de 'catalogar', e expressões regulares para padrões — datas, tags, espaços repetidos ou o que você descrever.",
        "As ocorrências são contadas enquanto você digita e a substituição aparece ao vivo, então você vê exatamente o que muda antes de copiar qualquer coisa.",
      ],
      steps: [
        "Cole o texto, digite o que localizar e pelo que substituir.",
        "Escolha o modo: diferenciar maiúsculas, apenas palavras inteiras ou expressão regular.",
        "Confira a contagem de ocorrências e copie o resultado substituído.",
      ],
      faqs: [
        {
          q: "Posso usar grupos de captura no modo regex?",
          a: "Sim. Envolva partes do padrão com parênteses e referencie na substituição como $1, $2… por exemplo localize '(\\d{4})-(\\d{2})' e substitua por '$2/$1'.",
        },
        {
          q: "O que “apenas palavras inteiras” evita?",
          a: "Ela só corresponde quando o termo está sozinho: buscar 'gato' não vai mais pegar 'catalogar' nem cair dentro de 'concatenar'.",
        },
        {
          q: "Os $ na substituição são literais?",
          a: "No modo simples, sim — '$100' continua '$100'. No modo regex o $ é especial ($1 = grupo 1); escape como \\$ se precisar de um literal.",
        },
      ],
      deepDive: [
        {
          heading: "Correspondência literal versus expressões regulares",
          paragraphs: [
            "Há dois modos de correspondência fundamentalmente diferentes. O modo literal trata a string como texto puro: buscar \"3.5\" encontra exatamente \"3.5\" e nunca \"335\" nem \"365\". O modo de expressão regular trata o padrão como uma gramática: o ponto significa \"qualquer caractere\", então o mesmo padrão encontra 3.5, 3x5 e 395. A causa mais comum de \"o substituto fez algo estranho\" é escolher o modo errado.",
            "A complexidade das regex se paga quando você precisa de estrutura, não de strings: \\d{4} para qualquer ano de quatro dígitos, parênteses para capturar e reutilizar no replacement, ou lookarounds para mirar um valor só quando segue um rótulo específico. Se você só precisa trocar uma string fixa, o modo literal é mais fácil de raciocinar e impossível de sobre-corresponder.",
            "Fluxo seguro para substituições nada triviais: rode antes a busca com o replace desativado e leia cada ocorrência; depois ative o replace. Se a contagem de ocorrências surpreender, o padrão é mais largo do que você pensa — aperte antes de substituir, não depois.",
          ],
        },
        {
          heading: "As armadilhas clássicas do replace",
          paragraphs: [
            "A sensibilidade a maiúsculas muda a contagem em silêncio: \"Apple\" e \"apple\" são strings diferentes no modo sensível, o que costuma ser correto para código e indesejado para prosa. A correspondência de palavra inteira existe para impedir que \"cat\" acerte dentro de \"category\" — sem ela, um replace ingênuo pode fabricar \"categoryegory\".",
            "As strings de substituição têm armadilhas próprias: no modo regex, um $ ou barra invertida no texto de substituição pode ser interpretado como referência de grupo ou escape. Escrever um valor em dólar num replacement regex exige escapar o cifrão, senão ele pode puxar um grupo de captura indesejado.",
            "Texto multilinha acrescenta a questão da quebra de linha: padrões que parecem bons numa linha sobre-correspondem entre linhas porque o ponto pode consumir quebras dependendo das flags. Ancorar a limites de palavra ou estrutura de linha explícita é a correção confiável.",
          ],
        },
        {
          heading: "Tudo acontece na página",
          paragraphs: [
            "A busca e a substituição rodam inteiramente em JavaScript do navegador sobre o texto da caixa. Não há upload, serviço de prévia nem índice no servidor: um rascunho de contrato, um log ou uma nota pessoal são processados pela mesma máquina que os exibe.",
            "Por isso é uma escolha razoável para texto que você não colaria num app web qualquer: documentação interna, dados de clientes para uma limpeza rápida, código prestes a ir para o commit. Feche a aba e nada resta.",
            "Arquivos muito grandes acabam esbarrando na memória do navegador: meio megabyte de log vai tranquilo, um dump de um gigabyte não. Nessa escala um sed de linha de comando é o correto; abaixo de alguns megabytes, abrir esta página é mais rápido que abrir um terminal.",
          ],
        },
      ],
    },
  },
});
