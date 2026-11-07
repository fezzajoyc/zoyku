import { PdfRedactEngine } from "../_engines/pdf-engine-redact";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "redact-pdf",
  category: "pdf",
  icon: "shield",
  engine: { component: PdfRedactEngine },
  related: ["unlock-pdf", "sign-pdf", "exif-remover", "compress-pdf", "merge-pdf", "split-pdf", "page-numbers-pdf", "watermark-pdf"],
  copy: {
    en: {
      name: "Redact PDF",
      tagline: "Black out sensitive regions with true redaction — pages are re-rendered so the text under the boxes is physically removed, not just covered.",
      intro: [
        "Draw boxes over the content you need gone — names, ID numbers, signatures, internal notes — and download a PDF in which that content no longer exists. Each marked page is re-rendered to an image at 150 DPI with the boxes burned in, so what is under them is not merely hidden: it is destroyed before the new file is written.",
        "That distinction matters. Covering text with a black rectangle in a PDF editor leaves the characters intact underneath — anyone can copy them out or delete the box. True redaction removes them, which is the standard demanded for legal, medical and government disclosures.",
        "Everything happens in your browser with pdf.js and pdf-lib: the file is never uploaded, and pages without boxes are copied through unchanged, byte for byte, keeping their selectable text.",
      ],
      steps: [
        "Drop the PDF and navigate to a page with the preview arrows.",
        "Drag boxes over every region to remove — add as many as needed, per page.",
        "Redact, then download the cleaned file; unmarked pages stay untouched.",
      ],
      faqs: [
        {
          q: "Is this real redaction or just a black box?",
          a: "Real redaction. Marked pages are rasterized — the marked regions are destroyed at 150 DPI before the new PDF is assembled, so nothing remains under the boxes to extract. This is exactly why the page becomes an image.",
        },
        {
          q: "Why do redacted pages lose selectable text?",
          a: "Because keeping the text would keep the secret. The rasterization that destroys the marked content also flattens the rest of that page into pixels. If you need selectable text on redacted pages, redact a copy and keep the original for your archive.",
        },
        {
          q: "Do unmarked pages change at all?",
          a: "No. Pages without boxes are copied into the new PDF unchanged, so their text stays selectable and their size stays the same. Only pages you actually marked are re-rendered.",
        },
        {
          q: "Is anything uploaded to a server?",
          a: "No. Rendering, blacking out and reassembly all run in your browser via pdf.js and pdf-lib. The document never leaves your device — which is the point, given that redaction is usually applied to the most sensitive documents people handle.",
        },
      ],
      deepDive: [
        {
          heading: "Why covering text is not redaction",
          paragraphs: [
            "A black rectangle drawn in a PDF editor is a display instruction: the rendering order puts a filled shape on top of the glyphs, and viewers obediently show black. The characters, however, are still in the content stream. Select all, copy, paste into any text editor and the \"redacted\" name appears; simple tools can even list every word in the file without opening a viewer. Courts and regulators have sanctioned organizations for releasing \"redacted\" files that were merely covered.",
            "Redaction means the information no longer exists in the file. Anything short of that is cosmetic. The only way to guarantee it with a page-description format is to stop describing the page from the original objects and re-render it from pixels — which is what this tool does.",
            "The tell-tale test you can run on any redacted PDF: try to select the blacked-out area. If the viewer highlights anything under the black, or if a text-extraction tool returns characters from that region, the redaction failed. Files produced here pass that test by construction, because there are no characters left to find.",
          ],
        },
        {
          heading: "The rasterization trade-off, stated plainly",
          paragraphs: [
            "Re-rendering a page at 150 DPI has two visible consequences: the page becomes one image, and its text is no longer selectable or searchable. For redacted pages that is the point — the mechanism that destroys the marked content destroys all of it — but you should decide with open eyes.",
            "150 DPI keeps body text crisp on screen and acceptable for standard printing; it matches what most office scanners produce. Very small print (6-7 pt) may look slightly softer than the original on high-DPI displays. If a redacted page must be archived in \"searchable\" form, redact only the pages that truly contain sensitive content — unmarked pages keep their text layer untouched.",
            "File size shifts in both directions: text-heavy pages become larger as images, image-heavy pages often shrink because the re-encoded JPEG is more compact than the original embedded assets. The download dialog shows the final size before you commit to anything.",
          ],
        },
        {
          heading: "A redaction workflow that holds up",
          paragraphs: [
            "Work from a copy, never the original: redact a duplicate and keep the untouched archive with its access log. Navigate page by page and mark every instance of the sensitive data — names appear in headers and footers, account numbers in tables, dates in margins — then zoom mentally through the page before moving on: stamps, handwritten notes and text rotated 90 degrees are the usual survivors.",
            "Metadata is the other leak. This tool rebuilds the PDF from rendered pages, so the new file carries none of the original's document properties — author names, editing history and embedded fonts do not survive the reassembly. That is deliberate: redaction that leaves the author in the metadata is redaction half done.",
            "As with every tool on this site, the entire process runs locally in your browser. The sensitive document you are censoring is exactly the document you least want to upload anywhere — so it never is.",
          ],
        },
      ],
    },
    zh: {
      name: "涂黑 PDF",
      tagline: "真删除式涂黑——页面重新渲染,黑框下的文字被物理销毁,而不只是被盖住。",
      intro: [
        "在需要删除的内容上拖出黑框——姓名、证件号、签名、内部批注——然后下载一份这些内容已不存在的 PDF。每个被标记的页面按 150 DPI 重新渲染并把黑框烧进去,黑框下面的东西不是被遮住了,而是在新文件写入前就被销毁了。",
        "这个区别至关重要。在 PDF 编辑器里给文字盖黑色矩形,底下的字符原封不动——任何人都能复制出来或删掉黑框。真涂黑把它们彻底移除,这是法律、医疗和政务披露场景的标准要求。",
        "一切都在浏览器里通过 pdf.js 和 pdf-lib 完成:文件从不上传;没有黑框的页面逐字节原样保留,文本照样可选中。",
      ],
      steps: [
        "拖入 PDF,用预览箭头翻到要处理的页面。",
        "在要删除的区域上拖黑框——每页可加任意多个。",
        "点涂黑并下载清理后的文件;未标记的页面保持原样。",
      ],
      faqs: [
        {
          q: "这是真涂黑还是只是盖黑框?",
          a: "真涂黑。被标记的页面会栅格化——标记区域在新 PDF 组装前于 150 DPI 下被销毁,黑框下面没有任何可以提取的东西。这也正是该页变成图像的原因。",
        },
        {
          q: "为什么涂黑的页面失去可选文本?",
          a: "因为保留文本就等于保留秘密。销毁标记内容的栅格化过程同时会把该页其余部分压成像素。如果涂黑页也需要可检索文本,请复制一份再涂,原稿留档。",
        },
        {
          q: "没有标记的页面会有变化吗?",
          a: "不会。没有黑框的页面原样复制进新 PDF,文本保持可选中、尺寸不变。只有你实际标记过的页面才会重新渲染。",
        },
        {
          q: "文件会被上传到服务器吗?",
          a: "不会。渲染、涂黑、重组全部在浏览器内由 pdf.js 和 pdf-lib 完成。文件从不离开你的设备——考虑到涂黑的对象往往是最敏感的文件,这一点正是关键。",
        },
      ],
      deepDive: [
        {
          heading: "为什么盖黑条不等于涂黑",
          paragraphs: [
            "在 PDF 编辑器里画的黑色矩形只是一条显示指令:渲染顺序把一个实心形状压在字符上面,阅读器听话地显示成黑色。但字符仍在内容流里——全选复制、粘到任何文本编辑器,被\"涂黑\"的名字就回来了;更简单的工具甚至不用打开阅读器就能列出文件里的每个词。曾有机构因为发布只被\"盖住\"的\"涂黑\"文件而被法院和监管机构追责。",
            "涂黑的定义是:信息在文件里不复存在。达不到这一点的都只是化妆。对页面描述格式而言,唯一能保证这一点的方法,就是不再从原始对象描述页面,而是从像素重新渲染——本工具做的正是这件事。",
            "你可以对任何一份涂黑 PDF 做这个检验:尝试选中黑色区域。如果阅读器在黑色下面高亮了任何内容,或者文本提取工具从该区域返回了字符,那这次涂黑就失败了。本工具产出的文件在构造上就通过这个检验——因为压根没有字符可找。",
          ],
        },
        {
          heading: "栅格化的代价,摆在明面上说",
          paragraphs: [
            "按 150 DPI 重新渲染页面有两个可见后果:页面变成一张图像,文本不再可选、可检索。对被涂黑的页面来说这正是目的——销毁标记内容的机制会销毁全部内容——但你应该睁着眼睛做决定。",
            "150 DPI 让正文在屏幕上清晰、常规打印可接受,和多数办公扫描件的精度相当。非常小的字号(6-7 pt)在高分屏上会略显发虚。如果涂黑页必须以\"可检索\"形式归档,只涂真正含敏感内容的页面——未标记页面的文本层原封不动。",
            "文件体积双向变化:纯文字页变图像后会变大,图像为主的页面往往反而变小,因为重编码的 JPEG 比原来内嵌的资源更紧凑。下载前就能看到最终体积,不存在意外。",
          ],
        },
        {
          heading: "经得起检验的涂黑工作流",
          paragraphs: [
            "从副本做起,永远不要动原件:涂黑一份副本,带访问日志的原件留在档案里。逐页翻、逐处标记敏感数据——姓名会出现在页眉页脚,账号藏在表格里,日期缩在边距——然后翻页前把整页在脑子里过一遍:印章、手写批注、旋转 90 度的文字是最常见的漏网之鱼。",
            "元数据是另一条泄露通道。本工具从渲染后的页面重建 PDF,新文件不带原文件的任何文档属性——作者名、编辑历史、内嵌字体都不会在重组后存活。这是刻意设计:涂黑了正文却把作者留在元数据里,等于涂黑了一半。",
            "和本站所有工具一样,整个过程完全在浏览器本地完成。你要审查的正是你最不希望上传到任何地方的敏感文件——所以它永远不必被上传。",
          ],
        },
      ],
    },
    ja: {
      name: "PDF 黒塗り",
      tagline: "本物の黒塗り——ページを再レンダリングし、枠の下のテキストを物理的に消去します。覆い隠すだけではありません。",
      intro: [
        "削除したい内容——氏名、ID 番号、署名、社内メモ——の上をドラッグで枠囲みし、その内容が存在しない PDF をダウンロードできます。マークされたページは 150 DPI で再レンダリングされ、枠が焼き込まれます。枠の下は隠されているのではなく、新しいファイルの書き出し前に破壊されています。",
        "この違いは決定的です。PDF エディタで黒い矩形を重ねるだけなら、文字はその下にそのまま残ります——誰でもコピーできるし、矩形を消せば見えてしまいます。本物の黒塗りは文字を取り除きます。法務・医療・行政の開示で求められるのはこちらです。",
        "処理はすべてブラウザ内で pdf.js と pdf-lib により実行されます。ファイルはアップロードされず、枠のないページはバイト単位でそのままコピーされ、テキスト選択も可能なままです。",
      ],
      steps: [
        "PDF をドロップし、プレビューの矢印で対象ページへ移動します。",
        "削除したい領域をドラッグで囲みます——ページごとにいくつでも追加できます。",
        "黒塗りを実行してクリーンなファイルをダウンロード。未マークのページはそのまま保持されます。",
      ],
      faqs: [
        {
          q: "これは本物の黒塗りですか、ただの黒い箱ですか?",
          a: "本物の黒塗りです。マークされたページはラスタライズされ——新しい PDF を組み立てる前に 150 DPI でマーク領域が破壊されるため——枠の下に抽出できるものは何も残りません。ページが画像になるのはまさにそのためです。",
        },
        {
          q: "黒塗りページでテキスト選択ができなくなるのはなぜですか?",
          a: "テキストを残すことは秘密を残すことと同じだからです。マーク領域を破壊するラスタライズは、そのページの残りもピクセルに平坦化します。黒塗りページでも検索可能な形式が必要なら、コピーに対して黒塗りし、原本をアーカイブに残してください。",
        },
        {
          q: "マークしていないページは変化しますか?",
          a: "いいえ。枠のないページはそのまま新しい PDF にコピーされ、テキスト選択もサイズも変わりません。再レンダリングされるのは、実際にマークしたページだけです。",
        },
        {
          q: "ファイルはサーバーにアップロードされますか?",
          a: "されません。レンダリング・黒塗り・再構築はすべてブラウザ内の pdf.js と pdf-lib で実行されます。文書が端末の外に出ることはありません——黒塗りの対象は往々にして最も機密性の高い文書であり、だからこそ重要です。",
        },
      ],
      deepDive: [
        {
          heading: "覆うだけでは黒塗りにならない理由",
          paragraphs: [
            "PDF エディタで描く黒い矩形は表示命令にすぎません。描画順序で塗りつぶし図形がグリフの上に載り、ビューアは従順に黒を表示する——しかし文字はコンテンツストリームに残っています。すべて選択してコピーすれば「黒塗りした」はずの氏名が復活し、もっと単純なツールならビューアなしでファイル内の全単語を列挙できます。単に覆っただけの「黒塗り」ファイルを公開して、裁判所や規制当局に問題にされた組織があります。",
            "黒塗りの定義は、情報がファイル内に存在しなくなることです。それに満たないものは化粧です。ページ記述形式でそれを保証する唯一の方法は、元のオブジェクトからページを記述するのをやめ、ピクセルから再レンダリングすること——このツールがやっているのはまさにそれです。",
            "どんな黒塗り PDF にもできる簡単なテスト:黒い領域を選択してみてください。ビューアが黒の下に何かをハイライトしたり、テキスト抽出ツールがその領域から文字を返したりしたら、その黒塗りは失敗です。このツールの成果物は構造的にこのテストを通ります——探すべき文字が最初から存在しないからです。",
          ],
        },
        {
          heading: "ラスタライズの代償をはっきりと",
          paragraphs: [
            "150 DPI での再レンダリングには二つの目に見える結果があります。ページが一つの画像になり、テキストは選択も検索もできなくなります。黒塗りページにとってはそれこそが目的——マーク領域を破壊する仕組みがページ全体を破壊する——ですが、目を開いて決めるべき判断です。",
            "150 DPI は本文を画面でくっきり、通常印刷にも耐える精度で、多くのオフィススキャナと同等です。ごく小さい活字(6-7 pt)は高解像度ディスプレイでややにじんで見えることがあります。黒塗りページも検索可能な形で保管が必要なら、本当に機密を含むページだけを黒塗りしてください——未マークのページのテキスト層は無傷のままです。",
            "ファイルサイズは両方向に動きます。テキスト主体のページは画像化で大きくなり、画像主体のページは再エンコードした JPEG が元の埋め込み資産より小さくなることが多い。ダウンロード前に最終サイズが見えるので、思いがけない膨張はありません。",
          ],
        },
        {
          heading: "検査に耐える黒塗りのワークフロー",
          paragraphs: [
            "原本ではなくコピーから作業します。黒塗りは複製に対して行い、アクセスログ付きの原本はアーカイブに。ページを順にめくり、機密データの出現箇所をすべてマークする——氏名はヘッダーとフッター、口座番号は表の中、日付は余白にも現れます。ページを移る前に全体をもう一度見直す:印影、手書きメモ、90 度回転したテキストが定番の見落としです。",
            "メタデータも another の漏えい経路です。このツールはレンダリング済みページから PDF を再構築するため、新しいファイルは元の文書プロパティを一切引き継ぎません——作成者名、編集履歴、埋め込みフォントは再構築で失われます。意図的な設計です。本文を黒塗りしても作者がメタデータに残っていては、黒塗りの半分しか終わっていません。",
            "本サイトのすべてのツールと同様、処理は完全にブラウザ内で完結します。黒塗りしようとしている文書は、どこにもアップロードしたくない文書の筆頭です——だから、アップロードされることはありません。",
          ],
        },
      ],
    },
    es: {
      name: "Censurar PDF",
      tagline: "Censura real: las páginas se vuelven a renderizar y el texto bajo los recuadros se destruye físicamente, no solo se cubre.",
      intro: [
        "Dibuje recuadros sobre el contenido que debe desaparecer — nombres, números de documento, firmas, notas internas — y descargue un PDF donde ese contenido ya no existe. Cada página marcada se vuelve a renderizar como imagen a 150 DPI con los recuadros quemados, de modo que lo que hay debajo no queda oculto: se destruye antes de escribir el nuevo archivo.",
        "Esa distinción importa. Cubrir texto con un rectángulo negro en un editor de PDF deja los caracteres intactos debajo — cualquiera puede copiarlos o borrar el rectángulo. La censura real los elimina, que es el estándar exigido en divulgaciones legales, médicas y gubernamentales.",
        "Todo ocurre en su navegador con pdf.js y pdf-lib: el archivo nunca se sube, y las páginas sin recuadros se copian sin cambios, byte a byte, conservando su texto seleccionable.",
      ],
      steps: [
        "Suelte el PDF y navegue con las flechas hasta una página con contenido sensible.",
        "Arrastre recuadros sobre cada región a eliminar — cuantos haga falta, por página.",
        "Censure y descargue el archivo limpio; las páginas sin marcar quedan intactas.",
      ],
      faqs: [
        {
          q: "¿Es censura real o solo una caja negra?",
          a: "Censura real. Las páginas marcadas se rasterizan — las regiones marcadas se destruyen a 150 DPI antes de ensamblar el nuevo PDF, así que no queda nada debajo de los recuadros para extraer. Por eso la página pasa a ser una imagen.",
        },
        {
          q: "¿Por qué las páginas censuradas pierden el texto seleccionable?",
          a: "Porque conservar el texto sería conservar el secreto. La rasterización que destruye el contenido marcado también aplana el resto de esa página en píxeles. Si necesita texto buscable en páginas censuradas, censure una copia y conserve el original para su archivo.",
        },
        {
          q: "¿Las páginas sin marcar cambian en algo?",
          a: "No. Las páginas sin recuadros se copian al nuevo PDF sin cambios: su texto sigue siendo seleccionable y su tamaño, idéntico. Solo se vuelven a renderizar las páginas que usted marcó.",
        },
        {
          q: "¿Se sube algo a un servidor?",
          a: "No. El renderizado, el enmascaramiento y el reensamblado corren en su navegador con pdf.js y pdf-lib. El documento nunca sale de su dispositivo — que es justo el punto, tratándose de los documentos que la gente menos quiere subir a ninguna parte.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué cubrir texto no es censurar",
          paragraphs: [
            "Un rectángulo negro dibujado en un editor de PDF es una instrucción de visualización: el orden de renderizado pone una forma rellena encima de los glifos y el visor obedece mostrando negro. Los caracteres, sin embargo, siguen en el flujo de contenido. Seleccionar todo, copiar, pegar en cualquier editor y el nombre \"censurado\" reaparece; herramientas más simples ni siquiera abren un visor para listar cada palabra del archivo. Ha habido organizaciones sancionadas por publicar archivos \"censurados\" que solo estaban cubiertos.",
            "Censurar significa que la información ya no existe en el archivo. Cualquier cosa por debajo de eso es cosmética. La única forma de garantizarlo con un formato de descripción de página es dejar de describir la página desde los objetos originales y volver a renderizarla desde píxeles — exactamente lo que hace esta herramienta.",
            "La prueba que puede hacer sobre cualquier PDF censurado: intente seleccionar la zona negra. Si el visor resalta algo debajo del negro, o una herramienta de extracción devuelve caracteres de esa región, la censura falló. Los archivos producidos aquí pasan esa prueba por construcción, porque no quedan caracteres que encontrar.",
          ],
        },
        {
          heading: "El compromiso de la rasterización, dicho sin rodeos",
          paragraphs: [
            "Volver a renderizar a 150 DPI tiene dos consecuencias visibles: la página se convierte en una imagen y su texto deja de ser seleccionable y buscable. Para las páginas censuradas ese es justamente el objetivo — el mecanismo que destruye el contenido marcado destruye todo — pero conviene decidirlo con los ojos abiertos.",
            "150 DPI mantiene el cuerpo de texto nítido en pantalla y aceptable en impresión estándar; equivale a lo que produce la mayoría de escáneres de oficina. La letra muy pequeña (6-7 pt) puede verse algo más blanda en pantallas de alta densidad. Si una página censurada debe archivarse en forma \"buscable\", censure solo las páginas que de verdad contienen información sensible — las no marcadas conservan su capa de texto intacta.",
            "El tamaño del archivo se mueve en ambas direcciones: las páginas de texto puro crecen al volverse imagen, y las ricas en imágenes suelen encoger porque el JPEG recodificado es más compacto que los recursos incrustados originales. El diálogo de descarga muestra el tamaño final antes de que se comprometa a nada.",
          ],
        },
        {
          heading: "Un flujo de censura que aguanta el escrutinio",
          paragraphs: [
            "Trabaje sobre una copia, nunca sobre el original: censure un duplicado y conserve el archivo intacto con su registro de acceso. Avance página a página y marque cada aparición del dato sensible — los nombres aparecen en encabezados y pies, los números de cuenta dentro de tablas, las fechas en los márgenes — y antes de pasar de página repase mentalmente el conjunto: sellos, notas manuscritas y texto girado 90 grados son los supervivientes habituales.",
            "Los metadatos son la otra fuga. Esta herramienta reconstruye el PDF a partir de páginas renderizadas, así que el nuevo archivo no conserva ninguna propiedad del documento original — nombres de autor, historiales de edición y fuentes incrustadas no sobreviven al reensamblado. Es deliberado: una censura que deja al autor en los metadatos es una censura a medias.",
            "Como con todas las herramientas de este sitio, el proceso corre por completo en su navegador. El documento que está censurando es justo el que menos querría subir a ningún sitio — así que nunca se sube.",
          ],
        },
      ],
    },
    pt: {
      name: "Tachar PDF",
      tagline: "Tachadura real: as páginas são re-renderizadas e o texto sob os retângulos é destruído fisicamente, não apenas coberto.",
      intro: [
        "Desenhe retângulos sobre o conteúdo que precisa sumir — nomes, números de documento, assinaturas, anotações internas — e baixe um PDF em que esse conteúdo não existe mais. Cada página marcada é re-renderizada como imagem a 150 DPI com os retângulos queimados, de modo que o que está por baixo não fica escondido: é destruído antes de o novo arquivo ser gravado.",
        "Essa distinção importa. Cobrir texto com um retângulo preto num editor de PDF deixa os caracteres intactos por baixo — qualquer um pode copiá-los ou apagar o retângulo. A tachadura real os remove, que é o padrão exigido em divulgações jurídicas, médicas e governamentais.",
        "Tudo acontece no seu navegador com pdf.js e pdf-lib: o arquivo nunca é enviado, e as páginas sem retângulos são copiadas sem alteração, byte a byte, mantendo o texto selecionável.",
      ],
      steps: [
        "Solte o PDF e navegue com as setas até uma página com conteúdo sensível.",
        "Arraste retângulos sobre cada região a remover — quantos precisar, por página.",
        "Tache e baixe o arquivo limpo; páginas não marcadas ficam intocadas.",
      ],
      faqs: [
        {
          q: "Isso é tachadura real ou só uma caixa preta?",
          a: "Tachadura real. As páginas marcadas são rasterizadas — as regiões marcadas são destruídas a 150 DPI antes de o novo PDF ser montado, então não resta nada sob os retângulos para extrair. É exatamente por isso que a página vira imagem.",
        },
        {
          q: "Por que as páginas tachadas perdem o texto selecionável?",
          a: "Porque manter o texto seria manter o segredo. A rasterização que destrói o conteúdo marcado também achata o resto da página em pixels. Se precisar de texto pesquisável em páginas tachadas, tache uma cópia e guarde o original no arquivo.",
        },
        {
          q: "As páginas não marcadas mudam em algo?",
          a: "Não. Páginas sem retângulos são copiadas para o novo PDF sem alteração: o texto continua selecionável e o tamanho, idêntico. Só as páginas que você marcou são re-renderizadas.",
        },
        {
          q: "Algo é enviado a um servidor?",
          a: "Não. Renderização, mascaramento e remontagem rodam no seu navegador com pdf.js e pdf-lib. O documento nunca sai do seu dispositivo — que é justamente o ponto, tratando-se dos documentos que as pessoas menos desejam enviar a qualquer lugar.",
        },
      ],
      deepDive: [
        {
          heading: "Por que cobrir texto não é tachar",
          paragraphs: [
            "Um retângulo preto desenhado num editor de PDF é uma instrução de exibição: a ordem de renderização põe uma forma preenchida sobre os glifos e o visualizador obedece mostrando preto. Os caracteres, porém, continuam no fluxo de conteúdo. Selecionar tudo, copiar, colar em qualquer editor e o nome \"tachado\" reaparece; ferramentas mais simples nem abrem um visualizador para listar cada palavra do arquivo. Houve organizações sancionadas por publicar arquivos \"tachados\" que estavam apenas cobertos.",
            "Tachar significa que a informação não existe mais no arquivo. Qualquer coisa abaixo disso é cosmética. A única forma de garantir isso num formato de descrição de página é parar de descrever a página a partir dos objetos originais e re-renderizá-la a partir de pixels — exatamente o que esta ferramenta faz.",
            "O teste que você pode fazer em qualquer PDF tachado: tente selecionar a área preta. Se o visualizador destacar algo sob o preto, ou uma ferramenta de extração devolver caracteres dessa região, a tachadura falhou. Os arquivos produzidos aqui passam nesse teste por construção, porque não há caracteres para encontrar.",
          ],
        },
        {
          heading: "O compromisso da rasterização, dito sem rodeios",
          paragraphs: [
            "Re-renderizar a 150 DPI tem duas consequências visíveis: a página vira uma imagem e seu texto deixa de ser selecionável e pesquisável. Para as páginas tachadas esse é justamente o objetivo — o mecanismo que destrói o conteúdo marcado destrói tudo — mas é uma decisão a tomar de olhos abertos.",
            "150 DPI mantém o corpo de texto nítido na tela e aceitável na impressão padrão; equivale ao que a maioria dos escâneres de escritório produz. Letra muito pequena (6-7 pt) pode parecer um pouco mais suave em telas de alta densidade. Se uma página tachada precisa ser arquivada em forma \"pesquisável\", tache apenas as páginas que realmente contêm informação sensível — as não marcadas mantêm a camada de texto intacta.",
            "O tamanho do arquivo se move nas duas direções: páginas de texto puro crescem ao virar imagem, e as ricas em imagens costumam encolher porque o JPEG recodificado é mais compacto que os recursos embutidos originais. O diálogo de download mostra o tamanho final antes de qualquer compromisso.",
          ],
        },
        {
          heading: "Um fluxo de tachadura que resiste ao escrutínio",
          paragraphs: [
            "Trabalhe sobre uma cópia, nunca sobre o original: tache um duplicado e guarde o arquivo intacto com seu registro de acesso. Avance página a página e marque cada ocorrência do dado sensível — nomes aparecem em cabeçalhos e rodapés, números de conta dentro de tabelas, datas nas margens — e antes de virar a página repasse o conjunto: carimbos, anotações à mão e texto girado em 90 graus são os sobreviventes de costume.",
            "Os metadados são o outro vazamento. Esta ferramenta reconstrói o PDF a partir de páginas renderizadas, então o novo arquivo não carrega nenhuma propriedade do original — nomes de autor, históricos de edição e fontes embutidas não sobrevivem à remontagem. É deliberado: uma tachadura que deixa o autor nos metadados é uma tachadura pela metade.",
            "Como em todas as ferramentas deste site, o processo roda inteiro no seu navegador. O documento que você está censurando é exatamente aquele que você menos desejaria enviar a qualquer lugar — então ele nunca é enviado.",
          ],
        },
      ],
    },
  },
});
