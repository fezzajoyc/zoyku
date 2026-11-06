import { TextTransform } from "../_engines/text-tool";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "text-to-nato-alphabet",
  category: "text",
  icon: "globe",
  engine: {
    component: TextTransform,
    props: {
      transform: "text-nato",
      options: [
        { key: 'decode', label: { en: 'Decode NATO words to text', zh: '把 NATO 词解码回文本', ja: 'NATO語をテキストにデコード', es: 'Decodificar palabras OTAN a texto', pt: 'Decodificar palavras OTAN para texto' }, default: false }
      ],
      sample: 'Zoyku 2026'
    },
  },
  related: ["text-to-binary", "case-converter", "reverse-text", "text-sorter", "text-diff", "remove-extra-spaces", "remove-duplicate-lines", "word-counter", "lorem-ipsum-generator", "sentence-counter"],
  copy: {
    en: {
      name: 'NATO Alphabet Converter',
      tagline: 'Spell any text with the NATO phonetic alphabet — Alfa, Bravo, Charlie — and decode spelled words back to text. The standard for clear radio and phone communication.',
      intro: ["The NATO spelling alphabet exists because 'B' and 'D' sound identical over a bad phone line, but 'Bravo' and 'Delta' never do. Type anything and each letter and digit becomes its official ICAO word — the same code pilots, militaries, call centers and support hotlines use worldwide.",
        "Decode mode reverses it: paste 'Zulu Oscar Yankee Kilo Uniform' and get ZOYKU back. Numbers convert too — 2026 becomes Two Zero Two Six — making this handy for reading out serial numbers, order IDs and confirmation codes without repeats.",
        "The map is the 1956 ICAO phonetic alphabet adopted by NATO and used across aviation, maritime and military radio: Alfa with an F not a ph, Juliett with two Ts, Nine not Niner in the current standard. Digits map to their spoken forms — 5 → Five — so an order ID like A42 reads as 'Alfa Four Two' unambiguously.",
        "Compared with improvising words on a call ('B as in... banana?'), the standard words are chosen to be acoustically distinct — no two NATO words rhyme or start with the same sound. Decode mode means the tool works in both directions: you can spell out, and you can reconstruct what a caller spelled to you without asking them to repeat.",
      ],
      steps: ['Type the word, name or code to spell.',
        'Each letter becomes its NATO word: A→Alfa, B→Bravo… digits become Zero through Nine.',
        'Turn on decode mode and paste NATO words to get plain text back.'],
      faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "Why Alfa, Bravo, Charlie exists",
          paragraphs: [
            "Spelling a name over a phone call is a nightmare: B and P sound nearly identical, M and N blur, and a bad line erases the difference between F and S. Spelling alphabets fix this by assigning each letter an unambiguous word — B becomes Bravo, M becomes Mike — chosen so no two words sound alike even over noisy channels.",
            "The NATO alphabet (officially the ICAO spelling alphabet) is the standard that won. It grew out of decades of military and aviation experimentation: earlier British and American alphabets used words like Able, Baker, Charlie, but tests found international radio operators misheard them. The 1950s ICAO revision tested candidate words with speakers of many languages and picked the set — Alfa (deliberately not \"Alpha\", so speakers of languages without the \"ph\" sound write it correctly), Bravo, Charlie through Zulu — that survived those trials.",
            "It now lives far beyond the military: airlines, call centers, IT support reading serial numbers, and anyone giving a confirmation code by voice. When a support agent says \"S as in Sierra\", they are using the same system.",
          ],
        },
        {
          heading: "Digits and tricky letters",
          paragraphs: [
            "The standard also covers digits, spoken to distinguish them from confusable words: 9 becomes \"Niner\" (avoiding confusion with German \"nein\" and the flat-sounding five), 3 is \"Tree\", 5 is \"Fife\". Those pronunciations come from the same intelligibility testing that shaped the letters.",
            "Letters that trip people most in practice: the E/K pair (Echo, Kilo), the M/N pair (Mike, November) and the S/F pair (Sierra, Foxtrot) — precisely the pairs the alphabet was built to separate. Words with multiple common spellings were avoided by design; Alfa's spelling is the clearest example of a word engineered rather than chosen.",
            "When spelling mixed codes — an order number with letters and digits — spell each character separately and keep them in order: \"C-O-D-E-4\" reads Charlie Oscar Delta Echo Fower... Fower is the digit 4. Pauses matter as much as the words; the alphabet does not help if the listener loses the grouping.",
          ],
        },
        {
          heading: "Instant lookup, nothing sent",
          paragraphs: [
            "The conversion runs character by character in your browser as you type — no server call, works offline. Case is ignored (the alphabet has no lowercase), and non-letter characters pass through unchanged so codes keep their shape.",
            "This is the tool to reach for before a support call: paste the serial number, read the output aloud. It also doubles as a teaching aid for radio procedure and for children learning letter names.",
            "Nothing is stored or transmitted — a serial number, license key or order code pasted here stays on your device. The full table ships with the page, so the lookup works with no connection at all.",
          ],
        },
      ],
    },
    zh: {
      name: 'NATO 音标字母转换器',
      tagline: '用 NATO 音标字母表拼写任意文本——Alfa、Bravo、Charlie——也能把拼写词解码回文本。无线电和电话沟通的国际标准。',
      intro: ['NATO 拼读字母表的存在是因为糟糕的电话线路里 B 和 D 听起来一样,但 Bravo 和 Delta 永远不会。输入任意内容,每个字母和数字都会变成官方 ICAO 单词——飞行员、军队、呼叫中心和客服热线全世界用的都是这套。',
        '解码模式反向操作:粘贴 Zulu Oscar Yankee Kilo Uniform,还原成 ZOYKU。数字也能转——2026 变成 Two Zero Two Six——报序列号、订单号、验证码再也不用重复。'],
      steps: ['输入要拼读的单词、姓名或代码。',
        '每个字母变成 NATO 单词:A→Alfa、B→Bravo…数字变成 Zero 到 Nine。',
        '打开解码模式,粘贴 NATO 单词还原成普通文本。'],
      faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "为什么会有 Alfa、Bravo、Charlie",
          paragraphs: [
            "打电话拼人名是场噩梦:B 和 P 听起来几乎一样,M 和 N 含糊不清,线路一差 F 和 S 就没了区别。拼写字母表通过给每个字母指定一个无歧义的词来解决这个问题——B 变成 Bravo,M 变成 Mike——选词标准是即便在嘈杂信道上任何两个词都听起来不同。",
            "北约音标字母(正式名称为 ICAO 拼写字母表)是胜出的标准。它源于几十年的军事与航空实验:更早的英美字母表用 Able、Baker、Charlie 这样的词,但测试发现国际无线电操作员会听错。上世纪 50 年代 ICAO 修订时,用多种语言的说话人测试候选词,选出了这套——Alfa(刻意不写成 “Alpha”,让没有 “ph” 音的语言的使用者也能写对)、Bravo、Charlie 直到 Zulu——经受住考验的词组。",
            "如今它早已走出军营:航空公司、呼叫中心、读序列号的 IT 支持,以及任何口头报确认码的人。客服说 “S as in Sierra” 时,用的就是同一套系统。",
          ],
        },
        {
          heading: "数字与易混字母",
          paragraphs: [
            "标准同样覆盖数字,读法刻意区别于易混词:9 读作 “Niner”(避免与德语 “nein” 及听起来含糊的 5 混淆),3 是 “Tree”,5 是 “Fife”。这些发音来自与字母词相同的清晰度测试。",
            "实践中最容易绊住人的字母对:E/K 对(Echo、Kilo)、M/N 对(Mike、November)、S/F 对(Sierra、Foxtrot)——恰好就是这套字母表要分开的对。有多种常见拼法的词被刻意避开;Alfa 的拼写就是“造出来的词”而非“选出来的词”的最清楚例子。",
            "拼混合码——含字母和数字的订单号——时,逐字符拼写并保持顺序:“C-O-D-E-4” 读作 Charlie Oscar Delta Echo Fower……Fower 就是数字 4。停顿和词本身同样重要;听的人要是丢了分组,字母表也救不回来。",
          ],
        },
        {
          heading: "即时查询,零发送",
          paragraphs: [
            "转换在浏览器里逐字符进行,随输入即出——没有服务器请求,离线可用。大小写不敏感(字母表没有小写概念),非字母字符原样通过,验证码保持原状。",
            "打客服电话前就该用它:粘贴序列号,照着输出念。它也适合当无线电通话规范的教具,以及孩子学字母名的辅助。",
            "不存储、不发送——粘进来的序列号、许可密钥或订单码留在你的设备上。完整对照表随页面自带,完全断网也能查。",
          ],
        },
      ],
    },
    ja: {
      name: 'NATOフォネティック変換',
      tagline: '任意のテキストを NATO 音声字母でスペル — Alfa・Bravo・Charlie — 逆にスペルワードからテキストへも復元。無線・電話の国際標準。',
      intro: ['NATO スペリング alphabet があるのは、悪い電話回線では B と D が同じに聞こえるから。でも Bravo と Delta は決して混同されません。入力した文字と数字が公式 ICAO ワードになります — パイロット・軍・コールセンター・サポート窓口が世界中で使うものです。',
        'デコードモードは逆変換:Zulu Oscar Yankee Kilo Uniform を貼れば ZOYKU に戻ります。数字も変換 — 2026 は Two Zero Two Six に — シリアル番号や注文 ID、確認コードを繰り返しなしで伝えられます。'],
      steps: ['スペルしたい単語・名前・コードを入力。',
        '各文字が NATO ワードに:A→Alfa、B→Bravo…数字は Zero〜Nine に。',
        'デコードモードを有効にし、NATO ワードを貼って平文に戻します。'],
      faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "なぜ Alfa、Bravo、Charlie なのか",
          paragraphs: [
            "電話で名前を綴るのは悪夢です。B と P はほぼ同じに聞こえ、M と N はぼやけ、回線が悪いと F と S の差が消えます。スペル alphabet は各字母に曖昧さのない語を割り当てることでこれを解決します。B は Bravo、M は Mike になり、選定基準は騒がしい回線でもどの 2 語も似て聞こえないことです。",
            "NATO アルファベット(正式には ICAO スペル alphabet)は勝ち残った標準です。数十年の軍事・航空の実験から育ち、より古い英米のアルファベットは Able、Baker、Charlie を使いましたが、テストでは国際的な無線操作員が聞き間違えました。1950 年代の ICAO 改訂では多言語の話者で候補語を試し、「ph」音のない言語の話者でも正しく書けるよう意図的に Alpha ではなく Alfa とした語を含む現行の組——Bravo、Charlie から Zulu まで——が選ばれました。",
            "今では軍の外にも広がっています。航空会社、コールセンター、シリアル番号を読み上げる IT サポート、音声で確認コードを伝えるあらゆる人。サポート担当が「S as in Sierra」と言うとき、同じ体系を使っています。",
          ],
        },
        {
          heading: "数字と紛らわしい字母",
          paragraphs: [
            "標準は数字も覆います。紛らわしい語と区別するための読み方で、9 は「Niner」(ドイツ語の「nein」と、平板に聞こえる 5 との混同を避ける)、3 は「Tree」、5 は「Fife」です。これらの発音は字母を形づくった同じ明瞭度テストに由来します。",
            "実務で最もつまずく字母の組は、E/K の対(Echo、Kilo)、M/N の対(Mike、November)、S/F の対(Sierra、Foxtrot)——まさに alphabet が分離するために作られた組です。複数の綴りが一般的な語は設計上避けられました。Alfa の綴りは、選ばれたのではなく設計された語の最も明快な例です。",
            "英数字混在のコードを綴るときは、1 文字ずつ順序を保って読みます。「C-O-D-E-4」は Charlie Oscar Delta Echo Fower……Fower が数字の 4 です。区切りは語そのものと同じくらい重要で、聞き手がまとまりを失えば alphabet も助けになりません。",
          ],
        },
        {
          heading: "即時参照、送信なし",
          paragraphs: [
            "変換は入力に合わせてブラウザ内で文字単位に進みます。サーバー呼び出しはなく、オフラインで動きます。大文字小文字は無視され(alphabet に小文字はありません)、字母以外の文字はそのまま通るためコードの形は保たれます。",
            "サポートへの電話の前に使う道具です。シリアル番号を貼り、出力を音読する。無線の手順の教材や、字母名を学ぶ子どもの補助にもなります。",
            "保存も送信もありません。貼り付けたシリアル番号、ライセンスキー、注文コードは端末にとどまります。完全な表はページに同梱され、接続なしで参照できます。",
          ],
        },
      ],
    },
    es: {
      name: 'Convertidor alfabeto OTAN',
      tagline: 'Deletra cualquier texto con el alfabeto fonético OTAN — Alfa, Bravo, Charlie — y decodifica las palabras de vuelta a texto. El estándar para radio y teléfono claros.',
      intro: ["El alfabeto de deletreo OTAN existe porque 'B' y 'D' suenan igual por una mala línea telefónica, pero 'Bravo' y 'Delta' nunca. Escribe cualquier cosa y cada letra y dígito se convierte en su palabra oficial ICAO — el mismo código que usan pilotos, militares, call centers y líneas de soporte en todo el mundo.",
        "El modo decodificar lo invierte: pega 'Zulu Oscar Yankee Kilo Uniform' y obtienes ZOYKU. Los números también — 2026 se convierte en Two Zero Two Six — perfecto para dictar números de serie, pedidos y códigos de confirmación sin repeticiones."],
      steps: ['Escribe la palabra, nombre o código a deletrear.',
        'Cada letra se vuelve su palabra OTAN: A→Alfa, B→Bravo… los dígitos van de Zero a Nine.',
        'Activa el modo decodificar y pega palabras OTAN para recuperar texto plano.'],
      faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "Por qué existe Alfa, Bravo, Charlie",
          paragraphs: [
            "Deletrear un nombre por teléfono es una pesadilla: la B y la P suenan casi igual, la M y la N se difuminan, y una línea mala borra la diferencia entre la F y la S. Los alfabetos de deletreo lo arreglan asignando a cada letra una palabra inequívoca — B pasa a Bravo, M pasa a Mike — elegidas para que ninguna dos palabras suenen parecidas ni siquiera en canales ruidosos.",
            "El alfabeto OTAN (oficialmente el alfabeto fonético de la OACI) es el estándar que ganó. Creció de décadas de experimentación militar y aeronáutica: alfabetos británicos y estadounidenses anteriores usaban palabras como Able, Baker, Charlie, pero las pruebas encontraron que los operadores internacionales de radio las confundían. La revisión de la OACI de los años 50 probó palabras candidatas con hablantes de muchos idiomas y eligió el conjunto — Alfa (deliberadamente no \"Alpha\", para que hablantes de idiomas sin el sonido \"ph\" lo escriban bien), Bravo, Charlie hasta Zulu — que sobrevivió a esas pruebas.",
            "Hoy vive lejos del ejército: aerolíneas, centros de llamadas, soporte TI leyendo números de serie, y cualquiera que dé un código de confirmación por voz. Cuando un agente dice \"S de Sierra\", usa el mismo sistema.",
          ],
        },
        {
          heading: "Dígitos y letras traicioneras",
          paragraphs: [
            "El estándar también cubre dígitos, pronunciados para distinguirlos de palabras confundibles: el 9 pasa a \"Niner\" (evitando la confusión con el alemán \"nein\" y el cinco de sonido plano), el 3 es \"Tree\", el 5 es \"Fife\". Esas pronunciaciones vienen de las mismas pruebas de inteligibilidad que moldearon las letras.",
            "Las letras que más tropiezan en la práctica: el par E/K (Echo, Kilo), el par M/N (Mike, November) y el par S/F (Sierra, Foxtrot) — justo los pares que el alfabeto fue construido para separar. Las palabras con varias grafías comunes se evitaron a propósito; la grafía de Alfa es el ejemplo más claro de palabra diseñada y no elegida.",
            "Al deletrear códigos mixtos — un pedido con letras y dígitos — se deletrea cada carácter por separado y en orden: \"C-O-D-E-4\" se lee Charlie Oscar Delta Echo Fower... Fower es el dígito 4. Las pausas importan tanto como las palabras; el alfabeto no ayuda si quien escucha pierde la agrupación.",
          ],
        },
        {
          heading: "Consulta instantánea, nada enviado",
          paragraphs: [
            "La conversión corre carácter a carácter en tu navegador mientras escribes — sin llamada al servidor, funciona sin conexión. Las mayúsculas se ignoran (el alfabeto no tiene minúsculas) y los caracteres que no son letras pasan sin cambios, así que los códigos conservan su forma.",
            "Es la herramienta para usar antes de una llamada a soporte: pega el número de serie y lee la salida en voz alta. También sirve como material didáctico para procedimiento de radio y para niños aprendiendo los nombres de las letras.",
            "Nada se guarda ni transmite — un número de serie, una clave de licencia o un código de pedido pegados aquí se quedan en tu dispositivo. La tabla completa viaja con la página, así que la consulta funciona sin conexión alguna.",
          ],
        },
      ],
    },
    pt: {
      name: 'Conversor alfabeto OTAN',
      tagline: 'Soletre qualquer texto com o alfabeto fonético OTAN — Alfa, Bravo, Charlie — e decodifique as palavras de volta para texto. O padrão para rádio e telefone claros.',
      intro: ["O alfabeto de soletração OTAN existe porque 'B' e 'D' soam iguais numa linha telefônica ruim, mas 'Bravo' e 'Delta' nunca. Digite qualquer coisa e cada letra e dígito vira sua palavra oficial ICAO — o mesmo código que pilotos, militares, call centers e centrais de suporte usam no mundo todo.",
        "O modo decodificar inverte: cole 'Zulu Oscar Yankee Kilo Uniform' e receba ZOYKU de volta. Os números também — 2026 vira Two Zero Two Six — perfeito para ditar números de série, pedidos e códigos de confirmação sem repetições."],
      steps: ['Digite a palavra, nome ou código para soletrar.',
        'Cada letra vira sua palavra OTAN: A→Alfa, B→Bravo… os dígitos vão de Zero a Nine.',
        'Ative o modo decodificar e cole palavras OTAN para recuperar texto simples.'],
      faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "Por que existe Alfa, Bravo, Charlie",
          paragraphs: [
            "Soletrar um nome ao telefone é um pesadelo: o B e o P soam quase iguais, o M e o N se embaralham, e uma linha ruim apaga a diferença entre o F e o S. Alfabetos de soletração consertam isso atribuindo a cada letra uma palavra inequívoca — B vira Bravo, M vira Mike — escolhidas para que nenhuma duas palavras soem parecidas mesmo em canais ruidosos.",
            "O alfabeto da OTAN (oficialmente o alfabeto de soletração da ICAO) é o padrão que venceu. Cresceu de décadas de experimentação militar e aeronáutica: alfabetos britânicos e americanos anteriores usavam palavras como Able, Baker, Charlie, mas testes mostraram que operadores internacionais de rádio as ouviam errado. A revisão da ICAO nos anos 50 testou palavras candidatas com falantes de muitos idiomas e escolheu o conjunto — Alfa (deliberadamente não \"Alpha\", para que falantes de idiomas sem o som \"ph\" o escrevam certo), Bravo, Charlie até Zulu — que sobreviveu a esses testes.",
            "Hoje vive longe dos militares: companhias aéreas, centrais de atendimento, suporte de TI lendo números de série, e qualquer um que dê um código de confirmação por voz. Quando um atendente diz \"S de Sierra\", usa o mesmo sistema.",
          ],
        },
        {
          heading: "Dígitos e letras traiçoeiras",
          paragraphs: [
            "O padrão também cobre dígitos, pronunciados para se distinguir de palavras confundíveis: o 9 vira \"Niner\" (evitando confusão com o alemão \"nein\" e o cinco de som plano), o 3 é \"Tree\", o 5 é \"Fife\". Essas pronúncias vêm dos mesmos testes de inteligibilidade que moldaram as letras.",
            "As letras em que as pessoas mais tropeçam na prática: o par E/K (Echo, Kilo), o par M/N (Mike, November) e o par S/F (Sierra, Foxtrot) — justamente os pares que o alfabeto foi construído para separar. Palavras com várias grafias comuns foram evitadas de propósito; a grafia de Alfa é o exemplo mais claro de palavra projetada, não escolhida.",
            "Ao soletrar códigos mistos — um pedido com letras e dígitos — soletre cada caractere separadamente e em ordem: \"C-O-D-E-4\" se lê Charlie Oscar Delta Echo Fower... Fower é o dígito 4. As pausas importam tanto quanto as palavras; o alfabeto não ajuda se quem ouve perde a agrupação.",
          ],
        },
        {
          heading: "Consulta instantânea, nada enviado",
          paragraphs: [
            "A conversão roda caractere por caractere no seu navegador enquanto você digita — sem chamada ao servidor, funciona offline. Maiúsculas são ignoradas (o alfabeto não tem minúsculas) e caracteres que não são letras passam sem mudança, então os códigos mantêm a forma.",
            "É a ferramenta para usar antes de uma ligação ao suporte: cole o número de série e leia a saída em voz alta. Também serve como material didático para procedimento de rádio e para crianças aprendendo os nomes das letras.",
            "Nada é guardado nem transmitido — um número de série, chave de licença ou código de pedido colados aqui ficam no seu dispositivo. A tabela completa viaja com a página, então a consulta funciona sem conexão alguma.",
          ],
        },
      ],
    },
  },
});
