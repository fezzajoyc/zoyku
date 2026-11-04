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
      ],
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
    },
  },
});
