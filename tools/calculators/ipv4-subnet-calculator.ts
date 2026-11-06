import { UtilEngineSubnet } from "../_engines/util-engine-subnet";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "ipv4-subnet-calculator",
  category: "utility",
  icon: "grid",
  engine: { component: UtilEngineSubnet },
  related: ["ip-lookup", "dns-lookup", "whois-lookup", "binary-converter", "timestamp-converter", "hash-generator"],
  copy: {
    en: {
      name: "IPv4 Subnet Calculator",
      tagline: "Enter a CIDR like 192.168.1.0/24 to get network and broadcast addresses, mask, wildcard, host range, usable host count, IP class and private-range flag.",
      intro: [
        "Sizing a network, writing a firewall rule or summarizing routes all start from the same handful of values: where the network begins, where it ends, which mask expresses it and how many hosts actually fit. Type a CIDR (or a bare IP, treated as /32) and every value appears at once — network and broadcast addresses, dotted subnet mask, wildcard mask for ACL syntax, first and last usable host, total and usable counts, the classful letter and whether the range is private (RFC 1918, loopback, link-local or CGNAT).",
        "A second mode answers a different question: given two IP addresses, what is the smallest single CIDR block that contains both? That is exactly what you need when merging two hosts into one firewall rule or summarizing a route, and doing it by hand is surprisingly error-prone.",
        "All values follow standard CIDR math: the mask is n prefix bits followed by zeros, the network address zeroes the host bits, broadcast sets them all, and usable hosts are 2^(32−n) − 2 because the network and broadcast addresses are reserved. /31 and /32 follow their RFC 3021 and host-route exceptions.",
        "Compared with doing this by hand, the containment mode answers the summarize-two-IPs question directly, and the private-range flags — RFC 1918, loopback 127/8, link-local 169.254/16, CGNAT 100.64/10 — prevent the classic firewall mistake of allowing a range you thought was public. Everything computes locally, which is safe for internal addressing plans.",
      ],
      steps: [
        "Type a CIDR like 10.0.0.0/8 or 192.168.1.130/26 — a bare IP is treated as /32.",
        "Read network, broadcast, mask, wildcard, host range and counts from the result cards; key values have one-click copy.",
        "Switch to the smallest-covering-CIDR tab and enter two IPs to get the minimal block containing both.",
      ],
      faqs: [
        {
          q: "Why does /31 report all addresses as usable?",
          a: "RFC 3021 defines /31 subnets for point-to-point links where neither a network nor a broadcast address is reserved, so both addresses are usable. /32 is a single-host route with one address by definition. The classical \"minus two\" rule only applies from /30 upward.",
        },
        {
          q: "What are the private ranges the tool checks?",
          a: "RFC 1918 private space (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16), loopback (127.0.0.0/8), IPv4 link-local (169.254.0.0/16) and the CGNAT shared address space (100.64.0.0/10). Addresses outside these are flagged as public.",
        },
        {
          q: "Are IP classes still meaningful?",
          a: "Not for routing — the internet moved to classless CIDR decades ago. The A/B/C/D/E letter is shown only for reference, because legacy documentation, exam questions and some old devices still speak in classful terms.",
        },
        {
          q: "How is the smallest covering CIDR computed?",
          a: "The two addresses are XORed to find which low-order bits differ; the prefix is the first bit position where they agree, and the block is aligned down to that boundary. For example 10.1.2.3 and 10.1.9.200 fall together into 10.1.0.0/20.",
        },
      ],
      deepDive: [
        {
          heading: "CIDR and the subnet mask, from first principles",
          paragraphs: [
            "An IPv4 address is 32 bits, and the CIDR prefix says how many leading bits identify the network: /24 means the first 24 bits are fixed and the last 8 belong to hosts. The dotted mask is just that rule written in IP notation — 255.255.255.0 has exactly 24 ones. The wildcard mask is the bitwise inverse, which firewall ACL syntax asks for instead: where the mask says \"must match\", the wildcard says \"don't care\".",
            "The standard values fall out mechanically once the boundary is set: the network address has all host bits zeroed, the broadcast address has them all set, and the usable hosts run from network+1 to broadcast−1. The usable count is 2^(32−n) − 2 because network and broadcast are reserved — a /24 holds 256 addresses but 254 usable hosts, and that off-by-two is the most common reason a network plan is one host short.",
            "Two exceptions are deliberately honored: RFC 3021 /31 point-to-point links use both addresses with no reserved network or broadcast, and /32 is a single-host route by definition. If your mental model says \"always subtract two\", these two cases are where real-world configs diverge from the textbook.",
          ],
        },
        {
          heading: "Private ranges and the classic firewall mistake",
          paragraphs: [
            "Not every address is globally unique. RFC 1918 reserves 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16 for private networks; 127.0.0.0/8 is loopback, 169.254.0.0/16 is link-local, and 100.64.0.0/10 is the CGNAT shared space carriers use between their modem and their core. The tool flags all of these so you know what kind of address you are actually looking at.",
            "The mistake the flags prevent: writing a firewall allow rule for a range you believe is public, when it is actually inside RFC 1918 — for example allowing 172.16.0.0/12's neighborhood by accident. Conversely, treating a CGNAT source as a public visitor lets the same carrier address appear from millions of subscribers, which breaks per-IP rate limits and logging assumptions.",
            "One more trap lives in the 172 range specifically: 172.16/12 spans 172.16.0.0 through 172.31.255.255, so 172.20.x.x is private but 172.32.x.x is public. Memory says \"172 is private\", reality says only a 16-bit-wide slice of the 172 space is. This is the single most common private-range lookup error in practice, and it is exactly what the flag column settles instantly.",
          ],
        },
        {
          heading: "The smallest covering CIDR and why hand-merging fails",
          paragraphs: [
            "Given two IPs, the minimal block containing both is found by comparing bits: XOR the two addresses, and the highest differing bit position tells you how many low-order bits vary. The prefix is everything above that position, and the block is aligned down to that boundary — so 10.1.2.3 and 10.1.9.200 share a /20 but would not share a /21, because their difference reaches into bit 20's range.",
            "Hand-merging fails because humans reason in decimal. 10.1.2.3 \"looks like\" it belongs with 10.1.2.x, and a /24 does contain it — but pairing it with 10.1.9.200 forces a block whose third octet spans 0–15, which no one intuits from the decimal strings. The XOR method turns an intuition problem into bit arithmetic that either works or provably does not.",
            "The containment result also tells you the cost of summarization: merging two hosts into one rule may pull in 2,048 addresses you did not intend to include. Read the resulting block's usable-host count before pasting it into a firewall, and prefer two specific rules over one broad one when the extra addresses matter. Everything here computes locally in the browser — internal addressing plans never leave the page.",
          ],
        },
      ],
    },
    zh: {
      name: "IPv4 子网计算器",
      tagline: "输入 192.168.1.0/24 这样的 CIDR,立即得到网络与广播地址、掩码、通配符掩码、主机范围、可用主机数、IP 类别与私网判断。",
      intro: [
        "规划网段、写防火墙规则或做路由汇总,都绕不开同一组数值:网络从哪开始、到哪结束、用什么掩码表达、实际能容纳多少主机。输入一个 CIDR(或裸 IP,按 /32 处理),所有值一次给出——网络地址与广播地址、点分子网掩码、用于 ACL 语法的通配符掩码、首末可用主机、总数与可用数、类别字母,以及是否属于私网(RFC 1918、环回、链路本地或 CGNAT)。",
        "第二种模式回答另一个问题:给定两个 IP 地址,包含它们的最小单一 CIDR 块是什么?把两台主机合并进一条防火墙规则或汇总一条路由时,这正是你需要的结果——而手算极容易出错。",
      ],
      steps: [
        "输入 CIDR(如 10.0.0.0/8 或 192.168.1.130/26)——裸 IP 按 /32 处理。",
        "在结果卡片中读取网络、广播、掩码、通配符、主机范围与计数;关键值可一键复制。",
        "切换到\"最小覆盖 CIDR\"标签,输入两个 IP,得到包含两者的最小块。",
      ],
      faqs: [
        {
          q: "为什么 /31 显示所有地址均可用?",
          a: "RFC 3021 将 /31 定义为点对点链路子网,不保留网络地址和广播地址,两个地址都可用;/32 则是单主机路由,只有一个地址。经典的\"减二\"规则只适用于 /30 及更大前缀。",
        },
        {
          q: "工具检查哪些私网段?",
          a: "RFC 1918 私有空间(10.0.0.0/8、172.16.0.0/12、192.168.0.0/16)、环回(127.0.0.0/8)、IPv4 链路本地(169.254.0.0/16)和 CGNAT 共享地址空间(100.64.0.0/10)。之外即为公网地址。",
        },
        {
          q: "IP 分类还有意义吗?",
          a: "对路由已无意义——互联网几十年前就转向无类别 CIDR。显示 A/B/C/D/E 字母仅供对照,因为旧文档、考试题和一些老设备仍在使用分类术语。",
        },
        {
          q: "最小覆盖 CIDR 是怎么算的?",
          a: "对两个地址做异或,找出低位哪些比特不同;前缀取它们首次一致的位,再把块按该边界向下对齐。例如 10.1.2.3 与 10.1.9.200 一起落在 10.1.0.0/20 中。",
        },
      ],
      deepDive: [
        {
          heading: "CIDR 与子网掩码:从头讲一遍",
          paragraphs: [
            "IPv4 地址是 32 位,CIDR 前缀说明开头多少位标识网络:/24 表示前 24 位固定、后 8 位归主机。点分掩码只是把这条规则用 IP 记法写出来——255.255.255.0 恰好有 24 个 1。通配符掩码是掩码的按位取反,防火墙 ACL 语法要的是它:掩码说\"必须匹配\"的地方,通配符说\"不用管\"。",
            "边界确定之后,标准值机械地依次得出:网络地址把主机位全部清零,广播地址全部置一,可用主机从 网络地址+1 到 广播地址−1。可用数是 2^(32−n) − 2,因为网络和广播两个地址被保留——/24 有 256 个地址但只有 254 个可用主机,这个\"差二\"正是网络规划总是少一台主机的头号原因。",
            "两个例外被刻意如实处理:RFC 3021 的 /31 点对点链路两个地址都不保留网络和广播,/32 按定义就是单主机路由。如果你的心智模型是\"永远减二\",真实配置恰恰在这两处偏离教科书。",
          ],
        },
        {
          heading: "私网段与经典的防火墙错误",
          paragraphs: [
            "不是所有地址都全球唯一。RFC 1918 把 10.0.0.0/8、172.16.0.0/12、192.168.0.0/16 留给私网;127.0.0.0/8 是环回,169.254.0.0/16 是链路本地,100.64.0.0/10 是运营商在光猫和核心网之间用的 CGNAT 共享空间。工具对以上全部打标,让你知道自己看到的到底是哪类地址。",
            "打标要防的错误:给一个你以为是公网的段写放行规则,实际上它在 RFC 1918 里——比如误把 172.16.0.0/12 附近当成公网放行。反过来,把 CGNAT 来源当公网访客,会让同一个运营商地址在几百万用户中出现,按 IP 限速和日志假设全部失效。",
            "还有一个坑专门藏在 172 段:172.16/12 覆盖 172.16.0.0 到 172.31.255.255,所以 172.20.x.x 是私网,而 172.32.x.x 是公网。记忆里是\"172 开头是私网\",现实是 172 空间里只有一段 16 位宽的切片。这是实践中最常见的私网判断错误,标记栏一秒就能裁定。",
          ],
        },
        {
          heading: "最小覆盖 CIDR,以及为什么手算合并必错",
          paragraphs: [
            "给定两个 IP,包含两者的最小块靠比特比较得出:对两个地址做异或,最高不同的位告诉你低位有多少位在变。前缀就是这条位线以上的一切,块按该边界向下对齐——所以 10.1.2.3 和 10.1.9.200 共享一个 /20,但放不进同一个 /21,因为差异伸进了第 20 位的范围。",
            "手算必错,是因为人在十进制里思考。10.1.2.3 \"看起来\"和 10.1.2.x 一伙,/24 也确实包含它——但和 10.1.9.200 配对,得到的块第三段要跨 0–15,从十进制字符串上谁也看不出来。异或法把直觉问题变成比特运算:要么成立,要么可证明不成立。",
            "覆盖结果同时告诉你汇总的代价:把两台主机并进一条规则,可能顺带拉进 2048 个你并不想放行的地址。把结果贴进防火墙之前先读它的可用主机数;多出的地址要紧时,宁可写两条精确规则,不写一条宽规则。全部计算在浏览器本地完成——内部编址方案从不离开页面。",
          ],
        },
      ],
    },
    ja: {
      name: "IPv4 サブネット計算",
      tagline: "192.168.1.0/24 のような CIDR を入力すると、ネットワーク・ブロードキャスト・マスク・ワイルドカード・ホスト範囲・利用可能数・クラス・プライベート判定を一度に表示します。",
      intro: [
        "ネットワーク設計でもファイアウォール規則でもルート集約でも、必要なのは同じ一式の値です。どこから始まりどこで終わるか、どのマスクで表すか、実際に何台入るか。CIDR(または /32 として扱われる単一IP)を入力すると、ネットワークとブロードキャスト、ドット表記のサブネットマスク、ACL 用のワイルドカードマスク、最初と最後の利用可能ホスト、総数と利用可能数、クラス、そして RFC 1918・ループバック・リンクローカル・CGNAT の判定が一度に出ます。",
        "2つ目のモードは別の問いに答えます。2つのIPアドレスを両方含む最小の CIDR ブロックは? 2台を1本のファイアウォール規則にまとめるときや経路集約に必要な値で、手計算では意外と間違えます。",
      ],
      steps: [
        "10.0.0.0/8 や 192.168.1.130/26 のような CIDR を入力します。単一IPは /32 として扱います。",
        "結果カードでネットワーク・ブロードキャスト・マスク・ワイルドカード・ホスト範囲・数を読み、主要値はワンクリックでコピーできます。",
        "最小包含 CIDR タブに切り替え、2つのIPを入力すると両方を含む最小ブロックが出ます。",
      ],
      faqs: [
        {
          q: "/31 で全アドレスが利用可能と表示されるのは?",
          a: "RFC 3021 がポイントツーポイント用の /31 を定義しており、ネットワークもブロードキャストも予約しないため両アドレスが使えます。/32 は単一ホストルートで定義上1アドレスです。定番の「マイナス2」は /30 以上でのみ適用されます。",
        },
        {
          q: "プライベート判定の対象範囲は?",
          a: "RFC 1918(10.0.0.0/8、172.16.0.0/12、192.168.0.0/16)、ループバック(127.0.0.0/8)、リンクローカル(169.254.0.0/16)、CGNAT(100.64.0.0/10)です。これら以外は公開アドレスと判定します。",
        },
        {
          q: "IPクラスは今も意味がありますか?",
          a: "ルーティングには無意味です。インターネットは何十年も前からクラスレス CIDR です。A〜E の表示は旧資料・試験問題・古い機器がまだクラスフルで語るための参考です。",
        },
        {
          q: "最小包含 CIDR はどう計算しますか?",
          a: "2つのアドレスを XOR して下位ビットの差分を調べ、初めて一致するビット位置をプレフィックスとし、その境界に切り下げて整列します。例えば 10.1.2.3 と 10.1.9.200 はまとめて 10.1.0.0/20 に収まります。",
        },
      ],
      deepDive: [
        {
          heading: "CIDR とサブネットマスク:基本から",
          paragraphs: [
            "IPv4 アドレスは 32 ビットで、CIDR のプレフィックスは先頭の何ビットがネットワークを示すかを言います。/24 なら最初の 24 ビットが固定で、下位 8 ビットがホストに属します。ドット表記のマスクはこの規則を IP 記法で書いたものにすぎません。255.255.255.0 はちょうど 24 個の 1 を持ちます。ワイルドカードマスクはマスクのビット反転で、ファイアウォールの ACL 構文はこちらを求めます。マスクが「一致必須」と言う場所を、ワイルドカードは「不問」と言います。",
            "境界が決まれば標準値は機械的に出ます。ネットワークアドレスはホストビットを全て 0 に、ブロードキャストは全て 1 にし、利用可能ホストは ネットワーク+1 から ブロードキャスト−1 まで。利用可能数は 2^(32−n) − 2 です。ネットワークとブロードキャストが予約されるためで、/24 は 256 アドレスを持ちながら利用可能ホストは 254。この「2 減らす」を忘れるのが、設計がいつも 1 台不足する最大の理由です。",
            "二つの例外は意図的に正しく扱います。RFC 3021 の /31 ポイントツーポイントリンクはネットワークもブロードキャストも予約せず両アドレスを使え、/32 は定義上の単一ホストルートです。「常に2引く」という頭のモデルを持っている人こそ、現実の設定が教科書から外れるのがこの二つだと知っておくべきです。",
          ],
        },
        {
          heading: "プライベート範囲と、あるあるなファイアウォール事故",
          paragraphs: [
            "すべてのアドレスが世界で一意なわけではありません。RFC 1918 は 10.0.0.0/8、172.16.0.0/12、192.168.0.0/16 をプライベートに残し、127.0.0.0/8 はループバック、169.254.0.0/16 はリンクローカル、100.64.0.0/10 はキャリアがモデムとコア網の間で使う CGNAT 共有空間です。本ツールはこれらすべてを判定表示し、目の前のアドレスが何なのかを確定させます。",
            "判定が防ぐ事故:公网だと思って放行ルールを書いたら実際は RFC 1918 の中だった、というケース(たとえば 172.16.0.0/12 の近傍を誤って公開扱いにする)。逆に CGNAT 送信元を一般訪問者として扱うと、同じキャリアのアドレスが数百万人の契約者から現れ、IP 単位のレート制限やログの前提が崩れます。",
            "もう一つの罠は特に 172 の範囲にあります。172.16/12 は 172.16.0.0 から 172.31.255.255 までを覆うため、172.20.x.x はプライベートですが 172.32.x.x は公開です。記憶は「172 はプライベート」、現実は 172 空間のごく一部のスライスだけ。実務で最も多いプライベート判定の誤りがまさにこれで、判定欄が一瞬で決着させます。",
          ],
        },
        {
          heading: "最小包含 CIDR と、手計算マージが失敗する理由",
          paragraphs: [
            "2 つの IP を両方含む最小ブロックはビット比較で求まります。両者を XOR すると、最上位の異なるビット位置が下位何ビットが動くかを教えます。プレフィックスはその位置より上すべて、ブロックはその境界へ切り下げです。10.1.2.3 と 10.1.9.200 は /20 を共有しますが /21 には収まりません。差が第 20 ビットの領域に届くからです。",
            "手計算が失敗するのは、人間が 10 進で考えるからです。10.1.2.3 は 10.1.2.x と「仲が良さそう」に見え、/24 は確かにそれを含みます。しかし 10.1.9.200 と組むと第三オクテットが 0〜15 を跨ぐブロックになり、10 進の文字列からは誰も読み取れません。XOR 法は直感の問題をビット演算に変え、成立するか、成立しないと証明できるかのどちらかにします。",
            "包含結果は集約のコストも教えてくれます。2 台を 1 本の規則へまとめると、意図しない 2,048 アドレスを引き込むかもしれません。ファイアウォールに貼る前に結果ブロックの利用可能数を読み、余分なアドレスが問題になるなら 1 本の広い規則より 2 本の具体的な規則を。計算はすべてブラウザ内でローカルに完結し、内部のアドレス設計がページの外に出ることはありません。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de subredes IPv4",
      tagline: "Introduzca un CIDR como 192.168.1.0/24 y obtenga direcciones de red y difusión, máscara, wildcard, rango de hosts, hosts utilizables, clase IP y si es privado.",
      intro: [
        "Dimensionar una red, escribir una regla de firewall o resumir rutas parte siempre de los mismos valores: dónde empieza y termina la red, qué máscara la expresa y cuántos hosts caben de verdad. Escriba un CIDR (o una IP suelta, tratada como /32) y todos los valores aparecen a la vez: direcciones de red y difusión, máscara con puntos, máscara wildcard para sintaxis ACL, primer y último host utilizable, totales, la letra de clase y si el rango es privado (RFC 1918, loopback, link-local o CGNAT).",
        "Un segundo modo responde otra pregunta: dadas dos direcciones IP, ¿cuál es el bloque CIDR mínimo que contiene a ambas? Es justo lo que necesita para unir dos hosts en una regla de firewall o resumir una ruta, y hacerlo a mano es sorprendentemente propenso a errores.",
      ],
      steps: [
        "Escriba un CIDR como 10.0.0.0/8 o 192.168.1.130/26; una IP sin prefijo se trata como /32.",
        "Lea red, difusión, máscara, wildcard, rango y recuentos en las tarjetas; los valores clave tienen copia con un clic.",
        "Cambie a la pestaña de CIDR mínimo y entre dos IPs para obtener el bloque más pequeño que las contiene.",
      ],
      faqs: [
        {
          q: "¿Por qué en /31 se reportan todas las direcciones como utilizables?",
          a: "La RFC 3021 define las /31 para enlaces punto a punto, donde no se reserva ni red ni difusión, así que ambas direcciones son utilizables. Una /32 es una ruta de host único con una dirección por definición. La regla clásica del «menos dos» aplica desde /30 hacia arriba.",
        },
        {
          q: "¿Qué rangos privados comprueba la herramienta?",
          a: "El espacio privado RFC 1918 (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16), loopback (127.0.0.0/8), link-local IPv4 (169.254.0.0/16) y el espacio compartido CGNAT (100.64.0.0/10). Fuera de ellos, la dirección se marca como pública.",
        },
        {
          q: "¿Siguen teniendo sentido las clases IP?",
          a: "No para el enrutamiento: internet pasó a CIDR sin clases hace décadas. La letra A/B/C/D/E se muestra solo como referencia, porque documentación antigua, exámenes y algunos equipos viejos siguen hablando en términos clasistas.",
        },
        {
          q: "¿Cómo se calcula el CIDR mínimo que cubre dos IPs?",
          a: "Se hace XOR entre ambas para ver qué bits bajos difieren; el prefijo es la primera posición donde coinciden y el bloque se alinea a ese límite. Por ejemplo, 10.1.2.3 y 10.1.9.200 caen juntos en 10.1.0.0/20.",
        },
      ],
      deepDive: [
        {
          heading: "CIDR y la máscara de subred desde cero",
          paragraphs: [
            "Una dirección IPv4 son 32 bits, y el prefijo CIDR dice cuántos bits iniciales identifican la red: /24 significa que los primeros 24 bits son fijos y los últimos 8 pertenecen a los hosts. La máscara con puntos es esa regla escrita en notación IP — 255.255.255.0 tiene exactamente 24 unos. La máscara wildcard es el inverso bit a bit, que es la que pide la sintaxis ACL de los firewalls: donde la máscara dice \"debe coincidir\", la wildcard dice \"no importa\".",
            "Los valores estándar caen mecánicamente una vez fijada la frontera: la dirección de red pone a cero todos los bits de host, la de difusión los pone a uno, y los hosts utilizables van de red+1 a difusión−1. El recuento utilizable es 2^(32−n) − 2 porque red y difusión quedan reservadas — una /24 contiene 256 direcciones pero 254 hosts utilizables, y ese \"menos dos\" olvidado es la razón más común de que un plan de red quede siempre un host corto.",
            "Dos excepciones se respetan deliberadamente: los enlaces punto a punto /31 de la RFC 3021 usan ambas direcciones sin red ni difusión reservadas, y la /32 es por definición una ruta de host único. Si su modelo mental dice \"restar siempre dos\", estos dos casos son donde la realidad se aparta del manual.",
          ],
        },
        {
          heading: "Rangos privados y el error clásico de firewall",
          paragraphs: [
            "No toda dirección es única en el mundo. La RFC 1918 reserva 10.0.0.0/8, 172.16.0.0/12 y 192.168.0.0/16 para redes privadas; 127.0.0.0/8 es loopback, 169.254.0.0/16 es link-local y 100.64.0.0/10 es el espacio compartido CGNAT que los operadores usan entre el módem y su núcleo. La herramienta marca todas estas categorías para que sepa qué tipo de dirección está viendo.",
            "El error que las marcas evitan: escribir una regla de permitir para un rango que usted cree público cuando en realidad está dentro de la RFC 1918 — por ejemplo, permitir por descuido la vecindad de 172.16.0.0/12. A la inversa, tratar un origen CGNAT como visitante público hace que la misma dirección del operador aparezca desde millones de abonados, y los límites por IP y las hipótesis de registro dejan de funcionar.",
            "Otra trampa vive específicamente en el rango 172: 172.16/12 cubre desde 172.16.0.0 hasta 172.31.255.255, así que 172.20.x.x es privado pero 172.32.x.x es público. La memoria dice \"172 es privado\"; la realidad dice que solo una franja de 16 bits del espacio 172 lo es. Es el error de clasificación privada más común en la práctica, y la columna de marcas lo resuelve al instante.",
          ],
        },
        {
          heading: "El CIDR mínimo que cubre dos IPs y por qué falla el cálculo manual",
          paragraphs: [
            "Dados dos IPs, el bloque mínimo que contiene a ambos se halla comparando bits: haga XOR entre las dos direcciones y la posición del bit más alto que difiere le dice cuántos bits bajos varían. El prefijo es todo lo que está por encima de esa posición y el bloque se alinea hacia abajo en esa frontera — así, 10.1.2.3 y 10.1.9.200 comparten una /20 pero no caberían en una /21, porque su diferencia alcanza el rango del bit 20.",
            "El cálculo manual falla porque las personas razonan en decimal. 10.1.2.3 \"parece\" pertenecer con 10.1.2.x, y una /24 de hecho lo contiene — pero emparejarlo con 10.1.9.200 fuerza un bloque cuyo tercer octeto abarca 0–15, algo que nadie intuye desde las cadenas decimales. El método XOR convierte un problema de intuición en aritmética de bits que o funciona o se puede demostrar que no.",
            "El resultado de contención también le dice el costo de la sumarización: unir dos hosts en una regla puede arrastrar 2.048 direcciones que no pensaba incluir. Lea el recuento de hosts del bloque resultante antes de pegarlo en un firewall, y prefiera dos reglas específicas antes que una amplia cuando las direcciones extra importen. Todo se calcula localmente en el navegador — un plan de direccionamiento interno nunca sale de la página.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de sub-redes IPv4",
      tagline: "Digite um CIDR como 192.168.1.0/24 e obtenha endereços de rede e broadcast, máscara, curinga, faixa de hosts, hosts utilizáveis, classe IP e se é privado.",
      intro: [
        "Dimensionar uma rede, escrever uma regra de firewall ou sumarizar rotas começa sempre pelos mesmos valores: onde a rede começa e termina, qual máscara a expressa e quantos hosts cabem de fato. Digite um CIDR (ou um IP puro, tratado como /32) e todos os valores aparecem de uma vez — endereços de rede e broadcast, máscara pontilhada, máscara curinga para sintaxe ACL, primeiro e último host utilizável, totais, a letra de classe e se a faixa é privada (RFC 1918, loopback, link-local ou CGNAT).",
        "Um segundo modo responde outra pergunta: dados dois endereços IP, qual o menor bloco CIDR que contém os dois? É exatamente o que você precisa para unir dois hosts numa regra de firewall ou sumarizar uma rota — e fazer isso à mão é surpreendentemente propenso a erros.",
      ],
      steps: [
        "Digite um CIDR como 10.0.0.0/8 ou 192.168.1.130/26; um IP sem prefixo é tratado como /32.",
        "Leia rede, broadcast, máscara, curinga, faixa e contagens nos cartões; valores-chave têm cópia com um clique.",
        "Mude para a aba de menor CIDR e informe dois IPs para obter o menor bloco que contém ambos.",
      ],
      faqs: [
        {
          q: "Por que em /31 todos os endereços aparecem como utilizáveis?",
          a: "A RFC 3021 define /31 para enlaces ponto a ponto, onde nem rede nem broadcast são reservados, então ambos os endereços são utilizáveis. Uma /32 é uma rota de host único com um endereço por definição. A regra clássica do \"menos dois\" vale a partir de /30.",
        },
        {
          q: "Quais faixas privadas a ferramenta verifica?",
          a: "O espaço privado RFC 1918 (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16), loopback (127.0.0.0/8), link-local IPv4 (169.254.0.0/16) e o espaço compartilhado CGNAT (100.64.0.0/10). Fora delas, o endereço é marcado como público.",
        },
        {
          q: "Classes IP ainda significam algo?",
          a: "Não para roteamento — a internet migrou para CIDR sem classes há décadas. A letra A/B/C/D/E aparece só como referência, pois documentação antiga, provas e alguns equipamentos antigos ainda falam em termos classful.",
        },
        {
          q: "Como é calculado o menor CIDR que cobre dois IPs?",
          a: "Os dois endereços passam por XOR para revelar quais bits baixos diferem; o prefixo é a primeira posição em que coincidem e o bloco é alinhado nesse limite. Por exemplo, 10.1.2.3 e 10.1.9.200 caem juntos em 10.1.0.0/20.",
        },
      ],
      deepDive: [
        {
          heading: "CIDR e a máscara de sub-rede do princípio",
          paragraphs: [
            "Um endereço IPv4 tem 32 bits, e o prefixo CIDR diz quantos bits iniciais identificam a rede: /24 significa que os primeiros 24 bits são fixos e os últimos 8 pertencem aos hosts. A máscara pontilhada é só essa regra escrita em notação IP — 255.255.255.0 tem exatamente 24 uns. A máscara curinga é o inverso bit a bit, que é a que a sintaxe ACL de firewalls pede: onde a máscara diz \"precisa bater\", o curinga diz \"tanto faz\".",
            "Os valores padrão saem mecanicamente uma vez fixada a fronteira: o endereço de rede zera todos os bits de host, o broadcast liga todos, e os hosts utilizáveis vão de rede+1 até broadcast−1. A contagem utilizável é 2^(32−n) − 2 porque rede e broadcast ficam reservadas — uma /24 tem 256 endereços mas 254 hosts utilizáveis, e esse \"menos dois\" esquecido é a razão mais comum de um plano de rede ficar sempre um host curto.",
            "Duas exceções são respeitadas de propósito: os enlaces ponto a ponto /31 da RFC 3021 usam os dois endereços sem rede nem broadcast reservados, e a /32 é por definição uma rota de host único. Se o seu modelo mental diz \"sempre subtrair dois\", esses dois casos são onde as configurações reais divergem do manual.",
          ],
        },
        {
          heading: "Faixas privadas e o erro clássico de firewall",
          paragraphs: [
            "Nem todo endereço é único no mundo. A RFC 1918 reserva 10.0.0.0/8, 172.16.0.0/12 e 192.168.0.0/16 para redes privadas; 127.0.0.0/8 é loopback, 169.254.0.0/16 é link-local e 100.64.0.0/10 é o espaço compartilhado CGNAT que as operadoras usam entre o modem e o núcleo. A ferramenta marca todas essas categorias para você saber que tipo de endereço está vendo.",
            "O erro que as marcações evitam: escrever uma regra de permitir para uma faixa que você acredita pública quando ela está dentro da RFC 1918 — por exemplo, liberar por descuido a vizinhança de 172.16.0.0/12. No sentido inverso, tratar uma origem CGNAT como visitante público faz o mesmo endereço da operadora aparecer de milhões de assinantes, e limites por IP e premissas de log deixam de funcionar.",
            "Outra armadilha vive especificamente na faixa 172: 172.16/12 cobre de 172.16.0.0 até 172.31.255.255, então 172.20.x.x é privado mas 172.32.x.x é público. A memória diz \"172 é privado\"; a realidade diz que só uma fatia de 16 bits do espaço 172 é. É o erro de classificação privada mais comum na prática, e a coluna de marcação decide num instante.",
          ],
        },
        {
          heading: "O menor CIDR que cobre dois IPs e por que mesclar à mão falha",
          paragraphs: [
            "Dados dois IPs, o menor bloco que contém ambos se acha comparando bits: faça XOR entre os dois endereços e a posição do bit mais alto que difere diz quantos bits baixos variam. O prefixo é tudo acima dessa posição e o bloco se alinha para baixo nessa fronteira — assim, 10.1.2.3 e 10.1.9.200 compartilham uma /20 mas não caberiam numa /21, porque a diferença alcança o intervalo do bit 20.",
            "Mesclar à mão falha porque as pessoas raciocinam em decimal. 10.1.2.3 \"parece\" pertencer junto com 10.1.2.x, e uma /24 de fato o contém — mas emparelhá-lo com 10.1.9.200 força um bloco cujo terceiro octeto vai de 0 a 15, coisa que ninguém intui pelas strings decimais. O método XOR transforma um problema de intuição em aritmética de bits que ou funciona ou se prova que não.",
            "O resultado de contenção também diz o custo da sumarização: unir dois hosts numa regra pode arrastar 2.048 endereços que você não pretendia incluir. Leia a contagem de hosts do bloco resultante antes de colar num firewall, e prefira duas regras específicas a uma ampla quando os endereços extras importarem. Tudo calcula localmente no navegador — um plano de endereçamento interno nunca sai da página.",
          ],
        },
      ],
    },
  },
});
