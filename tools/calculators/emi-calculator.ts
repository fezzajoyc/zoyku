import { CalcEngineLoan } from "../_engines/calc-engine-loan";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "emi-calculator",
  category: "utility",
  icon: "file",
  engine: { component: CalcEngineLoan, props: { kind: "emi" } },
  related: ["loan-calculator", "gst-calculator", "percentage-calculator", "profit-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "EMI Calculator",
      tagline: "Compute the fixed monthly EMI for any loan — principal, rate and tenure in, total interest and total repayment out, instantly.",
      intro: [
        "Enter the loan amount, annual interest rate and tenure in years or months to get the equated monthly installment plus the total interest you will pay over the life of the loan. The math is the standard reducing-balance formula that banks and NBFCs use.",
        "Adjust any input and everything recalculates live, so you can compare a 15-year loan against a 20-year one, or see exactly what an extra 0.5% interest rate costs you each month.",
        "The EMI follows the standard reducing-balance formula E = P · r · (1+r)^n ÷ ((1+r)^n − 1), with r the monthly rate (annual ÷ 12 ÷ 100) and n the number of months. Early installments are mostly interest, and the total-interest line makes the true cost of the loan explicit rather than hidden behind the monthly figure.",
        "Compared with a bank brochure, this one shows total interest and total repayment next to the EMI, so a 15-year versus 20-year choice becomes a concrete money comparison instead of a monthly-payment contest. Processing fees, insurance premiums and floating-rate resets are not modeled; your lender's amortization schedule remains authoritative.",
      ],
      steps: [
        "Type the loan amount (principal).",
        "Enter the annual interest rate and the tenure in years or months.",
        "Read the monthly EMI, total interest and total repayment.",
      ],
      faqs: [
        {
          q: "What formula does the EMI calculator use?",
          a: "The standard reducing-balance formula: EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), where P is principal, r the monthly interest rate (annual ÷ 12 ÷ 100) and n the number of months. This is the same equation used by banks for home, car and personal loans.",
        },
        {
          q: "Why is total interest so high early in the loan?",
          a: "Interest each month is charged on the outstanding balance, which is largest at the start. Early EMIs are mostly interest and little principal; the mix flips as the balance shrinks. Prepaying early therefore saves much more interest than prepaying late.",
        },
        {
          q: "Are fees and insurance included in the EMI?",
          a: "No. Processing fees, insurance and any floating-rate changes are excluded — the result is the pure amortization EMI for the rate you enter. Your lender's sanction letter shows the final payable amount.",
        },
      ],
      deepDive: [
        {
          heading: "The reducing-balance method, and the flat-rate look-alike",
          paragraphs: [
            "The formula here is the reducing-balance standard: interest each month is charged on the balance that remains, which is why total interest falls so sharply when the term shortens. Its impostor is the flat-rate quote, common in consumer-finance advertising: interest for the whole tenure is computed once, on the original principal, and divided evenly across the months.",
            "The two are not close. A flat rate quoted at a number similar to a reducing-balance rate costs roughly close to double in real terms, because the principal never actually shrinks in the flat calculation. When an ad boasts a small-looking rate, the first question is always: is this on the reducing balance, or flat? If the paperwork only quotes a flat rate, convert before comparing anything.",
            "This tool computes only the reducing-balance EMI, which is the same equation banks use for home, auto and personal loans. It does not model processing fees, insurance or rate resets — not because they are small, but because they are product-specific, and folding them in would quietly change your input instead of showing it to you.",
          ],
        },
        {
          heading: "Term, rate, and the interest/time trade",
          paragraphs: [
            "Total interest grows roughly with the time the balance stays alive, so a 20-year loan at the same rate pays far more than twice the interest of a 10-year loan for the same principal — the payment drops, but the years multiply. When you compare tenures here, keep your eyes on the total-interest line rather than the EMI line: the EMI is what you can afford, the total interest is what it costs.",
            "Rate moves matter less than tenure over short horizons but compound over long ones: on a long loan, even half a percentage point accumulates into a five-figure difference. That is why refinancing decisions should use this calculator twice — once with the remaining balance and remaining term of your current loan, not the original figures — and the difference in total interest is the realistic ceiling on what a refinance fee is worth paying.",
            "Prepayment interacts with both levers at once. Extra principal shortens the effective term without touching the contractual one, so the honest way to evaluate an offer with prepayment penalties is to compute the interest saved versus the penalty, both from schedules like the one this formula generates.",
          ],
        },
        {
          heading: "What the EMI number does not include",
          paragraphs: [
            "The EMI is principal plus interest and nothing else. Real loans add processing fees charged upfront, mandatory insurance in some products, documentation charges and — in floating-rate loans — periodic resets that change the EMI mid-flight. None of these appear in a pure amortization calculation, so treat the output as the clean baseline your lender's schedule will then modify.",
            "The EMI convention is also a cultural artifact: it dominates markets where equated installments are standard, but the alternative equal-principal structure, with a declining payment, charges less total interest at the price of higher early payments. If a lender offers both, run both here with the same inputs and compare total interest against your first-year budget.",
            "And as everywhere on this site, the numbers never leave your browser. Loan size, salary context and rate stay on your device — useful when you are comparing offers you have not yet accepted.",
          ],
        },
      ],
    },
    zh: {
      name: "EMI 月供计算器",
      tagline: "输入贷款额、利率与期限,立即算出每月固定月供(EMI)、总利息和还款总额——采用银行通用的等额本息公式。",
      intro: [
        "输入贷款金额、年利率和期限(年或月),即可得到等额月供(EMI)以及整个贷款期要付的总利息。计算采用银行和消费金融公司通用的余额递减(等额本息)公式。",
        "任意一项改动都会实时重算,方便你对比 15 年期与 20 年期贷款,或看清利率多 0.5% 每月要多还多少。",
      ],
      steps: [
        "输入贷款金额(本金)。",
        "填写年利率和期限(年或月)。",
        "查看每月月供、总利息和还款总额。",
      ],
      faqs: [
        {
          q: "EMI 计算用的是哪个公式?",
          a: "标准等额本息公式:EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1),其中 P 为本金,r 为月利率(年利率 ÷ 12 ÷ 100),n 为总月数。这与银行计算房贷、车贷和个人贷款的公式一致。",
        },
        {
          q: "为什么前期利息占比那么高?",
          a: "每月利息按剩余本金计收,而剩余本金在期初最大,所以前期月供大部分是利息。随着本金减少,占比逐渐反转。因此提前还款越早,省下的利息越多。",
        },
        {
          q: "手续费和保险包含在月供里吗?",
          a: "不包含。手续费、保险和浮动利率调整都不在计算范围内——结果只是按你输入的利率算出的纯摊销月供。实际应还金额以贷款机构的批复为准。",
        },
      ],
      deepDive: [
        {
          heading: "余额计息是正身,名义平息是李鬼",
          paragraphs: [
            "这里用的是余额递减的标准口径:每月利息按剩余本金计收,所以期限一缩短,总利息会急剧下降。它的模仿者是消费金融广告里常见的“名义平息”——整个期限的利息按原始本金一次性算出,再平均摊到每个月。",
            "两者差距不小。数字看似接近的平息利率,真实成本大约接近余额计息利率的两倍,因为平息口径下本金从未真正下降。看到广告里小得好看的利率,第一个问题永远是:这是余额计息还是平息?如果合同只给了平息数字,先换算再谈比较。",
            "本工具只计算余额递减的月供,与银行计算房贷、车贷、个人贷款用的是同一个公式。它没有模拟手续费、保险和利率重置——不是因为它们小,而是它们因产品而异,硬塞进公式等于悄悄替你改了输入,不如摆出来让你自己看。",
          ],
        },
        {
          heading: "期限、利率,以及“利息买时间”这笔账",
          paragraphs: [
            "总利息大致随余额存活的时间增长,所以同样利率下,20 年期贷款的总利息远超 10 年期的两倍——月供降下来了,年头却翻上去了。在这里比较期限时,盯着总利息那一行而不是月供那一行:月供是你付得起什么,总利息是你为此付出什么。",
            "短期看利率的影响小于期限,长期看利率会复利式放大:一笔长期贷款上,哪怕半个百分点也能累积出五位数的差额。因此再融资决策要把本工具算两遍——用当前贷款的剩余余额和剩余期限,而不是最初数字——两次总利息的差,就是再融资手续费值得付出的上限。",
            "提前还款则同时作用于两个杠杆。额外归还本金在不改合同期限的情况下缩短了实际期限,所以评估带提前还款违约金的报价,老实的做法是用像本公式生成的计划表分别算出省下的利息和违约金,两相比较。",
          ],
        },
        {
          heading: "月供这个数字没包含什么",
          paragraphs: [
            "月供只有本金加利息,再无其他。真实贷款还有期初收的手续费、部分产品强制搭售的保险、单证费,以及浮动利率产品中途的重置——它们都不会出现在纯摊销计算里,所以把这里的结果当作干净的基准线,贷款机构的实际计划表会在此之上修改。",
            "月供(等额本息)本身也是一种约定俗成:在按等额分期为主流的市场占绝对主导,但另一种等额本金结构——月供逐月递减——以更高的前期月供为代价换来更少的总利息。如果贷款机构两种都提供,用相同输入各算一遍,把总利息和第一年的预算放在一起比。",
            "和本站所有工具一样,数字不会离开你的浏览器。贷款金额、收入背景和利率都留在你的设备上——当你还在比较尚未接受的报价时,这一点很重要。",
          ],
        },
      ],
    },
    ja: {
      name: "EMI 計算(月々返済額)",
      tagline: "借入額・金利・期間から毎月の返済額(EMI)を即時算出。総利息と返済総額も同時に表示します。",
      intro: [
        "借入額・年利・期間(年またはか月)を入力すると、毎月の均等返済額(EMI)と支払総利息がすぐ出ます。銀行やノンバンクが使う残高スライド式の標準公式による計算です。",
        "どの入力を変えてもリアルタイムで再計算されるので、15 年と 20 年の比較や、金利 0.5% 違いが毎月いくら変わるかもひと目でわかります。",
      ],
      steps: [
        "借入額(元金)を入力します。",
        "年利と期間(年またはか月)を入力します。",
        "毎月の返済額・総利息・返済総額を確認します。",
      ],
      faqs: [
        {
          q: "EMI はどの式で計算していますか?",
          a: "標準的な残高スライド式の公式 EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1) を使います。P は元金、r は月利(年利 ÷ 12 ÷ 100)、n は返済回数です。住宅・自動車・個人ローンで銀行が使う式と同じです。",
        },
        {
          q: "返済初期の利息が多いのはなぜですか?",
          a: "毎月の利息は残高に対して課されるため、残高が最大の初期に最も多くなります。初期の返済は利息中心で元本は少なく、残高が減るにつれ逆転します。繰り上げ返済は早いほど利息削減効果が大きいのはこのためです。",
        },
        {
          q: "手数料や保険は EMI に含まれますか?",
          a: "含まれません。事務手数料・保険・変動金利の見直しは対象外で、入力した金利による純粋な返済スケジュールを計算します。最終的な支払額は貸し手の承認書類をご確認ください。",
        },
      ],
      deepDive: [
        {
          heading: "残高スライドが本物、フラット率は偽物",
          paragraphs: [
            "このツールの式は残高スライド式の標準です。毎月の利息は残っている残高に対して課されるため、期間を短くするだけで総利息が急激に減ります。その似非者が、消費者金融の広告に多い「フラット率」です。期間全体の利息を当初元金のまま一括計算し、月数で均等に割り振ります。",
            "両者の差は小さくありません。残高スライド式と似た数字のフラット率は、実質的にほぼ倍のコストになります。フラット計算では元金が実際には減らないからです。広告で妙に小さく見える金利を見たら、最初に確認すべきは「残高基準か、フラットか」です。書類がフラット率しか示さないなら、比較の前に換算してください。",
            "このツールは残高スライド式の EMI だけを計算します。住宅・自動車・個人ローンで銀行が使う式と同じです。事務手数料・保険・金利見直しは織り込みません。それは小さいからではなく商品ごとに異なるからで、式に押し込むと入力値を黙って書き換えることになるからです。見える形で別にしておく方が誠実です。",
          ],
        },
        {
          heading: "期間と金利、「利息で時間を買う」勘定",
          paragraphs: [
            "総利息は残高が生きている時間におおよそ比例して増えます。同じ金利なら 20 年ローンの総利息は 10 年ローンの 2 倍を大きく超えます。返済額は下がるのに、年数が積み上がるからです。ここで期間を比べるときは EMI の行ではなく総利息の行を見てください。EMI は「何が払えるか」、総利息は「何の代償か」です。",
            "短期では金利の影響は期間より小さいですが、長期では複利的に増幅します。長期ローンでは 0.5 ポイントの差が五桁の差額に積み上がることもあります。だから借り換えの判断はこのツールを二回回してください。現在のローンの残額と残期間を使い、当初の数値は使いません。二回の総利息の差が、借り換え手数料に払ってよい上限です。",
            "繰り上げ返済は二つのレバーに同時に効きます。追加の元本返済は契約期間を変えずに実質期間を縮めます。繰り上げ手数料付きのオファーを評価する誠実な方法は、この式が作るのと同じスケジュールで「削減できる利息」と「手数料」を別々に計算して比較することです。",
          ],
        },
        {
          heading: "EMI という数字に含まれていないもの",
          paragraphs: [
            "EMI は元本プラス利息、それだけです。実際のローンには前払いの事務手数料、商品によっては強制の保険、書類費用、変動金利なら途中の見直しが加わります。純粋な償還計算にこれらは現れないので、ここの結果を「きれいな基準線」とし、貸し手の実際のスケジュールがその上に修正を加えると考えてください。",
            "EMI(元利均等)自体も一つの慣行です。均等返済が標準の市場では圧倒的な主流ですが、返済額が逓減する元金均等方式は、初期負担が重い代わりに総利息が少なくなります。貸し手が両方を用意するなら、同じ入力で両方計算し、総利息と初年度の予算を並べて比べてください。",
            "このサイトのすべてのツールと同様、数字がブラウザの外に出ることはありません。借入額・収入の文脈・金利は端末に残ります。まだ受け入れていないオファーを比較している段階では、これが重要です。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de cuota (EMI)",
      tagline: "Calcule la cuota mensual fija de cualquier préstamo: introduce capital, tipo y plazo y obtén al instante el interés total y la devolución total.",
      intro: [
        "Introduzca el importe del préstamo, el tipo de interés anual y el plazo en años o meses para obtener la cuota mensual (EMI) y el interés total que pagará durante toda la vida del préstamo. El cálculo usa la fórmula estándar de saldo decreciente que aplican bancos y financieras.",
        "Cualquier cambio recalcula todo al instante: compare un préstamo a 15 años con uno a 20, o vea exactamente lo que le cuesta al mes medio punto de interés extra.",
      ],
      steps: [
        "Escriba el importe del préstamo (capital).",
        "Introduzca el tipo anual y el plazo en años o meses.",
        "Lea la cuota mensual, el interés total y la devolución total.",
      ],
      faqs: [
        {
          q: "¿Qué fórmula usa la calculadora de EMI?",
          a: "La fórmula estándar de saldo decreciente: EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), donde P es el capital, r el tipo mensual (anual ÷ 12 ÷ 100) y n el número de meses. Es la misma ecuación que usan los bancos para hipotecas, coches y préstamos personales.",
        },
        {
          q: "¿Por qué el interés es tan alto al principio del préstamo?",
          a: "Cada mes el interés se calcula sobre el saldo pendiente, que es máximo al inicio. Las cuotas iniciales son casi todo interés; la proporción se invierte conforme el saldo baja. Amortizar pronto ahorra mucho más interés que amortizar tarde.",
        },
        {
          q: "¿Incluye la cuota comisiones y seguros?",
          a: "No. Las comisiones de apertura, los seguros y las revisiones de tipos variables quedan fuera: el resultado es la cuota de amortización pura para el tipo introducido. El importe final figura en la oferta vinculante del prestamista.",
        },
      ],
      deepDive: [
        {
          heading: "El saldo decreciente es el original; el tipo plano, el impostor",
          paragraphs: [
            "La fórmula de aquí es el estándar de saldo decreciente: el interés de cada mes se cobra sobre el saldo que queda, y por eso el interés total cae en picado al acortar el plazo. Su imitador es el «tipo plano» de la publicidad de consumo: el interés de todo el plazo se calcula una vez sobre el capital original y se reparte a partes iguales entre los meses.",
            "La diferencia no es pequeña. Un tipo plano con una cifra parecida a la de saldo decreciente cuesta en términos reales aproximadamente el doble, porque en el cálculo plano el capital nunca se reduce de verdad. Ante un anuncio con un tipo sospechosamente pequeño, la primera pregunta es siempre: ¿es sobre saldo decreciente o plano? Si el contrato solo cita un tipo plano, conviértalo antes de comparar nada.",
            "Esta herramienta calcula solo la cuota con saldo decreciente, la misma ecuación que los bancos aplican a hipotecas, coches y préstamos personales. No modela comisiones, seguros ni revisiones de tipo — no porque sean pequeños, sino porque dependen del producto, y meterlos en la fórmula equivaldría a cambiar sus datos en secreto en lugar de mostrarlos.",
          ],
        },
        {
          heading: "Plazo, tipo y el trueque entre interés y tiempo",
          paragraphs: [
            "El interés total crece más o menos con el tiempo que el saldo sigue vivo, así que al mismo tipo un préstamo a 20 años paga bastante más del doble de intereses que uno a 10 por el mismo capital: baja la cuota, pero se multiplican los años. Al comparar plazos aquí, mire la línea de interés total y no la de cuota: la cuota es lo que puede pagar, el interés total es lo que cuesta.",
            "A corto plazo el tipo pesa menos que el plazo, pero a largo se amplifica de forma compuesta: en un préstamo largo, medio punto puede acumular una diferencia de cinco cifras. Por eso una refinanciación se evalúa ejecutando esta calculadora dos veces — con el saldo pendiente y el plazo restante de su préstamo actual, no las cifras originales — y la diferencia de interés total es el techo realista de lo que vale pagar de comisión.",
            "La amortización anticipada actúa sobre las dos palancas a la vez. El capital extra acorta el plazo efectivo sin tocar el contractual, así que la forma honesta de evaluar una oferta con penalización por prepagar es calcular el interés ahorrado frente a la penalización, ambos con calendarios como el que genera esta fórmula.",
          ],
        },
        {
          heading: "Lo que la cifra de la cuota no incluye",
          paragraphs: [
            "La cuota es capital más interés, y nada más. Un préstamo real añade comisiones de apertura cobradas por adelantado, seguros obligatorios en algunos productos, gastos documentales y — en tipos variables — revisiones periódicas que cambian la cuota en marcha. Nada de esto aparece en un cálculo de amortización pura, así que trate el resultado como la línea base limpia que el calendario del prestamista luego modificará.",
            "La convención de la cuota fija es además una costumbre cultural: domina los mercados de cuotas iguales, pero la estructura alternativa de capital constante, con cuota decreciente, cobra menos interés total al precio de cuotas iniciales mayores. Si un prestamista ofrece ambas, calcule las dos aquí con los mismos datos y compare el interés total con su presupuesto del primer año.",
            "Y como en todo este sitio, las cifras nunca salen de su navegador. Importe, contexto salarial y tipo se quedan en su dispositivo — útil cuando compara ofertas que todavía no ha aceptado.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de parcela (EMI)",
      tagline: "Calcule a parcela mensal fixa de qualquer empréstimo — informe valor, taxa e prazo e veja na hora o total de juros e o total pago.",
      intro: [
        "Informe o valor do empréstimo, a taxa de juros anual e o prazo em anos ou meses para obter a parcela mensal (EMI) e o total de juros que você pagará na vida do contrato. O cálculo usa a fórmula padrão de saldo decrescente adotada por bancos e financeiras.",
        "Qualquer ajuste recalcula tudo ao vivo: compare um empréstimo de 15 anos com um de 20, ou veja exatamente o que meio ponto percentual a mais custa por mês.",
      ],
      steps: [
        "Digite o valor do empréstimo (principal).",
        "Informe a taxa anual e o prazo em anos ou meses.",
        "Veja a parcela mensal, o total de juros e o total pago.",
      ],
      faqs: [
        {
          q: "Qual fórmula a calculadora de EMI usa?",
          a: "A fórmula padrão de saldo decrescente: EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), onde P é o principal, r a taxa mensal (anual ÷ 12 ÷ 100) e n o número de meses. É a mesma equação dos bancos para financiamento imobiliário, de veículo e empréstimo pessoal.",
        },
        {
          q: "Por que os juros são tão altos no início do contrato?",
          a: "O juro mensal incide sobre o saldo devedor, que é maior no começo. As parcelas iniciais são quase todo juros; a proporção se inverte conforme o saldo cai. Por isso amortizar cedo economiza muito mais juros do que amortizar tarde.",
        },
        {
          q: "A parcela inclui tarifas e seguros?",
          a: "Não. Tarifas de abertura, seguros e revisões de taxa variável ficam de fora — o resultado é a parcela pura de amortização para a taxa informada. O valor final está na carta de aprovação do credor.",
        },
      ],
      deepDive: [
        {
          heading: "Saldo decrescente é o original; a taxa flat, o impostor",
          paragraphs: [
            "A fórmula aqui é o padrão de saldo decrescente: o juro de cada mês incide sobre o saldo que resta, e é por isso que o total de juros despencar quando o prazo encurta. Seu imitador é a “taxa flat” comum na publicidade de crédito ao consumo: os juros de todo o contrato são calculados uma vez sobre o principal original e rateados igualmente entre os meses.",
            "A diferença não é pequena. Uma taxa flat com valor parecido ao de uma taxa de saldo decrescente custa, em termos reais, aproximadamente o dobro, porque no cálculo flat o principal nunca diminui de verdade. Diante de um anúncio com taxa suspeitosamente baixa, a primeira pergunta é sempre: incide sobre o saldo ou é flat? Se o contrato só cita taxa flat, converta antes de comparar qualquer coisa.",
            "Esta ferramenta calcula apenas a parcela com saldo decrescente, a mesma equação que os bancos usam para financiamento imobiliário, de veículo e empréstimo pessoal. Ela não modela tarifas, seguros nem revisões de taxa — não porque sejam pequenos, mas porque variam por produto, e metê-los na fórmula seria mudar seus dados em segredo em vez de mostrá-los.",
          ],
        },
        {
          heading: "Prazo, taxa e a troca entre juros e tempo",
          paragraphs: [
            "O total de juros cresce mais ou menos com o tempo em que o saldo continua vivo, então à mesma taxa um contrato de 20 anos paga bem mais que o dobro dos juros de um de 10 pelo mesmo principal: a parcela cai, mas os anos se multiplicam. Ao comparar prazos aqui, olhe a linha de juros totais e não a de parcela: a parcela é o que você consegue pagar, os juros totais são quanto isso custa.",
            "No curto prazo a taxa pesa menos que o prazo, mas no longo ela se amplifica de forma composta: num contrato longo, meio ponto pode acumular uma diferença de cinco dígitos. Por isso uma portabilidade ou refinanciamento se avalia rodando esta calculadora duas vezes — com o saldo devedor e o prazo restante do contrato atual, não os números originais — e a diferença de juros totais é o teto realista do que vale pagar de tarifa.",
            "A amortização antecipada atua nas duas alavancas ao mesmo tempo. O principal extra encurta o prazo efetivo sem tocar o contratual, então a forma honesta de avaliar uma oferta com tarifa de quitação antecipada é calcular os juros economizados versus a tarifa, ambos com cronogramas como o que esta fórmula gera.",
          ],
        },
        {
          heading: "O que o número da parcela não inclui",
          paragraphs: [
            "A parcela é principal mais juros, e nada mais. Um empréstimo real adiciona tarifas de abertura cobradas na frente, seguros obrigatórios em alguns produtos, custos de documentação e — em taxa variável — revisões periódicas que mudam a parcela em pleno voo. Nada disso aparece num cálculo de amortização pura, então trate o resultado como a linha de base limpa que o cronograma do credor depois alterará.",
            "A convenção da parcela fixa é também um costume cultural: domina os mercados de prestação igual, mas a estrutura alternativa de principal constante, com parcela decrescente, cobra menos juros totais ao preço de parcelas iniciais maiores. Se o credor oferece as duas, calcule ambas aqui com os mesmos dados e compare os juros totais com seu orçamento do primeiro ano.",
            "E como em todo este site, as cifras nunca saem do seu navegador. Valor, contexto salarial e taxa ficam no seu dispositivo — útil quando você compara ofertas que ainda não aceitou.",
          ],
        },
      ],
    },
  },
});
