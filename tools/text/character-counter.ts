import { TextStats } from "../_engines/text-stats";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "character-counter",
  category: "text",
  icon: "hash",
  engine: { component: TextStats, props: { primary: "characters" } },
  related: ["word-counter", "sentence-counter", "case-converter", "text-cleaner"],
  copy: {
    en: {
      name: "Character Counter",
      tagline:
        "Count characters with and without spaces, plus words, sentences, paragraphs and lines as you type — perfect for tweets, titles and meta descriptions.",
      intro: [
        "A character counter built for hard limits: social posts, meta titles, meta descriptions, ad copy, SMS and app fields that count every character. The panel shows characters with spaces and without, so you always know which number the platform cares about.",
        "Counts update as you type, and nothing leaves your browser — paste unpublished drafts, client copy or confidential text without worrying about it being stored or sent anywhere.",
      ],
      steps: [
        "Paste or type your text into the box.",
        "Read the highlighted characters panel first, then the other counts as needed.",
        "Trim your text until you are under the limit — the numbers update live.",
      ],
      faqs: [
        {
          q: "Do spaces and line breaks count as characters?",
          a: "Yes — the main figure counts every character including spaces and line breaks, exactly like most platforms do. The 'No spaces' figure strips whitespace so you can compare.",
        },
        {
          q: "How are emoji counted?",
          a: "Emoji are counted as Unicode code points, so most modern emoji count as one character. Complex sequences built from several code points (skin tones, family emoji) may count as more than one.",
        },
        {
          q: "Which platforms limit by characters?",
          a: "X/Twitter posts, meta titles (around 60) and descriptions (around 160), SMS segments (160) and most ad platforms — always check the specific field you are writing for.",
        },
      ],
    },
    zh: {
      name: "字符计数器",
      tagline: "字符数实时统计:含空格、不含空格、词数、句数一屏看全,适用于微博、标题和 meta 描述。",
      intro: [
        "为硬性字数限制设计的字符统计工具:社交发帖、meta 标题、meta 描述、广告文案、短信和应用输入框,都按字符精确计数。面板同时显示含空格与不含空格两个数字,对应不同平台的计数规则。",
        "边输入边统计,全程在浏览器本地完成——未发布的草稿、客户文案或保密内容都可以放心粘贴,不会被保存或上传。",
      ],
      steps: [
        "把文本粘贴或输入到输入框。",
        "先看高亮的字符数面板,再按需查看其他统计。",
        "边删改边看数字,直到降到限制以内——统计实时更新。",
      ],
      faqs: [
        {
          q: "空格和换行算字符吗?",
          a: "算。主数字统计包括空格和换行在内的所有字符,和多数平台一致;“不含空格”一栏去掉空白,方便对照。",
        },
        {
          q: "emoji 怎么计数?",
          a: "emoji 按 Unicode 码点计数,大多数 emoji 算 1 个字符;由多个码点组成的复杂 emoji(肤色、家庭组合等)可能计为多个。",
        },
        {
          q: "哪些平台按字符限制?",
          a: "X(Twitter)帖子、meta 标题(约 60)、meta 描述(约 160)、短信分段(160)以及多数广告平台——以你要投放的具体字段为准。",
        },
      ],
    },
    ja: {
      name: "文字数カウンター",
      tagline: "文字数(空白あり/なし)をリアルタイム集計。単語数・文数も同時表示。SNS や meta 文字数の確認に。",
      intro: [
        "文字数の上限がある場所のためのカウンター:SNS 投稿、meta タイトル、meta ディスクリプション、広告文、SMS、アプリの入力欄など、1 文字単位で正確に数えます。空白あり・なしの両方を表示するので、プラットフォームごとの数え方に合わせて確認できます。",
        "入力しながら即時集計。処理はすべてブラウザ内で行われ、未公開の下書きや機密性の高いテキストも保存・送信されません。",
      ],
      steps: [
        "テキストを入力欄に入力または貼り付けます。",
        "ハイライトされた文字数パネルを確認し、必要に応じて他の数値も見ます。",
        "上限以内に収まるまで編集します。数値はリアルタイムで更新されます。",
      ],
      faqs: [
        {
          q: "空白や改行も文字数に含まれますか?",
          a: "含まれます。メインの数値は空白・改行を含む全文字数で、多くのプラットフォームと同じ数え方です。「空白なし」の数値は空白を除いた比較用です。",
        },
        {
          q: "絵文字はどう数えますか?",
          a: "絵文字は Unicode のコードポイント単位で数えるため、多くの絵文字は 1 文字です。肌の色や家族の組み合わせなど、複数コードポイントで構成される絵文字は複数として数えられます。",
        },
        {
          q: "文字数制限がある主な場所は?",
          a: "X(Twitter)の投稿、meta タイトル(約 60 文字)、meta ディスクリプション(約 160 文字)、SMS のセグメント(160 文字)、多くの広告プラットフォームなど。入力するフィールドの規定を確認してください。",
        },
      ],
    },
    es: {
      name: "Contador de caracteres",
      tagline:
        "Cuenta caracteres con y sin espacios, además de palabras, frases, párrafos y líneas mientras escribes — ideal para tuits, títulos y metadescripciones.",
      intro: [
        "Un contador pensado para límites estrictos: publicaciones sociales, meta títulos, meta descripciones, anuncios, SMS y campos de apps que cuentan cada carácter. El panel muestra el total con y sin espacios, para que sepas siempre qué cifra mira cada plataforma.",
        "Todo se recalcula mientras escribes y nada sale de tu navegador: pega borradores sin publicar, textos de clientes o contenido confidencial sin preocuparte.",
      ],
      steps: [
        "Pega o escribe tu texto en el cuadro.",
        "Mira primero el panel resaltado de caracteres y después el resto de cifras.",
        "Ajusta el texto hasta quedar por debajo del límite: los números se actualizan al instante.",
      ],
      faqs: [
        {
          q: "¿Los espacios y saltos de línea cuentan como caracteres?",
          a: "Sí: la cifra principal cuenta todos los caracteres, espacios y saltos incluidos, igual que la mayoría de plataformas. La cifra «sin espacios» elimina los blancos para comparar.",
        },
        {
          q: "¿Cómo se cuentan los emojis?",
          a: "Los emojis se cuentan como puntos de código Unicode: la mayoría cuenta como uno. Las secuencias complejas (tonos de piel, familia) pueden contar como más de uno.",
        },
        {
          q: "¿Qué plataformas limitan por caracteres?",
          a: "Las publicaciones de X/Twitter, los meta títulos (~60) y descripciones (~160), los segmentos SMS (160) y casi todas las plataformas publicitarias. Consulta siempre el campo concreto.",
        },
      ],
    },
    pt: {
      name: "Contador de caracteres",
      tagline:
        "Conte caracteres com e sem espaços, além de palavras, frases, parágrafos e linhas enquanto digita — perfeito para tweets, títulos e meta descriptions.",
      intro: [
        "Um contador feito para limites rígidos: posts sociais, meta títulos, meta descriptions, anúncios, SMS e campos de apps que contam cada caractere. O painel mostra o total com e sem espaços, para você saber sempre qual número cada plataforma usa.",
        "Tudo é recalculado enquanto você digita e nada sai do navegador: cole rascunhos não publicados, textos de clientes ou conteúdo confidencial sem preocupação.",
      ],
      steps: [
        "Cole ou digite seu texto na caixa.",
        "Veja primeiro o painel destacado de caracteres e depois as outras contagens.",
        "Ajuste o texto até ficar abaixo do limite — os números atualizam em tempo real.",
      ],
      faqs: [
        {
          q: "Espaços e quebras de linha contam como caracteres?",
          a: "Sim — o número principal conta todos os caracteres, incluindo espaços e quebras, como a maioria das plataformas. O número “sem espaços” remove os brancos para comparação.",
        },
        {
          q: "Como os emojis são contados?",
          a: "Emojis contam como pontos de código Unicode: a maioria vale um caractere. Sequências complexas (tons de pele, emoji de família) podem contar como mais de um.",
        },
        {
          q: "Quais plataformas limitam por caracteres?",
          a: "Posts do X/Twitter, meta títulos (~60) e descrições (~160), segmentos de SMS (160) e quase todas as plataformas de anúncios. Confira sempre o campo específico.",
        },
      ],
    },
  },
});
