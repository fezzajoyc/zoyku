import { CalcEngineGrade } from "../_engines/calc-engine-grade";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "grade-calculator",
  category: "utility",
  icon: "calc",
  engine: { component: CalcEngineGrade },
  related: ["percentage-calculator", "contrast-checker", "emi-calculator", "bmi-calculator", "gradient-generator"],
  copy: {
    en: {
      name: "Grade Calculator",
      tagline:
        "Weighted or points-based grade calculator: add assignments, see your current grade and letter, and find out exactly what to score on the final exam.",
      intro: [
        "Add each assignment with its score, out-of value and (in weighted mode) its percentage weight, and watch your current grade and letter update live. Points mode treats everything by raw points earned out of points possible, which is how many STEM courses actually grade.",
        "The built-in final-exam calculator answers the question you actually care about: with the final worth X% or X points, what score do you need to land your target overall grade? It tells you straight when the target is already secured or mathematically out of reach, and the grading scale is switchable — US 10-point A–F, plus/minus, pass/fail or your own thresholds.",
      
        "Weighted mode normalizes each weight to a percentage of the total and applies it to that item's percentage score — so a 30% midterm at 85% contributes 25.5 points to the weighted average. Points mode instead sums earned/possible, which matches how most STEM syllabi actually grade and avoids the distortion of averaging percentages.",
        "Compared with doing this in a spreadsheet, the final-exam calculator answers 'what do I need' directly: enter the final's weight and your target grade, and it returns the required score — or tells you the target is already locked in or mathematically out of reach. The grading scale is switchable between US 10-point A–F, plus/minus, pass/fail and custom thresholds, so it adapts to the syllabus rather than forcing one.",
      ],
      steps: [
        "Add a row per assignment: name (optional), score, out-of value and weight in weighted mode.",
        "Switch between Weighted and Points to match how your course is graded.",
        "Enter the final exam's weight or points and your target overall percentage.",
        "Read the required final score — or pick the letter scale you need.",
      ],
      faqs: [
        {
          q: "What is the difference between weighted and points mode?",
          a: "Weighted mode gives every assignment a percentage weight and computes Σ(weight × score ÷ max) ÷ Σweights. Points mode ignores weights and divides points earned by points possible. A 90/100 homework is worth the same as a 45/50 quiz in points mode, but only as much as its weight says in weighted mode.",
        },
        {
          q: "What if my weights don't add up to 100%?",
          a: "That's fine. The current grade normalizes by the weights you actually entered, so a half-graded course still shows a fair number. The final-exam calculation then stacks the final's weight on top of the graded weight, exactly as your syllabus intends.",
        },
        {
          q: "The final requirement says 104% — what does that mean?",
          a: "That your target is out of reach with this final: even a perfect 100% leaves you short of the overall grade. Lower the target or look for extra credit. A negative number means the opposite — the target is already locked in no matter what you score.",
        },
      ],
    },
    zh: {
      name: "成绩计算器",
      tagline:
        "加权制 / 按分制两种算法:逐项录入成绩,实时看到总评和等级,还能反推期末要考多少分才能达到目标绩点,等级标准可自定义。",
      intro: [
        "逐项添加成绩:得分、满分,加权模式下再填权重百分比,总评和等级实时更新。按分制只看原始得分 ÷ 总满分,很多理工科课程就是这样算的。",
        "内置的期末反推直接回答你最关心的问题:期末占 X%(或 X 分)时,要考多少分才能拿到目标总评?目标已经稳了还是数学上已不可能,都会如实告诉你。等级标准可切换——美制 10 分制 A–F、带正负号、及格制,或自定义门槛。",
      ],
      steps: [
        "每项成绩加一行:名称(可留空)、得分、满分,加权模式还要填权重。",
        "在「按权重」和「按分数」之间切换,匹配你课程的算分方式。",
        "填入期末的权重或分数,以及目标总评百分比。",
        "查看期末需要的分数——或切换你需要的等级标准。",
      ],
      faqs: [
        {
          q: "按权重和按分数有什么区别?",
          a: "按权重给每项一个百分比权重,算 Σ(权重 × 得分 ÷ 满分) ÷ Σ权重;按分数不看权重,直接用总得分 ÷ 总满分。同样一份 90/100 的作业,按分制里和 45/50 的小测等值,按权重制里只值它的权重那么多。",
        },
        {
          q: "权重加起来不是 100% 怎么办?",
          a: "没关系。当前总评按你实际填的权重归一化,课程只上到一半也能公平显示。期末反推再把期末权重叠加在已计入权重之上,和教学大纲的逻辑一致。",
        },
        {
          q: "期末需要 104% 是什么意思?",
          a: "意思是按这个期末权重,目标总评已经达不到了——就算期末考满分也不够。要么调低目标,要么争取附加分。反过来,负数说明目标已经稳拿,期末考多少都不影响。",
        },
      ],
    },
    ja: {
      name: "成績計算ツール",
      tagline:
        "加重 / 配点の 2 方式に対応:課題を入力すると現在の成績と評価がリアルタイムで出て、期末に何点取れば目標に届くかも逆算できます。",
      intro: [
        "各課題の得点・満点(加重方式では比重 %)を 1 行ずつ入れると、現在の成績と評価がリアルタイムに更新されます。配点方式は素の得点 ÷ 配点総計だけを見るので、多くの理数系科目の採点方式にその一致します。",
        "内蔵の期末逆算は、本当に知りたい質問に答えます:期末が X%(または X 点)のとき、目標の総合成績に届くには何点が必要?目標がすでに確定しているか、数学的に届かないかも正直に表示します。評価基準は米国 10 段階 A–F、プラス / マイナス、合格 / 不合格、カスタムしきい値から選べます。",
      ],
      steps: [
        "課題ごとに 1 行追加:名前(任意)・得点・満点、加重方式なら比重も。",
        "「加重」と「配点」を切り替えて、科目の採点方式に合わせます。",
        "期末の比重または配点と、目標の総合パーセントを入力します。",
        "期末に必要なスコアを確認 — または評価基準を切り替えます。",
      ],
      faqs: [
        {
          q: "加重方式と配点方式の違いは?",
          a: "加重方式は各課題に比重 % を付け、Σ(比重 × 得点 ÷ 満点) ÷ Σ比重で計算します。配点方式は比重を無視して、獲得点 ÷ 配点総計です。90/100 の課題は配点方式では 45/50 の小テストと同等ですが、加重方式ではその比重ぶんしか効きません。",
        },
        {
          q: "比重の合計が 100% にならない場合は?",
          a: "問題ありません。現在の成績は入力済みの比重で正規化するので、学期の途中でも公平な数値が出ます。期末の逆算は、その計算済みの比重に期末の比重を上乗せして行います。シラバスの考え方どおりです。",
        },
        {
          q: "期末の要件が 104% と出たのはどういう意味?",
          a: "この期末の比重では目標に届かないという意味です — 期末で 100% を取っても総合には足りません。目標を下げるか、加点を探しましょう。逆に負の数は目標がすでに確定していて、期末の結果に関係なく達成済みという意味です。",
        },
      ],
    },
    es: {
      name: "Calculadora de notas",
      tagline:
        "Calculadora de notas ponderada o por puntos: añade tareas, mira tu nota y letra actuales y descubre exactamente qué necesitas en el examen final.",
      intro: [
        "Añade cada tarea con su nota, el máximo y (en modo ponderado) su peso porcentual, y ve tu nota y letra actualizarse en vivo. El modo por puntos solo mira puntos ganados entre puntos posibles, como califican muchos cursos de ciencias.",
        "La calculadora de examen final responde la pregunta que de verdad te importa: si el final vale X% o X puntos, ¿qué nota necesitas para lograr tu objetivo global? Te dice sin rodeos si ya lo tienes asegurado o si es matemáticamente imposible, y la escala es configurable: A–F de 10 niveles, con ±, apto / no apto o tus propios umbrales.",
      ],
      steps: [
        "Añade una fila por tarea: nombre (opcional), nota, máximo y peso en modo ponderado.",
        "Alterna entre Ponderado y Puntos según califique tu curso.",
        "Introduce el peso o los puntos del examen final y tu porcentaje objetivo.",
        "Lee la nota final requerida — o elige la escala de letras que necesites.",
      ],
      faqs: [
        {
          q: "¿Qué diferencia hay entre el modo ponderado y el de puntos?",
          a: "El ponderado asigna a cada tarea un peso porcentual y calcula Σ(peso × nota ÷ máximo) ÷ Σpesos. El de puntos ignora los pesos y divide puntos ganados entre puntos posibles. Una tarea de 90/100 vale lo mismo que un quiz de 45/50 en puntos, pero solo lo que diga su peso en ponderado.",
        },
        {
          q: "¿Y si mis pesos no suman 100%?",
          a: "No pasa nada. La nota actual se normaliza con los pesos que hayas introducido, así que un curso a medio evaluar sigue mostrando un número justo. El cálculo del final apila el peso del examen sobre el peso ya evaluado, tal y como plantea el programa.",
        },
        {
          q: "El requisito del final dice 104 %, ¿qué significa?",
          a: "Que tu objetivo es inalcanzable con ese final: incluso con un 100% te quedas corto del objetivo global. Baja el objetivo o busca puntos extra. Un número negativo significa lo contrario: el objetivo ya está asegurado pase lo que pase.",
        },
      ],
    },
    pt: {
      name: "Calculadora de notas",
      tagline:
        "Calculadora de notas ponderada ou por pontos: adicione atividades, veja sua nota e conceito atuais e descubra o que precisa no exame final.",
      intro: [
        "Adicione cada atividade com a nota, o valor máximo e (no modo ponderado) o peso percentual, e veja sua nota e conceito atualizarem ao vivo. O modo por pontos olha apenas pontos ganados sobre pontos possíveis, como muitos cursos de exatas avaliam.",
        "A calculadora do exame final responde à pergunta que realmente importa: se o final vale X% ou X pontos, de que nota você precisa para bater sua meta global? Ela diz sem rodeios quando a meta já está garantida ou quando é matematicamente impossível, e a escala é configurável — A–F de 10 níveis, com ±, aprovado / reprovado ou seus próprios limites.",
      ],
      steps: [
        "Adicione uma linha por atividade: nome (opcional), nota, máximo e peso no modo ponderado.",
        "Alterne entre Ponderado e Pontos para seguir o critério do seu curso.",
        "Informe o peso ou os pontos do exame final e sua porcentagem alvo.",
        "Leia a nota final necessária — ou escolha a escala de conceitos.",
      ],
      faqs: [
        {
          q: "Qual a diferença entre o modo ponderado e o por pontos?",
          a: "No ponderado cada atividade tem um peso percentual e o cálculo é Σ(peso × nota ÷ máximo) ÷ Σpesos. No por pontos os pesos são ignorados e divide-se pontos ganados por pontos possíveis. Um trabalho 90/100 vale o mesmo que um quiz 45/50 no modo por pontos, mas só o que o peso disser no ponderado.",
        },
        {
          q: "E se meus pesos não somarem 100%?",
          a: "Sem problema. A nota atual é normalizada pelos pesos que você digitou, então um curso avaliado pela metade ainda mostra um número justo. O cálculo do final empilha o peso do exame sobre o peso já avaliado, exatamente como o plano de ensino prevê.",
        },
        {
          q: "O requisito do final diz 104% — o que significa?",
          a: "Que sua meta é inalcançável com esse final: mesmo com 100% você fica aquém da nota global. Reduza a meta ou busque pontos extras. Um número negativo significa o contrário — a meta já está garantida, não importa a nota do final.",
        },
      ],
    },
  },
});
