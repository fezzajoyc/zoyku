import { UtilEngineEta } from "../_engines/util-engine-eta";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "eta-calculator",
  category: "utility",
  icon: "clock",
  engine: { component: UtilEngineEta },
  related: ["date-calculator", "age-calculator", "workdays-calculator", "countdown-timer", "stopwatch", "timestamp-converter", "timezone-converter", "percentage-calculator"],
  copy: {
    en: {
      name: "ETA Calculator",
      tagline: "Estimate when a task will finish from total workload and completion rate per hour, day or week — with calendar-day countdown and humanized duration.",
      intro: [
        "Enter the total workload (any unit: tickets, pages, kilometers, rows), a completion rate, and optionally your daily working hours. The calculator returns the estimated finish time, the countdown from now, and the duration in a readable form like \"3 days 4 hours\".",
        "Rates per day and per week respect your working-hours setting, so an 8-hour workday stretches a 40-hour job over five calendar days instead of pretending you work around the clock.",
      ],
      steps: [
        "Enter the total workload and its unit of measure — any positive number works.",
        "Choose a completion rate per hour, per day or per week.",
        "Set your working hours per day (optional) and, if needed, a custom start time.",
        "Read the estimated finish time, remaining days and humanized duration — copy the finish time with one click.",
      ],
      faqs: [
        {
          q: "How are working hours applied to the estimate?",
          a: "A \"per day\" rate assumes you complete that rate within the daily working hours you set; the calendar countdown stretches accordingly. A \"per week\" rate assumes a 5-day work week, so one rate week spans seven calendar days.",
        },
        {
          q: "What units should the workload use?",
          a: "Any consistent unit: tickets, articles, kilometers of road, database rows. The calculator only needs the ratio between workload and rate, so both sides must use the same unit.",
        },
        {
          q: "Can I set a start time in the future or the past?",
          a: "Yes. By default the countdown starts now, but you can enable a custom start time — useful for estimating work that begins next Monday, or for checking when a task that started last week would finish.",
        },
      ],
    },
    zh: {
      name: "ETA 完成时间计算器",
      tagline: "按总任务量与每小时/天/周的完成速率估算完工时间,给出剩余天数倒计时与\"3 天 4 小时\"式的可读时长。",
      intro: [
        "输入总任务量(任意单位:工单、页数、公里、数据行)、完成速率,并可选设置每日工作时段。计算器会给出预计完成时间点、从现在起的倒计时,以及\"3 天 4 小时\"这样的人性化时长。",
        "\"每天\"和\"每周\"速率都会遵循你设置的工时:8 小时工作制下,一项 40 小时的任务会平摊到 5 个自然日,而不是假装你通宵工作。",
      ],
      steps: [
        "输入总任务量与计量单位——任意正数均可。",
        "选择每小时、每天或每周的完成速率。",
        "按需设置每日工时(可选)与自定义开始时间。",
        "查看预计完成时间、剩余天数与人性化时长,一键复制完成时间点。",
      ],
      faqs: [
        {
          q: "工时设置如何影响估算?",
          a: "\"每天\"速率假定你能在所设的每日工时内完成该速率,日历倒计时会相应拉长;\"每周\"速率按每周 5 个工作日计算,一个速率周期跨越 7 个自然日。",
        },
        {
          q: "任务量应该用什么单位?",
          a: "任意一致的单位:工单、文章、公路公里数、数据库行。计算器只关心任务量与速率的比值,两侧单位一致即可。",
        },
        {
          q: "可以把开始时间设在未来或过去吗?",
          a: "可以。默认从现在开始倒计时,但你可以启用自定义开始时间——适合估算下周一才开工的活,或核对上周开始的任务何时能收尾。",
        },
      ],
    },
    ja: {
      name: "ETA 計算ツール",
      tagline: "総作業量と1時間・1日・1週間あたりの処理ペースから完了予定時刻を算出。残り日数のカウントダウンと「3日4時間」式の読みやすい所要時間も表示します。",
      intro: [
        "総作業量(チケット・ページ・km・行など任意の単位)、処理ペース、必要なら1日の作業時間を入力してください。完了予定時刻・今からのカウントダウン・「3日4時間」のような読みやすい所要時間を返します。",
        "「1日あたり」「1週間あたり」のペースは作業時間の設定を尊重します。8時間労働なら40時間の作業は5暦日に分散し、徹夜前提にはしません。",
      ],
      steps: [
        "総作業量とその単位を入力します。正の数なら何でも構いません。",
        "1時間・1日・1週間あたりの処理ペースを選びます。",
        "必要に応じて1日の作業時間や開始時刻を指定します。",
        "完了予定時刻・残り日数・所要時間を確認し、完了時刻はワンクリックでコピーできます。",
      ],
      faqs: [
        {
          q: "作業時間の設定は見積もりにどう反映されますか?",
          a: "「1日あたり」のペースは、設定した1日の作業時間内でそのペースを達成できる前提で計算し、暦上のカウントダウンもそれに応じて伸びます。「1週間あたり」は週5日勤務を前提に、1ペース週は7暦日にまたがります。",
        },
        {
          q: "作業量にはどんな単位を使えばよいですか?",
          a: "チケット・記事・道路km・データベース行など、一貫した単位なら何でも構いません。計算に必要なのは作業量とペースの比率だけなので、両辺が同じ単位であればよいのです。",
        },
        {
          q: "開始時刻を未来や過去に設定できますか?",
          a: "はい。既定では現在からカウントダウンしますが、開始時刻を指定できます。来週月曜に始まる作業の見積もりや、先週始めたタスクの完了見込みの確認に便利です。",
        },
      ],
    },
    es: {
      name: "Calculadora de ETA",
      tagline: "Estime cuándo terminará una tarea a partir de la carga total y el ritmo por hora, día o semana, con cuenta atrás en días y duración legible tipo \"3 días 4 horas\".",
      intro: [
        "Introduzca la carga total (cualquier unidad: tickets, páginas, kilómetros, filas), un ritmo de avance y, si quiere, sus horas de trabajo diarias. La calculadora devuelve la hora estimada de finalización, la cuenta atrás y una duración legible como \"3 días 4 horas\".",
        "Los ritmos por día y por semana respetan las horas de trabajo configuradas: con una jornada de 8 horas, un trabajo de 40 horas se reparte en cinco días naturales en lugar de suponer trabajo continuo.",
      ],
      steps: [
        "Introduzca la carga total y su unidad: cualquier número positivo vale.",
        "Elija un ritmo por hora, por día o por semana.",
        "Configure las horas diarias (opcional) y, si hace falta, una hora de inicio personalizada.",
        "Lea la finalización estimada, los días restantes y la duración; copie la hora con un clic.",
      ],
      faqs: [
        {
          q: "¿Cómo afectan las horas de trabajo al cálculo?",
          a: "Un ritmo \"por día\" supone que alcanza ese ritmo dentro de las horas diarias configuradas, y la cuenta atrás se estira en consecuencia. Un ritmo \"por semana\" supone 5 días laborables: una semana de ritmo abarca siete días naturales.",
        },
        {
          q: "¿Qué unidades debo usar para la carga?",
          a: "Cualquier unidad coherente: tickets, artículos, kilómetros de vía, filas de base de datos. Solo importa la razón entre carga y ritmo, así que ambas partes deben usar la misma unidad.",
        },
        {
          q: "¿Puedo fijar una hora de inicio futura o pasada?",
          a: "Sí. La cuenta atrás parte de ahora por defecto, pero puede activar una hora de inicio personalizada: útil para estimar un trabajo que empieza el lunes o comprobar cuándo acabará una tarea iniciada la semana pasada.",
        },
      ],
    },
    pt: {
      name: "Calculadora de ETA",
      tagline: "Estime quando uma tarefa terminará a partir da carga total e do ritmo por hora, dia ou semana, com contagem regressiva em dias e duração legível tipo \"3 dias 4 horas\".",
      intro: [
        "Digite a carga total (qualquer unidade: tickets, páginas, quilômetros, linhas), um ritmo de conclusão e, se quiser, suas horas de trabalho diárias. A calculadora devolve o horário estimado de término, a contagem regressiva e uma duração legível como \"3 dias 4 horas\".",
        "Os ritmos por dia e por semana respeitam as horas configuradas: com uma jornada de 8 horas, um trabalho de 40 horas se distribui por cinco dias naturais em vez de supor trabalho ininterrupto.",
      ],
      steps: [
        "Digite a carga total e a unidade — qualquer número positivo serve.",
        "Escolha um ritmo por hora, por dia ou por semana.",
        "Defina as horas diárias (opcional) e, se precisar, um horário de início personalizado.",
        "Veja o término estimado, os dias restantes e a duração; copie o horário com um clique.",
      ],
      faqs: [
        {
          q: "Como as horas de trabalho afetam a estimativa?",
          a: "Um ritmo \"por dia\" supõe que você cumpre esse ritmo dentro das horas diárias definidas, e a contagem regressiva se estende de acordo. Um ritmo \"por semana\" supõe 5 dias úteis: uma semana de ritmo cobre sete dias naturais.",
        },
        {
          q: "Que unidade usar para a carga?",
          a: "Qualquer unidade consistente: tickets, artigos, quilômetros de via, linhas de banco de dados. Só importa a razão entre carga e ritmo, então ambos os lados devem usar a mesma unidade.",
        },
        {
          q: "Posso definir um horário de início futuro ou passado?",
          a: "Sim. Por padrão a contagem começa agora, mas você pode ativar um horário personalizado — útil para estimar um trabalho que começa segunda-feira ou verificar quando terminaria uma tarefa iniciada semana passada.",
        },
      ],
    },
  },
});
