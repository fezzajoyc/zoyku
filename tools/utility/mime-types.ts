import { UtilEngineMime } from "../_engines/util-engine-mime";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "mime-types",
  category: "utility",
  icon: "grid",
  engine: { component: UtilEngineMime },
  related: ["base64-encoder", "base64-image", "html-escape", "json-formatter", "http-status-codes", "csv-to-json", "hash-generator", "url-parser"],
  copy: {
    en: {
      name: "MIME Types Lookup",
      tagline: "Search a curated table of 120+ common MIME types by extension or MIME prefix, see category and description, and copy any type with one click.",
      intro: [
        "When you configure a web server, an upload handler, a CORS header or a mail attachment filter, you need the exact MIME type for each extension — and guessing between image/jpg and image/jpeg breaks things silently. This table covers the extensions that matter in practice: web assets, images, audio and video, office documents, archives, fonts, config files and a handful of programming-language sources.",
        "Filter by extension (with or without the dot) or by MIME prefix such as text/ or application/json. Each row carries a one-click copy so the value lands on your clipboard exactly as it should appear in your configuration.",
      
        "Each row maps an extension to its registered MIME type per the IANA registry — the exact string a web server's Content-Type header or an <input accept> attribute expects. Ambiguous cases are resolved deliberately: .jpg maps to image/jpeg, .mjs to text/javascript (not application/javascript, which is deprecated), matching what modern browsers and servers actually send.",
        "Compared with guessing (image/jpg is not a real type) or hunting through the IANA list, the filter box narrows by extension or MIME prefix in one keystroke and the copy button puts the exact string on the clipboard — including the slash and any parameters. Useful when configuring nginx mime.types, writing an upload validator, or setting a CORS Content-Type.",
      ],
      steps: [
        "Type an extension (pdf, .png) or a MIME prefix (audio/, video/web) in the filter box.",
        "Scan the matched rows — extension, MIME type, category and a short description.",
        "Click Copy on a row to put the exact MIME type on your clipboard.",
      ],
      faqs: [
        {
          q: "Why do some entries show unusual types like text/javascript instead of application/javascript?",
          a: "RFC 9239 obsoleted application/javascript in favor of text/javascript, and WHATWG servers now use it by default. The table follows current standards where they have changed, so what you copy is what modern servers and validators expect.",
        },
        {
          q: "Is this the full IANA media-types registry?",
          a: "No — IANA lists over a thousand registered types, many of them vendor-specific or historical. This table focuses on roughly 120 entries you actually meet in web development, deployment configs and email handling, with the correct current values.",
        },
        {
          q: "Why does .ts appear twice with different categories?",
          a: "The extension is genuinely ambiguous: TypeScript source files (text/x.typescript) and MPEG transport streams (video/mp2t) both use .ts. Servers pick based on directory context, so check which one your use case means.",
        },
      ],
      deepDive: [
        {
          heading: "What a MIME type actually is",
          paragraphs: [
            "A MIME type is a two-part label — type/subtype, like text/html or image/png — that tells a receiver how to interpret a payload. The registry is maintained by IANA, and the types descend from the email attachment system the format was named after (Multipurpose Internet Mail Extensions). Browsers, servers and email clients all rely on this one line of metadata.",
            "The top-level types are few: text, image, audio, video, application, plus a few special ones like multipart and font. The subtype carries the real information — application/json means structured data, application/pdf means a document, application/octet-stream means \"opaque bytes, good luck\". The +suffix conventions (application/+json, +xml) indicate the internal structure of the subtype.",
            "Parameters follow after a semicolon: text/html; charset=utf-8 declares the character encoding. This is where a surprising number of bugs live — a page served without charset can render fine in one browser and garble in another.",
          ],
        },
        {
          heading: "Why browsers sniff, and what that costs you",
          paragraphs: [
            "Servers frequently get MIME types wrong: misconfigured hosts send plain text with a .css extension, or everything as application/octet-stream. Rather than break, browsers historically guessed from content — \"MIME sniffing\" — reading magic bytes (a PNG starts with 89504E47, a PDF with %PDF) and rendering accordingly. The behavior caused real vulnerabilities: serving user-uploaded content as text/html lets an attacker execute scripts on your origin, which is why security tooling exists to disable sniffing per response.",
            "The modern contract: set the correct Content-Type for everything you serve, add nosniff headers for user content, and never serve user uploads as text/html. The database here is for checking that contract — before serving a file type, look up its canonical type rather than inventing one.",
            "The extension-to-MIME mapping is convention, not law: a .dat file could be anything, and several formats share extensions (.mp4 for both audio and video containers). When in doubt, sniff the file's magic bytes yourself before declaring a type.",
          ],
        },
        {
          heading: "Offline reference table",
          paragraphs: [
            "The table is a static reference shipped with the page — lookups happen instantly in your browser with no network request. That makes it usable in air-gapped environments and fast enough to keep open beside a config file you are editing.",
            "For server configuration work, the commonest lookups are the server-side pairs: content types for fonts (font/woff2), manifests (application/manifest+json) and streamed media. Getting these right prevents the classic symptoms — fonts silently failing CORS checks, stylesheets refusing to load under strict MIME checking.",
            "Nothing about your traffic or files is recorded; the page is a dictionary, not a service. Pair it with the JSON tools when debugging API responses whose Content-Type headers are suspect.",
          ],
        },
      ],
    },
    zh: {
      name: "MIME 类型查询表",
      tagline: "按扩展名或 MIME 前缀搜索 120+ 常见 MIME 类型速查表,附类别与说明,任意条目一键复制。",
      intro: [
        "配置 Web 服务器、上传接口、CORS 响应头或邮件附件过滤时,你需要每个扩展名对应的准确 MIME 类型——而在 image/jpg 与 image/jpeg 之间凭感觉二选一,只会让问题悄无声息地出现。本表收录实践中真正会遇到的扩展名:Web 资源、图片、音视频、办公文档、压缩包、字体、配置文件,以及少量编程语言源码。",
        "支持按扩展名(带不带点均可)或按 MIME 前缀(如 text/、application/json)过滤。每行都有一键复制,写入剪贴板的就是你应放进配置里的原样字符串。",
      ],
      steps: [
        "在过滤框输入扩展名(pdf、.png)或 MIME 前缀(audio/、video/web)。",
        "查看匹配行——扩展名、MIME 类型、类别和简短说明。",
        "点击行内复制按钮,把准确的 MIME 类型写入剪贴板。",
      ],
      faqs: [
        {
          q: "为什么有的条目显示 text/javascript 而不是 application/javascript?",
          a: "RFC 9239 已废弃 application/javascript,改用 text/javascript,WHATWG 服务器默认值也已同步。本表在标准变更处采用当前规范,复制出的值正是现代服务器与校验器所期待的。",
        },
        {
          q: "这是完整的 IANA 媒体类型注册表吗?",
          a: "不是——IANA 注册了上千种类型,多数是厂商专用或历史遗留。本表聚焦 Web 开发、部署配置和邮件处理中真正会碰到的约 120 条,并给出当前正确的取值。",
        },
        {
          q: "为什么 .ts 出现了两次、类别不同?",
          a: "这个扩展名确实有歧义:TypeScript 源码(text/x.typescript)和 MPEG 传输流(video/mp2t)都用 .ts。服务器根据目录上下文判断,请确认你的场景指的是哪一个。",
        },
      ],
      deepDive: [
        {
          heading: "MIME 类型到底是什么",
          paragraphs: [
            "MIME 类型是一个两段式标签——类型/子类型,如 text/html 或 image/png——告诉接收方如何解读载荷。注册表由 IANA 维护,这些类型承袭自它得名的电子邮件附件系统(多用途互联网邮件扩展)。浏览器、服务器、邮件客户端都依赖这一行元数据。",
            "顶层类型不多:text、image、audio、video、application,加上 multipart、font 等少数特殊类。子类型才携带真实信息——application/json 表示结构化数据,application/pdf 表示文档,application/octet-stream 表示“不透明字节,祝你好运”。+ 后缀约定(application/+json、+xml)标示子类型的内部结构。",
            "参数跟在分号后:text/html; charset=utf-8 声明字符编码。大量 bug 恰恰住在这里——没声明 charset 的页面,在一个浏览器里渲染正常,在另一个里变成乱码。",
          ],
        },
        {
          heading: "浏览器为什么要嗅探,代价是什么",
          paragraphs: [
            "服务器经常配错 MIME 类型:配置不当的主机把 .css 发成纯文本,或者什么都发 application/octet-stream。浏览器为了不中断,历史上靠猜——即 “MIME 嗅探”——读魔数(PNG 以 89504E47 开头,PDF 以 %PDF 开头)再决定渲染方式。这个行为造成过真实漏洞:把用户上传的内容当作 text/html 提供,攻击者就能在你的源上执行脚本——这也是为什么有专门的安全头按响应禁用嗅探。",
            "现代的契约:为你提供的每个资源设置正确的 Content-Type,对用户内容加 nosniff 头,永远不要把用户上传当 text/html 提供。这里的数据库就是用来核对这份契约的——在提供某类文件前,先查它的规范类型,而不是自己发明一个。",
            "扩展名到 MIME 的映射是惯例不是法律:.dat 文件可以是任何东西,好几种格式共享扩展名(.mp4 既可能是音频也可能是视频容器)。拿不准时,先自己看文件的魔数再声明类型。",
          ],
        },
        {
          heading: "离线的参考表",
          paragraphs: [
            "这张表是随页面自带的静态参考——查询在浏览器里瞬时完成,没有网络请求。因此在物理隔离环境里也能用,而且够快,可以开着配在你正在改的配置文件旁边。",
            "做服务器配置时,高频查询是服务端那一组:字体的类型(font/woff2)、清单文件(application/manifest+json)、流媒体。把这些配对,能预防经典症状——字体静默挂掉 CORS 检查、样式表在严格 MIME 检查下拒绝加载。",
            "不会记录你的流量或文件;这个页面是词典,不是服务。调试 Content-Type 可疑的 API 响应时,配合本站 JSON 工具使用。",
          ],
        },
      ],
    },
    ja: {
      name: "MIMEタイプ一覧",
      tagline: "120以上の一般的なMIMEタイプを拡張子やMIMEの前方一致で検索。分類と説明つきで、どの項目もワンクリックでコピーできます。",
      intro: [
        "Webサーバーやアップロード処理、CORSヘッダー、添付ファイルフィルターを設定するとき、拡張子ごとの正確なMIMEタイプが必要です。image/jpg と image/jpeg のどちらかを勘で選ぶと、問題は静かに発生します。この一覧は実務で本当に使う拡張子を網羅します:Webアセット、画像、音声・動画、オフィス文書、アーカイブ、フォント、設定ファイル、そして主要言語のソースコード。",
        "拡張子(ドット有無どちらでも)や text/・application/json のようなMIMEの前方一致で絞り込めます。各行にワンクリックコピーがあり、設定にそのまま貼れる値をクリップボードへ入れます。",
      ],
      steps: [
        "絞り込み欄に拡張子(pdf、.png)かMIMEの前方一致(audio/、video/web)を入力します。",
        "一致した行を確認します——拡張子、MIMEタイプ、分類、簡単な説明。",
        "行のコピーを押すと、正確なMIMEタイプがクリップボードに入ります。",
      ],
      faqs: [
        {
          q: "application/javascript ではなく text/javascript と表示されるのはなぜですか?",
          a: "RFC 9239 が application/javascript を廃止し text/javascript に統一しました。WHATWGのサーバー既定値も同様です。この一覧は変更後の現在の標準に従うため、コピーした値は最新のサーバーや検証ツールが期待するものです。",
        },
        {
          q: "IANAの完全なメディアタイプ一覧ですか?",
          a: "いいえ。IANAには千以上の登録型があり、多くはベンダー固有か歴史的なものです。この一覧はWeb開発・デプロイ設定・メール処理で実際に直面する約120項目に絞り、現時点で正しい値を示しています。",
        },
        {
          q: ".ts が別カテゴリで2回出てくるのは?",
          a: "拡張子自体が多義的だからです。TypeScriptソース(text/x.typescript)とMPEGトランスポートストリーム(video/mp2t)がどちらも .ts を使います。サーバーは文脈で判断するため、自分の用途がどちらかを確認してください。",
        },
      ],
      deepDive: [
        {
          heading: "MIME タイプとは実際何か",
          paragraphs: [
            "MIME タイプは type/subtype の 2 部構成のラベル(text/html や image/png など)で、受信側にペイロードの解釈方法を伝えます。レジストリは IANA が維持し、これらのタイプは、この書式の名前の由来である電子メール添付の仕組み(Multipurpose Internet Mail Extensions)から続いています。ブラウザ、サーバー、メールクライアントが、この 1 行のメタデータに依存しています。",
            "トップレベルタイプは少数です。text、image、audio、video、application に、multipart や font など少数の特殊類。実情報を運ぶのはサブタイプで、application/json は構造化データ、application/pdf は文書、application/octet-stream は「不透明なバイト、ご利益は知らない」。+ 接尾辞の慣行(application/+json、+xml)はサブタイプの内部構造を示します。",
            "パラメータはセミコロンに続きます。text/html; charset=utf-8 は文字エンコーディングを宣言します。驚くほど多くのバグがここに住んでいます。charset を宣言しないページは、あるブラウザでは正常に描画され、別のブラウザでは文字化けします。",
          ],
        },
        {
          heading: "ブラウザがスニッフィングする理由とその代償",
          paragraphs: [
            "サーバーはしばしば MIME タイプを誤ります。設定を誤ったホストは .css をプレーンテキストとして送り、あるいは何でも application/octet-stream で送る。ブラウザは壊れないよう歴史的に推測してきました——「MIME スニッフィング」で、マジックバイト(PNG は 89504E47 で始まり、PDF は %PDF で始まる)を読んで描画を決める。この挙動は実際の脆弱性を生みました。ユーザーアップロードを text/html として提供すると、攻撃者があなたのオリジンでスクリプトを実行できます。だからこそ、応答ごとにスニッフィングを無効化するセキュリティ機構があります。",
            "現代の契約は、提供するすべてに正しい Content-Type を設定し、ユーザーコンテンツに nosniff ヘッダを付け、ユーザーアップロードを text/html として決して提供しないこと。ここのデータベースはこの契約の確認用です。ある種類のファイルを提供する前に、自分で発明せず正式なタイプを引いてください。",
            "拡張子から MIME への対応は慣行であって法ではありません。.dat は何でもありで、複数の形式が拡張子を共有します(.mp4 は音声コンテナにも動画コンテナにも)。迷ったら、タイプを宣言する前に自分でファイルのマジックバイトを見てください。",
          ],
        },
        {
          heading: "オフラインの参照表",
          paragraphs: [
            "この表はページに同梱される静的参照です。検索はブラウザ内で瞬時に終わり、ネットワーク要求はありません。だから物理的に分離された環境でも使え、編集中の設定ファイルの隣に開いておく速度があります。",
            "サーバー設定の作業では、頻出するのはサーバー側の一组です。フォントのタイプ(font/woff2)、マニフェスト(application/manifest+json)、ストリーミングメディア。これらを正すことで、フォントが黙って CORS 検査に落ちる、厳格な MIME 検査でスタイルシートが読み込まれないといった定番症状を防げます。",
            "トラフィックもファイルも一切記録しません。このページは辞書であってサービスではありません。Content-Type が怪しい API レスポンスのデバッグには、JSON 系ツールと組み合わせてください。",
          ],
        },
      ],
    },
    es: {
      name: "Tabla de tipos MIME",
      tagline: "Busque entre más de 120 tipos MIME comunes por extensión o prefijo MIME, con categoría y descripción, y copie cualquier tipo con un clic.",
      intro: [
        "Al configurar un servidor web, un gestor de subidas, una cabecera CORS o un filtro de adjuntos necesita el tipo MIME exacto de cada extensión — y elegir a ojo entre image/jpg e image/jpeg hace que los problemas aparezcan en silencio. Esta tabla cubre las extensiones que de verdad se usan: recursos web, imágenes, audio y vídeo, documentos de oficina, archivos comprimidos, fuentes, configuraciones y unas cuantas fuentes de código.",
        "Filtre por extensión (con o sin punto) o por prefijo MIME como text/ o application/json. Cada fila lleva copia con un clic, así que lo que llega al portapapeles es exactamente la cadena que debe ir en su configuración.",
      ],
      steps: [
        "Escriba una extensión (pdf, .png) o un prefijo MIME (audio/, video/web) en el filtro.",
        "Revise las filas coincidentes: extensión, tipo MIME, categoría y una descripción breve.",
        "Pulse Copiar en una fila para llevar el tipo MIME exacto al portapapeles.",
      ],
      faqs: [
        {
          q: "¿Por qué algunas entradas muestran text/javascript en vez de application/javascript?",
          a: "La RFC 9239 obsoletó application/javascript en favor de text/javascript, y los servidores WHATWG lo usan por defecto. La tabla sigue los estándares vigentes donde cambiaron, así que lo que copia es lo que esperan los servidores y validadores modernos.",
        },
        {
          q: "¿Es el registro completo de tipos de medios de IANA?",
          a: "No: IANA lista más de mil tipos registrados, muchos específicos de un fabricante o históricos. Esta tabla se centra en unas 120 entradas que aparecen de verdad en desarrollo web, configuraciones de despliegue y correo, con los valores actuales correctos.",
        },
        {
          q: "¿Por qué .ts aparece dos veces con categorías distintas?",
          a: "La extensión es genuinamente ambigua: el código fuente TypeScript (text/x.typescript) y los flujos de transporte MPEG (video/mp2t) usan ambos .ts. Los servidores deciden según el contexto de directorio, así que compruebe cuál le aplica.",
        },
      ],
      deepDive: [
        {
          heading: "Qué es realmente un tipo MIME",
          paragraphs: [
            "Un tipo MIME es una etiqueta de dos partes — type/subtype, como text/html o image/png — que dice al receptor cómo interpretar la carga. El registro lo mantiene IANA, y los tipos descienden del sistema de adjuntos de correo del que el formato tomó su nombre (Multipurpose Internet Mail Extensions). Navegadores, servidores y clientes de correo dependen de esa única línea de metadatos.",
            "Los tipos de nivel superior son pocos: text, image, audio, video, application, más algunos especiales como multipart y font. La información real la lleva el subtipo — application/json significa datos estructurados, application/pdf un documento, application/octet-stream significa \"bytes opacos, suerte\". Las convenciones de sufijo + (application/+json, +xml) indican la estructura interna del subtipo.",
            "Los parámetros siguen tras un punto y coma: text/html; charset=utf-8 declara la codificación de caracteres. Ahí vive una cantidad sorprendente de bugs — una página servida sin charset puede verse bien en un navegador y romperse en otro.",
          ],
        },
        {
          heading: "Por qué los navegadores husmean, y lo que te cuesta",
          paragraphs: [
            "Los servidores se equivocan a menudo con los tipos MIME: hosts mal configurados mandan texto plano con extensión .css, o todo como application/octet-stream. Para no romper, los navegadores históricamente adivinaban por el contenido — \"MIME sniffing\" — leyendo bytes mágicos (un PNG empieza con 89504E47, un PDF con %PDF) y renderizando en consecuencia. Ese comportamiento causó vulnerabilidades reales: servir contenido subido por usuarios como text/html deja al atacante ejecutar scripts en tu origen, razón por la que existe tooling de seguridad para desactivar el sniffing por respuesta.",
            "El contrato moderno: poner el Content-Type correcto en todo lo que sirvas, añadir cabeceras nosniff para contenido de usuarios, y nunca servir subidas como text/html. La base de datos de aquí es para comprobar ese contrato — antes de servir un tipo de archivo, consulta su tipo canónico en vez de inventar uno.",
            "El mapeo extensión-MIME es convención, no ley: un .dat puede ser cualquier cosa, y varios formatos comparten extensiones (.mp4 sirve para contenedores de audio y de vídeo). Ante la duda, husmea los bytes mágicos del archivo antes de declarar un tipo.",
          ],
        },
        {
          heading: "Tabla de referencia sin conexión",
          paragraphs: [
            "La tabla es una referencia estática que viaja con la página — las búsquedas ocurren al instante en tu navegador sin petición de red. Eso la hace usable en entornos aislados y lo bastante rápida para dejarla abierta junto a un archivo de configuración que estés editando.",
            "Para configuración de servidor, las búsquedas más comunes son del lado del servidor: tipos para fuentes (font/woff2), manifiestos (application/manifest+json) y media en streaming. Ajustarlos evita los síntomas clásicos — fuentes que fallan en silencio la comprobación CORS, hojas de estilo que se niegan a cargar con comprobación MIME estricta.",
            "Nada de tu tráfico o tus archivos queda registrado; la página es un diccionario, no un servicio. Combínala con las herramientas JSON al depurar respuestas de API cuyas cabeceras Content-Type son sospechosas.",
          ],
        },
      ],
    },
    pt: {
      name: "Tabela de tipos MIME",
      tagline: "Pesquise entre mais de 120 tipos MIME comuns por extensão ou prefixo MIME, com categoria e descrição, e copie qualquer tipo com um clique.",
      intro: [
        "Ao configurar um servidor web, um gerenciador de uploads, um cabeçalho CORS ou um filtro de anexos, você precisa do tipo MIME exato de cada extensão — e escolher no achismo entre image/jpg e image/jpeg faz os problemas surgirem em silêncio. Esta tabela cobre as extensões que realmente importam: recursos web, imagens, áudio e vídeo, documentos de escritório, compactados, fontes, configurações e algumas fontes de código.",
        "Filtre por extensão (com ou sem ponto) ou por prefixo MIME como text/ ou application/json. Cada linha tem cópia com um clique, então o que chega à área de transferência é exatamente a string que deve entrar na sua configuração.",
      ],
      steps: [
        "Digite uma extensão (pdf, .png) ou um prefixo MIME (audio/, video/web) no filtro.",
        "Veja as linhas correspondentes: extensão, tipo MIME, categoria e uma descrição curta.",
        "Clique em Copiar numa linha para levar o tipo MIME exato à área de transferência.",
      ],
      faqs: [
        {
          q: "Por que algumas entradas mostram text/javascript em vez de application/javascript?",
          a: "A RFC 9239 tornou application/javascript obsoleto em favor de text/javascript, e servidores WHATWG o usam por padrão. A tabela segue os padrões atuais onde mudaram, então o que você copia é o que servidores e validadores modernos esperam.",
        },
        {
          q: "É o registro completo da IANA?",
          a: "Não — a IANA lista mais de mil tipos registrados, muitos específicos de fornecedores ou históricos. Esta tabela concentra cerca de 120 entradas que aparecem de verdade em desenvolvimento web, configs de deploy e e-mail, com os valores corretos atuais.",
        },
        {
          q: "Por que .ts aparece duas vezes com categorias diferentes?",
          a: "A extensão é genuinamente ambígua: código-fonte TypeScript (text/x.typescript) e fluxos de transporte MPEG (video/mp2t) usam .ts. Servidores decidem pelo contexto do diretório, então verifique qual se aplica ao seu caso.",
        },
      ],
      deepDive: [
        {
          heading: "O que é realmente um tipo MIME",
          paragraphs: [
            "Um tipo MIME é um rótulo de duas partes — type/subtype, como text/html ou image/png — que diz ao receptor como interpretar a carga. O registro é mantido pela IANA, e os tipos descendem do sistema de anexos de e-mail que deu nome ao formato (Multipurpose Internet Mail Extensions). Navegadores, servidores e clientes de e-mail dependem dessa única linha de metadados.",
            "Os tipos de topo são poucos: text, image, audio, video, application, mais alguns especiais como multipart e font. A informação real vem no subtipo — application/json significa dados estruturados, application/pdf um documento, application/octet-stream significa \"bytes opacos, boa sorte\". As convenções de sufixo + (application/+json, +xml) indicam a estrutura interna do subtipo.",
            "Parâmetros vêm depois do ponto e vírgula: text/html; charset=utf-8 declara a codificação de caracteres. É aí que vive uma quantidade surpreendente de bugs — uma página servida sem charset pode renderizar bem num navegador e quebrar em outro.",
          ],
        },
        {
          heading: "Por que navegadores farejam, e o que isso te custa",
          paragraphs: [
            "Servidores erram com frequência nos tipos MIME: hosts mal configurados mandam texto puro com extensão .css, ou tudo como application/octet-stream. Para não quebrar, navegadores historicamente adivinhavam pelo conteúdo — \"MIME sniffing\" — lendo bytes mágicos (um PNG começa com 89504E47, um PDF com %PDF) e renderizando de acordo. Esse comportamento causou vulnerabilidades reais: servir conteúdo enviado por usuários como text/html deixa o atacante executar scripts na sua origem, razão pela qual existe instrumentação de segurança para desligar o sniffing por resposta.",
            "O contrato moderno: definir o Content-Type correto para tudo que você serve, adicionar cabeçalhos nosniff para conteúdo de usuários, e nunca servir uploads como text/html. O banco de dados daqui serve para conferir esse contrato — antes de servir um tipo de arquivo, consulte o tipo canônico em vez de inventar um.",
            "O mapeamento extensão-MIME é convenção, não lei: um .dat pode ser qualquer coisa, e vários formatos compartilham extensões (.mp4 serve para contêineres de áudio e de vídeo). Na dúvida, fareje os bytes mágicos do arquivo antes de declarar um tipo.",
          ],
        },
        {
          heading: "Tabela de referência offline",
          paragraphs: [
            "A tabela é uma referência estática que viaja com a página — as buscas acontecem na hora no seu navegador, sem requisição de rede. Isso a torna utilizável em ambientes isolados e rápida o bastante para ficar aberta ao lado de um arquivo de configuração que você esteja editando.",
            "Para configuração de servidor, as buscas mais comuns são do lado do servidor: tipos para fontes (font/woff2), manifests (application/manifest+json) e mídia em streaming. Acertá-los evita os sintomas clássicos — fontes que falham silenciosamente na checagem CORS, folhas de estilo que se recusam a carregar sob checagem MIME estrita.",
            "Nada do seu tráfego ou dos seus arquivos é registrado; a página é um dicionário, não um serviço. Combine com as ferramentas JSON ao depurar respostas de API cujos cabeçalhos Content-Type são suspeitos.",
          ],
        },
      ],
    },
  },
});
