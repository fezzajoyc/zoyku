import { DevCsvEngine } from "../_engines/dev-engine-csv";
import { defineTool } from "../_lib/types";

const SAMPLE = 'id,name,score\n1,"Ada, Countess",9.5\n2,Grace,8\n3,Alan,null';

export default defineTool({
  slug: "csv-to-json",
  category: "developer",
  icon: "swap",
  engine: { component: DevCsvEngine, props: { direction: "csv2json", sample: SAMPLE } },
  related: ["json-to-csv", "json-formatter", "sql-formatter", "word-counter"],
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
    },
  },
});
