import { CalcEngineLoan } from "../_engines/calc-engine-loan";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "loan-calculator",
  category: "utility",
  icon: "layers",
  engine: { component: CalcEngineLoan, props: { kind: "loan" } },
  related: ["emi-calculator", "percentage-calculator", "gst-calculator", "discount-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Loan Calculator",
      tagline: "See the full picture of a loan: monthly payment, total interest and a year-by-year amortization table showing principal and interest splits.",
      intro: [
        "Everything the EMI view gives you — monthly payment, total interest, total repayment — plus a yearly amortization schedule that shows exactly how much of each year's payments is interest and how much is principal, and what balance remains at the end of every year.",
        "It is the fastest way to understand why extra payments in the early years are so valuable: the table makes the interest-heavy years impossible to miss.",
      ],
      steps: [
        "Enter the loan amount, annual rate and tenure in years or months.",
        "Read the monthly payment, total interest and total repayment.",
        "Scroll through the yearly table to see principal, interest and remaining balance per year.",
      ],
      faqs: [
        {
          q: "What is an amortization schedule?",
          a: "A period-by-period breakdown of a fixed-payment loan. Each payment is split into the interest owed on the current balance and the principal it retires, and the balance shrinks every month. The table here groups those months into years.",
        },
        {
          q: "How can I pay less total interest?",
          a: "Three levers: a shorter tenure, a lower rate, or extra principal payments — especially in the first third of the loan when balances are highest. The yearly table shows precisely where the interest concentrates.",
        },
        {
          q: "Does the schedule assume the rate never changes?",
          a: "Yes. It models a fixed-rate loan for the rate you enter. For floating-rate products, recalculate whenever the benchmark resets — each reset changes both the payment and the schedule.",
        },
      ],
    },
    zh: {
      name: "贷款计算器",
      tagline: "完整呈现一笔贷款:月供、总利息,以及逐年摊销表——每年还了多少本金、付了多少利息、还剩多少余额,一目了然。",
      intro: [
        "包含月供视角的全部信息——月供、总利息、还款总额——外加一张年度摊销计划表,逐年列出利息与本金的拆分以及年末剩余本金。",
        "这也是理解“为什么前几年提前还款最划算”的最快方式:利息集中在哪几年,表格一眼可见。",
      ],
      steps: [
        "输入贷款金额、年利率和期限(年或月)。",
        "查看月供、总利息和还款总额。",
        "翻看逐年表格,了解每年的本金、利息与剩余余额。",
      ],
      faqs: [
        {
          q: "什么是摊销计划表?",
          a: "按期拆解固定月供贷款的表格。每期还款分成“当期余额产生的利息”和“归还的本金”两部分,余额逐月下降。这里的表格把 12 个月合并成一年展示。",
        },
        {
          q: "怎样才能少付总利息?",
          a: "三个办法:缩短期限、降低利率,或额外归还本金——尤其是贷款前三分之一阶段,那时余额最高。逐年表格能精确显示利息集中在哪些年份。",
        },
        {
          q: "计划表假设利率一直不变吗?",
          a: "是的。它按你输入的利率模拟固定利率贷款。如果是浮动利率产品,基准利率每次重置后都应重新计算——每次重置都会改变月供和计划表。",
        },
      ],
    },
    ja: {
      name: "ローン計算(年次返済表つき)",
      tagline: "ローンの全体像を表示:毎月の返済額・総利息に加え、元本と利息の内訳がわかる年次返済表付き。",
      intro: [
        "毎月の返済額・総利息・返済総額に加えて、各年の支払いが利息と元本のどちらにいくら充てられ、年末に残高がいくら残るかを示す年次返済スケジュールまで表示します。",
        "返済初期の繰り上げ返済がなぜお得なのかが最も早く理解できるツールです。利息が集中する年が表からひと目で読み取れます。",
      ],
      steps: [
        "借入額・年利・期間(年またはか月)を入力します。",
        "毎月の返済額・総利息・返済総額を確認します。",
        "年次表をたどって、各年の元本・利息・残高を確認します。",
      ],
      faqs: [
        {
          q: "返済スケジュール(償還表)とは何ですか?",
          a: "一定額返済ローンを期間ごとに分解した表です。各返済は「現在残高への利息」と「返済される元本」に分かれ、残高は毎月減っていきます。ここでは 12 か月を 1 年にまとめて表示します。",
        },
        {
          q: "総利息を減らすには?",
          a: "3 つの方法があります。期間を短くする、金利を下げる、または元本を上乗せして返済する——特に残高が大きい返済初期の 3 分の 1 が効果的です。年次表で利息の集中箇所を正確に確認できます。",
        },
        {
          q: "スケジュールは金利固定を前提にしていますか?",
          a: "はい。入力した金利での固定金利ローンを想定しています。変動金利の場合は、基準金利が変わるたびに再計算してください。変更のたびに返済額とスケジュールの両方が変わります。",
        },
      ],
    },
    es: {
      name: "Calculadora de préstamos",
      tagline: "Vea el préstamo completo: cuota mensual, interés total y una tabla de amortización anual con el reparto entre capital e intereses.",
      intro: [
        "Todo lo que ofrece la vista de cuota — pago mensual, interés total, devolución total — más un calendario de amortización anual que muestra cuánto de cada año va a intereses y cuánto a capital, y qué saldo queda al cierre de cada año.",
        "Es la forma más rápida de entender por qué amortizar en los primeros años resulta tan ventajoso: la tabla hace imposibles de pasar por alto los años cargados de interés.",
      ],
      steps: [
        "Introduzca el importe, el tipo anual y el plazo en años o meses.",
        "Lea la cuota mensual, el interés total y la devolución total.",
        "Recorra la tabla anual para ver capital, intereses y saldo pendiente por año.",
      ],
      faqs: [
        {
          q: "¿Qué es una tabla de amortización?",
          a: "El desglose periodo a periodo de un préstamo de cuota fija. Cada cuota se reparte entre el interés que genera el saldo vigente y el capital que amortiza, y el saldo baja cada mes. Esta tabla agrupa esos meses en años.",
        },
        {
          q: "¿Cómo pago menos intereses en total?",
          a: "Tres palancas: un plazo más corto, un tipo más bajo o amortizaciones extra de capital — sobre todo en el primer tercio del préstamo, cuando el saldo es mayor. La tabla anual muestra con precisión dónde se concentra el interés.",
        },
        {
          q: "¿La tabla asume que el tipo no cambia?",
          a: "Sí. Modela un préstamo a tipo fijo para el tipo introducido. En productos a tipo variable, vuelva a calcular cada vez que se revise el índice: cada revisión cambia tanto la cuota como el calendario.",
        },
      ],
    },
    pt: {
      name: "Calculadora de empréstimo",
      tagline: "Veja o empréstimo inteiro: parcela mensal, total de juros e uma tabela de amortização anual com a divisão entre principal e juros.",
      intro: [
        "Tudo o que a visão de parcela oferece — pagamento mensal, total de juros, total pago — mais um cronograma de amortização anual mostrando quanto de cada ano vai para juros e para principal, e qual saldo resta no fim de cada ano.",
        "É o jeito mais rápido de entender por que amortizar nos primeiros anos vale tanto: a tabela deixa impossível ignorar os anos em que os juros dominam.",
      ],
      steps: [
        "Informe o valor, a taxa anual e o prazo em anos ou meses.",
        "Veja a parcela mensal, o total de juros e o total pago.",
        "Percorra a tabela anual para ver principal, juros e saldo devedor por ano.",
      ],
      faqs: [
        {
          q: "O que é um cronograma de amortização?",
          a: "A divisão período a período de um empréstimo de parcela fixa. Cada parcela se separa em juros sobre o saldo vigente e principal que ele amortiza, e o saldo cai todo mês. Aqui os meses são agrupados em anos.",
        },
        {
          q: "Como pago menos juros no total?",
          a: "Três alavancas: prazo menor, taxa menor ou amortizações extraordinárias de principal — sobretudo no primeiro terço do contrato, quando o saldo é maior. A tabela anual mostra exatamente onde o juro se concentra.",
        },
        {
          q: "O cronograma presume taxa fixa?",
          a: "Sim. Ele modela um empréstimo a taxa fixa para a taxa informada. Em produtos com taxa variável, recalcule sempre que o indexador mudar — cada mudança altera a parcela e o cronograma.",
        },
      ],
    },
  },
});
