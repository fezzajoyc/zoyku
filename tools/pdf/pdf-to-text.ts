import { PdfOfficeEngine } from "../_engines/pdf-engine-office";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "pdf-to-text",
  category: "pdf",
  icon: "text",
  engine: { component: PdfOfficeEngine, props: { target: "text" } },
  related: ["ocr-pdf", "pdf-to-word", "pdf-to-excel", "word-counter", "split-pdf", "delete-pdf-pages", "pdf-to-ppt", "compress-pdf", "rotate-pdf", "merge-pdf"],
  copy: {
    en: {
      name: "PDF to Text",
      tagline:
        "Pull plain text out of any PDF instantly — preview it, copy to clipboard or save as .txt, extracted page by page in your browser.",
      intro: [
        "Get the raw words out of a PDF without copy-pasting page by page. The extractor walks through the document, rebuilds reading order and hands you clean plain text you can preview, copy at once or download as a .txt file.",
        "Use it to feed quotes into notes, run text through another tool, or make a text-only archive of a document. Word counts are shown as you go, and extraction is instant because everything happens locally.",
      
        "Extraction uses pdf.js's textContent API: the reader walks each page's text items, reconstructs line breaks from Y-positions and paragraphs from line spacing — the same engine Firefox uses for its built-in viewer. A scanned PDF has no text layer to extract, so the tool will return empty output rather than hallucinate content; OCR is the tool for that.",
        "Compared with select-all → copy in a viewer (which often scrambles reading order across columns), the reconstructed text follows the document's true reading order. And because extraction is local, a contract or an unpublished manuscript can be mined for quotes without ever touching a third-party server — the same guarantee the rest of the suite makes.",
      ],
      steps: [
        "Drop a PDF with selectable text.",
        "Click Extract text and read the preview.",
        "Copy the result or download it as a .txt file.",
      ],
      faqs: [
        {
          q: "The result is empty — why?",
          a: "The PDF is probably a scan: its pages are photos of text with no text layer. Use the OCR tool instead; it reads the letters out of the images.",
        },
        {
          q: "How is reading order determined?",
          a: "Text items are grouped into lines by their coordinates and lines are ordered top to bottom, left to right. Multi-column layouts may interleave columns; splitting the PDF per column range first can help.",
        },
        {
          q: "Is there a page or size limit?",
          a: "No artificial one. Hundreds of pages work; the practical limit is browser memory, typically well beyond 100 MB documents.",
        },
      ],
      deepDive: [
        {
          heading: "The text layer: what a PDF actually stores about its words",
          paragraphs: [
            "A digitally-created PDF stores its text as a sequence of draw-operations: show this glyph, at this position, in this font. The words are genuinely in there — which is why Ctrl+F works on such documents. Extracting text is therefore not recognition but decoding: reading the text layer back out in reading order. No image processing is involved, and the fidelity is limited only by how the document was constructed.",
            "The classic complications are order and hyphenation. PDFs describe glyphs by position, not by logical flow, so multi-column layouts, sidebars and tables can extract in visual order rather than reading order — columns interleaved line by line. Decent extractors use layout heuristics to detect columns and reconstruct flow, but heavily designed documents can still come out shuffled.",
            "The other gap is scans: a scanned page has no text layer at all, just pixels, so plain extraction returns nothing. Scans need OCR first (that is a separate tool), and OCR-ed files do gain a text layer that extraction can then read.",
          ],
        },
        {
          heading: "Reading order, encoding edge cases and practical checks",
          paragraphs: [
            "When extraction looks scrambled, it almost always is the layout: two-column academic papers extract as interleaved fragments, or footnotes land mid-sentence. Quick fixes: try the same document with a different extraction tool to compare orderings, or accept that for designed layouts you may want page-per-page extraction and manual reassembly. Line breaks inside extracted text reflect the PDF's line structure, so re-flowing paragraphs is often a cleanup step in your editor.",
            "Encoding edge cases show up as mystery characters: ligatures (fi, fl) that arrive as single glyphs, accents mangled if the PDF uses a non-standard font encoding, and mathematical symbols that map poorly to plain text. Plain-text output has no bold, italic, tables or images — everything becomes characters, so structure worth keeping must be noted manually.",
            "A sanity check before relying on extracted text: search the output for a phrase you can see on the first page, and compare the character count against expectations. If a 10-page report extracts to 300 characters, the text layer is broken or image-only — the tool's honest empty result on a scan is better than silently dropping content.",
          ],
        },
        {
          heading: "Extracting documents locally, especially the sensitive ones",
          paragraphs: [
            "Text extraction is often the first step of processing documents you did not create: legal agreements, financial reports, research papers, internal memos. Uploading them to a text-extraction site means the full readable content — the most portable, most copyable form of your document — passes through someone else's server. Extracted text is even more easily redistributed than the original file: it carries no metadata trail at all.",
            "This tool decodes the text layer entirely in your browser: the PDF is parsed locally, glyphs are mapped back to characters on your device, and the plain-text file is saved by your browser. Nothing is uploaded, and nothing is logged anywhere — with the network disconnected, extraction works exactly the same.",
            "Because extraction is fast and free of network round-trips, it fits the \"extract many, then search\" workflow: pull text out of a whole folder of PDFs, paste everything into a searchable document or use it as corpus, and never have any of those sources leave your machine. For literature reviews and contract comparisons, that privacy plus speed combination is what makes bulk extraction practical.",
          ],
        },
      ],
    },
    zh: {
      name: "PDF 转文本",
      tagline: "从任意 PDF 中即时提取纯文本——预览、一键复制或保存为 .txt,按页提取,全程在浏览器本地完成。",
      intro: [
        "不用逐页复制粘贴,直接把 PDF 里的文字拿出来。提取器遍历文档、按坐标重建阅读顺序,输出干净的纯文本:可预览、一键复制,或下载为 .txt 文件。",
        "适合把引文整理进笔记、把文字交给其他工具处理,或为文档做纯文本存档。随时显示字数统计,提取即时完成,因为一切都在本地进行。",
      ],
      steps: [
        "拖入有可选中文字的 PDF。",
        "点击“提取文本”并查看预览。",
        "复制结果或下载为 .txt 文件。",
      ],
      faqs: [
        {
          q: "结果为什么是空的?",
          a: "这个 PDF 多半是扫描件:页面是文字的照片,没有文本层。请改用 OCR 工具,它能从图片中识别文字。",
        },
        {
          q: "阅读顺序是怎么确定的?",
          a: "文字条目按坐标聚合成行,行再按从上到下、从左到右排序。多栏排版可能出现两栏交错;先用“拆分 PDF”按栏位拆分会有帮助。",
        },
        {
          q: "有页数或大小限制吗?",
          a: "没有人为主观限制。几百页没问题;实际限制是浏览器内存,通常远超 100 MB 的文档。",
        },
      ],
      deepDive: [
        {
          heading: "文字层:PDF 里到底存了什么关于词的东西",
          paragraphs: [
            "数字生成的 PDF 把文字存成一连串绘制指令:在这个位置、用这个字体画这个字形。词是真真切切在里面的——这就是 Ctrl+F 在这类文档上有效的原因。所以提取文本不是识别,而是解码:按阅读顺序把文字层读出来。不涉及任何图像处理,保真度只受文档构造方式的限制。",
            "经典麻烦是顺序和断词。PDF 按位置描述字形,不按逻辑流,所以多栏排版、侧栏和表格可能按视觉顺序而不是阅读顺序提取——两栏逐行交错。像样的提取器用版面启发式检测分栏、重建语流,但重度设计的文档仍可能出来是乱的。",
            "另一个空白是扫描件:扫描页根本没有文字层,只有像素,直接提取什么都没有。扫描件需要先 OCR(那是另一个工具),OCR 过的文件就长出了文字层,提取就能读了。",
          ],
        },
        {
          heading: "阅读顺序、编码边角与实用检查",
          paragraphs: [
            "提取结果看着乱,几乎总是版面的锅:双栏论文提取成碎片交错,脚注插进句子中间。快速解法:用另一个提取工具跑同一份文档对比顺序;或者接受现实——对设计型版面,可能要逐页提取、手工拼回。提取文本里的换行反映 PDF 的行结构,段落重新连排通常是编辑器里的一步清理。",
            "编码边角问题表现为神秘字符:连字(fi、fl)以单个字形出现、用了非标准字体编码的重音字符被搅乱、数学符号映射到纯文本很勉强。纯文本输出没有粗体、斜体、表格和图片——一切都变成字符,值得保留的结构要手工标注。",
            "依赖提取文本前做个健全性检查:在输出里搜索你在第一页能看到的某个词句,再把字符数和预期比一比。一份 10 页报告只提取出 300 个字符,说明文字层坏了或只有图——对扫描件诚实地返回空结果,好过悄悄丢内容。",
          ],
        },
        {
          heading: "本地提取文档,尤其是敏感的那些",
          paragraphs: [
            "文本提取常常是处理别人给你的文档的第一步:法律协议、财务报告、研究论文、内部备忘。把它们传给文本提取网站,意味着文档完整可读的内容——它最易搬运、最易复制的形态——经过了别人的服务器。提取出的文本比原文件更容易流转:它连一点元数据痕迹都没有。",
            "本工具完全在浏览器里解码文字层:PDF 本地解析,字形在你设备上映射回字符,纯文本文件由浏览器保存。什么都不上传,哪里都不留日志——断网时提取照常工作,一模一样。",
            "提取快、又没有网络往返,正好适配“批量提取、然后检索”的工作流:把整个文件夹的 PDF 文本都拉出来,粘进一份可搜索的文档或当语料用,任何一份源文件都不离开你的机器。对文献综述和合同比对,隐私加速度的组合正是批量提取变得实用的原因。",
          ],
        },
      ],
    },
    ja: {
      name: "PDF をテキストに変換",
      tagline: "あらゆる PDF からプレーンテキストを即座に取り出し。プレビュー・一括コピー・.txt 保存に対応。ページ単位の抽出をブラウザ内で。",
      intro: [
        "ページごとのコピペなしで、PDF の文章をそのまま取り出します。抽出処理は文書をなぞり、座標から読む順序を再構築し、プレビュー・一括コピー・.txt としてダウンロードできるきれいなプレーンテキストを返します。",
        "引用をノートに集める、別のツールにテキストを渡す、文書のテキスト専用アーカイブを作る、といった用途に。文字数も常に表示され、すべてローカル処理なので抽出は一瞬です。",
      ],
      steps: [
        "テキストを選択できる PDF をドロップします。",
        "「テキストを抽出」をクリックし、プレビューを確認します。",
        "結果をコピーするか、.txt としてダウンロードします。",
      ],
      faqs: [
        {
          q: "結果が空になるのはなぜ?",
          a: "その PDF はスキャン画像の可能性が高いです。ページは文字の写真で、テキスト層がありません。代わりに OCR ツールを使うと、画像から文字を読み取れます。",
        },
        {
          q: "読む順序はどう決まりますか?",
          a: "テキスト要素を座標で行にまとめ、上から下・左から右に並べます。段組みレイアウトでは段が交互になることがあり、先に PDF を段ごとに分割すると改善します。",
        },
        {
          q: "ページ数やサイズの上限は?",
          a: "人為的な上限はありません。数百ページも問題なく動きます。実用上の上限はブラウザのメモリで、通常は 100 MB 超の文書でも十分足ります。",
        },
      ],
      deepDive: [
        {
          heading: "テキスト層:PDF は語について何を実際に保存しているか",
          paragraphs: [
            "デジタル生成の PDF はテキストを描画命令の列として保存します。この位置に、このフォントで、この字形を描け、という具合に。語は本当にそこにあります。だからそういう文書で Ctrl+F が効くのです。したがってテキスト抽出は認識ではなくデコードです。テキスト層を読み順どおりに読み戻すこと。画像処理は一切関与せず、忠実度は文書の作られ方にだけ律されます。",
            "古典的な complication は順序とハイフネーションです。PDF は字形を位置で記述し、論理的な流れでは記述しないので、二段組、サイドバー、表は読み順ではなく視覚順に抽出され得ます——段が行ごとに織り交ぜられて。しっかりした抽出器はレイアウトのヒューリスティクスで段を検出して流れを再構成しますが、デザイン性の強い文書はそれでも混線することがあります。",
            "もう一つの空白は走査です。走査ページにはテキスト層がまったくなく、ピクセルしかないので、単純な抽出は何も返しません。走査には先に OCR が要ります(それは別のツールです)。OCR 済みのファイルはテキスト層を獲得するので、その後の抽出が読めるようになります。",
          ],
        },
        {
          heading: "読み順、符号化の隅、実践的な点検",
          paragraphs: [
            "抽出が混乱して見えるとき、ほぼ必ずレイアウトのせいです。二段組の論文は断片が織り込まれた形で抽出され、脚注が文の途中に落ちます。手早い対処は、同じ文書を別の抽出ツールに通して順序を比較するか、デザイン版面は諦めてページごとの抽出と手作業での再構成に切り替えること。抽出テキスト内の改行は PDF の行構造を反映するので、段落の連結し直しはたいていエディタでの掃除工程になります。",
            "符号化の隅は謎の文字として現れます。単一の字形として届く合字(fi、fl)、非標準のフォント符号化で乱れるアクセント、プレーンテキストへの対応がぎこちない数学記号。プレーンテキスト出力には太字も斜体も表も画像もありません。すべてが文字になり、保つ価値のある構造は手作業で記録する必要があります。",
            "抽出テキストを頼る前の健全性チェック:出力の中で、第一ページで目に見える語句を検索し、文字数を期待値と比較してください。10 ページの報告書が 300 文字しか抽出されないなら、テキスト層は壌れているか画像のみです。走査に対する正直な空の結果は、内容を黙って落とすよりましです。",
          ],
        },
        {
          heading: "文書をローカルで抽出する。特に機密のものを",
          paragraphs: [
            "テキスト抽出は、自分で作っていない文書を処理する最初の一歩であることが多いものです。法的合意、財務報告、研究論文、社内メモ。それらをテキスト抽出サイトにアップロードすることは、文書の読める内容の全体——最も運搬しやすく、最も複製しやすい形——が他人のサーバーを通ることを意味します。抽出テキストは元ファイルよりさらに転がりやすいものです。メタデータの痕跡をまったく持たないのですから。",
            "このツールはテキスト層のデコードを完全にブラウザ内で行います。PDF はローカルで解析され、字形は端末上で文字へ写像され、プレーンテキストファイルはブラウザが保存します。アップロードは一切なく、どこにも記録もなく、回線を切っても抽出はまったく同じに動きます。",
            "抽出は速く、ネットワーク往復もないので、「大量に抽出してから検索する」ワークフローに適します。PDF フォルダ丸ごとからテキストを引き出し、すべてを検索可能な文書に貼るかコーパスとして使い、ソースの一つも端末から離れさせない。文献レビューも契約書の比較も、このプライバシーと速度の組み合わせが一括抽出を実用的にしているのです。",
          ],
        },
      ],
    },
    es: {
      name: "PDF a texto",
      tagline:
        "Saca el texto plano de cualquier PDF al instante: véalo, cópielo o guárdelo como .txt, extraído página a página en su navegador.",
      intro: [
        "Obtén las palabras de un PDF sin copiar y pegar página por página. El extractor recorre el documento, reconstruye el orden de lectura y te entrega texto plano limpio que puedes previsualizar, copiar de una vez o descargar como .txt.",
        "Úsalo para llevar citas a tus notas, pasar el texto por otra herramienta o crear un archivo solo de texto de un documento. El recuento de palabras se muestra sobre la marcha, y la extracción es instantánea porque todo ocurre en local.",
      ],
      steps: [
        "Suelta un PDF con texto seleccionable.",
        "Pulsa Extraer texto y lee la vista previa.",
        "Copia el resultado o descárgalo como .txt.",
      ],
      faqs: [
        {
          q: "El resultado sale vacío, ¿por qué?",
          a: "Probablemente es un escaneo: sus páginas son fotos del texto sin capa de texto. Usa la herramienta de OCR, que lee las letras de las imágenes.",
        },
        {
          q: "¿Cómo se determina el orden de lectura?",
          a: "Los fragmentos se agrupan en líneas por sus coordenadas y las líneas se ordenan de arriba abajo y de izquierda a derecha. En maquetaciones a varias columnas pueden entremezclarse; dividir el PDF por columnas antes ayuda.",
        },
        {
          q: "¿Hay límite de páginas o de tamaño?",
          a: "No artificial. Cientos de páginas funcionan; el límite práctico es la memoria del navegador, normalmente muy por encima de documentos de 100 MB.",
        },
      ],
      deepDive: [
        {
          heading: "La capa de texto: qué guarda realmente un PDF sobre sus palabras",
          paragraphs: [
            "Un PDF creado digitalmente guarda su texto como una secuencia de operaciones de dibujo: pinta este glifo, en esta posición, con esta fuente. Las palabras están genuinamente ahí dentro — por eso Ctrl+F funciona en esos documentos. Extraer texto no es pues reconocimiento sino decodificación: leer la capa de texto de vuelta en orden de lectura. No hay procesamiento de imágenes involucrado, y la fidelidad solo está limitada por cómo se construyó el documento.",
            "Las complicaciones clásicas son el orden y la división con guiones. Los PDF describen glifos por posición, no por flujo lógico, así que los diseños a varias columnas, las barras laterales y las tablas pueden extraerse en orden visual en vez de orden de lectura — columnas entrelazadas línea a línea. Los extractores decentes usan heurísticas de maquetación para detectar columnas y reconstruir el flujo, pero los documentos muy diseñados pueden salir barajados igualmente.",
            "El otro vacío son los escaneos: una página escaneada no tiene capa de texto alguna, solo píxeles, así que la extracción simple no devuelve nada. Los escaneos necesitan OCR primero (es otra herramienta), y los archivos con OCR sí ganan una capa de texto que la extracción puede leer después.",
          ],
        },
        {
          heading: "Orden de lectura, casos de codificación y comprobaciones prácticas",
          paragraphs: [
            "Cuando la extracción parece revuelta, casi siempre es la maquetación: artículos académicos a dos columnas se extraen como fragmentos entrelazados, o las notas al pie caen a mitad de frase. Arreglos rápidos: prueba el mismo documento con otro extractor para comparar órdenes, o acepta que en diseños muy elaborados quizá quieras extracción página a página y reensamblado manual. Los saltos de línea del texto extraído reflejan la estructura de líneas del PDF, así que re-flujar los párrafos suele ser un paso de limpieza en tu editor.",
            "Los casos de codificación aparecen como caracteres misteriosos: ligaduras (fi, fl) que llegan como un solo glifo, acentos estropeados si el PDF usa una codificación de fuente no estándar, y símbolos matemáticos que mapean mal a texto plano. La salida de texto plano no tiene negritas, cursivas, tablas ni imágenes — todo se convierte en caracteres, así que la estructura que merece conservarse hay que anotarla a mano.",
            "Una comprobación de cordura antes de fiarte del texto extraído: busca en la salida una frase que veas en la primera página y compara el número de caracteres con lo esperado. Si un informe de 10 páginas extrae 300 caracteres, la capa de texto está rota o es solo imagen — el resultado vacío y honesto ante un escaneo es mejor que perder contenido en silencio.",
          ],
        },
        {
          heading: "Extraer documentos en local, sobre todo los sensibles",
          paragraphs: [
            "La extracción de texto suele ser el primer paso para procesar documentos que no creaste tú: acuerdos legales, informes financieros, artículos de investigación, memorandos internos. Subirlos a un sitio de extracción significa que el contenido legible completo — la forma más transportable y copiable de tu documento — pasa por el servidor de otra persona. El texto extraído circula incluso más fácilmente que el archivo original: no lleva rastro de metadatos alguno.",
            "Esta herramienta decodifica la capa de texto por completo en tu navegador: el PDF se analiza en local, los glifos se mapean de vuelta a caracteres en tu dispositivo, y el archivo de texto plano lo guarda tu navegador. Nada se sube, y nada se registra en ningún sitio — con la red desconectada, la extracción funciona exactamente igual.",
            "Como extraer es rápido y no tiene viajes de red, encaja con el flujo \"extraer muchos y luego buscar\": saca el texto de toda una carpeta de PDFs, pégalo todo en un documento buscable o úsalo como corpus, y ninguna de esas fuentes sale jamás de tu máquina. Para revisiones de literatura y comparaciones de contratos, esa combinación de privacidad y velocidad es lo que hace práctica la extracción en lote.",
          ],
        },
      ],
    },
    pt: {
      name: "PDF para texto",
      tagline:
        "Extraia o texto puro de qualquer PDF na hora — visualize, copie ou salve como .txt, página por página, direto no navegador.",
      intro: [
        "Tire as palavras de um PDF sem copiar e colar página por página. O extrator percorre o documento, reconstrói a ordem de leitura e entrega um texto puro limpo para visualizar, copiar de uma vez ou baixar como .txt.",
        "Use para levar citações às suas anotações, passar o texto por outra ferramenta ou criar um arquivo só de texto de um documento. A contagem de palavras aparece durante o processo, e a extração é instantânea porque tudo roda localmente.",
      ],
      steps: [
        "Solte um PDF com texto selecionável.",
        "Clique em Extrair texto e leia a prévia.",
        "Copie o resultado ou baixe como .txt.",
      ],
      faqs: [
        {
          q: "O resultado veio vazio — por quê?",
          a: "Provavelmente é uma digitalização: as páginas são fotos do texto, sem camada de texto. Use a ferramenta de OCR, que lê as letras das imagens.",
        },
        {
          q: "Como a ordem de leitura é definida?",
          a: "Os trechos são agrupados em linhas pelas coordenadas e as linhas ordenadas de cima para baixo, da esquerda para a direita. Layouts de várias colunas podem se entrelaçar; dividir o PDF por colunas antes ajuda.",
        },
        {
          q: "Existe limite de páginas ou tamanho?",
          a: "Nenhum artificial. Centenas de páginas funcionam; o limite prático é a memória do navegador, normalmente bem acima de documentos de 100 MB.",
        },
      ],
      deepDive: [
        {
          heading: "A camada de texto: o que um PDF realmente guarda sobre suas palavras",
          paragraphs: [
            "Um PDF criado digitalmente guarda seu texto como uma sequência de operações de desenho: pinte este glifo, nesta posição, com esta fonte. As palavras estão genuinamente lá dentro — por isso o Ctrl+F funciona nesses documentos. Extrair texto não é, portanto, reconhecimento, e sim decodificação: ler a camada de texto de volta na ordem de leitura. Não há processamento de imagem envolvido, e a fidelidade só é limitada por como o documento foi construído.",
            "As complicações clássicas são ordem e hifenização. PDFs descrevem glifos por posição, não por fluxo lógico, então layouts de várias colunas, barras laterais e tabelas podem extrair em ordem visual em vez de ordem de leitura — colunas entrelaçadas linha a linha. Extratores decentes usam heurísticas de layout para detectar colunas e reconstruir o fluxo, mas documentos muito bem desenhados ainda podem sair embaralhados.",
            "A outra lacuna são as digitalizações: uma página escaneada não tem camada de texto nenhuma, só pixels, então a extração simples não devolve nada. Digitalizações precisam de OCR primeiro (é outra ferramenta), e arquivos com OCR ganham uma camada de texto que a extração consegue ler depois.",
          ],
        },
        {
          heading: "Ordem de leitura, casos de codificação e verificações práticas",
          paragraphs: [
            "Quando a extração parece revirada, quase sempre é o layout: artigos acadêmicos em duas colunas extraem como fragmentos entrelaçados, ou notas de rodapé caem no meio de frases. Correções rápidas: rode o mesmo documento em outro extrator para comparar ordens, ou aceite que em layouts muito elaborados talvez você queira extração página a página e remontagem manual. As quebras de linha do texto extraído refletem a estrutura de linhas do PDF, então refluir os parágrafos costuma ser um passo de limpeza no seu editor.",
            "Casos de codificação aparecem como caracteres misteriosos: ligaduras (fi, fl) que chegam como um único glifo, acentos estragados se o PDF usa uma codificação de fonte não padrão, e símbolos matemáticos que mapeiam mal para texto plano. A saída em texto plano não tem negrito, itálico, tabelas nem imagens — tudo vira caracteres, então a estrutura que vale manter precisa ser anotada à mão.",
            "Uma checagem de sanidade antes de confiar no texto extraído: procure na saída uma frase que você vê na primeira página e compare a contagem de caracteres com o esperado. Se um relatório de 10 páginas extrai 300 caracteres, a camada de texto está quebrada ou é só imagem — o resultado vazio e honesto diante de uma digitalização é melhor que perder conteúdo em silêncio.",
          ],
        },
        {
          heading: "Extrair documentos localmente, sobretudo os sensíveis",
          paragraphs: [
            "A extração de texto costuma ser o primeiro passo para processar documentos que você não criou: acordos jurídicos, relatórios financeiros, artigos de pesquisa, memorandos internos. Enviá-los a um site de extração significa que o conteúdo legível completo — a forma mais transportável e copiável do seu documento — passa pelo servidor de outra pessoa. O texto extraído circula ainda mais fácil que o arquivo original: não carrega rastro de metadado nenhum.",
            "Esta ferramenta decodifica a camada de texto inteiramente no seu navegador: o PDF é analisado localmente, os glifos são mapeados de volta a caracteres no seu dispositivo, e o arquivo de texto plano é salvo pelo seu navegador. Nada é enviado, e nada fica registrado em lugar algum — com a rede desconectada, a extração funciona exatamente igual.",
            "Como extrair é rápido e não tem viagens de rede, encaixa no fluxo \"extrair muitos e depois buscar\": puxe o texto de uma pasta inteira de PDFs, cole tudo num documento pesquisável ou use como corpus, e nenhuma dessas fontes sai da sua máquina. Para revisões de literatura e comparações de contratos, essa combinação de privacidade e velocidade é o que torna prática a extração em lote.",
          ],
        },
      ],
    },
  },
});
