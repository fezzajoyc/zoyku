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
    },
  },
});
