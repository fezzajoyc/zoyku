import { CalcEngineRent } from "../_engines/calc-engine-rent";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "rent-affordability-calculator",
  category: "utility",
  icon: "key",
  engine: { component: CalcEngineRent },
  related: ["mortgage-calculator", "emi-calculator", "loan-calculator", "salary-to-hourly", "compound-interest-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator"],
  copy: {
    en: {
      name: "Rent Affordability Calculator",
      tagline:
        "Find the maximum rent your monthly income can carry under the 30%, 33% or 40% rule — then see what remains after debts and renter insurance each month.",
      intro: [
        "Enter your monthly income (gross or take-home), pick a rent-to-income ratio — the classic 30% of gross, a looser 33%, or 40% of net for high-cost cities — and the calculator draws your rent ceiling. Other monthly debt payments and renter insurance are then subtracted so the number you see is actually liveable.",
        "You also get the debt-to-income percentage you would carry at that maximum rent, which is what lenders look at before approving you for a lease or mortgage. The budget line turns negative honestly when rent plus debts exceed your income — a signal to hunt for cheaper rent rather than stretch.",
      ],
      steps: [
        "Enter your monthly income and whether it is gross or take-home.",
        "Pick the rent-to-income ratio: 30%, 33% or 40%.",
        "Add other monthly debt payments and renter insurance, if any.",
        "Read the rent ceiling, the leftover budget and your debt-to-income ratio.",
      ],
      faqs: [
        {
          q: "Where does the 30% rule for rent come from?",
          a: "It traces to the US Brooke Amendment of 1969, which capped public-housing rent at 25% of income and was raised to 30% in 1981. HUD still calls households spending more than 30% of income on housing 'cost-burdened', which is why 30% of gross income stuck as the shorthand for affordable rent.",
        },
        {
          q: "Should I budget rent from gross or net income?",
          a: "The classic 30% rule applies to gross income, so it ignores taxes and looks more generous than your payslip. If you prefer to plan from take-home pay, using a higher ratio such as 40% of net lands in roughly the same place. What matters is picking one basis and staying consistent.",
        },
        {
          q: "What does the debt-to-income percentage mean here?",
          a: "It is the share of your income consumed by the maximum rent plus your listed debts and insurance. Lenders generally like total DTI below about 36%; above roughly 43% it gets hard to qualify for a mortgage. A high figure means the rent ceiling is too aggressive for your other obligations.",
        },
      ],
    },
    zh: {
      name: "租房负担能力计算器",
      tagline:
        "按 30%、33% 或 40% 法则算出你的月收入能承受的房租上限,再减去每月债务和租客保险,看看还剩多少可用于生活,并给出债务收入比。",
      intro: [
        "输入月收入(税前或到手),选择房租收入比——经典的毛收入 30%、稍宽松的 33%,或高成本城市常用的到手 40%——计算器会给出房租上限。再减去其他月度债务还款和租客保险,剩下的才是真正可支配的生活预算。",
        "同时会显示顶格租房时的债务收入比(DTI),这正是房东和贷款机构审批时会看的指标。当房租加债务超过收入时,预算一行会诚实地显示为负数——那是在提醒你找更便宜的房子,而不是硬撑。",
      ],
      steps: [
        "输入月收入,并选择是税前还是到手。",
        "选择房租收入比:30%、33% 或 40%。",
        "如有其他月度债务和租客保险,一并填入。",
        "查看房租上限、剩余预算和债务收入比。",
      ],
      faqs: [
        {
          q: "30% 租房法则是怎么来的?",
          a: "它可追溯到美国 1969 年的 Brooke 修正案:公共住房租金最初封顶为收入的 25%,1981 年上调到 30%。如今 HUD 仍把住房支出超过收入 30% 的家庭称为「成本负担过重」,30% 毛收入因此成了「可负担房租」的通行口径。",
        },
        {
          q: "按税前还是税后收入来规划房租?",
          a: "经典的 30% 法则按税前收入计算,它不考虑税收,看起来比工资条更宽松。如果你习惯按到手收入规划,可以采用更高的比例,比如到手收入的 40%,结果大致相当。关键是选定一种口径并保持一致。",
        },
        {
          q: "这里的债务收入比是什么意思?",
          a: "它表示顶格房租加上你列出的债务和保险合计占收入的比例。贷款机构一般希望总债务收入比低于 36%;超过 43% 左右就很难申请到房贷。数值偏高说明这个房租上限对你的其他负债来说太激进了。",
        },
      ],
    },
    ja: {
      name: "家賃負担計算ツール",
      tagline:
        "月収に対する 30%・33%・40% ルールから支払える家賃の上限を算出し、毎月の借入返済や賃貸保険を差し引いた残りの生活資金と債務比率も確認できます。",
      intro: [
        "月収(額面または手取り)を入力し、家賃の収入比を選びます——定番の額面 30%、やや緩い 33%、物価の高い都市の手取り 40%。計算結果が家賃の上限を示します。さらに毎月のその他の返済額と賃貸保険を差し引くので、表示される数字は実際に暮らせる予算です。",
        "家賃上限いっぱいのときの債務対収入比(DTI)も分かります。これは貸し手が賃貸契約や住宅ローンの審査で見る指標です。家賃と返済の合計が収入を超えると、予算行は正直にマイナスを表示します——それは無理をせず、もっと安い家賃を探す合図です。",
      ],
      steps: [
        "月収と、額面か手取りかを入力します。",
        "家賃の収入比を選びます:30%、33% または 40%。",
        "その他の月間返済額と賃貸保険があれば入力します。",
        "家賃の上限、残りの予算、債務対収入比を確認します。",
      ],
      faqs: [
        {
          q: "30% ルールはどこから来たのですか?",
          a: "米国 1969 年のブルック修正案に由来します。公営住宅の家賃を収入の 25% に制限し、1981 年に 30% に引き上げられました。現在でも HUD は住居に収入の 30% を超える支出をする世帯を「費用負担過重」と呼んでおり、額面の 30% が「支払える家賃」の目安として定着しています。",
        },
        {
          q: "家賃の計算は額面と手取り、どちらが基準にすべきですか?",
          a: "定番の 30% ルールは額面収税ベースで、税金を考慮しないので給料明細より有利に見えます。手取りで計画したいなら、手取りの 40% など高い比率を使うと結果はおよそ同じになります。大切なのは、どちらかの基準に決めて一貫させることです。",
        },
        {
          q: "ここでの債務対収入比(DTI)は何を意味しますか?",
          a: "家賃の上限に示された返済額や保険を合計したものが収入の何%を占めるかです。貸し手は総 DTI をおおむね 36% 以下にすることを好み、43% 前後を超えると住宅ローンの審査が難しくなります。数値が高い場合は、家賃上限が他の返済に対して高すぎるという意味です。",
        },
      ],
    },
    es: {
      name: "Calculadora de alquiler asumible",
      tagline:
        "Descubra el alquiler máximo que su ingreso mensual puede asumir con la regla del 30%, 33% o 40% — y vea qué queda cada mes tras sus deudas y el seguro de inquilino.",
      intro: [
        "Introduzca su ingreso mensual (bruto o neto), elija un ratio de alquiler sobre ingreso — el clásico 30% del bruto, un 33% más flexible o el 40% del neto para ciudades caras — y la calculadora fija su techo de alquiler. Después se restan otras deudas mensuales y el seguro de inquilino, para que la cifra que ve sea realmente vivible.",
        "También obtiene el porcentaje de deuda sobre ingreso que cargaría con ese alquiler máximo, justo lo que miran los prestamistas antes de aprobar un alquiler o una hipoteca. La línea de presupuesto se vuelve negativa con honestidad cuando el alquiler más las deudas superan su ingreso — una señal para buscar algo más barato, no para estirarse.",
      ],
      steps: [
        "Introduzca su ingreso mensual e indique si es bruto o neto.",
        "Elija el ratio de alquiler sobre ingreso: 30%, 33% o 40%.",
        "Añada otras deudas mensuales y el seguro de inquilino, si los hay.",
        "Lea el techo de alquiler, el presupuesto restante y su ratio de endeudamiento.",
      ],
      faqs: [
        {
          q: "¿De dónde viene la regla del 30% para el alquiler?",
          a: "Se remonta a la Enmienda Brooke de 1969 en EE. UU., que limitó el alquiler de la vivienda pública al 25% del ingreso y lo subió al 30% en 1981. HUD sigue llamando 'cargados por costes' a los hogares que gastan más del 30% en vivienda, y por eso el 30% del ingreso bruto se quedó como sinónimo de alquiler asequible.",
        },
        {
          q: "¿Presupuesto el alquiler sobre el bruto o el neto?",
          a: "La regla clásica del 30% se aplica al ingreso bruto, así que ignora los impuestos y parece más generosa que su nómina. Si prefiere planificar con el sueldo neto, usar un ratio mayor como el 40% del neto lleva más o menos al mismo sitio. Lo importante es elegir una base y mantenerla.",
        },
        {
          q: "¿Qué significa aquí el porcentaje de deuda sobre ingreso?",
          a: "Es la parte de su ingreso que consumirían el alquiler máximo más sus deudas y seguro declarados. A los prestamistas suele gustarles una deuda total por debajo del 36%; por encima del 43% es difícil lograr una hipoteca. Una cifra alta significa que el techo de alquiler es demasiado agresivo para sus otras obligaciones.",
        },
      ],
    },
    pt: {
      name: "Calculadora de aluguel acessível",
      tagline:
        "Descubra o aluguel máximo que sua renda mensal suporta pela regra dos 30%, 33% ou 40% — e veja o que sobra todo mês após dívidas e o seguro residencial.",
      intro: [
        "Informe sua renda mensal (bruta ou líquida), escolha uma relação aluguel-renda — os clássicos 30% do bruto, uns 33% mais folgados ou 40% do líquido para cidades caras — e a calculadora traça seu teto de aluguel. Outras dívidas mensais e o seguro residencial são então descontados, para que o número que você vê seja de fato vivível.",
        "Você também recebe a porcentagem de dívida sobre renda que teria com esse aluguel máximo — exatamente o que credores analisam antes de aprovar um contrato ou financiamento. A linha do orçamento fica negativa com honestidade quando aluguel mais dívidas passam da sua renda — um sinal para procurar um aluguel mais barato, não para se apertar.",
      ],
      steps: [
        "Informe sua renda mensal e se ela é bruta ou líquida.",
        "Escolha a relação aluguel-renda: 30%, 33% ou 40%.",
        "Adicione outras dívidas mensais e o seguro residencial, se houver.",
        "Veja o teto de aluguel, o orçamento restante e sua relação dívida-renda.",
      ],
      faqs: [
        {
          q: "De onde vem a regra dos 30% para o aluguel?",
          a: "Ela vem da Emenda Brooke de 1969, nos EUA, que limitou o aluguel de moradia pública a 25% da renda e o elevou a 30% em 1981. O HUD ainda chama de 'sobrecarregados por custo' os lares que gastam mais de 30% da renda com moradia, e foi por isso que os 30% da renda bruta viraram o sinônimo de aluguel acessível.",
        },
        {
          q: "Devo planejar o aluguel pela renda bruta ou líquida?",
          a: "A regra clássica dos 30% vale para a renda bruta, então ignora impostos e parece mais generosa que o contracheque. Se você prefere planejar pelo salário líquido, use um percentual maior como 40% do líquido, que chega aproximadamente ao mesmo lugar. O que importa é escolher uma base e mantê-la.",
        },
        {
          q: "O que significa a porcentagem de dívida sobre renda aqui?",
          a: "É a fatia da sua renda que iria para o aluguel máximo mais as dívidas e o seguro informados. Credores em geral preferem uma dívida total abaixo de 36%; acima de uns 43% fica difícil aprovar um financiamento. Um número alto indica que o teto de aluguel é agressivo demais para suas outras obrigações.",
        },
      ],
    },
  },
});
