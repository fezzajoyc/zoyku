import { CalcEngineCountdown } from "../_engines/calc-engine-countdown";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "countdown-timer",
  category: "utility",
  icon: "clock",
  engine: { component: CalcEngineCountdown },
  related: ["stopwatch", "sleep-calculator", "word-counter", "random-number", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Countdown Timer",
      tagline: "Set a countdown with a progress ring and a chime at zero — 1 to 25 minute presets or any custom duration.",
      intro: [
        "A clean countdown for cooking, workouts, meetings and study sessions. The ring shows progress at a glance, and a short synthesized chime plays when time is up.",
        "The deadline is anchored to the system clock, so the countdown keeps running correctly even if you switch to another tab.",
        "The remaining time is derived from wall-clock timestamps rather than a decrementing counter, so a throttled background tab or a sleeping display cannot make it drift — the ring is always exactly right relative to the deadline. The chime is synthesized with the Web Audio API, so no audio file needs to load.",
        "Compared with a phone's clock app, the large ring and minutes-remaining readout are designed to be readable from across a kitchen or a meeting room, and nothing is shared or stored. Browsers require a user gesture before audio can play — press Start on the page once so the sound is permitted when time runs out.",
      ],
      steps: [
        "Set hours, minutes and seconds — or tap a quick preset.",
        "Click Start; the ring drains as time passes.",
        "A chime plays and the ring turns green at zero.",
      ],
      faqs: [
        {
          q: "Does it keep running in a background tab?",
          a: "Yes — the deadline is anchored to the system clock, so switching tabs or throttling does not affect the remaining time.",
        },
        {
          q: "Will I hear the chime?",
          a: "It is a short synthesized tone via WebAudio. Keep the tab unmuted and your device volume up; there is no audio file to download.",
        },
      ],
      deepDive: [
        {
          heading: "Why countdowns drift — and how this one avoids it",
          paragraphs: [
            "The naive way to build a timer is setInterval that subtracts one second per tick. It fails for a structural reason: setInterval is a request, not a promise. Browsers throttle timers in background tabs — historically to around once per second or far coarser — so a 10-minute timer in an inactive tab can silently count for far longer than ten minutes. Timer-based alarms in browsers are a well-known source of “it went off late” bugs.",
            "This tool takes the opposite approach: when you press Start it records one wall-clock deadline, and every display update recomputes the remaining time as deadline minus now. The ticking you see may pause while the tab is throttled, but the underlying target never moves, so the moment the page repaints, the ring and the digits are already correct. Put simply: the timer can be late to render, but never late to be right.",
            "The same anchoring is why sleeping displays and heavy CPU load do not accumulate error — there is nothing to accumulate, since no counter is being incremented. The trade-off is that the chime itself still depends on the tab being alive enough to run its callback; for timers where a late alarm is unacceptable (exams, precisely-timed cooking), a hardware timer remains the more defensive choice.",
          ],
        },
        {
          heading: "The chime, browsers and audio policy",
          paragraphs: [
            "The chime is synthesized with the Web Audio API — an oscillator generating the tone at runtime rather than an audio file being downloaded. That keeps the page light and makes the sound work offline. It also explains one constraint: browsers require a user gesture (a click or keypress on the page) before audio may play, a policy aimed at blocking autoplaying advertising. Pressing Start once satisfies it, which is why the first start matters.",
            "If the tab ends up muted or the device volume is off, the chime is silenced and there is no fallback sound — browsers do not let a page override system mute. Visual signals are kept as the second channel: the ring turning green at zero is the state you can catch in a glance even when the sound did not carry.",
            "Nothing about the timer touches a server: duration, presets and state live in the page's memory, and closing the tab ends everything. There is no notification permission prompt, no service worker, no background push — the countdown lives exactly as long as the tab does.",
          ],
        },
        {
          heading: "Choosing a duration and using presets",
          paragraphs: [
            "The 1-to-25-minute presets exist because most real countdowns cluster in that band: tea brewing (2–5 minutes), Pomodoro-style focus blocks (25), meeting timeboxes (5–15), workouts and rest intervals. Tapping a preset is faster than typing minutes and seconds and avoids the classic mistake of entering minutes into the seconds field.",
            "For anything longer than an hour, a countdown is usually the wrong shape — a deadline anchored to a clock (what time is it finishing?) survives tab closures better than an elapsed-duration display. This tool handles short, at-a-glance spans; for day-scale planning, a date or countdown-to-date tool is the better fit.",
            "Being purely local also has a quiet benefit in shared spaces: no account, no banner ads refreshing next to your timer, and nothing about what you are timing leaves the device — which matters when the timer is on a screen visible to a classroom or a meeting room.",
          ],
        },
      ],
    },
    zh: {
      name: "倒计时器",
      tagline: "带进度环的倒计时,归零有提示音,1–25 分钟快捷预设或任意时长,后台标签页照常计时。",
      intro: [
        "为烹饪、锻炼、会议和学习准备的干净倒计时:进度环一眼可读,归零时播放一段合成提示音。",
        "截止时间锚定系统时钟——切到其他标签页,倒计时依旧准确。",
      ],
      steps: [
        "设置时/分/秒,或点快捷预设。",
        "点击“开始”,进度环随时间消耗。",
        "归零时播放提示音,进度环变绿。",
      ],
      faqs: [
        {
          q: "后台标签页还计时吗?",
          a: "计时——截止时间锚定系统时钟,切换标签页或被限速都不影响剩余时间。",
        },
        {
          q: "能听到提示音吗?",
          a: "是一段 WebAudio 合成短音。保持标签页未静音并打开设备音量即可,无需下载音频文件。",
        },
      ],
      deepDive: [
        {
          heading: "倒计时为什么会漂——本工具如何避免",
          paragraphs: [
            "最朴素的计时器写法是 setInterval 每秒减一。它在结构上注定失败:setInterval 是请求,不是承诺。浏览器会对后台标签页里的定时器限流——历来粗到每秒一次甚至更慢——所以置于非活动标签页的 10 分钟计时器,实际可能跑得远超十分钟。浏览器里“闹钟晚响”类的 bug,绝大多数源于此。",
            "本工具反其道而行:按下开始时只记录一个墙上时钟的截止时刻,之后每次刷新界面都重新计算“截止时刻减当前时间”。标签页被限流时,你看到的走动可能暂停,但底层目标从未移动——页面一重绘,进度环和数字立刻是准的。简单说:显示可以迟到,但永远不会迟到地变对。",
            "同样的锚定方式也解释了为什么休眠的屏幕和高 CPU 负载不会累积误差——根本没有东西在被累加,因为不存在一个自增的计数器。代价是提示音本身仍依赖标签页活着跑到回调;对晚响不可接受的场景(考试、掐秒的烹饪),硬件计时器仍是更稳妥的选择。",
          ],
        },
        {
          heading: "提示音、浏览器与音频策略",
          paragraphs: [
            "提示音由 Web Audio API 实时合成——振荡器在运行时生成音色,而不是下载音频文件。页面因此很轻,声音离线也能用。这也解释了一个限制:浏览器要求先有用户手势(在页面上点一下或按个键)才允许出声,这是针对自动播放广告的策略。按一次“开始”即满足条件,所以第一次开始很关键。",
            "如果标签页被静音或设备音量为零,提示音就没了,也没有后备音——浏览器不允许网页覆盖系统静音。视觉信号因此被保留为第二通道:归零时进度环变绿,声音没传到也能一眼捕捉。",
            "计时全程不碰服务器:时长、预设和状态都活在页面内存里,关掉标签页一切结束。没有通知权限弹窗,没有 service worker,没有后台推送——倒计时的生命与标签页等长。",
          ],
        },
        {
          heading: "选时长与用预设",
          paragraphs: [
            "1–25 分钟的预设存在,是因为大多数真实倒计时聚在这个区间:泡茶(2–5 分钟)、番茄工作法专注块(25)、会议限时(5–15)、训练与间歇。点预设比敲分钟秒更快,也避免经典的“把分钟输进秒栏”错误。",
            "超过一小时的计时,倒计时往往不是对的形态——锚定时钟的截止时刻(几点结束?)比“还剩多久”更能活过标签页关闭。本工具适合短时、一眼可读的场景;以天为单位的规划,交给日期类工具更合适。",
            "纯本地运行还有个安静的好处:共享空间里没有账号、没有计时器旁边刷新的广告横幅,你在计什么也留在设备上——当计时器放在教室或会议室里人人可见时,这一点很重要。",
          ],
        },
      ],
    },
    ja: {
      name: "カウントダウンタイマー",
      tagline: "プログレス リング付きのカウントダウン。ゼロでチャイム、1〜25 分のプリセットや自由な時間設定に対応。",
      intro: [
        "料理・運動・会議・勉強向けのシンプルなカウントダウン。リングで進捗がひと目でわかり、ゼロで短い合成チャイムが鳴ります。",
        "締切はシステム時計に固定されているため、別タブに移動してもカウントダウンは正確に続きます。",
      ],
      steps: [
        "時・分・秒を設定、またはプリセットをタップ。",
        "スタートを押すとリングが減っていきます。",
        "ゼロでチャイムが鳴り、リングが緑になります。",
      ],
      faqs: [
        {
          q: "バックグラウンドでも動きますか?",
          a: "はい。締切はシステム時計に固定されているため、タブ切り替えや制限があっても残り時間に影響しません。",
        },
        {
          q: "チャイムは聞こえますか?",
          a: "WebAudio の短い合成音です。タブをミュートせず、端末の音量を上げてください。音声ファイルのダウンロードは不要です。",
        },
      ],
      deepDive: [
        {
          heading: "カウントダウンがずれる理由と、このツールの回避策",
          paragraphs: [
            "素朴なタイマー実装は setInterval で 1 チックごとに 1 秒減らすやり方です。これは構造的な理由で失敗します。setInterval は約束ではなく要求だからです。ブラウザはバックグラウンドタブのタイマーを throttling します(歴史的には 1 秒に 1 回、さらに粗いことも)。つまり非アクティブタブの 10 分タイマーは、実際には 10 分を大きく超えて動き続けることがあります。ブラウザで「アラームが遅れる」類のバグの大半はここに由来します。",
            "このツールは逆を行きます。スタートを押した時点で壁時計の締切時刻を 1 つ記録し、以後の表示更新はすべて「締切 − 現在時刻」を再計算します。タブが制限されている間、見えている進行は止まっているかもしれませんが、根元の目標は動きません。ページが再描画した瞬間、リングと数字はすでに正しい。要するに、表示は遅れても正しさは遅れないのです。",
            "同じ固定方式ゆえに、画面のスリープや高負荷も誤差を積み上げません。積むべきカウンタが存在しないからです。代償として、チャイム自体はタブがコールバックを走らせられる程度には生きている必要があります。遅延が許されない用途(試験、秒まで測る料理)では、ハードウェアタイマーのほうが防御的です。",
          ],
        },
        {
          heading: "チャイム・ブラウザ・音声ポリシー",
          paragraphs: [
            "チャイムは Web Audio API で合成します。音声ファイルをダウンロードするのではなく、オシレーターが実行時に波形を生成します。ページは軽く、音はオフラインでも鳴ります。ここから制約も説明できます。ブラウザはページ上のユーザー操作(クリックやキー入力)より前に音を出すことを許しません。自動再生広告を防ぐポリシーです。スタートを 1 回押せば条件を満たすので、最初のスタートに意味があります。",
            "タブがミュートされていたり端末の音量がゼロだったりすると、チャイムは鳴らず、代替音もありません。ページはシステムのミュートを上書きできないからです。だからこそ視覚信号が第二の経路として残されています。ゼロでリングが緑になる状態は、音が届かなかったとしても一瞥で捉えられます。",
            "タイマーはサーバーに一切触れません。時間設定・プリセット・状態はページのメモリに住み、タブを閉じればすべて終わりです。通知の権限ダイアログも service worker もバックグラウンド通知もなく、カウントダウンの寿命はタブの寿命と同じです。",
          ],
        },
        {
          heading: "時間の選び方とプリセット",
          paragraphs: [
            "1〜25 分のプリセットがあるのは、実際のカウントダウンの大半がこの帯域に集まるからです。茶の浸し(2〜5 分)、ポモドーロ式の集中ブロック(25)、会議のタイムボックス(5〜15)、トレーニングとインターバル。プリセットを叩くほうが分秒を打ち込むより速く、定番ミスの「秒の欄に分を入れる」も避けられます。",
            "1 時間を超える計時には、カウントダウンはたいてい不向きな形です。時計に固定した締切時刻(何時に終わるか)のほうが、タブを閉じても生き残ります。このツールは短時間・ひと目で読める区間の担当。日単位の計画は日付系ツールのほうが適任です。",
            "純ローカルであることには静かな利点もあります。共有スペースでアカウントも、タイマーの横で更新される広告バナーもなく、何を計っているかが端末の外に出ません。タイマーが教室や会議室で多くの人に見える画面に置かれているとき、これは重要です。",
          ],
        },
      ],
    },
    es: {
      name: "Temporizador",
      tagline: "Cuenta atrás con anillo de progreso y aviso sonoro al terminar — presets de 1 a 25 minutos o cualquier duración.",
      intro: [
        "Una cuenta atrás limpia para cocinar, entrenar, reuniones y estudio: el anillo muestra el avance de un vistazo y suena un tono sintetizado al terminar.",
        "La fecha límite está anclada al reloj del sistema, así que la cuenta atrás sigue correcta aunque cambies de pestaña.",
      ],
      steps: [
        "Ajusta horas, minutos y segundos, o toca un preset.",
        "Pulsa Iniciar; el anillo se vacía con el tiempo.",
        "Suena un tono y el anillo se pone verde al llegar a cero.",
      ],
      faqs: [
        {
          q: "¿Sigue corriendo en segunda pestaña?",
          a: "Sí — la fecha límite está anclada al reloj del sistema; cambiar de pestaña o la limitación no afectan al tiempo restante.",
        },
        {
          q: "¿Oiré el aviso?",
          a: "Es un tono corto sintetizado con WebAudio. Deja la pestaña sin silenciar y con volumen; no hay archivo de audio que descargar.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué se desvían las cuentas atrás — y cómo esta lo evita",
          paragraphs: [
            "La forma ingenua de construir un temporizador es un setInterval que resta un segundo por latido. Falla por una razón estructural: setInterval es una petición, no una promesa. Los navegadores ralentizan los temporizadores en pestañas de segundo plano — históricamente a una vez por segundo o mucho más grueso — así que un temporizador de 10 minutos en una pestaña inactiva puede seguir contando mucho más de diez minutos. Los temporizadores de navegador son una fuente clásica de avisos que suenan tarde.",
            "Esta herramienta hace justo lo contrario: al pulsar Iniciar registra una única fecha límite de reloj, y cada actualización de pantalla recalcula el tiempo restante como fecha límite menos ahora. El avance que usted ve puede pausarse mientras la pestaña está ralentizada, pero el objetivo de fondo nunca se mueve — en cuanto la página se repinta, el anillo y los dígitos ya están correctos. Dicho rápido: la pantalla puede llegar tarde, pero nunca llega tarde a estar bien.",
            "El mismo anclaje explica por qué pantallas en reposo y cargas pesadas de CPU no acumulan error — no hay nada que acumular, porque no existe un contador que se incremente. La contrapartida es que el aviso sigue dependiendo de que la pestaña esté viva como para ejecutar su callback; para temporizadores donde un aviso tardío es inaceptable (exámenes, cocina al segundo), un temporizador de hardware sigue siendo la opción más defensiva.",
          ],
        },
        {
          heading: "El aviso, los navegadores y la política de audio",
          paragraphs: [
            "El aviso se sintetiza con la Web Audio API — un oscilador genera el tono en tiempo real en lugar de descargar un archivo de audio. Eso mantiene la página ligera y hace que el sonido funcione sin conexión. También explica una restricción: los navegadores exigen un gesto del usuario (un clic o tecla en la página) antes de permitir audio, una política contra la publicidad que se auto-reproduce. Pulsar Iniciar una vez lo satisface, y por eso el primer inicio importa.",
            "Si la pestaña queda silenciada o el volumen del equipo está a cero, el aviso se apaga y no hay sonido de reserva — los navegadores no permiten que una página anule el silencio del sistema. Por eso las señales visuales se mantienen como segundo canal: el anillo que se pone verde al llegar a cero es el estado que se capta de un vistazo incluso cuando el sonido no llegó.",
            "Nada del temporizador toca un servidor: duración, presets y estado viven en la memoria de la página, y cerrar la pestaña lo termina todo. No hay aviso de permiso de notificaciones, ni service worker, ni push en segundo plano — la cuenta atrás vive exactamente lo que vive la pestaña.",
          ],
        },
        {
          heading: "Elegir la duración y usar los presets",
          paragraphs: [
            "Los presets de 1 a 25 minutos existen porque casi todas las cuentas atrás reales se apiñan en esa franja: infusiones (2–5 minutos), bloques de concentración tipo Pomodoro (25), límites de reunión (5–15), series y descansos de entrenamiento. Tocar un preset es más rápido que teclear minutos y segundos y evita el clásico error de escribir los minutos en el campo de los segundos.",
            "Para tramos de más de una hora, una cuenta atrás suele ser la forma equivocada — un plazo anclado al reloj (¿a qué hora termina?) sobrevive mejor al cierre de pestañas que una pantalla de duración restante. Esta herramienta cubre los tramos cortos de un vistazo; para planificar a escala de días, una herramienta de fechas encaja mejor.",
            "Funcionar solo en local tiene además un beneficio silencioso en espacios compartidos: sin cuenta, sin banners de publicidad refrescándose junto al temporizador, y nada de lo que está cronometrando sale del dispositivo — algo que importa cuando el temporizador está en una pantalla que ve toda un aula o una sala de reuniones.",
          ],
        },
      ],
    },
    pt: {
      name: "Temporizador de contagem regressiva",
      tagline: "Contagem regressiva com anel de progresso e som ao zerar — presets de 1 a 25 minutos ou qualquer duração.",
      intro: [
        "Uma contagem regressiva limpa para cozinha, treinos, reuniões e estudo: o anel mostra o progresso de relance e um tom sintetizado toca ao zerar.",
        "O prazo fica ancorado no relógio do sistema — a contagem continua correta mesmo se você mudar de aba.",
      ],
      steps: [
        "Defina horas, minutos e segundos, ou toque um preset.",
        "Clique em Iniciar; o anel esvazia com o tempo.",
        "Um som toca e o anel fica verde ao chegar em zero.",
      ],
      faqs: [
        {
          q: "Continua em aba de fundo?",
          a: "Sim — o prazo fica ancorado no relógio do sistema; mudar de aba ou a limitação não afetam o tempo restante.",
        },
        {
          q: "Vou ouvir o som?",
          a: "É um tom curto sintetizado via WebAudio. Mantenha a aba sem mudo e com volume; não há arquivo de áudio para baixar.",
        },
      ],
      deepDive: [
        {
          heading: "Por que contagens regressivas derivam — e como esta evita",
          paragraphs: [
            "O jeito ingênuo de construir um temporizador é um setInterval que subtrai um segundo por tique. Ele falha por um motivo estrutural: setInterval é um pedido, não uma promessa. Navegadores limitam temporizadores em abas de fundo — historicamente a uma vez por segundo ou bem mais grosso — então um temporizador de 10 minutos numa aba inativa pode continuar contando por bem mais de dez minutos. Temporizadores de navegador são uma fonte clássica de alarmes que atrasam.",
            "Esta ferramenta faz o oposto: ao clicar em Iniciar ela registra um único prazo de relógio, e toda atualização de tela recalcula o tempo restante como prazo menos agora. O andamento que você vê pode pausar enquanto a aba está limitada, mas o alvo de fundo nunca se move — no instante em que a página se redesenha, o anel e os dígitos já estão corretos. Em resumo: a tela pode chegar atrasada, mas nunca chega atrasada para estar certa.",
            "A mesma ancoragem explica por que telas dormindo e carga pesada de CPU não acumulam erro — não há nada para acumular, porque não existe um contador sendo incrementado. A contrapartida é que o som ainda depende da aba estar viva o suficiente para rodar seu callback; para temporizadores em que um alarme atrasado é inaceitável (provas, cozinha cronometrada ao segundo), um temporizador de hardware continua sendo a escolha mais defensiva.",
          ],
        },
        {
          heading: "O som, os navegadores e a política de áudio",
          paragraphs: [
            "O som é sintetizado com a Web Audio API — um oscilador gera o tom em tempo de execução em vez de baixar um arquivo de áudio. Isso mantém a página leve e faz o som funcionar offline. Também explica uma restrição: navegadores exigem um gesto do usuário (um clique ou tecla na página) antes de permitir áudio, uma política contra publicidade que se auto-reproduz. Pressionar Iniciar uma vez satisfaz a regra — por isso o primeiro início importa.",
            "Se a aba ficar sem som ou o volume do aparelho estiver em zero, o som se cala e não há som reserva — navegadores não deixam uma página anular o mudo do sistema. Por isso os sinais visuais ficam como segundo canal: o anel ficando verde no zero é o estado que se captura num relance mesmo quando o som não chegou.",
            "Nada do temporizador toca um servidor: duração, presets e estado vivem na memória da página, e fechar a aba termina tudo. Sem pedido de permissão de notificação, sem service worker, sem push em segundo plano — a contagem regressiva vive exatamente o que a aba vive.",
          ],
        },
        {
          heading: "Escolhendo a duração e usando os presets",
          paragraphs: [
            "Os presets de 1 a 25 minutos existem porque quase todas as contagens regressivas reais se aglomeram nessa faixa: infusões (2–5 minutos), blocos de foco estilo Pomodoro (25), limites de reunião (5–15), séries e intervalos de treino. Tocar um preset é mais rápido que digitar minutos e segundos e evita o erro clássico de digitar os minutos no campo dos segundos.",
            "Para qualquer coisa acima de uma hora, uma contagem regressiva costuma ser a forma errada — um prazo ancorado no relógio (a que horas termina?) sobrevive melhor ao fechamento de abas do que uma tela de duração restante. Esta ferramenta cuida dos trechos curtos de relance; para planejamento em escala de dias, uma ferramenta de datas é mais adequada.",
            "Rodar só em local tem ainda um benefício silencioso em espaços compartilhados: sem conta, sem banners de propaganda se atualizando ao lado do temporizador, e nada do que você está cronometrando sai do aparelho — algo que importa quando o temporizador está numa tela visível para uma sala de aula inteira ou uma sala de reunião.",
          ],
        },
      ],
    },
  },
});
