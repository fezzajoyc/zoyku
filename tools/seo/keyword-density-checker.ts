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
      deepDive: [
        {
          heading: "The outdated myth: keyword density as a ranking target",
          paragraphs: [
            "Keyword density was a plausible idea in the 1990s and early 2000s: rank documents by how often the query words appeared in them, and webmasters would tune pages to a supposed magic threshold — 2%, 3%, whatever the SEO forum of the week claimed. That world is gone. Modern ranking systems use embeddings, topic models and quality signals that evaluate whether a page covers a subject well, not whether a phrase crosses a numeric line.",
            "Worse, chasing the threshold now reads as a negative signal. Text that repeats a phrase past natural levels is exactly what spam filters, quality raters and readability formulas are built to catch. A page stuffed to 5% is more likely to be demoted than promoted; the phrase people over-tune is precisely the one algorithms watch.",
            "So what is this tool actually for? The failure mode that still exists: a page that never clearly states its topic, or drifts mid-draft into related but different vocabulary. If the checker's top phrases are what you want to rank for, fine; if your target phrase does not appear in the top thirty, the page has a real problem no density rule would have fixed.",
          ],
        },
        {
          heading: "The denominator, stopwords and n-grams",
          paragraphs: [
            "Density is a fraction, and the denominator decides everything. Counted over raw tokens, function words dominate: in ordinary English prose, the and of and to are always the top terms, and your topic drowns. Removing stopwords turns the count into share-of-content-words, which is the version that can tell you something about the page.",
            "Single words are also the wrong unit for most searches. Queries are phrases — best running shoes, hotel in london — so this tool counts bigrams and trigrams alongside single tokens. Notice the stopword interplay: with stopwords removed, hotel in london collapses into the bigram hotel london, which is often closer to the actual query form. Compare both views rather than trusting one.",
            "CJK text is counted honestly but approximately: without real word segmentation, Chinese and Japanese single tokens are counted per character and two-word phrases per adjacent character pair. That is enough to spot a character or phrase being overused — the checker's actual job — but it is not linguistic segmentation, so treat the percentages as a diagnostic, not a measurement.",
          ],
        },
        {
          heading: "A practical reading workflow",
          paragraphs: [
            "Use the top of the 1-word list as a topic sanity check: the terms there should name your subject. Scan the 2-word and 3-word lists for the phrases you are targeting; if they are absent, write them in naturally rather than repeating a stub of the phrase more times.",
            "Watch for accidental winners. Drafts written around one working title often carry an unexpected dominant phrase — a product codename, a client name, a repeated stock phrase. Knowing that your page “topically reads as” something slightly different than intended is worth more than any percentage target.",
            "And keep the whole thing proportional: density tools read your text in isolation, while search engines read it against the whole corpus and your site's history. A local, in-browser count that runs instantly and never uploads your unpublished draft is a draft-stage instrument — the numbers are for you, the judgment stays yours.",
          ],
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
      deepDive: [
        {
          heading: "过时的迷思:把关键词密度当排名目标",
          paragraphs: [
            "关键词密度在九十年代和本世纪初是个听起来合理的想法:按查询词在文档中出现的频次排座次,于是站长们把页面调到某个传说中的魔法阈值——2%、3%,每周的 SEO 论坛总有新说法。那个世界已经过去。现代排名系统用向量化、主题模型和质量信号判断页面是否把一个主题讲透,而不是某个短语有没有越过数字线。",
            "更糟的是,今天追逐阈值本身会变成负面信号。把短语重复到超出自然水平的文本,正是垃圾过滤器、质量评估标准与可读性公式设计出来要抓的东西。堆到 5% 的页面更可能被降权而不是被提升;人们最爱过度调优的那个短语,恰恰是算法重点盯着看的那个。",
            "那这个工具到底用来干什么?对付一个至今仍真实存在的失败模式:页面从头到尾没有清楚说明自己的主题,或写到一半词汇漂移到相关但不同的说法上。如果检查器的高频短语正是你想排名的词,没问题;如果你的目标短语连前三十都进不去,那页面有真正的问题,任何密度规则都救不了它。",
          ],
        },
        {
          heading: "分母、停用词与 n-gram",
          paragraphs: [
            "密度是一个分数,分母决定一切。按原始分词统计时,虚词永远霸榜:普通英文散文里 the、of、to 就是前几名,你的主题被淹没在词海里。剔除停用词后,计数变成“实词占比”——这才是能告诉你一些事情的那个版本。",
            "单词也往往不是正确的统计单位。搜索是短语形态的——best running shoes、hotel in london——所以本工具在单词之外同时统计二元和三元短语。注意停用词与 n-gram 的互动:剔除停用词后,hotel in london 会坍缩成二元短语 hotel london,而这往往更接近真实的搜索形态。两种视图都看,别只信其一。",
            "中日文文本的统计方式诚实但近似:没有真正的分词器,中文和日文的单词按字统计、二字短语按相邻两字统计。这足以发现某个字或短语被过度使用——这正是检查器的本职——但它不是语言学层面的分词,所以把百分比当作诊断读数,而不是精确测量。",
          ],
        },
        {
          heading: "一个实用的阅读流程",
          paragraphs: [
            "把一词榜的头部当作主题体检:那里的词应该能喊出你的主题的名字。再扫二元、三元榜找你的目标短语;如果没有,应该自然地把它们写进文案,而不是把短语的残缺片段再重复几遍。",
            "留意意外赢家。围绕某个工作标题写出来的草稿,常常带着一个意想不到的支配短语——产品代号、客户名、某句反复使用的套话。知道自己的页面“读起来像在讲”另一件略有不同的事,比任何百分比目标都有价值。",
            "并且始终保持比例感:密度工具孤立地读你的文本,搜索引擎却是拿它对照整个语料库和你网站的历史来读。一个即开即用、绝不上传未发布草稿的本地浏览器统计,是草稿期的仪表——数字给你看,判断仍然归你。",
          ],
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
      deepDive: [
        {
          heading: "時代遅れの神話:キーワード密度をランキング目標にする",
          paragraphs: [
            "キーワード密度は、1990 年代から 2000 年代前半にはもっともらしい考えでした。クエリ語が文書に何回出るかで順位を付け、Web 作成者は伝説の魔法の閾値——2%、3%、その週の SEO フォーラムが主張する数値——に合わせてページを調整したものです。その世界は終わりました。現代のランキングシステムは、埋め込み、トピックモデル、品質シグナルによって「ページが主題をよく扱えているか」を評価するのであって、フレーズが数値の線を越えたかどうかではありません。",
            "さらに悪いことに、閾値を追う行為自体が今ではネガティブシグナルとして読まれます。フレーズを自然な水準を超えて繰り返す文章は、スパムフィルター、品質評価基準、可読性指標がまさに捉えるために設計されたものです。5% まで盛ったページは、昇格より降格の可能性が高い。人が過剰に調整したがるフレーズこそ、アルゴリズムが最も注視しているものです。",
            "ではこのツールは何のためにあるのか。今も実在する失敗モードへの対処です。ページが冒頭から最後まで主題を明示していない、あるいは草稿の途中で関連するが異なる語彙へ流れてしまう——。チェッカーの上位フレーズが狙う語なら問題なし。狙うべきフレーズが上位 30 に入っていなければ、ページにはどんな密度ルールでも直せない本物の問題があります。",
          ],
        },
        {
          heading: "分母、ストップワード、そして n-gram",
          paragraphs: [
            "密度は分数であり、分母がすべてを決めます。生のトークンで数えると機能語が支配します。普通の英語散文では the、of、to が常に上位で、あなたの主題は語の海に沈みます。ストップワードを除去すると、計数は「内容語の占有率」に変わります——ページについて何かを語れるのはこの版です。",
            "単語もまた、ほとんどの検索にとって誤った単位です。クエリはフレーズの形——best running shoes、hotel in london——をしているので、このツールは単一トークンと並んで 2 語・3 語フレーズを数えます。ストップワードとの相互作用にも注意。除去すると hotel in london は 2 語フレーズの hotel london に収束しますが、多くの場合これのほうが実際のクエリ形に近い。両方の見え方を比較し、どちらか一方を信じないことです。",
            "中国語・日本語は誠実だが近似の方法で数えます。本格的な分かち書きがないため、単語は 1 文字、2 語フレーズは隣接 2 文字として数えます。文字やフレーズの過剰使用を発見するには十分——それこそチェッカーの本業——ですが、言語学的な分かち書きではありません。百分率は診断値として扱い、測定値としては扱わないでください。",
          ],
        },
        {
          heading: "実用的な読み取りの流れ",
          paragraphs: [
            "1 語リストの上位を主題の健全性チェックに使います。そこにある語は、あなたの主題の名前を呼べるはずのもの。次に 2 語・3 語リストで狙うフレーズを探します。なければ、フレーズの欠片を繰り返すのではなく、自然な形で書き込みましょう。",
            "意図しない勝者にも注目します。作業タイトルを軸に書いた草稿は、予想外の支配的フレーズ——製品コード名、クライアント名、繰り返される定型句——を抱えがちです。自分のページが「主題的に」意図と少し違うものとして読まれていると知ることは、どんなパーセンテージ目標より価値があります。",
            "そして全体を比例感覚で保つこと。密度ツールはテキストを孤立して読みますが、検索エンジンはコーパス全体とサイトの履歴と照らして読みます。未公開草稿を一切送信せず即座に走るブラウザ内のローカル計数は、草稿段階の計器です。数字はあなたに見せるためのもので、判断はあなたのままです。",
          ],
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
      deepDive: [
        {
          heading: "El mito caducado: la densidad como objetivo de ranking",
          paragraphs: [
            "La densidad de palabras clave fue una idea plausible en los años 90 y a principios de los 2000: ordenar documentos por cuántas veces aparecían las palabras de la consulta, y los webmasters ajustaban las páginas a un supuesto umbral mágico — 2 %, 3 %, lo que dijera el foro SEO de la semana. Ese mundo se acabó. Los sistemas modernos usan embeddings, modelos de tema y señales de calidad que evalúan si una página cubre bien un asunto, no si una frase cruza una línea numérica.",
            "Peor aún, perseguir el umbral hoy se lee como señal negativa. Un texto que repite una frase más allá de los niveles naturales es exactamente lo que los filtros de spam, los criterios de calidad y las fórmulas de legibilidad están diseñados para atrapar. Una página rellena al 5 % tiene más probabilidades de ser degradada que promovida; la frase que la gente sobreajusta es precisamente la que los algoritmos vigilan.",
            "Entonces, ¿para qué sirve esta herramienta? Para el modo de fallo que sigue existiendo: una página que nunca enuncia claramente su tema, o que deriva a mitad de borrador hacia vocabulario relacionado pero distinto. Si las frases principales del analizador son las que quieres posicionar, bien; si tu frase objetivo no aparece entre las treinta primeras, la página tiene un problema real que ninguna regla de densidad habría arreglado.",
          ],
        },
        {
          heading: "El denominador, las palabras vacías y los n-gramas",
          paragraphs: [
            "La densidad es una fracción y el denominador lo decide todo. Contada sobre tokens crudos, las palabras funcionales dominan: en prosa inglesa ordinaria, the, of y to encabezan siempre la lista y tu tema se ahoga. Al quitar las palabras vacías, el recuento pasa a ser cuota-de-palabras-de-contenido, que es la versión capaz de decirte algo sobre la página.",
            "Las palabras sueltas también son la unidad equivocada para la mayoría de las búsquedas. Las consultas son frases — best running shoes, hotel en londres — así que esta herramienta cuenta bigramas y trigramas junto a los términos simples. Fíjate en la interacción con las palabras vacías: al quitarlas, hotel en londres se pliega en el bigrama hotel londres, que suele estar más cerca de la consulta real. Compara ambas vistas en vez de fiarte de una.",
            "El texto CJK se cuenta con honestidad pero por aproximación: sin segmentación real de palabras, el chino y el japonés cuentan términos simples por carácter y frases de dos por pares de caracteres adyacentes. Basta para detectar un carácter o frase sobreutilizados — el trabajo real del analizador — pero no es segmentación lingüística, así que trata los porcentajes como diagnóstico y no como medición.",
          ],
        },
        {
          heading: "Un flujo de lectura práctico",
          paragraphs: [
            "Usa la cabecera de la lista de 1 palabra como control de cordura del tema: esos términos deberían nombrar tu asunto. Barre las listas de 2 y 3 palabras buscando tus frases objetivo; si faltan, escríbelas con naturalidad en vez de repetir un fragmento cojo de la frase unas cuantas veces más.",
            "Vigila a los ganadores accidentales. Los borradores escritos alrededor de un título de trabajo suelen llevar una frase dominante inesperada — un codename de producto, un nombre de cliente, una muletilla repetida. Saber que tu página se lee temáticamente como algo distinto de lo previsto vale más que cualquier objetivo porcentual.",
            "Y mantén la proporción: las herramientas de densidad leen tu texto aislado, mientras que los buscadores lo leen contra todo el corpus y la historia de tu sitio. Un conteo local, en el navegador, instantáneo y que nunca sube tu borrador sin publicar es un instrumento de fase de borrador — los números son para ti, el juicio sigue siendo tuyo.",
          ],
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
      deepDive: [
        {
          heading: "O mito caducado: densidade como objetivo de ranqueamento",
          paragraphs: [
            "Densidade de palavras-chave era uma ideia plausível nos anos 1990 e início dos 2000: ordenar documentos por quantas vezes as palavras da consulta apareciam neles, e webmasters ajustavam as páginas a um suposto limiar mágico — 2%, 3%, o que quer que o fórum de SEO da semana dissesse. Esse mundo acabou. Sistemas modernos usam embeddings, modelos de tópico e sinais de qualidade que avaliam se uma página cobre bem um assunto, não se uma frase cruza uma linha numérica.",
            "Pior, perseguir o limiar hoje é lido como sinal negativo. Texto que repete uma frase além dos níveis naturais é exatamente o que filtros de spam, critérios de qualidade e fórmulas de legibilidade foram desenhados para capturar. Uma página recheada a 5% tem mais chance de ser rebaixada que promovida; a frase que as pessoas sobreajustam é precisamente a que os algoritmos vigiam.",
            "Então, para que serve esta ferramenta? Para o modo de falha que ainda existe: uma página que nunca enuncia claramente seu tema, ou que deriva no meio do rascunho para vocabulário relacionado mas diferente. Se as frases principais do verificador são as que você quer ranquear, ótimo; se sua frase-alvo não aparece entre as trinta primeiras, a página tem um problema real que nenhuma regra de densidade teria consertado.",
          ],
        },
        {
          heading: "O denominador, as stopwords e os n-gramas",
          paragraphs: [
            "Densidade é uma fração, e o denominador decide tudo. Contada sobre tokens crus, as palavras funcionais dominam: em prosa inglesa comum, the, of e to lideram sempre a lista e seu tema se afoga. Removendo as stopwords, a contagem vira fatia-das-palavras-de-conteúdo, que é a versão capaz de dizer algo sobre a página.",
            "Palavras soltas também são a unidade errada para a maioria das buscas. Consultas são frases — best running shoes, hotel em londres — então esta ferramenta conta bigramas e trigramas junto com termos simples. Repare na interação com as stopwords: ao removê-las, hotel em londres se colapsa no bigrama hotel londres, que costuma estar mais perto da consulta real. Compare as duas visões em vez de confiar em uma.",
            "Texto CJK é contado com honestidade, mas por aproximação: sem segmentação real de palavras, chinês e japonês contam termos simples por caractere e frases de dois por pares de caracteres adjacentes. Basta para detectar um caractere ou frase sobreusado — o trabalho real do verificador — mas não é segmentação linguística, então trate os percentuais como diagnóstico e não como medição.",
          ],
        },
        {
          heading: "Um fluxo de leitura prático",
          paragraphs: [
            "Use o topo da lista de 1 palavra como um exame de sanidade do tema: esses termos deveriam dizer o nome do seu assunto. Depois varra as listas de 2 e 3 palavras procurando suas frases-alvo; se faltarem, escreva-as naturalmente em vez de repetir um caco da frase mais algumas vezes.",
            "Fique de olho nos vencedores acidentais. Rascunhos escritos em torno de um título de trabalho costumam carregar uma frase dominante inesperada — um codename de produto, um nome de cliente, uma bordão repetido. Saber que sua página “se lê tematicamente” como algo um pouco diferente do pretendido vale mais que qualquer meta percentual.",
            "E mantenha a proporção: ferramentas de densidade leem seu texto isolado, enquanto buscadores o leem contra todo o corpus e a história do seu site. Uma contagem local, no navegador, instantânea e que nunca envia seu rascunho não publicado é um instrumento de fase de rascunho — os números são para você, o julgamento continua seu.",
          ],
        },
      ],
    },
  },
});
