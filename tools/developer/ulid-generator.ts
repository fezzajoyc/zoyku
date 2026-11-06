import { DevEngineUlidGenerator } from "../_engines/dev-engine-ulid";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "ulid-generator",
  category: "developer",
  icon: "hash",
  engine: { component: DevEngineUlidGenerator },
  related: ["uuid-generator", "token-generator", "timestamp-converter", "json-formatter", "hash-generator", "cron-explainer", "base64-encoder"],
  copy: {
    en: {
      name: "ULID Generator",
      tagline: "Generate ULIDs — sortable 26-character unique identifiers with an embedded millisecond timestamp — and decode any ULID back to its creation time.",
      intro: [
        "UUIDv4 is random, so database rows carrying it sort into chaos: indexes fragment, time-ordered queries need a separate column. ULID (Universally Unique Lexicographically Sortable Identifier) fixes that by putting a 48-bit millisecond timestamp first, followed by 80 bits of randomness — 26 characters in Crockford Base32 that sort correctly as plain strings.",
        "The Crockford alphabet (0-9 and A-Z minus I, L, O, U) avoids characters that are routinely misread in handwriting and transcription: no I/1 confusion, no O/0. Generated here with crypto.getRandomValues for the random half and the clock for the timestamp half, both per the ULID spec.",
        "Beyond generating, paste any existing ULID to decode it: the embedded timestamp is extracted and shown as an ISO date, which turns every ULID in your logs into a creation-time record for free. Batch mode generates up to 50 at once, all sharing the same generation moment.",
      ],
      steps: [
        "Click Generate to create a batch of ULIDs (or paste one to decode it).",
        "Each ULID shows its embedded timestamp — the time it was created, in ISO format.",
        "Copy individual ULIDs or the whole list for your fixtures, database seeds or log analysis.",
      ],
      faqs: [
        {
          q: "Why choose ULID over UUIDv4?",
          a: "Sorting. A ULID's first 10 characters encode the creation timestamp, so lexicographic order equals chronological order — primary keys cluster in indexes, range scans on time work directly, and logs sort naturally. UUIDv4 has none of these properties; ULID keeps 128-bit collision resistance anyway.",
        },
        {
          q: "What is Crockford Base32 and why not hex or base64?",
          a: "Crockford Base32 uses 32 characters (digits plus A-Z without I, L, O, U) chosen to survive human transcription: no letter/number look-alikes, and it's case-insensitive. Compared with hex it's 25% denser; compared with base64 it avoids +, / and =, so it's URL-, filename- and XML-safe without escaping.",
        },
        {
          q: "Can two ULIDs generated in the same millisecond collide?",
          a: "They can't in practice: the 80 random bits give ~1.2 × 10²⁴ possibilities per millisecond. The ULID spec also defines monotonic generation (increment the random part within the same millisecond), which this generator's batch mode respects by construction — each batch entry is distinct.",
        },
      ],
      deepDive: [
        {
          heading: "Sortability: the difference that changes your index",
          paragraphs: [
            "A UUIDv4 primary key scatters new rows to random positions in the index. On B-tree storage that means page splits, cache misses and an ever-more-fragmented index as the table grows — a well-known operational pain on high-write tables. A ULID key always lands to the right of every earlier key, so inserts stay append-like and the index stays compact.",
            "Sortability also changes what queries you can write. With ULID keys, “give me everything created between 14:00 and 15:00” is a plain range scan over the primary key — no separate created_at index needed for coarse windows. Logs, event tables and message queues benefit most, because their access patterns are dominated by time.",
            "The trade-off is honest to state: ULIDs expose their creation time to anyone who sees the identifier, and consecutive IDs are predictable within the same millisecond. If identifiers must be opaque (sharing IDs publicly where enumeration matters), keep UUIDv4. For internal keys in logs and databases, ULID's ordering wins.",
          ],
        },
        {
          heading: "Crockford Base32 and reading identifiers aloud",
          paragraphs: [
            "The 26 characters of a ULID use Crockford Base32: digits 0-9 plus letters A-Z without I, L, O, U. Those four are excluded because in everyday transcription they collide with 1 and 0 — support tickets, verbal hand-offs and printed runbooks all involve humans copying identifiers by eye, and each confusion is a wrong-record bug.",
            "The encoding is also case-insensitive by convention (I and l both decode the same as 1), which forgives lowercase pastes from terminals and URLs. Compared with hex, Base32 packs 25% more information per character, which is why a 128-bit value takes 26 characters instead of 32. Compared with base64, there is no +, / or = — so the identifier is safe in URLs, filenames, XML attributes and DNS-adjacent contexts without any escaping layer.",
            "Decoding closes the loop: since the first 10 characters are pure timestamp, any ULID you find in an old log converts back to the exact millisecond it was born. That makes debugging sessions considerably friendlier — the identifier itself answers “when did this record come into existence?”.",
          ],
        },
        {
          heading: "Randomness, the clock, and what stays on your device",
          paragraphs: [
            "Generation here uses two sources: the timestamp half comes from your device clock, the 80 random bits from crypto.getRandomValues — the browser's cryptographic random source, the same primitive behind TLS session keys. No pre-computed table, no counter shared with a server, and no dependency on any online service being available.",
            "That also means generation is offline and unlimited. Preparing database seed data, fixtures for a test suite or a migration batch of thousands of identifiers works identically on a plane and in a locked-down data center; nothing is uploaded, logged or rate-limited, and decoding an existing ULID touches only your own clock and JavaScript.",
            "One practical caveat worth knowing: identifiers derived from a device clock inherit its accuracy. If a machine's clock is wrong, the ULIDs it produces sort correctly among themselves but sit at the wrong point in absolute time. For the vast majority of applications this is irrelevant — but keep it in mind when correlating ULIDs against external systems with strict time requirements.",
          ],
        },
      ],
    },
    zh: {
      name: "ULID 生成器",
      tagline: "生成可排序的 26 字符唯一标识符 ULID——自带毫秒时间戳,还能把任意 ULID 反解出创建时间。",
      intro: [
        "UUIDv4 是纯随机的,带着它的数据库记录排出来一团乱:索引碎片化,按时间查询还得另开一列。ULID(通用唯一可字典排序标识符)把 48 位毫秒时间戳放在最前面,后接 80 位随机数——26 个 Crockford Base32 字符,按普通字符串排序即为时间顺序。",
        "Crockford 字母表(0-9 加 A-Z 去掉 I、L、O、U)避开了手写和转写时最容易认错的字符:没有 I/1 混淆,没有 O/0 混淆。本工具的随机部分用 crypto.getRandomValues,时间部分取自系统时钟,完全符合 ULID 规范。",
        "除了生成,把已有的 ULID 粘贴进来即可解码:内嵌时间戳会被提取并以 ISO 日期显示——日志里的每个 ULID 从此自带创建时间。批量模式一次最多生成 50 个,时间戳取同一瞬间。",
      ],
      steps: [
        "点击生成得到一批 ULID(或粘贴一个进行解码)。",
        "每个 ULID 都显示内嵌时间戳——它的创建时间,ISO 格式。",
        "单独复制或整批复制,用于测试数据、数据库种子或日志分析。",
      ],
      faqs: [
        {
          q: "为什么选 ULID 而不是 UUIDv4?",
          a: "为了排序。ULID 前 10 个字符编码了创建时间戳,字典序即时间序——主键在索引里聚集、按时间的范围查询直接可用、日志自然排好。UUIDv4 没有这些性质;ULID 同时保持 128 位的抗碰撞性。",
        },
        {
          q: "Crockford Base32 是什么,为什么不用 hex 或 base64?",
          a: "Crockford Base32 用 32 个字符(数字加去掉 I、L、O、U 的 A-Z),专为人工转写设计:没有形近的字母数字混淆,且不区分大小写。比 hex 密集 25%;比 base64 少了 +、/ 和 =,放进 URL、文件名、XML 都不需要转义。",
        },
        {
          q: "同一毫秒生成的两个 ULID 会冲突吗?",
          a: "实际上不会:80 位随机数在同一毫秒内提供约 1.2 × 10²⁴ 种可能。ULID 规范还定义了单调生成(同毫秒内递增随机部分),本工具的批量模式天然满足——每批内的每个值互不相同。",
        },
      ],
      deepDive: [
        {
          heading: "可排序性:真正改变索引行为的差异",
          paragraphs: [
            "UUIDv4 主键让新行随机散落在索引各处。B 树存储上这意味着页分裂、缓存未命中,表越大索引碎片越严重——高写入表上众所周知的运维痛点。ULID 主键永远落在所有旧键的右边,插入保持接近追加写,索引保持紧凑。",
            "可排序性还改变了你能写出的查询。用 ULID 主键,“查 14 点到 15 点创建的数据”就是对主键做一次普通的范围扫描——粗粒度的时间窗口不再需要单独的 created_at 索引。日志表、事件表、消息队列受益最大,因为它们的访问模式被时间主导。",
            "代价也要如实说:看到标识符的任何人都能读出创建时间,同一毫秒内的连续 ID 也可预测。如果标识符必须不可解读(要公开分享、且存在被遍历的风险),继续用 UUIDv4。对日志和数据库里的内部主键,ULID 的有序性是净收益。",
          ],
        },
        {
          heading: "Crockford Base32 与大声读标识符这件事",
          paragraphs: [
            "ULID 的 26 个字符使用 Crockford Base32:数字 0-9 加上去掉 I、L、O、U 的字母 A-Z。排除这四个字母,是因为日常转写中它们会和 1、0 混淆——工单、口头交接、打印的运维手册都靠人眼抄标识符,每错一个就是一条错误记录的事故。",
            "这套编码按惯例不区分大小写(I 和 l 都按 1 解码),终端和 URL 里贴来的小写串也能认。相比 hex,Base32 每个字符多装 25% 的信息,所以 128 位只要 26 个字符而不是 32 个。相比 base64,没有 +、/ 和 =——放进 URL、文件名、XML 属性、DNS 相邻场景都不需要转义层。",
            "解码让闭环完整:前 10 个字符就是纯时间戳,老日志里翻出的任何 ULID 都能换算回出生的那一毫秒。调试体验因此好很多——标识符自己就能回答“这条记录是什么时候出现的”。",
          ],
        },
        {
          heading: "随机数、时钟,以及留在你设备上的东西",
          paragraphs: [
            "这里的生成只用两个来源:时间戳一半取自设备时钟,80 位随机数取自 crypto.getRandomValues——浏览器的加密随机源,和 TLS 会话密钥背后是同一原语。没有预计算表,没有与服务器共享的计数器,也不依赖任何在线服务可用。",
            "这也意味着生成离线可用、没有上限。准备数据库种子、测试夹具、成千上万条标识符的迁移批,在飞机上和在内网数据中心里表现完全一致;不上传、不记日志、不限速,解码已有 ULID 也只动你自己的时钟和 JavaScript。",
            "一个值得知道的实用警告:来自设备时钟的标识符继承时钟的精度。机器时钟不准时,它产出的 ULID 内部排序仍然正确,但在绝对时间轴上位置不对。对绝大多数应用无关紧要——但要把 ULID 和有严格时间要求的外部系统做对照时,记得这一点。",
          ],
        },
      ],
    },
    ja: {
      name: "ULID ジェネレーター",
      tagline: "ミリ秒タイムスタンプを内蔵したソート可能な 26 文字の一意識別子 ULID を生成。既存の ULID から作成時刻を復元することもできます。",
      intro: [
        "UUIDv4 は完全にランダムなため、それを主キーに持つデータベースの行はソートが混沌とします:インデックスは断片化し、時間軸のクエリには別カラムが必要です。ULID( universally unique lexicographically sortable identifier)は 48 ビットのミリ秒タイムスタンプを先頭に置き、続いて 80 ビットのランダム値 — Crockford Base32 の 26 文字で、普通の文字列としてソートすると時系列順になります。",
        "Crockford アルファベット(0-9 と I・L・O・U を除く A-Z)は、手書きや転記で誤読しやすい文字を排除しています:I/1 の混同も O/0 の混同もありません。ランダム部は crypto.getRandomValues、タイムスタンプ部はシステムクロックを使用し、ULID 仕様に完全に準拠します。",
        "生成だけでなく、既存の ULID を貼り付ければデコードできます:内蔵タイムスタンプが抽出され ISO 日付で表示されるため、ログ内のすべての ULID が作成時刻の記録を兼ねます。バッチモードでは最大 50 個を同時に生成し、すべて同じ瞬間のタイムスタンプを持ちます。",
      ],
      steps: [
        "生成をクリックして ULID のバッチを作成(または 1 個貼り付けてデコード)。",
        "各 ULID には内蔵タイムスタンプ — ISO 形式の作成時刻 — が表示されます。",
        "テストデータ・DB シード・ログ分析用に、個別または一括でコピーします。",
      ],
      faqs: [
        {
          q: "UUIDv4 ではなく ULID を選ぶ理由は?",
          a: "ソートのためです。ULID の最初の 10 文字は作成タイムスタンプを符号化するため、辞書順 = 時系列順になります — 主キーはインデックスでクラスター化され、時間範囲のスキャンが直接動き、ログも自然に並びます。UUIDv4 にはこれらの性質がなく、ULID は 128 ビットの衝突耐性も維持します。",
        },
        {
          q: "Crockford Base32 とは?hex や base64 ではなく?",
          a: "Crockford Base32 は 32 文字(数字と I・L・O・U を除く A-Z)を使い、人間の転記に耐えるよう設計されています:似ている文字の混同がなく、大文字小文字を区別しません。hex より 25% 高密度で、base64 と違い +、/、= を含まないため URL・ファイル名・XML でエスケープ不要です。",
        },
        {
          q: "同じミリ秒に生成した 2 つの ULID は衝突しますか?",
          a: "実際にはしません:80 ランダムビットは 1 ミリ秒あたり約 1.2 × 10²⁴ 通りを提供します。ULID 仕様には単調生成(同ミリ秒内でランダム部をインクリメント)も定義されており、このジェネレーターのバッチモードは構造上それを満たします — バッチ内の各値は互いに異なります。",
        },
      ],
      deepDive: [
        {
          heading: "ソート可能性:インデックスの挙動を変える差",
          paragraphs: [
            "UUIDv4 の主キーは新しい行をインデックスのランダムな位置に散らします。B-tree 保管ではページ分割、キャッシュミス、テーブルの成長とともに進む断片化を意味し、高書き込みテーブルではよく知られた運用の悩みです。ULID の主キーは常にすべての旧キーの右側に着地するので、挿入は追記に近く、インデックスはコンパクトを保ちます。",
            "ソート可能性は書けるクエリも変えます。ULID キーなら「14 時から 15 時に作成されたデータ」は主キーへの普通の範囲スキャンです。粗い時間窓なら別途 created_at インデックスは不要です。ログ、イベントテーブル、メッセージキューの恩恵が最大で、これらのアクセスパターンは時間が支配するからです。",
            "トレードオフも正直に述べます。識別子を見た人は誰でも作成時刻が読め、同一ミリ秒内の連続 ID は予測可能です。識別子が不透明である必要がある場合(列挙リスクがある公開共有)は UUIDv4 を使い続けてください。ログやデータベースの内部キーなら、ULID の順序性は純利益です。",
          ],
        },
        {
          heading: "Crockford Base32 と識別子の音読",
          paragraphs: [
            "ULID の 26 文字は Crockford Base32 を使います。数字 0-9 と、I・L・O・U を除く A-Z です。この 4 文字が外されるのは、日常の転記で 1 と 0 と紛れるからです。サポート チケット、口頭の引き継ぎ、印刷されたランブックはすべて人間が識別子を目で写す場面で、一つの取り違えが誤レコードの障害になります。",
            "この符号化は慣習として大文字小文字を区別しません(I も l も 1 と同じに復号)。ターミナルや URL から貼られた小文字も受け入れます。hex に比べて Base32 は文字あたり 25% 多くの情報を詰め込めるため、128 ビットが 32 文字でなく 26 文字で済みます。base64 と違って +、/、= を含まないので、URL・ファイル名・XML 属性・DNS 周辺の文脈でもエスケープ層なしで安全です。",
            "復号で輪が閉じます。最初の 10 文字は純粋なタイムスタンプなので、古いログで見つけた ULID はすべて、生まれたそのミリ秒に変換し直せます。デバッグはかなり楽になります。識別子そのものが「このレコードはいつ生まれたのか」に答えるからです。",
          ],
        },
        {
          heading: "乱数、時計、そして端末に留まるもの",
          paragraphs: [
            "ここの生成は 2 つの源を使います。タイムスタンプ部は端末の時計から、80 ランダムビットは crypto.getRandomValues から — ブラウザの暗号学的乱数源で、TLS セッション鍵と同じプリミティブです。事前計算テーブルも、サーバーと共有するカウンターもなく、オンライン サービスの可用性に依存しません。",
            "つまり生成はオフラインで無制限です。DB シード、テストフィクスチャ、数千件の識別子を含む移行バッチの準備が、機内でも閉鎖的なデータセンターでも同一に動きます。アップロードも記録もレート制限もなく、既存 ULID の復号も自分の時計と JavaScript だけに触れます。",
            "実用上の注意を一つ。端末の時計に由来する識別子は時計の精度も引き継ぎます。時計がずれたマシンが作った ULID は互いの順序としては正しいのに、絶対時間軸ではずれた位置に座ります。ほとんどの用途では無関係ですが、ULID を厳密な時間要件を持つ外部システムと突き合わせるときは覚えておいてください。",
          ],
        },
      ],
    },
    es: {
      name: "Generador ULID",
      tagline: "Genera ULIDs — identificadores únicos de 26 caracteres, ordenables, con marca de tiempo en milisegundos incluida — y decodifica cualquier ULID a su hora de creación.",
      intro: [
        "UUIDv4 es aleatorio, así que las filas que lo llevan se ordenan en caos: los índices se fragmentan y las consultas por tiempo necesitan una columna aparte. ULID (identificador universal único lexicográficamente ordenable) lo arregla poniendo primero una marca de tiempo de 48 bits en milisegundos, seguida de 80 bits aleatorios — 26 caracteres en Crockford Base32 que se ordenan correctamente como cadenas planas.",
        "El alfabeto Crockford (0-9 y A-Z sin I, L, O, U) evita los caracteres que se confunden al copiar a mano: ni I/1 ni O/0. Aquí se genera con crypto.getRandomValues para la mitad aleatoria y el reloj para la temporal, conforme a la especificación ULID.",
        "Además de generar, pega cualquier ULID existente para decodificarlo: la marca de tiempo incrustada se extrae y se muestra como fecha ISO, con lo que cada ULID de tus registros se convierte gratis en un registro de hora de creación. El modo por lotes genera hasta 50 de una vez, todos con el mismo instante.",
      ],
      steps: [
        "Pulsa Generar para crear un lote de ULIDs (o pega uno para decodificarlo).",
        "Cada ULID muestra su marca de tiempo incrustada — su hora de creación, en formato ISO.",
        "Copia ULIDs individuales o la lista completa para fixtures, seeds de base de datos o análisis de logs.",
      ],
      faqs: [
        {
          q: "¿Por qué ULID en vez de UUIDv4?",
          a: "Por el orden. Los primeros 10 caracteres de un ULID codifican su marca temporal, así que el orden lexicográfico es el cronológico — las claves primarias se agrupan en los índices, los escaneos por rango de tiempo funcionan directo y los logs se ordenan solos. UUIDv4 no tiene ninguna de esas propiedades; ULID conserva igualmente 128 bits de resistencia a colisiones.",
        },
        {
          q: "¿Qué es Crockford Base32 y por qué no hex o base64?",
          a: "Crockford Base32 usa 32 caracteres (dígitos más A-Z sin I, L, O, U) elegidos para sobrevivir a la transcripción humana: sin parecidos letra/número, y no distingue mayúsculas. Frente a hex es 25% más denso; frente a base64 evita +, / y =, así que es seguro en URLs, nombres de archivo y XML sin escapar nada.",
        },
        {
          q: "¿Colisionan dos ULIDs del mismo milisegundo?",
          a: "En la práctica no: los 80 bits aleatorios dan ~1,2 × 10²⁴ posibilidades por milisegundo. La especificación ULID también define generación monótona (incrementar la parte aleatoria dentro del mismo milisegundo), que el modo por lotes de este generador respeta por construcción — cada elemento del lote es distinto.",
        },
      ],
      deepDive: [
        {
          heading: "Ordenabilidad: la diferencia que cambia tu índice",
          paragraphs: [
            "Una clave primaria UUIDv4 esparce las filas nuevas en posiciones aleatorias del índice. En almacenamiento B-tree eso significa divisiones de página, fallos de caché y un índice cada vez más fragmentado a medida que la tabla crece — un dolor operativo bien conocido en tablas con muchas escrituras. Una clave ULID siempre aterriza a la derecha de todas las anteriores, así que las inserciones se mantienen casi como apéndices y el índice queda compacto.",
            "La ordenabilidad también cambia las consultas que puedes escribir. Con claves ULID, “dame todo lo creado entre las 14:00 y las 15:00” es un simple escaneo por rango sobre la clave primaria — sin necesidad de un índice aparte de created_at para ventanas de tiempo gruesas. Logs, tablas de eventos y colas de mensajes son las más beneficiadas, porque sus patrones de acceso están dominados por el tiempo.",
            "El contrapeso hay que decirlo: un ULID expone su hora de creación a cualquiera que vea el identificador, y los ID consecutivos son predecibles dentro del mismo milisegundo. Si los identificadores deben ser opacos (compartirlos públicamente cuando la enumeración importa), quédate con UUIDv4. Para claves internas en logs y bases de datos, el orden de ULID gana.",
          ],
        },
        {
          heading: "Crockford Base32 y leer identificadores en voz alta",
          paragraphs: [
            "Los 26 caracteres de un ULID usan Crockford Base32: dígitos 0-9 más letras A-Z sin I, L, O, U. Esas cuatro se excluyen porque en la transcripción cotidiana colisionan con 1 y 0 — los tickets de soporte, los traspasos verbales y los runbooks impresos implican humanos copiando identificadores a la vista, y cada confusión es un bug de registro equivocado.",
            "La codificación tampoco distingue mayúsculas por convención (I y l decodifican igual que 1), lo que perdona los pegados en minúsculas desde terminales y URLs. Frente a hex, Base32 empaqueta un 25% más de información por carácter, por eso un valor de 128 bits ocupa 26 caracteres y no 32. Frente a base64, no hay +, / ni = — así que el identificador es seguro en URLs, nombres de archivo, atributos XML y contextos cercanos a DNS sin ninguna capa de escape.",
            "La decodificación cierra el círculo: como los primeros 10 caracteres son puro timestamp, cualquier ULID encontrado en un log antiguo se convierte de vuelta al milisegundo exacto en que nació. Las sesiones de depuración se vuelven bastante más amables — el propio identificador responde a “¿cuándo existió este registro?”.",
          ],
        },
        {
          heading: "Aleatoriedad, reloj y lo que se queda en tu equipo",
          paragraphs: [
            "La generación aquí usa dos fuentes: la mitad de timestamp viene del reloj de tu dispositivo y los 80 bits aleatorios de crypto.getRandomValues — la fuente criptográfica del navegador, la misma primitiva detrás de las claves de sesión TLS. Sin tablas precalculadas, sin contadores compartidos con un servidor y sin depender de que un servicio online esté disponible.",
            "Eso también significa generación offline e ilimitada. Preparar datos semilla de base de datos, fixtures para una suite de tests o un lote de migración de miles de identificadores funciona igual en un avión que en un centro de datos cerrado; nada se sube, se registra ni limita, y decodificar un ULID existente solo toca tu propio reloj y JavaScript.",
            "Una advertencia práctica que conviene conocer: los identificadores derivados del reloj de un dispositivo heredan su precisión. Si el reloj de una máquina está mal, los ULIDs que produce se ordenan bien entre sí pero caen en el punto equivocado del tiempo absoluto. Para la gran mayoría de aplicaciones es irrelevante — pero tenlo presente cuando correlaciones ULIDs con sistemas externos de requisitos temporales estrictos.",
          ],
        },
      ],
    },
    pt: {
      name: "Gerador ULID",
      tagline: "Gere ULIDs — identificadores únicos de 26 caracteres, ordenáveis, com timestamp em milissegundos embutido — e decodifique qualquer ULID de volta à sua hora de criação.",
      intro: [
        "UUIDv4 é aleatório, então registros que o carregam se ordenam no caos: índices se fragmentam e consultas por tempo precisam de uma coluna separada. ULID (identificador universalmente único lexicograficamente ordenável) resolve isso colocando primeiro um timestamp de 48 bits em milissegundos, seguido de 80 bits aleatórios — 26 caracteres em Crockford Base32 que se ordenam corretamente como strings simples.",
        "O alfabeto Crockford (0-9 e A-Z sem I, L, O, U) evita os caracteres que a transcrição manual mais confunde: nada de I/1 ou O/0. Aqui a metade aleatória usa crypto.getRandomValues e a temporal usa o relógio, conforme a especificação ULID.",
        "Além de gerar, cole qualquer ULID existente para decodificá-lo: o timestamp embutido é extraído e exibido como data ISO — cada ULID nos seus logs vira, de graça, um registro de hora de criação. O modo em lote gera até 50 de uma vez, todos no mesmo instante.",
      ],
      steps: [
        "Clique em Gerar para criar um lote de ULIDs (ou cole um para decodificar).",
        "Cada ULID mostra seu timestamp embutido — a hora de criação, em formato ISO.",
        "Copie ULIDs individuais ou a lista inteira para fixtures, seeds de banco ou análise de logs.",
      ],
      faqs: [
        {
          q: "Por que ULID em vez de UUIDv4?",
          a: "Pela ordenação. Os 10 primeiros caracteres de um ULID codificam o timestamp de criação, então a ordem lexicográfica é a cronológica — chaves primárias se agrupam nos índices, varreduras por faixa de tempo funcionam direto e logs se ordenam naturalmente. UUIDv4 não tem nenhuma dessas propriedades; ULID mantém 128 bits de resistência a colisões.",
        },
        {
          q: "O que é Crockford Base32 e por que não hex ou base64?",
          a: "Crockford Base32 usa 32 caracteres (dígitos mais A-Z sem I, L, O, U) escolhidos para sobreviver à transcrição humana: sem confusões letra/número, e não diferencia maiúsculas. É 25% mais denso que hex; ao contrário do base64, evita +, / e =, sendo seguro em URLs, nomes de arquivo e XML sem escaping.",
        },
        {
          q: "Dois ULIDs gerados no mesmo milissegundo colidem?",
          a: "Na prática não: os 80 bits aleatórios dão ~1,2 × 10²⁴ possibilidades por milissegundo. A especificação ULID também define geração monotônica (incrementar a parte aleatória dentro do mesmo milissegundo), que o modo em lote deste gerador respeita por construção — cada item do lote é distinto.",
        },
      ],
      deepDive: [
        {
          heading: "Ordenabilidade: a diferença que muda seu índice",
          paragraphs: [
            "Uma chave primária UUIDv4 espalha as linhas novas em posições aleatórias do índice. Em armazenamento B-tree isso significa divisões de página, faltas de cache e um índice cada vez mais fragmentado conforme a tabela cresce — uma dor operacional bem conhecida em tabelas com muitas escritas. Uma chave ULID sempre aterrissa à direita de todas as anteriores, então as inserções ficam quase como append e o índice permanece compacto.",
            "A ordenabilidade também muda as consultas que você pode escrever. Com chaves ULID, \"me dê tudo criado entre 14:00 e 15:00\" é uma simples varredura por faixa na chave primária — sem precisar de um índice separado de created_at para janelas de tempo grosseiras. Logs, tabelas de eventos e filas de mensagens são as maiores beneficiadas, porque seus padrões de acesso são dominados pelo tempo.",
            "O contrapeso precisa ser dito: um ULID expõe a hora de criação a qualquer um que veja o identificador, e IDs consecutivos são previsíveis dentro do mesmo milissegundo. Se os identificadores precisam ser opacos (compartilhar publicamente quando enumeração importa), fique com UUIDv4. Para chaves internas em logs e bancos de dados, a ordenação do ULID vence.",
          ],
        },
        {
          heading: "Crockford Base32 e ler identificadores em voz alta",
          paragraphs: [
            "Os 26 caracteres de um ULID usam Crockford Base32: dígitos 0-9 mais letras A-Z sem I, L, O, U. Essas quatro são excluídas porque na transcrição cotidiana colidem com 1 e 0 — tickets de suporte, repasses verbais e runbooks impressos envolvem humanos copiando identificadores a olho, e cada confusão é um bug de registro errado.",
            "A codificação também não diferencia maiúsculas por convenção (I e l decodificam igual que 1), o que perdoa colas em minúsculas vindas de terminais e URLs. Comparado a hex, Base32 empacota 25% mais informação por caractere, por isso um valor de 128 bits ocupa 26 caracteres e não 32. Comparado a base64, não há +, / nem = — então o identificador é seguro em URLs, nomes de arquivo, atributos XML e contextos vizinhos de DNS sem qualquer camada de escape.",
            "A decodificação fecha o círculo: como os primeiros 10 caracteres são puro timestamp, qualquer ULID achado num log antigo se converte de volta ao milissegundo exato em que nasceu. As sessões de depuração ficam bem mais amigáveis — o próprio identificador responde a \"quando este registro passou a existir?\".",
          ],
        },
        {
          heading: "Aleatoriedade, relógio e o que fica no seu aparelho",
          paragraphs: [
            "A geração aqui usa duas fontes: a metade de timestamp vem do relógio do seu dispositivo e os 80 bits aleatórios de crypto.getRandomValues — a fonte criptográfica do navegador, a mesma primitiva por trás das chaves de sessão TLS. Sem tabelas pré-computadas, sem contadores compartilhados com um servidor, e sem depender de um serviço online estar disponível.",
            "Isso também significa geração offline e ilimitada. Preparar dados semeados de banco, fixtures para uma suíte de testes ou um lote de migração de milhares de identificadores funciona igual num avião e num centro de dados fechado; nada é enviado, registrado ou limitado, e decodificar um ULID existente toca apenas o seu próprio relógio e JavaScript.",
            "Uma advertência prática que vale conhecer: identificadores derivados do relógio de um aparelho herdam sua precisão. Se o relógio de uma máquina está errado, os ULIDs que ela produz se ordenam bem entre si mas caem no ponto errado do tempo absoluto. Para a grande maioria das aplicações isso é irrelevante — mas lembre-se disso quando correlacionar ULIDs com sistemas externos de requisitos temporais rígidos.",
          ],
        },
      ],
    },
  },
});
