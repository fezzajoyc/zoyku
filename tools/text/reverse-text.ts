import { TextTransform } from "../_engines/text-tool";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "reverse-text",
  category: "text",
  icon: "swap",
  engine: {
    component: TextTransform,
    props: {
      transform: "reverse-text",
      options: [
        { key: "byLines", label: { en: "Reverse lines only", zh: "仅反转行序", ja: "行の順序だけ反転", es: "Solo invertir líneas", pt: "Inverter apenas linhas" } },
      ],
    },
  },
  related: ["text-sorter", "find-and-replace", "text-cleaner", "remove-duplicate-lines", "text-diff", "remove-extra-spaces", "word-counter", "lorem-ipsum-generator", "sentence-counter", "text-to-binary"],
  copy: {
    en: {
      name: "Reverse Text",
      tagline:
        "Flip any text backwards character by character, or reverse the order of whole lines — Unicode-safe, instant and fully local.",
      intro: [
        "Two reversals in one tool: mirror the characters of your text (the classic 'txet esrever' trick for games, bios and puzzle clues) or flip the order of lines so the last line comes first — handy for logs, chat exports and lists pasted bottom-up.",
        "Reversal works on Unicode code points, not raw UTF-16 bytes, so precomposed accented letters like é and CJK characters survive intact instead of turning into mojibake. Line mode splits on both Windows CRLF and Unix LF endings, so exports from any operating system flip cleanly.",
        "One honest edge case: emoji built from multiple code points — ZWJ sequences, skin-tone modifiers, flag pairs — are split at code-point level, so a composite emoji may come apart. Letters, digits, punctuation and single-code-point symbols reverse perfectly.",
        "Compared with hunting for a hidden command in a word processor, this runs as you type with instant copy. It also pairs naturally with fancy-text-generator: reversed text plus Unicode variants is a common combo for social bios, and neither tool sends your text anywhere.",
      ],
      steps: [
        "Paste or type the text you want to flip.",
        "Leave 'Reverse lines only' off to mirror characters, or switch it on to reverse the line order.",
        "Copy the reversed result.",
      ],
      faqs: [
        {
          q: "Will emoji and accented letters survive?",
          a: "Yes for the common cases: the tool reverses by Unicode code points, so é, ñ and standard emoji stay intact. Very complex emoji built from multiple parts may still come apart when mirrored.",
        },
        {
          q: "What exactly does 'Reverse lines only' do?",
          a: "It keeps every line intact and flips the order of the lines themselves — the first line becomes the last. Use it when a list was pasted bottom-up.",
        },
        {
          q: "Can I use this for palindrome checking?",
          a: "Indirectly — paste the text, reverse it and compare by eye, or pair it with the text diff tool.",
        },
      ],
      deepDive: [
        {
          heading: "Reversing characters is not reversing text",
          paragraphs: [
            "There are two kinds of reversal, and mixing them up produces famous bugs. Character reversal flips the string byte by character: \"abc\" becomes \"cba\". Word reversal keeps each word intact and flips their order: \"hello world\" becomes \"world hello\". Asking for one and getting the other is the most common complaint about reverse tools, so this tool keeps them separate.",
            "Character reversal has a Unicode trap: text stored in UTF-16 — which is what JavaScript uses — represents emoji and some rare scripts as surrogate pairs, two code units that must stay together. Naive reversal splits the pair and produces garbage: the family emoji 👨‍👩‍👧 reverses into broken boxes or nonsense glyphs. Correct reversal walks grapheme clusters, not code units.",
            "Combining sequences matter too: \"e\" plus a combining accent reversed becomes accent-first, which renders wrongly in most fonts. Grapheme-aware reversal keeps the accent attached to its letter.",
          ],
        },
        {
          heading: "Where reversed text is actually useful",
          paragraphs: [
            "Palindromes are the classic use: checking whether a word reads the same both ways — \"racecar\", \"level\" — is literally a reverse-and-compare. Word-order reversal has practical editorial uses: flipping \"last first\" name lists into \"first last\", reversing bullet lists, undoing a column that was pasted bottom-up from a spreadsheet.",
            "Character-level reversal shows up in puzzle and game design (mirror writing, hidden messages that read correctly in a mirror), in testing (feeding reversed strings to validators to check they reject them), and in escaping naive string-matching filters — which is also why reverse-text is a classic pen-test trick worth knowing about.",
            "Line reversal — flipping the order of whole lines — is the quiet workhorse for log files: newest-first and oldest-first are one reverse apart, and spreadsheet exports that come out bottom-up get fixed in one click.",
          ],
        },
        {
          heading: "Runs entirely on the page",
          paragraphs: [
            "Reversal is a pure string operation performed in browser JavaScript as you type — no server, no storage, works offline. For long text the operation is still instantaneous, since reversal is linear in length.",
            "The tool handles the Unicode edge cases above correctly: grapheme clusters stay whole, emoji survive, combining marks keep their base letters. What you paste back is valid text, not a string of replacement characters.",
            "Nothing is remembered between sessions: refresh and the box is empty. If you are reversing something sensitive — a password-like string, an internal identifier — that is the behavior you want.",
          ],
        },
      ],
    },
    zh: {
      name: "文本反转",
      tagline: "按字符把文本整个翻转,或反转行的顺序——兼容 emoji,本地即时处理。",
      intro: [
        "一个工具两种反转:镜像文本字符(游戏、签名、谜语里经典的“倒序文字”),或调换行的先后让最后一行变成第一行——日志、聊天记录、自下而上粘贴的列表都用得上。",
        "反转按 Unicode 码点进行,不是按字节,所以重音字母和常见 emoji 都能完好保留,不会变成乱码。",
      ],
      steps: [
        "粘贴或输入要翻转的文本。",
        "不开“仅反转行序”就镜像字符;打开则只反转行的顺序。",
        "复制反转结果。",
      ],
      faqs: [
        {
          q: "emoji 和重音字母能保留吗?",
          a: "常见情况没问题:按 Unicode 码点反转,é、ñ 和标准 emoji 都会完好;由多个部件组成的复杂 emoji 镜像后可能拆开。",
        },
        {
          q: "“仅反转行序”具体做什么?",
          a: "每行内容保持不变,只调换行的先后——第一行变成最后一行。列表自下而上粘贴时用这个。",
        },
        {
          q: "能用来检查回文吗?",
          a: "可以间接做到——粘贴文本、反转后肉眼比对,或者配合文本对比工具。",
        },
      ],
      deepDive: [
        {
          heading: "反转字符不等于反转文本",
          paragraphs: [
            "反转有两种,搞混会闹出著名的 bug。字符反转逐字符翻转:“abc” 变 “cba”。词序反转保持每个词完整、只翻转词的顺序:“hello world” 变 “world hello”。对反转工具最普遍的抱怨就是要一种得到另一种,所以本工具把两者分开。",
            "字符反转有个 Unicode 陷阱:以 UTF-16 存储(JavaScript 正是如此)的文本里,emoji 和一些罕见文字用代理对表示——两个必须待在一起的编码单元。朴素反转会拆开这对,产出乱码:家人 emoji 👨‍👩‍👧 反转后变成一堆破框。正确的反转按字素簇走,而不是按编码单元。",
            "组合序列同理:“e + 组合音符”反转后音符跑到前面,多数字体下渲染错误。感知字素的反转让音符留它的字母身边。",
          ],
        },
        {
          heading: "反转文本什么时候真的有用",
          paragraphs: [
            "回文是经典用途:判断一个词正读反读是否相同——“racecar”、“level”——本质上就是反转再比较。词序反转有实际的编辑用途:把“姓 名”名单翻成“名 姓”,反转项目列表,纠正从表格里倒着粘出来的一列。",
            "字符级反转出现在谜题和游戏设计里(镜像书写、镜子里才读得对的暗语)、测试里(喂反转字符串给校验器,看它们是否拒绝),以及绕过朴素的字符串匹配过滤——这也是为什么 reverse-text 是值得了解的经典渗透测试技巧。",
            "行反转——整行整行地翻转顺序——是日志文件的隐形主力:最新在前和最旧在前只差一次反转;表格导出倒序的问题一次点击就能修好。",
          ],
        },
        {
          heading: "全部在页面上运行",
          paragraphs: [
            "反转是纯字符串操作,由浏览器 JavaScript 在你输入时即时完成——没有服务器、没有存储、离线可用。长文本也瞬间完成,因为反转的计算量与长度成正比。",
            "工具正确处理了上述 Unicode 边界情况:字素簇保持完整,emoji 完好存活,组合符号守着自己的字母。贴回去的是合法文本,不是一串替换字符。",
            "会话之间不留任何记忆:刷新后输入框是空的。如果你反转的是敏感内容——类似密码的字符串、内部标识符——这正是你想要的行为。",
          ],
        },
      ],
    },
    ja: {
      name: "テキスト反転",
      tagline: "テキストを 1 文字ずつ反転、または行の順序だけを逆に。Unicode 対応で絵文字もそのまま、すべてローカル処理です。",
      intro: [
        "反転は 2 種類:文字をミラーする(ゲームや自己紹介、謎解きでおなじみの「逆さ文字」)のと、行の順序だけを入れ替えて最終行を先頭にする方法。ログ、チャット履歴、下から貼り付けたリストの修正に便利です。",
        "反転はバイト単位ではなく Unicode のコードポイント単位なので、アクセント付き文字や一般的な絵文字も文字化けせずそのまま残ります。",
      ],
      steps: [
        "反転したいテキストを入力または貼り付けます。",
        "「行の順序だけ反転」をオフで文字ミラー、オンで行順の入れ替えです。",
        "反転結果をコピーします。",
      ],
      faqs: [
        {
          q: "絵文字やアクセント付き文字はそのまま残りますか?",
          a: "一般的なケースでは残ります。コードポイント単位で反転するため、é、ñ、標準的な絵文字は無傷です。複数パーツで構成される複雑な絵文字は分離することがあります。",
        },
        {
          q: "「行の順序だけ反転」の動作は?",
          a: "各行の内容はそのままに、行の並びだけを逆にします。最初の行が最後になります。下から上に貼り付けてしまったリストの修正に使ってください。",
        },
        {
          q: "回文のチェックに使えますか?",
          a: "間接的にできます。テキストを反転させて目で比べるか、テキスト差分ツールと組み合わせてください。",
        },
      ],
      deepDive: [
        {
          heading: "文字の反転はテキストの反転ではない",
          paragraphs: [
            "反転には 2 種類あり、混同すると有名なバグを生みます。文字反転は文字単位で裏返し、「abc」は「cba」になります。語順反転は各語を保ったまま順序だけを裏返し、「hello world」は「world hello」になります。逆ツールへの最も一般的な不満は片方を求めてもう一方を受け取ることで、このツールは両者を分けています。",
            "文字反転には Unicode の罠があります。UTF-16(JavaScript が使う形式)で保存されたテキストでは、絵文字や一部の希少な文字はサロゲートペアとして表現され、2 つのコードユニットが必ず揃っていなければなりません。素朴な反転はペアを引き裂き、壊れた文字を生みます。家族の絵文字 👨‍👩‍👧 は反転すると壊れた枠や無意味な字形になります。正しい反転はコードユニットではなく書素クラスタをたどります。",
            "結合シーケンスも同様です。「e + 結合アクセント」を反転するとアクセントが先になり、多くのフォントで誤表示されます。書素を意識した反転はアクセントを字母にくっつけたまま保ちます。",
          ],
        },
        {
          heading: "反転テキストが実際に役立つ場所",
          paragraphs: [
            "回文が定番の用途です。単語がどちら向きにも同じに読めるかの確認——「racecar」「level」——は文字どおり反転して比較するだけです。語順反転には実務的な編集用途もあります。「姓 名」の名簿を「名 姓」にひっくり返す、箇条書きを逆順にする、スプレッドシートから下から上に貼られた列を直す。",
            "文字単位の反転は、パズルやゲームデザイン(鏡文字、鏡で正しく読める隠しメッセージ)、テスト(反転した文字列をバリデータに与えて拒否されるか確認)、素朴な文字列フィルタの回避に現れます。後者こそ、reverse-text が知っておく価値のある古典的なペネトレーションテストの技である理由です。",
            "行反転——行全体の順序を裏返す——はログファイルの縁の下の力持ちです。新しい順と古い順は反転 1 回の差で、下から上に出力されるスプレッドシートの書き出しも 1 クリックで直ります。",
          ],
        },
        {
          heading: "すべてページ内で実行",
          paragraphs: [
            "反転は純粋な文字列操作で、入力のたびにブラウザの JavaScript が実行します。サーバーも保存もなく、オフラインで動きます。長文でも瞬時です。反転の計算量は長さに比例するだけだからです。",
            "このツールは前述の Unicode の境界例を正しく処理します。書素クラスタは完全なまま、絵文字は無事で、結合記号は字母を離しません。貼り戻すのは正当なテキストで、置換文字の羅列ではありません。",
            "セッション間で何も覚えません。更新すれば入力欄は空です。パスワード風の文字列や内部識別子のような機密を反転するなら、まさにその挙動こそ望むものです。",
          ],
        },
      ],
    },
    es: {
      name: "Invertir texto",
      tagline:
        "Invierte el texto carácter a carácter o dale la vuelta al orden de las líneas — seguro con Unicode, al instante y 100% local.",
      intro: [
        "Dos inversiones en una herramienta: reflejar los caracteres (el clásico 'txet esrever' para juegos, bios y acertijos) o voltear el orden de las líneas para que la última pase a ser la primera — útil con logs, exportaciones de chat y listas pegadas al revés.",
        "La inversión opera sobre puntos de código Unicode, no sobre bytes, así que las letras con tilde y la mayoría de los emojis sobreviven sin convertirse en mojibake.",
      ],
      steps: [
        "Pega o escribe el texto que quieres invertir.",
        "Deja «Solo invertir líneas» apagado para reflejar caracteres, o actívalo para invertir el orden de líneas.",
        "Copia el resultado invertido.",
      ],
      faqs: [
        {
          q: "¿Sobreviven los emojis y las letras acentuadas?",
          a: "En los casos habituales sí: la inversión va por puntos de código Unicode, así que é, ñ y los emojis estándar quedan intactos. Los emojis muy complejos pueden separarse al reflejarlos.",
        },
        {
          q: "¿Qué hace exactamente «Solo invertir líneas»?",
          a: "Mantiene cada línea tal cual y voltea el orden entre ellas: la primera pasa a ser la última. Úsalo con listas pegadas de abajo hacia arriba.",
        },
        {
          q: "¿Sirve para comprobar palíndromos?",
          a: "Indirectamente: pega el texto, inviértelo y compara a simple vista, o combínalo con la herramienta de diferencias de texto.",
        },
      ],
      deepDive: [
        {
          heading: "Invertir caracteres no es invertir texto",
          paragraphs: [
            "Hay dos tipos de inversión y confundirlos produce fallos famosos. La inversión de caracteres gira la cadena letra a letra: \"abc\" pasa a \"cba\". La inversión de palabras mantiene cada palabra intacta y gira su orden: \"hello world\" pasa a \"world hello\". La queja más común sobre las herramientas de inversión es pedir una y recibir la otra, así que esta herramienta las mantiene separadas.",
            "La inversión de caracteres tiene una trampa Unicode: el texto almacenado en UTF-16 — el formato que usa JavaScript — representa emoji y algunas escrituras raras como pares sustitutos, dos unidades de código que deben permanecer juntas. La inversión ingenua parte el par y produce basura: el emoji de familia 👨‍👩‍👧 se vuelve cajas rotas o glifos sin sentido. La inversión correcta recorre grupos de grafemas, no unidades de código.",
            "Las secuencias combinantes importan también: \"e\" más un acento combinante invertido deja el acento primero, lo que la mayoría de las fuentes renderizan mal. La inversión consciente de grafemas mantiene el acento pegado a su letra.",
          ],
        },
        {
          heading: "Dónde es útil de verdad el texto invertido",
          paragraphs: [
            "Los palíndromos son el uso clásico: comprobar si una palabra se lee igual en ambas direcciones — \"racecar\", \"reconocer\" — es literalmente invertir y comparar. La inversión de orden de palabras tiene usos editoriales prácticos: girar listas de \"apellido nombre\" a \"nombre apellido\", invertir listas de puntos, deshacer una columna pegada al revés desde una hoja de cálculo.",
            "La inversión a nivel de carácter aparece en el diseño de acertijos y juegos (escritura especular, mensajes ocultos que se leen bien en un espejo), en pruebas (alimentar validadores con cadenas invertidas para ver si las rechazan) y en eludir filtros ingenuos de coincidencia de cadenas — por eso reverse-text es también un truco clásico de test de penetración que conviene conocer.",
            "La inversión de líneas — girar el orden de líneas enteras — es el caballo de batalla silencioso para registros: de más nuevo a más viejo y viceversa se separan por una inversión, y las exportaciones de hoja de cálculo que salen al revés se arreglan con un clic.",
          ],
        },
        {
          heading: "Se ejecuta por completo en la página",
          paragraphs: [
            "La inversión es una operación de cadena pura que el JavaScript del navegador ejecuta mientras escribes — sin servidor, sin almacenamiento, funciona sin conexión. Con texto largo sigue siendo instantánea, porque invertir es lineal respecto a la longitud.",
            "La herramienta maneja correctamente los casos límite Unicode de arriba: los grupos de grafemas quedan enteros, los emoji sobreviven y los signos combinantes conservan su letra base. Lo que pegas de vuelta es texto válido, no una fila de caracteres de reemplazo.",
            "Nada se recuerda entre sesiones: recarga y la caja queda vacía. Si inviertes algo sensible — una cadena tipo contraseña, un identificador interno — ese es justo el comportamiento que quieres.",
          ],
        },
      ],
    },
    pt: {
      name: "Inverter texto",
      tagline:
        "Inverta o texto caractere por caractere ou vire a ordem das linhas inteiras — seguro para Unicode, instantâneo e 100% local.",
      intro: [
        "Duas inversões em uma ferramenta: espelhar os caracteres (o clássico 'txet esrever' para jogos, bios e charadas) ou inverter a ordem das linhas para que a última venha primeiro — útil para logs, exportações de chat e listas coladas de baixo para cima.",
        "A inversão trabalha em pontos de código Unicode, não em bytes, então letras acentuadas e a maioria dos emojis sobrevivem sem virar mojibake.",
      ],
      steps: [
        "Cole ou digite o texto que quer inverter.",
        "Deixe “Inverter apenas linhas” desligado para espelhar caracteres, ou ligado para inverter a ordem das linhas.",
        "Copie o resultado invertido.",
      ],
      faqs: [
        {
          q: "Emojis e letras acentuadas sobrevivem?",
          a: "Nos casos comuns, sim: a inversão é por pontos de código Unicode, então é, ñ e emojis padrão ficam intactos. Emojis muito complexos, feitos de várias partes, podem se separar ao espelhar.",
        },
        {
          q: "O que “Inverter apenas linhas” faz exatamente?",
          a: "Mantém cada linha como está e troca a ordem entre elas — a primeira vira a última. Use quando uma lista foi colada de baixo para cima.",
        },
        {
          q: "Dá para conferir palíndromos?",
          a: "Indiretamente: cole o texto, inverta e compare a olho, ou combine com a ferramenta de comparação de textos.",
        },
      ],
      deepDive: [
        {
          heading: "Inverter caracteres não é inverter texto",
          paragraphs: [
            "Há dois tipos de inversão e confundi-los produz erros famosos. A inversão de caracteres gira a string letra a letra: \"abc\" vira \"cba\". A inversão de palavras mantém cada palavra intacta e gira a ordem: \"hello world\" vira \"world hello\". A reclamação mais comum sobre ferramentas de inversão é pedir uma e receber a outra, então esta ferramenta mantém as duas separadas.",
            "A inversão de caracteres tem uma armadilha Unicode: texto armazenado em UTF-16 — o formato que o JavaScript usa — representa emoji e algumas escrituras raras como pares substitutos, duas unidades de código que devem permanecer juntas. A inversão ingênua parte o par e produz lixo: o emoji de família 👨‍👩‍👧 vira quadros quebrados ou glifos sem sentido. A inversão correta percorre aglomerados de grafemas, não unidades de código.",
            "Sequências combinantes importam também: \"e\" mais um acento combinante invertido deixa o acento primeiro, o que a maioria das fontes renderiza errado. A inversão consciente de grafemas mantém o acento preso à sua letra.",
          ],
        },
        {
          heading: "Onde texto invertido é realmente útil",
          paragraphs: [
            "Palíndromos são o uso clássico: verificar se uma palavra se lê igual nos dois sentidos — \"racecar\", \"arara\" — é literalmente inverter e comparar. A inversão de ordem de palavras tem usos editoriais práticos: virar listas de \"sobrenome nome\" para \"nome sobrenome\", inverter listas de itens, desfazer uma coluna colada de baixo para cima de uma planilha.",
            "A inversão em nível de caractere aparece no design de enigmas e jogos (escrita espelhada, mensagens ocultas que se leem direito num espelho), em testes (alimentar validadores com strings invertidas para ver se as rejeitam) e em contornar filtros ingênuos de casamento de strings — por isso o reverse-text é também um truque clássico de teste de intrusão que vale conhecer.",
            "A inversão de linhas — virar a ordem de linhas inteiras — é o burro de carga silencioso para logs: do mais novo ao mais velho se separam por uma inversão, e exportações de planilha que saem de baixo para cima se consertam com um clique.",
          ],
        },
        {
          heading: "Roda por completo na página",
          paragraphs: [
            "A inversão é uma operação de string pura que o JavaScript do navegador executa enquanto você digita — sem servidor, sem armazenamento, funciona offline. Com texto longo continua instantânea, porque inverter é linear no comprimento.",
            "A ferramenta lida corretamente com os casos-limite Unicode de cima: aglomerados de grafemas ficam inteiros, emoji sobrevivem e sinais combinantes mantêm sua letra base. O que você cola de volta é texto válido, não uma fila de caracteres de substituição.",
            "Nada é lembrado entre sessões: recarregue e a caixa fica vazia. Se você está invertendo algo sensível — uma string tipo senha, um identificador interno — esse é exatamente o comportamento que você quer.",
          ],
        },
      ],
    },
  },
});
