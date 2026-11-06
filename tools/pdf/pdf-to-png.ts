import { PdfToImagesEngine } from "../_engines/pdf-engine-pdf-to-images";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "pdf-to-png",
  category: "pdf",
  icon: "image",
  engine: { component: PdfToImagesEngine, props: { format: "png" } },
  related: ["pdf-to-jpg", "png-to-pdf", "pdf-to-text", "ocr-pdf", "split-pdf", "delete-pdf-pages", "pdf-to-ppt", "compress-pdf", "rotate-pdf", "merge-pdf"],
  copy: {
    en: {
      name: "PDF to PNG",
      tagline:
        "Convert PDF pages to lossless PNG images at your chosen resolution — crisp slides and scans, with a ZIP when there are many pages.",
      intro: [
        "When JPG artifacts are not welcome — screenshots of slides, diagrams, forms with small print — export pages as PNG. The lossless format keeps letter edges and thin lines pixel-sharp, at 96 up to 300 DPI.",
        "Every page renders locally with pdf.js at the exact appearance the PDF defines. Files are named by page number, and multi-page results arrive with a one-click ZIP.",
      
        "Each page is rasterized by pdf.js at the DPI you pick: 96 for screen previews, 150 for readable thumbnails, 300 for print-ready output. Because PNG is lossless, hairlines, small print and diagram edges stay pixel-sharp — the artifacts that JPG introduces at those sizes simply are not present.",
        "Compared with screenshotting a PDF viewer (which captures the screen at whatever zoom is current), the render is at true page resolution with predictable output size per page. And unlike cloud converters, a confidential contract or a private deck never touches a server — the pages are drawn by the same engine Firefox uses to display PDFs.",
      ],
      steps: [
        "Drop your PDF into the box.",
        "Pick the resolution — 150 DPI is a solid default.",
        "Click Convert to PNG, then download pages or the ZIP.",
      ],
      faqs: [
        {
          q: "When should I use PNG instead of JPG?",
          a: "Whenever the pages contain text, flat colors or line art: PNG keeps those perfectly sharp. JPG suits photographic pages where small file size matters more.",
        },
        {
          q: "Why are the PNG files large?",
          a: "Lossless compression preserves every pixel, so sizes grow with DPI. 300 DPI scans of a dense page can be several megabytes; drop to 96–150 DPI for on-screen use.",
        },
        {
          q: "Is transparency preserved?",
          a: "Pages are rendered onto a white background, so output is opaque PNG. That matches how PDFs print and avoids black-background surprises in viewers.",
        },
      ],
      deepDive: [
        {
          heading: "PNG vs. JPG for page captures: when each wins",
          paragraphs: [
            "PNG and JPG both turn PDF pages into pixels, but they encode them with opposite philosophies. JPG uses lossy compression tuned for photographs: tiny files, invisible artifacts on gradients, faint fuzz on hard edges. PNG uses lossless compression tuned for flat art: text, diagrams, screenshots, and anything with sharp edges or solid color areas stay pixel-perfect, at the cost of larger files for photographic content.",
            "So the rule of thumb: pages of text, tables, charts and line drawings belong in PNG — the letters stay crisp at any zoom and compression never smears a diagram line. Pages of scanned photos, or any page dominated by continuous-tone imagery, belong in JPG — PNG would balloon the size with no visible gain.",
            "PNG also keeps exact colors where JPG's chroma compression can subtly shift saturated brand colors, and PNG files re-save without generational loss: editing and re-saving a PNG never degrades it, while repeated JPG re-encodes accumulate artifacts. For pages destined for further editing, PNG is the archival choice.",
          ],
        },
        {
          heading: "Sharpness, scale and transparency notes",
          paragraphs: [
            "Because PNG is lossless, the only quality knob is resolution — render at 150 DPI for screen work, 300 DPI for print-grade captures. There is no compression slider to get wrong, which removes one whole class of mistakes: a PNG is either rendered at enough pixels or it isn't, and re-rendering at higher DPI is the complete fix for softness.",
            "One real advantage over JPG: PNG supports transparency. A page rendered to PNG with its background preserved can be composited onto any other background; JPG always flattens to a solid color, usually white. For diagram pages destined for slides or design files, this can save a manual background-removal step.",
            "Watch file sizes on dense pages: a 300 DPI PNG of a photo-heavy page can weigh tens of megabytes. If the destination is a web page or chat message, that size will hurt more than the fidelity helps — downscale the DPI or switch to JPG for exactly those pages.",
          ],
        },
        {
          heading: "Capturing pages without sending them anywhere",
          paragraphs: [
            "People most often capture PDF pages as images to reuse them: a chart for a report, a signature page as evidence, a diagram for training material. Each captured image is a self-contained copy that can travel far beyond the original document — which is exactly why it matters who handles the conversion. Uploading a confidential page to a converter puts the pixel-perfect copy on someone else's infrastructure before you have done anything with it.",
            "This tool renders and encodes entirely in your browser: the PDF is drawn onto your device's canvas at the selected DPI, encoded to PNG losslessly in memory, and saved by your browser. No page is uploaded, no copy exists outside your device at any point, and the conversion completes with the network unplugged.",
            "The practical benefit compounds with batch jobs: converting a 200-page manual to PNGs produces hundreds of files, and doing that locally means no upload wait, no per-file size caps and no batch queues — just your device's rendering speed, which for a modern machine is typically faster than the upload of the same content would have been.",
          ],
        },
      ],
    },
    zh: {
      name: "PDF 转 PNG",
      tagline: "把 PDF 页面转换为所选分辨率的无损 PNG——幻灯片和扫描件依然锐利,多页时一键打包 ZIP。",
      intro: [
        "当 JPG 压缩痕迹不可接受时——幻灯片截图、图表、小字号表格——把页面导出为 PNG。无损格式保留文字边缘和细线的像素级锐度,支持 96 到 300 DPI。",
        "每页都由 pdf.js 在本地按 PDF 定义的精确外观渲染。文件按页码命名,多页结果附带一键 ZIP 打包。",
      ],
      steps: [
        "把 PDF 拖入方框。",
        "选择分辨率——150 DPI 是稳妥的默认值。",
        "点击“转换为 PNG”,逐页下载或下载 ZIP。",
      ],
      faqs: [
        {
          q: "什么时候该用 PNG 而不是 JPG?",
          a: "页面包含文字、纯色块或线条图时用 PNG,它能保持完美锐利;JPG 更适合以照片为主、更在意体积的页面。",
        },
        {
          q: "为什么 PNG 文件比较大?",
          a: "无损压缩保留每个像素,体积随 DPI 增长。信息密集的页面在 300 DPI 下可能有好几兆;屏幕使用建议降到 96–150 DPI。",
        },
        {
          q: "透明度会保留吗?",
          a: "页面会渲染到白色背景上,输出不透明的 PNG。这与 PDF 的打印效果一致,也避免了某些查看器黑底显示的问题。",
        },
      ],
      deepDive: [
        {
          heading: "页面截图用 PNG 还是 JPG:各自的胜场",
          paragraphs: [
            "PNG 和 JPG 都能把 PDF 页面变成像素,但编码哲学相反。JPG 用面向照片的有损压缩:文件小,渐变上看不出痕迹,硬边缘上有一点点糊。PNG 用面向平面图形的无损压缩:文字、图表、截图,一切锐利边缘和纯色区域都像素级保真,代价是照片类内容文件更大。",
            "所以经验法则:文字、表格、图表、线稿页属于 PNG——字母任意缩放都锐利,压缩永远不会糊掉图里的一条线。扫描照片页或以连续色调图像为主的页面属于 JPG——用 PNG 体积暴涨却看不出任何收益。",
            "PNG 还能保住精确颜色——JPG 的色度压缩会让高饱和的品牌色悄悄偏移;PNG 反复保存也不劣化:编辑再保存永远不会退化,而 JPG 反复重编码会累积伪影。要继续编辑的页面,PNG 是存档之选。",
          ],
        },
        {
          heading: "锐度、尺寸与透明度备忘",
          paragraphs: [
            "PNG 无损,所以唯一的质量旋钮就是分辨率——屏幕用途 150 DPI,打印级截图 300 DPI。没有会调错的压缩滑块,砍掉了整整一类错误:PNG 要么像素够要么不够,发糊的完整解法就是提高 DPI 重渲染。",
            "相对 JPG 的一大真实优势:PNG 支持透明。渲染成 PNG 的页面可以保留背景透明,合成到任何其他背景上;JPG 永远压成纯色,通常是白色。对要进幻灯片或设计文件的图表页,这能省掉一步手工抠背景。",
            "留意密集页面的文件体积:照片多的页面在 300 DPI 下 PNG 可能重达几十 MB。如果目的地是网页或聊天消息,这个体积带来的痛超过保真带来的益——对恰好这几页,降低 DPI 或改用 JPG。",
          ],
        },
        {
          heading: "截取页面,而不送往任何地方",
          paragraphs: [
            "人们把 PDF 页面截成图,多数是为了复用:报告里的一张图、作为证据的签名页、培训材料里的示意图。每张截出的图都是一份可以远走的独立副本——这正是谁来做这个转换至关重要的原因。把机密页面传给在线转换器,像素级副本在你对它做任何事之前,就已经躺在别人的基础设施上。",
            "本工具完全在浏览器里渲染和编码:PDF 按选定 DPI 画到你设备的 canvas 上,在内存里无损编码为 PNG,由浏览器保存。没有任何页面被上传,任何时刻你的设备之外都不存在副本,断网也能完成转换。",
            "批量任务里本地的好处还会复利:把 200 页手册转成 PNG 会产出几百个文件,本地做意味着没有上传等待、没有单文件体积上限、没有批量排队——只有你设备的渲染速度,而在现代机器上,这通常比上传同样内容还要快。",
          ],
        },
      ],
    },
    ja: {
      name: "PDF を PNG に変換",
      tagline: "PDF のページを指定解像度のロスレス PNG に変換。スライドやスキャンもくっきり、ページが多いときは ZIP で一括ダウンロード。",
      intro: [
        "JPG の劣化が困る場面——スライドの図、ダイアグラム、小さな活字のフォーム——では、ページを PNG で書き出しましょう。ロスレス形式なら文字のエッジや細い線もピクセル単位でシャープです。96〜300 DPI に対応します。",
        "各ページは pdf.js によりローカルで、PDF が定義するとおりの見た目で描画されます。ファイルはページ番号付きの名前で、複数ページの結果はワンクリックの ZIP と一緒に届きます。",
      ],
      steps: [
        "PDF をボックスにドロップします。",
        "解像度を選びます(150 DPI が無難な既定値です)。",
        "「変換」をクリックし、各ページまたは ZIP をダウンロードします。",
      ],
      faqs: [
        {
          q: "JPG ではなく PNG を使うべき場面は?",
          a: "ページにテキスト・ベタ塗り・線画が含まれる場合です。PNG はそれらを完全にシャープに保ちます。JPG は写真中心でファイルサイズを優先したいページ向きです。",
        },
        {
          q: "PNG ファイルが大きいのはなぜ?",
          a: "ロスレス圧縮は全ピクセルを保持するため、サイズは DPI に比例して増えます。情報量の多いページの 300 DPI は数 MB になることも。画面用途なら 96〜150 DPI に下げてください。",
        },
        {
          q: "透過は保持されますか?",
          a: "ページは白背景にレンダリングされるため、出力は不透明な PNG です。これは PDF の印刷結果と一致し、ビューアでの黒背景問題も避けられます。",
        },
      ],
      deepDive: [
        {
          heading: "ページ取得に PNG か JPG か:それぞれが勝つとき",
          paragraphs: [
            "PNG も JPG も PDF のページをピクセルに変えますが、符号化の哲学は正反対です。JPG は写真向けの非可逆圧縮で、ファイルは小さく、グラデーションの上では跡が見えず、硬い縁にはわずかなにじみが残ります。PNG はフラットなグラフィック向けの可逆圧縮で、文字・図表・スクリーンショット、鋭い縁やベタ塗りのあるものはピクセル単位で完全に保たれます。代償は写真的内容でのファイル肥大です。",
            "だから経験則はこうです。文字・表・グラフ・線画のページは PNG へ。文字はどの拡大率でも鋭く、圧縮が図の中の一本の線をにじませることは決してありません。走査写真のページや連続階調が支配的なページは JPG へ。PNG ではサイズが膨らむのに見た目の利益はゼロです。",
            "PNG は正確な色も保ちます。JPG の色度圧縮は彩度の高いブランドカラーを微妙にずらすことがあります。さらに PNG は保存を繰り返しても世代劣化しません。編集と再保存で決して劣化せず、JPG の再符号化の繰り返しは跡を積み上げます。さらに編集する運命のページには、PNG がアーカイブの選択です。",
          ],
        },
        {
          heading: "鋭さ、尺度、透過の覚え書き",
          paragraphs: [
            "PNG は可逆なので、品質のつまみは解像度だけです。画面作業なら 150 DPI、印刷級の取得なら 300 DPI。間違え得る圧縮スライダーが存在しないので、誤りの種類が一つ丸ごと消えます。PNG はピクセルが足りているか足りていないかだけで、にじみへの完全な解はより高い DPI での再描画です。",
            "JPG に対する本物の利点がもう一つ。PNG は透過をサポートします。背景を保ったまま PNG に描かれたページは、任意の他の背景の上に合成できます。JPG は常にベタ色へ潰します。たいてい白です。スライドやデザインファイルへ行く図表ページでは、背景除去の手作業の一段階を省けます。",
            "密度の高いページではファイルサイズに注意してください。写真中心のページの 300 DPI PNG は数十 MB になり得ます。行き先がウェブページやチャットなら、そのサイズは忠実度の利益より痛い。ちょうどそのページだけ DPI を下げるか JPG に切り替えてください。",
          ],
        },
        {
          heading: "どこへも送らずにページを取得する",
          paragraphs: [
            "人が PDF のページを画像として取るのは、たいてい再利用のためです。報告書のためのグラフ、証拠としての署名ページ、研修資料のための図。取り出された画像の一つ一つは、元の文書をはるかに越えて旅できる独立したコピーです。だからこそ誰が変換を扱うかが重要なのです。機密ページを変換器にアップロードすれば、ピクセル完全なコピーが、あなたが何もする前に他人のインフラに置かれます。",
            "このツールは描画と符号化を完全にブラウザ内で行います。PDF は選択 DPI で端末の canvas 上に描かれ、メモリ内で可逆に PNG へ符号化され、ブラウザが保存します。ページは一つもアップロードされず、どの時点でも端末の外にコピーは存在せず、回線を抜いても変換は完結します。",
            "バッチ作業ではローカルの利益が複利で積み上がります。200 ページのマニュアルを PNG 化すると数百のファイルが生まれますが、ローカルならアップロード待ちも、単一ファイルのサイズ上限も、バッチの順番待ちもありません。あるのは端末の描画速度だけで、現代のマシンでは通常、同じ内容のアップロードより速く終わります。",
          ],
        },
      ],
    },
    es: {
      name: "PDF a PNG",
      tagline:
        "Convierte las páginas de un PDF a imágenes PNG sin pérdidas y a la resolución que elijas: diapositivas y escaneos nítidos, con ZIP si son muchas.",
      intro: [
        "Cuando los artefactos del JPG no son aceptables —capturas de diapositivas, diagramas, formularios con letra pequeña— exporta las páginas como PNG. El formato sin pérdidas mantiene los bordes de las letras y las líneas finas píxel-perfectos, de 96 a 300 DPI.",
        "Cada página se dibuja en local con pdf.js con la apariencia exacta que define el PDF. Los archivos se nombran por número de página y los resultados multipágina incluyen un ZIP de un clic.",
      ],
      steps: [
        "Suelta tu PDF en el recuadro.",
        "Elige la resolución: 150 DPI es un valor sólido.",
        "Pulsa Convertir a PNG y descarga las páginas o el ZIP.",
      ],
      faqs: [
        {
          q: "¿Cuándo conviene PNG en vez de JPG?",
          a: "Cuando las páginas contengan texto, colores planos o gráficos de líneas: PNG los mantiene perfectamente nítidos. JPG va bien en páginas fotográficas donde importa más el tamaño.",
        },
        {
          q: "¿Por qué los archivos PNG pesan tanto?",
          a: "La compresión sin pérdidas conserva cada píxel, así que el tamaño crece con el DPI. Un escaneo denso a 300 DPI puede ocupar varios megabytes; baja a 96–150 DPI para uso en pantalla.",
        },
        {
          q: "¿Se conserva la transparencia?",
          a: "Las páginas se dibujan sobre fondo blanco, así que el PNG sale opaco. Coincide con cómo se imprime un PDF y evita sorpresas de fondo negro en algunos visores.",
        },
      ],
      deepDive: [
        {
          heading: "PNG frente a JPG para capturas de páginas: cuándo gana cada uno",
          paragraphs: [
            "PNG y JPG convierten páginas PDF en píxeles, pero las codifican con filosofías opuestas. JPG usa compresión con pérdida afinada para fotografías: archivos diminutos, artefactos invisibles en degradados, un borroncito en los bordes duros. PNG usa compresión sin pérdida afinada para arte plano: texto, diagramas, capturas y todo lo que tenga bordes nítidos o zonas de color sólido se queda píxel a píxel, al coste de archivos más grandes para contenido fotográfico.",
            "La regla práctica: las páginas de texto, tablas, gráficas y dibujos lineales van a PNG — las letras quedan nítidas a cualquier zoom y la compresión jamás difumina una línea del diagrama. Las páginas de fotos escaneadas, o cualquier página dominada por imagen de tono continuo, van a JPG — PNG inflaría el tamaño sin ganancia visible.",
            "PNG además conserva colores exactos donde la compresión de croma del JPG puede desplazar sutilmente colores saturados de marca, y los PNG se re-guardan sin pérdida generacional: editar y volver a guardar un PNG nunca lo degrada, mientras que los JPG re-codificados acumulan artefactos. Para páginas destinadas a seguir editándose, PNG es la elección de archivo.",
          ],
        },
        {
          heading: "Notas de nitidez, escala y transparencia",
          paragraphs: [
            "Como el PNG es sin pérdidas, el único mando de calidad es la resolución — renderiza a 150 DPI para trabajo en pantalla y a 300 DPI para capturas de imprenta. No hay deslizador de compresión que se pueda equivocar, lo que elimina una clase entera de errores: un PNG o tiene suficientes píxeles o no los tiene, y la solución completa a la suavidad es re-renderizar a mayor DPI.",
            "Una ventaja real sobre JPG: PNG admite transparencia. Una página renderizada a PNG conservando su fondo puede componerse sobre cualquier otro fondo; el JPG siempre aplana a un color sólido, normalmente blanco. Para páginas de diagramas destinadas a diapositivas o archivos de diseño, esto ahorra un paso manual de quitar el fondo.",
            "Vigila los tamaños en páginas densas: un PNG a 300 DPI de una página cargada de fotos puede pesar decenas de megabytes. Si el destino es una página web o un mensaje de chat, ese tamaño dolerá más de lo que la fidelidad ayuda — baja el DPI o cambia a JPG exactamente para esas páginas.",
          ],
        },
        {
          heading: "Capturar páginas sin enviarlas a ningún sitio",
          paragraphs: [
            "La gente captura páginas PDF como imágenes sobre todo para reutilizarlas: una gráfica para un informe, una página de firmas como evidencia, un diagrama para material formativo. Cada imagen capturada es una copia autocontenida que puede viajar mucho más lejos que el documento original — y por eso importa quién maneja la conversión. Subir una página confidencial a un conversor pone la copia píxel a píxel en la infraestructura de otra persona antes de que hayas hecho nada con ella.",
            "Esta herramienta renderiza y codifica por completo en tu navegador: el PDF se dibuja en el canvas de tu dispositivo al DPI seleccionado, se codifica a PNG sin pérdidas en memoria y tu navegador lo guarda. No se sube ninguna página, no existe copia fuera de tu dispositivo en ningún momento, y la conversión se completa con la red desenchufada.",
            "El beneficio local se acumula en los lotes: convertir un manual de 200 páginas a PNGs produce cientos de archivos, y hacerlo en local significa sin espera de subida, sin topes de tamaño por archivo y sin colas por lotes — solo la velocidad de renderizado de tu dispositivo, que en una máquina moderna suele ser más rápida de lo que habría sido subir el mismo contenido.",
          ],
        },
      ],
    },
    pt: {
      name: "PDF para PNG",
      tagline:
        "Converta páginas de PDF em imagens PNG sem perdas na resolução escolhida — slides e digitalizações nítidos, com ZIP para muitas páginas.",
      intro: [
        "Quando os artefatos do JPG não são bem-vindos — capturas de slides, diagramas, formulários com letras pequenas — exporte as páginas como PNG. O formato sem perdas mantém bordas de letras e linhas finas pixel-perfect, de 96 a 300 DPI.",
        "Cada página é renderizada localmente com pdf.js na aparência exata que o PDF define. Os arquivos são nomeados por número de página e resultados com várias páginas vêm com um ZIP de um clique.",
      ],
      steps: [
        "Solte seu PDF na área.",
        "Escolha a resolução — 150 DPI é um padrão seguro.",
        "Clique em Converter para PNG e baixe as páginas ou o ZIP.",
      ],
      faqs: [
        {
          q: "Quando usar PNG em vez de JPG?",
          a: "Sempre que as páginas tiverem texto, cores chapadas ou desenhos lineares: PNG os mantém perfeitamente nítidos. JPG serve para páginas fotográficas, onde o tamanho importa mais.",
        },
        {
          q: "Por que os arquivos PNG são grandes?",
          a: "A compressão sem perdas preserva cada pixel, então o tamanho cresce com o DPI. Uma página densa a 300 DPI pode ter vários megabytes; baixe para 96–150 DPI para uso na tela.",
        },
        {
          q: "A transparência é mantida?",
          a: "As páginas são renderizadas sobre fundo branco, então o PNG sai opaco. Isso combina com a impressão de um PDF e evita surpresas de fundo negro em alguns visualizadores.",
        },
      ],
      deepDive: [
        {
          heading: "PNG contra JPG para capturas de página: quando cada um vence",
          paragraphs: [
            "PNG e JPG transformam páginas PDF em pixels, mas as codificam com filosofias opostas. JPG usa compressão com perdas afinada para fotografias: arquivos minúsculos, artefatos invisíveis em degradês, leve desfoque em bordas duras. PNG usa compressão sem perdas afinada para arte plano: texto, diagramas, prints e tudo que tem bordas nítidas ou áreas de cor sólida permanece perfeito pixel a pixel, ao custo de arquivos maiores para conteúdo fotográfico.",
            "A regra prática: páginas de texto, tabelas, gráficos e desenhos em linha pertencem ao PNG — as letras ficam nítidas em qualquer zoom e a compressão jamais borra uma linha do diagrama. Páginas de fotos digitalizadas, ou qualquer página dominada por imagem de tom contínuo, pertencem ao JPG — o PNG inflaria o tamanho sem ganho visível.",
            "PNG também mantém cores exatas onde a compressão de croma do JPG pode deslocar sutilmente cores saturadas de marca, e arquivos PNG são re-salvos sem perda generacional: editar e salvar de novo um PNG nunca o degrada, enquanto re-encodar JPG repetidamente acumula artefatos. Para páginas destinadas a edição posterior, PNG é a escolha de acervo.",
          ],
        },
        {
          heading: "Notas de nitidez, escala e transparência",
          paragraphs: [
            "Como o PNG é sem perdas, o único botão de qualidade é a resolução — renderize a 150 DPI para trabalho em tela e a 300 DPI para capturas nível impressão. Não há slider de compressão para errar, o que elimina uma classe inteira de erros: um PNG ou tem pixels suficientes ou não tem, e a correção completa para a suavidade é re-renderizar em DPI maior.",
            "Uma vantagem real sobre o JPG: PNG suporta transparência. Uma página renderizada em PNG com o fundo preservado pode ser composta sobre qualquer outro fundo; o JPG sempre achata numa cor sólida, normalmente branco. Para páginas de diagramas destinadas a slides ou arquivos de design, isso economiza um passo manual de remover o fundo.",
            "Atenção aos tamanhos em páginas densas: um PNG a 300 DPI de uma página cheia de fotos pode pesar dezenas de megabytes. Se o destino é uma página web ou mensagem de chat, esse tamanho dói mais do que a fidelidade ajuda — baixe o DPI ou mude para JPG exatamente nessas páginas.",
          ],
        },
        {
          heading: "Capturar páginas sem enviar para lugar nenhum",
          paragraphs: [
            "As pessoas capturam páginas PDF como imagens sobretudo para reutilizar: um gráfico para um relatório, uma página de assinaturas como evidência, um diagrama para material de treinamento. Cada imagem capturada é uma cópia autocontida que pode viajar muito além do documento original — e é exatamente por isso que importa quem faz a conversão. Enviar uma página confidencial a um conversor põe a cópia perfeita pixel a pixel na infraestrutura de outra pessoa antes de você fazer nada com ela.",
            "Esta ferramenta renderiza e codifica inteiramente no seu navegador: o PDF é desenhado no canvas do seu dispositivo no DPI selecionado, codificado em PNG sem perdas na memória e salvo pelo navegador. Nenhuma página é enviada, não existe cópia fora do seu dispositivo em nenhum momento, e a conversão se completa com a rede desconectada.",
            "O benefício local se acumula nos lotes: converter um manual de 200 páginas em PNGs produz centenas de arquivos, e fazer isso localmente significa sem espera de envio, sem tetos de tamanho por arquivo e sem filas de lote — só a velocidade de renderização do seu dispositivo, que numa máquina moderna costuma ser mais rápida do que teria sido enviar o mesmo conteúdo.",
          ],
        },
      ],
    },
  },
});
