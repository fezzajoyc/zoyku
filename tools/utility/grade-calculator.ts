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
      deepDive: [
        {
          heading: "Weighted averages: the arithmetic behind the result",
          paragraphs: [
            "A course grade is almost never the plain average of its parts: homework, midterm and final exam contribute with different weights, typically set by the syllabus. The weighted average multiplies each score by its weight and divides by the total weight — mathematically identical to how a GPA credits courses by credit hours, just one level down.",
            "The total weight should equal 100%. When parts are still ungraded, the meaningful number is the current standing: your weighted average over the graded parts so far, plus what score you need on the remaining work to reach a target grade. The needed-score formula is (target × total weight − current weighted sum) ÷ remaining weight — this is the \"what do I need on the final\" calculation every student runs in December.",
            "Beware the denominator trap: averaging the graded parts without weighting them by their actual weights gives a different number whenever weights differ — and it is almost always the wrong one. A 100% on a 10% homework does not offset a 60% on a 50% exam.",
          ],
        },
        {
          heading: "Scale conventions differ — check your syllabus",
          paragraphs: [
            "Most US institutions map letters on a 4.0 scale (A = 4.0, B = 3.0), but the plus/minus handling varies: some schools give A− = 3.7, others 3.67, a few round A− down to 3.0. Percentage-to-letter cutoffs also drift between courses — 89.5% may be an A or an A− depending on the professor. The calculator applies one conventional mapping; your registrar's table is the authoritative one.",
            "Weighting details to verify: whether the lowest homework score is dropped, whether attendance or participation carries a weight, and whether the final exam can replace earlier scores. These policies change the arithmetic meaningfully and live in the syllabus, not in any calculator.",
            "When simulating outcomes, enter plausible future scores, not optimistic ones — the point of the calculation is knowing the score you need, and planning for the minimum passing scenario is more useful than planning for a miracle.",
          ],
        },
        {
          heading: "Local, private grade math",
          paragraphs: [
            "Everything computes in your browser as you type. Grades are among the most sensitive personal data there is — a tool that uploads them would be the wrong tool. Nothing is stored, logged or transmitted; refresh and the sheet resets.",
            "The calculator handles partial rows the safe way: a course with missing scores contributes nothing rather than counting as zero, which would silently punish work not yet done.",
            "For cumulative GPA across semesters, pair this with the GPA calculator — the two tools cover course-level and transcript-level questions respectively, and both run entirely on your device.",
          ],
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
      deepDive: [
        {
          heading: "加权平均:结果背后的算术",
          paragraphs: [
            "课程成绩几乎从来不是各部分的简单平均:作业、期中、期末按教学大纲设定的不同权重计入。加权平均把每项分数乘以权重再除以总权重——数学上与 GPA 按学分加权课程是一回事,只是低一层级。",
            "总权重应当等于 100%。当部分项目还没出分时,有意义的数字是“当前水平”:已出分部分按权重的加权平均,再加上剩余作业需要多少分才能达到目标等级。所需分数公式是(目标 × 总权重 − 当前加权得分)÷ 剩余权重——这就是每个学生十二月都在算的“期末要考多少分”。",
            "小心分母陷阱:不给已出分部分按实际权重加权,只要权重不同,得到的数就不同——而且几乎总是错的。10% 权重的作业拿 100%,抵不了 50% 权重的考试拿 60%。",
          ],
        },
        {
          heading: "换算口径各校不同——以大纲为准",
          paragraphs: [
            "多数美国院校按 4.0 制映射字母等级(A = 4.0,B = 3.0),但加减号的处理不一:有的学校 A− = 3.7,有的 3.67,少数直接把 A− 按 3.0 算。百分比到字母的切分线也随课程漂移——89.5% 可能是 A,也可能是 A−,取决于教授。本工具采用一个通行映射;你所在学校的教务表才是权威。",
            "需要核实的加权细节:是否去掉最低一次作业、出勤或课堂参与是否占权重、期末能否替换之前的分数。这些政策会实质改变算术结果,而且它们写在教学大纲里,不在任何计算器里。",
            "模拟结果时,输入的是可信的未来分数而不是乐观分数——这个计算的意义在于知道“你需要多少分”,按“最低及格场景”做计划,比按奇迹发生做计划有用。",
          ],
        },
        {
          heading: "本地、私密的分数计算",
          paragraphs: [
            "一切在你输入时于浏览器内完成。成绩是最敏感的个人数据之一——会上传成绩的工具本身就是错的工具。不存储、不记录、不发送;刷新即重置。",
            "对不完整的行,计算器按安全方式处理:缺分的课程不计入,而不是按零分算——按零分算会悄悄惩罚还没完成的部分。",
            "跨学期的累计 GPA 请配合 GPA 计算器使用——两个工具分别覆盖课程层面和成绩单层面的问题,而且都完全在你的设备上运行。",
          ],
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
      deepDive: [
        {
          heading: "加重平均:結果の裏にある算術",
          paragraphs: [
            "科目の成績はほぼ決して各要素の単純平均ではありません。課題、中間、期末がシラバスの定める異なる重みで寄与します。加重平均は各点数に重みを掛け、総重みで割ります。GPA が単位数で科目を重み付けするのと数学的に同一で、一段下の層です。",
            "総重みは 100% になるべきです。まだ評価されていない要素があるとき、意味のある数は現在位置です。評価済み部分の加重平均に、残りの課題で目標評価に届くのに必要な点数を足したもの。必要点数の式は(目標 × 総重み − 現在の加重和)÷ 残り重み——12 月に全学生がやる「期末で何点必要か」の計算です。",
            "分母の罠に注意。評価済み部分を実重みで掛けずに平均すると、重みが異なる限り別の数になり、しかもほぼ常に間違った方です。重み 10% の課題の 100% は、重み 50% の試験の 60% を相殺しません。",
          ],
        },
        {
          heading: "換算の基準は学校ごとに違う——シラバス確認",
          paragraphs: [
            "米国の多くの機関は 4.0 制で字母を対応させます(A = 4.0、B = 3.0)が、プラス・マイナスの扱いは揺れます。A− を 3.7 とする学校、3.67 とする学校、少数は A− を 3.0 に切り下げます。パーセントから字母への切れ目も科目ごとに動き、89.5% は教授次第で A にも A− にもなります。この計算機は一つの通行的な対応を適用します。あなたの大学の教务表が権威です。",
            "確認すべき加重の細部:最低の課題点を落とすか、出席や参加に重みを与えるか、期末が先行の点数を置き換えられるか。これらの方針は算術を有意に変え、どの計算器でもなくシラバスの中にあります。",
            "結果をシミュレートするときは、楽観的な点ではなく妥当な未来の点を入力します。計算の目的は「自分に必要な点」を知ることで、奇跡のシナリオではなく最低合格ラインで計画するほうが有用です。",
          ],
        },
        {
          heading: "ローカルで、プライベートな成績計算",
          paragraphs: [
            "すべては入力に合わせてブラウザ内で計算されます。成績は最も機微な個人データの一つであり、アップロードするツールは誤った道具です。保存も記録も送信もなし。更新すればシートはリセットされます。",
            "中途半端な行は安全に扱われます。点数のない要素はゼロとして数えられるのではなく寄与しない——ゼロ扱いはまだ終えていない課題を黙って罰します。",
            "学期をまたぐ累積 GPA には GPA 計算機と組み合わせてください。2 つのツールは科目レベルと成績表レベルをそれぞれ覆い、どちらも完全に端末上で動きます。",
          ],
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
      deepDive: [
        {
          heading: "Promedios ponderados: la aritmética tras el resultado",
          paragraphs: [
            "La nota de una asignatura casi nunca es la media simple de sus partes: tareas, parcial y examen final contribuyen con pesos distintos, normalmente fijados en el programa. El promedio ponderado multiplica cada puntuación por su peso y divide por el peso total — matemáticamente idéntico a cómo el GPA pondera asignaturas por créditos, un nivel más abajo.",
            "El peso total debería ser 100%. Cuando algunas partes siguen sin calificar, el número significativo es la situación actual: tu promedio ponderado sobre las partes ya calificadas, más qué puntuación necesitas en el trabajo restante para alcanzar la nota objetivo. La fórmula de la nota necesaria es (objetivo × peso total − suma ponderada actual) ÷ peso restante — es el cálculo de \"qué necesito en el final\" que todo estudiante hace en diciembre.",
            "Cuidado con la trampa del denominador: promediar las partes calificadas sin ponderarlas por sus pesos reales da un número distinto siempre que los pesos difieran — y casi siempre es el equivocado. Un 100% en una tarea del 10% no compensa un 60% en un examen del 50%.",
          ],
        },
        {
          heading: "Las convenciones de escala difieren — revisa tu programa",
          paragraphs: [
            "La mayoría de instituciones de EE. UU. mapea letras en una escala 4.0 (A = 4.0, B = 3.0), pero el manejo de más/menos varía: unas escuelas dan A− = 3.7, otras 3.67, algunas redondean A− a 3.0. Los cortes de porcentaje a letra también se mueven entre asignaturas — 89,5% puede ser A o A− según el profesor. La calculadora aplica un mapeo convencional; la tabla de tu registro académico es la autoridad.",
            "Detalles de ponderación que conviene verificar: si la peor tarea se descarta, si la asistencia o participación lleva peso, y si el examen final puede reemplazar notas anteriores. Estas políticas cambian la aritmética de forma significativa y viven en el programa de la asignatura, no en ninguna calculadora.",
            "Al simular resultados, introduce puntuaciones futuras plausibles, no optimistas — el punto del cálculo es saber qué puntuación necesitas, y planificar para el escenario mínimo de aprobado es más útil que planificar para un milagro.",
          ],
        },
        {
          heading: "Cálculo de notas local y privado",
          paragraphs: [
            "Todo se calcula en tu navegador mientras escribes. Las notas están entre los datos personales más sensibles que existen — una herramienta que las subiera sería la herramienta equivocada. Nada se guarda, registra ni transmite; recarga y la hoja se reinicia.",
            "La calculadora trata las filas parciales de forma segura: una asignatura con puntuaciones ausentes no contribuye en lugar de contarse como cero, lo que castigaría en silencio el trabajo aún no hecho.",
            "Para el GPA acumulado entre semestres, combínalo con la calculadora de GPA — las dos herramientas cubren el nivel de asignatura y el nivel de expediente, y ambas corren por completo en tu dispositivo.",
          ],
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
      deepDive: [
        {
          heading: "Médias ponderadas: a aritmética atrás do resultado",
          paragraphs: [
            "A nota de uma disciplina quase nunca é a média simples das partes: tarefas, prova parcial e exame final contribuem com pesos diferentes, normalmente fixados no programa. A média ponderada multiplica cada pontuação pelo seu peso e divide pelo peso total — matematicamente idêntico a como o GPA pondera disciplinas por créditos, um nível abaixo.",
            "O peso total deve ser 100%. Quando algumas partes ainda não têm nota, o número significativo é a situação atual: sua média ponderada sobre as partes já avaliadas, mais qual pontuação você precisa no trabalho restante para alcançar a nota-alvo. A fórmula da nota necessária é (alvo × peso total − soma ponderada atual) ÷ peso restante — é o cálculo de \"quanto preciso no exame final\" que todo estudante faz em dezembro.",
            "Cuidado com a armadilha do denominador: fazer a média das partes avaliadas sem ponderá-las pelos pesos reais dá um número diferente sempre que os pesos divergirem — e quase sempre é o errado. Um 100% numa tarefa de 10% não compensa um 60% numa prova de 50%.",
          ],
        },
        {
          heading: "As convenções de escala diferem — confira o programa",
          paragraphs: [
            "A maioria das instituições americanas mapeia letras numa escala 4.0 (A = 4.0, B = 3.0), mas o tratamento de mais/menos varia: algumas escolas dão A− = 3.7, outras 3.67, algumas arredondam A− para 3.0. Os cortes de porcentagem para letra também oscilam entre disciplinas — 89,5% pode ser A ou A− dependendo do professor. A calculadora aplica um mapeamento convencional; a tabela da sua secretaria é a autoridade.",
            "Detalhes de ponderação que valem verificar: se a pior tarefa é descartada, se presença ou participação têm peso, e se o exame final pode substituir notas anteriores. Essas políticas mudam a aritmética de forma significativa e vivem no programa da disciplina, não em nenhuma calculadora.",
            "Ao simular resultados, insira pontuações futuras plausíveis, não otimistas — o objetivo do cálculo é saber a pontuação que você precisa, e planejar para o cenário mínimo de aprovação é mais útil que planejar para um milagre.",
          ],
        },
        {
          heading: "Cálculo de notas local e privado",
          paragraphs: [
            "Tudo é calculado no seu navegador enquanto você digita. Notas estão entre os dados pessoais mais sensíveis que existem — uma ferramenta que as enviasse seria a ferramenta errada. Nada é guardado, registrado ou transmitido; recarregue e a planilha reinicia.",
            "A calculadora trata linhas parciais da forma segura: uma disciplina com notas ausentes não contribui em vez de contar como zero, o que puniria silenciosamente o trabalho ainda não feito.",
            "Para o GPA acumulado entre semestres, combine com a calculadora de GPA — as duas ferramentas cobrem o nível de disciplina e o nível de histórico, e ambas rodam por completo no seu dispositivo.",
          ],
        },
      ],
    },
  },
});
