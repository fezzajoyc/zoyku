import { SecLookupEngine } from "../_engines/sec-engine-lookup";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "dns-lookup",
  category: "security",
  icon: "globe",
  engine: { component: SecLookupEngine, props: { kind: "dns" } },
  related: ["ip-lookup", "whois-lookup", "email-validator"],
  copy: {
    en: {
      name: "DNS Lookup",
      tagline:
        "Look up A, AAAA, MX, TXT, NS and CNAME records for any domain via DNS-over-HTTPS in a clean table — no terminal or dig commands needed.",
      intro: [
        "DNS records tell you where a domain points, how it sends email and how it proves ownership. This tool resolves any record type through DNS-over-HTTPS (DoH) — the same encrypted channel modern browsers use — and lays the answers out in a readable table.",
        "It runs on Google's free public resolver, so there is nothing to install and no API key. Handy for checking propagation after a change, verifying SPF/DKIM/DMARC TXT records, or debugging why mail to a domain bounces.",
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
    },
  },
});
