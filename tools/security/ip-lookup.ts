import { SecLookupEngine } from "../_engines/sec-engine-lookup";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "ip-lookup",
  category: "security",
  icon: "search",
  engine: { component: SecLookupEngine, props: { kind: "ip" } },
  related: ["dns-lookup", "whois-lookup", "email-validator", "password-generator", "totp-generator", "random-number", "password-strength"],
  copy: {
    en: {
      name: "IP Lookup",
      tagline:
        "Find any IP address's country, city, ISP and ASN in seconds — or check your own IP — with a free keyless API, right in your browser.",
      intro: [
        "Every device on the internet carries an IP address that hints at where it is and who routes it. Enter any IPv4 or IPv6 address to see its country and region, city, network operator (ISP), organization and autonomous system number (ASN), plus timezone and approximate coordinates.",
        "Geolocation is network-level, not device-level: results trace to where the ISP's routing infrastructure is registered, so mobile addresses often resolve to the wrong city and corporate ranges land on headquarters. Treat country and ASN as the reliable fields, and city-level accuracy as approximate rather than guaranteed.",
        "The data comes from the free, keyless ipwho.is database over HTTPS; there is no signup and no quota to watch. IPv4 and IPv6 are both supported, in any common notation, and each answer includes timezone and approximate coordinates alongside the network details.",
        "Registry whois shows who owns the block, not where it is used, and commercial IP intelligence APIs price per query behind API keys. This tool covers the everyday cases — identifying a log entry, sanity-checking firewall rules — and one tap checks your own connection, handy for confirming a VPN actually changed your visible location.",
      ],
      steps: [
        "Paste an IP into the field, or press Use my IP to inspect your own connection.",
        "Press Look up; the address is sent to the ipwho.is API over HTTPS.",
        "Read the results: location first, then network details like ISP, organization and ASN.",
        "Compare your own IP's results before and after switching VPN servers to confirm the change took effect.",
      ],
      faqs: [
        {
          q: "How accurate is the location?",
          a: "Country and region are usually right; city and coordinates are estimates based on where the ISP registers the address block, so mobile and VPN addresses can be off by many kilometers. Treat the results as network-level information, not a person's address.",
        },
        {
          q: "What does the ASN tell me?",
          a: "An autonomous system number identifies the network operator that owns the IP block — the ISP, a hosting company or a big corporation. Two IPs with the same ASN almost certainly belong to the same network, which is useful for spotting hosting ranges and abuse reports.",
        },
        {
          q: "What is sent over the network?",
          a: "Only the IP you want to look up, in an HTTPS request to ipwho.is. Looking up your own IP necessarily reveals your address to that API — the same one any geolocation service would see.",
        },
      ],
      deepDive: [
        {
          heading: "IP geolocation is registration data, not a map pin",
          paragraphs: [
            "The most common misconception about IP lookup is that it finds a device. It does not. A geolocation database is built from records of which organization registered an address block, where that organization's network infrastructure sits, and user corrections. The result you see is where the ISP's routing hardware is registered — a data center, a regional hub — not the phone or laptop actually using the address.",
            "The failure modes follow from that. Mobile carriers route traffic through regional gateways, so a phone in one city may show another. Large corporations register all their blocks at headquarters, so every office branch geolocates to the same building. Hosting and VPN addresses resolve to the data center, by design. Satellite internet may be an entire country off. City-level results are an estimate with no accuracy guarantee.",
            "The reliable fields are country, ASN and ISP: they come straight from registry data and rarely lie. A practical reading order is ASN first — it tells you whether the address belongs to a residential ISP, a hosting company or a mobile network — and only then the location fields, weighted accordingly.",
          ],
        },
        {
          heading: "What the ASN adds to the picture",
          paragraphs: [
            "Every routed block of IP space belongs to an autonomous system: a network — or group of networks — with a single routing policy, identified by an ASN. Knowing the ASN changes the question from \"where is this address\" to \"what kind of network is it\", which is often the answer you actually need.",
            "Concretely: an abuse report is more useful against a hosting ASN than a residential one, because hosting companies act on reports and ISPs have to trace a customer. Log triage leans on it too — a login from a residential ISP in an unusual country and a login from a cloud-provider ASN in the same country are two very different signals. Blocking decisions made on city-level geolocation routinely fail; decisions made on ASN and type of network hold up better.",
          ],
        },
        {
          heading: "Everyday uses and honest limits",
          paragraphs: [
            "The everyday cases are checking what a log entry really is, sanity-checking firewall or CDN rules before a deploy, and confirming a VPN actually changed your visible address — look up your own IP before and after connecting, and compare ASN and country. That last one is the cheapest VPN test there is.",
            "The honest limits: this is network-level information and cannot identify a person; the query itself is visible to the geolocation API, including when you look up your own IP; and commercial intelligence products add fraud scores and proxy detection that a free database does not carry. Use it for what it is good at — network identification and approximate geography — not as an investigative endpoint.",
          ],
        },
      ],
    },
    zh: {
      name: "IP 地址查询",
      tagline: "几秒内查到任意 IP 的国家、城市、运营商和 ASN——也可查询你自己的 IP。基于免费免密钥接口,浏览器内直接完成。",
      intro: [
        "互联网上的每台设备都带着一个 IP 地址,它暗示了设备的位置和所属网络。输入任意 IPv4 或 IPv6 地址,即可查看其国家地区、城市、网络运营商(ISP)、所属组织和自治系统号(ASN),以及时区和大致坐标。",
        "数据来自免费、免密钥的 ipwho.is 数据库(HTTPS 传输),无需注册、没有配额限制。一键查询你自己的连接,也适合确认 VPN 是否真的改变了你对外呈现的位置。",
      ],
      steps: [
        "在输入框粘贴 IP,或点击“查我自己的 IP”检查当前连接。",
        "点击“查询”,地址会通过 HTTPS 发送到 ipwho.is 接口。",
        "阅读结果:先看位置信息,再看 ISP、组织、ASN 等网络细节。",
        "切换 VPN 节点前后各查一次自己的 IP,即可确认位置已生效。",
      ],
      faqs: [
        {
          q: "定位有多准确?",
          a: "国家和地区通常准确;城市和坐标是根据运营商登记的地址段估算的,手机网络和 VPN 地址可能偏差几十公里。请把结果当作网络层面的信息,而不是某个人的住址。",
        },
        {
          q: "ASN 能说明什么?",
          a: "自治系统号(ASN)标识拥有该 IP 段的网络运营方——运营商、主机商或大型企业。同一 ASN 的 IP 几乎必然属于同一网络,可用于识别托管商网段或提交滥用报告。",
        },
        {
          q: "联网时发送了什么?",
          a: "只有你要查询的那个 IP,以 HTTPS 请求发往 ipwho.is。查询自己的 IP 时,该接口必然会看到你的地址——任何地理定位服务也都会看到同样的信息。",
        },
      ],
      deepDive: [
        {
          heading: "IP 归属地是注册数据,不是地图上的钉子",
          paragraphs: [
            "对 IP 查询最常见的误解是“它能找到一台设备”。它不能。地理定位数据库由三类信息构成:哪个组织注册了这个地址段、该组织的网络基础设施放在哪里、以及用户提交的纠错。你看到的结果是 ISP 的路由设备注册地——某个数据中心、某个区域枢纽——而不是实际使用这个地址的那台手机或笔记本。",
            "种种失真都源于此:移动运营商经区域网关转发流量,一个城市的手机可能显示成另一个城市;大公司把所有地址段统一登记在总部,于是各地分公司都“定位”到同一栋楼;托管与 VPN 地址按设计解析到数据中心位置;卫星宽带可能偏出一整个国家。城市级结果只是估算,没有任何精度保证。",
            "可靠的字段是国家、ASN 和 ISP:它们直接来自注册数据,很少出错。实用的阅读顺序是先看 ASN——它告诉你这个地址属于住宅 ISP、托管商还是移动网络——然后才看位置字段,并按这个判断给位置打折扣。",
          ],
        },
        {
          heading: "ASN 补充了什么视角",
          paragraphs: [
            "每一段被路由的 IP 空间都属于一个自治系统:一个(或一组)网络,有统一的路由策略,用 ASN 标识。知道 ASN 之后,问题就从“这个地址在哪里”变成“这是个什么网络”——后者往往才是你真正需要的答案。",
            "具体来说:同样的滥用报告,发给托管商的 ASN 比发给住宅 ISP 更有用,因为托管商会处理报告,而 ISP 只能去追查某个用户。日志排查也依赖它——“来自某国住宅 ISP 的登录”和“来自同一国家云厂商 ASN 的登录”是完全不同的两种信号。基于城市级定位做拦截决策经常失败;基于 ASN 和网络类型的决策靠谱得多。",
          ],
        },
        {
          heading: "日常用法与诚实的边界",
          paragraphs: [
            "日常场景有三类:搞清楚日志里的一个地址到底是什么、部署前核对防火墙或 CDN 规则、以及确认 VPN 真的换了你的对外地址——连接前后各查一次自己的 IP,对比 ASN 和国家即可,这是最便宜的 VPN 测试。",
            "诚实的边界:这是网络层面信息,无法定位到某个人;查询本身对地理定位 API 可见,查自己的 IP 时也不例外;商业情报产品额外提供欺诈评分和代理识别,免费数据库没有这些。把它用在擅长的地方——识别网络和大致地理位置——而不是当调查终点。",
          ],
        },
      ],
    },
    ja: {
      name: "IP アドレス検索",
      tagline:
        "任意の IP の国・都市・プロバイダー・ASN を数秒で特定。自分の IP も確認できます。無料でキー不要の API をブラウザから直接利用。",
      intro: [
        "インターネット上のすべての機器は、所在と経由ネットワークを示す IP アドレスを持っています。IPv4・IPv6 を問わずアドレスを入力すると、国と地域、都市、プロバイダー(ISP)、組織、自律システム番号(ASN)、タイムゾーン、おおよその座標が分かります。",
        "データは無料・キー不要の ipwho.is データベースから HTTPS で取得します。登録もクォータも不要で、自分の接続もワンタップで確認できます。VPN を切り替えたときの見かけ上の位置確認にも便利です。",
      ],
      steps: [
        "IP を入力するか、「自分の IP を調べる」で現在の接続を確認します。",
        "「検索」を押すと、アドレスが HTTPS で ipwho.is API に送信されます。",
        "結果を確認します。まず位置情報、続いて ISP・組織・ASN などのネットワーク詳細です。",
        "VPN 切替の前後で自分の IP を検索して、位置が変わったことを確かめます。",
      ],
      faqs: [
        {
          q: "位置情報の精度は?",
          a: "国と地域はおおむね正確です。都市や座標は ISP が登録したアドレス帯から推定したもので、モバイル回線や VPN では数十 km ずれることがあります。結果はネットワークレベルの情報として扱い、個人住所として扱わないでください。",
        },
        {
          q: "ASN から何が分かりますか?",
          a: "ASN(自律システム番号)は IP ブロックを所有するネットワーク事業者(ISP、ホスティング、大企業など)を示します。同じ ASN の IP はほぼ確実に同じネットワークで、ホスティング帯域の特定や不正利用の報告に役立ちます。",
        },
        {
          q: "ネットワークには何が送られますか?",
          a: "検索したい IP だけが HTTPS で ipwho.is に送られます。自分の IP を調べるときは、その API があなたのアドレスを受け取ります。どの位置情報サービスでも同じことです。",
        },
      ],
      deepDive: [
        {
          heading: "IP の地理情報は登録データであり、地図のピンではない",
          paragraphs: [
            "IP 検索についての最も多い誤解は「デバイスを見つけられる」というものです。できません。位置情報データベースは、どの組織がアドレス帯を登録したか、その組織のネットワーク設備がどこにあるか、ユーザーからの訂正、という情報から作られています。あなたが見る結果は ISP のルーティング設備の登録地——データセンターや地域ハブ——であって、実際にそのアドレスを使っているスマホやノート PC ではありません。",
            "失敗パターンはここから説明できます。携帯キャリアは地域ゲートウェイ経由で通信するため、ある都市の携帯が別の都市に表示されることがあります。大企業はすべてのアドレス帯を本社で登録するため、支社がどこでも同じ建物に「位置特定」されます。ホスティングや VPN のアドレスは設計通りデータセンターの場所に解決され、衛星インターネットは国単位でずれることもあります。都市レベルの結果は精度保証のない推定値です。",
            "信頼できるのは国・ASN・ISP の各フィールドです。これらは登録データから直接得られ、ほとんど嘘をつきません。実用的な読み取り順は、まず ASN——アドレスが住宅 ISP、ホスティング、モバイル回線のどれに属するかを教えてくれます——そしてその判断を踏まえて位置フィールドを見る、という流れです。",
          ],
        },
        {
          heading: "ASN が補ってくれる視点",
          paragraphs: [
            "ルーティングされるすべての IP 帯は、自律システムに属しています。単一のルーティングポリシーを持つネットワーク(またはネットワーク群)で、ASN によって識別されます。ASN が分かると、問いは「このアドレスはどこか」から「これはどんなネットワークか」に変わります。多くの場合、後者のほうが本当に必要な答えです。",
            "具体例を挙げます。同じ不正利用報告でも、住宅 ISP よりホスティングの ASN に送るほうが効果的です。ホスティング会社は報告に動き、ISP は顧客を追跡しなければならないからです。ログの調査も同様で、「異国の住宅 ISP からのログイン」と「同じ国のクラウド事業者 ASN からのログイン」はまったく別のシグナルです。都市レベルの位置情報に基づくブロック判断は頻繁に裏目に出ますが、ASN とネットワーク種別に基づく判断ははるかに堅牢です。",
          ],
        },
        {
          heading: "日常的な用途と誠実な限界",
          paragraphs: [
            "日常的な場面は三つあります。ログに現れたアドレスの正体を確かめること、デプロイ前にファイアウォールや CDN の設定を確認すること、そして VPN が本当に見かけ上のアドレスを変えたかを確かめることです。最後のものは、接続の前後で自分の IP を検索して ASN と国を比べるだけ——最も安価な VPN テストです。",
            "誠実な限界もあります。これはネットワークレベルの情報であり、個人を特定できません。照会そのものは位置情報 API から見えており、自分の IP を調べるときも例外ではありません。商用インテリジェンス製品が持つ不正スコアやプロキシ検出は、無料データベースには含まれていません。得意なこと——ネットワークの識別とおおよその地理——に使うのが正しい付き合い方で、調査の最終段と考えるべきではありません。",
          ],
        },
      ],
    },
    es: {
      name: "Consulta de IP",
      tagline:
        "Descubre en segundos el país, ciudad, ISP y ASN de cualquier IP — o consulta la tuya — con una API gratuita sin clave, desde tu navegador.",
      intro: [
        "Cada dispositivo de internet lleva una dirección IP que sugiere dónde está y quién lo enruta. Introduce cualquier IPv4 o IPv6 para ver su país y región, ciudad, operador (ISP), organización y número de sistema autónomo (ASN), además de zona horaria y coordenadas aproximadas.",
        "Los datos llegan de la base gratuita y sin clave de ipwho.is por HTTPS; no hay registro ni cuota que vigilar. Un toque comprueba tu propia conexión, ideal para confirmar que tu VPN cambió de verdad tu ubicación visible.",
      ],
      steps: [
        "Pega una IP en el campo, o pulsa Usar mi IP para examinar tu conexión.",
        "Pulsa Consultar; la dirección se envía a la API de ipwho.is por HTTPS.",
        "Lee los resultados: primero la ubicación, luego los detalles de red como ISP, organización y ASN.",
        "Compara tu IP antes y después de cambiar de servidor VPN para confirmar que el cambio surtió efecto.",
      ],
      faqs: [
        {
          q: "¿Cómo de precisa es la ubicación?",
          a: "El país y la región suelen ser acertados; la ciudad y las coordenadas son estimaciones basadas en dónde registra el bloque el ISP, así que redes móviles y VPN pueden desviarse muchos kilómetros. Trata los resultados como información de red, no como la dirección de una persona.",
        },
        {
          q: "¿Qué me dice el ASN?",
          a: "El número de sistema autónomo identifica al operador que posee el bloque de IP: la ISP, una empresa de hosting o una gran corporación. Dos IP con el mismo ASN casi seguro pertenecen a la misma red, útil para detectar rangos de hosting y reportes de abuso.",
        },
        {
          q: "¿Qué se envía por la red?",
          a: "Solo la IP que quieres consultar, en una petición HTTPS a ipwho.is. Al consultar tu propia IP, esa API ve tu dirección por necesidad — lo mismo que vería cualquier servicio de geolocalización.",
        },
      ],
      deepDive: [
        {
          heading: "La geolocalización por IP es un registro, no un pin en el mapa",
          paragraphs: [
            "La idea errónea más común sobre las consultas de IP es que localizan un dispositivo. No lo hacen. Una base de geolocalización se construye con registros de qué organización registró cada bloque de direcciones, dónde está su infraestructura de red y correcciones de los usuarios. El resultado que ves es dónde está registrado el equipo de routing del ISP — un centro de datos, un nodo regional — no el móvil o el portátil que realmente usa la dirección.",
            "Los fallos típicos se explican por eso. Las operadoras móviles enrutan por pasarelas regionales, así que un teléfono en una ciudad puede aparecer en otra. Las grandes empresas registran todos sus bloques en la sede, y cada sucursal se geolocaliza al mismo edificio. Las direcciones de hosting y VPN resuelven al centro de datos, por diseño. Internet por satélite puede desviarse un país entero. La ciudad es una estimación sin garantía de precisión.",
            "Los campos fiables son país, ASN e ISP: salen directamente de los registros y rara vez mienten. Un orden práctico de lectura es el ASN primero — te dice si la dirección pertenece a un ISP residencial, un hosting o una red móvil — y después los campos de ubicación, valorados en consecuencia.",
          ],
        },
        {
          heading: "Qué aporta el ASN",
          paragraphs: [
            "Cada bloque de espacio IP enrutado pertenece a un sistema autónomo: una red — o grupo de redes — con una única política de enrutado, identificada por un ASN. Saber el ASN cambia la pregunta de \"dónde está esta dirección\" a \"qué tipo de red es\", que suele ser la respuesta que de verdad necesitas.",
            "En concreto: un reporte de abuso sirve más contra el ASN de un hosting que contra uno residencial, porque las empresas de hosting actúan sobre los reportes y los ISP deben rastrear a un cliente. El triaje de logs también se apoya en ello — un acceso desde un ISP residencial de un país inusual y uno desde el ASN de un proveedor cloud del mismo país son señales muy distintas. Las decisiones de bloqueo basadas en geolocalización de ciudad fallan con frecuencia; las basadas en ASN y tipo de red aguantan mucho mejor.",
          ],
        },
        {
          heading: "Usos cotidianos y límites honestos",
          paragraphs: [
            "Los casos de cada día son ver qué es de verdad una entrada de log, revisar reglas de firewall o CDN antes de un despliegue y confirmar que tu VPN cambió de verdad tu dirección visible — consulta tu propia IP antes y después de conectar y compara ASN y país. Esa última es la prueba de VPN más barata que existe.",
            "Los límites honestos: es información de nivel de red y no puede identificar a una persona; la consulta en sí es visible para la API de geolocalización, también al consultar tu propia IP; y los productos comerciales de inteligencia añaden puntuaciones de fraude y detección de proxies que una base gratuita no tiene. Úsalo para lo que hace bien — identificar redes y geografía aproximada — no como punto final de una investigación.",
          ],
        },
      ],
    },
    pt: {
      name: "Consulta de IP",
      tagline:
        "Descubra em segundos o país, cidade, provedor e ASN de qualquer IP — ou consulte o seu — com uma API gratuita sem chave, direto no navegador.",
      intro: [
        "Todo aparelho na internet carrega um endereço IP que indica onde está e por quem é roteado. Digite qualquer IPv4 ou IPv6 para ver o país e a região, cidade, operadora (ISP), organização e número de sistema autônomo (ASN), além de fuso horário e coordenadas aproximadas.",
        "Os dados vêm da base gratuita e sem chave do ipwho.is por HTTPS; sem cadastro e sem cota. Um toque confere a sua própria conexão — ótimo para confirmar que a VPN realmente mudou sua localização visível.",
      ],
      steps: [
        "Cole um IP no campo ou clique em Usar meu IP para examinar sua conexão.",
        "Clique em Consultar; o endereço é enviado à API do ipwho.is por HTTPS.",
        "Leia os resultados: primeiro a localização, depois os detalhes de rede como ISP, organização e ASN.",
        "Compare seu IP antes e depois de trocar de servidor VPN para confirmar que a mudança valeu.",
      ],
      faqs: [
        {
          q: "Qual é a precisão da localização?",
          a: "País e região costumam estar certos; cidade e coordenadas são estimativas baseadas em onde a operadora registra o bloco, então redes móveis e VPN podem errar por muitos quilômetros. Trate o resultado como informação de rede, não como o endereço de uma pessoa.",
        },
        {
          q: "O que o ASN me diz?",
          a: "O número de sistema autônomo identifica a operadora dona do bloco de IP — a provedora, uma empresa de hospedagem ou uma grande corporação. Dois IPs com o mesmo ASN quase certamente pertencem à mesma rede, o que ajuda a identificar faixas de hospedagem e reportar abusos.",
        },
        {
          q: "O que é enviado pela rede?",
          a: "Apenas o IP que você quer consultar, numa requisição HTTPS ao ipwho.is. Ao consultar o seu próprio IP, essa API necessariamente vê o seu endereço — o mesmo que qualquer serviço de geolocalização veria.",
        },
      ],
      deepDive: [
        {
          heading: "Geolocalização por IP é registro, não um pin no mapa",
          paragraphs: [
            "A ideia errada mais comum sobre consulta de IP é que ela localiza um aparelho. Não localiza. Uma base de geolocalização é construída com registros de qual organização registrou cada bloco de endereços, onde fica a infraestrutura de rede dessa organização e correções de usuários. O resultado que você vê é onde o equipamento de roteamento do ISP está registrado — um data center, um nó regional — não o celular ou o notebook que realmente usa o endereço.",
            "Os erros típicos decorrem disso. Operadoras móveis roteiam por gateways regionais, então um celular numa cidade pode aparecer em outra. Grandes empresas registram todos os blocos na matriz, e cada filial se geolocaliza no mesmo prédio. Endereços de hospedagem e VPN resolvem para o data center, por desenho. Internet via satélite pode errar um país inteiro. O resultado no nível de cidade é uma estimativa sem garantia de precisão.",
            "Os campos confiáveis são país, ASN e ISP: vêm direto dos registros e raramente mentem. Uma ordem prática de leitura é o ASN primeiro — ele diz se o endereço pertence a um ISP residencial, uma hospedagem ou uma rede móvel — e depois os campos de localização, ponderados por isso.",
          ],
        },
        {
          heading: "O que o ASN acrescenta",
          paragraphs: [
            "Cada bloco de espaço IP roteado pertence a um sistema autônomo: uma rede — ou grupo de redes — com uma única política de roteamento, identificada por um ASN. Saber o ASN muda a pergunta de \"onde está esse endereço\" para \"que tipo de rede é\", que costuma ser a resposta que você realmente precisa.",
            "Em concreto: um reporte de abuso vale mais contra o ASN de uma hospedagem que contra um residencial, porque empresas de hospedagem agem sobre reportes e provedoras precisam rastrear um cliente. O triagem de logs também depende disso — um acesso de um ISP residencial de um país incomum e um acesso do ASN de um provedor de nuvem no mesmo país são sinais bem diferentes. Decisões de bloqueio baseadas em geolocalização de cidade falham com frequência; baseadas em ASN e tipo de rede aguentam muito melhor.",
          ],
        },
        {
          heading: "Usos do dia a dia e limites honestos",
          paragraphs: [
            "Os casos cotidianos são entender o que é de fato uma entrada de log, revisar regras de firewall ou CDN antes de um deploy e confirmar que a VPN realmente mudou seu endereço visível — consulte o próprio IP antes e depois de conectar e compare ASN e país. Essa última é a prova de VPN mais barata que existe.",
            "Os limites honestos: é informação de nível de rede e não identifica uma pessoa; a consulta em si é visível para a API de geolocalização, inclusive ao consultar o próprio IP; e produtos comerciais de inteligência acrescentam scores de fraude e detecção de proxy que uma base gratuita não traz. Use para o que ela faz bem — identificar redes e geografia aproximada — não como fim de uma investigação.",
          ],
        },
      ],
    },
  },
});
