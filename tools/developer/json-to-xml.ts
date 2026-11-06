import { DevJsonToXmlEngine } from "../_engines/dev-engine-json-to-xml";
import { defineTool } from "../_lib/types";

/** 与 xml-to-json 的样例互为往返:转 XML → 解析回 JSON 得到同一份数据。 */
const SAMPLE =
  '{"library":{"book":[{"@id":"1","@lang":"en","title":"Clean Code","author":"Robert C. Martin","tags":["programming","craft"],"inStock":true}]}}';

export default defineTool({
  slug: "json-to-xml",
  category: "developer",
  icon: "code",
  engine: { component: DevJsonToXmlEngine, props: { sample: SAMPLE } },
  related: ["xml-to-json", "xml-formatter", "json-formatter", "json-validator", "md5-generator", "sha256-generator", "base64-image", "url-encoder", "html-minifier", "url-decoder"],
  copy: {
    en: {
      name: "JSON to XML",
      tagline:
        "Convert JSON to well-formed XML with attributes, repeated elements and correct escaping — round-trips with our XML to JSON tool. All local, all instant.",
      intro: [
        'Paste JSON and get a pretty-printed XML document with a proper declaration and 2-space indentation. Objects become elements, arrays repeat their key once per item, and "@key" members become XML attributes — the exact inverse of our XML to JSON converter, so data can go there and back.',
        'Everything is escaped by the book (& < > " \') and arbitrary keys are coerced into legal element names, so the output is always well-formed XML. Values XML cannot express — null, empty arrays — become empty elements, and the limits are spelled out below.',
      ],
      steps: [
        "Paste your JSON into the input box.",
        "The XML appears live — set a custom root element name if you need one.",
        "Copy the result or download it as an .xml file.",
      ],
      faqs: [
        {
          q: "How do attributes and arrays map to XML?",
          a: 'A key starting with @ (or @_) becomes an attribute of its parent element, and "#text" becomes the element\'s text content — matching what our XML to JSON tool emits. Arrays repeat the same element once per item; a JSON array at the very top is wrapped as <root><item>…</item></root> because a document needs a single root.',
        },
        {
          q: "What are the limits of the JSON ⇄ XML mapping?",
          a: "XML has no notation for null or for empty arrays — both collapse to empty elements. Mixed content (text interspersed with child elements) cannot round-trip: text is kept as one block. And when parsing back, a lone repeated element becomes a plain value rather than a one-item array.",
        },
        {
          q: "What happens to keys that aren't valid XML names?",
          a: 'They are coerced: illegal characters become underscores and a key starting with a digit gets a leading underscore ("2fa" → <_2fa>). CJK and accented letters are already legal XML names and are kept as-is.',
        },
      ],
      deepDive: [
        {
          heading: "Attributes versus elements — the design decision",
          paragraphs: [
            "XML lets you express the same data two ways: <book id=\"1\"/> (attribute) or <book><id>1</id></book> (child element). The semantics differ more than the syntax suggests. Attributes are unordered, unique per element and cannot repeat or nest; child elements can repeat, carry their own attributes and appear in order. Metadata — identifiers, languages, timestamps — traditionally goes in attributes; the payload goes in elements.",
            "JSON has no such duality, which is why converters need a convention. This tool follows the widely used @-prefix convention: a member named @id becomes an attribute, a member named #text becomes the element's own text content. The same convention is what our XML to JSON tool emits when parsing, so a document can go JSON → XML → JSON and come back recognizable.",
            "The choice is not merely cosmetic. Some XML consumers (certain SOAP stacks, XSD validators) insist data live one way or the other; attribute-heavy documents are slightly more compact but harder to extend later, because adding structure to an attribute means converting it to an element and touching every consumer. If you are designing a new XML format rather than matching an old one, prefer elements for anything that might grow.",
          ],
        },
        {
          heading: "Escaping and name coercion: why the output is always well-formed",
          paragraphs: [
            "XML is stricter than JSON about characters. Five characters are special — & < > \" ' — and the first two would corrupt the document if emitted raw. Every text and attribute value here is escaped with the standard entities, so a JSON string containing <script> becomes a harmless &lt;script&gt; in the output. The reverse trap exists too: sequences like &#xHHHH; (numeric character references) are valid XML but cannot be produced from arbitrary JSON round-trips.",
            "Element names are even stricter: they must start with a letter or underscore and cannot contain spaces or many punctuation characters. JSON keys, by contrast, are arbitrary strings. The tool coerces them — illegal characters become underscores, a leading digit gets a prefixed underscore — so the document is always parseable. CJK characters and accented Latin letters are legal XML names and survive untouched.",
            "These coercions mean the mapping is not injective: two different JSON keys can wash to the same XML name, and once that happens, converting back cannot restore the original. If your keys contain spaces, slashes or begin with digits, treat the XML side as a lossy projection and keep the JSON as the source of truth.",
          ],
        },
        {
          heading: "Local conversion for sensitive payloads",
          paragraphs: [
            "JSON payloads headed for XML are often business data: invoices, user records, API requests with customer identifiers. Feeding them to a server-based converter sends that data to a third party whose retention policy you do not know. This converter runs entirely in your browser — the conversion happens as you type, no request is made, and the page works offline once loaded.",
            "The two-way workflow matters for migration work: convert your JSON to XML with this tool, paste the XML into the XML to JSON tool, and compare — if the result matches your input structurally, the mapping conventions (@ attributes, #text) are compatible with your consumers. Discovering a mismatch locally beats discovering it after the SOAP endpoint rejects your first request.",
            "Pair it with the XML formatter when the consumer needs a different indentation or the XML formatter when you want to eyeball the output — and remember the documented limits: null and empty arrays collapse to empty elements, so a schema expecting xsi:nil will need a post-processing step.",
          ],
        },
      ],
    },
    zh: {
      name: "JSON 转 XML",
      tagline: "JSON 一键变成规范 XML——属性、重复元素、严格转义,与站内 XML 转 JSON 工具无缝往返。全程本地,即时完成。",
      intro: [
        "粘贴 JSON,得到带标准声明、2 空格缩进的美化 XML 文档。对象变成元素,数组按项重复键名,\"@key\" 成员变成 XML 属性——与站内 XML 转 JSON 工具互为逆操作,数据可以过去再回来。",
        '所有内容按规范转义(& < > " \'),任意键名会被清洗成合法的元素名,输出永远是良构的 XML。XML 表达不了的值——null、空数组——会变成空元素,具体限制在下面写明。',
      ],
      steps: ["把 JSON 粘贴到输入框。", "XML 实时生成——需要时可以自定义根元素名。", "复制结果,或下载为 .xml 文件。"],
      faqs: [
        {
          q: "属性和数组怎么映射到 XML?",
          a: '以 @ 或 @_ 开头的键变成父元素的属性,"#text" 变成元素的文本内容——与站内 XML 转 JSON 工具的输出一致。数组按项重复同一个元素;顶层的 JSON 数组会包成 <root><item>…</item></root>,因为文档必须有唯一根元素。',
        },
        {
          q: "JSON ⇄ XML 映射有哪些限制?",
          a: "XML 没有表达 null 和空数组的记法——两者都会变成空元素。混合内容(文本与子元素交错)无法往返:文本会合并成一块。另外解析回去时,单个重复元素会变成普通值而不是单元素数组。",
        },
        {
          q: "不合法的 XML 键名怎么处理?",
          a: '会被清洗:非法字符换成下划线,以数字开头的键补上下划线前缀("2fa" → <_2fa>)。中日韩文字和带重音的字母本来就是合法的 XML 名,原样保留。',
        },
      ],
      deepDive: [
        {
          heading: "属性还是元素——一个绕不开的设计决定",
          paragraphs: [
            "XML 允许用两种方式表达同一份数据:<book id=\"1\"/>(属性)或 <book><id>1</id></book>(子元素)。语义差别比语法差别大。属性无序、每个元素内唯一、不能重复或嵌套;子元素可以重复、自带属性、保持顺序。惯例是元数据——标识符、语言、时间戳——放属性,真正的载荷放元素。",
            "JSON 没有这种二元性,所以转换器必须约定。本工具采用广泛使用的 @ 前缀约定:名为 @id 的成员变成属性,名为 #text 的成员变成元素自身的文本内容。站内 XML 转 JSON 工具解析时输出的正是同一套约定,所以文档可以 JSON → XML → JSON 走一圈回来还能认得出。",
            "这不只是美观问题。某些 XML 消费方(一些 SOAP 栈、XSD 校验器)坚持数据必须放某一侧;属性多的文档略紧凑,但日后难以扩展——想给属性加结构,就得把它改成元素,并惊动所有消费方。如果你是在设计新格式而不是迁就旧格式,凡可能增长的字段都优先放元素。",
          ],
        },
        {
          heading: "转义与键名清洗:输出为什么永远是良构的",
          paragraphs: [
            "XML 对字符比 JSON 挑剔。有五个字符是特殊的——& < > \" '——前两个如果原样输出会直接毁掉文档。这里所有文本和属性值都按标准实体转义,含 <script> 的 JSON 字符串到输出里会变成无害的 &lt;script&gt;。反向的坑也存在:&#xHHHH; 这类数字字符引用是合法 XML,却没法从任意 JSON 往返生成。",
            "元素名更严:必须以字母或下划线开头,不能含空格和许多标点。JSON 的键却是任意字符串。工具会对它们做清洗——非法字符换成下划线,数字开头补前缀下划线——保证文档永远可解析。中日韩字符和带重音的拉丁字母本来就是合法 XML 名,原样保留。",
            "这些清洗意味着映射不是一一对应的:两个不同的 JSON 键可能洗成同一个 XML 名,一旦发生,转回去就还原不了。如果你的键里有空格、斜杠或以数字开头,把 XML 侧当作有损投影,JSON 才是唯一事实来源。",
          ],
        },
        {
          heading: "敏感数据的转换留在本地",
          paragraphs: [
            "要转成 XML 的 JSON 载荷往往是业务数据:发票、用户记录、带客户标识的 API 请求。交给基于服务器的转换器,等于把这些数据送给一个你不知道保留政策的第三方。本转换器完全在浏览器内运行——输入的同时就地转换,不发出任何请求,页面加载后离线也能用。",
            "双向工作流对迁移工作很关键:用本工具把 JSON 转成 XML,再把 XML 贴进 XML 转 JSON 工具,对比结果——如果结构上和输入一致,说明 @ 属性、#text 这套约定与你的消费方兼容。在本地发现不匹配,总好过 SOAP 端点拒掉你第一个请求才发现。",
            "消费方需要不同缩进时可以接站内 XML 格式化工具——同时记住已写明的限制:null 和空数组会塌缩成空元素,如果对端 schema 要求 xsi:nil,还需要一步后处理。",
          ],
        },
      ],
    },
    ja: {
      name: "JSON → XML 変換",
      tagline:
        "JSON を属性・繰り返し要素・正しいエスケープ付きの整形式 XML へ。サイト内の XML → JSON ツールと往復可能。すべてローカルで即時処理。",
      intro: [
        'JSON を貼り付けると、XML 宣言と 2 スペースのインデント付きの整形済み XML 文書が得られます。オブジェクトは要素に、配列は項目ごとにキーの繰り返しに、"@key" メンバーは XML 属性になります — サイト内の XML → JSON ツールと正確に逆の変換です。',
        "すべて仕様どおりにエスケープし(& < > \" ')、任意のキー名は合法的な要素名に変換されるため、出力は常に整形式の XML です。XML で表現できない値 — null や空配列 — は空要素になり、制限は以下に明記しています。",
      ],
      steps: ["JSON を入力欄に貼り付けます。", "XML がリアルタイムに生成されます — 必要ならルート要素名を変更できます。", "結果をコピーするか、.xml ファイルとしてダウンロードします。"],
      faqs: [
        {
          q: "属性と配列は XML にどう対応しますか?",
          a: '@ または @_ で始まるキーは親要素の属性に、"#text" は要素のテキスト内容になります(サイト内の XML → JSON ツールと同じ規約です)。配列は項目ごとに同じ要素を繰り返します。最上位の JSON 配列は、文書にルートが 1 つ必要なため <root><item>…</item></root> に包まれます。',
        },
        {
          q: "JSON ⇄ XML マッピングの限界は?",
          a: "XML には null や空配列の記法がなく、どちらも空要素になります。混合コンテンツ(テキストと子要素の混在)は往復できず、テキストは 1 つのブロックにまとめられます。また解析時、単独の繰り返し要素は 1 項目の配列ではなく普通の値になります。",
        },
        {
          q: "XML の名前として不正なキーはどうなりますか?",
          a: '変換されます:不正な文字はアンダースコアになり、数字で始まるキーには先頭にアンダースコアが付きます("2fa" → <_2fa>)。CJK やアクセント付き文字は元々合法的な XML 名なので、そのまま保持されます。',
        },
      ],
      deepDive: [
        {
          heading: "属性か要素か——避けて通れない設計判断",
          paragraphs: [
            "XML は同じデータを二通りで表現できます。<book id=\"1\"/>(属性)か <book><id>1</id></book>(子要素)か。意味の差は構文の差より大きい。属性は順序がなく、要素ごとに一意で、繰り返しやネストができません。子要素は繰り返せ、独自の属性を持て、順序を保てます。慣例ではメタデータ——識別子、言語、タイムスタンプ——を属性に、本来のペイロードを要素に置きます。",
            "JSON にはこうした二重性がないため、変換器には規約が必要です。本ツールは広く使われる @ プレフィックス規約に従います。@id というメンバーは属性に、#text というメンバーは要素自身のテキスト内容になります。サイト内の XML → JSON ツールが解析時に出すのも同じ規約なので、文書は JSON → XML → JSON と一周しても識別可能な形で戻ります。",
            "これは見た目の問題ではありません。一部の XML 消費者(SOAP スタックや XSD 検証器)はデータをどちらか片方に置くことを要求します。属性中心の文書はやや小さいものの、後からの拡張が難しく、属性に構造を加えたくなったら要素へ変換して消費者全員に影響します。旧形式に合わせるのではなく新形式を設計するなら、成長しうるものは要素に置くべきです。",
          ],
        },
        {
          heading: "エスケープと名前の変換——出力が常に整形式である理由",
          paragraphs: [
            "XML は文字について JSON より厳格です。特殊なのは 5 文字——& < > \" '——で、最初の二つを生のまま出力すると文書が壊れます。ここではすべてのテキストと属性値を標準エンティティでエスケープするので、<script> を含む JSON 文字列は出力では無害な &lt;script&gt; になります。逆方向の落とし穴もあります。&#xHHHH; のような数値文字参照は合法な XML ですが、任意の JSON の往復では生成できません。",
            "要素名はさらに厳しく、字母かアンダースコアで始まり、空白や多くの記号を含められません。対して JSON のキーは任意の文字列です。本ツールはこれらを変換します——不正な文字はアンダースコアへ、数字始まりには前置アンダースコア——文書は常に解析可能です。CJK 文字やアクセント付きラテン文字は合法な XML 名なので、そのまま生き残ります。",
            "この変換のせいで対応関係は一対一ではなくなります。異なる二つの JSON キーが同じ XML 名に洗われることがあり、一度そうなると戻し変換では元に戻せません。キーに空白やスラッシュがあったり数字で始まるなら、XML 側は有损な投影と考え、JSON を唯一の真実の源にしてください。",
          ],
        },
        {
          heading: "機密ペイロードの変換はローカルで",
          paragraphs: [
            "XML に向かう JSON ペイロードはしばしば業務データです。請求書、ユーザーレコード、顧客識別子を含む API リクエスト。サーバー型の変換器に送れば、保持ポリシーの分からない第三者にそのデータを渡すことになります。本変換器は完全にブラウザ内で動きます。入力しながらその場で変換し、リクエストは一つも飛ばず、ページを読み込めばオフラインでも使えます。",
            "双方向のワークフローは移行作業で重要です。本ツールで JSON を XML に変換し、その XML を XML → JSON ツールに貼って比較する——結果が入力と構造的に一致すれば、@ 属性や #text の規約が消費者と互換だと分かります。不整合をローカルで見つける方が、SOAP エンドポイントに最初のリクエストを拒否されてから見つけるよりずっといいです。",
            "消費者が別のインデントを求めるならサイト内の XML フォーマッターにつなげてください。そして明記済みの限界も忘れずに:null と空配列は空要素に潰れるため、xsi:nil を期待するスキーマには後処理がもう一歩必要です。",
          ],
        },
      ],
    },
    es: {
      name: "JSON a XML",
      tagline:
        "Convierte JSON a XML bien formado con atributos, elementos repetidos y escape correcto — hace ida y vuelta con nuestra herramienta XML a JSON. Todo local.",
      intro: [
        'Pega JSON y obtén un documento XML formateado con declaración y sangría de 2 espacios. Los objetos se vuelven elementos, los arrays repiten su clave por cada elemento, y los miembros "@key" se convierten en atributos XML — el inverso exacto de nuestra herramienta XML a JSON.',
        "Todo se escapa según el estándar (& < > \" ') y las claves arbitrarias se convierten en nombres de elemento legales, así la salida siempre es XML bien formado. Los valores que XML no puede expresar — null, arrays vacíos — se vuelven elementos vacíos, y los límites están detallados abajo.",
      ],
      steps: ["Pega tu JSON en el cuadro de entrada.", "El XML aparece en vivo — pon un nombre de raíz personalizado si lo necesitas.", "Copia el resultado o descárgalo como archivo .xml."],
      faqs: [
        {
          q: "¿Cómo se mapean los atributos y los arrays a XML?",
          a: 'Una clave que empieza por @ (o @_) se vuelve un atributo del elemento padre, y "#text" pasa a ser el texto del elemento — igual que lo que emite nuestra herramienta XML a JSON. Los arrays repiten el mismo elemento por cada ítem; un array en la raíz se envuelve como <root><item>…</item></root> porque un documento necesita una única raíz.',
        },
        {
          q: "¿Qué límites tiene el mapeo JSON ⇄ XML?",
          a: "XML no tiene notación para null ni para arrays vacíos: ambos se colapsan en elementos vacíos. El contenido mixto (texto entremezclado con elementos hijos) no puede ir y volver: el texto se guarda como un solo bloque. Y al analizar de vuelta, un elemento repetido solitario se convierte en un valor simple, no en un array de un ítem.",
        },
        {
          q: "¿Qué pasa con las claves que no son nombres XML válidos?",
          a: 'Se convierten: los caracteres ilegales pasan a guiones bajos y una clave que empieza por dígito recibe un guion bajo inicial ("2fa" → <_2fa>). Las letras CJK y acentuadas ya son nombres XML legales y se conservan tal cual.',
        },
      ],
      deepDive: [
        {
          heading: "Atributos o elementos — la decisión de diseño inevitable",
          paragraphs: [
            "XML permite expresar los mismos datos de dos maneras: <book id=\"1\"/> (atributo) o <book><id>1</id></book> (elemento hijo). La diferencia semántica es mayor que la sintáctica. Los atributos no tienen orden, son únicos por elemento y no pueden repetirse ni anidar; los elementos hijos pueden repetirse, llevar sus propios atributos y conservar el orden. Por convención, los metadatos — identificadores, idiomas, marcas de tiempo — van en atributos y la carga útil en elementos.",
            "JSON no tiene esa dualidad, y por eso los convertidores necesitan una convención. Esta herramienta sigue la convención del prefijo @, muy extendida: un miembro llamado @id se vuelve atributo, y uno llamado #text se vuelve el contenido de texto del propio elemento. Es la misma convención que emite nuestra herramienta XML a JSON al analizar, así que un documento puede ir JSON → XML → JSON y volver reconocible.",
            "La elección no es solo estética. Algunos consumidores XML (ciertas pilas SOAP, validadores XSD) exigen que los datos vivan en uno u otro lado; los documentos cargados de atributos son algo más compactos pero más difíciles de extender después, porque dar estructura a un atributo implica convertirlo en elemento y tocar cada consumidor. Si diseñas un formato nuevo en vez de ajustarte a uno viejo, pon en elementos todo lo que pueda crecer.",
          ],
        },
        {
          heading: "Escape y coerción de nombres: por qué la salida siempre está bien formada",
          paragraphs: [
            "XML es más estricto que JSON con los caracteres. Cinco son especiales — & < > \" ' — y los dos primeros corromperían el documento si se emitieran en crudo. Aquí todo texto y valor de atributo se escapa con las entidades estándar, así que una cadena JSON que contenga <script> se vuelve un inocuo &lt;script&gt; en la salida. También existe la trampa inversa: secuencias como &#xHHHH; (referencias numéricas de carácter) son XML válido pero no pueden producirse desde round-trips de JSON arbitrario.",
            "Los nombres de elemento son aún más estrictos: deben empezar por letra o guion bajo y no pueden contener espacios ni muchos signos de puntuación. Las claves JSON, en cambio, son cadenas arbitrarias. La herramienta las convierte — los caracteres ilegales se vuelven guiones bajos y un dígito inicial recibe un guion bajo de prefijo — de modo que el documento siempre se puede analizar. Los caracteres CJK y las letras latinas acentuadas son nombres XML legales y sobreviven intactos.",
            "Estas conversiones implican que el mapeo no es inyectivo: dos claves JSON distintas pueden lavarse al mismo nombre XML, y una vez eso ocurre, convertir de vuelta no puede restaurar el original. Si tus claves contienen espacios, barras o empiezan por dígito, trata el lado XML como una proyección con pérdida y mantén el JSON como única fuente de verdad.",
          ],
        },
        {
          heading: "Conversión local para cargas sensibles",
          paragraphs: [
            "Los payloads JSON destinados a XML suelen ser datos de negocio: facturas, registros de usuarios, peticiones de API con identificadores de clientes. Enviarlos a un convertidor basado en servidor entrega esos datos a un tercero cuya política de retención desconoces. Este convertidor corre íntegramente en tu navegador — la conversión ocurre mientras escribes, no sale ninguna petición y la página funciona sin conexión una vez cargada.",
            "El flujo bidireccional importa en las migraciones: convierte tu JSON a XML con esta herramienta, pega el XML en la herramienta XML a JSON y compara — si el resultado coincide estructuralmente con tu entrada, las convenciones (@ atributos, #text) son compatibles con tus consumidores. Detectar la discrepancia en local es mejor que detectarla cuando el endpoint SOAP rechaza tu primera petición.",
            "Encadénala con el formateador XML cuando el consumidor quiera otra indentación — y recuerda los límites documentados: null y los arrays vacíos colapsan en elementos vacíos, así que un esquema que espere xsi:nil necesitará un paso de postprocesado.",
          ],
        },
      ],
    },
    pt: {
      name: "JSON para XML",
      tagline:
        "Converta JSON em XML bem formado com atributos, elementos repetidos e escape correto — faz ida e volta com nossa ferramenta XML para JSON. Tudo local.",
      intro: [
        'Cole JSON e receba um documento XML formatado, com declaração e indentação de 2 espaços. Objetos viram elementos, arrays repetem a chave para cada item, e membros "@key" viram atributos XML — o inverso exato da nossa ferramenta XML para JSON.',
        "Tudo é escapado conforme o padrão (& < > \" ') e chaves arbitrárias são convertidas em nomes de elemento legais, então a saída é sempre XML bem formado. Valores que o XML não consegue expressar — null, arrays vazios — viram elementos vazios, e os limites estão explicados abaixo.",
      ],
      steps: ["Cole seu JSON na caixa de entrada.", "O XML aparece ao vivo — defina um nome de elemento raiz personalizado se precisar.", "Copie o resultado ou baixe como arquivo .xml."],
      faqs: [
        {
          q: "Como atributos e arrays são mapeados para XML?",
          a: 'Uma chave começando com @ (ou @_) vira um atributo do elemento pai, e "#text" se torna o texto do elemento — igual ao que nossa ferramenta XML para JSON produz. Arrays repetem o mesmo elemento para cada item; um array na raiz é embrulhado como <root><item>…</item></root> porque um documento precisa de uma única raiz.',
        },
        {
          q: "Quais são os limites do mapeamento JSON ⇄ XML?",
          a: "XML não tem notação para null nem para arrays vazios — ambos colapsam em elementos vazios. Conteúdo misto (texto intercalado com elementos filhos) não faz ida e volta: o texto é mantido como um bloco. E ao analisar de volta, um elemento repetido solitário vira um valor simples, não um array de um item.",
        },
        {
          q: "O que acontece com chaves que não são nomes XML válidos?",
          a: 'Elas são convertidas: caracteres ilegais viram sublinhados e uma chave começando com dígito ganha um sublinhado no início ("2fa" → <_2fa>). Letras CJK e acentuadas já são nomes XML legais e permanecem como estão.',
        },
      ],
      deepDive: [
        {
          heading: "Atributo ou elemento — a decisão de design inevitável",
          paragraphs: [
            "O XML permite expressar os mesmos dados de duas formas: <book id=\"1\"/> (atributo) ou <book><id>1</id></book> (elemento filho). A diferença semântica é maior que a sintática. Atributos não têm ordem, são únicos por elemento e não podem se repetir nem aninhar; elementos filhos podem repetir, carregar seus próprios atributos e conservar a ordem. Por convenção, metadados — identificadores, idiomas, timestamps — vão em atributos e a carga útil em elementos.",
            "O JSON não tem essa dualidade, e por isso conversores precisam de uma convenção. Esta ferramenta segue a convenção do prefixo @, muito usada: um membro chamado @id vira atributo, e um chamado #text vira o conteúdo de texto do próprio elemento. É a mesma convenção que nossa ferramenta XML para JSON emite ao analisar, então um documento pode ir JSON → XML → JSON e voltar reconhecível.",
            "A escolha não é só estética. Alguns consumidores XML (certas pilhas SOAP, validadores XSD) exigem que os dados vivam de um lado ou do outro; documentos cheios de atributos são um pouco mais compactos mas mais difíceis de estender depois, porque dar estrutura a um atributo significa convertê-lo em elemento e tocar todos os consumidores. Se você está desenhando um formato novo em vez de seguir um velho, coloque em elementos tudo o que possa crescer.",
          ],
        },
        {
          heading: "Escape e conversão de nomes: por que a saída é sempre bem formada",
          paragraphs: [
            "O XML é mais estrito que o JSON com caracteres. Cinco são especiais — & < > \" ' — e os dois primeiro corromperiam o documento se emitidos crus. Aqui todo texto e valor de atributo é escapado com as entidades padrão, então uma string JSON contendo <script> vira um inofensivo &lt;script&gt; na saída. A armadilha inversa também existe: sequências como &#xHHHH; (referências numéricas de caractere) são XML válido mas não podem ser produzidas por round-trips de JSON arbitrário.",
            "Nomes de elemento são ainda mais estritos: devem começar com letra ou sublinhado e não podem conter espaços nem muita pontuação. As chaves JSON, em contraste, são strings arbitrárias. A ferramenta as converte — caracteres ilegais viram sublinhados e um dígito inicial recebe um sublinhado de prefixo — então o documento sempre pode ser analisado. Caracteres CJK e letras latinas acentuadas são nomes XML legais e sobrevivem intactos.",
            "Essas conversões significam que o mapeamento não é injetivo: duas chaves JSON diferentes podem ser lavadas para o mesmo nome XML, e uma vez que isso acontece, converter de volta não pode restaurar o original. Se suas chaves têm espaços, barras ou começam com dígito, trate o lado XML como uma projeção com perda e mantenha o JSON como única fonte da verdade.",
          ],
        },
        {
          heading: "Conversão local para cargas sensíveis",
          paragraphs: [
            "Payloads JSON destinados ao XML costumam ser dados de negócio: notas fiscais, registros de usuários, requisições de API com identificadores de clientes. Enviá-los a um conversor baseado em servidor entrega esses dados a um terceiro cuja política de retenção você não conhece. Este conversor roda inteiramente no seu navegador — a conversão acontece enquanto você digita, nenhuma requisição sai, e a página funciona offline depois de carregada.",
            "O fluxo bidirecional importa em migrações: converta seu JSON para XML com esta ferramenta, cole o XML na ferramenta XML para JSON e compare — se o resultado coincide estruturalmente com a entrada, as convenções (@ atributos, #text) são compatíveis com seus consumidores. Descobrir a discrepância em local é melhor que descobri-la quando o endpoint SOAP rejeita sua primeira requisição.",
            "Encadeie com o formatador XML quando o consumidor quiser outra indentação — e lembre dos limites documentados: null e arrays vazios colapsam em elementos vazios, então um schema que espere xsi:nil precisará de um passo de pós-processamento.",
          ],
        },
      ],
    },
  },
});
