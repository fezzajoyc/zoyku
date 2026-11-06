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
      deepDive: [
        {
          heading: "The second: the only clock physics certifies",
          paragraphs: [
            "Everything above the second on this page is exact arithmetic: a minute is 60 s by definition, an hour 3,600, a day 86,400. The second itself is no longer tied to Earth's rotation but to atomic physics — 9,192,631,770 periods of the radiation of a cesium-133 atom, a definition adopted in 1967 that keeps clocks honest even as the planet's spin wobbles.",
            "That exactness is why ladder conversions never drift: nanoseconds → milliseconds → hours is pure multiplication by defined integers. Rounding enters only at the display, capped at six significant digits by the site's number formatter.",
            "Earth's rotation is why atomic time and solar time slowly disagree — leap seconds exist to patch the gap, and 'a day is exactly 86,400 seconds' is a convention of duration math, not an astronomical guarantee. Questions that span real dates belong to the date calculator; this page handles pure durations.",
          ],
        },
        {
          heading: "Months and years are averages, on purpose",
          paragraphs: [
            "Calendar months run from 28 to 31 days, so duration math needs a convention. This tool uses the mean Gregorian values: 30.436875 days per month (365.2425 ÷ 12) and 365.2425 days per year — the average over the full 400-year Gregorian cycle, whose 97 leap years are exactly why the mean year is not 365.25.",
            "The 365.25 shortcut ('Julian year') differs from the Gregorian mean by about a day every 2,800 years — negligible for a project plan, not for orbital mechanics or long-term scheduling. Either way it is an average: converting '3 months' here gives 91.31 days, while three actual calendar months can span anywhere from 89 to 92.",
            "The practical rule: when the input is a duration (a subscription term, a build time, a half-life), the averages are the right answer; when the input involves real dates (a contract deadline, a birthday), use a date calculator instead — calendars add whole days irregularly, and no single factor survives that.",
          ],
        },
        {
          heading: "Where duration math earns its keep",
          paragraphs: [
            "Developers live here: timeouts in milliseconds, cron intervals, rate-limit windows — 1,500 ms is 1.5 s is 0.000417 h, and seeing the whole ladder at once beats repeating a mental division. Audio and video work runs on the same reflex: 90 minutes is 5,400 seconds, not a rounding accident.",
            "Business planning hits the averages immediately: a '90-day trial' is 0.247 years, monthly billing × 12 is not exactly a year, and a 30-day month in a contract differs from February by about 7%. Writing durations in days when it matters sidesteps the whole question — and this converter shows the day-equivalent of every unit side by side.",
            "Everything runs locally in your browser, so the page responds instantly and works offline. What it shows are duration conventions stated out loud rather than smuggled in. Timestamps and countdowns built on real dates are the job of the related timestamp and date tools.",
          ],
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
      deepDive: [
        {
          heading: "秒:唯一被物理学认证的钟",
          paragraphs: [
            "这一页秒以上的换算全是精确算术:一分钟定义为 60 秒,一小时 3,600,一天 86,400。秒本身也不再挂在地球自转上,而是挂在原子物理上——铯-133 辐射的 9,192,631,770 个周期,1967 年确定的定义,让钟表在地球自转漂移时依然诚实。",
            "正因如此,阶梯换算从不漂移:纳秒→毫秒→小时就是乘以定义好的整数,纯粹干净。舍入只在显示层出现,由站内数字格式化封顶在六位有效数字。",
            "地球自转是原子时与太阳时渐渐不一致的原因——闰秒就是为补这条缝而生;“一天恰好 86,400 秒”是时长计算的约定,不是天文学的担保。涉及真实日期的跨度问题请交给日期计算器;这一页只处理纯时长。",
          ],
        },
        {
          heading: "月和年是有意取的平均值",
          paragraphs: [
            "历法上的月在 28–31 天之间浮动,时长计算需要一个约定。本工具采用格里高利历平均值:每月 30.436875 天(365.2425 ÷ 12),每年 365.2425 天——这是格里高利历 400 年完整周期的平均,97 个闰年正是平均年不等于 365.25 的原因。",
            "“365.25”(儒略年)这个速记与格里高利平均值每约 2,800 年差一天——对项目计划可忽略,对轨道力学和长期排程不行。无论如何它是平均值:这里换算“3 个月”得 91.31 天,而真实的三个历月可能跨 89 到 92 天。",
            "实用规则:输入是时长(订阅期、构建耗时、半衰期)时,平均值就是正确答案;输入涉及真实日期(合同截止日、生日)时,该用日期计算器——因为历法不规律地加整日,没有任何单一系数能扛住这一点。",
          ],
        },
        {
          heading: "时长计算真正派上用场的地方",
          paragraphs: [
            "开发者住在这里:超时用毫秒、定时任务间隔、限流窗口——1,500 ms 即 1.5 s 即 0.000417 h,一次看全整条阶梯,省得一遍遍心算除法。音视频工作用的是同一反射:90 分钟是 5,400 秒,不是舍入事故。",
            "业务规划立刻撞上平均值:“90 天试用”是 0.247 年,“按月计费 × 12”并不恰好一年,合同里的 30 天月与二月相差约 7%。要紧的地方直接用天数写时长,可以绕开全部问题——而本换算器把每个单位的“天数等价”并排显示。",
            "一切都在浏览器本地运行,页面即时响应、离线可用。它显示的是明说的时长约定,而不是偷渡进来的口径。建立在真实日期上的时间戳与倒计时,交给相关的时间戳与日期工具。",
          ],
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
      deepDive: [
        {
          heading: "秒:物理学が保証する唯一の時計",
          paragraphs: [
            "このページの秒より上はすべて正確な算術です。1 分は定義により 60 秒、1 時間は 3,600、1 日は 86,400。秒そのものはもう地球の自転ではなく原子物理に結び付いています。セシウム 133 の放射の 9,192,631,770 周期——1967 年に採択された定義が、地球の自転が揺らいでも時計を正直に保ちます。",
            "正確だからこそ、階段の換算は決してずれません。ナノ秒→ミリ秒→時間は、定義された整数の掛け算そのものです。丸めは表示だけで発生し、サイトの数値フォーマッタが有効数字 6 桁で封をします。",
            "地球の自転こそ、原子時と太陽時がゆっくり食い違う理由です。うるう秒はその隙間を継ぐために存在し、「1 日は正確に 86,400 秒」は期間計算の取り決めであって、天文学の保証ではありません。実在の日付にまたがる問いは日付計算ツールの領分で、このページは純粋な期間だけを扱います。",
          ],
        },
        {
          heading: "月と年は、意図的に平均値",
          paragraphs: [
            "暦の月は 28〜31 日にばらつくため、期間計算には取り決めが要ります。このツールはグレゴリオ暦の平均値を使います。1 か月 = 30.436875 日(365.2425 ÷ 12)、1 年 = 365.2425 日。400 年の完全なうるう周期の平均で、97 回のうるう年があるからこそ、平均年は 365.25 ではないのです。",
            "「365.25」(ユリウス年)という簡略値はグレゴリオ平均と約 2,800 年ごとに 1 日ずれます。プロジェクトの見積もりなら無視でき、軌道力学や長期の計画では無視できません。いずれにせよ平均値です。ここで「3 か月」は 91.31 日ですが、実際の 3 か月は 89〜92 日にまたがり得ます。",
            "実務のルールはこうです。入力が期間(サブスクの期間、ビルド時間、半減期)なら平均が正解。入力に実在の日付が関わる(契約の期限、誕生日)なら日付計算ツールを使う——暦は不規則に丸 1 日を足すので、どの単一係数もそれを乗り切れません。",
          ],
        },
        {
          heading: "期間計算が活きる場所",
          paragraphs: [
            "開発者はここに住んでいます。タイムアウトはミリ秒、cron の間隔、レート制限の窓——1,500 ms は 1.5 s で 0.000417 h。階段全体を一度に見られるほうが、暗算の割り算を繰り返すより速い。音声や動画の作業も同じ反射神経です。90 分は 5,400 秒で、丸めの事故ではありません。",
            "ビジネスの計画はすぐ平均に当たります。「90 日のトライアル」は 0.247 年、「月額 × 12」は正確には 1 年ではない、契約の 30 日月は 2 月と約 7% 違う。重要な場面では日数で書けば問いごと回避でき、このコンバーターは各単位の「日換算値」を並べて見せます。",
            "すべてブラウザ内で動くので、ページは即応的でオフラインでも使えます。表示されるのは、隠さず明示された期間の取り決めです。実在の日付に立つタイムスタンプやカウントダウンは、関連のタイムスタンプ・日付ツールの担当です。",
          ],
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
      deepDive: [
        {
          heading: "El segundo: el único reloj que la física certifica",
          paragraphs: [
            "Todo lo que está por encima del segundo en esta página es aritmética exacta: un minuto son 60 s por definición, una hora 3.600, un día 86.400. El segundo en sí ya no se cuelga de la rotación terrestre sino de la física atómica: 9.192.631.770 periodos de la radiación de un átomo de cesio-133, una definición adoptada en 1967 que mantiene los relojes honestos aun cuando el giro del planeta titubea.",
            "Esa exactitud es la razón de que la escalera de conversiones nunca derive: de nanosegundos a milisegundos a horas es multiplicación pura por enteros definidos. El redondeo entra solo en pantalla, con el tope de seis cifras significativas del formateador numérico del sitio.",
            "La rotación de la Tierra es la causa de que el tiempo atómico y el solar diverjan despacio: los segundos intercalares existen para remendar la grieta, y \"un día son exactamente 86.400 segundos\" es una convención de la aritmética de duraciones, no una garantía astronómica. Las preguntas que cruzan fechas reales son cosa de la calculadora de fechas; esta página trata solo duraciones puras.",
          ],
        },
        {
          heading: "Meses y años son promedios, a propósito",
          paragraphs: [
            "Los meses de calendario van de 28 a 31 días, así que la aritmética de duraciones necesita una convención. Esta herramienta usa los valores medios gregorianos: 30,436875 días por mes (365,2425 ÷ 12) y 365,2425 días por año — el promedio del ciclo completo de 400 años gregorianos, cuyos 97 años bisiestos explican que el año medio no sea 365,25.",
            "El atajo de 365,25 (\"año juliano\") se separa de la media gregoriana en un día cada unos 2.800 años: insignificante para un plan de proyecto, no para mecánica orbital o programación a largo plazo. En cualquier caso es un promedio: convertir \"3 meses\" aquí da 91,31 días, mientras que tres meses de calendario reales pueden abarcar de 89 a 92.",
            "La regla práctica: cuando la entrada es una duración (una suscripción, un tiempo de compilación, una vida media), los promedios son la respuesta correcta; cuando la entrada implica fechas reales (un plazo de contrato, un cumpleaños), toca la calculadora de fechas, porque los calendarios añaden días enteros de forma irregular y ningún factor único sobrevive a eso.",
          ],
        },
        {
          heading: "Dónde gana su sueldo la aritmética de duraciones",
          paragraphs: [
            "Los desarrolladores viven aquí: timeouts en milisegundos, intervalos de cron, ventanas de límite de peticiones — 1.500 ms son 1,5 s son 0,000417 h, y ver la escalera entera de una vez vence a repetir la división mental. El trabajo de audio y vídeo usa el mismo reflejo: 90 minutos son 5.400 s, no un accidente de redondeo.",
            "La planificación de negocio choca con los promedios enseguida: una \"prueba de 90 días\" son 0,247 años, la facturación mensual × 12 no es exactamente un año, y un mes de 30 días de contrato difiere de febrero en un 7% aproximado. Escribir duraciones en días cuando importa esquiva la pregunta entera — y este conversor muestra el equivalente en días de cada unidad, lado a lado.",
            "Todo corre en tu navegador: la página responde al instante y funciona sin conexión. Lo que muestra son convenciones de duración declaradas, no coladas. Las marcas de tiempo y cuentas atrás construidas sobre fechas reales quedan en manos de las herramientas de timestamp y de fechas.",
          ],
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
      deepDive: [
        {
          heading: "O segundo: o único relógio que a física certifica",
          paragraphs: [
            "Tudo acima do segundo nesta página é aritmética exata: um minuto são 60 s por definição, uma hora 3.600, um dia 86.400. O segundo em si não pende mais da rotação da Terra, e sim da física atômica: 9.192.631.770 períodos da radiação de um átomo de césio-133, definição adotada em 1967 que mantém os relógios honestos mesmo com o giro do planeta oscilando.",
            "É essa exatidão que faz a escada de conversões nunca derivar: de nanossegundos a milissegundos a horas é multiplicação pura por inteiros definidos. O arredondamento entra só na tela, com o teto de seis algarismos significativos do formatador numérico do site.",
            "A rotação da Terra é o motivo de o tempo atômico e o solar divergirem devagar — os segundos intercalados existem para remendar a fresta, e \"um dia são exatamente 86.400 segundos\" é uma convenção da aritmética de durações, não uma garantia astronômica. Perguntas que atravessam datas reais são da calculadora de datas; esta página trata só de durações puras.",
          ],
        },
        {
          heading: "Meses e anos são médias, de propósito",
          paragraphs: [
            "Meses de calendário variam de 28 a 31 dias, então a aritmética de durações precisa de uma convenção. Esta ferramenta usa os valores médios gregorianos: 30,436875 dias por mês (365,2425 ÷ 12) e 365,2425 dias por ano — a média do ciclo completo de 400 anos do calendário gregoriano, cujos 97 anos bissextos explicam por que o ano médio não é 365,25.",
            "O atalho de 365,25 (\"ano juliano\") se afasta da média gregoriana um dia a cada uns 2.800 anos: desprezível para um plano de projeto, não para mecânica orbital ou planejamento de longo prazo. De todo jeito é uma média: converter \"3 meses\" aqui dá 91,31 dias, enquanto três meses reais de calendário podem abranger de 89 a 92.",
            "A regra prática: quando a entrada é uma duração (uma assinatura, um tempo de compilação, uma meia-vida), as médias são a resposta certa; quando a entrada envolve datas reais (um prazo de contrato, um aniversário), cabe à calculadora de datas, porque os calendários somam dias inteiros de forma irregular e nenhum fator único sobrevive a isso.",
          ],
        },
        {
          heading: "Onde a aritmética de durações ganha o pão",
          paragraphs: [
            "Desenvolvedores moram aqui: timeouts em milissegundos, intervalos de cron, janelas de rate limit — 1.500 ms são 1,5 s são 0,000417 h, e ver a escada inteira de uma vez ganha de repetir a divisão mental. Trabalho com áudio e vídeo usa o mesmo reflexo: 90 minutos são 5.400 s, não um acidente de arredondamento.",
            "Planejamento de negócios esbarra nas médias na hora: um \"teste de 90 dias\" são 0,247 ano, cobrança mensal × 12 não é exatamente um ano, e um mês de 30 dias de contrato difere de fevereiro em cerca de 7%. Escrever durações em dias quando importa contorna a pergunta inteira — e este conversor mostra o equivalente em dias de cada unidade, lado a lado.",
            "Tudo roda no seu navegador: a página responde na hora e funciona offline. O que ela mostra são convenções de duração declaradas, não escondidas. Timestamps e contagens regressivas construídos sobre datas reais ficam por conta das ferramentas de timestamp e de datas.",
          ],
        },
      ],
    },
  },
});
