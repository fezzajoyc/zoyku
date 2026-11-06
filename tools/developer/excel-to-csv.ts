import { DevEngineSheet } from "../_engines/dev-engine-sheet";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "excel-to-csv",
  category: "developer",
  icon: "file",
  engine: { component: DevEngineSheet, props: { mode: "xlsx2csv" } },
  related: ["csv-to-excel", "csv-to-json", "json-to-csv", "json-formatter", "md5-generator", "sha256-generator", "base64-image", "json-validator", "url-encoder", "html-minifier"],
  copy: {
    en: {
      name: "Excel to CSV",
      tagline:
        "Turn any .xlsx or .xls workbook into clean CSV — pick a sheet, choose the delimiter, and download. Quoting, commas and line breaks are escaped correctly.",
      intro: [
        "Drop an .xlsx, .xlsm or .xls file and get standard RFC 4180 CSV out. If the workbook has several sheets you pick which one to export — a CSV file has no concept of sheets, so one file per sheet is the honest mapping. Numbers come out with the values as the spreadsheet displays them.",
        "The output quotes only the cells that need it, doubles embedded quotes, and keeps line breaks inside cells intact, so the result re-imports into Excel, databases and scripts without surprises. Copy it straight from the page or download a UTF-8 file that opens correctly in Excel.",
      ],
      steps: [
        "Drop your .xlsx, .xlsm or .xls file onto the zone.",
        "If the workbook has several sheets, choose the one to export.",
        "Pick comma, semicolon or tab as the output delimiter.",
        "Copy the CSV or download it as a UTF-8 .csv file.",
      ],
      faqs: [
        {
          q: "Which sheet gets converted?",
          a: "The first sheet by default. When the workbook contains more than one, a selector appears above the preview so you can switch; each CSV export covers exactly one sheet, because the CSV format has no way to store several.",
        },
        {
          q: "What happens to formulas and formatting?",
          a: "You get the last calculated values exactly as the cell displays them — not the formulas. A cell showing 1,234.50 exports as your chosen delimiter-separated text with that display value; formatting like currency symbols stays as displayed.",
        },
        {
          q: "Will CJK or accented text survive the round trip?",
          a: "Yes. The copy button gives plain UTF-8 text, and the downloaded file starts with a UTF-8 BOM so Excel detects the encoding on double-click. Tools that dislike BOMs can use the copied text instead.",
        },
      ],
      deepDive: [
        {
          heading: "RFC 4180: why CSV quoting rules exist",
          paragraphs: [
            "CSV looks trivial and is famously not. The format that databases and spreadsheet programs actually interoperate on is described in RFC 4180, and its three rules cover almost every bug you have met in a CSV import. Rule one: a field containing the delimiter, a quote or a line break must be enclosed in double quotes. Rule two: a quote inside a quoted field is escaped by doubling it. Rule three: line breaks inside a quoted field are data, not record separators.",
            "The bugs all come from tools that ignore one of these. A naive writer joins cells with commas and produces a file that explodes into extra columns the moment an address field contains a comma. A naive reader splits on every newline and turns a multi-line cell into five records. This tool writes strictly by the rules: quote only when necessary, double embedded quotes, preserve internal newlines — so downstream parsers that follow the same rules (most modern ones do) reconstruct the sheet exactly.",
            "One more quiet decision: the header row. CSV has no formal concept of a header — RFC 4180 treats every row the same — but practically every consumer assumes the first row is names. Exporting without adjustment is usually right; the occasional tool that needs it off is the exception, not the rule.",
          ],
        },
        {
          heading: "What is lost in the conversion: formulas, types and sheets",
          paragraphs: [
            "CSV stores text and nothing else, so the conversion is inherently lossy in three specific ways. Formulas become their last computed values — a cell with =SUM(A1:A5) exports as the number it currently evaluates to, and updates in Excel will never flow back into the CSV. Display formatting is baked in too: a cell formatted as currency exports with the currency symbol or separator exactly as shown, which sometimes produces values like $1,234.50 that downstream parsers then see as text.",
            "Data types disappear: dates come out as strings in whatever format the sheet displays (03/04/2024 is ambiguous across locales), leading zeros in codes are only preserved if the cell is stored as text, and everything becomes a string on re-import. Databases that want typed columns need an import step that guesses or is told the types. If exact fidelity matters, keep the spreadsheet as the source of truth and treat the CSV as a one-way export.",
            "Sheets, charts, merged cells and colors have no CSV representation at all. A workbook with several sheets needs one CSV per sheet — that is not a limitation of this tool but of the format, which has no way to store more than one table. Merged cells export with the value in the top-left cell and empty strings elsewhere; if you rely on merges for semantics, flatten them before exporting.",
          ],
        },
        {
          heading: "Encoding, BOMs and processing files locally",
          paragraphs: [
            "The infamous mojibake on double-click is an encoding story. CSV is bytes, not text, and Excel on Windows guesses the encoding of a file without a BOM — often landing on a legacy code page and turning 中文 or café into garbage. The downloaded file here starts with a UTF-8 BOM, the three bytes Excel uses to detect UTF-8 on open. Programs that consume the file programmatically (scripts, databases) usually prefer BOM-less UTF-8, which is why the copy button provides exactly that.",
            "Spreadsheets are among the most sensitive files that get dragged into online converters: customer lists, payroll, financial projections, employee data. Uploading one to a converter server means the rows land on someone else's infrastructure, possibly logged or cached. This tool parses the workbook entirely in your browser using a JavaScript library — the file is read from disk locally, converted in memory, and never transmitted anywhere; there is no server-side processing step at all.",
            "That also means there is no size limit imposed from outside — the ceiling is your browser's memory, which comfortably handles sheets with hundreds of thousands of rows. If you work with regulated or personal data, the local-only design is not a convenience feature but the requirement that makes the workflow permissible at all.",
          ],
        },
      ],
    },
    zh: {
      name: "Excel 转 CSV",
      tagline:
        "把任意 .xlsx 或 .xls 工作簿转成标准 CSV——可选拿个工作表、自定分隔符后下载。引号、逗号、换行都按规范转义,全程本地完成。",
      intro: [
        "拖入 .xlsx、.xlsm 或 .xls 文件,导出符合 RFC 4180 的标准 CSV。工作簿有多个工作表时可以任选一个导出——CSV 本身没有「工作表」的概念,一个文件对应一张表是最诚实的映射。数字按表格显示值输出。",
        "输出只给真正需要引号的单元格加引号,内部引号双写,单元格内换行原样保留,重新导入 Excel、数据库或脚本都不会出幺蛾子。可以直接复制,也可以下载带 UTF-8 编码、Excel 双击打开不乱码的 .csv 文件。",
      ],
      steps: [
        "把 .xlsx、.xlsm 或 .xls 文件拖到上传区。",
        "工作簿里有多个工作表时,选择要导出的那一个。",
        "选择逗号、分号或制表符作为输出分隔符。",
        "复制 CSV,或下载为 UTF-8 编码的 .csv 文件。",
      ],
      faqs: [
        {
          q: "转换的是哪个工作表?",
          a: "默认第一个。工作簿包含多个工作表时,预览上方会出现选择器可以切换;每次导出只对应一张表,因为 CSV 格式本身存不下多张表。",
        },
        {
          q: "公式和格式会怎么处理?",
          a: "导出的是单元格最后计算并显示的值,不是公式。显示为 1,234.50 的单元格会按该显示值输出,货币符号等格式也按显示结果保留。",
        },
        {
          q: "中文、带变音符的文本会乱码吗?",
          a: "不会。复制按钮给出纯 UTF-8 文本;下载的文件带 UTF-8 BOM,Excel 双击打开能正确识别编码。不喜欢 BOM 的程序可以直接用复制出来的文本。",
        },
      ],
      deepDive: [
        {
          heading: "RFC 4180:转义规则为什么长这样",
          paragraphs: [
            "CSV 看起来简单,实际上臭名昭著。数据库和表格软件真正互通所依据的规范写在 RFC 4180 里,它的三条规则覆盖了你在 CSV 导入时遇到过的几乎所有 bug。规则一:包含分隔符、引号或换行的字段必须用双引号包起来。规则二:带引号字段内部的引号要双写成两个。规则三:带引号字段内部的换行是数据,不是记录分隔符。",
            "所有事故都来自无视其中一条的工具。朴素的生成器直接用逗号拼接单元格,一旦地址字段里出现逗号,文件就被炸出多余的列。朴素的解析器见换行就切,一个多行单元格变成五条记录。本工具严格按规则输出:仅在必要时加引号、内部引号双写、保留单元格内换行——遵守同样规则的下游解析器(现代的多数如此)能精确还原整张表。",
            "还有一个安静的决策:表头行。CSV 没有正式的表头概念——RFC 4180 对每一行一视同仁——但实际上几乎所有消费方都假定第一行是列名。按原样导出通常是对的;偶尔有工具需要无表头,那是例外而不是规则。",
          ],
        },
        {
          heading: "转换会丢什么:公式、类型与工作表",
          paragraphs: [
            "CSV 只存文本,所以转换天然在三个方面有损。公式变成最后计算的值:=SUM(A1:A5) 导出的是它当前算出的数字,之后 Excel 里的任何更新都不会回流到 CSV。显示格式也被「烤死」在值里:按货币格式显示的单元格会带着货币符号或分隔符原样导出,下游解析器有时会把 $1,234.50 这样的值当文本。",
            "数据类型消失:日期按表格当前显示格式导出成字符串(03/04/2024 在不同地区含义不同),编号的前导零只有在单元格以文本形式存储时才能保留,重新导入时一切都会变成字符串。需要类型化列的数据库要在导入环节自行猜测或被告知类型。如果保真度重要,把表格当唯一事实源,CSV 只当单向导出。",
            "工作表、图表、合并单元格和颜色在 CSV 里完全没有对应物。多工作表的工作簿每张表要单独一个 CSV——这不是本工具的限制,而是格式本身存不下多张表。合并单元格导出时值落在左上角单元格,其余为空串;如果合并承载着语义,导出前先拍平。",
          ],
        },
        {
          heading: "编码、BOM 与本地处理文件",
          paragraphs: [
            "双击打开就乱码,本质是编码问题。CSV 是字节不是文本,Windows 上的 Excel 会对没有 BOM 的文件猜编码——经常猜到某个遗留代码页,把中文或 café 变成垃圾字符。这里下载的文件带 UTF-8 BOM 开头,正是 Excel 用来识别 UTF-8 的三个字节。以编程方式消费文件(脚本、数据库)通常更想要无 BOM 的 UTF-8,所以复制按钮给的正是这种。",
            "表格恰恰是最常被拖进在线转换器的敏感文件:客户名单、工资表、财务预测、员工数据。把表格传给转换器服务器,意味着这些行落在别人的基础设施上,还可能被记录或缓存。本工具用 JavaScript 库在浏览器里完成整个解析——文件从本地磁盘读入、在内存中转换、不向任何地方传输,根本没有服务端处理环节。",
            "这也意味着没有外部强加的大小限制——上限是浏览器内存,几十万行的表格从容应对。对处理受监管数据或个人数据的场景,纯本地设计不是锦上添花,而是让这套流程合规的必要条件。",
          ],
        },
      ],
    },
    ja: {
      name: "Excel → CSV 変換",
      tagline:
        ".xlsx・.xls ワークブックを標準的な CSV に変換 — シートを選び、区切り文字を決めてダウンロード。引用符・カンマ・改行も正しくエスケープ。",
      intro: [
        ".xlsx・.xlsm・.xls ファイルをドロップすると、RFC 4180 準拠の標準的な CSV を出力します。ワークブックに複数のシートがある場合はエクスポートするシートを選べます — CSV にシートという概念はないため、1 ファイル = 1 シートが最も誠実な変換です。数値は表計算ソフトの表示値どおりに出ます。",
        "出力は必要なセルだけを引用符で囲み、内部の引用符は二重化、セル内改行もそのまま保たれるので、Excel・データベース・スクリプトへの再取り込みで困りません。ページから直接コピーするか、Excel で正しく開ける UTF-8 ファイルとしてダウンロードできます。",
      ],
      steps: [
        ".xlsx・.xlsm・.xls ファイルをドロップゾーンに入れます。",
        "シートが複数ある場合は、エクスポートするシートを選びます。",
        "出力の区切り文字(カンマ / セミコロン / タブ)を選びます。",
        "CSV をコピーするか、UTF-8 の .csv としてダウンロードします。",
      ],
      faqs: [
        {
          q: "どのシートが変換されますか?",
          a: "既定では最初のシートです。シートが複数ある場合はプレビュー上部にセレクターが表示され、切り替えられます。CSV 形式は複数シートを保持できないため、1 回のエクスポートは必ず 1 シートです。",
        },
        {
          q: "数式や書式はどうなりますか?",
          a: "数式ではなく、セルに表示されている最終計算値が出力されます。1,234.50 と表示されるセルはその表示値のまま、選んだ区切り文字でテキスト化されます。通貨記号などの書式も表示どおりです。",
        },
        {
          q: "日本語やアクセント付き文字は化けませんか?",
          a: "化けません。コピーボタンは素の UTF-8 テキストを返し、ダウンロードファイルは UTF-8 BOM 付きなので、Excel のダブルクリックでも正しく判定されます。BOM を嫌うツールにはコピーしたテキストを使ってください。",
        },
      ],
      deepDive: [
        {
          heading: "RFC 4180:エスケープ規則がこの形になった理由",
          paragraphs: [
            "CSV は単純に見えて有名な罠だらけです。データベースと表計算ソフトが実際に相互運用する規格は RFC 4180 に書かれており、その 3 つの規則が CSV インポートで一度は目にしたバグのほぼ全部を説明します。規則 1:区切り文字、引用符、改行を含むフィールドは二重引用符で囲む。規則 2:引用符付きフィールド内の引用符は二重化してエスケープする。規則 3:引用符付きフィールド内の改行はデータであり、レコード区切りではない。",
            "事故はすべて、このうちの一つを無視するツールから来ます。素朴な生成ツールはカンマで連結するだけなので、住所フィールドにカンマが入った瞬間に余分な列へ爆発します。素朴なパーサーは改行ごとに切るので、複数行セルが 5 レコードに化けます。このツールは規則どおりに厳密に書き出します。必要なときだけ引用符を付け、内部の引用符は二重化し、セル内改行は保持——同じ規則に従う下流のパーサー(現代の大半は従います)はシートを正確に復元できます。",
            "もう一つの静かな判断がヘッダー行です。CSV には正式なヘッダー概念がなく、RFC 4180 は全行を同列に扱いますが、実際にはほぼすべての消費者が 1 行目を列名だと決めつけます。そのままエクスポートするのが通常は正解で、ヘッダー不要なツールは例外と考えるのがよいでしょう。",
          ],
        },
        {
          heading: "変換で失われるもの:数式、型、シート",
          paragraphs: [
            "CSV が保存するのはテキストだけなので、変換は本質的に 3 点で情報を失います。数式は最後の計算値になります:=SUM(A1:A5) は現在評価された数値として出力され、その後 Excel でどう更新しても CSV には反映されません。表示書式も値に焼き込まれます。通貨書式のセルは通貨記号や区切りごと出力されるため、$1,234.50 のような値を下流のパーサーがテキストとして受け取ることがあります。",
            "データ型も消えます。日付はシートの表示形式どおりの文字列になり(03/04/2024 は地域で意味が違う)、コードの先頭ゼロはセルがテキスト保存されている場合しか残らず、再取り込みではすべてが文字列になります。型付きの列を望むデータベースでは、インポート工程で型を推測または指定する必要があります。正確さが重要なら、スプレッドシートを真の情報源とし、CSV は一方通行のエクスポートと割り切ってください。",
            "シート、グラフ、結合セル、色には CSV の表現がまったくありません。複数シートのワークブックはシートごとに 1 ファイルが必要です。これはこのツールの制限ではなく、複数の表を保持できない形式そのものの制約です。結合セルは左上のセルに値が入り、他は空文字列になります。結合に意味を持たせているなら、エクスポート前に解体してください。",
          ],
        },
        {
          heading: "エンコーディング、BOM、ローカル処理",
          paragraphs: [
            "ダブルクリックで文字化けする事件の正体はエンコーディングです。CSV はバイトであってテキストではなく、BOM のないファイルについて Windows の Excel はエンコーディングを推測します。しばしばレガシーなコードページに落ちて、日本語や café が文字化けします。ここでダウンロードするファイルは UTF-8 BOM で始まり、これは Excel が UTF-8 を判定するために使う 3 バイトです。プログラムから読む場合(スクリプト、データベース)は BOM なしの UTF-8 が好まれることが多く、コピー機能はまさにそれを提供します。",
            "スプレッドシートは、オンライン変換サービスにドラッグされがちな最もセンシティブなファイルです。顧客リスト、給与、財務予測、従業員データ。変換サーバーにアップロードするということは、その行が他人のインフラに着地し、ログやキャッシュに残るかもしれないということです。このツールは JavaScript ライブラリでブラウザ内だけでワークブックを解析します。ファイルはローカルディスクから読まれ、メモリ内で変換され、どこにも送信されません。サーバー側の処理工程は最初から存在しません。",
            "同時に、外部から課されるサイズ上限もありません。上限はブラウザのメモリで、数十万行のシートも余裕を持って処理できます。規制対象や個人データを扱うなら、ローカル完結設計は便利機能ではなく、ワークフローそのものを成立させる要件です。",
          ],
        },
      ],
    },
    es: {
      name: "Excel a CSV",
      tagline:
        "Convierte cualquier libro .xlsx o .xls en CSV limpio: elige la hoja y el delimitador y descarga. Comillas, comas y saltos de línea se escapan bien.",
      intro: [
        "Suelta un archivo .xlsx, .xlsm o .xls y obtén CSV estándar conforme a RFC 4180. Si el libro tiene varias hojas, eliges cuál exportar: un CSV no tiene concepto de hojas, así que un archivo por hoja es el mapeo honesto. Los números salen con el valor que muestra la hoja de cálculo.",
        "La salida solo entrecomilla las celdas que lo necesitan, duplica las comillas internas y conserva los saltos de línea dentro de las celdas, de modo que el resultado se reimporta a Excel, bases de datos y scripts sin sorpresas. Cópialo directamente o descárgalo como UTF-8 que Excel abre sin problemas.",
      ],
      steps: [
        "Suelta tu archivo .xlsx, .xlsm o .xls en la zona.",
        "Si el libro tiene varias hojas, elige la que quieras exportar.",
        "Elige coma, punto y coma o tabulación como delimitador.",
        "Copia el CSV o descárgalo como archivo .csv UTF-8.",
      ],
      faqs: [
        {
          q: "¿Qué hoja se convierte?",
          a: "La primera por defecto. Cuando el libro contiene varias, aparece un selector sobre la vista previa para cambiar; cada exportación corresponde exactamente a una hoja, porque el formato CSV no puede almacenar varias.",
        },
        {
          q: "¿Qué pasa con las fórmulas y el formato?",
          a: "Obtienes los últimos valores calculados tal como muestra la celda — no las fórmulas. Una celda que muestra 1.234,50 se exporta como texto separado por tu delimitador con ese valor; los formatos como símbolos de moneda se mantienen tal como se ven.",
        },
        {
          q: "¿El texto con acentos o en otros alfabetos sobrevive?",
          a: "Sí. El botón de copiar da texto UTF-8 plano, y el archivo descargado empieza con un BOM UTF-8 para que Excel detecte la codificación al hacer doble clic. Las herramientas que no toleran BOM pueden usar el texto copiado.",
        },
      ],
      deepDive: [
        {
          heading: "RFC 4180: por qué existen las reglas de las comillas",
          paragraphs: [
            "CSV parece trivial y es notoriamente lo contrario. El formato sobre el que bases de datos y hojas de cálculo interoperan de verdad está descrito en el RFC 4180, y sus tres reglas cubren casi todos los bugs que has visto en una importación de CSV. Regla uno: un campo que contiene el delimitador, una comilla o un salto de línea debe ir entre comillas dobles. Regla dos: una comilla dentro de un campo entrecomillado se escapa duplicándola. Regla tres: los saltos de línea dentro de un campo entrecomillado son datos, no separadores de registro.",
            "Todos los bugs vienen de herramientas que ignoran alguna de estas reglas. Un generador ingenuo une celdas con comas y produce un archivo que explota en columnas extra en cuanto un campo de dirección lleva una coma. Un lector ingenuo divide en cada salto de línea y convierte una celda multilínea en cinco registros. Esta herramienta escribe estrictamente según las reglas: comillas solo cuando son necesarias, comillas internas duplicadas, saltos internos conservados — así los parsers que siguen las mismas reglas (la mayoría de los modernos) reconstruyen la hoja exactamente.",
            "Una decisión silenciosa más: la fila de cabecera. CSV no tiene un concepto formal de cabecera — el RFC 4180 trata todas las filas igual — pero prácticamente todo consumidor asume que la primera fila son nombres. Exportar sin más suele ser lo correcto; la herramienta ocasional que lo necesita sin cabecera es la excepción, no la regla.",
          ],
        },
        {
          heading: "Qué se pierde en la conversión: fórmulas, tipos y hojas",
          paragraphs: [
            "CSV almacena texto y nada más, así que la conversión es inherentemente con pérdida en tres sentidos concretos. Las fórmulas se convierten en su último valor calculado — una celda con =SUM(A1:A5) exporta el número que evalúa ahora, y las actualizaciones en Excel nunca regresan al CSV. El formato de visualización también queda horneado en el valor: una celda con formato moneda se exporta con el símbolo o separador exactamente como se ve, lo que a veces produce valores como 1.234,50 que parsers posteriores leen como texto.",
            "Los tipos de datos desaparecen: las fechas salen como cadenas en el formato que la hoja muestra (03/04/2024 es ambiguo entre configuraciones regionales), los ceros a la izquierda solo se conservan si la celda está almacenada como texto, y todo se convierte en cadena al reimportar. Las bases de datos que quieren columnas tipadas necesitan un paso de importación que adivine o reciba los tipos. Si la fidelidad exacta importa, mantén la hoja de cálculo como fuente de verdad y trata el CSV como exportación de una sola vía.",
            "Hojas múltiples, gráficos, celdas combinadas y colores no tienen representación en CSV. Un libro con varias hojas necesita un CSV por hoja — no es una limitación de esta herramienta sino del formato, que no puede guardar más de una tabla. Las celdas combinadas se exportan con el valor en la celda superior izquierda y cadenas vacías en el resto; si las combinaciones llevan semántica, aplánalas antes de exportar.",
          ],
        },
        {
          heading: "Codificación, BOM y procesar archivos en local",
          paragraphs: [
            "El famoso mojibake al hacer doble clic es una historia de codificación. CSV son bytes, no texto, y Excel en Windows adivina la codificación de un archivo sin BOM — a menudo cae en una página de códigos legada y convierte 中文 o café en basura. El archivo descargado aquí empieza con un BOM UTF-8, los tres bytes que Excel usa para detectar UTF-8 al abrir. Los programas que consumen el archivo por código (scripts, bases de datos) suelen preferir UTF-8 sin BOM, que es exactamente lo que da el botón de copiar.",
            "Las hojas de cálculo están entre los archivos más sensibles que se arrastran a conversores online: listas de clientes, nóminas, proyecciones financieras, datos de empleados. Subir una al servidor de un conversor significa que las filas aterrizan en la infraestructura de otra persona, posiblemente registradas en log o cacheadas. Esta herramienta procesa el libro entero en tu navegador con una biblioteca JavaScript — el archivo se lee del disco localmente, se convierte en memoria y nunca se transmite a ningún sitio; no existe un paso de procesamiento en servidor.",
            "Eso también significa que no hay límite de tamaño impuesto desde fuera — el techo es la memoria de tu navegador, que maneja con soltura hojas de cientos de miles de filas. Si trabajas con datos regulados o personales, el diseño solo-local no es una función de conveniencia sino el requisito que hace que el flujo de trabajo esté permitido en primer lugar.",
          ],
        },
      ],
    },
    pt: {
      name: "Excel para CSV",
      tagline:
        "Transforme qualquer pasta .xlsx ou .xls em CSV limpo — escolha a planilha e o delimitador e baixe. Aspas, vírgulas e quebras de linha escapadas certo.",
      intro: [
        "Solte um arquivo .xlsx, .xlsm ou .xls e receba CSV padrão conforme a RFC 4180. Se a pasta tiver várias planilhas, você escolhe qual exportar — CSV não tem conceito de planilhas, então um arquivo por planilha é o mapeamento honesto. Os números saem com o valor que a planilha exibe.",
        "A saída coloca aspas apenas nas células que precisam, dobra as aspas internas e mantém quebras de linha dentro das células, então o resultado reimporta no Excel, bancos de dados e scripts sem surpresas. Copie direto da página ou baixe um UTF-8 que abre corretamente no Excel.",
      ],
      steps: [
        "Solte o arquivo .xlsx, .xlsm ou .xls na área.",
        "Se a pasta tiver várias planilhas, escolha qual exportar.",
        "Escolha vírgula, ponto e vírgula ou tabulação como delimitador.",
        "Copie o CSV ou baixe como arquivo .csv UTF-8.",
      ],
      faqs: [
        {
          q: "Qual planilha é convertida?",
          a: "A primeira, por padrão. Quando a pasta contém mais de uma, um seletor aparece acima da pré-visualização para trocar; cada exportação cobre exatamente uma planilha, porque o formato CSV não consegue guardar várias.",
        },
        {
          q: "O que acontece com fórmulas e formatação?",
          a: "Você recebe os últimos valores calculados exatamente como a célula exibe — não as fórmulas. Uma célula que mostra 1.234,50 é exportada como texto separado pelo delimitador escolhido com esse valor; formatações como símbolos de moeda permanecem como exibidas.",
        },
        {
          q: "Texto com acentos ou japonês sobrevive à conversão?",
          a: "Sim. O botão de copiar entrega texto UTF-8 puro, e o arquivo baixado começa com um BOM UTF-8 para o Excel detectar a codificação no clique duplo. Ferramentas que não aceitam BOM podem usar o texto copiado.",
        },
      ],
      deepDive: [
        {
          heading: "RFC 4180: por que as regras de aspas existem",
          paragraphs: [
            "CSV parece trivial e é notoriamente o contrário. O formato sobre o qual bancos de dados e planilhas de fato interoperam está descrito no RFC 4180, e suas três regras cobrem quase todos os bugs que você já viu numa importação de CSV. Regra um: um campo que contém o delimitador, uma aspa ou quebra de linha precisa estar entre aspas duplas. Regra dois: uma aspa dentro de um campo com aspas é escapada dobrando-a. Regra três: quebras de linha dentro de um campo com aspas são dados, não separadores de registro.",
            "Todos os bugs vêm de ferramentas que ignoram uma dessas regras. Um gerador ingênuo junta células com vírgulas e produz um arquivo que explode em colunas extras assim que um campo de endereço contém vírgula. Um leitor ingênuo divide em toda quebra de linha e transforma uma célula de várias linhas em cinco registros. Esta ferramenta escreve estritamente pelas regras: aspas só quando necessário, aspas internas dobradas, quebras internas preservadas — assim parsers que seguem as mesmas regras (a maioria dos modernos) reconstrói a planilha exatamente.",
            "Mais uma decisão silenciosa: a linha de cabeçalho. CSV não tem conceito formal de cabeçalho — o RFC 4180 trata todas as linhas igual — mas praticamente todo consumidor assume que a primeira linha são nomes. Exportar sem ajustes costuma ser o certo; a ferramenta ocasional que precisa sem cabeçalho é a exceção, não a regra.",
          ],
        },
        {
          heading: "O que se perde na conversão: fórmulas, tipos e planilhas",
          paragraphs: [
            "CSV armazena texto e nada mais, então a conversão é inerentemente com perda em três sentidos específicos. Fórmulas viram seus últimos valores calculados — uma célula com =SUM(A1:A5) exporta o número que avalia agora, e atualizações no Excel nunca voltam para o CSV. A formatação de exibição também fica assada no valor: uma célula com formato moeda exporta com o símbolo ou separador exatamente como aparece, o que às vezes produz valores como $1,234.50 que parsers posteriores leem como texto.",
            "Os tipos de dados desaparecem: datas saem como strings no formato que a planilha exibe (03/04/2024 é ambíguo entre locais), zeros à esquerda só são preservados se a célula está armazenada como texto, e tudo vira string na reimportação. Bancos de dados que querem colunas tipadas precisam de um passo de importação que adivinhe ou seja informado dos tipos. Se fidelidade exata importa, mantenha a planilha como fonte da verdade e trate o CSV como exportação de mão única.",
            "Planilhas, gráficos, células mescladas e cores não têm representação em CSV. Uma pasta com várias planilhas precisa de um CSV por planilha — não é limitação desta ferramenta, mas do formato, que não consegue guardar mais de uma tabela. Células mescladas exportam com o valor na célula superior esquerda e strings vazias no resto; se as mesclagens carregam semântica, achate-as antes de exportar.",
          ],
        },
        {
          heading: "Codificação, BOM e processar arquivos localmente",
          paragraphs: [
            "O infame mojibake no clique duplo é uma história de codificação. CSV são bytes, não texto, e o Excel no Windows adivinha a codificação de um arquivo sem BOM — muitas vezes cai numa página de código legada e transforma 中文 ou café em lixo. O arquivo baixado aqui começa com um BOM UTF-8, os três bytes que o Excel usa para detectar UTF-8 ao abrir. Programas que consomem o arquivo por código (scripts, bancos de dados) costumam preferir UTF-8 sem BOM, que é exatamente o que o botão de copiar fornece.",
            "Planilhas estão entre os arquivos mais sensíveis que se arrastam para conversores online: listas de clientes, folha de pagamento, projeções financeiras, dados de funcionários. Subir uma ao servidor de um conversor significa que as linhas pousam na infraestrutura de outra pessoa, possivelmente registradas em log ou cacheadas. Esta ferramenta parseia a pasta inteira no seu navegador com uma biblioteca JavaScript — o arquivo é lido do disco localmente, convertido na memória e nunca transmitido a lugar algum; não existe passo de processamento em servidor.",
            "Isso também significa que não há limite de tamanho imposto de fora — o teto é a memória do seu navegador, que lida com folgura de planilhas com centenas de milhares de linhas. Se você trabalha com dados regulados ou pessoais, o design somente-local não é um recurso de conveniência, mas o requisito que torna o fluxo de trabalho permitido em primeiro lugar.",
          ],
        },
      ],
    },
  },
});
