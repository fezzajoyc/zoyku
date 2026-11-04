import { DevEngineJsonPlus } from "../_engines/dev-engine-jsonplus";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "json-path-query",
  category: "developer",
  icon: "search",
  engine: { component: DevEngineJsonPlus, props: { mode: "query" } },
  related: ["json-formatter", "json-diff", "json-to-typescript", "md5-generator", "sha256-generator", "base64-image", "json-validator", "url-encoder", "html-minifier", "url-decoder"],
  copy: {
    en: {
      name: "JSON Path Query",
      tagline: "Extract any value from JSON with a path like $.user.name or $.items[0].id — instant, forgiving, no jq syntax to learn.",
      intro: [
        "Pulling one field out of a huge API response, sanity-checking a config value, or asserting on a nested payload in a test — a path query beats scrolling through pretty-printed JSON. Enter a path and the matching values appear instantly.",
        "Dot notation, array indexes and quoted keys all work ($.items[0].id, $['weird key']), so the everyday JSONPath subset needs no query-language learning. Results render as formatted JSON you can copy straight into code or a fixture.",
        "The evaluator runs entirely in the browser, walking the parsed document only as deep as the path requires — no regex over raw text, so keys containing dots or brackets still resolve once quoted.",
        "Full engines like JSONPath-plus or JMESPath bring dozens of operators — filters, wildcards, slices — with heavyweight syntax to match. This tool covers the common case of pointing at concrete values, with errors written in plain language (key not found, index out of range) instead of a library stack trace."
      ],
      steps: [
        "Paste your JSON.",
        "Type the path to the value you want — $ is the root.",
        "Copy the extracted value.",
      ],
      faqs: [
        {
          q: "Which path syntax is supported?",
          a: "The everyday subset: dot notation ($.a.b), array indexes ($.items[0]), quoted keys ($['odd key']). Full JSONPath filters and wildcards are out of scope — this tool is for direct extraction.",
        },
        {
          q: "What happens with a wrong path?",
          a: "You get the exact reason: which key was missing or which index was out of range. Nothing crashes.",
        },
      ],
    },
    zh: {
      name: "JSON Path 查询",
      tagline: "用 $.user.name 或 $.items[0].id 这样的路径从 JSON 提取任意值——即时、容错,不用学 jq 语法。",
      intro: [
        "精确指向你要的值:点号、数组下标、带引号的键都支持($.items[0].id、$['weird key'])。从庞大的接口响应里掏一个字段,就用它。",
        "永不崩溃——路径错了会返回人话原因(键不存在、下标越界),改一下重试即可。",
      ],
      steps: [
        "粘贴 JSON。",
        "输入目标值的路径——$ 表示根。",
        "复制提取出的值。",
      ],
      faqs: [
        {
          q: "支持什么路径语法?",
          a: "日常子集:点号($.a.b)、数组下标($.items[0])、引号键($['odd key'])。完整 JSONPath 的过滤器和通配符不在范围内——这个工具做直接提取。",
        },
        {
          q: "路径写错了会怎样?",
          a: "会返回具体原因:哪个键不存在、哪个下标越界。不会崩溃。",
        },
      ],
    },
    ja: {
      name: "JSON Path 検索",
      tagline: "$.user.name や $.items[0].id のようなパスで JSON から任意の値を抽出——即時・寛容・jq 構文不要。",
      intro: [
        "必要な値を正確に指し示す:ドット記法、配列インデックス、引用キーすべて対応($.items[0].id、$['weird key'])。巨大な API レスポンスから 1 フィールド取り出すのに最適。",
        "決してクラッシュしません——間違ったパスは理由(キー不在・インデックス範囲外)を平文で返します。",
      ],
      steps: [
        "JSON を貼り付け。",
        "目的の値へのパスを入力——$ はルート。",
        "抽出した値をコピー。",
      ],
      faqs: [
        {
          q: "対応するパス構文は?",
          a: "日常サブセット:ドット記法($.a.b)、配列インデックス($.items[0])、引用キー($['odd key'])。完全な JSONPath のフィルタやワイルドカードは対象外です。",
        },
        {
          q: "パスを間違えると?",
          a: "具体的な理由が返ります:どのキーが存在しないか、どのインデックスが範囲外か。クラッシュはしません。",
        },
      ],
    },
    es: {
      name: "Consulta JSON Path",
      tagline: "Extrae cualquier valor de JSON con una ruta como $.user.name o $.items[0].id — instantáneo, tolerante, sin aprender jq.",
      intro: [
        "Apunta exactamente al valor que necesitas: notación de punto, índices de array y claves entrecomilladas funcionan ($.items[0].id, $['weird key']). Ideal para sacar un campo de una respuesta enorme.",
        "Nunca falla — una ruta mala devuelve una razón en lenguaje claro (clave no encontrada, índice fuera de rango).",
      ],
      steps: [
        "Pega tu JSON.",
        "Escribe la ruta al valor — $ es la raíz.",
        "Copia el valor extraído.",
      ],
      faqs: [
        {
          q: "¿Qué sintaxis de ruta soporta?",
          a: "El subconjunto diario: puntos ($.a.b), índices ($.items[0]), claves entrecomilladas ($['odd key']). Los filtros y comodines de JSONPath completo no están incluidos.",
        },
        {
          q: "¿Qué pasa con una ruta mala?",
          a: "Obtienes la razón exacta: qué clave faltó o qué índice se salió del rango. Nada se rompe.",
        },
      ],
    },
    pt: {
      name: "Consulta JSON Path",
      tagline: "Extraia qualquer valor de JSON com um caminho como $.user.name ou $.items[0].id — instantâneo, tolerante, sem aprender jq.",
      intro: [
        "Aponte exatamente para o valor que precisa: notação de ponto, índices de array e chaves entre aspas funcionam ($.items[0].id, $['weird key']). Ideal para tirar um campo de uma resposta enorme.",
        "Nunca quebra — um caminho errado retorna a razão em linguagem clara (chave não encontrada, índice fora do intervalo).",
      ],
      steps: [
        "Cole seu JSON.",
        "Digite o caminho até o valor — $ é a raiz.",
        "Copie o valor extraído.",
      ],
      faqs: [
        {
          q: "Qual sintaxe de caminho é suportada?",
          a: "O subconjunto diário: pontos ($.a.b), índices ($.items[0]), chaves entre aspas ($['odd key']). Filtros e curingas do JSONPath completo ficam fora do escopo.",
        },
        {
          q: "E se o caminho estiver errado?",
          a: "Você recebe a razão exata: qual chave faltou ou qual índice saiu do intervalo. Nada quebra.",
        },
      ],
    },
  },
});
