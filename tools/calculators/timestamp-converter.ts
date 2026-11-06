import { CalcEngineTime } from "../_engines/calc-engine-time";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "timestamp-converter",
  category: "utility",
  icon: "clock",
  engine: { component: CalcEngineTime, props: { kind: "timestamp" } },
  related: ["timezone-converter", "date-calculator", "time-converter", "binary-converter", "body-fat-calculator", "tip-calculator", "cooking-conversion", "age-calculator", "calorie-calculator", "aspect-ratio-calculator"],
  copy: {
    en: {
      name: "Unix Timestamp Converter",
      tagline: "Convert Unix seconds or milliseconds to human dates and back, with a live clock, local-timezone and UTC output — all in your browser.",
      intro: [
        "A live counter shows the current Unix timestamp in seconds and milliseconds with one-click copy. Paste a timestamp and it is decoded to your local time and to UTC — 10-digit values are treated as seconds, 13-digit as milliseconds, automatically.",
        "Going the other way, pick a date and time to get its exact timestamp. Everything is computed locally from your device clock; timestamps are timezone-independent by definition, so the numbers are the same anywhere on earth.",
        "Unix time counts seconds since 1970-01-01 00:00:00 UTC and ignores leap seconds, which is why it is the interchange format for APIs and logs. The tool auto-detects 10-digit values as seconds and 13-digit as milliseconds; values outside those lengths are flagged rather than silently misread.",
        "Compared with converting in a terminal, both directions and both units live on one page with one-click copy, and the live counter confirms your device clock is sane before you debug a scheduling bug. Timestamps carry no time zone by definition, so always pair them with an explicit zone in your systems — the classic source of off-by-hours defects.",
      ],
      steps: [
        "Copy the live current timestamp, or paste one into the decode field.",
        "Read the local and UTC human dates; seconds vs. milliseconds is detected automatically.",
        "Or pick a date-time to get its Unix timestamp in seconds and milliseconds.",
      ],
      faqs: [
        {
          q: "What exactly is a Unix timestamp?",
          a: "The number of seconds elapsed since 1970-01-01 00:00:00 UTC, not counting leap seconds. It is the standard way computers store points in time because sorting and subtraction become trivial. Millisecond timestamps (13 digits) are common in JavaScript and Java.",
        },
        {
          q: "How does the tool know if my number is in seconds or milliseconds?",
          a: "By magnitude: values under 1 trillion cannot describe a modern date in milliseconds, so they are read as seconds; 13-digit values are read as milliseconds. The result states which interpretation was applied.",
        },
        {
          q: "Will the same timestamp decode differently in other timezones?",
          a: "The raw number never changes — it encodes an absolute instant. Only the human-readable rendering differs, which is why the tool shows your local time and UTC side by side.",
        },
      ],
      deepDive: [
        {
          heading: "Why Unix time ignores clocks and calendars",
          paragraphs: [
            "Unix time is a single integer counting seconds since 1970-01-01 00:00:00 UTC — the Unix epoch. There are no timezones, no daylight saving, no month lengths inside the number itself; all of that is presentation, applied only when a renderer turns the integer into a human date. This is exactly why every API, database and log system stores time this way: comparing two moments is integer subtraction, and sorting is integer sorting.",
            "Leap seconds are deliberately excluded. The number 1,700,000,000 does not mark 1.7 billion physical seconds — it marks 1.7 billion SI seconds since the epoch plus the number of leap seconds absorbed by the system in the meantime. For scheduling and logging this simplification is a feature; for astronomical precision it is not, which is why scientific systems keep their own scales (TAI, UTC) instead.",
            "Negative timestamps are legal: they count backwards before 1970, so 1969-07-20 (the Moon landing) sits around −14182940 seconds. Some older 32-bit systems refused negatives, which is why a few legacy libraries mis-handle dates before 1970 even though the standard never said to.",
          ],
        },
        {
          heading: "Seconds, milliseconds and the 2038 problem",
          paragraphs: [
            "The digits give the unit away. Ten digits covers 1973 through 2286 in seconds; thirteen digits covers the modern era in milliseconds. The tool reads by magnitude and tells you which interpretation it applied, because a wrong unit assumption produces dates that look plausible — a 13-digit value read as seconds lands in the year 55,000, which is hard to miss, but two libraries disagreeing about units inside one codebase produces subtle off-by-a-thousand bugs instead.",
            "The 32-bit signed integer that early Unix systems used to store seconds overflows in January 2038, when the count reaches 2,147,483,647. Modern 64-bit systems are safe for the next ~290 billion years, but embedded devices, legacy file formats and some databases still carry 32-bit timestamp fields. The practical lesson is not to panic about 2038 today, but to notice which data types a system uses when integrating with it.",
            "A subtler trap is not the unit but the producer: some systems emit seconds-with-decimals like 1700000000.123, and naive parsers truncate or round differently. When debugging a timestamp discrepancy, first confirm both sides agree on the unit, then on precision, then on timezone rendering — in that order.",
          ],
        },
        {
          heading: "Working with timestamps day to day",
          paragraphs: [
            "The live counter is a debugging instrument as much as a convenience: before chasing a scheduling bug, glance at it to confirm your device clock is roughly right — a machine with a skewed clock produces timestamps that poison logs and token expiry checks alike. One-click copy means you can paste a current timestamp into a curl request or a test fixture without typing digits.",
            "Remember that the raw number is zone-free by definition. The classic production defect is storing timestamps correctly but rendering them with a server set to UTC while users live elsewhere — everything looks eight hours off. Always pair timestamps with an explicit timezone at the rendering layer; the side-by-side local and UTC readout here exists to make that pairing visible.",
            "Everything runs locally in your browser: pasted timestamps, picked dates and the live clock never leave your device, which matters when decoding timestamps from logs, incident data or anything sensitive. There is no rate limit and no history — decode as many values as you need while bisecting when a bug first appeared.",
          ],
        },
      ],
    },
    zh: {
      name: "Unix 时间戳转换",
      tagline: "Unix 秒/毫秒时间戳与人类可读日期双向转换,实时时钟常驻,本地时区与 UTC 同时输出——全程浏览器本地计算。",
      intro: [
        "实时计数器以秒和毫秒显示当前 Unix 时间戳,一键复制。粘贴任意时间戳即可解码为本地时间和 UTC——10 位自动按秒解析,13 位自动按毫秒解析。",
        "反方向则选择日期时间,得到精确时间戳。全部计算基于设备时钟在本地完成;时间戳与时区无关,全球任何地方数字都相同。",
      ],
      steps: [
        "复制实时时间戳,或在解码框中粘贴一个。",
        "查看本地时间与 UTC 两种人类可读结果;秒/毫秒自动识别。",
        "或选择日期时间,得到以秒和毫秒表示的 Unix 时间戳。",
      ],
      faqs: [
        {
          q: "Unix 时间戳到底是什么?",
          a: "自 1970-01-01 00:00:00 UTC 起经过的秒数(不计闰秒)。它让时间排序和相减变得极其简单,是计算机存储时刻的标准方式。JavaScript 和 Java 中常见的毫秒时间戳是 13 位。",
        },
        {
          q: "工具怎么判断我的数字是秒还是毫秒?",
          a: "按数量级判断:小于 1 万亿的值不可能是现代日期的毫秒数,按秒解读;13 位数字按毫秒解读。结果会注明采用了哪种解释。",
        },
        {
          q: "同一个时间戳在其他时区解码结果不同吗?",
          a: "原始数字永远不变——它编码的是绝对时刻。不同的只是人类可读的显示形式,因此工具把本地时间和 UTC 并排展示。",
        },
      ],
      deepDive: [
        {
          heading: "为什么 Unix 时间不理会时钟和日历",
          paragraphs: [
            "Unix 时间是一个整数,数的是自 1970-01-01 00:00:00 UTC(Unix 纪元)以来的秒数。数字本身没有时区、没有夏令时、没有月份长短;这些全都是“呈现层”的事,只在把整数渲染成人类日期时才应用。这正是所有 API、数据库和日志系统都用它存时间的原因:比较两个时刻就是整数相减,排序就是整数排序。",
            "闰秒被刻意排除。1,700,000,000 这个数代表的不是 17 亿个物理秒,而是“纪元以来的 17 亿秒 + 期间被系统吸收的闰秒数”。对调度和日志来说这种简化是优点;对天文精度来说不是,所以科学系统另用自己的时间尺度(TAI、UTC)。",
            "负数时间戳是合法的:1970 年之前往回数,1969-07-20(登月)约为 −14182940 秒。一些老式 32 位系统不接受负数,这就是个别遗留库连 1970 年前的日期都处理不了的原因——尽管标准从来没这么规定。",
          ],
        },
        {
          heading: "秒、毫秒与 2038 问题",
          paragraphs: [
            "位数暴露了单位。10 位数在秒口径下覆盖 1973 到 2286 年;13 位数在毫秒口径下覆盖现代。工具按数量级判断并注明采用了哪种解释——因为单位认错的后果往往是“看起来合理”的日期:13 位数按秒读会落到公元 5 万多年,很容易发现;但同一个代码库里两个库对单位理解不一致,产出的是差一千倍的隐蔽 bug。",
            "早期 Unix 系统用来存秒数的 32 位有符号整数将在 2038 年 1 月溢出,届时计数达到 2,147,483,647。现代 64 位系统在未来约两千多亿年内都安全,但嵌入式设备、遗留文件格式和部分数据库仍带着 32 位时间戳字段。今天的教训不是恐慌,而是对接系统时留意它用什么数据类型。",
            "更隐蔽的坑不在单位而在生产方:有些系统输出带小数的秒,如 1700000000.123,朴素的解析器截断和四舍五入的结果会不同。排查时间戳对不上时,先确认双方单位一致,再确认精度,最后才看时区渲染——按这个顺序。",
          ],
        },
        {
          heading: "日常工作流里的用法",
          paragraphs: [
            "实时计数器不只是方便,更是调试仪表:追查调度 bug 之前先瞥一眼,确认设备时钟大致正确——时钟漂移的机器产出的时间戳会同时污染日志和令牌过期校验。一键复制意味着你可以把当前时间戳直接贴进 curl 请求或测试夹具,不用手动敲数字。",
            "记住原始数字按定义不带时区。经典的生产缺陷是时间戳存得没问题,但渲染层用的服务器是 UTC、用户却在别的时区——一切都差了八小时。渲染层必须始终给时间戳配一个明确的时区;这里的本地时间与 UTC 并排显示,就是为了让这个“配对”看得见。",
            "一切都在浏览器本地运行:粘贴的时间戳、选择的日期、实时时钟都不离开设备。解码来自日志、事故数据或任何敏感内容的时间戳时这很重要。没有频率限制也没有历史记录——二分排查 bug 首次出现时间时,想解码多少次就解码多少次。",
          ],
        },
      ],
    },
    ja: {
      name: "Unix タイムスタンプ変換",
      tagline: "Unix の秒・ミリ秒と人間が読める日付を双方向に変換。ライブ時計つき、ローカル時間と UTC を同時表示、すべてブラウザ内で処理。",
      intro: [
        "現在の Unix タイムスタンプを秒とミリ秒でライブ表示し、ワンクリックでコピーできます。タイムスタンプを貼り付けるとローカル時間と UTC に変換 — 10 桁は秒、13 桁はミリ秒として自動判別します。",
        "逆方向では日時を選ぶと正確なタイムスタンプを取得できます。計算は端末の時計をもとにローカルで完結します。タイムスタンプは定義上タイムゾーンに依存しないため、数値は世界中で同じです。",
      ],
      steps: [
        "ライブの現在時刻をコピーするか、変換欄にタイムスタンプを貼り付けます。",
        "ローカルと UTC の日時を確認します。秒かミリ秒かは自動判定されます。",
        "または日時を選んで、秒・ミリ秒の Unix タイムスタンプを取得します。",
      ],
      faqs: [
        {
          q: "Unix タイムスタンプとは何ですか?",
          a: "1970-01-01 00:00:00 UTC からの経過秒数です(うるう秒は除外)。並べ替えや引き算が単純になるため、コンピューターが時刻を扱う標準方式です。JavaScript や Java で一般的なミリ秒は 13 桁になります。",
        },
        {
          q: "入力が秒かミリ秒かはどう判断しますか?",
          a: "桁の大きさで判断します。1 兆未満の値は現代の日付をミリ秒で表せないため秒と読み、13 桁はミリ秒と読みます。どちらで解釈したかは結果に表示します。",
        },
        {
          q: "同じタイムスタンプでもタイムゾーンが違うと結果が変わりますか?",
          a: "数値そのものは変わりません。絶対的な時刻を表すからです。変わるのは表示のみで、このツールはローカル時間と UTC を並べて見せるためです。",
        },
      ],
      deepDive: [
        {
          heading: "Unix 時間が時計もカレンダーも無視する理由",
          paragraphs: [
            "Unix 時間は 1970-01-01 00:00:00 UTC(Unix エポック)からの秒数を数えるただの整数です。数値自体にはタイムゾーンも夏時間も月の長さもありません。それらはすべて「表示層」の話で、整数を人間用の日付に描画するときに初めて適用されます。だからこそ API・データベース・ログシステムのすべてがこの方式で時刻を扱います。2 つの時刻の比較は整数の減算、ソートは整数のソートになるからです。",
            "うるう秒は意図的に除外されています。1,700,000,000 という数は物理的な 17 億秒を指すのではなく、「エポックからの 17 億秒 + その間にシステムが吸収したうるう秒」を指します。スケジューリングやロギングにはこの簡略化が利点で、天文学の精度には不向きです。だから科学システムは独自の尺度(TAI、UTC)を維持しています。",
            "負のタイムスタンプも正当です。1970 年より前は逆方向に数え、1969-07-20(月面着陸)は約 −14182940 秒に相当します。古い 32 ビットシステムには負数を扱えないものがあり、標準はそのようなことを要求していないのに、一部のレガシーなライブラリが 1970 年前の日付を誤処理する理由はここにあります。",
          ],
        },
        {
          heading: "秒・ミリ秒・そして 2038 年問題",
          paragraphs: [
            "桁数が単位を物語ります。10 桁なら秒として 1973〜2286 年を、13 桁ならミリ秒として現代をカバーします。ツールは桁の大きさで判定し、どちらの解釈を適用したかを明示します。単位の誤認は「もっともらしい」日付を生むからです。13 桁を秒と読むと西暦 5 万年台に落ちて気づきやすいのですが、同じコードベースでライブラリ同士が単位を食い違わせると、1,000 倍のズレという見えにくいバグになります。",
            "初期の Unix が秒を格納した 32 ビット符号付き整数は、2038 年 1 月にカウントが 2,147,483,647 に達してオーバーフローします。現代の 64 ビットシステムは今後約 2,000 億年以上安全ですが、組み込み機器・レガシーなファイル形式・一部のデータベースには 32 ビットのタイムスタンプ欄がまだ残っています。今日の教訓は 2038 を恐れることではなく、接続先がどのデータ型を使っているかを確認することです。",
            "さらに見えにくいのは単位ではなく発生源の問題です。秒の小数付き(1700000000.123 など)を出力するシステムがあり、素朴なパーサーは切り捨てと四捨五入で結果が分かれます。タイムスタンプの不一致を調べるときは、単位→精度→タイムゾーン表示の順に確認してください。",
          ],
        },
        {
          heading: "日々のワークフローでの使い方",
          paragraphs: [
            "ライブ時計は便利機能であると同時に計測器です。スケジューリングのバグを追う前に一瞥して、端末の時計がだいたい正しいか確かめてください。時計がずれたマシンのタイムスタンプは、ログとトークン期限の両方を汚します。ワンクリックコピーなら現在時刻を curl のリクエストやテストデータに手打ちせず貼り付けられます。",
            "生の数値は定義上タイムゾーンを持たない点を忘れないでください。古典的な障害は、保存は正しいのに描画層が UTC 設定のサーバーで行い、ユーザーは別の地域にいる——というケースです。8 時間ずれて見える原因の定番です。描画層では常に明示的なタイムゾーンを対応させること。このツールがローカルと UTC を並べて表示するのは、その対応を見える化するためです。",
            "すべてはブラウザ内で実行されます。貼り付けたタイムスタンプ・選んだ日時・ライブ時計は端末の外に出ません。ログや障害データなど機微な情報由来の値を変換する場面で重要です。レート制限も履歴もないので、バグの初発時刻を二分探索するときも必要なだけ変換できます。",
          ],
        },
      ],
    },
    es: {
      name: "Conversor de timestamps Unix",
      tagline: "Convierte segundos o milisegundos Unix en fechas legibles y viceversa, con reloj en vivo y salida en su zona horaria y UTC, todo local.",
      intro: [
        "Un contador en vivo muestra el timestamp Unix actual en segundos y milisegundos con copia al clic. Pegue un timestamp y se descodificará a su hora local y a UTC — los valores de 10 dígitos se leen como segundos y los de 13 como milisegundos, automáticamente.",
        "En sentido inverso, elija una fecha y hora para obtener su timestamp exacto. Todo se calcula localmente con el reloj del dispositivo; por definición un timestamp no depende de la zona horaria, así que el número es el mismo en todo el planeta.",
      ],
      steps: [
        "Copie el timestamp actual en vivo o pegue uno en el campo de descodificación.",
        "Lea las fechas legibles local y UTC; segundos frente a milisegundos se detectan solos.",
        "O elija una fecha y hora para obtener su timestamp en segundos y milisegundos.",
      ],
      faqs: [
        {
          q: "¿Qué es exactamente un timestamp Unix?",
          a: "Los segundos transcurridos desde 1970-01-01 00:00:00 UTC, sin contar los segundos intercalares. Es la forma estándar de guardar instantes porque ordenar y restar se vuelve trivial. Los de milisegundos (13 dígitos) son habituales en JavaScript y Java.",
        },
        {
          q: "¿Cómo sabe la herramienta si mi número está en segundos o milisegundos?",
          a: "Por magnitud: valores menores de un billón no pueden describir una fecha moderna en milisegundos, así que se leen como segundos; los de 13 dígitos, como milisegundos. El resultado indica qué interpretación se aplicó.",
        },
        {
          q: "¿El mismo timestamp se descodifica distinto en otras zonas horarias?",
          a: "El número nunca cambia — codifica un instante absoluto. Solo cambia la representación legible, razón por la que la herramienta muestra su hora local y UTC una al lado de la otra.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué la hora Unix ignora relojes y calendarios",
          paragraphs: [
            "La hora Unix es un solo entero que cuenta segundos desde 1970-01-01 00:00:00 UTC — la época Unix. Dentro del número no hay zonas horarias, ni horario de verano, ni longitudes de mes; todo eso es presentación, aplicada solo cuando un renderizador convierte el entero en fecha legible. Precisamente por eso API, bases de datos y sistemas de logs guardan el tiempo así: comparar dos instantes es restar enteros y ordenar es ordenar enteros.",
            "Los segundos intercalares se excluyen deliberadamente. El número 1.700.000.000 no marca 1.700 millones de segundos físicos — marca 1.700 millones de segundos desde la época más los segundos intercalares absorbidos por el sistema en el ínterin. Para programar y registrar es una simplificación ventajosa; para precisión astronómica no lo es, y por eso los sistemas científicos mantienen sus propias escalas (TAI, UTC).",
            "Los timestamps negativos son válidos: cuentan hacia atrás antes de 1970, así que el 1969-07-20 (el alunizaje) ronda los −14182940 segundos. Algunos sistemas antiguos de 32 bits rechazaban negativos, y de ahí que ciertas librerías heredadas manejen mal fechas anteriores a 1970 aunque el estándar jamás lo pidió.",
          ],
        },
        {
          heading: "Segundos, milisegundos y el problema de 2038",
          paragraphs: [
            "Los dígitos delatan la unidad. Diez dígitos cubren 1973–2286 en segundos; trece cubren la era moderna en milisegundos. La herramienta lee por magnitud y le indica qué interpretación aplicó, porque suponer mal la unidad produce fechas que parecen plausibles — un valor de 13 dígitos leído como segundos cae en el año 55.000 y salta a la vista, pero dos librerías discrepando sobre unidades dentro del mismo código generan en su lugar errores sutiles de mil veces.",
            "El entero con signo de 32 bits que los primeros sistemas Unix usaban para guardar segundos desborda en enero de 2038, cuando la cuenta llega a 2.147.483.647. Los sistemas de 64 bits modernos están a salvo unos 290.000 millones de años, pero dispositivos embebidos, formatos heredados y algunas bases de datos aún llevan campos de 32 bits. La lección práctica no es entrar en pánico por 2038 hoy, sino fijarse en qué tipos de datos usa un sistema al integrarse con él.",
            "La trampa más sutil no es la unidad sino el productor: algunos sistemas emiten segundos con decimales, como 1700000000.123, y los analizadores ingenuos truncarán o redondearán de forma distinta. Al depurar una discrepancia de timestamps, confirme primero que ambas partes concuerdan en la unidad, luego en la precisión, y solo después en la zona horaria de visualización.",
          ],
        },
        {
          heading: "Uso diario de los timestamps",
          paragraphs: [
            "El contador en vivo es un instrumento de depuración tanto como una comodidad: antes de perseguir un bug de programación, échale un vistazo para confirmar que el reloj del equipo está más o menos en hora — una máquina con el reloj desviado produce timestamps que envenenan a la vez los logs y las comprobaciones de expiración de tokens. La copia al clic le permite pegar un timestamp actual en una petición curl o en un fixture de prueba sin teclear dígitos.",
            "Recuerde que el número puro no lleva zona por definición. El defecto clásico de producción es guardar los timestamps correctamente pero renderizarlos en un servidor en UTC mientras los usuarios están en otra parte — todo se ve ocho horas desfasado. Acompañe siempre los timestamps con una zona explícita en la capa de renderizado; la lectura local y UTC lado a lado existe precisamente para hacer visible ese emparejamiento.",
            "Todo corre localmente en su navegador: los timestamps pegados, las fechas elegidas y el reloj en vivo nunca salen del dispositivo, algo que importa al descodificar timestamps de logs, datos de incidentes o cualquier material sensible. No hay límite de peticiones ni historial — descodifique cuantos valores necesite mientras acota cuándo apareció un bug por primera vez.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor de timestamp Unix",
      tagline: "Converta segundos ou milissegundos Unix em datas legíveis e vice-versa, com relógio ao vivo e saída no fuso local e UTC — tudo no navegador.",
      intro: [
        "Um contador ao vivo mostra o timestamp Unix atual em segundos e milissegundos com cópia num clique. Cole um timestamp e ele é decodificado para a sua hora local e para UTC — valores de 10 dígitos são lidos como segundos e de 13 como milissegundos, automaticamente.",
        "No sentido inverso, escolha uma data e hora para obter o timestamp exato. Tudo é calculado localmente com o relógio do dispositivo; por definição o timestamp não depende do fuso, então o número é o mesmo em qualquer lugar do mundo.",
      ],
      steps: [
        "Copie o timestamp atual ao vivo ou cole um no campo de decodificação.",
        "Veja as datas legíveis no fuso local e em UTC; segundos ou milissegundos são detectados sozinhos.",
        "Ou escolha uma data e hora para obter o timestamp em segundos e milissegundos.",
      ],
      faqs: [
        {
          q: "O que é exatamente um timestamp Unix?",
          a: "O número de segundos decorridos desde 1970-01-01 00:00:00 UTC, sem contar os segundos intercalares. É a forma padrão de guardar instantes porque ordenar e subtrair fica trivial. Os de milissegundos (13 dígitos) são comuns em JavaScript e Java.",
        },
        {
          q: "Como a ferramenta sabe se o número está em segundos ou milissegundos?",
          a: "Pela magnitude: valores abaixo de 1 trilhão não podem descrever uma data moderna em milissegundos, então são lidos como segundos; os de 13 dígitos, como milissegundos. O resultado informa qual leitura foi aplicada.",
        },
        {
          q: "O mesmo timestamp decodifica diferente em outros fusos?",
          a: "O número nunca muda — ele codifica um instante absoluto. Só a representação legível muda, por isso a ferramenta mostra a hora local e a UTC lado a lado.",
        },
      ],
      deepDive: [
        {
          heading: "Por que o tempo Unix ignora relógios e calendários",
          paragraphs: [
            "O tempo Unix é um único inteiro que conta segundos desde 1970-01-01 00:00:00 UTC — a época Unix. Dentro do número não existem fusos, horário de verão nem tamanhos de mês; tudo isso é apresentação, aplicada só quando um renderizador transforma o inteiro em data legível. É exatamente por isso que APIs, bancos de dados e sistemas de log guardam o tempo assim: comparar dois instantes é subtrair inteiros, e ordenar é ordenar inteiros.",
            "Os segundos intercalares ficam de fora de propósito. O número 1.700.000.000 não marca 1,7 bilhão de segundos físicos — marca 1,7 bilhão de segundos desde a época mais os segundos intercalares absorvidos pelo sistema nesse meio-tempo. Para agendamento e logs essa simplificação é uma vantagem; para precisão astronômica não é, e por isso sistemas científicos mantêm escalas próprias (TAI, UTC).",
            "Timestamps negativos são válidos: contam para trás antes de 1970, então 1969-07-20 (o pouso na Lua) fica perto de −14182940 segundos. Alguns sistemas antigos de 32 bits recusavam negativos, e por isso certas bibliotecas legadas lidam mal com datas anteriores a 1970 — mesmo que o padrão nunca tenha exigido isso.",
          ],
        },
        {
          heading: "Segundos, milissegundos e o problema de 2038",
          paragraphs: [
            "Os dígitos entregam a unidade. Dez dígitos cobrem 1973–2286 em segundos; treze cobrem a era moderna em milissegundos. A ferramenta lê pela magnitude e informa qual interpretação aplicou, porque presumir a unidade errada produz datas que parecem plausíveis — um valor de 13 dígitos lido como segundos cai no ano 55.000 e chama a atenção, mas duas bibliotecas discordando de unidades no mesmo código gera em vez disso bugs sutis de mil vezes.",
            "O inteiro com sinal de 32 bits que os primeiros sistemas Unix usavam para guardar segundos transborda em janeiro de 2038, quando a contagem chega a 2.147.483.647. Sistemas de 64 bits modernos ficam a salvo por uns 290 bilhões de anos, mas dispositivos embarcados, formatos legados e alguns bancos de dados ainda carregam campos de 32 bits. A lição prática não é entrar em pânico com 2038 hoje, e sim notar quais tipos de dados um sistema usa na hora de integrar com ele.",
            "A armadilha mais sutil não é a unidade, é o produtor: alguns sistemas emitem segundos com decimais, tipo 1700000000.123, e parsers ingênuos truncam ou arredondam de forma diferente. Ao depurar uma divergência de timestamps, confirme primeiro que ambos os lados concordam na unidade, depois na precisão, e só então na renderização do fuso — nessa ordem.",
          ],
        },
        {
          heading: "Usando timestamps no dia a dia",
          paragraphs: [
            "O contador ao vivo é um instrumento de depuração tanto quanto uma conveniência: antes de caçar um bug de agendamento, olhe para ele e confirme que o relógio do seu equipamento está aproximadamente certo — uma máquina com relógio atrasado gera timestamps que contaminam ao mesmo tempo logs e verificações de expiração de token. A cópia num clique permite colar um timestamp atual num request curl ou num fixture de teste sem digitar dígitos.",
            "Lembre de que o número puro não carrega fuso por definição. O defeito clássico de produção é guardar os timestamps corretamente mas renderizá-los num servidor em UTC enquanto os usuários estão em outro lugar — tudo aparece oito horas deslocado. Sempre emparelhe timestamps com um fuso explícito na camada de renderização; a exibição lado a lado de hora local e UTC existe justamente para tornar esse emparelhamento visível.",
            "Tudo roda localmente no seu navegador: os timestamps colados, as datas escolhidas e o relógio ao vivo nunca saem do aparelho, o que importa ao decodificar timestamps de logs, dados de incidentes ou qualquer material sensível. Não há limite de uso nem histórico — decodifique quantos valores precisar enquanto busca quando um bug apareceu pela primeira vez.",
          ],
        },
      ],
    },
  },
});
