import { DevMarkdownEngine } from "../_engines/dev-engine-markdown";
import { defineTool } from "../_lib/types";

const SAMPLE =
  "# Hello Zoyku\n\nSome **bold**, `code` and [a link](https://example.com).\n\n- one\n- two\n- three\n\n> A wise quote.\n\n```js\nconsole.log('hi');\n```";

export default defineTool({
  slug: "markdown-previewer",
  category: "developer",
  icon: "text",
  engine: { component: DevMarkdownEngine, props: { sample: SAMPLE } },
  related: ["html-formatter", "case-converter", "word-counter", "text-diff", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "url-encoder"],
  copy: {
    en: {
      name: "Markdown Previewer",
      tagline:
        "Preview Markdown as clean, sanitized HTML while you type — headings, lists, tables, code and links rendered live. Perfect for READMEs, docs and comments.",
      intro: [
        "Write Markdown on the left and watch the rendered page appear on the right in real time: headings, emphasis, lists, tables, blockquotes, task lists and fenced code blocks, all rendered by the widely used marked engine.",
        "The generated HTML is sanitized with a strict tag and attribute allowlist before display — scripts, event handlers and javascript: URLs are stripped — and you can copy the clean HTML to paste into a blog, CMS or email template.",
      ],
      steps: [
        "Type or paste Markdown into the left pane.",
        "Watch the sanitized preview update on the right as you write.",
        "Copy the generated HTML when it looks right, or clear to start over.",
      ],
      faqs: [
        {
          q: "Is the previewed HTML safe?",
          a: "Yes. Before anything renders, the HTML passes through a whitelist sanitizer that removes script tags, inline event handlers and javascript: links, keeping only standard formatting tags and safe image/link URLs.",
        },
        {
          q: "Which Markdown features are supported?",
          a: "Everything marked handles by default: GitHub-flavored tables, strikethrough, task lists, autolinks, fenced code with syntax labels, and nested lists.",
        },
        {
          q: "Where is my text processed?",
          a: "Entirely in your browser — the Markdown never leaves your device, even when you copy the generated HTML.",
        },
      ],
      deepDive: [
        {
          heading: "GFM versus CommonMark: why your tables render",
          paragraphs: [
            "Markdown is not one language. CommonMark is the rigorously specified core — headings, lists, emphasis, links — that exists because the original 2004 Perl implementation was so ambiguous that no two renderers agreed. GitHub Flavored Markdown (GFM) is CommonMark plus extensions: tables, strikethrough ~~like this~~, task lists, autolinks and fenced code blocks with a language tag.",
            "The preview renders the GFM flavor because that is what people actually write: READMEs on GitHub, issues, pull request descriptions and most documentation sites all expect tables and task lists to work. If you port the same document to a strict CommonMark renderer, tables will come out as raw text — a porting surprise worth anticipating, not a bug.",
            "The remaining differences between flavors are subtler: line-break rules inside paragraphs, how loose vs. tight lists nest, and edge cases around emphasis across words. When a snippet renders differently on this page than on another site, the cause is almost always flavor, not an error in your Markdown — check which extensions the other renderer enables.",
          ],
        },
        {
          heading: "The sanitizer is the security story",
          paragraphs: [
            "A Markdown previewer executes whatever the Markdown expands into, and raw HTML in Markdown is legal — which means a pasted document can carry <script>, onclick attributes or javascript: links. Rendering that unsanitized is exactly how XSS happens in comment systems, wiki pages and CMS fields that accept Markdown from users.",
            "This preview applies a whitelist before anything reaches the page: only standard formatting tags and safe attribute values survive. Script tags, inline event handlers and javascript: URLs are stripped. The practical consequence is that you can paste untrusted content — a document from a stranger, a scraped comment thread — and the preview will not execute anything hostile.",
            "The same sanitizer protects the copy-out path. The HTML you copy is already clean, so pasting it into a CMS or blog editor does not smuggle scripts along. Note the boundary honestly: sanitization strips active content, it does not audit what the visible text says — a document can be free of scripts and still contain bad advice.",
          ],
        },
        {
          heading: "Where your drafts live",
          paragraphs: [
            "Documentation drafts are work in progress: unreleased changelogs, internal runbooks with infrastructure details, PR descriptions discussing security fixes. A Markdown previewer that uploads drafts to a server would put exactly that in transit — so everything here runs locally: the marked engine and the sanitizer both execute in your browser's JavaScript.",
            "Processing being local means no drafts persist anywhere, no network round-trips slow down the live rendering, and the tool works offline. Writing docs on a plane or in an environment with no external network access behaves identically to your desk.",
            "It also sidesteps the usual paste-and-format friction: no editor plugin to install, no build step to run, no file to save first. Paste from Slack, from a code comment, from a ticket — see it rendered in a second, copy clean HTML out if you need it.",
          ],
        },
      ],
    },
    zh: {
      name: "Markdown 预览",
      tagline: "边写边看:Markdown 实时渲染为净化的 HTML——标题、列表、表格、代码、链接即时呈现,README 和文档首选。",
      intro: [
        "左侧写 Markdown,右侧实时看到渲染结果:标题、强调、列表、表格、引用、任务列表和围栏代码块,由广泛使用的 marked 引擎渲染。",
        "生成的 HTML 在显示前经过严格的标签与属性白名单净化——script、事件处理器和 javascript: 链接都会被移除——你可以直接复制干净的 HTML 贴进博客、CMS 或邮件模板。",
      ],
      steps: [
        "在左侧输入或粘贴 Markdown。",
        "右侧的净化预览随输入实时刷新。",
        "满意后复制生成的 HTML,或清空重来。",
      ],
      faqs: [
        {
          q: "预览出的 HTML 安全吗?",
          a: "安全。渲染前 HTML 会经过白名单净化:移除 script 标签、内联事件处理器和 javascript: 链接,只保留标准排版标签和安全的图片/链接地址。",
        },
        {
          q: "支持哪些 Markdown 特性?",
          a: "marked 默认支持的全部:GFM 表格、删除线、任务列表、自动链接、带语言标注的围栏代码块、嵌套列表。",
        },
        {
          q: "我的文本在哪里处理?",
          a: "完全在浏览器中——即使复制生成的 HTML,Markdown 也不会离开你的设备。",
        },
      ],
      deepDive: [
        {
          heading: "GFM 与 CommonMark:为什么你的表格能渲染",
          paragraphs: [
            "Markdown 不是一种语言。CommonMark 是严谨规范化的核心——标题、列表、强调、链接——它的存在恰恰是因为 2004 年最初的 Perl 实现歧义太多,任何两个渲染器都达不成一致。GitHub Flavored Markdown(GFM)是 CommonMark 加扩展:表格、删除线~~这样~~、任务列表、自动链接、带语言标注的围栏代码块。",
            "本预览渲染 GFM 方言,因为大家实际写的就是它:GitHub 上的 README、issue、PR 描述和大多数文档站点都假设表格和任务列表可用。如果同一篇文档拿到严格的 CommonMark 渲染器上,表格会变成原始文本——这是移植时值得预料的差异,不是 bug。",
            "方言之间剩下的差异更细:段落内的换行规则、松散列表和紧凑列表的嵌套方式、跨词强调的边角情况。当同一段文字在本页和其他站点渲染不一致时,原因几乎总是方言不同,而不是你的 Markdown 写错了——先查对方渲染器开了哪些扩展。",
          ],
        },
        {
          heading: "净化器才是安全性的来源",
          paragraphs: [
            "Markdown 预览器会执行 Markdown 展开出的任何东西,而 Markdown 里写原始 HTML 是合法的——也就是说,贴进来的文档可以携带 <script>、onclick 属性或 javascript: 链接。不做净化直接渲染,正是评论区、wiki 页面和接受用户 Markdown 的 CMS 字段发生 XSS 的方式。",
            "本预览在任何内容到达页面之前先过白名单:只有标准排版标签和安全的属性值存活。script 标签、内联事件处理器、javascript: URL 全部剥离。实际效果是:贴进来路不明的文档——陌生人写的、爬来的评论串——预览不会执行任何恶意内容。",
            "同一个净化器也保护复制出口。你复制的 HTML 已经是干净的,贴进 CMS 或博客编辑器不会夹带脚本。边界也要如实说:净化剥离的是活性内容,不审查可见文本的内容——一篇文档可以没有脚本,但照样全是糟糕建议。",
          ],
        },
        {
          heading: "你的草稿待在哪里",
          paragraphs: [
            "文档草稿都是进行中的东西:未发布的更新日志、带基础设施细节的内部运维手册、讨论安全修复的 PR 描述。会把草稿上传到服务器的 Markdown 预览器恰好让这些内容在网络上传输——所以这里的一切都在本地跑:marked 引擎和净化器都在浏览器 JavaScript 里执行。",
            "本地处理意味着草稿不落在任何地方,实时渲染没有网络往返的拖累,工具离线可用。在飞机上、在无外网的环境里写文档,体验和在你工位上完全一致。",
            "也顺便绕开了通常的粘贴排版摩擦:不用装编辑器插件、不用跑构建、不用先存文件。从 Slack、代码注释、工单里粘贴——一秒钟看到渲染结果,需要的话复制干净的 HTML 出去。",
          ],
        },
      ],
    },
    ja: {
      name: "Markdown プレビューアー",
      tagline:
        "Markdown を入力しながらサニタイズ済み HTML でリアルタイムプレビュー — 見出し・リスト・表・コード・リンクを即時描画。README やドキュメントに。",
      intro: [
        "左側で Markdown を書くと、右側にレンダリング結果がリアルタイムに現れます:見出し・強調・リスト・表・引用・タスクリスト・コードブロックを、広く使われている marked エンジンで描画します。",
        "生成された HTML は表示前に厳格なタグ・属性ホワイトリストでサニタイズされます — script・イベントハンドラー・javascript: リンクは除去 — 綺麗な HTML をブログや CMS、メールテンプレートにそのまま貼り付けられます。",
      ],
      steps: [
        "左ペインに Markdown を入力または貼り付けます。",
        "書きながら右側のサニタイズ済みプレビューが更新されます。",
        "良さそうなら生成された HTML をコピー、またはクリアしてやり直します。",
      ],
      faqs: [
        {
          q: "プレビューされる HTML は安全ですか?",
          a: "はい。表示前にホワイトリスト方式のサニタイザーを通し、script タグ・インラインのイベントハンドラー・javascript: リンクを除去し、標準的な整形タグと安全な画像/リンク URL だけを残します。",
        },
        {
          q: "対応している Markdown の機能は?",
          a: "marked のデフォルト対応範囲すべて:GFM 表、打ち消し線、タスクリスト、自動リンク、言語ラベル付きのコードブロック、ネストしたリスト。",
        },
        {
          q: "テキストはどこで処理されますか?",
          a: "完全にブラウザ内です。生成された HTML をコピーするときも、Markdown が端末の外に出ることはありません。",
        },
      ],
      deepDive: [
        {
          heading: "GFM と CommonMark:表が描画される理由",
          paragraphs: [
            "Markdown は一つの言語ではありません。CommonMark は厳密に仕様化されたコア——見出し、リスト、強調、リンク——で、存在する理由は 2004 年の元 Perl 実装の曖昧さです。実装がどれも食い違い、2 つのレンダラーが一致したことがない。GitHub Flavored Markdown(GFM)は CommonMark に拡張を足したものです。表、打ち消し線 ~~こういう~~、タスクリスト、自動リンク、言語ラベル付きのフェンス コードブロック。",
            "このプレビューが GFM を描くのは、人が実際に書いているのが GFM だからです。GitHub の README、issue、PR の説明、大半のドキュメント サイトは、表とタスクリストが動くことを前提にしています。同じ文書を厳密な CommonMark レンダラーに持っていくと、表は生テキストとして出力されます。移植時の驚きとして織り込んでおくべきことで、バグではありません。",
            "方言間の残りの差異はもっと繊細です。段落内の改行規則、緩いリストと緊密なリストのネスト、語をまたぐ強調のエッジケース。このページと別サイトで描画が異なるとき、原因はほぼ常に方言であってあなたの Markdown の誤りではありません。相手のレンダラーがどの拡張を有効にしているか確認してください。",
          ],
        },
        {
          heading: "サニタイザーこそがセキュリティの中身",
          paragraphs: [
            "Markdown プレビューアーは Markdown が展開したものを何でも実行します。そして Markdown に生 HTML を書くのは合法です。つまり貼られた文書は <script>、onclick 属性、javascript: リンクを運べます。それを無防備に描画するのは、まさにコメント システムや wiki、ユーザー Markdown を受ける CMS フィールドで XSS が起きる経路です。",
            "このプレビューは何がページに届く前にホワイトリストを通します。標準の整形タグと安全な属性値だけが生き残り、script タグ、インライン イベントハンドラー、javascript: URL は剥ぎ取られます。実際の帰結として、出所不明の文書——他人の書いたもの、スクレイピングしたコメント欄——を貼っても、プレビューは敵対的なものを何も実行しません。",
            "同じサニタイザーがコピー先も守ります。あなたがコピーする HTML はすでにきれいなので、CMS やブログ エディタに貼ってもスクリプトは密輸されません。境界も正直に言うと、サニタイズは活性コンテンツを剥ぐだけであって、見えているテキストの中身を監査するものではありません。スクリプトがなくても悪いアドバイスだらけの文書は存在します。",
          ],
        },
        {
          heading: "あなたの下書きはどこに住むか",
          paragraphs: [
            "ドキュメントの下書きは進行形です。未公開のチェンジログ、インフラ詳細入りの内部ランブック、セキュリティ修正を議論する PR の説明。下書きをサーバーへアップロードするプレビューアーは、まさにそれを回線に乗せます。だからここではすべてがローカルで動きます。marked エンジンもサニタイザーも、ブラウザの JavaScript で実行されます。",
            "処理がローカルであることは、下書きがどこにも残らないこと、ライブ描画にネットワーク往復の遅れがないこと、オフラインで動くことを意味します。機内でも外部ネットワークのない環境でも、デスクとまったく同じように文書が書けます。",
            "お決まりの貼り付けと整形の摩擦も回避できます。エディタ プラグインの導入も、ビルドの実行も、先にファイル保存することも要りません。Slack から、コード コメントから、チケットから貼る。一秒で描画を確認し、必要ならきれいな HTML を持ち出す。",
          ],
        },
      ],
    },
    es: {
      name: "Vista previa Markdown",
      tagline:
        "Previsualiza Markdown como HTML limpio y saneado mientras escribes: encabezados, listas, tablas, código y enlaces al instante. Ideal para READMEs y docs.",
      intro: [
        "Escribe Markdown a la izquierda y mira la página renderizada a la derecha en tiempo real: encabezados, énfasis, listas, tablas, citas, listas de tareas y bloques de código, todo renderizado por el motor marked, de uso generalizado.",
        "El HTML generado se sanea con una lista blanca estricta de etiquetas y atributos antes de mostrarse — se eliminan scripts, manejadores de eventos y enlaces javascript: — y puedes copiar el HTML limpio para pegarlo en un blog, CMS o plantilla de email.",
      ],
      steps: [
        "Escribe o pega Markdown en el panel izquierdo.",
        "Observa la vista previa saneada actualizarse a la derecha mientras escribes.",
        "Copia el HTML generado cuando te guste el resultado, o borra para empezar de nuevo.",
      ],
      faqs: [
        {
          q: "¿Es seguro el HTML de la vista previa?",
          a: "Sí. Antes de renderizar nada, el HTML pasa por un sanitizador de lista blanca que elimina etiquetas script, manejadores en línea y enlaces javascript:, conservando solo etiquetas de formato estándar y URLs seguras de imágenes y enlaces.",
        },
        {
          q: "¿Qué características de Markdown admite?",
          a: "Todo lo que marked maneja por defecto: tablas GFM, tachado, listas de tareas, autolinks, bloques de código con etiqueta de lenguaje y listas anidadas.",
        },
        {
          q: "¿Dónde se procesa mi texto?",
          a: "Íntegramente en tu navegador — el Markdown nunca sale de tu dispositivo, ni siquiera al copiar el HTML generado.",
        },
      ],
      deepDive: [
        {
          heading: "GFM frente a CommonMark: por qué tus tablas se renderizan",
          paragraphs: [
            "Markdown no es un solo lenguaje. CommonMark es el núcleo rigurosamente especificado — encabezados, listas, énfasis, enlaces — que existe porque la implementación Perl original de 2004 era tan ambigua que ni dos renderers se ponían de acuerdo. GitHub Flavored Markdown (GFM) es CommonMark más extensiones: tablas, tachado ~~así~~, listas de tareas, autolinks y bloques de código cercados con etiqueta de lenguaje.",
            "La vista previa renderiza el sabor GFM porque es lo que la gente escribe de verdad: los README en GitHub, los issues, las descripciones de pull requests y la mayoría de sitios de documentación asumen que las tablas y las listas de tareas funcionan. Si llevas el mismo documento a un renderer estricto de CommonMark, las tablas saldrán como texto crudo — una sorpresa de portabilidad que conviene anticipar, no un bug.",
            "Las diferencias restantes entre sabores son más sutiles: las reglas de salto de línea dentro de párrafos, cómo anidan las listas flojas frente a las compactas, y casos límite del énfasis a través de palabras. Cuando un fragmento se ve distinto en esta página que en otro sitio, la causa es casi siempre el sabor, no un error en tu Markdown — comprueba qué extensiones habilita el otro renderer.",
          ],
        },
        {
          heading: "El sanitizador es la historia de seguridad",
          paragraphs: [
            "Un visor de Markdown ejecuta aquello en lo que el Markdown se expande, y el HTML crudo dentro de Markdown es legal — lo que significa que un documento pegado puede llevar <script>, atributos onclick o enlaces javascript:. Renderizarlo sin sanear es exactamente como ocurre el XSS en sistemas de comentarios, wikis y campos de CMS que aceptan Markdown de usuarios.",
            "Esta vista previa aplica una lista blanca antes de que nada llegue a la página: solo sobreviven las etiquetas de formato estándar y los valores de atributo seguros. Las etiquetas script, los manejadores de eventos en línea y las URL javascript: se eliminan. La consecuencia práctica es que puedes pegar contenido de confianza dudosa — un documento de un desconocido, un hilo de comentarios raspado — y la vista previa no ejecutará nada hostil.",
            "El mismo sanitizador protege el camino de salida. El HTML que copias ya está limpio, así que pegarlo en un CMS o editor de blog no hace pasar scripts de contrabando. Y el límite, dicho con honestidad: el saneamiento elimina contenido activo, no audita lo que dice el texto visible — un documento puede carecer de scripts y seguir conteniendo pésimos consejos.",
          ],
        },
        {
          heading: "Dónde viven tus borradores",
          paragraphs: [
            "Los borradores de documentación son trabajo en marcha: changelogs sin publicar, runbooks internos con detalles de infraestructura, descripciones de PR que discuten parches de seguridad. Un visor de Markdown que subiera borradores a un servidor pondría exactamente eso en tránsito — así que aquí todo corre en local: el motor marked y el sanitizador ejecutan ambos en el JavaScript de tu navegador.",
            "Que el procesamiento sea local significa que ningún borrador persiste en ningún sitio, que el renderizado en vivo no sufre viajes de red, y que la herramienta funciona sin conexión. Escribir documentación en un avión o en un entorno sin red externa se comporta igual que en tu mesa.",
            "También esquiva la fricción habitual de pegar y formatear: sin plugin de editor que instalar, sin build que ejecutar, sin archivo que guardar primero. Pega desde Slack, desde un comentario de código, desde un ticket — lo ves renderizado en un segundo, y copias HTML limpio si lo necesitas.",
          ],
        },
      ],
    },
    pt: {
      name: "Visualizador Markdown",
      tagline:
        "Visualize Markdown como HTML limpo e sanitizado enquanto digita — títulos, listas, tabelas, código e links renderizados ao vivo. Perfeito para READMEs e docs.",
      intro: [
        "Escreva Markdown à esquerda e veja a página renderizada à direita em tempo real: títulos, ênfase, listas, tabelas, citações, listas de tarefas e blocos de código, tudo renderizado pelo motor marked, amplamente usado.",
        "O HTML gerado é sanitizado com uma allowlist rigorosa de tags e atributos antes de ser exibido — scripts, manipuladores de eventos e links javascript: são removidos — e você pode copiar o HTML limpo para colar num blog, CMS ou template de e-mail.",
      ],
      steps: [
        "Digite ou cole Markdown no painel esquerdo.",
        "Veja a pré-visualização sanitizada atualizar à direita enquanto escreve.",
        "Copie o HTML gerado quando ficar bom, ou limpe para começar de novo.",
      ],
      faqs: [
        {
          q: "O HTML da pré-visualização é seguro?",
          a: "Sim. Antes de renderizar, o HTML passa por um sanitizador de allowlist que remove tags script, manipuladores de eventos inline e links javascript:, mantendo apenas tags de formatação padrão e URLs seguros de imagens e links.",
        },
        {
          q: "Quais recursos de Markdown são suportados?",
          a: "Tudo o que o marked trata por padrão: tabelas GFM, tachado, listas de tarefas, autolinks, blocos de código com rótulo de linguagem e listas aninhadas.",
        },
        {
          q: "Onde meu texto é processado?",
          a: "Inteiramente no seu navegador — o Markdown nunca sai do seu dispositivo, nem quando você copia o HTML gerado.",
        },
      ],
      deepDive: [
        {
          heading: "GFM versus CommonMark: por que suas tabelas renderizam",
          paragraphs: [
            "Markdown não é uma linguagem só. CommonMark é o núcleo rigorosamente especificado — títulos, listas, ênfase, links — que existe porque a implementação Perl original de 2004 era tão ambígua que nenhum par de renderers concordava. GitHub Flavored Markdown (GFM) é CommonMark mais extensões: tabelas, tachado ~~assim~~, listas de tarefas, autolinks e blocos de código cercados com rótulo de linguagem.",
            "A pré-visualização renderiza o sabor GFM porque é o que as pessoas realmente escrevem: READMEs no GitHub, issues, descrições de pull requests e a maioria dos sites de documentação assumem que tabelas e listas de tarefas funcionam. Se você levar o mesmo documento a um renderer estrito de CommonMark, as tabelas sairão como texto cru — uma surpresa de portabilidade que vale antecipar, não um bug.",
            "As diferenças restantes entre sabores são mais sutis: as regras de quebra de linha dentro de parágrafos, como listas frouxas versus compactas se aninham, e casos de borda do ênfase atravessando palavras. Quando um trecho renderiza diferente nesta página e em outro site, a causa quase sempre é o sabor, não um erro no seu Markdown — confira quais extensões o outro renderer habilita.",
          ],
        },
        {
          heading: "O sanitizador é a história de segurança",
          paragraphs: [
            "Um visualizador de Markdown executa aquilo em que o Markdown se expande, e HTML cru dentro de Markdown é legal — o que significa que um documento colado pode carregar <script>, atributos onclick ou links javascript:. Renderizar isso sem sanitizar é exatamente como o XSS acontece em sistemas de comentários, wikis e campos de CMS que aceitam Markdown de usuários.",
            "Esta pré-visualização aplica uma allowlist antes de qualquer coisa chegar à página: só sobrevivem tags de formatação padrão e valores de atributos seguros. Tags script, manipuladores de eventos inline e URLs javascript: são removidos. A consequência prática: dá para colar conteúdo de confiança duvidosa — um documento de um desconhecido, um fio de comentários raspado — e a pré-visualização não executará nada hostil.",
            "O mesmo sanitizador protege o caminho de saída. O HTML que você copia já está limpo, então colá-lo num CMS ou editor de blog não faz scripts passarem de contrabando. E o limite, dito com honestidade: a sanitização remove conteúdo ativo, não audita o que o texto visível diz — um documento pode não ter scripts e ainda assim conter péssimos conselhos.",
          ],
        },
        {
          heading: "Onde seus rascunhos vivem",
          paragraphs: [
            "Rascunhos de documentação são trabalho em andamento: changelogs não publicados, runbooks internos com detalhes de infraestrutura, descrições de PR discutindo correções de segurança. Um visualizador de Markdown que enviasse rascunhos a um servidor colocaria exatamente isso em trânsito — então aqui tudo roda localmente: o motor marked e o sanitizador executam ambos no JavaScript do seu navegador.",
            "Processamento local significa que nenhum rascunho persiste em lugar nenhum, que a renderização ao vivo não sofre idas de rede, e que a ferramenta funciona offline. Escrever docs num avião ou num ambiente sem rede externa se comporta igual à sua mesa.",
            "Também contorna a fricção usual de colar e formatar: sem plugin de editor para instalar, sem build para rodar, sem arquivo para salvar antes. Cole do Slack, de um comentário de código, de um ticket — vê renderizado num segundo, e copia HTML limpo se precisar.",
          ],
        },
      ],
    },
  },
});
