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
      deepDive: [
        {
          heading: "The arithmetic of pace — and Riegel's 1.06",
          paragraphs: [
            "Pace itself is simple division: time over distance, displayed per kilometer and per mile from the same input, with the conversions computed exactly (one international mile = 1.609344 km). A 45:00 10K is 4:30/km and 7:14/mile — no rounding games, no mental math at the track.",
            "The race predictor is the interesting half. Peter Riegel, a research engineer, published T₂ = T₁ × (D₂/D₁)^1.06 in Runner's World in 1977 after analyzing hundreds of recorded race results. The exponent 1.06 captures the fade of pace with distance: doubling the race distance takes about 9% longer than double the time would suggest.",
            "That exponent is a population average fitted to real finishers, not physiology. It assumes proper training for the target distance — it extrapolates what trained runners did, and it will happily extrapolate nonsense for someone who never ran long.",
          ],
        },
        {
          heading: "Interpreting the predictions",
          paragraphs: [
            "Predictions degrade with distance from your input race. Projecting a 10K from a half marathon is usually close; projecting a marathon from a 5K is a fantasy unless the long runs exist in training. The longer the gap, the more the projection assumes about your endurance base.",
            "Use the predictions for pacing plans rather than promises: a sub-2:00 half marathon needs about 5:41/km, and seeing what that implies for a full marathon tells you whether the goal is realistic this season or needs another training cycle.",
            "A practical check: if you have raced two distances recently, you can verify the formula against yourself — when your own ratio deviates from 1.06, your strength or weakness at that distance is showing, and that is useful coaching information.",
          ],
        },
        {
          heading: "Where real-world data lies",
          paragraphs: [
            "GPS watches accumulate drift: tree cover, tall buildings and tight turns can distort a recorded course by a percent or more, enough to shift displayed pace by seconds per kilometer. Treadmills are worse — most are optimistic unless calibrated, and even calibrated ones differ from outdoor running biomechanically.",
            "Race courses themselves vary: elevation profile, turns, weather and crowding at the start line all move finish times by minutes. Comparing a hilly trail 10K against a flat road 10K as if they were the same number will poison any prediction.",
            "So the workflow is: enter race results, not training runs; prefer flat, certified courses; and treat the most recent result as the anchor. This page runs entirely in your browser — your times never leave the device.",
          ],
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
      deepDive: [
        {
          heading: "配速的算术——以及 Riegel 的 1.06",
          paragraphs: [
            "配速本身是简单除法:时间除以距离,同一份输入同时给出每公里和每英里配速,换算精确进行(1 英里 = 1.609344 公里)。45:00 的十公里就是 4:30/公里、7:14/英里——不用四舍五入糊弄,也不用跑道上心算。",
            "比赛预测器才是有趣的一半。研究工程师 Peter Riegel 在分析了数百个真实完赛成绩后,于 1977 年在《Runner's World》发表了 T₂ = T₁ × (D₂/D₁)^1.06。指数 1.06 刻画了配速随距离的衰减:距离翻倍,完赛时间大约比“翻倍”再多 9%。",
            "这个指数是对真实完赛者拟合的人群平均,不是生理学定律。它假设你针对目标距离做了训练——它外推的是认真训练者的成绩;对从没跑过长距离的人,它会一本正经地外推出荒谬结果。",
          ],
        },
        {
          heading: "预测结果怎么用",
          paragraphs: [
            "离输入的比赛越远,预测越不可靠。用半马预测十公里通常相当准;用五公里预测马拉松就是想入非非,除非长距离课真的在训练计划里。跨度越大,预测对耐力底子的假设就越多。",
            "把预测当配速方案而不是承诺:半马破二需要约 5:41/公里,再看看这意味着全马什么水平,你就能判断这个目标是本赛季现实,还是需要再一个训练周期。",
            "一个实用校验:如果你最近跑过两个距离,可以用自己验证公式——当你本人的比值偏离 1.06 时,说明你在这个距离上有长板或短板,这是很有价值的训练信息。",
          ],
        },
        {
          heading: "真实世界的数据会撒谎",
          paragraphs: [
            "GPS 手表会累计漂移:树荫、高楼和急弯能让记录的路线偏差百分之一以上,足以让显示配速偏移每公里数秒。跑步机更糟——不校准时几乎一律偏乐观,即使校准过,跑姿也与户外不同。",
            "赛道本身就千差万别:爬升、转弯、天气和起跑的拥挤都能让完赛时间相差几分钟。把山径十公里和公路十公里当成同一个数字来比,会污染任何预测。",
            "所以正确的输入是:用比赛成绩,不用训练数据;优先选平路、经认证的赛道;用最近一次成绩做锚点。本页完全在你的浏览器内运行,成绩不会离开你的设备。",
          ],
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
      deepDive: [
        {
          heading: "ペースの算数と Riegel の 1.06",
          paragraphs: [
            "ペース自体は単純な割り算です:時間 ÷ 距離。同じ入力から 1 km あたりと 1 マイルあたりの両方を、正確な換算(1 マイル = 1.609344 km)で表示します。45:00 の 10 km なら 4:30/km、7:14/マイル——四捨五入のごまかしも、トラックでの暗算も不要です。",
            "興味の中心はレース予測のほう。研究エンジニアだった Peter Riegel は、数百件の実際のレース結果を分析し、1977 年に Runner's World 誌で T₂ = T₁ × (D₂/D₁)^1.06 を発表しました。指数 1.06 は距離に伴うペースの落ち方を捉えます:距離が2倍になると、所要時間は単純な2倍より約 9% 長い。",
            "この指数は実在の完走者にフィットさせた集団平均であって、生理学の法則ではありません。対象距離向けの練習を前提とします——真面目に練習した走者の実績を外挿する式であり、ロングを一度も走っていない人には堂々と無意味な値を外挿します。",
          ],
        },
        {
          heading: "予測の読み方",
          paragraphs: [
            "入力したレースから離れるほど予測は粗くなります。ハーフからの 10 km 予測はかなり当てになりますが、5 km からのマラソン予測は、ロング走が練習に存在しない限り空想です。距離の隔たりが大きいほど、予測は持久ベースへの仮定を多く含みます。",
            "予測は約束ではなくペース配分の道具として:サブ2のハーフには約 5:41/km が必要で、それがフルでは何を意味するかを見れば、目標が今シーズン現実的か、もう1サイクル練習が要るかが分かります。",
            "実用的な検証:直近に2つの距離を走っていれば、自分を式に照らせます。あなた自身の比が 1.06 からずれるとき、その距離での強みか弱みが顔を出しています。これは貴重なコーチング情報です。",
          ],
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
      deepDive: [
        {
          heading: "La aritmética del ritmo — y el 1.06 de Riegel",
          paragraphs: [
            "El ritmo en sí es una división: tiempo sobre distancia, mostrado por kilómetro y por milla desde la misma entrada, con conversiones exactas (una milla internacional = 1,609344 km). Un 10K en 45:00 son 4:30/km y 7:14/milla — sin juegos de redondeo ni cálculos mentales en la pista.",
            "El predictor de carreras es la mitad interesante. Peter Riegel, ingeniero de investigación, publicó T₂ = T₁ × (D₂/D₁)^1.06 en Runner's World en 1977 tras analizar cientos de resultados reales. El exponente 1.06 captura el desgaste del ritmo con la distancia: duplicar la distancia cuesta un 9 % más que el doble del tiempo.",
            "Ese exponente es un promedio poblacional ajustado a corredores reales, no fisiología. Asume entrenamiento específico para la distancia objetivo — extrapola lo que hicieron corredores preparados, y extrapolará sin pudor un disparate para quien nunca corrió largo.",
          ],
        },
        {
          heading: "Cómo interpretar las predicciones",
          paragraphs: [
            "Las predicciones pierden fiabilidad al alejarse de tu carrera de referencia. Predecir un 10K desde un medio maratón suele acertar; predecir un maratón desde un 5K es fantasía, salvo que los rodajes largos existan en tu plan. Cuanto mayor la distancia entre ambas, más supone la predicción sobre tu base de resistencia.",
            "Úsalas para planes de ritmo, no como promesas: un medio maratón bajo 2:00 exige unos 5:41/km, y ver qué implica eso para un maratón completo te dice si el objetivo es realista esta temporada o necesita otro ciclo de entrenamiento.",
            "Una comprobación práctica: si has corrido dos distancias recientemente, contrástate con la fórmula — cuando tu propia razón se desvía de 1.06, está asomando una fortaleza o debilidad en esa distancia, y eso es información útil de entrenamiento.",
          ],
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
      deepDive: [
        {
          heading: "A aritmética do ritmo — e o 1.06 de Riegel",
          paragraphs: [
            "O ritmo em si é uma divisão: tempo sobre distância, exibido por quilômetro e por milha a partir da mesma entrada, com conversões exatas (uma milha internacional = 1,609344 km). Um 10K em 45:00 são 4:30/km e 7:14/milha — sem truques de arredondamento nem contas de cabeça na pista.",
            "O preditor de provas é a metade interessante. Peter Riegel, engenheiro de pesquisa, publicou T₂ = T₁ × (D₂/D₁)^1.06 na Runner's World em 1977 após analisar centenas de resultados reais de provas. O expoente 1.06 captura a queda do ritmo com a distância: dobrar a distância custa cerca de 9 % a mais que o dobro do tempo.",
            "Esse expoente é uma média populacional ajustada a corredores reais, não fisiologia. Ele assume treino específico para a distância alvo — extrapola o que corredores preparados fizeram, e extrapolará sem cerimônia um absurdo para quem nunca correu longe.",
          ],
        },
        {
          heading: "Como interpretar as previsões",
          paragraphs: [
            "As previsões perdem precisão ao se afastar da prova de referência. Prever um 10K a partir de uma meia maratona costuma acertar; prever uma maratona a partir de um 5K é fantasia, a menos que os treinos longos existam no plano. Quanto maior a distância entre as provas, mais a previsão assume sobre sua base de resistência.",
            "Use as previsões como plano de ritmo, não como promessa: uma meia maratona abaixo de 2:00 exige cerca de 5:41/km, e ver o que isso implica para uma maratona inteira mostra se a meta é realista nesta temporada ou pede mais um ciclo de treino.",
            "Uma verificação prática: se você correu duas distâncias recentemente, compare-se com a fórmula — quando sua própria razão desvia de 1.06, está aparecendo uma força ou fraqueza naquela distância, e isso é informação valiosa de treino.",
          ],
        },
      ],
    },
  },
});
