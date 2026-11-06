import { CalcEngineHealth } from "../_engines/calc-engine-health";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "water-intake-calculator",
  category: "utility",
  icon: "calc",
  engine: { component: CalcEngineHealth, props: { kind: "water" } },
  related: ["bmr-calculator", "calorie-calculator", "bmi-calculator", "age-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "aspect-ratio-calculator", "barcode-generator"],
  copy: {
    en: {
      name: "Water Intake Calculator",
      tagline:
        "Get a daily water target: 35 ml per kilogram of body weight plus about 350 ml for every 30 minutes of exercise, with hot-weather guidance.",
      intro: [
        "This calculator starts from the standard maintenance-fluid heuristic used in clinical practice: 35 ml of water per kilogram of body weight each day, before any activity. It then adds about 350 ml for every 30 minutes of exercise to cover sweat losses, and shows the baseline and the exercise bonus separately so you can see where the total comes from.",
        "Enter your weight in kilograms or pounds and your exercise minutes per day. In hot weather, or when you sweat heavily, drink more than the calculated total; food and other drinks supply water too. The result is a general hydration estimate, not medical advice.",
        "The baseline follows the 35 ml/kg maintenance heuristic widely taught in clinical fluid management, and the exercise add-on of roughly 350 ml per 30 minutes reflects typical sweat rates of 0.5–1 liter per hour of moderate activity. Hot weather can push losses past a liter per hour, so treat the total as a floor, not a ceiling.",
        "Compared with the flattened eight-glasses rule, this scales with your body weight and training load and shows the two components separately. Roughly 20–30% of fluid normally comes from food, so thirst and pale-yellow urine remain the best real-time signals. Kidney or heart conditions may require fluid restriction — follow your clinician's numbers over any calculator.",
      ],
      steps: [
        "Choose metric (kg) or imperial (lb) units.",
        "Enter your body weight.",
        "Enter how many minutes you exercise per day.",
        "Read the baseline, the exercise bonus and the combined daily target.",
      ],
      faqs: [
        {
          q: "Where does the 35 ml/kg rule come from?",
          a: "It is the classic pediatric-to-adult maintenance-fluid heuristic used across clinical practice (often quoted as 30–35 ml/kg/day for adults). For comparison, the European Food Safety Authority puts adequate total water intake at 2.0 L/day for women and 2.5 L/day for men — including water from food.",
        },
        {
          q: "Do coffee, tea and food count toward the total?",
          a: "Yes. Roughly 20–30% of daily water intake normally comes from food, and moderate caffeinated drinks contribute to hydration rather than draining it. The calculated figure is plain-fluid guidance on top of a normal diet, so you do not need to drink the whole amount as plain water.",
        },
        {
          q: "Is this medical advice?",
          a: "No — this is a general estimate. People with heart, kidney or liver conditions, and those told to restrict fluids, often need less than the calculated amount: follow your clinician's instructions instead.",
        },
      ],
      deepDive: [
        {
          heading: "Where the numbers come from",
          paragraphs: [
            "The baseline uses the maintenance-fluid heuristic taught across clinical practice: 35 ml of water per kilogram of body weight per day (adult guidance is often quoted as a 30-35 ml/kg range). It originated in pediatric fluid management, where dosing fluids by weight is routine, and was carried over to adults as a quick rule of thumb.",
            "The exercise add-on of roughly 350 ml per 30 minutes reflects typical sweat rates of 0.5-1 liter per hour of moderate activity; heavy exertion in heat can exceed a liter per hour. The calculator shows baseline and exercise bonus separately so you can see that the second number is the uncertain one — sweat output varies enormously between people and conditions.",
            "For context, the European Food Safety Authority sets adequate total water intake at 2.0 L/day for women and 2.5 L/day for men — figures that include water from food, which normally supplies 20-30% of total intake.",
          ],
        },
        {
          heading: "How much of the total should be plain water?",
          paragraphs: [
            "Less than the headline number. Food, coffee, tea, milk and juice all contribute — moderate caffeinated drinks hydrate rather than dehydrate, a misconception that has survived decades. The calculated figure is guidance for total fluid on top of a normal diet, so a typical person might drink perhaps two-thirds of it as plain water.",
            "Your body also provides real-time feedback that outperforms any formula: thirst, and urine color. Pale straw-yellow means you are fine; dark amber means drink now. These signals track your actual state, whereas the calculator tracks your inputs.",
            "Expect the need to move day to day. Heat, humidity, altitude, illness with fever, and alcohol all raise losses; a rest day in air conditioning lowers them. The computed number is a calm-day reference, not a quota to hit regardless of circumstances.",
          ],
        },
        {
          heading: "Individual variation and who should not follow a calculator",
          paragraphs: [
            "Body weight is a crude proxy. Sweat rate is partly trainable and heavily individual — two people of identical weight can lose radically different amounts of sodium and fluid in the same session. Serious endurance athletes eventually weigh themselves before and after sessions: the weight lost (mostly sweat) is the most personal water number that exists.",
            "Overdrinking is a real risk, not just a theoretical one: forcing liters beyond thirst can dilute blood sodium (exercise-associated hyponatremia), which has caused serious harm in slow marathon finishers drinking at every station. More is not better; matching losses is the goal.",
            "Anyone with heart failure, kidney disease or liver disease is often placed on fluid restriction, and some medications affect fluid balance. If you have been told to restrict fluids, your clinician's number overrides this calculator — no general formula can account for a medical restriction.",
          ],
        },
      ],
    },
    zh: {
      name: "饮水量计算器",
      tagline:
        "算出每天喝多少水:每公斤体重 35 毫升的基础量,加每运动 30 分钟约 350 毫升,并附炎热天气提示,支持公斤与磅。",
      intro: [
        "本计算器以临床常用的维持液量估算为基础:每天每公斤体重 35 毫升水,不含任何活动消耗;再按每运动 30 分钟补充约 350 毫升来覆盖出汗损失。基础量与运动补充分开显示,总量从哪里来一目了然。",
        "以公斤或磅输入体重,再输入每天的运动分钟数。天气炎热或大量出汗时,应喝得比计算值更多;食物和其他饮品同样提供水分。结果是一般性的补水估算,不构成医疗建议。",
      ],
      steps: [
        "选择公制(kg)或英制(lb)。",
        "输入体重。",
        "输入每天运动的分钟数。",
        "查看基础量、运动补充与合计的每日目标。",
      ],
      faqs: [
        {
          q: "35 毫升/公斤这个标准从哪来?",
          a: "它是临床常用的维持液量估算(成人常写作每天 30–35 毫升/公斤)。作为对比,欧洲食品安全局建议的总水摄入量为女性每天 2.0 升、男性 2.5 升——包含食物中的水分。",
        },
        {
          q: "咖啡、茶和食物算不算在总量里?",
          a: "算。日常饮水约 20–30% 来自食物,适量含咖啡因饮品也补水而不是脱水。计算结果是正常饮食之外的纯饮水参考,不需要全部以白开水形式喝完。",
        },
        {
          q: "这是医疗建议吗?",
          a: "不是——这只是一般估算。心、肾、肝疾病患者以及被要求限水的人,所需水量往往低于计算值:请遵医嘱。",
        },
      ],
      deepDive: [
        {
          heading: "这些数字从哪来",
          paragraphs: [
            "基线用的是临床实践中通行的维持液量经验法:每天每公斤体重 35 毫升水(成人常被引为 30–35 ml/kg 区间)。它源于儿科补液管理——按体重给液体量是儿科的日常——后来被搬来当作成年人的快速估算。",
            "运动加成按每 30 分钟约 350 毫升计,对应中等强度运动每小时 0.5–1 升的典型出汗率;炎热环境下高强度运动可超过每小时一升。计算器把基线和运动加成分开显示,就是为了让你看到第二个数字才是不确定的那个——出汗量因人、因环境差别极大。",
            "作为参照,欧洲食品安全局给出的足量总水摄入是女性每天 2.0 升、男性 2.5 升——这些数字包含食物中的水,而食物通常占总摄入的 20–30%。",
          ],
        },
        {
          heading: "总量里有多少该喝白水?",
          paragraphs: [
            "比标题数字少。食物、咖啡、茶、牛奶和果汁都计入——适量含咖啡因饮料是补水而不是脱水,这个误解流传了几十年。算出的数字是正常饮食之外的液体总量参考,普通人把其中大约三分之二作为白水喝掉即可。",
            "身体还自带两套比任何公式都好用的实时反馈:口渴,和尿液颜色。淡稻草黄说明不缺;深琥珀色说明该喝了。这些信号反映你的真实状态,而计算器只反映你的输入。",
            "需求本来就会天天变。炎热、潮湿、高原、发烧生病和饮酒都会增加流失;空调房里的休息日则会减少。算出的数字是平静一天的参考值,不是不问情况也要完成的配额。",
          ],
        },
        {
          heading: "个体差异,以及哪些人不该照计算器喝",
          paragraphs: [
            "体重是粗糙的代理变量。出汗率部分可以训练,而且个体差异巨大——体重完全相同的两个人,同一节训练课流失的水和钠可以天差地别。认真的耐力运动员最终会在训练前后称重:掉的那部分体重(主要是汗)是最个人化的饮水数字。",
            "过量饮水是真实风险,不是理论担忧:不顾口渴硬灌几升会稀释血钠(运动相关性低钠血症),在边喝边走的慢速马拉松完赛者中造成过严重后果。越多越好是错的;目标是匹配流失。",
            "心衰、肾病或肝病患者常被要求限液,一些药物也会影响体液平衡。如果你被医嘱限液,医生的数字高于任何计算器——通用公式无法涵盖医学上的限制。",
          ],
        },
      ],
    },
    ja: {
      name: "水分摂取量計算",
      tagline:
        "1 日の水分目標を算出:体重 1 kg あたり 35 ml の基本量に、運動 30 分ごとに約 350 ml を追加。暑い日の目安も示し、kg とポンドに対応。",
      intro: [
        "この計算ツールは、臨床で使われる維持輸液量の標準的な目安から始めます:活動を含まない状態で 1 日に体重 1 kg あたり 35 ml の水分。さらに発汗による損失を補うため、運動 30 分ごとに約 350 ml を加算し、基本量と運動分を分けて表示します。",
        "体重を kg またはポンドで、1 日の運動時間を分で入力します。暑い日や大量に汗をかくときは計算値より多めに。食事や他の飲み物からも水分は摂れます。結果は一般的な水分補給の目安であり、医療アドバイスではありません。",
      ],
      steps: [
        "メートル法(kg)かヤード・ポンド法(lb)を選びます。",
        "体重を入力します。",
        "1 日の運動時間(分)を入力します。",
        "基本量・運動の追加分・合計の 1 日目標を確認します。",
      ],
      faqs: [
        {
          q: "35 ml/kg の基準はどこから来ますか?",
          a: "臨床で広く使われる維持輸液量の古典的な目安です(成人は 1 日 30〜35 ml/kg と紹介されることも多い)。参考までに、欧州食品安全機関(EFSA)の妥当な総水分摂取量は女性 2.0 L/日・男性 2.5 L/日で、食品からの水分を含みます。",
        },
        {
          q: "コーヒーやお茶、食事は総量に含まれますか?",
          a: "含まれます。1 日の水分摂取の約 20〜30% は通常食事から来ており、適量のカフェイン飲料も水分を奪うより補給になります。計算値は通常の食事に上乗せする飲料水の目安なので、すべてを水として飲む必要はありません。",
        },
        {
          q: "これは医療アドバイスですか?",
          a: "いいえ — 一般的な推定です。心臓・腎臓・肝臓の疾患がある方や水分制限を指示されている方は、必要量がこれより少ないことが多いので、主治医の指示に従ってください。",
        },
      ],
      deepDive: [
        {
          heading: "数字の出どころ",
          paragraphs: [
            "ベースラインは臨床で広く教えられる維持輸液の経験則です:1日あたり体重 1 kg につき水 35 ml(成人はしばしば 30〜35 ml/kg の幅で引用)。もとは小児の輸液管理——体重で液量を決めるのが日常の場——から来ており、成人への簡易目安として引き継がれました。",
            "運動の上乗せは 30 分につき約 350 ml。中等強度の運動で毎時 0.5〜1 リットルという典型的な発汗率に対応します。暑熱下の高強度なら毎時 1 リットル超。このツールがベースと運動分を別表示するのは、不確実なのが後者だから——発汗量は人と環境で桁違いに変わります。",
            "参考までに、欧州食品安全機関(EFSA)の十分な総水分摂取量は女性 2.0 L/日、男性 2.5 L/日——食品からの水分を含む数値で、通常の食事が総摂取の 20〜30% を占めます。",
          ],
        },
        {
          heading: "総量のうち、真水でどれくらい?",
          paragraphs: [
            "表題の数字より少なくて済みます。食品、コーヒー、茶、牛乳、果汁はすべて算入——適量のカフェイン飲料は脱水ではなく補水になります。算出値は通常の食事に上乗せする総液量の目安なので、その約 3 分の 2 を真水で賄えば十分な人が多いはずです。",
            "体にはどんな公式より優れたリアルタイムの指標が備わっています:のどの渇きと尿の色。淡い麦藁色なら問題なし、濃い琥珀色なら今飲む。これらは実際の状態を追い、計算機は入力値を追うにすぎません。",
            "必要量は日ごとに動きます。暑さ・湿度・高地・発熱・アルコールは損失を増やし、冷房の効いた休日は減らします。算出値は穏やかな一日の基準値であって、状況にかかわらず達成すべきノルマではありません。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de agua diaria",
      tagline:
        "Calcule cuánta agua beber al día: 35 ml por kilo de peso corporal más unos 350 ml por cada 30 minutos de ejercicio, con guía para calor.",
      intro: [
        "Esta calculadora parte de la heurística estándar de líquidos de mantenimiento usada en la práctica clínica: 35 ml de agua por kilo de peso corporal al día, antes de cualquier actividad. Después añade unos 350 ml por cada 30 minutos de ejercicio para cubrir el sudor, y muestra la base y el extra por ejercicio por separado para que vea de dónde sale el total.",
        "Introduzca su peso en kilos o libras y sus minutos de ejercicio al día. Con calor o si suda mucho, beba más que el total calculado; los alimentos y otras bebidas también aportan agua. El resultado es una estimación general de hidratación, no consejo médico.",
      ],
      steps: [
        "Elija unidades métricas (kg) o imperiales (lb).",
        "Introduzca su peso corporal.",
        "Introduzca cuántos minutos ejercita al día.",
        "Lea la base, el extra por ejercicio y el objetivo diario combinado.",
      ],
      faqs: [
        {
          q: "¿De dónde sale la regla de 35 ml/kg?",
          a: "Es la heurística clásica de líquidos de mantenimiento usada en la práctica clínica (a menudo citada como 30–35 ml/kg/día en adultos). Como referencia, la Autoridad Europea de Seguridad Alimentaria fija la ingesta adecuada de agua total en 2,0 L/día para mujeres y 2,5 L/día para hombres — incluida el agua de los alimentos.",
        },
        {
          q: "¿Café, té y comida cuentan en el total?",
          a: "Sí. Entre el 20 y el 30% del agua diaria suele venir de los alimentos, y las bebidas con cafeína moderada hidratan en vez de deshidratar. La cifra calculada es una guía de líquidos por encima de una dieta normal: no hace falta beberla toda como agua sola.",
        },
        {
          q: "¿Esto es consejo médico?",
          a: "No — es una estimación general. Las personas con afecciones cardíacas, renales o hepáticas, y quienes deben restringir líquidos, suelen necesitar menos de la cantidad calculada: siga las indicaciones de su médico.",
        },
      ],
      deepDive: [
        {
          heading: "De dónde salen las cifras",
          paragraphs: [
            "La base usa la heurística de líquidos de mantenimiento que se enseña en la práctica clínica: 35 ml de agua por kilo de peso corporal al día (en adultos se cita a menudo como un rango de 30-35 ml/kg). Nació en el manejo de fluidos pediátrico — donde dosificar por peso es rutina — y se trasladó a adultos como regla rápida.",
            "El añadido por ejercicio, unos 350 ml por cada 30 minutos, refleja tasas de sudoración típicas de 0,5-1 litro por hora de actividad moderada; el esfuerzo intenso con calor puede superar el litro por hora. La calculadora muestra base y suplemento por separado para que veas cuál es la cifra incierta — el sudor varía muchísimo entre personas y condiciones.",
            "Como referencia, la Autoridad Europea de Seguridad Alimentaria fija la ingesta total adecuada de agua en 2,0 L/día para mujeres y 2,5 L/día para hombres — cifras que incluyen el agua de los alimentos, que normalmente aporta el 20-30 % del total.",
          ],
        },
        {
          heading: "¿Cuánto del total debe ser agua sola?",
          paragraphs: [
            "Menos que la cifra principal. Los alimentos, el café, el té, la leche y el zumo cuentan todos — y las bebidas con cafeína moderada hidratan en lugar de deshidratar, un malentendido que lleva décadas circulando. La cifra calculada orienta el líquido total sobre una dieta normal, así que una persona típica puede beber como agua unos dos tercios.",
            "Tu cuerpo además da retroalimentación en tiempo real mejor que cualquier fórmula: la sed y el color de la orina. Amarillo paja claro significa que vas bien; ámbar oscuro significa beber ya. Estas señales siguen tu estado real; la calculadora solo sigue tus datos de entrada.",
            "La necesidad cambia día a día. Calor, humedad, altitud, fiebre y alcohol aumentan las pérdidas; un día de descanso con aire acondicionado las reduce. El número calculado es una referencia de día tranquilo, no una cuota que cumplir pase lo que pase.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de ingestão de água",
      tagline:
        "Descubra quanta água beber por dia: 35 ml por quilo de peso corporal mais cerca de 350 ml a cada 30 minutos de exercício, com dica para o calor.",
      intro: [
        "Esta calculadora parte da heurística padrão de manutenção de líquidos usada na prática clínica: 35 ml de água por quilo de peso corporal por dia, antes de qualquer atividade. Em seguida soma cerca de 350 ml a cada 30 minutos de exercício para cobrir o suor, e mostra a base e o extra por exercício separadamente, para você ver de onde vem o total.",
        "Informe seu peso em quilos ou libras e seus minutos de exercício por dia. No calor, ou quando você suar muito, beba mais que o total calculado; alimentos e outras bebidas também fornecem água. O resultado é uma estimativa geral de hidratação, não aconselhamento médico.",
      ],
      steps: [
        "Escolha unidades métricas (kg) ou imperiais (lb).",
        "Informe seu peso corporal.",
        "Informe quantos minutos você se exercita por dia.",
        "Veja a base, o extra por exercício e a meta diária combinada.",
      ],
      faqs: [
        {
          q: "De onde vem a regra de 35 ml/kg?",
          a: "É a heurística clássica de manutenção de líquidos usada na prática clínica (muitas vezes citada como 30–35 ml/kg/dia para adultos). Como comparação, a Autoridade Europeia para a Segurança dos Alimentos define a ingestão adequada de água total em 2,0 L/dia para mulheres e 2,5 L/dia para homens — incluindo a água dos alimentos.",
        },
        {
          q: "Café, chá e comida contam no total?",
          a: "Sim. Cerca de 20–30% da ingestão diária de água normalmente vem dos alimentos, e bebidas com cafeína em quantidade moderada hidratam em vez de desidratar. O valor calculado é uma orientação de líquidos por cima de uma dieta normal: não precisa beber tudo como água pura.",
        },
        {
          q: "Isso é aconselhamento médico?",
          a: "Não — é uma estimativa geral. Pessoas com condições cardíacas, renais ou hepáticas, e quem foi orientado a restringir líquidos, geralmente precisam de menos que o valor calculado: siga as instruções do seu médico.",
        },
      ],
      deepDive: [
        {
          heading: "De onde vêm os números",
          paragraphs: [
            "A base usa a heurística de líquidos de manutenção ensinada na prática clínica: 35 ml de água por quilo de peso corporal por dia (para adultos, costuma ser citada como faixa de 30-35 ml/kg). Ela nasceu no manejo de fluidos pediátrico — onde dosar por peso é rotina — e foi levada aos adultos como regra rápida.",
            "O acréscimo por exercício, cerca de 350 ml a cada 30 minutos, reflete taxas de suor típicas de 0,5-1 litro por hora de atividade moderada; esforço intenso no calor pode passar de um litro por hora. A calculadora mostra base e bônus separadamente para você ver qual número é o incerto — o suor varia enormemente entre pessoas e condições.",
            "Como referência, a Autoridade Europeia para a Segurança dos Alimentos define a ingestão total adequada de água em 2,0 L/dia para mulheres e 2,5 L/dia para homens — valores que incluem a água dos alimentos, que normalmente fornece 20-30 % do total.",
          ],
        },
        {
          heading: "Quanto do total deve ser água pura?",
          paragraphs: [
            "Menos que o número principal. Alimentos, café, chá, leite e suco contam todos — e bebidas com cafeína moderada hidratam em vez de desidratar, um equívoco que circula há décadas. O número calculado orienta o líquido total sobre uma dieta normal, então uma pessoa típica pode beber cerca de dois terços como água pura.",
            "Seu corpo também dá retorno em tempo real melhor que qualquer fórmula: a sede e a cor da urina. Amarelo-palha claro significa que está tudo bem; âmbar escuro significa beber agora. Esses sinais acompanham seu estado real; a calculadora acompanha apenas seus dados de entrada.",
            "A necessidade muda dia a dia. Calor, umidade, altitude, febre e álcool aumentam as perdas; um dia de descanso no ar-condicionado as reduz. O número calculado é uma referência de dia tranquilo, não uma cota a cumprir de qualquer maneira.",
          ],
        },
      ],
    },
  },
});
