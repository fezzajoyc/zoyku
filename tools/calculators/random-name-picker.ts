import { CalcEngineWheel } from "../_engines/calc-engine-wheel";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "random-name-picker",
  category: "utility",
  icon: "shuffle",
  engine: { component: CalcEngineWheel },
  related: ["random-number", "password-generator", "text-sorter", "remove-duplicate-lines", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Random Name Picker",
      tagline:
        "Paste your list, spin the wheel and let a cryptographically random draw pick the winner — fair for classrooms, raffles and team stand-ups.",
      intro: [
        "Type or paste a list of names, one per line, and the wheel fills with a colored segment for each one. Hit SPIN and it decelerates over a few seconds before landing on the winner, announced in large type with a copy button. Two options cover the usual needs: remove duplicate names before the draw, and remove the winner after each draw so nobody wins twice.",
        "The pick itself is not the animation — the winner is drawn from your browser's cryptographic random number generator before the wheel even starts, so every name has exactly the same chance. A session draw history keeps track of everyone chosen so far, which is handy when you are working through a class or a queue of prizes.",
        "The winner is drawn with crypto.getRandomValues, the browser's cryptographic random source, before the wheel animation begins — the spin you watch is theater, and every entry holds exactly equal probability. Weighted entries are not supported by design: one name, one chance.",
        "Compared with drawing slips of paper, there is nothing to shuffle unfairly, the session history proves who has already been picked, and the remove-winner option runs a clean elimination. Because the draw uses a cryptographic generator rather than Math.random, it holds up for classroom turns and giveaway streams alike. The list you paste never leaves your browser.",
      ],
      steps: [
        "Paste your names into the box, one per line (2 to 100 names).",
        "Toggle duplicate removal, or removal of past winners, if you need them.",
        "Press SPIN and wait for the wheel to stop.",
        "Read the winner, copy the name if you need it, and check the draw history below.",
      ],
      faqs: [
        {
          q: "How random is the draw, really?",
          a: "The winner is chosen with crypto.getRandomValues, your browser's cryptographic random number generator, using rejection sampling to avoid modulo bias. That is the same source browsers use for security keys — not a pseudo-random shortcut — so every entry has an identical chance. The wheel animation lands on the already-drawn winner; it cannot change the result.",
        },
        {
          q: "How many names can the wheel hold?",
          a: "From 2 up to 100. Names are truncated with an ellipsis on the wheel so the segments stay readable, but the winner card always shows the full name. Past roughly 60 names the labels are dropped from the wheel entirely — the draw itself is still exact.",
        },
        {
          q: "Can I draw multiple winners in a row?",
          a: "Yes. Enable 'Remove the winner after each draw' and each pick drops out of the list automatically, so nobody is picked twice. The history panel below records every draw this session, in order, with a timestamp.",
        },
      ],
      deepDive: [
        {
          heading: "What makes a draw provably fair",
          paragraphs: [
            "The subtle failure mode of random pickers is modulo bias. A naive script does Math.floor(Math.random() * n) — but Math.random() produces a floating-point value in a fixed range, and when that range does not divide evenly by the number of entries, the first few names get picked measurably more often. With 100 names, some entries can end up a percent or two more likely than others: invisible in one spin, decisive across a term of classroom draws.",
            "This tool avoids the problem twice over. It uses crypto.getRandomValues — the browser's cryptographic random source, the same generator behind security keys — and applies rejection sampling: values that would bias the distribution are discarded and redrawn, so each of the n entries gets exactly 1/n probability. The critical draw happens before the animation starts, meaning the wheel cannot influence the outcome in any way.",
            "That separation of draw and display is what lets you prove fairness to an audience: the result exists the instant you press the button, the animation only reveals it. Nothing about segment colors, wheel speed or where the pointer starts affects who wins — and because the draw is cryptographic rather than seeded by time, even the person running the tool cannot predict or steer the outcome.",
          ],
        },
        {
          heading: "Turn-taking, elimination and the history panel",
          paragraphs: [
            "Two options do most of the practical work. Removing duplicates matters more than it looks: a list pasted from a spreadsheet often carries hidden repeats — trailing spaces, name order flips, accidental double rows — and every duplicate doubles that person's chance. Deduplicate before the draw unless the repeats are deliberate.",
            "Removing the winner after each draw turns the wheel into a clean elimination queue. This is how you work through a class so every student presents exactly once, or hand out prizes in order without tracking papers. The history panel below records each pick with its timestamp, in order, so disputes like “you picked them twice” can be settled by scrolling rather than memory.",
            "One honest limitation: the history lives only in this browser session. Refreshing the page clears it. If you need an auditable record — a giveaway with real prizes, for example — copy the winners out as you go rather than trusting the session to survive.",
          ],
        },
        {
          heading: "Where the list lives — and where it does not",
          paragraphs: [
            "Everything runs locally in your browser. The list you paste is never transmitted, stored or logged anywhere; there is no server involved in the draw at all. That makes the tool safe for lists you would not want to paste into a random website — employee names for a shift lottery, patient initials in a training exercise, private group member names.",
            "It also means the tool keeps working with no network: a classroom with bad Wi-Fi can still run the draw, and the same page keeps functioning offline once loaded. The only data that ever leaves a tab is what you deliberately copy out via the copy button.",
            "For weighted or seeded draws — raffles where ticket count should change odds, or reproducible picks for testing — this tool is deliberately the wrong one: one name, one chance, no weights. That constraint is a feature when fairness is the point; when odds should be uneven, use a dedicated raffle tool instead of bending this one.",
          ],
        },
      ],
    },
    zh: {
      name: "随机名字抽取",
      tagline:
        "把名单粘贴进来,转动转盘,由加密级随机抽取选出中奖者——适合课堂点名、抽奖活动和团建,支持去重与中奖后自动移除。",
      intro: [
        "把名字一行一个粘贴进输入框,转盘会为每个名字生成一个彩色扇区。点击开始,转盘减速数秒后停在中奖者上,大字展示结果并提供一键复制。两个选项覆盖常见需求:抽取前去除重复名字,以及抽出后自动移除中奖者,避免同一人中奖两次。",
        "抽奖本身不依赖动画——转盘开转之前,中奖者就已由浏览器加密级随机数生成器确定,每个名字概率完全相同。下方的抽取记录按顺序保留本次会话的所有结果,点名或按顺序发奖时特别有用。",
      ],
      steps: [
        "把名字粘贴到输入框,每行一个(2 到 100 个)。",
        "按需打开去重或“抽出后移除中奖者”选项。",
        "点击开始,等待转盘停下。",
        "查看中奖者,需要时复制名字,下方还有抽取记录。",
      ],
      faqs: [
        {
          q: "抽取到底有多随机?",
          a: "中奖者由浏览器的加密级随机数生成器 crypto.getRandomValues 选出,并用拒绝采样消除模偏差——与浏览器生成安全密钥用的是同一来源,不是伪随机的简化实现,因此每个名字概率完全相同。转盘动画只是落在已确定的结果上,不会改变结果。",
        },
        {
          q: "转盘最多能放多少个名字?",
          a: "2 到 100 个。名字在扇区上会截断显示省略号以保证可读,但中奖卡片始终显示完整名字。超过约 60 个时扇区上不再显示文字——抽取本身仍然精确。",
        },
        {
          q: "能连续抽出多个中奖者吗?",
          a: "可以。打开“抽出后移除中奖者”,每次抽中的名字会自动移出名单,不会重复中奖。下方的历史面板按时间顺序记录本次会话的每一次抽取。",
        },
      ],
      deepDive: [
        {
          heading: "凭什么说抽取是可证公平的",
          paragraphs: [
            "随机抽取最容易翻车的地方是模偏差。朴素的写法是 Math.floor(Math.random() * n)——但 Math.random() 产出的是固定区间里的浮点数,当区间不能被名额数整除时,排在前面几个名字会被明显更频繁地抽中。100 个名字时,某些条目会比其他条目多出一两个百分点的概率:抽一次看不出来,一个学期的课堂点名累积下来就是决定性差异。",
            "本工具从两头避开了这个问题。它使用 crypto.getRandomValues——浏览器的加密级随机源,与生成安全密钥的是同一个生成器——并采用拒绝采样:会造成分布偏斜的值被丢弃重抽,确保 n 个条目每个都精确拿到 1/n 的概率。决定性抽取发生在动画开始之前,意味着转盘不可能以任何方式影响结果。",
            "“抽取”与“展示”的分离让你可以当众证明公平:按下按钮的一瞬结果已经存在,动画只是把它揭示出来。扇区颜色、转速、指针起点都不影响谁中奖——而且抽取是加密级的,不是按时间播种的,连操作工具的人也无法预测或操纵结果。",
          ],
        },
        {
          heading: "轮流、淘汰与历史记录",
          paragraphs: [
            "两个选项承担了大部分实际工作。去重比看上去重要:从电子表格粘贴的名单常带着隐藏的重复——行尾空格、姓名顺序颠倒、误粘两遍——每个重复项都会让那个人多一份概率。除非重复是故意的,抽取前先去重。",
            "“抽出后移除中奖者”把转盘变成干净的淘汰队列。全班每人恰好讲一次、按顺序发奖不用记纸条,靠的都是它。下方的历史面板按时间顺序记录每次抽取,像“你把他抽了两次”这类争议,滚一滚记录就能解决,不用靠记忆。",
            "一个诚实的限制:历史只存在于当前浏览器会话。刷新页面即清空。如果需要可审计的记录——比如有实物奖品的抽奖——请随抽随复制中奖名单,别指望会话一直活着。",
          ],
        },
        {
          heading: "名单在哪里——以及不在哪里",
          paragraphs: [
            "一切都在浏览器本地运行。粘贴的名单不会被传输、存储或记录到任何地方,抽取过程完全没有服务器参与。因此对不想贴进随机网站的名单也安全:排班的员工名单、培训演练里的患者首字母、群成员的私密名单。",
            "这也意味着没有网络照样能用:教室里 Wi-Fi 很烂也能完成抽取,页面加载一次后离线继续工作。唯一会离开这个页面的数据,是你主动通过复制按钮复制出去的内容。",
          ],
        },
      ],
    },
    ja: {
      name: "ランダム名前抽選",
      tagline:
        "名簿を貼り付けてホイールを回すだけ。暗号論的乱数による公正な抽選で当選者を決めます。授業やビンゴ、プレゼント抽選に最適です。",
      intro: [
        "名前を 1 行に 1 つずつ貼り付けると、ホイールに人数分のカラー扇形ができます。「回す」を押すと数秒かけて減速し、当選者が大きく表示されます。重複する名前の削除と、抽選ごとの当選者除外という 2 つのオプションで、同じ人が当たるのを防げます。",
        "抽選はアニメーションとは独立しています。ホイールが回り始める前に、ブラウザの暗号論的乱数生成器で当選者が確定するため、どの名前もまったく同じ確率です。下の抽選履歴に今回のセッションの結果が時系列で残るので、クラス単位や景品の順番の管理に便利です。",
      ],
      steps: [
        "名前を入力欄に貼り付けます(1 行に 1 つ、2〜100 名)。",
        "必要なら重複削除や「抽選後に当選者を除外」をオンにします。",
        "「回す」を押してホイールが止まるのを待ちます。",
        "当選者を確認し、必要なら名前をコピー。下に抽選履歴もあります。",
      ],
      faqs: [
        {
          q: "抽選のランダム性は本物ですか?",
          a: "当選者はブラウザの暗号論的乱数生成器 crypto.getRandomValues で、モジュロ偏りを避ける棄却サンプリング付きで選びます。ブラウザがセキュリティキーに使うのと同じソースであり、擬似乱数の手抜きではありません。全員の確率は完全に等しく、ホイールのアニメーションは確定済みの結果に着地するだけで結果を変えられません。",
        },
        {
          q: "ホイールに入れられる名前の数は?",
          a: "2 名から 100 名までです。扇形の中では読みやすさのため省略記号で切り詰めますが、当選カードには必ずフルネームが表示されます。約 60 名を超えるとホイール上のラベルは省略されますが、抽選そのものは正確です。",
        },
        {
          q: "連続で何人も抽選できますか?",
          a: "はい。「抽選後に当選者を除外」を有効にすると、抽選のたびに当選者がリストから外れ、同じ人が 2 回当たることはありません。下の履歴パネルに今回のセッションの抽選が時刻付きで順番に記録されます。",
        },
      ],
      deepDive: [
        {
          heading: "何が抽選を「証明できる公正」にするか",
          paragraphs: [
            "ランダム抽選の代表的な失敗モードはモジュロ偏りです。素朴な実装は Math.floor(Math.random() * n) ですが、Math.random() は固定範囲の浮動小数点を返し、範囲が人数で割り切れないとき、先頭のいくつかの名前が有意に多く選ばれます。100 名なら特定の人が 1〜2% だけ確率が高くなることもあり、1 回では見えなくても、学期を通した指名順では決定的な差になります。",
            "このツールは二重にこれを回避します。まず crypto.getRandomValues——セキュリティキーの生成に使われるのと同じ、ブラウザの暗号論的乱数源——を使用し、さらに棄却サンプリングを適用します。分布を歪める値は捨てて再抽選するため、n 人それぞれが正確に 1/n の確率を得ます。決定的な抽選はアニメーションの開始前に行われるので、ホイールは結果に何の影響も与えられません。",
            "抽選と表示の分離が、聴衆への公正の証明を可能にします。ボタンを押した瞬間に結果はすでに存在し、アニメーションはそれを明らかにするだけです。扇形の色・回転速度・針の初期位置のいずれも当選者に影響せず、時刻を種にした擬似乱数ではないため、ツールの運行者でさえ結果を予測・誘導できません。",
          ],
        },
        {
          heading: "順番・淘汰・履歴パネル",
          paragraphs: [
            "実務を支えるのは 2 つのオプションです。重複削除は見た目以上に重要です。スプレッドシートから貼った名簿には隠れた重複がよく紛れます——行末の空白、姓名の順序違い、うっかり 2 行貼り。重複 1 件ごとにその人の確率が倍になります。重複が意図的でない限り、抽選前に必ず削除してください。",
            "「抽選後に当選者を除外」を有効にすると、ホイールがきれいな淘汰キューに変わります。全員がちょうど 1 回発表するクラスの進行や、紙を追跡せずに順番通り景品を配る仕組みはこれで作れます。下の履歴パネルは抽選ごとに時刻を記録するので、「あの人を 2 回選んだ」という揉め事は記憶ではなくスクロールで決着します。",
            "正直な制限を 1 つ。履歴はこのブラウザセッション内にだけ存在し、ページを再読み込みすると消えます。監査可能な記録が必要な場面——実物の景品があるキャンペーンなど——では、セッションの存続を信用せず、都度当選者をコピーしてください。",
          ],
        },
        {
          heading: "名簿はどこにあり、どこにないか",
          paragraphs: [
            "すべてブラウザ内で実行されます。貼り付けた名簿は送信・保存・記録のいずれもされず、抽選にサーバーは一切関与しません。だから見知らぬサイトに貼りたくない名簿も安全です。シフト抽選の従業員名、研修での患者イニシャル、非公開グループのメンバー名など。",
            "同時に、ネットワークなしでも動き続けます。Wi-Fi の不安定な教室でも抽選は成立し、読み込み済みのページはオフラインで機能し続けます。タブの外に出るデータは、あなたがコピーボタンで意図的に取り出したものだけです。",
            "重み付きや再現可能な抽選——枚数で確率を変える raffle や、テスト用の固定結果——には、このツールは意図的に不適切です。1 名 1 票、重みなし。公平性が目的のときはこの制約こそが機能ですが、確率を歪めたい用途では専用の抽選ツールを使ってください。",
          ],
        },
      ],
    },
    es: {
      name: "Sorteo de nombres aleatorio",
      tagline:
        "Pegue su lista, gire la ruleta y deje que un sorteo criptográficamente aleatorio elija al ganador — justo, sin conexión, para clases y rifas.",
      intro: [
        "Escriba o pegue una lista de nombres, uno por línea, y la ruleta se llena con un segmento de color para cada uno. Pulse GIRAR y la ruleta frena durante unos segundos hasta posarse en el ganador, anunciado en grande con un botón de copia. Dos opciones cubren lo habitual: quitar nombres duplicados antes del sorteo y quitar al ganador tras cada sorteo para que nadie gane dos veces.",
        "La elección no es la animación: el ganador se extrae del generador criptográfico de su navegador antes de que la ruleta arranque, así que todos los nombres tienen exactamente la misma probabilidad. El historial de la sesión registra cada resultado en orden, útil cuando recorre una clase o una fila de premios.",
      ],
      steps: [
        "Pegue los nombres en el cuadro, uno por línea (de 2 a 100).",
        "Active la eliminación de duplicados o de ganadores anteriores si lo necesita.",
        "Pulse GIRAR y espere a que la ruleta se detenga.",
        "Lea el ganador, cópielo si hace falta y consulte el historial de abajo.",
      ],
      faqs: [
        {
          q: "¿Qué tan aleatorio es el sorteo?",
          a: "El ganador se elige con crypto.getRandomValues, el generador criptográfico de su navegador, usando muestreo por rechazo para evitar el sesgo de módulo. Es la misma fuente que usan los navegadores para claves de seguridad, no un pseudoaleatorio abreviado: todas las entradas tienen probabilidad idéntica. La animación de la ruleta cae sobre el ganador ya elegido y no puede cambiar el resultado.",
        },
        {
          q: "¿Cuántos nombres admite la ruleta?",
          a: "De 2 a 100. Los nombres se acortan con puntos suspensivos sobre la ruleta para que los segmentos sigan siendo legibles, pero la tarjeta del ganador muestra siempre el nombre completo. A partir de unos 60 nombres se omiten las etiquetas en la ruleta; el sorteo sigue siendo exacto.",
        },
        {
          q: "¿Puedo sortear varios ganadores seguidos?",
          a: "Sí. Active «Quitar al ganador tras cada sorteo» y cada elección saldrá automáticamente de la lista, así nadie repite premio. El panel de historial registra cada sorteo de la sesión, en orden y con su hora.",
        },
      ],
      deepDive: [
        {
          heading: "Lo que hace verificablemente justo a un sorteo",
          paragraphs: [
            "El modo sutil de fallo de los selectores aleatorios es el sesgo de módulo. Un script ingenuo hace Math.floor(Math.random() * n) — pero Math.random() produce un valor de coma flotante en un rango fijo, y cuando ese rango no se divide con exactitud entre el número de entradas, los primeros nombres salen medible­mente más a menudo. Con 100 nombres, algunas entradas pueden quedar un uno o dos por ciento más probables: invisible en un giro, decisivo a lo largo de un curso de turnos en clase.",
            "Esta herramienta evita el problema por partida doble. Usa crypto.getRandomValues — la fuente criptográfica del navegador, el mismo generador que respalda las claves de seguridad — y aplica muestreo por rechazo: los valores que sesgarían la distribución se descartan y se vuelven a sortear, de modo que cada una de las n entradas recibe exactamente 1/n de probabilidad. El sorteo crítico ocurre antes de que arranque la animación, es decir, la ruleta no puede influir en el resultado por ningún medio.",
            "Esa separación entre sorteo y pantalla es la que le permite demostrar la equidad ante un público: el resultado existe en el instante en que pulsa el botón y la animación solo lo revela. Los colores de los segmentos, la velocidad de giro y el punto de partida del indicador no afectan a quién gana — y como el sorteo es criptográfico y no se semilla con el reloj, ni siquiera quien maneja la herramienta puede predecir o dirigir el desenlace.",
          ],
        },
        {
          heading: "Turnos, eliminación y el panel de historial",
          paragraphs: [
            "Dos opciones hacen la mayor parte del trabajo práctico. Quitar duplicados importa más de lo que parece: una lista pegada desde una hoja de cálculo suele llevar repeticiones ocultas — espacios al final, nombres invertidos, filas pegadas dos veces — y cada duplicado duplica la probabilidad de esa persona. Desduplique antes del sorteo salvo que las repeticiones sean deliberadas.",
            "Quitar al ganador tras cada sorteo convierte la ruleta en una cola de eliminación limpia. Así recorre una clase para que cada estudiante presente exactamente una vez, o reparte premios en orden sin llevar papel. El panel de historial de abajo registra cada elección con su hora, en orden, así que disputas como «ya lo elegiste dos veces» se resuelven desplazándose, no de memoria.",
            "Una limitación honesta: el historial vive solo en esta sesión del navegador. Recargar la página lo borra. Si necesita un registro auditable — un sorteo con premios reales, por ejemplo — copie los ganadores a medida que salgan en lugar de confiar en que la sesión sobreviva.",
          ],
        },
        {
          heading: "Dónde vive la lista — y dónde no",
          paragraphs: [
            "Todo corre localmente en su navegador. La lista que pega nunca se transmite, guarda ni registra; no hay servidor implicado en el sorteo. Eso hace la herramienta segura para listas que no pegaría en un sitio web cualquiera: nombres de empleados para un sorteo de turnos, iniciales de pacientes en un ejercicio de formación, miembros de un grupo privado.",
            "También significa que funciona sin red: un aula con Wi-Fi malo puede seguir sorteando, y la página cargada sigue funcionando sin conexión. El único dato que sale de la pestaña es el que usted copia deliberadamente con el botón de copiar.",
            "Para sorteos ponderados o con semilla — rifas donde el número de boletos debe cambiar las probabilidades, o selecciones reproducibles para pruebas — esta herramienta es deliberadamente la incorrecta: un nombre, una oportunidad, sin pesos. Esa restricción es una virtud cuando la equidad es el objetivo; cuando las probabilidades deben ser desiguales, use una herramienta de rifa dedicada en vez de forzar esta.",
          ],
        },
      ],
    },
    pt: {
      name: "Sorteador de nomes",
      tagline:
        "Cole sua lista, gire a roleta e deixe um sorteio criptograficamente aleatório escolher o vencedor — justo, offline, para salas de aula e rifas.",
      intro: [
        "Digite ou cole uma lista de nomes, um por linha, e a roleta se preenche com um segmento colorido para cada um. Aperte GIRAR e a roleta desacelera por alguns segundos até parar no sorteado, anunciado em letras grandes com botão de copiar. Duas opções cobrem o uso comum: remover nomes duplicados antes do sorteio e remover o sorteado após cada rodada, para ninguém ganhar duas vezes.",
        "A escolha não é a animação: o vencedor é sorteado pelo gerador criptográfico do seu navegador antes de a roleta começar, então todos os nomes têm exatamente a mesma chance. O histórico da sessão registra cada resultado em ordem — útil para percorrer uma turma ou uma fila de prêmios.",
      ],
      steps: [
        "Cole os nomes na caixa, um por linha (de 2 a 100).",
        "Ative a remoção de duplicados ou de ganhadores anteriores, se precisar.",
        "Aperte GIRAR e espere a roleta parar.",
        "Veja o sorteado, copie o nome se precisar e confira o histórico abaixo.",
      ],
      faqs: [
        {
          q: "O sorteio é aleatório de verdade?",
          a: "O vencedor é escolhido com crypto.getRandomValues, o gerador criptográfico do navegador, usando amostragem por rejeição para evitar viés de módulo. É a mesma fonte que os navegadores usam para chaves de segurança — não um pseudoaleatório simplificado — então todas as entradas têm chance idêntica. A animação da roleta pousa sobre o vencedor já sorteado e não pode mudar o resultado.",
        },
        {
          q: "Quantos nomes a roleta comporta?",
          a: "De 2 a 100. Os nomes aparecem truncados com reticências na roleta para os segmentos continuarem legíveis, mas o cartão do vencedor sempre mostra o nome completo. A partir de cerca de 60 nomes os rótulos saem da roleta — o sorteio continua exato.",
        },
        {
          q: "Dá para sortear vários vencedores seguidos?",
          a: "Sim. Ative “Remover o sorteado após cada rodada” e cada escolha sai da lista automaticamente, então ninguém é sorteado duas vezes. O painel de histórico registra cada rodada da sessão, em ordem e com horário.",
        },
      ],
      deepDive: [
        {
          heading: "O que torna um sorteio comprovadamente justo",
          paragraphs: [
            "O modo sutil de falha dos sorteados aleatórios é o viés de módulo. Um script ingênuo faz Math.floor(Math.random() * n) — mas Math.random() produz um valor de ponto flutuante numa faixa fixa, e quando essa faixa não se divide igualmente pelo número de entradas, os primeiros nomes saem mensuravelmente mais vezes. Com 100 nomes, algumas entradas podem ficar um ou dois por cento mais prováveis: invisível num giro, decisivo ao longo de um semestre de turnos em sala.",
            "Esta ferramenta evita o problema duas vezes. Usa crypto.getRandomValues — a fonte criptográfica do navegador, o mesmo gerador por trás das chaves de segurança — e aplica amostragem por rejeição: valores que enviesariam a distribuição são descartados e sorteados de novo, de modo que cada uma das n entradas receba exatamente 1/n de probabilidade. O sorteio decisivo acontece antes de a animação começar, ou seja, a roleta não pode influir no resultado de forma alguma.",
            "Essa separação entre sorteio e exibição é o que permite provar a justiça diante de uma plateia: o resultado existe no instante em que você aperta o botão, e a animação apenas o revela. Cores dos segmentos, velocidade e ponto de partida do ponteiro não afetam quem ganha — e como o sorteio é criptográfico, não semeado pelo relógio, nem quem opera a ferramenta consegue prever ou conduzir o desfecho.",
          ],
        },
        {
          heading: "Ordem, eliminação e o painel de histórico",
          paragraphs: [
            "Duas opções fazem a maior parte do trabalho prático. Remover duplicados importa mais do que parece: uma lista colada de uma planilha costuma trazer repetições ocultas — espaços no fim, nomes invertidos, linha colada duas vezes — e cada duplicado dobra a chance daquela pessoa. Desduplique antes do sorteio, a menos que as repetições sejam intencionais.",
            "Remover o sorteado após cada rodada transforma a roleta numa fila de eliminação limpa. É assim que você percorre uma turma para que cada aluno apresente exatamente uma vez, ou distribui prêmios em ordem sem controlar papéis. O painel de histórico abaixo registra cada escolha com horário, em ordem, então discussões tipo “você sorteou ele duas vezes” se resolvem rolando a página, não de memória.",
            "Uma limitação honesta: o histórico vive apenas nesta sessão do navegador. Recarregar a página apaga tudo. Se você precisa de registro auditável — uma rifa com prêmios de verdade, por exemplo — copie os sorteados conforme saem em vez de confiar que a sessão vai sobreviver.",
          ],
        },
        {
          heading: "Onde a lista vive — e onde não vive",
          paragraphs: [
            "Tudo roda localmente no seu navegador. A lista que você cola nunca é transmitida, guardada ou registrada; nenhum servidor participa do sorteio. Isso torna a ferramenta segura para listas que você não colaria num site qualquer: nomes de funcionários num sorteio de escala, iniciais de pacientes num exercício de treinamento, membros de um grupo privado.",
            "Também significa que funciona sem rede: uma sala com Wi-Fi ruim ainda consegue sortear, e a página carregada segue funcionando offline. O único dado que sai da aba é o que você copia deliberadamente pelo botão de copiar.",
            "Para sorteios ponderados ou com semente — rifas em que a quantidade de bilhetes deve mudar as chances, ou escolhas reproduzíveis para testes — esta ferramenta é deliberadamente a errada: um nome, uma chance, sem pesos. Essa restrição é uma qualidade quando a justiça é o objetivo; quando as probabilidades devem ser desiguais, use uma ferramenta de rifa dedicada em vez de forçar esta.",
          ],
        },
      ],
    },
  },
});
