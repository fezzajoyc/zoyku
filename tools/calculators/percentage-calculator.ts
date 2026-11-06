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
        "Under the hood each mode is one line of arithmetic: X% of N is (X ÷ 100) × N; “A is what percent of B” is A ÷ B × 100; and percent change is (new − old) ÷ |old| × 100, with the old value's magnitude in the denominator so increases and decreases are symmetric.",
        "Compared with doing this in a spreadsheet or search box, the three phrasings are one click apart and percent change is signed and labeled — a fall from 500 to 400 reads as −20% (a 20% decrease), not an easy-to-misread positive number. That makes it handy for invoices, grades, price checks and quick homework alike.",],
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
      deepDive: [
        {
          heading: "Whose base? The question every percentage hides",
          paragraphs: [
            "A percentage is never absolute — it is always a ratio against some base, and most percentage confusion comes from picking the wrong base. In “X% of Y”, Y is the base and the result is (X ÷ 100) × Y. In “A is what percent of B”, the phrase order fixes the roles: A is the numerator and B is the denominator, so “30 is what percent of 150” gives 20% while “150 is what percent of 30” gives 500% — same two numbers, opposite answers.",
            "Percent change has its own base rule: the old value sits in the denominator, and its absolute value is used so signs stay meaningful. A rise from 480 to 610 is +27.08% (130 ÷ 480); the fall back from 610 to 480 is −21.31% (−130 ÷ 610). Both describe the same 130-unit move, and neither is wrong — they measure against different starting points.",
            "Percentages and percentage points are also different animals. If a savings rate moves from 3% to 4%, that is one percentage point but a 33% relative increase — headlines and fund sheets often pick whichever sounds bigger. When a comparison matters, state the base explicitly: “from 3% to 4%” beats “up 33%”.",
          ],
        },
        {
          heading: "Why percentages do not add up",
          paragraphs: [
            "Percent changes multiply rather than add, because each one acts on the result of the last. Gain 20% and you hold ×1.2; lose 20% and you hold ×0.8; combined, ×0.96 — a net 4% loss even though +20 and −20 look like they should cancel. Thinking in multipliers dissolves the paradox instantly.",
            "The asymmetry grows with size: +50% then −50% leaves you at 75% of where you started (×1.5 × 0.5 = 0.75). This is why “the market fell 10% so it needs to rise 10% to recover” is false — it needs +11.1%. Traders and fund managers live with this arithmetic daily.",
            "Discount stacking behaves the same way. A 20% discount followed by a further 10% discount is ×0.8 × 0.9 = ×0.72 — 28% off, not 30%. Anywhere percentages chain (price moves, interest, markups and discounts), convert each to a factor and multiply; adding the raw numbers always gives the wrong answer.",
          ],
        },
        {
          heading: "Where a dedicated calculator beats a spreadsheet",
          paragraphs: [
            "The three questions — X% of Y, A as a share of B, and change between two values — cover the everyday cases: tip and discount checks, grading, invoice VAT, sales growth, test scores. A spreadsheet handles all three but each needs its own formula typed correctly; here switching phrasing is one click and the formula adapts.",
            "The signed, labeled change output is the deliberate difference: a fall from 500 to 400 prints −20% (a 20% decrease) rather than an unlabeled number you must interpret yourself, which is where spreadsheet cells and mental math go wrong most often.",
            "Everything runs locally in your browser — no input is transmitted, so pricing drafts, grade sheets or salary figures can be checked without an account. Pair it with the profit calculator for margin and markup or the VAT calculator when the percentage lives inside a tax-inclusive price.",
          ],
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
      deepDive: [
        {
          heading: "百分比的基数:一切歧义的源头",
          paragraphs: [
            "百分比永远不是独立数字,它总是相对某个基数而言,而大多数百分比错误都出在基数选错。“X% 的 Y”里基数是 Y,结果就是 (X ÷ 100) × Y;“A 占 B 的百分之几”则由语序决定分子分母:30 占 150 是 20%,反过来 150 占 30 是 500%——同样的两个数,答案完全不同。",
            "百分比变化的基数是初值,分母取绝对值以保证正负号有意义。480 涨到 610 是 +27.08%(130 ÷ 480),从 610 跌回 480 则是 −21.31%(−130 ÷ 610):同一段 130 的变动,起点不同,百分比就不同,两者都对。",
            "另外,“百分点”和“百分比”是两回事:利率从 3% 升到 4%,是升高 1 个百分点,但相对涨幅是 33%。标题党会挑听起来更大的那个说法;做比较时,把基数说清楚(“从 3% 到 4%”)永远比“涨了 33%”可靠。",
          ],
        },
        {
          heading: "为什么百分比不能直接相加",
          paragraphs: [
            "百分比变化是相乘而非相加,因为每一次变化都作用在上一次的结果上。先涨 20% 相当于 ×1.2,再跌 20% 相当于 ×0.8,合起来 ×0.96——净亏 4%,虽然“+20 和 −20”看上去应该抵消。改用乘数思维,悖论立刻消失。",
            "幅度越大,不对称越明显:先涨 50% 再跌 50%,只剩本金的 75%(×1.5 × 0.5 = 0.75)。所以“市场跌了 10%,涨回 10% 就回本”是错的——需要涨约 11.1% 才能补回。",
            "折扣叠加同理:先打八折再打九折是 ×0.8 × 0.9 = ×0.72,相当于总优惠 28% 而不是 30%。凡是百分比连环出现的地方(价格变动、利率、加价与折扣),先把每个百分比换算成乘数再相乘;把百分数直接相加几乎总是错的。",
          ],
        },
        {
          heading: "和表格、心算相比",
          paragraphs: [
            "三类问题——X% 的 Y、A 占 B 的比例、两个值的变动——覆盖了日常的绝大部分场景:小费和折扣核对、成绩换算、发票里的税、销量增长、考试得分。表格都能算,但每个问题都要自己写对公式;这里一键切换说法,公式自动跟上。",
            "带符号、带标注的变化输出是刻意的设计:500 跌到 400 会明确显示 −20%(下降 20%),而不是一个需要你自己解读的数字——表格单元格和心算最容易在这步出错。",
            "所有计算都在浏览器本地完成,输入不上传,定价草稿、成绩单、薪资数字都可以放心核对。需要利润率和加成率时配合利润计算器,含税价的百分比则交给 VAT 计算器。",
          ],
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
      deepDive: [
        {
          heading: "百分率の「基数」——誤解はここから生まれる",
          paragraphs: [
            "百分率は必ず何かを基準にした比率であり、誤解の大半はこの基準の取り違えです。「X% の Y」では Y が基数で結果は (X ÷ 100) × Y。「A は B の何%」では語順が分子と分母を決め、30 は 150 の 20% でも、150 は 30 の 500% でもあり得ます。同じ 2 つの数でも答えは正反対です。",
            "変化率の基数は「前の値」で、分母は絶対値を取るため符号が意味を持ちます。480 → 610 は +27.08%(130 ÷ 480)、610 → 480 は −21.31%(−130 ÷ 610)。同じ 130 の動きでも始点が違えば率も違います。",
            "さらに「パーセントポイント」と「パーセント」は別物です。金利が 3% から 4% への上昇は 1 ポイントですが、相対的には 33% の増加です。比較するときは基数を明示する(「3% から 4% へ」)のが確実です。",
          ],
        },
        {
          heading: "百分率は足し算できない",
          paragraphs: [
            "変化率は掛け算です。20% の上昇は ×1.2、その後の 20% 下落は ×0.8、合計 ×0.96 で差し引き 4% の損。「+20 と −20 で相殺」とはなりません。乗数で考えると矛盾はすぐ解けます。",
            "幅が大きいほど非対称は顕著で、50% 上がって 50% 下がると元の 75% にしかなりません(×1.5 × 0.5 = 0.75)。「10% 下がったから 10% 上がれば元通り」は誤りで、回収には約 11.1% の上昇が必要です。",
            "割引の重ね掛けも同様に、20% 引きのあと 10% 引きは ×0.8 × 0.9 = ×0.72 で、合計 28% 引き(30% ではありません)。百分率が連鎖する場面では、各率を乗数に直して掛けるのが正解です。",
          ],
        },
        {
          heading: "表計算との違い",
          paragraphs: [
            "3 つの質問——X% の Y、A は B の何%、変化率——はチップや割引の確認、成績換算、売上の伸びなど日常のほとんどをカバーします。表計算でも計算できますが式を都度書く必要があり、ここではワンクリックで切り替わります。",
            "変化率は符号と向き付きで表示するのが意図的な違いです。500 → 400 は「−20%(20% の減少)」とはっきり出るので、解釈を誤る余地がありません。",
            "計算はすべてブラウザ内で完結し、入力は送信されません。利益率とマークアップには利益計算、税込価格の百分率には VAT 計算ツールと組み合わせてください。",
          ],
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
      deepDive: [
        {
          heading: "¿Base de qué? Ahí empieza toda confusión porcentual",
          paragraphs: [
            "Un porcentaje nunca es absoluto: siempre es una razón contra alguna base, y casi todo error porcentual nace de elegir la base equivocada. En «X% de Y» la base es Y y el resultado es (X ÷ 100) × Y. En «A es qué porcentaje de B» el orden de la frase fija numerador y denominador: 30 es el 20% de 150, pero 150 es el 500% de 30 — los mismos dos números, respuestas opuestas.",
            "El cambio porcentual toma como base el valor inicial y usa su valor absoluto para que el signo conserve sentido. De 480 a 610 hay +27,08% (130 ÷ 480); de 610 de vuelta a 480, −21,31% (−130 ÷ 610). El mismo movimiento de 130 unidades mide distinto según el punto de partida.",
            "Además, puntos porcentuales y porcentajes no son lo mismo: si un tipo pasa del 3% al 4%, sube un punto pero un 33% en términos relativos. Al comparar, conviene explicitar la base: «del 3% al 4%» es más honesto que «un 33% más».",
          ],
        },
        {
          heading: "Por qué los porcentajes no se suman",
          paragraphs: [
            "Los cambios porcentuales se multiplican, porque cada uno actúa sobre el resultado del anterior. Subir un 20% es ×1,2; bajar después un 20% es ×0,8; combinados, ×0,96 — una pérdida neta del 4% aunque «+20 y −20» parezcan anularse. Pensar en factores disuelve la paradoja.",
            "Cuanto mayor es la cifra, mayor la asimetría: subir 50% y bajar 50% deja el 75% del inicio (×1,5 × 0,5 = 0,75). Por eso «el mercado cayó 10% y le basta con subir 10%» es falso: se necesita +11,1%.",
            "El apilamiento de descuentos funciona igual: 20% y luego 10% equivale a ×0,8 × 0,9 = ×0,72, un 28% de descuento total y no un 30%. Donde los porcentajes se encadenan, conviértalos en factores y multiplique.",
          ],
        },
        {
          heading: "Frente a la hoja de cálculo y el cálculo mental",
          paragraphs: [
            "Las tres preguntas — X% de Y, A respecto a B y el cambio entre dos valores — cubren casi todo el uso diario: propinas y descuentos, calificaciones, impuestos en una factura, crecimiento de ventas. Una hoja de cálculo puede con todo, pero cada caso exige su fórmula; aquí un clic cambia de modo.",
            "La salida del cambio, con signo y etiqueta, es la diferencia deliberada: una caída de 500 a 400 se imprime como −20% (una bajada del 20%), no como una cifra que haya que interpretar — justo donde más se equivoca el cálculo mental.",
            "Todo corre en su navegador y nada se transmite, así que puede revisar borradores de precios o cifras salariales sin cuenta. Para margen y recargo use la calculadora de ganancias; para porcentajes dentro de un precio con impuesto, la de IVA.",
          ],
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
      deepDive: [
        {
          heading: "Base de quê? Toda confusão percentual começa aí",
          paragraphs: [
            "Uma porcentagem nunca é absoluta: é sempre uma razão sobre alguma base, e quase todo erro percentual vem de escolher a base errada. Em «X% de Y» a base é Y e o resultado é (X ÷ 100) × Y. Em «A é qual porcentagem de B» a ordem da frase fixa numerador e denominador: 30 é 20% de 150, mas 150 é 500% de 30 — os mesmos dois números, respostas opostas.",
            "A variação percentual usa o valor inicial como base e o módulo dele para que o sinal mantenha sentido. De 480 para 610 são +27,08% (130 ÷ 480); de 610 de volta a 480, −21,31% (−130 ÷ 610). O mesmo movimento de 130 unidades mede diferente conforme o ponto de partida.",
            "Além disso, ponto percentual e porcentagem não são a mesma coisa: se uma taxa passa de 3% para 4%, sobe um ponto, mas 33% em termos relativos. Ao comparar, diga a base: «de 3% para 4%» é mais honesto que «um aumento de 33%».",
          ],
        },
        {
          heading: "Por que porcentagens não se somam",
          paragraphs: [
            "Variações percentuais se multiplicam, porque cada uma age sobre o resultado da anterior. Subir 20% é ×1,2; cair depois 20% é ×0,8; juntas, ×0,96 — perda líquida de 4%, embora «+20 e −20» pareçam se anular. Pensar em fatores dissolve o paradoxo.",
            "Quanto maior o número, maior a assimetria: subir 50% e cair 50% deixa 75% do início (×1,5 × 0,5 = 0,75). Por isso «o mercado caiu 10% e basta subir 10%» é falso: são necessários +11,1%.",
            "Descontos acumulados funcionam igual: 20% e depois 10% dá ×0,8 × 0,9 = ×0,72, um desconto total de 28%, e não 30%. Onde as porcentagens se encadeiam, transforme cada uma em fator e multiplique.",
          ],
        },
        {
          heading: "Diante da planilha e da conta de cabeça",
          paragraphs: [
            "As três perguntas — X% de Y, A em relação a B e a variação entre dois valores — cobrem quase todo o uso diário: gorjetas e descontos, notas, impostos numa fatura, crescimento de vendas. A planilha resolve, mas cada caso exige a fórmula certa; aqui um clique troca o modo.",
            "A saída da variação, com sinal e rótulo, é a diferença proposital: uma queda de 500 para 400 aparece como −20% (uma baixa de 20%), e não como um número a interpretar — exatamente onde a conta de cabeça mais erra.",
            "Tudo roda no seu navegador e nada é transmitido, então dá para conferir rascunhos de preço ou cifras salariais sem cadastro. Para margem e markup use a calculadora de lucro; para porcentagens dentro de um preço com imposto, a de IVA.",
          ],
        },
      ],
    },
  },
});
