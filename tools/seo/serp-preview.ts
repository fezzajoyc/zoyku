import { SeoSerpEngine } from "../_engines/seo-engine-serp";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "serp-preview",
  category: "seo",
  icon: "search",
  engine: { component: SeoSerpEngine },
  related: ["meta-tag-generator", "open-graph-generator", "keyword-density-checker", "utm-builder", "sitemap-generator", "hreflang-generator", "canonical-tag-generator", "robots-txt-generator", "schema-markup-generator"],
  copy: {
    en: {
      name: "SERP Preview",
      tagline:
        "Preview your Google snippet on desktop and mobile with pixel-level truncation and length meters for the title and description.",
      intro: [
        "Google truncates titles and descriptions by measured pixel width, not character count — a title full of wide letters cuts off sooner than the same number of narrow ones. This preview measures your text the way the results page does and cuts it exactly where Google would.",
        "The desktop budget is roughly 580 pixels of title width and about 155–160 characters of description before the ellipsis; mobile fits slightly less. Proportional fonts are the reason character-count rules mislead: IIIIIIII and MMMMMMMM are the same length in characters and wildly different in pixels.",
        "The preview applies pixel metrics modeled on the fonts Google uses, so the cut lands where the results page would put it rather than at an arbitrary count. Toggle between desktop and mobile pixel budgets and watch the meters fill as you type.",
        "Google may still rewrite your snippet when it finds better on-page text, but a title that fits means the words you chose are the ones it starts from. Plugin previews approximate the same idea behind a plugin dependency; measuring here keeps the check independent and works for any template you ship.",
      ],
      steps: [
        "Enter the title tag, meta description and page URL.",
        "Switch between desktop and mobile to compare truncation points.",
        "Adjust the copy until title and description fit inside the pixel budget.",
      ],
      faqs: [
        {
          q: "How long can a title be before Google cuts it?",
          a: "About 580–600 pixels on desktop, typically 50–60 characters; mobile allows a little more width. The pixel measure is the real limit — character counts are only a rough guide because letters differ in width.",
        },
        {
          q: "Will Google always show my meta description?",
          a: "No. Google rewrites descriptions for a large share of queries, usually to match the searched terms. An accurate, specific description raises the odds yours is used verbatim.",
        },
        {
          q: "Why would Google replace my title?",
          a: "When it thinks another string fits the query better, Google may substitute the H1, anchor text of internal links or the site name. The preview shows the best case: your own tags, unmodified.",
        },
      ],
      deepDive: [
        {
          heading: "Pixels, not characters",
          paragraphs: [
            "Google's results page lays titles out in a proportional font and cuts when the line runs out of pixels — roughly 580–600 on desktop — not when a character count is reached. Because letters differ in width, IIIIIIII and MMMMMMMM are eight characters each and wildly different in width; any rule expressed in characters is a guess wearing a suit.",
            "The description follows the same logic with a softer limit: about 155–160 characters is the common desktop ceiling before the ellipsis, but at equal counts wide letters cut earlier than narrow ones. Mobile draws a slightly different budget again, which is why checking both layouts beats trusting one.",
            "This preview measures the text with pixel metrics modeled on the fonts Google uses and cuts where the results page would cut — the number you watch is the one Google's renderer watches, not an approximation of it.",
          ],
        },
        {
          heading: "Google will rewrite you anyway — plan for it",
          paragraphs: [
            "The preview shows the best case: your title tag, verbatim. In practice Google replaces titles and descriptions for a large share of queries — pulling the H1, the anchor text of internal links, the site name, or its own rewrite of your words when it judges another string fits the query better.",
            "The defense is not tricks but evidence: pages whose titles match the content and the query get rewritten less. A precise, specific meta description raises the odds yours is used verbatim; a vague marketing sentence invites a substitute tailored to the searcher instead.",
            "So treat the preview as the negotiating position, not the guaranteed outcome: put the words that must survive — brand, primary keyword, the offer — early in the title, so even a truncated or rewritten snippet keeps them.",
          ],
        },
        {
          heading: "A workflow that ends before the page ships",
          paragraphs: [
            "Type the title, description and URL, watch both meters fill, switch desktop/mobile, trim. The edits that buy space are predictable: move the brand to the end, cut filler adverbs, replace wordy phrases with the plain noun.",
            "CMS plugins preview the same idea, but bolt it to a platform dependency; a standalone check works for any template, any stack and any stage — including reviewing pages that never touch the CMS, like generated landing pages.",
            "Everything computes locally in your browser — draft titles for unannounced products can pass through without being sent anywhere. When the copy survives both pixel budgets, the meta-tag and Open Graph generators take the finished strings the rest of the way.",
          ],
        },
      ],
    },
    zh: {
      name: "SERP 预览",
      tagline: "在桌面端和移动端预览 Google 搜索结果摘要:按像素精确截断,标题和描述长度实时计量。",
      intro: [
        "Google 按实测像素宽度而不是字符数来截断标题和描述——满是宽字母的标题会比同样数量的窄字母更早被截断。这个预览用与结果页一致的方式度量文本,并在 Google 会截断的位置精确截断。",
        "在桌面端和移动端的像素预算之间切换,盯住长度计量条,反复调整文案,直到完整信息能在截断线内幸存。",
      ],
      steps: [
        "填写标题标签、meta 描述和页面 URL。",
        "在桌面端和移动端之间切换,对比截断位置。",
        "调整文案,让标题和描述都装进像素预算。",
      ],
      faqs: [
        {
          q: "标题多长会被 Google 截断?",
          a: "桌面端约 580–600 像素,通常对应 50–60 个字符;移动端允许的宽度稍大。像素才是真正的限制——字符数只是粗略参考,因为字母宽度不同。",
        },
        {
          q: "Google 一定会显示我的 meta 描述吗?",
          a: "不一定。对相当大比例的查询,Google 会改写描述,通常为了匹配搜索词。写得准确、具体,你的原文被原样采用的概率才更高。",
        },
        {
          q: "为什么 Google 会替换我的标题?",
          a: "当 Google 认为其他文本更匹配查询时,可能改用 H1、内链锚文本或网站名称。预览展示的是最好情况:你自己的标签原样呈现。",
        },
      ],
      deepDive: [
        {
          heading: "按像素,不按字符",
          paragraphs: [
            "Google 的结果页用比例字体排版标题,一行像素用尽就截断——桌面端约 580–600——而不是数到某个字符就停。字母宽度不同,IIIIIIII 和 MMMMMMMM 都是八个字符,宽度却天差地别;任何以字符数表达的规则,都是穿着西装的猜。",
            "描述遵循同样的逻辑,只是限制更软:桌面端通常约 155–160 字符就见省略号,但同样字符数下,宽字母的描述会比窄字母更早被截。移动端又是另一套预算——所以两种布局都查一遍,胜过只信一种。",
            "这个预览用按 Google 所用字体建模的像素度量来测你的文本,并在结果页会截断的位置截断——你盯着的数字,就是 Google 渲染器盯着的那个,而不是它的近似。",
          ],
        },
        {
          heading: "反正 Google 会改写——按这个来规划",
          paragraphs: [
            "预览展示的是最好情况:你的标题标签、一字不差。实际上,对相当大比例的查询,Google 会替换标题和描述——抓 H1、内链锚文本、站名,或者在它认为别的字符串更匹配查询时,改写你的原话。",
            "防御不靠技巧,靠证据:标题与内容和查询一致的页面,被改写的概率更低。准确、具体的 meta 描述更有机会被原样采用;一句含糊的营销话术,只会招来一条为搜索者量身定制的替身。",
            "所以把预览当谈判起点,而不是保证结果:必须幸存的词——品牌、主关键词、卖点——尽量放在标题前部,这样即使摘要被截断或改写,它们也还在。",
          ],
        },
        {
          heading: "在页面上线前结束的流程",
          paragraphs: [
            "填标题、描述和 URL,盯住两条计量条,切换桌面/移动,删改。买空间的编辑手段可以预测:把品牌挪到末尾、砍掉填充副词、把啰嗦短语换成朴素的名词。",
            "CMS 插件预览同一个想法,但把它拴在平台依赖上;独立检查对任何模板、任何技术栈、任何阶段都成立——包括审查永远不会进 CMS 的页面,比如批量生成的落地页。",
            "一切都在浏览器本地计算——未发布产品的标题草稿可以过一遍而不发往任何地方。文案在两套像素预算里都活下来之后,meta 标签生成器和 Open Graph 生成器接手把它做完。",
          ],
        },
      ],
    },
    ja: {
      name: "SERP プレビュー",
      tagline: "デスクトップとモバイルで Google のスニペットをプレビュー。ピクセル単位の切り詰めと title・description の長さメーターを表示します。",
      intro: [
        "Google は title や description を文字数ではなく実測のピクセル幅で切り詰めます。幅の広い文字が多いタイトルは、同じ文字数でもより早く切れます。このプレビューは検索結果ページと同じ方法でテキストを計測し、Google が切る位置で正確に切り詰めます。",
        "デスクトップとモバイルのピクセル予算を切り替え、メーターを見ながら、メッセージ全体が収まるまでコピーを調整してください。",
      ],
      steps: [
        "title タグ・メタディスクリプション・ページの URL を入力します。",
        "デスクトップとモバイルを切り替えて、切断位置を比較します。",
        "title と description がピクセル予算に収まるまでコピーを調整します。",
      ],
      faqs: [
        {
          q: "title は何文字まで切られない?",
          a: "デスクトップで約 580〜600px、目安は 50〜60 文字。モバイルはやや幅に余裕があります。本当の制約はピクセル数で、文字数は字形の幅が違うため目安にすぎません。",
        },
        {
          q: "Google は必ずメタディスクリプションを表示する?",
          a: "いいえ。多くのクエリで Google は description を書き換え、検索語に合わせる傾向があります。正確で具体的な説明を書くほど、原文のまま使われる可能性が高まります。",
        },
        {
          q: "Google が title を差し替えるのはなぜ?",
          a: "クエリにより適合する文字列があると判断すると、H1・内部リンクのアンカーテキスト・サイト名に置き換えることがあります。プレビューは最良のケース、つまり自分のタグがそのまま表示される状態を示します。",
        },
      ],
      deepDive: [
        {
          heading: "ピクセルであって文字数ではない",
          paragraphs: [
            "Google の結果ページは title をプロポーショナルフォントで組むので、行のピクセルが尽きた時点で切ります——デスクトップで約 580〜600。文字数が基準ではありません。文字の幅はまちまちで、IIIIIIII と MMMMMMMM はどちらも 8 文字なのに幅は桁違い。文字数で表現されたルールは、スーツを着た推測にすぎません。",
            "description も同じ論理で、制限はさらに柔らかいです。デスクトップの天井は約 155〜160 文字が目安ですが、同じ文字数でも幅の広い文字のほうが早く切れます。モバイルはまた別の予算を持つ——だから片方だけ信じるより、両方のレイアウトを確認するほうが賢明です。",
            "このプレビューは、Google の使うフォントをモデルにしたピクセル計量でテキストを測り、結果ページが切る位置で切ります——あなたが見ている数字は、Google のレンダラーが見ているその数です。その近似ではありません。",
          ],
        },
        {
          heading: "どうせ Google は書き換える——それを前提に設計する",
          paragraphs: [
            "プレビューが示すのは最良のケースです。あなたの title タグ、一字一句そのまま。実際にはかなりの割合のクエリで、Google は title や description を差し替えます。H1 を引くこともあれば、内部リンクのアンカーテキストやサイト名、あるいは別の文字列のほうがクエリに合うと判断して自分の言葉で書き直すこともあります。",
            "防御はテクニックではなく証拠です。title が内容とクエリに一致しているページは、書き換えられる頻度が下がります。正確で具体的な meta description はそのまま使われる可能性を上げ、曖昧な宣伝文は検索者に合わせた替え玉を招きます。",
            "だからプレビューは交渉の起点であって、保証された結果ではありません。生き残らせるべき語——ブランド、主キーワード、オファー——は title の前のほうに置く。スニペットが切り詰められようが書き直されようが、それらは残るように。",
          ],
        },
        {
          heading: "ページの公開前に終わるワークフロー",
          paragraphs: [
            "title・description・URL を入力し、2 つのメーターを見ながらデスクトップ/モバイルを切り替え、削る。空きを買う編集は見当がつきます。ブランドを末尾へ、つなぎの副詞を切り、くどい言い回しを素の名詞へ。",
            "CMS のプラグインは同じ発想をプレビューしますが、プラットフォームへの依存ごと持ち込みます。独立したチェックはどのテンプレートでも、どのスタックでも、どの段階でも機能します。CMS に決して入らないページ——量産ランディングページなど——のレビューも含めて。",
            "計算はすべてブラウザ内で行われます。未発表製品の title 下書きも、どこへも送られずに通せます。コピーが両方のピクセル予算を生き延びたら、meta タグ生成と Open Graph 生成が仕上げを引き継ぎます。",
          ],
        },
      ],
    },
    es: {
      name: "Vista previa SERP",
      tagline:
        "Previsualiza tu fragmento en Google para escritorio y móvil con truncado por píxeles y medidores de longitud de title y description.",
      intro: [
        "Google trunca títulos y descripciones por ancho medido en píxeles, no por número de caracteres: un title lleno de letras anchas se corta antes que el mismo número de letras estrechas. Esta vista previa mide tu texto como lo hace la página de resultados y lo corta justo donde lo cortaría Google.",
        "Alterna entre los presupuestos de píxeles de escritorio y móvil, vigila los medidores y ajusta el texto hasta que el mensaje completo sobreviva al corte.",
      ],
      steps: [
        "Introduce la etiqueta title, la meta description y la URL de la página.",
        "Cambia entre escritorio y móvil para comparar los puntos de truncado.",
        "Ajusta el texto hasta que title y description quepan en el presupuesto de píxeles.",
      ],
      faqs: [
        {
          q: "¿Cuánto puede medir un title antes de que Google lo corte?",
          a: "Unos 580–600 píxeles en escritorio, típicamente 50–60 caracteres; el móvil admite algo más de ancho. El límite real son los píxeles: el recuento de caracteres es solo una guía, porque las letras varían de ancho.",
        },
        {
          q: "¿Google siempre muestra mi meta description?",
          a: "No. Google reescribe las descriptions en buena parte de las consultas, normalmente para ajustarlas al término buscado. Una descripción exacta y específica aumenta la probabilidad de que se use la tuya tal cual.",
        },
        {
          q: "¿Por qué Google sustituiría mi title?",
          a: "Si cree que otra cadena encaja mejor con la consulta, puede usar el H1, el texto ancla de enlaces internos o el nombre del sitio. La vista previa muestra el mejor caso: tus propias etiquetas sin modificar.",
        },
      ],
      deepDive: [
        {
          heading: "Píxeles, no caracteres",
          paragraphs: [
            "La página de resultados de Google compone los títulos con fuente proporcional y corta cuando la línea se queda sin píxeles — unos 580–600 en escritorio — no al llegar a una cuenta de caracteres. Como las letras varían de ancho, IIIIIIII y MMMMMMMM son ocho caracteres cada una y de anchura disparatadamente distinta; toda regla expresada en caracteres es una apuesta con traje.",
            "La description sigue la misma lógica con un límite más blando: unos 155–160 caracteres es el techo habitual en escritorio antes de los puntos suspensivos, pero, a igualdad de recuento, las letras anchas cortan antes que las estrechas. El móvil traza un presupuesto de nuevo algo distinto — por eso revisar ambos diseños vence a fiarse de uno.",
            "Esta vista previa mide el texto con métricas de píxel modeladas sobre las fuentes que usa Google y corta donde lo cortaría la página de resultados — la cifra que vigilas es la misma que vigila el renderizador de Google, no una aproximación suya.",
          ],
        },
        {
          heading: "Google te reescribirá igualmente — planea con ello",
          paragraphs: [
            "La vista previa enseña el mejor caso: tu etiqueta title, palabra por palabra. En la práctica, Google sustituye titles y descriptions en buena parte de las consultas — tira del H1, del texto ancla de enlaces internos, del nombre del sitio, o reescribe tus palabras cuando juzga que otra cadena encaja mejor con la consulta.",
            "La defensa no son trucos sino pruebas: las páginas cuyo title coincide con el contenido y la consulta se reescriben menos. Una meta description precisa y específica aumenta la probabilidad de usarse tal cual; una frase de marketing vaga invita a un sustituto a la medida del buscador.",
            "Trata la vista previa como la posición de negociación, no como el resultado garantizado: coloca las palabras que deben sobrevivir — marca, palabra clave principal, la oferta — al principio del title, de modo que incluso un fragmento truncado o reescrito las conserve.",
          ],
        },
        {
          heading: "Un flujo que termina antes de publicar la página",
          paragraphs: [
            "Escribe el title, la description y la URL, mira llenarse ambos medidores, alterna escritorio/móvil, recorta. Las ediciones que compran espacio son previsibles: manda la marca al final, quita los adverbios de relleno, cambia los giros prolijos por el sustantivo llano.",
            "Los plugins de CMS prevén la misma idea, pero la atan a una dependencia de plataforma; una comprobación independiente funciona con cualquier plantilla, cualquier stack y cualquier etapa — incluida la revisión de páginas que nunca tocarán el CMS, como landing pages generadas.",
            "Todo se calcula en tu navegador — los borradores de titles de productos sin anunciar pueden pasar por aquí sin enviarse a ningún sitio. Cuando el texto sobrevive a ambos presupuestos de píxeles, el generador de meta etiquetas y el de Open Graph se llevan las cadenas terminadas hasta el final.",
          ],
        },
      ],
    },
    pt: {
      name: "Prévia SERP",
      tagline:
        "Visualize seu resultado no Google em desktop e mobile com truncamento por pixels e medidores de tamanho de title e description.",
      intro: [
        "O Google trunca títulos e descrições pela largura medida em pixels, não pela contagem de caracteres — um title cheio de letras largas corta antes que o mesmo número de letras estreitas. Esta prévia mede seu texto como a página de resultados faz e corta exatamente onde o Google cortaria.",
        "Alterne entre os orçamentos de pixels de desktop e mobile, acompanhe os medidores e ajuste o texto até a mensagem inteira sobreviver ao corte.",
      ],
      steps: [
        "Informe a tag de título, a meta description e a URL da página.",
        "Alterne entre desktop e mobile para comparar os pontos de truncamento.",
        "Ajuste o texto até title e description caberem no orçamento de pixels.",
      ],
      faqs: [
        {
          q: "Quantos pixels um title aguenta antes do corte?",
          a: "Cerca de 580–600 pixels no desktop, tipicamente 50–60 caracteres; o mobile permite um pouco mais de largura. O limite real são os pixels — a contagem de caracteres é só uma referência, porque as letras variam de largura.",
        },
        {
          q: "O Google sempre mostra minha meta description?",
          a: "Não. O Google reescreve descriptions em boa parte das consultas, normalmente para casar com o termo buscado. Uma descrição exata e específica aumenta a chance de a sua ser usada ao pé da letra.",
        },
        {
          q: "Por que o Google trocaria meu title?",
          a: "Quando julga que outro texto combina melhor com a consulta, ele pode usar o H1, o texto âncora de links internos ou o nome do site. A prévia mostra o melhor caso: suas próprias tags, sem alteração.",
        },
      ],
      deepDive: [
        {
          heading: "Pixels, não caracteres",
          paragraphs: [
            "A página de resultados do Google compõe os títulos em fonte proporcional e corta quando a linha fica sem pixels — uns 580–600 no desktop — não ao atingir uma contagem de caracteres. Como as letras variam de largura, IIIIIIII e MMMMMMMM são oito caracteres cada uma e de largura absurdamente diferente; toda regra expressa em caracteres é um chute de terno.",
            "A description segue a mesma lógica com um limite mais mole: uns 155–160 caracteres é o teto comum no desktop antes das reticências, mas, em contagem igual, letras largas cortam antes que estreitas. O mobile traça um orçamento de novo um pouco diferente — por isso conferir os dois layouts ganha de confiar num só.",
            "Esta prévia mede o texto com métricas de pixel modeladas nas fontes que o Google usa e corta onde a página de resultados cortaria — o número que você vigia é o mesmo que o renderizador do Google vigia, não uma aproximação dele.",
          ],
        },
        {
          heading: "O Google vai te reescrever mesmo assim — planeje com isso",
          paragraphs: [
            "A prévia mostra o melhor caso: sua tag de título, palavra por palavra. Na prática, o Google substitui titles e descriptions em boa parte das consultas — puxa o H1, o texto âncora de links internos, o nome do site, ou reescreve suas palavras quando julga que outra cadeia combina melhor com a consulta.",
            "A defesa não é truque, é evidência: páginas cujo title bate com o conteúdo e com a consulta são reescritas menos. Uma meta description precisa e específica aumenta a chance de ser usada ao pé da letra; uma frase de marketing vaga convida um substituto feito sob medida para o buscador.",
            "Trate a prévia como posição de negociação, não como resultado garantido: ponha as palavras que precisam sobreviver — marca, palavra-chave principal, a oferta — no começo do title, para que até um snippet truncado ou reescrito as guarde.",
          ],
        },
        {
          heading: "Um fluxo que termina antes de a página sair",
          paragraphs: [
            "Digite o title, a description e a URL, veja os dois medidores encher, alterne desktop/mobile, corte. As edições que compram espaço são previsíveis: manda a marca para o fim, corta advérbios de enchimento, troca frases prolixas pelo substantivo simples.",
            "Plugins de CMS preveem a mesma ideia, mas a amarram a uma dependência de plataforma; uma checagem independente funciona com qualquer template, qualquer stack e qualquer estágio — inclusive revisando páginas que nunca vão tocar o CMS, como landing pages geradas.",
            "Tudo se calcula no seu navegador — rascunhos de title de produtos não anunciados podem passar por aqui sem ir a lugar nenhum. Quando o texto sobrevive aos dois orçamentos de pixels, o gerador de meta tags e o de Open Graph levam as strings prontas até o fim.",
          ],
        },
      ],
    },
  },
});
