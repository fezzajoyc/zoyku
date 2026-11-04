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
    },
  },
});
