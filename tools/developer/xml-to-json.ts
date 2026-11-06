import { DevXmlToJsonEngine } from "../_engines/dev-engine-xml-to-json";
import { defineTool } from "../_lib/types";

const SAMPLE =
  '<library><book id="1" lang="en"><title>Clean Code</title><author>Robert C. Martin</author><tags><tag>programming</tag><tag>craft</tag></tags><inStock>true</inStock></book></library>';

export default defineTool({
  slug: "xml-to-json",
  category: "developer",
  icon: "code",
  engine: { component: DevXmlToJsonEngine, props: { sample: SAMPLE } },
  related: ["json-to-xml", "xml-formatter", "xml-validator", "json-formatter", "md5-generator", "sha256-generator", "base64-image", "json-validator", "url-encoder", "html-minifier"],
  copy: {
    en: {
      name: "XML to JSON",
      tagline:
        "Convert XML to JSON in your browser — attributes become @-keys, repeated elements become arrays, and malformed input gets a friendly line-level error.",
      intro: [
        "Paste sitemap entries, RSS items, SOAP responses or config files and get pretty-printed JSON back instantly. The conversion uses fast-xml-parser with attributes preserved: every attribute is kept as an @-prefixed key, repeated sibling elements collapse into arrays, and text content sits under #text when an element has attributes as well.",
        "Malformed input never produces half-converted guesses: the document is validated first, and errors point at the offending line, so a missing closing tag is a one-line fix.",
      ],
      steps: [
        "Paste your XML into the left pane.",
        "The pretty-printed JSON appears on the right as you type.",
        "Copy the JSON when it looks right.",
      ],
      faqs: [
        {
          q: 'How are attributes represented in the JSON?',
          a: 'Each attribute becomes a key prefixed with @ — <book id="7"> comes back as { "@id": "7" }. Attribute values stay strings, while text content that looks like a number or boolean is converted to its JSON type.',
        },
        {
          q: "What happens to repeated elements?",
          a: "Sibling elements with the same name become a JSON array. Note that a single element stays a plain value, so check for array-ness if your consumer expects lists.",
        },
        {
          q: "Is my XML uploaded anywhere?",
          a: "No. Parsing happens locally in your browser with fast-xml-parser — nothing leaves your device.",
        },
      ],
      deepDive: [
        {
          heading: "How XML features map onto JSON keys",
          paragraphs: [
            "Converting XML to JSON means flattening a richer format into a simpler one, and every choice is a convention. The most consequential one is attributes: <book id=\"7\" lang=\"en\"> keeps id and lang beside the element, and losing that distinction would silently change your data. This converter preserves it by prefixing every attribute with @ — {\"@id\":\"7\",\"@lang\":\"en\"} — a convention shared with our JSON to XML tool, so data can travel in both directions and come back the same.",
            "Repetition is the second convention. XML allows any number of sibling elements with the same name — a feed with one <item> or fifty parses identically — while JSON needs a decision: is <item> a value or an array? The rule here is that repeated siblings become a JSON array and a single element stays a plain value. That is the natural reading, but it has a sharp edge: a feed that usually has many items but happens to have one converts to a scalar, and a consumer expecting a list breaks. Always check for array-ness downstream.",
            "When an element has both attributes and text, the text cannot stay bare — it moves under \"#text\", so <price currency=\"usd\">19.99</price> becomes {\"@currency\":\"usd\",\"#text\":19.99}. Elements that are purely text keep their value directly, which keeps the output readable instead of wrapping every leaf in a #text object.",
          ],
        },
        {
          heading: "Type coercion and the limits of the mapping",
          paragraphs: [
            "XML has no types — every value is text until you decide otherwise. The converter applies light coercion: text that looks like a number becomes a JSON number, true/false becomes booleans, and everything else stays a string. Attribute values stay strings deliberately, because attributes almost always carry identifiers, codes and dates where \"07\" and 7 are different things. If your consumer needs a number there, convert it explicitly rather than trusting the guess.",
            "Some XML constructs simply have no JSON home. Namespaces survive as prefixes on tag names but their URI bindings are lost, so two documents using different prefixes for the same namespace will not round-trip identically. Comments, processing instructions and the DOCTYPE are dropped — none of them carry data. CDATA is merged with ordinary text, which matters only if your consumer relies on the distinction, which well-behaved ones should not.",
            "These limits are inherent to the format gap, not to this tool: any XML-to-JSON converter must make the same kinds of decisions, and most make worse ones. The reliable workflow is to test the round trip on a representative sample of your real documents — convert to JSON, back to XML, and compare — before committing a pipeline to the mapping.",
          ],
        },
        {
          heading: "Validate first, convert locally",
          paragraphs: [
            "Malformed XML is the most common failure, and it deserves a better error than a stack trace. The converter validates the document before touching it and reports problems with a pointer at the offending line, so a missing closing tag is a one-line fix instead of an afternoon. When input comes from a hand-edited source, run it through the XML validator first — its report is stricter and catches duplicate attributes and illegal entities that conversion might gloss over.",
            "The conversion runs entirely in your browser with fast-xml-parser, a parsing library trusted by many build tools. Your XML is never uploaded: feeds with subscriber data, SOAP responses containing session tokens, internal configuration exports — all of it stays on your device. For exactly these payloads, browser-local conversion is not a convenience but the point.",
            "Being local also makes the tool a good fit for iterative work: paste a sample, inspect the shape, adjust your consumer's expectations, paste again. There is no upload round-trip in the loop, so each iteration takes seconds, and the whole thing works offline — useful when you are debugging a feed on a machine that cannot reach the network.",
          ],
        },
      ],
    },
    zh: {
      name: "XML 转 JSON",
      tagline: "浏览器本地把 XML 转成 JSON——属性变成 @ 键,重复元素合并为数组,格式错误会定位到行,绝不瞎猜。",
      intro: [
        "粘贴站点地图、RSS 条目、SOAP 响应或配置文件,立即得到美化缩进的 JSON。转换使用 fast-xml-parser 并保留属性:每个属性都以 @ 前缀的键保留,同名的重复兄弟元素收拢为数组;元素同时有属性和文本时,文本放在 #text 键下。",
        "格式错误不会产出半吊子的转换结果:文档会先做校验,错误定位到所在行——少个闭合标签,一行就能修好。",
      ],
      steps: ["把 XML 粘贴到左侧输入框。", "右侧随输入实时显示美化后的 JSON。", "满意后复制 JSON。"],
      faqs: [
        {
          q: "属性在 JSON 里怎么表示?",
          a: '每个属性变成带 @ 前缀的键——<book id="7"> 会得到 { "@id": "7" }。属性值保持字符串,而看起来像数字或布尔的文本内容会转换成对应的 JSON 类型。',
        },
        {
          q: "重复元素怎么处理?",
          a: "同名兄弟元素会变成 JSON 数组。注意单个元素仍是普通值,如果下游要求一定是列表,使用前请自行判断。",
        },
        {
          q: "XML 会被上传吗?",
          a: "不会。解析由浏览器内的 fast-xml-parser 本地完成,数据不离开设备。",
        },
      ],
      deepDive: [
        {
          heading: "XML 的特性如何映射为 JSON 的键",
          paragraphs: [
            "把 XML 转成 JSON,是把更丰富的格式压平到更简单的格式里,每一步都是一种约定。最关键的是属性:<book id=\"7\" lang=\"en\"> 把 id 和 lang 放在元素旁边,丢掉这个区分就是静默改数据。本转换器用 @ 前缀保留所有属性——{\"@id\":\"7\",\"@lang\":\"en\"}——与站内 JSON 转 XML 工具共用同一约定,数据可以双向通行、来去一致。",
            "第二个约定是重复。XML 允许任意多个同名兄弟元素——一条 <item> 的订阅源和五十条 <item> 的解析结果一样——JSON 却必须做出决断:<item> 是值还是数组?这里的规则是重复的兄弟元素变成 JSON 数组,单个元素保持普通值。这是最自然的读法,但有个尖锐的边角:平时有很多条目、这次恰好只有一条的订阅源,会转换成标量,期待列表的下游消费方就崩了。下游务必检查是否为数组。",
            "当元素既有属性又有文本时,文本不能再裸放——它挪到 \"#text\" 之下,<price currency=\"usd\">19.99</price> 变成 {\"@currency\":\"usd\",\"#text\":19.99}。纯文本元素直接保留值,输出因此保持可读,而不是每片叶子都包一层 #text 对象。",
          ],
        },
        {
          heading: "类型转换与映射的极限",
          paragraphs: [
            "XML 没有类型——每个值都是文本,除非你另有决定。转换器做轻度类型转换:看着像数字的文本变成 JSON 数字,true/false 变成布尔值,其余保持字符串。属性值刻意保持字符串,因为属性几乎总承载标识符、编码和日期,而 \"07\" 和 7 是两回事。下游需要数字就在消费端显式转换,别赌猜测。",
            "有些 XML 结构在 JSON 里根本没有家。命名空间能以标签名上的前缀形式存留,但 URI 绑定丢了——两个用不同前缀指同一命名空间的文档不会原样往返。注释、处理指令和 DOCTYPE 被丢弃——它们不承载数据。CDATA 与普通文本合并,只有当你的消费方依赖这个区分时才有影响,而规范的消费方不该依赖。",
            "这些限制来自格式落差本身,不是这个工具的问题:任何 XML 转 JSON 的转换器都要做同样的决策,多数做得更差。可靠的工作流是先拿真实文档中有代表性的一份样本测试往返——转成 JSON 再转回 XML 比对——确认无误后再把管线压在这个映射上。",
          ],
        },
        {
          heading: "先校验,再本地转换",
          paragraphs: [
            "坏 XML 是最常见的失败,它值得比堆栈跟踪更好的报错。转换器在动手前先校验文档,报错时指向出问题的行,缺个闭合标签只需改一行,而不是一下午。输入来自手写文件时,先过一遍 XML 校验器——它的报告更严格,能抓到重复属性和非法实体这些转换时可能轻轻放过的问题。",
            "转换完全在你的浏览器里完成,用的是许多构建工具信任的 fast-xml-parser。你的 XML 永远不上传:带订阅者数据的订阅源、含会话令牌的 SOAP 响应、内部配置导出——全都留在你的设备上。对这类载荷来说,浏览器本地转换不是便利,而是目的本身。",
            "本地运行也让这个工具适合迭代式工作:贴一份样本,看看形状,调整消费方的预期,再贴一次。循环里没有上传往返,每次迭代只要几秒,而且全程离线可用——在网络不通的机器上调试订阅源时尤其有用。",
          ],
        },
      ],
    },
    ja: {
      name: "XML → JSON 変換",
      tagline:
        "XML をブラウザ内で JSON へ変換 — 属性は @ キー、繰り返し要素は配列に。不正な入力は行単位のわかりやすいエラーで通知します。",
      intro: [
        "サイトマップ、RSS、SOAP レスポンス、設定ファイルを貼り付けると、整形された JSON が即座に得られます。変換は属性を保持する fast-xml-parser を使用:各属性は @ 接頭辞のキーとして残り、同名の繰り返し要素は配列にまとめられます。属性とテキストの両方を持つ要素のテキストは #text キーに入ります。",
        "不正な入力でも中途半端な変換結果を出しません:まず文書を検証し、エラーは該当行を指し示すので、閉じタグの忘れも 1 行で直せます。",
      ],
      steps: ["XML を左ペインに貼り付けます。", "右側に整形済み JSON がリアルタイムに表示されます。", "良さそうなら JSON をコピーします。"],
      faqs: [
        {
          q: "属性は JSON でどう表されますか?",
          a: '各属性は @ 接頭辞のキーになります — <book id="7"> は { "@id": "7" } のようになります。属性値は文字列のまま、数値や真偽値に見えるテキスト内容は対応する JSON 型に変換されます。',
        },
        {
          q: "繰り返し要素はどうなりますか?",
          a: "同名の兄弟要素は JSON 配列になります。ただし単一の要素は普通の値のままなので、受け手がリストを期待する場合は配列かどうかの確認が必要です。",
        },
        {
          q: "XML はどこかにアップロードされますか?",
          a: "いいえ。解析はブラウザ内の fast-xml-parser でローカルに行われ、データは端末の外に出ません。",
        },
      ],
      deepDive: [
        {
          heading: "XML の機能は JSON のキーにどう写るか",
          paragraphs: [
            "XML を JSON に変換することは、より豊かな形式をより単純な形式へ平らにすることであり、一つひとつの決定が規約になります。最も影響が大きいのは属性です。<book id=\"7\" lang=\"en\"> は id と lang を要素のそばに置き、この区別を失うことはデータを黙って書き換えることになります。この変換器はすべての属性に @ を付けて保存します — {\"@id\":\"7\",\"@lang\":\"en\"} — サイト内の JSON → XML ツールと同じ規約で、データは双方向に行き来して同じ形で戻れます。",
            "二つ目の規約は繰り返しです。XML は同じ名前の兄弟要素をいくらでも許します — <item> が 1 個のフィードも 50 個のフィードも同じように解析されます — 一方 JSON は決定を要ります。<item> は値か配列か。ここでの規則は、繰り返される兄弟要素は JSON 配列になり、単独の要素は普通の値のまま、というものです。自然な読み方ですが鋭い角もあります。普段は項目が多く今回たまたま 1 個のフィードはスカラーに変換され、リストを期待する消費側が壊れます。下流では必ず配列かどうかを確認してください。",
            "要素が属性とテキストの両方を持つとき、テキストは素のままではいられません — \"#text\" の下に移り、<price currency=\"usd\">19.99</price> は {\"@currency\":\"usd\",\"#text\":19.99} になります。純粋にテキストの要素は値を直接保つため、出力は読みやすく、すべての葉が #text オブジェクトに包まれることはありません。",
          ],
        },
        {
          heading: "型変換とマッピングの限界",
          paragraphs: [
            "XML に型はありません — すべての値はあなたが別に決めない限りテキストです。この変換器は軽い型変換を行います。数値に見えるテキストは JSON の数値に、true/false は真偽値に、それ以外は文字列のまま。属性値は意図的に文字列のままです。属性はほぼ常に識別子やコードや日付を運び、\"07\" と 7 は別物だからです。消費側が数値を必要とするなら、推測を信じずに明示的に変換してください。",
            "JSON に居場所のない XML 構造もあります。名前空間はタグ名の接頭辞として残りますが、URI の束縛は失われ、同じ名前空間に別の接頭辞を使う 2 つの文書は同一に往復しません。コメント、処理命令、DOCTYPE は破棄されます — どれもデータを運ばないからです。CDATA は通常のテキストに統合されます。これが問題になるのは、その区別に依存する消費側だけです。健全な消費側は依存すべきではありません。",
            "これらの限界はこのツールではなく形式の溝に由来します。どんな XML → JSON 変換器も同じ種類の決定をしなければならず、多くはより悪い決定をします。信頼できるワークフローは、実文書の代表的なサンプルで往復を試すことです — JSON に変換し、XML に戻し、比較する — それからパイプラインをこのマッピングに委ねます。",
          ],
        },
        {
          heading: "まず検証、それからローカル変換",
          paragraphs: [
            "壊れた XML は最もよくある失敗で、スタックトレースより良いエラーに値します。この変換器は手を付ける前に文書を検証し、問題の行を指し示して報告するので、閉じタグの欠落は 1 行の修正で済みます。入力が手書きのソースなら、先に XML バリデーターに通しましょう。より厳格で、変換が見過ごしがちな重複属性や不正な実体を捉えてくれます。",
            "変換はブラウザ内で完全に実行され、多くのビルドツールが信頼する fast-xml-parser を使います。XML は決してアップロードされません。購読者データを含むフィード、セッショントークン入りの SOAP 応答、内部設定のエクスポート — すべて端末に留まります。こうしたペイロードには、ブラウザローカル変換は便利さではなく目的そのものです。",
            "ローカル実行は反復作業にも向いています。サンプルを貼り、形を確認し、消費側の期待を調整し、もう一度貼る。ループにアップロード往復がなく、各反復は数秒で、全体がオフラインで動きます — ネットワークに届かない端末でフィードをデバッグするときに役立ちます。",
          ],
        },
      ],
    },
    es: {
      name: "XML a JSON",
      tagline:
        "Convierte XML a JSON en tu navegador: los atributos se vuelven claves @, los elementos repetidos se agrupan en arrays y el XML roto da un error claro por línea.",
      intro: [
        "Pega entradas de sitemap, RSS, respuestas SOAP o archivos de configuración y recibe JSON formateado al instante. La conversión usa fast-xml-parser conservando los atributos: cada atributo queda como una clave con prefijo @, los hermanos repetidos se agrupan en arrays y el texto convive con ellos bajo #text cuando el elemento tiene ambos.",
        "Una entrada malformada nunca produce resultados a medias: el documento se valida primero y los errores apuntan a la línea exacta, así un cierre de etiqueta olvidado se arregla en un momento.",
      ],
      steps: ["Pega tu XML en el panel izquierdo.", "El JSON formateado aparece a la derecha mientras escribes.", "Copia el JSON cuando esté como quieres."],
      faqs: [
        {
          q: "¿Cómo se representan los atributos en el JSON?",
          a: 'Cada atributo se convierte en una clave con prefijo @ — <book id="7"> vuelve como { "@id": "7" }. Los valores de atributo permanecen como cadenas, mientras que el texto que parece número o booleano se convierte a su tipo JSON.',
        },
        {
          q: "¿Qué pasa con los elementos repetidos?",
          a: "Los hermanos con el mismo nombre se convierten en un array JSON. Un elemento único queda como valor simple: si tu consumidor espera listas, comprueba si es array antes de usarlo.",
        },
        {
          q: "¿Mi XML se sube a algún sitio?",
          a: "No. El análisis ocurre localmente en tu navegador con fast-xml-parser — nada sale de tu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Cómo se corresponden las funciones de XML con las claves de JSON",
          paragraphs: [
            "Convertir XML a JSON significa aplanar un formato más rico en uno más simple, y cada elección es una convención. La más consecuente son los atributos: <book id=\"7\" lang=\"en\"> mantiene id y lang junto al elemento, y perder esa distinción cambiaría tus datos en silencio. Este conversor la conserva prefijando cada atributo con @ — {\"@id\":\"7\",\"@lang\":\"en\"} — una convención compartida con nuestra herramienta JSON a XML, así los datos viajan en ambas direcciones y vuelven iguales.",
            "La repetición es la segunda convención. XML permite cualquier número de elementos hermanos con el mismo nombre — un feed con un <item> o con cincuenta se analiza igual — mientras que JSON exige decidir: ¿es <item> un valor o un array? La regla aquí es que los hermanos repetidos se vuelven un array JSON y un elemento único queda como valor simple. Es la lectura natural, pero tiene una arista afilada: un feed que suele traer muchos ítems y trae uno se convierte en un escalar, y el consumidor que espera una lista se rompe. Comprueba siempre la condición de array aguas abajo.",
            "Cuando un elemento tiene atributos y texto a la vez, el texto no puede quedar desnudo — pasa a \"#text\", así <price currency=\"usd\">19.99</price> se convierte en {\"@currency\":\"usd\",\"#text\":19.99}. Los elementos de texto puro conservan su valor directamente, lo que mantiene la salida legible en vez de envolver cada hoja en un objeto #text.",
          ],
        },
        {
          heading: "Conversión de tipos y límites del mapeo",
          paragraphs: [
            "XML no tiene tipos: cada valor es texto hasta que tú decidas otra cosa. El conversor aplica una conversión ligera: el texto que parece número se vuelve número JSON, true/false se vuelve booleano, y todo lo demás queda como cadena. Los valores de atributo siguen siendo cadenas a propósito, porque los atributos casi siempre llevan identificadores, códigos y fechas donde \"07\" y 7 son cosas distintas. Si tu consumidor necesita un número ahí, conviértelo explícitamente en vez de confiar en la adivinanza.",
            "Algunas construcciones XML simplemente no tienen casa en JSON. Los espacios de nombres sobreviven como prefijos en los nombres de etiqueta, pero sus vínculos URI se pierden, así que dos documentos con prefijos distintos para el mismo espacio de nombres no harán la ida y vuelta igual. Los comentarios, las instrucciones de proceso y el DOCTYPE se descartan — ninguno lleva datos. CDATA se fusiona con el texto normal, algo que importa solo si tu consumidor depende de esa distinción, cosa que no debería.",
            "Estos límites son inherentes a la brecha entre formatos, no a esta herramienta: cualquier conversor XML a JSON debe tomar el mismo tipo de decisiones, y la mayoría toma peores. El flujo fiable es probar el viaje de ida y vuelta sobre una muestra representativa de tus documentos reales — convertir a JSON, volver a XML y comparar — antes de comprometer una canalización al mapeo.",
          ],
        },
        {
          heading: "Valida primero, convierte en local",
          paragraphs: [
            "El XML mal formado es el fallo más común y merece un error mejor que un stack trace. El conversor valida el documento antes de tocarlo y reporta los problemas señalando la línea ofensora, así que una etiqueta de cierre faltante es un arreglo de una línea, no una tarde. Cuando la entrada venga de un archivo editado a mano, pásala antes por el validador XML: su informe es más estricto y atrapa atributos duplicados y entidades ilegales que la conversión podría dejar pasar.",
            "La conversión corre por completo en tu navegador con fast-xml-parser, una biblioteca de análisis de la que confían muchas herramientas de build. Tu XML jamás se sube: feeds con datos de suscriptores, respuestas SOAP con tokens de sesión, exportaciones de configuración interna — todo queda en tu dispositivo. Para esos payloads, la conversión local en el navegador no es una comodidad sino el objetivo.",
            "Ser local también la hace buena para trabajo iterativo: pega una muestra, inspecciona la forma, ajusta lo que espera tu consumidor, pega otra vez. No hay viaje de subida en el bucle, cada iteración tarda segundos y todo funciona sin conexión — útil cuando depuras un feed en una máquina sin red.",
          ],
        },
      ],
    },
    pt: {
      name: "XML para JSON",
      tagline:
        "Converta XML em JSON no navegador: atributos viram chaves @, elementos repetidos viram arrays e XML quebrado gera um erro claro apontando a linha.",
      intro: [
        "Cole entradas de sitemap, RSS, respostas SOAP ou arquivos de configuração e receba JSON formatado na hora. A conversão usa fast-xml-parser preservando os atributos: cada atributo fica como uma chave com prefixo @, irmãos repetidos se agrupam em arrays e o texto convive com eles sob #text quando o elemento tem ambos.",
        "Entrada malformada nunca gera resultado pela metade: o documento é validado primeiro e os erros apontam a linha exata — uma tag de fechamento esquecida se conserta em segundos.",
      ],
      steps: ["Cole seu XML no painel esquerdo.", "O JSON formatado aparece à direita enquanto você digita.", "Copie o JSON quando ficar do jeito que quer."],
      faqs: [
        {
          q: "Como os atributos aparecem no JSON?",
          a: 'Cada atributo vira uma chave com prefixo @ — <book id="7"> retorna como { "@id": "7" }. Valores de atributo permanecem strings, enquanto texto que parece número ou booleano é convertido para o tipo JSON correspondente.',
        },
        {
          q: "O que acontece com elementos repetidos?",
          a: "Irmãos com o mesmo nome viram um array JSON. Um elemento único continua sendo um valor simples, então, se quem consome espera listas, verifique se é array antes de usar.",
        },
        {
          q: "Meu XML é enviado para algum lugar?",
          a: "Não. O parsing acontece localmente no seu navegador com fast-xml-parser — nada sai do seu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Como as características do XML correspondem às chaves do JSON",
          paragraphs: [
            "Converter XML para JSON significa achatar um formato mais rico num mais simples, e cada escolha é uma convenção. A mais consequente são os atributos: <book id=\"7\" lang=\"en\"> mantém id e lang junto ao elemento, e perder essa distinção mudaria seus dados em silêncio. Este conversor a preserva prefixando cada atributo com @ — {\"@id\":\"7\",\"@lang\":\"en\"} — uma convenção compartilhada com nossa ferramenta JSON para XML, então os dados viajam nos dois sentidos e voltam iguais.",
            "A repetição é a segunda convenção. O XML permite qualquer quantidade de elementos irmãos com o mesmo nome — um feed com um <item> ou com cinquenta analisa igual — enquanto o JSON exige uma decisão: <item> é um valor ou um array? A regra aqui é que irmãos repetidos viram um array JSON e um elemento único fica como valor simples. É a leitura natural, mas tem uma quina afiada: um feed que normalmente traz muitos itens e traz um vira um escalar, e o consumidor que espera uma lista quebra. Verifique sempre a condição de array a jusante.",
            "Quando um elemento tem atributos e texto ao mesmo tempo, o texto não pode ficar nu — vai para \"#text\", então <price currency=\"usd\">19.99</price> vira {\"@currency\":\"usd\",\"#text\":19.99}. Elementos de texto puro mantêm o valor direto, o que mantém a saída legível em vez de embrulhar cada folha num objeto #text.",
          ],
        },
        {
          heading: "Conversão de tipos e os limites do mapeamento",
          paragraphs: [
            "XML não tem tipos — todo valor é texto até você decidir outra coisa. O conversor aplica uma coerção leve: texto que parece número vira número JSON, true/false vira booleano, e todo o resto fica como string. Valores de atributo permanecem strings de propósito, porque atributos quase sempre carregam identificadores, códigos e datas, onde \"07\" e 7 são coisas diferentes. Se seu consumidor precisa de um número ali, converta explicitamente em vez de apostar na adivinhação.",
            "Algumas construções XML simplesmente não têm casa no JSON. Namespaces sobrevivem como prefixos nos nomes das tags, mas suas vinculações URI se perdem, então dois documentos com prefixos diferentes para o mesmo namespace não fazem a ida e volta de forma idêntica. Comentários, instruções de processamento e o DOCTYPE são descartados — nenhum carrega dados. CDATA é fundida com texto comum, algo que importa apenas se seu consumidor depender dessa distinção, o que não deveria.",
            "Esses limites são inerentes à lacuna entre os formatos, não a esta ferramenta: qualquer conversor XML para JSON precisa tomar o mesmo tipo de decisões, e a maioria toma piores. O fluxo confiável é testar a ida e volta sobre uma amostra representativa dos seus documentos reais — converter para JSON, voltar para XML e comparar — antes de comprometer um pipeline ao mapeamento.",
          ],
        },
        {
          heading: "Valide primeiro, converta localmente",
          paragraphs: [
            "XML mal formado é a falha mais comum e merece um erro melhor que um stack trace. O conversor valida o documento antes de tocá-lo e reporta os problemas apontando a linha ofensora, então uma tag de fechamento faltante é um conserto de uma linha, não uma tarde. Quando a entrada vier de um arquivo editado à mão, passe-a antes pelo validador XML: o relatório dele é mais estrito e captura atributos duplicados e entidades ilegais que a conversão poderia deixar passar.",
            "A conversão roda inteiramente no seu navegador com fast-xml-parser, uma biblioteca de análise em que confiam muitas ferramentas de build. Seu XML nunca é enviado: feeds com dados de assinantes, respostas SOAP com tokens de sessão, exportações de configuração interna — tudo fica no seu dispositivo. Para esses payloads, a conversão local no navegador não é uma conveniência, é o objetivo.",
            "Ser local também torna a ferramenta boa para trabalho iterativo: cole uma amostra, inspecione a forma, ajuste o que seu consumidor espera, cole de novo. Não há viagem de upload no ciclo, cada iteração leva segundos e tudo funciona offline — útil quando você depura um feed numa máquina sem rede.",
          ],
        },
      ],
    },
  },
});
