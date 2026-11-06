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
      deepDive: [
        {
          heading: "Why one cup is not one number",
          paragraphs: [
            "Volume measures space; weight measures matter, and the bridge between them is density — which varies enormously between ingredients. A cup of honey (340 g) weighs almost three times a cup of rolled oats (90 g), yet both fill the same 240 ml. Any converter that offers a single “cups to grams” factor is quietly assuming one density for everything, which is exactly the assumption that ruins baking.",
            "This tool keeps a per-ingredient table instead. Flour sits at 120 g per cup — the spooned-and-leveled figure used by King Arthur and most US test kitchens — while sugar (200), butter (227) and honey (340) carry their own published values. The distinction matters most for flour because it is compressible: the same physical cup can weigh 110 g when fluffed or 150 g when scooped straight from the bag.",
            "The practical takeaway: treat the gram outputs as well-sourced averages, not lab constants. Professional bakers convert recipes to grams once, then weigh everything permanently — a kitchen scale removes the ±15% scoop variance that no calculator can see. Use this tool to make that first conversion, and to translate volume-based recipes into the weighing habit.",
          ],
        },
        {
          heading: "Cup sizes around the world",
          paragraphs: [
            "The word “cup” is not standardized globally, and the difference is big enough to taste. This tool uses the US customary cooking cup of 240 ml, the convention behind American recipes and nutrition labels — built from 16 tablespoons of 15 ml or 48 teaspoons of 5 ml. Australian recipes also use 250 ml cups, so even English-language sources disagree.",
            "If your recipe was written for metric measuring cups (250 ml, common in Europe, Japan and most of Latin America), every volume figure here runs about 4% smaller than your cup. UK imperial cups (284 ml) run the other way. Weigh-based ingredients like flour shift a few grams per cup; with liquids the error is proportional and rarely matters. The safe fix is to convert once into grams, then work by weight.",
            "Tablespoons hide a second trap: the US tablespoon is 15 ml, the Australian one is 20 ml, and older UK recipes may assume 17.7 ml. Small per spoon, but a recipe with six tablespoons of oil drifts noticeably. When a recipe says “tablespoon” without a country, assume 15 ml unless the source is Australian.",
          ],
        },
        {
          heading: "Oven temperatures and local execution",
          paragraphs: [
            "The °F↔°C table applies the exact formula °C = (°F − 32) × 5⁄9, but rounds to the settings ovens actually have: 350 °F becomes 175 °C rather than the literal 176.7 °C, because dials step in 5–10 degree increments and every recipe writer rounds to the nearest familiar mark. Other standard pairs follow the same logic — 300 °F ≈ 150 °C, 400 °F ≈ 200 °C, 425 °F ≈ 220 °C.",
            "Remember that the marking on a dial is itself an approximation: home ovens routinely drift 10–25 degrees from their set point, which is why serious recipes recommend an independent oven thermometer before blaming a conversion. The table solves the unit problem; it cannot fix a miscalibrated oven.",
            "Everything here — the density table, the unit math, the temperature formula — runs entirely in your browser. No ingredient list, no quantities and no searches are sent anywhere, which is why the tool stays instant with no loading spinners. It also works offline once loaded, useful for phones propped against a flour-dusted counter.",
          ],
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
      deepDive: [
        {
          heading: "为什么一杯不是一个固定的数字",
          paragraphs: [
            "体积量的是空间,重量量的是物质,两者之间的桥梁是密度——而不同食材的密度差异极大。一杯蜂蜜(340 克)几乎是一杯燕麦片(90 克)的三倍重,却填满同样的 240 毫升。任何提供单一“杯换克”系数的换算器,都在悄悄假设万物同密度——这恰恰是毁掉烘焙的那个假设。",
            "本工具改用按食材的对照表。面粉取每杯 120 克——这是 King Arthur 和大多数美式测试厨房的“量勺刮平”口径;砂糖(200)、黄油(227)、蜂蜜(340)各有自己的出版值。面粉是最敏感的一项,因为它可压缩:同一个杯,蓬松时约 110 克,直接从袋里舀可以到 150 克。",
            "实用结论:把克数输出当作来源可靠的平均值,而不是实验室常数。职业烘焙师的做法是把菜谱一次性换算成克,此后永远用秤——厨房秤消除了 ±15% 的舀取波动,这是任何计算器都看不见的。用本工具完成第一次换算,把体积菜谱变成称重习惯。",
          ],
        },
        {
          heading: "世界各地的“一杯”不一样大",
          paragraphs: [
            "“杯”这个词在全球没有统一标准,而且差异大到吃得出。本工具采用 240 毫升的美制 customary cup——美式菜谱和营养标签背后的口径,由 16 汤匙(每匙 15 毫升)或 48 茶匙(每匙 5 毫升)构成。澳大利亚也用 250 毫升的杯,所以同样是英文菜谱也会互相打架。",
            "如果你的菜谱按公制量杯(250 毫升,常见于欧洲、日本和拉美大部分地区)编写,这里的每个体积数字都比你的杯小约 4%;英制杯(284 毫升)则反过来。面粉这类重量型食材每杯会差几克;液体误差成比例、通常无伤大雅。稳妥做法是先换算成克,之后按重量操作。",
            "汤匙里还藏着第二个坑:美制汤匙 15 毫升,澳大利亚 20 毫升,老版英国菜谱可能按 17.7 毫升。单勺差异小,但一勺油×六勺就会明显跑偏。菜谱说“汤匙”却没写国家时,除非来源是澳大利亚,按 15 毫升处理。",
          ],
        },
        {
          heading: "烤箱温度与本地运行",
          paragraphs: [
            "°F↔°C 表使用精确公式 °C = (°F − 32) × 5⁄9,但取整到烤箱实际有的档位:350°F 显示 175°C 而不是字面的 176.7°C,因为旋钮以 5–10 度为一档,菜谱作者都取整到熟悉的刻度。其他常用档同理——300°F ≈ 150°C、400°F ≈ 200°C、425°F ≈ 220°C。",
            "别忘了旋钮上的刻度本身就是近似:家用烤箱偏离设定温度 10–25 度是常态,所以认真一点的菜谱都建议先备一个独立烤箱温度计,别急着怪换算。这张表解决的是单位问题,修不好校准失灵的烤箱。",
            "这里的一切——密度表、单位换算、温度公式——完全在浏览器里运行。食材、数量、搜索记录都不发送到任何地方,因此工具没有加载动画、始终即时。加载一次后离线也能用,很适合架在沾满面粉的料理台旁的手机。",
          ],
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
      deepDive: [
        {
          heading: "1 カップが 1 つの数字にならない理由",
          paragraphs: [
            "体積は空間を、重さは物質を測ります。両者をつなぐのは密度ですが、食材ごとの差は極めて大きい。はちみつ 1 カップ(340 g)はオートミール 1 カップ(90 g)のほぼ 3 倍の重さで、満たす体積は同じ 240 ml です。「カップからグラムへ」と単一の係数を返す換算器は、すべてを同じ密度と仮定しています——お菓子作りを台無しにするのはまさにこの仮定です。",
            "このツールは代わりに材料別の表を持ちます。小麦粉は 120 g/カップ——King Arthur や米国のテストキッチンが使う「スプーンですくってすりきり」の基準です。砂糖(200)、バター(227)、はちみつ(340)はそれぞれの公開値。小麦粉が最もデリケートなのは圧縮できるからで、同じカップがふんわり状態で 110 g、袋から直接すくえば 150 g にもなります。",
            "実用的な結論はこうです。グラムの出力は出典のある平均値として扱い、実験定数とは見なさない。プロのパティシエはレシピを一度グラムに換算したら、以後は常に秤で量ります——キッチンスケールは ±15% のすくいばらつきを消し、それはどんな計算機にも見えません。このツールは最初の換算と、体積レシピから「計る習慣」への橋渡しに使ってください。",
          ],
        },
        {
          heading: "世界の「1 カップ」の大きさ",
          paragraphs: [
            "「カップ」は世界的に統一されておらず、差は味に出る大きさです。このツールは 240 ml の US カスタムカップを使います。米国のレシピや栄養ラベルの基準で、大さじ 15 ml × 16、小さじ 5 ml × 48 で構成されます。オーストラリアは 250 ml を使うので、同じ英語圏でも食い違います。",
            "レシピが計量カップ(250 ml。欧州・日本・ラテンアメリカの多くで一般的)基準なら、ここの体積の数字はあなたのカップより約 4% 小さく出ます。英量杯(284 ml)は逆方向です。小麦粉のような重量型の材料は 1 カップ数グラムのずれ、液体は比例するのでたいてい問題になりません。安全策は一度グラムへ換算し、以後は重量で作業することです。",
            "大さじにも罠がもう一つ。米国は 15 ml、オーストラリアは 20 ml、古い英国レシピは 17.7 ml の場合があります。1 杯あたりは小さくても、油 6 杯分になると顕著にずれます。国名なしの「大さじ」は、出典がオーストラリアでない限り 15 ml と考えてよいでしょう。",
          ],
        },
        {
          heading: "オーブン温度とローカル実行",
          paragraphs: [
            "°F↔°C 表は正確な式 °C = (°F − 32) × 5⁄9 を適用しますが、オーブンが実際に持つ設定値へ丸めます。350 °F は文字どおりの 176.7 °C ではなく 175 °C と表示——ダイヤルは 5〜10 度刻みで、レシピの執筆者はみな馴染みの目盛りへ丸めるからです。他の定番も同様に 300 °F ≈ 150 °C、400 °F ≈ 200 °C、425 °F ≈ 220 °C です。",
            "ダイヤルの目盛り自体が近似である点も忘れずに。家庭用オーブンは設定温度から 10〜25 度ずれるのが普通で、だからこそ本格的なレシピは換算を疑う前に独立したオーブン温度計を勧めます。この表が解決するのは単位の問題で、狂ったオーブンの校正ではありません。",
            "ここ のすべて——密度表・単位計算・温度式——は完全にブラウザ内で動きます。材料リストも分量も検索もどこにも送られないため、ローディング表示のない即時応答が保たれています。読み込み後はオフラインでも使え、小麦粉まみれの作業台に立てかけたスマホでも安心です。",
          ],
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
      deepDive: [
        {
          heading: "Por qué una taza no es un número fijo",
          paragraphs: [
            "El volumen mide espacio; el peso mide materia, y el puente entre ambos es la densidad — que varía enormemente entre ingredientes. Una taza de miel (340 g) pesa casi tres veces una de avena (90 g), aunque ambas llenan los mismos 240 ml. Cualquier conversor que ofrezca un único factor de «tazas a gramos» asume en silencio una sola densidad para todo, que es justo la suposición que arruina la repostería.",
            "Esta herramienta mantiene una tabla por ingrediente en su lugar. La harina queda en 120 g por taza — la cifra de cuchara y nivelado que usan King Arthur y la mayoría de cocinas de prueba estadounidenses — mientras el azúcar (200), la mantequilla (227) y la miel (340) llevan sus propios valores publicados. La distinción importa más con la harina porque es compresible: la misma taza física puede pesar 110 g si está esponjada o 150 g si se saca directo de la bolsa.",
            "La conclusión práctica: trate los gramos como promedios bien documentados, no como constantes de laboratorio. Los profesionales convierten la receta a gramos una vez y luego pesan todo siempre — una balanza de cocina elimina el ±15 % de variación al llenar que ninguna calculadora puede ver. Use esta herramienta para esa primera conversión y para pasar recetas de volumen al hábito de pesar.",
          ],
        },
        {
          heading: "Las tazas según el país",
          paragraphs: [
            "La palabra «taza» no está estandarizada a nivel mundial y la diferencia llega al paladar. Esta herramienta usa la taza estadounidense de 240 ml, la convención detrás de las recetas y etiquetas americanas — construida con 16 cucharadas de 15 ml o 48 cucharaditas de 5 ml. Australia también usa tazas de 250 ml, así que ni siquiera las fuentes en inglés coinciden.",
            "Si su receta está escrita para tazas métricas (250 ml, comunes en Europa, Japón y gran parte de Latinoamérica), cada volumen aquí sale un 4 % menor que su taza. Las tazas imperiales británicas (284 ml) van en sentido contrario. Con ingredientes de peso como la harina son unos gramos por taza; con líquidos el error es proporcional y rara vez importa. La solución segura es convertir una vez a gramos y trabajar por peso.",
            "Las cucharadas esconden una segunda trampa: la estadounidense mide 15 ml, la australiana 20 ml, y recetas británicas antiguas pueden asumir 17,7 ml. Poco por cucharada, pero seis cucharadas de aceite ya se notan. Cuando una receta diga «cucharada» sin país, asuma 15 ml salvo que la fuente sea australiana.",
          ],
        },
        {
          heading: "Temperaturas de horno y ejecución local",
          paragraphs: [
            "La tabla °F↔°C aplica la fórmula exacta °C = (°F − 32) × 5⁄9, pero redondea a los ajustes que los hornos realmente tienen: 350 °F se convierte en 175 °C y no en el literal 176,7 °C, porque las perillas avanzan en pasos de 5–10 grados y todo autor de recetas redondea a la marca familiar. Los demás pares siguen la misma lógica — 300 °F ≈ 150 °C, 400 °F ≈ 200 °C, 425 °F ≈ 220 °C.",
            "Recuerde que la marca de la perilla ya es una aproximación: los hornes domésticos suelen desviarse 10–25 grados del punto fijado, razón por la que las recetas serias recomiendan un termómetro de horno independiente antes de culpar a la conversión. La tabla resuelve el problema de unidades; no puede arreglar un horno descalibrado.",
            "Todo aquí — la tabla de densidades, el cálculo de unidades, la fórmula de temperatura — corre íntegramente en su navegador. No se envía a ningún lado la lista de ingredientes, las cantidades ni las búsquedas, por eso la herramienta responde al instante sin indicadores de carga. También funciona sin conexión una vez cargada, útil con un teléfono apoyado junto a una encimera llena de harina.",
          ],
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
      deepDive: [
        {
          heading: "Por que uma xícara não é um número só",
          paragraphs: [
            "Volume mede espaço; peso mede matéria, e a ponte entre os dois é a densidade — que varia enormemente entre ingredientes. Uma xícara de mel (340 g) pesa quase três vezes uma de aveia (90 g), embora as duas encham os mesmos 240 ml. Qualquer conversor que ofereça um único fator de «xícaras para gramas» assume em silêncio uma densidade só para tudo, que é justamente a suposição que estraga a confeitaria.",
            "Esta ferramenta mantém uma tabela por ingrediente. A farinha fica em 120 g por xícara — o valor de colher e nivelar usado pela King Arthur e pela maioria das cozinhas de teste americanas — enquanto açúcar (200), manteiga (227) e mel (340) carregam seus próprios valores publicados. A distinção importa mais na farinha porque ela é compressível: a mesma xícara física pode pesar 110 g se solta ou 150 g se arrancada direto do pacote.",
            "A conclusão prática: trate os gramas como médias bem documentadas, não como constantes de laboratório. Profissionais convertem a receita para gramas uma vez e depois pesam tudo sempre — uma balança de cozinha elimina a variação de ±15% ao encher que nenhuma calculadora consegue enxergar. Use esta ferramenta para essa primeira conversão e para levar receitas volumétricas ao hábito de pesar.",
          ],
        },
        {
          heading: "A xícara muda conforme o país",
          paragraphs: [
            "A palavra «xícara» não é padronizada no mundo, e a diferença chega ao paladar. A ferramenta usa a xícara americana de 240 ml, a convenção por trás das receitas e rótulos dos EUA — formada por 16 colheres de sopa de 15 ml ou 48 de chá de 5 ml. A Austrália também usa xícaras de 250 ml, então nem fontes em língua inglesa concordam.",
            "Se a receita foi escrita para xícaras métricas (250 ml, comuns na Europa, Japão e na maior parte da América Latina), cada volume aqui sai cerca de 4% menor que a sua xícara. As xícaras imperiais britânicas (284 ml) vão no outro sentido. Em ingredientes de peso como a farinha são poucos gramas por xícara; em líquidos o erro é proporcional e raramente importa. O caminho seguro é converter uma vez para gramas e trabalhar por peso.",
            "As colheres escondem uma segunda armadilha: a americana tem 15 ml, a australiana 20 ml, e receitas britânicas antigas podem assumir 17,7 ml. Pouco por colher, mas seis colheres de óleo já desviam de forma perceptível. Quando a receita disser «colher de sopa» sem país, considere 15 ml a menos que a fonte seja australiana.",
          ],
        },
        {
          heading: "Temperaturas de forno e execução local",
          paragraphs: [
            "A tabela °F↔°C aplica a fórmula exata °C = (°F − 32) × 5⁄9, mas arredonda para os ajustes que os fornos realmente têm: 350 °F viram 175 °C e não o literal 176,7 °C, porque os botões avançam em passos de 5–10 graus e todo autor de receitas arredonda para a marca conhecida. Os outros pares seguem a mesma lógica — 300 °F ≈ 150 °C, 400 °F ≈ 200 °C, 425 °F ≈ 220 °C.",
            "Lembre que a marca do botão já é uma aproximação: fornos domésticos costumam desviar de 10 a 25 graus do ponto ajustado, razão pela qual receitas sérias recomendam um termômetro de forno independente antes de culpar a conversão. A tabela resolve o problema de unidade; não conserta um forno descalibrado.",
            "Tudo aqui — a tabela de densidades, o cálculo de unidades, a fórmula de temperatura — roda inteiramente no seu navegador. A lista de ingredientes, as quantidades e as buscas não vão para lugar nenhum; por isso a ferramenta responde na hora, sem indicadores de carregamento. Também funciona offline depois de carregada, útil com um telefone encostado junto à bancada coberta de farinha.",
          ],
        },
      ],
    },
  },
});
