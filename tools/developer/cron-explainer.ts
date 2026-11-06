import { DevCronExplainerEngine } from "../_engines/dev-cron-explainer";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "cron-explainer",
  category: "developer",
  icon: "clock",
  engine: { component: DevCronExplainerEngine },
  related: ["http-status-codes", "url-parser", "regex-tester", "jwt-decoder", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "url-encoder"],
  copy: {
    en: {
      name: "Cron Explainer",
      tagline:
        "Turn any cron expression into plain language: a field-by-field breakdown, the next five run times in your timezone, and one-click presets.",
      intro: [
        "Cron expressions are five or six cryptic fields that decide when jobs run — and one wrong character can silently schedule nothing, or fire at 3 a.m. every Sunday. Paste an expression and see each field explained in plain words, then the next five execution times so you can confirm the schedule does what you think.",
        "Validation is honest and inline: out-of-range values, backwards ranges and unsupported Quartz extensions like L, W and # get a specific error instead of a shrug. Five common presets — every minute, hourly, daily at midnight, weekdays at 9:00, quarterly — are one click away.",
        "The parser follows standard Vixie cron semantics: five fields (minute, hour, day of month, month, day of week), with the day-of-month / day-of-week OR rule that surprises even veterans — when both are restricted, cron fires on either match.",
        "General schedulers like crontab.guru explain the fields but stop there; this tool also previews actual fire times, which is the only reliable way to catch the month-edge pitfalls (Feb 30 never exists, */31 skips short months) before they hit production."
      ],
      steps: [
        "Type a cron expression, or click a preset to start from a known-good one.",
        "Read the field-by-field breakdown in plain language.",
        "Check the next five run times, switching between local time and UTC.",
        "Fix anything surprising in your crontab, scheduler UI or CI config.",
      ],
      faqs: [
        {
          q: "What is the difference between standard cron and Quartz syntax?",
          a: "Standard Unix cron (and this tool) uses 5 fields: minute, hour, day-of-month, month, day-of-week — optionally 6 when the first field is seconds. Quartz adds a seconds field by default plus a 7th year field, and extensions like L (last day), W (nearest weekday) and # (nth weekday, e.g. MON#2). Those Quartz-only extensions are not covered here; everything standard — numbers, names like JAN and MON, ranges, lists and steps — is.",
        },
        {
          q: "Why do the next run times differ from what my server does?",
          a: "Cron evaluates times in the server's own timezone, while the tool can show local time or UTC. If your machine runs UTC+8 and the server runs UTC, “0 3 * * *” fires eight hours apart between the two. Daylight-saving transitions can also shift or skip wall-clock hours; the underlying calculation is timezone-aware and handles those transitions.",
        },
        {
          q: "My expression has both a day-of-month and a day-of-week — why does it run more often than I expected?",
          a: "Classic cron ORs the two: when both fields are restricted (neither is *), a day matching either one triggers the job. “0 0 1 * MON” runs on the 1st and on every Monday. If you want both conditions at once, the expression needs a different structure — checking the next run times here makes the behavior visible immediately.",
        },
      ],
      deepDive: [
        {
          heading: "The five fields and the OR rule nobody remembers",
          paragraphs: [
            "Standard cron evaluates five fields left to right: minute (0-59), hour (0-23), day of month (1-31), month (1-12) and day of week (0-7, where both 0 and 7 are Sunday). Each field can be a value, a range (9-17), a list (0,15,30), or a step (*/5, meaning every 5th value starting at the field's floor). A job fires when all fields match — with one famous exception: when both day-of-month and day-of-week are restricted, the job runs on a day matching EITHER.",
            "That OR rule traces back to the original Unix cron implementation, and it exists so that combinations like \"1st of the month plus every Monday\" remain expressible in five fields. The trap is that most people writing \"0 0 1 * 1\" intend \"the first Monday of the month\" — what they get is the 1st AND every Monday, twice as often. If you need AND semantics, the usual workaround is a test inside the job (check date +%d against the target) or moving to a scheduler with richer triggers.",
            "The other surprise is 0 0 * * 7 versus 6: day of week numbering starts at Sunday (0), not Monday, and some cron dialects accept 7 as a second name for Sunday while others reject it. Writing names — MON, SUN — instead of numbers removes the ambiguity entirely, at no cost in standard cron.",
          ],
        },
        {
          heading: "Timezones and daylight saving: where schedules quietly break",
          paragraphs: [
            "Cron has no timezone of its own — it fires in whatever zone the server's clock is set to. A job defined as \"0 3 * * *\" runs at 3 a.m. server time, which is 11 a.m. in UTC+8 if the server is on UTC. Teams that deploy to cloud VMs often forget the platform default: most VMs boot in UTC regardless of where the company sits, and the first sign is a job that fires at what is locally the middle of the workday. Check with date or timedatectl on the host, or read the TZ line of /etc/default/cron where it is set.",
            "Daylight saving makes the problem worse twice a year. In zones observing DST, a 2:30 a.m. job may not fire at all on the spring-forward night (2:30 never exists), and the fall-back night fires it twice — an hour apart. Jobs pinned to UTC do not have this problem but must be written in UTC: \"0 3 * * *\" in a UTC crontab means 3 a.m. UTC, not local 3 a.m. This tool's next-run preview is timezone-aware precisely so you can see which of the two your server will actually do.",
            "The practical defense is to verify, not assume: paste the expression here, switch the display to the server's zone, and check the next five fire times against expectation. A schedule that survives that check is also worth annotating in the crontab comment — the person debugging it in two years will be you.",
          ],
        },
        {
          heading: "Edge cases: short months, steps and DST-adjacent pitfalls",
          paragraphs: [
            "Two day-of-month values are responsible for a large share of missed runs: 31 and 30 in combination with steps. \"0 0 */31 * *\" does not run on the last day of each month — it runs only in months that have a 31st (January, March, May...), silently skipping April and June. Similarly \"0 0 30 2 *\" is a permanent no-op because February never has 30 days. Cron does not warn; it just evaluates and finds no match. Seeing the next five run times empty or gappy is the fastest way to catch this.",
            "Step arithmetic starts at the field's floor, not at an offset you choose: */10 in the minute field is 0,10,20,30,40,50, not 5,15,25. To anchor differently you write the range explicitly — 5-59/10. Quoting also matters inside crontab files: percent signs (%) are treated as newlines by classic cron, so a command like date +\u201c%Y\u201d must escape the percent as \\% or the line breaks mid-command.",
            "Previewing real fire times beats reading the expression because these rules interact: a step over a 30-day month plus a weekday restriction can produce a gap of weeks. Tools that only translate the fields (explain what */31 means) cannot surface that; only iterating the calendar forward shows when the job will actually run. That iteration is exactly what this tool does, in your browser, with no schedule data sent anywhere.",
          ],
        },
      ],
    },
    zh: {
      name: "Cron 表达式解释器",
      tagline:
        "把任意 cron 表达式翻译成大白话:逐字段拆解、按你的时区显示接下来 5 次执行时间,常用预设一键填入。",
      intro: [
        "cron 表达式用五六个天书般的字段决定任务何时运行——错一个字符,可能永远不触发,也可能每周日凌晨三点准时跑一遍。粘贴表达式后,本工具用平实的语言逐字段解释(分、时、日、月、周,有秒字段时一并解释),并给出接下来 5 次执行时间,让你确认计划确实按你以为的方式运行。",
        "校验是诚实且内联的:超范围数值、方向反了的范围、不支持的 Quartz 扩展(L、W、#)都会得到具体友好的提示,而不是含糊其辞。每分钟、每小时、每天零点、工作日 9 点、每季度五个常用预设一键填入,可以直接当起点改。",
      ],
      steps: [
        "输入 cron 表达式,或点击预设从可靠写法开始。",
        "阅读逐字段的通俗拆解。",
        "查看接下来 5 次执行时间,可在本地时间与 UTC 间切换。",
        "发现不符预期就回头修改 crontab、调度器配置或 CI 设置。",
      ],
      faqs: [
        {
          q: "标准 cron 和 Quartz 语法有什么区别?",
          a: "标准 Unix cron(也是本工具的口径)是 5 段:分、时、日、月、周;带秒时为 6 段。Quartz 默认多一个秒字段,还支持第 7 段年份,以及 L(最后一天)、W(最近工作日)、#(第 n 个星期几,如 MON#2)等扩展。这些 Quartz 专属扩展本工具不支持;数字、JAN/MON 等名称、范围、列表、步进等标准语法全部支持。",
        },
        {
          q: "为什么算出的执行时间和服务器不一致?",
          a: "cron 按服务器自身时区求值,而本工具可以在本地时间和 UTC 之间切换。如果你的电脑是 UTC+8、服务器是 UTC,“0 3 * * *”在两边会差 8 小时。夏令时切换也会让某些钟点提前或跳过——底层计算感知时区,会正确处理这些转换。",
        },
        {
          q: "同时写了「日」和「星期」,为什么触发得比预期频繁?",
          a: "经典 cron 对这两段取「或」:当两个字段都被限制(都不是 *)时,日期匹配任一条件就触发。“0 0 1 * MON”会在每月 1 号和每个周一都运行。想同时满足两个条件需要改写表达式——在这里看一眼接下来的执行时间,行为立刻现形。",
        },
      ],
      deepDive: [
        {
          heading: "五个字段与没人记得的 OR 规则",
          paragraphs: [
            "标准 cron 从左到右求值五个字段:分(0-59)、时(0-23)、日(1-31)、月(1-12)、周(0-7,0 和 7 都是周日)。每个字段可以是单值、范围(9-17)、列表(0,15,30)或步进(*/5,从字段下限起每 5 个取一次)。全部字段都匹配任务才触发——有一个著名例外:当「日」和「周」两个字段都被限制时,匹配任一条件的日子都会触发。",
            "这条 OR 规则源自最初的 Unix cron 实现,目的是让「每月 1 号加上每个周一」这类组合在五个字段里也能表达。陷阱在于:多数人写 \"0 0 1 * 1\" 想要的是「每月第一个周一」,实际得到的是「每月 1 号加每个周一」,频率翻倍。需要 AND 语义时,惯用绕法是在任务内部做判断(比如把 date +%d 与目标日期比对),或改用触发条件更丰富的调度器。",
            "另一个意外是周日从 0 开始而不是周一,部分 cron 方言还接受 7 作为周日的第二个写法,另一些则直接拒绝。写名称——MON、SUN——彻底消除歧义,标准 cron 里没有任何代价。",
          ],
        },
        {
          heading: "时区与夏令时:计划悄悄坏掉的地方",
          paragraphs: [
            "cron 没有自己的时区——它在服务器时钟所在的时区触发。\"0 3 * * *\" 意味着服务器时间的凌晨 3 点;如果服务器在 UTC,那就是 UTC+8 地区的上午 11 点。把服务部署到云主机的团队经常忘了平台默认值:多数虚拟机无论公司在哪儿都用 UTC 启动,第一个迹象就是任务在「本地工作日的正中间」跑起来了。在主机上用 date 或 timedatectl 确认,或看看设置它的 /etc/default/cron 里的 TZ 行。",
            "夏令时每年两次加重这个问题。在实行夏令时的时区,凌晨 2:30 的任务在春季切换夜可能根本不触发(那一夜 2:30 不存在),秋季切换夜则隔一小时触发两次。固定用 UTC 的任务没有这个问题,但必须按 UTC 写:UTC crontab 里的 \"0 3 * * *\" 是 UTC 凌晨 3 点,不是本地 3 点。本工具的下次执行预览正是做了时区感知,让你看清服务器实际会做哪一种。",
            "实用的防御是验证而不是假设:把表达式贴进来,把显示切换到服务器的时区,核对接下来 5 次触发时间是否符合预期。能通过这道检查的计划,还值得在 crontab 注释里写一句——两年后调试它的那个人是你。",
          ],
        },
        {
          heading: "边界案例:短月、步进与日历坑",
          paragraphs: [
            "「日」字段里有两个值是漏跑事故的大头:31 和 30,再配上步进。\"0 0 */31 * *\" 并不是「每月最后一天」——它只在有 31 号的月份运行(1 月、3 月、5 月……),4 月和 6 月被无声跳过。同理 \"0 0 30 2 *\" 是永久空操作,因为 2 月永远没有 30 号。cron 不会告警,只是求值、发现不匹配而已。看一眼接下来 5 次执行时间为空或有大空档,是抓出这类问题最快的办法。",
            "步进从字段下限开始,而不是你偏好的偏移:分钟字段的 */10 是 0,10,20,30,40,50,不是 5,15,25。想换个锚点要显式写范围——5-59/10。crontab 文件里的引号也有讲究:经典 cron 把百分号(%)当换行处理,像 date +“%Y” 这样的命令必须把百分号转义成 \\%,否则命令中途断行。",
            "预览真实触发时间胜过读表达式,因为这些规则会互相作用:短月上的步进叠加星期限制,可能造成几周的空档。只做字段翻译的工具(解释 */31 的含义)发现不了;只有把日历往前迭代,才能看到任务真正何时运行。这正是本工具做的事——在你的浏览器里完成,任何调度数据都不外发。",
          ],
        },
      ],
    },
    ja: {
      name: "Cron 式解説ツール",
      tagline:
        "任意の cron 式を平易な言葉に翻訳:フィールドごとの分解、タイムゾーン切り替え付きの次回 5 回の実行時刻、ワンクリックのプリセット。",
      intro: [
        "cron 式は 5〜6 個の暗号的なフィールドでジョブの実行タイミングを決めます。1 文字でも間違えると、永遠に発火しないか、毎週日曜の午前 3 時にぴったり実行されるかもしれません。式を貼り付けると、各フィールド(分・時・日・月・曜日、秒があれば秒も)を平易な言葉で説明し、次の 5 回の実行時刻を表示して、スケジュールが意図どおりか確認できます。",
        "検証は正直でインラインです:範囲外の値、向きが逆の範囲、未対応の Quartz 拡張(L・W・#)には、曖昧ではなく具体的で親切なエラーを出します。毎分・毎時・毎日 0 時・平日 9 時・四半期ごとの 5 つの定番プリセットをワンクリックで呼び出せます。",
      ],
      steps: [
        "cron 式を入力するか、プリセットをクリックして開始します。",
        "フィールドごとの分解を読みます。",
        "次の 5 回の実行時刻を、ローカル時刻と UTC を切り替えながら確認します。",
        "想定と違えば crontab・スケジューラ設定・CI 設定を修正します。",
      ],
      faqs: [
        {
          q: "標準 cron と Quartz 構文の違いは?",
          a: "標準 Unix cron(および本ツール)は 5 フィールド:分・時・日・月・曜日で、秒があれば 6 フィールドです。Quartz は既定で秒フィールドを加え、7 つ目の年フィールドや、L(末日)・W(最近の平日)・#(n 番目の曜日、例:MON#2)といった拡張があります。これら Quartz 固有の拡張には未対応ですが、数値・JAN や MON のような名前・範囲・リスト・ステップといった標準構文にはすべて対応しています。",
        },
        {
          q: "次回実行時刻がサーバーと異なるのはなぜ?",
          a: "cron はサーバー自身のタイムゾーンで時刻を評価しますが、このツールはローカル時刻と UTC を切り替えられます。手元が UTC+8 でサーバーが UTC なら、「0 3 * * *」は両者で 8 時間ずれます。サマータイムの切替で wall-clock の時刻がずれたり飛んだりすることもあります。内部計算はタイムゾーンを考慮し、これらの切替を正しく処理します。",
        },
        {
          q: "「日」と「曜日」を両方書いたのに、思いのほか頻繁に実行されるのは?",
          a: "クラシックな cron はこの 2 つを OR で結合します。両フィールドが制限付き(* 以外)のとき、どちらかに一致する日で実行されます。「0 0 1 * MON」は毎月 1 日と毎週月曜に実行されます。両方を同時に満たしたい場合は式の組み立てを変える必要があります。ここで次回実行時刻を確認すれば挙動はすぐわかります。",
        },
      ],
      deepDive: [
        {
          heading: "5 つのフィールドと、誰も覚えていない OR 規則",
          paragraphs: [
            "標準 cron は左から右へ 5 フィールドを評価します。分(0-59)、時(0-23)、日(1-31)、月(1-12)、曜日(0-7、0 と 7 はどちらも日曜)。各フィールドは単一値、範囲(9-17)、リスト(0,15,30)、ステップ(*/5、フィールドの下限から 5 つおき)を取れます。すべてのフィールドが一致したときジョブが発火します——ただし有名な例外が一つ。「日」と「曜日」の両方が制限されている場合、どちらかに一致する日で発火します。",
            "この OR 規則は元の Unix cron の実装に由来し、「毎月 1 日プラス毎週月曜」のような組み合わせを 5 フィールドで表現可能にするために存在します。罠は、\"0 0 1 * 1\" を書くほとんどの人が「毎月第 1 月曜」を意図しているのに、実際には「毎月 1 日と毎週月曜」——頻度が 2 倍になることです。AND の意味が必要なら、慣用的な回避策はジョブ内部での判定(date +%d を目標日と比較するなど)か、より豊かなトリガーを持つスケジューラへの移行です。",
            "もう一つの意外な点は、曜日の番号が月曜ではなく日曜(0)から始まること、方言によっては 7 を日曜の別名として受け入れるものと拒否するものがあることです。名前(MON、SUN)で書けば曖昧さは完全に消え、標準 cron では何の代价もありません。",
          ],
        },
        {
          heading: "タイムゾーンとサマータイム:スケジュールが静かに壊れる場所",
          paragraphs: [
            "cron には独自のタイムゾーンがなく、サーバーの時計が設定されているゾーンで発火します。\"0 3 * * *\" はサーバー時刻の午前 3 時であり、サーバーが UTC なら UTC+8 地域では午前 11 時です。クラウド VM にデプロイするチームはプラットフォームのデフォルトを忘れがちです。多くの VM は企業の所在地に関係なく UTC で起動し、最初の兆候は「現地では就業時間のど真ん中」に走るジョブです。ホスト上で date や timedatectl で確認するか、設定されているなら /etc/default/cron の TZ 行を見てください。",
            "サマータイムは年に 2 度問題を悪化させます。DST を採用するゾーンでは、午前 2:30 のジョブは春の切替の夜にまったく発火しない可能性があり(2:30 は存在しない)、秋の切替の夜は 1 時間おきに 2 回発火します。UTC 固定のジョブにはこの問題がありませんが、UTC で書く必要があります。UTC の crontab での \"0 3 * * *\" は UTC の午前 3 時であって現地の午前 3 時ではありません。このツールの次回実行プレビューはタイムゾーンを考慮しているので、サーバーが実際にどちらを行うか見分けられます。",
            "実務的な防御は仮定ではなく検証です。式をここに貼り、表示をサーバーのゾーンに切り替え、次の 5 回の発火時刻を期待と照合する。このチェックを通過したスケジュールには、crontab のコメントに一言書き添える価値があります。2 年後にデバッグするのはあなた自身です。",
          ],
        },
        {
          heading: "境界ケース:短い月、ステップ、暦の罠",
          paragraphs: [
            "「日」フィールドの 31 と 30 は、失敗した実行の大きな割合を占めます。\"0 0 */31 * *\" は各月の最終日ではありません。31 日がある月(1 月、3 月、5 月……)だけが走り、4 月と 6 月は黙って飛ばされます。同様に \"0 0 30 2 *\" は恒久的な無動作です。2 月に 30 日は永遠にありません。cron は警告せず、評価して不一致を見つけるだけです。次の 5 回の実行時刻が空だったり間隔が大きかったりするのを見るのが、これを捉える最速の方法です。",
            "ステップの算術はフィールドの下限から始まり、あなたの選んだオフセットからではありません。分フィールドの */10 は 0,10,20,30,40,50 であって 5,15,25 ではありません。別の場所にアンカーするには範囲を明示します——5-59/10。crontab ファイル内のクォートも重要です。クラシックな cron はパーセント記号(%)を改行として扱うため、date +“%Y” のようなコマンドは \\% とエスケープする必要があります。さもないとコマンドの途中で行が切れます。",
            "実発火時刻のプレビューが式を読むことに勝るのは、これらの規則が相互作用するからです。短い月のステップに曜日制限が重なると、数週間の空白が生じ得ます。フィールドを翻訳するだけのツール(*/31 の意味を説明する)では表面化しません。暦を前へ進めて初めて、ジョブが実際にいつ走るかが見えます。それがまさにこのツールが行う反復で、ブラウザ内で完結し、スケジュールデータはどこにも送られません。",
          ],
        },
      ],
    },
    es: {
      name: "Explicador de expresiones cron",
      tagline:
        "Convierte cualquier expresión cron a lenguaje claro: desglose campo por campo, las próximas cinco ejecuciones en tu zona horaria y presets de un clic.",
      intro: [
        "Las expresiones cron son cinco o seis campos crípticos que deciden cuándo se ejecutan los trabajos — y un solo carácter equivocado puede programar nada en silencio, o disparar el trabajo a las 3 a.m. de cada domingo. Pega una expresión y esta herramienta explica cada campo en palabras sencillas (minuto, hora, día del mes, mes, día de la semana, y los segundos si están presentes), y muestra las próximas cinco ejecuciones para confirmar que la programación hace lo que crees.",
        "La validación es honesta e integrada: los valores fuera de rango, los rangos invertidos y las extensiones Quartz no admitidas como L, W y # producen un error específico y claro, no una encogimiento de hombros. Cinco ajustes predefinidos — cada minuto, cada hora, diario a medianoche, entre semana a las 9:00 y trimestral — están a un clic como punto de partida.",
      ],
      steps: [
        "Escribe una expresión cron o pulsa un ajuste predefinido para empezar con algo fiable.",
        "Lee el desglose campo por campo en lenguaje claro.",
        "Comprueba las próximas cinco ejecuciones, alternando entre hora local y UTC.",
        "Corrige lo que sorprenda en tu crontab, interfaz del planificador o configuración de CI.",
      ],
      faqs: [
        {
          q: "¿Qué diferencia hay entre cron estándar y la sintaxis de Quartz?",
          a: "El cron estándar de Unix (y esta herramienta) usa 5 campos: minuto, hora, día del mes, mes y día de la semana — 6 si el primero son segundos. Quartz añade segundos por defecto, un séptimo campo de año y extensiones como L (último día), W (día laborable más cercano) y # (enésimo día de la semana, p. ej. MON#2). Esas extensiones de Quartz no están cubiertas aquí; todo lo estándar — números, nombres como JAN y MON, rangos, listas y pasos — sí lo está.",
        },
        {
          q: "¿Por qué las próximas ejecuciones no coinciden con mi servidor?",
          a: "Cron evalúa las horas en la zona horaria del propio servidor, mientras que la herramienta puede mostrar la hora local o UTC. Si tu equipo va en UTC+8 y el servidor en UTC, «0 3 * * *» se ejecuta con ocho horas de diferencia entre ambos. Los cambios de horario de verano también pueden adelantar o saltar horas; el cálculo subyacente considera la zona horaria y gestiona esas transiciones.",
        },
        {
          q: "Puse día del mes y día de la semana a la vez, y se ejecuta más de lo esperado, ¿por qué?",
          a: "El cron clásico combina ambos con un OR: cuando los dos campos están restringidos (ninguno es *), un día que coincida con cualquiera dispara el trabajo. «0 0 1 * MON» se ejecuta el día 1 y todos los lunes. Si quieres cumplir ambas condiciones a la vez, la expresión necesita otra estructura — ver aquí las próximas ejecuciones hace el comportamiento visible al instante.",
        },
      ],
      deepDive: [
        {
          heading: "Los cinco campos y sus trampas",
          paragraphs: [
            "Un cron estándar son cinco campos — minuto, hora, día del mes, mes y día de la semana — separados por espacios. Cada campo acepta un valor, una lista, un rango, un paso (\*/15) y los especiales como \*. Las trampas viven en los detalles: el paso se aplica al inicio del rango, así que \*/15 en minutos dispara a :00, :15, :30 y :45, no cada 15 desde ahora.",
            "El truco de día es la fuente clásica de bugs: cuando tanto el día del mes como el día de la semana están restringidos (no \*), la mayoría de los crons ejecutan si CUALQUIERA de los dos coincide — no los dos. Un trabajo que pretendías \"el día 1, si es lunes\" se convierte en \"el día 1 O todos los lunes\". Esta ambigüedad histórica viene de las primeras implementaciones de Unix y sigue viva en la mayoría de sistemas.",
            "Hay siete campos si el planificador usa la extensión de segundos (Quartz, Spring, algunas bibliotecas de Node), y nombres como JAN o MON se aceptan según la implementación. Al pegar una expresión entre sistemas, verifica primero qué dialecto espera cada uno — este explicador sigue el cron estándar de cinco campos.",
          ],
        },
        {
          heading: "Zonas horarias y DST: donde las agendas se rompen",
          paragraphs: [
            "Cron no sabe de zonas horarias: dispara según el reloj del sistema donde corre el planificador. Un servidor en UTC y una reunión esperada en hora local difieren por el desfase — y ese desfase no es constante si hay horario de verano en cualquiera de los dos lados. Los trabajos que parecen \"cada día a las 9:00\" silenciosamente corren a las 8:00 durante medio año.",
            "El horario de verano añade sus propias aristas. La mayoría de los crons no \"recuperan\" una ejecución cuando el reloj retrocede, y la ejecución de las 2:30 desaparece por completo el día del salto de primavera — el trabajo simplemente no corre esa noche. Si un trabajo diario importa, programa en un cronmetro sin DST (UTC) o verifica cómo tu planificador maneja las transiciones.",
            "Los husos horarios con cambios legales recientes (han habido varios en la última década) se aplican cuando el sistema actualiza su base de datos tz — no al instante. Una programación validada hoy puede cambiar de hora efectiva tras una actualización del sistema, otra razón para re-verificar la próxima ejecución real en lugar de confiar en la expresión.",
          ],
        },
        {
          heading: "Del cron leído al cron confiable",
          paragraphs: [
            "Explicar la expresión es el primer paso; el segundo es comprobar la próxima ejecución real, no la que imaginas. \"0 9 \* \* 1-5\" es \"9:00 en días laborables\" solo si el sistema corre en tu zona horaria y no hay DST esa semana. El buen hábito es validar la expresión aquí y luego confirmar las próximas dos o tres ejecuciones en el propio planificador (cron -l, la UI del programador, los registros).",
            "La legibilidad también importa a largo plazo: \"0 3 \* \* 6\" puede ser correcto y aun así obligar a cada lector futuro a contar dedos. Comentar la expresión junto al trabajo (o usar un planificador que acepte descripciones) evita que el siguiente encargado de mantenimiento — normalmente tú en seis meses — reinterprete la intención.",
            "Este explicador funciona completamente en tu navegador: la expresión que pegas nunca sale de tu dispositivo, y el análisis es texto puro — sin acceso a tu crontab real, sin conexiones de red. Pega expresiones de producción con confianza.",
          ],
        },
      ],
    },
    pt: {
      name: "Explicador de expressões cron",
      tagline:
        "Transforma qualquer expressão cron em linguagem clara: análise campo a campo, as próximas cinco execuções no seu fuso e presets de um clique.",
      intro: [
        "Expressões cron são cinco ou seis campos crípticos que decidem quando os jobs rodam — e um único caractere errado pode agendar nada em silêncio, ou disparar às 3 da manhã de todo domingo. Cole uma expressão e esta ferramenta explica cada campo em palavras simples (minuto, hora, dia do mês, mês, dia da semana, além dos segundos quando presentes) e mostra as próximas cinco execuções para você confirmar que a agenda faz o que você imagina.",
        "A validação é honesta e integrada: valores fora da faixa, intervalos invertidos e extensões Quartz não suportadas como L, W e # geram um erro específico e amigável, não um ombro encolhido. Cinco presets comuns — a cada minuto, por hora, todo dia à meia-noite, dias úteis às 9:00 e trimestral — estão a um clique como ponto de partida.",
      ],
      steps: [
        "Digite uma expressão cron ou clique em um preset para começar de algo confiável.",
        "Leia a análise campo a campo em linguagem clara.",
        "Confira as próximas cinco execuções, alternando entre hora local e UTC.",
        "Corrija o que surpreender no seu crontab, painel do agendador ou configuração de CI.",
      ],
      faqs: [
        {
          q: "Qual a diferença entre cron padrão e a sintaxe Quartz?",
          a: "O cron padrão Unix (e esta ferramenta) usa 5 campos: minuto, hora, dia do mês, mês e dia da semana — 6 quando o primeiro são os segundos. O Quartz acrescenta segundos por padrão, um sétimo campo de ano e extensões como L (último dia), W (dia útil mais próximo) e # (n-ésimo dia da semana, ex.: MON#2). Essas extensões Quartz não são cobertas aqui; tudo o que é padrão — números, nomes como JAN e MON, intervalos, listas e passos — é.",
        },
        {
          q: "Por que as próximas execuções diferem do meu servidor?",
          a: "O cron avalia os horários no fuso do próprio servidor, enquanto a ferramenta pode mostrar hora local ou UTC. Se sua máquina está em UTC+8 e o servidor em UTC, «0 3 * * *» dispara oito horas de diferença entre os dois. Transições de horário de verão também podem adiantar ou pular horas; o cálculo subjacente considera o fuso e lida com essas transições.",
        },
        {
          q: "Escrevi dia do mês e dia da semana — por que roda mais vezes do que eu esperava?",
          a: "O cron clássico combina os dois com OR: quando ambos os campos são restritos (nenhum é *), um dia que corresponda a qualquer um dos dois dispara o job. «0 0 1 * MON» roda no dia 1 e em toda segunda-feira. Para exigir as duas condições ao mesmo tempo, a expressão precisa de outra estrutura — ver as próximas execuções aqui deixa o comportamento visível na hora.",
        },
      ],
      deepDive: [
        {
          heading: "Os cinco campos e suas armadilhas",
          paragraphs: [
            "Um cron padrão são cinco campos — minuto, hora, dia do mês, mês e dia da semana — separados por espaços. Cada campo aceita um valor, lista, intervalo, passo (\*/15) e os especiais como \*. As armadilhas moram nos detalhes: o passo parte do início da faixa, então \*/15 nos minutos dispara em :00, :15, :30 e :45 — não a cada 15 a partir de agora.",
            "O truque de dias é a fonte clássica de bugs: quando tanto o dia do mês quanto o dia da semana estão restringidos (não \*), a maioria dos crons executa se QUALQUER um casar — não os dois. Um trabalho pensado como \"dia 1, se for segunda\" vira \"dia 1 OU todas as segundas\". Essa ambiguidade vem das primeiras implementações Unix e segue viva na maioria dos sistemas.",
            "São sete campos se o agendador usa a extensão de segundos (Quartz, Spring, bibliotecas Node), e nomes como JAN ou MON são aceitos conforme a implementação. Ao colar uma expressão entre sistemas, verifique primeiro qual dialeto cada um espera — este explicador segue o cron padrão de cinco campos.",
          ],
        },
        {
          heading: "Fuso horário e horário de verão: onde as agendas quebram",
          paragraphs: [
            "Cron não entende de fuso: dispara pelo relógio do sistema onde o agendador roda. Um servidor em UTC e uma reunião esperada no horário local diferem pelo deslocamento — e esse deslocamento não é constante se houver horário de verão em qualquer lado. Trabalhos que parecem \"todo dia às 9:00\" silenciosamente rodam às 8:00 por meio ano.",
            "O horário de verão tem arestas próprias. A maioria dos crons não \"recupera\" uma execução quando o relógio volta, e a execução das 2:30 desaparece por inteiro no dia do salto de primavera — o trabalho simplesmente não roda naquela noite. Se um trabalho diário importa, agende num cronômetro sem horário de verão (UTC) ou verifique como seu agendador trata as transições.",
            "Fusos com mudanças legais recentes (houve várias na última década) valem quando o sistema atualiza sua base tz — não na hora. Uma agenda validada hoje pode mudar de hora efetiva após uma atualização do sistema, mais um motivo para conferir a próxima execução real em vez de confiar na expressão.",
          ],
        },
        {
          heading: "Do cron lido ao cron confiável",
          paragraphs: [
            "Explicar a expressão é o primeiro passo; o segundo é conferir a próxima execução real, não a que você imagina. \"0 9 \* \* 1-5\" é \"9:00 em dias úteis\" só se o sistema roda no seu fuso e não há horário de verão naquela semana. O bom hábito é validar a expressão aqui e depois confirmar as duas ou três próximas execuções no próprio agendador (crontab -l, a UI do scheduler, os logs).",
            "Legibilidade também importa no longo prazo: \"0 3 \* \* 6\" pode estar certo e ainda assim obrigar cada leitor futuro a contar nos dedos. Comentar a expressão junto ao trabalho (ou usar um agendador que aceite descrições) evita que o próximo responsável — normalmente você, em seis meses — reinterprete a intenção.",
            "Este explicador roda inteiro no seu navegador: a expressão colada nunca sai do seu dispositivo, e a análise é texto puro — sem acesso ao seu crontab real, sem conexões de rede. Cole expressões de produção com confiança.",
          ],
        },
      ],
      deepDive: [
        {
          heading: "Os cinco campos e a regra OR que ninguém lembra",
          paragraphs: [
            "O cron padrão avalia cinco campos da esquerda para a direita: minuto (0-59), hora (0-23), dia do mês (1-31), mês (1-12) e dia da semana (0-7, onde 0 e 7 são ambos domingo). Cada campo aceita um valor, um intervalo (9-17), uma lista (0,15,30) ou um passo (*/5, cada 5 valores a partir do piso do campo). Um job dispara quando todos os campos batem — com uma exceção famosa: quando tanto o dia do mês quanto o dia da semana estão restritos, o job roda num dia que corresponda a QUALQUER um dos dois.",
            "Essa regra OR vem da implementação original do Unix cron, e existe para que combinações como “dia 1 do mês mais toda segunda-feira” continuem expressáveis em cinco campos. A armadilha é que a maioria das pessoas que escreve “0 0 1 * 1” quer “a primeira segunda-feira do mês” — o que ela recebe é o dia 1 E toda segunda-feira, o dobro de vezes. Se você precisa de semântica AND, a solução usual é um teste dentro do job (comparar date +%d com o dia alvo) ou migrar para um agendador com gatilhos mais ricos.",
            "A outra surpresa é a numeração do dia da semana: começa no domingo (0), não na segunda, e alguns dialetos de cron aceitam 7 como segundo nome do domingo enquanto outros rejeitam. Escrever nomes — MON, SUN — elimina a ambiguidade por completo, sem custo algum no cron padrão.",
          ],
        },
        {
          heading: "Fusos horários e horário de verão: onde as agendas quebram em silêncio",
          paragraphs: [
            "O cron não tem fuso próprio — dispara no fuso em que o relógio do servidor estiver. Um job “0 3 * * *” roda às 3 da manhã do servidor, que são 11 da manhã em UTC+8 se o servidor está em UTC. Equipes que implantam em VMs na nuvem costumam esquecer o padrão da plataforma: a maioria das VMs inicia em UTC independentemente de onde fica a empresa, e o primeiro sinal é um job que roda em pleno expediente local. Confirme com date ou timedatectl no host, ou leia a linha TZ do /etc/default/cron onde estiver configurado.",
            "O horário de verão agrava o problema duas vezes por ano. Em zonas com DST, um job das 2:30 da manhã pode não rodar na noite do avanço de primavera (2:30 não existe naquela noite), e a noite do retorno de outono o dispara duas vezes — com uma hora de diferença. Jobs fixados em UTC não têm esse problema mas precisam ser escritos em UTC: “0 3 * * *” num crontab UTC significa 3 da manhã UTC, não 3 da manhã locais. A prévia das próximas execuções desta ferramenta considera o fuso justamente para você ver qual das duas o seu servidor fará.",
            "A defesa prática é verificar, não presumir: cole a expressão aqui, mude a exibição para o fuso do servidor e confira as próximas cinco execuções contra o esperado. Uma agenda que sobrevive a essa checagem também merece uma anotação no comentário do crontab — a pessoa que vai depurá-la daqui a dois anos é você.",
          ],
        },
        {
          heading: "Casos de borda: meses curtos, passos e armadilhas do calendário",
          paragraphs: [
            "Dois valores de dia do mês respondem por boa parte das execuções perdidas: 31 e 30, em combinação com passos. “0 0 */31 * *” não roda no último dia de cada mês — roda só em meses que têm dia 31 (janeiro, março, maio...), pulando abril e junho em silêncio. Da mesma forma “0 0 30 2 *” é uma não-operação permanente, porque fevereiro nunca tem 30 dias. O cron não avisa; apenas avalia e não encontra correspondência. Ver as próximas cinco execuções vazias ou com lacunas grandes é a forma mais rápida de detectar isso.",
            "A aritmética dos passos parte do piso do campo, não do deslocamento que você escolher: */10 no campo de minutos é 0,10,20,30,40,50, não 5,15,25. Para ancorar de outro jeito, escreva o intervalo explícito — 5-59/10. As aspas também importam dentro de arquivos crontab: o cron clássico trata sinais de porcentagem (%) como quebras de linha, então um comando como date +“%Y” precisa escapar o porcento como \% ou a linha quebra no meio do comando.",
            "Pré-visualizar execuções reais supera ler a expressão porque essas regras interagem: um passo sobre um mês de 30 dias mais uma restrição de dia da semana pode produzir um intervalo de semanas. Ferramentas que só traduzem os campos (explicar o que significa */31) não conseguem revelar isso; só iterar o calendário para frente mostra quando o job vai rodar de fato. Essa iteração é exatamente o que esta ferramenta faz, no seu navegador, sem enviar dados da agenda a lugar nenhum.",
          ],
        },
      ],
    },
  },
});
