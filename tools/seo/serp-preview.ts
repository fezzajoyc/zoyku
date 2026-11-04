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
    },
  },
});
