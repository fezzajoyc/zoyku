import { SecLookupEngine } from "../_engines/sec-engine-lookup";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "dns-lookup",
  category: "security",
  icon: "globe",
  engine: { component: SecLookupEngine, props: { kind: "dns" } },
  related: ["ip-lookup", "whois-lookup", "email-validator", "password-generator", "totp-generator", "random-number", "password-strength"],
  copy: {
    en: {
      name: "DNS Lookup",
      tagline:
        "Look up A, AAAA, MX, TXT, NS and CNAME records for any domain via DNS-over-HTTPS in a clean table — no terminal or dig commands needed.",
      intro: [
        "DNS records tell you where a domain points, how it sends email and how it proves ownership. This tool resolves any record type through DNS-over-HTTPS (DoH) — the same encrypted channel modern browsers use — and lays the answers out in a readable table.",
        "Answers come back exactly as the authoritative servers publish them, TTL included. DoH returns raw DNS wire data, so a TXT record shows every quoted string segment merged the way resolvers concatenate them — which is exactly what you need when checking SPF, DKIM or DMARC policy strings for syntax errors.",
        "Queries run against Google's free public resolver over HTTPS: nothing to install, no API key, and the lookup is not visible to the local network the way a plaintext UDP query on port 53 would be. That makes it usable from restrictive or hostile networks where direct DNS is blocked or intercepted.",
        "Command-line dig and nslookup are precise but platform-bound, and registrar dashboards only show records for domains they host. This tool covers every record type for any domain from any browser — handy for checking propagation after a change or debugging why mail to a domain bounces.",
      ],
      steps: [
        "Type the domain (example.com, no http:// needed) and pick a record type.",
        "Press Look up; the query goes over encrypted DoH to the public resolver.",
        "Read the table: each row shows the record type, TTL and the value — an IP for A/AAAA, or a mail server with priority for MX.",
        "Switch record types to see the full picture: MX for mail, TXT for SPF/DKIM, NS for who runs the DNS.",
      ],
      faqs: [
        {
          q: "What are the main record types for?",
          a: "A maps a name to an IPv4 address, AAAA to IPv6. MX lists the mail servers and their priorities. TXT holds free-form text — usually SPF, DKIM and DMARC policies. NS names the authoritative nameservers. CNAME is an alias pointing one name at another. Each answers a different question about the same domain.",
        },
        {
          q: "What is sent over the network?",
          a: "The domain name and record type in one DNS-over-HTTPS query to dns.google, encrypted like any HTTPS request. Nothing about you is added, and no API key or account is involved.",
        },
        {
          q: "Why do I sometimes see CNAME rows when I asked for A?",
          a: "Resolvers include the full chain: if www.example.com is a CNAME to example.com, an A query returns the alias plus the final A record. The extra rows show you exactly how the name resolves.",
        },
      ],
      deepDive: [
        {
          heading: "What happens between your query and the answer",
          paragraphs: [
            "DNS is a hierarchy, and a single lookup can touch several servers. When nothing is cached, a resolver first asks a root server, which points it at the nameservers for the top-level domain (.com, .org), which point it at the domain's own authoritative nameservers — the ones that actually hold the answer. Each level replies with a referral, and the resolver walks down the chain until it gets a record it can hand back.",
            "Caching shortens this walk. Every record carries a TTL (time to live) in seconds, telling resolvers how long they may reuse the answer. A low TTL like 300 means changes propagate within minutes but every lookup hits the authoritative server more often; a high TTL like 86400 keeps answers cached for a day, which is cheap and stable but slow to update. When you lower a TTL before a planned migration, you are scheduling how quickly the world will forget the old answer.",
            "One nuance this tool makes visible: your browser or OS may have its own cache in front of the public resolver, and some resolvers return cached answers without checking whether the zone changed. If a record looks stale here, it is usually TTL still counting down — not a mistake in the query.",
          ],
        },
        {
          heading: "Choosing the right record type for the job",
          paragraphs: [
            "Most debugging starts with the wrong record type. Mail problems are almost never an A-record problem: check MX first, then the TXT records for SPF, DKIM and DMARC. SPF lives as a single TXT string on the domain itself, DKIM on a selector subdomain such as s1._domainkey.example.com, and DMARC on _dmarc.example.com. Because DoH returns the raw answer with segments merged, you can read the whole policy string here and spot the syntax mistakes that silently break mail delivery.",
            "A, AAAA, NS and CNAME answer different questions: does the site resolve, and over IPv6? Who runs the DNS? Is this name an alias? A CNAME answer to an A query is normal and expected — resolvers include the whole chain — but a domain cannot have a CNAME alongside other records at the same name, which is why apex domains often use ALIAS or flattened records at the provider instead.",
          ],
        },
        {
          heading: "Why DNS-over-HTTPS, and what this tool does not do",
          paragraphs: [
            "Traditional DNS queries travel as plaintext UDP on port 53, visible to anyone on the network path — the coffee-shop router, the ISP, middleboxes. DNS-over-HTTPS wraps the same query in a normal TLS connection, so the lookup is private from the local network and passes through networks that block or hijack port 53. That is why this tool works in environments where dig fails.",
            "It is a lookup tool, not a live monitoring service: it shows one point-in-time answer from one resolver, including cached values, and does not query authoritative servers directly or compare answers across resolvers. For changes you control, the practical workflow is: lower the TTL in advance, make the change, then re-check here until the new value appears.",
          ],
        },
      ],
    },
    zh: {
      name: "DNS 记录查询",
      tagline: "通过 DNS-over-HTTPS 查询任意域名的 A、AAAA、MX、TXT、NS、CNAME 记录,表格清晰呈现——无需终端和 dig 命令。",
      intro: [
        "DNS 记录决定域名指向哪里、如何收发邮件、如何证明所有权。本工具通过 DNS-over-HTTPS(DoH)——现代浏览器同款加密通道——解析任意记录类型,并把结果整理成易读的表格。",
        "查询走 Google 免费公共解析器,无需安装、无需 API 密钥。适合检查解析变更是否生效、核对 SPF/DKIM/DMARC 的 TXT 记录,或排查域名收不到邮件的原因。",
      ],
      steps: [
        "输入域名(如 example.com,不用带 http://),选择记录类型。",
        "点击“查询”,请求会以加密 DoH 方式发往公共解析器。",
        "阅读表格:每行显示记录类型、TTL 和值——A/AAAA 是 IP,MX 是带优先级的邮件服务器。",
        "切换记录类型看全貌:MX 看邮件、TXT 看 SPF/DKIM、NS 看由谁提供 DNS 服务。",
      ],
      faqs: [
        {
          q: "各种记录类型分别表示什么?",
          a: "A 把域名映射到 IPv4 地址,AAAA 映射到 IPv6;MX 列出邮件服务器及其优先级;TXT 存放自由文本,通常是 SPF、DKIM、DMARC 策略;NS 指明权威域名服务器;CNAME 是指向另一个域名的别名。它们从不同角度描述同一个域名。",
        },
        {
          q: "联网时发送了什么?",
          a: "一条发往 dns.google 的 DNS-over-HTTPS 查询,内容只有域名和记录类型,加密方式与普通 HTTPS 相同,不附加任何你的信息,也不需要 API 密钥或账号。",
        },
        {
          q: "查询 A 记录时为什么会出现 CNAME 行?",
          a: "解析器会返回完整链路:如果 www.example.com 是指向 example.com 的 CNAME,A 查询会同时返回别名和最终的 A 记录。多出的行正好展示了域名的完整解析路径。",
        },
      ],
      deepDive: [
        {
          heading: "从你的查询到答案之间发生了什么",
          paragraphs: [
            "DNS 是分层体系,一次查询可能要经过多台服务器。缓存全空时,解析器先问根服务器,根服务器指到顶级域名(.com、.org)的 NS,再指到该域名自己的权威服务器——真正存答案的地方。每一级只给“下一站”的指引,解析器顺着这条链走到底,才拿到能返回的记录。",
            "缓存让这条链变短。每条记录带 TTL(生存时间,单位秒),告诉解析器答案可以复用多久。低 TTL(如 300)意味着变更几分钟内生效,但权威服务器会被问得更勤;高 TTL(如 86400)让答案缓存一整天,便宜又稳定,但更新慢。迁移前先调低 TTL,本质是在安排“全世界多快忘掉旧答案”。",
            "一个本工具能让你看清的细节:浏览器或操作系统自己也有缓存,公共解析器返回的可能是没过期检查的缓存值。这里查到旧记录,多半是 TTL 还在倒数,不是查询出错。",
          ],
        },
        {
          heading: "按问题选对记录类型",
          paragraphs: [
            "大多数排查从选错记录类型开始。邮件问题几乎从来不是 A 记录的问题:先查 MX,再查 SPF、DKIM、DMARC 对应的 TXT。SPF 是域名本身的一条 TXT 字符串;DKIM 在选择器子域上,例如 s1._domainkey.example.com;DMARC 在 _dmarc.example.com。DoH 返回的原始答案会把分段合并好,你可以在这里读完整条策略串,找出那些让邮件悄悄发不出去的语法错误。",
            "A、AAAA、NS、CNAME 各答各的问题:网站能不能解析、支不支持 IPv6?DNS 由谁运营?这个名字是不是别名?查 A 返回 CNAME 行是正常现象——解析器会带上完整链路——但同一个名字上 CNAME 不能与其他记录共存,所以裸域名通常在服务商那里用 ALIAS 或“拍平”记录代替。",
          ],
        },
        {
          heading: "为什么用 DoH,以及本工具不做什么",
          paragraphs: [
            "传统 DNS 查询是 53 端口上的明文 UDP,链路上谁都看得见——路由器、运营商、中间盒。DNS-over-HTTPS 把同样的查询装进一条普通 TLS 连接,本地网络看不到内容,在封禁或劫持 53 端口的网络里也能用。dig 失效的环境下这个工具仍然可用,原因就在这里。",
            "它是查询工具,不是监控服务:展示的是某一时刻、某个解析器给出的答案(含缓存值),不会直接问权威服务器,也不对比多家解析器的结果是否一致。对变更的实用流程是:提前调低 TTL,做修改,然后在这里反复查,直到出现新值。",
          ],
        },
      ],
    },
    ja: {
      name: "DNS レコード検索",
      tagline:
        "A・AAAA・MX・TXT・NS・CNAME を DNS over HTTPS で検索し、表で整理表示。ターミナルや dig コマンドは不要です。",
      intro: [
        "DNS レコードはドメインの接続先、メールの宛先、所有権の証明方法を決めます。このツールは DNS over HTTPS(DoH)——モダンブラウザと同じ暗号化チャネル——で任意のレコード種別を解決し、読みやすい表に整理します。",
        "Google の無料パブリックリゾルバを使うので、インストールも API キーも不要です。変更後の反映確認、SPF/DKIM/DMARC の TXT 確認、メールが届かない原因の調査に便利です。",
      ],
      steps: [
        "ドメインを入力し(example.com のように http:// は不要)、レコード種別を選びます。",
        "「検索」を押すと、暗号化された DoH でパブリックリゾルバに問い合わせます。",
        "表を確認します。各行にレコード種別・TTL・値が表示され、A/AAAA なら IP、MX なら優先度付きのサーバーです。",
        "種別を切り替えて全体像を掴みます。メールは MX、SPF/DKIM は TXT、DNS の運営者は NS で確認できます。",
      ],
      faqs: [
        {
          q: "主なレコード種別の意味は?",
          a: "A は IPv4 アドレス、AAAA は IPv6 への対応付けです。MX はメールサーバーと優先度、TXT は自由記述(主に SPF・DKIM・DMARC ポリシー)、NS は権威ネームサーバー、CNAME は別名へのエイリアスです。同じドメインへの別の問いに答えます。",
        },
        {
          q: "ネットワークには何が送られますか?",
          a: "ドメイン名とレコード種別だけを含む 1 件の DNS over HTTPS 照会が dns.google に送られます。通常の HTTPS と同じく暗号化され、あなたの情報は付加されず、API キーもアカウントも不要です。",
        },
        {
          q: "A を検索したのに CNAME の行が出るのは?",
          a: "リゾルバは経路全体を返すためです。www.example.com が example.com への CNAME なら、A 検索にはエイリアスと最終的な A レコードの両方が含まれます。追加の行がまさに名前の解決経路を示しています。",
        },
      ],
      deepDive: [
        {
          heading: "問い合わせから回答までの間で起きていること",
          paragraphs: [
            "DNS は階層構造で、1 回の照会が複数のサーバーを渡り歩くことがあります。キャッシュが空の場合、リゾルバはまずルートサーバーに問い、トップレベルドメイン(.com や .org)のネームサーバーを教わり、さらにそのドメイン自身の権威ネームサーバー——答えを実際に持っている場所——へとたどります。各段階は「次の行き先」だけを返し、リゾルバはその連鎖を下って初めてレコードを手にします。",
            "キャッシュがこの旅を短くします。各レコードは TTL(秒単位の生存時間)を持ち、答えをどれだけ再利用してよいかを示します。300 のような低い TTL なら変更は数分で反映されますが、権威サーバーへの照会は増えます。86400 のような高い TTL なら答えは 1 日キャッシュされ、安定的で安価ですが更新は遅くなります。移行前に TTL を下げるのは、「世界がいつ古い答えを忘れるか」を調整する作業です。",
            "このツールで見えるくなる細かい点:ブラウザや OS 自身もキャッシュを持ち、パブリックリゾルバはゾーンの変化を確認せずキャッシュを返すことがあります。ここで古いレコードに見える場合は、多くは TTL がまだ数えている途中であり、照会の誤りではありません。",
          ],
        },
        {
          heading: "目的に合ったレコード種別の選び方",
          paragraphs: [
            "トラブル調査の多くは、種別の選び間違いから始まります。メールの問題はほとんど A レコードの問題ではありません。まず MX を見て、次に SPF・DKIM・DMARC の TXT を確認します。SPF はドメイン本体の 1 本の TXT 文字列、DKIM は s1._domainkey.example.com のようなセレクターサブドメイン、DMARC は _dmarc.example.com に置かれます。DoH はセグメントを連結した生の回答を返すので、ここでポリシー文字列全体を読み、メール配信を静かに壊す構文ミスを見つけられます。",
            "A・AAAA・NS・CNAME はそれぞれ別の問いに答えます。サイトが解決するか、IPv6 に対応するか。DNS を誰が運営しているか。この名前はエイリアスか。A の照会に CNAME が混ざるのは正常で、リゾルバが経路全体を添えるためです。ただし同じ名前では CNAME と他のレコードを併用できないため、 apex ドメインではプロバイダ側で ALIAS やフラット化されたレコードが使われます。",
          ],
        },
        {
          heading: "なぜ DoH なのか、そしてこのツールにできないこと",
          paragraphs: [
            "従来の DNS 照会はポート 53 の平文 UDP で経路上の誰にでも見えます——ルーターや ISP、中間装置まで。DNS over HTTPS は同じ照会を通常の TLS 接続に包むため、ローカルネットワークからは見えず、ポート 53 を塞いだり書き換えたりするネットワークでも通ります。dig が使えない環境でこのツールが動くのはこのためです。",
            "これは照会ツールであって監視サービスではありません。ある時点・あるリゾルバの答え(キャッシュ値を含む)を示すだけで、権威サーバーへ直接問い合わせたり、複数リゾルバ間の答えの一致を比較したりはしません。自分で管理する変更の実務的な流れは、事前に TTL を下げ、変更を加え、ここで再確認して新しい値が現れるまで見届ける、というものです。",
          ],
        },
      ],
    },
    es: {
      name: "Consulta DNS",
      tagline:
        "Consulta registros A, AAAA, MX, TXT, NS y CNAME de cualquier dominio vía DNS-over-HTTPS en una tabla clara: sin terminal ni comandos dig.",
      intro: [
        "Los registros DNS dicen a dónde apunta un dominio, cómo envía correo y cómo demuestra su propiedad. Esta herramienta resuelve cualquier tipo de registro por DNS-over-HTTPS (DoH) —el mismo canal cifrado que usan los navegadores— y presenta las respuestas en una tabla legible.",
        "Funciona sobre el resolvedor público gratuito de Google: nada que instalar y sin claves de API. Útil para comprobar la propagación tras un cambio, verificar los TXT de SPF/DKIM/DMARC o depurar por qué rebota el correo de un dominio.",
      ],
      steps: [
        "Escribe el dominio (example.com, sin http://) y elige el tipo de registro.",
        "Pulsa Consultar; la petición viaja cifrada por DoH al resolvedor público.",
        "Lee la tabla: cada fila muestra tipo, TTL y valor — una IP para A/AAAA o un servidor con prioridad para MX.",
        "Cambia de tipo para ver el cuadro completo: MX para correo, TXT para SPF/DKIM, NS para quién gestiona el DNS.",
      ],
      faqs: [
        {
          q: "¿Para qué sirve cada tipo de registro?",
          a: "A asocia un nombre a una IPv4 y AAAA a una IPv6. MX lista los servidores de correo y su prioridad. TXT contiene texto libre, normalmente políticas SPF, DKIM y DMARC. NS indica los servidores autoritativos. CNAME es un alias que apunta un nombre a otro. Cada uno responde a una pregunta distinta sobre el mismo dominio.",
        },
        {
          q: "¿Qué se envía por la red?",
          a: "El dominio y el tipo de registro en una consulta DNS-over-HTTPS a dns.google, cifrada como cualquier HTTPS. No se añade nada sobre ti y no hacen falta claves de API ni cuentas.",
        },
        {
          q: "¿Por qué aparecen filas CNAME si pedí A?",
          a: "Los resolvedores incluyen la cadena completa: si www.example.com es un CNAME a example.com, una consulta A devuelve el alias más el registro A final. Esas filas extra muestran exactamente cómo se resuelve el nombre.",
        },
      ],
      deepDive: [
        {
          heading: "Qué ocurre entre tu consulta y la respuesta",
          paragraphs: [
            "El DNS es una jerarquía y una sola consulta puede recorrer varios servidores. Sin caché, el resolvedor pregunta primero a un servidor raíz, que lo dirige a los servidores del dominio de primer nivel (.com, .org), y estos a los servidores autoritativos del propio dominio — donde está la respuesta de verdad. Cada nivel solo entrega la “siguiente parada”, y el resolvedor baja la cadena hasta obtener un registro que pueda devolver.",
            "La caché acorta ese recorrido. Cada registro lleva un TTL (tiempo de vida, en segundos) que indica cuánto puede reutilizarse la respuesta. Un TTL bajo, como 300, hace que los cambios se propaguen en minutos, pero consulta más a menudo a los autoritativos; un TTL alto, como 86400, mantiene la respuesta en caché un día entero: barato y estable, pero lento de actualizar. Bajar el TTL antes de una migración es, en el fondo, programar qué tan rápido el mundo olvidará la respuesta antigua.",
            "Un detalle que esta herramienta hace visible: el navegador o el sistema operativo tiene su propia caché, y algunos resolvedores devuelven valores en caché sin comprobar si la zona cambió. Si un registro se ve desactualizado aquí, casi siempre es porque el TTL sigue contando — no un error de la consulta.",
          ],
        },
        {
          heading: "Elegir el tipo de registro adecuado para cada problema",
          paragraphs: [
            "Casi todo diagnóstico empieza con el tipo de registro equivocado. Los problemas de correo casi nunca son de registros A: revisa primero MX y después los TXT de SPF, DKIM y DMARC. SPF vive como una única cadena TXT en el propio dominio; DKIM en un subdominio selector como s1._domainkey.example.com; DMARC en _dmarc.example.com. Como DoH devuelve la respuesta cruda con los segmentos ya unidos, aquí puedes leer la política completa y detectar los errores de sintaxis que rompen el correo en silencio.",
            "A, AAAA, NS y CNAME responden a preguntas distintas: ¿el sitio resuelve?, ¿funciona sobre IPv6?, ¿quién opera el DNS?, ¿este nombre es un alias? Que aparezca un CNAME al consultar A es normal — los resolvedores incluyen toda la cadena — pero un CNAME no puede coexistir con otros registros en el mismo nombre, por eso los dominios raíz suelen usar ALIAS o registros aplanados en el proveedor.",
          ],
        },
        {
          heading: "Por qué DNS-over-HTTPS y qué no hace esta herramienta",
          paragraphs: [
            "Las consultas DNS tradicionales viajan en UDP plano por el puerto 53, visibles para cualquiera en la ruta: el router del café, el proveedor, los intermediarios. DNS-over-HTTPS envuelve la misma consulta en una conexión TLS normal, así que la consulta queda oculta para la red local y atraviesa redes que bloquean o manipulan el puerto 53. Por eso esta herramienta funciona donde dig falla.",
            "Es una herramienta de consulta, no de monitorización: muestra la respuesta de un momento y de un resolvedor, incluidos valores en caché, y no consulta directamente a los autoritativos ni compara respuestas entre resolvedores. Para cambios que controlas, el flujo práctico es: baja el TTL de antemano, haz el cambio y vuelve a comprobar aquí hasta que aparezca el valor nuevo.",
          ],
        },
      ],
    },
    pt: {
      name: "Consulta de DNS",
      tagline:
        "Consulte registros A, AAAA, MX, TXT, NS e CNAME de qualquer domínio via DNS-over-HTTPS numa tabela limpa — sem terminal nem comando dig.",
      intro: [
        "Os registros DNS dizem para onde um domínio aponta, como envia e-mail e como prova sua propriedade. Esta ferramenta resolve qualquer tipo de registro por DNS-over-HTTPS (DoH) — o mesmo canal criptografado dos navegadores — e organiza as respostas numa tabela legível.",
        "Roda sobre o resolvedor público gratuito do Google: nada para instalar e sem chave de API. Útil para conferir a propagação depois de uma mudança, validar TXT de SPF/DKIM/DMARC ou descobrir por que os e-mails de um domínio devolvem erro.",
      ],
      steps: [
        "Digite o domínio (exemplo.com, sem http://) e escolha o tipo de registro.",
        "Clique em Consultar; a requisição vai criptografada por DoH ao resolvedor público.",
        "Leia a tabela: cada linha mostra tipo, TTL e valor — um IP para A/AAAA ou um servidor com prioridade para MX.",
        "Troque o tipo para ver o quadro completo: MX para e-mail, TXT para SPF/DKIM, NS para quem opera o DNS.",
      ],
      faqs: [
        {
          q: "Para que serve cada tipo de registro?",
          a: "A mapeia um nome para um endereço IPv4 e AAAA para IPv6. MX lista os servidores de e-mail e suas prioridades. TXT guarda texto livre — normalmente políticas SPF, DKIM e DMARC. NS indica os servidores autoritativos. CNAME é um apelido que aponta um nome para outro. Cada um responde a uma pergunta diferente sobre o mesmo domínio.",
        },
        {
          q: "O que é enviado pela rede?",
          a: "O domínio e o tipo de registro em uma consulta DNS-over-HTTPS ao dns.google, criptografada como qualquer HTTPS. Nada sobre você é adicionado, e não é preciso chave de API nem conta.",
        },
        {
          q: "Por que aparecem linhas CNAME quando peço A?",
          a: "Os resolvedores incluem a cadeia completa: se www.exemplo.com é um CNAME para exemplo.com, uma consulta A retorna o apelido e o registro A final. As linhas extras mostram exatamente como o nome é resolvido.",
        },
      ],
      deepDive: [
        {
          heading: "O que acontece entre a sua consulta e a resposta",
          paragraphs: [
            "O DNS é uma hierarquia e uma única consulta pode passar por vários servidores. Sem cache, o resolvedor pergunta primeiro a um servidor raiz, que aponta para os servidores do domínio de primeiro nível (.com, .org), e estes para os servidores autoritativos do próprio domínio — onde está a resposta de verdade. Cada nível entrega apenas a “próxima parada”, e o resolvedor desce a cadeia até obter um registro que possa devolver.",
            "O cache encurta esse caminho. Cada registro carrega um TTL (tempo de vida, em segundos) dizendo por quanto tempo a resposta pode ser reutilizada. Um TTL baixo, como 300, faz mudanças se propagarem em minutos, mas consulta os autoritativos com mais frequência; um TTL alto, como 86400, mantém a resposta em cache por um dia: barato e estável, mas lento para atualizar. Reduzir o TTL antes de uma migração é, no fundo, agendar a rapidez com que o mundo esquecerá a resposta antiga.",
            "Um detalhe que esta ferramenta torna visível: o navegador ou o sistema operacional tem cache próprio, e alguns resolvedores devolvem valores em cache sem verificar se a zona mudou. Se um registro parece desatualizado aqui, quase sempre é porque o TTL ainda está contando — não um erro da consulta.",
          ],
        },
        {
          heading: "Escolher o tipo de registro certo para cada problema",
          paragraphs: [
            "Quase todo diagnóstico começa com o tipo de registro errado. Problemas de e-mail raramente são de registros A: confira primeiro MX e depois os TXT de SPF, DKIM e DMARC. O SPF vive como uma única string TXT no próprio domínio; o DKIM num subdomínio seletor como s1._domainkey.example.com; o DMARC em _dmarc.example.com. Como o DoH devolve a resposta crua com os segmentos já unidos, aqui você lê a política inteira e encontra os erros de sintaxe que quebram a entrega de e-mail em silêncio.",
            "A, AAAA, NS e CNAME respondem a perguntas diferentes: o site resolve? funciona em IPv6? quem opera o DNS? este nome é um apelido? Um CNAME aparecer numa consulta A é normal — os resolvedores incluem a cadeia inteira — mas um CNAME não pode coexistir com outros registros no mesmo nome; por isso domínios raiz costumam usar ALIAS ou registros achatados no provedor.",
          ],
        },
        {
          heading: "Por que DNS-over-HTTPS e o que esta ferramenta não faz",
          paragraphs: [
            "Consultas DNS tradicionais viajam em UDP plano pela porta 53, visíveis para qualquer um na rota: o roteador do café, o provedor, intermediários. O DNS-over-HTTPS embrulha a mesma consulta numa conexão TLS comum, então a consulta fica oculta da rede local e atravessa redes que bloqueiam ou manipulam a porta 53. É por isso que esta ferramenta funciona onde o dig falha.",
            "Ela é uma ferramenta de consulta, não de monitoramento: mostra a resposta de um momento e de um resolvedor, incluindo valores em cache, e não consulta os autoritativos diretamente nem compara respostas entre resolvedores. Para mudanças sob seu controle, o fluxo prático é: baixe o TTL antes, faça a mudança e confira aqui de novo até o valor novo aparecer.",
          ],
        },
      ],
    },
  },
});
