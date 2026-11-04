import { SeoTagsEngine, type TagEngineProps } from "../_engines/seo-engine-tags";
import { loc } from "../_engines/seo-locale";
import { defineTool } from "../_lib/types";

const props: TagEngineProps = {
  mode: "url",
  urlKey: "url",
  params: [
    { key: "utm_source", name: "utm_source" },
    { key: "utm_medium", name: "utm_medium" },
    { key: "utm_campaign", name: "utm_campaign" },
    { key: "utm_id", name: "utm_id" },
    { key: "utm_term", name: "utm_term" },
    { key: "utm_content", name: "utm_content" },
  ],
  fields: [
    {
      key: "url",
      label: loc("Destination URL", "目标 URL", "リンク先の URL", "URL de destino", "URL de destino"),
      placeholder: "https://example.com/landing-page",
    },
    {
      key: "utm_source",
      label: loc("utm_source", "utm_source", "utm_source", "utm_source", "utm_source"),
      placeholder: "google",
      hint: loc(
        "Where traffic comes from: google, newsletter, twitter…",
        "流量来源:google、newsletter、twitter……",
        "流入元:google、newsletter、twitter など。",
        "De dónde viene el tráfico: google, newsletter, twitter…",
        "De onde vem o tráfego: google, newsletter, twitter…",
      ),
    },
    {
      key: "utm_medium",
      label: loc("utm_medium", "utm_medium", "utm_medium", "utm_medium", "utm_medium"),
      placeholder: "cpc",
      hint: loc(
        "Channel: cpc, email, social, referral…",
        "渠道:cpc、email、social、referral……",
        "チャネル:cpc、email、social、referral など。",
        "Canal: cpc, email, social, referral…",
        "Canal: cpc, email, social, referral…",
      ),
    },
    {
      key: "utm_campaign",
      label: loc("utm_campaign", "utm_campaign", "utm_campaign", "utm_campaign", "utm_campaign"),
      placeholder: "spring_sale",
      hint: loc(
        "Campaign name; keep it lowercase with dashes or underscores.",
        "活动名称;统一小写,用连字符或下划线。",
        "キャンペーン名。小文字とハイフン/アンダースコアで統一します。",
        "Nombre de campaña; minúsculas con guiones o guiones bajos.",
        "Nome da campanha; minúsculas com hífens ou underscores.",
      ),
    },
    {
      key: "utm_id",
      label: loc("utm_id (optional)", "utm_id(可选)", "utm_id(任意)", "utm_id (opcional)", "utm_id (opcional)"),
      placeholder: "spring-2026",
      hint: loc("Campaign ID; groups identical campaigns in GA4.", "活动 ID;GA4 里用来聚合同名活动。", "キャンペーン ID。GA4 で同一キャンペーンをグルーピングします。", "ID de campaña; agrupa campañas iguales en GA4.", "ID da campanha; agrupa campanhas iguais no GA4."),
    },
    {
      key: "utm_term",
      label: loc("utm_term (optional)", "utm_term(可选)", "utm_term(任意)", "utm_term (opcional)", "utm_term (opcional)"),
      placeholder: "running+shoes",
      hint: loc("Paid search keyword.", "付费搜索关键词。", "有料検索のキーワード。", "Palabra clave de búsqueda de pago.", "Palavra-chave da busca paga."),
    },
    {
      key: "utm_content",
      label: loc("utm_content (optional)", "utm_content(可选)", "utm_content(任意)", "utm_content (opcional)", "utm_content (opcional)"),
      placeholder: "banner-a",
      hint: loc("Creative or A/B variant.", "创意或 A/B 变体。", "クリエイティブや A/B テストのバリアント。", "Creatividad o variante A/B.", "Criativo ou variante A/B."),
    },
  ],
  outputLabel: loc("Tagged URL", "带参数的 URL", "パラメータ付き URL", "URL etiquetada", "URL etiquetada"),
};

export default defineTool({
  slug: "utm-builder",
  category: "seo",
  icon: "ruler",
  engine: { component: SeoTagsEngine, props },
  related: ["canonical-tag-generator", "open-graph-generator", "meta-tag-generator", "keyword-density-checker", "sitemap-generator", "hreflang-generator", "serp-preview", "robots-txt-generator", "schema-markup-generator"],
  copy: {
    en: {
      name: "UTM Link Builder",
      tagline:
        "Add utm_source, medium, campaign, term and content to any URL and get a correctly encoded tracking link you can copy or share.",
      intro: [
        "UTM parameters are the query strings analytics platforms read to attribute traffic: source, medium, campaign, term and content. This builder appends them to your URL with correct percent-encoding, so spaces and special characters survive the trip through ad platforms, QR codes and mail clients.",
        "Five parameters carry meaning: utm_source names the referrer, utm_medium the channel, utm_campaign the initiative, with optional utm_term and utm_content for keyword and A/B distinctions. Analytics matches values case-sensitively — Newsletter and newsletter become two campaigns — which is why the all-lowercase convention exists.",
        "The builder percent-encodes every appended value and shows the final URL ready to copy, keeping parameters after the path and before the fragment. Encoding at build time beats hand-typing ?utm_source=... into an email, where unencoded spaces silently break the link.",
        "Tagged links power attribution, but conventions rot without discipline: dates inside campaign names fragment reports into near-duplicates, and retagging existing URLs breaks historical comparisons. Agree on lowercase, dashes and stable campaign names before building links — the tool enforces the encoding; the convention is yours.",
      ],
      steps: [
        "Paste the destination URL.",
        "Fill in source and medium first, then campaign and the optional term/content fields.",
        "Copy the tagged URL into your ad, newsletter or social post.",
      ],
      faqs: [
        {
          q: "Which UTM parameters are required?",
          a: "utm_source and utm_medium are the ones analytics tools depend on: source names the referrer, medium the channel (cpc, email, social). utm_campaign is strongly recommended; utm_id, utm_term and utm_content are optional.",
        },
        {
          q: "Do UTM parameters hurt SEO?",
          a: "Not if handled correctly. Crawlers may treat tagged URLs as duplicates, which is exactly what a self-referencing canonical solves — that is why the canonical generator pairs well with this tool.",
        },
        {
          q: "Is capitalization in UTM values significant?",
          a: "Yes — utm_campaign=Spring and utm_campaign=spring count as two campaigns in most analytics tools. Standardize on lowercase and your reports stay clean.",
        },
      ],
    },
    zh: {
      name: "UTM 链接生成器",
      tagline: "为任意 URL 添加 utm_source、medium、campaign、term、content 参数,生成编码正确的追踪链接,一键复制分享。",
      intro: [
        "UTM 参数是分析平台用来归因流量的查询串:来源、媒介、活动、关键词和内容。这个生成器会按正确的百分比编码把参数附加到 URL 上,空格和特殊字符在广告平台、二维码和邮件客户端之间往返也不会失效。",
        "建链接前先约定命名规范——统一小写、用连字符、活动名里不带日期——否则报表会碎裂成大量近似重复的活动。",
      ],
      steps: [
        "粘贴目标 URL。",
        "先填 source 和 medium,再填 campaign,以及可选的 term / content。",
        "把生成的追踪链接复制到广告、邮件或社交帖子中。",
      ],
      faqs: [
        {
          q: "哪些 UTM 参数是必需的?",
          a: "utm_source 和 utm_medium 是分析工具依赖的两项:source 标识流量来自哪里,medium 标识渠道(cpc、email、social)。utm_campaign 强烈建议填写;utm_id、utm_term、utm_content 可选。",
        },
        {
          q: "UTM 参数会影响 SEO 吗?",
          a: "处理得当就不会。爬虫可能把带参数的 URL 当作重复页面,而这正是自引用 canonical 要解决的问题——所以 canonical 生成器是这个工具的好搭档。",
        },
        {
          q: "UTM 值的大小写有影响吗?",
          a: "有——utm_campaign=Spring 和 utm_campaign=spring 在多数分析工具里是两个活动。统一用小写,报表才能保持干净。",
        },
      ],
    },
    ja: {
      name: "UTM リンク生成",
      tagline: "任意の URL に utm_source・medium・campaign・term・content を追加し、正しくエンコードされた計測リンクを即座に作成します。",
      intro: [
        "UTM パラメータは、アナリティクスが流入を帰属させるために読むクエリ文字列です:source・medium・campaign・term・content。このビルダーは正しいパーセントエンコーディングで URL に追記するため、広告プラットフォームや QR コード、メールクライアントを経由しても空白や記号が壊れません。",
        "リンクを作る前に命名規則を決めておいてください。小文字で統一、ハイフン使用、キャンペーン名に日付を入れない。さもないとレポートがほぼ重複のキャンペーンに分断されます。",
      ],
      steps: [
        "リンク先の URL を貼り付けます。",
        "まず source と medium を入力し、続いて campaign、任意で term / content を埋めます。",
        "生成されたリンクを広告・メルマガ・SNS 投稿に使います。",
      ],
      faqs: [
        {
          q: "必須の UTM パラメータはどれ?",
          a: "utm_source と utm_medium です。source は参照元、medium はチャネル(cpc、email、social)を示します。utm_campaign は強く推奨、utm_id・utm_term・utm_content は任意です。",
        },
        {
          q: "UTM パラメータは SEO に悪影響がある?",
          a: "正しく扱えばありません。クローラーはパラメータ付き URL を重複として扱うことがあり、それを解決するのが自己参照 canonical です。だから canonical 生成ツールと併用すると相性が良いのです。",
        },
        {
          q: "UTM 値の大文字小文字は区別される?",
          a: "されます。utm_campaign=Spring と utm_campaign=spring は多くのツールで別キャンペーンになります。小文字に統一すればレポートは汚れません。",
        },
      ],
    },
    es: {
      name: "Generador de enlaces UTM",
      tagline:
        "Añade utm_source, medium, campaign, term y content a cualquier URL y obtén un enlace de seguimiento bien codificado para copiar o compartir.",
      intro: [
        "Los parámetros UTM son las cadenas de consulta que leen las plataformas de analítica para atribuir tráfico: source, medium, campaign, term y content. Este generador los añade a tu URL con codificación porcentual correcta, así que los espacios y caracteres especiales sobreviven a plataformas de anuncios, códigos QR y clientes de correo.",
        "Acuerda convenciones de nombres antes de crear enlaces: minúsculas, guiones, sin fechas dentro del nombre de campaña. Si no, tus informes se fragmentarán en campañas casi duplicadas.",
      ],
      steps: [
        "Pega la URL de destino.",
        "Rellena primero source y medium, luego campaign y los campos opcionales term / content.",
        "Copia la URL etiquetada en tu anuncio, newsletter o publicación social.",
      ],
      faqs: [
        {
          q: "¿Qué parámetros UTM son obligatorios?",
          a: "utm_source y utm_medium son los que las herramientas de analítica necesitan: source nombra el referente y medium el canal (cpc, email, social). utm_campaign es muy recomendable; utm_id, utm_term y utm_content son opcionales.",
        },
        {
          q: "¿Los parámetros UTM perjudican el SEO?",
          a: "No si se gestionan bien. Los rastreadores pueden tratar las URLs etiquetadas como duplicados, y eso es justo lo que resuelve un canonical autorreferenciado: por eso el generador de canonicals combina bien con esta herramienta.",
        },
        {
          q: "¿Importan las mayúsculas en los valores UTM?",
          a: "Sí: utm_campaign=Spring y utm_campaign=spring cuentan como dos campañas en la mayoría de herramientas. Estandariza en minúsculas y los informes se mantienen limpios.",
        },
      ],
    },
    pt: {
      name: "Gerador de links UTM",
      tagline:
        "Adicione utm_source, medium, campaign, term e content a qualquer URL e gere um link de rastreio codificado corretamente para copiar ou compartilhar.",
      intro: [
        "Os parâmetros UTM são as strings de consulta que as plataformas de analytics leem para atribuir tráfego: source, medium, campaign, term e content. Este gerador os acrescenta à sua URL com percent-encoding correto, então espaços e caracteres especiais sobrevivem a plataformas de anúncios, QR codes e clientes de e-mail.",
        "Combine convenções de nomenclatura antes de criar links: minúsculas, hífens, sem datas dentro do nome da campanha. Caso contrário, seus relatórios se fragmentam em campanhas quase duplicadas.",
      ],
      steps: [
        "Cole a URL de destino.",
        "Preencha primeiro source e medium, depois campaign e os campos opcionais term / content.",
        "Copie a URL etiquetada para o seu anúncio, newsletter ou post social.",
      ],
      faqs: [
        {
          q: "Quais parâmetros UTM são obrigatórios?",
          a: "utm_source e utm_medium são os que as ferramentas de analytics exigem: source nomeia a origem e medium o canal (cpc, email, social). utm_campaign é fortemente recomendado; utm_id, utm_term e utm_content são opcionais.",
        },
        {
          q: "Parâmetros UTM prejudicam o SEO?",
          a: "Não, se bem tratados. Rastreadores podem tratar URLs etiquetadas como duplicatas, e é exatamente isso que um canonical autorreferente resolve — por isso o gerador de canonical combina bem com esta ferramenta.",
        },
        {
          q: "Maiúsculas nos valores UTM fazem diferença?",
          a: "Fazem — utm_campaign=Spring e utm_campaign=spring contam como duas campanhas na maioria das ferramentas. Padronize em minúsculas e os relatórios continuam limpos.",
        },
      ],
    },
  },
});
