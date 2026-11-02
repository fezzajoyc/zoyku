import { DevCronExplainerEngine } from "../_engines/dev-cron-explainer";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "cron-explainer",
  category: "developer",
  icon: "clock",
  engine: { component: DevCronExplainerEngine },
  related: ["http-status-codes", "url-parser", "regex-tester", "jwt-decoder"],
  copy: {
    en: {
      name: "Cron Explainer",
      tagline:
        "Turn any cron expression into plain language: a field-by-field breakdown, the next five run times in your timezone, and one-click presets.",
      intro: [
        "Cron expressions are five or six cryptic fields that decide when jobs run — and a single wrong character can silently schedule nothing, or fire at 3 a.m. every Sunday. Paste an expression and this tool explains each field in plain words (minute, hour, day of month, month, day of week, plus seconds when present), then shows the next five execution times so you can confirm the schedule does what you think it does.",
        "Validation is honest and inline: out-of-range values, backwards ranges and unsupported Quartz extensions like L, W and # get a specific, friendly error instead of a shrug. Five common presets — every minute, hourly, daily at midnight, weekdays at 9:00 and quarterly — are one click away as starting points.",
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
    },
  },
});
