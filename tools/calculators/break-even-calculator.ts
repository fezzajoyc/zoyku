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
        "The formula is the standard break-even quantity Q = F ÷ (P − V), where F is total fixed cost, P the price per unit and V the variable cost per unit; the denominator is the contribution margin each sale adds toward covering fixed costs. The same inputs also yield break-even revenue, Q × P.",
        "The tool goes further than the single number: it shows the margin ratio and projects profit at half, 1.5 and 2 times break-even so you can size a sales target before setting prices. It assumes price and variable cost stay constant across volumes — real bulk discounts and capacity limits bend the line — so treat it as a planning model, not a forecast.",
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
      deepDive: [
        {
          heading: "Fixed vs. variable costs: the split that decides everything",
          paragraphs: [
            "The whole analysis rests on one classification decision: which costs are fixed and which are variable. Fixed costs — rent, salaried staff, insurance, software subscriptions — do not move with volume over the period you are analyzing. Variable costs — materials, per-unit packaging, payment processing fees, per-order shipping — scale directly with each unit sold. The contribution margin, price minus variable cost, is only as honest as this split.",
            "Real costs rarely fall cleanly into one bucket. Electricity has a fixed baseline plus a per-machine variable portion; a commission-based salesperson mixes the two. The practical convention is to classify by what changes when you sell one more unit: if a cost would rise with the next sale, it belongs in V; if it would not, it belongs in F. When in doubt, put it in variable cost — that makes your break-even estimate conservative rather than optimistic.",
            "This split is also why the formula works at all: fixed costs must be repaid in full no matter what, while each sale contributes its margin toward that pile. Once 500 sales have each contributed 20, the 10,000 of fixed cost is covered and every unit after that contributes pure profit. That is the mental model behind the profit table below the number.",
          ],
        },
        {
          heading: "Reading the margin and the profit table",
          paragraphs: [
            "The margin ratio — contribution margin divided by price — tells you how much of every sales dollar is available to fight fixed costs. A 40% margin means 60 cents of every sale is consumed by variable costs. Low-margin businesses need high volume to break even; high-margin ones can survive on fewer sales but often carry heavier fixed costs (software, R&D), which pushes their break-even back up. The ratio makes that trade-off visible.",
            "The profit table at 0.5×, 1.5× and 2× break-even shows the shape of the payoff. Below the point, losses accumulate linearly — at half break-even you are losing exactly half the fixed cost. Above it, profit accumulates at the same constant slope. The symmetry is the point: it shows that once unit economics are fixed, the only lever to the break-even point is volume, and past it, every unit earns the same margin.",
            "Use the table to sanity-check targets: if 2× break-even is the realistic upside in year one, the downside at 0.5× tells you how much cash the business can burn before it must reprice or cut costs. That gap between the two rows is your planning envelope.",
          ],
        },
        {
          heading: "Where the textbook model bends",
          paragraphs: [
            "The formula assumes price and variable cost are flat lines, and reality is curved. Bulk discounts on materials lower V as volume grows; overtime pay, capacity limits and expedited freight raise it. Price itself often falls at scale as you push into less eager market segments. Each of these bends the straight lines into curves, and the single break-even number becomes a range. Rerun the calculation per scenario instead of extrapolating one answer.",
            "Multi-product businesses face the same problem: the formula covers one product, so a product mix needs a blended contribution margin weighted by expected sales share — and the mix itself shifts as volume grows. Fixed costs can also be step-shaped: the second warehouse or the tenth hire jumps F, it does not grow smoothly.",
            "None of this makes the model useless — it remains the fastest first-pass feasibility check for a product, a price change or a stall at a market. Just treat the output as a planning baseline, rerun it with pessimistic and optimistic inputs, and remember the denominator's warning: if margin is near zero, a small cost slip can move break-even from reachable to impossible.",
          ],
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
      deepDive: [
        {
          heading: "固定成本与变动成本:这个划分决定一切",
          paragraphs: [
            "整个分析都建立在一个分类决定上:哪些成本是固定的,哪些是变动的。固定成本——房租、正式员工工资、保险、软件订阅费——在你分析的期间内不随销量变动。变动成本——原材料、单件包装、支付手续费、按单计的运费——随每售出一件而线性增加。边际贡献(单价减变动成本)是否可信,完全取决于这个划分。",
            "真实成本很少干净地落进某一类:电费有固定基础费用加上随机器运转变动的部分,提成制销售则是两者的混合。实务上的判断标准是“多卖一件会不会多花这笔钱”:会涨的归入变动成本,不会的归入固定成本。拿不准时宁可放进变动成本——这样算出的平衡点偏保守,而不是偏乐观。",
            "这个划分也解释了公式为什么成立:固定成本不管卖多少都得全额支付,而每笔销售都会贡献自己的边际去填这个坑。500 件每件贡献 20,10,000 的固定成本就补满了,之后的每一件都是纯利润。下面那张利润表背后的逻辑正是如此。",
          ],
        },
        {
          heading: "怎么读边际贡献率和利润表",
          paragraphs: [
            "边际贡献率(边际贡献 ÷ 单价)告诉你每收进一元钱里有多少能用来消化固定成本。40% 的边际贡献率意味着每笔销售的六成被变动成本吃掉。低毛利生意需要巨大的销量才能平衡;高毛利生意销量少也能活,但往往背着更重的固定成本(研发、软件),又把平衡点推了回去。这个比率让利弊取舍一目了然。",
            "0.5×、1.5× 和 2× 平衡销量的利润表展示的是收益曲线的形状。平衡点以下亏损线性累积——半量即亏掉一半固定成本;以上利润也以同样的斜率线性累积。对称性本身就有信息量:单位经济模型一旦定死,平衡点之前唯一的杠杆是销量,过了平衡点每件挣的都是同样的边际。",
            "用这张表校验目标:如果第一年现实的上限是 2 倍平衡销量,那 0.5 倍那一行的亏损就告诉你业务能烧多少钱才必须调价或砍成本。两行之间的差额就是你的规划空间。",
          ],
        },
        {
          heading: "教科书模型在哪里失真",
          paragraphs: [
            "公式假设单价和变动成本是两条水平线,现实是曲线。原材料批量采购会压低变动成本;加班费、产能瓶颈和加急运费会抬高它。价格本身在放量后也常因进入更不情愿买的客群而下滑。这些都会把直线掰弯,唯一的平衡点变成一个区间。别外推一个答案,按情景分别重算。",
            "多产品生意同理:公式只覆盖单一产品,产品组合需要按预期销量占比加权出混合边际贡献——而组合本身也会随规模变化。固定成本还可能是阶梯状的:第二间仓库、第十名员工让固定成本跳一跳,而不是平滑增长。",
            "这些都不妨碍模型的价值——它仍是给产品、调价或摆摊做第一轮可行性判断最快的工具。只要把输出当规划基线,分别用悲观和乐观参数重跑,并且盯住分母的警告:边际贡献接近零时,一点成本波动就能把平衡点从够得着推到够不着。",
          ],
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
      deepDive: [
        {
          heading: "固定費と変動費の切り分けがすべてを決める",
          paragraphs: [
            "分析全体を支えるのは一つの分類判断です。固定費——家賃、正社員の人件費、保険、ソフトウェア契約——は分析する期間中、販売量に応じて動きません。変動費——材料、1 個あたりの梱包費、決済手数料、注文ごとの送料——は売れた個数に比例して増えます。限界利益(単価 − 変動費)の信頼性は、この切り分け次第です。",
            "現実のコストはきれいには分かれません。電気代は固定の基本料金と稼働に応じた従量部分を持ち、歩合制の営業人件費は両方の性質を併せ持ちます。実務上の基準は「もう 1 個売るときにこの費用が増えるか」です。増えるなら変動費、増えないなら固定費。迷ったら変動費に入れるのが安全です——分岐点が楽観ではなく保守寄りに出ます。",
            "この切り分けがあるから式が成立します。固定費は売れ行きにかかわらず全額払わねばならず、1 個の売上がその山へ限界利益を積み上げます。500 個 × 20 の貢献で 10,000 の固定費が埋まり、それ以降の 1 個はそのまま利益になります。下の利益表の考え方はまさにこれです。",
          ],
        },
        {
          heading: "限界利益率と利益表の読み方",
          paragraphs: [
            "限界利益率(限界利益 ÷ 単価)は、売上 1 円のうち固定費の埋め合わせに回せる割合を示します。40% なら売上の 6 割が変動費で消えます。低マージンの事業は損益分岐までに大きな数量が必要で、高マージンの事業は少数の売上で成り立つ代わりに研究開発やソフトウェアなど固定費が重く、分岐点がまた押し上がります。この比率がそのトレードオフを見える化します。",
            "分岐点の 0.5 倍・1.5 倍・2 倍の利益表は損益の形を示します。分岐点の下では損失が線形に積み上がり(半量なら固定費の半分が赤字)、上では同じ傾きで利益が積み上がります。この対称性が大事です。単位あたりの経済性が決まっていれば、分岐点までの唯一のレバーは数量で、超えた後は 1 個ごとに同じ限界利益が乗ります。",
            "この表で目標の整合性を確認しましょう。初年度の現実的な上限が分岐点の 2 倍なら、0.5 倍の行の赤字が、値付けの見直しやコスト削減までに耐えられる現金の額を教えます。2 行の差が計画の許容範囲です。",
          ],
        },
        {
          heading: "教科書モデルが曲がる場所",
          paragraphs: [
            "この式は単価と変動費が水平線であると仮定しますが、現実は曲線です。材料の大量購入は変動費を下げ、残業代・生産能力の限界・緊急輸送は上げます。単価も量を拡大すると買い控え層に売るため下がりがちです。これらは直線を曲げ、単一の分岐点を範囲に変えます。一つの答えを外挿せず、シナリオごとに計算し直してください。",
            "多製品事業も同様です。式は単一製品用なので、製品ミックスでは予想販売比率で加重した平均限界利益を使います——しかもミックス自体が量の拡大とともに動きます。固定費も階段状になりえます。2 つ目の倉庫や 10 人目の採用は固定費を滑らかに増やすのではなく、一気に跳ね上げます。",
            "それでもこのモデルの価値は変わりません。製品立ち上げ、価格変更、出店などの一発目の実現可能性チェックとしては最速です。出力を計画の基準値と考え、悲観・楽観の入力でそれぞれ再計算し、分母の警告を忘れないでください。限界利益がゼロに近いと、わずかなコストの狂いで分岐点が手の届く範囲から手の届かない範囲へ移ります。",
          ],
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
