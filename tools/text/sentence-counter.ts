import { TextStats } from "../_engines/text-stats";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "sentence-counter",
  category: "text",
  icon: "text",
  engine: { component: TextStats, props: { primary: "sentences" } },
  related: ["word-counter", "character-counter", "text-diff", "text-cleaner", "text-sorter", "remove-extra-spaces", "remove-duplicate-lines", "lorem-ipsum-generator", "text-to-binary", "reverse-text"],
  copy: {
    en: {
      name: "Sentence Counter",
      tagline:
        "Count sentences instantly and see words, paragraphs and reading time next to them — a quick readability check for editors and writers.",
      intro: [
        "Sentence count is the fastest readability signal a writer has. This tool counts sentences as you type and puts them next to words, paragraphs, lines and reading time, so you can tell at a glance whether a paragraph is getting too dense.",
        "It recognizes the punctuation that actually ends sentences in mixed-language text: Latin periods, question and exclamation marks, plus the full-width 。!?… used in Chinese and Japanese.",
      
        "Sentence boundaries are detected by the punctuation that actually terminates sentences across scripts — '.', '!', '?' for Latin text plus '。', '！', '？', '…' for CJK — so a mixed-language paragraph counts correctly rather than stopping at the first period. Numbers, abbreviations like 'e.g.' and decimals do not trigger a false split.",
        "Compared with word count alone, sentence count is the metric that correlates with readability formulas like Flesch-Kincaid — a 200-word paragraph with 2 sentences reads very differently from one with 12. The live count as you type makes density visible while you write, not after the draft is done.",
      ],
      steps: [
        "Paste your draft, email or article into the box.",
        "Check the highlighted sentence count and compare it with your word count.",
        "Split or merge sentences to hit your target average length.",
      ],
      faqs: [
        {
          q: "What counts as a sentence?",
          a: "Any stretch of text ending in a period, question mark, exclamation mark or the CJK equivalents 。!?… — as long as it contains something other than whitespace.",
        },
        {
          q: "Why does my count differ from my editor's?",
          a: "Abbreviations like 'Mr.' or 'e.g.' end with a period and are counted as sentence ends — this tool uses punctuation rules, not full natural-language parsing.",
        },
        {
          q: "How many sentences should a paragraph have?",
          a: "Style guides commonly suggest 2–5. There is no rule set in stone: use the count to spot walls of text before your readers do.",
        },
      ],
      deepDive: [
        {
          heading: "How a sentence is detected",
          paragraphs: [
            "A sentence is a fuzzy concept, and counters disagree on where one ends. The naive rule — split on every period, exclamation mark and question mark — fails on \"Dr. Smith arrived at 3.5 p.m.\": three periods, zero sentence ends. A real detector needs abbreviation awareness (Dr., Mr., e.g.), decimal handling, and logic for ellipses and multiple punctuation like \"Really?!\".",
            "This tool uses the heuristic layer: sentence-ending punctuation followed by whitespace and a capitalized letter counts as a boundary; abbreviations from a built-in list are skipped; full-width marks (。！？) are treated as hard boundaries, which is what CJK text needs since it lacks spaces. Mixed Chinese-English text therefore gets counted correctly in both scripts.",
            "Counting is inherently approximate for edge cases — quoted dialogue, bullet fragments without terminal punctuation. Treat the number as a strong estimate, not an axiom; if a specific sentence matters (legally or contractually), count that one yourself.",
          ],
        },
        {
          heading: "Reading length from sentence counts",
          paragraphs: [
            "The average sentence length is the most useful number the counter produces. Under 15 words per sentence reads punchy and easy; over 25 usually signals a comprehension problem, and editors target roughly 15-20 for general audiences. The count per sentence also exposes run-ons: one sentence of 60 words is almost always a punctuation problem, not a style choice.",
            "Sentence count converts to reading time with a rough rule: around 200-250 words per minute for adults reading prose, so words ÷ 225 gives minutes. Combined with the sentence average, you can tell whether a text is long but readable, or short but dense.",
            "For translators and localization teams, sentence counts matter because most translation pricing and memory tools work at sentence granularity — knowing the count up front estimates the segmentation volume.",
          ],
        },
        {
          heading: "Local, no limits",
          paragraphs: [
            "The analysis runs in browser JavaScript as you type. No account, no upload, no limit on document size — paste a whole chapter and counts update live.",
            "Nothing is retained: refresh and everything resets. For unpublished manuscripts, client drafts or exam materials, that client-side model is the privacy-safe shape.",
            "Pair it with the word counter for the words-per-sentence ratio, and with case converter when preparing headings. The three together cover most editorial preflight checks without any external service.",
          ],
        },
      ],
    },
    zh: {
      name: "句子计数器",
      tagline: "句子数即时统计,同步显示词数、段落数与阅读时长,快速检查文章的可读性。",
      intro: [
        "句数是写作者最直观的可读性信号。工具在输入的同时统计句子数,并与词数、段落数、行数、阅读时长并列展示,一眼看出哪一段写得太密。",
        "同时识别中英日混排中真正结束句子的标点:西文句号、问号、感叹号,以及中文和日文的全角 。!?…。",
      ],
      steps: [
        "把草稿、邮件或文章粘贴到输入框。",
        "看高亮的句子数,与词数对照。",
        "通过拆分或合并句子,把平均句长控制在目标范围内。",
      ],
      faqs: [
        {
          q: "怎么算一句话?",
          a: "以句号、问号、感叹号或中日文的 。!?… 结尾、且含非空白内容的一段文字,即算一句。",
        },
        {
          q: "为什么和编辑器里统计的不一样?",
          a: "'Mr.'、'e.g.' 这类缩写以句号结尾,会被当作句子结束——本工具按标点规则计数,不做完整的自然语言分析。",
        },
        {
          q: "一段话写几句合适?",
          a: "常见建议是 2–5 句。没有硬性标准:用句数提前发现大段文字,比读者先一步发现密度问题。",
        },
      ],
      deepDive: [
        {
          heading: "句子是怎么被识别的",
          paragraphs: [
            "“句子”是个模糊概念,各家计数器对句子在哪结束意见不一。朴素规则——逢句号、叹号、问号就切——在 “Dr. Smith arrived at 3.5 p.m.” 上会失败:三个句点,零个句尾。真正的检测器需要缩写感知(Dr.、Mr.、e.g.)、小数处理,以及对省略号和 “Really?!” 这类多重标点的逻辑。",
            "本工具采用启发式层:句末标点后接空白且下一个字母大写才算边界;内置缩写表会被跳过;全角标点(。!?)按硬边界处理——这正是中日文需要的,因为它们没有空格。中英混排的文本因此能被两种文字都正确计数。",
            "对边界情况,计数本质上是近似的——引号对话、没有句末标点的列表碎片。把这个数字当成强估计而不是公理;如果某一句在法律或合同上很重要,自己数那一句。",
          ],
        },
        {
          heading: "从句子数读出文章信息",
          paragraphs: [
            "平均句长是计数器给出的最有用的数字。每句少于 15 词读起来干脆易懂;超过 25 词通常预示理解困难,面向大众的编辑目标大致在 15-20 词。单句计数还会暴露流水句:一句 60 词几乎总是标点问题,而不是风格选择。",
            "句数可以粗略换算成阅读时长:成人阅读散文约每分钟 200-250 词,总词数除以 225 就得分钟数。结合平均句长,你能判断一篇文章是“长但易读”还是“短但密实”。",
            "对译者和本地化团队,句数很重要,因为多数翻译计价和记忆工具按句子粒度工作——提前知道句数就能估算切分工作量。",
          ],
        },
        {
          heading: "本地运行,无限制",
          paragraphs: [
            "分析由浏览器 JavaScript 在你输入时完成。没有账号、没有上传、没有文档大小限制——整章粘贴进来,计数照常实时刷新。",
            "不保留任何内容:刷新即全部重置。对未出版的书稿、客户草稿或考试材料,这种客户端模式就是隐私安全的形态。",
            "配合 word counter 看每句词数比,配合 case converter 处理标题。三者一起覆盖大多数编辑发稿前检查,全程无需任何外部服务。",
          ],
        },
      ],
    },
    ja: {
      name: "文数カウンター",
      tagline: "文数をリアルタイム集計し、単語数・段落数・読了時間も並べて表示。編集者やライターの可読性チェックに。",
      intro: [
        "文数は、書き手が最初に確認したい可読性のサインです。入力と同時に文数を集計し、単語数・段落数・行数・読了時間と並べて表示するので、段落が窮屈になっていないか一目で分かります。",
        "日本語・中国語の全角句点(。!?…)とラテン文字のピリオド・疑問符・感嘆符の両方を文の区切りとして認識します。",
      ],
      steps: [
        "草稿、メール、記事を入力欄に貼り付けます。",
        "ハイライトされた文数を確認し、単語数と比べます。",
        "文の分割・統合で平均文長を調整します。",
      ],
      faqs: [
        {
          q: "どのように文を数えますか?",
          a: "ピリオド・疑問符・感嘆符、および日本語・中国語の全角(。!?…)で終わる空白以外の内容を 1 文として数えます。",
        },
        {
          q: "エディタの集計と違うのはなぜ?",
          a: "'Mr.' や 'e.g.' のような略語のピリオドも文の終わりとして数えます。本ツールは自然言語解析ではなく句読点のルールで数えているためです。",
        },
        {
          q: "1 段落に何文くらいが適切?",
          a: "一般的な目安は 2〜5 文です。厳密な規則はないので、読者より先に密度の高すぎる段落を見つけるために使ってください。",
        },
      ],
      deepDive: [
        {
          heading: "文はどのように検出されるか",
          paragraphs: [
            "「文」は曖昧な概念で、どこで終わるかについてカウンターごとに意見が分かれます。素朴なルール——ピリオド・感嘆符・疑問符で切る——は「Dr. Smith arrived at 3.5 p.m.」で失敗します。ピリオドは 3 つ、文末はゼロです。本物の検出器には略語の認識(Dr.、Mr.、e.g.)、小数の扱い、省略記号や「Really?!」のような複合句読への論理が必要です。",
            "このツールはヒューリスティック層を使います。文末句読の後に空白と大文字の字母が続くときだけ境界とみなし、内蔵の略語リストは読み飛ばし、全角句読(。!?)は硬い境界として扱います。CJK テキストは空白を持たないため、これが必須です。中国語と英語の混在テキストも両方の文字体系で正しく数えられます。",
            "境界例ではカウントは本質的に近似です。引用会話、文末句読のない箇条書き断片。この数字は公理ではなく強い推定として扱い、特定の一文が法的に重要なら、その文は自分で数えてください。",
          ],
        },
        {
          heading: "文数から読み取れること",
          paragraphs: [
            "平均文長はカウンターが返す最も有用な数字です。1 文 15 語未満は切れ味がよく読みやすく、25 語超は大抵理解の問題を示します。一般読者向けの編集目標はおよそ 15〜20 語です。文ごとの語数は長文乱走文も暴きます。60 語の 1 文はほぼ常に句読の問題であって、スタイルの選択ではありません。",
            "文数は読了時間に概算で換算できます。大人の散文読解は毎分 200〜250 語ほどで、総語数 ÷ 225 が分になります。平均文長と組み合わせれば、そのテキストが「長いが読みやすい」のか「短いが密度が高い」のかが分かります。",
            "翻訳者とローカリゼーションチームにとって文数は重要です。多くの翻訳価格設定とメモリツールは文単位で働くので、文数を先に知っておけばセグメント量を見積もれます。",
          ],
        },
        {
          heading: "ローカル、制限なし",
          paragraphs: [
            "解析は入力に合わせてブラウザの JavaScript が行います。アカウントもアップロードも文書サイズの上限もなく、章ごと貼り付けてもカウントはリアルタイムに更新されます。",
            "何も保持しません。更新すればすべてリセットです。未刊の原稿、クライアントの草稿、試験問題にとって、このクライアント側モデルこそプライバシーに安全な形です。",
            "word counter と組み合わせれば 1 文あたりの語数比が、case converter と組み合わせれば見出しの準備ができます。3 つ揃えば編集の 출稿前チェックのほとんどを外部サービスなしで覆います。",
          ],
        },
      ],
    },
    es: {
      name: "Contador de frases",
      tagline:
        "Cuenta frases al instante y ve palabras, párrafos y tiempo de lectura a su lado: una comprobación rápida de legibilidad para editores y redactores.",
      intro: [
        "El número de frases es la señal de legibilidad más rápida que tiene un redactor. Esta herramienta cuenta frases mientras escribes y las muestra junto a palabras, párrafos, líneas y tiempo de lectura, para detectar de un vistazo los párrafos demasiado densos.",
        "Reconoce los signos que de verdad cierran frases en textos mixtos: punto, interrogación y exclamación latinos, más los equivalentes de ancho completo 。!?… del chino y el japonés.",
      ],
      steps: [
        "Pega tu borrador, correo o artículo en el cuadro.",
        "Comprueba el recuento resaltado de frases y compáralo con el de palabras.",
        "Divide o une frases hasta alcanzar la longitud media objetivo.",
      ],
      faqs: [
        {
          q: "¿Qué cuenta como frase?",
          a: "Cualquier fragmento que termine en punto, interrogación, exclamación o los equivalentes CJK 。!?…, siempre que contenga algo más que espacios.",
        },
        {
          q: "¿Por qué difiere del recuento de mi editor?",
          a: "Abreviaturas como «Mr.» o «e.g.» terminan en punto y se cuentan como fin de frase: la herramienta usa reglas de puntuación, no análisis lingüístico completo.",
        },
        {
          q: "¿Cuántas frases debe tener un párrafo?",
          a: "Las guías de estilo suelen sugerir 2–5. No hay regla fija: usa el recuento para detectar muros de texto antes que tus lectores.",
        },
      ],
      deepDive: [
        {
          heading: "Cómo se detecta una frase",
          paragraphs: [
            "Una frase es un concepto difuso, y los contadores no se ponen de acuerdo sobre dónde termina. La regla ingenua — partir en cada punto, exclamación e interrogación — falla con \"Dr. Smith arrived at 3.5 p.m.\": tres puntos, cero fines de frase. Un detector real necesita conciencia de abreviaturas (Dr., Mr., e.g.), manejo de decimales y lógica para elipses y puntuaciones múltiples como \"Really?!\".",
            "Esta herramienta usa la capa heurística: la puntuación de fin de frase seguida de espacio y una letra mayúscula cuenta como frontera; las abreviaturas de una lista incorporada se saltan; los signos de ancho completo (。!?) se tratan como fronteras duras, que es lo que necesita el texto CJK al carecer de espacios. El texto mixto chino-inglés se cuenta correctamente en ambas escrituras.",
            "Para los casos límite, el recuento es inherentemente aproximado — diálogo entre comillas, fragmentos de lista sin puntuación final. Trata la cifra como una estimación fuerte, no como un axioma; si una frase concreta importa (legal o contractualmente), cuéntala tú.",
          ],
        },
        {
          heading: "Qué se lee de un recuento de frases",
          paragraphs: [
            "La longitud media de frase es el número más útil que produce el contador. Menos de 15 palabras por frase se lee contundente y fácil; más de 25 suele señalar un problema de comprensión, y los editores apuntan a 15-20 para público general. El recuento por frase también delata los periodos kilométricos: una frase de 60 palabras es casi siempre un problema de puntuación, no una decisión de estilo.",
            "El número de frases se convierte en tiempo de lectura con una regla aproximada: unos 200-250 palabras por minuto para un adulto leyendo prosa, así que palabras ÷ 225 da minutos. Combinado con la media por frase, distingues si un texto es largo pero legible o corto pero denso.",
            "Para traductores y equipos de localización, el recuento importa porque la mayoría de las herramientas de precio y memoria de traducción trabajan a granularidad de frase — conocer el recuento por adelantado estima el volumen de segmentación.",
          ],
        },
        {
          heading: "Local, sin límites",
          paragraphs: [
            "El análisis corre en JavaScript del navegador mientras escribes. Sin cuenta, sin subida, sin límite de tamaño: pega un capítulo entero y los recuentos se actualizan en vivo.",
            "Nada se conserva: recarga y todo se reinicia. Para manuscritos sin publicar, borradores de clientes o material de examen, ese modelo de cliente es la forma segura en privacidad.",
            "Combínalo con el contador de palabras para la proporción de palabras por frase, y con el conversor de mayúsculas al preparar titulares. Los tres cubren la mayoría de las comprobaciones previas a la publicación sin ningún servicio externo.",
          ],
        },
      ],
    },
    pt: {
      name: "Contador de frases",
      tagline:
        "Conte frases na hora e veja palavras, parágrafos e tempo de leitura ao lado — uma checagem rápida de legibilidade para editores e redatores.",
      intro: [
        "O número de frases é o sinal de legibilidade mais rápido que um redator tem. Esta ferramenta conta frases enquanto você digita e as mostra ao lado de palavras, parágrafos, linhas e tempo de leitura, para identificar de olho os parágrafos densos demais.",
        "Ela reconhece os sinais que realmente encerram frases em textos mistos: ponto, interrogação e exclamação latinos, além dos equivalentes de largura total 。!?… do chinês e do japonês.",
      ],
      steps: [
        "Cole seu rascunho, e-mail ou artigo na caixa.",
        "Confira o número destacado de frases e compare com a contagem de palavras.",
        "Divida ou junte frases até atingir o comprimento médio desejado.",
      ],
      faqs: [
        {
          q: "O que conta como frase?",
          a: "Qualquer trecho terminado em ponto, interrogação, exclamação ou os equivalentes CJK 。!?…, desde que contenha algo além de espaços.",
        },
        {
          q: "Por que difere da contagem do meu editor?",
          a: "Abreviações como 'Mr.' ou 'e.g.' terminam com ponto e são contadas como fim de frase — a ferramenta usa regras de pontuação, não análise linguística completa.",
        },
        {
          q: "Quantas frases deve ter um parágrafo?",
          a: "Guias de estilo costumam sugerir de 2 a 5. Não há regra fixa: use a contagem para detectar paredões de texto antes dos seus leitores.",
        },
      ],
      deepDive: [
        {
          heading: "Como uma frase é detectada",
          paragraphs: [
            "Uma frase é um conceito difuso, e os contadores discordam sobre onde ela termina. A regra ingênua — dividir em cada ponto, exclamação e interrogação — falha com \"Dr. Smith arrived at 3.5 p.m.\": três pontos, zero fins de frase. Um detector de verdade precisa de consciência de abreviações (Dr., Mr., e.g.), tratamento de decimais e lógica para reticências e pontuações múltiplas como \"Really?!\".",
            "Esta ferramenta usa a camada heurística: pontuação de fim de frase seguida de espaço e letra maiúscula conta como fronteira; abreviações de uma lista embutida são puladas; os sinais de largura total (。!?) são tratados como fronteiras duras, que é o que o texto CJK precisa por não ter espaços. Texto misto chinês-inglês é contado corretamente nas duas escritas.",
            "Para os casos-limite, a contagem é inerentemente aproximada — diálogo entre aspas, fragmentos de lista sem pontuação final. Trate o número como uma estimativa forte, não um axioma; se uma frase específica importa (juridicamente ou contratualmente), conte essa você mesmo.",
          ],
        },
        {
          heading: "O que se lê de uma contagem de frases",
          paragraphs: [
            "O comprimento médio de frase é o número mais útil que o contador produz. Menos de 15 palavras por frase lê enxuto e fácil; mais de 25 costuma sinalizar problema de compreensão, e editores miram 15-20 para público geral. A contagem por frase também expõe os períodos quilométricos: uma frase de 60 palavras é quase sempre um problema de pontuação, não uma escolha de estilo.",
            "A contagem de frases se converte em tempo de leitura com uma regra aproximada: cerca de 200-250 palavras por minuto para um adulto lendo prosa, então palavras ÷ 225 dá minutos. Combinada com a média por frase, você distingue se um texto é longo mas legível, ou curto mas denso.",
            "Para tradutores e equipes de localização, a contagem importa porque a maioria das ferramentas de precificação e memória de tradução trabalha na granularidade de frase — saber a contagem antes estima o volume de segmentação.",
          ],
        },
        {
          heading: "Local, sem limites",
          paragraphs: [
            "A análise roda em JavaScript do navegador enquanto você digita. Sem conta, sem envio, sem limite de tamanho — cole um capítulo inteiro e as contagens atualizam ao vivo.",
            "Nada é retido: recarregue e tudo reinicia. Para manuscritos não publicados, rascunhos de clientes ou material de prova, esse modelo de cliente é a forma segura em privacidade.",
            "Combine com o contador de palavras para a proporção de palavras por frase, e com o conversor de maiúsculas ao preparar títulos. Os três juntos cobrem a maioria das checagens pré-publicação sem nenhum serviço externo.",
          ],
        },
      ],
    },
  },
});
