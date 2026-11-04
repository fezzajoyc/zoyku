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
        "Every attribute value is HTML-escaped, so quotes and ampersands can't break your markup. Copy the block into your template or CMS head section and adjust it per page.",
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
    },
  },
});
