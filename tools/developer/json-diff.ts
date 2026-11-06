import { DevEngineJsonPlus } from "../_engines/dev-engine-jsonplus";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "json-diff",
  category: "developer",
  icon: "search",
  engine: { component: DevEngineJsonPlus, props: { mode: "diff" } },
  related: ["json-formatter", "json-validator", "json-to-typescript", "text-diff", "json-path-query", "md5-generator", "sha256-generator", "base64-image", "url-encoder", "html-minifier"],
  copy: {
    en: {
      name: "JSON Diff",
      tagline: "Compare two JSON documents path by path — added, removed and changed keys with before/after values, all locally.",
      intro: [
        "Paste two JSON documents and see every structural difference: keys added, keys removed, values changed — each reported by its full path like $.user.name. It is built for comparing API responses before and after a deploy, reviewing config changes between environments, and checking that a refactor kept the same payload shape.",
        "Comparison is deep and deterministic: nested objects and arrays are walked recursively, and a change buried three levels deep still shows up with its exact path plus both old and new values. Object key order is ignored — {\"a\":1,\"b\":2} equals {\"b\":2,\"a\":1} — but array element order is significant, matching how JSON consumers read indexes.",
        "Each difference is addressed by a dot path in the familiar $.a.b[0].c style, the same notation used by JSONPath queries and the operations in RFC 6902 JSON Patch — so a diff line translates directly into a test assertion or a patch operation without mental mapping.",
        "Plain text diff tools (diff, git diff) compare characters, so reordering keys or reformatting whitespace floods them with false positives. This tool compares parsed values instead, which is exactly the question a developer asks; unlike a full JSON Patch generator, it needs no schema and reports every changed leaf in one flat list.",

      ],
      steps: [
        "Paste the first JSON (the original).",
        "Paste the second JSON (the new version).",
        "Read the diff list — every line is one path-level change.",
      ],
      faqs: [
        {
          q: "How are arrays compared?",
          a: "By index: element 0 against element 0, and so on. Extra elements in either array show as added or removed at their index.",
        },
        {
          q: "Does key order matter?",
          a: "No — objects are compared by keys, not insertion order. Two documents with the same keys in different order are identical.",
        },
      ],
      deepDive: [
        {
          heading: "Semantic diff versus character diff",
          paragraphs: [
            "A character-level diff (git diff, plain text diff tools) answers “what bytes changed”, and that is almost never the question with JSON. Two API responses that differ only because one was pretty-printed with 4 spaces and the other with 2, or because an encoder reordered object keys, are semantically identical — yet a text diff shows hundreds of changed lines. This tool parses both documents first and compares the values, so formatting noise cannot produce false positives.",
            "The consequence is a deliberate asymmetry: object key order is ignored, because JSON objects are unordered maps by specification and every consumer reads them by key — {“a”:1,“b”:2} equals {“b”:2,“a”:1}. Array order, by contrast, is significant, because arrays are ordered lists and consumers read index positions; [1,2,3] versus [3,2,1] reports every element changed. Matching the semantics the consumers apply is what makes the diff output trustworthy.",
            "Each reported change carries a full dot path in the $.a.b[0].c style used by JSONPath and RFC 6902 JSON Patch. That notation is not decoration: a diff line can be turned into a test assertion (expect payload.user.role to equal “admin”) or into a patch operation without any mental translation between the diff view and the code that consumes it.",
          ],
        },
        {
          heading: "Reading the diff: added, removed, changed — and what each implies",
          paragraphs: [
            "Added keys in the new document are the ones to check for backward compatibility: an API response that gained a field is usually safe for old clients, but a configuration file that gained a key may mean a default changed somewhere. Removed keys are the opposite — they are what breaks consumers that read those fields. Changed values with both old and new shown side by side make the actual behavior delta visible, which is precisely what a code review of a config change needs and what commit messages rarely capture.",
            "Arrays are compared by index, so inserting an element in the middle of a list shifts every following index and reports a cascade of changes. If your data is conceptually a set or a keyed collection, compare it with the elements sorted or as an object keyed by ID — the diff will then show the true delta rather than the shift. That preprocessing decision belongs to the workflow, not to the tool, which is why the tool keeps the rule simple and predictable.",
            "The flat list format also works as a deploy checklist: paste the before and after of an API response, and every line is something a dependent consumer either handles or does not. Teams that snapshot API payloads before releases use exactly this loop, and doing it locally means the payloads never leave the machine.",
          ],
        },
        {
          heading: "Local comparison for payloads you cannot paste elsewhere",
          paragraphs: [
            "The documents you diff in practice are not toy samples: production API responses with user records, environment configs with credentials and internal hostnames, customer exports. Pasting either side into a random web diff service means shipping that data to a third party — the tool becomes the weakest link in the very comparison you were running to protect correctness.",
            "Everything here runs in your browser's JavaScript: parsing, the recursive walk and the path building all happen on your machine, and nothing is transmitted, stored or logged. It also works offline once loaded, which matters because diffs of environment configs tend to happen on staging boxes and VPN-restricted networks where external tools are unreachable anyway. The honest limit is browser memory — documents far into the tens of megabytes compare fine, and anything past that belongs in a scripted pipeline.",
          ],
        },
      ],
    },
    zh: {
      name: "JSON 对比",
      tagline: "逐路径对比两个 JSON——新增、删除、变更的键,带前后值,全部本地完成。",
      intro: [
        "粘贴两个 JSON,看清每一处结构差异:哪些键新增、哪些删除、哪些值变了——每条都带完整路径(如 $.user.name)。",
        "嵌套对象和数组会递归遍历,三层深处的变化也会带着精确路径和前后值显示出来。",
      ],
      steps: [
        "粘贴第一个 JSON(原始版)。",
        "粘贴第二个 JSON(新版本)。",
        "阅读差异列表——每行一个路径级变化。",
      ],
      faqs: [
        {
          q: "数组怎么比?",
          a: "按索引比:元素 0 对元素 0。某一方多出的元素会在其索引位置显示为新增或删除。",
        },
        {
          q: "键顺序有影响吗?",
          a: "没有——对象按键比较,与插入顺序无关。键相同顺序不同的两份文档视为相同。",
        },
      ],
      deepDive: [
        {
          heading: "语义对比与字符对比的区别",
          paragraphs: [
            "字符级 diff(git diff、纯文本对比工具)回答的是「哪些字节变了」,而这几乎从来不是面对 JSON 时要问的问题。两份 API 响应,一份用 4 空格缩进、另一份用 2 空格,或者编码器重排了对象键——语义上完全相同,文本 diff 却显示几百行变更。本工具先解析两份文档再比较值,格式噪音因此无法制造误报。",
            "由此带来一个刻意的非对称:对象键顺序被忽略,因为 JSON 规范里对象就是无序映射,所有消费方都按键读取——{\"a\":1,\"b\":2} 等于 {\"b\":2,\"a\":1}。数组顺序则相反,是有效的,因为数组是有序列表、消费方按索引读取;[1,2,3] 对 [3,2,1] 会报告每个元素都变了。贴合消费方实际语义,差异输出才值得信任。",
            "每条变更都带 $.a.b[0].c 风格的完整点路径——JSONPath 和 RFC 6902 JSON Patch 用的正是这套记法。它不是装饰:一行差异可以直接变成测试断言(期望 payload.user.role 等于 “admin”)或一个 patch 操作,不需要在差异视图和消费代码之间做心智翻译。",
          ],
        },
        {
          heading: "怎么读差异:新增、删除、变更,各自意味着什么",
          paragraphs: [
            "新文档里新增的键是向后兼容性检查的对象:API 响应多了字段通常对老客户端安全,但配置文件多了键可能意味着某处默认值变了。删除的键正相反——它们会让读这些字段的消费方坏掉。变更值带前后对照,行为差异一目了然,这正是配置变更的代码评审需要、而提交信息很少写清的东西。",
            "数组按索引比较,所以在列表中间插入一个元素会让后续所有索引移位,报告出一串连锁变更。如果你的数据概念上是集合或按键组织的集合,先把元素排序、或转成以 ID 为键的对象再比——diff 就会显示真正的差异而不是移位。这个预处理决策属于工作流而不是工具,所以工具保持规则简单可预期。",
            "扁平列表格式还能当部署检查清单用:贴上 API 响应的前后版本,每一行都是依赖方要么处理了、要么没处理的东西。发版前对 API 负载做快照的团队用的正是这个循环,而全程本地完成意味着负载不出机器。",
          ],
        },
        {
          heading: "不能贴去别处的负载,就在本地比",
          paragraphs: [
            "实际拿来 diff 的文档不是玩具样例:带用户记录的生产 API 响应、含凭证和内部主机名的环境配置、客户导出。把任何一侧贴进随便一个网页 diff 服务,等于把这些数据交给第三方——你为了保护正确性而做的对比,工具反而成了最薄弱的一环。",
            "这里的一切都在浏览器 JavaScript 里运行:解析、递归遍历、路径构造全部发生在你的机器上,不传输、不存储、不记录。页面加载后离线可用——环境配置的对比恰恰常发生在 staging 机器和 VPN 受限网络里,外部工具本来也够不着。诚实的上限是浏览器内存:几十 MB 量级的文档轻松应付,再往上就该交给脚本管道。",
          ],
        },
      ],
    },
    ja: {
      name: "JSON Diff",
      tagline: "2 つの JSON をパス単位で比較——追加・削除・変更されたキーを前後の値つきで表示,すべてローカル処理。",
      intro: [
        "2 つの JSON を貼り付けると、構造の差分をすべて表示:追加されたキー、削除されたキー、変更された値——それぞれ $.user.name のような完全パス付き。",
        "ネストしたオブジェクトと配列は再帰的に走査するため、3 階層深い変更も正確なパスと前后値とともに表示されます。",
      ],
      steps: [
        "1 つ目の JSON(元)を貼り付け。",
        "2 つ目の JSON(新版)を貼り付け。",
        "差分リストを読む——1 行が 1 パスの変更。",
      ],
      faqs: [
        {
          q: "配列の比較方法は?",
          a: "インデックスごと:要素 0 対要素 0。どちらかに余分な要素はその位置で追加・削除として表示されます。",
        },
        {
          q: "キー順序は影響する?",
          a: "いいえ。オブジェクトはキーで比較し挿入順は無視します。同じキーを違う順で並べた 2 文書は同一とみなされます。",
        },
      ],
      deepDive: [
        {
          heading: "意味論的 diff と文字 diff の違い",
          paragraphs: [
            "文字レベルの diff(git diff やプレーンテキストの差分ツール)が答えるのは「どのバイトが変わったか」で、JSON を前にしたときに問うべき質問はほぼ決してそれではありません。片方は 4 スペース、もう片方は 2 スペースで整形された 2 つの API レスポンスや、エンコーダーがオブジェクトのキーを並べ替えただけの 2 つの文書は、意味論的に同一です。それでもテキスト diff は何百行もの変更を示します。このツールは両文書を先にパースして値を比較するため、整形ノイズが誤検出を生めません。",
            "その帰結が意図的な非対称です。オブジェクトのキー順序は無視します。JSON のオブジェクトは仕様上順序なしのマップで、消費側はキーで読むからです。{\"a\":1,\"b\":2} と {\"b\":2,\"a\":1} は等しい。対照的に配列の順序は有意です。配列は順序付きリストで消費側はインデックス位置で読むため、[1,2,3] と [3,2,1] は全要素の変更として報告されます。消費側が適用する意味論に合わせることが、diff 出力を信頼できるものにします。",
            "報告される各変更は、JSONPath と RFC 6902 JSON Patch が使う $.a.b[0].c 流の完全なドットパスを伴います。これは飾りではありません。diff の 1 行はテストアサーション(payload.user.role が \"admin\" であると期待)にも、パッチ操作にも、diff ビューと消費コードの間の頭の中の翻訳なしにそのまま変わります。",
          ],
        },
        {
          heading: "diff の読み方:追加・削除・変更、それぞれの含意",
          paragraphs: [
            "新しい文書に現れた追加キーは後方互換性のチェック対象です。API レスポンスがフィールドを増やすのは古いクライアントにとってたいてい安全ですが、設定ファイルがキーを増やすのはどこかで既定値が変わった兆候かもしれません。削除されたキーは逆で、そのフィールドを読む消費側を壊すものです。新旧の値を並べて示す変更値は、実際の振る舞いの差を可視化します。設定変更のコードレビューが必要とし、コミットメッセージがめったに捉えないものです。",
            "配列はインデックスごとに比較するため、リストの途中に要素を挿入すると後続の全インデックスがずれ、連鎖的な変更として報告されます。データが概念的に集合やキー付きコレクションなら、要素を並べ替えるか ID をキーとするオブジェクトにしてから比べると、ずれではなく本当の差分が見えます。この前処理の判断はワークフローの側にあるべきで、ツールは規則を単純で予測可能に保つのが正しいのです。",
            "フラットなリスト形式はデプロイのチェックリストにも使えます。API レスポンスの前後を貼れば、各行は依存する消費側が処理できているかどうかの確認項目です。リリース前に API ペイロードのスナップショットを取るチームが回しているのはまさにこのループで、ローカルで完結するためペイロードはマシンの外に出ません。",
          ],
        },
        {
          heading: "他へ貼れないペイロードはローカルで比べる",
          paragraphs: [
            "実際に diff する文書はおもちゃのサンプルではありません。ユーザーレコード入りの本番 API レスポンス、資格情報と内部ホスト名を含む環境設定、顧客データのエクスポート。どちらかの側を無名のウェブ diff サービスに貼ることは、そのデータを第三者へ送ることであり、正しさを守るために走らせていた比較の中でツール自身が最弱リンクになります。",
            "ここではすべてがブラウザの JavaScript で動きます。パース、再帰走査、パス構築のすべてが手元のマシンで起こり、送信も保存も記録もしません。読み込み後はオフラインで動くため、環境設定の diff が起こりがちなステージングサーバーや VPN 制限ネットワークでも使えます。正直な上限はブラウザメモリで、数十 MB 規模の文書は余裕で比較でき、それを超えるならスクリプトのパイプラインの領分です。",
          ],
        },
      ],
    },
    es: {
      name: "JSON Diff",
      tagline: "Compara dos JSON ruta por ruta — claves añadidas, eliminadas y modificadas con valores antes/después, todo local.",
      intro: [
        "Pega dos documentos JSON y ve cada diferencia estructural: claves añadidas, eliminadas, valores cambiados — cada una con su ruta completa como $.user.name.",
        "Los objetos anidados y arrays se recorren recursivamente: un cambio a tres niveles de profundidad aparece con su ruta exacta y ambos valores.",
      ],
      steps: [
        "Pega el primer JSON (el original).",
        "Pega el segundo JSON (la versión nueva).",
        "Lee la lista de diferencias: cada línea es un cambio de ruta.",
      ],
      faqs: [
        {
          q: "¿Cómo se comparan los arrays?",
          a: "Por índice: elemento 0 contra elemento 0. Los elementos extra en cualquiera se muestran como añadidos o eliminados en su índice.",
        },
        {
          q: "¿Importa el orden de las claves?",
          a: "No — los objetos se comparan por claves, no por orden de inserción. Dos documentos con las mismas claves en otro orden son idénticos.",
        },
      ],
      deepDive: [
        {
          heading: "Diff semántico frente a diff de caracteres",
          paragraphs: [
            "Un diff a nivel de caracteres (git diff, herramientas de diff de texto plano) responde a «qué bytes cambiaron», y casi nunca es la pregunta que plantea JSON. Dos respuestas de API que difieren solo porque una fue formateada con 4 espacios y otra con 2, o porque un codificador reordenó las claves del objeto, son semánticamente idénticas — y aun así un diff de texto muestra cientos de líneas cambiadas. Esta herramienta parsea ambos documentos primero y compara los valores, así que el ruido de formato no puede producir falsos positivos.",
            "La consecuencia es una asimetría deliberada: el orden de las claves del objeto se ignora, porque los objetos JSON son mapas sin orden por especificación y todo consumidor los lee por clave — {\"a\":1,\"b\":2} equivale a {\"b\":2,\"a\":1}. El orden de los arrays, en cambio, es significativo, porque los arrays son listas ordenadas y los consumidores leen posiciones de índice; [1,2,3] frente a [3,2,1] reporta cada elemento cambiado. Ajustarse a la semántica que los consumidores aplican es lo que hace confiable la salida del diff.",
            "Cada cambio reportado lleva una ruta de puntos completa al estilo $.a.b[0].c que usan JSONPath y las operaciones de RFC 6902 JSON Patch. Esa notación no es decoración: una línea del diff se convierte en una aserción de test (esperar que payload.user.role sea \"admin\") o en una operación de parche sin ninguna traducción mental entre la vista del diff y el código que la consume.",
          ],
        },
        {
          heading: "Leer el diff: añadido, eliminado, cambiado — y qué implica cada uno",
          paragraphs: [
            "Las claves añadidas en el documento nuevo son las que hay que revisar por compatibilidad hacia atrás: una respuesta de API que gana un campo suele ser segura para los clientes viejos, pero un archivo de configuración que gana una clave puede significar que un valor por defecto cambió en algún sitio. Las claves eliminadas son lo contrario — son lo que rompe a los consumidores que leían esos campos. Los valores cambiados con el antes y el después lado a lado hacen visible el delta real de comportamiento, que es justo lo que una revisión de un cambio de configuración necesita y lo que los mensajes de commit rara vez capturan.",
            "Los arrays se comparan por índice, así que insertar un elemento en mitad de una lista desplaza todos los índices siguientes y reporta una cascada de cambios. Si tus datos son conceptualmente un conjunto o una colección con clave, compáralos con los elementos ordenados o como objeto indexado por ID — el diff mostrará entonces el delta verdadero y no el desplazamiento. Esa decisión de preprocesado pertenece al flujo de trabajo, no a la herramienta, y por eso la herramienta mantiene la regla simple y predecible.",
            "La lista plana también funciona como lista de comprobación de despliegue: pega el antes y el después de una respuesta de API, y cada línea es algo que un consumidor dependiente maneja o no. Los equipos que toman instantáneas de payloads de API antes de cada release usan justo este bucle, y hacerlo en local significa que los payloads nunca salen de la máquina.",
          ],
        },
        {
          heading: "Comparación local para payloads que no puedes pegar en otro sitio",
          paragraphs: [
            "Los documentos que comparas en la práctica no son juguetes: respuestas de API de producción con registros de usuarios, configuraciones de entorno con credenciales y nombres de host internos, exportaciones de clientes. Pegar cualquiera de las dos partes en un servicio web de diff aleatorio significa enviar esos datos a un tercero — la herramienta se convierte en el eslabón más débil de la comparación que corrías justamente para proteger la corrección.",
            "Todo aquí corre en el JavaScript de tu navegador: el parseo, el recorrido recursivo y la construcción de rutas ocurren en tu máquina, sin transmisión, almacenamiento ni registro. También funciona sin conexión una vez cargada, lo que importa porque los diff de configuraciones de entorno suelen ocurrir en servidores de staging y redes restringidas por VPN donde las herramientas externas no llegan de todos modos. El límite honesto es la memoria del navegador — documentos en las decenas de megabytes se comparan bien, y más allá toca una canalización con script.",
          ],
        },
      ],
    },
    pt: {
      name: "JSON Diff",
      tagline: "Compare dois JSONs caminho por caminho — chaves adicionadas, removidas e alteradas com valores antes/depois, tudo local.",
      intro: [
        "Cole dois documentos JSON e veja cada diferença estrutural: chaves adicionadas, removidas, valores alterados — cada uma com o caminho completo como $.user.name.",
        "Objetos aninhados e arrays são percorridos recursivamente: uma mudança a três níveis de profundidade aparece com o caminho exato e os dois valores.",
      ],
      steps: [
        "Cole o primeiro JSON (o original).",
        "Cole o segundo JSON (a versão nova).",
        "Leia a lista de diferenças — cada linha é uma mudança de caminho.",
      ],
      faqs: [
        {
          q: "Como os arrays são comparados?",
          a: "Por índice: elemento 0 contra elemento 0. Elementos extras em qualquer lado aparecem como adicionados ou removidos no seu índice.",
        },
        {
          q: "A ordem das chaves importa?",
          a: "Não — objetos são comparados por chaves, não pela ordem de inserção. Dois documentos com as mesmas chaves em ordem diferente são idênticos.",
        },
      ],
      deepDive: [
        {
          heading: "Diff semântico versus diff de caracteres",
          paragraphs: [
            "Um diff em nível de caracteres (git diff, ferramentas de diff de texto puro) responde a “quais bytes mudaram”, e quase nunca é a pergunta que o JSON planteia. Duas respostas de API que diferem só porque uma foi formatada com 4 espaços e a outra com 2, ou porque um codificador reordenou as chaves do objeto, são semanticamente idênticas — e ainda assim um diff de texto mostra centenas de linhas alteradas. Esta ferramenta faz o parse dos dois documentos primeiro e compara os valores, então o ruído de formatação não produz falsos positivos.",
            "A consequência é uma assimetria deliberada: a ordem das chaves do objeto é ignorada, porque objetos JSON são mapas sem ordem pela especificação e todo consumidor os lê por chave — {\"a\":1,\"b\":2} equivale a {\"b\":2,\"a\":1}. A ordem dos arrays, em contrapartida, é significativa, porque arrays são listas ordenadas e consumidores leem posições de índice; [1,2,3] contra [3,2,1] reporta cada elemento alterado. Ajustar-se à semântica que os consumidores aplicam é o que torna a saída do diff confiável.",
            "Cada mudança reportada traz um caminho de pontos completo no estilo $.a.b[0].c que JSONPath e as operações do RFC 6902 JSON Patch usam. Essa notação não é decoração: uma linha do diff vira uma asserção de teste (esperar que payload.user.role seja \"admin\") ou uma operação de patch sem nenhuma tradução mental entre a visão do diff e o código que a consome.",
          ],
        },
        {
          heading: "Como ler o diff: adicionado, removido, alterado — e o que cada um implica",
          paragraphs: [
            "As chaves adicionadas no documento novo são as que pedem checagem de compatibilidade retroativa: uma resposta de API que ganha um campo costuma ser segura para clientes antigos, mas um arquivo de configuração que ganha uma chave pode significar que um padrão mudou em algum lugar. As chaves removidas são o oposto — são o que quebra consumidores que liam esses campos. Valores alterados com antes e depois lado a lado tornam visível o delta real de comportamento, que é exatamente o que a revisão de uma mudança de configuração precisa e o que mensagens de commit raramente capturam.",
            "Arrays são comparados por índice, então inserir um elemento no meio de uma lista desloca todos os índices seguintes e reporta uma cascata de mudanças. Se seus dados são conceitualmente um conjunto ou uma coleção com chave, compare com os elementos ordenados ou como objeto indexado por ID — o diff mostrará o delta verdadeiro em vez do deslocamento. Essa decisão de pré-processamento pertence ao fluxo de trabalho, não à ferramenta, e por isso a ferramenta mantém a regra simples e previsível.",
            "A lista plana também serve como checklist de deploy: cole o antes e o depois de uma resposta de API, e cada linha é algo que um consumidor dependente ou trata ou não trata. Equipes que tiram snapshots de payloads de API antes dos releases usam exatamente esse ciclo, e fazê-lo localmente significa que os payloads nunca saem da máquina.",
          ],
        },
        {
          heading: "Comparação local para payloads que você não pode colar em outro lugar",
          paragraphs: [
            "Os documentos que você compara na prática não são amostras de brinquedo: respostas de API de produção com registros de usuários, configurações de ambiente com credenciais e nomes de host internos, exportações de clientes. Colar qualquer um dos lados num serviço web de diff qualquer significa enviar esses dados a um terceiro — a ferramenta vira o elo mais fraco da comparação que você rodava justamente para proteger a correção.",
            "Tudo aqui roda no JavaScript do seu navegador: o parse, a caminhada recursiva e a construção de caminhos acontecem na sua máquina, sem transmissão, armazenamento ou registro. Também funciona offline depois de carregado, o que importa porque diffs de configurações de ambiente costumam acontecer em servidores de staging e redes restritas por VPN onde ferramentas externas não alcançam de qualquer forma. O limite honesto é a memória do navegador — documentos na casa das dezenas de megabytes comparam bem, e além disso o terreno é de uma pipeline com script.",
          ],
        },
      ],
    },
  },
});
