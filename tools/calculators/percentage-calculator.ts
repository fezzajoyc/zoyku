import { CalcEngineBasic } from "../_engines/calc-engine-basic";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "percentage-calculator",
  category: "utility",
  icon: "calc",
  engine: { component: CalcEngineBasic, props: { kind: "percentage" } },
  related: ["discount-calculator", "profit-calculator", "bmi-calculator", "tip-calculator", "body-fat-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator", "aspect-ratio-calculator"],
  copy: {
    en: {
      name: "Percentage Calculator",
      tagline: "Three percentage problems in one live tool: X% of Y, X is what percent of Y, and the percent change between two values.",
      intro: [
        "The three questions people actually ask: “what is 15% of 200?”, “30 is what percent of 150?” and “sales went from 480 to 610 — by what percent?”. Switch modes with one click and the formula adapts to each case.",
        "Percent change is signed and labeled as an increase or a decrease, so a drop from 500 to 400 clearly reads as −20%, not a confusing positive number.",
      ],
      steps: [
        "Pick the mode: X% of Y, X is what % of Y, or % change.",
        "Type the two values into the two boxes.",
        "Read the live result — with the direction labeled for changes.",
      ],
      faqs: [
        {
          q: "How is percent change calculated?",
          a: "(final − initial) ÷ |initial| × 100. The absolute value in the denominator means a change from −50 to −40 correctly reports +20% rather than −20%. Reverse direction (400 → 500) gives +25% because the base changes.",
        },
        {
          q: "Why is a 20% rise followed by a 20% fall not zero?",
          a: "Percentages apply to different bases: 100 + 20% = 120, then 120 − 20% = 96. Net change is −4%. This asymmetry trips up price comparisons and news headlines alike.",
        },
        {
          q: "Can I use negative or decimal numbers?",
          a: "Yes. Both inputs accept negatives and decimals, so “−5% of 80” or percentage points on a temperature change work fine.",
        },
      ],
    },
    zh: {
      name: "百分比计算器",
      tagline: "一个工具解决三类百分比问题:X% 的 Y、X 占 Y 的百分比、两个数值间的百分比变化,输入即出结果。",
      intro: [
        "覆盖人们最常问的三种问题:“200 的 15% 是多少?”“30 是 150 的百分之几?”“销量从 480 涨到 610,涨了百分之几?”——一键切换模式,公式随场景自动适配。",
        "百分比变化带正负号并明确标注是增长还是下降:从 500 降到 400 会清楚地显示 −20%,而不是令人困惑的正数。",
      ],
      steps: [
        "选择模式:X% 的 Y、X 占 Y 的百分比,或百分比变化。",
        "在两个输入框里填入数值。",
        "查看实时结果——变化模式还会标注方向。",
      ],
      faqs: [
        {
          q: "百分比变化是怎么算的?",
          a: "(终值 − 初值)÷ |初值| × 100。分母取绝对值,因此从 −50 变到 −40 会正确显示 +20% 而不是 −20%。反方向(400 → 500)是 +25%,因为基准变了。",
        },
        {
          q: "为什么先涨 20% 再跌 20% 不等于回到原点?",
          a: "两次百分比的作用基准不同:100 涨 20% 变 120,120 再跌 20% 只剩 96,净变化是 −4%。这种不对称性常让价格对比和新闻标题出错。",
        },
        {
          q: "可以用负数或小数吗?",
          a: "可以。两个输入都接受负数和小数,例如“80 的 −5%”或温差里的百分点都没问题。",
        },
      ],
    },
    ja: {
      name: "パーセント計算",
      tagline: "3 つの百分率問題を 1 つのツールで:X% の Y、X は Y の何%、そして 2 つの値の変化率をリアルタイム計算。",
      intro: [
        "よくある 3 つの質問にそのまま答えます。「200 の 15% は?」「30 は 150 の何%?」「売上が 480 から 610 に伸びたときの伸び率は?」モードを切り替えると計算式も自動で変わります。",
        "変化率は符号付きで増加・減少を明示するので、500 から 400 への下落は迷いのない −20% と表示されます。",
      ],
      steps: [
        "モードを選びます:X% の Y、X は Y の何%、変化率。",
        "2 つの値を入力します。",
        "リアルタイムの結果を確認します。変化率には向きも表示されます。",
      ],
      faqs: [
        {
          q: "変化率はどう計算しますか?",
          a: "(後の値 − 前の値)÷ |前の値| × 100 です。分母に絶対値を使うので、−50 から −40 への変化は正しく +20% になります。逆方向(400 → 500)は基準が変わるため +25% です。",
        },
        {
          q: "20% の上昇のあと 20% の下落で元に戻らないのはなぜ?",
          a: "百分率の基準が違うからです。100 に 20% 足すと 120、その 120 から 20% 引くと 96 になり、差し引き −4% です。この非対称性は価格比較でもニュースでも混乱のもとです。",
        },
        {
          q: "負の数や小数は使えますか?",
          a: "はい。両方の入力で負数・小数とも OK なので、「80 の −5%」や気温差のパーセントポイントも計算できます。",
        },
      ],
    },
    es: {
      name: "Calculadora de porcentajes",
      tagline: "Tres problemas de porcentaje en una herramienta en vivo: X% de Y, X es qué porcentaje de Y y el cambio porcentual entre dos valores.",
      intro: [
        "Las tres preguntas más frecuentes: «¿cuánto es el 15% de 200?», «30 ¿es qué porcentaje de 150?» y «las ventas pasaron de 480 a 610, ¿qué porcentaje subieron?». Cambie de modo con un clic y la fórmula se adapta a cada caso.",
        "El cambio porcentual lleva signo y etiqueta si es subida o bajada, así que una caída de 500 a 400 se lee claramente como −20% y no como un número positivo confuso.",
      ],
      steps: [
        "Elija el modo: X% de Y, X es qué % de Y o cambio %.",
        "Escriba los dos valores en las dos casillas.",
        "Lea el resultado en vivo, con la dirección indicada en los cambios.",
      ],
      faqs: [
        {
          q: "¿Cómo se calcula el cambio porcentual?",
          a: "(final − inicial) ÷ |inicial| × 100. El valor absoluto del denominador hace que un cambio de −50 a −40 indique correctamente +20% y no −20%. En sentido inverso (400 → 500) da +25% porque la base cambia.",
        },
        {
          q: "¿Por qué una subida del 20% seguida de una bajada del 20% no vuelve al inicio?",
          a: "Los porcentajes se aplican a bases distintas: 100 + 20% = 120 y luego 120 − 20% = 96, un cambio neto de −4%. Esta asimetría confunde tanto en comparaciones de precios como en titulares.",
        },
        {
          q: "¿Puedo usar números negativos o decimales?",
          a: "Sí. Ambas casillas aceptan negativos y decimales: «−5% de 80» o puntos porcentuales en un cambio de temperatura funcionan sin problema.",
        },
      ],
    },
    pt: {
      name: "Calculadora de porcentagem",
      tagline: "Três problemas de porcentagem numa ferramenta ao vivo: X% de Y, X é qual porcentagem de Y e a variação percentual entre dois valores.",
      intro: [
        "As três perguntas mais comuns: «quanto é 15% de 200?», «30 é qual porcentagem de 150?» e «as vendas foram de 480 para 610 — quanto aumentaram em porcentagem?». Troque o modo com um clique e a fórmula se adapta a cada caso.",
        "A variação percentual vem com sinal e rótulo de aumento ou queda, então uma queda de 500 para 400 aparece claramente como −20%, e não como um número positivo confuso.",
      ],
      steps: [
        "Escolha o modo: X% de Y, X é qual % de Y ou variação %.",
        "Digite os dois valores nas duas caixas.",
        "Veja o resultado ao vivo — com a direção indicada nas variações.",
      ],
      faqs: [
        {
          q: "Como a variação percentual é calculada?",
          a: "(final − inicial) ÷ |inicial| × 100. O módulo no denominador faz uma mudança de −50 para −40 indicar corretamente +20%, e não −20%. No sentido inverso (400 → 500) dá +25%, porque a base muda.",
        },
        {
          q: "Por que uma alta de 20% seguida de uma queda de 20% não volta ao início?",
          a: "As porcentagens se aplicam a bases diferentes: 100 + 20% = 120 e depois 120 − 20% = 96, uma variação líquida de −4%. Essa assimetria confunde tanto em comparações de preços quanto em manchetes.",
        },
        {
          q: "Posso usar números negativos ou decimais?",
          a: "Sim. As duas caixas aceitam negativos e decimais, então «−5% de 80» ou pontos percentuais numa variação de temperatura funcionam bem.",
        },
      ],
    },
  },
});
