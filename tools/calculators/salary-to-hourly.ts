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
    },
  },
});
