import { CalcEngineMortgage } from "../_engines/calc-engine-mortgage";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "mortgage-calculator",
  category: "utility",
  icon: "calc",
  engine: { component: CalcEngineMortgage },
  related: ["loan-calculator", "emi-calculator", "compound-interest-calculator", "currency-converter", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Mortgage Calculator",
      tagline:
        "Work out the monthly payment on a home loan — P&I plus tax, insurance and HOA — with loan amount, total interest and a yearly amortization table.",
      intro: [
        "Enter the home price, down payment, interest rate and term to get the monthly principal-and-interest payment from the standard amortization formula banks use. Add yearly property tax, yearly insurance and monthly HOA dues to see the full PITI amount most lenders quote.",
        "The loan amount, the total interest over the life of the loan and a year-by-year amortization table update live as you type, so you can compare a 20% down payment against 10%, or a 15-year term against 30, in seconds.",
        "The monthly payment comes from the standard amortization formula M = P · r(1+r)^n / ((1+r)^n − 1), where P is the loan amount, r is the monthly rate (annual rate ÷ 12) and n is the number of monthly payments. Because r compounds monthly, a 6% annual rate is applied as 0.5% per month, which is how fixed-rate mortgages actually amortize.",
        "Compared with a bare monthly-payment tool, this one extends the same formula with taxes, insurance and HOA to give a realistic PITI, and shows total interest so you can compare a 15-year against a 30-year term directly. It is an estimate for planning — your lender's exact figures depend on their fees and escrow setup.",],
      steps: [
        "Enter the home price and the down payment as a percent or an amount.",
        "Set the annual interest rate and the term in years.",
        "Optionally add yearly property tax, yearly insurance and monthly HOA dues.",
        "Read the monthly P&I, the PITI total and the yearly amortization table.",
      ],
      faqs: [
        {
          q: "What formula does the mortgage calculator use?",
          a: "The standard fixed-rate amortization formula: M = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), where L is the loan amount (price minus down payment), r the monthly rate (annual ÷ 12 ÷ 100) and n the number of months. As an example, a 300,000 home with 20% down at 6% over 30 years gives a monthly P&I of about 1,438.92 — the rate you enter is an example input, not an offer.",
        },
        {
          q: "What does PITI mean?",
          a: "Principal, Interest, Taxes and Insurance — the four parts of a typical monthly housing payment. The tool adds monthly twelfths of the yearly property tax and insurance you enter, plus HOA dues, on top of the principal-and-interest payment. Whether taxes and insurance are escrowed varies by lender.",
        },
        {
          q: "Why do I pay so much interest in the early years?",
          a: "Interest each month is charged on the remaining balance, which is largest at the start. The amortization table shows the crossover: early payments are mostly interest, and by the final years they are almost all principal. Extra principal payments early in the loan therefore save the most interest.",
        },
      ],
      deepDive: [
        {
          heading: "What the rate on the ad does not include",
          paragraphs: [
            "The rate you type into any mortgage calculator is the note rate — it drives principal and interest and nothing else. The real cost of a mortgage also hides origination fees, points, appraisal and closing costs, which lenders summarize in a separate figure often called the APR. Because the APR folds fees into one annualized number, two offers with the same note rate can differ meaningfully in APR, and that difference is the fees talking.",
            "This tool deliberately models only what the rate drives: P&I from the amortization formula, plus the PITI lines you enter yourself for tax, insurance and HOA. That separation is honest — taxes and insurance are not interest, and bundling them into one “cost” figure makes it impossible to see which lever moved. When comparing lenders, compare their fee sheets alongside their rates.",
            "Escrow is the other quiet variable. In many markets the lender collects a monthly twelfth of property tax and insurance and pays them on your behalf; in others you pay these bills directly. The monthly PITI here is the same either way, but your cash-flow rhythm is not — and some lenders require escrow precisely when the down payment is small.",
          ],
        },
        {
          heading: "Down payment, term, and the 15/30 trade-off",
          paragraphs: [
            "A bigger down payment shrinks the loan, the interest and often the rate itself, since lenders price risk partly on the loan-to-value ratio. In several markets a down payment under 20% also triggers mortgage insurance, an extra monthly line this tool lets you approximate by adding it to the insurance field. The 20% figure is not magic — it is the historical threshold where that insurance typically stops being required.",
            "The 15-versus-30-year choice looks like a rate question but is mostly a term question: shorter terms carry lower rates and far less total interest, because the balance is retired in half the time. The yearly amortization table shows the mechanics — on a 30-year loan, interest still dominates payments deep into the second decade, while a 15-year schedule flips to principal-heavy within a few years.",
            "What the comparison cannot tell you is opportunity cost. The lower payment on the 30-year term leaves monthly cash free for emergencies, retirement accounts or prepayment at will — flexibility a 15-year contract takes away by force. Run both scenarios here, look at the total-interest gap, then decide whether buying that flexibility is worth it to you.",
          ],
        },
        {
          heading: "Reading PITI like a lender does",
          paragraphs: [
            "Lenders judge affordability with ratios, not vibes: housing expense (the PITI you see here) against gross income, and total monthly debts against gross income — the debt-to-income measure. Common guidance keeps housing below roughly 28% of gross income and total debts below the mid-30s in percent, though programs vary; these are planning heuristics, not rules any single regulator imposes everywhere.",
            "The yearly table is also a prepayment map. Because interest is charged on the remaining balance, one extra payment a year aimed at principal can shave years off a 30-year loan — but only if the lender applies it to principal, so say so in writing when you pay. The table lets you sketch the effect by shortening the term and comparing balances year by year.",
            "All numbers here are estimates: the rate is whatever you type, not an offer, and actual escrow amounts, insurance premiums and taxes change over the years. The calculation runs locally in your browser — home price, income figures and rate never leave your device.",
          ],
        },
      ],
    },
    zh: {
      name: "房贷计算器",
      tagline:
        "输入房价、首付、利率与年限,立即算出每月本息月供与 PITI 总支出,附贷款总额、总利息和逐年还款计划表,可选房产税、保险与物业费。",
      intro: [
        "输入房价、首付、年利率和贷款年限,即可用银行通用的标准摊销公式算出每月本息月供;再填入每年的房产税、保险和每月物业费,就能看到贷款机构常报的 PITI 每月总支出。",
        "贷款总额、整个贷款期的总利息以及逐年还款计划表会随输入实时更新,方便你几秒钟内对比首付两成与一成、15 年期与 30 年期的差别。",
      ],
      steps: [
        "输入房价,首付可选按百分比或按金额填写。",
        "设置年利率和贷款年限。",
        "按需填写年房产税、年保险和每月物业费。",
        "查看每月本息、PITI 总支出和逐年还款计划表。",
      ],
      faqs: [
        {
          q: "房贷计算用的是哪个公式?",
          a: "标准等额本息摊销公式:M = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1),其中 L 为贷款额(房价减首付),r 为月利率(年利率 ÷ 12 ÷ 100),n 为总月数。举例:30 万的房子首付两成、年利率 6%、30 年,月供本息约 1,438.92——这里的利率只是示例输入,不构成任何报价。",
        },
        {
          q: "PITI 是什么意思?",
          a: "即本金(Principal)、利息(Interest)、税费(Taxes)和保险(Insurance),是常见的每月住房支出四部分。本工具在你输入的年房产税、年保险基础上按月均摊,再加上物业费,叠加到本息月供上。税费和保险是否由贷款机构代管因机构而异。",
        },
        {
          q: "为什么前几年还的利息占比这么高?",
          a: "每月利息按剩余本金计收,期初余额最大,所以利息最多。还款计划表能直观看到这个交叉点:前期月供大部分是利息,到最后几年几乎全是本金。因此贷款前期多还本金,省下的利息最多。",
        },
      ],
      deepDive: [
        {
          heading: "广告上的利率没告诉你的部分",
          paragraphs: [
            "你输进房贷计算器的利率只是“合同利率”,它只驱动本息月供这一项。房贷的真实成本还包括贷款手续费、点数、评估费和各项交割费用,贷款机构通常把这些汇总成另一个数字——年化费用率(APR)。由于 APR 把费用折进一个年化数字,两笔合同利率相同的报价,APR 可能差别明显,差的正是费用。",
            "本工具刻意只算利率驱动的部分:由摊销公式得出的本息,加上你自己填入的房产税、保险和物业费等 PITI 项目。这样拆开是诚实的做法——税费和保险不是利息,如果打包成一个“成本”数字,就看不出到底是哪个杠杆在动。比较贷款机构时,把费率表和利率放在一起比。",
            "代管账户(Escrow)是另一个隐性变量。很多市场里,贷款机构会按月代收房产税和保险的十二分之一并代为缴纳;另一些市场则由你自己直接缴费。两种情况下这里的月度 PITI 相同,但现金流节奏不同——而且首付较低时,不少贷款机构恰恰会强制要求代管。",
          ],
        },
        {
          heading: "首付、期限与 15/30 年的取舍",
          paragraphs: [
            "更高的首付会同时缩小贷款额、利息,常常还有利率本身,因为贷款机构会部分按贷款价值比(LTV)来定价。在不少市场,首付低于两成还会触发房贷保险,这是一项额外的月度支出——你可以在本工具的保险一栏里近似填入。两成这个数字并非魔法,它只是历史上通常不再要求房贷保险的门槛。",
            "15 年期与 30 年期的选择看起来是利率问题,其实主要是期限问题:短期限利率更低、总利息少得多,因为余额只用一半的时间就还清。逐年摊销表展示了机制——30 年期贷款到第二个十年利息仍占大头,而 15 年期的计划用不了几年就翻转为以本金为主。",
            "但这笔对比算不出机会成本。30 年期较低的月供,把每月现金留给应急、养老账户或随时提前还款——这种灵活性是 15 年期合同强制收走的。在这里把两种方案各跑一遍,看看总利息差多少,再决定这份灵活性值不值这个价。",
          ],
        },
        {
          heading: "像贷款机构一样读 PITI",
          paragraphs: [
            "贷款机构用比率判断承受能力,而不是感觉:住房支出(即这里的 PITI)占税前收入的比例,以及全部月度债务占税前收入的比例——后者就是债务收入比。常见指引是住房支出不超过税前收入的约 28%、总债务控制在百分之三十几以内,不同产品有差异;这些是规划用的经验值,不是任何一家监管机构在所有地方统一的硬性规定。",
            "逐年计划表同时也是一张提前还款地图。因为利息按剩余本金计收,每年多还一次本金、并明确指定冲抵本金,30 年期贷款可以缩短好几年——前提是贷款机构把它计入本金,所以还款时务必书面注明。想估算效果,可以在表里缩短期限、逐年对比余额。",
            "这里所有数字都是估算:利率是你填的数,不是报价;代管金额、保险费和税费逐年都会变。计算完全在浏览器本地完成——房价、收入和利率不会离开你的设备。",
          ],
        },
      ],
    },
    ja: {
      name: "住宅ローン計算",
      tagline:
        "住宅価格・頭金・金利・期間から毎月の元利返済額と PITI(返済+税+保険+管理費)を即時算出。借入額・総利息・年次返済スケジュールも表示します。",
      intro: [
        "住宅価格・頭金・金利・期間を入力すると、銀行が使う標準的な元利均等返済の公式で毎月の返済額を算出します。年額の固定資産税・保険料と月額の管理費を加えれば、貸し手が提示する PITI の月額合計もわかります。",
        "借入額・期間中の総利息・年ごとの返済スケジュールは入力に合わせてリアルタイムで更新されるので、頭金 2 割と 1 割、15 年と 30 年の比較もすぐにできます。",
      ],
      steps: [
        "住宅価格と頭金(パーセントまたは金額)を入力します。",
        "年利と期間(年)を設定します。",
        "必要に応じて年間の固定資産税・保険料・月額の管理費を入力します。",
        "毎月の元利返済額・PITI 合計・年次返済スケジュールを確認します。",
      ],
      faqs: [
        {
          q: "どの式で計算していますか?",
          a: "標準的な元利均等返済の公式 M = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1) です。L は借入額(価格 − 頭金)、r は月利(年利 ÷ 12 ÷ 100)、n は月数。例えば 30 万の住宅で頭金 2 割・年利 6%・30 年なら、毎月の元利返済額は約 1,438.92 です。入力する金利はあくまで例であり、提案ではありません。",
        },
        {
          q: "PITI とは何ですか?",
          a: "元金(Principal)・利息(Interest)・税金(Taxes)・保険(Insurance)の頭文字で、典型的な毎月の住居費 4 要素を指します。このツールは入力された年額の固定資産税と保険料を 12 分割し、管理費と合わせて元利返済額に上乗せします。税・保険をエスクローにするかは貸し手によって異なります。",
        },
        {
          q: "返済初期の利息が多いのはなぜですか?",
          a: "毎月の利息は残高に対して課されるため、残高が最大の初期に最も多くなります。返済スケジュールを見ると、初期の返済は利息中心で、最終盤はほぼ元本だけになります。したがって繰り上げ返済は早い時期ほど利息削減効果が大きくなります。",
        },
      ],
      deepDive: [
        {
          heading: "広告の金利に含まれていないもの",
          paragraphs: [
            "住宅ローン計算に入力する金利は「表示金利」であり、元本と利息だけを動かします。ローンの実際のコストには、事務手数料、ポイント(前払い金利)、査定料、諸費用が隠れており、貸し手はこれらを別の指標——実質年率(APR)に近い形——にまとめて示すことがあります。APR は諸費用を年率に織り込むため、表示金利が同じでも APR が大きく違うことがあり、その差こそが手数料の正体です。",
            "このツールはあえて金利が動かす部分だけを計算します。償還公式による元利返済と、自分で入力する固定資産税・保険・管理費の PITI 項目です。この分離は誠実です。税金や保険は利息ではなく、一つの「コスト」にまとめるとどのレバーが動いたか見えなくなります。貸し手を比べるときは、金利と一緒に手数料一覧も比べてください。",
            "エスクロー(預かり代行)も静かな変数です。多くの市場では貸し手が固定資産税と保険料の 12 分の 1 を毎月預かって納付しますが、別の市場では自分で直接支払います。どちらでもここの月間 PITI は同じですが、キャッシュフローのリズムは変わります。しかも頭金が小さい場合、エスクローを義務づける貸し手は少なくありません。",
          ],
        },
        {
          heading: "頭金・期間・15 年と 30 年のトレードオフ",
          paragraphs: [
            "頭金を増やすと借入額と利息が減り、多くの場合金利そのものも下がります。貸し手は貸出比率(LTV)に応じてリスクを織り込むためです。多くの市場では頭金 2 割未満で住宅ローン保険が発生し、これはこのツールの保険欄に概算として入力できます。2 割という数字に魔法はなく、歴史的にこの保険が不要になる目安にすぎません。",
            "15 年か 30 年かの選択は金利の問題ではなく、ほぼ期間の問題です。短期は金利が低く、残高を半分の期間で返し切るため総利息が桁違いに少なくなります。年次償還表はその仕組みを見せてくれます。30 年ローンは返済期間の 2 個目の十年でも利息が支配的ですが、15 年なら数年で元本中心に反転します。",
            "ただしこの比較は機会費用を教えてくれません。30 年の低い返済額は、毎月の現金を緊急資金・老後資金・自由な繰り上げ返済に回せるという柔軟性です。それは 15 年契約が強制的に奪うものです。両方のシナリオをここで回し、総利息の差を見てから、その柔軟性にいくら払う価値があるか決めてください。",
          ],
        },
        {
          heading: "貸し手のように PITI を読む",
          paragraphs: [
            "貸し手は感覚ではなく比率で返済能力を判断します。住居費(ここの PITI)を額面収入で割ったものと、全月返済額を額面収入で割った債務対収入比(DTI)です。よくある目安は住居費を額面の約 28% 以下、総債務を 30% 台前半以下に抑えることで、商品により異なります。これは計画用のヒューリスティックであり、どこでも一律に義務づける規則ではありません。",
            "年次表は繰り上げ返済の地図にもなります。利息は残高にかかるので、年に一度、元本に充当すると明示した上で追加返済すれば、30 年ローンを数年短縮できます。ただし貸し手が元本に充当する場合に限るため、支払う際は必ず書面で指定してください。期間を短くして残高を年ごとに比べれば効果を試算できます。",
            "ここの数値はすべて推定です。金利は入力した値であって提示ではなく、エスクロー額・保険料・税金は年ごとに変わります。計算はブラウザ内で完結し、住宅価格・収入・金利が端末の外に出ることはありません。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de hipoteca",
      tagline:
        "Calcule la cuota mensual de su hipoteca — capital e interés más impuestos, seguro y comunidad — con el interés total y la amortización anual.",
      intro: [
        "Introduzca el precio de la vivienda, la entrada, el tipo de interés y el plazo para obtener la cuota mensual de capital e interés con la fórmula de amortización estándar que aplican los bancos. Añada el impuesto anual, el seguro anual y la cuota mensual de la comunidad para ver el PITI completo que suelen citar los prestamistas.",
        "El importe del préstamo, el interés total de la vida del préstamo y la tabla de amortización año por año se actualizan al escribir, de modo que puede comparar una entrada del 20 % frente al 10 %, o un plazo de 15 años frente a 30, en segundos.",
      ],
      steps: [
        "Escriba el precio de la vivienda y la entrada, en porcentaje o importe.",
        "Fije el tipo de interés anual y el plazo en años.",
        "Opcionalmente añada impuesto anual, seguro anual y cuota mensual de comunidad.",
        "Lea la cuota mensual de capital e interés, el PITI y la tabla de amortización anual.",
      ],
      faqs: [
        {
          q: "¿Qué fórmula usa la calculadora de hipoteca?",
          a: "La fórmula estándar de amortización a tipo fijo: M = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), donde L es el préstamo (precio menos entrada), r el tipo mensual (anual ÷ 12 ÷ 100) y n los meses. Como ejemplo, una vivienda de 300.000 con una entrada del 20 % al 6 % a 30 años da una cuota de unos 1.438,92 — el tipo que introduce es un dato de ejemplo, no una oferta.",
        },
        {
          q: "¿Qué significa PITI?",
          a: "Capital, Interés, Tasas e Insurance (seguro): las cuatro partes de un pago mensual de vivienda típico. La herramienta añade doceavos mensuales del impuesto y del seguro anuales que indique, más la cuota de comunidad, sobre la cuota de capital e interés. Si impuestos y seguro se escrowan depende del prestamista.",
        },
        {
          q: "¿Por qué pago tantos intereses los primeros años?",
          a: "Cada mes el interés se calcula sobre el saldo pendiente, que es máximo al principio. La tabla de amortización muestra el cruce: las cuotas iniciales son casi todo interés y en los últimos años casi todo capital. Por eso amortizar capital al principio ahorra muchos más intereses.",
        },
      ],
      deepDive: [
        {
          heading: "Lo que el tipo del anuncio no incluye",
          paragraphs: [
            "El tipo que usted escribe en cualquier calculadora de hipoteca es el tipo nominal del contrato: solo mueve capital e interés. El coste real de una hipoteca esconde además comisiones de apertura, puntos, tasación y gastos de formalización, que los prestamistas resumen en otra cifra, el tipo anual equivalente con comisiones (APR). Como el APR integra las comisiones en un número anualizado, dos ofertas con el mismo tipo nominal pueden diferir de forma notable en APR, y esa diferencia son las comisiones hablando.",
            "Esta herramienta modela deliberadamente solo lo que el tipo mueve: el capital más interés de la fórmula de amortización, más las líneas de impuesto, seguro y comunidad que usted introduzca. La separación es honesta: impuestos y seguro no son interés, y empaquetarlos en una sola cifra de «coste» impide ver qué palanca se movió. Al comparar prestamistas, compare sus hojas de comisiones junto con sus tipos.",
            "El depósito en custodia (escrow) es la otra variable silenciosa. En muchos mercados el prestamista cobra cada mes un doceavo del impuesto y del seguro y los paga por usted; en otros usted abona directamente. El PITI mensual es el mismo en ambos casos, pero el ritmo de caja no — y con entradas pequeñas, muchos prestamistas exigen precisamente el escrow.",
          ],
        },
        {
          heading: "Entrada, plazo y el trueque 15/30",
          paragraphs: [
            "Una entrada mayor encoge el préstamo, el interés y a menudo el propio tipo, porque los prestamistas fijan el precio del riesgo en parte según el préstamo sobre valor (LTV). En varios mercados una entrada inferior al 20% activa además un seguro de hipoteca, una línea mensual extra que puede aproximar en el campo de seguro de esta herramienta. El 20% no es magia: es el umbral histórico donde ese seguro suele dejar de exigirse.",
            "Elegir entre 15 y 30 años parece una cuestión de tipo, pero es sobre todo de plazo: los plazos cortos llevan tipos menores y muchísimo menos interés total, porque el saldo se amortiza en la mitad del tiempo. La tabla anual muestra la mecánica: en un préstamo a 30 años el interés sigue dominando bien entrada la segunda década, mientras que a 15 años el calendario vira hacia el capital en pocos años.",
            "Lo que la comparación no le dice es el coste de oportunidad. La cuota menor del plazo de 30 años deja cada mes caja libre para emergencias, ahorro para la jubilación o amortizar cuando quiera — una flexibilidad que el contrato a 15 años quita por la fuerza. Simule ambos escenarios aquí, mire la diferencia de interés total y decida si le compensa comprar esa flexibilidad.",
          ],
        },
        {
          heading: "Leer el PITI como lo lee un prestamista",
          paragraphs: [
            "Los prestamistas juzgan la capacidad de pago con ratios, no con intuiciones: el gasto de vivienda (el PITI que ve aquí) frente al ingreso bruto, y el total de deudas mensuales frente al ingreso bruto, la medida de endeudamiento. La orientación habitual mantiene la vivienda por debajo del 28% del bruto y las deudas totales en los treinta y pocos por ciento, aunque varía por programa; son heurísticas de planificación, no reglas que un único regulador imponga en todas partes.",
            "La tabla anual es también un mapa de amortizaciones. Como el interés se cobra sobre el saldo pendiente, un pago extra al año dirigido a capital puede recortar años de un préstamo a 30 — pero solo si el prestamista lo aplica a capital, así que indíquelo por escrito al pagar. La tabla permite esbozar el efecto acortando el plazo y comparando saldos año a año.",
            "Todas las cifras aquí son estimaciones: el tipo es el que usted escribe, no una oferta, y los importes en custodia, las primas de seguro y los impuestos cambian con los años. El cálculo corre localmente en su navegador: el precio de la vivienda, los ingresos y el tipo nunca salen de su dispositivo.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de financiamento imobiliário",
      tagline:
        "Calcule a parcela mensal do financiamento da casa — principal e juros mais IPTU, seguro e condomínio — com total de juros e amortização anual.",
      intro: [
        "Informe o preço do imóvel, a entrada, a taxa de juros e o prazo para obter a parcela mensal de principal e juros pela fórmula de amortização padrão dos bancos. Adicione IPTU anual, seguro anual e condomínio mensal para ver o PITI completo que os credores costumam citar.",
        "O valor financiado, o total de juros da vida do contrato e a tabela de amortização ano a ano se atualizam ao digitar, então você compara uma entrada de 20% contra 10%, ou um prazo de 15 anos contra 30, em segundos.",
      ],
      steps: [
        "Digite o preço do imóvel e a entrada, em porcentagem ou valor.",
        "Defina a taxa de juros anual e o prazo em anos.",
        "Opcionalmente informe IPTU anual, seguro anual e condomínio mensal.",
        "Veja a parcela mensal de principal e juros, o PITI e a tabela de amortização anual.",
      ],
      faqs: [
        {
          q: "Qual fórmula a calculadora de financiamento usa?",
          a: "A fórmula padrão de amortização a taxa fixa: M = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), onde L é o valor financiado (preço menos entrada), r a taxa mensal (anual ÷ 12 ÷ 100) e n os meses. Como exemplo, um imóvel de 300.000 com entrada de 20% a 6% em 30 anos dá uma parcela de cerca de 1.438,92 — a taxa informada é um exemplo, não uma oferta.",
        },
        {
          q: "O que significa PITI?",
          a: "Principal, Interest, Taxes and Insurance (juros, impostos e seguro): as quatro partes típicas do pagamento mensal de uma moradia. A ferramenta soma um doze avos mensais do IPTU e do seguro anuais informados, mais o condomínio, à parcela de principal e juros. Se impostos e seguro ficam em custódia depende do credor.",
        },
        {
          q: "Por que pago tantos juros nos primeiros anos?",
          a: "O juro mensal incide sobre o saldo devedor, que é maior no começo. A tabela de amortização mostra a virada: as parcelas iniciais são quase todo juro e nos anos finais quase todo principal. Por isso amortizar cedo economiza muito mais juros.",
        },
      ],
      deepDive: [
        {
          heading: "O que a parcela real inclui além dos juros",
          paragraphs: [
            "A parcela de principal e juros é só a parte previsível do custo de uma moradia. O PITI soma imposto do imóvel e seguro — divididos em doze avos mensais — e, quando aplicável, o condomínio. Comprar olhando apenas para a parcela de juros é o erro clássico: dois financiamentos com a mesma parcela podem ter custos mensais reais muito diferentes depois dos encargos.",
            "A entrada reduz o valor financiado e, com isso, os juros totais de forma desproporcional: entradas maiores costumam vir com taxas menores e podem dispensar seguro obrigatório extra. A simulação aceita a entrada em porcentagem ou valor, o que facilita testar cenários — 10% contra 25% — antes de comprometer reservas.",
            "O prazo é a alavanca mais mal compreendida: em 30 anos você paga menos por mês, mas muito mais no total. A tabela de amortização anual deixa isso visível — some os juros de 15 anos e compare com 30 na mesma taxa, e a diferença costuma surpreender mais do que a diferença de parcela.",
          ],
        },
        {
          heading: "Por que os primeiros anos são quase todo juro",
          paragraphs: [
            "O juro mensal incide sobre o saldo devedor: no primeiro pagamento, o saldo é o valor total, então quase tudo vai para juros; cada centavo de principal quitado reduz o saldo do mês seguinte, e a proporção vai se invertendo. A tabela de amortização mostra exatamente o mês em que principal ultrapassa juros — em taxas típicas, isso acontece depois de muitos anos.",
            "É por isso que amortizações antecipadas economizam tanto: um pagamento extra no início encurta a vida inteira do contrato, porque evita juros que ainda nem foram cobrados. O mesmo valor extra no final economiza muito menos. Ferramentas de crédito sabem disso, e é por isso que programas de transferência de saldo renegociam contratos jovens.",
            "Se você refinancia ou quita cedo, peça o saldo devedor atual, não uma estimativa: a tabela desta ferramenta é uma projeção na taxa informada, e pagamentos atípicos mudam a trajetória real. Use a simulação para planejar, e o extrato do credor para a cifra exata.",
          ],
        },
        {
          heading: "Aluguel ou comprar: o que a parcela não responde",
          paragraphs: [
            "A comparação honesta não para na parcela versus aluguel. O comprador assume custos que o inquilino não tem: manutenção, imposto do imóvel, seguro e o custo de oportunidade da entrada. O inquilino paga um aluguel que sobe com a inflação e não acumula patrimônio. As duas contas se cruzam em pontos diferentes conforme o mercado — não existe resposta universal.",
            "Uma heurística de mercado: o índice preço-aluguel da região indica quantos anos de aluguel equivalem ao preço de compra. Números muito altos historicamente favorecem alugar e investir a diferença; números baixos favorecem comprar. É um indicador bruto, mas calibra melhor do que comparar parcela com aluguel diretamente.",
            "A simulação aqui roda inteira no seu navegador — preço, taxa e entrada não são enviados a nenhum servidor. Use-a para testar cenários privados antes de falar com qualquer credor, e trate a taxa como hipótese a confirmar: os números do exemplo são ilustrativos, não ofertas.",
          ],
        },
      ],
    },
  },
});
