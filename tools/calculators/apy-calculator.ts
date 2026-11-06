import { CalcEngineApy } from "../_engines/calc-engine-apy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "apy-calculator",
  category: "utility",
  icon: "swap",
  engine: { component: CalcEngineApy },
  related: ["compound-interest-calculator", "mortgage-calculator", "loan-calculator", "discount-calculator", "profit-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator"],
  copy: {
    en: {
      name: "APY Calculator",
      tagline:
        "Convert a nominal APR into the effective APY — and back again — for daily, monthly, quarterly or annual compounding, with optional growth of a deposit over time.",
      intro: [
        "A nominal rate and an effective rate are not the same number, and ads quietly pick whichever looks better. Enter a rate and a compounding frequency — daily (365), monthly, quarterly or annually — and this calculator converts APR into APY, or APY back into the nominal APR that would produce it.",
        "Add an optional deposit and a horizon in years to see what the money actually grows into: the balance after compounding and the interest earned on top. The conversion is exact both ways, so you can flip the direction and verify the round trip against any bank quote.",
        "The conversion follows the standard identity APY = (1 + r/n)^n − 1, where r is the nominal annual rate and n the number of compounding periods — 365 for daily, 12 for monthly, 4 for quarterly, 1 for annual. A 5% nominal rate compounded monthly is an APY of about 5.12%, and the reverse direction solves the same equation for r.",
        "Banks advertise whichever figure flatters the product — APY for savings accounts, APR for loans — so comparing two headline rates without normalizing compounding is misleading. This tool puts both on the same footing in one step, and the optional projection shows what the gap is worth over your actual horizon. Figures are estimates for comparison, not a quote.",
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
      deepDive: [
        {
          heading: "APR, APY, and who benefits from the confusion",
          paragraphs: [
            "APR is a nominal annual rate: what the balance would earn, or owe, if interest were charged once a year. APY is the effective annual result once compounding is folded in. The identity linking them, APY = (1 + r/n)^n − 1, says the same nominal rate produces a higher effective yield the more often it compounds — the difference is precisely the interest your interest earns.",
            "The asymmetry in advertising follows the incentive: savings are quoted in APY because it is the bigger number, loans in APR because it is the smaller one. Neither practice is dishonest on its own — both figures are standardized in most markets — but comparing a savings APY directly against a loan APR, or two rates with different compounding frequencies, is comparing different units.",
            "The one-line rule this tool automates: for deposits, compare APY against APY, which already normalizes frequency; for debts, compare APR against APR and then check how often each contract actually capitalizes. Only rates on the same footing can rank two offers.",
          ],
        },
        {
          heading: "The 365-vs-360 footnote, and other conventions that move the number",
          paragraphs: [
            "This tool uses 365 periods for daily compounding, the convention most consumer savings accounts follow. But the fine print of financial products has more than one calendar: some products annualize on a 360-day basis, and some loan contracts compute interest on the actual number of days in the year. Each convention shifts the effective rate by a small amount — small per year, meaningful over the life of a large balance.",
            "Payment timing moves the number too. A deposit earning interest from the day it arrives grows slightly faster than one credited at period end; whether a loan capitalizes interest monthly or daily changes its effective cost even at the same nominal rate. When two quotes differ by a few hundredths of a point, the cause is almost always a convention like these, not an arithmetic error on anyone's side.",
            "That is also why the reverse direction matters: given an advertised APY, this tool recovers the nominal APR that would produce it, so you can see the raw rate behind the marketing number and compare contracts that quote in different units. The round trip is exact because it is the same equation solved both ways.",
          ],
        },
        {
          heading: "What the projection adds, and where it stops",
          paragraphs: [
            "The optional deposit and horizon turn a rate comparison into a money comparison: the same fraction of a point between two APYs is trivial on a small emergency fund and four figures over a decade on a large deposit. The projection compounds at the effective rate, so it answers the practical question — what does this difference buy me over my actual horizon — rather than restating the rates.",
            "What it does not do is model taxes or fees. Interest income is taxable in most jurisdictions, and account fees subtract directly from the balance, so the after-tax, after-fee APY you actually experience is lower than the quoted one. Convert your own numbers conservatively and treat the projected balance as a ceiling, not a promise.",
            "Like the rest of this site, the conversion and the projection run locally in your browser. Rates you are still negotiating and deposit sizes never leave your device — which matters more than it sounds when you are mid-comparison between two banks.",
          ],
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
      deepDive: [
        {
          heading: "APR、APY,与谁在利用这场混淆",
          paragraphs: [
            "APR 是名义年利率:假设一年只计息一次,余额将赚取或欠下的数字。APY 则是复利折算后的实际年化结果。连接两者的恒等式 APY = (1 + r/n)ⁿ − 1 说明:同一名义利率,复利越频繁,实际收益越高——多出来的部分正是“利息的利息”。",
            "广告里的不对称源于利益:存款报 APY,因为数字更大;贷款报 APR,因为数字更小。这两种做法本身都谈不上不诚实——多数市场对两个口径都有标准化要求——但拿存款的 APY 直接去比贷款的 APR,或比较复利频率不同的两个利率,就是在比较两种不同的单位。",
            "本工具替你自动执行的是那条单行规则:存款比 APY 对 APY,频率已经折算在内;负债比 APR 对 APR,然后再核实每份合同实际按什么频率计息。只有站在同一口径上的利率,才能给两份报价排出先后。",
          ],
        },
        {
          heading: "365 对 360 的脚注,以及其他会搬动数字的口径",
          paragraphs: [
            "本工具的日复利按每年 365 期计算,这是大多数消费储蓄账户的惯例。但金融产品的细则里有不止一种日历:有的产品按 360 天年化,有的贷款合同按自然年内实际天数计息。每种口径都会让实际利率偏移一点点——单年很小,大额余额上摊到整个期限就可观了。",
            "计息时点也会搬动数字。存入当天即起息的存款,比期末才起息的长得略快;同样是名义利率,按月计息和按日计息的贷款实际成本并不相同。两份报价只差百分之零点零几时,原因几乎总是这类口径差异,而不是谁算错了。",
            "这也是反向换算的价值所在:拿到广告里的 APY,本工具能反推出对应的名义 APR,让你看清营销数字背后的原始利率,并把用不同单位报价的合同放到一起比较。往返是精确的,因为两个方向解的是同一个方程。",
          ],
        },
        {
          heading: "推演补充了什么,又止步于哪里",
          paragraphs: [
            "可选的本金和年数,把一场利率比较变成一场金额比较:两个 APY 之间同样的零点几个百分点,放在小额应急资金上微不足道,放在大额存款的十年里就是四位数。推演按实际利率复利,回答的是那个实际问题——这个差距在我的真实期限里值多少钱——而不是复述利率。",
            "它不模拟税费。在多数司法辖区利息收入要纳税,账户费用直接从余额里扣,所以你真实体验的税后、费后 APY 低于报价。保守地换算自己的数字,把推演出的余额当作上限,而不是承诺。",
            "和本站其他工具一样,换算与推演都在浏览器本地完成。还在谈判中的利率和存款金额不会离开你的设备——当你正在两家银行之间比价时,这件事比听起来重要。",
          ],
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
      deepDive: [
        {
          heading: "APR と APY、そして混乱から得をする側",
          paragraphs: [
            "APR は名目年利です。利息を年に一度だけ課すなら残高が得る、あるいは負う数字です。APY は複利を織り込んだ実質の年間結果。両者を結ぶ恒等式 APY = (1 + r ÷ n)ⁿ − 1 が示すのは、同名目金利でも複利の頻度が高いほど実質利回りが高くなるということです。その差こそ「利息が生む利息」です。",
            "広告の非対称性はインセンティブに従います。預金は大きい数字になる APY で表示し、ローンは小さい数字になる APR で表示する。どちらの慣行も単独では不誠実ではありません。多くの市場で両数値は標準化されています。しかし預金の APY とローンの APR を直接比べたり、複利頻度の違う二つの金利を比べたりするのは、単位の違うものを比べているのです。",
            "このツールが自動化する一行のルールはこうです。預金は APY 対 APY で比べます。頻度はすでに正規化済みです。負債は APR 対 APR で比べ、その上で各契約が実際にどの頻度で利息を元本に組み入れるか確認します。同じ土俵に載った金利だけが、二つのオファーに順位をつけられます。",
          ],
        },
        {
          heading: "365 対 360 の脚注、数字を動かすその他の前提",
          paragraphs: [
            "このツールの日次複利は年 365 回です。これはほとんどの個人向け預金の慣行ですが、金融商品の約款には複数の暦があります。360 日ベースで年換算する商品や、実際の日数で利息を計算するローン契約もあります。どの前提も実質金利をわずかにずらします。年では小さくても、大きな残高の全期間では無視できません。",
            "利息の起算タイミングも数字を動かします。預入当日から利息がつく預金は、期末計上よりわずかに速く育ちます。同名目金利でも、月単位と日単位で利息を元本に組み入れるローンでは実質コストが変わります。二つの提示の差が数ベーシスポイントなら、原因はほぼ必ずこの種の前提であり、誰かの計算ミスではありません。",
            "だからこそ逆方向の変換が意味を持ちます。広告の APY から、このツールはそれを生む名目 APR を復元します。マーケティングの数字の裏にある素の金利が見え、単位の違う契約を同じ土俵で比べられます。往復が正確なのは、同じ方程式を両方向に解いているからです。",
          ],
        },
        {
          heading: "試算が付け加えるもの、止まる場所",
          paragraphs: [
            "任意の元本と年数は、金利の比較を金額の比較に変えます。二つの APY の同じ数ベーシスポイントは、小さな非常用資金では取るに足らず、大きな預金の十年では四桁になります。試算は実質金利で複利計算するので、利率を言い直すのではなく「この差は自分の期間でいくらになるのか」という実務的な問いに答えます。",
            "やらないのは税金と手数料のモデル化です。ほとんどの税制で利息収入は課税対象であり、口座手数料は残高から直接引かれます。実際に体験する税引後・手数料後の APY は表示より低くなります。自分の数字は保守的に換算し、試算された残高は約束ではなく上限として扱ってください。",
            "このサイトの他のツールと同様、変換も試算もブラウザ内で完結します。まだ交渉中の金利も預入額も端末の外に出ません。二つの銀行の比較中であることを考えると、これは思ったより重要です。",
          ],
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
      deepDive: [
        {
          heading: "APR, APY, y quién se beneficia de la confusión",
          paragraphs: [
            "El APR es una tasa anual nominal: lo que el saldo ganaría, o debería, si el interés se cobrara una vez al año. El APY es el resultado anual efectivo una vez integrada la capitalización. La identidad que los une, APY = (1 + r ÷ n)^n − 1, dice que la misma tasa nominal produce un rendimiento efectivo mayor cuanto más seguido capitaliza — la diferencia es precisamente el interés que ganan sus intereses.",
            "La asimetría publicitaria sigue el incentivo: el ahorro se cotiza en APY porque es la cifra mayor, los préstamos en APR porque es la menor. Ninguna práctica es deshonesta por sí misma — ambas cifras están estandarizadas en la mayoría de los mercados — pero comparar un APY de ahorro directamente contra un APR de préstamo, o dos tasas con frecuencias de capitalización distintas, es comparar unidades distintas.",
            "La regla de una línea que esta herramienta automatiza: en depósitos, compare APY contra APY, que ya normaliza la frecuencia; en deudas, compare APR contra APR y compruebe después con qué frecuencia capitaliza cada contrato. Solo tasas sobre el mismo terreno pueden ordenar dos ofertas.",
          ],
        },
        {
          heading: "La nota de 365 contra 360, y otras convenciones que mueven la cifra",
          paragraphs: [
            "Esta herramienta usa 365 periodos para la capitalización diaria, la convención de la mayoría de las cuentas de ahorro. Pero la letra pequeña de los productos financieros trae más de un calendario: algunos anualizan sobre una base de 360 días y algunos contratos de préstamo calculan el interés por los días reales del año. Cada convención desplaza la tasa efectiva un poco — poco por año, significativo sobre la vida de un saldo grande.",
            "El momento de la imputación también mueve la cifra. Un depósito que rinde desde el día en que llega crece algo más rápido que uno abonado a fin de periodo; si un préstamo capitaliza el interés cada mes o cada día cambia su coste efectivo aun con la misma tasa nominal. Cuando dos ofertas difieren en unas centésimas, la causa casi siempre es una convención como estas, no un error aritmético de nadie.",
            "Por eso importa la dirección inversa: dado un APY anunciado, esta herramienta recupera el APR nominal que lo produciría, para ver la tasa cruda detrás del número de marketing y comparar contratos cotizados en unidades distintas. El viaje de ida y vuelta es exacto porque es la misma ecuación resuelta en ambos sentidos.",
          ],
        },
        {
          heading: "Qué añade la proyección y dónde se detiene",
          paragraphs: [
            "El depósito opcional y el horizonte convierten una comparación de tasas en una de dinero: la misma fracción de punto entre dos APY es trivial en un pequeño fondo de emergencia y de cuatro cifras en una década sobre un depósito grande. La proyección capitaliza a la tasa efectiva, así que responde la pregunta práctica — qué me compra esta diferencia en mi horizonte real — en vez de reformular las tasas.",
            "Lo que no hace es modelar impuestos ni comisiones. Los rendimientos del interés son gravados en la mayoría de las jurisdicciones, y las comisiones de la cuenta se restan directamente del saldo, así que el APY neto que usted experimenta es menor que el cotizado. Convierta sus propias cifras con conservadurismo y trate el saldo proyectado como un techo, no como una promesa.",
            "Como en el resto de este sitio, la conversión y la proyección corren localmente en su navegador. Las tasas que aún negocia y los importes de sus depósitos nunca salen de su dispositivo — algo que importa más de lo que suena cuando está comparando dos bancos.",
          ],
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
      deepDive: [
        {
          heading: "APR, APY, e quem lucra com a confusão",
          paragraphs: [
            "O APR é uma taxa anual nominal: o que o saldo renderia, ou deveria, se os juros incidissem uma vez por ano. O APY é o resultado anual efetivo depois de embutida a capitalização. A identidade que os liga, APY = (1 + r ÷ n)^n − 1, diz que a mesma taxa nominal produz um rendimento efetivo maior quanto mais frequente a capitalização — a diferença é precisamente os juros que seus juros rendem.",
            "A assimetria da publicidade segue o incentivo: poupança é cotada em APY porque é o número maior, empréstimos em APR porque é o menor. Nenhuma prática é desonesta por si só — ambas as cifras são padronizadas na maioria dos mercados — mas comparar um APY de poupança diretamente com um APR de empréstimo, ou duas taxas com frequências de capitalização diferentes, é comparar unidades diferentes.",
            "A regra de uma linha que esta ferramenta automatiza: em depósitos, compare APY com APY, que já normaliza a frequência; em dívidas, compare APR com APR e depois verifique com que frequência cada contrato capitaliza de fato. Só taxas no mesmo terreno podem ordenar duas propostas.",
          ],
        },
        {
          heading: "A nota de rodapé 365 contra 360, e outras convenções que movem o número",
          paragraphs: [
            "Esta ferramenta usa 365 períodos para a capitalização diária, a convenção da maioria das contas de poupança. Mas a letra miúda dos produtos financeiros traz mais de um calendário: alguns anualizam numa base de 360 dias e alguns contratos de empréstimo calculam juros pelos dias reais do ano. Cada convenção desloca a taxa efetiva um pouco — pouco por ano, significativo ao longo da vida de um saldo grande.",
            "O momento do lançamento também move o número. Um depósito que rende desde o dia em que chega cresce um pouco mais rápido que um creditado no fim do período; se um empréstimo capitaliza juros por mês ou por dia muda seu custo efetivo mesmo com a mesma taxa nominal. Quando duas propostas diferem em algumas centésimas, a causa quase sempre é uma convenção como estas, não um erro aritmético de ninguém.",
            "Por isso a direção inversa importa: dado um APY anunciado, esta ferramenta recupera o APR nominal que o produziria, para você ver a taxa crua por trás do número de marketing e comparar contratos cotados em unidades diferentes. A viagem de ida e volta é exata porque é a mesma equação resolvida nos dois sentidos.",
          ],
        },
        {
          heading: "O que a projeção acrescenta, e onde ela para",
          paragraphs: [
            "O depósito opcional e o horizonte transformam uma comparação de taxas numa comparação de dinheiro: a mesma fração de ponto entre dois APYs é trivial num pequeno fundo de emergência e são quatro dígitos numa década sobre um depósito grande. A projeção capitaliza à taxa efetiva, então responde à pergunta prática — o que essa diferença me compra no meu horizonte real — em vez de reformular as taxas.",
            "O que ela não faz é modelar impostos e tarifas. Rendimentos de juros são tributados na maioria das jurisdições, e tarifas de conta descontam direto do saldo, então o APY líquido que você vive é menor que o cotado. Converta seus próprios números com conservadorismo e trate o saldo projetado como um teto, não como uma promessa.",
            "Como no restante deste site, a conversão e a projeção rodam localmente no seu navegador. As taxas que você ainda negocia e os valores dos depósitos nunca saem do seu dispositivo — o que importa mais do que parece quando você está comparando dois bancos.",
          ],
        },
      ],
    },
  },
});
