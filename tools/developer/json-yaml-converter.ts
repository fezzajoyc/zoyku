import { DevEngineYaml } from "../_engines/dev-engine-yaml";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "json-yaml-converter",
  category: "developer",
  icon: "swap",
  engine: { component: DevEngineYaml, props: { mode: "json2yaml" } },
  related: ["json-formatter", "json-minifier", "json-to-typescript", "md5-generator", "sha256-generator", "base64-image", "json-validator", "url-encoder", "html-minifier", "url-decoder"],
  copy: {
    en: {
      name: "JSON ⇄ YAML Converter",
      tagline: "Convert JSON to YAML and back — config-file ready, with a swap-to-continue workflow and precise error messages.",
      intro: [
        "Two-way conversion between JSON and YAML: paste JSON, get clean 2-space YAML for your config files; paste YAML, get JSON. The swap button flips the direction so you can round-trip in one panel.",
        "Powered by js-yaml with precise error reporting — a bad indent or duplicate key shows you exactly what went wrong instead of a cryptic failure.",
      ],
      steps: [
        "Paste JSON or YAML depending on direction.",
        "Click convert — output appears below.",
        "Use the swap button to continue converting in the other direction.",
      ],
      faqs: [
        {
          q: "Which YAML features are supported?",
          a: "The standard js-yaml core schema: nested maps, sequences, scalars, quoted strings. YAML anchors and custom tags are out of scope for reliable round-trips.",
        },
        {
          q: "Why did my conversion fail?",
          a: "Most often a tab character in YAML indentation (tabs are forbidden there) or duplicate keys in JSON. The error message points at the problem.",
        },
      ],
    },
    zh: {
      name: "JSON ⇄ YAML 转换",
      tagline: "JSON 与 YAML 双向互转——配置文件即用,支持方向切换接力,报错精确到问题所在。",
      intro: [
        "JSON 与 YAML 双向转换:粘贴 JSON 得到干净的 2 空格 YAML 配置;粘贴 YAML 得到 JSON。交换按钮直接翻转方向,一个面板完成往返。",
        "由 js-yaml 驱动,报错精确——YAML 里的 tab 缩进或 JSON 重复键都会明确指出问题,而不是一句晦涩的失败。",
      ],
      steps: [
        "按方向粘贴 JSON 或 YAML。",
        "点击转换,结果显示在下方。",
        "用交换按钮翻转方向继续转换。",
      ],
      faqs: [
        {
          q: "支持哪些 YAML 特性?",
          a: "js-yaml 标准核心模式:嵌套映射、序列、标量、引号字符串。YAML 锚点和自定义标签为保证往返可靠不在范围内。",
        },
        {
          q: "为什么转换失败了?",
          a: "最常见是 YAML 缩进里用了 tab(缩进禁止 tab)或 JSON 有重复键。错误信息会指出具体问题。",
        },
      ],
    },
    ja: {
      name: "JSON ⇄ YAML 変換",
      tagline: "JSON と YAML の双方向変換——設定ファイルそのまま、方向スワップで往復、エラーは箇所まで特定。",
      intro: [
        "JSON と YAML の双方向変換:JSON を貼れば 2 スペースインデントのきれいな YAML に。YAML を貼れば JSON に。スワップボタンで方向を反転し、1 パネルで往復できます。",
        "js-yaml 搭載でエラーも正確——YAML のタブインデントや JSON の重複キーを曖昧な失敗ではなく具体的に指摘します。",
      ],
      steps: [
        "方向に応じて JSON か YAML を貼り付け。",
        "変換をクリック——下に出力。",
        "スワップボタンで逆方向へ継続。",
      ],
      faqs: [
        {
          q: "対応する YAML 機能は?",
          a: "js-yaml のコア スキーマ:ネスト マップ、シーケンス、スカラー、引用文字列。アンカーやカスタムタグは確実な往復のため対象外です。",
        },
        {
          q: "変換が失敗するのは?",
          a: "多くは YAML インデントのタブ(インデントにタブは禁止)か JSON の重複キーです。エラー メッセージが問題箇所を示します。",
        },
      ],
    },
    es: {
      name: "Convertidor JSON ⇄ YAML",
      tagline: "Convierte JSON a YAML y viceversa — listo para archivos de configuración, con cambio de dirección y errores precisos.",
      intro: [
        "Conversión bidireccional entre JSON y YAML: pega JSON y obtén YAML limpio de 2 espacios; pega YAML y obtén JSON. El botón de intercambio invierte la dirección para ida y vuelta en un panel.",
        "Impulsado por js-yaml con errores precisos: un tabulador en la indentación o claves duplicadas se señalan exactamente.",
      ],
      steps: [
        "Pega JSON o YAML según la dirección.",
        "Pulsa convertir — la salida aparece abajo.",
        "Usa el botón de intercambio para seguir en la otra dirección.",
      ],
      faqs: [
        {
          q: "¿Qué funciones YAML soporta?",
          a: "El esquema core de js-yaml: mapas anidados, secuencias, escalares, cadenas entrecomilladas. Anclas y etiquetas personalizadas quedan fuera para garantizar ida y vuelta fiable.",
        },
        {
          q: "¿Por qué falló mi conversión?",
          a: "Lo más común: un tabulador en la indentación YAML (prohibido) o claves duplicadas en JSON. El mensaje señala el problema.",
        },
      ],
    },
    pt: {
      name: "Conversor JSON ⇄ YAML",
      tagline: "Converta JSON para YAML e vice-versa — pronto para arquivos de configuração, com troca de direção e erros precisos.",
      intro: [
        "Conversão bidirecional entre JSON e YAML: cole JSON e receba YAML limpo com 2 espaços; cole YAML e receba JSON. O botão de troca inverte a direção para ir e voltar num painel só.",
        "Powered by js-yaml com erros precisos — um tab na indentação ou chaves duplicadas são apontados exatamente.",
      ],
      steps: [
        "Cole JSON ou YAML conforme a direção.",
        "Clique em converter — a saída aparece abaixo.",
        "Use o botão de troca para continuar na outra direção.",
      ],
      faqs: [
        {
          q: "Quais recursos YAML são suportados?",
          a: "O esquema core do js-yaml: mapas aninhados, sequências, escalares, strings entre aspas. Âncoras e tags personalizadas ficam de fora para garantir ida e volta confiável.",
        },
        {
          q: "Por que minha conversão falhou?",
          a: "Na maioria das vezes é um tab na indentação YAML (proibido) ou chaves duplicadas no JSON. A mensagem aponta o problema.",
        },
      ],
    },
  },
});
