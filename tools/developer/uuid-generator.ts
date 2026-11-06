import { DevUuidEngine } from "../_engines/dev-engine-uuid";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "uuid-generator",
  category: "developer",
  icon: "shuffle",
  engine: { component: DevUuidEngine },
  related: ["hash-generator", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "url-encoder", "html-minifier", "url-decoder", "json-path-query"],
  copy: {
    en: {
      name: "UUID Generator",
      tagline:
        "Generate random UUID v4 identifiers in bulk with one click — 1 to 500 at a time, using your browser's cryptographic randomness. Free, instant, offline-capable.",
      intro: [
        "Create version 4 UUIDs in whatever quantity you need: test fixtures, database seeds, file names, request IDs or API key drafts. Each identifier is produced by crypto.randomUUID, the browser's cryptographically secure random source, so batches are unpredictable and safe to use as unguessable resource identifiers.",
        "A v4 UUID is 122 random bits plus 6 fixed version/variant bits, formatted as the canonical 8-4-4-4-12 hexadecimal layout (xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx). The version nibble is always 4 and the top bits of the third group are 8, 9, a or b — quick tells that an identifier is a well-formed v4.",
        "The format comes from RFC 4122, updated in 2024 by RFC 9562 which added v6/v7/v8 — v4 itself is unchanged. With 2^122 possible values, the collision probability across a full batch is far below anything measurable: you would need to generate tens of billions of UUIDs to have even a one-in-a-billion chance of a duplicate.",
        "Unlike time-based versions (v1/v6/v7), v4 carries no timestamp or MAC address and leaks nothing about when or where it was created — the page tells you exactly that, plus when your batch was generated. Compared with counting integers or random strings, UUIDs need no central coordinator and can be generated on any device without conflicts.",

      ],
      steps: [
        "Set how many UUIDs you need (1–500).",
        "Click Generate — the list appears instantly.",
        "Copy all of them at once, or clear and generate a fresh batch.",
      ],
      faqs: [
        {
          q: "Can two generated UUIDs ever collide?",
          a: "Theoretically yes, practically no. With 122 random bits, generating a collision requires on the order of 10^36 UUIDs — far beyond any realistic workload.",
        },
        {
          q: "Why choose v4 instead of UUID v1 or v7?",
          a: "v4 leaks no timing or hardware information and needs no clock or MAC address. If you need database-index-friendly, time-sortable IDs, look at v7 — but for plain uniqueness, v4 is the standard choice.",
        },
        {
          q: "Are the UUIDs generated on a server?",
          a: "No. They come from your own browser's cryptographic random generator and never leave your device.",
        },
      ],
      deepDive: [
        {
          heading: "How random a v4 UUID really is",
          paragraphs: [
            "A version 4 UUID carries 122 random bits; the other 6 are fixed by the format — the version nibble is always 4 and two bits of the third group are the variant marker. That layout (xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, with y in 8, 9, a or b) is the quick visual check for whether an identifier is a well-formed v4, and it is also why a v4 UUID cannot be compressed to more than it already is.",
            "The collision question comes up every time someone generates IDs in bulk. With 122 bits, the birthday-bound math says you would need on the order of 10^36 generated UUIDs for a duplicate to become plausible — far beyond any realistic workload. Practical collisions in real systems trace to broken randomness, not to the format: a seeded pseudo-random generator reused across servers, or a hardcoded ID in a fixture. The format is safe; the randomness source is what must be.",
            "This tool generates through crypto.randomUUID, the browser's cryptographically secure source — the same pool that secures HTTPS sessions — so each identifier is unpredictable and safe to use as an unguessable resource ID. That property matters more than raw uniqueness in some designs: an ID nobody can enumerate is access control by obscurity done properly, as long as the server still checks authorization.",
          ],
        },
        {
          heading: "v4 versus the other versions",
          paragraphs: [
            "The version family answers different questions. v1 embeds a timestamp and often the MAC address of the generating machine — sortable, but it leaks where and when it was made, and a published MAC address in a document ID is a small privacy defect. v4 carries no timestamp or hardware identity and leaks nothing, which is why it became the default for public-facing identifiers.",
            "The newer time-ordered versions — v6 and v7, added by RFC 9562 in 2024, with v7 using a Unix timestamp plus randomness — exist precisely for the database problem: v4's randomness fragments indexes, while time-ordered IDs cluster inserts the way ULIDs do. If your keys live in a large indexed table, v7 or ULID beats v4 on write locality; if your identifiers appear in URLs, tokens or anything users can see, v4's opacity is the feature.",
            "A practical rule of thumb: v4 as the default everywhere, and change deliberately when a requirement — sortability, embeddability, a legacy parser that only accepts v1 — pushes you to another version. Mixing versions in one identifier space is legal (the version nibble distinguishes them) but makes downstream validation stricter, since consumers can no longer assume one shape.",
          ],
        },
        {
          heading: "Generated on your device, in any quantity",
          paragraphs: [
            "The identifiers come from your browser's cryptographic random generator and never touch a server: batches of up to 500 appear instantly, work offline, and nothing is logged or stored. That locality has a practical privacy angle — generating an ID for a document, a support case or an unpublished product on someone else's website would tie that object to a third party's logs; here the generation leaves no trace outside your device.",
            "Bulk generation is the common workflow: test fixtures, database seeds, file names, request IDs, drafts of API keys to be distributed later. Generate the batch, copy it in one click, and treat the list like a one-time secret — paste it where needed and clear it. Because generation is local and unlogged, a batch never transits a third party's server on its way to your data.",
            "One caution that applies to any generator: randomness from a browser is strong but is not a certified hardware source, and jurisdictions with strict compliance requirements sometimes demand certified entropy for key material. For ordinary identifiers, request IDs and fixtures — the overwhelming majority of uses — the browser source is more than sufficient.",
          ],
        },
      ],
    },
    zh: {
      name: "UUID 生成器",
      tagline: "一键批量生成随机 UUID v4 标识符——每次 1 到 500 个,使用浏览器密码学安全随机源。免费即时,离线可用。",
      intro: [
        "按需生成 RFC 4122 第 4 版 UUID:测试数据、数据库种子、文件名、请求 ID 或 API key 草稿。每个标识符都来自 crypto.randomUUID,即浏览器内置的密码学安全随机源——122 位随机,碰撞概率在实际中永远不会遇到。",
        "与基于时间的 v1/v6/v7 不同,v4 不含时间戳,不会泄露创建时间和地点——页面会明确说明这一点,并显示本批次生成的时间。",
      ],
      steps: [
        "设置需要的 UUID 数量(1–500)。",
        "点击生成——列表立即出现。",
        "一次性全部复制,或清空后重新生成一批。",
      ],
      faqs: [
        {
          q: "生成的 UUID 会重复吗?",
          a: "理论上可能,实际上不会。122 位随机意味着需要约 10^36 个 UUID 才可能撞上——远超任何现实工作负载。",
        },
        {
          q: "为什么选 v4 而不是 v1 或 v7?",
          a: "v4 不泄露时间或硬件信息,也不依赖时钟或 MAC 地址。如果需要适合数据库索引、按时间排序的 ID,可以考虑 v7;但只论唯一性,v4 是标准选择。",
        },
        {
          q: "UUID 是在服务器上生成的吗?",
          a: "不是。它们来自你自己浏览器的密码学随机生成器,不会离开你的设备。",
        },
      ],
      deepDive: [
        {
          heading: "v4 UUID 到底有多随机",
          paragraphs: [
            "版本 4 的 UUID 携带 122 位随机数;另外 6 位由格式固定——版本半字节恒为 4,第三组的两位是变体标记。这个布局(xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx,其中 y 是 8、9、a 或 b)是判断标识符是否为良构 v4 的快速目检法,也说明了 v4 UUID 没有进一步压缩的空间。",
            "每次批量生成 ID 都有人问碰撞问题。122 位的生日界限数学告诉我们:要让重复变得可信,需要生成大约 10^36 个 UUID——远超任何现实工作负载。真实系统里的实际碰撞都追溯到坏随机性,而不是格式本身:多台服务器复用一个带种子的伪随机生成器,或者 fixture 里写死的 ID。格式是安全的,必须合格的是随机源。",
            "本工具通过 crypto.randomUUID 生成——浏览器密码学安全的随机源,与保护 HTTPS 会话的是同一个池——所以每个标识符不可预测,可以放心用作不可枚举的资源 ID。在某些设计里,这个性质比原始唯一性更重要:一个没人能枚举的 ID,就是做对了的「以隐蔽求安全」,前提是服务端照旧做授权校验。",
          ],
        },
        {
          heading: "v4 与其他版本的取舍",
          paragraphs: [
            "版本家族各答不同的问题。v1 内嵌时间戳,常还有生成机器的 MAC 地址——可排序,但泄露在哪里何时生成,文档 ID 里出现公开的 MAC 地址是个小小的隐私缺陷。v4 不带时间戳也不带硬件身份,什么都不泄露,这正是它成为公开标识符默认选择的原因。",
            "较新的时间有序版本——v6 和 v7,由 RFC 9562 于 2024 年加入,v7 用 Unix 时间戳加随机数——正是为数据库问题而生:v4 的随机性让索引碎片化,而时间有序的 ID 像 ULID 一样让插入聚簇。如果键存放在大型索引表里,v7 或 ULID 在写入局部性上胜过 v4;如果标识符出现在 URL、令牌或任何用户可见的地方,v4 的不透明性就是特性。",
            "一条实用的经验法则:到处默认 v4,当某个需求——可排序、可嵌入、只接受 v1 的遗留解析器——推你换版本时再刻意换。在同一标识符空间里混用版本是合法的(版本半字节区分它们),但会让下游校验变严,因为消费方不能再假设单一形状。",
          ],
        },
        {
          heading: "在你的设备上生成,数量随意",
          paragraphs: [
            "标识符来自你浏览器的密码学随机生成器,不经过任何服务器:最多 500 个的批次即时出现,离线可用,不记录、不存储。本地性还有一个实际的隐私角度——在别人的网站上为一个文档、工单或未发布产品生成 ID,等于把这个对象挂到第三方的日志上;这里的生成在设备之外不留任何痕迹。",
            "批量生成是常见工作流:测试夹具、数据库种子、文件名、请求 ID、以后分发的 API key 草稿。生成一批,一键复制,把这份列表当一次性秘密处理——贴到需要的地方,然后清掉。因为生成本地且无日志,一批 ID 在到达你的数据之前不会经过任何第三方服务器。",
            "一条对任何生成器都适用的提醒:浏览器的随机性很强,但不是认证过的硬件源,合规要求严格的司法辖区有时要求密钥材料使用认证的熵。对普通标识符、请求 ID 和夹具——压倒性的多数用途——浏览器随机源绰绰有余。",
          ],
        },
      ],
    },
    ja: {
      name: "UUID ジェネレーター",
      tagline:
        "ランダムな UUID v4 をワンクリックで一括生成 — 1〜500 個ずつ、ブラウザの暗号学的乱数を使用。無料・即時・オフライン対応です。",
      intro: [
        "必要な数だけ RFC 4122 version 4 の UUID を生成:テストフィクスチャ、DB シード、ファイル名、リクエスト ID、API キーの下書きなど。各識別子は crypto.randomUUID、つまりブラウザの暗号学的に安全な乱数源から作られます。122 ビットのランダム性で、実務では衝突を気にする必要がありません。",
        "時間ベースの v1/v6/v7 と異なり、v4 はタイムスタンプを含まず、作成時刻や場所を漏らしません。このページではその点と、バッチの生成時刻を明示します。",
      ],
      steps: [
        "必要な UUID の個数を設定します(1〜500)。",
        "Generate をクリック — リストが即座に表示されます。",
        "一括でコピーするか、クリアして新しいバッチを生成します。",
      ],
      faqs: [
        {
          q: "生成した UUID が重複することはありますか?",
          a: "理論上はありますが、実際にはありません。122 ビットのランダム性では、衝突には 10^36 個程度の生成が必要です — 現実の workload をはるかに超えています。",
        },
        {
          q: "v1 や v7 ではなく v4 を選ぶ理由は?",
          a: "v4 は時刻やハードウェアの情報を漏らさず、時計や MAC アドレスも不要です。DB のインデックスに優しい時刻順 ID が必要なら v7 を検討してください。単純な一意性なら v4 が標準です。",
        },
        {
          q: "UUID はサーバーで生成されますか?",
          a: "いいえ。あなたのブラウザの暗号学的乱数生成器から作られ、端末の外には出ません。",
        },
      ],
      deepDive: [
        {
          heading: "v4 UUID は実際どのくらいランダムか",
          paragraphs: [
            "バージョン 4 の UUID は 122 ビットの乱数を運びます。残る 6 ビットは形式で固定です — バージョン ニブルは常に 4、第 3 グループの 2 ビットはバリアント マーカー。この配置(xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx、y は 8、9、a、b のいずれか)は識別子が整形式の v4 かを素早く目検分する方法であり、v4 UUID がこれ以上圧縮できない理由でもあります。",
            "ID を一括生成するたびに衝突の問いが出ます。122 ビットの誕生日パラドックスの数学では、重複が現実味を持つには生成 10^36 個程度の順に必要 — どんな現実のワークロードよりもはるかに遠いです。実システムの実際の衝突は壊れた乱数性に遡り、形式には遡りません。複数サーバーで使い回すシード付き擬似乱数生成器、フィクスチャに書き込まれた固定 ID。形式は安全であり、合格すべきは乱源です。",
            "このツールは crypto.randomUUID — ブラウザの暗号学的に安全な乱源で、HTTPS セッションを守るのと同じプール — で生成するため、各識別子は予測不能で、推測不能なリソース ID として安心して使えます。一部の設計ではこの性質が生の唯一性より重要です。誰も列挙できない ID とは、適切に行われた隠蔽によるアクセス制御です — ただしサーバーが相変わらず認可を検査する前提で。",
          ],
        },
        {
          heading: "v4 と他のバージョンの取捨",
          paragraphs: [
            "バージョンの一族は異なる問いに答えます。v1 はタイムスタンプと、多くの場合生成マシンの MAC アドレスを埋め込みます — ソート可能ですが、どこでいつ作られたかを漏らし、文書 ID に現れた MAC アドレスは小さなプライバシー欠陥です。v4 はタイムスタンプもハードウェア識別も運ばず、何も漏らしません。それゆえ公開向け識別子の既定になりました。",
            "より新しい時間順のバージョン — v6 と v7(RFC 9562 が 2024 年に追加、v7 は Unix タイムスタンプに乱数を加える)— はまさにデータベース問題のために存在します。v4 の乱数性はインデックスを断片化し、時間順の ID は ULID のように挿入をクラスタ化します。キーが大きなインデックス付きテーブルに住むなら、書き込み局所性では v7 や ULID が v4 に勝ります。識別子が URL、トークン、ユーザーの見えるものに現れるなら、v4 の不透明性こそが機能です。",
            "実用的な経験則:どこでも v4 を既定とし、要件 — ソート可能性、埋め込み可能性、v1 しか受け付けないレガシー パーサー — が別のバージョンへ押しやるときだけ、意図的に変える。一つの識別子空間でバージョンを混ぜるのは合法です(バージョン ニブルが区別します)が、下流の検証は厳しくなります。消費側はもはや一つの形状を仮定できないからです。",
          ],
        },
        {
          heading: "あなたの端末上で、好きな量だけ生成",
          paragraphs: [
            "識別子はブラウザの暗号学的乱数生成器から来て、サーバーには触れません。最大 500 個のバッチが即座に現れ、オフラインで動き、何も記録も保存もされません。この局所性には実際のプライバシーの側面があります。他人の Web サイトで文書やサポート案件や未公開製品の ID を生成することは、その対象を第三者のログに結びつけます。ここでの生成は端末の外に痕跡を残しません。",
            "一括生成がよくあるワークフローです。テスト フィクスチャ、データベース シード、ファイル名、リクエスト ID、後で配布する API キーの草稿。バッチを生成し、ワンクリックでコピーし、そのリストを使い捨ての秘密として扱います — 必要な場所に貼り、クリアする。生成はローカルで無記録なので、バッチがあなたのデータへ向かう途中で第三者のサーバーを経由することはありません。",
            "どんな生成器にも当てはまる一つの注意。ブラウザの乱数性は強いですが、認証されたハードウェア源ではなく、厳格なコンプライアンス要件のある法域では鍵材料に認証されたエントロピーを求めることがあります。普通の識別子、リクエスト ID、フィクスチャ — 圧倒的多数の用途 — には、ブラウザの乱源は余裕で十分です。",
          ],
        },
      ],
    },
    es: {
      name: "Generador UUID",
      tagline:
        "Genera identificadores UUID v4 aleatorios en lote con un clic — de 1 a 500 cada vez, con la aleatoriedad criptográfica del navegador. Gratis e instantáneo.",
      intro: [
        "Crea UUID versión 4 (RFC 4122) en la cantidad que necesites: fixtures de prueba, semillas de base de datos, nombres de archivo, IDs de petición o borradores de claves API. Cada identificador sale de crypto.randomUUID, la fuente aleatoria criptográfica del navegador — 122 bits aleatorios, con colisiones que jamás verás en la práctica.",
        "A diferencia de las versiones basadas en tiempo (v1/v6/v7), v4 no lleva marca de tiempo ni filtra cuándo o dónde se creó — la página te lo aclara, junto con cuándo se generó tu lote.",
      ],
      steps: [
        "Indica cuántos UUID necesitas (1–500).",
        "Pulsa Generate — la lista aparece al instante.",
        "Cópialos todos de una vez, o borra y genera un lote nuevo.",
      ],
      faqs: [
        {
          q: "¿Pueden coincidir dos UUID generados?",
          a: "En teoría sí; en la práctica no. Con 122 bits aleatorios, hacer colisionar dos exige del orden de 10^36 UUID — muy por encima de cualquier carga de trabajo real.",
        },
        {
          q: "¿Por qué elegir v4 en lugar de v1 o v7?",
          a: "v4 no filtra información temporal ni de hardware y no depende de reloj ni MAC. Si necesitas IDs ordenables por tiempo y amables con el índice de la BD, mira v7 — para unicidad a secas, v4 es el estándar.",
        },
        {
          q: "¿Los UUID se generan en un servidor?",
          a: "No. Salen del generador aleatorio criptográfico de tu propio navegador y nunca salen de tu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Cuán aleatorio es realmente un UUID v4",
          paragraphs: [
            "Un UUID de versión 4 lleva 122 bits aleatorios; los otros 6 los fija el formato — el nibble de versión es siempre 4 y dos bits del tercer grupo son el marcador de variante. Ese diseño (xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, con y en 8, 9, a o b) es la comprobación visual rápida de si un identificador es un v4 bien formado, y también la razón de que un v4 no pueda comprimirse más de lo que ya es.",
            "La pregunta de colisión surge cada vez que alguien genera IDs en bloque. Con 122 bits, la matemática de la cota de cumpleaños dice que harían falta del orden de 10^36 UUID generados para que un duplicado se vuelva plausible — muy lejos de cualquier carga de trabajo realista. Las colisiones prácticas en sistemas reales se rastrean hasta aleatoriedad rota, no hasta el formato: un generador pseudoaleatorio con semilla reutilizado entre servidores, o un ID fijo escrito en un fixture. El formato es seguro; lo que debe estar a la altura es la fuente de aleatoriedad.",
            "Esta herramienta genera mediante crypto.randomUUID, la fuente criptográficamente segura del navegador — el mismo pool que protege las sesiones HTTPS — así que cada identificador es impredecible y seguro de usar como ID de recurso no adivinable. Esa propiedad importa más que la unicidad bruta en algunos diseños: un ID que nadie puede enumerar es control de acceso por oscuridad hecho correctamente, siempre que el servidor siga comprobando la autorización.",
          ],
        },
        {
          heading: "v4 frente a las otras versiones",
          paragraphs: [
            "La familia de versiones responde preguntas distintas. v1 incrusta un timestamp y a menudo la dirección MAC de la máquina generadora — ordenable, pero revela dónde y cuándo se hizo, y una MAC publicada en el ID de un documento es un pequeño defecto de privacidad. v4 no lleva timestamp ni identidad de hardware y no revela nada, por eso se volvió el valor por defecto para identificadores públicos.",
            "Las versiones ordenadas por tiempo más nuevas — v6 y v7, añadidas por RFC 9562 en 2024, con v7 usando un timestamp Unix más aleatoriedad — existen precisamente para el problema de la base de datos: la aleatoriedad de v4 fragmenta índices, mientras los IDs ordenados por tiempo agrupan las inserciones como hacen los ULID. Si tus claves viven en una tabla indexada grande, v7 o ULID le ganan a v4 en localidad de escritura; si tus identificadores aparecen en URLs, tokens o cualquier cosa visible al usuario, la opacidad de v4 es la característica.",
            "Una regla práctica: v4 como valor por defecto en todas partes, y cambiar deliberadamente cuando un requisito — ordenabilidad, incrustabilidad, un parser heredado que solo acepta v1 — te empuja a otra versión. Mezclar versiones en un mismo espacio de identificadores es legal (el nibble de versión las distingue) pero endurece la validación aguas abajo, ya que los consumidores ya no pueden asumir una sola forma.",
          ],
        },
        {
          heading: "Generado en tu dispositivo, en cualquier cantidad",
          paragraphs: [
            "Los identificadores salen del generador aleatorio criptográfico de tu navegador y no tocan ningún servidor: lotes de hasta 500 aparecen al instante, funcionan sin conexión y nada queda registrado o guardado. Esa localidad tiene un ángulo práctico de privacidad — generar un ID para un documento, un caso de soporte o un producto no publicado en el sitio web de otro ataría ese objeto a los logs de un tercero; aquí la generación no deja rastro fuera de tu dispositivo.",
            "La generación en bloque es el flujo habitual: fixtures de prueba, semillas de base de datos, nombres de archivo, IDs de petición, borradores de claves de API para repartir después. Genera el lote, cópialo de un clic y trata la lista como un secreto de un solo uso — pégala donde haga falta y bórrala. Como la generación es local y sin registro, un lote nunca transita por el servidor de un tercero camino a tus datos.",
            "Una advertencia aplicable a cualquier generador: la aleatoriedad del navegador es fuerte pero no es una fuente de hardware certificada, y jurisdicciones con requisitos estrictos de cumplimiento a veces exigen entropía certificada para material de claves. Para identificadores ordinarios, IDs de petición y fixtures — la gran mayoría de los usos — la fuente del navegador es más que suficiente.",
          ],
        },
      ],
    },
    pt: {
      name: "Gerador UUID",
      tagline:
        "Gere identificadores UUID v4 aleatórios em lote com um clique — de 1 a 500 por vez, usando a aleatoriedade criptográfica do navegador. Grátis e instantâneo.",
      intro: [
        "Crie UUIDs versão 4 (RFC 4122) na quantidade que precisar: fixtures de teste, seeds de banco de dados, nomes de arquivo, IDs de requisição ou rascunhos de chaves de API. Cada identificador vem de crypto.randomUUID, a fonte de aleatoriedade criptográfica do navegador — 122 bits aleatórios, com colisões que você nunca verá na prática.",
        "Diferente das versões baseadas em tempo (v1/v6/v7), o v4 não contém timestamp e não vaza quando nem onde foi criado — a página deixa isso claro e mostra quando o lote foi gerado.",
      ],
      steps: [
        "Defina quantos UUIDs você precisa (1–500).",
        "Clique em Generate — a lista aparece na hora.",
        "Copie todos de uma vez, ou limpe e gere um lote novo.",
      ],
      faqs: [
        {
          q: "Dois UUIDs gerados podem colidir?",
          a: "Teoricamente sim; na prática não. Com 122 bits aleatórios, uma colisão exige da ordem de 10^36 UUIDs — muito além de qualquer carga de trabalho real.",
        },
        {
          q: "Por que escolher v4 em vez de v1 ou v7?",
          a: "O v4 não vaza informação de tempo ou de hardware e não depende de relógio nem MAC. Se precisar de IDs ordenáveis por tempo e amigáveis ao índice do banco, veja o v7 — para unicidade pura, o v4 é o padrão.",
        },
        {
          q: "Os UUIDs são gerados num servidor?",
          a: "Não. Eles vêm do gerador aleatório criptográfico do seu próprio navegador e nunca saem do seu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Quão aleatório é realmente um UUID v4",
          paragraphs: [
            "Um UUID de versão 4 carrega 122 bits aleatórios; os outros 6 são fixados pelo formato — o nibble de versão é sempre 4 e dois bits do terceiro grupo são o marcador de variante. Esse layout (xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, com y em 8, 9, a ou b) é a checagem visual rápida de se um identificador é um v4 bem formado, e também a razão de um v4 não poder ser comprimido além do que já é.",
            "A pergunta de colisão surge toda vez que alguém gera IDs em lote. Com 122 bits, a matemática do limite do aniversário diz que fariam falta UUIDs gerados na ordem de 10^36 para que uma duplicata se tornasse plausível — muito além de qualquer carga de trabalho realista. Colisões práticas em sistemas reais rastreiam até aleatoriedade quebrada, não até o formato: um gerador pseudoaleatório com semente reutilizado entre servidores, ou um ID fixo escrito num fixture. O formato é seguro; o que precisa estar à altura é a fonte de aleatoriedade.",
            "Esta ferramenta gera através de crypto.randomUUID, a fonte criptograficamente segura do navegador — o mesmo pool que protege as sessões HTTPS — então cada identificador é imprevisível e seguro de usar como ID de recurso não adivinhável. Essa propriedade importa mais que unicidade bruta em alguns desenhos: um ID que ninguém pode enumerar é controle de acesso por obscuridade feito corretamente, contanto que o servidor ainda verifique a autorização.",
          ],
        },
        {
          heading: "v4 versus as outras versões",
          paragraphs: [
            "A família de versões responde perguntas diferentes. v1 embute um timestamp e muitas vezes o endereço MAC da máquina geradora — ordenável, mas revela onde e quando foi feito, e um MAC publicado no ID de um documento é um pequeno defeito de privacidade. v4 não carrega timestamp nem identidade de hardware e não revela nada, por isso virou o padrão para identificadores públicos.",
            "As versões ordenadas por tempo mais novas — v6 e v7, adicionadas pela RFC 9562 em 2024, com v7 usando um timestamp Unix mais aleatoriedade — existem precisamente para o problema do banco de dados: a aleatoriedade do v4 fragmenta índices, enquanto IDs ordenados por tempo agrupam inserções do jeito que os ULIDs fazem. Se suas chaves vivem numa tabela indexada grande, v7 ou ULID ganham de v4 em localidade de escrita; se seus identificadores aparecem em URLs, tokens ou qualquer coisa visível ao usuário, a opacidade do v4 é a característica.",
            "Uma regra prática: v4 como padrão em todo lugar, e mudar deliberadamente quando um requisito — ordenabilidade, embutibilidade, um parser legado que só aceita v1 — te empurra para outra versão. Misturar versões num mesmo espaço de identificadores é legal (o nibble de versão as distingue) mas endurece a validação a jusante, já que consumidores não podem mais assumir uma única forma.",
          ],
        },
        {
          heading: "Gerado no seu dispositivo, em qualquer quantidade",
          paragraphs: [
            "Os identificadores vêm do gerador aleatório criptográfico do seu navegador e não tocam nenhum servidor: lotes de até 500 aparecem instantaneamente, funcionam offline e nada fica registrado ou guardado. Essa localidade tem um ângulo prático de privacidade — gerar um ID para um documento, um caso de suporte ou um produto não publicado no site de outra pessoa amarraria aquele objeto aos logs de um terceiro; aqui a geração não deixa rastro fora do seu dispositivo.",
            "Geração em lote é o fluxo comum: fixtures de teste, sementes de banco de dados, nomes de arquivo, IDs de requisição, rascunhos de chaves de API para distribuir depois. Gere o lote, copie num clique e trate a lista como um segredo de uso único — cole onde precisar e limpe. Como a geração é local e sem registro, um lote nunca transita pelo servidor de um terceiro a caminho dos seus dados.",
            "Uma advertência aplicável a qualquer gerador: a aleatoriedade do navegador é forte mas não é uma fonte de hardware certificada, e jurisdições com requisitos rígidos de conformidade às vezes exigem entropia certificada para material de chaves. Para identificadores comuns, IDs de requisição e fixtures — a imensa maioria dos usos — a fonte do navegador é mais que suficiente.",
          ],
        },
      ],
    },
  },
});
