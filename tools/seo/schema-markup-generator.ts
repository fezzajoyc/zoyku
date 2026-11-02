import { SeoSchemaEngine } from "../_engines/seo-engine-schema";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "schema-markup-generator",
  category: "seo",
  icon: "layers",
  engine: { component: SeoSchemaEngine },
  related: ["meta-tag-generator", "keyword-density-checker", "serp-preview", "open-graph-generator"],
  copy: {
    en: {
      name: "Schema Markup Generator",
      tagline:
        "Generate valid JSON-LD structured data for Organization, LocalBusiness, Product, Article, FAQPage and HowTo — escaped and ready to paste.",
      intro: [
        "Structured data helps search engines understand the entities on a page: who publishes it, what the product costs, which questions it answers. This generator builds JSON-LD for six of the most used schema.org types, leaves out empty fields, and escapes the output so it is safe inside a <script> tag.",
        "Pick the type that matches the page, fill in the fields, and paste the block into the head or body. Always run it through a rich results validator before deploying — markup that parses but violates guidelines can earn a manual action.",
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
    },
  },
});
