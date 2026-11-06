import { CalcEngineStopwatch } from "../_engines/calc-engine-stopwatch";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "stopwatch",
  category: "utility",
  icon: "clock",
  engine: { component: CalcEngineStopwatch },
  related: ["countdown-timer", "pace-calculator", "sleep-calculator", "workdays-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Stopwatch",
      tagline: "A precise online stopwatch with lap times — start, pause, lap and reset, with drift-free timing anchored to the system clock.",
      intro: [
        "Measures elapsed time to the hundredth of a second using the system clock rather than accumulated intervals, so it stays accurate even when the browser throttles a background tab.",
        "Record laps while running; each lap shows its own split and the running total, and the display uses large tabular digits so splits stay readable at a glance.",
        "Elapsed time is computed from system-clock timestamps rather than summing timer callbacks, so background-tab throttling and UI lag cannot accumulate error; the display reads to the hundredth of a second. Each lap records both its own split and the running total from the same anchored clock.",
        "Compared with a phone's default clock, the large tabular digits and one-touch lap row are built for glancing between reps mid-effort, and because splits share the anchored clock they always add up. Closing the tab resets everything; nothing is recorded or shared. For sport officiating, dedicated hardware remains the reference — browsers do not guarantee millisecond precision.",
      ],
      steps: [
        "Click Start to begin timing.",
        "Click Lap to record a split without stopping the clock.",
        "Pause, resume or reset at any time.",
      ],
      faqs: [
        {
          q: "Is it accurate?",
          a: "Yes — elapsed time is derived from Date.now() against a fixed start timestamp, not accumulated timer callbacks, so background-tab throttling cannot cause drift.",
        },
        {
          q: "Do laps survive a page reload?",
          a: "No — like a physical stopwatch, resetting or reloading clears the session. Keep the tab open to preserve laps.",
        },
      ],
      deepDive: [
        {
          heading: "Why timers accumulate error — and why this one does not",
          paragraphs: [
            "A stopwatch built on setInterval accumulates one second per callback, and that design carries three distinct sources of error: callbacks fire late when the main thread is busy, browsers throttle background tabs (sometimes to once per second or far worse), and every small delay is added to the accumulated total rather than corrected. Over a ten-minute run, seconds of drift are realistic; over an hour, minutes.",
            "This stopwatch computes elapsed time as Date.now() minus a fixed start timestamp. The browser's system clock is the single source of truth, so no matter how laggy the tab becomes or how aggressively it is throttled, the next repaint shows the true elapsed time. Pauses are handled the same way — the resume records a new anchored segment rather than trusting any counted value.",
            "The display shows hundredths of a second because the underlying clock easily resolves them, but honesty matters here too: what the digits guarantee is the arithmetic, not the reflexes of whoever pressed Start. Human reaction time of a tenth or two dwarfs any computational error in this design — which is why officiating bodies still use dedicated hardware with physical contact or photo sensors.",
          ],
        },
        {
          heading: "How laps and splits stay consistent",
          paragraphs: [
            "Each lap stamps the same anchored clock at the moment you press Lap: its split is the time since the previous lap stamp, and its total is the time since start. Because both come from subtracting real timestamps — never from adding up intervals — every column is self-consistent no matter how many laps you take or how lagged the click was.",
            "That consistency is worth checking when comparing stopwatches: in a timer that accumulates, the splits may not sum exactly to the total, and the discrepancy grows with throttling and load. Here the sum of the splits equals the final total by construction — the numbers cannot disagree with each other.",
            "Closing or reloading the tab clears the session, and that is deliberate: no storage means nothing to leak and nothing to reset wrongly. If you need the numbers, read them (or screenshot them) before closing — the tool behaves like a physical device, not a database.",
          ],
        },
        {
          heading: "Where a browser stopwatch fits",
          paragraphs: [
            "Good fits: training intervals where the athlete reads their own time, meeting and presentation rehearsal, timing builds or renders, classroom demonstrations, cooking steps that need per-step timing. The large tabular digits exist precisely because the reader is often mid-effort and glances for half a second.",
            "Poor fits: competition officiating, reaction-time experiments, billing-grade time tracking. In those settings the hundredth-of-a-second display overpromises — the button press itself is the least precise component — and dedicated equipment or software with keyboard-level event capture is the better instrument.",
            "Like everything on this page, timing runs entirely in your browser: nothing is recorded, transmitted or shared, and the stopwatch works offline. Session data lives only in page memory, so a power user timing something sensitive never has to wonder where the numbers went.",
          ],
        },
      ],
    },
    zh: {
      name: "秒表",
      tagline: "精确到百分之一秒的在线秒表,支持计次——锚定系统时钟不漂移,后台标签页也准确。",
      intro: [
        "基于系统时钟测量,精确到百分之一秒,而非累加定时器回调——即使浏览器对后台标签页限速也不会累积误差。",
        "运行中可随时计次,每条显示单圈与累计时间;大号等宽数字,一眼可读。",
      ],
      steps: [
        "点击“开始”计时。",
        "点击“计次”记录分圈,不停止计时。",
        "随时暂停、继续或重置。",
      ],
      faqs: [
        {
          q: "准确吗?",
          a: "准确——耗时取自 Date.now() 与固定起点之差,而非累加定时器回调,后台限速不会造成漂移。",
        },
        {
          q: "刷新后计次还在吗?",
          a: "不在——和实体秒表一样,重置或刷新即清空。保留计次请保持页面打开。",
        },
      ],
      deepDive: [
        {
          heading: "计时器为什么会累积误差——本秒表为什么不会",
          paragraphs: [
            "用 setInterval 搭的秒表每回调一次就累加一秒,这种设计带着三个互相独立的误差源:主线程忙时回调晚触发、浏览器对后台标签页限流(粗到每秒一次甚至更慢)、而且每次小延迟都被加进累计值而不是被纠正。跑十分钟,漂移几秒很现实;跑一小时,漂移几分钟。",
            "本秒表用 Date.now() 减去固定的起始时刻来计算耗时。系统时钟是唯一事实来源,所以无论标签页多卡、被限流得多狠,下一次重绘显示的都是真实耗时。暂停也一样处理——恢复时记录一段新的锚定区间,而不是相信任何被数出来的值。",
            "显示精确到百分之一秒,因为底层时钟轻松分辨得出;但这里也要诚实:数字保证的是算术,不是按表那个人的反应。一两百毫秒的人类反应时间,比这种设计里的任何计算误差都大一个数量级——这也是为什么正式赛事仍在用带物理接触或光电传感的专用计时设备。",
          ],
        },
        {
          heading: "计次与分圈为什么始终一致",
          paragraphs: [
            "每按一次计次,都给同一个锚定时钟打一个时间戳:单圈等于距上一个计次戳的差,累计等于距起点的差。两者都来自真实时间戳相减——从不靠区间相加——所以不管计多少次、点击滞后多少,每一列都自洽。",
            "对比秒表时这一点值得检验:累积型计时器的分圈加起来未必等于总数,而且偏差随限流和负载变大。这里分圈之和在构造上就等于最终总数——数字之间不可能互相矛盾。",
            "关闭或刷新页面即清空会话,这是有意为之:不存储就没有可泄露的东西,也没有会被错误重置的东西。需要数字就在关页前读掉(或截图)——它的行为像一台设备,不像一个数据库。",
          ],
        },
        {
          heading: "浏览器秒表的适用场景",
          paragraphs: [
            "适合:运动员自己读表的训练间歇、会议与演讲排练、构建或渲染计时、课堂演示、需要逐步计时的烹饪步骤。大号等宽数字之所以存在,正因为读者往往正处在发力当中,只有半秒钟的余光。",
            "不适合:正式赛事裁判、反应时间实验、计费级工时统计。这些场景里百分之一秒的显示是在开空头支票——按钮本身才是最不精确的部件——专用设备或能捕捉键盘级事件的软件才是对的仪器。",
            "和本页所有功能一样,计时完全在浏览器里进行:不记录、不传输、不共享,离线可用。会话数据只活在页面内存里,计时敏感内容的人不必担心数字去了哪里。",
          ],
        },
      ],
    },
    ja: {
      name: "ストップウォッチ",
      tagline: "1/100 秒精度のオンライン ストップウォッチ。ラップ計測対応、システム時計基準で狂みません。",
      intro: [
        "累積タイマーではなくシステム時計との差で 1/100 秒単位まで計測するため、バックグラウンドタブの制限がかかっても精度は保たれます。",
        "実行中にラップを記録でき、各ラップの分割時間と累計を大きな等幅数字で表示します。",
      ],
      steps: [
        "スタートで計測を開始します。",
        "ラップで停止せずに分割時間を記録します。",
        "一時停止・再開・リセットはいつでも可能です。",
      ],
      faqs: [
        {
          q: "精度は?",
          a: "はい。経過時間は Date.now() と固定の開始時刻の差から算出し、タイマー コールバックの積み上げではないため、バックグラウンドの制限でも誤差は出ません。",
        },
        {
          q: "再読み込み後もラップは残りますか?",
          a: "残りません。実物のストップウォッチ同様、リセットや再読み込みで消えます。ラップを残すにはタブを開いたままにしてください。",
        },
      ],
      deepDive: [
        {
          heading: "タイマーが誤差を積む理由、この秒表が積まない理由",
          paragraphs: [
            "setInterval で作ったストップウォッチはコールバックごとに 1 秒を積み上げます。この設計には独立した誤差源が 3 つあります。メインスレッドが忙しいとコールバックが遅れること、ブラウザがバックグラウンドタブのタイマーを制限すること(1 秒に 1 回、さらに粗いことも)、そして小さな遅れのたびに訂正ではなく累計に加算してしまうこと。10 分なら数秒のずれが現実的で、1 時間なら数分に達します。",
            "この秒表は Date.now() から固定の開始時刻を引くだけで経過時間を求めます。システム時計が唯一の真実の源なので、タブがどれだけ重くても制限されていても、次の再描画は本当の経過時間を示します。一時停止も同じ方式で、再開時には数え上げた値を信用せず新しい固定区間を記録します。",
            "表示が 1/100 秒まであるのは、元の時計がそれを容易に分解できるからです。ただしここでも正直さが要ります。数字が保証するのは算術であって、スタートを押した人の反射ではありません。人間の反応時間の 0.1〜0.2 秒は、この設計のどんな計算誤差より一桁大きい。だからこそ公式の計時には、物理接触や光センサーを持つ専用機材が今も使われるのです。",
          ],
        },
        {
          heading: "ラップと分割が常に一致する仕組み",
          paragraphs: [
            "ラップを押した瞬間に、同じ固定時計へ時刻が刻まれます。その分割は直前のラップ時刻からの差、累計はスタートからの差です。どちらも実時刻の引き算から出ていて区間の加算には頼らないため、ラップをいくつ打っても、クリックがどれだけ遅れても、すべての列が自己整合します。",
            "他のストップウォッチと比べるとき、この整合性は確認する価値があります。累積型では分割の合計が総合計と厳密に合わないことがあり、ずれは制限と負荷とともに育ちます。こちらは構造上、分割の和が最終計に等しい。数字同士が食い違うことがありません。",
            "タブを閉じたり再読み込みしたりするとセッションは消えます。これは意図的です。保存がなければ漏れるものも、誤って復元されるものもない。数字が必要なら閉じる前に読む(またはスクリーンショットを撮る)。この道具はデータベースではなく、実機のように振る舞います。",
          ],
        },
        {
          heading: "ブラウザ秒表が合う場所・合わない場所",
          paragraphs: [
            "合う例:選手自身がタイムを読むトレーニングのインターバル、会議や発表のリハーサル、ビルドやレンダリングの計測、授業でのデモ、工程ごとに計る調理。大きな等幅数字があるのは、読む人が運動の最中で半秒だけ視線を落とすことが多いからです。",
            "合わない例:競技の審判、反応時間の実験、請求レベルの工数管理。こうした場面では 1/100 秒の表示は盛り過ぎです。押すボタン自体が最も精度の低い部品であり、専用機材やキーボード級のイベントを捕まえられるソフトウェアが正しい計器です。",
            "このページのすべてと同様、計時は完全にブラウザ内で行われます。記録・送信・共有はなく、オフラインで動きます。セッションデータはページのメモリにだけ住むので、機微なものを計る人も、数字の行き先を気にする必要がありません。",
          ],
        },
      ],
    },
    es: {
      name: "Cronómetro",
      tagline: "Cronómetro online preciso hasta centésimas con vueltas — anclado al reloj del sistema, sin desviaciones.",
      intro: [
        "Mide el tiempo transcurrido a centésimas usando el reloj del sistema en lugar de intervalos acumulados, así que sigue exacto aunque el navegador ralentice la pestaña.",
        "Registra vueltas en marcha: cada vuelta muestra su parcial y el total acumulado, con dígitos grandes tabulares legibles de un vistazo.",
      ],
      steps: [
        "Pulsa Iniciar para empezar.",
        "Pulsa Vuelta para registrar un parcial sin detener el reloj.",
        "Pausa, reanuda o reinicia cuando quieras.",
      ],
      faqs: [
        {
          q: "¿Es preciso?",
          a: "Sí: el tiempo se deriva de Date.now() contra una marca de inicio fija, no de callbacks acumulados, así que la limitación de pestañas en segundo plano no causa desvío.",
        },
        {
          q: "¿Las vueltas sobreviven a una recarga?",
          a: "No — como un cronómetro físico, reiniciar o recargar borra la sesión. Mantén la pestaña abierta para conservarlas.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué los temporizadores acumulan error — y este no",
          paragraphs: [
            "Un cronómetro construido sobre setInterval acumula un segundo por callback, y ese diseño arrastra tres fuentes de error independientes: los callbacks llegan tarde cuando el hilo principal está ocupado, los navegadores ralentizan las pestañas de fondo (a veces a una vez por segundo o peor), y cada pequeño retraso se suma al total acumulado en lugar de corregirse. En una carrera de diez minutos, segundos de desvío son realistas; en una hora, minutos.",
            "Este cronómetro calcula el tiempo transcurrido como Date.now() menos una marca de inicio fija. El reloj del sistema es la única fuente de verdad, así que por muy pesada que esté la pestaña o por agresiva que sea su ralentización, el siguiente repintado muestra el tiempo real. Las pausas se tratan igual — al reanudar se graba un nuevo segmento anclado en vez de fiarse de ningún valor contado.",
            "La pantalla muestra centésimas porque el reloj subyacente las resuelve de sobra, pero aquí también importa la honestidad: lo que los dígitos garantizan es la aritmética, no los reflejos de quien pulsó Iniciar. Una reacción humana de una o dos décimas supera en un orden de magnitud cualquier error de cálculo de este diseño — por eso los organismos de arbitraje siguen usando hardware dedicado con contacto físico o sensores fotoeléctricos.",
          ],
        },
        {
          heading: "Cómo las vueltas y parciales se mantienen coherentes",
          paragraphs: [
            "Cada vuelta marca el mismo reloj anclado en el momento de pulsar Vuelta: su parcial es el tiempo desde la marca anterior, y su total el tiempo desde el inicio. Como ambos salen de restar marcas reales — nunca de sumar intervalos — todas las columnas son autoconsistentes por muchas vueltas que tome y por retrasada que haya ido la pulsación.",
            "Esa coherencia vale la pena verificarla al comparar cronómetros: en uno que acumula, los parciales pueden no sumar exactamente el total, y la discrepancia crece con la ralentización y la carga. Aquí la suma de los parciales es igual al total por construcción — los números no pueden discrepar entre sí.",
            "Cerrar o recargar la pestaña borra la sesión, y es deliberado: sin almacenamiento no hay nada que filtrar ni nada que restaurar mal. Si necesita las cifras, léalas (o haga una captura) antes de cerrar — la herramienta se comporta como un aparato físico, no como una base de datos.",
          ],
        },
        {
          heading: "Dónde encaja un cronómetro de navegador",
          paragraphs: [
            "Buenos encajes: intervalos de entrenamiento donde el deportista lee su propio tiempo, ensayo de reuniones y presentaciones, cronometrar compilaciones o renderizados, demostraciones en clase, pasos de cocina que necesitan tiempo por paso. Los dígitos tabulares grandes existen precisamente porque quien lee suele estar a medio esfuerzo y solo mira medio segundo.",
            "Malos encajes: arbitraje de competición, experimentos de tiempo de reacción, registro de horas con valor de facturación. En esos entornos la pantalla de centésimas promete de más — la pulsación del botón es el componente menos preciso — y el instrumento adecuado es equipo dedicado o software que capture eventos a nivel de teclado.",
            "Como todo en esta página, la medición corre por completo en su navegador: nada se guarda, se transmite o se comparte, y funciona sin conexión. Los datos de sesión viven solo en la memoria de la página, así que quien cronometra algo sensible nunca tiene que preguntarse dónde acabaron las cifras.",
          ],
        },
      ],
    },
    pt: {
      name: "Cronômetro",
      tagline: "Cronômetro online preciso até centésimos com voltas — ancorado no relógio do sistema, sem desvios.",
      intro: [
        "Mede o tempo decorrido em centésimos usando o relógio do sistema em vez de intervalos acumulados, então continua exato mesmo com a aba limitada.",
        "Registre voltas em execução: cada volta mostra o parcial e o total acumulado, com dígitos grandes tabulares legíveis de relance.",
      ],
      steps: [
        "Clique em Iniciar para começar.",
        "Clique em Volta para registrar um parcial sem parar o relógio.",
        "Pause, retome ou zere quando quiser.",
      ],
      faqs: [
        {
          q: "É preciso?",
          a: "Sim — o tempo vem de Date.now() contra uma marca de início fixa, não de callbacks acumulados, então limitação de aba em segundo plano não causa desvio.",
        },
        {
          q: "As voltas sobrevivem a um recarregamento?",
          a: "Não — como um cronômetro físico, zerar ou recarregar limpa a sessão. Mantenha a aba aberta para preservá-las.",
        },
      ],
      deepDive: [
        {
          heading: "Por que temporizadores acumulam erro — e este não",
          paragraphs: [
            "Um cronômetro construído sobre setInterval acumula um segundo por callback, e esse design carrega três fontes de erro independentes: os callbacks atrasam quando a thread principal está ocupada, os navegadores limitam abas de fundo (às vezes a uma vez por segundo ou pior), e cada pequeno atraso é somado ao total acumulado em vez de corrigido. Em uma corrida de dez minutos, segundos de desvio são realistas; em uma hora, minutos.",
            "Este cronômetro calcula o tempo decorrido como Date.now() menos uma marca de início fixa. O relógio do sistema é a única fonte de verdade, então por mais pesada que fique a aba ou por mais agressiva que seja a limitação, o próximo redesenho mostra o tempo real. As pausas seguem o mesmo caminho — ao retomar, grava-se um novo segmento ancorado em vez de confiar em qualquer valor contado.",
            "O visor mostra centésimos porque o relógio subjacente os resolve com folga, mas aqui a honestidade também importa: o que os dígitos garantem é a aritmética, não os reflexos de quem apertou Iniciar. Um tempo de reação humano de uma ou duas décimas supera em uma ordem de grandeza qualquer erro de cálculo deste design — por isso órgãos de arbitragem continuam usando equipamento dedicado com contato físico ou sensores fotoelétricos.",
          ],
        },
        {
          heading: "Como voltas e parciais se mantêm coerentes",
          paragraphs: [
            "Cada volta carimba o mesmo relógio ancorado no momento em que você aperta Volta: o parcial é o tempo desde a marca anterior, e o total é o tempo desde o início. Como ambos vêm de subtrair marcas reais — nunca de somar intervalos — todas as colunas são autoconsistentes por mais voltas que você dê e por atrasado que tenha ido o clique.",
            "Essa coerência vale a pena conferir ao comparar cronômetros: num que acumula, os parciais podem não somar exatamente o total, e a discrepância cresce com a limitação e a carga. Aqui a soma dos parciais é igual ao total por construção — os números não podem discordar entre si.",
            "Fechar ou recarregar a aba limpa a sessão, e isso é deliberado: sem armazenamento não há nada para vazar nem nada para restaurar errado. Se precisa dos números, leia-os (ou faça uma captura) antes de fechar — a ferramenta se comporta como um aparelho físico, não como um banco de dados.",
          ],
        },
        {
          heading: "Onde um cronômetro de navegador se encaixa",
          paragraphs: [
            "Bons encaixes: intervalos de treino em que o atleta lê o próprio tempo, ensaio de reuniões e apresentações, cronometrar builds ou renderizações, demonstrações em sala de aula, etapas de cozinha que precisam de tempo por etapa. Os dígitos tabulares grandes existem justamente porque quem lê costuma estar em pleno esforço e só olha por meio segundo.",
            "Maus encaixes: arbitragem de competição, experimentos de tempo de reação, registro de horas com valor de faturamento. Nesses cenários o visor de centésimos promete demais — o aperto do botão é o componente menos preciso — e o instrumento adequado é equipamento dedicado ou software que capture eventos a nível de teclado.",
            "Como tudo nesta página, a medição roda inteiramente no seu navegador: nada é gravado, transmitido ou compartilhado, e funciona offline. Os dados da sessão vivem apenas na memória da página, então quem cronometra algo sensível nunca precisa se perguntar para onde foram os números.",
          ],
        },
      ],
    },
  },
});
