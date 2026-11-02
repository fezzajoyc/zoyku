import { CalcEngineLoan } from "../_engines/calc-engine-loan";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "emi-calculator",
  category: "utility",
  icon: "file",
  engine: { component: CalcEngineLoan, props: { kind: "emi" } },
  related: ["loan-calculator", "gst-calculator", "percentage-calculator", "profit-calculator"],
  copy: {
    en: {
      name: "EMI Calculator",
      tagline: "Compute the fixed monthly EMI for any loan — principal, rate and tenure in, total interest and total repayment out, instantly.",
      intro: [
        "Enter the loan amount, annual interest rate and tenure in years or months to get the equated monthly installment plus the total interest you will pay over the life of the loan. The math is the standard reducing-balance formula that banks and NBFCs use.",
        "Adjust any input and everything recalculates live, so you can compare a 15-year loan against a 20-year one, or see exactly what an extra 0.5% interest rate costs you each month.",
      ],
      steps: [
        "Type the loan amount (principal).",
        "Enter the annual interest rate and the tenure in years or months.",
        "Read the monthly EMI, total interest and total repayment.",
      ],
      faqs: [
        {
          q: "What formula does the EMI calculator use?",
          a: "The standard reducing-balance formula: EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), where P is principal, r the monthly interest rate (annual ÷ 12 ÷ 100) and n the number of months. This is the same equation used by banks for home, car and personal loans.",
        },
        {
          q: "Why is total interest so high early in the loan?",
          a: "Interest each month is charged on the outstanding balance, which is largest at the start. Early EMIs are mostly interest and little principal; the mix flips as the balance shrinks. Prepaying early therefore saves much more interest than prepaying late.",
        },
        {
          q: "Are fees and insurance included in the EMI?",
          a: "No. Processing fees, insurance and any floating-rate changes are excluded — the result is the pure amortization EMI for the rate you enter. Your lender's sanction letter shows the final payable amount.",
        },
      ],
    },
    zh: {
      name: "EMI 月供计算器",
      tagline: "输入贷款额、利率与期限,立即算出每月固定月供(EMI)、总利息和还款总额——采用银行通用的等额本息公式。",
      intro: [
        "输入贷款金额、年利率和期限(年或月),即可得到等额月供(EMI)以及整个贷款期要付的总利息。计算采用银行和消费金融公司通用的余额递减(等额本息)公式。",
        "任意一项改动都会实时重算,方便你对比 15 年期与 20 年期贷款,或看清利率多 0.5% 每月要多还多少。",
      ],
      steps: [
        "输入贷款金额(本金)。",
        "填写年利率和期限(年或月)。",
        "查看每月月供、总利息和还款总额。",
      ],
      faqs: [
        {
          q: "EMI 计算用的是哪个公式?",
          a: "标准等额本息公式:EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1),其中 P 为本金,r 为月利率(年利率 ÷ 12 ÷ 100),n 为总月数。这与银行计算房贷、车贷和个人贷款的公式一致。",
        },
        {
          q: "为什么前期利息占比那么高?",
          a: "每月利息按剩余本金计收,而剩余本金在期初最大,所以前期月供大部分是利息。随着本金减少,占比逐渐反转。因此提前还款越早,省下的利息越多。",
        },
        {
          q: "手续费和保险包含在月供里吗?",
          a: "不包含。手续费、保险和浮动利率调整都不在计算范围内——结果只是按你输入的利率算出的纯摊销月供。实际应还金额以贷款机构的批复为准。",
        },
      ],
    },
    ja: {
      name: "EMI 計算(月々返済額)",
      tagline: "借入額・金利・期間から毎月の返済額(EMI)を即時算出。総利息と返済総額も同時に表示します。",
      intro: [
        "借入額・年利・期間(年またはか月)を入力すると、毎月の均等返済額(EMI)と支払総利息がすぐ出ます。銀行やノンバンクが使う残高スライド式の標準公式による計算です。",
        "どの入力を変えてもリアルタイムで再計算されるので、15 年と 20 年の比較や、金利 0.5% 違いが毎月いくら変わるかもひと目でわかります。",
      ],
      steps: [
        "借入額(元金)を入力します。",
        "年利と期間(年またはか月)を入力します。",
        "毎月の返済額・総利息・返済総額を確認します。",
      ],
      faqs: [
        {
          q: "EMI はどの式で計算していますか?",
          a: "標準的な残高スライド式の公式 EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1) を使います。P は元金、r は月利(年利 ÷ 12 ÷ 100)、n は返済回数です。住宅・自動車・個人ローンで銀行が使う式と同じです。",
        },
        {
          q: "返済初期の利息が多いのはなぜですか?",
          a: "毎月の利息は残高に対して課されるため、残高が最大の初期に最も多くなります。初期の返済は利息中心で元本は少なく、残高が減るにつれ逆転します。繰り上げ返済は早いほど利息削減効果が大きいのはこのためです。",
        },
        {
          q: "手数料や保険は EMI に含まれますか?",
          a: "含まれません。事務手数料・保険・変動金利の見直しは対象外で、入力した金利による純粋な返済スケジュールを計算します。最終的な支払額は貸し手の承認書類をご確認ください。",
        },
      ],
    },
    es: {
      name: "Calculadora de cuota (EMI)",
      tagline: "Calcule la cuota mensual fija de cualquier préstamo: introduce capital, tipo y plazo y obtén al instante el interés total y la devolución total.",
      intro: [
        "Introduzca el importe del préstamo, el tipo de interés anual y el plazo en años o meses para obtener la cuota mensual (EMI) y el interés total que pagará durante toda la vida del préstamo. El cálculo usa la fórmula estándar de saldo decreciente que aplican bancos y financieras.",
        "Cualquier cambio recalcula todo al instante: compare un préstamo a 15 años con uno a 20, o vea exactamente lo que le cuesta al mes medio punto de interés extra.",
      ],
      steps: [
        "Escriba el importe del préstamo (capital).",
        "Introduzca el tipo anual y el plazo en años o meses.",
        "Lea la cuota mensual, el interés total y la devolución total.",
      ],
      faqs: [
        {
          q: "¿Qué fórmula usa la calculadora de EMI?",
          a: "La fórmula estándar de saldo decreciente: EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), donde P es el capital, r el tipo mensual (anual ÷ 12 ÷ 100) y n el número de meses. Es la misma ecuación que usan los bancos para hipotecas, coches y préstamos personales.",
        },
        {
          q: "¿Por qué el interés es tan alto al principio del préstamo?",
          a: "Cada mes el interés se calcula sobre el saldo pendiente, que es máximo al inicio. Las cuotas iniciales son casi todo interés; la proporción se invierte conforme el saldo baja. Amortizar pronto ahorra mucho más interés que amortizar tarde.",
        },
        {
          q: "¿Incluye la cuota comisiones y seguros?",
          a: "No. Las comisiones de apertura, los seguros y las revisiones de tipos variables quedan fuera: el resultado es la cuota de amortización pura para el tipo introducido. El importe final figura en la oferta vinculante del prestamista.",
        },
      ],
    },
    pt: {
      name: "Calculadora de parcela (EMI)",
      tagline: "Calcule a parcela mensal fixa de qualquer empréstimo — informe valor, taxa e prazo e veja na hora o total de juros e o total pago.",
      intro: [
        "Informe o valor do empréstimo, a taxa de juros anual e o prazo em anos ou meses para obter a parcela mensal (EMI) e o total de juros que você pagará na vida do contrato. O cálculo usa a fórmula padrão de saldo decrescente adotada por bancos e financeiras.",
        "Qualquer ajuste recalcula tudo ao vivo: compare um empréstimo de 15 anos com um de 20, ou veja exatamente o que meio ponto percentual a mais custa por mês.",
      ],
      steps: [
        "Digite o valor do empréstimo (principal).",
        "Informe a taxa anual e o prazo em anos ou meses.",
        "Veja a parcela mensal, o total de juros e o total pago.",
      ],
      faqs: [
        {
          q: "Qual fórmula a calculadora de EMI usa?",
          a: "A fórmula padrão de saldo decrescente: EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), onde P é o principal, r a taxa mensal (anual ÷ 12 ÷ 100) e n o número de meses. É a mesma equação dos bancos para financiamento imobiliário, de veículo e empréstimo pessoal.",
        },
        {
          q: "Por que os juros são tão altos no início do contrato?",
          a: "O juro mensal incide sobre o saldo devedor, que é maior no começo. As parcelas iniciais são quase todo juros; a proporção se inverte conforme o saldo cai. Por isso amortizar cedo economiza muito mais juros do que amortizar tarde.",
        },
        {
          q: "A parcela inclui tarifas e seguros?",
          a: "Não. Tarifas de abertura, seguros e revisões de taxa variável ficam de fora — o resultado é a parcela pura de amortização para a taxa informada. O valor final está na carta de aprovação do credor.",
        },
      ],
    },
  },
});
