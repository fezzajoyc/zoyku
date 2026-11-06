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
        "Epley's formula, published in 1985, and Brzycki's, from 1993, agree closely up to about 10 reps and diverge at higher rep counts — Epley runs slightly optimistic there, which is why showing both beats picking one. Estimates are most accurate when derived from sets of 5 or fewer clean reps.",
        "Compared with testing a true 1RM, estimating from a submaximal set is safer — maxing out demands spotters, sound technique and fresh legs, and the injury risk is real. The percentage table matches what strength coaches use to program working weights. Individual fiber type and lift efficiency shift real maxima by a few percent; treat the number as a starting point.",
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
      deepDive: [
        {
          heading: "Epley vs. Brzycki: two formulas, one bracket",
          paragraphs: [
            "Both formulas estimate the weight you could lift exactly once from a set you actually completed. Epley, published in 1985, computes w × (1 + reps/30); Brzycki, from 1993, computes w × 36/(37 − reps). The two agree closely up to about 10 reps and then diverge — Epley runs slightly optimistic at higher rep counts, Brzycki slightly conservative.",
            "That divergence is why this calculator shows both instead of picking a winner. When the two estimates land within a couple of kilograms, you have a reliable number; when they spread apart, your set sits in the zone where submaximal prediction is shaky and a heavier, shorter test set would sharpen the estimate.",
            "Accuracy is best from sets of roughly 1-6 clean reps. Past a dozen, the lift becomes a test of local endurance rather than strength, and no strength formula can rescue it — which is why the input caps at 20 reps.",
          ],
        },
        {
          heading: "Using the percentage table",
          paragraphs: [
            "The training table inverts Epley's equation: the most you can lift for n reps is roughly 1RM × 30/(30 + n). Ten reps works out to 75% of 1RM, five to about 86%, three to about 91%. Strength coaches program from exactly these percentages — heavy strength blocks around 85-95% for low reps, hypertrophy work around 65-80% for 6-12 reps, endurance higher still.",
            "The percentages are the transferable part of the estimate: once you know your 1RM, you never need to test again to set training weights. Change the program, not the max — and recalculate the max itself only every couple of months as your training numbers drift upward.",
            "Know that real performance drifts by lift: squats tolerate more reps at a given percentage than presses or deadlifts, because the stretch reflex and setup time differ. Treat the table as a starting dose and adjust by how the last reps actually felt.",
          ],
        },
        {
          heading: "Why you should not test a true 1RM",
          paragraphs: [
            "An estimated max exists precisely so you never have to test the real one. A true 1RM attempt demands spotters, fresh technique under maximal load and a properly progressed warm-up; the injury risk is real, and the information gained over a well-executed 3-rep set is marginal.",
            "The estimation loses little: a hard set of 3-5 reps predicts 1RM within a few percent of a true single for most trained lifters. Competitors peaking for a meet are the exception, and they work with coaches and proper safety setups.",
            "One more trap: entering sloppy reps. The formulas assume clean, full-range repetitions — grinding the last rep with poor form inflates the estimate. Also remember the max is exercise-specific: a squat 1RM says nothing about your bench.",
          ],
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
      deepDive: [
        {
          heading: "Epley 与 Brzycki:两个公式,一个区间",
          paragraphs: [
            "两个公式都是用你实际完成的一组来推算“刚好能举一次”的重量。Epley(1985 年发表)算 w × (1 + 次数/30);Brzycki(1993)算 w × 36/(37 − 次数)。两者在 10 次以内高度一致,之后开始分岔——次数越多 Epley 越乐观,Brzycki 越保守。",
            "这正是本工具同时显示两个公式的原因:当两个估计相差只有一两公斤时,结果可信;当两者拉大时,说明这一组落在次极限预测的模糊区,换个更重、次数更短的测试组会更准。",
            "用 1–6 次干净动作的组预测最准。超过十几次,动作就成了局部耐力测试,任何力量公式都救不回来——这也是输入上限设在 20 次的原因。",
          ],
        },
        {
          heading: "百分比表怎么用",
          paragraphs: [
            "训练表是把 Epley 公式反过来用:能做 n 次的最大重量约为 1RM × 30/(30 + n)。10 次对应 1RM 的 75%,5 次约 86%,3 次约 91%。力量教练正是按这些百分比排课:85–95% 的低次数重块练力量,65–80% 的 6–12 次练肌肥大,耐力组更高。",
            "百分比是这个估计里最有迁移价值的部分:知道 1RM 之后,设定训练重量不需要再测。调整的是计划,不是最大值——最大值本身每隔一两个月,随着训练重量的自然上浮重算一次即可。",
            "真实表现因动作而异:同一百分比下,深蹲能做的次数通常多于推举或硬拉,因为牵张反射和预备节奏不同。把表当作起始剂量,按最后几次的真实感受微调。",
          ],
        },
        {
          heading: "为什么不建议真去测一次极限",
          paragraphs: [
            "估算最大值存在的意义,就是让你不必真的去测。真正的 1RM 尝试需要保护者、大重量下不走样的技术和充分的递进热身;受伤风险实打实,而比起一组认真的 3 次测试,多得到的信息非常有限。",
            "估算损失很小:对多数有训练基础的人,一组 3–5 次的力竭组预测 1RM,和真单次的偏差在几个百分点之内。备赛的运动员是例外,而且他们有教练和完善的安全配置。",
            "还有个坑:别录入走样的次数。公式假设的是全程标准的动作——最后一次咬牙变形会高估结果。另外记住,最大值是按动作计算的:深蹲的 1RM 说明不了卧推。",
          ],
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
      deepDive: [
        {
          heading: "Epley と Brzycki:2式で1つのレンジを作る",
          paragraphs: [
            "どちらの式も、実際に挙げたセットから「ちょうど1回挙がる重量」を推定します。Epley(1985年発表)は w × (1 + 回数/30)、Brzycki(1993年)は w × 36/(37 − 回数)。10回程度まではよく一致し、それ以降は乖離します——高回数では Epley がやや楽観的、Brzycki がやや控えめです。",
            "この乖離こそ、このツールが両方を表示する理由です。2つの推定が数 kg 以内に収まれば信頼できる数字。開けば、そのセットはサブマックス予測の曖昧な領域にあり、より重く短いテストセットで絞り込むべきサインです。",
            "精度が高いのは 1〜6 回のきれいなレップ。十数回を超えると局所耐久のテストになり、どの筋力式も救えません——入力上限が 20 回なのはこのためです。",
          ],
        },
        {
          heading: "パーセンテージ表の使い方",
          paragraphs: [
            "トレーニング表は Epley 式の逆算です:n 回挙げられる最大重量はおよそ 1RM × 30/(30 + n)。10回で 1RM の 75%、5回で約 86%、3回で約 91%。ストレングスコーチはまさにこの数値で組む——85〜95% の低回数で筋力、65〜80% の 6〜12回で筋肥大、それ以上で耐久です。",
            "パーセンテージは推定の中で最も転用しやすい部分:1RM を一度知れば、トレーニング重量を決めるのに再テストは不要です。変えるのはプログラムであって MAX ではない——MAX 自体は1〜2か月ごとに、挙上の自然な上昇に合わせて計算し直すだけで十分です。",
            "実際の挙上は種目でずれます:同じパーセンテージでも、ストレッチ反射やセットアップの違いから、スクワットはプレスやデッドリフトより多くの回数に耐えます。表は初期用量として、最後の数回の感触で微調整を。",
          ],
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
      deepDive: [
        {
          heading: "Epley frente a Brzycki: dos fórmulas, un corchete",
          paragraphs: [
            "Ambas fórmulas estiman el peso que podrías levantar una sola vez a partir de una serie que ya completaste. Epley, publicada en 1985, calcula w × (1 + reps/30); Brzycki, de 1993, calcula w × 36/(37 − reps). Coinciden de cerca hasta unas 10 repeticiones y luego divergen — Epley se vuelve algo optimista con series largas, Brzycki algo conservadora.",
            "Esa divergencia es la razón de que esta calculadora muestre ambas: cuando las dos estimaciones caen a un par de kilos de distancia tienes una cifra fiable; cuando se separan, tu serie está en la zona donde la predicción submáxima es débil y convendría una serie más pesada y corta.",
            "La precisión es máxima con series de 1-6 repeticiones limpias. Más de una docena y el levantamiento se convierte en una prueba de resistencia local que ninguna fórmula de fuerza puede rescatar — por eso la entrada se limita a 20 repeticiones.",
          ],
        },
        {
          heading: "Cómo usar la tabla de porcentajes",
          paragraphs: [
            "La tabla invierte la ecuación de Epley: el máximo que puedes levantar para n repeticiones es aproximadamente 1RM × 30/(30 + n). Diez repeticiones sale al 75 % del 1RM, cinco al 86 %, tres al 91 %. Los entrenadores de fuerza programan con exactamente estos porcentajes: bloques pesados de 85-95 % para fuerza, trabajo de 65-80 % a 6-12 repeticiones para hipertrofia.",
            "Los porcentajes son la parte transferible del cálculo: una vez conocido tu 1RM, no necesitas volver a probar para fijar cargas. Cambia el programa, no el máximo — y recalcula el máximo solo cada par de meses, según suban tus series de entrenamiento.",
            "El rendimiento real varía por ejercicio: al mismo porcentaje, la sentadilla aguanta más repeticiones que el press o el peso muerto por el reflejo de estiramiento y el tiempo de preparación. Toma la tabla como dosis inicial y ajusta según cómo sintieras las últimas repeticiones.",
          ],
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
      deepDive: [
        {
          heading: "Epley versus Brzycki: duas fórmulas, um colchete",
          paragraphs: [
            "Ambas as fórmulas estimam o peso que você conseguiria levantar uma única vez a partir de uma série que já completou. Epley, publicada em 1985, calcula w × (1 + reps/30); Brzycki, de 1993, calcula w × 36/(37 − reps). Elas coincidem de perto até cerca de 10 repetições e depois divergem — Epley fica um pouco otimista em séries longas, Brzycki um pouco conservadora.",
            "Essa divergência é o motivo de esta calculadora mostrar as duas: quando as estimativas caem a poucos quilos de distância você tem um número confiável; quando se afastam, sua série está na zona em que a previsão submáxima é frágil e uma série mais pesada e curta afinaria a estimativa.",
            "A precisão é máxima em séries de 1-6 repetições limpas. Passada uma dúzia, o levantamento vira teste de resistência local que nenhuma fórmula de força resgata — por isso a entrada limita a 20 repetições.",
          ],
        },
        {
          heading: "Como usar a tabela de percentuais",
          paragraphs: [
            "A tabela inverte a equação de Epley: o máximo que você levanta para n repetições é cerca de 1RM × 30/(30 + n). Dez repetições dão 75 % do 1RM, cinco cerca de 86 %, três cerca de 91 %. Treinadores de força programam exatamente com esses percentuais: blocos pesados de 85-95 % para força, trabalho de 65-80 % a 6-12 repetições para hipertrofia.",
            "Os percentuais são a parte transferível da estimativa: conhecendo seu 1RM, você nunca mais precisa testar para definir cargas. Mude o programa, não o máximo — e recalcule o máximo apenas a cada dois meses, conforme suas séries de treino sobem.",
            "O desempenho real varia por exercício: no mesmo percentual, o agachamento aguenta mais repetições que o supino ou o levantamento terra, pelo reflexo de alongamento e o tempo de preparação. Tome a tabela como dose inicial e ajuste pela sensação das últimas repetições.",
          ],
        },
      ],
    },
  },
});
