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
      deepDive: [
        {
          heading: "What a syntax validator can and cannot tell you",
          paragraphs: [
            "This validator answers exactly one question: is this document valid JSON as defined by RFC 8259? It checks structure — balanced braces and brackets, commas between elements, double-quoted strings and keys, legal escapes, exactly one top-level value. It does not check whether the data makes sense.",
            "Schema checks are a different job. A document like {\"age\": \"forty\"} is perfectly valid JSON here — the value is a legal string — even though your API expects a number. Catching that mismatch requires JSON Schema or a validator tuned to your API contract, and mixing the two jobs leads to confusing results. Use this tool first to confirm the document parses at all; only then worry about what the fields mean.",
            "A useful mental model: syntax validation is a spell check, schema validation is a grammar check. Fix every red flag here before you run your payload against a schema or send it to a real endpoint, because a schema validator cannot even start on input that does not parse.",
          ],
        },
        {
          heading: "Reading the line and column report",
          paragraphs: [
            "The position reported points at the first character that made the parse impossible, not at the root cause. A missing comma before line 7 is usually reported as an error at line 7, where the parser found something it did not expect. When you fix an error, re-run: errors often cascade, and one missing bracket can mask several others behind it.",
            "The most common culprits in hand-edited JSON are a trailing comma after the last element, single quotes instead of double quotes (a habit picked up from JavaScript), and copy-pasted invisible characters — a non-breaking space at the start of a line is reported as an unexpected token even though you cannot see it. Deleting and retyping the flagged line fixes the invisible-character case.",
            "Another classic: literal newlines inside a string. JSON strings must be one line, with \\n written as the two-character escape sequence. Editors that soft-wrap make this hard to spot, which is why the column number — not just the line — matters when reading the report.",
          ],
        },
        {
          heading: "Why local validation matters",
          paragraphs: [
            "Payloads you paste into a validator are rarely public: webhook bodies containing user emails, API responses from a staging environment, config files with tokens, database dumps in transit. Sending them to an unknown server to be validated is a small but real data-leak risk, and many online validators do exactly that.",
            "Everything here runs in your browser's JavaScript. The document is parsed on your device and never transmitted, logged or stored — you can validate secrets, internal API payloads and customer data without a second thought. It also means the tool works offline: a plane, a locked-down corporate network or a dead VPN does not stop you from checking a config.",
            "There is no size gate either — the limit is your browser's memory, not an upload cap. Large logs converted to JSON, full database exports and machine-generated documents validate just as fast as a two-line snippet.",
          ],
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
      deepDive: [
        {
          heading: "语法校验器能告诉你什么、不能告诉你什么",
          paragraphs: [
            "这个校验器只回答一个问题:这份文档是否符合 RFC 8259 定义的合法 JSON。它检查结构——括号是否配对、元素之间有没有逗号、字符串和键是否用双引号、转义是否合法、顶层是否只有一个值。它不检查数据本身是否合理。",
            "Schema 校验是另一份工作。{\"age\": \"forty\"} 在这里是完全合法的 JSON——值就是合法字符串——尽管你的 API 期待的是数字。要发现这种不匹配需要 JSON Schema 或针对你的接口契约写的校验器,把两件事混在一起只会带来困惑。先用本工具确认文档能解析,再去关心字段含义。",
            "一个好记的类比:语法校验是查拼写,schema 校验是查语法。先用它把所有红色报错清零,再拿去跑 schema 或调真实接口——文档连解析都过不了,schema 校验器根本无从下手。",
          ],
        },
        {
          heading: "怎么读行列报错",
          paragraphs: [
            "报告的位置指向第一个让解析无法继续的字符,而不是错误的根源。第 7 行之前漏了一个逗号,报错往往落在第 7 行——解析器在这里遇到了意料之外的东西。修完一个错误要重新跑一遍:错误会级联,一个缺的括号可能把后面好几个错误都遮住。",
            "手工编辑的 JSON 最常见的坑:最后一个元素后面多了个尾逗号;习惯 JavaScript 写法用了单引号;复制粘贴带进来的不可见字符——行首一个不换行空格会被报成 unexpected token,但肉眼看不见。把被标记的那一行删掉重新手打,通常能解决不可见字符问题。",
            "另一个经典:字符串里写了真实的换行。JSON 字符串必须单行,换行要写成 \\n 两个字符的转义序列。编辑器的软换行让这类问题很难肉眼发现,所以读报错时列号跟行号一样重要。",
          ],
        },
        {
          heading: "为什么要在本地校验",
          paragraphs: [
            "你贴进校验器的 payload 很少是公开内容:带用户邮箱的 webhook 报文、预发环境的 API 响应、带 token 的配置文件、传输中的数据库导出。发给不明的服务器去校验是不小但真实的数据外泄风险——很多在线校验器恰恰就是这么干的。",
            "这里的一切都在浏览器的 JavaScript 里跑。文档在你的设备上解析,不传输、不记录、不存储——密钥、内部接口报文、客户数据都可以放心校验。顺带的好处是离线可用:飞机上、内网限制、VPN 断了,都不妨碍你查一份配置。",
            "也没有人为的大小门槛——上限是你浏览器的内存,不是上传配额。转成 JSON 的大日志、完整数据库导出、机器生成的文档,校验速度跟两行片段一样快。",
          ],
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
      deepDive: [
        {
          heading: "構文バリデーターにできること・できないこと",
          paragraphs: [
            "このバリデーターが答えるのは一つの質問だけです。この文書は RFC 8259 の定義する有効な JSON か。チェックするのは構造です。括弧の対応、要素間のカンマ、文字列とキーのダブルクォート、エスケープの合法性、トップレベルの値が一つだけか。データの中身が妥当かまでは見ません。",
            "スキーマ検証は別の仕事です。{\"age\": \"forty\"} はここでは完全に有効な JSON です。値は正当な文字列だからです。API が数値を期待していても関係ありません。この不整合を検出するには JSON Schema や API 契約に合わせた検証器が必要で、二つの役割を混ぜると結果が分かりにくくなります。まずこのツールで解析できることを確認し、それからフィールドの意味を気にするのが順番です。",
            "覚えやすい比喩があります。構文検証はスペルチェック、スキーマ検証は文法チェックです。ここで赤い指摘を全部消してから schema や本番エンドポイントに投げましょう。解析すら通らない入力に対してスキーマ検証器は何も始められません。",
          ],
        },
        {
          heading: "行と列のレポートの読み方",
          paragraphs: [
            "報告される位置は、解析を続けられなくした最初の文字を指します。原因の場所ではありません。7 行目の前にカンマが一つ抜けていれば、エラーはたいてい 7 行目に出ます。パーサーが予想外のものを見つけた場所だからです。一つ直したら再実行してください。エラーは連鎖し、閉じ括弧一つの欠落が後ろの複数のエラーを隠すことがあります。",
            "手編集の JSON で定番の失敗は、最後の要素の後の末尾カンマ、JavaScript の癖でシングルクォートを使うこと、そしてコピペで持ち込まれる不可視文字です。行頭のノーブレークスペース一つが unexpected token として報告されますが、目では見えません。指摘された行を消して打ち直すと、不可視文字のケースはだいたい直ります。",
            "もう一つの定番は文字列の中の生の改行です。JSON の文字列は一行でなければならず、改行は 2 文字のエスケープ \\n で書きます。エディタのソフトラップでは気づきにくいので、レポートを読むときは行番号だけでなく列番号も重要です。",
          ],
        },
        {
          heading: "ローカル検証が重要な理由",
          paragraphs: [
            "バリデーターに貼るペイロードは公開物であることが少ありません。ユーザーのメールを含む webhook の本体、ステージング環境の API レスポンス、トークン入り設定ファイル、転送中の DB ダンプです。未知のサーバーに送って検証してもらうのは小さいようで現実的な漏えいリスクで、実際にそれをしているオンライン検証器は少なくありません。",
            "ここではすべてがブラウザの JavaScript で動きます。文書は端末上で解析され、送信・記録・保存は一切ありません。秘密鍵、内部 API のペイロード、顧客データも安心して検証できます。さらにオフラインでも使えます。機内、厳しい社内ネットワーク、VPN 切断でも設定ファイルをチェックできます。",
            "サイズの窓口もありません。上限はアップロード制限ではなくブラウザのメモリです。JSON 化した巨大ログ、DB の全量エクスポート、機械生成の文書も、2 行の断片と同じ速さで検証できます。",
          ],
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
      deepDive: [
        {
          heading: "Qué puede y qué no puede decirte un validador de sintaxis",
          paragraphs: [
            "Este validador responde exactamente una pregunta: ¿es este documento JSON válido según el RFC 8259? Comprueba estructura — llaves y corchetes balanceados, comas entre elementos, cadenas y claves con comillas dobles, escapes legales, un único valor de nivel superior. No comprueba si los datos tienen sentido.",
            "Validar el esquema es otro trabajo. Un documento como {\"age\": \"forty\"} es JSON perfectamente válido aquí — el valor es una cadena legal — aunque tu API espere un número. Detectar ese desajuste requiere JSON Schema o un validador ajustado al contrato de tu API; mezclar las dos tareas solo genera confusión. Primero confirma con esta herramienta que el documento se puede parsear; después preocúpate de qué significan los campos.",
            "Una analogía útil: la validación de sintaxis es un corrector ortográfico, la validación de esquema es un corrector gramatical. Limpia aquí todas las marcas rojas antes de pasar tu payload por un schema o enviarlo a un endpoint real — un validador de esquema no puede empezar a trabajar con algo que ni siquiera se parsea.",
          ],
        },
        {
          heading: "Cómo leer el informe de línea y columna",
          paragraphs: [
            "La posición señalada apunta al primer carácter que hizo imposible el parseo, no a la causa raíz. Una coma que falta antes de la línea 7 suele reportarse en la línea 7, donde el parser encontró algo inesperado. Al corregir un error, vuelve a ejecutar: los errores se encadenan y un solo corchete faltante puede ocultar varios más.",
            "Los culpables más comunes en JSON editado a mano son la coma final tras el último elemento, comillas simples en lugar de dobles (un hábito heredado de JavaScript) y caracteres invisibles pegados al copiar — un espacio de no ruptura al inicio de una línea se reporta como token inesperado aunque no se vea. Borrar y reescribir la línea señalada arregla casi siempre el caso de los caracteres invisibles.",
            "Otro clásico: saltos de línea literales dentro de una cadena. Las cadenas JSON deben ocupar una sola línea, con \\n escrito como secuencia de escape de dos caracteres. El ajuste de línea suave del editor lo hace difícil de ver, por eso la columna importa tanto como la línea al leer el informe.",
          ],
        },
        {
          heading: "Por qué importa validar en local",
          paragraphs: [
            "Lo que pegas en un validador rara vez es público: cuerpos de webhook con correos de usuarios, respuestas de API en entorno de pruebas, archivos de configuración con tokens, volcados de base de datos en tránsito. Enviarlo a un servidor desconocido para validarlo es un riesgo de fuga pequeño pero real, y muchos validadores online hacen exactamente eso.",
            "Todo aquí corre en el JavaScript de tu navegador. El documento se parsea en tu dispositivo y jamás se transmite, registra ni almacena — puedes validar secretos, payloads internos y datos de clientes sin pensarlo dos veces. Además funciona sin conexión: un avión, una red corporativa cerrada o una VPN caída no te impiden revisar una configuración.",
            "Tampoco hay puerta de tamaño — el límite es la memoria de tu navegador, no una cuota de subida. Logs grandes convertidos a JSON, exportaciones completas de base de datos y documentos generados por máquinas se validan tan rápido como un fragmento de dos líneas.",
          ],
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
      deepDive: [
        {
          heading: "O que um validador de sintaxe pode e não pode dizer",
          paragraphs: [
            "Este validador responde exatamente uma pergunta: este documento é JSON válido conforme o RFC 8259? Ele verifica estrutura — chaves e colchetes balanceados, vírgulas entre elementos, strings e chaves com aspas duplas, escapes legais, um único valor no nível principal. Ele não verifica se os dados fazem sentido.",
            "Validar o schema é outro trabalho. Um documento como {\"age\": \"forty\"} é JSON perfeitamente válido aqui — o valor é uma string legal — mesmo que sua API espere um número. Detectar esse descasento exige JSON Schema ou um validador ajustado ao contrato da sua API; misturar as duas tarefas só gera confusão. Primeiro confirme com esta ferramenta que o documento é parseável; depois se preocupe com o que os campos significam.",
            "Uma analogia útil: validação de sintaxe é um corretor ortográfico, validação de schema é um corretor gramatical. Zere todas as marcações vermelhas aqui antes de passar o payload por um schema ou enviá-lo a um endpoint real — um validador de schema não consegue começar a trabalhar com algo que nem parseia.",
          ],
        },
        {
          heading: "Como ler o relatório de linha e coluna",
          paragraphs: [
            "A posição apontada marca o primeiro caractere que tornou o parse impossível, não a causa raiz. Uma vírgula faltando antes da linha 7 costuma ser reportada na linha 7, onde o parser encontrou algo inesperado. Ao corrigir um erro, rode de novo: os erros se encadeiam, e um único colchete faltando pode esconder vários outros.",
            "Os culpados mais comuns em JSON editado à mão são a vírgula sobrando após o último elemento, aspas simples no lugar de duplas (um hábito herdado do JavaScript) e caracteres invisíveis colados no copiar e colar — um espaço rígido no início de uma linha é reportado como token inesperado mesmo sem aparecer. Apagar e redigitar a linha marcada resolve quase sempre o caso dos caracteres invisíveis.",
            "Outro clássico: quebras de linha literais dentro de uma string. Strings JSON devem ocupar uma linha só, com \\n escrito como sequência de escape de dois caracteres. A quebra suave do editor dificulta enxergar isso, por isso a coluna importa tanto quanto a linha ao ler o relatório.",
          ],
        },
        {
          heading: "Por que validar localmente importa",
          paragraphs: [
            "O que você cola num validador raramente é público: corpos de webhook com e-mails de usuários, respostas de API em ambiente de testes, arquivos de configuração com tokens, dumps de banco em trânsito. Enviar tudo a um servidor desconhecido para validar é um risco de vazamento pequeno mas real, e muitos validadores online fazem exatamente isso.",
            "Tudo aqui roda no JavaScript do seu navegador. O documento é parseado no seu dispositivo e nunca é transmitido, registrado ou armazenado — dá para validar segredos, payloads internos e dados de clientes sem pesar. De quebra, funciona offline: um avião, uma rede corporativa fechada ou uma VPN caída não impedem de conferir uma configuração.",
            "Não há porte de tamanho tampouco — o limite é a memória do navegador, não uma cota de upload. Logs grandes convertidos em JSON, exportações completas de banco e documentos gerados por máquina validam tão rápido quanto um trecho de duas linhas.",
          ],
        },
      ],
    },
  },
});
