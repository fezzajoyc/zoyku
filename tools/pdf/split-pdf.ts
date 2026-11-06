import { PdfPagesEngine } from "../_engines/pdf-engine-pages";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "split-pdf",
  featured: true,
  category: "pdf",
  icon: "crop",
  engine: { component: PdfPagesEngine, props: { op: "split" } },
  related: ["merge-pdf", "delete-pdf-pages", "rearrange-pdf-pages", "rotate-pdf", "pdf-to-jpg", "pdf-to-ppt", "compress-pdf", "ocr-pdf", "pdf-to-text", "jpg-to-pdf"],
  copy: {
    en: {
      name: "Split PDF",
      tagline:
        "Split a PDF into separate files by fixed page count or custom ranges — every output is generated locally and nothing is uploaded.",
      intro: [
        "Break a long PDF into smaller files in two ways: cut it every N pages (handy for 1-page-per-file or chapter-sized chunks), or define custom ranges like “1-3, 4-6, 8” and get one file per range. Multiple outputs are bundled into a ZIP automatically.",
        "The split runs on your device with pdf-lib — original files stay untouched, and the pieces never pass through a server. Ideal for confidential documents you would rather not upload anywhere.",
        "Splitting relies on pdf-lib's copyPages, which moves each page's full content stream, fonts and images into the new file untouched — there is no re-rendering and no quality loss anywhere in the pipeline. A 30 MB source split into five parts yields five files whose sizes add up to roughly the original, since the page data is carried over as-is.",
        "That is the key difference from printing a PDF range to a new PDF, which rasterizes or re-distills the content and often breaks links and selectable text. Here the pieces are faithful copies, produced locally in your browser; nothing is uploaded, and your original file is left exactly as it was on disk."
      ],
      steps: [
        "Drop the PDF you want to split.",
        "Choose “every N pages” or custom ranges and enter the values.",
        "Click Split PDF, then download each part or the whole ZIP.",
      ],
      faqs: [
        {
          q: "How do I split a PDF into single pages?",
          a: "Choose “Every N pages”, set it to 1, and each page becomes its own PDF. For more than one output file you also get a ZIP containing all of them.",
        },
        {
          q: "What range syntax is supported?",
          a: "Comma-separated values and hyphenated spans, for example “1-3, 5, 8-10”. Ranges may overlap and are processed in the order you type them.",
        },
        {
          q: "Does splitting change the quality of my pages?",
          a: "No. Pages are copied byte-for-byte into new documents, so text stays selectable and images keep their original quality.",
        },
      ],
      deepDive: [
        {
          heading: "Splitting is the mirror of merging — and just as lossless",
          paragraphs: [
            "Splitting a PDF produces new documents that each contain a subset of the original's pages. As with merging, the operation works on the page tree: each output document gets a reference list pointing at the original page objects, which are copied as-is. Page content is never re-rendered or re-compressed, so every split output preserves the source's quality exactly — selectable text, embedded fonts, image resolution, annotations.",
            "There are two common split modes with different intuitions. Range splitting (\"pages 1-5, 6-12\") produces named chunks for distribution — one chapter per recipient, one section per department. Every-N-pages splitting (\"every 10 pages\") is the batch tool for breaking a long scan or export into processable units, for example to satisfy an upload size limit elsewhere.",
            "What splitting does not do: extract content within a page. A page that contains half your secret and half something public stays whole in whichever output it lands. Sensitive content that shares a page with shareable content needs page-level reorganization (or redaction, which is a different, more demanding operation) before splitting.",
          ],
        },
        {
          heading: "Planning the cuts: ranges, boundaries and file naming",
          paragraphs: [
            "The quality of a split is decided before you click: by where you draw the boundaries. Cut at structural seams — chapter starts, section breaks, blank separator pages — not at arbitrary page counts. A chapter that begins halfway through a chunk is more annoying than a slightly uneven distribution. Scanning the document's table of contents or bookmark list first is the fastest way to find natural cut points.",
            "Naming matters more than expected. Outputs from a split tend to proliferate — and six files named \"output_1.pdf\" through \"output_6.pdf\" guarantee confusion a week later. Name chunks by content (\"contract-signatures.pdf\", \"annex-A.pdf\") as you produce them; the split is the right moment, because it is when you know exactly what each chunk contains.",
            "One habit for recurring splits: if you split the same long document the same way repeatedly (monthly statements split per client, a manual split per chapter), keep the range list in a note and reuse it. Ranges are stable as long as the source's page count doesn't change — and the note doubles as documentation of how the collection is organized.",
          ],
        },
        {
          heading: "Distributing documents without a middleman copy",
          paragraphs: [
            "Splitting usually precedes distribution: send chapter one to reviewers, the invoice pages to accounting, the public summary to the client. The document being split is typically the complete, sensitive master — which makes uploading it to a split service especially backwards: you hand over the whole document to produce pieces you intend to give away selectively.",
            "This tool splits entirely in your browser: the source PDF is parsed locally, output documents are assembled in memory from the page references you choose, and each file is saved directly by your device. The master never leaves your machine, so the parts you keep private and the parts you distribute are created under exactly the same privacy conditions.",
            "A useful consequence: since outputs are byte-faithful copies of original pages, you can verify a split by opening any output and checking that its pages are pixel-identical to the corresponding source pages. No quality audit needed — the split is structural, not generative, so there is nothing that could have degraded in the first place.",
          ],
        },
      ],
    },
    zh: {
      name: "拆分 PDF",
      tagline: "按固定页数或自定义范围把 PDF 拆成多个文件,全部在本地生成,文件不上传到任何服务器。",
      intro: [
        "两种拆法:每 N 页切一份(适合一页一文件或按章节切分),或输入自定义范围(如“1-3, 4-6, 8”)按范围出文件。多个结果会自动打包成 ZIP 下载。",
        "拆分通过 pdf-lib 在你的设备上完成——原文件保持不变,拆出的文件也不经过任何服务器,适合处理不方便上传的机密文档。",
      ],
      steps: [
        "拖入需要拆分的 PDF。",
        "选择“每 N 页一份”或“自定义范围”并填写数值。",
        "点击“拆分 PDF”,逐个下载或直接下载 ZIP 压缩包。",
      ],
      faqs: [
        {
          q: "怎么把 PDF 拆成单页文件?",
          a: "选择“每 N 页一份”并把 N 设为 1,每一页就会变成独立的 PDF。输出多于一个文件时,还会额外提供包含全部文件的 ZIP。",
        },
        {
          q: "范围支持什么格式?",
          a: "支持逗号分隔和连写区间,例如“1-3, 5, 8-10”。范围可以重叠,并按输入顺序依次处理。",
        },
        {
          q: "拆分会影响页面质量吗?",
          a: "不会。页面按原始字节复制进新文档,文字仍可选中,图片保持原有质量。",
        },
      ],
      deepDive: [
        {
          heading: "拆分是合并的镜像——同样无损",
          paragraphs: [
            "拆分 PDF 产出的新文档,各自包含原文件页面的一个子集。和合并一样,操作发生在页面树上:每份输出拿到一个引用列表,指向原文件的页面对象,而对象按原样复制。页面内容从不被重渲染或重压缩,所以每份拆分输出都精确保留源文件的质量——可选中文字、嵌入字体、图片分辨率、批注。",
            "两种常用拆分模式,直觉不同。按范围拆(“第 1–5 页、6–12 页”)产出命名的块,用于分发——一章给一个接收人,一节给一个部门。按每 N 页拆(“每 10 页一拆”)是批量工具,把长扫描或长导出破成可处理的单元,比如满足别处的上传体积限制。",
            "拆分不做的事:提取页面内部的内容。一页上既有一半秘密又有公开内容的,它在哪份输出里就仍是完整的一页。敏感内容和可分享内容同页时,需要先做页面级重组(或涂黑,那是另一种要求更高的操作),再拆分。",
          ],
        },
        {
          heading: "规划切口:范围、边界与文件命名",
          paragraphs: [
            "拆分的质量在点击之前就定了:取决于你在哪里画边界。沿结构缝切——章首、节间断、空白分隔页——不要按任意页数切。一章从某块的中途开始,比分布略微不均更让人恼火。先扫一眼文档目录或书签列表,是找自然切点最快的办法。",
            "命名比想象中重要。拆分产出容易繁殖——六个文件都叫“output_1.pdf”到“output_6.pdf”,一周后必乱。产出时就按内容命名块(“合同-签署页.pdf”、“附录A.pdf”),拆分正是合适的时机,因为你此刻精确知道每块里是什么。",
            "对重复性拆分的一个习惯:如果同一份长文档总按同一方式拆(月度对账单按客户拆、手册按章拆),把范围清单存在备忘里反复用。只要源文件页数不变,范围就是稳定的——这份备忘还兼任这套资料的整理说明。",
          ],
        },
        {
          heading: "分发文档,不留中间人副本",
          paragraphs: [
            "拆分通常在分发之前:第一章给评审、发票页给财务、公开摘要给客户。被拆的文档往往是最完整、最敏感的总文件——这让“传给拆分服务”显得格外本末倒置:你交出整份文档,只为了产出你打算选择性送出的那几片。",
            "本工具完全在浏览器里拆分:源 PDF 本地解析,输出文档在内存里由你选定的页面引用组装,每个文件由你的设备直接保存。总文件从不离开你的机器,所以你保留私密的片段和你要分发的片段,是在完全相同的隐私条件下产生的。",
            "还有一个有用的推论:因为输出是原始页面的逐字节忠实副本,你可以打开任意一份输出、核对它的页面与源文件对应页像素一致,来完成拆分验证。不需要质量审计——拆分是结构性的,不是生成性的,从一开始就不存在劣化的可能。",
          ],
        },
      ],
    },
    ja: {
      name: "PDF 分割",
      tagline: "PDF を固定ページ数または範囲指定で複数ファイルに分割。生成はすべてローカルで、ファイルはサーバーにアップロードされません。",
      intro: [
        "長い PDF を 2 通りの方法で分割できます。N ページごとに切る方法(1 ページずつや章ごとに便利)と、「1-3, 4-6, 8」のような範囲を指定して 1 範囲 1 ファイルにする方法。複数の出力は自動的に ZIP にまとめられます。",
        "分割は pdf-lib により端末上で実行されます。元ファイルは変更されず、出力もサーバーを経由しません。アップロードしたくない機密文書に最適です。",
      ],
      steps: [
        "分割したい PDF をドロップします。",
        "「N ページごと」または「範囲を指定」を選び、値を入力します。",
        "「PDF を分割」をクリックし、各ファイルまたは ZIP をダウンロードします。",
      ],
      faqs: [
        {
          q: "PDF を 1 ページずつに分割するには?",
          a: "「N ページごと」を選んで 1 に設定すると、各ページが個別の PDF になります。出力が 2 ファイル以上のときは、すべてを含む ZIP もダウンロードできます。",
        },
        {
          q: "範囲の書き方は?",
          a: "カンマ区切りとハイフン範囲に対応します(例:「1-3, 5, 8-10」)。範囲の重複も可能で、入力した順に処理されます。",
        },
        {
          q: "分割するとページの品質は変わりますか?",
          a: "変わりません。ページはバイト単位で新しい文書にコピーされるため、テキストは選択可能なまま、画像も元の品質を保ちます。",
        },
      ],
      deepDive: [
        {
          heading: "分割は結合の鏡であり、同じく可逆",
          paragraphs: [
            "PDF の分割は、元のページの部分集合をそれぞれ含む新しい文書を産みます。結合と同様、操作はページツリーで行われます。各出力文書は、元のページオブジェクトを指す参照リストを受け取り、オブジェクトはそのままコピーされます。ページ内容は再描画も再圧縮もされないので、分割出力はすべてソースの品質を正確に保ちます。選択可能なテキスト、埋め込みフォント、画像解像度、注釈。",
            "直観の異なる二つの一般的な分割モードがあります。範囲分割(「1〜5 ページ、6〜12 ページ」)は配布のための名前付きの塊を産みます。一章を一人の受け手に、一節を一部署に。N ページごと分割(「10 ページごと」)は、長い走査や書き出しを処理可能な単位に砕くバッチ道具です。たとえば他所のアップロード容量制限を満たすためなどに。",
            "分割がしないこと:ページ内部の内容の抽出。秘密の半分と公開物の半分が同じページにあるなら、そのページは行き先の出力で丸ごと残ります。機密内容が共有可能な内容と同ページにある場合、分割の前にページレベルでの組み替え(あるいは黒塗り——より要求の高い別の操作)が必要です。",
          ],
        },
        {
          heading: "切り目の計画:範囲、境界、命名",
          paragraphs: [
            "分割の品質はクリックの前に決まっています。どこに境界を引くかによって。構造の継ぎ目で切ること——章の始まり、節の切れ目、空白の区切りページ——任意のページ数ではなく。一つの章が塊の中途から始まるのは、わずかに不均一な配布より面倒です。文書の目次やしおりの一覧を先に眺めることが、自然な切り目を見つける最速の道です。",
            "命名は予想より重要です。分割の出力は増殖しがちです。そして「output_1.pdf」から「output_6.pdf」までの六つのファイルは、一週間後の混乱を保証します。塊を内容で命名してください(「契約-署名ページ.pdf」、「別冊A.pdf」)。分割こそその正しい瞬間です。各塊の中身を正確に知っているのはそのときだけだからです。",
            "反復する分割の習慣:同じ長い文書を同じように繰り返し分割するなら(月次明細を顧客ごとに、マニュアルを章ごとに)、範囲の一覧をメモに取り再利用してください。ソースのページ数が変わらない限り範囲は安定します。そのメモは、この資料群がどう整理されているかの記録にもなります。",
          ],
        },
        {
          heading: "仲介者のコピーなしで文書を配布する",
          paragraphs: [
            "分割はたいてい配布の前に行われます。第一章をレビューアに、請求書ページを経理に、公開サマリーを顧客に。分割される文書は典型的には完全で機密性の高いマスターです。それゆえ、分割サービスへのアップロードはとりわけ逆立ちしています。選択的に配るつもりの断片を産むために、文書全体を渡してしまうのです。",
            "このツールは分割を完全にブラウザ内で行います。ソース PDF はローカルで解析され、出力文書はあなたが選んだページ参照からメモリ内で組み立てられ、各ファイルは端末が直接保存します。マスターは端末を離れません。だから私的に保つ部分も配布する部分も、まったく同じプライバシー条件の下で生まれます。",
            "有益な帰結もあります。出力は元ページのバイト単位の忠実なコピーなので、任意の出力を開き、そのページが対応するソースページとピクセル単位で一致することを確かめれば、分割を検証できます。品質の監査は不要です。分割は構造的であって生成的ではないので、そもそも劣化し得るものが何もないのです。",
          ],
        },
      ],
    },
    es: {
      name: "Dividir PDF",
      tagline:
        "Divide un PDF en varios archivos por número de páginas fijo o por rangos personalizados: todo se genera en local y nada se sube a la red.",
      intro: [
        "Divide un PDF largo de dos formas: cortarlo cada N páginas (útil para una página por archivo o por capítulos) o definir rangos como “1-3, 4-6, 8” y obtener un archivo por rango. Si salen varios archivos, se empaquetan en un ZIP automáticamente.",
        "La división se ejecuta en tu dispositivo con pdf-lib: los originales quedan intactos y las partes nunca pasan por un servidor. Perfecto para documentos confidenciales que prefieres no subir a ningún sitio.",
      ],
      steps: [
        "Suelta el PDF que quieres dividir.",
        "Elige “cada N páginas” o “rangos personalizados” e introduce los valores.",
        "Pulsa Dividir PDF y descarga cada parte o el ZIP completo.",
      ],
      faqs: [
        {
          q: "¿Cómo divido un PDF en páginas sueltas?",
          a: "Elige “Cada N páginas”, pon 1 y cada página se convierte en un PDF propio. Cuando hay más de un archivo de salida también obtienes un ZIP con todos.",
        },
        {
          q: "¿Qué formato admiten los rangos?",
          a: "Valores separados por comas y tramos con guion, por ejemplo “1-3, 5, 8-10”. Los rangos pueden solaparse y se procesan en el orden en que los escribes.",
        },
        {
          q: "¿La división afecta a la calidad?",
          a: "No. Las páginas se copian byte a byte en documentos nuevos, así que el texto sigue siendo seleccionable y las imágenes mantienen su calidad original.",
        },
      ],
      deepDive: [
        {
          heading: "Dividir es el espejo de fusionar — y igual de sin pérdidas",
          paragraphs: [
            "Dividir un PDF produce documentos nuevos que contienen cada uno un subconjunto de las páginas del original. Como en la fusión, la operación trabaja sobre el árbol de páginas: cada documento de salida recibe una lista de referencias apuntando a los objetos de página originales, que se copian tal cual. El contenido de las páginas nunca se re-dibuja ni re-codifica, así que cada salida conserva exactamente la calidad de la fuente — texto seleccionable, fuentes incrustadas, resolución de imágenes, anotaciones.",
            "Hay dos modos comunes de división con intuiciones distintas. La división por rangos (\"páginas 1-5, 6-12\") produce bloques con nombre para distribuir — un capítulo por destinatario, una sección por departamento. La división cada-N-páginas (\"cada 10 páginas\") es la herramienta por lotes para romper un escaneo o una exportación larga en unidades procesables, por ejemplo para satisfacer un límite de tamaño de subida en otro sitio.",
            "Lo que dividir no hace: extraer contenido dentro de una página. Una página que contiene la mitad de tu secreto y la mitad de algo público se queda entera en la salida que le toque. El contenido sensible que comparte página con contenido compartible necesita reorganización a nivel de página (o censura, que es otra operación más exigente) antes de dividir.",
          ],
        },
        {
          heading: "Planificar los cortes: rangos, límites y nombres de archivo",
          paragraphs: [
            "La calidad de una división se decide antes de hacer clic: según dónde trazas los límites. Corta en las costuras estructurales — comienzos de capítulo, saltos de sección, páginas separadoras en blanco — no en conteos arbitrarios de páginas. Un capítulo que empieza a mitad de un bloque molesta más que una distribución ligeramente desigual. Ojear primero el índice o la lista de marcadores del documento es la vía más rápida para hallar puntos de corte naturales.",
            "El nombre importa más de lo esperado. Las salidas de una división tienden a multiplicarse — y seis archivos llamados \"salida_1.pdf\" a \"salida_6.pdf\" garantizan confusión una semana después. Nombra los bloques por contenido (\"contrato-firmas.pdf\", \"anexo-A.pdf\") al producirlos; la división es el momento correcto, porque es cuando sabes exactamente qué contiene cada bloque.",
            "Un hábito para divisiones recurrentes: si divides el mismo documento largo siempre igual (extractos mensuales por cliente, un manual por capítulos), guarda la lista de rangos en una nota y reutilízala. Los rangos son estables mientras el número de páginas de la fuente no cambie — y la nota sirve además como documentación de cómo está organizada la colección.",
          ],
        },
        {
          heading: "Distribuir documentos sin copia de intermediario",
          paragraphs: [
            "Dividir suele preceder a la distribución: enviar el capítulo uno a los revisores, las páginas de facturas a contabilidad, el resumen público al cliente. El documento que se divide es típicamente el máster completo y sensible — lo que hace subirlo a un servicio de división especialmente al revés: entregas el documento entero para producir trozos que piensas regalar de forma selectiva.",
            "Esta herramienta divide por completo en tu navegador: el PDF de origen se analiza en local, los documentos de salida se ensamblan en memoria a partir de las referencias de página que elijas, y cada archivo lo guarda directamente tu dispositivo. El máster nunca sale de tu máquina, así que las partes que mantienes privadas y las que distribuyes se crean bajo exactamente las mismas condiciones de privacidad.",
            "Una consecuencia útil: como las salidas son copias fieles byte a byte de las páginas originales, puedes verificar una división abriendo cualquier salida y comprobando que sus páginas son idénticas al píxel a las páginas correspondientes de la fuente. No hace falta auditoría de calidad — la división es estructural, no generativa, así que no había nada que pudiera degradarse en primer lugar.",
          ],
        },
      ],
    },
    pt: {
      name: "Dividir PDF",
      tagline:
        "Divida um PDF em vários arquivos por contagem fixa de páginas ou por intervalos personalizados — tudo gerado localmente, sem upload.",
      intro: [
        "Divida um PDF longo de duas formas: cortando a cada N páginas (útil para uma página por arquivo ou por capítulos) ou definindo intervalos como “1-3, 4-6, 8” e recebendo um arquivo por intervalo. Vários saídas saem em um ZIP automaticamente.",
        "A divisão roda no seu dispositivo com pdf-lib — os originais ficam intactos e as partes nunca passam por um servidor. Ideal para documentos confidenciais que você prefere não enviar a lugar nenhum.",
      ],
      steps: [
        "Solte o PDF que quer dividir.",
        "Escolha “a cada N páginas” ou “intervalos personalizados” e informe os valores.",
        "Clique em Dividir PDF e baixe cada parte ou o ZIP completo.",
      ],
      faqs: [
        {
          q: "Como dividir um PDF em páginas individuais?",
          a: "Escolha “A cada N páginas”, defina 1 e cada página vira um PDF próprio. Quando há mais de um arquivo de saída, você também recebe um ZIP com todos.",
        },
        {
          q: "Qual é a sintaxe dos intervalos?",
          a: "Valores separados por vírgula e faixas com hífen, por exemplo “1-3, 5, 8-10”. Intervalos podem se sobrepor e são processados na ordem digitada.",
        },
        {
          q: "Dividir reduz a qualidade das páginas?",
          a: "Não. As páginas são copiadas byte a byte para novos documentos, então o texto continua selecionável e as imagens mantêm a qualidade original.",
        },
      ],
      deepDive: [
        {
          heading: "Dividir é o espelho de mesclar — e igualmente sem perdas",
          paragraphs: [
            "Dividir um PDF produz documentos novos que contêm, cada um, um subconjunto das páginas do original. Como na mesclagem, a operação atua na árvore de páginas: cada documento de saída recebe uma lista de referências apontando para os objetos de página originais, que são copiados como estão. O conteúdo das páginas nunca é redesenhado nem recodificado, então cada saída preserva exatamente a qualidade da origem — texto selecionável, fontes embutidas, resolução de imagens, anotações.",
            "Há dois modos comuns de divisão com intuições diferentes. A divisão por faixas (\"páginas 1-5, 6-12\") produz blocos nomeados para distribuir — um capítulo por destinatário, uma seção por departamento. A divisão a cada N páginas (\"a cada 10 páginas\") é a ferramenta de lote para quebrar uma digitalização ou exportação longa em unidades processáveis, por exemplo para satisfazer um limite de tamanho de envio em outro lugar.",
            "O que dividir não faz: extrair conteúdo dentro de uma página. Uma página que contém metade do seu segredo e metade de algo público continua inteira na saída em que cair. Conteúdo sensível que divide a página com conteúdo compartilhável precisa de reorganização no nível da página (ou tarja, que é outra operação mais exigente) antes de dividir.",
          ],
        },
        {
          heading: "Planejar os cortes: faixas, limites e nomeação de arquivos",
          paragraphs: [
            "A qualidade de uma divisão se decide antes do clique: conforme onde você traça os limites. Corte nas costuras estruturais — começos de capítulo, quebras de seção, páginas separadoras em branco — não em contagens arbitrárias. Um capítulo que começa no meio de um bloco incomoda mais que uma distribuição levemente desigual. Folhear primeiro o sumário ou a lista de marcadores do documento é o caminho mais rápido para achar pontos de corte naturais.",
            "O nome importa mais do que se espera. As saídas de uma divisão tendem a se multiplicar — e seis arquivos chamados \"saida_1.pdf\" a \"saida_6.pdf\" garantem confusão uma semana depois. Nomeie os blocos pelo conteúdo (\"contrato-assinaturas.pdf\", \"anexo-A.pdf\") na hora de produzir; a divisão é o momento certo, porque é quando você sabe exatamente o que cada bloco contém.",
            "Um hábito para divisões recorrentes: se você divide o mesmo documento longo sempre do mesmo jeito (extratos mensais por cliente, um manual por capítulo), guarde a lista de faixas numa nota e reutilize. As faixas são estáveis enquanto a contagem de páginas da origem não mudar — e a nota serve ainda como documentação de como o acervo está organizado.",
          ],
        },
        {
          heading: "Distribuir documentos sem cópia de intermediário",
          paragraphs: [
            "Dividir costuma anteceder a distribuição: mandar o capítulo um aos revisores, as páginas de notas fiscais à contabilidade, o resumo público ao cliente. O documento sendo dividido é tipicamente o mestre completo e sensível — o que torna enviá-lo a um serviço de divisão especialmente ao contrário: você entrega o documento inteiro para produzir pedaços que pretende distribuir seletivamente.",
            "Esta ferramenta divide inteiramente no seu navegador: o PDF de origem é analisado localmente, os documentos de saída são montados na memória a partir das referências de página que você escolhe, e cada arquivo é salvo diretamente pelo seu dispositivo. O mestre nunca sai da sua máquina, então as partes que você mantém privadas e as que distribui são criadas sob exatamente as mesmas condições de privacidade.",
            "Uma consequência útil: como as saídas são cópias fiéis byte a byte das páginas originais, você pode verificar uma divisão abrindo qualquer saída e conferindo que suas páginas são idênticas ao pixel às páginas correspondentes da origem. Não é preciso auditoria de qualidade — a divisão é estrutural, não generativa, então não havia nada que pudesse ter se degradado em primeiro lugar.",
          ],
        },
      ],
    },
  },
});
