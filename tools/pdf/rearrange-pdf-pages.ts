import { PdfPagesEngine } from "../_engines/pdf-engine-pages";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "rearrange-pdf-pages",
  category: "pdf",
  icon: "shuffle",
  engine: { component: PdfPagesEngine, props: { op: "rearrange" } },
  related: ["split-pdf", "delete-pdf-pages", "rotate-pdf", "merge-pdf", "pdf-to-jpg", "pdf-to-ppt", "compress-pdf", "ocr-pdf", "pdf-to-text", "jpg-to-pdf"],
  copy: {
    en: {
      name: "Rearrange PDF Pages",
      tagline:
        "Reorder PDF pages visually with live thumbnails — move pages up and down, reverse everything, and export a fresh PDF locally.",
      intro: [
        "Scanned a document out of order? Each page shows up as a real thumbnail, so you can see exactly what you are moving. Shuffle with the arrow buttons, flip the whole document with Reverse, and reset to the original order at any time.",
        "The new sequence is written into a brand-new PDF on your device — pages are copied byte-for-byte, so quality, fonts and selectable text all survive the reshuffle.",
      
        "Reordering uses pdf-lib's copyPages to write pages in your chosen sequence into a brand-new document — nothing is moved inside the original file, so a mistake is fixed by re-uploading, not by repairing damage. Thumbnails render via pdf.js at small scale, just enough to identify each page without slowing the UI.",
        "Compared with deleting pages and re-merging fragments, the thumbnail view plus arrow buttons means a mis-ordered scan is corrected by looking, not by arithmetic. And unlike desktop editors where a shuffle is a modal dialog away, Reverse, move-up and move-down work on the same page list you are already looking at — no separate tool needed.",
      ],
      steps: [
        "Drop the PDF and wait for the page thumbnails to appear.",
        "Move pages with ↑ / ↓, or use Reverse for the opposite order.",
        "Click Apply order & download to get the rearranged PDF.",
      ],
      faqs: [
        {
          q: "Why do very long PDFs show numbers instead of thumbnails for later pages?",
          a: "Thumbnails are pre-rendered for the first 60 pages to keep the browser responsive. Beyond that you still see page numbers and can reorder them exactly the same way.",
        },
        {
          q: "Can I move a page from position 40 to position 2?",
          a: "Yes, but it takes repeated clicks with arrow buttons. For large jumps it is often faster to reverse the document first, or to split it and merge the pieces in a new order.",
        },
        {
          q: "Does reordering affect quality?",
          a: "None at all. Pages are copied unchanged into the new document — only their sequence differs.",
        },
      ],
      deepDive: [
        {
          heading: "Reordering is pure page-tree manipulation",
          paragraphs: [
            "Rearranging pages in a PDF changes exactly one thing: the order of entries in the document's page tree. Page content streams, fonts, images, annotations — all stay byte-identical. Nothing is re-rendered, nothing is re-compressed, and the operation is lossless in the strictest sense: reordering pages and then reordering them back yields a document equivalent to the original.",
            "This makes reordering instantaneous even for huge files, because no page data is touched at all — only the small index that says \"first comes this page, then that one.\" File size barely changes, and quality is identical by definition.",
            "What reordering does not touch: internal links and bookmarks may point to page objects rather than positions, so they typically follow their target page — a link to \"the page containing chapter 3\" stays correct after reordering. But anything that referenced a position (a printed \"see page 12\") does not update itself. Cross-reference checklists apply here just as they do for deletion.",
          ],
        },
        {
          heading: "Thumbnail-first workflows and the mistakes worth avoiding",
          paragraphs: [
            "Working from thumbnails instead of page numbers is the single biggest usability improvement in reordering. Page labels in the viewer often disagree with the real sequence (documents with roman-numeral front matter, chapter-restarted numbering), but thumbnails show content directly. Drag the page you can see, not the number you computed.",
            "The classic mistakes: leaving a duplicate pair of pages after dragging (an appendix inserted twice), and forgetting that blank separator pages may be intentional. A quick flip-through of the final order catches both in seconds. For documents assembled from several sources, also verify page size consistency while you are in there — reordering is the natural moment to notice a stray letter-size page among A4s.",
            "One workflow tip: when fixing a mis-ordered scan (pages fed to the sheet feeder out of order), the correction is usually a few adjacent swaps rather than a full shuffle. Fixing adjacent pairs is fast and low-risk; wholesale re-ordering of a scan should prompt a question about whether the scanner's feeder settings are worth fixing for next time.",
          ],
        },
        {
          heading: "Order fixes without shipping the file anywhere",
          paragraphs: [
            "The documents that need their pages rearranged are routinely whole and sensitive: complete contracts, full application packets, assembled evidence bundles. These are exactly the files you should not upload for a cosmetic fix — sending a complete contract to a reordering site gives that site the entire document, every page, to fix something that takes a drag and a click.",
            "This tool reorders entirely in your browser: the PDF is parsed locally, the page tree index is rewritten in memory, and the reordered file is saved by your device. Not one byte of page content is transmitted, and the operation completes instantly regardless of network state — you can do it in airplane mode.",
            "Because nothing is re-encoded, the output preserves every property of the source: searchable text, embedded fonts, annotations, form fields, metadata. Reordering here is purely structural, which also means you can reorder as many times as needed without any quality concern — the tenth reorder is as lossless as the first.",
          ],
        },
      ],
    },
    zh: {
      name: "PDF 页面重排",
      tagline: "用实时缩略图可视化调整 PDF 页序——上下移动、一键反序、随时恢复原序,在本地导出新文件。",
      intro: [
        "扫描顺序乱了?每一页都会显示真实缩略图,移动前看得一清二楚。用箭头按钮调序,用“反序”整体倒转,也可随时恢复原始顺序。",
        "新顺序会写入一个全新的 PDF,在本地生成——页面按原始字节复制,画质、字体、可选中文字在重排后全部保留。",
      ],
      steps: [
        "拖入 PDF,等待页面缩略图加载。",
        "用 ↑ / ↓ 移动页面,或用“反序”整体倒转。",
        "点击“应用新顺序并下载”,获得重排后的 PDF。",
      ],
      faqs: [
        {
          q: "为什么很长的 PDF 后面的页面只显示数字?",
          a: "为保证浏览器流畅,缩略图最多预渲染前 60 页。之后显示页码,排序操作方式完全相同。",
        },
        {
          q: "能把第 40 页移到第 2 页吗?",
          a: "可以,但需要多次点击箭头。跨度大时,先整体反序,或者拆分后按新顺序合并,往往更快。",
        },
        {
          q: "重排会影响画质吗?",
          a: "完全不会。页面按原样复制到新文档,只有先后顺序不同。",
        },
      ],
      deepDive: [
        {
          heading: "重排是纯粹的页面树操作",
          paragraphs: [
            "重排 PDF 页面只改一件事:文档页面树里条目的顺序。页面内容流、字体、图片、批注——全部逐字节不变。没有任何重渲染、没有任何重压缩,操作在最严格意义上是无损的:把页面重排再排回去,得到的文档与原件等价。",
            "这让重排对大文件也是瞬时的,因为根本没有触碰任何页面数据——改的只是那个说“第一页是这个、接下来是那个”的小索引。文件大小几乎不变,画质按定义完全一致。",
            "重排不碰的东西:内部链接和书签通常指向页面对象而非位置,所以一般会跟着目标页走——“跳到含第三章的页面”这种链接重排后仍然正确。但任何引用位置的(印出来的“见第 12 页”)不会自我更新。交叉引用的检查清单在这里和删页时一样适用。",
          ],
        },
        {
          heading: "以缩略图为主的工作流与值得避开的错误",
          paragraphs: [
            "以缩略图而不是页码为准,是重排体验最大的改进。阅读器里的页码标签常常和真实顺序不一致(罗马数字前置页、按章重新编号的文档),但缩略图直接显示内容。拖你能看见的那一页,别拖你算出来的那个数字。",
            "经典错误:拖动之后留下一对重复页面(附录被插了两遍),以及忘记空白分隔页可能是有意的。对最终顺序快速翻一遍,几秒钟就能抓住这两类。对由多份来源拼装的文档,顺手检查页面尺寸一致性——重排时正是注意到 A4 里混进一张 Letter 的自然时机。",
            "一个工作流提示:修正送错顺序的扫描件(进纸器把页喂乱了)时,通常只是几次相邻交换,不是彻底洗牌。修相邻的对,又快又稳;对扫描件大动干戈重排时,应该顺便想想进纸器设置是否值得修一修,免得下次再乱。",
          ],
        },
        {
          heading: "把文件寄往任何地方之前先排好序",
          paragraphs: [
            "需要重排页面的文档,通常都是完整且敏感的:整份合同、整套申请材料、拼好的证据卷。恰恰是这些文件,不该为了一个表面修整就上传——把一份完整合同传给重排网站,等于把全文档每一页都交给对方,只为修一个拖拽加点击就能解决的事。",
            "本工具完全在浏览器里重排:PDF 本地解析,页面树索引在内存中重写,重排后的文件由你的设备保存。页面内容一个字节都不被传输,操作即时完成,与网络状态无关——飞行模式下照样能用。",
            "因为不重新编码,输出保留源文件的一切属性:可搜索文本、嵌入字体、批注、表单字段、元数据。这里的重排是纯结构操作,也意味着想排多少次都可以,毫无画质顾虑——第十次重排和第一次一样无损。",
          ],
        },
      ],
    },
    ja: {
      name: "PDF ページ並べ替え",
      tagline: "サムネイルを見ながら PDF のページ順を並べ替え。移動・反転・リセットが簡単で、新しい PDF をローカルで書き出します。",
      intro: [
        "スキャンの順番がバラバラ?各ページが実際のサムネイルで表示されるので、動かす対象をひと目で確認できます。矢印ボタンで入れ替え、「逆順」で全体を反転、いつでも元の順序にリセット可能です。",
        "新しい順序は端末上で真新しい PDF に書き込まれます。ページはバイト単位でコピーされるため、品質・フォント・選択可能なテキストはすべてそのまま保たれます。",
      ],
      steps: [
        "PDF をドロップし、サムネイルの表示を待ちます。",
        "↑ / ↓ でページを移動するか、「逆順」で順序を反転します。",
        "「順序を適用してダウンロード」をクリックして PDF を取得します。",
      ],
      faqs: [
        {
          q: "長い PDF で後半のページが数字だけ表示されるのはなぜ?",
          a: "ブラウザを軽く保つため、サムネイルは先頭 60 ページ分のみ生成します。それ以降はページ番号が表示されますが、同じ操作で並べ替えられます。",
        },
        {
          q: "40 ページ目を 2 ページ目に移せますか?",
          a: "可能ですが、矢印の反復クリックが必要です。大きな移動は、まず反転するか、分割してから新しい順に結合するほうが早いことが多いです。",
        },
        {
          q: "並べ替えると画質は変わりますか?",
          a: "まったく変わりません。ページは変更なしで新しい文書へコピーされ、順序だけが変わります。",
        },
      ],
      deepDive: [
        {
          heading: "並べ替えは純粋なページツリー操作",
          paragraphs: [
            "PDF のページ並べ替えが変えるのは一つだけです。文書のページツリーにおける項目の順序。ページのコンテンツストリーム、フォント、画像、注釈——すべてバイト単位で同一のまま。再描画は一切なく、再圧縮も一切なく、この操作は最も厳しい意味で可逆です。ページを並べ替えてまた戻せば、元と等価な文書が得られます。",
            "だから並べ替えは巨大なファイルでも即時です。ページデータはまったく触れず、変わるのは「最初にこのページ、次にあのページ」と告げる小さな索引だけだからです。ファイルサイズはほとんど変わらず、品質は定義上同一です。",
            "並べ替えが触れないもの:内部リンクとしおりは通常、位置ではなくページオブジェクトを指すので、たいてい目標ページに追従します。「第三章を含むページへ」というリンクは並べ替え後も正しいです。しかし位置を参照するもの(印字された「12 ページ参照」)は自分では更新されません。相互参照のチェックリストは、削除と同じくここでも効きます。",
          ],
        },
        {
          heading: "サムネイル主体のワークフローと避けるべき誤り",
          paragraphs: [
            "ページ番号ではなくサムネイルで作業することが、並べ替えの使い心地を最大に改善します。ビューアのページラベルは実際の順序と食い違うことがよくあります(ローマ数字の前付け、章ごとの番号の振り直し)。しかしサムネイルは内容を直接示します。計算した数字ではなく、目で見えるページをドラッグしてください。",
            "定番の誤り:ドラッグの後に重複したページの組を残すこと(別冊が二度挿入された)、そして空白の区切りページが意図的かもしれないことを忘れること。最終順をパラパラめくれば、どちらも数秒で捉えられます。複数のソースから組み立てた文書では、ページサイズの一貫性もついでに確認してください。並べ替えこそ、A4 の中に混ざったレターの一枚に気づく自然な瞬間です。",
            "ワークフローのヒント:順序を誤った走査(給紙装置がページを乱して送った)の修正は、通常、全体のシャッフルではなく隣接する数回の交換です。隣接対の修正は速くリスクが低い。走査を大掛かりに並べ替える場面では、次回に備えて給紙装置の設定を直す価値があるかも問うてください。",
          ],
        },
        {
          heading: "ファイルをどこかへ送る前に順序を直す",
          paragraphs: [
            "ページの並べ替えを必要とする文書は、日常的に全体が揃った機密文書です。完全な契約書、申請一式、組み立てた証拠綴じ。まさにこういうファイルは、表面の修整のためにはアップロードすべきではありません。ドラッグとクリックで済むことを修整するために、契約書の全体を、全ページを、並べ替えサイトに渡すことになるのです。",
            "このツールは並べ替えを完全にブラウザ内で行います。PDF はローカルで解析され、ページツリーの索引はメモリ内で書き直され、並べ替え済みのファイルは端末が保存します。ページ内容のバイトは一つも送信されず、操作はネットワーク状態にかかわらず即時に完了します。機内モードでも使えます。",
            "再符号化がないので、出力はソースのすべての性質を保ちます。検索可能なテキスト、埋め込みフォント、注釈、フォームフィールド、メタデータ。ここでの並べ替えは純粋に構造的であり、それゆえ品質の心配なしに必要なだけ何度でも並べ替えられます。十回目の並べ替えは一回目と同じく可逆です。",
          ],
        },
      ],
    },
    es: {
      name: "Reordenar páginas PDF",
      tagline:
        "Reordena las páginas de un PDF con miniaturas en vivo: súbelas y bájalas, invierte todo el orden y exporta un PDF nuevo en local.",
      intro: [
        "¿Escaneaste un documento desordenado? Cada página aparece como una miniatura real, así que ves exactamente qué mueves. Cambia el orden con las flechas, dale la vuelta con Invertir y vuelve al orden original cuando quieras.",
        "La nueva secuencia se escribe en un PDF nuevo en tu dispositivo: las páginas se copian byte a byte, así que la calidad, las fuentes y el texto seleccionable sobreviven al cambio.",
      ],
      steps: [
        "Suelta el PDF y espera a que aparezcan las miniaturas.",
        "Mueve páginas con ↑ / ↓, o usa Invertir para el orden contrario.",
        "Pulsa Aplicar orden y descargar para obtener el PDF reordenado.",
      ],
      faqs: [
        {
          q: "¿Por qué los PDF muy largos muestran números en lugar de miniaturas al final?",
          a: "Las miniaturas se pregeneran solo para las primeras 60 páginas para mantener el navegador ágil. Después ves números de página y puedes reordenarlos igual.",
        },
        {
          q: "¿Puedo llevar una página de la posición 40 a la 2?",
          a: "Sí, aunque requiere varios clics con las flechas. Para saltos grandes suele ser más rápido invertir el documento primero, o dividirlo y combinar las partes en otro orden.",
        },
        {
          q: "¿Reordenar afecta a la calidad?",
          a: "Ninguna. Las páginas se copian sin cambios al nuevo documento; solo cambia su secuencia.",
        },
      ],
      deepDive: [
        {
          heading: "Reordenar es manipulación pura del árbol de páginas",
          paragraphs: [
            "Reordenar páginas en un PDF cambia exactamente una cosa: el orden de las entradas en el árbol de páginas del documento. Los flujos de contenido, fuentes, imágenes y anotaciones de las páginas — todos quedan idénticos byte a byte. Nada se re-dibuja, nada se re-codifica, y la operación es sin pérdidas en el sentido más estricto: reordenar las páginas y luego devolverlas a su sitio produce un documento equivalente al original.",
            "Esto hace que reordenar sea instantáneo incluso con archivos enormes, porque no se toca ningún dato de página — solo el pequeño índice que dice \"primero esta página, luego esa\". El tamaño del archivo apenas cambia, y la calidad es idéntica por definición.",
            "Lo que reordenar no toca: los enlaces internos y marcadores suelen apuntar a objetos de página en vez de a posiciones, así que normalmente siguen a su página de destino — un enlace a \"la página que contiene el capítulo 3\" sigue correcto tras reordenar. Pero todo lo que referenciaba una posición (un \"ver página 12\" impreso) no se actualiza a sí mismo. La lista de revisión de referencias cruzadas aplica aquí igual que en el borrado.",
          ],
        },
        {
          heading: "Flujos de trabajo con miniaturas y los errores que conviene evitar",
          paragraphs: [
            "Trabajar desde miniaturas en lugar de números de página es la mayor mejora de usabilidad al reordenar. Las etiquetas de página del visor a menudo discrepan con la secuencia real (documentos con preliminares en números romanos, numeración reiniciada por capítulos), pero las miniaturas muestran el contenido directamente. Arrastra la página que ves, no el número que calculaste.",
            "Los errores clásicos: dejar un par de páginas duplicadas tras arrastrar (un anexo insertado dos veces), y olvidar que las páginas separadoras en blanco pueden ser intencionales. Una hojeada rápida del orden final detecta ambas en segundos. En documentos ensamblados de varias fuentes, aprovecha también para verificar la consistencia de tamaños — reordenar es el momento natural para notar una página carta perdida entre las A4.",
            "Un consejo de flujo: al corregir un escaneo con páginas desordenadas (el alimentador metió las hojas fuera de orden), la corrección suele ser unos pocos intercambios adyacentes, no una barajada completa. Corregir pares adyacentes es rápido y de bajo riesgo; reordenar un escaneo a lo grande debería hacerse la pregunta de si conviene ajustar la configuración del alimentador para la próxima vez.",
          ],
        },
        {
          heading: "Corregir el orden sin enviar el archivo a ningún sitio",
          paragraphs: [
            "Los documentos que necesitan reordenar páginas son rutinariamente completos y sensibles: contratos íntegros, paquetes de solicitud completos, expedientes de evidencia montados. Son justo los archivos que no deberías subir para un arreglo cosmético — enviar un contrato completo a un sitio de reordenación le entrega a ese sitio el documento entero, todas las páginas, para arreglar algo que se resuelve con un arrastre y un clic.",
            "Esta herramienta reordena por completo en tu navegador: el PDF se analiza en local, el índice del árbol de páginas se reescribe en memoria y el archivo reordenado lo guarda tu dispositivo. Ni un byte de contenido de página se transmite, y la operación se completa al instante con independencia del estado de la red — puedes hacerlo en modo avión.",
            "Como no se re-codifica nada, la salida conserva cada propiedad de la fuente: texto buscable, fuentes incrustadas, anotaciones, campos de formulario, metadatos. Reordenar aquí es puramente estructural, lo que también significa que puedes reordenar tantas veces como necesites sin preocupación de calidad — la décima reordenación es tan sin pérdidas como la primera.",
          ],
        },
      ],
    },
    pt: {
      name: "Reordenar páginas de PDF",
      tagline:
        "Reordene as páginas de um PDF com miniaturas ao vivo — mova para cima e para baixo, inverta tudo e exporte um novo PDF localmente.",
      intro: [
        "Digitalizou um documento fora de ordem? Cada página aparece como uma miniatura real, então você vê exatamente o que está movendo. Troque com os botões de seta, inverta tudo com Inverter e volte à ordem original quando quiser.",
        "A nova sequência é gravada em um PDF novo no seu dispositivo — as páginas são copiadas byte a byte, então qualidade, fontes e texto selecionável sobrevivem à reorganização.",
      ],
      steps: [
        "Solte o PDF e aguarde as miniaturas aparecerem.",
        "Mova páginas com ↑ / ↓, ou use Inverter para a ordem oposta.",
        "Clique em Aplicar ordem e baixar para receber o PDF reordenado.",
      ],
      faqs: [
        {
          q: "Por que PDFs muito longos mostram números em vez de miniaturas nas páginas finais?",
          a: "As miniaturas são pré-renderizadas só para as primeiras 60 páginas para manter o navegador leve. Depois disso você vê números e pode reordenar exatamente da mesma forma.",
        },
        {
          q: "Posso levar uma página da posição 40 para a 2?",
          a: "Sim, mas exige vários cliques nas setas. Para saltos grandes costuma ser mais rápido inverter o documento primeiro, ou dividir e mesclar as partes em outra ordem.",
        },
        {
          q: "Reordenar afeta a qualidade?",
          a: "Nenhuma. As páginas são copiadas sem alteração para o novo documento — apenas a sequência muda.",
        },
      ],
      deepDive: [
        {
          heading: "Reordenar é manipulação pura da árvore de páginas",
          paragraphs: [
            "Reordenar páginas num PDF muda exatamente uma coisa: a ordem das entradas na árvore de páginas do documento. Os fluxos de conteúdo, fontes, imagens e anotações das páginas — tudo permanece idêntico byte a byte. Nada é redesenhado, nada é recodificado, e a operação é sem perdas no sentido mais estrito: reordenar as páginas e depois devolvê-las ao lugar produz um documento equivalente ao original.",
            "Isso torna a reordenação instantânea mesmo em arquivos enormes, porque nenhum dado de página é tocado — só o pequeno índice que diz \"primeiro esta página, depois aquela\". O tamanho do arquivo mal muda, e a qualidade é idêntica por definição.",
            "O que reordenar não toca: links internos e marcadores costumam apontar para objetos de página em vez de posições, então normalmente seguem sua página de destino — um link para \"a página que contém o capítulo 3\" continua correto depois de reordenar. Mas qualquer coisa que referenciava uma posição (um \"ver página 12\" impresso) não se atualiza sozinho. A checklist de referências cruzadas vale aqui tanto quanto na exclusão.",
          ],
        },
        {
          heading: "Fluxos de trabalho com miniaturas e os erros que valem evitar",
          paragraphs: [
            "Trabalhar a partir de miniaturas em vez de números de página é a maior melhoria de usabilidade na reordenação. Os rótulos de página do visualizador frequentemente discordam da sequência real (documentos com pré-texto em algarismos romanos, numeração reiniciada por capítulo), mas as miniaturas mostram o conteúdo direto. Arraste a página que você vê, não o número que você calculou.",
            "Os erros clássicos: deixar um par de páginas duplicadas depois de arrastar (um anexo inserido duas vezes), e esquecer que páginas separadoras em branco podem ser intencionais. Uma folheada rápida na ordem final pega ambas em segundos. Em documentos montados de várias origens, aproveite também para verificar a consistência de tamanhos — reordenar é o momento natural de notar uma página letter perdida entre as A4.",
            "Uma dica de fluxo: ao corrigir uma digitalização com páginas fora de ordem (o alimentador mandou as folhas na ordem errada), a correção costuma ser algumas trocas adjacentes, não uma embaralhada completa. Corrigir pares adjacentes é rápido e de baixo risco; reordenar uma digitalização por inteiro deveria provocar a pergunta se vale ajustar a configuração do alimentador para a próxima vez.",
          ],
        },
        {
          heading: "Corrigir a ordem sem enviar o arquivo para lugar nenhum",
          paragraphs: [
            "Os documentos que precisam de reordenação são rotineiramente completos e sensíveis: contratos integrais, pacotes de inscrição completos, dossiês de evidência montados. São exatamente os arquivos que você não deveria enviar por um arranjo cosmético — mandar um contrato completo a um site de reordenação entrega a ele o documento inteiro, todas as páginas, para consertar algo que se resolve com um arrastar e um clique.",
            "Esta ferramenta reordena inteiramente no seu navegador: o PDF é analisado localmente, o índice da árvore de páginas é reescrito na memória e o arquivo reordenado é salvo pelo seu dispositivo. Nem um byte de conteúdo de página é transmitido, e a operação se completa instantaneamente independente do estado da rede — dá para fazer em modo avião.",
            "Como nada é recodificado, a saída preserva cada propriedade da origem: texto pesquisável, fontes embutidas, anotações, campos de formulário, metadados. Reordenar aqui é puramente estrutural, o que também significa que você pode reordenar quantas vezes precisar sem preocupação de qualidade — a décima reordenação é tão sem perdas quanto a primeira.",
          ],
        },
      ],
    },
  },
});
