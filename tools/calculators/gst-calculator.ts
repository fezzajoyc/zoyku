import { CalcEngineTax } from "../_engines/calc-engine-tax";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "gst-calculator",
  category: "utility",
  icon: "shield",
  engine: { component: CalcEngineTax, props: { kind: "gst" } },
  related: ["vat-calculator", "discount-calculator", "profit-calculator", "percentage-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "GST Calculator",
      tagline: "Add or extract GST at the 5%, 12%, 18% and 28% slab rates — net, tax and gross amounts computed live in your browser.",
      intro: [
        "Enter any amount and pick one of India's four GST slabs to add tax to a net price, or remove the GST already included in a gross (MRP) price. All three figures — net, tax and gross — update as you type.",
        "Useful for invoices, reverse charge checks, shopping comparisons between states with different slabs, and understanding exactly how much of a sticker price is tax.",
        "Rates follow the GST Council's slab structure — 5%, 12%, 18% and 28%, with 18% covering most services. Adding tax multiplies the net amount; removing it divides a gross price by (1 + rate), so the GST inside a 1,180 gross price at 18% is 180, not 212.40 — the most common invoice mistake this tool prevents.",
        "Compared with a generic percentage calculator, the add/remove direction toggle and the three always-visible figures (net, tax, gross) match how invoices and MRP labels are actually written. Cesses on items such as automobiles sit on top of the slab and are not modeled here; confirm your item's HSN classification and applicable rate before filing.",
      ],
      steps: [
        "Type the amount — net if adding GST, gross if extracting it.",
        "Choose the applicable slab: 5%, 12%, 18% or 28%.",
        "Pick Add tax or Remove tax and read the net, tax and gross figures.",
      ],
      faqs: [
        {
          q: "What are the GST slabs in India?",
          a: "The main rates are 5%, 12%, 18% and 28%: essentials sit at 0–5%, most goods and services at 12–18%, and luxury or sin goods at 28% (sometimes with an additional cess). The tool covers the four standard slabs.",
        },
        {
          q: "How do I remove GST from a tax-inclusive price?",
          a: "Choose “Remove tax” and enter the gross amount. The base is recovered as gross ÷ (1 + rate/100), so a ₹118 gross price at 18% GST has a net of ₹100 and ₹18 of tax.",
        },
        {
          q: "Is GST the same as VAT?",
          a: "Both are value-added taxes charged at each stage, but GST in India is a single unified tax subsuming central excise, service tax and state VAT, split into CGST + SGST (intra-state) or IGST (inter-state). Other countries call their equivalent simply VAT.",
        },
      ],
      deepDive: [
        {
          heading: "Slabs and the subtraction trap",
          paragraphs: [
            "India's GST is organized as a slab structure — currently the working rates are 0–5% for essentials, 12% and 18% for most goods and services, and 28% for luxury or sin goods, sometimes with an additional cess on top. The tool exposes the four standard slabs as one-tap choices, which matches how invoices are actually written: the rate is a small set, not a free decimal.",
            "The extraction direction is the classic trap. The GST inside a tax-inclusive price is gross × rate ÷ (100 + rate), not gross × rate ÷ 100. At 18%, a 1,180 gross price holds 180 of tax — dividing 1,180 by 1.18 — while the naive 18% of 1,180 gives 212.40, quietly overstating the tax.",
            "A quick sanity check for any GST number: net + tax must equal gross exactly. If your three figures do not close, one of them came from the wrong base — usually a percentage applied to the gross instead of the division formula.",
          ],
        },
        {
          heading: "One tax, split between two levels of government",
          paragraphs: [
            "GST unified a patchwork of central excise, service tax and individual states' VAT into a single tax, which is why an invoice may show the same amount as two components: CGST plus SGST for intra-state sales, or IGST for inter-state ones. The arithmetic rate you pick here is the same either way — the split is a matter of how the tax is remitted, not how it is computed.",
            "This is also the practical difference from VAT as used in most other countries: mechanically both tax value added at each stage and end up on the consumer, but India's version routes the revenue between the central and state governments rather than to a single authority.",
            "The tool deliberately stays at arithmetic. Whether a product's HSN classification pulls it into a different slab, whether a cess applies on top, or how reverse charge is booked are classification and filing questions — confirm them against the current GST Council notifications for your item.",
          ],
        },
        {
          heading: "Where this fits a workflow",
          paragraphs: [
            "The most common daily use is reading MRP-style prices: a sticker price is tax-inclusive, so “Remove tax” answers how much of what you paid is actually tax — useful when comparing products across categories with different slabs, since a higher sticker price can hide a lower net price.",
            "For sellers, the add direction builds an invoice from a net price: pick the slab, read gross and tax, and the three figures match the invoice layout instead of needing a separate spreadsheet. Contract year and pricing drafts benefit from running locally in the browser, with no data leaving the device.",
            "Pair it with the VAT calculator when working across countries, and the profit calculator when the net figure needs a margin on top before tax is added.",
          ],
        },
      ],
    },
    zh: {
      name: "GST 计算器(印度消费税)",
      tagline: "按 5%、12%、18%、28% 四档 GST 税率价外加税或价内拆税,净额、税额、含税额实时计算,浏览器本地完成。",
      intro: [
        "输入任意金额并选择印度四档 GST 税率之一:可以给净价加税,也可以从含税价(如 MRP)中拆出 GST。净额、税额、含税额三项随输入实时更新。",
        "适合开发票、核对反向征收、比较不同税档邦之间的价格,以及看清标价里到底含多少税。",
      ],
      steps: [
        "输入金额——加 GST 时填净价,拆 GST 时填含税价。",
        "选择适用税档:5%、12%、18% 或 28%。",
        "选择“价外加税”或“价内拆税”,查看净额、税额与含税额。",
      ],
      faqs: [
        {
          q: "印度的 GST 税档有哪些?",
          a: "主要税率为 5%、12%、18%、28%:生活必需品为 0–5%,大多数商品和服务为 12–18%,奢侈品及特定商品为 28%(有的还要加征 cess)。本工具覆盖四个标准税档。",
        },
        {
          q: "怎么从含税价里拆出 GST?",
          a: "选择“价内拆税”并输入含税金额。净价 = 含税价 ÷ (1 + 税率/100):例如含 18% GST 的 ₹118,净价为 ₹100,税额为 ₹18。",
        },
        {
          q: "GST 和 VAT 是一回事吗?",
          a: "两者都是逐环节征收的增值税,但印度 GST 是统一税种,合并了中央消费税、服务税和各邦 VAT,邦内交易拆为 CGST + SGST,跨邦为 IGST。其他国家通常直接称为 VAT。",
        },
      ],
      deepDive: [
        {
          heading: "税档结构,以及“减法陷阱”",
          paragraphs: [
            "印度 GST 采用税档结构:目前实际运行的税率是必需品 0–5%、大多数商品和服务 12% 与 18%、奢侈品和特定商品 28%,部分商品还要在税档之上加征 cess。本工具把四个标准税档做成一键选项,和真实发票的写法一致:税率来自一个小集合,不是任意小数。",
            "拆税方向是经典陷阱:含税价里的 GST 是 含税价 × 税率 ÷ (100 + 税率),而不是 含税价 × 税率 ÷ 100。18% 税档下,含税 1,180 里的税是 180(1,180 ÷ 1.18),而直接按 1,180 × 18% 会得到 212.40,悄悄多算了税。",
            "任何 GST 数字都可以做这个 sanity check:净额 + 税额 必须恰好等于含税额。三个数对不上,说明其中一个用了错误的基数——通常是拿百分比去乘含税价,而不是用除法公式。",
          ],
        },
        {
          heading: "一种税,两级政府分账",
          paragraphs: [
            "GST 把中央消费税、服务税和各邦各自的 VAT 整合成单一税种,所以发票上同一笔税可能拆成两部分:邦内交易写 CGST + SGST,跨邦交易写 IGST。这里选择的税率两种情形完全一样——拆分是缴入哪级国库的问题,不影响怎么算。",
            "这也是它和大多数国家的 VAT 在实务上的差别:机制上都是逐环节对增值征税、最终落在消费者身上,但印度版本要把收入在中央和邦之间分配,而不是归单一国库。",
            "本工具刻意只做算术:某个商品的 HSN 归类会落进哪个税档、是否加征 cess、反向征收如何入账,这些是归类和申报问题,请以现行 GST Council 通知为准。",
          ],
        },
        {
          heading: "工作流里的位置",
          paragraphs: [
            "最常见的日常用法是读 MRP 式标价:标价是含税价,“价内拆税”会告诉你实付里有多少是税——比较不同税档商品时特别有用,因为标价更高的一方,净价可能反而更低。",
            "对卖家,“价外加税”从净价出发开发票:选税档、读含税额和税额,三个数字直接对应发票版式,不用再开表格。合同年度核算和定价草稿都受益于浏览器本地运行,数据不出设备。",
            "跨国场景配合 VAT 计算器;净价上还要加利润再算税时,配合利润计算器。",
          ],
        },
      ],
    },
    ja: {
      name: "GST 計算(インド)",
      tagline: "5%・12%・18%・28% の GST 税率で税抜⇔税込を雙方向に計算。税抜額・税額・税込額をリアルタイム表示します。",
      intro: [
        "金額を入力してインドの 4 つの GST 税区分からひとつ選ぶだけ。税抜価格に税を上乗せすることも、税込価格(MRP など)から GST を取り出すこともできます。税抜・税額・税込の 3 つが入力に合わせて更新されます。",
        "請求書の作成、リバースチャージの確認、税区分の違う州間の価格比較、表示価格のうちいくらが税かの把握に便利です。",
      ],
      steps: [
        "金額を入力します(税を足すなら税抜、取り除くなら税込)。",
        "該当する税区分(5%・12%・18%・28%)を選びます。",
        "「税を追加」か「税を除外」を選び、税抜・税額・税込を確認します。",
      ],
      faqs: [
        {
          q: "インドの GST 税区分は?",
          a: "主な税率は 5%・12%・18%・28% です。生活必需品は 0〜5%、多くの商品・サービスは 12〜18%、贅沢品や嗜好品は 28%(さらに cess が加わる場合も)。このツールは 4 つの標準区分に対応します。",
        },
        {
          q: "税込価格から GST を除くには?",
          a: "「税を除外」を選んで税込額を入力します。税抜額 = 税込額 ÷ (1 + 税率/100) で求まります。たとえば GST 18% の税込 ₹118 は、税抜 ₹100・税額 ₹18 です。",
        },
        {
          q: "GST と VAT は同じですか?",
          a: "どちらも各段階で課税する付加価値税ですが、インドの GST は中央の物品税・サービス税・州 VAT を統合した単一税で、州内取引は CGST + SGST、州間取引は IGST に分かれます。他国では同じ仕組みを単に VAT と呼びます。",
        },
      ],
      deepDive: [
        {
          heading: "税区分の構造と「引き算の罠」",
          paragraphs: [
            "インドの GST は税区分(スラブ)構造です。現在は必需品 0〜5%、多くの商品・サービスに 12% と 18%、贅沢品・嗜好品に 28% が運用され、品目によっては cess がさらに上乗せされます。このツールは 4 つの標準区分をワンタップで選べる形にしています。実際の請求書も税率は小さな集合から選ぶのであり、自由な小数ではありません。",
            "引き算の方向が古典的な罠です。税込価格に含まれる GST は 税込 × 率 ÷ (100 + 率) で求まり、税込 × 率 ÷ 100 ではありません。18% の税込 1,180 に含まれる税は 180(1,180 ÷ 1.18)で、素朴に 1,180 × 18% とすると 212.40 になって税を過大計上します。",
            "どの GST の数字にも使える検算があります。税抜 + 税額 が税込と一致するか。3 つの数が合わなければ、どれかの基数が違います。大抵は税込に百分率を掛けたのが原因です。",
          ],
        },
        {
          heading: "一つの税を二つの政府で分ける",
          paragraphs: [
            "GST は中央の物品税・サービス税・各州の VAT を一つの税に統合しました。そのため請求書では同じ金額が二つの構成要素で現れることがあります。州内取引は CGST + SGST、州間取引は IGST です。ここで選ぶ率はどちらでも同じで、分け方は納付先の問題であって計算の問題ではありません。",
            "これが他国の VAT との実務上の違いでもあります。仕組み上はどちらも各段階の付加価値に課税し最終的に消費者が負担しますが、インド版は歳入を中央と州の間で配分します。",
            "このツールは意図的に算術だけを担います。品目の HSN 分類が別の区分に落ちないか、cess が掛かるか、リバースチャージの仕訳はどうするかは、分類・申告の論点です。現行の GST Council 通知でご確認ください。",
          ],
        },
        {
          heading: "ワークフローの中での位置づけ",
          paragraphs: [
            "日常で最も多いのは MRP 式の表示価格を読む作業です。表示価格は税込みなので「税を除外」で支払額のうちいくらが税かが分かり、税区分の異なる商品を比べるときに役立ちます。表示価格が高いほうが税抜では安い、ということも起こります。",
            "販売者側は「税を追加」で税抜から請求書を組み立てます。区分を選び、税込と税額を読むだけで 3 つの数字が請求書のレイアウトに一致し、別の表計算は不要です。契約年度の積算や価格たたき台もブラウザ内で完結し、データは端末から出ません。",
            "国をまたぐ場面では VAT 計算ツール、税抜に利益を乗せてから税を足す場面では利益計算ツールと組み合わせてください。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de GST",
      tagline: "Añada o extraiga el GST a las tramos del 5%, 12%, 18% y 28%: importe neto, impuesto y bruto calculados en vivo en su navegador.",
      intro: [
        "Introduzca un importe y elija uno de los cuatro tramos de GST de India para añadir el impuesto a un precio neto, o para extraer el GST ya incluido en un precio bruto (MRP). Los tres valores — neto, impuesto y bruto — se actualizan al escribir.",
        "Útil para facturas, comprobaciones de inversión del sujeto pasivo, comparar precios entre estados con tramos distintos y saber cuánto impuesto lleva exactamente un precio de etiqueta.",
      ],
      steps: [
        "Escriba el importe: neto si añade GST, bruto si lo extrae.",
        "Elija el tramo aplicable: 5%, 12%, 18% o 28%.",
        "Elija añadir o extraer el impuesto y lea neto, impuesto y bruto.",
      ],
      faqs: [
        {
          q: "¿Cuáles son los tramos del GST en India?",
          a: "Los tipos principales son 5%, 12%, 18% y 28%: los productos básicos van de 0% a 5%, la mayoría de bienes y servicios de 12% a 18%, y los de lujo o perjudiciales al 28% (a veces con un cess adicional). La herramienta cubre los cuatro tramos estándar.",
        },
        {
          q: "¿Cómo quito el GST de un precio con impuesto incluido?",
          a: "Elija «Extraer impuesto» e introduzca el importe bruto. La base se recupera como bruto ÷ (1 + tipo/100): un precio bruto de ₹118 con GST del 18% tiene un neto de ₹100 y ₹18 de impuesto.",
        },
        {
          q: "¿El GST es lo mismo que el IVA (VAT)?",
          a: "Ambos son impuestos sobre el valor añadido cobrados en cada fase, pero el GST indio es un impuesto unificado que absorbió el impuesto especial central, el de servicios y el VAT estatal, dividido en CGST + SGST (intrastatal) o IGST (interestatal). Otros países llaman simplemente IVA al equivalente.",
        },
      ],
      deepDive: [
        {
          heading: "Tramos y la trampa de la resta",
          paragraphs: [
            "El GST de la India se organiza en tramos: hoy funcionan el 0–5% para lo esencial, el 12% y el 18% para la mayoría de bienes y servicios, y el 28% para artículos de lujo o perjudiciales, a veces con un cess adicional encima. La herramienta expone los cuatro tramos estándar como opciones de un toque, igual que se escriben las facturas reales: el tipo sale de un conjunto pequeño, no de un decimal libre.",
            "La extracción es la trampa clásica. El GST dentro de un precio con impuesto incluido es bruto × tipo ÷ (100 + tipo), no bruto × tipo ÷ 100. Al 18%, un precio bruto de 1.180 contiene 180 de impuesto — 1.180 ÷ 1,18 — mientras que el ingenuo 18% de 1.180 da 212,40 y sobredeclara el impuesto sin avisar.",
            "Una comprobación rápida para cualquier cifra de GST: neto + impuesto debe ser exactamente el bruto. Si los tres números no cierran, alguno salió de la base equivocada — casi siempre un porcentaje aplicado al bruto en lugar de la fórmula de división.",
          ],
        },
        {
          heading: "Un impuesto, repartido entre dos gobiernos",
          paragraphs: [
            "El GST unificó un mosaico de impuestos especiales central, impuesto de servicios y VAT de cada estado en un solo impuesto; por eso una factura puede mostrar el mismo importe como dos componentes: CGST más SGST en ventas intraestatales, o IGST en interestatales. El tipo que se elige aquí es idéntico en ambos casos — el reparto es de quién recauda, no de cómo se calcula.",
            "Esa es también la diferencia práctica frente al VAT de otros países: mecánicamente ambos gravan el valor añadido en cada fase y terminan en el consumidor, pero la versión india reparte la recaudación entre el gobierno central y los estados en lugar de unirla en una sola hacienda.",
            "La herramienta se queda deliberadamente en la aritmética. Qué clasificación HSN arrastra un producto a otro tramo, si un cess aplica encima o cómo se contabiliza la inversión del sujeto pasivo son preguntas de clasificación y declaración — contrástelas con las notificaciones vigentes del GST Council.",
          ],
        },
        {
          heading: "Encaje en el flujo de trabajo",
          paragraphs: [
            "El uso diario más común es leer precios tipo MRP: el precio de etiqueta lleva el impuesto incluido, así que «Extraer impuesto» dice cuánto de lo pagado es realmente impuesto — útil al comparar productos de categorías con tramos distintos, porque un precio de etiqueta mayor puede esconder un precio neto menor.",
            "Para vendedores, «Añadir impuesto» construye la factura desde el precio neto: elija el tramo, lea bruto e impuesto, y las tres cifras coinciden con el formato de factura sin hoja de cálculo aparte. Los borradores de precio y los cálculos de año fiscal se benefician de correr en el navegador, sin que los datos salgan del equipo.",
            "Trabájela junto a la calculadora de VAT para escenarios entre países y con la de ganancias cuando al neto haya que sumarle un margen antes de añadir el impuesto.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de GST",
      tagline: "Adicione ou extraia o GST nas faixas de 5%, 12%, 18% e 28% — valores líquido, imposto e bruto calculados ao vivo no navegador.",
      intro: [
        "Digite um valor e escolha uma das quatro faixas de GST da Índia para somar o imposto a um preço líquido ou retirar o GST já embutido num preço bruto (MRP). Os três números — líquido, imposto e bruto — atualizam enquanto você digita.",
        "Útil para notas fiscais, conferências de reverse charge, comparação de preços entre estados com faixas diferentes e para saber exatamente quanto de um preço de etiqueta é imposto.",
      ],
      steps: [
        "Digite o valor — líquido se for adicionar o GST, bruto se for extrair.",
        "Escolha a faixa aplicável: 5%, 12%, 18% ou 28%.",
        "Escolha adicionar ou remover o imposto e veja líquido, imposto e bruto.",
      ],
      faqs: [
        {
          q: "Quais são as faixas do GST na Índia?",
          a: "As alíquotas principais são 5%, 12%, 18% e 28%: itens essenciais ficam em 0–5%, a maioria dos bens e serviços em 12–18% e artigos de luxo ou prejudiciais em 28% (às vezes com um cess adicional). A ferramenta cobre as quatro faixas padrão.",
        },
        {
          q: "Como tirar o GST de um preço com imposto incluído?",
          a: "Escolha «Remover imposto» e informe o valor bruto. A base se recupera como bruto ÷ (1 + alíquota/100): um preço bruto de ₹118 com GST de 18% tem líquido de ₹100 e ₹18 de imposto.",
        },
        {
          q: "O GST é igual ao IVA?",
          a: "Ambos são impostos sobre valor agregado cobrados em cada etapa, mas o GST indiano unificou o imposto especial central, o de serviços e o VAT estadual, dividido em CGST + SGST (intrastadual) ou IGST (interstadual). Outros países chamam o equivalente de IVA apenas.",
        },
      ],
      deepDive: [
        {
          heading: "Faixas e a armadilha da subtração",
          paragraphs: [
            "O GST indiano se organiza em faixas: hoje funcionam 0–5% para itens essenciais, 12% e 18% para a maioria dos bens e serviços, e 28% para artigos de luxo ou prejudiciais, às vezes com um cess adicional por cima. A ferramenta expõe as quatro faixas padrão como escolhas de um toque, do mesmo jeito que as notas fiscais reais são escritas: a alíquota vem de um conjunto pequeno, não de um decimal livre.",
            "A extração é a armadilha clássica. O GST dentro de um preço com imposto incluído é bruto × alíquota ÷ (100 + alíquota), e não bruto × alíquota ÷ 100. A 18%, um preço bruto de 1.180 contém 180 de imposto — 1.180 ÷ 1,18 — enquanto o ingênuo 18% de 1.180 dá 212,40, superdeclarando o imposto sem alarde.",
            "Uma conferência rápida para qualquer número de GST: líquido + imposto deve ser exatamente o bruto. Se os três números não fecham, um deles saiu da base errada — quase sempre um percentual aplicado ao bruto em vez da fórmula de divisão.",
          ],
        },
        {
          heading: "Um imposto, dividido entre dois governos",
          paragraphs: [
            "O GST unificou um mosaico de imposto especial central, imposto sobre serviços e VAT de cada estado num único imposto; por isso uma nota pode mostrar o mesmo valor como dois componentes: CGST mais SGST em vendas dentro do estado, ou IGST entre estados. A alíquota escolhida aqui é idêntica nos dois casos — o rateio é de quem recolhe, não de como se calcula.",
            "Essa é também a diferença prática frente ao IVA de outros países: mecanicamente ambos tributam o valor agregado em cada etapa e acabam no consumidor, mas a versão indiana distribui a arrecadação entre governo central e estados em vez de concentrá-la num só fisco.",
            "A ferramenta fica deliberadamente na aritmética. Qual classificação HSN empurra um produto para outra faixa, se um cess incide por cima ou como se contabiliza o reverse charge são questões de classificação e declaração — confirme nas notificações vigentes do GST Council.",
          ],
        },
        {
          heading: "Lugar no fluxo de trabalho",
          paragraphs: [
            "O uso diário mais comum é ler preços estilo MRP: o preço de etiqueta já vem com imposto, então «Remover imposto» diz quanto do que você pagou é realmente imposto — útil ao comparar produtos de categorias com faixas diferentes, porque um preço de etiqueta maior pode esconder um preço líquido menor.",
            "Para vendedores, «Adicionar imposto» constrói a nota a partir do preço líquido: escolha a faixa, leia bruto e imposto, e os três números já coincidem com o layout da nota, sem planilha à parte. Rascunhos de preço e fechamentos de ano contratado se beneficiam de rodar no navegador, sem dados saindo do aparelho.",
            "Use junto com a calculadora de IVA para cenários entre países e com a de lucro quando o líquido precisar de uma margem antes de somar o imposto.",
          ],
        },
      ],
    },
  },
});
