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
        "Mifflin–St Jeor is chosen over the older Harris–Benedict equation because validation studies (notably the 2005 ADA comparison) found it predicts measured resting energy expenditure more accurately for today's populations. It needs only weight, height, age and sex — no lab equipment, unlike calorimetry, which is the gold standard.",
        "A BMR figure on its own is not your daily requirement; it must be multiplied by an activity factor (the basis of a TDEE estimate) to reflect real life. Treat the result as a starting point for planning intake — individual metabolic rates can deviate by around 10% or more in either direction.",],
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
      deepDive: [
        {
          heading: "Mifflin-St Jeor vs. the older equations",
          paragraphs: [
            "This tool uses the Mifflin-St Jeor equation, published in 1990: for men, 10 × weight (kg) + 6.25 × height (cm) − 5 × age + 5, and for women the same expression minus 161 instead of the +5. It was fitted to measured resting energy expenditure and validated against indirect calorimetry, the lab gold standard that measures oxygen consumption directly.",
            "The alternative you will meet most often is Harris-Benedict, originally published in 1919 and revised in 1984. A widely cited 2005 American Dietetic Association comparison found Mifflin-St Jeor more accurate for modern populations, which is why this calculator standardizes on it. A third option, Katch-McArdle, uses lean body mass instead of weight and can be sharper for people who know their body-fat percentage — but it requires a number most people do not have.",
            "The practical takeaway: differences between these equations are typically tens of kilocalories, smaller than the day-to-day variation in your own expenditure. If two calculators disagree slightly, the formula choice is usually the reason, and neither is wrong.",
          ],
        },
        {
          heading: "Reading the number: BMR is not your daily burn",
          paragraphs: [
            "BMR is the floor, not the budget. It covers breathing, circulation, cell repair and temperature regulation at complete rest — roughly 60–70% of what most sedentary adults burn in a day. Your real total daily energy expenditure (TDEE) is BMR multiplied by an activity factor, from about 1.2 for a desk-bound day to around 1.9 for heavy physical work or daily hard training.",
            "That multiplication matters more than the formula itself. Two people with identical BMR can burn 800+ kcal apart per day purely from lifestyle. This calculator deliberately reports only BMR; the calorie calculator on this site takes the next step and applies the activity factor and a goal for you.",
            "A useful sanity check: BMR scales mainly with weight, height and age, so if the result shifts sharply after a small input change, re-check the units — kg versus lb is the classic mix-up.",
          ],
        },
        {
          heading: "Common mistakes and honest limits",
          paragraphs: [
            "Every predictive equation carries individual error. Mifflin-St Jeor lands within roughly ±10% of lab measurement for most adults, but individuals with very high or low muscle mass, thyroid conditions, or certain medications can sit well outside that band. Treat the output as a planning starting point, not a physiological fact.",
            "Do not use BMR to justify eating below it. Resting metabolism is already covered by the lean tissue keeping you alive; aggressive deficits below BMR are a decision for a healthcare professional, not a calculator. Likewise, metabolic adaptation means the number you calculated at 90 kg stops being accurate at 80 kg — recalculate as your weight changes.",
            "Like everything on this site, the calculation runs entirely in your browser: no inputs are sent anywhere, so there is no reason to hesitate over entering real figures.",
          ],
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
      deepDive: [
        {
          heading: "为什么选 Mifflin–St Jeor 而不是更老的公式",
          paragraphs: [
            "本工具用的是 1990 年发表的 Mifflin–St Jeor 公式:男性为 10 × 体重(kg)+ 6.25 × 身高(cm) − 5 × 年龄 + 5,女性用同一表达式减 161 而不是加 5。它由实测静息能耗数据拟合而来,并以间接测热法(实验室金标准)做过验证。",
            "最常见的备选是 1919 年发表、1984 年修订的 Harris–Benedict 公式。美国饮食协会 2005 年的一项对比研究发现,Mifflin–St Jeor 对现代人群的预测更准,这正是本工具选用它的原因。另一个选择 Katch–McArdle 用瘦体重而非体重计算,对知道自身体脂率的人可能更贴合,但前提是得有这个数。",
            "实用结论:这几个公式之间的差异通常只有几十千卡,小于你自己每天能耗的正常波动。两个计算器结果略有出入时,多半是公式口径不同,而不是谁算错了。",
          ],
        },
        {
          heading: "BMR 只是下限,不是你每天的总消耗",
          paragraphs: [
            "基础代谢是地板,不是预算。它只覆盖呼吸、血液循环、细胞修复和体温维持——久坐成年人一天消耗的大头(约六到七成)都在这里。真正的每日总消耗(TDEE)等于 BMR 乘以活动系数:久坐日约 1.2,重体力劳动或每天大强度训练可到 1.9 左右。",
            "这一步乘法比选哪个公式更重要:两个 BMR 完全相同的人,仅因生活方式不同,每天消耗可以差出 800 千卡以上。本工具只报 BMR;站内的卡路里计算器负责下一步,帮你乘上活动系数并按目标调整。",
            "一个自查技巧:BMR 主要随体重、身高、年龄变化。如果改动很小的输入却让结果大幅跳动,先检查单位——公斤误填成磅是最常见的乌龙。",
          ],
        },
        {
          heading: "常见误用与诚实的误差范围",
          paragraphs: [
            "任何预测公式都有个体误差。Mifflin–St Jeor 对多数成年人的偏差在实测值 ±10% 左右,但肌肉量特别高或特别低、有甲状腺问题或服用特定药物的人,可能落在区间之外。把它当作规划的起点,而不是生理事实。",
            "别拿 BMR 当作“可以吃到这个数以下”的依据。静息代谢对应的是维持你活着的那部分组织;低于 BMR 的激进热量缺口应该和医生讨论,而不是问计算器。另外,代谢会随体重变化适应:90 公斤时算出的数,到 80 公斤时已不再准确,减重过程中要定期重算。",
            "和站内所有工具一样,计算完全在你的浏览器里完成,输入不会上传到任何地方,可以放心填真实数据。",
          ],
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
      deepDive: [
        {
          heading: "なぜ Mifflin-St Jeor 式なのか",
          paragraphs: [
            "このツールは1990年発表の Mifflin-St Jeor 式を使います。男性は「10 × 体重(kg)+ 6.25 × 身長(cm) − 5 × 年齢 + 5」、女性は同じ式から +5 の代わりに −161。実測の安静時エネルギー消費量に基づいて作られ、間接熱量測定(ラボの金標準)で検証されています。",
            "最もよく見かける代替式は、1919年発表・1984年改訂の Harris-Benedict 式です。2005年のアメリカ食事療法協会の比較研究では、現代人に対する精度で Mifflin-St Jeor が上回るとされ、これが採用理由です。体内脂肪率が分かる人には Katch-McArdle 式(除脂肪体重ベース)も選択肢ですが、入力値が必要な点がネックです。",
            "実用上のポイント:式の違いによる差は通常数十 kcal で、日々の消費量の自然な変動より小さものです。計算結果が少し違っても、それは式の違いによるもので、どちらが間違っているわけではありません。",
          ],
        },
        {
          heading: "BMR は下限であり、1日の総消費ではない",
          paragraphs: [
            "基礎代謝は「床」であって「予算」ではありません。呼吸・血液循環・細胞修復・体温維持だけをカバーし、座り仕事中心の成人の1日消費の約6〜7割に相当します。実際の総消費量(TDEE)は BMR × 活動係数で、デスクワーク中心なら約1.2、重労働や毎日のハードトレーニングなら約1.9。",
            "この掛け算の方が式の選択より影響が大きく、同じ BMR の二人でも生活スタイル次第で1日の消費は800 kcal 以上変わります。このツールは BMR のみを表示し、活動係数と目標の適用はカロリー計算ツールが担当します。",
            "セルフチェックとして:BMR は主に体重・身長・年齢で決まります。入力の小さな変更で結果が大きく動いたら、単位(kg と lb の取り違え)を確認しましょう。",
          ],
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
      deepDive: [
        {
          heading: "Por qué Mifflin-St Jeor y no las fórmulas más antiguas",
          paragraphs: [
            "Esta herramienta usa la ecuación de Mifflin-St Jeor, publicada en 1990: para hombres, 10 × peso (kg) + 6,25 × altura (cm) − 5 × edad + 5; para mujeres, la misma expresión restando 161 en lugar de sumar 5. Se ajustó a mediciones reales del gasto energético en reposo y se validó frente a la calorimetría indirecta, el estándar de laboratorio.",
            "La alternativa más habitual es Harris-Benedict, publicada en 1919 y revisada en 1984. Una comparación de la American Dietetic Association de 2005 concluyó que Mifflin-St Jeor predice mejor en poblaciones actuales, y por eso esta calculadora se basa en ella. Existe también Katch-McArdle, que usa la masa magra en vez del peso y puede ajustarse mejor si conoces tu porcentaje de grasa corporal.",
            "En la práctica: las diferencias entre estas ecuaciones suelen ser de decenas de kilocalorías, menores que la variación natural de tu propio gasto diario. Si dos calculadoras difieren un poco, casi siempre se debe a la fórmula, no a un error.",
          ],
        },
        {
          heading: "El TMB es el suelo, no tu gasto diario",
          paragraphs: [
            "El metabolismo basal cubre respiración, circulación, reparación celular y temperatura corporal en reposo completo: en torno al 60-70 % de lo que quema un adulto sedentario. El gasto total real (TDEE) es el TMB multiplicado por un factor de actividad: unos 1,2 en un día de escritorio y hasta 1,9 con trabajo físico intenso o entrenamiento diario exigente.",
            "Esa multiplicación importa más que la fórmula: dos personas con el mismo TMB pueden diferir en más de 800 kcal al día solo por su estilo de vida. Esta calculadora muestra solo el TMB; la calculadora de calorías del sitio aplica el factor de actividad y tu objetivo.",
            "Un consejo de comprobación: el TMB depende sobre todo del peso, la altura y la edad. Si un cambio pequeño de entrada mueve mucho el resultado, revisa las unidades — confundir kg con lb es el error clásico.",
          ],
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
      deepDive: [
        {
          heading: "Por que Mifflin-St Jeor e não as fórmulas mais antigas",
          paragraphs: [
            "Esta ferramenta usa a equação de Mifflin-St Jeor, publicada em 1990: para homens, 10 × peso (kg) + 6,25 × altura (cm) − 5 × idade + 5; para mulheres, a mesma expressão com −161 em vez de +5. Ela foi ajustada a medições reais de gasto energético em repouso e validada contra calorimetria indireta, o padrão-ouro de laboratório.",
            "A alternativa mais comum é Harris-Benedict, publicada em 1919 e revisada em 1984. Uma comparação da American Dietetic Association de 2005 concluiu que Mifflin-St Jeor prevê melhor nas populações atuais, e é por isso que esta calculadora a adota. Há também Katch-McArdle, que usa massa magra em vez de peso e pode ser mais precisa para quem conhece o próprio percentual de gordura.",
            "Na prática: as diferenças entre essas equações ficam na casa de dezenas de calorias, menores que a variação natural do seu próprio gasto diário. Se duas calculadoras divergem um pouco, quase sempre é a fórmula, não um erro.",
          ],
        },
        {
          heading: "A TMB é o piso, não o seu gasto diário",
          paragraphs: [
            "O metabolismo basal cobre respiração, circulação, reparo celular e temperatura corporal em repouso completo: cerca de 60-70 % do que um adulto sedentário queima por dia. O gasto total real (TDEE) é a TMB multiplicada por um fator de atividade: cerca de 1,2 num dia de escritório e até 1,9 com trabalho físico pesado ou treino diário intenso.",
            "Essa multiplicação importa mais do que a escolha da fórmula: duas pessoas com a mesma TMB podem gastar mais de 800 kcal a mais por dia só pelo estilo de vida. Esta calculadora mostra apenas a TMB; a calculadora de calorias do site aplica o fator de atividade e o seu objetivo.",
            "Uma dica de conferência: a TMB depende principalmente de peso, altura e idade. Se uma pequena mudança de entrada altera muito o resultado, verifique as unidades — trocar kg por lb é o erro clássico.",
          ],
        },
      ],
    },
  },
});
