import { CalcEngineApy } from "../_engines/calc-engine-apy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "apy-calculator",
  category: "utility",
  icon: "swap",
  engine: { component: CalcEngineApy },
  related: ["compound-interest-calculator", "mortgage-calculator", "loan-calculator", "discount-calculator", "profit-calculator"],
  copy: {
    en: {
      name: "APY Calculator",
      tagline:
        "Convert a nominal APR into the effective APY — and back again — for daily, monthly, quarterly or annual compounding, with optional growth of a deposit over time.",
      intro: [
        "A nominal rate and an effective rate are not the same number, and ads quietly pick whichever looks better. Enter a rate and a compounding frequency — daily (365), monthly, quarterly or annually — and this calculator converts APR into APY, or APY back into the nominal APR that would produce it.",
        "Add an optional deposit and a horizon in years to see what the money actually grows into: the balance after compounding and the interest earned on top. The conversion is exact both ways, so you can flip the direction and verify the round trip against any bank quote.",
      ],
      steps: [
        "Type the rate you were quoted — a nominal APR or an effective APY.",
        "Pick the compounding frequency: daily, monthly, quarterly or annually.",
        "Optionally add a deposit and the number of years to project growth.",
        "Read the converted rate, the final balance and the interest earned.",
      ],
      faqs: [
        {
          q: "Why is APY higher than APR for the same nominal rate?",
          a: "Because compounding pays interest on interest. APY = (1 + r ÷ n)^n − 1, so a 12% nominal rate compounded monthly becomes (1.01)^12 − 1 = 12.6825% effective: the extra 0.6825 points is the interest your interest earns. The more often money compounds, the wider the gap — daily beats monthly, monthly beats annual.",
        },
        {
          q: "Which rate should I compare between banks?",
          a: "Compare APY against APY for savings and CDs — it already folds the compounding frequency in, so a 5.10% APY compounded monthly is genuinely better than a 5.05% APY compounded annually. For loans, compare APR against APR. Mixing an APR with an APY in one comparison is exactly how quotes mislead.",
        },
        {
          q: "Does the daily option use 365 or 360 days?",
          a: "This calculator uses 365 periods per year, the convention most consumer savings accounts follow. Some financial products annualize on a 360-day basis instead, which shifts the effective rate slightly — if the fine print says 360, treat the result as a close approximation rather than an exact quote.",
        },
      ],
    },
    zh: {
      name: "APY 计算器",
      tagline:
        "在名义 APR 与实际 APY 之间按日、月、季、年复利频率精确互转,还能输入本金和年数,算出这笔钱按实际利率最终能长到多少。",
      intro: [
        "名义利率和实际利率不是同一个数字,而广告总是挑好看的那个。输入利率和复利频率——每日(365 期)、每月、每季度或每年——计算器可以把 APR 换算成 APY,也可以把 APY 反推出对应的名义 APR。",
        "再填上可选的本金和年数,就能看到这笔钱实际能增长到多少:复利后的余额,以及其中赚到的利息。换算双向精确,可以随时切换方向,和银行报出的数字互相印证。",
      ],
      steps: [
        "输入你拿到的报价利率——名义 APR 或实际 APY。",
        "选择复利频率:每日、每月、每季度或每年。",
        "可选:填入本金和年数,推算增长。",
        "查看换算后的利率、期末余额和累计利息。",
      ],
      faqs: [
        {
          q: "同一名义利率下,为什么 APY 比 APR 高?",
          a: "因为复利会让利息再生利息。APY = (1 + r ÷ n)ⁿ − 1:12% 的名义利率按月复利就是 (1.01)¹² − 1 = 12.6825% 的实际年化,多出来的 0.6825 个百分点正是「利息的利息」。复利越频繁差距越大——日复利高于月复利,月复利高于年复利。",
        },
        {
          q: "比较不同银行时该看哪个利率?",
          a: "存款和定期比 APY 对 APY——它已经把复利频率折算在内,所以月复利的 5.10% APY 确实优于年复利的 5.05% APY。贷款则比 APR 对 APR。拿一个 APR 去和一个 APY 比,正是报价里最容易误导人的地方。",
        },
        {
          q: "每日复利按 365 天还是 360 天算?",
          a: "本工具按每年 365 期计算,这也是大多数消费储蓄账户的惯例。部分金融产品按 360 天年化,实际利率会略有偏差——如果条款里写的是 360,请把结果当作近似值而不是精确报价。",
        },
      ],
    },
    ja: {
      name: "APY 計算ツール",
      tagline:
        "名目金利(APR)と実質年利(APY)を日次・月次・四半期・年次の複利頻度で正確に相互変換。元本と年数を入力すれば、実際の金利でお金がどう増えるかも分かります。",
      intro: [
        "名目金利と実質金利は同じ数字ではなく、広告は見栄えの良い方を表示しがちです。金利と複利の頻度——毎日(365 回)・毎月・四半期・毎年——を入力すると、APR から APY へ、または APY からそれに対応する名目 APR を逆算します。",
        "元本と年数を加えれば、お金が実際にいくらまで増えるかが分かります:複利後の残高と、上乗せされた利息です。変換は双方向に正確なので、方向を切り替えて銀行の提示数値と突き合わせられます。",
      ],
      steps: [
        "提示された金利(名目 APR または実質 APY)を入力します。",
        "複利の頻度を選びます:毎日・毎月・四半期ごと・毎年。",
        "必要に応じて元本と年数を入力し、増加を試算します。",
        "変換後の金利・最終残高・受取利息を確認します。",
      ],
      faqs: [
        {
          q: "同じ名目金利なのに、なぜ APY の方が APR より高くなるのですか?",
          a: "複利では利息にさらに利息がつくからです。APY = (1 + r ÷ n)ⁿ − 1 なので、名目 12% を月複利にすると (1.01)¹² − 1 = 実質 12.6825% になります。この 0.6825 ポイントの差が「利息が生む利息」です。複利の頻度が高いほど差は広がります——日次は月次より、月次は年次より高くなります。",
        },
        {
          q: "銀行を比較するときはどちらの金利を見ればいいですか?",
          a: "預金や定期は APY 同士で比べます。複利頻度はすでに織り込まれているので、月複利の APY 5.10% は年複利の APY 5.05% より確実に有利です。ローンは APR 同士で比べてください。APR と APY を混ぜて比べることが、提示数値に騙されやすい落とし穴です。",
        },
        {
          q: "日次の選択肢は 365 日基準ですか、360 日基準ですか?",
          a: "このツールは年 365 回で計算します。これはほとんどの個人向け預金の慣行です。一部の金融商品は 360 日ベースで年換算するため実質金利が多少ずれます。約款に 360 日とあれば、結果は近似値として扱ってください。",
        },
      ],
    },
    es: {
      name: "Calculadora de APY",
      tagline:
        "Convierta una tasa nominal APR en el APY efectivo — y a la inversa — con capitalización diaria, mensual, trimestral o anual, y vea el crecimiento opcional de un depósito.",
      intro: [
        "Una tasa nominal y una efectiva no son el mismo número, y los anuncios eligen en silencio la que luce mejor. Introduzca una tasa y una frecuencia de capitalización — diaria (365), mensual, trimestral o anual — y esta calculadora convierte APR en APY, o el APY de vuelta al APR nominal que lo produciría.",
        "Añada un depósito opcional y un horizonte en años para ver lo que el dinero realmente llega a ser: el saldo tras capitalizar y los intereses ganados encima. La conversión es exacta en ambos sentidos, así que puede cambiar de dirección y verificar el viaje de ida y vuelta con cualquier oferta bancaria.",
      ],
      steps: [
        "Escriba la tasa que le ofrecieron — un APR nominal o un APY efectivo.",
        "Elija la frecuencia de capitalización: diaria, mensual, trimestral o anual.",
        "Opcionalmente añada un depósito y los años para proyectar el crecimiento.",
        "Lea la tasa convertida, el saldo final y los intereses ganados.",
      ],
      faqs: [
        {
          q: "¿Por qué el APY es mayor que el APR con la misma tasa nominal?",
          a: "Porque la capitalización paga intereses sobre intereses. APY = (1 + r ÷ n)^n − 1, así que un 12% nominal capitalizado mensual se convierte en (1.01)^12 − 1 = 12,6825% efectivo: los 0,6825 puntos extra son el interés que ganan sus intereses. Cuanto más frecuente es la capitalización, mayor es la diferencia — la diaria supera a la mensual, y la mensual a la anual.",
        },
        {
          q: "¿Qué tasa debo comparar entre bancos?",
          a: "Compare APY con APY en ahorros y depósitos a plazo — ya integra la frecuencia de capitalización, así que un 5,10% APY mensual es genuinamente mejor que un 5,05% APY anual. En préstamos, compare APR con APR. Mezclar un APR con un APY en la misma comparación es justo como los presupuestos engañan.",
        },
        {
          q: "¿La opción diaria usa 365 o 360 días?",
          a: "Esta calculadora usa 365 periodos al año, la convención de la mayoría de las cuentas de ahorro. Algunos productos financieran sobre una base de 360 días, lo que altera ligeramente la tasa efectiva — si la letra pequeña dice 360, tome el resultado como una aproximación cercana, no como una cotización exacta.",
        },
      ],
    },
    pt: {
      name: "Calculadora de APY",
      tagline:
        "Converta uma taxa nominal APR no APY efetivo — e de volta — com capitalização diária, mensal, trimestral ou anual, e veja o crescimento opcional de um depósito no tempo.",
      intro: [
        "Uma taxa nominal e uma efetiva não são o mesmo número, e os anúncios escolhem em silêncio a que parece melhor. Informe uma taxa e uma frequência de capitalização — diária (365), mensal, trimestral ou anual — e esta calculadora converte APR em APY, ou o APY de volta ao APR nominal que o produziria.",
        "Adicione um depósito opcional e um horizonte em anos para ver o que o dinheiro realmente se torna: o saldo após a capitalização e os juros ganados por cima. A conversão é exata nos dois sentidos, então você pode inverter a direção e conferir a viagem de ida e volta com qualquer oferta de banco.",
      ],
      steps: [
        "Digite a taxa que lhe foi oferecida — um APR nominal ou um APY efetivo.",
        "Escolha a frequência de capitalização: diária, mensal, trimestral ou anual.",
        "Opcionalmente informe um depósito e os anos para projetar o crescimento.",
        "Veja a taxa convertida, o saldo final e os juros ganados.",
      ],
      faqs: [
        {
          q: "Por que o APY é maior que o APR com a mesma taxa nominal?",
          a: "Porque a capitalização paga juros sobre juros. APY = (1 + r ÷ n)^n − 1, então uma taxa nominal de 12% capitalizada mensalmente vira (1.01)^12 − 1 = 12,6825% efetivo: os 0,6825 pontos extras são os juros que seus juros rendem. Quanto mais frequente a capitalização, maior a diferença — a diária supera a mensal, que supera a anual.",
        },
        {
          q: "Qual taxa devo comparar entre bancos?",
          a: "Compare APY com APY em poupança e CDBs — ele já embute a frequência de capitalização, então um APY de 5,10% mensal é genuinamente melhor que um APY de 5,05% anual. Em empréstimos, compare APR com APR. Misturar um APR com um APY na mesma comparação é exatamente como as propostas enganam.",
        },
        {
          q: "A opção diária usa 365 ou 360 dias?",
          a: "Esta calculadora usa 365 períodos por ano, a convenção da maioria das contas de poupança. Alguns produtos anualizam numa base de 360 dias, o que altera um pouco a taxa efetiva — se a letra miúda disser 360, trate o resultado como uma aproximação, não como uma cotação exata.",
        },
      ],
    },
  },
});
