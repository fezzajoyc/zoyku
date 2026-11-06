import { DevEngineJsonPlus } from "../_engines/dev-engine-jsonplus";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "json-to-typescript",
  category: "developer",
  icon: "code",
  
  engine: { component: DevEngineJsonPlus, props: { mode: "to-ts" } },
  related: ["json-formatter", "json-validator", "json-diff", "json-path-query", "json-yaml-converter", "md5-generator", "sha256-generator", "base64-image", "url-encoder", "html-minifier"],
  copy: {
    en: {
      name: "JSON to TypeScript",
      tagline: "Generate TypeScript interfaces from any JSON — nested objects, arrays and unions, ready to paste into your project.",
      intro: [
        "Building a typed API client: paste a sample response from your endpoint and copy out ready-to-use TypeScript interfaces instead of hand-transcribing dozens of nested fields. The output drops straight into a .ts file and compiles as-is.",
        "Nested objects become named interfaces, arrays of objects merge into one shape, and mixed arrays become union types — the same collapse a human reviewer would perform. The root interface name is configurable so it fits your codebase naming.",
        "The mapper runs entirely in the browser and emits standard TypeScript syntax (interface declarations over string, number, boolean and null), with no helper runtime or external dependency, so output works on any modern compiler.",
        "Where general generators like quicktype target a dozen languages at once, this tool answers the narrow question fast: what does this payload look like as types? Pair it with the compiler — excess-property and null checks then catch API shape drift the moment the backend changes."
      ],
      steps: [
        "Paste your JSON (an API response works best).",
        "Set the root interface name if you want something other than Root.",
        "Copy the generated interfaces into your project.",
      ],
      faqs: [
        {
          q: "How are arrays handled?",
          a: "Arrays of objects merge every element's keys into one interface (missing keys would be a type error at runtime anyway). Mixed-type arrays become a union type like string | number. Empty arrays degrade to unknown[].",
        },
        {
          q: "Are all fields required?",
          a: "Yes — a single sample can't prove optionality, so everything is required. Mark fields optional yourself where your API allows null or missing keys.",
        },
      ],
      deepDive: [
        {
          heading: "What type inference from a sample can and cannot tell you",
          paragraphs: [
            "Generating types from a JSON sample is deduction from one data point, and it is honest to know where that deduction stops. Anything the sample shows can be typed faithfully: nested objects become named interfaces, arrays of objects merge their keys into one shape, and mixed-type arrays become unions like string | number. But anything the sample does not show is invisible — a field that is null in the payload looks like null, while a field that would sometimes be missing looks required, because absence cannot appear in a single observation.",
            "The consequence is that the output is a starting point, not a contract. Real API payloads drift: a field typed as string may occasionally return null, an object may be absent on error responses, and an array that happened to hold one element is not proof it always will. The pragmatic workflow is to generate the types, then relax the fields you know are nullable or optional with a ? or a null union — a few minutes of manual review beats compiler errors in production.",
            "Union types are another honest boundary. If two array elements have different shapes, merging every key into one interface (all optional) or emitting a union are both defensible; this tool merges, which matches how a human reviewer usually collapses example payloads but can hide keys that never co-occur. When precision matters, JSON Schema or a discriminated union written by hand is the stronger tool — codegen covers the 90% case fast, and you tighten the rest.",
          ],
        },
        {
          heading: "Why typed API clients catch drift earlier",
          paragraphs: [
            "The real value of generated interfaces appears after you paste them: the compiler becomes a shape checker for every call site. If the backend renames a field, splits an object or narrows a value to null, TypeScript flags the accesses that no longer match — excess-property checks catch typos in object literals, and strictNullChecks forces every potentially-absent field to be handled. A sample-to-types loop turns “the API changed silently” into a build error with a file and line number.",
            "This is why the tool emits plain interface declarations with no runtime helpers: types exist only at compile time, so the output adds zero bytes to your bundle and works with any modern compiler and any bundler. There is nothing to import, configure or version-lock — delete the types and your runtime code is untouched.",
          ],
        },
        {
          heading: "Local generation and how this compares with heavier tools",
          paragraphs: [
            "Paste a sample response and the interfaces are generated in your browser — the JSON never leaves your device. That matters because the payloads you most want to type are often the sensitive ones: authenticated API responses, internal admin endpoints, customer records or staging data with real emails in them. Sending those to a web service to be converted defeats the care you took keeping them out of logs.",
            "General-purpose generators like quicktype target a dozen languages, JSON Schema and runtime validators, and are the right choice for a large API surface governed from one source of truth. This tool answers the narrow question fast: what does this one payload look like as types? Combined with the privacy of local generation, it fits the everyday loop of inspecting an endpoint and getting a typed client stub in seconds.",
          ],
        },
      ],
    },
    zh: {
      name: "JSON 转 TypeScript",
      tagline: "从任意 JSON 生成 TypeScript 接口——嵌套对象、数组和联合类型一次生成,直接粘进项目。",
      intro: [
        "粘贴接口返回的 JSON,立刻得到类型定义:嵌套对象生成命名 interface,对象数组合并为一个形状,混合数组生成联合类型。根接口名可自定义。",
        "为接口开发而生——粘上响应、复制类型,剩下的交给编译器帮你盯字段变更。",
      ],
      steps: [
        "粘贴 JSON(接口响应最合适)。",
        "需要时修改根接口名(默认 Root)。",
        "复制生成的类型定义到项目里。",
      ],
      faqs: [
        {
          q: "数组怎么处理?",
          a: "对象数组会把所有元素的键合并成一个 interface(少键的情况运行时本来就是隐患)。混合类型数组生成 string | number 这样的联合类型。空数组降级为 unknown[]。",
        },
        {
          q: "所有字段都是必填?",
          a: "是——单个样本无法证明可选性,所以全部必填。API 允许 null 或缺省的字段请自行标记 ?。",
        },
      ],
      deepDive: [
        {
          heading: "从样本推导类型,能推到哪一步",
          paragraphs: [
            "从一份 JSON 样本生成类型,本质是拿一个数据点做演绎,这条演绎的边界值得说清楚。样本里出现的东西都能忠实映射:嵌套对象生成命名 interface,对象数组把所有元素的键合并成一个形状,混合类型数组生成 string | number 这样的联合类型。但样本里没出现的东西是推不出来的——载荷里是 null 的字段会被推断成 null;“有时会缺失”的字段看起来是必填,因为缺席无法在单次观察里出现。",
            "所以输出应当看作起点而不是契约。真实接口的载荷会漂移:推断为 string 的字段偶尔会返回 null,出错响应里对象可能整个缺失,恰好只有一个元素的数组也不代表永远只有一个元素。务实的流程是先生成类型,再把已知的可空或可选字段用 ? 或 null 联合手工放宽——几分钟的人工审查,好过上线后到处是编译报错。",
            "联合类型是另一条诚实的边界。数组里两个元素形状不同,把所有键合并成一个 interface(全可选)和生成联合类型都说得通;本工具选择合并——这与人工审阅样本时的归并习惯一致,但可能掩盖“从不共存”的键。需要更精确的模型时,JSON Schema 或手写的可辨识联合是更强的工具;代码生成负责快速覆盖九成场景,剩下的自己收紧。",
          ],
        },
        {
          heading: "为什么带类型的客户端能更早发现接口漂移",
          paragraphs: [
            "生成的 interface 真正的价值在粘贴之后:编译器从此兼任每次调用的形状检查器。后端一旦改字段名、拆对象或把值收窄为 null,TypeScript 会标记所有不再匹配的访问点——对象字面量里的拼写错误被多余属性检查抓住,strictNullChecks 强制你处理每个可能缺席的字段。“接口悄悄变了”从此变成一条带文件名和行号的编译错误。",
            "这也是为什么输出是纯 interface 声明、不带任何运行时辅助代码:类型只存在于编译期,产物零字节进入打包结果,任何现代编译器、任何打包器都能直接用。没有需要 import 的东西,没有配置,没有版本锁定——删掉这些类型,运行时代码毫发无损。",
          ],
        },
        {
          heading: "本地生成,以及与更重的工具相比",
          paragraphs: [
            "粘贴样本响应,接口就在你的浏览器里生成——JSON 不离开设备。这一点比看起来重要:你最想生成类型的载荷往往正是敏感的那批,带鉴权的 API 响应、内部管理端点、含真实邮箱的客户数据或预发环境数据。为了转换把它们交给某个在线服务,等于亲手毁掉你让它们不进日志的努力。",
            "quicktype 这类通用生成器面向十几种语言、JSON Schema 和运行时校验器,适合用单一事实来源治理大型 API 面;本工具回答的是一个更窄的问题,但快:这一份载荷用类型写出来长什么样?加上本地生成的隐私保障,它正好嵌进日常循环——打开一个端点,几秒钟拿到带类型的客户端桩代码。",
          ],
        },
      ],
    },
    ja: {
      name: "JSON → TypeScript",
      tagline: "任意の JSON から TypeScript interface を生成——ネスト・配列・ユニオン対応,プロジェクトにそのまま貼付。",
      intro: [
        "API レスポンスの JSON を貼り付けると、即座に型定義を生成:ネストしたオブジェクトは命名 interface、オブジェクト配列は 1 つの形状にマージ、混合配列はユニオン型。ルート名は変更可能。",
        "API 開発向け——レスポンスを貼って型をコピーすれば、形状の変化はコンパイラが検出します。",
      ],
      steps: [
        "JSON を貼り付け(API レスポンスが最適)。",
        "必要ならルート interface 名を変更。",
        "生成された型をプロジェクトにコピー。",
      ],
      faqs: [
        {
          q: "配列の扱いは?",
          a: "オブジェクト配列は全要素のキーを 1 つの interface にマージします。混合型の配列は string | number のようなユニオン型に。空配列は unknown[] になります。",
        },
        {
          q: "全フィールドが必須?",
          a: "はい。単一サンプルでは任意性を証明できないため必須に。null や欠席を許すフィールドは手動で ? を付けてください。",
        },
      ],
      deepDive: [
        {
          heading: "サンプルからの型推論はどこまで届くか",
          paragraphs: [
            "JSON サンプルから型を生成するのは、1 つのデータポイントからの演繹です。その演繹が止まる場所を知っておくことが大切です。サンプルに現れたものは忠実に型付けできます。ネストしたオブジェクトは命名 interface に、オブジェクト配列は全要素のキーを 1 つの形状にマージ、混合型配列は string | number のようなユニオン型になります。しかしサンプルに現れていないものは見えません。ペイロードで null になっているフィールドは null に推論され、「時に欠席する」フィールドは必須に見えます。欠席は 1 回の観測には現れないからです。",
            "つまり出力は契約ではなく出発点です。実際の API はドリフトします。string と推論したフィールドが時々 null を返す、エラーレスポンスではオブジェクトごと欠ける、要素 1 個の配列が常に 1 個とは限らない。実務的な流れは、生成した型のうち null 許容や任意と分かっているフィールドに ? や null ユニオンで手動に緩みを入れることです。数分の手見直しが、本番でのコンパイルエラーより安いです。",
            "ユニオン型も誠実な境界線です。配列の 2 要素の形状が違うとき、全キーを 1 つの interface にマージする(すべて任意)のとユニオン型を出すのはどちらも正当です。このツールはマージします。人がサンプルを整理する流儀に近い一方、「決して同時に現れないキー」を隠す可能性はあります。精度が要るなら JSON Schema や手書きの判別ユニオンのほうが強い。コード生成は 9 割を速く、残りは自分で引き締める分担です。",
          ],
        },
        {
          heading: "型付きクライアントがドリフトを早く捉える理由",
          paragraphs: [
            "生成した interface の真の価値は貼り付けた後に出ます。コンパイラがすべての呼び出し箇所の形状チェッカーになります。バックエンドがフィールド名を変え、オブジェクトを分割し、値を null に狭めると、TypeScript は一致しなくなったアクセスをすべて指摘します。オブジェクトリテラルのタイプミスは過剰プロパティチェックが捉え、strictNullChecks は欠席しうるフィールドの扱いを強制します。「API が黙って変わった」が、ファイル名と行番号つきのビルドエラーに変わります。",
            "だから出力はランタイムヘルパーなしの素の interface 宣言です。型はコンパイル時にしか存在しないので、出力はバンドルに 0 バイトも加えず、モダンなコンパイラとバンドラなら何でも通ります。import も設定もバージョン固定も不要で、型を消してもランタイムコードは無傷です。",
          ],
        },
        {
          heading: "ローカル生成、および重いツールとの比較",
          paragraphs: [
            "サンプルレスポンスを貼り付けると、interface はブラウザ内で生成されます。JSON は端末の外に出ません。これが重要なのは、型を付けたくなるペイロードほど敏感なものだからです。認証付き API のレスポンス、内部管理エンドポイント、実メールを含む顧客データ、ステージングのデータ。変換のためにそれらをオンラインサービスへ送るのは、ログに入れないようにした努力を自分で手放すことになります。",
            "quicktype のような総合ジェネレーターは十数言語、JSON Schema、ランタイムバリデータを対象にし、単一の真実源で大きな API 面を統制する場合に適します。このツールはもっと狭い問いに速く答えます。この 1 つのペイロードは型にするとどんな形か。ローカル生成のプライバシーと合わせて、「エンドポイントを見て数秒で型付きスタブ」という日常のループに収まります。",
          ],
        },
      ],
    },
    es: {
      name: "JSON a TypeScript",
      tagline: "Genera interfaces de TypeScript desde cualquier JSON — objetos anidados, arrays y uniones, listas para pegar.",
      intro: [
        "Pega una respuesta JSON y obtén interfaces tipadas al instante: los objetos anidados se convierten en interfaces con nombre, los arrays de objetos se fusionan en una forma, los arrays mixtos se vuelven uniones. El nombre raíz es configurable.",
        "Pensado para trabajo con APIs: pega una respuesta, copia los tipos y deja que el compilador vigile los cambios de forma.",
      ],
      steps: [
        "Pega tu JSON (una respuesta de API funciona bien).",
        "Cambia el nombre de la interfaz raíz si quieres otro distinto de Root.",
        "Copia las interfaces generadas a tu proyecto.",
      ],
      faqs: [
        {
          q: "¿Cómo se manejan los arrays?",
          a: "Los arrays de objetos fusionan las claves de todos los elementos en una interfaz. Los arrays de tipos mixtos se convierten en uniones como string | number. Los arrays vacíos degradan a unknown[].",
        },
        {
          q: "¿Todos los campos son obligatorios?",
          a: "Sí: una sola muestra no prueba opcionalidad, así que todo es requerido. Marca tú los campos opcionales donde tu API lo permita.",
        },
      ],
      deepDive: [
        {
          heading: "Hasta dónde llega la inferencia de tipos desde una muestra",
          paragraphs: [
            "Generar tipos desde una muestra de JSON es deducir a partir de un solo dato, y conviene saber dónde se detiene esa deducción. Todo lo que la muestra muestra se tipa con fidelidad: los objetos anidados se vuelven interfaces con nombre, los arrays de objetos fusionan sus claves en una sola forma y los arrays de tipos mixtos se vuelven uniones como string | number. Pero lo que la muestra no enseña es invisible: un campo que es null en el payload se tipa como null, y un campo que a veces falta parece obligatorio, porque la ausencia no aparece en una sola observación.",
            "La consecuencia es que la salida es un punto de partida, no un contrato. Los payloads reales se desvían: un campo tipado como string puede devolver null a veces, un objeto puede ausentarse en las respuestas de error y un array que contenía un elemento no prueba que siempre tenga uno. El flujo pragmático es generar los tipos y relajar tú mismo los campos que sabes anulables u opcionales con un ? o una unión con null — unos minutos de revisión manual valen menos que errores del compilador en producción.",
            "Los tipos unión son otra frontera honesta. Si dos elementos de un array tienen formas distintas, fusionar todas las claves en una interfaz (todas opcionales) o emitir una unión son ambos defendibles; esta herramienta fusiona, que es como suele colapsar un revisor humano los payloads de ejemplo, pero puede ocultar claves que nunca coexisten. Cuando importa la precisión, un JSON Schema o una unión discriminada escrita a mano son herramientas más fuertes — el codegen cubre rápido el 90% y tú aprietas el resto.",
          ],
        },
        {
          heading: "Por qué un cliente tipado detecta el desvío antes",
          paragraphs: [
            "El valor real de las interfaces generadas aparece después de pegarlas: el compilador se convierte en un verificador de formas para cada punto de llamada. Si el backend renombra un campo, parte un objeto o estrecha un valor a null, TypeScript señala los accesos que ya no encajan — la comprobación de propiedades excedentes caza erratas en literales de objeto y strictNullChecks obliga a manejar cada campo potencialmente ausente. El bucle de muestra-a-tipos convierte “la API cambió en silencio” en un error de compilación con archivo y línea.",
            "Por eso la salida son declaraciones interface planas sin helpers de ejecución: los tipos solo existen en tiempo de compilación, así que el resultado añade cero bytes al bundle y funciona con cualquier compilador moderno y cualquier bundler. Nada que importar, configurar ni fijar por versión — borra los tipos y tu código en ejecución queda intacto.",
          ],
        },
        {
          heading: "Generación local y comparación con herramientas más pesadas",
          paragraphs: [
            "Pega una respuesta de ejemplo y las interfaces se generan en tu navegador — el JSON nunca sale de tu dispositivo. Importa más de lo que parece, porque los payloads que más quieres tipar suelen ser los sensibles: respuestas de APIs autenticadas, endpoints internos de administración, registros de clientes o datos de staging con correos reales. Enviarlos a un servicio web para convertirlos deshace el cuidado de mantenerlos fuera de los logs.",
            "Generadores de propósito general como quicktype apuntan a una docena de lenguajes, JSON Schema y validadores en ejecución, y son la elección correcta para una superficie de API grande regida desde una única fuente de verdad. Esta herramienta responde rápido la pregunta estrecha: ¿cómo queda este payload como tipos? Con la privacidad de la generación local, encaja en el bucle cotidiano de mirar un endpoint y obtener un stub tipado en segundos.",
          ],
        },
      ],
    },
    pt: {
      name: "JSON para TypeScript",
      tagline: "Gere interfaces TypeScript a partir de qualquer JSON — objetos aninhados, arrays e uniões, prontos para colar.",
      intro: [
        "Cole uma resposta JSON e receba interfaces tipadas na hora: objetos aninhados viram interfaces nomeadas, arrays de objetos se fundem numa forma, arrays mistos viram uniões. O nome da raiz é configurável.",
        "Feito para trabalho com APIs: cole uma resposta, copie os tipos e deixe o compilador vigiar mudanças de forma.",
      ],
      steps: [
        "Cole seu JSON (uma resposta de API funciona bem).",
        "Defina o nome da interface raiz se quiser algo além de Root.",
        "Copie as interfaces geradas para o projeto.",
      ],
      faqs: [
        {
          q: "Como os arrays são tratados?",
          a: "Arrays de objetos fundem as chaves de todos os elementos numa interface. Arrays de tipos mistos viram uniões como string | number. Arrays vazios degradam para unknown[].",
        },
        {
          q: "Todos os campos são obrigatórios?",
          a: "Sim — uma amostra única não prova opcionalidade, então tudo é requerido. Marque campos opcionais onde sua API permitir.",
        },
      ],
      deepDive: [
        {
          heading: "Até onde vai a inferência de tipos a partir de uma amostra",
          paragraphs: [
            "Gerar tipos a partir de uma amostra de JSON é deduzir a partir de um único ponto de dados, e é honesto saber onde essa dedução para. Tudo o que a amostra mostra pode ser tipado com fidelidade: objetos aninhados viram interfaces nomeadas, arrays de objetos fundem as chaves numa única forma, e arrays de tipos mistos viram uniões como string | number. Mas o que a amostra não mostra é invisível — um campo que é null no payload fica tipado como null, e um campo que às vezes falta parece obrigatório, porque a ausência não aparece numa única observação.",
            "A consequência é que a saída é um ponto de partida, não um contrato. Payloads reais desviam: um campo tipado como string pode às vezes retornar null, um objeto pode estar ausente nas respostas de erro, e um array que por acaso tinha um elemento não prova que sempre terá. O fluxo pragmático é gerar os tipos e relaxar você mesmo os campos que sabe serem anuláveis ou opcionais com ? ou união com null — alguns minutos de revisão manual custam menos que erros de compilação em produção.",
            "Uniões são outra fronteira honesta. Se dois elementos de um array têm formas diferentes, fundir todas as chaves numa interface (todas opcionais) ou emitir uma união são ambos defensáveis; esta ferramenta funde, que é como um revisor humano costuma colapsar payloads de exemplo, mas pode esconder chaves que nunca coexistem. Quando precisão importa, um JSON Schema ou uma união discriminada escrita à mão são ferramentas mais fortes — o codegen cobre rápido os 90% e você aperta o resto.",
          ],
        },
        {
          heading: "Por que clientes tipados detectam o desvio mais cedo",
          paragraphs: [
            "O valor real das interfaces geradas aparece depois de colá-las: o compilador vira um verificador de formas para cada ponto de chamada. Se o backend renomeia um campo, divide um objeto ou estreita um valor para null, o TypeScript aponta os acessos que não batem mais — a checagem de propriedades excedentes pega erros de digitação em literais de objeto, e o strictNullChecks obriga a tratar todo campo potencialmente ausente. O ciclo de amostra-para-tipos transforma “a API mudou em silêncio” num erro de compilação com arquivo e linha.",
            "É por isso que a saída são declarações interface simples, sem helpers de execução: os tipos só existem em tempo de compilação, então o resultado adiciona zero bytes ao bundle e funciona com qualquer compilador moderno e qualquer bundler. Nada para importar, configurar ou travar por versão — apague os tipos e seu código em execução fica intacto.",
          ],
        },
        {
          heading: "Geração local e comparação com ferramentas mais pesadas",
          paragraphs: [
            "Cole uma resposta de exemplo e as interfaces são geradas no seu navegador — o JSON nunca sai do seu dispositivo. Isso importa mais do que parece, porque os payloads que você mais quer tipar costumam ser os sensíveis: respostas de APIs autenticadas, endpoints internos de administração, registros de clientes ou dados de staging com e-mails reais. Enviá-los a um serviço na web para converter desfaz o cuidado de mantê-los fora dos logs.",
            "Geradores de propósito geral como o quicktype miram uma dúzia de linguagens, JSON Schema e validadores de runtime, e são a escolha certa para uma superfície de API grande regida por uma única fonte de verdade. Esta ferramenta responde rápido a pergunta estreita: como fica esse payload como tipos? Com a privacidade da geração local, encaixa no ciclo cotidiano de olhar um endpoint e receber um stub tipado em segundos.",
          ],
        },
      ],
    },
  },
});
