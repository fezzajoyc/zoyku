import { CalcEngineSalary } from "../_engines/calc-engine-salary";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "salary-to-hourly",
  category: "utility",
  icon: "clock",
  engine: { component: CalcEngineSalary, props: { mode: "salary2hourly" } },
  related: ["hourly-to-salary", "emi-calculator", "loan-calculator", "compound-interest-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Salary to Hourly Calculator",
      tagline:
        "Convert an annual salary into hourly, daily, weekly, biweekly and monthly pay — and see the adjusted hourly rate once unpaid days off are factored in.",
      intro: [
        "Enter an annual salary with your normal schedule — hours per week and weeks per year — and the calculator divides it into the pay rates that job ads and payslips use: hourly, daily, weekly, biweekly and monthly. The standard 40-hour week across 52 weeks is preloaded.",
        "If you take unpaid days, the adjusted hourly shows what the same salary works out to per hour actually worked, since each unpaid day removes a fifth of a working week from the year.",
        "The division follows the schedule you set: annual ÷ weeks per year gives the weekly figure, ÷ hours per week gives the hourly rate, with biweekly, monthly and daily amounts derived the same way. The 40 × 52 default equals 2,080 hours, the standard behind most US offers and FLSA exemption tests.",
        "Compared with headline salary numbers, the hourly view is what makes trade-offs visible — a salaried role with heavy unpaid overtime can pay less per actual hour than a lower-paying hourly job. The adjusted figure accounts for unpaid leave by shrinking the working year. These are gross figures; taxes and benefits change the real comparison.",
      ],
      steps: [
        "Type the annual salary.",
        "Set hours per week and weeks per year (40 and 52 by default).",
        "Add unpaid days off per year if there are any.",
        "Read the hourly rate and the daily, weekly, biweekly and monthly equivalents.",
      ],
      faqs: [
        {
          q: "How is the hourly rate calculated?",
          a: "Hourly = annual salary ÷ (hours per week × weeks per year). At the default 40 hours over 52 weeks, a 52,000 salary becomes exactly 25.00 per hour. Daily pay uses a 5-day week, weekly pay is the annual divided by weeks, biweekly doubles that, and monthly is the annual divided by 12.",
        },
        {
          q: "How does unpaid time off change the result?",
          a: "Each unpaid day removes one fifth of a working week, so 10 unpaid days shorten the year to about 50 working weeks. The adjusted hourly rate divides the same salary by the hours you actually work: 52,000 over 40-hour weeks with 10 unpaid days works out to 26.00 per hour. Weekly and monthly totals still show the quoted salary.",
        },
        {
          q: "Are taxes and deductions included?",
          a: "No — every figure is gross pay before income tax, social contributions and other deductions. Take-home pay depends on your tax bracket and location, so treat these results as the pre-tax comparison figures.",
        },
      ],
      deepDive: [
        {
          heading: "The 2,080-hour baseline and what it assumes",
          paragraphs: [
            "Dividing by 40 × 52 = 2,080 hours is the standard convention behind most job offers, and it embeds two assumptions worth naming: that you are paid for all 52 weeks (paid vacation included) and that the nominal weekly schedule reflects hours actually worked. For a salaried role with paid leave and modest overtime, 2,080 is a fair denominator.",
            "The denominator changes the answer dramatically. The same 65,000 salary is 31.25 per hour on a 2,080-hour year, 35.75 if you really work 45-hour weeks, and over 40 if unpaid leave shrinks the paid year. This is why the schedule fields matter more than they look — the hourly rate is not a property of the salary, it is a property of the salary divided by hours.",
            "The 2,080 convention also has a legal echo in the US: exemption tests for overtime rules historically reference salary levels rather than hourly amounts, which is one reason salaried roles are quoted annually even when the underlying work is measured in hours. Converting back to hourly restores the unit that comparisons actually need.",
          ],
        },
        {
          heading: "What the adjusted hourly rate reveals",
          paragraphs: [
            "The headline hourly rate and the adjusted one can differ meaningfully, and the gap is the price of unpaid time off. Each unpaid day removes a fifth of a working week from the denominator, so ten unpaid days shrink the year to about 50 weeks and push the effective hourly rate up by roughly 4%. The salary stays fixed; only your hours worked change.",
            "This adjusted figure is the honest basis for comparing a salaried job against an hourly one. A salaried role that looks equivalent at the headline rate often loses once heavy unpaid overtime or a contract without paid leave enters the picture — the per-actual-hour view exposes what the annual number hides.",
            "Note what the adjusted rate does not do: it does not value vacation itself. Paid time off has worth beyond the arithmetic — it is income during days you do not work. The adjusted rate narrows the comparison to hours actually worked, which is exactly what you want for effort comparisons and exactly what you should not use alone for quality-of-life decisions.",
          ],
        },
        {
          heading: "Common misreads and how to use it",
          paragraphs: [
            "The most common misread is treating the hourly figure as an offer you could actually get. A 52,000 salary “equals” 25.00 per hour on paper, but few employers would hire those same hours at 25.00 hourly — salaried compensation bundles paid leave, sick days and predictable income. Use the hourly figure to compare, not to renegotiate.",
            "The second is forgetting that monthly payroll divides evenly. Annual ÷ 12 pays the same in February as in July regardless of working days; weekly or biweekly cycles do not. If your budget is weekly, use the weekly figure, not a twelfth of the annual.",
            "Everything computes locally in your browser — your salary never leaves the device, which matters when testing numbers for an offer under discussion. A good workflow: run your current salary, then a competing offer with its true schedule (including unpaid days), and compare the adjusted hourly rates rather than the headline annual figures.",
          ],
        },
      ],
    },
    zh: {
      name: "年薪转时薪计算器",
      tagline:
        "输入年薪和每周工时、每年周数,立即换算时薪、日薪、周薪、双周薪和月薪,还能算上无薪休假后每小时实际挣多少。默认每周 40 小时、每年 52 周。",
      intro: [
        "输入年薪和你的常规工作安排——每周工时与每年工作周数,计算器会把它拆成招聘广告和工资单上常见的几种口径:时薪、日薪、周薪、双周薪和月薪。默认按每周 40 小时、每年 52 周。",
        "如果有无薪休假,调整后时薪显示同一年薪摊到实际工作小时上是多少:每个无薪工作日会从一年里去掉五分之一的工作周。",
      ],
      steps: [
        "输入年薪。",
        "设置每周工时和每年周数(默认 40 和 52)。",
        "如有无薪休假,填写每年天数。",
        "查看时薪,以及日薪、周薪、双周薪和月薪。",
      ],
      faqs: [
        {
          q: "时薪是怎么算的?",
          a: "时薪 = 年薪 ÷(每周工时 × 每年周数)。按默认每周 40 小时、52 周计算,年薪 52,000 正好是每小时 25.00。日薪按每周 5 个工作日折算,周薪 = 年薪 ÷ 周数,双周薪是其两倍,月薪 = 年薪 ÷ 12。",
        },
        {
          q: "无薪休假对结果有什么影响?",
          a: "每个无薪工作日会去掉五分之一个工作周,10 天无薪假相当于把一年缩到约 50 个工作周。调整后时薪用同一年薪除以实际工作小时:年薪 52,000、每周 40 小时、10 天无薪假,相当于每小时 26.00。周薪和月薪仍按原年薪显示。",
        },
        {
          q: "包含税费和扣款吗?",
          a: "不包含。所有数字都是税前口径,未扣个税、社保等。到手收入取决于你的税档和所在地,这些结果适合作为税前比较基准。",
        },
      ],
      deepDive: [
        {
          heading: "2,080 小时的基准和它的两个假设",
          paragraphs: [
            "按 40 × 52 = 2,080 小时折算是大多数 offer 背后的标准口径,它内嵌了两个值得点名的假设:全年 52 周都计薪(包括带薪休假),以及名义上的每周工时就是实际工作的小时数。对带薪休假、加班不严重的正式岗位,2,080 是个公平的分母。",
            "分母一变,答案天差地别。同一年薪 65,000 按 2,080 小时是 31.25 一小时;按实际每周 45 小时只有 35.75;无薪休假压缩计薪年份后则超过 40。这就是为什么作息输入比看上去重要——时薪不是年薪的属性,而是“年薪除以小时数”的属性。",
            "2,080 这个口径在美国还有法律上的回响:加班豁免判定历来参照薪资水平而非时薪,这也是正式岗位即使按小时衡量工作量、也用年薪报价的原因之一。换算回时薪,正是把比较真正需要的单位找回来。",
          ],
        },
        {
          heading: "调整后时薪揭示了什么",
          paragraphs: [
            "名义时薪和调整后时薪可能差得不小,差额就是无薪假期的代价。每个无薪工作日会从分母里去掉五分之一个工作周,10 天无薪假把一年缩到约 50 周,实际时薪被推高约 4%。年薪不变,变的只是你实际工作的小时数。",
            "这个调整后数字是与小时工比较的诚实基础。名义时薪看起来对等的正式岗位,一旦计入大量无薪加班或没有带薪假的合同,实际每小时可能反而更低——“每小时”的视角揭开了年薪数字藏起来的东西。",
            "也要注意调整后时薪没做的事:它没有给假期本身定价。带薪休假的价值不止于算术——它是在你不工作的日子里依然进账的收入。调整后口径把比较收窄到实际工作小时,这正是比较付出时想要的,也恰恰是不该单独用于生活质量决策的。",
          ],
        },
        {
          heading: "常见误读与使用方法",
          paragraphs: [
            "最常见的误读是把时薪当成真的能拿到的 offer。年薪 52,000 纸面上“等于”时薪 25.00,但很少有雇主愿意按 25.00 的时薪雇同样的工时——年薪打包了带薪假、病假和可预期的收入。用时薪做比较可以,用它去重谈薪资不行。",
            "第二常见的是忘了月薪是均摊的。年薪 ÷ 12 让二月和七月发同样的钱,不管工作日多少;按周或双周的周期则不然。如果你的预算按周做,就用周薪数字,而不是年薪的十二分之一。",
            "全部计算都在浏览器本地完成——你的年薪不会离开设备,这在测算还在谈判中的 offer 时很重要。推荐流程:先跑一遍现有年薪,再按真实作息(含无薪天数)跑一遍竞争 offer,比较调整后时薪而不是名义年薪。",
          ],
        },
      ],
    },
    ja: {
      name: "年収から時給計算",
      tagline:
        "年収を時給・日給・週給・半月給・月給に換算。無給休暇の日数を反映した実働時給も表示します。週 40 時間・年 52 週をデフォルトに、勤務形態に合わせて調整できます。",
      intro: [
        "年収と普段の勤務形態(週労働時間・年間週数)を入力すると、求人や給与明細で使われる各単位——時給・日給・週給・半月給・月給——に分解します。デフォルトは週 40 時間 × 年 52 週です。",
        "無給休暇がある場合は、同じ年収を実際に働いた時間で割った「実働時給」も表示します。無給の休業日 1 日につき労働週の 5 分の 1 が減る計算です。",
      ],
      steps: [
        "年収を入力します。",
        "週労働時間と年間週数を設定します(既定は 40 と 52)。",
        "無給休暇の日数があれば入力します。",
        "時給と、日給・週給・半月給・月給を確認します。",
      ],
      faqs: [
        {
          q: "時給はどのように計算しますか?",
          a: "時給 = 年収 ÷(週労働時間 × 年間週数)。既定の週 40 時間 × 52 週なら、年収 52,000 はちょうど時給 25.00 です。日給は週 5 日換算、週給は年収 ÷ 週数、半月給はその 2 倍、月給は年収 ÷ 12 です。",
        },
        {
          q: "無給休暇があると結果はどう変わりますか?",
          a: "無給の休業日 1 日で労働週の 5 分の 1 が減るため、10 日の無給休暇は年間約 50 労働週に相当します。実働時給は同じ年収を実際の労働時間で割るので、年収 52,000・週 40 時間・無給 10 日なら時給 26.00 になります。週給・月給の表示は元の年収のままです。",
        },
        {
          q: "税金や控除は含まれますか?",
          a: "含まれません。表示はすべて所得税や社会保険料などを差し引く前の額面です。手取りは税率区分や地域で変わるため、これらの数値は税引き前の比較用とお考えください。",
        },
      ],
      deepDive: [
        {
          heading: "2,080 時間という基準とその前提",
          paragraphs: [
            "40 × 52 = 2,080 時間で割るのは、ほとんどのオファーの背後にある標準的な約束です。これには 2 つの前提が埋め込まれています。年 52 週すべてで支払われること(有給休暇を含む)、そして名目の週労働時間が実際の労働時間であること。有給休暇があり残業が控えめな正社員なら、2,080 は公平な分母です。",
            "分母が変わると答えは激変します。同じ年収 65,000 でも、2,080 時間なら時給 31.25、実際に週 45 時間働くなら 35.75、無給休暇で支給対象の年が縮めば 40 を超えます。だからこそ勤務条件の入力が見た目以上に重要です。時給は年収の属性ではなく、「年収 ÷ 時間数」の属性です。",
            "2,080 という基準には米国での法的な余波もあります。残業規則の適用除外の判定は、時給ではなく年収水準を参照してきた歴史があり、これが労働を実時間で測る仕事でも年額で提示される一因です。時給へ戻す換算は、比較に本当に必要な単位を取り戻す作業です。",
          ],
        },
        {
          heading: "実働時給が明らかにすること",
          paragraphs: [
            "名目の時給と実働時給は大きく開くことがあり、その差が無給休暇の代価です。無給の休業日 1 日が分母から労働週の 5 分の 1 を取り除くため、10 日で年は約 50 週になり、実効時給は約 4% 押し上がります。年収は固定で、変わるのは働いた時間だけです。",
            "この実働時給こそ、正社員と時給労働を比較する誠実な基準です。名目の時給で同等に見えた正社員も、大量の無給残業や有給休暇のない契約が入ると1時間あたりでは負けることがあります。1 時間あたりの視点は、年額という数字が隠すものを露わにします。",
            "実働時給がしていないことも確認してください。休暇そのものに値段をつけていないのです。有給休暇の価値は算術を超えます。働いていない日の収入ですから。実働時給は比較を実際の労働時間に狭めます。労力の比較にはちょうどよく、生活の質の判断に単独で使うにはまったく不十分です。",
          ],
        },
        {
          heading: "よくある誤読と使い方",
          paragraphs: [
            "最も多い誤読は、時給の数字を実際に得られるオファーとして扱うことです。年収 52,000 は紙の上では時給 25.00「に等しい」ですが、同じ時間を時給 25.00 で雇う雇用主はほとんどいません。年収には有給・病欠・予測可能な収入が束ねられています。比較のためには使い、再交渉の根拠にはしないでください。",
            "次に多いのは、月給が均等割りであることを忘れることです。年収 ÷ 12 は勤務日に関係なく 2 月も 7 月も同じ額を支払います。週払いや半月払いはそうなりません。予算を週単位で立てるなら、年収の 12 分の 1 ではなく週給を使ってください。",
            "計算はすべてブラウザ内で完結します。年収は端末の外に出ないので、交渉中のオファーの数字を試すのにも安心です。おすすめの流れは、現在の年収を入力し、次に競合オファーをその実際の勤務条件(無給日を含む)で入力して、額面の年額ではなく実働時給を比較することです。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de salario a por hora",
      tagline:
        "Convierta un salario anual en paga por hora, día, semana, quincena y mes — y vea la tarifa horaria ajustada una vez descontados los días sin sueldo.",
      intro: [
        "Introduzca un salario anual con su horario habitual — horas por semana y semanas por año — y la calculadora lo desglosa en las tarifas que usan las ofertas y las nóminas: por hora, por día, semanal, quincenal y mensual. La semana estándar de 40 horas a lo largo de 52 semanas viene precargada.",
        "Si toma días sin sueldo, la tarifa ajustada muestra a cuánto equivale el mismo salario por hora realmente trabajada, ya que cada día sin sueldo resta un quinto de semana laboral al año.",
      ],
      steps: [
        "Escriba el salario anual.",
        "Fije las horas por semana y las semanas por año (40 y 52 por defecto).",
        "Añada los días sin sueldo al año, si los hay.",
        "Lea la tarifa por hora y los equivalentes diario, semanal, quincenal y mensual.",
      ],
      faqs: [
        {
          q: "¿Cómo se calcula la tarifa por hora?",
          a: "Hora = salario anual ÷ (horas por semana × semanas por año). Con las 40 horas y 52 semanas por defecto, un salario de 52.000 son exactamente 25,00 por hora. La paga diaria usa una semana de 5 días, la semanal es el anual dividido por semanas, la quincenal es el doble y la mensual es el anual dividido por 12.",
        },
        {
          q: "¿Cómo cambian el resultado los días sin sueldo?",
          a: "Cada día sin sueldo resta un quinto de semana laboral, así que 10 días acortan el año a unas 50 semanas de trabajo. La tarifa ajustada divide el mismo salario entre las horas realmente trabajadas: 52.000 con semanas de 40 horas y 10 días sin sueldo equivalen a 26,00 por hora. Los totales semanal y mensual siguen mostrando el salario indicado.",
        },
        {
          q: "¿Incluye impuestos y deducciones?",
          a: "No — todas las cifras son salario bruto antes del impuesto sobre la renta, cotizaciones y otras deducciones. El neto depende de su tramo fiscal y su ubicación, así que trate estos resultados como cifras brutas de comparación.",
        },
      ],
      deepDive: [
        {
          heading: "La base de 2.080 horas y sus dos supuestos",
          paragraphs: [
            "Dividir entre 40 × 52 = 2.080 horas es la convención estándar detrás de la mayoría de las ofertas, y embedded dos supuestos que conviene nombrar: que le pagan las 52 semanas (vacaciones pagadas incluidas) y que el horario semanal nominal refleja las horas realmente trabajadas. Para un empleo asalariado con permisos pagados y poca hora extra, 2.080 es un denominador justo.",
            "El denominador cambia la respuesta por completo. El mismo salario de 65.000 son 31,25 por hora sobre un año de 2.080 horas, 35,75 si realmente trabaja semanas de 45 horas, y más de 40 si los días sin sueldo encogen el año pagado. Por eso los campos de horario importan más de lo que parecen — la tarifa horaria no es una propiedad del salario, sino del salario dividido entre las horas.",
            "La convención de 2.080 tiene además un eco legal en EE. UU.: las pruebas de exención de horas extra históricamente referencian niveles salariales, no montos horarios, una de las razones por las que los empleos asalariados se cotizan anualmente incluso midiendo el trabajo por horas. Volver a la tarifa horaria recupera la unidad que las comparaciones necesitan de verdad.",
          ],
        },
        {
          heading: "Lo que revela la tarifa ajustada",
          paragraphs: [
            "La tarifa nominal y la ajustada pueden diferir bastante, y la brecha es el precio del tiempo libre sin sueldo. Cada día sin sueldo resta un quinto de semana laboral del denominador, así que diez días acortan el año a unas 50 semanas y empujan la tarifa efectiva un 4% hacia arriba. El salario se queda fijo; solo cambian sus horas trabajadas.",
            "Esta cifra ajustada es la base honesta para comparar un empleo asalariado con uno por horas. Un puesto asalariado que parece equivalente a la tarifa nominal suele perder cuando entran horas extra no pagadas o contratos sin permiso retribuido — la vista por hora real trabajada expone lo que el número anual esconde.",
            "Fíjese en lo que la tarifa ajustada no hace: no pone precio al descanso en sí. El tiempo pagado tiene valor más allá de la aritmética — es ingreso en días que no trabaja. La tarifa ajustada estrecha la comparación a las horas realmente trabajadas, justo lo que quiere para comparar esfuerzo y justo lo que no debe usar sola para decisiones de calidad de vida.",
          ],
        },
        {
          heading: "Lecturas erróneas frecuentes y uso recomendado",
          paragraphs: [
            "La lectura errónea más común es tratar la cifra horaria como una oferta que podría conseguir de verdad. Un salario de 52.000 “equivale” a 25,00 por hora sobre el papel, pero pocos empleadores contratarían esas mismas horas a 25,00 por hora — la compensación asalariada empaqueta permisos pagados, bajas e ingreso predecible. Use la cifra horaria para comparar, no para renegociar.",
            "La segunda es olvidar que la nómina mensual divide por igual. Anual ÷ 12 paga lo mismo en febrero que en julio sin importar los días laborables; los ciclos semanales o quincenales no. Si su presupuesto es semanal, use la cifra semanal, no un doceavo del anual.",
            "Todo se calcula localmente en su navegador — su salario nunca sale del dispositivo, algo que importa al probar cifras de una oferta en negociación. Un buen flujo: calcule su salario actual, luego la oferta rival con su horario verdadero (días sin sueldo incluidos), y compare las tarifas ajustadas en lugar de los anuales de portada.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de salário por hora",
      tagline:
        "Converta um salário anual em valores por hora, dia, semana, quinzena e mês — e veja o valor por hora ajustado após descontar os dias não remunerados.",
      intro: [
        "Informe um salário anual com sua jornada normal — horas por semana e semanas por ano — e a calculadora decompõe nos valores usados em vagas e contracheques: por hora, por dia, semanal, quinzenal e mensal. A semana padrão de 40 horas ao longo de 52 semanas já vem preenchida.",
        "Se você tem dias não remunerados, o valor por hora ajustado mostra quanto o mesmo salário rende por hora efetivamente trabalhada, já que cada dia não remunerado tira um quinto de uma semana de trabalho do ano.",
      ],
      steps: [
        "Digite o salário anual.",
        "Defina as horas por semana e as semanas por ano (40 e 52 por padrão).",
        "Informe os dias não remunerados por ano, se houver.",
        "Veja o valor por hora e os equivalentes diário, semanal, quinzenal e mensal.",
      ],
      faqs: [
        {
          q: "Como o valor por hora é calculado?",
          a: "Hora = salário anual ÷ (horas por semana × semanas por ano). Com as 40 horas e 52 semanas padrão, um salário de 52.000 dá exatamente 25,00 por hora. O valor diário usa uma semana de 5 dias, o semanal é o anual dividido pelas semanas, o quinzenal é o dobro e o mensal é o anual dividido por 12.",
        },
        {
          q: "Como os dias não remunerados mudam o resultado?",
          a: "Cada dia não remunerado tira um quinto de uma semana de trabalho, então 10 dias encurtam o ano para cerca de 50 semanas trabalhadas. O valor ajustado divide o mesmo salário pelas horas efetivamente trabalhadas: 52.000 com semanas de 40 horas e 10 dias não remunerados equivalem a 26,00 por hora. Os totais semanal e mensal continuam mostrando o salário informado.",
        },
        {
          q: "Inclui impostos e descontos?",
          a: "Não — todos os valores são brutos, antes de imposto de renda, contribuições e outros descontos. O salário líquido depende da sua faixa tributária e da sua região, então trate esses resultados como números brutos de comparação.",
        },
      ],
      deepDive: [
        {
          heading: "A base de 2.080 horas e seus dois pressupostos",
          paragraphs: [
            "Dividir por 40 × 52 = 2.080 horas é a convenção padrão por trás da maioria das propostas, e ela embute dois pressupostos que vale nomear: que você é pago nas 52 semanas (férias remuneradas incluídas) e que a jornada semanal nominal reflete as horas realmente trabalhadas. Para um cargo assalariado com folgas pagas e hora extra modesta, 2.080 é um denominador justo.",
            "O denominador muda a resposta por completo. O mesmo salário de 65.000 são 31,25 por hora num ano de 2.080 horas, 35,75 se você realmente trabalha semanas de 45 horas, e mais de 40 se dias não remunerados encurtam o ano pago. Por isso os campos de jornada importam mais do que parecem — o valor por hora não é propriedade do salário, é propriedade do salário dividido pelas horas.",
            "A convenção de 2.080 também tem eco legal nos EUA: os testes de isenção de horas extras historicamente referenciam níveis salariais, não valores horários — uma das razões de cargos assalariados serem cotados em valor anual mesmo medindo o trabalho por horas. Voltar ao valor por hora recupera a unidade que as comparações realmente precisam.",
          ],
        },
        {
          heading: "O que o valor ajustado revela",
          paragraphs: [
            "O valor nominal e o ajustado podem divergir bastante, e a diferença é o preço do tempo de folga não remunerado. Cada dia não remunerado tira um quinto de semana de trabalho do denominador, então dez dias encurtam o ano para cerca de 50 semanas e empurram o valor efetivo uns 4% para cima. O salário fica fixo; só mudam suas horas trabalhadas.",
            "Esse número ajustado é a base honesta para comparar um cargo assalariado com um por hora. Um posto assalariado que parece equivalente pela taxa nominal costuma perder quando entram horas extras não pagas ou contratos sem folga remunerada — a visão por hora efetivamente trabalhada expõe o que o número anual esconde.",
            "Note o que o valor ajustado não faz: ele não põe preço à folga em si. Tempo remunerado tem valor além da aritmética — é renda em dias em que você não trabalha. O valor ajustado estreita a comparação às horas efetivamente trabalhadas, exatamente o que você quer para comparar esforço e exatamente o que não deve usar sozinho para decisões de qualidade de vida.",
          ],
        },
        {
          heading: "Leituras erradas comuns e como usar",
          paragraphs: [
            "A leitura errada mais comum é tratar o valor por hora como uma oferta que você conseguiria de fato. Um salário de 52.000 “equivale” a 25,00 por hora no papel, mas poucos empregadores contratariam essas mesmas horas a 25,00 por hora — a remuneração assalariada empacota folgas pagas, licenças e renda previsível. Use o valor por hora para comparar, não para renegociar.",
            "A segunda é esquecer que o pagamento mensal divide por igual. Anual ÷ 12 paga o mesmo em fevereiro e julho, sem olhar dias úteis; os ciclos semanal e quinzenal não. Se seu orçamento é semanal, use o valor semanal, não um doze avos do anual.",
            "Tudo é calculado localmente no navegador — seu salário nunca sai do aparelho, o que importa ao testar números de uma proposta em negociação. Um bom fluxo: rode seu salário atual, depois a proposta concorrente com sua jornada verdadeira (dias não remunerados incluídos), e compare os valores ajustados por hora em vez dos anuais de vitrine.",
          ],
        },
      ],
    },
  },
});
