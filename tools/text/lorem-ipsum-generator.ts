import { LoremGenerator } from "../_engines/lorem";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "lorem-ipsum-generator",
  category: "text",
  icon: "file",
  engine: { component: LoremGenerator },
  related: ["word-counter", "character-counter", "slug-generator", "case-converter", "text-diff", "text-sorter", "remove-extra-spaces", "remove-duplicate-lines", "sentence-counter", "text-to-binary"],
  copy: {
    en: {
      name: "Lorem Ipsum Generator",
      tagline:
        "Generate 1–50 paragraphs of classic lorem ipsum filler for mockups, wireframes and CMS testing — one click to regenerate and copy.",
      intro: [
        "Lorem ipsum has been the printing industry's placeholder since the 1500s: scrambled Latin drawn from Cicero's 'De Finibus Bonorum et Malorum' that looks like real text but carries no meaning, so nobody mistakes a draft for finished copy. Pick a paragraph count, press the button and paste it into your layout.",
        "Output varies every run: each paragraph gets 3–5 sentences and each sentence 8–19 words drawn from a lorem vocabulary, produced by a seeded pseudo-random generator so two presses never hand you identical blocks. Paragraphs are separated by blank lines, ready to paste into design tools or multi-column layouts.",
        "Generation happens entirely in your browser — no lorem API, no network call, no rate limit — and nothing you do on this site is stored or uploaded, which also means the generator keeps working offline.",
        "Compared with copying the one fixed 'Lorem ipsum dolor sit amet' block from an old template, fresh varied filler exposes more layout problems: uneven line lengths, orphan words and paragraph-count overflow. When you move on to real content, the related text tools count, clean and format it.",
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
      deepDive: [
        {
          heading: "Two thousand years of scrambled Cicero",
          paragraphs: [
            "The filler text is not invented Latin — it is mangled Latin. The words come from \"De finibus bonorum et malorum\" (On the Ends of Good and Evil), a philosophical treatise written by Cicero in 45 BC, sections 1.10.32–33. The passage discusses pain and pleasure; somewhere in the typesetting era, someone scrambled and truncated it into \"Lorem ipsum dolor sit amet, consectetur adipiscing elit…\" — words that no longer form coherent Latin sentences.",
            "Popular history credits the 1960s Letraset dry-transfer sheets, where designers rubbed pre-set headline text onto artwork, with spreading the passage; Aldus page-layout software carried it into digital publishing in the 1980s. It survived because it was already everywhere — the placeholder equivalent of a standard screw thread.",
            "One detail most people miss: the text's word lengths and letter distribution are roughly Latin-natural, which is exactly what you want from filler — a layout that holds with the fake text usually holds with real copy of similar length. \"Here goes some text here\" does not have that property.",
          ],
        },
        {
          heading: "Why filler beats real-looking text",
          paragraphs: [
            "Genuine text — a news excerpt, a friend's paragraph — invites the reviewer to read, and reading invites content critique: \"I wouldn't phrase it like that.\" Nonsense Latin has exactly the opposite property: it looks like language, occupies like language, but carries no meaning to argue with. Reviewers evaluate layout, typography and rhythm instead of copy.",
            "Length control matters more than most people expect. A page approved with 200 words of filler will overflow the moment real copy runs to 300; generating blocks in the sizes you actually expect — a two-line card teaser, a five-sentence paragraph — tests the layout against realistic variation, not one lucky block.",
            "The convention also has a communication function: everyone in design and publishing recognizes lorem ipsum on sight, so a mock full of it reads as \"layout pending\" without a single annotation.",
          ],
        },
        {
          heading: "Generated on the spot, sent nowhere",
          paragraphs: [
            "This generator builds its paragraphs from a bundled lorem-ipsum word list, randomized fresh each time you click — the words trace back to Cicero, but the sequence is generated locally, not fetched from a lorem-ipsum API. Nothing leaves the browser, and the tool works offline.",
            "Variation is deliberate: repeated clicks produce different text, so two mockups side by side do not carry identical filler — a small realism win when comparing layouts. Start-with-\"Lorem ipsum\" versions are available when you want the canonical opening.",
            "Practical tip for handoff: when you deliver a design, tell the client the text is placeholder in writing. The one recurring lorem-ipsum mishap is filler accidentally shipped to production — a translation agency once famously printed it in a client's brochure.",
          ],
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
      deepDive: [
        {
          heading: "两千年历史的“乱码西塞罗”",
          paragraphs: [
            "这段填充文本不是人造拉丁语,而是被搞乱的拉丁语。词句出自西塞罗公元前 45 年的哲学论著《论善恶之极》第 1 卷 10 章 32–33 节,原文讨论痛苦与快乐;在排版时代某处,有人把它打乱截断成了 “Lorem ipsum dolor sit amet, consectetur adipiscing elit…”——已不再是通顺的拉丁文句子。",
            "通常的说法是:上世纪 60 年代 Letraset 转印字模纸(设计师把预制标题文字摩擦转印到图稿上)让这段文字流行开来,80 年代 Aldus 的排版软件又把它带进数字出版。它能活到今天是因为早就无处不在——相当于填充文本界的标准螺纹。",
            "多数人忽略的一个细节:这些词的词长和字母分布大致符合真实拉丁语,这正是填充文本该有的性质——假文本撑得住的版面,换成相近长度的真实文案通常也撑得住。“此处放文字”没有这个性质。",
          ],
        },
        {
          heading: "为什么占位文本胜过“像真的”文本",
          paragraphs: [
            "真实文本——新闻摘录、朋友的段落——会诱使评审去读,一读就会挑内容毛病:“我不会这么措辞。”无意义的拉丁文恰好相反:看起来像语言、占位效果像语言,却没有可争论的含义,评审只能去看版式、字体和节奏。",
            "长度控制比想象中重要。用 200 词占位审过的页面,真实文案写到 300 词就溢出;按你实际预期的尺寸生成——两行的卡片摘要、五句话的段落——测的是版面对真实变化的承受力,而不是碰巧的一块。",
            "这个惯例还有沟通功能:设计和出版圈人人认得 lorem ipsum,一版满是它的稿子不用加任何标注就能读出“版式待定”。",
          ],
        },
        {
          heading: "现场生成,不上传",
          paragraphs: [
            "生成器基于内置的 lorem-ipsum 词表在本地组段,每次点击随机刷新——词源自西塞罗,但序列是本地生成的,不调用任何 lorem API。数据不出浏览器,断网可用。",
            "变化是刻意的:多点几次内容就不同,并排的两版设计不会带一模一样的占位文本——对比版式时是个小小的真实感加分。需要经典开头时也有以 “Lorem ipsum” 起句的版本。",
            "交付设计时的实用提醒:书面告知客户文本是占位。lorem ipsum 最常见的事故就是占位文本被原样发上生产环境——曾有翻译公司把它印进客户的宣传册。",
          ],
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
      deepDive: [
        {
          heading: "2000 年の「スクランブルされたキケロ」",
          paragraphs: [
            "このダミーテキストは人造ラテン語ではなく、乱されたラテン語です。語句はキケロが紀元前 45 年に書いた哲学論考『善と悪の極限について』第 1 巻 10 章 32–33 節に由来し、原文は苦痛と快楽を論じています。組版の時代のどこかで、誰かがこれを並べ替えて切り詰め、「Lorem ipsum dolor sit amet, consectetur adipiscing elit…」——もう通じるラテン語の文ではない言葉の並び——にしました。",
            "通説では、1960 年代のレタセット(転写シートでデザイナーが見出し文字を原稿に擦りつけた)が普及のきっかけで、1980 年代には Aldus の組版ソフトがデジタル出版へ持ち込みました。今日まで生き残ったのは、すでに到る所にあったからです。プレースホルダーの世界の標準ねじのようなものです。",
            "多くの人が見落とす細部:この語の語長と文字分布はほぼ本物のラテン語どおりで、これこそダミーテキストに求める性質です。ダミーで成立したレイアウトは、同程度の長さの実文案でも大抵成立します。「ここにテキスト」にはその性質がありません。",
          ],
        },
        {
          heading: "リアルなテキストよりダミーが良い理由",
          paragraphs: [
            "本物のテキスト——ニュースの抜粋や身内の文章——はレビュアーを読ませ、読ませたものは内容にケチをつけます。「自分ならこう言わない」と。無意味なラテン語は正反対です。言語に見え、言語のように占め、しかし議論すべき意味を持たないため、レビュアーはレイアウト・タイポグラフィ・リズムを見ます。",
            "長さの制御が思った以上に重要です。200 語のダミーで通したページは、実文案が 300 語に達した瞬間に溢れます。想定する実寸法——2 行のカード要約、5 文の段落——でブロックを生成すれば、運の良い 1 ブロックではなく現実的なばらつきに対してレイアウトを試せます。",
            "この慣行には伝達機能もあります。デザインと出版の業界では lorem ipsum は一見で分かるため、注釈なしで「レイアウトは仮」と読めます。",
          ],
        },
        {
          heading: "その場で生成、どこにも送らない",
          paragraphs: [
            "ジェネレーターは同梱の lorem-ipsum 語彙リストからローカルで段落を組み立て、クリックのたびに新しくランダム化します。語の由来はキケロでも、並びはローカル生成で、lorem API を呼びません。ブラウザから何も出ず、オフラインで動きます。",
            "ばらつきは意図的です。クリックのたびに違う文になるので、並べた 2 つのモックが同じダミーを持ちません。レイアウト比較の小さなリアリティ勝ちです。定番の書き出しが必要なら「Lorem ipsum」で始まる版もあります。",
            "納品時の実用メモ:クライアントにはテキストが仮であることを文書で伝えます。lorem ipsum の定番事故は、ダミーがそのまま本番へ流れること——翻訳会社がクライアントのパンフレットに印字した有名な例もあります。",
          ],
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
      deepDive: [
        {
          heading: "Dos mil años de Cicerón revuelto",
          paragraphs: [
            "El texto de relleno no es latín inventado — es latín destrozado. Las palabras vienen de \"De finibus bonorum et malorum\" (Sobre los límites del bien y del mal), un tratado filosófico que Cicerón escribió en el 45 a.C., secciones 1.10.32–33. El pasaje habla del dolor y el placer; en algún punto de la era de la tipografía, alguien lo revolvió y truncó hasta formar \"Lorem ipsum dolor sit amet, consectetur adipiscing elit…\" — palabras que ya no componen frases latinas coherentes.",
            "La historia popular atribuye la difusión a las láminas de transferencia Letraset de los años 60, con las que los diseñadores frotaban texto prefabricado sobre el arte final, y el software de maquetación de Aldus lo llevó a la edición digital en los 80. Sobrevivió porque ya estaba en todas partes — el equivalente del relleno a un tornillo estándar.",
            "Un detalle que casi nadie ve: las longitudes de palabra y la distribución de letras son aproximadamente latinas-naturales, justo lo que se le pide a un relleno — un diseño que aguanta el texto falso suele aguantar copia real de longitud similar. \"Aquí va un texto aquí\" no tiene esa propiedad.",
          ],
        },
        {
          heading: "Por qué el relleno gana al texto realista",
          paragraphs: [
            "El texto genuino — un extracto de prensa, un párrafo de un conocido — invita a leer, y leer invita a criticar el contenido: \"yo no lo redactaría así\". El latín sin sentido tiene la propiedad contraria: parece lenguaje, ocupa como el lenguaje, pero no ofrece significado con el que discutir. El revisor evalúa maqueta, tipografía y ritmo en lugar del copy.",
            "El control de longitud importa más de lo que se espera. Una página aprobada con 200 palabras de relleno se desborda en cuanto el copy real llega a 300; generar bloques en los tamaños que de verdad esperas — un teaser de tarjeta de dos líneas, un párrafo de cinco frases — prueba el diseño contra variación realista, no contra un bloque afortunado.",
            "La convención también comunica: cualquiera de diseño o editorial reconoce lorem ipsum a la vista, así que una maqueta llena de ello se lee como \"maqueta pendiente\" sin una sola anotación.",
          ],
        },
        {
          heading: "Generado al momento, enviado a ninguna parte",
          paragraphs: [
            "Este generador compone sus párrafos a partir de una lista de palabras incluida en la página, aleatorizada en cada clic — las palabras rastrean hasta Cicerón, pero la secuencia se genera en local, sin llamar a ninguna API. Nada sale del navegador y funciona sin conexión.",
            "La variación es deliberada: clics sucesivos producen texto distinto, así que dos mockups lado a lado no llevan el mismo relleno — una pequeña victoria de realismo al comparar maquetas. Hay versiones que empiezan por el clásico \"Lorem ipsum\" cuando quieres la apertura canónica.",
            "Consejo práctico de entrega: avisa por escrito al cliente de que el texto es placeholder. El percance recurrente de lorem ipsum es que el relleno llegue a producción — una agencia de traducción llegó a imprimirlo en el folleto de un cliente.",
          ],
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
      deepDive: [
        {
          heading: "Dois mil anos de Cícero embaralhado",
          paragraphs: [
            "O texto de preenchimento não é latim inventado — é latim destroçado. As palavras vêm de \"De finibus bonorum et malorum\" (Sobre os limites do bem e do mal), tratado filosófico que Cícero escreveu em 45 a.C., seções 1.10.32–33. O trecho discute dor e prazer; em algum ponto da era da tipografia, alguém o embaralhou e truncou até formar \"Lorem ipsum dolor sit amet, consectetur adipiscing elit…\" — palavras que já não formam frases latinas coerentes.",
            "A história popular credita a difusão às folhas de transferência Letraset dos anos 60, com que designers esfregavam texto pronto sobre a arte, e o software de diagramação da Aldus o levou à publicação digital nos anos 80. Sobreviveu porque já estava em toda parte — o equivalente, no preenchimento, de uma rosca de parafuso padrão.",
            "Um detalhe que quase ninguém nota: os comprimentos de palavra e a distribuição de letras são aproximadamente latinonaturais, exatamente o que se pede a um preenchimento — um layout que aguenta o texto falso costuma aguentar copy real de comprimento parecido. \"Aqui vai um texto aqui\" não tem essa propriedade.",
          ],
        },
        {
          heading: "Por que o preenchimento ganha do texto realista",
          paragraphs: [
            "Texto genuíno — um trecho de notícia, um parágrafo de um conhecido — convida à leitura, e a leitura convida à crítica de conteúdo: \"eu não escreveria assim\". O latim sem sentido tem a propriedade oposta: parece linguagem, ocupa como a linguagem, mas não carrega significado com que discutir. O revisor avalia layout, tipografia e ritmo em vez do copy.",
            "O controle de comprimento importa mais do que se espera. Uma página aprovada com 200 palavras de preenchimento transborda assim que o copy real chega a 300; gerar blocos nos tamanhos que você realmente espera — um teaser de card de duas linhas, um parágrafo de cinco frases — testa o layout contra variação realista, não contra um bloco sortudo.",
            "A convenção também comunica: qualquer pessoa de design ou editorial reconhece lorem ipsum à primeira vista, então uma maquete cheia disso se lê como \"layout pendente\" sem uma única anotação.",
          ],
        },
        {
          heading: "Gerado na hora, enviado para lugar nenhum",
          paragraphs: [
            "Este gerador monta seus parágrafos a partir de uma lista de palavras embutida na página, randomizada a cada clique — as palavras remontam a Cícero, mas a sequência é gerada localmente, sem chamar API alguma. Nada sai do navegador e a ferramenta funciona offline.",
            "A variação é deliberada: cliques sucessivos produzem texto diferente, então duas maquetes lado a lado não carregam o mesmo preenchimento — uma pequena vitória de realismo ao comparar layouts. Há versões que começam pelo clássico \"Lorem ipsum\" quando você quer a abertura canônica.",
            "Dica prática de entrega: avise o cliente por escrito que o texto é placeholder. O percalço recorrente do lorem ipsum é o preenchimento ir parar em produção — uma agência de tradução chegou a imprimi-lo no folheto de um cliente.",
          ],
        },
      ],
    },
  },
});
