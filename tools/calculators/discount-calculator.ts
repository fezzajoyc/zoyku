import { CalcEngineBasic } from "../_engines/calc-engine-basic";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "discount-calculator",
  category: "utility",
  icon: "sparkle",
  engine: { component: CalcEngineBasic, props: { kind: "discount" } },
  related: ["percentage-calculator", "profit-calculator", "vat-calculator", "gst-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Discount Calculator",
      tagline: "Price plus one or two stacked discounts in: final price, money saved and the true combined percentage — worked out as you type.",
      intro: [
        "Enter the original price and a discount percentage, and instantly see what you actually pay and how much you save. A second, optional discount handles the “extra 10% off sale prices” case that always trips shoppers up.",
        "Stacked discounts are applied one after another, and the tool shows the effective combined rate — because 20% + 10% off is 28% off, not 30%, a difference that adds up on big-ticket items.",
        "Stacked discounts multiply rather than add: taking an extra 10% off a price already reduced by 20% leaves 0.9 × 0.8 = 72% of the original, an effective 28% discount. The calculator shows that effective rate explicitly, alongside the absolute amount saved, so you can judge a deal in money terms rather than in stacked labels.",
        "You can also run it in reverse scenarios — compare two offers with different list prices and different discount rates to see which costs less out of pocket, something store signs never do for you. Note that discounts shown are off the stated list price; whether that list price is itself fair is a separate question.",],
      steps: [
        "Type the original price.",
        "Enter the discount percentage — and an optional second, stacked one.",
        "Read the final price, the amount saved and the effective discount.",
      ],
      faqs: [
        {
          q: "Why isn't 20% + 10% the same as 30% off?",
          a: "The second discount applies to the already-reduced price, not the original one: 100 → 80 (−20%) → 72 (−10%), which is 28% off in total. The calculator shows this effective rate so you can compare deals fairly.",
        },
        {
          q: "How do I find the original price from a sale price?",
          a: "Divide the sale price by (1 − discount ÷ 100). A $72 price after 28% off comes from 72 ÷ 0.72 = $100. Or use the Percentage Calculator's “X is what % of Y” mode to work it out step by step.",
        },
        {
          q: "Does this account for VAT or sales tax?",
          a: "No — it works on the prices you type. If the ticket shows a tax-inclusive price, the discount result is also tax-inclusive. To combine with tax, run the discounted price through the VAT or GST calculator.",
        },
      ],
    },
    zh: {
      name: "折扣计算器",
      tagline: "原价加一至两层折扣,实时算出到手价、省了多少钱和真实合并折扣率——“折上折”不再算错。",
      intro: [
        "输入原价和折扣百分比,立即看到实际支付金额和省下的钱。可选的第二层折扣专门处理“促销价再打 9 折”这种容易算错的场景。",
        "叠加折扣按先后顺序依次应用,并显示实际合并折扣率——因为 20% + 10% 实际是 72 折而不是 7 折,大件商品上差距可观。",
      ],
      steps: [
        "输入原价。",
        "填写折扣百分比——可选再叠加第二层折扣。",
        "查看到手价、节省金额和实际折扣率。",
      ],
      faqs: [
        {
          q: "为什么 20% + 10% 不等于 7 折?",
          a: "第二层折扣作用在已降价的基础上,而不是原价:100 → 80(−20%)→ 72(−10%),总共省 28%。计算器会显示这个实际折扣率,方便公平比价。",
        },
        {
          q: "怎么从促销价反推原价?",
          a: "促销价 ÷ (1 − 折扣 ÷ 100)。7 折后是 72 美元,原价就是 72 ÷ 0.72 = 100 美元。也可以用百分比计算器的“X 占 Y 的百分之几”模式一步步算。",
        },
        {
          q: "结果包含增值税或消费税吗?",
          a: "不包含——计算只基于你输入的价格。标价含税,折扣结果就含税。需要连税一起算,把折后价再放进 VAT 或 GST 计算器即可。",
        },
      ],
    },
    ja: {
      name: "割引計算",
      tagline: "元の価格に 1 段階・2 段階の割引を入れるだけ。支払額・節約額・実質割引率をリアルタイムで計算します。",
      intro: [
        "元の価格と割引率を入力すると、実際の支払額と節約額がすぐわかります。任意の 2 段階目の割引は「セール価格からさらに 10% オフ」のようなケースに対応。",
        "重複割引は順に適用され、実質の合計率も表示します。20% + 10% は 30% 引きではなく 28% 引き。高額商品ではこの差が大きくなります。",
      ],
      steps: [
        "元の価格を入力します。",
        "割引率と、必要なら 2 段階目の割引率を入力します。",
        "支払額・節約額・実質割引率を確認します。",
      ],
      faqs: [
        {
          q: "20% + 10% が 30% 引きにならないのはなぜ?",
          a: "2 段階目の割引はすでに値下げされた価格が対象です。100 → 80(−20%)→ 72(−10%)で、合計 28% 引きです。実質率が表示されるので公平に比較できます。",
        },
        {
          q: "セール価格から元の価格を求めるには?",
          a: "セール価格 ÷ (1 − 割引率 ÷ 100) で出せます。28% 引きで 72 ドルなら 72 ÷ 0.72 = 100 ドルです。パーセント計算ツールの「X は Y の何%」モードでも段階的に求められます。",
        },
        {
          q: "VAT や消費税は含まれますか?",
          a: "含まれません。入力した価格に対する計算です。表示価格が税込なら結果も税込です。税込みで計算するには、割引後の価格を VAT・GST 計算ツールに通してください。",
        },
      ],
    },
    es: {
      name: "Calculadora de descuentos",
      tagline: "Precio más uno o dos descuentos apilados: precio final, dinero ahorrado y el porcentaje combinado real, calculado mientras escribes.",
      intro: [
        "Introduzca el precio original y un porcentaje de descuento y vea al instante lo que pagará y lo que ahorra. Un segundo descuento opcional cubre el clásico «10% extra sobre rebajas» que siempre confunde.",
        "Los descuentos apilados se aplican uno tras otro y la herramienta muestra la tasa combinada efectiva: porque 20% + 10% son un 28% de descuento, no un 30%, y en compras grandes la diferencia se nota.",
      ],
      steps: [
        "Escriba el precio original.",
        "Introduzca el porcentaje de descuento — y opcionalmente uno segundo apilado.",
        "Lea el precio final, lo ahorrado y el descuento efectivo.",
      ],
      faqs: [
        {
          q: "¿Por qué 20% + 10% no es un 30% de descuento?",
          a: "El segundo descuento se aplica sobre el precio ya reducido, no sobre el original: 100 → 80 (−20%) → 72 (−10%), un 28% en total. La calculadora muestra esta tasa efectiva para comparar ofertas con justicia.",
        },
        {
          q: "¿Cómo averiguo el precio original a partir del de rebaja?",
          a: "Divida el precio de rebaja entre (1 − descuento ÷ 100). Un precio de 72 € tras un 28% viene de 72 ÷ 0,72 = 100 €. O use el modo «X es qué % de Y» de la calculadora de porcentajes.",
        },
        {
          q: "¿Incluye IVA u otros impuestos?",
          a: "No — opera sobre los precios que escriba. Si la etiqueta incluye impuestos, el resultado también los incluye. Para combinarlos, pase el precio con descuento por la calculadora de IVA o GST.",
        },
      ],
    },
    pt: {
      name: "Calculadora de descontos",
      tagline: "Preço mais um ou dois descontos acumulados: preço final, quanto sobrou no bolso e o percentual combinado real — tudo ao vivo.",
      intro: [
        "Digite o preço original e um percentual de desconto e veja na hora quanto você paga e quanto economiza. Um segundo desconto opcional cobre o caso do «10% extra sobre o preço promocional» que sempre confunde.",
        "Descontos acumulados são aplicados em sequência, e a ferramenta mostra a taxa combinada efetiva — porque 20% + 10% equivalem a 28% de desconto, e não a 30%, diferença que pesa em compras caras.",
      ],
      steps: [
        "Digite o preço original.",
        "Informe o percentual de desconto — e opcionalmente um segundo, acumulado.",
        "Veja o preço final, quanto economizou e o desconto efetivo.",
      ],
      faqs: [
        {
          q: "Por que 20% + 10% não é igual a 30% de desconto?",
          a: "O segundo desconto vale sobre o preço já reduzido, não sobre o original: 100 → 80 (−20%) → 72 (−10%), ou seja, 28% no total. A calculadora mostra essa taxa efetiva para comparar ofertas de forma justa.",
        },
        {
          q: "Como descobrir o preço original a partir do promocional?",
          a: "Divida o preço promocional por (1 − desconto ÷ 100). Um preço de R$ 72 após 28% vem de 72 ÷ 0,72 = R$ 100. Ou use o modo «X é quanto % de Y» da calculadora de porcentagem.",
        },
        {
          q: "O resultado inclui imposto?",
          a: "Não — o cálculo usa os preços que você digitar. Se a etiqueta já inclui imposto, o resultado do desconto também inclui. Para combinar, passe o preço com desconto pela calculadora de IVA ou GST.",
        },
      ],
    },
  },
});
