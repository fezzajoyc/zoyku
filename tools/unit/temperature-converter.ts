import { unitTool } from "../_lib/unit-tool";

export default unitTool({
  slug: "temperature-converter",
  icon: "swap",
  cat: "temperature",
  
  related: ["length-converter", "weight-converter", "speed-converter", "pressure-converter", "energy-converter", "area-converter", "data-converter", "volume-converter", "time-converter"],
  copy: {
    en: {
      name: "Temperature Converter",
      tagline: "Celsius to Fahrenheit and Kelvin, instantly. Live results plus freezing and boiling reference points.",
      intro: [
        "Convert Celsius, Fahrenheit and Kelvin in one step. Unlike linear units, temperature scales need offset formulas — this tool applies them correctly, including below-zero values.",
        "Good for recipes with foreign oven settings, weather reports, lab work and HVAC specifications.",
      ],
      faq: [
        {
          q: "How do you convert Celsius to Fahrenheit?",
          a: "Multiply by 9, divide by 5, then add 32: °F = °C × 9⁄5 + 32. For example, 20 °C = 68 °F. The tool does this for you and shows Kelvin too.",
        },
        {
          q: "What temperature are Fahrenheit and Celsius equal?",
          a: "At −40 degrees: −40 °C = −40 °F. Enter −40 and switch the units to see it.",
        },
      ],
    },
    zh: {
      name: "温度换算",
      tagline: "摄氏度、华氏度、开尔文一步互转,含冰点沸点参考,零下温度同样精确,浏览器本地运行。",
      intro: [
        "摄氏、华氏、开尔文一步换算。温度不是简单的倍数关系,需要带偏移的公式——这里按正确公式处理,零下温度同样精确。",
        "适合对照外国烤箱温度、看懂天气预报、实验室工作和暖通参数换算。",
      ],
      faq: [
        {
          q: "摄氏度怎么换算成华氏度?",
          a: "先乘 9、除以 5,再加 32:°F = °C × 9⁄5 + 32。例如 20 °C = 68 °F。工具会自动完成,并同时显示开尔文。",
        },
        {
          q: "华氏度和摄氏度在几度时相等?",
          a: "在 −40 度:−40 °C = −40 °F。输入 −40 再切换单位即可看到。",
        },
      ],
    },
    ja: {
      name: "温度換算",
      tagline: "摂氏・華氏・ケルビンを即時換算。氷点と沸点の参考値つき、マイナスの温度も正確。",
      intro: [
        "摂氏・華氏・ケルビンをワンステップで変換。温度は単純な倍率ではなくオフセット付きの式が必要で、このツールは 0 度未満も含めて正しく処理します。",
        "海外レシピのオーブン温度、天気予報、実験、空調仕様の確認に便利です。",
      ],
      faq: [
        {
          q: "摂氏を華氏に変換するには?",
          a: "9 を掛けて 5 で割り、32 を足します:°F = °C × 9⁄5 + 32。例:20 °C = 68 °F。ツールが自動計算し、ケルビンも表示します。",
        },
        {
          q: "華氏と摂氏が等しくなる温度は?",
          a: "−40 度です:−40 °C = −40 °F。−40 を入力して単位を切り替えると確認できます。",
        },
      ],
    },
    es: {
      name: "Conversor de temperatura",
      tagline:
        "Celsius a Fahrenheit y Kelvin al instante, con puntos de congelación y ebullición de referencia.",
      intro: [
        "Convierte Celsius, Fahrenheit y Kelvin en un paso. A diferencia de las unidades lineales, las escalas de temperatura necesitan fórmulas con desfase; esta herramienta las aplica bien, incluso bajo cero.",
        "Útil para recetas con hornos extranjeros, el parte meteorológico, trabajo de laboratorio y especificaciones de climatización.",
      ],
      faq: [
        {
          q: "¿Cómo se convierte Celsius a Fahrenheit?",
          a: "Multiplica por 9, divide entre 5 y suma 32: °F = °C × 9⁄5 + 32. Por ejemplo, 20 °C = 68 °F. La herramienta lo hace y muestra Kelvin también.",
        },
        {
          q: "¿A qué temperatura coinciden Fahrenheit y Celsius?",
          a: "A −40 grados: −40 °C = −40 °F. Introduce −40 y cambia las unidades para verlo.",
        },
      ],
    },
    pt: {
      name: "Conversor de temperatura",
      tagline:
        "Celsius para Fahrenheit e Kelvin na hora, com pontos de congelamento e ebulição de referência.",
      intro: [
        "Converta Celsius, Fahrenheit e Kelvin num passo. Diferente das unidades lineares, as escalas de temperatura exigem fórmulas com deslocamento — a ferramenta aplica tudo certo, inclusive abaixo de zero.",
        "Bom para receitas com fornos estrangeiros, previsão do tempo, trabalho de laboratório e especificações de climatização.",
      ],
      faq: [
        {
          q: "Como converter Celsius para Fahrenheit?",
          a: "Multiplique por 9, divida por 5 e some 32: °F = °C × 9⁄5 + 32. Por exemplo, 20 °C = 68 °F. A ferramenta faz isso e mostra Kelvin também.",
        },
        {
          q: "A que temperatura Fahrenheit e Celsius se igualam?",
          a: "A −40 graus: −40 °C = −40 °F. Digite −40 e troque as unidades para conferir.",
        },
      ],
    },
  },
});
