import { unitTool } from "../_lib/unit-tool";

export default unitTool({
  slug: "energy-converter",
  icon: "sparkle",
  cat: "energy",
  related: ["pressure-converter", "weight-converter", "temperature-converter", "data-converter", "area-converter", "volume-converter", "time-converter", "speed-converter", "length-converter"],
  copy: {
    en: {
      name: "Energy Converter",
      tagline: "Calories, kilojoules, joules, kWh, Wh and BTU — food labels, electricity bills and physics in one place.",
      intro: [
        "Nutritionists comparing food calories (kcal) with joules on EU labels, engineers converting kWh to megajoules for energy audits, physicists working in electronvolts, and homeowners comparing heater outputs in BTU against air conditioners in watts all cross energy unit systems.",
        "Six significant digits with definitions stated: the thermochemical calorie is exactly 4.184 J (the definition used here), and 1 kWh is exactly 3.6 MJ by definition — a rare exactness worth knowing when reading electricity bills.",
        "The joule is the SI unit; every factor is a defined constant (1 cal = 4.184 J, 1 BTU ≈ 1,055.06 J with the ISO value, 1 eV = 1.602176634×10⁻¹⁹ J exact per the 2019 SI redefinition). Watt-hours convert exactly because they are joules × 3,600.",
        "Energy spans nutrition, engineering and physics, each with its own units — calories, kWh, BTU, eV — and comparing them manually invites errors. This converter displays them together: type one value and see joules, calories, kilowatt-hours, BTU and electronvolts at once.",
      ],
      faq: [
        {
          q: "Is a calorie the same as a kilocalorie?",
          a: "No. 1 kcal = 1000 cal. Food labels saying 'Calorie' (capital C) actually mean kilocalories. Enter 1 kcal → cal to verify.",
        },
        {
          q: "How many kWh is 1 BTU?",
          a: "1 BTU = 0.000293071 kWh. A 10,000 BTU air conditioner running for one hour uses about 2.93 kWh.",
        },
      ],
    },
    zh: {
      name: "能量换算",
      tagline: "卡路里、千焦、焦耳、千瓦时、瓦时、BTU 互转——食品标签、电费单、物理题一站解决。",
      intro: [
        "跨场景换算能量单位:食品热量(kcal)与化学热量(cal)、用电用 kWh、制热用 BTU、物理计算用焦耳。",
        "明确区分 cal 与 kcal——很多营养标签误读就出在这里——并采用精确的标准系数。",
      ],
      faq: [
        {
          q: "卡路里和千卡是一回事吗?",
          a: "不是。1 kcal = 1000 cal。食品标签上的“卡路里”(大写 Calorie)实际指千卡。输入 1 kcal → cal 即可验证。",
        },
        {
          q: "1 BTU 等于多少千瓦时?",
          a: "1 BTU = 0.000293071 kWh。一台 10000 BTU 的空调运行一小时约耗电 2.93 kWh。",
        },
      ],
    },
    ja: {
      name: "エネルギー換算",
      tagline: "カロリー・キロジュール・ジュール・kWh・Wh・BTU を換算。食品表示も電気代も物理も。",
      intro: [
        "文脈をまたいでエネルギーの単位を変換:食品カロリー(kcal)と化学カロリー(cal)、電力は kWh、暖房は BTU、物理はジュール。",
        "cal と kcal を明確に区別(ダイエット表示の誤解のもと)し、標準の正確な係数を使います。",
      ],
      faq: [
        {
          q: "カロリーとキロカロリーは同じ?",
          a: "違います。1 kcal = 1000 cal。食品表示の「カロリー」(大文字 Calorie)は実際にはキロカロリーです。1 kcal → cal を入力して確認できます。",
        },
        {
          q: "1 BTU は何 kWh?",
          a: "1 BTU = 0.000293071 kWh。10,000 BTU のエアコンを 1 時間動かすと約 2.93 kWh 消費します。",
        },
      ],
    },
    es: {
      name: "Conversor de energía",
      tagline:
        "Calorías, kilojulios, julios, kWh, Wh y BTU: etiquetas de alimentos, factura de la luz y física.",
      intro: [
        "Convierte energía entre contextos: calorías de alimentos (kcal) frente a calorías de química (cal), electricidad en kWh, calefacción en BTU, física en julios.",
        "Distinción clara entre cal y kcal —el origen de muchos malentendidos con etiquetas— con factores estándar exactos.",
      ],
      faq: [
        {
          q: "¿Una caloría es lo mismo que una kilocaloría?",
          a: "No. 1 kcal = 1000 cal. Las etiquetas que dicen «Caloría» (con mayúscula) se refieren en realidad a kilocalorías. Introduce 1 kcal → cal para comprobarlo.",
        },
        {
          q: "¿Cuántos kWh son 1 BTU?",
          a: "1 BTU = 0,000293071 kWh. Un aire acondicionado de 10.000 BTU durante una hora consume unos 2,93 kWh.",
        },
      ],
    },
    pt: {
      name: "Conversor de energia",
      tagline:
        "Calorias, quilojoules, joules, kWh, Wh e BTU — rótulos de alimentos, conta de luz e física.",
      intro: [
        "Converta energia entre contextos: calorias de alimentos (kcal) vs calorias da química (cal), eletricidade em kWh, aquecimento em BTU, física em joules.",
        "Distinção clara entre cal e kcal — a raiz de muita confusão em rótulos — com fatores padrão exatos.",
      ],
      faq: [
        {
          q: "Caloria é a mesma coisa que quilocaloria?",
          a: "Não. 1 kcal = 1000 cal. Rótulos que dizem “Caloria” (com C maiúsculo) na verdade significam quilocalorias. Digite 1 kcal → cal para conferir.",
        },
        {
          q: "Quantos kWh tem 1 BTU?",
          a: "1 BTU = 0,000293071 kWh. Um ar-condicionado de 10.000 BTU ligado por uma hora consome cerca de 2,93 kWh.",
        },
      ],
    },
  },
});
