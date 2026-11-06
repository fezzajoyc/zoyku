import { SeoTagsEngine, type TagEngineProps } from "../_engines/seo-engine-tags";
import { loc } from "../_engines/seo-locale";
import { defineTool } from "../_lib/types";

const props: TagEngineProps = {
  fields: [
    {
      key: "title",
      label: loc("Page title", "页面标题", "ページタイトル", "Título de la página", "Título da página"),
      placeholder: loc(
        "Best running shoes 2026: tested by real runners",
        "2026 最佳跑鞋:真实跑者实测",
        "2026年の最新ランニングシューズ:実際のランナーが検証",
        "Las mejores zapatillas de running 2026: probadas por corredores",
        "Melhores tênis de corrida 2026: testados por corredores",
      ),
      meter: { warn: 50, max: 60 },
      hint: loc(
        "Aim for 50–60 characters (≈580 px); put the important words first.",
        "建议 50–60 个字符(约 580 像素),重要关键词放前面。",
        "目安は 50〜60 文字(約580px)。重要な語を前に置きます。",
        "Apunta a 50–60 caracteres (≈580 px); las palabras importantes primero.",
        "Mire 50–60 caracteres (≈580 px); palavras importantes primeiro.",
      ),
    },
    {
      key: "description",
      label: loc("Meta description", "meta 描述", "メタディスクリプション", "Meta description", "Meta description"),
      type: "textarea",
      rows: 3,
      meter: { warn: 150, max: 160 },
      placeholder: loc(
        "We ran 500 km in 23 shoes. Here are the eight that survived — with lab data on cushioning, weight and price.",
        "我们穿着 23 双跑鞋跑了 500 公里,筛出这 8 双——附缓震、重量与价格的实测数据。",
        "23 種類のシューズで500kmを走り、耐えた8足を選出。クッション性・重量・価格の実測データ付き。",
        "Corrimos 500 km con 23 zapatillas. Estas 8 sobrevivieron, con datos de amortiguación, peso y precio.",
        "Corremos 500 km com 23 tênis. Estes 8 sobreviveram, com dados de amortecimento, peso e preço.",
      ),
      hint: loc(
        "Up to ~160 characters; write it like ad copy for the search result.",
        "不超过约 160 个字符,按搜索结果里的广告文案来写。",
        "約160文字まで。検索結果に表示される広告コピーのように書きます。",
        "Hasta ~160 caracteres; escríbelo como el anuncio de tu resultado.",
        "Até ~160 caracteres; escreva como o anúncio do seu resultado.",
      ),
    },
    {
      key: "keywords",
      label: loc("Meta keywords", "meta keywords", "meta keywords", "Meta keywords", "Meta keywords"),
      placeholder: "running shoes, best trainers 2026",
      hint: loc(
        "Ignored by Google since 2009; only for niche engines that still require it.",
        "Google 从 2009 年起忽略此标签;仅在细分搜索引擎仍要求时填写。",
        "Google は 2009 年から無視します。対応するニッチな検索エンジン向けに。",
        "Google las ignora desde 2009; solo para buscadores de nicho que las exijan.",
        "O Google ignora desde 2009; só para buscadores de nicho que exijam.",
      ),
    },
    {
      key: "robots",
      label: loc("Robots", "robots", "robots", "Robots", "Robots"),
      type: "select",
      default: "index, follow",
      options: [
        { value: "index, follow" },
        { value: "index, nofollow" },
        { value: "noindex, follow" },
        { value: "noindex, nofollow" },
      ],
      hint: loc(
        "noindex removes the page from results even when robots.txt allows crawling.",
        "noindex 会让页面退出搜索结果,即使 robots.txt 允许抓取。",
        "noindex を付けると robots.txt で許可されていてもページは結果に出ません。",
        "noindex saca la página de resultados aunque robots.txt permita el rastreo.",
        "noindex tira a página dos resultados mesmo com robots.txt permitindo o rastio.",
      ),
    },
    {
      key: "viewport",
      label: loc("Viewport", "viewport", "viewport", "Viewport", "Viewport"),
      default: "width=device-width, initial-scale=1",
      hint: loc(
        "Responsive sites should keep this default.",
        "响应式网站保持这个默认值即可。",
        "レスポンシブサイトはこのデフォルトのままで問題ありません。",
        "Los sitios responsive deben mantener este valor.",
        "Sites responsivos devem manter este valor.",
      ),
    },
    {
      key: "author",
      label: loc("Author", "作者", "著者", "Autor", "Autor"),
      placeholder: "Jane Doe",
    },
    {
      key: "canonical",
      label: loc("Canonical link (optional)", "canonical 链接(可选)", "canonical リンク(任意)", "Enlace canonical (opcional)", "Link canonical (opcional)"),
      placeholder: "https://example.com/page",
      hint: loc(
        "Absolute URL; add on every indexable page.",
        "使用绝对 URL;每个可收录页面都建议添加。",
        "絶対 URL で、インデックス対象ページには必ず設定を。",
        "URL absoluta; añádelo en cada página indexable.",
        "URL absoluta; adicione em cada página indexável.",
      ),
    },
  ],
  lines: [
    { template: '<meta charset="UTF-8">' },
    { template: "<title>{{title}}</title>", when: "title" },
    { template: '<meta name="description" content="{{description}}">', when: "description" },
    { template: '<meta name="keywords" content="{{keywords}}">', when: "keywords" },
    { template: '<meta name="robots" content="{{robots}}">', when: "robots" },
    { template: '<meta name="viewport" content="{{viewport}}">', when: "viewport" },
    { template: '<meta name="author" content="{{author}}">', when: "author" },
    { template: '<link rel="canonical" href="{{canonical}}">', when: "canonical" },
  ],
  outputLabel: loc("HTML snippet", "HTML 代码", "HTML スニペット", "Fragmento HTML", "Trecho HTML"),
};

export default defineTool({
  slug: "meta-tag-generator",
  category: "seo",
  icon: "code",
  featured: true,
  engine: { component: SeoTagsEngine, props },
  related: ["serp-preview", "open-graph-generator", "canonical-tag-generator", "schema-markup-generator", "utm-builder", "keyword-density-checker", "sitemap-generator", "hreflang-generator", "robots-txt-generator"],
  copy: {
    en: {
      name: "Meta Tag Generator",
      tagline:
        "Generate title, description, keywords, robots and viewport meta tags with live HTML output you can paste straight into your <head>.",
      intro: [
        "Meta tags are the first thing crawlers read: the title tag is a ranking signal, and the meta description becomes your snippet whenever Google doesn't rewrite it. This generator builds a clean, valid set — title, description, keywords, robots, viewport, author plus an optional canonical link — while you type.",
        "Google rewrites a majority of titles and most descriptions when they are badly sized or duplicated, so fit matters: aim for a title within the roughly 580-pixel desktop budget and a description around 150–160 characters. The meta keywords tag is ignored by every major engine and kept only for legacy tooling.",
        "Every attribute value is HTML-escaped, so quotes and ampersands can't break your markup, and the viewport tag is included because a missing one is the most common mobile-usability failure. Copy the block into your template or CMS head section and adjust it per page.",
        "Generators that emit only a title tag miss robots and canonical — the tags that decide crawling and duplicate consolidation. Building the full set at once keeps the <head> consistent across templates instead of accumulating conflicting tags page by page, which is what duplicate-content audits usually end up finding.",
      ],
      steps: [
        "Fill in the page title (aim for 50–60 characters) and the meta description (up to ~160).",
        "Set robots, viewport and author as needed — fields left empty are omitted from the output.",
        "Copy the generated <head> snippet and paste it into your page template.",
      ],
      faqs: [
        {
          q: "How long should a title tag be?",
          a: "Aim for about 50–60 characters, roughly 580 pixels at the font size Google renders. Longer titles get cut with an ellipsis in the results — the SERP preview tool shows exactly where the cut lands.",
        },
        {
          q: "Are meta keywords still useful?",
          a: "Google has ignored the meta keywords tag since 2009, and Bing can treat it as a spam signal. Fill it in only when a niche engine or an internal search platform explicitly requires it.",
        },
        {
          q: "What does the robots meta tag control?",
          a: "index/noindex decides whether the page may appear in results; follow/nofollow whether its links pass equity. It must sit on the page itself — robots.txt cannot noindex anything.",
        },
      ],
      deepDive: [
        {
          heading: "Title length is measured in pixels, not characters",
          paragraphs: [
            "The “50–60 characters” advice is a rule of thumb standing in for the real constraint: the desktop results page truncates the title to a pixel budget — roughly 580px at the font Google renders. The same 60 characters span very different widths depending on the script: an all-caps Latin title burns pixels fast, while CJK glyphs are nearly square and a 30-character Japanese title can exceed the width of a 55-character English one.",
            "Truncation is not fatal — Google still reads the full tag — but the visible part is all a searcher sees before deciding to click, so the words that matter should sit before the cut. The worst place for a brand name is the end of a long title, where it is the first thing deleted.",
            "A second, quieter truncation governs descriptions: Google rewrites a majority of titles and most descriptions when they are badly sized or duplicated, pulling sentences from the page body instead. A description near 150–160 characters is a request, not a guarantee; writing one that matches the page's actual content makes the rewrite, when it happens, less damaging.",
          ],
        },
        {
          heading: "robots meta versus robots.txt — different layers, different jobs",
          paragraphs: [
            "The robots meta tag and robots.txt are often confused because both say “robot” in the name, but they control different stages. robots.txt governs fetching: a disallowed URL is not crawled. The meta tag governs indexing: index/noindex decides whether the fetched page may appear in results, follow/nofollow whether its links pass equity. A page blocked by robots.txt can still appear in results if other pages link to it — blocking is not noindex.",
            "The classic audit finding is the inverse mistake: a noindex page that robots.txt blocks. The crawler never fetches the page, never sees the noindex, and the instruction sits unread. If a page must leave the index, the meta tag has to be reachable first.",
            "Within the tag itself, values combine: index,follow is the default and usually omitted, noindex,follow keeps a page out of results while letting its links be crawled, and noarchive, nosnippet and friends adjust specific result features. One robots meta per page — duplicates in the head are resolved unpredictably.",
          ],
        },
        {
          heading: "What a generator should and should not emit",
          paragraphs: [
            "Meta keywords is the cautionary exhibit: Google has ignored it since 2009, Bing can treat it as a spam signal, and keeping it alive in templates mostly signals an unmaintained site to auditors. This generator includes it only because some niche engines and internal search platforms still ask for it — leave it empty unless something explicitly requires it.",
            "The viewport tag, by contrast, is the quiet workhorse: its absence is the single most common mobile-usability failure, and one missing tag can flag every page of a site in mobile-friendliness checks. Author and other descriptive tags carry little ranking weight but cost nothing and complete the head.",
            "Attribute escaping matters more than it looks: a description containing a quote mark silently breaks an unescaped template, truncating the head mid-attribute. Everything this tool outputs is HTML-escaped, and empty fields are omitted rather than emitted as empty tags — a head that says nothing twice is a head that stays consistent. All generation runs locally in your browser.",
          ],
        },
      ],
    },
    zh: {
      name: "Meta 标签生成器",
      tagline: "一键生成 title、description、keywords、robots、viewport 等 meta 标签,实时输出可直接粘贴进 <head> 的 HTML。",
      intro: [
        "Meta 标签是爬虫最先读取的内容:title 是排名信号,description 在 Google 不改写时会直接成为搜索结果摘要。这个生成器随输入实时产出一套干净、合规的标签——title、description、keywords、robots、viewport、author,外加可选的 canonical 链接。",
        "所有属性值都会做 HTML 转义,引号和 & 符号不会破坏标记。把生成的代码块复制到模板或 CMS 的 head 区域,再按页面微调即可。",
      ],
      steps: [
        "填写页面标题(建议 50–60 个字符)和描述(不超过约 160 个字符)。",
        "按需设置 robots、viewport、author——留空的字段不会出现在输出里。",
        "复制生成的 <head> 代码,粘贴到页面模板中。",
      ],
      faqs: [
        {
          q: "title 标签多长合适?",
          a: "建议 50–60 个字符(约 580 像素)。超长标题会在搜索结果里被省略号截断,可用 SERP 预览工具查看具体截断位置。",
        },
        {
          q: "meta keywords 还有用吗?",
          a: "Google 从 2009 年起就忽略该标签,Bing 甚至可能把它当作垃圾信号。只有在细分搜索引擎或站内搜索平台明确要求时才需要填写。",
        },
        {
          q: "robots meta 标签控制什么?",
          a: "index/noindex 决定页面能否出现在搜索结果,follow/nofollow 决定页面上的链接是否传递权重。它必须写在页面本身,robots.txt 无法实现 noindex。",
        },
      ],
      deepDive: [
        {
          heading: "title 长度按像素算,不按字符算",
          paragraphs: [
            "“50–60 个字符”这条经验法则,背后是真正的约束:桌面搜索结果按像素预算截断 title——按 Google 的渲染字号大约 580 像素。同样 60 个字符,宽度可以差很远:全大写的拉丁标题烧像素极快,而中日韩字形接近正方形,30 个字符的日文标题可能比 55 个字符的英文标题还要宽。",
            "截断并不致命——Google 仍会读取完整标签——但可见部分就是搜索者点击前看到的一切,所以重要的词要放在截断点之前。品牌名最糟糕的位置是长标题的末尾:那正是最先被删掉的部分。",
            "description 还有一层更安静的截断:当标题和描述尺寸不当或重复时,Google 会改写大多数标题和大部分描述,直接从正文里抽句子。150–160 字符附近的描述是一份请求,不是保证;写一段与页面实际内容相符的描述,才能让“改写”发生时伤害更小。",
          ],
        },
        {
          heading: "robots meta 与 robots.txt:不同层,不同职责",
          paragraphs: [
            "robots meta 标签和 robots.txt 常被混为一谈,因为名字里都有“robot”,但它们管的是两个阶段。robots.txt 管抓取:被 disallow 的 URL 不会被爬取。meta 标签管收录:index/noindex 决定被抓取的页面能否出现在结果里,follow/nofollow 决定页面上的链接是否传递权重。被 robots.txt 挡住的页面,如果有别的页面链接它,仍可能出现在结果里——封堵不等于 noindex。",
            "审计里的经典发现是反过来的错误:noindex 页面却被 robots.txt 挡住。爬虫根本抓不到页面,也就永远看不到那条 noindex,指令躺在那里无人阅读。想让页面离开索引,前提是 meta 标签必须先被爬到。",
            "标签内部,取值可以组合:index,follow 是默认值、通常省略;noindex,follow 让页面不进结果但链接仍可被抓取;noarchive、nosnippet 等则调整结果里的具体特性。每个页面只放一条 robots meta——head 里出现重复时,解析结果不可预测。",
          ],
        },
        {
          heading: "生成器该输出什么、不该输出什么",
          paragraphs: [
            "meta keywords 是反面教材:Google 从 2009 年起忽略它,Bing 甚至可能把它当垃圾信号;模板里留着它,在审计者眼里多半等于“站点无人维护”。本生成器保留这个字段,只因某些细分引擎和站内搜索平台仍会要求——没有明确要求就留空。",
            "viewport 则相反,是安静的主力:它的缺失是移动可用性检查里最常见的单一失败原因,漏一个标签就能让全站页面在移动友好性检测中被标记。author 之类的描述性标签对排名权重很小,但零成本,顺手补齐 head。",
            "属性转义比看起来重要:一段含引号的描述,会让未转义的模板悄悄断在属性中间,整块 head 随之残缺。本工具输出的所有值都做了 HTML 转义,留空的字段直接省略而不是输出空标签——一个不说废话两次的 head,才是保持一致的 head。全部生成都在你的浏览器本地完成。",
          ],
        },
      ],
    },
    ja: {
      name: "メタタグ生成",
      tagline: "title・description・keywords・robots・viewport などのメタタグを生成し、<head> にそのまま貼れる HTML をリアルタイム出力します。",
      intro: [
        "メタタグはクローラーが最初に読む要素です。title はランキングシグナルであり、description は Google が書き換えなかった場合そのまま検索結果のスニペットになります。このジェネレーターは title・description・keywords・robots・viewport・author に加え、任意の canonical リンクまで、入力に合わせて整ったタグを即座に組み立てます。",
        "属性値はすべて HTML エスケープされるため、引用符や & 記号でマークアップが壊れることはありません。生成されたコードをテンプレートや CMS の head 部分に貼り付けて利用します。",
      ],
      steps: [
        "ページタイトル(目安 50〜60 文字)とメタディスクリプション(約 160 文字まで)を入力します。",
        "必要に応じて robots・viewport・author を設定します。空欄の項目は出力から除外されます。",
        "生成された <head> スニペットをコピーしてページのテンプレートに貼り付けます。",
      ],
      faqs: [
        {
          q: "title タグの適切な長さは?",
          a: "目安は 50〜60 文字(約 580px)です。それを超えると検索結果で末尾が「…」で切れます。SERP プレビューツールで切断位置を確認できます。",
        },
        {
          q: "meta keywords はまだ効果がありますか?",
          a: "Google は 2009 年以降このタグを無視し、Bing はスパムシグナルとして扱うことさえあります。ニッチな検索エンジンや社内検索が明示的に要求する場合のみ記入してください。",
        },
        {
          q: "robots メタタグは何を制御しますか?",
          a: "index/noindex はページの検索結果への表示、follow/nofollow はページ内リンクが評価を渡すかどうかを制御します。ページ側に記述する必要があり、robots.txt では noindex できません。",
        },
      ],
      deepDive: [
        {
          heading: "title の長さは文字数ではなくピクセルで測る",
          paragraphs: [
            "「50〜60 文字」という経験則の裏には、本当の制約があります。デスクトップの検索結果は title をピクセル予算——Google が描画するフォントサイズでおよそ 580px——で切り詰めます。同じ 60 文字でも、幅は文字体系で大きく変わります。すべて大文字のラテン文字タイトルはピクセルを急速に消費し、CJK の字形はほぼ正方形なので、30 文字の日本語タイトルが 55 文字の英語タイトルより幅を超えることもあります。",
            "切断は致命的ではありません——Google はタグ全文を読みます——しかし見えている部分だけが、クリックを決める前に検索者が目にするすべてです。重要な語は切断位置の前に置くべきで、長いタイトルの末尾はブランド名にとって最悪の位置です。まさに最初に削られる場所だからです。",
            "description にはもう一つ、静かな切断があります。サイズが不適切だったり重複していたりすると、Google はタイトルの多くとディスクリプションの大半を書き換え、本文から文を引っ張ってきます。150〜160 文字近辺の description は依頼であって保証ではありません。ページの実際の内容に合う説明を書くことのほうが、書き換えが起きたときの被害を小さくします。",
          ],
        },
        {
          heading: "robots meta と robots.txt:階層が違い、仕事が違う",
          paragraphs: [
            "robots メタタグと robots.txt は名前に robot を含むせいで混同されますが、制御する段階が違います。robots.txt は取得を司り、disallow された URL はクロールされません。メタタグはインデックス登録を司り、index/noindex が取得済みページの結果表示を、follow/nofollow がページ内リンクの評価伝達を決めます。robots.txt で阻まれたページでも、別のページからリンクされていれば結果に現れ得ます。ブロックは noindex ではありません。",
            "監査で定番の指摘はその逆の誤りです。noindex ページが robots.txt で阻まれている状態。クローラーはページを取得せず、noindex を決して読まず、指示は読まれないまま置かれます。ページをインデックスから外すには、まずメタタグが届くことが前提です。",
            "タグ内部では値が組み合わさります。index,follow はデフォルトで通常省略され、noindex,follow はページを結果から外しつつリンクはクロールさせ、noarchive や nosnippet などは結果の個別機能を調整します。robots meta はページに 1 つだけ——head 内の重複の解決は予測できません。",
          ],
        },
        {
          heading: "ジェネレーターが出すべきもの、出すべきでないもの",
          paragraphs: [
            "meta keywords は反面教師です。Google は 2009 年以降これを無視し、Bing はスパムシグナルとして扱うことさえあります。テンプレートに生き残っているのは、監査者には「手入れされていないサイト」の合図にほかなりません。このジェネレーターが項目を残しているのは、一部のニッチな検索エンジンや社内検索がまだ要求するからで、明示的な要求がなければ空のままにします。",
            "逆に viewport は静かな主力です。その欠落はモバイルユーザビリティ検査で最も単発でよくある失敗であり、タグ 1 つないだけでサイト全ページがフラグされ得ます。author などの記述的タグはランキングへの比重は小さいけれどコストゼロで、head を完成させます。",
            "属性のエスケープは見た目以上に重要です。引用符を含む description は、エスケープされないテンプレートでは属性の途中で静かに壊れ、head 全体が不完全になります。このツールの出力はすべて HTML エスケープ済みで、空欄は空タグとして出力されず省略されます。二度同じことを言わない head こそ、整合性を保てる head です。生成はすべてブラウザ内のローカルで行われます。",
          ],
        },
      ],
    },
    es: {
      name: "Generador de meta etiquetas",
      tagline:
        "Genera title, description, keywords, robots y viewport con salida HTML en vivo, lista para pegar en tu <head>.",
      intro: [
        "Las meta etiquetas son lo primero que leen los rastreadores: el title es una señal de posicionamiento y la description se convierte en tu fragmento cuando Google no la reescribe. Este generador crea un conjunto limpio y válido —title, description, keywords, robots, viewport, author y un enlace canonical opcional— mientras escribes.",
        "Todos los valores se escapan en HTML, así que comillas y ampersands no rompen tu marcado. Copia el bloque en la plantilla o en el head de tu CMS y ajusta por página.",
      ],
      steps: [
        "Escribe el título de la página (50–60 caracteres) y la descripción (hasta ~160).",
        "Configura robots, viewport y author si lo necesitas: los campos vacíos se omiten en la salida.",
        "Copia el fragmento generado y pégalo en la plantilla de tu página.",
      ],
      faqs: [
        {
          q: "¿Cuánto debe medir un title?",
          a: "Unos 50–60 caracteres, unos 580 píxeles con el tamaño que usa Google. Los títulos más largos se cortan con puntos suspensivos: la vista previa SERP te muestra el punto exacto.",
        },
        {
          q: "¿Siguen sirviendo las meta keywords?",
          a: "Google las ignora desde 2009 y Bing puede tratarlas como señal de spam. Rellénalas solo si un buscador de nicho o una plataforma interna lo exige.",
        },
        {
          q: "¿Qué controla la meta etiqueta robots?",
          a: "index/noindex decide si la página puede aparecer en resultados; follow/nofollow, si sus enlaces transmiten autoridad. Debe ir en la propia página: robots.txt no puede hacer noindex.",
        },
      ],
      deepDive: [
        {
          heading: "La longitud del title se mide en píxeles, no en caracteres",
          paragraphs: [
            "El consejo de «50–60 caracteres» es una regla que sustituye a la restricción real: la página de resultados de escritorio trunca el title según un presupuesto de píxeles — unos 580px al tamaño de fuente que usa Google. Los mismos 60 caracteres ocupan anchos muy distintos según la escritura: un título latino en mayúsculas quema píxeles rápido, y los glifos CJK son casi cuadrados, así que un título japonés de 30 caracteres puede superar el ancho de uno inglés de 55.",
            "El corte no es fatal — Google sigue leyendo la etiqueta completa — pero la parte visible es todo lo que ve quien busca antes de decidir el clic, así que las palabras importantes van antes del corte. El peor lugar para un nombre de marca es el final de un título largo: es lo primero que se elimina.",
            "Hay un segundo corte, más silencioso, que rige las descripciones: cuando están mal dimensionadas o duplicadas, Google reescribe la mayoría de los títulos y casi todas las descripciones, extrayendo frases del cuerpo. Una description cercana a 150–160 caracteres es una petición, no una garantía; escribir una que coincida con el contenido real de la página hace que la reescritura, cuando ocurre, dañe menos.",
          ],
        },
        {
          heading: "robots meta frente a robots.txt: capas distintas, trabajos distintos",
          paragraphs: [
            "La meta robots y robots.txt se confunden porque ambas llevan “robot” en el nombre, pero controlan etapas diferentes. robots.txt gobierna la obtención: una URL con disallow no se rastrea. La meta etiqueta gobierna la indexación: index/noindex decide si la página obtenida puede aparecer en resultados, y follow/nofollow si sus enlaces transmiten autoridad. Una página bloqueada por robots.txt puede aparecer igualmente si otras enlazan a ella — bloquear no es noindex.",
            "El hallazgo clásico de auditoría es el error inverso: una página noindex que robots.txt bloquea. El rastreador nunca obtiene la página, nunca ve el noindex, y la instrucción queda sin leer. Para sacar una página del índice, primero tiene que poder llegar la meta etiqueta.",
            "Dentro de la etiqueta, los valores se combinan: index,follow es el valor por defecto y suele omitirse; noindex,follow saca la página de resultados dejando sus enlaces rastreables; noarchive, nosnippet y compañía ajustan rasgos concretos del resultado. Un solo robots meta por página — los duplicados en el head se resuelven de forma impredecible.",
          ],
        },
        {
          heading: "Lo que un generador debe y no debe emitir",
          paragraphs: [
            "Meta keywords es el ejemplo de advertencia: Google la ignora desde 2009, Bing puede tratarla como señal de spam, y mantenerla viva en las plantillas suele señalar un sitio sin mantenimiento a los auditores. Este generador la incluye solo porque algunos buscadores de nicho y plataformas internas la piden aún — déjala vacía salvo requisito explícito.",
            "La etiqueta viewport, en cambio, es la trabajadora silenciosa: su ausencia es el fallo de usabilidad móvil más común de todos, y una sola etiqueta faltante puede marcar todas las páginas de un sitio en las comprobaciones de adaptabilidad. Author y las etiquetas descriptivas pesan poco en el ranking, pero no cuestan nada y completan el head.",
            "El escape de atributos importa más de lo que parece: una description con una comilla rompe en silencio una plantilla sin escapar, truncando el head a mitad de atributo. Todo lo que emite esta herramienta va escapado en HTML, y los campos vacíos se omiten en vez de emitirse como etiquetas vacías — un head que no se repite dos veces es un head que se mantiene consistente. Toda la generación ocurre localmente en tu navegador.",
          ],
        },
      ],
    },
    pt: {
      name: "Gerador de meta tags",
      tagline:
        "Gere title, description, keywords, robots e viewport com saída HTML em tempo real, pronta para colar no seu <head>.",
      intro: [
        "As meta tags são o primeiro que os rastreadores leem: o title é um sinal de ranqueamento e a description vira seu resumo quando o Google não a reescreve. Este gerador monta um conjunto limpo e válido — title, description, keywords, robots, viewport, author e um link canonical opcional — enquanto você digita.",
        "Todos os valores recebem escape HTML, então aspas e e-comercial não quebram sua marcação. Copie o bloco para o template ou para o head do seu CMS e ajuste por página.",
      ],
      steps: [
        "Preencha o título da página (50–60 caracteres) e a meta description (até ~160).",
        "Defina robots, viewport e author conforme precisar — campos vazios são omitidos da saída.",
        "Copie o trecho gerado e cole no template da sua página.",
      ],
      faqs: [
        {
          q: "Qual o tamanho ideal de um title?",
          a: "Cerca de 50–60 caracteres, aproximadamente 580 pixels no tamanho que o Google renderiza. Títulos maiores são cortados com reticências — a prévia SERP mostra exatamente onde o corte acontece.",
        },
        {
          q: "Meta keywords ainda servem para algo?",
          a: "O Google ignora a tag desde 2009 e o Bing pode tratá-la como sinal de spam. Preencha apenas se um buscador de nicho ou plataforma interna exigir.",
        },
        {
          q: "O que a meta tag robots controla?",
          a: "index/noindex decide se a página pode aparecer nos resultados; follow/nofollow, se seus links passam autoridade. Ela precisa estar na própria página — robots.txt não consegue aplicar noindex.",
        },
      ],
      deepDive: [
        {
          heading: "O tamanho do title é medido em pixels, não em caracteres",
          paragraphs: [
            "O conselho de “50–60 caracteres” é uma regra prática no lugar da restrição real: a página de resultados desktop trunca o title por um orçamento de pixels — cerca de 580px no tamanho de fonte que o Google renderiza. Os mesmos 60 caracteres ocupam larguras bem diferentes conforme a escrita: um título latino todo em maiúsculas queima pixels rápido, e os glifos CJK são quase quadrados, então um título japonês de 30 caracteres pode superar a largura de um inglês de 55.",
            "O corte não é fatal — o Google continua lendo a tag inteira — mas a parte visível é tudo que quem busca vê antes de decidir o clique, então as palavras importantes ficam antes do corte. O pior lugar para um nome de marca é o fim de um título longo: é a primeira coisa a ser deletada.",
            "Existe um segundo corte, mais silencioso, que rege as descrições: quando mal dimensionadas ou duplicadas, o Google reescreve a maioria dos títulos e quase todas as descriptions, extraindo frases do corpo. Uma description perto de 150–160 caracteres é um pedido, não uma garantia; escrever uma que corresponda ao conteúdo real da página faz a reescrita, quando acontece, machucar menos.",
          ],
        },
        {
          heading: "robots meta contra robots.txt: camadas diferentes, trabalhos diferentes",
          paragraphs: [
            "A meta robots e o robots.txt se confundem porque ambas têm “robot” no nome, mas controlam etapas diferentes. O robots.txt governa a obtenção: uma URL com disallow não é rastreada. A meta tag governa a indexação: index/noindex decide se a página obtida pode aparecer nos resultados, e follow/nofollow se seus links passam autoridade. Uma página bloqueada pelo robots.txt pode aparecer igualmente se outras páginas linkarem para ela — bloquear não é noindex.",
            "O achado clássico de auditoria é o erro inverso: uma página noindex bloqueada pelo robots.txt. O rastreador nunca obtém a página, nunca vê o noindex, e a instrução fica sem ser lida. Para tirar uma página do índice, a meta tag precisa primeiro poder ser alcançada.",
            "Dentro da tag, os valores se combinam: index,follow é o padrão e costuma ser omitido; noindex,follow tira a página dos resultados mantendo seus links rastreáveis; noarchive, nosnippet e companhia ajustam recursos específicos do resultado. Um só robots meta por página — duplicatas no head são resolvidas de forma imprevisível.",
          ],
        },
        {
          heading: "O que um gerador deve e não deve emitir",
          paragraphs: [
            "Meta keywords é o exemplo de advertência: o Google a ignora desde 2009, o Bing pode tratá-la como sinal de spam, e mantê-la viva nos templates costuma sinalizar um site sem manutenção para os auditores. Este gerador a inclui só porque alguns buscadores de nicho e plataformas internas ainda a pedem — deixe vazia salvo requisito explícito.",
            "A tag viewport, ao contrário, é a trabalhadora silenciosa: sua ausência é a falha de usabilidade móvel mais comum de todas, e uma única tag faltando pode marcar todas as páginas de um site nas verificações de compatibilidade. Author e as tags descritivas pesam pouco no ranqueamento, mas não custam nada e completam o head.",
            "O escape de atributos importa mais do que parece: uma description com uma aspa quebra em silêncio um template sem escape, truncando o head no meio do atributo. Tudo que esta ferramenta emite recebe escape HTML, e os campos vazios são omitidos em vez de sair como tags vazias — um head que não repete nada duas vezes é um head que se mantém consistente. Toda a geração roda localmente no seu navegador.",
          ],
        },
      ],
    },
  },
});
