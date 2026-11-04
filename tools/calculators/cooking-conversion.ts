import { CalcEngineCooking } from "../_engines/calc-engine-cooking";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "cooking-conversion",
  category: "utility",
  icon: "palette",
  engine: { component: CalcEngineCooking },
  related: ["volume-converter", "weight-converter", "temperature-converter", "tip-calculator", "body-fat-calculator", "date-calculator", "age-calculator", "calorie-calculator", "aspect-ratio-calculator", "bmr-calculator"],
  copy: {
    en: {
      name: "Cooking Conversion Calculator",
      tagline: "Convert cups, tablespoons and teaspoons to grams and ounces for 24 common ingredients, with an oven °F↔°C table — all averages, no server round-trips.",
      intro: [
        "A cup of flour is not a cup of honey: converting volume to weight needs the ingredient's density, not a single magic factor. Pick any of 24 common ingredients — flour 120 g/cup, sugar 200, butter 227, honey 340, cocoa 100, rolled oats 90 — and convert in both directions between cups, tablespoons, teaspoons, fluid ounces, milliliters and liters on one side, and grams, kilograms, ounces and pounds on the other.",
        "Volume-to-volume (2 cups = 480 ml) and weight-to-weight (1 lb = 453.6 g) conversions work without picking an ingredient, and a two-way oven table translates the standard °F settings to °C — 350 °F is 175 °C — so foreign recipes stop being guesswork.",
        "Ingredient weights follow widely published reference densities — flour 120 g/cup (spooned and leveled, the standard test-kitchen method), granulated sugar 200, butter 227 per cup, honey 340 — and the oven table converts with the standard formula °C = (°F − 32) × 5⁄9, matching the familiar 350 °F = 175 °C benchmark.",
        "Volume-only converters give one answer for a cup of anything; this one is honest about density, which is why serious baking weighs flour in grams. For best results spoon-and-level rather than scoop directly, since a dipped cup of flour can weigh up to 30% more. When precision matters — bread, pastry, macarons — prefer the gram column over volume entirely.",
      ],
      steps: [
        "Pick the ingredient from the list (skip this for volume-to-volume or weight-to-weight).",
        "Enter the amount your recipe calls for.",
        "Choose the unit you are converting from and the unit you want.",
        "Read the result, or look up the oven temperature in the °F↔°C table.",
      ],
      faqs: [
        {
          q: "How accurate are the gram-per-cup values?",
          a: "They are published averages (King Arthur, USDA and similar sources), and real scoops vary: a cup of flour can differ by ±15% depending on whether you spoon-and-level or scoop straight from the bag. The values are fine for everyday cooking; for baking where precision matters, weigh your ingredients and treat the table as an estimate.",
        },
        {
          q: "Which cup does the tool use?",
          a: "The US customary cooking cup of 240 ml, which is what most American recipes and conversion charts assume. That is 16 tablespoons of 15 ml or 48 teaspoons of 5 ml. If a recipe was written with metric measuring cups (250 ml) or UK imperial cups (284 ml), results shift a few percent — scale accordingly.",
        },
        {
          q: "Why does 350 °F convert to 175 °C and not 176.7 °C?",
          a: "The exact conversion is (350 − 32) × 5/9 = 176.7 °C, but ovens are marked in 5–10 degree steps and recipe writers round to the nearest familiar setting, so 175 °C is the standard pairing. The table shows those conventional pairs; the oven dial's real temperature is approximate anyway.",
        },
      ],
    },
    zh: {
      name: "烹饪换算计算器",
      tagline: "按 24 种常见食材把杯、汤匙、茶匙换算成克与盎司,附烤箱 °F↔°C 对照表——全部本地计算,数值取出版平均值。",
      intro: [
        "一杯面粉和一杯蜂蜜重量完全不同:体积换重量必须知道食材的密度,没有万能系数。本工具内置 24 种常见食材——面粉每杯 120 克、砂糖 200、黄油 227、蜂蜜 340、可可粉 100、燕麦片 90——任意方向互转:杯、汤匙、茶匙、液量盎司、毫升、升 ⇄ 克、千克、盎司、磅。",
        "体积对体积(2 杯 = 480 毫升)和重量对重量(1 磅 = 453.6 克)的换算无需选择食材;双向烤箱温度表把标准华氏档位换算成摄氏——350°F 即 175°C——外国菜谱从此不用猜。",
      ],
      steps: [
        "从列表选择食材(体积对体积或重量对重量可跳过)。",
        "输入菜谱要求的数量。",
        "选择换算源单位和目标单位。",
        "读取结果,或在 °F↔°C 表中查找烤箱温度。",
      ],
      faqs: [
        {
          q: "每杯克重有多准?",
          a: "这些数值来自常见出版数据(King Arthur、USDA 等)的平均值,实际舀取差异不小:同一杯面粉,用量勺刮平还是直接从袋里舀,可以相差 ±15%。日常做菜够用;讲精度的烘焙请以厨房秤为准,把表格当作估计值。",
        },
        {
          q: "这里的一杯是多少毫升?",
          a: "240 毫升的美制 customary cup,也是绝大多数美式菜谱和换算表采用的口径,等于 16 汤匙(每匙 15 毫升)或 48 茶匙(每匙 5 毫升)。如果菜谱用的是 250 毫升的公制量杯或 284 毫升的英制杯,结果会差百分之几——请相应折算。",
        },
        {
          q: "为什么 350°F 换成 175°C 而不是 176.7°C?",
          a: "精确换算是 (350 − 32) × 5/9 = 176.7°C,但烤箱刻度以 5–10 度为一档,菜谱作者都会取整到常用档位,所以 175°C 是标准对应值。表格展示的就是这些约定组合——何况烤箱的实际温度本身就是近似值。",
        },
      ],
    },
    ja: {
      name: "料理換算計算機",
      tagline: "24 種の材料でカップ・大さじ・小さじをグラム・オンスに双方向換算。オーブン °F↔°C 対照表付き。すべてブラウザ内で計算されます。",
      intro: [
        "小麦粉 1 カップとはちみつ 1 カップは重さがまったく違います。体積を重量に換算するには材料の密度が必要で、万能係数は存在しません。24 種の一般的な材料を内蔵しました。小麦粉 120 g/カップ、砂糖 200、バター 227、はちみつ 340、ココア 100、オートミール 90。カップ・大さじ・小さじ・液量オンス・ml・l と g・kg・オンス・ポンドをどちらの向きにも換算します。",
        "体積同士(2 カップ = 480 ml)と重量同士(1 ポンド = 453.6 g)の換算は材料の選択が不要。オーブン温度は双方向の対照表で、標準的な °F 設定を °C に翻訳します(350 °F = 175 °C)。海外レシピがもう当てずっぽうではなくなります。",
      ],
      steps: [
        "リストから材料を選びます(体積同士・重量同士なら不要)。",
        "レシピの分量を入力します。",
        "変換元と変換先の単位を選びます。",
        "結果を読むか、°F↔°C 表でオーブン温度を調べます。",
      ],
      faqs: [
        {
          q: "1 カップのグラム数はどのくらい正確ですか?",
          a: "King Arthur・USDA などの公開値の平均です。実際のすくい方で差が出て、小麦粉 1 カップは ±15% ぐらい変わります。日常の料理には十分ですが、精度が重要なお菓子作りでは秤で量り、この表は目安としてください。",
        },
        {
          q: "ここでの 1 カップは何 ml ですか?",
          a: "アメリカのレシピや換算表が前提とする 240 ml のカップ(US customary cup)です。大さじ 15 ml × 16、小さじ 5 ml × 48 に相当します。250 ml の計量カップや 284 ml の英量杯のレシピなら数% ずれるので、それに応じて調整してください。",
        },
        {
          q: "350 °F が 176.7 °C ではなく 175 °C なのはなぜですか?",
          a: "正確には (350 − 32) × 5/9 = 176.7 °C ですが、オーブンの目盛りは 5〜10 度刻みで、レシピはなじみのある設定値に丸めるのが普通です。そのため 175 °C が標準の組み合わせになります。表はその慣用的な組み合わせを示しています。そもそもオーブンの実際温度自体が近似値です。",
        },
      ],
    },
    es: {
      name: "Calculadora de cocina",
      tagline: "Convierta tazas, cucharadas y cucharaditas a gramos y onzas para 24 ingredientes comunes, con tabla de horno °F↔°C — promedios calculados en su navegador.",
      intro: [
        "Una taza de harina no pesa lo mismo que una de miel: convertir volumen a peso exige la densidad del ingrediente, no un factor único. Esta herramienta incluye 24 ingredientes comunes — harina 120 g/taza, azúcar 200, mantequilla 227, miel 340, cacao 100, avena 90 — y convierte en ambos sentidos entre tazas, cucharadas, cucharaditas, onzas líquidas, mililitros y litros, y gramos, kilogramos, onzas y libras.",
        "Las conversiones volumen-a-volumen (2 tazas = 480 ml) y peso-a-peso (1 lb = 453,6 g) funcionan sin elegir ingrediente, y una tabla de horno bidireccional traduce los ajustes estándar en °F a °C — 350 °F son 175 °C — para que las recetas extranjeras dejen de ser adivinanzas.",
      ],
      steps: [
        "Elija el ingrediente de la lista (sáltelo para volumen↔volumen o peso↔peso).",
        "Introduzca la cantidad que pide la receta.",
        "Elija la unidad de origen y la de destino.",
        "Lea el resultado, o consulte la temperatura del horno en la tabla °F↔°C.",
      ],
      faqs: [
        {
          q: "¿Qué precisión tienen los gramos por taza?",
          a: "Son promedios publicados (King Arthur, USDA y fuentes similares) y la cuchara real varía: una taza de harina puede diferir ±15 % según si se llena con cuchara y se nivela o se saca directo de la bolsa. Vale para cocinar a diario; en repostería de precisión, pese los ingredientes y tome la tabla como estimación.",
        },
        {
          q: "¿Qué taza usa la herramienta?",
          a: "La taza estadounidense de 240 ml, la que asumen la mayoría de recetas y tablas americanas: 16 cucharadas de 15 ml o 48 cucharaditas de 5 ml. Si la receta usa tazas métricas (250 ml) o tazas imperiales británicas (284 ml), los resultados se desvían unos pocos por ciento: ajuste en consecuencia.",
        },
        {
          q: "¿Por qué 350 °F son 175 °C y no 176,7 °C?",
          a: "La conversión exacta es (350 − 32) × 5/9 = 176,7 °C, pero los hornos se marcan en pasos de 5–10 grados y las recetas redondean al ajuste familiar, así que 175 °C es la pareja estándar. La tabla muestra esas parejas convencionales; la temperatura real del horno es una aproximación de todos modos.",
        },
      ],
    },
    pt: {
      name: "Calculadora de medidas culinárias",
      tagline: "Converta xícaras, colheres de sopa e de chá em gramas e onças para 24 ingredientes comuns, com tabela de forno °F↔°C — médias calculadas no navegador.",
      intro: [
        "Uma xícara de farinha não pesa o mesmo que uma de mel: converter volume em peso exige a densidade do ingrediente, não um fator único. A ferramenta traz 24 ingredientes comuns — farinha 120 g/xícara, açúcar 200, manteiga 227, mel 340, cacau 100, aveia 90 — e converte nos dois sentidos entre xícaras, colheres de sopa, colheres de chá, onças fluidas, mililitros e litros, e gramas, quilogramas, onças e libras.",
        "As conversões volume↔volume (2 xícaras = 480 ml) e peso↔peso (1 lb = 453,6 g) funcionam sem escolher ingrediente, e uma tabela de forno bidirecional traduz os ajustes padrão em °F para °C — 350 °F são 175 °C — para que receitas estrangeiras parem de ser adivinhação.",
      ],
      steps: [
        "Escolha o ingrediente na lista (dispensável para volume↔volume ou peso↔peso).",
        "Digite a quantidade que a receita pede.",
        "Escolha a unidade de origem e a de destino.",
        "Leia o resultado, ou consulte a temperatura do forno na tabela °F↔°C.",
      ],
      faqs: [
        {
          q: "Qual é a precisão dos gramas por xícara?",
          a: "São médias publicadas (King Arthur, USDA e fontes parecidas), e a medida real varia: uma xícara de farinha pode diferir ±15% dependendo de se você enche com a colher e nivela ou arranca direto do pacote. Serve para o dia a dia; na confeitaria de precisão, pese os ingredientes e trate a tabela como estimativa.",
        },
        {
          q: "Qual xícara a ferramenta usa?",
          a: "A xícara americana de 240 ml, que é a maioria das receitas e tabelas dos EUA assumem: 16 colheres de sopa de 15 ml ou 48 de chá de 5 ml. Se a receita usa xícaras métricas (250 ml) ou imperiais britânicas (284 ml), os resultados desviam alguns por cento — ajuste proporcionalmente.",
        },
        {
          q: "Por que 350 °F viram 175 °C e não 176,7 °C?",
          a: "A conversão exata é (350 − 32) × 5/9 = 176,7 °C, mas fornos são marcados em passos de 5–10 graus e as receitas arredondam para o ajuste conhecido, então 175 °C é o par padrão. A tabela mostra esses pares convencionais; a temperatura real do forno é aproximada de qualquer forma.",
        },
      ],
    },
  },
});
