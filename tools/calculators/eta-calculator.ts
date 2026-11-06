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
        "The projection divides remaining work by your effective rate: at N units per day with H working hours, the finish date lands on a working-hours-aware timeline, and the countdown converts the remainder into a plain-language duration. Weekends and holidays are not skipped automatically — the model assumes you work every day unless the rate you enter already accounts for them.",
        "Compared with a spreadsheet, the three outputs — finish timestamp, countdown, readable duration — update live as the rate changes, which makes it easy to see what doubling throughput actually buys you. Rates are estimates: scope creep and interruptions are the usual reasons real ETAs slip, so re-check the numbers as the work progresses.",
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
      deepDive: [
        {
          heading: "The arithmetic behind an ETA",
          paragraphs: [
            "At its core the projection is one division: remaining workload divided by effective rate. The subtlety is what “effective” means. An hourly rate is used as-is; a daily rate is projected onto your working-hours setting, so a 40-hour job at 8 hours a day spans five calendar days, not one; a weekly rate assumes a five-day work week, so it stretches across seven calendar days. Each choice moves the finish timestamp, which is why the tool asks.",
            "The countdown and the humanized duration are the same projection rendered two ways: the countdown is time from the start point to the finish, and “3 days 4 hours” is that same span restated in units people schedule around. Because all three outputs derive from one formula, changing the rate updates everything at once — which is the fastest way to see what accelerating or slowing down is actually worth.",
            "One honest limitation: the model is linear. It assumes each unit of work takes the same time as the last, with no ramp-up, no rework and no interruptions. Real queues tail out — the last 10 percent often takes longer per unit than the first 90 — so treat a late-stage ETA as optimistic by default and refresh it as actual progress comes in.",
          ],
        },
        {
          heading: "Choosing the rate: the biggest source of error",
          paragraphs: [
            "Most wrong ETAs are wrong because of the rate, not the math. The classic mistake is entering a best-case rate — what you achieve on a clear, uninterrupted afternoon — and letting it stand in for the average rate including meetings, context switches and bad days. A rate that is half of your best case usually predicts real completion far better than the best case itself.",
            "A second trap is unit mismatch: entering tickets per day against a workload in pages, or per-hour rate with per-day workload. The tool needs both sides in the same unit, and the safest check is to recompute one small, already-finished chunk and see whether the formula would have predicted its duration.",
            "Working hours and calendars interact too: a daily rate does not skip weekends automatically, and holidays are not subtracted unless your rate already accounts for them. If the finish date lands on a Saturday and you will not work that day, nudge the rate down or extend the timeline manually — the tool models your stated assumptions, not your private calendar.",
          ],
        },
        {
          heading: "Using ETAs without being burned by them",
          paragraphs: [
            "The most reliable workflow is re-forecasting: enter the workload, run the estimate, then — as work proceeds — update the remaining workload and the rate you have actually been achieving. An ETA recalculated at 25 percent completion is far more accurate than one made at zero, because the realized rate is measured rather than guessed.",
            "When the estimate is for someone else (a client, a stakeholder), the readable duration is the output to share, and padding belongs in the rate, not in an unexplained buffer on top: “12 units a week, not 20” is a defensible statement, while a bare number with a hidden 40 percent pad invites the schedule to be taken at face value.",
            "Like everything on this page, the calculation runs locally in your browser — no workload or rate data is uploaded, logged or shared. That makes it usable for internal staffing plans and client quotes alike without those numbers ever leaving your device.",
          ],
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
      deepDive: [
        {
          heading: "ETA 背后的算术",
          paragraphs: [
            "预测的核心只有一步除法:剩余工作量除以有效速率。微妙之处在于“有效”二字的含义。小时速率按原样使用;日速率会投影到你的工作时段设置上——8 小时/天的一条 40 小时任务横跨 5 个日历日,而不是 1 天;周速率假设每周 5 个工作日,所以要摊到 7 个日历日。每种选择都会移动完成时间戳,这正是工具要问你的原因。",
            "倒计时和“3 天 4 小时”这样的人话时长是同一个投影的两种呈现:前者是起点到完成点的时段,后者把同一段跨度改写成便于排期的单位。三个输出同出一式,所以改速率会联动刷新——这也是感受“提速到底值多少”的最快方式。",
            "一个诚实的局限:模型是线性的。它假设每单位工作耗时相同,没有爬坡期、没有返工、没有打断。真实的队列是长尾的——最后 10% 往往比前 90% 的单位耗时更长——所以越接近尾声的 ETA 越偏乐观,请随实际进展持续刷新。",
          ],
        },
        {
          heading: "选速率:最大的误差来源",
          paragraphs: [
            "多数 ETA 算错都错在速率,不是算术。经典错误是填入最佳状态速率——无打断的清净下午才能达到的水平——却让它代表包含会议、上下文切换和糟糕日子的平均速率。取最佳状态一半的速率,往往比最佳状态本身更接近真实的完成时间。",
            "第二个坑是单位错配:任务量填页数、速率填每天几张工单,或者按小时的速率配按天的工作量。工具要求两侧单位一致,最稳的检验是挑一小段已经完成的量重算一遍,看公式能否预测出它的真实耗时。",
            "工作时段与日历也有交互:日速率不会自动跳过周末,节假日也不会被减掉,除非你的速率已经把它们算进去。如果完成日落在周六而你那天不干活,就把速率调低或手动放宽时间线——工具忠实于你声明的假设,不揣测你的私人日历。",
          ],
        },
        {
          heading: "让 ETA 为你所用而不被它反噬",
          paragraphs: [
            "最可靠的工作流是滚动重估:先填工作量跑一版估计,随着工作推进,不断更新剩余量和实际达到的速率。在完成 25% 时重算的 ETA 远比从零起的更准,因为那时的速率是测出来的,不是猜的。",
            "当估计是给别人的(客户、相关方),分享出去的应该是人话时长,而缓冲应该放进速率里,而不是在上面加一个说不清的富余量:“每周 12 件,而不是 20 件”是可辩护的表述;一个赤裸数字底下藏着 40% 的水分,只会让对方照单全收。",
            "和本页所有功能一样,计算完全在你的浏览器本地完成——工作量与速率数据不会上传、不会记录、不会被分享。无论内部排期还是对外报价,这些数字都出不了你的设备。",
          ],
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
      deepDive: [
        {
          heading: "ETA の背後にある算術",
          paragraphs: [
            "予測の核心は一回の除法です。残り作業量を有効レートで割る——微妙なのは「有効」の意味です。時間給レートはそのまま使われ、日次レートは作業時間の設定に投影されます(1 日 8 時間なら 40 時間の仕事は 5 カレンダー日)。週次レートは週 5 日稼働を仮定するため 7 日間に広がります。どの選択も完了タイムスタンプを動かすので、ツールは尋ねてくるのです。",
            "カウントダウンと「3 日 4 時間」という整形済み表示は、同じ予測の二つの表現です。すべての出力が一つの式から導かれるため、レートを変えると一斉に更新されます——加速や減速が実際にどれだけの価値を持つかを見る最速の方法です。",
            "正直な限界を一つ。モデルは線形です。各単位の作業時間が同じで、慣らし運転も手戻りも中断もないと仮定します。現実のキューは裾が重く、最後の 10% は最初の 90% より単位あたり時間がかかりがちです。終盤の ETA はデフォルトで楽観視と捉え、実進捗に合わせて更新してください。",
          ],
        },
        {
          heading: "レート選定:最大の誤差源",
          paragraphs: [
            "ETA が外れるのは大抵、計算ではなくレートです。古典的な過ちは、最良条件のレート——中断のない静かな午後にだけ出せる水準——を、会議や割り込みを含む平均レートの代わりに入力すること。最良値の半分のレートのほうが、実際の完成をずっとよく予測します。",
            "二つ目の罠は単位の不一致:作業量を「ページ」で入れ、レートを「1 日あたりチケット数」で入れるなど。ツールは両辺が同じ単位であることを要求します。最も確実な検証は、すでに終えた小さな区間を式に通し、実際の所要時間を予測できるか確かめることです。",
            "作業時間とカレンダーの相互作用にも注意:日次レートは自動的には週末をスキップせず、祝日はレートに織り込まれていない限り減算されません。完了日が土曜に当たって働かないなら、レートを下げるか手動で延ばしてください。ツールは宣言された前提を忠実にモデル化するものであって、あなたの個人カレンダーを知りません。",
          ],
        },
        {
          heading: "ETA に裏切られないための使い方",
          paragraphs: [
            "最も信頼できるワークフローは逐次再予測です。まず作業量を入れて概算し、進行に応じて残量と実績レートを更新していく。25% 完了時点で再計算した ETA はゼロ時点のものより遥かに正確です。その時点のレートは推測ではなく実測だからです。",
            "見積もりが他人(クライアント、ステークホルダー)向けなら、共有すべきは整形済みの所要時間で、バッファは不可解な上乗せではなくレートに織り込む:「週 20 件ではなく 12 件」は防御可能な言明であり、40% の隠しマージン入りのかたい数字は額面通りに受け取られるだけです。",
            "このページのすべての機能と同様、計算はブラウザ内で完結します。作業量やレートのデータはアップロード・記録・共有されません。社内の要員計画でもクライアント向け見積もりでも、数字が端末の外に出ることはありません。",
          ],
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
      deepDive: [
        {
          heading: "La aritmética detrás de una ETA",
          paragraphs: [
            "El núcleo de la proyección es una división: trabajo restante dividido por ritmo efectivo. Lo sutil es qué significa \"efectivo\". Un ritmo horario se usa tal cual; uno diario se proyecta sobre tu configuración de horas laborables, así que un trabajo de 40 horas a 8 horas por día abarca cinco días de calendario, no uno; un ritmo semanal asume semana de cinco días y se extiende a siete días de calendario. Cada opción mueve la marca de tiempo final, y por eso la herramienta pregunta.",
            "La cuenta atrás y la duración legible (\"3 días 4 horas\") son la misma proyección en dos formatos: la primera es el tiempo del inicio al final, la segunda reescribe ese lapso en unidades con las que la gente planifica. Como las tres salidas salen de una fórmula, cambiar el ritmo lo actualiza todo a la vez — la manera más rápida de ver cuánto vale realmente acelerar o frenar.",
            "Una limitación honesta: el modelo es lineal. Supone que cada unidad cuesta lo mismo que la anterior, sin curva de arranque, sin rehacer trabajo y sin interrupciones. Las colas reales tienen cola pesada — el último 10 por ciento suele costar más por unidad que el primer 90 — así que trata una ETA tardía como optimista por defecto y refresca con el avance real.",
          ],
        },
        {
          heading: "Elegir el ritmo: la mayor fuente de error",
          paragraphs: [
            "La mayoría de las ETAs fallidas fallan por el ritmo, no por la cuenta. El error clásico es introducir el ritmo en su mejor escenario — lo que logras en una tarde despejada y sin interrupciones — y dejarlo representar el promedio que incluye reuniones, cambios de contexto y días malos. Un ritmo a la mitad de tu mejor caso suele predecir la finalización real mucho mejor que el mejor caso mismo.",
            "El segundo accidente es la discrepancia de unidades: carga en páginas con ritmo en tareas por día, o ritmo por hora con carga por día. La herramienta necesita ambas partes en la misma unidad, y la comprobación más segura es recalcular un trozo pequeño ya terminado y ver si la fórmula habría acertado su duración.",
            "Las horas laborables y el calendario también interactúan: un ritmo diario no salta los fines de semana por sí solo, y los festivos no se restan a menos que tu ritmo ya los contemple. Si la fecha cae en sábado y no trabajarás, baja el ritmo o alarga el plazo — la herramienta modela tus supuestos declarados, no tu calendario privado.",
          ],
        },
        {
          heading: "Usar ETAs sin quemarte con ellas",
          paragraphs: [
            "El flujo más fiable es la re-estimación continua: introduce la carga, corre la estimación y — conforme avanza — actualiza el trabajo restante y el ritmo que de verdad has estado logrando. Una ETA recalculada al 25 por ciento de avance es mucho más precisa que la hecha en cero, porque el ritmo realizado está medido, no adivinado.",
            "Cuando la estimación es para otra persona (un cliente, un stakeholder), lo que se comparte es la duración legible, y el colchón pertenece al ritmo, no a un margen inexplicado encima: \"12 unidades por semana, no 20\" es defendible; un número desnudo con un 40 por ciento escondido invita a tomar el calendario al pie de la letra.",
            "Como todo en esta página, el cálculo corre localmente en tu navegador — ni la carga ni el ritmo se suben, registran o comparten. Sirve igual para planes internos de personal que para cotizaciones a clientes, sin que esos números salgan de tu dispositivo.",
          ],
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
      deepDive: [
        {
          heading: "A aritmética por trás de uma ETA",
          paragraphs: [
            "O núcleo da projeção é uma divisão: trabalho restante dividido pela taxa efetiva. O sutil é o que \"efetiva\" significa. Uma taxa horária entra como está; uma diária é projetada sobre sua configuração de horas de trabalho — um trabalho de 40 horas a 8 horas por dia atravessa cinco dias de calendário, não um; uma taxa semanal assume semana de cinco dias e se estende por sete. Cada escolha move o timestamp final, e por isso a ferramenta pergunta.",
            "A contagem regressiva e a duração legível (\"3 dias 4 horas\") são a mesma projeção em duas roupagens: a primeira é o tempo do início ao fim, a segunda reescreve esse intervalo em unidades com que as pessoas agendam. Como as três saídas vêm de uma fórmula, mudar a taxa atualiza tudo de uma vez — o caminho mais rápido para ver o que acelerar ou frear vale de verdade.",
            "Uma limitação honesta: o modelo é linear. Assume que cada unidade custa o mesmo que a anterior, sem rampa de entrada, sem retrabalho e sem interrupções. Filas reais têm cauda pesada — os últimos 10 por cento costumam custar mais por unidade que os primeiros 90 — então trate uma ETA tardia como otimista por padrão e atualize conforme o avanço real.",
          ],
        },
        {
          heading: "Escolher a taxa: a maior fonte de erro",
          paragraphs: [
            "A maioria das ETAs erradas erra na taxa, não na conta. O erro clássico é digitar a taxa do melhor cenário — o que você faz numa tarde limpa e sem interrupções — e deixá-la representar a média que inclui reuniões, trocas de contexto e dias ruins. Uma taxa na metade do seu melhor caso costuma prever a conclusão real muito melhor que o melhor caso em si.",
            "A segunda armadilha é o descasamento de unidades: carga em páginas com taxa em chamados por dia, ou taxa por hora com carga por dia. A ferramenta precisa dos dois lados na mesma unidade, e a checagem mais segura é recalcular um pedaço pequeno já concluído e ver se a fórmula teria previsto a duração dele.",
            "Horas de trabalho e calendário também interagem: uma taxa diária não pula fins de semana automaticamente, e ferados não são descontados a menos que sua taxa já os contemple. Se a data cair num sábado em que você não trabalha, reduza a taxa ou estenda o prazo — a ferramenta modela os pressupostos que você declarou, não seu calendário privado.",
          ],
        },
        {
          heading: "Usar ETAs sem ser queimado por elas",
          paragraphs: [
            "O fluxo mais confiável é a re-estimativa contínua: entre a carga, rode a estimativa e — conforme avança — atualize o restante e a taxa que de fato vem alcançando. Uma ETA recalculada a 25 por cento de conclusão é muito mais precisa que a feita no zero, porque a taxa realizada está medida, não adivinhada.",
            "Quando a estimativa é para outra pessoa (um cliente, uma liderança), o que se compartilha é a duração legível, e a folga pertence à taxa, não a um buffer inexplicado por cima: \"12 unidades por semana, não 20\" é defensável; um número cru com 40 por cento escondido convida o cronograma a ser tomado ao pé da letra.",
            "Como tudo nesta página, o cálculo roda localmente no seu navegador — carga e taxa não são enviadas, registradas ou compartilhadas. Serve tanto para planos internos de equipe quanto para cotações a clientes, sem que esses números saiam do seu dispositivo.",
          ],
        },
      ],
    },
  },
});
