import { SeoTagsEngine, type TagEngineProps } from "../_engines/seo-engine-tags";
import { loc } from "../_engines/seo-locale";
import { defineTool } from "../_lib/types";

const urlField = (
  key: string,
  label: Parameters<typeof loc>[0],
  zh: string,
  ja: string,
  es: string,
  pt: string,
  ph: string,
) => ({
  key,
  label: loc(label, zh, ja, es, pt),
  placeholder: ph,
  hint: loc("Absolute URL, including https://", "绝对 URL,带 https://", "絶対 URL(https:// を含む)", "URL absoluta, con https://", "URL absoluta, com https://"),
});

const props: TagEngineProps = {
  fields: [
    urlField("urlEn", "English URL (en)", "英语页面 URL(en)", "英語ページの URL(en)", "URL en inglés (en)", "URL em inglês (en)", "https://example.com/en/page"),
    urlField("urlZh", "Simplified Chinese URL (zh-Hans)", "简体中文页面 URL(zh-Hans)", "簡体字中国語ページの URL(zh-Hans)", "URL en chino simplificado (zh-Hans)", "URL em chinês simplificado (zh-Hans)", "https://example.com/zh/page"),
    urlField("urlJa", "Japanese URL (ja)", "日语页面 URL(ja)", "日本語ページの URL(ja)", "URL en japonés (ja)", "URL em japonês (ja)", "https://example.com/ja/page"),
    urlField("urlEs", "Spanish URL (es)", "西班牙语页面 URL(es)", "スペイン語ページの URL(es)", "URL en español (es)", "URL em espanhol (es)", "https://example.com/es/page"),
    urlField("urlPt", "Portuguese URL (pt)", "葡萄牙语页面 URL(pt)", "ポルトガル語ページの URL(pt)", "URL en portugués (pt)", "URL em português (pt)", "https://example.com/pt/page"),
    urlField("urlDefault", "x-default URL", "x-default URL", "x-default URL", "URL x-default", "URL x-default", "https://example.com/page"),
  ],
  lines: [
    { template: '<link rel="alternate" hreflang="en" href="{{urlEn}}">', when: "urlEn" },
    { template: '<link rel="alternate" hreflang="zh-Hans" href="{{urlZh}}">', when: "urlZh" },
    { template: '<link rel="alternate" hreflang="ja" href="{{urlJa}}">', when: "urlJa" },
    { template: '<link rel="alternate" hreflang="es" href="{{urlEs}}">', when: "urlEs" },
    { template: '<link rel="alternate" hreflang="pt" href="{{urlPt}}">', when: "urlPt" },
    { template: '<link rel="alternate" hreflang="x-default" href="{{urlDefault}}">', when: "urlDefault" },
  ],
  tips: {
    en: [
      "Return the complete cluster on every page in the set — hreflang is bidirectional and must include a self-reference.",
      "All URLs must be absolute and fully qualified.",
      "x-default is for users whose language matches none of the versions: a language selector or the default-language homepage.",
      "Prefer zh-Hans / zh-Hant over bare zh; add a region subtag like pt-BR only when the content truly differs by region.",
      "Pair each hreflang page with its own self-referencing canonical — hreflang does not replace canonical.",
    ],
    zh: [
      "每个页面都要返回完整的链接簇——hreflang 是双向的,必须包含自引用。",
      "所有 URL 必须是完整绝对地址。",
      "x-default 面向语言都不匹配的用户:指向语言选择页或默认语言首页。",
      "优先用 zh-Hans / zh-Hant 而不是裸 zh;只有内容确实因地区不同时才加 pt-BR 这类地区子标签。",
      "每个 hreflang 页面都要配自引用 canonical——hreflang 不能替代 canonical。",
    ],
    ja: [
      "クラスタ内の全ページで完全なセットを返します。hreflang は双方向で、自己参照を含める必要があります。",
      "URL はすべて完全な絶対 URL にします。",
      "x-default は、どの言語にも該当しないユーザー向けの言語選択ページまたはデフォルト言語のトップページです。",
      "裸の zh より zh-Hans / zh-Hant を推奨。pt-BR のような地域サブタグは、内容が地域によって本当に異なる場合だけ付けます。",
      "各 hreflang ページには自己参照 canonical を併設します。hreflang は canonical の代わりになりません。",
    ],
    es: [
      "Devuelve el clúster completo en cada página del conjunto: hreflang es bidireccional y debe incluir la autorreferencia.",
      "Todas las URLs deben ser absolutas y completas.",
      "x-default es para usuarios cuyo idioma no coincide con ninguna versión: un selector de idioma o la portada en el idioma por defecto.",
      "Prefiere zh-Hans / zh-Hant antes que zh a secas; añade un subtag de región como pt-BR solo si el contenido difiere de verdad por región.",
      "Combina cada página hreflang con su canonical autorreferenciado: hreflang no sustituye al canonical.",
    ],
    pt: [
      "Retorne o conjunto completo em cada página do grupo — hreflang é bidirecional e deve incluir a autorreferência.",
      "Todas as URLs devem ser absolutas e completas.",
      "x-default é para usuários cujo idioma não corresponde a nenhuma versão: um seletor de idioma ou a homepage no idioma padrão.",
      "Prefira zh-Hans / zh-Hant em vez de zh puro; adicione um subtag de região como pt-BR só quando o conteúdo realmente variar por região.",
      "Combine cada página hreflang com seu canonical autorreferente — hreflang não substitui o canonical.",
    ],
  },
  outputLabel: loc("hreflang cluster", "hreflang 链接簇", "hreflang クラスタ", "Clúster hreflang", "Conjunto hreflang"),
};

export default defineTool({
  slug: "hreflang-generator",
  category: "seo",
  icon: "globe",
  engine: { component: SeoTagsEngine, props },
  related: ["canonical-tag-generator", "sitemap-generator", "meta-tag-generator", "utm-builder", "open-graph-generator", "keyword-density-checker", "serp-preview", "robots-txt-generator", "schema-markup-generator"],
  copy: {
    en: {
      name: "hreflang Generator",
      tagline:
        "Build a complete hreflang link cluster — one link per language plus x-default — from your translated URLs, consistent and bidirectional.",
      intro: [
        "hreflang tells search engines which URL to serve to speakers of each language, which prevents near-duplicate translations from competing with each other. The clusters are bidirectional: every localized page must return the complete set, including a reference back to itself.",
        "Values follow BCP 47: en-GB targets British English, pt-BR Brazilian Portuguese, and a bare en matches every other English variant. Google validates each tag strictly — one malformed member can invalidate the whole cluster — so the generator emits the exact format rather than free text.",
        "Enter the URL of each language version and the generator emits the full <link rel=\"alternate\"> cluster plus x-default, which should point at your language selector or default-language homepage. Paste the block into the <head> of every page in the set.",
        "HTTP headers and XML sitemaps can carry the same annotations — headers suit PDFs, sitemaps scale to thousands of URLs — but head links are the easiest to audit page by page. Note that hreflang only routes audiences; it does not consolidate ranking signals the way a canonical tag does.",
      ],
      steps: [
        "Paste the absolute URL of each translated version; leave blank the languages you do not have.",
        "Set the x-default URL — your language selector or default homepage.",
        "Copy the cluster into the <head> of every page in the set.",
      ],
      faqs: [
        {
          q: "Does every page need the full hreflang set?",
          a: "Yes. Clusters must be reciprocal: page A lists page B and itself, and B lists A and itself. A cluster with missing members gets partially ignored, and the effort is wasted.",
        },
        {
          q: "Should I use zh or zh-Hans?",
          a: "Prefer zh-Hans for Simplified and zh-Hant for Traditional; a bare zh leaves the script undefined. Region subtags like pt-BR are optional — target the language first and add a region only when content truly differs, as with pt-BR vs pt-PT.",
        },
        {
          q: "Does hreflang replace a canonical tag?",
          a: "No. Each language version still needs its own self-referencing canonical. hreflang selects among equivalent translated pages; canonical resolves duplicates within one language.",
        },
      ],
      deepDive: [
        {
          heading: "Reciprocity and x-default: the two rules that decide everything",
          paragraphs: [
            "hreflang clusters are validated as a graph, not as individual tags. Search engines collect every rel=alternate hreflang link from every page, and a cluster only works if it is closed: page A lists B and itself, B lists A and itself, and so on for every member. One missing return-link — usually a page whose <head> was never updated — and the engines treat the cluster as incomplete, discounting exactly the pages you were trying to route.",
            "This is why the failure is silent in a nasty way: nothing errors, the pages simply do not swap in results the way they should. Auditing means crawling all members and diffing their clusters — tedious, which is why generating the whole block from one input and pasting the identical set everywhere is the reliable workflow.",
            "x-default is the cluster's answer to “none of the above”: the user whose language and region match no declared version gets this URL. Point it at a language selector or the default-language homepage. It is optional, but without it, unmatched visitors get an arbitrary choice — often the English version, whether or not that suits your audience.",
          ],
        },
        {
          heading: "Reading BCP 47 properly: language first, region only when it matters",
          paragraphs: [
            "The values are BCP 47 language tags, and the subtags carry different meanings. The primary subtag is the language (en, pt, zh); the region subtag (GB, BR, CN) selects an audience by geography; the script subtag (Hans, Hant) selects a writing system. A bare en matches every English speaker everywhere; en-GB targets British users specifically.",
            "The common mistake is over-segmenting with regions: en-US, en-GB, en-AU, en-CA tags that all point at the same content. If the content is identical, declare one en and let it match everyone — region tags are for content that genuinely differs, like pt-BR versus pt-PT spelling and currency, or fr-CA versus fr-FR. Extra region variants with identical content create the near-duplicates hreflang was meant to solve.",
            "Chinese is the classic script case: zh alone is underspecified, zh-Hans and zh-Hant pick simplified and traditional. And note what hreflang is not: it routes audiences between equivalent pages, but it does not consolidate ranking signals — each language version still needs its own self-referencing canonical and its own earned links.",
          ],
        },
        {
          heading: "Where the annotations live, and what hreflang does not do",
          paragraphs: [
            "Three placements carry the same annotation: <link> elements in the head (easiest to audit page by page, what this generator emits), HTTP Link headers (right for non-HTML files like PDFs), and an XML sitemap column (the only practical route at thousands of URLs, where head links become unmaintainable). Pick one channel per page — duplicating across channels invites inconsistencies.",
            "Also honest about scope: hreflang affects which version is served to which audience; it is not a ranking boost, not an instruction to translate anything, and not a substitute for hreflang-invisible basics — correct return links, crawlable URLs, and per-version canonicals. Google validates each tag strictly: one malformed value (a missing hyphen, a typo'd country code) can taint the cluster it belongs to, which is why emitting the exact format from a generator beats hand-typing it.",
          ],
        },
      ],
    },
    zh: {
      name: "hreflang 生成器",
      tagline: "根据各语言版本 URL 生成完整的 hreflang 链接簇——每种语言一条链接外加 x-default,双向一致不缺项。",
      intro: [
        "hreflang 告诉搜索引擎应该把哪个 URL 呈给哪种语言的用户,避免各语言近似重复的译文互相竞争。链接簇是双向的:每个本地化页面都必须返回完整集合,包括指向自己的那条。",
        "填入每个语言版本的 URL,生成器会输出完整的 <link rel=\"alternate\"> 链接簇外加 x-default——后者应指向语言选择页或默认语言首页。",
      ],
      steps: [
        "粘贴每个语言版本的绝对 URL,没有的语言留空。",
        "设置 x-default URL——语言选择页或默认语言首页。",
        "把链接簇复制到集合内每个页面的 <head>。",
      ],
      faqs: [
        {
          q: "每个页面都需要完整的 hreflang 集合吗?",
          a: "需要。链接簇必须相互回指:页面 A 列出页面 B 和自己,B 也列出 A 和自己。缺了成员的链接簇会被部分忽略,功夫就白费了。",
        },
        {
          q: "该用 zh 还是 zh-Hans?",
          a: "简体用 zh-Hans,繁体用 zh-Hant;裸 zh 未定义文字体系。pt-BR 这类地区子标签是可选的——先按语言定位,只有内容确实因地区而异时再加地区,例如 pt-BR 与 pt-PT。",
        },
        {
          q: "hreflang 能替代 canonical 吗?",
          a: "不能。每个语言版本仍需自己的自引用 canonical。hreflang 在等效的翻译页面之间做选择;canonical 解决的是同一语言内的重复。",
        },
      ],
      deepDive: [
        {
          heading: "双向互指与 x-default:决定成败的两条规则",
          paragraphs: [
            "hreflang 链接簇是按“图”校验的,不是按单条标签。搜索引擎会从每个页面收集所有 rel=alternate hreflang 链接,簇必须闭合才生效:A 列出 B 和自己,B 列出 A 和自己,依此类推。只要有一个回指缺失——最常见的是某页 <head> 忘了更新——整簇就被视为不完整,恰恰是你在努力做路由的那些页面被打了折扣。",
            "这也让失败方式很隐蔽:没有任何报错,只是这些页面在结果里的表现不符合预期。审计意味着爬取所有成员页并比对各自的链接簇——非常枯燥,所以“从一份输入生成整块代码、每个页面贴同一份”才是可靠的工作流。",
            "x-default 是链接簇对“以上都不是”的回答:语言和地区都不匹配任何已声明版本的用户,将被送到这里。把它指向语言选择页或默认语言首页。这一条是可选的,但没有它,未命中的访客会被随意分派——往往是英文版,不管这适不适合你的受众。",
          ],
        },
        {
          heading: "正确理解 BCP 47:先按语言,地区只在真的有区别时加",
          paragraphs: [
            "取值是 BCP 47 语言标签,各子标签含义不同:主子标签是语言(en、pt、zh),地区子标签(GB、BR、CN)按地理圈定受众,文字体系子标签(Hans、Hant)选定书写系统。裸 en 匹配所有英语使用者;en-GB 专门面向英国用户。",
            "常见错误是用地区过度切分:en-US、en-GB、en-AU、en-CA 四条标签指向同一份内容。内容完全相同时,声明一个 en 让它匹配所有人即可——地区标签留给内容确实不同的场景,比如 pt-BR 与 pt-PT 的拼写和货币差异、fr-CA 与 fr-FR。内容一致却多挂地区变体,恰恰制造出 hreflang 本来要解决的近似重复。",
            "中文是文字体系子标签的经典案例:裸 zh 定义不足,zh-Hans 和 zh-Hant 分别选定简体和繁体。还要清楚 hreflang 不是什么:它在等效页面之间路由受众,不合并排名信号——每个语言版本仍然需要自己的自引用 canonical 和自己挣来的外链。",
          ],
        },
        {
          heading: "标注放在哪里,以及 hreflang 做不到的事",
          paragraphs: [
            "同一条标注有三种安放方式:<head> 里的 <link> 元素(最容易逐页审计,本生成器输出的就是它)、HTTP Link 头(适合 PDF 这类非 HTML 文件)、XML 站点地图的专列(URL 上千条时唯一现实的路径,头内链接会变得没法维护)。每个页面选一种通道——跨通道重复标注只会招来不一致。",
            "对作用范围也要诚实:hreflang 决定哪类受众拿到哪个版本,它不是排名加成,不是翻译指令,更不能替代那些 hreflang 看不见的基本功——正确的回指、可抓取的 URL、每个版本独立的 canonical。Google 对每条标签的校验都很严格:一个格式错误(少个连字符、国家码打错)就可能污染它所在的整个簇,所以从生成器输出精确格式,胜过手工敲打。",
          ],
        },
      ],
    },
    ja: {
      name: "hreflang 生成",
      tagline: "各言語版の URL から完全な hreflang リンククラスタを生成。言語ごとの link に x-default を加え、双方向で欠れのないセットを作ります。",
      intro: [
        "hreflang は、どの言語のユーザーにどの URL を提供するかを検索エンジンに伝え、翻訳ページ同士の近重複競合を防ぎます。クラスタは双方向です。ローカライズされた各ページは、自分自身への参照を含む完全なセットを返す必要があります。",
        "各言語版の URL を入力すると、完全な <link rel=\"alternate\"> クラスタに x-default を加えて出力します。x-default には言語選択ページまたはデフォルト言語のトップページを指定します。",
      ],
      steps: [
        "各翻訳版の絶対 URL を貼り付けます。用意していない言語は空欄のままにします。",
        "x-default の URL(言語選択ページまたはデフォルトのトップページ)を設定します。",
        "クラスタをセット内の全ページの <head> にコピーします。",
      ],
      faqs: [
        {
          q: "すべてのページに完全な hreflang セットが必要?",
          a: "はい。クラスタは相互である必要があります。ページ A はページ B と自分自身を列挙し、B も A と自分自身を列挙します。メンバーが欠けたクラスタは部分的に無視され、手間が無駄になります。",
        },
        {
          q: "zh と zh-Hans、どちらを使う?",
          a: "簡体字は zh-Hans、繁体字は zh-Hant を推奨します。裸の zh は文字体系が未定義になります。pt-BR のような地域サブタグは任意で、pt-BR と pt-PT のように内容が地域で本当に異なる場合だけ追加します。",
        },
        {
          q: "hreflang は canonical の代わりになる?",
          a: "なりません。各言語版にはそれぞれ自己参照 canonical が必要です。hreflang は同等の翻訳ページの中から選択する仕組みで、canonical は同一言語内の重複を解決する仕組みです。",
        },
      ],
      deepDive: [
        {
          heading: "相互参照と x-default:成否を分ける二つの規則",
          paragraphs: [
            "hreflang のクラスタは個々のタグではなく「グラフ」として検証されます。検索エンジンは全ページから rel=alternate hreflang リンクを収集し、クラスタが閉じていて初めて機能します。ページ A は B と自分自身を列挙し、B も A と自分自身を列挙する、という具合に全メンバーへ。一つでも返しのリンクが欠ければ——大抵は <head> の更新漏れのページ——クラスタは不完全とみなされ、まさにルーティングしようとしていたページが割り引かれます。",
            "だから失敗は不気味なほど静かです。エラーは何も出ず、ページがただ想定どおりに結果で入れ替わらないだけ。監査は全メンバーをクロールしてクラスタを突き合わせることになり、非常に骨が折れます。だからこそ「1 つの入力からブロック全体を生成し、全ページに同一のセットを貼る」のが信頼できるワークフローです。",
            "x-default はクラスタの「どれにも該当しない」への答えです。言語・地域のどの宣言版にも一致しないユーザーがここへ送られます。言語選択ページかデフォルト言語のトップページを指定します。省略は可能ですが、ない場合、不一致の訪問者は恣意的に振り分けられ——多くの場合、受け手に合うかどうかに関係なく英語版へです。",
          ],
        },
        {
          heading: "BCP 47 を正しく読む:まず言語、地域は本当に違うときだけ",
          paragraphs: [
            "値は BCP 47 の言語タグで、サブタグごとに意味が違います。主サブタグが言語(en、pt、zh)、地域サブタグ(GB、BR、CN)は地理で受衆を選び、文字体系サブタグ(Hans、Hant)は書記系を選びます。裸の en は世界中の英語話者すべてに一致し、en-GB はイギリスのユーザーを specifically 対象とします。",
            "よくある間違いは地域での過剰分割です。en-US、en-GB、en-AU、en-CA がすべて同じ内容を指すタグ。内容が同一なら en を一つ宣言して全員に一致させるべきで、地域タグは内容が実際に異なる場合——pt-BR と pt-PT の綴りや通貨、fr-CA と fr-FR——のためのものです。同一内容に地域バリアントを増やすことは、hreflang が解決するはずだった近重複を自分で作る行為です。",
            "中国語は文字体系の古典例です。裸の zh は不十分で、zh-Hans と zh-Hant が簡体字・繁体字を選びます。さらに hreflang が何でないかも押さえてください。同等ページ間で受衆を振り分ける仕組みであって、ランキングシグナルを統合しません。各言語版には依然として自己参照 canonical と、自前で獲得したリンクが必要です。",
          ],
        },
        {
          heading: "アノテーションを置く場所と、hreflang にできないこと",
          paragraphs: [
            "同じアノテーションを運ぶ経路は三つあります。<head> 内の <link> 要素(ページごとの監査が最も容易で、このジェネレーターが出力する形式)、HTTP Link ヘッダー(PDF などの非 HTML ファイル向け)、XML サイトマップの専用列(URL が数千件に達すると head リンクは維持できず、これが唯一の実務解)です。ページごとに一つの経路を選び、経路をまたぐ重複は不整合を招くので避けます。",
            "効能の範囲にも正直でありましょう。hreflang はどの受衆にどの版を出すかを決めるだけで、ランキングの押し上げではなく、翻訳の指示でもなく、hreflang の見えない基礎——正しい返しのリンク、クロール可能な URL、版ごとの canonical——の代わりにもなりません。Google は各タグを厳格に検証し、一つの形式ミス(ハイフン落ち、国コードの打ち間違い)がそのクラスタ全体を汚染しうるため、ジェネレーターから正確な形式を出力するほうが手打ちより確実です。",
          ],
        },
      ],
    },
    es: {
      name: "Generador de hreflang",
      tagline:
        "Crea un clúster hreflang completo —un enlace por idioma más x-default— a partir de tus URLs traducidas, consistente y bidireccional.",
      intro: [
        "hreflang indica a los buscadores qué URL servir a los hablantes de cada idioma, evitando que traducciones casi duplicadas compitan entre sí. Los clústeres son bidireccionales: cada página localizada debe devolver el conjunto completo, incluida la referencia a sí misma.",
        "Introduce la URL de cada versión de idioma y el generador emite el clúster completo de <link rel=\"alternate\"> más x-default, que debe apuntar a tu selector de idioma o a la portada en el idioma por defecto.",
      ],
      steps: [
        "Pega la URL absoluta de cada versión traducida; deja en blanco los idiomas que no tengas.",
        "Configura la URL x-default: tu selector de idioma o la portada por defecto.",
        "Copia el clúster al <head> de todas las páginas del conjunto.",
      ],
      faqs: [
        {
          q: "¿Cada página necesita el conjunto hreflang completo?",
          a: "Sí. Los clústeres deben ser recíprocos: la página A enumera a la B y a sí misma, y la B enumera a la A y a sí misma. Un clúster con miembros ausentes se ignora parcialmente y el esfuerzo se pierde.",
        },
        {
          q: "¿Uso zh o zh-Hans?",
          a: "Prefiere zh-Hans para simplificado y zh-Hant para tradicional; un zh a secas deja la escritura sin definir. Los subtags de región como pt-BR son opcionales: apunta primero al idioma y añade región solo si el contenido difiere de verdad, como pt-BR frente a pt-PT.",
        },
        {
          q: "¿hreflang sustituye a la etiqueta canonical?",
          a: "No. Cada versión de idioma sigue necesitando su canonical autorreferenciado. hreflang elige entre páginas traducidas equivalentes; canonical resuelve duplicados dentro de un mismo idioma.",
        },
      ],
      deepDive: [
        {
          heading: "Reciprocidad y x-default: las dos reglas que lo deciden todo",
          paragraphs: [
            "Los clústeres hreflang se validan como un grafo, no como etiquetas sueltas. El buscador recoge todos los enlaces rel=alternate hreflang de todas las páginas, y un clúster solo funciona si está cerrado: la página A enumera a B y a sí misma, la B enumera a A y a sí misma, y así con todos los miembros. Un solo retorno ausente — normalmente una página cuyo <head> nunca se actualizó — y el clúster se considera incompleto, penalizando justo las páginas que querías enrutar.",
            "Por eso el fallo es silencioso de un modo desagradable: nada da error, las páginas simplemente no se intercambian en los resultados como deberían. Auditar implica rastrear todos los miembros y comparar sus clústeres — tedioso, y por eso el flujo fiable es generar el bloque entero desde una sola entrada y pegar el mismo conjunto en todas.",
            "x-default es la respuesta del clúster a “ninguna de las anteriores”: el usuario cuyo idioma y región no coinciden con ninguna versión declarada recibe esa URL. Apúntala a un selector de idioma o a la portada en el idioma por defecto. Es opcional, pero sin ella, los visitantes sin coincidencia reciben una elección arbitraria — a menudo la versión inglesa, le convenga o no a tu audiencia.",
          ],
        },
        {
          heading: "Leer BCP 47 bien: primero el idioma, región solo cuando importa",
          paragraphs: [
            "Los valores son etiquetas de idioma BCP 47 y cada subtag significa algo distinto. La principal es el idioma (en, pt, zh); la de región (GB, BR, CN) selecciona audiencia por geografía; la de escritura (Hans, Hant) selecciona un sistema de escritura. Un en a secas coincide con todo angloparlante en todas partes; en-GB apunta específicamente a usuarios británicos.",
            "El error habitual es sobresegmentar con regiones: etiquetas en-US, en-GB, en-AU, en-CA que apuntan al mismo contenido. Si el contenido es idéntico, declara un solo en y deja que coincida con todos — las etiquetas de región son para contenido que realmente difiere, como pt-BR frente a pt-PT en ortografía y moneda, o fr-CA frente a fr-FR. Añadir variantes de región con contenido idéntico crea justo los casi-duplicados que hreflang debía resolver.",
            "El chino es el caso clásico de escritura: zh a secas queda sin especificar, y zh-Hans y zh-Hant eligen simplificado y tradicional. Y conviene saber lo que hreflang no es: enruta audiencias entre páginas equivalentes, pero no consolida señales de ranking — cada versión de idioma sigue necesitando su canonical autorreferenciado y sus propios enlaces ganados.",
          ],
        },
        {
          heading: "Dónde viven las anotaciones y qué no hace hreflang",
          paragraphs: [
            "Tres ubicaciones portan la misma anotación: elementos <link> en el head (lo más fácil de auditar página a página, lo que emite este generador), cabeceras HTTP Link (adecuadas para no-HTML como PDF) y una columna del sitemap XML (la única vía práctica con miles de URLs, donde los enlaces en el head se vuelven imposibles de mantener). Elige un canal por página — duplicar entre canales invita a las inconsistencias.",
            "Sé honesto también con el alcance: hreflang decide qué versión se sirve a qué audiencia; no es un impulso de ranking, no es una instrucción para traducir nada y no sustituye los fundamentos que no ve — retornos correctos, URLs rastreables y canónicos por versión. Google valida cada etiqueta con rigor: un solo valor mal formado (un guion que falta, un código de país mal tecleado) puede contaminar el clúster al que pertenece, y por eso emitir el formato exacto desde un generador vence a teclearlo a mano.",
          ],
        },
      ],
    },
    pt: {
      name: "Gerador de hreflang",
      tagline:
        "Monte um conjunto hreflang completo —um link por idioma mais x-default— a partir das suas URLs traduzidas, consistente e bidirecional.",
      intro: [
        "O hreflang diz aos buscadores qual URL servir para falantes de cada idioma, evitando que traduções quase duplicadas concorram entre si. Os conjuntos são bidirecionais: cada página localizada deve retornar a lista completa, incluindo a referência a si mesma.",
        "Informe a URL de cada versão de idioma e o gerador emite o conjunto completo de <link rel=\"alternate\"> mais o x-default, que deve apontar para seu seletor de idioma ou homepage no idioma padrão.",
      ],
      steps: [
        "Cole a URL absoluta de cada versão traduzida; deixe em branco os idiomas que não tiver.",
        "Defina a URL x-default — seu seletor de idioma ou a homepage padrão.",
        "Copie o conjunto para o <head> de todas as páginas do grupo.",
      ],
      faqs: [
        {
          q: "Toda página precisa do conjunto hreflang completo?",
          a: "Sim. Os conjuntos devem ser recíprocos: a página A lista a página B e a si mesma, e a B lista a A e a si mesma. Um conjunto com membros faltando é parcialmente ignorado e o esforço se perde.",
        },
        {
          q: "Devo usar zh ou zh-Hans?",
          a: "Prefira zh-Hans para simplificado e zh-Hant para tradicional; um zh puro deixa o sistema de escrita indefinido. Subtags de região como pt-BR são opcionais — aponte primeiro para o idioma e adicione região só quando o conteúdo realmente variar, como pt-BR versus pt-PT.",
        },
        {
          q: "O hreflang substitui a tag canonical?",
          a: "Não. Cada versão de idioma ainda precisa do próprio canonical autorreferente. O hreflang escolhe entre páginas traduzidas equivalentes; o canonical resolve duplicatas dentro de um mesmo idioma.",
        },
      ],
      deepDive: [
        {
          heading: "Reciprocidade e x-default: as duas regras que decidem tudo",
          paragraphs: [
            "Conjuntos hreflang são validados como um grafo, não como tags isoladas. O buscador coleta todos os links rel=alternate hreflang de todas as páginas, e um conjunto só funciona se estiver fechado: a página A lista a B e a si mesma, a B lista a A e a si mesma, e assim por diante. Um único retorno ausente — normalmente uma página cujo <head> nunca foi atualizado — e o conjunto é tratado como incompleto, penalizando exatamente as páginas que você tentava rotear.",
            "Por isso a falha é silenciosa de um jeito desagradável: nada dá erro, as páginas simplesmente não se alternam nos resultados como deveriam. Auditar significa rastrear todos os membros e comparar seus conjuntos — tedioso, e por isso o fluxo confiável é gerar o bloco inteiro a partir de uma entrada só e colar o mesmo conjunto em todas.",
            "x-default é a resposta do conjunto ao “nenhuma das anteriores”: o usuário cujo idioma e região não coincidem com nenhuma versão declarada recebe essa URL. Aponte-a para um seletor de idioma ou para a homepage no idioma padrão. É opcional, mas sem ele, visitantes sem correspondência recebem uma escolha arbitrária — muitas vezes a versão inglesa, convenha ou não à sua audiência.",
          ],
        },
        {
          heading: "Ler BCP 47 direito: primeiro o idioma, região só quando importa",
          paragraphs: [
            "Os valores são tags de idioma BCP 47 e cada subtag significa algo diferente. A principal é o idioma (en, pt, zh); a de região (GB, BR, CN) seleciona audiência por geografia; a de escrita (Hans, Hant) seleciona um sistema de escrita. Um en puro corresponde a todo falante de inglês em todo lugar; en-GB mira especificamente usuários britânicos.",
            "O erro comum é supersegmentar com regiões: tags en-US, en-GB, en-AU, en-CA apontando para o mesmo conteúdo. Se o conteúdo é idêntico, declare um único en e deixe corresponder a todos — tags de região são para conteúdo que realmente difere, como pt-BR versus pt-PT em ortografia e moeda, ou fr-CA versus fr-FR. Acrescentar variantes de região com conteúdo idêntico cria justamente as quase-duplicatas que o hreflang deveria resolver.",
            "O chinês é o caso clássico de escrita: zh puro fica subespecificado, e zh-Hans e zh-Hant escolhem simplificado e tradicional. E vale saber o que hreflang não é: roteia audiências entre páginas equivalentes, mas não consolida sinais de ranqueamento — cada versão de idioma ainda precisa do próprio canonical autorreferente e dos próprios links conquistados.",
          ],
        },
        {
          heading: "Onde as anotações vivem e o que hreflang não faz",
          paragraphs: [
            "Três posições carregam a mesma anotação: elementos <link> no head (o mais fácil de auditar página a página, o que este gerador emite), cabeçalhos HTTP Link (adequados para não-HTML como PDF) e uma coluna do sitemap XML (a única rota prática com milhares de URLs, onde links no head se tornam insustentáveis). Escolha um canal por página — duplicar entre canais convida a inconsistências.",
            "Seja honesto também com o escopo: hreflang decide qual versão é servida a qual audiência; não é um impulso de ranqueamento, não é uma instrução para traduzir nada e não substitui os fundamentos que não vê — retornos corretos, URLs rastreáveis e canônicos por versão. O Google valida cada tag com rigor: um único valor malformado (um hífen faltando, um código de país errado) pode contaminar o conjunto a que pertence, e por isso emitir o formato exato de um gerador vence digitar à mão.",
          ],
        },
      ],
    },
  },
});
