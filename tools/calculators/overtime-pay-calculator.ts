import { CalcEngineOvertime } from "../_engines/calc-engine-overtime";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "overtime-pay-calculator",
  category: "utility",
  icon: "clock",
  engine: { component: CalcEngineOvertime },
  related: ["salary-to-hourly", "hourly-to-salary", "break-even-calculator", "compound-interest-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Overtime Pay Calculator",
      tagline:
        "Work out overtime pay at 1.5× or 2× your hourly rate — regular pay, the overtime premium, your weekly total and an annualized figure from a salary.",
      intro: [
        "Enter an hourly rate — or an annual salary that the calculator converts into one using your regular weekly hours — then add the overtime hours you expect to work. The results separate regular pay from the overtime premium: time and a half by default, double time if your contract or local rules pay it.",
        "Everything updates live: the boosted overtime rate, the week's regular and overtime pay, the combined weekly total, and the annualized figure once you multiply by the weeks per year you actually work. It mirrors how the US Fair Labor Standards Act (FLSA) computes overtime for non-exempt employees.",
        "Under the FLSA, non-exempt employees earn at least 1.5× their regular rate for hours past 40 in a workweek; the regular rate must include most nondiscretionary bonuses, and state laws such as California's add daily overtime past 8 hours and double time past 12. The calculator applies the multiplier you choose to the hours you enter.",
        "Compared with a payslip's opaque totals, the split between regular and overtime pay shows exactly what the premium is worth — and what a denied hour of overtime costs you. Whether a role is exempt depends on duties and salary level, not job title. If your paychecks disagree with this math, raise it with your employer or your state labor department.",
      ],
      steps: [
        "Enter your hourly rate, or switch to salary mode and type your annual pay.",
        "Set your regular hours per week (40 by default) and weeks per year.",
        "Add the overtime hours and pick the multiplier — 1.5× or 2×.",
        "Read the overtime rate, weekly split and the annualized total.",
      ],
      faqs: [
        {
          q: "When is overtime pay required in the US?",
          a: "Under the FLSA, non-exempt employees must earn at least 1.5 times their regular rate for every hour worked beyond 40 in a work week. Exemption depends on duties and salary level; some states go further, for example California also triggers daily overtime past 8 hours. A 25.00 hourly rate earns 37.50 for each overtime hour.",
        },
        {
          q: "How does salary mode turn my salary into an hourly rate?",
          a: "It divides the annual salary by regular hours per week × weeks per year — the same baseline as the salary-to-hourly conversion. A 52,000 salary over 40-hour weeks and 52 weeks is exactly 25.00 per hour, so five overtime hours at 1.5× add 187.50 on top of the 1,000.00 regular week.",
        },
        {
          q: "Is my whole salary used for the overtime rate?",
          a: "The FLSA computes overtime on the 'regular rate', which can include more than your base wage — shift differentials and non-discretionary bonuses are examples. This calculator uses a straight base rate, so if you receive those extras your legal overtime rate may be higher than the one shown here.",
        },
      ],
      deepDive: [
        {
          heading: "Where the 1.5× multiplier comes from — and where it varies",
          paragraphs: [
            "The time-and-a-half convention is most codified in the US Fair Labor Standards Act, which requires at least 1.5 times the regular rate for non-exempt employees past 40 hours in a workweek. Many other countries regulate overtime differently — some set a general cap on weekly hours with premiums negotiated by sector or contract, others rely mostly on agreement between employer and employee.",
            "That is why this calculator lets you pick the multiplier instead of hard-coding one: 1.5× is the common default, but double time exists in some US states for holidays or long daily shifts, and collective agreements elsewhere set premiums anywhere from 1.25× upward. Treat the calculator's output as a model of your contract's terms, not a statement of what any law guarantees.",
            "The conservative reading: check what your employment contract, your sector's agreement or your local labor authority actually says about hours past the standard workweek, then enter the multiplier and threshold that match. The math itself — rate × multiplier × hours — never changes; only the inputs do.",
          ],
        },
        {
          heading: "The regular rate trap: what counts as your base",
          paragraphs: [
            "The most common error in estimating overtime pay is using too low a base. Under rules like the FLSA's, overtime is owed on the “regular rate” — a blended average that must include most nondiscretionary bonuses, shift differentials and commissions, not just the base wage. An employee whose true regular rate is 27.00 but who computes overtime from a 25.00 base loses money on every overtime hour.",
            "This calculator deliberately uses a straight base rate you enter, which keeps the model transparent: you see exactly rate × multiplier × hours, with nothing added or hidden. If your pay includes extras that legally belong in the regular rate, your actual entitlement is higher than shown — enter a manually averaged rate to approximate it.",
            "For salaried employees, the base must first be derived: the annual salary divided by regular hours per week times weeks per year, which is what salary mode here does. The result is only as accurate as the schedule you enter — a salaried person who genuinely works 45 hours a week has a lower derived hourly rate, and a different overtime picture, than the nominal 40-hour schedule suggests.",
          ],
        },
        {
          heading: "Reading the split and planning with it",
          paragraphs: [
            "The weekly split — regular pay versus the overtime premium — is the number worth watching, not the total. The premium line is pure marginal income: it shows what each extra hour is actually worth at the margin, and by symmetry what each denied or unpaid overtime hour costs you. A five-hour week at 1.5× on a 25.00 rate adds 187.50 of premium — visible, negotiable, worth tracking.",
            "The annualized figure multiplies the weekly total by the weeks per year you work. Read it as a ceiling, not a promise: overtime is rarely guaranteed every week, so a realistic range uses your typical weeks of overtime rather than 52. Budgeting from a full-year overtime projection is how people end up short when the extra hours dry up.",
            "Everything runs locally in your browser and nothing is stored or sent — useful when testing numbers before a pay conversation. Bring the split, not just the total: “my regular week is 1,000.00 and the five hours you asked me to add are worth 187.50 at time and a half” is a clearer ask than any lump figure.",
          ],
        },
      ],
    },
    zh: {
      name: "加班费计算器",
      tagline:
        "按时薪的 1.5 倍或 2 倍算加班费:常规工资、加班溢价、每周合计与年化收入一目了然,也支持年薪按工时折算成时薪后计算。",
      intro: [
        "输入时薪,或输入年薪由计算器按你每周的常规工时折算,再填上预计加班的小时数。结果会把常规工资和加班溢价分开:默认 1.5 倍,如果合同或当地规则按双倍支付,也可以选 2 倍。",
        "所有数字实时更新:加班后的时薪、当周的常规工资与加班费、每周总收入,以及乘以每年工作周数后的年化收入。口径与美国《公平劳动标准法》(FLSA)对非豁免员工的加班计算一致。",
      ],
      steps: [
        "输入时薪,或切换到年薪模式填写年薪。",
        "设置每周常规工时(默认 40)和每年工作周数。",
        "填入加班小时数,并选择倍率——1.5 倍或 2 倍。",
        "查看加班时薪、每周拆分和年化总额。",
      ],
      faqs: [
        {
          q: "美国什么时候必须支付加班费?",
          a: "根据 FLSA,非豁免员工每周工作超过 40 小时的部分,加班时薪不得低于常规时薪的 1.5 倍。是否豁免取决于岗位职责和薪资水平;部分州更严格,例如加州每天超过 8 小时也要算加班。时薪 25.00 的员工,每个加班小时至少挣 37.50。",
        },
        {
          q: "年薪模式下时薪是怎么折算的?",
          a: "时薪 = 年薪 ÷(每周常规工时 × 每年周数),与年薪转时薪的基准一致。年薪 52,000 按每周 40 小时、52 周折算正好是 25.00,因此 5 个 1.5 倍的加班小时会在 1,000.00 的常规周薪之上再加 187.50。",
        },
        {
          q: "加班时薪是按全部工资算吗?",
          a: "FLSA 的加班基数是「常规时薪」,范围可能超出基本工资——比如班次津贴和非自由裁量的奖金都要计入。本计算器只用基本时薪,如果你有这类补贴,法定加班时薪可能比这里显示的更高。",
        },
      ],
      deepDive: [
        {
          heading: "1.5 倍从哪来——各地又怎么不同",
          paragraphs: [
            "“一点五倍”最成文的地方是美国《公平劳动标准法》(FLSA):非豁免员工每周超过 40 小时的部分,加班时薪不得低于常规时薪的 1.5 倍。许多其他地区的规定方式不同——有的对每周总工时设上限,加班费由行业协议或合同约定;有的主要靠劳资双方自行协商。",
            "所以本计算器让你自选倍率而不是写死:1.5 倍是常见默认值,但美国部分州对节假日或超长日班有双倍的规定,其他地方的集体协议里溢价可能从 1.25 倍起跳。把计算结果当作“按你的合同条款建模”,而不是对任何法律的背书。",
            "保守的用法是:先查你的劳动合同、行业协议或当地劳动部门对超过标准工时部分的实际说法,再按匹配的倍率和门槛填入。数学本身——时薪 × 倍率 × 小时数——从不改变,变的只是输入。",
          ],
        },
        {
          heading: "“常规时薪”的坑:基数里该算什么",
          paragraphs: [
            "估算加班费最常见的错误是基数偏低。按 FLSA 一类规则,加班费要按“常规时薪”计算——这是一个混合平均值,必须计入多数非自由裁量的奖金、班次津贴和提成,而不只是基本工资。真实常规时薪 27.00 的员工若按 25.00 的基数算加班,每个加班小时都在亏钱。",
            "本计算器刻意只用你输入的基本时薪,让模型保持透明:你看到的正是时薪 × 倍率 × 小时数,没有加也没有藏。如果你的工资里包含依法应计入常规时薪的补贴,你实际应得的加班费会高于显示值——手工算一个平均时薪填进去即可近似。",
            "年薪族先要折算基数:年薪 ÷ 每周常规工时 ÷ 每年周数,这正是这里年薪模式做的事。结果只取决于你填的作息——真实每周干 45 小时的正式员工,折算时薪会更低,加班图景也与名义 40 小时的安排完全不同。",
          ],
        },
        {
          heading: "怎么读拆分、怎么用它",
          paragraphs: [
            "每周拆分里值得盯的不是总额,而是加班溢价那一行。溢价是纯粹的边际收入:它显示每多干一小时实际值多少,对称地也显示被拒掉或没付的每个加班小时让你损失多少。时薪 25.00、每周 5 个 1.5 倍加班小时,溢价是 187.50——看得见、可谈判、值得记录。",
            "年化数字是每周合计乘以你每年工作的周数。把它读成上限而不是承诺:加班很少每周都有保证,现实的区间应该用你典型的加班周数而不是 52。按“全年都加班”做预算,正是加班小时一停就手头紧的原因。",
            "一切都在浏览器本地运行,不存储不上传——在谈薪之前试数字很有用。谈判时带拆分而不是只带总额:“我常规一周是 1,000.00,你们让我加的 5 个小时按 1.5 倍值 187.50”,比任何笼统数字都更清楚。",
          ],
        },
      ],
    },
    ja: {
      name: "残業代計算ツール",
      tagline:
        "時給の 1.5 倍・2 倍で残業代を算出。通常給与と割増賃金を分けて、週の合計と年換算まで表示します。年収を勤務時間から時給に換算するモードにも対応。",
      intro: [
        "時給を入力するか、年収を通常の週労働時間から時給に換算して、予定している残業時間を追加します。結果は通常給与と割増賃金に分けて表示され、既定は 1.5 倍、契約や地域のルールで倍額が払われる場合は 2 倍も選べます。",
        "割増後の残業時給、週の通常給与と残業代、週の合計、年間勤務週数を掛けた年換算収入がリアルタイムに更新されます。米国公正労働基準法(FLSA)の非免除従業員向けの残業計算と同じ考え方です。",
      ],
      steps: [
        "時給を入力するか、年収モードに切り替えて年収を入力します。",
        "週の通常労働時間(既定 40)と年間週数を設定します。",
        "残業時間を入力し、倍率(1.5 倍または 2 倍)を選びます。",
        "残業時給・週ごとの内訳・年換算の合計を確認します。",
      ],
      faqs: [
        {
          q: "アメリカで残業代の支払い義務があるのはいつですか?",
          a: "FLSA では、非免除従業員が週 40 時間を超えて働いた分に、通常時給の 1.5 倍以上を支払う義務があります。免除されるかは職務内容と給与水準によります。さらに厳しい州もあり、たとえばカリフォルニアでは 1 日 8 時間超でも残業扱いになります。時給 25.00 なら残業 1 時間あたり 37.50 以上です。",
        },
        {
          q: "年収モードで時給はどのように計算しますか?",
          a: "時給 = 年収 ÷(通常の週労働時間 × 年間週数)で、年収から時給への換算と同じ基準です。年収 52,000 を週 40 時間 × 52 週で割るとちょうど 25.00 になり、1.5 倍の残業 5 時間で通常週給 1,000.00 に 187.50 が上乗せされます。",
        },
        {
          q: "残業時給の計算には給与の全額が使われますか?",
          a: "FLSA の残業計算は「通常レート」が対象で、基本給だけでなくシフト手当や業績賞与なども含む場合があります。このツールは基本の時給だけで計算するので、そうした手当がある方は法定の残業レートが表示値より高くなる可能性があります。",
        },
      ],
      deepDive: [
        {
          heading: "1.5 倍はどこから来て、どこで違うか",
          paragraphs: [
            "「時間と半分」の慣行が最も成文化されているのは米国の公正労働基準法(FLSA)です。非免除従業員の週 40 時間超に対し、通常レートの 1.5 倍以上を義務付けます。他の多くの国・地域は異なる仕組みで、週の総労働時間に上限を設けて割増を産業別協約や契約に委ねたり、労使の合意に主に頼ったりします。",
            "だからこのツールは倍率を固定せず選べるようにしています。1.5 倍は一般的な既定値ですが、米国の一部の州には祝日や長い日勤シフトで 2 倍とする規定があり、別の地域の労働協約では 1.25 倍以上の幅で割増が決まります。計算結果は「あなたの契約条件のモデル」であり、どの法律が保証するかの説明ではありません。",
            "保守的な使い方はこうです。雇用契約、業界の協約、現地の労働当局が標準労働時間を超える部分に実際何を言っているかを確認し、それに合う倍率と閾値を入力する。計算そのもの——時給 × 倍率 × 時間——は決して変わらず、変わるのは入力だけです。",
          ],
        },
        {
          heading: "「通常レート」の落とし穴:何を基数にするか",
          paragraphs: [
            "残業代の見積もりで最も多い誤りは、基数を低く取りすぎることです。FLSA 型の規則では、残業は「通常レート」——ほとんどの業績賞与、シフト手当、歩合を含んだ混合平均——に対して支払われます。実質の通常レートが 27.00 の人が 25.00 を基数に計算すれば、残業 1 時間ごとに損をします。",
            "このツールは意図的に入力した基本時給だけを使い、モデルを透明に保ちます。見えるのは純粋に時給 × 倍率 × 時間で、加えるものも隠すものもありません。法的に通常レートに含まれる手当があるなら実際の受取額は表示より高くなります。手動で平均レートを算して入力すれば近似できます。",
            "年収の人はまず基数を導く必要があります。年収 ÷ 週の通常労働時間 ÷ 年間週数——ここでの年収モードがやることです。正確さは入力した勤務条件次第で、実際に週 45 時間働く人は名目 40 時間の想定より導出時給が低く、残業の見通しも変わります。",
          ],
        },
        {
          heading: "内訳の読み方と使いどころ",
          paragraphs: [
            "週ごとの内訳で見るべきは合計ではなく割増賃金の行です。割増は純粋な限界収入です。1 時間延長するのが実はいくら worth かを示し、裏返せば拒まれたり未払いだったりする 1 時間の損失を示します。時給 25.00 で 1.5 倍の残業週 5 時間なら割増は 187.50。可視化でき、交渉でき、記録する価値があります。",
            "年換算は週の合計に実際の年間勤務週数を掛けたものです。これは約束ではなく上限として読んでください。残業は毎週保証されるものはまれで、現実的な幅は 52 週ではなく典型的な残業週数を使います。全年残業の予測で予算を立てると、残業が減った途端に苦しくなるのはそのためです。",
            "すべてブラウザ内で動き、保存も送信もしません。給与の話し合いの前に数字を試すのに役立ちます。持っていくのは合計ではなく内訳です。「通常週は 1,000.00、依頼された 5 時間は 1.5 倍で 187.50」という主張は、どんな一括数字よりも明確です。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de horas extra",
      tagline:
        "Calcule el pago de horas extra al 1,5× o 2× de su tarifa horaria — paga regular, el plus de horas extra, su total semanal y una cifra anualizada desde el salario.",
      intro: [
        "Introduzca una tarifa por hora — o un salario anual que la calculadora convierte usando sus horas semanales regulares — y añada las horas extra que espera trabajar. Los resultados separan la paga regular del plus de horas extra: hora y media por defecto, o tiempo doble si su contrato o las normas locales lo pagan.",
        "Todo se actualiza en vivo: la tarifa de horas extra elevada, la paga regular y extra de la semana, el total semanal combinado y la cifra anualizada al multiplicar por las semanas que trabaja al año. Refleja cómo la Fair Labor Standards Act (FLSA) de EE. UU. calcula las horas extra del personal no exento.",
      ],
      steps: [
        "Escriba su tarifa por hora, o pase al modo salario e indique su paga anual.",
        "Fije sus horas regulares por semana (40 por defecto) y las semanas por año.",
        "Añada las horas extra y elija el multiplicador — 1,5× o 2×.",
        "Lea la tarifa de horas extra, el desglose semanal y el total anualizado.",
      ],
      faqs: [
        {
          q: "¿Cuándo se deben pagar horas extra en EE. UU.?",
          a: "Según la FLSA, los empleados no exentos deben cobrar al menos 1,5 veces su tarifa regular por cada hora que exceda las 40 de la semana laboral. La exención depende de las funciones y el nivel salarial; algunos estados van más lejos, como California, que también activa horas extra diarias pasadas las 8 horas. Con una tarifa de 25,00, cada hora extra paga al menos 37,50.",
        },
        {
          q: "¿Cómo convierte el modo salario en tarifa horaria?",
          a: "Divide el salario anual entre horas regulares por semana × semanas por año, la misma base que la conversión de salario a hora. Un salario de 52.000 con semanas de 40 horas y 52 semanas es exactamente 25,00 por hora, así que cinco horas extra al 1,5× añaden 187,50 sobre la semana regular de 1.000,00.",
        },
        {
          q: "¿Se usa todo el salario para la tarifa de horas extra?",
          a: "La FLSA calcula las horas extra sobre la «tarifa regular», que puede incluir más que el salario base: por ejemplo, los diferenciales por turno y las primas discrecionales no exentas. Esta calculadora usa solo la tarifa base, así que si recibe esos extras su tarifa legal de horas extra puede ser mayor que la que aquí se muestra.",
        },
      ],
      deepDive: [
        {
          heading: "De dónde sale el 1,5× — y dónde varía",
          paragraphs: [
            "La convención de hora y media está más codificada en la Fair Labor Standards Act de EE. UU., que exige al menos 1,5 veces la tarifa regular al personal no exento que pasa de 40 horas en una semana laboral. Muchos otros países regulan las horas extra de otra forma: unos ponen un tope general de horas semanales con primas negociadas por sector o contrato, otros dependen sobre todo del acuerdo entre empresa y trabajador.",
            "Por eso esta calculadora deja elegir el multiplicador en vez de fijarlo: 1,5× es el valor por defecto habitual, pero el tiempo doble existe en algunos estados de EE. UU. para festivos o jornadas diarias largas, y convenios colectivos de otros países fijan primas desde 1,25× hacia arriba. Trate la salida como un modelo de los términos de su contrato, no como una declaración de lo que garantiza alguna ley.",
            "La lectura conservadora: consulte lo que digan realmente su contrato, el convenio de su sector o su autoridad laboral sobre las horas que pasan de la semana estándar, e introduzca el multiplicador y el umbral que coincidan. Las matemáticas — tarifa × multiplicador × horas — nunca cambian; solo las entradas.",
          ],
        },
        {
          heading: "La trampa de la tarifa regular: qué entra en la base",
          paragraphs: [
            "El error más común al estimar horas extra es usar una base demasiado baja. Bajo reglas como las de la FLSA, las horas extra se deben sobre la «tarifa regular» — un promedio mezclado que debe incluir la mayoría de las primas no discrecionales, los diferenciales por turno y las comisiones, no solo el salario base. Un empleado cuya tarifa regular real es 27,00 pero calcula desde una base de 25,00 pierde dinero en cada hora extra.",
            "Esta calculadora usa deliberadamente una tarifa base directa que usted introduce, lo que mantiene el modelo transparente: se ve exactamente tarifa × multiplicador × horas, sin nada añadido ni oculto. Si su paga incluye extras que legalmente pertenecen a la tarifa regular, su derecho real es mayor que lo mostrado — introduzca a mano una tarifa promediada para aproximarlo.",
            "Para empleados asalariados, primero hay que derivar la base: el salario anual dividido por las horas regulares semanales y las semanas por año, que es lo que hace aquí el modo salario. El resultado es tan preciso como el horario que introduzca — un asalariado que realmente trabaja 45 horas semanales tiene una tarifa derivada menor, y un panorama de horas extra distinto, al que sugiere el horario nominal de 40.",
          ],
        },
        {
          heading: "Leer el desglose y planificar con él",
          paragraphs: [
            "En el desglose semanal — paga regular frente al plus de horas extra — la línea que importa no es el total sino el plus. La prima es ingreso marginal puro: muestra lo que cada hora extra vale realmente en el margen y, por simetría, lo que cuesta cada hora extra negada o no pagada. Cinco horas semanales a 1,5× con una tarifa de 25,00 añaden 187,50 de prima — visible, negociable, digno de seguimiento.",
            "La cifra anualizada multiplica el total semanal por las semanas que trabaja al año. Léala como techo, no como promesa: las horas extra rara vez están garantizadas cada semana, así que un rango realista usa sus semanas típicas de horas extra en vez de 52. Presupuestar desde una proyección de año completo con horas extra es cómo se acaba corto cuando esas horas se secan.",
            "Todo corre localmente en su navegador y nada se guarda ni se envía — útil para probar cifras antes de una conversación salarial. Lleve el desglose, no solo el total: «mi semana regular es 1.000,00 y las cinco horas que me pidió valen 187,50 a hora y media» es una petición más clara que cualquier cifra global.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de horas extras",
      tagline:
        "Calcule o pagamento de horas extras a 1,5× ou 2× do seu valor por hora — pagamento regular, o adicional de horas extras, o total semanal e um valor anualizado pelo salário.",
      intro: [
        "Informe um valor por hora — ou um salário anual que a calculadora converte usando suas horas semanais regulares — e adicione as horas extras que você espera fazer. Os resultados separam o pagamento regular do adicional de horas extras: hora e meia por padrão, ou o dobro se o contrato ou as regras locais pagarem assim.",
        "Tudo atualiza ao vivo: o valor da hora extra majorado, o pagamento semanal regular e extra, o total semanal somado e o valor anualizado ao multiplicar pelas semanas trabalhadas no ano. Espelha como a Fair Labor Standards Act (FLSA) dos EUA calcula horas extras para empregados não isentos.",
      ],
      steps: [
        "Digite o valor por hora, ou mude para o modo salário e informe o pagamento anual.",
        "Defina as horas regulares por semana (40 por padrão) e as semanas por ano.",
        "Adicione as horas extras e escolha o multiplicador — 1,5× ou 2×.",
        "Veja o valor da hora extra, a divisão semanal e o total anualizado.",
      ],
      faqs: [
        {
          q: "Quando o pagamento de horas extras é obrigatório nos EUA?",
          a: "Pela FLSA, empregados não isentos devem receber pelo menos 1,5 vez seu valor normal por cada hora que passar de 40 na semana de trabalho. A isenção depende das funções e do nível salarial; alguns estados vão além — a Califórnia, por exemplo, também conta horas extras diárias depois das 8 horas. Com um valor de 25,00, cada hora extra paga no mínimo 37,50.",
        },
        {
          q: "Como o modo salário converte o salário em valor por hora?",
          a: "Ele divide o salário anual por horas regulares por semana × semanas por ano — a mesma base da conversão de salário para hora. Um salário de 52.000 em semanas de 40 horas e 52 semanas dá exatamente 25,00 por hora, então cinco horas extras a 1,5× somam 187,50 sobre a semana regular de 1.000,00.",
        },
        {
          q: "O salário inteiro entra no valor da hora extra?",
          a: "A FLSA calcula horas extras sobre a «taxa normal», que pode incluir mais que o salário base — por exemplo, adicionais de turno e bônus não discricionários. Esta calculadora usa só o valor base, então se você recebe esses extras, sua taxa legal de horas extras pode ser maior que a mostrada aqui.",
        },
      ],
      deepDive: [
        {
          heading: "De onde vem o 1,5× — e onde ele varia",
          paragraphs: [
            "A convenção de hora e meia está mais codificada na Fair Labor Standards Act dos EUA, que exige ao menos 1,5 vez a taxa normal a empregados não isentos que passam de 40 horas na semana. Muitos outros países regulam horas extras de forma diferente: alguns fixam um teto geral de horas semanais com adicionais negociados por setor ou contrato, outros dependem sobretudo do acordo entre empregador e empregado.",
            "É por isso que esta calculadora deixa você escolher o multiplicador em vez de fixar um: 1,5× é o padrão comum, mas tempo dobrado existe em alguns estados americanos para feriados ou jornadas diárias longas, e acordos coletivos em outros países fixam adicionais a partir de 1,25×. Trate a saída como um modelo dos termos do seu contrato, não como declaração do que qualquer lei garante.",
            "A leitura conservadora: verifique o que seu contrato, o acordo do seu setor ou a autoridade trabalhista local realmente dizem sobre horas além da semana padrão, e informe o multiplicador e o limiar que combinem. A matemática — valor × multiplicador × horas — nunca muda; só as entradas mudam.",
          ],
        },
        {
          heading: "A armadilha da taxa normal: o que entra na base",
          paragraphs: [
            "O erro mais comum ao estimar horas extras é usar uma base baixa demais. Sob regras como as da FLSA, as horas extras são devidas sobre a «taxa normal» — uma média misturada que deve incluir a maioria dos bônus não discricionários, adicionais de turno e comissões, não só o salário base. Um empregado cuja taxa normal real é 27,00 mas calcula a partir de 25,00 perde dinheiro em cada hora extra.",
            "Esta calculadora usa deliberadamente só uma taxa base que você informa, o que mantém o modelo transparente: vê-se exatamente valor × multiplicador × horas, sem nada acrescentado ou escondido. Se seu pagamento inclui extras que legalmente pertencem à taxa normal, seu direito real é maior que o mostrado — informe manualmente uma taxa média para aproximá-lo.",
            "Para empregados assalariados, a base precisa primeiro ser derivada: salário anual dividido pelas horas regulares semanais e pelas semanas por ano, que é o que o modo salário faz aqui. A precisão depende da jornada informada — um assalariado que realmente trabalha 45 horas por semana tem um valor derivado menor, e um quadro de horas extras diferente, do que a jornada nominal de 40 sugere.",
          ],
        },
        {
          heading: "Ler a divisão e planejar com ela",
          paragraphs: [
            "Na divisão semanal — pagamento regular versus o adicional — a linha que importa não é o total mas o adicional. A prima é renda marginal pura: mostra o que cada hora extra vale de fato na margem e, por simetria, o que cada hora extra negada ou não paga custa a você. Cinco horas por semana a 1,5× com taxa de 25,00 somam 187,50 de adicional — visível, negociável, digno de acompanhamento.",
            "O valor anualizado multiplica o total semanal pelas semanas que você trabalha no ano. Leia como teto, não como promessa: hora extra raramente é garantida toda semana, então uma faixa realista usa suas semanas típicas de hora extra em vez de 52. Fazer orçamento a partir de projeção de ano inteiro com horas extras é como as pessoas ficam curtas quando as horas extras secam.",
            "Tudo roda localmente no navegador e nada é guardado ou enviado — útil para testar números antes de uma conversa de pagamento. Leve a divisão, não só o total: «minha semana regular é 1.000,00 e as cinco horas que você me pediu valem 187,50 a hora e meia» é um pedido mais claro que qualquer número global.",
          ],
        },
      ],
    },
  },
});
