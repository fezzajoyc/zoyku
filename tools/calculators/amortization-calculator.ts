import { CalcEngineAmort } from "../_engines/calc-engine-amort";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "amortization-calculator",
  category: "utility",
  icon: "layers",
  engine: { component: CalcEngineAmort },
  related: ["mortgage-calculator", "loan-calculator", "emi-calculator", "compound-interest-calculator", "break-even-calculator", "discount-calculator"],
  copy: {
    en: {
      name: "Amortization Calculator",
      tagline: "A full month-by-month amortization table: how each payment splits into interest and principal, what balance remains after any year, and the true total interest.",
      intro: [
        "This tool shows the complete life of a fixed-rate loan at monthly resolution. Enter the loan amount, the annual interest rate and the term, and every month appears as its own row: the interest charged on that month's balance, the principal the payment retires, and the balance left afterward. Where most calculators compress this into yearly rows, the monthly view shows the mechanics exactly as a lender's ledger does.",
        "One number people rarely see elsewhere is the balance after any specific year. Type a year into the balance field and the tool reports exactly what would still be owed at that point — the figure that matters if you are weighing a sale, a refinance or a move, since that is the amount a payoff statement would carry.",
        "The math is the standard amortization formula: the payment is M = L · r(1+r)^n / ((1+r)^n − 1) with r the monthly rate (annual ÷ 12 ÷ 100) and n the months. Each month the interest is simply the outstanding balance × r, and everything above that in the payment reduces principal. Because the balance falls, the interest share of each payment falls too — the table makes that drift visible month after month.",
        "Compared with a mortgage tool that reports yearly totals, this one is built for questions at month granularity: when does a payment first put more toward principal than interest, how much interest does a specific month carry, what exactly happens in month 317. The interest is charged monthly on a declining balance, which is how fixed-rate loans actually amortize.",
      ],
      steps: [
        "Enter the loan amount, the annual rate and the term in years.",
        "Read the monthly payment, the total interest and the total repaid.",
        "Enter a year to see the balance remaining at that year's end.",
        "Scroll the monthly table to follow interest and principal payment by payment.",
      ],
      faqs: [
        {
          q: "How is this different from a yearly amortization table?",
          a: "A yearly table adds twelve months into one row, so the interest-heavy start and the principal-heavy end blur together. The monthly table keeps every period separate: you can see interest drop and principal rise payment by payment, and pinpoint the exact month when principal first exceeds interest.",
        },
        {
          q: "What does the balance-after-year number mean?",
          a: "It is what the loan would still owe after that many monthly payments, assuming every payment was made on time and no extra principal was ever added. It is the closest estimate to what a payoff statement would show at that moment, before any per-diem interest or fees your lender adds.",
        },
        {
          q: "Why is almost all of the first payment interest?",
          a: "Interest each month equals the outstanding balance times the monthly rate, and the balance is largest on day one. On a 30-year loan at 6%, the first payment is roughly 74% interest; by the final year the same payment is almost entirely principal. The table shows this crossover happening gradually, not suddenly.",
        },
        {
          q: "Does the schedule assume the rate never changes?",
          a: "Yes. It models a fixed-rate loan for the rate you enter. For a variable-rate product, recalculate after every reset — each reset changes both the payment and the entire path of the schedule. The rate you type is an example input, not an offer.",
        },
      ],
      deepDive: [
        {
          heading: "What monthly resolution reveals that yearly rows hide",
          paragraphs: [
            "Grouping by year is a presentation choice, not a property of the loan. The ledger underneath is monthly: interest accrues on the balance, the payment retires it, the balance drops. A yearly row averages twelve very different months — on a 30-year loan, month 1 carries about three times the interest of month 120, yet a year-grouped table can show both inside a single row.",
            "Monthly rows also answer questions yearly rows cannot. When does the principal share of a payment cross 50%? How much interest does the loan still accrue if you sell after month 40? What exactly does the balance look like the month before a planned refinance? None of these is visible when twelve months collapse into one row.",
            "There is a reading trap worth naming: with the monthly table in front of you, it is tempting to add arbitrary months to invent scenarios. But every row assumes all prior payments were made exactly on schedule — skip payments or add extra principal and the entire path changes, so recompute rather than extrapolate.",
          ],
        },
        {
          heading: "The crossover month, and what it tells you about prepayment",
          paragraphs: [
            "Early in any amortizing loan the payment is mostly interest; late in it, mostly principal. The crossover month — where principal first exceeds interest — sits at different points depending on rate and term: around year 14 on a 30-year loan at 6%, but far earlier on a 15-year term. The monthly table shows it exactly rather than approximately.",
            "The crossover matters for prepayment decisions because each extra dollar of principal removes interest at your loan rate for the rest of the term. An extra payment in month 12 suppresses interest for nearly every row below it; the same payment in month 300 suppresses almost none, because so few interest-heavy rows remain. This is why prepayment advice always emphasizes the early years — and why the table, not a rule of thumb, should drive the decision.",
            "One honest caveat: the schedule assumes a fixed rate and no fees. If refinancing is likely, the effective horizon is shorter than the stated term, which weakens the long-tail argument for extra payments. Run both scenarios — hold to term versus refinance at a specific year — and compare the total interest in each.",
          ],
        },
        {
          heading: "Using the balance column for real-life decisions",
          paragraphs: [
            "The balance after year N is the single most requested number in loan planning because most real exits happen mid-loan: selling a home, refinancing, paying off early with a bonus. The table's balance column gives that number directly for every year, and the balance field at the top lets you query any specific year without scanning rows.",
            "Compare that balance with what you could realistically recover — a home's likely sale price, an investment account you could liquidate — and the equity picture appears without any further math. It also exposes how slowly equity builds early: on a long loan, the balance after five years is typically only a few points below the original amount.",
            "As with everything on this site, the computation runs entirely in your browser: loan amount, rate and term never leave the page, so it is safe to run real quotes through the table. Treat the schedule as the baseline scenario — rate changes, missed payments or extra principal all shift the path, and the honest move is to recalculate when any input changes.",
          ],
        },
      ],
    },
    zh: {
      name: "摊销计算器",
      tagline: "逐月摊销表完整呈现:每月还款拆成多少利息、多少本金,任意年份末还剩多少余额,以及真实的总利息成本。",
      intro: [
        "这个工具以月为单位展示一笔固定利率贷款的完整生命周期。输入贷款金额、年利率和期限,每个月都会单独成行:当月余额产生的利息、还款中归还本金的部分,以及月末剩余余额。多数计算器把这些压缩成年级行,而月度视图和贷款机构的台账一样精确。",
        "还有一个别处很少给出的数字:任意年份末的贷款余额。在余额查询框输入年份,工具会精确告诉你那时还欠多少——如果你在考虑卖房、转按揭或提前结清,这正是还清账单上的那个数字。",
        "数学就是标准摊销公式:月供 M = L · r(1+r)^n / ((1+r)^n − 1),其中 r 是月利率(年利率 ÷ 12 ÷ 100),n 是月数。每月利息 = 上月余额 × r,月供中超出利息的部分归还本金。余额逐月下降,所以利息占比也逐月下降——表格让这个过程月月可见。",
        "与按年汇总的房贷计算器相比,它为月粒度的问题而生:第几个月本金占比首次过半?某一个月到底含多少利息?第 317 期到底发生什么?利息按月计在递减的余额上,这正是固定利率贷款真实的摊销方式。",
      ],
      steps: [
        "输入贷款金额、年利率和期限(年)。",
        "查看月供、总利息和还款总额。",
        "输入年份,查看该年末的剩余本金。",
        "翻看逐月表格,跟踪每期利息与本金的此消彼长。",
      ],
      faqs: [
        {
          q: "它和年度摊销表有什么区别?",
          a: "年度表把 12 个月合并成一行,前期利息重、后期本金重的演变被抹平了。月度表保留每一期:你能逐期看到利息下降、本金上升,并精确找到本金占比首次超过利息的那一个月。",
        },
        {
          q: "第 N 年末的余额是什么口径?",
          a: "它假设此前每期都按时足额还款、期间没有任何额外还本,即还完第 N×12 期后的剩余本金。这是那个时点还清账单金额的最接近估计,尚未计入贷款机构可能收取的按日计息或费用。",
        },
        {
          q: "为什么第一笔还款几乎全是利息?",
          a: "每月利息等于剩余余额乘以月利率,而余额在第一天最大。30 年期、6% 利率下,首期约 74% 是利息;到最后一年,同样的月供几乎全是本金。表格显示这个交叉是渐进发生的,而不是突然发生。",
        },
        {
          q: "计划表假设利率一直不变吗?",
          a: "是的。它按你输入的利率模拟固定利率贷款。如果是浮动利率产品,每次利率重置后都应重新计算——每次重置都会同时改变月供和整张计划表。你输入的利率仅为示例,不构成报价。",
        },
      ],
      deepDive: [
        {
          heading: "月度分辨率能看见什么,年度行藏了什么",
          paragraphs: [
            "按年合并只是展示方式的选择,不是贷款的属性。底层台账是月度的:利息按余额计,月供归还它,余额下降。一个年度行平均了十二个很不一样的月份——30 年期贷款里,第 1 个月的利息约是第 120 个月的三倍,但按年合并后两者可能落在同一行里。",
            "月度行还能回答年度行答不了的问题:第几期本金占比首次过半?如果第 40 个月卖房,贷款还累计了多少利息?计划转按揭前的那个月,余额具体是多少?十二个月坍缩成一行时,这些问题都无从谈起。",
            "有个读表陷阱值得点名:面对月度表,人很容易随手累加几个月去虚构场景。但每一行都假设此前所有还款严格按计划完成——跳过一期或额外还本,整条路径都会改变。所以变化之后应当重算,而不是顺着表外推。",
          ],
        },
        {
          heading: "交叉月,以及它对提前还款的含义",
          paragraphs: [
            "任何摊销贷款的早期,还款以利息为主;后期以本金为主。“本金占比首次超过利息”的交叉月因利率与期限而不同:6% 利率的 30 年期贷款大约在第 14 年,而 15 年期则早得多。月度表给出的是精确值而非近似值。",
            "交叉月对提前还款的意义在于:每一元额外归还的本金,都按贷款利率在剩余期限内消除利息。第 12 个月的额外还款会压低下方几乎每一行的利息;第 300 个月的同样还款几乎没有效果,因为利息重的行已经不多了。这就是提前还款建议总是强调前几年的原因——也是为什么该由表格而不是经验法则来驱动决策。",
            "诚实的提醒:计划表假设固定利率、无费用。如果转按揭概率不低,实际持有期就短于名义期限,这会削弱“长期额外还款”的逻辑。把两种情景都跑一遍——持有到期与第 N 年转按揭——分别比较总利息。",
          ],
        },
        {
          heading: "把余额列用进真实决策",
          paragraphs: [
            "第 N 年末余额是贷款规划中最常被问到的数字,因为大多数真实退出发生在贷款中途:卖房、转按揭、用奖金提前结清。表格的余额列逐年直接给出这个数,顶部的余额查询框则让你不必翻行就能查任意年份。",
            "把这个余额与你实际可能拿回的钱——房子的预期售价、可以变现的投资账户——放在一起,权益图景不需要再算什么就出现了。它也暴露了前期权益积累有多慢:长期贷款前五年的余额,通常只比原始本金低几个百分点。",
            "和本站所有工具一样,计算完全在浏览器内完成:贷款金额、利率、期限不会离开页面,放心把真实报价放进表格推演。把计划表当作基准情景——利率变化、逾期、额外还本都会移动路径,输入一变就重算才是诚实做法。",
          ],
        },
      ],
    },
    ja: {
      name: "償却(返済)スケジュール計算",
      tagline: "月ごとの完璧な返済表:毎回の返済が利息と元本にどう分かれるか、任意の年末に残高がいくらか、そして本当の総利息まで。",
      intro: [
        "このツールは固定金利ローンの一生を月単位で表示します。借入額・年利・期間を入力すると、毎月が独立した行になります。その月の残高にかかった利息、返済額のうち元本に充てられた部分、そして月末の残高です。ほとんどの計算機はこれを年次行に圧縮しますが、月次ビューは貸し手の台帳と同じ精細さを持ります。",
        "めったに見られない数字が「任意の年を終えた時点の残高」です。年の欄に数字を入れると、その時点でまだいくら残っているかを正確に表示します。売却、借り換え、早期完済を比較検討するなら、これが完済明細に載る金額そのものです。",
        "計算は標準的な償却公式です。返済額 M = L · r(1+r)^n / ((1+r)^n − 1)、r は月利(年利 ÷ 12 ÷ 100)、n は月数。毎月の利息は残高 × r そのもので、返済額のうち利息を超えた部分が元本を減らします。残高が下がるほど利息の割合も下がる——表はその変化を月ごとに見せます。",
        "年次合計を報告する住宅ローン計算機と比べ、このツールは月粒度の問いのために作られています。何か月目で元本の割合が初めて利息を上回るか、特定の月に利息がいくらか、第 317 回で何が起きるか。利息は減少しながらの残高に月ごとに課され、これが固定金利ローンの実際の償却の仕組みです。",
      ],
      steps: [
        "借入額・年利・期間(年)を入力します。",
        "毎月の返済額・総利息・返済総額を確認します。",
        "年を入力して、その年末の残高を確認します。",
        "月次表をたどって、利息と元本の入れ替わりを追います。",
      ],
      faqs: [
        {
          q: "年次返済表とどう違いますか?",
          a: "年次表は 12 か月を 1 行にまとめるため、利息中心の序盤と元本中心の終盤が混ざります。月次表は各期を分けたまま、返済ごとに利息が減り元本が増える様子を見せ、元本が初めて利息を上回る月を正確に特定できます。",
        },
        {
          q: "「N 年後の残高」の意味は?",
          a: "それまでの返済がすべて期日どおりで、追加の元本返済がなかったと仮定して、N×12 回の返済を終えた時点の残額です。その時点の完済明細金額に最も近い推定ですが、貸し手の日割り利息や手数料は含まれません。",
        },
        {
          q: "最初の返済がほぼ利息なのはなぜ?",
          a: "毎月の利息は残高 × 月利であり、残高は初日が最大だからです。30 年・6% のローンでは最初の返済の約 74% が利息で、最終年には同じ返済額がほぼすべて元本になります。表が示すこの逆転は徐々に進行します。",
        },
        {
          q: "金利はずっと固定という前提ですか?",
          a: "はい。入力した金利での固定金利ローンをモデル化しています。変動金利なら、見直しのたびに再計算してください。金利が変わると返済額とスケジュール全体が変わります。入力する金利は例であり、提案ではありません。",
        },
      ],
      deepDive: [
        {
          heading: "月次解像度が見せ、年次行が隠すもの",
          paragraphs: [
            "年でまとめるのは表示上の選択であって、ローンの性質ではありません。台帳は月次です。利息は残高にかかり、返済がそれを返し、残高が下がる。年次行は 12 の非常に異なる月を平均します。30 年ローンでは第 1 か月の利息は第 120 か月の約 3 倍ですが、年次表では同じ行に入り得ます。",
            "月次行は年次行が答えられない問いにも答えます。元本の割合が 50% を超えるのは何か月目か。40 か月で売るなら、それまでに利息はいくら積み上がったか。借り換え予定の前月、残高は具体的にいくらか。12 か月が 1 行に潰れると、どれも見えません。",
            "読み取りの落とし穴もあります。月次表を前にすると、適当な月を足し合わせて自作のシナリオを作りたくなります。しかし各行は「それ以前の返済が厳密に予定どおり」という前提の上に成り立ちます。返済を飛ばしたり上乗せしたりすれば道筋全体が変わるので、外挿ではなく再計算を。",
          ],
        },
        {
          heading: "交叉月が繰り上げ返済に教えてくれること",
          paragraphs: [
            "償却ローンの序盤は利息中心、終盤は元本中心です。元本が初めて利息を上回る交叉月は、金利と期間で位置が変わります。6%・30 年では 14 年ごろ、15 年ならずっと早く訪れます。月次表はこれを概算ではなく正確に示します。",
            "交叉月が繰り上げ返済に関係するのは、追加で返す 1 円の元本が残存期間にわたってローン金利分の利息を消すからです。第 12 か月の追加返済は下のほぼすべての行の利息を減らしますが、第 300 か月の同じ返済はほとんど効果がありません。だからこそ繰り上げの助言は常に序盤を強調します。経験則ではなく、表で判断してください。",
            "正直な注意点。スケジュールは固定金利・手数料なしを仮定します。借り換えの可能性が高ければ実質の保有期間は名目より短く、「長期の上乗せ返済」の理屈は弱まります。持ち切るシナリオと、特定の年に借り換えるシナリオの両方を回して、総利息を比べてください。",
          ],
        },
        {
          heading: "残高列を現実の意思決定に使う",
          paragraphs: [
            "「N 年末の残高」はローン計画で最もよく聞かれる数字です。住宅の売却、借り換え、ボーナスでの完済など、現実の出口はローン途中に多いからです。表の残高列は年ごとにその数字を直接示し、上部の入力欄なら行をなぞらずに任意の年を問い合わせられます。",
            "その残高を実際に取り戻せる額——家の想定売却価格、解約できる投資口座——と並べると、 equity の全体像が追加計算なしに浮かび上がります。また、序盤の equity がいかに遅く積み上がるかも露わになります。長期ローンでは 5 年後の残高は元本よりほんの数ポイント低いだけ、ということは珍しくありません。",
            "このサイトの他のツールと同様、計算はすべてブラウザ内で完結します。借入額・金利・期間はページ外へ出ないので、実在の見積りを入れて試しても安全です。スケジュールは基準シナリオとして扱い、金利・延滞・追加返済のいずれが変わっても再計算するのが誠実な使い方です。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de amortización",
      tagline: "Tabla de amortización mes a mes: cómo se reparte cada cuota entre intereses y capital, qué saldo queda al final de cualquier año y el interés total real.",
      intro: [
        "Esta herramienta muestra la vida completa de un préstamo a tipo fijo con resolución mensual. Introduzca el importe, el tipo anual y el plazo, y cada mes aparece como su propia fila: los intereses que genera el saldo de ese mes, el capital que la cuota amortiza y el saldo que queda después. Donde la mayoría de calculadoras comprime esto en filas anuales, la vista mensual muestra la mecánica tal y como la registra el librador del préstamo.",
        "Un número que casi nadie muestra es el saldo al final de un año concreto. Escriba un año en el campo de saldo y la herramienta informa exactamente de cuánto se seguiría debiendo en ese punto: la cifra que importa si valora una venta, una refinanciación o una mudanza, porque es la que llevaría un certificado de liquidación.",
        "La matemática es la fórmula de amortización estándar: la cuota es M = L · r(1+r)^n / ((1+r)^n − 1), con r el tipo mensual (anual ÷ 12 ÷ 100) y n los meses. Cada mes los intereses son simplemente el saldo pendiente × r, y todo lo que exceda eso en la cuota amortiza capital. Como el saldo baja, la parte de intereses de cada cuota baja también: la tabla hace visible esa deriva mes a mes.",
        "Frente a una herramienta hipotecaria que reporta totales anuales, esta está construida para preguntas con granularidad mensual: en qué cuota el capital supera por primera vez a los intereses, cuánto interés carga un mes específico, qué ocurre exactamente en la cuota 317. Los intereses se cobran cada mes sobre un saldo decreciente, que es como se amortizan de verdad los préstamos a tipo fijo.",
      ],
      steps: [
        "Introduzca el importe, el tipo anual y el plazo en años.",
        "Lea la cuota mensual, el interés total y el total pagado.",
        "Introduzca un año para ver el saldo pendiente al cierre de ese año.",
        "Recorra la tabla mensual siguiendo intereses y capital cuota a cuota.",
      ],
      faqs: [
        {
          q: "¿En qué se diferencia de una tabla de amortización anual?",
          a: "Una tabla anual suma doce meses en una fila, de modo que el arranque cargado de intereses y el final cargado de capital se difuminan. La tabla mensual mantiene cada periodo separado: ve caer el interés y crecer el capital cuota a cuota, y localiza la cuota exacta en que el capital supera por primera vez a los intereses.",
        },
        {
          q: "¿Qué significa el saldo tras N años?",
          a: "Es lo que aún se debería después de ese número de cuotas, suponiendo que todas se pagaron en plazo y no se amortizó nada extra. Es la estimación más cercana a lo que mostraría un certificado de liquidación en ese momento, antes del interés diario y las comisiones que añada su entidad.",
        },
        {
          q: "¿Por qué la primera cuota es casi toda intereses?",
          a: "Los intereses de cada mes equivalen al saldo pendiente por el tipo mensual, y el saldo es máximo el primer día. En un préstamo a 30 años al 6%, la primera cuota es aproximadamente 74% intereses; en el último año la misma cuota es casi todo capital. La tabla muestra que este cruce es gradual, no repentino.",
        },
        {
          q: "¿La tabla asume que el tipo nunca cambia?",
          a: "Sí. Modela un préstamo a tipo fijo para el tipo introducido. En un producto variable, recalcule tras cada revisión: cada revisión cambia la cuota y todo el recorrido de la tabla. El tipo que teclea es un dato de ejemplo, no una oferta.",
        },
      ],
      deepDive: [
        {
          heading: "Lo que revela la resolución mensual y ocultan las filas anuales",
          paragraphs: [
            "Agrupar por año es una decisión de presentación, no una propiedad del préstamo. El libro mayor subyacente es mensual: los intereses se devengan sobre el saldo, la cuota los amortiza, el saldo cae. Una fila anual promedia doce meses muy distintos: en un préstamo a 30 años, la cuota 1 carga unas tres veces los intereses de la cuota 120, y ambas pueden caer dentro de una misma fila anual.",
            "Las filas mensuales también responden preguntas que las anuales no pueden. ¿En qué cuota la parte de capital cruza el 50%? ¿Cuánto interés lleva acumulado el préstamo si vende tras la cuota 40? ¿Cómo queda exactamente el saldo el mes anterior a una refinanciación prevista? Nada de esto se ve cuando doce meses se colapsan en una fila.",
            "Hay una trampa de lectura que conviene nombrar: con la tabla mensual delante, es tentador sumar meses arbitrarios para inventar escenarios. Pero cada fila asume que todos los pagos previos se hicieron exactamente según el calendario: saltar pagos o amortizar más cambia todo el recorrido, así que recalcule en lugar de extrapolar.",
          ],
        },
        {
          heading: "La cuota de cruce y lo que dice sobre amortizar antes",
          paragraphs: [
            "Al principio de todo préstamo amortizable la cuota es sobre todo interés; al final, sobre todo capital. La cuota de cruce —donde el capital supera por primera vez a los intereses— se sitúa en puntos distintos según tipo y plazo: alrededor del año 14 en un préstamo a 30 años al 6%, y mucho antes con un plazo de 15 años. La tabla mensual lo muestra con exactitud, no por aproximación.",
            "El cruce importa para la amortización anticipada porque cada dólar extra de capital elimina intereses a su tipo de préstamo durante el resto del plazo. Un pago extra en la cuota 12 suprime intereses en casi todas las filas por debajo; el mismo pago en la cuota 300 suprime casi ninguno, porque quedan pocas filas cargadas de interés. Por eso el consejo de amortizar siempre insiste en los primeros años, y por eso la tabla —no una regla general— debería decidir.",
            "Una advertencia honesta: la tabla asume tipo fijo y sin comisiones. Si una refinanciación es probable, el horizonte efectivo es más corto que el plazo pactado, lo que debilita el argumento de largo plazo a favor de pagos extra. Simule ambos escenarios —mantener hasta el vencimiento frente a refinanciar en un año concreto— y compare el interés total de cada uno.",
          ],
        },
        {
          heading: "Usar la columna de saldo para decisiones reales",
          paragraphs: [
            "El saldo tras N años es el número más solicitado en la planificación de préstamos, porque la mayoría de las salidas reales ocurren a mitad del contrato: venta de la vivienda, refinanciación, liquidación anticipada con una prima. La columna de saldo da ese número directamente para cada año, y el campo superior permite consultar cualquier año concreto sin recorrer filas.",
            "Compare ese saldo con lo que razonablemente podría recuperar —precio probable de venta de la vivienda, una cuenta de inversión liquidable— y el panorama de equidad aparece sin matemática adicional. También expone lo despacio que se construye la equidad al principio: en un préstamo largo, el saldo a los cinco años suele estar solo unos puntos por debajo del importe original.",
            "Como todo en este sitio, el cálculo corre íntegramente en su navegador: importe, tipo y plazo nunca salen de la página, así que puede pasar presupuestos reales por la tabla con tranquilidad. Trate el calendario como escenario base: cambios de tipo, impagos o amortizaciones extra desplazan la trayectoria, y la respuesta honesta es recalcular cuando cambia cualquier dato.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de amortização",
      tagline: "Tabela de amortização mês a mês: como cada parcela se divide entre juros e principal, qual saldo resta ao fim de qualquer ano e o juro total real.",
      intro: [
        "Esta ferramenta mostra a vida completa de um empréstimo de taxa fixa com resolução mensal. Informe o valor, a taxa anual e o prazo, e cada mês aparece como uma linha própria: os juros que o saldo daquele mês gera, o principal que a parcela amortiza e o saldo que sobra. Onde a maioria das calculadores comprime tudo em linhas anuais, a visão mensal mostra a mecânica exatamente como o razão do credor registra.",
        "Um número que quase ninguém mostra é o saldo ao final de um ano específico. Digite um ano no campo de saldo e a ferramenta informa exatamente quanto ainda se deveria naquele ponto — o número que importa se você avalia uma venda, uma refinanciamento ou uma mudança, pois é o que um comprovante de quitação carregaria.",
        "A matemática é a fórmula padrão de amortização: a parcela é M = L · r(1+r)^n / ((1+r)^n − 1), com r a taxa mensal (anual ÷ 12 ÷ 100) e n os meses. A cada mês, os juros são simplesmente o saldo devedor × r, e tudo o que exceder isso na parcela amortiza principal. Como o saldo cai, a fatia de juros de cada parcela cai também — a tabela torna essa deriva visível mês a mês.",
        "Comparada a uma ferramenta de financiamento que reporta totais anuais, esta foi feita para perguntas com granularidade mensal: em qual parcela o principal passa pela primeira vez os juros, quanto de juro um mês específico carrega, o que exatamente acontece na parcela 317. Os juros incidem mensalmente sobre um saldo decrescente, que é como empréstimos de taxa fixa realmente se amortizam.",
      ],
      steps: [
        "Informe o valor, a taxa anual e o prazo em anos.",
        "Leia a parcela mensal, o total de juros e o total pago.",
        "Digite um ano para ver o saldo devedor ao fim desse ano.",
        "Percorra a tabela mensal acompanhando juros e principal parcela a parcela.",
      ],
      faqs: [
        {
          q: "Qual é a diferença para uma tabela de amortização anual?",
          a: "Uma tabela anual soma doze meses em uma linha, e o início carregado de juros e o fim carregado de principal se embaralham. A tabela mensal mantém cada período separado: você vê o juro cair e o principal crescer parcela a parcela, e localiza a parcela exata em que o principal supera pela primeira vez os juros.",
        },
        {
          q: "O que significa o saldo após N anos?",
          a: "É o que ainda se deveria depois desse número de parcelas, assumindo que todas foram pagas em dia e que nenhum principal extra foi amortizado. É a estimativa mais próxima do que um comprovante de quitação mostraria naquele momento, antes dos juros diários e tarifas que o credor possa cobrar.",
        },
        {
          q: "Por que a primeira parcela é quase toda juros?",
          a: "Os juros de cada mês equivalem ao saldo devedor vezes a taxa mensal, e o saldo é máximo no primeiro dia. Em um financiamento de 30 anos a 6%, a primeira parcela é cerca de 74% juros; no último ano, a mesma parcela é quase todo principal. A tabela mostra que essa virada é gradual, não súbita.",
        },
        {
          q: "A tabela assume que a taxa nunca muda?",
          a: "Sim. Ela modela um empréstimo de taxa fixa para a taxa informada. Em um produto de taxa variável, recalcule após cada revisão — cada revisão muda a parcela e todo o caminho da tabela. A taxa que você digita é um exemplo de entrada, não uma oferta.",
        },
      ],
      deepDive: [
        {
          heading: "O que a resolução mensal revela e as linhas anuais escondem",
          paragraphs: [
            "Agrupar por ano é uma escolha de apresentação, não uma propriedade do empréstimo. O razão por baixo é mensal: juros incidem sobre o saldo, a parcela os amortiza, o saldo cai. Uma linha anual faz a média de doze meses muito diferentes — em um financiamento de 30 anos, a parcela 1 carrega cerca de três vezes os juros da parcela 120, e ambas podem caber em uma mesma linha anual.",
            "As linhas mensais também respondem perguntas que as anuais não conseguem. Em qual parcela a fatia de principal cruza 50%? Quanto de juro o contrato acumulou se você vende após a parcela 40? Como fica exatamente o saldo no mês anterior a uma refinanciamento planejado? Nada disso aparece quando doze meses colapsam em uma linha.",
            "Vale nomear uma armadilha de leitura: com a tabela mensal à frente, é tentador somar meses arbitrários para inventar cenários. Mas cada linha assume que todos os pagamentos anteriores foram feitos exatamente conforme o cronograma — pular pagamentos ou amortizar mais muda o caminho inteiro, então recalcule em vez de extrapolar.",
          ],
        },
        {
          heading: "A parcela de virada e o que ela diz sobre antecipar",
          paragraphs: [
            "No começo de qualquer empréstimo amortizável a parcela é majoritariamente juros; no fim, majoritariamente principal. A parcela de virada — quando o principal supera pela primeira vez os juros — fica em pontos diferentes conforme taxa e prazo: por volta do ano 14 em um contrato de 30 anos a 6%, e muito antes em um prazo de 15 anos. A tabela mensal mostra isso com exatidão, não por aproximação.",
            "A virada importa para a amortização antecipada porque cada real extra de principal elimina juros à taxa do seu empréstimo pelo restante do prazo. Um pagamento extra na parcela 12 suprime juros em quase todas as linhas abaixo; o mesmo pagamento na parcela 300 suprime quase nenhum, porque restam poucas linhas carregadas de juros. Por isso o conselho de antecipar sempre enfatiza os primeiros anos — e por que a tabela, não uma regra de bolso, deve guiar a decisão.",
            "Uma ressalva honesta: a tabela assume taxa fixa e sem tarifas. Se uma refinanciamento é provável, o horizonte efetivo é mais curto que o prazo contratado, o que enfraquece o argumento de longo prazo a favor de pagamentos extras. Rode os dois cenários — levar até o fim versus refinanciar em um ano específico — e compare o juro total de cada um.",
          ],
        },
        {
          heading: "Usar a coluna de saldo para decisões reais",
          paragraphs: [
            "O saldo após N anos é o número mais pedido no planejamento de empréstimos, porque a maioria das saídas reais acontece no meio do contrato: venda do imóvel, refinanciamento, quitação antecipada com uma bonificação. A coluna de saldo entrega esse número diretamente para cada ano, e o campo no topo permite consultar qualquer ano sem varrer linhas.",
            "Compare esse saldo com o que você razoavelmente poderia recuperar — preço provável de venda do imóvel, uma conta de investimentos liquidável — e o quadro de equidade aparece sem matemática adicional. Ele também expõe o quão devagar a equidade se constrói no começo: em um contrato longo, o saldo após cinco anos costuma estar apenas alguns pontos abaixo do valor original.",
            "Como tudo neste site, o cálculo roda inteiramente no seu navegador: valor, taxa e prazo nunca saem da página, então é seguro passar propostas reais pela tabela. Trate o cronograma como cenário-base — mudanças de taxa, atrasos ou amortizações extras deslocam a trajetória, e a resposta honesta é recalcular quando qualquer entrada muda.",
          ],
        },
      ],
    },
  },
});
