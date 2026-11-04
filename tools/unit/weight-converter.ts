import { unitTool } from "../_lib/unit-tool";

export default unitTool({
  slug: "weight-converter",
  icon: "calc",
  cat: "weight",
  
  related: ["length-converter", "area-converter", "volume-converter", "data-converter", "energy-converter", "time-converter", "temperature-converter", "speed-converter", "pressure-converter"],
  copy: {
    en: {
      name: "Weight Converter",
      tagline:
        "Convert kilograms, pounds, ounces, stones and grams instantly — free, private and works offline.",
      intro: [
        "Shoppers comparing a 5 lb bag of flour with a 2 kg one, travelers checking airline baggage allowances in kilograms against bathroom scales in pounds, athletes converting bodyweight between systems for training plans, and kitchens scaling recipes across grams and ounces all need weight conversion.",
        "Six significant digits: the pound is defined as exactly 0.45359237 kg by international agreement, so pounds↔kilograms never drift. Mass and force are kept distinct — kilograms and pounds here are always mass; newtons belong to the force world and are not mixed in.",
        "The kilogram is the SI base unit; every other unit has an exact factor (1 oz = 28.349523125 g exactly, a stone is exactly 14 lb). Precious-metal traders use troy ounces (31.1034768 g exactly) — kept separate from avoirdupois ounces to prevent the costly confusion that occasionally hits gold pricing.",
        "Weight confusion between pounds, kilograms, stones and ounces crosses cultures daily — and the troy/avoirdupois ounce trap trips even professionals. This converter shows all common mass units together from one input, with each system labeled clearly.",
      ],
      faq: [
        {
          q: "How many pounds is 1 kg?",
          a: "One kilogram is 2.20462 pounds (1 lb = 0.45359237 kg exactly). Enter 1 kg → lb above to see it.",
        },
        {
          q: "What is a stone in kg?",
          a: "One stone (used in the UK for body weight) is 6.35029318 kilograms — exactly 14 pounds.",
        },
      ],
    },
    zh: {
      name: "重量换算",
      tagline: "千克、磅、盎司、英石、克等重量单位即时互转,免费、离线可用、隐私无忧。",
      intro: [
        "公制与英制重量单位一站换算:千克、磅、盎司、英石、克拉等,输入即算,所有单位同时显示。",
        "适合对照外国食谱烘焙、核对行李限重、记录健身训练重量以及估算运费。",
      ],
      faq: [
        {
          q: "1 千克等于多少磅?",
          a: "1 千克 = 2.20462 磅(精确值:1 磅 = 0.45359237 千克)。在上方输入 1 kg → lb 即可查看。",
        },
        {
          q: "一英石等于多少千克?",
          a: "1 英石(stone,英国常用体重单位)= 6.35029318 千克,即整 14 磅。",
        },
      ],
    },
    ja: {
      name: "重さ換算",
      tagline: "キログラム・ポンド・オンス・ストーン・グラムをブラウザ内で即時換算。無料・オフライン対応。",
      intro: [
        "メートル法とヤード・ポンド法の重量単位をまとめて変換:キログラム、ポンド、オンス、ストーン、カラットなど、入力しながらすべて再計算されます。",
        "海外レシピの材料計量、受託荷物の重量制限チェック、トレーニング記録、送料の概算に便利です。",
      ],
      faq: [
        {
          q: "1 kg は何ポンド?",
          a: "1 キログラム = 2.20462 ポンドです(正確には 1 ポンド = 0.45359237 kg)。上で 1 kg → lb を入力して確認できます。",
        },
        {
          q: "1 ストーンは何 kg?",
          a: "1 ストーン(英国の体重単位)= 6.35029318 キログラム、ちょうど 14 ポンドです。",
        },
      ],
    },
    es: {
      name: "Conversor de peso",
      tagline:
        "Convierte kilogramos, libras, onzas, stones y gramos al instante: gratis, privado y sin conexión.",
      intro: [
        "Cambia entre unidades métricas e imperiales de peso en un solo sitio: kilogramos, libras, onzas, stones y quilates, todo recalculado al escribir.",
        "Práctico para cocinar con recetas extranjeras, revisar límites de equipaje, registrar entrenamientos y calcular envíos.",
      ],
      faq: [
        {
          q: "¿Cuántas libras son 1 kg?",
          a: "Un kilogramo son 2,20462 libras (1 lb = 0,45359237 kg exactos). Introduce 1 kg → lb arriba para verlo.",
        },
        {
          q: "¿Cuánto es un stone en kg?",
          a: "Un stone (usado en Reino Unido para el peso corporal) son 6,35029318 kilogramos: exactamente 14 libras.",
        },
      ],
    },
    pt: {
      name: "Conversor de peso",
      tagline:
        "Converta quilogramas, libras, onças, stones e gramas na hora — grátis, privado e offline.",
      intro: [
        "Alterne entre unidades métricas e imperiais de peso num só lugar: quilogramas, libras, onças, stones e quilates, tudo recalculado enquanto você digita.",
        "Prático para cozinhar com receitas estrangeiras, conferir o limite de bagagem, registrar treinos e estimar fretes.",
      ],
      faq: [
        {
          q: "Quantas libras tem 1 kg?",
          a: "Um quilograma tem 2,20462 libras (1 lb = 0,45359237 kg exatos). Digite 1 kg → lb acima para ver.",
        },
        {
          q: "Quanto é um stone em kg?",
          a: "Um stone (usado no Reino Unido para peso corporal) tem 6,35029318 quilogramas — exatamente 14 libras.",
        },
      ],
    },
  },
});
