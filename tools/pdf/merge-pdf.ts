import { PdfPagesEngine } from "../_engines/pdf-engine-pages";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "merge-pdf",
  category: "pdf",
  icon: "layers",
  featured: true,
  engine: { component: PdfPagesEngine, props: { op: "merge" } },
  related: ["split-pdf", "rotate-pdf", "compress-pdf", "delete-pdf-pages", "jpg-to-pdf", "pdf-to-ppt", "ocr-pdf", "pdf-to-text", "rearrange-pdf-pages", "page-numbers-pdf"],
  copy: {
    en: {
      name: "Merge PDF",
      tagline:
        "Combine multiple PDFs into one document right in your browser — reorder files freely, no uploads, no watermarks, no signup.",
      intro: [
        "Drop in as many PDFs as you need, arrange them in the exact order you want, and merge them into a single file. Bookings, invoices, scanned chapters, application bundles — anything that arrives as ten separate attachments becomes one tidy document.",
        "Unlike online mergers that upload your files to a server, this tool reads and writes PDFs entirely on your device with pdf-lib. Your contracts, IDs and financial documents never leave your browser.",
        "Under the hood the merge uses pdf-lib's copyPages: every page is copied byte-for-byte from its source document, so text stays selectable, vector graphics stay sharp and embedded fonts, images and color profiles are never re-encoded. The output keeps PDF version 1.7, and files of mixed page sizes — A4 mixed with Letter, portrait with landscape — coexist in one document without rescaling.",
        "Compared with merging via printing to a virtual printer or screenshotting pages, nothing is rasterized here, so the merged file is as small as the sum of its sources and just as crisp. Unlike desktop suites, there is no install, no account and no page-count cap; the practical limit is your device's memory, not a paywall."
      ],
      steps: [
        "Drop two or more PDF files into the box (or click to choose them).",
        "Rearrange the list with the ↑ / ↓ buttons until the order is right.",
        "Click Merge PDFs and download the combined file.",
      ],
      faqs: [
        {
          q: "How many PDFs can I merge, and how large can they be?",
          a: "There is no artificial limit — the practical ceiling is your device's memory. A modern laptop comfortably merges 20+ files or around 100–200 MB total; very large scans may be slower but still work.",
        },
        {
          q: "Will bookmarks, form fields or annotations survive the merge?",
          a: "Page content, images and most annotations are preserved. Document-level extras such as bookmarks and form field values are not carried over — the merged file contains the visual pages of each source.",
        },
        {
          q: "Are my files uploaded anywhere?",
          a: "No. Merging happens locally in your browser with JavaScript. Nothing is sent to any server, and the merged PDF is generated on your own device.",
        },
      ],
      deepDive: [
        {
          heading: "Merging is page-tree surgery, not re-rendering",
          paragraphs: [
            "A common fear about PDF merging is that the tool \"re-processes\" pages — re-encodes images, re-renders text, quietly degrades quality. In a properly built merger, none of that happens. Each PDF's pages live in an internal tree of references, and merging splices those trees into a new document: page order is concatenated, references are renumbered to avoid collisions, but the page content streams, fonts and images themselves are copied byte-for-byte.",
            "That is why a good merge is lossless by construction. Text stays selectable, image resolution stays exactly as it was, vector graphics keep their curves. The output pages are, content-wise, indistinguishable from the input pages — the only thing that changed is the container's table of contents, so to speak.",
            "Two structural realities are worth knowing. First, page numbering restarts: page 1 of document B follows the last page of document A, regardless of any printed labels. Second, bookmarks, links and named destinations may or may not survive depending on how carefully the merger remaps internal references — tools that only splice the page tree can leave internal links dangling.",
          ],
        },
        {
          heading: "Order, duplicates and the pre-merge checklist",
          paragraphs: [
            "Merge order is the order you add files, and it is the single most common mistake: appending the cover page after the appendix. The reliable habit is to name the source files with numeric prefixes (01-contract.pdf, 02-appendix.pdf) so the intended order is visible at a glance and survives any file-picker sorting. Verify the sequence on the merged output before distributing — a two-second flip-through catches what an hour of embarrassment would not.",
            "Mixed page sizes are legal in PDF and merge cleanly, but think about the recipient: a document where A4 pages alternate with US-Letter pages prints badly everywhere. If the sources differ, decide before merging whether to normalize page size afterwards or accept the mix.",
            "One more checklist item: forms. Merging two PDFs that each contain form fields can collide field names — two fields both named \"signature\" may end up sharing one value, so typing in one fills both. Flattening the inputs before merging is the standard cure, because flattened pages carry no field machinery at all.",
          ],
        },
        {
          heading: "Combining documents without uploading either",
          paragraphs: [
            "Merging is most often done to exactly the files that should never be uploaded: the contract plus its annexes, the application plus the ID scan, the medical report plus its imaging summary. Sending both parts to an online merger creates a single combined document on someone else's server — the most complete, most sensitive version of your paperwork, in one convenient file, in their logs.",
            "This tool performs the splice entirely in your browser. Both source PDFs are parsed in JavaScript on your device, the page trees are joined in memory, and the merged file is written straight to your downloads. No part of either document is transmitted, queued or stored anywhere, and the merge works identically with the network cable unplugged.",
            "There is a throughput benefit too: without upload and download round-trips, merging even large files — a 100 MB scanned dossier plus a 50 MB appendix — completes in seconds, limited only by local memory. That makes it practical to merge at the end of every work session, keeping one tidy master file per project instead of scattering fragments across inboxes.",
          ],
        },
      ],
    },
    zh: {
      name: "合并 PDF",
      tagline: "把多个 PDF 合并为一个文件,支持自由排序,全程在浏览器本地完成,不上传、无水印、无需注册。",
      intro: [
        "把需要合并的 PDF 一起拖进来,按想要的顺序排列,一键生成单个文件。机票、发票、扫描章节、申请材料——十个零散附件从此变成一份整齐的文档。",
        "与其他需要上传文件到服务器的在线合并工具不同,本工具通过 pdf-lib 在你的设备上直接读写 PDF。合同、证件、财务文件永远不会离开你的浏览器。",
      ],
      steps: [
        "把两个或更多 PDF 文件拖入方框(或点击选择)。",
        "用 ↑ / ↓ 按钮调整文件顺序,直到排列正确。",
        "点击“合并 PDF”,下载合并后的文件。",
      ],
      faqs: [
        {
          q: "最多能合并多少个 PDF?文件可以多大?",
          a: "没有人为限制,实际取决于设备内存。现代笔记本轻松合并 20 个以上文件或约 100–200 MB 总量;超大扫描件会慢一些,但同样可以完成。",
        },
        {
          q: "书签、表单和批注会保留吗?",
          a: "页面内容、图片和大部分批注会保留。书签、表单填写值等文档级信息不会带入合并结果——合并文件包含每个源文件的页面内容。",
        },
        {
          q: "文件会被上传吗?",
          a: "不会。合并在浏览器中用 JavaScript 本地完成,不会向任何服务器发送数据,合并结果也只在你的设备上生成。",
        },
      ],
      deepDive: [
        {
          heading: "合并是页面树手术,不是重新渲染",
          paragraphs: [
            "对 PDF 合并的常见担心是工具会“重新处理”页面——重编码图片、重渲染文字、悄悄劣化。在一个正确实现的合并器里,这些都不会发生。每个 PDF 的页面存在于一棵内部引用树里,合并就是把这棵树接进新文档:页面顺序拼接、引用重新编号以避免冲突,但页面内容流、字体和图片本身是逐字节复制的。",
            "所以好的合并在构造上就是无损的。文字仍可选中,图片分辨率原封不动,矢量图形保留曲线。就内容而言,输出页面和输入页面无法区分——变化的只是容器的“目录”,可以这么说。",
            "有两个结构事实值得知道。第一,页码重新起算:B 文档的第 1 页跟在 A 文档最后一页之后,和印刷出来的标签无关。第二,书签、链接和命名目标是否幸存,取决于合并器对内部引用的重建是否细致——只拼接页面树的工具,可能让内部链接悬空。",
          ],
        },
        {
          heading: "顺序、重复与合并前检查单",
          paragraphs: [
            "合并顺序就是你添加文件的顺序,这也是最常见的错误:封面被排到了附录后面。可靠的习惯是给源文件加数字前缀(01-合同.pdf、02-附录.pdf),让预期顺序一目了然,而且经得起文件选择器的任何排序。发出前翻一遍合并结果——两秒钟的检查,能避免一小时的尴尬。",
            "页面尺寸混杂在 PDF 里合法,也能干净合并,但想想接收方:A4 和美式 Letter 交替的文档,在哪里打印都难受。如果源文件尺寸不一,合并前就想好是事后归一化页面尺寸,还是接受混杂。",
            "检查单还有一条:表单。两个都含表单字段的 PDF 合并时字段名可能撞车——两个都叫“签名”的字段会共享同一个值,在一处输入,两处同时填上。标准解法是合并前先展平输入,展平的页面不携带任何字段机制。",
          ],
        },
        {
          heading: "不上传任何一份也能合并文档",
          paragraphs: [
            "合并最常发生在最不该上传的文件上:合同加附件、申请表加证件扫描、病历加影像报告。把两部分传给在线合并服务,等于在别人的服务器上生成一份完整的合并文档——你文书里最完整、最敏感的版本,拼成一个方便的文件,躺在他们的日志里。",
            "本工具在浏览器里完成拼接。两份源 PDF 在你设备上的 JavaScript 里解析,页面树在内存中接合,合并后的文件直接写进下载目录。任何一份文档的任何部分都不被传输、排队或存储,拔掉网线,合并照样进行。",
            "吞吐量上也有红利:没有上传下载的往返,即使很大的文件——100 MB 的扫描卷宗加 50 MB 的附录——几秒就能合并完,只受本地内存限制。这让“每次工作收尾就合并一次”变得可行:每个项目留一份整洁的总文件,而不是把碎片散落在各个收件箱里。",
          ],
        },
      ],
    },
    ja: {
      name: "PDF 結合",
      tagline: "複数の PDF をブラウザ内で 1 つに結合。順序は自由に入れ替えでき、アップロード不要・ウォーターマークなし・登録不要です。",
      intro: [
        "必要な PDF をまとめてドラッグし、好きな順番に並べ替えて 1 ファイルに結合。航空券、請求書、スキャンした章、申請書類など、バラバラの添付ファイルを 1 冊にまとめられます。",
        "ファイルをサーバーにアップロードする他のオンライン結合ツールと違い、このツールは pdf-lib で端末上で直接 PDF を読み書きします。契約書や身分証、財務資料がブラウザの外に出ることはありません。",
      ],
      steps: [
        "PDF ファイルを 2 つ以上ボックスにドロップします(クリックで選択も可)。",
        "↑ / ↓ ボタンでリストを並べ替え、順序を確定します。",
        "「PDF を結合」をクリックし、結合ファイルをダウンロードします。",
      ],
      faqs: [
        {
          q: "結合できる PDF の数やサイズに上限はありますか?",
          a: "人为的な制限はありません。実用上の上限は端末のメモリです。最新のノート PC なら 20 ファイル以上・合計 100〜200 MB 程度を快適に結合できます。大きなスキャンデータは時間がかかる場合があります。",
        },
        {
          q: "しおりやフォーム、注釈は保持されますか?",
          a: "ページの内容・画像・多くの注釈は保持されます。しおりやフォーム入力値などの文書単位の情報は引き継がれません。結合後のファイルには各ソースのページが入ります。",
        },
        {
          q: "ファイルはアップロードされますか?",
          a: "いいえ。結合はブラウザ内の JavaScript でローカルに行われ、サーバーには何も送信されません。結果も端末上で生成されます。",
        },
      ],
      deepDive: [
        {
          heading: "結合はページツリーの手術であり、再描画ではない",
          paragraphs: [
            "PDF 結合へのよくある不安は、ツールがページを「再処理」するのではないか——画像の再エンコード、テキストの再描画、静かな劣化——というものです。正しく作られた結合器では、そのどれも起きません。各 PDF のページは内部の参照ツリーに収められており、結合はそのツリーを新しい文書へ接ぎ木する操作です。ページ順は連結され、参照は衝突を避けるために番号を振り直されますが、ページのコンテンツストリーム・フォント・画像そのものはバイト単位でコピーされます。",
            "だから良い結合は構造的に可逆です。テキストは選択可能のまま、画像の解像度は元のまま、ベクタグラフィックは曲線を保ちます。内容という点では、出力ページと入力ページを区別できません。変わったのは容器の目次だけ、と言えばよいでしょう。",
            "知っておくべき構造的事実が二つあります。第一にページ番号は振り直しになります。文書 B の 1 ページは、印字ラベルとは無関係に文書 A の最終ページの後ろに付きます。第二に、しおり・リンク・名前付き宛先が生き残るかは、結合器の内部参照の張り直しが丁寧かどうかに依存します。ページツリーだけを継ぎ合わせるツールは、内部リンクを宙吊りにし得ます。",
          ],
        },
        {
          heading: "順序・重複と結合前チェックリスト",
          paragraphs: [
            "結合順はファイルを追加した順であり、これが最もよくあるミスです。カバーを付録の後ろに回してしまう。確実な習慣は、ソースファイルに番号接頭辞を付けることです(01-契約書.pdf、02-別冊.pdf)。意図した順が一目で見え、ファイルピッカーのどんな並び順にも耐えます。配布前に結合結果をパラパラ確認してください——2 秒のめくりが、1 時間の赤面を防ぎます。",
            "ページサイズの混在は PDF として合法で、きれいに結合できます。ただし受け取り手のことを考えてください。A4 とレターが交互に出る文書は、どこで印刷しても苦労します。ソースのサイズが違うなら、後で正規化するか混在を認めるかを結合前に決めてください。",
            "チェックリストのもう一つはフォームです。フォームフィールドを持つ PDF 同士の結合ではフィールド名が衝突し得ます。両方「signature」という名前のフィールドは一つの値を共有し、片方に打つと両方に反映されます。定番の対処は結合前にフラット化することで、フラット化済みページはフィールド機構を一切持ちません。",
          ],
        },
        {
          heading: "どちらもアップロードせずに文書を結合する",
          paragraphs: [
            "結合が最もよく行われるのは、まさにアップロードすべきでないファイルです。契約書とその別冊、申込書と身分証スキャン、診療記録と画像報告。両方をオンライン結合器へ送ることは、他人のサーバー上に結合済みの一文書を作ることです。あなたの書類の最も完全で最も機密性の高い版が、都合の良い一ファイルにまとまり、相手のログに残ります。",
            "このツールはブラウザ内で接合を完結させます。二つのソース PDF は端末上の JavaScript で解析され、ページツリーはメモリ内で接合され、結合ファイルはダウンロードへ直に書き込まれます。どちらの文書のどの部分も送信・待機・保存されず、網線を抜いても同じように動きます。",
            "スループットの利点もあります。アップロードとダウンロードの往復がないので、大きなファイル——100 MB の走査資料と 50 MB の別冊——でも数秒で結合でき、制約はローカルメモリだけです。これにより「作業の区切りごとに結合する」運用が現実になり、断片を受信箱に散らさず、プロジェクトごとに整ったマスターファイルを一つ保てます。",
          ],
        },
      ],
    },
    es: {
      name: "Combinar PDF",
      tagline:
        "Une varios PDF en un solo documento directamente en tu navegador: reordena los archivos libremente, sin subirlos, sin marcas de agua y sin registro.",
      intro: [
        "Arrastra todos los PDF que necesites, ordénalos como quieras y combínalos en un único archivo. Reservas, facturas, capítulos escaneados o dossiers de solicitud: diez adjuntos sueltos pasan a ser un documento ordenado.",
        "A diferencia de otras herramientas que suben tus archivos a un servidor, esta lee y escribe los PDF en tu propio dispositivo con pdf-lib. Tus contratos, documentos de identidad y datos financieros nunca salen del navegador.",
      ],
      steps: [
        "Suelta dos o más archivos PDF en el recuadro (o haz clic para elegirlos).",
        "Reordena la lista con los botones ↑ / ↓ hasta dejar el orden correcto.",
        "Pulsa Combinar PDF y descarga el archivo resultante.",
      ],
      faqs: [
        {
          q: "¿Cuántos PDF puedo combinar y de qué tamaño?",
          a: "No hay límite artificial: el tope práctico es la memoria de tu equipo. Un portátil actual combina sin problemas más de 20 archivos o unos 100–200 MB en total; los escaneos muy grandes tardan más pero también funcionan.",
        },
        {
          q: "¿Se conservan los marcadores, formularios y anotaciones?",
          a: "El contenido de las páginas, las imágenes y la mayoría de anotaciones se conservan. Los marcadores y los valores de formularios no se transfieren: el archivo combinado contiene las páginas visibles de cada original.",
        },
        {
          q: "¿Mis archivos se suben a algún sitio?",
          a: "No. La combinación ocurre localmente en tu navegador con JavaScript. No se envía nada a ningún servidor y el PDF resultante se genera en tu propio dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Fusionar es cirugía del árbol de páginas, no re-dibujado",
          paragraphs: [
            "Un miedo común sobre la fusión de PDFs es que la herramienta \"re-procesa\" las páginas — re-codifica imágenes, vuelve a dibujar texto, degrada discretamente la calidad. En un fusionador bien construido, nada de eso ocurre. Las páginas de cada PDF viven en un árbol interno de referencias, y fusionar empalma esos árboles en un documento nuevo: el orden de páginas se concatena, las referencias se renumera para evitar colisiones, pero los flujos de contenido, fuentes e imágenes de las páginas se copian byte a byte.",
            "Por eso una buena fusión es sin pérdidas por construcción. El texto sigue seleccionable, la resolución de las imágenes queda exactamente como estaba, los gráficos vectoriales conservan sus curvas. En cuanto al contenido, las páginas de salida son indistinguibles de las de entrada — lo único que cambió es, por así decirlo, la tabla de contenidos del contenedor.",
            "Dos realidades estructurales conviene conocer. Primera: la numeración se reinicia — la página 1 del documento B va tras la última página del documento A, sin importar las etiquetas impresas. Segunda: los marcadores, enlaces y destinos con nombre sobreviven o no según lo cuidadosamente que el fusionador remapee las referencias internas — herramientas que solo empalman el árbol de páginas pueden dejar enlaces internos colgando.",
          ],
        },
        {
          heading: "Orden, duplicados y la lista previa a fusionar",
          paragraphs: [
            "El orden de fusión es el orden en que añades los archivos, y es el error más habitual: la portada acaba tras el anexo. El hábito fiable es nombrar los archivos de origen con prefijos numéricos (01-contrato.pdf, 02-anexo.pdf) para que el orden previsto se vea de un vistazo y sobreviva a cualquier ordenación del selector de archivos. Repasa la secuencia del resultado antes de distribuirlo — una hojeada de dos segundos evita una hora de vergüenza.",
            "Los tamaños de página mezclados son legales en PDF y se fusionan limpiamente, pero piensa en el destinatario: un documento donde se alternan páginas A4 y carta imprime mal en todas partes. Si los orígenes difieren, decide antes de fusionar si normalizarás el tamaño después o aceptarás la mezcla.",
            "Otro punto de la lista: formularios. Fusionar dos PDFs que contienen campos de formulario puede colisionar nombres — dos campos llamados ambos \"firma\" pueden acabar compartiendo un valor, de modo que escribir en uno rellena ambos. La cura estándar es aplanar las entradas antes de fusionar, porque las páginas aplanadas no llevan maquinaria de campos alguna.",
          ],
        },
        {
          heading: "Combinar documentos sin subir ninguno",
          paragraphs: [
            "La fusión se hace casi siempre con justo los archivos que jamás deberían subirse: el contrato más sus anexos, la solicitud más el escaneo del DNI, el informe médico más el resumen de imágenes. Enviar ambas partes a un servicio online crea un único documento combinado en el servidor de otra persona — la versión más completa y más sensible de tu papeleo, en un archivo conveniente, en sus registros.",
            "Esta herramienta hace el empalme por completo en tu navegador. Los dos PDF de origen se analizan en JavaScript en tu dispositivo, los árboles de páginas se unen en memoria y el archivo fusionado se escribe directamente en tus descargas. Ninguna parte de ningún documento se transmite, encola o guarda, y la fusión funciona igual con el cable de red desconectado.",
            "También hay un beneficio de rendimiento: sin los viajes de subida y bajada, fusionar incluso archivos grandes — un expediente escaneado de 100 MB más un anexo de 50 MB — tarda segundos, limitado solo por la memoria local. Eso hace práctico fusionar al final de cada sesión de trabajo, manteniendo un archivo maestro ordenado por proyecto en vez de esparcir fragmentos por bandejas de entrada.",
          ],
        },
      ],
    },
    pt: {
      name: "Mesclar PDF",
      tagline:
        "Junte vários PDFs em um único documento direto no navegador — reordene os arquivos livremente, sem upload, sem marca d'água e sem cadastro.",
      intro: [
        "Arraste quantos PDFs precisar, organize na ordem exata que quiser e mescle tudo em um arquivo só. Reservas, notas fiscais, capítulos escaneados, documentos de candidatura — dez anexos soltos viram um documento organizado.",
        "Diferente das ferramentas online que enviam seus arquivos para um servidor, esta lê e grava PDFs no seu próprio dispositivo com pdf-lib. Seus contratos, documentos e dados financeiros nunca saem do navegador.",
      ],
      steps: [
        "Solte dois ou mais arquivos PDF na área (ou clique para escolher).",
        "Reordene a lista com os botões ↑ / ↓ até ficar na ordem certa.",
        "Clique em Mesclar PDFs e baixe o arquivo combinado.",
      ],
      faqs: [
        {
          q: "Quantos PDFs posso mesclar e qual o tamanho máximo?",
          a: "Não há limite artificial — o teto prático é a memória do seu aparelho. Um notebook moderno mescla tranquilamente mais de 20 arquivos ou cerca de 100–200 MB no total; digitalizações muito grandes demoram mais, mas funcionam.",
        },
        {
          q: "Marcadores, formulários e anotações são mantidos?",
          a: "O conteúdo das páginas, imagens e a maioria das anotações são preservados. Marcadores e valores de formulários não são transferidos — o arquivo mesclado contém as páginas visíveis de cada original.",
        },
        {
          q: "Meus arquivos são enviados para algum servidor?",
          a: "Não. A mesclagem acontece localmente no seu navegador com JavaScript. Nada é enviado a nenhum servidor e o PDF resultante é gerado no seu próprio dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Mesclar é cirurgia na árvore de páginas, não redesenho",
          paragraphs: [
            "Um medo comum sobre mesclar PDFs é que a ferramenta \"reprocessa\" as páginas — recodifica imagens, redesenha texto, degrada qualidade por baixo. Num mesclador bem construído, nada disso acontece. As páginas de cada PDF vivem numa árvore interna de referências, e mesclar emenda essas árvores num documento novo: a ordem das páginas é concatenada, as referências são renumeradas para evitar colisões, mas os fluxos de conteúdo, fontes e imagens das páginas são copiados byte a byte.",
            "Por isso uma boa mesclagem é sem perdas por construção. O texto continua selecionável, a resolução das imagens fica exatamente como estava, os gráficos vetoriais mantêm suas curvas. Em termos de conteúdo, as páginas de saída são indistinguíveis das de entrada — a única coisa que mudou é, por assim dizer, o índice do contêiner.",
            "Duas realidades estruturais valem saber. Primeira: a numeração recomeça — a página 1 do documento B vem depois da última página do documento A, independentemente dos rótulos impressos. Segunda: marcadores, links e destinos nomeados sobrevivem ou não dependendo de quão cuidadosamente o mesclador remapeia as referências internas — ferramentas que só emendam a árvore de páginas podem deixar links internos pendurados.",
          ],
        },
        {
          heading: "Ordem, duplicatas e a checklist pré-mesclagem",
          paragraphs: [
            "A ordem de mesclagem é a ordem em que você adiciona os arquivos, e é o erro mais comum: a capa acaba depois do anexo. O hábito confiável é nomear os arquivos de origem com prefixos numéricos (01-contrato.pdf, 02-anexo.pdf) para que a ordem pretendida fique visível de relance e sobreviva a qualquer ordenação do seletor de arquivos. Confira a sequência no resultado antes de distribuir — uma folheada de dois segundos evita uma hora de constrangimento.",
            "Tamanhos de página misturados são legais no PDF e mesclam limpo, mas pense no destinatário: um documento em que páginas A4 se alternam com letter imprime mal em todo lugar. Se as origens diferem, decida antes de mesclar se vai normalizar o tamanho depois ou aceitar a mistura.",
            "Mais um item da checklist: formulários. Mesclar dois PDFs que têm campos de formulário pode colidir nomes — dois campos ambos chamados \"assinatura\" podem acabar compartilhando um valor, então digitar num preenche os dois. A cura padrão é achatar as entradas antes de mesclar, porque páginas achatadas não carregam maquinaria de campos nenhuma.",
          ],
        },
        {
          heading: "Combinar documentos sem enviar nenhum",
          paragraphs: [
            "A mesclagem é feita quase sempre com exatamente os arquivos que jamais deveriam ser enviados: o contrato mais os anexos, a inscrição mais o scan do documento, o laudo médico mais o resumo de imagens. Enviar as duas partes a um serviço online cria um único documento combinado no servidor de outra pessoa — a versão mais completa e mais sensível do seu papelório, num arquivo conveniente, nos registros deles.",
            "Esta ferramenta faz a emenda inteira no seu navegador. Os dois PDFs de origem são analisados em JavaScript no seu dispositivo, as árvores de páginas se juntam em memória e o arquivo mesclado é escrito direto nos seus downloads. Nenhuma parte de nenhum documento é transmitida, colocada em fila ou guardada, e a mesclagem funciona igual com o cabo de rede desconectado.",
            "Há também um benefício de vazão: sem as idas e vindas de envio e recebimento, mesclar até arquivos grandes — um dossiê digitalizado de 100 MB mais um anexo de 50 MB — leva segundos, limitado só pela memória local. Isso torna prático mesclar no fim de cada sessão de trabalho, mantendo um arquivo mestre organizado por projeto em vez de espalhar fragmentos por caixas de entrada.",
          ],
        },
      ],
    },
  },
});
