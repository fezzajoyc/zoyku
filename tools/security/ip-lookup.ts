import { SecLookupEngine } from "../_engines/sec-engine-lookup";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "ip-lookup",
  category: "security",
  icon: "search",
  engine: { component: SecLookupEngine, props: { kind: "ip" } },
  related: ["dns-lookup", "whois-lookup", "email-validator"],
  copy: {
    en: {
      name: "IP Lookup",
      tagline:
        "Find any IP address's country, city, ISP and ASN in seconds — or check your own IP — with a free keyless API, right in your browser.",
      intro: [
        "Every device on the internet carries an IP address that hints at where it is and who routes it. Enter any IPv4 or IPv6 address to see its country and region, city, network operator (ISP), organization and autonomous system number (ASN), plus timezone and approximate coordinates.",
        "The data comes from the free, keyless ipwho.is database over HTTPS; there is no signup and no quota to watch. One tap checks your own connection, which is handy for confirming a VPN actually changed your visible location.",
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
    },
  },
});
