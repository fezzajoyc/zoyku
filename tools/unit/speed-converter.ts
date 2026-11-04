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
        "Convert speed units used by different countries and sports: kilometers per hour, miles per hour, knots for sailing and aviation, meters per second for physics.",
        "Useful when renting a car abroad, reading a marine forecast or comparing treadmill and outdoor paces.",
      ],
      faq: [
        {
          q: "How fast is 100 km/h in mph?",
          a: "100 km/h = 62.14 mph. The exact factor is 1 mph = 1.609344 km/h.",
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
    },
  },
});
