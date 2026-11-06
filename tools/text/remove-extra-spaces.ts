import { TextTransform } from "../_engines/text-tool";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "remove-extra-spaces",
  category: "text",
  icon: "crop",
  engine: {
    component: TextTransform,
    props: {
      transform: "remove-extra-spaces",
      sample: "Hello   world  this  text  has\tsome\ttabs.\n\n\nFix   it   in   one  click.",
      options: [
        { key: "tabs", label: { en: "Convert tabs to spaces", zh: "制表符转空格", ja: "タブを空白に変換", es: "Convertir tabulaciones en espacios", pt: "Converter tabulações em espaços" } },
        { key: "trimLines", label: { en: "Trim line edges", zh: "去除行首尾空格", ja: "行頭行末の空白を削除", es: "Recortar bordes de línea", pt: "Aparar início e fim das linhas" } },
        { key: "removeEmptyLines", label: { en: "Remove empty lines", zh: "删除空行", ja: "空行を削除", es: "Quitar líneas vacías", pt: "Remover linhas vazias" } },
      ],
    },
  },
  related: ["remove-duplicate-lines", "text-cleaner", "text-sorter", "word-counter", "text-diff", "lorem-ipsum-generator", "sentence-counter", "text-to-binary", "reverse-text", "slug-generator"],
  copy: {
    en: {
      name: "Remove Extra Spaces",
      tagline:
        "Collapse double spaces into one, convert tabs, trim line edges and remove empty lines — clean up pasted text in a single pass.",
      intro: [
        "Text copied from PDFs, spreadsheets, terminals and chat apps often arrives riddled with double spaces, stray tabs and empty lines. This tool squashes repeated spaces into one and gives you toggles for the rest: turn tabs into spaces, trim each line's edges, and drop blank lines.",
        "Everything runs locally as you type, so you can paste logs, drafts or anything else sensitive without a second thought.",
      
        "Each cleanup rule is a discrete pass: consecutive spaces collapse to one, tabs convert to a chosen width, per-line edges trim, and runs of blank lines reduce to one or zero depending on the toggle. Because passes run in order, a pasted PDF's '  word   word  ' becomes 'word word' predictably rather than aggressively.",
        "Compared with doing this by regex each time (which means remembering the pattern and checking the edge cases), the toggles are already tuned to the four real-world cases: PDF copy, terminal output, spreadsheet paste and chat app export. And like every text tool here, the input never leaves your tab — a pasted stack trace or log stays local.",
      ],
      steps: [
        "Paste the messy text into the input box.",
        "Toggle tab conversion, line trimming or empty-line removal as needed.",
        "Copy the cleaned output straight back into your document or editor.",
      ],
      faqs: [
        {
          q: "Does it collapse spaces inside lines or only at the edges?",
          a: "Repeated spaces anywhere in the text are collapsed to a single space. Edge whitespace is only removed when you enable 'Trim line edges'.",
        },
        {
          q: "Will it break my code indentation?",
          a: "It can — indentation relies on leading spaces or tabs. For code, leave 'Trim line edges' off or use a proper formatter instead.",
        },
        {
          q: "Are line breaks preserved?",
          a: "Yes. The tool only touches horizontal whitespace and empty lines; the line structure of your text stays intact.",
        },
      ],
      deepDive: [
        {
          heading: "Why invisible spaces are the most common text bug",
          paragraphs: [
            "Extra spaces rarely announce themselves. A double space after a period, a trailing space at the end of a line, a tab disguised as indentation — all invisible in the editor, all real in the data. They break line-based comparisons (two \"identical\" lines differ by one trailing space), break token counts (a double space can add a phantom word), and produce the classic failed string match where two values look the same and compare unequal.",
            "The main sources are mechanical: copy-paste from PDFs (which inserts line breaks and padding spaces), OCR output, form fields with loose validation, and editors that auto-indent with mixed tabs and spaces. None of these show up in a visual review, which is why cleanup is a tool job, not a proofreading job.",
            "Non-breaking spaces deserve special mention: HTML editors and word processors love inserting U+00A0 instead of a normal space, and it survives trim operations invisibly. Text cleaned for a CSV import or a database lookup should normalize these too, or lookups keep mysteriously missing.",
          ],
        },
        {
          heading: "What each cleanup rule does",
          paragraphs: [
            "Collapsing multiple spaces turns any run of two or more spaces into a single one — safe for prose and lists, and the most-requested cleanup after pasting from PDFs. Trimming line edges removes leading and trailing whitespace per line, which is what makes diff and duplicate detection behave predictably afterwards.",
            "Removing empty lines handles the gap patterns: one blank line between paragraphs reads fine, but five blank lines from a pasted email chain read as broken. Removing all line breaks entirely joins the text into one paragraph — useful for meta descriptions and single-line form fields, destructive for anything line-structured.",
            "Tab-to-space conversion matters for code and config files: mixing tabs and spaces produces files where alignment differs per editor. Pick the rules that match your target — the tool applies them together, so a paste from a PDF typically wants collapse + trim + remove empty lines in one pass.",
          ],
        },
        {
          heading: "Instant, local, byte-precise",
          paragraphs: [
            "The cleanup runs character by character in your browser. Nothing is uploaded — for content under NDA, unpublished drafts or user data samples, that is the whole point of a client-side tool.",
            "The transformation is deterministic and reversible in effect: keep the original in one tab, clean in the other, and compare. Because every rule is mechanical, the same input always yields the same output — no model, no randomness, no surprises.",
            "A practical pair with the sibling tools: clean spaces first, then run remove-duplicate-lines, then text-diff against the original to see exactly what changed. That three-step pass turns messy pasted content into reviewable, diffable text in seconds.",
          ],
        },
      ],
    },
    zh: {
      name: "去除多余空格",
      tagline: "把连续空格折叠为一个,制表符转空格、去行首尾空白、删空行——一次清洗粘贴来的文本。",
      intro: [
        "从 PDF、表格、终端和聊天软件复制出来的文本,常常带着成对空格、多余制表符和空行。本工具把重复空格压缩为一个,其余交给开关:制表符转空格、去掉每行首尾空白、删除空行。",
        "全程本地实时处理,日志、草稿、任何内容都可以放心粘贴。",
      ],
      steps: [
        "把杂乱的文本粘贴到输入框。",
        "按需打开制表符转换、行首尾去空格或删空行选项。",
        "复制清理后的输出,直接贴回文档或编辑器。",
      ],
      faqs: [
        {
          q: "只会处理行边缘的空格,还是行内的也会?",
          a: "全文所有连续空格都会压缩为一个;行首尾空白只在打开“去除行首尾空格”后才会删掉。",
        },
        {
          q: "会破坏代码缩进吗?",
          a: "可能会——缩进依赖行首空格或制表符。处理代码请关掉“去除行首尾空格”,或改用专门的格式化工具。",
        },
        {
          q: "换行会保留吗?",
          a: "会。工具只处理水平空白和空行,文本的行结构保持不变。",
        },
      ],
      deepDive: [
        {
          heading: "为什么看不见的空格是最常见的文本 bug",
          paragraphs: [
            "多余空格几乎不会自报家门。句号后的双空格、行尾的尾随空格、伪装成缩进的制表符——编辑器里都看不见,数据里却都真实存在。它们破坏基于行的比较(两条“一模一样”的行因一个尾随空格判为不同),破坏词数统计(双空格能凭空多出一个词),并制造经典场景:两个值看起来一样、比较却不相等。",
            "主要来源都是机械性的:从 PDF 复制粘贴(会插入换行和填充空格)、OCR 输出、校验宽松的表单字段、混用制表符和空格自动缩进的编辑器。这些在目视检查里全都发现不了,所以清理是工具的活,不是校对的活。",
            "不间断空格值得单独点名:HTML 编辑器和文字处理器喜欢插入 U+00A0 而不是普通空格,而且它能隐形穿过 trim 操作。要进 CSV 导入或数据库查询的文本也必须规范化它,否则查询会莫名其妙地一直落空。",
          ],
        },
        {
          heading: "每条清理规则在做什么",
          paragraphs: [
            "合并连续空格把两个及以上的连续空格压成一个——对正文和列表安全,也是从 PDF 粘贴后最被需要的一条。修剪行首行尾逐行去掉边缘空白,这一步做了之后,diff 和重复检测的行为才可预测。",
            "删除空行处理的是间隔模式:段落之间一个空行读起来正常,从邮件链粘贴出来的五个空行读起来就是坏掉的。彻底移除所有换行则把文本并成一段——对 meta description 和单行表单字段有用,对任何有行结构的内容是破坏性的。",
            "制表符转空格对代码和配置文件重要:tab 与空格混用的文件,对齐在每个编辑器里都不一样。按目标选规则——工具会把这些规则一起应用,所以从 PDF 粘贴的内容通常想要“合并 + 修剪 + 删空行”一次完成。",
          ],
        },
        {
          heading: "即时、本地、字节级精确",
          paragraphs: [
            "清理在浏览器里逐字符进行,不上传任何内容。对保密内容、未发布的草稿或用户数据样本来说,客户端工具的意义就在于此。",
            "变换是确定性的,效果上也可以对照还原:一个标签页留原文,另一个放清理结果,对比即可。每条规则都是机械的,同样输入永远得到同样输出——没有模型、没有随机、没有意外。",
            "和同站工具配合的实用三连:先清理空格,再跑 remove-duplicate-lines,然后用 text-diff 对着原文看改了什么。三步下来,粘乱的文本几秒内变成可审阅、可对比的文本。",
          ],
        },
      ],
    },
    ja: {
      name: "余分な空白の削除",
      tagline: "連続する空白を 1 つに圧縮し、タブ変換・行端のトリム・空行削除もワンクリック。貼り付けたテキストを一発で整えます。",
      intro: [
        "PDF、表計算、ターミナル、チャットからコピーしたテキストには、重複した空白、余計なタブ、空行が混ざりがちです。本ツールは連続する空白を 1 つにまとめ、残りはオプションで対応:タブを空白へ変換、各行の端をトリム、空行の削除。",
        "処理はすべてローカルでリアルタイム。ログや下書きも安心して貼り付けられます。",
      ],
      steps: [
        "整っていないテキストを入力欄に貼り付けます。",
        "タブ変換・トリム・空行削除のオプションを必要に応じて切り替えます。",
        "整形後の出力をコピーして文書やエディタに戻します。",
      ],
      faqs: [
        {
          q: "行の端だけでなく行内の空白もまとまりますか?",
          a: "文中のどこにある連続空白も 1 つに圧縮されます。行の端の空白は「行頭行末の空白を削除」を有効にした場合のみ取り除かれます。",
        },
        {
          q: "コードのインデントが崩れませんか?",
          a: "崩れる可能性があります。インデントは行頭の空白やタブに依存するため、コードではトリムを無効にするか、フォーマッタを使ってください。",
        },
        {
          q: "改行は保持されますか?",
          a: "はい。本ツールが触るのは水平方向の空白と空行だけで、行の構造はそのまま残ります。",
        },
      ],
      deepDive: [
        {
          heading: "見えない空白が最も多いテキストバグの理由",
          paragraphs: [
            "余分な空白はほとんど名乗りを上げません。ピリオド後の二重スペース、行末の末尾スペース、インデントに偽装したタブ——エディタでは見えず、データには実在します。行単位の比較を壊し(「同一」の 2 行が末尾スペース 1 つで別判定になる)、トークン数を壊し(二重スペースが幽霊語を 1 個増やす)、そして 2 つの値が同じに見えて等しくないという古典的な文字列照合失敗を生みます。",
            "主な発生源は機械的です。PDF からのコピー(改行と詰めスペースを挿入)、OCR 出力、検証の緩いフォーム入力、タブとスペースを混ぜて自動インデントするエディタ。いずれも目視レビューでは現れないため、クリーンアップは校正ではなく道具の仕事です。",
            "ノーブレークスペースは特筆に値します。HTML エディタやワープロは通常スペースの代わりに U+00A0 を差し込み、しかも trim 操作を姿も見せずすり抜けます。CSV 取り込みやデータベース照会用に整えるテキストはこれも正規化すべきで、そうしないと照合は理由なく外れ続けます。",
          ],
        },
        {
          heading: "各クリーンアップルールの作用",
          paragraphs: [
            "連続スペースの圧縮は 2 個以上の連なりを 1 個にします。文章やリストには安全で、PDF 貼り付け後の最多要望です。行端のトリムは各行の先頭・末尾の空白を除きます。これが済むと diff や重複検出の挙動がようやく予測可能になります。",
            "空行の除去は間隔パターンを扱います。段落間の 1 空行は自然ですが、メールの連鎖から貼った 5 空行は壊れて見えます。改行の全除去はテキストを 1 段落に連結します。メタディスクリプションや 1 行フォームには有用で、行構造を持つ何に対しても破壊的です。",
            "タブからスペースへの変換はコードや設定ファイルで重要です。タブとスペースの混在はエディタごとに揃い方が違うファイルを作ります。対象に合わせてルールを選んでください。このツールはまとめて適用するので、PDF からの貼り付けは「圧縮+トリム+空行削除」の 1 回で足ります。",
          ],
        },
        {
          heading: "即時・ローカル・バイト精度",
          paragraphs: [
            "クリーンアップはブラウザで 1 文字ずつ進みます。アップロードは一切なく、秘密保持の内容、未公開の草稿、ユーザーデータのサンプルにとって、クライアント側ツールの意味はまさにそこにあります。",
            "変換は決定論的で、効果としては対照可能です。片方のタブに原文、もう片方にクリーン結果を置き比べます。全ルールが機械的なので、同じ入力は常に同じ出力——モデルも乱数も驚きもありません。",
            "姉妹ツールとの実用コンボ:まず空白を整え、次に remove-duplicate-lines、最後に text-diff で原文と比較して何が変わったかを見る。3 工程で貼り付けた乱れたテキストが、レビュー可能で diff 可能なテキストに変わります。",
          ],
        },
      ],
    },
    es: {
      name: "Eliminar espacios extra",
      tagline:
        "Reduce los espacios dobles a uno, convierte tabulaciones, recorta los bordes de línea y elimina líneas vacías: limpia el texto pegado de una vez.",
      intro: [
        "El texto copiado de PDFs, hojas de cálculo, terminales y chats suele llegar lleno de espacios dobles, tabulaciones sueltas y líneas en blanco. Esta herramienta comprime los espacios repetidos a uno y el resto va por interruptores: convertir tabulaciones, recortar cada línea y quitar líneas vacías.",
        "Todo se procesa en local y en tiempo real: pega logs, borradores o texto confidencial sin pensarlo dos veces.",
      ],
      steps: [
        "Pega el texto desordenado en el cuadro de entrada.",
        "Activa la conversión de tabulaciones, el recorte o la eliminación de líneas vacías según necesites.",
        "Copia la salida limpia de vuelta a tu documento o editor.",
      ],
      faqs: [
        {
          q: "¿Colapsa espacios dentro de las líneas o solo en los bordes?",
          a: "Los espacios repetidos en cualquier parte del texto se reducen a uno. Los blancos de los bordes solo se quitan con «Recortar bordes de línea» activado.",
        },
        {
          q: "¿Romperá la indentación de mi código?",
          a: "Puede: la indentación depende de los espacios y tabulaciones iniciales. Para código, deja el recorte desactivado o usa un formateador.",
        },
        {
          q: "¿Se conservan los saltos de línea?",
          a: "Sí. La herramienta solo toca el espacio horizontal y las líneas vacías; la estructura de líneas queda intacta.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué los espacios invisibles son el bug de texto más común",
          paragraphs: [
            "Los espacios de más casi nunca se presentan. Un doble espacio tras el punto, un espacio final a fin de línea, un tabulador disfrazado de sangría — invisibles en el editor, reales en los datos. Rompen las comparaciones por líneas (dos líneas \"idénticas\" difieren en un espacio final), rompen los recuentos de tokens (un doble espacio añade una palabra fantasma) y producen el clásico fallo de coincidencia: dos valores se ven iguales y comparan distintos.",
            "Las fuentes principales son mecánicas: copiar desde PDF (que inserta saltos y espacios de relleno), salida de OCR, campos de formulario con validación laxa, y editores que auto-indentan mezclando tabuladores y espacios. Nada de eso aparece en una revisión visual, y por eso la limpieza es un trabajo de herramienta, no de corrección.",
            "Los espacios de no separación merecen mención aparte: los editores HTML y los procesadores adoran insertar U+00A0 en lugar de un espacio normal, y sobreviven a los trim de forma invisible. El texto destinado a un import CSV o a una consulta de base de datos debe normalizarlos también, o las búsquedas siguen fallando misteriosamente.",
          ],
        },
        {
          heading: "Qué hace cada regla de limpieza",
          paragraphs: [
            "Colapsar espacios convierte cualquier tanda de dos o más espacios en uno solo — seguro para prosa y listas, y la limpieza más pedida tras pegar desde PDF. Recortar los bordes de línea elimina el espacio inicial y final de cada línea, que es lo que hace que el diff y la detección de duplicados se comporten de forma predecible después.",
            "Eliminar líneas vacías atiende los patrones de hueco: una línea en blanco entre párrafos se lee bien, pero cinco de una cadena de correos pegada se leen como roto. Quitar todos los saltos de línea une el texto en un solo párrafo — útil para meta descriptions y campos de una línea, destructivo para todo lo que tenga estructura de líneas.",
            "Convertir tabuladores a espacios importa en código y configuración: mezclar ambos produce archivos cuya alineación cambia según el editor. Elige las reglas que encajen con tu destino — la herramienta las aplica juntas, así que un pegado de PDF normalmente quiere colapsar + recortar + quitar líneas vacías en una pasada.",
          ],
        },
        {
          heading: "Instantáneo, local, preciso al byte",
          paragraphs: [
            "La limpieza avanza carácter a carácter en tu navegador. Nada se sube: para contenido bajo confidencialidad, borradores sin publicar o muestras de datos de usuarios, ahí está todo el sentido de una herramienta de cliente.",
            "La transformación es determinista y en la práctica contrastable: deja el original en una pestaña y el resultado en otra, y compara. Cada regla es mecánica, así que la misma entrada produce siempre la misma salida — sin modelos, sin azar, sin sorpresas.",
            "Combo práctico con las herramientas hermanas: limpia espacios, luego remove-duplicate-lines, y al final text-diff contra el original para ver qué cambió exactamente. En tres pasos, el texto pegado y desordenado se vuelve texto revisable y comparable en segundos.",
          ],
        },
      ],
    },
    pt: {
      name: "Remover espaços extras",
      tagline:
        "Reduz espaços duplos a um, converte tabulações, apara as bordas das linhas e remove linhas vazias — limpe o texto colado numa única passada.",
      intro: [
        "Texto copiado de PDFs, planilhas, terminais e apps de mensagem costuma chegar cheio de espaços duplos, tabulações soltas e linhas em branco. Esta ferramenta comprime os espaços repetidos em um e o resto fica por conta das opções: converter tabulações, aparar as pontas de cada linha e descartar linhas vazias.",
        "Tudo roda localmente e em tempo real — cole logs, rascunhos ou texto confidencial sem pensar duas vezes.",
      ],
      steps: [
        "Cole o texto bagunçado na caixa de entrada.",
        "Ative a conversão de tabulações, o aparar de linhas ou a remoção de linhas vazias conforme precisar.",
        "Copie a saída limpa de volta para o documento ou editor.",
      ],
      faqs: [
        {
          q: "Reduz espaços dentro das linhas ou só nas bordas?",
          a: "Espaços repetidos em qualquer parte do texto viram um só. Os espaços das bordas só saem com “Aparar início e fim das linhas” ativado.",
        },
        {
          q: "Vai quebrar a indentação do meu código?",
          a: "Pode — a indentação depende dos espaços e tabulações iniciais. Para código, deixe o aparar desligado ou use um formatador.",
        },
        {
          q: "As quebras de linha são mantidas?",
          a: "Sim. A ferramenta só mexe em espaços horizontais e linhas vazias; a estrutura de linhas fica intacta.",
        },
      ],
      deepDive: [
        {
          heading: "Por que espaços invisíveis são o bug de texto mais comum",
          paragraphs: [
            "Espaços em excesso quase nunca se anunciam. Um espaço duplo depois do ponto, um espaço final no fim da linha, uma tabulação fingindo ser indentação — invisíveis no editor, reais nos dados. Eles quebram comparações por linha (duas linhas \"idênticas\" diferem num espaço final), quebram contagens de tokens (um espaço duplo cria uma palavra fantasma) e produzem o clássico erro de casamento de strings: dois valores parecem iguais e comparam diferentes.",
            "As fontes principais são mecânicas: copiar de PDF (que insere quebras e espaços de preenchimento), saída de OCR, campos de formulário com validação frouxa, e editores que auto-indentam misturando tabulações e espaços. Nada disso aparece numa revisão visual, e por isso a limpeza é trabalho de ferramenta, não de revisão.",
            "Espaços rígidos merecem menção à parte: editores HTML e processadores de texto adoram inserir U+00A0 em vez de espaço normal, e ele atravessa operações de trim de forma invisível. Texto destinado a import CSV ou consulta de banco deve normalizá-los também, ou as buscas continuam falhando misteriosamente.",
          ],
        },
        {
          heading: "O que cada regra de limpeza faz",
          paragraphs: [
            "Colapsar espaços transforma qualquer sequência de dois ou mais espaços em um só — seguro para prosa e listas, e a limpeza mais pedida depois de colar de PDF. Aparar as bordas das linhas remove o espaço inicial e final de cada linha, o que faz diff e detecção de duplicados se comportarem de forma previsível depois.",
            "Remover linhas vazias trata os padrões de vão: uma linha em branco entre parágrafos lê bem, mas cinco de uma corrente de e-mails colada leem como quebrado. Remover todas as quebras de linha une o texto num único parágrafo — útil para meta descriptions e campos de uma linha, destrutivo para qualquer coisa com estrutura de linhas.",
            "Converter tabulações em espaços importa em código e configuração: misturar os dois produz arquivos cujo alinhamento muda por editor. Escolha as regras que combinam com o destino — a ferramenta aplica todas juntas, então um colado de PDF normalmente quer colapsar + aparar + remover linhas vazias numa passada.",
          ],
        },
        {
          heading: "Instantâneo, local, preciso ao byte",
          paragraphs: [
            "A limpeza avança caractere por caractere no seu navegador. Nada é enviado — para conteúdo sob confidencialidade, rascunhos não publicados ou amostras de dados de usuários, aí está todo o sentido de uma ferramenta cliente.",
            "A transformação é determinística e, no efeito, comparável: deixe o original numa aba e o resultado na outra, e contraste. Cada regra é mecânica, então a mesma entrada produz sempre a mesma saída — sem modelo, sem aleatoriedade, sem surpresas.",
            "Combo prático com as ferramentas irmãs: limpe espaços, depois remove-duplicate-lines, e por fim text-diff contra o original para ver exatamente o que mudou. Em três passos, o texto colado e bagunçado vira texto revisável e comparável em segundos.",
          ],
        },
      ],
    },
  },
});
