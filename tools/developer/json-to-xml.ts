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
  related: ["xml-to-json", "xml-formatter", "json-formatter", "json-validator"],
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
    },
  },
});
