import { CalcEngineHealth } from "../_engines/calc-engine-health";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "bmr-calculator",
  category: "utility",
  icon: "calc",
  engine: { component: CalcEngineHealth, props: { kind: "bmr" } },
  related: ["calorie-calculator", "bmi-calculator", "body-fat-calculator", "ideal-weight-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "aspect-ratio-calculator", "barcode-generator"],
  copy: {
    en: {
      name: "BMR Calculator",
      tagline:
        "Calculate your basal metabolic rate with the Mifflin-St Jeor equation (1990) — the calories your body burns at complete rest every day.",
      intro: [
        "Your basal metabolic rate (BMR) is the energy your body spends just staying alive — breathing, circulating blood, keeping warm — before any movement or digestion. This calculator uses the Mifflin-St Jeor equation, published in 1990 and still the most accurate widely used predictor for modern populations: men 10 × weight (kg) + 6.25 × height (cm) − 5 × age + 5; women the same expression minus 161.",
        "Enter your details in metric or imperial units and the result updates as you type. Treat the number as a population-level estimate — typically within about ±10% of a lab measurement — not a medical diagnosis.",
      ],
      steps: [
        "Choose your sex and metric (cm + kg) or imperial (ft + in + lb) units.",
        "Enter your height, weight and age.",
        "Read your BMR in kilocalories per day.",
        "Feed it into the calorie calculator to get maintenance and goal targets.",
      ],
      faqs: [
        {
          q: "Which formula does this use, and how accurate is it?",
          a: "The Mifflin-St Jeor equation, published in 1990 and recommended by the American Dietetic Association after validation against indirect calorimetry. It predicts measured resting energy expenditure within roughly ±10% for most adults, more accurately than the older Harris-Benedict equation (1919).",
        },
        {
          q: "What is the difference between BMR and daily calorie needs?",
          a: "BMR covers complete rest only. Your real daily burn is BMR multiplied by an activity factor — about 1.2 for a sedentary day up to 1.9 for very active people. The calorie calculator applies that multiplier and your goal for you.",
        },
        {
          q: "Is this medical advice?",
          a: "No — this is an estimate, not medical advice. Illness, medication, pregnancy and unusual body compositions all shift real energy expenditure, so discuss any diet change with a healthcare professional.",
        },
      ],
    },
    zh: {
      name: "基础代谢率计算器",
      tagline:
        "用 Mifflin–St Jeor 公式(1990)计算基础代谢率,看看身体在完全静息状态下每天消耗多少千卡,支持公制与英制输入。",
      intro: [
        "基础代谢率(BMR)是身体维持呼吸、血液循环、体温等基本生命活动所消耗的能量,不含任何运动与消化。本计算器采用 1990 年发表的 Mifflin–St Jeor 公式——对现代人群仍是最准确的常用预测式之一:男性 10 × 体重(kg)+ 6.25 × 身高(cm)− 5 × 年龄 + 5,女性在此基础上再减 161。",
        "支持公制或英制输入,结果随输入实时更新。请把它当作人群层面的估算值——与实验室测量通常相差 ±10% 左右,不构成医学诊断。",
      ],
      steps: [
        "选择性别与单位:公制(cm + kg)或英制(英尺 + 英寸 + 磅)。",
        "输入身高、体重和年龄。",
        "查看每天的基础代谢(千卡)。",
        "把结果代入热量计算器,得到维持热量与目标热量。",
      ],
      faqs: [
        {
          q: "用的是哪个公式?准不准?",
          a: "Mifflin–St Jeor 公式,1990 年发表,后被美国饮食营养协会按间接测热法验证并推荐。对大多数成年人,预测的静息能量消耗与实测相差约 ±10%,比更早的 Harris-Benedict 公式(1919)更准。",
        },
        {
          q: "基础代谢和每天总消耗有什么区别?",
          a: "基础代谢只覆盖完全静息状态。每天真实消耗是基础代谢乘以活动系数——久坐约 1.2,高强度活动可到 1.9。热量计算器会帮你乘上这个系数并叠加目标调整。",
        },
        {
          q: "这是医疗建议吗?",
          a: "不是——这只是估算,不构成医疗建议。疾病、药物、怀孕和特殊体成分都会改变真实能耗,调整饮食前请咨询专业人士。",
        },
      ],
    },
    ja: {
      name: "基礎代謝率計算",
      tagline:
        "Mifflin–St Jeor 式(1990)で基礎代謝率(BMR)を計算。完全に安静な状態で 1 日に消費するカロリーを把握でき、単位はどちらにも対応。",
      intro: [
        "基礎代謝率(BMR)とは、呼吸・血液循環・体温維持など、生きているだけで消費するエネルギーのこと。運動や消化は含みません。この計算ツールは 1990 年に発表された Mifflin–St Jeor 式を使います。現代の集団に対して最も精度の高い汎用予測式の一つで、男性は 10 × 体重 + 6.25 × 身長 − 5 × 年齢 + 5、女性はさらに 161 を引いた値です。",
        "メートル法・ヤード・ポンド法のどちらでも入力でき、結果はリアルタイムで更新されます。数値は集団レベルの推定値で、実測値とは ±10% 程度の差が出ることがあります。医学的な診断ではありません。",
      ],
      steps: [
        "性別と単位(メートル法 cm + kg、またはヤード・ポンド法 ft + in + lb)を選びます。",
        "身長・体重・年齢を入力します。",
        "1 日の基礎代謝(kcal)を確認します。",
        "カロリー計算ツールに入力すると、維持カロリーと目標カロリーが出せます。",
      ],
      faqs: [
        {
          q: "どの式を使い、どのくらい正確ですか?",
          a: "1990 年に発表された Mifflin–St Jeor 式です。間接熱量計との検証を経てアメリカ食事療法協会に推奨されました。多くの成人で実測の安静時エネルギー消費量と ±10% 程度の差に収まり、より古い Harris-Benedict 式(1919)より正確です。",
        },
        {
          q: "基礎代謝と 1 日の消費カロリーの違いは?",
          a: "基礎代謝は完全に安静な状態だけの値です。実際の 1 日の消費は基礎代謝に活動係数(座り仕事で約 1.2、非常に活動的な人で 1.9)を掛けたものになります。カロリー計算ツールがその掛け算と目標調整を行います。",
        },
        {
          q: "これは医療アドバイスですか?",
          a: "いいえ — 推定値であり医療アドバイスではありません。病気・薬・妊娠・特異な体組成は実際の消費を変えるため、食事を変える前には専門家に相談してください。",
        },
      ],
    },
    es: {
      name: "Calculadora de metabolismo basal",
      tagline:
        "Calcule su metabolismo basal con la ecuación Mifflin-St Jeor (1990): las calorías que su cuerpo quema en reposo completo cada día.",
      intro: [
        "Su metabolismo basal (TMB) es la energía que el cuerpo gasta solo por mantenerse vivo — respirar, circular la sangre, conservar el calor — antes de cualquier movimiento o digestión. Esta calculadora usa la ecuación de Mifflin-St Jeor, publicada en 1990 y aún el predictor general más preciso para poblaciones actuales: hombres 10 × peso (kg) + 6,25 × altura (cm) − 5 × edad + 5; mujeres la misma expresión menos 161.",
        "Introduzca sus datos en unidades métricas o imperiales y el resultado se actualiza al escribir. Considere la cifra una estimación poblacional — normalmente dentro de un ±10% de la medición de laboratorio — no un diagnóstico médico.",
      ],
      steps: [
        "Elija su sexo y las unidades métricas (cm + kg) o imperiales (ft + in + lb).",
        "Escriba su altura, peso y edad.",
        "Lea su TMB en kilocalorías por día.",
        "Llévelo a la calculadora de calorías para obtener mantenimiento y objetivos.",
      ],
      faqs: [
        {
          q: "¿Qué fórmula utiliza y qué precisión tiene?",
          a: "La ecuación de Mifflin-St Jeor, publicada en 1990 y recomendada por la American Dietetic Association tras validarse contra calorimetría indirecta. Predice el gasto energético en reposo medido con un margen de ±10% en la mayoría de adultos, con más precisión que la ecuación de Harris-Benedict (1919).",
        },
        {
          q: "¿Qué diferencia hay entre TMB y las calorías diarias?",
          a: "La TMB cubre solo el reposo completo. Su gasto real diario es la TMB multiplicada por un factor de actividad — alrededor de 1,2 en un día sedentario hasta 1,9 en personas muy activas. La calculadora de calorías aplica ese factor y su objetivo por usted.",
        },
        {
          q: "¿Esto es consejo médico?",
          a: "No — es una estimación, no consejo médico. Enfermedades, medicamentos, el embarazo y composiciones corporales atípicas alteran el gasto real; consulte con un profesional sanitario antes de cambiar su dieta.",
        },
      ],
    },
    pt: {
      name: "Calculadora de metabolismo basal",
      tagline:
        "Calcule seu metabolismo basal com a equação Mifflin-St Jeor (1990) — as calorias que seu corpo queima em repouso completo todos os dias.",
      intro: [
        "Seu metabolismo basal (TMB) é a energia que o corpo gasta só para continuar vivo — respirar, circular o sangue, manter a temperatura — antes de qualquer movimento ou digestão. Esta calculadora usa a equação de Mifflin-St Jeor, publicada em 1990 e ainda o preditor geral mais preciso para populações atuais: homens 10 × peso (kg) + 6,25 × altura (cm) − 5 × idade + 5; mulheres a mesma expressão menos 161.",
        "Informe seus dados em unidades métricas ou imperiais e o resultado atualiza enquanto você digita. Trate o número como uma estimativa populacional — normalmente a ±10% de uma medição de laboratório — e não como um diagnóstico médico.",
      ],
      steps: [
        "Escolha seu sexo e as unidades métricas (cm + kg) ou imperiais (ft + in + lb).",
        "Informe altura, peso e idade.",
        "Veja sua TMB em quilocalorias por dia.",
        "Leve o valor à calculadora de calorias para obter manutenção e metas.",
      ],
      faqs: [
        {
          q: "Qual fórmula é usada e qual a precisão?",
          a: "A equação de Mifflin-St Jeor, publicada em 1990 e recomendada pela American Dietetic Association após validação contra calorimetria indireta. Ela prevê o gasto energético de repouso medido dentro de cerca de ±10% para a maioria dos adultos, com mais precisão que a equação de Harris-Benedict (1919).",
        },
        {
          q: "Qual a diferença entre TMB e as calorias diárias?",
          a: "A TMB cobre apenas o repouso completo. Seu gasto real diário é a TMB multiplicada por um fator de atividade — cerca de 1,2 num dia sedentário até 1,9 para pessoas muito ativas. A calculadora de calorias aplica esse fator e sua meta para você.",
        },
        {
          q: "Isso é aconselhamento médico?",
          a: "Não — é uma estimativa, não aconselhamento médico. Doenças, medicamentos, gravidez e composições corporais atípicas alteram o gasto real; converse com um profissional de saúde antes de mudar a dieta.",
        },
      ],
    },
  },
});
