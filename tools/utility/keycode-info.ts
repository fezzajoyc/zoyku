import { UtilEngineKeycode } from "../_engines/util-engine-keycode";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "keycode-info",
  category: "utility",
  icon: "key",
  engine: { component: UtilEngineKeycode },
  related: ["text-to-unicode", "random-number", "password-generator", "base64-encoder", "html-escape", "hash-generator"],
  copy: {
    en: {
      name: "Keycode Info",
      tagline: "Press any key to see its event.key, event.code and legacy keyCode live, plus modifier state and a history of your last 10 keystrokes.",
      intro: [
        "Keyboard handling bugs usually come from mixing up the three identifying values a KeyboardEvent offers: event.key is the character produced (\"a\" or \"A\" when Shift is held), event.code is the physical key (KeyA regardless of layout), and keyCode is the legacy numeric code that old code still depends on. Pressing keys on this page shows all three side by side, instantly, along with which modifiers were down at that moment.",
        "It also keeps the last 10 keystrokes in a small history table, so you can compare values across keys instead of pressing and forgetting. Useful when wiring up game controls, shortcut listeners, or debugging why a keydown handler fires twice (turn on ignore-repeat to filter auto-repeat).",
      
        "The three identifiers answer different questions: event.key is the semantic character ('a' vs 'A' vs 'Enter'), event.code is the physical position on a US-layout keyboard ('KeyA' regardless of layout), and keyCode/which is the legacy numeric code old code still uses. Modifier state (Shift/Ctrl/Alt/Meta) is reported at the moment of the event, not queried later.",
        "Compared with console.logging inside your app (which requires opening devtools and wiring the handler), pressing keys on this page shows all three values plus modifiers side by side instantly, and the 10-keystroke history lets you compare values across keys. Useful when a keydown handler seems to fire twice — the ignore-repeat toggle filters the auto-repeat events so you see only the first.",
      ],
      steps: [
        "Click anywhere on the page so it has keyboard focus, then press any key.",
        "Read event.key, event.code and keyCode from the three cards, with Ctrl/Alt/Shift/Meta highlighted when held.",
        "Toggle \"ignore auto-repeat\" to filter held-down key repeats, and check the last-10 table to compare keys.",
      ],
      faqs: [
        {
          q: "Why do event.key and event.code show different values for the same key?",
          a: "event.key reports what the key produces under the current layout and modifier state (\"A\", \"á\", \"1\"), while event.code reports the physical key position (KeyA, Digit1) independent of layout. Shortcuts should generally match on code; text handling should read key.",
        },
        {
          q: "Is keyCode deprecated?",
          a: "Yes — it is legacy, kept only for compatibility with old code that still branches on numeric codes like 13 (Enter) or 27 (Escape). New code should use event.key or event.code; this tool shows it so you can map old constants while migrating.",
        },
        {
          q: "Why does the same value repeat while I hold a key down?",
          a: "Holding a key makes the OS send repeated keydown events with repeat set to true. Enable \"ignore auto-repeat\" to display only the initial press; disable it if you need to verify that your handler correctly receives repeat events.",
        },
      ],
      deepDive: [
        {
          heading: "keyCode is deprecated — here is the landscape",
          paragraphs: [
            "The numeric key codes this tool displays come from the original KeyboardEvent.keyCode and which properties, introduced in the 1990s and now formally deprecated. They remain the most widely known key identifiers because decades of tutorials, libraries and Stack Overflow answers are built on them — but the standard that replaced them is KeyboardEvent.key (the character, like \"a\" or \"ArrowLeft\") and KeyboardEvent.code (the physical key, like \"KeyA\" or \"ArrowLeft\").",
            "The distinction matters: key respects the keyboard layout (pressing the key next to Tab on a French AZERTY produces a different key value than on a US QWERTY), while code always identifies the same physical position. For game controls and shortcut systems, code is usually right; for text handling, key is right.",
            "keyCode's other problem is inconsistency: arrow keys, function keys and some numpad keys had browser- and platform-dependent values, and legacy handling of dead keys and IME input varies. New code should treat this tool's numbers as reference for reading old code, not as what to write.",
          ],
        },
        {
          heading: "Reading key identifiers in practice",
          paragraphs: [
            "The three properties answer different questions: keyCode (deprecated) gives a number, key gives what the press means, code gives where the key sits. The same physical key press can report key \"a\" with code \"KeyA\"; with Shift held, key becomes \"A\" while code stays \"KeyA\". Holding a modifier changes key but never code.",
            "The Escape key is a stable case (key \"Escape\", code \"Escape\", keyCode 27 — the one legacy number almost everyone memorized). Space is a trap: its key value is \" \" (a literal space), not \"Space\", which has broken many naive switch statements.",
            "For shortcuts, listen for code when the binding is positional (WASD movement) and key when it is typographic (Ctrl+Shift+P should work on AZERTY too). And use e.repeat to ignore auto-repeat when a shortcut should fire once per press.",
          ],
        },
        {
          heading: "Reference lookup, offline",
          paragraphs: [
            "The tool displays the numeric code alongside the modern key and code values, so you can translate an old snippet's keyCode 188 into its modern equivalents without opening a browser debugger and pressing keys one by one.",
            "Everything is a static table rendered in your browser — no network request, works with no connection, and nothing about your keyboard is reported anywhere.",
            "When writing new event handlers, test on a real keyboard of your target users' layout, because layout-dependent values differ more than any table can show. This page is the dictionary; your keyboard is the field test.",
          ],
        },
      ],
    },
    zh: {
      name: "键盘键码查询",
      tagline: "按下任意键,实时显示 event.key、event.code 与旧式 keyCode,并高亮修饰键状态,附带最近 10 次按键历史表。",
      intro: [
        "键盘处理的 bug 常常源于混淆 KeyboardEvent 提供的三个标识值:event.key 是按键产生的字符(按住 Shift 时 \"a\" 会变成 \"A\"),event.code 是物理键位(无论什么布局都是 KeyA),keyCode 是旧代码仍在依赖的数字键码。在本页按键,三个值并排即时显示,同时高亮当时按下的修饰键。",
        "页面还保留最近 10 次按键的小型历史表,方便跨按键对比数值,而不是按完就忘。接游戏按键、快捷键监听,或排查 keydown 为何触发两次(开启忽略重复可过滤长按自动重复)时都很有用。",
      ],
      steps: [
        "点击页面任意位置让页面获得键盘焦点,然后按下任意键。",
        "从三张卡片读取 event.key、event.code 和 keyCode;按住 Ctrl/Alt/Shift/Meta 时对应标签会点亮。",
        "切换\"忽略自动重复\"过滤长按连发,并在最近 10 次表中对比不同按键的取值。",
      ],
      faqs: [
        {
          q: "同一个键的 event.key 和 event.code 为什么不同?",
          a: "event.key 报告当前布局和修饰键状态下产生的字符(\"A\"、\"á\"、\"1\"),event.code 报告与布局无关的物理键位(KeyA、Digit1)。快捷键一般应匹配 code,文本处理应读取 key。",
        },
        {
          q: "keyCode 已经废弃了吗?",
          a: "是的——它是旧式接口,仅为兼容仍按数字码(如 13 回车、27 Esc)分支的老代码而保留。新代码应使用 event.key 或 event.code;本工具显示它,是为了在迁移期间能查到旧常量的对应值。",
        },
        {
          q: "按住键不动时为什么同一个值不断出现?",
          a: "长按会触发操作系统的重复 keydown 事件,repeat 为 true。开启\"忽略自动重复\"后只显示首次按下;若要验证处理器是否正确接收重复事件,可以关闭它。",
        },
      ],
      deepDive: [
        {
          heading: "keyCode 已弃用——看清现状",
          paragraphs: [
            "本工具显示的数字键码来自最早的 KeyboardEvent.keyCode 和 which 属性——上世纪 90 年代引入、如今已正式弃用。它们仍是最广为人知的按键标识,因为几十年的教程、类库和 Stack Overflow 回答都建立在上面——但取代它们的标准是 KeyboardEvent.key(字符本身,如 “a”“ArrowLeft”)和 KeyboardEvent.code(物理按键,如 “KeyA”“ArrowLeft”)。",
            "这个区分很重要:key 遵循键盘布局(在法语 AZERTY 上按 Tab 旁边的键,得到的 key 与美式 QWERTY 不同),而 code 永远标识同一个物理位置。游戏操作和快捷键系统通常该用 code;文本处理该用 key。",
            "keyCode 的另一个问题是不一致:方向键、功能键和部分小键盘的取值依赖浏览器和平台,死键和输入法的历史行为也各有差异。新代码应当把本工具的数字当作“读旧代码的参考”,而不是“照着写的东西”。",
          ],
        },
        {
          heading: "实践中怎么读按键标识",
          paragraphs: [
            "三个属性回答三个不同的问题:keyCode(已弃用)给数字,key 给按键的含义,code 给按键的位置。同一次物理按下可以同时报 key “a” 和 code “KeyA”;按住 Shift,key 变成 “A”,code 仍是 “KeyA”。修饰键改变 key,永远不改变 code。",
            "Escape 是稳定的案例(key “Escape”、code “Escape”、keyCode 27——几乎人人记过的那个遗老数字)。Space 是陷阱:它的 key 值是 “ ”(一个真正的空格),不是 “Space”,不少朴素 switch 语句栽在这里。",
            "做快捷键时,绑定是位置性的(WASD 移动)就监听 code,是排印性的(Ctrl+Shift+P 在 AZERTY 上也应生效)就监听 key。另外用 e.repeat 忽略自动重复,让快捷键每次按下只触发一次。",
          ],
        },
        {
          heading: "离线的参考查询",
          paragraphs: [
            "工具把数字键码与现代化的 key、code 值并排显示,让你不用打开浏览器调试器逐个按键,就能把旧代码里的 keyCode 188 翻译成对应的现代写法。",
            "一切是浏览器里渲染的静态表——没有网络请求、断网可用,你的键盘信息不会上报到任何地方。",
            "写新的事件处理时,要在目标用户布局的真实键盘上测试,因为布局相关的取值差异比任何表格能展示的都大。本页是词典,你的键盘才是实测场。",
          ],
        },
      ],
    },
    ja: {
      name: "キーコード確認",
      tagline: "任意のキーを押すと event.key・event.code・旧 keyCode をリアルタイム表示。修飾キーの状態と直近10キーの履歴テーブルも付きます。",
      intro: [
        "キーボード処理のバグは、KeyboardEvent が持つ3つの識別値の混同から起こりがちです。event.key は現在の状態で生成される文字(Shift 同時押しでは \"a\" が \"A\" に)、event.code はレイアウトに依存しない物理キー(KeyA)、keyCode は旧コードが今も参照する数値コードです。このページでキーを押すと3つの値が並んで即時表示され、押されている修飾キーも点灯します。",
        "直近10キーの履歴テーブルも保持するので、押して忘れるのではなく複数キーの値を比較できます。ゲーム操作やショートカットの実装、keydown が二重に発火する原因の調査(リピート無視で長押しの連続発火を除外)に役立ちます。",
      ],
      steps: [
        "ページのどこかをクリックしてフォーカスを与え、任意のキーを押します。",
        "3枚のカードで event.key・event.code・keyCode を読み、押されている Ctrl/Alt/Shift/Meta を確認します。",
        "「自動リピートを無視」を切り替えて長押しの連続発火を除外し、直近10キーの表で値を比較します。",
      ],
      faqs: [
        {
          q: "同じキーで event.key と event.code が違うのはなぜですか?",
          a: "event.key は現在のレイアウトと修飾キー状態で生成される文字(\"A\"、\"á\"、\"1\")、event.code はレイアウト非依存の物理位置(KeyA、Digit1)です。ショートカットは原則 code で判定し、文字処理では key を読みます。",
        },
        {
          q: "keyCode は非推奨ですか?",
          a: "はい。旧式であり、13(Enter)や27(Esc)のような数値コードに分岐するレガシーコードとの互換のためだけに残されています。新規コードは event.key か event.code を使い、移行中の旧定数の確認にこのツールをどうぞ。",
        },
        {
          q: "キーを押し続けると同じ値が繰り返し出るのは?",
          a: "長押しで OS が repeat=true の keydown を連発するためです。「自動リピートを無視」を有効にすると初回のみ表示し、リピートイベントの受信を確認したい場合は無効のままにします。",
        },
      ],
      deepDive: [
        {
          heading: "keyCode は非推奨——現在地を整理する",
          paragraphs: [
            "このツールが示す数字のキーコードは、当初の KeyboardEvent.keyCode と which に由来します。1990 年代に導入され、現在は正式に非推奨です。それでも最も広く知られたキー識別子なのは、数十年分のチュートリアル・ライブラリ・Stack Overflow の回答がその上に築かれているからです。ただし置き換える標準は KeyboardEvent.key(文字そのもの、例「a」「ArrowLeft」)と KeyboardEvent.code(物理キー、例「KeyA」「ArrowLeft」)です。",
            "区別は重要です。key はキーボードレイアウトに従い(フランス語 AZERTY で Tab の隣のキーを押すと、米国 QWERTY とは別の key が得られる)、code は常に同じ物理位置を示します。ゲームの操作やショートカットの仕組みでは通常 code が正しく、テキスト処理では key が正しい。",
            "keyCode のもう一つの問題は不整合です。矢印キー、ファンクションキー、テンキーの一部はブラウザとプラットフォーム依存の値を持ち、デッドキーや IME 入力の扱いも古い実装間で揺れます。新しいコードでは、このツールの数字は古いコードを読むための参照であって、書くべきものではありません。",
          ],
        },
        {
          heading: "実務でのキー識別子の読み方",
          paragraphs: [
            "3 つのプロパティは異なる問いに答えます。keyCode(非推奨)は数字、key は押下の意味、code はキーの位置。同じ物理押下は key「a」と code「KeyA」を同時に報告し得ます。Shift を押していれば key は「A」になり、code は「KeyA」のままです。修飾キーは key を変え、code は決して変えません。",
            "Escape は安定した例です(key「Escape」、code「Escape」、keyCode 27——ほぼ全員が暗記した遺物の数字)。Space は罠で、key の値は「Space」ではなく「 」(文字どおりの空白)であり、素朴な switch 文を何度も壊してきました。",
            "ショートカットでは、割り当てが位置的(WASD 移動)なら code を、組版的(Ctrl+Shift+P は AZERTY でも効くべき)なら key を listen します。さらに e.repeat で自動リピートを無視すれば、ショートカットは 1 押下につき 1 回だけ発火します。",
          ],
        },
        {
          heading: "オフラインの参照引き",
          paragraphs: [
            "ツールは数字のコードとモダンな key・code の値を並べて表示するので、ブラウザのデバッガを開いてキーを 1 個ずつ押すことなく、古いスニペットの keyCode 188 を現代の等価物に翻訳できます。",
            "すべてはブラウザに描画される静的な表です。ネットワーク要求はなく、接続なしで動き、キーボードに関する何も報告しません。",
            "新しいイベントハンドラを書くときは、対象ユーザーのレイアウトの実キーボードで試してください。レイアウト依存の値の差は、どの表が示せるより大きいからです。このページは辞書で、あなたのキーボードが実地試験です。",
          ],
        },
      ],
    },
    es: {
      name: "Códigos de teclado",
      tagline: "Pulse cualquier tecla para ver en vivo su event.key, event.code y keyCode clásico, más el estado de las modificadoras y el historial de sus últimas 10 teclas.",
      intro: [
        "Los fallos de teclado suelen venir de confundir los tres valores que ofrece un KeyboardEvent: event.key es el carácter producido (\"a\" o \"A\" con Shift), event.code es la tecla física (KeyA sin importar la distribución) y keyCode es el código numérico heredado del que el código viejo aún depende. Al pulsar teclas aquí, los tres aparecen en paralelo al instante, junto con las modificadoras pulsadas en ese momento.",
        "Además guarda las últimas 10 pulsaciones en una tabla de historial, para comparar valores entre teclas en vez de pulsar y olvidar. Útil para controles de juego, atajos de teclado o depurar por qué un manejador keydown se dispara dos veces (active ignorar repetición para filtrar la auto-repetición).",
      ],
      steps: [
        "Haga clic en cualquier parte de la página para darle foco de teclado y pulse una tecla.",
        "Lea event.key, event.code y keyCode en las tres tarjetas; Ctrl/Alt/Shift/Meta se iluminan mientras estén pulsadas.",
        "Active \"ignorar repetición automática\" para filtrar las repeticiones y compare teclas en la tabla de las últimas 10.",
      ],
      faqs: [
        {
          q: "¿Por qué event.key y event.code difieren para la misma tecla?",
          a: "event.key indica el carácter producido con la distribución y modificadoras actuales (\"A\", \"á\", \"1\"), mientras event.code indica la posición física (KeyA, Digit1) independiente de la distribución. Los atajos deberían comparar code; el manejo de texto debería leer key.",
        },
        {
          q: "¿keyCode está obsoleto?",
          a: "Sí: es heredado y se mantiene solo por compatibilidad con código antiguo que decide por números como 13 (Enter) o 27 (Escape). El código nuevo debe usar event.key o event.code; esta herramienta lo muestra para mapear constantes antiguas durante la migración.",
        },
        {
          q: "¿Por qué se repite el mismo valor al mantener pulsada una tecla?",
          a: "Mantener pulsada una tecla hace que el SO envíe eventos keydown repetidos con repeat a true. Active \"ignorar repetición automática\" para mostrar solo la pulsación inicial; desactívelo si necesita verificar que su manejador recibe los eventos repetidos.",
        },
      ],
      deepDive: [
        {
          heading: "keyCode está obsoleto — el panorama",
          paragraphs: [
            "Los códigos numéricos que muestra esta herramienta vienen de los propiedades originales KeyboardEvent.keyCode y which, introducidos en los años 90 y hoy formalmente obsoletos. Siguen siendo los identificadores de teclas más conocidos porque décadas de tutoriales, librerías y respuestas de Stack Overflow están construidos sobre ellos — pero el estándar que los reemplaza es KeyboardEvent.key (el carácter, como \"a\" o \"ArrowLeft\") y KeyboardEvent.code (la tecla física, como \"KeyA\" o \"ArrowLeft\").",
            "La distinción importa: key respeta la distribución del teclado (pulsar la tecla junto a Tab en un AZERTY francés produce un valor distinto que en un QWERTY estadounidense), mientras que code siempre identifica la misma posición física. Para controles de juego y sistemas de atajos, suele ser correcto code; para manejo de texto, key.",
            "El otro problema de keyCode es la inconsistencia: las flechas, las teclas de función y algunas del teclado numérico tenían valores dependientes del navegador y la plataforma, y el manejo legado de teclas muertas y entrada IME varía. El código nuevo debe tratar los números de esta herramienta como referencia para leer código viejo, no como lo que hay que escribir.",
          ],
        },
        {
          heading: "Leer identificadores de teclas en la práctica",
          paragraphs: [
            "Las tres propiedades responden preguntas distintas: keyCode (obsoleto) da un número, key da lo que significa la pulsación, code da dónde está la tecla. La misma pulsación física puede reportar key \"a\" con code \"KeyA\"; con Shift pulsado, key pasa a \"A\" mientras code sigue siendo \"KeyA\". Un modificador cambia key y nunca code.",
            "Escape es un caso estable (key \"Escape\", code \"Escape\", keyCode 27 — el número del legado que casi todo el mundo memorizó). Espacio es una trampa: su valor de key es \" \" (un espacio literal), no \"Space\", lo que ha roto muchos switch ingenuos.",
            "Para atajos, escucha code cuando la asignación es posicional (movimiento WASD) y key cuando es tipográfica (Ctrl+Shift+P debería funcionar también en AZERTY). Y usa e.repeat para ignorar la repetición automática cuando un atajo debe dispararse una vez por pulsación.",
          ],
        },
        {
          heading: "Consulta de referencia, sin conexión",
          paragraphs: [
            "La herramienta muestra el código numérico junto a los valores modernos de key y code, así que puedes traducir el keyCode 188 de un fragmento viejo a sus equivalentes modernos sin abrir un depurador y pulsar teclas una a una.",
            "Todo es una tabla estática renderizada en tu navegador — sin petición de red, funciona sin conexión, y nada sobre tu teclado se reporta a ningún sitio.",
            "Al escribir manejadores de eventos nuevos, prueba en un teclado real con la distribución de tus usuarios objetivo, porque los valores dependientes de la distribución difieren más de lo que cualquier tabla puede mostrar. Esta página es el diccionario; tu teclado es la prueba de campo.",
          ],
        },
      ],
    },
    pt: {
      name: "Códigos de teclado",
      tagline: "Pressione qualquer tecla para ver em tempo real event.key, event.code e o keyCode legado, além do estado das modificadoras e o histórico das últimas 10 teclas.",
      intro: [
        "Bugs de teclado costumam vir de confundir os três valores de um KeyboardEvent: event.key é o caractere produzido (\"a\" ou \"A\" com Shift), event.code é a tecla física (KeyA independentemente do layout) e keyCode é o código numérico legado de que código antigo ainda depende. Pressionar teclas nesta página mostra os três lado a lado, na hora, junto com as modificadoras pressionadas naquele momento.",
        "Também guarda as últimas 10 teclas numa tabela de histórico, para comparar valores entre teclas em vez de pressionar e esquecer. Útil para controles de jogo, atalhos ou depurar por que um handler keydown dispara duas vezes (ative ignorar repetição para filtrar a auto-repetição).",
      ],
      steps: [
        "Clique em qualquer ponto da página para dar foco de teclado e pressione uma tecla.",
        "Leia event.key, event.code e keyCode nos três cartões; Ctrl/Alt/Shift/Meta acendem enquanto estiverem pressionadas.",
        "Ative \"ignorar auto-repetição\" para filtrar as repetições e compare teclas na tabela das últimas 10.",
      ],
      faqs: [
        {
          q: "Por que event.key e event.code diferem para a mesma tecla?",
          a: "event.key informa o caractere produzido com o layout e as modificadoras atuais (\"A\", \"á\", \"1\"), enquanto event.code informa a posição física (KeyA, Digit1) independente do layout. Atalhos devem comparar code; manipulação de texto deve ler key.",
        },
        {
          q: "keyCode está obsoleto?",
          a: "Sim — é legado, mantido só por compatibilidade com código antigo que decide por números como 13 (Enter) ou 27 (Escape). Código novo deve usar event.key ou event.code; a ferramenta o mostra para mapear constantes antigas na migração.",
        },
        {
          q: "Por que o mesmo valor se repete ao segurar uma tecla?",
          a: "Segurar uma tecla faz o sistema enviar eventos keydown repetidos com repeat true. Ative \"ignorar auto-repetição\" para exibir só a primeira pressão; desative se precisa verificar que seu handler recebe eventos de repetição.",
        },
      ],
      deepDive: [
        {
          heading: "keyCode está obsoleto — o panorama",
          paragraphs: [
            "Os códigos numéricos que esta ferramenta exibe vêm das propriedades originais KeyboardEvent.keyCode e which, introduzidas nos anos 90 e hoje formalmente obsoletas. Continuam sendo os identificadores de tecla mais conhecidos porque décadas de tutoriais, bibliotecas e respostas de Stack Overflow foram construídos sobre eles — mas o padrão que os substitui é KeyboardEvent.key (o caractere, como \"a\" ou \"ArrowLeft\") e KeyboardEvent.code (a tecla física, como \"KeyA\" ou \"ArrowLeft\").",
            "A distinção importa: key respeita o layout do teclado (apertar a tecla ao lado do Tab num AZERTY francês produz um valor diferente de num QWERTY americano), enquanto code sempre identifica a mesma posição física. Para controles de jogo e sistemas de atalho, code costuma ser o correto; para manipulação de texto, key.",
            "O outro problema do keyCode é a inconsistência: setas, teclas de função e algumas do teclado numérico tinham valores dependentes de navegador e plataforma, e o tratamento legado de teclas mortas e entrada IME varia. Código novo deve tratar os números desta ferramenta como referência para ler código antigo, não como o que escrever.",
          ],
        },
        {
          heading: "Lendo identificadores de tecla na prática",
          paragraphs: [
            "As três propriedades respondem perguntas diferentes: keyCode (obsoleto) dá um número, key dá o que a tecla significa, code dá onde a tecla está. A mesma tecla pressionada pode reportar key \"a\" com code \"KeyA\"; com Shift apertado, key vira \"A\" enquanto code continua \"KeyA\". Um modificador muda key e nunca muda code.",
            "Escape é um caso estável (key \"Escape\", code \"Escape\", keyCode 27 — o número do legado que quase todo mundo memorizou). Espaço é uma armadilha: seu valor de key é \" \" (um espaço literal), não \"Space\", o que quebrou muitos switch ingênuos.",
            "Para atalhos, escute code quando a atribuição é posicional (movimento WASD) e key quando é tipográfica (Ctrl+Shift+P deveria funcionar no AZERTY também). E use e.repeat para ignorar a repetição automática quando um atalho deve disparar uma vez por pressionamento.",
          ],
        },
        {
          heading: "Consulta de referência, offline",
          paragraphs: [
            "A ferramenta exibe o código numérico junto com os valores modernos de key e code, então você pode traduzir o keyCode 188 de um trecho antigo para seus equivalentes modernos sem abrir um depurador e apertar teclas uma por uma.",
            "Tudo é uma tabela estática renderizada no seu navegador — sem requisição de rede, funciona sem conexão, e nada sobre seu teclado é reportado a lugar algum.",
            "Ao escrever novos manipuladores de eventos, teste num teclado real com o layout dos seus usuários-alvo, porque os valores dependentes de layout diferem mais do que qualquer tabela pode mostrar. Esta página é o dicionário; seu teclado é o teste de campo.",
          ],
        },
      ],
    },
  },
});
