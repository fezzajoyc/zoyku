import { DevEngineJsonPlus } from "../_engines/dev-engine-jsonplus";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "json-path-query",
  category: "developer",
  icon: "search",
  engine: { component: DevEngineJsonPlus, props: { mode: "query" } },
  related: ["json-formatter", "json-diff", "json-to-typescript", "md5-generator", "sha256-generator", "base64-image", "json-validator", "url-encoder", "html-minifier", "url-decoder"],
  copy: {
    en: {
      name: "JSON Path Query",
      tagline: "Extract any value from JSON with a path like $.user.name or $.items[0].id — instant, forgiving, no jq syntax to learn.",
      intro: [
        "Pulling one field out of a huge API response, sanity-checking a config value, or asserting on a nested payload in a test — a path query beats scrolling through pretty-printed JSON. Enter a path and the matching values appear instantly.",
        "Dot notation, array indexes and quoted keys all work ($.items[0].id, $['weird key']), so the everyday JSONPath subset needs no query-language learning. Results render as formatted JSON you can copy straight into code or a fixture.",
        "The evaluator runs entirely in the browser, walking the parsed document only as deep as the path requires — no regex over raw text, so keys containing dots or brackets still resolve once quoted.",
        "Full engines like JSONPath-plus or JMESPath bring dozens of operators — filters, wildcards, slices — with heavyweight syntax to match. This tool covers the common case of pointing at concrete values, with errors written in plain language (key not found, index out of range) instead of a library stack trace."
      ],
      steps: [
        "Paste your JSON.",
        "Type the path to the value you want — $ is the root.",
        "Copy the extracted value.",
      ],
      faqs: [
        {
          q: "Which path syntax is supported?",
          a: "The everyday subset: dot notation ($.a.b), array indexes ($.items[0]), quoted keys ($['odd key']). Full JSONPath filters and wildcards are out of scope — this tool is for direct extraction.",
        },
        {
          q: "What happens with a wrong path?",
          a: "You get the exact reason: which key was missing or which index was out of range. Nothing crashes.",
        },
      ],
      deepDive: [
        {
          heading: "What the path notation can and cannot express",
          paragraphs: [
            "The supported subset is deliberately small: $ for the root, .key for object members, [0] for array indexes, and quoted keys like $['weird key'] for names that contain dots, brackets or spaces. That covers the overwhelming majority of real lookups — pointing at one concrete value in a known structure.",
            "What it does not cover is the declarative side of JSONPath: wildcard $..price, filter expressions $[?(@.active==true)], slices $[1:5], unions. Those operators exist for documents whose shape you do not know in advance. When you do know the shape — which is most debugging and testing work — a direct path is faster to write and faster to reason about than a filter expression.",
            "Quoted keys are the detail people miss. An API returning a key like user.name or order[0] as a literal key name breaks dot notation — the path would silently descend into the wrong node. Wrapping the key in quotes tells the evaluator “this whole string is one key”, which resolves the ambiguity without any escaping tricks.",
          ],
        },
        {
          heading: "Why the errors read like sentences",
          paragraphs: [
            "Library-driven path evaluation typically fails in one of two unpleasant ways: an undefined access that returns “undefined” with no explanation, or an exception with a stack trace pointing into the library. Both leave you reverse-engineering the failure from the path string alone.",
            "This evaluator walks the path step by step and stops at the first discrepancy, reporting exactly which step failed and why — “key \"address\" not found at $.user” or “index 3 out of range, array has 2 items”. That turns path debugging from guess-and-retry into reading: the error names the node where reality diverged from your assumption.",
            "The no-crash guarantee matters more than it sounds. Long paths against deeply nested API payloads usually fail several times while you probe the structure; a tool that degrades into plain-language messages keeps the loop quick, whereas an exception per attempt turns the same probing into a slog.",
          ],
        },
        {
          heading: "Probing payloads without uploading them",
          paragraphs: [
            "The payloads you query are frequently confidential: production API responses with customer records, error dumps containing account data, config files with credentials. A tool that POSTs documents and paths to a backend would expose all of it; here the query executes entirely in your browser's JavaScript against a document parsed on your device.",
            "There is also nothing to configure: no runtime to install, no jq binary, no project. Paste a response, type a path, read the value — which makes it the right tool for one-off investigations where setting up a scripting environment costs more than the question itself.",
            "Combine it with the formatter when a payload is too large to eyeball: format once to see the structure, then extract the exact values you need with paths instead of scrolling. And because everything is local, you can safely probe a customer's actual failing response copied straight from production.",
          ],
        },
      ],
    },
    zh: {
      name: "JSON Path 查询",
      tagline: "用 $.user.name 或 $.items[0].id 这样的路径从 JSON 提取任意值——即时、容错,不用学 jq 语法。",
      intro: [
        "精确指向你要的值:点号、数组下标、带引号的键都支持($.items[0].id、$['weird key'])。从庞大的接口响应里掏一个字段,就用它。",
        "永不崩溃——路径错了会返回人话原因(键不存在、下标越界),改一下重试即可。",
      ],
      steps: [
        "粘贴 JSON。",
        "输入目标值的路径——$ 表示根。",
        "复制提取出的值。",
      ],
      faqs: [
        {
          q: "支持什么路径语法?",
          a: "日常子集:点号($.a.b)、数组下标($.items[0])、引号键($['odd key'])。完整 JSONPath 的过滤器和通配符不在范围内——这个工具做直接提取。",
        },
        {
          q: "路径写错了会怎样?",
          a: "会返回具体原因:哪个键不存在、哪个下标越界。不会崩溃。",
        },
      ],
      deepDive: [
        {
          heading: "路径表示法能表达什么、不能表达什么",
          paragraphs: [
            "支持的子集刻意很小:$ 表示根,.key 表示对象成员,[0] 表示数组下标,以及 $['weird key'] 这样的引号键,用于含点号、方括号或空格的名字。这覆盖了现实查询的绝大多数——在已知结构里指向一个具体值。",
            "覆盖不了的是 JSONPath 的声明式一面:通配符 $..price、过滤表达式 $[?(@.active==true)]、切片 $[1:5]、并集。这些算子服务于你事先不知道形状的文档。而当你确实知道形状时——调试和测试的大多数场景——直接路径写起来更快,推理起来也比过滤表达式容易。",
            "引号键是大家容易漏掉的细节。接口如果返回 user.name 或 order[0] 这种字面键名,点号记法会失灵——路径会悄悄下钻到错误的节点。给键套上引号是告诉求值器“这整个字符串是一个键”,不需要任何转义技巧就消除了歧义。",
          ],
        },
        {
          heading: "为什么报错像人话",
          paragraphs: [
            "依赖库的路径求值通常以两种难受的方式失败:返回一个没有任何解释的 undefined,或者抛出指向库内部的异常堆栈。两者都逼你只凭路径字符串反推失败原因。",
            "这个求值器逐步走路径,在第一处不一致就停下,准确报告是哪一步、为什么失败——“$.user 下找不到键 \"address\"”或者“下标 3 越界,数组只有 2 个元素”。路径调试从“猜了再试”变成“读报错”:错误直接说出你的假设在哪个节点上和现实分了岔。",
            "“永不崩溃”比听上去更重要。对着深层嵌套的接口 payload 探索结构时,长路径通常要失败好几次;一个退化为平实报错的工具让循环保持轻快,而每次尝试都抛异常会把同样的探索变成苦役。",
          ],
        },
        {
          heading: "探查 payload,但不上传它",
          paragraphs: [
            "你要查询的 payload 常常是机密:带客户记录的生产接口响应、含账户数据的错误转储、带凭证的配置文件。把文档和路径 POST 到后端的工具会把这一切暴露出去;这里查询完全在浏览器的 JavaScript 里执行,针对的是在你设备上解析的文档。",
            "也没有任何要配置的东西:不用装运行时、不用 jq 二进制、不用建项目。粘贴响应、输入路径、读值——对于一次性的排查,搭脚本环境的成本比问题本身还高时,它就是对的选择。",
            "payload 大到没法肉眼扫的时候,配合格式化工具用:先格式化一次看清结构,再用路径提取你要的确切值,省去滚动翻找。因为一切都在本地,把客户真实失败的响应直接从生产环境复制过来探查也完全安全。",
          ],
        },
      ],
    },
    ja: {
      name: "JSON Path 検索",
      tagline: "$.user.name や $.items[0].id のようなパスで JSON から任意の値を抽出——即時・寛容・jq 構文不要。",
      intro: [
        "必要な値を正確に指し示す:ドット記法、配列インデックス、引用キーすべて対応($.items[0].id、$['weird key'])。巨大な API レスポンスから 1 フィールド取り出すのに最適。",
        "決してクラッシュしません——間違ったパスは理由(キー不在・インデックス範囲外)を平文で返します。",
      ],
      steps: [
        "JSON を貼り付け。",
        "目的の値へのパスを入力——$ はルート。",
        "抽出した値をコピー。",
      ],
      faqs: [
        {
          q: "対応するパス構文は?",
          a: "日常サブセット:ドット記法($.a.b)、配列インデックス($.items[0])、引用キー($['odd key'])。完全な JSONPath のフィルタやワイルドカードは対象外です。",
        },
        {
          q: "パスを間違えると?",
          a: "具体的理由が返ります:どのキーが存在しないか、どのインデックスが範囲外か。クラッシュはしません。",
        },
      ],
      deepDive: [
        {
          heading: "パス記法にできること・できないこと",
          paragraphs: [
            "対応サブセットは意図的に小さいです。$ はルート、.key はオブジェクト メンバー、[0] は配列インデックス、そしてドットや括弧や空白を含む名前のための $['weird key'] のような引用キー。これは現実の参照の圧倒的多数——既知の構造の中の 1 個の具体値を指すこと——を覆います。",
            "覆わないのは JSONPath の宣言的な側面です。ワイルドカード $..price、フィルタ式 $[?(@.active==true)]、スライス $[1:5]、ユニオン。これらの演算子は事前に形を知らない文書のためのものです。形を知っているなら——デバッグやテストのほとんどがそうです——直接パスのほうが、フィルタ式より書くのも推論するのも速い。",
            "引用キーは見落とされがちな細部です。user.name や order[0] をリテラルなキー名として返す API では、ドット記法が破綻します。パスは黙って別のノードへ降りていく。キーを引用符で囲むと、評価器に「この文字列全体が 1 個のキー」と伝わり、エスケープの細工なしで曖昧さが解消されます。",
          ],
        },
        {
          heading: "エラーが文のように読める理由",
          paragraphs: [
            "ライブラリ頼みのパス評価は、二つの嫌な形で失敗しがちです。何の説明もないまま undefined を返すか、ライブラリ内部を指すスタック トレース付きの例外を投げるか。どちらもパス文字列だけから失敗を逆算させられます。",
            "この評価器はパスを一歩ずつ進み、最初の食い違いで止まり、どのステップが、なぜ失敗したかを正確に報告します。\"$.user にキー \"address\" がない\"、\"インデックス 3 は範囲外、配列は 2 要素\"。パスのデバッグが「推測して再試行」から「エラーを読む」に変わります。現実があなたの前提と分かれたノードを、エラーが名指しするのです。",
            "クラッシュしない保証は聞こえ以上に重要です。深くネストした API ペイロードへの長いパスは、構造を探る間に数回失敗するのが普通です。平文のメッセージに劣化するツールはループを軽快に保ちますが、試行ごとの例外は同じ探索を苦役に変えます。",
          ],
        },
        {
          heading: "ペイロードをアップロードせずに調べる",
          paragraphs: [
            "問い合わせるペイロードはしばしば機密です。顧客レコード入りの本番 API レスポンス、アカウント データを含むエラー ダンプ、資格情報入りの設定ファイル。文書とパスをバックエンドへ POST するツールはそれを全部晒します。ここではクエリは完全にブラウザの JavaScript で、端末上で解析された文書に対して実行されます。",
            "設定すべきものもありません。ランタイムのインストールも jq バイナリもプロジェクトも不要。レスポンスを貼り、パスを打ち、値を読む。一度きりの調査で、スクリプト環境を整えるコストが問い自体を上回る場合に適した道具です。",
            "ペイロードが大きすぎて目で追えないときはフォーマッターと組み合わせます。一度整形して構造を見て、スクロールの代わりにパスで必要な値を正確に取り出す。すべてローカルなので、本番からそのままコピーした顧客の実際の失敗レスポンスを安全に調べられます。",
          ],
        },
      ],
    },
    es: {
      name: "Consulta JSON Path",
      tagline: "Extrae cualquier valor de JSON con una ruta como $.user.name o $.items[0].id — instantáneo, tolerante, sin aprender jq.",
      intro: [
        "Apunta exactamente al valor que necesitas: notación de punto, índices de array y claves entrecomilladas funcionan ($.items[0].id, $['weird key']). Ideal para sacar un campo de una respuesta enorme.",
        "Nunca falla — una ruta mala devuelve una razón en lenguaje claro (clave no encontrada, índice fuera de rango).",
      ],
      steps: [
        "Pega tu JSON.",
        "Escribe la ruta al valor — $ es la raíz.",
        "Copia el valor extraído.",
      ],
      faqs: [
        {
          q: "¿Qué sintaxis de ruta soporta?",
          a: "El subconjunto diario: puntos ($.a.b), índices ($.items[0]), claves entrecomilladas ($['odd key']). Los filtros y comodines de JSONPath completo no están incluidos.",
        },
        {
          q: "¿Qué pasa con una ruta mala?",
          a: "Obtienes la razón exacta: qué clave faltó o qué índice se salió del rango. Nada se rompe.",
        },
      ],
      deepDive: [
        {
          heading: "Lo que la notación de ruta puede y no puede expresar",
          paragraphs: [
            "El subconjunto soportado es deliberadamente pequeño: $ para la raíz, .key para miembros de objeto, [0] para índices de array, y claves entrecomilladas como $['weird key'] para nombres que contienen puntos, corchetes o espacios. Eso cubre la gran mayoría de las búsquedas reales — apuntar a un valor concreto dentro de una estructura conocida.",
            "Lo que no cubre es el lado declarativo de JSONPath: comodines $..price, expresiones de filtro $[?(@.active==true)], porciones $[1:5], uniones. Esos operadores existen para documentos cuya forma no conoces de antemano. Cuando sí la conoces — que es la mayoría del trabajo de depuración y pruebas — una ruta directa se escribe y se razona más rápido que una expresión de filtro.",
            "Las claves entrecomilladas son el detalle que la gente pasa por alto. Una API que devuelve claves como user.name u order[0] como nombres literales rompe la notación de punto — la ruta descendería en silencio al nodo equivocado. Envolver la clave en comillas le dice al evaluador \"esta cadena entera es una clave\", lo que resuelve la ambigüedad sin trucos de escape.",
          ],
        },
        {
          heading: "Por qué los errores se leen como frases",
          paragraphs: [
            "La evaluación de rutas basada en bibliotecas suele fallar de dos maneras desagradables: un acceso undefined que devuelve “undefined” sin explicación, o una excepción con stack trace apuntando a la biblioteca. Ambas te dejan haciendo ingeniería inversa del fallo a partir de la cadena de la ruta.",
            "Este evaluador recorre la ruta paso a paso y se detiene en la primera discrepancia, reportando exactamente qué paso falló y por qué — “clave \"address\" no encontrada en $.user” o “índice 3 fuera de rango, el array tiene 2 elementos”. Eso convierte la depuración de rutas de adivinar-y-reintentar en leer: el error nombra el nodo donde la realidad divergió de tu supuesto.",
            "La garantía de no-crash importa más de lo que suena. Las rutas largas contra payloads de API profundamente anidados suelen fallar varias veces mientras sondeas la estructura; una herramienta que degrada a mensajes en lenguaje llano mantiene el ciclo ágil, mientras que una excepción por intento convierte la misma exploración en una penitencia.",
          ],
        },
        {
          heading: "Sondear payloads sin subirlos",
          paragraphs: [
            "Los payloads que consultas suelen ser confidenciales: respuestas de producción con registros de clientes, volcados de errores con datos de cuentas, archivos de configuración con credenciales. Una herramienta que hace POST de documentos y rutas a un backend expondría todo eso; aquí la consulta se ejecuta por completo en el JavaScript de tu navegador contra un documento parseado en tu dispositivo.",
            "Tampoco hay nada que configurar: ni runtime que instalar, ni binario de jq, ni proyecto. Pegar una respuesta, escribir una ruta, leer el valor — lo que la convierte en la herramienta adecuada para investigaciones de una sola vez, donde montar un entorno de scripts cuesta más que la pregunta misma.",
            "Combínala con el formateador cuando un payload sea demasiado grande para ojearlo: formatea una vez para ver la estructura y extrae los valores exactos con rutas en vez de desplazarte. Y como todo es local, puedes sondear sin riesgo la respuesta fallida real de un cliente copiada directamente de producción.",
          ],
        },
      ],
    },
    pt: {
      name: "Consulta JSON Path",
      tagline: "Extraia qualquer valor de JSON com um caminho como $.user.name ou $.items[0].id — instantâneo, tolerante, sem aprender jq.",
      intro: [
        "Aponte exatamente para o valor que precisa: notação de ponto, índices de array e chaves entre aspas funcionam ($.items[0].id, $['weird key']). Ideal para tirar um campo de uma resposta enorme.",
        "Nunca quebra — um caminho errado retorna a razão em linguagem clara (chave não encontrada, índice fora do intervalo).",
      ],
      steps: [
        "Cole seu JSON.",
        "Digite o caminho até o valor — $ é a raiz.",
        "Copie o valor extraído.",
      ],
      faqs: [
        {
          q: "Qual sintaxe de caminho é suportada?",
          a: "O subconjunto diário: pontos ($.a.b), índices ($.items[0]), chaves entre aspas ($['odd key']). Filtros e curingas do JSONPath completo ficam fora do escopo.",
        },
        {
          q: "E se o caminho estiver errado?",
          a: "Você recebe a razão exata: qual chave faltou ou qual índice saiu do intervalo. Nada quebra.",
        },
      ],
      deepDive: [
        {
          heading: "O que a notação de caminho pode e não pode expressar",
          paragraphs: [
            "O subconjunto suportado é deliberadamente pequeno: $ para a raiz, .key para membros de objeto, [0] para índices de array, e chaves entre aspas como $['weird key'] para nomes que contêm pontos, colchetes ou espaços. Isso cobre a imensa maioria das buscas reais — apontar para um valor concreto dentro de uma estrutura conhecida.",
            "O que não cobre é o lado declarativo do JSONPath: curingas $..price, expressões de filtro $[?(@.active==true)], fatias $[1:5], uniões. Esses operadores existem para documentos cuja forma você não conhece de antemão. Quando você conhece — que é a maioria do trabalho de depuração e teste — um caminho direto é mais rápido de escrever e de raciocinar que uma expressão de filtro.",
            "Chaves entre aspas são o detalhe que a gente perde. Uma API que retorna chaves como user.name ou order[0] como nomes literais quebra a notação de ponto — o caminho desceria em silêncio para o nó errado. Envolver a chave em aspas diz ao avaliador \"essa string inteira é uma chave\", o que resolve a ambiguidade sem nenhum truque de escape.",
          ],
        },
        {
          heading: "Por que os erros se leem como frases",
          paragraphs: [
            "A avaliação de caminhos baseada em bibliotecas costuma falhar de duas maneiras desagradáveis: um acesso undefined que retorna \"undefined\" sem explicação, ou uma exceção com stack trace apontando para a biblioteca. Ambas deixam você fazendo engenharia reversa da falha a partir da string do caminho sozinha.",
            "Este avaliador percorre o caminho passo a passo e para na primeira discrepância, reportando exatamente qual passo falhou e por quê — \"chave \"address\" não encontrada em $.user\" ou \"índice 3 fora do intervalo, o array tem 2 itens\". Isso transforma a depuração de caminhos de adivinhar-e-tentar em ler: o erro nomeia o nó onde a realidade divergiu da sua suposição.",
            "A garantia de não quebrar importa mais do que soa. Caminhos longos contra payloads de API profundamente aninhados costumam falhar várias vezes enquanto você sondar a estrutura; uma ferramenta que degrada para mensagens em linguagem simples mantém o ciclo ágil, enquanto uma exceção por tentativa transforma a mesma sondagem em trabalheira.",
          ],
        },
        {
          heading: "Sondar payloads sem enviá-los para cima",
          paragraphs: [
            "Os payloads que você consulta frequentemente são confidenciais: respostas de produção com registros de clientes, dumps de erro com dados de contas, arquivos de configuração com credenciais. Uma ferramenta que faz POST de documentos e caminhos para um backend exporia tudo isso; aqui a consulta executa por completo no JavaScript do seu navegador contra um documento parseado no seu dispositivo.",
            "Também não há nada para configurar: nem runtime para instalar, nem binário jq, nem projeto. Colar uma resposta, digitar um caminho, ler o valor — o que a torna a ferramenta certa para investigações pontuais, onde montar um ambiente de script custa mais que a pergunta em si.",
            "Combine com o formatador quando um payload for grande demais para olhar: formate uma vez para ver a estrutura e extraia os valores exatos com caminhos em vez de rolar. E como tudo é local, dá para sondar com segurança a resposta de falha real de um cliente copiada direto da produção.",
          ],
        },
      ],
    },
  },
});
