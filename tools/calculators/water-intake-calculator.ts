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
    },
  },
});
