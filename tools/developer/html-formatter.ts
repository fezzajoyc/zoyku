import { DevCodeEngine } from "../_engines/dev-engine-code";
import { defineTool } from "../_lib/types";

const SAMPLE = '<div class="card"><h1>Hi</h1><p>Some <b>bold</b> text</p><img src="x.png" alt="x"></div>';

export default defineTool({
  slug: "html-formatter",
  category: "developer",
  icon: "code",
  engine: { component: DevCodeEngine, props: { mode: "html-beautify", sample: SAMPLE } },
  related: ["html-minifier", "xml-formatter", "css-minifier", "markdown-previewer", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "url-encoder"],
  copy: {
    en: {
      name: "HTML Formatter",
      tagline:
        "Turn minified or one-line HTML into clean, indented markup — a simple, reliable beautifier for emails, templates and saved pages. 100% client-side.",
      intro: [
        "Paste crammed-together HTML and get readable, consistently indented markup back instantly. Void elements like img and br never break the indentation, common auto-closing tags such as li and p are handled sensibly, and the contents of pre, textarea, script and style blocks are preserved untouched.",
        "A deliberate simple formatter: no reordering, no attribute rewriting, no surprises — just whitespace and line breaks added so the structure is obvious at a glance.",
      ],
      steps: [
        "Paste your HTML into the input box.",
        "The indented result appears live as you type.",
        "Copy the formatted markup or clear the input to format another snippet.",
      ],
      faqs: [
        {
          q: "Does formatting change how my HTML renders?",
          a: "No — formatting only inserts whitespace and line breaks between tags. The contents of pre, textarea, script and style are preserved exactly, since whitespace there is meaningful.",
        },
        {
          q: "How does it handle unclosed tags like li or p?",
          a: "It knows the common auto-closing elements: a new li closes the previous one, and a closing tag for an ancestor pops all open children, so lists and paragraphs indent the way you expect.",
        },
        {
          q: "Is the HTML sent to a server?",
          a: "Never. The formatter is a local JavaScript tokenizer — your markup stays in your browser.",
        },
      ],
    },
    zh: {
      name: "HTML 格式化",
      tagline: "把压缩或挤成一行的 HTML 变成缩进规范的标记——简单可靠的代码美化,适合邮件模板和网页另存,纯本地处理。",
      intro: [
        "粘贴挤在一起的 HTML,立即得到缩进一致、可读性好的结果。img、br 等空元素不会破坏缩进,li、p 等常见可自动闭合的标签也能正确处理,pre、textarea、script、style 的内容原样保留。",
        "刻意保持简单:不重排、不改写属性、不出意外——只添加空白和换行,让结构一目了然。",
      ],
      steps: [
        "把 HTML 粘贴到输入框。",
        "边输入边实时显示缩进结果。",
        "复制格式化后的标记,或清空输入格式化下一段。",
      ],
      faqs: [
        {
          q: "格式化会改变 HTML 的渲染效果吗?",
          a: "不会——只在标签之间插入空白和换行。pre、textarea、script、style 的内容原样保留,因为这些地方空白是有意义的。",
        },
        {
          q: "li、p 这类未闭合标签怎么处理?",
          a: "格式化器了解常见的可自动闭合元素:新的 li 会闭合上一个 li,遇到祖先的闭合标签会回退所有子级,列表和段落的缩进符合直觉。",
        },
        {
          q: "HTML 会被发送到服务器吗?",
          a: "绝不会。格式化器是本地 JavaScript 解析器,标记只留在你的浏览器里。",
        },
      ],
    },
    ja: {
      name: "HTML フォーマッター",
      tagline:
        "圧縮された 1 行 HTML を整理されたインデント付きマークアップに。メール・テンプレート・保存ページ向けのシンプルで確実な整形ツールです。",
      intro: [
        "詰め込まれた HTML を貼り付けると、即座に読みやすく統一されたインデントのマークアップに戻ります。img・br などの void 要素でインデントが崩れず、li・p といった暗黙閉じ要素も適切に処理され、pre・textarea・script・style の中身はそのまま保持されます。",
        "あえてシンプルに:並べ替えも属性の書き換えもせず、空白と改行を加えて構造がひと目で分かるようにするだけです。",
      ],
      steps: [
        "HTML を入力欄に貼り付けます。",
        "入力すると同時にインデント結果が表示されます。",
        "整形後のマークアップをコピーするか、入力をクリアして次の断片へ。",
      ],
      faqs: [
        {
          q: "整形すると HTML の表示は変わりますか?",
          a: "変わりません。タグ間に空白と改行を追加するだけです。pre・textarea・script・style の中身は空白が意味を持つため、完全にそのまま保持されます。",
        },
        {
          q: "li や p のような閉じないタグはどう扱われますか?",
          a: "よくある暗黙閉じ要素を把握しています。新しい li は前の li を閉じ、祖先の閉じタグで開いた子をまとめて閉じるため、リストや段落は期待どおりにインデントされます。",
        },
        {
          q: "HTML はサーバーに送られますか?",
          a: "いいえ。フォーマッターはローカルの JavaScript トークナイザーで、マークアップはブラウザから出ません。",
        },
      ],
    },
    es: {
      name: "Formateador HTML",
      tagline:
        "Convierte HTML minificado o en una línea en marcado limpio e indentado: embellecedor simple y fiable para emails, plantillas y páginas guardadas.",
      intro: [
        "Pega HTML amontonado y recupera al instante un marcado legible y con indentación consistente. Los elementos vacíos como img y br no rompen la indentación, las etiquetas con cierre automático como li y p se tratan con sensatez, y el contenido de pre, textarea, script y style se conserva intacto.",
        "Un formateador deliberadamente simple: sin reordenar, sin reescribir atributos, sin sorpresas — solo espacios y saltos de línea para que la estructura se entienda de un vistazo.",
      ],
      steps: [
        "Pega tu HTML en el cuadro de entrada.",
        "El resultado indentado aparece en vivo mientras escribes.",
        "Copia el marcado formateado o borra la entrada para dar formato a otro fragmento.",
      ],
      faqs: [
        {
          q: "¿El formateo cambia cómo se renderiza mi HTML?",
          a: "No: solo inserta espacios y saltos entre etiquetas. El contenido de pre, textarea, script y style se conserva exactamente, porque allí el espacio en blanco importa.",
        },
        {
          q: "¿Cómo maneja etiquetas sin cerrar como li o p?",
          a: "Conoce los elementos de cierre automático comunes: un li nuevo cierra al anterior, y la etiqueta de cierre de un antepasado cierra todos los hijos abiertos, así que listas y párrafos se indentan como esperas.",
        },
        {
          q: "¿El HTML se envía a un servidor?",
          a: "Nunca. El formateador es un tokenizador JavaScript local: tu marcado se queda en tu navegador.",
        },
      ],
    },
    pt: {
      name: "Formatador HTML",
      tagline:
        "Transforme HTML minificado ou em uma linha em marcação limpa e indentada — embelezador simples e confiável para e-mails, templates e páginas salvas.",
      intro: [
        "Cole HTML amontoado e receba instantaneamente uma marcação legível e com indentação consistente. Elementos vazios como img e br não quebram a indentação, tags com fechamento automático como li e p são tratadas com bom senso, e o conteúdo de pre, textarea, script e style é preservado intacto.",
        "Um formatador propositalmente simples: sem reordenar, sem reescrever atributos, sem surpresas — apenas espaços e quebras de linha para que a estrutura fique óbvia de relance.",
      ],
      steps: [
        "Cole seu HTML na caixa de entrada.",
        "O resultado indentado aparece ao vivo enquanto você digita.",
        "Copie a marcação formatada ou limpe a entrada para formatar outro trecho.",
      ],
      faqs: [
        {
          q: "A formatação muda como meu HTML é renderizado?",
          a: "Não — ela só insere espaços e quebras entre as tags. O conteúdo de pre, textarea, script e style é preservado exatamente, pois ali o espaço em branco importa.",
        },
        {
          q: "Como lida com tags sem fechar, como li ou p?",
          a: "Ela conhece os elementos de fechamento automático comuns: um novo li fecha o anterior, e a tag de fechamento de um ancestral fecha todos os filhos abertos, então listas e parágrafos indentam como você espera.",
        },
        {
          q: "O HTML é enviado a um servidor?",
          a: "Nunca. O formatador é um tokenizador JavaScript local — sua marcação fica no seu navegador.",
        },
      ],
    },
  },
});
