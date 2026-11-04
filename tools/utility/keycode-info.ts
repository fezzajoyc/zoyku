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
    },
  },
});
