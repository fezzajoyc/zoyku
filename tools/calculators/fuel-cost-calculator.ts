import { CalcEngineBasic } from "../_engines/calc-engine-basic";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "fuel-cost-calculator",
  category: "utility",
  icon: "calc",
  engine: { component: CalcEngineBasic, props: { kind: "fuel" } },
  related: ["tip-calculator", "percentage-calculator", "profit-calculator", "length-converter"],
  copy: {
    en: {
      name: "Fuel Cost Calculator",
      tagline: "Distance, efficiency and pump price in: fuel needed, trip cost and cost per kilometer or mile out — metric or imperial, with round trip.",
      intro: [
        "Plan any drive before you leave: enter the distance, your car's consumption (L/100 km or MPG) and the current fuel price, and see the liters or gallons required, the total cost and the cost per unit of distance — plus a round-trip toggle that doubles the distance for you.",
        "It works equally well for commuting budgets, splitting a road trip between friends, or comparing a detour's price. The math is local to your browser, so it also works with no signal at the gas station.",
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
    },
  },
});
