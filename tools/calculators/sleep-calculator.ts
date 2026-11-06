import { CalcEngineSleep } from "../_engines/calc-engine-sleep";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "sleep-calculator",
  category: "utility",
  icon: "rotate",
  engine: { component: CalcEngineSleep },
  related: ["pace-calculator", "one-rep-max-calculator", "date-calculator", "age-calculator", "body-fat-calculator", "tip-calculator", "cooking-conversion", "calorie-calculator", "aspect-ratio-calculator", "bmr-calculator"],
  copy: {
    en: {
      name: "Sleep Calculator",
      tagline: "Find the best bedtime for a set wake-up time — or when to wake if you sleep now — using 90-minute sleep cycles plus 15 minutes to fall asleep.",
      intro: [
        "Waking up mid-cycle is what makes mornings feel awful, not the total hours slept. This tool plans sleep in whole 90-minute cycles: tell it when you need to wake up and it lists the bedtimes that land an alarm exactly at a cycle boundary — six cycles (9 hours) down to three (4.5 hours), each including about 15 minutes to drift off.",
        "Going to bed right now? The reverse mode adds cycles forward instead: fall asleep at 23:30 and your natural wake points are 01:15, 02:45, 04:15, 05:45, 07:15 and 08:45 — pick the earliest one that still gives you enough rest.",
        "The schedule assumes sleep cycles of roughly 90 minutes — the time to pass through light sleep, deep sleep and REM — and adds about 15 minutes to fall asleep, so a 6:30 wake target lists bedtimes at 6, 5, 4 and 3 complete cycles. Cycle length varies between roughly 80 and 110 minutes between individuals.",
        "Compared with counting total hours alone, landing the alarm at a cycle boundary means waking from lighter sleep, which is what makes mornings feel less brutal. The 90-minute figure is a population average, not a law of biology — nudge your bedtime by 15 minutes across a week to find your own rhythm. Persistent sleep problems deserve a professional, not a calculator.",
      ],
      steps: [
        "Choose Wake-up time → bedtime, or Sleep now → wake times.",
        "Enter the time you must wake up, or the time you are going to bed.",
        "Pick a row: each one is a whole number of 90-minute cycles, with the sleep duration shown.",
      ],
      faqs: [
        {
          q: "Are sleep cycles really 90 minutes?",
          a: "90 minutes is the commonly cited average, but individual cycles vary from roughly 80 to 120 minutes, and the same person's cycles differ across a night. That is why the times here are targets, not guarantees: if you still feel groggy after two weeks of cycle-timed alarms, shift your bedtime 15–20 minutes and see whether mornings improve.",
        },
        {
          q: "Why does the calculation add 15 minutes?",
          a: "Because the first cycle only starts when you actually fall asleep, and most people take somewhere around 10–20 minutes. The tool budgets 15 minutes between getting into bed and the start of cycle one; if you typically drop off faster or slower, mentally add or subtract the difference.",
        },
        {
          q: "How many cycles do I need?",
          a: "Most adults do well on 5 cycles (7.5 hours) and many need 6 (9 hours); 4 cycles (6 hours) works for some people short-term but rarely long-term. Consistency of schedule matters as much as the total — the same 6 cycles at wildly varying bedtimes leaves you worse off.",
        },
      ],
      deepDive: [
        {
          heading: "How solid is the 90-minute cycle theory, really",
          paragraphs: [
            "Sleep alternates between light sleep, deep sleep and REM, and that broad architecture is a firm finding of sleep research — polysomnography (PSG) can directly observe the electrical signatures of each stage. That a night contains several such cycles, repeating in sequence, is also not in dispute.",
            "What is contested is the round number \"90 minutes\". It comes from population averages in older laboratory studies, but later measurements put cycle length anywhere from roughly 80 to 110 minutes, and the same person's cycles vary within a single night: the first half is deep-sleep-heavy with longer cycles, the second half shifts toward REM and a different structure. Landing the alarm on a calculated boundary only tilts the odds toward lighter sleep — it is not an exact biological switch.",
            "So treat this tool as a planning aid, not medical advice: align wake-up with the boundary the average model produces, observe how mornings feel for a week or two, then nudge bedtime by 15 minutes to find your own rhythm. Persistent insomnia, frequent night waking or severe daytime sleepiness are symptoms for a doctor to evaluate, not something to solve with alarm placement.",
          ],
        },
        {
          heading: "The 15-minute sleep-onset budget and reading the results",
          paragraphs: [
            "The first bedtime column carries 15 minutes more than subtracting N cycles would give: a sleep-onset buffer. The first cycle only starts once you actually fall asleep, and most people take 10–20 minutes after getting into bed. The tool uses 15 as a middle value; calibrate it against your own experience — if you can doze off scrolling your phone, subtract 10; if your mind races in bed, add a few.",
            "In reverse mode, results are ordered as \"bedtime + 15 minutes + whole cycles\", so lying down at 23:30 makes 01:15 the first candidate. The common misreading is treating those times as a guarantee you will wake up; they are the points where waking would be lightest if a cycle completes. In practice, set a slightly later alarm as a backstop and let natural waking happen near a boundary.",
            "Both modes list down to 3 cycles (4.5 hours), and appearing in the list is not a recommendation. Fewer than 4 cycles is acute sleep deprivation, with clearly degraded judgment and reaction time; the row exists so that a red-eye flight or all-nighter comes with an honest price tag.",
          ],
        },
        {
          heading: "Cycle alarms cannot repay a sleep debt",
          paragraphs: [
            "Aligning cycles improves how the moment of waking feels; it does nothing about total hours. The debt built up by weeks of 5-hour nights is not repaid by sleeping in on weekends. Schedule regularity — a fixed wake-up time above all — contributes more to day-to-day energy than per-night cycle alignment, a point sleep-medicine literature repeats often.",
            "Compared with wearables and smart mattresses, this tool collects no data at all. Consumer sleep-stage tracking is not very accurate to begin with, and everything here computes locally in your browser — no times are sent or stored. It works well as a free starting point; enthusiasts who want to measure their real cycle length can consider a device afterwards.",
          ],
        },
      ],
    },
    zh: {
      name: "睡眠周期计算器",
      tagline: "按 90 分钟睡眠周期加 15 分钟入睡时间规划作息:给定起床时间倒推就寝点,或现在就睡顺推各周期的自然醒来时刻。",
      intro: [
        "让早晨难受的往往不是睡眠总时长,而是在周期中间被闹钟叫醒。本工具按完整的 90 分钟周期规划睡眠:告诉它你需要几点起床,它会列出恰好落在周期边界的就寝时间——从 6 个周期(9 小时)到 3 个周期(4.5 小时),每档都已包含约 15 分钟的入睡时间。",
        "现在就想睡?反向模式会往后叠加周期:23:30 入睡,自然醒来的时点是 01:15、02:45、04:15、05:45、07:15 和 08:45——选一个既在周期边界上、又能睡够的那一个。",
      ],
      steps: [
        "选择“按起床时间倒推”或“现在就睡 → 醒来时间”。",
        "输入必须起床的时刻,或现在上床的时刻。",
        "在表中选一行:每行都是完整的 90 分钟周期数,并标明睡眠时长。",
      ],
      faqs: [
        {
          q: "睡眠周期真的是 90 分钟吗?",
          a: "90 分钟是常被引用的平均值,但个体周期大约在 80–120 分钟之间波动,同一个人一夜之内的周期长短也不一样。所以这里的时刻只能当目标而不是保证:如果按周期定了两周闹钟仍然昏沉,试着把就寝时间前后挪 15–20 分钟,看看早晨状态是否改善。",
        },
        {
          q: "为什么要额外加 15 分钟?",
          a: "因为第一个周期从真正入睡才刚开始,而多数人需要 10–20 分钟左右。工具按 15 分钟预算从上床到第一个周期开始的时间;如果你入睡更快或更慢,心里相应加减即可。",
        },
        {
          q: "我需要几个周期?",
          a: "多数成年人睡 5 个周期(7.5 小时)状态不错,很多人需要 6 个(9 小时);4 个周期(6 小时)短期能扛,长期很少够用。作息规律和总时长同样重要——同样是 6 个周期,就寝时间乱七八糟只会更糟。",
        },
      ],
      deepDive: [
        {
          heading: "90 分钟周期:证据到底有多硬",
          paragraphs: [
            "睡眠由浅睡、深睡和 REM 快速眼动几个阶段交替组成,这个大框架是睡眠研究的稳固结论,多导睡眠图(PSG)可以直接观察到各阶段的脑电特征。一夜之内会经历若干个这样的周期,周期数随总时长变化,这也没有争议。",
            "有争议的是那个整数\"90 分钟\"。它源于早期实验室研究得到的群体平均值,但后续测量显示周期长度大约在 80–110 分钟之间浮动,而且同一个人一夜之内前后的周期也不一样:前半夜深睡占比高、周期偏长,后半夜 REM 变多、结构改变。所以\"恰好落在周期边界\"的闹钟只是让几率偏向更浅的睡眠阶段,并不是精确的生理开关。",
            "因此本工具的定位是规划辅助而非医疗建议:把起床时间对齐到按平均值算出的边界,连续一两周观察晨起状态,再前后微调 15 分钟寻找自己的节奏。如果长期存在入睡困难、频繁夜醒或白天严重嗜睡,这些属于需要医生评估的症状,不是调闹钟能解决的。",
          ],
        },
        {
          heading: "15 分钟入睡预算与怎么读结果",
          paragraphs: [
            "第一列就寝时间比\"倒推 N 个 90 分钟\"多了 15 分钟,这是入睡缓冲:第一个周期从真正入睡才开始,而多数人躺下后需要 10–20 分钟。工具用 15 分钟作中间值,你应该按自己的实际经验校准——翻手机能睡着的人可以减 10 分钟,容易胡思乱想的人要加。",
            "反向模式的输出按\"上床时刻 + 15 分钟 + 整数个周期\"排列,所以 23:30 躺下对应的醒来点是 01:15 起步。这里有个常见误读:列出的时刻不是\"保证醒来的时间\",而是\"如果睡满整个周期,在哪个点醒来最舒服\"。实际操作是定一个稍晚的闹钟兜底,让自然醒发生在边界附近。",
            "两种模式的时长档位都到 3 个周期(4.5 小时)为止,列出它不等于推荐它。少于 4 个周期属于急性睡眠剥夺,判断力和反应速度都会明显下降,表格里出现这一档只是为了你在赶早班机之类的场景下知道代价是多少。",
          ],
        },
        {
          heading: "周期闹钟救不了睡眠债",
          paragraphs: [
            "对齐周期解决的是\"醒来那一刻\"的体验,它管不了睡眠总量。长期 5 小时欠下的睡眠债,靠每周周末补觉也还不上——作息规律(固定的起床时间尤其重要)对主观精度的贡献通常比单晚的周期对齐更稳,这是睡眠医学文献里反复强调的一点。",
            "和商店里的智能手环、智能床垫相比,这个工具不用采集你的任何数据。手环的睡眠分期检测目前也不算精确,而本工具完全在浏览器里本地计算,不上传时间,也不留存记录,适合当作零成本的起点:先用平均模型跑两周,数据爱好者再考虑上设备验证自己的真实周期长度。",
          ],
        },
      ],
    },
    ja: {
      name: "睡眠サイクル計算",
      tagline: "90 分の睡眠サイクルと 15 分の入眠時間で就寝計画を立てます。起床時刻から就寝時刻を逆算、または今寝た場合の各サイクルの覚醒時刻を表示。",
      intro: [
        "朝つらいのは睡眠総時間のせいではなく、サイクルの途中でアラームに起こされるからです。このツールは 90 分の完全なサイクル単位で睡眠を計画します。起きる時刻を伝えると、サイクルの境目にちょうどアラームが当たる就寝時刻を一覧表示します(6 サイクル=9 時間から 3 サイクル=4.5 時間、入眠 15 分込み)。",
        "今すぐ寝るなら逆モードです。23:30 に入眠すると、自然に目覚めやすいのは 01:15・02:45・04:15・05:45・07:15・08:45。十分な休息が取れる最も早い時刻を選びましょう。",
      ],
      steps: [
        "「起床時刻から就寝時刻へ」か「今寝る → 起きる時刻」を選びます。",
        "起きなければならない時刻、または今寝る時刻を入力します。",
        "表から行を選びます。各行は 90 分サイクルの整数回で、睡眠時間も表示されます。",
      ],
      faqs: [
        {
          q: "睡眠サイクルは本当に 90 分ですか?",
          a: "90 分はよく引用される平均値ですが、個人のサイクルはおよそ 80〜120 分で変動し、同じ人でも夜の間で長短があります。そのためここの時刻は目安であり保証ではありません。サイクルに合わせたアラームを 2 週間続けてもだるさが残る場合は、就寝時刻を 15〜20 分ずらして朝の調子を比べてみてください。",
        },
        {
          q: "なぜ 15 分を足すのですか?",
          a: "最初のサイクルは実際に眠りについたときに始まるからです。多くの人は 10〜20 分ほどかかります。このツールは布団に入ってから第 1 サイクル開始まで 15 分を見込みます。普段もっと早く(遅く)眠れるなら、その差だけ加減してください。",
        },
        {
          q: "何サイクル眠ればいいですか?",
          a: "多くの大人は 5 サイクル(7.5 時間)で良好、6 サイクル(9 時間)必要な人も多くいます。4 サイクル(6 時間)は短期的に対応できる程度で、長期的には不十分なことがほとんどです。総時間と同じくらい重要なのが就寝時刻の一定さです。",
        },
      ],
      deepDive: [
        {
          heading: "90 分サイクルという数字の裏付けの強さ",
          paragraphs: [
            "睡眠は浅い睡眠・深い睡眠・REM 睡眠の交替で構成され、この大きな枠組みはポリソムノグラフィー(PSG)で脳波として直接観察できる、睡眠研究の安定した結論です。一晩にこの周期がいくつか繰り返されること自体も争いがありません。",
            "争点はあの整数「90 分」のほうです。これは初期の実験室研究が出した集団平均ですが、その後の計測では周期の長さはおよそ 80〜110 分でばらつき、同じ人でも夜の前半は深い睡眠の割合が多く周期が長め、後半は REM が増えて構造が変わります。つまり「サイクルの境目にアラーム」は浅い睡眠段階で目覚める確率を寄せる程度で、正確な生理的なスイッチではありません。",
            "だからこのツールは計画の補助であって医療上の助言ではありません。平均値から出した境目に起床時刻を合わせ、1〜2 週間続けて朝の状態を観察し、15 分ずつ微調整して自分の周期を見つけてください。入眠困難・頻繁な中途覚醒・日中の強い眠気が続くなら、それは医師の評価が必要な症状で、アラームの調整では解決しません。",
          ],
        },
        {
          heading: "15 分の入眠バッファと結果の読み方",
          paragraphs: [
            "就寝時刻の候補は「N サイクルを逆算」した値より 15 分多く、これは入眠のバッファです。第 1 サイクルは実際に眠りについた時点で始まり、多くの人は横になってから 10〜20 分かかります。ツールは中間値の 15 分を見込むので、自分の実感に合わせて調整してください。スマホを見ながら眠れる人は 10 分引き、考えごとが止まらない人は足す、という具合です。",
            "逆モードの出力は「就寝時刻 + 15 分 + サイクルの整数回」で並びます。23:30 に横になれば 01:15 が最初の候補です。よくある誤読は、表示時刻を「起きられる保証」と見なすこと。正しくは「周期を満了したなら、どの時点で目覚めれば楽か」です。実際にはやや遅めのアラームを予備に設定し、自然覚醒が境目付近で起きるのを待つのが運用になります。",
            "両モードとも 3 サイクル(4.5 時間)までを一覧に含めますが、載せているからといって推奨ではありません。4 サイクル未満は急性の睡眠不足で、判断力や反応速度が明らかに低下します。早朝の移動などでこの行を選ぶ場合でも、代償を知った上で選ぶための表示です。",
          ],
        },
        {
          heading: "周期アラームは睡眠負債を返せない",
          paragraphs: [
            "周期の境目に合わせるのは「起きた瞬間」の体感の話で、睡眠総量の問題は別にあります。毎晩 5 時間で積み上がる睡眠負債は、週末の寝だめでは返しきれません。起床時刻を一定にする規則性の寄与は、単発の周期合わせより確実だと睡眠医学の文献で繰り返し指摘されています。",
            "市販のスマートウォッチや寝具センサーと比べ、このツールはデータを一切収集しません。そもそも腕時計型の睡眠ステージ推定も精度は高くないのが実情で、本ツールはブラウザ内でローカル計算し、時刻も送信・保存しません。ゼロコストの起点として使い、詳しく調べたい人が自分の周期の実測にデバイスを検討する、という使い分けが現実的です。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de sueño",
      tagline: "Planifique su descanso en ciclos de 90 minutos más 15 minutos para dormir: dado su despertar calcula la hora de acostarse, o las horas naturales de despertar.",
      intro: [
        "Lo que arruina las mañanas no son las horas totales, sino que la alarma suene en mitad de un ciclo. Esta herramienta planifica el sueño en ciclos completos de 90 minutos: dígale a qué hora debe despertar y le listará las horas de acostarse que hacen coincidir la alarma con un límite de ciclo — de seis ciclos (9 horas) a tres (4,5 horas), incluyendo unos 15 minutos para conciliar el sueño.",
        "¿Se acuesta ahora mismo? El modo inverso suma ciclos hacia delante: si se duerme a las 23:30, sus despertares naturales son 01:15, 02:45, 04:15, 05:45, 07:15 y 08:45 — elija el más temprano que aún le dé descanso suficiente.",
      ],
      steps: [
        "Elija Hora de despertar → acostarse, o Dormir ahora → despertares.",
        "Introduzca la hora a la que debe despertar, o a la que se acuesta.",
        "Elija una fila: cada una es un número entero de ciclos de 90 minutos, con la duración de sueño indicada.",
      ],
      faqs: [
        {
          q: "¿Los ciclos de sueño son realmente de 90 minutos?",
          a: "90 minutos es el promedio citado habitualmente, pero los ciclos individuales varían entre 80 y 120 minutos, y los de una misma persona cambian a lo largo de la noche. Por eso estas horas son objetivos, no garantías: si tras dos semanas con alarmas por ciclos sigue cansado, mueva la hora de acostarse 15–20 minutos y compare.",
        },
        {
          q: "¿Por qué se añaden 15 minutos?",
          a: "Porque el primer ciclo solo empieza cuando de verdad se duerme, y la mayoría tarda entre 10 y 20 minutos. La herramienta reserva 15 minutos entre meterse en la cama y el inicio del primer ciclo; si usted se duerme más rápido o más despacio, ajuste mentalmente esa diferencia.",
        },
        {
          q: "¿Cuántos ciclos necesito?",
          a: "A la mayoría de adultos les van bien 5 ciclos (7,5 horas) y muchos necesitan 6 (9 horas); con 4 ciclos (6 horas) se puede funcionar un tiempo, pero rara vez a largo plazo. La regularidad del horario importa tanto como el total: los mismos 6 ciclos con horas dispares dejan peor.",
        },
      ],
      deepDive: [
        {
          heading: "Qué tan sólida es la teoría de los 90 minutos",
          paragraphs: [
            "El sueño alterna fases de sueño ligero, profundo y REM, y ese marco general es una conclusión firme de la investigación: la polisomnografía (PSG) observa directamente las señales eléctricas de cada fase. Que durante la noche se repiten varios ciclos de este tipo tampoco está en disputa.",
            "Lo discutido es ese número redondo de \"90 minutos\". Viene del promedio poblacional de estudios de laboratorio antiguos, pero mediciones posteriores muestran ciclos de unos 80 a 110 minutos, y los de una misma persona cambian: en la primera mitad de la noche dominan el sueño profundo y los ciclos más largos, en la segunda aumenta el REM y la estructura cambia. Alinear la alarma con el límite del ciclo solo sesga la probabilidad hacia fases más ligeras; no es un interruptor fisiológico exacto.",
            "Por eso esta herramienta es una ayuda de planificación, no consejo médico: alinee la hora de despertar con los límites calculados con el promedio, observe cómo amanece durante una o dos semanas y ajuste 15 minutos hasta encontrar su propio ritmo. El insomnio persistente, los despertares frecuentes o el somnoliento diurno intenso son síntomas que un médico debe evaluar, no algo que se arregla moviendo la alarma.",
          ],
        },
        {
          heading: "El margen de 15 minutos y cómo leer el resultado",
          paragraphs: [
            "La primera hora de acostarse lleva 15 minutos extra sobre la resta simple de ciclos: es el margen para conciliar el sueño. El primer ciclo empieza cuando realmente se duerme, y la mayoría tarda 10–20 minutos tras meterse en la cama. La herramienta usa 15 como valor intermedio; cámbielo según su experiencia — quien se duerme mirando el móvil puede restar 10, quien da vueltas con pensamientos necesita sumar.",
            "En el modo inverso los resultados se ordenan como \"hora de acostarse + 15 minutos + ciclos enteros\", así que si se mete en la cama a las 23:30 el primer candidato es 01:15. El error habitual es leer esas horas como garantía de despertar; en realidad son los puntos donde despertar sería más cómodo si el ciclo se completa. En la práctica se fija una alarma algo más tarde como respaldo y se deja que el despertar natural ocurra cerca de un límite.",
            "Ambos modos listan hasta 3 ciclos (4,5 horas), y que aparezca no significa que se recomiende. Menos de 4 ciclos es privación aguda de sueño, con deterioro visible del juicio y los reflejos; la fila existe para escenarios como un vuelo de madrugada, sabiendo cuánto cuesta.",
          ],
        },
        {
          heading: "La alarma por ciclos no paga la deuda de sueño",
          paragraphs: [
            "Alinear ciclos mejora cómo se siente el momento de despertar; no arregla el total de horas. La deuda acumulada con noches de 5 horas no se devuelve durmiendo de más el fin de semana. La regularidad del horario — sobre todo una hora de despertar fija — pesa más para la energía diaria que el ajuste fino de una sola noche, algo que la literatura de medicina del sueño repite con frecuencia.",
            "Frente a pulseras y colchones inteligentes, esta herramienta no recoge ningún dato. Los sensores de sueño tampoco son muy precisos al clasificar fases, y aquí todo se calcula localmente en el navegador: no se envían ni guardan horas. Funciona bien como punto de partida gratuito; quien quiera medir su ciclo real puede después plantearse un dispositivo.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de sono",
      tagline: "Planeje o descanso em ciclos de 90 minutos mais 15 minutos para pegar no sono: dado o horário de acordar, ela acha a hora de dormir, ou os despertares naturais.",
      intro: [
        "O que estraga a manhã não é o total de horas, mas o alarme tocar no meio de um ciclo. Esta ferramenta planeja o sono em ciclos completos de 90 minutos: diga a que horas precisa acordar e ela lista os horários de deitar em que o alarme cai exatamente no fim de um ciclo — de seis ciclos (9 horas) a três (4,5 horas), já incluindo uns 15 minutos para adormecer.",
        "Vai dormir agora? O modo inverso soma ciclos para a frente: adormecendo às 23:30, seus pontos naturais de despertar são 01:15, 02:45, 04:15, 05:45, 07:15 e 08:45 — escolha o mais cedo que ainda dê descanso suficiente.",
      ],
      steps: [
        "Escolha Hora de acordar → deitar, ou Dormir agora → despertares.",
        "Informe a hora em que precisa acordar, ou a hora em que vai dormir.",
        "Escolha uma linha: cada uma é um número inteiro de ciclos de 90 minutos, com a duração do sono indicada.",
      ],
      faqs: [
        {
          q: "Os ciclos de sono são realmente de 90 minutos?",
          a: "90 minutos é a média mais citada, mas os ciclos individuais variam de 80 a 120 minutos, e os da mesma pessoa mudam ao longo da noite. Por isso os horários aqui são metas, não garantias: se depois de duas semanas com alarmes no fim dos ciclos você ainda acorda grogue, mude o horário de deitar 15–20 minutos e compare as manhãs.",
        },
        {
          q: "Por que a conta soma 15 minutos?",
          a: "Porque o primeiro ciclo só começa quando você realmente adormece, e a maioria das pessoas leva de 10 a 20 minutos. A ferramenta reserva 15 minutos entre deitar e o início do primeiro ciclo; se você pega no sono mais rápido ou mais devagar, ajuste mentalmente essa diferença.",
        },
        {
          q: "Quantos ciclos eu preciso?",
          a: "A maioria dos adultos vai bem com 5 ciclos (7,5 horas) e muitos precisam de 6 (9 horas); 4 ciclos (6 horas) funcionam por um tempo, mas raramente a longo prazo. A regularidade do horário pesa tanto quanto o total: os mesmos 6 ciclos com horários bagunçados deixam você pior.",
        },
      ],
      deepDive: [
        {
          heading: "Quão sólida é a teoria dos 90 minutos",
          paragraphs: [
            "O sono alterna fases de sono leve, profundo e REM, e esse arcabouço geral é uma conclusão firme da pesquisa: a polissonografia (PSG) observa diretamente os sinais elétricos de cada fase. Que a noite repete vários desses ciclos também não está em disputa.",
            "O ponto em discussão é esse número redondo de \"90 minutos\". Ele vem da média populacional de estudos de laboratório antigos, mas medições posteriores mostram ciclos entre cerca de 80 e 110 minutos, e os da mesma pessoa mudam: na primeira metade da noite dominam o sono profundo e ciclos mais longos, na segunda o REM aumenta e a estrutura muda. Alinhar o alarme com o fim do ciclo apenas inclina a probabilidade para fases mais leves; não é um interruptor fisiológico exato.",
            "Por isso esta ferramenta é um auxílio de planejamento, não conselho médico: alinhe o horário de acordar aos limites calculados pela média, observe como acorda durante uma ou duas semanas e ajuste 15 minutos até achar o seu ritmo. Insônia persistente, despertares frequentes ou sonolência diurna intensa são sintomas para um médico avaliar, não algo que se resolve mexendo no alarme.",
          ],
        },
        {
          heading: "A folga de 15 minutos e como ler o resultado",
          paragraphs: [
            "O primeiro horário de deitar leva 15 minutos além da subtração simples dos ciclos: é a folga para adormecer. O primeiro ciclo começa quando você realmente pega no sono, e a maioria leva de 10 a 20 minutos depois de deitar. A ferramenta usa 15 como valor intermediário; calibre com a sua experiência — quem dorme olhando o celular pode tirar 10, quem rói ideias na cama precisa somar.",
            "No modo inverso, os resultados seguem o formato \"hora de deitar + 15 minutos + ciclos inteiros\": deitando às 23:30, a primeira opção é 01:15. O erro comum é ler essas horas como garantia de despertar; na verdade são os pontos em que acordar seria mais leve se o ciclo se completar. Na prática, fixe um alarme um pouco mais tarde como reserva e deixe o despertar natural acontecer perto de um limite.",
            "Os dois modos listam até 3 ciclos (4,5 horas), e aparecer na lista não significa recomendação. Menos de 4 ciclos é privação aguda de sono, com queda visível de julgamento e reflexos; a linha existe para cenários como um voo de madrugada, ciente do preço.",
          ],
        },
        {
          heading: "O alarme por ciclos não quita a dívida de sono",
          paragraphs: [
            "Alinhar ciclos melhora como é o momento de acordar; não resolve o total de horas. A dívida acumulada com noites de 5 horas não se paga dormindo além da conta no fim de semana. A regularidade do horário — principalmente uma hora fixa de acordar — pesa mais para a energia diária que o ajuste fino de uma noite, ponto repetido na literatura de medicina do sono.",
            "Diante de pulseiras e colchões inteligentes, esta ferramenta não coleta dado algum. Os sensores de sono também não são muito precisos ao classificar fases, e aqui tudo é calculado localmente no navegador: nenhuma hora é enviada ou guardada. Serve bem como ponto de partida gratuito; quem quiser medir o próprio ciclo pode depois considerar um dispositivo.",
          ],
        },
      ],
    },
  },
});
