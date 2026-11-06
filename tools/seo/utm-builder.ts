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
      deepDive: [
        {
          heading: "The parameter system, decoded",
          paragraphs: [
            "UTM stands for Urchin Tracking Module — a fossil of Urchin Software, whose web analytics Google bought in 2005 and turned into Google Analytics. The five standard parameters have survived every redesign since: utm_source names where the visitor came from (google, newsletter, twitter), utm_medium names the channel (cpc, email, social, referral), utm_campaign names the initiative, and the optional utm_term and utm_content split out paid keyword and A/B variant.",
            "utm_id deserves a special mention: GA4 uses it to tie different links to one campaign ID — the clean way to merge traffic that arrives with slightly different campaign names. If your organization already assigns campaign IDs, put the same value on every link of the campaign.",
            "The parameters are ordinary query string entries — appended after the path, before the #fragment — and this builder percent-encodes each value, so spaces become %20 and survive mail clients, QR generators and ad-platform redirects without breaking the URL.",
          ],
        },
        {
          heading: "Naming conventions are the real product",
          paragraphs: [
            "The builder guarantees well-formed links; only discipline guarantees useful reports. Analytics treats values as case-sensitive strings, so utm_campaign=Spring_Sale and utm_campaign=spring_sale fragment one campaign into two — and every future report has to add them back by hand.",
            "The conventions that age well are boring: all lowercase, dashes or underscores instead of spaces, no dates inside campaign names (they split one initiative into weekly near-duplicates), and a stable vocabulary of sources and mediums shared by everyone who can create links. Some teams keep that list in a spreadsheet; others restrict who builds links at all.",
            "Retagging is the other trap: once a URL with UTM parameters has been shared, indexed or printed, its history is welded in place. Changing the tags later does not fix the past — it cuts the time series. Decide the taxonomy before the first campaign, not after the third.",
          ],
        },
        {
          heading: "UTM and SEO, neighbors not enemies",
          paragraphs: [
            "Tagged URLs can fragment crawling: example.com/page and example.com/page?utm_source=newsletter look like two documents to a crawler until a canonical tag says otherwise. A self-referencing canonical on every page is the standard defense — which is why the canonical generator on this site pairs naturally with this one.",
            "Internal links generally should not carry UTM parameters (in some analytics setups they pollute referral data); UTM belongs to links you control off-site — ads, newsletters, social posts, QR codes. Making those outbound links correct is the builder's job; keeping them out of your own navigation is yours.",
            "As with everything on the site, the assembled URL never leaves your browser — no account, no logging. Paste a destination, fill the fields, copy the result into the ad platform or QR generator, and the attribution chain starts from a link that decodes the same way everywhere it travels.",
          ],
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
      deepDive: [
        {
          heading: "参数体系,逐个拆开",
          paragraphs: [
            "UTM 是 Urchin Tracking Module 的缩写——Urchin Software 公司的化石,2005 年谷歌买下它的网页分析业务,改造成 Google Analytics。五件套参数活过了之后每一次改版:utm_source 标流量来源(google、newsletter、twitter),utm_medium 标渠道(cpc、email、social、referral),utm_campaign 标活动,可选的 utm_term 和 utm_content 拆出付费关键词与 A/B 变体。",
            "utm_id 值得单独一提:GA4 用它把不同链接挂到同一个活动 ID 上——这是把“活动名略有出入的流量”合并干净的体面办法。团队如果已有活动 ID 制度,就给同一场活动的每条链接填同一个值。",
            "参数就是普通的查询串条目——接在路径之后、# 片段之前——本工具对每个值做百分比编码,空格变成 %20,在邮件客户端、二维码生成器、广告平台跳转之间往返也不会把链接搞坏。",
          ],
        },
        {
          heading: "命名规范才是真正的产品",
          paragraphs: [
            "生成器只保证链接格式正确;有用的报表靠纪律保证。分析工具把参数值当区分大小写的字符串,utm_campaign=Spring_Sale 和 utm_campaign=spring_sale 会把一场活动裂成两场——以后每份报表都得手工把它们加回来。",
            "经得起时间考验的规范都很无聊:全部小写,连字符或下划线代替空格,活动名里不放日期(会把一场活动裂成一周一个的近似重复),并且所有能建链接的人共用一套来源与渠道词表。有的团队把词表放在表格里,有的干脆限制谁能建链接。",
            "另一个坑是重打标:带 UTM 的 URL 一旦被分享、收录或印出来,历史就焊死了。事后改标签不是修正过去,而是掐断时间序列——先定分类法,再发第一场活动,而不是第三场之后。",
          ],
        },
        {
          heading: "UTM 与 SEO,是邻居不是敌人",
          paragraphs: [
            "带参数的 URL 会让抓取碎片化:example.com/page 和 example.com/page?utm_source=newsletter 在爬虫眼里像两个文档,直到 canonical 标签出面。每页自引用 canonical 是标准防御——所以本站的 canonical 生成器和这个工具天然是一对。",
            "站内链接一般不该带 UTM(某些统计配置里会污染引荐数据);UTM 属于你在站外控制的链接——广告、邮件、社交帖、二维码。把外发链接做对是生成器的任务;别让它们混进自己的导航,这归你管。",
            "与全站一样,拼好的 URL 不离开你的浏览器——不用登录,也没有日志。粘贴目标页、填字段、把结果复制进广告平台或二维码生成器,归因链条就从一条“到哪儿都解码一致”的链接开始了。",
          ],
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
      deepDive: [
        {
          heading: "パラメータ体系、分解図",
          paragraphs: [
            "UTM は Urchin Tracking Module の略です。Urchin Software 社の化石で、2005 年に Google がそのウェブ分析事業を買収し Google Analytics に仕立てました。5 つの標準パラメータはその後の全改訂を生き延びています。utm_source は流入元(google、newsletter、twitter)、utm_medium はチャネル(cpc、email、social、referral)、utm_campaign は施策名、任意の utm_term と utm_content が有料キーワードと A/B バリアントを切り出します。",
            "utm_id は別枠で挙げる価値があります。GA4 はこれで異なるリンクを 1 つのキャンペーン ID に結び付けます。キャンペーン名の揺れで分かれた流入をきれいに統合する、まっとうな手段です。組織にキャンペーン ID の運用があれば、同じ施策の全リンクに同じ値を入れてください。",
            "パラメータはごく普通のクエリ文字列の項目です。パスの後、#フラグメントの前に付きます。このビルダーは各値をパーセントエンコーディングし、空白は %20 になります。メールクライアント、QR 生成器、広告プラットフォームのリダイレクトを往復しても URL は壊れません。",
          ],
        },
        {
          heading: "命名規則こそ本当のプロダクト",
          paragraphs: [
            "ビルダーが保証するのはリンクの整形までです。有用なレポートは規律が保証します。アナリティクスは値を大文字小文字を区別する文字列として扱うので、utm_campaign=Spring_Sale と utm_campaign=spring_sale は 1 つの施策を 2 つに裂きます。以後のレポートは、そのつど手で足し戻すことになります。",
            "時間に耐える規則は退屈です。すべて小文字、空白の代わりにハイフンかアンダースコア、キャンペーン名に日付を入れない(1 施策が週ごとのほぼ重複に裂けます)、そしてリンクを作れる人全員が同じソースとチャネルの語彙を共有する。語彙表をスプレッドシートで共有するチームもあれば、リンク作成者そのものを絞るチームもあります。",
            "もう 1 つの罠は再タグ付けです。UTM 付き URL は、共有され、インデックスされ、印刷された時点で歴史が溶接されます。後からタグを変えるのは修正ではなく時系列の切断です。分類法は最初の施策の前に決める。3 つ目の施策の後にではなく。",
          ],
        },
        {
          heading: "UTM と SEO、敵ではなく隣人",
          paragraphs: [
            "パラメータ付き URL はクロールを断片化させます。example.com/page と example.com/page?utm_source=newsletter は、canonical が言及するまでクローラーには 2 つの文書に見えます。全ページの自己参照 canonical が標準の防御です。だからこのサイトの canonical 生成ツールとこのツールは自然な相棒です。",
            "サイト内リンクは原則として UTM を載せるべきではありません(統計設定によってはリファラーデータを汚します)。UTM の居場所はサイト外であなたが管理するリンク——広告、メルマガ、SNS 投稿、QR コードです。外向きのリンクを正しく作るのがこのツールの仕事で、自分のナビゲーションに入れないのはあなたの仕事です。",
            "このサイトのすべてと同様、組み上がった URL はブラウザの外に出ません。登録もログもありません。リンク先を貼り、項目を埋め、結果を広告プラットフォームや QR 生成器に貼り付けば、帰属の連鎖は「どこで解釈しても同じリンク」から始まります。",
          ],
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
      deepDive: [
        {
          heading: "El sistema de parámetros, diseccionado",
          paragraphs: [
            "UTM son las siglas de Urchin Tracking Module — un fósil de Urchin Software, cuya analítica web compró Google en 2005 y convirtió en Google Analytics. Los cinco parámetros estándar han sobrevivido a todos los rediseños desde entonces: utm_source nombra de dónde llega la visita (google, newsletter, twitter), utm_medium nombra el canal (cpc, email, social, referral), utm_campaign nombra la iniciativa, y los opcionales utm_term y utm_content separan palabra clave de pago y variante A/B.",
            "utm_id merece mención aparte: GA4 lo usa para atar enlaces distintos a un mismo ID de campaña — la manera limpia de fusionar tráfico que llega con nombres de campaña ligeramente distintos. Si tu organización ya asigna IDs de campaña, pon el mismo valor en cada enlace de la campaña.",
            "Los parámetros son entradas normales de query string — añadidos tras la ruta y antes del fragmento # — y este constructor codifica cada valor en porcentaje, así que los espacios se vuelven %20 y sobreviven a clientes de correo, generadores de QR y redirecciones de plataformas de anuncios sin romper la URL.",
          ],
        },
        {
          heading: "Las convenciones de nombres son el producto de verdad",
          paragraphs: [
            "El constructor garantiza enlaces bien formados; solo la disciplina garantiza informes útiles. Las analíticas tratan los valores como cadenas sensibles a mayúsculas, así que utm_campaign=Spring_Sale y utm_campaign=spring_sale fragmentan una campaña en dos — y cada informe futuro tendrá que sumarlas a mano.",
            "Las convenciones que envejecen bien son aburridas: todo en minúsculas, guiones o guiones bajos en vez de espacios, sin fechas dentro del nombre de campaña (fragmentan una iniciativa en casi-duplicados semanales), y un vocabulario estable de fuentes y medios compartido por todo el que pueda crear enlaces. Algunos equipos guardan la lista en una hoja de cálculo; otros limitan directamente quién crea enlaces.",
            "La otra trampa es reetiquetar: cuando una URL con UTM ya se compartió, se indexó o se imprimió, su historia queda soldada. Cambiar las etiquetas después no corrige el pasado — corta la serie temporal. Decide la taxonomía antes de la primera campaña, no después de la tercera.",
          ],
        },
        {
          heading: "UTM y SEO, vecinos no enemigos",
          paragraphs: [
            "Las URLs etiquetadas pueden fragmentar el rastreo: example.com/page y example.com/page?utm_source=newsletter parecen dos documentos a un rastreador hasta que un canonical dice otra cosa. El canonical autorreferenciado en cada página es la defensa estándar — por eso el generador de canonicals de este sitio empareja de forma natural con este.",
            "Los enlaces internos en general no deberían llevar UTM (en algunas configuraciones de analítica contaminan los datos de referencia); el UTM pertenece a los enlaces que controlas fuera del sitio — anuncios, newsletters, posts sociales, códigos QR. Que esos enlaces salientes sean correctos es trabajo del constructor; mantenerlos fuera de tu navegación es cosa tuya.",
            "Como en todo el sitio, la URL armada nunca sale de tu navegador — sin cuenta, sin registros. Pega un destino, rellena los campos, copia el resultado a la plataforma de anuncios o al generador de QR, y la cadena de atribución empieza con un enlace que se decodifica igual por donde viaje.",
          ],
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
      deepDive: [
        {
          heading: "O sistema de parâmetros, dissecado",
          paragraphs: [
            "UTM é a sigla de Urchin Tracking Module — um fóssil da Urchin Software, cuja análise web o Google comprou em 2005 e transformou no Google Analytics. Os cinco parâmetros padrão sobreviveram a todos os redesenhos desde então: utm_source nomeia de onde vem a visita (google, newsletter, twitter), utm_medium nomeia o canal (cpc, email, social, referral), utm_campaign nomeia a iniciativa, e os opcionais utm_term e utm_content separam palavra-chave paga e variante A/B.",
            "utm_id merece destaque à parte: o GA4 o usa para amarrar links diferentes a um mesmo ID de campanha — o jeito limpo de fundir tráfego que chega com nomes de campanha levemente distintos. Se sua organização já atribui IDs de campanha, ponha o mesmo valor em cada link da campanha.",
            "Os parâmetros são entradas comuns de query string — acrescentados após o caminho e antes do fragmento # — e este gerador faz o percent-encoding de cada valor, então espaços viram %20 e sobrevivem a clientes de e-mail, geradores de QR e redirecionamentos de plataformas de anúncios sem quebrar a URL.",
          ],
        },
        {
          heading: "As convenções de nomes são o produto de verdade",
          paragraphs: [
            "O gerador garante links bem formados; só a disciplina garante relatórios úteis. As ferramentas de analytics tratam os valores como strings sensíveis a maiúsculas, então utm_campaign=Spring_Sale e utm_campaign=spring_sale fragmentam uma campanha em duas — e todo relatório futuro terá de somá-las à mão.",
            "As convenções que envelhecem bem são chatas: tudo em minúsculas, hífens ou underscores em vez de espaços, sem datas dentro do nome da campanha (fragmentam uma iniciativa em quase-duplicados semanais), e um vocabulário estável de sources e mediums compartilhado por todo mundo que pode criar links. Alguns times guardam a lista numa planilha; outros simplesmente restringem quem cria links.",
            "A outra armadilha é retagar: quando uma URL com UTM já foi compartilhada, indexada ou impressa, sua história fica soldada. Trocar as tags depois não corrige o passado — corta a série temporal. Decida a taxonomia antes da primeira campanha, não depois da terceira.",
          ],
        },
        {
          heading: "UTM e SEO, vizinhos não inimigos",
          paragraphs: [
            "URLs etiquetadas podem fragmentar o rastreamento: example.com/page e example.com/page?utm_source=newsletter parecem dois documentos para um rastreador até um canonical dizer o contrário. O canonical autorreferente em cada página é a defesa padrão — por isso o gerador de canonical deste site faz par natural com este.",
            "Links internos em geral não deveriam carregar UTM (em algumas configurações de analytics poluem dados de referência); UTM é coisa de link que você controla fora do site — anúncios, newsletters, posts sociais, QR codes. Fazer os links de saída ficarem certos é trabalho do gerador; mantê-los fora da sua navegação é seu.",
            "Como em todo o site, a URL montada nunca sai do seu navegador — sem conta, sem logs. Cole um destino, preencha os campos, copie o resultado para a plataforma de anúncios ou o gerador de QR, e a cadeia de atribuição começa com um link que decodifica igual por onde viajar.",
          ],
        },
      ],
    },
  },
});
