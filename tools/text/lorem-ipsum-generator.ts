import { LoremGenerator } from "../_engines/lorem";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "lorem-ipsum-generator",
  category: "text",
  icon: "file",
  engine: { component: LoremGenerator },
  related: ["word-counter", "character-counter", "slug-generator", "case-converter"],
  copy: {
    en: {
      name: "Lorem Ipsum Generator",
      tagline:
        "Generate 1–50 paragraphs of classic lorem ipsum filler for mockups, wireframes and CMS testing — one click to regenerate and copy.",
      intro: [
        "Lorem ipsum has been the printing industry's placeholder since the 1500s: scrambled Latin from Cicero's 'De Finibus' that looks like real text but carries no meaning, so nobody mistakes a draft for finished copy. Pick a paragraph count, press the button and paste it into your layout.",
        "The text is generated locally with a seeded pseudo-random generator, so every batch is different — and nothing you do on this site ever leaves the browser.",
      ],
      steps: [
        "Set how many paragraphs you need (1–50).",
        "Press the button to generate a fresh batch.",
        "Copy the text straight into your design, template or CMS.",
      ],
      faqs: [
        {
          q: "What is lorem ipsum, exactly?",
          a: "Corrupted Latin from a passage of Cicero's De Finibus Bonorum et Malorum, truncated and scrambled into meaningless filler. Its letter distribution mimics real language, which makes it ideal for judging layout without reading content.",
        },
        {
          q: "Why not just use 'text text text'?",
          a: "Repeated dummy words create unrealistic shapes and hide issues with line breaks and rhythm. Lorem ipsum mimics the word length and distribution of real language.",
        },
        {
          q: "Can I get more than 50 paragraphs?",
          a: "A batch is capped at 50 paragraphs to keep the page fast; press the button again whenever you need another fresh batch.",
        },
      ],
    },
    zh: {
      name: "Lorem Ipsum 生成器",
      tagline: "生成 1–50 段经典 lorem ipsum 占位文,用于原型、线框图和 CMS 测试——一键重新生成并复制。",
      intro: [
        "Lorem ipsum 自 16 世纪起就是印刷业的占位文:出自西塞罗《论至善与至恶》的乱序拉丁文,看起来像正文却没有含义,没人会把它误当成成稿。选定段落数,点一下按钮,粘进版式里就能用。",
        "文本在本地用带种子的伪随机算法生成,每批都不一样;你在本站做的一切都不会离开浏览器。",
      ],
      steps: [
        "设定需要的段落数(1–50)。",
        "点击按钮生成新一批。",
        "直接复制到设计稿、模板或 CMS 里。",
      ],
      faqs: [
        {
          q: "lorem ipsum 到底是什么?",
          a: "西塞罗《论至善与至恶》选段的“损坏版”拉丁文,被截断打乱成无意义填充文本。它的字母分布接近真实语言,适合在不读内容的情况下评估版式。",
        },
        {
          q: "为什么不直接用“文本文本文本”?",
          a: "重复的假词会让版面形状失真,也看不出断行和节奏问题。lorem ipsum 的词长和分布更接近真实语言。",
        },
        {
          q: "能生成超过 50 段吗?",
          a: "单批上限 50 段以保证页面流畅;需要更多时再点一次按钮即可生成新的一批。",
        },
      ],
    },
    ja: {
      name: "Lorem Ipsum ジェネレーター",
      tagline: "モックアップ・ワイヤーフレーム・CMS テスト向けに、定番 lorem ipsum のダミー文を 1〜50 段落で生成。ワンクリックで再生成。",
      intro: [
        "Lorem ipsum は 1500 年代から印刷業界で使われてきたプレースホルダーです。キケロ『善と悪の究極について』の一節をつなぎ合わせたラテン語で、本文のように見えますが意味はないため、下書きを完成原稿と誤認する心配がありません。段落数を選んでボタンを押せば、レイアウトにすぐ貼り付けられます。",
        "テキストはシード付きの擬似ランダムでローカル生成され、毎回違う文面になります。このサイトで行った操作がブラウザの外に出ることはありません。",
      ],
      steps: [
        "必要な段落数を設定します(1〜50)。",
        "ボタンを押して新しい文面を生成します。",
        "デザイン、テンプレート、CMS にそのままコピーします。",
      ],
      faqs: [
        {
          q: "lorem ipsum とは正確には何ですか?",
          a: "キケロ『善と悪の究極について』の一節を切り貼りした無意味なラテン語フィラーです。文字の分布が実際の言語に近いため、内容を読まずにレイアウトを評価するのに向いています。",
        },
        {
          q: "「テストテスト」の繰り返しではだめですか?",
          a: "同じ単語の繰り返しは行の長さやリズムが不自然になり、改行の問題が見えなくなります。lorem ipsum は現実の言語に近い見た目を作れます。",
        },
        {
          q: "50 段落より多く作れますか?",
          a: "1 回の生成は 50 段落までです。ページを軽く保つための上限で、ボタンをもう一度押せば新しい文面が生成されます。",
        },
      ],
    },
    es: {
      name: "Generador de Lorem Ipsum",
      tagline:
        "Genera de 1 a 50 párrafos del clásico lorem ipsum para maquetas, wireframes y pruebas de CMS — un clic para regenerar y copiar.",
      intro: [
        "Lorem ipsum es el relleno de la industria gráfica desde el siglo XVI: latín revuelto tomado del 'De Finibus' de Cicerón que parece texto real pero no significa nada, así que nadie confunde un borrador con la copia final. Elige cuántos párrafos, pulsa el botón y pégalo en tu maqueta.",
        "El texto se genera en local con un generador pseudoaleatorio con semilla: cada tanda es distinta y nada de lo que hagas en este sitio sale de tu navegador.",
      ],
      steps: [
        "Indica cuántos párrafos necesitas (1–50).",
        "Pulsa el botón para generar una tanda nueva.",
        "Copia el texto directamente a tu diseño, plantilla o CMS.",
      ],
      faqs: [
        {
          q: "¿Qué es exactamente lorem ipsum?",
          a: "Latín alterado de un pasaje del De Finibus de Cicerón, truncado y revuelto hasta quedar sin sentido. Su distribución de letras imita la del lenguaje real, ideal para juzgar maquetas sin leer el contenido.",
        },
        {
          q: "¿Por qué no usar «texto texto texto»?",
          a: "Las palabras repetidas crean formas poco realistas y ocultan problemas de cortes de línea y ritmo. Lorem ipsum imita la longitud y distribución de las palabras reales.",
        },
        {
          q: "¿Puedo obtener más de 50 párrafos?",
          a: "Cada tanda se limita a 50 párrafos para que la página siga ágil; pulsa otra vez cuando necesites una tanda nueva.",
        },
      ],
    },
    pt: {
      name: "Gerador de Lorem Ipsum",
      tagline:
        "Gere de 1 a 50 parágrafos do clássico lorem ipsum para mockups, wireframes e testes de CMS — um clique para regenerar e copiar.",
      intro: [
        "Lorem ipsum é o texto de preenchimento da indústria gráfica desde os anos 1500: latim embaralhado do 'De Finibus' de Cícero que parece texto de verdade mas não significa nada, então ninguém confunde um rascunho com a versão final. Escolha o número de parágrafos, aperte o botão e cole no layout.",
        "O texto é gerado localmente com um gerador pseudoaleatório com semente: cada rodada é diferente e nada do que você faz no site sai do navegador.",
      ],
      steps: [
        "Defina quantos parágrafos você precisa (1–50).",
        "Aperte o botão para gerar uma rodada nova.",
        "Copie o texto direto para o design, template ou CMS.",
      ],
      faqs: [
        {
          q: "O que é lorem ipsum, exatamente?",
          a: "Latim alterado de um trecho do De Finibus de Cícero, truncado e embaralhado até ficar sem sentido. A distribuição de letras imita a da linguagem real, ideal para avaliar layouts sem ler o conteúdo.",
        },
        {
          q: "Por que não usar 'texto texto texto'?",
          a: "Palavras repetidas criam formas pouco realistas e escondem problemas de quebras de linha e ritmo. Lorem ipsum imita o tamanho e a distribuição de palavras reais.",
        },
        {
          q: "Dá para gerar mais de 50 parágrafos?",
          a: "Cada rodada fica limitada a 50 parágrafos para manter a página rápida; aperte o botão de novo sempre que precisar de outra rodada.",
        },
      ],
    },
  },
});
