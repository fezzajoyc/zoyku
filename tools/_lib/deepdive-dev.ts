/**
 * deepDive 补充模块 —— 收尾 8 件(file-type-detector / uuid-validator-converter /
 * byte-encoding-converter / crc16-modbus / lunar-calendar-converter /
 * ipv4-range-expander / file-splitter-merger / image-color-picker 补齐)。
 */

import type { Locale } from "@/lib/site";

type Section = { heading: string; paragraphs: [string, string, string] };
const CORE = ["en", "zh", "ja", "es", "pt"] as const;

function pick5(map: Record<(typeof CORE)[number], Section[]>, locale: Locale): Section[] | undefined {
  // overlay 语种(fr/de/ru/it/tr/ko/ar/hi/id/vi)设计上回退英文深文:
  // 这些语种的界面与页面文案各有 overlay,但深文不铺(与全站既有约定一致)。
  return (map as Record<string, Section[] | undefined>)[locale] ?? map.en;
}

/** 文件类型探测(魔数) */
export function fileTypeDeepDive(locale: Locale): Section[] | undefined {
  return pick5(
    {
      en: [
        {
          heading: "Magic numbers are a claim, not a fact",
          paragraphs: [
            "A file type is usually identified by the first few bytes — the JPEG SOI marker, the PDF header, the ZIP local file header, the ISO base media ftyp box. Those bytes are written by whatever produced the file, so they are a claim about what the file is, and they can be wrong. A renamed text file keeps its text bytes; a truncated download keeps the header and loses the content; a malicious file can start with one container's magic and carry another's payload.",
            "That is why signature checking is a filter rather than a verdict. It reliably separates a real PDF from a text file renamed to .pdf, which is the common practical case. It does not validate the internal structure, does not parse the container, and does not tell you whether the file is safe to open — a file with a valid header can still be malformed or hostile.",
            "The honest output therefore separates three columns: what the bytes look like, what the extension says, and whether they agree. A disagreement is the interesting signal — a ZIP header with a .png extension is either a mislabelled archive or a file that disguised itself, and the tool reports the contradiction rather than picking a side.",
          ],
        },
        {
          heading: "Containers that legitimately share a header, and what that costs",
          paragraphs: [
            "Several formats are ZIP containers: DOCX, XLSX, PPTX, ODT, EPUB and JAR all begin with the same local file header. Distinguishing them requires reading the archive's central directory and looking for specific entry names, which is more than a signature check can do — so a signature-only tool reports all of them as ZIP and lets the extension narrow it. That is a limitation stated plainly, not a bug.",
            "ISO base media formats have the same problem: MP4, MOV, M4A and HEIC all begin with an ftyp box whose brand determines the subtype. Reading the brand is one extra step beyond the signature, and it is what lets those four be told apart. Anything beyond that needs a real parser.",
            "The practical lesson is that a file-type detector's value is bounded by how much structure it is willing to read. This one reads enough to separate the common cases and stops there, because the next step — full container parsing — belongs to a library or a dedicated tool, and claiming it here would be the classic false-confidence problem.",
          ],
        },
      ],
      zh: [
        {
          heading: "魔数是一个声明,不是事实",
          paragraphs: [
            "文件类型通常靠前几个字节识别——JPEG 的 SOI 标记、PDF 头、ZIP 本地文件头、ISO 基础媒体格式的 ftyp 盒。这些字节由产生文件的东西写入,所以它们是对「这个文件是什么」的声明,而声明可以是错的。改了扩展名的文本文件仍保留文本字节;被截断的下载保留文件头却丢掉内容;恶意文件可以以一个容器的魔数开头、携带另一个容器的载荷。",
            "这就是为什么签名检查是筛子而不是判决。它能可靠地把真正的 PDF 与改名为 .pdf 的文本文件分开,这是常见的实际场景。它不校验内部结构,不解析容器,也不告诉你文件是否可以安全打开——一个有着合法文件头的文件仍可能是畸形的或敌意的。",
            "诚实的输出因此把三列分开:字节看起来是什么、扩展名说是什么、两者是否一致。不一致才是有价值的信号——ZIP 头配 .png 扩展名,要么是标错的归档,要么是伪装的文件,工具报告这个矛盾,而不是替你选边。",
          ],
        },
        {
          heading: "合法共享文件头的容器,以及这样做的代价",
          paragraphs: [
            "好几种格式都是 ZIP 容器:DOCX、XLSX、PPTX、ODT、EPUB、JAR 都以同一个本地文件头开头。区分它们需要读归档的中央目录并查找特定条目名,这超出了签名检查的能力——所以只做签名检查的工具把它们全部报成 ZIP,让扩展名去缩小范围。这是一个被明确声明的局限,不是 bug。",
            "ISO 基础媒体格式有同样的问题:MP4、MOV、M4A、HEIC 都以 ftyp 盒开头,其 brand 决定子类型。读 brand 是超出签名的额外一步,正是这一步让这四者可以被区分。再往上就需要真正的解析器了。",
            "实务教训是:文件类型探测器的价值,取决于它愿意读多少结构。本工具读到足以区分常见场景就停下,因为下一步——完整容器解析——属于某个库或专门工具,在这里声称能做,就是那种典型的虚假自信问题。",
          ],
        },
      ],
      ja: [
        {
          heading: "マジックナンバーは主張であり事実ではない",
          paragraphs: [
            "ファイル種別は通常、先頭数バイトで識別されます。JPEG の SOI マーカー、PDF ヘッダ、ZIP のローカルファイルヘッダ、ISO ベースメディアの ftyp ボックス。それらのバイトはファイルを生成した何かが書き込むので、「このファイルは何か」という主張であり、主張は誤り得ます。名前を変えたテキストファイルはテキストのバイトを保ち、切り詰められたダウンロードはヘッダを保って内容を失い、悪意あるファイルは一方のコンテナのマジックで始まり他方のペイロードを運べます。",
            "だからシグネチャ検査は判決ではなくフィルタです。本物の PDF と .pdf に改名したテキストを確実に分けられ、これは実務でよくある場面です。内部構造を検証せず、コンテナを解析せず、開いて安全かも伝えません。妥当なヘッダを持つファイルは依然として壊れているか敵対的であり得ます。",
            "誠実な出力はしたがって三列を分けます。バイトが何に見えるか、拡張子が何と言うか、両者が一致するか。不一致こそが有用な信号です。ZIP ヘッダに .png 拡張子は、ラベルを間違えたアーカイブか、身分を偽ったファイルで、ツールはどちらかに決めず矛盾を報告します。",
          ],
        },
        {
          heading: "正当にヘッダを共有するコンテナとその代償",
          paragraphs: [
            "いくつかの形式は ZIP コンテナです。DOCX、XLSX、PPTX、ODT、EPUB、JAR はすべて同じローカルファイルヘッダで始まります。区別にはアーカイブの中央ディレクトリを読み特定のエントリ名を探す必要があり、シグネチャ検査の範囲を超えます。だからシグネチャのみのツールはそれらをすべて ZIP として報告し、拡張子に絞らせます。これは明記された限界でありバグではありません。",
            "ISO ベースメディア形式も同様です。MP4、MOV、M4A、HEIC はすべて ftyp ボックスで始まり、その brand がサブタイプを決めます。brand を読むのはシグネチャを超えた一手間で、それによって四者を区別できます。それ以上は本物のパーサが必要です。",
            "実務的な教訓は、ファイル種別検出器の価値はどれだけ構造を読むかで上限が決まることです。本ツールはよくある場面を分けるだけ読み、そこで止まります。次の一手 — 完全なコンテナ解析 — はライブラリか専用ツールに属し、ここで主張することは典型的な偽の自信の問題です。",
          ],
        },
      ],
      es: [
        {
          heading: "Los números mágicos son una afirmación, no un hecho",
          paragraphs: [
            "Un tipo de archivo se identifica normalmente por los primeros bytes: el marcador SOI de JPEG, la cabecera PDF, la cabecera local de ZIP, la caja ftyp de ISO base media. Esos bytes los escribe quien produjo el archivo, así que son una afirmación sobre qué es el archivo, y pueden estar equivocados. Un archivo de texto renombrado conserva sus bytes de texto; una descarga truncada conserva la cabecera y pierde el contenido; un archivo malicioso puede empezar con el magic de un contenedor y llevar el payload de otro.",
            "Por eso la comprobación de firma es un filtro y no un veredicto. Separa fiablemente un PDF real de un archivo de texto renombrado a .pdf, que es el caso práctico común. No valida la estructura interna, no analiza el contenedor y no te dice si es seguro abrirlo: un archivo con cabecera válida puede seguir siendo malformado o hostil.",
            "La salida honesta separa por tanto tres columnas: qué parecen los bytes, qué dice la extensión y si coinciden. Una discrepancia es la señal interesante: una cabecera ZIP con extensión .png es o un archivo mal etiquetado o uno que se disfrazó, y la herramienta informa la contradicción en vez de ponerse de un lado.",
          ],
        },
        {
          heading: "Contenedores que comparten cabecera legitimamente, y lo que cuesta",
          paragraphs: [
            "Varios formatos son contenedores ZIP: DOCX, XLSX, PPTX, ODT, EPUB y JAR comienzan todos con la misma cabecera local. Distinguirlos requiere leer el directorio central del archivo y buscar nombres de entrada específicos, más de lo que puede una comprobación de firma, así que una herramienta solo-firma los reporta todos como ZIP y deja que la extensión los estreche. Es una limitación declarada, no un bug.",
            "Los formatos ISO base media tienen el mismo problema: MP4, MOV, M4A y HEIC comienzan todos con una caja ftyp cuyo brand determina el subtipo. Leer el brand es un paso extra más allá de la firma, y es lo que permite distinguir esos cuatro. Más allá de eso hace falta un parser de verdad.",
            "La lección práctica es que el valor de un detector de tipo de archivo está acotado por cuánta estructura está dispuesto a leer. Este lee lo suficiente para separar los casos comunes y se detiene ahí, porque el siguiente paso — análisis completo de contenedor — pertenece a una librería o herramienta dedicada, y reclamarlo aquí sería el clásico problema de falsa confianza.",
          ],
        },
      ],
      pt: [
        {
          heading: "Números mágicos são uma afirmação, não um fato",
          paragraphs: [
            "Um tipo de arquivo normalmente é identificado pelos primeiros bytes — o marcador SOI de JPEG, o cabeçalho PDF, o cabeçalho local de ZIP, a caixa ftyp de ISO base media. Esses bytes são escritos por quem produziu o arquivo, então são uma afirmação sobre o que o arquivo é, e podem estar errados. Um arquivo de texto renomeado conserva seus bytes de texto; um download truncado conserva o cabeçalho e perde o conteúdo; um arquivo malicioso pode começar com o magic de um contêiner e carregar o payload de outro.",
            "É por isso que a verificação de assinatura é um filtro e não um veredicto. Ela separa confiavelmente um PDF real de um arquivo de texto renomeado para .pdf, que é o caso prático comum. Não valida a estrutura interna, não analisa o contêiner e não diz se é seguro abrir — um arquivo com cabeçalho válido pode ainda ser malformado ou hostil.",
            "A saída honesta portanto separa três colunas: o que os bytes parecem, o que a extensão diz e se coincidem. Uma divergência é o sinal interessante — um cabeçalho ZIP com extensão .png é ou um arquivo mal rotulado ou um que se disfarçou, e a ferramenta informa a contradição em vez de escolher um lado.",
          ],
        },
        {
          heading: "Contêineres que legitimamente compartilham cabeçalho, e o custo disso",
          paragraphs: [
            "Vários formatos são contêineres ZIP: DOCX, XLSX, PPTX, ODT, EPUB e JAR começam todos com o mesmo cabeçalho local. Distingui-los exige ler o diretório central do arquivo e procurar nomes de entrada específicos, além do que uma verificação de assinatura consegue — então uma ferramenta apenas-assinatura os reporta todos como ZIP e deixa a extensão estreitar. É uma limitação declarada, não um bug.",
            "Formatos ISO base media têm o mesmo problema: MP4, MOV, M4A e HEIC começam todos com uma caixa ftyp cujo brand determina o subtipo. Ler o brand é um passo extra além da assinatura, e é o que permite distinguir esses quatro. Além disso precisa de um parser de verdade.",
            "A lição prática é que o valor de um detector de tipo de arquivo é limitado por quanta estrutura ele está disposto a ler. Este lê o suficiente para separar os casos comuns e para ali, porque o próximo passo — análise completa de contêiner — pertence a uma biblioteca ou ferramenta dedicada, e reivindicá-lo aqui seria o clássico problema de falsa confiança.",
          ],
        },
      ],
    },
    locale,
  );
}

/** UUID 检查与转换 */
export function uuidDeepDive(locale: Locale): Section[] | undefined {
  return pick5(
    {
      en: [
        {
          heading: "What each UUID version actually promises",
          paragraphs: [
            "A UUID is a 128-bit value with a version field and a variant field, and the version number tells you what kind of uniqueness you are getting. Version 4 promises nothing but randomness: it has no information about time, place or input, which makes it the right choice for identifiers and the wrong choice for anything that needs ordering. Version 7 promises time order: the first 48 bits are a Unix millisecond timestamp, so identifiers generated later sort later as strings.",
            "Version 1 is time-plus-node: a 60-bit timestamp, a clock sequence and a node identifier — historically a MAC address, which is why v1 has a reputation problem. Version 3 and version 5 are names: they hash a namespace UUID together with a name using MD5 or SHA-1 respectively, so the same input always yields the same UUID, which is exactly what makes them useless for secrets and useful for stable identifiers.",
            "The consequence is that choosing a version is choosing a guarantee. A tool that generates “a UUID” without naming the version is not telling you which of those four properties you received, and that is precisely the information a reviewer needs.",
          ],
        },
        {
          heading: "Validating a UUID is not the same as trusting it",
          paragraphs: [
            "Syntactic validation checks shape: the 16 bytes, the hyphen positions, the version nibble, the variant bits. That catches transcription errors and confirms the string was produced by something that followed the specification. It does not confirm that the value was generated correctly — a hand-typed v4 with a valid variant is syntactically perfect and statistically unique by nothing at all.",
            "Version checks are more interesting. A v1 with zero node and zero clock sequence is a placeholder, not a real identifier; a v7 with a timestamp in the far future is either clock skew or a fabricated value; a NIL UUID is valid syntax and deliberately meaningless. Reporting the embedded timestamp and node lets a reviewer spot those cases instead of being told “valid”.",
            "The honest framing is that this tool reports facts about the string and refuses to imply quality. Whether a UUID is safe to use as a secret, whether a v1 leaks a device identity, whether a v3 was computed with a name you expected — those require knowing the provenance, which a string cannot tell you.",
          ],
        },
      ],
      zh: [
        {
          heading: "每个 UUID 版本到底承诺了什么",
          paragraphs: [
            "UUID 是一个带版本字段与变体字段的 128 位值,而版本号告诉你拿到的是哪种唯一性。版本 4 除了随机性什么都不承诺:它不携带时间、地点或输入的信息,所以它是标识符的正确选择,是需要排序的任何场景的错误选择。版本 7 承诺时间顺序:前 48 位是 Unix 毫秒时间戳,所以更晚生成的标识符作为字符串排序也更靠后。",
            "版本 1 是时间加节点:60 位时间戳、clock sequence 与节点标识符——历史上是 MAC 地址,这正是 v1 名声不佳的原因。版本 3 与版本 5 是命名:它们分别用 MD5 或 SHA-1 把命名空间 UUID 与一个名字一起哈希,所以相同输入永远得到相同 UUID,这正是它们不能用于密钥、却适合稳定标识符的原因。",
            "后果是:选择版本就是选择保证。一个生成「一个 UUID」却不说明版本的工具有,并没有告诉你拿到了上述四种性质中的哪一种,而那恰恰是复核者需要的信息。",
          ],
        },
        {
          heading: "校验一个 UUID 与信任它是两回事",
          paragraphs: [
            "语法校验检查形状:16 字节、连字符位置、版本半字节、变体位。它能抓住转录错误,并确认这个字符串来自遵循规范的东西。它不确认这个值是被正确生成的——一个手打的 v4、变体位合法,语法上完美,统计学上却毫无唯一性可言。",
            "版本检查更有意思。节点与 clock sequence 全零的 v1 是占位符而不是真实标识符;时间戳落在遥远未来的 v7 要么是时钟偏移,要么是伪造值;NIL UUID 语法合法且刻意无意义。报告内嵌的时间戳与节点,让复核者能发现这些情况,而不是被告知「有效」。",
            "诚实的表述是:本工具报告关于这个字符串的事实,并拒绝暗示质量。一个 UUID 用作密钥是否安全、一个 v1 是否泄漏了设备身份、一个 v3 是否用你预期的名字算出——这些都需要知道来源,而一个字符串无法告诉你来源。",
          ],
        },
      ],
      ja: [
        {
          heading: "各 UUID バージョンが実際に約束すること",
          paragraphs: [
            "UUID はバージョンフィールドとバリアントフィールドを持つ 128 ビット値で、バージョン番号はどの種類の一意性を得るかを伝えます。バージョン 4 はランダム性以外を約束しません。時刻・場所・入力の情報を持たないため、識別子には正しく、順序付けが必要な場面には誤りです。バージョン 7 は時刻順を約束します。先頭 48 ビットが Unix ミリ秒タイムスタンプなので、後に生成された識別子は文字列としても後に並びます。",
            "バージョン 1 は時刻＋ノードです。60 ビットのタイムスタンプ、クロックシーケンス、ノード識別子 — 歴史的には MAC アドレスで、v1 の評判が悪い理由です。バージョン 3 と 5 は名前です。名前空間 UUID と名前を MD5 または SHA-1 でハッシュするので、同じ入力は常に同じ UUID を生みます。秘密には使えず、安定した識別子には有用なのはまさにこのためです。",
            "帰結は、バージョンを選ぶことが保証を選ぶことです。バージョンを名指しせず「UUID を生成する」ツールは、四つの性質のどれを受け取ったかを伝えておらず、それがまさにレビュー担当に必要な情報です。",
          ],
        },
        {
          heading: "UUID を検証することと信頼することは別",
          paragraphs: [
            "構文検証は形を調べます。16 バイト、ハイフン位置、バージョンのニブル、バリアントビット。転記ミスを捕まえ、文字列が仕様に従った何かによって生成されたことを確認します。値が正しく生成されたことは確認しません。手入力した v4 でバリアントが妥当なら構文は完璧で、統計的一意性は何も保証しません。",
            "バージョン検査はより興味深いものです。ノードもクロックシーケンスもゼロの v1 はプレースホルダで実在の識別子ではなく、遠い未来のタイムスタンプを持つ v7 はクロックずれか捏造で、NIL UUID は構文として正当で意図的に無意味です。埋め込まれたタイムスタンプとノードを報告することで、レビュー担当は「有効」と言われる代わりにそれらを見つけられます。",
            "誠実な枠組みは、本ツールが文字列についての事実を報告し品質を暗示しないことです。UUID を秘密として安全に使えるか、v1 が端末身元を漏らすか、v3 が期待した名前で計算されたか — それらは来歴を知る必要があり、文字列は来歴を語れません。",
          ],
        },
      ],
      es: [
        {
          heading: "Qué promete realmente cada versión de UUID",
          paragraphs: [
            "Un UUID es un valor de 128 bits con un campo de versión y un campo de variante, y el número de versión te dice qué clase de unicidad obtienes. La versión 4 no promete nada salvo aleatoriedad: no tiene información sobre tiempo, lugar o entrada, lo que la hace la elección correcta para identificadores y la incorrecta para cualquier cosa que requiera ordenación. La versión 7 promete orden temporal: los primeros 48 bits son una marca Unix en milisegundos, así que identificadores generados después ordenan después como texto.",
            "La versión 1 es tiempo más nodo: una marca de 60 bits, una secuencia de reloj y un identificador de nodo — históricamente una dirección MAC, que es por lo que v1 tiene mala reputación. Las versiones 3 y 5 son nombres: hashean un UUID de espacio de nombres junto con un nombre usando MD5 o SHA-1 respectivamente, así que la misma entrada produce siempre el mismo UUID, que es exactamente lo que las hace inútiles para secretos y útiles para identificadores estables.",
            "La consecuencia es que elegir una versión es elegir una garantía. Una herramienta que genera «un UUID» sin nombrar la versión no te está diciendo cuál de esas cuatro propiedades recibiste, y esa es precisamente la información que un revisor necesita.",
          ],
        },
        {
          heading: "Validar un UUID no es lo mismo que confiar en él",
          paragraphs: [
            "La validación sintáctica comprueba la forma: los 16 bytes, las posiciones de guión, el nibble de versión, los bits de variante. Atrapa errores de transcripción y confirma que la cadena la produjo algo que siguió la especificación. No confirma que el valor se generó correctamente: un v4 tecleado a mano con variante válida es sintácticamente perfecto y estadísticamente único por nada en absoluto.",
            "Las comprobaciones de versión son más interesantes. Un v1 con nodo y secuencia de reloj en cero es un marcador de posición, no un identificador real; un v7 con marca de tiempo en un futuro lejano es o desfase de reloj o valor fabricado; un UUID NIL es sintácticamente válido y deliberadamente sin significado. Informar la marca de tiempo y el nodo incrustados deja que un revisor detecte esos casos en vez de que le digan «válido».",
            "El encuadre honesto es que esta herramienta informa hechos sobre la cadena y se niega a insinuar calidad. Si un UUID es seguro como secreto, si un v1 filtra una identidad de dispositivo, si un v3 se computó con el nombre que esperabas, exigen conocer la procedencia, y una cadena no puede contarte la procedencia.",
          ],
        },
      ],
      pt: [
        {
          heading: "O que cada versão de UUID realmente promete",
          paragraphs: [
            "Um UUID é um valor de 128 bits com um campo de versão e um campo de variante, e o número de versão diz que tipo de unicidade você está recebendo. A versão 4 não promete nada além de aleatoriedade: não tem informação sobre tempo, lugar ou entrada, o que a torna a escolha certa para identificadores e a errada para qualquer coisa que precise de ordenação. A versão 7 promete ordem temporal: os primeiros 48 bits são um timestamp Unix em milissegundos, então identificadores gerados depois ordenam depois como texto.",
            "A versão 1 é tempo mais nó: um timestamp de 60 bits, uma sequência de relógio e um identificador de nó — historicamente um endereço MAC, e é por isso que v1 carrega má reputação. As versões 3 e 5 são nomes: fazem hash de um UUID de espaço de nomes junto com um nome usando MD5 ou SHA-1 respectivamente, então a mesma entrada produz sempre o mesmo UUID, o que é exatamente o que as torna inúteis para segredos e úteis para identificadores estáveis.",
            "A consequência é que escolher uma versão é escolher uma garantia. Uma ferramenta que gera «um UUID» sem nomear a versão não está dizendo qual daquelas quatro propriedades você recebeu, e isso é precisamente a informação que um revisor precisa.",
          ],
        },
        {
          heading: "Validar um UUID não é o mesmo que confiar nele",
          paragraphs: [
            "A validação sintática verifica a forma: os 16 bytes, as posições de hífen, o nibble de versão, os bits de variante. Pega erros de transcrição e confirma que a string foi produzida por algo que seguiu a especificação. Não confirma que o valor foi gerado corretamente — um v4 digitado à mão com variante válida é sintaticamente perfeito e estatisticamente único por nada.",
            "As verificações de versão são mais interessantes. Um v1 com nó e sequência de relógio zerados é um espaço reservado, não um identificador real; um v7 com timestamp num futuro distante é ou desvio de relógio ou valor fabricado; um UUID NIL é sintaticamente válido e deliberadamente sem significado. Reportar o timestamp e o nó embutidos deixa um revisor detectar esses casos em vez de ouvir «válido».",
            "O enquadramento honesto é que esta ferramenta reporta fatos sobre a string e se recusa a insinuar qualidade. Se um UUID é seguro como segredo, se um v1 vaza uma identidade de dispositivo, se um v3 foi computado com o nome que você esperava — tudo isso exige conhecer a proveniência, e uma string não conta a proveniência.",
          ],
        },
      ],
    },
    locale,
  );
}

/** 字节编码转换 */
export function byteEncodingDeepDive(locale: Locale): Section[] | undefined {
  return pick5(
    {
      en: [
        {
          heading: "Every byte encoding is a promise about the alphabet",
          paragraphs: [
            "Base64 promises a 64-character alphabet and pads to a multiple of four; Base32 promises 32 characters and pads to a multiple of eight; hex promises 16 and never pads. Each is defined by an RFC — 4648 for the first two, and the same document for Base64url, which swaps two characters so the result survives in URLs and filenames. Getting the alphabet wrong is invisible until a decoder rejects the string, and getting the padding wrong is invisible until it does not.",
            "The variant field is the part people skip. Base64 standard uses + and /; Base64url uses - and _; some systems omit the padding entirely. A string encoded with one variant and decoded with another produces a different byte sequence or a failure, and the failure message rarely names the actual cause. Exposing the variant makes the assumption visible before the error.",
            "Byte-versus-text is the deeper distinction. These encodings operate on bytes, and the bytes are an interpretation of text under some character encoding. Encoding the UTF-8 bytes of 中文 and then decoding them as Latin-1 gives mojibake that compounds the two problems — which is why the tool states that it encodes bytes and does not guess at character encodings.",
          ],
        },
        {
          heading: "Rounding, truncation and the honest limits of a browser tool",
          paragraphs: [
            "Base64 of a large file is a string several times larger than the file, and producing it in one operation blocks the interface while it builds. Chunked encoding keeps the interface alive but introduces a specific hazard: each chunk must be independently encodable, which for Base64 means a chunk length that is a multiple of three bytes. Get that wrong and padding appears in the middle of the output, which decodes to garbage. Doing it in the browser is possible precisely because that constraint is understood and respected.",
            "Decoding is stricter than encoding. A decoder that tolerates whitespace, accepts missing padding and ignores alphabet violations is a decoder that will happily accept a corrupted input. This one validates the alphabet, checks the length modulo and reports the position of the first invalid character, because the position is what turns an error into a fixable problem.",
            "The size ceiling is stated rather than discovered. Encoding a hundred-megabyte file in a browser tab is possible in principle and a bad experience in practice, so the limit is explicit and the error names the actual size. A tool that silently truncates would be worse than one that refuses.",
          ],
        },
      ],
      zh: [
        {
          heading: "每一种字节编码都是关于字母表的承诺",
          paragraphs: [
            "Base64 承诺一个 64 字符字母表,并填充到 4 的倍数;Base32 承诺 32 个字符,填充到 8 的倍数;hex 承诺 16 个,且从不填充。每一种都由 RFC 定义——前两者是 4648,Base64url 也在同一份文档里,它换掉两个字符以便结果能活在 URL 与文件名中。字母表弄错了,直到解码器拒绝才看得见;填充弄错了,直到它不拒绝才看得见。",
            "变体字段是常被跳过的那部分。Base64 标准用 + 与 /;Base64url 用 - 与 _;有些系统完全省略填充。用一个变体编码、用另一个解码,会产出不同的字节序列或失败,而失败消息很少点明真正原因。把变体暴露出来,能让假设在错误发生之前可见。",
            "字节与文本是更深的区分。这些编码操作的是字节,而字节是文本在某种字符编码下的解释。把 中文 的 UTF-8 字节编码、再按 Latin-1 解码,会得到把两个问题叠加起来的乱码——这就是为什么本工具声明它编码的是字节,且不去猜字符编码。",
          ],
        },
        {
          heading: "取整、截断与浏览器工具的诚实边界",
          paragraphs: [
            "大文件的 Base64 是一个比文件本身大好几倍的字符串,一次操作产出它会阻塞界面。分块编码能让界面保持响应,却引入一个具体风险:每一块必须可独立编码,对 Base64 而言这意味着块长必须是 3 字节的倍数。弄错了,填充就会出现在输出中间,解码出来是垃圾。能在浏览器里做,恰恰是因为这个约束被理解并被遵守了。",
            "解码比编码更严格。一个容忍空白、接受缺失填充、无视字母表违规的解码器,就是一个会欣然接受损坏输入的解码器。本实现校验字母表、检查长度模数,并报告第一个非法字符的位置,因为位置正是把错误变成可修问题的东西。",
            "体积上限是被声明的而不是被发现的。在浏览器标签页里编码一百兆的文件原则上可行、实践上是糟糕体验,所以上限是显式的,错误消息会点名实际大小。一个静默截断的工具,比一个明确拒绝的更糟。",
          ],
        },
      ],
      ja: [
        {
          heading: "すべてのバイト符号化は字母についての約束です",
          paragraphs: [
            "Base64 は 64 文字の字母を約束し 4 の倍数までパディングし、Base32 は 32 文字で 8 の倍数、hex は 16 文字でパディングなしです。それぞれが RFC で定義されます — 最初の二つは 4648、Base64url も同じ文書で、URL とファイル名で生き残るよう 2 文字を入れ替えます。字母を間違えればデコーダが拒否するまで見えず、パディングを間違えれば拒否しないまで見えません。",
            "バリアント欄は飛ばされがちな部分です。Base64 標準は + と /、Base64url は - と _、一部のシステムはパディングを完全に省きます。あるバリアントで符号化し別ので復号すると、別のバイト列か失敗になり、失敗メッセージは実際の原因をほとんど名指ししません。バリアントを公開すれば、前提がエラーの前に見えます。",
            "バイトとテキストの区別はより深いものです。これらの符号化はバイトを操作し、バイトはある文字符号化のもとでのテキストの解釈です。中文の UTF-8 バイトを符号化し Latin-1 で復号すると二つの問題が重なった文字化けになります。だからツールはバイトを符号化すると述べ、文字符号化を推測しません。",
          ],
        },
        {
          heading: "丸め、切り詰め、そしてブラウザツールの正直な限界",
          paragraphs: [
            "大きなファイルの Base64 はファイルより数倍大きい文字列で、一度の操作で作ると構築中に画面が固まります。分割符号化は画面を生かしますが具体的な危険を持ち込みます。各チャンクは独立に符号化可能でなければならず、Base64 ではチャンク長が 3 バイトの倍数である必要があります。間違えるとパディングが出力の途中に現れ、復号するとゴミになります。ブラウザで可能なのは、その制約が理解され守られているからこそです。",
            "復号は符号化より厳格です。空白を許容し、欠けたパディングを受け入れ、字母違反を無視するデコーダは、壊れた入力を喜んで受け入れるデコーダです。本実装は字母を検証し、長さの剰余を確認し、最初の不正文字の位置を報告します。位置こそがエラーを修正可能な問題に変えるものだからです。",
            "サイズ上限は発見されるのではなく宣言されます。ブラウザタブで 100 MB のファイルを符号化することは原理的に可能で実務的には悪い体験なので、上限は明示され、エラーは実際のサイズを名指しします。黙って切り詰めるツールは、拒否するものより悪いです。",
          ],
        },
      ],
      es: [
        {
          heading: "Cada codificación de bytes es una promesa sobre el alfabeto",
          paragraphs: [
            "Base64 promete un alfabeto de 64 caracteres y rellena a múltiplo de cuatro; Base32 promete 32 caracteres y rellena a múltiplo de ocho; hex promete 16 y nunca rellena. Cada una está definida por una RFC — la 4648 para las dos primeras, y el mismo documento para Base64url, que intercambia dos caracteres para que el resultado sobreviva en URLs y nombres de archivo. Equivocar el alfabeto es invisible hasta que un decodificador rechaza la cadena, y equivocar el relleno es invisible hasta que no lo rechaza.",
            "El campo de variante es la parte que la gente salta. Base64 estándar usa + y /; Base64url usa - y _; algunos sistemas omiten el relleno por completo. Una cadena codificada con una variante y decodificada con otra produce una secuencia de bytes distinta o un fallo, y el mensaje de fallo raramente nombra la causa real. Exponer la variante hace la suposición visible antes del error.",
            "Bytes versus texto es la distinción más profunda. Estas codificaciones operan sobre bytes, y los bytes son una interpretación de texto bajo alguna codificación de caracteres. Codificar los bytes UTF-8 de 中文 y luego decodificarlos como Latin-1 da mojibake que compone los dos problemas, por lo que la herramienta declara que codifica bytes y no adivina codificaciones de caracteres.",
          ],
        },
        {
          heading: "Redondeo, truncamiento y los límites honestos de una herramienta de navegador",
          paragraphs: [
            "El Base64 de un archivo grande es una cadena varias veces mayor que el archivo, y producirla en una operación bloquea la interfaz mientras se construye. La codificación por trozos mantiene la interfaz viva pero introduce un peligro específico: cada trozo debe ser codificable de forma independiente, lo que para Base64 significa una longitud de trozo múltiplo de tres bytes. Equivocarlo hace aparecer relleno en medio de la salida, que decodifica a basura. Hacerlo en el navegador es posible precisamente porque esa restricción se entiende y se respeta.",
            "La decodificación es más estricta que la codificación. Un decodificador que tolera espacios, acepta relleno ausente e ignora violaciones del alfabeto aceptará gustosamente una entrada corrupta. Este valida el alfabeto, comprueba la longitud módulo e informa la posición del primer carácter inválido, porque la posición es lo que convierte un error en un problema arreglable.",
            "El techo de tamaño se declara en vez de descubrirse. Codificar un archivo de cien megas en una pestaña de navegador es posible en principio y una mala experiencia en la práctica, así que el límite es explícito y el error nombra el tamaño real. Una herramienta que trunca en silencio sería peor que una que se niega.",
          ],
        },
      ],
      pt: [
        {
          heading: "Toda codificação de bytes é uma promessa sobre o alfabeto",
          paragraphs: [
            "Base64 promete um alfabeto de 64 caracteres e preenche até múltiplo de quatro; Base32 promete 32 caracteres e preenche até múltiplo de oito; hex promete 16 e nunca preenche. Cada uma é definida por uma RFC — a 4648 para as duas primeiras, e o mesmo documento para Base64url, que troca dois caracteres para o resultado sobreviver em URLs e nomes de arquivo. Errar o alfabeto é invisível até um decodificador rejeitar a string, e errar o preenchimento é invisível até ele não rejeitar.",
            "O campo de variante é a parte que as pessoas pulam. Base64 padrão usa + e /; Base64url usa - e _; alguns sistemas omitem o preenchimento por completo. Uma string codificada com uma variante e decodificada com outra produz uma sequência de bytes diferente ou uma falha, e a mensagem de falha raramente nomeia a causa real. Expor a variante torna a suposição visível antes do erro.",
            "Bytes versus texto é a distinção mais profunda. Essas codificações operam sobre bytes, e os bytes são uma interpretação de texto sob alguma codificação de caracteres. Codificar os bytes UTF-8 de 中文 e depois decodificá-los como Latin-1 dá mojibake que compõe os dois problemas, por isso a ferramenta declara que codifica bytes e não adivinha codificações de caracteres.",
          ],
        },
        {
          heading: "Arredondamento, truncamento e os limites honestos de uma ferramenta de navegador",
          paragraphs: [
            "O Base64 de um arquivo grande é uma string várias vezes maior que o arquivo, e produzi-la numa única operação bloqueia a interface enquanto é construída. A codificação em blocos mantém a interface viva mas introduz um perigo específico: cada bloco precisa ser codificável de forma independente, o que para Base64 significa comprimento de bloco múltiplo de três bytes. Errar isso faz o preenchimento aparecer no meio da saída, que decodifica para lixo. Fazer no navegador é possível justamente porque essa restrição é entendida e respeitada.",
            "A decodificação é mais estrita que a codificação. Um decodificador que tolera espaços, aceita preenchimento ausente e ignora violações do alfabeto aceitará alegremente uma entrada corrompida. Este valida o alfabeto, confere o comprimento módulo e reporta a posição do primeiro caractere inválido, porque a posição é o que converte um erro num problema corrigível.",
            "O teto de tamanho é declarado em vez de descoberto. Codificar um arquivo de cem megabytes numa aba de navegador é possível em princípio e uma experiência ruim na prática, então o limite é explícito e o erro nomeia o tamanho real. Uma ferramenta que trunca em silêncio seria pior que uma que recusa.",
          ],
        },
      ],
    },
    locale,
  );
}
