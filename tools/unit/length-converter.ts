import { unitTool } from "../_lib/unit-tool";

export default unitTool({
  slug: "length-converter",
  icon: "ruler",
  cat: "length",
  
  related: ["weight-converter", "area-converter", "speed-converter", "temperature-converter", "energy-converter", "data-converter", "volume-converter", "time-converter", "pressure-converter"],
  copy: {
    en: {
      name: "Length Converter",
      tagline:
        "Convert length and distance instantly: meters, feet, inches, miles, centimeters and more — right in your browser.",
      intro: [
        "Travelers converting luggage dimensions from inches to centimeters for airline limits, woodworkers translating imperial plans to metric stock, runners tracking miles versus kilometers, and designers converting CSS units all use length conversion constantly — it's the most-converted physical quantity in the world.",
        "Six significant digits by default: 1 inch is exactly 2.54 cm and 1 mile is exactly 1,609.344 m — both defined, not measured, since the 1959 international yard agreement. Converting inches → feet → meters in a chain loses nothing because every factor is exact.",
        "The meter is the SI base unit; every imperial unit has an exact metric definition (1 ft = 0.3048 m exactly). Nautical miles, light years and astronomical units use their standard IAU/international values, so even specialized conversions stay authoritative rather than approximate.",
        "Instead of one fixed pair, every length unit from millimeters to nautical miles updates simultaneously as you type. That makes the tool useful for shopping, construction, homework and travel planning alike — anywhere you need more than two units at once.",
      ],
      faq: [
        {
          q: "How many cm in an inch?",
          a: "One inch is exactly 2.54 centimeters, by international agreement since 1959. Enter 1 in → cm above to verify.",
        },
      ],
    },
    zh: {
      name: "长度换算",
      tagline: "米、英尺、英寸、英里、厘米等长度单位即时互转,浏览器本地运行,结果秒出。",
      intro: [
        "在公制与英制长度单位之间自由换算,不用再去搜索框里打字。输入任意数值,米、英尺、英寸、英里等所有单位一次性显示。",
        "适合装修量尺、旅行规划、工程图纸和作业验算——需要快速精确换算的场景都好用。",
      ],
      faq: [
        {
          q: "一英寸等于多少厘米?",
          a: "1 英寸 = 2.54 厘米,这是 1959 年国际协议确定的精确值。在上方输入 1 in → cm 即可验证。",
        },
      ],
    },
    ja: {
      name: "長さ換算",
      tagline: "メートル・フィート・インチ・マイルなど長さの単位をブラウザ内で即時換算。",
      intro: [
        "メートル法とヤード・ポンド法を検索ボックスに入力せずに相互変換。数値を入れると、メートル・フィート・インチ・マイルなどすべての単位が一度に表示されます。",
        "DIY、旅行の下調べ、図面の確認、宿題の検算など、正確な換算が必要な場面で活用できます。",
      ],
      faq: [
        {
          q: "1 インチは何センチ?",
          a: "1 インチ = 2.54 センチです(1959 年に国際協定で確定)。上で 1 in → cm を入力して確認できます。",
        },
      ],
    },
    es: {
      name: "Conversor de longitud",
      tagline:
        "Convierte metros, pies, pulgadas, millas y centímetros al instante, directamente en tu navegador.",
      intro: [
        "Convierte entre unidades métricas e imperiales sin escribir en un buscador. Introduce una cantidad y verá metros, pies, pulgadas y millas al mismo tiempo.",
        "Útil para bricolaje, viajes, planos técnicos y deberes: cualquier situación donde una conversión exacta supere a la intuición.",
      ],
      faq: [
        {
          q: "¿Cuántos cm tiene una pulgada?",
          a: "Una pulgada son exactamente 2,54 centímetros, según el acuerdo internacional de 1959. Introduce 1 in → cm arriba para comprobarlo.",
        },
      ],
    },
    pt: {
      name: "Conversor de comprimento",
      tagline:
        "Converta metros, pés, polegadas, milhas e centímetros na hora, direto no navegador.",
      intro: [
        "Converta entre unidades métricas e imperiais sem digitar num buscador. Digite um valor e veja metros, pés, polegadas e milhas de uma vez.",
        "Útil para reformas, viagens, desenhos técnicos e dever de escola — sempre que uma conversão exata vale mais que um palpite.",
      ],
      faq: [
        {
          q: "Quantos cm tem uma polegada?",
          a: "Uma polegada tem exatamente 2,54 centímetros, pelo acordo internacional de 1959. Digite 1 in → cm acima para conferir.",
        },
      ],
    },
  },
});
