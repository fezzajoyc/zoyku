import { CalcEngineDate } from "../_engines/calc-engine-date";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "age-calculator",
  category: "utility",
  icon: "clock",
  engine: { component: CalcEngineDate, props: { kind: "age" } },
  related: ["date-calculator", "timestamp-converter", "time-converter", "timezone-converter", "body-fat-calculator", "tip-calculator", "cooking-conversion", "calorie-calculator", "aspect-ratio-calculator", "bmr-calculator"],
  copy: {
    en: {
      name: "Age Calculator",
      tagline: "Work out an exact age in years, months and days, total days lived, and a live countdown to the next birthday — calendar accurate.",
      intro: [
        "Enter a date of birth and this calculator reports the exact age — years, months and days, not an approximation — plus total months and total days lived. It also counts down to the next birthday with the weekday it falls on.",
        "The “age at date” field defaults to today and can be changed to any past or future date, which makes it easy to answer questions like “how old was she on graduation day?”.",
        "The calculation is true calendar arithmetic, not an average month: it walks year by year, borrowing days from the actual lengths of the months in between, so 29 February birthdays, 31-day months and leap years like 2024 all land exactly. Total days come from the difference in UTC day numbers, so daylight-saving shifts cannot move a result.",
        "Unlike quick mental math or a spreadsheet cell, the result is the years/months/days breakdown people actually quote, plus the next-birthday countdown in one place. Note that jurisdictions count age differently — a person born on 29 February often legally ages on 1 March in non-leap years — so for official purposes the documents, not this estimate, are authoritative.",
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
      deepDive: [
        {
          heading: "Why “age” is not one single number",
          paragraphs: [
            "Ask three systems for someone's age and you may get three answers, because age is a convention before it is a computation. The most common convention — the one this calculator uses — is completed age: how many full years, months and days have actually elapsed since birth. Official documents in most countries use this “years only” cut of the same number, which is why a person whose birthday is tomorrow is still legally one year younger today.",
            "Other conventions exist for historical and cultural reasons. Several East Asian systems traditionally counted a person as one year old at birth and aged everyone together on the new year, which adds one or two years to the Western figure; South Korea formally adopted the international standard for most legal purposes in 2023, ending much of that ambiguity. Some medical and insurance contexts instead use adjusted or rounded ages.",
            "There is also a time-of-day subtlety this tool deliberately ignores: someone born at 23:50 is, strictly speaking, a few hours younger on any given date than someone born at 00:10 the same day. Because the calculator works on whole calendar dates with no birth time, both get the same age — the convention almost every form and registry follows anyway.",
          ],
        },
        {
          heading: "Leap days, month lengths and time zones",
          paragraphs: [
            "The years/months/days breakdown is real calendar arithmetic, not division by an average. Months are consumed whole from the birth date forward, and leftover days are measured against the actual length of the month that remains — so a span across a 31-day month, a 28-day February or the 2024 leap year all come out exact. A birth date of 29 February is treated as aging on 1 March in common years, matching the convention most jurisdictions use.",
            "Total days sidestep the calendar entirely: it subtracts UTC day numbers, which are just a count of absolute days. That makes the figure immune to daylight-saving transitions, which can otherwise make a local-time difference land one day short or long. No matter where on Earth you run the page, “days lived” is the same number.",
            "The next-birthday countdown walks forward from the age-at date to the next occurrence of the birth month and day, and reports the weekday it lands on — useful for planning the party before doing any arithmetic. In a non-leap year, a 29 February birthday is targeted at 1 March for the same reason as above.",
          ],
        },
        {
          heading: "Compared with spreadsheets, and privacy",
          paragraphs: [
            "Spreadsheets can compute age gaps with date-difference functions, but their month arithmetic is a frequent source of errors — the functions are inconsistently documented between products, and it is easy to get an inclusive-exclusive boundary wrong without noticing. This tool shows the breakdown, the totals and the countdown together so you can sanity-check one against another at a glance.",
            "For official purposes — visas, school enrollment, retirement rules — the documents and the applicable jurisdiction's convention are authoritative, not any calculator. Rules such as “age on 1 January for school cohorts” override pure elapsed time, and this tool does not model them.",
            "Privacy is structural here: the birth date is entered into your browser only, the arithmetic runs in local JavaScript, and nothing is uploaded, logged or stored. That matters because a full birth date plus a context is enough to identify a person, so a calculator that keeps inputs local is the only kind you should paste real dates of birth into.",
          ],
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
      deepDive: [
        {
          heading: "“年龄”从来不是一个数",
          paragraphs: [
            "同一套出生日期,问三个系统可能得到三个答案,因为年龄先是口径、才是计算。本工具用的是最通行的口径——实足年龄:出生以来真正度过的整年、整月、零几天。各国证件上那个“几岁”就是同一个数的只取整年版本,所以明天过生日的人,今天在法律意义上仍然小一岁。",
            "其他口径出于历史和文化原因而存在。东亚传统上把出生即算一岁、逢新年大家一起长岁,比西式实足岁大一两岁;韩国已于 2023 年在多数法律场景改用国际标准实足岁,这类分歧大大减少。医疗、保险等场景有时也会用调整过的或取整的年龄。",
            "还有一个人为忽略的细节:严格来说,23:50 出生的人比同一天 00:10 出生的人在任何一个日期上都小几个小时。本工具按整天日历日期计算、不采集出生时间,两者得到同样的年龄——这几乎也是所有表格和登记系统的默认做法。",
          ],
        },
        {
          heading: "闰日、月长与时区",
          paragraphs: [
            "几年几月零几天是真实的日历运算,不是除以平均月长。从出生日期起整月整月地消耗,余下天数按所在月份的实际长度计量——跨 31 天的大月、28 天的二月、2024 这样的闰年都精确无误。2 月 29 日出生的人按平年 3 月 1 日长岁,与多数司法辖区的惯例一致。",
            "累计天数则完全绕开日历:它减的是 UTC 天数序号,本质上是绝对天数的差。夏令时切换无法影响它——用本地时间求差可能在切换日前后差出一天。无论在地球哪个角落打开页面,“来到世界第 N 天”都是同一个数。",
            "下一个生日倒计时从计算日起向后找到出生月日的下一次出现,并给出落点是星期几——开派对之前先看日子。平年里 2 月 29 日的生日同样按 3 月 1 日锁定。",
          ],
        },
        {
          heading: "与电子表格比,以及隐私",
          paragraphs: [
            "电子表格也能算日期差,但月级运算常出错的两个原因:各产品的日期差函数文档不统一,以及含头含尾边界很容易弄反而不自知。本工具把拆分、累计、倒计时放在一起,互相一对照,错没错一眼便知。",
            "官方用途——签证、入学、退休规则——以文件和所在辖区的口径为准,不是任何计算器。诸如“按 1 月 1 日统一计算入学年龄”这类规则会覆盖纯粹的经过时间,本工具不建模这些规则。",
            "隐私是结构性的:出生日期只进你的浏览器,运算在本地 JavaScript 里完成,不上传、不留存。完整的出生日期加上一点上下文足以锁定一个人,所以要贴真实生日,就该用输入不出本地的计算器。",
          ],
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
      deepDive: [
        {
          heading: "「年齢」はひとつの数ではない",
          paragraphs: [
            "同じ生年月日でも、尋ねるシステムによって答えが変わることがあります。年齢は計算の前に約束事だからです。このツールが使うのは最も一般的な満年齢:生まれてから実際に経過した満の年・か月・日です。各国の証明書に記載される「歳」は同じ数の年の部分だけを切り出したもので、明日誕生日の人は今日の時点で法律上まだひとつ若いのです。",
            "別の数え方も歴史的・文化的な理由で存在します。東アジアでは伝統的に出生時に 1 歳とし、新年に全員が一緒に歳を取る方式が使われてきました(西方式より 1〜2 歳大きくなる)。韓国は 2023 年に多くの法律場面で国際標準の満年齢を採用し、この曖昧さは大きく減りました。医療や保険の場面では調整済み・丸め込みの年齢が使われることもあります。",
            "意図的に無視している細かい点もひとつ。厳密に言えば、23:50 生まれは同日の 00:10 生まれよりどの日付時点でも数時間若いはずです。この計算は暦日単位で生まれた時刻を扱わないため、両者は同じ年齢になります。これはほぼすべての申請書や登記システムの前提と同じです。",
          ],
        },
        {
          heading: "うるう日・月の長さ・タイムゾーン",
          paragraphs: [
            "歳・か月・日の内訳は本当の暦計算で、平均月長による除算ではありません。生年月日からか月をまるごと消化し、残りの日は当月の実際の長さで測ります。31 日の月、28 日の 2 月、2024 年のようなうるう年も正確です。2 月 29 日生まれは平年では 3 月 1 日にひとつ年を取ると扱い、多くの法域の慣行と一致します。",
            "累計日数は暦を完全に回避します。引き算の対象は UTC の日番号、つまり絶対的な日数です。ローカル時刻の差分はサマータイム切替の前後で 1 日ずれることがありますが、この数字は影響を受けません。地球上のどこで開いても「生まれて N 日目」は同じ数です。",
            "次の誕生日カウントダウンは、起算日から生まれ月日の次の出現日へ進み、その曜日も報告します。パーティーの計画は計算より先に日程から。平年の 2 月 29 日の誕生日は、同じ理由で 3 月 1 日に合わせられます。",
          ],
        },
        {
          heading: "表計算との比較とプライバシー",
          paragraphs: [
            "表計算でも日付差は求められますが、か月単位の演算はよく間違えます。製品ごとに差関数の仕様が一致していないことと、両端を含むか含まないかの境界を間違えても気づきにくいことが原因です。このツールは内訳・累計・カウントダウンを並べて見せるので、互いを突き合わせて正誤をひと目で確認できます。",
            "公式な用途(ビザ、入学、退職の規定)では、書類とその法域の取り決めが優先です。「1 月 1 日時点の年齢で学年を決める」のような行政の規則は純粋な経過時間に優先し、このツールはそれをモデル化しません。",
            "プライバシーは構造的な違いです。生年月日はブラウザの中だけに入力され、計算はローカルの JavaScript で完結し、送信も記録も保存もありません。完全な生年月日は少しの文脈と組み合わせるだけで個人を特定できます。本物の誕生日を入力するなら、入力が端末の外に出ない計算器を選ぶべきです。",
          ],
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
      deepDive: [
        {
          heading: "«Edad» no es un solo número",
          paragraphs: [
            "Pregunte a tres sistemas la edad de una persona y puede obtener tres respuestas, porque la edad es una convención antes que un cálculo. La más habitual — la que usa esta calculadora — es la edad cumplida: los años, meses y días completos que han pasado de verdad desde el nacimiento. El «años» de los documentos oficiales en la mayoría de países es el mismo número cortado en los años completos, razón por la que quien cumple mañana sigue siendo legalmente un año menor hoy.",
            "Otras convenciones existen por razones históricas y culturales. Varios sistemas de Asia Oriental contaban tradicionalmente a la persona como de un año al nacer y todos cumplían juntos en el año nuevo, lo que añade uno o dos años a la cifra occidental; Corea del Sur adoptó formalmente el estándar internacional para la mayoría de efectos legales en 2023, y buena parte de esa ambigüedad desapareció. En contextos médicos y aseguradores a veces se usan edades ajustadas o redondeadas.",
            "Hay también un matiz horario que esta herramienta ignora deliberadamente: en rigor, alguien nacido a las 23:50 es unas horas menor en cualquier fecha que alguien nacido a las 00:10 del mismo día. Como la calculadora trabaja con fechas completas sin hora de nacimiento, ambos obtienen la misma edad — la convención que casi todo formulario y registro aplica de todos modos.",
          ],
        },
        {
          heading: "Bisiestos, longitudes de mes y zonas horarias",
          paragraphs: [
            "El desglose en años/meses/días es aritmética de calendario real, no una división por un mes promedio. Los meses se consumen enteros desde la fecha de nacimiento y los días restantes se miden según la longitud real del mes en curso, así que un tramo por un mes de 31 días, un febrero de 28 o el año bisiesto 2024 salen exactos. Un nacimiento el 29 de febrero se trata como que cumple el 1 de marzo en años comunes, igual que la convención de la mayoría de jurisdicciones.",
            "Los días totales evitan el calendario por completo: restan números de día UTC, que no son más que un recuento de días absolutos. Por eso la cifra es inmune a los cambios de horario de verano, que con horas locales pueden dejar una diferencia un día corta o larga. Donde sea que abra la página, «días vividos» es el mismo número.",
            "La cuenta atrás al cumpleaños avanza desde la fecha de cálculo hasta la próxima aparición del mes y día de nacimiento, e indica el día de la semana en que cae — útil para planear la fiesta antes de hacer cuentas. En un año no bisiesto, un cumpleaños de 29 de febrero se fija en el 1 de marzo por la misma razón.",
          ],
        },
        {
          heading: "Frente a las hojas de cálculo, y privacidad",
          paragraphs: [
            "Las hojas de cálculo también calculan diferencias de fechas, pero su aritmética de meses es fuente frecuente de errores: las funciones de diferencia están documentadas de forma desigual entre productos y es fácil invertir un límite de inclusión sin darse cuenta. Esta herramienta muestra el desglose, los totales y la cuenta atrás juntos, de modo que contrastar unos con otros es un vistazo.",
            "Para fines oficiales — visados, escolarización, reglas de jubilación — mandan los documentos y la convención de la jurisdicción aplicable, no una calculadora. Reglas como «la edad a 1 de enero fija el cohort escolar» prevalecen sobre el tiempo transcurrido, y esta herramienta no las modeliza.",
            "La privacidad es estructural: la fecha de nacimiento se introduce solo en su navegador, la aritmética corre en JavaScript local y nada se sube, se registra ni se guarda. Una fecha de nacimiento completa con un poco de contexto basta para identificar a una persona, así que si va a pegar fechas reales, hágalo en una calculadora cuyos datos no salgan del dispositivo.",
          ],
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
      deepDive: [
        {
          heading: "«Idade» não é um número só",
          paragraphs: [
            "Pergunte a três sistemas a idade de uma pessoa e pode receber três respostas, porque idade é uma convenção antes de ser um cálculo. A mais comum — a que esta calculadora usa — é a idade cumprida: os anos, meses e dias completos que realmente passaram desde o nascimento. Os «anos» dos documentos oficiais na maioria dos países são o mesmo número cortado nos anos inteiros, por isso quem faz aniversário amanhã continua legalmente um ano mais novo hoje.",
            "Outras convenções existem por razões históricas e culturais. Vários sistemas do Leste Asiático tradicionalmente contavam a pessoa com um ano ao nascer, e todos cumpriam juntos no ano-novo, o que soma um ou dois anos à cifra ocidental; a Coreia do Sul adotou formalmente o padrão internacional para a maioria dos efeitos legais em 2023, e boa parte dessa ambiguidade acabou. Em contextos médicos e de seguros às vezes se usam idades ajustadas ou arredondadas.",
            "Há ainda uma sutileza de horário que esta ferramenta ignora de propósito: estritamente, alguém nascido às 23:50 é algumas horas mais novo em qualquer data do que alguém nascido às 00:10 do mesmo dia. Como a calculadora trabalha com datas inteiras, sem hora de nascimento, ambos recebem a mesma idade — a convenção que quase todo formulário e registro aplica de qualquer forma.",
          ],
        },
        {
          heading: "Bissextos, comprimento dos meses e fusos",
          paragraphs: [
            "O detalhamento em anos/meses/dias é aritmética de calendário real, não uma divisão por um mês médio. Os meses são consumidos inteiros a partir da data de nascimento e as sobras são medidas pelo comprimento real do mês em curso, então um trecho por um mês de 31 dias, um fevereiro de 28 ou o ano bissexto de 2024 sai exato. Quem nasce em 29 de fevereiro é tratado como fazend aniversário em 1º de março em anos comuns, como manda a convenção da maioria das jurisdições.",
            "O total de dias contorna o calendário por completo: subtrai números de dia UTC, que não são nada além de uma contagem de dias absolutos. Por isso a cifra é imune às transições de horário de verão, que com horas locais podem deixar uma diferença um dia curta ou longa. Em qualquer canto do planeta, «dias vividos» é o mesmo número.",
            "A contagem para o próximo aniversário avança da data de cálculo até a próxima ocorrência do mês e dia de nascimento e informa o dia da semana em que cai — planeje a festa antes de fazer contas. Em ano não bissexto, um aniversário de 29 de fevereiro é fixado em 1º de março pelo mesmo motivo.",
          ],
        },
        {
          heading: "Comparação com planilhas, e privacidade",
          paragraphs: [
            "Planilhas também calculam diferenças de datas, mas a aritmética de meses é fonte frequente de erro: as funções de diferença têm documentação desigual entre produtos e é fácil inverter um limite de inclusão sem perceber. Esta ferramenta mostra detalhamento, totais e contagem juntos, então cruzar um com outro é coisa de um relance.",
            "Para fins oficiais — vistos, matrícula escolar, regras de aposentadoria — valem os documentos e a convenção da jurisdição aplicável, não uma calculadora. Regras como «a idade em 1º de janeiro define a turma escolar» prevalecem sobre o tempo decorrido, e esta ferramenta não as modela.",
            "A privacidade é estrutural: a data de nascimento entra apenas no seu navegador, a aritmética roda em JavaScript local e nada é enviado, registrado ou guardado. Uma data de nascimento completa com um pouco de contexto basta para identificar uma pessoa, então se vai colar datas reais, que seja numa calculadora cujos dados não saiam do aparelho.",
          ],
        },
      ],
    },
  },
});
