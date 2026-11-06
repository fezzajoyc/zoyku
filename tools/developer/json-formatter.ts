import { DevCodeEngine } from "../_engines/dev-engine-code";
import { defineTool } from "../_lib/types";

const SAMPLE = '{"name":"Zoyku","tags":["dev","json"],"nested":{"ok":true,"count":3}}';

export default defineTool({
  slug: "json-formatter",
  category: "developer",
  icon: "code",
  featured: true,
  engine: { component: DevCodeEngine, props: { mode: "json-beautify", indent: true, sort: true, sample: SAMPLE } },
  related: ["json-validator", "json-minifier", "json-to-csv", "csv-to-json", "markdown-previewer", "md5-generator", "sha256-generator", "base64-image", "url-encoder", "html-minifier"],
  copy: {
    en: {
      name: "JSON Formatter",
      tagline:
        "Format and beautify messy JSON online — 2 spaces, 4 spaces or tabs, with instant validation and precise error locations. 100% in your browser.",
      intro: [
        "Paste minified or badly indented JSON and get clean, readable output immediately. Choose 2 spaces, 4 spaces or tab indentation, and the result updates live as you type or edit — perfect for inspecting API responses, config files and log payloads. Frontend developers debugging fetch() payloads, backend engineers reading service logs, and QA staff reviewing captured request bodies all hit this task daily.",
        "Formatting only changes whitespace, never data: keys, values and key order stay byte-for-byte identical, only line breaks and indentation are added. Numbers are parsed as IEEE-754 doubles like in every JavaScript engine, so integers above 2^53 (for example IDs like 9007199254740993) can display rounded — paste them as strings if exact digits matter.",
        "Parsing follows the JSON grammar from RFC 8259: the document must be a single object, array, string, number, boolean or null. On success the formatter re-serializes with your chosen indentation; on failure it reports the exact line and column of the syntax error, so a missing comma or bracket takes seconds to find instead of minutes.",
        "A minifier does the opposite job — stripping all whitespace into one line for transport — and this tool pairs with that workflow: beautify to read, minify to ship. Compared with a plain validator, you also get a copyable, readable version; compared with an editor's built-in formatter, no project setup, plugin or file save is required.",

      ],
      steps: [
        "Paste your JSON into the input box.",
        "Pick an indentation: 2 spaces, 4 spaces or a tab.",
        "Copy the beautified result — or fix the reported line and column if the JSON is invalid.",
      ],
      faqs: [
        {
          q: "Is there a size limit for the JSON I can format?",
          a: "There is no hard limit — formatting happens locally in your browser. Very large files (tens of MB) may feel slow because the result recalculates as you type, so paste them in one go and edit carefully.",
        },
        {
          q: "Does formatting change my data?",
          a: "No. The values, key order and structure stay exactly the same; only whitespace and line breaks are added. The output is byte-for-byte equivalent JSON.",
        },
        {
          q: "Is my JSON uploaded to a server?",
          a: "No. Everything runs locally in your browser with JavaScript — your data never leaves your device.",
        },
      ],
      deepDive: [
        {
          heading: "Formatting changes whitespace, never meaning",
          paragraphs: [
            "Beautification is purely a whitespace operation: the input is parsed into a data structure, then re-serialized with your chosen indentation. Keys, values, nesting depth and key order come out exactly as they went in — two JSON documents that differ only in whitespace parse to the same value and are interchangeable for any program that consumes them.",
            "One nuance worth knowing: number formatting can shift in display. JSON numbers are parsed as IEEE-754 doubles, so very large integers — anything above 2^53, such as snowflake IDs — may print with rounded digits. The value was already lossy at parse time in every JavaScript engine; the formatter did not invent the rounding. When exact digits matter, IDs should travel as strings in your JSON.",
            "What formatting cannot do is reorder or rename anything. Some tools offer key sorting as an optional extra, which is convenient for diffing config files, but treat it as a separate, deliberate step — a formatter that silently reorders keys makes byte-level comparison against the original impossible.",
          ],
        },
        {
          heading: "Choosing an indentation width",
          paragraphs: [
            "Two spaces is the de facto standard in the JavaScript ecosystem — npm packages, most style guides and the majority of frontend codebases use it, so it is the safest default when pasting into a team codebase. Four spaces remains common in older enterprise and Java-adjacent code. Tabs win on accessibility: each reader sets their own display width, at the cost of mixed tab/space files rendering inconsistently.",
            "The width matters more than it seems because diffs are whitespace-sensitive. If your team's linter enforces two spaces and you format with four, every line shows as changed in review even though nothing semantic moved. Match the convention of the file's destination before you paste the output.",
            "For throwaway inspection — reading an API response, checking a log line — indentation choice is pure preference. Pick whichever makes the nesting depth easiest to follow with your eyes; the tool updates live, so switching costs nothing.",
          ],
        },
        {
          heading: "Beautify to read, minify to ship, all on-device",
          paragraphs: [
            "Formatting and minifying are two ends of one workflow. Pretty-print for humans: code review, debugging, comparing payloads. Minify for machines: transport, storage and caching, where every byte of indentation is dead weight. This tool pairs with the JSON minifier — beautify to inspect an incoming payload, minify before sending it back out.",
            "Unlike editor formatters, nothing needs to be installed or configured: no project, no plugin, no saving a file to disk just to reformat it. Paste, read, copy. That makes it the fastest loop for the most common case — one payload from a browser tab you will close in a minute.",
            "Your JSON is parsed entirely in this browser tab. Responses from staging APIs, log lines with user data and config files containing secrets never touch a server — the tool also works offline, so a VPN hiccup or a flight does not interrupt a debugging session.",
          ],
        },
      ],
    },
    zh: {
      name: "JSON 格式化",
      tagline: "在线美化凌乱的 JSON——支持 2 空格、4 空格或 Tab 缩进,即时校验并精确报错,全程在浏览器本地完成。",
      intro: [
        "粘贴压缩过或缩进混乱的 JSON,立即得到干净易读的结果。可选 2 空格、4 空格或 Tab 缩进,边输入边刷新——适合查看 API 响应、配置文件和日志负载。",
        "JSON 不合法也不会卡住:格式化工具会精确定位语法错误所在的行和列,少个逗号、少个括号几秒钟就能找到。",
      ],
      steps: [
        "把 JSON 粘贴到输入框。",
        "选择缩进:2 空格、4 空格或 Tab。",
        "复制美化结果;若 JSON 不合法,按提示的行列位置修复即可。",
      ],
      faqs: [
        {
          q: "能格式化的 JSON 有大小限制吗?",
          a: "没有硬性限制——格式化在浏览器本地完成。超大文件(几十 MB)因为边输入边计算可能变慢,建议整段粘贴后小心编辑。",
        },
        {
          q: "格式化会改动我的数据吗?",
          a: "不会。值、键顺序和结构完全不变,只增加空白和换行,输出与原文在数据上完全等价。",
        },
        {
          q: "JSON 会被上传到服务器吗?",
          a: "不会。一切都在浏览器里用 JavaScript 本地完成,数据不会离开你的设备。",
        },
      ],
      deepDive: [
        {
          heading: "格式化只动空白,不动语义",
          paragraphs: [
            "美化是纯粹的空白操作:先把输入解析成数据结构,再按你选的缩进重新序列化。键、值、嵌套深度、键顺序原样进出——两份只差空白的 JSON 解析出的值相同,对任何消费它的程序来说完全可以互换。",
            "有一个值得知道的细节:数字的显示可能发生变化。JSON 数字按 IEEE-754 双精度解析,超大整数——超过 2^53 的,比如雪花 ID——打印时可能出现尾数被舍入的情况。这是解析时就发生的精度损失,任何 JavaScript 引擎都一样,不是格式化工具发明出来的。要求数字位完全一致时,ID 应该以字符串形式放进 JSON。",
            "格式化不能做的是重排或改名。有些工具提供键排序作为可选功能,对比配置文件时确实方便,但要当成一个单独的、明确的步骤——悄悄重排键的格式化工具会让和原文的逐字节比对变得不可能。",
          ],
        },
        {
          heading: "缩进宽度怎么选",
          paragraphs: [
            "两空格是 JavaScript 生态的事实标准——npm 包、主流风格指南、大多数前端代码库都用它,所以往团队代码库里贴的时候它是最安全的默认值。四空格在较老的企业项目和 Java 系代码里仍然常见。Tab 的优势在无障碍:每个读者自己设定显示宽度,代价是 Tab 和空格混用的文件渲染不一致。",
            "宽度看似小事,实际影响不小,因为 diff 对空白敏感。团队 lint 规定两空格而你格式化成四空格,review 里每一行都会显示为改动——尽管语义上什么都没动。贴出结果之前,先对齐目标文件遵循的约定。",
            "至于临时查看——看一眼 API 响应、检查一条日志——缩进选哪种纯属偏好。哪种让嵌套层次最一目了然就用哪种;工具是实时刷新的,切换毫无成本。",
          ],
        },
        {
          heading: "阅读用美化,传输用压缩,全程在本机",
          paragraphs: [
            "格式化和压缩是同一条工作流的两端。给人看就美化:code review、调试、对比 payload。给机器用就压缩:传输、存储、缓存,每一字节缩进都是死重量。它和 JSON 压缩工具是搭档——收到 payload 先美化查看,发回去之前再压成一行。",
            "和编辑器内置格式化不同,这里不用装任何东西:不需要项目、不需要插件、也不必为了一次重排把文件存到磁盘。粘贴、看、复制。对于最常见的场景——浏览器标签页里的一条 payload,一分钟后就关掉——这是最快的循环。",
            "你的 JSON 完全在这个浏览器标签页里解析。预发环境的 API 响应、带用户数据的日志、含密钥的配置文件不会碰到任何服务器——工具离线也能用,VPN 抖一下或坐飞机都不会打断调试。",
          ],
        },
      ],
    },
    ja: {
      name: "JSON フォーマッター",
      tagline:
        "乱れた JSON をオンラインで整形 — 2 スペース・4 スペース・タブに対応し、即時検証と正確なエラー位置表示。すべてブラウザ内で完結します。",
      intro: [
        "圧縮された JSON やインデントが崩れた JSON を貼り付けるだけで、すぐに読みやすい出力に。2 スペース・4 スペース・タブから選べ、入力しながらリアルタイムで更新されます。API レスポンス・設定ファイル・ログの確認に最適です。",
        "JSON が不正でも困りません。構文エラーの行と列を正確に表示するので、カンマや括弧の抜けも数秒で見つかります。",
      ],
      steps: [
        "JSON を入力欄に貼り付けます。",
        "インデントを選択:2 スペース・4 スペース・タブ。",
        "整形結果をコピー。不正な場合は表示された行・列を修正します。",
      ],
      faqs: [
        {
          q: "整形できる JSON にサイズ上限はありますか?",
          a: "上限はありません。整形はブラウザ内で完結します。ただし非常に大きなファイル(数十 MB)は入力ごとに再計算されるため遅くなることがあります。",
        },
        {
          q: "整形によってデータは変わりますか?",
          a: "いいえ。値・キーの順序・構造はそのまま、空白と改行が追加されるだけです。データとしては完全に等価です。",
        },
        {
          q: "JSON はサーバーに送信されますか?",
          a: "いいえ。すべてブラウザ内の JavaScript でローカルに処理され、データは端末の外に出ません。",
        },
      ],
      deepDive: [
        {
          heading: "整形が変えるのは空白だけ、意味は変えない",
          paragraphs: [
            "美化は純粋な空白の操作です。入力をデータ構造に解析し、選んだインデントで再シリアライズします。キー・値・ネストの深さ・キーの順序はそのまま出入りします。空白しか違わない 2 つの JSON は同じ値に解析され、それを消費するどんなプログラムから見ても交換可能です。",
            "知っておくべき細かい点があります。数値の表示が変わることがあります。JSON の数値は IEEE-754 の倍精度として解析され、2^53 を超える巨大整数(スノーフレーク ID など)は下位桁が丸められて表示されることがあります。これは解析時点ですでに起きている精度の損失で、どの JavaScript エンジンでも同じです。整形ツールが丸めを作り出したのではありません。桁の正確さが重要なら、ID は文字列として JSON に持たせるべきです。",
            "整形にできないのは並べ替えと改名です。キーのソートをオプションで出すツールもあります。設定ファイルの diff には確かに便利ですが、それは独立した明示的なステップとして扱うべきです。黙ってキーを並べ替える整形器は、元データとのバイト単位の比較を不可能にします。",
          ],
        },
        {
          heading: "インデント幅の選び方",
          paragraphs: [
            "2 スペースは JavaScript エコシステムの事実上の標準です。npm パッケージ、主要なスタイルガイド、大半のフロントエンド コードベースが採用しており、チームのコードに貼るなら最も安全な既定値です。4 スペースは古めのエンタープライズ系や Java 系コードにまだよく見られます。タブはアクセシビリティで有利です。表示幅を読む人が決められますが、タブとスペースの混在ファイルは表示が崩れます。",
            "幅は見た目以上に重要です。diff は空白に敏感だからです。チームの lint が 2 スペースを強制しているのに 4 スペースで整形すると、意味は一ミリも動いていないのに review では全行が変更扱いになります。貼り付ける前に、出力先のファイルが従う規約に合わせてください。",
            "一時的な確認——API レスポンスを見る、ログの 1 行をチェックする——であれば、インデントは純粋な好みです。ネストの深さが一番追いやすいものを選べばいい。ツールはリアルタイム更新なので、切り替えにコストはありません。",
          ],
        },
        {
          heading: "読むなら整形、送るなら圧縮、処理は端末内",
          paragraphs: [
            "整形と圧縮は一つのワークフローの両端です。人間が読むなら整形。code review、デバッグ、payload 比較です。機械に渡すなら圧縮。転送・保存・キャッシュでは、インデントの 1 バイト 1 バイトが死重です。JSON 圧縮ツールと対で使えます。届いた payload は整形して確認し、返す前に 1 行に圧縮する。",
            "エディタの整形機能と違って、インストールも設定も不要です。プロジェクトもプラグインも、整形のためだけにファイルを保存することも要りません。貼る、読む、コピーする。最もよくあるケース——1 分後に閉じるタブの中の payload 一つ——には、これが最短ループです。",
            "あなたの JSON はこのブラウザのタブの中だけで解析されます。ステージング環境の API レスポンス、ユーザー データ入りのログ、秘密情報入りの設定ファイルはサーバーに触れません。オフラインでも動くので、VPN の瞬断もフライトもデバッグを止めません。",
          ],
        },
      ],
    },
    es: {
      name: "Formateador JSON",
      tagline:
        "Formatea y embellece JSON desordenado en línea: 2 espacios, 4 espacios o tabulaciones, con validación instantánea y errores localizados al carácter.",
      intro: [
        "Pega JSON minificado o mal indentado y obtén una salida limpia al instante. Elige 2 espacios, 4 espacios o tabulación; el resultado se actualiza mientras escribes — ideal para inspeccionar respuestas de API, archivos de configuración y logs.",
        "Un JSON inválido no es un callejón sin salida: el formateador señala la línea y columna exactas del error de sintaxis, así que una coma o llave perdida se encuentra en segundos.",
      ],
      steps: [
        "Pega tu JSON en el cuadro de entrada.",
        "Elige la indentación: 2 espacios, 4 espacios o tabulación.",
        "Copia el resultado formateado, o corrige la línea y columna indicadas si el JSON es inválido.",
      ],
      faqs: [
        {
          q: "¿Hay un límite de tamaño para el JSON?",
          a: "No hay límite estricto: el formateo ocurre localmente en tu navegador. Archivos muy grandes (decenas de MB) pueden ir lentos porque el resultado se recalcula al escribir.",
        },
        {
          q: "¿El formateo cambia mis datos?",
          a: "No. Los valores, el orden de las claves y la estructura se mantienen; solo se añaden espacios y saltos de línea. El JSON resultante es equivalente.",
        },
        {
          q: "¿Mi JSON se sube a algún servidor?",
          a: "No. Todo se ejecuta localmente en tu navegador con JavaScript: tus datos nunca salen de tu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "El formateo solo toca espacios en blanco, nunca el significado",
          paragraphs: [
            "Embellecer es una operación puramente de espacios en blanco: la entrada se parsea a una estructura de datos y se re-serializa con la indentación elegida. Claves, valores, profundidad de anidamiento y orden de claves entran y salen idénticos — dos documentos JSON que solo difieren en espacios parsean al mismo valor y son intercambiables para cualquier programa que los consuma.",
            "Un matiz que conviene conocer: la visualización de números puede cambiar. Los números JSON se parsean como dobles IEEE-754, así que los enteros muy grandes — todo lo que supere 2^53, como los IDs tipo snowflake — pueden imprimirse con dígitos redondeados. La pérdida ocurrió al parsear, como en cualquier motor JavaScript; el formateador no inventó el redondeo. Cuando los dígitos exactos importan, los IDs deberían viajar como cadenas dentro del JSON.",
            "Lo que el formateo no puede hacer es reordenar o renombrar nada. Algunas herramientas ofrecen ordenar claves como extra, lo cual es cómodo para hacer diff de archivos de configuración, pero trátalo como un paso aparte y deliberado — un formateador que reordena claves en silencio hace imposible la comparación byte a byte con el original.",
          ],
        },
        {
          heading: "Cómo elegir la anchura de la indentación",
          paragraphs: [
            "Dos espacios es el estándar de facto del ecosistema JavaScript — paquetes de npm, la mayoría de las guías de estilo y gran parte de las bases de código frontend lo usan, así que es la opción más segura al pegar en el código de un equipo. Cuatro espacios sigue siendo común en código empresarial veterano y de tradición Java. La tabulación gana en accesibilidad: cada lector ajusta su propio ancho, a cambio de que los archivos mixtos tab/espacio se muestren de forma inconsistente.",
            "La anchura importa más de lo que parece porque los diffs son sensibles al espacio en blanco. Si el linter de tu equipo exige dos espacios y tú formateas con cuatro, cada línea aparece como cambiada en review aunque nada semántico se haya movido. Antes de pegar la salida, ajusta la convención del archivo de destino.",
            "Para inspecciones desechables — leer una respuesta de API, mirar una línea de log — la elección es pura preferencia. Elige la que haga el anidamiento más fácil de seguir a simple vista; la herramienta se actualiza en vivo, así que cambiar no cuesta nada.",
          ],
        },
        {
          heading: "Embellece para leer, minifica para enviar, todo en tu equipo",
          paragraphs: [
            "Formatear y minificar son los dos extremos de un mismo flujo de trabajo. Pretty-print para humanos: revisión de código, depuración, comparar payloads. Minificar para máquinas: transporte, almacenamiento y caché, donde cada byte de indentación es peso muerto. Esta herramienta hace pareja con el minificador JSON — embellece para inspeccionar un payload entrante, minifica antes de volver a enviarlo.",
            "A diferencia de los formateadores de editores, aquí no hay nada que instalar ni configurar: sin proyecto, sin plugin, sin guardar un archivo en disco solo para reindentarlo. Pegar, leer, copiar. Para el caso más común — un payload en una pestaña que cerrarás en un minuto — es el ciclo más rápido posible.",
            "Tu JSON se parsea íntegramente en esta pestaña del navegador. Respuestas de APIs de staging, líneas de log con datos de usuarios y archivos de configuración con secretos jamás tocan un servidor — además funciona sin conexión, así que un picazo de VPN o un vuelo no interrumpen una sesión de depuración.",
          ],
        },
      ],
    },
    pt: {
      name: "Formatador JSON",
      tagline:
        "Formate e embeleze JSON desorganizado on-line — 2 espaços, 4 espaços ou tabulação, com validação instantânea e erros localizados. Tudo no seu navegador.",
      intro: [
        "Cole JSON minificado ou mal indentado e receba uma saída limpa na hora. Escolha 2 espaços, 4 espaços ou tabulação; o resultado atualiza enquanto você digita — perfeito para inspecionar respostas de API, arquivos de configuração e logs.",
        "JSON inválido não é problema: o formatador aponta a linha e a coluna exatas do erro de sintaxe, então uma vírgula ou chave faltando aparece em segundos.",
      ],
      steps: [
        "Cole seu JSON na caixa de entrada.",
        "Escolha a indentação: 2 espaços, 4 espaços ou tabulação.",
        "Copie o resultado formatado — ou corrija a linha e coluna indicadas se o JSON for inválido.",
      ],
      faqs: [
        {
          q: "Existe limite de tamanho para o JSON?",
          a: "Não há limite rígido — a formatação acontece localmente no navegador. Arquivos muito grandes (dezenas de MB) podem ficar lentos porque o resultado é recalculado a cada digitação.",
        },
        {
          q: "A formatação altera meus dados?",
          a: "Não. Valores, ordem das chaves e estrutura permanecem idênticos; apenas espaços e quebras de linha são adicionados. O JSON resultante é equivalente.",
        },
        {
          q: "Meu JSON é enviado para um servidor?",
          a: "Não. Tudo roda localmente no seu navegador com JavaScript — seus dados nunca saem do seu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "A formatação só mexe no espaço em branco, nunca no significado",
          paragraphs: [
            "Embelezar é uma operação puramente de espaço em branco: a entrada é parseada numa estrutura de dados e re-serializada com a indentação escolhida. Chaves, valores, profundidade de aninhamento e ordem das chaves entram e saem idênticos — dois documentos JSON que diferem só no espaço em branco parseiam para o mesmo valor e são intercambiáveis para qualquer programa que os consuma.",
            "Um detalhe que vale saber: a exibição de números pode mudar. Números JSON são parseados como doubles IEEE-754, então inteiros muito grandes — tudo acima de 2^53, como IDs tipo snowflake — podem aparecer com dígitos arredondados. A perda ocorreu no parse, como em qualquer engine JavaScript; o formatador não inventou o arredondamento. Quando os dígitos exatos importam, os IDs deveriam viajar como strings dentro do JSON.",
            "O que a formatação não consegue fazer é reordenar ou renomear algo. Algumas ferramentas oferecem ordenação de chaves como extra, o que é cômodo para diff de arquivos de configuração, mas trate isso como um passo separado e deliberado — um formatador que reordena chaves em silêncio torna impossível a comparação byte a byte com o original.",
          ],
        },
        {
          heading: "Como escolher a largura da indentação",
          paragraphs: [
            "Dois espaços são o padrão de facto do ecossistema JavaScript — pacotes npm, a maioria das guias de estilo e boa parte das bases de código frontend usam, então é a opção mais segura ao colar no código de um time. Quatro espaços continuam comuns em código empresarial mais antigo e de linhagem Java. Tabulação vence em acessibilidade: cada leitor define a própria largura, ao custo de arquivos mistos tab/espaço renderizarem de forma inconsistente.",
            "A largura importa mais do que parece porque diffs são sensíveis a espaço em branco. Se o linter do time exige dois espaços e você formata com quatro, cada linha aparece como alterada no review embora nada semântico tenha mudado. Antes de colar a saída, alinhe com a convenção do arquivo de destino.",
            "Para inspeções descartáveis — ler uma resposta de API, conferir uma linha de log — a escolha é pura preferência. Use a que deixar a profundidade do aninhamento mais fácil de seguir a olho; a ferramenta atualiza em tempo real, então trocar não custa nada.",
          ],
        },
        {
          heading: "Embeleze para ler, minifique para enviar, tudo no seu aparelho",
          paragraphs: [
            "Formatar e minificar são as duas pontas de um mesmo fluxo. Pretty-print para humanos: revisão de código, depuração, comparar payloads. Minificar para máquinas: transporte, armazenamento e cache, onde cada byte de indentação é peso morto. Esta ferramenta faz par com o minificador JSON — embeleze para inspecionar um payload recebido, minifique antes de devolvê-lo.",
            "Diferente dos formatadores de editor, nada precisa ser instalado ou configurado: sem projeto, sem plugin, sem salvar um arquivo no disco só para reindentar. Colar, ler, copiar. Para o caso mais comum — um payload numa aba que você fechará em um minuto — é o ciclo mais rápido possível.",
            "Seu JSON é parseado inteiramente nesta aba do navegador. Respostas de APIs de staging, linhas de log com dados de usuários e arquivos de configuração com segredos jamais tocam um servidor — além disso funciona offline, então uma queda de VPN ou um voo não interrompem uma sessão de depuração.",
          ],
        },
      ],
    },
  },
});
