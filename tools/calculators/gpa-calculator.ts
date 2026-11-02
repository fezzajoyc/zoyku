import { CalcEngineGpa } from "../_engines/calc-engine-gpa";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "gpa-calculator",
  category: "utility",
  icon: "check",
  engine: { component: CalcEngineGpa },
  related: ["grade-calculator", "percentage-calculator", "age-calculator", "emi-calculator"],
  copy: {
    en: {
      name: "GPA Calculator",
      tagline:
        "Turn this semester's courses into a GPA on the 4.0 scale with standard quality points, then blend your prior credits into one honest cumulative GPA.",
      intro: [
        "Add each course with its credit hours and letter grade, and the calculator applies the standard 4.0 quality-point table — A = 4.0, A− = 3.7, B+ = 3.3, and so on — weighting every grade by its credits. A four-credit A counts for more than a three-credit A, exactly as your transcript says.",
        "Already have grades behind you? Enter your prior GPA and the credits earned so far, and the semester result blends into a cumulative GPA using the same weighted average your registrar runs. Incomplete rows are skipped rather than guessed, so the number only reflects courses you actually filled in.",
      ],
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
    },
  },
});
