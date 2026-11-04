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
        "The generator groups user-agents that share a rule, adds crawl-delay where it is honored, and appends your sitemap directive. Copy the file to your domain root at /robots.txt and verify it in Search Console's robots report.",
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
    },
  },
});
