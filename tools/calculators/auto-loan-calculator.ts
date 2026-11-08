import { CalcEngineAuto } from "../_engines/calc-engine-auto";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "auto-loan-calculator",
  category: "utility",
  icon: "calc",
  engine: { component: CalcEngineAuto },
  related: ["loan-calculator", "mortgage-calculator", "emi-calculator", "compound-interest-calculator", "inflation-calculator", "retirement-calculator"],
  copy: {
    en: {
      name: "Auto Loan Calculator",
      tagline:
        "Price minus down payment, financed at your rate over 36–84 months: monthly payment, total interest and a year-by-year amortization table.",
      intro: [
        "Enter the car price, the down payment (a percent or a fixed amount), an annual interest rate and a term in months. The calculator finances the difference and applies the standard reducing-balance amortization formula — the same math banks use for any installment loan.",
        "You get the monthly payment, the loan amount, the total interest over the term and the total paid, plus a yearly table splitting principal and interest and tracking the remaining balance. A donut chart shows how much of the deal is the car and how much is the interest.",
        "Car loan terms typically run 36 to 84 months. Shorter terms cost more per month and less in total interest; the table makes that trade-off concrete instead of leaving it to a slogan about staying under 60 months.",
        "The rate you enter is an example input, not an offer — dealer and bank quotes vary with credit, term and incentives. Everything is computed locally in your browser, so it is safe to paste real quotes and compare them side by side.",
      ],
      steps: [
        "Enter the car price and the down payment as a percent or an amount.",
        "Set the annual interest rate offered to you.",
        "Enter the term in months — car loans commonly run 36–84.",
        "Read the monthly payment, total interest and the yearly amortization table.",
      ],
      faqs: [
        {
          q: "How is the monthly payment calculated?",
          a: "With the standard amortization formula M = L × r × (1+r)^n / ((1+r)^n − 1), where L is the amount financed (price − down payment), r the monthly rate (annual ÷ 12 ÷ 100) and n the number of months. A $30,000 car with 20% down at 6% for 60 months works out to about $463.99 a month.",
        },
        {
          q: "Does a longer term save money?",
          a: "No — it saves cash flow, not money. Stretching 60 to 84 months lowers each payment but adds months of interest on a balance that declines slowly, so the total interest rises. Compare the total-interest column, not the monthly one, when choosing a term.",
        },
        {
          q: "What counts as the down payment here?",
          a: "Anything you pay upfront: cash, a trade-in credit or rebates. Enter it as a percent of the price or a fixed amount. If the down payment covers the whole price, the tool tells you no loan is needed.",
        },
        {
          q: "Does it include fees, taxes or insurance?",
          a: "No. It models principal and interest only. Sales tax, registration, dealer fees and gap insurance change the financed amount or add monthly cost — recompute with those rolled into the price if you finance them.",
        },
      ],
      deepDive: [
        {
          heading: "Why the term is the biggest lever after the price",
          paragraphs: [
            "Total interest on an installment loan is roughly the average balance times the rate times the years. A longer term does not change the rate, but it keeps balances higher for longer — that is where the extra interest comes from. On a $24,000 loan at 6%, the 60-month schedule pays about $3,839 in interest; stretching to 84 months lowers the payment by roughly a quarter but raises total interest past $5,400.",
            "The reverse is why prepaying works: every extra dollar of principal removes interest at exactly your loan rate for the rest of the term. Auto loans almost always compute interest on the remaining balance each month, so paying principal early is a guaranteed, risk-free return at the loan rate — if the contract has no prepayment penalty, which is worth checking before you sign.",
            "A practical rule of thumb the table makes visible: pick the shortest term whose monthly payment your budget survives without slipping into revolving debt. A payment you can afford but that stretches the term is quietly the most expensive option of the three.",
          ],
        },
        {
          heading: "The down payment, the trade-in and negative equity",
          paragraphs: [
            "Cars depreciate fast in the first years while loans amortize slowly, so a small down payment can leave you owing more than the car is worth — negative equity — for a long stretch. That matters if the car is totaled or stolen: insurance pays the market value, not the balance, and gap insurance exists precisely for that gap. A bigger down payment shrinks both the interest bill and the window of negative equity.",
            "A trade-in behaves like cash down, but check how it is applied. A dealer quote that rolls trade-in value, fees and taxes into one financed number can hide a worse rate behind a lower-looking payment. Asking for the amount financed, the rate and the term separately makes any quote comparable — those three numbers are all this calculator needs to reproduce the deal.",
            "One honest caveat about long terms: 72 and 84-month loans exist because they move metal, not because they are good deals. If you cannot afford the payment on a 60-month term, the arithmetic answer is a cheaper car, not a longer loan — the interest table on this page shows exactly what the longer term costs you.",
          ],
        },
        {
          heading: "Reading the schedule without misreading it",
          paragraphs: [
            "The table groups twelve months into each row, so principal and interest are yearly totals and the balance is the year-end figure. On short car loans the whole story may fit in four to seven rows — long enough to see that the first year is interest-heavy and that the last payment retires almost no interest at all.",
            "The schedule assumes a fixed rate, on-time payments and no fees. Variable-rate auto loans exist in some markets; if yours resets, the payment and the schedule change at every reset, so recalculate. Missed payments, insurance rolled into the loan and balloon structures also break the model — a balloon payment, common in some lease-buyout and dealer plans, leaves a large final balance this table does not show.",
            "Like everything on this site, the computation runs entirely in your browser: no price, rate or term is transmitted anywhere, so it is safe to explore real quotes from real lenders.",
          ],
        },
      ],
    },
    zh: {
      name: "车贷计算器",
      tagline:
        "输入车价、首付、年利率和期限(常见 36–84 个月),立即算出月供、贷款额、总利息,以及逐年拆分本金与利息的摊销表。",
      intro: [
        "输入车价、首付(按比例或固定金额)、年利率和以月计的期限。计算器对差价放款,套用标准的余额递减摊销公式——和银行做任何分期贷款用的是同一套数学。",
        "你会得到月供、贷款金额、期限内的总利息和还款总额,外加一张逐年拆分本金与利息、跟踪剩余余额的表格。环形图显示这笔交易里多少是车、多少是利息。",
        "车贷期限通常在 36 到 84 个月之间。期限越短,月供越高、总利息越低;表格把这个取舍算得清清楚楚,不靠“别超过 60 期”这类口诀。",
        "你输入的利率只是示例,不构成任何报价——经销商和银行的报价随信用、期限和优惠而变。所有计算都在浏览器本地完成,可以放心把真实报价填进来逐项对比。",
      ],
      steps: [
        "输入车价和首付(百分比或固定金额)。",
        "填入对方给你的年利率。",
        "输入以月计的期限——车贷常见 36–84 个月。",
        "查看月供、总利息和逐年摊销表。",
      ],
      faqs: [
        {
          q: "月供是怎么算的?",
          a: "用标准摊销公式 M = L × r × (1+r)^n / ((1+r)^n − 1),L 是放款额(车价 − 首付),r 是月利率(年利率 ÷ 12 ÷ 100),n 是月数。3 万美元的车、20% 首付、6% 利率、60 期,月供约 463.99 美元。",
        },
        {
          q: "期限拉长省钱吗?",
          a: "不——它省的是现金流,不是钱。把 60 期拉到 84 期,每期少了,但余额下降慢、多付了很多个月的利息,总利息反而上升。选期限时看总利息那一列,别只看月供。",
        },
        {
          q: "什么算首付?",
          a: "所有 upfront 支付都算:现金、置换旧车抵扣、补贴。可以按车价百分比或固定金额输入。如果首付已覆盖全部车价,工具会提示无需贷款。",
        },
        {
          q: "包含手续费、税费或保险吗?",
          a: "不包含。它只算本金和利息。购置税、上牌、经销商费用和 GAP 险会改变放款额或增加月度成本——如果要把这些打进贷款,就把它们加进车价后重算。",
        },
      ],
      deepDive: [
        {
          heading: "为什么期限是仅次于车价的最大杠杆",
          paragraphs: [
            "分期贷款的总利息约等于平均余额 × 利率 × 年数。拉长期限不改变利率,但让余额在高位停留更久——多出来的利息就从这里来。2.4 万美元、6% 利率的贷款,60 期总利息约 3,839 美元;拉到 84 期,月供降了约四分之一,总利息却超过 5,400 美元。",
            "反过来,这也是提前还款有效的原因:每一美元额外归还的本金,都在剩余期限里以恰好等于贷款利率的“收益率”为你省息。车贷几乎都按每月剩余余额计息,所以提前还本金是利率水平上的无风险回报——前提是合同没有提前还款违约金,签字前值得问清。",
            "表格能让你看见一条实用规则:选预算能扛住、且不至于挤进循环贷的最短期限。一笔付得起但靠拉长期限才付得起的月供,悄悄是三种选择里最贵的那种。",
          ],
        },
        {
          heading: "首付、置换与负资产",
          paragraphs: [
            "车在前几年贬值很快,而贷款摊销很慢,所以低首付会让你在很长一段时间的欠款高于车的价值——负资产。车被撞毁或被盗时这很要命:保险按市场价赔付,不按贷款余额,GAP 险正是为这个缺口存在的。更大的首付同时缩小利息账单和负资产窗口。",
            "置换旧车相当于现金首付,但要问清怎么入账。把置换价值、费用和税费打包进一个放款数的报价,可能用看起来更低的月供掩盖更差的利率。让对方分别给出放款额、利率和期限,任何报价就都可比了——这三个数字正是本计算器复现整笔交易所需的全部。",
            "关于长期限还有一句诚实的话:72、84 期的贷款存在,是因为它们好卖车,不是因为它们是好交易。如果 60 期的月供你付不起,算术上的答案是换一辆便宜的车,而不是拉长期限——本页的利息表格精确显示长期限让你多付多少。",
          ],
        },
        {
          heading: "怎么看表,不看错表",
          paragraphs: [
            "表格每行合并 12 个月,本金与利息两列是年度合计,余额列是年末数字。短期车贷的全部故事可能就四五到七行——足够看清第一年利息占比最高,而最后一笔还款几乎不含利息。",
            "计划表假设利率固定、按期足额还款、不含费用。部分市场存在浮动利率车贷;如果你的会重置,每次重置都改变月供和计划表,应重新计算。逾期、把保险打入贷款、气球尾款结构也会打破模型——气球付款(部分租赁买断和经销商方案常见)会留下一笔本表格未显示的大额期末余额。",
            "和本站所有工具一样,计算完全在浏览器内完成:车价、利率、期限不会上传到任何地方,放心拿真实贷款机构的报价来推演。",
          ],
        },
      ],
    },
    ja: {
      name: "自動車ローン計算",
      tagline:
        "車両価格から頭金を引いて年利で 36〜84 か月融资:毎月の返済額・総利息・元本と利息を年ごとに分解した償還表を表示します。",
      intro: [
        "車両価格、頭金(割合または固定額)、年利、か月数の期間を入力します。計算器は差額を借入対象とし、標準的な残高スライド式の償還公式を適用します。銀行があらゆる分割ローンで使うのと同じ数学です。",
        "毎月の返済額、借入額、期間中の総利息、返済総額に加え、元本と利息を年ごとに分解して残高を追う表を表示します。ドーナツ図で、取引のうちいくらが車本体でいくらが利息かがひと目でわかります。",
        "自動車ローンの期間は一般に 36〜84 か月です。短い期間は月々が重く総利息は軽く。表がそのトレードオフを具体的に示します。「60 か月以内に収める」という定説に頼らずに済みます。",
        "入力する金利はあくまで例であり、提案ではありません。ディーラーや銀行の金利は信用・期間・キャンペーンで変わります。計算はすべてブラウザ内で完結するので、実際の見積りを入れて並べて比較しても安全です。",
      ],
      steps: [
        "車両価格と頭金(割合または金額)を入力します。",
        "提示された年利を設定します。",
        "期間をか月で入力します——自動車ローンは一般に 36〜84 か月です。",
        "毎月の返済額・総利息・年次償還表を確認します。",
      ],
      faqs: [
        {
          q: "毎月の返済額はどう計算しますか?",
          a: "標準償還公式 M = L × r × (1+r)^n / ((1+r)^n − 1) を使います。L は借入額(車両価格 − 頭金)、r は月利(年利 ÷ 12 ÷ 100)、n は月数です。3 万ドルの車に 2 割の頭金、年 6%、60 か月なら、月々は約 463.99 ドルです。",
        },
        {
          q: "期間を長くすると得ですか?",
          a: "得になるのはキャッシュフローであって、お金ではありません。60 を 84 か月に延ばすと月々は下がりますが、残高の減りが遅く利息の月数が増えるため、総利息は増えます。期間を選ぶときは月々ではなく総利息の列を比べてください。",
        },
        {
          q: "頭金として何を入力しますか?",
          a: "前払いするものすべてです。現金、下取り評価額、リベート。価格に対する割合か固定額で入力できます。頭金が価格全体を覆う場合、ローン不要と表示します。",
        },
        {
          q: "手数料・税金・保険は含まれますか?",
          a: "含まれません。元本と利息だけをモデル化しています。自動車税・登録・ディーラー費用・GAP 保険は借入額や月々の負担を変えるので、ローンに組むなら価格に上乗せして再計算してください。",
        },
      ],
      deepDive: [
        {
          heading: "車両価格の次に大きなレバーが期間である理由",
          paragraphs: [
            "分割ローンの総利息は、ざっくり平均残高 × 金利 × 年数です。期間を延ばしても金利は変わりませんが、残高をより長く高い水準に保つ——余分な利息はここから生まれます。2 万 4 千ドル・年 6% のローンでは、60 か月の総利息は約 3,839 ドル。84 か月に延ばすと月々は約 4 分の 1 下がる一方、総利息は 5,400 ドルを超えます。",
            "逆方向が繰り上げ返済が効く理由です。元本の 1 ドル余分に返すたび、残りの期間ずっとローン金利と等しい率の利息が消えます。自動車ローンはほぼ毎月の残高に対して利息を計るので、元本の前倒し返済はローン金利水準の無リターン・リスクなしの「利回り」です。契約に繰り上げ手数料がないか、署名前に確認する価値があります。",
            "表が見える化する実務の目安:家計が回転資金に転落せずに耐えられる最短の期間を選ぶこと。支払えるのに期間を延ばしてまで払う月々は、静かに三つの選択肢で最も高くつきます。",
          ],
        },
        {
          heading: "頭金、下取りとマイナス残債",
          paragraphs: [
            "車は最初の数年で急速に価値が落ち、ローンはゆっくり償還されます。頭金が少ないと、長い期間にわたって残債が車の価値を上回る——マイナス残債——状態が続きます。車が全損・盗難になったとき問題になります。保険は残債ではなく時価を払うので、GAP 保険はまさにこのギャップのためのもの。頭金を厚くすると利息とマイナス残債の期間の両方が縮みます。",
            "下取りは現金の頭金と同じように働きますが、適用のされ方を確認してください。下取り評価・費用・税を一つの借入数にまとめたディーラー見積りは、よく見える月々の裏に悪い金利を隠せます。借入額・金利・期間を別々に出してもらえば、どの見積りも比較可能です。この三つの数字こそ、この計算器が取引を再現するのに必要なすべてです。",
            "長期間についての誠実な一言。72・84 か月ローンがあるのは車が売れるからで、良い取引だからではありません。60 か月の月々が払えないなら、算術的な答えは「長いローン」ではなく「安い車」です。このページの利息表が、延ばした期間の代価を正確に示します。",
          ],
        },
        {
          heading: "表を読む、読み違えないために",
          paragraphs: [
            "表は 12 か月を 1 行にまとめます。元本・利息の各列は年間合計、残高の列は年末の数字です。短期の自動車ローンなら全容が 4〜7 行に収まります。最初の年は利息が重く、最後の返済は利息がほとんど残らない——これを読み取るには十分です。",
            "償還表は金利固定・期日どおりの返済・手数料なしを仮定します。変動金利の自動車ローンも一部の市場に存在します。リセット型なら、リセットのたびに返済額と償還表が変わるので再計算してください。延滞、ローンへの保険組み込み、バルーン(残価一括)構造もモデルを壊します。リース買取りやディーラー方案でよくあるバルーン支払いは、この表が示さない大きな最終残高を残します。",
            "このサイトの他のツールと同様、計算はすべてブラウザ内で完結します。価格・金利・期間はどこにも送信されないので、実在の貸し手の見積りを入れて試しても安全です。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de préstamo para coche",
      tagline:
        "Precio menos entrada, financiado a su tipo en 36–84 meses: cuota mensual, interés total y tabla de amortización año a año.",
      intro: [
        "Introduzca el precio del coche, la entrada (un porcentaje o un importe fijo), un tipo de interés anual y un plazo en meses. La calculadora financia la diferencia y aplica la fórmula estándar de amortización de saldo decreciente — la misma matemática que los bancos usan para cualquier préstamo a plazos.",
        "Obtiene la cuota mensual, el importe financiado, el interés total del plazo y el total pagado, más una tabla anual que reparte capital e intereses y sigue el saldo pendiente. Un gráfico de donut muestra cuánto del trato es el coche y cuánto es el interés.",
        "Los plazos de crédito automovilístico suelen ir de 36 a 84 meses. Los plazos cortos cuestan más al mes y menos en interés total; la tabla hace concreta esa contrapartida en vez de dejarla en un eslogan de no pasar de 60 meses.",
        "El tipo que introduzca es un dato de ejemplo, no una oferta — las cotizaciones de concesionario y banco varían con el crédito, el plazo y los incentivos. Todo se calcula localmente en su navegador, así que puede pegar presupuestos reales y compararlos lado a lado.",
      ],
      steps: [
        "Introduzca el precio del coche y la entrada como porcentaje o importe.",
        "Fije el tipo de interés anual que le ofrecen.",
        "Introduzca el plazo en meses — los créditos de coche suelen ser de 36–84.",
        "Lea la cuota mensual, el interés total y la tabla de amortización anual.",
      ],
      faqs: [
        {
          q: "¿Cómo se calcula la cuota mensual?",
          a: "Con la fórmula estándar de amortización M = L × r × (1+r)^n / ((1+r)^n − 1), donde L es el importe financiado (precio − entrada), r el tipo mensual (anual ÷ 12 ÷ 100) y n los meses. Un coche de 30.000 con 20% de entrada al 6% a 60 meses da unos 463,99 al mes.",
        },
        {
          q: "¿Un plazo más largo ahorra dinero?",
          a: "No — ahorra flujo de caja, no dinero. Estirar de 60 a 84 meses baja cada cuota pero añade meses de interés sobre un saldo que baja despacio, así que el interés total sube. Compare la columna de interés total, no la mensual, al elegir plazo.",
        },
        {
          q: "¿Qué cuenta como entrada aquí?",
          a: "Todo lo que pague por adelantado: efectivo, el valor de su usado o descuentos. Introdúzcalo como porcentaje del precio o importe fijo. Si la entrada cubre todo el precio, la herramienta le indica que no se necesita préstamo.",
        },
        {
          q: "¿Incluye comisiones, impuestos o seguro?",
          a: "No. Modela solo capital e interés. El impuesto, la matriculación, las comisiones del concesionario y el seguro de gap cambian el importe financiado o añaden coste mensual — recalcle con todo ello dentro del precio si lo financia.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué el plazo es la palanca más grande tras el precio",
          paragraphs: [
            "El interés total de un préstamo a plazos ronda el saldo medio por el tipo por los años. Un plazo más largo no cambia el tipo, pero mantiene los saldos altos durante más tiempo — ahí nace el interés extra. En un préstamo de 24.000 al 6%, el plan a 60 meses paga unos 3.839 de interés; estirar a 84 meses baja la cuota cerca de un cuarto pero sube el interés total por encima de 5.400.",
            "Al revés es por lo que amortizar por adelantado funciona: cada dólar extra de capital elimina interés exactamente a su tipo de préstamo durante el resto del plazo. Los créditos de coche casi siempre calculan interés sobre el saldo pendiente cada mes, así que pagar capital pronto es un retorno garantizado y sin riesgo al tipo del préstamo — si el contrato no tiene comisión de amortización anticipada, algo que conviene comprobar antes de firmar.",
            "Una regla práctica que la tabla hace visible: elija el plazo más corto cuya cuota aguante su presupuesto sin deslizarse a deuda revolvente. Una cuota que puede pagar pero que exige estirar el plazo es, en silencio, la opción más cara de las tres.",
          ],
        },
        {
          heading: "La entrada, el usado y el capital negativo",
          paragraphs: [
            "Los coches se deprecian rápido en los primeros años mientras los préstamos amortizan despacio, así que una entrada pequeña puede dejarle debiendo más de lo que vale el coche — capital negativo — durante un buen tramo. Importa si el coche es siniestro total o robado: el seguro paga el valor de mercado, no el saldo, y el seguro de gap existe precisamente para ese hueco. Una entrada mayor encoge tanto la factura de interés como la ventana de capital negativo.",
            "Un usado se comporta como efectivo de entrada, pero compruebe cómo se aplica. Una cotización de concesionario que mete el valor del usado, las comisiones y los impuestos en un solo importe financiado puede esconder un peor tipo tras una cuota que parece menor. Pedir importe financiado, tipo y plazo por separado hace comparable cualquier oferta — esos tres números son todo lo que esta calculadora necesita para reproducir el trato.",
            "Una advertencia honesta sobre los plazos largos: los préstamos a 72 y 84 meses existen porque venden coches, no porque sean buen negocio. Si no puede pagar la cuota a 60 meses, la respuesta aritmética es un coche más barato, no un préstamo más largo — la tabla de interés de esta página muestra exactamente lo que le cuesta el plazo más largo.",
          ],
        },
        {
          heading: "Leer la tabla sin leerla mal",
          paragraphs: [
            "La tabla agrupa doce meses en cada fila, así que capital e interés son totales anuales y el saldo es la cifra de fin de año. En créditos de coche cortos toda la historia cabe en cuatro a siete filas — suficiente para ver que el primer año es de interés pesado y que la última cuota casi no retira interés.",
            "El calendario asume tipo fijo, pagos puntuales y sin comisiones. Existen créditos de coche a tipo variable en algunos mercados; si el suyo se revisa, la cuota y el calendario cambian en cada revisión, así que recalcule. Pagos fallidos, seguros dentro del préstamo y estructuras con pago final también rompen el modelo — el pago balloon, común en ciertos planes de compra de leasing y de concesionario, deja un saldo final grande que esta tabla no muestra.",
            "Como todo en este sitio, el cálculo corre íntegramente en su navegador: ni el precio, ni el tipo, ni el plazo se envían a ningún sitio, así que puede explorar presupuestos reales con tranquilidad.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de financiamento de veículo",
      tagline:
        "Preço menos entrada, financiado à sua taxa em 36–84 meses: parcela mensal, total de juros e tabela de amortização ano a ano.",
      intro: [
        "Informe o preço do carro, a entrada (uma porcentagem ou um valor fixo), uma taxa de juros anual e um prazo em meses. A calculadora financia a diferença e aplica a fórmula padrão de amortização de saldo decrescente — a mesma matemática que os bancos usam para qualquer empréstimo parcelado.",
        "Você recebe a parcela mensal, o valor financiado, o total de juros do prazo e o total pago, mais uma tabela anual que divide principal e juros e acompanha o saldo devedor. Um gráfico de rosca mostra quanto do negócio é o carro e quanto é juro.",
        "Os prazos de financiamento de veículos costumam ir de 36 a 84 meses. Prazos curtos custam mais por mês e menos em juros totais; a tabela torna essa troca concreta em vez de deixá-la num bordão de não passar de 60 meses.",
        "A taxa que você informar é um exemplo de entrada, não uma oferta — cotações de concessionária e banco variam com crédito, prazo e incentivos. Tudo é calculado localmente no seu navegador, então é seguro colar cotações reais e compará-las lado a lado.",
      ],
      steps: [
        "Informe o preço do carro e a entrada como porcentagem ou valor.",
        "Defina a taxa de juros anual oferecida a você.",
        "Informe o prazo em meses — financiamentos de carro costumam ter 36–84.",
        "Leia a parcela mensal, o total de juros e a tabela de amortização anual.",
      ],
      faqs: [
        {
          q: "Como a parcela mensal é calculada?",
          a: "Pela fórmula padrão de amortização M = L × r × (1+r)^n / ((1+r)^n − 1), onde L é o valor financiado (preço − entrada), r a taxa mensal (anual ÷ 12 ÷ 100) e n os meses. Um carro de 30.000 com 20% de entrada a 6% por 60 meses dá cerca de 463,99 por mês.",
        },
        {
          q: "Um prazo mais longo economiza dinheiro?",
          a: "Não — economiza fluxo de caixa, não dinheiro. Esticar de 60 para 84 meses baixa cada parcela mas soma meses de juros sobre um saldo que cai devagar, então o total de juros sobe. Compare a coluna de juros totais, não a mensal, ao escolher o prazo.",
        },
        {
          q: "O que conta como entrada aqui?",
          a: "Tudo o que você paga antecipadamente: dinheiro, o crédito do seu usado ou descontos. Informe como porcentagem do preço ou valor fixo. Se a entrada cobre o preço inteiro, a ferramenta avisa que não é preciso financiamento.",
        },
        {
          q: "Inclui tarifas, impostos ou seguro?",
          a: "Não. Modela apenas principal e juros. Imposto, emplacamento, tarifas de concessionária e seguro gap mudam o valor financiado ou somam custo mensal — recalcule com tudo isso no preço se você financiar.",
        },
      ],
      deepDive: [
        {
          heading: "Por que o prazo é a maior alavanca depois do preço",
          paragraphs: [
            "O total de juros de um empréstimo parcelado é aproximadamente o saldo médio vezes a taxa vezes os anos. Um prazo mais longo não muda a taxa, mas mantém os saldos altos por mais tempo — daí vem o juro extra. Num financiamento de 24.000 a 6%, o plano de 60 meses paga cerca de 3.839 de juros; esticar para 84 meses baixa a parcela quase um quarto mas leva os juros totais além de 5.400.",
            "No sentido contrário está o motivo de a amortização antecipada funcionar: cada dólar extra de principal remove juros exatamente à taxa do seu empréstimo pelo resto do prazo. Financiamentos de veículo quase sempre calculam juros sobre o saldo devedor a cada mês, então adiantar principal é um retorno garantido e sem risco à taxa do contrato — se não houver tarifa de amortização antecipada, algo que vale conferir antes de assinar.",
            "Uma regra prática que a tabela torna visível: escolha o prazo mais curto cuja parcela o seu orçamento aguenta sem escorregar para dívida rotativa. Uma parcela que você consegue pagar mas que exige esticar o prazo é, em silêncio, a opção mais cara das três.",
          ],
        },
        {
          heading: "A entrada, o usado e o capital negativo",
          paragraphs: [
            "Carros desvalorizam rápido nos primeiros anos enquanto financiamentos amortizam devagar, então uma entrada pequena pode deixar você devendo mais do que o carro vale — capital negativo — por um bom trecho. Isso importa se o carro é sinistrado ou roubado: o seguro paga o valor de mercado, não o saldo, e o seguro gap existe justamente para esse vão. Uma entrada maior encolhe tanto a conta de juros quanto a janela de capital negativo.",
            "Um usado se comporta como dinheiro de entrada, mas confira como ele é aplicado. Uma cotação de concessionária que embute valor do usado, tarifas e impostos num único valor financiado pode esconder uma taxa pior atrás de uma parcela que parece menor. Pedir valor financiado, taxa e prazo separadamente torna qualquer proposta comparável — esses três números são tudo o que esta calculadora precisa para reproduzir o negócio.",
            "Uma advertência honesta sobre prazos longos: financiamentos de 72 e 84 meses existem porque movem carro, não porque sejam bom negócio. Se você não comporta a parcela de 60 meses, a resposta aritmética é um carro mais barato, não um financiamento mais longo — a tabela de juros desta página mostra exatamente quanto o prazo maior custa.",
          ],
        },
        {
          heading: "Ler a tabela sem ler errado",
          paragraphs: [
            "A tabela agrupa doze meses em cada linha, então principal e juros são totais anuais e o saldo é o valor de fim de ano. Em financiamentos de carro curtos, a história inteira cabe em quatro a sete linhas — o bastante para ver que o primeiro ano é pesado em juros e que a última parcela quase não carrega juros.",
            "O cronograma assume taxa fixa, pagamentos em dia e nenhuma tarifa. Financiamentos de veículo a taxa variável existem em alguns mercados; se o seu reseta, a parcela e o cronograma mudam a cada reset, então recalcule. Atrasos, seguro embutido no financiamento e estruturas com balão também quebram o modelo — o pagamento balloon, comum em planos de compra de leasing e de concessionária, deixa um saldo final grande que esta tabela não mostra.",
            "Como tudo neste site, o cálculo roda inteiramente no seu navegador: preço, taxa e prazo não são enviados a lugar algum, então é seguro explorar cotações reais de financiadoras.",
          ],
        },
      ],
    },
  },
});
