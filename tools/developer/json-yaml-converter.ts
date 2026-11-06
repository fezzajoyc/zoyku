import { DevEngineYaml } from "../_engines/dev-engine-yaml";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "json-yaml-converter",
  category: "developer",
  icon: "swap",
  engine: { component: DevEngineYaml, props: { mode: "json2yaml" } },
  related: ["json-formatter", "json-minifier", "json-to-typescript", "md5-generator", "sha256-generator", "base64-image", "json-validator", "url-encoder", "html-minifier", "url-decoder"],
  copy: {
    en: {
      name: "JSON ⇄ YAML Converter",
      tagline: "Convert JSON to YAML and back — config-file ready, with a swap-to-continue workflow and precise error messages.",
      intro: [
        "Kubernetes manifests, GitHub Actions workflows and docker-compose files are YAML; almost every API speaks JSON — converting between the two is a daily chore. Paste one side, take the other, and flip direction with the swap button in the same panel.",
        "JSON comes back pretty-printed with 2-space indentation; YAML comes back in clean block style rather than flow style, so output reads like a hand-written config file rather than a machine dump.",
        "Conversion is powered by js-yaml, the parser behind many build and config tools. Errors are precise: a bad indent or a duplicate key is reported at the actual problem instead of failing with a cryptic message.",
        "The converter also helps you dodge classic YAML traps that js-yaml inherits from YAML 1.1: the bare word Norway parses as boolean false, 1.0 is a float while 1 is an integer, and unquoted version strings can surprise you. Round-tripping through JSON forces every type to be explicit — one reason JSON remains the safer wire format."
      ],
      steps: [
        "Paste JSON or YAML depending on direction.",
        "Click convert — output appears below.",
        "Use the swap button to continue converting in the other direction.",
      ],
      faqs: [
        {
          q: "Which YAML features are supported?",
          a: "The standard js-yaml core schema: nested maps, sequences, scalars, quoted strings. YAML anchors and custom tags are out of scope for reliable round-trips.",
        },
        {
          q: "Why did my conversion fail?",
          a: "Most often a tab character in YAML indentation (tabs are forbidden there) or duplicate keys in JSON. The error message points at the problem.",
        },
      ],
      deepDive: [
        {
          heading: "Why JSON and YAML can never round-trip perfectly",
          paragraphs: [
            "JSON and YAML are not two spellings of the same data model — YAML is a superset in ambition. YAML carries information JSON has no slot for: anchors and aliases let one node be referenced from several places, multiple documents can live in one file separated by ---, and custom tags can mark a value as a timestamp, binary blob or domain-specific type. A converter that only models JSON can represent none of that faithfully.",
            "This tool intentionally restricts itself to the core schema — nested maps, sequences and scalars — so that anything it emits can be parsed back losslessly. Anchors are deliberately out of scope: converting a YAML file that uses aliases into JSON would have to inline every reference, and converting back would never recover the original anchor structure.",
            "The same care applies to multi-document files. A .yaml containing several --- separated documents is really a list of files, not one object; silently converting only the first document or merging them would corrupt the meaning. Feed the tool one document at a time and the round-trip stays exact.",
          ],
        },
        {
          heading: "The type-coercion traps YAML 1.1 left behind",
          paragraphs: [
            "YAML parsers decide a scalar's type by looking at it. In the legacy 1.1 rules that most parsers still default to, the bare word Norway is a boolean false (an acronym of N-o-r-w-a-y, matching the yes/no/on/off family), version numbers like 1.20 can collapse to 1.2, and a key that starts with a space is easy to lose entirely. These are not exotic edge cases — they break real CI configs every year.",
            "The classic safety incident is the Norwegian country code: a user's country field reading NO becomes false in the parsed document. Quoting is the defense — write \"NO\", \"on\", \"1.0\" as strings whenever a value means text, not a type. When you paste YAML here and convert to JSON, js-yaml's core schema decides those coercions, and the JSON output makes the resulting types visible so you can catch them.",
            "JSON's advantage is that it has no such guessing: every value must declare its type structurally — \"false\" in quotes is a string, 2.0 stays a number. That is one reason JSON remains the safer wire format even when the final destination is YAML: convert through JSON and every type has been forced into the open.",
          ],
        },
        {
          heading: "A conversion workflow that stays local",
          paragraphs: [
            "Configuration files are among the most sensitive text a project owns: Kubernetes secrets (even base64-encoded), docker-compose environment blocks, CI variables. Pasting them into a converter that ships input to a server would leak them to whoever runs it. Everything here runs in your browser — no upload, no logging, and the page keeps working offline once loaded.",
            "The practical workflow the tool is built around is directional chaining: convert JSON to YAML, tweak a line or two by hand, then swap direction and convert back to JSON to validate that your edit still parses. Bad indentation and forbidden tabs are reported at the offending line rather than as a generic failure, so a hand-edited manifest can be proofread in seconds.",
            "Pair this tool with the JSON formatter and JSON validator when debugging: format the JSON side for readability, validate it before conversion, and use the YAML output directly as your config file — it comes out in block style, indented like a hand-written manifest rather than a machine dump.",
          ],
        },
      ],
    },
    zh: {
      name: "JSON ⇄ YAML 转换",
      tagline: "JSON 与 YAML 双向互转——配置文件即用,支持方向切换接力,报错精确到问题所在。",
      intro: [
        "JSON 与 YAML 双向转换:粘贴 JSON 得到干净的 2 空格 YAML 配置;粘贴 YAML 得到 JSON。交换按钮直接翻转方向,一个面板完成往返。",
        "由 js-yaml 驱动,报错精确——YAML 里的 tab 缩进或 JSON 重复键都会明确指出问题,而不是一句晦涩的失败。",
      ],
      steps: [
        "按方向粘贴 JSON 或 YAML。",
        "点击转换,结果显示在下方。",
        "用交换按钮翻转方向继续转换。",
      ],
      faqs: [
        {
          q: "支持哪些 YAML 特性?",
          a: "js-yaml 标准核心模式:嵌套映射、序列、标量、引号字符串。YAML 锚点和自定义标签为保证往返可靠不在范围内。",
        },
        {
          q: "为什么转换失败了?",
          a: "最常见是 YAML 缩进里用了 tab(缩进禁止 tab)或 JSON 有重复键。错误信息会指出具体问题。",
        },
      ],
      deepDive: [
        {
          heading: "JSON 和 YAML 为什么注定无法无损往返",
          paragraphs: [
            "JSON 和 YAML 不是同一数据模型的两种写法——YAML 的野心是超集。YAML 携带 JSON 无处安放的信息:锚点和别名让一个节点被多处引用,多个文档可以用 --- 分隔共存于一个文件,自定义标签可以把值标记为时间戳、二进制或领域类型。只按 JSON 建模的转换器对这些无能为力。",
            "本工具刻意限定在核心模式——嵌套映射、序列、标量——所以它输出的任何内容都能无损解析回来。锚点被有意排除:把使用别名的 YAML 转成 JSON,就必须把每个引用内联展开,再转回去永远无法还原原始的锚点结构。",
            "多文档文件同理。一个含多个 --- 分隔文档的 .yaml 实际上是文件列表,不是一个对象;只转换第一个文档或偷偷合并都会破坏语义。一次喂一个文档,往返就始终精确。",
          ],
        },
        {
          heading: "YAML 1.1 留下的类型陷阱",
          paragraphs: [
            "YAML 解析器靠“看”来决定标量的类型。在大多数解析器仍默认的 1.1 旧规则里,裸写的 Norway 是布尔 false(它是 N-o-r-w-a-y 的缩写,归入 yes/no/on/off 一族),1.20 这类版本号可能塌缩成 1.2,前面带空格的键干脆丢失。这些不是奇技淫巧的边缘情况——它们每年都在弄坏真实的 CI 配置。",
            "经典的安全事故是挪威的国家码:用户资料里国家字段写 NO,解析后变成 false。防御手段是加引号——值表示文本而非类型时,把 \"NO\"、\"on\"、\"1.0\" 都写成字符串。你在本页粘贴 YAML 转成 JSON 时,由 js-yaml 的核心模式决定这些类型推断,JSON 输出会把推断结果显式呈现出来,方便你一眼揪出问题。",
            "JSON 的优势是没有这套猜测:每个值必须在结构上声明类型——带引号的 \"false\" 是字符串,2.0 是数字。这也是 JSON 即使终点是 YAML 也更安全的原因之一:经由 JSON 转换,每个类型都被迫现身。",
          ],
        },
        {
          heading: "留在本地的转换工作流",
          paragraphs: [
            "配置文件是项目里最敏感的文本之一:Kubernetes 密钥(哪怕是 base64 编码的)、docker-compose 的环境变量块、CI 变量。把它们贴给一个会把输入上传到服务器的转换器,等于把秘密交给服务器的主人。这里的一切都在浏览器内运行——不上传、不留日志,页面加载后离线也能用。",
            "本工具围绕的实际工作流是方向接力:JSON 转 YAML,手动改一两行,再翻转方向转回 JSON,验证改动仍然能解析。缩进错误和禁用的 tab 会精确报到出错的行,而不是一句笼统的失败,手改过的清单几秒钟就能校读完。",
            "调试时可以搭配 JSON 格式化和 JSON 校验工具:先把 JSON 侧格式化提高可读性,转换前先校验,YAML 输出直接当配置文件用——输出是块状风格,缩进像手写的清单,而不是机器吐出来的堆。",
          ],
        },
      ],
    },
    ja: {
      name: "JSON ⇄ YAML 変換",
      tagline: "JSON と YAML の双方向変換——設定ファイルそのまま、方向スワップで往復、エラーは箇所まで特定。",
      intro: [
        "JSON と YAML の双方向変換:JSON を貼れば 2 スペースインデントのきれいな YAML に。YAML を貼れば JSON に。スワップボタンで方向を反転し、1 パネルで往復できます。",
        "js-yaml 搭載でエラーも正確——YAML のタブインデントや JSON の重複キーを曖昧な失敗ではなく具体的に指摘します。",
      ],
      steps: [
        "方向に応じて JSON か YAML を貼り付け。",
        "変換をクリック——下に出力。",
        "スワップボタンで逆方向へ継続。",
      ],
      faqs: [
        {
          q: "対応する YAML 機能は?",
          a: "js-yaml のコア スキーマ:ネスト マップ、シーケンス、スカラー、引用文字列。アンカーやカスタムタグは確実な往復のため対象外です。",
        },
        {
          q: "変換が失敗するのは?",
          a: "多くは YAML インデントのタブ(インデントにタブは禁止)か JSON の重複キーです。エラー メッセージが問題箇所を示します。",
        },
      ],
      deepDive: [
        {
          heading: "JSON と YAML が完全な往復をできない理由",
          paragraphs: [
            "JSON と YAML は同じデータモデルの別表記ではありません——YAML は意図がスーパーセットです。YAML には JSON に置き場所がない情報があります。アンカーとエイリアスは一つのノードを複数箇所から参照でき、--- で区切れば複数ドキュメントを一つのファイルに収められ、カスタムタグは値をタイムスタンプやバイナリ、独自の型として印付けられます。JSON だけでモデル化する変換器は、これらを忠実に表現できません。",
            "本ツールは意図的にコア スキーマ——ネスト マップ、シーケンス、スカラー——に限定しています。これにより出力されたものはすべてロスなく解析し直せます。アンカーは意図的に対象外です。エイリアスを使った YAML を JSON に変換するには全参照をインライン展開するしかなく、逆変換では元のアンカー構造は二度と復元できません。",
            "マルチドキュメントも同様です。--- で複数ドキュメントを含む .yaml は実質ファイルのリストであり、一つのオブジェクトではありません。最初のドキュメントだけを黙って変換したり勝手にマージしたりすると意味が壊れます。一つずつ入力すれば、往復は常に正確です。",
          ],
        },
        {
          heading: "YAML 1.1 が残した型推論の落とし穴",
          paragraphs: [
            "YAML パーサーはスカラーの型を目で判断します。多くのパーサーがデフォルトとする 1.1 の旧規則では、裸の Norway はブールの false(N-o-r-w-a-y の頭字語で yes/no/on/off の一族)、1.20 のようなバージョン番号は 1.2 に潰れ、先頭にスペースのあるキーは丸ごと失われがちです。奇妙なエッジケースではなく、毎年実際の CI 設定を壊しています。",
            "古典的な安全インシデントはノルウェーの国コードです。ユーザーの国フィールドの NO が、パース後は false になります。防御はクォートです。値が文字列を意味するなら \"NO\"、\"on\"、\"1.0\" と文字列として書く。このページで YAML を JSON に変換すると、js-yaml のコア スキーマが型推論を行い、JSON の出力にその結果が明示されるので問題を見つけやすくなります。",
            "JSON の強みは推論がないことです。すべての値が構造で型を宣言します——引用付きの \"false\" は文字列、2.0 は数値のままです。最終地点が YAML でも、JSON 経由で変換すれば全ての型が強制的に可視化される——これが JSON がより安全なデータ形式であり続ける理由の一つです。",
          ],
        },
        {
          heading: "ローカルに留まる変換ワークフロー",
          paragraphs: [
            "設定ファイルはプロジェクトの最も機密性の高いテキストです。Kubernetes のシークレット(base64 であれ)、docker-compose の環境変数ブロック、CI 変数。入力をサーバーへ送る変換器に貼り付ければ、秘密はサーバー運営者の手に渡ります。ここではすべてがブラウザ内で動きます——アップロードもログもなく、ページを読み込めばオフラインでも使えます。",
            "このツールが想定する実務フローは方向チェーンです。JSON を YAML に変換し、手で一行か二行直し、方向をスワップして JSON に戻す——編集がまだ解析できるかを検証します。不正なインデントも禁じられたタブも、曖昧な失敗ではなく問題の行を正確に指摘するので、手編集したマニフェストを数秒で校正できます。",
            "デバッグには JSON フォーマッターと JSON バリデーターを併用してください。JSON 側を読みやすく整形し、変換前に検証し、YAML の出力をそのまま設定ファイルに。出力はブロック スタイルで、機械的な塊ではなく手書きマニフェストのようなインデントです。",
          ],
        },
      ],
    },
    es: {
      name: "Convertidor JSON ⇄ YAML",
      tagline: "Convierte JSON a YAML y viceversa — listo para archivos de configuración, con cambio de dirección y errores precisos.",
      intro: [
        "Conversión bidireccional entre JSON y YAML: pega JSON y obtén YAML limpio de 2 espacios; pega YAML y obtén JSON. El botón de intercambio invierte la dirección para ida y vuelta en un panel.",
        "Impulsado por js-yaml con errores precisos: un tabulador en la indentación o claves duplicadas se señalan exactamente.",
      ],
      steps: [
        "Pega JSON o YAML según la dirección.",
        "Pulsa convertir — la salida aparece abajo.",
        "Usa el botón de intercambio para seguir en la otra dirección.",
      ],
      faqs: [
        {
          q: "¿Qué funciones YAML soporta?",
          a: "El esquema core de js-yaml: mapas anidados, secuencias, escalares, cadenas entrecomilladas. Anclas y etiquetas personalizadas quedan fuera para garantizar ida y vuelta fiable.",
        },
        {
          q: "¿Por qué falló mi conversión?",
          a: "Lo más común: un tabulador en la indentación YAML (prohibido) o claves duplicadas en JSON. El mensaje señala el problema.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué JSON y YAML nunca harán un round-trip perfecto",
          paragraphs: [
            "JSON y YAML no son dos escrituras del mismo modelo de datos — YAML aspira a ser un superconjunto. YAML porta información para la que JSON no tiene hueco: anclas y alias permiten que un nodo se referencie desde varios sitios, varios documentos caben en un archivo separados por ---, y etiquetas personalizadas pueden marcar un valor como timestamp, binario o tipo específico de dominio. Un convertidor que solo modela JSON no puede representar nada de eso fielmente.",
            "Esta herramienta se limita a propósito al esquema core — mapas anidados, secuencias y escalares — así que todo lo que emite se puede volver a parsear sin pérdidas. Las anclas quedan fuera deliberadamente: convertir un YAML con alias a JSON obligaría a expandir cada referencia en línea, y al volver atrás nunca se recuperaría la estructura original de anclas.",
            "Lo mismo aplica a archivos multi-documento. Un .yaml con varios documentos separados por --- es en realidad una lista de archivos, no un objeto; convertir solo el primero o fusionarlos en silencio corrompe el significado. Alimenta la herramienta de un documento en cada pasada y el round-trip seguirá siendo exacto.",
          ],
        },
        {
          heading: "Las trampas de tipos que dejó YAML 1.1",
          paragraphs: [
            "Los parsers de YAML deciden el tipo de un escalar mirándolo. En las reglas antiguas de 1.1, que la mayoría de parsers aún usan por defecto, la palabra Norway es un booleano false (un acrónimo de N-o-r-w-a-y, de la familia yes/no/on/off), números de versión como 1.20 pueden colapsar a 1.2, y una clave con un espacio inicial se pierde con facilidad. No son casos raros — rompen configuraciones de CI reales todos los años.",
            "El incidente clásico de seguridad es el código de país de Noruega: un campo país con el valor NO se convierte en false al parsear. La defensa son las comillas — escribe \"NO\", \"on\", \"1.0\" como cadenas siempre que el valor sea texto y no un tipo. Cuando pegas YAML aquí y conviertes a JSON, el esquema core de js-yaml decide esas coerciones, y la salida JSON hace visibles los tipos resultantes para que los detectes.",
            "La ventaja de JSON es que no adivina nada: cada valor declara su tipo estructuralmente — \"false\" entre comillas es una cadena, 2.0 sigue siendo número. Por eso JSON sigue siendo el formato de intercambio más seguro aunque el destino final sea YAML: convertir vía JSON obliga a que cada tipo salga a la luz.",
          ],
        },
        {
          heading: "Un flujo de conversión que se queda local",
          paragraphs: [
            "Los archivos de configuración están entre los textos más sensibles de un proyecto: secretos de Kubernetes (aunque estén en base64), bloques de entorno de docker-compose, variables de CI. Pegarlos en un convertidor que envía la entrada a un servidor los filtraría a quien lo opere. Todo aquí corre en tu navegador — sin subida, sin registros, y la página funciona sin conexión una vez cargada.",
            "El flujo práctico para el que está pensada la herramienta es el encadenado direccional: convierte JSON a YAML, ajusta una o dos líneas a mano, cambia de dirección y convierte de vuelta a JSON para validar que tu edición aún parsea. Indentaciones erróneas y tabuladores prohibidos se reportan en la línea exacta, no como un fallo genérico, así que puedes corregir un manifiesto editado a mano en segundos.",
            "Combina esta herramienta con el formateador y el validador JSON al depurar: formatea el lado JSON para leerlo mejor, valídalo antes de convertir, y usa la salida YAML directamente como archivo de configuración — sale en estilo bloque, indentada como un manifiesto escrito a mano y no como un volcado de máquina.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor JSON ⇄ YAML",
      tagline: "Converta JSON para YAML e vice-versa — pronto para arquivos de configuração, com troca de direção e erros precisos.",
      intro: [
        "Conversão bidirecional entre JSON e YAML: cole JSON e receba YAML limpo com 2 espaços; cole YAML e receba JSON. O botão de troca inverte a direção para ir e voltar num painel só.",
        "Powered by js-yaml com erros precisos — um tab na indentação ou chaves duplicadas são apontados exatamente.",
      ],
      steps: [
        "Cole JSON ou YAML conforme a direção.",
        "Clique em converter — a saída aparece abaixo.",
        "Use o botão de troca para continuar na outra direção.",
      ],
      faqs: [
        {
          q: "Quais recursos YAML são suportados?",
          a: "O esquema core do js-yaml: mapas aninhados, sequências, escalares, strings entre aspas. Âncoras e tags personalizadas ficam de fora para garantir ida e volta confiável.",
        },
        {
          q: "Por que minha conversão falhou?",
          a: "Na maioria das vezes é um tab na indentação YAML (proibido) ou chaves duplicadas no JSON. A mensagem aponta o problema.",
        },
      ],
      deepDive: [
        {
          heading: "Por que JSON e YAML nunca farão um round-trip perfeito",
          paragraphs: [
            "JSON e YAML não são duas escritas do mesmo modelo de dados — o YAML aspira a ser um superconjunto. O YAML carrega informação para a qual o JSON não tem espaço: âncoras e alias permitem que um nó seja referenciado de vários lugares, vários documentos cabem num arquivo separados por ---, e tags personalizadas podem marcar um valor como timestamp, binário ou tipo específico do domínio. Um conversor que só modela JSON não representa nada disso fielmente.",
            "Esta ferramenta se limita de propósito ao esquema core — mapas aninhados, sequências e escalares — de modo que tudo o que ela emite pode ser reparseado sem perdas. Âncoras ficam de fora deliberadamente: converter um YAML com alias para JSON obrigaria a expandir cada referência em linha, e ao voltar nunca se recuperaria a estrutura original de âncoras.",
            "O mesmo vale para arquivos multi-documento. Um .yaml com vários documentos separados por --- é na verdade uma lista de arquivos, não um objeto; converter só o primeiro ou fundi-los em silêncio corrompe o significado. Alimente a ferramenta um documento por vez e o round-trip permanece exato.",
          ],
        },
        {
          heading: "As armadilhas de tipos que o YAML 1.1 deixou",
          paragraphs: [
            "Os parsers de YAML decidem o tipo de um escalar olhando para ele. Nas regras antigas do 1.1, que a maioria dos parsers ainda usa por padrão, a palavra Norway é um booleano false (acrônimo de N-o-r-w-a-y, da família yes/no/on/off), números de versão como 1.20 podem colapsar para 1.2, e uma chave com espaço inicial se perde com facilidade. Não são casos exóticos — quebram configurações reais de CI todos os anos.",
            "O incidente clássico de segurança é o código de país da Noruega: um campo país com valor NO se torna false ao parsear. A defesa são as aspas — escreva \"NO\", \"on\", \"1.0\" como strings sempre que o valor for texto e não um tipo. Quando você cola YAML aqui e converte para JSON, o esquema core do js-yaml decide essas coerções, e a saída JSON deixa os tipos resultantes visíveis para você pegá-los.",
            "A vantagem do JSON é que ele não adivinha nada: cada valor declara seu tipo estruturalmente — \"false\" entre aspas é uma string, 2.0 continua número. Por isso o JSON segue sendo o formato de troca mais seguro mesmo quando o destino final é YAML: converter via JSON força cada tipo a sair à luz.",
          ],
        },
        {
          heading: "Um fluxo de conversão que fica local",
          paragraphs: [
            "Arquivos de configuração estão entre os textos mais sensíveis de um projeto: segredos do Kubernetes (mesmo em base64), blocos de ambiente do docker-compose, variáveis de CI. Colá-los num conversor que envia a entrada a um servidor vazaria tudo para quem opera o servidor. Tudo aqui roda no seu navegador — sem upload, sem logs, e a página funciona offline depois de carregada.",
            "O fluxo prático para o qual a ferramenta foi pensada é o encadeamento direcional: converta JSON para YAML, ajuste uma ou duas linhas à mão, troque a direção e converta de volta para JSON para validar que sua edição ainda parseia. Indentação errada e tab proibido são reportados na linha exata, não como uma falha genérica, então dá para revisar um manifesto editado à mão em segundos.",
            "Combine esta ferramenta com o formatador e o validador JSON ao depurar: formate o lado JSON para legibilidade, valide antes de converter, e use a saída YAML direto como arquivo de configuração — ela sai em estilo bloco, indentada como um manifesto escrito à mão, não como um despejo de máquina.",
          ],
        },
      ],
    },
  },
});
