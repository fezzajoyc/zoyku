import { CalcEngineBreakEven } from "../_engines/calc-engine-breakeven";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "break-even-calculator",
  category: "utility",
  icon: "check",
  engine: { component: CalcEngineBreakEven },
  related: ["profit-calculator", "percentage-calculator", "discount-calculator", "gst-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Break-Even Calculator",
      tagline:
        "Find the units and revenue where a product stops losing money — fixed costs, price and variable cost in, contribution margin and profit table out.",
      intro: [
        "Enter your fixed costs — rent, salaries, equipment, the bills you pay regardless of volume — plus the price per unit and the variable cost per unit. The calculator divides fixed costs by the contribution margin, price minus variable cost, to give the number of units at which profit crosses zero.",
        "A mini table shows profit or loss at half, one-and-a-half and twice the break-even volume, so you can see how fast the margin accumulates once the point is passed. If the price does not even cover the variable cost, the tool says so instead of showing a meaningless zero.",
      ],
      steps: [
        "Enter total fixed costs for the period.",
        "Set the price per unit and the variable cost per unit.",
        "Read the break-even units and revenue, plus the margin per unit.",
        "Check the profit table at 0.5×, 1.5× and 2× the break-even volume.",
      ],
      faqs: [
        {
          q: "What formula does break-even analysis use?",
          a: "Break-even units = fixed costs ÷ (price per unit − variable cost per unit). The difference is the contribution margin: with 10,000 in fixed costs, a 50 price and a 30 variable cost, each sale contributes 20, so 500 units — 25,000 of revenue — break even.",
        },
        {
          q: "What if the margin is zero or negative?",
          a: "Then no volume can break even, and the calculator says so rather than returning a number: every unit sold adds loss instead of covering fixed costs. The fixes are a higher price, a lower variable cost, or both.",
        },
        {
          q: "Does it handle multiple products or changing costs?",
          a: "It models one product with constant unit economics — the classic textbook case. For a product mix, use your blended average of price minus variable cost; for volume discounts or step-fixed costs, rerun the numbers per scenario.",
        },
      ],
    },
    zh: {
      name: "盈亏平衡计算器",
      tagline:
        "输入固定成本、单价和单位变动成本,立即算出盈亏平衡销量与对应收入,附单位边际贡献、利润率,以及 0.5×/1.5×/2× 平衡销量下的利润对比表。",
      intro: [
        "输入你的固定成本——房租、工资、设备等不管卖多少都要付的开支——再加上单价和单位变动成本。计算器用固定成本除以边际贡献(单价减变动成本),得到利润恰好归零的销量。",
        "附带的利润表显示平衡销量 0.5 倍、1.5 倍和 2 倍时的盈亏,让你看清过了平衡点之后利润累积有多快。如果连变动成本都覆盖不了,工具会直说,而不是给一个没有意义的零。",
      ],
      steps: [
        "输入该期间的总固定成本。",
        "设置单价和单位变动成本。",
        "查看盈亏平衡销量与对应收入,以及每件边际贡献。",
        "再看 0.5×、1.5× 和 2× 平衡销量下的利润表。",
      ],
      faqs: [
        {
          q: "盈亏平衡分析用的是哪个公式?",
          a: "盈亏平衡销量 = 固定成本 ÷(单价 − 单位变动成本),差值就是边际贡献。例如固定成本 10,000、单价 50、变动成本 30,每卖一件贡献 20,卖 500 件(收入 25,000)即达到盈亏平衡。",
        },
        {
          q: "边际贡献为零或为负怎么办?",
          a: "此时任何销量都无法回本,计算器会直接说明,而不是返回一个数字:每多卖一件都在扩大亏损。出路是提价、降低变动成本,或者两者同时做。",
        },
        {
          q: "支持多产品或成本变化吗?",
          a: "本工具按单一产品、单位经济模型不变的经典教科书场景计算。产品组合可以用“单价减变动成本”的平均混合值;有批量折扣或阶梯式固定成本时,按情景分别重算即可。",
        },
      ],
    },
    ja: {
      name: "損益分岐点計算",
      tagline:
        "固定費・販売単価・変動費から損益分岐点の個数と売上を即時算出。限界利益・マージンに加え、分岐点の 0.5 倍/1.5 倍/2 倍での損益も一覧できます。",
      intro: [
        "家賃・人件費・設備など売上に関係なく発生する固定費と、販売単価・1 個あたりの変動費を入力します。固定費を限界利益(単価 − 変動費)で割り、利益がちょうどゼロになる個数を求めます。",
        "小さな利益表で、分岐点の 0.5 倍・1.5 倍・2 倍の生産量での損益を確認でき、分岐点を超えた後の利益の積み上がりがひと目でわかります。単価が変動費すら覆わない場合は、無意味なゼロではなくその旨を表示します。",
      ],
      steps: [
        "その期間の固定費合計を入力します。",
        "販売単価と 1 個あたりの変動費を設定します。",
        "損益分岐点の個数・売上と、1 個あたりの限界利益を確認します。",
        "分岐点の 0.5 倍・1.5 倍・2 倍での利益表もご覧ください。",
      ],
      faqs: [
        {
          q: "損益分岐点はどの式で計算しますか?",
          a: "損益分岐点(個)= 固定費 ÷(販売単価 − 1 個あたりの変動費)。差額が限界利益です。例えば固定費 10,000・単価 50・変動費 30 なら 1 個で 20 の貢献となり、500 個(売上 25,000)で分岐点に達します。",
        },
        {
          q: "限界利益がゼロやマイナスの場合は?",
          a: "その場合はどの数量でも損益分岐点に届かないため、数字ではなくそのことを表示します:1 個売るごとに固定費を埋めるどころか赤字が増えます。解決策は単価を上げる、変動費を下げる、その両方です。",
        },
        {
          q: "複数製品やコスト変動にも対応しますか?",
          a: "対象は単一製品で単位あたりの経済性が一定という、教科書的なケースです。製品ミックスでは「単価 − 変動費」の平均値を使い、数量割引や段階的固定費がある場合はシナリオごとに計算し直してください。",
        },
      ],
    },
    es: {
      name: "Calculadora del punto de equilibrio",
      tagline:
        "Halle las unidades y los ingresos en que un producto deja de perder dinero — costos fijos, precio y costo variable, margen y tabla de beneficio.",
      intro: [
        "Introduzca sus costos fijos — alquiler, sueldos, equipos, las facturas que paga sea cual sea el volumen — junto con el precio por unidad y el costo variable por unidad. La calculadora divide los costos fijos entre el margen de contribución, precio menos costo variable, y da las unidades en que el beneficio cruza cero.",
        "Una tabla pequeña muestra el beneficio o la pérdida a la mitad, a la vez y media y al doble del volumen de equilibrio, para ver con qué rapidez se acumula el margen tras superar el punto. Si el precio no cubre siquiera el costo variable, la herramienta lo indica en vez de mostrar un cero sin sentido.",
      ],
      steps: [
        "Escriba el total de costos fijos del periodo.",
        "Fije el precio por unidad y el costo variable por unidad.",
        "Lea las unidades y los ingresos de equilibrio, más el margen por unidad.",
        "Revise la tabla de beneficio a 0,5×, 1,5× y 2× el volumen de equilibrio.",
      ],
      faqs: [
        {
          q: "¿Qué fórmula usa el análisis del punto de equilibrio?",
          a: "Unidades de equilibrio = costos fijos ÷ (precio por unidad − costo variable por unidad). La diferencia es el margen de contribución: con 10.000 de costos fijos, un precio de 50 y un costo variable de 30, cada venta aporta 20, así que 500 unidades — 25.000 de ingresos — alcanzan el equilibrio.",
        },
        {
          q: "¿Y si el margen es cero o negativo?",
          a: "Entonces ningún volumen alcanza el equilibrio, y la calculadora lo dice en lugar de devolver un número: cada unidad vendida aumenta la pérdida en vez de cubrir los costos fijos. Las salidas son un precio más alto, un costo variable más bajo, o ambos.",
        },
        {
          q: "¿Sirve para varios productos o costos cambiantes?",
          a: "Modela un producto con costos unitarios constantes, el caso clásico de manual. Para una mezcla de productos use su promedio ponderado de precio menos costo variable; con descuentos por volumen o costos fijos escalonados, recalcule por escenario.",
        },
      ],
    },
    pt: {
      name: "Calculadora de ponto de equilíbrio",
      tagline:
        "Descubra as unidades e a receita em que um produto para de dar prejuízo — custos fixos, preço e custo variável, margem e tabela de lucro.",
      intro: [
        "Informe seus custos fixos — aluguel, salários, equipamentos, as contas pagas independentemente do volume — além do preço por unidade e do custo variável por unidade. A calculadora divide os custos fixos pela margem de contribuição, preço menos custo variável, e dá o número de unidades em que o lucro cruza o zero.",
        "Uma mini tabela mostra lucro ou prejuízo a meia, uma vez e meia e duas vezes o volume de equilíbrio, para você ver com que rapidez a margem se acumula depois do ponto. Se o preço não cobre nem o custo variável, a ferramenta avisa em vez de mostrar um zero sem sentido.",
      ],
      steps: [
        "Informe o total de custos fixos do período.",
        "Defina o preço por unidade e o custo variável por unidade.",
        "Veja as unidades e a receita de equilíbrio, mais a margem por unidade.",
        "Confira a tabela de lucro a 0,5×, 1,5× e 2× o volume de equilíbrio.",
      ],
      faqs: [
        {
          q: "Qual fórmula a análise de ponto de equilíbrio usa?",
          a: "Unidades de equilíbrio = custos fixos ÷ (preço por unidade − custo variável por unidade). A diferença é a margem de contribuição: com 10.000 de custos fixos, preço de 50 e custo variável de 30, cada venda contribui com 20, então 500 unidades — 25.000 de receita — equilibram as contas.",
        },
        {
          q: "E se a margem for zero ou negativa?",
          a: "Nesse caso nenhum volume atinge o equilíbrio, e a calculadora avisa em vez de devolver um número: cada unidade vendida aumenta o prejuízo em vez de cobrir os custos fixos. As saídas são um preço maior, um custo variável menor, ou os dois.",
        },
        {
          q: "Serve para vários produtos ou custos variáveis?",
          a: "A ferramenta modela um produto com custo unitário constante, o caso clássico de livro. Para um mix de produtos use sua média ponderada de preço menos custo variável; com descontos por volume ou custos fixos em degraus, refaça a conta por cenário.",
        },
      ],
    },
  },
});
