import { DevHtmlToMarkdownEngine } from "../_engines/dev-engine-html-to-markdown";
import { defineTool } from "../_lib/types";

const SAMPLE =
  '<h1>Release notes</h1><p>Our <strong>biggest</strong> update yet — see the <a href="https://example.com/changelog">changelog</a>.</p><ul><li>Faster exports</li><li>Dark mode</li><li>Bug fixes</li></ul><blockquote><p>Simply the best tool we have tried.</p></blockquote><pre><code>npm install zoyku</code></pre>';

export default defineTool({
  slug: "html-to-markdown",
  category: "developer",
  icon: "text",
  engine: { component: DevHtmlToMarkdownEngine, props: { sample: SAMPLE } },
  related: ["markdown-previewer", "html-formatter", "html-escape", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "url-encoder", "html-minifier"],
  copy: {
    en: {
      name: "HTML to Markdown",
      tagline:
        "Turn HTML into clean Markdown while you type — headings, lists, links, images and code, with ATX or Setext headings and your pick of bullet marker.",
      intro: [
        "Paste markup from a web page, a CMS export or an email and get readable Markdown back instantly. The conversion is handled by turndown, the standard HTML-to-Markdown library: headings, emphasis, links, images, ordered and unordered lists, blockquotes and code blocks all map to their Markdown equivalents.",
        "Two small options cover most style guides: render headings ATX-style (# Heading) or Setext-style (underlined), and choose -, * or + as the unordered list marker. The result updates live as you type or change an option.",
      ],
      steps: [
        "Paste your HTML into the input pane.",
        "The Markdown appears live — tweak heading style or bullet marker if your style guide prefers different output.",
        "Copy the Markdown or download it as a .md file.",
      ],
      faqs: [
        {
          q: "Which HTML is converted, and what happens to the rest?",
          a: "Standard document markup — headings, paragraphs, lists, links, images, emphasis, code, blockquotes and horizontal rules — converts fully. Elements without a Markdown equivalent, such as tables and forms, are flattened to their text content.",
        },
        {
          q: "What is the difference between ATX and Setext headings?",
          a: "ATX writes headings with leading hash marks (## Heading); Setext underlines them with === for H1 or --- for H2. Setext only supports two levels, so deeper headings always fall back to ATX hashes.",
        },
        {
          q: "Does my HTML leave the browser?",
          a: "No. The conversion runs locally with turndown in your browser — nothing is uploaded, even when you download the .md file.",
        },
      ],
      deepDive: [
        {
          heading: "Markdown dialects: why the options exist",
          paragraphs: [
            "Markdown is not one format but a family. John Gruber's original 2004 syntax description left many behaviors unspecified, so implementations diverged: CommonMark now provides a rigorous spec that most modern renderers (GitHub, for example) follow, GFM adds tables and strikethrough on top, and older flavors differ in how they handle line breaks, emphasis with underscores and nested lists. This is why converting HTML to Markdown is a style decision, not a mechanical mapping.",
            "The two options in this tool address the most visible split. Heading style: ATX (# Heading) works everywhere and supports all six levels, while Setext (a line of = or - under the text) only reaches level two and reads better to some editors. List marker: -, * and + are all valid CommonMark bullets, but style guides (and diff readability) often prefer one. Choosing the right combination up front beats a find-and-replace pass afterwards.",
            "What has no Markdown equivalent gets flattened rather than faked: tables, forms and interactive widgets reduce to their text content. GFM-style tables would need a dialect-aware converter; emitting pipe-syntax tables from arbitrary HTML would produce output that many renderers cannot parse. Honesty about limits beats plausible-looking garbage.",
          ],
        },
        {
          heading: "The hard cases: escaping, inline markup and clean output",
          paragraphs: [
            "The tricky part of any HTML-to-Markdown conversion is not mapping tags — it is escaping characters that Markdown treats specially. Text containing literal asterisks, underscores, hash marks or square brackets needs backslash escapes, or it will render as emphasis, headings or links when the Markdown is consumed. A converter that skips escaping produces text that looks fine until someone pastes it into an editor and the formatting mutates.",
            "Inline structure also needs judgment calls. Emphasis and strong map to asterisks (or underscores, depending on configuration); whitespace around them matters because Markdown ignores emphasis that butts against word characters in some flavors. Hard line breaks from <br> become two trailing spaces or a backslash depending on the flavor — one of the details where CommonMark and older implementations genuinely differ.",
            "Code is the other classic trap: inline code with backticks inside needs a longer fence, and code blocks preserve content verbatim so no further escaping is applied inside them. The result you get here follows these rules via turndown, which is why pasted documents — blog posts, READMEs, CMS exports — usually come out ready to commit rather than needing a cleanup pass.",
          ],
        },
        {
          heading: "Local conversion for private documents",
          paragraphs: [
            "Documents people convert are often private: internal wiki pages, unpublished docs, support replies containing customer details, a company blog post in draft. Uploading any of these to a converter endpoint sends the full text to infrastructure you do not control, where it may be cached or logged. This tool runs turndown entirely in your browser — the HTML never leaves the device, there is no upload step, and the download of the .md file happens from local memory.",
            "The choice of library matters as much as the architecture: turndown is the de facto standard for HTML-to-Markdown in JavaScript, with years of edge-case handling accumulated across projects, so the output matches what the wider ecosystem expects. Pairing a well-tested converter with local execution gives the same quality you would get from a hosted service, minus the data exposure.",
            "For bulk or automated conversions, the same library is installable in a Node script; this page is the interactive front end for the same job. Either way the workflow stays on your machine — appropriate whether the source is a public changelog or a document nobody else should see.",
          ],
        },
      ],
    },
    zh: {
      name: "HTML 转 Markdown",
      tagline: "边粘贴边转换:HTML 实时变成干净的 Markdown——标题、列表、链接、图片、代码,可选 ATX/Setext 标题与列表符号。",
      intro: [
        "把网页、CMS 导出或邮件里的标记语言粘贴进来,立即得到可读的 Markdown。转换由事实标准库 turndown 完成:标题、强调、链接、图片、有序和无序列表、引用块、代码块都会映射到对应的 Markdown 写法。",
        "两个小选项覆盖大多数风格指南:标题用 ATX(# 标题)还是 Setext(下划线),无序列表用 -、* 还是 +。输入或切换选项时结果实时更新。",
      ],
      steps: [
        "把 HTML 粘贴到输入框。",
        "Markdown 实时生成——按你的风格指南调整标题风格或列表符号。",
        "复制 Markdown,或下载为 .md 文件。",
      ],
      faqs: [
        {
          q: "哪些 HTML 会被转换,其余的怎么办?",
          a: "标准文档标记——标题、段落、列表、链接、图片、强调、代码、引用块、水平线——都会完整转换。没有 Markdown 对应物的元素(如表格和表单)会被压平为纯文本内容。",
        },
        {
          q: "ATX 和 Setext 标题有什么区别?",
          a: "ATX 用行首井号写标题(## 标题);Setext 用 === 表示一级、--- 表示二级标题。Setext 只支持两级,更深的标题会自动回退为 ATX 井号。",
        },
        {
          q: "我的 HTML 会离开浏览器吗?",
          a: "不会。转换由浏览器内的 turndown 本地完成——即使下载 .md 文件,也不会有任何上传。",
        },
      ],
      deepDive: [
        {
          heading: "Markdown 方言:为什么要有这些选项",
          paragraphs: [
            "Markdown 不是一个格式,而是一族格式。John Gruber 2004 年的原始语法描述留了大量未定义行为,于是各家实现分道扬镳:CommonMark 现在提供了严格规范,GitHub 等主流渲染器都遵循它;GFM 在其上加了表格和删除线;更老的方言在换行、下划线强调、嵌套列表上的处理各不相同。所以 HTML 转 Markdown 是一次风格决策,不是机械映射。",
            "本工具的两个选项针对最显眼的分歧。标题风格:ATX(# 标题)到处通用、支持全部六级;Setext(文字下一行用 = 或 - 下划线)只能到二级,但部分编辑者觉得更好读。列表符号:-、* 和 + 都是合法的 CommonMark 圆点,但风格指南(和 diff 可读性)往往偏爱其一。转换前选对组合,胜过事后全文替换。",
            "没有 Markdown 对应物的元素会被压平而不是伪装:表格、表单和交互组件退化为文本内容。GFM 式表格需要方言感知的转换器;从任意 HTML 硬造管道语法表格,产出的是很多渲染器都解析不了的东西。对局限的诚实,胜过看起来很像的垃圾。",
          ],
        },
        {
          heading: "难点:转义、行内标记与干净输出",
          paragraphs: [
            "HTML 转 Markdown 真正难的环节不是标签映射,而是转义 Markdown 的特殊字符。包含字面星号、下划线、井号或方括号的文本需要反斜杠转义,否则 Markdown 被消费时会渲染成强调、标题或链接。不做转义的转换器,产出的文本看着没问题,直到有人贴进编辑器、格式当场变异。",
            "行内结构同样需要判断。强调和加粗映射为星号(或下划线,取决于配置);它们周围的空白有讲究,因为某些方言里紧贴单词字符的强调会被忽略。<br> 造成的硬换行,按方言变成行尾两个空格或一个反斜杠——这正是 CommonMark 与老实现真正分叉的细节之一。",
            "代码是另一个经典陷阱:行内代码本身含反引号时需要更长围栏;代码块内容逐字保留、内部不再做任何转义。这里的输出经由 turndown 遵循这些规则,所以粘贴进来的文档——博客文章、README、CMS 导出——通常直接可用,不需要再清理一遍。",
          ],
        },
        {
          heading: "为私有文档本地转换",
          paragraphs: [
            "被转换的文档往往私密:内部 wiki 页、未发布的文档、含客户信息的客服回复、公司博客的草稿。把其中任何一份上传到转换接口,等于把全文交给不受你控制的基础设施,可能被缓存或记日志。本工具让 turndown 完全在浏览器里运行——HTML 不离开设备,没有上传环节,.md 文件的下载也发生在本地内存。",
            "库的选择和架构同样重要:turndown 是 JavaScript 圈 HTML 转 Markdown 的事实标准,多年积累的边界情况处理让产出与生态的普遍预期一致。经过充分测试的转换器加本地执行,质量与托管服务相同,只是没有数据外泄。",
            "批量或自动化转换,同一库可直接装进 Node 脚本;这个页面只是同一份工作的交互前端。无论哪条路,工作流都留在你的机器上——来源是公开的更新日志也好、不该被别人看到的文档也罢,都合适。",
          ],
        },
      ],
    },
    ja: {
      name: "HTML → Markdown 変換",
      tagline:
        "HTML を貼りながらその場で Markdown 化 — 見出し・リスト・リンク・画像・コードに対応し、ATX/Setext と箇条書きマーカーを選択できます。",
      intro: [
        "Web ページ、CMS のエクスポート、メールからマークアップを貼り付けると、すぐに読みやすい Markdown が得られます。変換は事実上の標準ライブラリ turndown が担当:見出し・強調・リンク・画像・順序付き/なしリスト・引用・コードブロックが Markdown の書き方に対応付けられます。",
        "ほとんどのスタイルガイドは 2 つの小さなオプションで対応できます:見出しは ATX(# 見出し)か Setext(下線付き)、箇条書きのマーカーは -、*、+ から選択。入力やオプション変更に合わせて結果がリアルタイムに更新されます。",
      ],
      steps: [
        "HTML を入力ペインに貼り付けます。",
        "Markdown がリアルタイムに生成されます — スタイルガイドに合わせて見出しスタイルやマーカーを調整できます。",
        "Markdown をコピーするか、.md ファイルとしてダウンロードします。",
      ],
      faqs: [
        {
          q: "どの HTML が変換され、残りはどうなりますか?",
          a: "標準的な文書マークアップ(見出し・段落・リスト・リンク・画像・強調・コード・引用・水平線)は完全に変換されます。表やフォームなど Markdown に対応する要素がないものは、テキスト内容に展開されます。",
        },
        {
          q: "ATX と Setext の見出しの違いは?",
          a: "ATX は行頭のハッシュ(## 見出し)、Setext は H1 を ===、H2 を --- で下線のように表します。Setext は 2 段階までしか対応しないため、それより深い見出しは自動的に ATX になります。",
        },
        {
          q: "HTML はブラウザの外に出ますか?",
          a: "いいえ。変換はブラウザ内の turndown でローカルに行われ、.md をダウンロードするときも何もアップロードされません。",
        },
      ],
      deepDive: [
        {
          heading: "Markdown の方言:オプションが存在する理由",
          paragraphs: [
            "Markdown は一つの形式ではなく一族です。John Gruber の 2004 年の元の構文記述には未定義の部分が多く、実装は分かれました。CommonMark が今では厳密な仕様を提供し、GitHub などの多くのモダンなレンダラーが従っています。GFM はその上に表と取り消し線を加え、より古い方言は改行、アンダースコアによる強調、ネストしたリストの扱いが異なります。だから HTML から Markdown への変換は機械的な対応ではなく、スタイルの判断なのです。",
            "このツールの 2 つのオプションは、最も見た目に分かれやすい部分を扱います。見出しスタイル:ATX(# 見出し)はどこでも使え 6 段階すべてに対応し、Setext(テキストの下に = や - の行)は 2 段階までですが、一部の編集者には読みやすいと好まれます。リストマーカー:-、*、+ はいずれも CommonMark の正当な箇条書きですが、スタイルガイド(と diff の可読性)はしばしば 1 つを好みます。事前に正しい組み合わせを選ぶ方が、後で一括置換するよりよいでしょう。",
            "Markdown に対応する要素のないものは偽装ではなく展開されます。表、フォーム、インタラクティブなウィジェットはテキスト内容になります。GFM 流の表は方言を理解するコンバーターを必要とし、任意の HTML から無理にパイプ構文の表を作ると、多くのレンダラーが解析できない出力になります。限界への誠実さは、それらしく見えるゴミに勝ります。",
          ],
        },
        {
          heading: "難所:エスケープ、インライン構造、きれいな出力",
          paragraphs: [
            "HTML から Markdown への変換で本当に難しいのはタグの対応付けではなく、Markdown が特別扱いする文字のエスケープです。リテラルのアスタリスク、アンダースコア、ハッシュ、角括弧を含むテキストにはバックスラッシュのエスケープが必要です。さもないと Markdown が消費されたときに強調や見出しやリンクとして描画されます。エスケープを省略するコンバーターは、誰かがエディターに貼り付けた瞬間に書式が変異するテキストを生みます。",
            "インライン構造にも判断が要ります。強調と strong はアスタリスク(設定によってはアンダースコア)に写りますが、その周囲の空白が問題になります。方言によっては単語文字に接する強調が無視されるためです。br によるハード改行は、方言に応じて行末の 2 スペースかバックスラッシュになります——CommonMark と古い実装が実際に分かれる細部の一つです。",
            "コードはもう一つの定番の罠です。行内コードにバッククォートが含まれる場合はより長いフェンスが必要で、コードブロックの中身は逐語的に保持されるため内部では追加のエスケープを行いません。ここの出力は turndown 経由でこれらの規則に従うため、貼り付けた文書——ブログ記事、README、CMS のエクスポート——はたいてい掃除なしでコミットできる状態になります。",
          ],
        },
        {
          heading: "非公開文書のためにローカル変換する",
          paragraphs: [
            "変換される文書は往々にして非公開です。社内 wiki のページ、未公開のドキュメント、顧客情報を含むサポート返信、下書き状態の会社ブログ。これを変換 API にアップロードすることは、全文を自分の管理外のインフラに渡すことであり、キャッシュやログに残るかもしれません。このツールは turndown を完全にブラウザ内で実行します。HTML は端末の外に出ず、アップロード工程はなく、.md のダウンロードもローカルメモリから行われます。",
            "アーキテクチャと同様にライブラリの選択も重要です。turndown は JavaScript 界の HTML から Markdown への変換における事実上の標準で、長年のエッジケース処理の蓄積により、出力はエコシステムの広い期待に一致します。よくテストされたコンバーターとローカル実行の組み合わせは、ホスティングサービスと同じ品質を、データ露出なしで提供します。",
            "一括や自動化の変換には、同じライブラリを Node スクリプトに組み込めます。このページは同じ仕事の対話的なフロントエンドです。どちらの道でもワークフローはあなたのマシン上に留まります。ソースが公開の変更履歴でも、他の誰にも見せてはいけない文書でも、それが正しい設計です。",
          ],
        },
      ],
    },
    es: {
      name: "HTML a Markdown",
      tagline:
        "Convierte HTML en Markdown limpio mientras escribes: encabezados, listas, enlaces, imágenes y código, con estilo ATX o Setext y tu viñeta preferida.",
      intro: [
        "Pega marcado de una página web, una exportación de CMS o un correo y recibe Markdown legible al instante. La conversión la hace turndown, la librería estándar de HTML a Markdown: encabezados, énfasis, enlaces, imágenes, listas ordenadas y sin orden, citas y bloques de código se mapean a sus equivalentes en Markdown.",
        "Dos opciones pequeñas cubren la mayoría de guías de estilo: encabezados al estilo ATX (# Encabezado) o Setext (subrayados), y elegir -, * o + como marcador de listas. El resultado se actualiza en vivo mientras escribes o cambias una opción.",
      ],
      steps: [
        "Pega tu HTML en el panel de entrada.",
        "El Markdown aparece en vivo — ajusta el estilo de encabezados o la viñeta si tu guía prefiere otra salida.",
        "Copia el Markdown o descárgalo como archivo .md.",
      ],
      faqs: [
        {
          q: "¿Qué HTML se convierte y qué pasa con el resto?",
          a: "El marcado de documento estándar — encabezados, párrafos, listas, enlaces, imágenes, énfasis, código, citas y líneas horizontales — se convierte por completo. Los elementos sin equivalente en Markdown, como tablas y formularios, se aplanan a su contenido de texto.",
        },
        {
          q: "¿Qué diferencia hay entre encabezados ATX y Setext?",
          a: "ATX escribe los encabezados con almohadillas (## Encabezado); Setext los subraya con === para H1 o --- para H2. Setext solo admite dos niveles, así que los más profundos vuelven a almohadillas ATX.",
        },
        {
          q: "¿Mi HTML sale del navegador?",
          a: "No. La conversión la ejecuta turndown localmente en tu navegador — no se sube nada, ni siquiera al descargar el archivo .md.",
        },
      ],
      deepDive: [
        {
          heading: "Dialectos de Markdown: por qué existen las opciones",
          paragraphs: [
            "Markdown no es un formato, es una familia. La descripción de sintaxis original de John Gruber, de 2004, dejó muchos comportamientos sin especificar, y las implementaciones divergieron: CommonMark ofrece hoy una especificación rigurosa que siguen la mayoría de los renderizadores modernos (GitHub, por ejemplo), GFM añade tablas y tachado por encima, y sabores más antiguos difieren en saltos de línea, énfasis con guiones bajos y listas anidadas. Por eso convertir HTML a Markdown es una decisión de estilo, no un mapeo mecánico.",
            "Las dos opciones de esta herramienta cubren la división más visible. Estilo de encabezados: ATX (# Encabezado) funciona en todas partes y soporta los seis niveles, mientras que Setext (una línea de = o - bajo el texto) llega solo al nivel dos, aunque algunos editores lo encuentran más legible. Viñeta de lista: -, * y + son válidos como bullets en CommonMark, pero las guías de estilo (y la legibilidad de los diffs) suelen preferir uno. Elegir la combinación correcta antes gana una pasada de buscar-y-reemplazar después.",
            "Lo que no tiene equivalente en Markdown se aplana en lugar de fingirse: tablas, formularios y widgets interactivos se reducen a su contenido de texto. Las tablas al estilo GFM exigirían un conversor consciente del dialecto; emitir tablas de sintaxis de barras desde HTML arbitrario produciría texto que muchos renderizadores no pueden parsear. La honestidad sobre los límites vence a la basura con aspecto plausible.",
          ],
        },
        {
          heading: "Los casos difíciles: escape, marcado inline y salida limpia",
          paragraphs: [
            "La parte realmente difícil de cualquier conversión de HTML a Markdown no es mapear etiquetas — es escapar los caracteres que Markdown trata como especiales. Texto con asteriscos, guiones bajos, almohadillas o corchetes literales necesita escapes con barra invertida, o se renderizará como énfasis, encabezados o enlaces cuando el Markdown se consuma. Un conversor que se salta el escape produce texto que se ve bien hasta que alguien lo pega en un editor y el formato muta.",
            "La estructura inline también pide criterio. énfasis y strong se mapean a asteriscos (o guiones bajos, según la configuración); el espacio alrededor importa, porque algunos sabores ignoran el énfasis pegado a caracteres de palabra. Los saltos duros de br se convierten en dos espacios finales o una barra invertida según el sabor — uno de los detalles donde CommonMark y las implementaciones antiguas genuinamente divergen.",
            "El código es la otra trampa clásica: código inline con comillas invertidas dentro necesita una cerca más larga, y los bloques de código conservan el contenido literal sin aplicar más escapes dentro. La salida aquí sigue esas reglas vía turndown, así que los documentos pegados — entradas de blog, READMEs, exportaciones de CMS — suelen salir listos para commit sin una pasada de limpieza.",
          ],
        },
        {
          heading: "Conversión local para documentos no públicos",
          paragraphs: [
            "Los documentos que se convierten suelen ser no públicos: páginas de un wiki interno, documentación sin publicar, respuestas de soporte con datos de clientes, el borrador del blog de la empresa. Subirlos a una API de conversión significa entregar el texto completo a una infraestructura fuera de tu control, con posible caché o registro. Esta herramienta ejecuta turndown por completo en tu navegador: el HTML nunca sale de tu dispositivo, no hay paso de subida, y la descarga del .md también ocurre desde memoria local.",
            "La elección de la librería importa tanto como la arquitectura. turndown es el estándar de facto para HTML a Markdown en el mundo JavaScript, y sus años acumulando casos límite hacen que la salida coincida con lo que el ecosistema espera en general. La combinación de conversor bien probado y ejecución local ofrece la misma calidad que un servicio alojado, sin exposición de datos.",
            "Para conversiones por lotes o automatizadas, puedes incrustar la misma librería en un script de Node; esta página es el frontend interactivo del mismo trabajo. En cualquier camino, el flujo de trabajo se queda en tu máquina. Tanto si la fuente es un registro de cambios público como un documento que nadie más debe ver, ese es el diseño correcto.",
          ],
        },
      ],
    },
    pt: {
      name: "HTML para Markdown",
      tagline:
        "Transforme HTML em Markdown limpo enquanto digita: títulos, listas, links, imagens e código, com títulos ATX ou Setext e o marcador que preferir.",
      intro: [
        "Cole marcação de uma página web, uma exportação de CMS ou um e-mail e receba Markdown legível na hora. A conversão fica por conta do turndown, a biblioteca padrão de HTML para Markdown: títulos, ênfase, links, imagens, listas ordenadas e não ordenadas, citações e blocos de código viram seus equivalentes em Markdown.",
        "Duas opções pequenas cobrem a maioria dos guias de estilo: títulos no estilo ATX (# Título) ou Setext (sublinhados), e escolher -, * ou + como marcador de lista. O resultado atualiza ao vivo enquanto você digita ou muda uma opção.",
      ],
      steps: [
        "Cole seu HTML no painel de entrada.",
        "O Markdown aparece ao vivo — ajuste o estilo de títulos ou o marcador se seu guia preferir outra saída.",
        "Copie o Markdown ou baixe como arquivo .md.",
      ],
      faqs: [
        {
          q: "Qual HTML é convertido e o que acontece com o resto?",
          a: "A marcação de documento padrão — títulos, parágrafos, listas, links, imagens, ênfase, código, citações e linhas horizontais — é convertida por completo. Elementos sem equivalente em Markdown, como tabelas e formulários, são achatados em seu conteúdo de texto.",
        },
        {
          q: "Qual a diferença entre títulos ATX e Setext?",
          a: "ATX escreve títulos com cerquilhas (## Título); Setext os sublinha com === para H1 ou --- para H2. Setext só suporta dois níveis, então níveis mais profundos voltam para cerquilhas ATX.",
        },
        {
          q: "Meu HTML sai do navegador?",
          a: "Não. A conversão roda localmente com o turndown no seu navegador — nada é enviado, nem quando você baixa o arquivo .md.",
        },
      ],
      deepDive: [
        {
          heading: "Dialectos do Markdown: por que as opções existem",
          paragraphs: [
            "Markdown não é um formato, é uma família. A descrição de sintaxe original de John Gruber, de 2004, deixou muitos comportamentos sem especificar, e as implementações divergiram: CommonMark agora oferece uma especificação rigorosa seguida pela maioria dos renderizadores modernos (GitHub, por exemplo), GFM acrescenta tabelas e tachado por cima, e sabores mais antigos diferem em quebras de linha, ênfase com underscores e listas aninhadas. Por isso converter HTML em Markdown é uma decisão de estilo, não um mapeamento mecânico.",
            "As duas opções desta ferramenta cobrem a divisão mais visível. Estilo de títulos: ATX (# Título) funciona em todo lugar e suporta os seis níveis, enquanto Setext (uma linha de = ou - sob o texto) chega só ao nível dois, embora alguns editores o achem mais legível. Marcador de lista: -, * e + são válidos como bullets no CommonMark, mas guias de estilo (e a legibilidade de diffs) costumam preferir um. Escolher a combinação certa antes vence uma passada de buscar-e-substituir depois.",
            "O que não tem equivalente em Markdown é achatado em vez de fingido: tabelas, formulários e widgets interativos reduzem-se ao conteúdo de texto. Tabelas ao estilo GFM exigiriam um conversor consciente do dialeto; emitir tabelas de sintaxe de barra a partir de HTML arbitrário produziria texto que muitos renderizadores não conseguem parsear. Honestidade sobre os limites vence lixo com aparência plausível.",
          ],
        },
        {
          heading: "Os casos difíceis: escape, marcação inline e saída limpa",
          paragraphs: [
            "A parte de fato difícil de qualquer conversão HTML para Markdown não é mapear tags — é escapar os caracteres que o Markdown trata como especiais. Texto com asteriscos, underscores, cerquilhas ou colchetes literais precisa de escapes com barra invertida, ou renderizará como ênfase, títulos ou links quando o Markdown for consumido. Um conversor que pula o escape produz texto que parece bem até alguém colar num editor e a formatação mutar.",
            "A estrutura inline também pede julgamento. Ênfase e strong mapeiam para asteriscos (ou underscores, conforme a configuração); o espaço ao redor importa, porque alguns sabores ignoram ênfase colada em caracteres de palavra. Quebras duras de br viram dois espaços finais ou uma barra invertida conforme o sabor — um dos detalhes em que CommonMark e implementações antigas genuinamente divergem.",
            "Código é a outra armadilha clássica: código inline com backticks dentro precisa de uma cerca mais longa, e blocos de código preservam o conteúdo literal sem aplicar mais escapes no interior. A saída aqui segue essas regras via turndown, por isso os documentos colados — posts de blog, READMEs, exportações de CMS — costumam sair prontos para commit sem uma passada de limpeza.",
          ],
        },
        {
          heading: "Conversão local para documentos privados",
          paragraphs: [
            "Os documentos que as pessoas convertem costumam ser privados: páginas de wiki internas, docs não publicados, respostas de suporte com dados de clientes, um rascunho do blog da empresa. Subir qualquer um destes a um endpoint de conversão envia o texto completo para infraestrutura que você não controla, onde pode ser cacheado ou registrado em log. Esta ferramenta executa o turndown inteiramente no seu navegador — o HTML nunca sai do dispositivo, não há etapa de upload, e o download do arquivo .md acontece a partir da memória local.",
            "A escolha da biblioteca importa tanto quanto a arquitetura: o turndown é o padrão de fato para HTML para Markdown em JavaScript, com anos de tratamento de casos extremos acumulado entre projetos, então a saída bate com o que o ecossistema espera. Combinar um conversor bem testado com execução local dá a mesma qualidade de um serviço hospedado, sem a exposição de dados.",
            "Para conversões em massa ou automatizadas, a mesma biblioteca é instalável num script Node; esta página é o front end interativo do mesmo trabalho. De qualquer forma, o fluxo fica na sua máquina — apropriado tanto se a origem é um changelog público quanto um documento que ninguém mais deveria ver.",
          ],
        },
      ],
    },
  },
});
