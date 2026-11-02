import { CalcEngineBasic } from "../_engines/calc-engine-basic";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "bmi-calculator",
  category: "utility",
  icon: "check",
  engine: { component: CalcEngineBasic, props: { kind: "bmi" } },
  related: ["age-calculator", "percentage-calculator", "fuel-cost-calculator", "profit-calculator"],
  copy: {
    en: {
      name: "BMI Calculator",
      tagline: "Calculate Body Mass Index from metric or imperial inputs and see exactly where the value lands in the official WHO weight categories.",
      intro: [
        "Enter height and weight in centimeters and kilograms, or feet, inches and pounds, and the calculator shows your Body Mass Index to one decimal together with the WHO category it falls into — underweight, normal, overweight or obesity — with the matching row highlighted in the reference table.",
        "The result updates as you type, so it is easy to see how a few kilograms move you between bands. BMI is a screening measure, not a diagnosis: it does not distinguish muscle from fat.",
      ],
      steps: [
        "Choose metric (cm + kg) or imperial (ft + in + lb) units.",
        "Type your height and weight.",
        "Read your BMI, its WHO category and the full reference table.",
      ],
      faqs: [
        {
          q: "What are the WHO BMI ranges?",
          a: "The World Health Organization defines: below 18.5 underweight, 18.5–24.9 normal weight, 25.0–29.9 overweight, and 30.0 and above obesity. The same cut-offs apply to adult men and women.",
        },
        {
          q: "How is BMI calculated?",
          a: "BMI is weight in kilograms divided by height in meters squared (kg/m²). For imperial units the tool converts feet, inches and pounds internally, so the result is identical either way.",
        },
        {
          q: "Why does BMI not fit athletes?",
          a: "Muscle is denser than fat, so very muscular people can score “overweight” while carrying little excess fat. Treat BMI as a quick population-level screen and combine it with waist measurement or body composition for a fuller picture.",
        },
      ],
    },
    zh: {
      name: "BMI 计算器",
      tagline: "支持公制/英制输入的体重指数(BMI)计算,结果对照 WHO 官方体重分级表,一键看出自己处于哪一档。",
      intro: [
        "按厘米+千克或英尺英寸+磅输入身高体重,计算器给出保留一位小数的 BMI 值,并对照 WHO 官方分级(偏瘦、正常、超重、肥胖)在参考表中高亮你所在的行。",
        "结果随输入实时更新,轻松看出增减几公斤会跨入哪一档。BMI 是筛查指标而非诊断:它无法区分肌肉和脂肪。",
      ],
      steps: [
        "选择公制(cm + kg)或英制(英尺 + 英寸 + 磅)。",
        "输入身高和体重。",
        "查看 BMI、对应 WHO 分级和完整对照表。",
      ],
      faqs: [
        {
          q: "WHO 的 BMI 分级标准是什么?",
          a: "世界卫生组织的定义为:低于 18.5 为偏瘦,18.5–24.9 为正常,25.0–29.9 为超重,30.0 及以上为肥胖。同一标准适用于成年男性和女性。",
        },
        {
          q: "BMI 是怎么计算的?",
          a: "BMI = 体重(千克)÷ 身高(米)的平方(kg/m²)。英制输入会在内部自动换算成公制,两种方式结果完全一致。",
        },
        {
          q: "为什么 BMI 不适合运动员?",
          a: "肌肉密度高于脂肪,肌肉发达的人即使体脂不高也可能被判为“超重”。请把 BMI 当作人群层面的快速筛查,再结合腰围或体成分分析来判断。",
        },
      ],
    },
    ja: {
      name: "BMI 計算",
      tagline: "メートル法・ヤード・ポンド法のどちらでも BMI を計算し、WHO の公式体重区分のどこに当てはまるかをひと目で判定。",
      intro: [
        "身長と体重を cm + kg、またはフィート・インチ + ポンドで入力すると、小数 1 桁の BMI と WHO 区分(低体重・普通・過体重・肥満)を判定し、基準表の該当行をハイライトします。",
        "結果は入力に合わせてリアルタイム更新されるので、体重が数キロ変わると区分がどう動くかもすぐわかります。BMI はスクリーニング指標であり診断ではありません。筋肉と脂肪は区別できません。",
      ],
      steps: [
        "メートル法(cm + kg)かヤード・ポンド法(ft + in + lb)を選びます。",
        "身長と体重を入力します。",
        "BMI・WHO 区分・基準表全体を確認します。",
      ],
      faqs: [
        {
          q: "WHO の BMI 区分は?",
          a: "世界保健機関の定義は、18.5 未満が低体重、18.5〜24.9 が普通体重、25.0〜29.9 が過体重、30.0 以上が肥満です。成人の男女で同じ基準を使います。",
        },
        {
          q: "BMI の計算式は?",
          a: "BMI = 体重(kg)÷ 身長(m)の 2 乗(kg/m²)です。ヤード・ポンド法の入力は内部でメートル法に換算するため、どちらで入力しても結果は同じです。",
        },
        {
          q: "なぜ運動選手に BMI が合わないのですか?",
          a: "筋肉は脂肪より密度が高いため、体脂肪が少なくても筋肉質な人は「過体重」と判定されがちです。BMI は集団レベルの簡易スクリーニングと考え、腹囲や体組成の測定と合わせて判断してください。",
        },
      ],
    },
    es: {
      name: "Calculadora de IMC",
      tagline: "Calcule su índice de masa corporal con unidades métricas o imperiales y vea en qué categoría oficial de la OMS cae el resultado.",
      intro: [
        "Introduzca altura y peso en centímetros y kilogramos, o en pies, pulgadas y libras: la calculadora muestra el IMC con un decimal y la categoría de la OMS en la que cae — bajo peso, normal, sobrepeso u obesidad — resaltando la fila correspondiente de la tabla de referencia.",
        "El resultado se actualiza mientras escribe, así que verá enseguida cómo unos kilos de más o de menos cambian de franja. El IMC es una medida de cribado, no un diagnóstico: no distingue músculo de grasa.",
      ],
      steps: [
        "Elija unidades métricas (cm + kg) o imperiales (ft + in + lb).",
        "Escriba su altura y su peso.",
        "Lea su IMC, su categoría OMS y la tabla de referencia completa.",
      ],
      faqs: [
        {
          q: "¿Cuáles son los rangos de IMC de la OMS?",
          a: "La Organización Mundial de la Salud define: menos de 18,5 bajo peso; 18,5–24,9 peso normal; 25,0–29,9 sobrepeso; y 30,0 o más obesidad. Los mismos cortes valen para hombres y mujeres adultos.",
        },
        {
          q: "¿Cómo se calcula el IMC?",
          a: "El IMC es el peso en kilogramos dividido por la altura en metros al cuadrado (kg/m²). Con unidades imperiales la herramienta convierte pies, pulgadas y libras internamente: el resultado es idéntico.",
        },
        {
          q: "¿Por qué el IMC no encaja con deportistas?",
          a: "El músculo es más denso que la grasa, así que personas muy musculosas pueden salir «sobrepeso» con poca grasa extra. Use el IMC como cribado rápido a nivel poblacional y combínelo con el perímetro de cintura o la composición corporal.",
        },
      ],
    },
    pt: {
      name: "Calculadora de IMC",
      tagline: "Calcule o índice de massa corporal com unidades métricas ou imperiais e veja em qual categoria oficial da OMS o resultado se encaixa.",
      intro: [
        "Informe altura e peso em centímetros e quilos, ou em pés, polegadas e libras: a calculadora mostra o IMC com uma casa decimal e a categoria da OMS correspondente — abaixo do peso, normal, sobrepeso ou obesidade — destacando a linha certa na tabela de referência.",
        "O resultado atualiza enquanto você digita, então fica fácil ver como alguns quilos mudam a faixa. O IMC é uma medida de triagem, não um diagnóstico: ele não distingue músculo de gordura.",
      ],
      steps: [
        "Escolha unidades métricas (cm + kg) ou imperiais (ft + in + lb).",
        "Digite sua altura e seu peso.",
        "Veja o IMC, a categoria da OMS e a tabela de referência completa.",
      ],
      faqs: [
        {
          q: "Quais são as faixas de IMC da OMS?",
          a: "A Organização Mundial da Saúde define: abaixo de 18,5 abaixo do peso; 18,5–24,9 peso normal; 25,0–29,9 sobrepeso; e 30,0 ou mais obesidade. Os mesmos cortes valem para homens e mulheres adultos.",
        },
        {
          q: "Como o IMC é calculado?",
          a: "O IMC é o peso em quilos dividido pela altura em metros ao quadrado (kg/m²). Com unidades imperiais a ferramenta converte pés, polegadas e libras internamente: o resultado é idêntico.",
        },
        {
          q: "Por que o IMC não serve para atletas?",
          a: "Músculo é mais denso que gordura, então pessoas muito musculosas podem aparecer como «sobrepeso» mesmo com pouca gordura extra. Trate o IMC como triagem rápida de população e combine com cintura ou composição corporal.",
        },
      ],
    },
  },
});
