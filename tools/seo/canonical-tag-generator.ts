import { SeoTagsEngine, type TagEngineProps } from "../_engines/seo-engine-tags";
import { loc } from "../_engines/seo-locale";
import { defineTool } from "../_lib/types";

const props: TagEngineProps = {
  fields: [
    {
      key: "canonical",
      label: loc("Canonical URL", "canonical URL", "正規 URL(canonical)", "URL canonical", "URL canonical"),
      placeholder: "https://example.com/page",
      hint: loc(
        "Absolute URL of the preferred version, including https://.",
        "首选版本的绝对 URL,必须带 https://。",
        "正規版の絶対 URL(https:// を含む)を入力します。",
        "URL absoluta de la versión preferida, con https://.",
        "URL absoluta da versão preferida, com https://.",
      ),
    },
  ],
  lines: [{ template: '<link rel="canonical" href="{{canonical}}">', when: "canonical" }],
  tips: {
    en: [
      "Always use an absolute URL — relative paths are invalid in canonical tags.",
      "Pick one site-wide form (https, host with or without www, trailing slash) and apply it everywhere.",
      "Every indexable page should carry a self-referencing canonical.",
      "Canonical is a hint, not a redirect: use 301s when a duplicate should disappear for users too.",
      "Parameterized, sorted and UTM-tagged URLs should canonical to the clean version.",
    ],
    zh: [
      "canonical 必须用绝对 URL,相对路径无效。",
      "全站统一一种形式(https、是否带 www、结尾斜杠)并贯彻到底。",
      "每个可收录页面都应带自引用 canonical。",
      "canonical 只是信号而非重定向:如果重复页面对用户也该消失,用 301。",
      "带参数、排序和 UTM 的 URL 应 canonical 到干净版本。",
    ],
    ja: [
      "canonical は必ず絶対 URL で指定します。相対パスは無効です。",
      "サイト全体で 1 つの形式(https、www の有無、末尾スラッシュ)に統一します。",
      "インデックス対象のページにはすべて自己参照 canonical を付けます。",
      "canonical はヒントでありリダイレクトではありません。ユーザーにも不要な重複は 301 で。",
      "パラメータ付き・並び替え・UTM 付き URL はクリーンな URL に canonical を向けます。",
    ],
    es: [
      "Usa siempre una URL absoluta: las rutas relativas no son válidas en canonical.",
      "Elige una sola forma para todo el sitio (https, www o no, barra final) y aplícala siempre.",
      "Cada página indexable debería llevar un canonical autorreferenciado.",
      "Canonical es una señal, no una redirección: usa 301 si el duplicado debe desaparecer también para el usuario.",
      "URLs con parámetros, ordenaciones o UTM deben canonicalizar a la versión limpia.",
    ],
    pt: [
      "Use sempre uma URL absoluta — caminhos relativos são inválidos no canonical.",
      "Escolha uma única forma para todo o site (https, www ou não, barra final) e aplique sempre.",
      "Toda página indexável deve ter um canonical autorreferente.",
      "Canonical é um sinal, não um redirect: use 301 quando o duplicado deve sumir também para o usuário.",
      "URLs com parâmetros, ordenações ou UTM devem canonicalizar para a versão limpa.",
    ],
  },
  outputLabel: loc("HTML snippet", "HTML 代码", "HTML スニペット", "Fragmento HTML", "Trecho HTML"),
};

export default defineTool({
  slug: "canonical-tag-generator",
  category: "seo",
  icon: "link",
  engine: { component: SeoTagsEngine, props },
  related: ["meta-tag-generator", "hreflang-generator", "sitemap-generator", "utm-builder", "open-graph-generator", "keyword-density-checker", "serp-preview", "robots-txt-generator", "schema-markup-generator"],
  copy: {
    en: {
      name: "Canonical Tag Generator",
      tagline:
        "Generate a correct rel=canonical link tag and learn how to normalize URLs so search engines index the one version you want.",
      intro: [
        "A canonical tag tells search engines which URL to index when the same content is reachable at several addresses — with and without trailing slash, with query strings, UTM parameters, http/https or www variants. Done right, it consolidates duplicate URLs into one ranking signal instead of splitting it.",
        "The canonical URL must be absolute — scheme and host included — and each page may carry exactly one rel=canonical. Canonicals pointing at redirected or noindex URLs are ignored, and a canonical that conflicts with hreflang or internal links is one of the most common technical-SEO faults in audits.",
        "The generator normalizes as you type: lowercase scheme and host, a consistent trailing-slash decision, query parameters kept deliberate and fragments stripped — anchors are never sent to a server, so a #fragment in a canonical is always wrong.",
        "rel=canonical is a strong hint rather than a directive: Google weighs it alongside internal links and sitemap entries, and Search Console's URL Inspection shows which URL was actually chosen. Making the tag, sitemap and internal links agree works far better than one tag fighting the rest of the site.",
      ],
      steps: [
        "Choose one canonical URL format for your whole site: https, host with or without www, trailing slash or not.",
        "Paste the absolute URL of the page's preferred version.",
        "Copy the link tag into the page <head> and verify it with the URL Inspection tool.",
      ],
      faqs: [
        {
          q: "What does a canonical tag actually do?",
          a: "It consolidates duplicates: signals from alternative URLs — UTM copies, parameterized sorts, print views — are merged into the canonical URL, so it ranks instead of the equity being split across duplicates.",
        },
        {
          q: "Should every page have a self-referencing canonical?",
          a: "Yes, that is the recommended default. Even unique pages should declare their own URL as canonical to guard against parameter, trailing-slash and case variants you have not noticed yet.",
        },
        {
          q: "Canonical vs. noindex vs. redirect — which one?",
          a: "Use a 301 redirect when the duplicate should send users elsewhere, noindex when it must stay accessible but out of results, and canonical when both versions must remain live and crawlable.",
        },
      ],
      deepDive: [
        {
          heading: "Why duplicate URLs exist and what consolidation means",
          paragraphs: [
            "Duplicate URLs are not a mistake — they are a natural product of how sites work. The same page is reachable with a trailing slash and without, over http and https, with and without www, with UTM parameters appended by every campaign link, with sort and filter parameters on listing pages, and through print or amp views. The server answers all of them with identical content; search engines, seeing no instruction, index them as separate documents.",
            "rel=canonical is the instruction: it says “these addresses are copies; merge their signals into this one”. Consolidation matters because ranking signals — links, clicks, quality estimates — attach to the URL they were earned on. Split across five duplicates, a page competes against itself; consolidated, it competes with the page you actually wanted to beat.",
            "The tag is a strong hint, not a command. Google combines it with internal-link patterns, sitemap entries and redirect behavior, and quietly overrides a canonical that disagrees with everything else on the site. This is why a canonical tag that fights your own sitemap or navigation usually loses — agreement across signals beats correctness on one signal alone.",
          ],
        },
        {
          heading: "The classic misuses, and self-referencing as the default",
          paragraphs: [
            "The audit classics: a relative URL instead of an absolute one, a #fragment that servers never see, a canonical pointing at a 301 redirect (search engines must resolve the chain, and some will not), a canonical aimed at a noindex page (contradictory instructions — pick one), and canonicals to the homepage on every paginated listing, which effectively asks for pages 2+ to be removed from the index.",
            "The most effective habit is self-referencing by default: every page declares itself canonical, even the unique ones. It costs nothing and immunizes you against the variants nobody has noticed yet — a parameter added by a plugin next month, a trailing-slash inconsistency introduced by a framework upgrade. The self-referential tag is what makes the first variant harmless instead of a discovery.",
            "Choosing between the tools is one decision each: 301 redirect when the duplicate should physically send users elsewhere, noindex when it must stay reachable but out of results (faceted navigation, internal search), canonical when both versions must remain live and crawlable. Mixing them — a noindex page whose canonical points elsewhere — sends contradictory signals and delays everything.",
          ],
        },
        {
          heading: "Normalization details this generator handles for you",
          paragraphs: [
            "A canonical URL must be absolute — scheme and host included — and each page may carry exactly one. The generator lowercases scheme and host (hosts are case-insensitive on the wire, but a mixed-case canonical is another near-duplicate to search engines), enforces one trailing-slash decision across your site, keeps query parameters only when deliberate, and strips fragments, which are client-side only.",
            "Parameter ordering is the subtle one: ?b=1&a=2 and ?a=2&b=1 are the same resource but different strings, and some crawlers treat them as separate. Canonicals solve that after the fact; the cleaner fix is to sort and trim parameters server-side. If you must keep parameters in a canonical, keep the canonical form of the parameter string too.",
            "Verification belongs in Search Console's URL Inspection, which reports which URL Google actually selected for the page — the tag, the sitemap and the internal links can all be right individually and still lose to a redirect chain. Everything here runs in your browser: no URL you type is uploaded anywhere.",
          ],
        },
      ],
    },
    zh: {
      name: "Canonical 标签生成器",
      tagline: "生成正确的 rel=canonical 链接标签,并掌握 URL 规范化要点,让搜索引擎只收录你想要的版本。",
      intro: [
        "当同一内容可以通过多个地址访问时——带或不带尾部斜杠、带查询串、UTM 参数、http/https 或 www 变体——canonical 标签会告诉搜索引擎该收录哪个 URL。用得正确,它能把重复 URL 的信号合并为一,而不是分散到各个副本上。",
        "填入首选版本的绝对 URL,把标签复制到对应页面的 <head>。下方清单覆盖了大多数实现会搞错的规范化细节。",
      ],
      steps: [
        "为全站确定唯一的 canonical 格式:https、是否带 www、是否带尾部斜杠。",
        "粘贴该页面首选版本的绝对 URL。",
        "把链接标签复制进页面 <head>,并用网址检查工具验证。",
      ],
      faqs: [
        {
          q: "canonical 标签到底起什么作用?",
          a: "它合并重复页面:来自各种变体 URL(UTM 副本、参数化排序、打印视图)的信号会被归并到 canonical URL 上,由它参与排名,而不是把权重分散到各个副本。",
        },
        {
          q: "每个页面都需要自引用 canonical 吗?",
          a: "需要,这是推荐做法。即使是唯一页面,也应声明自身 URL 为 canonical,以防你尚未发现的参数、尾部斜杠或大小写变体。",
        },
        {
          q: "canonical、noindex、重定向怎么选?",
          a: "重复页面需要把用户引走时用 301 重定向;必须保持可访问但不能进结果时用 noindex;两个版本都必须保留且可抓取时用 canonical。",
        },
      ],
      deepDive: [
        {
          heading: "重复 URL 从哪来,合并到底合并什么",
          paragraphs: [
            "重复 URL 不是错误,而是网站运转方式自然长出来的东西。同一个页面,带斜杠和不带斜杠、http 和 https、带 www 和不带 www、每条推广链接都追加的 UTM 参数、列表页的排序筛选参数、打印视图和 AMP 视图——服务器对它们全部返回同样的内容;搜索引擎没有别的指令,就把它们当成一份份独立文档收录。",
            "rel=canonical 就是那条指令:告诉搜索引擎“这些地址都是副本,把它们的信号合并到这一个上”。合并之所以重要,是因为排名信号——链接、点击、质量评估——都记在“挣得它们的那条 URL”名下。分散在五个副本上,页面是在和自己竞争;合并到一起,它才有资格和真正想赢的那个页面竞争。",
            "这个标签是强提示,不是命令。搜索引擎会把它与内链分布、站点地图和重定向行为放在一起权衡,当 canonical 与全站其他信号处处矛盾时,会被悄悄忽略。所以一个与自家站点地图、导航打架的 canonical 通常会输——所有信号口径一致,胜过单条信号的正确。",
          ],
        },
        {
          heading: "审计里的经典误用,以及自引用默认化",
          paragraphs: [
            "审计的经典款:用了相对 URL 而不是绝对 URL;写了服务器永远收不到的 #fragment;canonical 指向一条 301 重定向(搜索引擎需要再解析一次跳转链,有的干脆不解析);canonical 指向 noindex 页面(两条指令互相矛盾,只能留一个);以及分页列表每页都 canonical 到首页——这等于主动请求第 2 页起全部移出索引。",
            "最有效的习惯是默认自引用:每个页面都声明自己是 canonical,包括那些独一无二的页面。零成本,而且能免疫于尚未被发现的变体——下个月某个插件加上的参数、框架升级引入的尾斜杠不一致。自引用标签让第一个变体出生时就是无害的,而不是等哪天被“发现”。",
            "三种手段各对应一个决策:重复页需要把用户物理引走时用 301;必须保持可访问但不能进结果时用 noindex(分面导航、站内搜索);两个版本都必须保留且可抓取时用 canonical。混着用——比如 noindex 页面却 canonical 到别处——会让指令互相打架,拖慢一切。",
          ],
        },
        {
          heading: "本生成器替你处理的规范化细节",
          paragraphs: [
            "canonical URL 必须是绝对地址——协议和域名都要写全——且每个页面只能有一条。生成器会把协议和域名转小写(传输层面域名不区分大小写,但大小写混排的 canonical 在搜索引擎眼里又是一份近似重复)、全站统一尾斜杠策略、只在有意保留时留下查询参数、并剥离 fragment——那是纯客户端的东西。",
            "参数顺序是个隐蔽坑:?b=1&a=2 和 ?a=2&b=1 是同一个资源、两串不同的字符,部分爬虫会当两个页面。canonical 能事后兜底;更干净的做法是服务端就把参数排序裁剪。如果 canonical 里必须保留参数,请同样保留参数串的规范形态。",
            "最终验证要落在搜索资源平台的网址检查上:它会报告 Google 实际为这个页面选了哪条 URL——标签、站点地图、内链可以各自都对,却依然输给一条重定向链。本页所有处理都在你的浏览器里完成:输入的任何 URL 不会被上传到任何地方。",
          ],
        },
      ],
    },
    ja: {
      name: "canonical タグ生成",
      tagline: "正しい rel=canonical リンクタグを生成し、URL の正規化のポイントをおさえて、検索エンジンに意図した 1 つの URL だけをインデックスさせます。",
      intro: [
        "同じコンテンツに複数の URL で到達できる場合(末尾スラッシュの有無、クエリ文字列、UTM パラメータ、http/https、www の有無)、canonical タグはどの URL をインデックスすべきかを検索エンジンに伝えます。正しく使えば重複 URL のシグナルが 1 つに統合され、分散しません。",
        "正規版の絶対 URL を入力し、タグをそのページの <head> に貼ってください。チェックリストには実装で間違えやすい正規化の詳細をまとめています。",
      ],
      steps: [
        "サイト全体で 1 つの canonical 形式を決めます:https、www の有無、末尾スラッシュの有無。",
        "そのページの正規版の絶対 URL を入力します。",
        "リンクタグをページの <head> にコピーし、URL 検査ツールで確認します。",
      ],
      faqs: [
        {
          q: "canonical タグは実際に何をする?",
          a: "重複を統合します。UTM 付きコピー・パラメータ付き並び替え・印刷ビューなど代替 URL のシグナルは canonical URL に合算され、評価が重複間で分散せず canonical が順位を持ちます。",
        },
        {
          q: "全ページに自己参照 canonical が必要?",
          a: "はい、それが推奨されるデフォルトです。固有のページでも、気づいていないパラメータや末尾スラッシュ・大文字小文字の揺れに備えて、自身の URL を canonical として宣言すべきです。",
        },
        {
          q: "canonical・noindex・リダイレクトの使い分けは?",
          a: "重複ページからユーザーを誘導したいなら 301 リダイレクト、アクセスは残しつつ結果から外すなら noindex、両方の URL を公開かつクロール可能のままにするなら canonical です。",
        },
      ],
      deepDive: [
        {
          heading: "重複 URL はなぜ生まれ、統合は何を統合するのか",
          paragraphs: [
            "重複 URL はミスではなく、サイトの仕組みから自然に生まれます。同じページは末尾スラッシュあり/なし、http と https、www あり/なし、あらゆるキャンペーンリンクが付ける UTM パラメータ、一覧ページの並び替えや絞り込みのパラメータ、印刷ビューや AMP で到達できます。サーバーはそのすべてに同じ内容を返します。検索エンジンは別の指示がなければ、それらを独立した文書として扱います。",
            "rel=canonical はその指示です。「これらのアドレスは複製であり、シグナルをこの 1 つに統合せよ」と伝えます。統合が重要なのは、ランキングシグナル——リンク、クリック、品質評価——が「獲得した URL」に紐づくからです。5 つの複製に分かれていればページは自分自身と競合し、統合されて初めて、本来勝ちたいページと競える状態になります。",
            "このタグは強いヒントであって命令ではありません。検索エンジンは内部リンクの分布、サイトマップ、リダイレクトの挙動と合わせて評価し、サイト内の他のシグナルと全面衝突する canonical は静かに無視します。だからサイトマップやナビゲーションと戦う canonical はたいてい負けます。全シグナルの一致が、単一シグナルの正しさに勝ります。",
          ],
        },
        {
          heading: "監査で定番の誤用と、自己参照をデフォルトに",
          paragraphs: [
            "監査の定番品は決まっています。絶対 URL ではなく相対 URL を書く。サーバーが決して受け取らない #fragment を書く。301 リダイレクトを指す canonical(検索エンジンはチェーンを辿り直す必要があり、辿らないものもある)。noindex ページを指す canonical(矛盾した指示であり、どちらか一つに)。そしてページネーション全ページがホームページへ canonical を張る——これは 2 ページ目以降をインデックスから除外してくれ、という依頼そのものです。",
            "最も効果的な習慣は、自己参照をデフォルトにすることです。固有のページを含め、すべてのページが自分自身を canonical として宣言します。コストはゼロで、まだ気づかれていないバリエーション——来月プラグインが付けるパラメータ、フレームワーク更新が持ち込む末尾スラッシュの揺れ——への免疫になります。自己参照タグがあると、最初のバリエーションは「発見される問題」ではなく「生まれたときから無害」です。",
            "手段の使い分けは各 1 つの判断です。複製ページからユーザーを物理的に誘導するなら 301、到達は保ちつつ結果から外すなら noindex(ファセットナビゲーション、サイト内検索)、両方の URL を公開かつクロール可能のままにするなら canonical。混ぜる——noindex ページが別 URL へ canonical を張る——と指示が衝突し、何もかも遅くなります。",
          ],
        },
        {
          heading: "このジェネレーターが処理する正規化の細部",
          paragraphs: [
            "canonical URL は絶対 URL——スキームとホスト込み——でなければならず、ページごとに 1 つだけ。このジェネレーターはスキームとホストを小文字に統一し(通信上ホストは大小を区別しませんが、大小混在の canonical は検索エンジンにとってまた 1 つの近似重複です)、末尾スラッシュの方針をサイト全体で揃え、クエリパラメータは意図があるときだけ残し、クライアント側限定の fragment は剥ぎます。",
            "厄介なのはパラメータの順序です。?b=1&a=2 と ?a=2&b=1 は同じリソースで別の文字列であり、クローラによっては別ページ扱い。canonical は事後の保険として機能しますが、より清潔な解はサーバー側でパラメータを並べ替え・削ることです。canonical にパラメータを残すなら、その文字列の正規形も残してください。",
            "最終検証は Search Console の URL 検査に委ねられます。Google がこのページに実際に選んだ URL を報告してくれる——タグ、サイトマップ、内部リンクがそれぞれ正しくても、リダイレクトチェーンに負けることはあります。ここでの処理はすべてブラウザ内で完結し、入力した URL がどこかへ送信されることはありません。",
          ],
        },
      ],
    },
    es: {
      name: "Generador de etiquetas canonical",
      tagline:
        "Genera una etiqueta rel=canonical correcta y aprende a normalizar URLs para que los buscadores indexen la versión que quieres.",
      intro: [
        "La etiqueta canonical indica a los buscadores qué URL indexar cuando el mismo contenido se alcanza en varias direcciones: con o sin barra final, con cadenas de consulta, parámetros UTM, variantes http/https o www. Bien usada, consolida las URLs duplicadas en una sola señal de posicionamiento.",
        "Introduce la URL absoluta de la versión preferida y copia la etiqueta en el <head> de esa página. La lista cubre los detalles de normalización que más se implementan mal.",
      ],
      steps: [
        "Elige un único formato canonical para todo el sitio: https, dominio con o sin www, barra final o no.",
        "Pega la URL absoluta de la versión preferida de la página.",
        "Copia la etiqueta al <head> y verifícala con la herramienta de Inspección de URLs.",
      ],
      faqs: [
        {
          q: "¿Qué hace realmente una etiqueta canonical?",
          a: "Consolida duplicados: las señales de las URLs alternativas —copias UTM, ordenaciones parametrizadas, vistas de impresión— se fusionan en la URL canonical, que posiciona en lugar de repartir autoridad entre duplicados.",
        },
        {
          q: "¿Toda página necesita un canonical autorreferenciado?",
          a: "Sí, es el valor por defecto recomendado. Incluso las páginas únicas deben declarar su propia URL como canonical para cubrir variantes de parámetros, barra final o mayúsculas que aún no has detectado.",
        },
        {
          q: "¿Canonical, noindex o redirección?",
          a: "Usa una redirección 301 cuando el duplicado debe llevar al usuario a otra parte, noindex cuando debe seguir accesible pero fuera de resultados, y canonical cuando ambas versiones deben seguir vivas y rastreables.",
        },
      ],
      deepDive: [
        {
          heading: "De dónde salen las URLs duplicadas y qué consolida la canonical",
          paragraphs: [
            "Las URLs duplicadas no son un error: son un producto natural de cómo funcionan los sitios. La misma página se alcanza con barra final y sin ella, por http y https, con y sin www, con los parámetros UTM que añade cada enlace de campaña, con los parámetros de orden y filtro de los listados, y por vistas de impresión o AMP. El servidor responde a todas con el mismo contenido; los buscadores, sin otra instrucción, las indexan como documentos separados.",
            "rel=canonical es esa instrucción: dice «estas direcciones son copias; fusiona sus señales en esta». Consolidar importa porque las señales de ranking — enlaces, clics, estimaciones de calidad — se registran en la URL que las ganó. Repartidas entre cinco duplicados, la página compite contra sí misma; consolidadas, compite con la página que de verdad querías superar.",
            "La etiqueta es una pista fuerte, no una orden. El buscador la pondera con los patrones de enlaces internos, el sitemap y el comportamiento de las redirecciones, y pasa por alto una canonical que discrepa de todo lo demás del sitio. Por eso una canonical que se pelea con tu propio sitemap o navegación suele perder: el acuerdo entre señales gana a la corrección de una sola.",
          ],
        },
        {
          heading: "Los usos indebidos de siempre, y la autorreferencia por defecto",
          paragraphs: [
            "Los clásicos de las auditorías: una URL relativa en vez de absoluta, un #fragmento que ningún servidor ve, una canonical que apunta a un redirect 301 (el buscador debe resolver la cadena y algunos no lo harán), una canonical hacia una página noindex (instrucciones contradictorias — elige una), y canónicas a la portada en cada página de paginación, lo que equivale a pedir que las páginas 2+ salgan del índice.",
            "El hábito más eficaz es autorreferenciar por defecto: cada página se declara canonical a sí misma, también las únicas. No cuesta nada y te inmuniza contra variantes que nadie ha notado todavía — un parámetro que añadirá un plugin el mes que viene, una inconsistencia de barra final que traerá una actualización del framework. Con la autorreferencia, la primera variante nace inofensiva en vez de esperando ser descubierta.",
            "Elegir entre las herramientas es una decisión cada vez: redirect 301 cuando el duplicado debe llevar físicamente al usuario a otro sitio, noindex cuando debe seguir accesible pero fuera de resultados (navegación por facetas, búsqueda interna), canonical cuando ambas versiones deben permanecer vivas y rastreables. Mezclarlas — una página noindex cuya canonical apunta a otra URL — manda señales contradictorias y lo retrasa todo.",
          ],
        },
        {
          heading: "Los detalles de normalización que este generador resuelve",
          paragraphs: [
            "Una canonical debe ser absoluta — con esquema y host — y cada página lleva exactamente una. El generador pasa esquema y host a minúsculas (en la red el host no distingue mayúsculas, pero una canonical con mayúsculas mezcladas es otra casi-duplicada para el buscador), fija una sola decisión de barra final para todo el sitio, conserva parámetros solo cuando es deliberado y elimina fragmentos, que son exclusivamente de cliente.",
            "El orden de los parámetros es lo sutil: ?b=1&a=2 y ?a=2&b=1 son el mismo recurso con cadenas distintas, y algunos rastreadores las tratan como páginas separadas. La canonical lo arregla a posteriori; la solución más limpia es ordenar y recortar parámetros en el servidor. Si el canonical debe llevar parámetros, lleva también la forma canónica de esa cadena de parámetros.",
            "La verificación pertenece a la Inspección de URLs de Search Console, que informa qué URL eligió realmente Google para la página — la etiqueta, el sitemap y los enlaces internos pueden estar bien por separado y aun así perder contra una cadena de redirecciones. Todo aquí se procesa en tu navegador: ninguna URL que escribas se sube a ningún sitio.",
          ],
        },
      ],
    },
    pt: {
      name: "Gerador de tag canonical",
      tagline:
        "Gere uma tag rel=canonical correta e aprenda a normalizar URLs para que os buscadores indexem a versão que você quer.",
      intro: [
        "A tag canonical diz aos buscadores qual URL indexar quando o mesmo conteúdo é acessível por vários endereços — com ou sem barra final, com strings de consulta, parâmetros UTM, variantes http/https ou www. Bem usada, ela consolida URLs duplicadas em um único sinal de ranqueamento.",
        "Informe a URL absoluta da versão preferida e copie a tag para o <head> dessa página. O checklist cobre os detalhes de normalização que a maioria implementa errado.",
      ],
      steps: [
        "Escolha um único formato canonical para todo o site: https, domínio com ou sem www, barra final ou não.",
        "Cole a URL absoluta da versão preferida da página.",
        "Copie a tag para o <head> e verifique com a ferramenta de Inspeção de URL.",
      ],
      faqs: [
        {
          q: "O que uma tag canonical realmente faz?",
          a: "Consolida duplicatas: os sinais das URLs alternativas — cópias com UTM, ordenações parametrizadas, versões de impressão — são fundidos na URL canonical, que ranqueia em vez de dividir autoridade entre duplicatas.",
        },
        {
          q: "Toda página precisa de canonical autorreferente?",
          a: "Sim, é o padrão recomendado. Mesmo páginas únicas devem declarar a própria URL como canonical, para se proteger de variantes de parâmetro, barra final e maiúsculas que você ainda não notou.",
        },
        {
          q: "Canonical, noindex ou redirect?",
          a: "Use um redirect 301 quando a duplicata deve levar o usuário para outro lugar, noindex quando deve continuar acessível mas fora dos resultados, e canonical quando as duas versões devem permanecer ativas e rastreáveis.",
        },
      ],
      deepDive: [
        {
          heading: "De onde vêm as URLs duplicadas e o que a canonical consolida",
          paragraphs: [
            "URLs duplicadas não são um erro: são um produto natural de como os sites funcionam. A mesma página é alcançável com barra final e sem, por http e https, com e sem www, com os parâmetros UTM que todo link de campanha acrescenta, com os parâmetros de ordenação e filtro dos listados, e por versões de impressão ou AMP. O servidor responde a todas com o mesmo conteúdo; os buscadores, sem outra instrução, indexam como documentos separados.",
            "rel=canonical é essa instrução: diz “estes endereços são cópias; fundam seus sinais neste”. Consolidar importa porque os sinais de ranqueamento — links, cliques, estimativas de qualidade — ficam registrados na URL que os conquistou. Divididos entre cinco duplicatas, a página compete contra si mesma; consolidados, ela compete com a página que você realmente queria superar.",
            "A tag é uma pista forte, não uma ordem. O buscador pondera junto com os padrões de links internos, o sitemap e o comportamento dos redirects, e ignora discretamente uma canonical que discorda de todo o resto do site. Por isso uma canonical que briga com o seu próprio sitemap ou navegação costuma perder: o acordo entre sinais vence a correção de um sinal só.",
          ],
        },
        {
          heading: "Os usos errados clássicos, e a autorreferência por padrão",
          paragraphs: [
            "Os clássicos das auditorias: uma URL relativa em vez de absoluta, um #fragmento que nenhum servidor recebe, uma canonical apontando para um redirect 301 (o buscador teria de resolver a cadeia, e alguns não resolvem), uma canonical para uma página noindex (instruções contraditórias — escolha uma), e canônicas para a home em toda página de paginação, o que equivale a pedir que as páginas 2+ saiam do índice.",
            "O hábito mais eficaz é autorreferenciar por padrão: cada página se declara canonical de si mesma, inclusive as únicas. Não custa nada e imuniza contra variantes que ninguém notou ainda — um parâmetro que um plugin acrescentará no mês que vem, uma inconsistência de barra final que uma atualização de framework trará. Com a autorreferência, a primeira variante nasce inofensiva em vez de esperar ser descoberta.",
            "Escolher entre as ferramentas é uma decisão de cada vez: redirect 301 quando a duplicata deve levar fisicamente o usuário para outro lugar, noindex quando deve continuar acessível mas fora dos resultados (navegação facetada, busca interna), canonical quando as duas versões devem permanecer vivas e rastreáveis. Misturar — uma página noindex cuja canonical aponta para outra URL — manda sinais contraditórios e atrasa tudo.",
          ],
        },
        {
          heading: "Os detalhes de normalização que este gerador resolve",
          paragraphs: [
            "Uma canonical deve ser absoluta — com scheme e host — e cada página carrega exatamente uma. O gerador converte scheme e host para minúsculas (na rede o host não diferencia maiúsculas, mas uma canonical com maiúsculas misturadas é outra quase-duplicada para o buscador), fixa uma única decisão de barra final para o site todo, mantém parâmetros só quando é deliberado e remove fragmentos, que vivem apenas no cliente.",
            "A ordem dos parâmetros é a parte sutil: ?b=1&a=2 e ?a=2&b=1 são o mesmo recurso com strings diferentes, e alguns rastreadores as tratam como páginas separadas. A canonical resolve a posteriori; a correção mais limpa é ordenar e aparar parâmetros no servidor. Se a canonical precisa levar parâmetros, que leve também a forma canônica dessa string de parâmetros.",
            "A verificação fica na Inspección de URLs do Search Console, que informa qual URL o Google realmente escolheu para a página — a tag, o sitemap e os links internos podem estar certos individualmente e ainda perder para uma cadeia de redirects. Tudo aqui é processado no seu navegador: nenhuma URL digitada é enviada a lugar algum.",
          ],
        },
      ],
    },
  },
});
