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
    },
  },
});
