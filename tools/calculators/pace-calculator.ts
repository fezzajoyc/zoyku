import { CalcEnginePace } from "../_engines/calc-engine-pace";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "pace-calculator",
  category: "utility",
  icon: "clock",
  engine: { component: CalcEnginePace },
  related: ["one-rep-max-calculator", "sleep-calculator", "bmi-calculator", "time-converter", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Pace Calculator",
      tagline: "Compute running pace per km and per mile from any distance and time, then predict race times with Peter Riegel's 1.06 exponent formula.",
      intro: [
        "Enter any distance — 5K, 10K, half marathon, marathon or a custom one in kilometers or miles — plus your finish time, and see your pace per kilometer, pace per mile, and speed in km/h and mph at once. A half-marathon in 2:00 shows as 5:41/km, 9:10/mile and 10.6 km/h without any mental math.",
        "The race predictor applies Peter Riegel's endurance formula T₂ = T₁ × (D₂/D₁)^1.06: give it one honest race result and it projects your expected finish for every standard distance, from the 5K to the marathon.",
        "Pace is time divided by distance, shown per kilometer and per mile with the conversions computed exactly — a 45:00 10K is 4:30/km and 7:14/mile — plus speed in km/h and mph. The Riegel exponent of 1.06 comes from his 1977 Runner's World analysis of hundreds of recorded race results.",
        "Compared with watch-app splits, this one answers the planning questions in one place: what pace does a sub-2:00 half marathon need, and what does that imply for a marathon? Riegel projections assume you trained specifically for the target distance — a fast 5K alone will not predict an honest marathon. GPS drift and treadmill inaccuracy make real races the ground truth.",
      ],
      steps: [
        "Pick a race distance preset, or choose Custom and enter any distance in km or miles.",
        "Type your finish time in hours, minutes and seconds.",
        "Read pace per km, pace per mile and both speeds — or switch to Race predictor for projected times at every distance.",
      ],
      faqs: [
        {
          q: "Where does the race prediction formula come from?",
          a: "From Peter Riegel, a research engineer who published T₂ = T₁ × (D₂/D₁)^1.06 in Runner's World in 1977. The 1.06 exponent captures how pace fades with distance: doubling the race distance takes about 9% longer than twice the time. It assumes you trained specifically for the target distance — it will not predict a marathon from a single fast 5K if you never ran long.",
        },
        {
          q: "Why is my predicted pace per km slower for longer races?",
          a: "That is the formula doing its job. The 1.06 exponent means each doubling of distance costs roughly 6% extra time beyond the proportional amount, reflecting glycogen depletion, fueling and fatigue. Shorter predictions (10K from a half marathon) come out faster per km for the same reason.",
        },
        {
          q: "Does the calculator handle miles as well as kilometers?",
          a: "Yes. Custom distances accept either unit, and results are always shown both ways: pace per km and per mile, speed in km/h and mph. The conversion uses the exact international mile of 1.609344 km.",
        },
      ],
    },
    zh: {
      name: "配速计算器",
      tagline: "输入任意距离与完赛时间,立刻算出每公里/每英里配速和速度,并用 Peter Riegel 指数 1.06 公式预测各距离比赛成绩。",
      intro: [
        "选择 5 公里、10 公里、半马、全马或自定义距离(公里或英里均可),再输入完赛时间,一次性得到每公里配速、每英里配速,以及公里/小时和英里/小时两种速度。半马跑进 2 小时会直接显示 5:41/km、9:10/mile 和 10.6 km/h。",
        "比赛预测采用 Peter Riegel 的耐力公式 T₂ = T₁ × (D₂/D₁)^1.06:只要有一个真实的比赛成绩,就能推算从 5 公里到全马每个标准距离的预期完赛时间。",
      ],
      steps: [
        "选择比赛距离预设,或选“自定义”并输入公里/英里距离。",
        "按时、分、秒输入完赛时间。",
        "查看每公里与每英里配速和两种速度——或切换到“比赛成绩预测”看各距离的推算成绩。",
      ],
      faqs: [
        {
          q: "比赛预测公式来自哪里?",
          a: "来自研究工程师 Peter Riegel,他于 1977 年在《Runner's World》发表了 T₂ = T₁ × (D₂/D₁)^1.06。指数 1.06 刻画了配速随距离的衰减:距离翻倍,用时大约多出 9%。它的前提是你为目标距离做过针对性训练——只跑过短距离的人无法用它推算马拉松。",
        },
        {
          q: "为什么距离越长,预测的每公里配速越慢?",
          a: "这正是公式在起作用。1.06 的指数意味着距离每翻倍,除了按比例增加的时间外还要多付约 6%,对应糖原耗尽、补给与疲劳的影响。反向预测(用半马推 10 公里)每公里配速会更快,原因相同。",
        },
        {
          q: "支持英里吗?",
          a: "支持。自定义距离可选公里或英里,结果同时给出每公里与每英里配速、公里/小时与英里/小时两种速度。换算使用国际英里的精确定义 1.609344 公里。",
        },
      ],
    },
    ja: {
      name: "ペース計算",
      tagline: "距離とタイムから 1 km・1 マイルのペースと速度を即算出。Peter Riegel の指数 1.06 の式で各レース距離の予測タイムも出せます。",
      intro: [
        "5 km・10 km・ハーフ・フル、または km/マイル単位のカスタム距離とフィニッシュタイムを入力すると、1 km あたりのペース、1 マイルあたりのペース、km/時・マイル/時の速度が一度に表示されます。ハーフ 2 時間なら 5:41/km、9:10/マイル、10.6 km/h となります。",
        "レース予測は Peter Riegel の持久力公式 T₂ = T₁ × (D₂/D₁)^1.06 を使用。実際のレース結果を 1 つ入れると、5 km からフルマラソンまで各標準距離の予測フィニッシュタイムを算出します。",
      ],
      steps: [
        "レース距離のプリセットを選ぶか、「カスタム」で km/マイルの距離を入力します。",
        "タイムを時・分・秒で入力します。",
        "1 km・1 マイルのペースと速度を確認します。「レース予測」に切り替えると各距離の予測タイムが見られます。",
      ],
      faqs: [
        {
          q: "レース予測の式はどこから来たものですか?",
          a: "研究エンジニアの Peter Riegel が 1977 年に Runner's World 誌で発表した T₂ = T₁ × (D₂/D₁)^1.06 です。指数 1.06 は距離に伴うペースの低下を表し、距離が倍になると所要時間は約 9% 多くなります。対象距離に向けて練習していることが前提で、スピード重視の 5 km だけではフルマラソンは予測できません。",
        },
        {
          q: "長いレースほど 1 km の予測ペースが遅くなるのはなぜですか?",
          a: "式が機能している証拠です。指数 1.06 は、距離が倍になるごとに比例分より約 6% 余分に時間がかかることを意味し、グリコーゲンの枯渇・補給・疲労を反映します。逆にハーフから 10 km を予測すると同じ理由で速くなります。",
        },
        {
          q: "マイルにも対応していますか?",
          a: "はい。カスタム距離は km とマイルのどちらでも入力でき、結果は常に 1 km と 1 マイル両方のペース、km/時とマイル/時両方の速度で表示されます。換算には国際マイルの正確な定義 1.609344 km を使います。",
        },
      ],
    },
    es: {
      name: "Calculadora de ritmo",
      tagline: "Calcule su ritmo por km y por milla a partir de cualquier distancia y tiempo, y prediga marcas con la fórmula de Peter Riegel de exponente 1.06.",
      intro: [
        "Elija 5K, 10K, media maratón, maratón o una distancia personalizada en kilómetros o millas, introduzca su tiempo de llegada y vea a la vez el ritmo por kilómetro, por milla y la velocidad en km/h y mph. Una media en 2:00 sale como 5:41/km, 9:10/milla y 10,6 km/h.",
        "El predictor de carreras aplica la fórmula de resistencia de Peter Riegel T₂ = T₁ × (D₂/D₁)^1.06: con un único resultado honesto proyecta su llegada esperada en cada distancia estándar, del 5K al maratón.",
      ],
      steps: [
        "Elija una distancia predefinida, o Personalizada e introduzca cualquier distancia en km o millas.",
        "Escriba su tiempo en horas, minutos y segundos.",
        "Lea el ritmo por km, por milla y ambas velocidades, o cambie a Predicción de carrera para ver tiempos proyectados.",
      ],
      faqs: [
        {
          q: "¿De dónde sale la fórmula de predicción?",
          a: "De Peter Riegel, ingeniero de investigación que publicó T₂ = T₁ × (D₂/D₁)^1.06 en Runner's World en 1977. El exponente 1.06 recoge cómo se degrada el ritmo con la distancia: duplicar la distancia cuesta un 9 % más de tiempo. Supone un entrenamiento específico para la distancia objetivo: no predice un maratón a partir de un 5K rápido.",
        },
        {
          q: "¿Por qué el ritmo previsto por km es más lento en distancias largas?",
          a: "Porque la fórmula funciona: el exponente 1.06 añade cerca de un 6 % extra cada vez que se duplica la distancia, reflejando la depleción de glucógeno, la nutrición y la fatiga. Por el mismo motivo, predecir un 10K desde una media da un ritmo por km más rápido.",
        },
        {
          q: "¿Funciona con millas además de kilómetros?",
          a: "Sí. Las distancias personalizadas aceptan ambas unidades y los resultados se muestran siempre en los dos sistemas: ritmo por km y por milla, velocidad en km/h y mph. La conversión usa la milla internacional exacta de 1,609344 km.",
        },
      ],
    },
    pt: {
      name: "Calculadora de ritmo",
      tagline: "Calcule o ritmo por km e por milha a partir de qualquer distância e tempo, e preveja marcas com a fórmula de Peter Riegel de expoente 1.06.",
      intro: [
        "Escolha 5K, 10K, meia maratona, maratona ou uma distância personalizada em quilômetros ou milhas, informe o tempo de chegada e veja de uma vez o ritmo por quilômetro, por milha e a velocidade em km/h e mph. Uma meia em 2:00 aparece como 5:41/km, 9:10/milha e 10,6 km/h.",
        "O previsor de provas aplica a fórmula de resistência de Peter Riegel T₂ = T₁ × (D₂/D₁)^1.06: com um único resultado honesto, ela projeta sua chegada esperada em cada distância padrão, dos 5K à maratona.",
      ],
      steps: [
        "Escolha uma distância predefinida, ou Personalizada e digite qualquer distância em km ou milhas.",
        "Digite seu tempo em horas, minutos e segundos.",
        "Leia o ritmo por km, por milha e as duas velocidades — ou mude para Previsão de prova para tempos projetados.",
      ],
      faqs: [
        {
          q: "De onde vem a fórmula de previsão?",
          a: "De Peter Riegel, engenheiro de pesquisa que publicou T₂ = T₁ × (D₂/D₁)^1.06 na Runner's World em 1977. O expoente 1.06 captura como o ritmo cai com a distância: dobrar a distância custa cerca de 9% mais tempo. Pressupõe treino específico para a distância alvo — não prevê uma maratona a partir de um 5K rápido.",
        },
        {
          q: "Por que o ritmo previsto por km fica mais lento em provas longas?",
          a: "Porque é assim que a fórmula funciona: o expoente 1.06 acrescenta cerca de 6% extra a cada duplicação da distância, refletindo a depleção de glicogênio, a alimentação e a fadiga. Pelo mesmo motivo, prever um 10K a partir de uma meia dá um ritmo por km mais rápido.",
        },
        {
          q: "Funciona com milhas além de quilômetros?",
          a: "Sim. Distâncias personalizadas aceitam as duas unidades e os resultados aparecem sempre nos dois sistemas: ritmo por km e por milha, velocidade em km/h e mph. A conversão usa a milha internacional exata de 1,609344 km.",
        },
      ],
    },
  },
});
