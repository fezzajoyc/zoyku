import { CalcEngineCompound } from "../_engines/calc-engine-compound";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "compound-interest-calculator",
  category: "utility",
  icon: "calc",
  engine: { component: CalcEngineCompound },
  related: ["emi-calculator", "loan-calculator", "discount-calculator", "percentage-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Compound Interest Calculator",
      tagline:
        "See how savings grow with compound interest — enter a deposit, monthly contributions and a rate to get the final balance and a year-by-year table.",
      intro: [
        "Compound interest is interest on interest: each period the balance earns a share of the annual rate, and every deposit you add starts earning its own interest too. This calculator runs that recursion period by period for an initial deposit plus regular monthly contributions, at monthly, quarterly or annual compounding.",
        "The result is the final balance, the total you put in, and the interest the compounding generated — plus a year-by-year table so you can see exactly when the curve starts to bend. Everything recalculates live, and the formula used is printed right under the numbers, so you can check it against your bank's own projection.",
        "Compounding follows the standard recurrence Bₜ₊₁ = Bₜ × (1 + i) + C, where i is the periodic rate (annual rate ÷ compounding periods per year) and C is the contribution made each period. Monthly compounding at 8% therefore earns slightly more than annual compounding at 8%, because interest starts earning interest sooner.",
        "The tool separates principal deposited from interest earned, so you can see the crossover point where growth from interest overtakes your own contributions — usually decades out at moderate rates. Results assume the rate stays constant, which real investments do not; treat the output as a planning scenario rather than a forecast.",],
      steps: [
        "Enter the initial deposit and the amount you will add every month (0 for a one-off deposit).",
        "Set the annual interest rate, the number of years and how often interest compounds.",
        "Pick a display currency — amounts are formatted for your locale.",
        "Read the final balance, total contributions and interest earned, then check the year-by-year table.",
      ],
      faqs: [
        {
          q: "What formula does the calculator use?",
          a: "The same balance recursion banks use to project savings: each period, balance ← (balance + contribution) × (1 + r), where r = annual rate ÷ periods per year (12 for monthly, 4 for quarterly, 1 for annual). Contributions are deposited at the start of each period, so they earn interest from that period on. Example: 10,000 initial, 100/month at 5% for 10 years with monthly compounding gives a final balance of 32,063.02 — 22,000.00 contributed and 10,063.02 in interest.",
        },
        {
          q: "Why do I get slightly different results on other calculators?",
          a: "Timing conventions differ. Some tools treat contributions as end-of-period deposits (they earn no interest in the period they arrive), some assume daily compounding, and some round each period. This tool deposits at the start of each period and never rounds intermediate steps; a 0.1% difference against another site is usually that convention, not an error.",
        },
        {
          q: "Does it include taxes, fees or inflation?",
          a: "No — the result is nominal growth at the rate you enter. Taxes on interest, account fees and inflation all reduce the real return, so treat the final balance as an upper bound on what you would actually keep.",
        },
      ],
      deepDive: [
        {
          heading: "Why compounding frequency changes the answer",
          paragraphs: [
            "The compounding frequency decides how often earned interest joins the principal and starts earning its own. The periodic rate is the annual rate divided by the number of periods, so monthly compounding at 8% uses 0.667% per month — and because that interest is credited twelve times a year instead of once, the effective annual yield creeps above 8%. Daily beats monthly, monthly beats quarterly, quarterly beats annual, always in that order for the same nominal rate.",
            "What surprises people is how small the gap is at consumer rates. At 5% nominal, annual compounding yields 5.00% and monthly compounding about 5.12% — a tenth of a point that only becomes serious money over decades or on large balances. Marketing exploits this: a bank can quote a nominal rate that looks identical to a competitor's while its compounding frequency quietly does the differentiating.",
            "The frequency only changes the answer if the nominal rate is what you compare. Once everything is converted to an effective annual yield, the frequency is already folded in and two accounts with the same APY are genuinely equivalent — that is exactly why the APY calculator on this site exists alongside this one.",
          ],
        },
        {
          heading: "The crossover, and why time dominates rate",
          paragraphs: [
            "The year-by-year table exists to show one specific moment: the crossover, where interest earned in a year overtakes your own contributions. At moderate rates this takes decades, which is why compounding feels unimpressive for the first ten years and absurd after thirty. The curve is flat, then bends — and almost everyone underestimates how late the bend arrives.",
            "This is also why the starting amount matters more than the optimiser's instinct suggests. An extra point of rate is linear; an extra decade of compounding is exponential. Between starting ten years earlier at a modest rate and starting today at a rate a point higher, the earlier start usually wins by an uncomfortable margin — the table lets you test that claim on your own numbers instead of taking it on faith.",
            "Two honest caveats: the tool deposits contributions at the start of each period, which is the optimistic convention, and it assumes the rate never changes, which no real investment honors. The output is a scenario, not a forecast — the crossover year especially should be read as “roughly when”, not a date to circle.",
          ],
        },
        {
          heading: "Nominal growth, real purchasing power",
          paragraphs: [
            "Everything the calculator shows is nominal: the rate you typed applied to the balance you typed, with no tax, no fee, no inflation. Each of those forces cuts from a different side — taxes on interest reduce the credited rate, account fees subtract fixed amounts, and inflation silently shrinks what the final balance buys. The number on screen is an upper bound on what you would actually keep.",
            "A useful sanity exercise: subtract your expected annual inflation from the rate before entering it. A 5% nominal return with 2.5% inflation compounds the same way but tells a much more honest story about the future purchasing power of the balance. The math is identical; only the interpretation changes.",
            "And as with every tool here, the projection runs entirely in your browser: balances, rates and contribution amounts never leave your device, so it is safe to model figures you would not paste into a form that sends data to a server.",
          ],
        },
      ],
    },
    zh: {
      name: "复利计算器",
      tagline:
        "输入初始本金、每月定投和年利率,立即得到复利终值、累计投入与利息,并附逐年增长明细表,支持月复利、季复利与年复利。",
      intro: [
        "复利就是“利滚利”:每一期余额按周期利率增长,新存入的钱也从当期开始计息。这个计算器按期递推,把初始本金和每月定投一起算清楚,复利频率可选每月、每季度或每年。",
        "结果包括期末总额、累计投入和复利产生的利息,还有一张逐年明细表,让你看到曲线从什么时候开始变陡。所有输入实时重算,所用公式直接印在数字下方,可以和银行的测算对一遍。",
      ],
      steps: [
        "输入初始存入金额和每月定投金额(一次性存入则填 0)。",
        "设置年利率、年数和复利频率。",
        "选择显示币种,金额会按对应地区习惯格式化。",
        "查看期末总额、累计投入和利息,再往下看逐年明细表。",
      ],
      faqs: [
        {
          q: "计算用的是哪个公式?",
          a: "与银行测算储蓄目标相同的余额递推式:每期 余额 ← (余额 + 投入) × (1 + r),其中 r = 年利率 ÷ 每年期数(月复利 12、季复利 4、年复利 1)。投入在每期期初存入,当期即开始计息。例如初始 10,000、每月 100、年利率 5%、按月复利 10 年,终值为 32,063.02,其中累计投入 22,000.00,利息 10,063.02。",
        },
        {
          q: "为什么和其他计算器结果略有出入?",
          a: "口径不同。有的工具把定投算作期末存入(当期不计息),有的按日复利,有的每期四舍五入。本工具在每期期初存入、中间过程不做舍入;与其他网站相差 0.1% 左右通常是口径差异,不是算错。",
        },
        {
          q: "包含税费、手续费或通货膨胀吗?",
          a: "不包含。结果是你输入利率下的名义增长,利息税、账户费用和通胀都会降低实际回报,期末总额应视为实际到手金额的上限。",
        },
      ],
      deepDive: [
        {
          heading: "复利频率为什么会影响结果",
          paragraphs: [
            "复利频率决定了已产生的利息多久并入本金、开始“生自己的利息”。周期利率等于年利率除以每年期数,所以 8% 按月复利就是每月 0.667%——利息一年记入十二次而不是一次,实际年化便悄悄爬到 8% 以上。同一名义利率下,日复利高于月复利、月复利高于季复利、季复利高于年复利,顺序永远如此。",
            "令人意外的是,在消费级利率下这个差距其实很小。名义 5% 年复利就是 5.00%,月复利约 5.12%——差零点一个百分点,只有拉长到几十年、或本金够大时才值得计较。营销恰好利用了这一点:两家银行可以报出看起来一模一样的名义利率,而真正的差别藏在复利频率里。",
            "只有当你比较的是名义利率时,频率才会改变结论。一旦都换算成实际年化收益率,频率已经折算在内,两个 APY 相同的账户就是真正等价的——这正是本站把这个工具和 APY 计算器放在一起的原因。",
          ],
        },
        {
          heading: "交叉点,以及为什么时间比利率更重要",
          paragraphs: [
            "逐年明细表的存在是为了呈现一个特定时刻:交叉点——某一年的利息首次超过你自己投入的钱。在温和利率下,这需要几十年,所以复利在前十年显得平平无奇、三十年后却像变魔术。曲线先平后陡,而几乎所有人都低估了变陡来得有多晚。",
            "这也解释了为什么“早开始”比优化控觉得的更重要。多一个点的利率是线性增益;多十年的复利是指数增益。在“早十年、利率一般”和“今天开始、利率高一个点”之间,通常早开始赢得不体面地多。别信这句话——把两组数字填进表格,自己验证。",
            "两个诚实的提醒:本工具在每期期初存入定投,这是偏乐观的口径;它还假设利率永远不变,而没有任何真实投资兑现过这一点。输出是情景,不是预测——尤其是交叉点那一年,应读作“大致这个阶段”,而不是可以圈起来的日期。",
          ],
        },
        {
          heading: "名义增长与真实购买力",
          paragraphs: [
            "计算器展示的一切都是名义值:你输入的利率作用于你输入的余额,没有税、没有费、没有通胀。这三种力量各从一边下刀——利息税拉低实际记入的利率,账户费用做固定减项,通胀则无声地缩小期末余额的购买力。屏幕上的数字,是你实际能留住金额的上限。",
            "一个有用的自检方法:输入利率之前,先从里面减去你预期的年通胀率。5% 的名义收益在 2.5% 的通胀下复利方式完全一样,但对“这笔钱将来能买什么”的描述诚实得多。数学没有任何变化,变的只是解读。",
            "和本站所有工具一样,推演完全在浏览器内完成:余额、利率、定投金额不会离开你的设备,那些你不敢粘贴给任何服务器表单的数字,在这里可以放心建模。",
          ],
        },
      ],
    },
    ja: {
      name: "複利計算",
      tagline:
        "初期預入額・毎月の積立額・年利を入れるだけで複利の最終残高と累計利息を算出。年ごとの推移表付きで、月複利・四半期複利・年複利に対応します。",
      intro: [
        "複利は「利息に利息がつく」仕組みです。各期ごとに残高が期間利率で増え、新たに預け入れた金額もその期から利息を生みます。この計算ツールは初期預入額と毎月の積立額を期ごとに順に計算し、複利の頻度は毎月・四半期・毎年から選べます。",
        "結果は最終残高・累計投入額・複利で生まれた利息に加え、年ごとの推移表も表示します。曲線がいつ上向きになるかがひと目でわかります。入力を変えると即座に再計算され、使っている式は数値の下に表示されるので、銀行のシミュレーションと照らし合わせても確認できます。",
      ],
      steps: [
        "初期預入額と毎月の積立額を入力します(一括預入のみなら積立額は 0)。",
        "年利・年数・複利の頻度を設定します。",
        "表示通貨を選びます。金額は各言語の形式で整形されます。",
        "最終残高・累計投入額・受取利息を確認し、年ごとの推移表もご覧ください。",
      ],
      faqs: [
        {
          q: "どの式で計算していますか?",
          a: "銀行の積立シミュレーションと同じ残高の漸化式を使います。各期で 残高 ← (残高 + 積立額) × (1 + r)、r は年利 ÷ 年間の期数(月複利 12、四半期複利 4、年複利 1)です。積立は各期の初めに預け入れられ、当期から利息がつきます。例えば初期 10,000・毎月 100・年利 5%・10 年(月複利)では最終残高は 32,063.02 となり、投入 22,000.00・利息 10,063.02 です。",
        },
        {
          q: "他の計算機と結果が少し違うのはなぜですか?",
          a: "前提の扱いが異なるためです。積立を期末預け入れ(当期は無利息)とする計算機や、日複利を仮定するもの、各期で丸めるものもあります。このツールは各期の初めに預け入れ、途中で丸めません。他サイトとの差が 0.1% 程度なら大抵は前提の違いで、計算誤りではありません。",
        },
        {
          q: "税金や手数料、インフレは考慮されますか?",
          a: "考慮されません。結果は入力した金利による名目ベースの増加です。利息への課税や口座手数料、インフレは実質リターンを下げるため、最終残高は手取り額の上限と考えてください。",
        },
      ],
      deepDive: [
        {
          heading: "複利の頻度がなぜ結果を変えるのか",
          paragraphs: [
            "複利の頻度は、発生した利息がどのくらいの間隔で元本に組み入れられ、自分自身の利息を生み始めるかを決めます。期間利率は年利を年間期数で割ったもので、8% の月複利なら毎月 0.667%。利息が年 1 回ではなく年 12 回計上されるため、実質年利は 8% を少しずつ上回ります。同名目金利では、日次が月次を、月次が四半期を、四半期が年次を常に上回ります。",
            "意外なのは、個人向け金利ではその差がごく小さいことです。名目 5% の年複利は実質 5.00%、月複利は約 5.12%——0.1 ポイントの差は、数十年のスパンか大きな残高になって初めて意味を持ちます。マーケティングはここを突きます。名目金利を競合とそっくり同じに見せて、複利頻度で静かに差をつけることができるからです。",
            "頻度が答えを変えるのは、名目金利を比較しているときだけです。すべてを実質年利(APY)に換算してしまえば頻度は織り込み済みで、同じ APY の二つの口座は本当に等価です。このサイトにこのツールと APY 計算ツールが並んでいるのは、まさにそのためです。",
          ],
        },
        {
          heading: "交差点と、時間が金利を支配する理由",
          paragraphs: [
            "年ごとの推移表が存在するのは、ある特定の時点を見せるためです。交差点——ある年の利息がその年の自分の積立額を初めて追い越す瞬間です。中程度の金利ではこれに数十年かかるため、複利は最初の十年は地味で、三十年後には法外に見えます。曲線は平坦に始まり、それから曲がります。その曲がりがどれほど遅いか、ほとんどの人が過小評価しています。",
            "だからこそ「早く始めること」が、最適化志向の感覚より重要になります。金利 1 ポイントの追加は線形、十年の追加は指数的です。「早めに始めて中庸の金利」と「今日から金利 1 ポイント高く」なら、たいてい前者が見るからに大きな差で勝ちます。この主張を鵜呑みにせず、自分の数字で推移表に入れて確かめてください。",
            "正直な注意点も二つ。このツールは各期の初めに積立を預け入れる、やや楽観的な前提を使い、金利が永久に変わらないと仮定します。実際の投資でそれを守るものはありません。出力はシナリオであって予測ではありません。特に交差点の年は「おおよその時期」と読むべきで、丸をつける日付ではありません。",
          ],
        },
        {
          heading: "名目の増加と実質の購買力",
          paragraphs: [
            "計算ツールが示すのはすべて名目値です。入力した金利が入力した残高に適用され、税も手数料もインフレもありません。この三つはそれぞれ別の場所から削ります。利息への課税は計上利率を下げ、口座手数料は固定額を差し引き、インフレは最終残高の購買力を静かに縮めます。画面の数字は、実際に手元に残る額の上限です。",
            "使える健全性チェックがあります。金利を入力する前に、想定する年間インフレ率を差し引いてみてください。名目 5% をインフレ 2.5% で引いた数字は、複利の計算はまったく同じですが、残高の将来の購買力についてずっと誠実な物語を語ります。数式は同じで、解釈だけが変わります。",
            "このサイトの他のツールと同様、試算はブラウザ内で完結します。残高・金利・積立額が端末の外に出ることはないので、サーバーに送信するフォームには貼りたくない数字でも安心して試せます。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de interés compuesto",
      tagline:
        "Calcule el saldo final de sus ahorros con interés compuesto: depósito inicial, aportes mensuales y capitalización mensual, trimestral o anual, con tabla anual.",
      intro: [
        "El interés compuesto es interés sobre interés: cada periodo el saldo genera una parte de la tasa anual y cada aporte nuevo empieza a rendir desde ese mismo periodo. Esta calculadora aplica esa recursión periodo a periodo para un depósito inicial más aportes mensuales regulares, con capitalización mensual, trimestral o anual.",
        "El resultado es el saldo final, el total aportado y los intereses generados, junto con una tabla año por año que muestra cuándo la curva empieza a empinarse. Todo se recalcula al instante y la fórmula utilizada aparece justo debajo de las cifras, para que pueda contrastarla con la proyección de su banco.",
      ],
      steps: [
        "Escriba el depósito inicial y el aporte mensual (0 si es un depósito único).",
        "Fije la tasa anual, los años y la frecuencia de capitalización.",
        "Elija la moneda de visualización; los importes se formatean según su configuración regional.",
        "Lea el saldo final, el total aportado y los intereses, y revise la tabla año por año.",
      ],
      faqs: [
        {
          q: "¿Qué fórmula utiliza la calculadora?",
          a: "La misma recursión de saldo que usan los bancos para proyectar ahorros: en cada periodo, saldo ← (saldo + aporte) × (1 + r), con r = tasa anual ÷ periodos por año (12 mensual, 4 trimestral, 1 anual). Los aportes se depositan al inicio de cada periodo y generan intereses desde ese periodo. Con 10.000 inicial, 100 al mes al 5 % durante 10 años con capitalización mensual, el saldo final es 32.063,02: 22.000,00 aportados y 10.063,02 de intereses.",
        },
        {
          q: "¿Por qué obtengo resultados ligeramente distintos en otras webs?",
          a: "Por las convenciones de tiempo. Algunas calculadoras tratan los aportes como depósitos a fin de periodo (no rinden el periodo en que llegan), otras asumen capitalización diaria y otras redondean cada periodo. Esta herramienta deposita al inicio de cada periodo y no redondea pasos intermedios; una diferencia del 0,1 % con otro sitio suele ser convención, no un error.",
        },
        {
          q: "¿Incluye impuestos, comisiones o inflación?",
          a: "No. El resultado es crecimiento nominal a la tasa introducida. Los impuestos sobre los intereses, las comisiones y la inflación reducen la rentabilidad real, así que considere el saldo final como un límite superior de lo que conservaría.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué la frecuencia de capitalización cambia el resultado",
          paragraphs: [
            "La frecuencia de capitalización decide cada cuánto el interés ganado se suma al principal y empieza a generar el suyo propio. La tasa periódica es la anual dividida entre los periodos del año, así que un 8% mensual aplica 0,667% por mes — y como ese interés se abona doce veces al año en lugar de una, la rentabilidad anual efectiva se cuela por encima del 8%. Con la misma tasa nominal, la diaria supera a la mensual, la mensual a la trimestral y la trimestral a la anual, siempre en ese orden.",
            "Lo sorprendente es lo pequeña que es la diferencia con tasas de consumo. Con un 5% nominal, la capitalización anual rinde 5,00% y la mensual alrededor de 5,12% — una décima que solo se vuelve dinero serio con décadas por delante o saldos grandes. El marketing lo aprovecha: un banco puede cotizar una tasa nominal idéntica a la del competidor mientras su frecuencia de capitalización hace la diferenciación en silencio.",
            "La frecuencia solo cambia la respuesta si compara tasas nominales. Una vez convertidas todas a rentabilidad efectiva anual, la frecuencia ya está integrada y dos cuentas con el mismo APY son genuinamente equivalentes — exactamente por eso este sitio ofrece la calculadora de APY junto a esta.",
          ],
        },
        {
          heading: "El cruce, y por qué el tiempo domina a la tasa",
          paragraphs: [
            "La tabla año por año existe para mostrar un momento concreto: el cruce, cuando el interés ganado en un año supera sus propios aportes. Con tasas moderadas esto tarda décadas, y por eso el interés compuesto parece tibio los primeros diez años y absurdo después de treinta. La curva es plana y luego se dobla — y casi todos subestiman lo tarde que llega el doblez.",
            "También por eso el punto de partida pesa más de lo que sugiere el instinto optimizador. Un punto extra de tasa es lineal; una década extra de capitalización es exponencial. Entre empezar diez años antes con una tasa modesta y empezar hoy con un punto más, el comienzo temprano suele ganar por un margen incómodo. No se lo crea: pruebe ambos números en la tabla.",
            "Dos advertencias honestas: la herramienta deposita los aportes al inicio de cada periodo, la convención optimista, y asume que la tasa nunca cambia, algo que ninguna inversión real cumple. El resultado es un escenario, no un pronóstico — el año del cruce sobre todo debe leerse como “aproximadamente cuando”, no como una fecha para marcar.",
          ],
        },
        {
          heading: "Crecimiento nominal, poder de compra real",
          paragraphs: [
            "Todo lo que muestra la calculadora es nominal: la tasa escrita aplicada al saldo escrito, sin impuesto, sin comisión, sin inflación. Cada una de esas fuerzas corta por un lado distinto — el impuesto a los intereses reduce la tasa acreditada, las comisiones restan importes fijos y la inflación encoge silenciosamente lo que compra el saldo final. La cifra en pantalla es un límite superior de lo que conservaría.",
            "Un ejercicio útil de cordura: réstese la inflación anual esperada de la tasa antes de introducirla. Un 5% nominal con un 2,5% de inflación se capitaliza exactamente igual, pero cuenta una historia mucho más honesta sobre el poder de compra futuro del saldo. La matemática es idéntica; solo cambia la interpretación.",
            "Y como en todas las herramientas de este sitio, la proyección corre íntegramente en su navegador: saldos, tasas y aportes nunca salen de su dispositivo, así que puede modelar cifras que no pegaría en un formulario que envía datos a un servidor.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de juros compostos",
      tagline:
        "Descubra quanto seu dinheiro rende com juros compostos — depósito inicial, aportes mensais e capitalização mensal, trimestral ou anual, com tabela ano a ano.",
      intro: [
        "Juros compostos são juros sobre juros: a cada período o saldo rende uma fração da taxa anual e cada aporte novo começa a render no mesmo período. Esta calculadora aplica essa recursão período a período para um depósito inicial mais aportes mensais regulares, com capitalização mensal, trimestral ou anual.",
        "O resultado é o saldo final, o total aportado e os juros gerados, além de uma tabela ano a ano que mostra quando a curva começa a subir mais rápido. Tudo é recalculado ao vivo e a fórmula usada aparece logo abaixo dos números, para você conferir com a projeção do seu banco.",
      ],
      steps: [
        "Informe o depósito inicial e o aporte mensual (0 se for um depósito único).",
        "Defina a taxa anual, os anos e a frequência de capitalização.",
        "Escolha a moeda de exibição — os valores seguem o formato do seu idioma.",
        "Veja o saldo final, o total aportado e os juros ganados, e confira a tabela ano a ano.",
      ],
      faqs: [
        {
          q: "Qual fórmula a calculadora usa?",
          a: "A mesma recursão de saldo que os bancos usam para projetar poupança: a cada período, saldo ← (saldo + aporte) × (1 + r), com r = taxa anual ÷ períodos por ano (12 mensal, 4 trimestral, 1 anual). Os aportes entram no início de cada período e rendem desde então. Com 10.000 iniciais, 100 por mês a 5% por 10 anos com capitalização mensal, o saldo final é 32.063,02 — sendo 22.000,00 aportados e 10.063,02 de juros.",
        },
        {
          q: "Por que o resultado difere um pouco de outras calculadoras?",
          a: "Por causa das convenções de tempo. Algumas ferramentas tratam os aportes como depósitos no fim do período (sem render no período em que chegam), outras assumem capitalização diária e outras arredondam cada período. Esta deposita no início de cada período e não arredonda etapas intermediárias; uma diferença de 0,1% em relação a outro site costuma ser convenção, não erro.",
        },
        {
          q: "Inclui impostos, tarifas ou inflação?",
          a: "Não. O resultado é crescimento nominal à taxa informada. Impostos sobre rendimento, tarifas e inflação reduzem o retorno real, então trate o saldo final como um teto do que você de fato manteria.",
        },
      ],
      deepDive: [
        {
          heading: "Por que a frequência de capitalização muda o resultado",
          paragraphs: [
            "A frequência de capitalização decide de quanto em quanto tempo os juros ganhos entram no principal e começam a render os próprios juros. A taxa periódica é a anual dividida pelos períodos do ano, então 8% com capitalização mensal aplica 0,667% por mês — e como esse juro é creditado doze vezes por ano em vez de uma, o rendimento anual efetivo escapa para cima do 8%. Com a mesma taxa nominal, a diária supera a mensual, a mensal a trimestral e a trimestral a anual, sempre nessa ordem.",
            "O que surpreende é quão pequena é a diferença nas taxas de varejo. Com 5% nominal, a capitalização anual rende 5,00% e a mensal cerca de 5,12% — um décimo de ponto que só vira dinheiro sério com décadas pela frente ou saldos grandes. O marketing explora isso: um banco pode cotar uma taxa nominal idêntica à do concorrente enquanto sua frequência de capitalização faz a diferenciação em silêncio.",
            "A frequência só muda a resposta se você compara taxas nominais. Depois de converter tudo em rendimento efetivo anual, a frequência já está embutida e duas contas com o mesmo APY são genuinamente equivalentes — exatamente por isso este site oferece a calculadora de APY ao lado desta.",
          ],
        },
        {
          heading: "A virada, e por que o tempo domina a taxa",
          paragraphs: [
            "A tabela ano a ano existe para mostrar um momento específico: a virada, quando os juros ganhos num ano superam seus próprios aportes. Com taxas moderadas isso leva décadas, e é por isso que os juros compostos parecem mornos nos primeiros dez anos e absurdos depois de trinta. A curva é plana e depois dobra — e quase todo mundo subestima o quão tarde chega a dobra.",
            "Também por isso o ponto de partida pesa mais do que o instinto otimizador sugere. Um ponto extra de taxa é linear; uma década extra de capitalização é exponencial. Entre começar dez anos antes com uma taxa modesta e começar hoje com um ponto a mais, o começo cedo costuma vencer por uma margem desconfortável. Não acredite por fé: teste os dois números na tabela.",
            "Duas ressalvas honestas: a ferramenta deposita os aportes no início de cada período, a convenção otimista, e assume que a taxa nunca muda, coisa que nenhum investimento real cumpre. O resultado é um cenário, não uma previsão — o ano da virada em especial deve ser lido como “mais ou menos quando”, não como uma data para circular.",
          ],
        },
        {
          heading: "Crescimento nominal, poder de compra real",
          paragraphs: [
            "Tudo o que a calculadora mostra é nominal: a taxa digitada aplicada ao saldo digitado, sem imposto, sem tarifa, sem inflação. Cada uma dessas forças corta por um lado diferente — o imposto sobre rendimento reduz a taxa creditada, as tarifas descontam valores fixos, e a inflação encolhe em silêncio o que o saldo final compra. O número na tela é um teto do que você de fato manteria.",
            "Um exercício útil de sanidade: subtraia a inflação anual esperada da taxa antes de digitá-la. Um retorno de 5% nominal com 2,5% de inflação capitaliza exatamente do mesmo jeito, mas conta uma história muito mais honesta sobre o poder de compra futuro do saldo. A matemática é idêntica; só a interpretação muda.",
            "E como em todas as ferramentas deste site, a projeção roda inteiramente no seu navegador: saldos, taxas e aportes nunca saem do seu dispositivo, então é seguro modelar valores que você não colaria num formulário que envia dados a um servidor.",
          ],
        },
      ],
    },
  },
});
