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
      deepDive: [
        {
          heading: "Where the Devine formula comes from",
          paragraphs: [
            "The Devine formula was published by Dr. B. J. Devine in 1975 — but not as a fitness goal. It emerged from work on drug dosing, first digoxin and later other medications whose safe dose depends on body size: 50 kg for the first 5 feet of height plus 2.3 kg per additional inch for men, 45.5 kg for women.",
            "Clinicians needed a quick, height-based estimate of a “dosing weight,” and Devine's became the most-cited ideal-weight equation in the medical literature — so widely reprinted that generations of readers assumed it defined what a person should weigh. It never did.",
            "The second number this calculator shows is the healthy BMI band: your height in meters squared multiplied by 18.5 and by 24.9, the normal-range limits in the WHO classification. This anchors the answer in population health data rather than in a dosing shortcut.",
          ],
        },
        {
          heading: "Why the answer is a range, not a number",
          paragraphs: [
            "The two methods usually disagree by a few kilograms, and the disagreement is the message: there is no single ideal weight. Frame size, muscle mass, age and ethnic differences in body composition all shift what is healthy for a given height, which is exactly why the WHO defines a band rather than a target.",
            "Read the two outputs together as a bracket: most adults whose weight sits between the Devine figure and the BMI band edges are within the range clinicians would consider reasonable. If your current weight sits outside both, the gap tells you the direction of change, not how fast to pursue it.",
            "Also note what the number does not capture: at the same BMI, someone who trains carries more lean tissue than someone who does not, and research on older adults suggests a slightly higher weight can even be protective. Healthy weight is personal enough that a conversation with a professional beats any formula.",
          ],
        },
        {
          heading: "Common misuses",
          paragraphs: [
            "The oldest misuse is treating Devine as an aesthetic standard — a number to diet into. It was designed to calculate drug doses; using it as a body goal imports a dosing convenience into a decision it was never meant to inform.",
            "Athletes and very muscular people sit far above the BMI band while perfectly healthy, because the band assumes average body composition. If you train seriously, ignore both numbers as targets and judge by body-fat trend and performance instead.",
            "Finally, quick height-weight charts circulating online often trace back to insurance-company tables from the mid-twentieth century, built from applicants' self-reported data — a weaker basis than either method shown here. This calculator runs locally in your browser and stores nothing; use it for orientation, not for diagnosis.",
          ],
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
      deepDive: [
        {
          heading: "Devine 公式的出身:不是为体重目标发明的",
          paragraphs: [
            "Devine 公式由 B. J. Devine 医生于 1975 年发表——但它不是为身材管理设计的。它出自药物剂量研究:地高辛等药物的安全剂量取决于体型,因此需要一个由身高快速估算“给药体重”的办法。男性为 50 公斤加每超 5 英尺以上一英寸 2.3 公斤,女性基础值为 45.5 公斤。",
            "临床医生要的是快捷的身高换算,而 Devine 公式因此成为医学文献里被引用最多的“理想体重”公式——转载范围太广,以至于几代读者以为它规定了人应该多重。它从来没有这个使命。",
            "本工具给出的第二个数字是健康 BMI 区间:身高(米)的平方分别乘以 18.5 和 24.9,即 WHO 分级的正常范围上下限。它把答案锚定在人群健康数据上,而不是给药经验公式上。",
          ],
        },
        {
          heading: "为什么答案是一个区间而不是一个数",
          paragraphs: [
            "两种方法通常相差几公斤,而这个“不一致”本身就是信息:不存在唯一的理想体重。骨架大小、肌肉量、年龄以及不同族裔的体成分差异,都会改变某个身高下什么体重算健康——这正是 WHO 给出区间而非目标值的原因。",
            "把两个输出当括号读:体重落在 Devine 值与 BMI 区间边缘之间的大多数成年人,都在临床上公认的合理范围内。如果现在的体重在两边之外,差距告诉你的是改变的方向,而不是该多快去追。",
            "还要注意数字看不到的东西:同样 BMI 下,坚持训练的人瘦体组织更多;对老年人的研究甚至提示略高的体重可能有保护作用。健康体重因人而异到什么程度?和专业人员聊一次,胜过任何公式。",
          ],
        },
        {
          heading: "常见误用",
          paragraphs: [
            "最古老的误用是把 Devine 当审美标准——一个要“瘦到”的数字。它本用来计算给药量;把它当身材目标,等于把给药的便利性塞进一个它从未打算回答的问题。",
            "运动员和肌肉发达者在完全健康的情况下会远超 BMI 区间,因为区间假设的是平均体成分。认真训练的人,请忽略这两个数字作为目标,改看体脂趋势和运动表现。",
            "另外,网上流传的身高体重速查表,很多源自二十世纪中叶保险公司的核保表,依据还是投保人自报的数据——比本页两种方法的依据都弱。计算器在你的浏览器本地运行,不保存任何数据;用来定位方向,不用来做诊断。",
          ],
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
      deepDive: [
        {
          heading: "Devine 式の来歴:体重目標のために作られたのではない",
          paragraphs: [
            "Devine 式は 1975 年に B. J. Devine 医師が発表しましたが、フィットネス用ではありません。ジゴキシンなど安全用量が体格に依存する薬の投与量研究から生まれた「身長からの投与体重」の簡易推定です:男性は最初の 5 フィートで 50 kg、以降 1 インチごとに +2.3 kg、女性は基準 45.5 kg。",
            "臨床現場が必要としていたのは手早い身長ベースの換算であり、Devine 式は医学文献で最も引用される「理想体重」式になりました。転載が広まりすぎて、本来の目的を知らずに「あるべき体重」と思われた時代さえあります。",
            "このツールが示すもう一つの数字は健康 BMI 帯:身長(メートル)の2乗に 18.5 と 24.9 を掛けた、WHO 分類の正常範囲の上下限です。投与の便法ではなく、集団の健康データに答えを固定します。",
          ],
        },
        {
          heading: "答えが数字ではなく区間である理由",
          paragraphs: [
            "2つの方法は通常数 kg ずれ、その不一致こそがメッセージです:単一の理想体重は存在しません。骨格・筋肉量・年齢・体組成の集団差がすべて「その身長で健康な体重」を動かします。WHO が範囲で定義しているのはそのためです。",
            "2つの出力を括弧として読みます:Devine 値から BMI 帯の端までの間に収まる成人の多くは、臨床的に妥当とされる範囲内です。現在の体重が両方の外にあるなら、差は変化の方向を教えますが、速度までは教えません。",
            "数字が見えないものにも注意:同じ BMI でも訓練者は除脂肪組織が多く、高齢者ではやや高い体重が保護的に働くという研究もあります。健康体重は専門家との対話に勝る公式は存在しないほど個別性が高い話です。",
          ],
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
      deepDive: [
        {
          heading: "De dónde viene la fórmula de Devine",
          paragraphs: [
            "La fórmula de Devine la publicó el Dr. B. J. Devine en 1975 — y no fue como objetivo estético. Surgió de trabajos sobre dosificación de medicamentos, primero digoxina y luego otros cuyo dosis segura depende del tamaño corporal: 50 kg por los primeros 5 pies de altura más 2,3 kg por pulgada adicional en hombres, 45,5 kg en mujeres.",
            "Los clínicos necesitaban estimar rápido un “peso de dosificación” desde la altura, y la ecuación de Devine se convirtió en la más citada de la literatura médica — tan reproducida que generaciones de lectores creyeron que definía cuánto debería pesar una persona. Nunca fue para eso.",
            "El segundo número que muestra esta calculadora es la banda de IMC saludable: tu altura en metros al cuadrado multiplicada por 18,5 y por 24,9, los límites del rango normal de la OMS. Ancla la respuesta en datos de salud poblacional, no en un atajo de dosificación.",
          ],
        },
        {
          heading: "Por qué la respuesta es un rango y no un número",
          paragraphs: [
            "Los dos métodos suelen diferir en unos pocos kilos, y esa diferencia es el mensaje: no existe un peso ideal único. El tamaño de la estructura, la masa muscular, la edad y las diferencias étnicas en composición corporal desplazan qué peso es saludable para una altura dada — por eso la OMS define un rango y no un objetivo.",
            "Lee las dos salidas como un corchete: la mayoría de adultos cuyo peso cae entre la cifra de Devine y los bordes de la banda de IMC están dentro de lo que la práctica clínica consideraría razonable. Si tu peso actual queda fuera de ambos, la distancia indica la dirección del cambio, no la velocidad.",
            "Ten en cuenta lo que la cifra no captura: al mismo IMC, quien entrena lleva más tejido magro, y en adultos mayores una cifra algo mayor puede incluso ser protectora. Un peso saludable es tan personal que una consulta profesional supera cualquier fórmula.",
          ],
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
      deepDive: [
        {
          heading: "De onde vem a fórmula de Devine",
          paragraphs: [
            "A fórmula de Devine foi publicada pelo Dr. B. J. Devine em 1975 — e não como meta estética. Ela surgiu de estudos sobre dosagem de medicamentos, primeiro digoxina e depois outros cuja dose segura depende do tamanho corporal: 50 kg pelos primeiros 5 pés de altura mais 2,3 kg por polegada adicional para homens, 45,5 kg para mulheres.",
            "Os clínicos precisavam estimar rapidamente um “peso de dosagem” a partir da altura, e a equação de Devine se tornou a mais citada da literatura médica — tão reimpressa que gerações de leitores acreditaram que ela definia quanto uma pessoa deveria pesar. Nunca foi para isso.",
            "O segundo número que esta calculadora mostra é a faixa de IMC saudável: sua altura em metros ao quadrado multiplicada por 18,5 e por 24,9, os limites do intervalo normal da OMS. Isso ancora a resposta em dados de saúde populacional, não em um atalho de dosagem.",
          ],
        },
        {
          heading: "Por que a resposta é uma faixa e não um número",
          paragraphs: [
            "Os dois métodos costumam divergir em alguns quilos, e essa divergência é a mensagem: não existe um peso ideal único. Estrutura óssea, massa muscular, idade e diferenças étnicas na composição corporal deslocam o que é saudável para uma dada altura — por isso a OMS define uma faixa, não um alvo.",
            "Leia as duas saídas como um colchete: a maioria dos adultos cujo peso cai entre o valor de Devine e as bordas da faixa de IMC está dentro do que a clínica consideraria razoável. Se seu peso atual está fora de ambos, a distância indica a direção da mudança, não a velocidade.",
            "Considere o que o número não captura: no mesmo IMC, quem treina carrega mais tecido magro, e em idosos um valor um pouco maior pode até ser protetor. Um peso saudável é tão pessoal que uma conversa com um profissional supera qualquer fórmula.",
          ],
        },
      ],
    },
  },
});
