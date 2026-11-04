import { CalcEngineMortgage } from "../_engines/calc-engine-mortgage";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "mortgage-calculator",
  category: "utility",
  icon: "calc",
  engine: { component: CalcEngineMortgage },
  related: ["loan-calculator", "emi-calculator", "compound-interest-calculator", "currency-converter", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Mortgage Calculator",
      tagline:
        "Work out the monthly payment on a home loan — P&I plus tax, insurance and HOA — with loan amount, total interest and a yearly amortization table.",
      intro: [
        "Enter the home price, down payment, interest rate and term to get the monthly principal-and-interest payment from the standard amortization formula banks use. Add yearly property tax, yearly insurance and monthly HOA dues to see the full PITI amount most lenders quote.",
        "The loan amount, the total interest over the life of the loan and a year-by-year amortization table update live as you type, so you can compare a 20% down payment against 10%, or a 15-year term against 30, in seconds.",
      ],
      steps: [
        "Enter the home price and the down payment as a percent or an amount.",
        "Set the annual interest rate and the term in years.",
        "Optionally add yearly property tax, yearly insurance and monthly HOA dues.",
        "Read the monthly P&I, the PITI total and the yearly amortization table.",
      ],
      faqs: [
        {
          q: "What formula does the mortgage calculator use?",
          a: "The standard fixed-rate amortization formula: M = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), where L is the loan amount (price minus down payment), r the monthly rate (annual ÷ 12 ÷ 100) and n the number of months. As an example, a 300,000 home with 20% down at 6% over 30 years gives a monthly P&I of about 1,438.92 — the rate you enter is an example input, not an offer.",
        },
        {
          q: "What does PITI mean?",
          a: "Principal, Interest, Taxes and Insurance — the four parts of a typical monthly housing payment. The tool adds monthly twelfths of the yearly property tax and insurance you enter, plus HOA dues, on top of the principal-and-interest payment. Whether taxes and insurance are escrowed varies by lender.",
        },
        {
          q: "Why do I pay so much interest in the early years?",
          a: "Interest each month is charged on the remaining balance, which is largest at the start. The amortization table shows the crossover: early payments are mostly interest, and by the final years they are almost all principal. Extra principal payments early in the loan therefore save the most interest.",
        },
      ],
    },
    zh: {
      name: "房贷计算器",
      tagline:
        "输入房价、首付、利率与年限,立即算出每月本息月供与 PITI 总支出,附贷款总额、总利息和逐年还款计划表,可选房产税、保险与物业费。",
      intro: [
        "输入房价、首付、年利率和贷款年限,即可用银行通用的标准摊销公式算出每月本息月供;再填入每年的房产税、保险和每月物业费,就能看到贷款机构常报的 PITI 每月总支出。",
        "贷款总额、整个贷款期的总利息以及逐年还款计划表会随输入实时更新,方便你几秒钟内对比首付两成与一成、15 年期与 30 年期的差别。",
      ],
      steps: [
        "输入房价,首付可选按百分比或按金额填写。",
        "设置年利率和贷款年限。",
        "按需填写年房产税、年保险和每月物业费。",
        "查看每月本息、PITI 总支出和逐年还款计划表。",
      ],
      faqs: [
        {
          q: "房贷计算用的是哪个公式?",
          a: "标准等额本息摊销公式:M = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1),其中 L 为贷款额(房价减首付),r 为月利率(年利率 ÷ 12 ÷ 100),n 为总月数。举例:30 万的房子首付两成、年利率 6%、30 年,月供本息约 1,438.92——这里的利率只是示例输入,不构成任何报价。",
        },
        {
          q: "PITI 是什么意思?",
          a: "即本金(Principal)、利息(Interest)、税费(Taxes)和保险(Insurance),是常见的每月住房支出四部分。本工具在你输入的年房产税、年保险基础上按月均摊,再加上物业费,叠加到本息月供上。税费和保险是否由贷款机构代管因机构而异。",
        },
        {
          q: "为什么前几年还的利息占比这么高?",
          a: "每月利息按剩余本金计收,期初余额最大,所以利息最多。还款计划表能直观看到这个交叉点:前期月供大部分是利息,到最后几年几乎全是本金。因此贷款前期多还本金,省下的利息最多。",
        },
      ],
    },
    ja: {
      name: "住宅ローン計算",
      tagline:
        "住宅価格・頭金・金利・期間から毎月の元利返済額と PITI(返済+税+保険+管理費)を即時算出。借入額・総利息・年次返済スケジュールも表示します。",
      intro: [
        "住宅価格・頭金・金利・期間を入力すると、銀行が使う標準的な元利均等返済の公式で毎月の返済額を算出します。年額の固定資産税・保険料と月額の管理費を加えれば、貸し手が提示する PITI の月額合計もわかります。",
        "借入額・期間中の総利息・年ごとの返済スケジュールは入力に合わせてリアルタイムで更新されるので、頭金 2 割と 1 割、15 年と 30 年の比較もすぐにできます。",
      ],
      steps: [
        "住宅価格と頭金(パーセントまたは金額)を入力します。",
        "年利と期間(年)を設定します。",
        "必要に応じて年間の固定資産税・保険料・月額の管理費を入力します。",
        "毎月の元利返済額・PITI 合計・年次返済スケジュールを確認します。",
      ],
      faqs: [
        {
          q: "どの式で計算していますか?",
          a: "標準的な元利均等返済の公式 M = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1) です。L は借入額(価格 − 頭金)、r は月利(年利 ÷ 12 ÷ 100)、n は月数。例えば 30 万の住宅で頭金 2 割・年利 6%・30 年なら、毎月の元利返済額は約 1,438.92 です。入力する金利はあくまで例であり、提案ではありません。",
        },
        {
          q: "PITI とは何ですか?",
          a: "元金(Principal)・利息(Interest)・税金(Taxes)・保険(Insurance)の頭文字で、典型的な毎月の住居費 4 要素を指します。このツールは入力された年額の固定資産税と保険料を 12 分割し、管理費と合わせて元利返済額に上乗せします。税・保険をエスクローにするかは貸し手によって異なります。",
        },
        {
          q: "返済初期の利息が多いのはなぜですか?",
          a: "毎月の利息は残高に対して課されるため、残高が最大の初期に最も多くなります。返済スケジュールを見ると、初期の返済は利息中心で、最終盤はほぼ元本だけになります。したがって繰り上げ返済は早い時期ほど利息削減効果が大きくなります。",
        },
      ],
    },
    es: {
      name: "Calculadora de hipoteca",
      tagline:
        "Calcule la cuota mensual de su hipoteca — capital e interés más impuestos, seguro y comunidad — con el interés total y la amortización anual.",
      intro: [
        "Introduzca el precio de la vivienda, la entrada, el tipo de interés y el plazo para obtener la cuota mensual de capital e interés con la fórmula de amortización estándar que aplican los bancos. Añada el impuesto anual, el seguro anual y la cuota mensual de la comunidad para ver el PITI completo que suelen citar los prestamistas.",
        "El importe del préstamo, el interés total de la vida del préstamo y la tabla de amortización año por año se actualizan al escribir, de modo que puede comparar una entrada del 20 % frente al 10 %, o un plazo de 15 años frente a 30, en segundos.",
      ],
      steps: [
        "Escriba el precio de la vivienda y la entrada, en porcentaje o importe.",
        "Fije el tipo de interés anual y el plazo en años.",
        "Opcionalmente añada impuesto anual, seguro anual y cuota mensual de comunidad.",
        "Lea la cuota mensual de capital e interés, el PITI y la tabla de amortización anual.",
      ],
      faqs: [
        {
          q: "¿Qué fórmula usa la calculadora de hipoteca?",
          a: "La fórmula estándar de amortización a tipo fijo: M = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), donde L es el préstamo (precio menos entrada), r el tipo mensual (anual ÷ 12 ÷ 100) y n los meses. Como ejemplo, una vivienda de 300.000 con una entrada del 20 % al 6 % a 30 años da una cuota de unos 1.438,92 — el tipo que introduce es un dato de ejemplo, no una oferta.",
        },
        {
          q: "¿Qué significa PITI?",
          a: "Capital, Interés, Tasas e Insurance (seguro): las cuatro partes de un pago mensual de vivienda típico. La herramienta añade doceavos mensuales del impuesto y del seguro anuales que indique, más la cuota de comunidad, sobre la cuota de capital e interés. Si impuestos y seguro se escrowan depende del prestamista.",
        },
        {
          q: "¿Por qué pago tantos intereses los primeros años?",
          a: "Cada mes el interés se calcula sobre el saldo pendiente, que es máximo al principio. La tabla de amortización muestra el cruce: las cuotas iniciales son casi todo interés y en los últimos años casi todo capital. Por eso amortizar capital al principio ahorra muchos más intereses.",
        },
      ],
    },
    pt: {
      name: "Calculadora de financiamento imobiliário",
      tagline:
        "Calcule a parcela mensal do financiamento da casa — principal e juros mais IPTU, seguro e condomínio — com total de juros e amortização anual.",
      intro: [
        "Informe o preço do imóvel, a entrada, a taxa de juros e o prazo para obter a parcela mensal de principal e juros pela fórmula de amortização padrão dos bancos. Adicione IPTU anual, seguro anual e condomínio mensal para ver o PITI completo que os credores costumam citar.",
        "O valor financiado, o total de juros da vida do contrato e a tabela de amortização ano a ano se atualizam ao digitar, então você compara uma entrada de 20% contra 10%, ou um prazo de 15 anos contra 30, em segundos.",
      ],
      steps: [
        "Digite o preço do imóvel e a entrada, em porcentagem ou valor.",
        "Defina a taxa de juros anual e o prazo em anos.",
        "Opcionalmente informe IPTU anual, seguro anual e condomínio mensal.",
        "Veja a parcela mensal de principal e juros, o PITI e a tabela de amortização anual.",
      ],
      faqs: [
        {
          q: "Qual fórmula a calculadora de financiamento usa?",
          a: "A fórmula padrão de amortização a taxa fixa: M = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), onde L é o valor financiado (preço menos entrada), r a taxa mensal (anual ÷ 12 ÷ 100) e n os meses. Como exemplo, um imóvel de 300.000 com entrada de 20% a 6% em 30 anos dá uma parcela de cerca de 1.438,92 — a taxa informada é um exemplo, não uma oferta.",
        },
        {
          q: "O que significa PITI?",
          a: "Principal, Interest, Taxes and Insurance (juros, impostos e seguro): as quatro partes típicas do pagamento mensal de uma moradia. A ferramenta soma um doze avos mensais do IPTU e do seguro anuais informados, mais o condomínio, à parcela de principal e juros. Se impostos e seguro ficam em custódia depende do credor.",
        },
        {
          q: "Por que pago tantos juros nos primeiros anos?",
          a: "O juro mensal incide sobre o saldo devedor, que é maior no começo. A tabela de amortização mostra a virada: as parcelas iniciais são quase todo juro e nos anos finais quase todo principal. Por isso amortizar cedo economiza muito mais juros.",
        },
      ],
    },
  },
});
