import { CalcEngineHealth } from "../_engines/calc-engine-health";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "body-fat-calculator",
  category: "utility",
  icon: "calc",
  engine: { component: CalcEngineHealth, props: { kind: "bodyfat" } },
  related: ["bmi-calculator", "bmr-calculator", "ideal-weight-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Body Fat Calculator",
      tagline:
        "Estimate body fat percentage with the US Navy tape method (Hodgdon & Beckett, 1984) from height, neck and waist — hips for women.",
      intro: [
        "The US Navy circumference method estimates body fat from a tape measure alone. For men: %BF = 495 / (1.0324 − 0.19077·log10(waist − neck) + 0.15456·log10(height)) − 450, all in centimeters. Women add the hip to the girth term — log10(waist + hip − neck) — and use the female coefficients of the same 1984 paper by Hodgdon and Beckett.",
        "Measure the neck below the larynx with the tape sloping slightly down at the front, the waist at the navel for men or the narrowest point for women, and the hip at its fullest part. Keep the tape snug but not compressing the skin. The result is an estimate with a typical error of ±3–4% against lab methods, not a diagnosis.",
      ],
      steps: [
        "Choose your sex and metric or imperial units.",
        "Measure and enter height, neck and waist — plus hip for women.",
        "Read your estimated body fat percentage.",
        "Re-measure monthly under the same conditions to track the trend.",
      ],
      faqs: [
        {
          q: "How accurate is the Navy method?",
          a: "Against underwater weighing and DEXA, the 1984 Navy equations average within about 3–4 percentage points, with individual errors larger where fat is stored unusually. It tracks changes well when you measure consistently, which matters more for progress than the absolute number.",
        },
        {
          q: "What body fat range is considered healthy?",
          a: "The American Council on Exercise cites for men: 2–5% essential fat, 6–13% athletes, 14–17% fitness, 18–24% average, 25%+ obesity. For women: 10–13% essential, 14–20% athletes, 21–24% fitness, 25–31% average, 32%+ obesity. Women need more essential fat for hormone function.",
        },
        {
          q: "Why did the result come out negative or impossible?",
          a: "The formula is printed unclamped, so impossible inputs — for example a waist not larger than the neck — produce impossible outputs. Treat any value below essential-fat level or above ~60% as a measurement error and re-measure. And as always, this estimate is not medical advice.",
        },
      ],
    },
    zh: {
      name: "体脂率计算器",
      tagline:
        "用美国海军围度法(Hodgdon & Beckett,1984)估算体脂率:输入身高、颈围、腰围——女性加测臀围,支持公制与英制。",
      intro: [
        "美国海军围度法只用软尺就能估算体脂。男性:%BF = 495 ÷ (1.0324 − 0.19077·log10(腰围 − 颈围) + 0.15456·log10(身高)) − 450,单位厘米。女性把臀围加进围度项——log10(腰围 + 臀围 − 颈围)——并使用同一篇 1984 年 Hodgdon 与 Beckett 论文中的女性系数。",
        "颈围在喉结下方、软尺前侧略微下倾处测量;腰围男性量肚脐水平、女性量最细处;臀围量最丰满处。软尺贴紧皮肤但不压迫。结果为估算值,与实验室方法相比典型误差 ±3–4 个百分点,不构成诊断。",
      ],
      steps: [
        "选择性别与公制或英制单位。",
        "测量并输入身高、颈围、腰围——女性再加臀围。",
        "查看估算的体脂率。",
        "每月在相同条件下复测,追踪变化趋势。",
      ],
      faqs: [
        {
          q: "海军围度法准吗?",
          a: "与水下称重和 DEXA 相比,1984 年的海军公式平均偏差约 3–4 个百分点;脂肪分布异常的个体误差更大。只要每次测量条件一致,它追踪变化很可靠——对进度而言这比绝对数值更重要。",
        },
        {
          q: "体脂率多少算健康?",
          a: "美国运动委员会(ACE)给出的参考:男性必需脂肪 2–5%、运动员 6–13%、健康 14–17%、平均 18–24%、25% 以上为肥胖;女性必需脂肪 10–13%、运动员 14–20%、健康 21–24%、平均 25–31%、32% 以上为肥胖。女性需要更多必需脂肪来维持激素功能。",
        },
        {
          q: "为什么结果是负数或明显不可能?",
          a: "公式按原样输出、不做截断,所以不可能的输入——例如腰围不大于颈围——会得到不可能的输出。低于必需脂肪水平或高于约 60% 的值都应视为测量错误,请重新测量。当然,这个估算不构成医疗建议。",
        },
      ],
    },
    ja: {
      name: "体脂肪率計算",
      tagline:
        "米海軍の囲度法(Hodgdon & Beckett、1984)で体脂肪率を推定。身長・首囲・腹囲に加え、女性は臀囲を入力します。単位はどちらにも対応。",
      intro: [
        "米海軍の囲度法は、巻き尺だけで体脂肪率を推定します。男性は %BF = 495 ÷ (1.0324 − 0.19077·log10(腹囲 − 首囲) + 0.15456·log10(身長)) − 450(単位 cm)。女性は囲の項に臀囲を加えて log10(腹囲 + 臀囲 − 首囲)とし、同じ 1984 年の Hodgdon & Beckett 論文にある女性用係数を使います。",
        "首囲は喉仏の下で前方にやや下がるように、腹囲は男性はへその高さ・女性は最も細い部分、臀囲は最も出た部分を測ります。テープは肌に密着させても押し込まないように。結果は推定値で、実験室法と比べ ±3〜4 ポイント程度の誤差があります。診断ではありません。",
      ],
      steps: [
        "性別と単位(メートル法/ヤード・ポンド法)を選びます。",
        "身長・首囲・腹囲(女性は臀囲も)を測って入力します。",
        "推定された体脂肪率を確認します。",
        "毎月同じ条件で再測定し、推移を追います。",
      ],
      faqs: [
        {
          q: "海軍式の精度はどのくらいですか?",
          a: "水中体重計や DEXA と比べると、1984 年の海軍式は平均 3〜4 ポイント程度の差に収まります。脂肪の付き方が特殊な人では個人差が大きくなります。同じ条件で測り続ければ変化の追跡には有用で、進捗確認には絶対値より一貫性が重要です。",
        },
        {
          q: "体脂肪率はどの範囲が健康的ですか?",
          a: "米国運動協会(ACE)の参考値は、男性:必須脂肪 2〜5%、アスリート 6〜13%、フィットネス 14〜17%、平均 18〜24%、25% 以上が肥満。女性:必須脂肪 10〜13%、アスリート 14〜20%、フィットネス 21〜24%、平均 25〜31%、32% 以上が肥満です。女性はホルモン機能のためにより多くの必須脂肪が必要です。",
        },
        {
          q: "結果が負やありえない値になるのはなぜですか?",
          a: "式は補正なしのまま表示しているため、ありえない入力(例:腹囲が首囲以下)はありえない出力になります。必須脂肪未満や約 60% 超の値は測定ミスと考え、測り直してください。なお、この推定は医療アドバイスではありません。",
        },
      ],
    },
    es: {
      name: "Calculadora de grasa corporal",
      tagline:
        "Estime su porcentaje de grasa con el método de cinta de la Marina de EE. UU. (Hodgdon y Beckett, 1984): altura, cuello y cintura, y cadera en mujeres.",
      intro: [
        "El método de circunferencias de la Marina de EE. UU. estima la grasa corporal con solo una cinta métrica. Hombres: %GC = 495 / (1.0324 − 0,19077·log10(cintura − cuello) + 0,15456·log10(altura)) − 450, todo en centímetros. Las mujeres suman la cadera al término de circunferencias — log10(cintura + cadera − cuello) — y usan los coeficientes femeninos del mismo artículo de 1984 de Hodgdon y Beckett.",
        "Mida el cuello bajo la laringe con la cinta ligeramente inclinada hacia abajo al frente, la cintura a la altura del ombligo en hombres o en el punto más estrecho en mujeres, y la cadera en su parte más ancha. La cinta debe ajustarse sin comprimir la piel. El resultado es una estimación con un error típico de ±3–4% frente a métodos de laboratorio, no un diagnóstico.",
      ],
      steps: [
        "Elija su sexo y unidades métricas o imperiales.",
        "Mida e introduzca altura, cuello y cintura — más cadera en mujeres.",
        "Lea su porcentaje estimado de grasa corporal.",
        "Repita la medición cada mes en las mismas condiciones para seguir la tendencia.",
      ],
      faqs: [
        {
          q: "¿Qué precisión tiene el método de la Marina?",
          a: "Frente a la pesaje submarino y el DEXA, las ecuaciones de la Marina de 1984 se desvían de media unos 3–4 puntos porcentuales, con errores individuales mayores cuando la grasa se almacena de forma atípica. Sigue bien los cambios si mide siempre igual, lo que importa más para el progreso que la cifra absoluta.",
        },
        {
          q: "¿Qué rango de grasa corporal se considera saludable?",
          a: "El American Council on Exercise cita para hombres: 2–5% grasa esencial, 6–13% atletas, 14–17% fitness, 18–24% promedio, 25%+ obesidad. Para mujeres: 10–13% esencial, 14–20% atletas, 21–24% fitness, 25–31% promedio, 32%+ obesidad. Las mujeres necesitan más grasa esencial para la función hormonal.",
        },
        {
          q: "¿Por qué salió un resultado negativo o imposible?",
          a: "La fórmula se muestra sin recortes, así que entradas imposibles — por ejemplo, una cintura no mayor que el cuello — producen salidas imposibles. Cualquier valor por debajo del nivel de grasa esencial o por encima del ~60% debe tratarse como error de medición: vuelva a medir. Y como siempre, esta estimación no es consejo médico.",
        },
      ],
    },
    pt: {
      name: "Calculadora de gordura corporal",
      tagline:
        "Estime seu percentual de gordura com o método de fita da Marinha dos EUA (Hodgdon & Beckett, 1984): altura, pescoço e cintura — quadril para mulheres.",
      intro: [
        "O método de circunferências da Marinha dos EUA estima a gordura corporal usando apenas uma fita métrica. Homens: %GC = 495 / (1.0324 − 0,19077·log10(cintura − pescoço) + 0,15456·log10(altura)) − 450, tudo em centímetros. As mulheres somam o quadril ao termo de circunferências — log10(cintura + quadril − pescoço) — e usam os coeficientes femininos do mesmo artigo de 1984 de Hodgdon e Beckett.",
        "Meça o pescoço abaixo da laringe com a fita levemente inclinada para baixo na frente, a cintura na altura do umbigo (homens) ou no ponto mais estreito (mulheres) e o quadril na parte mais larga. A fita deve encostar sem comprimir a pele. O resultado é uma estimativa com erro típico de ±3–4% contra métodos de laboratório, não um diagnóstico.",
      ],
      steps: [
        "Escolha seu sexo e unidades métricas ou imperiais.",
        "Meça e informe altura, pescoço e cintura — mais quadril para mulheres.",
        "Veja seu percentual estimado de gordura corporal.",
        "Repita a medição mensalmente nas mesmas condições para acompanhar a tendência.",
      ],
      faqs: [
        {
          q: "Qual a precisão do método da Marinha?",
          a: "Contra a pesagem subaquática e o DEXA, as equações da Marinha de 1984 ficam em média a uns 3–4 pontos percentuais, com erros individuais maiores quando a gordura é armazenada de forma atípica. Ele acompanha bem as mudanças se você medir sempre igual — o que importa mais para o progresso do que o número absoluto.",
        },
        {
          q: "Qual faixa de gordura corporal é considerada saudável?",
          a: "O American Council on Exercise cita para homens: 2–5% gordura essencial, 6–13% atletas, 14–17% fitness, 18–24% média, 25%+ obesidade. Para mulheres: 10–13% essencial, 14–20% atletas, 21–24% fitness, 25–31% média, 32%+ obesidade. Mulheres precisam de mais gordura essencial para a função hormonal.",
        },
        {
          q: "Por que o resultado saiu negativo ou impossível?",
          a: "A fórmula é exibida sem cortes, então entradas impossíveis — por exemplo, uma cintura não maior que o pescoço — produzem saídas impossíveis. Qualquer valor abaixo do nível de gordura essencial ou acima de ~60% deve ser tratado como erro de medição: meça de novo. E como sempre, esta estimativa não é aconselhamento médico.",
        },
      ],
    },
  },
});
