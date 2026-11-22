import { DevEngineIpv6 } from "../_engines/dev-engine-ipv6";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "ipv6-expand-compress",
  category: "developer",
  icon: "globe",
  engine: { component: DevEngineIpv6 },
  related: ["ipv4-subnet-calculator", "ipv4-range-expander", "dns-lookup", "http-status-codes"],
  copy: {
    en: {
      name: "IPv6 Expand & Compress",
      tagline:
        "Expand IPv6 to its full 8-group form and compress to RFC 5952 canonical form simultaneously — brackets and zone indices stripped automatically, IPv4-mapped addresses preserved. Free, instant, offline.",
      intro: [
        "IPv6 addresses can be written in many ways: full form, zero-compressed form, mixed case, with or without brackets. This tool takes any valid representation and produces both the RFC 5952 canonical compressed form and the full expanded form simultaneously — so you can always see exactly what an address represents.",
        "The compression follows RFC 5952 precisely: the longest zero run (2 or more groups) becomes ::, leading zeros within groups are stripped, the output is lowercase, and when two zero runs tie the first one is compressed. IPv4-mapped addresses (::ffff:0:0/96) keep the dotted-decimal tail per the standard.",
        "Square brackets (from URL context) and zone indices (%eth0) are stripped automatically. Invalid addresses — multiple ::, wrong group counts, characters outside hex — are rejected with the specific problem stated. Everything runs locally; no network calls.",
      ],
      steps: [
        "Paste any valid IPv6 address — brackets, mixed case and abbreviations are all handled.",
        "Click Convert — both the compressed and expanded forms appear below, each with a copy button.",
        "Use the compressed form for display and URLs; use the expanded form for binary operations and comparisons.",
      ],
      faqs: [
        {
          q: "What is the RFC 5952 canonical form?",
          a: "It is the standard way to write an IPv6 address so that every address has exactly one representation: lowercase hex, no leading zeros, and the longest run of zero groups (2+) compressed to ::, choosing the first run when there is a tie. Without this standard, 2001:db8:0:0:1::1 and 2001:db8::1:0:0:0 could refer to the same address but never match in a string comparison.",
        },
        {
          q: "Why does ::ffff:192.168.1.1 keep the dotted notation?",
          a: "This is an IPv4-mapped address (::ffff:0:0/96). RFC 5952 section 5 says the last 32 bits of such addresses should be represented in IPv4 dotted-decimal notation because they semantically represent an IPv4 address, not four hex groups. All other addresses use pure hex.",
        },
      ],
      deepDive: [
        {
          heading: "How the :: abbreviation rules actually work",
          paragraphs: [
            "RFC 4291 allows one :: per address to represent the longest run of consecutive zero groups. The compression in RFC 5952 adds precision: when two runs are the same length, the first one is compressed; a run of a single group (like ff00:0042) is not compressed because a single zero group is shorter to write as 0 than as ::.",
            "The practical consequence is that :: can represent 1 to 7 zero groups — never 0 (that would be the full form) and never 8 (a bare :: is technically the all-zero address). The tool rejects multiple :: and addresses where the group count would exceed 8 after expansion.",
            "IPv4-mapped addresses (::ffff:0:0/96) embed a 32-bit IPv4 address in the last two groups. RFC 5952 §5 requires these to keep the dotted-decimal tail rather than expanding to hex groups, because the semantic meaning is IPv4. This is the one case where the compressed and expanded forms use different notations for the same bits.",
          ],
        },
        {
          heading: "Zone indices, brackets, and edge cases",
          paragraphs: [
            "Link-local addresses (fe80::/10) can carry a zone index (e.g. fe80::1%eth0) to disambiguate interfaces. This tool strips the %zone suffix before parsing, since zone indices are system-local and have no place in a normalized output.",
            "Square brackets [] are stripped because they come from URL context (http://[2001:db8::1]/path) — they delimit the address for URI parsing but are not part of the address itself. Mixed input like [2001:DB8::1] is uppercased, lowercased, bracket-stripped and compressed in a single pass.",
            "The expanded form always shows exactly 8 groups of 4 hexadecimal digits, zero-padded — this is the format for /proc/net/if_inet6, firewall rules and DNS AAAA records. The compressed form is the human-facing and URL-facing format per RFC 5952. Both represent the same 128-bit value.",
          ],
        },
      ],
    },
    zh: {
      name: "IPv6 压缩与展开",
      tagline:
        "IPv6 地址双向转换——同时输出 RFC 5952 规范压缩与完整展开,方括号与区号自动去除,IPv4 映射保留点分尾部。免费、即时、离线可用。",
      intro: [
        "IPv6 地址有多种写法:完整形式、零压缩形式、大小写混合、带或不带方括号。本工具取任意合法表示,同时输出 RFC 5952 规范压缩与完整展开——让你始终看清楚一个地址到底代表什么。",
        "压缩严格遵循 RFC 5952:最长零段(2 组及以上)缩为 ::,组内前导零去除,输出小写,等长零段取首段。IPv4 映射地址(::ffff:0:0/96)按标准保留点分尾部。",
        "方括号(URL 上下文)与区号(%eth0)自动去除。非法地址——多个 ::、组数错误、hex 之外字符——会被拒绝并说明具体问题。全部本机完成,无网络调用。",
      ],
      steps: [
        "粘贴任意合法 IPv6 地址——方括号、大小写混合与缩写都自动处理。",
        "点击转换——压缩与展开两种形式同时显示,各带复制按钮。",
        "压缩形式用于显示与 URL;展开形式用于二进制运算与比较。",
      ],
      faqs: [
        {
          q: "什么是 RFC 5952 规范形式?",
          a: "它是 IPv6 地址的唯一标准写法:小写十六进制、无前导零、最长零段(2 组及以上)缩为 ::,等长时取首段。没有这个标准,2001:db8:0:0:1::1 和 2001:db8::1:0:0:0 可能指同一地址但字符串永不匹配。",
        },
        {
          q: "为什么 ::ffff:192.168.1.1 保留点分记法?",
          a: "这是 IPv4 映射地址(::ffff:0:0/96)。RFC 5952 第 5 节规定此类地址的末 32 位用 IPv4 点分十进制表示,因为它们语义上是 IPv4 地址而非四个十六进制组。其他地址一律用纯 hex。",
        },
      ],
      deepDive: [
        {
          heading: ":: 缩写规则的实际运作",
          paragraphs: [
            "RFC 4291 允许每个地址使用一次 :: 来代表最长的连续零段。RFC 5952 的压缩加了精度约束:当两段零段等长时取第一段压缩;单组零段(如 ff00:0042 里的 0042)不缩,因为单组写 0 比写 :: 更短。",
            "实际后果是 :: 只能代表 1 到 7 组零——不能代表 0(那会是完整形式)也不能代表 8(裸 :: 技术上就是全零地址)。本工具拒绝多 ::,以及在展开后组数会超过 8 的地址。",
            "IPv4 映射地址(::ffff:0:0/96)在末两组内嵌入 32 位 IPv4 地址。RFC 5952 §5 要求这些地址保留点分十进制尾部而不是展开为 hex 组——因为语义上它们是 IPv4 地址。这是压缩与展开形式对同样的比特使用不同记法的唯一特例。",
          ],
        },
        {
          heading: "区号、方括号与边界情况",
          paragraphs: [
            "链路本地地址(fe80::/10)可携带区号(如 fe80::1%eth0)以区分接口。本工具在解析前剥离 %zone 后缀,因为区号是系统本地的,不属于地址本身的规范化输出。",
            "方括号 [] 被剥离因为它们来自 URL 上下文(http://[2001:db8::1]/path)——方括号为 URI 解析定界地址,但不是地址的一部分。混合输入如 [2001:DB8::1] 在单次处理中完成大写转小写、去括号与压缩。",
            "展开形式始终精确显示 8 组 4 位十六进制数字(零填充)——这是 /proc/net/if_inet6、防火墙规则与 DNS AAAA 记录的格式。压缩形式是面向人类与 URL 的 RFC 5952 格式。两者代表同一个 128 位值。",
          ],
        },
      ],
    },
    ja: {
      name: "IPv6 展開・圧縮",
      tagline:
        "IPv6 アドレスの双方向変換 — RFC 5952 規範圧縮と完全展開を同時に出力。角括弧とゾーンインデックスは自動除去、IPv4 マップアドレスのドット記法を保持。無料・即時・オフライン。",
      intro: [
        "IPv6 アドレスには多くの書き方があります:完全形式、ゼロ圧縮形式、大小混在、角括弧ありなしなど。本ツールは任意の有効な表現を受け取り、RFC 5952 規範圧縮と完全展開を同時に出力 — アドレスが実際に何を表すのか常に把握できます。",
        "圧縮は RFC 5952 に厳密に従います:最長ゼロラン(2 グループ以上)を :: にし、グループ内の先行ゼロを取り除き、出力は小文字。同長のゼロランでは最初のものを圧縮。IPv4 マップアドレス(::ffff:0:0/96)は標準に従いドット区切りを保持します。",
        "角括弧(URL コンテキスト)とゾーンインデックス(%eth0)は自動で除去。不正なアドレス — 複数の ::、グループ数の誤り、hex 以外の文字 — は具体的な問題とともに拒否されます。すべてローカルで、ネットワーク呼び出しなし。",
      ],
      steps: [
        "任意の有効な IPv6 アドレスを貼り付け — 角括弧・大小混在・省略はすべて自動処理。",
        "変換をクリック — 圧縮と展開の両方が下に表示され、各コピーボタンが付きます。",
        "表示や URL には圧縮形式を、バイナリ操作や比較には展開形式を使用してください。",
      ],
      faqs: [
        {
          q: "RFC 5952 規範形式とは?",
          a: "IPv6 アドレスが唯一の表現を持つための標準的な書き方です:小文字 hex、先行ゼロなし、最長ゼロラン(2 グループ以上)を :: に圧縮、同長では最初のランを選択。この標準がないと、2001:db8:0:0:1::1 と 2001:db8::1:0:0:0 は同じアドレスでも文字列比較では決して一致しません。",
        },
        {
          q: "::ffff:192.168.1.1 がドット記法を保持するのはなぜ?",
          a: "これは IPv4 マップアドレス(::ffff:0:0/96)です。RFC 5952 §5 では、このようなアドレスの末尾 32 ビットは IPv4 アドレスを意味するためドット区切り十進で表現すると規定されています。他のアドレスはすべて純粋な hex です。",
        },
      ],
      deepDive: [
        {
          heading: ":: 省略規則の実際の動作",
          paragraphs: [
            "RFC 4291 は各アドレスに一度の :: を許可し、連続するゼログループの最長ランを表します。RFC 5952 の圧縮は精度を加えます:同長のランがある場合最初のものが圧縮され、単一グループのゼロラン(ff00:0042 の 0042 など)は :: より 0 と書く方が短いため圧縮されません。",
            "実際の結果として、:: は 1〜7 グループのゼロを表します — 0(完全形式になる)も 8(裸の :: は技術的に全ゼロアドレス)も表しません。本ツールは複数の :: と、展開後にグループ数が 8 を超えるアドレスを拒否します。",
            "IPv4 マップアドレス(::ffff:0:0/96)は末尾の 2 グループに 32 ビットの IPv4 アドレスを埋め込みます。RFC 5952 §5 はこれらにドット区切り十進のテールを保持することを要求します — セマンティクスが IPv4 アドレスだからです。圧縮形と展開形が同じビットに異なる記法を使う唯一の特例です。",
          ],
        },
        {
          heading: "ゾーンインデックス、角括弧、エッジケース",
          paragraphs: [
            "リンクローカルアドレス(fe80::/10)はゾーンインデックス(fe80::1%eth0 など)を持ち、インターフェースを区別します。本ツールはパース前に %zone 接尾辞を剥がします — ゾーンインデックスはシステムローカルで、正規化された出力の一部ではありません。",
            "角括弧 [] は URL コンテキスト(http://[2001:db8::1]/path)から来るため剥がされます — URI パースのための区切りであり、アドレス自体の一部ではありません。[2001:DB8::1] のような混合入力は、大文字→小文字、括弧除去、圧縮を一回の処理で行います。",
            "展開形は常に 4 桁の十六進数字 8 グループをゼロ埋めで表示します — これは /proc/net/if_inet6、ファイアウォール規則、DNS AAAA レコードのフォーマットです。圧縮形は RFC 5952 の人間向け・URL 向けフォーマットです。両者は同じ 128 ビット値を表します。",
          ],
        },
      ],
    },
    es: {
      name: "Expansión y compresión IPv6",
      tagline:
        "Expanda IPv6 a su forma completa de 8 grupos y comprima a la forma canónica RFC 5952 simultáneamente — corchetes e índices de zona eliminados automáticamente, direcciones mapeadas IPv4 preservadas. Gratis, instantáneo, sin conexión.",
      intro: [
        "Las direcciones IPv6 se pueden escribir de muchas maneras: forma completa, forma comprimida, mayúsculas y minúsculas mezcladas, con o sin corchetes. Esta herramienta toma cualquier representación válida y produce tanto la forma canónica comprimida RFC 5952 como la forma expandida completa simultáneamente — siempre sabrá exactamente qué representa una dirección.",
        "La compresión sigue RFC 5952 con precisión: la cadena de ceros más larga (2 o más grupos) se convierte en ::, los ceros iniciales dentro de los grupos se eliminan, la salida es en minúsculas, y cuando dos cadenas de ceros empatan se comprime la primera. Las direcciones mapeadas IPv4 (::ffff:0:0/96) mantienen el sufijo decimal según el estándar.",
        "Los corchetes (del contexto URL) y los índices de zona (%eth0) se eliminan automáticamente. Direcciones inválidas — múltiples ::, conteo de grupos incorrecto, caracteres fuera de hex — se rechazan indicando el problema específico. Todo se ejecuta localmente; sin llamadas de red.",
      ],
      steps: [
        "Pegue cualquier dirección IPv6 válida — corchetes, mayúsculas y abreviaciones se manejan automáticamente.",
        "Haga clic en Convertir — las formas comprimida y expandida aparecen abajo, cada una con botón de copia.",
        "Use la forma comprimida para visualización y URLs; la expandida para operaciones binarias y comparaciones.",
      ],
      faqs: [
        {
          q: "¿Qué es la forma canónica RFC 5952?",
          a: "Es la forma estándar de escribir una dirección IPv6 para que cada dirección tenga exactamente una representación: hex minúscula, sin ceros iniciales, y la cadena de ceros más larga (2+) comprimida a ::, eligiendo la primera en caso de empate. Sin este estándar, 2001:db8:0:0:1::1 y 2001:db8::1:0:0:0 podrían referirse a la misma dirección pero nunca coincidir en una comparación de texto.",
        },
        {
          q: "¿Por qué ::ffff:192.168.1.1 mantiene la notación de puntos?",
          a: "Es una dirección mapeada IPv4 (::ffff:0:0/96). La sección 5 de RFC 5952 dice que los últimos 32 bits de tales direcciones deben representarse en notación decimal con puntos porque semánticamente representan una dirección IPv4, no cuatro grupos hex. Todas las demás direcciones usan hex puro.",
        },
      ],
      deepDive: [
        {
          heading: "Cómo funcionan realmente las reglas de abreviación ::",
          paragraphs: [
            "RFC 4291 permite un :: por dirección para representar la secuencia más larga de grupos de ceros consecutivos. La compresión de RFC 5952 añade precisión: cuando dos secuencias tienen la misma longitud, se comprime la primera; una secuencia de un solo grupo (como ff00:0042) no se comprime porque escribir un solo grupo cero como 0 es más corto que ::.",
            "La consecuencia práctica es que :: puede representar de 1 a 7 grupos de ceros — nunca 0 (que sería la forma completa) ni 8 (un :: desnudo es técnicamente la dirección todo-ceros). La herramienta rechaza múltiples :: y direcciones donde el conteo de grupos excedería 8 tras la expansión.",
            "Las direcciones mapeadas IPv4 (::ffff:0:0/96) incrustan una dirección IPv4 de 32 bits en los últimos dos grupos. RFC 5952 §5 requiere que mantengan el sufijo decimal punteado en lugar de expandirse a grupos hex — porque semánticamente son una dirección IPv4. Es el único caso donde las formas comprimida y expandida usan notaciones diferentes para los mismos bits.",
          ],
        },
        {
          heading: "Índices de zona, corchetes y casos límite",
          paragraphs: [
            "Las direcciones link-local (fe80::/10) pueden llevar un índice de zona (ej. fe80::1%eth0) para desambiguar interfaces. Esta herramienta elimina el sufijo %zone antes de analizar, ya que los índices de zona son locales del sistema y no forman parte de la salida normalizada.",
            "Los corchetes [] se eliminan porque provienen del contexto URL (http://[2001:db8::1]/path) — delimitan la dirección para el análisis de URI pero no forman parte de la dirección misma. Entrada mixta como [2001:DB8::1] se convierte a minúsculas, se eliminan los corchetes y se comprime en una sola pasada.",
            "La forma expandida siempre muestra exactamente 8 grupos de 4 dígitos hexadecimales, con relleno de ceros — este es el formato para /proc/net/if_inet6, reglas de firewall y registros DNS AAAA. La forma comprimida es el formato RFC 5952 orientado a humanos y URLs. Ambas representan el mismo valor de 128 bits.",
          ],
        },
      ],
    },
    pt: {
      name: "Expansão e compressão IPv6",
      tagline:
        "Expanda IPv6 para sua forma completa de 8 grupos e comprima para a forma canônica RFC 5952 simultaneamente — colchetes e índices de zona removidos automaticamente, endereços mapeados IPv4 preservados. Grátis, instantâneo, offline.",
      intro: [
        "Endereços IPv6 podem ser escritos de muitas formas: forma completa, forma comprimida, maiúsculas e minúsculas misturadas, com ou sem colchetes. Esta ferramenta recebe qualquer representação válida e produz tanto a forma canônica comprimida RFC 5952 quanto a forma expandida completa simultaneamente — sempre sabendo exatamente o que um endereço representa.",
        "A compressão segue RFC 5952 com precisão: a sequência de zeros mais longa (2 ou mais grupos) vira ::, zeros à esquerda dentro dos grupos são removidos, a saída é em minúsculas, e quando duas sequências de zeros empatam a primeira é comprimida. Endereços mapeados IPv4 (::ffff:0:0/96) mantêm o sufixo decimal conforme o padrão.",
        "Colchetes (do contexto URL) e índices de zona (%eth0) são removidos automaticamente. Endereços inválidos — múltiplos ::, contagem de grupos incorreta, caracteres fora de hex — são rejeitados indicando o problema específico. Tudo roda localmente; sem chamadas de rede.",
      ],
      steps: [
        "Cole qualquer endereço IPv6 válido — colchetes, maiúsculas e abreviações são tratados automaticamente.",
        "Clique em Converter — as formas comprimida e expandida aparecem abaixo, cada uma com botão de cópia.",
        "Use a forma comprimida para visualização e URLs; a expandida para operações binárias e comparações.",
      ],
      faqs: [
        {
          q: "O que é a forma canônica RFC 5952?",
          a: "É a forma padrão de escrever um endereço IPv6 para que cada endereço tenha exatamente uma representação: hex minúscula, sem zeros à esquerda, e a sequência de zeros mais longa (2+) comprimida para ::, escolhendo a primeira em caso de empate. Sem esse padrão, 2001:db8:0:0:1::1 e 2001:db8::1:0:0:0 poderiam se referir ao mesmo endereço mas nunca corresponder em uma comparação de string.",
        },
        {
          q: "Por que ::ffff:192.168.1.1 mantém a notação de pontos?",
          a: "É um endereço mapeado IPv4 (::ffff:0:0/96). A seção 5 do RFC 5952 diz que os últimos 32 bits de tais endereços devem ser representados em notação decimal pontuada porque semanticamente representam um endereço IPv4, não quatro grupos hex. Todos os outros endereços usam hex puro.",
        },
      ],
      deepDive: [
        {
          heading: "Como as regras de abreviação :: realmente funcionam",
          paragraphs: [
            "RFC 4291 permite um :: por endereço para representar a sequência mais longa de grupos de zeros consecutivos. A compressão de RFC 5952 adiciona precisão: quando duas sequências têm a mesma duração, a primeira é comprimida; uma sequência de um único grupo (como ff00:0042) não é comprimida porque escrever um grupo zero como 0 é mais curto que ::.",
            "A consequência prática é que :: pode representar de 1 a 7 grupos de zeros — nunca 0 (que seria a forma completa) nem 8 (um :: puro é tecnicamente o endereço todo-zeros). A ferramenta rejeita múltiplos :: e endereços onde a contagem de grupos excederia 8 após a expansão.",
            "Endereços mapeados IPv4 (::ffff:0:0/96) incorporam um endereço IPv4 de 32 bits nos últimos dois grupos. RFC 5952 §5 exige que mantenham o sufixo decimal pontuado em vez de expandir para grupos hex — porque semanticamente são um endereço IPv4. É o único caso onde as formas comprimida e expandida usam notações diferentes para os mesmos bits.",
          ],
        },
        {
          heading: "Índices de zona, colchetes e casos limite",
          paragraphs: [
            "Endereços link-local (fe80::/10) podem carregar um índice de zona (ex. fe80::1%eth0) para desambiguar interfaces. Esta ferramenta remove o sufixo %zone antes de analisar, pois índices de zona são locais do sistema e não fazem parte da saída normalizada.",
            "Colchetes [] são removidos porque vêm do contexto URL (http://[2001:db8::1]/path) — eles delimitam o endereço para análise de URI mas não fazem parte do endereço em si. Entrada mista como [2001:DB8::1] é convertida para minúsculas, descolchetada e comprimida em uma única passada.",
            "A forma expandida sempre mostra exatamente 8 grupos de 4 dígitos hexadecimais, com preenchimento de zeros — este é o formato para /proc/net/if_inet6, regras de firewall e registros DNS AAAA. A forma comprimida é o formato RFC 5952 voltado para humanos e URLs. Ambas representam o mesmo valor de 128 bits.",
          ],
        },
      ],
    },
  },
});
