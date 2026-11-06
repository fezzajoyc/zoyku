import { PdfOfficeEngine } from "../_engines/pdf-engine-office";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "pdf-to-word",
  category: "pdf",
  icon: "text",
  featured: true,
  engine: { component: PdfOfficeEngine, props: { target: "docx" } },
  related: ["word-to-pdf", "pdf-to-text", "ocr-pdf", "pdf-to-excel", "merge-pdf", "split-pdf", "delete-pdf-pages", "pdf-to-ppt", "compress-pdf", "rotate-pdf"],
  copy: {
    en: {
      name: "PDF to Word",
      tagline:
        "Turn PDF text into an editable Word document (.docx) in your browser — a text-focused conversion, free, with nothing uploaded.",
      intro: [
        "Extract the words from a PDF into a .docx you can edit in Word, Google Docs or LibreOffice. Headings are detected from font sizes, paragraphs are rebuilt from line positions, and the result is a clean, lightweight document you can rework.",
        "This is an honest text-focused conversion: it does not reconstruct complex page layouts, columns or image placement. The upside is total privacy — the analysis and the .docx generation happen entirely on your device.",
      
        "Conversion maps the PDF's text runs to a .docx via document structure: font size thresholds mark headings, line groupings become paragraphs, and the text is reflowed to Word's default margins. The output is a clean, editable docx — honest about what a text extraction can and cannot reconstruct from a fixed-layout page.",
        "Compared with online converters that upload the file and return a best-effort layout reconstruction (often broken), this produces predictable, editable text with the caveat that columns, images and complex layouts do not carry over. The privacy win is total: a manuscript or a legal document never leaves your machine.",
      ],
      steps: [
        "Drop a text-based PDF (one whose text you can select).",
        "Click Convert to Word and wait a moment.",
        "Download the .docx and edit it anywhere.",
      ],
      faqs: [
        {
          q: "Why does the layout differ from the original PDF?",
          a: "This is a text-focused conversion: it rebuilds paragraphs and heading levels rather than reproducing the page pixel-for-pixel. Expect the same words in a cleaner, editable flow — not a visual clone.",
        },
        {
          q: "My PDF is a scan and produces an empty document.",
          a: "Scanned PDFs contain pictures of text, not text. Run it through our OCR tool first, then paste or convert the recognized text to Word.",
        },
        {
          q: "Do tables and images survive?",
          a: "Images are not carried into the .docx. Tables come through as plain lines of text — usable, but you will want to rebuild real tables in Word for anything complex.",
        },
      ],
      deepDive: [
        {
          heading: "The fidelity boundary: what survives the trip to Word",
          paragraphs: [
            "A PDF describes final appearances; a Word document describes structure — paragraphs, styles, lists, headings. Converting between them is translation, not decryption, and every conversion must decide how much structure to reconstruct from appearance alone. Well-built converters reconstruct paragraph boundaries, heading levels from font sizes, and tables from aligned text; simple ones dump lines of text into a single flow.",
            "What survives well in a good conversion: body text with paragraph breaks, simple tables, basic bold/italic emphasis, and reading order in typical documents. What rarely survives perfectly: exact fonts (Word substitutes closest available), multi-column layouts (usually flattened to one column), headers and footers (may be merged into body text or dropped), and anything interactive like form fields or annotations.",
            "The most honest framing: PDF-to-Word is excellent for recovering editable prose, good enough for typical business documents, and structurally wrong for heavily designed pages — posters, complex magazine layouts, forms. For the last category, converting gives you an editable mess; re-creating the layout natively in Word is often faster than fixing the conversion.",
          ],
        },
        {
          heading: "Scans, OCR and the workflow around conversion",
          paragraphs: [
            "The single biggest fork in PDF-to-Word quality is whether the source is digital or scanned. A digital PDF carries its text and converts directly. A scanned PDF carries only pixels, so the conversion chain is longer: OCR to create a text layer, then reconstruction into Word paragraphs — and OCR's accuracy limits now apply on top of conversion's own limits. Handwriting, stamps, and marginal notes degrade the result further.",
            "Practical expectations by source: a born-digital contract converts to something you can edit and finalize with modest cleanup. A clean 300-DPI typed scan converts to something you can edit but must proofread line by line — OCR errors in contracts and names are exactly the errors you cannot afford. A photo of a page taken in bad light converts poorly regardless of tooling; rescan properly instead.",
            "After converting any important document, do a structural read-through in Word, not just a visual one: check paragraph breaks, list numbering and table cells, because those are where conversions err silently while the page still looks right.",
          ],
        },
        {
          heading: "Contracts and reports should convert locally",
          paragraphs: [
            "The documents people most want in editable Word form are the most binding ones: contracts to renegotiate, policies to update, reports to reuse, transcripts to annotate. Uploading a contract PDF to a converter means your legal text passes through a third party's servers — and the extracted Word copy, being even easier to edit and redistribute than the original, is exactly the artifact you least want sitting in someone else's storage.",
            "This tool performs the whole conversion in your browser: the PDF is parsed locally, text structure is reconstructed on your device, and the Word file is generated and saved locally. Nothing is transmitted in either direction, and the conversion works fully offline — a contract under NDA can be converted with the same confidence as a menu.",
            "Local conversion also keeps the review loop tight: convert, open in Word, note the fixes needed, adjust and convert again if needed — all within seconds per cycle and without ever re-uploading. That tight loop is what makes careful proofreading feasible, and careful proofreading, not the conversion itself, is what actually protects the document's integrity.",
          ],
        },
      ],
    },
    zh: {
      name: "PDF 转 Word",
      tagline: "在浏览器里把 PDF 文字转成可编辑的 Word 文档(.docx)——专注文本的转换,免费,文件不上传。",
      intro: [
        "把 PDF 中的文字提取成可在 Word、Google Docs 或 LibreOffice 中编辑的 .docx。工具根据字号识别标题、按行位置重建段落,输出一份干净轻便、可以继续加工的文档。",
        "这是诚实的文本导向转换:不会复原复杂的版面、分栏或图片位置。换来的是完全的隐私——分析和 .docx 生成全部在你的设备上完成。",
      ],
      steps: [
        "拖入文本型 PDF(文字可以被选中的那种)。",
        "点击“转换为 Word”,稍等片刻。",
        "下载 .docx,在任何编辑器里继续加工。",
      ],
      faqs: [
        {
          q: "为什么版式和原 PDF 不一样?",
          a: "这是文本导向的转换:重建段落和标题层级,而不是逐像素复刻页面。你会得到同样内容的干净可编辑版本,而不是视觉克隆。",
        },
        {
          q: "扫描版 PDF 转出来是空的?",
          a: "扫描件里是文字的图片而不是文字本身。请先用我们的 OCR 工具识别,再把识别结果转成 Word。",
        },
        {
          q: "表格和图片会保留吗?",
          a: "图片不会带入 .docx。表格会变成普通文本行——内容可用,但复杂表格建议在 Word 里重新制作。",
        },
      ],
      deepDive: [
        {
          heading: "还原度边界:什么能活着到达 Word",
          paragraphs: [
            "PDF 描述最终外观,Word 文档描述结构——段落、样式、列表、标题。两者互转是翻译,不是解密,每次转换都要决定:仅凭外观,重建多少结构。做得好的转换器会重建段落边界、按字号推断标题层级、从对齐文本恢复表格;简陋的就把一行行文字倒进同一条流里。",
            "好的转换里存活得好的是:带段落换行的正文、简单表格、基本的粗体斜体强调、典型文档的阅读顺序。几乎不可能完美存活的是:精确字体(Word 换成最接近的可用字体)、多栏版式(通常压成单栏)、页眉页脚(可能混进正文或被丢弃)、表单字段和批注这类交互内容。",
            "最诚实的说法:PDF 转 Word 恢复可编辑文字很出色,处理典型商务文档足够好,处理重度设计的页面在结构上是错的——海报、复杂杂志版式、表单。对最后一类,转换给你一团可编辑的乱;在 Word 里原生重排版式往往比修转换结果更快。",
          ],
        },
        {
          heading: "扫描件、OCR 与围绕转换的工作流",
          paragraphs: [
            "PDF 转 Word 质量的最大分岔,是源文件是数字的还是扫描的。数字 PDF 自带文字,直接转换;扫描 PDF 只有像素,转换链条更长:先 OCR 造出文字层,再重建成 Word 段落——OCR 的准确率限制叠加在转换自身的限制之上。手写字、图章、页边批注会让结果进一步劣化。",
            "按源文件给实际预期:数字生成的合同,转换后稍加清理就能编辑定稿;干净的 300 DPI 打字扫描件,转换后可编辑但必须逐行校对——合同和人名里的 OCR 错误,恰恰是你承受不起的错误;光线糟糕的手机翻拍,无论用什么工具都转不好,不如重新好好扫一遍。",
            "转换任何重要文档后,在 Word 里做一次结构通读,不只是看外观:检查段落换行、列表编号、表格单元格——转换正是在这些地方悄悄出错,而页面看上去仍然是对的。",
          ],
        },
        {
          heading: "合同和报告应该本地转换",
          paragraphs: [
            "人们最想要可编辑 Word 版的文档,恰恰是最有约束力的那些:要重新谈判的合同、要更新的政策、要复用的报告、要批注的成绩单。把合同 PDF 传给转换器,意味着你的法律文本经过第三方服务器——而提取出的 Word 副本比原文件更容易编辑、更容易流转,正是你最不希望躺在别人存储里的那份东西。",
            "本工具在浏览器里完成整个转换:PDF 本地解析,文本结构在你设备上重建,Word 文件在本地生成保存。两个方向都不传输任何东西,离线也能完整转换——NDA 下的合同和一份菜单,用同样的把握转换。",
            "本地转换还让复核闭环收紧:转换、在 Word 里打开、记下要修的地方、调整后再转一遍——每轮几秒,而且从不需要重新上传。收紧的循环才让仔细校对变得可行,而真正保护文档完整性的正是仔细校对,不是转换本身。",
          ],
        },
      ],
    },
    ja: {
      name: "PDF を Word に変換",
      tagline: "PDF のテキストをブラウザ内で編集可能な Word 文書(.docx)に変換。テキスト重視の変換で、無料・アップロード不要です。",
      intro: [
        "PDF の文章を、Word・Google Docs・LibreOffice で編集できる .docx に取り出します。フォントサイズから見出しを検出し、行位置から段落を再構築して、手を加えやすい軽量な文書を作ります。",
        "このツールはテキスト重視の変換であることを正直にお伝えします。複雑なレイアウト・段組み・画像配置は再現しません。その代わり完全なプライバシーを実現します。解析も .docx 生成もすべて端末内で行われます。",
      ],
      steps: [
        "テキストベースの PDF(文字を選択できるもの)をドロップします。",
        "「Word に変換」をクリックして少し待ちます。",
        ".docx をダウンロードし、どこでも編集します。",
      ],
      faqs: [
        {
          q: "レイアウトが元の PDF と違うのはなぜ?",
          a: "テキスト重視の変換のためです。ページをピクセル単位で再現するのではなく、段落や見出しの階層を組み立て直します。同じ言葉を、より整った編集可能な流れで受け取れます。",
        },
        {
          q: "スキャンした PDF から空の文書が出ます。",
          a: "スキャン PDF のテキストは画像であり、文字データではありません。まず OCR ツールで認識し、その結果を Word に変換してください。",
        },
        {
          q: "表や画像は残りますか?",
          a: "画像は .docx には取り込まれません。表は通常のテキスト行として抽出されます。複雑な表は Word で組み直すのがおすすめです。",
        },
      ],
      deepDive: [
        {
          heading: "忠実度の境界:Word までの旅を生き延びるもの",
          paragraphs: [
            "PDF は最終的な見た目を記述し、Word 文書は構造を記述します——段落、スタイル、リスト、見出し。相互変換は解読ではなく翻訳であり、どの変換も見た目だけからどれだけの構造を再構築するかを決めなければなりません。きちんと作られた変換器は段落の境界を再構築し、フォントサイズから見出しレベルを推定し、揃ったテキストから表を復元します。単純なものはテキストの行を一本の流れに流し込みます。",
            "良い変換でよく生き延びるもの:段落改行のある本文、単純な表、基本的な太字/斜体の強調、典型文書の読み順。ほぼ完璧には生き延びないもの:正確なフォント(Word は最も近い利用可能なものに代替)、多段組(通常は一段に平たん化)、ヘッダーとフッター(本文に混ざるか捨てられる)、フォームフィールドや注釈のような対話的要素。",
            "最も誠実な言い方:PDF から Word へは、編集可能な散文の復元には優れ、典型的事務文書には十分で、デザイン性の強いページには構造的に不適です——ポスター、複雑な雑誌レイアウト、フォーム。最後のカテゴリでは、変換は編集可能な混沌をくれます。Word でレイアウトを最初から作り直すほうが、変換結果を直すより速いことが多い。",
          ],
        },
        {
          heading: "走査、OCR、変換をめぐるワークフロー",
          paragraphs: [
            "PDF から Word への品質を分ける最大の分岐は、ソースがデジタルか走査かです。デジタル PDF はテキストを持っていて直接変換できます。走査 PDF はピクセルしか持たないので、変換の連鎖は長くなります。テキスト層を作る OCR、そして Word の段落への再構築——OCR の精度の限界が、変換自体の限界の上に乗ります。手書き、スタンプ、余白の書き込みはさらに結果を悪くします。",
            "ソース別の現実的な期待値:デジタル生成の契約書は、適度な掃除で編集して仕上げられるものに変換されます。きれいな 300 DPI の活字走査は、編集はできるが一行ずつ校正が要るものに変換されます。契約書や人名の中の OCR 誤りは、まさに許容できない誤りです。光の悪いページの携帯写真は、道具を選ばずうまくいきません。きちんと再走査してください。",
            "重要な文書を変換したら、Word で構造通読を一度してください。見た目だけの確認ではなく。段落改行、リスト番号、表のセルを確かめてください。変換が黙って間違えるのはまさにそこで、ページは正しく見えているからです。",
          ],
        },
        {
          heading: "契約書と報告書はローカルで変換すべき",
          paragraphs: [
            "人が編集可能な Word 形を最も欲しがる文書は、最も拘束力のあるものです。再交渉する契約書、更新するポリシー、再利用する報告書、注釈を付ける成績証明。契約書の PDF を変換器にアップロードすることは、あなたの法的テキストが第三者のサーバーを通ることです。しかも抽出された Word のコピーは元より編集と再配布が容易で、他人のストレージに座っていてほしくない成果物の最たるものです。",
            "このツールは変換の全体をブラウザ内で行います。PDF はローカルで解析され、テキスト構造は端末上で再構築され、Word ファイルはローカルで生成・保存されます。どちらの方向にも何も送信されず、完全にオフラインで変換できます。NDA の契約書も、メニューと同じ確信度で変換できます。",
            "ローカル変換は見直しのループも引き締めます。変換、Word で開く、直すべき点を記録、調整して必要なら再変換——各サイクル数秒で、再アップロードは一度もありません。この引き締まったループこそが入念な校正を可能にし、文書の完全性を実際に守るのは変換ではなく、その入念な校正なのです。",
          ],
        },
      ],
    },
    es: {
      name: "PDF a Word",
      tagline:
        "Pasa el texto de un PDF a un documento de Word editable (.docx) en tu navegador: conversión centrada en el texto, gratis y sin subidas.",
      intro: [
        "Extrae las palabras de un PDF a un .docx editable en Word, Google Docs o LibreOffice. Los títulos se detectan por su tamaño de fuente, los párrafos se reconstruyen desde la posición de las líneas y el resultado es un documento limpio y ligero, listo para rehacer.",
        "Es una conversión honesta centrada en el texto: no reconstruye maquetaciones complejas, columnas ni colocación de imágenes. A cambio, privacidad total: el análisis y la generación del .docx ocurren por completo en tu dispositivo.",
      ],
      steps: [
        "Suelta un PDF con texto (uno cuyo texto puedas seleccionar).",
        "Pulsa Convertir a Word y espera un momento.",
        "Descarga el .docx y edítalo donde quieras.",
      ],
      faqs: [
        {
          q: "¿Por qué la maquetación difiere del PDF original?",
          a: "Es una conversión centrada en el texto: reconstruye párrafos y niveles de título en lugar de clonar la página píxel a píxel. Obtienes las mismas palabras en un flujo más limpio y editable, no una copia visual.",
        },
        {
          q: "Mi PDF es un escaneo y sale un documento vacío.",
          a: "Los PDF escaneados contienen imágenes del texto, no texto. Pásalo primero por nuestra herramienta de OCR y convierte el texto reconocido a Word.",
        },
        {
          q: "¿Sobreviven las tablas y las imágenes?",
          a: "Las imágenes no se llevan al .docx. Las tablas llegan como líneas de texto planas: sirven, pero conviene reconstruir las tablas complejas en Word.",
        },
      ],
      deepDive: [
        {
          heading: "El límite de fidelidad: qué sobrevive el viaje hasta Word",
          paragraphs: [
            "Un PDF describe apariencias finales; un documento Word describe estructura — párrafos, estilos, listas, encabezados. Convertir entre ambos es traducción, no descifrado, y toda conversión debe decidir cuánta estructura reconstruir a partir solo de la apariencia. Los conversores bien hechos reconstruyen límites de párrafo, niveles de encabezado a partir de tamaños de fuente y tablas a partir de texto alineado; los simples vuelcan líneas de texto en un único flujo.",
            "Lo que sobrevive bien en una buena conversión: texto corrido con saltos de párrafo, tablas simples, énfasis básico de negrita/cursiva, y orden de lectura en documentos típicos. Lo que rara vez sobrevive perfecto: las fuentes exactas (Word sustituye por la más cercana disponible), las maquetaciones a varias columnas (normalmente aplanadas a una), los encabezados y pies (pueden fundirse en el cuerpo o perderse), y todo lo interactivo como campos de formulario o anotaciones.",
            "La formulación más honesta: PDF-a-Word es excelente para recuperar prosa editable, suficientemente bueno para documentos de oficina típicos y estructuralmente incorrecto para páginas muy diseñadas — carteles, maquetaciones complejas de revista, formularios. Para esa última categoría, convertir te da un desastre editable; recrear la maquetación nativamente en Word suele ser más rápido que arreglar la conversión.",
          ],
        },
        {
          heading: "Escaneos, OCR y el flujo alrededor de la conversión",
          paragraphs: [
            "La mayor bifurcación en la calidad de PDF-a-Word es si el origen es digital o escaneado. Un PDF digital lleva su texto y convierte directamente. Un PDF escaneado lleva solo píxeles, así que la cadena es más larga: OCR para crear una capa de texto y luego reconstrucción en párrafos de Word — y los límites de precisión del OCR se aplican encima de los propios de la conversión. La escritura a mano, los sellos y las notas al margen degradan más el resultado.",
            "Expectativas prácticas por origen: un contrato nacido digital convierte a algo que puedes editar y finalizar con limpieza moderada. Un escaneo limpio de texto a 300 DPI convierte a algo editable pero que debes revisar línea a línea — los errores de OCR en contratos y nombres son justo los que no puedes permitirte. Una foto de página con mala luz convierte mal con cualquier herramienta; mejor re-escanear bien.",
            "Tras convertir cualquier documento importante, haz una lectura estructural en Word, no solo visual: revisa saltos de párrafo, numeración de listas y celdas de tabla, porque ahí es donde las conversiones erran en silencio mientras la página sigue pareciendo correcta.",
          ],
        },
        {
          heading: "Contratos e informes deberían convertir en local",
          paragraphs: [
            "Los documentos que la gente más quiere en forma editable de Word son los más vinculantes: contratos a renegociar, políticas a actualizar, informes a reutilizar, expedientes a anotar. Subir un PDF de contrato a un conversor significa que tu texto legal pasa por los servidores de un tercero — y la copia Word extraída, al ser aún más fácil de editar y redistribuir que el original, es justo el artefacto que menos quieres en el almacenamiento de otro.",
            "Esta herramienta hace toda la conversión en tu navegador: el PDF se analiza en local, la estructura de texto se reconstruye en tu dispositivo, y el archivo Word se genera y guarda localmente. No se transmite nada en ninguna dirección, y la conversión funciona completamente sin conexión — un contrato bajo NDA se convierte con la misma confianza que un menú.",
            "La conversión local también mantiene ajustado el bucle de revisión: convertir, abrir en Word, anotar lo que hay que corregir, ajustar y volver a convertir si hace falta — todo en segundos por ciclo y sin volver a subir nada jamás. Ese bucle ajustado es lo que hace viable la revisión cuidadosa, y la revisión cuidadosa — no la conversión en sí — es lo que de verdad protege la integridad del documento.",
          ],
        },
      ],
    },
    pt: {
      name: "PDF para Word",
      tagline:
        "Transforme o texto de um PDF em um documento Word editável (.docx) no navegador — conversão focada em texto, grátis e sem upload.",
      intro: [
        "Extraia as palavras de um PDF para um .docx editável no Word, Google Docs ou LibreOffice. Os títulos são detectados pelo tamanho da fonte, os parágrafos são reconstruídos pela posição das linhas e o resultado é um documento limpo e leve, pronto para retrabalhar.",
        "Esta é uma conversão honesta focada em texto: ela não reconstrói layouts complexos, colunas nem posicionamento de imagens. Em troca, privacidade total — a análise e a geração do .docx acontecem inteiramente no seu dispositivo.",
      ],
      steps: [
        "Solte um PDF com texto (um em que dê para selecionar o texto).",
        "Clique em Converter para Word e aguarde um instante.",
        "Baixe o .docx e edite em qualquer lugar.",
      ],
      faqs: [
        {
          q: "Por que o layout fica diferente do PDF original?",
          a: "É uma conversão focada em texto: ela reconstrói parágrafos e níveis de título em vez de clonar a página pixel a pixel. Você recebe as mesmas palavras num fluxo mais limpo e editável — não um clone visual.",
        },
        {
          q: "Meu PDF é digitalizado e gera um documento vazio.",
          a: "PDFs digitalizados contêm imagens do texto, não texto. Passe primeiro pela nossa ferramenta de OCR e converta o texto reconhecido para Word.",
        },
        {
          q: "Tabelas e imagens sobrevivem?",
          a: "Imagens não vão para o .docx. Tabelas chegam como linhas de texto simples — dá para usar, mas o ideal é reconstruir tabelas complexas no Word.",
        },
      ],
      deepDive: [
        {
          heading: "O limite de fidelidade: o que sobrevive à viagem até o Word",
          paragraphs: [
            "Um PDF descreve aparências finais; um documento Word descreve estrutura — parágrafos, estilos, listas, títulos. Converter entre os dois é tradução, não decifração, e toda conversão precisa decidir quanta estrutura reconstruir a partir só da aparência. Conversores bem feitos reconstroem quebras de parágrafo, níveis de título a partir de tamanhos de fonte e tabelas a partir de texto alinhado; os simples despejam linhas de texto num único fluxo.",
            "O que sobrevive bem numa boa conversão: texto corrido com quebras de parágrafo, tabelas simples, ênfase básica de negrito/itálico, e ordem de leitura em documentos típicos. O que raramente sobrevive perfeito: fontes exatas (o Word substitui pela mais próxima disponível), layouts de várias colunas (normalmente achatados para uma), cabeçalhos e rodapés (podem se fundir no corpo ou sumir), e tudo que é interativo como campos de formulário ou anotações.",
            "A formulação mais honesta: PDF-para-Word é excelente para recuperar prosa editável, bom o bastante para documentos de escritório típicos, e estruturalmente errado para páginas muito desenhadas — cartazes, layouts complexos de revista, formulários. Para essa última categoria, converter te dá uma bagunça editável; recriar o layout nativamente no Word costuma ser mais rápido que consertar a conversão.",
          ],
        },
        {
          heading: "Digitalizações, OCR e o fluxo ao redor da conversão",
          paragraphs: [
            "A maior bifurcação na qualidade de PDF-para-Word é se a origem é digital ou digitalizada. Um PDF digital carrega seu texto e converte direto. Um PDF digitalizado carrega só pixels, então a corrente é mais longa: OCR para criar uma camada de texto e depois reconstrução em parágrafos do Word — e os limites de precisão do OCR se aplicam por cima dos da própria conversão. Escrita à mão, carimbos e anotações à margem degradam mais o resultado.",
            "Expectativas práticas por origem: um contrato nascido digital converte para algo que você edita e finaliza com limpeza moderada. Uma digitalização limpa de texto datilografado a 300 DPI converte para algo editável mas que você deve revisar linha a linha — erros de OCR em contratos e nomes são exatamente os que você não pode permitir. Uma foto de página com má luz converte mal com qualquer ferramenta; melhor redigitalizar direito.",
            "Depois de converter qualquer documento importante, faça uma leitura estrutural no Word, não só visual: confira quebras de parágrafo, numeração de listas e células de tabela, porque é aí que as conversões erram em silêncio enquanto a página continua parecendo certa.",
          ],
        },
        {
          heading: "Contratos e relatórios devem converter localmente",
          paragraphs: [
            "Os documentos que as pessoas mais querem em forma editável de Word são os mais vinculantes: contratos a renegociar, políticas a atualizar, relatórios a reutilizar, históricos a anotar. Enviar um PDF de contrato a um conversor significa que seu texto jurídico passa pelos servidores de um terceiro — e a cópia Word extraída, por ser ainda mais fácil de editar e redistribuir que o original, é exatamente o artefato que você menos quer no armazenamento de outra pessoa.",
            "Esta ferramenta faz toda a conversão no seu navegador: o PDF é analisado localmente, a estrutura de texto é reconstruída no seu dispositivo, e o arquivo Word é gerado e salvo localmente. Nada é transmitido em nenhuma direção, e a conversão funciona totalmente offline — um contrato sob NDA se converte com a mesma confiança que um cardápio.",
            "A conversão local também mantém o ciclo de revisão apertado: converter, abrir no Word, anotar o que precisa corrigir, ajustar e converter de novo se precisar — tudo em segundos por ciclo e sem nunca reenviar nada. Esse ciclo apertado é o que torna viável a revisão cuidadosa, e a revisão cuidadosa — não a conversão em si — é o que realmente protege a integridade do documento.",
          ],
        },
      ],
    },
  },
});
