import { TextFancyEngine } from "../_engines/text-fancy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "fancy-text-generator",
  category: "text",
  icon: "sparkle",
  engine: { component: TextFancyEngine, props: { sample: "Hello, world! 123" } },
  related: ["emoji-picker", "case-converter", "text-cleaner", "word-counter", "text-diff", "text-sorter", "remove-extra-spaces", "remove-duplicate-lines", "lorem-ipsum-generator", "sentence-counter"],
  copy: {
    en: {
      name: "Fancy Text Generator",
      tagline:
        "Turn plain text into 12 Unicode styles — bold, italic, script, double-struck, circled, fullwidth and more — and copy any one with a single click.",
      intro: [
        "Type once and get twelve Unicode variants at once: mathematical bold, italic, bold italic, script, bold script, double-struck, monospace, circled, squared and fullwidth alphabets, plus combining-character strikethrough and underline.",
        "Because these are real Unicode characters — not fonts — the results paste intact into Instagram bios, TikTok captions, Discord nicknames, tweet drafts and chat apps. Characters outside the Latin alphabet, such as Chinese, Japanese or emoji, are passed through untouched so nothing turns into missing-glyph boxes.",
      ],
      steps: [
        "Type or paste your text — a sample is already loaded to play with.",
        "Scroll the live list: every style previews your text instantly.",
        "Hit Copy on the style you like and paste it anywhere that accepts text.",
      ],
      faqs: [
        {
          q: "Why does the text look the same on some websites?",
          a: "Fancy text uses Unicode characters, and a site's font may lack glyphs for some of them (especially script and double-struck). If a style renders oddly somewhere, try bold, circled or fullwidth — they have the broadest font coverage.",
        },
        {
          q: "Can I use it for my Instagram bio or TikTok nickname?",
          a: "Yes. The output is plain Unicode text, so it works in social bios, display names, comments and anywhere else that accepts regular characters.",
        },
        {
          q: "What happens to characters like emoji or 中文?",
          a: "They are left exactly as typed. The generator only maps Latin letters and digits, so emoji, CJK and accented letters pass through unchanged instead of turning into empty boxes.",
        },
      ],
    },
    zh: {
      name: "花体字生成器",
      tagline: "把普通文字转成粗体、斜体、手写体、空心体、圆圈字、全角等 12 种 Unicode 风格,一键复制任一效果。",
      intro: [
        "输入一次,同时得到 12 种 Unicode 变体:数学粗体、斜体、粗斜体、手写体、粗手写体、空心体、等宽、圆圈字母、方框字母、全角,以及用组合附加符实现的删除线和下划线。",
        "这些是真正的 Unicode 字符而不是字体,粘贴到 Instagram 简介、TikTok 文案、Discord 昵称、评论区都能原样显示。中文、emoji 等拉丁字母表之外的字符会原样保留,不会变成豆腐块。",
      ],
      steps: [
        "输入或粘贴文字,页面已预载示例可直接体验。",
        "在实时列表中滚动查看:每种风格即时预览你的文字。",
        "点击喜欢风格旁的复制按钮,粘贴到任何接受文本的地方。",
      ],
      faqs: [
        {
          q: "为什么有些网站上显示不出某些风格?",
          a: "花体字使用 Unicode 字符,部分网站的字体缺少相应字形(手写体和空心体最常见)。某个风格显示异常时,可以换粗体、圆圈或全角——它们的字体覆盖最广。",
        },
        {
          q: "能用在 Instagram 简介或 TikTok 昵称里吗?",
          a: "可以。输出就是普通 Unicode 文本,可用于社交简介、昵称、评论等任何接受常规字符的地方。",
        },
        {
          q: "emoji 和中文字符会怎样处理?",
          a: "原样保留。生成器只映射拉丁字母和数字,emoji、中日韩文字和重音字符不会参与转换,也不会出现空框。",
        },
      ],
    },
    ja: {
      name: "装飾文字ジェネレーター",
      tagline: "太字・斜体・筆記体・白抜き・円囲み・全角など 12 種類の Unicode スタイルに変換し、ワンクリックでコピーできます。",
      intro: [
        "一度入力すれば 12 種類の Unicode 変体を同時に取得:数学的な太字・斜体・太字斜体・筆記体・太字筆記体・白抜き・等幅・円囲み・四角囲み・全角に加え、結合文字による打ち消し線と下線。",
        "フォントではなく本物の Unicode 文字なので、Instagram のプロフィール、TikTok のキャプション、Discord のニックネーム、コメント欄にそのまま貼り付けできます。日本語や絵文字などラテン文字以外はそのまま残り、豆腐(□)にはなりません。",
      ],
      steps: [
        "テキストを入力または貼り付けます。サンプルが既に入力済みです。",
        "ライブリストをスクロールすると、各スタイルが即座にプレビューされます。",
        "好きなスタイルのコピーを押せば、テキストを扱える場所どこでも貼り付けできます。",
      ],
      faqs: [
        {
          q: "一部のサイトで特定スタイルが正しく表示されないのは?",
          a: "装飾文字は Unicode 文字のため、サイト側フォントに該当字形がない場合があります(筆記体と白抜きが多い)。太字・円囲み・全角はフォント対応が広いので代替におすすめです。",
        },
        {
          q: "Instagram の Bio や TikTok の名前に使えますか?",
          a: "使えます。出力は通常の Unicode テキストなので、自己紹介・表示名・コメントなど通常の文字を入力できる場所であれば動作します。",
        },
        {
          q: "絵文字や日本語はどうなりますか?",
          a: "そのまま保持されます。このツールはラテン文字と数字のみをマッピングするため、絵文字・日本語・アクセント付き文字は変換されず、空欄にもなりません。",
        },
      ],
    },
    es: {
      name: "Generador de texto con estilo",
      tagline:
        "Convierte tu texto en 12 estilos Unicode — negrita, cursiva, manuscrita, doble trazo, círculos, ancho completo — y copia cada uno con un clic.",
      intro: [
        "Escribe una vez y obtén doce variantes Unicode a la vez: negrita matemática, cursiva, negrita cursiva, manuscrita, manuscrita negrita, doble trazo, monoespaciada, letras en círculos, en cuadros y ancho completo, además de tachado y subrayado con caracteres combinantes.",
        "Son caracteres Unicode reales, no fuentes: se pegan intactos en biografías de Instagram, descripciones de TikTok, apodos de Discord y apps de chat. Los caracteres fuera del alfabeto latino — chino, japonés, emojis — pasan sin cambios para que no aparezcan huecos.",
      ],
      steps: [
        "Escribe o pega tu texto; hay un ejemplo ya cargado para probar.",
        "Desplázate por la lista en vivo: cada estilo previsualiza tu texto al instante.",
        "Pulsa Copiar en el estilo que quieras y pégalo donde acepte texto.",
      ],
      faqs: [
        {
          q: "¿Por qué algunos estilos no se ven bien en ciertos sitios web?",
          a: "El texto con estilo usa caracteres Unicode y la fuente del sitio puede carecer de glifos (sobre todo manuscrita y doble trazo). Prueba negrita, círculos o ancho completo: tienen la mejor cobertura tipográfica.",
        },
        {
          q: "¿Sirve para la bio de Instagram o el apodo de TikTok?",
          a: "Sí. La salida es texto Unicode normal, así que funciona en bios, nombres visibles, comentarios y cualquier campo que acepte caracteres habituales.",
        },
        {
          q: "¿Qué pasa con los emojis o el chino?",
          a: "Se dejan tal cual. El generador solo mapea letras latinas y dígitos; los emojis, el CJK y los acentos pasan intactos en lugar de convertirse en cuadros vacíos.",
        },
      ],
    },
    pt: {
      name: "Gerador de texto estilizado",
      tagline:
        "Transforme seu texto em 12 estilos Unicode — negrito, itálico, manuscrito, duplo traço, circulado, largura total — e copie cada um com um clique.",
      intro: [
        "Digite uma vez e receba doze variantes Unicode de uma vez: negrito matemático, itálico, negrito itálico, manuscrito, manuscrito negrito, duplo traço, monoespaçado, letras circuladas, quadradas e de largura total, além de tachado e sublinhado com caracteres combinantes.",
        "São caracteres Unicode de verdade, não fontes: colam intactos na bio do Instagram, legendas do TikTok, apelidos do Discord e apps de chat. Caracteres fora do alfabeto latino — chinês, japonês, emojis — passam inalterados para não virar quadradinhos.",
      ],
      steps: [
        "Digite ou cole seu texto — um exemplo já vem carregado para testar.",
        "Role a lista ao vivo: cada estilo mostra seu texto na hora.",
        "Clique em Copiar no estilo preferido e cole onde aceitar texto.",
      ],
      faqs: [
        {
          q: "Por que alguns estilos aparecem errados em certos sites?",
          a: "O texto estilizado usa caracteres Unicode e a fonte do site pode não ter os glifos (principalmente manuscrito e duplo traço). Prefira negrito, circulado ou largura total, que têm a melhor cobertura de fontes.",
        },
        {
          q: "Posso usar na bio do Instagram ou no apelido do TikTok?",
          a: "Sim. A saída é texto Unicode comum, então funciona em bios, nomes de exibição, comentários e qualquer campo que aceite caracteres normais.",
        },
        {
          q: "E os emojis ou caracteres em chinês?",
          a: "Ficam como estão. O gerador mapeia apenas letras latinas e dígitos; emojis, CJK e acentos passam intactos em vez de virar caixas vazias.",
        },
      ],
    },
  },
});
