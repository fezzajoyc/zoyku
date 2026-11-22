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
      deepDive: [
        {
          heading: "Why TOML exists — and where it rules",
          paragraphs: [
            "TOML was designed by Tom Preston-Werner (GitHub’s founder) with one explicit goal: a config format a human can write correctly by eye and a machine can parse unambiguously. That is why it won Cargo (Rust), pyproject.toml (Python), go.mod adjacency and dozens of other ecosystems: version constraints, dependency lists and feature flags stay readable after years of hand-editing, which YAML’s indentation-sensitive syntax and JSON’s lack of comments cannot claim.",
            "The format’s strictness is a feature, not an annoyance. Duplicate keys are errors (not silent overrides), mixed-type arrays are allowed but explicit, and the table structure (those [section] headers) has precise semantics: [servers.alpha] declares a nested table, and everything after it belongs there until the next header. Getting these rules right is exactly what a converter must preserve.",
            "Where TOML does not rule: deeply nested data (five levels of [a.b.c.d.e] headers get harder to read than JSON), streaming processing (TOML is a whole-document format), and programmatic configs written by machines — that is JSON territory.",
          ],
        },
        {
          heading: "Type-mapping traps the converter handles for you",
          paragraphs: [
            "Three type-system gaps require deliberate policy. Dates: TOML has native local dates, local times and offset date-times; JSON has none — the converter serializes them as ISO 8601 strings and refuses to guess in the reverse direction. Integers versus floats: TOML distinguishes them (1 ≠ 1.0); JSON numbers do not, so the converter writes whole numbers as integers and any value with a decimal point as float, preserving the distinction a Cargo version constraint or a price field might depend on.",
            "Arrays of tables are the other classic trap: [[products]] in TOML is an array of objects, and the converter emits it as a JSON array of objects — but a JSON array nested one level deeper cannot be “promoted” back into TOML table headers without changing the data shape, which is why round-trips through deeply nested JSON sometimes produce dotted-key inline tables instead of headers. Both forms parse to identical data; only the presentation differs.",
            "Underscore separators in TOML integers (1_000_000) are legal and preserved on parse, so do not be surprised when 5432 comes back as 5_432 — it is the same integer, written in the format’s own readable convention.",
          ],
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
      deepDive: [
        {
          heading: "TOML 为什么存在——以及它统治哪些领域",
          paragraphs: [
            "TOML 由 Tom Preston-Werner(GitHub 创始人)设计,目标明确:一种人眼能正确书写、机器能无歧义解析的配置格式。这就是它拿下 Cargo(Rust)、pyproject.toml(Python)、go.mod 周边与数十个生态的原因:版本约束、依赖清单与特性开关在多年手工编辑后仍然可读——YAML 的缩进敏感语法与 JSON 的无注释都做不到。",
            "格式的严格是特性而非缺点。重复键是错误(而非静默覆盖),混合类型数组合法但显式,表结构([section] 头)有精确语义:[servers.alpha] 声明嵌套表,其后的一切都属于它,直到下一个头。转换器要保真的正是这些规则。",
            "TOML 不擅长的地方:深层嵌套数据(五层 [a.b.c.d.e] 头比 JSON 更难读)、流式处理(TOML 是整文档格式)、机器生成的程序化配置——那是 JSON 的领地。",
          ],
        },
        {
          heading: "转换器替你处理好的类型映射坑",
          paragraphs: [
            "三处类型系统鸿沟需要明确的策略。日期:TOML 有原生本地日期、本地时间与带偏移日期时间;JSON 没有——转换器把它们序列化为 ISO 8601 字符串,并在反向时拒绝猜测。整数与浮点:TOML 区分两者(1 ≠ 1.0);JSON 数字不分,所以转换器把整数值写成整数、带小数点的写成浮点,保住 Cargo 版本约束或价格字段可能依赖的区别。",
            "表数组是另一个经典陷阱:TOML 的 [[products]] 是对象数组,转换器输出为 JSON 对象数组——但深一层的 JSON 数组无法在不改变数据形状的前提下「升格」回 TOML 表头,这就是深层嵌套 JSON 的往返有时产出点号键内联表而非表头的原因。两种形式解析出的数据完全一致,只是表示不同。",
            "TOML 整数的下划线分隔(1_000_000)合法且解析时保留,所以 5432 回来变成 5_432 不必惊讶——同一个整数,按该格式自己的可读约定书写。",
          ],
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
      deepDive: [
        {
          heading: "TOML が存在する理由、そしてその領域",
          paragraphs: [
            "TOML は Tom Preston-Werner(GitHub 創設者)が明確な目標を掲げて設計しました:人が目で正しく書け、機械が曖昧なくパースできる設定形式。それが Cargo(Rust)、pyproject.toml(Python)、go.mod 周辺と数十のエコシステムを獲得した理由です:バージョン制約・依存リスト・フィーチャーフラグは、YAML のインデント依存構文や JSON のコメント不可と違い、長年の手編集の後も読みやすいままです。",
            "フォーマットの厳格さは欠点ではなく特徴です。重複キーはエラー(黙って上書きしない)、混合型配列は許可されるが明示的、テーブル構造([section] ヘッダ)は正確なセマンティクスを持ちます:[servers.alpha] はネストしたテーブルを宣言し、次のヘッダまでのすべてがそこに属します。変換器が保つべきはまさにこの規則です。",
            "TOML が向かない場所:深くネストしたデータ([a.b.c.d.e] の五層ヘッダは JSON より読みにくい)、ストリーミング処理(TOML は文書全体形式)、機械が生成するプログラマティック設定 — それは JSON の領域です。",
          ],
        },
        {
          heading: "変換器が処理する型マッピングの罠",
          paragraphs: [
            "三つの型システムの溝には明示的な方針が必要です。日付:TOML にはローカル日付・ローカル時刻・オフセット付き日時のネイティブ型がありますが JSON にはなく、変換器は ISO 8601 文字列としてシリアライズし、逆方向では推測を拒否します。整数と浮動小数:TOML は区別し(1 ≠ 1.0)、JSON の数値は区別しないため、変換器は整数値を整数として、小数点を含む値を浮動小数として書き出し、Cargo のバージョン制約や価格フィールドが依存する区別を保ちます。",
            "テーブル配列はもう一つの古典的罠です:TOML の [[products]] はオブジェクト配列で、変換器は JSON のオブジェクト配列として出力します — しかし一階層深い JSON 配列はデータ形状を変えずに TOML テーブルヘッダへ「昇格」できないため、深くネストした JSON の往復ではヘッダではなくドットキー・インラインテーブルが生成されることがあります。両者は同一データにパースされ、表現だけが異なります。",
            "TOML 整数のアンダースコア区切り(1_000_000)は合法でパース時に保持されるため、5432 が 5_432 で戻っても驚かないでください — 同じ整数が、フォーマット自身の可読慣行で書かれているだけです。",
          ],
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
      deepDive: [
        {
          heading: "Por qué existe TOML — y dónde manda",
          paragraphs: [
            "TOML fue diseñado por Tom Preston-Werner (fundador de GitHub) con un objetivo explícito: un formato de configuración que un humano puede escribir correctamente a simple vista y una máquina puede analizar sin ambigüedad. Por eso ganó Cargo (Rust), pyproject.toml (Python), el ecosistema go.mod y decenas más: las restricciones de versión, listas de dependencias y flags de características siguen legibles tras años de edición a mano — algo que la sintaxis sensible a la indentación de YAML y la falta de comentarios de JSON no pueden reclamar.",
            "La rigidez del formato es una característica, no una molestia. Las claves duplicadas son errores (no sobrescrituras silenciosas), los arrays de tipos mixtos están permitidos pero explícitos, y la estructura de tablas (esos encabezados [sección]) tiene semántica precisa: [servers.alpha] declara una tabla anidada, y todo lo que sigue le pertenece hasta el siguiente encabezado. Preservar esas reglas es exactamente lo que un conversor debe hacer.",
            "Donde TOML no manda: datos profundamente anidados (cinco niveles de encabezados [a.b.c.d.e] se leen peor que JSON), procesamiento en flujo (TOML es un formato de documento completo) y configuraciones programáticas escritas por máquinas — ese es territorio de JSON.",
          ],
        },
        {
          heading: "Trampas de mapeo de tipos que el conversor resuelve por ti",
          paragraphs: [
            "Tres huecos del sistema de tipos exigen política deliberada. Fechas: TOML tiene fechas locales nativas, horas locales y fechas-hora con desplazamiento; JSON no — el conversor las serializa como cadenas ISO 8601 y se niega a adivinar en la dirección inversa. Enteros versus flotantes: TOML los distingue (1 ≠ 1.0); los números de JSON no, así que el conversor escribe los enteros como enteros y cualquier valor con punto decimal como flotante, preservando la distinción de la que puede depender una restricción de versión de Cargo o un campo de precio.",
            "Los arrays de tablas son la otra trampa clásica: [[products]] en TOML es un array de objetos, y el conversor lo emite como un array de objetos JSON — pero un array JSON un nivel más profundo no puede «promoverse» de vuelta a encabezados de tabla TOML sin cambiar la forma de los datos, por eso los viajes redondos por JSON profundamente anidado a veces producen tablas en línea con claves punteadas en lugar de encabezados. Ambas formas parsean a datos idénticos; solo difiere la presentación.",
            "Los separadores de subrayado en enteros TOML (1_000_000) son legales y se conservan al analizar, así que no te sorprendas cuando 5432 vuelva como 5_432 — es el mismo entero, escrito en la convención legible del propio formato.",
          ],
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
      deepDive: [
        {
          heading: "Por que o TOML existe — e onde ele manda",
          paragraphs: [
            "O TOML foi desenhado por Tom Preston-Werner (fundador do GitHub) com um objetivo explícito: um formato de configuração que um humano escreve corretamente a olho e uma máquina analisa sem ambiguidade. Por isso ele venceu Cargo (Rust), pyproject.toml (Python), o ecossistema go.mod e dezenas mais: restrições de versão, listas de dependências e flags de features continuam legíveis após anos de edição manual — coisa que a sintaxe sensível à indentação do YAML e a ausência de comentários do JSON não proporcionam.",
            "A rigidez do formato é uma feature, não um incômodo. Chaves duplicadas são erros (não sobrescritas silenciosas), arrays de tipos mistos são permitidos mas explícitos, e a estrutura de tabelas (aqueles cabeçalhos [seção]) tem semântica precisa: [servers.alpha] declara uma tabela aninhada, e tudo depois dela pertence a ela até o próximo cabeçalho. Preservar essas regras é exatamente o que um conversor deve fazer.",
            "Onde o TOML não manda: dados profundamente aninhados (cinco níveis de cabeçalhos [a.b.c.d.e] ficam mais difíceis de ler que JSON), processamento em fluxo (TOML é um formato de documento inteiro) e configurações programáticas escritas por máquinas — esse é território do JSON.",
          ],
        },
        {
          heading: "Armadilhas de mapeamento de tipos que o conversor resolve para você",
          paragraphs: [
            "Três lacunas do sistema de tipos exigem política deliberada. Datas: o TOML tem datas locais nativas, horários locais e datas-hora com deslocamento; o JSON não — o conversor as serializa como strings ISO 8601 e se recusa a adivinhar na direção inversa. Inteiros versus floats: o TOML os distingue (1 ≠ 1.0); os números do JSON não, então o conversor escreve valores inteiros como inteiros e qualquer valor com ponto decimal como float, preservando a distinção de que uma restrição de versão do Cargo ou um campo de preço pode depender.",
            "Arrays de tabelas são a outra armadilha clássica: [[products]] no TOML é um array de objetos, e o conversor o emite como array de objetos JSON — mas um array JSON um nível mais profundo não pode ser «promovido» de volta a cabeçalhos de tabela TOML sem mudar a forma dos dados, por isso viagens de ida e volta por JSON profundamente aninhado às vezes produzem tabelas inline com chaves pontuadas em vez de cabeçalhos. Ambas as formas parseiam para dados idênticos; só a apresentação difere.",
            "Separadores de sublinhado em inteiros TOML (1_000_000) são legais e preservados no parse, então não se surpreenda quando 5432 voltar como 5_432 — é o mesmo inteiro, escrito na convenção legível do próprio formato.",
          ],
        },
      ],
    },
  },
});
