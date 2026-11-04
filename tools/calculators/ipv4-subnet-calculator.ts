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
    },
  },
});
