import { SeoTagsEngine, type TagEngineProps } from "../_engines/seo-engine-tags";
import { loc } from "../_engines/seo-locale";
import { defineTool } from "../_lib/types";

const props: TagEngineProps = {
  fields: [
    {
      key: "og:title",
      label: loc("og:title", "og:title", "og:title", "og:title", "og:title"),
      meter: { warn: 55, max: 70 },
      placeholder: loc(
        "The complete guide to technical SEO",
        "技术 SEO 完全指南",
        "テクニカルSEOの完全ガイド",
        "La guía completa de SEO técnico",
        "O guia completo de SEO técnico",
      ),
    },
    {
      key: "og:type",
      label: loc("og:type", "og:type", "og:type", "og:type", "og:type"),
      type: "select",
      default: "website",
      options: [{ value: "website" }, { value: "article" }, { value: "product" }, { value: "profile" }],
    },
    {
      key: "og:url",
      label: loc("og:url", "og:url", "og:url", "og:url", "og:url"),
      placeholder: "https://example.com/guides/technical-seo",
    },
    {
      key: "og:image",
      label: loc("og:image", "og:image", "og:image", "og:image", "og:image"),
      placeholder: "https://example.com/images/cover.png",
      hint: loc(
        "1200 × 630 px works on every major platform.",
        "1200 × 630 像素在所有主流平台都适用。",
        "1200 × 630px なら主要プラットフォームで問題ありません。",
        "1200 × 630 px funciona en todas las plataformas.",
        "1200 × 630 px funciona em todas as plataformas.",
      ),
    },
    {
      key: "og:image:alt",
      label: loc("og:image:alt", "og:image:alt", "og:image:alt", "og:image:alt", "og:image:alt"),
      placeholder: loc("Diagram of a site architecture audit", "网站架构审查示意图", "サイト構造監査の図", "Diagrama de una auditoría de arquitectura", "Diagrama de uma auditoria de arquitetura"),
    },
    {
      key: "og:site_name",
      label: loc("og:site_name", "og:site_name", "og:site_name", "og:site_name", "og:site_name"),
      placeholder: loc("SEO Handbook", "SEO 手册", "SEO ハンドブック", "Manual de SEO", "Manual de SEO"),
    },
    {
      key: "og:description",
      label: loc("og:description", "og:description", "og:description", "og:description", "og:description"),
      type: "textarea",
      rows: 3,
      meter: { warn: 150, max: 200 },
      placeholder: loc(
        "Crawl budget, canonical logic, Core Web Vitals and structured data — everything explained with checklists.",
        "抓取预算、canonical 逻辑、Core Web Vitals 与结构化数据——附清单逐一讲透。",
        "クロール予算、canonical の論理、Core Web Vitals、構造化データをチェックリスト付きで解説。",
        "Presupuesto de rastreo, lógica canonical, Core Web Vitals y datos estructurados, con listas de verificación.",
        "Orçamento de rastrio, lógica canonical, Core Web Vitals e dados estruturados, com checklists.",
      ),
    },
    {
      key: "og:locale",
      label: loc("og:locale", "og:locale", "og:locale", "og:locale", "og:locale"),
      default: "en_US",
      hint: loc("Format: language_TERRITORY — en_US, zh_CN, ja_JP, es_ES, pt_BR.", "格式:语言_地区——en_US、zh_CN、ja_JP、es_ES、pt_BR。", "形式:言語_地域 — en_US、zh_CN、ja_JP、es_ES、pt_BR。", "Formato: idioma_TERRITORIO — en_US, zh_CN, ja_JP, es_ES, pt_BR.", "Formato: idioma_TERRITÓRIO — en_US, zh_CN, ja_JP, es_ES, pt_BR."),
    },
    {
      key: "twitter:card",
      label: loc("twitter:card", "twitter:card", "twitter:card", "twitter:card", "twitter:card"),
      type: "select",
      default: "summary_large_image",
      options: [
        { value: "summary_large_image", label: loc("summary_large_image", "summary_large_image(大图)", "summary_large_image(大画像)", "summary_large_image (imagen grande)", "summary_large_image (imagem grande)") },
        { value: "summary", label: loc("summary (small square)", "summary(小方块)", "summary(小さい正方形)", "summary (cuadrado pequeño)", "summary (quadrado pequeno)") },
      ],
    },
    {
      key: "twitter:site",
      label: loc("twitter:site", "twitter:site", "twitter:site", "twitter:site", "twitter:site"),
      placeholder: "@yoursite",
      hint: loc("Site handle; title/description/image fall back to og: tags.", "网站账号;标题/描述/图片会回退到 og: 标签。", "サイトのアカウント。title・description・image は og: タグにフォールバックします。", "Cuenta del sitio; title/description/image usan las og: como respaldo.", "Conta do site; title/description/image usam as og: como fallback."),
    },
    {
      key: "twitter:creator",
      label: loc("twitter:creator (optional)", "twitter:creator(可选)", "twitter:creator(任意)", "twitter:creator (opcional)", "twitter:creator (opcional)"),
      placeholder: "@authorhandle",
    },
  ],
  lines: [
    { template: '<meta property="og:title" content="{{og:title}}">', when: "og:title" },
    { template: '<meta property="og:type" content="{{og:type}}">', when: "og:type" },
    { template: '<meta property="og:url" content="{{og:url}}">', when: "og:url" },
    { template: '<meta property="og:image" content="{{og:image}}">', when: "og:image" },
    { template: '<meta property="og:image:alt" content="{{og:image:alt}}">', when: "og:image:alt" },
    { template: '<meta property="og:description" content="{{og:description}}">', when: "og:description" },
    { template: '<meta property="og:site_name" content="{{og:site_name}}">', when: "og:site_name" },
    { template: '<meta property="og:locale" content="{{og:locale}}">', when: "og:locale" },
    { template: '<meta name="twitter:card" content="{{twitter:card}}">', when: "twitter:card" },
    { template: '<meta name="twitter:site" content="{{twitter:site}}">', when: "twitter:site" },
    { template: '<meta name="twitter:creator" content="{{twitter:creator}}">', when: "twitter:creator" },
  ],
  preview: "social",
  outputLabel: loc("HTML snippet", "HTML 代码", "HTML スニペット", "Fragmento HTML", "Trecho HTML"),
};

export default defineTool({
  slug: "open-graph-generator",
  category: "seo",
  icon: "image",
  engine: { component: SeoTagsEngine, props },
  related: ["meta-tag-generator", "serp-preview", "schema-markup-generator", "utm-builder", "keyword-density-checker", "sitemap-generator", "hreflang-generator", "canonical-tag-generator", "robots-txt-generator"],
  copy: {
    en: {
      name: "Open Graph Generator",
      tagline:
        "Build the full set of og: and twitter: meta tags and watch the share card preview update live before you paste anything.",
      intro: [
        "When your link is shared on X, Facebook, LinkedIn, Slack or iMessage, the preview card is built almost entirely from Open Graph tags, with Twitter card tags filling the gaps. This generator outputs both namespaces: og:title, og:type, og:url, og:image, og:image:alt, og:site_name, og:description and og:locale, plus twitter:card, twitter:site and twitter:creator.",
        "og:image wants an absolute URL, ideally around 1200×630 pixels, and platform caches are aggressive: if you replace the image without changing the filename, the old one keeps showing until you force a refresh in the platform's debugger. og:url should be the canonical address and match the rel=canonical tag.",
        "Most platforms fall back to og: tags when a twitter: tag is missing, so the extras are only needed where they differ — twitter:card is the real exception, because it selects the large-image summary layout instead of a small square. og:image:alt is easy to forget and matters for screen readers on every share.",
        "The live preview approximates how a large-image or summary card renders, but each platform truncates differently, so run the final URL through the official debuggers — Facebook Sharing Debugger, X Card Validator, LinkedIn Post Inspector — before launch. Generating both namespaces at once prevents the missing-tag fallbacks those debuggers exist to catch.",
      ],
      steps: [
        "Enter the page title, description and canonical URL.",
        "Add the share image URL (1200 × 630 px works everywhere) and set the card type.",
        "Copy the tags into your <head> and check the preview card.",
      ],
      faqs: [
        {
          q: "What image size should I use for og:image?",
          a: "1200 × 630 pixels (1.91:1) is the safe default across Facebook, X and LinkedIn. Keep the file under 8 MB, use an absolute URL, and always add og:image:alt for accessibility.",
        },
        {
          q: "Do I need both og: and twitter: tags?",
          a: "twitter:title, twitter:description and twitter:image fall back to their og: equivalents. On top of the og: set you only need twitter:card (summary or summary_large_image), twitter:site and optionally twitter:creator.",
        },
        {
          q: "Which og:type should I pick?",
          a: "Use website for homepages and generic pages, article for news and blog posts (add article:published_time if you can), and product for e-commerce detail pages. The type changes how some platforms categorize the link.",
        },
      ],
      deepDive: [
        {
          heading: "How platforms actually consume these tags",
          paragraphs: [
            "The Open Graph namespace was born at Facebook around 2010 as a way to turn any page into a rich graph object, and the rest of the industry adopted it as the de facto share-card vocabulary: X, LinkedIn, WhatsApp, Slack, Discord and iMessage all read og:title, og:description and og:image first. Twitter kept its own namespace but falls back to og: values for anything not explicitly provided.",
            "Consumption is crawler-based, not user-based: when someone pastes your URL, the platform's bot fetches the page once and caches the card. That is why editing the tags does nothing until you force a refresh in the platform's debugger — Facebook's Sharing Debugger, X's Card Validator, LinkedIn's Post Inspector — and why changing an image without changing its filename often keeps serving the old picture from cache.",
            "The og:url property does more than it looks: it declares the canonical identity of the shared object, and most platforms treat it as the key under which like counts and share aggregates are grouped. Keeping it identical to your rel=canonical avoids splitting engagement across URL variants of the same page.",
          ],
        },
        {
          heading: "The 1200×630 image and its failure modes",
          paragraphs: [
            "The 1.91:1 ratio exists because Facebook's link thumbnail established it, and everything else followed; 1200×630 is the size that crops cleanly on every major surface. Images outside the ratio get center-cropped, and the crop is what loses your text — keep any words on the image inside the central safe area rather than hugging the edges.",
            "Weight matters more than dimensions in practice: many platforms simply refuse to fetch images above a few MB, and a slow image means the card goes out with a blank placeholder. An absolute URL is mandatory — the crawler fetches the page and then the image, and a relative path resolves against the wrong context or not at all.",
            "og:image:alt is the most-skipped and cheapest win: it is what screen readers announce when the card is shared, and some platforms expose it as fallback text if the image fails to load. Writing it is one sentence; skipping it means every assistive user of every share gets an empty description.",
          ],
        },
        {
          heading: "Why both namespaces, and what the preview does not promise",
          paragraphs: [
            "The honest minimum is the og: set plus twitter:card, twitter:site and optionally twitter:creator — twitter:title, twitter:description and twitter:image are pure duplication on most sites. The one twitter: tag that carries irreplaceable information is twitter:card: it selects summary_large_image (a wide photo card) versus summary (a small square), which no og: equivalent decides.",
            "og:type matters for categorization more than display: article signals news/blog content (pair it with article:published_time when you have it), product marks e-commerce detail pages, and website is the default for everything else. Platforms use it to pick how the link is contextualized in feeds and messaging apps.",
            "The live preview approximates a large-image and a summary card with local rendering, but every platform truncates, crops and lays out differently — treat it as a sanity check for text length and image presence, then confirm the real thing in each platform's official debugger before the page ships.",
          ],
        },
      ],
    },
    zh: {
      name: "Open Graph 生成器",
      tagline: "生成完整的 og: 与 twitter: 标签组合,粘贴前即可实时预览社交分享卡片效果。",
      intro: [
        "链接被分享到 X、Facebook、LinkedIn、Slack 或 iMessage 时,预览卡片几乎完全由 Open Graph 标签构成,twitter: 标签负责补齐缺口。这个生成器同时输出两套:og:title、og:type、og:url、og:image、og:image:alt、og:site_name、og:description、og:locale,外加 twitter:card、twitter:site 和 twitter:creator。",
        "缺少 twitter: 标签时,多数平台会回退到 og: 标签,所以只需在有差异的地方额外补充。实时预览可模拟大图卡片和小图卡片的展示效果。",
      ],
      steps: [
        "填写页面标题、描述和规范 URL。",
        "添加分享图片 URL(1200 × 630 像素全平台通用),选择卡片类型。",
        "把标签复制进 <head>,查看下方的预览卡片。",
      ],
      faqs: [
        {
          q: "og:image 用多大的图?",
          a: "1200 × 630 像素(1.91:1)是 Facebook、X 和 LinkedIn 的安全尺寸。文件控制在 8 MB 以内,使用绝对 URL,并记得加 og:image:alt 保证可访问性。",
        },
        {
          q: "og: 和 twitter: 标签都要写吗?",
          a: "twitter:title、twitter:description、twitter:image 缺失时会回退到对应的 og: 标签。在 og: 基础上,通常只需补 twitter:card(summary 或 summary_large_image)、twitter:site,可选 twitter:creator。",
        },
        {
          q: "og:type 该选哪个?",
          a: "首页和普通页面用 website,新闻和博客文章用 article(可加 article:published_time),电商详情页用 product。类型会影响部分平台对链接的分类方式。",
        },
      ],
      deepDive: [
        {
          heading: "平台到底怎么消费这些标签",
          paragraphs: [
            "Open Graph 这个命名空间大约诞生于 2010 年的 Facebook,目的是把任意网页变成一张“图对象”,随后整个行业把它采纳为事实上的分享卡词汇表:X、LinkedIn、WhatsApp、Slack、Discord 和 iMessage 都最先读取 og:title、og:description 和 og:image。Twitter 保留了自己的命名空间,但没写明的字段会回退到 og: 的值。",
            "消费方式是爬虫式的,不是用户式的:有人粘贴你的链接时,平台机器人会抓取一次页面并缓存卡片。这就是为什么改了标签也不会立即生效——必须去各平台的调试器(Facebook Sharing Debugger、X Card Validator、LinkedIn Post Inspector)强制刷新——也是为什么换了图片却没换文件名时,缓存里的旧图会一直显示。",
            "og:url 的作用比看上去大:它声明分享对象的规范身份,多数平台把它当作点赞数、分享数等互动数据归组的主键。让它与 rel=canonical 保持一致,才能避免同一页面的互动数据被分散到各种 URL 变体上。",
          ],
        },
        {
          heading: "1200×630 的图,以及它怎么出问题",
          paragraphs: [
            "1.91:1 这个比例源自 Facebook 的链接缩略图,后来其他平台纷纷跟进;1200×630 是在所有主流界面上都能干净裁切的尺寸。比例不符的图会被中心裁切,被裁掉的正是你的文案——图上的文字请放在中央安全区,别贴边。",
            "实践里文件的重量比尺寸更要命:不少平台对几 MB 以上的图干脆拒绝抓取,图加载慢则卡片带着空白占位符发出去。绝对 URL 是硬性要求——爬虫先抓页面再抓图,相对路径会解析到错误的位置或干脆解析不了。",
            "og:image:alt 是最常被跳过、成本最低的一步:分享卡片被读屏软件朗读时念的就是它,某些平台在图片加载失败时也会拿它当兜底文字。写它只是一句话的事;不写,则每次分享对所有辅助功能用户都等于一张没有描述的图。",
          ],
        },
        {
          heading: "为什么两套命名空间都要,以及预览不承诺什么",
          paragraphs: [
            "诚实的最小集合是 og: 全套,加上 twitter:card、twitter:site,可选 twitter:creator——twitter:title、twitter:description、twitter:image 在多数网站上纯属重复。唯一不可替代的 twitter: 标签是 twitter:card:它决定用 summary_large_image(宽幅大图卡)还是 summary(小方块),这一点没有 og: 等价物能决定。",
            "og:type 对分类的影响大于对展示的影响:article 表示新闻/博客内容(有的话配 article:published_time),product 标记电商详情页,其余默认 website。平台据此决定在信息流和聊天应用里如何语境化这条链接。",
            "实时预览用本地渲染近似大图卡和 summary 卡的样子,但每个平台的截断、裁切和排版都不一样——把它当成文字长度和图片存在性的体检,上线前再到各平台官方调试器里确认真实效果。",
          ],
        },
      ],
    },
    ja: {
      name: "Open Graph 生成",
      tagline: "og: と twitter: の完全なセットを生成し、貼り付ける前にシェアカードのプレビューをリアルタイムで確認できます。",
      intro: [
        "リンクが X・Facebook・LinkedIn・Slack・iMessage でシェアされると、プレビューカードはほぼ Open Graph タグから構成され、twitter: タグが不足分を補います。このジェネレーターは og:title・og:type・og:url・og:image・og:image:alt・og:site_name・og:description・og:locale に加え、twitter:card・twitter:site・twitter:creator も出力します。",
        "twitter: タグが欠けていても多くのプラットフォームは og: タグにフォールバックするため、差分だけ追加すれば十分です。ライブプレビューで大型画像カードと summary カードの表示を確認できます。",
      ],
      steps: [
        "ページのタイトル・説明・正規 URL を入力します。",
        "シェア画像の URL(1200 × 630px が無難)を追加し、カードタイプを選びます。",
        "タグを <head> にコピーし、プレビューカードを確認します。",
      ],
      faqs: [
        {
          q: "og:image の推奨サイズは?",
          a: "1200 × 630px(1.91:1)が Facebook・X・LinkedIn 共通の安全なサイズです。ファイルは 8MB 未満、絶対 URL を使い、アクセシビリティのため og:image:alt も必ず設定してください。",
        },
        {
          q: "og: と twitter: の両方が必要?",
          a: "twitter:title・twitter:description・twitter:image は og: の値にフォールバックします。og: セットに加えて必要なのは twitter:card(summary または summary_large_image)、twitter:site、任意で twitter:creator だけです。",
        },
        {
          q: "og:type はどれを選ぶ?",
          a: "トップページや汎用ページは website、ニュースやブログ記事は article(可能なら article:published_time を追加)、EC の商品ページは product を使います。タイプによってプラットフォームの分類が変わります。",
        },
      ],
      deepDive: [
        {
          heading: "プラットフォームはどうタグを消費するか",
          paragraphs: [
            "Open Graph 名前空間は 2010 年ごろ Facebook で生まれ、任意のページをリッチなグラフオブジェクトに変える仕組みとして設計されました。やがて業界全体が事実上のシェアカード語彙として採用します。X、LinkedIn、WhatsApp、Slack、Discord、iMessage はどれもまず og:title・og:description・og:image を読みます。Twitter は独自名前空間を保っていますが、未指定の項目は og: の値へフォールバックします。",
            "消費はユーザーではなくクローラー主導です。誰かが URL を貼ると、プラットフォームのボットが一度ページを取得し、カードをキャッシュします。だからタグを直しても、プラットフォームのデバッガー(Facebook Sharing Debugger、X Card Validator、LinkedIn Post Inspector)で強制更新するまで反映されません。画像を差し替えてファイル名を変えないと、キャッシュの古い画像が出続けるのも同じ理由です。",
            "og:url の役割は見た目以上に重く、共有オブジェクトの正規の身元を宣言します。多くのプラットフォームはいいね数やシェア数の集計をこの値でグルーピングします。rel=canonical と一致させておけば、同一ページのエンゲージメントが URL 変種に分断されません。",
          ],
        },
        {
          heading: "1200×630 の画像とその失敗パターン",
          paragraphs: [
            "1.91:1 の比率は Facebook のリンクサムネイルが定めて他が追従したもので、1200×630 は主要なあらゆる場所で綺麗にクロップできるサイズです。比率から外れると中央で切り取られ、切られるのはあなたのコピー。画像上の文字は端に寄せず、中央の安全域に置いてください。",
            "実務では重さが寸法より問題になります。数 MB を超える画像は取得を拒むプラットフォームが多く、画像が遅いとカードは空のプレースホルダーのまま出ていきます。絶対 URL は必須——クローラーは先にページを取り、次に画像を取りに来ます。相対パスは誤った基準で解決されるか、解決されません。",
            "og:image:alt は最も省略され最も安く済む改善です。カードが共有されたときスクリーンリーダーが読み上げるのがこれで、画像の読み込みに失敗したときの代替テキストに使うプラットフォームもあります。書くのは一文。書かなければ、あらゆる共有のすべての補助機能ユーザーが説明のないカードを受け取ります。",
          ],
        },
        {
          heading: "二つの名前空間が必要な理由と、プレビューが約束しないこと",
          paragraphs: [
            "誠実な最小構成は og: セットに twitter:card・twitter:site、任意で twitter:creator を足すもの。twitter:title・twitter:description・twitter:image は多くのサイトで純粋な重複です。唯一、代替の利かない twitter: タグが twitter:card で、summary_large_image(横長の大画像カード)か summary(小さな正方形)かを選びます。og: 側にはこの決定に相当するものがありません。",
            "og:type は表示より分類に効きます。article はニュースやブログ(あれば article:published_time を併記)、product は EC の商品ページ、それ以外は既定の website。プラットフォームはこの値でフィードやメッセージアプリでの扱いを決めます。",
            "ライブプレビューは大画像カードと summary カードをローカル描画で近似しますが、切り詰めもクロップも面付けもプラットフォームごとに違います。文字量と画像の有無の健全性チェックとして使い、公開前に各公式デバッガーで本物を確認してください。",
          ],
        },
      ],
    },
    es: {
      name: "Generador de Open Graph",
      tagline:
        "Crea el set completo de etiquetas og: y twitter: y mira la vista previa de la tarjeta en vivo antes de pegar nada.",
      intro: [
        "Cuando compartes un enlace en X, Facebook, LinkedIn, Slack o iMessage, la tarjeta se construye casi por completo con etiquetas Open Graph, y las twitter: rellenan los huecos. Este generador emite ambos espacios de nombres: og:title, og:type, og:url, og:image, og:image:alt, og:site_name, og:description y og:locale, más twitter:card, twitter:site y twitter:creator.",
        "La mayoría de plataformas recurren a las og: cuando falta una twitter:, así que solo añade las extra donde difieran. La vista previa en vivo aproxima cómo se ve una tarjeta de imagen grande o un summary.",
      ],
      steps: [
        "Introduce el título, la descripción y la URL canonical de la página.",
        "Añade la URL de la imagen para compartir (1200 × 630 px sirve en todas) y elige el tipo de tarjeta.",
        "Copia las etiquetas a tu <head> y revisa la tarjeta de vista previa.",
      ],
      faqs: [
        {
          q: "¿Qué tamaño debe tener og:image?",
          a: "1200 × 630 píxeles (1.91:1) es el valor seguro en Facebook, X y LinkedIn. Mantén el archivo por debajo de 8 MB, usa una URL absoluta y añade siempre og:image:alt por accesibilidad.",
        },
        {
          q: "¿Necesito las etiquetas og: y twitter: a la vez?",
          a: "twitter:title, twitter:description y twitter:image recurren a sus equivalentes og:. Sobre el set og: solo necesitas twitter:card (summary o summary_large_image), twitter:site y, opcionalmente, twitter:creator.",
        },
        {
          q: "¿Qué og:type elijo?",
          a: "website para portales y páginas genéricas, article para noticias y posts (añade article:published_time si puedes), y product para fichas de e-commerce. El tipo cambia cómo algunas plataformas clasifican el enlace.",
        },
      ],
      deepDive: [
        {
          heading: "Cómo consumen realmente las plataformas estas etiquetas",
          paragraphs: [
            "El espacio de nombres Open Graph nació en Facebook hacia 2010 como forma de convertir cualquier página en un objeto rico del grafo, y el resto de la industria lo adoptó como vocabulario de facto de las tarjetas de compartir: X, LinkedIn, WhatsApp, Slack, Discord e iMessage leen primero og:title, og:description y og:image. Twitter mantuvo su propio espacio, pero los campos no especificados caen a los valores og:.",
            "El consumo lo hace un rastreador, no el usuario: cuando alguien pega tu URL, el bot de la plataforma descarga la página una vez y cachea la tarjeta. Por eso editar las etiquetas no cambia nada hasta que fuerzas la actualización en el depurador de la plataforma — Sharing Debugger de Facebook, Card Validator de X, Post Inspector de LinkedIn — y por qué cambiar la imagen sin cambiar el nombre del archivo suele seguir sirviendo la vieja desde la caché.",
            "og:url hace más de lo que parece: declara la identidad canónica del objeto compartido y la mayoría de plataformas lo tratan como la clave bajo la que se agrupan me gusta y agregados de compartidos. Mantenerlo idéntico a tu rel=canonical evita repartir la interacción entre variantes de URL de la misma página.",
          ],
        },
        {
          heading: "La imagen de 1200×630 y sus modos de fallo",
          paragraphs: [
            "La proporción 1,91:1 existe porque la miniatura de enlaces de Facebook la estableció y todos los demás la siguieron; 1200×630 es el tamaño que se recorta limpio en cada superficie principal. Las imágenes fuera de proporción se recortan al centro, y lo que pierde el recorte es tu texto — deja las palabras de la imagen dentro de la zona central de seguridad, no pegadas al borde.",
            "En la práctica el peso importa más que las dimensiones: muchas plataformas se niegan directamente a descargar imágenes de más de unos MB, y una imagen lenta hace que la tarjeta salga con un espacio en blanco. La URL absoluta es obligatoria — el rastreador descarga la página y después la imagen, y una ruta relativa se resuelve contra el contexto equivocado o no se resuelve.",
            "og:image:alt es la mejora más saltada y más barata: es lo que anuncian los lectores de pantalla cuando se comparte la tarjeta, y algunas plataformas lo exponen como texto de respaldo si la imagen falla. Escribirlo cuesta una frase; saltárselo significa que cada usuario asistido de cada comparte recibe una descripción vacía.",
          ],
        },
        {
          heading: "Por qué los dos espacios de nombres, y qué no promete la vista previa",
          paragraphs: [
            "El mínimo honesto es el set og: más twitter:card, twitter:site y opcionalmente twitter:creator — twitter:title, twitter:description y twitter:image son pura duplicación en la mayoría de sitios. La única etiqueta twitter: con información insustituible es twitter:card: elige summary_large_image (tarjeta de foto ancha) o summary (cuadrado pequeño), y no hay equivalente og: que decida eso.",
            "og:type importa para categorizar más que para mostrar: article señala contenido de prensa o blog (junto a article:published_time si lo tienes), product marca fichas de e-commerce y website es el valor por defecto. Las plataformas lo usan para contextualizar el enlace en feeds y apps de mensajería.",
            "La vista previa en vivo aproxima una tarjeta de imagen grande y una summary con renderizado local, pero cada plataforma trunca, recorta y compone distinto — tómala como comprobación de longitud de texto y presencia de imagen, y confirma lo real en el depurador oficial de cada plataforma antes de publicar.",
          ],
        },
      ],
    },
    pt: {
      name: "Gerador de Open Graph",
      tagline:
        "Monte o conjunto completo de tags og: e twitter: e veja a prévia do cartão de compartilhamento em tempo real antes de colar.",
      intro: [
        "Quando seu link é compartilhado no X, Facebook, LinkedIn, Slack ou iMessage, o cartão de prévia é montado quase inteiramente com tags Open Graph, e as twitter: preenchem as lacunas. Este gerador emite os dois namespaces: og:title, og:type, og:url, og:image, og:image:alt, og:site_name, og:description e og:locale, além de twitter:card, twitter:site e twitter:creator.",
        "A maioria das plataformas volta para as tags og: quando falta uma twitter:, então só vale adicionar as extras onde houver diferença. A prévia em tempo real aproxima como fica um cartão de imagem grande ou um summary.",
      ],
      steps: [
        "Informe o título, a descrição e a URL canonical da página.",
        "Adicione a URL da imagem de compartilhamento (1200 × 630 px funciona em toda parte) e escolha o tipo de cartão.",
        "Copie as tags para o seu <head> e confira o cartão de prévia.",
      ],
      faqs: [
        {
          q: "Qual tamanho usar no og:image?",
          a: "1200 × 630 pixels (1,91:1) é o padrão seguro no Facebook, X e LinkedIn. Mantenha o arquivo abaixo de 8 MB, use URL absoluta e sempre inclua og:image:alt por acessibilidade.",
        },
        {
          q: "Preciso das tags og: e twitter: juntas?",
          a: "twitter:title, twitter:description e twitter:image voltam para os equivalentes og:. Sobre o conjunto og: você só precisa de twitter:card (summary ou summary_large_image), twitter:site e, opcionalmente, twitter:creator.",
        },
        {
          q: "Qual og:type escolher?",
          a: "website para homepages e páginas genéricas, article para notícias e posts de blog (adicione article:published_time se puder) e product para páginas de e-commerce. O tipo muda como algumas plataformas categorizam o link.",
        },
      ],
      deepDive: [
        {
          heading: "Como as plataformas realmente consomem essas tags",
          paragraphs: [
            "O namespace Open Graph nasceu no Facebook por volta de 2010 como forma de transformar qualquer página num objeto rico do grafo, e o resto da indústria o adotou como vocabulário de fato dos cartões de compartilhamento: X, LinkedIn, WhatsApp, Slack, Discord e iMessage leem primeiro og:title, og:description e og:image. O Twitter manteve o próprio namespace, mas os campos não especificados caem nos valores og:.",
            "O consumo é feito por rastreador, não pelo usuário: quando alguém cola sua URL, o bot da plataforma baixa a página uma vez e cacheia o cartão. Por isso editar as tags não muda nada até você forçar a atualização no depurador da plataforma — Sharing Debugger do Facebook, Card Validator do X, Post Inspector do LinkedIn — e por que trocar a imagem sem mudar o nome do arquivo costuma seguir servindo a antiga do cache.",
            "og:url faz mais do que aparenta: declara a identidade canônica do objeto compartilhado, e a maioria das plataformas a trata como a chave sob a qual curtidas e agregados de compartilhamentos são agrupados. Mantê-la idêntica ao rel=canonical evita repartir a interação entre variantes de URL da mesma página.",
          ],
        },
        {
          heading: "A imagem de 1200×630 e seus modos de falha",
          paragraphs: [
            "A proporção 1,91:1 existe porque a miniatura de links do Facebook a estabeleceu e todos os demais seguiram; 1200×630 é o tamanho que corta limpo em toda superfície principal. Imagens fora da proporção são cortadas no centro, e o que o corte perde é o seu texto — deixe as palavras da imagem dentro da zona central de segurança, não coladas nas bordas.",
            "Na prática, o peso importa mais que as dimensões: muitas plataformas se recusam a baixar imagens acima de poucos MB, e uma imagem lenta faz o cartão sair com um espaço em branco. A URL absoluta é obrigatória — o rastreador busca a página e depois a imagem, e um caminho relativo resolve no contexto errado ou não resolve.",
            "og:image:alt é a melhoria mais ignorada e mais barata: é o que os leitores de tela anunciam quando o cartão é compartilhado, e algumas plataformas a expõem como texto de reserva se a imagem falha. Escrevê-la custa uma frase; deixá-la de fora significa que cada usuário assistido de cada compartilhamento recebe uma descrição vazia.",
          ],
        },
        {
          heading: "Por que os dois namespaces, e o que a prévia não promete",
          paragraphs: [
            "O mínimo honesto é o conjunto og: mais twitter:card, twitter:site e opcionalmente twitter:creator — twitter:title, twitter:description e twitter:image são pura duplicação na maioria dos sites. A única tag twitter: com informação insubstituível é a twitter:card: ela escolhe summary_large_image (cartão de foto larga) ou summary (quadrado pequeno), e não há equivalente og: que decida isso.",
            "og:type importa mais para categorizar do que para exibir: article sinaliza conteúdo de notícia ou blog (acompanhe com article:published_time quando houver), product marca páginas de e-commerce, e website é o padrão. As plataformas o usam para contextualizar o link em feeds e apps de mensagens.",
            "A prévia em tempo real aproxima um cartão de imagem grande e um summary com renderização local, mas cada plataforma trunca, corta e compõe de um jeito — trate-a como verificação de comprimento de texto e presença de imagem, e confirme o real no depurador oficial de cada plataforma antes de publicar.",
          ],
        },
      ],
    },
  },
});
