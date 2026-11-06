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
          heading: "How platforms actually consume OG tags",
          paragraphs: [
            "Open Graph is not read by browsers — it is read by the platform's crawler the moment someone pastes your link. That crawler fetches the page, extracts the og: properties, caches the card, and shows it to everyone who sees the share. The user who shares your link never opens the page's HTML; the tags are the entire interface between your content and the feed.",
            "The consequence that surprises people is caching. Platforms keep the fetched card, sometimes for weeks, so replacing an image while keeping the same filename changes nothing in the feed. The remedies are unglamorous: bump the filename, or force a scrape through the platform's debugger — Facebook Sharing Debugger, X Card Validator, LinkedIn Post Inspector. If a card looks stale, it is the cache, not your markup.",
            "Fallback rules explain most tag questions: twitter:title, twitter:description and twitter:image fall back to their og: equivalents, so duplicating them adds maintenance without benefit. The genuine exceptions are twitter:card, which selects the large-image layout rather than a small square, and platforms with their own quirks — some messengers prefer other tags for size hints. Emitting both namespaces from one place keeps the gaps closed.",
          ],
        },
        {
          heading: "The image: one asset, four platforms, one ratio",
          paragraphs: [
            "The 1200×630 ratio (1.91:1) is not arbitrary — it is the shape Facebook standardized and the others adopted, so one image works on Facebook, X, LinkedIn and most messengers. Design for the safe area: platforms crop edges differently, so keep faces and text away from the borders, and expect the top or bottom strip to disappear on some layouts.",
            "og:image needs an absolute URL, a file under roughly 8 MB, and — the most skipped tag — og:image:alt. Screen readers announce the alt on every share; its absence is an accessibility failure that no visual test will ever catch. Text baked into the image should be large: cards render at thumbnail size in feeds, and a legible-on-desktop line becomes noise at share size.",
            "og:url should carry the canonical address, matching the rel=canonical tag. Shares attribute engagement to the URL you declare, so an og:url that disagrees with your canonical splits the same page's share counts and preview state across two addresses.",
          ],
        },
        {
          heading: "og:type, locale, and what this preview can and cannot show",
          paragraphs: [
            "og:type routes the card into a category: website for homepages and generic pages, article for news and blog posts (with article:published_time when available), product for e-commerce detail pages. The type mainly changes how platforms categorize and sometimes what extra fields they read — an article card can surface timestamps, a product card can integrate with platform shops.",
            "og:locale declares the content's language in a format like en_US; on multilingual sites it should vary per page alongside hreflang, not sit fixed in a shared template. Both namespaces this generator emits are ordinary meta tags: nothing runs, nothing loads, so the tags are safe to paste anywhere in your head.",
            "The live preview here approximates the layout but is honest about its limits: every platform truncates titles and descriptions at different lengths, renders the image at different crops, and changes its rules without notice. Treat the preview as a layout check, then validate the final URL through the official debuggers — which also purge the cache described above. Everything in this generator runs locally; your URLs and copy are not uploaded anywhere.",
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
          heading: "平台实际上是怎么消费 OG 标签的",
          paragraphs: [
            "Open Graph 不是给浏览器读的——是有人贴出你的链接时,由平台的爬虫来读。那只爬虫抓取页面、抽取 og: 属性、缓存卡片,然后展示给所有看到这条分享的人。分享链接的用户根本不会打开页面 HTML;这些标签就是你与信息流之间的全部接口。",
            "最让人意外的后果是缓存。平台会把抓到的卡片存上一段时间,有时长达数周,所以只换图片文件、不改文件名,信息流里什么都不会变。补救办法毫不光鲜:换文件名,或用平台调试器强制重新抓取——Facebook Sharing Debugger、X Card Validator、LinkedIn Post Inspector。卡片看着陈旧,那是缓存的问题,不是你标记写错了。",
            "回退规则能解释大部分标签疑问:twitter:title、twitter:description、twitter:image 缺失时都会回退到对应的 og: 标签,复制一份只是徒增维护成本。真正的例外是 twitter:card——它决定用大图版式还是小方块;以及个别有自己怪癖的平台——有的通讯工具用别的标签判断尺寸。从同一处输出两个命名空间,才能把缺口全部关上。",
          ],
        },
        {
          heading: "图片:一份素材,四个平台,一个比例",
          paragraphs: [
            "1200×630 的比例(1.91:1)不是随便选的——这是 Facebook 定下、其余平台跟进的标准形状,所以一张图在 Facebook、X、LinkedIn 和大多数通讯工具上都可用。设计时留出安全区:各平台裁切边缘的方式不同,人脸和文字别贴边,并做好上下某一条边在某些版式里消失的心理准备。",
            "og:image 需要绝对 URL、约 8 MB 以内的文件,以及——最常被跳过的——og:image:alt。屏幕阅读器在每次分享时都会朗读 alt;缺了它是无障碍缺陷,而任何视觉测试都发现不了。烙进图里的文字要够大:卡片在信息流里以缩略图尺寸渲染,桌面上看得清的一行字,到分享尺寸就成了噪音。",
            "og:url 应该填规范地址,与 rel=canonical 标签保持一致。分享互动会记在你声明的 URL 名下,og:url 与 canonical 不一致,会把同一个页面的分享数和预览状态拆到两个地址上。",
          ],
        },
        {
          heading: "og:type、og:locale,以及这份预览能做什么、不能做什么",
          paragraphs: [
            "og:type 把卡片归入类别:首页和普通页面用 website,新闻和博客文章用 article(能提供就加 article:published_time),电商详情页用 product。类型主要影响平台如何归类、以及是否读取额外字段——article 卡片可以露出时间戳,product 卡片可以接入平台的商店功能。",
            "og:locale 用 en_US 这类格式声明内容语言;多语言站点上它应当随页面与 hreflang 一起变化,而不是固定在共享模板里。本生成器输出的两个命名空间都是普通 meta 标签:不执行任何东西、不加载任何东西,所以贴进 head 任何位置都安全。",
            "这里的实时预览是对版式的近似,而且诚实说明局限:各平台截断标题和描述的长度不同、图片裁切不同、规则还会说变就变。把预览当作版式检查,最终 URL 仍要走一遍官方调试器——顺带把上面说的缓存清掉。本生成器全部在本地运行:你的 URL 和文案不会被上传到任何地方。",
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
          heading: "プラットフォームは OG タグをどう消費するのか",
          paragraphs: [
            "Open Graph を読むのはブラウザではありません。誰かがあなたのリンクを貼った瞬間、プラットフォームのクローラーが読みます。そのクローラーはページを取得し、og: プロパティを抽出し、カードをキャッシュし、そのシェアを見る全員に表示します。シェアした本人はページの HTML を開きません。タグこそが、あなたのコンテンツとフィードの間の全インターフェースです。",
            "人を驚かせる帰結がキャッシュです。プラットフォームは取得済みカードを、場合によっては数週間保持するため、ファイル名を変えずに画像だけ差し替えてもフィードでは何も変わりません。补救は地味です。ファイル名を上げるか、プラットフォームのデバッガー——Facebook Sharing Debugger、X Card Validator、LinkedIn Post Inspector——で強制再取得するか。カードが古く見えるのは、マークアップではなくキャッシュのせいです。",
            "フォールバック規則がタグの疑問の大半を説明します。twitter:title・twitter:description・twitter:image は og: の値にフォールバックするので、複製しても維持コストが増えるだけです。本物の例外は twitter:card——大型画像レイアウトか小さい正方形かを選ぶ——と、独自の癖を持つ一部のプラットフォームで、あるメッセンジャーはサイズヒントに別のタグを好みます。両名前空間を一箇所から出力すれば、隙間は閉じたままです。",
          ],
        },
        {
          heading: "画像:一つの素材、四つのプラットフォーム、一つの比率",
          paragraphs: [
            "1200×630 の比率(1.91:1)は恣意的なものではありません。Facebook が標準化し他が追随した形状で、この 1 枚が Facebook・X・LinkedIn・多くのメッセンジャーで通用します。デザインは安全域で:プラットフォームごとに端の切り方が違い、顔や文字は縁から離し、上下の帯が一部レイアウトで消える前提で作ります。",
            "og:image には絶対 URL、約 8MB 未満のファイル、そして最も飛ばされがちな og:image:alt が必要です。スクリーンリーダーはシェアごとに alt を読み上げます。alt の欠落はアクセシビリティの失敗であり、視覚テストでは決して検出されません。画像に焼き込む文字は大きく:カードはフィード内ではサムネイルサイズで描画され、デスクトップで読める 1 行はシェアサイズではノイズになります。",
            "og:url には正規アドレスを入れ、rel=canonical と一致させてください。シェアのエンゲージメントはあなたが宣言した URL に帰属するので、og:url が canonical と食い違うと、同じページのシェア数とプレビュー状態が 2 つのアドレスに分断されます。",
          ],
        },
        {
          heading: "og:type と og:locale、そしてこのプレビューにできること・できないこと",
          paragraphs: [
            "og:type はカードをカテゴリに振り分けます。トップページや汎用ページは website、ニュースやブログ記事は article(可能なら article:published_time を添える)、EC の商品ページは product。タイプが主に変えるのはプラットフォームでの分類と、追加フィールドを読むかどうかです——article カードはタイムスタンプを出せ、product カードはプラットフォームのショップと統合できます。",
            "og:locale は en_US のような形式でコンテンツの言語を宣言します。多言語サイトでは共有テンプレートに固定せず、hreflang と同じくページごとに変えるべきものです。このジェネレーターが出力する両名前空間は普通のメタタグで、実行も読み込みもしないので、head のどこに貼っても安全です。",
            "ここのライブプレビューはレイアウトの近似であり、限界も正直です。プラットフォームごとにタイトル・説明の切る長さが違い、画像の刈り込みが違い、規則は予告なく変わります。プレビューはレイアウト確認と割り切り、最終 URL は公式デバッガーで検証してください——前述のキャッシュを退避する効果もあります。このジェネレーターはすべてローカルで動き、URL も文章もどこにも送信されません。",
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
          heading: "Cómo consumen las plataformas las etiquetas OG",
          paragraphs: [
            "Open Graph no lo leen los navegadores: lo lee el rastreador de la plataforma en el momento en que alguien pega tu enlace. Ese rastreador obtiene la página, extrae las propiedades og:, almacena la tarjeta en caché y la muestra a todos los que ven el compartido. Quien comparte tu enlace nunca abre el HTML de la página; las etiquetas son toda la interfaz entre tu contenido y el feed.",
            "La consecuencia que sorprende es el caché. Las plataformas guardan la tarjeta obtenida, a veces semanas, así que sustituir la imagen sin cambiar el nombre de archivo no cambia nada en el feed. Los remedios son poco glamorosos: sube el nombre de archivo, o fuerza un nuevo rastreo con el depurador de la plataforma — Facebook Sharing Debugger, X Card Validator, LinkedIn Post Inspector. Si una tarjeta se ve vieja, es el caché, no tu marcado.",
            "Las reglas de reserva explican la mayoría de las dudas sobre etiquetas: twitter:title, twitter:description y twitter:image recurren a sus equivalentes og:, así que duplicarlas añade mantenimiento sin beneficio. Las excepciones reales son twitter:card, que elige el diseño de imagen grande frente al cuadrado pequeño, y las plataformas con manías propias — algunos mensajeros prefieren otras etiquetas como pista de tamaño. Emitir ambos espacios de nombres desde un único sitio mantiene los huecos cerrados.",
          ],
        },
        {
          heading: "La imagen: un recurso, cuatro plataformas, una proporción",
          paragraphs: [
            "La proporción 1200×630 (1.91:1) no es arbitraria — es la forma que estandarizó Facebook y que adoptaron los demás, así que una imagen sirve en Facebook, X, LinkedIn y la mayoría de los mensajeros. Diseña con zona segura: las plataformas recortan los bordes de distinta manera, mantén rostros y texto lejos de los márgenes y asume que alguna franja superior o inferior desaparecerá en ciertos diseños.",
            "og:image necesita una URL absoluta, un archivo por debajo de unos 8 MB y — la etiqueta que más se salta — og:image:alt. Los lectores de pantalla anuncian el alt en cada compartido; su ausencia es un fallo de accesibilidad que ninguna prueba visual detectará jamás. El texto incrustado en la imagen debe ser grande: las tarjetas se renderizan en miniatura en los feeds, y una línea legible en escritorio se convierte en ruido al tamaño de compartido.",
            "og:url debe llevar la dirección canonical, coincidiendo con la etiqueta rel=canonical. Los compartidos atribuyen la interacción a la URL que declaras, así que un og:url que discrepa de tu canonical reparte los recuentos de compartido y el estado de la vista previa de una misma página entre dos direcciones.",
          ],
        },
        {
          heading: "og:type, og:locale, y lo que esta vista prevía puede y no puede mostrar",
          paragraphs: [
            "og:type enruta la tarjeta a una categoría: website para portadas y páginas genéricas, article para noticias y entradas (con article:published_time cuando esté disponible), product para fichas de comercio electrónico. El tipo cambia sobre todo cómo clasifican las plataformas y a veces qué campos extra leen — una tarjeta article puede mostrar marcas de tiempo, una product puede integrarse con las tiendas de la plataforma.",
            "og:locale declara el idioma del contenido en un formato tipo en_US; en sitios multilingües debe variar por página junto con hreflang, no quedarse fijo en una plantilla compartida. Ambos espacios de nombres que emite este generador son meta etiquetas corrientes: nada se ejecuta, nada se carga, así que son seguras de pegar en cualquier parte del head.",
            "La vista previa en vivo aproxima el diseño y es honesta con sus límites: cada plataforma trunca títulos y descripciones a longitudes distintas, muestra la imagen con recortes distintos y cambia sus reglas sin avisar. Trata la vista previa como una comprobación de diseño y valida después la URL final con los depuradores oficiales — que además purgan el caché descrito antes. Todo lo de este generador corre en local; tus URL y textos no se suben a ningún sitio.",
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
          heading: "Como as plataformas realmente consomem as tags OG",
          paragraphs: [
            "Open Graph não é lido por navegadores — é lido pelo rastreador da plataforma no instante em que alguém cola seu link. Esse rastreador busca a página, extrai as propriedades og:, guarda o cartão em cache e o mostra a todos que virem o compartilhamento. Quem compartilha seu link nunca abre o HTML da página; as tags são toda a interface entre seu conteúdo e o feed.",
            "A consequência que surpreende é o cache. As plataformas guardam o cartão buscado, às vezes por semanas, então trocar a imagem mantendo o mesmo nome de arquivo não muda nada no feed. Os remédios são sem glamour: suba o nome do arquivo, ou force um novo rastreio pelo depurador da plataforma — Facebook Sharing Debugger, X Card Validator, LinkedIn Post Inspector. Se um cartão parece velho, é o cache, não sua marcação.",
            "As regras de fallback explicam a maioria das dúvidas sobre tags: twitter:title, twitter:description e twitter:image voltam aos equivalentes og:, então duplicá-las soma manutenção sem benefício. As exceções reais são twitter:card, que escolhe o layout de imagem grande em vez do quadradinho, e plataformas com manias próprias — alguns mensageiros preferem outras tags como dica de tamanho. Emitir os dois namespaces de um só lugar mantém as lacunas fechadas.",
          ],
        },
        {
          heading: "A imagem: um recurso, quatro plataformas, uma proporção",
          paragraphs: [
            "A proporção 1200×630 (1,91:1) não é arbitrária — é a forma que o Facebook padronizou e os outros adotaram, então uma imagem serve no Facebook, no X, no LinkedIn e na maioria dos mensageiros. Desenhe pensando na área segura: as plataformas cortam as bordas de maneiras diferentes, mantenha rostos e texto longe das margens e aceite que alguma faixa superior ou inferior desaparecerá em certos layouts.",
            "og:image precisa de URL absoluta, arquivo abaixo de uns 8 MB e — a tag mais pulada — og:image:alt. Leitores de tela anunciam o alt a cada compartilhamento; a ausência dele é uma falha de acessibilidade que nenhum teste visual vai pegar. Texto embutido na imagem deve ser grande: os cartões são renderizados em tamanho de miniatura nos feeds, e uma linha legível no desktop vira ruído no tamanho do compartilhamento.",
            "og:url deve carregar o endereço canonical, coincidindo com a tag rel=canonical. Compartilhamentos atribuem engajamento à URL que você declara, então um og:url que discorda do seu canonical divide a contagem de compartilhamentos e o estado da prévia da mesma página entre dois endereços.",
          ],
        },
        {
          heading: "og:type, og:locale, e o que esta prévia pode e não pode mostrar",
          paragraphs: [
            "og:type encaminha o cartão para uma categoria: website para homepages e páginas genéricas, article para notícias e posts (com article:published_time quando disponível), product para páginas de e-commerce. O tipo muda principalmente como as plataformas categorizam e às vezes quais campos extras leem — um cartão article pode mostrar timestamps, um product pode se integrar às lojas da plataforma.",
            "og:locale declara o idioma do conteúdo num formato tipo en_US; em sites multilíngues deve variar por página junto com o hreflang, não ficar fixo num template compartilhado. Os dois namespaces que este gerador emite são meta tags comuns: nada executa, nada carrega, então é seguro colar em qualquer lugar do head.",
            "A prévia em tempo real aproxima o layout e é honesta sobre seus limites: cada plataforma trunca títulos e descrições em comprimentos diferentes, renderiza a imagem com cortes diferentes e muda as regras sem avisar. Trate a prévia como uma checagem de layout e valide a URL final nos depuradores oficiais — que também limpam o cache descrito acima. Tudo neste gerador roda localmente; suas URLs e textos não são enviados a lugar algum.",
          ],
        },
      ],
    },
  },
});
