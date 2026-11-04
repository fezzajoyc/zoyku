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
    },
  },
});
