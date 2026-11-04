import { DevUrlParserEngine } from "../_engines/dev-url-parser";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "url-parser",
  category: "developer",
  icon: "link",
  engine: {
    component: DevUrlParserEngine,
    props: {
      sample: "https://example.com/shop/shoes?color=red&size=42&utm_source=newsletter#reviews",
    },
  },
  related: ["url-decoder", "url-encoder", "http-status-codes", "jwt-decoder", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "html-minifier"],
  copy: {
    en: {
      name: "URL Parser",
      tagline:
        "Paste any URL and see it decomposed live: protocol, host, port, each path segment, decoded query parameters and hash — with copy as JSON.",
      intro: [
        "A URL hides a dozen pieces of data in one line. This tool splits it into labeled rows — scheme, host, port, every path segment on its own line, each query parameter with its key and decoded value, plus the fragment — so you can audit tracking links, debug routing or reverse-engineer an API call.",
        "Parsing uses the browser's native URL API: values are decoded exactly the way the receiving server will decode them. URLs without a scheme get https:// assumed, and malformed input gets a plain-language error instead of a crash.",
      ],
      steps: [
        "Paste the URL into the input box.",
        "Read the decomposed table: parts, segments and parameters update live.",
        "Copy as JSON when you need the breakdown in code or documentation.",
      ],
      faqs: [
        {
          q: "What happens if I paste a URL without https://?",
          a: "The tool assumes https:// and tries again, since that is what browsers do for bare domains. A scheme you typed explicitly is always kept as-is.",
        },
        {
          q: "Are query values decoded?",
          a: "Yes. Keys and values are decoded via the URL standard, so %20 becomes a space and %2F becomes a slash, exactly as the server would read them.",
        },
        {
          q: "What about duplicate query keys like ?tag=a&tag=b?",
          a: "Each occurrence gets its own row, and the JSON export lists them as separate key/value pairs so nothing is silently overwritten.",
        },
      ],
    },
    zh: {
      name: "URL 解析器",
      tagline: "粘贴任意 URL,实时拆解为协议、主机、端口、逐级路径、解码后的查询参数和锚点,并可一键复制为 JSON。",
      intro: [
        "一行 URL 里藏着十几段信息。这个工具把它拆成带标签的行——协议、主机、端口、每级路径单独一行、每个查询参数的键和解码后的值,加上锚点——排查推广链接、调试路由或逆向 API 调用时一目了然。",
        "解析使用浏览器原生 URL API:值的解码方式和接收服务器完全一致。没有协议头的 URL 会自动按 https:// 重试,畸形输入会给出友好提示而不是报错崩溃。",
      ],
      steps: [
        "把 URL 粘贴进输入框。",
        "阅读拆解结果:各部分、路径段和参数实时更新。",
        "需要写进代码或文档时,点击复制为 JSON。",
      ],
      faqs: [
        {
          q: "粘贴不带 https:// 的 URL 会怎样?",
          a: "工具会自动补上 https:// 重试,和浏览器处理裸域名的行为一致;如果显式写了协议头,则原样保留。",
        },
        {
          q: "查询参数的值会解码吗?",
          a: "会。键和值都按 URL 标准解码,%20 变空格、%2F 变斜杠,与服务器读取到的一致。",
        },
        {
          q: "像 ?tag=a&tag=b 这样重复的键怎么处理?",
          a: "每次出现各占一行,JSON 导出中也是独立的键值对,不会被悄悄覆盖。",
        },
      ],
    },
    ja: {
      name: "URL パーサー",
      tagline:
        "URL を貼り付けるとプロトコル・ホスト・ポート・各パスセグメント・デコード済みクエリ・ハッシュにリアルタイム分解、JSON コピーも可能。",
      intro: [
        "1 行の URL には多くの情報が詰まっています。このツールはスキーム、ホスト、ポート、各パスセグメント、クエリのキーとデコード済みの値、フラグメントを行ごとに分解します。トラッキングリンクの監査、ルーティングのデバッグ、API 呼び出しの解析に役立ちます。",
        "解析にはブラウザ純正の URL API を使用し、値は受信サーバーと同じ規則でデコードされます。スキームのない URL は https:// を補って再試行し、不正な入力にはクラッシュではなくわかりやすいエラーを表示します。",
      ],
      steps: [
        "URL を入力欄に貼り付けます。",
        "分解結果を読みます:各部・セグメント・パラメータはリアルタイム更新。",
        "コードや文書に使うときは「JSON としてコピー」を押します。",
      ],
      faqs: [
        {
          q: "https:// を付けずに貼るとどうなりますか?",
          a: "ブラウザが素のドメインに対してそうするように、https:// を補って再試行します。明示的に書かれたスキームはそのまま使われます。",
        },
        {
          q: "クエリの値はデコードされますか?",
          a: "はい。キーと値は URL 標準に従ってデコードされ、%20 は空白、%2F はスラッシュになります。サーバーが読むのと同じ結果です。",
        },
        {
          q: "?tag=a&tag=b のような重複キーは?",
          a: "出現ごとに別の行として表示し、JSON 書き出しでも独立したキーと値のペアになるため、上書きされることはありません。",
        },
      ],
    },
    es: {
      name: "Analizador de URLs",
      tagline:
        "Pega cualquier URL y verla descompuesta en vivo: protocolo, host, puerto, cada segmento de ruta, parámetros decodificados y hash, con copia a JSON.",
      intro: [
        "Una URL esconde una docena de datos en una sola línea. Esta herramienta la separa en filas etiquetadas — esquema, host, puerto, cada segmento de ruta en su línea, cada parámetro con clave y valor decodificado, más el fragmento — para auditar enlaces de seguimiento, depurar rutas o reconstruir una llamada a una API.",
        "El análisis usa la API URL nativa del navegador: los valores se decodifican tal y como los leerá el servidor. Las URL sin esquema prueban con https://, y la entrada mal formada produce un error en lenguaje claro, no un fallo.",
      ],
      steps: [
        "Pega la URL en el cuadro de entrada.",
        "Lee la tabla descompuesta: partes, segmentos y parámetros se actualizan en vivo.",
        "Copia como JSON cuando necesites el desglose en código o documentación.",
      ],
      faqs: [
        {
          q: "¿Qué pasa si pego una URL sin https://?",
          a: "La herramienta asume https:// y reintenta, como hacen los navegadores con dominios desnudos. Un esquema escrito explícitamente se respeta tal cual.",
        },
        {
          q: "¿Se decodifican los valores de la query?",
          a: "Sí. Claves y valores se decodifican según el estándar URL: %20 pasa a espacio y %2F a barra, igual que los leerá el servidor.",
        },
        {
          q: "¿Y las claves duplicadas como ?tag=a&tag=b?",
          a: "Cada aparición tiene su propia fila, y la exportación JSON las lista como pares independientes para que nada se sobrescriba en silencio.",
        },
      ],
    },
    pt: {
      name: "Analisador de URLs",
      tagline:
        "Cole qualquer URL e veja-a decomposta ao vivo: protocolo, host, porta, cada segmento do caminho, parâmetros decodificados e hash, com cópia em JSON.",
      intro: [
        "Uma URL esconde uma dúzia de dados numa linha só. Esta ferramenta separa tudo em linhas rotuladas — esquema, host, porta, cada segmento do caminho na sua linha, cada parâmetro com chave e valor decodificado, além do fragmento — para auditar links de rastreamento, depurar rotas ou reconstituir uma chamada de API.",
        "A análise usa a API URL nativa do navegador: os valores são decodificados exatamente como o servidor vai ler. URLs sem esquema tentam com https://, e entrada malformada gera um erro em linguagem clara, não um travamento.",
      ],
      steps: [
        "Cole a URL na caixa de entrada.",
        "Leia a tabela decomposta: partes, segmentos e parâmetros atualizam ao vivo.",
        "Copie como JSON quando precisar do detalhamento em código ou documentação.",
      ],
      faqs: [
        {
          q: "E se eu colar uma URL sem https://?",
          a: "A ferramenta assume https:// e tenta de novo, como os navegadores fazem com domínios puros. Um esquema digitado explicitamente é mantido como está.",
        },
        {
          q: "Os valores da query são decodificados?",
          a: "Sim. Chaves e valores são decodificados conforme o padrão URL: %20 vira espaço e %2F vira barra, igual ao que o servidor lê.",
        },
        {
          q: "E chaves duplicadas como ?tag=a&tag=b?",
          a: "Cada ocorrência ganha sua própria linha, e a exportação JSON as lista como pares independentes — nada é sobrescrito em silêncio.",
        },
      ],
    },
  },
});
