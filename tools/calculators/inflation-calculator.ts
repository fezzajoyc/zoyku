import { CalcEngineInflation } from "../_engines/calc-engine-inflation";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "inflation-calculator",
  category: "utility",
  icon: "swap",
  engine: { component: CalcEngineInflation },
  related: ["retirement-calculator", "compound-interest-calculator", "auto-loan-calculator", "loan-calculator", "currency-converter", "mortgage-calculator"],
  copy: {
    en: {
      name: "Inflation Calculator",
      tagline:
        "Enter an amount, an inflation rate and years to see what the same basket will cost, the cumulative inflation, and what your money then buys.",
      intro: [
        "Money does not shrink, but what it buys does. Enter an amount, an average inflation rate per year and a number of years, and the calculator applies the compound inflation factor (1 + i)^n — the same compounding logic as interest, working against you.",
        "Three answers come out: what a basket costing that amount today will cost after n years, the cumulative inflation over the period, and what the same amount of money will buy then, expressed in today's prices. A year-by-year table shows the same comparison for every year in between.",
        "A negative rate is allowed and models deflation: prices fall, the cumulative rate goes negative, and money buys more. The rate you enter is an assumption for the sake of the example — long-run inflation is not a constant, so treat a single average rate as a smoothing device.",
        "The tool computes everything in your browser and asks for no data. Use it to sanity-check salary negotiations, rent increases, long-term contracts and savings goals against the quiet tax that inflation levies on every fixed number.",
      ],
      steps: [
        "Enter the amount of money or the current price of a basket.",
        "Set an assumed average inflation rate per year.",
        "Enter the number of years to project.",
        "Read the future basket cost, cumulative inflation and remaining purchasing power.",
      ],
      faqs: [
        {
          q: "What is cumulative inflation?",
          a: "The total price rise over the whole period: (1 + i)^n − 1. At 3% a year for 10 years it is about 34.4% — ten single-year figures of 3% do not add to 30%, because each year's rise compounds on the year before it.",
        },
        {
          q: "Why does the same amount buy less in the future?",
          a: "Because prices rise while the amount stays the same. Dividing by (1 + i)^n converts the future amount into today's money: at 3% for 10 years, 100 then buys what about 74.4 buys now.",
        },
        {
          q: "Does it model different inflation rates per year?",
          a: "No — it applies one constant average rate, which is the standard way to show scale. Real inflation swings year to year; for a custom path, multiply the yearly factors yourself or rerun the tool period by period.",
        },
        {
          q: "What does a negative inflation rate mean?",
          a: "Deflation: the price level falls, so the future basket costs less, the cumulative rate turns negative and the same money buys more. The calculator handles it with the same formula and flags the scenario in the UI.",
        },
      ],
      deepDive: [
        {
          heading: "Why inflation compounds instead of adding",
          paragraphs: [
            "A 3% price rise does not add three points to a running total; it multiplies the price level by 1.03. After ten such years the level is 1.03^10 ≈ 1.344, so prices are 34.4% higher, not 30%. The difference looks small over a decade and becomes decisive over a career: at 3% for 40 years the factor is about 3.26, meaning a fixed nominal sum of money loses more than two-thirds of its purchasing power.",
            "This multiplicative behavior is why long contracts and fixed pensions bleed quietly. Every fixed number — a salary that never rises, an insurance payout set in today's prices, a savings goal computed without inflation — is being deflated year after year by a factor that never pauses. The table in this tool makes the yearly dent visible instead of averaging it away.",
            "The same math runs in reverse for real returns: a 6% investment return against 3% inflation grows purchasing power by roughly (1.06 ÷ 1.03) − 1 ≈ 2.9% a year, not the nominal 6%. Whenever you compare any two rates over more than a year or two, compare them in the same unit — both nominal or both real.",
          ],
        },
        {
          heading: "Choosing the rate and reading the output honestly",
          paragraphs: [
            "The rate input is the whole model, so where it comes from matters. Long-run historical averages, central-bank targets and recent experience can differ by several points, and over 30 years each point of rate compounds into a large gap in the answer. A defensible practice is to run a low, a middle and a high rate and plan against the spread rather than one number.",
            "Note what the tool measures: it moves one amount through one average rate. It does not model your personal basket — individual households face different inflation depending on rent share, healthcare use and consumption habits, and measured national inflation is an average over all of them. If your rent is a large share of spending, your personal rate may differ from the headline.",
            "The purchasing-power figure is the one to quote in planning conversations, because it converts everything into the unit your current income and budget already use. The nominal figure answers a different question — how much cash will exist — and is the one most often misused, because it sounds bigger.",
          ],
        },
        {
          heading: "Where deflation fits and where the model bends",
          paragraphs: [
            "Deflation — falling prices — is rare in modern economies but not imaginary: Japan spent decades with mild deflation, and crisis years have seen short sharp episodes. The same formula handles it: with a negative rate the future basket costs less, cumulative inflation turns negative and money gains purchasing power. The catch is that deflation usually arrives with shrinking incomes, so cheaper prices do not necessarily mean easier budgets.",
            "The model's honest limits: it uses one constant rate, applies it in whole-year steps, and ignores that some prices move differently from the average. It also says nothing about when inflation happens — purchasing power lost in year one is worse than the same loss in year twenty, because you could have invested the difference in between.",
            "For a single number that communicates scale, the constant-rate model is the right first tool. For decisions about contracts, pensions or long savings plans, use it to set the ballpark, then rerun with several rates — the tool runs instantly and locally, so scenario testing is free.",
          ],
        },
      ],
    },
    zh: {
      name: "通胀购买力计算器",
      tagline:
        "输入金额、年通胀率和年数,算出同一篮子届时的价格、累计通胀率,以及这笔钱届时还买得到多少——按复利口径逐年折算。",
      intro: [
        "钱不会变少,但它的购买力会。输入金额、年均通胀率和年数,计算器套用复利通胀因子 (1 + i)^n——和利息同一套复利逻辑,只是方向相反,在对你不利。",
        "输出三个答案:今天花这笔钱的篮子在 n 年后要花多少、这段时间的累计通胀率,以及同样多的钱届时能买到什么(按今天的物价表达)。逐年表格展示中间每一年的对照。",
        "允许负利率,用来模拟通缩:价格下降,累计通胀率转负,钱能买更多。你输入的只是示例假设——长期通胀不是常数,单一平均率只是一种平滑手段。",
        "所有计算都在浏览器内完成,不需要任何数据。用它来核对薪资谈判、房租上涨、长期合同和储蓄目标,看清通胀这笔悄悄向每个固定数字征收的税。",
      ],
      steps: [
        "输入金额,或某个篮子当前的价格。",
        "设定假设的年均通胀率。",
        "输入要推算的年数。",
        "查看届时篮子价格、累计通胀率和剩余购买力。",
      ],
      faqs: [
        {
          q: "累计通胀率是什么?",
          a: "整个时期的总涨幅:(1 + i)^n − 1。每年 3%、10 年约 34.4%——十个 3% 加起来不是 30%,因为每一年的涨幅都以它前一年的价格为基础复利。",
        },
        {
          q: "为什么同样多的钱未来买得更少?",
          a: "因为价格在涨而金额不变。除以 (1 + i)^n 把未来的金额换算成今天的钱:按 3% 通胀 10 年,届时的 100 只相当于今天约 74.4 的购买力。",
        },
        {
          q: "支持每年不同的通胀率吗?",
          a: "不支持——它套用单一恒定平均率,这是展示量级的标准方式。真实通胀逐年波动;要自定义路径,可以自己逐年乘因子,或按时间段分段重算。",
        },
        {
          q: "负的通胀率是什么意思?",
          a: "通缩:物价水平下降,届时篮子更便宜,累计通胀率转为负值,同样的钱能买更多。计算器用同一套公式处理,并在界面上标注这是通缩情景。",
        },
      ],
      deepDive: [
        {
          heading: "通胀为什么是复利而不是加法",
          paragraphs: [
            "3% 的涨价不是在累计数字上加三分,而是把价格水平乘以 1.03。十年之后价格水平是 1.03^10 ≈ 1.344,涨了 34.4% 而不是 30%。这个差别在十年里看着不大,在一个职业生涯里就是决定性的:3% 持续 40 年,因子约 3.26——一笔名义上不变的存款,购买力丢掉超过三分之二。",
            "这种乘法特性正是长期合同和固定养老金悄悄失血的原因。每一个固定数字——从不上涨的工资、按今天物价定死的保险赔付、没算通胀的储蓄目标——都在年复一年被一个从不暂停的因子折旧。本工具的逐年表把每年的侵蚀摆到明处,而不是用平均值把它抹平。",
            "同一套数学反过来也适用于实际回报:6% 的投资回报对上 3% 的通胀,购买力每年大约只增长 (1.06 ÷ 1.03) − 1 ≈ 2.9%,不是名义上的 6%。凡是跨一两年以上比较两个利率,务必统一口径——要么都名义,要么都实际。",
          ],
        },
        {
          heading: "怎么选率,怎么诚实地读结果",
          paragraphs: [
            "通胀率输入就是整个模型,所以它的来源很重要。长期历史平均、央行目标和近年体感可能相差好几个百分点,而在 30 年里,每个百分点的差异都会复利成答案里的巨大缺口。站得住脚的做法是跑低、中、高三档,对着区间做规划,而不是对着一个数字。",
            "注意工具测的是什么:它把一笔金额按一个平均率推着走。它不模拟你的个人篮子——房租占比、医疗使用和消费习惯不同的家庭,面对的通胀并不相同,而统计口径的通胀是所有人的平均。如果房租在你支出里占大头,你的个人通胀率可能和头条数字不一样。",
            "做规划对话时,引用的应该是购买力那个数字,因为它把一切都换算成你当前收入和预算已经在用的单位。名义数字回答的是另一个问题——届时存在多少现金——也是最常被误用的那个,因为它听起来更大。",
          ],
        },
        {
          heading: "通缩放在哪里,模型在哪里失真",
          paragraphs: [
            "通缩——价格下跌——在现代经济中少见但并非虚构:日本经历了数十年的温和通缩,危机年份也出现过短促的剧烈通缩。同一套公式就能处理:负利率下,未来篮子更便宜,累计通胀转负,钱更值钱。陷阱在于,通缩通常伴随收入收缩,更便宜的价格未必等于更宽裕的预算。",
            "模型的诚实边界:它用单一恒定率、按整年推进,并且忽略部分价格与平均水平的偏离。它也不回答通胀发生在什么时候——第一年丢掉的购买力,比第二十年丢掉同样多更疼,因为中间那些年你本可以把差额拿去投资。",
            "作为传达量级的单一数字,恒定率模型是正确的第一件工具。涉及合同、养老金和长期储蓄计划的决策,先用它定出大致范围,再换几个率重跑——工具在本地瞬时出结果,情景测试零成本。",
          ],
        },
      ],
    },
    ja: {
      name: "インフレ計算(購買力シミュレーション)",
      tagline:
        "金額・年インフレ率・年数を入力すると、同じ買い物かごの将来価格・累計インフレ率・そのお金の残る購買力を複利で算出します。",
      intro: [
        "お金の額は減りませんが、買える量は減ります。金額、年平均インフレ率、年数を入力すると、複利のインフレ因子 (1 + i)^n を適用します。利息と同じ複利の論理が、逆方向——あなたに不利な方向——に働きます。",
        "出力は 3 つです。今日その金額で買えるかごが n 年後にいくらになるか、期間全体の累計インフレ率、そして同じ金額が当時何を買えるか(今日の物価で表現)。年ごとの表は、途中の毎年の対比を示します。",
        "マイナスの率も入力でき、デフレを表します。物価が下がり、累計率はマイナスになり、お金は多くを買えます。入力する率はあくまで例示の仮定です。長期インフレは一定ではないので、単一の平均率は平滑化の道具と考えてください。",
        "計算はすべてブラウザ内で完結し、データの送信はありません。給与交渉、家賃の値上げ、長期契約、貯蓄目標を、あらゆる固定数字に静かに課される税——インフレ——に対して照らし合わせるのに使えます。",
      ],
      steps: [
        "金額、またはかごの現在の価格を入力します。",
        "想定する年平均インフレ率を設定します。",
        "算出する年数を入力します。",
        "将来のかご価格・累計インフレ率・残る購買力を確認します。",
      ],
      faqs: [
        {
          q: "累計インフレ率とは何ですか?",
          a: "期間全体の価格上昇合計:(1 + i)^n − 1。年 3% で 10 年なら約 34.4% です。3% が 10 回足しても 30% にならないのは、毎年の上昇が前年の価格を底にして複利するからです。",
        },
        {
          q: "同じ金額で将来買えるものが減るのはなぜですか?",
          a: "物価は上がるのに金額は変わらないからです。(1 + i)^n で割ると将来の金額を今日のお金に換算できます。年 3% で 10 年なら、10 年後の 100 は今の約 74.4 と同じ購買力です。",
        },
        {
          q: "年ごとに異なるインフレ率に対応しますか?",
          a: "対応していません。単一の一定平均率を適用します。これは規模感を示す標準的な方法です。実際のインフレは年ごとに振れます。独自の経路を試すには、年ごとに因子を掛けるか、期間を分けて再計算してください。",
        },
        {
          q: "マイナスのインフレ率は何を意味しますか?",
          a: "デフレです。物価水準が下がり、将来のかごは安くなり、累計率はマイナス、同じお金はより多くを買えます。計算器は同じ式で処理し、画面にデフレシナリオであることを表示します。",
        },
      ],
      deepDive: [
        {
          heading: "インフレが加算ではなく複利なのはなぜか",
          paragraphs: [
            "3% の値上げは走行中の合計に 3 ポイント加算するのではなく、物価水準に 1.03 を掛けます。10 年後の水準は 1.03^10 ≈ 1.344 で、上昇は 34.4% であり 30% ではありません。10 年では小さな差でも、40 年のキャリアでは決定的です。3% が 40 年続くと因子は約 3.26——名目一定の預金は購買力の 3 分の 2 以上を失います。",
            "この乗算の性質こそ、長期契約や固定年金が静かに血を流す理由です。固定された数字——上がらない給与、今日の物価で確定した保険金、インフレを織り込んでいない貯蓄目標——は、決して止まらない因子によって年々減価しています。このツールの年次表は、その年ごとの削れを平均で消さずに見える化します。",
            "同じ数学は実質リターンにも逆方向で作用します。6% の運用利回りに対してインフレ 3% なら、購買力の伸びはおおよそ (1.06 ÷ 1.03) − 1 ≈ 2.9%/年で、名目の 6% ではありません。1〜2 年を超えて二つの率を比べるときは、必ず同じ単位——どちらも名目かどちらも実質——で比べてください。",
          ],
        },
        {
          heading: "率の選び方と、結果の誠実な読み方",
          paragraphs: [
            "率の入力がモデルそのものなので、その出所が重要です。長期の履歴平均、中央銀行の目標、最近の体感は数ポイントずつ異なり、30 年では率の 1 ポイントが答えの大きな開きに複利します。堅実な実践は、低・中・高の率を実行し、一つの数字ではなく分布に対して計画することです。",
            "ツールが測るものに注意してください。一つの金額を一つの平均率で動かしているだけです。個人のかごはモデル化していません。家賃の比率・医療の利用・消費習慣によって、各世帯が直面するインフレは異なり、統計上のインフレはその平均です。家賃の占める割合が大きいなら、あなた個人の率はヘッドラインとは違うはずです。",
            "計画の会話で引用すべきは購買力の数字です。現在の収入と予算がすでに使っている単位に換算するからです。名目の数字は別の質問——将来いくらの現金が存在するか——に答え、大きく聞こえるために最も誤用されがちです。",
          ],
        },
        {
          heading: "デフレの位置と、モデルの曲がる場所",
          paragraphs: [
            "デフレ——物価下落——は現代経済ではまれですが、想像ではありません。日本は穏やかなデフレを数十年経験し、危機の年には短く鋭い局面がありました。同じ式が処理します。率をマイナスにすれば、将来のかごは安くなり、累計インフレはマイナス、お金の購買力は上がります。落とし穴は、デフレは通常所得の収縮とともに来ることで、安い物価が楽な家計を意味するとは限りません。",
            "モデルの正直な限界:単一の一定率を使い、整数年ごとに適用し、平均から外れる価格の動きを無視します。インフレがいつ起きるかも扱いません。1 年目に失った購買力は、20 年目に同じだけ失うより痛手です。その間に差額を運用できたはずだからです。",
            "規模感を伝える一つの数字としては、一定率モデルが最初の道具として正しいです。契約・年金・長期貯蓄計画の意思決定では、まず当たりを付け、複数の率で再実行してください。ツールはローカルで即時に動くので、シナリオ試行は無料です。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de inflación",
      tagline:
        "Introduzca un importe, una tasa de inflación y años para ver cuánto costará la misma cesta, la inflación acumulada y cuánto comprará su dinero entonces.",
      intro: [
        "El dinero no se encoge, pero lo que compra sí. Introduzca un importe, una tasa media de inflación anual y un número de años, y la calculadora aplica el factor compuesto (1 + i)^n — la misma lógica de interés compuesto, trabajando contra usted.",
        "Salen tres respuestas: cuánto costará tras n años una cesta que hoy cuesta ese importe, la inflación acumulada del periodo, y qué comprará entonces la misma cantidad de dinero, expresada en precios de hoy. Una tabla año a año muestra la misma comparación para cada año intermedio.",
        "Se admite una tasa negativa y modela deflación: los precios bajan, la tasa acumulada se vuelve negativa y el dinero compra más. La tasa que introduzca es una suposición de ejemplo — la inflación de largo plazo no es constante, así que trate una sola media como un suavizador.",
        "La herramienta calcula todo en su navegador y no pide datos. Úsela para contrastar negociaciones salariales, subidas de alquiler, contratos largos y metas de ahorro frente al impuesto silencioso que la inflación cobra a cada número fijo.",
      ],
      steps: [
        "Introduzca el importe de dinero o el precio actual de una cesta.",
        "Fije una tasa media de inflación anual supuesta.",
        "Introduzca el número de años a proyectar.",
        "Lea el costo futuro de la cesta, la inflación acumulada y el poder adquisitivo restante.",
      ],
      faqs: [
        {
          q: "¿Qué es la inflación acumulada?",
          a: "La subida total de precios de todo el periodo: (1 + i)^n − 1. Al 3% anual durante 10 años ronda el 34,4% — diez cifras anuales del 3% no suman 30%, porque cada subida compone sobre la del año anterior.",
        },
        {
          q: "¿Por qué la misma cantidad compra menos en el futuro?",
          a: "Porque los precios suben mientras el importe no cambia. Dividir por (1 + i)^n convierte el importe futuro en dinero de hoy: al 3% durante 10 años, 100 entonces compra lo que hoy compra unos 74,4.",
        },
        {
          q: "¿Modela tasas de inflación distintas por año?",
          a: "No — aplica una única tasa media constante, la forma estándar de mostrar la escala. La inflación real oscila cada año; para una ruta personalizada, multiplique los factores anuales usted mismo o reejecute la herramienta por tramos.",
        },
        {
          q: "¿Qué significa una tasa de inflación negativa?",
          a: "Deflación: el nivel de precios cae, la cesta futura cuesta menos, la tasa acumulada se vuelve negativa y el mismo dinero compra más. La calculadora lo maneja con la misma fórmula y señala el escenario en la interfaz.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué la inflación compone en vez de sumar",
          paragraphs: [
            "Una subida del 3% no suma tres puntos a un total acumulado; multiplica el nivel de precios por 1,03. Tras diez años así el nivel es 1,03^10 ≈ 1,344: los precios están un 34,4% más altos, no un 30%. La diferencia parece pequeña en una década y se vuelve decisiva en una carrera: al 3% durante 40 años el factor ronda 3,26 — una suma nominal fija pierde más de dos tercios de su poder adquisitivo.",
            "Ese comportamiento multiplicativo es por lo que los contratos largos y las pensiones fijas sangran en silencio. Cada número fijo — un salario que nunca sube, una indemnización fijada en precios de hoy, una meta de ahorro calculada sin inflación — se está desinflando año tras año por un factor que nunca descansa. La tabla de esta herramienta hace visible la mordida anual en vez de promediarla.",
            "La misma matemática corre en reversa para los rendimientos reales: un 6% de retorno frente a un 3% de inflación crece el poder adquisitivo cerca de (1,06 ÷ 1,03) − 1 ≈ 2,9% al año, no el 6% nominal. Cuando compare dos tasas a más de uno o dos años, compárelas en la misma unidad — ambas nominales o ambas reales.",
          ],
        },
        {
          heading: "Elegir la tasa y leer el resultado con honestidad",
          paragraphs: [
            "La tasa introducida es todo el modelo, así que importa de dónde sale. Los promedios históricos de largo plazo, las metas de los bancos centrales y la experiencia reciente difieren en varios puntos, y en 30 años cada punto de tasa compone una brecha grande en la respuesta. Una práctica defendible es ejecutar una tasa baja, una media y una alta, y planificar contra la dispersión.",
            "Note qué mide la herramienta: mueve un importe por una tasa media. No modela su cesta personal — los hogares enfrentan inflaciones distintas según la cuota de alquiler, el uso de sanidad y los hábitos de consumo, y la inflación medida nacional es un promedio de todas. Si el alquiler pesa mucho en su gasto, su tasa personal puede diferir del titular.",
            "La cifra de poder adquisitivo es la que conviene citar en conversaciones de planificación, porque convierte todo a la unidad que su ingreso y presupuesto actuales ya usan. La cifra nominal responde otra pregunta — cuánto efectivo existirá — y es la más mal utilizada, porque suena más grande.",
          ],
        },
        {
          heading: "Dónde encaja la deflación y dónde el modelo se dobla",
          paragraphs: [
            "La deflación — precios que caen — es rara en las economías modernas pero no imaginaria: Japón pasó décadas con deflación suave, y años de crisis han visto episodios breves y agudos. La misma fórmula la maneja: con tasa negativa la cesta futura cuesta menos, la inflación acumulada se vuelve negativa y el dinero gana poder de compra. La trampa es que la deflación suele llegar con ingresos que se contraen, así que precios más baratos no significan presupuestos más holgados.",
            "Los límites honestos del modelo: usa una tasa constante, la aplica en pasos de años enteros e ignora que algunos precios se mueven distinto del promedio. Tampoco dice cuándo ocurre la inflación — poder adquisitivo perdido en el año uno duele más que la misma pérdida en el año veinte, porque en el intermedio pudo invertir la diferencia.",
            "Para un solo número que comunica la escala, el modelo de tasa constante es la primera herramienta correcta. Para decisiones sobre contratos, pensiones o planes de ahorro largos, úsela para fijar el rango y luego reejecute con varias tasas — la herramienta corre al instante y en local, así que probar escenarios es gratis.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de inflação",
      tagline:
        "Informe um valor, uma taxa de inflação e anos para ver quanto a mesma cesta vai custar, a inflação acumulada e quanto seu dinheiro comprará então.",
      intro: [
        "O dinheiro não encolhe, mas o que ele compra sim. Informe um valor, uma taxa média de inflação anual e um número de anos, e a calculadora aplica o fator composto (1 + i)^n — a mesma lógica dos juros compostos, trabalhando contra você.",
        "Três respostas saem: quanto custará após n anos uma cesta que hoje custa esse valor, a inflação acumulada do período, e o que a mesma quantia comprará então, expressa em preços de hoje. Uma tabela ano a ano mostra a mesma comparação para cada ano intermediário.",
        "Taxa negativa é permitida e modela deflação: os preços caem, a taxa acumulada fica negativa e o dinheiro compra mais. A taxa que você informar é uma suposição de exemplo — a inflação de longo prazo não é constante, então trate uma média única como um suavizador.",
        "A ferramenta calcula tudo no seu navegador e não pede dados. Use-a para conferir negociações salariais, aumentos de aluguel, contratos longos e metas de poupança contra o imposto silencioso que a inflação cobra de todo número fixo.",
      ],
      steps: [
        "Informe o valor em dinheiro ou o preço atual de uma cesta.",
        "Defina uma taxa média anual de inflação presumida.",
        "Informe o número de anos a projetar.",
        "Leia o custo futuro da cesta, a inflação acumulada e o poder de compra restante.",
      ],
      faqs: [
        {
          q: "O que é inflação acumulada?",
          a: "A alta total de preços de todo o período: (1 + i)^n − 1. A 3% ao ano por 10 anos fica em cerca de 34,4% — dez números anuais de 3% não somam 30%, porque cada alta compõe sobre a do ano anterior.",
        },
        {
          q: "Por que a mesma quantia compra menos no futuro?",
          a: "Porque os preços sobem enquanto a quantia não muda. Dividir por (1 + i)^n converte o valor futuro em dinheiro de hoje: a 3% por 10 anos, 100 lá na frente compra o que hoje cerca de 74,4 compra.",
        },
        {
          q: "Modela taxas de inflação diferentes por ano?",
          a: "Não — aplica uma única taxa média constante, a forma padrão de mostrar a escala. A inflação real oscila ano a ano; para um caminho personalizado, multiplique os fatores anuais você mesmo ou rode a ferramenta por trechos.",
        },
        {
          q: "O que significa uma taxa de inflação negativa?",
          a: "Deflação: o nível de preços cai, a cesta futura custa menos, a taxa acumulada fica negativa e o mesmo dinheiro compra mais. A calculadora trata com a mesma fórmula e sinaliza o cenário na interface.",
        },
      ],
      deepDive: [
        {
          heading: "Por que a inflação compõe em vez de somar",
          paragraphs: [
            "Uma alta de 3% não soma três pontos num total corrente; multiplica o nível de preços por 1,03. Depois de dez anos assim o nível é 1,03^10 ≈ 1,344: os preços estão 34,4% mais altos, não 30%. A diferença parece pequena numa década e vira decisiva numa carreira: a 3% por 40 anos o fator fica perto de 3,26 — uma soma nominal fixa perde mais de dois terços do poder de compra.",
            "Esse comportamento multiplicativo é o motivo de contratos longos e pensões fixas sangrarem em silêncio. Todo número fixo — um salário que nunca sobe, uma indenização travada em preços de hoje, uma meta de poupança calculada sem inflação — está sendo deflacionado ano após ano por um fator que nunca pausa. A tabela desta ferramenta torna visível a mordida anual em vez de diluí-la na média.",
            "A mesma matemática roda ao contrário para retornos reais: um retorno de 6% contra 3% de inflação cresce o poder de compra cerca de (1,06 ÷ 1,03) − 1 ≈ 2,9% ao ano, não os 6% nominais. Sempre que comparar duas taxas por mais de um ou dois anos, compare-as na mesma unidade — ambas nominais ou ambas reais.",
          ],
        },
        {
          heading: "Escolhendo a taxa e lendo o resultado com honestidade",
          paragraphs: [
            "A taxa informada é o modelo inteiro, então importa de onde ela vem. Médias históricas de longo prazo, metas de bancos centrais e a experiência recente diferem em vários pontos, e em 30 anos cada ponto de taxa compõe uma brecha grande na resposta. Uma prática defensável é rodar uma taxa baixa, uma média e uma alta, e planejar contra a dispersão.",
            "Note o que a ferramenta mede: move um valor por uma taxa média. Ela não modela sua cesta pessoal — lares enfrentam inflações diferentes conforme a parcela do aluguel, o uso de saúde e os hábitos de consumo, e a inflação medida nacionalmente é uma média de todas. Se o aluguel pesa muito no seu gasto, sua taxa pessoal pode diferir do número de manchete.",
            "A cifra de poder de compra é a que se deve citar em conversas de planejamento, porque converte tudo à unidade que sua renda e orçamento atuais já usam. A cifra nominal responde outra pergunta — quanto caixa existirá — e é a mais mal utilizada, porque soa maior.",
          ],
        },
        {
          heading: "Onde a deflação cabe e onde o modelo entorta",
          paragraphs: [
            "A deflação — preços caindo — é rara nas economias modernas mas não imaginária: o Japão passou décadas em deflação suave, e anos de crise viram episódios curtos e agudos. A mesma fórmula a trata: com taxa negativa a cesta futura custa menos, a inflação acumulada fica negativa e o dinheiro ganha poder de compra. A pegadinha é que a deflação costuma chegar com rendas encolhendo, então preços mais baratos não significam orçamento mais folgado.",
            "Os limites honestos do modelo: usa uma taxa constante, aplica-a em passos de anos inteiros e ignora que alguns preços se movem diferente da média. Também não diz quando a inflação acontece — poder de compra perdido no ano um dói mais que a mesma perda no ano vinte, porque no meio você poderia ter investido a diferença.",
            "Para um número único que comunica a escala, o modelo de taxa constante é a primeira ferramenta certa. Para decisões sobre contratos, pensões ou planos de poupança longos, use-o para delimitar o campo e rode de novo com várias taxas — a ferramenta roda na hora e localmente, então testar cenários é de graça.",
          ],
        },
      ],
    },
  },
});
