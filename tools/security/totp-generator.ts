import { SecTotpEngine } from "../_engines/sec-engine-totp";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "totp-generator",
  category: "security",
  icon: "clock",
  engine: { component: SecTotpEngine },
  related: ["password-generator", "password-strength", "hash-generator"],
  copy: {
    en: {
      name: "TOTP Generator",
      tagline:
        "Generate 2FA codes offline from any TOTP secret — RFC 6238, 6 or 8 digits, live 30-second countdown. Your secret never leaves the browser.",
      intro: [
        "Authenticator codes don't need an app on your phone. Paste a base32 secret (or a whole otpauth:// setup link from your old authenticator) and this tool computes the same rotating 6- or 8-digit codes as any RFC 6238 authenticator, with a live countdown to the next code.",
        "Everything is computed locally with WebCrypto's HMAC — no network calls at all. The secret stays in browser memory only, so a lost phone never means a lost second factor.",
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
    },
  },
});
