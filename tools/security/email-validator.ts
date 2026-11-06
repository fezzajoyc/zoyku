import { SecEmailValidatorEngine } from "../_engines/sec-engine-email";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "email-validator",
  category: "security",
  icon: "check",
  engine: { component: SecEmailValidatorEngine },
  related: ["dns-lookup", "ip-lookup", "whois-lookup", "password-generator", "totp-generator", "random-number", "password-strength"],
  copy: {
    en: {
      name: "Email Validator",
      tagline:
        "Check an email's format locally and verify its domain can receive mail with a live MX lookup, plus typo detection — free, instant, no signup.",
      intro: [
        "A syntactically valid address can still bounce if its domain has no mail servers. This validator first checks the format entirely in your browser — length, characters, dot placement and domain labels — then queries live DNS over HTTPS to see whether the domain actually publishes MX (mail exchange) records.",
        "The format check applies the practical limits of RFC 5321/5322 — total length up to 254 characters, 64 for the local part, domain labels of 1–63 characters — instead of the loose anything@anything regex most forms use. Address syntax in the wild is far narrower than the RFC formally allows, and that is what real mail servers accept.",
        "The MX lookup runs over DNS-over-HTTPS, the same encrypted channel browsers use for resolving. The result distinguishes three cases: domain has mail servers, domain resolves but accepts no mail, and domain does not exist at all — each a different failure in your signup funnel.",
        "Syntax regexes alone happily accept gmail.con and pass domains that can never receive mail. Full SMTP verification would require sending probe messages and is out of reach for a browser tool, so MX existence plus typo detection is the honest maximum a client-side checker can offer. Only the domain part is sent over the network; the part before the @ never leaves your browser.",
      ],
      steps: [
        "Type or paste the address into the field and press Validate.",
        "Read the Syntax row: it catches malformed local parts, doubled dots and invalid domains without any network call.",
        "Check the Mail servers row for proof that the domain can receive email — a few domains without MX still accept mail via an A record, and the tool notes that too.",
        "If a typo is suggested, correct the domain and validate again.",
      ],
      faqs: [
        {
          q: "Does this check whether the mailbox itself exists?",
          a: "No. Mail servers generally don't reveal whether a specific mailbox is real (and probing them would be intrusive). This tool verifies the format and that the domain is configured to receive mail, which is what most verification flows actually need. Full or abandoned mailboxes can still bounce.",
        },
        {
          q: "What exactly is sent over the network?",
          a: "Only the domain — the part after the @ — in a DNS query to Google's public resolver (dns.google) over HTTPS. The full address and everything before the @ stay in your browser.",
        },
        {
          q: "Why did a valid address fail the MX check?",
          a: "A few domains publish no MX records and rely on their A record (implicit routing); the tool tells you when that's the case. Others publish a null MX, explicitly saying “no mail here”. Corporate or brand-new domains may also be missing from public resolver caches for a short while — try again in a minute.",
        },
      ],
      deepDive: [
        {
          heading: "Format-valid is not the same as reachable",
          paragraphs: [
            "The RFCs formally allow far stranger addresses than the real world does: quoted local parts like \"odd name\"@example.com, IP-literal domains, comments in the middle of an address. Real mail servers reject most of this, so a validator that implements the full RFC grammar would greenlight addresses nobody can actually use. This tool checks the practical subset — the syntax that Gmail, Outlook and the major providers actually accept — which is the right bar for a signup form.",
            "Even a perfectly formed address says nothing about the mailbox behind it. It may be full, deleted, a catch-all that swallows everything, or a spam trap that poisons your sender reputation. That is why format alone is a weak signal: the meaningful question is whether the domain is configured to receive mail, and that is answerable with a public DNS query.",
          ],
        },
        {
          heading: "What the MX check can and cannot tell you",
          paragraphs: [
            "An MX record is a public promise: mail for this domain should go to these servers, in this priority order. No MX at all usually means no mail, but there are two honest exceptions — some small domains receive mail via their A record by implicit routing, and a null MX is an explicit \"we accept nothing\" statement. The tool distinguishes these instead of collapsing them into a single fail, because they mean different things for a signup funnel.",
            "What no DNS query can tell you is whether a specific mailbox exists. Mail servers deliberately do not advertise that — probing with RCPT TO commands is how address-harvesting spammers operate, and many servers accept all recipients and bounce later to avoid confirming anything. Full SMTP verification belongs to server-side bulk services; a browser tool that claims to verify mailboxes is overclaiming. Format plus MX plus typo detection is the honest ceiling for client-side checking.",
          ],
        },
        {
          heading: "Typos and the privacy of the split",
          paragraphs: [
            "A large share of failed signups are one-letter typos: gmial.com, hotmial.com, hitmail.com, or .cm instead of .com. Checking the domain against a list of the most common providers catches most of these before the user ever hits a bounce — far cheaper than cleaning the list afterward. Catching typos at entry is also kinder: the user fixes one character instead of never receiving the confirmation mail they are waiting for.",
            "The privacy design is deliberate: validation of the local part — often the part containing your name or handle — runs entirely offline, and only the domain crosses the network, as an ordinary DNS query. The domain of an address rarely identifies a person; the local part usually does. Keep that split in mind when you paste addresses you would not want logged.",
          ],
        },
      ],
    },
    zh: {
      name: "邮箱地址校验",
      tagline: "本地检查邮箱格式,并通过实时 MX 记录查询确认域名能否收信,还能识别常见拼写错误——免费、即时、无需注册。",
      intro: [
        "格式正确的邮箱也可能退信——如果它的域名根本没有配置邮件服务器。本工具先在浏览器内完成 100% 本地的格式检查(长度、字符、点号位置、域名标签),再通过 HTTPS 实时查询 DNS,确认域名是否真的发布了 MX(邮件交换)记录。",
        "同时会把域名与最常见邮箱服务商列表比对,标记 gmial.com 这类疑似拼写错误。联网时只发送域名部分;@ 之前的内容不会离开你的浏览器。",
      ],
      steps: [
        "输入或粘贴地址,点击“校验”。",
        "先看“语法格式”一行:它无需联网即可发现 local part 格式错误、连续点号和无效域名。",
        "再看“邮件服务器”一行,确认域名确实能收信——少数没有 MX 记录的域名会通过 A 记录收信,工具也会注明。",
        "如果提示拼写建议,改正域名后重新校验。",
      ],
      faqs: [
        {
          q: "能检测邮箱账号本身是否存在吗?",
          a: "不能。邮件服务器通常不会透露某个具体邮箱是否真实存在(主动探测也并不礼貌)。本工具验证的是格式正确、且域名配置为可收信——这正是大多数校验流程真正需要的。邮箱已满或被弃用仍可能退信。",
        },
        {
          q: "联网时到底发送了什么?",
          a: "只有域名(@ 之后的部分),以 DNS 查询的形式通过 HTTPS 发往 Google 公共解析器(dns.google)。完整地址和 @ 之前的部分始终留在你的浏览器里。",
        },
        {
          q: "为什么格式正确的地址 MX 检查会失败?",
          a: "少数域名不发布 MX 记录,而是依靠 A 记录(隐式路由),工具会特别说明;另一些域名发布 null MX,明确表示“不收邮件”。企业或新注册域名也可能短时间内不在公共解析器缓存里——稍等一分钟再试。",
        },
      ],
      deepDive: [
        {
          heading: "格式对,不等于邮箱活",
          paragraphs: [
            "标准允许的地址远比现实世界见到的离谱:带引号的 local part(如 \"odd name\"@example.com)、IP 字面量域名、地址中间夹注释。真实邮件服务器大多拒收这些花活,所以一个完整实现 RFC 语法的校验器,反而会放行一堆谁也用不上的地址。本工具检查的是实用子集——Gmail、Outlook 等主流服务商真正接受的语法——这才是注册表单该有的门槛。",
            "而且格式再完美的地址,也完全不能说明邮箱本身的状态:可能已满、已注销、是把所有信都吞掉的 catch-all,甚至是会污染发信信誉的垃圾邮件陷阱。所以“格式正确”是个弱信号;真正有意义的问题是“这个域名是否配置了收信”,而这可以用一条公开的 DNS 查询回答。",
          ],
        },
        {
          heading: "MX 检查能告诉你什么、不能告诉你什么",
          paragraphs: [
            "MX 记录是一条公开声明:发往这个域名的信应送到这些服务器,按优先级排序。没有 MX 通常意味着不收信,但有两个诚实的例外——一些小域名靠 A 记录做隐式路由收信;null MX 则是明确的“此处不收信”。本工具把这几种情况分开,而不是笼统判失败,因为它们对注册漏斗的含义完全不同。",
            "DNS 查询永远无法回答的是“某个具体邮箱是否存在”。邮件服务器刻意不公开这一点——用 RCPT TO 命令逐个试探正是地址收割机器人的手法,很多服务器干脆先全收再退信,避免确认任何信息。完整的 SMTP 验证属于服务端批量服务的领域;浏览器工具若声称能验证邮箱存在,就是在过度承诺。格式 + MX + 拼写纠错,就是客户端校验诚实的上限。",
          ],
        },
        {
          heading: "拼写错误与隐私拆分",
          paragraphs: [
            "注册失败里有相当大一部分只是错了一个字母:gmial.com、hotmial.com、.cm 写成 .com。把域名和常见服务商列表比对,能在用户撞上退信之前抓住绝大多数这类错误——比事后清洗名单便宜得多,对用户也更友好:改一个字符,而不是永远等不到确认邮件。",
            "隐私设计是有意为之的:@ 之前的部分——往往包含名字或昵称——的校验完全离线进行;跨网络传输的只有域名,而且只是一条普通 DNS 查询。域名很少能定位到具体的人,local part 却常常能。粘贴你不希望被记录的地址时,记住这个拆分。",
          ],
        },
      ],
    },
    ja: {
      name: "メールアドレス検証",
      tagline:
        "書式はブラウザ内でチェックし、ドメインがメールを受信できるかを MX レコードのライブ照会で確認。誤字検出付きで無料・即時・登録不要。",
      intro: [
        "書式が正しいアドレスでも、ドメインにメールサーバーがなければ届きません。このツールはまず長さ・文字・ドットの位置・ドメインラベルをすべてブラウザ内で検証し、その後 DNS over HTTPS でライブ照会して、ドメインが MX(メール交換)レコードを公開しているかを確かめます。",
        "さらに主要プロバイダのドメイン一覧と照合し、gmial.com のような誤字を検出します。ネットワークに送るのはドメイン部分だけで、@ より前の部分はブラウザから出ません。",
      ],
      steps: [
        "アドレスを入力して「検証」を押します。",
        "まず「書式」行を確認します。local part の誤りや連続ドット、無効なドメインを通信なしで検出します。",
        "「メールサーバー」行でドメインが受信可能かを確認します。MX がなくても A レコードで受け付けるドメインがあり、その場合も表示されます。",
        "誤字の候補が出たらドメインを修正して再検証します。",
      ],
      faqs: [
        {
          q: "メールボックス自体の存在も確認できますか?",
          a: "できません。メールサーバーは通常、特定のメールボックスの有無を明かしません(探るのは失礼にあたります)。本ツールは書式の正しさと、ドメインがメール受信の設定を備えていることを検証します。これがほとんどの確認フローに必要な範囲です。受信箱が満杯だったり廃止されていれば届かないこともあります。",
        },
        {
          q: "ネットワークには何が送られますか?",
          a: "ドメイン部分(@ の右側)だけです。Google の公共リゾルバ(dns.google)への DNS 照会として HTTPS で送信されます。アドレス全体や @ の左側はブラウザ内に留まります。",
        },
        {
          q: "正しいアドレスなのに MX チェックに失敗するのは?",
          a: "MX を公開せず A レコードで受け付けるドメインがあり、その場合はツールが表示します。null MX を公開して「受け付けない」と明示するドメインもあります。企業ドメインや新設ドメインは公共リゾルバのキャッシュの影響で一時的に引けないことがあり、少し待つと確認できる場合があります。",
        },
      ],
      deepDive: [
        {
          heading: "書式が正しいことと、届くことは別問題",
          paragraphs: [
            "RFC が正式に認めるアドレスは、実世界よりずっと奇妙です。引用符付きの local part(\"odd name\"@example.com のような)、IP リテラルのドメイン、アドレス途中のコメントまで。しかし実際のメールサーバーはその大半を拒否します。RFC の文法を完全に実装した検証器は、誰も使えないアドレスまで通してしまうのです。このツールが検査するのは実用サブセット——Gmail や Outlook など主要プロバイダが実際に受け付ける書式——で、サインアップフォームにふさわしい水準です。",
            "さらに、書式が完璧なアドレスでも、その裏にあるメールボックスの状態は何も語りません。満杯かもしれず、廃止されているかもしれず、何でも吸い込む catch-all かもしれず、送信者評価を汚すスパムトラップかもしれません。だから「書式が正しい」は弱いシグナルです。意味のある問いは「このドメインはメール受信の設定があるか」であり、それは公開 DNS 照会で答えられます。",
          ],
        },
        {
          heading: "MX チェックに分かることと分からないこと",
          paragraphs: [
            "MX レコードは公開された宣言です。「このドメイン宛のメールは、この優先度順でこれらのサーバーへ送れ」というもの。MX がないのは通常「メールを受け付けない」の意味ですが、例外が二つあります。小規模ドメインが A レコードによる暗黙のルーティングで受信する場合と、null MX による「何も受け付けない」という明示です。このツールはこれらをひとまとめにせず区別します。サインアップファネルにとって意味が違うからです。",
            "DNS 照会には決して分からないのが「特定のメールボックスの存在」です。メールサーバーは意図的にそれを明かしません。RCPT TO で一つずつ確かめるのはアドレス収集スパムの手法そのもので、多くのサーバーは確認を避けるため全受信して後でバウンスします。完全な SMTP 検証はサーバー側の大量配信サービスの領域であり、メールボックスの存在まで検証できるというブラウザツールの主張は誇大です。書式+MX+誤字検出が、クライアント側検証の誠実な上限です。",
          ],
        },
        {
          heading: "誤字検出と、プライバシーのための分割",
          paragraphs: [
            "サインアップ失敗のかなりの割合が一文字の打ち間違いです。gmial.com、hotmial.com、.com を .cm にするなど。ドメインを主要プロバイダの一覧と照合すれば、ユーザーがバウンスにぶつかる前に大半を捕捉できます。事後のリスト洗浄よりずっと安価で、ユーザーにも優しい設計です。一文字直すだけで、待ち続けていた確認メールが届くようになるのですから。",
            "プライバシー設計は意図的です。@ より前の部分——名前やハンドルを含みがちな部分——の検証は完全にオフラインで行われ、ネットワークを渡るのはドメインだけ、しかも普通の DNS 照会としてです。ドメインは人を特定できることがまれで、local part はしばしば特定できます。記録されたくないアドレスを貼り付ける際は、この分割を思い出してください。",
          ],
        },
      ],
    },
    es: {
      name: "Validador de correos",
      tagline:
        "Comprueba el formato localmente y verifica con una consulta MX en vivo que el dominio puede recibir correo, con detección de erratas. Gratis e instantáneo.",
      intro: [
        "Una dirección con formato correcto puede rebotar igual si su dominio no tiene servidores de correo. Este validador revisa primero el formato por completo en tu navegador —longitud, caracteres, posición de los puntos y etiquetas del dominio— y después consulta DNS en vivo por HTTPS para ver si el dominio publica registros MX.",
        "Además compara el dominio con una lista de los proveedores más comunes y señala erratas probables como gmial.com. Por la red solo viaja el dominio; la parte anterior a la @ nunca sale de tu navegador.",
      ],
      steps: [
        "Escribe o pega la dirección y pulsa Validar.",
        "Lee la fila Sintaxis: detecta partes locales mal formadas, puntos dobles y dominios inválidos sin ninguna llamada de red.",
        "Mira la fila de servidores de correo para confirmar que el dominio recibe mensajes; algunos sin MX aceptan correo por su registro A y la herramienta también lo indica.",
        "Si sugiere una errata, corrige el dominio y valida de nuevo.",
      ],
      faqs: [
        {
          q: "¿Comprueba si el buzón existe?",
          a: "No. Los servidores de correo normalmente no revelan si un buzón concreto existe (y sondearlos sería intrusivo). La herramienta verifica el formato y que el dominio está configurado para recibir correo, que es lo que la mayoría de las verificaciones necesitan. Un buzón lleno o abandonado puede rebotar igualmente.",
        },
        {
          q: "¿Qué se envía exactamente por la red?",
          a: "Solo el dominio —la parte tras la @— en una consulta DNS al resolvedor público de Google (dns.google) por HTTPS. La dirección completa y todo lo anterior a la @ se queda en tu navegador.",
        },
        {
          q: "¿Por qué falla el MX en una dirección válida?",
          a: "Algunos dominios no publican MX y dependen de su registro A (enrutado implícito); la herramienta te avisa cuando es el caso. Otros publican un null MX que indica que no aceptan correo. Los dominios corporativos o recién creados también pueden faltar un tiempo en la caché de los resolvedores públicos: espera un minuto y reintenta.",
        },
      ],
      deepDive: [
        {
          heading: "Formato válido no significa buzón vivo",
          paragraphs: [
            "Las RFC permiten formalmente direcciones mucho más raras de lo que el mundo real usa: partes locales entre comillas como \"odd name\"@example.com, dominios literales de IP, comentarios dentro de la dirección. Los servidores reales rechazan casi todo eso, así que un validador que implemente la gramática completa de la RFC daría por buenas direcciones que nadie puede usar. Esta herramienta comprueba el subconjunto práctico —la sintaxis que Gmail, Outlook y los grandes proveedores aceptan de verdad—, que es el listón correcto para un formulario de registro.",
            "Además, una dirección perfectamente formada no dice nada del buzón que hay detrás: puede estar lleno, eliminado, ser un catch-all que traga todo, o una trampa de spam que arruina tu reputación como remitente. Por eso el formato por sí solo es una señal débil; la pregunta con sentido es si el dominio está configurado para recibir correo, y eso sí se responde con una consulta DNS pública.",
          ],
        },
        {
          heading: "Qué dice la comprobación MX y qué no",
          paragraphs: [
            "Un registro MX es una promesa pública: el correo de este dominio debe ir a estos servidores, en este orden de prioridad. No haber MX suele significar que no hay correo, pero hay dos excepciones honestas: algunos dominios pequeños reciben por su registro A mediante enrutado implícito, y un null MX declara explícitamente que no se acepta nada. La herramienta distingue estos casos en vez de colapsarlos en un único fallo, porque significan cosas distintas para un embudo de registro.",
            "Lo que ninguna consulta DNS puede decirte es si un buzón concreto existe. Los servidores lo ocultan a propósito — sondear con comandos RCPT TO es justo la técnica de los recolectores de direcciones, y muchos servidores aceptan todos los destinatarios y rebotan después para no confirmar nada. La verificación SMTP completa es terreno de servicios masivos del lado del servidor; una herramienta de navegador que afirme verificar buzones está prometiendo de más. Formato más MX más detección de erratas es el techo honesto de una comprobación en el cliente.",
          ],
        },
        {
          heading: "Erratas y la privacidad de la división",
          paragraphs: [
            "Buena parte de los registros fallidos son erratas de una letra: gmial.com, hotmial.com, .cm en lugar de .com. Comparar el dominio con una lista de los proveedores más comunes atrapa la mayoría antes de que el usuario choque contra un rebote — mucho más barato que limpiar la lista después, y más amable: el usuario corrige un carácter en vez de quedarse esperando un correo de confirmación que jamás llegará.",
            "La privacidad del diseño es deliberada: la validación de la parte local —la que suele llevar tu nombre o alias— ocurre por completo sin conexión, y solo el dominio cruza la red, como una consulta DNS normal. El dominio de una dirección rara vez identifica a una persona; la parte local casi siempre. Recuerda esa división cuando pegues direcciones que no querrías ver registradas.",
          ],
        },
      ],
    },
    pt: {
      name: "Validador de e-mail",
      tagline:
        "Confira o formato localmente e verifique por consulta MX em tempo real se o domínio recebe e-mail, com detecção de erros de digitação. Grátis e instantâneo.",
      intro: [
        "Um endereço com formato correto ainda pode devolver erro se o domínio não tiver servidores de e-mail. Este validador primeiro confere o formato inteiro no seu navegador — comprimento, caracteres, posição dos pontos e rótulos do domínio — e depois consulta o DNS em tempo real por HTTPS para ver se o domínio publica registros MX.",
        "Ele também compara o domínio com uma lista dos provedores mais comuns e aponta erros prováveis como gmial.com. Só o domínio trafega pela rede; a parte antes do @ nunca sai do seu navegador.",
      ],
      steps: [
        "Digite ou cole o endereço e clique em Validar.",
        "Leia a linha Sintaxe: ela detecta partes locais malformadas, pontos duplicados e domínios inválidos sem nenhuma chamada de rede.",
        "Confira a linha dos servidores de e-mail para saber se o domínio recebe mensagens — alguns sem MX aceitam pelo registro A, e a ferramenta avisa disso também.",
        "Se surgir uma sugestão de erro de digitação, corrija o domínio e valide de novo.",
      ],
      faqs: [
        {
          q: "Isso verifica se a caixa postal existe?",
          a: "Não. Servidores de e-mail normalmente não revelam se uma caixa específica existe (e sondá-los seria invasivo). A ferramenta confirma o formato e que o domínio está configurado para receber e-mail, que é o que a maioria dos fluxos de verificação precisa. Caixas cheias ou abandonadas ainda podem devolver erro.",
        },
        {
          q: "O que exatamente é enviado pela rede?",
          a: "Apenas o domínio — a parte depois do @ — numa consulta DNS ao resolvedor público do Google (dns.google) por HTTPS. O endereço completo e tudo antes do @ ficam no seu navegador.",
        },
        {
          q: "Por que o MX falha para um endereço válido?",
          a: "Alguns domínios não publicam MX e dependem do registro A (roteamento implícito); a ferramenta avisa quando é o caso. Outros publicam um null MX dizendo que não aceitam e-mail. Domínios corporativos ou recém-criados também podem demorar a aparecer no cache dos resolvedores públicos — espere um minuto e tente de novo.",
        },
      ],
      deepDive: [
        {
          heading: "Formato válido não é o mesmo que caixa ativa",
          paragraphs: [
            "As RFCs permitem formalmente endereços bem mais estranhos do que o mundo real usa: partes locais entre aspas como \"odd name\"@example.com, domínios literais de IP, comentários no meio do endereço. Servidores reais rejeitam quase tudo isso, então um validador que implementasse a gramática completa da RFC aprovaria endereços que ninguém consegue usar. Esta ferramenta confere o subconjunto prático — a sintaxe que Gmail, Outlook e os grandes provedores realmente aceitam —, que é o padrão certo para um formulário de cadastro.",
            "Além disso, um endereço perfeitamente formado não diz nada sobre a caixa por trás dele: pode estar cheia, excluída, ser um catch-all que engole tudo, ou uma armadilha de spam que arruína sua reputação de remetente. Por isso o formato sozinho é um sinal fraco; a pergunta que importa é se o domínio está configurado para receber e-mail, e isso se responde com uma consulta DNS pública.",
          ],
        },
        {
          heading: "O que a verificação MX diz e o que não diz",
          paragraphs: [
            "Um registro MX é uma promessa pública: o e-mail desse domínio deve ir para aqueles servidores, nessa ordem de prioridade. Não haver MX geralmente significa que não há e-mail, mas há duas exceções honestas: alguns domínios pequenos recebem pelo registro A com roteamento implícito, e um null MX declara explicitamente que nada é aceito. A ferramenta separa esses casos em vez de reduzi-los a uma única falha, porque significam coisas diferentes num funil de cadastro.",
            "O que nenhuma consulta DNS pode dizer é se uma caixa específica existe. Os servidores escondem isso de propósito — sondar com comandos RCPT TO é exatamente a técnica dos coletores de endereços, e muitos servidores aceitam todos os destinatários e devolvem erro depois para não confirmar nada. Verificação SMTP completa é território de serviços em massa no lado do servidor; uma ferramenta de navegador que afirma verificar caixas está prometendo demais. Formato mais MX mais detecção de erros de digitação é o teto honesto de uma checagem no cliente.",
          ],
        },
        {
          heading: "Erros de digitação e a privacidade da divisão",
          paragraphs: [
            "Boa parte dos cadastros que falham são erros de uma letra: gmial.com, hotmial.com, .cm em vez de .com. Comparar o domínio com uma lista dos provedores mais comuns captura a maioria antes de o usuário esbarrar num erro de entrega — muito mais barato que limpar a lista depois, e mais gentil: a pessoa corrige um caractere em vez de esperar para sempre uma confirmação que nunca chegará.",
            "A privacidade do desenho é deliberada: a validação da parte local — a que costuma levar seu nome ou apelido — roda inteiramente offline, e só o domínio cruza a rede, como uma consulta DNS comum. O domínio raramente identifica uma pessoa; a parte local quase sempre. Lembre dessa divisão quando colar endereços que você não gostaria de ver registrados.",
          ],
        },
      ],
    },
  },
});
