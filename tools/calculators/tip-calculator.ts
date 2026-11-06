import { CalcEngineBasic } from "../_engines/calc-engine-basic";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "tip-calculator",
  category: "utility",
  icon: "calc",
  engine: { component: CalcEngineBasic, props: { kind: "tip" } },
  related: ["fuel-cost-calculator", "percentage-calculator", "discount-calculator", "currency-converter", "body-fat-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator", "aspect-ratio-calculator"],
  copy: {
    en: {
      name: "Tip Calculator",
      tagline: "Bill plus tip percentage plus split between friends: see the tip, the total and exactly what each person owes — live, no math at the table.",
      intro: [
        "Enter the bill, tap a preset tip (10/15/18/20/25%) or type your own, and say how many people are splitting. You instantly get the tip amount, the grand total and the per-person share, so nobody does mental arithmetic while the waiter waits.",
        "Everything recalculates live as numbers change, works for any currency, and runs entirely on your device — handy abroad, where your own data connection may be the only reliable one.",
        "Standard US restaurant etiquette puts full table service around 15–20% and excellent service at 20% or more, which is why the presets start there; bars and coffee counters commonly sit closer to 10–15%. The per-person split divides the tipped total evenly, so everyone shares the tip rather than paying on their own subtotal.",
        "Unlike a generic percentage tool, tip-specific presets and the party-size split are built in, so the three numbers you need — tip, total, per person — appear at once and update as you adjust any of them. It works with any currency and runs locally, which matters when roaming data is slow or expensive.",],
      steps: [
        "Type the bill amount.",
        "Pick a tip preset or enter a custom percentage.",
        "Set the number of people and read the per-person share.",
      ],
      faqs: [
        {
          q: "How much should I tip?",
          a: "It depends where you are: 15–20% of the pre-tax bill is customary in the US, 10–15% in much of Europe and Latin America, and rounding up is normal in Japan and China where tipping is not expected. When in doubt, a 10% preset keeps you safe almost everywhere.",
        },
        {
          q: "Should the tip be calculated before or after tax?",
          a: "Traditional etiquette says tip on the pre-tax amount, but in practice most people tip on the total the card slip shows. If you want to be exact, enter the pre-tax figure as the bill and add the tax separately for the split.",
        },
        {
          q: "Does the per-person amount assume an equal split?",
          a: "Yes — the bill plus tip is divided evenly by the number of people. For uneven shares (someone only had a salad), calculate the shared items as a subtotal first and add individual items on top.",
        },
      ],
      deepDive: [
        {
          heading: "Tip culture varies more than the math",
          paragraphs: [
            "The arithmetic is trivial; the culture is not. In the United States, tipped service workers are often paid a base wage that assumes tips make up most of their income, so 15–20% at restaurants is a social expectation rather than a bonus. In much of Europe and Latin America a service charge is frequently already on the bill, and 10% or rounding up is a friendly gesture rather than an obligation.",
            "Elsewhere the default flips: in Japan tipping can genuinely confuse staff, and in China it is largely absent — leaving cash on the table may mean a waiter chases you to return it. Travel guides and locals are the best source for the current norm in any given place; customs also shift over time, so this tool keeps the presets editable rather than hard-coding any country's rules.",
            "A practical strategy abroad: check whether a \"service included\" line already exists on the bill, and treat this calculator's percentages as a vocabulary — knowing what 10%, 15% and 20% mean in local currency lets you respond appropriately wherever you are.",
          ],
        },
        {
          heading: "Presets, pre-tax bases and the split",
          paragraphs: [
            "The presets bracket the common answers — 10% for modest or counter service, 15% as the traditional middle, 18–20% for good full-table service, 25% for exceptional — and the custom field covers any local convention. A quick mental check: 10% is the decimal point moved one place left, 20% is that doubled, and 15% is halfway between.",
            "The traditional etiquette answer says tip on the pre-tax amount, since tax is not a service you received; in practice most people tip on the card slip's total, which over-tips slightly and is rarely objected to. If the difference matters to you, enter the pre-tax figure as the bill.",
            "The split divides the tipped total evenly by party size, which matches how groups usually settle up but hides consumption differences. For uneven orders, subtotal the shared items, tip that subtotal, then add each person's individual items — a two-step the calculator supports by running it twice.",
          ],
        },
        {
          heading: "Designed for the table, not the spreadsheet",
          paragraphs: [
            "At the end of a meal the useful questions are exactly three: how much tip, what total, what per person. A generic percentage calculator can answer them, but only one at a time and with re-typing; here the bill, rate and party size are all editable at once and every figure recomputes live as you adjust any of them.",
            "It also runs entirely on your device with no network dependency, which is not a marketing flourish — restaurant basements, roaming dead zones and foreign SIMs are precisely when you need it, and nothing about the bill leaves your phone.",
            "It works with any currency because the math never assumes one: type the amount as shown on the bill and read the outputs in the same units. For tax-inclusive prices or discount checks before ordering, the percentage calculator and VAT calculator cover the neighboring cases.",
          ],
        },
      ],
    },
    zh: {
      name: "小费计算器",
      tagline: "账单、小费比例加上分摊人数:小费、总额和每人应付金额实时算好,餐桌上不用再心算。",
      intro: [
        "输入账单金额,点选预设小费比例(10/15/18/20/25%)或自定义,再填分摊人数,即可立刻得到小费金额、合计金额和每人应付——服务员在旁边也不用再算。",
        "数字变化时实时重算,支持任意货币,完全在本机运行——出国旅行时特别可靠。",
      ],
      steps: [
        "输入账单金额。",
        "点选小费预设比例,或输入自定义比例。",
        "设置人数,查看每人应付金额。",
      ],
      faqs: [
        {
          q: "小费应该给多少?",
          a: "因地而异:美国通常按税前账单的 15%–20%;欧洲和拉美许多国家给 10%–15%;日本和中国不流行给小费,凑个整数即可。拿不准时,10% 的预设几乎不会出错。",
        },
        {
          q: "小费按税前还是税后算?",
          a: "传统礼节按税前金额算,但实际多数人按刷卡单上的总额给。想精确的话,把税前金额填作账单,税费另行计入分摊。",
        },
        {
          q: "每人金额是平均分摊吗?",
          a: "是的——账单加小费后按人数平均分配。如果有人只点了一小份,可以先把公共消费按小计算好,再单独叠加个人项目。",
        },
      ],
      deepDive: [
        {
          heading: "小费不是数学题,是文化题",
          paragraphs: [
            "计算本身很简单,复杂的是各地习惯。在美国,服务员的底薪往往按“小费构成主要收入”来设定,餐厅给 15%–20% 是社会默契而非额外奖赏。欧洲和拉美的许多地方账单里常常已含服务费,给 10% 或凑整更多是善意而不是义务。",
            "另一些地方规则正好相反:在日本给小费可能让店员困扰,在中国小费也基本不存在——把现金留在桌上,服务员可能追出来还给你。某个地方当下的通行做法,以当地人和最新旅行指南为准;习惯也在慢慢变化,所以本工具不硬编码任何国家的规则,预设比例都可以改。",
            "出国时一个实用策略:先看账单上是否已有“服务费已含”一项,再把本工具的比例当作一套“词汇表”——知道当地货币下 10%、15%、20% 各是多少钱,就能在任何地方做出得体的回应。",
          ],
        },
        {
          heading: "预设档位、税前基数与分摊",
          paragraphs: [
            "预设档位覆盖了常见答案:10% 对应简约或柜台服务,15% 是传统中间值,18%–20% 对应不错的桌边服务,25% 留给超预期体验;自定义框承接各地特殊习惯。心算校验:10% 就是小数点左移一位,20% 是它的两倍,15% 取中间。",
            "传统礼节说按税前金额给小费,理由是税不是你享受的服务;实际中多数人按刷卡单总额给,略多给一点通常无人在意。在意这个差别的话,把税前金额填作账单即可。",
            "分摊是把含小费的总额按人数平均,符合大多数聚餐结账方式,但会掩盖点单差异。各点各的场合,可以先把公共项目算出小计、对小计给小费,再加上个人项目——把工具分两轮用就能完成。",
          ],
        },
        {
          heading: "为餐桌场景设计,而不是为表格设计",
          paragraphs: [
            "结账时有用的就三个数:小费多少、合计多少、每人多少。通用百分比计算器都能算,但一次只能答一个还要反复输入;这里账单、比例、人数同时可改,任何一项变动所有数字实时刷新。",
            "全程在本机运行、不依赖网络也不是宣传话术——餐厅地下室、漫游信号盲区、境外流量不畅,恰恰是最需要算账的时刻,而账单数据不会离开手机。",
            "支持任意货币,因为计算从不假设币种:照账单金额输入,结果就是同一单位。点单前想核对折扣或含税价,百分比计算器和 VAT 计算器覆盖相邻场景。",
          ],
        },
      ],
    },
    ja: {
      name: "チップ計算",
      tagline: "請求額・チップ率・割り勘人数から、チップ額・合計・一人あたりの金額をリアルタイム計算。席で暗算する必要はありません。",
      intro: [
        "請求額を入力し、プリセットのチップ率(10/15/18/20/25%)を選ぶか任意の率を入力して、割り勘の人数を指定するだけ。チップ額・合計・一人あたりの支払額がすぐ出ます。",
        "数値が変わるとリアルタイムに再計算され、通貨も問いません。端末上だけで動くので、海外でも自分の通信だけで確実に使えます。",
      ],
      steps: [
        "請求額を入力します。",
        "チップのプリセットを選ぶか、率を直接入力します。",
        "人数を設定し、一人あたりの金額を確認します。",
      ],
      faqs: [
        {
          q: "チップはいくらが適切ですか?",
          a: "地域によります。米国は税抜請求の 15〜20%、欧州やラテンアメリカの多くは 10〜15%、チップ文化のない日本や中国では端数の切り上げで十分です。迷ったら 10% を選んでおけばほぼどこでも問題ありません。",
        },
        {
          q: "チップは税抜と税込のどちらが基準?",
          a: "礼儀上は税抜額が本来ですが、実際にはカード伝票の合計に対して払う人が多数です。厳密にやりたい場合は、税抜額を請求額として入力し、税は別途合計に加算してください。",
        },
        {
          q: "一人あたりの金額は均等割りですか?",
          a: "はい。請求とチップの合計を人数で均等に割ります。頼んだ物の差が大きい場合は、共通の分を小計として先に計算し、個人の分を上乗せするのがおすすめです。",
        },
      ],
      deepDive: [
        {
          heading: "チップは計算より文化",
          paragraphs: [
            "計算自体は簡単ですが、慣習は国によって大きく違います。米国ではチップで収入の大半を賄う前提の低い基本給が一般的で、レストランでの 15〜20% は社会的な暗黙の了解です。欧州やラテンアメリカの多くではサービス料が請求書に含まれており、10% や端数の切り上げは親切心であって義務ではありません。",
            "逆の地域もあります。日本でチップを渡すと店員が困惑することがあり、中国でもチップ文化はほぼ存在しません。ある土地の現在の相場は、現地の人や最新の旅行ガイドが最良の情報源です。慣習は時代とともに変わるので、このツールは特定の国のルールを固定せず、プリセットも自由に変えられます。",
            "海外での実用策:まず請求書に「サービス料込み」の記載があるか確認し、このツールの率を「語彙」として使うことです。現地通貨での 10%・15%・20% がいくらか分かれば、どこでも適切に対応できます。",
          ],
        },
        {
          heading: "プリセット・税抜基準・割り勘",
          paragraphs: [
            "プリセットはよくある答えをカバーします。10% はカジュアルやカウンター、15% は伝統的な中間値、18〜20% はしっかりしたテーブルサービス、25% は特別な体験向け。カスタム欄が地域の慣習を受け止めます。暗算のコツは、10% が小数点を一つ左へ、20% がその 2 倍、15% がその中間です。",
            "礼儀の上では税抜額にチップを算めるのが本来とされます(税は受けたサービスではないため)。実際はカード伝票の合計に対して払う人が多く、わずかに上乗せになっても問題にされることはほぼありません。厳密にしたいなら税抜額を入力してください。",
            "割り勘はチップ込みの総額を人数で均等に分けます。注文差が大きい場合は、共通分の小計を出してそれにチップを算め、各自の個人分を上乗せする——ツールを 2 回回せばこの 2 段階も計算できます。",
          ],
        },
        {
          heading: "席のために設計された計算機",
          paragraphs: [
            "食事の終わりに必要なのは 3 つの数字だけ:チップ額・合計・一人あたり。汎用の百分率ツールでも答えは出ますが、一度に一つずつ、入力し直しが必要です。ここでは請求額・率・人数を同時に編集でき、どれを変えても全数値が即座に更新されます。",
            "端末内だけで動き通信不要なのも実用上の要点です。地下のレストラン、ローミングの圏外、海外の不安定な回線——まさに計算が必要な瞬間に使え、伝票の情報が端末の外に出ることはありません。",
            "通貨を問わないのは計算が通貨を仮定しないからです。伝票の金額をそのまま入力すれば、出力も同じ単位で返ります。割引や税込価格の確認には、百分率ツールや VAT 計算ツールが隣の役割を担います。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de propinas",
      tagline: "Cuenta, porcentaje de propina y reparto entre amigos: propina, total y lo que debe cada persona en vivo, sin cálculos en la mesa.",
      intro: [
        "Introduzca la cuenta, toque una propina predefinida (10/15/18/20/25%) o escriba la suya, e indique entre cuántas personas se reparte. Obtendrá al instante la propina, el total y la parte de cada uno, sin cálculos mentales delante del camarero.",
        "Todo se recalcula al cambiar cualquier cifra, funciona con cualquier moneda y corre por completo en su dispositivo — muy práctico en el extranjero, donde su conexión puede ser la única fiable.",
      ],
      steps: [
        "Escriba el importe de la cuenta.",
        "Elija una propina predefinida o introduzca un porcentaje propio.",
        "Fije el número de personas y lea lo que paga cada una.",
      ],
      faqs: [
        {
          q: "¿Cuánto hay que dejar de propina?",
          a: "Depende del país: en EE. UU. lo habitual es el 15–20% de la cuenta sin impuestos; en buena parte de Europa y Latinoamérica, el 10–15%; en Japón y China no se esperan propinas y basta con redondear. Ante la duda, el 10% casi nunca falla.",
        },
        {
          q: "¿La propina se calcula antes o después de impuestos?",
          a: "El protocolo dice que sobre el importe sin impuestos, pero en la práctica casi todos dejan propina sobre el total del tique. Si quiere ser exacto, introduzca el importe preimpuestos como cuenta y añada el impuesto aparte para el reparto.",
        },
        {
          q: "¿El importe por persona asume un reparto igualitario?",
          a: "Sí: la cuenta más la propina se divide por igual entre todos. Si alguien solo tomó una ensalada, calcule primero los artículos compartidos como subtotal y añada los individuales encima.",
        },
      ],
      deepDive: [
        {
          heading: "La propina es cultura antes que aritmética",
          paragraphs: [
            "El cálculo es trivial; la cultura no. En Estados Unidos, quienes trabajan en la mesa suelen cobrar un sueldo base que da por supuesta la propina como principal fuente de ingresos, de modo que el 15–20% en restaurantes es una expectativa social, no un extra. En buena parte de Europa y Latinoamérica la cuenta suele incluir ya un cargo por servicio, y el 10% o el redondeo son un gesto amable, no una obligación.",
            "En otros lugares la norma se invierte: en Japón dar propina puede despistar al personal, y en China apenas existe — dejar billetes sobre la mesa puede acabar con un camarero persiguiéndole para devolvérselos. La costumbre vigente de cada lugar se consulta mejor con los locales y las guías recientes; también cambia con el tiempo, por eso la herramienta no fija reglas de ningún país y los porcentajes predefinidos son editables.",
            "Una estrategia práctica en el extranjero: mire primero si la cuenta ya trae una línea de «servicio incluido» y use los porcentajes de esta herramienta como un vocabulario — saber qué son el 10%, el 15% y el 20% en moneda local le permite responder con tacto en cualquier sitio.",
          ],
        },
        {
          heading: "Predefinidos, base sin impuestos y reparto",
          paragraphs: [
            "Los predefinidos cubren las respuestas habituales: 10% para servicio sencillo o de barra, 15% como punto medio tradicional, 18–20% para buen servicio de mesa, 25% para algo excepcional; el campo personalizado recoge cualquier convención local. Truco mental: el 10% es mover la coma un lugar a la izquierda, el 20% es ese doble y el 15% queda a medio camino.",
            "El protocolo tradicional manda calcular la propina sobre el importe sin impuestos, porque el impuesto no es un servicio recibido; en la práctica casi todos la dejan sobre el total del tique, lo que sobrepaga ligeramente y casi nadie cuestiona. Si la diferencia le importa, introduzca el importe preimpuestos como cuenta.",
            "El reparto divide el total con propina en partes iguales, como suelen pagar los grupos, pero oculta las diferencias de consumo. Con pedidos desiguales, calcule primero el subtotal de lo compartido, deje la propina sobre ese subtotal y sume después los artículos individuales de cada uno.",
          ],
        },
        {
          heading: "Pensada para la mesa, no para la hoja de cálculo",
          paragraphs: [
            "Al terminar la comida solo importan tres cifras: cuánta propina, qué total y qué paga cada uno. Una calculadora genérica de porcentajes puede responderlas, pero de una en una y reescribiendo datos; aquí cuenta, porcentaje y número de personas se editan a la vez y todo se recalcula en vivo.",
            "Que funcione sin red tampoco es un eslogan: sótanos de restaurante, zonas sin itinerancia y SIM extranjeras caprichosas coinciden justo con el momento de necesitarla, y ningún dato de la cuenta sale del teléfono.",
            "Sirve con cualquier moneda porque la matemática no supone ninguna: escriba el importe tal como aparece en la cuenta y las salidas salen en las mismas unidades. Para descuentos o precios con impuesto antes de pedir, la calculadora de porcentajes y la de IVA cubren los casos vecinos.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de gorjeta",
      tagline: "Conta, percentual de gorjeta e divisão entre amigos: gorjeta, total e quanto cada pessoa deve, ao vivo — sem conta de cabeça na mesa.",
      intro: [
        "Digite o valor da conta, toque numa gorjeta predefinida (10/15/18/20/25%) ou digite a sua, e informe entre quantas pessoas a conta será dividida. Você recebe na hora a gorjeta, o total e a parte de cada um, sem fazer cálculo mental na frente do garçom.",
        "Tudo recalcula ao vivo a cada mudança, funciona com qualquer moeda e roda inteiramente no seu aparelho — útil no exterior, quando sua própria conexão é a única confiável.",
      ],
      steps: [
        "Digite o valor da conta.",
        "Escolha uma gorjeta predefinida ou informe um percentual próprio.",
        "Defina o número de pessoas e veja quanto cada uma paga.",
      ],
      faqs: [
        {
          q: "Quanto devo dar de gorjeta?",
          a: "Depende do país: nos EUA o costume é 15–20% da conta sem imposto; em boa parte da Europa e da América Latina, 10–15%; no Japão e na China gorjeta não é esperada, e arredondar o valor basta. Na dúvida, 10% quase nunca erra.",
        },
        {
          q: "A gorjeta incide antes ou depois do imposto?",
          a: "O protocolo manda calcular sobre o valor sem imposto, mas na prática a maioria calcula sobre o total da fatura. Se quiser exatidão, informe o valor pré-imposto como conta e some o imposto à parte na divisão.",
        },
        {
          q: "O valor por pessoa é uma divisão igual?",
          a: "Sim — a conta mais a gorjeta é dividida igualmente pelo número de pessoas. Para consumos desiguais (alguém pediu só uma salada), calcule os itens compartilhados como subtotal primeiro e some os individuais depois.",
        },
      ],
      deepDive: [
        {
          heading: "Gorjeta é cultura antes de matemática",
          paragraphs: [
            "A conta é trivial; a cultura não. Nos Estados Unidos, quem atende à mesa costuma receber um salário base que já assume a gorjeta como principal fonte de renda, então 15–20% em restaurantes é uma expectativa social, não um bônus. Em boa parte da Europa e da América Latina a conta frequentemente já inclui uma taxa de serviço, e 10% ou arredondar é um gesto gentil, não uma obrigação.",
            "Em outros lugares a norma se inverte: no Japão dar gorjeta pode confundir a equipe, e na China ela praticamente não existe — deixar notas na mesa pode terminar com o garçom correndo atrás de você para devolver. O costume vigente de cada lugar se consulta melhor com moradores e guias recentes; ele também muda com o tempo, por isso a ferramenta não fixa regras de nenhum país e as porcentagens predefinidas são editáveis.",
            "Uma estratégia prática no exterior: veja primeiro se a conta já traz uma linha de «serviço incluído» e use as porcentagens da ferramenta como vocabulário — saber quanto valem 10%, 15% e 20% na moeda local permite responder com jeito em qualquer lugar.",
          ],
        },
        {
          heading: "Predefinições, base sem imposto e rateio",
          paragraphs: [
            "As predefinições cobrem as respostas comuns: 10% para serviço simples ou de balcão, 15% como meio-termo tradicional, 18–20% para bom serviço à mesa, 25% para algo excepcional; o campo personalizado acomoda qualquer convenção local. Truque mental: 10% é a vírgula uma casa à esquerda, 20% é o dobro disso e 15% fica no meio do caminho.",
            "O protocolo tradicional manda calcular a gorjeta sobre o valor sem imposto, porque o imposto não é um serviço recebido; na prática quase todos calculam sobre o total da fatura, o que paga ligeiramente a mais e raramente incomoda alguém. Se a diferença importa para você, informe o valor pré-imposto como conta.",
            "O rateio divide o total com gorjeta igualmente, como grupos costumam acertar, mas esconde diferenças de consumo. Com pedidos desiguais, calcule antes o subtotal dos itens compartilhados, dê a gorjeta sobre esse subtotal e some depois os itens individuais de cada um.",
          ],
        },
        {
          heading: "Feita para a mesa, não para a planilha",
          paragraphs: [
            "No fim da refeição só importam três números: quanto de gorjeta, qual total, quanto por pessoa. Uma calculadora genérica de porcentagem responde, mas uma por vez e redigitando dados; aqui conta, percentual e número de pessoas se editam juntos e tudo recalcula ao vivo.",
            "Funcionar sem rede também não é slogan: subsolo de restaurante, área sem roaming e SIM estrangeiro instável coincidem justamente com a hora de precisar dela, e nenhum dado da conta sai do telefone.",
            "Serve com qualquer moeda porque a matemática não pressupõe nenhuma: digite o valor como aparece na conta e as saídas saem nas mesmas unidades. Para descontos ou preço com imposto antes de pedir, a calculadora de porcentagem e a de IVA cobrem os casos vizinhos.",
          ],
        },
      ],
    },
  },
});
