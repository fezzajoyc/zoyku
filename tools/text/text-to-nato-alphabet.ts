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
    },
  },
});
