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
        "zxcvbn scores 0–4 by estimating the number of guesses an offline attacker needs: a score of 3 means at least 10^8 guesses, 4 at least 10^10. Crack times are reported under three attack models — throttled online guessing, offline attacks against slow hashes and offline attacks against fast hashes — because the same password faces very different adversaries.",
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
      deepDive: [
        {
          heading: "How zxcvbn differs from class-counting meters",
          paragraphs: [
            "The familiar green-and-red strength bars count character classes: one uppercase, one digit, one symbol, score green. That model was never a measure of strength — it is a measure of compliance with a rule. zxcvbn works differently: it decomposes your input into the cheapest set of known patterns — dictionary words, keyboard walks like qwerty, repeats, sequences, dates, l33t substitutions — and reports the number of guesses an attacker following the same strategy would need.",
            "That is why Tr0ub4dor&3 scores poorly despite looking complex: the substitutions are the first rules cracking dictionaries apply, so the real cost of guessing it is the cost of guessing “troubador” plus a little decoration. The same engine explains why four random common words are far harder to crack than a short password padded with every symbol type.",
            "One thing zxcvbn explicitly is not: a verdict on whether your password exists in a specific breach. It approximates that by matching known leaked-password lists, but the only authoritative check is querying a breach database. Treat the score as a model of attacker cost, not a certificate.",
          ],
        },
        {
          heading: "Reading the three attack scenarios honestly",
          paragraphs: [
            "Crack time is meaningless without an attack model. A throttled online attack (around a hundred guesses per hour) is what a well-behaved login form allows; an offline attack against a slow hash like bcrypt (roughly ten thousand guesses per second) is what happens when a properly hashed database leaks; an offline attack against fast or unsalted hashes (billions of guesses per second on GPUs) is the worst case, and it is far more common than it should be.",
            "The useful habit is to judge a password by the worst scenario, not the best. A password that survives a week under the fast-hash column is fine for a well-run site and dangerously thin for the breached-and-sloppy one. Since you cannot control which site hashes properly, the conservative read is the fast-hash column — especially for anything you reuse.",
            "Also note what the estimate assumes: the attacker knows your generation scheme. That is the right assumption — dictionary attacks are built exactly around common human patterns — but it means the numbers are a floor on attacker cost for human-made passwords, not a ceiling.",
          ],
        },
        {
          heading: "Strength is not safety, and checking is local",
          paragraphs: [
            "The uncomfortable truth from breach analyses: most account takeovers do not involve cracking anything. They involve reused passwords from an earlier breach, or credentials handed to a phishing page. A perfect 4/4 score does not protect a password you reuse across sites — no metric can. The realistic defenses are a unique password per site and a password manager, with strength checking as the third leg.",
            "Checking itself is safe here: the zxcvbn library and its dictionaries load into your browser and every computation runs on your device. No network request ever carries what you type, so it is reasonable to test even real passwords — though typing any secret on a machine you do not trust is a risk no in-browser tool can remove.",
          ],
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
      deepDive: [
        {
          heading: "zxcvbn 和“数关数”强度条的本质区别",
          paragraphs: [
            "常见的红绿强度条在数“满足了几条规则”:有大写、有数字、有符号,绿灯亮起。这套模型从始至终衡量的都不是强度,而是“合规度”。zxcvbn 的做法完全不同:它把你的输入分解成一组已知的最低成本模式——词典词、qwerty 这类键盘走位、重复、连号、日期、l33t 替换——然后报告“采用同样策略的攻击者需要猜多少次”。",
            "Tr0ub4dor&3 看着复杂却得分很低,原因就在这里:0 代 o、3 代 e 正是破解词典最先应用的规则,猜中它的真实成本约等于猜中 “troubador” 加一点装饰。同一个引擎也能解释为什么四个随机常见词,远比塞满符号的短密码难破解。",
            "还要明确 zxcvbn 不是什么:它不能判定你的密码是否出现在某次具体泄露里。它通过匹配已知泄露密码列表来近似这件事,但权威的检查只有查询泄露数据库一条路。把分数理解为“攻击者成本的模型”,而不是一份证书。",
          ],
        },
        {
          heading: "诚实地读三种攻击场景",
          paragraphs: [
            "脱离攻击模型谈破解时间毫无意义。限速在线攻击(每小时约一百次)是一个守规矩的登录页允许的全部;针对 bcrypt 这类慢哈希的离线攻击(每秒约一万次)是“数据库哈希正确但被拖库”时发生的事;针对快哈希或未加盐哈希的离线攻击(GPU 每秒数十亿次)是最坏情形,而且比它应有的频率常见得多。",
            "实用的习惯是按最坏一列评估密码,而不是最好一列。在快哈希列能扛一周的密码,对管理规范的网站足够,对“又拖库又偷懒”的网站则非常单薄。你无法控制哪家网站哈希做得规范,所以保守的读法永远看快哈希列——对你复用的任何密码尤其如此。",
            "还要注意估算的前提假设:攻击者知道你的生成套路。这是正确的假设——破解词典正是围绕人类常见模式建立的——所以对“人手编的密码”而言,这些数字是攻击者成本的下限,不是上限。",
          ],
        },
        {
          heading: "强度不等于安全,而且检查是本地的",
          paragraphs: [
            "泄露数据分析里最不舒服的真相:大多数账号被盗根本不涉及破解,而是早前泄露中复用的密码,或者亲手交给钓鱼页的凭据。完美的 4/4 分救不了跨站复用的密码——任何指标都救不了。现实有效的防线是“一站一密”加密码管理器,强度检查只是第三条腿。",
            "检查本身在这里是安全的:zxcvbn 库和词典加载进你的浏览器,所有计算都在你的设备上完成。没有任何网络请求携带你输入的内容,所以测试真实密码也在合理范围内——当然,在一台你不信任的机器上输入任何秘密,都是浏览器工具无法消除的风险。",
          ],
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
      deepDive: [
        {
          heading: "zxcvbn が文字種カウント型メーターと違う点",
          paragraphs: [
            "見慣れた赤緑の強度バーは「ルールを何個満たしたか」を数えています。大文字あり、数字あり、記号ありで緑——あれは強度の尺度ではなく、コンプライアンスの尺度です。zxcvbn の発想は根本的に違います。入力を、既知パターンの最安値の組合せ——辞書語、qwerty のようなキーボード走査、繰り返し、連番、日付、l33t 変換——に分解し、同じ戦略を取る攻撃者が必要な試行回数を報告します。",
            "Tr0ub4dor&3 が複雑に見えるのに低評価なのはこのためです。o を 0、e を 3 に替える置換は解析辞書が真っ先に適用する規則で、推測コストの実質は「troubador+装飾」を当てるコストにほぼ等しい。同じエンジンは、ランダムな常见語 4 語が記号を詰め込んだ短いパスワードよりはるかに破られにくいことも説明します。",
            "zxcvbn が明示的にできないことも一つ。特定の流出事故にあなたのパスワードが含まれるかの判定です。既知の漏洩リストとの照合で近似はしますが、权威的な確認は流出データベースへの問い合わせだけです。スコアは「攻撃コストのモデル」であって、証明書ではありません。",
          ],
        },
        {
          heading: "3 つの攻撃シナリオを正直に読む",
          paragraphs: [
            "攻撃モデルなしに解読時間を語っても意味がありません。制限付きオンライン攻撃(毎時約 100 回)は行儀の良いログインフォームが許す上限。bcrypt のような低速ハッシュへのオフライン攻撃(毎秒約 1 万回)は「ハッシュ化は正しいのにデータベースが流出した」場合に起きます。高速・無塩ハッシュへのオフライン攻撃(GPU で毎秒数十億回)は最悪ケースで、しかも望まれるよりずっと頻繁に現実に起きています。",
            "実用的な習慣は、最良の列ではなく最悪の列でパスワードを判断すること。高速ハッシュ列で 1 週間耐えられるパスワードは、運営がまともなサイトには十分で、流出と手抜きを両方やるサイトには薄すぎます。どのサイトがハッシュを正しく実装しているか制御できない以上、保守的な読み方は常に高速ハッシュ列——特に使い回すパスワードではそれが鉄則です。",
            "推定の前提も押さえてください。攻撃者があなたの生成方式を知っている、という想定です。これが正しい想定です——解析辞書はまさに人間の常套パターンを中心に作られている——なので、人間が考えたパスワードにとってこれらの数字は攻撃コストの下限であって上限ではありません。",
          ],
        },
        {
          heading: "強度は安全そのものではなく、判定はローカル",
          paragraphs: [
            "流出データ分析から見えてくる不快な真実:アカウント乗っ取りの多くはクラッキングを経由しません。以前の流出から使い回されたパスワードか、フィッシングページに自ら差し出された認証情報です。完璧な 4/4 スコアでも、サイトをまたいで使い回すパスワードは守れません——どんな指標でも守れません。現実的な防御は「サイトごとに別パスワード」とパスワード管理ツールで、強度チェックはその三本目の脚です。",
            "判定そのものはここでは安全です。zxcvbn のライブラリと辞書はブラウザに読み込まれ、計算はすべて端末上で完結します。入力内容を運ぶ通信は一切発生しないので、実際のパスワードで試すことも筋が通っています——もっとも、信頼できないマシンでどんな秘密を打つのも、ブラウザツールでは消せないリスクではあります。",
          ],
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
      deepDive: [
        {
          heading: "En qué se diferencia zxcvbn de los medidores que cuentan clases",
          paragraphs: [
            "Las típicas barras rojas y verdes cuentan cuántas reglas cumples: una mayúscula, un dígito, un símbolo y luz verde. Ese modelo nunca midió fuerza; mide conformidad con una norma. zxcvbn hace algo distinto: descompone tu entrada en el conjunto más barato de patrones conocidos — palabras de diccionario, recorridos de teclado como qwerty, repeticiones, secuencias, fechas, sustituciones l33t — e informa cuántos intentos necesitaría un atacante que aplica la misma estrategia.",
            "Por eso Tr0ub4dor&3 puntúa mal pese a parecer compleja: las sustituciones son lo primero que aplican los diccionarios, así que el coste real de adivinarla es el de adivinar “troubador” con adornos. El mismo motor explica por qué cuatro palabras comunes al azar son mucho más difíciles de crackear que una contraseña corta rellena de símbolos.",
            "Una cosa que zxcvbn no es: un veredicto sobre si tu contraseña está en una filtración concreta. Lo aproxima comparando con listas de contraseñas filtradas conocidas, pero la única comprobación con autoridad es consultar una base de datos de filtraciones. Trata la puntuación como un modelo del coste del atacante, no como un certificado.",
          ],
        },
        {
          heading: "Leer los tres escenarios de ataque con honestidad",
          paragraphs: [
            "El tiempo de descifrado no significa nada sin un modelo de ataque. Un ataque online limitado (unas cien pruebas por hora) es todo lo que permite un formulario bien educado; un ataque sin conexión contra un hash lento como bcrypt (unos diez mil intentos por segundo) es lo que ocurre cuando una base bien hasheada se filtra; un ataque contra hashes rápidos o sin sal (miles de millones por segundo en GPU) es el peor caso, y ocurre mucho más a menudo de lo que debería.",
            "El hábito útil es juzgar la contraseña por la peor columna, no por la mejor. Una contraseña que aguanta una semana en la columna de hash rápido sobra para un sitio bien gestionado y es peligrosamente fina para el que filtra y trabaja mal. Como no controlas qué sitios hashean bien, la lectura conservadora es siempre la columna rápida — sobre todo para lo que reutilizas.",
            "Fíjate también en el supuesto del cálculo: que el atacante conoce tu esquema de generación. Es el supuesto correcto — los diccionarios se construyen justo sobre los patrones humanos típicos — así que para contraseñas hechas a mano esos números son un suelo del coste del atacante, no un techo.",
          ],
        },
        {
          heading: "La fuerza no es la seguridad, y la comprobación es local",
          paragraphs: [
            "La verdad incómoda de los análisis de filtraciones: la mayoría de las cuentas comprometidas no implican crackear nada. Implican contraseñas reutilizadas de una filtración anterior, o credenciales entregadas a una página de phishing. Un 4/4 perfecto no protege una contraseña reutilizada entre sitios — ninguna métrica puede. Las defensas realistas son una contraseña única por sitio y un gestor, con la comprobación de fuerza como tercera pata.",
            "La comprobación en sí es segura aquí: la librería y los diccionarios de zxcvbn se cargan en tu navegador y cada cálculo corre en tu equipo. Ninguna petición de red transporta lo que escribes, así que es razonable probar contraseñas reales — aunque teclear cualquier secreto en una máquina que no te fía es un riesgo que ninguna herramienta del navegador elimina.",
          ],
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
      deepDive: [
        {
          heading: "Como o zxcvbn difere dos medidores que contam classes",
          paragraphs: [
            "As barras vermelhas e verdes de sempre contam quantas regras você cumpre: uma maiúscula, um dígito, um símbolo, luz verde. Esse modelo nunca mediu força; mede conformidade com uma norma. O zxcvbn faz algo diferente: decompõe sua entrada no conjunto mais barato de padrões conhecidos — palavras de dicionário, caminhos de teclado como qwerty, repetições, sequências, datas, substituições l33t — e informa quantas tentativas um atacante usando a mesma estratégia precisaria.",
            "É por isso que Tr0ub4dor&3 pontua mal apesar de parecer complexa: as substituições são as primeiras regras que os dicionários aplicam, então o custo real de adivinhá-la é o de adivinhar “troubador” com enfeites. O mesmo motor explica por que quatro palavras comuns aleatórias são muito mais difíceis de quebrar que uma senha curta recheada de símbolos.",
            "Uma coisa que o zxcvbn não é: um veredito sobre se sua senha está num vazamento específico. Ele aproxima isso comparando com listas conhecidas de senhas vazadas, mas a única checagem com autoridade é consultar uma base de dados de vazamentos. Trate a nota como um modelo do custo do atacante, não como um certificado.",
          ],
        },
        {
          heading: "Ler os três cenários de ataque com honestidade",
          paragraphs: [
            "Tempo de quebra não significa nada sem um modelo de ataque. Um ataque online limitado (cerca de cem tentativas por hora) é tudo que um formulário bem-comportado permite; um ataque offline contra um hash lento como bcrypt (unas dez mil tentativas por segundo) é o que acontece quando um banco bem hasheado vaza; um ataque contra hashes rápidos ou sem sal (bilhões por segundo em GPU) é o pior caso, e acontece muito mais vezes do que deveria.",
            "O hábito útil é julgar a senha pela pior coluna, não pela melhor. Uma senha que aguenta uma semana na coluna de hash rápido sobra para um site bem-administrado e é perigosamente fina para o que vaza e trabalha mal. Como você não controla quais sites hasheiam direito, a leitura conservadora é sempre a coluna rápida — sobretudo para o que você reutiliza.",
            "Repare também na premissa do cálculo: que o atacante conhece seu esquema de geração. É a premissa certa — os dicionários são construídos justamente sobre os padrões humanos típicos — então, para senhas feitas à mão, esses números são um piso do custo do atacante, não um teto.",
          ],
        },
        {
          heading: "Força não é segurança, e a checagem é local",
          paragraphs: [
            "A verdade desconfortável das análises de vazamentos: a maioria das contas invadidas não envolve quebrar nada. Envolve senhas reutilizadas de um vazamento anterior, ou credenciais entregues a uma página de phishing. Um 4/4 perfeito não protege uma senha reutilizada entre sites — nenhuma métrica consegue. As defesas realistas são uma senha única por site e um gerenciador, com a checagem de força como terceira perna.",
            "A checagem em si é segura aqui: a biblioteca e os dicionários do zxcvbn carregam no seu navegador e cada cálculo roda no seu aparelho. Nenhuma requisição de rede leva o que você digita, então testar senhas reais é razoável — embora digitar qualquer segredo numa máquina em que você não confia seja um risco que nenhuma ferramenta de navegador elimina.",
          ],
        },
      ],
    },
  },
});
