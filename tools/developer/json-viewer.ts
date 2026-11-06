import { DevEngineJsonViewer } from "../_engines/dev-engine-json-viewer";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "json-viewer",
  category: "developer",
  icon: "code",
  engine: { component: DevEngineJsonViewer },
  related: ["json-formatter", "json-validator", "json-path-query", "json-minifier", "json-diff", "json-to-typescript", "json-to-csv", "url-parser"],
  copy: {
    en: {
      name: "JSON Viewer",
      tagline: "Paste JSON and explore it as a collapsible tree with typed, color-coded values beside the formatted source — instant, private, in your browser.",
      intro: ["Nested API responses and config files are hard to read as raw text. This viewer parses your JSON and renders a collapsible tree on the left — expand or fold any object or array — while the right pane shows the formatted raw document. Values are typed and color-coded: strings green, numbers blue, booleans amber, nulls gray, with long strings truncated at 60 characters so deep structures stay scannable.",
        "Invalid input is caught immediately with a line and column number, so a stray comma never costs you minutes of hunting. Everything parses locally in your browser; nothing is uploaded."],
      steps: ["Paste your JSON into the input box.", "Browse the collapsible tree — click the ▾/▸ arrows to fold or expand any object or array.", "Read the formatted raw JSON on the right and copy it with one click."],
      faqs: [
        { q: "How do I find where my JSON is broken?", a: "When parsing fails, the error shows the exact line and column, e.g. “line 3, column 12: Unexpected token }”. Fix that spot and the tree renders instantly — most errors are a trailing comma, an unquoted key or a missing bracket." },
        { q: "Can it handle large documents?", a: "Yes for typical API payloads and config files — tens of thousands of nodes render fine. The tree truncates long string values to 60 characters in display only; the raw pane and copy button always keep the full data." },
        { q: "Does my data leave my device?", a: "No. Parsing and rendering happen entirely in your browser's memory. Nothing is sent to any server, so it is safe for internal API responses and configuration." },
      ],
      deepDive: [
        {
          heading: "What a tree view changes about reading JSON",
          paragraphs: [
            "Raw JSON is optimized for machines: it packs structure into punctuation and whitespace, so a deeply nested payload reads as a wall of brackets. A tree view inverts that — each object and array becomes a node you can fold, so the top level answers “what does this response contain?” in one glance and detail appears only where you expand. For a 200-line API response, that is the difference between scrolling and navigating.",
            "Color-coding by type is not decoration. In real payloads the bugs cluster at the boundaries: a number that arrived as a string (\"42\"), a false that is actually the string \"false\", a null that should have been an object. When strings, numbers, booleans and null each have their own color, these anomalies pop out visually — you can scan a whole response for suspicious types without reading a single key name.",
            "Long-string truncation is the third readability trick. Base64 blobs, HTML fragments and long descriptions routinely stretch a single value across hundreds of characters and bury the structure. Truncating display at 60 characters keeps every value on one line — while the raw pane and the copy button always carry the full text, so nothing is lost. The truncation is presentation, not data.",
          ],
        },
        {
          heading: "Reading parse errors: line, column and the usual suspects",
          paragraphs: [
            "JSON is unforgiving in specific, repetitive ways, and the parser errors map to them. The classic failures: a trailing comma after the last element of an object or array (legal in JavaScript literals, illegal in JSON), unquoted or single-quoted keys, single quotes around strings, a missing bracket that only surfaces hundreds of lines later, and comments — // is fine in JS, never valid in JSON. Knowing this list turns most error messages into one-second fixes.",
            "Line and column numbers matter because the failure point is often far from the error point: a missing closing brace at line 10 may only be reported when the parser hits a contradictory token at line 40. Fix the first reported error and re-parse rather than chasing everything at once — parsers recover badly from cascading mistakes, and the first message is the trustworthy one.",
            "This viewer reports the error with the parser's own message plus position, then re-renders the tree the instant the input becomes valid. The loop — paste, see error, fix, see tree — is fast enough that debugging a malformed config file beats switching to an editor with a JSON linter for a one-off check.",
          ],
        },
        {
          heading: "Local parsing, and when to reach for a different tool",
          paragraphs: [
            "Everything runs in your browser: parsing, tree construction and rendering happen in JavaScript on your device, and nothing is transmitted or stored. This matters most for the payloads you actually paste — authenticated API responses, internal configuration, customer records pulled from a database. Sending those to an online JSON service to be pretty-printed creates a server-side copy you neither control nor need.",
            "Scale is the honest boundary. Tens of thousands of nodes render fine; a multi-hundred-megabyte export will strain the browser tab no matter what viewer renders it, and a streaming or command-line tool is the better answer there. For the everyday range — API responses, webhook payloads, config files — a browser tree is the fastest path from “what is in this?” to an answer.",
            "Pair it with the surrounding tools for the next steps: the formatter normalizes indentation before you commit a fix, the validator confirms strict conformance, and json-path-query extracts a subtree without hunting through the tree by hand. The viewer is the reading tool; the others do the writing and querying.",
          ],
        },
      ],
    },
    zh: {
      name: "JSON 查看器",
      tagline: "粘贴 JSON 即可生成可折叠树形视图,值按类型着色、长值自动截断,右侧同步显示格式化原文——浏览器本地即时处理。",
      intro: ["嵌套的 API 响应和配置文件直接读原文很费劲。本工具把 JSON 解析成左侧的可折叠树——任意对象或数组都能展开、折叠——右侧同步显示格式化后的原始文档。值按类型着色:字符串绿色、数字蓝色、布尔琥珀色、null 灰色,超长字符串在 60 字符处截断,深层结构也一眼可扫。",
        "输入不合法时立即报错并给出精确的行号和列号,一个多余的逗号不再让你翻找半天。全部在浏览器本地解析,不上传任何数据。"],
      steps: ["把 JSON 粘贴进输入框。", "浏览可折叠树——点击 ▾/▸ 箭头折叠或展开任意对象、数组。", "在右侧查看格式化原文,一键复制。"],
      faqs: [
        { q: "怎么定位 JSON 哪里错了?", a: "解析失败时会显示精确的行号和列号,例如「line 3, column 12: Unexpected token }」。修掉那处错误树会立即渲染出来——多数错误是多余逗号、键没加引号或缺括号。" },
        { q: "大文档能处理吗?", a: "常规 API 载荷和配置文件都没问题,几万个节点也能流畅渲染。树中长字符串仅在显示时截断到 60 字符,右侧原文和复制按钮始终保留完整数据。" },
        { q: "数据会离开我的设备吗?", a: "不会。解析和渲染完全在浏览器内存中完成,不向任何服务器发送数据,内网 API 响应和内部配置也可以放心粘贴。" },
      ],
      deepDive: [
        {
          heading: "树形视图改变了什么",
          paragraphs: [
            "原始 JSON 是为机器优化的:结构全压在标点和空白里,深层嵌套的载荷读起来就是一面括号墙。树形视图把这件事反过来——每个对象和数组都变成可折叠的节点,顶层一眼回答“这个响应里有什么”,细节只在你展开的地方出现。面对一份两百行的 API 响应,这是“滚动”和“导航”的区别。",
            "按类型着色不是装饰。真实载荷里的错误集中在类型边界上:数字被当成字符串送来(\"42\")、false 实际是字符串 \"false\"、本该是对象的字段变成了 null。字符串、数字、布尔、null 各有专属颜色后,这类异常一眼就能扫出来——不用逐个读键名,就能把整个响应的可疑类型过一遍。",
            "长字符串截断是第三个可读性技巧。Base64 大块、HTML 片段、超长描述动辄把一个值拖出几百个字符,把结构埋掉。显示层在 60 字符处截断,让每个值都保持单行——而右侧原文和复制按钮始终携带完整文本,信息零丢失。截断只发生在展示层,不在数据层。",
          ],
        },
        {
          heading: "读懂解析错误:行号、列号和惯犯清单",
          paragraphs: [
            "JSON 的错误方式固定得惊人,解析器报错也正好对应它们。惯犯名单:对象或数组最后一项后面多一个逗号(JavaScript 字面量合法,JSON 非法)、键没加引号或用了单引号、字符串用单引号包、漏掉的括号直到几百行后才爆发、注释——// 在 JS 里没问题,JSON 里永远非法。记住这张清单,多数报错一秒就能修。",
            "行号和列号重要,是因为出错位置往往离病因很远:第 10 行少一个闭合括号,可能要到第 40 行撞上矛盾 token 才被报告。修掉第一条报错就重新解析,别想着一次全修——解析器对级联错误恢复很差,第一条消息才是可信的那条。",
            "本工具用解析器自己的报错加位置来提示,输入一旦合法,树立即重新渲染。粘贴、看报错、修复、看到树——这个循环足够快,调试一个格式坏掉的配置文件时,比专门切换到带 JSON linter 的编辑器更快。",
          ],
        },
        {
          heading: "本地解析,以及什么时候该换工具",
          paragraphs: [
            "一切都在浏览器里完成:解析、建树、渲染都在你设备上的 JavaScript 里跑,不传输、不存储。这一点对你真正会粘贴的载荷最关键——带鉴权的 API 响应、内部配置、从数据库拉出来的客户记录。为了让它们好看一点就把数据交给在线 JSON 服务,等于在别人的服务器上留下一个你既管不到也不需要的副本。",
            "规模是诚实的边界。几万个节点没问题;几百兆的导出文件无论用什么视图渲染都会拖垮浏览器标签页,那种场景该换流式或命令行工具。日常范围——API 响应、webhook 载荷、配置文件——浏览器树形视图是从“这里面有什么?”到答案的最快路径。",
            "配上周边工具可以走得更远:格式化器在提交修复前统一缩进,校验器确认严格合规,json-path-query 不用手翻树就抽出子树。查看器负责“读”,其余的负责“写”和“查”。",
          ],
        },
      ],
    },
    ja: {
      name: "JSON ビューアー",
      tagline: "JSON を貼り付けると折りたたみ可能なツリーで表示。値は型ごとに色分け、長い文字列は切り詰め。整形済み原文も並べて表示します。",
      intro: ["ネストした API レスポンスや設定ファイルを生テキストのまま読むのは大変です。このビューアーは JSON を解析し、左側に折りたたみ可能なツリーを描画します。任意のオブジェクトや配列を展開・折りたたみ可能で、右側には整形済みの原文を表示。値は型ごとに色分けされ(文字列は緑、数値は青、真偽値は琥珀色、null は灰色)、長い文字列は 60 文字で切り詰められるため、深い構造も見渡せます。",
        "不正な入力は即座に行番号と列番号付きで検出されるため、余分なカンマを探して何分も無駄にしません。解析はすべてブラウザ内で行われ、データは送信されません。"],
      steps: ["入力欄に JSON を貼り付けます。", "折りたたみツリーを操作 — ▾/▸ 矢印でオブジェクトや配列を展開・折りたたみします。", "右側の整形済み JSON を確認し、ワンクリックでコピーします。"],
      faqs: [
        { q: "JSON のどこが壊れているか調べるには?", a: "解析に失敗すると「line 3, column 12: Unexpected token }」のように行と列を正確に表示します。その箇所を直せばツリーはすぐ描画されます。原因の多くは末尾カンマ、引用符のないキー、閉じ忘れの括弧です。" },
        { q: "大きなドキュメントも扱えますか?", a: "一般的な API ペイロードや設定ファイルなら問題なく、数万ノードもスムーズに表示できます。ツリー上の長い文字列は表示だけ 60 文字に切り詰めますが、右側の原文とコピーは常に完全なデータを保持します。" },
        { q: "データは端末の外に出ますか?", a: "いいえ。解析も描画もブラウザのメモリ内だけで完結し、サーバーには何も送信しません。社内 API のレスポンスや設定も安心して貼り付けられます。" },
      ],
      deepDive: [
        {
          heading: "ツリー表示が変えるもの",
          paragraphs: [
            "生の JSON は機械向けの形式です。構造が句読点と空白に押し込められており、深くネストしたペイロードは括弧の壁に見えます。ツリー表示はこれを逆転します。オブジェクトと配列が折りたためるノードになり、トップレベルが一眼で「このレスポンスに何が入っているか」を答え、詳細は展開した場所だけに出ます。200 行の API レスポンスで、これはスクロールとナビゲーションの差です。",
            "型ごとの色分けは装飾ではありません。実際のペイロードのバグは型の境界に集中します。数値が文字列として届く(\"42\")、false が実は文字列 \"false\" だった、オブジェクトのはずが null になっている。文字列・数値・真偽値・null がそれぞれ固有の色なら、こうした異常は視覚に飛び込んできます。キー名を一つも読まずに、レスポンス全体の怪しい型を走査できます。",
            "長い文字列の切り詰めが 3 つ目の工夫です。Base64 の塊、HTML 断片、長い説明文は 1 つの値が数百文字に及び、構造を埋めてしまいます。表示を 60 文字で切り詰めれば全値が 1 行に収まり、右側の原文とコピーボタンは常に全文を保持するので損失はゼロ。切り詰めは表示であり、データではありません。",
          ],
        },
        {
          heading: "解析エラーの読み方:行・列と定番の犯人",
          paragraphs: [
            "JSON の失敗パターンは驚くほど決まっていて、パーサーのエラーもそれに対応します。定番は、オブジェクトや配列の最後の要素の後のカンマ(JS リテラルでは合法、JSON では違法)、引用符のないキーや単一引用符のキー、文字列を単一引用符で囲むこと、閉じ括弧の欠落が数百行先で顕在化すること、そしてコメント——// は JS では問題なく JSON では常に違法。このリストを知っていれば、大半のエラーは一秒で直せます。",
            "行と列が重要なのは、失敗点が原因から遠いことが多いからです。10 行目の閉じ括弧の欠落は、40 行目で矛盾するトークンにぶつかるまで報告されないことがあります。最初に報告されたエラーだけを直して再解析してください。パーサーは連鎖的なミスからの回復が苦手で、最初のメッセージだけが信頼できます。",
            "このビューアーはパーサー自身のメッセージと位置を表示し、入力が有効になった瞬間にツリーを再描画します。貼り付け、エラー確認、修正、ツリー表示——このループは速く、壊れた設定ファイルのデバッグなら JSON リンター付きエディタに切り替えるより手軽です。",
          ],
        },
        {
          heading: "ローカル解析、そして別のツールを選ぶ場面",
          paragraphs: [
            "すべてブラウザ内で動きます。解析・ツリー構築・描画は端末上の JavaScript で行われ、送信も保存もありません。これが最も重要なのは、実際に貼り付けるペイロードこそセンシティブなものだからです。認証付き API レスポンス、内部設定、データベースから引き出した顧客レコード。整形のためにオンラインの JSON サービスへ送るのは、管理も不要なサーバー側のコピーを自分で作ることになります。",
            "規模が正直な境界です。数万ノードは問題なく描画できますが、数百メガのエクスポートはどんなビューアーでもタブを苦しめます。その規模ではストリーミングや CLI ツールが正解。日常の範囲——API レスポンス、Webhook ペイロード、設定ファイル——なら、ブラウザのツリーが「中身は何?」から答えへの最短経路です。",
            "周辺ツールと組み合わせれば次の一歩も進められます。フォーマッターは修正をコミットする前にインデントを整え、バリデーターは厳密な適合を確認し、json-path-query はツリーを手で探らずサブツリーを抽出します。ビューアーは読む道具、他は書く・調べる道具です。",
          ],
        },
      ],
    },
    es: {
      name: "Visor JSON",
      tagline: "Pega JSON y explóralo como árbol plegable con valores tipados y coloreados junto al documento formateado — instantáneo y privado, en tu navegador.",
      intro: ["Las respuestas anidadas de APIs y los archivos de configuración son difíciles de leer en texto plano. Este visor analiza tu JSON y dibuja un árbol plegable a la izquierda —expande o pliega cualquier objeto o array— mientras el panel derecho muestra el documento formateado. Los valores se colorean por tipo: cadenas en verde, números en azul, booleanos en ámbar, null en gris, y las cadenas largas se truncan a 60 caracteres para que las estructuras profundas sigan siendo escaneables.",
        "La entrada inválida se detecta al instante con número de línea y columna, así que una coma de más no te cuesta minutos de búsqueda. Todo se analiza localmente en tu navegador; nada se sube."],
      steps: ["Pega tu JSON en el cuadro de entrada.", "Explora el árbol plegable — pulsa las flechas ▾/▸ para plegar o expandir cualquier objeto o array.", "Lee el JSON formateado a la derecha y cópialo con un clic."],
      faqs: [
        { q: "¿Cómo localizo el error en mi JSON?", a: "Cuando el análisis falla, el error indica la línea y columna exactas, p. ej. «line 3, column 12: Unexpected token }». Corrige ese punto y el árbol aparece al instante; la causa suele ser una coma final, una clave sin comillas o un corchete sin cerrar." },
        { q: "¿Soporta documentos grandes?", a: "Sí para las cargas típicas de API y archivos de configuración: decenas de miles de nodos se renderizan sin problemas. Las cadenas largas solo se truncan a 60 caracteres en pantalla; el panel sin procesar y el botón de copiar conservan siempre el dato completo." },
        { q: "¿Mis datos salen de mi dispositivo?", a: "No. El análisis y el renderizado ocurren por completo en la memoria de tu navegador. No se envía nada a ningún servidor, así que puedes pegar respuestas de APIs internas y configuraciones con tranquilidad." },
      ],
      deepDive: [
        {
          heading: "Lo que cambia una vista de árbol al leer JSON",
          paragraphs: [
            "El JSON crudo está optimizado para máquinas: empaqueta la estructura en puntuación y espacios, así que un payload profundamente anidado se lee como una muralla de llaves. La vista de árbol lo invierte — cada objeto y array se vuelve un nodo plegable, el nivel superior responde de un vistazo “¿qué contiene esta respuesta?” y el detalle solo aparece donde expandes. En una respuesta de API de 200 líneas, es la diferencia entre hacer scroll y navegar.",
            "El color por tipo no es decoración. En payloads reales los errores se amontonan en los límites de tipo: un número que llegó como cadena (\"42\"), un false que en realidad es la cadena \"false\", un null que debería ser un objeto. Cuando cadenas, números, booleanos y null tienen cada uno su color, esas anomalías saltan a la vista — puedes escanear toda la respuesta en busca de tipos sospechosos sin leer ni un nombre de clave.",
            "El truncamiento de cadenas largas es el tercer truco de legibilidad. Blobs Base64, fragmentos de HTML y descripciones largas estiran un solo valor a cientos de caracteres y entierran la estructura. Truncar la pantalla a 60 caracteres mantiene cada valor en una línea — mientras el panel sin procesar y el botón copiar siempre llevan el texto completo. El truncamiento es presentación, no datos.",
          ],
        },
        {
          heading: "Leer los errores de análisis: línea, columna y los sospechosos habituales",
          paragraphs: [
            "JSON falla de formas repetitivas, y los errores del parser se corresponden con ellas. Los clásicos: una coma final tras el último elemento (legal en literales de JavaScript, ilegal en JSON), claves sin comillas o con comillas simples, cadenas entre comillas simples, un corchete que falta que solo aflora cientos de líneas después, y comentarios — // pasa en JS y nunca es válido en JSON. Con esa lista, casi cualquier mensaje se arregla en un segundo.",
            "La línea y la columna importan porque el punto del fallo suele estar lejos de la causa: una llave sin cerrar en la línea 10 puede no reportarse hasta que el parser tropieza con un token contradictorio en la línea 40. Arregla el primer error reportado y vuelve a analizar en vez de perseguirlo todo a la vez — los parsers recuperan mal de los errores en cascada y el primer mensaje es el fiable.",
            "Este visor muestra el mensaje del propio parser con su posición, y re-dibuja el árbol en cuanto la entrada se vuelve válida. El ciclo — pegar, ver error, corregir, ver árbol — es lo bastante rápido para depurar un archivo de configuración roto sin saltar a un editor con linter de JSON.",
          ],
        },
        {
          heading: "Análisis local, y cuándo cambiar de herramienta",
          paragraphs: [
            "Todo corre en tu navegador: el análisis, la construcción del árbol y el renderizado ocurren en JavaScript de tu dispositivo, y nada se transmite ni se almacena. Esto importa justo para lo que sueles pegar — respuestas de APIs autenticadas, configuración interna, registros de clientes sacados de una base de datos. Enviarlos a un servicio JSON en línea para embellecerlos crea una copia en un servidor que ni controlas ni necesitas.",
            "La escala es la frontera honesta. Decenas de miles de nodos se renderizan bien; una exportación de cientos de megas agotará la pestaña sea cual sea el visor, y ahí un comando de línea o una herramienta de streaming es mejor respuesta. Para el rango cotidiano — respuestas de API, payloads de webhooks, archivos de configuración — un árbol en el navegador es el camino más corto de “¿qué hay aquí dentro?” a la respuesta.",
            "Combínalo con las herramientas vecinas para el siguiente paso: el formateador normaliza la indentación antes de confirmar un arreglo, el validador confirma conformidad estricta y json-path-query extrae un subárbol sin cazar a mano por el árbol. El visor es la herramienta de lectura; las otras escriben y consultan.",
          ],
        },
      ],
    },
    pt: {
      name: "Visualizador JSON",
      tagline: "Cole JSON e explore-o como árvore retrátil com valores tipados e coloridos ao lado do documento formatado — instantâneo e privado, no seu navegador.",
      intro: ["Respostas aninhadas de APIs e arquivos de configuração são difíceis de ler como texto puro. Este visualizador analisa seu JSON e desenha uma árvore retrátil à esquerda — expanda ou recolha qualquer objeto ou array — enquanto o painel direito mostra o documento formatado. Os valores são coloridos por tipo: strings em verde, números em azul, booleanos em âmbar, null em cinza, e strings longas são truncadas em 60 caracteres para que estruturas profundas permaneçam legíveis.",
        "Entrada inválida é detectada imediatamente com número de linha e coluna, então uma vírgula extra não custa minutos de caça. Tudo é analisado localmente no navegador; nada é enviado."],
      steps: ["Cole seu JSON na caixa de entrada.", "Navegue pela árvore retrátil — clique nas setas ▾/▸ para recolher ou expandir qualquer objeto ou array.", "Veja o JSON formatado à direita e copie com um clique."],
      faqs: [
        { q: "Como localizo o erro no meu JSON?", a: "Quando a análise falha, o erro mostra a linha e a coluna exatas, p. ex. “line 3, column 12: Unexpected token }”. Corrija esse ponto e a árvore aparece imediatamente — na maioria das vezes é uma vírgula final, uma chave sem aspas ou um colchete faltando." },
        { q: "Aguenta documentos grandes?", a: "Sim para cargas típicas de API e arquivos de configuração — dezenas de milhares de nós renderizam sem problema. As strings longas são truncadas em 60 caracteres apenas na exibição; o painel bruto e o botão copiar sempre mantêm o dado completo." },
        { q: "Meus dados saem do meu dispositivo?", a: "Não. A análise e a renderização acontecem inteiramente na memória do navegador. Nada é enviado a servidores, então é seguro colar respostas de APIs internas e configurações." },
      ],
      deepDive: [
        {
          heading: "O que uma vista em árvore muda ao ler JSON",
          paragraphs: [
            "O JSON cru é otimizado para máquinas: ele compacta a estrutura em pontuação e espaços, então um payload profundamente aninhado se lê como um muro de chaves. A vista em árvore inverte isso — cada objeto e array vira um nó recolhível, o nível superior responde num relance “o que essa resposta contém?” e o detalhe só aparece onde você expande. Numa resposta de API de 200 linhas, é a diferença entre rolar e navegar.",
            "A cor por tipo não é enfeite. Em payloads reais os bugs se acumulam nas fronteiras de tipo: um número que chegou como string (\"42\"), um false que na verdade é a string \"false\", um null que devia ser um objeto. Quando strings, números, booleanos e null têm cada um sua cor, essas anomalias pulam aos olhos — você varre a resposta inteira atrás de tipos suspeitos sem ler um nome de chave sequer.",
            "O truncamento de strings longas é o terceiro truque de legibilidade. Blobs Base64, fragmentos de HTML e descrições longas esticam um único valor por centenas de caracteres e enterram a estrutura. Truncar a exibição em 60 caracteres mantém cada valor numa linha — enquanto o painel bruto e o botão copiar sempre carregam o texto completo. O truncamento é apresentação, não dado.",
          ],
        },
        {
          heading: "Lendo os erros de análise: linha, coluna e os suspeitos de sempre",
          paragraphs: [
            "O JSON falha de formas repetitivas, e os erros do parser se mapeiam neles. Os clássicos: vírgula final depois do último elemento (legal em literais de JavaScript, ilegal no JSON), chaves sem aspas ou com aspas simples, strings entre aspas simples, um colchete faltando que só aparece centenas de linhas depois, e comentários — // passa no JS e nunca é válido no JSON. Com essa lista na cabeça, quase toda mensagem de erro se resolve em um segundo.",
            "Linha e coluna importam porque o ponto da falha costuma ficar longe da causa: uma chave sem fechar na linha 10 pode só ser reportada quando o parser tropeça num token contraditório na linha 40. Corrija o primeiro erro reportado e analise de novo em vez de caçar tudo de uma vez — parsers se recuperam mal de erros em cascata, e a primeira mensagem é a confiável.",
            "Este visualizador mostra a mensagem do próprio parser com a posição, e redesenha a árvore no instante em que a entrada fica válida. O ciclo — colar, ver erro, corrigir, ver árvore — é rápido o bastante para depurar um arquivo de configuração quebrado sem trocar para um editor com linter de JSON.",
          ],
        },
        {
          heading: "Análise local, e quando trocar de ferramenta",
          paragraphs: [
            "Tudo roda no seu navegador: análise, construção da árvore e renderização acontecem no JavaScript do seu dispositivo, e nada é transmitido ou armazenado. Isso importa exatamente para o que você costuma colar — respostas de APIs autenticadas, configuração interna, registros de clientes tirados de um banco de dados. Enviá-los a um serviço JSON online para embelezar cria uma cópia num servidor que você não controla nem precisa.",
            "A escala é a fronteira honesta. Dezenas de milhares de nós renderizam bem; uma exportação de centenas de megas vai esgotar a aba não importa qual visualizador, e aí uma ferramenta de linha de comando ou de streaming é a resposta melhor. Para a faixa cotidiana — respostas de API, payloads de webhooks, arquivos de configuração —, uma árvore no navegador é o caminho mais curto de “o que tem aqui dentro?” à resposta.",
            "Combine com as ferramentas vizinhas para o próximo passo: o formatador normaliza a indentação antes de commitar um conserto, o validador confirma conformidade estrita, e o json-path-query extrai uma subárvore sem caçar à mão pela árvore. O visualizador é a ferramenta de leitura; as outras escrevem e consultam.",
          ],
        },
      ],
    },
  },
});
