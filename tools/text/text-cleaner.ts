import { TextTransform } from "../_engines/text-tool";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "text-cleaner",
  category: "text",
  icon: "sparkle",
  engine: {
    component: TextTransform,
    props: {
      transform: "clean-text",
      options: [
        { key: "trimLines", label: { en: "Trim line edges", zh: "去除行首尾空格", ja: "行頭行末の空白を削除", es: "Recortar bordes de línea", pt: "Aparar início e fim das linhas" } },
        { key: "collapseSpaces", label: { en: "Collapse repeated spaces", zh: "折叠连续空格", ja: "連続する空白を圧縮", es: "Reducir espacios repetidos", pt: "Reduzir espaços repetidos" } },
        { key: "removeEmpty", label: { en: "Remove empty lines", zh: "删除空行", ja: "空行を削除", es: "Quitar líneas vacías", pt: "Remover linhas vazias" } },
        { key: "removePrintable", label: { en: "Remove invisible characters", zh: "清除隐形字符", ja: "不可視文字を除去", es: "Eliminar caracteres invisibles", pt: "Eliminar caracteres invisíveis" } },
        { key: "normalizePunct", label: { en: "Normalize punctuation", zh: "规范标点符号", ja: "句読点を正規化", es: "Normalizar puntuación", pt: "Normalizar pontuação" } },
      ],
    },
  },
  related: ["remove-extra-spaces", "remove-duplicate-lines", "case-converter", "word-counter", "text-diff", "text-sorter", "lorem-ipsum-generator", "sentence-counter", "text-to-binary", "reverse-text"],
  copy: {
    en: {
      name: "Text Cleaner",
      tagline:
        "Remove invisible characters, smart quotes, extra spaces and empty lines from text pasted out of PDFs, Word processors and chat apps.",
      intro: [
        "Copy-paste is where clean text goes to die: PDFs leave zero-width characters, Word swaps straight quotes for curly ones and adds non-breaking spaces, chat apps insert control characters. This tool strips the invisible junk and repairs the punctuation in one pass.",
        "Every option is a toggle, so you decide how aggressive the cleanup is — from just trimming lines to a full scrub that removes non-printable characters and normalizes quotes, dashes and ellipses.",
      
        "Each toggle maps to a concrete paste artifact: zero-width spaces and invisible control characters come out, curly quotes normalize to straight, non-breaking spaces become regular spaces, and fancy dashes/ellipses collapse to their ASCII equivalents. The order matters — stripping control characters before punctuation normalization avoids leaving orphaned artifacts.",
        "Compared with pasting into a plaintext editor and hoping the invisible characters survive to be spotted, the scrub is deterministic: what you see in the preview is what you copy. And because it is local, a pasted email thread or customer transcript is cleaned without a third party ever seeing the content.",
      ],
      steps: [
        "Paste the messy text into the input box.",
        "Toggle the cleanups you want: trim lines, collapse spaces, remove empty lines, strip invisible characters, normalize punctuation.",
        "Copy the clean output back into your document, CMS or editor.",
      ],
      faqs: [
        {
          q: "What are invisible characters and where do they come from?",
          a: "Zero-width spaces, byte-order marks and control characters — added by PDFs, some websites and office software. They are invisible but break searches, regexes and database imports, so removing them is usually safe.",
        },
        {
          q: "What does 'normalize punctuation' change?",
          a: "Curly quotes become straight ones, en and em dashes become hyphens, the ellipsis character becomes three dots and non-breaking spaces become regular spaces. Use it when plain, code-safe punctuation matters.",
        },
        {
          q: "Is cleanup lossless?",
          a: "No tool can know your intent for sure. The output box always shows the result first, so review it before replacing your original.",
        },
      ],
      deepDive: [
        {
          heading: "One pass for the whole cleaning pipeline",
          paragraphs: [
            "Most text messes come as a bundle: content pasted from PDFs carries double spaces, stray line breaks and hyphenated words split across lines; copied web text drags in invisible non-breaking spaces and zero-width characters; spreadsheets export with trailing tabs. Cleaning these one rule at a time means five passes and forgotten steps — a combined cleaner applies the whole pipeline at once.",
            "The canonical order matters: normalize Unicode (fold non-breaking spaces to normal ones, strip zero-width and control characters) first, because later rules compare characters; then collapse whitespace, then trim line edges, then fix line breaks. Running deduplication or comparison before normalization produces wrong results — two visually identical lines stay \"different\" because an invisible character survives.",
            "The output should be boring: no change you cannot explain. Every rule in a cleaner is mechanical and previewable, which is exactly what distinguishes a cleaner from an AI \"rewriter\" — the same input always produces the same output, and you can verify each transformation.",
          ],
        },
        {
          heading: "What gets removed and why",
          paragraphs: [
            "Invisible Unicode is the top category: zero-width spaces (U+200B) and joiners, direction marks, control characters. These are invisible in every editor but break string comparisons, bloat SEO text with meaningless bytes, and can even be used to hide watermarks or malicious payloads in pasted content. Stripping them is safe for almost all prose.",
            "Whitespace normalization covers double spaces, tabs disguised as spaces, trailing spaces and orphan blank lines. This is the fix for text that \"looks fine but diff shows a hundred changes\" — most of those diffs are pure whitespace.",
            "Line-break repair handles PDF paste artifacts: hard breaks every 40 characters that make text unsearchable and unreflowable. Joining broken lines (carefully — paragraph breaks must survive) turns extracted PDF text back into flowing prose.",
          ],
        },
        {
          heading: "Deterministic, local, verifiable",
          paragraphs: [
            "All rules run in browser JavaScript on the text in the box — no upload, works offline, and nothing is stored. For contract drafts, client copy and unpublished content, a client-side cleaner is the privacy-correct choice.",
            "Determinism is the design guarantee: same input, same output, every time. That makes the tool safe inside a repeatable workflow — clean, dedup, diff — where a generative rewriter would inject unreviewable changes.",
            "The natural companion chain on this site: text-cleaner first, remove-duplicate-lines second, text-diff against the original to confirm nothing meaningful changed. Three steps, all local, all instant.",
          ],
        },
      ],
    },
    zh: {
      name: "文本清洗",
      tagline: "清除从 PDF、Word、聊天软件粘贴出的隐形字符、弯引号、多余空格和空行,一次恢复干净文本。",
      intro: [
        "复制粘贴是干净文本的重灾区:PDF 留下零宽字符,Word 把直引号换成弯引号、塞进不换行空格,聊天软件夹带控制字符。本工具一次清除这些看不见的杂质,并顺手修复标点。",
        "每个清理项都是独立开关,清理力度由你决定——从仅去行首尾空格,到彻底清除不可打印字符、规范引号、破折号和省略号。",
      ],
      steps: [
        "把乱糟糟的文本粘贴到输入框。",
        "打开需要的清理项:去行首尾空格、折叠空格、删空行、清除隐形字符、规范标点。",
        "复制干净的输出,贴回文档、CMS 或编辑器。",
      ],
      faqs: [
        {
          q: "隐形字符是什么,从哪来的?",
          a: "零宽空格、字节顺序标记和控制字符——由 PDF、部分网站和办公软件引入。它们看不见,但会破坏搜索、正则和数据库导入,通常可以放心删除。",
        },
        {
          q: "“规范标点符号”会改什么?",
          a: "弯引号变直引号,en/em 破折号变连字符,省略号字符变三个点,不换行空格变普通空格。需要纯文本、代码安全标点时使用。",
        },
        {
          q: "清理是无损的吗?",
          a: "任何工具都无法百分之百还原你的意图。输出框会先展示结果,替换原文前请先检查一遍。",
        },
      ],
      deepDive: [
        {
          heading: "一条流水线做完整套清理",
          paragraphs: [
            "文本的脏问题总是一起出现:从 PDF 粘贴的内容带着双空格、乱断行和被连字符拆开的词;复制的网页文本拖进不可见的不间断空格和零宽字符;表格导出带尾随制表符。一条规则一条规则地清意味着跑五遍、漏步骤——组合式清理器把整条流水线一次跑完。",
            "规范顺序很重要:先做 Unicode 规范化(把不间断空格折成普通空格、剔除零宽字符和控制字符),因为后面的规则要做字符比较;然后合并空白,再修剪行边缘,再修换行。在规范化之前跑去重或比较,结果就是错的——两条看起来一样的行因为一个不可见字符幸存而始终“不同”。",
            "输出应该无趣:没有任何你解释不了的改动。清理器的每条规则都是机械的、可预览的——这正是清理器和 AI “改写器”的区别:同样的输入永远得到同样的输出,而且每一步变换都可验证。",
          ],
        },
        {
          heading: "删什么,为什么删",
          paragraphs: [
            "不可见 Unicode 是头号类别:零宽空格(U+200B)与连接符、方向控制符、控制字符。这些在任何编辑器里都看不见,却会破坏字符串比较、给 SEO 文本塞进无意义的字节,甚至能被用来在粘贴内容里藏水印或恶意载荷。对几乎所有正文,剔除它们都是安全的。",
            "空白规范化覆盖双空格、伪装成空格的制表符、行尾空格和孤儿空行。这是“看起来没问题但 diff 显示一百处改动”的解药——那些 diff 大多纯属空白。",
            "换行修复处理 PDF 粘贴的产物:每 40 个字符一个硬换行,让文本既搜不到也不能重排。合并断行(要小心——段落分隔必须保留)能把抽取出来的 PDF 文本还原成流畅正文。",
          ],
        },
        {
          heading: "确定性、本地、可验证",
          paragraphs: [
            "所有规则在浏览器 JavaScript 里对文本框内容执行——不上传、离线可用、不存储任何东西。对合同草稿、客户文案和未发布内容,客户端清理器才是隐私正确的选择。",
            "确定性是设计保证:同样的输入,同样的输出,每次都一样。这让工具可以放进可重复的工作流——清理、去重、diff——而生成式改写器会注入无法审阅的变更。",
            "本站的自然配套链:先 text-cleaner,再 remove-duplicate-lines,最后用 text-diff 对原文确认没有实质改动。三步,全本地,全即时。",
          ],
        },
      ],
    },
    ja: {
      name: "テキストクリーナー",
      tagline: "PDF や Word、チャットから貼り付けたテキストから、不可視文字・スマート引用符・余分な空白・空行を一括除去。",
      intro: [
        "コピペはテキストが汚れる瞬間です:PDF はゼロ幅文字を残し、Word はストレート引用符をカーリーに置き換えてノーブレークスペースを混ぜ、チャットアプリは制御文字を挿入します。本ツールはそうした見えないゴミを一括で取り除き、句読点も整えます。",
        "各項目はオン/オフ式なので、行端のトリムだけにとどめることも、不可視文字の除去と引用符・ダッシュ・省略号の正規化まで一気に行うこともできます。",
      ],
      steps: [
        "乱れたテキストを入力欄に貼り付けます。",
        "必要な清掃項目を切り替えます:トリム、空白の圧縮、空行削除、不可視文字の除去、句読点の正規化。",
        "きれいになった出力を文書・CMS・エディタに戻します。",
      ],
      faqs: [
        {
          q: "不可視文字とは何ですか?どこから来るの?",
          a: "ゼロ幅スペース、BOM、制御文字のことです。PDF や一部のウェブサイト、オフィスソフトが付け加えます。検索・正規表現・データベース取り込みを壊す原因になるので、通常は削除して問題ありません。",
        },
        {
          q: "「句読点を正規化」では何が変わりますか?",
          a: "カーリークォートがストレートに、en/em ダッシュがハイフンに、省略号が 3 つの点に、ノーブレークスペースが通常の空白に変わります。プレーンでコード安全な記号が必要なときに使います。",
        },
        {
          q: "クリーンアップは可逆ですか?",
          a: "意図を完全に推測できるツールはありません。出力欄に結果が先に表示されるので、元のテキストを置き換える前に確認してください。",
        },
      ],
      deepDive: [
        {
          heading: "清掃パイプライン全体を 1 回で",
          paragraphs: [
            "テキストの汚れは束になって来ます。PDF から貼った内容は二重スペース、勝手な改行、行を跨いだハイフン分断を運び、コピーしたウェブ文は不可視のノーブレークスペースやゼロ幅文字を引きずり、表計算の書き出しは末尾タブを付けます。ルールを 1 つずつ当てるのは 5 回の通過と忘れられる工程を意味し、統合クリーナーはパイプライン全体を一度に適用します。",
            "正規の順序が重要です。まず Unicode を正規化し(ノーブレークスペースを通常スペースへ折り、ゼロ幅文字と制御文字を除去)、後続のルールは文字を比較するのでその後に、空白を圧縮し、行端をトリムし、改行を直す。正規化の前に重複除去や比較を走らせると結果は誤ります。見た目が同じ 2 行が、不可視文字 1 個の生存ゆえに「別物」のまま残るからです。",
            "出力は退屈であるべきです。説明できない変更を 1 つも含まない。クリーナーの全ルールは機械的で検証可能であり、それこそがクリーナーと AI「リライター」の違いです。同じ入力は常に同じ出力を生み、各変換を確認できます。",
          ],
        },
        {
          heading: "何を除去し、なぜか",
          paragraphs: [
            "不可視 Unicode が筆頭カテゴリです。ゼロ幅スペース(U+200B)と接合子、方向制御文字、制御文字。どのエディタでも見えないのに、文字列比較を壊し、SEO テキストを無意味なバイトで膨らませ、貼り付けた内容に透かしや悪意あるペイロードを隠すのにも使われ得ます。ほぼすべての文章で除去は安全です。",
            "空白の正規化は、二重スペース、スペースに偽装したタブ、行末スペース、孤立空行を覆います。これは「見た目は問題ないのに diff が 100 の変更を示す」テキストへの対処で、その diff の大半は純粋な空白です。",
            "改行修復は PDF 貼り付けの産物を扱います。40 字ごとの強制改行は、テキストを検索不能かつリフロー不能にします。分断された行を連結する(慎重に——段落の区切りは生存させねばなりません)と、抽出した PDF テキストが流れる文章に戻ります。",
          ],
        },
        {
          heading: "決定論的・ローカル・検証可能",
          paragraphs: [
            "全ルールはブラウザの JavaScript がボックス内のテキストに実行します。アップロードなし、オフライン可、保存なし。契約書の下書き、クライアントのコピー、未公開コンテンツにとって、クライアント側クリーナーこそプライバシーに正しい選択です。",
            "決定論が設計の保証です。同じ入力、同じ出力、毎回。これにより、ツールを繰り返し可能なワークフロー——クリーン、重複除去、diff——に安全に組み込めます。生成型のリライターなら検証不能な変更を注入するところです。",
            "本サイトの自然な連鎖:まず text-cleaner、次に remove-duplicate-lines、最後に原文に対する text-diff で実質的な変更がないことを確認。3 工程、すべてローカル、すべて即時。",
          ],
        },
      ],
    },
    es: {
      name: "Limpiador de texto",
      tagline:
        "Elimina caracteres invisibles, comillas tipográficas, espacios extra y líneas vacías del texto pegado de PDFs, Word y apps de chat.",
      intro: [
        "Copiar y pegar es donde el texto limpio se estropea: los PDFs dejan caracteres de ancho cero, Word convierte las comillas rectas en curvas y añade espacios duros, y las apps de chat insertan caracteres de control. Esta herramienta retira la basura invisible y repara la puntuación de una vez.",
        "Cada limpieza es un interruptor, así que tú decides la intensidad: desde solo recortar líneas hasta una limpieza completa con caracteres no imprimibles fuera y comillas, guiones y puntos suspensivos normalizados.",
      ],
      steps: [
        "Pega el texto sucio en el cuadro de entrada.",
        "Activa las limpiezas que quieras: recortar líneas, reducir espacios, quitar líneas vacías, eliminar caracteres invisibles, normalizar puntuación.",
        "Copia la salida limpia de vuelta a tu documento, CMS o editor.",
      ],
      faqs: [
        {
          q: "¿Qué son los caracteres invisibles y de dónde salen?",
          a: "Espacios de ancho cero, marcas BOM y caracteres de control que añaden PDFs, algunas webs y suites ofimáticas. Son invisibles pero rompen búsquedas, regexes e importaciones de bases de datos; quitarlos suele ser seguro.",
        },
        {
          q: "¿Qué cambia «normalizar puntuación»?",
          a: "Las comillas curvas pasan a rectas, los guiones en y em a guiones simples, el carácter de puntos suspensivos a tres puntos y los espacios duros a espacios normales. Úsalo cuando quieras puntuación plana y segura para código.",
        },
        {
          q: "¿La limpieza no pierde nada?",
          a: "Ninguna herramienta adivina tu intención. El resultado aparece primero en la salida: revísalo antes de sustituir tu original.",
        },
      ],
      deepDive: [
        {
          heading: "Una pasada para toda la tubería de limpieza",
          paragraphs: [
            "Los desórdenes del texto llegan en paquete: el contenido pegado de PDF trae espacios dobles, saltos de línea caprichosos y palabras partidas por guiones entre líneas; el texto copiado de webs arrastra espacios de no separación y caracteres de ancho cero invisibles; las hojas de cálculo exportan con tabuladores finales. Limpiar regla a regla significa cinco pasadas y pasos olvidados — un limpiador combinado aplica toda la tubería de una vez.",
            "El orden canónico importa: primero normalizar Unicode (plegar los espacios de no separación a normales, quitar los de ancho cero y los de control), porque las reglas posteriores comparan caracteres; después colapsar espacios, recortar los bordes de línea y reparar saltos. Ejecutar dedup o comparación antes de la normalización da resultados erróneos — dos líneas visualmente idénticas siguen \"diferentes\" porque sobrevive un carácter invisible.",
            "La salida debe ser aburrida: ningún cambio que no puedas explicar. Cada regla de un limpiador es mecánica y previsualizable, que es justo lo que distingue a un limpiador de un \"reescritor\" de IA — la misma entrada produce siempre la misma salida y puedes verificar cada transformación.",
          ],
        },
        {
          heading: "Qué se quita y por qué",
          paragraphs: [
            "El Unicode invisible es la categoría principal: espacios de ancho cero (U+200B) y unidores, marcas de dirección, caracteres de control. Son invisibles en todos los editores pero rompen comparaciones de cadenas, hinchan texto SEO con bytes sin sentido y hasta pueden usarse para ocultar marcas de agua o cargas maliciosas en contenido pegado. Quitarlos es seguro para casi toda la prosa.",
            "La normalización de espacios cubre espacios dobles, tabuladores disfrazados de espacios, espacios finales y líneas vacías huérfanas. Es el antídoto del texto que \"se ve bien pero el diff muestra cien cambios\" — la mayoría de esos diffs son puro espacio en blanco.",
            "La reparación de saltos atiende los artefactos del pegado de PDF: saltos duros cada 40 caracteres que dejan el texto injerible y sin reflujo. Unir las líneas partidas (con cuidado — los párrafos deben sobrevivir) devuelve el texto extraído de PDF a prosa fluida.",
          ],
        },
        {
          heading: "Determinista, local, verificable",
          paragraphs: [
            "Todas las reglas corren en JavaScript del navegador sobre el texto del cuadro — sin subida, funciona sin conexión y nada se guarda. Para borradores de contrato, copy de clientes y contenido sin publicar, un limpiador de cliente es la opción correcta en privacidad.",
            "El determinismo es la garantía de diseño: misma entrada, misma salida, siempre. Eso hace la herramienta segura dentro de un flujo repetible — limpiar, deduplicar, diff — donde un reescritor generativo inyectaría cambios no verificables.",
            "La cadena natural en este sitio: text-cleaner primero, remove-duplicate-lines después, y text-diff contra el original para confirmar que nada significativo cambió. Tres pasos, todos locales, todos instantáneos.",
          ],
        },
      ],
    },
    pt: {
      name: "Limpador de texto",
      tagline:
        "Remova caracteres invisíveis, aspas tipográficas, espaços extras e linhas vazias de texto colado de PDFs, Word e apps de mensagem.",
      intro: [
        "Copiar e colar é onde o texto limpo se estraga: PDFs deixam caracteres de largura zero, o Word troca aspas retas por curvas e insere espaços rígidos, e apps de mensagem enchem o texto de caracteres de controle. Esta ferramenta remove o lixo invisível e conserta a pontuação numa passada.",
        "Cada limpeza é uma opção, então você define a intensidade — de apenas aparar linhas até uma faxina completa com remoção de não imprimíveis e normalização de aspas, travessões e reticências.",
      ],
      steps: [
        "Cole o texto sujo na caixa de entrada.",
        "Ative as limpezas desejadas: aparar linhas, reduzir espaços, remover linhas vazias, eliminar caracteres invisíveis, normalizar pontuação.",
        "Copie a saída limpa de volta para o documento, CMS ou editor.",
      ],
      faqs: [
        {
          q: "O que são caracteres invisíveis e de onde vêm?",
          a: "Espaços de largura zero, marcas BOM e caracteres de controle, inseridos por PDFs, alguns sites e softwares de escritório. São invisíveis, mas quebram buscas, regex e importações de banco de dados — removê-los costuma ser seguro.",
        },
        {
          q: "O que a “normalizar pontuação” muda?",
          a: "Aspas curvas viram retas, travessões en/em viram hífen, o caractere de reticências vira três pontos e espaços rígidos viram espaços comuns. Use quando precisar de pontuação simples e segura para código.",
        },
        {
          q: "A limpeza é sem perdas?",
          a: "Nenhuma ferramenta adivinha sua intenção. O resultado aparece primeiro na saída: revise antes de substituir o original.",
        },
      ],
      deepDive: [
        {
          heading: "Uma passada para toda a tubulação de limpeza",
          paragraphs: [
            "As bagunças de texto chegam em pacote: conteúdo colado de PDF traz espaços duplos, quebras de linha arbitrárias e palavras partidas por hífens entre linhas; texto copiado da web arrasta espaços rígidos e caracteres de largura zero invisíveis; planilhas exportam com tabulações no fim. Limpar regra a regra significa cinco passadas e passos esquecidos — um limpador combinado aplica a tubulação inteira de uma vez.",
            "A ordem canônica importa: primeiro normalizar o Unicode (dobrar espaços rígidos em normais, remover os de largura zero e os de controle), porque as regras seguintes comparam caracteres; depois colapsar espaços, aparar as bordas das linhas e consertar quebras. Rodar dedup ou comparação antes da normalização dá resultado errado — duas linhas visualmente idênticas continuam \"diferentes\" porque um caractere invisível sobrevive.",
            "A saída deve ser monótona: nenhuma mudança que você não consiga explicar. Cada regra de um limpador é mecânica e pré-visível, que é justamente o que distingue um limpador de um \"reescritor\" de IA — a mesma entrada sempre produz a mesma saída, e você pode verificar cada transformação.",
          ],
        },
        {
          heading: "O que é removido e por quê",
          paragraphs: [
            "O Unicode invisível é a categoria principal: espaços de largura zero (U+200B) e unidores, marcas de direção, caracteres de controle. São invisíveis em todo editor mas quebram comparações de strings, inflam texto SEO com bytes sem sentido e até podem ser usados para esconder marcas d'água ou cargas maliciosas em conteúdo colado. Removê-los é seguro para quase toda a prosa.",
            "A normalização de espaços cobre espaços duplos, tabulações fingindo ser espaços, espaços no fim e linhas vazias órfãs. É o antídoto do texto que \"parece bom mas o diff mostra cem mudanças\" — a maioria desses diffs é espaço em branco puro.",
            "O conserto de quebras trata os artefatos do colado de PDF: quebras duras a cada 40 caracteres que deixam o texto inbuscável e sem reflow. Unir as linhas partidas (com cuidado — os parágrafos devem sobreviver) devolve o texto extraído de PDF a prosa fluida.",
          ],
        },
        {
          heading: "Determinístico, local, verificável",
          paragraphs: [
            "Todas as regras rodam em JavaScript do navegador sobre o texto da caixa — sem envio, funciona offline e nada é guardado. Para rascunhos de contrato, copy de clientes e conteúdo não publicado, um limpador de cliente é a escolha correta em privacidade.",
            "O determinismo é a garantia de design: mesma entrada, mesma saída, sempre. Isso torna a ferramenta segura dentro de um fluxo repetível — limpar, deduplicar, diff — onde um reescritor generativo injetaria mudanças não verificáveis.",
            "A cadeia natural neste site: text-cleaner primeiro, remove-duplicate-lines depois, e text-diff contra o original para confirmar que nada significativo mudou. Três passos, todos locais, todos instantâneos.",
          ],
        },
      ],
    },
  },
});
