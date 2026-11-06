import { TextDiff } from "../_engines/text-diff";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "text-diff",
  category: "text",
  icon: "search",
  engine: { component: TextDiff },
  related: ["find-and-replace", "sentence-counter", "word-counter", "text-cleaner", "text-sorter", "remove-extra-spaces", "remove-duplicate-lines", "lorem-ipsum-generator", "text-to-binary", "reverse-text"],
  copy: {
    en: {
      name: "Text Diff",
      tagline:
        "Compare two versions of a text word by word, with additions and deletions highlighted — no account, no upload, no size fuss.",
      intro: [
        "Paste the original on the left and the edited version on the right: changed words highlight immediately, deletions in one color and additions in another. It is the quickest way to review a contract revision, an editor's rewrite, a release-note edit or a colleague's last-minute changes to a paragraph.",
        "The comparison is word-level, not character-level: 'the contract expires in March' becoming 'the contract expires in April' highlights only March → April, not the whole sentence. Punctuation travels with its word, so sentences that were merely re-flowed stay readable instead of lighting up end to end.",
        "The engine is the widely used jsdiff word-diff library, built on longest-common-subsequence comparison — the same algorithm family behind git's diff tooling — so results match what command-line review tools produce, without a terminal or command syntax to remember.",
        "Everything runs entirely in your browser — long contracts, unpublished manuscripts and confidential text never touch a server. For mechanical cleanup before or after a diff, remove-duplicate-lines and remove-extra-spaces in the related row normalize the input so trivial whitespace noise does not drown real changes.",
      ],
      steps: [
        "Paste the original text into the left box.",
        "Paste the modified text into the right box.",
        "Read the merged view below: strikethrough marks removals, green marks additions.",
      ],
      faqs: [
        {
          q: "How are differences displayed?",
          a: "Unchanged text is plain; removed words are struck through in orange and added words are highlighted in green, so a paragraph reads like a tracked change.",
        },
        {
          q: "Is it a character-level or word-level diff?",
          a: "Word-level. Small edits inside a word are shown as one removed word plus one added word, which is easier to scan than a character-level diff.",
        },
        {
          q: "Is there a size limit?",
          a: "Only your browser's memory — book-length comparisons work, though very large texts take a moment to render.",
        },
      ],
      deepDive: [
        {
          heading: "How diff actually finds the changes",
          paragraphs: [
            "A diff is not a character-by-character scan. Underneath almost every diff tool is the Longest Common Subsequence (LCS) algorithm: find the longest sequence of lines (or characters) that appears in both texts, in order, and everything outside that sequence is an insertion or deletion. That is why a good diff aligns the untouched middle of two documents and flags only what changed around it.",
            "Granularity is a user-visible choice. Line-level diff marks whole lines as added or removed — the mode of code review, git and legal redlining, because lines are the unit people talk about. Character-level (or word-level) diff aligns inside a changed line and shows that only three words moved — the mode for prose editing, where rewriting a whole paragraph of otherwise-identical text as \"all deleted, all added\" is unreadable.",
            "When both an insertion and a deletion occur at the same spot, the tool pairs them as a modification. Equal alternatives exist — pairing differently produces the same final text — and the convention is to minimize churn so the human reads fewer blocks.",
          ],
        },
        {
          heading: "Reading a diff without getting fooled",
          paragraphs: [
            "The common misreading: a large diff does not mean large changes. One inserted line can push the LCS alignment and make later paragraphs appear deleted and re-added, when nothing in them changed. Whitespace differences amplify this — a trailing space turns a line into \"changed\". This is why normalizing whitespace before diffing (the text-cleaner pass) produces dramatically cleaner results.",
            "Word-level mode is the antidote for prose: instead of \"a paragraph changed\", you see \"grew → expanded\". For contracts and code, stay at line level — partial-line matches there create false confidence that a legal clause is \"basically the same\".",
            "A second misreading is direction: which text is \"before\" and which is \"after\". The tool labels the panes, but discipline matters in review workflows — a diff read backwards turns additions into deletions and changes the meaning of approval.",
          ],
        },
        {
          heading: "Pure client-side comparison",
          paragraphs: [
            "The comparison runs entirely in your browser: LCS on the two texts, rendered as highlighted blocks. No upload, no server round trip, works offline — the correct architecture when the texts are contracts, personal documents or unpublished source code.",
            "LCS is O(n × m) in the worst case, which is why some tools refuse large files; implementations with common-prefix trimming and hashing handle documents of hundreds of thousands of lines comfortably. For truly enormous comparisons, splitting into sections is the practical approach.",
            "Nothing persists: refresh the page and both panes clear. That makes this a safe tool for the classic sensitive use — comparing two versions of a legal draft, a config file or an exported credential list, without the text ever leaving the device.",
          ],
        },
      ],
    },
    zh: {
      name: "文本对比",
      tagline: "逐词对比两个版本的文本,新增与删除高亮显示——无需账号、不上传、不限用途。",
      intro: [
        "左边贴原文,右边贴修改稿:改动立刻高亮,删除一种颜色、新增另一种颜色。审合同修订、看编辑改稿、查同事临时的段落改动,这是最快的办法。",
        "对比完全在浏览器里进行——长合同、未出版的书稿、机密文本都不会经过任何服务器。",
      ],
      steps: [
        "把原文粘贴到左边的框。",
        "把修改稿粘贴到右边的框。",
        "阅读下方合并视图:删除线标出删减,绿色标出新增。",
      ],
      faqs: [
        {
          q: "差异是怎么展示的?",
          a: "未改动的文本正常显示;被删的词用橙色加删除线,新增的词用绿色高亮,读起来像带修订痕迹的文档。",
        },
        {
          q: "是字符级对比还是词级对比?",
          a: "词级。词内的小改动会显示为一个删除词加一个新增词,比字符级对比更易扫读。",
        },
        {
          q: "有篇幅限制吗?",
          a: "只受浏览器内存限制——整本书的对比也能跑,只是超大文本渲染会稍慢。",
        },
      ],
      deepDive: [
        {
          heading: "diff 到底是怎么找变化的",
          paragraphs: [
            "diff 不是逐字符扫描。几乎所有 diff 工具的底层都是最长公共子序列(LCS)算法:找出同时出现在两个文本中、顺序一致的最长行(或字符)序列,序列之外的部分就是插入或删除。这就是好的 diff 能对齐两份文档未动的中段、只标出周围变化的原因。",
            "粒度是用户可见的选择。行级 diff 把整行标记为新增或删除——这是代码评审、git 和法律红线的模式,因为行是人们谈论的单位。字符级(或词级)diff 在变更行内部对齐,展示其实只动了三个词——这是文章编辑的模式,把本没全变的段落标成“全删全加”根本没法读。",
            "当插入和删除出现在同一位置,工具把它们配成一次修改。等价的配法不止一种——不同的配对产出相同的最终文本——惯例是让改动块最少,让人少读几块。",
          ],
        },
        {
          heading: "读 diff 不被忽悠",
          paragraphs: [
            "常见误读:diff 大不等于改动大。一行插入就能推开 LCS 对齐,让后面的段落显示成“删除后又添加”,而它们其实一字未变。空白差异会放大这一点——一个行尾空格就能把一行标成“已变更”。这就是为什么 diff 之前先做空白规范化(text-cleaner 那一步)能让结果干净得多。",
            "词级模式是文章的解药:你看到的不是“一段变了”,而是 “grew → expanded”。合同和代码请留在行级——那里的部分行匹配会制造虚假信心,让人觉得某条法律条款“基本没变”。",
            "第二种误读是方向:哪份是“前”、哪份是“后”。工具会标注窗格,但评审流程里纪律很重要——diff 反着读会把新增看成删除,改变“批准”的含义。",
          ],
        },
        {
          heading: "纯客户端比较",
          paragraphs: [
            "比较完全在浏览器里完成:对两段文本跑 LCS,渲染成高亮块。不上传、无服务器往返、离线可用——当文本是合同、私人文档或未发布的源码时,这才是正确的架构。",
            "LCS 最坏情况是 O(n × m),所以有些工具会拒绝大文件;带公共前缀裁剪和哈希的实现可以轻松处理几十万行的文档。真正巨大的比较,按节拆分是务实做法。",
            "不保留任何内容:刷新页面两个窗格即清空。这让本工具适合经典的敏感用途——比较法律草案的两个版本、配置文件或导出的凭据清单,文本从不离开设备。",
          ],
        },
      ],
    },
    ja: {
      name: "テキスト差分",
      tagline: "2 つのテキストを単語単位で比較し、追加と削除をハイライト表示。アカウント登録もアップロードも不要です。",
      intro: [
        "左に原文、右に修正版を貼り付けると、変わった単語が即座に浮かび上がります。削除と追加は色分け表示。契約書の改訂確認、編集者によるリライトのチェック、同僚の直前修正の確認に最短ルートです。",
        "比較はすべてブラウザ内で完結します。長編の契約書、未刊行の原稿、機密文書もサーバーには一切送信されません。",
      ],
      steps: [
        "元のテキストを左の欄に貼り付けます。",
        "修正版を右の欄に貼り付けます。",
        "下の統合ビューを確認します。取り消し線が削除、緑が追加を示します。",
      ],
      faqs: [
        {
          q: "差分はどのように表示されますか?",
          a: "変更のない部分はそのまま、削除された単語はオレンジの取り消し線、追加された単語は緑で強調され、修正履歴つきの文書のように読めます。",
        },
        {
          q: "文字単位ですか、単語単位ですか?",
          a: "単語単位です。語内の小さな修正は「削除された語+追加された語」として表示され、文字単位より見通しがよくなります。",
        },
        {
          q: "サイズの上限はありますか?",
          a: "ブラウザのメモリだけが上限です。書籍一冊分の比較も可能ですが、非常に大きなテキストは描画に少し時間がかかります。",
        },
      ],
      deepDive: [
        {
          heading: "diff は実際どうやって変更を見つけるか",
          paragraphs: [
            "diff は文字ごとの走査ではありません。ほぼすべての diff ツールの根底には最長共通部分列(LCS)アルゴリズムがあります。両テキストに順序を保って現れる最長の行(または文字)列を見つけ、その列の外側が挿入か削除になります。良い diff が 2 文書の触っていない中ほどを整列させ、その周囲の変更だけを印付けるのはこのためです。",
            "粒度はユーザーから見える選択です。行レベルの diff は行全体を追加・削除として印付けます。コードレビュー、git、法務の赤入れのモードで、行は人が語る単位だからです。文字(語)レベルの diff は変更された行の内部で整列し、動いたのが 3 語だけだと示します。文章編集のモードで、実質同じテキストの段落を「全部削除、全部追加」と表示するのは読めたものではありません。",
            "挿入と削除が同じ場所で起きたとき、ツールはそれらを変更として対にします。等価な対応付けは複数あり——対応を変えても最終テキストは同じ——慣行は変更ブロックを最小化し、人が読む塊を減らすことです。",
          ],
        },
        {
          heading: "だまされずに diff を読む",
          paragraphs: [
            "よくある誤読:diff が大きいことは変更が大きいことを意味しません。1 行の挿入が LCS の整列を押し流し、後続の段落が「削除されて再追加」に見えることが、中身は 1 字も変わっていないのに起きます。空白の差がこれを増幅します。行末スペース 1 個で行が「変更」になります。だから diff の前に空白を正規化する(text-cleaner の通過)と結果が劇的にきれいになるのです。",
            "語レベルモードは文章への解毒です。「段落が変わった」のではなく「grew → expanded」が見えます。契約書やコードは行レベルのままにしてください。部分行の一致は、法務条項が「基本同じ」という誤った確信を作ります。",
            "2 つ目の誤読は向きです。どちらが「前」でどちらが「後」か。ツールはペインを表示しますが、レビューフローでは規律が重要です。diff を逆から読むと追加が削除に変わり、承認の意味が変わります。",
          ],
        },
        {
          heading: "純クライアント側比較",
          paragraphs: [
            "比較はブラウザ内で完結します。2 つのテキストに LCS を走らせ、ハイライトの塊として描画。アップロードもサーバー往復もなく、オフラインで動く。テキストが契約書、個人文書、未公開ソースコードのとき、これが正しい構造です。",
            "LCS の最悪計算量は O(n × m) で、大きなファイルを拒むツールがあるのはこのためです。共通接頭辞のトリミングとハッシュを持つ実装は、数十万行の文書を楽に扱います。本当に巨大な比較は、節ごとに分割するのが実用的です。",
            "何も残しません。ページを更新すれば両ペインは空になります。法務草案の 2 版、設定ファイル、書き出した認証情報リストの 2 版を比較する——テキストが端末の外に出ない——という定番の機密用途に安全な道具です。",
          ],
        },
      ],
    },
    es: {
      name: "Comparador de textos",
      tagline:
        "Compara dos versiones de un texto palabra por palabra, con altas y bajas resaltadas — sin cuenta, sin subidas, sin complicaciones.",
      intro: [
        "Pega el original a la izquierda y la versión editada a la derecha: las palabras cambiadas se encienden al momento, las eliminaciones en un color y las adiciones en otro. Es la forma más rápida de revisar una revisión de contrato, la reescritura de un editor o los cambios de última hora de un compañero.",
        "La comparación ocurre por completo en tu navegador: contratos largos, manuscritos inéditos y texto confidencial nunca tocan un servidor.",
      ],
      steps: [
        "Pega el texto original en el cuadro de la izquierda.",
        "Pega el texto modificado en el cuadro de la derecha.",
        "Lee la vista combinada de abajo: el tachado marca eliminaciones y el verde marca añadidos.",
      ],
      faqs: [
        {
          q: "¿Cómo se muestran las diferencias?",
          a: "El texto sin cambios va en normal; las palabras eliminadas van tachadas en naranja y las añadidas resaltadas en verde, como un documento con control de cambios.",
        },
        {
          q: "¿Es un diff a nivel de carácter o de palabra?",
          a: "A nivel de palabra. Un cambio pequeño dentro de una palabra se muestra como una palabra eliminada más una añadida, más fácil de escanear que el diff por caracteres.",
        },
        {
          q: "¿Hay límite de tamaño?",
          a: "Solo la memoria de tu navegador: se pueden comparar textos del tamaño de un libro, aunque los muy grandes tardan un poco en renderizarse.",
        },
      ],
      deepDive: [
        {
          heading: "Cómo encuentra los cambios un diff de verdad",
          paragraphs: [
            "Un diff no es un barrido carácter a carácter. Debajo de casi toda herramienta de diff está el algoritmo de la Subsecuencia Común Más Larga (LCS): hallar la secuencia más larga de líneas (o caracteres) que aparece en ambos textos en orden, y todo lo que queda fuera de ella es una inserción o un borrado. Por eso un buen diff alinea la parte intacta de dos documentos y solo marca lo que cambió alrededor.",
            "La granularidad es una elección visible para el usuario. El diff por líneas marca líneas enteras como añadidas o eliminadas — el modo de la revisión de código, git y el borrado legal, porque las líneas son la unidad de la que habla la gente. El diff por caracteres (o palabras) alinea dentro de la línea cambiada y muestra que solo se movieron tres palabras — el modo para edición de prosa, donde presentar un párrafo casi idéntico como \"todo borrado, todo añadido\" es ilegible.",
            "Cuando una inserción y un borrado ocurren en el mismo sitio, la herramienta los empareja como modificación. Existen alternativas equivalentes — emparejar de otra forma produce el mismo texto final — y la convención es minimizar el churn para que el humano lea menos bloques.",
          ],
        },
        {
          heading: "Leer un diff sin dejarse engañar",
          paragraphs: [
            "La lectura errónea común: un diff grande no significa cambios grandes. Una sola línea insertada puede desplazar la alineación LCS y hacer que párrafos posteriores parezcan borrados y vueltos a añadir, sin que haya cambiado nada en ellos. Las diferencias de espacio en blanco lo amplifican — un espacio final convierte una línea en \"cambiada\". Por eso normalizar espacios antes del diff (la pasada de text-cleaner) produce resultados mucho más limpios.",
            "El modo por palabras es el antídoto para la prosa: en vez de \"un párrafo cambió\", ves \"grew → expanded\". Para contratos y código, quédate a nivel de línea — las coincidencias parciales de línea crean falsa confianza de que una cláusula legal está \"prácticamente igual\".",
            "El segundo error es la dirección: cuál es el \"antes\" y cuál el \"después\". La herramienta etiqueta los paneles, pero la disciplina importa en flujos de revisión — un diff leído al revés convierte adiciones en borrados y cambia el significado de una aprobación.",
          ],
        },
        {
          heading: "Comparación puramente en cliente",
          paragraphs: [
            "La comparación corre por completo en tu navegador: LCS sobre los dos textos, mostrado como bloques resaltados. Sin subida, sin viaje al servidor, funciona sin conexión — la arquitectura correcta cuando los textos son contratos, documentos personales o código sin publicar.",
            "LCS es O(n × m) en el peor caso, razón por la que algunas herramientas rechazan archivos grandes; las implementaciones con recorte de prefijo común y hashing manejan documentos de cientos de miles de líneas con comodidad. Para comparaciones verdaderamente enormes, dividir por secciones es el enfoque práctico.",
            "Nada persiste: recarga la página y ambos paneles se vacían. Eso lo convierte en herramienta segura para el uso sensible clásico — comparar dos versiones de un borrador legal, un archivo de configuración o una lista de credenciales exportada, sin que el texto salga del dispositivo.",
          ],
        },
      ],
    },
    pt: {
      name: "Comparador de textos",
      tagline:
        "Compare duas versões de um texto palavra por palavra, com adições e exclusões destacadas — sem conta, sem upload, sem complicação.",
      intro: [
        "Cole o original à esquerda e a versão editada à direita: as palavras alteradas acendem na hora, exclusões numa cor e adições em outra. É o caminho mais rápido para revisar uma alteração de contrato, a reescrita de um editor ou os ajustes de última hora de um colega.",
        "A comparação acontece inteiramente no seu navegador — contratos longos, manuscritos inéditos e texto confidencial nunca passam por um servidor.",
      ],
      steps: [
        "Cole o texto original na caixa da esquerda.",
        "Cole o texto modificado na caixa da direita.",
        "Leia a visão combinada abaixo: o tachado marca exclusões e o verde marca adições.",
      ],
      faqs: [
        {
          q: "Como as diferenças são exibidas?",
          a: "O texto sem mudanças fica normal; palavras removidas aparecem tachadas em laranja e palavras adicionadas em verde, como um documento com controle de alterações.",
        },
        {
          q: "O diff é por caractere ou por palavra?",
          a: "Por palavra. Uma edição pequena dentro de uma palavra aparece como uma palavra removida mais uma adicionada — mais fácil de ler do que o diff por caractere.",
        },
        {
          q: "Existe limite de tamanho?",
          a: "Só a memória do navegador — comparações do tamanho de um livro funcionam, embora textos muito grandes demorem um pouco para renderizar.",
        },
      ],
      deepDive: [
        {
          heading: "Como o diff realmente encontra as mudanças",
          paragraphs: [
            "Um diff não é uma varredura caractere a caractere. Por baixo de quase toda ferramenta de diff está o algoritmo da Maior Subsequência Comum (LCS): encontrar a maior sequência de linhas (ou caracteres) que aparece nos dois textos em ordem, e tudo fora dela é inserção ou remoção. Por isso um bom diff alinea a parte intocada de dois documentos e marca só o que mudou ao redor.",
            "A granularidade é uma escolha visível ao usuário. O diff por linhas marca linhas inteiras como adicionadas ou removidas — o modo da revisão de código, git e da marcação legal, porque linhas são a unidade sobre a qual as pessoas falam. O diff por caracteres (ou palavras) alinea dentro da linha mudada e mostra que só três palavras se moveram — o modo para edição de prosa, onde apresentar um parágrafo quase idêntico como \"tudo removido, tudo adicionado\" é ilegível.",
            "Quando inserção e remoção ocorrem no mesmo ponto, a ferramenta as emparelha como modificação. Existem alternativas equivalentes — emparelhar de outro jeito produz o mesmo texto final — e a convenção é minimizar o churn para o humano ler menos blocos.",
          ],
        },
        {
          heading: "Ler um diff sem ser enganado",
          paragraphs: [
            "A leitura errada comum: um diff grande não significa mudanças grandes. Uma única linha inserida pode empurrar a alinhamento LCS e fazer parágrafos posteriores aparecerem como removidos e re-adicionados, sem que nada neles tenha mudado. Diferenças de espaço em branco amplificam isso — um espaço final torna uma linha \"mudada\". Por isso normalizar espaços antes do diff (a passada do text-cleaner) produz resultados dramaticamente mais limpos.",
            "O modo por palavras é o antídoto para prosa: em vez de \"um parágrafo mudou\", você vê \"grew → expanded\". Para contratos e código, fique no nível de linha — correspondências parciais de linha criam falsa confiança de que uma cláusula legal está \"praticamente igual\".",
            "O segundo erro é a direção: qual texto é o \"antes\" e qual o \"depois\". A ferramenta rotula os painéis, mas a disciplina importa em fluxos de revisão — um diff lido ao contrário transforma adições em remoções e muda o significado de uma aprovação.",
          ],
        },
        {
          heading: "Comparação puramente no cliente",
          paragraphs: [
            "A comparação roda por completo no seu navegador: LCS nos dois textos, renderizado como blocos destacados. Sem envio, sem ida e volta ao servidor, funciona offline — a arquitetura correta quando os textos são contratos, documentos pessoais ou código não publicado.",
            "LCS é O(n × m) no pior caso, razão pela qual algumas ferramentas recusam arquivos grandes; implementações com corte de prefixo comum e hashing lidam com documentos de centenas de milhares de linhas tranquilamente. Para comparações verdadeiramente enormes, dividir por seções é a abordagem prática.",
            "Nada persiste: recarregue a página e os dois painéis se esvaziam. Isso torna a ferramenta segura para o uso sensível clássico — comparar duas versões de um rascunho jurídico, um arquivo de configuração ou uma lista de credenciais exportada, sem o texto sair do dispositivo.",
          ],
        },
      ],
    },
  },
});
