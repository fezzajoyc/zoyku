import { CalcEngineRetirement } from "../_engines/calc-engine-retirement";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "retirement-calculator",
  category: "utility",
  icon: "clock",
  engine: { component: CalcEngineRetirement },
  related: ["inflation-calculator", "compound-interest-calculator", "auto-loan-calculator", "mortgage-calculator", "salary-to-hourly", "hourly-to-salary"],
  copy: {
    en: {
      name: "Retirement Calculator",
      tagline:
        "See what your savings grow into by retirement: the total, what it buys in today's money, and the monthly amount you could withdraw.",
      intro: [
        "Enter your current age, retirement age, existing savings, monthly contribution and an assumed annual return. The calculator grows the balance with monthly compounding — each month's contribution added at the start of the month — and shows the total waiting at your retirement age.",
        "A headline number in 2055 dollars flatters itself, so the tool also divides that total by (1 + inflation)^years to state it in today's purchasing power, and computes the fixed monthly withdrawal that would empty the fund over your retirement years if the same return continued.",
        "Everything is arithmetic on the inputs you give it. The return rate is an assumption, not a forecast — try pessimistic and optimistic values and watch how much the answer swings. Nothing about your savings leaves the browser.",
        "The yearly table under the results shows contributions, earnings and balance at each year-end, so you can see whether the growth in your plan comes mostly from your deposits or mostly from compounding — the crossover usually takes years.",
      ],
      steps: [
        "Enter your current age and the age you plan to retire.",
        "Add current savings, the monthly contribution and an assumed annual return.",
        "Set inflation and the number of years the fund must last in retirement.",
        "Read the total, its purchasing power in today's money, and the monthly withdrawal.",
      ],
      faqs: [
        {
          q: "How is the monthly withdrawal calculated?",
          a: "It is the fixed amount that, with the same assumed return continuing into retirement, exactly empties the fund over the retirement years you set — the standard annuity formula. If the return assumption is 0%, it is simply the total divided by the number of months.",
        },
        {
          q: "Why is the purchasing-power figure smaller than the total?",
          a: "Because inflation erodes money. A total of T reached after n years of inflation i buys what T ÷ (1 + i)^n buys today. At 2.5% inflation for 30 years the divisor is about 2.1, so roughly half the headline is purchasing-power illusion.",
        },
        {
          q: "Does it model taxes, pension plans or Social Security?",
          a: "No. It models a single pot growing at one assumed rate, without contribution limits, tax treatment, employer matches or state pensions. Treat the output as one input to planning, not as a legal or tax statement.",
        },
        {
          q: "What return should I assume?",
          a: "That is a judgment call this tool deliberately does not make for you. Common practice is to run several scenarios — a conservative low rate, a middling one, an optimistic one — and let the spread of answers, not any single number, drive the decision.",
        },
      ],
      deepDive: [
        {
          heading: "Compounding is the second worker on the payroll",
          paragraphs: [
            "In a long accumulation, the deposits and the returns are two different income streams. Contributions are linear — 500 a month for 25 years is exactly 150,000 — but earnings are proportional to the balance, which means they start small and compound. In the early years the account is nearly all deposits; the growth curve only separates from the contribution line once the balance is large enough for returns to rival your monthly deposit.",
            "This is why the yearly table matters more than the headline. If in your plan the earnings column overtakes the contribution column early, the plan leans on the return assumption, and a lower assumed rate hurts it badly. If the two columns converge slowly, the plan leans on deposits, which you control directly. The first kind of plan is more fragile than it looks.",
            "The model adds each month's contribution at the start of the month, so money earns from the month it is deposited. Delaying contributions by years does not just remove those deposits — it removes every year of compounding they would have generated, which is the larger loss.",
          ],
        },
        {
          heading: "What purchasing power actually tells you",
          paragraphs: [
            "Retirement happens in future prices: rent, food and care will all be priced in the inflated currency of that year. Deflating the total by (1 + inflation)^years converts it into today's money, which is the only unit your current budget thinks in. The withdrawal figure stays nominal on purpose — in practice retirees often withdraw more each year to chase inflation, and this tool's flat monthly number is the no-adjustment baseline.",
            "The honest caveat is that inflation is not a constant. A 30-year accumulation will pass through high-inflation and low-inflation stretches, and retirement spending itself is not one basket: healthcare inflates differently from goods. A single average rate is a smoothing device, useful for scale, unreliable for precision.",
            "A practical use of the two numbers together: plan your savings target in today's purchasing power, because that is what your current income can be measured against, then check the nominal total it implies. If the gap between the two feels absurd, that feeling is inflation doing exactly what the tool says it does.",
          ],
        },
        {
          heading: "The withdrawal phase is a different problem",
          paragraphs: [
            "Accumulation and depletion are not symmetric. While saving, bad return years happen to money you have not deposited yet; while withdrawing, the same bad years hit a large balance you are simultaneously draining. This model keeps the accumulation return running through retirement and drains the fund to exactly zero at the horizon — a deliberately simple baseline, not a sequence-of-returns simulation.",
            "Two simplifications deserve attention. First, a fixed monthly withdrawal ignores inflation during retirement; a more realistic plan withdraws an inflation-adjusted amount, which empties the fund faster and yields a lower starting figure. Second, draining to zero leaves no buffer for the bad-luck years — outliving the model is a real risk, and the retirement-years input is where you make that risk explicit by choosing a long horizon.",
            "Use the tool to bracket, not to promise: set the retirement-years input generously, run pessimistic returns, and treat the resulting monthly withdrawal as the cautious end of the range. The calculator runs entirely in your browser, so it is safe to try figures close to your real situation.",
          ],
        },
      ],
    },
    zh: {
      name: "退休储蓄计算器",
      tagline:
        "输入当前年龄、退休年龄、现有储蓄、月存金额与假设年回报率,算出退休时总额、按今天物价折算的购买力,以及退休期内可用的月取款额。",
      intro: [
        "输入当前年龄、退休年龄、现有储蓄、每月存入金额和一个假设的年回报率。计算器按月复利增长余额——每期投入在月初计入——给出你到退休年龄时的总额。",
        "2055 年的货币数字会自我美化,所以工具还会把总额除以 (1 + 通胀率)^年数,折成今天的购买力,并计算假设回报率延续时、恰好把余额在退休年限内取完的固定月取款额。",
        "一切都只是对你输入的数字做算术。回报率是假设,不是预测——试试悲观和乐观的取值,看看答案波动有多大。你的储蓄数据不会离开浏览器。",
        "结果下方的逐年表格列出每年年末的投入、收益与余额,让你看清计划里的增长到底主要靠存款还是靠复利——这个交叉点通常需要很多年。",
      ],
      steps: [
        "输入当前年龄和计划退休的年龄。",
        "填入现有储蓄、每月存入金额和假设的年回报率。",
        "设置通胀率和退休后资金需要支撑的年数。",
        "查看退休时总额、按今天物价的购买力和月取款额。",
      ],
      faqs: [
        {
          q: "月取款额是怎么算的?",
          a: "它是假设退休后按同一回报率继续增值时、恰好在你设定的退休年限内把余额取完的固定金额——标准年金公式。如果回报率取 0%,就是总额除以月数。",
        },
        {
          q: "为什么购买力数字比总额小?",
          a: "因为通胀在侵蚀货币。通胀率 i 下 n 年后拿到的总额 T,只买得到今天 T ÷ (1 + i)^n 能买的东西。按 2.5% 通胀 30 年,除数约 2.1,标题数字里大约一半是购买力幻觉。",
        },
        {
          q: "考虑税收、养老金计划或社保吗?",
          a: "不考虑。它模拟的是单一资金池按一个假设回报率增长,不含缴费上限、税收处理、企业匹配或国家养老金。把输出当作规划的一个输入,而不是税务或法律结论。",
        },
        {
          q: "回报率该填多少?",
          a: "这个判断本工具刻意不替你做。常见做法是多跑几个情景——保守低值、中间值、乐观值——让答案的分布而不是某个单一数字来驱动决策。",
        },
      ],
      deepDive: [
        {
          heading: "复利是工资单上的第二名员工",
          paragraphs: [
            "长期积累里,存款和收益是两条不同的现金流。投入是线性的——每月 500 存 25 年就是整整 150,000——而收益与余额成比例,起点很小,靠复利滚大。前几年账户几乎全是存款;只有余额大到收益能与你的月存抗衡时,增长曲线才会明显脱离投入线。",
            "这就是为什么逐年表比标题数字更重要。如果你的计划里收益列很早就超过投入列,说明计划依赖回报率假设,回报率取低一点就会重创它;如果两列收敛得很慢,说明计划靠的是存款,而存款是你直接可控的。第一种计划比看上去脆弱。",
            "模型把每期投入在当月月初计入,钱从存入当月就开始生息。推迟几年再存,损失的不只是这几笔存款本身,更是它们本可以产生的全部复利——后者才是大头。",
          ],
        },
        {
          heading: "购买力到底在告诉你什么",
          paragraphs: [
            "退休发生在未来的物价里:房租、食品和照护都用那一年的通胀货币计价。用 (1 + 通胀率)^年数 把总额折现,是把它换算成今天预算所用的唯一计量单位。月取款额故意保持名义值——现实中退休者常逐年提高取款额来追通胀,本工具的固定月取是不做调整的基线。",
            "诚实的提醒是:通胀不是常数。30 年的积累会穿越高通胀与低通胀阶段,退休支出本身也不是一个篮子:医疗通胀与商品通胀不同步。用单一平均通胀率是平滑手段,看规模有用,看精度不可靠。",
            "两个数字配合起来的实际用法:用今天的购买力设定储蓄目标,因为那才是你当前收入可以对照的单位,再看它隐含的名义总额。如果两者差距大得离谱,那种感觉正是通胀在干工具所说的那件事。",
          ],
        },
        {
          heading: "取款阶段是另一个问题",
          paragraphs: [
            "积累与消耗并不对称。存钱时,糟糕的收益年份发生在还没存进去的钱身上;取钱时,同样糟糕的年份砸在一个你正在抽水的大余额上。本模型让积累期的回报率贯穿退休期,并在期限终点恰好把余额取到零——这是刻意简化的基线,不是逐年收益序列模拟。",
            "两处简化值得注意。其一,固定月取额忽略了退休期内的通胀;更现实的方案是取随通胀上调的金额,这会让余额耗得更快、起始取款额更低。其二,取到零意味着没有坏年景的缓冲——“活得比模型久”是真实风险,退休年限这个输入正是你把该风险显式化的地方:选一个足够长的期限。",
            "用工具来夹逼区间,而不是许诺:把退休年限设宽,跑悲观的回报率,把得到的月取额当作区间的谨慎端。计算完全在浏览器内完成,用接近真实情况的数字来试也安全。",
          ],
        },
      ],
    },
    ja: {
      name: "退職貯蓄計算(リタイアメント計算)",
      tagline:
        "現在の年齢・退職年齢・貯蓄・毎月の積立額・想定リターンから、退職時の総額・現在の価値での購買力・退職後の月々の引出額を算出します。",
      intro: [
        "現在の年齢、退職年齢、既存の貯蓄、毎月の積立額、想定年リターンを入力します。貯蓄残高は月複利で増え(毎月の積立は月初に計上)、退職年齢時に待っている総額を表示します。",
        "将来の通貨での数字は実態より大きく見えるため、総額を (1 + インフレ率)^年数 で割って現在の購買力に換算し、同じリターンが続いた場合に退職後の年数でちょうど使い切る一定の月引出額も計算します。",
        "すべて入力値に対する算術です。リターンは仮定であって予測ではありません。悲観値と楽観値を試して、答えの振れ幅を確かめてください。貯蓄の情報はブラウザから出ません。",
        "結果の下の年次表は各年末の拠出額・収益・残高を示し、計画の伸びが積立と複利のどちらに依存しているかが読み取れます。この交差には通常長い年月がかかります。",
      ],
      steps: [
        "現在の年齢と退職予定の年齢を入力します。",
        "既存の貯蓄・毎月の積立額・想定年リターンを入力します。",
        "インフレ率と、退職後の資金が必要な年数を設定します。",
        "総額・現在の価値での購買力・月々の引出額を確認します。",
      ],
      faqs: [
        {
          q: "月々の引出額はどう計算しますか?",
          a: "退職後も同じ想定リターンが続くとして、設定した退職後の年数でちょうど残高を使い切る一定額——標準的な年金公式——です。リターンを 0% にすれば、総額を月数で割っただけになります。",
        },
        {
          q: "購買力の数字は総額より小さいのはなぜですか?",
          a: "インフレが通貨の価値を削るからです。インフレ率 i で n 年後の総額 T は、今日の T ÷ (1 + i)^n と同じしか買えません。2.5% のインフレが 30 年続くと除数は約 2.1 になり、名目額の約半分は購買力の錯覚です。",
        },
        {
          q: "税金や年金制度・社会保険は考慮しますか?",
          a: "していません。単一の資金が単一の想定リターンで増えるモデルで、拠出上限・税務扱い・企業マッチ・公的年金は含みません。出力は計画のための一つの入力であり、税務・法的な結論ではありません。",
        },
        {
          q: "リターンはいくらに設定すべきですか?",
          a: "このツールはあえてその判断を代行しません。保守的な低値・中間値・楽観値の複数シナリオを実行し、単一の数字ではなく答えの分布で意思決定するのが実務的です。",
        },
      ],
      deepDive: [
        {
          heading: "複利は給与名簿上の二人目の働き手",
          paragraphs: [
            "長期の積み立てでは、拠出と収益は別々の所得の流れです。拠出は線形——毎月 500 円を 25 年ならちょうど 150,000——ですが、収益は残高に比例するため、最初は小さく複利で育ちます。初期の口座はほぼ拠出のみ。残高が月々の積立に匹敵するほど大きくなって初めて、成長曲線は拠出線から離れます。",
            "だからこそ年次表は総額より重要です。計画の中で収益の列が早く拠出の列を追い越すなら、その計画はリターン仮定に依存しており、低めのリターンで大きく損なわれます。逆に二つの列の収束が遅いなら、計画はあなたが直接コントロールできる拠出に依存しています。前者のほうが見た目より脆いのです。",
            "このモデルは毎月の積立を月初に計上するため、預けた月から利子が付きます。拠出を数年遅らせることは、その拠出分だけでなく、それが生み出すはずだった複利の全期間を失うことです。後者のほうが大きい。",
          ],
        },
        {
          heading: "購買力が実際に教えてくれること",
          paragraphs: [
            "退職は未来の物価の中で起こります。家賃も食費も介護も、その年のインフレした通貨で値付けされています。総額を (1 + インフレ率)^年数 で割ることは、現在の家計が考える唯一の単位——今日のお金——に換算することです。引出額が名目のままなのは意図的です。実際の退職者はインフレに合わせて引出額を増やすことが多く、この一定額は調整なしの基準線です。",
            "正直な注意点として、インフレは一定ではありません。30 年の蓄積は高インフレ期と低インフレ期をまたぎ、退職後の支出も単一の買い物かごではありません。医療は物とは違うインフレをします。単一の平均率は規模感のための平滑化であり、精度のための道具ではありません。",
            "二つの数字の実用的な使い方:貯蓄目標は今日の購買力で立てる(現在の収入と対比できるのはこちら)、そしてそれが意味する名目総額を確認する。その差が不自然に大きく感じられたら、それはツールが言うとおりにインフレが働いている証拠です。",
          ],
        },
        {
          heading: "引出局面は別の問題です",
          paragraphs: [
            "蓄積と枯渇は対称ではありません。積立中の悪い収益年は、まだ預けていないお金に起こります。引出中の同じ悪い年は、まさに取り崩している大きな残高に打撃を与えます。このモデルは蓄積期のリターンを退職後も続け、期限でちょうどゼロにします。意図的に単純化した基準であり、年度ごとの収益序列のシミュレーションではありません。",
            "二つの単純化に注意。第一に、一定の月引出は退職中のインフレを無視します。インフレ連動の引出は残高を早く減らし、最初の引出額は低くなります。第二に、ゼロまで使い切る設計には悪い年への緩衝がありません。「モデルより長生きする」リスクは現実のもので、退職後の年数という入力は、長めの期間を選んでこのリスクを明示する場所です。",
            "ツールは約束ではなく幅を示すために使ってください。退職年数は長めに、リターンは悲観値で実行し、その月引出額を幅の保守側と見なします。計算はすべてブラウザ内で完結するため、実情に近い数字を試しても安全です。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de jubilación",
      tagline:
        "Vea en qué se convierten sus ahorros al jubilarse: el total, cuánto compra en dinero de hoy y la cantidad mensual que podría retirar.",
      intro: [
        "Introduzca su edad actual, la edad de jubilación, los ahorros existentes, el aporte mensual y un rendimiento anual supuesto. La calculadora hace crecer el saldo con capitalización mensual — el aporte de cada mes se añade al inicio del mes — y muestra el total que espera a su edad de jubilación.",
        "Una cifra en dólares de 2055 se halaga a sí misma, así que la herramienta también divide ese total por (1 + inflación)^años para expresarlo en poder adquisitivo actual, y calcula el retiro mensual fijo que vaciaría el fondo durante sus años de jubilación si el mismo rendimiento continuara.",
        "Todo es aritmética sobre los datos que usted da. El rendimiento es una suposición, no una previsión: pruebe valores pesimistas y optimistas y observe cuánto oscila la respuesta. Nada de sus ahorros sale del navegador.",
        "La tabla anual bajo los resultados muestra aportes, rendimientos y saldo al cierre de cada año, para ver si el crecimiento de su plan viene sobre todo de sus depósitos o sobre todo del interés compuesto — el cruce suele tardar años.",
      ],
      steps: [
        "Introduzca su edad actual y la edad a la que piensa jubilarse.",
        "Añada los ahorros actuales, el aporte mensual y un rendimiento anual supuesto.",
        "Fije la inflación y los años que el fondo debe durar en la jubilación.",
        "Lea el total, su poder adquisitivo en dinero actual y el retiro mensual.",
      ],
      faqs: [
        {
          q: "¿Cómo se calcula el retiro mensual?",
          a: "Es el importe fijo que, con el mismo rendimiento supuesto continuando en la jubilación, vacía exactamente el fondo en los años de jubilación que usted fije — la fórmula estándar de anualidad. Si el rendimiento supuesto es 0%, es simplemente el total dividido por los meses.",
        },
        {
          q: "¿Por qué la cifra de poder adquisitivo es menor que el total?",
          a: "Porque la inflación erosiona el dinero. Un total T alcanzado tras n años de inflación i compra lo que hoy compra T ÷ (1 + i)^n. Con una inflación del 2,5% durante 30 años, el divisor ronda 2,1: casi la mitad del titular es ilusión de poder adquisitivo.",
        },
        {
          q: "¿Modela impuestos, planes de pensiones o seguridad social?",
          a: "No. Modela un solo fondo creciendo a un tipo supuesto, sin límites de aportación, tratamiento fiscal, matches de empresa ni pensiones públicas. Trate el resultado como un dato para planificar, no como una declaración legal o fiscal.",
        },
        {
          q: "¿Qué rendimiento debería suponer?",
          a: "Es una valoración que esta herramienta no toma por usted. La práctica habitual es ejecutar varios escenarios — un tipo bajo conservador, uno intermedio, uno optimista — y dejar que la dispersión de respuestas, no un número único, guíe la decisión.",
        },
      ],
      deepDive: [
        {
          heading: "El interés compuesto es el segundo empleado en la nómina",
          paragraphs: [
            "En una acumulación larga, los depósitos y los rendimientos son dos flujos de ingresos distintos. Los aportes son lineales — 500 al mes durante 25 años son exactamente 150.000 — pero los rendimientos son proporcionales al saldo: empiezan pequeños y se componen. En los primeros años la cuenta es casi todo depósitos; la curva de crecimiento solo se separa de la línea de aportes cuando el saldo basta para que los rendimientos compitan con su mensualidad.",
            "Por eso la tabla anual importa más que el titular. Si en su plan la columna de rendimientos adelanta pronto a la de aportes, el plan se apoya en el supuesto de rendimiento y un tipo menor lo daña de lleno. Si las dos columnas convergen despacio, el plan se apoya en los depósitos, que usted controla directamente. El primer tipo de plan es más frágil de lo que parece.",
            "El modelo añade el aporte de cada mes al inicio del mes, de modo que el dinero rinde desde el mes en que se deposita. Retrasar los aportes años no solo elimina esos depósitos: elimina todos los años de capitalización que habrían generado, que es la pérdida mayor.",
          ],
        },
        {
          heading: "Lo que le dice de verdad el poder adquisitivo",
          paragraphs: [
            "La jubilación ocurre en precios futuros: alquiler, comida y cuidados estarán fijados en la moneda inflada de ese año. Desinflar el total por (1 + inflación)^años lo convierte al dinero de hoy, la única unidad con la que su presupuesto actual piensa. La cifra de retiro se mantiene nominal a propósito — en la práctica los jubilados suelen retirar más cada año para seguir la inflación, y este número mensual fijo es la línea base sin ajuste.",
            "La advertencia honesta es que la inflación no es constante. Una acumulación de 30 años atraviesa tramos de inflación alta y baja, y el gasto en la jubilación no es una sola cesta: la sanidad infla distinto que los bienes. Un tipo medio único es un suavizador: útil para la escala, poco fiable para la precisión.",
            "Un uso práctico de ambas cifras: fije el objetivo de ahorro en poder adquisitivo actual, porque contra eso se mide su ingreso presente, y luego compruebe el total nominal que implica. Si la distancia entre ambos parece absurda, esa sensación es la inflación haciendo exactamente lo que la herramienta dice que hace.",
          ],
        },
        {
          heading: "La fase de retiro es otro problema",
          paragraphs: [
            "Acumular y agotar no son simétricos. Mientras ahorra, los malos años de rendimiento caen sobre dinero que aún no ha depositado; mientras retira, los mismos años golpean un saldo grande que simultáneamente está drenando. Este modelo mantiene el rendimiento de la acumulación durante la jubilación y vacía el fondo a exactamente cero al final del plazo — una línea base deliberadamente simple, no una simulación de secuencias de rendimientos.",
            "Dos simplificaciones merecen atención. Primera: un retiro mensual fijo ignora la inflación durante la jubilación; un plan más realista retira un importe ajustado por inflación, que vacía el fondo más rápido y da una cifra inicial menor. Segunda: drenar hasta cero deja sin colchón para los años de mala suerte — sobrevivir al modelo es un riesgo real, y el dato de años de jubilación es donde usted hace ese riesgo explícito eligiendo un plazo largo.",
            "Use la herramienta para acotar, no para prometer: fije los años de jubilación con generosidad, ejecute rendimientos pesimistas y trate el retiro mensual resultante como el extremo prudente del rango. El cálculo corre íntegramente en su navegador, así que puede probar cifras cercanas a su situación real.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de aposentadoria",
      tagline:
        "Veja em que suas economias se transformam na aposentadoria: o total, quanto compra em dinheiro de hoje e o valor mensal que você poderia sacar.",
      intro: [
        "Informe sua idade atual, a idade de aposentadoria, as economias existentes, o aporte mensal e um retorno anual presumido. A calculadora faz o saldo crescer com capitalização mensal — o aporte de cada mês entra no início do mês — e mostra o total que espera na sua idade de aposentadoria.",
        "Um número em reais de 2055 se autoelogia, então a ferramenta também divide esse total por (1 + inflação)^anos para expressá-lo no poder de compra de hoje, e calcula a retirada mensal fixa que esvaziaria o fundo ao longo dos seus anos de aposentadoria se o mesmo retorno continuasse.",
        "Tudo é aritmética sobre os valores que você fornece. A taxa de retorno é uma suposição, não uma previsão — experimente valores pessimistas e otimistas e veja quanto a resposta oscila. Nada das suas economias sai do navegador.",
        "A tabela anual abaixo dos resultados mostra aportes, rendimentos e saldo no fim de cada ano, para você ver se o crescimento do seu plano vem mais dos seus depósitos ou mais dos juros compostos — a virada costuma levar anos.",
      ],
      steps: [
        "Informe sua idade atual e a idade em que pretende se aposentar.",
        "Adicione a poupança atual, o aporte mensal e um retorno anual presumido.",
        "Defina a inflação e o número de anos que o fundo precisa durar na aposentadoria.",
        "Leia o total, o poder de compra em dinheiro de hoje e a retirada mensal.",
      ],
      faqs: [
        {
          q: "Como a retirada mensal é calculada?",
          a: "É o valor fixo que, com o mesmo retorno presumido continuando na aposentadoria, esvazia exatamente o fundo nos anos de aposentadoria que você definir — a fórmula padrão de anuidade. Se o retorno presumido é 0%, é simplesmente o total dividido pelos meses.",
        },
        {
          q: "Por que o poder de compra é menor que o total?",
          a: "Porque a inflação corrói o dinheiro. Um total T alcançado após n anos de inflação i compra o que hoje T ÷ (1 + i)^n compra. Com 2,5% de inflação por 30 anos, o divisor fica perto de 2,1: quase metade do número principal é ilusão de poder de compra.",
        },
        {
          q: "Modela impostos, planos de previdência ou INSS?",
          a: "Não. Modela um único fundo crescendo a uma taxa presumida, sem limites de contribuição, tratamento tributário, contrapartida de empregador ou previdência pública. Trate o resultado como um insumo de planejamento, não como uma declaração legal ou fiscal.",
        },
        {
          q: "Que retorno devo assumir?",
          a: "É um juízo de valor que esta ferramenta deliberadamente não faz por você. A prática comum é rodar vários cenários — uma taxa baixa conservadora, uma intermediária, uma otimista — e deixar a dispersão das respostas, não um número único, guiar a decisão.",
        },
      ],
      deepDive: [
        {
          heading: "Os juros compostos são o segundo funcionário na folha",
          paragraphs: [
            "Numa acumulação longa, depósitos e rendimentos são dois fluxos de renda diferentes. Os aportes são lineares — 500 por mês durante 25 anos são exatamente 150.000 — mas os rendimentos são proporcionais ao saldo: começam pequenos e se compõem. Nos primeiros anos a conta é quase tudo depósito; a curva de crescimento só se separa da linha de aportes quando o saldo basta para os rendimentos rivalizarem com seu aporte mensal.",
            "Por isso a tabela anual importa mais que o número principal. Se no seu plano a coluna de rendimentos ultrapassa cedo a de aportes, o plano se apoia na suposição de retorno e uma taxa menor o machuca muito. Se as duas colunas convergem devagar, o plano se apoia nos depósitos, que você controla diretamente. O primeiro tipo de plano é mais frágil do que parece.",
            "O modelo lança o aporte de cada mês no início do mês, então o dinheiro rende desde o mês em que é depositado. Adiar os aportes em anos não remove só aqueles depósitos — remove todos os anos de capitalização que eles teriam gerado, que é a perda maior.",
          ],
        },
        {
          heading: "O que o poder de compra realmente diz",
          paragraphs: [
            "A aposentadoria acontece nos preços do futuro: aluguel, comida e cuidados serão precificados na moeda inflacionada daquele ano. Deflacionar o total por (1 + inflação)^anos o converte no dinheiro de hoje, a única unidade em que seu orçamento atual pensa. O valor da retirada permanece nominal de propósito — na prática aposentados costumam sacar mais a cada ano para perseguir a inflação, e este número mensal fixo é a linha de base sem ajuste.",
            "O aviso honesto é que a inflação não é constante. Uma acumulação de 30 anos atravessa trechos de inflação alta e baixa, e o gasto na aposentadoria não é uma única cesta: saúde infla diferente de bens. Uma taxa média única é um suavizador: útil para a escala, pouco confiável para a precisão.",
            "Um uso prático dos dois números: defina a meta de poupança em poder de compra de hoje, porque é contra isso que sua renda atual pode ser medida, depois confira o total nominal que ela implica. Se a distância entre os dois parecer absurda, essa sensação é a inflação fazendo exatamente o que a ferramenta diz que ela faz.",
          ],
        },
        {
          heading: "A fase de retirada é outro problema",
          paragraphs: [
            "Acumular e esgotar não são simétricos. Enquanto poupa, os maus anos de retorno atingem dinheiro que você ainda não depositou; enquanto saca, os mesmos anos atingem um saldo grande que você está drenando ao mesmo tempo. Este modelo mantém o retorno da acumulação correndo na aposentadoria e esvazia o fundo a exatamente zero no horizonte — uma linha de base deliberadamente simples, não uma simulação de sequência de retornos.",
            "Duas simplificações merecem atenção. Primeira: uma retirada mensal fixa ignora a inflação durante a aposentadoria; um plano mais realista saca um valor ajustado pela inflação, que esvazia o fundo mais rápido e dá um valor inicial menor. Segunda: esgotar até zero deixa sem colchão os anos de azar — sobreviver ao modelo é um risco real, e o campo de anos de aposentadoria é onde você torna esse risco explícito escolhendo um prazo longo.",
            "Use a ferramenta para delimitar, não para prometer: defina os anos de aposentadoria com folga, rode retornos pessimistas e trate a retirada mensal resultante como o extremo cauteloso da faixa. O cálculo roda inteiramente no seu navegador, então é seguro experimentar valores próximos da sua situação real.",
          ],
        },
      ],
    },
  },
});
