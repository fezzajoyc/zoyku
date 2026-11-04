import { SecLookupEngine } from "../_engines/sec-engine-lookup";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "whois-lookup",
  category: "security",
  icon: "file",
  engine: { component: SecLookupEngine, props: { kind: "whois" } },
  related: ["dns-lookup", "ip-lookup", "email-validator", "password-generator", "totp-generator", "random-number", "password-strength"],
  copy: {
    en: {
      name: "WHOIS Lookup",
      tagline:
        "Check domain registration data via RDAP — registrar, creation and expiry dates, status codes and nameservers — with clear notes on TLD coverage.",
      intro: [
        "Registration records answer the questions a domain's storefront hides: who runs it, when it was created and when it expires. This tool queries the modern RDAP protocol — the official successor to port-43 WHOIS — over HTTPS and organizes the response into dates, registrar, status codes and nameservers.",
        "rdap.org routes your query to the registry's official RDAP server. Coverage is broad but not universal: most country-code registries (.cn, .de, .br…) still lack public RDAP servers, and the tool tells you plainly when a TLD isn't covered instead of showing empty fields.",
      ],
      steps: [
        "Enter the domain you're researching (example.com) and press Look up.",
        "Read the dates first: creation and expiry reveal domain age and renewal habits.",
        "Check the registrar and status codes — clientTransferProhibited means transfer-locked, redemptionPeriod hints the domain may soon drop.",
        "Scan the nameservers to see who actually operates the domain's DNS.",
      ],
      faqs: [
        {
          q: "Why RDAP instead of classic WHOIS?",
          a: "RDAP returns structured JSON over HTTPS instead of unstructured text over an archaic port. It supports authentication, rate limiting and internationalized domains, and ICANN requires it for all gTLD registries. This tool follows rdap.org's redirects to whichever registry runs the TLD.",
        },
        {
          q: "Why do some TLDs fail with “not covered”?",
          a: "Each registry chooses whether to run a public RDAP service. Nearly all generic TLDs (.com, .net, .app…) do, but many country codes — .cn, .de, .br, among others — still don't. When rdap.org finds no server for a TLD, the tool shows a clear explanation rather than an empty result.",
        },
        {
          q: "What is sent over the network?",
          a: "The domain name only, in an HTTPS request to rdap.org, which may redirect to the registry's official RDAP endpoint. Registration data is public by design; nothing personal about you is transmitted.",
        },
      ],
    },
    zh: {
      name: "WHOIS 域名查询",
      tagline: "通过 RDAP 查询域名注册信息——注册商、注册与到期时间、状态码和域名服务器,并对顶级域名支持情况给出清晰提示。",
      intro: [
        "注册记录能回答域名挂牌信息之外的问题:由谁运营、何时创建、何时到期。本工具通过 HTTPS 查询新一代 RDAP 协议——传统 43 端口 WHOIS 的官方继任者——并把返回结果整理成日期、注册商、状态码和域名服务器。",
        "rdap.org 会把查询转发到对应注册管理机构的官方 RDAP 服务器。覆盖面很广但不完整:.cn、.de、.br 等多数国家级域名仍缺少公开 RDAP 服务;遇到不支持的顶级域名,工具会明确说明,而不是显示一排空字段。",
      ],
      steps: [
        "输入要调查的域名(example.com),点击“查询”。",
        "先看日期:注册时间反映域名年龄,到期时间反映续费习惯。",
        "查看注册商和状态码——clientTransferProhibited 表示已锁转移,redemptionPeriod 提示域名可能即将被释放。",
        "浏览域名服务器列表,了解该域名的 DNS 实际由谁运营。",
      ],
      faqs: [
        {
          q: "为什么用 RDAP 而不是传统 WHOIS?",
          a: "RDAP 通过 HTTPS 返回结构化 JSON,而不是在古老端口上返回非结构化文本;它支持身份验证、限流和国际化域名,ICANN 要求所有通用顶级域名注册局提供。本工具会跟随 rdap.org 的重定向,找到运营该顶级域名的注册局。",
        },
        {
          q: "为什么有些顶级域名会提示“暂不支持”?",
          a: "是否提供公开 RDAP 服务由各注册局自行决定。几乎所有通用顶级域名(.com、.net、.app 等)都有,但很多国家级域名——如 .cn、.de、.br——仍然没有。当 rdap.org 对某个顶级域名查无服务时,工具会给出明确解释,而不是返回空结果。",
        },
        {
          q: "联网时发送了什么?",
          a: "只有域名本身,以 HTTPS 请求发往 rdap.org(可能重定向到注册局官方 RDAP 接口)。注册信息本来就是公开的;不会传输任何与你个人有关的数据。",
        },
      ],
    },
    ja: {
      name: "WHOIS ドメイン検索",
      tagline:
        "RDAP 経由でドメイン登録情報を確認:レジストラ、登録・有効期限、ステータス、ネームサーバー。TLD の対応状況も明確に表示します。",
      intro: [
        "登録情報は、ドメインの公開ページだけでは分からないことを教えてくれます。誰が運営し、いつ作られ、いつ切れるのか。このツールは旧来のポート 43 WHOIS の公式後継である RDAP を HTTPS で照会し、結果を日付・レジストラ・ステータス・ネームサーバーに整理します。",
        "rdap.org が各レジストリの公式 RDAP サーバーへ振り分けます。対応範囲は広いものの完全ではなく、「.cn」「.de」「.br」など多くの ccTLD には公開 RDAP がまだありません。未対応の TLD では空欄ではなく、はっきりとその旨を表示します。",
      ],
      steps: [
        "調べたいドメイン(example.com)を入力して「検索」を押します。",
        "まず日付を確認します。登録日はドメインの歴史、有効期限は更新の習慣を物語ります。",
        "レジストラとステータスを確認します。clientTransferProhibited は移転ロック、redemptionPeriod はまもなく解放される可能性を示します。",
        "ネームサーバーを見て、DNS を実際に運営しているのが誰かを把握します。",
      ],
      faqs: [
        {
          q: "従来の WHOIS ではなく RDAP を使う理由は?",
          a: "RDAP は古いポート上の非構造化テキストではなく、HTTPS で構造化 JSON を返します。認証、レート制限、国際化ドメインに対応し、ICANN はすべての gTLD レジストリに提供を求めています。このツールは rdap.org のリダイレクトに従い、その TLD を運営するレジストリに到達します。",
        },
        {
          q: "一部の TLD で「未対応」と出るのはなぜ?",
          a: "公開 RDAP を運営するかは各レジストリの判断です。「.com」「.net」「.app」などの gTLD はほぼすべて対応済みですが、「.cn」「.de」「.br」など多くの ccTLD はまだです。rdap.org が TLD のサーバーを見つけられないとき、空の結果ではなく明確な説明を表示します。",
        },
        {
          q: "ネットワークには何が送られますか?",
          a: "ドメイン名だけです。HTTPS で rdap.org に送られ、レジストリ公式の RDAP エンドポイントへリダイレクトされることがあります。登録情報はもともと公開のためのものです。あなた個人の情報は一切送信されません。",
        },
      ],
    },
    es: {
      name: "Consulta WHOIS",
      tagline:
        "Consulta datos de registro de dominios vía RDAP: registrador, fechas de creación y caducidad, estados y servidores DNS, con avisos de cobertura.",
      intro: [
        "Los registros de dominio responden lo que la portada oculta: quién lo gestiona, cuándo se creó y cuándo caduca. Esta herramienta consulta el protocolo RDAP —sucesor oficial del WHOIS del puerto 43— por HTTPS y organiza la respuesta en fechas, registrador, estados y servidores DNS.",
        "rdap.org dirige tu consulta al servidor RDAP oficial del registro. La cobertura es amplia pero no universal: muchos registros nacionales (.cn, .de, .br…) siguen sin servidores RDAP públicos, y la herramienta te lo dice claramente en vez de mostrar campos vacíos.",
      ],
      steps: [
        "Introduce el dominio que quieres investigar (example.com) y pulsa Consultar.",
        "Lee primero las fechas: creación y caducidad revelan la edad del dominio y sus hábitos de renovación.",
        "Revisa el registrador y los estados: clientTransferProhibited significa bloqueo de transferencia, redemptionPeriod sugiere que el dominio puede liberarse pronto.",
        "Mira los servidores DNS para saber quién opera realmente el DNS del dominio.",
      ],
      faqs: [
        {
          q: "¿Por qué RDAP en lugar del WHOIS clásico?",
          a: "RDAP devuelve JSON estructurado por HTTPS en vez de texto sin estructura por un puerto arcaico. Soporta autenticación, límites de peticiones y dominios internacionalizados, e ICANN lo exige a todos los registros gTLD. La herramienta sigue las redirecciones de rdap.org hasta el registro del TLD.",
        },
        {
          q: "¿Por qué algunos TLD fallan con «no cubierto»?",
          a: "Cada registro decide si ofrece un servicio RDAP público. Casi todos los TLD genéricos (.com, .net, .app…) lo hacen, pero muchos códigos de país — .cn, .de, .br entre otros — todavía no. Cuando rdap.org no encuentra servidor para un TLD, la herramienta muestra una explicación clara en lugar de un resultado vacío.",
        },
        {
          q: "¿Qué se envía por la red?",
          a: "Solo el nombre del dominio, en una petición HTTPS a rdap.org que puede redirigir al endpoint RDAP oficial del registro. Los datos de registro son públicos por diseño; no se transmite nada personal sobre ti.",
        },
      ],
    },
    pt: {
      name: "Consulta WHOIS",
      tagline:
        "Consulte dados de registro de domínios via RDAP: registrante, datas de criação e expiração, status e servidores DNS, com avisos de cobertura.",
      intro: [
        "Os registros de domínio respondem ao que a vitrine esconde: quem opera, quando foi criado e quando expira. Esta ferramenta consulta o protocolo RDAP — sucessor oficial do WHOIS na porta 43 — por HTTPS e organiza a resposta em datas, registrante, códigos de status e servidores DNS.",
        "O rdap.org encaminha sua consulta ao servidor RDAP oficial do registro. A cobertura é ampla, mas não universal: muitos registros nacionais (.cn, .de, .br…) ainda não têm servidores RDAP públicos, e a ferramenta avisa com clareza quando um TLD não é coberto, em vez de mostrar campos vazios.",
      ],
      steps: [
        "Digite o domínio que quer investigar (exemplo.com) e clique em Consultar.",
        "Leia primeiro as datas: criação e expiração revelam a idade do domínio e o hábito de renovação.",
        "Confira o registrante e os códigos de status — clientTransferProhibited indica bloqueio de transferência, redemptionPeriod sugere que o domínio pode ser liberado em breve.",
        "Veja os servidores DNS para saber quem opera de fato o DNS do domínio.",
      ],
      faqs: [
        {
          q: "Por que RDAP em vez do WHOIS clássico?",
          a: "O RDAP devolve JSON estruturado por HTTPS em vez de texto sem estrutura numa porta arcaica. Ele suporta autenticação, limite de requisições e domínios internacionalizados, e a ICANN exige dos registros gTLD. A ferramenta segue os redirecionamentos do rdap.org até o registro que opera o TLD.",
        },
        {
          q: "Por que alguns TLDs falham com 'não coberto'?",
          a: "Cada registro decide se mantém um serviço RDAP público. Quase todos os TLDs genéricos (.com, .net, .app…) mantêm, mas muitos códigos de país — .cn, .de, .br entre outros — ainda não. Quando o rdap.org não encontra servidor para um TLD, a ferramenta mostra uma explicação clara em vez de um resultado vazio.",
        },
        {
          q: "O que é enviado pela rede?",
          a: "Apenas o nome do domínio, numa requisição HTTPS ao rdap.org, que pode redirecionar ao endpoint RDAP oficial do registro. Os dados de registro são públicos por natureza; nada pessoal seu é transmitido.",
        },
      ],
    },
  },
});
