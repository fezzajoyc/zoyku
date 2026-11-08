import { CalcEngineDueDate } from "../_engines/calc-engine-due";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "due-date-calculator",
  category: "utility",
  icon: "clock",
  engine: { component: CalcEngineDueDate },
  related: ["age-calculator", "date-calculator", "workdays-calculator", "sleep-calculator", "countdown-timer", "bmi-calculator"],
  copy: {
    en: {
      name: "Due Date Calculator",
      tagline: "Estimate a pregnancy due date from the first day of the last period and cycle length, see the current gestational age, and the 37–42 week full-term window.",
      intro: [
        "Enter the first day of the last menstrual period (LMP) and, if your cycle is not the textbook 28 days, its length. The tool applies Naegele's rule — LMP + 280 days — shifted by the difference between your cycle and 28 days, and shows the estimated due date, today's gestational age in weeks and days, the days remaining, the trimester, and the full-term window.",
        "The gestational age updates every day, because it counts from the LMP rather than from conception. Day 0 is 0 weeks 0 days; the due date lands at week 40. If the date is beyond week 40, the tool says so plainly instead of hiding it.",
        "Everything here is honest about what an estimate is. Obstetrics counts a due date from the LMP precisely because ovulation date is rarely known, assuming ovulation about two weeks before the next period would have started. A 30-day cycle pushes the estimate two days later; a 26-day cycle pulls it two days earlier. The real due date is a distribution, not a deadline.",
        "That is why the full-term window matters more than the single date: any birth between week 37 and week 42 is considered full term, and about half of births happen within a week either side of the estimate. The window is shown as two dates so you can plan work, family and travel around the whole range instead of one day.",
      ],
      steps: [
        "Enter the first day of the last menstrual period.",
        "Adjust the cycle length if it differs from 28 days.",
        "Read the estimated due date and today's gestational age.",
        "Plan around the full-term window, not the single date.",
      ],
      faqs: [
        {
          q: "How accurate is a due date from the last period?",
          a: "As a population statistic it is reasonable: with a known, regular cycle, roughly half of births occur within a week of the estimate. For an individual day it is inherently fuzzy — early ultrasound dating in the first trimester is measurably more accurate, and your prenatal provider's official estimate may differ from this one.",
        },
        {
          q: "Why does cycle length change the due date?",
          a: "Naegele's rule assumes a 28-day cycle with ovulation on day 14. If your cycle is 32 days, ovulation likely happened later relative to the LMP, so the estimate moves later by 4 days. The shift is a linear approximation; it works best for cycles near the normal range and is less reliable for irregular cycles.",
        },
        {
          q: "What counts as full term?",
          a: "Births between week 37 day 0 and week 42 day 0 are considered term, with early term (37–38 weeks) and full term (39–40 weeks) distinguished in modern obstetrics. The tool's window is the conservative whole: 21 days before the due date through 14 days after.",
        },
        {
          q: "Is this medical advice?",
          a: "No. It is a standard calendar calculation for orientation and planning. Your prenatal care provider tracks the official estimate, adjusts it with ultrasound measurements, and makes all clinical decisions. If anything concerns you, contact them — not this page.",
        },
      ],
      deepDive: [
        {
          heading: "Where Naegele's rule comes from, and what it assumes",
          paragraphs: [
            "The rule dates to the 19th century and survives because it is simple and roughly right at population scale: 280 days from the LMP, on the assumption of a 28-day cycle and ovulation on day 14. Its real input is not biology but convention — obstetric age is deliberately counted from the LMP because it is the one date almost every patient remembers.",
            "The assumptions show their limits at the edges. Cycles shorter than about 21 or longer than about 45 days make the linear shift unreliable, and irregular cycles make any single LMP-based date shaky. IVF pregnancies are dated from embryo transfer instead, which removes the ovulation guess entirely and moves the estimate for many patients.",
            "First-trimester ultrasound reconciles the two: measuring the embryo and working backwards gives a gestational age that overrides the LMP estimate when they disagree meaningfully. If your provider revises the date after a scan, treat the revised one as authoritative — the calendar rule is the starting point, not the final word.",
          ],
        },
        {
          heading: "Reading the full-term window instead of the single date",
          paragraphs: [
            "Framing matters: a due date behaves less like a delivery appointment and more like the center of a distribution. Roughly half of births land within a week on either side, about 80% within two weeks. Only about one in twenty arrives exactly on the estimated day. Planning everything around the single day invites needless anxiety in both directions.",
            "The 37–42 week window is what clinicians actually plan around: before 37 weeks is preterm and carries different care pathways; past 42 weeks typically triggers closer monitoring. Within the window, week 39–40 is statistically the densest region. Knowing where today's date sits inside the window turns 'when will it happen?' into a range with a shape.",
            "Practical planning follows the range: work handoffs, family visits and travel make more sense keyed to the window than to the single date. The tool shows the window as two concrete dates precisely so that plans can anchor to the earliest plausible week rather than to a day that statistics say most babies will miss.",
          ],
        },
        {
          heading: "Using the tool honestly",
          paragraphs: [
            "The calculation runs entirely in your browser — the dates you enter are never sent anywhere. It counts from the LMP with the cycle-length shift, reports today's gestational age each time you open it, and states plainly when the date is past the due date or the window.",
            "Be equally honest with the inputs: use the first day of actual bleeding, not spotting before it, and a cycle length measured over a few months rather than guessed. Small input errors move the estimate by days, which is invisible in the output but matters when comparing against an ultrasound date.",
            "Above all, treat every number here as planning material, not diagnosis. Providers make clinical decisions from measurements, history and examination — the calendar can only tell you where today sits in a statistical window. If the tool's estimate and your provider's differ, the provider's is the one to keep.",
          ],
        },
      ],
    },
    zh: {
      name: "预产期计算器",
      tagline: "由末次月经第一天和周期长度估算预产期,显示当前孕周、距预产期天数,以及 37–42 周的足月窗口。",
      intro: [
        "输入末次月经第一天(LMP);如果周期不是教科书式的 28 天,再输入周期长度。工具按 Naegele 规则(LMP + 280 天)并按周期与 28 天的差值平移,给出预产期、今天的孕周(几周零几天)、剩余天数、孕期阶段,以及足月窗口。",
        "孕周每天自动更新,因为它从末次月经起算,而不是从受孕起算。第 0 天是孕 0 周 0 天;预产期对应第 40 周。日期超过 40 周时,工具会如实显示,不做掩饰。",
        "这里的一切都对“估计”二字保持诚实。产科之所以从末次月经起算预产期,正是因为排卵日极少有人知道,规则假设排卵发生在下次月经开始前约两周。30 天周期把估计推后两天,26 天周期提前两天。真实的分娩时点是一个分布,不是截止日。",
        "所以足月窗口比单一日期更有用:孕 37–42 周之间出生都算足月,约一半的婴儿在预产期前后一周内出生。窗口以两个具体日期呈现,方便你围绕整个区间安排工作、家庭和出行,而不是押注某一天。",
      ],
      steps: [
        "输入末次月经的第一天。",
        "若周期不是 28 天,修改周期长度。",
        "查看预产期与今天的孕周。",
        "围绕足月窗口做计划,而不是只盯着预产期那一天。",
      ],
      faqs: [
        {
          q: "按末次月经算的预产期准吗?",
          a: "作为人群统计是合理的:周期规律且已知时,约一半的分娩发生在估计值前后一周内。但对具体某一天天然是模糊的——孕早期 B 超测龄明显更准,产检医生的官方估计可能与本工具不同。",
        },
        {
          q: "为什么周期长度会改变预产期?",
          a: "Naegele 规则假设 28 天周期、第 14 天排卵。若周期是 32 天,排卵相对末次月经更晚,估计就推后 4 天。这个平移是线性近似,对接近正常范围的周期效果最好;对不规律周期并不可靠。",
        },
        {
          q: "怎样才算足月?",
          a: "孕 37 周 0 天至 42 周 0 天之间出生都算足月;现代产科进一步区分早期足月(37–38 周)与完全足月(39–40 周)。本工具的窗口取保守的全范围:预产期前 21 天到后 14 天。",
        },
        {
          q: "这是医疗建议吗?",
          a: "不是。它只是一个用于了解与规划的日历计算。正式的孕周估计由产检医生跟踪、用 B 超测量修正,临床决策也由医生做出。如有任何疑虑,请直接联系医生,而不是本页面。",
        },
      ],
      deepDive: [
        {
          heading: "Naegele 规则从哪来,又假设了什么",
          paragraphs: [
            "这条规则可追溯到 19 世纪,沿用至今是因为它简单、且在人群尺度上大致正确:从末次月经起 280 天,假设 28 天周期、第 14 天排卵。它真正的输入不是生物学,而是约定——产科故意从末次月经起算,因为这是几乎每个孕妇都记得的日期。",
            "假设的局限在边缘处显现:短于约 21 天或长于约 45 天的周期,线性平移就不可靠;周期不规律时,任何基于末次月经的单一日期都不稳。试管婴儿妊娠改从胚胎移植日起算,完全绕开了排卵猜测,对不少孕妇会移动估计值。",
            "孕早期 B 超把两者对齐:测量胚胎再反推孕周,当它与末次月经估计有明显出入时,以 B 超为准。如果医生在扫查后修订了日期,以修订后的为准——日历规则是起点,不是最终结论。",
          ],
        },
        {
          heading: "看足月窗口,别只盯一天",
          paragraphs: [
            "表述方式很重要:预产期的行为更像一个分布的中心,而不是一张递送预约单。约一半的分娩落在前后一周内,约八成落在前后两周内;恰好落在估计那一天的只有约二十分之一。把所有事都压在某一天上,只会两头焦虑。",
            "37–42 周的窗口才是临床上真正用来规划的:37 周之前属于早产,照护路径不同;超过 42 周通常会加强监测。窗口内,39–40 周在统计上最密集。知道今天在窗口里的位置,能把“到底什么时候生?”变成一个有形状的区间。",
            "实操规划跟着区间走:工作交接、家人探望、出行安排以窗口为锚比以单日为锚更合理。工具把窗口显示为两个具体日期,正是为了让计划落在“最早可能的那个星期”,而不是落在一个统计上大多数宝宝都会错过的日子。",
          ],
        },
        {
          heading: "诚实地使用这个工具",
          paragraphs: [
            "计算完全在浏览器内完成——你输入的日期不会被发送到任何地方。它从末次月经加周期平移起算,每次打开都给出当天的孕周,并在超过预产期或窗口时如实说明。",
            "对输入也要同样诚实:用真正出血的第一天,而不是之前的点滴出血;周期长度用近几个月实测的平均值,别凭感觉填。小的输入偏差会让估计移动几天,输出上看不出来,但与 B 超日期对比时就有影响。",
            "最重要的是,把这里的每个数字都当作规划材料,而不是诊断。医生依据测量、病史和检查做临床决策——日历只能告诉你今天落在统计窗口的哪个位置。如果本工具的估计与医生的不同,以医生的为准。",
          ],
        },
      ],
    },
    ja: {
      name: "出産予定日計算",
      tagline: "最終月経開始日と周期の長さから出産予定日を推定し、今日の妊娠週数、残り日数、37〜42 週の正期産ウィンドウを表示します。",
      intro: [
        "最終月経開始日(LMP)を入力し、周期が教科書どおりの 28 日でなければその長さも入力します。このツールはネーゲレ法則(LMP + 280 日)を適用し、周期と 28 日の差だけずらして、出産予定日・今日の妊娠週数(週と日)・残り日数・妊娠期区分・正期産ウィンドウを表示します。",
        "妊娠週数は受精日ではなく LMP から数えるため、毎日自動的に更新されます。0 日目は妊娠 0 週 0 日、出産予定日は 40 週に相当します。40 週を過ぎた場合は、ごまかさずその旨を表示します。",
        "ここでは「推定」という言葉に誠実です。産科が予定日を LMP から数えるのは、排卵日を知っている人がほとんどいないからです。排卵は次回月経開始の約 2 週間前にあったと仮定します。30 日周期なら推定は 2 日後ろへ、26 日周期なら 2 日前へ動きます。現実の分娩時点は分布であって、締切ではありません。",
        "だからこそ、単一の日付より正期産ウィンドウの方が重要です。妊娠 37 〜 42 週の間の出産はすべて正期産とみなされ、出生の約半数は予定日の前後 1 週間以内に起きます。ウィンドウは 2 つの日付として表示され、仕事も家族の予定も移動も、一日ではなく範囲全体で計画できます。",
      ],
      steps: [
        "最終月経開始日を入力します。",
        "周期が 28 日でなければ周期の長さを修正します。",
        "出産予定日と今日の妊娠週数を確認します。",
        "予定日単独ではなく、正期産ウィンドウで計画します。",
      ],
      faqs: [
        {
          q: "最終月経からの予定日の精度は?",
          a: "集団統計としては妥当です。周期が既知で規則的なら、出生の約半数が推定の前後 1 週間に収まります。ただし特定の 1 日としてはもともと曖昧で、妊娠初期の超音波測定は明らかに精度が高く、産科医の正式な推定とは異なることがあります。",
        },
        {
          q: "なぜ周期の長さで予定日が変わるのですか?",
          a: "ネーゲレ法則は 28 日周期・14 日目排卵を仮定しています。周期が 32 日なら排卵は LMP から見て遅めで、推定は 4 日後ろへ動きます。このずらしは線形近似であり、正常範囲に近い周期ではうまく働きますが、不規則周期では信頼できません。",
        },
        {
          q: "正期産とはどの範囲ですか?",
          a: "妊娠 37 週 0 日から 42 週 0 日までの分娩を正期産とみなします。現代産科ではさらに早期正期産(37〜38 週)と完全正期産(39〜40 週)を区別します。このツールのウィンドウは保守的な全体範囲(予定日の 21 日前〜14 日後)です。",
        },
        {
          q: "これは医療アドバイスですか?",
          a: "いいえ。見通しを立てるための標準的な暦計算です。正式な週数の推定・超音波による修正・臨床判断はすべて産科医が行います。何か気になることがあれば、このページではなく担当医に連絡してください。",
        },
      ],
      deepDive: [
        {
          heading: "ネーゲレ法則の出所と前提",
          paragraphs: [
            "この法則は 19 世紀にさかのぼり、単純で集団尺度ではおおむね正しいために今も使われます。LMP から 280 日、28 日周期・14 日目排卵を仮定します。実際の入力は生物学ではなく規約です。産科が意図的に LMP から数えるのは、ほぼ全ての妊婦が覚えている唯一の日付だからです。",
            "前提の限界は端に現れます。21 日前後より短い、あるいは 45 日前後より長い周期では線形のずらしは当てにならず、不規則周期では LMP ベースの単一の日付自体が揺らぎます。体外受精妊娠は胚移植日から数えるため、排卵の推測が完全に不要になり、多くの妊婦で推定が動きます。",
            "妊娠初期の超音波が両者を整合させます。胎児を計測して遡れば、LMP 推定と意味のある食違いがあればそちらが優先されます。医師が検査後に予定日を修正したら、修正後を採用してください。暦の法則は出発点であって最終結論ではありません。",
          ],
        },
        {
          heading: "単一の日付ではなく正期産ウィンドウを読む",
          paragraphs: [
            "受け止め方次第です。予定日は出産の予約のようなものではなく、分布の中心に近い振る舞いをします。出生の約半数は前後 1 週間、約 8 割は前後 2 週間に収まり、推定日ちょうどに生まれるのは約 20 分の 1 です。すべてを 1 日に合わせると、両方向に不要な不安を招きます。",
            "臨床が実際に計画の対象とするのは 37〜42 週のウィンドウです。37 週未満は早産でケアの道筋が変わり、42 週を超えると通常はより密な監視に移ります。ウィンドウ内では 39〜40 週が統計的に最も密度が高い領域です。今日がウィンドウのどこにいるかを知れば、「いつになるのか?」が形のある範囲に変わります。",
            "実務的な計画は範囲に沿えます。仕事の引き継ぎ、家族の来訪、移動は単一の日ではなくウィンドウを基準にする方が合理的です。このツールがウィンドウを 2 つの日付で示すのは、統計的に多くの赤ちゃんが外れる「その日」ではなく、最も早い現実的な週に計画を固定できるようにするためです。",
          ],
        },
        {
          heading: "このツールを誠実に使う",
          paragraphs: [
            "計算はすべてブラウザ内で完結し、入力した日付がどこかへ送られることはありません。LMP と周期のずらしから数え、開くたびに今日の妊娠週数を示し、予定日やウィンドウを過ぎた場合はその旨を率直に表示します。",
            "入力も同じく誠実に。実出血の初日を使い(前の少量出血ではない)、周期の長さは数か月分の実測から。わずかな入力のずれで推定は数日動きます。出力では見えませんが、超音波の日付と突き合わせるときには効いてきます。",
            "何より、ここにある数字はすべて計画の材料であって診断ではありません。臨床判断は測定・病歴・診察から医師が行います。暦は今日が統計的ウィンドウのどこにあるかを教えるだけです。このツールの推定と医師の推定が異なれば、医師のものを採用してください。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de fecha probable de parto",
      tagline: "Estime la fecha probable de parto a partir del primer día de la última regla y la duración del ciclo, vea la edad gestacional actual y la ventana de término de 37–42 semanas.",
      intro: [
        "Introduzca el primer día de la última menstruación (FUR) y, si su ciclo no es el estándar de 28 días, su duración. La herramienta aplica la regla de Naegele — FUR + 280 días — desplazada por la diferencia entre su ciclo y 28 días, y muestra la fecha probable de parto, la edad gestacional de hoy en semanas y días, los días restantes, el trimestre y la ventana de término.",
        "La edad gestacional se actualiza cada día, porque cuenta desde la FUR y no desde la concepción. El día 0 es 0 semanas 0 días; la fecha probable cae en la semana 40. Si la fecha pasa de la semana 40, la herramienta lo dice sin rodeos en lugar de ocultarlo.",
        "Todo aquí es honesto con lo que significa una estimación. La obstetricia cuenta la fecha probable desde la FUR precisamente porque la fecha de ovulación casi nunca se conoce, asumiendo que la ovulación ocurrió unas dos semanas antes de que empezara la siguiente regla. Un ciclo de 30 días empuja la estimación dos días más tarde; uno de 26, dos días antes. La fecha real de parto es una distribución, no una fecha límite.",
        "Por eso la ventana de término importa más que la fecha única: se considera a término cualquier nacimiento entre la semana 37 y la 42, y cerca de la mitad de los partos ocurren dentro de una semana a cada lado de la estimación. La ventana se muestra como dos fechas para poder planear trabajo, familia y viajes alrededor de todo el rango, no de un solo día.",
      ],
      steps: [
        "Introduzca el primer día de la última regla.",
        "Ajuste la duración del ciclo si difiere de 28 días.",
        "Lea la fecha probable de parto y la edad gestacional de hoy.",
        "Planee en torno a la ventana de término, no a la fecha única.",
      ],
      faqs: [
        {
          q: "¿Qué precisión tiene la fecha calculada desde la última regla?",
          a: "Como estadística poblacional es razonable: con un ciclo conocido y regular, aproximadamente la mitad de los partos ocurren dentro de una semana de la estimación. Para un día individual es inherentemente difusa: la ecografía del primer trimestre es claramente más precisa, y la estimación oficial de su matrona o ginecólogo puede diferir de esta.",
        },
        {
          q: "¿Por qué la duración del ciclo cambia la fecha?",
          a: "La regla de Naegele asume un ciclo de 28 días con ovulación el día 14. Con un ciclo de 32 días, la ovulación probablemente ocurrió más tarde respecto a la FUR, así que la estimación se retrasa 4 días. El desplazamiento es una aproximación lineal: funciona bien en ciclos cercanos al rango normal y no es fiable en ciclos irregulares.",
        },
        {
          q: "¿Qué se considera a término?",
          a: "Los nacimientos entre la semana 37 día 0 y la semana 42 día 0 se consideran a término, distinguiéndose en la obstetricia moderna el término temprano (37–38 semanas) y el término completo (39–40 semanas). La ventana de la herramienta es el rango conservador completo: 21 días antes de la fecha probable hasta 14 días después.",
        },
        {
          q: "¿Es esto consejo médico?",
          a: "No. Es un cálculo de calendario estándar para orientarse y planear. Su profesional de prenatal lleva la estimación oficial, la ajusta con mediciones ecográficas y toma todas las decisiones clínicas. Si algo le preocupa, contacte con quien la atiende, no con esta página.",
        },
      ],
      deepDive: [
        {
          heading: "De dónde viene la regla de Naegele y qué asume",
          paragraphs: [
            "La regla se remonta al siglo XIX y sobrevive porque es simple y aproximadamente correcta a escala poblacional: 280 días desde la FUR, asumiendo un ciclo de 28 días y ovulación el día 14. Su verdadera entrada no es la biología sino la convención: la obstetricia cuenta deliberadamente desde la FUR porque es la única fecha que casi toda paciente recuerda.",
            "Los supuestos muestran sus límites en los extremos. Ciclos de menos de unos 21 o de más de unos 45 días hacen poco fiable el desplazamiento lineal, y los ciclos irregulares vuelven inestable cualquier fecha basada solo en la FUR. Los embarazos por FIV se datan desde la transferencia embrionaria, lo que elimina por completo la conjetura de la ovulación y mueve la estimación para muchas pacientes.",
            "La ecografía del primer trimestre reconcilia ambas: medir el embrión y retroceder da una edad gestacional que prevalece sobre la estimación por FUR cuando discrepan de forma significativa. Si su profesional revisa la fecha tras una ecografía, considere la revisada como la autoridad: la regla del calendario es el punto de partida, no la última palabra.",
          ],
        },
        {
          heading: "Leer la ventana de término en lugar de la fecha única",
          paragraphs: [
            "El encuadre importa: una fecha probable se comporta menos como una cita de entrega y más como el centro de una distribución. En torno a la mitad de los partos caen dentro de una semana a cada lado, cerca del 80% dentro de dos semanas; solo uno de cada veinte llega exactamente el día estimado. Planearlo todo alrededor de un solo día invita a la ansiedad en ambas direcciones.",
            "La ventana de 37 a 42 semanas es lo que la clínica realmente planifica: antes de 37 semanas es prematuridad y cambia la vía asistencial; pasado el plazo de 42 suele intensificarse la vigilancia. Dentro de la ventana, la semana 39–40 es estadísticamente la más densa. Saber dónde está hoy dentro de la ventana convierte «¿cuándo será?» en un rango con forma.",
            "La planificación práctica sigue al rango: relevos laborales, visitas familiares y viajes cobran sentido anclados a la ventana, no a la fecha única. La herramienta muestra la ventana como dos fechas concretas precisamente para que los planes se anclen a la semana más temprana plausible y no a un día que, según las estadísticas, la mayoría de bebés se saltarán.",
          ],
        },
        {
          heading: "Usar la herramienta con honestidad",
          paragraphs: [
            "El cálculo corre íntegramente en su navegador: las fechas que introduce no se envían a ningún sitio. Cuenta desde la FUR con el ajuste por ciclo, informa de la edad gestacional del día cada vez que la abre y dice con claridad cuándo la fecha está pasada la fecha probable o fuera de la ventana.",
            "Sea igual de honesta con las entradas: use el primer día de sangrado real, no el manchado previo, y una duración de ciclo medida durante unos meses en lugar de una suposición. Pequeños errores de entrada mueven la estimación días, invisible en la salida pero relevante al comparar con una fecha ecográfica.",
            "Sobre todo, trate cada número aquí como material de planificación, no como diagnóstico. Quien atiende su embarazo decide a partir de mediciones, historia y exploración; el calendario solo puede decirle dónde está hoy dentro de una ventana estadística. Si la estimación de la herramienta y la de su profesional difieren, quédese con la del profesional.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de data provável do parto",
      tagline: "Estime a data provável do parto a partir do primeiro dia da última menstruação e da duração do ciclo, veja a idade gestacional atual e a janela de termo de 37–42 semanas.",
      intro: [
        "Informe o primeiro dia da última menstruação (DUM) e, se o seu ciclo não for o padrão de 28 dias, sua duração. A ferramenta aplica a regra de Naegele — DUM + 280 dias — deslocada pela diferença entre o seu ciclo e 28 dias, e mostra a data provável do parto, a idade gestacional de hoje em semanas e dias, os dias restantes, o trimestre e a janela de termo.",
        "A idade gestacional se atualiza todos os dias, porque conta a partir da DUM, e não da concepção. O dia 0 é 0 semanas 0 dias; a data provável cai na semana 40. Se a data passar da semana 40, a ferramenta diz isso claramente, sem esconder.",
        "Tudo aqui é honesto quanto ao que significa uma estimativa. A obstetrícia conta a data provável a partir da DUM justamente porque a data da ovulação raramente é conhecida, assumindo ovulação cerca de duas semanas antes de a próxima menstruação ter começado. Um ciclo de 30 dias empurra a estimativa dois dias para frente; um de 26 dias, dois dias para trás. A data real do parto é uma distribuição, não um prazo.",
        "Por isso a janela de termo importa mais do que a data única: qualquer nascimento entre a semana 37 e a 42 é considerado a termo, e cerca de metade dos partos acontece até uma semana de cada lado da estimativa. A janela aparece como duas datas para que trabalho, família e viagens possam ser planejados em torno do intervalo inteiro, não de um único dia.",
      ],
      steps: [
        "Informe o primeiro dia da última menstruação.",
        "Ajuste a duração do ciclo se for diferente de 28 dias.",
        "Leia a data provável do parto e a idade gestacional de hoje.",
        "Planeje em torno da janela de termo, não da data única.",
      ],
      faqs: [
        {
          q: "Qual é a precisão de uma data calculada pela última menstruação?",
          a: "Como estatística populacional é razoável: com um ciclo conhecido e regular, aproximadamente metade dos partos ocorre até uma semana da estimativa. Para um dia individual, ela é intrinsecamente imprecisa — a ultrassonografia do primeiro trimestre é claramente mais precisa, e a estimativa oficial do seu obstetra pode diferir desta.",
        },
        {
          q: "Por que a duração do ciclo muda a data?",
          a: "A regra de Naegele assume um ciclo de 28 dias com ovulação no dia 14. Com um ciclo de 32 dias, a ovulação provavelmente ocorreu mais tarde em relação à DUM, então a estimativa se move 4 dias para frente. O deslocamento é uma aproximação linear: funciona bem para ciclos próximos da faixa normal e não é confiável para ciclos irregulares.",
        },
        {
          q: "O que conta como gestação a termo?",
          a: "Nascimentos entre a semana 37 dia 0 e a semana 42 dia 0 são considerados a termo, com a obstetrícia moderna distinguindo termo precoce (37–38 semanas) e termo completo (39–40 semanas). A janela da ferramenta é a faixa conservadora completa: 21 dias antes da data provável até 14 dias depois.",
        },
        {
          q: "Isso é orientação médica?",
          a: "Não. É um cálculo de calendário padrão para orientação e planejamento. Seu profissional de pré-natal acompanha a estimativa oficial, ajusta-a com medições de ultrassom e toma todas as decisões clínicas. Se algo o preocupa, procure quem faz seu acompanhamento, não esta página.",
        },
      ],
      deepDive: [
        {
          heading: "De onde vem a regra de Naegele e o que ela assume",
          paragraphs: [
            "A regra remonta ao século XIX e sobrevive porque é simples e aproximadamente correta em escala populacional: 280 dias a partir da DUM, assumindo ciclo de 28 dias e ovulação no dia 14. Sua verdadeira entrada não é biológica, mas uma convenção — a obstetrícia conta deliberadamente a partir da DUM porque é a única data que quase toda gestante lembra.",
            "As premissas mostram limites nas bordas. Ciclos menores que cerca de 21 dias ou maiores que cerca de 45 dias tornam o deslocamento linear pouco confiável, e ciclos irregulares tornam instável qualquer data baseada apenas na DUM. Gestações por FIV são datadas a partir da transferência do embrião, o que elimina a adivinhação da ovulação e muda a estimativa para muitas pacientes.",
            "A ultrassonografia do primeiro trimestre reconcilia as duas abordagens: medir o embrião e retroceder dá uma idade gestacional que prevalece sobre a estimativa pela DUM quando divergem de forma relevante. Se o seu profissional revisar a data após uma imagem, trate a revisada como a autoridade — a regra do calendário é o ponto de partida, não a palavra final.",
          ],
        },
        {
          heading: "Ler a janela de termo em vez da data única",
          paragraphs: [
            "O enquadramento importa: uma data provável se comporta menos como um agendamento de entrega e mais como o centro de uma distribuição. Cerca de metade dos partos cai até uma semana para cada lado, cerca de 80% até duas semanas; apenas um em cada vinte chega exatamente no dia estimado. Planejar tudo em torno de um único dia convida à ansiedade nas duas direções.",
            "A janela de 37 a 42 semanas é o que a clínica realmente usa para planejar: antes de 37 semanas é prematuridade e muda a via de cuidado; depois de 42 semanas normalmente aciona monitorização mais próxima. Dentro da janela, a semana 39–40 é estatisticamente a mais densa. Saber onde hoje está dentro da janela transforma “quando será?” em uma faixa com forma.",
            "O planejamento prático segue a faixa: transições de trabalho, visitas de família e viagens fazem mais sentido ancoradas na janela do que na data única. A ferramenta mostra a janela como duas datas concretas justamente para que os planos se ancorem na semana mais cedo plausível, e não em um dia que, segundo as estatísticas, a maioria dos bebês não cumprirá.",
          ],
        },
        {
          heading: "Usar a ferramenta com honestidade",
          paragraphs: [
            "O cálculo roda inteiramente no seu navegador — as datas que você informa nunca são enviadas a lugar algum. Ele conta a partir da DUM com o deslocamento por ciclo, informa a idade gestacional do dia a cada abertura e diz com clareza quando a data passou da data provável ou da janela.",
            "Seja igualmente honesta com as entradas: use o primeiro dia do sangramento real, não o escape anterior, e uma duração de ciclo medida ao longo de alguns meses em vez de um palpite. Pequenos erros de entrada movem a estimativa por dias — invisível na saída, mas relevante ao comparar com uma data de ultrassom.",
            "Acima de tudo, trate cada número aqui como material de planejamento, não como diagnóstico. Quem acompanha o pré-natal decide a partir de medições, histórico e exame; o calendário só pode dizer onde hoje está dentro de uma janela estatística. Se a estimativa da ferramenta e a do profissional divergirem, mantenha a do profissional.",
          ],
        },
      ],
    },
  },
});
