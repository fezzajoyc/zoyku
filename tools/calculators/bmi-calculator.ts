import { CalcEngineBasic } from "../_engines/calc-engine-basic";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "bmi-calculator",
  category: "utility",
  icon: "check",
  engine: { component: CalcEngineBasic, props: { kind: "bmi" } },
  related: ["age-calculator", "percentage-calculator", "fuel-cost-calculator", "profit-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "calorie-calculator", "aspect-ratio-calculator"],
  copy: {
    en: {
      name: "BMI Calculator",
      tagline: "Calculate Body Mass Index from metric or imperial inputs and see exactly where the value lands in the official WHO weight categories.",
      intro: [
        "Enter height and weight in centimeters and kilograms, or feet, inches and pounds, and the calculator shows your Body Mass Index to one decimal together with the WHO category it falls into — underweight, normal, overweight or obesity — with the matching row highlighted in the reference table.",
        "The result updates as you type, so it is easy to see how a few kilograms move you between bands. BMI is a screening measure, not a diagnosis: it does not distinguish muscle from fat.",
        "BMI is calculated exactly as the WHO defines it: weight in kilograms divided by the square of height in meters (kg/m²), with no rounding until the final display. The standard thresholds apply — below 18.5 underweight, 18.5–24.9 normal, 25–29.9 overweight, 30 and above obesity.",
        "BMI is a screening measure, not a diagnosis: it does not distinguish muscle from fat, so athletes can read high and older adults low. Use it to track broad trends over time or to sanity-check a weight goal, and consult a healthcare professional before acting on the category alone.",],
      steps: [
        "Choose metric (cm + kg) or imperial (ft + in + lb) units.",
        "Type your height and weight.",
        "Read your BMI, its WHO category and the full reference table.",
      ],
      faqs: [
        {
          q: "What are the WHO BMI ranges?",
          a: "The World Health Organization defines: below 18.5 underweight, 18.5–24.9 normal weight, 25.0–29.9 overweight, and 30.0 and above obesity. The same cut-offs apply to adult men and women.",
        },
        {
          q: "How is BMI calculated?",
          a: "BMI is weight in kilograms divided by height in meters squared (kg/m²). For imperial units the tool converts feet, inches and pounds internally, so the result is identical either way.",
        },
        {
          q: "Why does BMI not fit athletes?",
          a: "Muscle is denser than fat, so very muscular people can score “overweight” while carrying little excess fat. Treat BMI as a quick population-level screen and combine it with waist measurement or body composition for a fuller picture.",
        },
      ],
      deepDive: [
        {
          heading: "What BMI can and cannot tell you",
          paragraphs: [
            "BMI earned its place in medicine because it is cheap, consistent and — across large populations — correlates reasonably well with body fat. It works best as a screening step: it flags who should get a closer look, not what the closer look finds. A muscular athlete at 6% body fat and a sedentary person at 35% can share a BMI of 27; the number is identical, the health picture is not.",
            "It also drifts at the edges of height. Very tall people read slightly high and very short people slightly low, because BMI scales weight with height squared while body volume does not scale that neatly. This is why some researchers prefer newer alternatives for individuals — but every large health organization still publishes thresholds in BMI terms, which keeps it the common language of weight screening.",
            "Treat the category as a starting point for a conversation, not a verdict. Trends matter more than single readings: the same method, same scale, same time of day, tracked over months tells you far more than one number ever will.",
          ],
        },
        {
          heading: "Where the thresholds come from",
          paragraphs: [
            "The 18.5 / 25 / 30 cutoffs are not natural constants — they are committee decisions with history. Adolphe Quetelet derived the index in the 1830s from population averages; Ancel Keys named it \"body mass index\" in 1972; and the current bands were standardized by WHO in the 1990s, largely from studies linking mortality curves to the index. The curves are U-shaped: risk rises at both ends, which is why the low cutoff exists too.",
            "Asian populations show elevated cardiometabolic risk at lower BMIs than European populations, so several national guidelines use lower overweight thresholds — 23 instead of 25 is common. If you are comparing your result against a chart from another country, check which standard it uses; the formula is identical, the interpretation bands are not.",
            "Children and teenagers are a separate case entirely: BMI changes with age and sex through growth, so pediatric charts use age-and-sex percentiles, not fixed numbers. This calculator follows the adult standard and is not appropriate for anyone under 18.",
          ],
        },
        {
          heading: "Using BMI alongside other numbers",
          paragraphs: [
            "The most useful companion is waist circumference, because it captures central adiposity — the fat distribution pattern most associated with metabolic risk. The common pairing is BMI for overall mass and waist for distribution: a person at BMI 27 with a small waist reads very differently from one at 27 carrying it centrally.",
            "Body-fat percentage, measured by calipers, bioimpedance scales or DEXA, answers directly what BMI cannot: how much of your weight is fat. It is harder to measure consistently, which is its weakness — the same body can score 22% on one bioimpedance scale and 26% on another depending on hydration and time of day.",
            "A practical routine: weigh yourself under consistent conditions, log BMI here, and let a professional measure waist and body fat periodically. The combination gives you trend, composition and clinical context without over-trusting any single number.",
          ],
        },
      ],
    },
    zh: {
      name: "BMI 计算器",
      tagline: "支持公制/英制输入的体重指数(BMI)计算,结果对照 WHO 官方体重分级表,一键看出自己处于哪一档。",
      intro: [
        "按厘米+千克或英尺英寸+磅输入身高体重,计算器给出保留一位小数的 BMI 值,并对照 WHO 官方分级(偏瘦、正常、超重、肥胖)在参考表中高亮你所在的行。",
        "结果随输入实时更新,轻松看出增减几公斤会跨入哪一档。BMI 是筛查指标而非诊断:它无法区分肌肉和脂肪。",
      ],
      steps: [
        "选择公制(cm + kg)或英制(英尺 + 英寸 + 磅)。",
        "输入身高和体重。",
        "查看 BMI、对应 WHO 分级和完整对照表。",
      ],
      faqs: [
        {
          q: "WHO 的 BMI 分级标准是什么?",
          a: "世界卫生组织的定义为:低于 18.5 为偏瘦,18.5–24.9 为正常,25.0–29.9 为超重,30.0 及以上为肥胖。同一标准适用于成年男性和女性。",
        },
        {
          q: "BMI 是怎么计算的?",
          a: "BMI = 体重(千克)÷ 身高(米)的平方(kg/m²)。英制输入会在内部自动换算成公制,两种方式结果完全一致。",
        },
        {
          q: "为什么 BMI 不适合运动员?",
          a: "肌肉密度高于脂肪,肌肉发达的人即使体脂不高也可能被判为“超重”。请把 BMI 当作人群层面的快速筛查,再结合腰围或体成分分析来判断。",
        },
      ],
      deepDive: [
        {
          heading: "BMI 能告诉你什么、不能告诉你什么",
          paragraphs: [
            "BMI 能在医学中站稳脚跟,是因为它便宜、口径一致,而且在人群尺度上与体脂率相关性尚可。它最合适的定位是筛查第一步:标记出谁需要进一步检查,而不是告诉你进一步检查会发现什么。一个体脂 6% 的健美运动员和一个体脂 35% 的久坐者可以有完全相同的 BMI 27——数字一样,健康图景完全不同。",
            "它在身高两端也会失真:个子很高的人读数略偏高,很矮的人略偏低,因为 BMI 用身高的平方去缩放体重,而人体体积并不这样规整地缩放。这就是研究者们提出各种替代指标的原因——但所有大型卫生机构仍用 BMI 发布阈值,它因此始终是体重筛查的通用语言。",
            "把分类当作谈话的起点,而不是判决。趋势比单次读数重要得多:同一方法、同一台秤、同一时段、坚持数月记录,比任何一个孤立数字都有说服力。",
          ],
        },
        {
          heading: "这些阈值是怎么来的",
          paragraphs: [
            "18.5 / 25 / 30 这三条线不是自然常数,而是有历史的委员会决定:凯特勒在 19 世纪 30 年代从人群平均值导出这个指数,安塞尔·基斯 1972 年给它起了 \"body mass index\" 这个名字,现行分档是 WHO 在 1990 年代基于死亡率曲线标准化的。风险曲线呈 U 形——两端都升高,所以下限 18.5 同样存在。",
            "亚洲人群在低于欧洲人群的 BMI 水平上就出现心血管代谢风险升高,因此多个国家指南把超重阈值下调——23 替代 25 很常见。如果你拿自己的结果去对照别国的图表,先确认它用哪套标准:公式完全一样,解读分档不同。",
            "儿童和青少年是另一回事:BMI 随年龄和性别在生长期内持续变化,儿科用的是年龄别性别百分位曲线,不是固定数字。本计算器遵循成人标准,不适用于 18 岁以下人群。",
          ],
        },
        {
          heading: "BMI 配合哪些指标一起看",
          paragraphs: [
            "最有用的搭档是腰围,因为它捕捉的是中心性肥胖——与代谢风险关联最强的脂肪分布模式。常见组合是 BMI 看总量、腰围看分布:BMI 27 但腰围很小的人,和 BMI 同为 27 但脂肪集中在腹部的人,风险画像差别很大。",
            "体脂率(皮褶钳、生物电阻抗秤或 DEXA 测量)直接回答 BMI 回答不了的问题:体重里有多少是脂肪。它的弱点是测量一致性差——同一具身体,同一台阻抗秤在不同水分状态、不同时段能测出 22% 和 26% 两个结果。",
            "一个务实的做法:固定条件称重、在这里记录 BMI 趋势,腰围和体脂交给专业人员定期测量。组合起来,你同时拥有趋势、成分和临床语境,而不必迷信其中任何一个数字。",
          ],
        },
      ],
    },
    ja: {
      name: "BMI 計算",
      tagline: "メートル法・ヤード・ポンド法のどちらでも BMI を計算し、WHO の公式体重区分のどこに当てはまるかをひと目で判定。",
      intro: [
        "身長と体重を cm + kg、またはフィート・インチ + ポンドで入力すると、小数 1 桁の BMI と WHO 区分(低体重・普通・過体重・肥満)を判定し、基準表の該当行をハイライトします。",
        "結果は入力に合わせてリアルタイム更新されるので、体重が数キロ変わると区分がどう動くかもすぐわかります。BMI はスクリーニング指標であり診断ではありません。筋肉と脂肪は区別できません。",
      ],
      steps: [
        "メートル法(cm + kg)かヤード・ポンド法(ft + in + lb)を選びます。",
        "身長と体重を入力します。",
        "BMI・WHO 区分・基準表全体を確認します。",
      ],
      faqs: [
        {
          q: "WHO の BMI 区分は?",
          a: "世界保健機関の定義は、18.5 未満が低体重、18.5〜24.9 が普通体重、25.0〜29.9 が過体重、30.0 以上が肥満です。成人の男女で同じ基準を使います。",
        },
        {
          q: "BMI の計算式は?",
          a: "BMI = 体重(kg)÷ 身長(m)の 2 乗(kg/m²)です。ヤード・ポンド法の入力は内部でメートル法に換算するため、どちらで入力しても結果は同じです。",
        },
        {
          q: "なぜ運動選手に BMI が合わないのですか?",
          a: "筋肉は脂肪より密度が高いため、体脂肪が少なくても筋肉質な人は「過体重」と判定されがちです。BMI は集団レベルの簡易スクリーニングと考え、腹囲や体組成の測定と合わせて判断してください。",
        },
      ],
      deepDive: [
        {
          heading: "BMI に分かること・分からないこと",
          paragraphs: [
            "BMI が医学に定着したのは、安価で一貫しており、集団レベルでは体脂肪率とそれなりの相関を示すからです。最も適した役割はスクリーニングの第一歩——要精査の人を拾い上げることであって、精査で何が見つかるかを告げるものではありません。体脂肪 6% のアスリートと 35% の運動習慣のない人が、同じ BMI 27 を取り得ます。数字は同じでも健康の実態は別物です。",
            "身長の両端でも誤差が出ます。BMI は体重を身長の二乗で割るため、非常に背の高い人はやや高め、低い人はやや低めに出がちです。だからこそ代替指標も提案されていますが、主要な保健機関は今も閾値を BMI で発布しており、BMI は体重スクリーニングの共通言語であり続けます。",
            "カテゴリーは判定ではなく対話の出発点として。傾向が単回より遥かに重要です:同じ方法・同じ体重計・同じ時間帯で数か月記録したデータは、どんな一度の数字よりも語ります。",
          ],
        },
        {
          heading: "閾値はどこから来たか",
          paragraphs: [
            "18.5 / 25 / 30 の三条線は自然定数ではなく、歴史のある委員会の決定です。ケトレーが 1830 年代に集団平均から指数を導出し、1972 年にアンセル・キーズが \"body mass index\" と命名、現行の区分は 1990 年代に WHO が死亡率曲線をもとに標準化しました。リスク曲線は U 字型——両端で上がるため、下限 18.5 も存在します。",
            "アジア系集団はヨーロッパ系より低い BMI で心血管代謝リスクが上昇するため、複数の国のガイドラインは超過体重の閾値を 25 から 23 へ下げています。他国のチャートと比べる場合は、どの基準かを必ず確認してください。式は同一でも、解釈の区分は異なります。",
            "小児・青少年は別枠です。成長期の BMI は年齢と性別で常に変化するため、小児は年齢別・性別のパーセンタイル曲線を使い、固定値は使いません。本ツールは成人基準に従い、18 歳未満には適しません。",
          ],
        },
        {
          heading: "BMI と組み合わせる指標",
          paragraphs: [
            "最も有用な相棒は腹囲です。代謝リスクとの関連が最も強い脂肪分布——内臓脂肪型の肥満——を捉えられるからです。定番の組み合わせは「BMI で総量、腹囲で分布」:BMI 27 でも腹囲が小さい人と、同じ 27 でも腹部に集中している人では、リスクの描像が大きく違います。",
            "体脂肪率(キャリパー・生体電気インピーダンス・DEXA)は、BMI が答えられない問い——体重のうち脂肪がどれだけか——に直接答えます。弱点は測定の一貫性:同じ身体でも、インピーダンス体組成計は水分状態と時間帯で 22% と 26% の両方を出し得ます。",
            "実務的な運用:条件を固定して体重を記録し、ここで BMI の推移を見る。腹囲と体脂肪は専門家に定期的に測ってもらう。組み合わせれば、傾向・組成・臨床的文脈を同時に持ちながら、どれか一つの数字に依存せずに済みます。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de IMC",
      tagline: "Calcule su índice de masa corporal con unidades métricas o imperiales y vea en qué categoría oficial de la OMS cae el resultado.",
      intro: [
        "Introduzca altura y peso en centímetros y kilogramos, o en pies, pulgadas y libras: la calculadora muestra el IMC con un decimal y la categoría de la OMS en la que cae — bajo peso, normal, sobrepeso u obesidad — resaltando la fila correspondiente de la tabla de referencia.",
        "El resultado se actualiza mientras escribe, así que verá enseguida cómo unos kilos de más o de menos cambian de franja. El IMC es una medida de cribado, no un diagnóstico: no distingue músculo de grasa.",
      ],
      steps: [
        "Elija unidades métricas (cm + kg) o imperiales (ft + in + lb).",
        "Escriba su altura y su peso.",
        "Lea su IMC, su categoría OMS y la tabla de referencia completa.",
      ],
      faqs: [
        {
          q: "¿Cuáles son los rangos de IMC de la OMS?",
          a: "La Organización Mundial de la Salud define: menos de 18,5 bajo peso; 18,5–24,9 peso normal; 25,0–29,9 sobrepeso; y 30,0 o más obesidad. Los mismos cortes valen para hombres y mujeres adultos.",
        },
        {
          q: "¿Cómo se calcula el IMC?",
          a: "El IMC es el peso en kilogramos dividido por la altura en metros al cuadrado (kg/m²). Con unidades imperiales la herramienta convierte pies, pulgadas y libras internamente: el resultado es idéntico.",
        },
        {
          q: "¿Por qué el IMC no encaja con deportistas?",
          a: "El músculo es más denso que la grasa, así que personas muy musculosas pueden salir «sobrepeso» con poca grasa extra. Use el IMC como cribado rápido a nivel poblacional y combínelo con el perímetro de cintura o la composición corporal.",
        },
      ],
      deepDive: [
        {
          heading: "Qué puede y qué no puede decirte el IMC",
          paragraphs: [
            "El IMC se ganó su lugar en la medicina porque es barato, consistente y — a nivel poblacional — se correlaza razonablemente bien con la grasa corporal. Funciona mejor como paso de cribado: señala quién merece una mirada más cercana, no qué encontrará esa mirada. Un atleta con 6% de grasa y una persona sedentaria con 35% pueden compartir un IMC de 27; el número es idéntico, el cuadro de salud no.",
            "También se desvía en los extremos de estatura: las personas muy altas leen ligeramente alto y las muy bajas ligeramente bajo, porque el IMC escala el peso con el cuadrado de la altura mientras el volumen corporal no escala tan limpiamente. Por eso existen alternativas más nuevas — pero todas las grandes organizaciones de salud siguen publicando umbrales en términos de IMC, lo que lo mantiene como el idioma común del cribado de peso.",
            "Trata la categoría como punto de partida de una conversación, no como veredicto. Las tendencias importan más que las lecturas aisladas: el mismo método, la misma báscula, la misma hora del día, registrados durante meses, dicen mucho más que un solo número.",
          ],
        },
        {
          heading: "De dónde salen los umbrales",
          paragraphs: [
            "Los cortes 18,5 / 25 / 30 no son constantes naturales — son decisiones de comité con historia. Adolphe Quetelet derivó el índice en la década de 1830 a partir de promedios poblacionales; Ancel Keys lo nombró \"body mass index\" en 1972; y las bandas actuales las estandarizó la OMS en los años noventa a partir de curvas de mortalidad. Las curvas tienen forma de U: el riesgo sube en ambos extremos, y por eso existe también el límite inferior.",
            "Las poblaciones asiáticas muestran riesgo cardiometabólico elevado a IMCs menores que las europeas, así que varias guías nacionales usan umbrales más bajos — 23 en lugar de 25 es común. Si comparas tu resultado con una tabla de otro país, verifica qué estándar usa; la fórmula es idéntica, las bandas de interpretación no.",
            "Niños y adolescentes son un caso aparte: el IMC cambia con la edad y el sexo durante el crecimiento, así que los gráficos pediátricos usan percentiles por edad y sexo, no cifras fijas. Esta calculadora sigue el estándar adulto y no es apropiada para menores de 18 años.",
          ],
        },
        {
          heading: "Usar el IMC junto con otros números",
          paragraphs: [
            "El compañero más útil es la circunferencia de cintura, porque captura la adiposidad central — el patrón de distribución de grasa más asociado al riesgo metabólico. La combinación habitual es IMC para la masa total y cintura para la distribución: una persona con IMC 27 y cintura pequeña se lee muy distinto de otra con 27 y la grasa concentrada en el abdomen.",
            "El porcentaje de grasa corporal — medido con calipers, básculas de bioimpedancia o DEXA — responde directamente lo que el IMC no puede: cuánto de tu peso es grasa. Su debilidad es la consistencia de la medición: el mismo cuerpo puede marcar 22% en una báscula y 26% en otra según hidratación y hora del día.",
            "Una rutina práctica: péstate en condiciones constantes, registra tu IMC aquí, y deja que un profesional mida cintura y grasa periódicamente. La combinación te da tendencia, composición y contexto clínico sin sobreconfiar en ningún número aislado.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de IMC",
      tagline: "Calcule o índice de massa corporal com unidades métricas ou imperiais e veja em qual categoria oficial da OMS o resultado se encaixa.",
      intro: [
        "Informe altura e peso em centímetros e quilos, ou em pés, polegadas e libras: a calculadora mostra o IMC com uma casa decimal e a categoria da OMS correspondente — abaixo do peso, normal, sobrepeso ou obesidade — destacando a linha certa na tabela de referência.",
        "O resultado atualiza enquanto você digita, então fica fácil ver como alguns quilos mudam a faixa. O IMC é uma medida de triagem, não um diagnóstico: ele não distingue músculo de gordura.",
      ],
      steps: [
        "Escolha unidades métricas (cm + kg) ou imperiais (ft + in + lb).",
        "Digite sua altura e seu peso.",
        "Veja o IMC, a categoria da OMS e a tabela de referência completa.",
      ],
      faqs: [
        {
          q: "Quais são as faixas de IMC da OMS?",
          a: "A Organização Mundial da Saúde define: abaixo de 18,5 abaixo do peso; 18,5–24,9 peso normal; 25,0–29,9 sobrepeso; e 30,0 ou mais obesidade. Os mesmos cortes valem para homens e mulheres adultos.",
        },
        {
          q: "Como o IMC é calculado?",
          a: "O IMC é o peso em quilos dividido pela altura em metros ao quadrado (kg/m²). Com unidades imperiais a ferramenta converte pés, polegadas e libras internamente: o resultado é idêntico.",
        },
        {
          q: "Por que o IMC não serve para atletas?",
          a: "Músculo é mais denso que gordura, então pessoas muito musculosas podem aparecer como «sobrepeso» mesmo com pouca gordura extra. Trate o IMC como triagem rápida de população e combine com cintura ou composição corporal.",
        },
      ],
      deepDive: [
        {
          heading: "O que o IMC pode e não pode dizer",
          paragraphs: [
            "O IMC conquistou seu lugar na medicina porque é barato, consistente e — em nível populacional — correlaciona razoavelmente bem com gordura corporal. Funciona melhor como etapa de triagem: aponta quem merece um olhar mais próximo, não o que esse olhar vai encontrar. Um atleta com 6% de gordura e uma pessoa sedentária com 35% podem compartilhar um IMC de 27; o número é idêntico, o quadro de saúde não.",
            "Ele também distorce nos extremos de altura: pessoas muito altas leem ligeiramente alto e as muito baixas ligeiramente baixo, porque o IMC escala o peso com o quadrado da altura enquanto o volume corporal não escala tão limpo. Por isso existem alternativas mais novas — mas todas as grandes organizações de saúde ainda publicam limites em termos de IMC, o que o mantém como a língua comum da triagem de peso.",
            "Trate a categoria como ponto de partida de uma conversa, não como veredito. Tendências importam mais que leituras isoladas: o mesmo método, a mesma balança, o mesmo horário, registrados por meses, dizem muito mais do que um número sozinho.",
          ],
        },
        {
          heading: "De onde vêm os limites",
          paragraphs: [
            "Os cortes 18,5 / 25 / 30 não são constantes naturais — são decisões de comitê com história. Adolphe Quetelet derivou o índice nos anos 1830 a partir de médias populacionais; Ancel Keys o nomeou \"body mass index\" em 1972; e as faixas atuais foram padronizadas pela OMS nos anos 1990 a partir de curvas de mortalidade. As curvas têm formato de U: o risco sobe nas duas pontas, e por isso o limite inferior também existe.",
            "Populações asiáticas mostram risco cardiometabólico elevado em IMCs menores que as europeias, então várias diretrizes nacionais usam limites mais baixos — 23 em vez de 25 é comum. Se for comparar seu resultado com uma tabela de outro país, confira qual padrão ela usa; a fórmula é idêntica, as faixas de interpretação não.",
            "Crianças e adolescentes são um caso à parte: o IMC muda com idade e sexo durante o crescimento, então os gráficos pediátricos usam percentis por idade e sexo, não números fixos. Esta calculadora segue o padrão adulto e não é adequada para menores de 18 anos.",
          ],
        },
        {
          heading: "Usando o IMC junto com outros números",
          paragraphs: [
            "O companheiro mais útil é a circunferência da cintura, porque captura a adiposidade central — o padrão de distribuição de gordura mais associado ao risco metabólico. A combinação comum é IMC para a massa total e cintura para a distribuição: uma pessoa com IMC 27 e cintura pequena se lê muito diferente de outra com 27 e gordura concentrada no abdômen.",
            "O percentual de gordura corporal — medido com adipômetro, balanças de bioimpedância ou DEXA — responde diretamente o que o IMC não pode: quanto do seu peso é gordura. Sua fraqueza é a consistência: o mesmo corpo pode marcar 22% numa balança e 26% em outra conforme hidratação e hora do dia.",
            "Uma rotina prática: pese-se em condições constantes, registre seu IMC aqui, e deixe um profissional medir cintura e gordura periodicamente. A combinação dá tendência, composição e contexto clínico sem superconfiar em nenhum número isolado.",
          ],
        },
      ],
    },
  },
});
