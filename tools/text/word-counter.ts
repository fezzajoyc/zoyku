import { TextStats } from "../_engines/text-stats";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "word-counter",
  category: "text",
  icon: "text",
  featured: true,
  engine: { component: TextStats, props: { primary: "words" } },
  related: ["character-counter", "sentence-counter", "case-converter", "text-cleaner", "text-diff", "text-sorter", "remove-extra-spaces", "remove-duplicate-lines", "lorem-ipsum-generator", "text-to-binary"],
  copy: {
    en: {
      name: "Word Counter",
      tagline: "Count words, characters, sentences and reading time live as you type — CJK text handled correctly.",
      intro: [
        "A real-time word counter for essays, posts, SEO copy and translations. It shows words, characters with and without spaces, sentences, paragraphs, lines and estimated reading time in one grid.",
        "Mixed-language text is counted properly: English-style words are tokenized by whitespace while Chinese, Japanese and Korean characters are counted individually, which matches how word limits actually work in those languages.",
      ],
      steps: [
        "Paste or write your text in the box — statistics update instantly.",
        "Check the highlighted panel for the count you care about.",
        "Keep editing; nothing is saved or uploaded, so it is safe for unpublished drafts.",
      ],
      faqs: [
        {
          q: "How are words counted in Chinese or Japanese text?",
          a: "CJK characters are counted as individual characters and added to the word count, since those languages do not separate words with spaces. A 500-character Chinese passage reports roughly 500 'words'.",
        },
        {
          q: "How is reading time estimated?",
          a: "At about 220 words per minute for Latin-script text (CJK weighted by character count), rounded up to the nearest minute.",
        },
        {
          q: "Is there a length limit?",
          a: "No hard limit — the counter is limited only by your browser's memory, which comfortably handles book-length text.",
        },
      ],
    },
    zh: {
      name: "字数统计",
      tagline: "词数、字符数、句数、阅读时长实时统计,中英日韩混排也能正确计数。",
      intro: [
        "为论文、帖子、SEO 文案和翻译稿设计的实时字数统计:词数、含/不含空格字符数、句数、段落数、行数、预计阅读时长,一屏看全。",
        "混排文本按真实规则计数:英文按空白分词,中日韩字符逐字计入——这与各语言平台字数限制的实际算法一致。",
      ],
      steps: [
        "把文本粘贴或输入到输入框,统计即时更新。",
        "看高亮面板里你关心的那个数字。",
        "继续编辑;内容不保存不上传,未发布的草稿也可以放心统计。",
      ],
      faqs: [
        {
          q: "中文或日文怎么计字数?",
          a: "中日韩字符按逐字计入词数,因为这些语言不用空格分词。500 字的中文段落会显示约 500 词。",
        },
        {
          q: "阅读时长怎么估算的?",
          a: "按每分钟约 220 词估算(中日韩按字符数加权),不足一分钟按一分钟计。",
        },
        {
          q: "有字数上限吗?",
          a: "没有人为上限——只受浏览器内存限制,整本书的文本也能算。",
        },
      ],
    },
    ja: {
      name: "単語カウンター",
      tagline: "単語数・文字数・文数・読了時間を入力しながらリアルタイム集計。日英混在文も正確。",
      intro: [
        "レポート、投稿、SEO 文章、翻訳向けのリアルタイム カウンター:単語数、空白あり/なしの文字数、文数、段落数、行数、推定読了時間を一画面で表示します。",
        "混在テキストも正しく集計:ラテン文字は空白で分かち書きし、中国語・日本語・韓国語の文字は 1 文字ずつ数えます。各言語の文字数制限の実態に合わせた数え方です。",
      ],
      steps: [
        "テキストを入力または貼り付けると、集計が即時更新されます。",
        "注目している数値はハイライトされたパネルで確認できます。",
        "そのまま編集を続けられます。保存も送信もないので、未公開の下書きでも安心です。",
      ],
      faqs: [
        {
          q: "中国語や日本語の文字数はどう数えますか?",
          a: "CJK の文字は 1 文字ずつ数えて単語数に加算します(これらの言語は空白で分かち書きしないため)。500 文字の中国語文は約 500 語と表示されます。",
        },
        {
          q: "読了時間はどう計算していますか?",
          a: "ラテン文字は毎分約 220 語(CJK は文字数で加重)を基準に、切り上げて 1 分単位で表示します。",
        },
        {
          q: "文字数の上限はありますか?",
          a: "上限はありません。ブラウザのメモリが許す限り、書籍一冊分でも数えられます。",
        },
      ],
    },
    es: {
      name: "Contador de palabras",
      tagline: "Cuenta palabras, caracteres, frases y tiempo de lectura en vivo, incluso con texto CJK.",
      intro: [
        "Un contador en tiempo real para ensayos, posts, copy SEO y traducciones: palabras, caracteres con y sin espacios, frases, párrafos, líneas y tiempo de lectura estimado en una sola cuadrícula.",
        "El texto mixto se cuenta bien: las palabras en alfabeto latino se separan por espacios y los caracteres chinos, japoneses y coreanos se cuentan uno a uno, como funcionan de verdad los límites de caracteres en esos idiomas.",
      ],
      steps: [
        "Pega o escribe tu texto: las estadísticas se actualizan al instante.",
        "Mira el panel resaltado para la cifra que te interesa.",
        "Sigue editando; no se guarda ni se envía nada, así que es seguro con borradores sin publicar.",
      ],
      faqs: [
        {
          q: "¿Cómo se cuentan las palabras en chino o japonés?",
          a: "Los caracteres CJK se cuentan uno a uno y se suman al total, porque esos idiomas no separan palabras con espacios. Un pasaje chino de 500 caracteres reporta unas 500 «palabras».",
        },
        {
          q: "¿Cómo se estima el tiempo de lectura?",
          a: "A unas 220 palabras por minuto para texto latino (el CJK ponderado por caracteres), redondeado hacia arriba al minuto.",
        },
        {
          q: "¿Hay límite de longitud?",
          a: "Sin límite fijo: solo limita la memoria del navegador, que maneja sin problema textos de tamaño libro.",
        },
      ],
    },
    pt: {
      name: "Contador de palavras",
      tagline: "Conte palavras, caracteres, frases e tempo de leitura ao vivo, inclusive texto CJK.",
      intro: [
        "Um contador em tempo real para redações, posts, copy de SEO e traduções: palavras, caracteres com e sem espaços, frases, parágrafos, linhas e tempo de leitura estimado numa grade só.",
        "Texto misto é contado direito: palavras em alfabeto latino são separadas por espaços e caracteres chinês, japonês e coreano contados um a um — como os limites de caracteres funcionam de verdade nesses idiomas.",
      ],
      steps: [
        "Cole ou escreva seu texto: as estatísticas atualizam na hora.",
        "Veja o painel destacado para a contagem que interessa.",
        "Continue editando; nada é salvo ou enviado, então é seguro para rascunhos não publicados.",
      ],
      faqs: [
        {
          q: "Como as palavras são contadas em chinês ou japonês?",
          a: "Caracteres CJK são contados individualmente e somados ao total, porque esses idiomas não separam palavras com espaços. Um texto chinês de 500 caracteres aparece com ~500 “palavras”.",
        },
        {
          q: "Como o tempo de leitura é estimado?",
          a: "A cerca de 220 palavras por minuto para texto latino (CJK ponderado por caracteres), arredondado para cima até o minuto.",
        },
        {
          q: "Existe limite de tamanho?",
          a: "Sem limite fixo — vale a memória do navegador, que aguenta textos do tamanho de um livro.",
        },
      ],
    },
  },
});
