import { DevCsvEngine } from "../_engines/dev-engine-csv";
import { defineTool } from "../_lib/types";

const SAMPLE = '[{"id":1,"name":"Ada","active":true},{"id":2,"name":"Grace","active":false}]';

export default defineTool({
  slug: "json-to-csv",
  category: "developer",
  icon: "swap",
  engine: { component: DevCsvEngine, props: { direction: "json2csv", sample: SAMPLE } },
  related: ["csv-to-json", "json-formatter", "sql-formatter", "md5-generator", "sha256-generator", "base64-image", "json-validator", "url-encoder", "html-minifier", "url-decoder"],
  copy: {
    en: {
      name: "JSON to CSV",
      tagline:
        "Convert JSON arrays of objects to CSV with correct quoting and escaping — spreadsheet-ready for Excel, Sheets or database import. Fully in-browser.",
      intro: [
        "Paste a JSON array of objects and get CSV back instantly. Columns are the union of every key found across rows, values are escaped by the book — quotes doubled, fields wrapped when they contain commas, quotes or line breaks — so the result opens cleanly in Excel, Sheets or any importer.",
        "Nested objects and arrays are serialized as JSON strings inside their cell, booleans and numbers pass through as-is, and nulls become empty cells. Choose comma or semicolon as the delimiter for locales that expect it.",
      ],
      steps: [
        "Paste a JSON array of objects into the input box.",
        "The CSV appears live — pick comma or semicolon if your spreadsheet needs it.",
        "Copy the result straight into a .csv file or an import wizard.",
      ],
      faqs: [
        {
          q: "What if my rows have different keys?",
          a: "The tool builds the column list from every key it sees across all rows; rows missing a column simply get an empty cell. This is usually what you want for messy real-world data.",
        },
        {
          q: "How are nested objects and arrays handled?",
          a: "They are serialized to a JSON string inside the cell (and quoted/escaped like any other value). Flatten your data first if you need one column per nested field.",
        },
        {
          q: "Is my data uploaded anywhere?",
          a: "No. The conversion happens locally in your browser — nothing leaves your device.",
        },
      ],
      deepDive: [
        {
          heading: "How CSV quoting actually works",
          paragraphs: [
            "CSV looks like the simplest format on earth, and its escaping rules are the reason every hand-rolled converter eventually corrupts data. The RFC 4180 convention: a field containing a comma, a double quote or a line break must be wrapped in double quotes, and every quote inside it must be doubled — a value like he said \"hi\" becomes \"he said \"\"hi\"\"\" in the file. Anything else is read differently by different importers.",
            "Line breaks inside fields are the least-known rule. A cell can legally contain a newline, as long as it is quoted — spreadsheets handle it fine, but naive line-by-line parsers treat it as three records. If a converted row count looks wrong in your downstream tool, an embedded newline in a text field is the first suspect.",
            "Beware the double-conversion trap: pasting CSV through another tool that also splits on commas can double-escape, leaving visible \"\" pairs inside cells. When a result looks odd, check it against the rules above rather than assuming the converter is broken — most of the time the source data contained a quote or comma you did not notice.",
          ],
        },
        {
          heading: "Delimiters, locales and the Excel decimal trap",
          paragraphs: [
            "The delimiter is not universal. English and East Asian locales open comma-separated files natively, but much of Europe uses semicolon because the comma is already the decimal separator: a German Excel opening a comma-delimited file puts 1,5 and 2,5 into one column. If your recipients are European, pick the semicolon option before sending.",
            "A related trap happens even with the right delimiter: Excel reformats values on open. Identifiers that look like numbers lose leading zeros (postal codes, SKU prefixes), long numeric IDs become 4.31202E+12, and dates get reinterpreted per the machine's locale. The CSV file itself is fine — it is the spreadsheet's type guessing that mangles it. Importing through a wizard with explicit column types avoids all of it.",
            "JSON's types map cleanly otherwise: booleans become true/false text, numbers pass through as digits, null becomes an empty cell. Note the distinction between an empty cell and a null — most importers treat them identically, but some databases distinguish an explicit NULL from an empty string, so check your target's convention if that distinction matters.",
          ],
        },
        {
          heading: "Converting exports locally, not in the cloud",
          paragraphs: [
            "JSON you convert to CSV is typically an export of real records: customer lists from an admin panel, order histories from an API, analytics rows headed to a finance team. These are exactly the datasets that should not pass through a random web service — and plenty of online converters do upload your document to their server.",
            "Here the entire conversion runs in your browser: parsing the array, unioning the keys, escaping the cells, all in local JavaScript. Records with personal data, unreleased product metrics or anything under contract can be converted without ever crossing the network, and the tool works offline for those occasions when the data source is an internal machine with no internet access at all.",
            "There is no row-count gate either: a ten-thousand-row export converts as easily as the two-line sample. Pair the result with csv-to-json when the flow reverses — CSV coming back from the finance team into your API — and the round trip stays consistent because both sides follow the same quoting rules.",
          ],
        },
      ],
    },
    zh: {
      name: "JSON 转 CSV",
      tagline: "把 JSON 对象数组转成 CSV,引号转义规范——Excel、Google Sheets、数据库导入即用,全程浏览器本地完成。",
      intro: [
        "粘贴 JSON 对象数组,立即得到 CSV。列是所有行中出现过的键的并集,值按规范转义——引号翻倍,包含逗号、引号或换行的字段加引号包裹——结果在 Excel、Sheets 或任何导入工具里都能干净打开。",
        "嵌套对象和数组会以 JSON 字符串形式放进单元格,布尔值和数字原样输出,null 变为空单元格。需要分号分隔的地区可以一键切换分隔符。",
      ],
      steps: [
        "把 JSON 对象数组粘贴到输入框。",
        "CSV 实时生成——电子表格需要时可选逗号或分号。",
        "把结果直接复制进 .csv 文件或导入向导。",
      ],
      faqs: [
        {
          q: "如果各行的键不一样怎么办?",
          a: "工具会把所有行中出现过的每个键都建成列;缺少某列的行该列填空单元格。对参差不齐的真实数据来说,这通常正是想要的结果。",
        },
        {
          q: "嵌套对象和数组怎么处理?",
          a: "它们会被序列化成 JSON 字符串放进单元格(并像其他值一样加引号转义)。如果需要每个嵌套字段单独一列,请先展平数据。",
        },
        {
          q: "数据会被上传吗?",
          a: "不会。转换在浏览器本地完成,数据不离开设备。",
        },
      ],
      deepDive: [
        {
          heading: "CSV 的引号转义到底怎么工作",
          paragraphs: [
            "CSV 看上去是世界上最简单的格式,它的转义规则却正是每个手写转换器迟早会弄坏数据的原因。RFC 4180 的约定:包含逗号、双引号或换行的字段必须用双引号包裹,内部每个引号要翻倍——像 he said \"hi\" 这样的值在文件里变成 \"he said \"\"hi\"\"\"。不按规矩来,不同导入器读出来的东西就不一样。",
            "字段内换行是最少人知道的规则。单元格合法地可以包含换行,只要字段加了引号——表格软件处理得很好,但逐行切分的朴素解析器会把它当成三条记录。如果转换结果在下游工具里行数不对,第一个嫌疑对象就是文本字段里嵌了换行。",
            "还要提防双重转换:把 CSV 再过一个同样按逗号切分的工具可能造成双重转义,单元格里留下可见的 \"\" 对。结果看起来奇怪时,先对照上面的规则检查,别急着断定转换器坏了——多数时候是源数据里就有你没注意到的引号或逗号。",
          ],
        },
        {
          heading: "分隔符、区域设置与 Excel 的数字坑",
          paragraphs: [
            "分隔符并非全球通用。英语和东亚地区原生打开逗号分隔文件,但欧洲很多地区用分号,因为逗号已经被用作小数点:德国的 Excel 打开逗号分隔文件会把 1,5 和 2,5 挤进同一列。收件人在欧洲,发送前就切到分号。",
            "分隔符选对了还有一层坑:Excel 打开时会重排格式。长得像数字的标识符会丢前导零(邮编、SKU 前缀),长数字 ID 变成 4.31202E+12,日期按机器区域被重新解释。CSV 文件本身没问题——坏在表格软件的类型猜测。用导入向导显式指定列类型可以全避开。",
            "除此之外 JSON 的类型映射得很干净:布尔值变成 true/false 文本,数字原样输出,null 变成空单元格。注意空单元格和 null 的区别——多数导入器一视同仁,但有些数据库会区分显式 NULL 和空字符串,如果这个区别重要,先查目标方的约定。",
          ],
        },
        {
          heading: "本地转换导出数据,不进云端",
          paragraphs: [
            "拿去转 CSV 的 JSON 通常就是真实记录的导出:后台面板的客户列表、API 的订单历史、要交给财务团队的分析行。恰恰是这些数据不该经过随机的 web 服务——而不少在线转换器确实会把文档上传到自己服务器。",
            "这里整个转换都在浏览器里跑:解析数组、合并键、转义单元格,全部是本地 JavaScript。带个人数据的记录、未发布的商品指标、合同约束下的任何内容,转换时都不必碰网络;数据源是一台完全没外网的内网机器时,工具离线也能用。",
            "行数也没有门槛:一万行的导出和两行示例转换得一样轻松。流程反方向时配合 csv-to-json——财务团队把 CSV 发回来喂给 API——两边遵循同一套引号规则,往返保持一致。",
          ],
        },
      ],
    },
    ja: {
      name: "JSON → CSV 変換",
      tagline:
        "オブジェクトの JSON 配列を適切な引用とエスケープ付きの CSV へ変換 — Excel・Google Sheets・DB 取り込みにそのまま使えます。完全ブラウザ内処理。",
      intro: [
        "オブジェクトの JSON 配列を貼り付けると、即座に CSV が得られます。列は全行に現れるキーの統合で、値は仕様どおりにエスケープ — 引用符は二重化し、カンマ・引用符・改行を含むフィールドは囲みます。Excel や Sheets、どんなインポーターでも問題なく開けます。",
        "ネストしたオブジェクトや配列はセル内に JSON 文字列として格納され、真偽値と数値はそのまま、null は空セルになります。ロケールに応じて区切り文字はカンマとセミコロンから選べます。",
      ],
      steps: [
        "オブジェクトの JSON 配列を入力欄に貼り付けます。",
        "CSV がリアルタイムに生成されます — 表計算ソフトに合わせて区切り文字を選べます。",
        "結果を .csv ファイルやインポートウィザードにそのまま貼り付けます。",
      ],
      faqs: [
        {
          q: "行ごとにキーが違う場合は?",
          a: "全行に現れたすべてのキーから列リストを作ります。ある列を欠く行は空セルになります。実データのばらつきにはこれが通常最適です。",
        },
        {
          q: "ネストしたオブジェクトや配列はどう扱われますか?",
          a: "セル内に JSON 文字列としてシリアライズされ(他の値と同じく引用・エスケープ)、格納されます。ネストしたフィールドごとに列が欲しい場合は、先にデータをフラット化してください。",
        },
        {
          q: "データはどこかにアップロードされますか?",
          a: "いいえ。変換はブラウザ内でローカルに行われ、データは端末の外に出ません。",
        },
      ],
      deepDive: [
        {
          heading: "CSV の引用エスケープは実際どう動くか",
          paragraphs: [
            "CSV は地上で最も単純な形式に見えますが、そのエスケープ規則こそ、手作りのコンバーターが遅かれ早かれデータを壊す原因です。RFC 4180 の約束:カンマ、二重引用符、改行を含むフィールドは二重引用符で囲み、内部の引用符はすべて二重化する。he said \"hi\" という値はファイル内では \"he said \"\"hi\"\"\" になります。規則を無視すると、インポーターごとに読み取りが変わります。",
            "フィールド内の改行は最も知られていない規則です。引用されていれば、セルは合法的に改行を含められます。表計算ソフトは適切に処理しますが、行単位で切る素朴なパーサーは 3 レコードとみなします。変換結果の行数が下流で合わないとき、第一容疑者はテキスト フィールドに埋まった改行です。",
            "二重変換の罠にも注意してください。CSV を、同じくカンマで切る別ツールに通すと二重エスケープが起き、セル内に \"\" の並びが見えるまま残ることがあります。結果が妙に見えたら、変換器の故障と決めつける前に上の規則と突き合わせてください。たいていはソース データに気づいていない引用符やカンマがあったのです。",
          ],
        },
        {
          heading: "区切り文字、ロケール、Excel の小数点の罠",
          paragraphs: [
            "区切り文字は世界共通ではありません。英語圏と東アジアはカンマ区切りをそのまま開けますが、ヨーロッパの多くの地域はセミコロンを使います。カンマがすでに小数点だからです。ドイツの Excel がカンマ区切りファイルを開くと、1,5 と 2,5 が同じ列に入ります。受け手がヨーロッパなら、送る前にセミコロンに切り替えてください。",
            "区切り文字を正しく選んでももう一つ罠があります。Excel は開くときに値を再整形します。数字に見える識別子は先行ゼロを失い(郵便番号、SKU の接頭辞)、長い数値 ID は 4.31202E+12 になり、日付はそのマシンのロケールで解釈し直されます。CSV ファイル自体は無実で、壊すのは表計算ソフトの型推測です。列型を明示できるインポート ウィザード経由なら全部避けられます。",
            "それ以外は JSON の型はきれいに対応します。真偽値は true/false のテキストに、数値は数字のまま、null は空セルに。空セルと null の違いは意識してください。多くのインポーターは同一視しますが、明示的な NULL と空文字列を区別するデータベースもあります。その違いが重要なら、受け側の規約を確認してください。",
          ],
        },
        {
          heading: "書き出しデータをクラウドではなくローカルで変換する",
          paragraphs: [
            "CSV に変換する JSON は、たいてい実レコードの書き出しです。管理画面の顧客リスト、API の注文履歴、財務チームへ渡す分析行。まさにこういうデータセットこそ、出所の分からない web サービスを経由すべきではありません。実際に文書を自社サーバーへアップロードするオンライン コンバーターも少なくありません。",
            "ここでは変換全体がブラウザ内で動きます。配列の解析、キーの統合、セルのエスケープ、すべてローカルの JavaScript です。個人データ入りのレコードも、未公開のプロダクト指標も、契約下の何もかも、ネットワークを通さず変換できます。データ源がまったく外網のない内部マシンという場面でも、オフラインで動きます。",
            "行数の窓口もありません。1 万行の書き出しも 2 行のサンプルも同じ手軽さで変換できます。フローが逆になったら csv-to-json と対にします。財務チームから返ってきた CSV を API に戻す——両側が同じ引用規則に従うので、往復で一貫性が保たれます。",
          ],
        },
      ],
    },
    es: {
      name: "JSON a CSV",
      tagline:
        "Convierte arrays JSON de objetos a CSV con comillas y escape correctos: salida lista para Excel, Google Sheets o importar a bases de datos. Todo en tu navegador.",
      intro: [
        "Pega un array JSON de objetos y recibe el CSV al instante. Las columnas son la unión de todas las claves encontradas en las filas, y los valores se escapan según el estándar — comillas dobladas, campos envueltos si contienen comas, comillas o saltos — así el resultado abre limpio en Excel, Sheets o cualquier importador.",
        "Los objetos y arrays anidados se serializan como cadenas JSON dentro de la celda, los booleanos y números pasan tal cual, y los null se vuelven celdas vacías. Elige coma o punto y coma como delimitador según tu configuración regional.",
      ],
      steps: [
        "Pega un array JSON de objetos en el cuadro de entrada.",
        "El CSV aparece en vivo — elige coma o punto y coma si tu hoja de cálculo lo necesita.",
        "Copia el resultado directo a un archivo .csv o a un asistente de importación.",
      ],
      faqs: [
        {
          q: "¿Qué pasa si mis filas tienen claves distintas?",
          a: "La herramienta construye la lista de columnas con todas las claves que ve en todas las filas; las filas que carecen de una columna obtienen una celda vacía. Para datos reales desordenados suele ser justo lo que quieres.",
        },
        {
          q: "¿Cómo se manejan objetos y arrays anidados?",
          a: "Se serializan a una cadena JSON dentro de la celda (entre comillas y escapados como cualquier otro valor). Aplana tus datos antes si quieres una columna por campo anidado.",
        },
        {
          q: "¿Mis datos se suben a algún sitio?",
          a: "No. La conversión ocurre localmente en tu navegador — nada sale de tu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Cómo funcionan realmente las comillas en CSV",
          paragraphs: [
            "CSV parece el formato más simple del mundo, y sus reglas de escape son la razón por la que todo conversor hecho a mano termina corrompiendo datos. La convención del RFC 4180: un campo que contiene una coma, una comilla doble o un salto de línea debe ir entre comillas dobles, y cada comilla dentro debe duplicarse — un valor como he said \"hi\" se convierte en \"he said \"\"hi\"\"\" dentro del archivo. Si no se sigue, cada importador lee cosas distintas.",
            "Los saltos de línea dentro de campos son la regla menos conocida. Una celda puede contener legalmente un salto, siempre que esté entre comillas — las hojas de cálculo lo manejan bien, pero los parsers ingenuos que parten línea a línea lo tratan como tres registros. Si el número de filas convertidas no cuadra en tu herramienta de destino, el primer sospechoso es un salto incrustado en un campo de texto.",
            "Cuidado con la doble conversión: pasar el CSV por otra herramienta que también parte por comas puede duplicar el escape, dejando pares \"\" visibles dentro de las celdas. Cuando el resultado se ve raro, compruébalo contra las reglas anteriores antes de asumir que el conversor está roto — la mayoría de las veces los datos de origen contenían una comilla o coma que no habías notado.",
          ],
        },
        {
          heading: "Delimitadores, configuración regional y la trampa decimal de Excel",
          paragraphs: [
            "El delimitador no es universal. Las configuraciones en inglés y de Asia oriental abren archivos separados por comas de forma nativa, pero gran parte de Europa usa punto y coma porque la coma ya es el separador decimal: un Excel alemán que abra un archivo delimitado por comas mete 1,5 y 2,5 en una sola columna. Si tus destinatarios son europeos, elige la opción de punto y coma antes de enviar.",
            "Incluso con el delimitador correcto hay otra trampa: Excel reformatea los valores al abrir. Los identificadores que parecen números pierden los ceros a la izquierda (códigos postales, prefijos de SKU), los ID numéricos largos se vuelven 4.31202E+12, y las fechas se reinterpretan según la configuración regional de la máquina. El archivo CSV está bien — lo estropea la adivinación de tipos de la hoja de cálculo. Importar por un asistente con tipos de columna explícitos lo evita todo.",
            "Fuera de eso, los tipos de JSON se mapean limpiamente: los booleanos se vuelven texto true/false, los números pasan como dígitos y los null se convierten en celdas vacías. Nota la diferencia entre celda vacía y null — la mayoría de los importadores las tratan igual, pero algunas bases de datos distinguen un NULL explícito de una cadena vacía, así que revisa la convención de tu destino si esa distinción importa.",
          ],
        },
        {
          heading: "Convertir exportaciones en local, no en la nube",
          paragraphs: [
            "El JSON que conviertes a CSV suele ser una exportación de registros reales: listas de clientes desde un panel de administración, historiales de pedidos desde una API, filas de analítica destinadas al equipo financiero. Son exactamente los datos que no deberían pasar por un servicio web cualquiera — y bastantes conversores online sí suben tu documento a su servidor.",
            "Aquí toda la conversión corre en tu navegador: parsear el array, unir las claves, escapar las celdas, todo en JavaScript local. Registros con datos personales, métricas de productos sin lanzar o cualquier cosa bajo contrato se convierten sin cruzar nunca la red, y la herramienta funciona sin conexión para esas ocasiones en que la fuente de datos es una máquina interna sin internet.",
            "Tampoco hay control de filas: una exportación de diez mil filas se convierte con la misma facilidad que el ejemplo de dos líneas. Combina el resultado con csv-to-json cuando el flujo se invierta — el CSV que vuelve del equipo financiero hacia tu API — y el ir y volver se mantiene consistente porque ambos lados siguen las mismas reglas de comillas.",
          ],
        },
      ],
    },
    pt: {
      name: "JSON para CSV",
      tagline:
        "Converta arrays JSON de objetos em CSV com aspas e escape corretos — saída pronta para Excel, Google Sheets ou importação em banco. Tudo no navegador.",
      intro: [
        "Cole um array JSON de objetos e receba o CSV na hora. As colunas são a união de todas as chaves encontradas nas linhas, e os valores escapam conforme o padrão — aspas dobradas, campos envolvidos quando contêm vírgulas, aspas ou quebras — então o resultado abre limpo no Excel, Sheets ou qualquer importador.",
        "Objetos e arrays aninhados são serializados como string JSON dentro da célula, booleanos e números passam como estão, e nulls viram células vazias. Escolha vírgula ou ponto e vírgula como delimitador para as localidades que exigem.",
      ],
      steps: [
        "Cole um array JSON de objetos na caixa de entrada.",
        "O CSV aparece ao vivo — escolha vírgula ou ponto e vírgula se sua planilha precisar.",
        "Copie o resultado direto para um arquivo .csv ou um assistente de importação.",
      ],
      faqs: [
        {
          q: "E se minhas linhas tiverem chaves diferentes?",
          a: "A ferramenta monta a lista de colunas com todas as chaves vistas em todas as linhas; linhas sem uma coluna recebem célula vazia. Para dados reais bagunçados, isso costuma ser exatamente o que você quer.",
        },
        {
          q: "Como objetos e arrays aninhados são tratados?",
          a: "Eles são serializados como string JSON dentro da célula (entre aspas e escapados como qualquer valor). Achate seus dados antes se precisar de uma coluna por campo aninhado.",
        },
        {
          q: "Meus dados são enviados para algum lugar?",
          a: "Não. A conversão acontece localmente no seu navegador — nada sai do seu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Como as aspas do CSV realmente funcionam",
          paragraphs: [
            "CSV parece o formato mais simples do mundo, e suas regras de escape são a razão de todo conversor feito à mão mais cedo ou mais tarde corromper dados. A convenção do RFC 4180: um campo contendo vírgula, aspa dupla ou quebra de linha deve ficar entre aspas duplas, e cada aspa dentro deve ser dobrada — um valor como he said \"hi\" vira \"he said \"\"hi\"\"\" no arquivo. Sem seguir a regra, cada importador lê coisas diferentes.",
            "Quebras de linha dentro de campos são a regra menos conhecida. Uma célula pode legalmente conter uma quebra, contanto que esteja entre aspas — planilhas lidam bem, mas parsers ingênuos que quebram linha a linha a tratam como três registros. Se a contagem de linhas convertidas não fecha na ferramenta de destino, o primeiro suspeito é uma quebra embutida num campo de texto.",
            "Cuidado com a dupla conversão: passar o CSV por outra ferramenta que também quebra por vírgula pode dobrar o escape, deixando pares \"\" visíveis dentro das células. Quando o resultado parece estranho, confira contra as regras acima antes de assumir que o conversor está quebrado — na maioria das vezes os dados de origem tinham uma aspa ou vírgula que você não notou.",
          ],
        },
        {
          heading: "Delimitadores, localidades e a armadilha decimal do Excel",
          paragraphs: [
            "O delimitador não é universal. Localidades em inglês e do Leste Asiático abrem arquivos separados por vírgula nativamente, mas boa parte da Europa usa ponto e vírgula porque a vírgula já é o separador decimal: um Excel alemão abrindo um arquivo delimitado por vírgulas coloca 1,5 e 2,5 numa única coluna. Se seus destinatários são europeus, escolha a opção de ponto e vírgula antes de enviar.",
            "Mesmo com o delimitador certo há outra armadilha: o Excel reformata valores ao abrir. Identificadores que parecem números perdem zeros à esquerda (CEPs, prefixos de SKU), IDs numéricos longos viram 4.31202E+12, e datas são reinterpretadas pela localidade da máquina. O arquivo CSV está bem — quem estraga é a adivinhação de tipos da planilha. Importar por um assistente com tipos de coluna explícitos evita tudo.",
            "Fora isso, os tipos do JSON mapeiam limpo: booleanos viram texto true/false, números passam como dígitos, e nulls viram células vazias. Note a distinção entre célula vazia e null — a maioria dos importadores as trata igual, mas alguns bancos de dados distinguem um NULL explícito de uma string vazia, então confira a convenção do destino se essa distinção importa.",
          ],
        },
        {
          heading: "Converter exportações localmente, não na nuvem",
          paragraphs: [
            "O JSON que você converte em CSV costuma ser uma exportação de registros reais: listas de clientes de um painel administrativo, históricos de pedidos de uma API, linhas de análise destinadas ao time financeiro. São exatamente os dados que não deveriam passar por um serviço web qualquer — e bastantes conversores online de fato sobem seu documento para o servidor deles.",
            "Aqui toda a conversão roda no seu navegador: parsear o array, unir as chaves, escapar as células, tudo em JavaScript local. Registros com dados pessoais, métricas de produtos não lançados ou qualquer coisa sob contrato se convertem sem nunca cruzar a rede, e a ferramenta funciona offline para aquelas ocasiões em que a fonte de dados é uma máquina interna sem internet.",
            "Não há porte de linhas também: uma exportação de dez mil linhas converte com a mesma facilidade que o exemplo de duas linhas. Combine o resultado com csv-to-json quando o fluxo se inverter — o CSV voltando do time financeiro para sua API — e o ir-e-voltar permanece consistente porque os dois lados seguem as mesmas regras de aspas.",
          ],
        },
      ],
    },
  },
});
