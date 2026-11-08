import { CalcEngineIncomeTax } from "../_engines/calc-engine-incometax";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "income-tax-calculator",
  category: "utility",
  icon: "file",
  engine: { component: CalcEngineIncomeTax },
  related: ["salary-to-hourly", "hourly-to-salary", "profit-calculator", "break-even-calculator", "tip-calculator", "overtime-pay-calculator"],
  copy: {
    en: {
      name: "Income Tax Calculator",
      tagline: "See how US federal tax builds up bracket by bracket: taxable income, total tax, marginal versus effective rate, and exactly how much each 10–37% slice costs.",
      intro: [
        "Enter your annual income, a filing status (single or married filing jointly) and a deduction, and the tool walks the 2026 federal brackets one step at a time. The result is not a single scary number but the actual mechanism: how much of your income falls in the 10% bracket, how much in the 12%, and so on up to where your last dollar lands.",
        "Two rates answer two different questions. The marginal rate — the tax on your last dollar — is what prepayment, raise and deduction decisions should reference, because it prices the next dollar you earn. The effective rate — total tax divided by income — is what your paycheck actually feels, and it is always lower than the marginal rate for anyone past the first bracket.",
        "The tax-by-bracket table makes the progressive structure concrete. Your first dollars are taxed gently no matter how much you earn; only the slice above each threshold pays the higher rate. People often fear a raise 'pushing me into a higher bracket' — the table shows that pushing income into the 32% bracket only taxes the dollars past that threshold, never the whole salary.",
        "The brackets used are the 2026 inflation-adjusted figures from IRS Revenue Procedure 2025-32, presented as an illustrative model. Tax law changes, credits vary by household, and states add their own taxes on top — always treat this as a planning sketch and verify against the IRS's latest publications before making decisions.",
      ],
      steps: [
        "Enter your annual income before deductions.",
        "Choose single or married filing jointly.",
        "Set the deduction — prefilled with the 2026 standard deduction.",
        "Read total tax, marginal and effective rates, and the bracket table.",
      ],
      faqs: [
        {
          q: "What is the difference between marginal and effective rate?",
          a: "The marginal rate is the tax on your next dollar: it is the bracket where your taxable income ends, and it is the rate that matters when weighing a raise, a deduction or extra income. The effective rate is total tax divided by total income. On a 100,000 single income with the 2026 standard deduction, the marginal rate is 22% while the effective rate is about 13.2%.",
        },
        {
          q: "Does a raise into a higher bracket reduce my take-home pay?",
          a: "No. Brackets are marginal: only the dollars above each threshold are taxed at that bracket's rate. Moving from the 22% to the 24% bracket taxes just the slice past the threshold, leaving everything below untouched. Take-home pay never decreases because of a bracket crossing.",
        },
        {
          q: "Which deduction should I enter?",
          a: "Most filers take the standard deduction, which the tool prefills from the 2026 figures ($16,100 single, $32,200 married filing jointly). If your itemized deductions — mortgage interest, state and local taxes within caps, charitable gifts — exceed that, enter their total. Enter whichever of the two is larger, as that is how the deduction actually works.",
        },
        {
          q: "How current are these brackets?",
          a: "They are the 2026 inflation-adjusted thresholds published by the IRS in Revenue Procedure 2025-32, shown here as an illustrative model. The IRS adjusts brackets most years, and legislation can change rates mid-cycle. Check the IRS's latest publications for the year you are actually filing.",
        },
      ],
      deepDive: [
        {
          heading: "How progressive taxation actually computes",
          paragraphs: [
            "A marginal schedule is a set of floors. The 2026 single schedule taxes the first $12,400 of taxable income at 10%, the next $38,000 at 12%, the next $55,300 at 22%, and so on. Only the dollars within each window pay that window's rate. Computing the total is therefore a sum over slices, not a single multiplication — which is exactly what the bracket table shows.",
            "The deduction enters before any rate is applied: taxable income equals income minus deduction, floored at zero. This is why the effective rate can stay in the low teens even for incomes whose top slice is taxed at 24% or 32% — the lower brackets absorb most of the income at much gentler rates.",
            "Filing status works by widening the floors, not by applying a multiplier. Married-filing-jointly thresholds are roughly double the single ones through the 32% bracket, which is how the system approximates taxing a couple as one unit. Head-of-household and other statuses exist with their own schedules; this tool deliberately keeps to the two most common.",
          ],
        },
        {
          heading: "What this simplified model deliberately leaves out",
          paragraphs: [
            "The real form 1040 is a conversation, not a formula. Tax credits (child tax credit, education credits, earned income credit) subtract from the tax after the brackets are done, sometimes to zero. Pre-tax retirement contributions and health premiums reduce income before the brackets see it. Capital gains and qualified dividends use their own schedules. None of that is modeled here.",
            "State and local income taxes stack on top, with rates from zero in no-tax states to over 10% at high incomes elsewhere. Payroll taxes (Social Security and Medicare) are separate again. A paycheck that feels like a 25% total burden may be 14% federal, 5% state and 6% payroll — this tool isolates only the federal slice so each piece stays legible.",
            "The honest use is directional: compare two scenarios (deduct now versus later, one job offer versus another) and read the difference, not the absolute. For filing, use the IRS's own calculators or a preparer. Every number here carries the caveat that it is a 2026 illustrative model pending the IRS's latest figures.",
          ],
        },
        {
          heading: "Using marginal and effective rates for decisions",
          paragraphs: [
            "Each rate is the right tool for a different decision. The marginal rate prices marginal choices: a deduction worth $1,000 saves $1,000 × your marginal rate; an extra $10,000 of freelance income costs $10,000 × marginal rate in federal tax. Effective rate answers lifestyle questions: what share of income does the government actually take?",
            "The gap between the two rates is itself information. A small effective rate with a high marginal rate means most of your income sits in low brackets — which is also why deductions are worth least to high earners per dollar of income relative to their bracket, and why the same deduction moves the needle more for a median earner.",
            "Watch the thresholds near where you stand. Crossing a bracket line costs almost nothing (one dollar, taxed a couple of points more), but some credits and phase-outs key off exact income levels and can drop sharply. This model does not simulate phase-outs, so when your income sits near a known cliff, verify with official sources before acting.",
          ],
        },
      ],
    },
    zh: {
      name: "个人所得税计算器(美国联邦)",
      tagline: "逐档展示美国联邦个税的构成:应税所得、总税额、边际与有效税率之别,以及每一档 10–37% 各吃掉多少钱。",
      intro: [
        "输入年收入、申报状态(单身或夫妻合并申报)和扣除额,工具会沿 2026 年联邦税级逐档走一遍。你得到的不是一个吓人的总数,而是真实的机制:多少收入落在 10% 档、多少落在 12% 档,直到最后一美元落在哪一档。",
        "两个税率回答两个不同的问题。边际税率——最后一美元的税负——是加薪、扣除、兼职收入决策应当参考的数字,它给你的下一美元定价。有效税率——总税额除以收入——才是工资单的真实感受,只要过了第一档,它一定低于边际税率。",
        "逐档税额表把累进结构落到实处。无论收入多高,最前面的钱都按低税率征收;只有超过各阈值的那部分才按更高档计税。很多人担心“涨薪把我推进更高档”——表格会显示,进入 32% 档只对超过阈值的那部分收入多征税,绝不会对整份工资重征。",
        "所用税级为 IRS 2025-32 号程序公告的 2026 年通胀调整值,以示例模型呈现。税法会变、抵免因家庭而异、州税另计——请把它当作规划草图,决策前务必对照 IRS 最新公布核实。",
      ],
      steps: [
        "输入扣除前的年收入。",
        "选择单身或夫妻合并申报。",
        "设定扣除额——已预填 2026 标准扣除额。",
        "查看总税额、边际与有效税率,以及逐档税额表。",
      ],
      faqs: [
        {
          q: "边际税率和有效税率有什么区别?",
          a: "边际税率是对你下一美元的征税:它由应税所得止步的那一档决定,评估加薪、扣除或额外收入时应当看它。有效税率是总税额除以总收入。以 2026 标准扣除、单身 10 万美元收入为例,边际税率为 22%,有效税率约 13.2%。",
        },
        {
          q: "涨薪进入更高档会让我到手变少吗?",
          a: "不会。税级是边际的:只有超过各阈值的那部分收入按该档税率计税。从 22% 档进入 24% 档,只是超出阈值的那一小段多缴两个点,以下部分原封不动。跨档永远不会让到手收入减少。",
        },
        {
          q: "应该填哪个扣除额?",
          a: "多数纳税人采用标准扣除,工具已按 2026 数字预填(单身 $16,100,夫妻合并 $32,200)。如果你的分项扣除——房贷利息、限额内的州与地方税、慈善捐赠等——超过该值,就填分项合计。两个当中填较大的那个,这与实际规则一致。",
        },
        {
          q: "这些税级是最新的吗?",
          a: "它们是 IRS 2025-32 号程序公告公布的 2026 年通胀调整阈值,以示例模型呈现。IRS 几乎每年都会调整税级,立法也可能中途改变税率。报税那年请以 IRS 最新公布为准。",
        },
      ],
      deepDive: [
        {
          heading: "累进税到底怎么算",
          paragraphs: [
            "边际税级就是一组下限。2026 年单身档:应税所得的前 $12,400 按 10%,接下来的 $38,000 按 12%,再接下来 $55,300 按 22%,以此类推。只有落在每个窗口内的美元按该窗口的税率计税。总税额因此是对各切片求和,而不是一次乘法——这正是逐档表展示的内容。",
            "扣除额在任何税率之前进入:应税所得 = 收入 − 扣除额,下限为零。这就是为什么即便顶层切片按 24% 或 32% 计税,有效税率仍可能只有百分之十几——低档位以温和的税率吸收了大部分收入。",
            "申报状态的机制是加宽下限,而不是乘系数。夫妻合并申报的阈值在 32% 档及以下大约是单身档的两倍,这相当于把夫妻当作一个整体来征税。户主等其他状态另有税级表;本工具刻意只保留最常见的两种。",
          ],
        },
        {
          heading: "这个简化模型刻意省掉了什么",
          paragraphs: [
            "真实的 1040 表是一场对话,不是一条公式。税收抵免(儿童抵免、教育抵免、劳动所得抵免)在档位算完之后从税额里减,有时直接减到零。税前退休金供款和医保保费在进入档位前就先减收入。资本利得与合格股息另有税级表。这些本模型都没有模拟。",
            "州与地方所得税叠加在其上,从零税州到高收入者 10% 以上不等。工资税(社保与医保)又是另一笔。一张感觉税负 25% 的工资单,可能是 14% 联邦 + 5% 州 + 6% 工资税——本工具只隔离联邦部分,让每一块都看得清。",
            "诚实的用法是看方向:比较两种情景(现在扣还是以后扣、两个 offer 之间),读差值而不是绝对值。正式报税请用 IRS 官方计算器或专业人士。这里每个数字都带着同一条警告:它是 2026 年示例口径,以 IRS 最新数字为准。",
          ],
        },
        {
          heading: "用边际与有效税率做决策",
          paragraphs: [
            "两个税率各司其职。边际税率为边际选择定价:价值 $1,000 的扣除省下 $1,000 × 边际税率;额外 $10,000 的兼职收入要缴 $10,000 × 边际税率的联邦税。有效税率回答生活层面的问题:政府实际拿走了收入的几成?",
            "两者之差本身就是信息。有效税率很低而边际税率很高,说明大部分收入停在低档位——这也解释了为什么同样的扣除对高收入者的边际价值反而取决于所在档,以及为什么同一笔扣除对中等收入者“撬动”更大。",
            "留意你所处的阈值附近。跨过一条档线几乎零成本(一美元多缴两三个点),但一些抵免和递减条款以精确的收入水平为闸门,可能骤降。本模型不模拟递减条款,当你的收入接近已知的悬崖时,行动前请用官方来源核实。",
          ],
        },
      ],
    },
    ja: {
      name: "所得税計算(米国連邦)",
      tagline: "米国連邦所得税が段階ごとに積み上がる様子を表示:課税所得、総税額、限界税率と実効税率の違い、そして各 10–37% の区分がいくら取るか。",
      intro: [
        "年収・申告区分(単身または夫婦共同)・控除額を入力すると、このツールは 2026 年の連邦税率区分を一段ずつたどります。結果は恐ろしい合計額ではなく、実際の仕組みです。収入のどれだけが 10% 区分に入り、どれだけが 12% に入り、最後の 1 ドルがどこに落ちるか。",
        "2 つの税率は 2 つの異なる問いに答えます。限界税率(最後の 1 ドルへの税)は、昇給・控除・追加収入の判断で参照すべき数字で、次に稼ぐ 1 ドルの値段です。実効税率(総税額 ÷ 収入)は給料の実感であり、最初の区分を超える人にとって必ず限界税率より低くなります。",
        "段階別の税額表は累進構造を具体的にします。収入がどれだけあっても最初のドルは低率で課され、各しきい値を超える部分だけが高い税率を払います。「昇給で高い区分に入るのが怖い」という不安はよくありますが、表は 32% 区分に入ってもしきい値を超えた分だけが追加で課されることを示します。",
        "使用した区分は IRS 情報処理通達 2025-32 が公表した 2026 年インフレ調整値で、例示モデルとして提示しています。税法は変わり、控除は世帯ごとに異なり、州税は別途かかります。あくまで計画用のスケッチと捉え、意思決定の前には必ず IRS の最新公表値で確認してください。",
      ],
      steps: [
        "控除前の年収を入力します。",
        "単身か夫婦共同申告を選びます。",
        "控除額を設定します(2026 年標準控除を初期値としています)。",
        "総税額・限界税率・実効税率と区分別の表を確認します。",
      ],
      faqs: [
        {
          q: "限界税率と実効税率の違いは?",
          a: "限界税率は次の 1 ドルへの税です。課税所得が終わる区分で決まり、昇給・控除・追加収入を判断するときに参照します。実効税率は総税額 ÷ 総収入です。2026 年標準控除で単身 10 万ドルの場合、限界税率は 22% ですが実効税率は約 13.2% です。",
        },
        {
          q: "昇給で高い区分に入ると手取りが減りますか?",
          a: "減りません。区分は限界的です。各しきい値を超えた部分だけがその税率で課されます。22% から 24% へ移っても、しきい値を超えたスライスにだけ 2 ポイント多くかかり、それ以下は無傷です。区分をまたいで手取りが減ることはありません。",
        },
        {
          q: "どの控除を入力すべきですか?",
          a: "多くの申告者は標準控除を取り、ツールは 2026 年の値(単身 $16,100、夫婦共同 $32,200)を初期入力しています。住宅ローン利子、上限内の州・地方税、寄付などの項目控除がそれを超えるなら、合計を入力してください。実際の規則と同様、大きい方を入力します。",
        },
        {
          q: "この区分は最新ですか?",
          a: "IRS 情報処理通達 2025-32 が公表した 2026 年インフレ調整しきい値で、例示モデルとして示しています。IRS はほぼ毎年区分を調整し、立法が税率を変えることもあります。実際に申告する年については IRS の最新公表値を確認してください。",
        },
      ],
      deepDive: [
        {
          heading: "累進課税は実際どう計算されるか",
          paragraphs: [
            "限界方式は下限の集合です。2026 年単身では、課税所得の最初の $12,400 が 10%、次の $38,000 が 12%、次の $55,300 が 22%。各窓の中のドルだけがその窓の税率を払います。総額は therefore スライスの総和であり、単純な掛け算ではありません。それが区分別の表が見せるものです。",
            "控除はどの税率より先に入ります。課税所得 = 収入 − 控除、最低 0。だからこそ、上位のスライスが 24% や 32% で課されても実効税率は 10% 前後に留まり得ます。低い区分が大部分の収入をはるかに低い税率で吸収するからです。",
            "申告区分の仕組みは下限を広げることであって、係数をかけることではありません。夫婦共同申告のしきい値は 32% 区分までおおむね単身の 2 倍で、夫婦を一つの単位として課税する近似になっています。世帯主などの区分には別の表がありますが、このツールは意図的に最も一般的な 2 つに絞っています。",
          ],
        },
        {
          heading: "この簡易モデルがあえて含めないもの",
          paragraphs: [
            "実際の 1040 は公式ではなく対話です。税額控除(児童控除、教育控除、勤労所得控除)は区分計算の後で税額から差し引かれ、ゼロになることもあります。税前の年金拠出や健康保険料は区分に入る前に収入を減らします。キャピタルゲインや配当には別の表があります。ここではどれもモデル化していません。",
            "州・地方所得税がその上に重なり、無税の州から高所得で 10% 超まで幅があります。ソーシャルセキュリティとメディケアの給与税はさらに別です。体感 25% の負担が、連邦 14% + 州 5% + 給与税 6% ということもあります。このツールは連邦部分だけを切り出し、各要素を読みやすく保ちます。",
            "誠実な使い方は方向性です。2 つのシナリオ(今控除するか後でするか、2 つのオファー)を比較して「差」を読み、絶対値には頼らない。申告には IRS の公式計算機か専門家を。ここ の数字はすべて、IRS の最新値を前提とする 2026 年例示モデルという注意書きを帯びています。",
          ],
        },
        {
          heading: "限界税率と実効税率を意思決定に使う",
          paragraphs: [
            "各税率には得意な判断があります。限界税率は限界的な選択の値段です。$1,000 の控除は $1,000 × 限界税率の節税になり、追加の $10,000 の副収入は $10,000 × 限界税率の連邦税を伴います。実効税率は生活の問いに答えます。政府は収入の何割を実際に取るのか。",
            "2 つの税率の差そのものが情報です。実効税率が低く限界税率が高いということは、収入の大部分が低区分にあるということ。同じ控除でも中所得者の方が針が大きく動く理由もここにあります。",
            "自分の立ち位置に近いしきい値を注視してください。区分線を 1 ドル超えるコストはほぼゼロですが、いくつかの控除や段階的縮小は正確な所得水準を引き金にして急に消えることがあります。このモデルは段階的縮小をシミュレートしません。所得が既知の崖の近くにあるときは、行動の前に公式情報で確認を。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de impuesto sobre la renta federal",
      tagline: "Vea cómo se construye el impuesto federal de EE. UU. tramo a tramo: base imponible, impuesto total, tipo marginal frente a efectivo y cuánto cuesta exactamente cada franja del 10–37%.",
      intro: [
        "Introduzca sus ingresos anuales, un estado de declaración (soltero o matrimonio conjunta) y una deducción, y la herramienta recorre los tramos federales de 2026 paso a paso. El resultado no es una cifra aterradora sino el mecanismo real: cuánto de sus ingresos cae en el tramo del 10%, cuánto en el del 12%, y así hasta dónde aterriza su último dólar.",
        "Dos tipos responden a dos preguntas distintas. El tipo marginal — el impuesto sobre su último dólar — es la referencia para decisiones de subida salarial, deducciones e ingresos extra, porque pone precio al siguiente dólar que gane. El tipo efectivo — impuesto total dividido por ingresos — es lo que de verdad siente su nómina, y siempre es menor que el marginal para quien pasa del primer tramo.",
        "La tabla de impuestos por tramo hace concreto el sistema progresivo. Sus primeros dólares se gravan con suavidad sin importar cuánto gane; solo la porción por encima de cada umbral paga el tipo más alto. La gente teme que una subida «me empuje a un tramo superior»: la tabla muestra que entrar en el tramo del 32% solo grava los dólares que pasan ese umbral, nunca el salario entero.",
        "Los tramos usados son los valores ajustados por inflación de 2026 publicados por el IRS en el Procedimiento Fiscal 2025-32, presentados como modelo ilustrativo. La ley cambia, los créditos varían por hogar y los estados añaden sus propios impuestos — tómelo siempre como un boceto de planificación y verifique las publicaciones más recientes del IRS antes de decidir.",
      ],
      steps: [
        "Introduzca sus ingresos anuales antes de deducciones.",
        "Elija soltero o matrimonio declaración conjunta.",
        "Fije la deducción — precargada con la deducción estándar de 2026.",
        "Lea el impuesto total, los tipos marginal y efectivo, y la tabla por tramos.",
      ],
      faqs: [
        {
          q: "¿Cuál es la diferencia entre tipo marginal y efectivo?",
          a: "El marginal es el impuesto sobre su próximo dólar: es el tramo donde termina su base imponible, y es el que importa al valorar una subida, una deducción o ingresos extra. El efectivo es impuesto total dividido por ingresos totales. Con la deducción estándar de 2026, unos ingresos de 100.000 soltero pagan un marginal del 22% y un efectivo de aproximadamente el 13,2%.",
        },
        {
          q: "¿Una subida que me lleva a un tramo superior reduce mi salario neto?",
          a: "No. Los tramos son marginales: solo los dólares por encima de cada umbral se gravan al tipo de ese tramo. Pasar del 22% al 24% grava únicamente la porción que cruza el umbral; todo lo anterior queda intacto. El salario neto nunca disminuye por cruzar un tramo.",
        },
        {
          q: "¿Qué deducción debo introducir?",
          a: "La mayoría opta por la deducción estándar, que la herramienta precarga con las cifras de 2026 ($16,100 soltero, $32,200 matrimonio). Si sus deducciones detalladas — intereses hipotecarios, impuestos estatales y locales dentro de límites, donaciones — superan esa cifra, introduzca su total. Introduzca la mayor de las dos, que es como funciona la regla.",
        },
        {
          q: "¿Qué de actualizados tienen estos tramos?",
          a: "Son los umbrales ajustados por inflación de 2026 publicados por el IRS en el Procedimiento Fiscal 2025-32, mostrados aquí como modelo ilustrativo. El IRS ajusta los tramos casi cada año y la legislación puede cambiar los tipos. Consulte las publicaciones más recientes del IRS para el año que realmente declara.",
        },
      ],
      deepDive: [
        {
          heading: "Cómo se calcula de verdad la progresividad",
          paragraphs: [
            "Una escala marginal es un conjunto de suelos. El esquema de 2026 para solteros grava los primeros $12,400 de base imponible al 10%, los siguientes $38,000 al 12%, los siguientes $55,300 al 22%, y así. Solo los dólares dentro de cada ventana pagan el tipo de esa ventana. El total es por tanto una suma de porciones, no una multiplicación única — exactamente lo que enseña la tabla por tramos.",
            "La deducción entra antes de aplicar cualquier tipo: base imponible = ingresos − deducción, con mínimo cero. Por eso el tipo efectivo puede seguir en la franja baja de la adolescencia aunque el tramo superior se grave al 24% o al 32%: los tramos bajos absorben la mayor parte del ingreso con tipos mucho más suaves.",
            "El estado de declaración funciona ensanchando los suelos, no aplicando un multiplicador. Los umbrales de matrimonio conjunta son aproximadamente el doble de los de soltero hasta el tramo del 32%, que es cómo el sistema aproxima la tributación de una pareja como una unidad. Existen cabeza de familia y otros estados con sus propias escalas; esta herramienta se queda deliberadamente con los dos más comunes.",
          ],
        },
        {
          heading: "Lo que este modelo simplificado deja fuera a propósito",
          paragraphs: [
            "El formulario 1040 real es una conversación, no una fórmula. Los créditos fiscales (por hijos, educación, ingreso del trabajo) restan del impuesto después de los tramos, a veces hasta dejarlo en cero. Las aportaciones de jubilación y las primas de salud reducen el ingreso antes de que los tramos lo vean. Las plusvalías y los dividendos cualificados usan sus propias escalas. Nada de eso se modela aquí.",
            "Los impuestos estatales y locales se apilan encima, desde cero en estados sin impuesto hasta más del 10% con rentas altas en otros. Los impuestos de nómina (Seguridad Social y Medicare) vuelven a ser aparte. Una nómina que se siente como un 25% de carga puede ser 14% federal, 5% estatal y 6% de nómina — esta herramienta aísla solo la parte federal para que cada pieza siga siendo legible.",
            "El uso honesto es direccional: compare dos escenarios (deducir ahora o después, una oferta frente a otra) y lea la diferencia, no el absoluto. Para declarar, use las calculadoras del propio IRS o un profesional. Cada número aquí lleva la advertencia de ser un modelo ilustrativo de 2026 pendiente de las últimas cifras del IRS.",
          ],
        },
        {
          heading: "Usar los tipos marginal y efectivo para decidir",
          paragraphs: [
            "Cada tipo es la herramienta adecuada para una decisión distinta. El marginal pone precio a las elecciones marginales: una deducción de $1,000 ahorra $1,000 × su tipo marginal; $10,000 extra de ingresos freelance cuestan $10,000 × tipo marginal en impuesto federal. El efectivo responde preguntas de estilo de vida: ¿qué parte de mis ingresos se lleva realmente el Estado?",
            "La distancia entre ambos tipos es en sí información. Un tipo efectivo bajo con uno marginal alto significa que la mayor parte del ingreso vive en tramos bajos — y explica por qué la misma deducción mueve más la aguja para un asalariado mediano que para uno que ya tributa arriba.",
            "Vigile los umbrales cerca de donde está. Cruzar una línea de tramo cuesta casi nada (un dólar, gravado un par de puntos más), pero algunos créditos y reducciones dependen de niveles exactos de renta y pueden caer con brusquedad. Este modelo no simula esas reducciones: cuando sus ingresos rondan un salto conocido, verifique con fuentes oficiales antes de actuar.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de imposto de renda federal",
      tagline: "Veja como o imposto federal dos EUA se constrói faixa por faixa: renda tributável, imposto total, alíquota marginal versus efetiva e quanto custa exatamente cada fatia de 10–37%.",
      intro: [
        "Informe a renda anual, uma situação de declaração (solteiro ou casal em declaração conjunta) e uma dedução, e a ferramenta percorre as faixas federais de 2026 um degrau por vez. O resultado não é um número assustador, mas o mecanismo real: quanto da renda cai na faixa de 10%, quanto na de 12%, e assim por diante até onde o seu último dólar pousa.",
        "Duas alíquotas respondem a perguntas diferentes. A alíquota marginal — o imposto sobre o seu último dólar — é a referência para decisões de aumento, dedução e renda extra, porque ela precifica o próximo dólar que você ganhar. A alíquota efetiva — imposto total dividido pela renda — é o que o contracheque realmente sente, e sempre é menor que a marginal para quem passa da primeira faixa.",
        "A tabela de imposto por faixa torna concreto o sistema progressivo. Seus primeiros dólares são tributados com suavidade não importa quanto você ganhe; só a fatia acima de cada limite paga a alíquota mais alta. Muita gente teme que um aumento “me empurre para uma faixa maior” — a tabela mostra que entrar na faixa de 32% só tributa os dólares que passam do limite, nunca o salário inteiro.",
        "As faixas usadas são os valores de 2026 ajustados pela inflação publicados pelo IRS no Revenue Procedure 2025-32, apresentados como modelo ilustrativo. A lei muda, os créditos variam por família e os estados cobram seus próprios impostos — trate sempre como um esboço de planejamento e confira as publicações mais recentes do IRS antes de decidir.",
      ],
      steps: [
        "Informe a renda anual antes das deduções.",
        "Escolha solteiro ou casal declaração conjunta.",
        "Defina a dedução — pré-preenchida com a dedução padrão de 2026.",
        "Leia o imposto total, as alíquotas marginal e efetiva e a tabela por faixas.",
      ],
      faqs: [
        {
          q: "Qual é a diferença entre alíquota marginal e efetiva?",
          a: "A marginal é o imposto sobre o seu próximo dólar: é a faixa em que termina sua renda tributável, e é a que importa ao avaliar um aumento, uma dedução ou renda extra. A efetiva é o imposto total dividido pela renda total. Com a dedução padrão de 2026, uma renda de 100.000 solteira paga marginal de 22% e efetiva de cerca de 13,2%.",
        },
        {
          q: "Um aumento que me leva a uma faixa maior reduz meu salário líquido?",
          a: "Não. As faixas são marginais: apenas os dólares acima de cada limite são tributados pela alíquota daquela faixa. Passar da faixa de 22% para a de 24% tributa somente a fatia que cruza o limite; todo o restante fica intacto. O salário líquido nunca diminui por cruzar uma faixa.",
        },
        {
          q: "Qual dedução devo informar?",
          a: "A maioria opta pela dedução padrão, que a ferramenta pré-preenche com os valores de 2026 ($16,100 solteiro, $32,200 casal). Se suas deduções detalhadas — juros de financiamento, impostos estaduais e locais dentro dos limites, doações — superarem esse valor, informe o total. Informe a maior das duas, que é como a regra funciona.",
        },
        {
          q: "Quão atuais são essas faixas?",
          a: "São os limites de 2026 ajustados pela inflação publicados pelo IRS no Revenue Procedure 2025-32, exibidos aqui como modelo ilustrativo. O IRS ajusta as faixas quase todo ano e legislação pode mudar as alíquotas. Confira as publicações mais recentes do IRS para o ano em que você realmente declarar.",
        },
      ],
      deepDive: [
        {
          heading: "Como a tributação progressiva realmente calcula",
          paragraphs: [
            "Uma escala marginal é um conjunto de pisos. A tabela de 2026 para solteiros tributa os primeiros $12,400 de renda tributável a 10%, os próximos $38,000 a 12%, os próximos $55,300 a 22%, e assim por diante. Apenas os dólares dentro de cada janela pagam a alíquota daquela janela. O total é, portanto, uma soma de fatias, não uma multiplicação única — exatamente o que a tabela por faixas mostra.",
            "A dedução entra antes de qualquer alíquota: renda tributável = renda − dedução, com mínimo zero. É por isso que a alíquota efetiva pode seguir na casa da adolescência mesmo quando a fatia de topo é tributada a 24% ou 32% — as faixas baixas absorvem a maior parte da renda com alíquotas muito mais gentis.",
            "A situação de declaração funciona alargando os pisos, não aplicando um multiplicador. Os limites de declaração conjunta são aproximadamente o dobro dos de solteiro até a faixa de 32%, que é como o sistema aproxima a tributação de um casal como uma unidade. Chefe de família e outras situações têm escalas próprias; esta ferramenta mantém deliberadamente as duas mais comuns.",
          ],
        },
        {
          heading: "O que este modelo simplificado deixa de fora de propósito",
          paragraphs: [
            "O formulário 1040 real é uma conversa, não uma fórmula. Créditos tributários (crédito por filho, educação, renda do trabalho) subtraem do imposto depois que as faixas terminam, às vezes até zerá-lo. Aportações de previdência e prêmios de saúde reduzem a renda antes que as faixas a vejam. Ganhos de capital e dividendos qualificados usam escalas próprias. Nada disso é modelado aqui.",
            "Impostos estaduais e locais se empilham por cima, de zero em estados sem imposto a mais de 10% em rendas altas em outros. Contribuições previdenciárias (Social Security e Medicare) são outra camada. Um contracheque que parece um ônus de 25% pode ser 14% federal, 5% estadual e 6% previdenciário — esta ferramenta isola só a fatia federal para que cada peça continue legível.",
            "O uso honesto é direcional: compare dois cenários (deduzir agora ou depois, uma oferta versus outra) e leia a diferença, não o absoluto. Para declarar, use as calculadoras do próprio IRS ou um profissional. Cada número aqui carrega a ressalva de ser um modelo ilustrativo de 2026, pendente das últimas cifras do IRS.",
          ],
        },
        {
          heading: "Usar alíquotas marginal e efetiva para decidir",
          paragraphs: [
            "Cada alíquota serve a uma decisão diferente. A marginal precifica escolhas marginais: uma dedução de $1,000 economiza $1,000 × sua alíquota marginal; $10,000 extras de renda autônoma custam $10,000 × alíquota marginal em imposto federal. A efetiva responde perguntas de estilo de vida: que fatia da renda o governo realmente leva?",
            "A distância entre as duas alíquotas é, ela mesma, informação. Uma efetiva baixa com marginal alta significa que a maior parte da renda vive em faixas baixas — e explica por que a mesma dedução move mais o ponteiro para um assalariado mediano do que para quem já tributa no topo.",
            "Observe os limites perto de onde você está. Cruzar uma linha de faixa custa quase nada (um dólar, tributado uns pontos a mais), mas alguns créditos e eliminações graduais usam níveis exatos de renda como gatilho e podem cair de repente. Este modelo não simula eliminações graduais; quando sua renda ronda um degrau conhecido, verifique fontes oficiais antes de agir.",
          ],
        },
      ],
    },
  },
});
