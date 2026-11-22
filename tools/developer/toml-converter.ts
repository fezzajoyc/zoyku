import { DevEngineToml } from "../_engines/dev-engine-toml";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "toml-converter",
  category: "developer",
  icon: "code",
  engine: { component: DevEngineToml },
  related: ["json-yaml-converter", "json-formatter", "json-diff", "json-path-query"],
  copy: {
    en: {
      name: "TOML ↔ JSON Converter",
      tagline:
        "Convert TOML to JSON and JSON to TOML instantly — spec-compliant TOML 1.0 parsing, nested tables and arrays of tables supported. Free, private, offline.",
      intro: [
        "TOML is the configuration format of Cargo, pyproject.toml and many modern tools, yet most online converters only cover JSON and YAML. This converter handles both directions: TOML → JSON for reading config in tools that speak JSON, and JSON → TOML for writing config files from API responses or scripts.",
        "The conversion uses @iarna/toml, a spec-compliant TOML 1.0 parser. Nested tables, arrays of tables, inline tables and first-class dates are all handled; the TOML root must be a table, so JSON arrays or scalars are rejected with a clear explanation instead of silently producing invalid output.",
        "Everything runs locally in your browser — no uploads, no tracking. Inputs up to 512,000 characters are supported per conversion.",
      ],
      steps: [
        "Pick the direction: TOML → JSON or JSON → TOML.",
        "Paste your TOML config or JSON document.",
        "Click Convert — the result appears below with a copy button; parse errors show the exact problem.",
      ],
      faqs: [
        {
          q: "Why can't I convert a JSON array to TOML directly?",
          a: "The TOML specification requires the document root to be a table. Wrap the array under a key first, e.g. { \"items\": [...] }, and the conversion will work — this mirrors how real TOML files are structured.",
        },
        {
          q: "What happens to TOML dates in the JSON output?",
          a: "TOML has first-class date types; JSON does not. Dates are serialized as ISO 8601 strings (e.g. 1979-05-27T15:32:00.000Z) so nothing is lost. In the JSON → TOML direction, date-looking strings stay strings rather than being silently converted into TOML dates — edit them manually if you need native dates.",
        },
      ],
    },
    zh: {
      name: "TOML ↔ JSON 转换",
      tagline:
        "TOML 与 JSON 双向即时转换——符合 TOML 1.0 规范,支持嵌套表与表数组,免费、即时、离线可用。",
      intro: [
        "TOML 是 Cargo、pyproject.toml 等现代工具的配置格式,但多数在线转换器只覆盖 JSON 和 YAML。本工具支持双向:TOML → JSON 方便在 JSON 工具链中读取配置,JSON → TOML 用于从 API 响应或脚本生成配置文件。",
        "转换内核是符合 TOML 1.0 规范的 @iarna/toml 解析器。嵌套表、表数组、内联表、一等日期全部支持;TOML 根必须是表,JSON 数组或标量会被明确拒绝并给出解释,不会静默产出无效结果。",
        "全部在本机浏览器完成——不上传、不追踪。单次最多支持 512,000 字符。",
      ],
      steps: [
        "选择方向:TOML → JSON 或 JSON → TOML。",
        "粘贴 TOML 配置或 JSON 文档。",
        "点击转换——结果显示在下方并带复制按钮;解析错误会给出具体原因。",
      ],
      faqs: [
        {
          q: "为什么 JSON 数组不能直接转 TOML?",
          a: "TOML 规范要求文档根必须是表。先把数组包在一个键下,例如 { \"items\": [...] },转换即可正常进行——这也与真实 TOML 文件的结构一致。",
        },
        {
          q: "TOML 日期在 JSON 输出里变成什么?",
          a: "TOML 有一等日期类型而 JSON 没有。日期会被序列化为 ISO 8601 字符串(如 1979-05-27T15:32:00.000Z),信息不丢失。JSON → TOML 方向,看起来像日期的字符串保持字符串,不会被静默转成 TOML 日期——需要原生日期请手动编辑。",
        },
      ],
    },
    ja: {
      name: "TOML ↔ JSON 変換",
      tagline:
        "TOML と JSON を双方向に即時変換 — TOML 1.0 規準の解析、ネストしたテーブルとテーブル配列対応。無料・プライベート・オフライン。",
      intro: [
        "TOML は Cargo や pyproject.toml など現代のツールの設定形式ですが、多くのオンライン変換器は JSON と YAML のみ対応です。このツールは双方向を処理します:TOML → JSON で JSON ツールチェーンから設定を読み、JSON → TOML で API レスポンスやスクリプトから設定ファイルを生成します。",
        "変換エンジンは TOML 1.0 規準の @iarna/toml パーサーです。ネストしたテーブル、テーブル配列、インラインテーブル、ファーストクラスの日付に対応。TOML のルートはテーブルである必要があり、JSON の配列やスカラーは明確な説明付きで拒否されます。",
        "すべてブラウザ内で完結 — アップロードも追跡もなし。1 回あたり最大 512,000 文字。",
      ],
      steps: [
        "方向を選択:TOML → JSON または JSON → TOML。",
        "TOML 設定または JSON ドキュメントを貼り付けます。",
        "変換ボタンをクリック — 結果が下に表示され、コピーボタンが付きます。解析エラーは具体的な原因を表示します。",
      ],
      faqs: [
        {
          q: "JSON の配列を直接 TOML に変換できないのはなぜ?",
          a: "TOML 仕様ではドキュメントのルートはテーブルである必要があります。まず { \"items\": [...] } のようにキーで包めば変換できます — 実際の TOML ファイルの構造と一致します。",
        },
        {
          q: "TOML の日付は JSON 出力でどうなりますか?",
          a: "TOML にはファーストクラスの日付型がありますが JSON にはありません。日付は ISO 8601 文字列(例:1979-05-27T15:32:00.000Z)としてシリアライズされ、情報は失われません。JSON→TOML 方向では日付風の文字列は文字列のままです — ネイティブな日付が必要なら手動で編集してください。",
        },
      ],
    },
    es: {
      name: "Conversor TOML ↔ JSON",
      tagline:
        "Convierta TOML a JSON y JSON a TOML al instante — análisis compatible con TOML 1.0, tablas anidadas y arrays de tablas. Gratis, privado, sin conexión.",
      intro: [
        "TOML es el formato de configuración de Cargo, pyproject.toml y muchas herramientas modernas, pero la mayoría de convertidores en línea solo cubren JSON y YAML. Este convertidor maneja ambas direcciones: TOML → JSON para leer configuración desde herramientas JSON, y JSON → TOML para escribir archivos de configuración desde respuestas de API o scripts.",
        "La conversión usa @iarna/toml, un analizador compatible con TOML 1.0. Tablas anidadas, arrays de tablas, tablas en línea y fechas de primera clase están soportados; la raíz TOML debe ser una tabla, por lo que los arrays o escalares JSON se rechazan con una explicación clara.",
        "Todo se ejecuta localmente en su navegador — sin subidas, sin rastreo. Hasta 512,000 caracteres por conversión.",
      ],
      steps: [
        "Elija la dirección: TOML → JSON o JSON → TOML.",
        "Pegue su configuración TOML o documento JSON.",
        "Haga clic en Convertir — el resultado aparece abajo con botón de copia; los errores de análisis muestran el problema exacto.",
      ],
      faqs: [
        {
          q: "¿Por qué no puedo convertir un array JSON a TOML directamente?",
          a: "La especificación TOML exige que la raíz del documento sea una tabla. Envuelva el array bajo una clave primero, p. ej. { \"items\": [...] }, y la conversión funcionará — igual que los archivos TOML reales.",
        },
        {
          q: "¿Qué ocurre con las fechas TOML en la salida JSON?",
          a: "TOML tiene fechas de primera clase; JSON no. Las fechas se serializan como cadenas ISO 8601 (p. ej. 1979-05-27T15:32:00.000Z). En la dirección JSON → TOML, las cadenas con aspecto de fecha permanecen como cadenas — edítelas manualmente si necesita fechas nativas.",
        },
      ],
    },
    pt: {
      name: "Conversor TOML ↔ JSON",
      tagline:
        "Converta TOML para JSON e JSON para TOML instantaneamente — análise compatível com TOML 1.0, tabelas aninhadas e arrays de tabelas. Grátis, privado, offline.",
      intro: [
        "TOML é o formato de configuração do Cargo, pyproject.toml e muitas ferramentas modernas, mas a maioria dos conversores online cobre apenas JSON e YAML. Este conversor lida com as duas direções: TOML → JSON para ler configuração em ferramentas JSON, e JSON → TOML para escrever arquivos de configuração a partir de respostas de API ou scripts.",
        "A conversão usa @iarna/toml, um parser compatível com TOML 1.0. Tabelas aninhadas, arrays de tabelas, tabelas inline e datas de primeira classe são suportados; a raiz TOML deve ser uma tabela, então arrays ou escalares JSON são rejeitados com uma explicação clara.",
        "Tudo é executado localmente no seu navegador — sem uploads, sem rastreamento. Até 512.000 caracteres por conversão.",
      ],
      steps: [
        "Escolha a direção: TOML → JSON ou JSON → TOML.",
        "Cole sua configuração TOML ou documento JSON.",
        "Clique em Converter — o resultado aparece abaixo com botão de cópia; erros de análise mostram o problema exato.",
      ],
      faqs: [
        {
          q: "Por que não posso converter um array JSON para TOML diretamente?",
          a: "A especificação TOML exige que a raiz do documento seja uma tabela. Envolva o array sob uma chave primeiro, p. ex. { \"items\": [...] }, e a conversão funcionará — como nos arquivos TOML reais.",
        },
        {
          q: "O que acontece com datas TOML na saída JSON?",
          a: "TOML tem tipos de data de primeira classe; JSON não. As datas são serializadas como strings ISO 8601 (ex. 1979-05-27T15:32:00.000Z). Na direção JSON → TOML, strings que parecem datas permanecem strings — edite-as manualmente se precisar de datas nativas.",
        },
      ],
    },
  },
});
