import { unitTool } from "../_lib/unit-tool";

export default unitTool({
  slug: "time-converter",
  icon: "clock",
  cat: "time",
  related: ["timestamp-converter", "age-calculator", "date-calculator", "speed-converter", "energy-converter", "area-converter", "data-converter", "volume-converter", "weight-converter", "temperature-converter"],
  copy: {
    en: {
      name: "Time Unit Converter",
      tagline: "Seconds, minutes, hours, days, weeks, months and years — with the month/year caveat explained.",
      intro: [
        "Developers converting milliseconds to minutes for timeout configs, project managers turning work hours into person-days, students checking how many seconds a semester contains, and scientists switching between microseconds and nanoseconds all need time units — and the answer must be exact, not approximate.",
        "Six significant digits, with exactness where it exists: a minute is exactly 60 seconds, an hour exactly 3,600, a day exactly 86,400. Years and months are shown using their conventional averages (365.25-day Julian year) because calendar months vary from 28 to 31 days — the averages are labeled as such.",
        "Every unit is a fixed multiple of the second, the SI base unit of time. The conversion chain never rounds intermediate values, so converting nanoseconds → hours → days keeps every digit intact. Calendar-dependent units use the standard mean values rather than pretending calendar precision.",
        "Time spans five orders of magnitude in daily use — from milliseconds in code to decades in planning. This converter displays the whole ladder simultaneously, so you can see that 90 minutes is 1.5 hours, 5,400 seconds and 0.0625 days without re-entering anything.",
      ],
      faq: [
        {
          q: "Why is a month 30.44 days here?",
          a: "A calendar month ranges from 28 to 31 days, so duration math uses the average over the Gregorian cycle: 30.4369 days. For exact calendar date arithmetic, use the Date Calculator instead.",
        },
      ],
    },
    zh: {
      name: "时间单位换算",
      tagline: "秒、分、时、天、周、月、年互转,月/年的口径明确标注,不悄悄取整。",
      intro: [
        "在时间单位之间换算时长。历法上的月和年长短不一,这里采用惯用平均值(每月 30.44 天、每年 365.2425 天)并明确说明——不做暗箱取整。",
        "适合项目工期估算、订阅价格对比、科学计时和倒计时场景。",
      ],
      faq: [
        {
          q: "为什么这里一个月按 30.44 天算?",
          a: "历法上的月在 28–31 天之间浮动,所以时长换算采用格里高利历周期的平均值:30.4369 天。要按具体日期精确计算,请用“日期计算器”。",
        },
      ],
    },
    ja: {
      name: "時間の単位換算",
      tagline: "秒・分・時・日・週・月・年を換算。月/年の基準を明示し、黙って丸めません。",
      intro: [
        "時間の長さを単位の間で変換します。暦の月や年は長さが一定でないため、慣用の平均(月 30.44 日、年 365.2425 日)を使い、その旨を明示します。",
        "プロジェクトの見積もり、サブスク料金の比較、実験のタイミング、カウントダウンに便利です。",
      ],
      faq: [
        {
          q: "なぜ 1 か月を 30.44 日とするの?",
          a: "暦の月は 28〜31 日でばらつくため、期間の計算ではグレゴリオ暦の周期平均 30.4369 日を使います。暦日そのもので計算したい場合は「日付計算」をご利用ください。",
        },
      ],
    },
    es: {
      name: "Conversor de unidades de tiempo",
      tagline:
        "Segundos, minutos, horas, días, semanas, meses y años, con el matiz de mes/año explicado.",
      intro: [
        "Convierte duraciones entre unidades de tiempo. Como los meses y años del calendario varían, se usan los promedios convencionales (30,44 días por mes, 365,2425 por año) y se avisa: sin redondeos silenciosos.",
        "Útil para estimar proyectos, comparar suscripciones, cronometraje científico y cuentas atrás.",
      ],
      faq: [
        {
          q: "¿Por qué un mes son 30,44 días aquí?",
          a: "Un mes de calendario va de 28 a 31 días, así que el cálculo de duraciones usa el promedio del ciclo gregoriano: 30,4369 días. Para fechas exactas usa la Calculadora de fechas.",
        },
      ],
    },
    pt: {
      name: "Conversor de unidades de tempo",
      tagline:
        "Segundos, minutos, horas, dias, semanas, meses e anos, com a ressalva de mês/ano explicada.",
      intro: [
        "Converta durações entre unidades de tempo. Como meses e anos do calendário variam, usamos as médias convencionais (30,44 dias por mês, 365,2425 por ano) e dizemos isso — sem arredondamentos silenciosos.",
        "Útil para estimar projetos, comparar assinaturas, cronometragem científica e contagens regressivas.",
      ],
      faq: [
        {
          q: "Por que um mês tem 30,44 dias aqui?",
          a: "Um mês do calendário varia de 28 a 31 dias, então o cálculo de durações usa a média do ciclo gregoriano: 30,4369 dias. Para datas exatas, use a Calculadora de datas.",
        },
      ],
    },
  },
});
