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
        "Status codes come verbatim from the registry: clientTransferProhibited means transfers are locked, redemptionPeriod is the 30-day grace window after deletion before the domain drops, and serverHold means it has been removed from the zone. Expiry dates are exactly what the registry publishes — renewal reminders come from your registrar, not this record.",
        "Queries run through rdap.org, which routes each request to the authoritative RDAP server for the TLD over HTTPS, returning structured JSON instead of the free-text soup of legacy WHOIS. The result is normalized into comparable fields no matter which registry answered.",
        "Classic WHOIS differs in format per registry and crosses the network unencrypted; many web WHOIS sites are captcha walls with ads. RDAP is the IANA-standardized, machine-readable replacement — coverage is broad but not universal: most country-code registries (.cn, .de, .br…) still lack public RDAP servers, and the tool says so plainly instead of showing empty fields.",
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
      deepDive: [
        {
          heading: "Privacy protection and what RDAP actually shows",
          paragraphs: [
            "The registrant contact details that classic WHOIS once printed in full — name, street, email — have been redacted on most generic TLDs for years, driven by GDPR enforcement and registrar privacy services. What you see today is typically the registrar's abstraction layer, sometimes a privacy-service address, sometimes simply “REDACTED FOR PRIVACY”. Expecting a personal name from a modern .com lookup is a mistake left over from the 2000s.",
            "What remains genuinely useful is everything the registry itself records: creation and expiry dates, registrar of record, EPP status codes and nameservers. Redaction changed the person fields; the operational fields stayed. That is still enough for the common jobs — checking a domain's age before trusting it, seeing when a squatted domain expires, confirming a transfer lock.",
            "Country-code registries set their own disclosure rules, so coverage and verbosity vary widely by TLD: some publish more contact detail than any .com, others less. RDAP also normalizes JSON, which is why this tool can present .com, .app and .dev results in the same fields even though their registries are unrelated.",
          ],
        },
        {
          heading: "Reading dates and status codes like an analyst",
          paragraphs: [
            "Dates tell stories. A domain created three weeks ago advertising “established since 1995” is a red flag; a domain expiring next week held by a real business is likely an oversight, and email before it drops. Registration habits matter too — a domain auto-renewed in multi-year blocks signals a maintained asset, while lapsed-and-reregistered histories hint at expired domains picked up by resellers.",
            "Status codes deserve a small vocabulary. clientTransferProhibited and clientHold are registrar-set locks; serverHold means the registry pulled the domain from the zone (often a compliance action); redemptionPeriod and pendingDelete are the 30-day and 5-day grace stages after deletion, after which the domain can be re-registered by anyone. A lookup showing pendingDelete is effectively a countdown.",
            "One habit worth forming: cross-check nameservers here against the DNS tool. A domain whose WHOIS says registrar X but whose NS points at an unrelated hosting provider is common and benign — but when the registration is fresh and the NS is a bulletproof host, the combination is the classic pattern of a throwaway domain.",
          ],
        },
        {
          heading: "Why RDAP replaced port-43 WHOIS",
          paragraphs: [
            "Classic WHOIS is a 1980s protocol: unstructured free text over plaintext TCP port 43, with a format that differs per registry, no authentication and no rate-limiting contract. RDAP — defined as the replacement by the IETF — answers all three: JSON responses over HTTPS, a uniform data model across registries, and support for access control, rate limits and internationalized domain names. ICANN requires it of all generic-TLD registries.",
            "For a browser tool the difference is structural: RDAP responses are JSON fetched like any API call, so results can be normalized instead of regex-parsed from text soup. This tool asks rdap.org, which routes each query to the authoritative RDAP server of the domain's TLD and follows the redirect for you.",
            "The honest coverage note: running a public RDAP server is each registry's decision, so generic TLDs are almost universally covered while many country codes are not. For those TLDs, a legacy WHOIS lookup is still possible elsewhere — but expect free-text output and an unencrypted query, the exact problems RDAP was built to retire.",
          ],
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
      deepDive: [
        {
          heading: "隐私保护与 RDAP 实际展示什么",
          paragraphs: [
            "传统 WHOIS 曾经整段打印的注册人联系方式——姓名、街道、邮箱——多年来在多数通用顶级域名上已被遮蔽,推动力是 GDPR 的执行与注册商的隐私保护服务。如今你看到的多半是注册商的抽象层:有时是隐私保护服务的地址,有时直接写着“REDACTED FOR PRIVACY”。指望从一次现代 .com 查询里看到个人姓名,是上个时代留下的错误期待。",
            "真正持续有用的,是注册局自己记录的那部分:注册与到期日期、注册商、EPP 状态码、域名服务器。遮蔽改变的是“人”的字段,“运营”字段原样保留。对常见任务依然够用——信任一个域名前查它的年龄、看抢注域名何时到期、确认是否锁了转移。",
            "国家级注册局自行制定披露规则,所以不同顶级域名的覆盖与详细程度差异很大:有的比任何 .com 都公开得多,有的更少。RDAP 还统一了 JSON 格式,所以本工具能把 .com、.app、.dev 的结果放进同一套字段——尽管它们的注册局毫无关联。",
          ],
        },
        {
          heading: "像分析师一样读日期与状态码",
          paragraphs: [
            "日期会讲故事。三周前注册却宣传“始于 1995 年”的域名是红旗;下周到期、持有人是正经企业的域名多半是疏忽,赶在掉落前发封邮件。续费习惯也有信息量——多年连着自动续费的域名是“有人维护的资产”,而反复到期又被重新注册的历史,暗示这是被二手域名商捡走的过期域名。",
            "状态码值得记住一小套词汇。clientTransferProhibited 与 clientHold 是注册商侧的锁;serverHold 表示注册局把域名从区域文件里摘除(常与合规有关);redemptionPeriod 与 pendingDelete 是删除后的 30 天和 5 天宽限期,之后任何人都能重新注册。查到 pendingDelete,本质上就是在看倒计时。",
            "值得养成的习惯:把这里的域名服务器与 DNS 工具交叉核对。WHOIS 显示注册商是 X、NS 却指向毫不相干的主机商,这很常见也大多无害——但如果注册时间很新、NS 又在“防弹主机”名下,这个组合就是一次性域名的经典画像。",
          ],
        },
        {
          heading: "RDAP 为什么取代 43 端口 WHOIS",
          paragraphs: [
            "传统 WHOIS 是上世纪八十年代的协议:明文 TCP 43 端口上的非结构化自由文本,各注册局格式不一,没有身份验证,也没有限流约定。RDAP 由 IETF 定义为替代者,三个问题一起解决:HTTPS 上的 JSON 响应、跨注册局统一的数据模型,以及对访问控制、限流和国际化域名的支持。ICANN 要求所有通用顶级域名注册局提供。",
            "对浏览器工具来说,这个差别是结构性的:RDAP 响应是像普通 API 一样取回的 JSON,结果可以直接归一化,而不是从文本泥浆里正则抠字段。本工具请求 rdap.org,由它把每次查询路由到该域名顶级域名的权威 RDAP 服务器,并替你跟随重定向。",
            "诚实的覆盖说明:是否运营公开 RDAP 服务由各注册局自行决定,所以通用顶级域名几乎全部覆盖,而不少国家级域名没有。这些域名仍可在别处用旧式 WHOIS 查——但等待你的是自由文本输出和一次未加密查询,恰是 RDAP 要淘汰的那两件事。",
          ],
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
      deepDive: [
        {
          heading: "プライバシー保護と、RDAP が実際に示すもの",
          paragraphs: [
            "昔の WHOIS が丸ごと印字していた登録者の連絡先——氏名、住所、メール——は、GDPR の執行とレジストラのプライバシー保護サービスを背景に、多くの gTLD で何年も前から伏せられています。いま見えるのは大抵、レジストラ側の抽象化層です。プライバシー保護サービスの住所のこともあれば、単に「REDACTED FOR PRIVACY」ということも。現代の .com 検索から個人名を期待するのは、2000 年代の感覚の残滓です。",
            "それでも実用上有力なのは、レジストリ自身が記録する部分です。登録日と有効期限、正式なレジストラ、EPP ステータスコード、ネームサーバー。伏せ字が変わったのは「人」のフィールドで、「運営」のフィールドはそのまま。よくある用途——信頼する前にドメインの年齢を確かめる、squatter ドメインの期限を見る、移転ロックを確認する——にはまだ十分です。",
            "ccTLD の開示規則は各レジストリの裁量なので、対応状況と情報量は TLD ごとに大きく違います。どの .com より多くを出すレジストリもあれば、少ないところもあります。RDAP は JSON も標準化しているため、無関係なレジストリである .com・.app・.dev の結果を同じフィールドで提示できるのです。",
          ],
        },
        {
          heading: "日付とステータスコードをアナリストのように読む",
          paragraphs: [
            "日付は物語を語ります。3 週間前に登録したのに「1995 年創業」と謳うドメインは危険信号。来週失効するのに実在の企業が持っているドメインは大概うっかりで、落ちる前にメールすべきものです。更新の習慣も情報です。複数年ごとに自動更新されているドメインは「メンテされている資産」であり、失効と再登録を繰り返す履歴は、業者が拾った落ちドメインのにおいがします。",
            "ステータスコードには小さな語彙があります。clientTransferProhibited と clientHold はレジストラ側のロック。serverHold はレジストリがゾーンから外した状態(多くはコンプライアンス対応)。redemptionPeriod と pendingDelete は削除後の 30 日と 5 日の猶予で、その後は誰でも再登録できます。pendingDelete の検索結果は、実質カウントダウンです。",
            "身につけたい習慣が一つ。ここで見たネームサーバーを DNS ツールと突き合わせること。WHOIS のレジストラが X なのに NS が無関係なホスティングに向いているのはよくある無害な構成です。ただし登録が新しいうえ NS が bulletproof ホストなら、その組合せは使い捨てドメインの古典的プロファイルです。",
          ],
        },
        {
          heading: "RDAP がポート 43 の WHOIS を置き換えた理由",
          paragraphs: [
            "従来の WHOIS は 1980 年代のプロトコルです。平文の TCP 43 番ポート上の非構造化テキストで、形式はレジストリごとに違い、認証もレート制限の取り決めもありません。RDAP は IETF が後継として定義したもので、この三つを同時に解決します。HTTPS 上の JSON 応答、レジストリ横断で統一されたデータモデル、アクセス制御・レート制限・国際化ドメインへの対応。ICANN はすべての gTLD レジストリに提供を求めています。",
            "ブラウザツールにとってこの差は構造的です。RDAP の応答は普通の API のように取れる JSON なので、テキストの泥から正規表現で掘り出すのではなく、結果をそのまま正規化できます。このツールは rdap.org に問い合わせ、対象 TLD の権威 RDAP サーバーへの振り分けとリダイレクトは任せます。",
            "正直な対応範囲の説明もあります。公開 RDAP サーバーを運営するかは各レジストリの決定で、gTLD はほぼ全面的に対応済みですが、多くの ccTLD はまだです。そうした TLD は別の場所で旧式 WHOIS を引く余地が残ります——ただし待っているのは自由テキストと暗号化されていない問い合わせ、RDAP が引退させるために作られたまさにその二点です。",
          ],
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
      deepDive: [
        {
          heading: "Protección de privacidad y qué muestra realmente el RDAP",
          paragraphs: [
            "Los datos de contacto del registrante que el WHOIS clásico imprimía enteros — nombre, calle, correo — llevan años censurados en la mayoría de los TLD genéricos, empujados por la aplicación del GDPR y los servicios de privacidad de los registradores. Hoy ves normalmente la capa de abstracción del registrador: a veces la dirección de un servicio de privacidad, a veces simplemente “REDACTED FOR PRIVACY”. Esperar un nombre personal de una consulta moderna de .com es una expectativa heredada de los 2000.",
            "Lo que sigue siendo genuinamente útil es todo lo que el propio registro graba: fechas de creación y caducidad, registrador oficial, códigos de estado EPP y servidores DNS. La censura cambió los campos de persona; los campos operativos quedaron intactos. Eso basta para los trabajos habituales — comprobar la edad de un dominio antes de fiarte, ver cuándo caduca un dominio aparcado, confirmar el bloqueo de transferencia.",
            "Los registros de código de país fijan sus propias reglas de divulgación, así que la cobertura y el detalle varían mucho por TLD: algunos publican más contacto que cualquier .com, otros menos. RDAP también normaliza el JSON, por eso esta herramienta puede presentar resultados de .com, .app y .dev en los mismos campos aunque sus registros no tengan nada que ver.",
          ],
        },
        {
          heading: "Leer fechas y códigos de estado como un analista",
          paragraphs: [
            "Las fechas cuentan historias. Un dominio creado hace tres semanas que anuncia “desde 1995” es una señal de alarma; uno que caduca la semana próxima y pertenece a una empresa real suele ser un descuido — escríbeles antes de que caiga. Los hábitos de renovación también informan: renovación automática en bloques plurianuales indica un activo mantenido, mientras que una historia de caducidades y re-registros delata dominios recogidos por revendedores.",
            "Los códigos de estado merecen un pequeño vocabulario. clientTransferProhibited y clientHold son candados del registrador; serverHold significa que el registro sacó el dominio de la zona (a menudo por cumplimiento); redemptionPeriod y pendingDelete son las etapas de gracia de 30 y 5 días tras la eliminación, después de las cuales cualquiera puede re-registrar el dominio. Una consulta que muestra pendingDelete es efectivamente una cuenta atrás.",
            "Un hábito que merece formarse: contrastar aquí los servidores DNS con la herramienta de DNS. Un dominio cuyo WHOIS dice registrador X pero cuyos NS apuntan a un hosting sin relación es común y benigno — pero si el registro es reciente y el NS es de un host a prueba de balas, esa combinación es el patrón clásico de un dominio de usar y tirar.",
          ],
        },
        {
          heading: "Por qué RDAP sustituyó al WHOIS del puerto 43",
          paragraphs: [
            "El WHOIS clásico es un protocolo de los años 80: texto libre sin estructura sobre el puerto TCP 43 en claro, con un formato distinto por registro, sin autenticación y sin contrato de límites. RDAP — definido como reemplazo por el IETF — resuelve las tres cosas: respuestas JSON sobre HTTPS, un modelo de datos uniforme entre registros y soporte de control de acceso, límites y dominios internacionalizados. ICANN lo exige a todos los registros de TLD genéricos.",
            "Para una herramienta de navegador la diferencia es estructural: las respuestas RDAP son JSON que se obtienen como cualquier llamada a una API, así que los resultados se normalizan en vez de extraerse con expresiones regulares de una sopa de texto. Esta herramienta pregunta a rdap.org, que dirige cada consulta al servidor RDAP autoritativo del TLD y sigue la redirección por ti.",
            "La nota honesta de cobertura: mantener un servidor RDAP público es decisión de cada registro, así que los TLD genéricos están casi todos cubiertos y muchos códigos de país no. Para esos TLD sigue siendo posible un WHOIS legacy en otros sitios — pero espera texto libre y una consulta sin cifrar, exactamente los dos problemas que RDAP se construyó para jubilar.",
          ],
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
      deepDive: [
        {
          heading: "Proteção de privacidade e o que o RDAP realmente mostra",
          paragraphs: [
            "Os dados de contato do registrante que o WHOIS clássico imprimia inteiros — nome, rua, e-mail — estão censurados há anos na maioria dos TLDs genéricos, empurrados pela aplicação do GDPR e pelos serviços de privacidade dos registradores. Hoje você vê normalmente a camada de abstração do registrador: às vezes o endereço de um serviço de privacidade, às vezes simplesmente “REDACTED FOR PRIVACY”. Esperar um nome pessoal de uma consulta moderna de .com é expectativa herdada dos anos 2000.",
            "O que continua genuinamente útil é tudo que o próprio registro grava: datas de criação e expiração, registrador oficial, códigos de status EPP e servidores DNS. A censura mudou os campos de pessoa; os campos operacionais ficaram intatos. Isso basta para os trabalhos comuns — conferir a idade de um domínio antes de confiar, ver quando um domínio estacionado expira, confirmar o bloqueio de transferência.",
            "Os registros de código de país definem suas próprias regras de divulgação, então cobertura e detalhe variam muito por TLD: alguns publicam mais contato que qualquer .com, outros menos. O RDAP também normaliza o JSON, e é por isso que esta ferramenta consegue apresentar resultados de .com, .app e .dev nos mesmos campos, embora seus registros não tenham relação alguma.",
          ],
        },
        {
          heading: "Ler datas e códigos de status como um analista",
          paragraphs: [
            "As datas contam histórias. Um domínio criado há três semanas anunciando “desde 1995” é bandeira vermelha; um que expira na semana que vem e pertence a uma empresa real costuma ser descuido — mande um e-mail antes de cair. Os hábitos de renovação também informam: renovação automática em blocos plurianuais indica um ativo mantido, enquanto histórico de expirações e re-registros denuncia domínios colhidos por revendedores.",
            "Os códigos de status merecem um vocabulário pequeno. clientTransferProhibited e clientHold são travas do registrador; serverHold significa que o registro tirou o domínio da zona (muitas vezes por conformidade); redemptionPeriod e pendingDelete são as etapas de carência de 30 e 5 dias depois da exclusão, após as quais qualquer pessoa pode re-registrar o domínio. Uma consulta mostrando pendingDelete é, na prática, uma contagem regressiva.",
            "Um hábito que vale formar: confrontar aqui os servidores DNS com a ferramenta de DNS. Um domínio cujo WHOIS diz registrador X mas cujos NS apontam para uma hospedagem sem relação é comum e benigno — mas se o registro é recente e o NS é de um host à prova de balas, essa combinação é o retrato clássico de um domínio descartável.",
          ],
        },
        {
          heading: "Por que o RDAP substituiu o WHOIS da porta 43",
          paragraphs: [
            "O WHOIS clássico é um protocolo dos anos 1980: texto livre sem estrutura sobre a porta TCP 43 em claro, com formato diferente em cada registro, sem autenticação e sem contrato de limites. O RDAP — definido como substituto pelo IETF — resolve as três coisas: respostas JSON por HTTPS, um modelo de dados uniforme entre registros e suporte a controle de acesso, limites e domínios internacionalizados. A ICANN exige de todos os registros de TLD genéricos.",
            "Para uma ferramenta de navegador a diferença é estrutural: respostas RDAP são JSON obtidos como qualquer chamada de API, então os resultados são normalizados em vez de arrancados com regex de uma sopa de texto. Esta ferramenta pergunta ao rdap.org, que encaminha cada consulta ao servidor RDAP autoritativo do TLD e segue o redirecionamento por você.",
            "A nota honesta de cobertura: manter um servidor RDAP público é decisão de cada registro, então os TLDs genéricos estão quase todos cobertos e muitos códigos de país não. Para esses TLDs ainda é possível um WHOIS legado em outros lugares — mas espere texto livre e uma consulta não criptografada, exatamente os dois problemas que o RDAP foi construído para aposentar.",
          ],
        },
      ],
    },
  },
});
