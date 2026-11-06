import { CalcEngineBasic } from "../_engines/calc-engine-basic";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "fuel-cost-calculator",
  category: "utility",
  icon: "calc",
  engine: { component: CalcEngineBasic, props: { kind: "fuel" } },
  related: ["tip-calculator", "percentage-calculator", "profit-calculator", "length-converter", "body-fat-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator", "aspect-ratio-calculator"],
  copy: {
    en: {
      name: "Fuel Cost Calculator",
      tagline: "Distance, efficiency and pump price in: fuel needed, trip cost and cost per kilometer or mile out — metric or imperial, with round trip.",
      intro: [
        "Plan any drive before you leave: enter the distance, your car's consumption (L/100 km or MPG) and the current fuel price, and see the liters or gallons required, the total cost and the cost per unit of distance — plus a round-trip toggle that doubles the distance for you.",
        "It works equally well for commuting budgets, splitting a road trip between friends, or comparing a detour's price. The math is local to your browser, so it also works with no signal at the gas station.",
        "Metric mode divides distance by consumption (L/100 km → liters = km × rate ÷ 100); imperial mode converts MPG to gallons needed directly. Cost per kilometer or per mile is shown alongside the total, which is the number that makes comparing routes or cars meaningful rather than eyeballing tank sizes.",
        "Unlike mapping-app estimates, this one takes your car's real consumption and your local pump price, so the figure matches receipts rather than fleet averages. A round-trip toggle, per-unit cost and total cost all appear at once. Consumption itself varies with load, speed and air conditioning, so treat the total as a good central estimate, not an exact bill.",
      ],
      steps: [
        "Enter the one-way distance in kilometers or miles.",
        "Add your vehicle's consumption and the current fuel price.",
        "Toggle round trip if needed and read the fuel and cost totals.",
      ],
      faqs: [
        {
          q: "How do I convert between L/100 km and MPG?",
          a: "The two scales are inverses: 235.2 divided by the MPG figure gives L/100 km (US gallons), so 30 MPG ≈ 7.8 L/100 km and 6 L/100 km ≈ 39.2 MPG. The calculator takes whichever figure your dashboard shows.",
        },
        {
          q: "Why does my real-world fuel use differ from the result?",
          a: "Official consumption figures assume steady speeds. City traffic, cold starts, roof racks, aggressive acceleration and air conditioning can push real usage 10–30% higher, so treat the estimate as a floor for city-heavy trips.",
        },
        {
          q: "Does the calculator include tolls or maintenance?",
          a: "No — it prices the fuel only. For a true cost per kilometer, add tolls and divide wear items (tires, servicing, depreciation) separately; many drivers budget an extra 5–10 cents per km beyond fuel.",
        },
      ],
      deepDive: [
        {
          heading: "Two efficiency languages, one inverse relationship",
          paragraphs: [
            "The world measures fuel consumption in two opposite directions. Liters per 100 km answers “how much fuel does covering a fixed distance cost?”, so lower is better. Miles per gallon answers “how far does a fixed amount of fuel take you?”, so higher is better. Because one is a rate and the other its reciprocal, converting between them is a division, not a linear shift.",
            "The conversion constant for US gallons is 235.2: divide it by the MPG figure and you get L/100 km — 30 MPG is about 7.8 L/100 km, and a frugal 6 L/100 km is about 39.2 MPG. (For imperial UK gallons the constant differs.) A subtle trap follows from the inverse scale: going from 10 to 20 MPG saves far more fuel per mile than going from 30 to 40 MPG, even though both are “+10 MPG”.",
            "This tool accepts whichever number your dashboard or spec sheet shows, so no manual conversion stands between you and the estimate — and mixing metric distance with MPG or miles with L/100 km would silently produce wrong answers, which is why the unit choice applies to distance, efficiency and price together.",
          ],
        },
        {
          heading: "Why estimates and receipts disagree",
          paragraphs: [
            "Official and dashboard consumption figures are measured under idealized conditions — steady speeds, mild temperatures, no payload. Real driving pushes the number up: stop-and-go traffic, cold starts (an engine warms up slowly, burning extra fuel for the first kilometers), roof racks and boxes, aggressive acceleration, and air conditioning all add consumption, and a fully loaded car climbing mountain roads adds more.",
            "A practical calibration habit: fill the tank, reset the trip counter, drive normally, and divide liters by actual distance at the next fill-up. One or two cycles of this give a personal consumption figure far more honest than any spec sheet — plug that into the calculator and the cost estimates start matching what the pump charges you.",
            "Treat the tool's total as a central estimate for highway and mixed driving, and as a floor for city-heavy trips. Tolls, parking and the non-fuel running costs (tires, servicing, depreciation) are deliberately outside the math; budget them separately for a true cost-per-kilometer.",
          ],
        },
        {
          heading: "Built for the decisions before the drive",
          paragraphs: [
            "The useful moments are all pre-departure: budgeting a week of commuting, splitting a road trip's fuel among passengers (total cost divided by people), or pricing a detour — is the cheaper supermarket 15 km away actually cheaper once the trip there costs fuel? The round-trip toggle exists because forgetting to double the distance is the most common input mistake.",
            "Cost per kilometer (or mile) is shown alongside the total because it is the comparison number: routes, cars and habits differ in total distance, so per-unit cost is what makes the comparison meaningful.",
            "The calculation runs locally in the browser — useful at rural pumps with no signal, and it means fuel prices, routes and driving patterns you enter never leave your device.",
          ],
        },
      ],
    },
    zh: {
      name: "油费计算器",
      tagline: "输入距离、油耗和油价,立即得到所需燃油、总花费和每公里成本——公制英制可切换,支持往返,全程本地计算。",
      intro: [
        "出发前先算清楚:输入行驶距离、车辆油耗(L/100 km 或 MPG)和当前油价,即可看到需要多少升/加仑、总花费和单位距离成本,还有一键往返开关帮你把距离翻倍。",
        "通勤预算、和朋友分摊自驾游费用、绕路成本对比都好用。计算在浏览器本地完成,加油站没信号也能算。",
      ],
      steps: [
        "输入单程距离(公里或英里)。",
        "填写车辆油耗和当前油价。",
        "需要时打开往返开关,查看燃油量与总费用。",
      ],
      faqs: [
        {
          q: "L/100 km 和 MPG 怎么换算?",
          a: "两者互为倒数关系:235.2 ÷ MPG 值(美制加仑)= L/100 km。因此 30 MPG ≈ 7.8 L/100 km,6 L/100 km ≈ 39.2 MPG。仪表盘显示哪种就用哪种输入。",
        },
        {
          q: "为什么实际油耗和计算结果不一样?",
          a: "官方油耗按匀速理想工况测得。市区拥堵、冷启动、车顶行李架、急加速和空调都会让真实油耗高出 10%–30%,以市区为主的行程请把结果当作下限。",
        },
        {
          q: "计算包含过路费或保养吗?",
          a: "不包含——只计算油费。想要真实的每公里成本,需另加过路费,并把轮胎、保养、折旧等损耗单独分摊;许多司机会在油费之外再预留每公里 5–10 美分。",
        },
      ],
      deepDive: [
        {
          heading: "两套油耗口径,互为倒数",
          paragraphs: [
            "全世界的油耗计量有两个方向相反的口径。L/100 km 回答“跑完固定距离要花多少油”,越低越好;MPG 回答“固定油量能跑多远”,越高越好。一个是一比距离,另一个是距离比一,互为倒数,换算靠除法而不是线性平移。",
            "美制加仑的换算常数是 235.2:用它除以 MPG 值就得到 L/100 km——30 MPG 约等于 7.8 L/100 km,省油的 6 L/100 km 约合 39.2 MPG(英制加仑常数不同)。倒数刻度还藏着一个坑:从 10 MPG 升到 20 MPG,每英里省下的油远多于从 30 升到 40,虽然都是“+10 MPG”。",
            "本工具接受仪表盘或参数表上显示的那种数字,不需要手动换算——但公制距离配 MPG、英里配 L/100 km 的混搭会悄悄算错,所以单位选择对距离、油耗、油价是一起生效的。",
          ],
        },
        {
          heading: "为什么估算和加油小票对不上",
          paragraphs: [
            "官方和仪表盘油耗都是理想工况测的——匀速、温和气温、空载。真实驾驶只会在其上追加:走走停停、冷启动(发动机升温慢,头几公里多烧油)、车顶行李架和行李箱、急加速、空调都会增加油耗,满载爬山路更多。",
            "一个实用的校准习惯:加满油、清零里程,正常开,下次加油时用升数除以实际里程。跑一两个循环得到的个人油耗数字,比任何参数表都诚实——把它填进计算器,费用估算就开始和加油小票对得上了。",
            "本工具的总费用对高速和混合路况是“中心估计”,对市区为主的行程是“下限”。过路费、停车费以及轮胎、保养、折旧等非油费开支刻意不算在内,想算真实的每公里成本请单独预算。",
          ],
        },
        {
          heading: "为出发前的决策而生",
          paragraphs: [
            "有用的时刻都在出发前:预算一周通勤、把自驾游油费按人头分摊(总费用 ÷ 人数)、给绕路定价——15 公里外的便宜超市,加上来回油费之后还便宜吗?往返开关就是为了最常见的输入错误“忘了把距离翻倍”而设计的。",
            "每公里(或每英里)成本和总费用并排显示,因为前者才是对比数字:路线、车辆、驾驶习惯的总里程不同,单位成本才有可比性。",
            "计算在浏览器本地完成——郊区没信号的加油站也能用,而且你输入的油价、路线和驾驶习惯不会离开设备。",
          ],
        },
      ],
    },
    ja: {
      name: "燃料費計算",
      tagline: "距離・燃費・燃料価格から必要な燃料量と旅行費用、1 km あたりのコストを即算出。メートル/ヤード切替、往復対応、ブラウザ内で完結。",
      intro: [
        "出発前にご納得ください。走行距離、燃費(L/100 km または MPG)、現在の燃料価格を入力すると、必要なリットル/ガロン、合計費用、距離単位あたりコストが表示され、往復チェックで距離を 2 倍にできます。",
        "通勤費の積算、ロードトリップの割り勘、迂回コストの比較に使えます。計算はブラウザ内で完結するので、ガソリンスタンドの電波のない場所でも動きます。",
      ],
      steps: [
        "片道の距離を km またはマイルで入力します。",
        "車の燃費と現在の燃料価格を入力します。",
        "必要なら往復にチェックを入れ、燃料量と費用を確認します。",
      ],
      faqs: [
        {
          q: "L/100 km と MPG はどう換算しますか?",
          a: "互いに逆数の関係です。235.2 ÷ MPG(US ガロン)= L/100 km。たとえば 30 MPG ≒ 7.8 L/100 km、6 L/100 km ≒ 39.2 MPG です。メーターに表示されているほうを入力してください。",
        },
        {
          q: "実燃費が計算結果と違うのはなぜですか?",
          a: "カタログ燃費は一定速度を想定しています。市街地渋滞・コールドスタート・ルーフボックス・急加速・エアコンで実際は 10〜30% 多くなるため、街乗り中心ならこの結果は下限と考えてください。",
        },
        {
          q: "通行料や維持費は含まれますか?",
          a: "含まれません。燃料費のみです。実質の 1 km コストには通行料を加え、タイヤ・点検・減価償却は別途按分するのが一般的で、燃料以外に 1 km あたり 5〜10 セント程度を見るドライバーも多いです。",
        },
      ],
      deepDive: [
        {
          heading: "2 つの燃費表記、互いに逆数",
          paragraphs: [
            "世界には方向が正反対の燃費表記が二つあります。L/100 km は「一定距離を走るのに燃料がいくらかかるか」で、小さいほど良い。MPG は「一定の燃料でどれだけ遠くまで行けるか」で、大きいほど良い。片方は距離あたりの量、もう片方は量あたりの距離で、互いに逆数です。換算は除算であり、線形の目盛り移動ではありません。",
            "US ガロンでの換算定数は 235.2 です。これを MPG で割ると L/100 km になります。30 MPG は約 7.8 L/100 km、省燃費の 6 L/100 km は約 39.2 MPG です(英ガロンでは定数が異なります)。逆数の目盛りには罠もあります。10 → 20 MPG の改善は、30 → 40 MPG の「+10」と同じでも、1 マイルあたりの節約量ははるかに大きい。",
            "このツールはメーターやスペック表に表示されている方の数字をそのまま受け付けます。手動換算は不要ですが、km と MPG、マイルと L/100 km を混ぜると静かに間違った答えが出るため、単位の選択は距離・燃費・価格にまとめて適用されます。",
          ],
        },
        {
          heading: "見積もりとレシートがずれる理由",
          paragraphs: [
            "公称燃費やメーター表示は理想条件で測られています。定速・穏やかな気温・空載。現実の走行はそこに上乗せします。渋滞、コールドスタート(エンジンが温まるまで最初の数 km は燃費が悪い)、ルーフボックス、急加速、エアコンが燃費を悪化させ、満載の峠越えはさらに大きく響きます。",
            "便利な較正の習慣:満タンにしてトリップメーターをリセットし、普段どおり走り、次の満タンでリットル ÷ 実走距離を出す。1〜2 サイクルで得られる自分の燃費はどのスペック表より誠実で、それを入力すれば費用の見積もりが給油の実費と一致し始めます。",
            "このツールの総額は高速・混合走行なら中心の推定、街乗り中心なら下限と考えてください。通行料・駐車料・タイヤや点検・減価償却といった燃料以外は意図的に計算外で、実質の 1 km コストには別枠で予算を取るのが正解です。",
          ],
        },
        {
          heading: "出発前の意思決定のために",
          paragraphs: [
            "便利な瞬間はすべて出発前にあります。1 週間の通勤費の積算、ロードトリップの燃料割り勘(総額 ÷ 人数)、迂回の値付け——15 km 先の安いスーパーは、往復の燃料を足しても安いのか。往復チェックがあるのは「距離を 2 倍にし忘れる」という最も多い入力ミスへの対処です。",
            "1 km(または 1 マイル)あたりコストを総額と並べて表示するのは、比較の指標だからです。ルート・車・運転習慣では総距離が違うので、単位あたりのコストだけが公平に比べられます。",
            "計算はブラウザ内で完結します。電波のない地方の給油所でも使え、入力した燃料価格や走行パターンが端末の外に出ることもありません。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de coste de combustible",
      tagline: "Distancia, consumo y precio de bomba dentro: combustible necesario, coste del viaje y coste por kilómetro o milla — métrico o imperial, con ida y vuelta.",
      intro: [
        "Planifique cualquier trayecto antes de salir: introduzca la distancia, el consumo de su coche (L/100 km o MPG) y el precio actual del combustible, y verá los litros o galones necesarios, el coste total y el coste por unidad de distancia — con un interruptor de ida y vuelta que dobla la distancia por usted.",
        "Sirve igual para presupuestar el commuting, repartir un viaje en coche entre amigos o comparar lo que cuesta un rodeo. El cálculo es local en su navegador, así que también funciona sin cobertura en la gasolinera.",
      ],
      steps: [
        "Introduzca la distancia de ida en kilómetros o millas.",
        "Añada el consumo de su vehículo y el precio actual del combustible.",
        "Active ida y vuelta si hace falta y lea los totales de combustible y coste.",
      ],
      faqs: [
        {
          q: "¿Cómo convierto entre L/100 km y MPG?",
          a: "Las dos escalas son inversas: 235,2 dividido entre el valor en MPG (galones de EE. UU.) da L/100 km. Así, 30 MPG ≈ 7,8 L/100 km y 6 L/100 km ≈ 39,2 MPG. Introduzca la cifra que muestre su cuadro de instrumentos.",
        },
        {
          q: "¿Por qué mi consumo real no coincide con el resultado?",
          a: "Las cifras oficiales suponen velocidades estables. El tráfico urbano, los arranques en frío, las bacas, las aceleraciones bruscas y el aire acondicionado pueden elevar el uso real un 10–30%, así que tome la estimación como suelo mínimo en trayectos urbanos.",
        },
        {
          q: "¿Incluye peajes o mantenimiento?",
          a: "No — solo calcula el combustible. Para un coste real por kilómetro, añada peajes y reparta aparte el desgaste (neumáticos, revisiones, depreciación); muchos conductores presupuestan 5–10 céntimos extra por km además del combustible.",
        },
      ],
      deepDive: [
        {
          heading: "Dos lenguajes de consumo, una relación inversa",
          paragraphs: [
            "El mundo mide el consumo en dos direcciones opuestas. Litros a los 100 km responde «¿cuánto combustible cuesta cubrir una distancia fija?», así que menos es mejor. Millas por galón responde «¿hasta dónde te lleva una cantidad fija de combustible?», así que más es mejor. Una es cantidad por distancia y la otra distancia por cantidad: recíprocas, con conversión por división y no por desplazamiento lineal.",
            "La constante de conversión para galones estadounidenses es 235,2: dividida por el valor en MPG da L/100 km — 30 MPG son unos 7,8 L/100 km y un frugal 6 L/100 km ronda 39,2 MPG (con galones imperiales la constante cambia). De la escala inversa nace una trampa sutil: pasar de 10 a 20 MPG ahorra mucho más combustible por milla que pasar de 30 a 40, aunque ambos sean «+10 MPG».",
            "La herramienta acepta el número que muestre su cuadro o ficha técnica, sin conversión manual de por medio — pero mezclar kilómetros con MPG o millas con L/100 km produce respuestas silenciosamente erróneas, y por eso la unidad se aplica a distancia, consumo y precio a la vez.",
          ],
        },
        {
          heading: "Por qué la estimación y el tique no cuadran",
          paragraphs: [
            "Las cifras oficiales y del cuadro se miden en condiciones idealizadas: velocidades estables, temperatura suave, sin carga. La conducción real solo añade: tráfico de parada y arranque, arranques en frío (el motor tarda en calentarse y quema extra los primeros kilómetros), bacas y cajas, aceleraciones bruscas y el aire acondicionado; un coche cargado subiendo montañas añade aún más.",
            "Un hábito práctico de calibración: llene el depósito, ponga el contador de viaje a cero, conduzca con normalidad y en el próximo repostaje divida litros entre kilómetros reales. Uno o dos ciclos producen una cifra de consumo personal más honesta que cualquier ficha — métala en la calculadora y las estimaciones empezarán a cuadrar con lo que cobra la bomba.",
            "Tome el total como estimación central para autopista y uso mixto, y como suelo para trayectos urbanos. Peajes, aparcamiento y los costes no combustible (neumáticos, revisiones, depreciación) quedan fuera a propósito; presupueste aparte para un coste real por kilómetro.",
          ],
        },
        {
          heading: "Pensada para las decisiones previas al viaje",
          paragraphs: [
            "Los momentos útiles son todos previos a la salida: presupuestar una semana de commuting, repartir la gasolina de un viaje entre pasajeros (coste total entre personas) o poner precio a un rodeo — ¿sigue siendo barato el súper a 15 km cuando el trayecto cuesta combustible? El interruptor de ida y vuelta existe porque olvidar doblar la distancia es el error de entrada más común.",
            "El coste por kilómetro (o milla) aparece junto al total porque es la cifra de comparación: rutas, coches y hábitos difieren en distancia total, y solo el coste unitario permite comparar con justicia.",
            "El cálculo corre localmente en el navegador — útil en bombas rurales sin cobertura — y las gasolineras, rutas y patrones de conducción que escriba nunca salen de su dispositivo.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de custo de combustível",
      tagline: "Distância, consumo e preço do combustível entram; litros necessários, custo da viagem e custo por km ou milha saem — métrico ou imperial, com ida e volta.",
      intro: [
        "Planeje qualquer viagem antes de sair: informe a distância, o consumo do seu carro (L/100 km ou MPG) e o preço atual do combustível, e veja os litros ou galões necessários, o custo total e o custo por unidade de distância — com um botão de ida e volta que dobra a distância para você.",
        "Serve tanto para orçar o deslocamento diário, dividir uma road trip entre amigos ou comparar o preço de um desvio. O cálculo é local no navegador, então funciona até sem sinal no posto.",
      ],
      steps: [
        "Informe a distância de ida em quilômetros ou milhas.",
        "Adicione o consumo do veículo e o preço atual do combustível.",
        "Ative ida e volta se precisar e veja os totais de combustível e custo.",
      ],
      faqs: [
        {
          q: "Como converter entre L/100 km e MPG?",
          a: "As duas escalas são inversas: 235,2 dividido pelo valor em MPG (galões dos EUA) dá L/100 km. Assim, 30 MPG ≈ 7,8 L/100 km e 6 L/100 km ≈ 39,2 MPG. Use a cifra que o painel do carro mostrar.",
        },
        {
          q: "Por que meu consumo real difere do resultado?",
          a: "Os números oficiais presumem velocidades constantes. Trânsito urbano, partida a frio, rack de teto, acelerações fortes e ar-condicionado podem elevar o consumo real em 10–30%, então trate a estimativa como piso para viagens urbanas.",
        },
        {
          q: "O cálculo inclui pedágio ou manutenção?",
          a: "Não — só o combustível. Para um custo real por quilômetro, some pedágios e rateie separadamente o desgaste (pneus, revisões, depreciação); muitos motoristas reservam de 5 a 10 centavos extras por km além do combustível.",
        },
      ],
      deepDive: [
        {
          heading: "Duas linguagens de consumo, uma relação inversa",
          paragraphs: [
            "O mundo mede o consumo em duas direções opostas. Litros por 100 km responde «quanto combustível custa cobrir uma distância fixa?», então menos é melhor. Milhas por galão responde «até onde uma quantidade fixa de combustível te leva?», então mais é melhor. Uma é quantidade por distância e a outra distância por quantidade: recíprocas, com conversão por divisão, e não por deslocamento linear.",
            "A constante de conversão para galões americanos é 235,2: dividida pelo valor em MPG dá L/100 km — 30 MPG são cerca de 7,8 L/100 km e um frugal 6 L/100 km equivale a uns 39,2 MPG (com galões imperiais a constante muda). Da escala inversa nasce uma armadilha sutil: ir de 10 para 20 MPG economiza muito mais combustível por milha que ir de 30 para 40, embora ambos sejam «+10 MPG».",
            "A ferramenta aceita o número que o painel ou a ficha técnica mostrar, sem conversão manual no meio — mas misturar quilômetros com MPG ou milhas com L/100 km produz respostas silenciosamente erradas, e por isso a unidade vale para distância, consumo e preço juntos.",
          ],
        },
        {
          heading: "Por que a estimativa e o recibo não batem",
          paragraphs: [
            "Os números oficiais e do painel são medidos em condições idealizadas: velocidades estáveis, clima ameno, sem carga. A direção real só acrescenta: trânsito de para-e-anda, partida a frio (o motor demora a aquecer e queima extra nos primeiros quilômetros), rack e caixa de teto, acelerações fortes e ar-condicionado; um carro carregado subindo serra acrescenta ainda mais.",
            "Um hábito prático de calibragem: encha o tanque, zere o hodômetro parcial, dirija normalmente e no próximo abastecimento divida litros por quilômetros reais. Um ou dois ciclos produzem um número de consumo pessoal mais honesto que qualquer ficha — coloque-o na calculadora e as estimativas começam a bater com o que a bomba cobra.",
            "Trate o total como estimativa central para rodovia e uso misto, e como piso para viagens urbanas. Pedágio, estacionamento e os custos fora do combustível (pneus, revisões, depreciação) ficam de fora de propósito; reserve à parte para um custo real por quilômetro.",
          ],
        },
        {
          heading: "Feita para as decisões antes da viagem",
          paragraphs: [
            "Os momentos úteis são todos anteriores à partida: orçar uma semana de deslocamento, dividir a gasolina de uma viagem entre os passageiros (custo total ÷ pessoas) ou precificar um desvio — o mercado 15 km mais longe continua barato quando a ida e volta custa combustível? O botão de ida e volta existe porque esquecer de dobrar a distância é o erro de entrada mais comum.",
            "O custo por quilômetro (ou milha) aparece junto ao total porque é o número de comparação: rotas, carros e hábitos diferem na distância total, e só o custo unitário permite comparar com justiça.",
            "O cálculo roda localmente no navegador — útil em postos rurais sem sinal — e os preços, rotas e padrões de direção que você digitar nunca saem do aparelho.",
          ],
        },
      ],
    },
  },
});
