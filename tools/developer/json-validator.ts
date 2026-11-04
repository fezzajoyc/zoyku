import { DevCodeEngine } from "../_engines/dev-engine-code";
import { defineTool } from "../_lib/types";

const SAMPLE = '{"users":[{"id":1,"name":"Ada","active":true},{"id":2,"name":"Grace",}]}';

export default defineTool({
  slug: "json-validator",
  category: "developer",
  icon: "check",
  engine: { component: DevCodeEngine, props: { mode: "json-validate", validator: "json", sample: SAMPLE } },
  related: ["json-formatter", "json-minifier", "jwt-decoder", "regex-tester", "md5-generator", "sha256-generator", "base64-image", "url-encoder", "html-minifier", "url-decoder"],
  copy: {
    en: {
      name: "JSON Validator",
      tagline:
        "Validate JSON instantly with precise error line and column. Catch missing commas, unquoted keys, trailing commas and bad escapes before they break your app.",
      intro: [
        "Paste any JSON document and see at a glance whether it is valid. The validator is strict: it follows the JSON standard, so common mistakes like single quotes, trailing commas, unquoted keys and comments are all reported. It is the fastest way to check a config file, a webhook payload or a fixiture before wiring it into a test.",
        "Strictness is defined by RFC 8259: strings must use double quotes, object keys must be strings, no trailing comma may follow the last element, and the whole document must be one JSON value. Anything JavaScript's JSON.parse accepts is valid here — and anything it rejects, this tool rejects with the same rules.",
        "When something is wrong you get the exact line and column plus a human-readable reason — not a cryptic one-line message like \"Unexpected token\". Valid input is rewarded with a pretty-printed version you can copy straight away, so validation and cleanup happen in one step.",
        "A linter such as ESLint needs a project, a config and a run step, and it flags style issues this tool deliberately ignores — validity is the only question here. Compared with eyeballing a payload in the browser console, you get precise error locations and work entirely locally: the JSON never leaves your device.",

      ],
      steps: [
        "Paste your JSON into the input box.",
        "A green status appears if the JSON is valid; otherwise the exact line, column and reason are shown.",
        "Fix the reported position, or copy the pretty-printed output when validation passes.",
      ],
      faqs: [
        {
          q: "Which errors can the validator find?",
          a: "All standard JSON syntax errors: missing or extra commas, unquoted or single-quoted keys, trailing commas, unescaped control characters, invalid escapes, and stray content after the value — each reported with line and column.",
        },
        {
          q: "Does it also check the schema or just the syntax?",
          a: "Syntax only. It verifies the document is valid JSON, not that fields have expected types or values — for that you need a schema validator such as JSON Schema.",
        },
        {
          q: "Is my JSON uploaded anywhere?",
          a: "No. Validation happens locally in your browser; nothing leaves your device.",
        },
      ],
    },
    zh: {
      name: "JSON 校验",
      tagline: "即时校验 JSON,精确报出行列位置。缺逗号、键没加引号、尾逗号、非法转义都能查出来,别让坏 JSON 上线。",
      intro: [
        "粘贴任意 JSON,一眼看出是否合法。校验遵循 JSON 标准,十分严格:单引号、尾逗号、键没加引号、注释等常见错误都会被指出。",
        "出错时你会得到精确的行列位置和通俗易懂的原因,而不是一行天书。校验通过后还会直接给出可复制的格式化结果。",
      ],
      steps: [
        "把 JSON 粘贴到输入框。",
        "合法时显示绿色状态;否则显示精确的行、列和原因。",
        "按提示位置修复;校验通过后可直接复制格式化输出。",
      ],
      faqs: [
        {
          q: "校验器能查出哪些错误?",
          a: "所有标准 JSON 语法错误:逗号缺失或多余、键没加引号或用了单引号、尾逗号、未转义的控制字符、非法转义、值后有多余内容——每个都带行列位置。",
        },
        {
          q: "它检查 schema 还是只检查语法?",
          a: "只检查语法。它验证文档是合法 JSON,不验证字段类型或取值是否符合预期——那需要 JSON Schema 之类的工具。",
        },
        {
          q: "JSON 会被上传吗?",
          a: "不会。校验在浏览器本地完成,数据不离开设备。",
        },
      ],
    },
    ja: {
      name: "JSON バリデーター",
      tagline:
        "JSON を即時検証し、エラーの行と列を正確に表示。カンマ抜け・未引用キー・末尾カンマ・不正エスケープをリリース前に発見します。",
      intro: [
        "JSON を貼り付ければ、有効かどうかがひと目で分かります。検証は JSON 規格に厳密に従い、シングルクォート・末尾カンマ・未引用キー・コメントといったよくある間違いをすべて検出します。",
        "エラーがある場合は、意味不明な 1 行メッセージではなく、正確な行・列と読みやすい理由が表示されます。有効な入力には、そのままコピーできる整形済みの出力も表示します。",
      ],
      steps: [
        "JSON を入力欄に貼り付けます。",
        "有効なら緑のステータス、そうでなければ正確な行・列と理由が表示されます。",
        "指摘された位置を修正するか、検証に通ったら整形結果をコピーします。",
      ],
      faqs: [
        {
          q: "どんなエラーを検出できますか?",
          a: "標準的な JSON の構文エラーすべてです。カンマの過不足、引用符のないキーやシングルクォート、末尾カンマ、未エスケープの制御文字、不正なエスケープ、値の後の余計な内容 —— それぞれ行と列付きで報告します。",
        },
        {
          q: "スキーマもチェックしますか?",
          a: "構文のみです。ドキュメントが有効な JSON であることは検証しますが、フィールドの型や値が期待どおりかは JSON Schema など別ツールが必要です。",
        },
        {
          q: "JSON はアップロードされますか?",
          a: "いいえ。検証はブラウザ内でローカルに行われ、端末の外には何も出ません。",
        },
      ],
    },
    es: {
      name: "Validador JSON",
      tagline:
        "Valida JSON al instante con línea y columna exactas del error. Detecta comas ausentes, claves sin comillas, comas finales y escapes inválidos.",
      intro: [
        "Pega cualquier documento JSON y comprueba de un vistazo si es válido. La validación es estricta y sigue el estándar: errores habituales como comillas simples, comas finales, claves sin comillas y comentarios se señalan todos.",
        "Cuando algo falla obtienes la línea y columna exactas y un motivo legible — no un mensaje críptico. Con entrada válida recibes además una versión formateada lista para copiar.",
      ],
      steps: [
        "Pega tu JSON en el cuadro de entrada.",
        "Si es válido aparece un estado verde; si no, la línea, columna y motivo exactos.",
        "Corrige la posición indicada, o copia la salida formateada cuando la validación pase.",
      ],
      faqs: [
        {
          q: "¿Qué errores puede detectar?",
          a: "Todos los errores de sintaxis JSON estándar: comas de más o de menos, claves sin comillas o con comillas simples, comas finales, caracteres de control sin escapar, escapes inválidos y contenido sobrante tras el valor — siempre con línea y columna.",
        },
        {
          q: "¿Comprueba también el esquema o solo la sintaxis?",
          a: "Solo la sintaxis. Verifica que el documento sea JSON válido, no que los campos tengan los tipos o valores esperados: para eso hace falta un validador de esquemas como JSON Schema.",
        },
        {
          q: "¿Mi JSON se sube a algún sitio?",
          a: "No. La validación ocurre localmente en tu navegador; nada sale de tu dispositivo.",
        },
      ],
    },
    pt: {
      name: "Validador JSON",
      tagline:
        "Valide JSON na hora com linha e coluna exatas do erro. Detecte vírgulas ausentes, chaves sem aspas, vírgulas sobrando e escapes inválidos antes do deploy.",
      intro: [
        "Cole qualquer documento JSON e veja de relance se é válido. A validação é estrita e segue o padrão: erros comuns como aspas simples, vírgulas sobrando, chaves sem aspas e comentários são todos apontados.",
        "Quando algo está errado você recebe a linha e a coluna exatas e um motivo legível — não uma mensagem críptica. Com entrada válida, você ganha de brinde uma versão formatada pronta para copiar.",
      ],
      steps: [
        "Cole seu JSON na caixa de entrada.",
        "Se for válido aparece um status verde; senão, a linha, a coluna e o motivo exatos.",
        "Corrija a posição indicada ou copie a saída formatada quando a validação passar.",
      ],
      faqs: [
        {
          q: "Quais erros o validador encontra?",
          a: "Todos os erros de sintaxe JSON padrão: vírgulas a mais ou a menos, chaves sem aspas ou com aspas simples, vírgulas sobrando, caracteres de controle sem escape, escapes inválidos e conteúdo sobrando após o valor — sempre com linha e coluna.",
        },
        {
          q: "Ele também valida o schema ou só a sintaxe?",
          a: "Somente a sintaxe. Ele verifica que o documento é JSON válido, não que os campos têm os tipos ou valores esperados — para isso use um validador de schema como JSON Schema.",
        },
        {
          q: "Meu JSON é enviado para algum lugar?",
          a: "Não. A validação acontece localmente no seu navegador; nada sai do seu dispositivo.",
        },
      ],
    },
  },
});
