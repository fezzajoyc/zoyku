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
        "Convert pressure units used by different industries: psi for tire gauges, bar for European specs, pascal and kPa in engineering, mmHg in medicine and meteorology.",
        "All factors are exact by definition where the standard defines them exactly (e.g. 1 atm = 101,325 Pa).",
      ],
      faq: [
        {
          q: "How do you convert psi to bar?",
          a: "1 bar = 14.5038 psi, so divide psi by 14.5038. A typical car tire at 32 psi is about 2.21 bar.",
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
    },
  },
});
