import { CalcEngineHeartRate } from "../_engines/calc-engine-heart-rate";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "heart-rate-zones-calculator",
  category: "utility",
  icon: "sparkle",
  engine: { component: CalcEngineHeartRate },
  related: ["pace-calculator", "one-rep-max-calculator", "bmr-calculator", "sleep-calculator", "water-intake-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator"],
  copy: {
    en: {
      name: "Heart Rate Zones Calculator",
      tagline: "Turn max and resting heart rate into five training zones with the Karvonen method — warm-up, fat burn, aerobic, anaerobic and VO₂ max, in bpm.",
      intro: [
        "Enter your age and resting heart rate and the calculator estimates your max heart rate (206.9 − 0.67 × age, a regression from lab-measured maxima), then slices the span between resting and max into the five classic training zones. A 30-year-old with a resting rate of 60 bpm gets a max near 187 bpm and a Z3 aerobic band of about 149–161 bpm — real numbers you can hold against a chest strap or watch.",
        "Zones are computed with the Karvonen heart-rate-reserve method: bpm = resting + % × (max − resting). Because the reserve — not the max — is scaled, the zones stay honest for people whose resting rate is unusually low or high. Know your measured max from a lab test or a hard race? Switch to manual and enter it directly.",
      ],
      steps: [
        "Enter your age to estimate max heart rate, or switch to Manual and type a measured value.",
        "Enter your resting heart rate — the morning reading before you get up is best.",
        "Read the five zones with their % of reserve and bpm range.",
        "Match your watch or chest strap during workouts to the zone you are targeting.",
      ],
      faqs: [
        {
          q: "Is 206.9 − 0.67 × age more accurate than 220 − age?",
          a: "Yes, at the population level. The old 220 − age rule traces back to an unreviewed 1970s table and overestimates max heart rate for older adults. Modern regressions fitted to lab-measured maxima — Tanaka's 208 − 0.7 × age, Gellish's 207 − 0.7 × age, and similar equations like the 206.9 − 0.67 × age used here — track real maxima far better across ages. But any equation still carries an individual spread of roughly ±10 bpm: the estimate is a starting point, and a max measured in a lab or a truly all-out effort always wins.",
        },
        {
          q: "Why does the calculator use heart-rate reserve (HRR) instead of a percentage of max heart rate?",
          a: "The Karvonen method measures intensity from the span between your resting and maximal heart rate, which is the part that actually does the work. Using % of max directly puts a 60–70% zone at 112–131 bpm for the 30-year-old example above; using % of reserve puts it at 136–149 bpm. Physiologically, effort scales with how much reserve you are using, so reserve-based zones line up better with ventilatory thresholds and perceived effort — especially for people with low resting heart rates.",
        },
        {
          q: "How do I measure my resting heart rate?",
          a: "Take it in the morning, right after waking and before getting out of bed: count your pulse for 60 seconds (or 30 seconds × 2), and repeat for a few days to average out noise. A wearable's 7-day resting figure works too. Typical adults land between 60 and 80 bpm; well-trained endurance athletes often sit in the 40s or 50s. If your resting rate is above your max estimate — or medication such as beta-blockers affects your heart rate — enter both numbers manually.",
        },
      ],
    },
    zh: {
      name: "心率区间计算器",
      tagline: "用 Karvonen 储备心率法把最大心率与静息心率切成五个训练区——热身、燃脂、有氧、无氧、最大摄氧,直接给出每区 bpm 范围。",
      intro: [
        "输入年龄和静息心率,计算器先用回归公式(206.9 − 0.67 × 年龄,来自实验室实测最大心率)估算最大心率,再把静息到最大之间的跨度切成经典五区。30 岁、静息 60 的人最大心率约 187 bpm,Z3 有氧区约 149–161 bpm——是能直接对照心率带或运动手表的真实数字。",
        "区间按 Karvonen 储备心率法计算:心率 = 静息 + 百分比 × (最大 − 静息)。缩放的是储备而不是最大心率,静息偏低或偏高的人得到的区间才不失真。如果你做过心肺测试或顶过全力测试、知道实测最大心率,切到“手动输入”直接填。",
      ],
      steps: [
        "输入年龄估算最大心率,或切换到“手动输入”填写实测值。",
        "输入静息心率——早晨起床前测的数值最准。",
        "查看五个区间各自占储备的百分比和 bpm 范围。",
        "训练时把手表或心率带的读数对准目标区间。",
      ],
      faqs: [
        {
          q: "206.9 − 0.67 × 年龄 比 220 − 年龄 更准吗?",
          a: "在人群层面是的。老的“220 − 年龄”源自 1970 年代一份未经同行评审的表格,对中老年人的最大心率明显高估。拟合自实验室实测数据的现代回归式——Tanaka 的 208 − 0.7 × 年龄、Gellish 的 207 − 0.7 × 年龄,以及本工具用的同类式 206.9 − 0.67 × 年龄——在各年龄段都贴合实测得多。但任何公式都带约 ±10 bpm 的个体差异:估算只是起点,实验室实测或真正竭尽全力的测试永远优先。",
        },
        {
          q: "为什么用储备心率(HRR)而不是最大心率的百分比?",
          a: "Karvonen 法度量的是“你动用了多少储备”,这才是真正做功的部分。以上面 30 岁的例子,直接按最大心率的 60–70% 算是 112–131 bpm;按储备的 60–70% 算是 136–149 bpm。生理上强度随储备动用量上升,所以储备法划出的区间与通气阈、体感更吻合——静息心率偏低的人尤其明显。",
        },
        {
          q: "静息心率怎么测?",
          a: "早晨醒来、起床之前测:数 60 秒脉搏(或数 30 秒 × 2),连测几天取平均以消除波动。可穿戴设备给出的 7 天静息值也可以。普通成年人多在 60–80 bpm,耐力训练有素者常在 40–50 多。如果静息值高过最大心率估算,或在服用 β 受体阻滞剂等影响心率的药物,请改用手动输入两个数值。",
        },
      ],
    },
    ja: {
      name: "心拍数ゾーン計算",
      tagline: "最大心拍数と安静時心拍数から Karvonen 法で 5 つのトレーニングゾーンを算出。ウォームアップから最大酸素摂取量まで bpm の範囲で表示します。",
      intro: [
        "年齢と安静時心拍数を入力すると、回帰式(206.9 − 0.67 × 年齢、実測データに基づく)で最大心拍数を推定し、安静時から最大までの幅を定番の 5 ゾーンに分割します。30 歳で安静時 60 bpm なら最大心拍数は約 187 bpm、Z3 有酸素ゾーンは約 149〜161 bpm。心拍ストラップやウォッチと直接照合できる数字です。",
        "ゾーンは Karvonen の心拍数予備能法で計算します:心拍数 = 安静時 + 割合 × (最大 − 安静時)。最大値ではなく予備能を振り分けるため、安静時が低くても高くてもゾーンが歪みません。負荷テストや全力走で実測した最大心拍数があれば、「手入力」タブから直接入力できます。",
      ],
      steps: [
        "年齢を入力して最大心拍数を推定するか、「手入力」で実測値を入力します。",
        "安静時心拍数を入力します。起床直前の朝の測定が最も確実です。",
        "5 つのゾーンの予備能に対する割合と bpm の範囲を確認します。",
        "ワークアウト中、ウォッチやストラップの数値を目標ゾーンに合わせます。",
      ],
      faqs: [
        {
          q: "206.9 − 0.67 × 年齢は「220 − 年齢」より正確ですか?",
          a: "集団レベルでは Yes です。古い「220 − 年齢」は 1970 年代の査読されていない表が起源で、高齢者の最大心拍数を過大評価します。実測データに fitting した現代の回帰式——Tanaka の 208 − 0.7 × 年齢、Gellish の 207 − 0.7 × 年齢、そして本ツールの 206.9 − 0.67 × 年齢——ははるかに実測に沿います。ただしどの式も個体差 ±10 bpm 程度あります。推定は出発点であり、実測が常に優先です。",
        },
        {
          q: "最大心拍数に対する%ではなく、予備能(HRR)を使うのはなぜですか?",
          a: "Karvonen 法は「予備能をどれだけ使ったか」という本当に働きのある部分で強度を測ります。30 歳の例で、最大心拍数の 60〜70% だと 112〜131 bpm、予備能の 60〜70% だと 136〜149 bpm になります。生理的には強度は予備能の使用率に伴うため、予備能ベースのゾーンは換気阈や主観的強度とよく一致します。安静時心拍数が低い人ほどその差は大きく出ます。",
        },
        {
          q: "安静時心拍数はどう測ればいいですか?",
          a: "朝、目覚めて起き上がる前に測ります。脈を 60 秒(または 30 秒 × 2)数え、数日続けて平均を取ります。ウェアラブルの 7 日間安静時値でも構いません。一般成人は 60〜80 bpm、鍛えた持久系アスリートは 40〜50 台がよくあります。安静時が推定最大心拍数を上回る場合や、β 遮断薬など心拍数に影響する薬を飲んでいる場合は、両方の値を手入力してください。",
        },
      ],
    },
    es: {
      name: "Calculadora de zonas de frecuencia cardíaca",
      tagline: "Convierta su FC máxima y en reposo en cinco zonas de entrenamiento con el método Karvonen: calentamiento, quemagrasas, aeróbica, anaeróbica y VO₂ máx., en lpm.",
      intro: [
        "Introduzca su edad y su frecuencia cardíaca en reposo, y la calculadora estima su FC máxima (206.9 − 0.67 × edad, una regresión sobre máximas medidas en laboratorio) y reparte el tramo entre reposo y máxima en las cinco zonas clásicas. Una persona de 30 años con 60 lpm en reposo obtiene una máxima cercana a 187 lpm y una banda Z3 aeróbica de unos 149–161 lpm: números reales que puede contrastar con una banda pectoral o un reloj.",
        "Las zonas se calculan con el método de reserva cardíaca de Karvonen: lpm = reposo + % × (máx − reposo). Como se escala la reserva —no la máxima—, las zonas siguen siendo honestas para quienes tienen un reposo inusualmente bajo o alto. ¿Conoce su máxima medida en una prueba de esfuerzo? Pase al modo manual e introdúzcala directamente.",
      ],
      steps: [
        "Introduzca su edad para estimar la FC máxima, o cambie a Manual y escriba un valor medido.",
        "Introduzca su FC en reposo: la lectura matutina antes de levantarse es la mejor.",
        "Lea las cinco zonas con su % de reserva y su rango en lpm.",
        "Compare su reloj o banda pectoral durante el entrenamiento con la zona objetivo.",
      ],
      faqs: [
        {
          q: "¿Es 206.9 − 0.67 × edad más precisa que 220 − edad?",
          a: "A nivel de población, sí. La vieja regla de 220 − edad procede de una tabla sin revisión de los años setenta y sobreestima la FC máxima en adultos mayores. Las regresiones modernas ajustadas a máximas medidas en laboratorio —el 208 − 0.7 × edad de Tanaka, el 207 − 0.7 × edad de Gellish y ecuaciones similares como la 206.9 − 0.67 × edad usada aquí— siguen mucho mejor los valores reales a cualquier edad. Toda ecuación conserva una dispersión individual de ±10 lpm: la estimación es un punto de partida, y una máxima medida en laboratorio o en un esfuerzo verdaderamente total siempre gana.",
        },
        {
          q: "¿Por qué usa la reserva cardíaca (HRR) y no un porcentaje de la FC máxima?",
          a: "El método Karvonen mide la intensidad según el tramo entre su FC en reposo y la máxima, que es la parte que realmente trabaja. Con % de la máxima, la zona 60–70 % daría 112–131 lpm en el ejemplo de 30 años; con % de la reserva, 136–149 lpm. Fisiológicamente el esfuerzo escala con la reserva utilizada, así que las zonas por reserva se alinean mejor con los umbrales ventilatorios y la sensación de esfuerzo, sobre todo con reposos bajos.",
        },
        {
          q: "¿Cómo mido mi frecuencia en reposo?",
          a: "Tómela por la mañana, al despertar y antes de levantarse: cuente el pulso 60 segundos (o 30 × 2) y repita varios días para promediar. Sirve también el valor de reposo de 7 días de un wearable. Los adultos típicos quedan entre 60 y 80 lpm; los atletas de resistencia entrenados suelen estar en los 40 o 50. Si su reposo supera su máxima estimada, o toma medicamentos como betabloqueantes, introduzca ambos valores a mano.",
        },
      ],
    },
    pt: {
      name: "Calculadora de zonas de frequência cardíaca",
      tagline: "Transforme a FC máxima e de repouso em cinco zonas de treino pelo método de Karvonen — aquecimento, queima de gordura, aeróbica, anaeróbica e VO₂ máx., em bpm.",
      intro: [
        "Informe sua idade e frequência cardíaca de repouso, e a calculadora estima sua FC máxima (206.9 − 0.67 × idade, uma regressão sobre máximas medidas em laboratório) e fatia o intervalo entre repouso e máxima nas cinco zonas clássicas. Uma pessoa de 30 anos com repouso de 60 bpm fica com máxima perto de 187 bpm e uma faixa Z3 aeróbica de cerca de 149–161 bpm — números reais para conferir com uma cinta peitoral ou um relógio.",
        "As zonas usam o método da reserva cardíaca de Karvonen: bpm = repouso + % × (máx − repouso). Como o que se escala é a reserva — não a máxima —, as zonas continuam honestas para quem tem repouso anormalmente baixo ou alto. Já sabe sua máxima medida em teste de esforço? Mude para o modo manual e digite o valor.",
      ],
      steps: [
        "Informe a idade para estimar a FC máxima, ou mude para Manual e digite um valor medido.",
        "Informe a FC de repouso: a leitura matinal, antes de levantar, é a melhor.",
        "Leia as cinco zonas com o % da reserva e a faixa em bpm.",
        "Compare o relógio ou a cinta peitoral durante o treino com a zona alvo.",
      ],
      faqs: [
        {
          q: "206.9 − 0.67 × idade é mais preciso que 220 − idade?",
          a: "Em nível de população, sim. A velha regra de 220 − idade vem de uma tabela sem revisão dos anos 1970 e superestima a FC máxima de pessoas mais velhas. As regressões modernas ajustadas a máximas medidas em laboratório — o 208 − 0.7 × idade de Tanaka, o 207 − 0.7 × idade de Gellish e equações semelhantes como a 206.9 − 0.67 × idade usada aqui — acompanham muito melhor os valores reais em qualquer idade. Qualquer equação ainda tem dispersão individual de ±10 bpm: a estimativa é ponto de partida, e uma máxima medida em laboratório ou num esforço de verdade sempre vence.",
        },
        {
          q: "Por que usar a reserva cardíaca (HRR) em vez de porcentagem da FC máxima?",
          a: "O método de Karvonen mede a intensidade pelo intervalo entre a FC de repouso e a máxima, que é a parte que realmente trabalha. Com % da máxima, a faixa de 60–70% daria 112–131 bpm no exemplo dos 30 anos; com % da reserva, 136–149 bpm. Fisiologicamente, o esforço escala com a reserva utilizada, então as zonas por reserva combinam melhor com os limiares ventilatórios e a percepção de esforço — principalmente com repousos baixos.",
        },
        {
          q: "Como medir minha frequência de repouso?",
          a: "Meça pela manhã, ao acordar e antes de se levantar: conte o pulso por 60 segundos (ou 30 × 2) e repita por alguns dias para tirar a média. O valor de repouso de 7 dias de um wearable também serve. Adultos típicos ficam entre 60 e 80 bpm; atletas de resistência treinados costumam ficar na casa dos 40 ou 50. Se seu repouso fica acima da máxima estimada, ou você usa medicamentos como betabloqueadores, informe os dois valores manualmente.",
        },
      ],
    },
  },
});
