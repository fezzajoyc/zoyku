import { CalcEngineRent } from "../_engines/calc-engine-rent";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "rent-affordability-calculator",
  category: "utility",
  icon: "key",
  engine: { component: CalcEngineRent },
  related: ["mortgage-calculator", "emi-calculator", "loan-calculator", "salary-to-hourly", "compound-interest-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator"],
  copy: {
    en: {
      name: "Rent Affordability Calculator",
      tagline:
        "Find the maximum rent your monthly income can carry under the 30%, 33% or 40% rule — then see what remains after debts and renter insurance each month.",
      intro: [
        "Enter your monthly income (gross or take-home), pick a rent-to-income ratio — the classic 30% of gross, a looser 33%, or 40% of net for high-cost cities — and the calculator draws your rent ceiling. Other monthly debt payments and renter insurance are then subtracted so the number you see is actually liveable.",
        "You also get the debt-to-income percentage you would carry at that maximum rent, which is what lenders look at before approving you for a lease or mortgage. The budget line turns negative honestly when rent plus debts exceed your income — a signal to hunt for cheaper rent rather than stretch.",
        "The three ratio presets follow common guidance: 30% of gross income is the classic US benchmark dating to the 1980s Brooke Amendment, 33% offers slightly more flexibility, and 40% of take-home mirrors what high-cost-city renters actually do. The DTI shown — housing plus debts over income — is the same measure mortgage lenders typically cap near 43%.",
        "Compared with a bare rent cap, subtracting debts and insurance first yields a budget you can actually live on, and the negative-budget warning fires honestly when the inputs cannot work. Landlords also screen on income multiples — often 2.5–3× monthly rent — and credit history; these numbers are planning estimates, not pre-approval.",
      ],
      steps: [
        "Enter your monthly income and whether it is gross or take-home.",
        "Pick the rent-to-income ratio: 30%, 33% or 40%.",
        "Add other monthly debt payments and renter insurance, if any.",
        "Read the rent ceiling, the leftover budget and your debt-to-income ratio.",
      ],
      faqs: [
        {
          q: "Where does the 30% rule for rent come from?",
          a: "It traces to the US Brooke Amendment of 1969, which capped public-housing rent at 25% of income and was raised to 30% in 1981. HUD still calls households spending more than 30% of income on housing 'cost-burdened', which is why 30% of gross income stuck as the shorthand for affordable rent.",
        },
        {
          q: "Should I budget rent from gross or net income?",
          a: "The classic 30% rule applies to gross income, so it ignores taxes and looks more generous than your payslip. If you prefer to plan from take-home pay, using a higher ratio such as 40% of net lands in roughly the same place. What matters is picking one basis and staying consistent.",
        },
        {
          q: "What does the debt-to-income percentage mean here?",
          a: "It is the share of your income consumed by the maximum rent plus your listed debts and insurance. Lenders generally like total DTI below about 36%; above roughly 43% it gets hard to qualify for a mortgage. A high figure means the rent ceiling is too aggressive for your other obligations.",
        },
      ],
      deepDive: [
        {
          heading: "Where the 30% rule comes from — and what it forgets",
          paragraphs: [
            "The 30% benchmark has an American legislative origin: the Brooke Amendment of 1969 capped rent in public housing at 25% of income, and the ceiling was raised to 30% in 1981. Housing agencies still use the 30% line to define a “cost-burdened” household, and from there it leaked into general rent advice. Knowing the provenance matters because the number was a subsidy rule, not a finding about what any household can actually afford.",
            "The rule was designed around mid-20th-century gross incomes and household structures. It says nothing about the rest of the budget: a tenant with student loans and a car payment at 30% of gross is more stretched than one with no debts at 35%. It also ignores the biggest flex line in the budget — nothing in the rule accounts for childcare, commuting or medical costs, which vary far more than rent does.",
            "That is why this calculator offers three presets instead of one truth: 30% of gross for the classic reading, 33% for a modest stretch, and 40% of take-home for high-cost cities where 30% of gross may not price any actual apartment. Whichever preset you pick, subtract debts and insurance afterward — the leftover budget is the number that answers “can I live on this”, not the ceiling itself.",
          ],
        },
        {
          heading: "Gross or net: picking a basis and staying consistent",
          paragraphs: [
            "The classic rule is stated in gross income, which quietly flatters it: 30% of gross can be 38–40% of take-home after taxes and payroll deductions, depending on your country and bracket. Planning from net income feels more honest because the payslip is what actually arrives — but net-based ratios need to be higher to land in the same place, hence 40% of net as the high-cost-city preset.",
            "The mistake to avoid is switching bases mid-analysis. A rent budget built on 30% of gross, then compared each month against net deposits, produces a permanent phantom shortfall that looks like overspending. Pick one basis, note it, and keep every later check on that basis — the calculator labels gross versus net precisely so the ceiling and your bank statement are talking about the same money.",
            "Landlords add their own screening on top: income multiples of two-and-a-half to three times the monthly rent are common, along with credit checks and references. Those screens are about their risk, not your budget — passing them at a 45% rent-to-income ratio is still a stretched budget, and the DTI figure here makes that visible before you sign.",
          ],
        },
        {
          heading: "Debt-to-income and reading the leftovers",
          paragraphs: [
            "The debt-to-income percentage shown at maximum rent is the same measure lenders use: total monthly obligations over total monthly income. As a rough compass, total DTI around 36% is generally considered comfortable, and climbing toward the mid-40s is where mortgage and lease approvals start to struggle — these are common industry practices, not fixed legal limits, and thresholds differ by country and lender.",
            "Read the leftover budget before the ceiling. Two incomes can produce the same rent-to-income ratio while leaving very different amounts for food, transport and savings — 4,500 income with a 1,350 rent leaves twice what 2,600 income does. The absolute remainder is what catches unplanned expenses; the ratio only normalizes.",
            "Finally, the negative line is a feature: when rent plus debts exceed income, the tool says so instead of smoothing it. That is the honest signal to shrink the ratio preset, look for cheaper rent or pay down a debt first — the calculator runs entirely in your browser and stores nothing, so real income figures are safe to enter.",
          ],
        },
      ],
    },
    zh: {
      name: "租房负担能力计算器",
      tagline:
        "按 30%、33% 或 40% 法则算出你的月收入能承受的房租上限,再减去每月债务和租客保险,看看还剩多少可用于生活,并给出债务收入比。",
      intro: [
        "输入月收入(税前或到手),选择房租收入比——经典的毛收入 30%、稍宽松的 33%,或高成本城市常用的到手 40%——计算器会给出房租上限。再减去其他月度债务还款和租客保险,剩下的才是真正可支配的生活预算。",
        "同时会显示顶格租房时的债务收入比(DTI),这正是房东和贷款机构审批时会看的指标。当房租加债务超过收入时,预算一行会诚实地显示为负数——那是在提醒你找更便宜的房子,而不是硬撑。",
      ],
      steps: [
        "输入月收入,并选择是税前还是到手。",
        "选择房租收入比:30%、33% 或 40%。",
        "如有其他月度债务和租客保险,一并填入。",
        "查看房租上限、剩余预算和债务收入比。",
      ],
      faqs: [
        {
          q: "30% 租房法则是怎么来的?",
          a: "它可追溯到美国 1969 年的 Brooke 修正案:公共住房租金最初封顶为收入的 25%,1981 年上调到 30%。如今 HUD 仍把住房支出超过收入 30% 的家庭称为「成本负担过重」,30% 毛收入因此成了「可负担房租」的通行口径。",
        },
        {
          q: "按税前还是税后收入来规划房租?",
          a: "经典的 30% 法则按税前收入计算,它不考虑税收,看起来比工资条更宽松。如果你习惯按到手收入规划,可以采用更高的比例,比如到手收入的 40%,结果大致相当。关键是选定一种口径并保持一致。",
        },
        {
          q: "这里的债务收入比是什么意思?",
          a: "它表示顶格房租加上你列出的债务和保险合计占收入的比例。贷款机构一般希望总债务收入比低于 36%;超过 43% 左右就很难申请到房贷。数值偏高说明这个房租上限对你的其他负债来说太激进了。",
        },
      ],
      deepDive: [
        {
          heading: "30% 法则的出处——和它忘掉的事",
          paragraphs: [
            "30% 这个基准有明确的立法渊源:美国 1969 年的 Brooke 修正案把公共住房租金封顶在收入的 25%,1981 年上调到 30%。住房管理部门至今仍用这条线来界定“住房成本负担过重”的家庭,随后它逐渐渗入了大众租房建议。知道出身很重要——它当初是一条补贴规则,而不是“一个家庭实际能负担多少”的研究结论。",
            "这条法则围绕二十世纪中期的税前收入和家庭结构设计,对预算的其余部分只字未提:背着学贷和车贷的租客在 30% 时,比没有任何负债却在 35% 的租客更紧张。它也没算预算里弹性最大的那几项——育儿、通勤、医疗,这些的波动远比房租大。",
            "所以本工具提供三档比例而不是一条真理:毛收入 30% 对应经典口径,33% 是适度放宽,40% 到手对应高成本城市——那里按毛收入 30% 可能连一套真实存在的房子都租不到。无论选哪档,之后都要减去债务和保险——真正回答“这笔钱够不够生活”的是剩余预算,而不是上限本身。",
          ],
        },
        {
          heading: "税前还是税后:选一个口径并保持一致",
          paragraphs: [
            "经典法则按税前收入表述,这悄悄美化了它:扣掉个税和工资扣款后,毛收入的 30% 可能相当于到手的 38%–40%,幅度取决于你的国家和税档。按到手收入规划感觉更诚实,因为工资条上的才是真正进账的钱——但基于到手的比例要更高才能落在同一个位置,这就是高成本城市预设定在到手 40% 的原因。",
            "要避免的错误是中途换口径。用“毛收入 30%”做预算,却每个月拿税后到账去核对,会制造一个永远补不上的差额,看起来像超支。选定一个口径,记下来,之后所有核对都用同一口径——计算器特意标出税前/税后,正是为了让上限和你的银行流水说的是同一笔钱。",
            "房东还有自己的筛选:常见的做法是要求月收入的 2.5–3 倍覆盖房租,外加信用记录和推荐人。那些筛选衡量的是房东的风险,不是你的预算——以 45% 的房租收入比通过审查,预算照样是绷紧的,这里的债务收入比会让你在签约之前就看到这一点。",
          ],
        },
        {
          heading: "债务收入比与“剩下的钱”怎么读",
          paragraphs: [
            "顶格租金下显示的债务收入比,和贷款机构用的是同一个口径:每月总负债 ÷ 每月总收入。粗略的指南针是:总债务收入比在 36% 左右通常被认为舒适,攀升到 40% 中段时,房贷和租约审批开始吃力——这些是行业通行做法,不是法定硬线,各国各机构阈值不同。",
            "先看剩余预算,再看上限。两份收入可以给出同样的房租收入比,留给吃饭、交通和储蓄的绝对金额却差得很远——收入 4,500 交 1,350 房租,剩下的钱是收入 2,600 情况下的两倍。绝对余量才是接住意外支出的那一层,比例只是归一化。",
            "最后,负数那一行是特性不是缺陷:房租加债务超过收入时,工具会直说,而不是把数字抹平。这就是诚实的信号——调低比例档、找更便宜的房子,或者先还掉一笔债。计算全程在浏览器本地运行,不存储任何数据,真实收入数字可以放心输入。",
          ],
        },
      ],
    },
    ja: {
      name: "家賃負担計算ツール",
      tagline:
        "月収に対する 30%・33%・40% ルールから支払える家賃の上限を算出し、毎月の借入返済や賃貸保険を差し引いた残りの生活資金と債務比率も確認できます。",
      intro: [
        "月収(額面または手取り)を入力し、家賃の収入比を選びます——定番の額面 30%、やや緩い 33%、物価の高い都市の手取り 40%。計算結果が家賃の上限を示します。さらに毎月のその他の返済額と賃貸保険を差し引くので、表示される数字は実際に暮らせる予算です。",
        "家賃上限いっぱいのときの債務対収入比(DTI)も分かります。これは貸し手が賃貸契約や住宅ローンの審査で見る指標です。家賃と返済の合計が収入を超えると、予算行は正直にマイナスを表示します——それは無理をせず、もっと安い家賃を探す合図です。",
      ],
      steps: [
        "月収と、額面か手取りかを入力します。",
        "家賃の収入比を選びます:30%、33% または 40%。",
        "その他の月間返済額と賃貸保険があれば入力します。",
        "家賃の上限、残りの予算、債務対収入比を確認します。",
      ],
      faqs: [
        {
          q: "30% ルールはどこから来たのですか?",
          a: "米国 1969 年のブルック修正案に由来します。公営住宅の家賃を収入の 25% に制限し、1981 年に 30% に引き上げられました。現在でも HUD は住居に収入の 30% を超える支出をする世帯を「費用負担過重」と呼んでおり、額面の 30% が「支払える家賃」の目安として定着しています。",
        },
        {
          q: "家賃の計算は額面と手取り、どちらが基準にすべきですか?",
          a: "定番の 30% ルールは額面収税ベースで、税金を考慮しないので給料明細より有利に見えます。手取りで計画したいなら、手取りの 40% など高い比率を使うと結果はおよそ同じになります。大切なのは、どちらかの基準に決めて一貫させることです。",
        },
        {
          q: "ここでの債務対収入比(DTI)は何を意味しますか?",
          a: "家賃の上限に示された返済額や保険を合計したものが収入の何%を占めるかです。貸し手は総 DTI をおおむね 36% 以下にすることを好み、43% 前後を超えると住宅ローンの審査が難しくなります。数値が高い場合は、家賃上限が他の返済に対して高すぎるという意味です。",
        },
      ],
      deepDive: [
        {
          heading: "30% ルールの由来——そして忘れていること",
          paragraphs: [
            "30% という基準には明確な立法の来歴があります。米国 1969 年のブルック修正案が公営住宅の家賃を収入の 25% に制限し、1981 年に 30% へ引き上げました。住宅当局は今もこの線で「費用負担過重」世帯を定義しており、そこから一般の家賃アドバイスに広がりました。出自を知ることが重要なのは、この数字が本来は補助金のルールであって、「実際に何が支払えるか」の研究結論ではないからです。",
            "このルールは二十世紀半ばの額面収入と世帯構造を前提に設計され、予算の残りの部分にほぼ触れません。学ローンと車のローンを抱える入居者は負債ゼロで 35% の人より余裕がなく、この単純な比率はそれを区別できません。育児、通勤、医療といった予算の可変部分——家賃より大きく動く部分——も織り込んでいません。",
            "だからこのツールは一つの真理ではなく三段階を用意しています。額面 30% が定番の読み方、33% は控えめな拡張、手取り 40% は物価の高い都市向け——額面 30% では実際の部屋が一つも価格帯に入らない場所で使うためです。どれを選んでも、その後に借入と保険を差し引く。残った生活資金こそ「この金額で暮らせるか」に答える数字で、上限そのものではありません。",
          ],
        },
        {
          heading: "額面か手取りか——基準を決めて一貫させる",
          paragraphs: [
            "定番のルールは額面収入で述べられますが、それは静かに見た目を良くします。税や給与控除の後、額面の 30% は手取りの 38〜40% に相当することがあり、幅は国と所得区分によります。手取りで計画するほうが誠実に感じられます。実際に届くのは給与明細の金額だからです。ただし手取りベースでは同じ場所に着くよう比率を高く取る必要があり、高コスト都市の手取り 40% はその調整です。",
            "避けるべき誤りは途中で基準を変えることです。「額面 30%」で建てた予算を毎月手取りの入金と照合すると、永遠に埋まらない差額が生まれ、それが過剰支出に見えます。基準を一つ決め、記録し、以後の確認はすべて同じ基準で。このツールが額面と手取りを明示するのは、上限と銀行明細が同じお金について語るようにするためです。",
            "貸し手はさらに独自の選別を重ねます。月収の 2.5〜3 倍で家賃を覆うこと、信用情報、保証人。それらは貸し手側のリスクの話で、あなたの予算の話ではありません。家賃収入比 45% でも審査に通ることはありますが、予算はそれでも苦しく、ここの DTI が契約前にそれを見せてくれます。",
          ],
        },
        {
          heading: "DTI と残りの資金の読み方",
          paragraphs: [
            "家賃上限いっぱいのときに表示される債務対収入比は、貸し手が使うのと同じ指標です。月々の支払総合計 ÷ 月収。大まかな目安として、総 DTI が 36% 前後なら一般的に余裕があるとされ、40% 台半ばへ近づくとローンや賃貸審査が苦しくなります。これは業界の慣行であって法定の硬い上限ではなく、国や貸し手で閾値は違います。",
            "上限の前に残りの資金を読んでください。同じ家賃収入比でも、食費・交通・貯蓄に回せる絶対額は大きく違います。収入 4,500 で家賃 1,350 なら、収入 2,600 の場合の 2 倍が残ります。突然の出費を受け止めるのは絶対額の層で、比率は正規化にすぎません。",
            "最後に、マイナス表示は欠陥ではなく機能です。家賃と返済の合計が収入を超えるとき、このツールは数字をならすのではなくその旨を表示します。それが比率段階を下げる、もっと安い家を探す、先に一つ返済するという誠実な合図です。計算はブラウザ内で完結し、何も保存しないので、実際の収入を入力しても安全です。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de alquiler asumible",
      tagline:
        "Descubra el alquiler máximo que su ingreso mensual puede asumir con la regla del 30%, 33% o 40% — y vea qué queda cada mes tras sus deudas y el seguro de inquilino.",
      intro: [
        "Introduzca su ingreso mensual (bruto o neto), elija un ratio de alquiler sobre ingreso — el clásico 30% del bruto, un 33% más flexible o el 40% del neto para ciudades caras — y la calculadora fija su techo de alquiler. Después se restan otras deudas mensuales y el seguro de inquilino, para que la cifra que ve sea realmente vivible.",
        "También obtiene el porcentaje de deuda sobre ingreso que cargaría con ese alquiler máximo, justo lo que miran los prestamistas antes de aprobar un alquiler o una hipoteca. La línea de presupuesto se vuelve negativa con honestidad cuando el alquiler más las deudas superan su ingreso — una señal para buscar algo más barato, no para estirarse.",
      ],
      steps: [
        "Introduzca su ingreso mensual e indique si es bruto o neto.",
        "Elija el ratio de alquiler sobre ingreso: 30%, 33% o 40%.",
        "Añada otras deudas mensuales y el seguro de inquilino, si los hay.",
        "Lea el techo de alquiler, el presupuesto restante y su ratio de endeudamiento.",
      ],
      faqs: [
        {
          q: "¿De dónde viene la regla del 30% para el alquiler?",
          a: "Se remonta a la Enmienda Brooke de 1969 en EE. UU., que limitó el alquiler de la vivienda pública al 25% del ingreso y lo subió al 30% en 1981. HUD sigue llamando 'cargados por costes' a los hogares que gastan más del 30% en vivienda, y por eso el 30% del ingreso bruto se quedó como sinónimo de alquiler asequible.",
        },
        {
          q: "¿Presupuesto el alquiler sobre el bruto o el neto?",
          a: "La regla clásica del 30% se aplica al ingreso bruto, así que ignora los impuestos y parece más generosa que su nómina. Si prefiere planificar con el sueldo neto, usar un ratio mayor como el 40% del neto lleva más o menos al mismo sitio. Lo importante es elegir una base y mantenerla.",
        },
        {
          q: "¿Qué significa aquí el porcentaje de deuda sobre ingreso?",
          a: "Es la parte de su ingreso que consumirían el alquiler máximo más sus deudas y seguro declarados. A los prestamistas suele gustarles una deuda total por debajo del 36%; por encima del 43% es difícil lograr una hipoteca. Una cifra alta significa que el techo de alquiler es demasiado agresivo para sus otras obligaciones.",
        },
      ],
      deepDive: [
        {
          heading: "De dónde sale la regla del 30% — y qué olvida",
          paragraphs: [
            "El benchmark del 30% tiene un origen legislativo estadounidense: la Enmienda Brooke de 1969 fijó el alquiler de la vivienda pública en el 25% del ingreso, y el techo se elevó al 30% en 1981. Las agencias de vivienda siguen usando esa línea para definir hogares «sobrecargados por costes», y de ahí se filtró al consejo general sobre alquiler. Conocer la procedencia importa porque el número era una regla de subsidios, no un hallazgo sobre lo que una familia puede pagar de verdad.",
            "La regla se diseñó en torno a ingresos brutos y estructuras familiares de mediados del siglo XX, y no dice nada del resto del presupuesto: un inquilino con préstamos estudiantiles y un coche a pagar llega más apurado al 30% que otro sin deudas al 35%. Tampoco contempla las líneas más flexibles del presupuesto — cuidado de niños, transporte, gastos médicos — que varían mucho más que el alquiler.",
            "Por eso esta calculadora ofrece tres presets en vez de una sola verdad: 30% del bruto para la lectura clásica, 33% para un estiramiento moderado, y 40% del neto para ciudades caras, donde el 30% del bruto puede no alcanzar ningún piso real. Sea cual sea el preset, reste después las deudas y el seguro — el presupuesto restante es la cifra que responde «¿puedo vivir con esto?», no el techo.",
          ],
        },
        {
          heading: "Bruto o neto: elegir una base y mantenerla",
          paragraphs: [
            "La regla clásica se enuncia sobre ingreso bruto, lo que la adorna en silencio: el 30% del bruto puede ser el 38–40% del neto tras impuestos y deducciones de nómina, según país y tramo. Planificar desde el neto se siente más honesto porque la nómina es lo que de verdad llega — pero los ratios sobre el neto tienen que ser más altos para caer en el mismo sitio; de ahí el 40% del neto como preset para ciudades caras.",
            "El error a evitar es cambiar de base a mitad del análisis. Un presupuesto construido al 30% del bruto y comparado cada mes contra ingresos netos produce un déficit fantasma permanente que parece gasto excesivo. Elija una base, anótela y haga todas las comprobaciones posteriores sobre ella — la calculadora distingue bruto de neto precisamente para que el techo y el extracto bancario hablen del mismo dinero.",
            "Los caseros añaden su propio filtro encima: múltiplos de ingreso de dos veces y media a tres veces el alquiler mensual son habituales, junto con historial de crédito y referencias. Esos filtros hablan de su riesgo, no de su presupuesto — pasar el filtro con un 45% de alquiler sobre ingreso sigue siendo un presupuesto ajustado, y la cifra de DTI aquí lo hace visible antes de firmar.",
          ],
        },
        {
          heading: "DTI y cómo leer lo que queda",
          paragraphs: [
            "El porcentaje de deuda sobre ingreso mostrado al alquiler máximo es la misma medida que usan los prestamistas: obligaciones mensuales totales sobre ingreso mensual total. Como brújula aproximada, un DTI total en torno al 36% se considera cómodo, y al acercarse a la mitad de los 40 las aprobaciones de hipoteca y alquiler empiezan a costar — son prácticas habituales del sector, no límites legales fijos, y los umbrales cambian según país y entidad.",
            "Lea el presupuesto restante antes que el techo. Dos ingresos pueden dar el mismo ratio de alquiler y dejar cantidades muy distintas para comida, transporte y ahorro — con 4.500 de ingreso y 1.350 de alquiler queda el doble que con 2.600. El resto absoluto es lo que absorbe los gastos imprevistos; el ratio solo normaliza.",
            "Por último, la línea negativa es una función: cuando alquiler más deudas superan el ingreso, la herramienta lo dice en vez de suavizarlo. Esa es la señal honesta para bajar el preset, buscar alquiler más barato o pagar una deuda primero — la calculadora corre en su navegador y no guarda nada, así que puede introducir cifras reales de ingreso.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de aluguel acessível",
      tagline:
        "Descubra o aluguel máximo que sua renda mensal suporta pela regra dos 30%, 33% ou 40% — e veja o que sobra todo mês após dívidas e o seguro residencial.",
      intro: [
        "Informe sua renda mensal (bruta ou líquida), escolha uma relação aluguel-renda — os clássicos 30% do bruto, uns 33% mais folgados ou 40% do líquido para cidades caras — e a calculadora traça seu teto de aluguel. Outras dívidas mensais e o seguro residencial são então descontados, para que o número que você vê seja de fato vivível.",
        "Você também recebe a porcentagem de dívida sobre renda que teria com esse aluguel máximo — exatamente o que credores analisam antes de aprovar um contrato ou financiamento. A linha do orçamento fica negativa com honestidade quando aluguel mais dívidas passam da sua renda — um sinal para procurar um aluguel mais barato, não para se apertar.",
      ],
      steps: [
        "Informe sua renda mensal e se ela é bruta ou líquida.",
        "Escolha a relação aluguel-renda: 30%, 33% ou 40%.",
        "Adicione outras dívidas mensais e o seguro residencial, se houver.",
        "Veja o teto de aluguel, o orçamento restante e sua relação dívida-renda.",
      ],
      faqs: [
        {
          q: "De onde vem a regra dos 30% para o aluguel?",
          a: "Ela vem da Emenda Brooke de 1969, nos EUA, que limitou o aluguel de moradia pública a 25% da renda e o elevou a 30% em 1981. O HUD ainda chama de 'sobrecarregados por custo' os lares que gastam mais de 30% da renda com moradia, e foi por isso que os 30% da renda bruta viraram o sinônimo de aluguel acessível.",
        },
        {
          q: "Devo planejar o aluguel pela renda bruta ou líquida?",
          a: "A regra clássica dos 30% vale para a renda bruta, então ignora impostos e parece mais generosa que o contracheque. Se você prefere planejar pelo salário líquido, use um percentual maior como 40% do líquido, que chega aproximadamente ao mesmo lugar. O que importa é escolher uma base e mantê-la.",
        },
        {
          q: "O que significa a porcentagem de dívida sobre renda aqui?",
          a: "É a fatia da sua renda que iria para o aluguel máximo mais as dívidas e o seguro informados. Credores em geral preferem uma dívida total abaixo de 36%; acima de uns 43% fica difícil aprovar um financiamento. Um número alto indica que o teto de aluguel é agressivo demais para suas outras obrigações.",
        },
      ],
      deepDive: [
        {
          heading: "De onde vem a regra dos 30% — e o que ela esquece",
          paragraphs: [
            "A referência dos 30% tem origem legislativa americana: a Emenda Brooke de 1969 limitou o aluguel de moradia pública a 25% da renda, e o teto subiu para 30% em 1981. Agências de moradia ainda usam essa linha para definir lares «sobrecarregados por custo», e daí ela vazou para o conselho genérico de aluguel. Saber a procedência importa porque o número era uma regra de subsídio, não uma descoberta sobre o que uma família realmente consegue pagar.",
            "A regra foi desenhada em torno de rendas brutas e estruturas familiares de meados do século XX, e não diz nada do resto do orçamento: um inquilino com dívida estudantil e financiamento de carro no 30% está mais apertado que outro sem dívidas no 35%. Ela também ignora as linhas mais flexíveis do orçamento — creche, transporte, saúde — que variam bem mais que o aluguel.",
            "É por isso que esta calculadora oferece três presets em vez de uma verdade só: 30% do bruto para a leitura clássica, 33% para uma folga moderada, e 40% do líquido para cidades caras, onde 30% do bruto pode não alcançar nenhum apartamento de verdade. Escolha o preset que escolher, depois desconte dívidas e seguro — o orçamento restante é o número que responde «dá para viver com isso?», não o teto.",
          ],
        },
        {
          heading: "Bruto ou líquido: escolher uma base e mantê-la",
          paragraphs: [
            "A regra clássica é enunciada pela renda bruta, o que a embeleza em silêncio: 30% do bruto pode ser 38–40% do líquido depois de impostos e descontos em folha, dependendo do país e da faixa. Planejar pelo líquido parece mais honesto porque o contracheque é o que de fato chega — mas índices sobre o líquido precisam ser mais altos para cair no mesmo lugar; daí o 40% do líquido como preset das cidades caras.",
            "O erro a evitar é trocar de base no meio da análise. Um orçamento construído a 30% do bruto e conferido todo mês contra depósitos líquidos cria um déficit fantasma permanente que parece gasto exagerado. Escolha uma base, anote e faça todas as conferências seguintes nela — a calculadora distingue bruto de líquido justamente para que o teto e o extrato do banco falem do mesmo dinheiro.",
            "Os senhorios acrescentam sua própria triagem: múltiplos de renda de duas vezes e meia a três vezes o aluguel mensal são comuns, junto com histórico de crédito e referências. Esses filtros falam do risco deles, não do seu orçamento — passar na triagem com 45% de aluguel sobre renda ainda é um orçamento esticado, e o índice de dívida-renda aqui torna isso visível antes de assinar.",
          ],
        },
        {
          heading: "Dívida-renda e como ler o que sobra",
          paragraphs: [
            "A porcentagem de dívida sobre renda mostrada no aluguel máximo é a mesma medida que os credores usam: obrigações mensais totais sobre renda mensal total. Como bússola aproximada, uma dívida total em torno de 36% costuma ser considerada confortável, e ao se aproximar da metade dos 40 as aprovações de financiamento e aluguel começam a travar — são práticas comuns do setor, não limites legais fixos, e os limiares variam por país e instituição.",
            "Leia o orçamento restante antes do teto. Duas rendas podem dar o mesmo índice de aluguel e deixar quantias muito diferentes para comida, transporte e poupança — com renda de 4.500 e aluguel de 1.350, sobra o dobro de uma renda de 2.600. O resto absoluto é o que absorve gastos imprevistos; o índice só normaliza.",
            "Por fim, a linha negativa é um recurso: quando aluguel mais dívidas passam da renda, a ferramenta diz isso em vez de suavizar. Esse é o sinal honesto para baixar o preset, procurar aluguel mais barato ou quitar uma dívida primeiro — a calculadora roda no seu navegador e não guarda nada, então cifras reais de renda podem ser digitadas sem medo.",
          ],
        },
      ],
    },
  },
});
