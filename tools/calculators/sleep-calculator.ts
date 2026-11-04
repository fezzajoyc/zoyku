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
    },
  },
});
