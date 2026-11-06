import { DevCodeEngine } from "../_engines/dev-engine-code";
import { defineTool } from "../_lib/types";

const SAMPLE = '<note><to>Ada</to><from>Grace</from><body>Hello &amp; welcome</body></note>';

export default defineTool({
  slug: "xml-formatter",
  category: "developer",
  icon: "code",
  engine: { component: DevCodeEngine, props: { mode: "xml-format", sample: SAMPLE } },
  related: ["xml-validator", "html-formatter", "json-formatter", "md5-generator", "sha256-generator", "base64-image", "json-validator", "url-encoder", "html-minifier", "url-decoder"],
  copy: {
    en: {
      name: "XML Formatter",
      tagline:
        "Beautify XML online with clean 2-space indentation — sitemaps, RSS feeds, SOAP envelopes and config files become readable again, right in your browser.",
      intro: [
        "Paste tangled or one-line XML and get a properly indented document instantly. Elements nest with consistent 2-space indentation, short text content stays on one line with its tags, and comments, CDATA sections, processing instructions and DOCTYPE declarations are preserved.",
        "Ideal for reading sitemap.xml, RSS/Atom feeds, Android layouts, Maven poms, SOAP responses and endless other config formats — without installing an editor plugin.",
      ],
      steps: [
        "Paste your XML into the input box.",
        "The formatted document appears immediately as you type.",
        "Copy the beautified XML or clear the input to try another file.",
      ],
      faqs: [
        {
          q: "Will formatting change my XML data?",
          a: "Whitespace between elements is normalized to make the structure readable, which is safe for virtually all real-world XML. Whitespace inside text content is preserved (trimmed at the edges), and CDATA sections are kept byte-for-byte.",
        },
        {
          q: "Does it handle large XML files?",
          a: "Yes, within reason — the formatting is a fast single pass and runs locally, but multi-megabyte documents may take a moment on slower devices.",
        },
        {
          q: "Is my XML uploaded to a server?",
          a: "No. Formatting happens entirely in your browser; nothing is sent anywhere.",
        },
      ],
      deepDive: [
        {
          heading: "What formatting actually changes — and what it must not",
          paragraphs: [
            "XML has a sharp edge that formatting walks straight up to: whitespace is significant inside text content. A formatter must normalize the whitespace between elements to make the tree readable, while preserving the whitespace inside elements — a <code> block, a poetry line, a SQL statement inside a config file all lose their meaning if their internal spaces are reflowed. This tool keeps text content intact (trimmed only at the edges) and keeps CDATA sections byte-for-byte.",
            "Everything else is preserved rather than invented: comments stay where they are, CDATA sections survive as-is, processing instructions and DOCTYPE declarations pass through. The formatter only re-indents — 2-space nesting, short text kept on one line with its tags — so what you copy back parses to exactly the same tree as what you pasted.",
            "One caveat belongs in every honest formatter's fine print: for the rare documents that treat inter-element whitespace as data (mixed content where a stray space between elements is meaningful), any re-indentation changes the document. For sitemaps, RSS, config files and SOAP — the overwhelming majority of real XML — inter-element whitespace is ignored by every consumer, and formatting is safe.",
          ],
        },
        {
          heading: "Reading XML the way its structure intends",
          paragraphs: [
            "A one-line XML document is technically correct and practically unreadable — the usual state of machine-generated sitemaps, API responses and minified config exports. What indentation buys you is the ability to see the tree: which elements are siblings, which nest inside which, where a repeating structure repeats. Once you can see it, the debugging questions answer themselves — is this element inside the right parent, did the feed's <item> repeat as expected, why is this empty element here.",
            "Long documents benefit from a second pass: after formatting, check the depth. Structures nesting more than four or five levels usually indicate a mapping mistake — XML documents that deep are hard to consume and hard to validate by eye. It is also worth scanning attribute lists at the same time; duplicated attributes or attributes that should have been elements show up clearly once the document has shape.",
            "Formatting also serves as a cheap integrity check: if the formatter refuses your input, something is broken before you spend time debugging downstream. Pair it with the validator for a precise error message, then format for reading, then hand the formatted document to the consumer — it parses identically, and the next human to open it starts from a readable baseline.",
          ],
        },
        {
          heading: "Formatted locally, nothing uploaded",
          paragraphs: [
            "Formatting runs entirely in your browser: your XML never leaves the device, works offline, and has no upload ceiling beyond memory. The documents you format are often the sensitive kind — internal service configs, SOAP responses with session data, private API payloads, files under NDA. Sending any of them to an online formatter to be pretty-printed is a small but avoidable disclosure; local formatting removes the question entirely.",
            "It also makes the tool fit iteration: paste, read, adjust the source, paste again — each cycle is instant because nothing crosses a network. For large documents this matters practically: the formatting is a single fast pass, and multi-megabyte files that would be an upload wait on a server-based tool are handled in place, bounded only by your device.",
            "The workflow completes with the site's other XML tools: validate first for a precise error, format for reading, convert with XML to JSON when the consumer speaks JSON. Because all three run locally, the whole loop — check, read, transform — can happen on a machine with no network access, which is often exactly where these documents live.",
          ],
        },
      ],
    },
    zh: {
      name: "XML 格式化",
      tagline: "在线美化 XML,统一 2 空格缩进——站点地图、RSS、SOAP 报文和配置文件重新变得可读,全程浏览器本地处理。",
      intro: [
        "粘贴混乱或挤成一行的 XML,立即得到缩进规范的文档。元素按 2 空格统一缩进,短文本与标签保持同一行,注释、CDATA、处理指令和 DOCTYPE 声明全部保留。",
        "适合阅读 sitemap.xml、RSS/Atom 订阅源、Android 布局、Maven pom、SOAP 响应等各种配置格式——不用再装编辑器插件。",
      ],
      steps: [
        "把 XML 粘贴到输入框。",
        "边输入边即时显示格式化结果。",
        "复制美化后的 XML,或清空输入换一个文件。",
      ],
      faqs: [
        {
          q: "格式化会改变 XML 数据吗?",
          a: "元素之间的空白会被规范化以便阅读,这对几乎所有真实 XML 都是安全的;文本内容内部的空白会保留(仅去首尾),CDATA 内容逐字保留。",
        },
        {
          q: "能处理很大的 XML 文件吗?",
          a: "可以,只要不是特别夸张——格式化是快速的单遍扫描并在本地运行,但数 MB 的文档在较慢的设备上可能需要一点时间。",
        },
        {
          q: "XML 会被上传到服务器吗?",
          a: "不会。格式化完全在浏览器中完成,不会有任何数据被发送出去。",
        },
      ],
      deepDive: [
        {
          heading: "格式化到底改了什么——以及什么绝不能改",
          paragraphs: [
            "XML 有一条格式化直面上来的锋利边缘:文本内容内部的空白是有意义的。格式化器必须规范化元素之间的空白让树可读,同时保留元素内部的空白——<code> 块、诗行、配置文件里的 SQL 语句,一旦内部空格被重排就失去意义。本工具保持文本内容原样(只在边缘修剪),CDATA 节逐字节保留。",
            "其余一切都被保留而不是发明:注释留在原地,CDATA 原样存活,处理指令和 DOCTYPE 声明照常通过。格式化器只做重新缩进——2 空格嵌套、短文本与标签同行——所以你复制回去的文档与贴进来的一样,解析成同一棵树。",
            "有一条注意事项属于每个诚实的格式化器的细则:对极少数把元素间空白当数据的文档(元素之间的一个杂散空格有意义的混合内容),任何重排缩进都会改变文档。对站点地图、RSS、配置文件和 SOAP——现实 XML 的压倒性多数——元素间空白被所有消费方忽略,格式化是安全的。",
          ],
        },
        {
          heading: "按结构本意去读 XML",
          paragraphs: [
            "单行的 XML 文档在技术上正确、在实践中没法读——机器生成的站点地图、API 响应和压缩过的配置导出通常就是这个状态。缩进买来的是看见树的能力:哪些元素是兄弟,谁嵌在谁里面,重复结构在哪里重复。一旦看得见,调试问题自己就有了答案——这个元素是不是在正确的父元素里,订阅源的 <item> 是否按预期重复,这个空元素为什么会在这里。",
            "长文档值得来第二遍:格式化之后看深度。嵌套超过四五层的结构通常意味着映射出了错——那么深的 XML 文档难以消费,也难以用肉眼校验。同时值得扫一眼属性列表;文档有了形状之后,重复属性或本该是元素的属性会清楚地现形。",
            "格式化还能当廉价的完整性检查:如果格式化器拒绝你的输入,说明在你花时间调试下游之前就有东西坏了。先用校验器拿精确的报错,再格式化以便阅读,然后把格式化后的文档交给消费方——它解析出的树一模一样,而下一个打开它的人从可读的基线起步。",
          ],
        },
        {
          heading: "本地格式化,不上传任何东西",
          paragraphs: [
            "格式化完全在浏览器里运行:你的 XML 不离开设备,离线可用,上限只有内存。你要格式化的文档常常是敏感的那类——内部服务配置、带会话数据的 SOAP 响应、私有 API 载荷、保密协议下的文件。把其中任何一个送到在线格式化器去美化,都是一次小但可以避免的泄露;本地格式化直接取消这个问题。",
            "它也让工具适合迭代:贴入、阅读、改源码、再贴——每个循环即时完成,因为什么都不经过网络。对大文档这有实际意义:格式化是单次快速遍历,在基于服务器的工具里要等上传的几兆文件,在这里就地处理,上限只有你的设备。",
            "工作流与本站其他 XML 工具衔接:先校验拿精确报错,再格式化以便阅读,消费方说 JSON 时用 XML 转 JSON。三者都本地运行,整个循环——检查、阅读、转换——可以在没有网络的机器上完成,而这些文档恰恰常住在那样的机器上。",
          ],
        },
      ],
    },
    ja: {
      name: "XML フォーマッター",
      tagline:
        "XML をオンラインで整形し、2 スペースの統一インデントに。サイトマップ・RSS・SOAP・設定ファイルがブラウザ内ですぐ読めます。",
      intro: [
        "崩れた XML や 1 行に押し込まれた XML を貼り付けると、即座に適切にインデントされた文書に。要素は 2 スペースで統一され、短いテキストはタグと同じ行に、コメント・CDATA・処理命令・DOCTYPE 宣言も保持されます。",
        "sitemap.xml、RSS/Atom フィード、Android レイアウト、Maven pom、SOAP レスポンスなど、さまざまな設定形式を読むのに便利です。エディタのプラグインは不要です。",
      ],
      steps: [
        "XML を入力欄に貼り付けます。",
        "入力すると同時に整形結果が表示されます。",
        "整形後の XML をコピーするか、入力をクリアして別のファイルを試します。",
      ],
      faqs: [
        {
          q: "整形で XML のデータは変わりますか?",
          a: "要素間の空白は読みやすさのために正規化されますが、実際の XML ではほぼ安全です。テキスト内の空白は保持され(前後のみトリム)、CDATA はバイト単位で保持されます。",
        },
        {
          q: "大きな XML ファイルも扱えますか?",
          a: "はい。高速な単一パスでローカルに処理しますが、数 MB の文書は低スペックな端末では少し時間がかかることがあります。",
        },
        {
          q: "XML はサーバーに送信されますか?",
          a: "いいえ。整形は完全にブラウザ内で行われ、どこにも送信されません。",
        },
      ],
      deepDive: [
        {
          heading: "整形は実際何を変え、何を変えてはならないか",
          paragraphs: [
            "XML には整形が真っ直ぐ突き当たる鋭い角があります。テキスト内容の内側では空白が意味を持つことです。整形器はツリーを読みやすくするため要素間の空白を正規化しつつ、要素の内側の空白は保存しなければなりません。<code> ブロック、詩の行、設定ファイル内の SQL 文は、内側の空白が整列し直されると意味を失います。このツールはテキスト内容をそのまま保ち(端だけ刈り取り)、CDATA セクションはバイト単位で保ちます。",
            "それ以外はすべて発明ではなく保存です。コメントは元の位置に留まり、CDATA セクションはそのまま生き残り、処理命令と DOCTYPE 宣言はその通りに通過します。整形器は再インデントだけを行います — 2 スペースの入れ子、短いテキストはタグと同じ行に — なので、コピーして戻した文書は貼り付けたものとまったく同じツリーに解析されます。",
            "一つの注意は、すべての正直な整形器の細則に属します。要素間の空白をデータとして扱う稀な文書(要素間の迷子の空白が意味を持つ混合コンテンツ)では、どんな再インデントも文書を変えます。サイトマップ、RSS、設定ファイル、SOAP — 実際の XML の圧倒的多数 — では、要素間の空白はすべての消費側が無視し、整形は安全です。",
          ],
        },
        {
          heading: "構造の意図どおりに XML を読む",
          paragraphs: [
            "一行の XML 文書は技術的には正しく、実務的には読めません — 機械生成のサイトマップ、API 応答、圧縮された設定エクスポートの普通の状態です。インデントが買ってくるのはツリーを見る能力です。どの要素が兄弟で、誰が誰の中に入り、繰り返し構造がどこで繰り返すか。見えるようになれば、デバッグの問いは自答します — この要素は正しい親の中にいるか、フィードの <item> は期待どおり繰り返したか、この空要素はなぜここに。",
            "長い文書は二度目の通り道の恩恵を受けます。整形後に深さを見るのです。四五階級より深く入れ子になった構造は、たいてい写像の間違いを示します — それほど深い XML 文書は消費しづらく、肉眼での検証も難しい。同時に属性リストを一瞥する価値もあります。文書に形ができれば、重複属性や要素であるべき属性は明瞭に現れます。",
            "整形は安価な整合性検査にもなります。整形器が入力を拒めば、下流のデバッグに時間を使う前に何かが壊れています。まずバリデーターで正確なエラーを受け取り、読むために整形し、整形済みの文書を消費側へ渡す — 同じツリーに解析され、次に開く人は読める基準線から始めます。",
          ],
        },
        {
          heading: "ローカルで整形、アップロードはゼロ",
          paragraphs: [
            "整形は完全にブラウザ内で走ります。XML は端末の外に出ず、オフラインで動き、上限はメモリだけです。整形する文書はしばしば敏感な類です — 内部サービスの設定、セッション データ入りの SOAP 応答、非公開の API ペイロード、秘密保持契約下のファイル。どれかをオンライン整形器へ送って美化させることは、小さいが回避できる開示です。ローカル整形はその問いを丸ごと消します。",
            "反復にも適します。貼り、読み、ソースを直し、また貼る — 各サイクルは即時です。何もネットワークを跨がないからです。大きな文書ではこれは実務的な意味を持ちます。整形は単一の速いパスで、サーバー型ツールではアップロード待ちになる数メガバイトのファイルもその場で処理され、上限は端末だけです。",
            "ワークフローはこのサイトの他の XML ツールとつながります。正確なエラーのためにまず検証、読むために整形、消費側が JSON を話すなら XML から JSON へ。3 つともローカルで動くため、ループ全体 — 検査、読解、変換 — はネットワークのない端末で完結できます。そしてそのような文書は、まさにそこに住んでいることが多いのです。",
          ],
        },
      ],
    },
    es: {
      name: "Formateador XML",
      tagline:
        "Embellece XML en línea con indentación de 2 espacios: sitemaps, RSS, SOAP y archivos de configuración vuelven a ser legibles, sin salir del navegador.",
      intro: [
        "Pega XML desordenado o en una sola línea y obtén al instante un documento correctamente indentado. Los elementos se anidan con 2 espacios, el texto corto queda en la misma línea que sus etiquetas, y se conservan comentarios, secciones CDATA, instrucciones de procesamiento y DOCTYPE.",
        "Perfecto para leer sitemap.xml, canales RSS/Atom, layouts de Android, poms de Maven, respuestas SOAP y muchos otros formatos de configuración — sin instalar plugins.",
      ],
      steps: [
        "Pega tu XML en el cuadro de entrada.",
        "El documento formateado aparece inmediatamente mientras escribes.",
        "Copia el XML embellecido o borra la entrada para probar otro archivo.",
      ],
      faqs: [
        {
          q: "¿El formateo cambia mis datos XML?",
          a: "El espacio entre elementos se normaliza para hacer la estructura legible, algo seguro para prácticamente todo XML real. El espacio dentro del texto se conserva (recortado en los bordes) y las secciones CDATA se mantienen byte a byte.",
        },
        {
          q: "¿Puede con archivos XML grandes?",
          a: "Sí, con sensatez: el formateo es una pasada rápida que se ejecuta localmente, aunque documentos de varios MB pueden tardar un poco en dispositivos lentos.",
        },
        {
          q: "¿Mi XML se sube a un servidor?",
          a: "No. El formateo ocurre íntegramente en tu navegador; no se envía nada.",
        },
      ],
      deepDive: [
        {
          heading: "Qué cambia realmente el formato — y qué no debe cambiar",
          paragraphs: [
            "XML tiene una arista afilada a la que el formato llega de frente: el espacio en blanco es significativo dentro del contenido de texto. Un formateador debe normalizar el espacio entre elementos para hacer legible el árbol, a la vez que preserva el espacio dentro de los elementos — un bloque <code>, una línea de poesía, una sentencia SQL dentro de un archivo de configuración pierden su sentido si sus espacios internos se reacomodan. Esta herramienta mantiene el contenido de texto intacto (recortado solo en los bordes) y mantiene las secciones CDATA byte a byte.",
            "Todo lo demás se preserva en vez de inventarse: los comentarios se quedan donde están, las secciones CDATA sobreviven tal cual, las instrucciones de proceso y las declaraciones DOCTYPE pasan sin alteración. El formateador solo re-indenta — anidado de 2 espacios, texto corto en una línea con sus etiquetas — así que lo que copias de vuelta analiza al árbol exactamente igual que lo que pegaste.",
            "Una advertencia que pertenece a las letras pequeñas de todo formateador honesto: para los raros documentos que tratan el espacio entre elementos como datos (contenido mixto donde un espacio perdido entre elementos significa algo), cualquier re-indentación cambia el documento. Para sitemaps, RSS, archivos de configuración y SOAP — la inmensa mayoría del XML real — el espacio entre elementos lo ignora todo consumidor, y formatear es seguro.",
          ],
        },
        {
          heading: "Leer XML como su estructura pretende",
          paragraphs: [
            "Un documento XML en una línea es técnicamente correcto y prácticamente ilegible — el estado habitual de sitemaps generados por máquina, respuestas de API y exportaciones de configuración minificadas. Lo que compra la indentación es la capacidad de ver el árbol: qué elementos son hermanos, cuál anida dentro de cuál, dónde se repite una estructura repetida. Una vez que lo ves, las preguntas de depuración se responden solas — ¿está este elemento dentro del padre correcto, se repitió el <item> del feed como se esperaba, por qué está aquí este elemento vacío.",
            "Los documentos largos se benefician de una segunda pasada: tras formatear, revisa la profundidad. Las estructuras que anidan más de cuatro o cinco niveles suelen indicar un error de mapeo — los documentos XML tan profundos son duros de consumir y duros de validar a ojo. También vale repasar las listas de atributos al mismo tiempo; los atributos duplicados o los que debieron ser elementos aparecen con claridad una vez que el documento tiene forma.",
            "Formatear sirve también de comprobación barata de integridad: si el formateador rechaza tu entrada, algo está roto antes de que gastes tiempo depurando aguas abajo. Emparéjalo con el validador para un mensaje de error preciso, luego formatea para leer, y entrega al consumidor el documento formateado — analiza al árbol idéntico, y el próximo humano que lo abra parte de una línea base legible.",
          ],
        },
        {
          heading: "Formateado en local, nada subido",
          paragraphs: [
            "El formato corre por completo en tu navegador: tu XML nunca sale del dispositivo, funciona sin conexión y no tiene techo de subida más allá de la memoria. Los documentos que formateas suelen ser del tipo sensible — configuraciones de servicios internos, respuestas SOAP con datos de sesión, payloads de API privados, archivos bajo NDA. Enviar cualquiera de ellos a un formateador online para embellecerlo es una divulgación pequeña pero evitable; el formato local elimina la pregunta por completo.",
            "También hace la herramienta apta para iterar: pega, lee, ajusta el fuente, pega otra vez — cada ciclo es instantáneo porque nada cruza una red. Para documentos grandes esto importa en la práctica: el formato es una sola pasada rápida, y los archivos de varios megabytes que serían una espera de subida en una herramienta basada en servidor se manejan en el sitio, acotados solo por tu dispositivo.",
            "El flujo se completa con las demás herramientas XML del sitio: valida primero para un error preciso, formatea para leer, convierte con XML a JSON cuando el consumidor habla JSON. Como las tres corren en local, el ciclo entero — comprobar, leer, transformar — puede suceder en una máquina sin acceso a red, que suele ser exactamente donde viven estos documentos.",
          ],
        },
      ],
    },
    pt: {
      name: "Formatador XML",
      tagline:
        "Embeleze XML on-line com indentação de 2 espaços — sitemaps, RSS, envelopes SOAP e arquivos de configuração ficam legíveis de novo, no seu navegador.",
      intro: [
        "Cole XML bagunçado ou em uma linha só e receba instantaneamente um documento corretamente indentado. Os elementos aninham com 2 espaços, textos curtos ficam na mesma linha das tags, e comentários, CDATA, instruções de processamento e DOCTYPE são preservados.",
        "Ideal para ler sitemap.xml, feeds RSS/Atom, layouts Android, poms do Maven, respostas SOAP e muitos outros formatos de configuração — sem instalar plugin nenhum.",
      ],
      steps: [
        "Cole seu XML na caixa de entrada.",
        "O documento formatado aparece imediatamente enquanto você digita.",
        "Copie o XML embelezado ou limpe a entrada para testar outro arquivo.",
      ],
      faqs: [
        {
          q: "A formatação altera meus dados XML?",
          a: "O espaço entre elementos é normalizado para deixar a estrutura legível, o que é seguro para praticamente todo XML real. O espaço dentro do texto é preservado (com as bordas aparadas) e seções CDATA ficam byte a byte.",
        },
        {
          q: "Cuida de arquivos XML grandes?",
          a: "Sim, dentro do razoável — a formatação é uma passada rápida e roda localmente, mas documentos de vários MB podem demorar um pouco em dispositivos mais lentos.",
        },
        {
          q: "Meu XML é enviado a um servidor?",
          a: "Não. A formatação acontece inteiramente no seu navegador; nada é enviado.",
        },
      ],
      deepDive: [
        {
          heading: "O que a formatação realmente muda — e o que não deve mudar",
          paragraphs: [
            "O XML tem uma quina afiada à qual a formatação caminha de frente: espaço em branco é significativo dentro do conteúdo de texto. Um formatador precisa normalizar o espaço entre elementos para tornar a árvore legível, preservando o espaço dentro dos elementos — um bloco <code>, uma linha de poesia, uma sentença SQL dentro de um arquivo de configuração perdem o sentido se seus espaços internos forem reacomodados. Esta ferramenta mantém o conteúdo de texto intacto (aparado só nas bordas) e mantém seções CDATA byte a byte.",
            "Todo o resto é preservado em vez de inventado: comentários ficam onde estão, seções CDATA sobrevivem como estão, instruções de processamento e declarações DOCTYPE passam intactas. O formatador só re-indenta — aninhamento de 2 espaços, texto curto numa linha com suas tags — então o que você copia de volta analisa para exatamente a mesma árvore que o que colou.",
            "Uma ressalva que pertence às letras miúdas de todo formatador honesto: para os raros documentos que tratam o espaço entre elementos como dados (conteúdo misto onde um espaço perdido entre elementos significa algo), qualquer re-indentação muda o documento. Para sitemaps, RSS, arquivos de configuração e SOAP — a imensa maioria do XML real — o espaço entre elementos é ignorado por todo consumidor, e formatar é seguro.",
          ],
        },
        {
          heading: "Ler XML do jeito que sua estrutura pretende",
          paragraphs: [
            "Um documento XML numa linha é tecnicamente correto e praticamente ilegível — o estado habitual de sitemaps gerados por máquina, respostas de API e exportações de configuração minificadas. O que a indentação compra é a capacidade de ver a árvore: quais elementos são irmãos, qual aninha dentro de qual, onde uma estrutura repetida repete. Uma vez que você a vê, as perguntas de depuração se respondem sozinhas — este elemento está dentro do pai certo, o <item> do feed repetiu como esperado, por que este elemento vazio está aqui.",
            "Documentos longos se beneficiam de uma segunda passada: depois de formatar, confira a profundidade. Estruturas aninhadas mais de quatro ou cinco níveis costumam indicar um erro de mapeamento — documentos XML tão profundos são difíceis de consumir e difíceis de validar a olho. Também vale escanear as listas de atributos ao mesmo tempo; atributos duplicados ou que deveriam ser elementos aparecem com clareza uma vez que o documento tem forma.",
            "Formatar também serve de checagem barata de integridade: se o formatador recusa sua entrada, algo está quebrado antes de você gastar tempo depurando a jusante. Emparelhe com o validador para uma mensagem de erro precisa, depois formate para ler, e entregue ao consumidor o documento formatado — ele analisa para a árvore idêntica, e o próximo humano que o abrir parte de uma linha de base legível.",
          ],
        },
        {
          heading: "Formatado localmente, nada enviado",
          paragraphs: [
            "A formatação roda inteiramente no seu navegador: seu XML nunca sai do dispositivo, funciona offline e não tem teto de upload além da memória. Os documentos que você formata costumam ser do tipo sensível — configurações de serviços internos, respostas SOAP com dados de sessão, payloads de API privados, arquivos sob NDA. Enviar qualquer um deles a um formatador online para embelezar é uma divulgação pequena mas evitável; a formatação local elimina a questão por completo.",
            "Também torna a ferramenta apta a iterar: cole, leia, ajuste o fonte, cole de novo — cada ciclo é instantâneo porque nada cruza uma rede. Para documentos grandes isso importa na prática: a formatação é uma única passada rápida, e arquivos de vários megabytes que seriam uma espera de upload numa ferramenta baseada em servidor são tratados no local, limitados só pelo seu dispositivo.",
            "O fluxo se completa com as outras ferramentas XML do site: valide primeiro para um erro preciso, formate para ler, converta com XML para JSON quando o consumidor fala JSON. Como as três rodam localmente, o ciclo inteiro — checar, ler, transformar — pode acontecer numa máquina sem acesso a rede, que costuma ser exatamente onde esses documentos vivem.",
          ],
        },
      ],
    },
  },
});
