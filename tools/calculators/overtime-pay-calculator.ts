import { CalcEngineOvertime } from "../_engines/calc-engine-overtime";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "overtime-pay-calculator",
  category: "utility",
  icon: "clock",
  engine: { component: CalcEngineOvertime },
  related: ["salary-to-hourly", "hourly-to-salary", "break-even-calculator", "compound-interest-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Overtime Pay Calculator",
      tagline:
        "Work out overtime pay at 1.5× or 2× your hourly rate — regular pay, the overtime premium, your weekly total and an annualized figure from a salary.",
      intro: [
        "Enter an hourly rate — or an annual salary that the calculator converts into one using your regular weekly hours — then add the overtime hours you expect to work. The results separate regular pay from the overtime premium: time and a half by default, double time if your contract or local rules pay it.",
        "Everything updates live: the boosted overtime rate, the week's regular and overtime pay, the combined weekly total, and the annualized figure once you multiply by the weeks per year you actually work. It mirrors how the US Fair Labor Standards Act (FLSA) computes overtime for non-exempt employees.",
        "Under the FLSA, non-exempt employees earn at least 1.5× their regular rate for hours past 40 in a workweek; the regular rate must include most nondiscretionary bonuses, and state laws such as California's add daily overtime past 8 hours and double time past 12. The calculator applies the multiplier you choose to the hours you enter.",
        "Compared with a payslip's opaque totals, the split between regular and overtime pay shows exactly what the premium is worth — and what a denied hour of overtime costs you. Whether a role is exempt depends on duties and salary level, not job title. If your paychecks disagree with this math, raise it with your employer or your state labor department.",
      ],
      steps: [
        "Enter your hourly rate, or switch to salary mode and type your annual pay.",
        "Set your regular hours per week (40 by default) and weeks per year.",
        "Add the overtime hours and pick the multiplier — 1.5× or 2×.",
        "Read the overtime rate, weekly split and the annualized total.",
      ],
      faqs: [
        {
          q: "When is overtime pay required in the US?",
          a: "Under the FLSA, non-exempt employees must earn at least 1.5 times their regular rate for every hour worked beyond 40 in a work week. Exemption depends on duties and salary level; some states go further, for example California also triggers daily overtime past 8 hours. A 25.00 hourly rate earns 37.50 for each overtime hour.",
        },
        {
          q: "How does salary mode turn my salary into an hourly rate?",
          a: "It divides the annual salary by regular hours per week × weeks per year — the same baseline as the salary-to-hourly conversion. A 52,000 salary over 40-hour weeks and 52 weeks is exactly 25.00 per hour, so five overtime hours at 1.5× add 187.50 on top of the 1,000.00 regular week.",
        },
        {
          q: "Is my whole salary used for the overtime rate?",
          a: "The FLSA computes overtime on the 'regular rate', which can include more than your base wage — shift differentials and non-discretionary bonuses are examples. This calculator uses a straight base rate, so if you receive those extras your legal overtime rate may be higher than the one shown here.",
        },
      ],
    },
    zh: {
      name: "加班费计算器",
      tagline:
        "按时薪的 1.5 倍或 2 倍算加班费:常规工资、加班溢价、每周合计与年化收入一目了然,也支持年薪按工时折算成时薪后计算。",
      intro: [
        "输入时薪,或输入年薪由计算器按你每周的常规工时折算,再填上预计加班的小时数。结果会把常规工资和加班溢价分开:默认 1.5 倍,如果合同或当地规则按双倍支付,也可以选 2 倍。",
        "所有数字实时更新:加班后的时薪、当周的常规工资与加班费、每周总收入,以及乘以每年工作周数后的年化收入。口径与美国《公平劳动标准法》(FLSA)对非豁免员工的加班计算一致。",
      ],
      steps: [
        "输入时薪,或切换到年薪模式填写年薪。",
        "设置每周常规工时(默认 40)和每年工作周数。",
        "填入加班小时数,并选择倍率——1.5 倍或 2 倍。",
        "查看加班时薪、每周拆分和年化总额。",
      ],
      faqs: [
        {
          q: "美国什么时候必须支付加班费?",
          a: "根据 FLSA,非豁免员工每周工作超过 40 小时的部分,加班时薪不得低于常规时薪的 1.5 倍。是否豁免取决于岗位职责和薪资水平;部分州更严格,例如加州每天超过 8 小时也要算加班。时薪 25.00 的员工,每个加班小时至少挣 37.50。",
        },
        {
          q: "年薪模式下时薪是怎么折算的?",
          a: "时薪 = 年薪 ÷(每周常规工时 × 每年周数),与年薪转时薪的基准一致。年薪 52,000 按每周 40 小时、52 周折算正好是 25.00,因此 5 个 1.5 倍的加班小时会在 1,000.00 的常规周薪之上再加 187.50。",
        },
        {
          q: "加班时薪是按全部工资算吗?",
          a: "FLSA 的加班基数是「常规时薪」,范围可能超出基本工资——比如班次津贴和非自由裁量的奖金都要计入。本计算器只用基本时薪,如果你有这类补贴,法定加班时薪可能比这里显示的更高。",
        },
      ],
    },
    ja: {
      name: "残業代計算ツール",
      tagline:
        "時給の 1.5 倍・2 倍で残業代を算出。通常給与と割増賃金を分けて、週の合計と年換算まで表示します。年収を勤務時間から時給に換算するモードにも対応。",
      intro: [
        "時給を入力するか、年収を通常の週労働時間から時給に換算して、予定している残業時間を追加します。結果は通常給与と割増賃金に分けて表示され、既定は 1.5 倍、契約や地域のルールで倍額が払われる場合は 2 倍も選べます。",
        "割増後の残業時給、週の通常給与と残業代、週の合計、年間勤務週数を掛けた年換算収入がリアルタイムに更新されます。米国公正労働基準法(FLSA)の非免除従業員向けの残業計算と同じ考え方です。",
      ],
      steps: [
        "時給を入力するか、年収モードに切り替えて年収を入力します。",
        "週の通常労働時間(既定 40)と年間週数を設定します。",
        "残業時間を入力し、倍率(1.5 倍または 2 倍)を選びます。",
        "残業時給・週ごとの内訳・年換算の合計を確認します。",
      ],
      faqs: [
        {
          q: "アメリカで残業代の支払い義務があるのはいつですか?",
          a: "FLSA では、非免除従業員が週 40 時間を超えて働いた分に、通常時給の 1.5 倍以上を支払う義務があります。免除されるかは職務内容と給与水準によります。さらに厳しい州もあり、たとえばカリフォルニアでは 1 日 8 時間超でも残業扱いになります。時給 25.00 なら残業 1 時間あたり 37.50 以上です。",
        },
        {
          q: "年収モードで時給はどのように計算しますか?",
          a: "時給 = 年収 ÷(通常の週労働時間 × 年間週数)で、年収から時給への換算と同じ基準です。年収 52,000 を週 40 時間 × 52 週で割るとちょうど 25.00 になり、1.5 倍の残業 5 時間で通常週給 1,000.00 に 187.50 が上乗せされます。",
        },
        {
          q: "残業時給の計算には給与の全額が使われますか?",
          a: "FLSA の残業計算は「通常レート」が対象で、基本給だけでなくシフト手当や業績賞与なども含む場合があります。このツールは基本の時給だけで計算するので、そうした手当がある方は法定の残業レートが表示値より高くなる可能性があります。",
        },
      ],
    },
    es: {
      name: "Calculadora de horas extra",
      tagline:
        "Calcule el pago de horas extra al 1,5× o 2× de su tarifa horaria — paga regular, el plus de horas extra, su total semanal y una cifra anualizada desde el salario.",
      intro: [
        "Introduzca una tarifa por hora — o un salario anual que la calculadora convierte usando sus horas semanales regulares — y añada las horas extra que espera trabajar. Los resultados separan la paga regular del plus de horas extra: hora y media por defecto, o tiempo doble si su contrato o las normas locales lo pagan.",
        "Todo se actualiza en vivo: la tarifa de horas extra elevada, la paga regular y extra de la semana, el total semanal combinado y la cifra anualizada al multiplicar por las semanas que trabaja al año. Refleja cómo la Fair Labor Standards Act (FLSA) de EE. UU. calcula las horas extra del personal no exento.",
      ],
      steps: [
        "Escriba su tarifa por hora, o pase al modo salario e indique su paga anual.",
        "Fije sus horas regulares por semana (40 por defecto) y las semanas por año.",
        "Añada las horas extra y elija el multiplicador — 1,5× o 2×.",
        "Lea la tarifa de horas extra, el desglose semanal y el total anualizado.",
      ],
      faqs: [
        {
          q: "¿Cuándo se deben pagar horas extra en EE. UU.?",
          a: "Según la FLSA, los empleados no exentos deben cobrar al menos 1,5 veces su tarifa regular por cada hora que exceda las 40 de la semana laboral. La exención depende de las funciones y el nivel salarial; algunos estados van más lejos, como California, que también activa horas extra diarias pasadas las 8 horas. Con una tarifa de 25,00, cada hora extra paga al menos 37,50.",
        },
        {
          q: "¿Cómo convierte el modo salario en tarifa horaria?",
          a: "Divide el salario anual entre horas regulares por semana × semanas por año, la misma base que la conversión de salario a hora. Un salario de 52.000 con semanas de 40 horas y 52 semanas es exactamente 25,00 por hora, así que cinco horas extra al 1,5× añaden 187,50 sobre la semana regular de 1.000,00.",
        },
        {
          q: "¿Se usa todo el salario para la tarifa de horas extra?",
          a: "La FLSA calcula las horas extra sobre la «tarifa regular», que puede incluir más que el salario base: por ejemplo, los diferenciales por turno y las primas discrecionales no exentas. Esta calculadora usa solo la tarifa base, así que si recibe esos extras su tarifa legal de horas extra puede ser mayor que la que aquí se muestra.",
        },
      ],
    },
    pt: {
      name: "Calculadora de horas extras",
      tagline:
        "Calcule o pagamento de horas extras a 1,5× ou 2× do seu valor por hora — pagamento regular, o adicional de horas extras, o total semanal e um valor anualizado pelo salário.",
      intro: [
        "Informe um valor por hora — ou um salário anual que a calculadora converte usando suas horas semanais regulares — e adicione as horas extras que você espera fazer. Os resultados separam o pagamento regular do adicional de horas extras: hora e meia por padrão, ou o dobro se o contrato ou as regras locais pagarem assim.",
        "Tudo atualiza ao vivo: o valor da hora extra majorado, o pagamento semanal regular e extra, o total semanal somado e o valor anualizado ao multiplicar pelas semanas trabalhadas no ano. Espelha como a Fair Labor Standards Act (FLSA) dos EUA calcula horas extras para empregados não isentos.",
      ],
      steps: [
        "Digite o valor por hora, ou mude para o modo salário e informe o pagamento anual.",
        "Defina as horas regulares por semana (40 por padrão) e as semanas por ano.",
        "Adicione as horas extras e escolha o multiplicador — 1,5× ou 2×.",
        "Veja o valor da hora extra, a divisão semanal e o total anualizado.",
      ],
      faqs: [
        {
          q: "Quando o pagamento de horas extras é obrigatório nos EUA?",
          a: "Pela FLSA, empregados não isentos devem receber pelo menos 1,5 vez seu valor normal por cada hora que passar de 40 na semana de trabalho. A isenção depende das funções e do nível salarial; alguns estados vão além — a Califórnia, por exemplo, também conta horas extras diárias depois das 8 horas. Com um valor de 25,00, cada hora extra paga no mínimo 37,50.",
        },
        {
          q: "Como o modo salário converte o salário em valor por hora?",
          a: "Ele divide o salário anual por horas regulares por semana × semanas por ano — a mesma base da conversão de salário para hora. Um salário de 52.000 em semanas de 40 horas e 52 semanas dá exatamente 25,00 por hora, então cinco horas extras a 1,5× somam 187,50 sobre a semana regular de 1.000,00.",
        },
        {
          q: "O salário inteiro entra no valor da hora extra?",
          a: "A FLSA calcula horas extras sobre a «taxa normal», que pode incluir mais que o salário base — por exemplo, adicionais de turno e bônus não discricionários. Esta calculadora usa só o valor base, então se você recebe esses extras, sua taxa legal de horas extras pode ser maior que a mostrada aqui.",
        },
      ],
    },
  },
});
