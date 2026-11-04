import { SeoDensityEngine } from "../_engines/seo-engine-density";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "keyword-density-checker",
  category: "seo",
  icon: "calc",
  engine: { component: SeoDensityEngine },
  related: ["serp-preview", "schema-markup-generator", "meta-tag-generator", "utm-builder", "open-graph-generator", "sitemap-generator", "hreflang-generator", "canonical-tag-generator", "robots-txt-generator"],
  copy: {
    en: {
      name: "Keyword Density Checker",
      tagline:
        "Count 1–3 word keyword phrases and their density, with built-in stopword lists for English, Chinese, Japanese, Spanish and Portuguese.",
      intro: [
        "Keyword density is the share of times a phrase appears among all words on the page. This checker tokenizes your text, strips stopwords per language and reports counts and density for one, two and three word phrases — live, as you paste or edit.",
        "The denominator matters: counts are computed over real words after stopword removal, so the and of do not bury your topic. One-, two- and three-word phrases are reported separately, because the useful metric for best running shoes is the trigram, not the bare word shoes.",
        "Tokenization lowercases, strips punctuation and splits on whitespace, then n-grams are counted over the cleaned sequence with stopword removal applied first. Counts and percentages update as you type, and toggling stopwords lets you compare the raw distribution against the content-word view.",
        "The old 2% keyword density rule is SEO folklore — modern ranking evaluates topic coverage and natural language, and stuffing past natural levels reads as spam. Use the numbers to catch the opposite failure, a page that never names its target phrase, rather than to chase a magic percentage.",
      ],
      steps: [
        "Paste the page copy or a draft into the input box.",
        "Pick the content language and whether to exclude stopwords.",
        "Read counts and density for 1–3 word phrases, or search to check a specific term.",
      ],
      faqs: [
        {
          q: "What keyword density should I aim for?",
          a: "There is no target. Modern ranking systems use embeddings and topic models, not density thresholds. If the top phrases reflect the page's topic in natural language — roughly 1–2% for the main term — you are fine.",
        },
        {
          q: "Are stopwords removed before counting?",
          a: "Only if you enable it. Removing them turns 'hotel in london' into 'hotel london' as a bigram, which is often how people actually search. Compare both views before deciding.",
        },
        {
          q: "How are Chinese and Japanese counted?",
          a: "Without a real segmenter, CJK text is counted per character for single tokens and per character pair for two-word phrases — a good approximation for spotting overused terms, not a linguistic analysis.",
        },
      ],
    },
    zh: {
      name: "关键词密度检查",
      tagline: "统计 1–3 词关键词短语的出现次数与密度,内置中、英、日、西、葡五语停用词表,粘贴即算。",
      intro: [
        "关键词密度指某个短语在页面全部词语中出现的占比。这个工具会对文本分词、按语言剔除停用词,然后给出 1 词、2 词、3 词短语的次数和密度——粘贴或编辑时实时更新。",
        "用它确认页面确实在说你想要排名的内容,而不是去追求某个神奇比例。自然通顺又覆盖主题的文案,胜过任何固定数值。",
      ],
      steps: [
        "把页面文案或草稿粘贴到输入框。",
        "选择内容语言,并决定是否剔除停用词。",
        "查看 1–3 词短语的次数和密度,或搜索特定词验证。",
      ],
      faqs: [
        {
          q: "关键词密度多少才合适?",
          a: "没有目标值。现代排名系统用的是向量和主题模型,不是密度阈值。只要高频短语能用自然语言反映页面主题——主词大约 1%–2%——就没什么问题。",
        },
        {
          q: "统计前会剔除停用词吗?",
          a: "只有勾选后才会。剔除后「hotel in london」会变成二元短语「hotel london」——这往往才是用户真实的搜索方式。两种视图都看一遍再做判断。",
        },
        {
          q: "中文和日文是怎么统计的?",
          a: "在没有真正分词器的情况下,中日文按单字统计一词短语、按相邻两字统计二字短语——适合发现被过度使用的词,但不是语言学层面的分析。",
        },
      ],
    },
    ja: {
      name: "キーワード密度チェッカー",
      tagline: "1〜3 語のキーワードフレーズの出現回数と密度を集計。英語・中国語・日本語・スペイン語・ポルトガル語のストップワード内蔵で即時計算。",
      intro: [
        "キーワード密度とは、ページ全体の語のうちあるフレーズが占める割合です。このチェッカーはテキストをトークン化し、言語ごとにストップワードを除去して、1〜3 語フレーズの回数と密度をリアルタイムで表示します。",
        "狙いたい順位のページが本当にその話をしているかの確認に使い、魔法のパーセンテージを追わないでください。主題をカバーしながら自然に読める文章は、どんな固定比率より強力です。",
      ],
      steps: [
        "ページの文章または下書きを入力欄に貼り付けます。",
        "コンテンツの言語と、ストップワードを除外するかを選びます。",
        "1〜3 語フレーズの回数と密度を確認するか、特定の語を検索して調べます。",
      ],
      faqs: [
        {
          q: "キーワード密度はどのくらいが適切?",
          a: "目標値はありません。現代のランキングシステムは密度の閾値ではなく埋め込みやトピックモデルを使います。上位フレーズが自然な言葉でページの主題を示していれば(主要語でおよそ 1〜2%)問題ありません。",
        },
        {
          q: "ストップワードは除外して数える?",
          a: "有効にした場合のみです。除外すると「hotel in london」が 2 語フレーズの「hotel london」になり、多くの場合こちらが実際の検索の仕方に近い内容になります。両方の見え方を比べて判断してください。",
        },
        {
          q: "中国語と日本語はどう数える?",
          a: "本格的な分かち書き器がないため、CJK テキストは 1 語を 1 文字、2 語を隣接 2 文字として数えます。過剰に使われた語の検出には十分な近似ですが、言語学的な分析ではありません。",
        },
      ],
    },
    es: {
      name: "Analizador de densidad de palabras clave",
      tagline:
        "Cuenta frases clave de 1 a 3 palabras y su densidad, con listas de palabras vacías en inglés, chino, japonés, español y portugués.",
      intro: [
        "La densidad de palabras clave es la proporción que una frase ocupa entre todas las palabras de la página. Este analizador tokeniza el texto, elimina palabras vacías según el idioma y muestra recuentos y densidad para frases de una, dos y tres palabras, en vivo mientras pegas o editas.",
        "Úsalo para confirmar que la página dice lo que quieres posicionar, no para perseguir un porcentaje mágico. Un texto natural que cubre el tema vence a cualquier cifra fija.",
      ],
      steps: [
        "Pega el texto de la página o un borrador en el cuadro de entrada.",
        "Elige el idioma del contenido y si excluir palabras vacías.",
        "Lee recuentos y densidad de frases de 1 a 3 palabras, o busca un término concreto.",
      ],
      faqs: [
        {
          q: "¿Qué densidad de palabra clave conviene?",
          a: "Ninguna en concreto. Los sistemas de ranking modernos usan embeddings y modelos de tema, no umbrales de densidad. Si las frases principales reflejan el tema con lenguaje natural —un 1–2 % para el término principal— vas bien.",
        },
        {
          q: "¿Se eliminan las palabras vacías antes de contar?",
          a: "Solo si lo activas. Al quitarlas, 'hotel en londres' pasa a ser el bigrama 'hotel londres', que suele parecerse más a cómo se busca de verdad. Compara ambas vistas antes de decidir.",
        },
        {
          q: "¿Cómo se cuentan chino y japonés?",
          a: "Sin un segmentador real, el texto CJK se cuenta por carácter para términos simples y por pares de caracteres para frases de dos: una buena aproximación para detectar términos sobreutilizados, no un análisis lingüístico.",
        },
      ],
    },
    pt: {
      name: "Verificador de densidade de palavras-chave",
      tagline:
        "Conte frases-chave de 1 a 3 palavras e sua densidade, com listas de stopwords em inglês, chinês, japonês, espanhol e português.",
      intro: [
        "Densidade de palavras-chave é a fatia que uma frase ocupa entre todas as palavras da página. Este verificador tokeniza o texto, remove stopwords por idioma e mostra contagens e densidade para frases de uma, duas e três palavras — em tempo real, enquanto você cola ou edita.",
        "Use para confirmar que a página realmente fala o que você quer ranquear, não para perseguir uma porcentagem mágica. Um texto natural que cobre o tema vence qualquer número fixo.",
      ],
      steps: [
        "Cole o texto da página ou um rascunho na caixa de entrada.",
        "Escolha o idioma do conteúdo e se quer excluir stopwords.",
        "Leia contagens e densidade das frases de 1 a 3 palavras, ou busque um termo específico.",
      ],
      faqs: [
        {
          q: "Qual densidade de palavra-chave mirar?",
          a: "Nenhuma em particular. Sistemas de ranking modernos usam embeddings e modelos de tópico, não limiares de densidade. Se as frases principais refletem o tema em linguagem natural — cerca de 1–2% para o termo principal — está tudo bem.",
        },
        {
          q: "As stopwords são removidas antes da contagem?",
          a: "Somente se você ativar. Ao removê-las, 'hotel em londres' vira o bigrama 'hotel londres', que costuma estar mais perto de como as pessoas buscam de verdade. Compare as duas visões antes de decidir.",
        },
        {
          q: "Como chinês e japonês são contados?",
          a: "Sem um segmentador real, texto CJK é contado por caractere para termos simples e por pares de caracteres para frases de duas — uma boa aproximação para detectar termos sobreusados, mas não é uma análise linguística.",
        },
      ],
    },
  },
});
