import { CalcEngineSalary } from "../_engines/calc-engine-salary";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "hourly-to-salary",
  category: "utility",
  icon: "swap",
  engine: { component: CalcEngineSalary, props: { mode: "hourly2salary" } },
  related: ["salary-to-hourly", "emi-calculator", "loan-calculator", "compound-interest-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Hourly to Salary Calculator",
      tagline:
        "Turn an hourly rate into daily, weekly, biweekly, monthly and annual pay at your real schedule — default 40 hours a week across 52 weeks.",
      intro: [
        "Enter an hourly rate with the schedule it applies to and the calculator multiplies it into the annual figure employers and lenders ask for, plus the weekly, biweekly and monthly amounts a payslip would show. The 40-hour, 52-week standard is preloaded; part-time or part-year schedules only need those two numbers changed.",
        "Daily pay assumes a 5-day working week. Because every figure is a straight multiplication, the results match what a salaried offer should pay for the same hours.",
        "The conversion is straight multiplication along the schedule you set: hourly × hours per week × weeks per year gives the annual figure, and weekly, biweekly, monthly and daily amounts are divisions of it. The 40 × 52 default equals 2,080 paid hours, the convention behind most US salaried offers.",
        "Compared with generic salary sites, the schedule inputs are editable, so a 30-hour week or a 46-week contract year produces honest numbers instead of pretending full-time. The result is gross pay before taxes and deductions, and unpaid time off must be reflected in the weeks-per-year field — otherwise the annual figure overstates reality.",
      ],
      steps: [
        "Type the hourly rate.",
        "Set hours per week and weeks per year (40 and 52 by default).",
        "Read the annual figure and the monthly, biweekly, weekly and daily equivalents.",
      ],
      faqs: [
        {
          q: "How is annual pay calculated from an hourly rate?",
          a: "Annual = hourly rate × hours per week × weeks per year. At 25.00 per hour over a 40-hour week for 52 weeks that is exactly 52,000 a year; monthly is the annual divided by 12, and biweekly is one week's pay doubled.",
        },
        {
          q: "What about overtime, tips or unpaid leave?",
          a: "They are not included — the result is the straight multiplication for the schedule you enter. To roughly account for overtime, add the typical extra hours to the hours-per-week field at the same rate; for seasonal work or unpaid leave, lower the weeks per year.",
        },
        {
          q: "Why is my actual paycheck different?",
          a: "The figures are gross pay. Income tax, social security and benefit deductions reduce take-home pay, and many salaried jobs spread pay over 12 months even when you work fewer weeks. Use the annual result for comparing offers, not as a net-income estimate.",
        },
      ],
      deepDive: [
        {
          heading: "Why 52 weeks — and when it lies",
          paragraphs: [
            "The default 40 × 52 = 2,080 paid hours is an accounting convention, not a description of any real job. It assumes you are paid for every week of the year, including the ones you take off. For a salaried employee with paid vacation, that is roughly true — the salary covers the whole year, so dividing it by 2,080 hours gives the honest hourly equivalent.",
            "For an hourly worker the assumption breaks. No work, no pay: a two-week unpaid vacation makes the real year 50 weeks, and 2,080 hours quietly overstates your income by 4%. That is why the weeks-per-year field is editable — set it to the weeks you will actually be paid for, and the annual figure becomes what you will actually see.",
            "Seasonal work is the extreme case: a summer-only job might cover 14–18 weeks. Entering 40 hours and 52 weeks for such a role would inflate the result almost fourfold. The rule of thumb is simple — the weeks field should answer “how many weeks will money actually arrive”, not “how long is a year”.",
          ],
        },
        {
          heading: "Reading the five outputs together",
          paragraphs: [
            "All five figures are the same annual number sliced differently, and knowing which slice to compare with what matters more than the arithmetic. Annual is the figure job offers and loan applications use. Monthly — annual ÷ 12 — is what rent applications and subscription budgets care about, but note that most monthly payroll divides evenly even in months with fewer working days.",
            "Weekly (annual ÷ 52 by default) is the unit hourly workers actually live on, biweekly doubles it and matches the most common US pay cycle, and daily assumes a 5-day week. When comparing an hourly job against a salaried offer, convert both to the same cycle first — a “higher” monthly salary can hide fewer paid weeks.",
            "Every number here is gross. Taxes, social contributions and benefit deductions come out later, at rates that depend on your country and bracket, so a 60,000 annual figure never means 5,000 arriving each month. Treat these as the pre-tax comparison layer; net income is a separate calculation.",
          ],
        },
        {
          heading: "Practical uses and common mistakes",
          paragraphs: [
            "The most common use is comparing offers with different pay structures: an hourly 30.00 against a salaried 60,000 stops being a guess once both are expressed as annual. Loan and apartment applications are the second — they almost always ask for annual or monthly figures, not hourly ones, and this converter produces them in the exact shape the forms expect.",
            "The most common mistake is forgetting that overtime is excluded. The straight multiplication prices every hour at your base rate; if your contract pays 1.5× past 40 hours and you regularly work them, your real annual will exceed this estimate — deliberately add typical overtime hours to the hours field if you want them priced in.",
            "Everything runs locally in your browser: the rate and schedule never leave the device, which matters when you are evaluating an offer you have not accepted yet. Change one input at a time and watch how sensitive the annual figure is — it makes the trade-off between a small raise in rate and one extra paid week a year immediately visible.",
          ],
        },
      ],
    },
    zh: {
      name: "时薪转年薪计算器",
      tagline:
        "输入时薪和每周工时、每年周数,立即折算日薪、周薪、双周薪、月薪和年薪。默认每周 40 小时、每年 52 周,兼职或季节性工作改两个数字即可。",
      intro: [
        "输入时薪和它对应的作息安排,计算器会乘出雇主和贷款机构要看的年薪数字,以及工资单上的周薪、双周薪和月薪。默认每周 40 小时、每年 52 周;兼职或只做半年,改这两个数字就行。",
        "日薪按每周 5 个工作日折算。所有结果都是直接相乘,因此和同等工时的正式薪资应当一致。",
      ],
      steps: [
        "输入时薪。",
        "设置每周工时和每年周数(默认 40 和 52)。",
        "查看年薪,以及月薪、双周薪、周薪和日薪。",
      ],
      faqs: [
        {
          q: "时薪怎么折算年薪?",
          a: "年薪 = 时薪 × 每周工时 × 每年周数。按每小时 25.00、每周 40 小时、52 周计算,正好是年薪 52,000;月薪 = 年薪 ÷ 12,双周薪 = 周薪 × 2。",
        },
        {
          q: "加班、小费或无薪假怎么算?",
          a: "都不包含——结果就是按你输入的作息直接相乘。想粗略计入加班,可以把常加的小时数加进每周工时(按同一时薪);季节性工作或有无薪假,则把每年周数调低。",
        },
        {
          q: "为什么实际工资单和结果不一样?",
          a: "这里的数字是税前口径。个税、社保和福利扣款会减少到手收入,而且很多正式岗位按 12 个月均摊发薪,即使实际工作周数更少。年薪结果适合用来比较 offer,不能当到手收入估算。",
        },
      ],
      deepDive: [
        {
          heading: "为什么默认 52 周——以及它什么时候失真",
          paragraphs: [
            "默认的 40 × 52 = 2,080 个带薪小时是财务口径,不是对任何真实岗位的描述。它假设你全年每一周都被计薪,包括休假的那几周。对带薪休假的正式员工来说这大致成立——年薪覆盖全年,除以 2,080 小时得到的就是诚实的时薪折算。",
            "对小时工来说这个假设不成立。不干活就没钱:两周无薪假让真实的一年只剩 50 周,2,080 小时悄悄把收入高估了 4%。这正是“每年周数”可以编辑的原因——把它设成实际会拿到钱的周数,年薪数字才会等于你真正看到的收入。",
            "季节性工作是极端情况:只做夏季的工作可能只有 14–18 周。如果按 40 小时、52 周去填,结果会虚高接近四倍。经验法则很简单——“每年周数”应该回答“钱实际到账多少周”,而不是“一年有多长”。",
          ],
        },
        {
          heading: "五个结果怎么放在一起读",
          paragraphs: [
            "五个数字其实是同一个年薪的不同切法,搞清楚哪种切法对哪种场景,比算术本身更重要。年薪是 offer 和贷款申请用的数字。月薪(年薪 ÷ 12)是房租申请和订阅预算关心的口径——但注意,大多数月薪发薪把一年平摊成 12 份,即使那个月工作日更少。",
            "周薪(默认年薪 ÷ 52)是小时工实际生活的单位,双周薪是它的两倍,对应美国最常见的发薪周期;日薪按每周 5 个工作日折算。拿小时工和正式 offer 比较,先把两者换到同一个口径——“月薪更高”可能只是掩盖了计薪周数更少。",
            "这里所有数字都是税前。个税、社保和福利扣款在之后才发生,税率取决于你的国家和税档,所以年薪 60,000 不等于每月有 5,000 到手。把这些当税前比较层,到手收入是另一道计算。",
          ],
        },
        {
          heading: "实用场景与常见误区",
          paragraphs: [
            "最常见的用途是比较计薪方式不同的 offer:时薪 30.00 对上年薪 60,000,一旦都换成年薪口径就不再是猜。第二类是贷款和租房申请——表格几乎都要年薪或月薪,不要时薪,这个换算器产出的正是表格要的形状。",
            "最常见的失误是忘了加班费不包含在内。直接相乘把每个小时都按基本时薪计价;如果你的合同超过 40 小时按 1.5 倍支付、而你经常加班,实际年收入会高于这里的估算——想把加班计入,就把典型加班小时加进每周工时。",
            "一切都在浏览器本地计算:时薪和作息不会离开设备,这在你还在评估、尚未接受的 offer 上很重要。一次只改一个输入,观察年薪对它的敏感度——时薪小幅上调和一年多一个带薪周之间的取舍立刻就能看见。",
          ],
        },
      ],
    },
    ja: {
      name: "時給から年収計算",
      tagline:
        "時給を日給・週給・半月給・月給・年収に換算。実態に合わせた勤務条件で計算でき、デフォルトは週 40 時間 × 年 52 週です。パートや季節労働も数字を変えるだけ。",
      intro: [
        "時給とその勤務条件を入力すると、雇用主や貸し手が確認する年収の数字に換算し、給与明細に出てくる週給・半月給・月給も同時に出します。デフォルトは週 40 時間 × 年 52 週。パートタイムや年の半分だけの勤務でも、この 2 つの数字を変えるだけです。",
        "日給は週 5 日勤務を前提にします。すべて単純な掛け算なので、結果は同じ労働時間の正社員の給与と一致するはずです。",
      ],
      steps: [
        "時給を入力します。",
        "週労働時間と年間週数を設定します(既定は 40 と 52)。",
        "年収と、月給・半月給・週給・日給を確認します。",
      ],
      faqs: [
        {
          q: "時給から年収はどう計算しますか?",
          a: "年収 = 時給 × 週労働時間 × 年間週数。時給 25.00・週 40 時間・52 週ならちょうど年収 52,000 です。月給は年収 ÷ 12、半月給は週給の 2 倍になります。",
        },
        {
          q: "残業やチップ、無給休暇は考慮されますか?",
          a: "含まれません。結果は入力した条件での単純な掛け算です。残業を大まかに反映するには、よく入れる残業時間を同じ時給のまま週労働時間に足してください。季節労働や無給休暇なら年間週数を下げます。",
        },
        {
          q: "実際の給与明細と違うのはなぜですか?",
          a: "表示は額面です。所得税・社会保険・福利厚生の控除で手取りは減りますし、多くの正社員は実際の勤務週数に関係なく 12 か月で分割支給されます。年収の数字はオファー比較用にお使いください。",
        },
      ],
      deepDive: [
        {
          heading: "なぜ 52 週か——そしていつ嘘をつくか",
          paragraphs: [
            "既定の 40 × 52 = 2,080 時間は会計上の約束であって、実在の仕事の記述ではありません。休んでいる週も含め、年のすべての週で支払われると仮定します。有給休暇のある正社員ならほぼ正しい——年収が一年を覆うので、2,080 時間で割れば誠実な時給換算になります。",
            "時給労働者ではこの仮定が崩れます。働かなければ支払われません。2 週間の無給休暇は実際の年を 50 週にし、2,080 時間は収入を静かに 4% 膨らませます。だから年間週数は編集できるようになっています。実際に支払われる週数を入力すれば、年収の数字は実際に見える金額になります。",
            "季節労働は極端な例です。夏だけの仕事なら 14〜18 週かもしれません。それを 40 時間 × 52 週で入力すると結果はほぼ 4 倍に膨れます。経験則は単純です——年間週数が答えるべきは「1 年の長さ」ではなく「実際にお金が届くのは何週か」です。",
          ],
        },
        {
          heading: "5 つの出力を合わせて読む",
          paragraphs: [
            "5 つの数字は同じ年収を切り分けたものにすぎず、どの切り分けを何と比較するかを知ることが計算以上に重要です。年収はオファーとローン申請の数字。月給(年収 ÷ 12)は賃貸申請やサブスク予算が見る単位ですが、多くの月払いは勤務日の少ない月でも均等に分割します。",
            "週給(既定では年収 ÷ 52)は時給労働者が実際に暮らす単位、半月給はその 2 倍で米国で最も一般的な支払いサイクルに対応、日給は週 5 日換算です。時給の仕事と正社員オファーを比べるときは、まず両方を同じサイクルに揃えてください——「月給が高い」だけで実際の支払い週数が少ない場合を隠すことがあります。",
            "ここはすべて額面です。税・社会保険・福利控除はその後で差し引かれ、税率は国と所得区分によります。年収 60,000 が毎月 5,000 の入金を意味するわけではありません。税引き前の比較層と考え、手取りは別の計算です。",
          ],
        },
        {
          heading: "実用場面とよくある誤り",
          paragraphs: [
            "最も多い用途は支払い構造の異なるオファー比較です。時給 30.00 と年収 60,000 は、両方を年額に揃えれば推測ではなくなります。次がローンや賃貸の申請です。申込書はほぼ必ず年額か月額を求め、時給は聞きません。このツールの出力はまさに申込書が求める形です。",
            "よくある誤りは残業代が含まれていないことを忘れることです。単純な掛け算はすべての時間を基本時給で計上します。40 時間超を 1.5 倍で支払う契約で実際に残業しているなら、実際の年収はこの推定を上回ります。残業を反映したいなら、よく入る残業時間を週労働時間に足してください。",
            "すべてブラウザ内で完結します。時給と勤務条件は端末の外に出ないので、まだ受けていないオファーの検討にも安心です。入力を一つずつ変えて年収の感度を見てみてください。時給の小幅アップと年 1 週の有給追加、どちらが得かが即座に見えます。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de por hora a salario",
      tagline:
        "Convierta una tarifa por hora en paga diaria, semanal, quincenal, mensual y anual según su horario real — por defecto 40 horas a la semana durante 52 semanas.",
      intro: [
        "Introduzca una tarifa por hora con el horario al que aplica y la calculadora la multiplica hasta la cifra anual que piden empleadores y prestamistas, junto con los importes semanales, quincenales y mensuales que mostraría una nómina. La semana de 40 horas y 52 semanas estándar viene precargada; para jornadas parciales o medios años basta con cambiar esos dos números.",
        "La paga diaria asume una semana laboral de 5 días. Como todas las cifras son multiplicaciones directas, los resultados coinciden con lo que debería pagar una oferta asalariada por las mismas horas.",
      ],
      steps: [
        "Escriba la tarifa por hora.",
        "Fije las horas por semana y las semanas por año (40 y 52 por defecto).",
        "Lea la cifra anual y los equivalentes mensual, quincenal, semanal y diario.",
      ],
      faqs: [
        {
          q: "¿Cómo se calcula la paga anual desde una tarifa por hora?",
          a: "Anual = tarifa por hora × horas por semana × semanas por año. A 25,00 por hora en una semana de 40 horas durante 52 semanas son exactamente 52.000 al año; el mensual es el anual dividido por 12 y el quincenal es la paga semanal duplicada.",
        },
        {
          q: "¿Y las horas extra, las propinas o los permisos sin sueldo?",
          a: "No se incluyen — el resultado es la multiplicación directa del horario que introduzca. Para reflejar aproximadamente las horas extra, añada las horas habituales al campo de horas por semana con la misma tarifa; para trabajo de temporada o permisos sin sueldo, baje las semanas por año.",
        },
        {
          q: "¿Por qué mi nómina real es distinta?",
          a: "Las cifras son salario bruto. El impuesto sobre la renta, la seguridad social y las deducciones de beneficios reducen el neto, y muchos empleos asalariados reparten el pago en 12 meses aunque se trabajen menos semanas. Use el resultado anual para comparar ofertas, no como estimación de renta neta.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué 52 semanas — y cuándo miente",
          paragraphs: [
            "Las 40 × 52 = 2.080 horas pagadas por defecto son una convención contable, no la descripción de ningún empleo real. Asume que le pagan las 52 semanas del año, incluidas las que descansa. Para un empleado asalariado con vacaciones pagadas, es aproximadamente cierto — el salario cubre el año entero, así que dividirlo entre 2.080 horas da el equivalente horario honesto.",
            "Para un trabajador por horas la suposición se rompe. Sin trabajo no hay pago: dos semanas de vacaciones sin sueldo convierten el año real en 50 semanas, y las 2.080 horas sobreestiman su ingreso un 4% sin hacer ruido. Por eso el campo de semanas por año es editable — fíjelo en las semanas por las que de verdad le pagarán, y la cifra anual será la que realmente verá.",
            "El trabajo de temporada es el caso extremo: un empleo solo de verano puede cubrir 14–18 semanas. Introducir 40 horas y 52 semanas para ese puesto inflaría el resultado casi cuatro veces. La regla práctica es simple — el campo de semanas debe responder “cuántas semanas llegará dinero de verdad”, no “cuánto dura un año”.",
          ],
        },
        {
          heading: "Leer las cinco cifras juntas",
          paragraphs: [
            "Las cinco cifras son el mismo número anual cortado de maneras distintas, y saber qué corte comparar con qué importa más que la aritmética. El anual es la cifra de ofertas y solicitudes de préstamo. El mensual — anual ÷ 12 — es lo que miran las solicitudes de alquiler y los presupuestos de suscripciones, aunque la nómina mensual reparte por igual incluso en meses con menos días laborables.",
            "El semanal (anual ÷ 52 por defecto) es la unidad con la que vive de verdad un trabajador por horas, el quincenal lo duplica y coincide con el ciclo de pago más común en EE. UU., y el diario asume una semana de 5 días. Al comparar un empleo por horas con una oferta asalariada, convierta ambas al mismo ciclo primero — un salario mensual “más alto” puede ocultar menos semanas pagadas.",
            "Todo aquí es bruto. Impuestos, cotizaciones y deducciones de beneficios llegan después, con tasas que dependen de su país y tramo, así que 60.000 anuales nunca significan 5.000 llegando cada mes. Trate estas cifras como la capa bruta de comparación; la renta neta es otro cálculo.",
          ],
        },
        {
          heading: "Usos prácticos y errores frecuentes",
          paragraphs: [
            "El uso más común es comparar ofertas con estructuras de pago distintas: 30,00 por hora frente a 60.000 asalariados deja de ser una conjetura cuando ambos se expresan como anual. Lo segundo son las solicitudes de préstamo y de vivienda — casi siempre piden cifras anuales o mensuales, no horarias, y este conversor las produce exactamente con la forma que los formularios esperan.",
            "El error más frecuente es olvidar que las horas extra quedan fuera. La multiplicación directa valora cada hora a su tarifa base; si su contrato paga 1,5× a partir de las 40 horas y usted las trabaja habitualmente, su anual real superará esta estimación — añada deliberadamente las horas extra típicas al campo de horas si quiere incluirlas.",
            "Todo corre localmente en su navegador: la tarifa y el horario nunca salen del dispositivo, algo que importa cuando evalúa una oferta que todavía no ha aceptado. Cambie una entrada cada vez y observe la sensibilidad de la cifra anual — hace visible al instante la diferencia entre una subida pequeña de tarifa y una semana pagada extra al año.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de valor por hora para salário",
      tagline:
        "Transforme um valor por hora em remuneração diária, semanal, quinzenal, mensal e anual na sua jornada real — padrão de 40 horas por semana durante 52 semanas.",
      intro: [
        "Informe um valor por hora com a jornada a que ele se aplica e a calculadora multiplica até o número anual que empregadores e bancos pedem, além dos valores semanal, quinzenal e mensal que um contracheque mostraria. O padrão de 40 horas e 52 semanas já vem preenchido; para meio período ou meio ano, basta mudar esses dois números.",
        "O valor diário assume uma semana de trabalho de 5 dias. Como todos os números são multiplicações diretas, os resultados batem com o que uma oferta assalariada deveria pagar pelas mesmas horas.",
      ],
      steps: [
        "Digite o valor por hora.",
        "Defina as horas por semana e as semanas por ano (40 e 52 por padrão).",
        "Veja o valor anual e os equivalentes mensal, quinzenal, semanal e diário.",
      ],
      faqs: [
        {
          q: "Como calcular o salário anual a partir do valor por hora?",
          a: "Anual = valor por hora × horas por semana × semanas por ano. A 25,00 por hora numa semana de 40 horas durante 52 semanas são exatamente 52.000 por ano; o mensal é o anual dividido por 12 e o quinzenal é o valor semanal dobrado.",
        },
        {
          q: "E hora extra, gorjetas ou folga não remunerada?",
          a: "Não estão incluídos — o resultado é a multiplicação direta da jornada informada. Para refletir aproximadamente horas extras, some as horas habituais ao campo de horas por semana na mesma taxa; para trabalho sazonal ou folga não remunerada, reduza as semanas por ano.",
        },
        {
          q: "Por que meu contracheque real é diferente?",
          a: "Os valores são brutos. Imposto de renda, INSS e descontos de benefícios reduzem o líquido, e muitos cargos assalariados distribuem o pagamento em 12 meses mesmo trabalhando menos semanas. Use o resultado anual para comparar propostas, não como estimativa de renda líquida.",
        },
      ],
      deepDive: [
        {
          heading: "Por que 52 semanas — e quando ela mente",
          paragraphs: [
            "As 40 × 52 = 2.080 horas pagas do padrão são uma convenção contábil, não a descrição de nenhum emprego real. Ela assume que você é pago em todas as semanas do ano, inclusive nas que descansa. Para um empregado assalariado com férias remuneradas, isso é aproximadamente verdade — o salário cobre o ano inteiro, então dividi-lo por 2.080 horas dá o equivalente horário honesto.",
            "Para quem ganha por hora a suposição quebra. Sem trabalho, sem pagamento: duas semanas de férias não remuneradas transformam o ano real em 50 semanas, e as 2.080 horas superestimam sua renda em 4% sem alarde. Por isso o campo de semanas por ano é editável — defina-o nas semanas em que você de fato será pago, e o valor anual passa a ser o que você realmente verá.",
            "Trabalho sazonal é o caso extremo: um emprego só de verão pode cobrir 14–18 semanas. Informar 40 horas e 52 semanas para essa função inflaria o resultado quase quatro vezes. A regra prática é simples — o campo de semanas deve responder “em quantas semanas o dinheiro chega de verdade”, não “quanto dura um ano”.",
          ],
        },
        {
          heading: "Ler as cinco saídas juntas",
          paragraphs: [
            "As cinco cifras são o mesmo número anual fatiado de formas diferentes, e saber qual fatia comparar com o quê importa mais que a aritmética. O anual é o número de propostas e pedidos de empréstimo. O mensal — anual ÷ 12 — é o que interessam a pedidos de aluguel e orçamentos de assinaturas, mas o pagamento mensal costuma dividir por igual mesmo em meses com menos dias úteis.",
            "O semanal (anual ÷ 52 por padrão) é a unidade com que um trabalhador por hora de fato vive, o quinzenal o dobra e corresponde ao ciclo de pagamento mais comum nos EUA, e o diário assume uma semana de 5 dias. Ao comparar um emprego por hora com uma proposta assalariada, converta os dois para o mesmo ciclo primeiro — um salário mensal “mais alto” pode esconder menos semanas pagas.",
            "Tudo aqui é bruto. Impostos, contribuições e descontos de benefícios vêm depois, com alíquotas que dependem do país e da faixa, então 60.000 anuais nunca significa 5.000 chegando por mês. Trate estes números como a camada bruta de comparação; a renda líquida é outro cálculo.",
          ],
        },
        {
          heading: "Usos práticos e erros comuns",
          paragraphs: [
            "O uso mais comum é comparar propostas com estruturas de pagamento diferentes: 30,00 por hora contra 60.000 assalariados deixa de ser palpite quando ambos viram valor anual. Em segundo lugar vêm pedidos de empréstimo e aluguel — os formulários quase sempre pedem valores anuais ou mensais, nunca horários, e este conversor entrega exatamente o formato que eles esperam.",
            "O erro mais comum é esquecer que hora extra fica de fora. A multiplicação direta precifica cada hora pela taxa base; se seu contrato paga 1,5× acima de 40 horas e você faz essas horas regularmente, seu anual real superará esta estimativa — some de propósito as horas extras típicas ao campo de horas se quiser incluí-las.",
            "Tudo roda localmente no navegador: taxa e jornada nunca saem do aparelho, o que importa quando você avalia uma proposta que ainda não aceitou. Mude uma entrada por vez e observe a sensibilidade do valor anual — fica visível na hora a diferença entre um pequeno aumento de taxa e uma semana paga extra por ano.",
          ],
        },
      ],
    },
  },
});
