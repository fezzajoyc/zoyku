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
      ],
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
    },
  },
});
