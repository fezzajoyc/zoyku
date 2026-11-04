import { SecPasswordStrengthEngine } from "../_engines/sec-engine-strength";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "password-strength",
  category: "security",
  icon: "shield",
  engine: { component: SecPasswordStrengthEngine },
  related: ["password-generator", "totp-generator", "hash-generator", "uuid-generator", "whois-lookup", "ip-lookup", "email-validator", "dns-lookup", "random-number"],
  copy: {
    en: {
      name: "Password Strength Checker",
      tagline:
        "See how strong a password really is: zxcvbn scoring, realistic crack-time estimates and concrete fixes — all computed locally, never uploaded.",
      intro: [
        "Most meters just count character classes. This checker runs the zxcvbn algorithm — built from real breach data and pattern analysis — which catches keyboard walks, repeated chunks, dates, l33t substitutions and passwords that appear in known leaks.",
        "zxcvbn scores 0–4 by estimating the number of guesses an offline attacker needs: a score of 3 means at least 10^8 guesses, 4 at least 10^10. Crack times are reported under three attack models — online throttled, online unthrottled and offline against a slow hash — because the same password faces very different adversaries.",
        "The matcher decomposes your input into dictionary words (including leaked-password lists), spatial keyboard patterns, repeats, sequences and dates, then finds the cheapest way to reconstruct it; that cost is the entropy estimate. Everything is computed in your browser: the password you type never leaves your device.",
        "The composition rules portals enforce — one upper, one digit, one symbol — steer users toward predictable patterns, which is why NIST SP 800-63B advises checking against breach lists instead of forced complexity. zxcvbn implements that philosophy, flagging passwords the class-counting meters confidently call strong.",
      ],
      steps: [
        "Type or paste the password into the box — use Show if you want to read it.",
        "Watch the score meter move from Very weak to Very strong as you edit.",
        "Read the crack-time table to understand what it withstands: throttled online guessing, offline attacks against slow hashes and offline attacks against fast hashes.",
        "Apply the suggestions — usually adding a couple of random words is the fastest win.",
      ],
      faqs: [
        {
          q: "What do the three crack-time scenarios mean?",
          a: "They model different attackers. Online, throttled (100 guesses/hour) is a login form that limits attempts. Offline, slow hash assumes a database hashed with bcrypt and cracked at 10,000 guesses per second. Offline, fast hash assumes weak or unsalted MD5/SHA-1 hashes cracked on GPUs at billions of guesses per second — the worst case for any reused password.",
        },
        {
          q: "Why does “Tr0ub4dor&3” score badly when it looks complex?",
          a: "Because substitutions like 0 for o and 3 for e are the first thing cracking dictionaries try. zxcvbn models these l33t rules, so it rates the underlying pattern — “troubador” plus decoration — rather than being fooled by the symbols.",
        },
        {
          q: "Is my password sent anywhere?",
          a: "No. The zxcvbn libraries and dictionaries load into your browser and every calculation runs locally. No network request carries your input.",
        },
      ],
    },
    zh: {
      name: "密码强度检测",
      tagline: "看看密码的真实强度:zxcvbn 评分、贴近现实的破解时间估算和具体改进建议——全部本地计算,绝不上传。",
      intro: [
        "多数强度条只数字符种类。本工具运行 zxcvbn 算法——基于真实泄露数据和模式匹配——能识别键盘走位、重复片段、日期、l33t 替换以及曾出现在已知泄露中的密码。",
        "你会得到 0–4 分评分、三种攻击场景下的破解时间估算,以及具体可执行的修改建议。所有计算都在浏览器内完成:你输入的密码不会离开设备。",
      ],
      steps: [
        "在输入框输入或粘贴密码;需要查看明文可点击“显示”。",
        "边改边看评分条从“非常弱”到“非常强”的变化。",
        "阅读破解时间表,理解它能抵御什么:被限速的在线猜测、针对慢哈希的离线攻击、针对快哈希的离线攻击。",
        "照建议修改——通常再加两个随机单词是最快的提升。",
      ],
      faqs: [
        {
          q: "三种破解时间场景分别是什么?",
          a: "它们对应不同的攻击者。在线限速(每小时 100 次猜测)是有次数限制的登录页面;离线慢哈希假设数据库用 bcrypt 存储、每秒可试 1 万次;离线快哈希假设站点用弱哈希或未加盐的 MD5/SHA-1、GPU 每秒可试数十亿次——这也是密码复用最危险的情形。",
        },
        {
          q: "“Tr0ub4dor&3”看起来很复杂,为什么评分很低?",
          a: "因为 0 代 o、3 代 e 这类替换是破解词典最先尝试的规则。zxcvbn 内置了这些 l33t 变换模型,它评的是底层模式——“troubador”加装饰——而不会被符号迷惑。",
        },
        {
          q: "我的密码会被发送到别处吗?",
          a: "不会。zxcvbn 库和词典直接加载进你的浏览器,所有计算都在本地进行,没有任何网络请求携带你的输入。",
        },
      ],
    },
    ja: {
      name: "パスワード強度チェック",
      tagline:
        "パスワードの本当の強さを判定:zxcvbn スコア、現実的な解読時間の推定、具体的な改善案。すべてローカル計算で送信しません。",
      intro: [
        "多くの強度メーターは文字種を数えるだけです。このツールは実際の流出データとパターン分析に基づく zxcvbn アルゴリズムを使い、キーボード上の走査、繰り返し、日付、l33t 変換、既知の漏洩に含まれるパスワードを見抜きます。",
        "0–4 のスコア、3 種類の攻撃シナリオ別の解読時間、具体的な提案が得られます。計算はすべてブラウザ内で行われ、入力したパスワードが端末の外に出ることはありません。",
      ],
      steps: [
        "入力欄にパスワードを入力または貼り付けます。確認したい場合は「表示」を押します。",
        "編集しながらスコアメーターが「非常に弱い」から「非常に強い」へ動くのを見ます。",
        "解読時間の表で耐性を確認します。制限付きオンライン攻撃、低速ハッシュへのオフライン攻撃、高速ハッシュへのオフライン攻撃の 3 シナリオです。",
        "提案に従って修正します。ふつうはランダムな単語を 2 つ追加するのが最も効果的です。",
      ],
      faqs: [
        {
          q: "3 つの解読時間シナリオの違いは?",
          a: "攻撃者の違いを表しています。オンライン・制限付き(毎時 100 回)は回数制限のあるログインフォームです。オフライン・低速ハッシュは bcrypt 等で保存されたデータベースを毎秒 1 万回で解析する想定。オフライン・高速ハッシュは塩なしの MD5/SHA-1 を GPU で毎秒数十億回試す最悪のケースで、パスワードの使い回しが最も危険になる場面です。",
        },
        {
          q: "「Tr0ub4dor&3」は複雑に見えるのに評価が低いのは?",
          a: "o を 0、e を 3 にする置き換えは解析辞書が最初に試すルールだからです。zxcvbn は l33t 変換をモデル化しているため、記号に見せかけた「troubador+装飾」という下地のパターンを正しく評価します。",
        },
        {
          q: "パスワードはどこかに送られますか?",
          a: "いいえ。zxcvbn のライブラリと辞書はブラウザに読み込まれ、計算はすべてローカルです。入力内容を運ぶ通信は一切ありません。",
        },
      ],
    },
    es: {
      name: "Analizador de contraseñas",
      tagline:
        "Descubre la fuerza real de una contraseña: puntuación zxcvbn, tiempos de descifrado realistas y consejos concretos. Todo local, sin subirla.",
      intro: [
        "La mayoría de los medidores solo cuentan tipos de caracteres. Este analizador ejecuta el algoritmo zxcvbn —basado en filtraciones reales y análisis de patrones—, que detecta recorridos de teclado, fragmentos repetidos, fechas, sustituciones l33t y contraseñas presentes en filtraciones conocidas.",
        "Obtienes una puntuación de 0 a 4, tiempos estimados de descifrado en tres escenarios de ataque y sugerencias concretas. Todo se calcula en tu navegador: la contraseña nunca sale de tu dispositivo.",
      ],
      steps: [
        "Escribe o pega la contraseña; usa Mostrar si quieres verla.",
        "Observa cómo el medidor pasa de Muy débil a Muy fuerte mientras la editas.",
        "Lee la tabla de tiempos de descifrado: adivinación online limitada, ataque sin conexión contra hashes lentos y contra hashes rápidos.",
        "Aplica las sugerencias: normalmente añadir un par de palabras al azar es la mejora más rápida.",
      ],
      faqs: [
        {
          q: "¿Qué significan los tres escenarios de crackeo?",
          a: "Modelan atacantes distintos. Online con límite (100 intentos/hora) simula un formulario que limita intentos. Sin conexión con hash lento asume una base de datos con bcrypt y 10.000 intentos por segundo. Sin conexión con hash rápido asume MD5/SHA-1 sin sal descifrados en GPU a miles de millones por segundo: el peor caso, sobre todo si reutilizas la contraseña.",
        },
        {
          q: "¿Por qué “Tr0ub4dor&3” sale mal si parece compleja?",
          a: "Porque sustituir o por 0 y e por 3 es lo primero que prueban los diccionarios de crackeo. zxcvbn modela esas reglas l33t y valora el patrón de fondo —“troubador” con adornos— en vez de dejarse engañar por los símbolos.",
        },
        {
          q: "¿Se envía mi contraseña a algún sitio?",
          a: "No. Las librerías y diccionarios de zxcvbn se cargan en tu navegador y el cálculo es local. Ninguna petición de red transporta lo que escribes.",
        },
      ],
    },
    pt: {
      name: "Verificador de força de senha",
      tagline:
        "Descubra a força real de uma senha: pontuação zxcvbn, tempos de quebra realistas e correções concretas — tudo calculado localmente, sem envio.",
      intro: [
        "A maioria dos medidores só conta tipos de caractere. Este verificador roda o algoritmo zxcvbn — construído sobre vazamentos reais e análise de padrões —, que enxerga caminhos de teclado, trechos repetidos, datas, substituições l33t e senhas que aparecem em vazamentos conhecidos.",
        "Você recebe uma nota de 0 a 4, tempos estimados de quebra em três cenários de ataque e sugestões específicas. Tudo é calculado no seu navegador: a senha digitada nunca sai do seu aparelho.",
      ],
      steps: [
        "Digite ou cole a senha; use Mostrar se quiser ler o que escreveu.",
        "Veja o medidor ir de Muito fraca a Muito forte enquanto você edita.",
        "Leia a tabela de tempos de quebra para entender o que ela resiste: tentativas online limitadas, ataque offline contra hash lento e contra hash rápido.",
        "Aplique as sugestões — em geral, acrescentar umas duas palavras aleatórias é a melhoria mais rápida.",
      ],
      faqs: [
        {
          q: "O que significam os três cenários de quebra?",
          a: "Eles modelam atacantes diferentes. Online limitado (100 tentativas/hora) simula um formulário que limita tentativas. Offline com hash lento assume um banco com bcrypt e 10 mil tentativas por segundo. Offline com hash rápido assume MD5/SHA-1 sem sal quebrados em GPU a bilhões por segundo — o pior caso, principalmente se você reusa a senha.",
        },
        {
          q: "Por que “Tr0ub4dor&3” pontua mal se parece complexa?",
          a: "Porque trocar o por 0 e e por 3 é a primeira coisa que os dicionários de quebra tentam. O zxcvbn modela essas regras l33t e avalia o padrão de fundo —“troubador” com enfeites— em vez de se deixar enganar pelos símbolos.",
        },
        {
          q: "Minha senha é enviada a algum lugar?",
          a: "Não. As bibliotecas e dicionários do zxcvbn carregam no seu navegador e o cálculo é local. Nenhuma requisição de rede leva o que você digita.",
        },
      ],
    },
  },
});
