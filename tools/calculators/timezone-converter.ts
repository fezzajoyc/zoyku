import { CalcEngineTime } from "../_engines/calc-engine-time";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "timezone-converter",
  category: "utility",
  icon: "globe",
  engine: { component: CalcEngineTime, props: { kind: "timezone" } },
  related: ["timestamp-converter", "time-converter", "date-calculator", "age-calculator", "body-fat-calculator", "tip-calculator", "cooking-conversion", "calorie-calculator", "aspect-ratio-calculator", "bmr-calculator"],
  copy: {
    en: {
      name: "Time Zone Converter",
      tagline: "Compare times across 21 major cities with live clocks and an hour-by-hour table — DST handled exactly, everything runs in your browser.",
      intro: [
        "Pick any two cities from Los Angeles to Tokyo and see both live clocks side by side, the exact offset difference for today, and a 24-row comparison table showing what every hour of the day becomes in the other city — the fastest way to find a meeting slot across time zones.",
        "The conversion uses your browser's built-in IANA time zone database, so daylight-saving transitions land on the correct minute without any network call.",
        "Conversions run on the IANA time zone database shipped with your browser via the standard Intl API, so DST rules are as current as your browser — including half-hour offsets like India's +5:30 and rule changes such as Mexico's 2022 abolition of most DST. The 24-row table is generated for the date you select, not just today.",
        "Compared with subtracting offsets by hand, the table catches the trap that two cities 7 hours apart today can be 6 or 8 apart next week when DST flips on different dates. For recurring meetings, check the column around the switch dates. Everything is local and read-only — no network call, so the page works in airplane mode.",
      ],
      steps: [
        "Choose the starting city — its live local clock appears underneath.",
        "Choose the destination city; the clock and UTC offset update instantly.",
        "Scan the hour-by-hour table to find times that work for both sides.",
        "Use the swap button to flip the two cities.",
      ],
      faqs: [
        {
          q: "Does the converter handle daylight saving time?",
          a: "Yes. Offsets are computed with the browser's own IANA time zone rules for today's date, so a city currently on DST shows its correct shifted offset and the hour table reflects the real clocks on both sides.",
        },
        {
          q: "Why does the hour table show a different date in some rows?",
          a: "When cities are far apart, one side's calendar date changes during the day. Each row shows the destination's date next to the time so you can spot when, for example, 9:00 in Shanghai is still 21:00 the previous evening in New York.",
        },
        {
          q: "Does this tool need internet access?",
          a: "No. City times come from the time zone database built into your browser and your device clock — nothing is downloaded and no location is shared.",
        },
      ],
      deepDive: [
        {
          heading: "Why the IANA database matters",
          paragraphs: [
            "Time zones are not static offsets; they are rule sets that change over history. A city's offset has shifted with daylight saving laws, wartime policy and government decrees — sometimes retroactively. The IANA time zone database (the tz database) is the community-maintained record of these rules, with a zone identifier like America/New_York encoding not just an offset but the full history of when and how it changes.",
            "Your browser ships a copy of this database and exposes it through the standard Intl API, which is what this tool uses. That choice has two consequences: conversions need no network call — the page works in airplane mode — and the rules are only as current as your browser. Recent government changes appear when your browser updates its tzdata, not instantly.",
            "Using named zones instead of fixed offsets also avoids a category of bugs: “+5:30” describes India today, but “Asia/Kolkata” describes India across DST-free decades with its one-time historic shifts intact. Fixed-offset tables that circulate as cheat sheets drift out of date; a named zone cannot.",
          ],
        },
        {
          heading: "DST: the transitions that break naive math",
          paragraphs: [
            "Daylight saving is why you cannot simply subtract two offsets and trust the result. The offsets of two cities can be 7 hours today and 6 or 8 next week, because DST switches on different dates in different places — the US changes in March, Europe later in March, some southern-hemisphere countries switch around October. Even inside a single country, one region may observe DST while another does not.",
            "The transitions themselves have sharp edges: spring-forward jumps a wall clock an entire hour — schedules at 2:30 AM simply do not exist that day — and fall-back makes one hour occur twice, so \"1:30 AM\" is ambiguous without the zone. Countries have also abolished DST outright, as Mexico did for most of the country in 2022, which is why dated rules rather than constant offsets are the only safe encoding.",
            "For recurring meetings, the hour table earns its keep around those switch dates: check the same weekday across the week a transition happens and you will see the practical meeting time jump by an hour on one side only. That one glance prevents the classic recurring-invite drift that slowly walks a call from morning into evening.",
          ],
        },
        {
          heading: "Reading the table and staying private",
          paragraphs: [
            "The 24-row table is generated for the date you select, not just today — which matters because the meeting you are scheduling happens next month, possibly after a DST switch. Rows where the destination's date differs from the origin's are labeled explicitly: 9:00 Monday in Shanghai being 21:00 Sunday in New York is exactly the kind of detail a hand conversion drops.",
            "Half-hour and 45-minute offsets exist in the wild — India at +5:30, parts of Australia at +9:30, Nepal at +5:45 — so do not assume the difference between two cities is a whole number. The table reads the real rules, so odd offsets simply appear in the arithmetic.",
            "Everything is computed locally: the browser's Intl API and your device clock, no network request, no location sharing, no stored history. The tool is read-only by nature — it never changes your device's time zone — so it is safe to explore hypothetical meeting times for a trip before you actually change anything.",
          ],
        },
      ],
    },
    zh: {
      name: "时区换算",
      tagline: "21 个主要城市两两对照:实时双时钟、精确时差、逐小时时间表,夏令时精确处理,全程浏览器本地运行。",
      intro: [
        "从洛杉矶到东京,任选两个城市,即可并排查看两地实时时钟、今天的精确时差,以及一张 24 行的逐小时对照表——找到跨时区会议时间的最快方式。",
        "换算使用浏览器内置的 IANA 时区数据库,夏令时切换精确到分钟,全程无需联网。",
      ],
      steps: [
        "选择起点城市,下方会显示其实时本地时间。",
        "选择目标城市,时钟与 UTC 偏移即时更新。",
        "浏览逐小时对照表,找到双方都合适的时间。",
        "点击交换按钮可以调换两个城市。",
      ],
      faqs: [
        {
          q: "能正确处理夏令时吗?",
          a: "可以。时差按当天日期用浏览器内置的 IANA 时区规则计算,处于夏令时的城市会显示偏移后的正确时间,对照表反映的也是两地的真实钟面时间。",
        },
        {
          q: "为什么对照表里有些行的日期不一样?",
          a: "两个城市相距很远时,一天之内某一侧的日期会发生变化。每行都在时间旁标注了目标城市的日期,方便你发现例如上海 9:00 对应纽约前一天 21:00 这类情况。",
        },
        {
          q: "这个工具需要联网吗?",
          a: "不需要。城市时间来自浏览器内置的时区数据库和你的设备时钟——不下载任何数据,也不会共享你的位置。",
        },
      ],
      deepDive: [
        {
          heading: "为什么必须用 IANA 时区数据库",
          paragraphs: [
            "时区不是固定的偏移量,而是随历史不断变化的规则集。一座城市的偏移随夏令时立法、战时政策和政府政令而变——有时还追溯生效。IANA 时区数据库(tz database)就是社区维护的这些规则档案,像 America/New_York 这样的区域标识符编码的不只是一个偏移,而是它何时、如何变化的完整历史。",
            "你的浏览器内置了一份这个数据库,并通过标准 Intl API 暴露出来,本工具用的正是它。这个选择带来两个结果:换算不需要联网——飞行模式下页面照常工作;但规则的新旧程度取决于你的浏览器——各国最新的政策调整要等浏览器更新 tzdata 才会生效,而不是即时的。",
            "使用命名时区而非固定偏移还避免了一类 bug:“+5:30”只描述今天的印度,而 Asia/Kolkata 描述的是跨越无夏令时的几十年、历史改档也完好的印度。网上流传的固定偏移速查表会过时,命名时区不会。",
          ],
        },
        {
          heading: "夏令时:让朴素算法翻车的切换点",
          paragraphs: [
            "夏令时正是“两偏移一减就完事”行不通的原因。两城的时差今天 7 小时,下周可能是 6 或 8 小时——因为各地切换夏令时的日期不同:美国 3 月切换,欧洲 3 月底,南半球一些国家在 10 月前后。甚至同一个国家内部,一个地区实行夏令时而另一个地区不实行,也很常见。",
            "切换本身也充满棱角:春季拨快会让挂钟整整跳过一小时——那天的 2:30 根本不存在;秋季拨回让一个小时出现两次,不带时区的“凌晨 1:30”是歧义时间。还有国家干脆废除夏令时,比如墨西哥 2022 年在全国大部分地区废除——这就是为什么只有带日期的规则才是安全编码,恒定偏移不行。",
            "对周期性会议,逐小时表在切换日期附近最有价值:在切换发生的那一周查一下同一个工作日,你会看到实际会议时间只在一边跳了一小时。一眼扫过,就能防住那种让例会把打电话时间从早晨慢慢漂到深夜的经典偏移。",
          ],
        },
        {
          heading: "怎么读表,以及隐私",
          paragraphs: [
            "24 行对照表按你选择的日期生成,而不只是今天——这很重要,因为你要排的会议在下个月,可能已经跨过了某次夏令时切换。目标城市与起点城市日期不同的行会被明确标注:上海周一 9:00 对应纽约周日 21:00,正是手算最容易丢掉的细节。",
            "现实中存在半小时甚至 45 分钟偏移——印度 +5:30、澳大利亚部分地区 +9:30、尼泊尔 +5:45——所以别假设两城时差一定是整数小时。表读取的是真实规则,奇怪的偏移会自然出现在算术里。",
            "一切本地计算:浏览器的 Intl API 加设备时钟,没有网络请求,不上传位置,不留历史。工具天生只读——不会改动你设备的时区——因此出行前推演假想的会议时间也很安全,不用担心真的改了什么。",
          ],
        },
      ],
    },
    ja: {
      name: "タイムゾーン変換",
      tagline: "主要 21 都市の時刻をリアルタイム双時計と 1 時間ごとの対応表で比較。サマータイムも正確、すべてブラウザ内で動作します。",
      intro: [
        "ロサンゼルスから東京まで、好きな 2 都市を選ぶとリアルタイムの時計が並んで表示され、今日の正確な時差と 24 行の時間帯対応表がわかります。国際会議の時間探しに最短ルートです。",
        "変換にはブラウザ内蔵の IANA タイムゾーンデータベースを使用するため、サマータイムの切替も正確で、通信は一切発生しません。",
      ],
      steps: [
        "起点の都市を選ぶと、下にリアルタイムの現地時刻が表示されます。",
        "先方の都市を選ぶと、時計と UTC オフセットが即座に更新されます。",
        "時間帯対応表を見て、双方に無理のない時間を探します。",
        "入れ替えボタンで 2 都市を反転できます。",
      ],
      faqs: [
        {
          q: "サマータイムにも対応していますか?",
          a: "はい。オフセットは当日の日付でブラウザ内蔵の IANA ルールに従って計算されるため、サマータイム中の都市は正しくずれた時刻を表示し、対応表も両側の実際の時計を反映します。",
        },
        {
          q: "対応表で日付が変わる行があるのはなぜですか?",
          a: "距離が離れた都市では、一日のうちに片側の日付が変わります。各行には先方の日付も併記しているので、上海の 9:00 がニューヨークでは前日の 21:00 といった対応もひと目でわかります。",
        },
        {
          q: "このツールはインターネット接続が必要ですか?",
          a: "いいえ。都市の時刻はブラウザ内蔵のタイムゾーンデータベースと端末の時計から得ており、何もダウンロードせず、位置情報も送信しません。",
        },
      ],
      deepDive: [
        {
          heading: "IANA タイムゾーンデータベースが重要な理由",
          paragraphs: [
            "タイムゾーンは固定のオフセットではなく、歴史とともに変わり続ける規則の集合です。ある都市のオフセットはサマータイム法制、戦時政策、政府の政令で移り変わりました——遡及して効力を持つこともあります。IANA タイムゾーンデータベース(tz database)はこの規則をコミュニティが維持する記録で、America/New_York のようなゾーン識別子はオフセットだけでなく、いつ・どう変わるかの全歴史を符号化しています。",
            "あなたのブラウザはこのデータベースのコピーを内蔵し、標準の Intl API として公開しています。このツールはまさにそれを使います。結果は二つです。変換に通信が不要で——機内モードでもページは動作します——そして規則の新しさはブラウザに依存します。各国の最新の変更は、即座ではなくブラウザが tzdata を更新したときに反映されます。",
            "固定オフセットではなく名前付きゾーンを使うことは、ある種のバグも避けます。「+5:30」は今日のインドをしか述べませんが、Asia/Kolkata はサマータイムのない数十年と、過去の一度きりの改定までを含めてインドを記述します。チートシートとして出回る固定オフセット表は古びます。名前付きゾーンは古びません。",
          ],
        },
        {
          heading: "サマータイム:素朴な計算を壊す切替点",
          paragraphs: [
            "サマータイムこそが「2 つのオフセットを引けば終わり」を不可能にする理由です。2 都市の時差は今日 7 時間でも、来週は 6 あるいは 8 時間になりえます。切替日が地域ごとに異なるからです。米国は 3 月、欧州は 3 月の終わり、南半球の一部は 10 月前後。同じ国内でも、実施する地域としない地域が混在するのは珍しくありません。",
            "切替自体にも鋭い角があります。春は時計が丸 1 時間跳び、その日の午前 2:30 という時刻は存在しません。秋は 1 時間が 2 回訪れ、ゾーン付きでない「午前 1:30」は曖昧です。さらに国によってはサマータイムを廃止しており、メキシコは 2022 年に国土の大部分で廃止しました。だからこそ安全な符号化は日付付きの規則であって、一定のオフセットではありません。",
            "定例会議では、切替日の前後でこの時間帯表が威力を発揮します。切替の起きる週の同じ曜日を確認すると、実質的な会議時刻が片側だけで 1 時間跳ぶのが見えます。一瞥するだけで、定例招待が朝から夜へゆっくりずれていく定番のドリフトを防げます。",
          ],
        },
        {
          heading: "対応表の読み方とプライバシー",
          paragraphs: [
            "24 行の対応表は「今日」だけでなく、あなたが選んだ日付に対して生成されます。これが重要なのは、打ち合わせは来月——もしかするとサマータイム切替の後——に行われるからです。先方の日付が起点と異なる行は明示されます。上海の月曜 9:00 がニューヨークの日曜 21:00 であるような詳細は、まさに手計算が落とす類のものです。",
            "現実には 30 分・45 分単位のオフセットが存在します。インドは +5:30、オーストラリアの一部は +9:30、ネパールは +5:45。2 都市の時差が整数時間だと仮定しないでください。表は実物の規則を読むので、変わったオフセットはそのまま計算に現れます。",
            "すべてローカルで計算されます。ブラウザの Intl API と端末の時計、通信なし、位置情報の送信なし、履歴の保存なし。ツールは本来読み取り専用で——端末のタイムゾーンを決して変更しないので——実際に何も変えずに出張先の会議時間を仮想検討するのにも安全です。",
          ],
        },
      ],
    },
    es: {
      name: "Conversor de husos horarios",
      tagline: "Compara la hora entre 21 grandes ciudades con relojes en vivo y una tabla hora a hora: el horario de verano exacto, todo en tu navegador.",
      intro: [
        "Elija dos ciudades, de Los Ángeles a Tokio, y vea sus relojes en vivo lado a lado, la diferencia exacta de hoy y una tabla de 24 filas que muestra a qué hora corresponde cada hora del día en la otra ciudad: la forma más rápida de buscar una reunión global.",
        "La conversión usa la base de datos IANA integrada en su navegador, así que los cambios de horario de verano caen en el minuto correcto sin ninguna llamada de red.",
      ],
      steps: [
        "Elija la ciudad de origen: su reloj local en vivo aparece debajo.",
        "Elija la ciudad de destino; el reloj y el desfase UTC se actualizan al instante.",
        "Revise la tabla hora a hora para encontrar horarios viables para ambos lados.",
        "Use el botón de intercambio para invertir las dos ciudades.",
      ],
      faqs: [
        {
          q: "¿El conversor tiene en cuenta el horario de verano?",
          a: "Sí. Los desfases se calculan con las reglas IANA del navegador para la fecha de hoy, así que una ciudad en horario de verano muestra su desfase correcto y la tabla refleja los relojes reales de ambos lados.",
        },
        {
          q: "¿Por qué algunas filas de la tabla muestran otra fecha?",
          a: "Cuando las ciudades están muy separadas, la fecha cambia durante el día en uno de los lados. Cada fila indica la fecha del destino junto a la hora, para detectar por ejemplo que las 9:00 de Shanghái son las 21:00 del día anterior en Nueva York.",
        },
        {
          q: "¿Necesita internet esta herramienta?",
          a: "No. Las horas provienen de la base de zonas horarias integrada en el navegador y del reloj del dispositivo: no se descarga nada ni se comparte su ubicación.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué importa la base de datos IANA",
          paragraphs: [
            "Las zonas horarias no son desfases fijos; son conjuntos de reglas que cambian a lo largo de la historia. El desfase de una ciudad se ha movido con leyes de horario de verano, políticas de guerra y decretos gubernamentales — a veces con efecto retroactivo. La base de datos IANA (la tz database) es el registro mantenido por la comunidad de esas reglas, y un identificador de zona como America/New_York codifica no solo un desfase sino toda la historia de cuándo y cómo cambia.",
            "Su navegador trae una copia de esta base y la expone mediante la API Intl estándar, que es lo que usa esta herramienta. La elección tiene dos consecuencias: las conversiones no necesitan conexión — la página funciona en modo avión — y las reglas son tan actuales como su navegador. Los cambios gubernamentales recientes aparecen cuando el navegador actualiza su tzdata, no de inmediato.",
            "Usar zonas con nombre en vez de desfases fijos también evita una familia de errores: “+5:30” describe India hoy, pero “Asia/Kolkata” describe India a lo largo de décadas sin horario de verano y con sus reajustes históricos intactos. Las tablas de desfases fijos que circulan como chuletas envejecen; una zona con nombre no puede.",
          ],
        },
        {
          heading: "Horario de verano: las transiciones que rompen el cálculo ingenuo",
          paragraphs: [
            "El horario de verano es la razón de que no pueda simplemente restar dos desfases y confiar en el resultado. La diferencia entre dos ciudades puede ser de 7 horas hoy y de 6 u 8 la semana próxima, porque el cambio de horario ocurre en fechas distintas según el lugar: Estados Unidos cambia en marzo, Europa más tarde en marzo, y algunos países del hemisferio sur lo hacen hacia octubre. Incluso dentro de un país, una región puede observar el horario de verano y otra no.",
            "Las transiciones tienen aristas: el salto de primavera adelanta el reloj una hora entera — la hora 2:30 AM sencillamente no existe ese día — y el retroceso de otoño hace que una hora ocurra dos veces, de modo que «1:30 AM» es ambiguo sin la zona. Algunos países han abolido el horario de verano por completo, como hizo México en gran parte del territorio en 2022, y por eso solo la codificación con reglas fechadas es segura, nunca el desfase constante.",
            "Para reuniones recurrentes, la tabla hora a hora rinde alrededor de esas fechas de cambio: revise el mismo día de la semana en la semana en que ocurre la transición y verá que la hora práctica de la reunión salta una hora solo de un lado. Ese vistazo evita el clásico desvío de la invitación recurrente que arrastra la llamada de la mañana a la noche.",
          ],
        },
        {
          heading: "Leer la tabla y permanecer en privado",
          paragraphs: [
            "La tabla de 24 filas se genera para la fecha que usted elige, no solo hoy — lo cual importa porque la reunión que agenda sucede el mes que viene, quizá tras un cambio de horario. Las filas en que la fecha del destino difiere de la del origen se rotulan explícitamente: que las 9:00 del lunes en Shanghái sean las 21:00 del domingo en Nueva York es justo el detalle que una conversión manual deja caer.",
            "Existen desfases de media hora y de 45 minutos en el mundo real — India a +5:30, partes de Australia a +9:30, Nepal a +5:45 — así que no asuma que la diferencia entre dos ciudades es un número entero. La tabla lee las reglas reales, y los desfases extraños aparecen sin más en la aritmética.",
            "Todo se calcula localmente: la API Intl del navegador y el reloj del dispositivo, sin peticiones de red, sin compartir ubicación, sin historial guardado. La herramienta es de solo lectura por naturaleza — nunca cambia la zona horaria de su dispositivo — así que es seguro explorar horarios hipotéticos de reunión para un viaje antes de cambiar nada de verdad.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor de fusos horários",
      tagline: "Compare horários entre 21 grandes cidades com relógios ao vivo e tabela hora a hora — horário de verão exato, tudo no seu navegador.",
      intro: [
        "Escolha duas cidades, de Los Angeles a Tóquio, e veja os relógios ao vivo lado a lado, a diferença exata de hoje e uma tabela de 24 linhas mostrando a que hora corresponde cada hora do dia na outra cidade — o caminho mais rápido para marcar reuniões globais.",
        "A conversão usa o banco de dados IANA embutido no navegador, então as transições de horário de verão caem no minuto certo, sem nenhuma chamada de rede.",
      ],
      steps: [
        "Escolha a cidade de origem — o relógio local ao vivo aparece abaixo.",
        "Escolha a cidade de destino; o relógio e o fuso UTC atualizam na hora.",
        "Percorra a tabela hora a hora para achar horários que funcionem para os dois lados.",
        "Use o botão de troca para inverter as duas cidades.",
      ],
      faqs: [
        {
          q: "O conversor lida com horário de verão?",
          a: "Sim. Os fusos são calculados com as regras IANA do navegador para a data de hoje, então uma cidade em horário de verão mostra o fuso deslocado correto e a tabela reflete os relógios reais dos dois lados.",
        },
        {
          q: "Por que algumas linhas da tabela mostram outra data?",
          a: "Quando as cidades são distantes, a data muda no decorrer do dia em um dos lados. Cada linha mostra a data do destino ao lado da hora, para você perceber, por exemplo, que 9:00 em Xangai ainda são 21:00 da véspera em Nova York.",
        },
        {
          q: "Esta ferramenta precisa de internet?",
          a: "Não. Os horários vêm do banco de fusos embutido no navegador e do relógio do dispositivo — nada é baixado e nenhuma localização é compartilhada.",
        },
      ],
      deepDive: [
        {
          heading: "Por que o banco IANA importa",
          paragraphs: [
            "Fusos horários não são deslocamentos fixos; são conjuntos de regras que mudam ao longo da história. O deslocamento de uma cidade já mudou com leis de horário de verão, políticas de guerra e decretos governamentais — às vezes com efeito retroativo. O banco de dados IANA (a tz database) é o registro mantido pela comunidade dessas regras, e um identificador de zona como America/New_York codifica não só um deslocamento, mas toda a história de quando e como ele muda.",
            "Seu navegador traz uma cópia desse banco e a expõe pela API Intl padrão, que é o que esta ferramenta usa. A escolha tem duas consequências: as conversões não precisam de rede — a página funciona em modo avião — e as regras são tão atuais quanto o seu navegador. Mudanças governamentais recentes aparecem quando o navegador atualiza o tzdata, não na hora.",
            "Usar zonas com nome em vez de deslocamentos fixos também evita uma família de bugs: “+5:30” descreve a Índia hoje, mas “Asia/Kolkata” descreve a Índia ao longo de décadas sem horário de verão e com seus reajustes históricos preservados. Tabelas de deslocamento fixo que circulam como colas envelhecem; uma zona com nome não envelhece.",
          ],
        },
        {
          heading: "Horário de verão: as transições que quebram a conta ingênua",
          paragraphs: [
            "O horário de verão é a razão de você não poder simplesmente subtrair dois deslocamentos e confiar no resultado. A diferença entre duas cidades pode ser de 7 horas hoje e de 6 ou 8 na semana que vem, porque a troca acontece em datas diferentes conforme o lugar: os EUA mudam em março, a Europa no fim de março, e alguns países do hemisfério sul por volta de outubro. Até dentro de um país, uma região pode adotar o horário de verão enquanto outra não.",
            "As transições têm arestas: o salto de primavera adianta o relógio uma hora inteira — a hora 2h30 simplesmente não existe naquele dia — e o recuo de outono faz uma hora acontecer duas vezes, de modo que “2h30” é ambíguo sem a zona. Alguns países aboliram o horário de verão por completo, como o México fez na maior parte do território em 2022, e por isso só a codificação com regras datadas é segura, jamais o deslocamento constante.",
            "Para reuniões recorrentes, a tabela hora a hora vale ouro perto das datas de troca: confira o mesmo dia da semana na semana em que a transição ocorre e você verá o horário prático da reunião pular uma hora só de um lado. Esse único olhar evita o clássico desvio do convite recorrente que arrasta a chamada da manhã para a noite.",
          ],
        },
        {
          heading: "Como ler a tabela e ficar em privado",
          paragraphs: [
            "A tabela de 24 linhas é gerada para a data que você escolhe, não só hoje — o que importa porque a reunião que você está marcando acontece no mês que vem, talvez depois de uma troca de horário. As linhas em que a data do destino difere da da origem são rotuladas explicitamente: 9h de segunda em Xangai serem 21h de domingo em Nova York é exatamente o tipo de detalhe que uma conversão manual deixa cair.",
            "Existem deslocamentos de meia hora e de 45 minutos no mundo real — Índia a +5:30, partes da Austrália a +9:30, Nepal a +5:45 — então não presuma que a diferença entre duas cidades é um número inteiro. A tabela lê as regras reais, e os deslocamentos estranhos aparecem naturalmente na conta.",
            "Tudo é calculado localmente: a API Intl do navegador e o relógio do aparelho, sem requisição de rede, sem compartilhar localização, sem histórico guardado. A ferramenta é somente leitura por natureza — nunca muda o fuso do seu dispositivo — então é seguro explorar horários hipotéticos de reunião para uma viagem antes de mudar qualquer coisa de verdade.",
          ],
        },
      ],
    },
  },
});
