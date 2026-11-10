import { WordExportEngine } from "../_engines/doc-engine-word-export";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "word-export",
  category: "text",
  icon: "text",
  engine: { component: WordExportEngine },
  related: ["word-counter", "text-diff", "case-converter", "text-cleaner", "pdf-to-word", "merge-pdf", "character-counter", "find-and-replace"],
  copy: {
    en: {
      name: "Export to Word",
      tagline: "Turn text and images into a real .docx in your browser — headings, lists, quotes, code blocks and embedded pictures, no upload.",
      intro: [
        "Write or paste your content in a Markdown-style editor, drop in images, and export a genuine Word document that opens in Microsoft Word, Google Docs, LibreOffice, Pages and WPS. Headings become real heading styles, bullets and numbered lists become real Word lists, quotes get the classic left border, code blocks keep their monospace font, and every {{image:n}} placeholder embeds the actual image file.",
        "The whole conversion runs inside your browser tab with the docx library — the text and images never touch a server. That makes it safe for unpublished manuscripts, client drafts, internal reports and anything under NDA, and it works offline once the page is loaded.",
        "Images are embedded at their stored resolution and scaled to fit the page width while keeping their aspect ratio, so photos stay sharp in print. PNG, JPEG, GIF and BMP are all accepted, and you can paste an image straight from the clipboard (screenshot → Ctrl+V → done).",
      ],
      steps: [
        "Type or paste your content using the Markdown-style syntax shown under the editor.",
        "Drop or paste images, then click the ↩n button on a thumbnail to insert its {{image:n}} placeholder where it belongs.",
        "Name the file and hit Export .docx — the download starts immediately.",
      ],
      faqs: [
        {
          q: "Is this a real Word file or just renamed HTML?",
          a: "A real .docx: the Office Open XML package is built in your browser with the docx library — proper heading styles, native lists, embedded image parts under word/media/. Word's spell check, styles pane and navigation pane all work normally.",
        },
        {
          q: "How do I control where an image appears?",
          a: "Images land in the document exactly where you put their placeholder. Add an image, click its ↩n button (or type {{image:n}} yourself), and the picture is embedded at that point in the text flow, scaled to fit the page width.",
        },
        {
          q: "Will my formatting survive opening in Google Docs or Pages?",
          a: "Yes — headings, bullets, numbered lists, quotes and images are all standard Word features, not exotic markup. Bold and italic inside paragraphs carry over as character formatting.",
        },
        {
          q: "Is anything uploaded?",
          a: "No. The document is assembled in your browser and downloaded directly — text and images never leave your device.",
        },
      ],
      deepDive: [
        {
          heading: "Why Markdown syntax instead of a rich-text toolbar",
          paragraphs: [
            "A rich-text toolbar sounds friendlier, but it hides the structure of the document inside a WYSIWYG state machine that is hard to audit and impossible to paste between tools. Markdown keeps the structure in plain text: you can see every heading and list marker, paste content from any source, and edit it with the same keyboard skills you already have. For the export step the difference disappears — both produce the same Word paragraphs — but for drafting, plain text with visible markers is faster and never corrupts.",
            "The supported subset is deliberately small: three heading levels, bold and italic, bullets, numbered lists, block quotes, code blocks, horizontal rules and image placeholders. That covers reports, documentation, blog drafts and homework. Larger constructs — tables, footnotes, columns — are better done in Word itself after import; pretending to support them in a browser editor produces fragile files.",
            "The image placeholder syntax exists because images are the one thing plain text cannot carry. {{image:n}} is short enough to type, unique enough to never collide with prose, and explicit about ordering — image 1 is the first thumbnail in the queue, image 2 the second, regardless of file names.",
          ],
        },
        {
          heading: "What \"embedded\" means for your images",
          paragraphs: [
            "Images inside a .docx are stored in the file itself under word/media/ — not linked to your disk or a URL. The exported document stays complete when you email it, move it between machines or archive it; nothing can break the picture later. The image bytes are embedded exactly as provided, so a 2 MB photo makes the document about 2 MB bigger; if you need a lighter file, compress the images first.",
            "Scaling is non-destructive in the layout sense: the transformation written into the document sets the display size, and the original resolution stays available. Word re-scales crisply on export to PDF or print because the full-resolution bitmap is what gets rendered. Widths above the printable area are clamped to the page with the aspect ratio preserved, so no image ever spills past the margin.",
            "Format support follows what Word handles natively: PNG (screenshots, diagrams), JPEG (photos), GIF (simple animations lose animation — the first frame is used) and BMP. WebP and HEIC are not accepted because Word's own compatibility with them inside OOXML is inconsistent across versions; converting those first gives a predictable result.",
          ],
        },
        {
          heading: "Where this fits next to the PDF tools",
          paragraphs: [
            "This tool and the PDF tools solve opposite problems. Export to Word takes your draft text and images and produces an editable document — the starting point of a workflow. The PDF tools (convert, merge, redact, sign) operate on finished documents — the end of a workflow. Together they cover the round trip: draft in Word format here, finalize and share as PDF there.",
            "The pdf-to-word tool is the reverse direction: it takes an existing PDF and recovers editable text. Use that when the PDF is the input you cannot edit; use this tool when the text is yours and Word is the destination. Both run fully in the browser, so neither adds an upload step to your document handling.",
            "Because everything is local, this page also works as a scratch pad: paste meeting notes, add screenshots from the clipboard, export, and throw the tab away. No account, no history, no server copy of anything you wrote.",
          ],
        },
      ],
    },
    zh: {
      name: "导出 Word",
      tagline: "在浏览器里把文字和图片变成真正的 .docx——标题、列表、引用、代码块、内嵌图片,全程不上传。",
      intro: [
        "用 Markdown 风格编辑器写或粘贴内容,拖入图片,导出真正的 Word 文档——在 Microsoft Word、Google Docs、LibreOffice、Pages 和 WPS 里都能正常打开。标题变成真正的标题样式,列表变成 Word 原生列表,引用带经典左侧竖线,代码块保留等宽字体,每个 {{image:n}} 占位符都会嵌入真实图片文件。",
        "整个转换在浏览器标签页内由 docx 库完成——文字和图片从不经过服务器。未发布的稿件、客户草稿、内部报告和受保密协议约束的内容都可以放心处理;页面加载完成后离线也能用。",
        "图片按存储分辨率嵌入,展示尺寸按页面宽度等比缩放,打印依然清晰。PNG、JPEG、GIF、BMP 都支持,还能直接从剪贴板粘贴图片(截图 → Ctrl+V → 完成)。",
      ],
      steps: [
        "按编辑器下方展示的 Markdown 风格语法输入或粘贴内容。",
        "拖入或粘贴图片,点缩略图上的 ↩n 按钮,把对应的 {{image:n}} 占位符插到正文该出现的位置。",
        "填好文件名,点导出 .docx——立即开始下载。",
      ],
      faqs: [
        {
          q: "这是真正的 Word 文件,还是改名的 HTML?",
          a: "真正的 .docx:Office Open XML 包在浏览器里用 docx 库构建——规范标题样式、原生列表、word/media/ 下的内嵌图片部件。Word 的拼写检查、样式面板、导航窗格全部正常工作。",
        },
        {
          q: "怎么控制图片出现的位置?",
          a: "图片出现在你放置占位符的位置。添加图片后点它的 ↩n 按钮(或自己输入 {{image:n}}),图片就会嵌在正文那个位置,并按页面宽度等比缩放。",
        },
        {
          q: "在 Google Docs 或 Pages 里打开,格式还在吗?",
          a: "在。标题、项目符号、编号列表、引用和图片都是 Word 的标准功能,不是私有标记;段落内的粗体和斜体会作为字符格式保留。",
        },
        {
          q: "有没有内容被上传?",
          a: "没有。文档在浏览器内组装后直接下载——文字和图片都不离开你的设备。",
        },
      ],
      deepDive: [
        {
          heading: "为什么用 Markdown 语法而不是富文本工具栏",
          paragraphs: [
            "富文本工具栏看起来更友好,但它把文档结构藏进一个难以审查、无法跨工具粘贴的所见即所得状态机里。Markdown 把结构留在纯文本中:每个标题、每个列表符号都看得见,内容可以从任何来源粘贴,用你已有的键盘技能就能编辑。对导出这一步来说两者产物相同,但对写作来说,标记可见的纯文本更快,而且永远不会损坏。",
            "支持的语法刻意保持精简:三级标题、粗体、斜体、项目符号、编号列表、引用、代码块、分隔线、图片占位符。这覆盖了报告、文档、博客草稿和作业。更复杂的结构——表格、脚注、分栏——适合导入后在 Word 里完成;在浏览器编辑器里假装支持它们只会产出脆弱的文件。",
            "图片占位符语法存在的原因是图片是纯文本唯一带不了的东西。{{image:n}} 足够短、好输入,又足够独特不会和正文撞车,而且顺序明确——图片 1 是队列里的第一张缩略图,图片 2 是第二张,与文件名无关。",
          ],
        },
        {
          heading: "\"嵌入\"对图片意味着什么",
          paragraphs: [
            ".docx 里的图片存储在文件自身的 word/media/ 下——不是链接到磁盘或 URL。导出的文档发邮件、换机器、归档都保持完整,图片永远不会失效。图片字节按原样嵌入,一张 2 MB 的照片会让文档大约变大 2 MB;需要更小的文件就先压缩图片。",
            "缩放在版式层面是无损的:写进文档的变换只设置显示尺寸,原始分辨率仍然保留。Word 导出 PDF 或打印时按全分辨率位图渲染,所以缩放依然清晰。超过可打印区域的宽度会按页面宽度收限并保持纵横比,图片永远不会溢出页边距。",
            "格式支持以 Word 原生兼容为准:PNG(截图、图表)、JPEG(照片)、GIF(动图会取第一帧)和 BMP。WebP 和 HEIC 不接受——Word 各版本对它们在 OOXML 里的兼容性不一致,先转换格式才能得到可预期的结果。",
          ],
        },
        {
          heading: "和 PDF 工具的分工",
          paragraphs: [
            "这个工具和 PDF 工具解决相反的问题。导出 Word 把你的草稿文字和图片变成可编辑文档——是工作流的起点。PDF 工具(转换、合并、涂黑、签名)处理成品文档——是工作流的终点。两者合起来覆盖完整回路:在这里起草 Word 格式,在那里定稿并分享为 PDF。",
            "pdf-to-word 工具是反方向:拿到既有 PDF 并还原出可编辑文字。PDF 是你改不了的输入时用它;文字是你自己的、目标是 Word 时用这个工具。两者都在浏览器内完成,都不会给你的文档处理增加上传环节。",
            "因为一切都在本地,这个页面还可以当草稿纸:粘贴会议记录,从剪贴板加截图,导出,然后关掉标签页。没有账号、没有历史记录、服务器上没有任何你写过的东西。",
          ],
        },
      ],
    },
    ja: {
      name: "Word エクスポート",
      tagline: "テキストと画像をブラウザで本物の .docx に——見出し・リスト・引用・コードブロック・埋め込み画像、アップロード不要。",
      intro: [
        "Markdown 風エディタで本文を書くか貼り付け、画像をドロップして、本物の Word 文書を書き出せます。Microsoft Word・Google Docs・LibreOffice・Pages・WPS でそのまま開けます。見出しは本物の見出しスタイル、箇条書きと番号付きは Word のネイティブ リスト、引用は左罫線付き、コードブロックは等幅フォントのまま、{{image:n}} プレースホルダーには実際の画像が埋め込まれます。",
        "変換はすべてブラウザのタブ内で docx ライブラリが実行します——テキストも画像もサーバーには送られません。未公開の原稿、クライアントの下書き、社内レポート、NDA の文書も安心して処理でき、ページ読み込み後はオフラインでも動作します。",
        "画像は保存解像度のまま埋め込み、表示サイズはページ幅に合わせて縦横比を保って縮小されるため、印刷でも鮮明です。PNG・JPEG・GIF・BMP に対応し、クリップボードからの直接貼り付けもできます(スクリーンショット → Ctrl+V → 完了)。",
      ],
      steps: [
        "エディタ下に表示される Markdown 風の書式に従って本文を入力・貼り付けします。",
        "画像をドロップまたは貼り付けし、サムネイルの ↩n ボタンで対応する {{image:n}} プレースホルダーを挿入します。",
        "ファイル名を入力して .docx を書き出す——すぐにダウンロードが始まります。",
      ],
      faqs: [
        {
          q: "本物の Word ファイル? リネームした HTML?",
          a: "本物の .docx です。Office Open XML パッケージをブラウザ内で docx ライブラリが構築します——正規の見出しスタイル、ネイティブ リスト、word/media/ 配下の埋め込み画像パーツ。Word のスペルチェック、スタイル ウィンドウ、ナビゲーション ウィンドウも正常に動作します。",
        },
        {
          q: "画像の位置はどう指定する?",
          a: "画像はプレースホルダーを置いた位置に挿入されます。画像を追加して ↩n ボタンを押す(または {{image:n}} を直接入力)と、本文のその位置にページ幅に合わせたサイズで埋め込まれます。",
        },
        {
          q: "Google Docs や Pages で開いても書式は残る?",
          a: "残ります。見出し・箇条書き・番号付き・引用・画像はすべて Word の標準機能で、独自マークアップではありません。段落内の太字・斜体も文字書式として保持されます。",
        },
        {
          q: "何かアップロードされる?",
          a: "いいえ。文書はブラウザ内で組み立てられ直接ダウンロードされます——テキストも画像も端末の外に出ません。",
        },
      ],
      deepDive: [
        {
          heading: "リッチ テキスト ツールバーではなく Markdown 構文である理由",
          paragraphs: [
            "リッチ テキスト ツールバーのほうが親しみやすく見えますが、文書の構造を WYSIWYG の状態機械の中に隠します。検証しづらく、ツール間で貼り付けもできません。Markdown は構造をプレーン テキストに残します。すべての見出しとリスト マーカーが目に見え、どのソースからでも貼り付けられ、既存のキーボード操作のままで編集できます。書き出しの結果はどちらも同じ Word 段落ですが、執筆段階ではマーカーが見えるプレーン テキストのほうが速く、壊れることもありません。",
            "対応する書式は意図的に小さく絞っています:見出し 3 段階、太字、斜体、箇条書き、番号付き、引用、コード ブロック、区切り線、画像プレースホルダー。レポート、ドキュメント、ブログ下書き、課題には十分です。表・脚注・段組みのような複雑な構造は読み込み後に Word 本体で行うべきものです——ブラウザ エディタが対応しているふりをすると壊れやすいファイルが生まれます。",
            "画像プレースホルダー構文が存在するのは、画像だけがプレーン テキストで運べないものだからです。{{image:n}} は入力できるくらい短く、本文と衝突しないくらい独特で、順序も明示します——画像 1 はキューの 1 番目のサムネイル、画像 2 は 2 番目で、ファイル名とは無関係です。",
          ],
        },
        {
          heading: "画像の「埋め込み」が意味するもの",
          paragraphs: [
            ".docx 内の画像はファイル自体の word/media/ に格納されます——ディスクや URL へのリンクではありません。書き出した文書はメール送信・マシン間移動・アーカイブしても完全なままで、画像が後から壊れることはありません。画像バイトは与えられたまま埋め込まれるため、2 MB の写真は文書を約 2 MB 大きくします。軽量化が必要なら先に画像を圧縮してください。",
            "拡大縮小はレイアウト上は非破壊です。文書に書き込まれる変換は表示サイズだけを設定し、元の解像度は保持されます。Word が PDF や印刷に書き出す際はフル解像度のビットマップが描画されるため、縮小しても鮮明です。印刷可能領域を超える幅はページ幅にクランプされ、縦横比は維持されるため、画像が余白をはみ出すことはありません。",
            "形式の対応は Word がネイティブで扱えるものに合わせています:PNG(スクリーンショット・図)、JPEG(写真)、GIF(アニメーションは先頭フレームのみ)、BMP。WebP と HEIC は受け付けません——Word のバージョンによって OOXML 内での互換性が安定しないためで、先に変換すれば結果は予測可能になります。",
          ],
        },
        {
          heading: "PDF ツールとの役割分担",
          paragraphs: [
            "このツールと PDF ツールは正反対の問題を解決します。Word エクスポートは下書きのテキストと画像から編集可能な文書を作る——ワークフローの起点です。PDF ツール(変換・結合・黒塗り・署名)は完成した文書を扱う——終点です。両方で往復をカバーできます。ここで Word 形式で起草し、あちらで仕上げて PDF として共有します。",
            "pdf-to-word ツールは逆方向です。既存の PDF から編集可能なテキストを復元します。PDF が編集できない入力ならこちら、テキストが自分のもので Word が行き先ならこのツールです。どちらもブラウザ内で完結し、文書の扱いにアップロード工程を追加しません。",
            "すべてローカルで動くため、このページはメモ帳としても使えます。会議メモを貼り、クリップボードからスクリーンショットを追加し、書き出して、タブを閉じる。アカウントも履歴も、書いたもののサーバー コピーも存在しません。",
          ],
        },
      ],
    },
    es: {
      name: "Exportar a Word",
      tagline: "Convierte texto e imágenes en un .docx real en tu navegador — títulos, listas, citas, bloques de código e imágenes incrustadas, sin subir nada.",
      intro: [
        "Escribe o pega tu contenido en un editor estilo Markdown, suelta imágenes y exporta un documento Word auténtico que se abre en Microsoft Word, Google Docs, LibreOffice, Pages y WPS. Los títulos se convierten en estilos de título reales, las viñetas y listas numeradas en listas nativas de Word, las citas llevan el borde izquierdo clásico, los bloques de código conservan la fuente monoespaciada y cada marcador {{image:n}} incrusta la imagen real.",
        "Toda la conversión ocurre dentro de la pestaña del navegador con la biblioteca docx — el texto y las imágenes nunca tocan un servidor. Eso lo hace seguro para manuscritos no publicados, borradores de clientes, informes internos y todo lo cubierto por un NDA, y funciona sin conexión una vez cargada la página.",
        "Las imágenes se incrustan a su resolución almacenada y se escalan para caber en el ancho de la página manteniendo la proporción, así que las fotos salen nítidas en impresión. Se aceptan PNG, JPEG, GIF y BMP, y puedes pegar una imagen directamente del portapapeles (captura → Ctrl+V → listo).",
      ],
      steps: [
        "Escribe o pega el contenido usando la sintaxis estilo Markdown mostrada bajo el editor.",
        "Suelta o pega imágenes y pulsa el botón ↩n de una miniatura para insertar su marcador {{image:n}} donde corresponda.",
        "Pon el nombre del archivo y pulsa Exportar .docx — la descarga empieza de inmediato.",
      ],
      faqs: [
        {
          q: "¿Es un archivo Word real o HTML renombrado?",
          a: "Un .docx real: el paquete Office Open XML se construye en tu navegador con la biblioteca docx — estilos de título correctos, listas nativas, partes de imagen incrustadas bajo word/media/. El corrector, el panel de estilos y el panel de navegación de Word funcionan con normalidad.",
        },
        {
          q: "¿Cómo controlo dónde aparece una imagen?",
          a: "Las imágenes quedan exactamente donde pongas su marcador. Añade una imagen, pulsa su botón ↩n (o escribe {{image:n}}), y la foto se incrusta en ese punto del texto, escalada al ancho de la página.",
        },
        {
          q: "¿El formato sobrevive al abrirlo en Google Docs o Pages?",
          a: "Sí — títulos, viñetas, listas numeradas, citas e imágenes son funciones estándar de Word, no marcado exótico. La negrita y la cursiva dentro de párrafos se conservan como formato de carácter.",
        },
        {
          q: "¿Se sube algo?",
          a: "No. El documento se ensambla en tu navegador y se descarga directamente — el texto y las imágenes nunca salen de tu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué sintaxis Markdown en vez de una barra de texto enriquecido",
          paragraphs: [
            "Una barra de herramientas de texto enriquecido suena más amigable, pero esconde la estructura del documento dentro de una máquina de estados WYSIWYG difícil de auditar e imposible de pegar entre herramientas. Markdown mantiene la estructura en texto plano: ves cada título y marcador de lista, pegas contenido de cualquier fuente y lo editas con las mismas habilidades de teclado que ya tienes. Para el paso de exportación la diferencia desaparece — ambos producen los mismos párrafos de Word — pero para redactar, el texto plano con marcadores visibles es más rápido y nunca se corrompe.",
            "El subconjunto soportado es deliberadamente pequeño: tres niveles de título, negrita y cursiva, viñetas, listas numeradas, citas, bloques de código, separadores y marcadores de imagen. Cubre informes, documentación, borradores de blog y tareas. Construcciones mayores — tablas, notas al pie, columnas — se hacen mejor en Word después de importar; fingir soportarlas en un editor de navegador produce archivos frágiles.",
            "La sintaxis de marcador de imagen existe porque las imágenes son lo único que el texto plano no puede llevar. {{image:n}} es corta de escribir, suficientemente única para no chocar con la prosa, y explícita en el orden — imagen 1 es la primera miniatura de la cola, imagen 2 la segunda, sin importar los nombres de archivo.",
          ],
        },
        {
          heading: "Qué significa «incrustada» para tus imágenes",
          paragraphs: [
            "Las imágenes dentro de un .docx se guardan en el propio archivo bajo word/media/ — no enlazadas a tu disco o una URL. El documento exportado sigue completo al enviarlo por correo, moverlo entre máquinas o archivarlo; nada puede romper la imagen después. Los bytes se incrustan tal como se proporcionan, así que una foto de 2 MB agranda el documento unos 2 MB; si necesitas un archivo más ligero, comprime las imágenes primero.",
            "El escalado no es destructivo a nivel de maquetación: la transformación escrita en el documento fija el tamaño de visualización y la resolución original sigue disponible. Word re-escala con nitidez al exportar a PDF o imprimir porque el bitmap de resolución completa es lo que se renderiza. Los anchos superiores al área imprimible se ajustan a la página conservando la proporción, así que ninguna imagen sobrepasa el margen.",
            "El soporte de formatos sigue lo que Word maneja de forma nativa: PNG (capturas, diagramas), JPEG (fotos), GIF (las animaciones pierden la animación — se usa el primer fotograma) y BMP. WebP y HEIC no se aceptan porque la compatibilidad de Word con ellos dentro de OOXML es inconsistente entre versiones; convertirlos primero da un resultado predecible.",
          ],
        },
        {
          heading: "Dónde encaja junto a las herramientas PDF",
          paragraphs: [
            "Esta herramienta y las herramientas PDF resuelven problemas opuestos. Exportar a Word toma tu borrador de texto e imágenes y produce un documento editable — el inicio de un flujo de trabajo. Las herramientas PDF (convertir, combinar, censurar, firmar) operan sobre documentos terminados — el final del flujo. Juntas cubren el viaje de ida y vuelta: redacta en formato Word aquí, finaliza y comparte como PDF allí.",
            "La herramienta pdf-to-word es la dirección inversa: toma un PDF existente y recupera texto editable. Úsala cuando el PDF es la entrada que no puedes editar; usa esta cuando el texto es tuyo y Word es el destino. Ambas funcionan por completo en el navegador, así que ninguna añade un paso de subida a tu manejo de documentos.",
            "Como todo es local, esta página también sirve como bloc de notas: pega notas de reunión, añade capturas desde el portapapeles, exporta y cierra la pestaña. Sin cuenta, sin historial, sin copia en servidor de nada de lo que escribiste.",
          ],
        },
      ],
    },
    pt: {
      name: "Exportar para Word",
      tagline: "Transforme texto e imagens em um .docx real no seu navegador — títulos, listas, citações, blocos de código e imagens embutidas, sem envio.",
      intro: [
        "Escreva ou cole seu conteúdo em um editor estilo Markdown, solte imagens e exporte um documento Word autêntico que abre no Microsoft Word, Google Docs, LibreOffice, Pages e WPS. Os títulos viram estilos de título reais, as listas com marcadores e numeradas viram listas nativas do Word, as citações ganham a borda esquerda clássica, os blocos de código mantêm a fonte monoespaçada e cada marcador {{image:n}} embute a imagem real.",
        "Toda a conversão acontece dentro da aba do navegador com a biblioteca docx — o texto e as imagens nunca tocam um servidor. Isso torna a ferramenta segura para manuscritos não publicados, rascunhos de clientes, relatórios internos e qualquer coisa sob NDA, e funciona offline depois que a página carrega.",
        "As imagens são embutidas na resolução armazenada e redimensionadas para caber na largura da página mantendo a proporção, então as fotos ficam nítidas na impressão. PNG, JPEG, GIF e BMP são aceitos, e você pode colar uma imagem direto da área de transferência (captura de tela → Ctrl+V → pronto).",
      ],
      steps: [
        "Digite ou cole o conteúdo usando a sintaxe estilo Markdown mostrada abaixo do editor.",
        "Solte ou cole imagens e clique no botão ↩n de uma miniatura para inserir o marcador {{image:n}} no lugar certo.",
        "Dê um nome ao arquivo e clique em Exportar .docx — o download começa imediatamente.",
      ],
      faqs: [
        {
          q: "É um arquivo Word real ou HTML renomeado?",
          a: "Um .docx real: o pacote Office Open XML é construído no seu navegador com a biblioteca docx — estilos de título corretos, listas nativas, partes de imagem embutidas sob word/media/. O verificador ortográfico, o painel de estilos e o painel de navegação do Word funcionam normalmente.",
        },
        {
          q: "Como controlo onde uma imagem aparece?",
          a: "As imagens ficam exatamente onde você põe o marcador. Adicione uma imagem, clique no botão ↩n dela (ou digite {{image:n}}), e a foto é embutida naquele ponto do texto, redimensionada para caber na largura da página.",
        },
        {
          q: "A formatação sobrevive ao abrir no Google Docs ou Pages?",
          a: "Sim — títulos, marcadores, listas numeradas, citações e imagens são recursos padrão do Word, não marcação exótica. Negrito e itálico dentro dos parágrafos são mantidos como formatação de caractere.",
        },
        {
          q: "Algo é enviado para um servidor?",
          a: "Não. O documento é montado no seu navegador e baixado diretamente — texto e imagens nunca saem do seu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Por que sintaxe Markdown em vez de uma barra de texto rico",
          paragraphs: [
            "Uma barra de ferramentas de texto rico parece mais amigável, mas esconde a estrutura do documento dentro de uma máquina de estados WYSIWYG difícil de auditar e impossível de colar entre ferramentas. O Markdown mantém a estrutura em texto simples: você vê cada título e marcador de lista, cola conteúdo de qualquer fonte e edita com as mesmas habilidades de teclado que já tem. Para a etapa de exportação a diferença desaparece — ambos produzem os mesmos parágrafos do Word — mas para redigir, texto simples com marcadores visíveis é mais rápido e nunca corrompe.",
            "O subconjunto suportado é deliberadamente pequeno: três níveis de título, negrito e itálico, marcadores, listas numeradas, citações, blocos de código, separadores e marcadores de imagem. Isso cobre relatórios, documentação, rascunhos de blog e trabalhos. Construções maiores — tabelas, notas de rodapé, colunas — ficam melhor no próprio Word depois da importação; fingir suportá-las em um editor de navegador produz arquivos frágeis.",
            "A sintaxe de marcador de imagem existe porque imagens são a única coisa que texto simples não consegue carregar. {{image:n}} é curta o bastante para digitar, única o suficiente para nunca colidir com a prosa, e explícita quanto à ordem — imagem 1 é a primeira miniatura da fila, imagem 2 a segunda, independentemente dos nomes de arquivo.",
          ],
        },
        {
          heading: "O que «embutida» significa para suas imagens",
          paragraphs: [
            "Imagens dentro de um .docx ficam armazenadas no próprio arquivo sob word/media/ — não vinculadas ao seu disco ou a uma URL. O documento exportado permanece completo quando você o envia por e-mail, move entre máquinas ou arquiva; nada pode quebrar a imagem depois. Os bytes da imagem são embutidos exatamente como fornecidos, então uma foto de 2 MB deixa o documento cerca de 2 MB maior; se precisar de um arquivo mais leve, comprima as imagens antes.",
            "O redimensionamento é não destrutivo no sentido de layout: a transformação escrita no documento define o tamanho de exibição, e a resolução original continua disponível. O Word reescala com nitidez ao exportar para PDF ou imprimir porque o bitmap de resolução completa é o que é renderizado. Larguras acima da área imprimível são limitadas à página com a proporção preservada, então nenhuma imagem ultrapassa a margem.",
            "O suporte a formatos segue o que o Word lida nativamente: PNG (capturas de tela, diagramas), JPEG (fotos), GIF (animações perdem a animação — o primeiro quadro é usado) e BMP. WebP e HEIC não são aceitos porque a compatibilidade do Word com eles dentro de OOXML é inconsistente entre versões; convertê-los antes dá um resultado previsível.",
          ],
        },
        {
          heading: "Onde isso se encaixa junto às ferramentas de PDF",
          paragraphs: [
            "Esta ferramenta e as ferramentas de PDF resolvem problemas opostos. Exportar para Word leva seu rascunho de texto e imagens e produz um documento editável — o começo de um fluxo de trabalho. As ferramentas de PDF (converter, mesclar, censurar, assinar) operam sobre documentos prontos — o fim do fluxo. Juntas cobrem o caminho de ida e volta: rascunhe em formato Word aqui, finalize e compartilhe como PDF lá.",
            "A ferramenta pdf-to-word é a direção inversa: ela pega um PDF existente e recupera texto editável. Use-a quando o PDF é a entrada que você não consegue editar; use esta quando o texto é seu e o Word é o destino. Ambas rodam inteiramente no navegador, então nenhuma adiciona uma etapa de envio ao seu fluxo de documentos.",
            "Como tudo é local, esta página também serve como bloco de rascunho: cole notas de reunião, adicione capturas de tela da área de transferência, exporte e feche a aba. Sem conta, sem histórico, sem cópia em servidor de nada que você escreveu.",
          ],
        },
      ],
    },
  },
});
