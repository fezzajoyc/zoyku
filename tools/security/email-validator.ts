import { SecEmailValidatorEngine } from "../_engines/sec-engine-email";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "email-validator",
  category: "security",
  icon: "check",
  engine: { component: SecEmailValidatorEngine },
  related: ["dns-lookup", "ip-lookup", "whois-lookup"],
  copy: {
    en: {
      name: "Email Validator",
      tagline:
        "Check an email's format locally and verify its domain can receive mail with a live MX lookup, plus typo detection — free, instant, no signup.",
      intro: [
        "A syntactically valid address can still bounce if its domain has no mail servers. This validator first checks the format entirely in your browser — length, characters, dot placement and domain labels — then queries live DNS over HTTPS to see whether the domain actually publishes MX (mail exchange) records.",
        "It also compares the domain against a list of the most common providers and flags likely typos like gmial.com. Only the domain part is sent over the network; the part before the @ never leaves your browser.",
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
    },
  },
});
