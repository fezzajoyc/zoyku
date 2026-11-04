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
    },
  },
});
