import { UtilEngineChineseText } from "../_engines/util-engine-chinese-text";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "chinese-text-converter",
  category: "utility",
  icon: "swap",
  engine: { component: UtilEngineChineseText },
  related: ["lunar-calendar-converter", "character-frequency-counter", "chinese-id-validator", "text-sequence-generator"],
  copy: {
    en: {
      name: "Chinese Text Converter",
      tagline:
        "Convert between Simplified and Traditional Chinese instantly — Standard, Taiwan and Hong Kong variants supported. Free, private, offline-capable.",
      intro: [
        "Convert Chinese text between Simplified and Traditional scripts with OpenCC-quality mappings. Choose from four directions: Simplified → Traditional (standard), Simplified → Traditional Taiwan, Simplified → Traditional Hong Kong, or Traditional → Simplified.",
        "The conversion uses the OpenCC dictionaries, which handle not just character-level mapping but also vocabulary differences (e.g. 软件 → 軟體 in Taiwan vs 軟件 in Hong Kong). This is the same engine used by professional Chinese localisation workflows.",
        "All conversion runs locally in your browser through the opencc-js library — no uploads, no tracking. Supports up to 100,000 characters per conversion.",
      ],
      steps: [
        "Choose the conversion direction from the variant buttons.",
        "Paste or type the Chinese text you want to convert.",
        "Click Convert — the result appears below, ready to copy.",
      ],
      faqs: [
        {
          q: "What is the difference between Standard Traditional, Taiwan and Hong Kong variants?",
          a: "All three convert Simplified to Traditional Chinese characters, but Taiwan and Hong Kong variants also adapt vocabulary: 软件 becomes 軟體 in Taiwan and 軟件 in Hong Kong, reflecting regional usage differences.",
        },
        {
          q: "Is there a character limit?",
          a: "Yes, up to 100,000 characters per conversion. This covers most documents; for longer text, split it into chunks.",
        },
      ],
    },
    zh: {
      name: "简繁中文转换",
      tagline:
        "在浏览器内完成简体与繁体中文的双向转换——支持标准繁体、台湾正体与香港繁体。免费、即时、离线可用。",
      intro: [
        "简体与繁体中文的双向转换,使用 OpenCC 词典质量的专业映射。四种方向:简→繁(标准)、简→繁(台湾正体)、简→繁(香港繁体)、繁→简。",
        "OpenCC 不仅做字符级映射,还处理词汇差异(如 软件 在台湾正体中变为 軟體,在香港繁体中保持 軟件)——与专业中文本地化工作流使用的引擎一致。",
        "转换全部由本机的 opencc-js 库完成——无需注册、不上传,文本不会离开浏览器。单次最多支持 100,000 个字符。",
      ],
      steps: [
        "从变体按钮选择转换方向。",
        "粘贴或输入要转换的中文文本。",
        "点击转换——结果显示在下方,一键复制。",
      ],
      faqs: [
        {
          q: "标准繁体、台湾正体与香港繁体有什么区别?",
          a: "三者都将简体字转为繁体字,但台湾与香港变体还会适配词汇:软件在台湾正体中变为 軟體,在香港繁体中保持 軟件,反映地区用词差异。",
        },
        {
          q: "有字数限制吗?",
          a: "单次最多 100,000 个字符,覆盖绝大多数文档。更长的文本可以分段处理。",
        },
      ],
    },
    ja: {
      name: "中国語テキスト変換",
      tagline:
        "ブラウザ内で簡体字と繁体字の中国語テキストを双方向変換 — 標準・台湾・香港バリアント対応。無料・即時・オフライン。",
      intro: [
        "簡体字と繁体字の中国語テキストの双方向変換。OpenCC 品質のマッピングを使用:簡→繁(標準)、簡→繁(台湾)、簡→繁(香港)、繁→簡 の 4 方向。",
        "OpenCC は文字レベルのマッピングだけでなく、語彙の違いも処理します(例:软件 は台湾では 軟體、香港では 軟件)。専門的な中国語ローカリゼーションと同じエンジンです。",
        "変換はすべてブラウザ内の opencc-js ライブラリで行われます — アカウント不要、アップロードなし。1 回あたり最大 100,000 文字。",
      ],
      steps: [
        "バリアントボタンから変換方向を選択します。",
        "変換したい中国語テキストを入力します。",
        "変換ボタンをクリック — 結果が下に表示され、コピーできます。",
      ],
      faqs: [
        {
          q: "標準繁体字、台湾、香港のバリアントの違いは?",
          a: "すべて簡体字を繁体字に変換しますが、台湾と香港のバリアントは語彙も調整します:软件 は台湾で 軟體、香港で 軟件 になり、地域の使用慣習を反映します。",
        },
        {
          q: "文字数制限はありますか?",
          a: "1 回あたり最大 100,000 文字です。ほとんどのドキュメントをカバーします。長いテキストは分割して処理してください。",
        },
      ],
    },
    es: {
      name: "Conversor de texto chino",
      tagline:
        "Convierte entre chino simplificado y tradicional al instante — variantes estándar, Taiwán y Hong Kong. Gratis, privado, sin conexión.",
      intro: [
        "Conversión bidireccional entre chino simplificado y tradicional con mapeos de calidad OpenCC. Cuatro direcciones: Simplificado → Tradicional (estándar), Simplificado → Tradicional Taiwan, Simplificado → Tradicional Hong Kong, o Tradicional → Simplificado.",
        "Usa los diccionarios OpenCC, que manejan no solo el mapeo de caracteres sino también diferencias de vocabulario (软件 → 軟體 en Taiwán vs 軟件 en Hong Kong). Es el mismo motor que usan los flujos de localización chinos profesionales.",
        "Todo funciona localmente en tu navegador con opencc-js — sin cuentas, sin subidas. Soporta hasta 100,000 caracteres por conversión.",
      ],
      steps: [
        "Elige la dirección de conversión en los botones de variante.",
        "Pega o escribe el texto chino que quieres convertir.",
        "Haz clic en Convertir — el resultado aparece abajo, listo para copiar.",
      ],
      faqs: [
        {
          q: "¿Cuál es la diferencia entre los variantes estándar, Taiwán y Hong Kong?",
          a: "Los tres convierten caracteres simplificados a tradicionales, pero Taiwán y Hong Kong también adaptan vocabulario: 软件 se convierte en 軟體 en Taiwán y 軟件 en Hong Kong.",
        },
        {
          q: "¿Hay límite de caracteres?",
          a: "Sí, hasta 100,000 caracteres por conversión. Para textos más largos, divídelos en partes.",
        },
      ],
    },
    pt: {
      name: "Conversor de texto chinês",
      tagline:
        "Converta entre chinês simplificado e tradicional instantaneamente — variantes padrão, Taiwan e Hong Kong. Grátis, privado, offline.",
      intro: [
        "Conversão bidirecional entre chinês simplificado e tradicional com mapeamentos de qualidade OpenCC. Quatro direções: Simplificado → Tradicional (padrão), Simplificado → Tradicional Taiwan, Simplificado → Tradicional Hong Kong, ou Tradicional → Simplificado.",
        "Usa os dicionários OpenCC, que tratam não só o mapeamento de caracteres mas também diferenças de vocabulário (软件 → 軟體 em Taiwan vs 軟件 em Hong Kong). É o mesmo motor usado por fluxos de localização chineses profissionais.",
        "Tudo funciona localmente no seu navegador com opencc-js — sem contas, sem uploads. Suporta até 100,000 caracteres por conversão.",
      ],
      steps: [
        "Escolha a direção de conversão nos botões de variante.",
        "Cole ou digite o texto chinês que deseja converter.",
        "Clique em Converter — o resultado aparece abaixo, pronto para copiar.",
      ],
      faqs: [
        {
          q: "Qual é a diferença entre os variantes padrão, Taiwan e Hong Kong?",
          a: "Os três convertem caracteres simplificados para tradicionais, mas Taiwan e Hong Kong também adaptam vocabulário: 软件 torna-se 軟體 em Taiwan e 軟件 em Hong Kong.",
        },
        {
          q: "Existe limite de caracteres?",
          a: "Sim, até 100,000 caracteres por conversão. Para textos mais longos, divida em partes.",
        },
      ],
    },
  },
});
