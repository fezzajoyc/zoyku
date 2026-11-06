import { PdfWatermarkEngine } from "../_engines/pdf-engine-watermark";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "watermark-pdf",
  category: "pdf",
  icon: "palette",
  engine: { component: PdfWatermarkEngine },
  related: ["sign-pdf", "merge-pdf", "compress-pdf", "split-pdf", "rotate-pdf", "delete-pdf-pages", "pdf-to-ppt", "ocr-pdf", "pdf-to-text", "rearrange-pdf-pages"],
  copy: {
    en: {
      name: "Watermark PDF",
      tagline:
        "Stamp text watermarks on every PDF page — centered or tiled, with full control of size, opacity, rotation and color, fully offline.",
      intro: [
        "Mark drafts as CONFIDENTIAL, DRAFT or FOR REVIEW before they leave your hands. Choose a single centered stamp or a tiled pattern across the whole page, tune the opacity so text stays readable underneath, and pick a color that suits the document.",
        "The watermark becomes real PDF text drawn on each page — no images, no server round-trip. Because it is processed with pdf-lib on your device, even sensitive contracts can be marked without uploading them.",
      
        "The watermark is drawn as real PDF text via pdf-lib: the string is typeset at the chosen opacity and rotation directly into each page's content stream, using a built-in font so the file stays small and the mark prints crisply at any zoom. Tiled mode repeats the stamp across the page, which a crop cannot remove.",
        "Compared with stamping images into a PDF in a raster editor, real text keeps the file small and lets the underlying content remain selectable — a CONFIDENTIAL draft is still searchable. And unlike cloud stamping services, an unreleased contract or a confidential report never transits a third-party server, which is typically why it is being marked.",
      ],
      steps: [
        "Drop the PDF you want to mark.",
        "Type the watermark text and adjust layout, size, opacity and color.",
        "Click Add watermark and download the stamped PDF.",
      ],
      faqs: [
        {
          q: "What opacity works best?",
          a: "Between 10% and 25% for most documents: visible at a glance but light enough to keep body text readable. Drafts meant to be hard to read can go up to 40–50%.",
        },
        {
          q: "Can I remove an existing watermark with this tool?",
          a: "No. This tool only adds watermarks. Removing one requires editing the page content streams, which is a different (and often legally questionable) operation.",
        },
        {
          q: "Which characters can the watermark use?",
          a: "The standard PDF fonts cover Latin text, punctuation and common symbols like ©. Other scripts (Chinese, Japanese, Arabic…) are replaced with ? — keep the watermark in Latin letters.",
        },
      ],
      deepDive: [
        {
          heading: "How a watermark is added — and what it cannot do",
          paragraphs: [
            "A watermark is an overlay: the tool draws your text or image on top of (or underneath) every page's content, at a chosen position, size and transparency. The original page content is untouched — same mechanism as page numbers, just larger. This is why watermarking is instant and lossless for the source document, and why the original file on your disk remains unmodified.",
            "The classic choice is diagonal semi-transparent text across the page — \"DRAFT\", \"CONFIDENTIAL\", a company name. Diagonal placement resists casual cropping, and transparency keeps the body text readable underneath. Underneath-content watermarks (drawn behind the text layer) look cleaner but can be hidden by pages that paint a full-page background image on top.",
            "Be clear about what a watermark is: a deterrent and a marker, not a lock. Anyone with basic tools can cover a watermark or extract the un-watermarked content if the text layer is intact. Watermarks signal ownership and status (\"this is the draft, not the final\") to honest readers and complicate careless misuse — they do not stop a determined one.",
          ],
        },
        {
          heading: "Design decisions: opacity, position and per-page behavior",
          paragraphs: [
            "Opacity is the dial that makes or breaks a watermark. Around 10–20% transparency, text stays fully readable and the mark is present without shouting; above ~30% it starts fighting the content, and readers squint. Test on the page with the densest text — a watermark that works on a sparse cover may trample a dense table page.",
            "Position should match intent. A centered diagonal mark says \"status label\" (draft, confidential). A corner or footer mark reads like a stamp and suits attribution — company name, document origin. For documents that will be cropped or where margins may be trimmed, center placement survives; corner marks near the edge can be cut off in printing.",
            "One subtlety worth checking: watermarks apply to every page by default, including covers and blank separators, which sometimes looks odd. If the output's cover page looks over-stamped, that is the uniform overlay doing its job uniformly — some workflows instead watermark after assembling and delete the cover's watermark by re-adding a clean cover page on top.",
          ],
        },
        {
          heading: "Marking drafts locally, before they circulate",
          paragraphs: [
            "Watermarks are most often applied to exactly the documents in motion: drafts going out for review, confidential excerpts shared for comment, invoices and statements carrying the issuer's name. These are working documents whose audience is half-trusted by definition — and uploading them to a watermark service hands the un-watermarked original to a third party precisely at the moment it is about to circulate.",
            "This tool watermarks in your browser: pages are processed locally, the mark is drawn into the page content in memory, and the output is saved by your device. The un-watermarked original never leaves your machine; what circulates is only the marked copy you chose to produce.",
            "There is a workflow dividend: because watermarking is instant and local, it is cheap to produce marked variants per audience — \"DRAFT — for internal review\" to one group, a copy with the recipient's name to another. That per-recipient marking is the classic leak-tracing practice, and it only becomes practical when producing each variant costs seconds and zero uploads.",
          ],
        },
      ],
    },
    zh: {
      name: "PDF 水印",
      tagline: "给每一页 PDF 加上文字水印——居中或平铺,字号、透明度、角度、颜色全可控,完全离线运行。",
      intro: [
        "在文件出手之前打上 CONFIDENTIAL、DRAFT 或“内部资料”。可选居中单枚或整页平铺,调节透明度让正文依然可读,颜色也能随意搭配。",
        "水印以真实 PDF 文字的形式绘制在每页上——不是图片,也不经过服务器。处理由 pdf-lib 在本地完成,即使敏感合同也能在不上传的前提下加印。",
      ],
      steps: [
        "拖入要加水印的 PDF。",
        "输入水印文字,调整排版、字号、透明度和颜色。",
        "点击“添加水印”,下载加水印后的 PDF。",
      ],
      faqs: [
        {
          q: "透明度设多少合适?",
          a: "大多数文档建议 10%–25%:一眼可见,又不影响正文阅读。如果想让草稿更难阅读,可以提高到 40%–50%。",
        },
        {
          q: "能用这个工具去掉已有水印吗?",
          a: "不能。本工具只负责添加水印。移除水印需要编辑页面内容流,是另一种操作(而且往往涉及法律问题)。",
        },
        {
          q: "水印文字支持哪些字符?",
          a: "PDF 标准字体覆盖拉丁字母、标点和 © 等常用符号。中文、日文、阿拉伯文等其他文字会被替换为 ? ——水印请使用拉丁字符。",
        },
      ],
      deepDive: [
        {
          heading: "水印是怎么加上的——以及它做不到什么",
          paragraphs: [
            "水印是叠加:工具把你的文字或图像画在每页内容之上(或之下),按选定的位置、大小和透明度。原始页面内容不动——和页码同一个机制,只是更大。这就是为什么加水印对源文档是瞬时且无损的,磁盘上的原文件保持原样。",
            "经典选择是横跨页面的斜排半透明文字——“草稿”、“机密”、公司名。斜排放置能抵御随手裁剪,透明度保证正文在下面仍然可读。画在内容层之下的水印更干净,但如果页面在上面涂了一整页背景图,这种水印会被盖住。",
            "说清水印是什么:它是威慑和标记,不是锁。手上有基本工具的人可以盖住水印,或在文字层完好时提取未加水印的内容。水印向诚实的读者宣示归属和状态(“这是草稿,不是定稿”),给漫不经心的误用制造麻烦——但它拦不住存心的人。",
          ],
        },
        {
          heading: "设计决策:透明度、位置与逐页表现",
          paragraphs: [
            "透明度是决定水印成败的旋钮。10%–20% 透明度时,正文完全可读,标记在场但不吵闹;超过约 30% 就开始和内容打架,读者要眯眼看。在文字最密的那一页测试——在稀疏封面上可行的水印,可能踩坏密密的表格页。",
            "位置要匹配意图。居中斜排的标记说的是“状态标签”(草稿、机密)。角落或页脚的标记读起来像图章,适合署名——公司名、文档来源。对会被裁剪或页边可能被切掉的文档,居中放得更久;靠近边缘的角标可能在打印时被切掉。",
            "一个值得检查的细节:水印默认作用于每一页,包括封面和空白分隔页,有时看着别扭。如果输出的封面显得盖章过重,那是均匀叠加在均匀干活——有些工作流改为先组装后加水印,再在顶上重新放一张干净封面页。",
          ],
        },
        {
          heading: "让草稿先盖上标记,再开始流通",
          paragraphs: [
            "水印最常加在恰好正在流动的文档上:送出去评审的草稿、供评论的机密摘录、带着出票方名称的发票和账单。这些是在途文档,其受众按定义就是半信任的——把这样的文件传给加水印服务,等于在它即将流通的那一刻,把未加水印的原件交给了第三方。",
            "本工具在浏览器里加水印:页面本地处理,标记在内存中画进页面内容,输出由你的设备保存。未加水印的原件从不离开你的机器;流通出去的只是你选择产出的那份带标记的副本。",
            "工作流上还有红利:因为加水印瞬时且本地,为不同受众产出不同标记版本的成本极低——给一组人“草稿——内部评审用”,给另一组人带收件人姓名的副本。按接收人打标是经典的泄密溯源做法,只有当每个变体只花几秒、零上传时,它才真正可操作。",
          ],
        },
      ],
    },
    ja: {
      name: "PDF ウォーターマーク",
      tagline: "PDF の全ページに文字ウォーターマークを追加。中央配置もタイル状も可能で、サイズ・不透明度・角度・色を細かく制御、完全オフライン。",
      intro: [
        "配布前に CONFIDENTIAL、DRAFT、 REVIEW などの印を付けましょう。ページ中央に 1 つ、または全体にタイル状に配置でき、不透明度を調整すれば本文の可読性を保てます。色も文書に合わせて選べます。",
        "ウォーターマークは各ページに描かれた本物の PDF テキストであり、画像でもサーバー経由でもありません。pdf-lib による端末内処理のため、機密性の高い契約書もアップロードせずに加工できます。",
      ],
      steps: [
        "マークを付けたい PDF をドロップします。",
        "ウォーターマークの文字とレイアウト・サイズ・不透明度・色を調整します。",
        "「ウォーターマークを追加」をクリックし、PDF をダウンロードします。",
      ],
      faqs: [
        {
          q: "不透明度はどのくらいが適切ですか?",
          a: "ほとんどの文書は 10〜25% が最適です。ひと目で分かりつつ本文を読みやすく保てます。読みにくくしたいドラフトなら 40〜50% まで上げられます。",
        },
        {
          q: "既存のウォーターマークを削除できますか?",
          a: "できません。このツールは追加専用です。削除にはページのコンテンツストリーム編集が必要で、別の(法的に問題になりやすい)操作です。",
        },
        {
          q: "ウォーターマークに使える文字は?",
          a: "PDF 標準フォントはラテン文字・句読点・© などの記号に対応します。中国語・日本語・アラビア語などは ? に置き換えられるため、ラテン文字でご入力ください。",
        },
      ],
      deepDive: [
        {
          heading: "透かしはどう付けられるか——そして何ができないか",
          paragraphs: [
            "透かしはオーバーレイです。ツールはあなたのテキストや画像を、各ページの内容の上(または下)に、選んだ位置・大きさ・透明度で描きます。元のページ内容は無傷——ページ番号と同じ機構で、ただ大きいだけです。だから透かし付けはソース文書に対して瞬時で可逆であり、ディスク上の元ファイルは変更されないままです。",
            "定番の選択はページを横切る斜めの半透明テキストです。「DRAFT」「CONFIDENTIAL」、会社名。斜め配置は安易な切り抜きに抵抗し、透明度はその下の本文の可読性を保ちます。内容の下に描く透かし(テキスト層の裏)はよりきれいですが、全面背景画像を上に塗るページには隠され得ます。",
            "透かしが何であるかを明確に。それは抑止と標識であって、鍵ではありません。基本の道具を持つ者なら透かしを覆え、テキスト層が無事なら透かし無しの内容を取り出せます。透かしは、誠実な読者に帰属と状態(「これは草稿であって最終版ではない」)を示し、不注意な誤用を厄介にします——が、決意した者は止めません。",
          ],
        },
        {
          heading: "デザインの判断:透明度、位置、ページごとの挙動",
          paragraphs: [
            "透かしの成否を決めるつまみは透明度です。10〜20% 前後なら本文は完全に読め、標識は存在しながら叫びません。約 30% を超えると内容と争い始め、読者は目を細めます。最も文字の密なページで試してください。疎らな表紙では成功する透かしが、密な表のページを踏みにじることがあります。",
            "位置は意図に合わせるべきです。中央の斜めの標識は「状態ラベル」(草稿、機密)を語ります。隅やフッターの標識は判のように読め、帰属に適します——会社名、文書の出所。切り抜きや余白の刈り込みがあり得る文書では、中央配置が生き残ります。端に近い隅の標識は印刷で切られ得ます。",
            "確かめる価値のある細部:透かしは既定で全ページに適用され、表紙や空白の区切りページも含みます。時に不自然に見えます。出力の表紙が押印過多に見えるなら、それは均一なオーバーレイが均一に働いた結果です。ワークフローによっては、組み立て後に透かしを付け、表紙の透かしは其の上にきれいな表紙ページを重ね直すことで消すこともあります。",
          ],
        },
        {
          heading: "流通の前に草稿に標を付け、しかもローカルで",
          paragraphs: [
            "透かしは最もしばしば、まさに動いている文書に適用されます。レビューに出す草稿、意見募集で共有される機密の抜粋、発行者名を載せる請求書と明細。これらは作業文書であり、その受け手は定義上半分信頼されています。そんなファイルを透かしサービスにアップロードすることは、流通が始まるその瞬間に、透かし無しの原本を第三者へ渡すことです。",
            "このツールはブラウザ内で透かしを付けます。ページはローカルで処理され、標はメモリ内でページ内容に描き込まれ、出力は端末が保存します。透かし無しの原本は端末を離れません。流通するのは、あなたが産み出すことを選んだ、標の付いたコピーだけです。",
            "ワークフローの配当もあります。透かし付けは瞬時でローカルなので、受け手ごとの標付き版を安く産めます。ある集団へは「草稿——社内レビュー用」、別の集団へは受け手名入りのコピー。受け手ごとの標付けは古典的な漏えい追跡の実践であり、各版の産出が数秒とゼロアップロードで済むときにのみ、実用になります。",
          ],
        },
      ],
    },
    es: {
      name: "Marca de agua PDF",
      tagline:
        "Estampa marcas de agua de texto en todas las páginas del PDF: centrada o en mosaico, con control de tamaño, opacidad, ángulo y color, sin conexión.",
      intro: [
        "Marca borradores como CONFIDENCIAL, BORRADOR o PARA REVISIÓN antes de que salgan de tus manos. Elige un sello centrado o un mosaico por toda la página, ajusta la opacidad para que el texto siga legible y escoge el color adecuado.",
        "La marca se convierte en texto PDF real dibujado en cada página: sin imágenes ni viajes al servidor. Como se procesa con pdf-lib en tu dispositivo, hasta contratos confidenciales pueden marcarse sin subirlos.",
      ],
      steps: [
        "Suelta el PDF que quieres marcar.",
        "Escribe el texto y ajusta disposición, tamaño, opacidad y color.",
        "Pulsa Añadir marca de agua y descarga el PDF sellado.",
      ],
      faqs: [
        {
          q: "¿Qué opacidad conviene usar?",
          a: "Entre el 10% y el 25% para la mayoría de documentos: visible de un vistazo pero lo bastante ligera para leer el texto. Los borradores que deban ser difíciles de leer pueden llegar al 40–50%.",
        },
        {
          q: "¿Puedo quitar una marca de agua existente?",
          a: "No. Esta herramienta solo añade marcas. Quitar una exige editar los flujos de contenido de la página, una operación distinta (y a menudo legalmente discutible).",
        },
        {
          q: "¿Qué caracteres admite la marca de agua?",
          a: "Las fuentes PDF estándar cubren texto latino, puntuación y símbolos comunes como ©. Otros alfabetos (chino, japonés, árabe…) se sustituyen por ? — usa letras latinas en la marca.",
        },
      ],
      deepDive: [
        {
          heading: "Cómo se añade una marca de agua — y qué no puede hacer",
          paragraphs: [
            "Una marca de agua es un superpuesto: la herramienta dibuja tu texto o imagen encima (o debajo) del contenido de cada página, en una posición, tamaño y transparencia elegidos. El contenido original de la página queda intacto — el mismo mecanismo que los números de página, solo que más grande. Por eso aplicar marca de agua es instantáneo y sin pérdidas para el documento de origen, y el archivo original en tu disco permanece sin modificar.",
            "La elección clásica es texto diagonal semi-transparente a través de la página — \"BORRADOR\", \"CONFIDENCIAL\", un nombre de empresa. La colocación diagonal resiste recortes casuales, y la transparencia mantiene el texto del cuerpo legible debajo. Las marcas de agua dibujadas detrás del contenido se ven más limpias, pero las páginas que pintan una imagen de fondo a página completa encima pueden ocultarlas.",
            "Sé claro sobre lo que es una marca de agua: un disuasivo y un marcador, no un candado. Cualquiera con herramientas básicas puede cubrir una marca de agua o extraer el contenido sin ella si la capa de texto está intacta. Las marcas de agua señalan propiedad y estado (\"este es el borrador, no el final\") a lectores honestos y complican el mal uso descuidado — no detienen al decidido.",
          ],
        },
        {
          heading: "Decisiones de diseño: opacidad, posición y comportamiento por página",
          paragraphs: [
            "La opacidad es el mando que hace o deshace una marca de agua. En torno al 10–20% de transparencia, el texto se lee por completo y la marca está presente sin gritar; por encima de ~30% empieza a pelearse con el contenido y los lectores entrecierran los ojos. Pruébala en la página con el texto más denso — una marca de agua que funciona en una portada espesa puede pisotear una página de tabla densa.",
            "La posición debe coincidir con la intención. Una marca diagonal centrada dice \"etiqueta de estado\" (borrador, confidencial). Una marca en esquina o pie se lee como un sello y encaja con la atribución — nombre de empresa, origen del documento. Para documentos que se recortarán o donde los márgenes pueden podarse, la colocación centrada sobrevive; las marcas de esquina cerca del borde pueden cortarse al imprimir.",
            "Un detalle que vale comprobar: las marcas de agua se aplican por defecto a todas las páginas, incluidas portadas y separadores en blanco, lo que a veces se ve raro. Si la portada de la salida parece sobre-sellada, es el superpuesto uniforme haciendo su trabajo uniformemente — algunos flujos aplican la marca después de ensamblar y elimina la de la portada poniendo una portada limpia encima.",
          ],
        },
        {
          heading: "Marcar borradores en local, antes de que circulen",
          paragraphs: [
            "Las marcas de agua se aplican más a menudo a justo los documentos en movimiento: borradores que salen a revisión, extractos confidenciales compartidos para comentario, facturas y extractos que llevan el nombre del emisor. Son documentos de trabajo cuya audiencia es semidefiada por definición — y subirlos a un servicio de marcas de agua entrega el original sin marca a un tercero justo en el momento en que va a circular.",
            "Esta herramienta marca en tu navegador: las páginas se procesan en local, la marca se dibuja en el contenido de la página en memoria, y la salida la guarda tu dispositivo. El original sin marca nunca sale de tu máquina; lo que circula es solo la copia marcada que elegiste producir.",
            "Hay un dividendo de flujo: como marcar es instantáneo y local, producir variantes marcadas por audiencia cuesta poco — \"BORRADOR — para revisión interna\" a un grupo, una copia con el nombre del destinatario a otro. Esa marca por destinatario es la práctica clásica de rastreo de fugas, y solo se vuelve práctica cuando producir cada variante cuesta segundos y cero subidas.",
          ],
        },
      ],
    },
    pt: {
      name: "Marca d'água PDF",
      tagline:
        "Aplique marcas d'água de texto em todas as páginas do PDF — centralizada ou em mosaico, com controle de tamanho, opacidade, rotação e cor, offline.",
      intro: [
        "Marque rascunhos como CONFIDENCIAL, RASCUNHO ou PARA REVISÃO antes de circularem. Escolha um selo centralizado ou um mosaico pela página toda, ajuste a opacidade para o texto continuar legível e escolha a cor ideal.",
        "A marca vira texto PDF real desenhado em cada página — sem imagens e sem passagem por servidor. Como é processado com pdf-lib no seu dispositivo, até contratos confidenciais podem ser marcados sem upload.",
      ],
      steps: [
        "Solte o PDF que quer marcar.",
        "Digite o texto e ajuste layout, tamanho, opacidade e cor.",
        "Clique em Adicionar marca d'água e baixe o PDF carimbado.",
      ],
      faqs: [
        {
          q: "Qual opacidade funciona melhor?",
          a: "Entre 10% e 25% na maioria dos documentos: visível de relance, mas leve o bastante para o texto continuar legível. Rascunhos que devem ficar difíceis de ler podem chegar a 40–50%.",
        },
        {
          q: "Dá para remover uma marca d'água existente?",
          a: "Não. Esta ferramenta apenas adiciona marcas. Remover exige editar os fluxos de conteúdo da página, uma operação diferente (e frequentemente legalmente questionável).",
        },
        {
          q: "Quais caracteres a marca d'água aceita?",
          a: "As fontes PDF padrão cobrem texto latino, pontuação e símbolos comuns como ©. Outros alfabetos (chinês, japonês, árabe…) viram ? — use letras latinas na marca.",
        },
      ],
      deepDive: [
        {
          heading: "Como uma marca d'água é adicionada — e o que ela não pode fazer",
          paragraphs: [
            "Uma marca d'água é uma sobreposição: a ferramenta desenha seu texto ou imagem por cima (ou por baixo) do conteúdo de cada página, numa posição, tamanho e transparência escolhidos. O conteúdo original da página fica intacto — o mesmo mecanismo dos números de página, só que maior. Por isso aplicar marca d'água é instantâneo e sem perdas para o documento de origem, e o arquivo original no seu disco permanece sem modificação.",
            "A escolha clássica é texto diagonal semitransparente atravessando a página — \"RASCUNHO\", \"CONFIDENCIAL\", um nome de empresa. A colocação diagonal resiste a recortes casuais, e a transparência mantém o texto do corpo legível por baixo. Marcas d'água desenhadas atrás do conteúdo ficam mais limpas, mas páginas que pintam uma imagem de fundo de página inteira por cima podem escondê-las.",
            "Seja claro sobre o que uma marca d'água é: um dissuasor e um marcador, não um cadeado. Qualquer um com ferramentas básicas pode cobrir uma marca d'água ou extrair o conteúdo sem ela se a camada de texto estiver intacta. Marcas d'água sinalizam posse e estado (\"este é o rascunho, não o final\") para leitores honestos e complicam o mau uso descuidado — não param o determinado.",
          ],
        },
        {
          heading: "Decisões de design: opacidade, posição e comportamento por página",
          paragraphs: [
            "A opacidade é o botão que faz ou desfaz uma marca d'água. Em torno de 10–20% de transparência, o texto é totalmente legível e a marca está presente sem gritar; acima de ~30% ela começa a brigar com o conteúdo e os leitores apertam os olhos. Teste na página com o texto mais denso — uma marca que funciona numa capa rala pode atropelar uma página de tabela densa.",
            "A posição deve combinar com a intenção. Uma marca diagonal centralizada diz \"rótulo de estado\" (rascunho, confidencial). Uma marca no canto ou no rodapé se lê como um carimbo e serve para atribuição — nome de empresa, origem do documento. Para documentos que serão recortados ou em que margens podem ser aparadas, a colocação central sobrevive; marcas de canto perto da borda podem ser cortadas na impressão.",
            "Um detalhe que vale conferir: marcas d'água se aplicam por padrão a todas as páginas, incluindo capas e separadores em branco, o que às vezes fica estranho. Se a capa da saída parecer carimbada demais, é a sobreposição uniforme fazendo seu trabalho uniformemente — alguns fluxos aplicam a marca depois de montar e tiram a da capa colocando uma capa limpa por cima.",
          ],
        },
        {
          heading: "Marcar rascunhos localmente, antes de circularem",
          paragraphs: [
            "Marcas d'água são aplicadas mais vezes a exatamente os documentos em movimento: rascunhos que saem para revisão, trechos confidenciais compartilhados para comentário, notas fiscais e extratos que carregam o nome do emissor. São documentos de trabalho cuja audiência é, por definição, semiconfiável — e enviá-los a um serviço de marca d'água entrega o original sem marca a um terceiro justamente no momento em que vai circular.",
            "Esta ferramenta marca no seu navegador: as páginas são processadas localmente, a marca é desenhada no conteúdo da página em memória, e a saída é salva pelo seu dispositivo. O original sem marca nunca sai da sua máquina; o que circula é só a cópia marcada que você escolheu produzir.",
            "Há um dividendo de fluxo: como marcar é instantâneo e local, produzir variantes marcadas por audiência custa pouco — \"RASCUNHO — para revisão interna\" para um grupo, uma cópia com o nome do destinatário para outro. Essa marca por destinatário é a prática clássica de rastreamento de vazamentos, e só se torna prática quando produzir cada variante custa segundos e zero envios.",
          ],
        },
      ],
    },
  },
});
