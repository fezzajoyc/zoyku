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
    },
  },
});
