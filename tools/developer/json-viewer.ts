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
    },
  },
});
