import { CalcEngineHealth } from "../_engines/calc-engine-health";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "ideal-weight-calculator",
  category: "utility",
  icon: "calc",
  engine: { component: CalcEngineHealth, props: { kind: "idealweight" } },
  related: ["bmi-calculator", "body-fat-calculator", "bmr-calculator", "calorie-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "aspect-ratio-calculator", "barcode-generator"],
  copy: {
    en: {
      name: "Ideal Weight Calculator",
      tagline:
        "See your ideal weight from the Devine formula (1975) and the healthy BMI band (18.5–24.9) for your height, shown in kg or pounds.",
      intro: [
        "This calculator shows two complementary answers. The Devine formula (1975) — 50 kg + 2.3 kg per inch over 5 ft for men, 45.5 kg + 2.3 kg per inch for women — was originally derived to dose drugs like digoxin and is still the most-cited ideal-weight equation in medicine. The healthy BMI band multiplies your height in meters squared by 18.5 and 24.9, the WHO's normal-range limits.",
        "Enter your height in centimeters or feet and inches. The two methods usually disagree by a few kilograms, which is exactly the point: a single ideal weight does not exist. Treat both numbers as a frame of reference around a healthy range, not a target to force yourself into — the estimate is not medical advice.",
        "Devine's equation came from 1974–75 work on drug dosing — digoxin first, later gentamicin — and remains the most-cited equation in clinical literature; the healthy-BMI band applies the WHO normal range of 18.5–24.9 to your frame. Together they bracket the range most clinicians would call reasonable for your height.",
        "Compared with single-number charts, showing two methods that usually disagree by a few kilograms makes the honest point: ideal weight is a range, not a digit. Frame size, muscle mass and age all shift what is healthy for you specifically. These figures are references for planning conversations — not medical advice and not a target to diet into.",
      ],
      steps: [
        "Choose metric (cm) or imperial (ft + in) units.",
        "Enter your height.",
        "Compare the Devine estimates for men and women with the healthy BMI band.",
        "Use the range, not one number, when you set a weight goal.",
      ],
      faqs: [
        {
          q: "Where does the Devine formula come from?",
          a: "Dr. B. J. Devine published it in 1975 as a quick way to estimate drug dosing weights from height: 50 kg for the first 5 feet plus 2.3 kg per additional inch for men, 45.5 kg for women. It was never designed as a beauty or fitness target, which is why the WHO-based BMI band is shown next to it.",
        },
        {
          q: "Why is the answer a range instead of one number?",
          a: "Because healthy weight depends on frame, muscle mass, age and ethnicity, no single number fits. The band 18.5–24.9 × height² comes from the WHO BMI classification and covers the weights research links with the lowest overall risk for most adults.",
        },
        {
          q: "Is this medical advice?",
          a: "No — this is an estimate, not medical advice. Athletes and very muscular people sit above the band while perfectly healthy, and some conditions shift the healthy range. Discuss a target weight with a healthcare professional.",
        },
      ],
    },
    zh: {
      name: "理想体重计算器",
      tagline:
        "用 Devine 公式(1975)与健康 BMI 区间(18.5–24.9)计算你的理想体重范围,支持公斤与磅显示,输入身高即可。",
      intro: [
        "本计算器给出两个互补的答案。Devine 公式(1975)——男性 50 公斤 + 5 英尺以上每英寸 × 2.3 公斤,女性 45.5 公斤起同法计算——最初用于地高辛等药物剂量估算,至今仍是医学文献中被引用最多的理想体重公式。健康 BMI 区间则用身高(米)的平方乘以 18.5 和 24.9,即 WHO 正常体重范围的上下限。",
        "以厘米或英尺英寸输入身高。两种方法通常相差几公斤,这恰恰说明:并不存在唯一的理想体重。请把两个数字当作健康范围附近的参照,而不是必须达到的目标——本估算不构成医疗建议。",
      ],
      steps: [
        "选择公制(cm)或英制(英尺 + 英寸)。",
        "输入身高。",
        "对照 Devine 公式的男女结果与健康 BMI 区间。",
        "设定体重目标时,请以区间为准,而不是单一数字。",
      ],
      faqs: [
        {
          q: "Devine 公式是怎么来的?",
          a: "B. J. Devine 医生于 1975 年发表,用于从身高快速估算给药体重:男性 5 英尺对应 50 公斤,每超出 1 英寸加 2.3 公斤;女性从 45.5 公斤起算。它从来不是身材或健身目标,所以旁边同时给出基于 WHO 的 BMI 区间。",
        },
        {
          q: "为什么答案是区间而不是一个数字?",
          a: "因为健康体重取决于骨架、肌肉量、年龄和族群差异,单一数字无法覆盖。18.5–24.9 × 身高² 来自 WHO 的 BMI 分级,研究显示这一范围内多数成年人的总体健康风险最低。",
        },
        {
          q: "这是医疗建议吗?",
          a: "不是——这只是估算,不构成医疗建议。运动员和肌肉发达的人即使完全健康也可能高于区间,某些疾病也会改变健康范围。设定目标体重前请咨询专业人士。",
        },
      ],
    },
    ja: {
      name: "理想体重計算",
      tagline:
        "Devine 式(1975)と健康 BMI の帯域(18.5〜24.9)から理想体重を算出。kg とポンドで表示でき、入力は身長だけです。",
      intro: [
        "この計算ツールは補い合う 2 つの答えを示します。Devine 式(1975)— 男性は 50 kg + 5 フィート超過 1 インチごとに 2.3 kg、女性は 45.5 kg + 2.3 kg — はジゴキシンなどの投与量を見積もるために導かれた式で、今も医学文献で最も引用される理想体重式です。健康 BMI の帯域は身長(メートル)の 2 乗に WHO の普通体重の下限・上限である 18.5 と 24.9 を掛けた値です。",
        "身長を cm またはフィート・インチで入力します。2 つの方法は通常数 kg ずれますが、それこそが要点です:理想体重は一意には存在しません。両方の数値を健康な範囲の目安として使い、無理に目指す目標にはしないでください。この推定は医療アドバイスではありません。",
      ],
      steps: [
        "メートル法(cm)かヤード・ポンド法(ft + in)を選びます。",
        "身長を入力します。",
        "Devine 式の男性・女性の値と健康 BMI の帯域を比べます。",
        "体重目標を決めるときは、1 つの数字ではなく帯域を使います。",
      ],
      faqs: [
        {
          q: "Devine 式の出どころは?",
          a: "1975 年に B. J. Devine 医師が、身長から投与体重を素早く見積もる方法として発表しました:男性は最初の 5 フィートで 50 kg、以降 1 インチごとに 2.3 kg、女性は 45.5 kg から。もともと体型やフィットネスの目標用に作られていないため、WHO 由来の BMI 帯域を並べて表示しています。",
        },
        {
          q: "なぜ 1 つの数字ではなく範囲なのですか?",
          a: "健康体重は骨格・筋肉量・年齢・民族性に依存するため、単一の数字では言い表せません。18.5〜24.9 × 身長² という帯域は WHO の BMI 分類に由来し、多くの成人で総合的な健康リスクが最も低いと研究で結び付けられている範囲です。",
        },
        {
          q: "これは医療アドバイスですか?",
          a: "いいえ — 推定値であり医療アドバイスではありません。アスリートや筋肉質の人は完全に健康でも帯域を上回ることがあり、病気によっても健康な範囲は変わります。目標体重は専門家と相談して決めてください。",
        },
      ],
    },
    es: {
      name: "Calculadora de peso ideal",
      tagline:
        "Calcule su peso ideal con la fórmula de Devine (1975) y la banda de IMC saludable (18,5–24,9) para su altura, en kilos o libras.",
      intro: [
        "Esta calculadora muestra dos respuestas complementarias. La fórmula de Devine (1975) — hombres 50 kg + 2,3 kg por pulgada que exceda 5 pies; mujeres 45,5 kg + 2,3 kg por pulgada — se derivó para dosificar fármacos como la digoxina y sigue siendo la ecuación de peso ideal más citada en medicina. La banda de IMC saludable multiplica su altura en metros al cuadrado por 18,5 y 24,9, los límites del rango normal de la OMS.",
        "Introduzca su altura en centímetros o pies y pulgadas. Los dos métodos suelen diferir en varios kilos, y ahí está la clave: no existe un único peso ideal. Trate ambas cifras como un marco de referencia alrededor de un rango saludable, no como una meta obligatoria — esta estimación no es consejo médico.",
      ],
      steps: [
        "Elija unidades métricas (cm) o imperiales (ft + in).",
        "Introduzca su altura.",
        "Compare las estimaciones de Devine para hombres y mujeres con la banda de IMC saludable.",
        "Fije su objetivo de peso usando el rango, no un solo número.",
      ],
      faqs: [
        {
          q: "¿De dónde sale la fórmula de Devine?",
          a: "El Dr. B. J. Devine la publicó en 1975 para estimar rápidamente el peso de dosificación a partir de la altura: 50 kg para los primeros 5 pies más 2,3 kg por pulgada adicional en hombres, 45,5 kg en mujeres. Nunca se diseñó como objetivo estético o de fitness, y por eso se muestra junto a la banda de IMC basada en la OMS.",
        },
        {
          q: "¿Por qué la respuesta es un rango y no un número?",
          a: "Porque el peso saludable depende de la complexión, la masa muscular, la edad y el origen étnico: ningún número único sirve. La banda 18,5–24,9 × altura² procede de la clasificación de IMC de la OMS y cubre los pesos que la investigación asocia con el menor riesgo global en la mayoría de adultos.",
        },
        {
          q: "¿Esto es consejo médico?",
          a: "No — es una estimación, no consejo médico. Los deportistas y las personas muy musculosas pueden estar por encima de la banda estando perfectamente sanos, y algunas condiciones desplazan el rango saludable. Comente su peso objetivo con un profesional sanitario.",
        },
      ],
    },
    pt: {
      name: "Calculadora de peso ideal",
      tagline:
        "Veja seu peso ideal pela fórmula de Devine (1975) e pela faixa de IMC saudável (18,5–24,9) para sua altura, em quilos ou libras.",
      intro: [
        "Esta calculadora mostra duas respostas complementares. A fórmula de Devine (1975) — homens 50 kg + 2,3 kg por polegada acima de 5 pés; mulheres 45,5 kg + 2,3 kg por polegada — foi derivada para dosar fármacos como a digoxina e continua sendo a equação de peso ideal mais citada na medicina. A faixa de IMC saudável multiplica sua altura em metros ao quadrado por 18,5 e 24,9, os limites da faixa normal da OMS.",
        "Informe sua altura em centímetros ou em pés e polegadas. Os dois métodos costumam divergir alguns quilos, e é justamente esse o ponto: não existe um único peso ideal. Trate os dois números como referência ao redor de uma faixa saudável, não como uma meta a cumprir — a estimativa não é aconselhamento médico.",
      ],
      steps: [
        "Escolha unidades métricas (cm) ou imperiais (ft + in).",
        "Informe sua altura.",
        "Compare as estimativas de Devine para homens e mulheres com a faixa de IMC saudável.",
        "Defina sua meta de peso usando a faixa, não um número único.",
      ],
      faqs: [
        {
          q: "De onde vem a fórmula de Devine?",
          a: "O Dr. B. J. Devine a publicou em 1975 para estimar rapidamente o peso de dosagem a partir da altura: 50 kg para os primeiros 5 pés mais 2,3 kg por polegada adicional nos homens, 45,5 kg nas mulheres. Ela nunca foi pensada como objetivo estético ou de fitness, por isso a faixa de IMC baseada na OMS aparece ao lado.",
        },
        {
          q: "Por que a resposta é uma faixa e não um número?",
          a: "Porque o peso saudável depende de estrutura óssea, massa muscular, idade e etnia: nenhum número único serve. A faixa 18,5–24,9 × altura² vem da classificação de IMC da OMS e cobre os pesos que as pesquisas associam ao menor risco geral na maioria dos adultos.",
        },
        {
          q: "Isso é aconselhamento médico?",
          a: "Não — é uma estimativa, não aconselhamento médico. Atletas e pessoas muito musculosas podem ficar acima da faixa estando perfeitamente saudáveis, e algumas condições deslocam a faixa saudável. Discuta seu peso-alvo com um profissional de saúde.",
        },
      ],
    },
  },
});
