import { CalcEngineColor } from "../_engines/calc-engine-color";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "color-converter",
  category: "utility",
  icon: "palette",
  engine: { component: CalcEngineColor, props: { kind: "converter" } },
  related: ["color-picker", "qr-generator", "aspect-ratio-calculator", "uuid-generator"],
  copy: {
    en: {
      name: "Color Converter",
      tagline: "Paste a color in hex, rgb() or hsl() and get all three formats plus a ready-made row of tints and shades for your design system.",
      intro: [
        "Feed it #0071e3, rgb(0, 113, 227) or hsl(211, 100%, 45%) — the parser detects the format automatically and outputs hex, RGB and HSL at once, each with a one-click copy.",
        "Below the values, a tint-and-shade row mixes your color with white and black at 20/40/60/80% steps: instant hover states, borders and dark-mode variants without opening a design tool.",
      ],
      steps: [
        "Paste a color in any of the three formats — hex, rgb() or hsl().",
        "Read the converted values and copy the one you need.",
        "Grab tints and shades from the swatch row below.",
      ],
      faqs: [
        {
          q: "How is HSL converted to RGB?",
          a: "Through the standard Cylindrical–RGB mapping: chromaticity c = (1 − |2L − 1|) × S, an intermediate value x determined by the hue sector, then each channel is offset by m = L − c/2. The math is the textbook formulas, so results match design tools.",
        },
        {
          q: "Why does my color code show as invalid?",
          a: "Accepted forms are #RGB / #RRGGBB, rgb(r, g, b) and hsl(h, s%, l%). Channels must be in range (0–255 for RGB, 0–360 for hue, 0–100% for the rest) and each part separated by a comma or space.",
        },
        {
          q: "What are tints and shades good for?",
          a: "Tints (mixed with white) make hover backgrounds, badges and cards; shades (mixed with black) make pressed states, borders and dark-mode surfaces. Deriving both from one brand color keeps every UI state visually consistent.",
        },
      ],
    },
    zh: {
      name: "颜色转换器",
      tagline: "粘贴 hex、rgb() 或 hsl() 格式的颜色,一次得到三种格式,外加一排现成的明暗色阶,设计系统直接取用。",
      intro: [
        "输入 #0071e3、rgb(0, 113, 227) 或 hsl(211, 100%, 45%)——解析器自动识别格式,同时输出 hex、RGB 和 HSL 三种写法,均可一键复制。",
        "数值下方是明暗色阶行:按 20/40/60/80% 与白色和黑色混合——悬停背景、边框和深色模式变体无需打开设计工具就能拿到。",
      ],
      steps: [
        "粘贴任意一种格式的颜色——hex、rgb() 或 hsl()。",
        "查看转换结果并复制所需格式。",
        "从下方色阶行获取明色和暗色变体。",
      ],
      faqs: [
        {
          q: "HSL 是怎么转换成 RGB 的?",
          a: "通过标准圆柱坐标到 RGB 的映射:色度 c = (1 − |2L − 1|) × S,中间量 x 由色相所在区间决定,各通道再加偏移 m = L − c/2。用的是教科书公式,结果与设计工具一致。",
        },
        {
          q: "为什么我的颜色代码提示无效?",
          a: "支持的写法是 #RGB / #RRGGBB、rgb(r, g, b) 和 hsl(h, s%, l%)。通道要在范围内(RGB 为 0–255,色相 0–360,其余 0–100%),各部分用逗号或空格分隔。",
        },
        {
          q: "明暗色阶有什么用?",
          a: "明色(混白)适合悬停背景、徽章和卡片;暗色(混黑)适合按压态、边框和深色模式表面。从同一个品牌色派生所有状态,视觉上才够统一。",
        },
      ],
    },
    ja: {
      name: "カラーコンバーター",
      tagline: "hex・rgb()・hsl() の色を貼り付ければ 3 形式まとめて変換。さらにティント&シェードの段階表まで自動生成します。",
      intro: [
        "#0071e3、rgb(0, 113, 227)、hsl(211, 100%, 45%) のいずれでも入力できます。形式は自動判別され、hex・RGB・HSL が同時に出力され、どれもワンクリックでコピー可能です。",
        "値の下には、白と黒に 20/40/60/80% ずつ混ぜたティント&シェードの行があります。ホバー状態・枠線・ダークモード向けのバリエーションをデザインツールなしで即座に用意できます。",
      ],
      steps: [
        "hex・rgb()・hsl() のいずれかの形式で色を貼り付けます。",
        "変換結果を確認し、必要な形式をコピーします。",
        "下の段階表から明るい色・暗い色を取得します。",
      ],
      faqs: [
        {
          q: "HSL から RGB へはどう変換しますか?",
          a: "標準の円筒座標→RGB 変換を使います。彩度成分 c = (1 − |2L − 1|) × S、色相の区間で決まる中間値 x、そして各チャネルに m = L − c/2 を加える形です。教科書どおりの式なので、デザインツールと同じ結果になります。",
        },
        {
          q: "色コードが無効になるのはなぜですか?",
          a: "受け付けるのは #RGB / #RRGGBB、rgb(r, g, b)、hsl(h, s%, l%) です。各チャネルは範囲内(RGB は 0–255、色相は 0–360、他は 0–100%)で、各部はカンマか空白で区切ります。",
        },
        {
          q: "ティントとシェードは何に使いますか?",
          a: "ティント(白と混合)はホバー背景・バッジ・カード向き、シェード(黒と混合)は押下状態・枠線・ダークモードの表面向きです。1 つのブランドカラーから派生させると、UI の状態全体が視覚的にそろいます。",
        },
      ],
    },
    es: {
      name: "Conversor de colores",
      tagline: "Pegue un color en hex, rgb() o hsl() y obtenga los tres formatos más una fila de tonos y sombras lista para su sistema de diseño.",
      intro: [
        "Entréguele #0071e3, rgb(0, 113, 227) o hsl(211, 100%, 45%): el analizador detecta el formato solo y devuelve hex, RGB y HSL a la vez, cada uno copiable con un clic.",
        "Bajo los valores, una fila de tonos y sombras mezcla su color con blanco y negro en pasos del 20/40/60/80%: estados hover, bordes y variantes de modo oscuro al instante, sin abrir una herramienta de diseño.",
      ],
      steps: [
        "Pegue un color en cualquiera de los tres formatos: hex, rgb() u hsl().",
        "Lea los valores convertidos y copie el que necesite.",
        "Tome tonos y sombras de la fila de muestras inferior.",
      ],
      faqs: [
        {
          q: "¿Cómo se convierte HSL a RGB?",
          a: "Mediante la correspondencia cilíndrica estándar: cromacidad c = (1 − |2L − 1|) × S, un valor intermedio x fijado por el sector del tono y un desplazamiento m = L − c/2 en cada canal. Son las fórmulas de manual, así que los resultados coinciden con las herramientas de diseño.",
        },
        {
          q: "¿Por qué mi código de color aparece como no válido?",
          a: "Las formas aceptadas son #RGB / #RRGGBB, rgb(r, g, b) y hsl(h, s%, l%). Los canales deben estar en rango (0–255 para RGB, 0–360 para el tono, 0–100% para el resto) y separados por comas o espacios.",
        },
        {
          q: "¿Para qué sirven los tonos y sombras?",
          a: "Los tonos (mezclados con blanco) sirven para fondos hover, insignias y tarjetas; las sombras (mezcladas con negro) para estados pulsados, bordes y superficies oscuras. Derivar ambos de un único color de marca mantiene la UI coherente.",
        },
      ],
    },
    pt: {
      name: "Conversor de cores",
      tagline: "Cole uma cor em hex, rgb() ou hsl() e receba os três formatos mais uma fileira de tons e sombras pronta para o seu design system.",
      intro: [
        "Informe #0071e3, rgb(0, 113, 227) ou hsl(211, 100%, 45%) — o parser detecta o formato automaticamente e devolve hex, RGB e HSL de uma vez, cada um com cópia em um clique.",
        "Abaixo dos valores, uma fileira de tons e sombras mistura a cor com branco e preto em passos de 20/40/60/80%: estados hover, bordas e variantes de modo escuro na hora, sem abrir ferramenta de design.",
      ],
      steps: [
        "Cole uma cor em qualquer dos três formatos — hex, rgb() ou hsl().",
        "Veja os valores convertidos e copie o que precisar.",
        "Pegue tons e sombras na fileira de amostras abaixo.",
      ],
      faqs: [
        {
          q: "Como o HSL é convertido em RGB?",
          a: "Pelo mapeamento cilíndrico padrão: croma c = (1 − |2L − 1|) × S, um valor intermediário x definido pelo setor do matiz e um deslocamento m = L − c/2 em cada canal. São as fórmulas clássicas, então os resultados batem com as ferramentas de design.",
        },
        {
          q: "Por que meu código de cor aparece como inválido?",
          a: "As formas aceitas são #RGB / #RRGGBB, rgb(r, g, b) e hsl(h, s%, l%). Os canais devem estar no intervalo (0–255 para RGB, 0–360 para o matiz, 0–100% para o resto), separados por vírgula ou espaço.",
        },
        {
          q: "Para que servem tons e sombras?",
          a: "Tons (misturados com branco) servem para fundos hover, badges e cartões; sombras (misturadas com preto) para estados pressionados, bordas e superfícies escuras. Derivar tudo de uma cor de marca mantém a UI consistente.",
        },
      ],
    },
  },
});
