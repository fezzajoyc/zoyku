import { DevCodeEngine } from "../_engines/dev-engine-code";
import { defineTool } from "../_lib/types";

const SAMPLE =
  "select u.id, u.name, count(o.id) as orders from users u left join orders o on o.user_id = u.id where u.active = 1 group by u.id, u.name having count(o.id) > 5 order by orders desc limit 20;";

export default defineTool({
  slug: "sql-formatter",
  category: "developer",
  icon: "calc",
  engine: { component: DevCodeEngine, props: { mode: "sql-format", sample: SAMPLE } },
  related: ["json-formatter", "json-to-csv", "csv-to-json", "md5-generator", "sha256-generator", "base64-image", "json-validator", "url-encoder", "html-minifier", "url-decoder"],
  copy: {
    en: {
      name: "SQL Formatter",
      tagline:
        "Format SQL online with consistent keyword casing and indentation — turn long SELECTs, JOINs and stored procedures into readable code, right in your browser.",
      intro: [
        "Paste a dense one-line query and get properly structured SQL back instantly: clauses break onto their own lines, nested expressions indent consistently, and keywords are upper-cased for easy scanning. Powered by the sql-formatter engine, so the rules are the same ones real teams rely on.",
        "Perfect for reviewing generated queries, debugging ORM output, documenting stored procedures or untangling a 40-line WHERE clause someone left in a comment.",
      ],
      steps: [
        "Paste your SQL into the input box.",
        "The formatted query appears as you type, with keywords upper-cased and clauses aligned.",
        "Copy the readable SQL or clear the input to format another query.",
      ],
      faqs: [
        {
          q: "Which SQL dialects are supported?",
          a: "Formatting works across standard SQL, and the underlying engine also understands dialect-specific syntax from PostgreSQL, MySQL, T-SQL, PL/SQL, BigQuery, Snowflake and more — common structures format correctly everywhere.",
        },
        {
          q: "Will formatting change what my query does?",
          a: "No. Only whitespace and keyword casing change. String literals and quoted identifiers are preserved exactly, so the query is semantically identical.",
        },
        {
          q: "Is my query sent to a server?",
          a: "No. Formatting runs locally in your browser — your SQL never leaves your device.",
        },
      ],
      deepDive: [
        {
          heading: "Why SQL style conventions exist at all",
          paragraphs: [
            "SQL is executed as one stream of tokens regardless of layout, so every formatting rule in the world is purely for humans. That is exactly why conventions pay off: queries live for years, get pasted into tickets, reviews and documentation, and a 40-line one-liner JOIN costs every future reader more time than the formatting ever did. Consistent style turns a query from an artifact to be decoded into a document to be read.",
            "The loudest convention is keyword casing. Upper-casing SELECT, FROM, JOIN and WHERE separates the structural skeleton of a query from its data at a glance — eyes land on the keywords first and the identifiers second. Some teams prefer lowercase keywords with quoted identifiers instead; the specific choice matters less than applying one choice everywhere. This tool upper-cases keywords, the most widely adopted convention.",
            "Formatting changes nothing about execution: only whitespace and casing change, string literals and quoted identifiers are preserved exactly, and the query you copy back is semantically identical to the one you pasted. That guarantee is what makes it safe to format generated queries, ORM output or a colleague's unformatted dump before reading it.",
          ],
        },
        {
          heading: "Dialects: where SQL is not one language",
          paragraphs: [
            "SQL is a family of dialects sharing a core, and a formatter must not mangle the parts that differ. The formatting here works on standard SQL, and the underlying sql-formatter engine also understands dialect-specific syntax — PostgreSQL, MySQL, T-SQL, PL/SQL, BigQuery, Snowflake and others — so common structures format correctly across them.",
            "The dialects differ in ways a reader should know about, even beyond formatting. String quoting diverges: standard SQL uses single quotes only, MySQL by default also accepts double quotes for strings while PostgreSQL treats double quotes as identifiers. Identifier quoting differs too — backticks in MySQL, double quotes in PostgreSQL, brackets in T-SQL. Auto-increment columns, upsert syntax and date functions all have vendor-specific spellings.",
            "A safe rule when formatting unfamiliar SQL: if the output looks structurally wrong — a keyword split oddly or a literal disrupted — check the dialect before assuming a bug. Formatting never changes semantics by design, but it can only do that when the syntax it sees is recognized; and for cross-database work, verify the formatted query on a development database before it touches anything real.",
          ],
        },
        {
          heading: "Formatting queries locally",
          paragraphs: [
            "Queries are among the most sensitive text a developer handles: they reveal table names, column layouts, business logic, and sometimes literal credentials embedded in connection examples. Online formatters that POST the query to a server turn every paste into a potential disclosure; this one formats entirely in your browser, so production queries, internal schemas and client SQL can pass through without leaving the device.",
            "Being local also removes the friction that keeps formatting from happening at all. There is no upload wait, no size gate beyond browser memory, and the result appears as you type — which makes it practical to format a long query, read it, adjust it, and paste it back, all in one session. It works offline, so it is usable in restricted environments where a web tool would not be.",
            "A workflow worth keeping: validate the logic on a dev database, format here for review and documentation, and store the formatted version as the canonical copy in your repository or docs. Future readers — including you — inherit the readable version, and the review conversation happens against a structure everyone can parse.",
          ],
        },
      ],
    },
    zh: {
      name: "SQL 格式化",
      tagline: "在线格式化 SQL,统一关键字大小写与缩进——把冗长的 SELECT、JOIN 和存储过程变成可读代码,全程浏览器本地完成。",
      intro: [
        "粘贴密集的单行查询,立即得到结构清晰的 SQL:各子句独立成行,嵌套表达式缩进一致,关键字统一大写便于扫读。底层由 sql-formatter 引擎驱动,规则与真实团队所用一致。",
        "适合审查生成的查询、调试 ORM 输出、为存储过程写文档,或者解开别人留在注释里的 40 行 WHERE 条件。",
      ],
      steps: [
        "把 SQL 粘贴到输入框。",
        "边输入边显示格式化结果:关键字大写、子句对齐。",
        "复制可读的 SQL,或清空输入格式化下一条查询。",
      ],
      faqs: [
        {
          q: "支持哪些 SQL 方言?",
          a: "标准 SQL 都可以格式化;底层引擎还理解 PostgreSQL、MySQL、T-SQL、PL/SQL、BigQuery、Snowflake 等方言的特有语法——常见结构在哪儿都能正确格式化。",
        },
        {
          q: "格式化会改变查询的行为吗?",
          a: "不会。只有空白和关键字大小写会变。字符串字面量和带引号的标识符逐字保留,查询在语义上完全等价。",
        },
        {
          q: "查询会被发送到服务器吗?",
          a: "不会。格式化在浏览器本地运行,SQL 不会离开你的设备。",
        },
      ],
      deepDive: [
        {
          heading: "SQL 的风格约定为什么存在",
          paragraphs: [
            "SQL 执行时只看一串记号,排版无关紧要——所以世上每条格式化规则都纯粹为人服务。这恰恰是约定有价值的原因:查询会活好几年,会被贴进工单、评审和文档,而一个 40 行的单行 JOIN 让每个未来的读者付出比格式化本身更多的时间。统一的风格把查询从需要破译的文物变成可以阅读的文档。",
            "最响亮的约定是关键字大小写。把 SELECT、FROM、JOIN、WHERE 大写,让查询的结构骨架一眼与数据分开——视线先落在关键字上,再落到标识符上。有的团队偏好小写关键字加引号标识符;具体选哪种不重要,重要的是处处一致。本工具采用最广泛使用的大写关键字约定。",
            "格式化不改变执行:只有空白和大小写变化,字符串字面量和带引号的标识符逐字保留,你复制回去的查询与你贴进来的一模一样。这个保证让你可以放心地格式化生成的查询、ORM 输出或同事没排版的导出,然后再去读。",
          ],
        },
        {
          heading: "方言:SQL 不止是一门语言的地方",
          paragraphs: [
            "SQL 是共享同一个核心的方言家族,格式化器不能弄坏那些不同的部分。这里的格式化针对标准 SQL,底层 sql-formatter 引擎也理解方言专属语法——PostgreSQL、MySQL、T-SQL、PL/SQL、BigQuery、Snowflake 等——常见的结构在各家都能正确排版。",
            "即便超出排版范围,方言差异也值得读者知道。字符串引号分歧:标准 SQL 只用单引号,MySQL 默认也接受双引号字符串,而 PostgreSQL 把双引号当标识符。标识符引号也不同——MySQL 用反引号,PostgreSQL 用双引号,T-SQL 用方括号。自增列、upsert 语法、日期函数都各有厂商专属写法。",
            "格式化陌生 SQL 的一条安全规则:如果输出看起来结构不对——某个关键字被奇怪地拆开或字面量被打断——先查方言再怀疑 bug。格式化按设计不改变语义,但前提是它认得眼前的语法;跨数据库的工作,先在开发库上验证格式化后的查询,再碰任何真实环境。",
          ],
        },
        {
          heading: "在本地格式化查询",
          paragraphs: [
            "查询是开发者手里最敏感的文本之一:它暴露表名、列布局、业务逻辑,有时还有连接示例里嵌着的明文凭据。把查询 POST 到服务器的在线格式化器,让每次粘贴都变成潜在的泄露;本工具完全在浏览器里格式化,生产查询、内部 schema、客户的 SQL 都可以过一遍而不离开设备。",
            "本地运行还消除了让「格式化这件事根本不发生」的摩擦。没有上传等待,上限只有浏览器内存,结果随输入出现——于是格式化一段长查询、读它、调整、贴回去,可以在一个会话里完成。离线可用,在网页工具进不去的受限环境里照样能用。",
            "值得保留的工作流:在开发库上验证逻辑,在这里格式化以便评审和写文档,把格式化后的版本作为仓库或文档里的标准版本。未来的读者——包括你自己——继承可读的版本,评审对话发生在一个人人能解析的结构上。",
          ],
        },
      ],
    },
    ja: {
      name: "SQL フォーマッター",
      tagline:
        "SQL をオンラインで整形し、キーワードの大文字とインデントを統一。長い SELECT・JOIN・ストアドをブラウザ内で読めるコードにします。",
      intro: [
        "ぎっしりの 1 行クエリを貼り付けると、即座に構造化された SQL に。各句は独立した行に、ネストした式は一定のインデントで、キーワードは大文字に統一され読み飛ばしやすくなります。sql-formatter エンジン搭載なので、実際のチームが使うものと同じルールです。",
        "生成されたクエリのレビュー、ORM 出力のデバッグ、ストアドのドキュメント化、コメントに残された 40 行の WHERE の解読に最適です。",
      ],
      steps: [
        "SQL を入力欄に貼り付けます。",
        "入力と同時に整形結果が表示されます(キーワード大文字・句の整列)。",
        "読みやすい SQL をコピーするか、入力をクリアして次のクエリへ。",
      ],
      faqs: [
        {
          q: "どの SQL 方言に対応していますか?",
          a: "標準 SQL はすべて整形できます。基盤エンジンは PostgreSQL、MySQL、T-SQL、PL/SQL、BigQuery、Snowflake などの方言固有の構文も理解します。よくある構造はどこでも正しく整形されます。",
        },
        {
          q: "整形するとクエリの動作は変わりますか?",
          a: "変わりません。変わるのは空白とキーワードの大文字小文字だけです。文字列リテラルと引用符付き識別子はそのまま保持され、意味的に同一です。",
        },
        {
          q: "クエリはサーバーに送信されますか?",
          a: "いいえ。整形はブラウザ内でローカルに実行され、SQL は端末の外に出ません。",
        },
      ],
      deepDive: [
        {
          heading: "なぜ SQL のスタイル規約が存在するのか",
          paragraphs: [
            "SQL はレイアウトに関係なく一連のトークンとして実行されます。だから世の中のすべての整形規則は純粋に人間のためのものです。だからこそ規約には価値があります。クエリは何年も生き、チケットやレビューやドキュメントに貼られ、40 行の JOIN を 1 行に詰めたものは、整形そのもののコストより未来の読み手の時間を多く奪います。一貫したスタイルは、解読すべき遺物だったクエリを読むべきドキュメントに変えます。",
            "最も声の大きい規約はキーワードの大文字化です。SELECT、FROM、JOIN、WHERE を大文字にすると、クエリの構造的な骨格がデータと一目で分かれます — 視線はまずキーワードに、次に識別子に落ちます。小文字キーワードと引用識別子を好むチームもあります。どの選択自体より、どこでも一つの選択を貫くことの方が重要です。このツールは最も広く採用されている大文字キーワードを採用します。",
            "整形は実行について何も変えません。変わるのは空白と大文字小文字だけで、文字列リテラルと引用識別子は正確に保存され、コピーして戻したクエリは貼り付けたものと意味的に同一です。この保証があるから、生成されたクエリや ORM の出力や同僚の無整形ダンプを、読む前に安心して整形できます。",
          ],
        },
        {
          heading: "方言:SQL が一つの言語ではない場所",
          paragraphs: [
            "SQL は共通の核心を共有する方言の一族であり、整形器は異なる部分を壊してはなりません。ここの整形は標準 SQL を対象とし、基盤の sql-formatter エンジンは方言固有の構文も理解します — PostgreSQL、MySQL、T-SQL、PL/SQL、BigQuery、Snowflake など — よって一般的な構造はどれでも正しく整形されます。",
            "整形を超えたところでも、読み手が知っておくべき方言の違いがあります。文字列の引用の分裂です。標準 SQL は単一引用符のみ、MySQL は既定で文字列に二重引用符も受け入れ、PostgreSQL は二重引用符を識別子として扱います。識別子の引用も違います — MySQL はバッククォート、PostgreSQL は二重引用符、T-SQL は角括弧。自動増分列、upsert 構文、日付関数にはすべてベンダー固有の綴りがあります。",
            "見慣れない SQL を整形するときの安全な規則:出力が構造的に誤って見えたら — キーワードが奇妙に分割されたり、リテラルが乱されたり — バグを疑う前に方言を確認してください。整形は設計上意味を変えませんが、それは見た構文を認識している場合に限ります。そしてデータベースをまたぐ作業では、整形後のクエリを本物に触れさせる前に開発データベースで検証してください。",
          ],
        },
        {
          heading: "クエリをローカルで整形する",
          paragraphs: [
            "クエリは開発者が扱う最も敏感なテキストの一つです。テーブル名、列構成、業務ロジック、時には接続例に埋め込まれた平文の資格情報まで明かします。クエリをサーバーに POST するオンライン整形器は、貼るたびに潜在的な開示に変えます。これは完全にブラウザ内で整形するため、本番クエリも内部スキーマも顧客の SQL も、端末から出ずに通せます。",
            "ローカルであることは、整形という行為がそもそも起きない原因になる摩擦も取り除きます。アップロードの待ち時間はなく、上限はブラウザのメモリだけで、結果は入力に合わせて現れます — 長いクエリを整形し、読み、調整し、貼り戻すのが一つのセッションで済みます。オフラインで動くので、Web ツールが届かない制限された環境でも使えます。",
            "手元に置きたいワークフロー:開発データベースで論理を検証し、ここでレビューとドキュメントのために整形し、整形後の版をリポジトリやドキュメントの正本として保存する。未来の読み手 — あなた自身を含め — は読める版を引き継ぎ、レビューの会話は誰もが解析できる構造の上で行われます。",
          ],
        },
      ],
    },
    es: {
      name: "Formateador SQL",
      tagline:
        "Formatea consultas SQL en línea con mayúsculas y sangría consistentes: convierte SELECT, JOIN y procedimientos largos en código legible, sin salir del navegador.",
      intro: [
        "Pega una consulta densa en una línea y recibe al instante SQL bien estructurado: cada cláusula en su línea, expresiones anidadas con sangría consistente y palabras clave en mayúsculas para escanear fácil. Impulsado por el motor sql-formatter, las mismas reglas que usan los equipos reales.",
        "Perfecto para revisar consultas generadas, depurar salida de ORM, documentar procedimientos almacenados o descifrar un WHERE de 40 líneas que alguien dejó en un comentario.",
      ],
      steps: [
        "Pega tu SQL en el cuadro de entrada.",
        "La consulta formateada aparece mientras escribes, con palabras clave en mayúsculas y cláusulas alineadas.",
        "Copia el SQL legible o borra la entrada para formatear otra consulta.",
      ],
      faqs: [
        {
          q: "¿Qué dialectos SQL soporta?",
          a: "Formatea SQL estándar y el motor entiende además sintaxis específica de PostgreSQL, MySQL, T-SQL, PL/SQL, BigQuery, Snowflake y más — las estructuras comunes se formatean bien en todas partes.",
        },
        {
          q: "¿El formateo cambia lo que hace mi consulta?",
          a: "No. Solo cambian los espacios y las mayúsculas de las palabras clave. Las cadenas y los identificadores entrecomillados se conservan tal cual: la consulta es semánticamente idéntica.",
        },
        {
          q: "¿Mi consulta se envía a un servidor?",
          a: "No. El formateo corre localmente en tu navegador — tu SQL nunca sale de tu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué existen las convenciones de estilo en SQL",
          paragraphs: [
            "SQL se ejecuta como un solo flujo de tokens sin importar el diseño, así que toda regla de formato del mundo es puramente para humanos. Por eso justamente las convenciones rinden: las consultas viven durante años, se pegan en tickets, revisiones y documentación, y un JOIN de 40 líneas en una sola cuesta a cada lector futuro más tiempo del que costó el formato. Un estilo consistente convierte una consulta de artefacto por descifrar en documento por leer.",
            "La convención más sonora es el uso de mayúsculas en las palabras clave. Poner SELECT, FROM, JOIN y WHERE en mayúsculas separa de un vistazo el esqueleto estructural de la consulta de sus datos — la mirada cae primero en las palabras clave y después en los identificadores. Algunos equipos prefieren palabras clave en minúsculas con identificadores entre comillas; la elección concreta importa menos que aplicar una sola elección en todas partes. Esta herramienta usa mayúsculas, la convención más adoptada.",
            "El formato no cambia nada de la ejecución: solo cambian el espacio en blanco y las mayúsculas, los literales de cadena y los identificadores entre comillas se conservan exactos, y la consulta que copias de vuelta es semánticamente idéntica a la que pegaste. Esa garantía es lo que hace seguro formatear consultas generadas, salida de ORM o el volcado sin formato de un colega antes de leerlo.",
          ],
        },
        {
          heading: "Dialectos: donde SQL no es un solo lenguaje",
          paragraphs: [
            "SQL es una familia de dialectos que comparten un núcleo, y un formateador no debe estragar las partes que difieren. El formato aquí funciona sobre SQL estándar, y el motor sql-formatter subyacente entiende también sintaxis específica de dialecto — PostgreSQL, MySQL, T-SQL, PL/SQL, BigQuery, Snowflake y otros — así las estructuras comunes se formatean correctamente en todos.",
            "Los dialectos difieren de formas que conviene conocer incluso más allá del formato. El entrecomillado de cadenas diverge: el SQL estándar usa comillas simples solo, MySQL por defecto también acepta comillas dobles para cadenas mientras que PostgreSQL trata las comillas dobles como identificadores. El entrecomillado de identificadores también difiere — backticks en MySQL, comillas dobles en PostgreSQL, corchetes en T-SQL. Las columnas auto-incrementales, la sintaxis de upsert y las funciones de fecha tienen grafías propias de cada vendedor.",
            "Una regla segura al formatear SQL desconocido: si la salida se ve estructuralmente mal — una palabra clave partida de forma extraña o un literal perturbado — revisa el dialecto antes de asumir un bug. Formatear no cambia la semántica por diseño, pero solo puede hacerlo cuando la sintaxis que ve está reconocida; y para trabajo entre bases de datos, verifica la consulta formateada en una base de desarrollo antes de que toque nada real.",
          ],
        },
        {
          heading: "Formatear consultas en local",
          paragraphs: [
            "Las consultas están entre el texto más sensible que maneja un desarrollador: revelan nombres de tablas, disposición de columnas, lógica de negocio, y a veces credenciales literales incrustadas en ejemplos de conexión. Los formateadores online que hacen POST de la consulta a un servidor convierten cada pegado en una divulgación potencial; este formatea por completo en tu navegador, así que consultas de producción, esquemas internos y SQL de clientes pueden pasar sin salir del dispositivo.",
            "Ser local también elimina la fricción que impide que el formato ocurra siquiera. No hay espera de subida, no hay puerta de tamaño más allá de la memoria del navegador, y el resultado aparece mientras escribes — lo que hace práctico formatear una consulta larga, leerla, ajustarla y pegarla de vuelta, todo en una sesión. Funciona sin conexión, así que es utilizable en entornos restringidos donde una herramienta web no lo sería.",
            "Un flujo que merece conservarse: valida la lógica en una base de desarrollo, formatea aquí para revisión y documentación, y guarda la versión formateada como la copia canónica en tu repositorio o documentación. Los lectores futuros — tú incluido — heredan la versión legible, y la conversación de revisión ocurre sobre una estructura que cualquiera puede analizar.",
          ],
        },
      ],
    },
    pt: {
      name: "Formatador SQL",
      tagline:
        "Formate consultas SQL on-line com maiúsculas e indentação consistentes — transforme SELECTs, JOINs e stored procedures longos em código legível, no navegador.",
      intro: [
        "Cole uma consulta densa em uma linha e receba SQL bem estruturado na hora: cada cláusula em sua linha, expressões aninhadas com indentação consistente e palavras-chave em maiúsculas para facilitar a leitura. Movido pelo motor sql-formatter, com as mesmas regras que times reais usam.",
        "Perfeito para revisar consultas geradas, depurar saída de ORM, documentar stored procedures ou decifrar um WHERE de 40 linhas que alguém deixou num comentário.",
      ],
      steps: [
        "Cole seu SQL na caixa de entrada.",
        "A consulta formatada aparece enquanto você digita, com palavras-chave em maiúsculas e cláusulas alinhadas.",
        "Copie o SQL legível ou limpe a entrada para formatar outra consulta.",
      ],
      faqs: [
        {
          q: "Quais dialetos SQL são suportados?",
          a: "O SQL padrão é formatado por completo, e o motor entende também sintaxe específica de PostgreSQL, MySQL, T-SQL, PL/SQL, BigQuery, Snowflake e mais — estruturas comuns formatam corretamente em qualquer lugar.",
        },
        {
          q: "A formatação muda o que minha consulta faz?",
          a: "Não. Só mudam espaços e a capitalização de palavras-chave. Literais de string e identificadores entre aspas são preservados: a consulta é semanticamente idêntica.",
        },
        {
          q: "Minha consulta é enviada a um servidor?",
          a: "Não. A formatação roda localmente no seu navegador — seu SQL nunca sai do dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Por que convenções de estilo em SQL existem",
          paragraphs: [
            "O SQL executa como um só fluxo de tokens independentemente do layout, então toda regra de formatação do mundo é puramente para humanos. É justamente por isso que convenções rendem: consultas vivem por anos, são coladas em tickets, revisões e documentação, e um JOIN de 40 linhas numa linha só custa a cada leitor futuro mais tempo do que a formatação jamais custou. Estilo consistente transforma uma consulta de artefato a decifrar em documento a ler.",
            "A convenção mais sonora é a caixa das palavras-chave. Colocar SELECT, FROM, JOIN e WHERE em maiúsculas separa num relance o esqueleto estrutural da consulta dos seus dados — o olhar cai primeiro nas palavras-chave, depois nos identificadores. Alguns times preferem palavras-chave minúsculas com identificadores entre aspas; a escolha específica importa menos que aplicar uma escolha em todo lugar. Esta ferramenta usa maiúsculas, a convenção mais adotada.",
            "Formatar nada muda na execução: só espaços em branco e caixa mudam, literais de string e identificadores entre aspas são preservados exatos, e a consulta que você copia de volta é semanticamente idêntica à que colou. Essa garantia é o que torna seguro formatar consultas geradas, saída de ORM ou o despejo não formatado de um colega antes de lê-lo.",
          ],
        },
        {
          heading: "Dialectos: onde o SQL não é uma linguagem só",
          paragraphs: [
            "SQL é uma família de dialetos que compartilham um núcleo, e um formatador não deve estragar as partes que diferem. A formatação aqui funciona sobre SQL padrão, e o motor sql-formatter subjacente também entende sintaxe específica de dialecto — PostgreSQL, MySQL, T-SQL, PL/SQL, BigQuery, Snowflake e outros — assim as estruturas comuns se formatam corretamente em todos.",
            "Os dialetos diferem de formas que vale conhecer mesmo além da formatação. O uso de aspas em strings diverge: o SQL padrão usa só aspas simples, o MySQL por padrão também aceita aspas duplas para strings enquanto o PostgreSQL trata aspas duplas como identificadores. O uso de aspas em identificadores também difere — crase invertida no MySQL, aspas duplas no PostgreSQL, colchetes no T-SQL. Colunas auto-incrementais, sintaxe de upsert e funções de data têm grafias próprias de cada fornecedor.",
            "Uma regra segura ao formatar SQL desconhecido: se a saída parecer estruturalmente errada — uma palavra-chave partida de forma estranha ou um literal perturbado — confira o dialecto antes de supor um bug. Formatar não muda semântica por desenho, mas só pode fazê-lo quando a sintaxe que vê é reconhecida; e para trabalho entre bancos de dados, verifique a consulta formatada num banco de desenvolvimento antes de tocar qualquer coisa real.",
          ],
        },
        {
          heading: "Formatando consultas localmente",
          paragraphs: [
            "Consultas estão entre o texto mais sensível que um desenvolvedor manuseia: revelam nomes de tabelas, disposição de colunas, lógica de negócio, e às vezes credenciais literais embutidas em exemplos de conexão. Formateadores online que fazem POST da consulta a um servidor transformam cada colagem numa divulgação em potencial; este formata inteiramente no seu navegador, então consultas de produção, esquemas internos e SQL de clientes podem passar sem sair do dispositivo.",
            "Ser local também remove a fricção que impede a formatação de sequer acontecer. Não há espera de upload, não há portão de tamanho além da memória do navegador, e o resultado aparece enquanto digita — o que torna prático formatar uma consulta longa, lê-la, ajustá-la e colá-la de volta, tudo numa sessão. Funciona offline, então é usável em ambientes restritos onde uma ferramenta web não seria.",
            "Um fluxo que vale manter: valide a lógica num banco de desenvolvimento, formate aqui para revisão e documentação, e guarde a versão formatada como a cópia canônica no seu repositório ou docs. Leitores futuros — você incluído — herdam a versão legível, e a conversa de revisão acontece sobre uma estrutura que qualquer um pode analisar.",
          ],
        },
      ],
    },
  },
});
