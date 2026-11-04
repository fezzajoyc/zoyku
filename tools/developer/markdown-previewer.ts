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
    },
  },
});
