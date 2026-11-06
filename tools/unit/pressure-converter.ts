import { unitTool } from "../_lib/unit-tool";

export default unitTool({
  slug: "pressure-converter",
  icon: "shield",
  cat: "pressure",
  related: ["temperature-converter", "energy-converter", "speed-converter", "length-converter", "area-converter", "data-converter", "volume-converter", "weight-converter", "time-converter"],
  copy: {
    en: {
      name: "Pressure Converter",
      tagline: "bar, psi, pascal, atmosphere, mmHg and more — for tires, diving, weather and HVAC.",
      intro: [
        "Engineers checking whether a 10-bar rated valve exceeds a 150 psi spec, divers converting tank pressure between bar and psi, meteorologists reading millibar maps as hectopascals, and HVAC technicians comparing kPa gauge readings with inches of mercury all hit pressure conversion in daily work.",
        "Six significant digits keep safety-relevant margins visible: 1 bar is exactly 100,000 Pa, and 1 psi is 6,894.76 Pa — a value you can verify against NIST tables. Gauge units (bar, psi, which read zero at atmospheric pressure) and absolute units are distinguished, because mixing them is the classic pressure-conversion mistake.",
        "Every unit routes through the pascal, the SI derived unit (1 N/m²). Factors follow international definitions: standard atmosphere = 101,325 Pa exactly, torr = 1/760 atm exactly, and the bar = 10⁵ Pa exactly. Chained conversions accumulate no rounding because factors are carried at full precision.",
        "Pressure is the unit family where mixing systems causes real accidents — psi gauges on bar-rated equipment have failed catastrophically. This tool displays bar, psi, kPa, MPa, atm, torr and mmHg together from one input, so cross-system checks happen at a glance.",
      ],
      faq: [
        {
          q: "How do you convert psi to bar?",
          a: "1 bar = 14.5038 psi, so divide psi by 14.5038. A typical car tire at 32 psi is about 2.21 bar.",
        },
      ],
      deepDive: [
        {
          heading: "One quantity, a dozen guilds",
          paragraphs: [
            "Pressure has so many units because each industry froze its own before standards bodies could arbitrate: US engineering kept psi, European industry standardized the bar, medicine kept the millimeters of mercury that came from the mercury manometer, and meteorology kept the millibar — renamed hectopascal, numerically identical. The pascal, one newton per square meter, is the SI referee all of them convert through.",
            "The anchors are exact where standards guarantee it: the standard atmosphere is exactly 101,325 Pa, the bar exactly 100,000 Pa (from the Greek baros, weight), and psi reduces through the exact inch and pound definitions. mmHg is the odd one out — a conventional value (about 133.322 Pa) tied to mercury's density and standard gravity.",
            "With the factors pinned, chained conversions do not wobble: bar → psi → kPa → mmHg lands on the same number no matter the path, displayed to six significant digits. What does wobble is the convention each number was written in — that is the next section's problem.",
          ],
        },
        {
          heading: "Gauge and absolute: the classic pressure mistake",
          paragraphs: [
            "Most gauges read zero at atmospheric pressure — they report gauge pressure, the part above ambient. Absolute pressure counts from true zero (vacuum). At sea level, a tire at 32 psi gauge is about 47 psi absolute; a spec sheet that does not say which convention it uses is a spec sheet to distrust.",
            "Real accidents happen here: a vessel rated 150 psi (gauge) fed through a gauge of the other convention, or a diver's tank read as absolute, produces an error of exactly one atmosphere — a fatal margin at depth. Dive tables, boiler codes and process specs all state their convention; carry the convention with the number.",
            "The converter shows raw unit conversion, so the judgment is yours: establish whether each number you meet is gauge or absolute before comparing anything. Weather charts use a special case of absolute — surface pressure of around 1013 hPa is itself the weight of one atmosphere.",
          ],
        },
        {
          heading: "The numbers behind everyday pressures",
          paragraphs: [
            "A car tire at 32 psi is about 2.21 bar — exactly what a European pump displays, modulo its rounding. Blood pressure's 120/80 mmHg is roughly 16/10.7 kPa, and medicine never switched because the mmHg numbers are short and universal at the bedside.",
            "Divers live in bar or psi: a full tank at 200 bar is about 2,900 psi, and seawater adds one atmosphere for every 10 meters of depth — there, pressure conversion is safety arithmetic, not trivia.",
            "As everywhere on the site, the math runs in your browser and nothing you enter is stored. Six significant digits keep small differences visible: between 2.0 and 2.2 bar in a tire lie about 3 psi — few enough to miss in conversation, enough to matter for fuel and wear.",
          ],
        },
      ],
    },
    zh: {
      name: "压力换算",
      tagline: "bar、psi、帕斯卡、大气压、毫米汞柱互转——胎压、潜水、气象、暖通都用得上。",
      intro: [
        "换算各行业使用的压力单位:胎压计用 psi,欧洲规格用 bar,工程里是 Pa/kPa,医学与气象用 mmHg。",
        "标准有精确定义的地方(如 1 atm = 101,325 Pa)全部按精确值换算。",
      ],
      faq: [
        {
          q: "psi 怎么换算成 bar?",
          a: "1 bar = 14.5038 psi,把 psi 除以 14.5038 即可。比如常见的 32 psi 胎压约合 2.21 bar。",
        },
      ],
      deepDive: [
        {
          heading: "一个物理量,一打行会",
          paragraphs: [
            "压力单位之所以多,是因为各行业在标准机构仲裁之前就冻结了自己的选择:美国工程保留 psi,欧洲工业定标准 bar,医学保留了水银压力计带来的 mmHg,气象保留毫巴——如今改名叫百帕,数值完全相同。帕斯卡(每平方米一牛)是 SI 的裁判,所有单位都经由它换算。",
            "有标准担保的地方,锚点是精确的:标准大气压精确 101,325 Pa,bar 精确 100,000 Pa(源自希腊语 baros,重量),psi 经由英寸与磅的精确定义归约。mmHg 是例外——它是约定值(约 133.322 Pa),系于汞的密度与标准重力。",
            "系数钉死,链式换算就不晃:bar → psi → kPa → mmHg,无论走哪条路都落回同一个数,按六位有效数字显示。真正会晃的是每个数字当初用的口径——那是下一节的事。",
          ],
        },
        {
          heading: "表压与绝压:经典的压力错误",
          paragraphs: [
            "大多数表在大气压下读零——它们报的是表压,即高出环境的那部分。绝压从真零点(真空)起算。海平面上,表压 32 psi 的轮胎绝压约 47 psi;一份不写明口径的规格书,就是一份值得怀疑的规格书。",
            "真实事故就出在这里:额定 150 psi(表压)的容器接上另一口径的表,或把潜水气瓶读数当绝压,误差恰好一个大气压——在深处就是致命的余量。潜水表、锅炉规范、工艺规格都会写明口径;请把口径和数字一起带走。",
            "换算器给的是原始单位换算,判断靠你:先弄清手里的数是表压还是绝压,再去比较任何东西。天气图是绝压的一个特例——地面气压 1013 hPa 上下,本身就是一整个大气压的重量。",
          ],
        },
        {
          heading: "日常压力背后的数字",
          paragraphs: [
            "胎压 32 psi 约 2.21 bar——欧洲气压泵显示的正是这个数,差在四舍五入而已。血压的 120/80 mmHg 换算约 16/10.7 kPa,医学至今没换:mmHg 数字短,而且病床边人人通用。",
            "潜水员活在 bar 或 psi 里:满瓶 200 bar 约 2,900 psi,海水每深 10 米多加一个大气压——在这里,压力换算是安全算术,不是冷知识。",
            "与全站一样,数学在浏览器里跑,输入的任何数字都不留存。六位有效数字让小差异可见——胎压 2.0 与 2.2 bar 之间隔着约 3 psi:聊天时可以忽略,对油耗和磨损值得认真。",
          ],
        },
      ],
    },
    ja: {
      name: "圧力換算",
      tagline: "bar・psi・パスカル・気圧・mmHg を換算。タイヤ、ダイビング、気象、空調に。",
      intro: [
        "業界ごとの圧力単位を変換:タイヤゲージは psi、欧州規格は bar、工学では Pa/kPa、医学や気象では mmHg。",
        "規格で厳密に定義されている係数(例:1 atm = 101,325 Pa)はすべて正確な値を使います。",
      ],
      faq: [
        {
          q: "psi を bar に換算するには?",
          a: "1 bar = 14.5038 psi なので、psi を 14.5038 で割ります。32 psi のタイヤは約 2.21 bar です。",
        },
      ],
      deepDive: [
        {
          heading: "1 つの物理量、1 ダースの組合",
          paragraphs: [
            "圧力の単位が多いのは、標準化団体が仲裁する前に各業界がそれぞれの選択を凍結したからです。米国の工学は psi を、欧州の産業は bar を、医学は水銀圧力計ゆかりの mmHg を、気象はミリバールを——今はヘクトパスカルと改名され、数値は同一です。パスカル(1 平方メートルあたり 1 ニュートン)は SI の審判で、すべての単位はこれを通じて換算されます。",
            "規格が保証する場所では錨は正確です。標準大気圧は正確に 101,325 Pa、bar は正確に 100,000 Pa(ギリシャ語の baros、重さから)、psi はインチとポンドの正確な定義を通して帰着します。mmHg は例外で、水銀の密度と標準重力に結びついた約束値(約 133.322 Pa)です。",
            "係数が釘付けされているので、連鎖する換算は揺れません。bar → psi → kPa → mmHg と、どの道を通っても同じ数に着地し、有効数字 6 桁で表示します。揺れるのは、それぞれの数が書かれたときの基準のほう——それが次節の話です。",
          ],
        },
        {
          heading: "ゲージ圧と絶対圧、定番の過ち",
          paragraphs: [
            "ほとんどの計器は大気圧でゼロを指します——つまり環境より高い分、ゲージ圧を報告しています。絶対圧は真空という真のゼロから数えます。海面でゲージ 32 psi のタイヤは、絶対で約 47 psi。どちらの基準かを書かない仕様書は、疑ってかかるべき仕様書です。",
            "実際の事故はここで起きます。定格 150 psi(ゲージ)の容器に別基準の計器をつなぐ、ダイビングタンクの読みを絶対圧と読み違える——ずれはちょうど 1 気圧で、深い場所では致命的なマージンです。潜水表もボイラー規格もプロセス仕様も自らの基準を明記します。数字と一緒に基準を持って歩いてください。",
            "このコンバーターは素の単位換算を示すので、判断はあなたの仕事です。目の前の数がゲージか絶対かを見きわめてから、何かを比べてください。天気図は絶対圧の特別な場合です。地上の 1013 hPa 前後という数は、それ自体が大気 1 気圧分の重さです。",
          ],
        },
        {
          heading: "日常の圧力の背後にある数",
          paragraphs: [
            "タイヤの 32 psi は約 2.21 bar——欧州の給気ポンプが表示するのはまさにこの数で、差は丸めだけです。血圧の 120/80 mmHg はおよそ 16/10.7 kPa。医学が単位を替えないのは、mmHg の数字が短く、病床で普遍だからです。",
            "ダイバーは bar か psi の中で暮らします。満タンの 200 bar は約 2,900 psi、海水は 10 メートルごとに 1 気圧ずつ加わります。ここでは圧力換算は安全のための算術で、雑学ではありません。",
            "このサイトのすべてと同じく、計算はブラウザ内で走り、入力は何も残りません。有効数字 6 桁は小さな差を見えるままに保ちます。タイヤの 2.0 bar と 2.2 bar の差は約 3 psi。会話では見過ごせる大きさで、燃費と摩耗には真剣に向き合う値です。",
          ],
        },
      ],
    },
    es: {
      name: "Conversor de presión",
      tagline:
        "bar, psi, pascal, atmósfera, mmHg y más: para neumáticos, buceo, meteorología y climatización.",
      intro: [
        "Convierte las unidades de presión de cada sector: psi para medidores de neumáticos, bar en especificaciones europeas, pascal y kPa en ingeniería, mmHg en medicina y meteorología.",
        "Los factores con definición exacta se usan tal cual (p. ej. 1 atm = 101.325 Pa).",
      ],
      faq: [
        {
          q: "¿Cómo se convierte psi a bar?",
          a: "1 bar = 14,5038 psi, así que divide entre 14,5038. Un neumático a 32 psi ronda los 2,21 bar.",
        },
      ],
      deepDive: [
        {
          heading: "Una magnitud, una docena de gremios",
          paragraphs: [
            "La presión tiene tantas unidades porque cada industria congeló la suya antes de que los organismos de normalización arbitrasen: la ingeniería estadounidense conservó el psi, la industria europea estandarizó el bar, la medicina mantuvo los milímetros de mercurio que trajo el manómetro, y la meteorología, el milibar — rebautizado hectopascal, con valores idénticos. El pascal, un newton por metro cuadrado, es el árbitro del SI por el que todas convierten.",
            "Los anclajes son exactos donde las normas lo garantizan: la atmósfera estándar son exactamente 101.325 Pa, el bar 100.000 Pa exactos (del griego baros, peso), y el psi se reduce por las definiciones exactas de pulgada y libra. El mmHg es el excéntrico: un valor convencional (unos 133,322 Pa) ligado a la densidad del mercurio y a la gravedad estándar.",
            "Con los factores clavados, las conversiones encadenadas no tiemblan: bar → psi → kPa → mmHg llega al mismo número por cualquier camino, mostrado a seis cifras significativas. Lo que tiembla es la convención con la que se escribió cada cifra — el problema de la sección siguiente.",
          ],
        },
        {
          heading: "Manométrica y absoluta: el error clásico de presión",
          paragraphs: [
            "La mayoría de los medidores marcan cero a presión atmosférica — reportan presión manométrica, la parte que supera a la ambiente. La absoluta cuenta desde el cero verdadero (vacío). A nivel del mar, un neumático a 32 psi manométricos son unos 47 psi absolutos; una ficha técnica que no declare qué convención usa es una ficha para desconfiar.",
            "Ahí ocurren los accidentes reales: un recipiente tarado a 150 psi (manométricos) alimentado a través de un medidor de la otra convención, o leer el tanque de un buzo como absoluto, produce un error de una atmósfera entera — margen fatal a profundidad. Tablas de buceo, códigos de calderas y especificaciones de proceso declaran su convención; lleva la convención junto al número.",
            "El conversor muestra la conversión cruda de unidades, así que el juicio es tuyo: averigua si cada número que encuentras es manométrico o absoluto antes de comparar nada. Los mapas del tiempo usan un caso especial de absoluta — la presión superficial de unos 1013 hPa es ella misma el peso de una atmósfera.",
          ],
        },
        {
          heading: "Los números tras las presiones cotidianas",
          paragraphs: [
            "Un neumático a 32 psi son unos 2,21 bar — exactamente lo que muestra un compresor europeo, salvando su redondeo. La tensión arterial de 120/80 mmHg son unos 16/10,7 kPa, y la medicina nunca cambió: los números en mmHg son cortos y universales a pie de cama.",
            "Los buzos viven en bar o psi: un tanque lleno a 200 bar son unos 2.900 psi, y el agua marina añade una atmósfera cada 10 metros de profundidad — allí la conversión de presión es aritmética de seguridad, no curiosidad.",
            "Como en todo el sitio, la cuenta corre en tu navegador y nada de lo que introduzcas se guarda. Seis cifras significativas mantienen visibles las diferencias pequeñas: entre 2,0 y 2,2 bar en un neumático hay unos 3 psi — pocos para notarlos en una charla, suficientes para importar al consumo y al desgaste.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor de pressão",
      tagline:
        "bar, psi, pascal, atmosfera, mmHg e mais — para pneus, mergulho, clima e climatização.",
      intro: [
        "Converta as unidades de pressão de cada setor: psi para calibradores de pneus, bar em especificações europeias, pascal e kPa na engenharia, mmHg na medicina e meteorologia.",
        "Fatores com definição exata são usados como definidos (ex.: 1 atm = 101.325 Pa).",
      ],
      faq: [
        {
          q: "Como converter psi para bar?",
          a: "1 bar = 14,5038 psi, então divida o psi por 14,5038. Um pneu a 32 psi fica perto de 2,21 bar.",
        },
      ],
      deepDive: [
        {
          heading: "Uma grandeza, uma dúzia de corporações",
          paragraphs: [
            "A pressão tem tantas unidades porque cada indústria congelou a sua antes que os órgãos de normalização arbitrassem: a engenharia americana guardou o psi, a indústria europeia padronizou o bar, a medicina manteve os milímetros de mercúrio que vieram do manômetro, e a meteorologia, o milibar — rebatizado hectopascal, com valores idênticos. O pascal, um newton por metro quadrado, é o árbitro do SI por quem todas convertem.",
            "As ancoragens são exatas onde as normas garantem: a atmosfera padrão são exatamente 101.325 Pa, o bar 100.000 Pa exatos (do grego baros, peso), e o psi se reduz pelas definições exatas de polegada e libra. O mmHg é o excêntrico: um valor convencional (uns 133,322 Pa) ligado à densidade do mercúrio e à gravidade padrão.",
            "Com os fatores pregados, conversões encadeadas não tremem: bar → psi → kPa → mmHg chega ao mesmo número por qualquer caminho, exibido em seis algarismos significativos. O que treme é a convenção com que cada cifra foi escrita — o problema da próxima seção.",
          ],
        },
        {
          heading: "Manométrica e absoluta: o erro clássico de pressão",
          paragraphs: [
            "A maioria dos medidores marca zero à pressão atmosférica — reportam pressão manométrica, a parte que excede a ambiente. A absoluta conta do zero verdadeiro (vácuo). Ao nível do mar, um pneu a 32 psi manométricos são uns 47 psi absolutos; uma ficha técnica que não declare qual convenção usa é uma ficha para desconfiar.",
            "É aí que ocorrem os acidentes reais: um vaso tarado a 150 psi (manométricos) alimentado por um medidor da outra convenção, ou ler o tanque de um mergulhador como absoluto, produz um erro de uma atmosfera inteira — margem fatal em profundidade. Tabelas de mergulho, códigos de caldeira e especificações de processo declaram a convenção; leve a convenção junto com o número.",
            "O conversor mostra a conversão crua de unidades, então o juízo é seu: descubra se cada número que encontra é manométrico ou absoluto antes de comparar qualquer coisa. Os mapas do tempo usam um caso especial da absoluta — a pressão superficial de uns 1013 hPa é ela própria o peso de uma atmosfera.",
          ],
        },
        {
          heading: "Os números por trás das pressões do dia a dia",
          paragraphs: [
            "Um pneu a 32 psi são uns 2,21 bar — exatamente o que um compressor europeu mostra, salvando o arredondamento dele. A pressão arterial de 120/80 mmHg são uns 16/10,7 kPa, e a medicina nunca trocou: os números em mmHg são curtos e universais à beira do leito.",
            "Mergulhadores vivem em bar ou psi: um tanque cheio a 200 bar são uns 2.900 psi, e a água do mar soma uma atmosfera a cada 10 metros de profundidade — ali, conversão de pressão é aritmética de segurança, não curiosidade.",
            "Como em todo o site, a conta roda no seu navegador e nada do que você digita fica guardado. Seis algarismos significativos mantêm visíveis as diferenças pequenas: entre 2,0 e 2,2 bar num pneu há uns 3 psi — poucos para notar numa conversa, suficientes para importar no consumo e no desgaste.",
          ],
        },
      ],
    },
  },
});
