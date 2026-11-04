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
    },
  },
});
