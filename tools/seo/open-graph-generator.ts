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
    },
  },
});
