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
        "Choose a classic random password or a memorable passphrase built from a 256-word list, tune the length and character sets, and watch the entropy readout in bits. Everything runs locally: the password is never transmitted, logged or stored.",
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
    },
    zh: {
      name: "密码生成器",
      tagline: "在浏览器中生成高强度随机密码与口令短语,实时显示熵值——加密级随机,不发送、不存储任何数据。",
      intro: [
        "大多数账号被盗都源于弱口令和密码复用。本工具使用浏览器的加密级随机数生成器(crypto.getRandomValues)生成密码——与加密密钥同源,每个字符都均匀随机、无法预测。",
        "可选经典随机密码,或由 256 词表构成的易记口令短语;自由调节长度与字符集,并实时查看以比特为单位的熵值。全程本地运行:密码不会被传输、记录或存储。",
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
    },
    ja: {
      name: "パスワード生成",
      tagline:
        "ブラウザ内で強力なパスワードとパスフレーズを生成。エントロピーをリアルタイム表示し、送信も保存もしません。",
      intro: [
        "アカウント乗っ取りの多くは、弱いパスワードと使い回しが原因です。このツールはブラウザの暗号論的乱数生成器(crypto.getRandomValues)を使い、暗号鍵と同じ品質で文字を生成します。すべての文字が一様にランダムで予測できません。",
        "定番のランダムパスワードか、256 語リストから作る覚えやすいパスフレーズを選べます。長さと文字種を調整しながら、ビット単位のエントロピーをリアルタイムで確認。処理はすべてローカルで、パスワードは送信・記録・保存されません。",
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
    },
    es: {
      name: "Generador de contraseñas",
      tagline:
        "Genera contraseñas y frases contraseña fuertes en tu navegador con entropía en vivo: aleatoriedad criptográfica, nada se envía ni se guarda.",
      intro: [
        "La mayoría de las cuentas comprometidas lo son por contraseñas débiles o reutilizadas. Este generador usa el generador criptográfico del navegador (crypto.getRandomValues) —la misma fuente que las claves de cifrado—, de modo que cada carácter es uniformemente aleatorio e imposible de predecir.",
        "Elige una contraseña aleatoria clásica o una frase contraseña memorable creada con una lista de 256 palabras; ajusta la longitud y los juegos de caracteres y observa la entropía en bits. Todo es local: la contraseña nunca se transmite, registra ni almacena.",
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
    },
    pt: {
      name: "Gerador de senhas",
      tagline:
        "Gere senhas e frases-senha fortes no navegador com entropia em tempo real — aleatoriedade criptográfica, nada é enviado ou armazenado.",
      intro: [
        "A maior parte das contas invadidas tem origem em senhas fracas ou reutilizadas. Este gerador usa o gerador criptográfico do navegador (crypto.getRandomValues) — a mesma fonte das chaves de criptografia —, então cada caractere é uniformemente aleatório e impossível de prever.",
        "Escolha uma senha aleatória clássica ou uma frase-senha memorável montada com uma lista de 256 palavras, ajuste o comprimento e os conjuntos de caracteres e acompanhe a entropia em bits. Tudo é local: a senha nunca é transmitida, registrada ou armazenada.",
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
    },
  },
});
