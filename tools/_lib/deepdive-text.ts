/**
 * deepDive 补充模块 —— 文本族(line-number-generator / text-line-filter /
 * text-sequence-generator / character-frequency-counter)。
 *
 * 写作纪律:2 节 × 3 段 × 5 核心语;讲原理、边界与实务;不做营销。
 * 这些工具的 copy 都由工厂函数生成,所以深文放这里、工厂只引用。
 */

import type { Locale } from "@/lib/site";

type Section = { heading: string; paragraphs: [string, string, string] };
const CORE = ["en", "zh", "ja", "es", "pt"] as const;

function pick5(map: Record<(typeof CORE)[number], Section[]>, locale: Locale): Section[] | undefined {
  // overlay 语种(fr/de/ru/it/tr/ko/ar/hi/id/vi)设计上回退英文深文:
  // 这些语种的界面与页面文案各有 overlay,但深文不铺(与全站既有约定一致)。
  return (map as Record<string, Section[] | undefined>)[locale] ?? map.en;
}

/** 行号生成器 */
export function lineNumberDeepDive(locale: Locale): Section[] | undefined {
  return pick5(
    {
      en: [
        {
          heading: "Numbering is a presentation decision, not a text edit",
          paragraphs: [
            "Adding line numbers looks trivial — prefix every line with an index — but the details decide whether the output is usable. Separator choice (space, tab, colon, dot) determines whether the result pastes cleanly into code editors and spreadsheet cells, and alignment choice determines whether the numbers line up as a column at all. A right-aligned number with a fixed width is the only form that stays visually a column once the count crosses 9, 99 or 999.",
            "The start value and step exist for reasons beyond vanity. Continuing from an earlier batch is the common case when a long file has been split, and a step other than one is how you number every other line of an interleaved log or produce a numbered sequence with gaps reserved for annotations.",
            "The tool deliberately does not renumber the content semantically. It does not detect existing numbering and strip it, does not skip blank lines by default, and does not guess which lines are headings. Those are editorial decisions with real consequences, and a tool that guesses them silently produces output the user cannot audit.",
          ],
        },
        {
          heading: "Where numbering breaks: fixed-width, CJK width and copy targets",
          paragraphs: [
            "Fixed-width alignment assumes every character is the same width. In monospaced text that holds; in proportional text it does not, and Unicode complicates it further because full-width CJK characters occupy two columns while Latin characters occupy one. Padding computed by character count therefore produces a visually ragged column as soon as the content mixes scripts — which is why the padding here is computed on the number side only, where the alphabet is digits and the assumption actually holds.",
            "Copy targets matter more than most people expect. A tab-separated result pasted into a spreadsheet becomes two columns; a space-separated result becomes one. A colon-separated result is what you want when the numbering has to survive a round trip through a diff tool without being confused for part of the content. The choice is exposed rather than assumed because the right answer depends entirely on where the text is going.",
            "The honest limitation: numbering is a prefix operation on lines as they arrive. If the input has already been wrapped or unwrapped by an editor, the line count is whatever the paste produced, and there is nothing in the text that can recover the original line structure. The tool shows the resulting count so the discrepancy is visible immediately rather than discovered later.",
          ],
        },
      ],
      zh: [
        {
          heading: "加行号是排版决策,不是文本编辑",
          paragraphs: [
            "给每行加序号看起来很简单——在前面加个索引就行——但细节决定输出能不能用。分隔符的选择(空格、制表符、冒号、点)决定结果能否干净地粘进代码编辑器和表格单元格;对齐方式决定序号到底能不能排成一列。只有「右对齐 + 固定宽度」这一种形式,在计数跨过 9、99、999 时仍然保持成一列。",
            "起始值与步长存在的原因不只是好看。长文件被拆分后接着上批继续编号是常见场景;步长不等于一时,可以给交错日志的每隔一行编号,或产出预留空档供批注的序列。",
            "工具刻意不做语义层面的重编号。它不检测并剥离已有编号,默认不跳过空行,也不猜哪些行是标题。这些都是有真实后果的编辑决策,一个擅自猜测的工具会产出用户无法核查的结果。",
          ],
        },
        {
          heading: "编号会在哪里翻车:固定宽度、CJK 宽度与粘贴目标",
          paragraphs: [
            "固定宽度对齐假设每个字符同宽。等宽文本里成立;比例字体里不成立,而 Unicode 让它更复杂——全角 CJK 字符占两列,拉丁字符占一列。因此按字符数计算的填充,一旦内容混排多种文字,就会产出视觉上参差的列——这正是本工具的填充只在数字侧计算的原因:那一侧字母表是数字,假设真正成立。",
            "粘贴目标比多数人以为的更重要。制表符分隔的结果粘进表格会变成两列;空格分隔的会变成一列;冒号分隔的则是当你需要编号在 diff 工具里往返而不被误认成内容一部分时的选择。这个选择被暴露出来而不是替你假设,因为正确答案完全取决于文本要去哪。",
            "诚实的局限:编号是对「到达时的行」做前缀操作。如果输入已经被编辑器折行或展平,行数就是粘贴产生的行数,文本里没有任何信息能恢复原始行结构。工具会显示结果行数,让差异立刻可见,而不是事后才发现。",
          ],
        },
      ],
      ja: [
        {
          heading: "行番号付与は組版の判断であり、テキスト編集ではない",
          paragraphs: [
            "各行に番号を付けるのは簡単に見えますが、細部が出力の使える/使えないを決めます。区切り文字の選択(空白・タブ・コロン・ドット)はコードエディタや表計算セルにきれいに貼れるかを決め、整列の選択は番号が列として揃うかどうかを決めます。右寄せ＋固定幅だけが、件数が 9・99・999 を越えても列を保つ形式です。",
            "開始値と増分の存在は見栄えのためではありません。長いファイルを分割したあと前回の続きから番号を振るのはよくある場面で、増分が 1 以外なのは、交互に並ぶログの一行おきに番号を振る、あるいは注記用の空きを残した連番を作る方法です。",
            "ツールは意味論的な再番号付けを意図的に行いません。既存の番号を検出して剥がすこともしませんし、既定で空行を飛ばすことも、どの行が見出しかを推測することもしません。それらは実際の結果を伴う編集判断であり、黙って推測するツールは利用者が検証できない出力を作ります。",
          ],
        },
        {
          heading: "番号付与が破綻する場所:固定幅・CJK 幅・貼り付け先",
          paragraphs: [
            "固定幅整列はすべての文字が同じ幅だと仮定します。等幅テキストでは成立しますが、プロポーショナルでは成立せず、Unicode がさらに複雑にします。全角 CJK は 2 桁分、ラテン文字は 1 桁分です。したがって文字数で計算したパディングは、文字体系が混ざった瞬間に目視でギザギザの列になります — ここでパディングを数字側だけで計算するのは、その側の字母が数字であり仮定が実際に成り立つからです。",
            "貼り付け先は多くの人が思う以上に重要です。タブ区切りの結果を表計算に貼ると 2 列になり、空白区切りだと 1 列になります。コロン区切りは、番号が diff ツールを往復しても内容の一部と誤解されない必要があるときの選択です。正解はテキストの行き先に完全に依存するため、選択は仮定せず公開しています。",
            "正直な限界:番号付与は「届いた行」に対する前置操作です。入力がエディタで折り返し・展開済みなら、行数は貼り付けが生んだ行数であり、元の行構造を復元できる情報はテキストにありません。ツールは結果の行数を表示するので、食い違いは後で発見されるのではなく即座に見えます。",
          ],
        },
      ],
      es: [
        {
          heading: "Numerar es una decisión de presentación, no una edición de texto",
          paragraphs: [
            "Añadir números de línea parece trivial — prefijar cada línea con un índice — pero los detalles deciden si la salida es utilizable. La elección de separador (espacio, tabulador, dos puntos, punto) determina si el resultado se pega limpiamente en editores de código y celdas de hoja de cálculo, y la elección de alineación determina si los números forman una columna. Solo la forma alineada a la derecha con ancho fijo sigue siendo una columna cuando el recuento cruza 9, 99 o 999.",
            "El valor inicial y el paso existen por razones que van más allá de la estética. Continuar desde un lote anterior es el caso habitual cuando un archivo largo se ha dividido, y un paso distinto de uno es cómo numerar cada dos líneas de un log intercalado o producir una secuencia con huecos reservados para anotaciones.",
            "La herramienta deliberadamente no renumera el contenido semánticamente. No detecta numeración existente y la elimina, no salta líneas en blanco por defecto y no adivina qué líneas son encabezados. Son decisiones editoriales con consecuencias reales, y una herramienta que las adivina en silencio produce salida que el usuario no puede auditar.",
          ],
        },
        {
          heading: "Dónde se rompe la numeración: ancho fijo, ancho CJK y destino de copia",
          paragraphs: [
            "La alineación de ancho fijo supone que todo carácter mide lo mismo. En texto monoespaciado se cumple; en texto proporcional no, y Unicode lo complica más porque los caracteres CJK de ancho completo ocupan dos columnas mientras los latinos ocupan una. El relleno calculado por número de caracteres produce por tanto una columna visualmente irregular en cuanto el contenido mezcla escrituras, y por eso aquí el relleno se calcula solo del lado del número, donde el alfabeto son dígitos y la suposición realmente se cumple.",
            "El destino de la copia importa más de lo que la mayoría espera. Un resultado separado por tabuladores pegado en una hoja de cálculo se convierte en dos columnas; uno separado por espacios se convierte en una. Un resultado separado por dos puntos es lo que quieres cuando la numeración debe sobrevivir a un viaje por una herramienta de diff sin ser confundida con parte del contenido. La elección se expone en vez de suponerse porque la respuesta correcta depende por completo de adónde va el texto.",
            "La limitación honesta: numerar es una operación de prefijo sobre las líneas tal como llegan. Si el editor ya ha ajustado o desajustado el texto, el recuento de líneas es el que produjo el pegado, y no hay nada en el texto que recupere la estructura original. La herramienta muestra el recuento resultante para que la discrepancia se vea de inmediato y no se descubra después.",
          ],
        },
      ],
      pt: [
        {
          heading: "Numerar é uma decisão de apresentação, não uma edição de texto",
          paragraphs: [
            "Adicionar números de linha parece trivial — prefixar cada linha com um índice — mas os detalhes decidem se a saída é utilizável. A escolha do separador (espaço, tabulação, dois-pontos, ponto) determina se o resultado cola limpo em editores de código e células de planilha, e a escolha de alinhamento determina se os números formam uma coluna. Somente a forma alinhada à direita com largura fixa permanece uma coluna quando a contagem passa de 9, 99 ou 999.",
            "O valor inicial e o incremento existem por razões além da estética. Continuar de um lote anterior é o caso comum quando um arquivo longo foi dividido, e um incremento diferente de um é como numerar a cada duas linhas de um log intercalado ou produzir uma sequência com lacunas reservadas para anotações.",
            "A ferramenta deliberadamente não renumera o conteúdo semanticamente. Não detecta numeração existente e a remove, não pula linhas em branco por padrão e não adivinha quais linhas são títulos. São decisões editoriais com consequências reais, e uma ferramenta que as adivinha em silêncio produz saída que o usuário não consegue auditar.",
          ],
        },
        {
          heading: "Onde a numeração quebra: largura fixa, largura CJK e destino da cópia",
          paragraphs: [
            "O alinhamento de largura fixa pressupõe que todo caractere tenha a mesma largura. Em texto monoespaçado isso vale; em texto proporcional não, e o Unicode complica mais porque caracteres CJK de largura completa ocupam duas colunas enquanto os latinos ocupam uma. O preenchimento calculado por contagem de caracteres produz, portanto, uma coluna visualmente irregular assim que o conteúdo mistura escritas — e por isso aqui o preenchimento é calculado só do lado do número, onde o alfabeto são dígitos e a suposição realmente vale.",
            "O destino da cópia importa mais do que a maioria espera. Um resultado separado por tabulações colado numa planilha virá duas colunas; um separado por espaços virá uma. Um resultado separado por dois-pontos é o que você quer quando a numeração precisa sobreviver a uma passagem por ferramenta de diff sem ser confundida com parte do conteúdo. A escolha é exposta em vez de suposta porque a resposta certa depende inteiramente de para onde o texto vai.",
            "A limitação honesta: numerar é uma operação de prefixo sobre as linhas como elas chegam. Se o editor já quebrou ou desfez quebras, a contagem de linhas é a que a colagem produziu, e não há nada no texto capaz de recuperar a estrutura original. A ferramenta mostra a contagem resultante para que a discrepância apareça de imediato em vez de ser descoberta depois.",
          ],
        },
      ],
    },
    locale,
  );
}

/** 文本行筛选 */
export function textLineFilterDeepDive(locale: Locale): Section[] | undefined {
  return pick5(
    {
      en: [
        {
          heading: "Line counts depend on where you look, so this tool shows both",
          paragraphs: [
            "Every line-filtering tool has to answer an ambiguous question before it starts: what counts as a line? A file ending in a newline has a trailing empty field that most people do not consider a line; a file with Windows line endings has CRLF where the parser may or may not treat the CR as part of the content; a paste from a spreadsheet may carry a final blank row. Two tools that answer differently produce different counts from identical input, which is why this one displays the input count, the retained count and the removed count separately.",
            "Empty-line handling is the second ambiguity. Trimming lines to empty and then removing empty lines are two operations that look the same in a short example and diverge on real data: text with trailing spaces suddenly loses those lines, and text with intentional blank separators loses its structure. The order matters, and the tool applies trim first then filter so the behaviour is stated rather than accidental.",
            "Character counting has the same class of problem at a smaller scale. Counting UTF-16 code units, code points and grapheme clusters give three different answers for CJK text, for combining marks and for emoji sequences. The counts here are code points, which is the middle ground: technically what Unicode calls a character, practically one visible glyph for most scripts but not for combining sequences.",
          ],
        },
        {
          heading: "What this tool will not do, and why that is a feature",
          paragraphs: [
            "It does not evaluate regular expressions, because a regex filter is a different tool with different failure modes: a pattern that is valid but catastrophic can hang the browser, and a pattern that silently matches zero lines looks identical to a filter that works. Keeping this tool on fixed rules (length, emptiness, prefixes, duplicates) means every outcome is predictable from the label text.",
            "It does not parse CSV quoting. A line containing a quoted newline is two lines to a line-based filter and one field to a CSV parser; pretending to handle both would produce output that is wrong in a way nobody can see. The limitation is stated in the copy rather than discovered in production.",
            "It does not normalise or repair content. Trailing whitespace is stripped only when the corresponding rule is enabled, and no character substitution happens anywhere. For logs and diffable text, that is the correct default: a filter that also reformats is a filter you cannot trust to preserve what it passes through.",
          ],
        },
      ],
      zh: [
        {
          heading: "行数取决于你在哪里看,所以本工具把三者都列出来",
          paragraphs: [
            "任何行筛选工具在开工前都得回答一个含糊的问题:什么算一行?以换行结尾的文件有个尾部空字段,多数人不认为那是一行;Windows 换行的文件有 CRLF,解析器可能把 CR 当内容一部分,也可能不;从表格粘贴的文本可能带一行末尾空行。两个回答不同的工具会从相同输入产出不同计数,所以本工具把输入行数、保留行数与移除行数分开显示。",
            "空行处理是第二个含糊点。「把行裁剪到空」和「移除空行」在短例子里看起来一样,在真实数据上分歧很大:带尾随空格的文本会突然丢掉那些行,带刻意空行分隔的文本会丢掉结构。顺序很重要,本工具先裁剪再过滤,让行为是被声明的而不是偶然的。",
            "字符计数在更小尺度上有同类问题。按 UTF-16 码元、码位、字素簇计数,CJK 文本、组合标记与 emoji 序列会给出三个不同答案。这里的计数是码位,取的是中间地带:技术上就是 Unicode 所说的字符,实务上对多数文字系统等于一个可见字形,但对组合序列不等。",
          ],
        },
        {
          heading: "本工具不做什么,以及为什么那是特性",
          paragraphs: [
            "它不求值正则表达式,因为正则筛是另一个工具、另一套失败模式:一个语法合法但灾难性的模式能把浏览器挂死,一个静默匹配零行的模式看起来和正常工作一模一样。把本工具限定在固定规则(长度、空行、前缀、重复)上,意味着每个结果都能从标签文字预测出来。",
            "它不解析 CSV 引号。含引号内换行的一行,对基于行的筛是两行,对 CSV 解析器是一个字段;假装两者都处理,会产出没人看得见的错误。这个局限写在文案里,而不是在生产中被发现。",
            "它不做归一化或修复。只有在对应规则启用时才剥除尾随空白,任何字符替换都不会发生。对日志与可 diff 文本来说这是正确的默认:一个顺带重排格式的筛,是你不能信任它原样传递内容的筛。",
          ],
        },
      ],
      ja: [
        {
          heading: "行数はどこで数えるかで変わるので、三つとも表示します",
          paragraphs: [
            "行フィルタは着手前に曖昧な問いに答える必要があります。何が一行か。改行で終わるファイルには末尾の空フィールドがあり、多くの人はそれを一行と見なしません。Windows 改行のファイルには CRLF があり、パーサは CR を内容の一部と見なすことも見なさないこともあります。表計算からの貼り付けは末尾に空行を伴うことがあります。答えが違う二つのツールは同じ入力から違う件数を出します。だから本ツールは入力件数・保持件数・除去件数を別々に表示します。",
            "空行の扱いが第二の曖昧さです。「行を空までトリムする」と「空行を除去する」は短い例では同じに見え、実データでは大きく分かれます。末尾空白のあるテキストはその行を突然失い、意図的な空行区切りのあるテキストは構造を失います。順序が重要で、本ツールは先にトリムしてからフィルタするので、挙動は偶然ではなく明示されます。",
            "文字数にも小さな尺度で同種の問題があります。UTF-16 コード単位・コードポイント・書記素クラスタで数えると、CJK テキスト、結合マーク、絵文字列で三つの違う答えが出ます。ここでの件数はコードポイントで、中間の立場です。技術的には Unicode の言う文字であり、実務上は多くの文字体系で一つの可視字形ですが、結合列ではそうではありません。",
          ],
        },
        {
          heading: "このツールがしないこと、そしてそれが利点である理由",
          paragraphs: [
            "正規表現を評価しません。正規表現フィルタは別のツールで失敗の種類も違います。妥当だが破滅的なパターンはブラウザを固め、静かにゼロ行に一致するパターンは正常動作と見分けがつきません。本ツールを固定ルール(長さ、空行、接頭辞、重複)に限定すれば、すべての結果がラベル文言から予測できます。",
            "CSV の引用符を解析しません。引用符内改行を含む行は、行ベースのフィルタには二行、CSV パーサには一つのフィールドです。両方を扱うふりをすれば、誰にも見えない形で間違った出力になります。制限は文案に明記され、本番で発見されることはありません。",
            "正規化や修復をしません。末尾空白は対応するルールが有効なときだけ剥がされ、文字置換はどこでも起きません。ログや diff 可能なテキストではこれが正しい既定です。整形もするフィルタは、通したものを保持すると信頼できないフィルタです。",
          ],
        },
      ],
      es: [
        {
          heading: "El recuento de líneas depende de dónde miras, así que la herramienta muestra los tres",
          paragraphs: [
            "Toda herramienta de filtrado por líneas debe responder una pregunta ambigua antes de empezar: ¿qué cuenta como línea? Un archivo terminado en salto de línea tiene un campo vacío final que la mayoría no considera una línea; un archivo con finales Windows tiene CRLF donde el parser puede o no tratar el CR como parte del contenido; un pegado desde una hoja de cálculo puede arrastrar una fila en blanco final. Dos herramientas que responden distinto producen recuentos distintos con entrada idéntica, y por eso esta muestra por separado el recuento de entrada, el retenido y el eliminado.",
            "El manejo de líneas vacías es la segunda ambigüedad. Recortar líneas hasta vacío y eliminar líneas vacías son dos operaciones que se ven igual en un ejemplo corto y divergen en datos reales: el texto con espacios finales pierde súbitamente esas líneas, y el texto con separadores en blanco intencionales pierde su estructura. El orden importa, y la herramienta recorta primero y filtra después para que el comportamiento esté declarado en vez de ser accidental.",
            "El conteo de caracteres tiene la misma clase de problema a menor escala. Contar unidades UTF-16, puntos de código y clústeres de grafemas da tres respuestas distintas para texto CJK, para marcas combinantes y para secuencias emoji. Los recuentos aquí son puntos de código, el término medio: técnicamente lo que Unicode llama carácter, prácticamente un glifo visible para la mayoría de escrituras pero no para secuencias combinantes.",
          ],
        },
        {
          heading: "Lo que esta herramienta no hará, y por qué eso es una virtud",
          paragraphs: [
            "No evalúa expresiones regulares, porque un filtro regex es otra herramienta con otros modos de fallo: un patrón válido pero catastrófico puede colgar el navegador, y un patrón que en silencio coincide con cero líneas se ve igual que un filtro que funciona. Mantener esta herramienta en reglas fijas (longitud, vaciedad, prefijos, duplicados) significa que todo resultado es predecible desde el texto de la etiqueta.",
            "No analiza las comillas de CSV. Una línea que contiene un salto de línea entre comillas son dos líneas para un filtro basado en líneas y un campo para un parser CSV; fingir manejar ambos produciría salida incorrecta de una forma que nadie puede ver. La limitación se declara en el copy en lugar de descubrirse en producción.",
            "No normaliza ni repara contenido. El espacio final se elimina solo cuando la regla correspondiente está activa, y no ocurre ninguna sustitución de caracteres en ningún punto. Para logs y texto diffeable ese es el valor por defecto correcto: un filtro que además reformatea es un filtro en el que no puedes confiar para preservar lo que deja pasar.",
          ],
        },
      ],
      pt: [
        {
          heading: "A contagem de linhas depende de onde você olha, então a ferramenta mostra as três",
          paragraphs: [
            "Toda ferramenta de filtragem por linhas precisa responder a uma pergunta ambígua antes de começar: o que conta como linha? Um arquivo terminado em quebra de linha tem um campo vazio final que a maioria não considera linha; um arquivo com finais Windows tem CRLF onde o parser pode ou não tratar o CR como parte do conteúdo; uma colagem de planilha pode trazer uma linha em branco final. Duas ferramentas que respondem diferente produzem contagens diferentes com entrada idêntica, e é por isso que esta mostra separadamente a contagem de entrada, a retida e a removida.",
            "O tratamento de linhas vazias é a segunda ambiguidade. Aparar linhas até vazio e remover linhas vazias são duas operações que parecem iguais num exemplo curto e divergem em dados reais: texto com espaços finais perde de repente essas linhas, e texto com separadores em branco intencionais perde a estrutura. A ordem importa, e a ferramenta apara primeiro e filtra depois para que o comportamento seja declarado em vez de acidental.",
            "A contagem de caracteres tem a mesma classe de problema em escala menor. Contar unidades UTF-16, pontos de código e clusters de grafemas dá três respostas diferentes para texto CJK, para marcas combinantes e para sequências emoji. As contagens aqui são pontos de código, o meio-termo: tecnicamente o que o Unicode chama de caractere, praticamente um glifo visível para a maioria das escritas mas não para sequências combinantes.",
          ],
        },
        {
          heading: "O que esta ferramenta não fará, e por que isso é uma virtude",
          paragraphs: [
            "Não avalia expressões regulares, porque um filtro regex é outra ferramenta com outros modos de falha: um padrão válido mas catastrófico pode travar o navegador, e um padrão que em silêncio casa com zero linhas parece idêntico a um filtro que funciona. Manter esta ferramenta em regras fixas (comprimento, vacuidade, prefixos, duplicatas) significa que todo resultado é previsível a partir do texto do rótulo.",
            "Não analisa as aspas de CSV. Uma linha que contém uma quebra de linha entre aspas são duas linhas para um filtro baseado em linhas e um campo para um parser CSV; fingir lidar com ambos produziria saída errada de um jeito que ninguém consegue ver. A limitação é declarada no copy em vez de descoberta em produção.",
            "Não normaliza nem repara conteúdo. Espaço final só é removido quando a regra correspondente está ativa, e nenhuma substituição de caracteres acontece em lugar algum. Para logs e texto diffeável esse é o padrão correto: um filtro que também reformata é um filtro em que você não pode confiar para preservar o que ele deixa passar.",
          ],
        },
      ],
    },
    locale,
  );
}

/** 文本序列生成器 */
export function textSequenceDeepDive(locale: Locale): Section[] | undefined {
  return pick5(
    {
      en: [
        {
          heading: "Prefix, suffix and padding decide what the sequence is usable for",
          paragraphs: [
            "A generated list of identifiers is only useful if its shape matches what the consumer accepts. A fixed-width numeric field sorts correctly as text; an unpadded one sorts 1, 10, 100, 2. Affixing a prefix and suffix lets one generator produce what would otherwise need three different tools — fixture keys, column values, file names — and the preview shows the exact shape before anything is copied.",
            "Range endpoints are inclusive here, and that is a decision rather than a default. Off-by-one errors in generated test data are the most common way a fixture silently tests nothing: a range of 1 to 10 that actually produces 1 to 9 still looks plausible, and the assertion that should exercise element 10 never runs.",
            "Step exists for the cases where a consumer expects only every nth identifier. Reserving ranges is the more common real use: generating 100 to 199 for one test suite and 200 to 299 for another keeps fixtures from colliding while staying traceable to their source.",
          ],
        },
        {
          heading: "Why the output is plain text rather than a file",
          paragraphs: [
            "Copying a list into a test file, a spreadsheet column or a shell loop is the realistic workflow, and a CSV download would add a step without adding capability. The tool produces plain lines because every downstream consumer — a text editor, a diff, a paste into an IDE — accepts plain lines.",
            "Determinism is deliberate. The same inputs produce the same list every time, with no randomness anywhere. That matters because a fixture generator whose output changes between runs makes a failing test impossible to distinguish from a flaky one.",
            "The size ceiling is stated rather than hidden. Generating a million lines would block the interface while it serialises them, and no test fixture needs that; the limit keeps the tool responsive and makes the boundary visible in the form rather than in a hang.",
          ],
        },
      ],
      zh: [
        {
          heading: "前缀、后缀与填充决定了序列能用在什么地方",
          paragraphs: [
            "生成的标识符列表只有在形状匹配消费方要求时才有用。定宽数字字段按文本排序正确;不填充的会排成 1、10、100、2。加上前后缀让一个生成器能产出否则需要三个工具才能做的事——测试键、列值、文件名——而且预览会在复制前展示确切形状。",
            "区间端点在这里是闭区间,这是一个决策而不是默认。生成测试数据里的差一错误,是测试夹具「悄悄什么都没测」的最常见方式:本该 1 到 10 却实际产出 1 到 9,看起来依然合理,而那条本该验证第 10 个元素的断言从未执行。",
            "步长存在,是为了消费方只接受每隔 n 个标识符的场景。预留区间是更常见的实际用途:给一套测试生成 100 到 199、给另一套生成 200 到 299,既避免夹具相互碰撞,又能追溯到来源。",
          ],
        },
        {
          heading: "为什么输出是纯文本而不是文件",
          paragraphs: [
            "把列表复制进测试文件、表格列或 shell 循环才是现实工作流,而导出 CSV 会多一个步骤却不增加能力。工具产出纯文本行,是因为每个下游消费方——文本编辑器、diff、粘进 IDE——都接受纯文本行。",
            "确定性是刻意的。相同输入每次都产出相同列表,任何地方都不引入随机性。这很重要:一个输出在两次运行间会变的夹具生成器,会让一次失败的测试无法与不稳定的测试区分开。",
            "规模上限是被声明的而不是隐藏的。生成一百万行会在序列化期间阻塞界面,而且没有测试夹具需要它;这个上限让工具保持响应,并让边界在表单里可见,而不是以卡死的形式出现。",
          ],
        },
      ],
      ja: [
        {
          heading: "接頭辞・接尾辞・パディングが、その連番を使えるかどうかを決める",
          paragraphs: [
            "生成された識別子リストは、その形が消費側の受け付ける形と一致してはじめて役に立ちます。固定幅の数値フィールドはテキストとして正しく並びます。パディングなしでは 1, 10, 100, 2 と並びます。接頭辞と接尾辞を付ければ、本来三つのツールが必要なもの — フィクスチャキー、列値、ファイル名 — を一つの生成器で作れ、プレビューがコピー前に正確な形を示します。",
            "範囲の端点はここでは閉区間で、既定ではなく判断です。生成したテストデータの off-by-one は、フィクスチャが静かに何もテストしない最も一般的な経路です。1〜10 のつもりが実際には 1〜9 を出しても見た目は妥当で、10 番目を検証するはずのアサーションは一度も走りません。",
            "増分は、消費側が n 個おきの識別子しか受け付けない場合のためにあります。より現実的な用途は範囲の予約です。あるテストスイートに 100〜199、別に 200〜299 を生成すれば、フィクスチャ同士の衝突を避けつつ出所を追跡できます。",
          ],
        },
        {
          heading: "出力がファイルではなくプレーンテキストである理由",
          paragraphs: [
            "リストをテストファイル、表計算の列、シェルのループへコピーするのが現実の流れであり、CSV ダウンロードは手順を増やすだけで能力を増やしません。ツールがプレーンテキスト行を出すのは、下流の消費側 — テキストエディタ、diff、IDE への貼り付け — がすべてプレーンテキスト行を受け付けるからです。",
            "決定性は意図的です。同じ入力は毎回同じリストを出し、どこにも乱数はありません。出力が実行ごとに変わるフィクスチャ生成器は、失敗したテストと不安定なテストを区別できなくするからです。",
            "サイズ上限は隠さず明示します。百万行を生成するとシリアライズ中に画面が固まり、テストフィクスチャにそれを必要とするものはありません。上限はツールを応答性のあるまま保ち、境界を「フリーズ」ではなくフォーム上に見えるようにします。",
          ],
        },
      ],
      es: [
        {
          heading: "Prefijo, sufijo y relleno deciden para qué sirve la secuencia",
          paragraphs: [
            "Una lista generada de identificadores solo es útil si su forma coincide con lo que acepta el consumidor. Un campo numérico de ancho fijo ordena correctamente como texto; uno sin relleno ordena 1, 10, 100, 2. Añadir prefijo y sufijo permite que un solo generador produzca lo que de otro modo exigiría tres herramientas distintas — claves de fixture, valores de columna, nombres de archivo — y la vista previa muestra la forma exacta antes de copiar nada.",
            "Los extremos del rango son inclusivos aquí, y eso es una decisión, no un valor por defecto. Los errores off-by-one en datos de prueba generados son la forma más común de que un fixture en silencio no pruebe nada: un rango de 1 a 10 que en realidad produce 1 a 9 sigue pareciendo plausible, y la aserción que debería ejercitar el elemento 10 nunca se ejecuta.",
            "El paso existe para los casos en que un consumidor espera solo cada n-ésimo identificador. Reservar rangos es el uso real más común: generar 100 a 199 para una suite y 200 a 299 para otra evita que los fixtures colisionen y sigue siendo rastreable a su origen.",
          ],
        },
        {
          heading: "Por qué la salida es texto plano en lugar de un archivo",
          paragraphs: [
            "Copiar una lista en un archivo de test, una columna de hoja de cálculo o un bucle de shell es el flujo realista, y una descarga CSV añadiría un paso sin añadir capacidad. La herramienta produce líneas planas porque todo consumidor aguas abajo — un editor de texto, un diff, un pegado en un IDE — acepta líneas planas.",
            "La determinación es deliberada. Las mismas entradas producen la misma lista siempre, sin aleatoriedad en ningún punto. Eso importa porque un generador de fixtures cuya salida cambia entre ejecuciones hace imposible distinguir una prueba fallida de una prueba inestable.",
            "El techo de tamaño se declara en vez de ocultarse. Generar un millón de líneas bloquearía la interfaz mientras las serializa, y ningún fixture necesita eso; el límite mantiene la herramienta receptiva y hace el límite visible en el formulario en lugar de en un cuelgue.",
          ],
        },
      ],
      pt: [
        {
          heading: "Prefixo, sufixo e preenchimento decidem para que serve a sequência",
          paragraphs: [
            "Uma lista gerada de identificadores só é útil se sua forma casar com o que o consumidor aceita. Um campo numérico de largura fixa ordena corretamente como texto; um sem preenchimento ordena 1, 10, 100, 2. Acrescentar prefixo e sufixo permite que um só gerador produza o que de outro modo exigiria três ferramentas — chaves de fixture, valores de coluna, nomes de arquivo — e a prévia mostra a forma exata antes de qualquer cópia.",
            "Os extremos do intervalo são inclusivos aqui, e isso é uma decisão, não um padrão. Erros off-by-one em dados de teste gerados são a forma mais comum de um fixture silenciosamente não testar nada: um intervalo de 1 a 10 que na prática produz 1 a 9 continua parecendo plausível, e a asserção que deveria exercitar o elemento 10 nunca roda.",
            "O passo existe para os casos em que o consumidor espera apenas cada n-ésimo identificador. Reservar faixas é o uso real mais comum: gerar 100 a 199 para uma suíte e 200 a 299 para outra evita que fixtures colidam e mantém a rastreabilidade até a origem.",
          ],
        },
        {
          heading: "Por que a saída é texto puro em vez de um arquivo",
          paragraphs: [
            "Copiar uma lista para um arquivo de teste, uma coluna de planilha ou um loop de shell é o fluxo realista, e um download CSV acrescentaria um passo sem acrescentar capacidade. A ferramenta produz linhas puras porque todo consumidor adiante — um editor de texto, um diff, uma colagem num IDE — aceita linhas puras.",
            "A determinação é deliberada. As mesmas entradas produzem a mesma lista sempre, sem aleatoriedade em lugar algum. Isso importa porque um gerador de fixtures cuja saída muda entre execuções torna impossível distinguir um teste que falhou de um teste instável.",
            "O teto de tamanho é declarado em vez de escondido. Gerar um milhão de linhas bloquearia a interface enquanto as serializa, e nenhum fixture precisa disso; o limite mantém a ferramenta responsiva e torna a fronteira visível no formulário em vez de num travamento.",
          ],
        },
      ],
    },
    locale,
  );
}

/** 字符频率统计 */
export function characterFrequencyDeepDive(locale: Locale): Section[] | undefined {
  return pick5(
    {
      en: [
        {
          heading: "What a character actually is, and why the choice changes the numbers",
          paragraphs: [
            "The same text has three legitimate character counts. Counting UTF-16 code units gives one number, counting Unicode code points another, and counting grapheme clusters a third. For plain Latin text they agree; for CJK they agree; for emoji built from ZWJ sequences they diverge sharply — a family emoji can be one grapheme, four code points and eleven code units at the same time. This tool counts code points, and says so, because a frequency table that does not state its unit is a table you cannot compare against another.",
            "Combining marks are the subtler case. A letter with a diacritic may be one precomposed code point or a base letter plus a combining code point, and the two are canonically equivalent but count differently. Text pasted from two sources can therefore disagree even though it looks identical. The tool does not normalise, so the counts reflect exactly the bytes the user supplied — which is what you want when auditing what a file actually contains, and not what you want when comparing two semantically identical strings.",
            "The percentages are computed over retained code points, which is a deliberate choice. If the tool excluded whitespace from the denominator, a document with generous paragraph spacing would report inflated shares for its letters. Reporting the denominator explicitly means the reader can recompute any figure they distrust.",
          ],
        },
        {
          heading: "Frequency is evidence only when it is stable against your method",
          paragraphs: [
            "Character frequency is used for three practical purposes: cipher analysis, layout planning for fonts and character sets, and text forensics such as detecting a language or spotting encoded data. All three depend on the same property — that the ranking is stable under the specific counting method used. Sorting ties by first appearance rather than alphabetically is part of that stability: identical input always produces identical ordering.",
            "Case folding changes the answer materially. Merging upper and lower case is appropriate when studying letter distribution in running text and inappropriate when auditing a specific file, because the case difference is exactly what such an audit is looking for. The option is exposed with no default assumption about which is intended.",
            "Export matters as much as display. A frequency list truncated to the top twenty rows looks the same as a complete list to anyone reading the screen, and only the exported file reveals the difference. Here the export always contains every row in the selected sort order, while the screen shows a limited number — a deliberate asymmetry, stated in the interface.",
          ],
        },
      ],
      zh: [
        {
          heading: "字符到底是什么,以及这个选择为什么改变数字",
          paragraphs: [
            "同一段文本有三个都合理的字符计数。按 UTF-16 码元计数一个数,按 Unicode 码位计数另一个,按字素簇计数第三个。对纯拉丁文本三者一致,对 CJK 也一致,对用 ZWJ 序列拼出的 emoji 则差距明显——一个家庭 emoji 可以同时是一个字素、四个码位、十一个码元。本工具按码位计数并明说,因为一张不标注单位的频率表,是一张无法与别的表对比的表。",
            "组合标记是更微妙的情形。带变音符号的字母可能是一个预先组合的码位,也可能是基础字母加一个组合码位,两者规范等价但计数不同。所以从两个来源粘来的文本可能看起来一模一样,计数却不一致。本工具不做归一化,计数精确反映用户提供的字节——这在审计文件实际内容时正是你想要的,而在比较两个语义相同的字符串时不是你想要的。",
            "百分比是在保留码位上计算的,这是刻意选择。如果工具把空白排除在分母之外,一份段距宽松的文档会为其字母报告虚高的占比。明确报告分母,意味着读者可以自己重算任何他不信的数字。",
          ],
        },
        {
          heading: "频率只有在对你的方法稳定时才算证据",
          paragraphs: [
            "字符频率有三种实用目的:密码分析、字体与字符集的版式规划、文本取证(比如判定语言或发现编码数据)。三者都依赖同一性质——排名在所用的具体计数方法下是稳定的。同分按首次出现排序而非按字母序,正是这种稳定性的一部分:相同输入永远产出相同顺序。",
            "大小写合并会实质改变答案。研究连续文本里的字母分布时合并大小写是恰当的,审计一份具体文件时则不恰当,因为大小写差异恰恰是这类审计要找的东西。这个选项被暴露出来,且不对「哪个是意图」做任何默认假设。",
            "导出与显示同等重要。一份被截到前二十行的频率表,在任何看屏幕的人眼里都与完整表长得一样,只有导出文件才暴露差别。这里导出永远包含所选排序下的每一行,而屏幕只显示有限行数——这是刻意的不对称,并在界面上说明。",
          ],
        },
      ],
      ja: [
        {
          heading: "文字とは何か、そしてその選択が数字を変える理由",
          paragraphs: [
            "同じテキストに三つの正当な文字数があります。UTF-16 コード単位で数えると一つ、Unicode コードポイントで数えると別、書記素クラスタで数えると第三の数。素のラテン語テキストでは一致し、CJK でも一致し、ZWJ シーケンスで組んだ絵文字では大きく食い違います。家族の絵文字は同時に一つの書記素、四つのコードポイント、十一のコード単位になり得ます。本ツールはコードポイントで数え、そう明記します。単位を書かない頻度表は、他の表と比較できない表だからです。",
            "結合マークはより微妙な例です。発音記号付きの文字は、合成済みの一コードポイントか、基底文字＋結合コードポイントかもしれません。両者は正準等価ですが件数は違います。二つの出所から貼ったテキストが見た目同一でも件数が食い違う理由です。本ツールは正規化しないので、件数は利用者が与えたバイトを正確に反映します。ファイルの実内容を監査するときは望ましく、意味的に同一な二つの文字列を比較するときは望ましくありません。",
            "百分率は保持コードポイントを分母に計算し、これは意図的な選択です。空白を分母から外せば、段落間隔が広い文書はその文字に水増しされた割合を報告します。分母を明示すれば、読者は信じない数字を自分で再計算できます。",
          ],
        },
        {
          heading: "頻度は、方法に対して安定してはじめて証拠になる",
          paragraphs: [
            "文字頻度には三つの実用目的があります。暗号解読、フォントや文字集合の版面設計、そして言語判定やエンコードされたデータの発見といったテキスト鑑識です。三つとも同じ性質に依存します。使った具体的な数え方のもとで順位が安定していること。同点をアルファベット順ではなく初出順で並べるのはその安定性の一部です。同じ入力は常に同じ順序を生みます。",
            "大文字小文字の統合は答えを実質的に変えます。連続テキストの文字分布を調べるときは適切で、特定のファイルを監査するときは不適切です。大小の差こそがその監査の探し物だからです。どちらが意図かについて既定の仮定をせず、選択肢として提示します。",
            "書き出しは表示と同じくらい重要です。上位二十行に切り詰めた頻度表は、画面を見る人には完全な表と見分けがつかず、書き出したファイルだけが差を明かします。ここでは書き出しが選択された並び順ですべての行を含み、画面は限られた行数だけを示します — 意図的な非対称で、インターフェースに明記しています。",
          ],
        },
      ],
      es: [
        {
          heading: "Qué es realmente un carácter y por qué la elección cambia los números",
          paragraphs: [
            "El mismo texto tiene tres recuentos de caracteres legítimos. Contar unidades UTF-16 da un número, contar puntos de código Unicode otro y contar clústeres de grafemas un tercero. Para texto latino simple coinciden; para CJK coinciden; para emoji construidos con secuencias ZWJ divergen radicalmente: un emoji de familia puede ser a la vez un grafema, cuatro puntos de código y once unidades de código. Esta herramienta cuenta puntos de código y lo dice, porque una tabla de frecuencias que no declara su unidad es una tabla que no puedes comparar con otra.",
            "Las marcas combinantes son el caso más sutil. Una letra con diacrítico puede ser un punto de código precompuesto o una letra base más un punto de código combinante; ambos son canónicamente equivalentes pero cuentan distinto. Por eso un texto pegado de dos fuentes puede discrepar aunque se vea idéntico. La herramienta no normaliza, así que los recuentos reflejan exactamente los bytes que el usuario aportó: lo que quieres al auditar el contenido real de un archivo, y no lo que quieres al comparar dos cadenas semánticamente idénticas.",
            "Los porcentajes se calculan sobre los puntos de código retenidos, que es una elección deliberada. Si la herramienta excluyera los espacios del denominador, un documento con espaciado generoso reportaría cuotas infladas para sus letras. Informar el denominador explícitamente significa que el lector puede recalcular cualquier cifra en la que desconfíe.",
          ],
        },
        {
          heading: "La frecuencia es evidencia solo cuando es estable frente a tu método",
          paragraphs: [
            "La frecuencia de caracteres se usa para tres fines prácticos: criptoanálisis, planificación de maqueta para fuentes y conjuntos de caracteres, y pericia textual como detectar un idioma o descubrir datos codificados. Los tres dependen de la misma propiedad: que el ranking sea estable bajo el método de conteo específico usado. Ordenar los empates por primera aparición en vez de alfabéticamente forma parte de esa estabilidad: una entrada idéntica produce siempre un orden idéntico.",
            "La fusión de mayúsculas y minúsculas cambia la respuesta de forma material. Unificar mayúsculas es apropiado al estudiar la distribución de letras en texto corrido e inapropiado al auditar un archivo concreto, porque la diferencia de caja es exactamente lo que esa auditoría busca. La opción se expone sin suponer por defecto cuál se pretende.",
            "La exportación importa tanto como la visualización. Una lista de frecuencias truncada a las veinte primeras filas se ve igual que una lista completa para cualquiera que mire la pantalla, y solo el archivo exportado revela la diferencia. Aquí la exportación siempre contiene todas las filas en el orden de clasificación seleccionado, mientras la pantalla muestra un número limitado: una asimetría deliberada, declarada en la interfaz.",
          ],
        },
      ],
      pt: [
        {
          heading: "O que é realmente um caractere e por que a escolha muda os números",
          paragraphs: [
            "O mesmo texto tem três contagens de caracteres legítimas. Contar unidades UTF-16 dá um número, contar pontos de código Unicode outro e contar clusters de grafemas um terceiro. Para texto latino simples coincidem; para CJK coincidem; para emoji montados com sequências ZWJ divergem radicalmente — um emoji de família pode ser ao mesmo tempo um grafema, quatro pontos de código e onze unidades de código. Esta ferramenta conta pontos de código e diz isso, porque uma tabela de frequências que não declara sua unidade é uma tabela que você não pode comparar com outra.",
            "Marcas combinantes são o caso mais sutil. Uma letra com diacrítico pode ser um ponto de código pré-composto ou uma letra base mais um ponto de código combinante; ambos são canonicamente equivalentes mas contam diferente. Por isso um texto colado de duas fontes pode divergir embora pareça idêntico. A ferramenta não normaliza, então as contagens refletem exatamente os bytes que o usuário forneceu — o que você quer ao auditar o conteúdo real de um arquivo, e não o que você quer ao comparar duas strings semanticamente idênticas.",
            "As porcentagens são calculadas sobre os pontos de código retidos, o que é uma escolha deliberada. Se a ferramenta excluísse espaços do denominador, um documento com espaçamento generoso reportaria fatias infladas para suas letras. Informar o denominador explicitamente significa que o leitor pode recalcular qualquer número em que desconfie.",
          ],
        },
        {
          heading: "Frequência só é evidência quando é estável frente ao seu método",
          paragraphs: [
            "A frequência de caracteres serve a três fins práticos: criptoanálise, planejamento de layout para fontes e conjuntos de caracteres, e perícia textual como detectar um idioma ou descobrir dados codificados. Os três dependem da mesma propriedade — que o ranking seja estável sob o método específico de contagem usado. Ordenar empates por primeira aparição em vez de alfabeticamente faz parte dessa estabilidade: uma entrada idêntica produz sempre uma ordem idêntica.",
            "A fusão de maiúsculas e minúsculas muda a resposta de forma material. Unificar maiúsculas é apropriado ao estudar a distribuição de letras em texto corrido e inapropriado ao auditar um arquivo específico, porque a diferença de caixa é exatamente o que essa auditoria procura. A opção é exposta sem supor por padrão qual é pretendida.",
            "A exportação importa tanto quanto a exibição. Uma lista de frequências truncada nas vinte primeiras linhas parece igual a uma lista completa para quem olha a tela, e só o arquivo exportado revela a diferença. Aqui a exportação sempre contém todas as linhas na ordem de classificação selecionada, enquanto a tela mostra um número limitado — uma assimetria deliberada, declarada na interface.",
          ],
        },
      ],
    },
    locale,
  );
}
