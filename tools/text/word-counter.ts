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
        "A real-time word counter for essays, blog posts, SEO copy, ad copy and translated documents. It shows words, characters with and without spaces, sentences, paragraphs, lines and estimated reading time in one grid, updating on every keystroke — useful whenever a draft has a limit, from a 300-word abstract to a 5,000-word article.",
        "Mixed-language text is counted the way limits actually work: English-style words are tokenized by whitespace, while Chinese (U+4E00–9FFF), Japanese kana (U+3040–30FF) and Korean hangul (U+AC00–D7AF) characters are each counted individually and added to the total — a 500-character Chinese passage reports roughly 500 words.",
        "Sentence detection splits on both Western punctuation (. ! ? …) and full-width CJK marks (。！？…), so a mixed English-Chinese document is segmented correctly instead of collapsing into one giant sentence. Paragraphs are counted as blocks separated by blank lines, and reading time is estimated at about 220 words per minute with CJK weighted by character count.",
        "Unlike a word processor's status bar, this counter shows every metric at once and never uploads your text — paste unpublished drafts, client copy or confidential contracts freely. Related tools split the job further: character-counter focuses on hard per-character limits, and sentence-counter isolates sentence density for readability checks.",
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
      deepDive: [
        {
          heading: "How word counting actually works",
          paragraphs: [
            "Every counter on the web splits your text into tokens and counts them, but the tokenization rules differ more than you would expect. This tool counts a word as any run of characters separated by spaces or line breaks — the same convention Microsoft Word uses, so school and office word limits match what you see here. Hyphenated compounds like \"state-of-the-art\" count as one word; standalone numbers each count as one word when separated by spaces.",
            "Characters are counted two ways because two different limits exist in the wild: with spaces (most social platforms count every keystroke, including the spaces) and without spaces (essay forms and some CMS character limits exclude whitespace). Both numbers update live as you type, so you can watch whichever limit you are writing against.",
            "CJK text — Chinese, Japanese, Korean — is where naive counters break. Counting space-separated tokens in a Chinese paragraph returns almost nothing, because Chinese does not use spaces between words. This tool strips CJK characters out of the word pass, counts each CJK character individually (the standard \"characters ≈ words\" convention for CJK), and adds the two numbers together, so a 500-character Chinese passage reports ≈500 words instead of 1.",
          ],
        },
        {
          heading: "Reading time, speaking time and grade level",
          paragraphs: [
            "Reading time uses 220 words per minute for Latin-script text and 300 characters per minute for CJK — the two speeds differ enough that a mixed-language document needs both. Speaking time runs slower (130 wpm Latin, 180 cpm CJK) because listeners cannot re-read; use it before recording a voiceover or rehearsing a talk.",
            "The Flesch-Kincaid grade level estimates the US school grade needed to read your text, from sentence length and syllables per word. It is a heuristic: technical jargon with short words can score deceptively low, and a 300-character Korean sentence is one \"word\" to the formula. Treat it as a direction (simpler vs. harder), not a verdict.",
            "Sentence flow breaks your text into four bands — 1–6 words (punchy), 7–14 (standard), 15–24 (long), 25+ (very long) — and highlights each sentence by band. Varied sentence length reads better than uniform length; if every sentence lands in the same band, try splitting the longest one or merging two short ones.",
          ],
        },
        {
          heading: "How this compares with other counters",
          paragraphs: [
            "Word processors (Word, Google Docs) are the reference for document limits but need an app; browser counters are faster for paste-and-check workflows. Social-platform counters (X, Instagram) bake their platform-specific rules in — this tool keeps a dedicated platform-limits panel instead, so one input serves every platform.",
            "Privacy is the structural difference: many online counters POST your text to a server for processing. Everything here runs in your browser's JavaScript — the text never leaves your device, which matters for unpublished drafts, client copy or anything under NDA.",
          ],
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
      deepDive: [
        {
          heading: "字数统计到底是怎么数的",
          paragraphs: [
            "网上的计数器都把文本切成词再数,但切分规则差别比想象大。本工具以空格或换行分隔为一个词——与 Microsoft Word 同一口径,学校与办公场景的字数限制和这里看到的一致。连字符复合词(\"state-of-the-art\")算一个词;空格分隔的独立数字也各算一个词。",
            "字符数给两个口径,因为现实里存在两种限制:含空格(社交平台按每次击键计,含空格)和不含空格(论文表单、部分 CMS 排除空白)。两个数字随输入实时刷新,盯着你要对的那条限制写就行。",
            "中日韩文本是朴素计数器翻车的地方——中文不按空格分词,按空格切一段中文几乎得不到词。本工具把 CJK 字符从分词流程中剥离,逐字计数(CJK 通行的\"字符≈词\"口径),两个数相加:500 字中文报 ≈500 词,而不是 1。",
          ],
        },
        {
          heading: "阅读时长、演讲时长与年级",
          paragraphs: [
            "阅读时长对拉丁文本按 220 词/分钟、CJK 按 300 字/分钟——两种速度差异大到混排文档必须分开算。演讲时长更慢(拉丁 130 词/分、CJK 180 字/分),因为听众无法回读;录配音或排练演讲前用它。",
            "Flesch-Kincaid 年级分按句长与音节/词估算读懂文本所需的美国学制年级。它是启发式:短词堆的技术行话可能得分偏低,300 字的韩语长句对公式只是一个\"词\"。把它当方向(更简单/更难),不是判决。",
            "句子节奏把文本分四带——1–6 词(短促)、7–14(标准)、15–24(偏长)、25+(过长)——按带高亮每个句子。句长有变化比均匀长度更好读;如果每句都落在同一带,试着拆开最长的或合并两个短句。",
          ],
        },
        {
          heading: "和其他计数器比",
          paragraphs: [
            "文字处理软件(Word、Google Docs)是文档字数限制的参照,但需要装应用;浏览器计数器在粘贴即查的场景更快。社交平台计数器内置平台规则——本工具改为独立的平台限制面板,一份输入服务所有平台。",
            "隐私是结构性差异:不少在线计数器把文本 POST 到服务器处理。这里的一切都在浏览器 JavaScript 里跑——文本不离开设备,对未发布草稿、客户文案或 NDA 内容很重要。",
          ],
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
      deepDive: [
        {
          heading: "文字数カウントの実際",
          paragraphs: [
            "ウェブ上のカウンターはテキストをトークンに分割して数えますが、その分割ルールは思った以上に異なります。このツールは空白または改行で区切られた連なりを 1 語として数えます——Microsoft Word と同じ基準なので、学校やオフィスの語数制限と一致します。ハイフンでつながった複合語(state-of-the-art など)は 1 語、空白で区切られた数字もそれぞれ 1 語です。",
            "文字数に 2 つの数え方があるのは、世の中に 2 種類の制限があるからです。スペース込み(多くの SNS は空白も 1 文字としてカウント)とスペース除き(論文フォームや一部 CMS は空白を除外)。どちらの数字も入力に合わせてリアルタイムに更新されます。",
            "CJK(中国語・日本語・韓国語)は素朴なカウンターが壊れる場所です。中国語は語間に空白を使わないため、空白分割ではほぼ何も数えられません。このツールは CJK 文字を単語パスから切り離し、1 字ずつ数え(CJK で一般的な「字数≈語数」の基準)、合計します。500 字の中国語文章は 1 ではなく約 500 語と表示されます。",
          ],
        },
        {
          heading: "読了時間・発話時間・学年レベル",
          paragraphs: [
            "読了時間はラテン文字で 220 語/分、CJK で 300 字/分——速度差が大きいため、混在文書では両方が必要です。発話時間はさらに遅く(ラテン 130 語/分、CJK 180 字/分)、聞き手は読み返せないため。ナレーションの収録や発表の練習の前にご利用ください。",
            "Flesch-Kincaid 学年レベルは文長と語の音節数から、テキストを読むのに必要な米国の学年を推定します。ヒューリスティックです。短い専門用語の羅列は不当に低く出ることがあり、300 字の韓国語の長文は公式にとって 1 「語」です。判定ではなく方向(易しい/難しい)として扱ってください。",
            "文章のリズムは 4 バンドに分類します——1–6 語(テンポ良い)、7–14(標準)、15–24(長め)、25+(非常に長い)——文をバンドごとにハイライト。語数に変化があるほうが読みやすく、全文が同じバンドなら最長文を分割するか短文を統合してみてください。",
          ],
        },
        {
          heading: "他のカウンターとの違い",
          paragraphs: [
            "ワープロ(Word、Google Docs)は文書の語数制限の基準ですがアプリが要ります。ブラウザカウンターは貼り付けて確認するワークフローに向いています。SNS のカウンターは平台固有のルールを内蔵——このツールは専用のプラットフォーム制限パネルを設け、1 つの入力で全プラットフォームに対応します。",
            "プライバシーが構造的な違いです。多くのオンラインカウンターはテキストをサーバーへ送信して処理します。ここはすべてブラウザの JavaScript で動き、テキストは端末の外に出ません。未公開の草稿・クライアント原稿・NDA 文書に重要です。",
          ],
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
      deepDive: [
        {
          heading: "Cómo funciona realmente el conteo de palabras",
          paragraphs: [
            "Todos los contadores web dividen el texto en tokens y los cuentan, pero las reglas de división varían más de lo que cabría esperar. Esta herramienta cuenta como palabra cualquier secuencia separada por espacios o saltos de línea — la misma convención que Microsoft Word, así que los límites escolares y de oficina coinciden con lo que ves aquí. Los compuestos con guion (\"state-of-the-art\") cuentan como una palabra; los números separados por espacios cuentan cada uno como una.",
            "Los caracteres se cuentan de dos maneras porque existen dos límites distintos: con espacios (la mayoría de las plataformas sociales cuentan cada pulsación, incluidos los espacios) y sin espacios (formularios de ensayos y algunos CMS los excluyen). Ambos números se actualizan en vivo mientras escribes.",
            "El texto CJK — chino, japonés, coreano — es donde los contadores ingenuos fallan: el chino no usa espacios entre palabras, así que dividir por espacios apenas devuelve nada. Esta herramienta separa los caracteres CJK del paso de palabras, los cuenta individualmente (la convención estándar \"caracteres ≈ palabras\" para CJK) y suma ambos: un párrafo chino de 500 caracteres reporta ≈500 palabras, no 1.",
          ],
        },
        {
          heading: "Tiempo de lectura, de habla y nivel de grado",
          paragraphs: [
            "El tiempo de lectura usa 220 palabras por minuto para texto latino y 300 caracteres por minuto para CJK — las dos velocidades difieren lo suficiente como para que un documento mixto necesite ambas. El tiempo de habla es más lento (130 wpm latino, 180 cpm CJK) porque quien escucha no puede releer; úsalo antes de grabar una locución o ensayar una charla.",
            "El nivel Flesch-Kincaid estima el grado escolar estadounidense necesario para leer tu texto, a partir de la longitud de las frases y las sílabas por palabra. Es una heurística: la jerga técnica con palabras cortas puede puntuar engañosamente bajo, y una frase coreana de 300 caracteres es una \"palabra\" para la fórmula. Trátalo como una dirección (más simple vs. más difícil), no como un veredicto.",
            "El ritmo de las frases divide tu texto en cuatro bandas — 1–6 palabras (directo), 7–14 (estándar), 15–24 (larga), 25+ (muy larga) — y resalta cada frase según su banda. La longitud variada lee mejor que la uniforme; si todas las frases caen en la misma banda, parte la más larga o une dos cortas.",
          ],
        },
        {
          heading: "Comparación con otros contadores",
          paragraphs: [
            "Los procesadores (Word, Google Docs) son la referencia para límites de documentos pero requieren una app; los contadores web son más rápidos para pegar y verificar. Los contadores sociales integran reglas de cada plataforma — esta herramienta mantiene un panel dedicado de límites por plataforma, así que una entrada sirve para todas.",
            "La privacidad es la diferencia estructural: muchos contadores envían tu texto a un servidor. Aquí todo corre en el JavaScript de tu navegador — el texto nunca sale de tu dispositivo, algo importante para borradores no publicados, textos de clientes o material bajo NDA.",
          ],
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
      deepDive: [
        {
          heading: "Como a contagem de palavras realmente funciona",
          paragraphs: [
            "Todo contador na web divide seu texto em tokens e os conta, mas as regras de divisão variam mais do que se espera. Esta ferramenta conta como palavra qualquer sequência separada por espaços ou quebras de linha — a mesma convenção do Microsoft Word, então limitos escolares e corporativos batem com o que você vê aqui. Compostos com hífen (\"state-of-the-art\") contam como uma palavra; números separados por espaços contam um cada um.",
            "Os caracteres têm duas contagens porque existem dois limites diferentes: com espaços (a maioria das plataformas sociais conta cada tecla, incluindo espaços) e sem espaços (formulários de redação e alguns CMS excluem espaço em branco). Os dois números atualizam ao vivo enquanto você digita.",
            "Texto CJK — chinês, japonês, coreano — é onde contadores ingênuos falham: o chinês não usa espaços entre palavras, então dividir por espaços quase não retorna nada. Esta ferramenta separa os caracteres CJK da contagem de palavras, conta cada caractere individualmente (a convenção padrão \"caracteres ≈ palavras\" para CJK) e soma os dois: um texto chinês de 500 caracteres reporta ≈500 palavras, não 1.",
          ],
        },
        {
          heading: "Tempo de leitura, de fala e nível de escolaridade",
          paragraphs: [
            "O tempo de leitura usa 220 palavras por minuto para texto latino e 300 caracteres por minuto para CJK — as velocidades diferem o bastante para que um documento misto precise de ambas. O tempo de fala é mais lento (130 wpm latino, 180 cpm CJK) porque quem ouve não pode reler; use antes de gravar uma narração ou ensaiar uma palestra.",
            "O nível Flesch-Kincaid estima a série escolar americana necessária para ler seu texto, a partir do comprimento das frases e sílabas por palavra. É uma heurística: jargão técnico com palavras curtas pode pontuar baixo demais, e uma frase coreana de 300 caracteres é uma \"palavra\" para a fórmula. Trate como direção (mais simples vs. mais difícil), não veredito.",
            "O ritmo das frases divide seu texto em quatro faixas — 1–6 palavras (direto), 7–14 (padrão), 15–24 (longa), 25+ (muito longa) — e destaca cada frase pela faixa. Comprimento variado lê melhor que uniforme; se todas caem na mesma faixa, divida a mais longa ou junte duas curtas.",
          ],
        },
        {
          heading: "Comparação com outros contadores",
          paragraphs: [
            "Processadores (Word, Google Docs) são a referência para limitos de documentos mas exigem um app; contadores na web são mais rápidos para colar e verificar. Contadores de redes sociais embutem regras da plataforma — esta ferramenta mantém um painel dedicado de limites, então uma entrada serve para todas.",
            "Privacidade é a diferença estrutural: muitos contadores enviam seu texto a um servidor. Aqui tudo roda no JavaScript do seu navegador — o texto nunca sai do dispositivo, o que importa para rascunhos não publicados, textos de clientes ou material sob NDA.",
          ],
        },
      ],
    },
  },
});
