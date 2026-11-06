import { DevCsvEngine } from "../_engines/dev-engine-csv";
import { defineTool } from "../_lib/types";

const SAMPLE = 'id,name,score\n1,"Ada, Countess",9.5\n2,Grace,8\n3,Alan,null';

export default defineTool({
  slug: "csv-to-json",
  category: "developer",
  icon: "swap",
  engine: { component: DevCsvEngine, props: { direction: "csv2json", sample: SAMPLE } },
  related: ["json-to-csv", "json-formatter", "sql-formatter", "word-counter", "md5-generator", "sha256-generator", "base64-image", "json-validator", "url-encoder", "html-minifier"],
  copy: {
    en: {
      name: "CSV to JSON",
      tagline:
        "Convert CSV to JSON with automatic type inference — numbers, booleans and nulls are detected, quoted fields handled. Paste, convert, copy. Nothing uploaded.",
      intro: [
        "Paste any CSV with a header row and get a JSON array of objects in real time. Quoted fields, escaped quotes and CRLF line endings are parsed correctly, and every cell gets sensible types: true/false become booleans, plain numbers become numbers, null becomes null — everything else stays a string.",
        "Use it to feed API requests, seed databases, or turn a spreadsheet export into something your code can consume. The JSON output is pretty-printed with 2-space indentation and ready to copy.",
      ],
      steps: [
        "Paste your CSV (first row must be the header) into the input box.",
        "Pick comma or semicolon as the delimiter.",
        "Copy the pretty-printed JSON array of objects.",
      ],
      faqs: [
        {
          q: "How does type inference decide between string and number?",
          a: "A cell becomes a number only if it is a clean numeric literal (no leading zeros, no stray spaces), true/false become booleans, the literal null becomes null, and everything else — IDs with leading zeros, zip codes, dates — stays a string to preserve its exact value.",
        },
        {
          q: "What if my header row has duplicate or empty names?",
          a: "Empty header cells are replaced with column1, column2… names automatically. Duplicate names collapse to the last occurrence, since JSON objects cannot hold duplicate keys.",
        },
        {
          q: "Is my CSV uploaded to a server?",
          a: "No. The conversion runs locally in your browser — your data never leaves your device.",
        },
      ],
      deepDive: [
        {
          heading: "Type inference: the conservative rules that keep data honest",
          paragraphs: [
            "CSV cells are text; JSON has types. Bridging the two means the converter must guess, and the quality of a converter lives in how it guesses. The rules here are deliberately conservative: a cell becomes a number only if it is a clean numeric literal — no leading zeros, no surrounding spaces. true and false become booleans, the exact literal null becomes null, and everything else stays a string. That means 007 remains “007”, not 7; zip codes, product codes and phone numbers keep their zeros; and dates like 2024-03-04 do not silently become anything else.",
            "The conservative default exists because a wrong type is a silent bug. A JSON consumer that receives 7 instead of “007” cannot recover the original; one that receives a string where it wanted a number at least fails loudly or is trivially converted. When you know a column is genuinely numeric, coerce it downstream where the assumption is explicit — the converter is not the right place to gamble with your identifiers.",
            "Header handling covers the two classic CSV diseases: empty and duplicate column names. Empty headers get generated names (column1, column2, ...) so every row keeps all its fields; duplicates collapse to the last occurrence, because JSON objects cannot carry repeated keys. If duplicates matter to your schema, fix the header before converting — no converter can invent information the source never had.",
          ],
        },
        {
          heading: "Parsing CSV correctly: quotes, newlines and delimiters",
          paragraphs: [
            "Splitting CSV on commas is wrong the moment a real dataset arrives. RFC 4180, the standard the format actually follows in practice, defines quoted fields: a field containing a comma, a quote or a line break must be wrapped in double quotes, and a quote inside such a field is escaped by doubling it. A name field reading “Ada, Countess” is one cell; a naive split turns it into two and shifts every column after it.",
            "Line endings are the second trap. CSV files mix CRLF (Windows, Excel exports) and LF (Unix tools), and a line break inside a quoted field is data, not a record separator — a multi-line address or a pasted comment must survive as one cell. Correct parsing is a small state machine, not a split() call; that is what runs here.",
            "Delimiters vary by locale: Excel in much of Europe and Latin America writes semicolon-separated files because the comma is the decimal separator in those locales. The tool lets you choose comma or semicolon explicitly rather than sniffing, so a file where every field happens to contain semicolons is not mis-detected. If your source uses tabs, the JSON-to-CSV sibling handles the round trip back out.",
          ],
        },
        {
          heading: "Local conversion for data that names people",
          paragraphs: [
            "CSVs heading toward JSON are usually headed toward an API or a database — and their content is usually real-world: users, orders, contacts, responses. Converting such a file through a website that processes uploads means the rows cross a network boundary and typically land in someone's logs or storage. For data about identifiable people, that step is exactly what privacy policy and common sense both say to avoid.",
            "This converter parses and serializes entirely in your browser with JavaScript — the paste, the parse, the type inference and the output all happen on your machine, with no upload step in the code path at all. It works offline once loaded, imposes no row or size quota beyond browser memory, and nothing you convert is ever written anywhere. For a one-off seed file with test users or a customer export that must not move, that is the only architecture that keeps the data's promise intact.",
          ],
        },
      ],
    },
    zh: {
      name: "CSV 转 JSON",
      tagline: "把 CSV 转成 JSON 并自动推断类型——数字、布尔、null 自动识别,带引号字段正确解析。粘贴即转,数据不上传。",
      intro: [
        "粘贴任意带表头的 CSV,实时得到 JSON 对象数组。带引号的字段、转义引号和 CRLF 换行都能正确解析,每个单元格都会得到合理类型:true/false 变布尔值,纯数字变数字,null 变 null——其余保持字符串。",
        "适合为 API 请求提供数据、给数据库灌种子数据,或把表格导出变成代码可以直接消费的结构。JSON 输出为 2 空格缩进的格式化文本,可直接复制。",
      ],
      steps: [
        "把 CSV(第一行必须是表头)粘贴到输入框。",
        "选择逗号或分号作为分隔符。",
        "复制格式化输出的 JSON 对象数组。",
      ],
      faqs: [
        {
          q: "类型推断如何区分字符串和数字?",
          a: "只有干净的数字字面量(没有前导零、没有多余空格)才会变成数字;true/false 变布尔,null 字面量变 null;其余——带前导零的编号、邮编、日期——一律保持字符串,确保值不被改变。",
        },
        {
          q: "表头有重复或空名字怎么办?",
          a: "空的表头单元格会自动替换成 column1、column2……重名会保留最后一次出现(因为 JSON 对象不能有重复键)。",
        },
        {
          q: "CSV 会被上传到服务器吗?",
          a: "不会。转换在浏览器本地运行,数据不离开设备。",
        },
      ],
      deepDive: [
        {
          heading: "类型推断:保守规则如何守住数据",
          paragraphs: [
            "CSV 单元格是文本,JSON 有类型。两者之间必须有人做判断,转换器的水平就体现在怎么判断。这里的规则刻意保守:只有干净的数字字面量——没有前导零、没有多余空格——才变成数字;true 和 false 变布尔;恰好是 null 的字面量变 null;其余一律保持字符串。也就是说 007 还是 “007” 而不是 7,邮编、货号、电话号码的零都还在,2024-03-04 这样的日期也不会悄悄变成别的东西。",
            "保守默认的理由是:类型错了是静默 bug。收到 7 而不是 “007” 的 JSON 消费方无法还原原值;收到字符串但期望数字的消费方至少会大声报错、或可以简单转换。当你确定某列真的该是数字时,在下游显式地转换——让假设发生在你知道答案的地方,而不是让转换器拿你的标识符去赌。",
            "表头处理覆盖 CSV 的两大经典顽疾:空表头和重名。空表头自动生成名字(column1、column2……),让每行保住所有字段;重名合并为最后一次出现,因为 JSON 对象不能有重复键。如果重名对你的模式有意义,先修表头再转换——源文件里没有的信息,任何转换器都变不出来。",
          ],
        },
        {
          heading: "把 CSV 解析对:引号、换行与分隔符",
          paragraphs: [
            "见到真实数据还按逗号切分就错了。实际通行的标准 RFC 4180 定义了带引号字段:含逗号、引号或换行的字段必须包在双引号里,字段内的引号通过双写转义。名字字段 “Ada, Countess” 是一个单元格;天真的 split 会把它切成两个,后面所有列跟着错位。",
            "换行是第二个陷阱。CSV 文件混用 CRLF(Windows、Excel 导出)和 LF(Unix 工具),而引号字段内的换行是数据、不是行分隔符——多行地址或粘贴的评论必须完整地留在一个单元格里。正确的解析是一台小状态机,而不是一次 split() 调用;这里跑的就是前者。",
            "分隔符随区域而变:欧洲和拉美许多地区的 Excel 写分号分隔文件,因为那些区域用逗号做小数点。工具让你显式选择逗号或分号而不是嗅探,这样「每个字段恰好都含分号」的文件不会被误判。如果源文件用制表符,配套的 JSON 转 CSV 工具可以处理回程。",
          ],
        },
        {
          heading: "载着真人信息的数据,更该本地转换",
          paragraphs: [
            "要转成 JSON 的 CSV 通常正走向 API 或数据库——内容也通常关乎真实世界:用户、订单、联系人、回复。把这种文件交给一个处理上传的网站,意味着这些行跨越网络边界,并且往往落进别人的日志或存储。对涉及可识别个人的数据,这一步正是隐私政策和常识都叫你避免的。",
            "本转换器完全在浏览器里用 JavaScript 完成解析和序列化——粘贴、解析、类型推断、输出全部发生在你的机器上,代码路径里根本没有上传这一步。页面加载后离线可用,行数和体积上限只受浏览器内存约束,转换过的任何东西都不会被写到任何地方。对含测试用户的种子文件、或绝不能外移的客户导出,这是唯一不辜负数据承诺的架构。",
          ],
        },
      ],
    },
    ja: {
      name: "CSV → JSON 変換",
      tagline:
        "CSV を型推論付きで JSON に変換 — 数値・真偽値・null を自動判定し、引用フィールドも正しく解析。貼り付けて変換、コピー。アップロードなし。",
      intro: [
        "ヘッダー行付きの CSV を貼り付けると、リアルタイムにオブジェクトの JSON 配列が得られます。引用符で囲まれたフィールド、エスケープされた引用符、CRLF 改行も正しく解析され、各セルには妥当な型が付きます:true/false は真偽値、素の数値は数値、null は null — それ以外は文字列のままです。",
        "API リクエストへの投入、DB のシード、表計算エクスポートをコードから扱える形にするのに便利です。出力は 2 スペースで整形された JSON で、そのままコピーできます。",
      ],
      steps: [
        "CSV(1 行目はヘッダー)を入力欄に貼り付けます。",
        "区切り文字にカンマかセミコロンを選びます。",
        "整形されたオブジェクトの JSON 配列をコピーします。",
      ],
      faqs: [
        {
          q: "型推論はどうやって文字列と数値を判別しますか?",
          a: "清潔な数値リテラル(先頭ゼロや余計な空白なし)だけが数値になります。true/false は真偽値、null という語は null、それ以外 — 先頭ゼロのある ID、郵便番号、日付 — は値を正確に保つため文字列のままです。",
        },
        {
          q: "ヘッダーに重複や空の名前がある場合は?",
          a: "空のヘッダーセルは自動的に column1、column2… に置き換わります。重複名は最後の出現に統合されます(JSON オブジェクトは重複キーを持てないため)。",
        },
        {
          q: "CSV はサーバーにアップロードされますか?",
          a: "いいえ。変換はブラウザ内でローカルに実行され、データは端末の外に出ません。",
        },
      ],
      deepDive: [
        {
          heading: "型推論:データを守る保守的なルール",
          paragraphs: [
            "CSV のセルはテキスト、JSON には型があります。両者を橋渡しするには誰かが判断しなければならず、変換器の品質はその判断方法に宿ります。ここのルールは意図的に保守的です。セルが数値になるのは、きれいな数値リテラルの場合だけ——先頭ゼロなし、余計な空白なし。true と false は真偽値に、正確に null という語は null に、それ以外はすべて文字列のまま。つまり 007 は 7 ではなく “007” のまま、郵便番号や商品コード、電話番号のゼロは保持され、2024-03-04 のような日付も黙って別の形になりません。",
            "保守的な既定には理由があります。間違った型は静かなバグになるからです。“007” の代わりに 7 を受け取った JSON の消費側は元の値を復元できません。数値を期待して文字列を受け取った消費側は、少なくとも大きな声で失敗するか、簡単に変換できます。ある列が本当に数値だとわかっているなら、下流で明示的に変換してください。仮定は答えを知っている場所で行うべきで、変換器に識別子を賭けさせる場所ではありません。",
            "ヘッダー処理は CSV の 2 大慢性疾患、空ヘッダーと重複名を扱います。空ヘッダーには自動生成名(column1、column2、…)が付き、全行が全フィールドを保持します。重複は最後の出現に統合されます。JSON オブジェクトは重複キーを持てないためです。重複がスキーマにとって意味があるなら、変換前にヘッダーを直してください。ソースに存在しない情報を作れる変換器はありません。",
          ],
        },
        {
          heading: "CSV を正しく解析する:引用符、改行、区切り",
          paragraphs: [
            "実データが来た瞬間、カンマでの単純分割は誤りになります。実務で通用している標準 RFC 4180 は引用フィールドを定義します。カンマ、引用符、改行を含むフィールドは二重引用符で囲み、その中の引用符は 2 つ重ねてエスケープします。“Ada, Countess” という名前フィールドは 1 セルです。素朴な split はこれを 2 つに割り、以降の全列をずらします。",
            "改行が 2 つ目の罠です。CSV は CRLF(Windows、Excel の書き出し)と LF(Unix 系ツール)が混在し、引用フィールド内の改行はレコード区切りではなくデータです。複数行の住所や貼り付けたコメントは 1 セルとして生き残る必要があります。正しい解析は小さな状態機械であって split() の呼び出しではありません。ここで動いているのは前者です。",
            "区切り文字はロケールで変わります。欧州やラテンアメリカの多くの地域の Excel はセミコロン区切りで書き出します。それらのロケールではカンマが小数点だからです。このツールは推測ではなく、カンマかセミコロンかを明示的に選べるようにしています。すべてのフィールドが偶然セミコロンを含むファイルを誤判定しないためです。タブ区切りのソースなら、兄弟ツールの JSON to CSV が帰り道を担います。",
          ],
        },
        {
          heading: "人を特定できるデータこそローカル変換を",
          paragraphs: [
            "JSON に向かう CSV は、たいてい API かデータベースに向かっており、内容もたいてい実世界のものです。ユーザー、注文、連絡先、回答。そのようなファイルをアップロードを処理するウェブサイトに通すことは、行がネットワーク境界を越え、しばしば誰かのログやストレージに着地することを意味します。識別可能な人に関するデータなら、この一手間こそプライバシーポリシーと常識の両方が避けるよう言うものです。",
            "この変換器は解析もシリアライズも完全にブラウザ内の JavaScript で行います。貼り付け、解析、型推論、出力のすべてが手元のマシンで起こり、コードパスにアップロード工程はまったく存在しません。読み込み後はオフラインで動作し、ブラウザメモリを超える行数やサイズの割当制限もなく、変換したものがどこかに書かれることもありません。テストユーザー入りのシードファイルでも、外に出してはいけない顧客エクスポートでも、データの約束を守れるのはこの構造だけです。",
          ],
        },
      ],
    },
    es: {
      name: "CSV a JSON",
      tagline:
        "Convierte CSV a JSON con inferencia de tipos automática: detecta números, booleanos y nulos, y trata bien los campos entrecomillados. Pega, convierte, copia.",
      intro: [
        "Pega cualquier CSV con fila de cabecera y recibe en tiempo real un array JSON de objetos. Los campos entrecomillados, las comillas escapadas y los finales CRLF se analizan correctamente, y cada celda obtiene un tipo sensato: true/false se vuelven booleanos, los números limpios se vuelven números, null se vuelve null — todo lo demás sigue siendo texto.",
        "Úsalo para alimentar peticiones API, sembrar bases de datos o convertir una exportación de hoja de cálculo en algo que tu código pueda consumir. La salida JSON está formateada con 2 espacios y lista para copiar.",
      ],
      steps: [
        "Pega tu CSV (la primera fila debe ser la cabecera) en el cuadro de entrada.",
        "Elige coma o punto y coma como delimitador.",
        "Copia el array JSON de objetos ya formateado.",
      ],
      faqs: [
        {
          q: "¿Cómo decide la inferencia entre cadena y número?",
          a: "Una celda se vuelve número solo si es un literal numérico limpio (sin ceros a la izquierda ni espacios), true/false se vuelven booleanos, el literal null se vuelve null, y todo lo demás — IDs con ceros iniciales, códigos postales, fechas — permanece como cadena para conservar su valor exacto.",
        },
        {
          q: "¿Y si mi cabecera tiene nombres duplicados o vacíos?",
          a: "Las celdas de cabecera vacías se sustituyen automáticamente por column1, column2… Los nombres duplicados se colapsan a la última aparición, porque los objetos JSON no pueden tener claves repetidas.",
        },
        {
          q: "¿Mi CSV se sube a un servidor?",
          a: "No. La conversión corre localmente en tu navegador — tus datos nunca salen de tu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Inferencia de tipos: las reglas conservadoras que cuidan los datos",
          paragraphs: [
            "Las celdas de CSV son texto; JSON tiene tipos. Unir los dos obliga a que alguien juzgue, y la calidad de un conversor vive en cómo juzga. Las reglas aquí son deliberadamente conservadoras: una celda se vuelve número solo si es un literal numérico limpio — sin ceros a la izquierda, sin espacios sobrantes. true y false se vuelven booleanos, el literal exacto null se vuelve null, y todo lo demás permanece como cadena. Eso significa que 007 sigue siendo “007” y no 7; los códigos postales, los códigos de producto y los teléfonos conservan sus ceros, y fechas como 2024-03-04 no se convierten en silencio en otra cosa.",
            "El valor por defecto conservador existe porque un tipo equivocado es un bug silencioso. Un consumidor JSON que recibe 7 en lugar de “007” no puede recuperar el original; uno que recibe una cadena donde quería un número al menos falla de forma visible o se convierte con facilidad. Cuando sabes que una columna es genuinamente numérica, haz la conversión aguas abajo, donde la suposición es explícita — el conversor no es el sitio para apostar con tus identificadores.",
            "El manejo de la cabecera cubre las dos enfermedades clásicas del CSV: nombres vacíos y duplicados. Las cabeceras vacías reciben nombres generados (column1, column2, ...) para que cada fila conserve todos sus campos; los duplicados colapsan a la última aparición, porque los objetos JSON no pueden llevar claves repetidas. Si los duplicados importan a tu esquema, arregla la cabecera antes de convertir — ningún conversor puede inventar información que la fuente nunca tuvo.",
          ],
        },
        {
          heading: "Parsear CSV bien: comillas, saltos y delimitadores",
          paragraphs: [
            "Partir CSV por comas es incorrecto en cuanto llega un dataset real. RFC 4180, el estándar que el formato sigue de facto, define los campos entrecomillados: un campo que contiene coma, comilla o salto de línea debe ir entre comillas dobles, y una comilla dentro de él se escapa duplicándola. Un campo de nombre que dice “Ada, Countess” es una celda; un split ingenuo lo parte en dos y desplaza todas las columnas posteriores.",
            "Los saltos de línea son la segunda trampa. Los archivos CSV mezclan CRLF (Windows, exportaciones de Excel) y LF (herramientas Unix), y un salto dentro de un campo entrecomillado es un dato, no un separador de registro — una dirección multilínea o un comentario pegado debe sobrevivir como una celda. Parsear correctamente es una pequeña máquina de estados, no una llamada a split(); eso es lo que corre aquí.",
            "Los delimitadores varían por región: Excel en buena parte de Europa y Latinoamérica escribe archivos separados por punto y coma, porque en esas configuraciones la coma es el separador decimal. La herramienta permite elegir coma o punto y coma explícitamente en lugar de olfatearlo, así que un archivo donde cada campo lleva punto y comas no se detecta mal. Si tu origen usa tabulaciones, la herramienta hermana de JSON a CSV maneja el viaje de vuelta.",
          ],
        },
        {
          heading: "Conversión local para datos que nombran personas",
          paragraphs: [
            "Los CSV que van hacia JSON suelen ir hacia una API o una base de datos — y su contenido suele ser del mundo real: usuarios, pedidos, contactos, respuestas. Pasar ese archivo por un sitio web que procesa subidas significa que las filas cruzan un límite de red y normalmente aterrizan en los registros o el almacenamiento de otra persona. Para datos sobre personas identificables, ese paso es justo lo que la política de privacidad y el sentido común dicen evitar.",
            "Este conversor parsea y serializa por completo en tu navegador con JavaScript — el pegado, el parseo, la inferencia de tipos y la salida ocurren en tu máquina, sin ningún paso de subida en la ruta de código. Funciona sin conexión una vez cargado, no impone cuota de filas o tamaño más allá de la memoria del navegador, y nada de lo que conviertes se escribe jamás en ningún sitio. Para un archivo semilla con usuarios de prueba o una exportación de clientes que no debe moverse, es la única arquitectura que mantiene intacta la promesa de los datos.",
          ],
        },
      ],
    },
    pt: {
      name: "CSV para JSON",
      tagline:
        "Converta CSV em JSON com inferência de tipos automática — números, booleanos e nulos detectados, campos entre aspas tratados. Cole, converta, copie.",
      intro: [
        "Cole qualquer CSV com linha de cabeçalho e receba em tempo real um array JSON de objetos. Campos entre aspas, aspas escapadas e finais de linha CRLF são analisados corretamente, e cada célula ganha um tipo sensato: true/false viram booleanos, números limpos viram números, null vira null — todo o resto permanece string.",
        "Use para alimentar requisições de API, popular bancos de dados ou transformar uma exportação de planilha em algo que seu código consome. A saída JSON vem formatada com indentação de 2 espaços, pronta para copiar.",
      ],
      steps: [
        "Cole seu CSV (a primeira linha deve ser o cabeçalho) na caixa de entrada.",
        "Escolha vírgula ou ponto e vírgula como delimitador.",
        "Copie o array JSON de objetos formatado.",
      ],
      faqs: [
        {
          q: "Como a inferência decide entre string e número?",
          a: "Uma célula vira número apenas se for um literal numérico limpo (sem zeros à esquerda, sem espaços), true/false viram booleanos, o literal null vira null, e todo o resto — IDs com zeros à esquerda, CEPs, datas — permanece string para preservar o valor exato.",
        },
        {
          q: "E se meu cabeçalho tiver nomes duplicados ou vazios?",
          a: "Células de cabeçalho vazias são trocadas automaticamente por column1, column2… Nomes duplicados colapsam para a última ocorrência, já que objetos JSON não podem ter chaves repetidas.",
        },
        {
          q: "Meu CSV é enviado a um servidor?",
          a: "Não. A conversão roda localmente no seu navegador — seus dados nunca saem do seu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Inferência de tipos: as regras conservadoras que protegem os dados",
          paragraphs: [
            "As células de CSV são texto; JSON tem tipos. Unir os dois exige que alguém julgue, e a qualidade de um conversor mora em como ele julga. As regras aqui são deliberadamente conservadoras: uma célula vira número apenas se for um literal numérico limpo — sem zeros à esquerda, sem espaços sobrando. true e false viram booleanos, o literal exato null vira null, e todo o resto permanece string. Isso significa que 007 continua sendo “007” e não 7; CEPs, códigos de produto e telefones mantêm seus zeros, e datas como 2024-03-04 não viram silenciosamente outra coisa.",
            "O padrão conservador existe porque um tipo errado é um bug silencioso. Um consumidor JSON que recebe 7 em vez de “007” não consegue recuperar o original; um que recebe string onde queria número ao menos falha de forma visível ou converte com facilidade. Quando você sabe que uma coluna é genuinamente numérica, faça a conversão a jusante, onde a suposição é explícita — o conversor não é o lugar para apostar seus identificadores.",
            "O tratamento do cabeçalho cobre as duas doenças clássicas do CSV: nomes vazios e duplicados. Cabeçalhos vazios recebem nomes gerados (column1, column2, ...) para que cada linha conserve todos os campos; duplicados colapsam para a última ocorrência, porque objetos JSON não podem ter chaves repetidas. Se duplicados importam para o seu esquema, conserte o cabeçalho antes de converter — nenhum conversor inventa informação que a fonte nunca teve.",
          ],
        },
        {
          heading: "Parsear CSV direito: aspas, quebras e delimitadores",
          paragraphs: [
            "Dividir CSV por vírgulas é errado assim que chega um dataset real. A RFC 4180, o padrão que o formato segue de fato, define campos entre aspas: um campo contendo vírgula, aspa ou quebra de linha deve ficar entre aspas duplas, e uma aspa dentro dele é escapada dobrando-a. Um campo de nome lendo “Ada, Countess” é uma célula; um split ingênuo o parte em dois e desloca todas as colunas seguintes.",
            "Quebras de linha são a segunda armadilha. Arquivos CSV misturam CRLF (Windows, exportações do Excel) e LF (ferramentas Unix), e uma quebra dentro de um campo entre aspas é dado, não separador de registro — um endereço multilinha ou um comentário colado precisa sobreviver como uma célula. Parsear corretamente é uma pequena máquina de estados, não uma chamada a split(); é isso que roda aqui.",
            "Delimitadores variam por região: o Excel em boa parte da Europa e da América Latina escreve arquivos separados por ponto e vírgula, porque nessas configurações a vírgula é o separador decimal. A ferramenta deixa escolher vírgula ou ponto e vírgula explicitamente em vez de farejar, então um arquivo em que todo campo contém ponto e vírgula não é mal detectado. Se sua origem usa tabulação, a ferramenta irmã de JSON para CSV cuida do caminho de volta.",
          ],
        },
        {
          heading: "Conversão local para dados que nomeiam pessoas",
          paragraphs: [
            "Os CSVs que vão para JSON geralmente vão para uma API ou um banco de dados — e seu conteúdo geralmente é do mundo real: usuários, pedidos, contatos, respostas. Passar esse arquivo por um site que processa uploads significa que as linhas cruzam uma fronteira de rede e normalmente pousam nos logs ou no armazenamento de outra pessoa. Para dados sobre pessoas identificáveis, esse passo é exatamente o que a política de privacidade e o bom senso dizem evitar.",
            "Este conversor parseia e serializa inteiramente no seu navegador com JavaScript — colar, parsear, inferir tipos e gerar a saída tudo acontece na sua máquina, sem nenhum passo de upload na rota do código. Funciona offline depois de carregado, não impõe cota de linhas ou tamanho além da memória do navegador, e nada do que você converte é escrito em lugar algum. Para um arquivo semente com usuários de teste ou uma exportação de clientes que não pode se mover, é a única arquitetura que mantém a promessa dos dados intacta.",
          ],
        },
      ],
    },
  },
});
