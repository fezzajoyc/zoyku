import { unitTool } from "../_lib/unit-tool";

export default unitTool({
  slug: "area-converter",
  icon: "layers",
  cat: "area",
  related: ["length-converter", "volume-converter", "weight-converter", "speed-converter", "energy-converter", "data-converter", "time-converter", "temperature-converter", "pressure-converter"],
  copy: {
    en: {
      name: "Area Converter",
      tagline: "Square meters, square feet, acres, hectares and more — for real estate, land and flooring.",
      intro: [
        "Convert land and surface units across systems: square meters, square feet, acres, hectares and square miles, all shown at once for any input.",
        "Typical uses: comparing property listings from different countries, planning gardens and farms, estimating flooring or paint coverage.",
      ],
      faq: [
        {
          q: "How big is one acre in square meters?",
          a: "One acre = 4,046.86 m², or about 43,560 square feet. A hectare is 2.471 acres.",
        },
      ],
    },
    zh: {
      name: "面积换算",
      tagline: "平方米、平方英尺、英亩、公顷等面积单位互转,买房看地铺地板都用得上。",
      intro: [
        "跨体系换算土地与表面单位:平方米、平方英尺、英亩、公顷、平方英里,输入任意数值全部同时显示。",
        "典型用途:对比不同国家的房产面积、规划庭院农田、估算地板与涂料用量。",
      ],
      faq: [
        {
          q: "一英亩是多少平方米?",
          a: "1 英亩 = 4,046.86 平方米,约 43,560 平方英尺。1 公顷 = 2.471 英亩。",
        },
      ],
    },
    ja: {
      name: "面積換算",
      tagline: "平方メートル・平方フィート・エーカー・ヘクタールなどを換算。不動産・土地・床材に。",
      intro: [
        "土地と表面積の単位を体系をまたいで変換:平方メートル、平方フィート、エーカー、ヘクタール、平方マイルを一度に表示します。",
        "国の違う物件の広さ比較、庭や農地のプランニング、床材や塗料の量の見積もりに。",
      ],
      faq: [
        {
          q: "1 エーカーは何平方メートル?",
          a: "1 エーカー = 4,046.86 m²(約 43,560 平方フィート)。ヘクタールは 2.471 エーカーです。",
        },
      ],
    },
    es: {
      name: "Conversor de área",
      tagline:
        "Metros cuadrados, pies cuadrados, acres, hectáreas y más: para inmobiliaria, terreno y suelo.",
      intro: [
        "Convierte unidades de superficie entre sistemas: metros cuadrados, pies cuadrados, acres, hectáreas y millas cuadradas, todas a la vez para cualquier valor.",
        "Usos típicos: comparar anuncios inmobiliarios de países distintos, planificar huertos y fincas, estimar suelo o pintura.",
      ],
      faq: [
        {
          q: "¿Cuánto mide un acre en metros cuadrados?",
          a: "Un acre = 4.046,86 m², unos 43.560 pies cuadrados. Una hectárea son 2,471 acres.",
        },
      ],
    },
    pt: {
      name: "Conversor de área",
      tagline:
        "Metros quadrados, pés quadrados, acres, hectares e mais — para imóveis, terrenos e pisos.",
      intro: [
        "Converta unidades de superfície entre sistemas: metros quadrados, pés quadrados, acres, hectares e milhas quadradas, todas de uma vez para qualquer valor.",
        "Usos típicos: comparar anúncios imobiliários de países diferentes, planejar hortas e fazendas, estimar piso ou tinta.",
      ],
      faq: [
        {
          q: "Qual o tamanho de um acre em metros quadrados?",
          a: "Um acre = 4.046,86 m², cerca de 43.560 pés quadrados. Um hectare tem 2,471 acres.",
        },
      ],
    },
  },
});
