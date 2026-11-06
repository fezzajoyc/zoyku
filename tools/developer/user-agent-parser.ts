import { DevEngineUserAgentParser } from "../_engines/dev-engine-user-agent";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "user-agent-parser",
  category: "developer",
  icon: "globe",
  engine: { component: DevEngineUserAgentParser },
  related: ["http-status-codes", "ip-lookup", "dns-lookup", "url-parser", "mime-types", "json-viewer", "cron-explainer"],
  copy: {
    en: {
      name: "User-Agent Parser",
      tagline: "Parse any User-Agent string into browser, engine, OS and device — recognize bots, WebViews and mobile shells, all locally in your browser.",
      intro: [
        "Every HTTP request announces itself with a User-Agent string, and reading one correctly is a small art: Chrome pretends to be Safari which pretends to be Mozilla; Edge hides inside Chrome's token list; bots, WebViews and mobile shells each leave their own signature. Paste a UA here and the parse splits out the browser family and version, the rendering engine (Blink/Gecko/WebKit), the OS and version, and whether the device is desktop, mobile, tablet or a known crawler.",
        "The rules are maintained as a table of explicit patterns — Chrome-family detection runs before the generic fallback, Edg/OPR/Samsung Internet get their own entries, and Googlebot, bingbot and friends are recognized by name rather than guessed as desktop browsers. Where a UA is truncated or malformed, the result says so instead of inventing a guess.",
        "Everything parses in your browser; the UA string never leaves the device — useful when inspecting headers from a log file you're not ready to share. Your own UA is available as a one-click example.",
      ],
      steps: [
        "Paste the User-Agent string into the input box — or click the sample to analyze your own.",
        "Read the parsed fields: browser name and version, engine, OS, device type, and bot flag.",
        "Check edge cases like WebViews and unusual prefixes — they're labeled explicitly rather than guessed.",
      ],
      faqs: [
        {
          q: "Why does Chrome claim to be Safari and Mozilla?",
          a: "Historical compatibility. Netscape-compatible sites were served to browsers advertising 'Mozilla', and Chrome inherited that pretense to get the same content — which is why the modern Chrome UA reads 'Mozilla/5.0 … AppleWebKit/537.36 (KHTML, like Gecko) Chrome/…'. Parsers work from the end of the chain (the Chrome token), not the beginning.",
        },
        {
          q: "How do you tell bots from real users?",
          a: "Known crawlers publish their token explicitly — Googlebot, bingbot, DuckDuckBot, Applebot, facebookexternalhit and others appear verbatim in the UA. This parser names them by signature rather than guessing from mobile or desktop fields; anything unrecognized stays labeled as a normal browser, not flagged as a bot.",
        },
        {
          q: "Is User-Agent sniffing reliable enough to gate features on?",
          a: "Not for critical paths — UA strings lie by design and are easy to spoof. Use UA parsing for analytics, logging and non-security decisions (showing a mobile layout, counting bot traffic), and feature-detect in the page for anything functional. This tool is for reading UAs, not for trusting them.",
        },
      ],
      deepDive: [
        {
          heading: "Why User-Agent strings lie, and by design",
          paragraphs: [
            "Every modern browser UA string begins with Mozilla/5.0, regardless of any connection to Netscape's Mozilla. This is competitive compatibility history, not malfunction: in the 1990s browsers advertised 'Mozilla' to receive the good content, and each newcomer copied the whole prefix to avoid being served the degraded version. Chrome's UA then claims to be AppleWebKit (which claims Gecko), Safari-compatible tokens ride along, and later browsers append themselves to the pile.",
            "The result is a chain of inherited claims: 'Mozilla/5.0 … AppleWebKit/537.36 (KHTML, like Gecko) Chrome/… Safari/…'. Parsing it backwards is the reliable technique — the most specific token is usually the truest, which is why Edge (Edg/), Opera (OPR/) and Samsung Internet get their own entries after the generic Chrome match, and why Chrome-family detection must run before the generic fallback rather than after.",
            "The arms race is not over: with UA reduction, browsers are freezing and trimming these strings, and some now send essentially identical UA strings regardless of version. That trajectory is worth knowing before you build anything on top of UA parsing — the signal is designed-in unreliable and getting quieter. Read UAs for analytics and logging; never gate security or critical functionality on one.",
          ],
        },
        {
          heading: "What a parse can and cannot tell you",
          paragraphs: [
            "A parser recovers what the string declares: browser family and version, rendering engine (Blink, Gecko, WebKit), operating system, device class (desktop, mobile, tablet), and — when the token appears verbatim — the bot. Known crawlers identify themselves explicitly: Googlebot, bingbot, DuckDuckBot, Applebot, facebookexternalhit and friends, which is why they are matched by name rather than guessed from mobile or desktop fields.",
            "What a parse cannot recover is the truth behind a spoofed claim. UA strings are trivially set by the client — curl sends its own, libraries let you pass any string, and mobile apps often ship WebViews with borrowed identities. So a parse is a record of what the client said about itself, not an authentication result; treat the bot flag the same way, since anything unrecognized stays labeled as a normal browser rather than being flagged.",
            "Practical uses line up with those limits: analytics dashboards (browser and OS distribution), log triage (spotting a WebView or a crawler among real traffic), debugging why a feature check failed, and classifying traffic in a dataset. For anything functional inside a page — enabling a feature, choosing a layout — the standard answer is feature detection in the client, with UA parsing as a hint rather than a gate.",
          ],
        },
        {
          heading: "Parsing locally, including your own UA",
          paragraphs: [
            "Everything here runs in your browser: the string you paste never leaves the device. That matters because the strings you investigate are often operational artifacts — headers from an internal log, a suspicious request captured by a firewall, a UA from an incident timeline. Sending them to a third-party service to be parsed turns a private diagnostic into someone else's dataset.",
            "Your own browser's UA is available as a one-click example, which is the fastest way to see the parser's output shape and to verify the field meanings against a known truth — you know what browser and OS you are running, so a correct parse is instantly checkable.",
            "Batch triage is the other natural workflow: paste strings one after another from a log excerpt and read the results as a table of browser/engine/OS/device. Because the rules run client-side with no server round trip, parsing dozens of strings is instant, works offline, and none of the log contents are transmitted — which is usually exactly what a log excerpt is not meant to be.",
          ],
        },
      ],
    },
    zh: {
      name: "User-Agent 解析器",
      tagline: "把任意 User-Agent 字符串解析成浏览器、引擎、系统和设备类型——识别爬虫、WebView 和移动端壳应用,全程本地处理。",
      intro: [
        "每个 HTTP 请求都会自报家门一个 User-Agent 串,读懂它是一门小手艺:Chrome 自称 Safari,Safari 又自称 Mozilla;Edge 藏在 Chrome 的 token 列表里;爬虫、WebView 和移动端壳各有各的签名。粘贴 UA 进来,解析会拆出浏览器家族和版本、渲染引擎(Blink/Gecko/WebKit)、操作系统版本,以及设备是桌面/手机/平板还是已知爬虫。",
        "规则是一张显式模式表——Chrome 家族检测先于通用兜底,Edg/OPR/三星浏览器各有独立条目,Googlebot、bingbot 等按名字识别而不是按桌面浏览器猜。UA 被截断或格式异常时,结果如实说明而不是编造猜测。",
        "全部在浏览器本地解析,UA 字符串不出设备——看日志里抓到的 UA 又不方便上传时用得上。点一下「示例」就能解析你自己当前的 UA。",
      ],
      steps: [
        "把 User-Agent 字符串粘贴进输入框——或点示例分析你自己的。",
        "读取解析字段:浏览器名称和版本、引擎、系统、设备类型、爬虫标记。",
        "查看 WebView 和异常前缀等边角情况——都明确标注,不靠猜。",
      ],
      faqs: [
        {
          q: "为什么 Chrome 自称 Safari 和 Mozilla?",
          a: "历史兼容。当年只服务 Netscape 兼容浏览器——这些浏览器自报「Mozilla」,Chrome 为了拿到同样的内容也沿用了这个伪装。所以现在 Chrome UA 长成「Mozilla/5.0 … AppleWebKit/537.36 (KHTML, like Gecko) Chrome/…」。解析要从链尾(Chrome token)而不是链头读。",
        },
        {
          q: "怎么区分爬虫和真实用户?",
          a: "主流爬虫在 UA 里明文自报——Googlebot、bingbot、DuckDuckBot、Applebot、facebookexternalhit 等都是字面出现的。本解析器按签名点名称别,不根据移动/桌面字段猜;识别不出来的就当正常浏览器处理,不误标爬虫。",
        },
        {
          q: "UA 嗅探可靠到可以拦功能吗?",
          a: "不该用在关键路径——UA 从设计上就不可靠,伪造门槛也低。分析、日志、非安全决策(展示移动布局、统计爬虫流量)可以用 UA 解析;功能性分支请在前端 feature-detect。这个工具是读懂 UA 的,不是信任 UA 的。",
        },
      ],
      deepDive: [
        {
          heading: "User-Agent 为什么撒谎,而且是故意的",
          paragraphs: [
            "每一条现代浏览器 UA 都以 Mozilla/5.0 开头,无论它与网景的 Mozilla 有没有半点关系。这是竞争性兼容的历史,不是故障:上世纪 90 年代,浏览器自称「Mozilla」才能拿到完整版内容,每个新来者都照抄整个前缀,免得被当成旧浏览器而收到降级页面。Chrome 的 UA 于是声称自己是 AppleWebKit(后者声称是 Gecko),Safari 兼容标记顺路搭车,后来的浏览器再把自己追加到队伍末尾。",
            "结果是一条继承声明链:「Mozilla/5.0 … AppleWebKit/537.36 (KHTML, like Gecko) Chrome/… Safari/…」。从后往前解析才是可靠技术——最具体的记号通常最真实,所以 Edge(Edg/)、Opera(OPR/)、三星浏览器在通用 Chrome 匹配之后有各自的条目,而 Chrome 家族检测必须先于通用兜底运行,而不是之后。",
            "军备竞赛没有结束:随着 UA 缩减,浏览器正在冻结和裁剪这些字符串,有些已经不分版本地发送几乎完全相同的 UA。在你基于 UA 解析构建任何东西之前,值得知道这个走向——这个信号天生不可靠,而且越来越安静。读 UA 用于分析和日志;永远不要把安全或关键功能压在它上面。",
          ],
        },
        {
          heading: "解析能告诉你什么,不能告诉你什么",
          paragraphs: [
            "解析器还原的是字符串声明的内容:浏览器家族和版本、渲染引擎(Blink、Gecko、WebKit)、操作系统、设备类别(桌面、移动、平板),以及——当记号逐字出现时——机器人。已知爬虫明确自报家门:Googlebot、bingbot、DuckDuckBot、Applebot、facebookexternalhit 等,所以按名字匹配,而不是从移动或桌面字段里猜。",
            "解析无法还原的是伪装声明背后的真相。UA 字符串客户端随手就能设置——curl 发自己的,各种库允许传任意字符串,移动 App 常常让 WebView 带着借来的身份出场。所以解析结果是「客户端关于自己的陈述」的记录,不是认证结论;bot 标记同理,未识别的一律标成普通浏览器,而不是标记为机器人。",
            "实际用途与这些限制对齐:分析看板(浏览器和操作系统分布)、日志分诊(在真实流量里认出 WebView 或爬虫)、调试特性检查为什么失败、给数据集里的流量分类。页面内部的功能性判断——开特性、选布局——标准答案是客户端特性检测,UA 解析只当提示,不当闸门。",
          ],
        },
        {
          heading: "本地解析,包括你自己的 UA",
          paragraphs: [
            "这里的一切都在浏览器里运行:你贴的字符串不离开设备。这很重要,因为你排查的字符串往往是运维产物——内部日志里的请求头、防火墙捕获的可疑请求、事故时间线上的 UA。把它们送到第三方服务去解析,等于把一次私密诊断变成别人的数据集。",
            "你自己浏览器的 UA 可以一键作为示例载入,这是看解析器输出形态、并对照已知事实校验字段含义的最快方式——你清楚自己用什么浏览器和系统,一次正确的解析立刻可查。",
            "另一条自然的工作流是批量分诊:从日志摘录里逐条贴入字符串,把结果读成一张浏览器/引擎/系统/设备的表。因为规则在客户端运行、没有服务器往返,解析几十条字符串是瞬间的事,离线可用,日志内容一字节都不外传——而日志摘录通常恰恰不该外传。",
          ],
        },
      ],
    },
    ja: {
      name: "User-Agent パーサー",
      tagline: "User-Agent 文字列をブラウザ・エンジン・OS・デバイスに分解 — ボット、WebView、モバイルシェルを識別。すべてブラウザ内でローカル処理。",
      intro: [
        "すべての HTTP リクエストは User-Agent 文字列で自己申告しますが、正しく読むのは小さな技術です:Chrome は Safari を名乗り、Safari は Mozilla を名乗る;Edge は Chrome のトークンリストに紛れ込む;ボット、WebView、モバイルシェルもそれぞれ独自の署名を残します。UA を貼り付けると、ブラウザファミリーとバージョン、レンダリングエンジン(Blink/Gecko/WebKit)、OS とバージョン、デバイスタイプ(デスクトップ/モバイル/タブレット/既知クローラー)に分解されます。",
        "ルールは明示的なパターン表として整備 — Chrome 系の検出は汎用フォールバックより先に走り、Edg/OPR/ Samsung Internet は個別エントリを持ち、Googlebot・bingbot 等は名前で識別します(デスクトップブラウザとして推測しません)。UA が切り詰められていたり形式が異常な場合は、推測をでっち上げずにその旨を表示します。",
        "すべてブラウザ内で解析され、UA 文字列は端末を離れません — 共有したくないログファイル内の UA を調べるのに便利です。「サンプル」をクリックすれば自分の UA も解析できます。",
      ],
      steps: [
        "User-Agent 文字列を入力欄に貼り付けるか、サンプルをクリックして自分の UA を解析します。",
        "解析結果の各フィールドを確認:ブラウザ名とバージョン、エンジン、OS、デバイスタイプ、ボットフラグ。",
        "WebView や特殊な接頭辞などのエッジケースを確認 — 推測せず明示的にラベル付けされます。",
      ],
      faqs: [
        {
          q: "なぜ Chrome は Safari や Mozilla を名乗るの?",
          a: "歴史的互換性のためです。Netscape 互換サイトは「Mozilla」を名乗るブラウザにコンテンツを配信しており、Chrome は同じコンテンツを得るためその偽装を引き継ぎました — 現在の Chrome UA が「Mozilla/5.0 … AppleWebKit/537.36 (KHTML, like Gecko) Chrome/…」なのはこの経緯です。パーサーはチェーンの末尾(Chrome トークン)から読みます。",
        },
        {
          q: "ボットと実ユーザーをどう区別する?",
          a: "既知のクローラーは UA に明示的に名乗りを出します — Googlebot、bingbot、DuckDuckBot、Applebot、facebookexternalhit 等はそのまま文字として現れます。このパーサーは署名で名前を特定し、モバイル/デスクトップのフィールドから推測しません。認識できないものは通常のブラウザのまま扱い、ボットと誤判定しません。",
        },
        {
          q: "UA スニッフィングは機能の出し分けに使える?",
          a: "重要経路には使わないでください — UA は設計上嘘をつき、偽造も容易です。解析は分析・ログ・セキュリティでない判断(モバイルレイアウトの提示、ボットトラフィックの集計)に使い、機能に関わる分岐はページ側で feature-detect を。このツールは UA を読むためのもので、信用するためのものではありません。",
        },
      ],
      deepDive: [
        {
          heading: "User-Agent 文字列はなぜ嘘をつくのか、しかも設計によって",
          paragraphs: [
            "すべての現代ブラウザの UA 文字列は Mozilla/5.0 で始まります。ネットスケープの Mozilla とは無関係であるにもかかわらず。これは競争的互換の歴史であって、故障ではありません。1990 年代、ブラウザは「Mozilla」を名乗らねばまともなコンテンツを受け取れず、新来のブラウザは降格版を渡されないよう接頭辞全体を写しました。Chrome の UA はその結果 AppleWebKit を(それは Gecko を)名乗り、Safari 互換トークンが相乗りし、後発のブラウザは自分を隊列の末尾に付け加えます。",
            "帰結は受け継がれた主張の連鎖です。「Mozilla/5.0 … AppleWebKit/537.36 (KHTML, like Gecko) Chrome/… Safari/…」。後ろから解析するのが信頼できる技法です。最も具体的なトークンが通常最も真実だからです。だから Edge(Edg/)、Opera(OPR/)、Samsung Internet が汎用の Chrome マッチの後に独自の項目を持ち、Chrome ファミリーの検出は汎用のフォールバックの前でなく後で走らねばなりません — 前に、ではなく。",
            "軍拡競争は終わっていません。UA の削減により、ブラウザはこれらの文字列を凍結・切り詰めており、バージョンにかかわらずほぼ同一の UA を送るものもあります。UA 解析の上に何かを築く前に、この軌跡を知っておく価値があります。この信号は設計上信頼できず、ますます静かになっています。UA の読解は分析とログのために。セキュリティや重要な機能の門には決して使わないこと。",
          ],
        },
        {
          heading: "解析が教えてくれること、教えてくれないこと",
          paragraphs: [
            "パーサーが復元するのは文字列が宣言したものです。ブラウザのファミリーとバージョン、レンダリング エンジン(Blink、Gecko、WebKit)、OS、デバイス区分(デスクトップ、モバイル、タブレット)、そしてトークンが逐語的に現れたときは — ボット。既知のクローラは明示的に名乗ります。Googlebot、bingbot、DuckDuckBot、Applebot、facebookexternalhit など。だからモバイルやデスクトップのフィールドから推測するのではなく、名前で一致させます。",
            "解析が復元できないのは、偽られた主張の背後の真実です。UA 文字列はクライアントが手軽に設定できます。curl は自分のものを送り、ライブラリは任意の文字列を渡させ、モバイル アプリはしばしば借り物の正体を持つ WebView を出荷します。ゆえに解析結果は「クライアントが自分について言ったこと」の記録であって、認証の結果ではありません。ボット フラグも同様に扱います。認識できないものは通常のブラウザのラベルのまま残り、フラグは立ちません。",
            "実用的な用途はこれらの限界に沿って並びます。分析ダッシュボード(ブラウザと OS の分布)、ログのトリアージ(実トラフィックの中で WebView やクローラを見つける)、機能チェックが失敗した理由のデバッグ、データセットのトラフィック分類。ページ内部の機能的な判断 — 機能の有効化、レイアウトの選択 — には標準の答えがあります。クライアントでの機能検出であり、UA 解析は門ではなくヒントです。",
          ],
        },
        {
          heading: "自分の UA を含め、ローカルで解析",
          paragraphs: [
            "ここではすべてがブラウザ内で動きます。貼った文字列は端末の外に出ません。これが重要なのは、調べる文字列が運用の産物であることが多いからです。内部ログのヘッダー、ファイアウォールが捉えた不審なリクエスト、障害タイムラインの UA。それらを第三者のサービスに送って解析させることは、非公開の診断を他人のデータセットに変えます。",
            "自分のブラウザの UA はワンクリックのサンプルとして利用できます。パーサーの出力の形を見る最速の方法であり、既知の真実と突き合わせてフィールドの意味を検証する方法でもあります — 自分がどんなブラウザと OS を使っているか知っているので、正しい解析は即座に検査できます。",
            "もう一つの自然なワークフローはバッチ トリアージです。ログの抜粋から文字列を次々に貼り、結果をブラウザ/エンジン/OS/デバイスの表として読みます。規則がクライアント側で動き、サーバー往復がないため、数十の文字列の解析は即座で、オフラインで動き、ログの内容は 1 バイトも送信されません — ログの抜粋とは、たいてい送信すべきでないものなのです。",
          ],
        },
      ],
    },
    es: {
      name: "Analizador de User-Agent",
      tagline: "Analiza cualquier cadena User-Agent en navegador, motor, SO y dispositivo — reconoce bots, WebViews y shells móviles, todo localmente en tu navegador.",
      intro: [
        "Cada petición HTTP se presenta con una cadena User-Agent, y leerla bien es un pequeño arte: Chrome finge ser Safari que finge ser Mozilla; Edge se esconde en la lista de tokens de Chrome; bots, WebViews y shells móviles dejan su propia firma. Pega un UA aquí y el análisis descompone la familia y versión del navegador, el motor de render (Blink/Gecko/WebKit), el SO y la versión, y si el dispositivo es escritorio, móvil, tableta o un rastreador conocido.",
        "Las reglas se mantienen como una tabla de patrones explícitos: la detección de la familia Chrome corre antes del fallback genérico; Edg, OPR y Samsung Internet tienen sus entradas propias; y Googlebot, bingbot y compañía se reconocen por nombre, no se adivinan como navegadores de escritorio. Cuando un UA está truncado o malformado, el resultado lo dice en vez de inventar una suposición.",
        "Todo se analiza en tu navegador; la cadena UA nunca sale del dispositivo — útil para inspeccionar cabeceras de un archivo de log que no quieres compartir. Tu propio UA está disponible como ejemplo en un clic.",
      ],
      steps: [
        "Pega la cadena User-Agent en el campo de entrada — o pulsa el ejemplo para analizar la tuya.",
        "Lee los campos analizados: nombre y versión del navegador, motor, SO, tipo de dispositivo y marca de bot.",
        "Revisa casos límite como WebViews y prefijos inusuales — se etiquetan explícitamente, sin adivinar.",
      ],
      faqs: [
        {
          q: "¿Por qué Chrome dice ser Safari y Mozilla?",
          a: "Compatibilidad histórica. Los sitios compatibles con Netscape se servían a navegadores que anunciaban 'Mozilla', y Chrome heredó ese disfraz para obtener el mismo contenido — por eso el UA moderno de Chrome dice 'Mozilla/5.0 … AppleWebKit/537.36 (KHTML, like Gecko) Chrome/…'. Los analizadores leen desde el final de la cadena (el token Chrome), no desde el principio.",
        },
        {
          q: "¿Cómo distingues bots de usuarios reales?",
          a: "Los rastreadores conocidos publican su token explícitamente — Googlebot, bingbot, DuckDuckBot, Applebot, facebookexternalhit y otros aparecen literalmente en el UA. Este analizador los nombra por firma en vez de adivinar por campos de móvil o escritorio; lo no reconocido queda como navegador normal, no se marca como bot.",
        },
        {
          q: "¿El UA sniffing basta para decidir funcionalidades?",
          a: "No en rutas críticas — las cadenas UA mienten por diseño y son fáciles de falsificar. Usa el análisis de UA para analítica, registros y decisiones no relacionadas con seguridad (mostrar diseño móvil, contar tráfico de bots), y para cualquier cosa funcional haz feature-detect en la página. Esta herramienta lee UAs, no los certifica.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué las cadenas User-Agent mienten, y por diseño",
          paragraphs: [
            "Toda cadena UA de navegador moderno empieza con Mozilla/5.0, sin relación alguna con el Mozilla de Netscape. Es historia de compatibilidad competitiva, no mal funcionamiento: en los años noventa los navegadores se anunciaban como 'Mozilla' para recibir el buen contenido, y cada recién llegado copiaba el prefijo entero para que no le sirvieran la versión degradada. El UA de Chrome entonces dice ser AppleWebKit (que dice ser Gecko), los tokens compatibles con Safari van de polizón, y los navegadores posteriores se añaden a la fila.",
            "El resultado es una cadena de afirmaciones heredadas: 'Mozilla/5.0 … AppleWebKit/537.36 (KHTML, like Gecko) Chrome/… Safari/…'. Analizarla hacia atrás es la técnica fiable — el token más específico suele ser el más veraz, por eso Edge (Edg/), Opera (OPR/) y Samsung Internet tienen sus propias entradas después del emparejamiento genérico de Chrome, y por eso la detección de la familia Chrome debe correr antes de la reserva genérica, no después.",
            "La carrera armamentista no ha terminado: con la reducción del UA, los navegadores están congelando y recortando estas cadenas, y algunos envían ahora esencialmente la misma cadena sea cual sea la versión. Esa trayectoria conviene conocerla antes de construir algo sobre análisis de UA — la señal es de fiabilidad diseñada a propósito y cada vez más callada. Lee UAs para analítica y logs; jamás pongas seguridad ni funcionalidad crítica sobre uno.",
          ],
        },
        {
          heading: "Lo que un análisis puede y no puede decirte",
          paragraphs: [
            "Un parser recupera lo que la cadena declara: familia y versión del navegador, motor de renderizado (Blink, Gecko, WebKit), sistema operativo, clase de dispositivo (escritorio, móvil, tableta) y — cuando el token aparece textualmente — el bot. Los rastreadores conocidos se identifican explícitamente: Googlebot, bingbot, DuckDuckBot, Applebot, facebookexternalhit y compañeros, razón por la que se emparejan por nombre en vez de adivinarse desde campos de móvil o escritorio.",
            "Lo que un análisis no puede recuperar es la verdad detrás de una afirmación falsificada. Las cadenas UA las fija el cliente sin esfuerzo — curl manda la suya, las bibliotecas dejan pasar cualquier cadena, y las apps móviles suelen enviar WebViews con identidades prestadas. Así que un análisis es un registro de lo que el cliente dijo de sí mismo, no un resultado de autenticación; trata la marca de bot igual, porque lo no reconocido queda etiquetado como navegador normal en vez de marcado.",
            "Los usos prácticos se alinean con esos límites: paneles de analítica (distribución de navegador y sistema operativo), triaje de logs (avistar un WebView o un crawler entre tráfico real), depurar por qué falló una comprobación de características, y clasificar tráfico en un conjunto de datos. Para algo funcional dentro de una página — activar una característica, elegir un layout — la respuesta estándar es la detección de características en el cliente, con el análisis de UA como pista y no como puerta.",
          ],
        },
        {
          heading: "Análisis en local, incluido tu propio UA",
          paragraphs: [
            "Todo corre aquí en tu navegador: la cadena que pegas nunca sale del dispositivo. Eso importa porque las cadenas que investigas suelen ser artefactos operativos — cabeceras de un log interno, una petición sospechosa capturada por un cortafuegos, un UA de la línea temporal de un incidente. Enviarlos a un servicio de terceros para analizarlos convierte un diagnóstico privado en el conjunto de datos de otra persona.",
            "El UA de tu propio navegador está disponible como ejemplo de un clic, que es la manera más rápida de ver la forma de salida del parser y de verificar el significado de los campos contra una verdad conocida — sabes qué navegador y sistema usas, así que un análisis correcto es comprobable al instante.",
            "El otro flujo natural es el triaje en lote: pega cadenas una tras otra desde un extracto de log y lee los resultados como una tabla de navegador/motor/OS/dispositivo. Como las reglas corren en el cliente sin viaje al servidor, analizar decenas de cadenas es instantáneo, funciona sin conexión y nada del contenido del log se transmite — que suele ser exactamente lo que un extracto de log no debe ser.",
          ],
        },
      ],
    },
    pt: {
      name: "Analisador de User-Agent",
      tagline: "Analise qualquer string User-Agent em navegador, motor, SO e dispositivo — reconhece bots, WebViews e shells móveis, tudo local no navegador.",
      intro: [
        "Cada requisição HTTP se apresenta com uma string User-Agent, e ler uma corretamente é uma pequena arte: Chrome finge ser Safari que finge ser Mozilla; Edge se esconde na lista de tokens do Chrome; bots, WebViews e shells móveis deixam sua própria assinatura. Cole um UA aqui e a análise decompõe família e versão do navegador, o motor de render (Blink/Gecko/WebKit), o SO e a versão, e se o dispositivo é desktop, celular, tablet ou um crawler conhecido.",
        "As regras são mantidas como uma tabela de padrões explícitos: a detecção da família Chrome roda antes do fallback genérico; Edg, OPR e Samsung Internet têm entradas próprias; e Googlebot, bingbot e afins são reconhecidos pelo nome, não adivinhados como navegadores desktop. Quando um UA está truncado ou malformado, o resultado diz isso em vez de inventar um palpite.",
        "Tudo é analisado no navegador; a string UA nunca sai do dispositivo — útil para inspecionar cabeçalhos de um arquivo de log que você não quer compartilhar. Seu próprio UA está disponível como exemplo em um clique.",
      ],
      steps: [
        "Cole a string User-Agent no campo de entrada — ou clique no exemplo para analisar a sua.",
        "Leia os campos analisados: nome e versão do navegador, motor, SO, tipo de dispositivo e marca de bot.",
        "Verifique casos extremos como WebViews e prefixos incomuns — são rotulados explicitamente, sem adivinhação.",
      ],
      faqs: [
        {
          q: "Por que o Chrome se diz Safari e Mozilla?",
          a: "Compatibilidade histórica. Sites compatíveis com Netscape eram servidos a navegadores que anunciavam 'Mozilla', e o Chrome herdou esse disfarce para receber o mesmo conteúdo — por isso o UA moderno do Chrome diz 'Mozilla/5.0 … AppleWebKit/537.36 (KHTML, like Gecko) Chrome/…'. Os analisadores leem do fim da cadeia (o token Chrome), não do início.",
        },
        {
          q: "Como distinguir bots de usuários reais?",
          a: "Crawlers conhecidos publicam seu token explicitamente — Googlebot, bingbot, DuckDuckBot, Applebot, facebookexternalhit e outros aparecem literalmente no UA. Este analisador os nomeia pela assinatura em vez de adivinhar pelos campos mobile/desktop; o que não é reconhecido permanece como navegador normal, não marcado como bot.",
        },
        {
          q: "UA sniffing basta para decidir funcionalidades?",
          a: "Não em caminhos críticos — strings UA mentem por design e são fáceis de falsificar. Use análise de UA para analytics, logs e decisões não ligadas a segurança (mostrar layout mobile, contar tráfego de bots), e para qualquer coisa funcional faça feature-detect na página. Esta ferramenta lê UAs, não os certifica.",
        },
      ],
      deepDive: [
        {
          heading: "Por que as strings User-Agent mentem, e por desenho",
          paragraphs: [
            "Toda string UA de navegador moderno começa com Mozilla/5.0, sem relação alguma com o Mozilla da Netscape. É história de compatibilidade competitiva, não mau funcionamento: nos anos noventa os navegadores se anunciavam como 'Mozilla' para receber o bom conteúdo, e cada recém-chegado copiava o prefixo inteiro para não ser servido com a versão degradada. O UA do Chrome então diz ser AppleWebKit (que diz ser Gecko), tokens compatíveis com Safari caronam, e navegadores posteriores se acrescentam à fila.",
            "O resultado é uma cadeia de afirmações herdadas: 'Mozilla/5.0 … AppleWebKit/537.36 (KHTML, like Gecko) Chrome/… Safari/…'. Analisá-la de trás para frente é a técnica confiável — o token mais específico costuma ser o mais veraz, por isso Edge (Edg/), Opera (OPR/) e Samsung Internet têm entradas próprias depois do casamento genérico do Chrome, e por isso a detecção da família Chrome deve rodar antes da reserva genérica, não depois.",
            "A corrida armamentista não acabou: com a redução do UA, navegadores estão congelando e aparando essas strings, e alguns agora enviam essencialmente a mesma string independente da versão. Essa trajetória vale conhecer antes de construir algo sobre análise de UA — o sinal é de confiabilidade desenhada de propósito e está ficando mais silencioso. Leia UAs para analítica e logs; nunca ponha segurança ou funcionalidade crítica sobre um.",
          ],
        },
        {
          heading: "O que uma análise pode e não pode dizer",
          paragraphs: [
            "Um parser recupera o que a string declara: família e versão do navegador, motor de renderização (Blink, Gecko, WebKit), sistema operacional, classe de dispositivo (desktop, móvel, tablet) e — quando o token aparece textualmente — o bot. Rastreadores conhecidos se identificam explicitamente: Googlebot, bingbot, DuckDuckBot, Applebot, facebookexternalhit e companhia, razão pela qual são casados pelo nome em vez de adivinhados a partir de campos de móvel ou desktop.",
            "O que uma análise não pode recuperar é a verdade atrás de uma afirmação falsificada. Strings UA são definidas pelo cliente sem esforço — curl manda a sua, bibliotecas deixam passar qualquer string, e apps móveis frequentemente enviam WebViews com identidades emprestadas. Então uma análise é um registro do que o cliente disse sobre si, não um resultado de autenticação; trate a marca de bot do mesmo jeito, pois o não reconhecido fica rotulado como navegador normal em vez de sinalizado.",
            "Os usos práticos se alinham a esses limites: painéis de analítica (distribuição de navegador e sistema operacional), triagem de logs (avistar um WebView ou um crawler entre tráfego real), depurar por que uma checagem de recurso falhou, e classificar tráfego num conjunto de dados. Para algo funcional dentro de uma página — ativar um recurso, escolher um layout — a resposta padrão é detecção de recursos no cliente, com análise de UA como dica e não como portão.",
          ],
        },
        {
          heading: "Análise local, incluindo seu próprio UA",
          paragraphs: [
            "Tudo roda aqui no seu navegador: a string que você cola nunca sai do dispositivo. Isso importa porque as strings que você investiga costumam ser artefatos operacionais — cabeçalhos de um log interno, uma requisição suspeita capturada por um firewall, um UA da linha do tempo de um incidente. Enviá-los a um serviço de terceiros para análise transforma um diagnóstico privado no conjunto de dados de outra pessoa.",
            "O UA do seu próprio navegador está disponível como exemplo de um clique, que é o jeito mais rápido de ver a forma de saída do parser e de verificar o significado dos campos contra uma verdade conhecida — você sabe que navegador e sistema está usando, então uma análise correta é verificável de imediato.",
            "O outro fluxo natural é a triagem em lote: cole strings uma após outra de um trecho de log e leia os resultados como uma tabela de navegador/motor/OS/dispositivo. Como as regras rodam no cliente sem viagem ao servidor, analisar dezenas de strings é instantâneo, funciona offline e nada do conteúdo do log é transmitido — que costuma ser exatamente o que um trecho de log não deve ser.",
          ],
        },
      ],
    },
  },
});
