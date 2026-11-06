import { CalcEngineHealth } from "../_engines/calc-engine-health";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "calorie-calculator",
  category: "utility",
  icon: "calc",
  engine: { component: CalcEngineHealth, props: { kind: "calorie" } },
  related: ["bmr-calculator", "bmi-calculator", "water-intake-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "aspect-ratio-calculator", "barcode-generator"],
  copy: {
    en: {
      name: "Calorie Calculator",
      tagline:
        "Turn your BMR into daily calorie targets: five activity levels (×1.2–1.9) plus lose, maintain or gain goals of about ±500 kcal a day.",
      intro: [
        "Daily energy needs are your BMR multiplied by an activity factor: 1.2 sedentary, 1.375 lightly active, 1.55 moderately active, 1.725 very active and 1.9 extra active. That product — total daily energy expenditure (TDEE) — is what keeping your current weight takes. The BMR itself comes from the Mifflin-St Jeor equation (1990).",
        "Pick a goal and the tool adjusts the maintenance figure: about −500 kcal/day to lose roughly 0.5 kg per week, +500 kcal/day to gain, or no change to maintain. The ±500 kcal heuristic follows from 1 kg of body fat storing ≈ 7,700 kcal. Everything here is an estimate — real metabolism adapts as your weight and habits change.",
        "The activity multipliers follow the widely used Harris–Benedict-style convention, and Mifflin–St Jeor itself is: men 10 × weight (kg) + 6.25 × height (cm) − 5 × age + 5, women the same expression with −161 instead of +5. Weight-loss and gain targets are set as deviations from maintenance rather than arbitrary fixed deficits.",
        "Compared with a plain BMR tool, this one converts the estimate into actionable daily targets for cutting, maintaining or bulking. Keep in mind these are population averages — individual needs vary with body composition, metabolism and training load, so adjust based on measured results over weeks, not on the first number you see.",],
      steps: [
        "Choose your sex, units and enter height, weight and age.",
        "Pick the activity level that matches a typical week.",
        "Choose lose, maintain or gain.",
        "Read maintenance (TDEE) and your target calories per day.",
      ],
      faqs: [
        {
          q: "What formula and factors are used?",
          a: "BMR from the Mifflin-St Jeor equation (1990), multiplied by standard TDEE activity factors: 1.2 sedentary, 1.375 lightly active, 1.55 moderately active, 1.725 very active, 1.9 extra active. Goals add or subtract about 500 kcal/day, the classic heuristic for a 0.5 kg weekly change (1 kg of fat ≈ 7,700 kcal).",
        },
        {
          q: "Is a 500 kcal deficit safe, and how fast will results show?",
          a: "About −500 kcal/day for a ≈0.5 kg/week change is the rate most public-health guidance calls moderate and sustainable. Early loss is partly water weight, and expenditure falls as you get lighter, so weekly results are not linear — recalculate every few kilos.",
        },
        {
          q: "Is this medical advice?",
          a: "No — this is an estimate, not medical advice. If you are pregnant, managing a chronic condition, taking medication or have any history of disordered eating, set targets with a healthcare professional instead.",
        },
      ],
      deepDive: [
        {
          heading: "How the maintenance number is built",
          paragraphs: [
            "The calculation is a two-step chain. First, BMR comes from the Mifflin-St Jeor equation (1990): men 10 × weight (kg) + 6.25 × height (cm) − 5 × age + 5, women the same expression minus 161. Second, that BMR is multiplied by one of five standard activity factors: 1.2 sedentary, 1.375 lightly active, 1.55 moderately active, 1.725 very active, 1.9 extra active.",
            "The five factors trace back to the Harris-Benedict tradition and have survived because they map cleanly onto how people actually live: workouts alone do not define activity — a construction worker with no gym time lands higher than an office worker with three sessions a week.",
            "Goal adjustments then apply the classic heuristic: 1 kg of body fat stores roughly 7,700 kcal, so about ±500 kcal per day corresponds to roughly 0.5 kg of weekly change. The calculator subtracts 500 to lose, adds 500 to gain, and leaves maintenance untouched.",
          ],
        },
        {
          heading: "Interpreting the target: expect a curve, not a line",
          paragraphs: [
            "Early weight loss always outpaces the math: the first week or two drops mostly water and glycogen, not fat. After that, results slow because your expenditure falls as you get lighter — a person who weighed 90 kg burns less at 82 kg, so the deficit that produced half a kilo a week in month one often produces a third of that by month three.",
            "The practical workflow is to treat the target as a hypothesis: weigh in under consistent conditions, compare against a two-week rolling average rather than daily noise, and adjust by 100–200 kcal when the trend stalls for several weeks.",
            "Recalculate after every few kilos of change, and remember that the same maintenance number supports very different outcomes depending on what you eat — protein, fiber and meal timing do not change the calorie math, but they change how livable the deficit feels.",
          ],
        },
        {
          heading: "Common mistakes",
          paragraphs: [
            "The most frequent error is inflating the activity level. People count a workout as “moderately active” and then also sit ten hours a day; if you exercise 3–5 times a week but work a desk job, 1.55 is usually already generous. When in doubt, pick the lower factor and adjust from measured results.",
            "Do not stack the ±500 adjustment beyond reason. Deficits far below your BMR or gains of +1,000 kcal a day mostly produce fatigue and fat gain respectively; sustainable rates for most adults are 0.25–0.75 kg per week in either direction. Anyone pregnant, managing a chronic condition, or with a history of disordered eating should set targets with a clinician instead.",
            "Finally, treat every output here as a population-average estimate: real metabolism varies by roughly ±10% between individuals, and only your own measured trend over weeks settles the question.",
          ],
        },
      ],
    },
    zh: {
      name: "热量计算器",
      tagline:
        "把基础代谢换算成每日热量目标:五档活动系数(×1.2–1.9),减重、维持或增重目标约 ±500 千卡/天,实时重算。",
      intro: [
        "每日能量需求等于基础代谢乘以活动系数:久坐 1.2、轻度活动 1.375、中度活动 1.55、高强度活动 1.725、极高强度 1.9。乘积就是总能量消耗(TDEE),即维持当前体重所需的热量。基础代谢本身由 Mifflin–St Jeor 公式(1990)算出。",
        "选择目标后,工具会在维持热量上调整:减重约 −500 千卡/天(大致每周 0.5 公斤),增重 +500 千卡/天,维持则不变。±500 千卡的估算来自 1 公斤脂肪 ≈ 7,700 千卡。所有结果都是估算——真实代谢会随体重和习惯变化而调整。",
      ],
      steps: [
        "选择性别和单位,输入身高、体重、年龄。",
        "按典型一周的活动情况选择活动水平。",
        "选择减重、维持或增重。",
        "查看维持热量(TDEE)和每日目标热量。",
      ],
      faqs: [
        {
          q: "用的是哪个公式和系数?",
          a: "基础代谢来自 Mifflin–St Jeor 公式(1990),再乘以标准 TDEE 活动系数:久坐 1.2、轻度 1.375、中度 1.55、高强度 1.725、极高强度 1.9。目标在此基础上加减约 500 千卡/天——每周变化 0.5 公斤的经典估算(1 公斤脂肪 ≈ 7,700 千卡)。",
        },
        {
          q: "每天减 500 千卡安全吗?多久见效?",
          a: "约 −500 千卡/天对应每周约 0.5 公斤的变化,是公共健康指南普遍认为温和、可持续的速率。前期的减重含水分,而且变轻后消耗也会下降,所以每周效果不是线性的——每减几公斤建议重新计算。",
        },
        {
          q: "这是医疗建议吗?",
          a: "不是——这只是估算,不构成医疗建议。孕期、慢性病、服药或有进食障碍史的人群,请与专业人士一起制定目标。",
        },
      ],
      deepDive: [
        {
          heading: "维持热量是怎么算出来的",
          paragraphs: [
            "计算分两步。第一步用 1990 年的 Mifflin–St Jeor 公式算基础代谢:男性 10 × 体重(kg)+ 6.25 × 身高(cm) − 5 × 年龄 + 5,女性同式减 161。第二步把 BMR 乘以五个标准活动系数之一:久坐 1.2、轻度活动 1.375、中度活动 1.55、高强度活动 1.725、极高强度 1.9。",
            "这套系数源自 Harris–Benedict 传统,沿用至今是因为它们和真实生活方式对得上:活动量不由健身房单独决定——不健身的建筑工人,活动级别高于一周练三次的上班族。",
            "目标调整用的是经典启发式:1 公斤体脂约储存 7,700 千卡,所以每天 ±500 千卡大致对应每周 ±0.5 公斤的变化。本工具减重减 500、增重加 500、维持不动。",
          ],
        },
        {
          heading: "看懂目标值:曲线,不是直线",
          paragraphs: [
            "前两周的体重下降总是跑赢数学:掉的主要是水和糖原,不是脂肪。之后会放缓,因为体重变轻后消耗也变小——90 公斤时算出的缺口,到 82 公斤时效果往往只剩三分之一,所以每隔几公斤就该重算一次。",
            "实际操作是把目标值当假设:固定条件下称重,看两周滚动均值而不是每天波动,趋势停滞几周后再调整 100–200 千卡。",
            "同样的维持热量,吃法不同结果天差地别:蛋白质、膳食纤维和进餐节奏不改变热量算术,但决定这个缺口你能不能长期坚持。",
          ],
        },
        {
          heading: "常见误用",
          paragraphs: [
            "最常见的高估活动级别:把每周三练就填成“中高活动”,却忽略了一天坐十小时。每周练 3–5 次但坐办公室,填 1.55 通常已经算宽松;拿不准就往低选一档,再按实测结果调。",
            "别把 ±500 无限放大。缺口远低于 BMR 或每天 +1,000 千卡的增重,换来的是疲劳和长脂肪;多数成年人可持续的速度是每周 0.25–0.75 公斤。孕期、慢病管理或有进食障碍史的人,目标应与医生商定,而不是靠计算器。",
            "最后,这里所有输出都是人群平均估计:个体代谢差异约 ±10%,只有你自己几周的实测趋势才有最终发言权。",
          ],
        },
      ],
    },
    ja: {
      name: "カロリー計算",
      tagline:
        "基礎代謝から 1 日のカロリー目標を算出。5 段階の活動レベル(×1.2〜1.9)と、減量・維持・増量(約 ±500 kcal/日)の目標に対応します。",
      intro: [
        "1 日のエネルギー需要は基礎代謝に活動係数を掛けたものです:座位 1.2・軽い運動 1.375・中程度 1.55・激しい運動 1.725・非常に激しい 1.9。この積が総エネルギー消費量(TDEE)、つまり現在の体重を維持するのに必要なカロリーです。基礎代謝には Mifflin–St Jeor 式(1990)を使います。",
        "目標を選ぶと維持カロリーが調整されます:減量は約 −500 kcal/日(週約 0.5 kg)、増量は +500 kcal/日、維持は変わりません。±500 kcal の目安は体脂肪 1 kg ≈ 7,700 kcal から来ています。すべて推定値であり、実際の代謝は体重や習慣の変化に合わせて動きます。",
      ],
      steps: [
        "性別と単位を選び、身長・体重・年齢を入力します。",
        "普段の 1 週間に合う活動レベルを選びます。",
        "減量・維持・増量から選びます。",
        "維持カロリー(TDEE)と 1 日の目標カロリーを確認します。",
      ],
      faqs: [
        {
          q: "どの式と係数を使っていますか?",
          a: "基礎代謝は Mifflin–St Jeor 式(1990)で、標準的な TDEE 活動係数(座位 1.2・軽い運動 1.375・中程度 1.55・激しい運動 1.725・非常に激しい 1.9)を掛けます。目標は約 ±500 kcal/日 の調整で、これは週 0.5 kg 変化させる古典的な目安です(脂肪 1 kg ≈ 7,700 kcal)。",
        },
        {
          q: "1 日 500 kcal の減らし方は安全ですか?効果はいつ出ますか?",
          a: "約 −500 kcal/日(週約 0.5 kg)は、公衆衛生の指針で穏当かつ持続可能とされる速率です。初期の減量には水分が含まれ、軽くなるほど消費も落ちるため、週ごとの結果は直線的ではありません。数 kg ごとに再計算してください。",
        },
        {
          q: "これは医療アドバイスですか?",
          a: "いいえ — 推定値であり医療アドバイスではありません。妊娠中・慢性疾患・服薬中・摂食障害の既往がある方は、専門家と一緒に目標を設定してください。",
        },
      ],
      deepDive: [
        {
          heading: "維持カロリーの計算の仕組み",
          paragraphs: [
            "計算は2段階です。まず1990年の Mifflin-St Jeor 式で基礎代謝を算出:男性は「10 × 体重(kg)+ 6.25 × 身長(cm) − 5 × 年齢 + 5」、女性は同式から −161。次に活動係数(座位 1.2 / 軻動 1.375 / 中等度 1.55 / 高強度 1.725 / 非常に高強度 1.9)を掛けます。",
            "この係数は Harris-Benedict の伝統に由来し、「運動だけでなく日常の動き方」を反映する点が実用に合っています。デスクワーク中心なら週3回のトレーニングがあっても 1.55 が目安です。",
            "目標調整は古典的な目安を使用:体脂肪 1 kg ≈ 7,700 kcal なので、1日 ±500 kcal が週 ±0.5 kg にほぼ対応します。減量なら −500、増量なら +500、維持ならそのままです。",
          ],
        },
        {
          heading: "結果は曲線で来る:線形と思わない",
          paragraphs: [
            "最初の1〜2週間は水分とグリコーゲンの減少が主で、数字は数学より先に落ちます。その後は体重が減るほど消費も減るため、90 kg 時点の欠損は82 kg では効果が三分の一程度に——数 kg ごとの再計算が不可欠です。",
            "実務的には、目標値を仮説として扱います:条件をそろえて計測し、日々の変動ではなく2週間の移動平均で判断、停滞が数週間続いたら 100〜200 kcal 調整。",
            "同じ維持カロリーでも、タンパク質・食物繊維・食事タイミング次第で続けやすさは全く違います。算数は変わらなくても、継続できるかどうかは食事の中身が決めます。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de calorías",
      tagline:
        "Convierta su TMB en objetivos diarios de calorías: cinco niveles de actividad (×1,2–1,9) y metas de perder, mantener o ganar unos ±500 kcal.",
      intro: [
        "Sus necesidades diarias de energía son su TMB multiplicada por un factor de actividad: 1,2 sedentario, 1,375 ligeramente activo, 1,55 moderadamente activo, 1,725 muy activo y 1,9 extra activo. Ese producto — el gasto energético total diario (TDEE) — es lo que cuesta mantener su peso actual. La TMB procede de la ecuación de Mifflin-St Jeor (1990).",
        "Elija un objetivo y la herramienta ajusta la cifra de mantenimiento: unos −500 kcal/día para perder cerca de 0,5 kg por semana, +500 kcal/día para ganar, o sin cambios para mantener. La heurística de ±500 kcal se debe a que 1 kg de grasa corporal almacena ≈ 7.700 kcal. Todo esto es una estimación: el metabolismo real se adapta al cambiar su peso y sus hábitos.",
      ],
      steps: [
        "Elija sexo y unidades, e introduzca altura, peso y edad.",
        "Seleccione el nivel de actividad de una semana típica.",
        "Elija perder, mantener o ganar.",
        "Lea el mantenimiento (TDEE) y sus calorías objetivo al día.",
      ],
      faqs: [
        {
          q: "¿Qué fórmula y factores se utilizan?",
          a: "TMB según la ecuación de Mifflin-St Jeor (1990), multiplicada por los factores de actividad TDEE estándar: 1,2 sedentario, 1,375 ligero, 1,55 moderado, 1,725 muy activo, 1,9 extra activo. Los objetivos suman o restan unos 500 kcal/día, la heurística clásica para un cambio semanal de 0,5 kg (1 kg de grasa ≈ 7.700 kcal).",
        },
        {
          q: "¿Es seguro un déficit de 500 kcal y cuándo se ven resultados?",
          a: "Unos −500 kcal/día (≈0,5 kg/semana) es el ritmo que la guía de salud pública considera moderado y sostenible. La pérdida inicial incluye agua, y el gasto baja al reducir peso, así que los resultados semanales no son lineales: recalcule cada pocos kilos.",
        },
        {
          q: "¿Esto es consejo médico?",
          a: "No — es una estimación, no consejo médico. Si está embarazada, controla una condición crónica, toma medicación o tiene antecedentes de trastornos alimentarios, fije los objetivos con un profesional sanitario.",
        },
      ],
      deepDive: [
        {
          heading: "Cómo se construye la cifra de mantenimiento",
          paragraphs: [
            "El cálculo tiene dos pasos. Primero, el TMB sale de la ecuación de Mifflin-St Jeor (1990): hombres 10 × peso (kg) + 6,25 × altura (cm) − 5 × edad + 5, mujeres la misma expresión con −161. Segundo, se multiplica por uno de los cinco factores de actividad estándar: 1,2 sedentario, 1,375 ligeramente activo, 1,55 moderadamente activo, 1,725 muy activo, 1,9 extra activo.",
            "Esos factores provienen de la tradición Harris-Benedict y han perdurado porque reflejan cómo se vive de verdad: la actividad no la define solo el gimnasio — un albañil sin entrenamiento queda por encima de un oficinista que va tres días por semana.",
            "El ajuste por objetivo usa la heurística clásica: 1 kg de grasa almacena unas 7.700 kcal, así que ±500 kcal al día corresponde a unos 0,5 kg semanales. La calculadora resta 500 para perder, suma 500 para ganar y deja el mantenimiento intacto.",
          ],
        },
        {
          heading: "Interpretar el objetivo: espera una curva, no una recta",
          paragraphs: [
            "La pérdida inicial siempre supera las matemáticas: las primeras semanas caen sobre todo agua y glucógeno. Después se frena porque tu gasto baja al pesar menos — el déficit que daba medio kilo semanal en el primer mes da una tercera parte hacia el tercer mes. Recalcula cada pocos kilos.",
            "El flujo práctico es tratar el objetivo como una hipótesis: pésate en condiciones constantes, compara con la media móvil de dos semanas en lugar del ruido diario, y ajusta 100-200 kcal cuando la tendencia se estanca varias semanas.",
            "El mismo mantenimiento da resultados muy distintos según qué comes: la proteína, la fibra y el horario de las comidas no cambian la aritmética calórica, pero sí qué tan sostenible resulta el déficit.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de calorias",
      tagline:
        "Transforme sua TMB em metas diárias de calorias: cinco níveis de atividade (×1,2–1,9) e objetivos de perder, manter ou ganhar ±500 kcal.",
      intro: [
        "Suas necessidades diárias de energia são sua TMB multiplicada por um fator de atividade: 1,2 sedentário, 1,375 levemente ativo, 1,55 moderadamente ativo, 1,725 muito ativo e 1,9 extra ativo. Esse produto — o gasto energético total diário (TDEE) — é o que custa manter seu peso atual. A TMB vem da equação de Mifflin-St Jeor (1990).",
        "Escolha um objetivo e a ferramenta ajusta o valor de manutenção: cerca de −500 kcal/dia para perder aproximadamente 0,5 kg por semana, +500 kcal/dia para ganhar, ou nenhuma mudança para manter. A heurística de ±500 kcal vem de 1 kg de gordura armazenar ≈ 7.700 kcal. Tudo aqui é estimativa — o metabolismo real se adapta conforme seu peso e hábitos mudam.",
      ],
      steps: [
        "Escolha sexo e unidades e informe altura, peso e idade.",
        "Selecione o nível de atividade de uma semana típica.",
        "Escolha perder, manter ou ganhar.",
        "Veja a manutenção (TDEE) e sua meta diária de calorias.",
      ],
      faqs: [
        {
          q: "Qual fórmula e quais fatores são usados?",
          a: "TMB pela equação de Mifflin-St Jeor (1990), multiplicada pelos fatores de atividade TDEE padrão: 1,2 sedentário, 1,375 leve, 1,55 moderado, 1,725 muito ativo, 1,9 extra ativo. Os objetivos somam ou subtraem cerca de 500 kcal/dia, a heurística clássica para uma mudança semanal de 0,5 kg (1 kg de gordura ≈ 7.700 kcal).",
        },
        {
          q: "Um déficit de 500 kcal é seguro? Quando aparecem resultados?",
          a: "Cerca de −500 kcal/dia (≈0,5 kg/semana) é o ritmo que as orientações de saúde pública consideram moderado e sustentável. A perda inicial inclui água, e o gasto cai conforme você fica mais leve, então o resultado semanal não é linear: recalcule a cada poucos quilos.",
        },
        {
          q: "Isso é aconselhamento médico?",
          a: "Não — é uma estimativa, não aconselhamento médico. Se você está grávida, gerencia uma condição crônica, toma medicação ou tem histórico de transtorno alimentar, defina as metas com um profissional de saúde.",
        },
      ],
      deepDive: [
        {
          heading: "Como o número de manutenção é construído",
          paragraphs: [
            "O cálculo tem dois passos. Primeiro, a TMB sai da equação de Mifflin-St Jeor (1990): homens 10 × peso (kg) + 6,25 × altura (cm) − 5 × idade + 5, mulheres a mesma expressão com −161. Segundo, multiplica-se por um dos cinco fatores de atividade padrão: 1,2 sedentário, 1,375 levemente ativo, 1,55 moderadamente ativo, 1,725 muito ativo, 1,9 extra ativo.",
            "Esses fatores vêm da tradição Harris-Benedict e sobreviveram porque refletem como as pessoas vivem de fato: a atividade não é definida só pela academia — um pedreiro sem treino fica acima de um escritor que treina três vezes por semana.",
            "O ajuste por objetivo usa a heurística clássica: 1 kg de gordura armazena cerca de 7.700 kcal, então ±500 kcal por dia corresponde a cerca de 0,5 kg por semana. A calculadora subtrai 500 para perder, soma 500 para ganhar e deixa a manutenção intacta.",
          ],
        },
        {
          heading: "Interpretando a meta: espere uma curva, não uma reta",
          paragraphs: [
            "A perda inicial sempre supera a matemática: as primeiras semanas caem sobretudo água e glicogênio. Depois desacelera porque seu gasto cai ao pesar menos — o déficit que rendia meio quilo semanal no primeiro mês rende um terço disso no terceiro. Recalcule a cada poucos quilos.",
            "O fluxo prático é tratar a meta como hipótese: pese-se em condições constantes, compare com a média móvel de duas semanas em vez do ruído diário, e ajuste 100-200 kcal quando a tendência estagnar por várias semanas.",
            "A mesma manutenção gera resultados muito diferentes conforme o que você come: proteína, fibra e horários das refeições não mudam a aritmética calórica, mas mudam o quão sustentável o déficit se sente.",
          ],
        },
      ],
    },
  },
});
