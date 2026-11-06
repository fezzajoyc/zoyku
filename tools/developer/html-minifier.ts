import { DevCodeEngine } from "../_engines/dev-engine-code";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "html-minifier",
  category: "developer",
  icon: "crop",
  engine: { component: DevCodeEngine, props: { mode: "html-minify", showSize: true } },
  related: ["html-formatter", "css-minifier", "javascript-minifier", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "url-encoder", "url-decoder"],
  copy: {
    en: {
      name: "HTML Minifier",
      tagline:
        "Minify HTML in your browser: strip comments and collapse whitespace to cut page weight — a conservative cleaner that keeps your markup and rendering intact.",
      intro: [
        "Paste HTML and get a lighter version in real time. Comments are removed (IE conditional comments survive), runs of whitespace collapse to a single space, and whitespace between block-level tags is dropped entirely — while inline text spacing is preserved so words never fuse together.",
        "This is a deliberately conservative minifier: it does not rename classes, remove quotes or restructure anything. That makes it safe for email templates and legacy markup, and the live size readout shows exactly how many bytes you saved.",
      ],
      steps: [
        "Paste your HTML into the input box.",
        "The minified output appears instantly, with input/output sizes and the percentage saved.",
        "Copy the compact HTML or clear the input to minify another page.",
      ],
      faqs: [
        {
          q: "Can minification break my HTML?",
          a: "This tool takes the safe route: whitespace inside pre, textarea, script and style is untouched, whitespace-only gaps between inline elements become a single space, and only gaps between block-level tags are removed. Comments are dropped except IE conditional comments.",
        },
        {
          q: "Why is the saved percentage lower than other minifiers?",
          a: "Because it is conservative by design — it never merges text with tags or removes quotes. What it does remove (comments, indentation, inter-block whitespace) is always render-safe.",
        },
        {
          q: "Is anything uploaded?",
          a: "No. Everything runs locally in your browser; the page and its markup never leave your device.",
        },
      ],
      deepDive: [
        {
          heading: "Why whitespace in HTML is trickier than it looks",
          paragraphs: [
            "Collapsing whitespace sounds trivial, but HTML rendering rules make it subtle. Inside normal flow, any run of spaces, tabs and newlines renders as a single space — which is why a newline between two inline elements like <a> or <em> produces a visible gap, while a newline between two <div>s produces nothing. A minifier must respect this asymmetry: collapse inline gaps to one space, delete block-level gaps entirely.",
            "Some elements never forgive whitespace changes. Inside <pre>, <textarea>, <script> and <style>, whitespace is literal content — collapse it and your code sample loses its formatting, your textarea arrives with mangled defaults, your script or stylesheets can even break syntactically. This tool leaves those zones byte-for-byte untouched.",
            "This is why the savings percentage can be lower than aggressive minifiers report: every choice here errs toward keeping rendering identical rather than squeezing the last byte. What it does remove — author comments, indentation, dead space between blocks — was invisible in the browser anyway, so nothing you see can change.",
          ],
        },
        {
          heading: "What a conservative minifier refuses to do",
          paragraphs: [
            "Aggressive minifiers can also strip attribute quotes, reorder attributes, rewrite boolean attributes and merge adjacent text nodes. Each of those saves a few more bytes but raises the stakes: quote removal can collide with attribute values containing spaces, aggressive collapsing can change which text node boundaries CSS or scripts depend on. This tool deliberately does none of it.",
            "That conservatism pays off in the domains where HTML minification is most used by hand: email templates and legacy CMS content. Email clients are notoriously inconsistent in what HTML they accept, and older templates often rely on markup quirks that a restructuring minifier would silently break. A minifier that only removes provably invisible bytes is safe to run on markup you cannot fully test.",
            "Comments deserve a special note. Author comments are safe to delete, but some comments are live code: IE conditional comments, server-side templating markers, license notices. Deleting all of them changes behavior. This tool removes regular comments but preserves conditional comments, which is the single most common way naive minifiers break real pages.",
          ],
        },
        {
          heading: "Minify on-device, especially for private markup",
          paragraphs: [
            "The HTML you minify is often not public: unreleased landing pages, internal dashboards, email templates with customer merge fields, staging markup with comments about pricing that has not shipped. Uploading all of that to a web service just to strip whitespace is an avoidable risk — many online minifiers do POST the document to their server.",
            "Here the whole pipeline runs in your browser: parsing, transformation and the size readout all happen in local JavaScript, with no network involved. Proprietary templates and internal pages can be minified without leaving your machine, and the tool works offline — useful when you are polishing a page before it has anywhere to live.",
            "For real deployments, pair this with the CSS and JavaScript minifiers for the biggest wins, then rely on transfer compression (gzip or brotli at the server) which dwarfs what any minifier saves. The minifier's job is to remove bytes the wire format cannot remove; the server's compression handles the rest.",
          ],
        },
      ],
    },
    zh: {
      name: "HTML 压缩",
      tagline: "在浏览器里压缩 HTML:去注释、折叠空白,给页面减重——保守策略,渲染效果分毫不差,实时显示节省比例。",
      intro: [
        "粘贴 HTML,实时得到更轻的版本。注释会被移除(IE 条件注释保留),连续空白折叠成单个空格,块级标签之间的空白直接删除——而行内文本之间的空格会保留,单词绝不会粘连。",
        "这是刻意保守的压缩器:不改类名、不去引号、不重组任何结构。因此对邮件模板和老页面都很安全,实时的大小读数会告诉你省了多少字节。",
      ],
      steps: [
        "把 HTML 粘贴到输入框。",
        "压缩结果即时出现,并显示输入/输出大小和节省百分比。",
        "复制压缩后的 HTML,或清空输入压缩下一个页面。",
      ],
      faqs: [
        {
          q: "压缩会破坏我的 HTML 吗?",
          a: "本工具走安全路线:pre、textarea、script、style 内部的空白原样保留,行内元素之间的纯空白折叠为一个空格,只有块级标签之间的空白会删除;注释全部移除,IE 条件注释除外。",
        },
        {
          q: "为什么节省比例比别的压缩器低?",
          a: "因为它刻意保守——不会把文本和标签粘在一起,也不删引号。但它删掉的部分(注释、缩进、块级标签间空白)永远不影响渲染。",
        },
        {
          q: "会上传任何内容吗?",
          a: "不会。一切都在浏览器本地运行,页面和标记不会离开你的设备。",
        },
      ],
      deepDive: [
        {
          heading: "HTML 里的空白为什么比看上去复杂",
          paragraphs: [
            "折叠空白听着简单,HTML 的渲染规则却让它颇为微妙。在正常排版流里,连续的空格、制表符、换行都渲染成一个空格——所以两个行内元素(如 <a> 或 <em>)之间的换行会产生看得见的间隙,而两个 <div> 之间的换行什么都不会产生。压缩器必须尊重这种不对称:行内间隙折叠成一个空格,块级间隙彻底删除。",
            "有些元素绝不原谅空白改动。<pre>、<textarea>、<script>、<style> 内部的空白就是字面内容——折叠它,你的代码示例就丢了格式,textarea 的默认值会变乱,script 和样式表甚至可能直接语法报错。本工具对这些区域逐字节原样保留。",
            "这也是节省百分比比激进压缩器低的原因:这里的每个决策都偏向渲染结果完全一致,而不是榨干最后一个字节。它删掉的部分——作者注释、缩进、块与块之间的死空白——本来在浏览器里就不可见,所以你看到的一切都不会变。",
          ],
        },
        {
          heading: "保守压缩器拒绝做哪些事",
          paragraphs: [
            "激进的压缩器还会去掉属性引号、重排属性、改写布尔属性、合并相邻文本节点。每项都省下几个字节,风险也跟着上升:去引号可能撞上含空格的属性值,过度折叠可能改变 CSS 或脚本依赖的文本节点边界。本工具刻意一项都不做。",
            "这种保守在手工压缩 HTML 最常用的场景里得到回报:邮件模板和老旧 CMS 内容。邮件客户端接受什么 HTML 出了名的不一致,老模板常常依赖标记上的怪癖,重组型压缩器会悄悄把它们弄坏。一个只删除可证明不可见字节的压缩器,对没法完整测试的标记也安全。",
            "注释值得单独说。作者注释可以删,但有些注释是活的代码:IE 条件注释、服务端模板标记、版权声明。全删会改变行为。本工具删除普通注释但保留条件注释——不成熟压缩器弄坏真实页面,最常见的就是这一条。",
          ],
        },
        {
          heading: "在本机压缩,尤其面对不公开的标记",
          paragraphs: [
            "你压缩的 HTML 往往不是公开内容:未上线的落地页、内部后台、带客户合并字段的邮件模板、还有没发布的价格备注的预发标记。为了去点空白把这一切上传到某个 web 服务,是完全可避免的风险——不少在线压缩器确实会把文档 POST 到自己的服务器。",
            "这里的整条流水线都在浏览器里跑:解析、转换、大小读数全部是本地 JavaScript,不涉及任何网络。专有模板和内部页面不出机器就能压缩,工具离线可用——页面还没找到归宿、正在打磨时尤其有用。",
            "真实部署时,配合 CSS 和 JavaScript 压缩器拿最大收益,再依赖服务端的传输压缩(gzip 或 brotli),后者省下的字节远超任何压缩器。压缩器的职责是去掉传输格式本身去不掉的字节,剩下的交给服务端压缩。",
          ],
        },
      ],
    },
    ja: {
      name: "HTML ミニファイアー",
      tagline:
        "HTML をブラウザ内で圧縮:コメント除去と空白の折り畳みでページを軽量化。レンダリングを崩さない保守的な手法で、節約率も表示します。",
      intro: [
        "HTML を貼り付けると、リアルタイムで軽量版が得られます。コメントは削除され(IE 条件コメントは保持)、連続する空白は 1 つに折り畳まれ、ブロックレベルタグ間の空白は完全に除去されます。インラインテキスト間の空白は保持されるため、単語がくっつくことはありません。",
        "意図的に保守的なミニファイアーです。クラス名の変更・引用符の削除・構造の組み替えは一切しません。メールテンプレートやレガシーなマークアップにも安全で、リアルタイムのサイズ表示で節約バイト数が分かります。",
      ],
      steps: [
        "HTML を入力欄に貼り付けます。",
        "圧縮結果が即座に表示され、入力/出力サイズと節約率も出ます。",
        "圧縮後の HTML をコピーするか、入力をクリアして次のページを圧縮します。",
      ],
      faqs: [
        {
          q: "圧縮で HTML が壊れることはありますか?",
          a: "このツールは安全側に倒しています。pre・textarea・script・style の内部は無加工、インライン要素間の空白のみのギャップは 1 スペースに、削除されるのはブロックレベルタグ間だけです。コメントは IE 条件コメントを除き削除します。",
        },
        {
          q: "節約率が他のミニファイアーより低いのはなぜ?",
          a: "設計として保守的だからです。テキストとタグの結合や引用符の削除はしません。削除するもの(コメント・インデント・ブロック間の空白)は常にレンダリング上安全です。",
        },
        {
          q: "何かアップロードされますか?",
          a: "いいえ。すべてブラウザ内でローカルに動作し、ページとマークアップは端末の外に出ません。",
        },
      ],
      deepDive: [
        {
          heading: "HTML の空白は見た目より複雑",
          paragraphs: [
            "空白の折り畳みは単純に聞こえますが、HTML のレンダリング規則がそれを微妙にします。通常フローでは、空白・タブ・改行の連なりは 1 個のスペースとして描画されます。だから <a> や <em> のようなインライン要素同士の改行には目に見える隙間ができ、2 つの <div> の間の改行には何もできません。ミニファイアーはこの非対称を尊重しなければなりません。インライン間は 1 スペースに折り畳み、ブロック間は完全に除去します。",
            "空白の変化を決して許さない要素もあります。<pre>・<textarea>・<script>・<style> の内部では空白そのものがコンテンツです。折り畳めばコード例は整形を失い、textarea の既定値は崩れ、script やスタイルシートは構文エラーになり得ます。このツールはこれらの領域をバイト単位で無加工のまま保ちます。",
            "節約率が積極的なミニファイアーより低く見える理由もここにあります。ここでの選択はすべて「レンダリングを同一に保つ」側に倒しています。削除されるもの——作者コメント、インデント、ブロック間のデッドスペース——はブラウザでは元から見えません。見えているものは何も変わりません。",
          ],
        },
        {
          heading: "保守的なミニファイアーが拒否すること",
          paragraphs: [
            "積極的なミニファイアーは属性の引用符除去、属性の並べ替え、ブール属性の書き換え、隣接テキストノードの結合まで行います。それぞれ数バイト余計に節約できますが、リスクも上がります。引用符の除去は空白入り属性値と衝突しうるし、過剰な折り畳みは CSS やスクリプトが依存するテキストノードの境界を変えうる。このツールは意図的にどれもやりません。",
            "この保守性が報われるのは、HTML 圧縮を手作業で行う場面の中心、つまりメールテンプレートとレガシー CMS コンテンツです。メールクライアントが受け付ける HTML は有名に一貫せず、古いテンプレートは構造組み替え型ミニファイアーが黙って壊すマークアップの癖に依存しがちです。証明可能に不可視なバイトだけを削除するミニファイアーなら、十分にテストできないマークアップにも安全です。",
            "コメントには特別な注意が要ります。作者コメントは消して安全ですが、一部のコメントは生きたコードです。IE 条件コメント、サーバーサイド テンプレートのマーカー、ライセンス表記。全部削除すると挙動が変わります。このツールは通常コメントを削除し条件コメントは保持します。素朴なミニファイアーが実ページを壊す原因の最たるものがこれです。",
          ],
        },
        {
          heading: "端末内で圧縮する、特に非公開のマークアップなら",
          paragraphs: [
            "圧縮する HTML は公開物でないことが多いです。未公開のランディング ページ、社内ダッシュボード、顧客のマージ フィールド入りのメール テンプレート、未出の価格についてのコメントが残るステージングのマークアップ。空白を落とすためだけにそれを web サービスへアップロードするのは避けられるリスクで、実際多くのオンライン ミニファイアーは文書をサーバーへ POST しています。",
            "ここではパイプライン全体がブラウザ内で動きます。解析・変換・サイズ表示はすべてローカルの JavaScript で、ネットワークは関与しません。独自テンプレートや内部ページもマシンから出さずに圧縮でき、オフラインでも使えます。ページの置き場所が決まる前の仕上げ段階で特に有用です。",
            "本番配信では CSS・JavaScript ミニファイアーと組み合わせて最大の削減を狙い、さらにサーバーの転送圧縮(gzip または brotli)に頼りましょう。後者が節約するバイトはミニファイアーの比ではありません。ミニファイアーの役割は転送形式が落とせないバイトを落とすことで、残りはサーバー側の圧縮が担います。",
          ],
        },
      ],
    },
    es: {
      name: "Minificador HTML",
      tagline:
        "Minifica HTML en tu navegador: elimina comentarios y colapsa espacios para reducir el peso de la página, sin romper tu marcado ni el renderizado.",
      intro: [
        "Pega HTML y obtén en tiempo real una versión más ligera. Los comentarios se eliminan (los condicionales de IE sobreviven), las series de espacios se colapsan a uno y el espacio entre etiquetas de bloque desaparece — mientras que el espacio del texto en línea se conserva y las palabras nunca se pegan.",
        "Es un minificador deliberadamente conservador: no renombra clases, no quita comillas ni reestructura nada. Eso lo hace seguro para plantillas de email y marcado heredado, y el indicador de tamaño muestra cuántos bytes has ahorrado.",
      ],
      steps: [
        "Pega tu HTML en el cuadro de entrada.",
        "La salida minificada aparece al instante, con tamaños de entrada/salida y el porcentaje ahorrado.",
        "Copia el HTML compacto o borra la entrada para minificar otra página.",
      ],
      faqs: [
        {
          q: "¿Puede la minificación romper mi HTML?",
          a: "Esta herramienta va por lo seguro: el espacio dentro de pre, textarea, script y style no se toca, los huecos entre elementos en línea se reducen a un espacio y solo se eliminan los huecos entre etiquetas de bloque. Los comentarios desaparecen salvo los condicionales de IE.",
        },
        {
          q: "¿Por qué el ahorro es menor que en otros minificadores?",
          a: "Porque es conservador a propósito: nunca une texto con etiquetas ni quita comillas. Lo que elimina (comentarios, indentación, espacio entre bloques) siempre es seguro para el renderizado.",
        },
        {
          q: "¿Se sube algo?",
          a: "No. Todo corre localmente en tu navegador; la página y su marcado nunca salen de tu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué el espacio en blanco en HTML es más sutil de lo que parece",
          paragraphs: [
            "Colapsar espacios suena trivial, pero las reglas de renderizado de HTML lo hacen delicado. En el flujo normal, cualquier serie de espacios, tabulaciones y saltos de línea se renderiza como un único espacio — por eso un salto entre dos elementos en línea como <a> o <em> produce un hueco visible, mientras que un salto entre dos <div> no produce nada. El minificador debe respetar esa asimetría: colapsar los huecos en línea a un espacio y eliminar del todo los huecos entre bloques.",
            "Algunos elementos nunca perdonan un cambio de espacio en blanco. Dentro de <pre>, <textarea>, <script> y <style>, el espacio es contenido literal — colapsarlo hace que tu ejemplo de código pierda el formato, que el textarea llegue con valores por defecto revueltos, y tus scripts u hojas de estilo pueden incluso romperse sintácticamente. Esta herramienta deja esas zonas intactas byte a byte.",
            "Por eso el porcentaje ahorrado puede ser menor que el de minificadores agresivos: cada decisión aquí se inclina por mantener el renderizado idéntico antes que exprimir el último byte. Lo que elimina — comentarios del autor, indentación, espacio muerto entre bloques — ya era invisible en el navegador, así que nada de lo que ves puede cambiar.",
          ],
        },
        {
          heading: "Lo que un minificador conservador se niega a hacer",
          paragraphs: [
            "Los minificadores agresivos también quitan comillas de atributos, reordenan atributos, reescriben atributos booleanos y fusionan nodos de texto adyacentes. Cada cosa ahorra unos bytes más, pero sube el riesgo: quitar comillas puede chocar con valores de atributo que contienen espacios, y el colapso agresivo puede alterar los límites de nodos de texto de los que dependen CSS o scripts. Esta herramienta deliberadamente no hace nada de eso.",
            "Ese conservadurismo da sus frutos donde la minificación manual de HTML más se usa: plantillas de email y contenido heredado de CMS. Los clientes de correo son notoriamente inconsistentes en qué HTML aceptan, y las plantillas antiguas suelen depender de peculiaridades del marcado que un minificador reestructurador rompería en silencio. Un minificador que solo elimina bytes demostrablemente invisibles es seguro incluso sobre marcado que no puedes probar a fondo.",
            "Los comentarios merecen una mención aparte. Los comentarios del autor se pueden borrar sin riesgo, pero algunos comentarios son código vivo: condicionales de IE, marcadores de plantillas del lado del servidor, avisos de licencia. Borrarlos todos cambia el comportamiento. Esta herramienta elimina los comentarios normales pero conserva los condicionales — la forma más habitual en que los minificadores ingenuos rompen páginas reales.",
          ],
        },
        {
          heading: "Minifica en tu equipo, sobre todo con marcado privado",
          paragraphs: [
            "El HTML que minificas a menudo no es público: páginas de aterrizaje sin publicar, paneles internos, plantillas de email con campos de combinación de clientes, marcado de staging con comentarios sobre precios que aún no salieron. Subir todo eso a un servicio web solo para quitar espacios es un riesgo evitable — muchos minificadores online sí hacen POST del documento a su servidor.",
            "Aquí todo el pipeline corre en tu navegador: parseo, transformación y la lectura de tamaño suceden en JavaScript local, sin red de por medio. Plantillas propietarias y páginas internas se minifican sin salir de tu máquina, y la herramienta funciona sin conexión — útil cuando estás puliendo una página que todavía no tiene dónde vivir.",
            "Para despliegues reales, combínala con los minificadores de CSS y JavaScript para las mayores ganancias, y confía en la compresión de transferencia (gzip o brotli en el servidor), que deja pequeña a cualquier minificador. El trabajo del minificador es quitar los bytes que el formato de transmisión no puede quitar; el resto lo maneja la compresión del servidor.",
          ],
        },
      ],
    },
    pt: {
      name: "Minificador HTML",
      tagline:
        "Minifique HTML no navegador: remova comentários e colapse espaços para reduzir o peso da página — de forma conservadora, sem quebrar a renderização.",
      intro: [
        "Cole HTML e receba em tempo real uma versão mais leve. Comentários são removidos (condicionais do IE sobrevivem), sequências de espaços colapsam para um único espaço, e o espaço entre tags de bloco é eliminado — enquanto o espaço do texto inline é preservado, então palavras nunca se fundem.",
        "É um minificador deliberadamente conservador: não renomeia classes, não remove aspas nem reestrutura nada. Isso o torna seguro para templates de e-mail e marcação legada, e o indicador de tamanho mostra exatamente quantos bytes você economizou.",
      ],
      steps: [
        "Cole seu HTML na caixa de entrada.",
        "A saída minificada aparece na hora, com tamanhos de entrada/saída e a porcentagem economizada.",
        "Copie o HTML compacto ou limpe a entrada para minificar outra página.",
      ],
      faqs: [
        {
          q: "A minificação pode quebrar meu HTML?",
          a: "Esta ferramenta segue o caminho seguro: espaço dentro de pre, textarea, script e style não é tocado, lacunas entre elementos inline viram um único espaço, e só as lacunas entre tags de bloco são removidas. Comentários saem, exceto condicionais do IE.",
        },
        {
          q: "Por que a economia é menor que em outros minificadores?",
          a: "Porque ela é conservadora por princípio — nunca funde texto com tags nem remove aspas. O que ela remove (comentários, indentação, espaço entre blocos) é sempre seguro para a renderização.",
        },
        {
          q: "Algo é enviado para a internet?",
          a: "Não. Tudo roda localmente no seu navegador; a página e sua marcação nunca saem do seu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Por que o espaço em branco em HTML é mais sutil do que parece",
          paragraphs: [
            "Colapsar espaços parece trivial, mas as regras de renderização do HTML tornam a coisa delicada. No fluxo normal, qualquer sequência de espaços, tabulações e quebras de linha renderiza como um único espaço — por isso uma quebra entre dois elementos inline como <a> ou <em> produz uma folga visível, enquanto uma quebra entre dois <div> não produz nada. O minificador precisa respeitar essa assimetria: colapsar folgas inline para um espaço e eliminar de vez as folgas entre blocos.",
            "Alguns elementos nunca perdoam mudança de espaço em branco. Dentro de <pre>, <textarea>, <script> e <style>, o espaço é conteúdo literal — colapsar faz seu exemplo de código perder a formatação, o textarea chegar com valores padrão bagunçados, e seus scripts ou folhas de estilo podem até quebrar sintaticamente. Esta ferramenta deixa essas zonas intactas, byte a byte.",
            "Por isso a porcentagem economizada pode ser menor que a de minificadores agressivos: cada decisão aqui pende para manter a renderização idêntica em vez de espremer o último byte. O que ela remove — comentários do autor, indentação, espaço morto entre blocos — já era invisível no navegador, então nada do que você vê pode mudar.",
          ],
        },
        {
          heading: "O que um minificador conservador se recusa a fazer",
          paragraphs: [
            "Minificadores agressivos também removem aspas de atributos, reordenam atributos, reescrevem atributos booleanos e fundem nós de texto adjacentes. Cada coisa economiza mais uns bytes, mas eleva o risco: remover aspas pode colidir com valores de atributo contendo espaços, e o colapso agressivo pode alterar as fronteiras de nós de texto de que CSS e scripts dependem. Esta ferramenta deliberadamente não faz nada disso.",
            "Esse conservadorismo compensa onde a minificação manual de HTML mais acontece: templates de e-mail e conteúdo legado de CMS. Clientes de e-mail são notoriamente inconsistentes quanto ao HTML que aceitam, e templates antigos costumam depender de peculiaridades de marcação que um minificador reestruturador quebraria em silêncio. Um minificador que só remove bytes comprovadamente invisíveis é seguro até sobre marcação que você não consegue testar a fundo.",
            "Comentários merecem nota à parte. Comentários do autor podem ser apagados sem risco, mas alguns comentários são código vivo: condicionais do IE, marcadores de templates do lado do servidor, avisos de licença. Apagar todos muda o comportamento. Esta ferramenta remove comentários comuns mas preserva os condicionais — a causa mais comum de minificadores ingênuos quebrarem páginas reais.",
          ],
        },
        {
          heading: "Minifique no aparelho, sobretudo com marcação privada",
          paragraphs: [
            "O HTML que você minifica muitas vezes não é público: páginas de conversão não publicadas, painéis internos, templates de e-mail com campos de mesclagem de clientes, marcação de staging com comentários sobre preços que ainda não saíram. Subir tudo isso a um serviço web só para tirar espaços é um risco evitável — muitos minificadores online realmente fazem POST do documento ao servidor deles.",
            "Aqui todo o pipeline roda no seu navegador: parse, transformação e a leitura de tamanho acontecem em JavaScript local, sem rede envolvida. Templates proprietários e páginas internas são minificados sem sair da sua máquina, e a ferramenta funciona offline — útil quando você está polindo uma página que ainda não tem onde morar.",
            "Para deployments reais, combine com os minificadores de CSS e JavaScript para as maiores economias, e conte com a compressão de transferência (gzip ou brotli no servidor), que faz a economia de qualquer minificador parecer pequena. O trabalho do minificador é tirar os bytes que o formato de transmissão não consegue tirar; o resto fica com a compressão do servidor.",
          ],
        },
      ],
    },
  },
});
