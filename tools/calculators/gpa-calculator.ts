import { CalcEngineGpa } from "../_engines/calc-engine-gpa";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "gpa-calculator",
  category: "utility",
  icon: "check",
  engine: { component: CalcEngineGpa },
  related: ["grade-calculator", "percentage-calculator", "age-calculator", "emi-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "calorie-calculator", "aspect-ratio-calculator"],
  copy: {
    en: {
      name: "GPA Calculator",
      tagline:
        "Turn this semester's courses into a GPA on the 4.0 scale with standard quality points, then blend your prior credits into one honest cumulative GPA.",
      intro: [
        "Add each course with its credit hours and letter grade, and the calculator applies the standard 4.0 quality-point table — A = 4.0, A− = 3.7, B+ = 3.3, and so on — weighting every grade by its credits. A four-credit A counts for more than a three-credit A, exactly as your transcript says.",
        "Already have grades behind you? Enter your prior GPA and the credits earned so far, and the semester result blends into a cumulative GPA using the same weighted average your registrar runs. Incomplete rows are skipped rather than guessed, so the number only reflects courses you actually filled in.",
        "The 4.0 letter table used here (A = 4.0, A− = 3.7, B+ = 3.3, B = 3.0, down the scale) is the most common US convention, but institutions vary — some add 0.3 per plus rather than 0.33, and some weight honors courses above 4.0. Check your school's table when exact figures matter for applications or standing.",
        "Unlike a simple average of grades, the credit-weighted cumulative mode folds your prior GPA and earned credits into the same calculation your registrar uses, so one strong semester moves your cumulative GPA less when you have many credits behind you. Results are estimates for planning; the official transcript is always authoritative.",],
      steps: [
        "Add a row per course: name (optional), credit hours and letter grade.",
        "Leave prior fields empty for your first semester, or enter your GPA so far.",
        "Enter prior credits earned so the blend is weighted correctly.",
        "Read the semester GPA and the combined cumulative GPA.",
      ],
      faqs: [
        {
          q: "What quality points does each letter grade carry?",
          a: "On the standard 4.0 scale: A+ and A = 4.0, A− = 3.7, B+ = 3.3, B = 3.0, B− = 2.7, C+ = 2.3, C = 2.0, C− = 1.7, D+ = 1.3, D = 1.0, D− = 0.7 and F = 0. GPA = Σ(points × credits) ÷ Σcredits, so a 4-credit A contributes 12 quality points against a 3-credit B+'s 9.9.",
        },
        {
          q: "How is the cumulative GPA blended from two records?",
          a: "Cumulative GPA = (semester GPA × semester credits + prior GPA × prior credits) ÷ total credits. For example, a 3.60 semester over 7 credits on top of a 3.00 transcript across 60 credits gives (3.60 × 7 + 3.00 × 60) ÷ 67 ≈ 3.06. Weighting by credits is what keeps a light semester from distorting your record.",
        },
        {
          q: "Why does a row with no letter or credits not change my GPA?",
          a: "A course only counts when both its credit hours and letter grade are present — anything half-entered is dropped rather than treated as zero, so the GPA reflects the courses you actually completed. Finish the row and the totals update immediately.",
        },
      ],
      deepDive: [
        {
          heading: "Why the 4.0 scale does not translate cleanly",
          paragraphs: [
            "The 4.0 scale is a US institutional convention, not an international standard. The most common table gives A+ and A = 4.0, A− = 3.7, B+ = 3.3 and steps of 0.3–0.33 down the letters, but schools differ in real ways: some cap A+ at 4.0, others award it 4.3; some weight honors or AP courses above 4.0; a few omit minus grades entirely. Two transcripts reading \"3.7\" can therefore describe slightly different performance.",
            "Converting to or from a percentage system is worse than lossy — it is often irreversible. A Chinese 85/100 might map to an A− on one credential-evaluation table and a B on another; a German 2.0 does not correspond to any single US letter with confidence. Official evaluations (WES and similar services) run their own documented formulas precisely because no universal conversion exists.",
            "The practical rule: for your own tracking and planning, any consistent table works, and this tool uses the most widespread one. For applications — graduate admissions, scholarships, visa or credential processes — the school's official table and the transcript itself decide, so always verify which scale an application expects before quoting a number.",
          ],
        },
        {
          heading: "Credit weighting and what a semester can actually move",
          paragraphs: [
            "GPA is a credit-weighted mean, not an average of grades. The formula Σ(points × credits) ÷ Σcredits means a 4-credit A contributes 12 quality points while a 3-credit B+ contributes 9.9 — so the courses with the most credits steer your GPA the most. When planning a semester, pushing the high-credit course from a B to an A− usually beats perfecting a 1-credit seminar.",
            "The cumulative blend works the same way one level up: (semester GPA × semester credits + prior GPA × prior credits) ÷ total credits. The arithmetic explains a frustration every late bloomer hits — with 60 credits of 3.00 behind you, a brilliant 3.60 semester over 7 credits only lifts the cumulative to about 3.06. Early semesters move the number a lot; late ones barely budge it.",
            "That same math is why a light semester barely dents the record, and why dropping a 3-credit course mid-semester has a bigger effect than people intuit — removing those credits changes both numerator and denominator. If you are modeling scenarios, enter courses exactly as they would appear after the drop, not as zeros.",
          ],
        },
        {
          heading: "Incomplete rows, Pass/Fail and privacy",
          paragraphs: [
            "A row only counts when both credits and a letter grade are filled in. Half-entered courses are skipped rather than scored as zero — scoring them as zero would silently punish courses you have not taken yet, which is the most common way naive GPA calculators produce wrong numbers. Pass/Fail courses belong outside this tool: most registrars exclude them from GPA entirely.",
            "Everything runs in your browser. Grades and course names never leave your device — there is no account, no server round-trip, no saved history. That matters more than it sounds: GPA drafts often precede official results, and pasting transcripts into an unknown web form is an unnecessary exposure. Refresh the page and the sheet is empty again.",
          ],
        },
      ],
    },
    zh: {
      name: "GPA 计算器",
      tagline:
        "按标准 4.0 质量点表把本学期课程算成 GPA,每门课按学分加权,还能与既往成绩单合并,得到诚实的累计 GPA。",
      intro: [
        "逐门添加课程:学分和字母等级,计算器按标准 4.0 质量点表——A = 4.0、A− = 3.7、B+ = 3.3 等——把每个等级乘以学分加权。4 学分的 A 比 3 学分的 A 分量更重,和成绩单的逻辑完全一致。",
        "已有往期成绩?填入既往 GPA 和已修学分,学期结果会按教务处同样的加权平均方式合并成累计 GPA。没填完的行会被跳过而不是当零处理,所以数字只反映你真正填写的课程。",
      ],
      steps: [
        "每门课加一行:名称(可留空)、学分和字母等级。",
        "第一学期把既往两项留空;否则填入你目前的 GPA。",
        "填入已修学分,让合并按正确权重进行。",
        "查看学期 GPA 和合并后的累计 GPA。",
      ],
      faqs: [
        {
          q: "每个字母等级对应多少质量点?",
          a: "标准 4.0 制:A+ 和 A = 4.0,A− = 3.7,B+ = 3.3,B = 3.0,B− = 2.7,C+ = 2.3,C = 2.0,C− = 1.7,D+ = 1.3,D = 1.0,D− = 0.7,F = 0。GPA = Σ(质量点 × 学分)÷ Σ学分,所以 4 学分的 A 贡献 12 个质量点,而 3 学分的 B+ 只有 9.9。",
        },
        {
          q: "累计 GPA 是怎么把两份记录合并的?",
          a: "累计 GPA =(学期 GPA × 学期学分 + 既往 GPA × 既往学分)÷ 总学分。例如 7 学分的 3.60 学期叠加在 60 学分、3.00 的成绩单上,结果是 (3.60 × 7 + 3.00 × 60) ÷ 67 ≈ 3.06。按学分加权,才不会被一个学分少的学期带偏。",
        },
        {
          q: "为什么没填等级或学分的行不影响 GPA?",
          a: "只有学分和字母等级都填了,课程才会计入——填了一半的行会被剔除而不是按零分算,所以 GPA 只反映你真正完成的课程。把那一行填完,结果会立即更新。",
        },
      ],
      deepDive: [
        {
          heading: "4.0 制为什么不能直接换算",
          paragraphs: [
            "4.0 制是美国院校的通行约定,不是国际标准。最常见的质量点表是 A+/A = 4.0、A− = 3.7、B+ = 3.3,往下每档递减 0.3 左右,但学校之间的差异是真实存在的:有的学校 A+ 封顶 4.0,有的给到 4.3;有的给荣誉课或 AP 课程加权到 4.0 以上;还有的干脆取消减号等级。两份写着 \"3.7\" 的成绩单,描述的其实可能略有差别。",
            "和百分制互换了比\"有损\"更糟——经常是不可逆的。国内的 85 分,在不同的认证换算表里可能被划成 A−,也可能被划成 B;德国的 2.0 也没有唯一对应的美国字母等级。WES 之类的官方认证机构之所以有一套自己的成文换算公式,正是因为不存在通用换算。",
            "实用结论:自己跟踪和规划时,用哪张一致的表都可以,本工具采用最流行的那张;但涉及申请——研究生录取、奖学金、学历认证——以学校官方等级表和成绩单原文为准,报数字前先确认对方要的是哪种口径。",
          ],
        },
        {
          heading: "学分加权,以及一个学期到底能拉动多少",
          paragraphs: [
            "GPA 是按学分加权的均值,不是等级的简单平均。公式 Σ(质量点 × 学分) ÷ Σ学分 意味着 4 学分的 A 贡献 12 个质量点,3 学分的 B+ 只贡献 9.9——学分最多的课对 GPA 的支配力最大。排课时算一笔账:把高学分课从 B 拉到 A−,通常比在 1 学分的研讨课上追求满分划算得多。",
            "累计 GPA 在上一层做同样的加权:(学期 GPA × 学期学分 + 既往 GPA × 既往学分) ÷ 总学分。这道算术解释了每个后进生都会撞上的挫败感——身后压着 60 学分的 3.00,一个 7 学分的 3.60 亮眼学期只能把累计拉到 3.06 左右。早学期动 GPA 很容易,晚学期几乎推不动。",
            "同一套数学也解释了为什么学分少的学期对总记录影响很小,以及为什么期中退掉一门 3 学分的课比直觉中影响更大——同时改变了分子和分母。模拟场景时,应按退课之后实际会出现的课表来填,而不是把那门课填成零分。",
          ],
        },
        {
          heading: "没填完的行、Pass/Fail 与隐私",
          paragraphs: [
            "一行只有在学分和字母等级都填上时才计入。填了一半的课会被跳过而不是按零分计——按零分会悄悄惩罚你还没修的课,这正是许多简陋 GPA 计算器出错的最常见原因。Pass/Fail(合格/不合格)课程不该放进本工具:多数教务处把它们完全排除在 GPA 之外。",
            "一切都在浏览器里运行。成绩和课程名不会离开你的设备——没有账号、没有服务器请求、不留历史。这件事比听起来重要:GPA 草稿往往出现在正式成绩公布之前,把成绩单贴进一个来路不明的网页表单是不必要的暴露。刷新页面,表格就清空了。",
          ],
        },
      ],
    },
    ja: {
      name: "GPA 計算ツール",
      tagline:
        "今学期の科目を標準 4.0 質点テーブルで GPA に換算し、単位で重み付け。これまでの成績表と組み合わせて、正確な累計 GPA まで求めます。",
      intro: [
        "各科目の単位数と評価を入力すると、標準の 4.0 質点テーブル(A = 4.0、A− = 3.7、B+ = 3.3 など)を適用し、単位で重み付けします。4 単位の A は 3 単位の A より重く、成績表の考え方どおりです。",
        "これまでの成績があるなら、現在の GPA と修得単位を入力してください。学期の結果が、教務部門と同じ加重平均で累計 GPA にまとまります。入力が中途半端な行はゼロではなく除外されるので、数値は実際に入力した科目だけを反映します。",
      ],
      steps: [
        "科目ごとに 1 行追加:名前(任意)・単位数・評価。",
        "最初の学期なら既往欄は空のまま、それ以外は現在の GPA を入力。",
        "修得済みの単位数を入力して、正しい重みで合算します。",
        "学期 GPA と合算後の累計 GPA を確認します。",
      ],
      faqs: [
        {
          q: "各評価が持つ質点はいくつですか?",
          a: "標準 4.0 評では、A+ と A = 4.0、A− = 3.7、B+ = 3.3、B = 3.0、B− = 2.7、C+ = 2.3、C = 2.0、C− = 1.7、D+ = 1.3、D = 1.0、D− = 0.7、F = 0 です。GPA = Σ(質点 × 単位)÷ Σ単位なので、4 単位の A は 12 質点、3 単位の B+ は 9.9 質点になります。",
        },
        {
          q: "累計 GPA は 2 つの記録をどう組み合わせますか?",
          a: "累計 GPA =(学期 GPA × 学期単位 + 既往 GPA × 既往単位)÷ 総単位です。たとえば 7 単位の学期 GPA 3.60 を、60 単位の GPA 3.00 に重ねると (3.60 × 7 + 3.00 × 60) ÷ 67 ≈ 3.06 になります。単位で重み付けするからこそ、単位の少ない学期に引きずられません。",
        },
        {
          q: "評価や単位が未入力の行が GPA に反映されないのはなぜですか?",
          a: "単位数と評価が両方そろった科目だけが計上されます。中途半端に入力された行はゼロ扱いではなく除外されるので、GPA は実際に完成した科目だけを反映します。その行を埋めると合計はすぐに更新されます。",
        },
      ],
      deepDive: [
        {
          heading: "なぜ 4.0 評はそのまま換算できないのか",
          paragraphs: [
            "4.0 評は米国の学校間で広く使われる慣行であって、国際標準ではありません。最も一般的な質点テーブルは A+/A = 4.0、A− = 3.7、B+ = 3.3 と下へ 0.3 前後ずつ下がりますが、学校ごとの差は実在します。A+ を 4.0 で打ち切る学校もあれば 4.3 を与える学校もあり、履修上級課程や AP を 4.0 超で重み付けする学校、マイナス評価自体を廃止している学校もあります。同じ「3.7」でも成績表の中身は微妙に異なり得ます。",
            "百分率評価との相互変換は「情報落ち」どころか、しばしば不可逆です。中国式の 85 点は評価機関の換算表によって A− になったり B になったりし、ドイツ式の 2.0 に一意に対応する米国の文字評価はありません。WES などの公式評価機関が独自の成文化された換算式を持つのは、普遍的な換算が存在しないからです。",
            "実用上の結論はこうです。自己管理と計画には一貫したどのテーブルでも十分で、このツールは最も広く使われるものを採用しています。ただし出願——大学院・奨学金・学歴認定——では学校の公式テーブルと成績表原本が優先されるので、数字を書く前に相手が想定している評価体系を必ず確認してください。",
          ],
        },
        {
          heading: "単位による重み付けと、1 学期が動かせる範囲",
          paragraphs: [
            "GPA は単位で重み付けした平均であり、評価の単純平均ではありません。式 Σ(質点 × 単位) ÷ Σ単位 が意味するのは、4 単位の A は 12 質点を運び、3 単位の B+ は 9.9 にとどまるということ。単位数の多い科目が GPA を最も強く引っ張るので、学期の計画では 1 単位のゼミで満点を狙うより、高単位の科目を B から A− に引き上げるほうが効率的です。",
            "累計 GPA も同じ重み付けの一段上です。(学期 GPA × 学期単位 + 既往 GPA × 既往単位) ÷ 総単位。この算術が説明するのは、出遅れた人が必ずぶつかる壁です。3.00 の 60 単位が背後にあれば、7 単位の 3.60 の輝かしい学期でも累計は 3.06 あたりまでしか上がりません。初期の学期は大きく動き、後期はほとんど動きません。",
            "同じ計算は、単位の少ない学期が記録にほぼ影響しない理由も、学期途中に 3 単位の科目を取ることが直感より大きく効く理由(分子と分母の両方が変わる)も説明します。シナリオを試すときは、取り消し後の時間割の通りに入力し、ゼロ点として入力しないでください。",
          ],
        },
        {
          heading: "未入力行・Pass/Fail・プライバシー",
          paragraphs: [
            "1 行が計上されるのは単位と評価が両方埋まったときだけです。中途半端な科目はゼロではなく除外されます——ゼロ扱いすると、まだ受けていない科目を黙って罰することになり、簡易な GPA 計算機が間違える最も多い原因がこれです。Pass/Fail(合格/不合格)の科目はこのツールの対象外です。多くの教務部門は GPA から完全に除外します。",
            "すべてはブラウザ内で動きます。成績と科目名は端末の外に出ません——アカウントも、サーバーとの往復も、保存履歴もありません。これは聞こえ以上に重要です。GPA の下書きは正式な成績発表の前に行われることが多く、出所の不明なウェブフォームに成績表を貼るのは不必要な露出です。ページを更新すればシートは空に戻ります。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de GPA",
      tagline:
        "Convierta las asignaturas del semestre en un GPA sobre la escala 4.0 con puntos de calidad estándar, y combine sus créditos previos en un GPA acumulado honesto.",
      intro: [
        "Añada cada asignatura con sus créditos y su letra, y la calculadora aplica la tabla estándar de puntos de calidad 4.0 — A = 4.0, A− = 3.7, B+ = 3.3, etc. — ponderando cada nota por sus créditos. Una A de cuatro créditos vale más que una A de tres, exactamente como dice su expediente.",
        "¿Ya tiene notas atrás? Introduzca su GPA previo y los créditos obtenidos hasta ahora, y el resultado del semestre se combina en un GPA acumulado con la misma media ponderada que usa su registro académico. Las filas incompletas se omiten en lugar de suponerse, así que el número solo refleja las asignaturas que realmente rellenó.",
      ],
      steps: [
        "Añada una fila por asignatura: nombre (opcional), créditos y letra.",
        "Deje los campos previos vacíos en su primer semestre, o indique su GPA actual.",
        "Introduzca los créditos obtenidos para que la combinación pondere bien.",
        "Lea el GPA del semestre y el GPA acumulado combinado.",
      ],
      faqs: [
        {
          q: "¿Cuántos puntos de calidad vale cada letra?",
          a: "En la escala 4.0 estándar: A+ y A = 4.0, A− = 3.7, B+ = 3.3, B = 3.0, B− = 2.7, C+ = 2.3, C = 2.0, C− = 1.7, D+ = 1.3, D = 1.0, D− = 0.7 y F = 0. GPA = Σ(puntos × créditos) ÷ Σcréditos, así que una A de 4 créditos aporta 12 puntos frente a los 9.9 de un B+ de 3 créditos.",
        },
        {
          q: "¿Cómo se combinan dos registros en el GPA acumulado?",
          a: "GPA acumulado = (GPA del semestre × créditos del semestre + GPA previo × créditos previos) ÷ créditos totales. Por ejemplo, un semestre de 3.60 sobre 7 créditos encima de un expediente de 3.00 con 60 créditos da (3.60 × 7 + 3.00 × 60) ÷ 67 ≈ 3.06. Ponderar por créditos evita que un semestre ligero distorsione su historial.",
        },
        {
          q: "¿Por qué una fila sin letra o créditos no cambia mi GPA?",
          a: "Una asignatura solo cuenta cuando tiene tanto créditos como letra — lo que esté a medias se descarta en lugar de tratarse como cero, de modo que el GPA refleja las asignaturas que completó de verdad. Termine la fila y los totales se actualizan al instante.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué la escala 4.0 no se traduce limpiamente",
          paragraphs: [
            "La escala 4.0 es una convención de las instituciones estadounidenses, no un estándar internacional. La tabla más común da A+ y A = 4.0, A− = 3.7, B+ = 3.3 con pasos de 0,3–0,33 hacia abajo, pero las escuelas difieren de verdad: algunas limitan el A+ a 4.0, otras le dan 4.3; algunas ponderan cursos de honores o AP por encima de 4.0; unas pocas eliminan las letras con menos. Dos expedientes que dicen \"3.7\" pueden describir un rendimiento ligeramente distinto.",
            "Convertir hacia o desde un sistema porcentual es peor que con pérdidas — a menudo es irreversible. Un 85/100 chino puede caer en A− según una tabla de homologación y en B según otra; un 2.0 alemán no corresponde con seguridad a ninguna letra estadounidense concreta. Los servicios oficiales de evaluación (WES y similares) usan fórmulas documentadas propias precisamente porque no existe una conversión universal.",
            "La regla práctica: para su seguimiento y planificación, cualquier tabla consistente vale, y esta herramienta usa la más extendida. Para solicitudes — posgrados, becas, homologaciones — deciden la tabla oficial de la escuela y el expediente original, así que verifique siempre qué escala espera la solicitud antes de citar una cifra.",
          ],
        },
        {
          heading: "Ponderación por créditos y lo que un semestre puede mover",
          paragraphs: [
            "El GPA es una media ponderada por créditos, no un promedio de notas. La fórmula Σ(puntos × créditos) ÷ Σcréditos significa que una A de 4 créditos aporta 12 puntos de calidad mientras que un B+ de 3 aporta 9.9 — las asignaturas con más créditos gobiernan su GPA. Al planificar un semestre, subir la asignatura de más créditos de un B a un A− suele rendir más que perfeccionar un seminario de 1 crédito.",
            "La combinación acumulada funciona igual un nivel arriba: (GPA del semestre × créditos del semestre + GPA previo × créditos previos) ÷ créditos totales. La aritmética explica una frustración que todo rezagado encuentra: con 60 créditos de 3.00 a sus espaldas, un semestre brillante de 3.60 sobre 7 créditos apenas lleva el acumulado a unos 3.06. Los semestres tempranos mueven la cifra mucho; los tardíos casi nada.",
            "La misma matemática explica por qué un semestre ligero apenas marca el historial, y por qué abandonar un curso de 3 créditos a mitad de semestre pesa más de lo que la gente intuye — quitar esos créditos cambia numerador y denominador a la vez. Si modela escenarios, rellene las asignaturas tal como quedarían tras la baja, no como ceros.",
          ],
        },
        {
          heading: "Filas incompletas, Pass/Fail y privacidad",
          paragraphs: [
            "Una fila solo cuenta con créditos y letra rellenados. Las asignaturas a medias se omiten en lugar de puntuarse como cero — puntuarlas como cero castigaría en silencio cursos que aún no ha cursado, y es la manera más común en que las calculadoras de GPA simples dan números equivocados. Los cursos aprobado/suspenso quedan fuera de esta herramienta: la mayoría de registros académicos los excluyen por completo del GPA.",
            "Todo corre en su navegador. Las notas y los nombres de asignaturas nunca salen de su dispositivo — sin cuenta, sin ida y vuelta al servidor, sin historial guardado. Importa más de lo que suena: los borradores de GPA suelen preceder a las notas oficiales, y pegar un expediente en un formulario web desconocido es una exposición innecesaria. Al recargar, la hoja vuelve a estar vacía.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de GPA",
      tagline:
        "Transforme as disciplinas do semestre em um GPA na escala 4.0 com pontos de qualidade padrão, e combine seus créditos anteriores num GPA acumulado honesto.",
      intro: [
        "Adicione cada disciplina com seus créditos e conceito, e a calculadora aplica a tabela padrão de pontos de qualidade 4.0 — A = 4.0, A− = 3.7, B+ = 3.3, e assim por diante — ponderando cada nota pelos créditos. Um A de quatro créditos pesa mais que um A de três, exatamente como diz seu histórico.",
        "Já tem notas anteriores? Informe seu GPA anterior e os créditos obtidos até agora, e o resultado do semestre se combina num GPA acumulado pela mesma média ponderada que a secretaria usa. Linhas incompletas são ignoradas em vez de presumidas, então o número reflete apenas as disciplinas que você realmente preencheu.",
      ],
      steps: [
        "Adicione uma linha por disciplina: nome (opcional), créditos e conceito.",
        "Deixe os campos anteriores vazios no primeiro semestre, ou informe seu GPA atual.",
        "Informe os créditos já obtidos para que a combinação pese corretamente.",
        "Veja o GPA do semestre e o GPA acumulado combinado.",
      ],
      faqs: [
        {
          q: "Quantos pontos de qualidade vale cada conceito?",
          a: "Na escala 4.0 padrão: A+ e A = 4.0, A− = 3.7, B+ = 3.3, B = 3.0, B− = 2.7, C+ = 2.3, C = 2.0, C− = 1.7, D+ = 1.3, D = 1.0, D− = 0.7 e F = 0. GPA = Σ(pontos × créditos) ÷ Σcréditos, então um A de 4 créditos contribui com 12 pontos contra os 9.9 de um B+ de 3 créditos.",
        },
        {
          q: "Como dois registros são combinados no GPA acumulado?",
          a: "GPA acumulado = (GPA do semestre × créditos do semestre + GPA anterior × créditos anteriores) ÷ créditos totais. Por exemplo, um semestre de 3.60 sobre 7 créditos em cima de um histórico de 3.00 com 60 créditos dá (3.60 × 7 + 3.00 × 60) ÷ 67 ≈ 3.06. Ponderar pelos créditos evita que um semestre leve distorça seu histórico.",
        },
        {
          q: "Por que uma linha sem conceito ou créditos não muda meu GPA?",
          a: "Uma disciplina só conta quando tem créditos e conceito — o que estiver pela metade é descartado em vez de tratado como zero, então o GPA reflete as disciplinas que você de fato concluiu. Complete a linha e os totais atualizam na hora.",
        },
      ],
      deepDive: [
        {
          heading: "Por que a escala 4.0 não se traduz limpa",
          paragraphs: [
            "A escala 4.0 é uma convenção das instituições americanas, não um padrão internacional. A tabela mais comum dá A+ e A = 4.0, A− = 3.7, B+ = 3.3 com passos de 0,3–0,33 descendo as letras, mas as escolas divergem de verdade: algumas limitam o A+ em 4.0, outras dão 4.3; algumas ponderam disciplinas de honras ou AP acima de 4.0; poucas aboliram os conceitos com traço. Dois históricos que dizem \"3.7\" podem descrever desempenhos ligeiramente diferentes.",
            "Converter para ou de um sistema percentual é pior que perder informação — muitas vezes é irreversível. Um 85/100 chinês pode cair em A− numa tabela de equivalência e em B em outra; um 2.0 alemão não corresponde com segurança a nenhuma letra americana específica. Os serviços oficiais de avaliação (WES e similares) usam fórmulas documentadas próprias justamente porque não existe conversão universal.",
            "A regra prática: para o seu acompanhamento e planejamento, qualquer tabela consistente serve, e esta ferramenta usa a mais difundida. Para candidaturas — pós-graduação, bolsas, revalidação — valem a tabela oficial da escola e o histórico original, então confirme sempre qual escala a candidatura espera antes de citar um número.",
          ],
        },
        {
          heading: "Ponderação por créditos e o que um semestre consegue mover",
          paragraphs: [
            "O GPA é uma média ponderada por créditos, não uma média simples de notas. A fórmula Σ(pontos × créditos) ÷ Σcréditos significa que um A de 4 créditos carrega 12 pontos de qualidade enquanto um B+ de 3 carrega 9.9 — as disciplinas com mais créditos comandam o seu GPA. Ao planejar o semestre, subir a disciplina de mais créditos de B para A− costuma render mais que buscar nota máxima num seminário de 1 crédito.",
            "A combinação acumulada funciona igual um nível acima: (GPA do semestre × créditos do semestre + GPA anterior × créditos anteriores) ÷ créditos totais. A aritmética explica uma frustração que todo atrasado de plantão encontra: com 60 créditos de 3.00 nas costas, um semestre brilhante de 3.60 sobre 7 créditos mal leva o acumulado a uns 3.06. Semestres iniciais movem o número muito; os finais, quase nada.",
            "A mesma matemática explica por que um semestre leve quase não marca o histórico, e por que trancar uma disciplina de 3 créditos no meio do semestre pesa mais que o intuitivo — retirar esses créditos muda numerador e denominador ao mesmo tempo. Se for simular cenários, preencha as disciplinas como ficariam depois da trancadora, não como zeros.",
          ],
        },
        {
          heading: "Linhas incompletas, Pass/Fail e privacidade",
          paragraphs: [
            "Uma linha só conta com créditos e conceito preenchidos. Disciplinas pela metade são ignoradas em vez de pontuadas como zero — pontuar como zero puniria em silêncio matérias que você ainda não cursou, e é a forma mais comum de calculadoras de GPA simples errarem. Disciplinas aprovado/reprovado ficam fora desta ferramenta: a maioria das secretarias as exclui por completo do GPA.",
            "Tudo roda no seu navegador. Notas e nomes de disciplinas nunca saem do seu dispositivo — sem conta, sem ida e volta ao servidor, sem histórico salvo. Isso importa mais do que parece: rascunhos de GPA costumam anteceder as notas oficiais, e colar um histórico num formulário web desconhecido é exposição desnecessária. Recarregue a página e a planilha volta vazia.",
          ],
        },
      ],
    },
  },
});
