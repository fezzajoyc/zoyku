import { DevCodeEngine } from "../_engines/dev-engine-code";
import { defineTool } from "../_lib/types";

const SAMPLE = '<catalog><book id="1"><title>Design</title><year>1971</year></book><book id="2"><title>Code</title></catalog>';

export default defineTool({
  slug: "xml-validator",
  category: "developer",
  icon: "check",
  engine: { component: DevCodeEngine, props: { mode: "xml-validate", validator: "xml", sample: SAMPLE } },
  related: ["xml-formatter", "html-formatter", "json-validator"],
  copy: {
    en: {
      name: "XML Validator",
      tagline:
        "Check XML for well-formedness in real time: mismatched tags, broken attributes and invalid entities are reported the moment you paste. Nothing is uploaded.",
      intro: [
        "The validator uses the browser's built-in XML parser, so it enforces exactly the rules real XML tooling enforces: every tag must close, attributes must be quoted, entities must be valid, and there must be exactly one root element.",
        "Well-formed XML gets a green status plus a pretty-printed preview; problems show up with the parser's own error description, which pinpoints the offending construct — useful before feeding feeds, sitemaps or SOAP payloads to picky consumers.",
      ],
      steps: [
        "Paste your XML into the input box.",
        "A green status appears if the XML is well-formed; otherwise the parser error is shown.",
        "Fix the reported problem, or copy the formatted preview when it passes.",
      ],
      faqs: [
        {
          q: "Does this validate against a DTD or XSD schema?",
          a: "No — it checks well-formedness only (structure, quoting, entities, single root). Schema validation needs a dedicated tool with your XSD or DTD.",
        },
        {
          q: "What counts as an XML error here?",
          a: "Unclosed or mismatched tags, unquoted attributes, duplicate attributes, invalid entity references, multiple root elements and illegal characters are all rejected.",
        },
        {
          q: "Is my XML sent anywhere?",
          a: "No. The check runs in your browser with the native DOMParser — your data never leaves the device.",
        },
      ],
    },
    zh: {
      name: "XML 校验",
      tagline: "实时检查 XML 是否格式良好:标签不匹配、属性引号缺失、实体非法,粘贴即报。数据全程不上传。",
      intro: [
        "校验使用浏览器内置的 XML 解析器,规则与真实 XML 工具完全一致:标签必须闭合、属性必须加引号、实体必须合法,并且只能有一个根元素。",
        "格式良好时显示绿色状态和格式化预览;有问题时给出解析器的错误描述,直接指向出错位置——在把订阅源、站点地图或 SOAP 报文交给挑剔的消费方之前先自检一遍很有用。",
      ],
      steps: [
        "把 XML 粘贴到输入框。",
        "格式良好时显示绿色状态;否则显示解析器错误。",
        "按提示修复问题;校验通过后可复制格式化预览。",
      ],
      faqs: [
        {
          q: "会按 DTD 或 XSD schema 校验吗?",
          a: "不会——只检查格式良好性(结构、引号、实体、唯一根元素)。schema 校验需要配合你的 XSD 或 DTD 的专用工具。",
        },
        {
          q: "哪些算 XML 错误?",
          a: "未闭合或不匹配的标签、属性没加引号、重复属性、非法实体引用、多个根元素、非法字符,全都会被拒绝。",
        },
        {
          q: "XML 会被发送到别处吗?",
          a: "不会。校验在浏览器中用原生 DOMParser 完成,数据不离开设备。",
        },
      ],
    },
    ja: {
      name: "XML バリデーター",
      tagline:
        "XML の整形式性をリアルタイムにチェック。タグの不一致・属性の引用符漏れ・不正な実体を貼り付けた瞬間に検出します。",
      intro: [
        "検証にはブラウザ内蔵の XML パーサーを使うため、実際の XML ツールと同じ規則が適用されます。タグは必ず閉じる、属性は必ず引用符で囲む、実体は有効、ルート要素は 1 つだけ。",
        "整形式なら緑のステータスと整形プレビューを表示。問題があればパーサー自身のエラー説明が表示され、原因の箇所が特定できます。フィードやサイトマップ、SOAP を渡す前のセルフチェックに便利です。",
      ],
      steps: [
        "XML を入力欄に貼り付けます。",
        "整形式なら緑のステータス、そうでなければパーサーのエラーが表示されます。",
        "指摘箇所を修正するか、合格したら整形プレビューをコピーします。",
      ],
      faqs: [
        {
          q: "DTD や XSD スキーマに対する検証もできますか?",
          a: "できません。整形式性(構造・引用符・実体・単一根)のみをチェックします。スキーマ検証には XSD や DTD を扱う専用ツールが必要です。",
        },
        {
          q: "どんなものがエラーになりますか?",
          a: "閉じられていないタグや不一致タグ、引用符のない属性、重複属性、不正な実体参照、複数のルート要素、不正な文字はすべて拒否されます。",
        },
        {
          q: "XML はどこかに送信されますか?",
          a: "いいえ。ネイティブの DOMParser でブラウザ内チェックするため、データは端末の外に出ません。",
        },
      ],
    },
    es: {
      name: "Validador XML",
      tagline:
        "Comprueba la buena formación del XML en tiempo real: etiquetas sin cerrar, atributos sin comillas y entidades inválidas se detectan al pegar. Nada se sube.",
      intro: [
        "El validador usa el parser XML integrado del navegador, así que aplica exactamente las reglas del XML real: toda etiqueta debe cerrarse, los atributos deben ir entre comillas, las entidades deben ser válidas y solo puede haber un elemento raíz.",
        "El XML bien formado recibe un estado verde y una vista formateada; los problemas muestran la descripción del parser, que señala la construcción problemática — útil antes de entregar feeds, sitemaps o SOAP a consumidores exigentes.",
      ],
      steps: [
        "Pega tu XML en el cuadro de entrada.",
        "Si está bien formado aparece un estado verde; si no, el error del parser.",
        "Corrige el problema indicado, o copia la vista formateada si pasa la comprobación.",
      ],
      faqs: [
        {
          q: "¿Valida contra un esquema DTD o XSD?",
          a: "No — solo comprueba la buena formación (estructura, comillas, entidades, raíz única). La validación por esquema requiere una herramienta dedicada con tu XSD o DTD.",
        },
        {
          q: "¿Qué cuenta como error XML aquí?",
          a: "Etiquetas sin cerrar o sin emparejar, atributos sin comillas, atributos duplicados, referencias a entidades inválidas, varias raíces y caracteres ilegales se rechazan.",
        },
        {
          q: "¿Mi XML se envía a algún sitio?",
          a: "No. La comprobación corre en tu navegador con el DOMParser nativo: tus datos nunca salen del dispositivo.",
        },
      ],
    },
    pt: {
      name: "Validador XML",
      tagline:
        "Verifique a integridade estrutural do XML em tempo real: tags sem fechar, atributos sem aspas e entidades inválidas aparecem ao colar. Nada é enviado.",
      intro: [
        "O validador usa o parser XML nativo do navegador, então aplica exatamente as regras das ferramentas XML reais: toda tag deve fechar, atributos devem estar entre aspas, entidades devem ser válidas e só pode haver um elemento raiz.",
        "XML bem formado recebe status verde e uma pré-visualização formatada; problemas mostram a descrição do próprio parser, apontando o trecho com defeito — útil antes de entregar feeds, sitemaps ou SOAP a consumidores exigentes.",
      ],
      steps: [
        "Cole seu XML na caixa de entrada.",
        "Se estiver bem formado aparece um status verde; senão, o erro do parser.",
        "Corrija o problema indicado ou copie a pré-visualização formatada se passar.",
      ],
      faqs: [
        {
          q: "Valida contra um schema DTD ou XSD?",
          a: "Não — verifica apenas a boa formação (estrutura, aspas, entidades, raiz única). A validação por schema exige uma ferramenta dedicada com seu XSD ou DTD.",
        },
        {
          q: "O que conta como erro de XML aqui?",
          a: "Tags não fechadas ou desencontradas, atributos sem aspas, atributos duplicados, referências de entidade inválidas, múltiplas raízes e caracteres ilegais são todos rejeitados.",
        },
        {
          q: "Meu XML é enviado para algum lugar?",
          a: "Não. A verificação roda no seu navegador com o DOMParser nativo — seus dados nunca saem do dispositivo.",
        },
      ],
    },
  },
});
