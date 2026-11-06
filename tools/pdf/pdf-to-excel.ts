import { PdfOfficeEngine } from "../_engines/pdf-engine-office";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "pdf-to-excel",
  category: "pdf",
  icon: "calc",
  engine: { component: PdfOfficeEngine, props: { target: "xlsx" } },
  related: ["pdf-to-word", "pdf-to-text", "ocr-pdf", "merge-pdf", "split-pdf", "delete-pdf-pages", "pdf-to-ppt", "compress-pdf", "rotate-pdf", "rearrange-pdf-pages"],
  copy: {
    en: {
      name: "PDF to Excel",
      tagline:
        "Extract the rows and columns of a PDF into an editable Excel spreadsheet (.xlsx) — row-by-row conversion in your browser, free.",
      intro: [
        "Bank statements, price lists and reports locked in PDF become workable data again: each visual line becomes a spreadsheet row, and text split by wide spacing is separated into columns automatically. Page numbers are kept in the first column so you can trace everything back.",
        "This is a practical, text-based extraction — not an AI table reconstruction. It shines on monospaced statements and aligned lists; messy multi-line tables may need a quick cleanup in Excel. The trade: your data never leaves the device.",
      
        "The extractor walks pdf.js's text items per page, groups them into lines by Y-position, then splits each line into columns where the horizontal gap exceeds a threshold — a heuristic that works well on monospaced statements and aligned columns. Page numbers land in column A so every row is traceable to its source page.",
        "Compared with online PDF-to-Excel services that upload your statements, the extraction happens locally — a bank statement never leaves the device. The trade-off is honest: this is positional text splitting, not table reconstruction, so a clean aligned statement converts beautifully while a complex multi-line table may need a cleanup pass in Excel itself.",
      ],
      steps: [
        "Drop a text-based PDF (selectable text, not a photo scan).",
        "Click Convert to Excel.",
        "Download the .xlsx and tidy up any merged rows in Excel.",
      ],
      faqs: [
        {
          q: "How are columns detected?",
          a: "Lines are split into cells wherever two or more spaces appear — the usual alignment cue in PDF text. Well-aligned tables convert cleanly; prose turns into one cell per line.",
        },
        {
          q: "My scanned statement gives an empty sheet.",
          a: "Scans have no text layer. Run the file through our OCR tool first, then paste the recognized text into Excel, or convert the OCR output here.",
        },
        {
          q: "Can numbers keep their formatting?",
          a: "Values land as text exactly as printed, preserving leading zeros and regional decimal commas — Excel treats them as strings until you convert the column.",
        },
      ],
      deepDive: [
        {
          heading: "Why PDF-to-Excel is the hardest conversion, honestly explained",
          paragraphs: [
            "Word documents have paragraphs; spreadsheets have grids; a PDF has neither — it has placed glyphs at coordinates. When a PDF looks like a table, that appearance is an illusion assembled from individual characters positioned to line up. Converting to Excel means reverse-engineering the grid: which characters form a cell, where the columns begin and end, and which rows belong together. There is no metadata in the PDF that answers those questions reliably.",
            "This is why PDF-to-Excel tools differ wildly in quality, and why every honest one warns about it. Clean, digitally-generated PDFs with regular tables extract well; scanned tables, merged cells, nested headers and multi-page tables with repeated headers are where results drift. Numbers may land in the wrong column, and a shifted row in a financial table is worse than a failed conversion because it fails silently.",
            "Practical expectations: treat the output as a first-draft reconstruction, not a certified export. Spot-check totals and a few sample rows against the source. If the PDF was produced from Excel originally (no scan marks, crisp text), the reverse extraction is usually close. If it is a scan, run OCR first and expect manual correction.",
          ],
        },
        {
          heading: "Reading the output: what to check before you trust it",
          paragraphs: [
            "Three checks catch most extraction errors. First, row and column counts: the sheet should have the same number of body rows and columns as the source table — off-by-one errors usually mean a header was swallowed or a wrapped cell became two rows. Second, number integrity: check that figures like 1,234.56 kept their decimal separator and didn't become text (left-aligned \"numbers\" in Excel are usually strings).",
            "Third, alignment of totals: if the source table sums a column, verify the extracted column still sums to the same figure. A single mis-placed cell breaks the audit trail in a way that is easy to miss visually but fatal in use. For multi-page tables, check whether the header repeated on each page became duplicated rows in the sheet — most tools export them literally.",
            "Merged cells are the eternal troublemaker: a vertical merge (one label spanning several rows) usually becomes a value in the first row and blanks below. If downstream formulas need the label repeated, fill-down in Excel takes a second and saves an hour of confusion.",
          ],
        },
        {
          heading: "Financial tables deserve local processing",
          paragraphs: [
            "The tables people convert to Excel are disproportionately financial: bank statements, invoices, payroll runs, tax worksheets. That is precisely the data you should not upload — an extracted bank statement is a complete transaction history in machine-readable form, and uploading it to a converter grants that history to an unknown third party with a copy in their logs.",
            "This tool parses and reconstructs the tables entirely in your browser: the PDF is read locally, cell boundaries are inferred on your device, and the workbook is generated and saved locally. No page of your statement is transmitted anywhere, and no extracted figures leave your machine — the conversion works identically offline.",
            "Given the manual-review step recommended above, local processing also makes iteration free: convert, inspect, adjust and re-convert as often as needed without re-uploading anything. The workflow that produces trustworthy spreadsheets — convert, verify, correct — is only pleasant when each cycle costs seconds instead of an upload round-trip.",
          ],
        },
      ],
    },
    zh: {
      name: "PDF 转 Excel",
      tagline: "把 PDF 中的行列提取成可编辑的 Excel 表格(.xlsx)——逐行转换,浏览器本地完成,免费。",
      intro: [
        "锁在 PDF 里的银行流水、价目表和报告重新变成可处理的数据:每个视觉行变成一行,按宽间距分隔的文字自动拆成多列。第一列保留页码,方便回溯核对。",
        "这是实用的文本提取,不是 AI 表格还原。对等宽字体流水和对齐列表效果最好;凌乱的多行表格可能需要在 Excel 里简单整理。换来的是:数据永远不离开你的设备。",
      ],
      steps: [
        "拖入文本型 PDF(文字可选中,而非照片扫描件)。",
        "点击“转换为 Excel”。",
        "下载 .xlsx,在 Excel 里整理需要合并的行。",
      ],
      faqs: [
        {
          q: "列是怎么识别的?",
          a: "凡是出现两个及以上连续空格的位置就会拆分为单元格——这是 PDF 文本里常见的对齐特征。对齐良好的表格转换得很干净;普通文章则每行一个单元格。",
        },
        {
          q: "扫描的流水单导出是空表?",
          a: "扫描件没有文本层。先用我们的 OCR 工具识别,再把识别文本粘进 Excel,或在这里继续转换 OCR 输出。",
        },
        {
          q: "数字格式会保留吗?",
          a: "数值按打印原样作为文本导入,保留前导零和小数逗号等写法——在 Excel 里它们是字符串,需要时再转换列格式。",
        },
      ],
      deepDive: [
        {
          heading: "为什么 PDF 转 Excel 是最难的转换,如实说",
          paragraphs: [
            "Word 文档有段落,表格软件有网格,而 PDF 两者都没有——它只有摆在坐标上的字符。当一份 PDF 看起来像表格,那其实是幻觉:无数单个字符被摆放到恰好对齐的位置。转 Excel 意味着逆向还原网格:哪些字符构成一个单元格、列从哪开始到哪结束、哪些行属于一组。PDF 里没有任何元数据能可靠回答这些问题。",
            "这就是为什么各家的 PDF 转 Excel 质量天差地别,也是为什么诚实的工具都会提醒。干净的、数字生成的、表格规整的 PDF 提取效果好;扫描的表格、合并单元格、嵌套表头、每页重复表头的跨页表格,是结果漂移的地方。数字可能落错列,而财务表里错一行比转换失败更糟——因为它静默地错。",
            "合理的预期:把输出当第一稿重建,而不是认证导出。对照原件抽查合计数和几行样本。如果 PDF 本来就是从 Excel 生成的(没有扫描痕迹、文字锐利),逆向提取通常很接近;如果是扫描件,先做 OCR,并做好手工修正的准备。",
          ],
        },
        {
          heading: "读输出:信任之前查什么",
          paragraphs: [
            "三查能抓住大部分提取错误。第一,行列数:工作表的正文行列数应与源表一致——差一错误通常意味着表头被吞掉,或一个换行单元格变成了两行。第二,数字完整性:确认 1,234.56 这类数值保住了小数分隔符,没有变成文本(Excel 里左对齐的“数字”多半是字符串)。",
            "第三,合计对齐:源表对某列求和的,验证提取出的列求和是否还是同一个数。一个错位单元格会破坏审计链条,视觉上容易漏看,用起来却是致命的。跨页表格还要检查每页重复的表头是否在表里变成了重复行——多数工具会照字面导出。",
            "合并单元格是永远的麻烦源:纵向合并(一个标签跨几行)通常变成首行有值、下面空白。如果下游公式需要标签重复出现,在 Excel 里向下填充只要一秒,省掉一小时的困惑。",
          ],
        },
        {
          heading: "财务表格值得本地处理",
          paragraphs: [
            "人们转成 Excel 的表格,财务类比例高得不成比例:银行对账单、发票、工资单、报税底稿。这正是最不该上传的数据——一份被提取的对账单就是机器可读的完整交易历史,上传给转换器等于把这段历史连同日志副本一起交给一个未知第三方。",
            "本工具完全在浏览器里解析和重建表格:PDF 本地读取,单元格边界在你设备上推断,工作簿在本地生成和保存。对账单没有任何一页被传输,提取的任何数字不离开你的机器——离线时转换照常工作。",
            "考虑到上面建议的人工复核步骤,本地处理还让迭代零成本:转换、检查、调整、再转换,随意多少轮,不用重新上传任何东西。能产出可信表格的工作流——转换、验证、修正——只有每轮只花几秒、不用等一次上传往返时,才是愉快的。",
          ],
        },
      ],
    },
    ja: {
      name: "PDF を Excel に変換",
      tagline: "PDF の行と列を編集可能な Excel 表(.xlsx)に抽出。行単位の変換をブラウザ内で無料で実行します。",
      intro: [
        "PDF に閉じ込められた明細書・価格表・報告書を、扱えるデータに戻します。見た目の 1 行が表の 1 行になり、広い空白で区切られた文字は自動的に列へ分割されます。先頭列にはページ番号が残るので、元の位置をたどれます。",
        "実用的なテキスト抽出であり、AI による表の再構成ではありません。等幅の明細や整列したリストに最も効果を発揮し、乱れた複数行の表は Excel での微調整が必要なことも。その代わり、データが端末から出ることはありません。",
      ],
      steps: [
        "テキストベースの PDF(文字を選択できるもの)をドロップします。",
        "「Excel に変換」をクリックします。",
        ".xlsx をダウンロードし、必要なら Excel で整えます。",
      ],
      faqs: [
        {
          q: "列はどう検出されますか?",
          a: "2 つ以上の連続した空白がある位置でセルに分割します。これは PDF テキストで一般的な整列の合図です。整った表はきれいに変換され、文章は 1 行 1 セルになります。",
        },
        {
          q: "スキャンした明細から空の表が出ます。",
          a: "スキャンにはテキスト層がありません。まず OCR ツールで認識し、そのテキストを Excel に貼るか、ここで OCR 出力を変換してください。",
        },
        {
          q: "数値の書式は保持されますか?",
          a: "値は印刷どおり文字列として取り込まれ、先頭の 0 や小数点コンマもそのままです。Excel では文字列扱いなので、必要に応じて列を変換してください。",
        },
      ],
      deepDive: [
        {
          heading: "PDF から Excel へが最も難しい変換である理由、正直に",
          paragraphs: [
            "Word 文書には段落があり、表計算には格子があります。PDF にはどちらもありません。あるのは座標に置かれた文字だけです。PDF が表に見えるとき、それは幻想です。個々の文字がちょうど揃う位置に置かれているだけです。Excel への変換は格子の逆向き復元です。どの文字が一つのセルを作るか、列がどこからどこまでか、どの行が一组か。PDF にはこれに確実に答えるメタデータが存在しません。",
            "だから PDF から Excel へのツールは品質が大きく違いますし、正直なツールはみな警告します。きれいに生成されたデジタル PDF の整った表はうまく抽出できます。走査された表、結合セル、入れ子の見出し、各ページで見出しを繰り返す複数ページの表は、結果がずれる場所です。数字が列を間違えて着地することがあり、財務表で一行ずれるのは変換の失敗より悪い——静かに間違うからです。",
            "現実的な期待値:出力を認証済みの書き出しではなく、初稿の再構成として扱うこと。合計といくつかのサンプル行を原表と突き合わせてください。PDF が元々 Excel から作られていたものなら(走査の痕跡がなく文字が鋭い)、逆向きの抽出は通常かなり近い。走査なら先に OCR をかけ、手直しを覚悟してください。",
          ],
        },
        {
          heading: "出力の読み方:信頼する前に確かめること",
          paragraphs: [
            "三つの点検で大半の抽出誤りを捉えられます。第一に行列数。シートの本体の行列数は原表と一致するはずで、一つずれは通常、見出しが呑まれたか、折り返しセルが二行になったことを意味します。第二に数値の完全性。1,234.56 のような数値が小数点区切りを保ち、テキストになっていないか(Excel で左揃えの「数字」はたいてい文字列です)。",
            "第三に合計の整合。原表がある列を合計しているなら、抽出後の列が同じ値に合計されるか確かめます。一つのセルのずれは、目視では見落としやすいのに実用では致命的な、監査の連鎖を壊します。複数ページの表では、各ページで繰り返された見出しがシート内で重複行になっていないかも確認してください。多くのツールは文字通りに書き出します。",
            "結合セルは永遠の厄介者です。縦の結合(一つのラベルが数行にまたがる)は通常、一行目に値、下は空白になります。下流の数式がラベルの反復を必要とするなら、Excel での下方向フィルは一秒で済み、一時間の混乱を省きます。",
          ],
        },
        {
          heading: "財務の表こそローカル処理に値する",
          paragraphs: [
            "Excel に変換される表は、財務系に偏っています。銀行明細、請求書、給与計算、税務ワークシート。まさにアップロードすべきでないデータです。抽出された明細は機械可読の完全な取引履歴であり、変換器へアップロードすることは、その履歴をログのコピーごと未知の第三者へ渡すことです。",
            "このツールは表の解析と再構成を完全にブラウザ内で行います。PDF はローカルで読み込まれ、セルの境界は端末上で推定され、ワークブックはローカルで生成・保存されます。明細のどのページもどこにも送信されず、抽出された数値は端末の外に出ません。オフラインでも変換は同じように動きます。",
            "上述の手作業での検証ステップを踏まえると、ローカル処理は反復も無料にします。変換、点検、調整、再変換を必要なだけ、再アップロードなしで。信頼できるスプレッドシートを生むワークフロー——変換、検証、修正——は、各サイクルがアップロード往復ではなく数秒で済むときにだけ心地よいものです。",
          ],
        },
      ],
    },
    es: {
      name: "PDF a Excel",
      tagline:
        "Extrae las filas y columnas de un PDF a una hoja de cálculo editable (.xlsx): conversión fila a fila en tu navegador, gratis.",
      intro: [
        "Extractos bancarios, listas de precios e informes atrapados en un PDF vuelven a ser datos manejables: cada línea visual se convierte en una fila y el texto separado por espacios anchos se reparte en columnas automáticamente. La primera columna guarda el número de página para poder rastrearlo todo.",
        "Es una extracción práctica basada en texto, no una reconstrucción de tablas con IA. Brilla en extractos monoespaciados y listas alineadas; las tablas multilínea caóticas pueden requerir un repaso en Excel. A cambio, tus datos nunca salen del dispositivo.",
      ],
      steps: [
        "Suelta un PDF con texto (seleccionable, no un escaneo).",
        "Pulsa Convertir a Excel.",
        "Descarga el .xlsx y arregla en Excel las filas que lo necesiten.",
      ],
      faqs: [
        {
          q: "¿Cómo se detectan las columnas?",
          a: "Las líneas se dividen en celdas donde aparecen dos o más espacios seguidos, la pista habitual de alineación en el texto PDF. Las tablas bien alineadas se convierten limpias; la prosa queda como una celda por línea.",
        },
        {
          q: "Mi extracto escaneado da una hoja vacía.",
          a: "Los escaneos no tienen capa de texto. Pasa el archivo primero por nuestra herramienta de OCR y pega el texto reconocido en Excel, o convierte aquí la salida del OCR.",
        },
        {
          q: "¿Los números conservan su formato?",
          a: "Los valores llegan como texto tal y como están impresos, conservando ceros a la izquierda y comas decimales. Excel los trata como cadenas hasta que conviertas la columna.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué PDF-a-Excel es la conversión más difícil, explicado con honestidad",
          paragraphs: [
            "Los documentos de Word tienen párrafos; las hojas de cálculo tienen rejillas; un PDF no tiene ninguna de las dos — tiene glifos colocados en coordenadas. Cuando un PDF parece una tabla, esa apariencia es una ilusión montada con caracteres individuales posicionados para alinearse. Convertir a Excel significa hacer ingeniería inversa de la rejilla: qué caracteres forman una celda, dónde empiezan y terminan las columnas, qué filas van juntas. No hay metadatos en el PDF que respondan eso con fiabilidad.",
            "Por eso las herramientas de PDF a Excel difieren salvajemente en calidad, y por eso toda una honesta advierte de ello. Los PDFs limpios, generados digitalmente, con tablas regulares se extraen bien; las tablas escaneadas, las celdas combinadas, los encabezados anidados y las tablas multipágina con encabezado repetido son donde los resultados se desvían. Los números pueden caer en la columna equivocada, y una fila desplazada en una tabla financiera es peor que una conversión fallida porque falla en silencio.",
            "Expectativas prácticas: trata la salida como una reconstrucción de primer borrador, no como una exportación certificada. Comprueba totales y unas filas de muestra contra el original. Si el PDF se produjo originalmente desde Excel (sin marcas de escaneo, texto nítido), la extracción inversa suele ser cercana. Si es un escaneo, pasa primero OCR y espera corrección manual.",
          ],
        },
        {
          heading: "Leer la salida: qué comprobar antes de fiarte",
          paragraphs: [
            "Tres comprobaciones atrapan la mayoría de los errores de extracción. Primero, conteo de filas y columnas: la hoja debería tener las mismas filas y columnas de cuerpo que la tabla original — un error de uno en menos suele significar que un encabezado fue tragado o que una celda con salto de línea se volvió dos filas. Segundo, integridad numérica: verifica que cifras como 1.234,56 conservaron su separador decimal y no se volvieron texto (los \"números\" alineados a la izquierda en Excel suelen ser cadenas).",
            "Tercero, alineación de totales: si la tabla original suma una columna, verifica que la columna extraída siga sumando la misma cifra. Una sola celda mal colocada rompe la pista de auditoría de forma fácil de pasar por alto visualmente pero fatal en el uso. En tablas multipágina, comprueba si el encabezado repetido en cada página se volvió filas duplicadas en la hoja — la mayoría de las herramientas los exporta literalmente.",
            "Las celdas combinadas son el eterno_problemático: una combinación vertical (una etiqueta que abarca varias filas) suele convertirse en un valor en la primera fila y vacíos debajo. Si las fórmulas aguas abajo necesitan la etiqueta repetida, rellenar hacia abajo en Excel toma un segundo y ahorra una hora de confusión.",
          ],
        },
        {
          heading: "Las tablas financieras merecen procesamiento local",
          paragraphs: [
            "Las tablas que la gente convierte a Excel son desproporcionadamente financieras: extractos bancarios, facturas, nóminas, hojas de trabajo fiscal. Eso es exactamente lo que no deberías subir — un extracto extraído es un historial completo de transacciones en forma legible por máquina, y subirlo a un conversor entrega ese historial a un tercero desconocido con una copia en sus registros.",
            "Esta herramienta analiza y reconstruye las tablas por completo en tu navegador: el PDF se lee en local, los límites de celda se infieren en tu dispositivo y el libro se genera y guarda localmente. Ninguna página de tu extracto se transmite a ninguna parte, y ninguna cifra extraída sale de tu máquina — la conversión funciona igual sin conexión.",
            "Dado el paso de revisión manual recomendado arriba, el procesamiento local también hace la iteración gratuita: convierte, inspecciona, ajusta y vuelve a convertir cuantas veces haga falta sin volver a subir nada. El flujo que produce hojas de cálculo confiables — convertir, verificar, corregir — solo es agradable cuando cada ciclo cuesta segundos en vez de un viaje de subida.",
          ],
        },
      ],
    },
    pt: {
      name: "PDF para Excel",
      tagline:
        "Extraia as linhas e colunas de um PDF para uma planilha editável (.xlsx) — conversão linha a linha no navegador, de graça.",
      intro: [
        "Extratos bancários, tabelas de preços e relatórios presos em um PDF voltam a ser dados utilizáveis: cada linha visual vira uma linha da planilha e o texto separado por espaços largos é dividido em colunas automaticamente. A primeira coluna guarda o número da página para rastrear tudo.",
        "Esta é uma extração prática baseada em texto — não uma reconstrução de tabelas com IA. Funciona muito bem em extratos monoespaçados e listas alinhadas; tabelas bagunçadas de várias linhas podem precisar de um ajuste no Excel. Em troca, seus dados nunca saem do dispositivo.",
      ],
      steps: [
        "Solte um PDF com texto (selecionável, não uma digitalização).",
        "Clique em Converter para Excel.",
        "Baixe o .xlsx e organize no Excel as linhas que precisarem.",
      ],
      faqs: [
        {
          q: "Como as colunas são detectadas?",
          a: "As linhas são divididas em células onde aparecem dois ou mais espaços seguidos — o sinal clássico de alinhamento no texto de PDFs. Tabelas bem alinhadas convertem limpas; prosa vira uma célula por linha.",
        },
        {
          q: "Meu extrato digitalizado gera uma planilha vazia.",
          a: "Digitalizações não têm camada de texto. Passe o arquivo primeiro pela nossa ferramenta de OCR e cole o texto reconhecido no Excel, ou converta aqui a saída do OCR.",
        },
        {
          q: "Os números mantêm a formatação?",
          a: "Os valores chegam como texto exatamente como impressos, preservando zeros à esquerda e vírgulas decimais. O Excel os trata como texto até você converter a coluna.",
        },
      ],
      deepDive: [
        {
          heading: "Por que PDF-para-Excel é a conversão mais difícil, explicado com honestidade",
          paragraphs: [
            "Documentos de Word têm parágrafos; planilhas têm grades; um PDF não tem nenhuma das duas — tem glifos posicionados em coordenadas. Quando um PDF parece uma tabela, essa aparência é uma ilusão montada com caracteres individuais posicionados para alinhar. Converter para Excel significa fazer engenharia reversa da grade: quais caracteres formam uma célula, onde as colunas começam e terminam, quais linhas pertencem juntas. Não há metadado no PDF que responda isso com confiabilidade.",
            "Por isso as ferramentas de PDF para Excel diferem enormemente em qualidade, e por isso toda uma honesta avisa sobre isso. PDFs limpos, gerados digitalmente, com tabelas regulares extraem bem; tabelas digitalizadas, células mescladas, cabeçalhos aninhados e tabelas multipágina com cabeçalho repetido são onde os resultados desviam. Números podem cair na coluna errada, e uma linha deslocada numa tabela financeira é pior que uma conversão falha porque falha em silêncio.",
            "Expectativa prática: trate a saída como uma reconstrução de primeiro rascunho, não como exportação certificada. Confira totais e algumas linhas de amostra contra a origem. Se o PDF foi produzido originalmente do Excel (sem marcas de scan, texto nítido), a extração reversa costuma ser próxima. Se é uma digitalização, rode OCR primeiro e espere correção manual.",
          ],
        },
        {
          heading: "Lendo a saída: o que conferir antes de confiar",
          paragraphs: [
            "Três verificações pegam a maioria dos erros de extração. Primeiro, contagem de linhas e colunas: a planilha deve ter as mesmas linhas e colunas de corpo da tabela original — erro de uma unidade costuma significar que um cabeçalho foi engolido ou que uma célula com quebra virou duas linhas. Segundo, integridade numérica: verifique que valores como 1.234,56 mantiveram o separador decimal e não viraram texto (\"números\" alinhados à esquerda no Excel costumam ser strings).",
            "Terceiro, alinhamento de totais: se a tabela original soma uma coluna, verifique que a coluna extraída ainda soma o mesmo valor. Uma única célula fora do lugar quebra a trilha de auditoria de um jeito fácil de não ver a olho mas fatal no uso. Em tabelas multipágina, confira se o cabeçalho repetido em cada página virou linhas duplicadas na planilha — a maioria das ferramentas exporta literalmente.",
            "Células mescladas são o eterno incômodo: uma mesclagem vertical (um rótulo atravessando várias linhas) costuma virar um valor na primeira linha e vazios embaixo. Se as fórmulas de jusante precisam do rótulo repetido, preencher para baixo no Excel leva um segundo e economiza uma hora de confusão.",
          ],
        },
        {
          heading: "Tabelas financeiras merecem processamento local",
          paragraphs: [
            "As tabelas que as pessoas convertem para Excel são desproporcionalmente financeiras: extratos bancários, notas fiscais, folhas de pagamento, planilhas de imposto. Isso é exatamente o que você não deve enviar — um extrato extraído é um histórico completo de transações em forma legível por máquina, e enviá-lo a um conversor entrega esse histórico a um terceiro desconhecido com uma cópia nos registros dele.",
            "Esta ferramenta analisa e reconstrói as tabelas inteiramente no seu navegador: o PDF é lido localmente, os limites de célula são inferidos no seu dispositivo e a pasta de trabalho é gerada e salva localmente. Nenhuma página do seu extrato é transmitida a lugar nenhum, e nenhum valor extraído sai da sua máquina — a conversão funciona igual offline.",
            "Dado o passo de revisão manual recomendado acima, o processamento local também torna a iteração grátis: converta, inspecione, ajuste e reconverta quantas vezes precisar sem reenviar nada. O fluxo que produz planilhas confiáveis — converter, verificar, corrigir — só é agradável quando cada ciclo custa segundos em vez de uma ida e volta de envio.",
          ],
        },
      ],
    },
  },
});
