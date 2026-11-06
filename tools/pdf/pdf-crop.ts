import { PdfCropEngine } from "../_engines/pdf-engine-crop";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "pdf-crop",
  category: "pdf",
  icon: "crop",
  engine: { component: PdfCropEngine },
  related: ["rotate-pdf", "split-pdf", "merge-pdf", "compress-pdf", "delete-pdf-pages", "page-numbers-pdf", "pdf-to-jpg", "watermark-pdf"],
  copy: {
    en: {
      name: "Crop PDF",
      tagline:
        "Crop PDF pages by dragging a rectangle on a live preview — trim margins or scan borders for all pages or a custom page list, entirely in your browser.",
      intro: [
        "Scanners add wide borders, slides come with black frames, and presentations carry more whitespace than the screen allows. Drag a rectangle on the rendered first page, or fine-tune the left, top, width and height percentages with number inputs, and the choice is applied to every page or just the ones you list, such as “1-3, 7”.",
        "The crop is written as the PDF crop box with pdf-lib: viewers and printers then show only the chosen region while the original content stays in the file, so nothing is destroyed and the trim can be undone by resetting the box. No upload, no rasterization — text stays selectable and quality is untouched.",
      
        "The crop is written to the page's CropBox — the field PDF viewers and printers actually honor — with pdf-lib, so the 'removed' margin stays in the file and the trim is reversible by resetting the box. Because the content stream is untouched, text stays selectable and image quality is unchanged; nothing is rasterized.",
        "Compared with cropping in a raster editor (which turns each page into a flat image), a CropBox trim preserves vectors, fonts and selectable text — a cropped contract still signs properly. And unlike Acrobat's crop dialog, the visual rectangle on the first page plus numeric inputs make the same trim easy to apply to odd page ranges.",
      ],
      steps: [
        "Drop the PDF and review the page 1 preview.",
        "Drag a rectangle over the area to keep, or type exact percentages below the preview.",
        "Choose all pages or a custom list, then click Crop PDF and download the result.",
      ],
      faqs: [
        {
          q: "Is the crop destructive?",
          a: "No. The crop box only changes which region is displayed and printed; the underlying content stays in the file. A reader that resets the crop box to the media box shows the full original page again.",
        },
        {
          q: "Why does the preview show page 1 only?",
          a: "The rectangle is defined as percentages of the page, so it scales to every target page even when sizes differ. Page 1 is a live rendering via pdf.js, and the four number inputs give exact control if dragging is not precise enough.",
        },
        {
          q: "What coordinate system does the crop use?",
          a: "You work in screen space (percentages from the top-left, like the canvas preview), and the tool converts to the PDF coordinate space where the origin is bottom-left — the flip is handled automatically.",
        },
      ],
      deepDive: [
        {
          heading: "What cropping a PDF actually changes — and what it doesn't",
          paragraphs: [
            "Cropping a PDF does not delete anything by default — it changes the page's crop box, the rectangle telling viewers which portion of the page to display and print. The full content still exists outside the visible area; a reader with tools, or an aggressive copy-paste, can reach content you thought you had cut off. This is fundamentally different from image cropping, where pixels outside the frame are truly gone.",
            "For hiding sensitive margins (a fax header, a scanned annotation on the edge), a crop-box change is cosmetic. For the everyday use cases — trimming scanner borders, removing whitespace from slides, matching a printer's printable area — it is exactly the right tool, because it preserves everything while changing how the page is framed.",
            "When you truly need content gone, crop is not enough: rasterize the page (as the compress tool does) after cropping, or delete the page entirely. The safe mental model: cropping hides, rasterizing burns, deleting removes. Choose per intent, and remember the distinction when the document is going to an untrusted recipient.",
          ],
        },
        {
          heading: "Margins, consistency and how to pick the rectangle",
          paragraphs: [
            "The most common cropping job is scanner shavings: black edges, skewed margins, and the shadow line of the scanner lid. For a multi-page scan, cropping each page individually is tedious and produces inconsistent page sizes — a document whose pages subtly differ in dimension prints and reads worse. Cropping all pages with one shared rectangle keeps the document uniform; per-page cropping makes sense only when pages genuinely differ, like mixed-orientation bundles.",
            "A useful trick for text documents: crop conservatively rather than tightly. Cutting a bit of outer whitespace costs nothing, but cutting into the live area clips ascenders, footnotes or header text. Zoom to the tightest content on the worst page first, then add a small safety margin — documents almost always have one page whose content extends further than the rest.",
            "Remember that crop also interacts with printing: PDF viewers usually fit the cropped page to the sheet, so a tightly cropped A4 page printed on A4 paper enlarges slightly, changing text size. If the output must print at exact original scale, keep enough margin that the cropped size matches a standard paper size.",
          ],
        },
        {
          heading: "Cropping locally when the pages are private",
          paragraphs: [
            "Documents that need cropping are usually scans of originals you hold: contracts, letters, certificates, receipts. Uploading them to an online cropper hands the full un-cropped image — including whatever you intend to cut away — to that service. It is a small irony of privacy work: the step meant to tidy a document becomes the step that exposes it most completely.",
            "This tool applies the crop boxes entirely in your browser: pages are parsed locally, the new rectangles are written into the document structure, and the result is saved by your own device. Nothing is transmitted, and the original file on disk is never touched — you always keep the un-cropped source in case you need to adjust the rectangle later.",
            "Because cropping here is metadata-level and lossless, it is also instant even for large files — there is no re-encoding pass. That makes it practical to iterate: crop, view, refine, re-crop, without waiting. Pair it with the delete-pages tool for a full \"clean up a scan\" workflow that never leaves your machine.",
          ],
        },
      ],
    },
    zh: {
      name: "裁剪 PDF",
      tagline: "在实时预览上拖出矩形裁剪 PDF 页面——去掉页边距或扫描黑边,可应用到所有页或指定页码,全程在浏览器完成。",
      intro: [
        "扫描件带大片白边,胶片扫描有黑框,演示文稿的留白常常超出屏幕需要。在渲染好的第一页上拖出矩形,或用数字输入框精确设置左、上、宽、高百分比,即可应用到每一页,也可以只指定部分页面,如“1-3, 7”。",
        "裁剪以 PDF 裁剪框(crop box)方式通过 pdf-lib 写入:阅读器和打印机只显示所选区域,原始内容仍保留在文件中,不破坏任何数据,重置裁剪框即可还原。无需上传、不栅格化——文字仍可选中,画质不受影响。",
      ],
      steps: [
        "拖入 PDF,查看第 1 页预览。",
        "在预览上拖出要保留的区域,或在预览下方输入精确的百分比。",
        "选择所有页或自定义页码,点击“裁剪 PDF”并下载结果。",
      ],
      faqs: [
        {
          q: "裁剪会破坏内容吗?",
          a: "不会。裁剪框只改变显示和打印的区域;底层内容仍保留在文件里。把裁剪框重置为媒体框,就能重新看到完整的原始页面。",
        },
        {
          q: "为什么预览只有第 1 页?",
          a: "裁剪矩形按页面百分比定义,会自动缩放适配每个目标页,即使各页尺寸不同也没问题。第 1 页由 pdf.js 实时渲染;拖拽不够精确时,四个数字输入框可以精确控制。",
        },
        {
          q: "裁剪用的是什么坐标系?",
          a: "你操作的是屏幕坐标(从左上角起算的百分比,与 canvas 预览一致),工具会自动换算到原点在左下角的 PDF 坐标系——翻转逻辑已内置。",
        },
      ],
      deepDive: [
        {
          heading: "裁剪 PDF 到底改了什么,没改什么",
          paragraphs: [
            "裁剪 PDF 默认不删除任何东西——它改的是页面的裁剪框,即告诉阅读器显示和打印页面哪一部分的矩形。完整内容仍然存在于可见区域之外;有工具的读者,或者一次激进的复制粘贴,就能碰到你以为已经裁掉的内容。这和图片裁剪有本质区别:图片框外像素是真的没了。",
            "想藏起敏感的页边内容(传真头、扫描在边缘的批注),改裁剪框只是化妆。而日常场景——修剪扫描边框、去掉幻灯片留白、适配打印机可打印区域——裁剪框恰恰是正确的工具,因为它在改变页面取景的同时保留一切。",
            "真的需要内容消失时,裁剪不够:先裁剪、再栅格化(压缩工具那种做法),或整页删除。安全的思维模型:裁剪是藏,栅格化是烧,删除是移除。按意图选择,并且当文档要交给不受信任的接收方时,记住这个区别。",
          ],
        },
        {
          heading: "边距、一致性与怎么选矩形",
          paragraphs: [
            "最常见的裁剪活是扫描碎边:黑边、歪斜的页边、扫描仪盖的阴影线。多页扫描逐页裁既繁琐,又会产出尺寸不一的页面——页面尺寸有细微差别的文档,打印和阅读体验都更差。所有页共用一个矩形裁剪,文档保持统一;只有页面确实不同时(横竖混排的册子)才值得逐页裁。",
            "文字文档有个实用技巧:宁松勿紧。多裁一点外围留白零成本,裁进正文区就会切掉字母上伸部、脚注或页眉。先缩放到内容最“出格”的那一页,找到最紧的内容边界,再加一小圈安全余量——文档几乎总有一页的内容比其他页伸得更远。",
            "还要记住裁剪和打印的相互作用:阅读器通常把裁剪后的页面缩放到纸张大小,所以一张裁得很紧的 A4 页在 A4 纸上打印会略微放大,字号随之改变。如果输出必须按原比例精确打印,留足边距,让裁剪后的尺寸仍然对应标准纸型。",
          ],
        },
        {
          heading: "页面涉及隐私时,本地裁剪",
          paragraphs: [
            "需要裁剪的文档通常是你手里原件的扫描:合同、信件、证书、票据。上传给在线裁剪工具,等于把完整的未裁剪图像——包括你打算裁掉的部分——交给了那项服务。隐私工作里的一个小讽刺:本想让文档整洁的一步,成了暴露最彻底的一步。",
            "本工具完全在浏览器里应用裁剪框:页面在本地解析,新矩形写进文档结构,结果由你自己的设备保存。什么都不传输,磁盘上的原文件也从不被改动——原封未裁的源文件始终在你手里,以后想调整矩形随时可以。",
            "因为这里的裁剪是元数据层、无损的,对大文件也是瞬时完成——没有重新编码的过程。所以可以放心迭代:裁、看、调、再裁,零等待。配合删页工具,就是一套完整的“清理扫描件”工作流,全程不出你的机器。",
          ],
        },
      ],
    },
    ja: {
      name: "PDF 切り抜き",
      tagline: "プレビュー上でドラッグして PDF のページを切り抜き — 余白やスキャンの黒枠を全ページまたは指定ページだけトリミング、処理はすべてブラウザ内です。",
      intro: [
        "スキャンには大きな余白が付き、スライドには黒枠が残り、資料には画面より多い余白が含まれがちです。レンダリングされた 1 ページ目で矩形をドラッグするか、左・上・幅・高さのパーセントを数値入力で微調整すると、全ページまたは「1-3, 7」のような指定ページに適用できます。",
        "切り抜きは pdf-lib で PDF のクロップボックスとして書き込まれます。ビューアやプリンターは選択領域だけを表示しますが、元の内容はファイルに残るため、データは失われず、ボックスをリセットすれば元に戻せます。アップロードもラスター化も不要で、テキストは選択可能、品質もそのままです。",
      ],
      steps: [
        "PDF をドロップし、1 ページ目のプレビューを確認します。",
        "残したい範囲をドラッグするか、プレビュー下の数値で正確なパーセントを入力します。",
        "全ページか指定ページを選び、「PDF を切り抜き」をクリックしてダウンロードします。",
      ],
      faqs: [
        {
          q: "切り抜きは元のデータを壊しますか?",
          a: "いいえ。クロップボックスは表示・印刷の範囲を変えるだけで、内容はファイルに残ります。ビューアでクロップボックスをメディアボックスに戻すと、元のページ全体が再び表示されます。",
        },
        {
          q: "プレビューが 1 ページ目だけなのはなぜですか?",
          a: "矩形はページに対するパーセントで定義されるため、ページごとにサイズが違っても自動でスケールします。1 ページ目は pdf.js でリアルタイム描画されており、ドラッグで精度が足りない場合は 4 つの数値入力で正確に指定できます。",
        },
        {
          q: "切り抜きの座標系はどうなっていますか?",
          a: "操作は画面座標(左上起点のパーセント、canvas プレビューと同じ)で行い、原点が左下の PDF 座標系への変換はツールが自動で処理します。",
        },
      ],
      deepDive: [
        {
          heading: "PDF の切り抜きが実際に変えるもの、変えないもの",
          paragraphs: [
            "PDF の切り抜きは既定では何も削除しません。変更するのはページのクロップボックス、つまりビューアにページのどの範囲を表示・印刷させるかを伝える長方形です。完全な内容は可視範囲の外にまだ存在します。道具を持つ読者や、強引なコピー&ペーストで、切り取ったつもりの内容に到達できてしまいます。これは画像の切り抜きとは根本的に違います。画像では枠外のピクセルは本当に消えます。",
            "機密性のある余白(ファックスのヘッダー、端に走査された注記)を隠す目的には、クロップボックスの変更は化粧にすぎません。日常的な用途——走査の縁の刈り込み、スライドの余白除去、プリンタの印刷可能領域への適合——にはまさに正しい道具です。すべてを保ちながら、ページの枠取りだけを変えるからです。",
            "本当に内容を消す必要があるなら、切り抜きでは足りません。切り抜いた後にラスタライズする(圧縮ツールの方式)か、ページごと削除してください。安全な思考モデルはこうです。切り抜きは隠す、ラスタライズは焼く、削除は除く。意図に応じて選び、文書を信頼できない受け手へ渡すときはこの区別を忘れないでください。",
          ],
        },
        {
          heading: "余白、一貫性、長方形の選び方",
          paragraphs: [
            "最も多い切り抜きの仕事は走査の削りカスです。黒い縁、傾いた余白、走査器の蓋の影の線。複数ページの走査を一枚ずつ切るのは手間がかかる上、寸法の微妙に違うページを量産します。ページ寸法が揃わない文書は印刷でも読書でも品質が落ちます。全ページを一つの共通長方形で切れば文書は均一に保たれます。ページごとの切り抜きが意味を持つのは、縦横混在の綴じ込みのようにページが本当に異なる場合だけです。",
            "文字文書には実用的な心得があります。 tight より保守的に切ることです。外側の余白を少し削るのは無 cost ですが、本文領域に食い込むとアセンダ、脚注、ヘッダーの文字が切れます。まず内容が最もはみ出している頁を拡大して最も tight な境界を見つけ、そこに小さな安全余量を足します。文書はほぼ必ず、他のページより内容が遠くまで伸びた一頁を持つものです。",
            "切り抜きと印刷の相互作用も覚えておいてください。ビューアは通常、切り抜かれたページを用紙に合わせます。tight に切った A4 ページを A4 紙に印刷するとわずかに拡大され、文字サイズが変わります。原寸どおりの印刷が要るなら、切り抜き後の寸法が標準用紙に対応するよう余白を十分に残してください。",
          ],
        },
        {
          heading: "ページが私的なときはローカルで切り抜く",
          paragraphs: [
            "切り抜きが必要な文書は、通常、あなたの手元にある原本の走査です。契約書、手紙、証明書、領収書。オンラインの切り抜きサービスにアップロードすることは、切り取るつもりの部分を含む完全な未加工画像をそのサービスへ渡すことです。プライバシー作業の皮肉な一点:文書を整えるはずの一歩が、最も丸ごと露出する一歩になります。",
            "このツールはクロップボックスを完全にブラウザ内で適用します。ページはローカルで解析され、新しい長方形は文書構造に書き込まれ、結果は端末自身が保存します。何も送信されず、ディスク上の元ファイルも決して触れられません。未切り抜きのソースは常に手元に残り、後から長方形を調整し直せます。",
            "ここでの切り抜きはメタデータ階層で可逆なため、大きなファイルでも即時に終わります。再エンコードの工程がないからです。だから反復が現実的です。切り抜き、確認、調整、再切り抜きを待ち時間ゼロで。削除ツールと組み合わせれば、端末から一歩も出ない「走査の清掃」ワークフローが完成します。",
          ],
        },
      ],
    },
    es: {
      name: "Recortar PDF",
      tagline:
        "Recorta páginas de un PDF arrastrando un rectángulo sobre una vista previa en vivo — recorta márgenes o bordes de escaneo en todas las páginas o en una lista personalizada, todo en tu navegador.",
      intro: [
        "Los escáneres añaden bordes anchos, las diapositivas traen marcos negros y las presentaciones llevan más espacio en blanco del que la pantalla necesita. Arrastra un rectángulo sobre la primera página renderizada, o ajusta los porcentajes de izquierda, arriba, ancho y alto con campos numéricos, y aplícalo a todas las páginas o solo a las que enumeres, como “1-3, 7”.",
        "El recorte se escribe como crop box del PDF con pdf-lib: los visores y las impresoras muestran solo la zona elegida mientras el contenido original queda en el archivo, así que no se destruye nada y el recorte se deshace restableciendo el cuadro. Sin subidas ni rasterización: el texto sigue siendo seleccionable y la calidad no cambia.",
      ],
      steps: [
        "Suelta el PDF y revisa la vista previa de la página 1.",
        "Arrastra un rectángulo sobre la zona a conservar, o escribe porcentajes exactos bajo la vista previa.",
        "Elige todas las páginas o una lista personalizada, pulsa Recortar PDF y descarga el resultado.",
      ],
      faqs: [
        {
          q: "¿El recorte es destructivo?",
          a: "No. El crop box solo cambia qué zona se muestra e imprime; el contenido subyacente sigue en el archivo. Un lector que restablezca el crop box al media box vuelve a mostrar la página original completa.",
        },
        {
          q: "¿Por qué la vista previa muestra solo la página 1?",
          a: "El rectángulo se define en porcentajes de la página, así que escala a cada página objetivo aunque tengan tamaños distintos. La página 1 se renderiza en vivo con pdf.js, y los cuatro campos numéricos dan control exacto si arrastrar no es preciso.",
        },
        {
          q: "¿Qué sistema de coordenadas usa el recorte?",
          a: "Trabajas en coordenadas de pantalla (porcentajes desde la esquina superior izquierda, como la vista previa del canvas), y la herramienta convierte al espacio PDF, cuyo origen está abajo a la izquierda — el volteo es automático.",
        },
      ],
      deepDive: [
        {
          heading: "Lo que recortar un PDF realmente cambia — y lo que no",
          paragraphs: [
            "Recortar un PDF no borra nada por defecto — cambia el cuadro de recorte de la página, el rectángulo que dice a los visores qué porción mostrar e imprimir. El contenido completo sigue existiendo fuera del área visible; un lector con herramientas, o un copiar-pegar agresivo, puede alcanzar el contenido que creías haber cortado. Es fundamentalmente distinto del recorte de imágenes, donde los píxeles fuera del marco desaparecen de verdad.",
            "Para ocultar márgenes sensibles (una cabecera de fax, una anotación escaneada en el borde), cambiar el cuadro de recorte es cosmética. Para los usos cotidianos — recortar bordes del escáner, quitar espacios en blanco de diapositivas, ajustar al área imprimible — es exactamente la herramienta correcta, porque conserva todo mientras cambia cómo se enmarca la página.",
            "Cuando de verdad necesitas que el contenido desaparezca, recortar no basta: rasteriza la página (como hace la herramienta de comprimir) tras recortar, o borra la página entera. El modelo mental seguro: recortar esconde, rasterizar quema, borrar elimina. Elige según la intención, y recuerda la distinción cuando el documento vaya a un destinatario no confiable.",
          ],
        },
        {
          heading: "Márgenes, consistencia y cómo elegir el rectángulo",
          paragraphs: [
            "El trabajo de recorte más común son las virutas del escáner: bordes negros, márgenes torcidos, la línea de sombra de la tapa. Para un escaneo multipágina, recortar página por página es tedioso y produce tamaños inconsistentes — un documento cuyas páginas difieren sutilmente de dimensión se imprime y se lee peor. Recortar todas las páginas con un rectángulo compartido mantiene el documento uniforme; recortar por página solo tiene sentido cuando las páginas difieren de verdad, como en lotes de orientación mixta.",
            "Un truco útil para documentos de texto: recorta conservador antes que ajustado. Quitar algo de espacio exterior no cuesta nada, pero cortar dentro del área útil recorta ascendentes, notas al pie o cabeceras. Zoom primero al contenido más extremo de la peor página, y añade un pequeño margen de seguridad — los documentos casi siempre tienen una página cuyo contenido se extiende más que el resto.",
            "Recuerda también que el recorte interactúa con la impresión: los visores suelen ajustar la página recortada a la hoja, así que una página A4 recortada muy justa impresa en papel A4 se amplía ligeramente, cambiando el tamaño del texto. Si la salida debe imprimirse a escala exacta original, conserva margen suficiente para que el tamaño recortado siga correspondiendo a un tamaño de papel estándar.",
          ],
        },
        {
          heading: "Recortar en local cuando las páginas son privadas",
          paragraphs: [
            "Los documentos que necesitan recorte son normalmente escaneos de originales que tú tienes: contratos, cartas, certificados, recibos. Subirlos a un recortador online entrega la imagen completa sin recortar — incluido lo que piensas cortar — a ese servicio. Una pequeña ironía del trabajo de privacidad: el paso pensado para ordenar un documento se convierte en el paso que más lo expone.",
            "Esta herramienta aplica los cuadros de recorte por completo en tu navegador: las páginas se analizan en local, los nuevos rectángulos se escriben en la estructura del documento y el resultado lo guarda tu propio dispositivo. Nada se transmite, y el archivo original en el disco nunca se toca — siempre conservas la fuente sin recortar por si necesitas ajustar el rectángulo más tarde.",
            "Como el recorte aquí es a nivel de metadatos y sin pérdidas, también es instantáneo incluso con archivos grandes — no hay pasada de re-codificación. Eso hace práctico iterar: recortar, ver, refinar, volver a recortar, sin esperas. Combínalo con la herramienta de borrar páginas para un flujo completo de \"limpiar un escaneo\" que nunca sale de tu máquina.",
          ],
        },
      ],
    },
    pt: {
      name: "Recortar PDF",
      tagline:
        "Recorte páginas de um PDF arrastando um retângulo sobre uma pré-visualização em tempo real — corte margens ou bordas de digitalização em todas as páginas ou numa lista personalizada, tudo no navegador.",
      intro: [
        "Digitalizadoras adicionam bordas largas, slides vêm com molduras pretas e apresentações carregam mais espaço em branco do que a tela precisa. Arraste um retângulo sobre a primeira página renderizada, ou ajuste os percentuais de esquerda, topo, largura e altura com campos numéricos, e aplique a todas as páginas ou apenas às que listar, como “1-3, 7”.",
        "O recorte é gravado como crop box do PDF com pdf-lib: visualizadores e impressoras mostram só a área escolhida enquanto o conteúdo original permanece no arquivo, então nada é destruído e o corte pode ser desfeito redefinindo o box. Sem upload, sem rasterização — o texto continua selecionável e a qualidade intacta.",
      ],
      steps: [
        "Solte o PDF e confira a pré-visualização da página 1.",
        "Arraste um retângulo sobre a área a manter, ou digite percentuais exatos abaixo da pré-visualização.",
        "Escolha todas as páginas ou uma lista personalizada, clique em Recortar PDF e baixe o resultado.",
      ],
      faqs: [
        {
          q: "O recorte é destrutivo?",
          a: "Não. O crop box muda apenas qual área é exibida e impressa; o conteúdo subjacente permanece no arquivo. Um leitor que redefinir o crop box para o media box mostra a página original completa de novo.",
        },
        {
          q: "Por que a pré-visualização mostra só a página 1?",
          a: "O retângulo é definido em percentuais da página, então escala para cada página-alvo mesmo com tamanhos diferentes. A página 1 é renderizada em tempo real com pdf.js, e os quatro campos numéricos dão controle exato se arrastar não for preciso.",
        },
        {
          q: "Que sistema de coordenadas o recorte usa?",
          a: "Você trabalha em coordenadas de tela (percentuais a partir do canto superior esquerdo, como a pré-visualização do canvas), e a ferramenta converte para o espaço PDF, cuja origem fica no canto inferior esquerdo — a inversão é automática.",
        },
      ],
      deepDive: [
        {
          heading: "O que recortar um PDF realmente muda — e o que não",
          paragraphs: [
            "Recortar um PDF não apaga nada por padrão — muda a caixa de recorte da página, o retângulo que diz aos visualizadores qual porção mostrar e imprimir. O conteúdo completo continua existindo fora da área visível; um leitor com ferramentas, ou um copiar-colar agressivo, alcança o conteúdo que você achou que tinha cortado. É fundamentalmente diferente do recorte de imagens, em que os pixels fora do quadro realmente somem.",
            "Para esconder margens sensíveis (um cabeçalho de fax, uma anotação digitalizada na borda), mudar a caixa de recorte é cosmético. Para os usos cotidianos — aparar bordas do scanner, remover espaços em branco de slides, ajustar à área imprimível — é exatamente a ferramenta certa, porque preserva tudo enquanto muda o enquadramento da página.",
            "Quando você realmente precisa que o conteúdo desapareça, recortar não basta: rasterize a página (como faz a ferramenta de compressão) depois de recortar, ou exclua a página inteira. O modelo mental seguro: recortar esconde, rasterizar queima, excluir remove. Escolha pela intenção, e lembre da distinção quando o documento for para um destinatário que você não confia.",
          ],
        },
        {
          heading: "Margens, consistência e como escolher o retângulo",
          paragraphs: [
            "O trabalho de recorte mais comum são as aparas do scanner: bordas pretas, margens tortas, a linha de sombra da tampa. Para uma digitalização de várias páginas, recortar página por página é tedioso e produz tamanhos inconsistentes — um documento cujas páginas diferem sutilmente de dimensão imprime e lê pior. Recortar todas as páginas com um retângulo compartilhado mantém o documento uniforme; recortar por página só faz sentido quando as páginas realmente diferem, como em lotes de orientação mista.",
            "Um truque útil para documentos de texto: recorte conservador em vez de justo. Tirar um pouco do espaço externo não custa nada, mas cortar dentro da área útil amputa ascendentes, notas de rodapé ou cabeçalho. Dê zoom primeiro no conteúdo mais esticado da pior página e adicione uma pequena margem de segurança — documentos quase sempre têm uma página cujo conteúdo se estende mais que o resto.",
            "Lembre também que o recorte interage com a impressão: visualizadores costumam ajustar a página recortada à folha, então uma página A4 recortada bem justa impressa em papel A4 amplia um pouco, mudando o tamanho do texto. Se a saída precisa imprimir na escala original exata, guarde margem suficiente para o tamanho recortado ainda corresponder a um tamanho de papel padrão.",
          ],
        },
        {
          heading: "Recortar localmente quando as páginas são privadas",
          paragraphs: [
            "Documentos que precisam de recorte costumam ser digitalizações de originais que você guarda: contratos, cartas, certificados, recibos. Enviá-los a um recortador online entrega a imagem completa sem recorte — incluindo o que você pretende cortar — àquele serviço. Uma pequena ironia do trabalho de privacidade: o passo pensado para arrumar um documento vira o passo que mais o expõe.",
            "Esta ferramenta aplica as caixas de recorte inteiramente no seu navegador: as páginas são analisadas localmente, os novos retângulos são escritos na estrutura do documento e o resultado é salvo pelo seu próprio dispositivo. Nada é transmitido, e o arquivo original no disco nunca é tocado — você sempre mantém a fonte sem recorte caso precise ajustar o retângulo depois.",
            "Como o recorte aqui é em nível de metadados e sem perdas, também é instantâneo mesmo em arquivos grandes — não há passada de recodificação. Isso torna prático iterar: recortar, ver, refinar, recortar de novo, sem espera. Combine com a ferramenta de exclusão de páginas para um fluxo completo de \"limpar uma digitalização\" que nunca sai da sua máquina.",
          ],
        },
      ],
    },
  },
});
