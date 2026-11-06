import { CalcEngineLoan } from "../_engines/calc-engine-loan";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "loan-calculator",
  category: "utility",
  icon: "layers",
  engine: { component: CalcEngineLoan, props: { kind: "loan" } },
  related: ["emi-calculator", "percentage-calculator", "gst-calculator", "discount-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Loan Calculator",
      tagline: "See the full picture of a loan: monthly payment, total interest and a year-by-year amortization table showing principal and interest splits.",
      intro: [
        "Everything the EMI view gives you — monthly payment, total interest, total repayment — plus a yearly amortization schedule that shows exactly how much of each year's payments is interest and how much is principal, and what balance remains at the end of every year.",
        "It is the fastest way to understand why extra payments in the early years are so valuable: the table makes the interest-heavy years impossible to miss.",
        "Payments are computed with the standard amortization formula M = P · r(1+r)^n / ((1+r)^n − 1) using the monthly rate r and term n you enter. The yearly table then splits each payment by the same rule lenders use: interest for the period equals the outstanding balance × r, and whatever remains reduces principal.",
        "That split is why the schedule matters more than the headline payment. On a long loan the early years are interest-heavy, so an extra payment made in year one removes far more future interest than the same payment made in year ten — the table makes that visible instead of leaving you to trust a rule of thumb.",],
      steps: [
        "Enter the loan amount, annual rate and tenure in years or months.",
        "Read the monthly payment, total interest and total repayment.",
        "Scroll through the yearly table to see principal, interest and remaining balance per year.",
      ],
      faqs: [
        {
          q: "What is an amortization schedule?",
          a: "A period-by-period breakdown of a fixed-payment loan. Each payment is split into the interest owed on the current balance and the principal it retires, and the balance shrinks every month. The table here groups those months into years.",
        },
        {
          q: "How can I pay less total interest?",
          a: "Three levers: a shorter tenure, a lower rate, or extra principal payments — especially in the first third of the loan when balances are highest. The yearly table shows precisely where the interest concentrates.",
        },
        {
          q: "Does the schedule assume the rate never changes?",
          a: "Yes. It models a fixed-rate loan for the rate you enter. For floating-rate products, recalculate whenever the benchmark resets — each reset changes both the payment and the schedule.",
        },
      ],
      deepDive: [
        {
          heading: "Equal total payment vs equal principal",
          paragraphs: [
            "Consumer loans almost always use the annuity method this tool implements: one constant payment for the whole term, with the interest share shrinking and the principal share growing as the balance falls. The main alternative, equal-principal amortization, keeps the principal slice fixed and lets the payment decline every month. At the same rate and term, equal-principal charges less total interest, because the balance is retired faster from day one.",
            "Lower interest does not make equal-principal “better”. Its first payments are markedly higher, which is exactly what most household budgets cannot carry, and that is why lenders default to the annuity structure. Judge the two by affordability of the early years and by total interest — never by comparing a first-month payment under one method against a later-month payment under the other.",
            "One comparison trap deserves a warning: some markets quote “flat rates”, where interest for the whole term is computed on the original principal instead of the declining balance. A flat rate costs roughly close to double the equivalent reducing-balance rate. Before comparing any two offers, confirm both are reducing-balance quotes; otherwise the numbers are not comparable at all.",
          ],
        },
        {
          heading: "Where prepayment actually pays",
          paragraphs: [
            "Every period's interest equals the outstanding balance times the monthly rate, so retiring principal early removes interest at exactly your loan rate — a risk-free “return” at that rate. Because the balance is largest in the first years, the same extra payment saves the most interest there, and visibly less a decade in. The yearly table makes the difference concrete instead of leaving it to a rule of thumb.",
            "Two practical checks before prepaying: confirm the extra amount is applied to principal rather than booked as an advance on future installments, and ask whether the contract carries a prepayment fee — some fixed-rate products do. A fee that eats most of the interest saved turns a good move into a neutral one.",
            "The honest alternative: if you can reliably earn more, after tax and risk, than your loan rate elsewhere, investing the surplus beats prepaying; if you cannot, prepaying is the guaranteed version of that return. This tool does not predict markets — it shows precisely how much interest each scenario leaves on the table.",
          ],
        },
        {
          heading: "Reading the schedule without misreading it",
          paragraphs: [
            "The table groups twelve months into each row, so the principal and interest columns are yearly totals and the balance column is the year-end figure. Do not compare a yearly row against a monthly statement line — the scale differs by design. The crossover, where annual principal finally exceeds annual interest, usually appears only in the second half of a long loan.",
            "The schedule models a fixed rate, on-time payments and no fees. Rate resets, missed payments, insurance rolled into the loan or restructured terms all change the real path, so treat the table as the baseline scenario and recalculate after any change to the inputs.",
            "Like everything on this site, the computation runs entirely in your browser: no loan amount, rate or tenure is transmitted anywhere, so it is safe to explore real quotes from real banks.",
          ],
        },
      ],
    },
    zh: {
      name: "贷款计算器",
      tagline: "完整呈现一笔贷款:月供、总利息,以及逐年摊销表——每年还了多少本金、付了多少利息、还剩多少余额,一目了然。",
      intro: [
        "包含月供视角的全部信息——月供、总利息、还款总额——外加一张年度摊销计划表,逐年列出利息与本金的拆分以及年末剩余本金。",
        "这也是理解“为什么前几年提前还款最划算”的最快方式:利息集中在哪几年,表格一眼可见。",
      ],
      steps: [
        "输入贷款金额、年利率和期限(年或月)。",
        "查看月供、总利息和还款总额。",
        "翻看逐年表格,了解每年的本金、利息与剩余余额。",
      ],
      faqs: [
        {
          q: "什么是摊销计划表?",
          a: "按期拆解固定月供贷款的表格。每期还款分成“当期余额产生的利息”和“归还的本金”两部分,余额逐月下降。这里的表格把 12 个月合并成一年展示。",
        },
        {
          q: "怎样才能少付总利息?",
          a: "三个办法:缩短期限、降低利率,或额外归还本金——尤其是贷款前三分之一阶段,那时余额最高。逐年表格能精确显示利息集中在哪些年份。",
        },
        {
          q: "计划表假设利率一直不变吗?",
          a: "是的。它按你输入的利率模拟固定利率贷款。如果是浮动利率产品,基准利率每次重置后都应重新计算——每次重置都会改变月供和计划表。",
        },
      ],
      deepDive: [
        {
          heading: "等额本息与等额本金,口径先分清",
          paragraphs: [
            "消费贷款几乎都用本工具实现的等额本息:整个期限内月供恒定,利息占比逐月缩小、本金占比逐月增大。另一种主流方式是等额本金:每月归还的本金固定,月供逐月递减。同样利率、同样期限下,等额本金的总利息更低,因为余额从一开始就下降得更快。",
            "利息更少不等于等额本金“更好”。它前几年的月供明显更高,而多数家庭预算恰恰扛不住这一点,这也是贷款机构默认采用等额本息的原因。比较两种方式,要看前期月供是否付得起、总利息差多少,绝不能拿一种方式第一个月的月供去和另一种方式第 N 个月的月供比。",
            "还要警惕一个陷阱:有些市场流行“ flat rate”(名义平息),即按原始本金、而不是按逐期递减的余额计整个期限的利息。同样数字的平息,实际资金成本大约接近等额本息利率的两倍。比较任何两个报价之前,先确认都是按余额计息的口径,否则数字根本不可比。",
          ],
        },
        {
          heading: "提前还款到底省在哪里",
          paragraphs: [
            "每期利息等于剩余本金乘以月利率,所以提前归还本金,等于获得一笔收益率恰为贷款利率的无风险“回报”。由于期初余额最大,同样一笔额外还款在前几年省下的利息最多,十年之后再还,效果就明显打折。逐年表格把这笔账算得明明白白,不靠经验法则。",
            "提前还款前做两个确认:一是确认额外金额冲抵的是本金,而不是被记成“提前偿还未来若干期月供”;二是问清合同有无提前还款违约金——部分固定利率产品会收。若违约金吃掉了大半省下的利息,这一步就从划算变成了白忙。",
            "也要诚实地说出另一面:如果你有把握在别处获得税后、扣除风险后仍高于贷款利率的回报,把闲钱拿去投资比提前还款更优;没有把握,提前还款就是那个回报的“保本版”。本工具不预测市场,只把两种情景各留下多少利息算清楚。",
          ],
        },
        {
          heading: "怎么看表,不看错表",
          paragraphs: [
            "表格每行合并 12 个月,本金、利息两列是年度合计,余额列是年末数字。不要拿年度行去对月度账单的某一行——口径本来就差一个数量级。长期贷款中“年度本金首次超过年度利息”的交叉点,通常出现在贷款后半程。",
            "计划表假设利率固定、按期足额还款、不含费用。利率重置、逾期、把保险打入贷款或展期改签,都会改变真实路径。把这张表当作基准情景,输入一有变化就重算。",
            "和本站所有工具一样,计算完全在浏览器内完成:贷款金额、利率、期限不会上传到任何地方,放心拿真实银行的报价来做推演。",
          ],
        },
      ],
    },
    ja: {
      name: "ローン計算(年次返済表つき)",
      tagline: "ローンの全体像を表示:毎月の返済額・総利息に加え、元本と利息の内訳がわかる年次返済表付き。",
      intro: [
        "毎月の返済額・総利息・返済総額に加えて、各年の支払いが利息と元本のどちらにいくら充てられ、年末に残高がいくら残るかを示す年次返済スケジュールまで表示します。",
        "返済初期の繰り上げ返済がなぜお得なのかが最も早く理解できるツールです。利息が集中する年が表からひと目で読み取れます。",
      ],
      steps: [
        "借入額・年利・期間(年またはか月)を入力します。",
        "毎月の返済額・総利息・返済総額を確認します。",
        "年次表をたどって、各年の元本・利息・残高を確認します。",
      ],
      faqs: [
        {
          q: "返済スケジュール(償還表)とは何ですか?",
          a: "一定額返済ローンを期間ごとに分解した表です。各返済は「現在残高への利息」と「返済される元本」に分かれ、残高は毎月減っていきます。ここでは 12 か月を 1 年にまとめて表示します。",
        },
        {
          q: "総利息を減らすには?",
          a: "3 つの方法があります。期間を短くする、金利を下げる、または元本を上乗せして返済する——特に残高が大きい返済初期の 3 分の 1 が効果的です。年次表で利息の集中箇所を正確に確認できます。",
        },
        {
          q: "スケジュールは金利固定を前提にしていますか?",
          a: "はい。入力した金利での固定金利ローンを想定しています。変動金利の場合は、基準金利が変わるたびに再計算してください。変更のたびに返済額とスケジュールの両方が変わります。",
        },
      ],
      deepDive: [
        {
          heading: "元利均等か元金均等か、まず方式を確認",
          paragraphs: [
            "個人ローンのほとんどは、このツールが実装する元利均等返済です。返済額は期間中一定で、利息の割合が減り元本の割合が増えていきます。もう一つの方式、元金均等返済は元本部分を固定し、返済額を毎月減らしていきます。同じ金利・同じ期間なら、元金均等の方が残高が早く減るため総利息は少なくなります。",
            "利息が少ないからといって元金均等が「良い」とは限りません。返済初期の負担が明らかに重く、家計予算がこれに耐えられないことが多く、だからこそ貸し手は元利均等を標準にしています。比較するときは初期の返済負担と総利息の差で判断し、ある方式の初月返済額と別の方式の後月返済額を並べるような比べ方はしないでください。",
            "もう一つの落とし穴が「フラット率」です。残高ではなく当初元金のまま期間全体の利息を計算する方式で、同じ数字でも残高スライド式に換算するとおおむね倍近くの実質金利になります。金利を比較する前に、両方とも残高に対して利息を計算する方式か必ず確認してください。",
          ],
        },
        {
          heading: "繰り上げ返済はどこで効くか",
          paragraphs: [
            "各期の利息は残高×月利で決まります。つまり元本を早く減らすことは、ローン金利そのものを無リターンの利率として得ることと同じです。残高は返済初期に最大なので、同じ追加返済でも最初の数年が最も利息を削り、10 年後では効果が目に見えて小さくなります。年次表がその差を具体的に示します。",
            "繰り上げ前の確認は二つ。追加額が未来の返済分の前払いではなく元本に充当されること、そして契約に繰り上げ手数料がないかです。固定金利商品には手数料のあるものがあり、削減利息の大半を手数料が消したら意味がなくなります。",
            "正直なもう一つの選択肢も念頭に。税引後・リスク控除後でローン金利を上回る運用を安定して確保できるなら、繰り上げより投資が有利です。確保できないなら、繰り上げ返済はその利回りの「元本保証版」です。このツールは市場を予測しません。各シナリオで利息がいくら残るかを正確に示すだけです。",
          ],
        },
        {
          heading: "表を読む、読み違えないために",
          paragraphs: [
            "年次表は 12 か月を 1 行にまとめています。元本・利息の各列は年間合計、残高の列は年末時点の数字です。年の行と月次明細の行を直接比べないでください。桁が違うのは仕様です。長期ローンで「年間元本が年間利息を初めて上回る」交叉点は、通常ローン後半に現れます。",
            "スケジュールは金利固定・期日どおりの返済・手数料なしを仮定しています。金利の見直し、延滞、保険のローン組み込み、条件変更はいずれも実際の経路を変えます。表は基準シナリオとして扱い、入力が変われば再計算してください。",
            "このサイトの他のツールと同様、計算はすべてブラウザ内で完結します。借入額・金利・期間はどこにも送信されないので、実在の銀行の見積りを入れて試しても安全です。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de préstamos",
      tagline: "Vea el préstamo completo: cuota mensual, interés total y una tabla de amortización anual con el reparto entre capital e intereses.",
      intro: [
        "Todo lo que ofrece la vista de cuota — pago mensual, interés total, devolución total — más un calendario de amortización anual que muestra cuánto de cada año va a intereses y cuánto a capital, y qué saldo queda al cierre de cada año.",
        "Es la forma más rápida de entender por qué amortizar en los primeros años resulta tan ventajoso: la tabla hace imposibles de pasar por alto los años cargados de interés.",
      ],
      steps: [
        "Introduzca el importe, el tipo anual y el plazo en años o meses.",
        "Lea la cuota mensual, el interés total y la devolución total.",
        "Recorra la tabla anual para ver capital, intereses y saldo pendiente por año.",
      ],
      faqs: [
        {
          q: "¿Qué es una tabla de amortización?",
          a: "El desglose periodo a periodo de un préstamo de cuota fija. Cada cuota se reparte entre el interés que genera el saldo vigente y el capital que amortiza, y el saldo baja cada mes. Esta tabla agrupa esos meses en años.",
        },
        {
          q: "¿Cómo pago menos intereses en total?",
          a: "Tres palancas: un plazo más corto, un tipo más bajo o amortizaciones extra de capital — sobre todo en el primer tercio del préstamo, cuando el saldo es mayor. La tabla anual muestra con precisión dónde se concentra el interés.",
        },
        {
          q: "¿La tabla asume que el tipo no cambia?",
          a: "Sí. Modela un préstamo a tipo fijo para el tipo introducido. En productos a tipo variable, vuelva a calcular cada vez que se revise el índice: cada revisión cambia tanto la cuota como el calendario.",
        },
      ],
      deepDive: [
        {
          heading: "Cuota constante frente a capital constante",
          paragraphs: [
            "Casi todos los préstamos de consumo usan el método de cuota constante que implementa esta herramienta: un pago fijo durante todo el plazo, con la parte de interés reduciéndose y la de capital creciendo a medida que baja el saldo. La alternativa principal, la amortización de capital constante, fija la parte de capital y deja que la cuota descienda mes a mes. Con el mismo tipo y plazo, el capital constante genera menos interés total, porque el saldo se amortiza más rápido desde el primer día.",
            "Menos interés no hace al capital constante «mejor». Sus primeras cuotas son notablemente más altas, justo lo que la mayoría de los presupuestos domésticos no soportan, y por eso los prestamistas parten de la cuota constante. Compare los dos por la asequibilidad de los primeros años y por el interés total, nunca confrontando la primera cuota de un método con la enésima del otro.",
            "Una trampa merece aviso: en algunos mercados se cotizan «tipos planos», donde el interés de todo el plazo se calcula sobre el capital original, no sobre el saldo decreciente. Un tipo plano cuesta aproximadamente el doble del tipo equivalente de saldo decreciente. Antes de comparar dos ofertas, confirme que ambas usan interés sobre saldo; si no, las cifras no son comparables.",
          ],
        },
        {
          heading: "Dónde compensa de verdad amortizar antes",
          paragraphs: [
            "El interés de cada periodo es el saldo pendiente por el tipo mensual, así que retirar capital pronto equivale a obtener un «rendimiento» sin riesgo igual a su tipo de préstamo. Como el saldo es máximo en los primeros años, el mismo pago extra ahorra más interés ahí, y visiblemente menos una década después. La tabla anual hace concreta esa diferencia en lugar de dejarla en una regla general.",
            "Dos comprobaciones antes de amortizar: confirme que el importe extra se aplica a capital y no se contabiliza como adelanto de cuotas futuras, y pregunte si el contrato lleva comisión por amortización anticipada — algunos productos a tipo fijo la cobran. Una comisión que devore el interés ahorrado convierte un buen movimiento en uno neutro.",
            "La alternativa honesta: si puede ganar de forma fiable, tras impuestos y riesgo, más que su tipo de préstamo en otra parte, invertir el excedente supera a amortizar; si no puede, amortizar es la versión garantizada de ese retorno. Esta herramienta no predice mercados: muestra con precisión cuánto interés deja sobre la mesa cada escenario.",
          ],
        },
        {
          heading: "Leer la tabla sin leerla mal",
          paragraphs: [
            "La tabla agrupa doce meses en cada fila, así que las columnas de capital e interés son totales anuales y la de saldo es la cifra de fin de año. No compare una fila anual con una línea del extracto mensual: la escala difiere a propósito. El cruce, cuando el capital anual supera por fin al interés anual, suele aparecer solo en la segunda mitad de un préstamo largo.",
            "El calendario modela un tipo fijo, pagos puntuales y sin comisiones. Revisiones de tipo, impagos, seguros dentro del préstamo o reestructuraciones cambian la trayectoria real: trate la tabla como escenario base y recalcule tras cualquier cambio en los datos.",
            "Como todo en este sitio, el cálculo corre íntegramente en su navegador: ni el importe, ni el tipo, ni el plazo se envían a ningún sitio, así que puede explorar ofertas reales con tranquilidad.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de empréstimo",
      tagline: "Veja o empréstimo inteiro: parcela mensal, total de juros e uma tabela de amortização anual com a divisão entre principal e juros.",
      intro: [
        "Tudo o que a visão de parcela oferece — pagamento mensal, total de juros, total pago — mais um cronograma de amortização anual mostrando quanto de cada ano vai para juros e para principal, e qual saldo resta no fim de cada ano.",
        "É o jeito mais rápido de entender por que amortizar nos primeiros anos vale tanto: a tabela deixa impossível ignorar os anos em que os juros dominam.",
      ],
      steps: [
        "Informe o valor, a taxa anual e o prazo em anos ou meses.",
        "Veja a parcela mensal, o total de juros e o total pago.",
        "Percorra a tabela anual para ver principal, juros e saldo devedor por ano.",
      ],
      faqs: [
        {
          q: "O que é um cronograma de amortização?",
          a: "A divisão período a período de um empréstimo de parcela fixa. Cada parcela se separa em juros sobre o saldo vigente e principal que ele amortiza, e o saldo cai todo mês. Aqui os meses são agrupados em anos.",
        },
        {
          q: "Como pago menos juros no total?",
          a: "Três alavancas: prazo menor, taxa menor ou amortizações extraordinárias de principal — sobretudo no primeiro terço do contrato, quando o saldo é maior. A tabela anual mostra exatamente onde o juro se concentra.",
        },
        {
          q: "O cronograma presume taxa fixa?",
          a: "Sim. Ele modela um empréstimo a taxa fixa para a taxa informada. Em produtos com taxa variável, recalcule sempre que o indexador mudar — cada mudança altera a parcela e o cronograma.",
        },
      ],
      deepDive: [
        {
          heading: "Parcela fixa ou principal fixo: primeiro, o critério",
          paragraphs: [
            "Quase todo empréstimo de consumo usa o método de parcela fixa que esta ferramenta implementa: um pagamento constante por todo o prazo, com a fatia de juros caindo e a de principal crescendo à medida que o saldo diminui. A alternativa principal, a amortização com principal constante, fixa a fatia de principal e deixa a parcela cair mês a mês. Com a mesma taxa e prazo, o principal constante gera menos juros totais, porque o saldo é quitado mais rápido desde o primeiro dia.",
            "Menos juros não torna o principal constante “melhor”. As primeiras parcelas são bem mais altas — exatamente o que a maioria dos orçamentos domésticos não comporta — e é por isso que os credores partem da parcela fixa. Compare os dois pela capacidade de pagar os primeiros anos e pelos juros totais, nunca confrontando a primeira parcela de um método com a enésima do outro.",
            "Uma armadilha merece aviso: alguns mercados cotam “taxa flat”, em que os juros de todo o prazo são calculados sobre o principal original, não sobre o saldo decrescente. Uma taxa flat custa aproximadamente o dobro da taxa equivalente de saldo decrescente. Antes de comparar duas propostas, confirme que ambas calculam juros sobre o saldo; do contrário, os números não são comparáveis.",
          ],
        },
        {
          heading: "Onde a amortização antecipada compensa de verdade",
          paragraphs: [
            "O juro de cada período é o saldo devedor vezes a taxa mensal, então quitar principal cedo equivale a obter um “retorno” sem risco igual à taxa do seu empréstimo. Como o saldo é máximo nos primeiros anos, o mesmo pagamento extra economiza mais juros ali, e visivelmente menos uma década depois. A tabela anual torna essa diferença concreta em vez de deixá-la numa regra de bolso.",
            "Duas checagens antes de antecipar: confirme que o valor extra é aplicado ao principal e não lançado como adiantamento de parcelas futuras, e pergunte se o contrato tem tarifa de amortização antecipada — alguns produtos de taxa fixa cobram. Uma tarifa que devore os juros economizados transforma uma boa decisão em uma neutra.",
            "A alternativa honesta: se você consegue render de forma confiável, após impostos e risco, mais que a taxa do seu empréstimo em outro lugar, investir o excedente supera antecipar; se não consegue, antecipar é a versão garantida desse retorno. Esta ferramenta não prevê mercados: mostra com precisão quantos juros cada cenário deixa na mesa.",
          ],
        },
        {
          heading: "Ler a tabela sem ler errado",
          paragraphs: [
            "A tabela agrupa doze meses em cada linha, então as colunas de principal e juros são totais anuais e a de saldo é o valor de fim de ano. Não compare uma linha anual com uma linha do extrato mensal: a escala difere de propósito. A virada, quando o principal anual finalmente supera o juro anual, costuma aparecer só na segunda metade de um contrato longo.",
            "O cronograma modela taxa fixa, pagamentos em dia e nenhuma tarifa. Revisões de taxa, atrasos, seguros embutidos no empréstimo ou renegociações mudam a trajetória real: trate a tabela como cenário-base e recalcule após qualquer mudança nos dados.",
            "Como tudo neste site, o cálculo roda inteiramente no seu navegador: valor, taxa e prazo não são enviados a lugar algum, então é seguro explorar propostas reais de bancos.",
          ],
        },
      ],
    },
  },
});
