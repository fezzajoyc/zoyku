import { DevCodeEngine } from "../_engines/dev-engine-code";
import { defineTool } from "../_lib/types";

const SAMPLE = '{"name":"Zoyku","tags":["dev","json"],"nested":{"ok":true,"count":3}}';

export default defineTool({
  slug: "json-formatter",
  category: "developer",
  icon: "code",
  featured: true,
  engine: { component: DevCodeEngine, props: { mode: "json-beautify", indent: true, sort: true, sample: SAMPLE } },
  related: ["json-validator", "json-minifier", "json-to-csv", "csv-to-json", "markdown-previewer", "md5-generator", "sha256-generator", "base64-image", "url-encoder", "html-minifier"],
  copy: {
    en: {
      name: "JSON Formatter",
      tagline:
        "Format and beautify messy JSON online — 2 spaces, 4 spaces or tabs, with instant validation and precise error locations. 100% in your browser.",
      intro: [
        "Paste minified or badly indented JSON and get clean, readable output immediately. Choose 2 spaces, 4 spaces or tab indentation, and the result updates live as you type or edit — perfect for inspecting API responses, config files and log payloads. Frontend developers debugging fetch() payloads, backend engineers reading service logs, and QA staff reviewing captured request bodies all hit this task daily.",
        "Formatting only changes whitespace, never data: keys, values and key order stay byte-for-byte identical, only line breaks and indentation are added. Numbers are parsed as IEEE-754 doubles like in every JavaScript engine, so integers above 2^53 (for example IDs like 9007199254740993) can display rounded — paste them as strings if exact digits matter.",
        "Parsing follows the JSON grammar from RFC 8259: the document must be a single object, array, string, number, boolean or null. On success the formatter re-serializes with your chosen indentation; on failure it reports the exact line and column of the syntax error, so a missing comma or bracket takes seconds to find instead of minutes.",
        "A minifier does the opposite job — stripping all whitespace into one line for transport — and this tool pairs with that workflow: beautify to read, minify to ship. Compared with a plain validator, you also get a copyable, readable version; compared with an editor's built-in formatter, no project setup, plugin or file save is required.",

      ],
      steps: [
        "Paste your JSON into the input box.",
        "Pick an indentation: 2 spaces, 4 spaces or a tab.",
        "Copy the beautified result — or fix the reported line and column if the JSON is invalid.",
      ],
      faqs: [
        {
          q: "Is there a size limit for the JSON I can format?",
          a: "There is no hard limit — formatting happens locally in your browser. Very large files (tens of MB) may feel slow because the result recalculates as you type, so paste them in one go and edit carefully.",
        },
        {
          q: "Does formatting change my data?",
          a: "No. The values, key order and structure stay exactly the same; only whitespace and line breaks are added. The output is byte-for-byte equivalent JSON.",
        },
        {
          q: "Is my JSON uploaded to a server?",
          a: "No. Everything runs locally in your browser with JavaScript — your data never leaves your device.",
        },
      ],
    },
    zh: {
      name: "JSON 格式化",
      tagline: "在线美化凌乱的 JSON——支持 2 空格、4 空格或 Tab 缩进,即时校验并精确报错,全程在浏览器本地完成。",
      intro: [
        "粘贴压缩过或缩进混乱的 JSON,立即得到干净易读的结果。可选 2 空格、4 空格或 Tab 缩进,边输入边刷新——适合查看 API 响应、配置文件和日志负载。",
        "JSON 不合法也不会卡住:格式化工具会精确定位语法错误所在的行和列,少个逗号、少个括号几秒钟就能找到。",
      ],
      steps: [
        "把 JSON 粘贴到输入框。",
        "选择缩进:2 空格、4 空格或 Tab。",
        "复制美化结果;若 JSON 不合法,按提示的行列位置修复即可。",
      ],
      faqs: [
        {
          q: "能格式化的 JSON 有大小限制吗?",
          a: "没有硬性限制——格式化在浏览器本地完成。超大文件(几十 MB)因为边输入边计算可能变慢,建议整段粘贴后小心编辑。",
        },
        {
          q: "格式化会改动我的数据吗?",
          a: "不会。值、键顺序和结构完全不变,只增加空白和换行,输出与原文在数据上完全等价。",
        },
        {
          q: "JSON 会被上传到服务器吗?",
          a: "不会。一切都在浏览器里用 JavaScript 本地完成,数据不会离开你的设备。",
        },
      ],
    },
    ja: {
      name: "JSON フォーマッター",
      tagline:
        "乱れた JSON をオンラインで整形 — 2 スペース・4 スペース・タブに対応し、即時検証と正確なエラー位置表示。すべてブラウザ内で完結します。",
      intro: [
        "圧縮された JSON やインデントが崩れた JSON を貼り付けるだけで、すぐに読みやすい出力に。2 スペース・4 スペース・タブから選べ、入力しながらリアルタイムで更新されます。API レスポンス・設定ファイル・ログの確認に最適です。",
        "JSON が不正でも困りません。構文エラーの行と列を正確に表示するので、カンマや括弧の抜けも数秒で見つかります。",
      ],
      steps: [
        "JSON を入力欄に貼り付けます。",
        "インデントを選択:2 スペース・4 スペース・タブ。",
        "整形結果をコピー。不正な場合は表示された行・列を修正します。",
      ],
      faqs: [
        {
          q: "整形できる JSON にサイズ上限はありますか?",
          a: "上限はありません。整形はブラウザ内で完結します。ただし非常に大きなファイル(数十 MB)は入力ごとに再計算されるため遅くなることがあります。",
        },
        {
          q: "整形によってデータは変わりますか?",
          a: "いいえ。値・キーの順序・構造はそのまま、空白と改行が追加されるだけです。データとしては完全に等価です。",
        },
        {
          q: "JSON はサーバーに送信されますか?",
          a: "いいえ。すべてブラウザ内の JavaScript でローカルに処理され、データは端末の外に出ません。",
        },
      ],
    },
    es: {
      name: "Formateador JSON",
      tagline:
        "Formatea y embellece JSON desordenado en línea: 2 espacios, 4 espacios o tabulaciones, con validación instantánea y errores localizados al carácter.",
      intro: [
        "Pega JSON minificado o mal indentado y obtén una salida limpia al instante. Elige 2 espacios, 4 espacios o tabulación; el resultado se actualiza mientras escribes — ideal para inspeccionar respuestas de API, archivos de configuración y logs.",
        "Un JSON inválido no es un callejón sin salida: el formateador señala la línea y columna exactas del error de sintaxis, así que una coma o llave perdida se encuentra en segundos.",
      ],
      steps: [
        "Pega tu JSON en el cuadro de entrada.",
        "Elige la indentación: 2 espacios, 4 espacios o tabulación.",
        "Copia el resultado formateado, o corrige la línea y columna indicadas si el JSON es inválido.",
      ],
      faqs: [
        {
          q: "¿Hay un límite de tamaño para el JSON?",
          a: "No hay límite estricto: el formateo ocurre localmente en tu navegador. Archivos muy grandes (decenas de MB) pueden ir lentos porque el resultado se recalcula al escribir.",
        },
        {
          q: "¿El formateo cambia mis datos?",
          a: "No. Los valores, el orden de las claves y la estructura se mantienen; solo se añaden espacios y saltos de línea. El JSON resultante es equivalente.",
        },
        {
          q: "¿Mi JSON se sube a algún servidor?",
          a: "No. Todo se ejecuta localmente en tu navegador con JavaScript: tus datos nunca salen de tu dispositivo.",
        },
      ],
    },
    pt: {
      name: "Formatador JSON",
      tagline:
        "Formate e embeleze JSON desorganizado on-line — 2 espaços, 4 espaços ou tabulação, com validação instantânea e erros localizados. Tudo no seu navegador.",
      intro: [
        "Cole JSON minificado ou mal indentado e receba uma saída limpa na hora. Escolha 2 espaços, 4 espaços ou tabulação; o resultado atualiza enquanto você digita — perfeito para inspecionar respostas de API, arquivos de configuração e logs.",
        "JSON inválido não é problema: o formatador aponta a linha e a coluna exatas do erro de sintaxe, então uma vírgula ou chave faltando aparece em segundos.",
      ],
      steps: [
        "Cole seu JSON na caixa de entrada.",
        "Escolha a indentação: 2 espaços, 4 espaços ou tabulação.",
        "Copie o resultado formatado — ou corrija a linha e coluna indicadas se o JSON for inválido.",
      ],
      faqs: [
        {
          q: "Existe limite de tamanho para o JSON?",
          a: "Não há limite rígido — a formatação acontece localmente no navegador. Arquivos muito grandes (dezenas de MB) podem ficar lentos porque o resultado é recalculado a cada digitação.",
        },
        {
          q: "A formatação altera meus dados?",
          a: "Não. Valores, ordem das chaves e estrutura permanecem idênticos; apenas espaços e quebras de linha são adicionados. O JSON resultante é equivalente.",
        },
        {
          q: "Meu JSON é enviado para um servidor?",
          a: "Não. Tudo roda localmente no seu navegador com JavaScript — seus dados nunca saem do seu dispositivo.",
        },
      ],
    },
  },
});
