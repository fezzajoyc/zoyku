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
        "The formulas are plain arithmetic — profit = revenue − cost, margin = profit ÷ revenue × 100, markup = profit ÷ cost × 100 — but the two ratios convert into each other non-obviously: a 25% margin equals a 33.3% markup, and a 50% markup is only a 33.3% margin.",
        "Mixing up margin and markup is one of the most common small-business pricing errors: pricing by a markup target while quoting margins to investors quietly overstates profitability. This tool shows both together with the absolute amount, so quotes, invoices and margin targets stay consistent. Payment fees, taxes and returns are not modeled — subtract them from revenue first.",
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
      deepDive: [
        {
          heading: "Margin vs. markup: the same profit, two denominators",
          paragraphs: [
            "Both ratios describe the same profit, but they divide by different things. Margin divides profit by the selling price — it answers \"what fraction of each dollar of revenue is profit?\" and is the number accountants and investors live by. Markup divides profit by cost — it answers \"how much did I add on top of what I paid?\" and is the number buyers and price-list authors work with.",
            "Because the denominators differ, the two never match, and they diverge more as margins grow. A 20% margin is a 25% markup; a 33.3% margin is a 50% markup; at 100% margin the markup is infinite — you sold at twice cost, but profit is the whole price, so cost-side markup has nothing left to divide by. The conversion is margin = markup ÷ (1 + markup) and markup = margin ÷ (1 − margin).",
            "The classic failure is a mixed audience: a buyer asks for \"25% on cost\", the owner prices it, then reports the result to a bank as a \"25% margin\" — which it is not. Pricing to a 25% margin needs cost ÷ 0.75, not cost × 1.25; the latter delivers only a 20% margin. Always check which denominator the person you are talking to means.",
          ],
        },
        {
          heading: "What the plain formulas deliberately leave out",
          paragraphs: [
            "Profit = revenue − cost looks self-evident, but both words hide decisions. \"Cost\" for a real business is more than the purchase price: per-shipment freight, payment-processing fees of a few percent, packaging, the returns you refund, and your own time. If you enter only the invoice cost, the margin shown flatters reality; fold fees into cost and subtract discounts from the price before judging whether a product line is worth it.",
            "Taxes are another boundary. The tool computes pre-tax arithmetic on the two numbers given; sales tax, VAT and income tax change both sides differently, so tax-inclusive pricing belongs in a dedicated VAT/GST calculator. Keeping the model simple is a feature — it makes clear which numbers you supplied and which you did not.",
            "One number this calculator cannot give you is breakeven: fixed costs like rent are shared across all sales, so per-item profit only means something after fixed costs are covered. Use these margins to compare products against each other, then use a proper break-even or profit-margin analysis when the question is whether the business as a whole survives.",
          ],
        },
        {
          heading: "Where this fits in a pricing workflow",
          paragraphs: [
            "Spreadsheet templates handle this fine for one item but are clumsy for quick what-ifs at the counter: \"supplier raised the price 8%, what does that do to my margin at the same shelf price?\" This tool answers that live with no formulas to maintain, and the paired display means the number you quote a customer and the number in your books cannot silently disagree.",
            "Compared with margin-target pricing tools, this one shows both ratios on every result, which is the point: the mistake is not computing either ratio wrong — it is computing one and calling it the other. As a quick check before sending a quote, seeing 25% and 33.3% side by side makes the convention explicit.",
            "As elsewhere on this site, all computation happens locally in your browser. Costs, prices and margins are among the most sensitive numbers a small business has; they are never transmitted or stored, so the calculator is safe to use mid-negotiation on a shared or public machine.",
          ],
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
      deepDive: [
        {
          heading: "利润率与加成率:同一笔利润,两个分母",
          paragraphs: [
            "两个比率描述的是同一笔利润,但除数不同。利润率用利润除以售价——回答\"每一块钱收入里有几毛是利润\",这是会计和投资人看的口径;加成率用利润除以成本——回答\"在进货价上加了多少\",这是采购和价目表使用的口径。",
            "分母不同,两个数就永远不相等,而且利润越高差距越大。20% 的利润率对应 25% 的加成率;33.3% 的利润率对应 50% 的加成率;利润率到 100% 时加成率趋于无穷——你按两倍成本卖出,利润占满了整个售价,成本一侧的加成已经没有分母可用。换算关系是:利润率 = 加成率 ÷ (1 + 加成率),加成率 = 利润率 ÷ (1 − 利润率)。",
            "典型的翻车场景是\"对上说一套、对下说一套\":客户要求\"成本上加 25%\",你照做了,然后向银行汇报\"利润率 25%\"——实际不是。想拿到 25% 的利润率,定价应该是成本 ÷ 0.75,而不是成本 × 1.25;后者只有 20% 利润率。跟任何人谈这两个词之前,先确认对方说的分母是哪一个。",
          ],
        },
        {
          heading: "朴素公式刻意不碰的东西",
          paragraphs: [
            "利润 = 收入 − 成本看似不证自明,但两个词背后都藏着决策。真实生意的\"成本\"远不止进货价:每批运费、百分之几的支付手续费、包装、要退给客户的退货、还有你自己的时间。如果只填发票上的进价,显示的利润率会偏乐观;判断一个品类值不值得做之前,先把手续费计入成本、把折扣从售价里扣掉。",
            "税是另一条边界。本工具只对输入的两个数做税前算术;销售税、增值税和所得税对两边的影响各不相同,含税定价应该交给专门的 VAT/GST 计算器。模型保持简单是一种设计选择——它让\"哪些数字是你提供的、哪些不是\"一目了然。",
            "这个计算器给不了的还有一个数:盈亏平衡。房租之类的固定成本要摊到所有销售上,单品利润只有在固定成本被覆盖之后才有意义。用这里的利润率横向比较产品,而\"这门生意整体能不能活\"的问题,交给正经的盈亏平衡分析。",
          ],
        },
        {
          heading: "它在定价流程中的位置",
          paragraphs: [
            "表格模板算一件商品没问题,但在柜台前快速试算就很笨重:\"供应商涨价 8%,货架价不变的话我的利润率变成多少?\"本工具即时回答这类问题,不用维护任何公式;成对显示意味着你报给客户的数字和账本里的数字不会悄悄打架。",
            "和市面上的目标利润率定价工具相比,本工具每次结果都同时给出两个比率——这正是要点:错误从来不是\"哪个比率算错了\",而是\"算了其中一个,却把它当成另一个说出去\"。发报价单之前扫一眼 25% 和 33.3% 并排摆着,口径就写清楚了。",
            "和本站其他工具一样,全部计算都在浏览器本地完成。成本、价格和利润率是小生意里最敏感的数字;它们不会被发送或存储,所以在谈判中途、在公用或借来的电脑上使用都是安全的。",
          ],
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
      deepDive: [
        {
          heading: "利益率とマークアップ率:同じ利益、異なる分母",
          paragraphs: [
            "2 つの比率は同じ利益を述べていますが、割る相手が違います。利益率は利益を販売価格で割る——「売上 1 円のうち利益はいくらか」に答え、経理や投資家が見る指標です。マークアップ率は利益を仕入価格で割る——「仕入にいくら上乗せしたか」に答え、仕入れ担当や価格表が使う指標です。",
            "分母が違うため両者が一致することはなく、利益率が高くなるほど差は広がります。利益率 20% はマークアップ 25%、利益率 33.3% はマークアップ 50%。利益率 100% ではマークアップは無限大です——原価の 2 倍で売っても利益は価格の全体を占め、原価側にはもう割る対象が残っていません。換算式は 利益率 = マークアップ ÷ (1 + マークアップ)、マークアップ = 利益率 ÷ (1 − 利益率) です。",
            "定番の失敗は「相手によって言い分ける」ことです。バイヤーに「原価の 25% 上乗せ」と言われて値付けし、その結果を銀行には「利益率 25%」として報告——実際は違います。利益率 25% を狙う価格は 原価 ÷ 0.75 であって 原価 × 1.25 ではありません。後者で得られるのは利益率 20% だけです。この言葉を使う前に、相手の分母を必ず確認してください。",
          ],
        },
        {
          heading: "素朴な式があえて含めないもの",
          paragraphs: [
            "利益 = 収入 − 原価 は自明に見えますが、両方の言葉の裏に判断が隠れています。実際のビジネスの「原価」は仕入価格だけではありません。毎回の送料、数パーセントの決済手数料、包装、返品の返金、そして自分の時間です。請求書の仕入価格だけを入力すると、表示される利益率は実態より良く出ます。手数料を原価に織り込み、割引を価格から差し引いてから、その商品ラインの値打ちを判断してください。",
            "税も境界線です。このツールは入力された 2 数値に対する税前の計算だけを行います。売上税・VAT・所得税は両側に別々の影響を与えるため、税込の価格設定は専用の VAT/GST 計算ツールに任せるのが正しい分担です。モデルを単純に保つのは設計上の選択で、「どの数字が自分の入力で、どれがそうでないか」を明確にします。",
            "この計算機が出せないもう一つの数値が損益分岐点です。家賃のような固定費は全販売に共通するので、固定費の回収が済むまで単品利益は意味を持ちません。ここでの利益率は商品同士の比較に使い、「ビジネス全体が成立するか」という問いには本格的な損益分岐分析をお使いください。",
          ],
        },
        {
          heading: "価格設定の流れの中での位置づけ",
          paragraphs: [
            "スプレッドシートのテンプレートは 1 商品の計算には十分ですが、店頭での素早い試算には不向きです。「仕入が 8% 上がったら、売価そのままで利益率はどうなる?」このツールは維持すべき式なしで即座に答え、両指標の並列表示のおかげで、客に伝える数字と帳簿の数字が黙って食い違うことがありません。",
            "目標利益率型の定価ツールと比べた際のポイントは、毎回の結果に両方の比率が出ることです。間違いは「どちらかの比率の計算を間違える」ことではなく、「一方を計算してそれをもう一方の名で呼ぶ」ことだからです。見積書を送る前の確認として、25% と 33.3% が並んでいるだけで基準が明示されます。",
            "このサイトの他のツールと同様、計算はすべてブラウザ内でローカルに行われます。原価・価格・利益率は小規模ビジネスで最も機微な数字の類であり、送信も保存もされないので、交渉の最中でも、共用や借り物の PC でも安心して使えます。",
          ],
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
      deepDive: [
        {
          heading: "Margen frente a recargo: la misma ganancia, dos denominadores",
          paragraphs: [
            "Las dos razones describen la misma ganancia, pero dividen por cosas distintas. El margen divide la ganancia por el precio de venta — responde \"qué parte de cada unidad de ingresos es beneficio\" y es la cifra con la que trabajan contables e inversores. El recargo divide la ganancia por el costo — responde \"cuánto añadí sobre lo que pagué\" y es la cifra de compradores y listas de precios.",
            "Como los denominadores difieren, nunca coinciden, y se separan más cuanto mayor es el margen. Un 20% de margen es un 25% de recargo; un 33,3% de margen es un 50% de recargo; con un margen del 100% el recargo es infinito — vendió al doble del costo, pero la ganancia es todo el precio y al lado del costo ya no queda nada que dividir. La conversión es margen = recargo ÷ (1 + recargo) y recargo = margen ÷ (1 − margen).",
            "El fallo clásico es hablar con dos glosarios: el comprador pide \"25% sobre costo\", usted fija el precio y luego informa al banco de un \"margen del 25%\" — que no lo es. Preciar para un margen del 25% exige costo ÷ 0,75, no costo × 1,25; esto último solo deja un 20% de margen. Antes de usar cualquiera de las dos palabras, confirme qué denominador tiene en mente la otra persona.",
          ],
        },
        {
          heading: "Lo que las fórmulas simples dejan fuera a propósito",
          paragraphs: [
            "Ganancia = ingresos − costo parece obvio, pero ambas palabras esconden decisiones. El \"costo\" de un negocio real es más que el precio de compra: el flete de cada envío, unas comisiones de procesamiento de pago de un pequeño porcentaje, el embalaje, las devoluciones que reembolsa y su propio tiempo. Si solo introduce el costo de factura, el margen que ve halaga la realidad; antes de juzgar si una línea de productos vale la pena, sume comisiones al costo y reste descuentos del precio.",
            "Los impuestos son otra frontera. La herramienta hace aritmética pre-impuestos sobre los dos números dados; el IVA, el IRPF y otros cambian cada lado de forma distinta, así que los precios con impuesto incluido corresponden a una calculadora de IVA o GST. Mantener el modelo simple es una decisión: deja claro qué números dio usted y cuáles no.",
            "Un dato que esta calculadora no puede darle es el punto de equilibrio: los costos fijos como el alquiler se reparten entre todas las ventas, así que el beneficio por artículo solo significa algo después de cubrirlos. Use estos márgenes para comparar productos entre sí, y un análisis de break-even propio cuando la pregunta sea si el negocio en conjunto sobrevive.",
          ],
        },
        {
          heading: "Dónde encaja en un flujo de fijación de precios",
          paragraphs: [
            "Una plantilla de hoja de cálculo resuelve un artículo sin problema, pero es torpe para las hipótesis rápidas en el mostrador: \"el proveedor subió un 8%, ¿qué pasa con mi margen al mismo precio de estantería?\" Esta herramienta responde al momento sin fórmulas que mantener, y la vista emparejada evita que el número que cita al cliente y el de sus libros discrepen en silencio.",
            "Frente a las herramientas de precio por margen objetivo, el punto está en que cada resultado muestra las dos razones: el error no consiste en calcular mal ninguno de los dos, sino en calcular uno y llamarlo con el nombre del otro. Como comprobación antes de enviar un presupuesto, ver el 25% y el 33,3% lado a lado deja explícita la convención.",
            "Como en el resto del sitio, todo el cálculo ocurre localmente en su navegador. Costos, precios y márgenes están entre los números más sensibles de un pequeño negocio; nunca se transmiten ni se almacenan, así que es seguro usarla en mitad de una negociación en un equipo compartido o público.",
          ],
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
      deepDive: [
        {
          heading: "Margem frente a markup: o mesmo lucro, dois denominadores",
          paragraphs: [
            "As duas razões descrevem o mesmo lucro, mas dividem por coisas diferentes. A margem divide o lucro pelo preço de venda — responde \"que fatia de cada real de receita é lucro\" e é o número de contadores e investidores. O markup divide o lucro pelo custo — responde \"quanto acrescentei sobre o que paguei\" e é o número de compradores e autores de tabelas de preço.",
            "Como os denominadores diferem, os dois nunca coincidem, e a distância cresce com a margem. Uma margem de 20% é um markup de 25%; uma margem de 33,3% é um markup de 50%; com margem de 100% o markup é infinito — você vendeu pelo dobro do custo, mas o lucro é o preço inteiro e do lado do custo não sobra nada para dividir. A conversão é margem = markup ÷ (1 + markup) e markup = margem ÷ (1 − margem).",
            "A falha clássica é falar dois idiomas: o comprador pede \"25% sobre o custo\", você precifica e depois informa ao banco um \"margem de 25%\" — que não é. Precificar para uma margem de 25% exige custo ÷ 0,75, não custo × 1,25; isso deixa só 20% de margem. Antes de usar qualquer uma das palavras, confirme qual denominador a outra pessoa tem em mente.",
          ],
        },
        {
          heading: "O que as fórmulas simples deixam de fora de propósito",
          paragraphs: [
            "Lucro = receita − custo parece óbvio, mas as duas palavras escondem decisões. O \"custo\" de um negócio real é mais que o preço de compra: frete de cada lote, taxas de cartão de poucos por cento, embalagem, as devoluções que você reembolsa e o seu próprio tempo. Se você informa só o custo da nota, a margem mostrada fica mais bonita que a realidade; antes de julgar se uma linha de produtos vale a pena, some taxas ao custo e desconte cupons do preço.",
            "Impostos são outra fronteira. A ferramenta faz aritmética antes dos impostos com os dois números dados; imposto sobre vendas, IVA e imposto de renda mexem nos dois lados de formas diferentes, então preço com imposto incluído pertence a uma calculadora de IVA ou GST. Manter o modelo simples é uma escolha: fica claro quais números você forneceu e quais não.",
            "Um número que esta calculadora não pode dar é o ponto de equilíbrio: custos fixos como aluguel se espalham por todas as vendas, então o lucro por item só significa algo depois de cobri-los. Use estas margens para comparar produtos entre si, e uma análise de break-even própria quando a pergunta é se o negócio como um todo sobrevive.",
          ],
        },
        {
          heading: "Onde isso encaixa num fluxo de precificação",
          paragraphs: [
            "Uma planilha resolve um item sem problema, mas é desajeitada para hipóteses rápidas no balcão: \"o fornecedor subiu 8%, o que acontece com minha margem mantendo o preço de prateleira?\" Esta ferramenta responde na hora, sem fórmulas para manter, e a exibição em par evita que o número citado ao cliente e o dos seus livros discordem em silêncio.",
            "Diante de ferramentas de preço por margem-alvo, o ponto é que todo resultado mostra as duas razões: o erro não é calcular mal uma delas, é calcular uma e chamá-la pelo nome da outra. Como verificação antes de enviar um orçamento, ver 25% e 33,3% lado a lado deixa a convenção explícita.",
            "Como no resto do site, todo o cálculo acontece localmente no seu navegador. Custos, preços e margens estão entre os números mais sensíveis de um pequeno negócio; nunca são transmitidos nem armazenados, então é seguro usar no meio de uma negociação, numa máquina compartilhada ou emprestada.",
          ],
        },
      ],
    },
  },
});
