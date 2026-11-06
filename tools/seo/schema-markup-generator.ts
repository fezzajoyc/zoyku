import { SeoSchemaEngine } from "../_engines/seo-engine-schema";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "schema-markup-generator",
  category: "seo",
  icon: "layers",
  engine: { component: SeoSchemaEngine },
  related: ["meta-tag-generator", "keyword-density-checker", "serp-preview", "open-graph-generator", "utm-builder", "sitemap-generator", "hreflang-generator", "canonical-tag-generator", "robots-txt-generator"],
  copy: {
    en: {
      name: "Schema Markup Generator",
      tagline:
        "Generate valid JSON-LD structured data for Organization, LocalBusiness, Product, Article, FAQPage and HowTo — escaped and ready to paste.",
      intro: [
        "Structured data helps search engines understand the entities on a page: who publishes it, what the product costs, which questions it answers. This generator builds JSON-LD for six of the most used schema.org types, leaves out empty fields, and escapes the output so it is safe inside a <script> tag.",
        "JSON-LD is Google's preferred format over inline microdata and RDFa. The @context must be exactly https://schema.org, dates use ISO 8601, and prices are plain numbers — and each type has required properties, so an Article without headline and author fails validation no matter how the rest looks.",
        "Pick the type that matches the page, fill in the fields, and paste the block into the head or body. Multiple entities can share one @graph, which keeps larger pages readable instead of scattering several script tags down the document.",
        "Valid markup earns rich results; it is not itself a ranking factor, and eligibility is never guaranteed. Markup that parses but violates guidelines — review stars on a page with no actual reviews, for instance — can earn a manual action, so always run the output through a rich results validator before deploying.",
      ],
      steps: [
        "Pick the schema type that matches the page.",
        "Fill in the fields — for FAQPage and HowTo you can add and remove question or step rows.",
        "Copy the JSON-LD block into the page, then run it through Google's Rich Results Test.",
      ],
      faqs: [
        {
          q: "Do FAQ rich results still exist?",
          a: "Google now shows FAQ rich results almost exclusively for well-known government and health sites. The markup is still worth publishing: answer engines and AI Overviews read FAQPage data when sourcing answers, and other engines still honor it.",
        },
        {
          q: "JSON-LD vs. Microdata — which format?",
          a: "JSON-LD is Google's recommended format: one script block, no changes to your HTML elements, easier to generate and maintain. Microdata reaches the same result but is interleaved with your markup.",
        },
        {
          q: "Does valid structured data guarantee rich results?",
          a: "No. Validity makes the page eligible for a feature; Google decides per query and per surface whether to display it. Never promise stars or breadcrumbs in reports based on markup alone.",
        },
      ],
      deepDive: [
        {
          heading: "Eligibility, not entitlement: how rich results actually work",
          paragraphs: [
            "The relationship between structured data and search display is a two-stage gate, and confusing the stages is the root of most overpromising. Stage one is validity: the markup parses, required properties exist, values match the expected formats. Stage two is eligibility, which Google alone decides per query, per surface and per site — and it can decline even flawless markup.",
            "Structured data is not a ranking factor either. What it does is change how a page can be presented: eligibility opens the door to stars, prices, breadcrumbs and event boxes, and those presentations can shift click-through rates substantially. The traffic effect is indirect, mediated by whether Google chooses the rich display for a given query.",
            "Google's own policies shift, and they have tightened recently in exactly the areas people generate markup for: FAQ rich results are now shown almost exclusively for well-known government and health sites, and HowTo display was retired for mobile. So write conservative copy: report markup as deployed and validated, never promise a specific feature will appear. Tools that guarantee rich snippets are describing a world that no longer exists.",
          ],
        },
        {
          heading: "Why JSON-LD won, and what each type demands",
          paragraphs: [
            "Three syntaxes express schema.org: microdata attributes woven through your HTML elements, RDFa attributes, and JSON-LD — a standalone script block of pure data. Google's documentation prefers JSON-LD, and the practical reasons match the preference: the block does not touch your markup, can be generated and injected by templates or a tool like this one, and survives redesigns because it lives next to the content rather than inside it.",
            "Each type carries required properties that validity depends on. An Article needs headline and author; a Product needs name and, for offers, price in plain numbers with a currency; dates are ISO 8601 strings, not whatever format your CMS prints. A missing required property fails validation regardless of everything else being perfect — which is why the generator omits empty fields instead of emitting nulls that validators would flag.",
            "One script per entity grows noisy on rich pages; the @graph construct lets several entities share a single block, with references between them expressed by @id. That is the recommended shape for a page with an Article plus its Organization publisher plus a BreadcrumbList.",
          ],
        },
        {
          heading: "The self-serving markup trap, and validation discipline",
          paragraphs: [
            "The penalty risk is not theoretical: markup that parses but misrepresents the page — review stars on a page with no actual reviews, a Product with a price that differs from the displayed one, FAQ answers invisible to visitors — violates the guidelines and can earn a manual action that outlasts any benefit the rich result would have brought. The rule of thumb is simple: the markup must describe what the visitor can see, without scrolling to the markup.",
            "Validation has two layers worth keeping apart. A syntax validator tells you the JSON is well-formed; Google's Rich Results Test tells you whether the markup qualifies for any feature. Passing the first is table stakes — this generator handles escaping so quotes and ampersands cannot break the script block — and only the second means anything for display.",
            "Deployment discipline closes the loop: paste the block, run the test, then watch Search Console's enhancement reports, which surface errors at scale after templates change. Markup is code shipped to a consumer you do not control — treat it with the same versioning and review habits as the rest of the page. Everything here is generated locally in your browser; nothing is uploaded.",
          ],
        },
      ],
    },
    zh: {
      name: "Schema 结构化数据生成器",
      tagline: "生成 Organization、LocalBusiness、Product、Article、FAQPage、HowTo 六类 JSON-LD 结构化数据,自动转义,可直接粘贴。",
      intro: [
        "结构化数据帮助搜索引擎理解页面上的实体:发布者是谁、商品多少钱、回答了哪些问题。这个生成器为六类最常用的 schema.org 类型生成 JSON-LD,自动省略空字段,并对输出做转义,保证在 <script> 标签内安全。",
        "选择与页面匹配的类型,填写字段,把代码块粘贴到页面 head 或 body。上线前务必用富媒体结果验证工具检查——能解析但违反规范的标记可能招致人工处罚。",
      ],
      steps: [
        "选择与页面匹配的 schema 类型。",
        "填写字段——FAQPage 和 HowTo 可以自由增删问题或步骤行。",
        "复制 JSON-LD 代码块到页面,然后用 Google 富媒体结果测试验证。",
      ],
      faqs: [
        {
          q: "FAQ 富媒体结果还存在吗?",
          a: "Google 现在几乎只对知名政府和健康网站展示 FAQ 富媒体结果。但标记仍然值得发布:答案引擎和 AI Overviews 在组织回答时会读取 FAQPage 数据,其他搜索引擎也依然支持。",
        },
        {
          q: "JSON-LD 和 Microdata 选哪个?",
          a: "JSON-LD 是 Google 推荐的格式:一个脚本块搞定,不用改动 HTML 元素,生成和维护都更容易。Microdata 效果相同,但要和标记交织在一起,改起来麻烦。",
        },
        {
          q: "结构化数据有效就一定能拿到富媒体结果吗?",
          a: "不能。有效性只让页面具备资格,Google 会按查询和展示位置自行决定是否展示。不要仅凭标记就在报告里承诺星评级或面包屑。",
        },
      ],
      deepDive: [
        {
          heading: "资格,不是权利:富媒体结果到底怎么运作",
          paragraphs: [
            "结构化数据与搜索展示之间隔着两道门,混淆这两道门是大多数过度承诺的根源。第一道是有效性:标记能解析、必填属性齐全、取值符合格式。第二道是资格,由 Google 按查询、按展示位置、按站点自行决定——即使标记完美无瑕,它也可以不给。",
            "结构化数据本身也不是排名因素。它改变的是页面的“展示方式”:获得资格意味着星评级、价格、面包屑、活动框这些呈现形式的门被打开,而这些呈现形式会显著影响点击率。流量效果是间接的,取决于 Google 是否愿意为某条查询启用富展示。",
            "Google 自己的政策会变,而且最近恰恰在人们最爱生成标记的领域收紧了:FAQ 富媒体结果如今几乎只留给知名政府和健康网站,HowTo 的展示在移动端已经下线。所以文案要写得保守:只报告“标记已部署并通过验证”,绝不承诺某个特性一定会出现。那些保证能拿到富摘要的工具,描述的是一个已经不存在的世界。",
          ],
        },
        {
          heading: "JSON-LD 为什么胜出,以及每类类型的硬性要求",
          paragraphs: [
            "schema.org 有三种表达语法:织进 HTML 元素的 microdata 属性、RDFa 属性、以及 JSON-LD——一个独立脚本块,装的全是数据。Google 文档明确推荐 JSON-LD,实际理由也一致:这个块不碰你的标记,可以由模板或本工具这样的工具生成注入,而且改版时安然无恙,因为它住在内容旁边而不是内容里面。",
            "每类类型都有决定有效性的必填属性。Article 需要 headline 和 author;Product 需要 name,带 offer 时价格用纯数字加货币代码;日期是 ISO 8601 字符串,不是 CMS 随手打印的格式。缺一个必填属性,其余再完美也过不了验证——所以生成器选择直接省略空字段,而不是输出验证器会报错的 null。",
            "一个实体一个脚本块在复杂页面上会越来越吵;@graph 结构让多个实体共享一个块,实体之间的引用用 @id 表达。一篇带 Organization 发布者和 BreadcrumbList 的 Article 页面,就该用这个形态。",
          ],
        },
        {
          heading: "自利标记的陷阱,以及验证纪律",
          paragraphs: [
            "处罚风险不是理论上的:能解析但歪曲页面的标记——没有真实评论的页面挂星评级、Product 的价格与页面展示不一致、FAQ 答案对访客不可见——违反规范,可能招致一次人工处罚,其杀伤远超富结果本可带来的好处。经验法则很简单:标记描述的必须是访客不看标记就能看到的东西。",
            "验证有两层,值得分开对待。语法验证器告诉你 JSON 格式正确;Google 的富媒体结果测试告诉你标记是否有资格获得任何特性。过第一层只是及格线——本生成器处理了转义,引号和 & 不会打断脚本块——但对展示真正有意义的只有第二层。",
            "部署纪律闭环收尾:粘贴、跑测试,然后盯着 Search Console 的增强功能报告——模板一改,规模化的错误会在那里浮出来。标记是发给一个你无法控制的消费方的代码,请用与页面其余部分相同的版本管理和评审习惯对待它。本页全部生成都在浏览器本地完成,任何内容都不会上传。",
          ],
        },
      ],
    },
    ja: {
      name: "構造化データ(スキーマ)生成",
      tagline: "Organization・LocalBusiness・Product・Article・FAQPage・HowTo の 6 種類の JSON-LD を生成。エスケープ済みでそのまま貼り付けられます。",
      intro: [
        "構造化データは、ページ上のエンティティ(誰が発信しているか、商品の価格、どの質問に答えているか)を検索エンジンに理解させる手がかりです。このジェネレーターはよく使われる 6 つの schema.org 型の JSON-LD を生成し、空のフィールドは除外、出力はエスケープされるので <script> タグ内でも安全です。",
        "ページに合う型を選んでフィールドを埋め、ブロックを head か body に貼ります。公開前には必ずリッチリザルトのバリデーターで確認してください。構文は通ってもガイドラインに違反すると手動対策の対象になり得ます。",
      ],
      steps: [
        "ページに合うスキーマ型を選びます。",
        "フィールドを入力します。FAQPage と HowTo は質問・ステップの行を自由に追加・削除できます。",
        "JSON-LD ブロックをページに貼り、リッチリザルトテストで検証します。",
      ],
      faqs: [
        {
          q: "FAQ のリッチリザルトはもう表示されない?",
          a: "Google は現在、FAQ リッチリザルトを大手の政府・医療サイトにほぼ限定しています。それでもマークアップを公開する価値はあります。生成 AI の回答エンジンや AI Overviews は FAQPage データを参照し、他の検索エンジンも引き続き対応しています。",
        },
        {
          q: "JSON-LD と Microdata、どちらを選ぶ?",
          a: "Google が推奨するのは JSON-LD です。1 つのスクリプトブロックで完結し、HTML 要素を変更せず、生成や保守が容易です。Microdata でも同じ結果になりますが、マークアップと混在します。",
        },
        {
          q: "構造化データが有効ならリッチリザルトは保証される?",
          a: "されません。有効であることは表示の対象になるだけで、表示するかどうかは Google がクエリやサーフェスごとに決めます。マークアップだけで星評価やパンくずを約束してはいけません。",
        },
      ],
      deepDive: [
        {
          heading: "資格であって権利ではない:リッチリザルトは実際どう動くか",
          paragraphs: [
            "構造化データと検索表示の間には二段の門があり、この二段を混同することが過大約束の根源です。第一段は妥当性です。マークアップが解析でき、必須プロパティが揃い、値が期待される形式に一致していること。第二段は適格性で、これは Google だけがクエリ・サーフェス・サイトごとに決めます。完璧なマークアップでも与えないことがあります。",
            "構造化データはランキング要因でもありません。変えるのは「表示のされ方」です。適格性は星、価格、パンくず、イベント枠への扉を開け、こうした表示はクリック率を大きく動かせます。ただしトラフィック効果は間接的で、Google がそのクエリでリッチ表示を選ぶかどうかが間に入ります。",
            "Google 自身のポリシーは動き、しかも最近はマークアップが生成されがちな領域でまさに引き締まりました。FAQ リッチリザルトは著名な政府・医療サイトにほぼ限定され、HowTo の表示はモバイルで終了しています。だから文章は保守的に書きます。報告するのは「マークアップを公開し検証済み」までで、特定機能の表示は決して約束しない。リッチスニペットを保証するツールは、もう存在しない世界を語っています。",
          ],
        },
        {
          heading: "JSON-LD が勝った理由と、型ごとの必須要件",
          paragraphs: [
            "schema.org の表現には三つの構文があります。HTML 要素に織り込む microdata 属性、RDFa 属性、そしてデータだけの独立したスクリプトブロックである JSON-LD。Google のドキュメントは JSON-LD を推し、実務上の理由も一致します。ブロックはマークアップに触れず、テンプレートやこのツールのようなツールで生成・注入でき、リデザインでも無傷で済みます——コンテンツの中ではなく隣に住むからです。",
            "型ごとに、妥当性を決める必須プロパティがあります。Article には headline と author。Product には name、オファーを出すなら通貨付きのプレーンな数値の価格。日付は ISO 8601 の文字列で、CMS が印刷する書式そのままではありません。必須プロパティが一つ欠ければ他が完璧でも検証は落ちます——だからジェネレーターは空フィールドを出力せず、バリデーターが咎める null を出さないのです。",
            "エンティティごとのスクリプトは豊かなページでは騒がしくなります。@graph 構文なら複数のエンティティが一つのブロックを共有し、参照は @id で表せます。Organization 発行元と BreadcrumbList を持つ Article ページは、まさにこの形が推奨されます。",
          ],
        },
        {
          heading: "自己都合マークアップの罠と、検証の規律",
          paragraphs: [
            "ペナルティのリスクは理論ではありません。解析は通るのにページを歪めて伝えるマークアップ——実レビューのないページの星、表示価格と違う Product の価格、訪問者に見えない FAQ の回答——はガイドライン違反であり、リッチリザルトがもたらしたはずの利益より長く残る手動対策を招き得ます。経験則は単純です。マークアップは、訪問者がマークアップを見ずに見えるものを記述しなければならない。",
            "検証には分けて考えるべき二層があります。構文バリデーターは JSON が整形式だと告げ、Google のリッチリザルトテストはマークアップが何かの資格を得るかを告げます。第一層の通過は最低限——このジェネレーターはエスケープを処理し、引用符や & がスクリプトブロックを壊しません——表示に意味を持つのは第二層だけです。",
            "配備の規律が輪を閉じます。貼り付け、テスト実行、その後は Search Console の拡張レポートを見張る——テンプレートが変われば規模のエラーがそこに浮かびます。マークアップは自分で制御できない消費者へ出荷するコードであり、ページの他の部分と同じ版管理とレビューの習慣で扱うべきです。ここでの生成はすべてブラウザ内のローカルで、何もアップロードされません。",
          ],
        },
      ],
    },
    es: {
      name: "Generador de datos estructurados",
      tagline:
        "Genera JSON-LD válido para Organization, LocalBusiness, Product, Article, FAQPage y HowTo, escapado y listo para pegar.",
      intro: [
        "Los datos estructurados ayudan a los buscadores a entender las entidades de una página: quién la publica, cuánto cuesta el producto, qué preguntas responde. Este generador crea JSON-LD para seis de los tipos más usados de schema.org, omite los campos vacíos y escapa la salida para que sea segura dentro de un <script>.",
        "Elige el tipo que corresponda a la página, rellena los campos y pega el bloque en el head o el body. Pasa siempre un validador de resultados enriquecidos antes de publicar: un marcado que parsea pero viola las directrices puede acarrear una acción manual.",
      ],
      steps: [
        "Elige el tipo de esquema que corresponde a la página.",
        "Rellena los campos; en FAQPage y HowTo puedes añadir y quitar filas de preguntas o pasos.",
        "Copia el bloque JSON-LD a la página y pásalo por la Prueba de resultados enriquecidos de Google.",
      ],
      faqs: [
        {
          q: "¿Siguen existiendo los resultados enriquecidos de FAQ?",
          a: "Google ahora los muestra casi solo para sitios gubernamentales y de salud conocidos. El marcado sigue mereciendo la pena: los motores de respuesta y AI Overviews leen los datos de FAQPage al elaborar respuestas, y otros buscadores aún los respetan.",
        },
        {
          q: "¿JSON-LD o Microdata?",
          a: "JSON-LD es el formato recomendado por Google: un solo bloque de script, sin tocar tus elementos HTML, más fácil de generar y mantener. Microdata logra lo mismo pero entrelazado con tu marcado.",
        },
        {
          q: "¿Los datos estructurados válidos garantizan resultados enriquecidos?",
          a: "No. La validez hace que la página sea elegible; Google decide por consulta y por superficie si mostrarlo. No prometas estrellas ni breadcrumbs basándote solo en el marcado.",
        },
      ],
      deepDive: [
        {
          heading: "Elegibilidad, no derecho: cómo funcionan de verdad los resultados enriquecidos",
          paragraphs: [
            "Entre los datos estructurados y la muestra en búsqueda hay dos puertas, y confundirlas es la raíz de casi toda promesa excesiva. La primera es la validez: el marcado parsea, las propiedades requeridas existen, los valores respetan los formatos. La segunda es la elegibilidad, que decide Google solo, por consulta, por superficie y por sitio — y puede negarse incluso ante un marcado impecable.",
            "Los datos estructurados tampoco son un factor de ranking. Lo que cambian es el modo de presentación: la elegibilidad abre la puerta a estrellas, precios, breadcrumbs y cajas de eventos, y esas presentaciones pueden mover mucho la tasa de clics. El efecto en tráfico es indirecto, mediado por si Google elige la presentación enriquecida para esa consulta.",
            "Las políticas de Google se mueven, y se han endurecido precisamente donde la gente genera marcado: los resultados enriquecidos de FAQ se muestran ya casi solo para sitios gubernamentales y de salud conocidos, y la visualización de HowTo se retiró en móvil. Así que escribe texto conservador: informa «marcado publicado y validado» y nunca prometas que una función aparecerá. Las herramientas que garantizan fragmentos enriquecidos describen un mundo que ya no existe.",
          ],
        },
        {
          heading: "Por qué ganó JSON-LD, y lo que exige cada tipo",
          paragraphs: [
            "Tres sintaxis expresan schema.org: atributos microdata tejidos en tus elementos HTML, atributos RDFa, y JSON-LD — un bloque de script independiente con datos puros. La documentación de Google prefiere JSON-LD, y las razones prácticas coinciden: el bloque no toca tu marcado, puede generarse e inyectarse con plantillas o una herramienta como esta, y sobrevive a los rediseños porque vive junto al contenido, no dentro de él.",
            "Cada tipo arrastra propiedades requeridas de las que depende la validez. Un Article necesita headline y author; un Product necesita name y, si lleva oferta, precio en números planos con moneda; las fechas son cadenas ISO 8601, no el formato que imprima tu CMS. Una sola propiedad requerida ausente tumba la validación aunque el resto sea perfecto — por eso el generador omite los campos vacíos en vez de emitir nulls que el validador señalaría.",
            "Un script por entidad se vuelve ruidoso en páginas ricas; la construcción @graph permite que varias entidades compartan un único bloque, con las referencias expresadas por @id. Esa es la forma recomendada para una página con un Article más su Organization editor más un BreadcrumbList.",
          ],
        },
        {
          heading: "La trampa del marcado autopromocional, y la disciplina de validación",
          paragraphs: [
            "El riesgo de penalización no es teórico: marcado que parsea pero tergiversa la página — estrellas en una página sin reseñas reales, un Product cuyo precio difiere del mostrado, respuestas de FAQ invisibles al visitante — viola las directrices y puede acarrear una acción manual que dura más que cualquier beneficio que el resultado enriquecido habría traído. La regla práctica es sencilla: el marcado debe describir lo que el visitante ve sin necesidad de mirar el marcado.",
            "La validación tiene dos capas que conviene separar. Un validador de sintaxis dice que el JSON está bien formado; la Prueba de resultados enriquecidos de Google dice si el marcado califica para alguna función. Pasar la primera es el mínimo — este generador gestiona el escape, así que comillas y ampersands no rompen el bloque de script — y solo la segunda significa algo para la presentación.",
            "La disciplina de despliegue cierra el círculo: pega el bloque, ejecuta la prueba y vigila después los informes de mejoras de Search Console, donde emergen errores a escala cuando cambian las plantillas. El marcado es código enviado a un consumidor que no controlas — trátalo con los mismos hábitos de versionado y revisión que el resto de la página. Todo lo de aquí se genera localmente en tu navegador; nada se sube.",
          ],
        },
      ],
    },
    pt: {
      name: "Gerador de dados estruturados",
      tagline:
        "Gere JSON-LD válido para Organization, LocalBusiness, Product, Article, FAQPage e HowTo, com escape e pronto para colar.",
      intro: [
        "Dados estruturados ajudam os buscadores a entender as entidades de uma página: quem publica, quanto custa o produto, quais perguntas ela responde. Este gerador cria JSON-LD para seis dos tipos mais usados do schema.org, omite campos vazios e aplica escape na saída para ser seguro dentro de uma tag <script>.",
        "Escolha o tipo que corresponde à página, preencha os campos e cole o bloco no head ou no body. Passe sempre por um validador de resultados avançados antes de publicar — marcação que parseia mas viola diretrizes pode gerar uma ação manual.",
      ],
      steps: [
        "Escolha o tipo de schema que corresponde à página.",
        "Preencha os campos — em FAQPage e HowTo você pode adicionar e remover linhas de perguntas ou passos.",
        "Copie o bloco JSON-LD para a página e valide no Teste de resultados avançados do Google.",
      ],
      faqs: [
        {
          q: "Os resultados avançados de FAQ ainda existem?",
          a: "O Google agora os exibe quase só para sites governamentais e de saúde conhecidos. A marcação ainda vale a pena: motores de resposta e AI Overviews leem dados de FAQPage ao montar respostas, e outros buscadores ainda respeitam.",
        },
        {
          q: "JSON-LD ou Microdata?",
          a: "JSON-LD é o formato recomendado pelo Google: um único bloco de script, sem mexer nos elementos HTML, mais fácil de gerar e manter. Microdata chega ao mesmo resultado, mas entrelaçado com sua marcação.",
        },
        {
          q: "Dados estruturados válidos garantem resultado avançado?",
          a: "Não. A validade torna a página elegível; o Google decide por consulta e por superfície se exibe. Nunca prometa estrelas ou breadcrumbs em relatórios baseando-se só na marcação.",
        },
      ],
      deepDive: [
        {
          heading: "Elegibilidade, não direito: como os resultados avançados funcionam de verdade",
          paragraphs: [
            "Entre os dados estruturados e a exibição na busca há duas portas, e confundi-las é a raiz de quase toda promessa exagerada. A primeira é a validade: a marcação parseia, as propriedades obrigatórias existem, os valores respeitam os formatos. A segunda é a elegibilidade, que o Google decide sozinho, por consulta, por superfície e por site — e pode negar até com marcação impecável.",
            "Dados estruturados também não são um fator de ranqueamento. O que eles mudam é o modo de apresentação: a elegibilidade abre a porta para estrelas, preços, breadcrumbs e caixas de eventos, e essas apresentações podem mover bastante a taxa de cliques. O efeito no tráfego é indireto, mediado por o Google escolher ou não a exibição avançada para aquela consulta.",
            "As políticas do Google se movem, e se endureceram justamente onde as pessoas mais geram marcação: os resultados avançados de FAQ agora aparecem quase só para sites governamentais e de saúde conhecidos, e a exibição de HowTo foi aposentada no mobile. Então escreva texto conservador: informe «marcação publicada e validada» e nunca prometa que um recurso vai aparecer. Ferramentas que garantem rich snippets descrevem um mundo que não existe mais.",
          ],
        },
        {
          heading: "Por que o JSON-LD venceu, e o que cada tipo exige",
          paragraphs: [
            "Três sintaxes expressam o schema.org: atributos microdata tecidos nos seus elementos HTML, atributos RDFa, e JSON-LD — um bloco de script independente com dados puros. A documentação do Google prefere JSON-LD, e as razões práticas coincidem: o bloco não toca sua marcação, pode ser gerado e injetado por templates ou por uma ferramenta como esta, e sobrevive aos redesigns porque mora ao lado do conteúdo, não dentro dele.",
            "Cada tipo carrega propriedades obrigatórias das quais a validade depende. Um Article precisa de headline e author; um Product precisa de name e, se traz oferta, preço em números puros com moeda; as datas são strings ISO 8601, não o formato que seu CMS imprime. Uma única propriedade obrigatória ausente derruba a validação mesmo com o resto perfeito — por isso o gerador omite os campos vazios em vez de emitir nulls que o validador apontaria.",
            "Um script por entidade fica barulhento em páginas ricas; a construção @graph permite que várias entidades compartilhem um único bloco, com as referências expressas por @id. Essa é a forma recomendada para uma página com um Article mais sua Organization editora mais um BreadcrumbList.",
          ],
        },
        {
          heading: "A armadilha da marcação autopromocional, e a disciplina de validação",
          paragraphs: [
            "O risco de penalização não é teórico: marcação que parseia mas distorce a página — estrelas numa página sem avaliações reais, um Product cujo preço difere do exibido, respostas de FAQ invisíveis ao visitante — viola as diretrizes e pode render uma ação manual que dura mais que qualquer benefício que o resultado avançado teria trazido. A regra prática é simples: a marcação deve descrever o que o visitante vê sem precisar olhar a marcação.",
            "A validação tem duas camadas que vale separar. Um validador de sintaxe diz que o JSON está bem formado; o Teste de resultados avançados do Google diz se a marcação se qualifica para algum recurso. Passar na primeira é o mínimo — este gerador cuida do escape, então aspas e e-comercial não quebram o bloco de script — e só a segunda significa algo para a exibição.",
            "A disciplina de deploy fecha o círculo: cole o bloco, rode o teste e depois vigie os relatórios de melhorias do Search Console, onde erros em escala aparecem quando os templates mudam. Marcação é código enviado a um consumidor que você não controla — trate-a com os mesmos hábitos de versionamento e revisão do resto da página. Tudo aqui é gerado localmente no seu navegador; nada é enviado.",
          ],
        },
      ],
    },
  },
});
