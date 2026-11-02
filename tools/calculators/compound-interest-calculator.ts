import { CalcEngineCompound } from "../_engines/calc-engine-compound";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "compound-interest-calculator",
  category: "utility",
  icon: "calc",
  engine: { component: CalcEngineCompound },
  related: ["emi-calculator", "loan-calculator", "discount-calculator", "percentage-calculator"],
  copy: {
    en: {
      name: "Compound Interest Calculator",
      tagline:
        "See how savings grow with compound interest — enter a deposit, monthly contributions and a rate to get the final balance and a year-by-year table.",
      intro: [
        "Compound interest is interest on interest: each period the balance earns a share of the annual rate, and every deposit you add starts earning its own interest too. This calculator runs that recursion period by period for an initial deposit plus regular monthly contributions, at monthly, quarterly or annual compounding.",
        "The result is the final balance, the total you put in, and the interest the compounding generated — plus a year-by-year table so you can see exactly when the curve starts to bend. Everything recalculates live, and the formula used is printed right under the numbers, so you can check it against your bank's own projection.",
      ],
      steps: [
        "Enter the initial deposit and the amount you will add every month (0 for a one-off deposit).",
        "Set the annual interest rate, the number of years and how often interest compounds.",
        "Pick a display currency — amounts are formatted for your locale.",
        "Read the final balance, total contributions and interest earned, then check the year-by-year table.",
      ],
      faqs: [
        {
          q: "What formula does the calculator use?",
          a: "The same balance recursion banks use to project savings: each period, balance ← (balance + contribution) × (1 + r), where r = annual rate ÷ periods per year (12 for monthly, 4 for quarterly, 1 for annual). Contributions are deposited at the start of each period, so they earn interest from that period on. Example: 10,000 initial, 100/month at 5% for 10 years with monthly compounding gives a final balance of 32,063.02 — 22,000.00 contributed and 10,063.02 in interest.",
        },
        {
          q: "Why do I get slightly different results on other calculators?",
          a: "Timing conventions differ. Some tools treat contributions as end-of-period deposits (they earn no interest in the period they arrive), some assume daily compounding, and some round each period. This tool deposits at the start of each period and never rounds intermediate steps; a 0.1% difference against another site is usually that convention, not an error.",
        },
        {
          q: "Does it include taxes, fees or inflation?",
          a: "No — the result is nominal growth at the rate you enter. Taxes on interest, account fees and inflation all reduce the real return, so treat the final balance as an upper bound on what you would actually keep.",
        },
      ],
    },
    zh: {
      name: "复利计算器",
      tagline:
        "输入初始本金、每月定投和年利率,立即得到复利终值、累计投入与利息,并附逐年增长明细表,支持月复利、季复利与年复利。",
      intro: [
        "复利就是“利滚利”:每一期余额按周期利率增长,新存入的钱也从当期开始计息。这个计算器按期递推,把初始本金和每月定投一起算清楚,复利频率可选每月、每季度或每年。",
        "结果包括期末总额、累计投入和复利产生的利息,还有一张逐年明细表,让你看到曲线从什么时候开始变陡。所有输入实时重算,所用公式直接印在数字下方,可以和银行的测算对一遍。",
      ],
      steps: [
        "输入初始存入金额和每月定投金额(一次性存入则填 0)。",
        "设置年利率、年数和复利频率。",
        "选择显示币种,金额会按对应地区习惯格式化。",
        "查看期末总额、累计投入和利息,再往下看逐年明细表。",
      ],
      faqs: [
        {
          q: "计算用的是哪个公式?",
          a: "与银行测算储蓄目标相同的余额递推式:每期 余额 ← (余额 + 投入) × (1 + r),其中 r = 年利率 ÷ 每年期数(月复利 12、季复利 4、年复利 1)。投入在每期期初存入,当期即开始计息。例如初始 10,000、每月 100、年利率 5%、按月复利 10 年,终值为 32,063.02,其中累计投入 22,000.00,利息 10,063.02。",
        },
        {
          q: "为什么和其他计算器结果略有出入?",
          a: "口径不同。有的工具把定投算作期末存入(当期不计息),有的按日复利,有的每期四舍五入。本工具在每期期初存入、中间过程不做舍入;与其他网站相差 0.1% 左右通常是口径差异,不是算错。",
        },
        {
          q: "包含税费、手续费或通货膨胀吗?",
          a: "不包含。结果是你输入利率下的名义增长,利息税、账户费用和通胀都会降低实际回报,期末总额应视为实际到手金额的上限。",
        },
      ],
    },
    ja: {
      name: "複利計算",
      tagline:
        "初期預入額・毎月の積立額・年利を入れるだけで複利の最終残高と累計利息を算出。年ごとの推移表付きで、月複利・四半期複利・年複利に対応します。",
      intro: [
        "複利は「利息に利息がつく」仕組みです。各期ごとに残高が期間利率で増え、新たに預け入れた金額もその期から利息を生みます。この計算ツールは初期預入額と毎月の積立額を期ごとに順に計算し、複利の頻度は毎月・四半期・毎年から選べます。",
        "結果は最終残高・累計投入額・複利で生まれた利息に加え、年ごとの推移表も表示します。曲線がいつ上向きになるかがひと目でわかります。入力を変えると即座に再計算され、使っている式は数値の下に表示されるので、銀行のシミュレーションと照らし合わせても確認できます。",
      ],
      steps: [
        "初期預入額と毎月の積立額を入力します(一括預入のみなら積立額は 0)。",
        "年利・年数・複利の頻度を設定します。",
        "表示通貨を選びます。金額は各言語の形式で整形されます。",
        "最終残高・累計投入額・受取利息を確認し、年ごとの推移表もご覧ください。",
      ],
      faqs: [
        {
          q: "どの式で計算していますか?",
          a: "銀行の積立シミュレーションと同じ残高の漸化式を使います。各期で 残高 ← (残高 + 積立額) × (1 + r)、r は年利 ÷ 年間の期数(月複利 12、四半期複利 4、年複利 1)です。積立は各期の初めに預け入れられ、当期から利息がつきます。例えば初期 10,000・毎月 100・年利 5%・10 年(月複利)では最終残高は 32,063.02 となり、投入 22,000.00・利息 10,063.02 です。",
        },
        {
          q: "他の計算機と結果が少し違うのはなぜですか?",
          a: "前提の扱いが異なるためです。積立を期末預け入れ(当期は無利息)とする計算機や、日複利を仮定するもの、各期で丸めるものもあります。このツールは各期の初めに預け入れ、途中で丸めません。他サイトとの差が 0.1% 程度なら大抵は前提の違いで、計算誤りではありません。",
        },
        {
          q: "税金や手数料、インフレは考慮されますか?",
          a: "考慮されません。結果は入力した金利による名目ベースの増加です。利息への課税や口座手数料、インフレは実質リターンを下げるため、最終残高は手取り額の上限と考えてください。",
        },
      ],
    },
    es: {
      name: "Calculadora de interés compuesto",
      tagline:
        "Calcule el saldo final de sus ahorros con interés compuesto: depósito inicial, aportes mensuales y capitalización mensual, trimestral o anual, con tabla anual.",
      intro: [
        "El interés compuesto es interés sobre interés: cada periodo el saldo genera una parte de la tasa anual y cada aporte nuevo empieza a rendir desde ese mismo periodo. Esta calculadora aplica esa recursión periodo a periodo para un depósito inicial más aportes mensuales regulares, con capitalización mensual, trimestral o anual.",
        "El resultado es el saldo final, el total aportado y los intereses generados, junto con una tabla año por año que muestra cuándo la curva empieza a empinarse. Todo se recalcula al instante y la fórmula utilizada aparece justo debajo de las cifras, para que pueda contrastarla con la proyección de su banco.",
      ],
      steps: [
        "Escriba el depósito inicial y el aporte mensual (0 si es un depósito único).",
        "Fije la tasa anual, los años y la frecuencia de capitalización.",
        "Elija la moneda de visualización; los importes se formatean según su configuración regional.",
        "Lea el saldo final, el total aportado y los intereses, y revise la tabla año por año.",
      ],
      faqs: [
        {
          q: "¿Qué fórmula utiliza la calculadora?",
          a: "La misma recursión de saldo que usan los bancos para proyectar ahorros: en cada periodo, saldo ← (saldo + aporte) × (1 + r), con r = tasa anual ÷ periodos por año (12 mensual, 4 trimestral, 1 anual). Los aportes se depositan al inicio de cada periodo y generan intereses desde ese periodo. Con 10.000 inicial, 100 al mes al 5 % durante 10 años con capitalización mensual, el saldo final es 32.063,02: 22.000,00 aportados y 10.063,02 de intereses.",
        },
        {
          q: "¿Por qué obtengo resultados ligeramente distintos en otras webs?",
          a: "Por las convenciones de tiempo. Algunas calculadoras tratan los aportes como depósitos a fin de periodo (no rinden el periodo en que llegan), otras asumen capitalización diaria y otras redondean cada periodo. Esta herramienta deposita al inicio de cada periodo y no redondea pasos intermedios; una diferencia del 0,1 % con otro sitio suele ser convención, no un error.",
        },
        {
          q: "¿Incluye impuestos, comisiones o inflación?",
          a: "No. El resultado es crecimiento nominal a la tasa introducida. Los impuestos sobre los intereses, las comisiones y la inflación reducen la rentabilidad real, así que considere el saldo final como un límite superior de lo que conservaría.",
        },
      ],
    },
    pt: {
      name: "Calculadora de juros compostos",
      tagline:
        "Descubra quanto seu dinheiro rende com juros compostos — depósito inicial, aportes mensais e capitalização mensal, trimestral ou anual, com tabela ano a ano.",
      intro: [
        "Juros compostos são juros sobre juros: a cada período o saldo rende uma fração da taxa anual e cada aporte novo começa a render no mesmo período. Esta calculadora aplica essa recursão período a período para um depósito inicial mais aportes mensais regulares, com capitalização mensal, trimestral ou anual.",
        "O resultado é o saldo final, o total aportado e os juros gerados, além de uma tabela ano a ano que mostra quando a curva começa a subir mais rápido. Tudo é recalculado ao vivo e a fórmula usada aparece logo abaixo dos números, para você conferir com a projeção do seu banco.",
      ],
      steps: [
        "Informe o depósito inicial e o aporte mensual (0 se for um depósito único).",
        "Defina a taxa anual, os anos e a frequência de capitalização.",
        "Escolha a moeda de exibição — os valores seguem o formato do seu idioma.",
        "Veja o saldo final, o total aportado e os juros ganados, e confira a tabela ano a ano.",
      ],
      faqs: [
        {
          q: "Qual fórmula a calculadora usa?",
          a: "A mesma recursão de saldo que os bancos usam para projetar poupança: a cada período, saldo ← (saldo + aporte) × (1 + r), com r = taxa anual ÷ períodos por ano (12 mensal, 4 trimestral, 1 anual). Os aportes entram no início de cada período e rendem desde então. Com 10.000 iniciais, 100 por mês a 5% por 10 anos com capitalização mensal, o saldo final é 32.063,02 — sendo 22.000,00 aportados e 10.063,02 de juros.",
        },
        {
          q: "Por que o resultado difere um pouco de outras calculadoras?",
          a: "Por causa das convenções de tempo. Algumas ferramentas tratam os aportes como depósitos no fim do período (sem render no período em que chegam), outras assumem capitalização diária e outras arredondam cada período. Esta deposita no início de cada período e não arredonda etapas intermediárias; uma diferença de 0,1% em relação a outro site costuma ser convenção, não erro.",
        },
        {
          q: "Inclui impostos, tarifas ou inflação?",
          a: "Não. O resultado é crescimento nominal à taxa informada. Impostos sobre rendimento, tarifas e inflação reduzem o retorno real, então trate o saldo final como um teto do que você de fato manteria.",
        },
      ],
    },
  },
});
