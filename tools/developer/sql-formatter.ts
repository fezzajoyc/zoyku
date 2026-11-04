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
    },
  },
});
