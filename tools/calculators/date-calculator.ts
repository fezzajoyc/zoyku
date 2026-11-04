import { CalcEngineDate } from "../_engines/calc-engine-date";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "date-calculator",
  category: "utility",
  icon: "rotate",
  engine: { component: CalcEngineDate, props: { kind: "date" } },
  related: ["age-calculator", "timestamp-converter", "time-converter", "timezone-converter", "body-fat-calculator", "tip-calculator", "cooking-conversion", "calorie-calculator", "aspect-ratio-calculator", "bmr-calculator"],
  copy: {
    en: {
      name: "Date Calculator",
      tagline: "Days between two dates in years, months and days — or add and subtract days from any date — with leap years handled exactly.",
      intro: [
        "Two everyday date problems in one place: measure the gap between two dates (calendar-accurate y/m/d, total days, weeks and leftover days), or walk N days forward or backward from a base date and get the resulting date with its weekday.",
        "Because the arithmetic is true calendar math — not an average month — a leap-day birthday, a 31-day month or a February span all come out exactly right, with no server involved.",
      ],
      steps: [
        "Choose Difference between dates, or Add / subtract days.",
        "Enter the two dates — or a base date and a day count.",
        "Read the exact breakdown and the resulting date with its weekday.",
      ],
      faqs: [
        {
          q: "How is the years/months/days difference computed?",
          a: "The same way people count anniversaries: full years, then full months, then leftover days measured against the real lengths of the months involved. The 29th of February is treated as the last day of February, so spans across leap years stay honest.",
        },
        {
          q: "Does “add 90 days” mean business days?",
          a: "No — the day count is calendar days, including weekends. For contract deadlines that count business days, add roughly 5 days per week of span as a first approximation, or use a dedicated business-day tool.",
        },
        {
          q: "Are the dates I enter sent anywhere?",
          a: "No. Both modes run entirely in your browser using JavaScript's date arithmetic; nothing is uploaded and nothing is stored.",
        },
      ],
    },
    zh: {
      name: "日期计算器",
      tagline: "计算两个日期相差几年几月零几天,或从任意日期加减 N 天——闰年精确处理,结果连星期几一起给出。",
      intro: [
        "一个页面解决两个日常日期问题:测量两个日期的间隔(按日历精确给出几年几月零几天、总天数、周数与余数),或从基准日期向前/向后走 N 天,得到结果日期与星期。",
        "计算采用真实日历运算而非平均月长——闰日、31 天的月份、跨 2 月的区间都能算准,且全程不经服务器。",
      ],
      steps: [
        "选择“日期差”或“加减天数”。",
        "输入两个日期——或基准日期与天数。",
        "查看精确拆分结果,以及结果日期和星期。",
      ],
      faqs: [
        {
          q: "几年几月零几天是怎么算的?",
          a: "和人们数周年纪念日的方式一致:先数整年,再数整月,余下天数按所跨月份的真实长度计算。2 月 29 日按 2 月最后一天处理,跨闰年的区间也不会失真。",
        },
        {
          q: "“加 90 天”是工作日吗?",
          a: "不是——天数按日历日计,包含周末。如果合同期限按工作日计算,可以粗略按每周 5 天折算,或使用专门的工作日计算工具。",
        },
        {
          q: "输入的日期会被上传吗?",
          a: "不会。两种模式都完全在浏览器里用 JavaScript 日期运算完成;不上传、不存储任何内容。",
        },
      ],
    },
    ja: {
      name: "日付計算",
      tagline: "2 つの日付の差を年・か月・日で表示、または基準日から日数を加減算。うるう年も正確に処理し、曜日付きで結果を出します。",
      intro: [
        "日常の 2 つの日付問題を 1 ページで解決します。2 つの日付の間隔(暦に基づく年/か月/日、総日数、週と端数)を測ることも、基準日から N 日前後した日付とその曜日を求めることもできます。",
        "平均的な月の長さではなく本当の暦で計算するため、うるう日・31 日の月・2 月をまたぐ期間も正確です。サーバーは介しません。",
      ],
      steps: [
        "「日付の差」か「日数の加減」を選びます。",
        "2 つの日付、または基準日と日数を入力します。",
        "正確な内訳と、曜日付きの結果日付を確認します。",
      ],
      faqs: [
        {
          q: "年・か月・日の差はどう計算しますか?",
          a: "記念日を数えるのと同じ方法です。まず満年、次に満か月、残りは対象月の実際の長さで測ります。2 月 29 日は 2 月の最終日として扱うため、うるう年をまたいでも正確です。",
        },
        {
          q: "「90 日追加」は営業日ベースですか?",
          a: "いいえ。日数は暦日(土日を含む)です。契約期限が営業日基準なら、概算として 1 週間あたり 5 日で換算するか、営業日専用ツールをご利用ください。",
        },
        {
          q: "入力した日付は送信されますか?",
          a: "いいえ。どちらのモードもブラウザ内の JavaScript の日付計算だけで完結し、アップロードも保存もされません。",
        },
      ],
    },
    es: {
      name: "Calculadora de fechas",
      tagline: "Los días entre dos fechas en años, meses y días — o sume y reste días de cualquier fecha — con los años bisiestos calculados con exactitud.",
      intro: [
        "Dos problemas cotidianos de fechas en un solo sitio: medir el intervalo entre dos fechas (años/meses/días de calendario, días totales, semanas y sobrantes) o avanzar y retroceder N días desde una fecha base y obtener la fecha resultante con su día de la semana.",
        "Como la aritmética es de calendario real — no un mes promedio — un 29 de febrero, un mes de 31 días o un tramo que cruza febrero salen exactos, sin intervención de ningún servidor.",
      ],
      steps: [
        "Elija Diferencia entre fechas o Sumar / restar días.",
        "Introduzca las dos fechas — o la fecha base y una cantidad de días.",
        "Lea el desglose exacto y la fecha resultante con su día de la semana.",
      ],
      faqs: [
        {
          q: "¿Cómo se calcula la diferencia en años, meses y días?",
          a: "Como se cuentan los aniversarios: años completos, luego meses completos y los días sobrantes según la longitud real de los meses implicados. El 29 de febrero se trata como último día de febrero, así que los tramos que cruzan años bisiestos no se alteran.",
        },
        {
          q: "¿«Sumar 90 días» son días hábiles?",
          a: "No — la cuenta es de días de calendario, incluidos los fines de semana. Para plazos contractuales en días hábiles, aproxime unos 5 días por semana o use una herramienta específica de días laborables.",
        },
        {
          q: "¿Se envían las fechas que introduzco?",
          a: "No. Ambos modos funcionan por completo en su navegador con la aritmética de fechas de JavaScript; nada se sube ni se guarda.",
        },
      ],
    },
    pt: {
      name: "Calculadora de datas",
      tagline: "Os dias entre duas datas em anos, meses e dias — ou some e subtraia dias de qualquer data — com anos bissextos tratados com exatidão.",
      intro: [
        "Dois problemas cotidianos de datas num só lugar: medir o intervalo entre duas datas (anos/meses/dias de calendário, total de dias, semanas e sobras) ou avançar e recuar N dias a partir de uma data base, recebendo a data resultante com o dia da semana.",
        "Como a aritmética é de calendário real — não um mês médio — um 29 de fevereiro, um mês de 31 dias ou um trecho que cruza fevereiro saem exatos, sem nenhum servidor envolvido.",
      ],
      steps: [
        "Escolha Diferença entre datas ou Somar / subtrair dias.",
        "Informe as duas datas — ou a data base e uma quantidade de dias.",
        "Veja o detalhamento exato e a data resultante com o dia da semana.",
      ],
      faqs: [
        {
          q: "Como a diferença em anos, meses e dias é calculada?",
          a: "Do mesmo jeito que se contam aniversários: anos completos, depois meses completos e as sobras medidas pelos comprimentos reais dos meses envolvidos. O 29 de fevereiro vale como último dia de fevereiro, então trechos que cruzam anos bissextos continuam honestos.",
        },
        {
          q: "«Somar 90 dias» são dias úteis?",
          a: "Não — a contagem é de dias corridos, incluindo fins de semana. Para prazos contratuais em dias úteis, aproxime cerca de 5 dias por semana ou use uma ferramenta específica de dias úteis.",
        },
        {
          q: "As datas que eu digitar são enviadas?",
          a: "Não. Os dois modos rodam inteiramente no navegador com a aritmética de datas do JavaScript; nada é enviado nem armazenado.",
        },
      ],
    },
  },
});
