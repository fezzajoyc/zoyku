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
        "The count walks the actual calendar, includes both endpoints, and skips the weekend definition you choose (Sat–Sun or Fri–Sat); holiday lines are matched exactly by date, so a holiday falling on a weekend removes nothing extra. All arithmetic runs on UTC day numbers, so DST transitions cannot shift a result by a day.",
        "Compared with counting on a calendar, paste-once holiday lists make the tool reusable for a whole company year, and the forward/backward mode answers deadline questions — what date is 10 business days after March 14? — with the landing weekday shown. Legal notice periods may count calendar days instead; check which convention your contract uses.",
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
      deepDive: [
        {
          heading: "What counts as a “business day” — and what does not",
          paragraphs: [
            "The honest answer is that business day is a convention, and conventions differ. This tool counts Monday-to-Friday (or Friday-to-Saturday if you switch the weekend setting) and nothing else by default: it does not carry any built-in public-holiday calendar, because holidays are set by country, by region and sometimes by year in ways no static list gets right. Instead you paste your own holiday lines, so the count is exactly the one your company or contract means.",
            "Two decisions change a count dramatically and are worth checking every time. First, endpoints: this count is inclusive of both dates, so Monday through Friday in one week is 5, not 3 — some systems count the gap strictly in between and would return 3. Second, whether the start date is consumed in the add/subtract mode: here it is not, so Friday plus one workday is Monday.",
            "If your contract or SLA says “business days” without defining them, the convention is usually local business days of the governing jurisdiction — which may have weekends other than Sat/Sun and holidays this tool has never heard of. The safe workflow: paste that jurisdiction's holiday list, count here, and put the resulting calendar date in writing.",
          ],
        },
        {
          heading: "How the count is actually computed",
          paragraphs: [
            "The between-mode walks the actual calendar day by day, marking each date as workday or not according to your weekend definition and your holiday lines. Because it walks real dates, the answer always matches what you would get by pointing at a calendar — and holiday lines are matched by exact date, so a holiday on a Saturday removes nothing extra, since that day was already excluded by the weekend rule.",
            "The add/subtract mode steps forward or backward one workday at a time, skipping non-workdays without consuming them. That is why Saturday plus one workday lands on Monday rather than Sunday: the rest days are passed over, not counted. Repeated queries are cheap — the arithmetic is a plain loop over UTC day numbers.",
            "Everything runs on UTC day numbers, which are immune to daylight-saving transitions. Local-time date math near the March or November change can drift a day in some environments; counting whole UTC days gives the same Friday-to-Monday-is-2 answer everywhere on Earth, in every season.",
          ],
        },
        {
          heading: "Where this tool fits, and privacy",
          paragraphs: [
            "Typical users: contract notice periods, build and shipping lead times, SLA response windows, payroll cutoffs and visa appointment queues. For anything recurring, save the holiday list once and reuse it all year — pasting ten or fifteen dates takes seconds and turns a guess into a defensible number.",
            "Compared with spreadsheet workday functions, the differences are transparency and control: spreadsheets hide which day got skipped and why, and many require loading a holiday table from another sheet. Here the inputs — weekend definition and holiday lines — are visible on the page, and the landing date plus weekday shows exactly where the count stopped.",
            "No holiday data is downloaded and no dates are uploaded: the counting runs in your browser and works offline. Contract timelines and staffing dates are business-sensitive by nature, which is one more reason the computation never leaves your device.",
          ],
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
          a: "用本地时间做日期运算,在夏令时切换附近可能偏差一天——跨 11 月或 3 月调整日的区间在某些浏览器里会差一天。按完整的 UTC 天数计数则完全绕开这个问题:周五到周一的跨度是 2 个工作日,这在地球上任何时区都成立。",
        },
      ],
      deepDive: [
        {
          heading: "什么才算“工作日”——什么不算",
          paragraphs: [
            "诚实的回答是:工作日是一种约定,而约定各不相同。本工具默认只数周一到周五(切换周末设置后则是周五到周六),别无其他:它不内置任何法定节假日表,因为节假日按国家、按地区、有时还按年而变,任何静态清单都不可能全对。替代方案是你自己粘贴节假日清单,数出来的就是你们公司或合同所指的那个数。",
            "两个决定会剧烈改变结果,每次都值得核对。第一是端点:本工具区间统计两端都含,同一周的周一到周五是 5 而不是 3——有些系统只数中间的间隔,会返回 3。第二是加减模式里起点日期是否被消耗:这里不被消耗,所以周五加一个工作日落在周一。",
            "如果合同或 SLA 只写“工作日”而不定义,惯例通常是管辖法域的当地工作日——那个地方的双休可能不是周六周日,节假日清单本工具也不曾听说过。稳妥的流程:粘贴该法域的节假日清单,在这里计数,再把得到的日历日期白纸黑字写进合同。",
          ],
        },
        {
          heading: "计数到底是怎么算的",
          paragraphs: [
            "区间模式逐日走真实日历,按你的周末定义和节假日清单把每个日期标记为工作日或不是。因为走的是真实日期,答案永远和你手指着日历数出来的一致;节假日按精确日期匹配,落在周六的节假日不会多扣任何东西——那天本来就被周末规则排除了。",
            "加减模式一次一个工作日地前进或后退,跳过非工作日且不消耗它们。所以周六加一个工作日落在周一而不是周日:休息日被跨过去,而不是被计入。重复查询很便宜——运算就是对 UTC 天数的一个普通循环。",
            "一切基于 UTC 天数,对夏令时切换免疫。3 月或 11 月拨钟日附近的本地时间日期运算在某些环境会漂移一天;按整 UTC 天计数,周五到周一等于 2 个工作日的答案在任何地方、任何季节都成立。",
          ],
        },
        {
          heading: "本工具的定位与隐私",
          paragraphs: [
            "典型用户:合同通知期、构建与发货交期、SLA 响应窗口、工资截止日、签证预约排队。对重复性需求,一年只需保存一次节假日清单,粘贴十几行日期只要几秒钟,就能把“大概”变成一个站得住的数字。",
            "和电子表格的工作日函数相比,差别在透明与可控:表格不告诉你哪天被跳过、为什么,不少表格还要先从另一张工作表载入节假日数据。这里的所有输入——周末定义与节假日清单——都摆在页面上,落点日期加星期明明白白显示计数停在哪。",
            "不下载任何节假日数据,也不上传任何日期:计数在浏览器里完成,离线可用。合同时间线与排班日期天然具有商业敏感性——计算不出设备,又多了一个理由。",
          ],
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
      deepDive: [
        {
          heading: "何が「営業日」で、何が違うのか",
          paragraphs: [
            "正直な答えは、営業日は約束事であり、約束事は人それぞれだ、です。このツールの既定は月曜〜金曜(週末設定を切り替えれば金曜〜土曜)だけを数えることで、それ以外は何も組み込みません。法定祝日のカレンダーは内蔵していません。祝日は国・地域・場合によっては年ごとに変わり、静的な一覧で正しくあり続けることはできないからです。代わりに自分の祝日行を貼り付けることで、会社や契約が指す通りの数が出ます。",
            "結果を大きく変える判断が 2 つあり、毎回確認する価値があります。第一に両端:このカウントは両端を含み、同じ週の月〜金は 5 です。3 とはなりません(間だけを数えるシステムなら 3 を返します)。第二に加減モードで開始日を消費するかどうか:ここでは消費しないので、金曜 + 1 営業日は月曜です。",
            "契約や SLA が「営業日」とだけ書いて定義しない場合、慣行上は準拠法域の現地営業日を指すのが普通です。その土地の週末は土日とは限らず、このツールが知らない祝日もあるでしょう。安全な手順は、その法域の祝日リストを貼ってここで数え、出てきた暦日を書面に残すことです。",
          ],
        },
        {
          heading: "カウントの実際の計算方法",
          paragraphs: [
            "間を数えるモードは実際の暦を 1 日ずつたどり、週末の定義と祝日行に従って各日を営業日かどうかで印を付けます。実際の日付をたどるので、答えは指差し確認のカレンダーと必ず一致します。祝日は日付の完全一致で照合するため、土曜に当たる祝日は何も削りません。その日は週末規則ですでに除外済みだからです。",
            "加減モードは 1 営業日ずつ前後に歩み、営業日でない日を消費せずに飛ばします。だから土曜 + 1 営業日の着地は日曜ではなく月曜です。休みの日を数えずに飛び越える、というのが規則だからです。繰り返しの問い合わせも安価で、実体は UTC 日番号の単純なループです。",
            "すべて UTC の日番号で動くため、サマータイム切替の影響を受けません。3 月や 11 月の変更日の近くではローカル時刻の日付演算が環境によって 1 日ずれることがありますが、UTC の丸ごと日数で数えれば、金曜〜月曜 = 2 営業日はいつでもどこでも同じです。",
          ],
        },
        {
          heading: "このツールの立ち位置とプライバシー",
          paragraphs: [
            "典型的な利用者:契約の通知期間、ビルドや出荷のリードタイム、SLA の応答時間、給与の締め日、ビザ面接の順番待ち。繰り返し使うなら祝日リストを年に一度保存して使い回すのが得策です。十数行の日付を貼るのは数秒の作業で、当てずっぽうを説明可能な数字に変えます。",
            "表計算の営業日関数との違いは透明性と制御です。スプレッドシートはどの曜日が飛ばされたのか、なぜなのかを見せず、多くは別シートから祝日表を読み込む必要があります。こちらは入力(週末の定義と祝日行)がすべてページ上にあり、着地日と曜日でカウントがどこで止まったかが明確です。",
            "祝日データのダウンロードも日付のアップロードもありません。計数はブラウザ内で完結し、オフラインで動きます。契約の時間軸や勤務日程はもともとビジネス上機微な情報です。計算が端末の外に出ないのは、そのためにも意味があります。",
          ],
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
      deepDive: [
        {
          heading: "Qué es un «día hábil» — y qué no",
          paragraphs: [
            "La respuesta honesta es que día hábil es una convención, y las convenciones difieren. Esta herramienta cuenta de lunes a viernes (o de viernes a sábado si cambia el ajuste de fin de semana) y nada más por defecto: no trae ningún calendario de festivos incorporado, porque los festivos dependen del país, de la región y a veces del año, de forma que ninguna lista estática lo clava. En su lugar usted pega sus propias líneas de festivos, y el recuento es exactamente el que su empresa o su contrato quiere decir.",
            "Dos decisiones cambian un recuento dramáticamente y conviene verificarlas siempre. Primero, los extremos: este recuento incluye ambas fechas, así que de lunes a viernes de una misma semana son 5, no 3 — algunos sistemas cuentan solo el hueco intermedio y devolverían 3. Segundo, si la fecha inicial se consume en el modo de suma y resta: aquí no se consume, de modo que viernes más un día hábil es lunes.",
            "Si su contrato o SLA dice «días hábiles» sin definirlos, la convención suele ser los días hábiles locales de la jurisdicción aplicable — cuyo fin de semana puede no ser sábado y domingo, y con festivos que esta herramienta jamás ha oído nombrar. El flujo seguro: pegue la lista de festivos de esa jurisdicción, cuente aquí y deje la fecha de calendario resultante por escrito.",
          ],
        },
        {
          heading: "Cómo se calcula el recuento de verdad",
          paragraphs: [
            "El modo entre fechas recorre el calendario real día a día, marcando cada fecha como hábil o no según su definición de fin de semana y sus líneas de festivos. Como camina fechas reales, la respuesta siempre coincide con lo que saldría señalando un calendario — y las líneas de festivos se cotejan por fecha exacta, así que un festivo en sábado no descuenta nada de más, porque ese día ya estaba excluido por la regla del fin de semana.",
            "El modo de suma y resta avanza o retrocede un día hábil cada vez, saltándose los días no hábiles sin consumirlos. Por eso sábado más un día hábil cae en lunes y no en domingo: los días de descanso se sobrevuelan, no se cuentan. Repetir consultas es barato — la aritmética es un bucle sencillo sobre números de día UTC.",
            "Todo corre sobre números de día UTC, inmunes a las transiciones de horario de verano. La matemática en hora local cerca del cambio de marzo o noviembre puede derivar un día en algunos entornos; contar días UTC completos da la misma respuesta de viernes-a-lunes-son-2 en cualquier lugar y en cualquier estación.",
          ],
        },
        {
          heading: "Dónde encaja esta herramienta, y privacidad",
          paragraphs: [
            "Usuarios típicos: plazos de notificación contractual, lead times de compilación y envío, ventanas de respuesta de SLA, cierres de nómina y colas de citas de visados. Para usos recurrentes, guarde la lista de festivos una vez y reutilícela todo el año — pegar una docena de fechas son segundos y convierte una suposición en un número defendible.",
            "Frente a las funciones de días hábiles de las hojas de cálculo, las diferencias son transparencia y control: las hojas no le dicen qué día se saltó ni por qué, y muchas exigen cargar la tabla de festivos desde otra hoja. Aquí las entradas — definición de fin de semana y líneas de festivos — están a la vista, y la fecha de destino con su día de la semana muestra exactamente dónde paró el recuento.",
            "No se descarga ningún dato de festivos ni se sube ninguna fecha: el recuento corre en su navegador y funciona sin conexión. Las líneas de tiempo de contratos y las fechas de personal son sensibles de por sí — una razón más para que el cálculo nunca salga de su dispositivo.",
          ],
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
      deepDive: [
        {
          heading: "O que conta como «dia útil» — e o que não conta",
          paragraphs: [
            "A resposta honesta é que dia útil é uma convenção, e convenções variam. Esta ferramenta conta de segunda a sexta (ou de sexta a sábado, se você trocar o ajuste de fim de semana) e nada mais por padrão: ela não traz nenhum calendário de feriados embutido, porque feriados dependem do país, da região e às vezes do ano, de um jeito que nenhuma lista estática acerta. Em vez disso, você cola suas próprias linhas de feriados, e a contagem é exatamente a que sua empresa ou seu contrato quer dizer.",
            "Duas decisões mudam uma contagem drasticamente e valem verificação a cada uso. Primeiro, as pontas: esta contagem inclui as duas datas, então de segunda a sexta de uma mesma semana são 5, não 3 — alguns sistemas contam só o vão do meio e devolveriam 3. Segundo, se a data inicial é consumida no modo de soma e subtração: aqui não é, então sexta mais um dia útil é segunda.",
            "Se seu contrato ou SLA diz «dias úteis» sem defini-los, a convenção costuma ser os dias úteis locais da jurisdição aplicável — cujo fim de semana pode não ser sábado e domingo, e com feriados que esta ferramenta jamais ouviu falar. O fluxo seguro: cole a lista de feriados dessa jurisdição, conte aqui e deixe a data de calendário resultante por escrito.",
          ],
        },
        {
          heading: "Como a contagem é calculada de verdade",
          paragraphs: [
            "O modo entre datas percorre o calendário real dia a dia, marcando cada data como útil ou não conforme sua definição de fim de semana e suas linhas de feriados. Como caminha em datas reais, a resposta sempre coincide com o que você obteria apontando para um calendário — e as linhas de feriados são casadas por data exata, então um feriado num sábado não desconta nada a mais, porque esse dia já estava excluído pela regra do fim de semana.",
            "O modo de soma e subtração avança ou recua um dia útil por vez, pulando os dias não úteis sem consumi-los. Por isso sábado mais um dia útil cai na segunda e não no domingo: os dias de descanso são sobrevoados, não contados. Repetir consultas é barato — a aritmética é um laço simples sobre números de dia UTC.",
            "Tudo roda sobre números de dia UTC, imunes às transições de horário de verão. Matemática em horário local perto da virada de março ou novembro pode derivar um dia em alguns ambientes; contar dias UTC inteiros dá a mesma resposta de sexta-a-segunda-são-2 em qualquer lugar e em qualquer estação.",
          ],
        },
        {
          heading: "Onde esta ferramenta se encaixa, e privacidade",
          paragraphs: [
            "Usuários típicos: prazos de notificação contratual, lead times de build e de envio, janelas de resposta de SLA, fechamentos de folha e filas de agendamento de visto. Para usos recorrentes, salve a lista de feriados uma vez e reutilize o ano todo — colar uma dúzia de datas leva segundos e transforma um palpite em um número defensável.",
            "Comparada com as funções de dias úteis de planilhas, a diferença é transparência e controle: as planilhas não dizem qual dia foi pulado nem por quê, e muitas exigem carregar a tabela de feriados de outra aba. Aqui as entradas — definição de fim de semana e linhas de feriados — ficam à vista na página, e a data de chegada com o dia da semana mostra exatamente onde a contagem parou.",
            "Nenhum dado de feriado é baixado e nenhuma data é enviada: a contagem roda no seu navegador e funciona offline. Linhas do tempo de contratos e datas de pessoal são sensíveis por natureza — mais uma razão para o cálculo nunca sair do seu aparelho.",
          ],
        },
      ],
    },
  },
});
