import { SecTotpEngine } from "../_engines/sec-engine-totp";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "totp-generator",
  category: "security",
  icon: "clock",
  engine: { component: SecTotpEngine },
  related: ["password-generator", "password-strength", "hash-generator", "whois-lookup", "ip-lookup", "email-validator", "dns-lookup", "random-number"],
  copy: {
    en: {
      name: "TOTP Generator",
      tagline:
        "Generate 2FA codes offline from any TOTP secret — RFC 6238, 6 or 8 digits, live 30-second countdown. Your secret never leaves the browser.",
      intro: [
        "Authenticator codes don't need an app on your phone. Paste a base32 secret (or a whole otpauth:// setup link from your old authenticator) and this tool computes the same rotating 6- or 8-digit codes as any RFC 6238 authenticator, with a live countdown to the next code.",
        "Codes follow RFC 6238 exactly: HMAC over an 8-byte big-endian counter of 30-second Unix intervals, then dynamic truncation to 6 or 8 digits — the same parameters Google Authenticator ships with. The countdown shows precisely when the current window ends, so you know whether the code you just read is still good.",
        "Secrets are decoded from base32 or parsed straight from an otpauth:// link, and the HMAC runs through WebCrypto — no network calls at all. The secret stays in browser memory only and is never written to storage; reloading the page clears it.",
        "Phone authenticator apps are the right daily default, but they fail exactly when you need them: cracked screen, new phone, secret never backed up. A browser page is the recovery path — and unlike pasting your secret into an online TOTP site, here the key never leaves the device, so a lost phone never means a lost second factor.",
      ],
      steps: [
        "Copy the base32 secret from the service's 2FA setup page (or paste its otpauth:// link).",
        "Match the settings the service shows: 6 or 8 digits, 30- or 60-second period, SHA-1 unless told otherwise.",
        "Type the current code into the service before the countdown ends — or copy it with one click.",
        "Keep the tab open for repeated logins; codes refresh automatically every period.",
      ],
      faqs: [
        {
          q: "Is an offline authenticator safer than SMS codes?",
          a: "Yes, in two ways. TOTP codes are computed on your device and never travel over the phone network, so there is nothing for SIM-swap attackers to intercept. They also expire every 30 seconds and require possession of the secret itself, which never appears in any message.",
        },
        {
          q: "Where is my secret stored?",
          a: "Nowhere. It is held in a variable in this tab's memory and used by WebCrypto to sign time counters. Nothing is written to localStorage, cookies or any server — close the tab and it is gone.",
        },
        {
          q: "Why doesn't my code match?",
          a: "The most common causes: a wrong algorithm (most services use SHA-1), the wrong period, or a device clock drifting more than a few seconds. Check the three selectors against the service's setup page, and sync your system clock.",
        },
      ],
      deepDive: [
        {
          heading: "How the 30-second window works, and why it forgives clocks",
          paragraphs: [
            "TOTP (RFC 6238) turns a shared secret plus the current time into a code. The time is not used raw: both sides compute a counter — Unix time divided by the period, 30 seconds by default — and HMAC it with the secret. The server accepts a code from the current window and usually one or two windows on either side, so a few seconds of clock drift between your device and the server does not lock you out.",
            "That tolerance is also the security budget. A code is valid for roughly 30 to 90 seconds, which is tight enough that intercepting one is nearly useless but wide enough for humans who type slowly. Six digits give a million possibilities per window; with a typical rate-limiting of a handful of guesses per window, brute-forcing a live code is hopeless — the attack surface is the secret itself, not the digits.",
            "When your code does not match, the cause is almost always one of three settings, not a broken algorithm: the wrong hash (nearly everything uses SHA-1 despite the name sounding outdated), the wrong period (30 vs. 60 seconds), or a clock drifting beyond the acceptance windows. Sync the system clock first; it fixes most mismatches.",
          ],
        },
        {
          heading: "The secret is a shared secret — handle it like a password",
          paragraphs: [
            "The base32 string you paste is the full cryptographic material of your second factor: anyone holding it can generate valid codes forever, on any device, without knowing your phone. It is called a “shared” secret because both your authenticator and the service hold the same value. That is why pasting it into a random online TOTP site is equivalent to handing over your 2FA.",
            "This tool computes everything with WebCrypto inside your browser: no network calls, no storage in localStorage or cookies, nothing written to disk. Close the tab and the secret is gone from memory. That makes the page a legitimate recovery path — the same calculation your phone app does, just somewhere your phone is not.",
            "The sound hygiene remains: store the secret only in a password manager or the service's recovery codes, never in screenshots or chat logs. An otpauth:// link is convenient to paste here precisely because it bundles the secret with its parameters — treat a pasted link like a pasted password and clear your clipboard after.",
          ],
        },
        {
          heading: "TOTP versus SMS, and where a browser code fits",
          paragraphs: [
            "SMS codes travel over the phone network and are stored by carriers, which makes them interceptable — SIM-swap attacks exist precisely because the channel is the carrier, not because the digits are weak. TOTP codes never leave the device that computes them, so the interception angle disappears entirely. That, plus offline function and independence from phone number, is why every serious security guide prefers authenticator apps over SMS.",
            "A browser page generating codes is not a replacement for the app on your phone — it is the same algorithm in a second place. Its honest niche: recovering when the phone is broken or replaced, logging in on a machine where the app is not installed, and verifying a setup link's parameters. Keep the secret out of shared machines; on your own device, the page is as safe as the calculation it performs, which is none of anyone's business.",
          ],
        },
      ],
    },
    zh: {
      name: "TOTP 验证码生成器",
      tagline: "基于任意 TOTP 密钥离线生成双因子验证码——RFC 6238、6 或 8 位、实时 30 秒倒计时。密钥绝不离开浏览器。",
      intro: [
        "两步验证码不需要装在手机里。粘贴 base32 密钥(或旧验证器导出的整条 otpauth:// 链接),本工具会按 RFC 6238 计算出与任何验证器一致的 6 位或 8 位动态码,并实时倒计时下一次刷新。",
        "所有计算通过 WebCrypto 的 HMAC 在本地完成,完全不发起网络请求。密钥只存在于浏览器内存中——手机丢了,也不必担心第二验证因素一起丢失。",
      ],
      steps: [
        "从服务的两步验证设置页复制 base32 密钥(或直接粘贴 otpauth:// 链接)。",
        "按服务页面显示的参数选择:6 位或 8 位、30 或 60 秒周期;没有特殊说明时算法选 SHA-1。",
        "在倒计时结束前把当前验证码输入服务页面,或一键复制。",
        "保持标签页打开即可连续登录;验证码每个周期自动刷新。",
      ],
      faqs: [
        {
          q: "离线验证码比短信验证码更安全吗?",
          a: "是的,有两点原因。TOTP 验证码在你的设备上计算,不经过电话网络,换卡攻击者无从截获;验证码每 30 秒过期,且必须持有密钥本身才能算出——而密钥从不出现在任何消息里。",
        },
        {
          q: "我的密钥被存在哪里?",
          a: "哪里都不存。密钥只保存在当前标签页内存的一个变量里,由 WebCrypto 用来对时间计数器做签名。不会写入 localStorage、Cookie,也不会上传任何服务器——关闭标签页即消失。",
        },
        {
          q: "为什么我的验证码对不上?",
          a: "最常见的原因:算法选错(绝大多数服务用 SHA-1)、周期不对,或设备时钟偏差超过几秒。对照服务的设置页检查三个选项,并把系统时钟同步准确。",
        },
      ],
      deepDive: [
        {
          heading: "30 秒时间窗怎么工作,为什么它能容忍时钟偏差",
          paragraphs: [
            "TOTP(RFC 6238)把共享密钥加当前时间变成验证码。时间不是直接使用:两端各自计算一个计数器——Unix 时间除以周期(默认 30 秒)——再用密钥对计数器做 HMAC。服务端会接受当前时间窗的验证码,通常还接受前后一两个窗口,所以你的设备和服务端差几秒不会把你锁在门外。",
            "这份宽容同时就是安全预算。一个验证码的有效期约 30 到 90 秒——短到截获一个几乎没用,又长到打字慢的人来得及。6 位数字每个窗口有一百万种可能;叠加服务端常见的“每个窗口限猜几次”,对在线验证码暴力破解毫无希望——真正的攻击面是密钥本身,不是那几位数字。",
            "验证码对不上时,原因几乎总是三个设置之一,而不是算法坏了:哈希选错(虽然名字听着过时,几乎所有服务都用 SHA-1)、周期不对(30 秒还是 60 秒)、或时钟偏差超出接受窗口。先同步系统时钟,能解决绝大多数不匹配。",
          ],
        },
        {
          heading: "密钥是共享秘密——请当密码对待",
          paragraphs: [
            "你粘贴的 base32 字符串就是你第二验证因素的全部密码学材料:任何拿到它的人都能在任何设备上永远生成有效验证码,不需要碰你的手机。它叫“共享”秘密,因为你的验证器和服务端保存的是同一个值。这正是为什么把密钥贴进随便哪个在线 TOTP 网站,等于把双因子拱手交出。",
            "本工具的全部计算都通过 WebCrypto 在浏览器内完成:不发网络请求、不写 localStorage 或 Cookie、不落盘。关闭标签页,密钥就从内存里消失。这让本页面成为正当的恢复路径——和手机验证器一模一样的计算,只是发生在手机不在的地方。",
            "基本卫生仍然适用:密钥只存进密码管理器或服务的恢复码,不存截图、不发聊天记录。otpauth:// 链接之所以方便粘贴,是因为它把密钥和参数打包在一起——贴过链接就当贴过密码,用完清空剪贴板。",
          ],
        },
        {
          heading: "TOTP 对比短信,以及浏览器验证码的位置",
          paragraphs: [
            "短信验证码经过电话网络、被运营商存储,所以可被截获——换卡攻击(SIM swap)存在,正是因为信道是运营商,不是因为那几位数字弱。TOTP 验码从不离开计算它的设备,截获这条路直接消失。再加上离线可用、不依赖手机号,正经的安全指南都推荐验证器应用胜过短信。",
            "浏览器页面生成验证码不是手机应用的替代品——它是同一算法在第二个地方运行。它诚实的定位:手机碎屏或换机时的恢复、在没装应用的机器上登录、核对 otpauth:// 参数。不要在公用机器上粘贴密钥;在你自己的设备上,这个页面和它执行的计算一样安全——而那个计算不关任何人的事。",
          ],
        },
      ],
    },
    ja: {
      name: "TOTP コード生成",
      tagline:
        "任意の TOTP シークレットから 2FA コードをオフライン生成——RFC 6238、6/8 桁、30 秒カウントダウン付き。シークレットはブラウザから出ません。",
      intro: [
        "認証コードはスマホアプリがなくても作れます。base32 シークレット(または旧認証アプリの otpauth:// リンク)を貼り付けると、RFC 6238 認証アプリと同じ 6 桁・8 桁のワンタイムコードを、次回更新までのカウントダウン付きで計算します。",
        "計算はすべて WebCrypto の HMAC でローカルに行われ、通信は一切ありません。シークレットはブラウザのメモリにのみ存在するため、スマホを紛失しても二要素認証を失いません。",
      ],
      steps: [
        "サービスの 2FA 設定ページから base32 シークレットをコピーします(otpauth:// リンクでも可)。",
        "サービスの表示に合わせて設定します:6 桁か 8 桁、30 秒か 60 秒の周期、特別な指定がなければ SHA-1。",
        "カウントダウンが終わるまでにコードをサービスに入力するか、ワンクリックでコピーします。",
        "タブを開いたままにすれば連続ログインに便利で、コードは各周期で自動更新されます。",
      ],
      faqs: [
        {
          q: "オフライン認証は SMS コードより安全?",
          a: "はい、理由は二つあります。TOTP コードは端末内で計算され電話網を流れないため、SIM スワップ攻撃で傍受される余地がありません。さらに 30 秒で失効し、生成にはシークレット自体の所持が必要です。シークレットがメッセージに現れることはありません。",
        },
        {
          q: "シークレットはどこに保存されますか?",
          a: "どこにも保存されません。このタブのメモリ上の変数に保持され、WebCrypto が時間カウンタの署名に使うだけです。localStorage や Cookie、サーバーには一切書き込まず、タブを閉じれば消えます。",
        },
        {
          q: "コードが一致しないのはなぜ?",
          a: "多い原因は、アルゴリズムの選択ミス(多くのサービスは SHA-1)、周期の不一致、端末時計の数秒以上のずれです。サービスの設定ページと 3 つのセレクターを照合し、システム時計を同期してください。",
        },
      ],
      deepDive: [
        {
          heading: "30 秒ウィンドウの仕組みと、時計のずれを許す理由",
          paragraphs: [
            "TOTP(RFC 6238)は共有シークレットと現在時刻をコードに変換します。時刻はそのまま使われません。両側が Unix 時間を周期(既定 30 秒)で割ったカウンタを計算し、それをシークレットで HMAC します。サーバーは現在のウィンドウのコードを受け付け、通常は前後 1〜2 個のウィンドウも許すため、端末とサーバーで数秒時計がずれても締め出されません。",
            "この許容がそのままセキュリティ予算です。コードの有効期間はおよそ 30〜90 秒。傍受したコードがほぼ役に立たないほど短く、ゆっくり打つ人間には十分な長さです。6 桁ならウィンドウごとに 100 万通り。サービス側の「1 ウィンドウ数回まで」という制限と合わされば、生きているコードの総当たりは絶望的です。攻撃面は桁ではなくシークレットそのものです。",
            "コードが一致しないとき、原因はほぼ必ず 3 つの設定のどれかで、アルゴリズムの破綻ではありません。ハッシュの選択ミス(名前が古く聞こえても、ほぼすべてのサービスは SHA-1)、周期の不一致(30 秒か 60 秒か)、時計のずれが受付ウィンドウを超えていること。まずシステム時計を同期しましょう。これで大半の不一致が直ります。",
          ],
        },
        {
          heading: "シークレットは共有秘密——パスワードとして扱う",
          paragraphs: [
            "貼り付けた base32 文字列は、二要素認証の暗号学的材料の全部です。それを握った誰もが、あなたのスマホに触れずに、任意の端末で永久に有効なコードを生成できます。「共有」と呼ばれるのは、認証アプリとサービスが同じ値を保持するからです。だからこそ、出会ったオンライン TOTP サイトに貼ることは、2FA をそのまま渡すのと同じです。",
            "このツールの計算はすべて WebCrypto でブラウザ内の完結します。通信なし、localStorage や Cookie への書き込みなし、ディスクにも落としません。タブを閉じればシークレットはメモリから消えます。だからこのページは正当な復旧経路になります。スマホアプリと同じ計算を、スマホのない場所で行うだけです。",
            "基本の衛生管理は変わりません。シークレットはパスワードマネージャーかサービスのリカバリーコードだけに保存し、スクリーンショットやチャットに残さない。otpauth:// リンクが貼り付けに便利なのは、シークレットとパラメータを束ねているからです。リンクを貼ることはパスワードを貼ることと同じと考え、貼り付け後はクリップボードを消してください。",
          ],
        },
        {
          heading: "TOTP と SMS の違い、そしてブラウザコードの居場所",
          paragraphs: [
            "SMS コードは電話網を流れ、キャリアに保存されるため傍受できます。SIM スワップ攻撃が存在するのは、桁が弱いからではなく、経路がキャリアだからです。TOTP コードは計算する端末の外に出ないので、傍受という攻撃経路そのものが消えます。オフラインで動き、電話番号にも依存しない。だからこそまともなセキュリティガイドは SMS より認証アプリを勧めます。",
            "ブラウザでコードを生成するページは、スマホアプリの代替ではありません。同じアルゴリズムが別の場所で動いているだけです。誠実な立ち位置はこうです。スマホが壊れた・変わったときの復旧、アプリを入れられないマシンでのログイン、otpauth:// のパラメータ確認。共用マシンにはシークレットを貼らないこと。自分の端末なら、このページの安全性はそこで走る計算の安全性と同じで、その計算は誰の監視対象でもありません。",
          ],
        },
      ],
    },
    es: {
      name: "Generador TOTP",
      tagline:
        "Genera códigos 2FA sin conexión desde cualquier secreto TOTP — RFC 6238, 6 u 8 dígitos, cuenta atrás de 30 segundos en vivo. El secreto nunca sale del navegador.",
      intro: [
        "Los códigos de autenticación no necesitan una app en el móvil. Pega un secreto base32 (o el enlace otpauth:// completo de tu antiguo autenticador) y esta herramienta calcula los mismos códigos rotativos de 6 u 8 dígitos que cualquier autenticador RFC 6238, con cuenta atrás hasta el siguiente.",
        "Todo se calcula localmente con el HMAC de WebCrypto: ninguna llamada de red. El secreto permanece solo en la memoria del navegador, así que perder el móvil no significa perder el segundo factor.",
      ],
      steps: [
        "Copia el secreto base32 de la página de configuración 2FA del servicio (o pega su enlace otpauth://).",
        "Ajusta los parámetros que muestre el servicio: 6 u 8 dígitos, periodo de 30 o 60 segundos, SHA-1 salvo indicación contraria.",
        "Introduce el código actual en el servicio antes de que acabe la cuenta atrás, o cópialo con un clic.",
        "Deja la pestaña abierta para inicios de sesión repetidos: los códigos se renuevan automáticamente en cada periodo.",
      ],
      faqs: [
        {
          q: "¿Un autenticador sin conexión es más seguro que los códigos SMS?",
          a: "Sí, por dos motivos. Los códigos TOTP se calculan en tu dispositivo y nunca viajan por la red telefónica, así que un atacante de SIM-swap no tiene nada que interceptar. Además caducan cada 30 segundos y exigen poseer el propio secreto, que jamás aparece en ningún mensaje.",
        },
        {
          q: "¿Dónde se guarda mi secreto?",
          a: "En ningún sitio. Permanece en una variable de la memoria de esta pestaña y WebCrypto lo usa para firmar contadores de tiempo. No se escribe en localStorage, cookies ni ningún servidor: cierras la pestaña y desaparece.",
        },
        {
          q: "¿Por qué no coincide mi código?",
          a: "Las causas más habituales: algoritmo equivocado (casi todos los servicios usan SHA-1), periodo incorrecto o un reloj del dispositivo desfasado más de unos segundos. Compara los tres selectores con la página de configuración del servicio y sincroniza tu reloj.",
        },
      ],
      deepDive: [
        {
          heading: "Cómo funciona la ventana de 30 segundos y por qué perdona los relojes",
          paragraphs: [
            "TOTP (RFC 6238) convierte un secreto compartido más la hora actual en un código. La hora no se usa en crudo: ambos lados calculan un contador — tiempo Unix dividido por el periodo, 30 segundos por defecto — y lo firman con HMAC usando el secreto. El servidor acepta un código de la ventana actual y normalmente de una o dos ventanas a cada lado, así que unos segundos de desfase entre tu reloj y el servidor no te dejan fuera.",
            "Esa tolerancia es también el presupuesto de seguridad. Un código vale unos 30 a 90 segundos: lo bastante corto para que interceptar uno sirva de poco y lo bastante largo para humanos que teclean despacio. Seis dígitos dan un millón de posibilidades por ventana; con el límite habitual de unos pocos intentos por ventana, forzar en bruto un código vivo es desesperado — la superficie de ataque es el propio secreto, no los dígitos.",
            "Cuando tu código no coincide, la causa casi siempre es uno de tres ajustes, no un algoritmo roto: el hash equivocado (casi todo usa SHA-1 aunque el nombre suene anticuado), el periodo incorrecto (30 frente a 60 segundos), o un reloj desfasado más allá de las ventanas aceptadas. Sincroniza primero el reloj del sistema: arregla la mayoría de los desajustes.",
          ],
        },
        {
          heading: "El secreto es un secreto compartido — trátalo como una contraseña",
          paragraphs: [
            "La cadena base32 que pegas es el material criptográfico completo de tu segundo factor: quien la posea puede generar códigos válidos para siempre, en cualquier dispositivo, sin tocar tu móvil. Se llama secreto “compartido” porque tu autenticador y el servicio guardan el mismo valor. Por eso pegarlo en cualquier sitio web de TOTP online equivale a entregar tu 2FA.",
            "Esta herramienta lo calcula todo con WebCrypto dentro del navegador: sin llamadas de red, sin escritura en localStorage ni cookies, sin nada en disco. Cierras la pestaña y el secreto desaparece de la memoria. Eso convierte la página en una vía legítima de recuperación — el mismo cálculo que hace la app del móvil, solo que donde el móvil no está.",
            "La higiene básica sigue vigente: guarda el secreto solo en un gestor de contraseñas o en los códigos de recuperación del servicio, nunca en capturas ni chats. Un enlace otpauth:// es cómodo de pegar aquí justamente porque empaqueta el secreto con sus parámetros — trata un enlace pegado como una contraseña pegada y limpia el portapapeles después.",
          ],
        },
        {
          heading: "TOTP frente a SMS, y dónde encaja un código de navegador",
          paragraphs: [
            "Los códigos SMS viajan por la red telefónica y los guardan las operadoras, lo que los hace interceptables — los ataques de SIM-swap existen precisamente porque el canal es la operadora, no porque los dígitos sean débiles. Los códigos TOTP nunca salen del dispositivo que los calcula, así que el ángulo de intercepción desaparece por completo. Eso, más funcionar sin conexión y no depender del número de teléfono, es por lo que toda guía seria prefiere apps autenticadoras a SMS.",
            "Una página de navegador generando códigos no sustituye a la app del móvil — es el mismo algoritmo en un segundo sitio. Su nicho honesto: recuperar el acceso cuando el móvil se rompe o se cambia, iniciar sesión en una máquina sin la app instalada, y verificar los parámetros de un enlace de configuración. No pegues el secreto en máquinas compartidas; en tu propio dispositivo, la página es tan segura como el cálculo que ejecuta — y ese cálculo no es asunto de nadie.",
          ],
        },
      ],
    },
    pt: {
      name: "Gerador TOTP",
      tagline:
        "Gere códigos 2FA offline a partir de qualquer segredo TOTP — RFC 6238, 6 ou 8 dígitos, contagem regressiva de 30 segundos em tempo real. O segredo nunca sai do navegador.",
      intro: [
        "Os códigos de autenticação não precisam de um app no celular. Cole um segredo base32 (ou o link otpauth:// inteiro do seu autenticador antigo) e esta ferramenta calcula os mesmos códigos rotativos de 6 ou 8 dígitos de qualquer autenticador RFC 6238, com contagem regressiva para o próximo.",
        "Tudo é calculado localmente com o HMAC do WebCrypto — nenhuma chamada de rede. O segredo fica apenas na memória do navegador, então perder o celular não significa perder o segundo fator.",
      ],
      steps: [
        "Copie o segredo base32 na página de configuração 2FA do serviço (ou cole o link otpauth:// dele).",
        "Ajuste os parâmetros que o serviço mostra: 6 ou 8 dígitos, período de 30 ou 60 segundos, SHA-1 salvo indicação contrária.",
        "Digite o código atual no serviço antes de a contagem acabar — ou copie com um clique.",
        "Deixe a aba aberta para logins repetidos: os códigos se renovam automaticamente a cada período.",
      ],
      faqs: [
        {
          q: "Um autenticador offline é mais seguro que códigos por SMS?",
          a: "Sim, por dois motivos. Os códigos TOTP são calculados no seu aparelho e nunca trafegam pela rede telefônica, então não há nada para um ataque de troca de SIM interceptar. Também expiram a cada 30 segundos e exigem a posse do próprio segredo, que nunca aparece em mensagem alguma.",
        },
        {
          q: "Onde meu segredo fica armazenado?",
          a: "Em lugar nenhum. Ele vive numa variável da memória desta aba e o WebCrypto o usa para assinar contadores de tempo. Nada é gravado em localStorage, cookies ou servidores — feche a aba e ele se vai.",
        },
        {
          q: "Por que meu código não bate?",
          a: "As causas mais comuns: algoritmo errado (quase todos os serviços usam SHA-1), período incorreto ou relógio do aparelho adiantado ou atrasado mais de alguns segundos. Confira os três seletores na página de configuração do serviço e sincronize o relógio do sistema.",
        },
      ],
      deepDive: [
        {
          heading: "Como funciona a janela de 30 segundos e por que ela perdoa relógios",
          paragraphs: [
            "TOTP (RFC 6238) transforma um segredo compartilhado mais a hora atual num código. A hora não é usada em bruto: os dois lados calculam um contador — tempo Unix dividido pelo período, 30 segundos por padrão — e o assinam com HMAC usando o segredo. O servidor aceita um código da janela atual e normalmente de uma ou duas janelas de cada lado, então alguns segundos de diferença entre seu relógio e o servidor não te deixam de fora.",
            "Essa tolerância é também o orçamento de segurança. Um código vale uns 30 a 90 segundos: curto o bastante para interceptar um não servir de quase nada e longo o bastante para humanos que digitam devagar. Seis dígitos dão um milhão de possibilidades por janela; com o limite usual de poucas tentativas por janela, quebrar em força bruta um código vivo é sem esperança — a superfície de ataque é o próprio segredo, não os dígitos.",
            "Quando seu código não bate, a causa quase sempre é um de três ajustes, não um algoritmo quebrado: o hash errado (quase tudo usa SHA-1, apesar do nome soar desatualizado), o período incorreto (30 contra 60 segundos), ou um relógio defasado além das janelas aceitas. Sincronize primeiro o relógio do sistema: isso resolve a maioria das discrepâncias.",
          ],
        },
        {
          heading: "O segredo é um segredo compartilhado — trate-o como senha",
          paragraphs: [
            "A string base32 que você cola é o material criptográfico completo do seu segundo fator: quem a tiver pode gerar códigos válidos para sempre, em qualquer aparelho, sem tocar no seu celular. Chama-se segredo “compartilhado” porque seu autenticador e o serviço guardam o mesmo valor. É exatamente por isso que colá-lo num site qualquer de TOTP online equivale a entregar seu 2FA.",
            "Esta ferramenta calcula tudo com WebCrypto dentro do navegador: sem chamadas de rede, sem escrita em localStorage ou cookies, sem nada em disco. Feche a aba e o segredo desaparece da memória. Isso torna a página um caminho legítimo de recuperação — o mesmo cálculo que o app do celular faz, só que num lugar onde o celular não está.",
            "A higiene básica continua valendo: guarde o segredo só num gerenciador de senhas ou nos códigos de recuperação do serviço, nunca em capturas de tela ou conversas. Um link otpauth:// é cômodo de colar aqui justamente porque embrulha o segredo com seus parâmetros — trate um link colado como uma senha colada e limpe a área de transferência depois.",
          ],
        },
        {
          heading: "TOTP contra SMS, e onde um código de navegador cabe",
          paragraphs: [
            "Códigos por SMS trafegam pela rede telefônica e ficam armazenados nas operadoras, o que os torna interceptáveis — ataques de troca de SIM existem precisamente porque o canal é a operadora, não porque os dígitos são fracos. Códigos TOTP nunca saem do aparelho que os calcula, então o ângulo de interceptação desaparece por completo. Isso, mais funcionar offline e não depender do número de telefone, é por que toda guia séria prefere apps autenticadores a SMS.",
            "Uma página de navegador gerando códigos não substitui o app do celular — é o mesmo algoritmo rodando num segundo lugar. Seu nicho honesto: recuperar acesso quando o celular quebra ou é trocado, entrar numa máquina sem o app instalado e conferir os parâmetros de um link de configuração. Não cole o segredo em máquinas compartilhadas; no seu próprio aparelho, a página é tão segura quanto o cálculo que executa — e esse cálculo não é assunto de ninguém.",
          ],
        },
      ],
    },
  },
});
