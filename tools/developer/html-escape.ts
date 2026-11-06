import { DevHtmlEscapeEngine } from "../_engines/dev-html-escape";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "html-escape",
  category: "developer",
  icon: "code",
  engine: {
    component: DevHtmlEscapeEngine,
    props: {
      escapeId: "html-escape",
      unescapeId: "html-unescape",
      sample: `<a href="/docs?a=1&b=2">Tom & Jerry's "favorites"</a>`,
    },
  },
  related: ["html-formatter", "html-minifier", "url-encoder", "url-decoder", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "json-path-query"],
  copy: {
    en: {
      name: "HTML Escape / Unescape",
      tagline:
        "Escape or unescape HTML entities live as you type: & < > and quotes become safe references, with an optional numeric mode for non-ASCII characters.",
      intro: [
        "Encode the five characters that break HTML — ampersand, angle brackets and both quote styles — into their named entities, or paste entities back into readable text. Essential before injecting user content into templates, emails or rich-text fields.",
        "A second toggle switches accented and non-Latin characters to numeric references like &#233; for legacy systems and email clients. The readout shows exactly how the character count changed, so a broken double-escape is visible at a glance.",
        "Escaping follows the HTML5 named character reference list: &amp; is applied first and unescaped last, which is the ordering rule that prevents double-escaping. Only the five markup-significant characters are touched by default — the rest of your text passes through byte for byte.",
        "Unlike regex one-liners that miss the ampersand-first ordering or escape everything indiscriminately, this tool handles both directions in one panel and keeps quotes optional per context — attributes need them escaped, text nodes do not."
      ],
      steps: [
        "Paste HTML or escaped text into the input box.",
        "Pick Escape or Unescape; both run live as you type.",
        "Enable numeric entities if you need non-ASCII output like &#233;.",
        "Copy the result — the char-count readout shows how much it grew or shrank.",
      ],
      faqs: [
        {
          q: "Why is the single quote escaped as &#39; instead of &apos;?",
          a: "&apos; is valid in XML and HTML5 but was never part of HTML 4, so some older parsers and email clients mishandle it. The numeric &#39; is safe everywhere.",
        },
        {
          q: "Do I need to escape non-ASCII characters?",
          a: "In UTF-8 documents, usually no — browsers handle é directly. Numeric entities matter for legacy encodings, email pipelines or systems that mangle non-ASCII bytes.",
        },
        {
          q: "Which named entities does unescaping recognize?",
          a: "About 70 common ones — markup (&amp;, &lt;, &gt;, &quot;, &apos;), punctuation (&mdash;, &hellip;, &ldquo;), Latin accents and symbols (&copy;, &euro;) — plus every decimal and hexadecimal numeric reference.",
        },
      ],
      deepDive: [
        {
          heading: "Five characters and the ampersand-first rule",
          paragraphs: [
            "Making text safe for HTML requires escaping exactly five characters: &amp;, &lt;, &gt;, &quot; and &#39;. The ampersand comes first because every entity begins with it — an unescaped & followed by letters is the signal the browser uses to start parsing a reference. That is also why order matters when escaping: & must become &amp; before anything else, or the entities you just created get re-escaped into &amp;lt;.",
            "The reverse direction flips the order: when unescaping, &amp; is processed last, not first. Process it first and &amp;lt; becomes &lt;, then a real < — a live tag where the author wanted visible text. That single ordering mistake is the entire mechanism behind double-unescape bugs, and it is the mistake most regex one-liners make.",
            "Whether quotes need escaping is a context question. In text nodes they are harmless — <p>He said “hi”</p> is legal. Inside attribute values, the quote that delimits the attribute must be escaped, and unescaped quotes in attributes are the classic injection vector: a value ending in “ can close the attribute and open a new one. Escape quotes for attribute contexts; leave them alone in plain text if you want readable output.",
          ],
        },
        {
          heading: "Entities, XSS and the honestly stated boundary",
          paragraphs: [
            "Escaping is the first line of XSS defense: a user-submitted <script> becomes &lt;script&gt;, which renders as visible text instead of executing. Decent template engines do this automatically for text interpolation — but manual string concatenation, building HTML in JavaScript with +, or rendering user content into attributes still require the discipline by hand.",
            "The boundary deserves an honest statement: escaping makes content inert as markup, it does not make the content trustworthy. An escaped document still displays whatever the author wrote — phishing text, misleading instructions. Escaping addresses correctness and injection safety, not content review.",
            "Numeric entities like &#233; and &#x2019; exist for portability, not security. In a UTF-8 world they are mostly unnecessary, but legacy email pipelines, older code paths with non-UTF-8 encodings, and systems that strip high bytes still benefit. The named references the unescape direction recognizes cover the everyday set — markup, punctuation, Latin accents and currency symbols — plus all numeric forms.",
          ],
        },
        {
          heading: "Escaping user content locally",
          paragraphs: [
            "Text that needs escaping is usually other people's words: customer support messages, comment threads scraped for analysis, user bios headed into an email template. That is exactly the content you do not want routed through a web service — and some online versions of this tool do POST the text to their backend.",
            "Everything here runs in your browser's JavaScript: the transformation is pure character manipulation with no network involvement at any step. Paste a customer's full message, an entire comment dump, a template with personalization fields; nothing leaves the device, nothing is logged, and the character-count readout keeps you honest about how much the escaping inflated the text.",
            "Pair it with URL encoding when crossing contexts: HTML entities protect markup context, percent-encoding protects URL context, and neither substitutes for the other — an HTML-escaped & inside a query string is a different thing from a percent-encoded one. Doing both conversions locally, side by side, is how contexts stay unconfused.",
          ],
        },
      ],
    },
    zh: {
      name: "HTML 转义 / 反转义",
      tagline: "实时互转 HTML 实体:& < > 引号一键转义,可选数字实体处理非 ASCII 字符,并显示字符数变化。",
      intro: [
        "把破坏 HTML 的五个字符——&、尖括号和两种引号——编码成命名实体,也可以把实体文本反转回可读内容。另有一个开关,把带重音和非拉丁字符切换为 &#233; 这样的数字引用,适合遗留系统和邮件模板。",
        "两个方向在同一个面板里实时运行,读数会显示字符数如何变化,二次转义之类的问题一眼可见。",
      ],
      steps: [
        "把 HTML 或已转义的文本粘贴进输入框。",
        "选择转义或反转义,输入即算。",
        "需要 &#233; 这类非 ASCII 输出时,打开数字实体开关。",
        "复制结果——字符数读数会显示变长还是变短。",
      ],
      faqs: [
        {
          q: "单引号为什么转义成 &#39; 而不是 &apos;?",
          a: "&apos; 在 XML 和 HTML5 里合法,但不属于 HTML 4,一些老解析器和邮件客户端会处理出错。数字形式 &#39; 在任何地方都安全。",
        },
        {
          q: "非 ASCII 字符需要转义吗?",
          a: "UTF-8 文档通常不需要——浏览器直接处理 é。数字实体主要用于旧编码、邮件管线或会损坏非 ASCII 字节的系统。",
        },
        {
          q: "反转义识别哪些命名实体?",
          a: "约 70 个常用实体:标记类(&amp;、&lt;、&gt;、&quot;、&apos;)、标点(&mdash;、&hellip;、&ldquo;)、拉丁重音字符和符号(&copy;、&euro;),以及全部十进制和十六进制数字引用。",
        },
      ],
      deepDive: [
        {
          heading: "五个字符与 & 优先规则",
          paragraphs: [
            "HTML 作为文本安全只需要转义五个字符:&amp;、&lt;、&gt;、&quot;、&#39;。& 排在第一,因为所有实体都以它开头——没转义的 & 后面跟字母,浏览器就开始解析引用了。这也是转义时顺序重要的原因:& 必须先变成 &amp;,再处理其他字符,否则刚生成的实体会被再转义成 &amp;lt;。",
            "反方向的顺序反过来:反转义时 &amp; 要最后处理,不是最先。先处理它会把 &amp;lt; 变成 &lt;,再变成真正的 <——作者本想显示的文本变成了活标签。这一个顺序错误就是双重反转义 bug 的全部机制,也是大多数正则单行代码犯的错。",
            "需不需要转义引号由上下文决定。文本节点里引号无害——<p>He said \"hi\"</p> 是合法的。属性值里,定界属性的那个引号必须转义,属性里没转义的引号是经典注入入口:以 \" 结尾的值能关掉属性再开一个新的。属性场景转义引号;纯文本场景想让输出可读就别动它们。",
          ],
        },
        {
          heading: "实体、XSS 与如实说的边界",
          paragraphs: [
            "转义是 XSS 防御的第一线:用户贴的 <script> 变成 &lt;script&gt;,渲染成可见文本而不是执行。像样的模板引擎在文本插值时都会自动做——但手工字符串拼接、在 JavaScript 里用 + 拼 HTML、或在属性里渲染用户内容,仍然需要手动保持这个纪律。",
            "边界要如实理解:转义让内容作为标记失去活性,但不代表内容值得信任。转义后的文档照样显示作者写的任何话——钓鱼文本、误导性指令。转义管的是正确性和注入安全,不是内容审查。",
            "&#233;、&#x2019; 这类数字实体是为了可移植性,不是安全。UTF-8 时代它们大多没必要,但遗留邮件管线、非 UTF-8 编码的老代码路径、会剥掉高位字节的系统仍然受益。反转义方向识别的命名引用覆盖日常集合——标记、标点、拉丁重音、货币符号——外加全部数字形式。",
          ],
        },
        {
          heading: "在本地转义用户内容",
          paragraphs: [
            "需要转义的文本通常是别人的话:客服消息、为分析爬取的评论串、要进邮件模板的用户简介。恰恰是这类内容不该经过 web 服务——而某些在线版本的这个工具确实会把文本 POST 到自己的后端。",
            "这里的一切都在浏览器 JavaScript 里跑:变换是纯字符操作,任何一步都不碰网络。粘贴客户的完整消息、整段评论转储、带个性化字段的模板;什么都不离开设备,什么都不记录,字符数读数让你随时知道转义把文本撑大了多少。",
            "跨上下文移动时配合 URL 编码一起用:HTML 实体保护标记上下文,百分号编码保护 URL 上下文,两者不能互相替代——查询串里的 HTML 转义 & 和百分号编码的 & 是两回事。两种转换都在本地、并排完成,上下文才不会搞混。",
          ],
        },
      ],
    },
    ja: {
      name: "HTML エスケープ / アンエスケープ",
      tagline:
        "HTML 実体を入力しながらリアルタイム変換:& < > 引用符を安全な参照へ。非 ASCII は数値実体も選べ、文字数の変化も表示します。",
      intro: [
        "HTML を壊す 5 文字(&、山括弧、両方の引用符)を名前付き実体へエンコード、または実体テキストを元の読める文字へ戻します。もうひとつのトグルで、アクセント付きや非ラテン文字を &#233; のような数値参照に切り替えられます。レガシーシステムやメールテンプレートに便利です。",
        "両方向が 1 つのパネルでライブに動き、文字数の変化を読み取りとして表示するため、二重エスケープも一目でわかります。",
      ],
      steps: [
        "HTML やエスケープ済みテキストを入力欄に貼り付けます。",
        "エスケープかアンエスケープを選択。入力すると即座に反映されます。",
        "&#233; のような非 ASCII 出力が必要なら数値実体を有効にします。",
        "結果をコピー — 文字数の読み取りで増減がわかります。",
      ],
      faqs: [
        {
          q: "一重引用符が &apos; ではなく &#39; になるのは?",
          a: "&apos; は XML や HTML5 では有効ですが HTML 4 には存在せず、古いパーサーやメールクライアントで誤扱いされることがあります。数値の &#39; ならどこでも安全です。",
        },
        {
          q: "非 ASCII 文字はエスケープが必要ですか?",
          a: "UTF-8 文書では通常不要で、ブラウザは é を直接扱えます。数値実体はレガシーな文字コード、メール配信、非 ASCII バイトを壊すシステムで役立ちます。",
        },
        {
          q: "アンエスケープはどの名前付き実体に対応?",
          a: "約 70 個のよく使う実体 — マークアップ(&amp;、&lt;、&gt;、&quot;、&apos;)、記号(&mdash;、&hellip;、&ldquo;)、ラテン文字のアクセントやシンボル(&copy;、&euro;)— に加え、10 進・16 進の数値参照すべてに対応します。",
        },
      ],
      deepDive: [
        {
          heading: "5 つの文字とアンパサンド優先の規則",
          paragraphs: [
            "HTML をテキストとして安全にするには 5 文字のエスケープで足ります。&amp;、&lt;、&gt;、&quot;、&#39; です。アンパサンドが筆頭なのは、すべての実体がそれで始まるからです。エスケープされていない & の後ろに文字が続くと、ブラウザは参照の解析を始めます。だからエスケープの順序も重要です。& は何よりも先に &amp; になり、そうしないと作った実体が再エスケープされて &amp;lt; になります。",
            "逆方向では順序が反転します。アンエスケープでは &amp; を最後に処理します。最初に処理すると &amp;lt; が &lt; になり、さらに本物の < になります。作者が見せるつもりのテキストが生きたタグになる。この順序の誤りひとつが二重アンエスケープ バグの全メカニズムで、ほとんどの正規表現ワンライナーがここを間違えます。",
            "引用符をエスケープすべきかはコンテキストが決めます。テキスト ノードでは引用符は無害で、<p>He said \"hi\"</p> は正当です。属性値では属性を区切る引用符をエスケープする必要があり、属性内の未エスケープ引用符は古典的な注入経路です。\" で終わる値は属性を閉じて新しい属性を始められます。属性では引用符をエスケープし、プレーン テキストでは読みやすさ優先でそのままにします。",
          ],
        },
        {
          heading: "実体、XSS、そして正直な境界線",
          paragraphs: [
            "エスケープは XSS 防御の最前線です。ユーザーが貼った <script> は &lt;script&gt; になり、実行ではなく可視テキストとして描画されます。まともなテンプレート エンジンはテキスト補間で自動的に行いますが、手動の文字列連結、JavaScript での + による HTML 組み立て、属性内へのユーザー コンテンツ描画は、今なお手作業での規律が要ります。",
            "境界線は正直に理解することです。エスケープは内容をマークアップとして不活性にするだけで、内容を信頼できるようにするのではありません。エスケープ済みの文書も、作者が書いたメッセージ——フィッシング文、誤導の指示——をそのまま表示します。エスケープが担保するのは正しさと注入安全性であって、内容の審査ではありません。",
            "&#233; や &#x2019; のような数値実体は、セキュリティではなく可搬性のためにあります。UTF-8 の世界ではほぼ不要ですが、レガシーなメール パイプライン、非 UTF-8 の古いコード経路、上位バイトを剥ぎ取るシステムではまだ役立ちます。アンエスケープ方向が認識する名前付き参照は日常セット——マークアップ、記号、ラテン アクセント、通貨記号——に加え、数値形式のすべてです。",
          ],
        },
        {
          heading: "ユーザー コンテンツをローカルでエスケープする",
          paragraphs: [
            "エスケープが必要なテキストは大抵、他人の言葉です。カスタマー サポートのメッセージ、分析用に収集したコメント欄、メール テンプレートに入れるユーザー プロフィール。まさにこの種のコンテンツを web サービスに経由させたくないものであり、この種のツールの一部オンライン版はテキストを自社バックエンドへ POST しています。",
            "ここではすべてがブラウザの JavaScript で動きます。変換は純粋な文字操作で、どのステップにもネットワークが関与しません。顧客のメッセージ全文、コメントのまとまり、パーソナライズ フィールド入りのテンプレートを丸ごと貼っても、端末の外には何も出ず、何も記録されず、文字数の読み取りでエスケープによる膨張もつかめます。",
            "コンテキストを跨ぐときは URL エンコードとペアにします。HTML 実体はマークアップ コンテキストを、パーセント エンコードは URL コンテキストを守り、互いの代用にはなりません。クエリ文字列内の HTML エスケープされた & とパーセント エンコードされた & は別物です。両変換をローカルで並べて行うのが、コンテキストを混同しないやり方です。",
          ],
        },
      ],
    },
    es: {
      name: "Escapar / desescapar HTML",
      tagline:
        "Escapa o desescapa entidades HTML en vivo mientras escribes: & < > y comillas se vuelven referencias seguras, con modo numérico opcional para no ASCII.",
      intro: [
        "Codifica los cinco caracteres que rompen el HTML — ampersand, ángulos y ambas comillas — en sus entidades nombradas, o convierte entidades de vuelta en texto legible. Un segundo interruptor cambia los caracteres acentuados y no latinos a referencias numéricas como &#233;, útil para sistemas heredados y plantillas de correo.",
        "Ambas direcciones funcionan en vivo en un mismo panel, y la lectura muestra cuánto cambió el número de caracteres, así que un doble escape roto se detecta de un vistazo.",
      ],
      steps: [
        "Pega HTML o texto escapado en el cuadro de entrada.",
        "Elige Escapar o Desescapar; ambos van en vivo mientras escribes.",
        "Activa las entidades numéricas si necesitas salida no ASCII como &#233;.",
        "Copia el resultado: la lectura de caracteres indica cuánto creció o se redujo.",
      ],
      faqs: [
        {
          q: "¿Por qué la comilla simple se escapa como &#39; y no &apos;?",
          a: "&apos; es válido en XML y HTML5 pero nunca formó parte de HTML 4, así que algunos parseadores antiguos y clientes de correo la manejan mal. El &#39; numérico funciona en todas partes.",
        },
        {
          q: "¿Hace falta escapar caracteres no ASCII?",
          a: "En documentos UTF-8 normalmente no: los navegadores procesan é directamente. Las entidades numéricas importan para codificaciones heredadas, correo o sistemas que estropean bytes no ASCII.",
        },
        {
          q: "¿Qué entidades nombradas reconoce al desescapar?",
          a: "Unas 70 habituales: de marcado (&amp;, &lt;, &gt;, &quot;, &apos;), puntuación (&mdash;, &hellip;, &ldquo;), acentos latinos y símbolos (&copy;, &euro;), además de todas las referencias numéricas decimales y hexadecimales.",
        },
      ],
      deepDive: [
        {
          heading: "Los cinco caracteres y la regla del ampersand primero",
          paragraphs: [
            "Para que HTML sea seguro como texto basta con escapar cinco caracteres: &amp;, &lt;, &gt;, &quot; y &#39;. El ampersand encabeza la lista porque toda entidad empieza con él — un & sin escapar seguido de letras es la señal con la que el navegador decide empezar a parsear una referencia. Por eso el orden importa al escapar: & debe convertirse en &amp; antes que nada, o las entidades que acabas de crear se re-escapan a &amp;lt;.",
            "En la dirección inversa el orden se invierte: al desescapar, &amp; se procesa al final, no al principio. Hacerlo primero convierte &amp;lt; en &lt; y luego en un < real — una etiqueta viva donde el autor quería texto visible. Ese único error de orden es todo el mecanismo tras los bugs de doble desescape, y es el fallo que cometen casi todos los one-liners con regex.",
            "El contexto decide qué hay que escapar. En nodos de texto las comillas son inofensivas — <p>He said “hi”</p> es válido. Dentro de valores de atributo, la comilla que delimita el atributo debe escaparse, y las comillas sin escapar en atributos son un vector de inyección clásico: un valor que termina en \" puede cerrar el atributo y abrir uno nuevo. Escapa comillas para atributos; déjalas en paz para texto plano si prefieres una salida legible.",
          ],
        },
        {
          heading: "Entidades, XSS y el límite dicho con honestidad",
          paragraphs: [
            "El escape es la primera línea de defensa contra XSS: un <script> pegado por un usuario se convierte en &lt;script&gt;, que se muestra como texto visible en lugar de ejecutarse. Todo motor de plantillas que se precie lo hace automáticamente en la interpolación de texto — pero la concatenación manual de cadenas, construir HTML en JavaScript con +, o renderizar contenido de usuario dentro de atributos siguen necesitando esa disciplina a mano.",
            "El límite hay que entenderlo con honestidad: escapar vuelve el contenido inerte como marcado, no hace que el contenido merezca confianza. Un documento escapado sigue mostrando lo que el autor escribió — texto de phishing, instrucciones engañosas. El escape sirve para la corrección y la seguridad frente a inyección, no para la revisión de contenidos.",
            "Las entidades numéricas como &#233; y &#x2019; existen por portabilidad, no por seguridad. En un mundo UTF-8 son casi innecesarias, pero las canalizaciones de correo heredadas, las rutas de código antiguas con codificaciones no UTF-8 y los sistemas que eliminan bytes altos siguen beneficiándose. Las referencias nombradas que reconoce el desescape cubren el conjunto cotidiano — marcado, puntuación, acentos latinos y símbolos de moneda — más todas las formas numéricas.",
          ],
        },
        {
          heading: "Escapar contenido de usuarios en local",
          paragraphs: [
            "El texto que necesitas escapar suele ser palabra de otros: mensajes de soporte al cliente, hilos de comentarios recogidos para análisis, biografías de usuarios destinadas a una plantilla de correo. Es exactamente la clase de contenido que no quieres hacer pasar por un servicio web — y algunas versiones online de esta herramienta sí hacen POST del texto a su backend.",
            "Todo aquí corre en el JavaScript de tu navegador: la transformación es una operación pura de caracteres sin ninguna implicación de red en ningún paso. Pega el mensaje completo de un cliente, un volcado entero de comentarios o una plantilla con campos de personalización; nada sale del dispositivo, nada se registra, y la lectura de caracteres te mantiene honesto sobre cuánto creció el texto al escaparlo.",
            "Combínalo con la codificación URL al cambiar de contexto: las entidades HTML protegen el contexto de marcado, el percent-encoding protege el contexto de URL, y no se sustituyen entre sí — un & escapado como entidad dentro de una cadena de consulta es cosa distinta de uno codificado en porcentaje. Hacer ambas conversiones en local, lado a lado, es como se mantiene claro el contexto.",
          ],
        },
      ],
    },
    pt: {
      name: "Escapar / reverter HTML",
      tagline:
        "Escape ou reverta entidades HTML ao vivo enquanto digita: & < > e aspas viram referências seguras, com modo numérico opcional para não ASCII.",
      intro: [
        "Codifique os cinco caracteres que quebram o HTML — e comercial, sinais de maior/menor e os dois estilos de aspas — em entidades nomeadas, ou cole entidades e volte ao texto legível. Um segundo interruptor converte acentuados e caracteres não latinos em referências numéricas como &#233;, útil em sistemas legados e templates de e-mail.",
        "Os dois sentidos rodam ao vivo no mesmo painel, e o contador mostra exatamente como o número de caracteres mudou, então um escape duplo quebrado aparece de relance.",
      ],
      steps: [
        "Cole HTML ou texto escapado na caixa de entrada.",
        "Escolha Escapar ou Reverter; ambos rodam ao vivo enquanto você digita.",
        "Ative entidades numéricas se precisar de saída não ASCII como &#233;.",
        "Copie o resultado — a contagem de caracteres mostra quanto cresceu ou encolheu.",
      ],
      faqs: [
        {
          q: "Por que a aspa simples vira &#39; em vez de &apos;?",
          a: "&apos; é válido em XML e HTML5, mas nunca fez parte do HTML 4, então alguns parsers antigos e clientes de e-mail lidam mal com ela. O &#39; numérico funciona em qualquer lugar.",
        },
        {
          q: "Preciso escapar caracteres não ASCII?",
          a: "Em documentos UTF-8, normalmente não — navegadores lidam com é direto. Entidades numéricas importam para codificações legadas, pipelines de e-mail ou sistemas que corrompem bytes não ASCII.",
        },
        {
          q: "Quais entidades nomeadas a reversão reconhece?",
          a: "Cerca de 70 comuns — de marcação (&amp;, &lt;, &gt;, &quot;, &apos;), pontuação (&mdash;, &hellip;, &ldquo;), acentos latinos e símbolos (&copy;, &euro;), além de todas as referências numéricas decimais e hexadecimais.",
        },
      ],
      deepDive: [
        {
          heading: "Os cinco caracteres e a regra do e-comercial primeiro",
          paragraphs: [
            "Para o HTML ser seguro como texto bastam cinco caracteres escapados: &amp;, &lt;, &gt;, &quot; e &#39;. O e-comercial encabeça a lista porque toda entidade começa com ele — um & sem escapar seguido de letras é o sinal pelo qual o navegador decide começar a parsear uma referência. Por isso a ordem importa ao escapar: & deve virar &amp; antes de qualquer coisa, ou as entidades que você acabou de criar são re-escapadas para &amp;lt;.",
            "No sentido reverso a ordem se inverte: ao reverter, &amp; é processado por último, não primeiro. Fazê-lo primeiro transforma &amp;lt; em &lt; e depois num < real — uma tag viva onde o autor queria texto visível. Esse único erro de ordem é todo o mecanismo por trás dos bugs de reversão dupla, e é o erro que quase todo one-liner com regex comete.",
            "O contexto decide o que precisa de escape. Em nós de texto, as aspas são inofensivas — <p>He said “hi”</p> é válido. Dentro de valores de atributo, a aspa que delimita o atributo deve ser escapada, e aspas sem escape em atributos são um vetor clássico de injeção: um valor terminando em \" pode fechar o atributo e abrir um novo. Escape aspas para atributos; deixe-as em paz em texto puro se preferir saída legível.",
          ],
        },
        {
          heading: "Entidades, XSS e o limite dito com honestidade",
          paragraphs: [
            "O escape é a primeira linha de defesa contra XSS: um <script> colado por um usuário vira &lt;script&gt;, que renderiza como texto visível em vez de executar. Todo motor de templates que se preza faz isso automaticamente na interpolação de texto — mas concatenação manual de strings, construir HTML em JavaScript com +, ou renderizar conteúdo de usuário dentro de atributos ainda exigem a disciplina à mão.",
            "O limite precisa ser entendido com honestidade: escapar torna o conteúdo inerte como marcação, não torna o conteúdo digno de confiança. Um documento escapado ainda exibe o que o autor escreveu — texto de phishing, instruções enganosas. Escape serve para correção e segurança contra injeção, não para revisão de conteúdo.",
            "Entidades numéricas como &#233; e &#x2019; existem por portabilidade, não por segurança. Numa era UTF-8 são quase desnecessárias, mas pipelines de e-mail legados, rotas de código antigas com codificações não UTF-8 e sistemas que descartam bytes altos ainda se beneficiam. As referências nomeadas que a reversão reconhece cobrem o conjunto do dia a dia — marcação, pontuação, acentos latinos e símbolos de moeda — mais todas as formas numéricas.",
          ],
        },
        {
          heading: "Escapar conteúdo de usuários localmente",
          paragraphs: [
            "O texto que você precisa escapar costuma ser palavras de outras pessoas: mensagens de suporte ao cliente, fios de comentários coletados para análise, bios de usuários destinadas a um template de e-mail. É exatamente a classe de conteúdo que você não quer passar por um serviço web — e algumas versões online desta ferramenta de fato fazem POST do texto ao backend delas.",
            "Tudo aqui roda no JavaScript do seu navegador: a transformação é uma operação pura de caracteres sem qualquer envolvimento de rede em qualquer passo. Cole a mensagem completa de um cliente, um dump inteiro de comentários ou um template com campos de personalização; nada sai do dispositivo, nada é registrado, e o contador de caracteres mantém você honesto sobre quanto o escape expandiu o texto.",
            "Combine com codificação de URL ao mudar de contexto: entidades HTML protegem o contexto de marcação, percent-encoding protege o contexto de URL, e um não substitui o outro — um & escapado como entidade dentro de uma query string é coisa diferente de um codificado em porcentagem. Fazer as duas conversões localmente, lado a lado, é como se mantém o contexto claro.",
          ],
        },
      ],
    },
  },
});
