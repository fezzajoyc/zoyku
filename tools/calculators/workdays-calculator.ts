import { CalcEngineWorkdays } from "../_engines/calc-engine-workdays";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "workdays-calculator",
  category: "utility",
  icon: "check",
  engine: { component: CalcEngineWorkdays },
  related: ["date-calculator", "age-calculator", "timestamp-converter", "timezone-converter", "body-fat-calculator", "tip-calculator", "cooking-conversion", "calorie-calculator", "aspect-ratio-calculator", "bmr-calculator"],
  copy: {
    en: {
      name: "Business Days Calculator",
      tagline: "Count business days between two dates or add and subtract workdays from any date — with your own weekend definition and a custom holiday list.",
      intro: [
        "Contract deadlines, lead times, and SLA clocks usually run on business days, not calendar days. Count the working days between two dates (both endpoints included: Monday to Friday is 5), or walk N workdays forward or backward from a base date and see the exact landing date with its weekday.",
        "Paste your own holiday list — one YYYY-MM-DD per line — to exclude company closures and public holidays, and switch the weekend definition if your week rests on Friday and Saturday instead of Saturday and Sunday. All date math runs on UTC day numbers, so daylight-saving transitions never shift a result by a day.",
      ],
      steps: [
        "Choose Business days between, or Add / subtract workdays.",
        "Enter the two dates, or a base date and how many workdays to move.",
        "Optionally set the weekend days and paste holiday dates, one YYYY-MM-DD per line.",
        "Read the count with its breakdown, or the resulting date with its weekday.",
      ],
      faqs: [
        {
          q: "Are the endpoint dates counted?",
          a: "Yes — the between-count is inclusive of both ends, so Mon 2026-11-02 through Fri 2026-11-06 is 5 business days, and a Friday-to-Monday span is 2. For the add/subtract mode the start date itself is not consumed: Friday + 1 workday lands on Monday, and Saturday + 1 also lands on Monday.",
        },
        {
          q: "How do I enter holidays?",
          a: "One date per line in YYYY-MM-DD format, for example 2026-11-26 for US Thanksgiving. Invalid lines are ignored rather than breaking the count, duplicates are harmless, and a holiday that falls on your weekend day simply changes nothing — it was already excluded.",
        },
        {
          q: "Why does the tool mention UTC and daylight saving?",
          a: "Date arithmetic done in local time can drift a day around DST transitions — a range that crosses the November or March change can come out one day short or long in some browsers. Counting in whole UTC days sidesteps the problem entirely, so a Friday-to-Monday span is 2 workdays everywhere on Earth.",
        },
      ],
    },
    zh: {
      name: "工作日计算器",
      tagline: "统计两个日期之间的工作日,或从任意日期加减 N 个工作日并给出落点——支持自定义周末定义与粘贴自己的节假日清单。",
      intro: [
        "合同期限、交货周期、SLA 时钟通常按工作日而非日历日计算。本工具可以统计两个日期之间的工作日数(两端都计入:周一到周五是 5 天),也可以从基准日期向前或向后走 N 个工作日,给出落点日期和星期。",
        "可以粘贴自己的节假日清单(每行一个 YYYY-MM-DD)来扣除放假安排;如果你们的双休是周五和周六,还可以切换周末定义。所有日期运算都基于 UTC 整数天数,夏令时切换不会让结果偏移一天。",
      ],
      steps: [
        "选择“区间工作日”或“加减工作日”。",
        "输入两个日期,或基准日期与要移动的工作日数。",
        "按需设置周末,并逐行粘贴节假日(格式 YYYY-MM-DD)。",
        "查看带明细的工作日数,或带星期的结果日期。",
      ],
      faqs: [
        {
          q: "两端日期算不算?",
          a: "算——区间统计两端都含:2026-11-02(周一)到 2026-11-06(周五)是 5 个工作日,周五到周一的跨度是 2 天。加减模式下起点本身不消耗:周五加 1 个工作日落在下周一,周六加 1 个同样落在下周一。",
        },
        {
          q: "节假日怎么输入?",
          a: "每行一个日期,格式 YYYY-MM-DD,例如 2026-11-26(2026 年感恩节)。非法行会被忽略而不是报错,重复也无所谓;落在周末上的节假日不会改变结果——它本来就被排除了。",
        },
        {
          q: "为什么工具要提 UTC 和夏令时?",
          a: "用本地时间做日期运算,在夏令时切换附近可能偏差一天——跨 11 月或 3 月调整日的区间在某些浏览器里会差一天。按完整的 UTC 天数计数则完全绕开这个问题:周五到周一是 2 个工作日,这在地球上任何时区都成立。",
        },
      ],
    },
    ja: {
      name: "営業日計算",
      tagline: "2 つの日付間の営業日を数える、または基準日から営業日を加減算。週末の定義と独自の祝日リスト(1 行に 1 つ)にも対応します。",
      intro: [
        "契約期限・リードタイム・SLA は暦日ではなく営業日で数えるのが普通です。2 つの日付の間の営業日数(両端を含む:月曜〜金曜は 5 日)を数えたり、基準日から N 営業日前後した日付とその曜日を求めたりできます。",
        "独自の祝日リスト(1 行に 1 つの YYYY-MM-DD)を貼り付けて会社の休業日や祝日を除外でき、土日が金・土の地域向けに週末の定義も切り替えられます。日付演算は UTC の整数日数で行うため、サマータイムの切替前後でも結果が 1 日ずれることはありません。",
      ],
      steps: [
        "「営業日数を数える」か「営業日の加減」を選びます。",
        "2 つの日付、または基準日と移動する営業日数を入力します。",
        "必要に応じて週末を設定し、祝日を 1 行に 1 つずつ(YYYY-MM-DD)貼り付けます。",
        "内訳付きの営業日数、または曜日付きの結果日付を確認します。",
      ],
      faqs: [
        {
          q: "両端の日付は数えますか?",
          a: "数えます。両端を含むので 2026-11-02(月)〜2026-11-06(金)は 5 営業日、金曜から月曜の span は 2 日です。加減モードでは開始日自体は消費しません。金曜 + 1 営業日は月曜、土曜 + 1 営業日も月曜になります。",
        },
        {
          q: "祝日はどう入力しますか?",
          a: "YYYY-MM-DD 形式で 1 行に 1 つずつです。例:2026 年の感謝祭なら 2026-11-26。不正な行はカウントを壊さず無視され、重複も問題ありません。週末に当たる祝日はすでに除外済みなので結果は変わりません。",
        },
        {
          q: "なぜ UTC とサマータイムに言及するのですか?",
          a: "ローカル時刻での日付演算は DST 切替の前後で 1 日ずれることがあります。11 月や 3 月の切替日をまたぐ範囲は、ブラウザによって 1 日短く(長く)出る可能性があります。UTC の整数日数で数えればこの問題を完全に回避でき、金曜〜月曜は地球上のどこでも 2 営業日です。",
        },
      ],
    },
    es: {
      name: "Calculadora de días hábiles",
      tagline: "Cuenta los días hábiles entre dos fechas o suma y resta días hábiles desde cualquier fecha, con su propia definición de fin de semana y lista de festivos.",
      intro: [
        "Los plazos de contrato, los lead times y los relojes de SLA suelen contar días hábiles, no de calendario. Cuente los días laborables entre dos fechas (ambos extremos incluidos: de lunes a viernes son 5), o avance y retroceda N días hábiles desde una fecha base y vea la fecha exacta con su día de la semana.",
        "Pegue su propia lista de festivos — un AAAA-MM-DD por línea — para descontar cierres y días festivos, y cambie la definición de fin de semana si su semana descansa en viernes y sábado. Toda la aritmética corre sobre números de días UTC, así que los cambios de horario de verano nunca desplazan un resultado.",
      ],
      steps: [
        "Elija Días hábiles entre fechas, o Sumar / restar días hábiles.",
        "Introduzca las dos fechas, o la fecha base y cuántos días hábiles mover.",
        "Opcionalmente defina el fin de semana y pegue los festivos, un AAAA-MM-DD por línea.",
        "Lea el recuento con su desglose, o la fecha resultante con su día de la semana.",
      ],
      faqs: [
        {
          q: "¿Las fechas extremas cuentan?",
          a: "Sí: el recuento incluye ambos extremos, así que del lunes 2026-11-02 al viernes 2026-11-06 hay 5 días hábiles, y de viernes a lunes son 2. En el modo de suma y resta la fecha inicial no se consume: viernes + 1 día hábil cae en lunes, y sábado + 1 también cae en lunes.",
        },
        {
          q: "¿Cómo introduzco los festivos?",
          a: "Una fecha por línea en formato AAAA-MM-DD, por ejemplo 2026-11-26 para el Día de Acción de Gracias. Las líneas inválidas se ignoran sin romper el recuento, los duplicados no molestan, y un festivo que caiga en su fin de semana no cambia nada: ya estaba excluido.",
        },
        {
          q: "¿Por qué menciona UTC y el horario de verano?",
          a: "La aritmética en hora local puede desviarse un día alrededor de los cambios de horario: un rango que cruza el ajuste de noviembre o marzo puede salir con un día de menos o de más según el navegador. Contar en días UTC completos evita el problema por completo: de viernes a lunes son 2 días hábiles en cualquier zona del mundo.",
        },
      ],
    },
    pt: {
      name: "Calculadora de dias úteis",
      tagline: "Conte dias úteis entre duas datas ou some e subtraia dias úteis a partir de qualquer data, com sua própria definição de fim de semana e lista de feriados.",
      intro: [
        "Prazos contratuais, lead times e relógios de SLA normalmente correm em dias úteis, não corridos. Conte os dias úteis entre duas datas (extremos incluídos: de segunda a sexta são 5), ou avance e recue N dias úteis a partir de uma data base e veja a data exata com o dia da semana.",
        "Cole sua própria lista de feriados — um AAAA-MM-DD por linha — para descontar recesso e feriados públicos, e troque a definição de fim de semana se sua semana descansa na sexta e no sábado. Toda a aritmética roda sobre números de dias UTC, então as transições de horário de verão nunca deslocam um resultado.",
      ],
      steps: [
        "Escolha Dias úteis entre datas, ou Somar / subtrair dias úteis.",
        "Informe as duas datas, ou a data base e quantos dias úteis avançar.",
        "Se quiser, defina o fim de semana e cole os feriados, um AAAA-MM-DD por linha.",
        "Leia a contagem com o detalhamento, ou a data resultante com o dia da semana.",
      ],
      faqs: [
        {
          q: "As datas das pontas contam?",
          a: "Sim: a contagem inclui as duas pontas, então de segunda 2026-11-02 a sexta 2026-11-06 são 5 dias úteis, e de sexta a segunda são 2. No modo de soma e subtração a data inicial não é consumida: sexta + 1 dia útil cai na segunda, e sábado + 1 também cai na segunda.",
        },
        {
          q: "Como informo os feriados?",
          a: "Uma data por linha no formato AAAA-MM-DD, por exemplo 2026-11-26 para o Thanksgiving. Linhas inválidas são ignoradas sem quebrar a contagem, duplicatas não atrapalham, e um feriado que caia no seu fim de semana não muda nada — já estava excluído.",
        },
        {
          q: "Por que a ferramenta fala em UTC e horário de verão?",
          a: "Aritmética em horário local pode desviar um dia perto das transições de horário de verão: um intervalo que cruza o ajuste de novembro ou março pode sair com um dia a menos ou a mais em alguns navegadores. Contar em dias UTC inteiros elimina o problema: de sexta a segunda são 2 dias úteis em qualquer fuso do planeta.",
        },
      ],
    },
  },
});
