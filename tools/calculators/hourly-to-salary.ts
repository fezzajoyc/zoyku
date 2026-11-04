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
    },
  },
});
