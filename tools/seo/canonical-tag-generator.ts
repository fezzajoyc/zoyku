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
        "Enter the absolute URL of the preferred version and copy the tag into that page's <head>. The checklist covers the normalization details most implementations get wrong.",
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
    },
  },
});
