import { CalcEngineHealth } from "../_engines/calc-engine-health";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "body-fat-calculator",
  category: "utility",
  icon: "calc",
  engine: { component: CalcEngineHealth, props: { kind: "bodyfat" } },
  related: ["bmi-calculator", "bmr-calculator", "ideal-weight-calculator", "calorie-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "aspect-ratio-calculator", "barcode-generator"],
  copy: {
    en: {
      name: "Body Fat Calculator",
      tagline:
        "Estimate body fat percentage with the US Navy tape method (Hodgdon & Beckett, 1984) from height, neck and waist — hips for women.",
      intro: [
        "The US Navy circumference method estimates body fat from a tape measure alone. For men: %BF = 495 / (1.0324 − 0.19077·log10(waist − neck) + 0.15456·log10(height)) − 450, all in centimeters. Women add the hip to the girth term — log10(waist + hip − neck) — and use the female coefficients of the same 1984 paper by Hodgdon and Beckett.",
        "Measure the neck below the larynx with the tape sloping slightly down at the front, the waist at the navel for men or the narrowest point for women, and the hip at its fullest part. Keep the tape snug but not compressing the skin. The result is an estimate with a typical error of ±3–4% against lab methods, not a diagnosis.",
        "The formula comes from Hodgdon and Beckett's 1984 research for the US Navy, validated against underwater weighing. The tool also reports the fat mass and lean mass behind the percentage and places your result in the standard category bands for your sex — essential fat, athletes, fitness, average and obese.",
        "Compared with BMI, which cannot tell muscle from fat, the circumference method responds to where you carry tissue, so a muscular waist-and-neck profile scores noticeably better. Typical error is ±3–4% against DXA scans; track the trend rather than the decimal. For medical or insurance purposes, a clinical measurement remains the reference.",
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
      deepDive: [
        {
          heading: "Inside the Navy circumference method",
          paragraphs: [
            "The formula estimates body fat from girth ratios. For men it uses 495 / (1.0324 − 0.19077·log10(waist − neck) + 0.15456·log10(height)) − 450, all measurements in centimeters; for women the girth term becomes log10(waist + hip − neck) with the female coefficients from the same paper. The log terms are why inches around the middle move the estimate so much more than inches of height.",
            "The method was developed by James Hodgdon and Jack Beckett in 1984 for the US Navy, which needed an annual body-composition screen for tens of thousands of sailors without access to laboratory equipment. It was validated against underwater weighing (hydrostatic densitometry), then the reference standard — and the Navy still uses it today, which is as strong a field test as any formula gets.",
            "The underlying logic is that fat accumulates predictably at specific sites (abdomen for men, hips and thighs for women) while the neck stays lean, so the waist-to-neck difference carries real information about fat mass that a scale alone cannot see.",
          ],
        },
        {
          heading: "Reading the categories — and the trend",
          paragraphs: [
            "The calculator places your result into the standard bands cited by the American Council on Exercise: for men, 2–5% essential fat, 6–13% athletes, 14–17% fitness, 18–24% average, 25%+ obese; for women, 10–13% essential, 14–20% athletes, 21–24% fitness, 25–31% average, 32%+ obese. Women carry more essential fat because hormonal and reproductive function depends on it.",
            "Expect an absolute accuracy of roughly ±3–4% against a DXA scan. That sounds like a lot until you notice what the method is actually good at: consistency. Measured at the same sites, same time of day, by the same person, tape estimates track real changes in body composition remarkably well.",
            "So the practical use is directional: a month of training that moves you from 24% to 22% is a real result even if both readings carry a ±3% error, because the error is largely systematic and cancels when comparing two measurements of the same body.",
          ],
        },
        {
          heading: "Where tape estimates go wrong",
          paragraphs: [
            "Measurement technique dominates the error budget. The neck goes below the larynx with the tape sloping slightly down at the front; the waist sits at the navel for men and the narrowest point for women; the hip at its fullest part. Pull the tape snug but never compressing the skin, breathe out normally, and never measure right after a large meal or a heavy training session.",
            "Impossible outputs flag impossible inputs: because the formula is printed unclamped, a waist measured smaller than the neck can produce a negative body-fat percentage. Anything below essential-fat level or above roughly 60% means re-measure, not celebrate or panic.",
            "Muscular and lean individuals can push field methods to their limits, and people whose fat distributes unusually (for example visceral-dominant) can be misread by a girth-based model. For medical, insurance or competitive purposes, a clinical scan remains the reference — this tool is for tracking your own trend.",
          ],
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
      deepDive: [
        {
          heading: "美国海军围度法的原理与来历",
          paragraphs: [
            "公式用围度比值估算体脂。男性公式为 495 / (1.0324 − 0.19077·log10(腰围 − 颈围) + 0.15456·log10(身高)) − 450,单位厘米;女性把围度项换成 log10(腰围 + 臀围 − 颈围),系数来自同一篇论文。对数项解释了为什么腰上多一寸比身高多一寸对结果影响大得多。",
            "方法由 James Hodgdon 和 Jack Beckett 于 1984 年为美国海军开发——海军需要给数以万计的水兵做年度身体成分筛查,却没有实验室设备可用。它以当时的水下称重法为参照完成验证,海军沿用至今,这对一个公式来说算得上最强的实战检验。",
            "背后的逻辑是:脂肪沉积位置相对固定(男性在腹部,女性在臀腿),而颈部始终偏瘦,所以腰围与颈围之差携带了体重秤看不到的脂肪信息。",
          ],
        },
        {
          heading: "分档怎么读,趋势比数字更重要",
          paragraphs: [
            "结果按美国运动委员会(ACE)引用的标准分档:男性 2–5% 必需脂肪、6–13% 运动员、14–17% 健康、18–24% 普通、25%+ 肥胖;女性 10–13% 必需、14–20% 运动员、21–24% 健康、25–31% 普通、32%+ 肥胖。女性必需脂肪更高,因为激素与生殖功能依赖它。",
            "对照 DXA 扫描,绝对精度大约 ±3–4%。听起来不少,但这个方法真正的强项是“一致性”:同一部位、同一时间、同一个人测量,围度法对体成分真实变化的追踪相当可靠。",
            "所以正确用法是看方向:一个月训练把 24% 降到 22% 就是真实进步,即使两次读数各有 ±3% 误差——因为误差主要是系统性的,对同一身体做两次比较时会互相抵消。",
          ],
        },
        {
          heading: "围度测量哪里容易出错",
          paragraphs: [
            "手法主导误差。颈围在喉结下方、带子前侧略微下斜;腰围男性量肚脐水平、女性量最细处;臀围量最丰满处。带子贴合但不压迫皮肤,正常呼气,不要在大餐后或大训练后立刻测量。",
            "不可能的输出对应不可能的输入:公式按未截断形式呈现,腰围小于颈围会算出负体脂。低于必需脂肪水平或高于约 60% 的读数都意味着重新量,而不是惊喜或恐慌。",
            "肌肉发达者会把现场方法推向极限,脂肪分布特殊的人(比如以内脏脂肪为主)也容易被围度模型误读。医疗、保险或竞技用途请以临床扫描为准——这个工具适合追踪自己的趋势。",
          ],
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
      deepDive: [
        {
          heading: "米海軍式の仕組みと来歴",
          paragraphs: [
            "式は周囲径の比から体脂肪率を推定します。男性式は 495 / (1.0324 − 0.19077·log10(腹囲 − 首回り) + 0.15456·log10(身長)) − 450(cm 単位)。女性式では囲度項が log10(腹囲 + 臀囲 − 首回り) になり、係数は同じ論文由来です。対数項があるため、腰回りの変化が身長の変化より結果を大きく動かします。",
            "手法は 1984 年、James Hodgdon と Jack Beckett が米海軍向けに開発しました。数万人の水兵を毎年スクリーニングする必要があり、実験室設備が使えなかったためです。当時の基準だった水中比重測定法に対して検証され、海軍が現在も使用し続けていること自体が実戦的な妥当性の証明です。",
            "論理の核:脂肪の沈着位置は比較的一定(男性は腹部、女性は臀・太もも)で、首は常に痩せているため、腹囲と首回りの差は体重計では見えない脂肪量の情報を持ちます。",
          ],
        },
        {
          heading: "カテゴリの読み方と、絶対値よりトレンド",
          paragraphs: [
            "結果は ACE(米国運動評議会)引用の標準区分に割り当てられます:男性は 2–5% 必須脂肪 / 6–13% アスリート / 14–17% フィットネス / 18–24% 平均 / 25%+ 肥満。女性は 10–13% 必須 / 14–20% アスリート / 21–24% フィットネス / 25–31% 平均 / 32%+ 肥満。女性の必須脂肪が高いのは、ホルモン機能が脂肪に依存するためです。",
            "DXA スキャンに対する絶対精度は約 ±3–4%。ただし得意なのは「一貫性」です:同じ部位・同じ時間帯・同じ人による計測なら、体成分の実際の変化をかなり正確に追跡できます。",
            "実用上は方向性で判断:1か月のトレーニングで 24% → 22% なら、各読み取りに ±3% の誤差があっても実質的な進歩です。誤差はほぼ系統的で、同じ体の2回の比較では相殺されます。",
          ],
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
      deepDive: [
        {
          heading: "El método de circunferencias de la Marina de EE. UU.",
          paragraphs: [
            "La fórmula estima la grasa a partir de razones entre perímetros. Para hombres: 495 / (1,0324 − 0,19077·log10(cintura − cuello) + 0,15456·log10(altura)) − 450, todo en centímetros; para mujeres el término se convierte en log10(cintura + cadera − cuello), con los coeficientes femeninos del mismo artículo. Los logaritmos explican por qué un centímore de cintura mueve el resultado más que uno de altura.",
            "El método lo desarrollaron James Hodgdon y Jack Beckett en 1984 para la Marina de EE. UU., que necesitaba un cribado anual de composición corporal para decenas de miles de marineros sin laboratorio. Se validó contra el pesaje hidrostático, la referencia de entonces, y la Marina lo sigue usando: una prueba de campo difícil de igualar.",
            "La lógica de fondo: la grasa se acumula en sitios predecibles (abdomen en hombres, cadera y muslos en mujeres) mientras el cuello permanece magro, así que la diferencia cintura-cuello contiene información que una báscula no ve.",
          ],
        },
        {
          heading: "Leer las categorías — y la tendencia",
          paragraphs: [
            "La calculadora ubica tu resultado en las bandas estándar citadas por el American Council on Exercise: hombres, 2-5 % grasa esencial, 6-13 % atletas, 14-17 % fitness, 18-24 % medio, 25 %+ obesidad; mujeres, 10-13 % esencial, 14-20 % atletas, 21-24 % fitness, 25-31 % medio, 32 %+ obesidad. Las mujeres necesitan más grasa esencial por su función hormonal.",
            "Frente a un escáner DXA la precisión absoluta ronda el ±3-4 %. Pero la fortaleza real del método es la consistencia: medido en los mismos sitios, a la misma hora y por la misma persona, sigue muy bien los cambios reales de composición corporal.",
            "El uso práctico es direccional: pasar del 24 % al 22 % en un mes es un resultado real aunque cada lectura lleve ±3 % de error, porque el error es en gran parte sistemático y se cancela al comparar dos mediciones del mismo cuerpo.",
          ],
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
      deepDive: [
        {
          heading: "O método de circunferências da Marinha dos EUA",
          paragraphs: [
            "A fórmula estima a gordura a partir de razões entre perímetros. Para homens: 495 / (1,0324 − 0,19077·log10(cintura − pescoço) + 0,15456·log10(altura)) − 450, tudo em centímetros; para mulheres o termo vira log10(cintura + quadril − pescoço), com os coeficientes femininos do mesmo artigo. Os logaritmos explicam por que um centímetro de cintura move o resultado mais que um de altura.",
            "O método foi desenvolvido por James Hodgdon e Jack Beckett em 1984 para a Marinha dos EUA, que precisava de uma triagem anual de composição corporal para dezenas de milhares de marinheiros sem laboratório. Foi validado contra a pesagem hidrostática, referência da época, e a Marinha o usa até hoje — um teste de campo difícil de superar.",
            "A lógica de fundo: a gordura se acumula em locais previsíveis (abdômen nos homens, quadril e coxas nas mulheres) enquanto o pescoço permanece magro, então a diferença cintura-pescoço carrega informação que a balança não vê.",
          ],
        },
        {
          heading: "Lendo as categorias — e a tendência",
          paragraphs: [
            "A calculadora posiciona seu resultado nas faixas padrão citadas pelo American Council on Exercise: homens, 2-5 % gordura essencial, 6-13 % atletas, 14-17 % fitness, 18-24 % médio, 25 %+ obesidade; mulheres, 10-13 % essencial, 14-20 % atletas, 21-24 % fitness, 25-31 % médio, 32 %+ obesidade. Mulheres precisam de mais gordura essencial pela função hormonal.",
            "Contra um escâner DXA a precisão absoluta fica em torno de ±3-4 %. Mas a força real do método é a consistência: medido nos mesmos locais, no mesmo horário e pela mesma pessoa, acompanha muito bem as mudanças reais de composição corporal.",
            "O uso prático é direcional: ir de 24 % para 22 % em um mês é um resultado real mesmo com ±3 % de erro em cada leitura, porque o erro é em grande parte sistemático e se cancela ao comparar duas medidas do mesmo corpo.",
          ],
        },
      ],
    },
  },
});
