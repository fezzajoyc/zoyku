import { unitTool } from "../_lib/unit-tool";

export default unitTool({
  slug: "speed-converter",
  icon: "shuffle",
  cat: "speed",
  related: ["length-converter", "time-converter", "temperature-converter", "pressure-converter", "energy-converter", "area-converter", "data-converter", "volume-converter", "weight-converter"],
  copy: {
    en: {
      name: "Speed Converter",
      tagline: "km/h, mph, knots, m/s and more — convert running pace, wind speed and vehicle speed instantly.",
      intro: [
        "Drivers checking whether 120 km/h exceeds a 65 mph limit, runners converting treadmill pace between min/km and min/mile, pilots and sailors working with knots, and engineers comparing airflow in m/s versus ft/s all need speed conversion — often mid-task, where a wrong decimal matters.",
        "Results show six significant digits: 100 km/h is exactly 62.1371 mph, and 1 knot is exactly 1.852 km/h by definition. The knot's factor is exact because the nautical mile is defined as precisely 1,852 meters by the 1929 International Hydrographic Conference.",
        "All units convert through meters per second using exact definitions: the mile is 1,609.344 m exactly, so mph factors carry no rounding error even after chained conversions. Mach numbers, which depend on air temperature and pressure, are deliberately excluded to avoid implying false precision.",
        "Speed is where unit chaos bites hardest: km/h, mph, knots, m/s and pace units each belong to a different world. This converter shows them all simultaneously from one input, instead of making you pick a pair and re-enter values for each comparison.",
      ],
      faq: [
        {
          q: "How fast is 100 km/h in mph?",
          a: "100 km/h = 62.14 mph. The exact factor is 1 mph = 1.609344 km/h.",
        },
      ],
      deepDive: [
        {
          heading: "The knot: a unit born from a rope",
          paragraphs: [
            "Before mechanical speed logs, sailors threw a wooden panel attached to a knotted line overboard, counted a fixed interval with a sandglass, and measured speed by how many knots ran through their fingers — the unit kept the name. Today's definition: one knot is one nautical mile per hour, and since the nautical mile is exactly 1,852 m (fixed by the 1929 International Hydrographic Conference), 1 kn is exactly 1.852 km/h.",
            "Aviation and marine weather, flight plans and shipping lanes all report in knots, while road signs switch to km/h or mph — which is why the pilot converting approach speeds and the sailor reading gale warnings use this one conversion more than any other.",
            "Because 1 kn = 1.852 km/h is exact, conversions in and out of knots carry no rounding error until the display step. Six significant digits keep the number honest: 100 km/h is 62.1371 mph, not a rounded 62.",
          ],
        },
        {
          heading: "Mach is not a unit you can pin down",
          paragraphs: [
            "The speed of sound is not constant: it depends on air temperature, falling from about 340 m/s at sea level to roughly 295 m/s at cruise altitude, where the air sits at −50 °C or colder. Any single Mach factor is therefore an approximation. The site uses the sea-level value (1 Mach = 340.29 m/s) and says so right in the unit name.",
            "That labeling matters: a jet cruising at Mach 0.8 at 11 km actually moves about 236 m/s (roughly 850 km/h), not 272 m/s — applying the sea-level factor overstates its ground speed by around 15%. Use the Mach row for rough sea-level comparisons only, and read aircraft speeds in knots or km/h when precision matters.",
            "The m/s column is the anchor: meters per second is the SI coherent unit, and km/h, mph, ft/s and knots all reduce to it through exact length definitions. That is why a chain like knots → m/s → mph never drifts.",
          ],
        },
        {
          heading: "Pace is speed turned upside down",
          paragraphs: [
            "Runners think in minutes per kilometer, which is not a speed unit but its reciprocal: 5:00 min/km is 12 km/h, and 6:00 min/km is 10 km/h. The inversion is why pace cannot be converted by multiplying — you divide 60 by the speed instead. This converter lists speed units only; to get pace, convert to km/h and divide 60 by it (a treadmill at 12 km/h is 5:00 min/km).",
            "The other everyday use is driving across borders: 120 km/h against a 65 mph limit, or US-highway 70 mph read as 113 km/h. Because 1 mph = 1.609344 km/h exactly (the mile itself is exact), the comparison is trustworthy to every displayed digit.",
            "Wind speeds bridge the same gap: national weather services report km/h or m/s while marine forecasts use knots — a 10 m/s breeze is 19.4 kn, exactly the kind of glance-level check this page is built for. All computations run in your browser, so the page keeps working offline, mid-flight or at sea, when mobile data is gone.",
          ],
        },
      ],
    },
    zh: {
      name: "速度换算",
      tagline: "km/h、mph、节、m/s 即时互转——跑步配速、风速、车速一网打尽。",
      intro: [
        "换算不同国家与运动场景的速度单位:千米每小时、英里每小时、航海航空用的节、物理用的米每秒。",
        "在国外租车、看海事预报、对比跑步机与路跑配速时都派得上用场。",
      ],
      faq: [
        {
          q: "100 km/h 等于多少 mph?",
          a: "100 km/h = 62.14 mph。精确换算系数:1 mph = 1.609344 km/h。",
        },
      ],
      deepDive: [
        {
          heading: "节:一根绳子上诞生的单位",
          paragraphs: [
            "机械计程仪出现之前,水手把系着打结绳子的木板抛进海里,用沙漏计一段固定时间,数手指间滑过多少个结——这个单位把名字留了下来。今天的定义:1 节 = 每小时 1 海里。海里被 1929 年国际水文会议精确固定为 1,852 m,所以 1 kn 精确等于 1.852 km/h。",
            "航空与航海的气象、飞行计划、航道报告都用节,公路标志却用 km/h 或 mph——飞行员对进近速度、水手读大风警报时,用得最多的速度换算就是这一组。",
            "因为 1 kn = 1.852 km/h 是精确值,与节相关的往返换算在显示之前不引入任何舍入误差。六位有效数字让显示保持诚实:100 km/h 是 62.1371 mph,不是一个含糊的 62。",
          ],
        },
        {
          heading: "马赫不是能钉死的单位",
          paragraphs: [
            "声速不是常数:它随气温变化,海平面约 340 m/s,到巡航高度(−50 °C 或更冷)降到约 295 m/s。任何单一的马赫换算系数都注定是近似值。本站取海平面值(1 Mach = 340.29 m/s),并直接写在单位名里。",
            "这个标注很重要:客机在 11 km 高度以 Mach 0.8 巡航,实际约 236 m/s(约 850 km/h),而不是 272 m/s——把 Mach 0.8 套进海平面系数会把地速高估约 15%。马赫那一行只适合做粗略的海平面量级比较;要精确时,请读节或 km/h。",
            "m/s 一列是锚:米每秒是 SI 的连贯单位,km/h、mph、ft/s、节都经由精确的长度定义归约到它。这就是“节→m/s→mph”一路换算不漂移的原因。",
          ],
        },
        {
          heading: "配速是倒过来的速度",
          paragraphs: [
            "跑者习惯“每公里几分钟”,这不是速度单位,而是它的倒数:5:00 min/km 是 12 km/h,6:00 min/km 是 10 km/h。倒数关系决定了配速不能靠乘系数换算——要用 60 除以速度。本换算器只列速度单位;要配速,先换到 km/h 再用 60 除(跑步机 12 km/h 就是 5:00 min/km)。",
            "另一个日常场景是跨国自驾:120 km/h 对 65 mph 的限速,或把美国高速的 70 mph 读成 113 km/h。因为 1 mph = 1.609344 km/h 精确(英里本身精确),这个比较在显示的每一位上都可信。",
            "风速也横跨同一道缝:各国气象台报 km/h 或 m/s,海上预报用节。10 m/s 的风约 19.4 kn——正是这个页面擅长的一眼换算。所有计算都在浏览器本地完成,航班上或海上没有流量时,页面照常工作。",
          ],
        },
      ],
    },
    ja: {
      name: "速さ換算",
      tagline: "km/h・mph・ノット・m/s を即時換算。ランニングペース、風速、車速に。",
      intro: [
        "国やスポーツごとに使われる速さの単位を変換:キロメートル毎時、マイル毎時、航海・航空で使うノット、物理で使うメートル毎秒。",
        "海外で車を借りるとき、海洋予報を読むとき、ランニングのペース比較に便利です。",
      ],
      faq: [
        {
          q: "100 km/h は何 mph?",
          a: "100 km/h = 62.14 mph です。正確な係数は 1 mph = 1.609344 km/h。",
        },
      ],
      deepDive: [
        {
          heading: "ノット:ロープから生まれた単位",
          paragraphs: [
            "機械式の計程儀ができる前、船乗りは結び目のある綱をつけた板を海に投げ、砂時計で決まった時間を数え、指の間を走った結び目の数で速さを測りました。単位はその名前を残しています。今日の定義は 1 ノット = 毎時 1 海里。海里は 1929 年の国際水路会議で正確に 1,852 m と定められたので、1 kn は正確に 1.852 km/h です。",
            "航空と海運の気象、飛行計画、航路の報告はノットで行われ、道路標識は km/h や mph。着陸進入の速度を換算するパイロットも、暴風警報を読む船員も、最もよく使う速さの換算はこの一組です。",
            "1 kn = 1.852 km/h が正確な値なので、ノットと行き来する換算は表示の段階まで丸め誤差を持ち込みません。有効数字 6 桁が表示を正直に保ちます。100 km/h は 62.1371 mph で、丸めた 62 ではありません。",
          ],
        },
        {
          heading: "マッハは釘付けできない単位",
          paragraphs: [
            "音速は一定ではありません。気温に依存し、海面で約 340 m/s、巡航高度(−50 °C かそれ以下)では約 295 m/s まで下がります。単一のマッハ係数はどうしても近似であり、このサイトは海面の値(1 マッハ = 340.29 m/s)を使い、その旨を単位名にも明記しています。",
            "この明記が重要です。11 km の高度をマッハ 0.8 で巡航するジェット機の実際は約 236 m/s(約 850 km/h)で、272 m/s ではありません。海面の係数を当てはめると対地速度を約 15% も過大評価します。マッハの行は海面レベルの大まかな比較専用にし、正確さが要る場面ではノットか km/h を読んでください。",
            "m/s の列が錨です。メートル毎秒は SI の一貫単位であり、km/h・mph・ft/s・ノットはすべて正確な長さの定義を通してこれに帰着します。ノット→m/s→mph とつなげてもずれないのはこのためです。",
          ],
        },
        {
          heading: "ペースは逆さの速さ",
          paragraphs: [
            "ランナーは「1 km 何分」で考えます。これは速さの単位ではなく、その逆数です。5:00 分/km は 12 km/h、6:00 分/km は 10 km/h。逆数なので、ペースは掛け算では換算できず、60 を速さで割ります。このコンバーターは速さの単位だけを扱い、ペースが欲しいときは km/h に換算して 60 で割ってください(トレッドミルの 12 km/h は 5:00 分/km です)。",
            "もう 1 つの日常は国境を越える運転です。120 km/h を 65 mph の制限と比べる、米国の高速の 70 mph を 113 km/h として読む。1 mph = 1.609344 km/h が正確(マイル自体が正確)なので、比較は表示桁のすべてで信頼できます。",
            "風速も同じ溝をまたぎます。各国の気象発表は m/s や km/h、海上予報はノット。10 m/s の風は約 19.4 ノット——このページが得意な一瞥換算です。計算はすべてブラウザ内で行われるため、通信のない機上や海上でもページは動きます。",
          ],
        },
      ],
    },
    es: {
      name: "Conversor de velocidad",
      tagline:
        "km/h, mph, nudos, m/s y más: convierte ritmo de carrera, viento y velocidad de vehículos al instante.",
      intro: [
        "Convierte las unidades de velocidad de distintos países y deportes: kilómetros por hora, millas por hora, nudos para vela y aviación, metros por segundo para física.",
        "Útil al alquilar un coche en el extranjero, leer un parte marítimo o comparar ritmo en cinta y al aire libre.",
      ],
      faq: [
        {
          q: "¿Cuánto es 100 km/h en mph?",
          a: "100 km/h = 62,14 mph. El factor exacto es 1 mph = 1,609344 km/h.",
        },
      ],
      deepDive: [
        {
          heading: "El nudo: una unidad nacida de una cuerda",
          paragraphs: [
            "Antes del corredero mecánico, los marineros lanzaban al mar una tabla atada a un cabo anudado, contaban un intervalo fijo con un reloj de arena y medían la velocidad por los nudos que corrían entre sus dedos — la unidad conservó el nombre. La definición de hoy: un nudo es una milla náutica por hora, y como la milla náutica quedó fijada en exactamente 1.852 m por la Conferencia Hidrográfica Internacional de 1929, 1 kn son exactamente 1,852 km/h.",
            "La meteorología aeronáutica y marítima, los planes de vuelo y las rutas de navegación van en nudos, mientras las señales viales usan km/h o mph: por eso el piloto que convierte velocidades de aproximación y el marinero que lee avisos de temporal recurren a esta conversión más que a ninguna otra.",
            "Como 1 kn = 1,852 km/h es exacto, las conversiones de ida y vuelta con nudos no arrastran redondeo hasta la pantalla. Seis cifras significativas mantienen el número honesto: 100 km/h son 62,1371 mph, no un 62 redondeado.",
          ],
        },
        {
          heading: "Mach no es una unidad que se pueda clavar",
          paragraphs: [
            "La velocidad del sonido no es constante: depende de la temperatura del aire, y baja de unos 340 m/s a nivel del mar a unos 295 m/s en altitud de crucero, con el aire a −50 °C o menos. Cualquier factor único de Mach es, por fuerza, una aproximación. El sitio usa el valor a nivel del mar (1 Mach = 340,29 m/s) y lo dice en el propio nombre de la unidad.",
            "Esa etiqueta importa: un reactor en crucero a Mach 0.8 y 11 km de altura va a unos 236 m/s (unos 850 km/h), no a 272 m/s — aplicar el factor a nivel del mar sobrestima su velocidad sobre el terreno un 15% aproximadamente. Usa la fila de Mach solo para comparaciones gruesas a nivel del mar y lee velocidades de aeronaves en nudos o km/h cuando la precisión cuente.",
            "La columna de m/s es el ancla: el metro por segundo es la unidad coherente del SI, y km/h, mph, ft/s y nudos se reducen a ella mediante definiciones exactas de longitud. Por eso una cadena nudos → m/s → mph nunca deriva.",
          ],
        },
        {
          heading: "El ritmo es la velocidad del revés",
          paragraphs: [
            "Los corredores piensan en minutos por kilómetro, que no es una unidad de velocidad sino su recíproco: 5:00 min/km son 12 km/h, y 6:00 min/km, 10 km/h. Por esa inversión el ritmo no se convierte multiplicando: se divide 60 entre la velocidad. Este conversor muestra solo unidades de velocidad; para el ritmo, convierte a km/h y divide 60 entre él (una cinta a 12 km/h son 5:00 min/km).",
            "El otro uso cotidiano es conducir al otro lado de la frontera: 120 km/h frente a un límite de 65 mph, o leer 70 mph de una autopista estadounidense como 113 km/h. Como 1 mph = 1,609344 km/h exactos (la milla es exacta), la comparación es fiable hasta el último dígito mostrado.",
            "El viento cruza la misma grieta: los servicios meteorológicos hablan en km/h o m/s y los partes marítimos, en nudos. Un viento de 10 m/s son 19,4 kn — el tipo de cálculo de un vistazo para el que está hecha esta página. Como todo se calcula en tu navegador, la página funciona sin conexión, en pleno vuelo o en alta mar.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor de velocidade",
      tagline:
        "km/h, mph, nós, m/s e mais: converta ritmo de corrida, vento e velocidade de veículos na hora.",
      intro: [
        "Converta as unidades de velocidade de diferentes países e esportes: quilômetros por hora, milhas por hora, nós para vela e aviação, metros por segundo para física.",
        "Útil ao alugar um carro no exterior, ler uma previsão marítima ou comparar ritmo na esteira e na rua.",
      ],
      faq: [
        {
          q: "Quanto é 100 km/h em mph?",
          a: "100 km/h = 62,14 mph. O fator exato é 1 mph = 1,609344 km/h.",
        },
      ],
      deepDive: [
        {
          heading: "O nó: uma unidade nascida de uma corda",
          paragraphs: [
            "Antes do logo mecânico, os marinheiros jogavam ao mar uma prancha presa a um cabo com nós, contavam um intervalo fixo com uma ampulheta e mediam a velocidade pelos nós que corriam entre os dedos — a unidade ficou com o nome. A definição de hoje: um nó é uma milha náutica por hora, e como a milha náutica ficou fixada em exatamente 1.852 m pela Conferência Hidrográfica Internacional de 1929, 1 kn são exatamente 1,852 km/h.",
            "A meteorologia aeronáutica e marítima, os planos de voo e as rotas de navegação vão em nós, enquanto as placas de estrada usam km/h ou mph: por isso o piloto convertendo velocidade de aproximação e o marinheiro lendo avisos de tempestade recorrem a esta conversão mais que a qualquer outra.",
            "Como 1 kn = 1,852 km/h é exato, as conversões de ida e volta com nós não carregam arredondamento até a tela. Seis algarismos significativos mantêm o número honesto: 100 km/h são 62,1371 mph, não um 62 arredondado.",
          ],
        },
        {
          heading: "Mach não é uma unidade que dá para pregar",
          paragraphs: [
            "A velocidade do som não é constante: depende da temperatura do ar e cai de uns 340 m/s ao nível do mar para uns 295 m/s em altitude de cruzeiro, com o ar a −50 °C ou menos. Qualquer fator único de Mach é, por força, uma aproximação. O site usa o valor ao nível do mar (1 Mach = 340,29 m/s) e diz isso no próprio nome da unidade.",
            "Essa etiqueta importa: um jato em cruzeiro a Mach 0.8 e 11 km de altura vai a uns 236 m/s (uns 850 km/h), não a 272 m/s — aplicar o fator ao nível do mar superestima a velocidade sobre o solo em cerca de 15%. Use a linha do Mach só para comparações grosseiras ao nível do mar e leia velocidades de aeronaves em nós ou km/h quando a precisão contar.",
            "A coluna de m/s é a âncora: o metro por segundo é a unidade coerente do SI, e km/h, mph, ft/s e nós se reduzem a ela por definições exatas de comprimento. Por isso uma cadeia nós → m/s → mph nunca deriva.",
          ],
        },
        {
          heading: "O ritmo é a velocidade de cabeça para baixo",
          paragraphs: [
            "Corredores pensam em minutos por quilômetro, que não é uma unidade de velocidade mas o seu recíproco: 5:00 min/km são 12 km/h, e 6:00 min/km, 10 km/h. Por essa inversão, ritmo não se converte multiplicando: divide-se 60 pela velocidade. Este conversor mostra só unidades de velocidade; para o ritmo, converta para km/h e divida 60 por ele (uma esteira a 12 km/h são 5:00 min/km).",
            "O outro uso cotidiano é dirigir do outro lado da fronteira: 120 km/h contra um limite de 65 mph, ou ler 70 mph de uma rodovia americana como 113 km/h. Como 1 mph = 1,609344 km/h exatos (a milha é exata), a comparação é confiável até o último dígito mostrado.",
            "O vento atravessa a mesma fenda: serviços de meteorologia falam km/h ou m/s e os avisos marítimos, nós. Um vento de 10 m/s são 19,4 kn — o tipo de conta de relance para a qual esta página existe. Como tudo roda no seu navegador, a página funciona offline, em pleno voo ou em alto-mar.",
          ],
        },
      ],
    },
  },
});
