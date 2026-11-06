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
      deepDive: [
        {
          heading: "Discount types, and why the label rarely matches the math",
          paragraphs: [
            "Retail discounts come in several shapes that behave differently: a percentage off (“30% off”), a fixed amount off (“$20 off”), stacked offers (“extra 15% for members”), and threshold deals (“$50 off over $300”). A percentage and a fixed amount only coincide at one price point — above it the fixed amount is weaker, below it stronger — so the same campaign can favor different basket sizes.",
            "Stacked percentages are the classic trap, and this tool's second field exists for exactly that case. Because the second discount applies to the already-reduced price, the effective rate is one minus the product of the remainders: 20% then 10% leaves 0.8 × 0.9 = 0.72, an effective 28% off. Retailers know shoppers round up to 30%, which is precisely why the offer is phrased as two discounts rather than one.",
            "Order never changes the result for pure percentage stacks — multiplication commutes — but it can matter when a fixed-amount discount is mixed in: taking $20 off before 30% off leaves a different price than the reverse. When a checkout lets you choose the order, apply the percentage first and the fixed amount second if the rules allow; run both orders here if you are not sure.",
          ],
        },
        {
          heading: "The list-price question behind every discount",
          paragraphs: [
            "Every percentage here is calculated against the price you enter, which silently assumes that price is an honest reference. The common counter-move is reference-price inflation: raising the “original” price before a sale so the discount looks larger. Regulations in many markets require that a prior price actually have been charged for a reasonable period, but enforcement varies and cross-border shops play by different rules.",
            "A practical defense needs no trust at all: track the price over time. If the “was” price never appeared in the months before the campaign, the discount percentage is arithmetic on a fiction. Price-history tools and simple screenshots do the job; this calculator's role is the honest half — given a true original price, computing exactly what the deal is worth.",
            "The reverse calculation is the other everyday use: dividing the sale price by (1 − discount ÷ 100) recovers the implied original, which lets you check whether two differently-discounted offers are actually the same deal wearing different numbers.",
          ],
        },
        {
          heading: "Taxes, and why the total still surprises you",
          paragraphs: [
            "The discount is computed on the price you type, so its tax treatment follows that price: in tax-inclusive markets the result already contains tax, in tax-exclusive markets the tax is added afterward. The everyday trap is mixing the two — a discounted pre-tax price that then has sales tax added can end up higher than a smaller headline discount on a tax-inclusive sticker.",
            "Voucher codes add a second layer of surprises: minimum-spend thresholds, exclusions on already-reduced items, and caps on the maximum discount often apply before the percentages you see advertised. If a code underdelivers at checkout, compare its effective result here against the alternative of just buying at the shelf discount.",
            "As with every tool on this site, the arithmetic runs entirely in your browser — prices, percentages and comparisons stay on your device, and no shopping data is transmitted anywhere.",
          ],
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
      deepDive: [
        {
          heading: "折扣有几种,为什么标签和算术总对不上",
          paragraphs: [
            "零售折扣有好几种形态,行为各不相同:按比例(“7 折”)、按固定金额(“减 20 元”)、叠加券(“会员再享 85 折”)、满减(“满 300 减 50”)。比例折扣和固定金额折扣只在一个价格点上等价——价格更高时固定金额更弱,更低时更强——所以同一场活动对不同购物车大小的让利并不一样。",
            "折上折是经典陷阱,本工具的第二层折扣字段就是为它准备的。因为第二层折扣作用在已降价的基础上,实际折扣率等于 1 减去留存比例的乘积:先 8 折再 9 折,剩 0.8 × 0.9 = 0.72,实际是 72 折。商家清楚消费者会把 20% + 10% 凑成 30%,这恰恰是优惠要拆成两层来说的原因。",
            "纯比例叠加时先后顺序不影响结果——乘法可交换——但一旦混入固定金额折扣,顺序就有影响:先减 20 元再打 7 折,和先打 7 折再减 20 元,到手价不同。如果结账时允许选顺序,规则许可下先按比例、后按金额;拿不准就把两种顺序都在这里算一遍。",
          ],
        },
        {
          heading: "每个折扣背后都有一个“原价”问题",
          paragraphs: [
            "这里的每个百分比都基于你输入的价格计算,这默认了那个价格是诚实的参照。常见的反操作是抬高原价:促销前先把“原价”拉高,让折扣显得更大。许多市场的法规要求“划线价”必须在合理时期内真实成交过,但执行力度参差,跨境店铺又是另一套规则。",
            "一个不依赖信任的防御办法是追踪价格。如果“原价”在活动前几个月从未出现过,这个折扣率就是在虚构数字上做算术。比价工具和随手截图都能胜任;本工具负责诚实的那一半——给定真实的原价,算清这笔交易到底值多少。",
            "反向推算是另一个日常用法:用促销价除以(1 − 折扣 ÷ 100)还原隐含原价,就能核对两件折扣率不同的商品,是不是同一笔交易换了两个数字。",
          ],
        },
        {
          heading: "税,以及为什么到手总价还是让你意外",
          paragraphs: [
            "折扣按你输入的价格计算,所以税务处理跟随这个价格:在含税价市场,结果已经含税;在不含税价市场,税在折后另加。日常最容易踩的是把两种口径混在一起——不含税价打折后再加销售税,最终可能比含税标价上一个更小的“面子折扣”还贵。",
            "优惠券码是第二层意外:最低消费门槛、对已折价商品的排除、优惠金额上限,常常在你看到的百分比之前就先发挥作用。如果一个券码在结账时缩了水,在这里把它的实际结果和“只用货架折扣直接买”比一比。",
            "和本站所有工具一样,算术完全在浏览器内完成——价格、折扣率、比价结果都留在你的设备上,任何购物数据都不会被发送到别处。",
          ],
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
      deepDive: [
        {
          heading: "割引の種類と、ラベルが計算と合わない理由",
          paragraphs: [
            "小売の割引には挙動の違ういくつかの形があります。率引き(「30% オフ」)、金額引き(「2,000 円引」)、重ね掛け(「会員はさらに 15% オフ」)、しきい値型(「3 万円以上で 5,000 円引」)。率引きと金額引きが等しくなるのは一点だけで、それより高い価格では金額引きが弱く、低い価格では強くなります。同じキャンペーンでもカゴの大きさによって得られる額が変わるのはこのためです。",
            "重複割引は古典的な落とし穴で、このツールの 2 段階目の欄はまさにそのためのものです。2 段階目はすでに値引きされた価格に掛かるので、実質率は残存率の積で決まります。20% 引きの次に 10% 引きなら 0.8 × 0.9 = 0.72、実質 28% 引きです。小売業者は消費者が 30% と切り上げることを知っており、だからこそ一つの割引ではなく二段階として表示するのです。",
            "純粋な率引きの重ね掛けでは順序は結果に影響しません。乗算は交換可能だからです。しかし金額引きが混ざると話が変わります。先に 2,000 円引いてから 30% 引くのと逆の順では、最終価格が違います。順序を選べる場面では、ルールが許す限り率引きを先に。迷ったら両方の順序をここで計算してください。",
          ],
        },
        {
          heading: "あらゆる割引の背後にある「定価」問題",
          paragraphs: [
            "ここの百分率は入力した価格に対して計算されます。それはその価格が誠実な基準であるという暗黙の仮定です。対抗策としてよくあるのが参考価格の水増しです。セール前に「定価」を釣り上げて割引率を大きく見せる。多くの市場では、参考価格が妥当な期間実際に取引されていたことを求める規制がありますが、執行の度合いはまちまちで、越境 EC は別のルールで動いています。",
            "信頼に依存しない実務的な防御は、価格の追跡です。「もとの価格」がキャンペーン前の数か月に一度も現れていなければ、その割引率は架空の数字上の算術です。価格履歴ツールでも単純なスクリーンショットでも足ります。このツールの役割は誠実な側の半分、真の定価が与えられたときに取引の価値を正確に計算することです。",
            "逆算はもう一つの日常的な使い方です。セール価格 ÷ (1 − 割引率 ÷ 100) で暗黙の定価が復元でき、割引率の異なる二つのオファーが、実は同じ取引に別の数字を被せたものか判定できます。",
          ],
        },
        {
          heading: "税と、合計がまだ驚かせる理由",
          paragraphs: [
            "割引は入力した価格に対して計算されるので、税の扱いもその価格に従います。税込表示の市場では結果に税が含まれ、税抜表示の市場では税が後から加算されます。日常の落とし穴はこの二つの混同です。税抜価格を割り引いた後に売上税が加わると、税込ラベルの小さな見かけの割引より高くつくことがあります。",
            "クーポンコードは第二の意外さの層です。最低注文金額、値引き済み商品への除外、割引上限は、表示された百分率が働く前に効くことが多い。コードがレジで低くなったら、ここでその実質結果を、棚の割引のまま買う案と比べてください。",
            "このサイトのすべてのツールと同様、計算は完全にブラウザ内で動きます。価格・割引率・比較結果は端末に残り、ショッピングのデータがどこかへ送信されることはありません。",
          ],
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
      deepDive: [
        {
          heading: "Tipos de descuento, y por qué la etiqueta casi nunca coincide con la aritmética",
          paragraphs: [
            "Los descuentos minoristas vienen en varias formas que se comportan de distinto modo: un porcentaje («30% de rebaja»), un importe fijo («20 € menos»), ofertas apiladas («15% extra para socios») y promociones por umbral («50 € menos desde 300 €»). Un porcentaje y un importe fijo solo coinciden en un punto de precio: por encima el importe fijo es más débil y por debajo más fuerte, así que la misma campaña favorece a cestas de distinto tamaño.",
            "Los porcentajes apilados son la trampa clásica, y el segundo campo de esta herramienta existe justo para ese caso. Como el segundo descuento se aplica sobre el precio ya reducido, la tasa efectiva es uno menos el producto de los restos: 20% y después 10% dejan 0,8 × 0,9 = 0,72, un 28% efectivo. Los comercios saben que el comprador redondea a 30%, y precisamente por eso la oferta se formula como dos descuentos en vez de uno.",
            "El orden nunca cambia el resultado en pilas puras de porcentajes — la multiplicación conmuta — pero sí puede importar cuando se mezcla un importe fijo: restar 20 € antes de un 30% deja un precio distinto que al revés. Si el pago permite elegir el orden, aplique primero el porcentaje y después el importe fijo cuando las reglas lo permitan; si duda, calcule ambos órdenes aquí.",
          ],
        },
        {
          heading: "La pregunta del precio de referencia tras cada descuento",
          paragraphs: [
            "Cada porcentaje aquí se calcula contra el precio que usted introduce, lo que supone en silencio que ese precio es una referencia honesta. El contragolpe habitual es la inflación del precio de referencia: subir el precio «original» antes de la rebaja para que el descuento luzca mayor. Las normativas de muchos mercados exigen que el precio anterior se haya cobrado realmente durante un periodo razonable, pero la aplicación varía y las tiendas transfronterizas juegan con otras reglas.",
            "Una defensa práctica no necesita nada de confianza: siga el precio en el tiempo. Si el precio «antes» no apareció en los meses previos a la campaña, el porcentaje de descuento es aritmética sobre una ficción. Las herramientas de historial de precios y unas capturas simples cumplen; el papel de esta calculadora es la mitad honesta — dado un precio original verdadero, calcular exactamente lo que vale la oferta.",
            "El cálculo inverso es el otro uso cotidiano: dividir el precio de rebaja entre (1 − descuento ÷ 100) recupera el original implícito, lo que permite comprobar si dos ofertas con descuentos distintos son en realidad el mismo trato con números diferentes.",
          ],
        },
        {
          heading: "Impuestos, y por qué el total todavía sorprende",
          paragraphs: [
            "El descuento se calcula sobre el precio que usted escribe, así que su tratamiento fiscal sigue a ese precio: en mercados con impuestos incluidos el resultado ya los contiene, en mercados con impuestos excluidos el impuesto se añade después. La trampa cotidiana es mezclar ambos — un precio rebajado sin impuestos al que luego se añade el IVA puede acabar más caro que un descuento menor de escaparate sobre una etiqueta con impuestos incluidos.",
            "Los cupones añaden una segunda capa de sorpresas: mínimos de gasto, exclusiones sobre artículos ya rebajados y topes al descuento máximo suelen aplicar antes de los porcentajes anunciados. Si un código rinde menos en el pago, compare aquí su resultado efectivo con la alternativa de comprar directamente con el descuento de tienda.",
            "Como en todas las herramientas de este sitio, la aritmética corre íntegramente en su navegador: precios, porcentajes y comparaciones se quedan en su dispositivo, y ningún dato de compra se transmite a ninguna parte.",
          ],
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
      deepDive: [
        {
          heading: "Tipos de desconto, e por que a etiqueta raramente bate com a matemática",
          paragraphs: [
            "Os descontos no varejo vêm em várias formas que se comportam de modo diferente: percentual (“30% off”), valor fixo (“R$ 20 de desconto”), ofertas acumuladas (“mais 15% para associados”) e promoções por faixa (“R$ 50 off acima de R$ 300”). Um percentual e um valor fixo só coincidem num ponto de preço — acima dele o valor fixo é mais fraco, abaixo mais forte — então a mesma campanha favorece carrinhos de tamanhos diferentes.",
            "Percentuais acumulados são a armadilha clássica, e o segundo campo desta ferramenta existe exatamente para esse caso. Como o segundo desconto vale sobre o preço já reduzido, a taxa efetiva é um menos o produto dos restos: 20% e depois 10% deixam 0,8 × 0,9 = 0,72, um 28% efetivo. Os varejistas sabem que o consumidor arredonda para 30%, e é precisamente por isso que a oferta é formulada como dois descontos em vez de um.",
            "A ordem nunca muda o resultado em pilhas puras de percentual — a multiplicação comuta — mas pode importar quando um valor fixo entra na mistura: tirar R$ 20 antes de 30% deixa um preço diferente do inverso. Quando o checkout deixa escolher a ordem, aplique primeiro o percentual e depois o valor fixo, se as regras permitirem; na dúvida, calcule as duas ordens aqui.",
          ],
        },
        {
          heading: "A questão do preço de referência por trás de cada desconto",
          paragraphs: [
            "Cada percentual aqui é calculado sobre o preço que você digita, o que supõe em silêncio que esse preço é uma referência honesta. O contragolpe comum é a inflação do preço de referência: subir o preço “original” antes da promoção para o desconto parecer maior. Regras em muitos mercados exigem que o preço anterior tenha sido praticado de fato por um período razoável, mas a fiscalização varia e lojas transfronteiriças jogam por outras regras.",
            "Uma defesa prática não precisa de confiança nenhuma: acompanhe o preço no tempo. Se o preço “de” nunca apareceu nos meses antes da campanha, o percentual de desconto é aritmética sobre uma ficção. Ferramentas de histórico de preço e capturas de tela simples bastam; o papel desta calculadora é a metade honesta — dado um preço original verdadeiro, calcular exatamente quanto vale a oferta.",
            "O cálculo inverso é o outro uso cotidiano: dividir o preço promocional por (1 − desconto ÷ 100) recupera o original implícito, o que permite verificar se duas ofertas com descontos diferentes são na verdade a mesma negociação com números diferentes.",
          ],
        },
        {
          heading: "Impostos, e por que o total ainda surpreende",
          paragraphs: [
            "O desconto é calculado sobre o preço que você digita, então o tratamento tributário segue esse preço: em mercados com imposto incluso o resultado já o contém, em mercados com imposto por fora ele é somado depois. A armadilha do dia a dia é misturar os dois — um preço promocional sem imposto que depois ganha o tributo pode acabar mais caro que um desconto menor de vitrine numa etiqueta com imposto incluso.",
            "Os cupons adicionam uma segunda camada de surpresas: mínimos de gasto, exclusões de itens já em promoção e tetos no desconto máximo costumam valer antes dos percentuais anunciados. Se um código entregou menos no checkout, compare aqui o resultado efetivo dele com a alternativa de comprar direto pelo desconto de prateleira.",
            "Como em todas as ferramentas deste site, a aritmética roda inteiramente no seu navegador: preços, percentuais e comparações ficam no seu dispositivo, e nenhum dado de compra é enviado a lugar algum.",
          ],
        },
      ],
    },
  },
});
