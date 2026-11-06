import { PdfOfficeEngine } from "../_engines/pdf-engine-office";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "word-to-pdf",
  category: "pdf",
  icon: "file",
  engine: { component: PdfOfficeEngine, props: { target: "fromdocx" } },
  related: ["pdf-to-word", "merge-pdf", "watermark-pdf", "compress-pdf", "sign-pdf", "split-pdf", "delete-pdf-pages", "pdf-to-ppt", "ocr-pdf", "rotate-pdf"],
  copy: {
    en: {
      name: "Word to PDF",
      tagline:
        "Convert Word .docx documents to PDF in your browser — text-focused typesetting with headings and bold, nothing ever uploaded.",
      intro: [
        "Turn a .docx into a clean, shareable PDF: paragraphs, headings and bold runs are re-typeset onto A4 pages with proper margins, so the output looks tidy even without Word installed. Reading, printing and sending become friction-free.",
        "This is an honest text-focused conversion, not a pixel clone of Word's layout: images, tables and page decorations from the original are not carried over. What you get is your document's text in a reliable, universally readable PDF — generated entirely on your device.",
      
        "Conversion parses the .docx XML directly: paragraphs, headings, bold/italic runs and lists are mapped onto pdf-lib text layout at a readable 11 pt with A4 margins. The output is a real PDF with selectable text — not a screenshot of the document — so printing, searching and copying work exactly as a native PDF should.",
        "Compared with opening in Word and saving as PDF (which requires Word installed and licensed), this handles the file with no dependencies. The honest scope: this is a text-focused re-typeset, so images, tables and exact Word layout do not carry over — for pixel-identical conversion, the dedicated Office tooling is the right path.",
      ],
      steps: [
        "Drop a .docx file (Word 2007 and newer).",
        "Click Convert to PDF.",
        "Download the typeset PDF.",
      ],
      faqs: [
        {
          q: "Why does my PDF look different from Word?",
          a: "This tool re-typesets the text with its own clean layout rather than emulating Word's engine. Fonts, spacing and images in the original are not reproduced — the words, headings and emphasis are.",
        },
        {
          q: "Are images and tables included?",
          a: "No, text only — including headings and bold. For documents where visuals matter, export the PDF from Word itself and use this tool for text-first drafts and notes.",
        },
        {
          q: "Does it support old .doc files or non-Latin text?",
          a: "Only .docx is supported. Text uses the PDF standard fonts, so Latin-based languages render correctly while other scripts (Chinese, Arabic…) are replaced with ? for now.",
        },
      ],
      deepDive: [
        {
          heading: "Why Word-to-PDF is usually the reliable direction",
          paragraphs: [
            "Conversion between Word and PDF is asymmetric, and Word-to-PDF is the easy direction. A Word document has all the structure a renderer needs — text, styles, tables, images, page layout — and producing a PDF is simply rendering that structure into the page-description format. There is no guessing involved: what you see in Word is what gets drawn.",
            "This is why the output of a good Word-to-PDF conversion is faithful by construction: fonts, spacing, tables and page breaks land as intended, and the PDF freezes them so any viewer on any device shows the same thing. That freeze is the entire point of the format — a contract that looks identical on your laptop, the recipient's phone and the print shop's RIP.",
            "The reliability asymmetry matters for planning work: convert Word-to-PDF at the last moment, when the document is final, and never plan to convert back to Word for further editing. PDF-to-Word is reconstruction (and lossy of structure); the .docx file itself is the master copy to keep.",
          ],
        },
        {
          heading: "Fonts, fields and the pre-conversion checklist",
          paragraphs: [
            "Fonts are the classic Word-to-PDF pitfall. If the document uses a font not installed on the converting machine, the renderer substitutes a similar one and spacing shifts subtly — a signature line can drift, a table can wrap differently. Good conversion embeds the fonts it renders, so the output is self-contained; but the right font has to be present at conversion time. Converting on the machine where the document was authored is the safe default.",
            "Check the live parts before converting: table of contents fields, page-number references and cross-references should be updated (Ctrl+A then F9 in Word) so the PDF carries final numbers, not stale ones. Also check whether the document contains comments or tracked changes — whether those appear in the PDF depends on the renderer, and sending a PDF with visible markup to a counterparty is a classic disclosure accident.",
            "One more habit: after converting, compare page counts and glance at the first and last pages. If the PDF has one page more or less than Word shows, something reflowed — usually a font substitution — and it is worth finding before sending rather than after.",
          ],
        },
        {
          heading: "Final documents should be finalized locally",
          paragraphs: [
            "Word-to-PDF is the step that produces a document's official form: the resume to submit, the invoice to send, the thesis to deposit, the contract to sign. These final artifacts are the ones most worth protecting, and they are also the ones most commonly uploaded to conversion sites — meaning the near-final version of your resume or contract sits on a stranger's server before you ever send it to its real recipient.",
            "This tool renders the conversion entirely in your browser: the document structure is processed on your device, the PDF is generated in memory, and the output is saved locally. Nothing is uploaded at any stage — the final version of your document exists in exactly two places: your original .docx and the PDF you produced, both on your machine.",
            "Local conversion also makes version discipline practical: because each conversion costs seconds, you can regenerate the PDF after every edit instead of maintaining a stale one — the PDF always matches the latest .docx. That habit eliminates the classic \"which version did I send?\" problem entirely, and it only works when converting is free of upload friction.",
          ],
        },
      ],
    },
    zh: {
      name: "Word 转 PDF",
      tagline: "在浏览器里把 Word .docx 文档转成 PDF——带标题和加粗的文本排版,文件不上传到任何地方。",
      intro: [
        "把 .docx 变成干净易分享的 PDF:段落、标题和加粗文本按合适页边距重新排版到 A4 页面上,输出整齐,对方没装 Word 也能看。阅读、打印、发送都顺畅。",
        "这是诚实的文本导向转换,不是 Word 版面的像素级复刻:原文档的图片、表格和页面装饰不会带入。你得到的是文档文字在可靠、通用可读的 PDF 中的呈现——完全在你的设备上生成。",
      ],
      steps: [
        "拖入 .docx 文件(Word 2007 及以后版本)。",
        "点击“转换为 PDF”。",
        "下载排版后的 PDF。",
      ],
      faqs: [
        {
          q: "为什么 PDF 看起来和 Word 里不一样?",
          a: "本工具用自己的干净排版重新排布文字,而不是模拟 Word 的排版引擎。原文件的字体、间距和图片不会复现,但文字内容、标题层级和加粗都会保留。",
        },
        {
          q: "图片和表格会包含吗?",
          a: "不会,只处理文字(含标题和加粗)。视觉效果重要的文档请从 Word 直接导出 PDF;本工具适合以文字为主的草稿和笔记。",
        },
        {
          q: "支持老版 .doc 或非拉丁文字吗?",
          a: "仅支持 .docx。文字使用 PDF 标准字体,拉丁语系显示正常;中文、阿拉伯文等其他文字目前会被替换为 ? 。",
        },
      ],
      deepDive: [
        {
          heading: "为什么 Word 转 PDF 通常是可靠的方向",
          paragraphs: [
            "Word 和 PDF 互转是不对称的,而 Word 转 PDF 是容易的方向。Word 文档拥有渲染器需要的全部结构——文字、样式、表格、图片、页面布局——产出 PDF 只是把这套结构渲染进页面描述格式。不需要猜测:你在 Word 里看到什么,画出来的就是什么。",
            "所以好的 Word 转 PDF 在构造上就是忠实的:字体、间距、表格、分页如预期落位,PDF 把它们冻结,任何设备上的任何阅读器都显示同样的东西。这种冻结正是这个格式的全部意义——一份合同,在你的笔记本、对方的手机和打印店的输出端看起来一模一样。",
            "可靠性不对称对工作规划很重要:文档定稿时才做 Word 转 PDF,而且永远不要计划转回 Word 继续编辑。PDF 转 Word 是重建(结构上有损);.docx 源文件才是要保留的主副本。",
          ],
        },
        {
          heading: "字体、域与转换前检查单",
          paragraphs: [
            "字体是 Word 转 PDF 的经典坑。如果文档用的字体在转换机器上没装,渲染器会换成相似字体,间距悄悄变化——签名线可能漂移,表格可能换行不同。好的转换会嵌入它渲染的字体,输出自足;但转换时刻正确的字体必须在场。在撰写文档的那台机器上转换,是安全的默认。",
            "转换前检查动态部分:目录域、页码引用和交叉引用应该先更新(Word 里 Ctrl+A 再 F9),让 PDF 带上最终数字而不是旧数字。还要检查文档是否含批注或修订记录——它们是否出现在 PDF 里取决于渲染器,把带可见标记的 PDF 发给对方是经典的泄露事故。",
            "再一个习惯:转换后对比页数,并瞄一眼首页和末页。如果 PDF 比 Word 显示的多一页或少一页,说明有东西重排了——通常是字体替换——值得在发送前而不是发送后发现。",
          ],
        },
        {
          heading: "正式文档应该在本地定稿",
          paragraphs: [
            "Word 转 PDF 是产出文档正式形态的一步:要提交的简历、要寄出的发票、要存档的论文、要签署的合同。这些最终产物最值得保护,也最常被上传到转换网站——这意味着你简历或合同的接近定稿版本,在你把它发给真正的接收人之前,就已经躺在陌生人的服务器上。",
            "本工具完全在浏览器里完成转换:文档结构在你设备上处理,PDF 在内存中生成,输出本地保存。任何阶段都没有上传——你文档的最终版本只存在于两处:你的 .docx 原件和你产出的 PDF,都在你的机器上。",
            "本地转换还让版本纪律变得可行:每次转换只花几秒,所以每改一次就重新生成 PDF,而不是养着一份过期的——PDF 永远和最新的 .docx 一致。这个习惯彻底消灭经典的“我发的是哪个版本?”问题,而它只在转换没有上传摩擦时才成立。",
          ],
        },
      ],
    },
    ja: {
      name: "Word を PDF に変換",
      tagline: "Word .docx 文書をブラウザ内で PDF に変換。見出しや太字を含むテキスト中心の組版で、ファイルはどこにもアップロードされません。",
      intro: [
        ".docx をきれいで共有しやすい PDF に変えます。段落・見出し・太字を適切な余白つきの A4 ページに組み直すため、Word が入っていない環境でも整った見た目になります。閲覧・印刷・送信がスムーズに。",
        "このツールはテキスト重視の変換であり、Word のレイアウトをピクセル単位で再現するものではありません。元の画像・表・装飾は引き継がれません。引き継がれるのは文書のテキストで、信頼性の高い PDF として端末内で生成されます。",
      ],
      steps: [
        ".docx ファイルをドロップします(Word 2007 以降)。",
        "「PDF に変換」をクリックします。",
        "組版済みの PDF をダウンロードします。",
      ],
      faqs: [
        {
          q: "PDF が Word の見た目と違うのはなぜ?",
          a: "このツールは Word のエンジンを模倣せず、独自の整ったレイアウトでテキストを組み直します。元のフォント・行間・画像は再現されませんが、文章・見出し・強調は保たれます。",
        },
        {
          q: "画像や表も含まれますか?",
          a: "含まれません。テキストのみ(見出しと太字を含む)です。見た目が重要な文書は Word から直接 PDF を書き出し、このツールはテキスト中心の下書きやメモにご利用ください。",
        },
        {
          q: "古い .doc や日本語は扱えますか?",
          a: ".docx のみ対応です。PDF 標準フォントを使うためラテン文字系言語は正しく表示されますが、日本語・中国語・アラビア語などは現在 ? に置き換えられます。",
        },
      ],
      deepDive: [
        {
          heading: "Word から PDF へがたいてい信頼できる方向である理由",
          paragraphs: [
            "Word と PDF の相互変換は非対称で、Word から PDF へが容易な方向です。Word 文書は描画器の必要とする構造をすべて持っています——テキスト、スタイル、表、画像、ページレイアウト——そして PDF の産出は、その構造をページ記述形式へ描画するだけです。推測は一切不要です。Word で見えるものが描かれるものです。",
            "だから良い Word から PDF への変換は構造的に忠実です。フォント、間隔、表、改ページが意図どおりに着地し、PDF はそれを凍結するので、どの端末のどのビューアでも同じものが見えます。その凍結こそがこの形式の全意義です。あなたのノート PC、受け手の携帯、印刷店の RIP で同一に見える契約書。",
            "信頼性の非対称は作業計画に効きます。Word から PDF へは文書が最終段階になった瞬間に行い、さらなる編集のために PDF から Word へ戻す計画は決して立てない。PDF から Word へは再構築であり(構造は損なわれます)、.docx ファイル自体が保存すべきマスターです。",
          ],
        },
        {
          heading: "フォント、フィールド、変換前チェックリスト",
          paragraphs: [
            "フォントは Word から PDF への古典的な落とし穴です。変換するマシンに文書のフォントが入っていないと、描画器は似たものに代替し、間隔がわずかにずれます。署名線が流れ、表の折り返しが変わることがあります。良い変換は描画したフォントを埋め込み、出力は自己完結します。しかし正しいフォントが変換の時点で在席しなければなりません。文書を執筆したマシンで変換することが安全な既定です。",
            "変換前に生きている部分を確認してください。目次のフィールド、ページ番号の参照、相互参照は更新してから(Ctrl+A の後 F9)変換すれば、PDF は古い番号ではなく最終番号を載せます。さらに文書にコメントや変更履歴が含まれるかも確認してください。それが PDF に現れるかは描画器次第で、可視の校閲マークの付いた PDF を相手に送るのは定番の開示事故です。",
            "もう一つの習慣:変換後にページ数を比較し、最初と最後のページを一瞥してください。PDF が Word の表示より一页多いか少ないなら、何かが流れ直っています——通常はフォント代替です——送る前に見つける価値があります。",
          ],
        },
        {
          heading: "正式な文書はローカルで仕上げる",
          paragraphs: [
            "Word から PDF へは、文書の公式の形を産む工程です。提出する履歴書、送る請求書、納める論文、署名する契約書。こうした最終成果物は最も守る価値があるものであり、同時に最も変換サイトにアップロードされがちなものでもあります。つまり、あなたの履歴書や契約書のほぼ最終版が、本当の受け手に送る前に、他人のサーバーに座っているのです。",
            "このツールは変換を完全にブラウザ内で行います。文書構造は端末上で処理され、PDF はメモリ内で生成され、出力はローカルに保存されます。どの段階でもアップロードはなく、あなたの文書の最終版が存在するのはちょうど二つの場所です。元の .docx と産出した PDF、どちらもあなたのマシン上に。",
            "ローカル変換はバージョンの規律も実用的にします。各変換は数秒なので、編集のたびに PDF を作り直せば、古いものを抱える必要がなく——PDF は常に最新の .docx と一致します。この習慣は古典的な「どの版を送ったっけ?」問題を完全に消し、それは変換にアップロードの摩擦がないときにのみ成立します。",
          ],
        },
      ],
    },
    es: {
      name: "Word a PDF",
      tagline:
        "Convierte documentos Word .docx a PDF en tu navegador: maquetación de texto con títulos y negritas, y nada que se suba a la red.",
      intro: [
        "Pasa un .docx a un PDF limpio y compartible: párrafos, títulos y negritas se vuelven a maquetar en páginas A4 con márgenes adecuados, de modo que el resultado queda bien sin tener Word instalado. Leer, imprimir y enviar se vuelve trivial.",
        "Es una conversión honesta centrada en el texto, no un clon píxel a píxel del diseño de Word: las imágenes, tablas y decoraciones del original no se trasladan. Obtienes el texto de tu documento en un PDF fiable y legible en todas partes, generado íntegramente en tu dispositivo.",
      ],
      steps: [
        "Suelta un archivo .docx (Word 2007 o posterior).",
        "Pulsa Convertir a PDF.",
        "Descarga el PDF maquetado.",
      ],
      faqs: [
        {
          q: "¿Por qué mi PDF se ve distinto que en Word?",
          a: "La herramienta vuelve a maquetar el texto con su propio diseño limpio en lugar de emular el motor de Word. No se reproducen las fuentes, los espaciados ni las imágenes del original, pero sí las palabras, los títulos y el énfasis.",
        },
        {
          q: "¿Se incluyen imágenes y tablas?",
          a: "No, solo texto, incluidos títulos y negritas. Para documentos donde lo visual importa, exporta el PDF desde Word y reserva esta herramienta para borradores y notas de texto.",
        },
        {
          q: "¿Admite archivos .doc antiguos o texto no latino?",
          a: "Solo se admite .docx. El texto usa las fuentes estándar del PDF, así que los idiomas latinos se ven bien, mientras que otras escrituras (chino, árabe…) se sustituyen por ? por ahora.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué Word-a-PDF suele ser la dirección fiable",
          paragraphs: [
            "La conversión entre Word y PDF es asimétrica, y Word-a-PDF es la dirección fácil. Un documento Word tiene toda la estructura que un renderizador necesita — texto, estilos, tablas, imágenes, maquetación — y producir un PDF es simplemente dibujar esa estructura en el formato de descripción de páginas. No hay adivinanza: lo que ves en Word es lo que se dibuja.",
            "Por eso la salida de una buena conversión de Word a PDF es fiel por construcción: fuentes, espaciados, tablas y saltos de página caen como se pretende, y el PDF los congela para que cualquier visor en cualquier dispositivo muestre lo mismo. Esa congelación es todo el sentido del formato — un contrato que se ve idéntico en tu portátil, el móvil del destinatario y el RIP de la imprenta.",
            "La asimetría de fiabilidad importa al planificar el trabajo: convierte Word-a-PDF en el último momento, cuando el documento está final, y nunca planifiques volver a Word para seguir editando. PDF-a-Word es reconstrucción (con pérdida de estructura); el archivo .docx en sí es la copia maestra que hay que conservar.",
          ],
        },
        {
          heading: "Fuentes, campos y la lista previa a convertir",
          paragraphs: [
            "Las fuentes son la trampa clásica de Word-a-PDF. Si el documento usa una fuente no instalada en la máquina que convierte, el renderizador sustituye una similar y el espaciado cambia sutilmente — una línea de firma puede desplazarse, una tabla puede envolver distinto. Una buena conversión incrusta las fuentes que dibuja, así que la salida es autocontenida; pero la fuente correcta tiene que estar presente en el momento de convertir. Convertir en la máquina donde se escribió el documento es el valor por defecto seguro.",
            "Revisa las partes vivas antes de convertir: los campos de índice, las referencias de número de página y las referencias cruzadas deberían actualizarse (Ctrl+A y luego F9 en Word) para que el PDF lleve números finales, no caducos. Comprueba también si el documento contiene comentarios o cambios con control de revisiones — que aparezcan en el PDF depende del renderizador, y enviar un PDF con marcas visibles a una contraparte es el accidente de divulgación clásico.",
            "Un hábito más: tras convertir, compara el número de páginas y echa un vistazo a la primera y la última. Si el PDF tiene una página más o menos de lo que muestra Word, algo se refluyó — normalmente una sustitución de fuente — y conviene descubrirlo antes de enviar, no después.",
          ],
        },
        {
          heading: "Los documentos finales deberían finalizarse en local",
          paragraphs: [
            "Word-a-PDF es el paso que produce la forma oficial de un documento: el currículo a enviar, la factura a remitir, la tesis a depositar, el contrato a firmar. Estos artefactos finales son los que más valen proteger, y también los que más se suben a sitios de conversión — lo que significa que la versión casi final de tu currículo o contrato descansa en el servidor de un desconocido antes de que la envíes a su destinatario real.",
            "Esta herramienta hace la conversión por completo en tu navegador: la estructura del documento se procesa en tu dispositivo, el PDF se genera en memoria y la salida se guarda en local. Nada se sube en ninguna fase — la versión final de tu documento existe exactamente en dos sitios: tu .docx original y el PDF que produjiste, ambos en tu máquina.",
            "La conversión local también hace práctica la disciplina de versiones: como cada conversión cuesta segundos, puedes regenerar el PDF tras cada edición en vez de mantener uno caducado — el PDF siempre coincide con el último .docx. Ese hábito elimina por completo el clásico problema de \"¿qué versión envié?\", y solo funciona cuando convertir carece de fricción de subida.",
          ],
        },
      ],
    },
    pt: {
      name: "Word para PDF",
      tagline:
        "Converta documentos Word .docx em PDF no navegador — diagramação de texto com títulos e negrito, e nada que seja enviado.",
      intro: [
        "Transforme um .docx em um PDF limpo e fácil de compartilhar: parágrafos, títulos e negritos são rediagramados em páginas A4 com margens adequadas, então o resultado fica bom mesmo sem o Word instalado. Ler, imprimir e enviar fica sem atrito.",
        "Esta é uma conversão honesta focada em texto, não um clone pixel a pixel do layout do Word: imagens, tabelas e decorações do original não são levadas. Você recebe o texto do documento num PDF confiável e legível em qualquer lugar — gerado inteiramente no seu dispositivo.",
      ],
      steps: [
        "Solte um arquivo .docx (Word 2007 ou mais novo).",
        "Clique em Converter para PDF.",
        "Baixe o PDF diagramado.",
      ],
      faqs: [
        {
          q: "Por que meu PDF fica diferente do Word?",
          a: "A ferramenta rediagrama o texto com seu próprio layout limpo em vez de emular o motor do Word. Fontes, espaçamentos e imagens do original não são reproduzidos — as palavras, os títulos e o negrito sim.",
        },
        {
          q: "Imagens e tabelas são incluídas?",
          a: "Não, apenas texto — incluindo títulos e negrito. Para documentos em que o visual importa, exporte o PDF pelo próprio Word e use esta ferramenta para rascunhos e anotações de texto.",
        },
        {
          q: "Dá para usar .doc antigo ou texto não latino?",
          a: "Só .docx é aceito. O texto usa as fontes padrão do PDF, então idiomas latinos ficam corretos, mas outras escritas (chinês, árabe…) são trocadas por ? por enquanto.",
        },
      ],
      deepDive: [
        {
          heading: "Por que Word-para-PDF costuma ser a direção confiável",
          paragraphs: [
            "A conversão entre Word e PDF é assimétrica, e Word-para-PDF é a direção fácil. Um documento Word tem toda a estrutura que um renderizador precisa — texto, estilos, tabelas, imagens, layout de página — e produzir um PDF é simplesmente desenhar essa estrutura no formato de descrição de páginas. Não há adivinhação: o que você vê no Word é o que é desenhado.",
            "Por isso a saída de uma boa conversão de Word para PDF é fiel por construção: fontes, espaçamentos, tabelas e quebras de página caem como pretendido, e o PDF as congela para que qualquer visualizador em qualquer dispositivo mostre a mesma coisa. Esse congelamento é todo o sentido do formato — um contrato que aparece idêntico no seu notebook, no celular do destinatário e no RIP da gráfica.",
            "A assimetria de confiabilidade importa no planejamento do trabalho: converta Word-para-PDF no último momento, quando o documento está final, e nunca planeje voltar para Word para seguir editando. PDF-para-Word é reconstrução (com perda de estrutura); o arquivo .docx em si é a cópia mestre a guardar.",
          ],
        },
        {
          heading: "Fontes, campos e a checklist pré-conversão",
          paragraphs: [
            "Fontes são a armadilha clássica de Word-para-PDF. Se o documento usa uma fonte não instalada na máquina que converte, o renderizador substitui por uma parecida e o espaçamento muda sutilmente — uma linha de assinatura pode desandar, uma tabela pode quebrar diferente. Uma boa conversão embute as fontes que desenha, então a saída é autocontida; mas a fonte certa precisa estar presente na hora de converter. Converter na máquina onde o documento foi escrito é o padrão seguro.",
            "Confira as partes vivas antes de converter: campos de sumário, referências de número de página e referências cruzadas devem ser atualizadas (Ctrl+A e depois F9 no Word) para que o PDF leve números finais, não vencidos. Verifique também se o documento contém comentários ou alterações rastreadas — se aparecem no PDF depende do renderizador, e enviar um PDF com marcações visíveis a uma contraparte é o acidente clássico de divulgação.",
            "Mais um hábito: depois de converter, compare a contagem de páginas e dê uma olhada na primeira e na última. Se o PDF tem uma página a mais ou a menos que o Word mostra, algo refluiu — normalmente uma substituição de fonte — e vale descobrir antes de enviar, não depois.",
          ],
        },
        {
          heading: "Documentos finais devem ser finalizados localmente",
          paragraphs: [
            "Word-para-PDF é o passo que produz a forma oficial de um documento: o currículo a enviar, a nota fiscal a mandar, a tese a depositar, o contrato a assinar. Esses artefatos finais são os que mais valem proteger, e também os que mais se enviam a sites de conversão — ou seja, a versão quase final do seu currículo ou contrato repousa no servidor de um desconhecido antes de você mandá-la ao destinatário real.",
            "Esta ferramenta faz a conversão inteiramente no seu navegador: a estrutura do documento é processada no seu dispositivo, o PDF é gerado na memória e a saída é salva localmente. Nada é enviado em nenhuma fase — a versão final do seu documento existe exatamente em dois lugares: seu .docx original e o PDF que você produziu, ambos na sua máquina.",
            "A conversão local também torna prática a disciplina de versões: como cada conversão custa segundos, você pode regenerar o PDF depois de cada edição em vez de manter um vencido — o PDF sempre coincide com o .docx mais recente. Esse hábito elimina por completo o clássico problema \"qual versão eu enviei?\", e ele só funciona quando converter é livre da fricção de envio.",
          ],
        },
      ],
    },
  },
});
