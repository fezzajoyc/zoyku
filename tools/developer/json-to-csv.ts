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
    },
  },
});
