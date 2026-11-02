import { CalcEngineConverters } from "../_engines/calc-engine-converters";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "aspect-ratio-calculator",
  category: "utility",
  icon: "crop",
  engine: { component: CalcEngineConverters, props: { kind: "aspect" } },
  related: ["color-picker", "color-converter", "binary-converter", "qr-generator"],
  copy: {
    en: {
      name: "Aspect Ratio Calculator",
      tagline: "Given a ratio like 16:9 and one dimension, get the missing width or height instantly — plus presets from 1:1 to 21:9 for video and design.",
      intro: [
        "Enter a ratio — tap a preset (1:1, 4:3, 3:2, 16:9, 16:10, 21:9) or type custom numbers — then give it a known width or height. The missing dimension appears immediately, together with the pair formatted as W×H and the decimal ratio.",
        "The classic resize without distortion: video crops, responsive image containers, sensor and film formats, print scaling and CSS object-fit decisions all live here, computed locally as you type.",
      ],
      steps: [
        "Pick a ratio preset or type your own width:height values.",
        "Choose which dimension you already know — width or height.",
        "Enter the known value and read the missing dimension.",
      ],
      faqs: [
        {
          q: "How is the missing dimension calculated?",
          a: "By direct proportion: known dimension × (target side ÷ matching ratio side). For 16:9 with a width of 1920, height = 1920 × 9 ÷ 16 = 1080. The result is shown rounded, with the exact decimal beneath it.",
        },
        {
          q: "Why does 16:9 and 16:10 matter so much for screens?",
          a: "16:9 matches video (1920×1080, 3840×2160) and most monitors; 16:10 adds vertical space for documents and code (1920×1200). Picking the wrong one means letterboxing or stretched pixels — this tool shows exactly what each ratio produces.",
        },
        {
          q: "Can I use decimal or unusual ratios?",
          a: "Yes. Both ratio fields accept any positive numbers, so 2.39:1 cinema scope, 1.85:1, 4:5 portrait social crops or sensor sizes like 1.5:1 all work — the proportion math is identical.",
        },
      ],
    },
    zh: {
      name: "宽高比计算器",
      tagline: "已知 16:9 之类的比例和一个边长,立即算出另一边——内置 1:1 到 21:9 预设,视频与设计常用比例一应俱全。",
      intro: [
        "输入比例——点选预设(1:1、4:3、3:2、16:9、16:10、21:9)或自定义——再给出已知的宽或高,缺失的一边立即出现,同时显示 W×H 尺寸对和十进制比例。",
        "最经典的等比缩放场景:视频裁切、响应式图片容器、传感器与胶片规格、印刷缩放和 CSS object-fit 决策,输入即算,全程本地完成。",
      ],
      steps: [
        "点选比例预设,或输入自定义的宽:高。",
        "选择你已知的一边——宽度或高度。",
        "输入已知数值,查看缺失的一边。",
      ],
      faqs: [
        {
          q: "缺失的一边是怎么算出来的?",
          a: "按正比例直接计算:已知边 × (目标边 ÷ 对应比例边)。16:9、宽 1920 时,高 = 1920 × 9 ÷ 16 = 1080。结果会四舍五入显示,下方同时给出精确小数。",
        },
        {
          q: "为什么屏幕比例 16:9 和 16:10 差别很大?",
          a: "16:9 对应视频(1920×1080、3840×2160)和大多数显示器;16:10 为文档和代码多留了纵向空间(1920×1200)。选错比例就会出现黑边或拉伸变形——这个工具能精确展示每种比例的结果。",
        },
        {
          q: "支持小数或特殊比例吗?",
          a: "支持。两个比例字段接受任意正数:2.39:1 电影宽银幕、1.85:1、4:5 竖版社交裁切或 1.5:1 的传感器规格都行——比例运算完全一样。",
        },
      ],
    },
    ja: {
      name: "アスペクト比計算",
      tagline: "16:9 などの比率と片方の寸法があれば、もう片方を即算出。1:1 から 21:9 までのプリセットで動画・デザインに即対応。",
      intro: [
        "比率を入力します。プリセット(1:1、4:3、3:2、16:9、16:10、21:9)を選んでも、数値を直接入れても構いません。既知の幅か高さを与えると、欠けている辺がすぐ出ます。W×H のサイズと小数の比率も同時に表示します。",
        "典型例は歪みのないリサイズです。動画のトリミング、レスポンシブ画像コンテナ、センサー・フィルムの規格、印刷の拡大縮小、CSS の object-fit の判断に、入力しながらローカルで即計算できます。",
      ],
      steps: [
        "比率のプリセットを選ぶか、幅:高さを直接入力します。",
        "わかっている辺(幅か高さ)を選びます。",
        "既知の値を入力すると、もう片方の寸法が表示されます。",
      ],
      faqs: [
        {
          q: "もう片方の寸法はどう計算しますか?",
          a: "単純な比例計算です。既知の寸法 ×(目標の辺 ÷ 対応する比率の辺)。16:9 で幅 1920 なら、高さ = 1920 × 9 ÷ 16 = 1080 です。結果は丸めて表示し、正確な小数も下に示します。",
        },
        {
          q: "画面で 16:9 と 16:10 が重要なのはなぜですか?",
          a: "16:9 は動画(1920×1080、3840×2160)や多くのモニター向け、16:10 は文書やコードに縦の余裕を加えます(1920×1200)。選びを誤るとレターボックスや引き伸ばしになります。このツールで各比率の結果を正確に確認できます。",
        },
        {
          q: "小数や特殊な比率も使えますか?",
          a: "はい。比率欄は任意の正数を受け付けます。2.39:1 のシネスコ、1.85:1、4:5 の縦型 SNS クロップ、1.5:1 のセンサーなども同じ比例計算で扱えます。",
        },
      ],
    },
    es: {
      name: "Calculadora de relación de aspecto",
      tagline: "Con una relación como 16:9 y una dimensión, obtenga la anchura o altura que falta al instante — con presets de 1:1 a 21:9 para vídeo y diseño.",
      intro: [
        "Introduzca una relación — elija un preset (1:1, 4:3, 3:2, 16:9, 16:10, 21:9) o escriba números propios — y proporciónele una anchura o altura conocida. La dimensión que falta aparece enseguida, junto con el par formateado como ancho×alto y la relación decimal.",
        "El clásico reescalado sin deformación: recortes de vídeo, contenedores de imagen responsive, formatos de sensor y película, escalado de impresión y decisiones de CSS object-fit, todo calculado localmente mientras escribe.",
      ],
      steps: [
        "Elija un preset de relación o escriba sus valores de anchura:altura.",
        "Indique qué dimensión ya conoce: anchura o altura.",
        "Introduzca el valor conocido y lea la dimensión que falta.",
      ],
      faqs: [
        {
          q: "¿Cómo se calcula la dimensión que falta?",
          a: "Por proporción directa: dimensión conocida × (lado buscado ÷ lado equivalente de la relación). Para 16:9 con anchura 1920, altura = 1920 × 9 ÷ 16 = 1080. El resultado se muestra redondeado, con el decimal exacto debajo.",
        },
        {
          q: "¿Por qué importan tanto 16:9 y 16:10 en pantallas?",
          a: "16:9 corresponde al vídeo (1920×1080, 3840×2160) y a la mayoría de monitores; 16:10 añade espacio vertical para documentos y código (1920×1200). Elegir mal significa bandas negras o píxeles estirados; esta herramienta muestra exactamente qué produce cada relación.",
        },
        {
          q: "¿Puedo usar relaciones decimales o poco comunes?",
          a: "Sí. Ambos campos aceptan números positivos cualesquiera: 2.39:1 de cine, 1.85:1, recortes verticales 4:5 para redes sociales o sensores como 1.5:1 funcionan igual, porque la proporción es la misma matemática.",
        },
      ],
    },
    pt: {
      name: "Calculadora de proporção",
      tagline: "Com uma proporção como 16:9 e uma dimensão, obtenha a largura ou altura que falta na hora — com presets de 1:1 a 21:9 para vídeo e design.",
      intro: [
        "Digite uma proporção — toque num preset (1:1, 4:3, 3:2, 16:9, 16:10, 21:9) ou informe números próprios — e dê uma largura ou altura conhecida. A dimensão que falta aparece imediatamente, junto com o par formatado como L×A e a proporção decimal.",
        "O clássico redimensionamento sem distorção: cortes de vídeo, contêineres de imagem responsivos, formatos de sensor e filme, escala de impressão e decisões de CSS object-fit — tudo calculado localmente enquanto você digita.",
      ],
      steps: [
        "Escolha um preset de proporção ou digite seus valores de largura:altura.",
        "Indique qual dimensão você já conhece — largura ou altura.",
        "Informe o valor conhecido e veja a dimensão que falta.",
      ],
      faqs: [
        {
          q: "Como a dimensão que falta é calculada?",
          a: "Por proporção direta: dimensão conhecida × (lado desejado ÷ lado correspondente da proporção). Para 16:9 com largura 1920, altura = 1920 × 9 ÷ 16 = 1080. O resultado aparece arredondado, com o decimal exato logo abaixo.",
        },
        {
          q: "Por que 16:9 e 16:10 importam tanto em telas?",
          a: "16:9 corresponde a vídeo (1920×1080, 3840×2160) e à maioria dos monitores; 16:10 adiciona espaço vertical para documentos e código (1920×1200). Escolher errado gera faixas pretas ou pixels esticados — a ferramenta mostra exatamente o que cada proporção produz.",
        },
        {
          q: "Posso usar proporções decimais ou incomuns?",
          a: "Sim. Os dois campos aceitam qualquer número positivo: 2.39:1 de cinema, 1.85:1, recortes verticais 4:5 para redes sociais ou sensores como 1.5:1 — a matemática de proporção é a mesma.",
        },
      ],
    },
  },
});
