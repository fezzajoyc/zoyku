import { CalcEngineDate } from "../_engines/calc-engine-date";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "age-calculator",
  category: "utility",
  icon: "clock",
  engine: { component: CalcEngineDate, props: { kind: "age" } },
  related: ["date-calculator", "timestamp-converter", "time-converter", "timezone-converter"],
  copy: {
    en: {
      name: "Age Calculator",
      tagline: "Work out an exact age in years, months and days, total days lived, and a live countdown to the next birthday — calendar accurate.",
      intro: [
        "Enter a date of birth and this calculator reports the exact age — years, months and days, not an approximation — plus total months and total days lived. It also counts down to the next birthday with the weekday it falls on.",
        "The “age at date” field defaults to today and can be changed to any past or future date, which makes it easy to answer questions like “how old was she on graduation day?”.",
      ],
      steps: [
        "Pick the date of birth.",
        "Leave the age-at date on today, or change it to any other date.",
        "Read the exact age, total months and days, and the next-birthday countdown.",
      ],
      faqs: [
        {
          q: "How is the age in years, months and days computed?",
          a: "By calendar arithmetic, not an average month length: years and months are counted whole, and leftover days are measured against the actual length of the month — including leap years. Someone born on 29 February is counted a year older on 1 March in non-leap years.",
        },
        {
          q: "Can I calculate an age at a date in the past or future?",
          a: "Yes. The “age at date” box is editable, so you can compute a historical age or check how old someone will be at a future event. The birth date must not be after the age-at date.",
        },
        {
          q: "Why does the total-days number matter?",
          a: "Total days lived is the figure used for “days on earth” style milestones and for systems that store ages in days. It is computed from calendar dates in UTC so daylight-saving shifts cannot make it off by one.",
        },
      ],
    },
    zh: {
      name: "年龄计算器",
      tagline: "精确计算几岁几月零几天、累计天数,并倒数下一个生日的日期与星期——按日历精确运算,不是估算。",
      intro: [
        "输入出生日期,即可得到精确年龄——几岁、几月、零几天,而不是约数——同时给出累计月数和累计天数,并倒数下一个生日的日期与星期。",
        "“计算到哪一天”默认为今天,也可以改成过去或未来的任意日期,轻松回答“她毕业那天多少岁”这类问题。",
      ],
      steps: [
        "选择出生日期。",
        "“计算到哪一天”保持今天不变,或改成其他日期。",
        "查看精确年龄、累计月数和天数,以及下一个生日倒计时。",
      ],
      faqs: [
        {
          q: "几岁几月零几天是怎么算出来的?",
          a: "按真实日历计算,而不是按平均月长:年、月按整数计,余下天数参照当月实际长度——闰年也已包含。2 月 29 日出生的人,在平年按 3 月 1 日长一岁。",
        },
        {
          q: "可以计算过去或未来某一天的年龄吗?",
          a: "可以。“计算到哪一天”可以任意修改,既能算历史年龄,也能算未来某个活动那天对方多大。出生日期不能晚于计算日期。",
        },
        {
          q: "累计天数有什么用?",
          a: "“来到这个世界第 N 天”这类纪念日、以及以天数存储年龄的系统都用得上。它按 UTC 的日历日期计算,不受夏令时影响,不会差一天。",
        },
      ],
    },
    ja: {
      name: "年齢計算",
      tagline: "歳・か月・日単位の正確な年齢と累計日数を算出し、次の誕生日までのカウントダウンも表示。暦に基づく正確な計算です。",
      intro: [
        "生年月日を入力すると、概算ではなく正確な年齢(歳・か月・日)に加えて累計月数・累計日数を表示し、次の誕生日までの日数とその曜日も数えます。",
        "「起算日」は既定で今日ですが、過去や未来の任意の日付に変更できるので「卒業式の日は何歳だったか」のような質問にもすぐ答えられます。",
      ],
      steps: [
        "生年月日を選びます。",
        "起算日は今日のままでも、別の日付に変えても構いません。",
        "正確な年齢・累計月数・日数・次の誕生日カウントダウンを確認します。",
      ],
      faqs: [
        {
          q: "歳・か月・日の年齢はどう計算していますか?",
          a: "平均的な月の長さではなく暦に基づいて計算します。年と月を丸ごと数え、残りの日は当月の実際の長さで測ります(うるう年を含む)。2 月 29 日生まれは平年では 3 月 1 日にひとつ年を取ります。",
        },
        {
          q: "過去や未来のある時点の年齢も計算できますか?",
          a: "はい。「起算日」は自由に編集できるので、過去の年齢や将来のイベント時点の年齢も計算できます。生年月日が起算日より後になっていなければ大丈夫です。",
        },
        {
          q: "累計日数には何の意味がありますか?",
          a: "「生まれて N 日目」の記念日や、年齢を日数で扱うシステムで使われます。UTC の暦日から計算するため、サマータイムによって 1 日ずれることはありません。",
        },
      ],
    },
    es: {
      name: "Calculadora de edad",
      tagline: "Obtenga la edad exacta en años, meses y días, el total de días vividos y la cuenta atrás al próximo cumpleaños, con precisión de calendario.",
      intro: [
        "Introduzca la fecha de nacimiento y esta calculadora da la edad exacta — años, meses y días, sin aproximaciones — además de los meses y días totales vividos. También cuenta los días que faltan para el próximo cumpleaños y el día de la semana en que cae.",
        "El campo «calcular a fecha» se toma el día de hoy por defecto y admite cualquier otra fecha, pasada o futura, ideal para preguntas como «¿qué edad tenía el día de la graduación?».",
      ],
      steps: [
        "Elija la fecha de nacimiento.",
        "Deje la fecha de cálculo en hoy o cámbiela por otra.",
        "Lea la edad exacta, los totales y la cuenta atrás al cumpleaños.",
      ],
      faqs: [
        {
          q: "¿Cómo se calcula la edad en años, meses y días?",
          a: "Con aritmética de calendario, no con un mes promedio: los años y meses se cuentan enteros y los días restantes se miden según la longitud real del mes, incluidos los bisiestos. Quien nace el 29 de febrero cumple años el 1 de marzo en años no bisiestos.",
        },
        {
          q: "¿Puedo calcular la edad en una fecha pasada o futura?",
          a: "Sí. El campo «calcular a fecha» es editable, así que puede obtener una edad histórica o comprobar la edad en un evento futuro. La fecha de nacimiento no puede ser posterior a la fecha de cálculo.",
        },
        {
          q: "¿Para qué sirve el número de días totales?",
          a: "Los días vividos en total se usan en hitos tipo «días en la Tierra» y en sistemas que almacenan la edad en días. Se calcula con fechas de calendario en UTC, de modo que el horario de verano no puede alterarlo en uno.",
        },
      ],
    },
    pt: {
      name: "Calculadora de idade",
      tagline: "Descubra a idade exata em anos, meses e dias, o total de dias vividos e a contagem regressiva para o próximo aniversário — precisão de calendário.",
      intro: [
        "Informe a data de nascimento e esta calculadora mostra a idade exata — anos, meses e dias, sem aproximação — além dos meses e dias totais vividos. Ela também conta os dias até o próximo aniversário e o dia da semana em que cai.",
        "O campo «calcular na data» usa o dia de hoje por padrão e aceita qualquer outra data, passada ou futura — perfeito para perguntas como «quantos anos ela tinha no dia da formatura?».",
      ],
      steps: [
        "Escolha a data de nascimento.",
        "Deixe a data de cálculo em hoje ou troque por outra.",
        "Veja a idade exata, os totais e a contagem para o próximo aniversário.",
      ],
      faqs: [
        {
          q: "Como a idade em anos, meses e dias é calculada?",
          a: "Com aritmética de calendário, não com um mês médio: anos e meses são contados inteiros e os dias restantes medidos pelo comprimento real do mês, incluindo anos bissextos. Quem nasce em 29 de fevereiro faz aniversário em 1º de março em anos não bissextos.",
        },
        {
          q: "Posso calcular a idade em uma data passada ou futura?",
          a: "Sim. O campo «calcular na data» é editável, então dá para obter uma idade histórica ou conferir a idade em um evento futuro. A data de nascimento não pode ser posterior à data de cálculo.",
        },
        {
          q: "Para que serve o total de dias?",
          a: "Os dias vividos aparecem em marcos do tipo «dias na Terra» e em sistemas que guardam idade em dias. O cálculo usa datas de calendário em UTC, então o horário de verão não pode alterá-lo em um.",
        },
      ],
    },
  },
});
