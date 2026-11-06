import { SecPasswordGeneratorEngine } from "../_engines/sec-engine-password";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "password-generator",
  category: "security",
  icon: "key",
  featured: true,
  engine: { component: SecPasswordGeneratorEngine },
  related: ["password-strength", "totp-generator", "random-number", "uuid-generator", "whois-lookup", "ip-lookup", "email-validator", "dns-lookup"],
  copy: {
    en: {
      name: "Password Generator",
      tagline:
        "Generate strong passwords and passphrases in your browser with live entropy estimates — crypto-grade randomness, nothing sent or stored.",
      intro: [
        "Weak and reused passwords cause most account takeovers. This generator creates passwords with your browser's cryptographic random number generator (crypto.getRandomValues) — the same source used for encryption keys — so every character is uniformly random and impossible to predict.",
        "Strength is measured in entropy, log2(charset^length): 12 characters over the 86-character set give about 77.1 bits, and the passphrase mode's 273-word list yields 8.1 bits per word — five random words beat most 12-character passwords. The readout shows the real number for your settings instead of a vague strong/weak label.",
        "Generation uses the browser's CSPRNG seeded by the operating system, mapped onto your chosen character sets without bias, and the passphrase list is filtered to short, unambiguous words. Everything runs locally: the password is never transmitted, logged or stored.",
        "Password idea websites that generate strings server-side see every password they produce, and composition rules like one digit plus one symbol push people toward Password1!. Drawing the random bytes in the page keeps the secret on your device — then let a password manager remember it, as NIST SP 800-63B recommends.",
      ],
      steps: [
        "Pick Password for random characters or Passphrase for easy-to-type words.",
        "Adjust the length slider and toggle character sets; exclude look-alike characters if you'll read the password aloud or type it on a phone.",
        "Check the entropy readout — 80 bits or more is excellent for any account.",
        "Click the copy button and paste the result straight into the signup or password-change form.",
      ],
      faqs: [
        {
          q: "What matters more: password length or complexity?",
          a: "Length. Entropy grows with every extra character — roughly log2 of the character-pool size per character. A 16-character random password over a 70-character pool has about 98 bits of entropy, far more than a short password stuffed with every symbol type. A passphrase of 5+ random words also beats most 8-character passwords.",
        },
        {
          q: "Are these passwords truly random?",
          a: "Yes. They come from crypto.getRandomValues, your browser's cryptographically secure random source — not Math.random(). The exclude-ambiguous option only removes look-alike characters like l, I, 1, O and 0; it never weakens the randomness of the rest.",
        },
        {
          q: "Can you recover a password I generated here?",
          a: "No. Generation happens entirely in your browser's memory. Nothing is uploaded, logged or stored — reload the page and the password is gone forever, so save it in a password manager immediately.",
        },
      ],
      deepDive: [
        {
          heading: "Why entropy is the honest measure of strength",
          paragraphs: [
            "Entropy measures the search space an attacker would have to walk, in bits: log2 of the character-set size, times the number of characters. A brute-force attack trying a hundred trillion guesses per second — the capacity of current dedicated cracking hardware — would take centuries to beat 80 bits. That is why the readout here is a real number computed from your settings, not a vague strong/weak label.",
            "The arithmetic also explains why length beats complexity. Each extra character multiplies the search space by the pool size, while swapping an “a” for an “@” inside a short password barely moves the needle. Classic composition rules — one digit, one symbol, one capital — push people toward predictable patterns like Password1!, which attack dictionaries already know by heart. Current NIST guidance (SP 800-63B) dropped those rules in favor of length and genuine randomness.",
            "One honest limitation: entropy measures the randomness of the generation process, not resistance to every attack. A perfect generator does not protect a password reused on another site that suffered a breach, nor a secret typed onto a malware-infected machine. Reuse and phishing — not brute force — account for most account takeovers in practice.",
          ],
        },
        {
          heading: "CSPRNG vs. Math.random, and why it matters",
          paragraphs: [
            "Every password generator is worth exactly as much as its randomness source. Math.random(), JavaScript's everyday utility, is a pseudo-random generator optimized for speed and reproducibility in simulations: observe a few outputs and you can predict the ones that follow. A password built with it looks random and is not — precisely the kind of shortcut that has broken real password-generator sites.",
            "This tool uses crypto.getRandomValues, the browser's cryptographically secure source. It is seeded by the operating system — hardware entropy, interrupt timing, disk timings — and designed so that no observer can predict the next byte even after seeing all previous ones. Those bytes are then mapped uniformly onto your chosen character sets, so no character comes up more often than another: a biased mapping would silently reduce the real entropy below the displayed number.",
            "The same source drives passphrase mode, but instead of bytes it picks indices into a list of 273 short, unambiguous words — about 8.1 bits per word. Five random words give ≈40 bits and a phrase you can actually type; eight or more reach the territory of 16-character passwords. The list is filtered specifically to avoid confusable pairs when dictating or reading aloud.",
          ],
        },
        {
          heading: "What generating in the browser changes in practice",
          paragraphs: [
            "Sites that generate passwords server-side see every password they produce — the secret crosses the network and, whatever the retention policy, exists in a log on someone else's machine. Generating in the browser inverts that: the random bytes are born on your device and the password never leaves it. Reloading the page erases everything; there is no account, history or sync to leak.",
            "The recommended workflow follows from that: generate here, copy, paste straight into the signup or password-change form, and save to a password manager in the same breath. The manager remembers; the generator guarantees the secret was born random and local. Together they cover both failure points — predictable passwords at birth and forgotten passwords at storage.",
          ],
        },
      ],
    },
    zh: {
      name: "密码生成器",
      tagline: "在浏览器中生成高强度随机密码与口令短语,实时显示熵值——加密级随机,不发送、不存储任何数据。",
      intro: [
        "大多数账号被盗都源于弱口令和密码复用。本工具使用浏览器的加密级随机数生成器(crypto.getRandomValues)生成密码——与加密密钥同源,每个字符都均匀随机、无法预测。",
        "可选经典随机密码,或由 273 词表构成的易记口令短语;自由调节长度与字符集,并实时查看以比特为单位的熵值。全程本地运行:密码不会被传输、记录或存储。",
      ],
      steps: [
        "选择“随机密码”(随机字符)或“口令短语”(好打的单词组合)。",
        "拖动长度滑块、勾选字符集;如果需要朗读或在手机上输入,可排除易混淆字符。",
        "查看熵值——达到 80 比特以上,任何账号都足够安全。",
        "点击复制,直接粘贴到注册或改密表单。",
      ],
      faqs: [
        {
          q: "密码长度和复杂度哪个更重要?",
          a: "长度。熵随每个字符增加——约等于按字符池大小取 log2。70 字符池下 16 位随机密码约有 98 比特熵,远高于塞满符号的短密码。5 个以上随机单词组成的口令短语,也胜过大多数 8 位“强符号”密码。",
        },
        {
          q: "生成的密码是真随机吗?",
          a: "是的。密码来自 crypto.getRandomValues——浏览器的加密安全随机源,而不是 Math.random()。“排除易混淆字符”只是去掉 l、I、1、O、0 这类相似字符,不会削弱其余部分的随机性。",
        },
        {
          q: "你们能找回我生成过的密码吗?",
          a: "不能。生成完全发生在浏览器内存中,不上传、不记录、不存储。刷新页面后密码即永久消失,请立即存入密码管理器。",
        },
      ],
      deepDive: [
        {
          heading: "为什么熵是衡量强度的诚实标尺",
          paragraphs: [
            "熵衡量的是攻击者必须穷举的搜索空间,以比特计:字符池大小取 log2,再乘以字符数。即便按每秒试探一百万亿次——当前专用破解硬件的能力——攻击 80 比特也要花上几个世纪。所以这里显示的是根据你的设置实算出来的数字,而不是“强/弱”这种模糊标签。",
            "这笔算术也解释了为什么长度胜过复杂度。每多一个字符,搜索空间就乘上一次字符池大小;而短密码里把 a 换成 @,指针几乎不动。经典的组合规则——必须含数字、符号、大写——把人推向 Password1! 这类可预测模式,攻击字典早就背得滚瓜烂熟。NIST 现行规范(SP 800-63B)已经放弃这套规则,转向长度和真正的随机性。",
            "一个诚实的局限:熵衡量的是生成过程的随机性,不是对所有攻击的抵抗力。再完美的生成器,也救不了在已泄露的其他网站上复用的密码,也救不了在带恶意软件的机器上输入的秘密。实践中攻破账号的主力是复用和钓鱼,不是暴力破解。",
          ],
        },
        {
          heading: "CSPRNG 与 Math.random 的差别为什么重要",
          paragraphs: [
            "密码生成器的价值等于它的随机源的价值。JavaScript 的日常工具 Math.random() 是为仿真场景优化速度和可复现性的伪随机数生成器:观察几段输出就能预测后面的数。用它生成的密码看起来随机,实际不是——真实世界的密码生成网站就栽过这种捷径。",
            "本工具使用浏览器加密安全的随机源 crypto.getRandomValues。它由操作系统播种——硬件熵、中断时机、磁盘计时——设计目标是即使攻击者看遍之前所有输出,也无法预测下一个字节。字节随后均匀映射到你选择的字符集上,保证没有哪个字符出现得比别人多:有偏的映射会悄悄把实际熵拉到显示值以下。",
            "同一随机源也驱动口令短语模式,只是把字节变成 273 个短且无易混字符的单词列表的下标——每词约 8.1 比特。5 个随机单词约 40 比特,还能正常打字输入;8 个以上就进入 16 位密码的强度区间。词表专门过滤过,避免口述或朗读时听错的混淆对。",
          ],
        },
        {
          heading: "在浏览器里生成,实际改变了什么",
          paragraphs: [
            "在服务端生成密码的网站会看到它产出的每一个密码——秘密穿越网络,无论保留策略多么漂亮,它都存在于别人机器上的日志里。在浏览器里生成则把这个顺序倒过来:随机字节在你的设备上诞生,密码从不离开它。刷新页面一切消失;没有账号、历史或同步可以泄露。",
            "由此得到的推荐工作流是:在这里生成,复制,直接粘贴进注册或改密表单,顺手存入密码管理器。管理器负责记住;生成器保证这个秘密诞生时就是随机的、本地的。两者合起来堵住了两个失守点——出生时就可预测,和保存时被遗忘。",
          ],
        },
      ],
    },
    ja: {
      name: "パスワード生成",
      tagline:
        "ブラウザ内で強力なパスワードとパスフレーズを生成。エントロピーをリアルタイム表示し、送信も保存もしません。",
      intro: [
        "アカウント乗っ取りの多くは、弱いパスワードと使い回しが原因です。このツールはブラウザの暗号論的乱数生成器(crypto.getRandomValues)を使い、暗号鍵と同じ品質で文字を生成します。すべての文字が一様にランダムで予測できません。",
        "定番のランダムパスワードか、273 語リストから作る覚えやすいパスフレーズを選べます。長さと文字種を調整しながら、ビット単位のエントロピーをリアルタイムで確認。処理はすべてローカルで、パスワードは送信・記録・保存されません。",
      ],
      steps: [
        "ランダムな文字の「パスワード」か、打ちやすい単語の「パスフレーズ」を選びます。",
        "長さスライダーと文字種を調整します。音読やスマホ入力が多いなら紛らわしい文字を除外しましょう。",
        "エントロピーを確認します。80 ビット以上ならどんなアカウントでも十分です。",
        "コピーボタンでクリップボードに取り込み、登録・変更フォームにそのまま貼り付けます。",
      ],
      faqs: [
        {
          q: "長さと複雑さ、どちらが大切?",
          a: "長さです。エントロピーは 1 文字ごとに約 log2(文字種の数) ビットずつ増えます。70 種の文字プールなら 16 文字で約 98 ビットに達し、記号を多用した短いパスワードを大きく上回ります。ランダムな単語 5 語以上のパスフレーズも、記号だらけの 8 文字より強力です。",
        },
        {
          q: "生成されるパスワードは本当にランダム?",
          a: "はい。Math.random() ではなく、ブラウザの暗号論的に安全な乱数源 crypto.getRandomValues を使っています。「紛らわしい文字を除外」は l・I・1・O・0 を取り除くだけで、残りの文字のランダム性は損なわれません。",
        },
        {
          q: "生成したパスワードを後から復元できますか?",
          a: "できません。生成はブラウザのメモリ内だけで完結し、送信・記録・保存は一切ありません。ページを再読み込みした瞬間に失われますので、すぐパスワード管理ツールに保存してください。",
        },
      ],
      deepDive: [
        {
          heading: "強さの正直な物差しとしてのエントロピー",
          paragraphs: [
            "エントロピーは、攻撃者が辿らなければならない探索空間をビットで測ります。文字種の数の log2 × 文字数です。毎秒100兆通りを試せる——現在の専用解読ハードウェアの能力——攻撃でも、80 ビットを破るには何世紀もかかります。だからこのツールは「強い/弱い」という曖昧なラベルではなく、設定から計算した実数を表示します。",
            "この計算は、長さが複雑さに勝る理由も説明します。文字を1つ増やすたびに探索空間は文字種の数で掛け算されますが、短いパスワード内で「a」を「@」に替えても針はほとんど動きません。数字1つ・記号1つ・大文字1つという古典的な構成規則は、Password1! のような予測可能なパターンへ人々を誘導します。攻撃用辞書はそういうパターンを暗記済みです。NIST の現行指針(SP 800-63B)はこの種の規則を廃し、長さと本物のランダム性を重視する方向に移りました。",
            "正直な限界も一つ。エントロピーは生成プロセスのランダム性を測るのであって、あらゆる攻撃への耐性を測るのではありません。完璧な生成器でも、流出した別サイトで使い回されたパスワードや、マルウェア感染機で入力された秘密は守れません。実務でアカウントを落とすのは総当たりではなく、使い回しとフィッシングです。",
          ],
        },
        {
          heading: "CSPRNG と Math.random の違いが問われる理由",
          paragraphs: [
            "パスワード生成器の価値は、乱数源の価値そのものです。JavaScript の日常道具である Math.random() は、シミュレーション向けに速度と再現性を優先した疑似乱数生成器です。出力をいくつか観察すれば続く値が予測できます。それで作ったパスワードはランダムに見えて、実際は違う。実在するパスワード生成サイトがこの近道で破られた事例があります。",
            "このツールはブラウザの暗号論的に安全な乱数源 crypto.getRandomValues を使います。OS が提供するエントロピー——ハードウェア、割り込み、ディスクのタイミング——で種を播かれ、これまでの全出力を見た観測者にも次の1バイトを予測させないよう設計されています。バイト列は選んだ文字セットに均一に写像され、どの文字も出やすい偏りがありません。偏った写像は、表示値より実際のエントロピーを静かに下げてしまいます。",
            "同じ乱数源がパスフレーズモードも駆動しますが、バイト列の代わりに273語の短く紛らわしくない単語リストのインデックスを選びます。1語あたり約8.1ビット。ランダムな5語で約40ビットと、実際に打てるフレーズが得られ、8語以上なら16文字パスワードの領域に届きます。リストは音読や口述での混同ペアを避けるために絞り込んであります。",
          ],
        },
        {
          heading: "ブラウザ内生成が実際に変えること",
          paragraphs: [
            "サーバー側でパスワードを生成するサイトは、生成したすべてのパスワードを目にします。秘密がネットワークを渡り、保持ポリシーがいくら立派でも、他人のマシンのログに存在します。ブラウザ内生成はこれを逆転させます。ランダムバイトはあなたの端末で生まれ、パスワードは端末の外へ出ません。ページを再読み込みすればすべて消え、漏えいしうるアカウントも履歴も同期もありません。",
            "実務上の推奨フローはこうなります。ここで生成し、コピーして登録・変更フォームに直接貼り付け、その流れでパスワード管理ツールに保存する。管理ツールが覚え、生成器が「秘密はランダムに、ローカルで生まれた」ことを保証する。この組み合わせが、生まれつき予測可能という失敗と、保存で忘れられるという失敗の、両方の弱点を塞ぎます。",
          ],
        },
      ],
    },
    es: {
      name: "Generador de contraseñas",
      tagline:
        "Genera contraseñas y frases contraseña fuertes en tu navegador con entropía en vivo: aleatoriedad criptográfica, nada se envía ni se guarda.",
      intro: [
        "La mayoría de las cuentas comprometidas lo son por contraseñas débiles o reutilizadas. Este generador usa el generador criptográfico del navegador (crypto.getRandomValues) —la misma fuente que las claves de cifrado—, de modo que cada carácter es uniformemente aleatorio e imposible de predecir.",
        "Elige una contraseña aleatoria clásica o una frase contraseña memorable creada con una lista de 273 palabras; ajusta la longitud y los juegos de caracteres y observa la entropía en bits. Todo es local: la contraseña nunca se transmite, registra ni almacena.",
      ],
      steps: [
        "Elige Contraseña para caracteres aleatorios o Frase contraseña para palabras fáciles de escribir.",
        "Ajusta el deslizador de longitud y activa los juegos de caracteres; excluye los parecidos si vas a dictarla o teclearla en el móvil.",
        "Mira la entropía: 80 bits o más es excelente para cualquier cuenta.",
        "Pulsa el botón de copiar y pégala en el formulario de registro o de cambio de contraseña.",
      ],
      faqs: [
        {
          q: "¿Qué importa más, la longitud o la complejidad?",
          a: "La longitud. La entropía crece con cada carácter adicional, más o menos log2 del tamaño del conjunto. Con un conjunto de 70 caracteres, una contraseña de 16 caracteres ronda los 98 bits, muy por encima de una corta llena de símbolos. Una frase de 5 o más palabras al azar supera a casi cualquier contraseña de 8 caracteres con símbolos.",
        },
        {
          q: "¿Son realmente aleatorias?",
          a: "Sí. Provienen de crypto.getRandomValues, la fuente criptográficamente segura del navegador, no de Math.random(). La opción de excluir parecidos solo quita caracteres como l, I, 1, O y 0; no debilita la aleatoriedad del resto.",
        },
        {
          q: "¿Pueden recuperar una contraseña que generé aquí?",
          a: "No. La generación ocurre solo en la memoria de tu navegador. Nada se sube, registra o guarda: al recargar la página la contraseña desaparece para siempre, así que guárdala de inmediato en un gestor de contraseñas.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué la entropía es la medida honesta de la fuerza",
          paragraphs: [
            "La entropía mide el espacio de búsqueda que un atacante tendría que recorrer, en bits: log2 del tamaño del conjunto de caracteres por cada carácter. Un ataque de fuerza bruta que pruebe cien billones de intentos por segundo — capacidad del hardware dedicado actual — tardaría siglos en vencer 80 bits. Por eso aquí se muestra el número real calculado con tus ajustes, no una etiqueta vaga de “fuerte” o “débil”.",
            "La cuenta explica también por qué la longitud vence a la complejidad. Cada carácter extra multiplica el espacio de búsqueda por el tamaño del conjunto, mientras que cambiar una “a” por una “@” en una contraseña corta apenas mueve la aguja. Las reglas clásicas de composición — un dígito, un símbolo, una mayúscula — empujan a la gente hacia patrones predecibles como Password1!, que los diccionarios de ataque ya conocen de memoria. Las recomendaciones actuales del NIST (SP 800-63B) abandonaron esas reglas a favor de longitud y aleatoriedad genuina.",
            "Una limitación honesta: la entropía mide la aleatoriedad del proceso de generación, no la resistencia contra todos los ataques. Un generador perfecto no protege una contraseña reutilizada en otro sitio que sufrió una filtración, ni un secreto tecleado en un equipo con malware. La reutilización y el phishing — no la fuerza bruta — derriban la mayoría de las cuentas en la práctica.",
          ],
        },
        {
          heading: "CSPRNG frente a Math.random, y por qué importa",
          paragraphs: [
            "Todo generador vale lo que vale su fuente de aleatoriedad. Math.random(), el utilitario común de JavaScript, es un generador pseudoaleatorio optimizado para velocidad y reproducibilidad en simulaciones: observando algunas salidas se pueden predecir las siguientes. Una contraseña construida con él parece aleatoria y no lo es — exactamente el tipo de atajo que ya se ha documentado en sitios reales de generación de contraseñas.",
            "Esta herramienta usa crypto.getRandomValues, la fuente criptográficamente segura del navegador. Se alimenta de la entropía del sistema operativo — hardware, interrupciones, temporización de disco — y está diseñada para que ningún observador pueda predecir el siguiente byte aunque vea todos los anteriores. Los bytes se reparten luego uniformemente sobre el conjunto elegido, para que ningún carácter salga más a menudo que otro: un reparto sesgado reduciría en silencio los bits reales por debajo del número mostrado.",
            "La misma fuente alimenta el modo frase contraseña, pero en lugar de bytes produce índices en una lista de 273 palabras cortas y sin caracteres ambiguos — unos 8,1 bits por palabra. Cinco palabras al azar dan ≈40 bits y una frase tecleable; ocho o más alcanzan el territorio de las contraseñas de 16 caracteres. La lista se filtra precisamente para evitar pares confusos al dictar o leer en voz alta.",
          ],
        },
        {
          heading: "Qué cambia generar en el navegador en la práctica",
          paragraphs: [
            "Los sitios que generan contraseñas en el servidor ven cada una que producen — la contraseña cruza la red y, aunque la política de retención sea buena, existe en un registro en otra máquina. Generar en el navegador invierte eso: los bytes aleatorios nacen en tu dispositivo y la contraseña nunca sale de él. Recargar la página lo borra todo; no hay cuenta, historial ni sincronización que filtrar.",
            "En la práctica, el flujo recomendado es: generar aquí, copiar y pegar directamente en el formulario de registro o de cambio de contraseña, y guardarla en el gestor en el mismo gesto. El gestor recuerda; el generador garantiza que el secreto nació aleatorio y local. La combinación cubre los dos puntos de fallo — contraseñas predecibles al nacer y contraseñas olvidadas al guardar.",
          ],
        },
      ],
    },
    pt: {
      name: "Gerador de senhas",
      tagline:
        "Gere senhas e frases-senha fortes no navegador com entropia em tempo real — aleatoriedade criptográfica, nada é enviado ou armazenado.",
      intro: [
        "A maior parte das contas invadidas tem origem em senhas fracas ou reutilizadas. Este gerador usa o gerador criptográfico do navegador (crypto.getRandomValues) — a mesma fonte das chaves de criptografia —, então cada caractere é uniformemente aleatório e impossível de prever.",
        "Escolha uma senha aleatória clássica ou uma frase-senha memorável montada com uma lista de 273 palavras, ajuste o comprimento e os conjuntos de caracteres e acompanhe a entropia em bits. Tudo é local: a senha nunca é transmitida, registrada ou armazenada.",
      ],
      steps: [
        "Escolha Senha para caracteres aleatórios ou Frase-senha para palavras fáceis de digitar.",
        "Ajuste o controle de comprimento e ative os conjuntos de caracteres; exclua os parecidos se for ditá-la ou digitá-la no celular.",
        "Veja a entropia: 80 bits ou mais é excelente para qualquer conta.",
        "Clique em copiar e cole direto no cadastro ou na troca de senha.",
      ],
      faqs: [
        {
          q: "O que pesa mais: comprimento ou complexidade?",
          a: "Comprimento. A entropia cresce a cada caractere extra — cerca de log2 do tamanho do conjunto por caractere. Com um conjunto de 70 caracteres, uma senha de 16 caracteres chega perto de 98 bits, muito acima de uma senha curta cheia de símbolos. Uma frase com 5 ou mais palavras aleatórias vence a maioria das senhas de 8 caracteres com símbolos.",
        },
        {
          q: "Essas senhas são realmente aleatórias?",
          a: "Sim. Elas vêm de crypto.getRandomValues, a fonte criptograficamente segura do navegador — não do Math.random(). A opção de excluir parecidos apenas remove caracteres como l, I, 1, O e 0; não enfraquece a aleatoriedade do resto.",
        },
        {
          q: "Vocês conseguem recuperar uma senha gerada aqui?",
          a: "Não. A geração acontece só na memória do navegador. Nada é enviado, registrado ou armazenado — ao recarregar a página a senha desaparece para sempre, então salve-a imediatamente num gerenciador de senhas.",
        },
      ],
      deepDive: [
        {
          heading: "Por que a entropia é a medida honesta de força",
          paragraphs: [
            "Entropia mede o espaço de busca que um atacante teria de percorrer, em bits: log2 do tamanho do conjunto de caracteres, vezes o número de caracteres. Mesmo um ataque que teste cem trilhões de palpites por segundo — a capacidade do hardware dedicado atual — levaria séculos para vencer 80 bits. Por isso o número exibido aqui é calculado de verdade a partir das suas configurações, e não um rótulo vago de “forte” ou “fraca”.",
            "A conta também explica por que comprimento vence complexidade. Cada caractere extra multiplica o espaço de busca pelo tamanho do conjunto, enquanto trocar um a por um @ dentro de uma senha curta quase não move o ponteiro. As regras clássicas de composição — um dígito, um símbolo, uma maiúscula — empurram as pessoas para padrões previsíveis como Password1!, que os dicionários de ataque conhecem de cor. A orientação atual do NIST (SP 800-63B) abandonou essas regras em favor de comprimento e aleatoriedade genuína.",
            "Uma limitação honesta: a entropia mede a aleatoriedade do processo de geração, não a resistência a todos os ataques. Um gerador perfeito não protege uma senha reutilizada noutro site que sofreu vazamento, nem um segredo digitado num computador infectado. Na prática, o que derruba contas é reuso e phishing — não força bruta.",
          ],
        },
        {
          heading: "CSPRNG versus Math.random, e por que importa",
          paragraphs: [
            "O valor de um gerador de senhas vale o valor da sua fonte de aleatoriedade. Math.random(), o utilitário cotidiano do JavaScript, é um gerador pseudoaleatório otimizado para velocidade e reprodutibilidade em simulações: observando algumas saídas, você prevê as seguintes. Uma senha construída com ele parece aleatória e não é — sites reais de geração de senhas já caíram nesse atalho.",
            "Esta ferramenta usa crypto.getRandomValues, a fonte criptograficamente segura do navegador. Ela é semeada pelo sistema operacional — ruído de hardware, temporização de interrupções e de disco — e desenhada para que nenhum observador preveja o próximo byte, mesmo vendo todos os anteriores. Os bytes são então mapeados uniformemente sobre o conjunto escolhido, para que nenhum caractere apareça mais que outro: um mapeamento enviesado reduziria em silêncio a entropia real abaixo do número exibido.",
            "O modo passphrase usa a mesma fonte, mas em vez de bytes sorteia índices numa lista de 273 palavras curtas e sem ambiguidade — cerca de 8,1 bits por palavra. Cinco palavras aleatórias dão ≈40 bits e uma frase que você consegue digitar; oito ou mais alcançam a faixa de senhas de 16 caracteres. A lista é filtrada justamente para evitar pares confusos ao ditar ou ler em voz alta.",
          ],
        },
        {
          heading: "O que gerar no navegador muda na prática",
          paragraphs: [
            "Sites que geram senhas no servidor veem cada senha que produzem — o segredo cruza a rede e, não importa a política de retenção, existe num log na máquina de outra pessoa. Gerar no navegador inverte isso: os bytes aleatórios nascem no seu dispositivo e a senha nunca sai dele. Recarregar a página apaga tudo; não há conta, histórico nem sincronização para vazar.",
            "O fluxo recomendado decorre daí: gere aqui, copie, cole direto no formulário de cadastro ou de troca de senha e salve no gerenciador de senhas no mesmo gesto. O gerenciador lembra; o gerador garante que o segredo nasceu aleatório e local. Juntos, os dois cobrem os pontos de falha — senha previsível ao nascer e senha esquecida ao guardar.",
          ],
        },
      ],
    },
  },
});
