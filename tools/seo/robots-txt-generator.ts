import { SeoRobotsEngine } from "../_engines/seo-engine-robots";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "robots-txt-generator",
  category: "seo",
  icon: "shield",
  engine: { component: SeoRobotsEngine },
  related: ["sitemap-generator", "meta-tag-generator", "canonical-tag-generator", "utm-builder", "open-graph-generator", "keyword-density-checker", "hreflang-generator", "serp-preview", "schema-markup-generator"],
  copy: {
    en: {
      name: "robots.txt Generator",
      tagline:
        "Build a robots.txt with AI crawler blocklists or allowlists, per-bot rules, crawl-delay and sitemap directives — then copy or download.",
      intro: [
        "robots.txt controls crawler access before a page is even fetched. Beyond the classic User-agent: * rules, you can now decide per AI bot: allow search-adjacent crawlers such as OAI-SearchBot and PerplexityBot, block training crawlers like GPTBot, ClaudeBot, Google-Extended, CCBot and Bytespider, or mix your own policy.",
        "Rules are case-sensitive prefix matches evaluated longest-first — robots.txt has no wildcards beyond the basic * and $ — and a bare Disallow: with no path means allow everything. Only the file at the domain root applies: rules on example.com never cover blog.example.com.",
        "The generator groups user-agents that share a rule, since each bot reads only the most specific group matching it, adds crawl-delay where it is honored — Google ignores the directive; use Search Console's crawl settings — and appends your sitemap directive. Copy the file to your domain root at /robots.txt.",
        "robots.txt controls crawling, not indexing: a disallowed URL can still appear in search results if other sites link to it, so use a noindex meta tag or X-Robots-Tag header when you want removal. Per-AI-bot policies are exactly the case no single default covers — verify the result in Search Console's robots report.",
      ],
      steps: [
        "Pick a preset: allow all, block AI training bots or block everything.",
        "Fine-tune each AI crawler with Allow, Block or no rule, and add Disallow paths for User-agent: *.",
        "Add your sitemap URL, then copy or download the file to your site root.",
      ],
      faqs: [
        {
          q: "Is robots.txt a security control?",
          a: "No. It is advisory: compliant crawlers obey it, but anyone can read it — and it advertises your private paths. Protect sensitive areas with authentication; never rely on Disallow for security.",
        },
        {
          q: "Do AI crawlers actually respect robots.txt?",
          a: "The major documented ones — GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot — state robots.txt support, but compliance is voluntary and varies by operator. For hard guarantees, block at the CDN or firewall layer.",
        },
        {
          q: "Why is my page still indexed after Disallow?",
          a: "Blocking crawling is not blocking indexing: if other pages link to the URL, Google may still index it without its content. To remove a page from results, allow crawling and use a noindex meta tag instead.",
        },
      ],
      deepDive: [
        {
          heading: "How robots.txt is actually parsed: groups and prefix matching",
          paragraphs: [
            "The protocol is small enough to hold in your head once you see its two rules. First, grouping: a bot reads only the single most specific group whose User-agent lines include it — not all groups combined. If GPTBot appears in one block and also under the wildcard *, the wildcard's rules vanish for GPTBot. That is why this generator merges user-agents that share a rule into one group instead of emitting parallel blocks that silently cancel each other.",
            "Second, matching: paths are case-sensitive prefix matches, evaluated longest-first, with exactly two pattern characters — * as a wildcard and $ as an end anchor. Disallow: /search blocks /search, /searching and /search/x alike; Disallow: /search$ blocks only the exact path. And a bare Disallow: with no value means allow everything, which trips up hand-written files.",
            "Two structural facts round out the picture: only the file at the root of a hostname applies — rules on example.com never cover blog.example.com, which needs its own file — and a file claiming to be robots.txt anywhere else is just text. Neither the sitemap directive nor crawl-delay is part of the original standard: crawl-delay is honored by some crawlers (Bing) and ignored by the biggest (Google directs you to Search Console's settings instead).",
          ],
        },
        {
          heading: "Crawling is not indexing: the pairing with noindex",
          paragraphs: [
            "The most consequential misunderstanding about robots.txt is that Disallow removes a page from search results. It does the opposite of removal in one common case: the URL is not fetched, so the crawler never sees its content — but if other pages link to it, the search engine can still list the URL as an entry without a snippet. You blocked crawling and got an indexed URL with no way to attach a noindex.",
            "The correct pairings: to keep crawlers out of a section entirely, Disallow it and accept that linked URLs may still surface bare. To remove pages from results, leave them crawlable and use the noindex meta tag or the X-Robots-Tag HTTP header. To remove them fast, Search Console's removal tool, not robots.txt.",
            "The same logic explains why Disallow plus noindex is a contradiction: the bot blocked from fetching can never read the tag that asks it to delist. Every noindex deployment should start with a check that the page is actually reachable.",
          ],
        },
        {
          heading: "AI crawlers, and the honest limits of the file",
          paragraphs: [
            "The AI-crawler policy menu exists because the user agents are new and the trade-offs are genuinely different: search-adjacent crawlers like OAI-SearchBot and PerplexityBot can bring you visitors, training-focused ones like GPTBot, ClaudeBot, Google-Extended and CCBot contribute nothing to referral traffic, and Bytespider has been observed by some site operators to ignore instructions entirely. Per-bot decisions are exactly the case the single * block was never designed for.",
            "Compliance is voluntary across the board. The operators that document robots.txt support mostly honor it, but nothing enforces the file, and identity is self-reported — a crawler can claim any name. For a hard guarantee, the enforcement point is your CDN or firewall, matching on user-agent with the knowledge that headers are forgeable, or on behavior patterns.",
            "Finally, remember what the file is: a public advertisement. Anyone can read /robots.txt, and it enumerates the paths you consider private — a classic reconnaissance aid. Sensitive areas need authentication; the file helps with polite crawlers and your crawl budget, not with people.",
          ],
        },
      ],
    },
    zh: {
      name: "robots.txt 生成器",
      tagline: "快速生成 robots.txt:AI 爬虫黑白名单、逐个设置允许或屏蔽、crawl-delay 与 sitemap 指令,支持复制和下载。",
      intro: [
        "robots.txt 在页面被抓取之前就决定了爬虫的访问权限。除了经典的 User-agent: * 规则,现在还可以逐个控制 AI 爬虫:允许 OAI-SearchBot、PerplexityBot 这类伴随搜索的爬虫,屏蔽 GPTBot、ClaudeBot、Google-Extended、CCBot、Bytespider 等训练类爬虫,或自由组合策略。",
        "生成器会自动合并共享同一规则的 User-agent,在适用的地方加入 crawl-delay,并附上 sitemap 指令。把文件放到域名根目录 /robots.txt,再到 Search Console 的 robots 报告里验证。",
      ],
      steps: [
        "选择预设:全部允许、屏蔽 AI 训练爬虫或全部禁止。",
        "逐个微调 AI 爬虫的允许/屏蔽/不设置,并为 User-agent: * 添加 Disallow 路径。",
        "填入 sitemap URL,复制或下载文件放到网站根目录。",
      ],
      faqs: [
        {
          q: "robots.txt 是安全手段吗?",
          a: "不是。它只是建议:守规矩的爬虫会遵守,但任何人都能读到它——它还会暴露你的私有路径。敏感区域请用身份验证保护,不要指望 Disallow 保平安。",
        },
        {
          q: "AI 爬虫真的会遵守 robots.txt 吗?",
          a: "GPTBot、ClaudeBot、PerplexityBot、Google-Extended、CCBot 等主要爬虫都声明支持 robots.txt,但遵守是自愿的,因运营方而异。要硬保证,需在 CDN 或防火墙层拦截。",
        },
        {
          q: "加了 Disallow 页面为什么还被收录?",
          a: "禁止抓取不等于禁止收录:如果其他页面链接到该 URL,Google 仍可能在不了解内容的情况下收录它。要让页面退出结果,应允许抓取并改用 noindex meta 标签。",
        },
      ],
      deepDive: [
        {
          heading: "robots.txt 到底是怎么被解析的:分组与前缀匹配",
          paragraphs: [
            "弄懂两条规则,整个协议就能装进脑子。第一,分组:一个 bot 只读取“User-agent 行包含它的那个最具体分组”——不是所有分组叠加生效。如果 GPTBot 出现在一个分组里、同时又命中通配符 *,那么通配符组的规则对它就作废了。这就是本生成器把共享同一规则的 user-agent 合并进一个组的原因——并排输出多个分组会互相悄悄作废。",
            "第二,匹配:路径是区分大小写的前缀匹配,按最长优先求值,模式字符只有两个——* 通配符和 $ 行尾锚。Disallow: /search 会挡住 /search、/searching 和 /search/x;Disallow: /search$ 只挡精确路径。另外,不带路径的裸 Disallow: 意思是“允许一切”——手写文件最常见的翻车点。",
            "两个结构性事实补全全貌:只有主机名根目录下的那个文件生效——example.com 的规则管不到 blog.example.com,后者需要自己的文件;其他任何位置的 robots.txt 都只是普通文本。sitemap 指令和 crawl-delay 也不属于最初的协议:部分爬虫(Bing)尊重 crawl-delay,最大的那个(Google)直接无视,让你去 Search Console 里设置。",
          ],
        },
        {
          heading: "抓取不等于收录:与 noindex 的正确搭配",
          paragraphs: [
            "关于 robots.txt 影响最大的误解,是以为 Disallow 能把页面从搜索结果里移除。在一个常见场景里它反而起反作用:URL 不被抓取,爬虫永远看不到内容——但只要别的页面链接它,搜索引擎仍可能把这条 URL 作为“无摘要”条目列出来。你挡住了抓取,却得到一条无法附加 noindex 的已收录 URL。",
            "正确的搭配:想让爬虫完全别碰某个区块,就 Disallow 它,并接受“被链接的 URL 可能裸露出现”。想让页面退出结果,就保持可抓取,改用 noindex meta 标签或 X-Robots-Tag HTTP 头。想快速移除,用 Search Console 的移除工具,不是 robots.txt。",
            "同一逻辑也解释了为什么 Disallow + noindex 自相矛盾:被挡住抓取的 bot 永远读不到那条请求下架的标签。每次部署 noindex,都应先确认页面确实可被爬到。",
          ],
        },
        {
          heading: "AI 爬虫,以及这个文件的诚实边界",
          paragraphs: [
            "AI 爬虫策略菜单之所以存在,是因为这些 user-agent 都是新的、取舍也确实不同:OAI-SearchBot、PerplexityBot 这类伴随搜索的爬虫可能带来访客;GPTBot、ClaudeBot、Google-Extended、CCBot 这类训练向的爬虫对推荐流量毫无贡献;而 Bytespider 被一些站长观察到完全无视指令。逐个 bot 决策,正是当初单个 * 分组没有设计过的场景。",
            "遵守是全行业自愿的。公开声明支持 robots.txt 的运营方大多会遵守,但没有任何机制强制这个文件,身份也是自报的——爬虫可以自称任何名字。要硬保证,执法点在你的 CDN 或防火墙:按 user-agent 拦截(同时知道请求头可以伪造),或按行为模式识别。",
            "最后,记住这个文件的本质:一份公开广告。任何人都能读到 /robots.txt,它会把你视为私有的路径一一列出来——经典的信息收集素材。敏感区域需要身份验证;这个文件对付的是讲礼貌的爬虫和你的抓取预算,不是人。",
          ],
        },
      ],
    },
    ja: {
      name: "robots.txt 生成",
      tagline: "AI クローラーのブロック/許可リスト、ボット別ルール、crawl-delay、サイトマップ指示に対応した robots.txt を生成し、コピー・ダウンロードできます。",
      intro: [
        "robots.txt はページが取得される前段階でクローラーのアクセスを制御します。従来の User-agent: * ルールに加え、AI ボットを個別に制御できる時代になりました。OAI-SearchBot や PerplexityBot など検索系は許可し、GPTBot・ClaudeBot・Google-Extended・CCBot・Bytespider などの学習系をブロックする、という組み合わせも自由に設定できます。",
        "ジェネレーターは同じルールを持つ User-agent を 1 つのブロックにまとめ、対応されている環境向けに crawl-delay を追加し、サイトマップ指示を末尾に付します。ファイルをドメインのルート(/robots.txt)に置き、Search Console の robots レポートで確認してください。",
      ],
      steps: [
        "プリセットを選びます:すべて許可 / AI 学習ボットをブロック / すべて拒否。",
        "AI クローラーごとに許可・ブロック・設定なしを選び、User-agent: * 向けの Disallow パスを追加します。",
        "サイトマップ URL を入力し、ファイルをコピーまたはダウンロードしてサイトのルートに置きます。",
      ],
      faqs: [
        {
          q: "robots.txt はセキュリティ対策になる?",
          a: "なりません。あくまでお願いです。ルールを守るクローラーは従いますが、誰でも中身を読めるうえ、プライベートなパスを宣伝してしまいます。機密領域は認証で保護し、Disallow をセキュリティに使わないでください。",
        },
        {
          q: "AI クローラーは本当に robots.txt を守る?",
          a: "GPTBot・ClaudeBot・PerplexityBot・Google-Extended・CCBot など主要ボットは robots.txt への対応を明示していますが、遵守は任意で運営者により差があります。確実に防ぐには CDN やファイアウォール層でブロックします。",
        },
        {
          q: "Disallow したのにページがインデックスされるのはなぜ?",
          a: "クロールの禁止はインデックスの禁止ではありません。他ページからリンクされていれば、Google は内容を持たないまま URL をインデックスすることがあります。結果から外すには、クロールを許可して noindex メタタグを使います。",
        },
      ],
      deepDive: [
        {
          heading: "robots.txt は実際どう解析されるか:グループと前方一致",
          paragraphs: [
            "二つの規則を押さえれば、プロトコル全体を頭に入れられます。第一にグルーピング:ボットは、User-agent 行に自分を含む最も具体的な一つのグループだけを読みます——全グループの足し算ではありません。GPTBot があるブロックに現れ、かつワイルドカード * にも当てはまる場合、ワイルドカード側の規則は GPTBot に対して無効になります。だからこのジェネレーターは同じ規則を共有する user-agent を一つのグループへまとめます。並列にブロックを出力すると、互いを静かに無効化するからです。",
            "第二にマッチング:パスは大文字小文字を区別する前方一致で、最長一致優先、パターン文字はちょうど二つ——* がワイルドカード、$ が行末アンカー。Disallow: /search は /search、/searching、/search/x をまとめて遮り、Disallow: /search$ は正確なパスだけを遮ります。そして値のない裸の Disallow: は「すべて許可」の意味で、手書きファイルの定番のつまずきです。",
            "構造的な事実が二つ全体像を閉じます。適用されるのはホスト名のルートにあるファイルだけ——example.com の規則は blog.example.com を覆わず、後者は自分のファイルを要ります——そしてそれ以外の場所にある robots.txt は単なるテキストです。sitemap 指令も crawl-delay も当初のプロトコルには含まれず、crawl-delay は一部のクローラー(Bing)が尊重し、最大手(Google)は無視して Search Console の設定へ誘導します。",
          ],
        },
        {
          heading: "クロールはインデックスではない:noindex との正しい組み合わせ",
          paragraphs: [
            "robots.txt について影響の大きい誤解は、Disallow がページを検索結果から取り除くというものです。あるよくある状況では取り除きと逆の結果になります。URL は取得されず、クローラーは内容を見ません——しかし他ページからリンクされていれば、検索エンジンはスニペットなしの「URL のみ」のエントリとして列挙できてしまいます。クロールを遮った結果、noindex を添えられないインデックス済み URL ができあがるのです。",
            "正しい組み合わせはこうです。セクション全体からクローラーを遠ざけるなら Disallow し、リンクされた URL が裸で現れ得ることは受け入れる。結果から外したいなら、クロールを許したまま noindex メタタグか X-Robots-Tag HTTP ヘッダーを使う。迅速に消したいなら robots.txt ではなく Search Console の削除ツールです。",
            "同じ論理が、Disallow と noindex の矛盾も説明します。取得を遮られたボットは、取り下げを頼むタグを決して読めません。noindex の配備は毎回、ページが実際に到達可能かの確認から始めるべきです。",
          ],
        },
        {
          heading: "AI クローラーと、このファイルの誠実な限界",
          paragraphs: [
            "AI クローラーのポリシーメニューが存在するのは、user-agent が新しく、トレードオフが本当に異なるからです。OAI-SearchBot や PerplexityBot のような検索系は訪問者を運んでくるかもしれません。GPTBot・ClaudeBot・Google-Extended・CCBot のような学習系はリファラルトラフィックに何も寄与しません。そして Bytespider は一部のサイト運営者から指示を完全に無視すると観察されています。ボットごとの決断は、単一の * グループが想定していなかったまさにその状況です。",
            "遵守は業界全体で自発的です。robots.txt 対応を文書化している運営者は概ね守りますが、ファイルを強制する仕組みはなく、身元は自己申告——クローラーは任意の名前を名乗れます。硬い保証の地点はあなたの CDN かファイアウォールで、user-agent での遮断(ヘッダーは偽装できると知りつつ)や振る舞いパターンでの識別になります。",
            "最後に、このファイルが何であるかを思い出してください。公開された広告です。誰もが /robots.txt を読め、あなたが私的とみなすパスを列挙します——古典的な偵察の素材です。機密領域には認証が必要です。このファイルが効くのは行儀の良いクローラーとクロール予算であって、人ではありません。",
          ],
        },
      ],
    },
    es: {
      name: "Generador de robots.txt",
      tagline:
        "Crea un robots.txt con listas de bloqueo o permiso de crawlers de IA, reglas por bot, crawl-delay y sitemap, listo para copiar o descargar.",
      intro: [
        "robots.txt controla el acceso de los rastreadores antes de que una página llegue a descargarse. Más allá de las reglas clásicas de User-agent: *, ahora puedes decidir bot por bot: permitir crawlers ligados a la búsqueda como OAI-SearchBot y PerplexityBot, bloquear los de entrenamiento como GPTBot, ClaudeBot, Google-Extended, CCBot y Bytespider, o combinar tu propia política.",
        "El generador agrupa los user-agents que comparten regla, añade crawl-delay donde se respeta y agrega tu directiva de sitemap. Copia el archivo a la raíz del dominio en /robots.txt y verifícalo en el informe de robots de Search Console.",
      ],
      steps: [
        "Elige un ajuste predefinido: permitir todo, bloquear bots de entrenamiento de IA o bloquear todo.",
        "Ajusta cada crawler de IA con Permitir, Bloquear o sin regla, y añade rutas Disallow para User-agent: *.",
        "Añade la URL de tu sitemap y copia o descarga el archivo a la raíz del sitio.",
      ],
      faqs: [
        {
          q: "¿robots.txt es una medida de seguridad?",
          a: "No. Es orientativo: los crawlers que cumplen lo obedecen, pero cualquiera puede leerlo — y publicita tus rutas privadas. Protege las zonas sensibles con autenticación; nunca confíes en Disallow como seguridad.",
        },
        {
          q: "¿Los crawlers de IA respetan de verdad robots.txt?",
          a: "Los principales documentados —GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot— declaran soporte, pero el cumplimiento es voluntario y varía según el operador. Para garantías reales, bloquea a nivel de CDN o firewall.",
        },
        {
          q: "¿Por qué mi página sigue indexada tras un Disallow?",
          a: "Bloquear el rastreo no es bloquear la indexación: si otras páginas enlazan la URL, Google puede indexarla sin su contenido. Para sacarla de resultados, permite el rastreo y usa una meta etiqueta noindex.",
        },
      ],
      deepDive: [
        {
          heading: "Cómo se analiza realmente robots.txt: grupos y coincidencia por prefijo",
          paragraphs: [
            "Conocidas dos reglas, el protocolo cabe entero en la cabeza. Primero, el agrupamiento: un bot lee únicamente el grupo más específico cuyas líneas User-agent lo incluyan — no la suma de todos los grupos. Si GPTBot aparece en un bloque y también cae bajo el comodín *, las reglas del comodín desaparecen para GPTBot. Por eso este generador fusiona los user-agents que comparten regla en un solo grupo: emitir bloques paralelos hace que se anulen entre sí en silencio.",
            "Segundo, el emparejamiento: las rutas son coincidencias por prefijo, sensibles a mayúsculas, evaluadas de la más larga a la más corta, con exactamente dos caracteres de patrón — * como comodín y $ como ancla de fin. Disallow: /search bloquea /search, /searching y /search/x a la vez; Disallow: /search$ solo bloquea la ruta exacta. Y un Disallow: vacío significa permitir todo, el tropiezo clásico de los archivos escritos a mano.",
            "Dos hechos estructurales cierran el cuadro: solo aplica el archivo en la raíz del hostname — las reglas de example.com nunca cubren blog.example.com, que necesita el suyo — y un robots.txt en cualquier otro lugar es solo texto. Ni la directiva sitemap ni crawl-delay forman parte del estándar original: crawl-delay lo respetan algunos crawlers (Bing) y lo ignora el más grande (Google te remite a los ajustes de Search Console).",
          ],
        },
        {
          heading: "Rastrear no es indexar: la combinación correcta con noindex",
          paragraphs: [
            "El malentendido de mayor consecuencia sobre robots.txt es creer que Disallow saca una página de los resultados. En un caso común hace justo lo contrario: la URL no se descarga, el rastreador nunca ve su contenido — pero si otras páginas la enlazan, el buscador puede seguir listándola como entrada sin fragmento. Bloqueaste el rastreo y obtuviste una URL indexada sin forma de adjuntarle un noindex.",
            "Las combinaciones correctas: para mantener a los rastreadores fuera de una sección, Disallow y acepta que las URLs enlazadas pueden aparecer desnudas. Para sacar páginas de resultados, déjalas rastreables y usa la meta etiqueta noindex o la cabecera HTTP X-Robots-Tag. Para retirarlas rápido, la herramienta de eliminación de Search Console, no robots.txt.",
            "La misma lógica explica por qué Disallow más noindex es una contradicción: el bot al que se le bloquea la descarga jamás leerá la etiqueta que le pide retirarla. Cada despliegue de noindex debería empezar por comprobar que la página es realmente alcanzable.",
          ],
        },
        {
          heading: "Crawlers de IA y los límites honestos del archivo",
          paragraphs: [
            "El menú de políticas por crawler de IA existe porque los user agents son nuevos y los equilibrios son realmente distintos: los ligados a búsqueda como OAI-SearchBot y PerplexityBot pueden traerte visitantes; los de entrenamiento como GPTBot, ClaudeBot, Google-Extended y CCBot no aportan nada al tráfico de referencia; y Bytespider ha sido observado por algunos operadores de sitios ignorando las instrucciones por completo. Las decisiones bot a bot son justamente el caso para el que el único bloque * nunca fue diseñado.",
            "El cumplimiento es voluntario en todo el sector. Los operadores que documentan soporte de robots.txt suelen cumplirlo, pero nada obliga al archivo y la identidad es autodeclarada — un crawler puede decir llamarse como quiera. Para una garantía dura, el punto de aplicación es tu CDN o firewall: filtrar por user-agent sabiendo que las cabeceras se falsifican, o por patrones de comportamiento.",
            "Por último, recuerda qué es el archivo: un anuncio público. Cualquiera puede leer /robots.txt, y enumera las rutas que consideras privadas — un clásico auxiliar de reconocimiento. Las áreas sensibles necesitan autenticación; el archivo sirve para crawlers educados y tu presupuesto de rastreo, no para personas.",
          ],
        },
      ],
    },
    pt: {
      name: "Gerador de robots.txt",
      tagline:
        "Monte um robots.txt com bloqueio ou permissão de rastreadores de IA, regras por bot, crawl-delay e sitemap — copie ou baixe o arquivo.",
      intro: [
        "O robots.txt controla o acesso dos rastreadores antes mesmo de uma página ser baixada. Além das regras clássicas de User-agent: *, hoje você decide bot por bot: permitir rastreadores ligados à busca como OAI-SearchBot e PerplexityBot, bloquear os de treinamento como GPTBot, ClaudeBot, Google-Extended, CCBot e Bytespider, ou montar sua própria política.",
        "O gerador agrupa user-agents que compartilham regra, inclui crawl-delay onde ele é respeitado e acrescenta a diretiva de sitemap. Copie o arquivo para a raiz do domínio em /robots.txt e verifique no relatório de robots do Search Console.",
      ],
      steps: [
        "Escolha uma predefinição: permitir tudo, bloquear bots de treinamento de IA ou bloquear tudo.",
        "Ajuste cada rastreador de IA com Permitir, Bloquear ou sem regra, e adicione caminhos Disallow para User-agent: *.",
        "Informe a URL do sitemap e copie ou baixe o arquivo para a raiz do site.",
      ],
      faqs: [
        {
          q: "robots.txt é um controle de segurança?",
          a: "Não. Ele é consultivo: rastreadores que cumprem o obedecem, mas qualquer pessoa pode lê-lo — e ele divulga seus caminhos privados. Proteja áreas sensíveis com autenticação; nunca conte com Disallow como segurança.",
        },
        {
          q: "Os rastreadores de IA realmente respeitam o robots.txt?",
          a: "Os principais documentados — GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot — declaram suporte, mas o cumprimento é voluntário e varia por operador. Para garantia real, bloqueie na camada de CDN ou firewall.",
        },
        {
          q: "Por que minha página continua indexada após o Disallow?",
          a: "Bloquear o rastreio não é bloquear a indexação: se outras páginas linkam a URL, o Google pode indexá-la sem o conteúdo. Para tirar uma página dos resultados, permita o rastreio e use uma meta tag noindex.",
        },
      ],
      deepDive: [
        {
          heading: "Como o robots.txt é realmente interpretado: grupos e casamento por prefixo",
          paragraphs: [
            "Conhecidas duas regras, o protocolo inteiro cabe na cabeça. Primeiro, o agrupamento: um bot lê apenas o grupo mais específico cujas linhas User-agent o incluam — não a soma de todos os grupos. Se o GPTBot aparece num bloco e também cai sob o curinga *, as regras do curinga desaparecem para o GPTBot. Por isso este gerador funde user-agents que compartilham regra num único grupo: emitir blocos paralelos faz com que se anulem em silêncio.",
            "Segundo, o casamento: os caminhos são correspondências por prefixo, sensíveis a maiúsculas, avaliados da mais longa para a mais curta, com exatamente dois caracteres de padrão — * como curinga e $ como âncora de fim. Disallow: /search bloqueia /search, /searching e /search/x de uma vez; Disallow: /search$ bloqueia só o caminho exato. E um Disallow: vazio significa permitir tudo — a tropeçada clássica dos arquivos escritos à mão.",
            "Dois fatos estruturais fecham o quadro: só vale o arquivo na raiz do hostname — as regras de exemplo.com nunca cobrem blog.exemplo.com, que precisa do próprio arquivo — e um robots.txt em qualquer outro lugar é só texto. Nem a diretiva sitemap nem o crawl-delay fazem parte do padrão original: o crawl-delay é respeitado por alguns rastreadores (Bing) e ignorado pelo maior (Google, que te remete às configurações do Search Console).",
          ],
        },
        {
          heading: "Rastrear não é indexar: a combinação certa com o noindex",
          paragraphs: [
            "O mal-entendido de maior consequência sobre o robots.txt é acreditar que o Disallow tira uma página dos resultados. Num caso comum faz exatamente o contrário: a URL não é baixada, o rastreador nunca vê o conteúdo — mas se outras páginas linkam para ela, o buscador pode ainda listá-la como entrada sem resumo. Você bloqueou o rastreio e ganhou uma URL indexada sem como anexar um noindex.",
            "As combinações certas: para manter rastreadores fora de uma seção, Disallow e aceite que URLs linkadas podem aparecer nuas. Para tirar páginas dos resultados, deixe-as rastreáveis e use a meta tag noindex ou o cabeçalho HTTP X-Robots-Tag. Para remover rápido, a ferramenta de remoção do Search Console, não o robots.txt.",
            "A mesma lógica explica por que Disallow mais noindex é uma contradição: o bot impedido de baixar jamais lerá a tag que pede a retirada. Todo deploy de noindex deveria começar conferindo que a página é de fato alcançável.",
          ],
        },
        {
          heading: "Rastreadores de IA e os limites honestos do arquivo",
          paragraphs: [
            "O menu de políticas por rastreador de IA existe porque os user agents são novos e as trocas são realmente diferentes: os ligados à busca como OAI-SearchBot e PerplexityBot podem trazer visitantes; os de treinamento como GPTBot, ClaudeBot, Google-Extended e CCBot não contribuem nada para o tráfego de referência; e o Bytespider já foi observado por alguns operadores de sites ignorando instruções por completo. Decisões bot por bot são exatamente o caso para o qual o único bloco * nunca foi desenhado.",
            "O cumprimento é voluntário no setor inteiro. Os operadores que documentam suporte ao robots.txt em geral o respeitam, mas nada obriga o arquivo e a identidade é autodeclarada — um rastreador pode dizer que se chama como quiser. Para garantia dura, o ponto de aplicação é seu CDN ou firewall: filtrar por user-agent sabendo que cabeçalhos se falsificam, ou por padrões de comportamento.",
            "Por fim, lembre o que o arquivo é: um anúncio público. Qualquer pessoa pode ler o /robots.txt, e ele enumera os caminhos que você considera privados — um clássico auxiliar de reconhecimento. Áreas sensíveis precisam de autenticação; o arquivo serve para rastreadores educados e seu orçamento de rastreio, não para pessoas.",
          ],
        },
      ],
    },
  },
});
