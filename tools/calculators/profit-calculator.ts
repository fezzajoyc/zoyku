import { CalcEngineBasic } from "../_engines/calc-engine-basic";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "profit-calculator",
  category: "utility",
  icon: "calc",
  engine: { component: CalcEngineBasic, props: { kind: "profit" } },
  related: ["discount-calculator", "percentage-calculator", "emi-calculator", "gst-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Profit Calculator",
      tagline: "Cost and selling price in: profit or loss, profit margin and markup percentage out — the pricing numbers sellers mix up, sorted live.",
      intro: [
        "Enter what an item cost you and what you sell it for, and get the absolute profit (or loss) plus the two ratios every seller needs: margin — profit as a share of the selling price — and markup — profit as a share of the cost.",
        "Because the two ratios use different denominators, a 25% margin is a 33.3% markup; the tool shows both together so invoices, quotes and pricing sheets stay consistent.",
      ],
      steps: [
        "Type the cost price — what you paid.",
        "Type the selling price — what the customer pays.",
        "Read the profit/loss, margin and markup percentages.",
      ],
      faqs: [
        {
          q: "What is the difference between margin and markup?",
          a: "Margin is profit ÷ selling price (share of revenue); markup is profit ÷ cost (amount added on top of cost). A product bought for 80 and sold for 100 has a 20% margin and a 25% markup. Confusing the two silently shrinks your intended profit.",
        },
        {
          q: "How do I set a price from a target margin?",
          a: "Divide the cost by (1 − target margin): for a 25% margin on an 80 cost, 80 ÷ 0.75 ≈ 106.67. Setting it by markup instead (80 × 1.25 = 100) leaves you with only a 20% margin.",
        },
        {
          q: "Does the calculator include fees and taxes?",
          a: "It works on the two numbers you enter, so payment-processing fees, shipping and sales tax only show up if you fold them into cost or price first. For tax-inclusive pricing, run the number through the VAT or GST calculator.",
        },
      ],
    },
    zh: {
      name: "利润计算器",
      tagline: "输入成本价与售价,立即得到利润/亏损、利润率与加成率——卖家最容易混淆的两个比率,一次算清。",
      intro: [
        "输入进货成本和售价,即可得到绝对利润(或亏损),以及每个卖家都需要的两个比率:利润率(利润占售价的比例)和加成率(利润占成本的比例)。",
        "由于分母不同,25% 的利润率对应 33.3% 的加成率;两者同时显示,报价单和定价表就不会再弄混。",
      ],
      steps: [
        "输入成本价——你的进货价格。",
        "输入售价——顾客支付的价格。",
        "查看利润/亏损、利润率与加成率。",
      ],
      faqs: [
        {
          q: "利润率和加成率有什么区别?",
          a: "利润率 = 利润 ÷ 售价(占收入的比例);加成率 = 利润 ÷ 成本(在成本上加价的比例)。80 买入、100 卖出的商品利润率是 20%,加成率是 25%。两者混淆会悄悄吃掉预期利润。",
        },
        {
          q: "想按目标利润率定价怎么算?",
          a: "成本 ÷ (1 − 目标利润率):成本 80 想要 25% 利润率,定价 80 ÷ 0.75 ≈ 106.67。若按加成率定价(80 × 1.25 = 100),实际利润率只有 20%。",
        },
        {
          q: "计算包含手续费和税费吗?",
          a: "只基于你输入的两个数字,因此支付手续费、运费和销售税要先计入成本或售价才会体现。需要含税定价,把数字再放进 VAT 或 GST 计算器。",
        },
      ],
    },
    ja: {
      name: "利益計算",
      tagline: "仕入価格と販売価格から、利益(損失)・利益率・マークアップ率をリアルタイム計算。混同しがちな 2 つの指標を同時に表示。",
      intro: [
        "仕入価格と販売価格を入力すると、絶対的な利益(損失)に加えて、販売者に必要な 2 つの比率がわかります。利益率(販売価格に占める利益)とマークアップ率(仕入価格に占める利益)です。",
        "分母が違うため、利益率 25% はマークアップ率 33.3% に相当します。両方を同時に表示するので、見積書や価格表でも取り違えが起きません。",
      ],
      steps: [
        "仕入価格(支払った金額)を入力します。",
        "販売価格(顧客が支払う金額)を入力します。",
        "利益/損失・利益率・マークアップ率を確認します。",
      ],
      faqs: [
        {
          q: "利益率とマークアップ率の違いは?",
          a: "利益率は利益 ÷ 販売価格(売上に占める割合)、マークアップ率は利益 ÷ 仕入価格(仕入に上乗せした割合)です。80 で仕入れて 100 で売ると、利益率 20%・マークアップ率 25% です。混同すると狙った利益が静かに減ります。",
        },
        {
          q: "目標利益率から価格を設定するには?",
          a: "仕入価格 ÷ (1 − 目標利益率) とします。仕入 80 で利益率 25% を狙うなら 80 ÷ 0.75 ≒ 106.67 です。マークアップで設定すると(80 × 1.25 = 100)、利益率は 20% にしかなりません。",
        },
        {
          q: "手数料や税は含まれますか?",
          a: "入力した 2 つの数値のみが対象です。決済手数料・送料・売上税を反映するには、先に仕入または価格に織り込んでください。税込価格にする場合は VAT・GST 計算ツールをお使いください。",
        },
      ],
    },
    es: {
      name: "Calculadora de ganancias",
      tagline: "Costo y precio de venta dentro: ganancia o pérdida, margen y recargo en porcentaje — las cifras que los vendedores confunden, resueltas al instante.",
      intro: [
        "Introduzca lo que le costó un artículo y a qué lo vende, y obtenga la ganancia (o pérdida) absoluta más las dos razones que todo vendedor necesita: el margen — ganancia como parte del precio de venta — y el recargo — ganancia como parte del costo.",
        "Como ambas razones usan denominadores distintos, un margen del 25% equivale a un recargo del 33,3%; la herramienta las muestra juntas para que presupuestos y listas de precios no se contradigan.",
      ],
      steps: [
        "Escriba el costo — lo que usted pagó.",
        "Escriba el precio de venta — lo que paga el cliente.",
        "Lea la ganancia/pérdida, el margen y el recargo.",
      ],
      faqs: [
        {
          q: "¿Qué diferencia hay entre margen y recargo?",
          a: "El margen es ganancia ÷ precio de venta (porción de los ingresos); el recargo es ganancia ÷ costo (lo añadido sobre el costo). Un artículo comprado a 80 y vendido a 100 tiene un 20% de margen y un 25% de recargo. Confundirlos reduce sin ruido el beneficio previsto.",
        },
        {
          q: "¿Cómo fijo un precio desde un margen objetivo?",
          a: "Divida el costo entre (1 − margen objetivo): para un margen del 25% sobre un costo de 80, 80 ÷ 0,75 ≈ 106,67. Si se fija por recargo (80 × 1,25 = 100), el margen real queda en un 20%.",
        },
        {
          q: "¿Incluye comisiones e impuestos?",
          a: "Trabaja con los dos números que introduzca, así que las comisiones de pago, el envío y los impuestos solo aparecen si los incluye antes en el costo o el precio. Para precios con impuesto incluido, use la calculadora de IVA o GST.",
        },
      ],
    },
    pt: {
      name: "Calculadora de lucro",
      tagline: "Custo e preço de venda entram, lucro ou prejuízo, margem e markup saem — os números que vendedores confundem, resolvidos ao vivo.",
      intro: [
        "Informe quanto o item custou e por quanto você vende, e receba o lucro (ou prejuízo) absoluto mais as duas razões que todo vendedor precisa: margem — lucro como parte do preço de venda — e markup — lucro como parte do custo.",
        "Como as duas razões usam denominadores diferentes, uma margem de 25% equivale a um markup de 33,3%; a ferramenta mostra as duas juntas para que orçamentos e tabelas de preço não se contradigam.",
      ],
      steps: [
        "Digite o preço de custo — o que você pagou.",
        "Digite o preço de venda — o que o cliente paga.",
        "Veja o lucro/prejuízo, a margem e o markup.",
      ],
      faqs: [
        {
          q: "Qual a diferença entre margem e markup?",
          a: "Margem é lucro ÷ preço de venda (fatia da receita); markup é lucro ÷ custo (o que se soma ao custo). Um item comprado por 80 e vendido por 100 tem margem de 20% e markup de 25%. Confundir os dois reduz silenciosamente o lucro planejado.",
        },
        {
          q: "Como definir um preço a partir de uma margem alvo?",
          a: "Divida o custo por (1 − margem alvo): para margem de 25% sobre um custo de 80, 80 ÷ 0,75 ≈ 106,67. Definindo pelo markup (80 × 1,25 = 100), a margem real fica em apenas 20%.",
        },
        {
          q: "O cálculo inclui taxas e impostos?",
          a: "Ele usa os dois números que você informar, então taxas de cartão, frete e impostos só aparecem se você incorporá-los antes ao custo ou ao preço. Para preço com imposto incluído, use a calculadora de IVA ou GST.",
        },
      ],
    },
  },
});
