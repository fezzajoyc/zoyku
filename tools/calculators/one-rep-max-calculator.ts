import { CalcEngineOrm } from "../_engines/calc-engine-orm";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "one-rep-max-calculator",
  category: "utility",
  icon: "calc",
  engine: { component: CalcEngineOrm },
  related: ["pace-calculator", "bmi-calculator", "sleep-calculator", "percentage-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "One Rep Max Calculator",
      tagline: "Estimate your one-rep max from any weight-and-reps set with Epley and Brzycki formulas, plus a 1–12 rep training table with percentages of 1RM.",
      intro: [
        "Enter a weight you lifted and how many clean reps you completed, and get your estimated one-rep max (1RM) from two established formulas: Epley's w × (1 + reps/30) and Brzycki's w × 36/(37 − reps). At 225 lb × 10 both land on exactly 300 lb, which is why that set is a gym classic.",
        "Below the estimate, a training table converts your 1RM into working weights: the heaviest load you can expect to lift for each rep count from 1 to 12, with its percentage of 1RM — the percentages coaches use to program strength, hypertrophy and endurance blocks.",
      ],
      steps: [
        "Enter the weight you lifted and choose kg or lb.",
        "Enter the number of reps you completed with good form.",
        "Read the Epley and Brzycki estimates and the 1–12 rep training table underneath.",
      ],
      faqs: [
        {
          q: "Which formula should I trust?",
          a: "Both are estimates from submaximal sets, and both are most accurate between about 4 and 10 reps. Epley (1976) runs slightly optimistic at low rep counts; Brzycki (1993) runs slightly conservative. The usual practice is to treat the two numbers as a bracket: if they agree within a few kilograms, you have a reliable 1RM estimate.",
        },
        {
          q: "Why does the table show 75% of 1RM for 10 reps?",
          a: "The percentages come from inverting the Epley equation: the most you can lift for n reps is roughly 1RM × 30/(30 + n). Ten reps works out to 75%, five reps to about 86%. Real percentages drift with the lift (squats tolerate more reps than presses) and with your fiber makeup, so treat the table as a starting point for programming.",
        },
        {
          q: "Why can't I enter more than 20 reps?",
          a: "Because the formulas stop meaning anything there. Past ~12 reps the result is dominated by local endurance rather than strength, and Brzycki's denominator (37 − reps) collapses toward zero. High-rep sets measure conditioning; if you want a max estimate from them, use a lighter-weight formula designed for endurance work.",
        },
      ],
    },
    zh: {
      name: "极限重量计算器",
      tagline: "用 Epley 与 Brzycki 两个公式,从任意“重量 × 次数”组推算单次极限重量(1RM),并生成 1–12 次的训练重量与 1RM 百分比对照表。",
      intro: [
        "输入你完成的重量和标准动作次数,即可用两个经典公式估算单次极限重量:Epley 的 w × (1 + reps/30) 与 Brzycki 的 w × 36/(37 − reps)。225 磅 × 10 次时两个公式都恰好得到 300 磅,这就是这组数据在健身房经久不衰的原因。",
        "估算值下方是训练对照表:把 1RM 换算成 1–12 次各能举起的最大重量及其占 1RM 的百分比——这正是教练安排力量、增肌与耐力周期时所用的百分比。",
      ],
      steps: [
        "输入完成的重量,选择公斤或磅。",
        "输入以标准动作完成的次数。",
        "查看 Epley 与 Brzycki 两个估算值,以及下方的 1–12 次训练表。",
      ],
      faqs: [
        {
          q: "应该信哪个公式?",
          a: "两个都是由次极限组推算的估计值,在约 4–10 次的范围内最准确。Epley(1976)在低次数端略偏乐观,Brzycki(1993)略偏保守。常见做法是把两个数当作区间:若两者只差几公斤,说明这个 1RM 估计相当可靠。",
        },
        {
          q: "为什么 10 次对应 1RM 的 75%?",
          a: "百分比由 Epley 公式反推而来:n 次能举起的最大重量约为 1RM × 30/(30 + n)。10 次即 75%,5 次约 86%。实际百分比会因动作(深蹲比推举更耐多次数)和个人肌纤维类型而漂移,把它当作训练安排的起点即可。",
        },
        {
          q: "为什么次数最多只能填 20?",
          a: "因为超过这个范围公式就失去意义。约 12 次以上,结果主要由局部耐力而非力量决定,而且 Brzycki 的分母(37 − reps)会趋近于零。高次数组测的是心肺与耐力;若想从中估极限,请改用面向耐力训练的公式。",
        },
      ],
    },
    ja: {
      name: "1RM 計算",
      tagline: "挙上重量とレップ数から Epley・Brzycki の 2 式で 1RM(シングルマックス)を推定。1〜12 レップのトレーニング重量と 1RM 比率表も付きます。",
      intro: [
        "持ち上げた重量と正しいフォームでできたレップ数を入力すると、2 つの確立された式で 1RM を推定します:Epley の w × (1 + reps/30) と Brzycki の w × 36/(37 − reps)。225 ポンド × 10 レップでは両式ともちょうど 300 ポンドになり、このセットが定番である理由がわかります。",
        "推定値の下にはトレーニング表があります。1RM を 1〜12 レップの各回数で挙げられる最大重量と、その 1RM に対する割合に換算したもので、コーチが筋力・筋肥大・耐力のメニューを組むときに使う百分率そのものです。",
      ],
      steps: [
        "挙上重量を入力し、kg か lb を選びます。",
        "正しいフォームで完了したレップ数を入力します。",
        "Epley と Brzycki の推定値と、下の 1〜12 レップの表を確認します。",
      ],
      faqs: [
        {
          q: "どちらの式を信じるべきですか?",
          a: "どちらもサブマックスのセットからの推定で、およそ 4〜10 レップの範囲で最も正確です。Epley(1976)は低レップ側でやや楽観的、Brzycki(1993)はやや保守的です。一般的には 2 つの数値を範囲として扱います。数 kg 以内で一致していれば、1RM 推定は信頼できます。",
        },
        {
          q: "10 レップが 1RM の 75% になるのはなぜですか?",
          a: "百分率は Epley の式を逆算したもので、n レップで挙げられる最大重量はおよそ 1RM × 30/(30 + n) です。10 レップで 75%、5 レップで約 86% になります。実際の値は種目(スクワットはプレスより高レップに耐える)や筋繊維組成でずれるため、メニュー作りの出発点としてください。",
        },
        {
          q: "20 レップを超えて入力できないのはなぜですか?",
          a: "その範囲を超えると式が意味を持たなくなるからです。12 レップ前後を超えると結果は力よりも局所耐性に支配され、Brzycki の分母(37 − レップ)はゼロに近づきます。高レップのセットは持久力の指標です。そこから最大重量を推定したい場合は、持久系向けの軽負荷式を使ってください。",
        },
      ],
    },
    es: {
      name: "Calculadora de 1RM",
      tagline: "Estime su máximo de una repetición desde cualquier serie con las fórmulas de Epley y Brzycki, más una tabla de 1–12 repeticiones con porcentajes del 1RM.",
      intro: [
        "Introduzca el peso que levantó y las repeticiones limpias que completó, y obtenga su 1RM estimado con dos fórmulas consolidadas: la de Epley, w × (1 + reps/30), y la de Brzycki, w × 36/(37 − reps). Con 225 lb × 10 ambas dan exactamente 300 lb; por eso esa serie es un clásico del gimnasio.",
        "Bajo la estimación hay una tabla de entrenamiento que convierte su 1RM en pesos de trabajo: la carga máxima esperada para cada número de repeticiones de 1 a 12 y su porcentaje del 1RM — los mismos porcentajes que usan los entrenadores para programar fuerza, hipertrofia y resistencia.",
      ],
      steps: [
        "Introduzca el peso levantado y elija kg o lb.",
        "Introduzca las repeticiones completadas con buena técnica.",
        "Lea las estimaciones de Epley y Brzycki y la tabla de 1 a 12 repeticiones.",
      ],
      faqs: [
        {
          q: "¿Qué fórmula debo seguir?",
          a: "Las dos son estimaciones a partir de series submáximas y ambas son más precisas entre 4 y 10 repeticiones. Epley (1976) es ligeramente optimista con pocas repeticiones; Brzycki (1993) ligeramente conservador. Lo habitual es tratar los dos números como una horquilla: si coinciden dentro de unos pocos kilos, su estimación de 1RM es fiable.",
        },
        {
          q: "¿Por qué la tabla muestra el 75 % del 1RM para 10 repeticiones?",
          a: "Los porcentajes salen de invertir la ecuación de Epley: lo máximo que se puede levantar para n repeticiones es aproximadamente 1RM × 30/(30 + n). Diez repeticiones dan un 75 % y cinco un 86 %. Los valores reales varían según el ejercicio (la sentadilla aguanta más repeticiones que el press) y su composición muscular: use la tabla como punto de partida.",
        },
        {
          q: "¿Por qué no puedo poner más de 20 repeticiones?",
          a: "Porque a partir de ahí las fórmulas dejan de tener sentido. Pasadas unas 12 repeticiones el resultado depende más de la resistencia local que de la fuerza, y el denominador de Brzycki (37 − reps) se acerca a cero. Las series largas miden capacidad aeróbica; para estimar un máximo con ellas use fórmulas de endurance.",
        },
      ],
    },
    pt: {
      name: "Calculadora de 1RM",
      tagline: "Estime sua carga máxima de uma repetição a partir de qualquer série com as fórmulas de Epley e Brzycki, mais uma tabela de 1–12 reps com porcentagens do 1RM.",
      intro: [
        "Digite o peso que você levantou e quantas repetições limpas completou, e receba seu 1RM estimado por duas fórmulas consagradas: a de Epley, w × (1 + reps/30), e a de Brzycki, w × 36/(37 − reps). Com 225 lb × 10, as duas dão exatamente 300 lb — por isso essa série é um clássico da academia.",
        "Abaixo da estimativa, uma tabela de treino converte seu 1RM em cargas de trabalho: o peso máximo esperado para cada número de repetições de 1 a 12 e sua porcentagem do 1RM — os mesmos percentuais que treinadores usam para programar força, hipertrofia e resistência.",
      ],
      steps: [
        "Digite o peso levantado e escolha kg ou lb.",
        "Digite o número de repetições completadas com boa execução.",
        "Leia as estimativas de Epley e Brzycki e a tabela de 1 a 12 repetições.",
      ],
      faqs: [
        {
          q: "Em qual fórmula devo confiar?",
          a: "As duas são estimativas a partir de séries submáximas e as duas são mais precisas entre 4 e 10 repetições. Epley (1976) fica levemente otimista em reps baixas; Brzycki (1993), levemente conservador. O usual é tratar os dois números como uma faixa: se coincidirem dentro de poucos quilos, sua estimativa de 1RM é confiável.",
        },
        {
          q: "Por que a tabela mostra 75% do 1RM para 10 repetições?",
          a: "As porcentagens vêm de inverter a equação de Epley: o máximo que se consegue levantar em n reps é cerca de 1RM × 30/(30 + n). Dez reps dão 75% e cinco, cerca de 86%. Os valores reais variam com o exercício (o agachamento aguenta mais reps que o supino) e com sua composição de fibras: use a tabela como ponto de partida.",
        },
        {
          q: "Por que não posso digitar mais de 20 repetições?",
          a: "Porque além disso as fórmulas deixam de fazer sentido. Acima de ~12 reps o resultado é dominado por resistência local, não por força, e o denominador de Brzycki (37 − reps) caminha para zero. Séries longas medem condicionamento; para estimar um máximo com elas, use fórmulas próprias para endurance.",
        },
      ],
    },
  },
});
