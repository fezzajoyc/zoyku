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
        "Both modes run on true calendar arithmetic in UTC: the gap mode counts year, month and day boundaries the way civil calendars define them, while the add/subtract mode walks whole days, so daylight-saving shifts never move a result. Leap years follow the Gregorian rule — divisible by 4, except centuries not divisible by 400 — so 2000 was one and 1900 was not.",
        "Compared with counting on a wall calendar, the tool gives the y/m/d breakdown, total days and the resulting weekday together, which is what deadline clauses and anniversary plans actually need. Different jurisdictions count periods differently — some count complete months first — so for contract language, state the exact dates rather than trusting either convention.",
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
      deepDive: [
        {
          heading: "Why “days between” is trickier than it looks",
          paragraphs: [
            "Counting days between two dates is trivial for computers and surprisingly ambiguous for humans. This tool gives three readings on purpose: the calendar breakdown (years, months, days), the raw total of days, and weeks plus leftover days — because contracts, anniversaries and rental terms each quote a different one. A tenancy of “1 year 6 months” and a tenancy of “547 days” can describe different spans depending on which convention the clause uses.",
            "The month arithmetic follows the same convention people use for anniversaries: full years and full months are counted first, and the remainder is measured against the real lengths of the months involved. That is why “one month after 31 January” lands on 28 February in a common year — a real edge case that tripped many early date libraries.",
            "Add and subtract mode walks whole days instead, which sidesteps month-boundary questions entirely: adding 90 calendar days to 31 January always gives the same answer no matter how your library handles month ends. When a deadline says “days”, it almost always means these calendar days — the business-days question is covered in the FAQ above.",
          ],
        },
        {
          heading: "Leap years and the Gregorian rule",
          paragraphs: [
            "Leap years follow the full Gregorian rule, not the schoolbook “every four years”: a year is leap when divisible by 4, except centuries, which must be divisible by 400. That is why 2000 was a leap year but 1900 was not, and why 2100 will not be either. Any span crossing one of those century edges is computed correctly without special handling on your part.",
            "The 29 February itself is treated as the last day of February, so a difference that spans a leap day is not inflated by one day, and a date that does not exist in a target year (29 February in a common year) resolves to 28 February rather than slipping into March. These two decisions keep results stable across software that disagrees on the details.",
            "All arithmetic runs on UTC day numbers, so daylight-saving transitions cannot shift a result by a day. This matters around the March and November clock changes: date math done in local time can land one day short or long in some environments, while whole-UTC-day counting gives the same answer everywhere on Earth.",
          ],
        },
        {
          heading: "Practical workflows and privacy",
          paragraphs: [
            "Deadline clauses, visa validity windows, trial periods and warranty terms are the everyday users of this page. A good habit: compute the span in both readings — calendar breakdown and raw days — and quote the raw days in the contract alongside the words. Numbers are harder to argue with than month names.",
            "For anniversaries and remembrances, the resulting weekday is often the real answer sought — “what weekday is our 10th anniversary?” — which is why it is displayed together with the date rather than hidden. For long spans, remember the century rule: a contract running past 2100 will cross a non-leap century year, and this tool already accounts for it.",
            "Everything is computed locally: the dates never leave your browser, nothing is uploaded or logged, and the page works offline. Contract dates, medical dates and personal milestones are sensitive precisely because they are identifying when combined with anything else — a calculator that keeps inputs local is the right kind to paste them into.",
          ],
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
      deepDive: [
        {
          heading: "“日期差”为什么比看上去难",
          paragraphs: [
            "对计算机来说数日期差很简单,对人却出人意料地含糊。本工具刻意同时给出三种读数:日历拆分(几年几月零几天)、总天数、周数加余数——因为合同、纪念日、租期各自引用的是不同的一种。“1 年 6 个月”的租期和“547 天”的租期,取决于条款采用的口径,可能描述不同的时长。",
            "月级运算沿用人们数周年纪念日的惯例:先数整年、整月,余数按所跨月份的真实长度计量。所以“1 月 31 日之后一个月”落在平年的 2 月 28 日——这是早年许多日期库都栽过的真实边界情况。",
            "加减模式则按整日走,完全绕开月尾问题:1 月 31 日加 90 个日历日,无论哪个库怎么处理月尾,答案都相同。期限写“天”时几乎总指日历日——工作日口径见上方 FAQ。",
          ],
        },
        {
          heading: "闰年与格里高利规则",
          paragraphs: [
            "闰年遵循完整的格里高利规则,而不是课本里的“四年一闰”:能被 4 整除为闰,但世纪年必须能被 400 整除。所以 2000 年是闰年、1900 年不是、2100 年也不会是。跨越这些世纪边界的区间无需你做任何特殊处理,结果照样正确。",
            "2 月 29 日本身按 2 月最后一天处理,跨闰日的区间不会多算一天;目标年份里不存在的日期(平年的 2 月 29 日)会落到 2 月 28 日,而不是滑进 3 月。这两个决定让结果在不同软件之间保持稳定,哪怕它们对细节的处理并不一致。",
            "所有运算基于 UTC 天数,夏令时切换不会让结果偏移一天。这在 3 月和 11 月的拨钟日前后尤其要紧:本地时间的日期运算在某些环境会差出一天,按整 UTC 天计数则全球同答。",
          ],
        },
        {
          heading: "实用工作流与隐私",
          paragraphs: [
            "合同期限条款、签证有效期、试用期、保修期是本页的日常用户。一个好习惯:两种口径都算一遍——日历拆分和总天数——然后在合同里把总天数和文字并排写上。数字比月份名更难被争论。",
            "对纪念日和祭日来说,结果日期的星期往往才是真正要问的(“我们十周年那天是星期几?”),所以星期和日期一起展示,而不是藏起来。长跨度要记得世纪规则:合同若跨过 2100 年,会遇到一个不闰的世纪年,本工具已计入。",
            "一切本地计算:日期不出浏览器,不上传、不留痕,页面离线可用。合同日期、医疗日期、个人纪念日的敏感之处恰恰在于和其他信息组合后能锁定一个人——要贴这类日期,就该贴进输入不出本地的计算器。",
          ],
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
      deepDive: [
        {
          heading: "「日付の差」は見た目より厄介",
          paragraphs: [
            "2 つの日付の間の日数はコンピューターには簡単ですが、人間には意外に曖昧です。このツールは意図的に 3 つの読み方を同時に示します。暦に基づく内訳(年・か月・日)、総日数、週数と端数です。契約・記念日・賃貸期間がそれぞれ別の読み方を引用するからです。「1 年 6 か月」の賃貸と「547 日」の賃貸は、条項が採る基準によって異なる期間を指すことがあります。",
            "か月単位の計算は記念日を数える人の慣行に合わせます。満の年と満のか月を先に数え、端数は対象月の実際の長さで測ります。だから「1 月 31 日の 1 か月後」は平年なら 2 月 28 日に着地します。初期の日付ライブラリが多くつまずいた実在のエッジケースです。",
            "加減モードは丸ごと 1 日単位で歩むため、月末の問題自体を回避します。1 月 31 日に 90 暦日を足す答えは、どのライブラリが月末をどう扱っても同じです。期限に「日」と書いてあれば、ほぼ常にこの暦日のことです。営業日の基準については上の FAQ を参照してください。",
          ],
        },
        {
          heading: "うるう年とグレゴリオ規則",
          paragraphs: [
            "うるう年は教科書的な「4 年ごと」ではなく、完全なグレゴリオ規則に従います。4 で割り切れる年はうるう年、ただし世紀年は 400 で割り切れる場合に限る。だから 2000 年はうるう年でしたが、1900 年は違いましたし、2100 年も違います。この世紀の境をまたぐ期間も、特別な操作なしに正しく計算されます。",
            "2 月 29 日自体は 2 月の最終日として扱うため、うるう日をまたぐ差が 1 日水増しされることはなく、対象の年に存在しない日付(平年の 2 月 29 日)は 3 月に滑り込むのではなく 2 月 28 日に落ち着きます。この 2 つの決めごとのおかげで、細部の扱いが違うソフトウェアの間でも結果が安定します。",
            "すべての演算は UTC の日番号で行うため、サマータイム切替で結果が 1 日ずれることはありません。3 月と 11 月の時計変更の前後で特に重要です。ローカル時刻での日付演算は環境によって 1 日短く(長く)出ることがありますが、UTC の丸ごと日数の計算なら地球上のどこでも同じ答えです。",
          ],
        },
        {
          heading: "実務の流れとプライバシー",
          paragraphs: [
            "期限条項、ビザの有効期間、トライアル期間、保証期間がこのページの日常的な利用者です。良い習慣は、2 つの読み方で期間を算出することです。暦の内訳と総日数の両方を出し、契約書には総日数を文言と並べて記載する。数字のほうが月名より議論の余地が少ないものです。",
            "記念日や法要では、結果日の曜日こそが本当に知りたい答えのことが多い(「10 周年は何曜日?」)。だから曜日は日付と一緒に表示され、隠されてはいません。長期間では世紀の規則を思い出してください。2100 年をまたぐ契約はうるう年でない世紀年を通過しますが、このツールはすでに織り込み済みです。",
            "計算はすべてローカルです。日付はブラウザの外に出ず、送信も記録もなく、ページはオフラインで動きます。契約の日付、医療の日付、個人の記念日は、他の情報と組み合わせると個人を特定できるからこそ敏感です。入力するなら、入力が端末の外に出ない計算器が正しい選択です。",
          ],
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
      deepDive: [
        {
          heading: "Por qué «los días entre fechas» es más difícil de lo que parece",
          paragraphs: [
            "Contar los días entre dos fechas es trivial para un ordenador y sorprendentemente ambiguo para una persona. Esta herramienta da a propósito tres lecturas: el desglose de calendario (años, meses, días), el total bruto de días y las semanas con sus sobrantes — porque contratos, aniversarios y alquileres citan cada uno una distinta. Un alquiler de «1 año 6 meses» y uno de «547 días» pueden describir tramos diferentes según la convención que use la cláusula.",
            "La aritmética de meses sigue la misma convención que la gente usa para los aniversarios: primero se cuentan los años y meses completos, y el resto se mide según la longitud real de los meses implicados. Por eso «un mes después del 31 de enero» cae en el 28 de febrero en un año común — un caso límite real donde tropezaron muchas librerías de fechas tempranas.",
            "El modo de sumar y restar recorre días enteros, lo que esquiva por completo las preguntas de fin de mes: sumar 90 días de calendario al 31 de enero da siempre la misma respuesta, sin importar cómo trate su librería los finales de mes. Cuando un plazo dice «días», casi siempre son estos días de calendario; la cuestión de los días hábiles está en las FAQ de arriba.",
          ],
        },
        {
          heading: "Años bisiestos y la regla gregoriana",
          paragraphs: [
            "Los bisiestos siguen la regla gregoriana completa, no la escolar de «cada cuatro años»: un año es bisiesto si es divisible entre 4, salvo los seculares, que deben serlo entre 400. Por eso 2000 fue bisiesto y 1900 no, y 2100 tampoco lo será. Cualquier tramo que cruce alguno de esos bordes seculares se calcula bien sin que usted haga nada especial.",
            "El propio 29 de febrero se trata como último día de febrero, así que una diferencia que cruza un día bisiesto no se infla en uno, y una fecha que no existe en el año destino (29 de febrero en año común) resuelve al 28 de febrero en lugar de colarse en marzo. Estas dos decisiones mantienen los resultados estables entre programas que discrepan en los detalles.",
            "Toda la aritmética corre sobre números de día UTC, así que los cambios de horario no desplazan un resultado en un día. Esto importa alrededor de los cambios de marzo y noviembre: la matemática de fechas en hora local puede salir un día corta o larga en algunos entornos, mientras que contar días UTC completos da la misma respuesta en todo el planeta.",
          ],
        },
        {
          heading: "Flujos prácticos y privacidad",
          paragraphs: [
            "Cláusulas de plazo, ventanas de validez de visados, períodos de prueba y garantías son los usuarios cotidianos de esta página. Un buen hábito: calcule el tramo en las dos lecturas — desglose de calendario y días brutos — y cite los días brutos en el contrato junto con las palabras. Los números dan menos margen de discusión que los nombres de los meses.",
            "Para aniversarios y conmemoraciones, el día de la semana resultante suele ser la respuesta buscada — «¿qué día de la semana es nuestro décimo aniversario?» — y por eso se muestra junto a la fecha en vez de esconderse. En tramos largos recuerde la regla secular: un contrato que pase de 2100 cruzará un año secular no bisiesto, y esta herramienta ya lo tiene en cuenta.",
            "Todo se calcula localmente: las fechas nunca salen de su navegador, nada se sube ni se registra, y la página funciona sin conexión. Las fechas de contratos, médicas y personales son sensibles precisamente porque identifican al combinarse con cualquier otra cosa — la calculadora adecuada para pegarlas es una que mantenga los datos en local.",
          ],
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
      deepDive: [
        {
          heading: "Por que «dias entre datas» é mais complicado do que parece",
          paragraphs: [
            "Contar os dias entre duas datas é trivial para um computador e surpreendentemente ambíguo para uma pessoa. Esta ferramenta dá de propósito três leituras: o detalhamento de calendário (anos, meses, dias), o total bruto de dias e as semanas com as sobras — porque contratos, aniversários e aluguéis citam cada um uma diferente. Um aluguel de «1 ano e 6 meses» e um de «547 dias» podem descrever trechos diferentes conforme a convenção da cláusula.",
            "A aritmética de meses segue a mesma convenção que as pessoas usam para aniversários: primeiro se contam os anos e meses completos, e a sobra é medida pelos comprimentos reais dos meses envolvidos. Por isso «um mês depois de 31 de janeiro» cai em 28 de fevereiro em ano comum — um caso de borda real onde tropeçaram muitas bibliotecas de datas antigas.",
            "O modo de somar e subtrair anda em dias inteiros, o que contorna por completo as questões de virada de mês: somar 90 dias corridos a 31 de janeiro sempre dá a mesma resposta, não importa como sua biblioteca trate os fins de mês. Quando um prazo diz «dias», quase sempre são esses dias corridos; a questão dos dias úteis está nas FAQ acima.",
          ],
        },
        {
          heading: "Anos bissextos e a regra gregoriana",
          paragraphs: [
            "Os bissextos seguem a regra gregoriana completa, não a de escola «a cada quatro anos»: um ano é bissexto se divisível por 4, exceto os seculares, que precisam ser divisíveis por 400. Por isso 2000 foi bissexto e 1900 não foi, e 2100 também não será. Qualquer trecho que cruze um desses bordos seculares sai correto sem que você precise tratar nada à parte.",
            "O próprio 29 de fevereiro vale como último dia de fevereiro, então uma diferença que cruza um dia bissexto não ganha um dia de mais, e uma data que não existe no ano de destino (29 de fevereiro em ano comum) resolve para 28 de fevereiro em vez de escorregar para março. Essas duas decisões mantêm os resultados estáveis entre programas que discordam nos detalhes.",
            "Toda a aritmética roda sobre números de dia UTC, então transições de horário de verão não deslocam um resultado em um dia. Isso importa perto das mudanças de março e novembro: matemática de datas em horário local pode sair um dia a menos ou a mais em alguns ambientes, enquanto contar dias UTC inteiros dá a mesma resposta em todo o planeta.",
          ],
        },
        {
          heading: "Fluxos práticos e privacidade",
          paragraphs: [
            "Cláusulas de prazo, janelas de validade de visto, períodos de teste e de garantia são os usuários cotidianos desta página. Um bom hábito: calcule o trecho nas duas leituras — detalhamento de calendário e dias brutos — e cite os dias brutos no contrato junto com as palavras. Números dão menos margem a discussão do que nomes de meses.",
            "Para aniversários e homenagens, o dia da semana resultante costuma ser a resposta realmente buscada — «que dia da semana cai nosso décimo aniversário?» — e por isso ele aparece junto com a data em vez de ficar escondido. Em trechos longos, lembre da regra secular: um contrato que passe de 2100 cruzará um ano secular não bissexto, e esta ferramenta já considera isso.",
            "Tudo é calculado localmente: as datas nunca saem do seu navegador, nada é enviado nem registrado, e a página funciona offline. Datas de contratos, médicas e pessoais são sensíveis justamente porque identificam quando combinadas com qualquer outra coisa — a calculadora certa para colá-las é uma que mantém os dados no aparelho.",
          ],
        },
      ],
    },
  },
});
