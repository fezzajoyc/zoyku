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
        "The max-HR regression 206.9 − 0.67 × age comes from Gellish and colleagues' 2007 re-analysis of laboratory-measured maxima; it runs a few bpm below the old 220 − age rule, especially past middle age. Zones then split the Karvonen heart-rate reserve — max minus resting — into Z1 recovery through Z5 VO2-max work at the classic 50/60/70/80/90% cutoffs.",
        "Compared with watch defaults that apply percentages to max alone, the reserve method keeps Z2 genuinely easy for people with low resting rates — the most common training mistake is riding too hard in easy zones. Formulas carry individual error of several bpm; if a lab test or an all-out 5K gives you a measured max, enter it manually and trust that number.",
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
      deepDive: [
        {
          heading: "Two formulas working together: Karvonen and max HR",
          paragraphs: [
            "The Karvonen method defines intensity as a percentage of your heart-rate reserve: bpm = resting HR + % × (max HR − resting HR). Scaling the reserve rather than the max is the whole point — a runner with a resting rate of 45 has a much larger trainable span than one at 70, and reserve-based zones respect that.",
            "Max heart rate itself is estimated here as 206.9 − 0.67 × age, a regression fitted to laboratory-measured maxima by Gellish and colleagues in 2007. The famous 220 − age rule traces to a rough 1970s convenience table and systematically overestimates max HR in older adults; modern regressions (Tanaka's 208 − 0.7 × age among them) fit the measured data far better.",
            "The zones then split the reserve at the classic cutoffs — Z1 at 50%, Z2 at 60%, Z3 at 70%, Z4 at 80%, Z5 at 90% — giving five bands from recovery running through threshold work to VO2-max intervals.",
          ],
        },
        {
          heading: "How to use each zone",
          paragraphs: [
            "The zones describe physiological intent, not speed. Z1-Z2 build aerobic base and should feel genuinely easy — most recreational runners train too hard here, which is why polarized training plans emphasize staying honest in easy zones. Z3 sits around comfortable steady effort; Z4 is threshold work you can sustain for roughly 20-60 minutes; Z5 is short, hard intervals near your ceiling.",
            "Check the numbers against a chest strap or a watch with optical HR during the first weeks. If your perceived effort says Z3 while the strap says Z2, trust effort and sleep and stress will explain the gap — heart rate drifts with fatigue, heat, altitude and hydration, day to day.",
            "Know your real max from a lab test or an all-out race finish? Enter it manually — a measured value always beats an equation, because individual maxima scatter by roughly ±10 bpm around any regression line.",
          ],
        },
        {
          heading: "Where the estimates break down",
          paragraphs: [
            "Beta-blockers and other rate-limiting medications flatten the whole model: they cap heart rate well below what any equation predicts, so zone training on these drugs should follow a clinician's or physiologist's guidance, not a calculator.",
            "The regression is also weaker at the extremes — very young athletes and adults well past seventy fall outside the data the equations were fitted on. And optical wrist sensors lag on intervals; for Z4-Z5 work a chest strap is worth it.",
            "Finally, resting HR needs to be measured, not guessed: take it in the morning before getting up, over several days. Using an inflated resting value compresses every zone downward and quietly makes your easy days too hard.",
          ],
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
      deepDive: [
        {
          heading: "两个公式如何配合:Karvonen 与最大心率",
          paragraphs: [
            "Karvonen 法把强度定义为心率储备的百分比:目标心率 = 静息心率 + 百分比 × (最大心率 − 静息心率)。按储备而非最大值缩放正是关键——静息 45 的跑者可训练区间远大于静息 70 的人,基于储备的分区尊重了这种差异。",
            "最大心率这里用 206.9 − 0.67 × 年龄估算,来自 Gellish 等人 2007 年对实验室实测最大心率的回归分析。著名的 220 − 年龄口诀源自七十年代一张粗糙的经验表,对中老年人系统性高估;现代回归式(包括 Tanaka 的 208 − 0.7 × 年龄)对实测数据拟合好得多。",
            "区间再按经典切点切分储备:Z1 从 50% 起、Z2 60%、Z3 70%、Z4 80%、Z5 90%,得到从恢复跑到阈值训练再到最大摄氧间歇的五个波段。",
          ],
        },
        {
          heading: "每个区间怎么用",
          paragraphs: [
            "区间描述的是生理意图,不是速度。Z1–Z2 打有氧底子,体感应该是真轻松——多数业余跑者在这里练得太狠,这正是极化训练计划反复强调“易区别膨胀”的原因。Z3 是舒适的稳态强度;Z4 是大约能维持 20–60 分钟的阈值强度;Z5 是接近上限的短间歇。",
            "头几周用心率带或光电手表核对数字。如果体感是 Z3 而表显 Z2,信体感——疲劳、炎热、海拔和脱水都会让心率漂移,日常波动是常态。",
            "如果通过实验室测试或拼尽全力的比赛知道真实最大心率,手动填入——实测值永远优于公式,因为任何回归线周围的个体离散约 ±10 次/分。",
          ],
        },
        {
          heading: "估算什么时候会失灵",
          paragraphs: [
            "β 受体阻滞剂等减慢心率的药物会颠覆整套模型:它们把心率压到任何公式预测值之下,服用这类药物时,心率训练应遵医嘱或运动生理师的指导,而不是计算器。",
            "回归式在两端也较弱——青少年运动员和七十几岁的成年人落在拟合数据之外。另外,腕式光电传感器在间歇训练时会滞后,练 Z4–Z5 值得配一条心率带。",
            "最后,静息心率要实测,不要猜:起床前在床上测,连测几天取平均。填一个虚高的静息值会把所有区间整体压低,悄悄让轻松日变得太辛苦。",
          ],
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
      deepDive: [
        {
          heading: "2つの式の連携:Karvonen 法と最大心拍数",
          paragraphs: [
            "Karvonen 法は強度を心拍数リザーブの割合で定義します:目標心拍 = 安静時心拍 + % × (最大心拍 − 安静時心拍)。最大値ではなくリザーブを基準にする点が本質です。安静時 45 のランナーは安静時 70 の人より大きな可変幅を持ち、リザーブ基準のゾーンはその違いを尊重します。",
            "最大心拍は 206.9 − 0.67 × 年齢で推定。これは Gellish らが 2007 年に実測データへ回帰させた式です。有名な「220 − 年齢」は 1970 年代の簡易表に由来し、高齢者で系統的に過大評価します。現代の回帰式(Tanaka の 208 − 0.7 × 年齢など)の方が実測に適合します。",
            "ゾーンは定番の切り目で分割:Z1 が 50%、Z2 が 60%、Z3 が 70%、Z4 が 80%、Z5 が 90% から。リカバリーランから閾値トレーニング、VO2max インターバルまでの5帯域です。",
          ],
        },
        {
          heading: "各ゾーンの使い方",
          paragraphs: [
            "ゾーンが示すのは生理学的な意図であって速度ではありません。Z1–Z2 は有酸素ベースを作る帯域で、体感は本当に楽であるべき。多くの市民ランナーはここで強度を上げすぎます。Z3 は快適な定常強度、Z4 は約 20〜60 分保てる閾値域、Z5 は上限付近の短いインターバルです。",
            "最初の数週間は胸ストラップや光センサー時計で数字を照合しましょう。体感が Z3 なのに計測が Z2 なら体感を優先——疲労・暑さ・標高・水分状態で心拍は日々動きます。",
            "ラボテストや全力のレースで実測の最大心拍を知っているなら手動入力を。実測値は常に式に勝ります。どの回帰式でも個体差は ±10 bpm 程度あります。",
          ],
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
      deepDive: [
        {
          heading: "Dos fórmulas trabajando juntas: Karvonen y FC máxima",
          paragraphs: [
            "El método Karvonen define la intensidad como porcentaje de tu reserva de frecuencia cardíaca: bpm = FC reposo + % × (FC máx − FC reposo). Escalar la reserva y no el máximo es la clave: un corredor con reposo de 45 tiene un margen entrenable mucho mayor que uno con 70, y las zonas basadas en la reserva lo respetan.",
            "La FC máxima se estima aquí como 206.9 − 0.67 × edad, una regresión ajustada a máximos medidos en laboratorio por Gellish y colaboradores en 2007. La famosa regla de 220 − edad proviene de una tabla aproximada de los años setenta y sobreestima la FC máxima en adultos mayores; las regresiones modernas (incluida la de Tanaka, 208 − 0.7 × edad) se ajustan mucho mejor.",
            "Las zonas dividen la reserva en los cortes clásicos — Z1 al 50 %, Z2 al 60 %, Z3 al 70 %, Z4 al 80 %, Z5 al 90 % — dando cinco bandas desde carrera de recuperación hasta series a VO2 máx.",
          ],
        },
        {
          heading: "Cómo usar cada zona",
          paragraphs: [
            "Las zonas describen intención fisiológica, no velocidad. Z1-Z2 construyen base aeróbica y deben sentirse genuinamente fáciles — la mayoría de corredores aficionados entrenan demasiado duro aquí, y de ahí que los planes polarizados insistan en ser honestos en las zonas suaves. Z3 es esfuerzo constante cómodo; Z4 es trabajo al umbral sostenible unos 20-60 minutos; Z5 son series cortas cerca del techo.",
            "Contrasta las cifras con una banda de pecho o un reloj óptico las primeras semanas. Si la sensación dice Z3 y el pulsómetro dice Z2, confía en la sensación: la fatiga, el calor, la altitud y la hidratación mueven la frecuencia cardíaca cada día.",
            "¿Conoces tu máximo real por una prueba de laboratorio o una carrera a fondo? Introdúcelo manualmente — un valor medido siempre gana, porque los máximos individuales se dispersan unos ±10 ppm alrededor de cualquier regresión.",
          ],
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
      deepDive: [
        {
          heading: "Duas fórmulas trabalhando juntas: Karvonen e FC máxima",
          paragraphs: [
            "O método Karvonen define a intensidade como porcentagem da sua reserva cardíaca: bpm = FC repouso + % × (FC máx − FC repouso). Escalar a reserva em vez do máximo é o ponto central: um corredor com repouso de 45 tem uma margem treinável muito maior que um com 70, e as zonas baseadas na reserva respeitam isso.",
            "A FC máxima é estimada aqui como 206.9 − 0.67 × idade, uma regressão ajustada a máximos medidos em laboratório por Gellish e colegas em 2007. A famosa regra de 220 − idade vem de uma tabela aproximada dos anos 1970 e superestima a FC máxima em adultos mais velhos; regressões modernas (incluindo a de Tanaka, 208 − 0.7 × idade) se ajustam muito melhor.",
            "As zonas dividem a reserva nos cortes clássicos — Z1 a 50 %, Z2 a 60 %, Z3 a 70 %, Z4 a 80 %, Z5 a 90 % — criando cinco faixas, da corrida de recuperação às séries no VO2 máx.",
          ],
        },
        {
          heading: "Como usar cada zona",
          paragraphs: [
            "As zonas descrevem intenção fisiológica, não velocidade. Z1-Z2 constroem a base aeróbica e devem parecer genuinamente fáceis — a maioria dos corredores amadores treina duro demais aqui, e é por isso que planos polarizados insistem em honestidade nas zonas leves. Z3 é esforço constante confortável; Z4 é trabalho de limiar sustentável por 20-60 minutos; Z5 são séries curtas perto do teto.",
            "Confira os números com uma faixa peitoral ou relógio óptico nas primeiras semanas. Se a sensação diz Z3 e o monitor diz Z2, confie na sensação: fadiga, calor, altitude e hidratação movem a frequência cardíaca todos os dias.",
            "Conhece seu máximo real por teste de laboratório ou prova em esforço total? Digite manualmente — um valor medido sempre vence, porque os máximos individuais se espalham cerca de ±10 bpm ao redor de qualquer regressão.",
          ],
        },
      ],
    },
  },
});
