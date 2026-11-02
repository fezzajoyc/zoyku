import { DevXmlToJsonEngine } from "../_engines/dev-engine-xml-to-json";
import { defineTool } from "../_lib/types";

const SAMPLE =
  '<library><book id="1" lang="en"><title>Clean Code</title><author>Robert C. Martin</author><tags><tag>programming</tag><tag>craft</tag></tags><inStock>true</inStock></book></library>';

export default defineTool({
  slug: "xml-to-json",
  category: "developer",
  icon: "code",
  engine: { component: DevXmlToJsonEngine, props: { sample: SAMPLE } },
  related: ["json-to-xml", "xml-formatter", "xml-validator", "json-formatter"],
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
    },
  },
});
