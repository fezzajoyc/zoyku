import { CalcEngineTax } from "../_engines/calc-engine-tax";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "vat-calculator",
  category: "utility",
  icon: "file",
  engine: { component: CalcEngineTax, props: { kind: "vat" } },
  related: ["gst-calculator", "discount-calculator", "profit-calculator", "percentage-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "VAT Calculator",
      tagline: "Add VAT to a net price or extract it from a gross price at any custom rate — net, VAT and gross amounts live, private and instant.",
      intro: [
        "Works in both directions for any country's rate: type 20 for the UK, 21 for the Netherlands, 19 for Germany — or any rate at all. Add tax to a net figure, or back out the VAT hiding inside a gross (tax-inclusive) price.",
        "Everything is computed locally in your browser — no uploads, no accounts — which makes it safe for pricing drafts and unpublished invoices.",
        "Adding VAT multiplies the net amount by (1 + rate); removing it divides the gross by the same factor, so the VAT inside a 120 gross price at 20% is 20, not 24 — a distinction this tool makes explicit. Any decimal rate works, covering reduced rates such as Germany's 7% or Switzerland's 2.6%.",
        "Compared with tax tools locked to one country, the free rate input matches how EU and UK businesses actually quote: a VAT-inclusive price to consumers and a net figure plus VAT on invoices. Reverse-charge treatment, import VAT and registration thresholds are separate regimes — confirm treatment with an accountant before filing; this is an arithmetic aid, not tax advice.",
      ],
      steps: [
        "Type the amount — net if adding VAT, gross if removing it.",
        "Enter your VAT rate as a percentage (e.g. 20).",
        "Choose Add tax or Remove tax; net, VAT and gross appear instantly.",
      ],
      faqs: [
        {
          q: "How do I calculate VAT backwards from a gross price?",
          a: "Net = gross ÷ (1 + rate ÷ 100). For a £120 gross price at 20% VAT: 120 ÷ 1.2 = £100 net, £20 VAT. The “Remove tax” mode does this for you and shows all three figures.",
        },
        {
          q: "What is the difference between VAT and GST?",
          a: "They are the same kind of tax — value added at each stage of the supply chain, ultimately borne by the consumer. “VAT” is the common name in Europe, the UK and much of Africa and Asia; India and a few others call their unified version GST.",
        },
        {
          q: "Which VAT rate should I use?",
          a: "Whatever applies to your goods or services and jurisdiction: standard rates range from 0% to 27% worldwide, and most countries also have reduced rates for food, books or medicine. When unsure, check your tax authority's current table.",
        },
      ],
      deepDive: [
        {
          heading: "The two directions, and why 120 is not 100 plus 24",
          paragraphs: [
            "Adding VAT is easy: net × (1 + rate) — at 20%, a 100 net price becomes 120 gross. Extracting VAT is where errors live. You cannot multiply the gross by 20% to find the tax, because the 20% applies to the net base, not the gross. The correct step is to divide: net = gross ÷ (1 + rate).",
            "So a 120 gross price at 20% contains exactly 20 of VAT, not 24 — the naive 120 × 20% overstates the tax by a fifth. At 25%, the gap is even bigger: a 125 gross price holds 25, not 31.25. The “Remove tax” mode performs the division and shows net, VAT and gross side by side so the mistake cannot hide.",
            "This “division trick” is the single most-used formula in EU and UK bookkeeping for purchases recorded tax-inclusively: the receipt shows one number, and the ledger needs three. Same arithmetic answers the mirror question of pricing — if you want 100 net to be received, quote 120 gross, not 125.",
          ],
        },
        {
          heading: "One tax, many names and rates",
          paragraphs: [
            "VAT is value added at each stage: a producer charges it on sales and credits what it paid on purchases, remitting only the difference, so the final consumer bears the full amount. Standard rates across the world range roughly from 0% to the mid-20s in percent, and most systems add reduced rates for food, books or medicine — which is why this tool takes any decimal rate instead of a fixed list that would age badly.",
            "The name changes more than the mechanics: most of Europe, the UK and much of Africa and Asia say VAT; India calls its unified version GST; other jurisdictions use their own labels. Calculation-wise they are the same value-added design, so the same formulas travel across borders.",
            "What arithmetic cannot decide is which rate a supply attracts, whether reverse charge applies, or where a registration threshold sits — those are legal questions that change with legislation. Treat the tool as an arithmetic aid and confirm treatment with your tax authority or accountant before filing.",
          ],
        },
        {
          heading: "Built for quotes, invoices and privacy",
          paragraphs: [
            "Businesses and consumers quote prices in opposite directions: consumers see tax-inclusive prices, invoices show net plus VAT. A tool locked to one country's rate table handles only half of that; a free rate input covers both directions for any jurisdiction whose rate you know.",
            "Everything computes locally in your browser — no uploads, no account — so unpublished invoice drafts, client quotes and internal pricing can be worked out without the figures ever leaving the device.",
            "It pairs naturally with the GST calculator for India's slab system, the profit calculator when pricing needs a margin on top of the net figure, and the percentage calculator for the smaller percentage checks in between.",
          ],
        },
      ],
    },
    zh: {
      name: "VAT 增值税计算器",
      tagline: "任意自定义税率下,给净价加 VAT 或从含税价拆出 VAT,净额、税额、总额实时计算,全程浏览器本地完成。",
      intro: [
        "支持任意国家的税率、双向计算:英国 20、荷兰 21、德国 19——或任何其他税率。可以给净价加税,也可以从含税价里反推隐藏的 VAT。",
        "所有计算都在浏览器本地完成——不上传、不需要账号——用于定价草稿和未发布的发票也很安全。",
      ],
      steps: [
        "输入金额——加 VAT 时填净价,去 VAT 时填含税价。",
        "输入 VAT 税率(百分比,如 20)。",
        "选择“加税”或“拆税”,净额、VAT 与总额立即显示。",
      ],
      faqs: [
        {
          q: "怎么从含税价反推 VAT?",
          a: "净价 = 含税价 ÷ (1 + 税率 ÷ 100)。20% VAT 下 £120 的含税价:120 ÷ 1.2 = 净价 £100,VAT £20。“拆税”模式会自动完成并显示三个数字。",
        },
        {
          q: "VAT 和 GST 有什么区别?",
          a: "本质是同一类税——在供应链每个环节对增值额征税,最终由消费者承担。欧洲、英国及亚非多数国家称 VAT;印度等少数国家把统一后的版本称为 GST。",
        },
        {
          q: "应该用哪个 VAT 税率?",
          a: "用你的商品或服务、所在司法辖区适用的税率:全球标准税率从 0% 到 27%,多数国家对食品、书籍或药品还有优惠税率。拿不准时,请以税务机关现行税目表为准。",
        },
      ],
      deepDive: [
        {
          heading: "两个方向,以及为什么 120 里不是 100 加 24",
          paragraphs: [
            "加税很简单:净价 × (1 + 税率)——20% 税率下,净价 100 变成含税 120。容易出错的是拆税:不能用 20% 直接乘含税价来求税额,因为 20% 的基数是净价而不是含税价。正确的做法是做除法:净价 = 含税价 ÷ (1 + 税率)。",
            "所以 20% 税率下含税价 120 里恰好含 20 的 VAT,而不是 24——直接乘 20% 会把税额多算五分之一。税率 25% 时差距更大:含税价 125 里是 25,不是 31.25。“拆税”模式会自动完成这个除法,净额、税额、含税额三项并列显示,错误无处可藏。",
            "这个“除法技巧”是欧洲和英国记账中用得最多的公式,专门处理按含税价入账的采购:小票上只有一个数,账簿上却需要三个。同样的算术反过来也回答定价问题:想实收 100 净额,对外报价应是 120,而不是 125。",
          ],
        },
        {
          heading: "同一种税,不同的名字与税率",
          paragraphs: [
            "VAT 是在每个环节对增值额征税:销售时收取、采购时抵扣、只上缴差额,最终由消费者全额承担。全球标准税率大致落在 0% 到二十多个百分点之间,多数国家还对食品、书籍、药品设优惠税率——所以本工具接受任意小数税率,而不是一份迟早过时的固定税率表。",
            "变的主要是名字:欧洲、英国和亚非多数地区叫 VAT,印度把统一后的版本叫 GST,还有各自叫法的辖区。计算机制同属增值税设计,公式可以跨地区通用。",
            "算术决定不了的,是某笔交易适用哪档税率、反向征收是否适用、起征点在哪里——这些是随立法变动的法律问题。请把本工具当算术辅助,申报前以税务机关或会计师的确认为准。",
          ],
        },
        {
          heading: "为报价、发票和隐私而设计",
          paragraphs: [
            "商家和消费者报价方向相反:消费者看到的是含税价,发票上写的是净价加 VAT。锁定单一国家税率表的工具只能处理一半场景;自由税率输入配合你知道的税率,两个方向、任何辖区都能算。",
            "全部计算在浏览器本地完成——不上传、不需要账号——未发布的发票草稿、客户报价、内部定价都可以在数字不离开设备的前提下算清。",
            "配套使用:印度的多档税率交给 GST 计算器,净价上再加利润定价交给利润计算器,日常零散百分比核对交给百分比计算器。",
          ],
        },
      ],
    },
    ja: {
      name: "VAT 計算(付加価値税)",
      tagline: "任意の税率で税抜価格に VAT を追加、または税込価格から VAT を抽出。税抜・税額・総額をリアルタイムにブラウザ内で計算。",
      intro: [
        "どの国の税率でも双方向に使えます。英国なら 20、オランダなら 21、ドイツなら 19——それ以外の率でも OK。税抜額に税を足すことも、税込価格に含まれる VAT を取り出すこともできます。",
        "計算はすべてブラウザ内で完結し、アップロードも登録も不要。価格のたたき台や未発行の請求書でも安心して使えます。",
      ],
      steps: [
        "金額を入力します(VAT を足すなら税抜、除くなら税込)。",
        "VAT 率をパーセントで入力します(例:20)。",
        "「税を追加」か「税を除外」を選ぶと、税抜・VAT・総額が即表示されます。",
      ],
      faqs: [
        {
          q: "税込価格から VAT を逆算するには?",
          a: "税抜 = 税込 ÷ (1 + 率 ÷ 100)。VAT 20% の税込 £120 なら 120 ÷ 1.2 = 税抜 £100、VAT £20 です。「税を除外」モードが自動で計算し、3 つの数値を表示します。",
        },
        {
          q: "VAT と GST の違いは何ですか?",
          a: "同じ種類の税です。サプライチェーンの各段階で付加価値に課税され、最終的に消費者が負担します。欧州・英国やアジア・アフリカの多くでは VAT、インドなど一部では統合版を GST と呼びます。",
        },
        {
          q: "どの VAT 率を使えばいいですか?",
          a: "対象の商品・サービスと地域に適用される率です。世界の標準税率は 0%〜27% の範囲で、食品・書籍・医薬品に軽減税率を設ける国も多いです。迷ったら税務当局の最新の税率表をご確認ください。",
        },
      ],
      deepDive: [
        {
          heading: "2 つの方向、そして税込 120 に税は 24 ではない理由",
          paragraphs: [
            "税を足すのは簡単です:税抜 × (1 + 率)。20% なら税抜 100 が税込 120 になります。間違いやすいのは税を取り出す方向です。税込額に 20% を掛けて税額を求めてはいけません。20% の基数は税抜であって税込ではないからです。正しくは割り算で、税抜 = 税込 ÷ (1 + 率)。",
            "したがって 20% の税込 120 に含まれる VAT はちょうど 20 で、24 ではありません。素朴に 120 × 20% とすると税額を 5 分の 1 多く計上します。25% なら差はさらに大きく、税込 125 の中身は 25 であって 31.25 ではありません。「税を除外」モードはこの割り算を自動で行い、税抜・VAT・税込を並べて表示します。",
            "この「割り算テクニック」は欧州や英国の簿記で最もよく使う公式で、税込で記録された仕入の精算に使います。レシートには 1 つの数字しかありませんが、帳簿には 3 つ必要です。同じ算数が逆の質問にも答えます:税抜 100 を実収したいなら、提示すべきは税込 120 で 125 ではありません。",
          ],
        },
        {
          heading: "同じ税、多くの名前と税率",
          paragraphs: [
            "VAT は各段階で付加価値に課税します。販売時に預かり、仕入時に支払った分を控除して差額だけ納めるため、最終的に消費者が全額を負担します。世界の標準税率はおおむね 0% から 20% 台半ばまでに収まり、食品・書籍・医薬品への軽減税率も一般的です。だからこのツールは固定リストではなく任意の小数の率を受け付けます。",
            "変わるのは主に名前で、欧州・英国やアジア・アフリカの多くは VAT、インドは統合版を GST、ほかの地域もそれぞれの呼び名を使います。計算の仕組みは同じ付加価値税設計なので、公式は国境を越えてそのまま使えます。",
            "算術で決められないのは、取引にどの率が適用されるか、リバースチャージが適用されるか、登録義務の閾値などで、これらは立法とともに変わる法的な論点です。ご申告の前に税務当局や税理士にご確認ください。",
          ],
        },
        {
          heading: "見積書・請求書・プライバシーのために",
          paragraphs: [
            "事業者と消費者は逆向きに価格を見ています。消費者は税込価格、請求書は税抜+VAT。一つの国の税率表に固定されたツールでは半分しか扱えません。自由入力の率なら、率が分かる限りどの地域でも両方向に計算できます。",
            "計算はすべてブラウザ内で完結し、アップロードもアカウントも不要です。未発行の請求書たたき台、顧客向け見積もり、社内の価格検討も、数字を端末から出さずに済ませられます。",
            "組み合わせとしては、インドの複数税区分は GST 計算ツール、税抜に利益を上乗せした価格設定は利益計算ツール、日常の細かな百分率には百分率計算ツールが役立ちます。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de IVA",
      tagline: "Añada el IVA a un precio neto o extráigalo de uno bruto con cualquier tipo personalizado: neto, IVA y bruto en vivo, privado e instantáneo.",
      intro: [
        "Funciona en ambos sentidos con el tipo de cualquier país: escriba 20 para el Reino Unido, 21 para Países Bajos, 19 para Alemania — o cualquier otro. Añada el impuesto a una cifra neta, o saque el IVA escondido en un precio bruto con impuesto incluido.",
        "Todo se calcula localmente en su navegador — sin subidas ni cuentas — así que es seguro para borradores de precios y facturas sin publicar.",
      ],
      steps: [
        "Escriba el importe: neto si añade IVA, bruto si lo quita.",
        "Introduzca el tipo de IVA en porcentaje (p. ej. 20).",
        "Elija añadir o extraer; neto, IVA y bruto aparecen al instante.",
      ],
      faqs: [
        {
          q: "¿Cómo calculo el IVA hacia atrás desde un precio bruto?",
          a: "Neto = bruto ÷ (1 + tipo ÷ 100). Para un precio bruto de £120 con IVA del 20%: 120 ÷ 1,2 = £100 netos y £20 de IVA. El modo «Extraer impuesto» lo hace por usted y muestra las tres cifras.",
        },
        {
          q: "¿Qué diferencia hay entre IVA y GST?",
          a: "Son el mismo tipo de impuesto: valor añadido en cada eslabón de la cadena, soportado al final por el consumidor. «IVA» es el nombre habitual en Europa, el Reino Unido y buena parte de Asia y África; India y algún otro país llaman GST a su versión unificada.",
        },
        {
          q: "¿Qué tipo de IVA debo usar?",
          a: "El que corresponda a sus bienes o servicios y a su territorio: los tipos generales van del 0% al 27% en el mundo y muchos países aplican tipos reducidos a alimentos, libros o medicamentos. Ante la duda, consulte la tabla vigente de su autoridad fiscal.",
        },
      ],
      deepDive: [
        {
          heading: "Las dos direcciones, y por qué en 120 no hay 100 más 24",
          paragraphs: [
            "Añadir IVA es fácil: neto × (1 + tipo) — con el 20%, un precio neto de 100 pasa a 120 brutos. Extraerlo es donde vive el error. No puede multiplicar el bruto por 20% para hallar el impuesto, porque el 20% se aplica a la base neta, no a la bruta. El paso correcto es dividir: neto = bruto ÷ (1 + tipo).",
            "Así, un precio bruto de 120 con un 20% de IVA contiene exactamente 20 de impuesto, no 24 — el 120 × 20% ingenuo infla el IVA en una quinta parte. Con el 25% la brecha crece: en 125 brutos hay 25, no 31,25. El modo «Extraer impuesto» hace la división y muestra neto, IVA y bruto juntos para que el error no se esconda.",
            "Este «truco de la división» es la fórmula más usada de la contabilidad europea y británica para compras registradas con impuesto incluido: el recibo muestra un número y el libro necesita tres. La misma aritmética responde la pregunta espejo de fijar precios: para recibir 100 netos, cotice 120 brutos, no 125.",
          ],
        },
        {
          heading: "Un impuesto, muchos nombres y tipos",
          paragraphs: [
            "El IVA grava el valor añadido en cada eslabón: quien vende lo cobra y descuenta lo que pagó al comprar, remitiendo solo la diferencia, de modo que el consumidor final soporta el importe íntegro. Los tipos generales del mundo van aproximadamente del 0% a la veintena alta de porcentaje, y la mayoría de los sistemas añade tipos reducidos para alimentos, libros o medicamentos — por eso la herramienta acepta cualquier tipo decimal en lugar de una lista fija que envejece mal.",
            "Cambia más el nombre que la mecánica: Europa, el Reino Unido y gran parte de África y Asia dicen IVA/VAT; India llama GST a su versión unificada; otros territorios usan sus propias etiquetas. En cuanto al cálculo es el mismo diseño de impuesto sobre el valor añadido, así que las mismas fórmulas cruzan fronteras.",
            "Lo que la aritmética no decide es qué tipo grava una operación, si procede la inversión del sujeto pasivo o dónde está el umbral de registro: son cuestiones legales que cambian con la normativa. Use la herramienta como ayuda de cálculo y confirme el tratamiento con su autoridad fiscal o asesor antes de declarar.",
          ],
        },
        {
          heading: "Pensada para presupuestos, facturas y privacidad",
          paragraphs: [
            "Empresas y consumidores cotizan en direcciones opuestas: el consumidor ve precios con impuesto incluido y las facturas muestran neto más IVA. Una herramienta anclada a la tabla de un solo país cubre la mitad; un tipo libre cubre ambos sentidos en cualquier territorio cuyo tipo usted conozca.",
            "Todo se calcula en su navegador — sin subidas ni cuenta — así que los borradores de facturas sin publicar, las cotizaciones a clientes y los precios internos se pueden calcular sin que las cifras salgan del dispositivo.",
            "Combínala con la calculadora de GST para los tramos de India, con la de ganancias cuando el precio necesita un margen sobre el neto y con la de porcentajes para las comprobaciones menores del día a día.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de IVA",
      tagline: "Some o IVA a um preço líquido ou extraia-o de um preço bruto com qualquer alíquota — líquido, IVA e bruto ao vivo, privados e instantâneos.",
      intro: [
        "Funciona nos dois sentidos com a alíquota de qualquer país: digite 20 para o Reino Unido, 21 para a Holanda, 19 para a Alemanha — ou qualquer outra. Some o imposto a um valor líquido ou retire o IVA escondido num preço bruto com imposto incluído.",
        "Tudo é calculado localmente no seu navegador — sem uploads, sem cadastro — o que torna a ferramenta segura para rascunhos de preço e notas fiscais ainda não emitidas.",
      ],
      steps: [
        "Digite o valor — líquido se for somar IVA, bruto se for remover.",
        "Informe a alíquota de IVA em porcentagem (ex.: 20).",
        "Escolha somar ou remover; líquido, IVA e bruto aparecem na hora.",
      ],
      faqs: [
        {
          q: "Como calcular o IVA de trás para frente a partir do preço bruto?",
          a: "Líquido = bruto ÷ (1 + alíquota ÷ 100). Num preço bruto de £120 com IVA de 20%: 120 ÷ 1,2 = £100 líquidos e £20 de IVA. O modo «Remover imposto» faz isso e mostra os três valores.",
        },
        {
          q: "Qual a diferença entre IVA e GST?",
          a: "São o mesmo tipo de imposto: valor adicionado em cada elo da cadeia, arcado no fim pelo consumidor. «IVA» é o nome comum na Europa, no Reino Unido e em boa parte da Ásia e da África; a Índia e alguns outros chamam a versão unificada de GST.",
        },
        {
          q: "Qual alíquota devo usar?",
          a: "A que se aplicar aos seus bens ou serviços e à sua jurisdição: as alíquotas padrão vão de 0% a 27% no mundo, e muitos países têm alíquotas reduzidas para alimentos, livros ou remédios. Na dúvida, consulte a tabela atual do fisco.",
        },
      ],
      deepDive: [
        {
          heading: "Os dois sentidos, e por que em 120 não há 100 mais 24",
          paragraphs: [
            "Somar IVA é fácil: líquido × (1 + alíquota) — a 20%, um preço líquido de 100 vira 120 brutos. Extrair é onde mora o erro. Não adianta multiplicar o bruto por 20% para achar o imposto, porque os 20% incidem sobre a base líquida, não sobre a bruta. O passo certo é dividir: líquido = bruto ÷ (1 + alíquota).",
            "Assim, um preço bruto de 120 com IVA de 20% contém exatamente 20 de imposto, e não 24 — o ingênuo 120 × 20% infla o imposto em um quinto. A 25% a diferença cresce: em 125 brutos há 25, e não 31,25. O modo «Remover imposto» faz a divisão e mostra líquido, IVA e bruto lado a lado, para o erro não se esconder.",
            "Esse «truque da divisão» é a fórmula mais usada da contabilidade europeia e britânica para compras registradas com imposto incluso: o recibo mostra um número e o livro precisa de três. A mesma aritmética responde à pergunta espelhada de precificação: para receber 100 líquidos, cote 120 brutos, e não 125.",
          ],
        },
        {
          heading: "Um imposto, muitos nomes e alíquotas",
          paragraphs: [
            "O IVA incide sobre o valor agregado em cada elo: quem vende o cobra e deduz o que pagou ao comprar, recolhendo só a diferença — o consumidor final arca com o valor integral. As alíquotas padrão do mundo vão aproximadamente de 0% à casa dos vinte e tantos por cento, e a maioria dos sistemas tem alíquotas reduzidas para alimentos, livros ou remédios — por isso a ferramenta aceita qualquer alíquota decimal em vez de uma lista fixa que envelhece mal.",
            "Muda mais o nome que a mecânica: Europa, Reino Unido e boa parte da África e da Ásia dizem IVA/VAT; a Índia chama a versão unificada de GST; outros territórios usam rótulos próprios. No cálculo é o mesmo desenho de imposto sobre valor agregado, então as fórmulas atravessam fronteiras.",
            "O que a aritmética não decide é qual alíquota incide sobre uma operação, se o reverse charge se aplica ou onde fica o limite de registro: são questões legais que mudam com a legislação. Use a ferramenta como auxílio de cálculo e confirme o tratamento com o fisco ou um contador antes de declarar.",
          ],
        },
        {
          heading: "Feita para orçamentos, notas e privacidade",
          paragraphs: [
            "Empresas e consumidores cotam em direções opostas: o consumidor vê preços com imposto incluído e as notas fiscais mostram líquido mais IVA. Uma ferramenta presa à tabela de um único país cobre metade; uma alíquota livre cobre os dois sentidos em qualquer jurisdição cuja alíquota você conheça.",
            "Tudo é calculado no seu navegador — sem uploads nem conta — então rascunhos de notas não emitidas, orçamentos para clientes e preços internos podem ser calculados sem que os números saiam do aparelho.",
            "Combine com a calculadora de GST para as faixas da Índia, com a de lucro quando o preço precisa de margem sobre o líquido e com a de porcentagem para as conferências menores do dia a dia.",
          ],
        },
      ],
    },
  },
});
