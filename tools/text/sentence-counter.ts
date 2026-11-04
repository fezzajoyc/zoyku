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
    },
  },
});
