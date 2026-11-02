import { DevEngineSheet } from "../_engines/dev-engine-sheet";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "csv-to-excel",
  category: "developer",
  icon: "file",
  engine: { component: DevEngineSheet, props: { mode: "csv2xlsx" } },
  related: ["excel-to-csv", "csv-to-json", "json-to-csv", "json-formatter"],
  copy: {
    en: {
      name: "CSV to Excel",
      tagline:
        "Convert CSV to a real .xlsx spreadsheet in your browser — auto-detects comma, semicolon or tab delimiters, keeps quotes and line breaks intact.",
      intro: [
        "Paste CSV or drop a .csv file and download a proper Excel workbook — not a text file with a renamed extension. The engine parses quoted fields, escaped quotes and line breaks inside cells exactly per RFC 4180, auto-detects whether your file is comma, semicolon or tab separated, and writes a real .xlsx via SheetJS.",
        "Cells that are clean numbers (9.5, -3, 0) become numeric cells so SUM and charts work immediately, while IDs like 007 stay text so leading zeros survive. The first row is treated as a header (toggle it off to have Column 1…N generated for you), and you can name the sheet anything Excel allows.",
      ],
      steps: [
        "Paste your CSV into the box, or drop a .csv file.",
        "Check the detected delimiter and whether the first row is a header.",
        "Type a sheet name if you don't want the default Sheet1.",
        "Download the .xlsx and open it in Excel, Numbers or Google Sheets.",
      ],
      faqs: [
        {
          q: "Will my numbers become real numbers in Excel?",
          a: "Yes — cells that are clean numeric literals (9.5, -3, 0) are written as numeric cells, so SUM and charts work right away. Values like 007, 1e3 or 0.500 stay text on purpose: converting them would change what the cell means.",
        },
        {
          q: "My CSV uses semicolons or tabs — do I need to change anything?",
          a: "No. The delimiter is auto-detected by counting candidates outside quoted fields; you can also pick it manually. Embedded commas, doubled quotes and line breaks inside a cell are all preserved through the conversion.",
        },
        {
          q: "Is my data uploaded to a server?",
          a: "No. The workbook is generated locally in your browser with SheetJS — your rows never leave the device.",
        },
      ],
    },
    zh: {
      name: "CSV 转 Excel",
      tagline:
        "在浏览器里把 CSV 转成真正的 .xlsx 表格——自动识别逗号、分号或制表符分隔,引号字段和单元格内换行原样保留,数据不上传。",
      intro: [
        "粘贴 CSV 或拖入 .csv 文件,即可下载真正的 Excel 工作簿——不是改了后缀名的文本文件。引擎按 RFC 4180 精确解析带引号字段、转义引号和单元格内换行,自动判断文件用逗号、分号还是制表符分隔,并通过 SheetJS 生成标准 .xlsx。",
        "纯数字单元格(9.5、-3、0)会写成真正的数值,SUM 和图表开箱即用;007 这类编号保持文本,前导零不丢失。默认把第一行当表头(可关闭,自动补上 Column 1…N),工作表名称也可以随意改。",
      ],
      steps: [
        "把 CSV 粘贴到输入框,或拖入 .csv 文件。",
        "确认识别出的分隔符,以及第一行是否为表头。",
        "需要的话修改工作表名称(默认 Sheet1)。",
        "下载 .xlsx,用 Excel、Numbers 或 Google Sheets 打开。",
      ],
      faqs: [
        {
          q: "数字会变成 Excel 里真正的数值吗?",
          a: "会。干净的数字字面量(9.5、-3、0)会写成数值单元格,SUM、图表直接可用。007、1e3、0.500 这类值特意保持文本——强转数字反而会改变单元格的含义。",
        },
        {
          q: "我的 CSV 用分号或制表符分隔,需要额外设置吗?",
          a: "不需要。工具会统计引号外的分隔符候选来自动判断,也可以手动指定。单元格里的逗号、双写引号、换行都会原样保留。",
        },
        {
          q: "数据会被上传到服务器吗?",
          a: "不会。工作簿在浏览器本地用 SheetJS 生成,数据不离开设备。",
        },
      ],
    },
    ja: {
      name: "CSV → Excel 変換",
      tagline:
        "CSV をブラウザ内で本物の .xlsx に変換 — カンマ・セミコロン・タブ区切りを自動判定し、引用フィールドやセル内改行も保持。アップロード不要。",
      intro: [
        "CSV を貼り付けるか .csv ファイルをドロップすると、拡張子だけ変えたテキストではなく本物の Excel ワークブックをダウンロードできます。RFC 4180 に従って引用フィールド・エスケープされた引用符・セル内改行を正確に解析し、カンマ / セミコロン / タブの区切りを自動判定、SheetJS で標準的な .xlsx を生成します。",
        "素の数値のセル(9.5、-3、0)は数値セルになるので SUM やグラフがすぐ使え、007 のような ID は文字列のまま先頭ゼロが保たれます。1 行目はヘッダーとして扱われ(オフにすると Column 1…N を自動生成)、シート名も自由に付けられます。",
      ],
      steps: [
        "CSV を入力欄に貼り付けるか、.csv ファイルをドロップします。",
        "判定された区切り文字と、1 行目がヘッダーかどうかを確認します。",
        "必要ならシート名を変更します(既定は Sheet1)。",
        ".xlsx をダウンロードして Excel・Numbers・Google Sheets で開きます。",
      ],
      faqs: [
        {
          q: "数値は Excel で本物の数値になりますか?",
          a: "なります。素の数値リテラル(9.5、-3、0)は数値セルとして書き込まれるため、SUM やグラフがすぐ使えます。007、1e3、0.500 などは意図的に文字列のままです — 数値に変換するとセルの意味が変わってしまうためです。",
        },
        {
          q: "セミコロンやタブ区切りの CSV でもそのまま使えますか?",
          a: "使えます。引用フィールドの外にある区切り候補を数えて自動判定し、手動での指定も可能です。セル内のカンマ、二重引用符、改行はすべて変換後も保持されます。",
        },
        {
          q: "データはサーバーにアップロードされますか?",
          a: "いいえ。ワークブックはブラウザ内で SheetJS によりローカル生成され、データは端末の外に出ません。",
        },
      ],
    },
    es: {
      name: "CSV a Excel",
      tagline:
        "Convierte CSV en una hoja .xlsx real en tu navegador — detecta delimitadores de coma, punto y coma o tabulación y conserva comillas y saltos de línea.",
      intro: [
        "Pega CSV o suelta un archivo .csv y descarga un libro de Excel de verdad, no un archivo de texto con la extensión cambiada. El motor analiza los campos entrecomillados, las comillas escapadas y los saltos de línea dentro de las celdas según RFC 4180, detecta si el separador es coma, punto y coma o tabulación y genera un .xlsx estándar con SheetJS.",
        "Las celdas con números limpios (9.5, -3, 0) se escriben como celdas numéricas, así que SUMA y los gráficos funcionan de inmediato; los ID como 007 quedan como texto y conservan los ceros. La primera fila se toma como cabecera (puedes desactivarlo y se generará Columna 1…N) y el nombre de la hoja es editable.",
      ],
      steps: [
        "Pega tu CSV en el cuadro o suelta un archivo .csv.",
        "Revisa el delimitador detectado y si la primera fila es la cabecera.",
        "Escribe el nombre de la hoja si no quieres el Sheet1 predeterminado.",
        "Descarga el .xlsx y ábrelo en Excel, Numbers o Google Sheets.",
      ],
      faqs: [
        {
          q: "¿Mis números se vuelven números reales en Excel?",
          a: "Sí — las celdas con literales numéricos limpios (9.5, -3, 0) se escriben como celdas numéricas, así que SUMA y los gráficos funcionan enseguida. Valores como 007, 1e3 o 0.500 permanecen como texto a propósito: convertirlos cambiaría su significado.",
        },
        {
          q: "Mi CSV usa punto y coma o tabulaciones, ¿hay que configurar algo?",
          a: "No. El delimitador se detecta contando los candidatos fuera de los campos entrecomillados; también puedes elegirlo a mano. Las comas dentro de celdas, las comillas dobles y los saltos de línea se conservan en la conversión.",
        },
        {
          q: "¿Mis datos se suben a algún servidor?",
          a: "No. El libro se genera localmente en tu navegador con SheetJS — tus filas nunca salen del dispositivo.",
        },
      ],
    },
    pt: {
      name: "CSV para Excel",
      tagline:
        "Converta CSV em uma planilha .xlsx de verdade no navegador — detecta vírgula, ponto e vírgula ou tabulação e preserva aspas e quebras de linha.",
      intro: [
        "Cole o CSV ou solte um arquivo .csv e baixe uma pasta de trabalho real do Excel — não um arquivo de texto com extensão renomeada. O motor analisa campos entre aspas, aspas escapadas e quebras de linha dentro das células conforme a RFC 4180, detecta se o separador é vírgula, ponto e vírgula ou tabulação e gera um .xlsx padrão com SheetJS.",
        "Células com números limpos (9.5, -3, 0) viram células numéricas, então SOMA e gráficos funcionam de imediato; IDs como 007 permanecem texto e mantêm os zeros à esquerda. A primeira linha é tratada como cabeçalho (desative para gerar Column 1…N automaticamente) e o nome da planilha é editável.",
      ],
      steps: [
        "Cole seu CSV na caixa ou solte um arquivo .csv.",
        "Confira o delimitador detectado e se a primeira linha é o cabeçalho.",
        "Digite o nome da planilha se não quiser o Sheet1 padrão.",
        "Baixe o .xlsx e abra no Excel, Numbers ou Google Sheets.",
      ],
      faqs: [
        {
          q: "Meus números viram números de verdade no Excel?",
          a: "Sim — células com literais numéricos limpos (9.5, -3, 0) são gravadas como células numéricas, então SOMA e gráficos funcionam na hora. Valores como 007, 1e3 ou 0.500 permanecem texto de propósito: convertê-los mudaria o significado da célula.",
        },
        {
          q: "Meu CSV usa ponto e vírgula ou tabulação — preciso ajustar algo?",
          a: "Não. O delimitador é detectado contando os candidatos fora dos campos entre aspas; você também pode escolher manualmente. Vírgulas dentro de células, aspas duplicadas e quebras de linha são preservados na conversão.",
        },
        {
          q: "Meus dados são enviados para um servidor?",
          a: "Não. A pasta de trabalho é gerada localmente no seu navegador com SheetJS — suas linhas nunca saem do dispositivo.",
        },
      ],
    },
  },
});
