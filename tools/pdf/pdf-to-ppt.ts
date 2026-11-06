import { PdfOfficeEngine } from "../_engines/pdf-engine-office";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "pdf-to-ppt",
  category: "pdf",
  icon: "file",
  engine: { component: PdfOfficeEngine, props: { target: "pptx" } },
  related: ["word-to-pdf", "pdf-to-jpg", "pdf-to-word", "merge-pdf", "compress-pdf", "split-pdf", "delete-pdf-pages", "ocr-pdf", "rotate-pdf", "pdf-to-text"],
  copy: {
    en: {
      name: "PDF to PowerPoint",
      tagline:
        "Convert each PDF page into a PowerPoint slide as a high-resolution image — layout-perfect slides generated on your own device.",
      intro: [
        "Need your PDF inside a slide deck? Each page is rendered at high resolution and placed on its own 16:9 slide, so the visual result matches the original exactly — fonts, colors and graphics stay put, even when the viewer has no fonts installed.",
        "Slides are images rather than editable text boxes: that is deliberate, because image slides never break across machines. Combine it with our PDF to Word tool when you also need the text.",
      
        "Each page is rendered to a high-resolution image and placed on a 16:9 slide at the best fit — so a 200-page deck becomes a 200-slide deck with the original layout intact. Because slides are pictures rather than reconstructed text boxes, fonts the viewer lacks cannot break the layout, which is the entire point.",
        "Compared with re-typing a PDF into PowerPoint or using an online converter that returns editable-but-broken text boxes, image slides preserve the visual truth of the document. The trade-off is honest: text is not editable, which is usually fine for reference decks — for the editable path, pair this with PDF to Word first.",
      ],
      steps: [
        "Drop the PDF you want in your deck.",
        "Click Convert to PowerPoint and let each page render.",
        "Download the .pptx and open it in PowerPoint, Keynote or Google Slides.",
      ],
      faqs: [
        {
          q: "Can I edit the text on the slides?",
          a: "No — each slide contains a faithful picture of the page, not text boxes. That guarantees identical appearance everywhere. Extract the text separately with PDF to Word if you need it editable.",
        },
        {
          q: "What slide size is used?",
          a: "Widescreen 16:9 (13.33 × 7.5 in), the PowerPoint default. Pages with other aspect ratios are centered and fitted without distortion.",
        },
        {
          q: "How large is the .pptx file?",
          a: "Roughly the size of all page images together — a 20-page PDF at high resolution can reach tens of megabytes. Compress the source PDF first if you need a lighter deck.",
        },
      ],
      deepDive: [
        {
          heading: "What PDF-to-PPT can honestly deliver",
          paragraphs: [
            "A slide deck exported to PDF is flattened: the editable text boxes, shapes and placeholders of the original presentation become placed glyphs and rectangles in the PDF. Converting back means reconstruction — the converter has to guess which glyphs form one text box, what was a shape versus an image, and where everything sat on the slide canvas. There is no metadata trail back to the original structure.",
            "So the honest expectation: you get slides that look like the original, with text you can select and edit, at approximately the right positions. You do not get back the original's exact nesting, animations (which never existed in the PDF to begin with), master-slide structure or precise theme tokens. Fonts may be substituted if the originals weren't embedded.",
            "Where this conversion shines: recovering an editable deck when the .pptx is lost and only the PDF survives; pulling two slides out of a colleague's deck to reuse in yours; making content tweaks to a received deck without asking for the source. Where it disappoints: pixel-perfect design decks built on overlapping elements, which reconstruct as stacked layers that look right but behave fiddly when edited.",
          ],
        },
        {
          heading: "Editing expectations and how to work with the result",
          paragraphs: [
            "Plan to adjust, not to expect identity. The most common post-conversion cleanups: text boxes whose bounds are slightly larger than their visible text (so clicking selects more than expected), images at close-but-not-exact positions, and font sizes rounded to the nearest available size. None of these affect how the slides look in presentation mode; they affect how tidy the file is to edit.",
            "A practical workflow: convert the PDF to PPT, then immediately check the slides that matter most to you — usually the title slide and one content slide. Fix fonts and one layout, and if the structure holds, batch-correct the rest with the slide master. If the structure does not hold — wildly overlapping boxes — the source deck's design was too layered to reverse cleanly, and re-creating those specific slides by hand will be faster than fighting the conversion.",
            "Charts deserve special mention: a chart that was an embedded image in the PDF stays an image in the PPT (not editable chart data); a chart drawn as vector shapes reconstructs as grouped shapes, which you can recolor but not re-plot with new numbers. Either way, the data behind a chart cannot be recovered from the PDF — it never was in there.",
          ],
        },
        {
          heading: "Decks travel; keep them home until converted",
          paragraphs: [
            "Presentations are business-confidential by default: strategy decks, financial reviews, M&A materials, unreleased product plans. A PDF of such a deck contains everything but the speaker notes — and uploading it to a conversion service means the full visual content of an internal presentation is readable on someone else's server, often within minutes of the meeting where it was shown.",
            "This tool reconstructs the slides entirely in your browser: the PDF is parsed and rendered on your device, slide elements are rebuilt locally, and the PPT file is saved directly by your browser. Nothing is uploaded, there is no processing queue, and the conversion runs identically offline — the deck never exists outside your machine in any form.",
            "Given that converted decks are meant to be edited anyway, local processing also fits the workflow: convert, open in your presentation software, and iterate as much as needed without re-uploading between attempts. Each conversion attempt costs seconds and nothing else — so you can try, inspect and adjust freely until the deck behaves the way you need.",
          ],
        },
      ],
    },
    zh: {
      name: "PDF 转 PowerPoint",
      tagline: "把 PDF 每页转成高分辨率图片式幻灯片——版式完全一致,在你自己的设备上生成 .pptx。",
      intro: [
        "需要把 PDF 放进演示文稿?每页都会以高分辨率渲染,放进独立的 16:9 幻灯片,视觉效果与原文件完全一致——字体、颜色、图形原样呈现,对方电脑缺字体也不会乱。",
        "幻灯片是图片而不是可编辑文本框:这是有意为之,图片幻灯片在任何电脑上都不会跑版。如果还需要文字,可以配合“PDF 转 Word”使用。",
      ],
      steps: [
        "拖入要放进演示文稿的 PDF。",
        "点击“转换为 PowerPoint”,等待各页渲染完成。",
        "下载 .pptx,用 PowerPoint、Keynote 或 Google Slides 打开。",
      ],
      faqs: [
        {
          q: "幻灯片上的文字可以编辑吗?",
          a: "不可以——每张幻灯片是页面的忠实图片,不是文本框。这保证了在任何设备上显示一致。需要可编辑文字时,可另外使用“PDF 转 Word”。",
        },
        {
          q: "幻灯片是什么尺寸?",
          a: "宽屏 16:9(13.33 × 7.5 英寸),即 PowerPoint 默认尺寸。比例不同的页面会居中缩放,不会变形。",
        },
        {
          q: "生成的 .pptx 会很大吗?",
          a: "大约等于所有页面图片的体积之和——20 页的高分辨率 PDF 可能达到几十 MB。想要更小的文件,可以先用“压缩 PDF”处理原件。",
        },
      ],
      deepDive: [
        {
          heading: "PDF 转 PPT 能诚实交付什么",
          paragraphs: [
            "导出为 PDF 的幻灯片是被压平的:原始演示里可编辑的文本框、形状和占位符,变成了 PDF 里摆好位置的字符和矩形。转回去意味着重建——转换器要猜哪些字符构成一个文本框、哪些是形状哪些是图片、每样东西在画布上的位置。没有任何元数据可以追溯到原始结构。",
            "所以诚实的预期是:你能得到看起来像原稿、文字可选中可编辑、位置大体正确的幻灯片。你拿不回原稿的精确嵌套结构、动画(PDF 里本来就从来没有)、母版结构或精确的主题参数。字体若未嵌入,还会被替换。",
            "这种转换的亮点:当 .pptx 丢了只剩 PDF 时恢复一份可编辑的演示;从同事的文档里抽出两页放进自己的;收到别人的演示又不便要源文件时做些内容微调。它令人失望的地方:建立在元素层层叠叠之上的设计型幻灯片——重建出来是看着对、编辑起来麻烦的堆叠图层。",
          ],
        },
        {
          heading: "编辑预期与怎么用转换结果",
          paragraphs: [
            "做好调整的准备,别指望一模一样。转换后最常见的清理:文本框边界比可见文字略大(点一下会选中比预期更多的东西)、图片位置接近但不完全一致、字号被取整到最接近的可用字号。这些都不影响放映时的观感,影响的是编辑时的整洁度。",
            "实用流程:转成 PPT 后,立刻检查你最在乎的几页——通常是标题页和一页内容页。修好字体和一处版式,结构成立的话,用母版批量修正其余部分。如果结构不成立——文本框大面积叠罗汉——说明原稿的设计层次太深,无法干净逆向,手动重建那几页会比和转换结果搏斗更快。",
            "图表要单独说:PDF 里作为嵌入图片的图表,PPT 里仍是图片(不是可编辑的图表数据);作为矢量形状绘制的图表,重建后是一组形状——可以改色,但不能代入新数据重新绘图。无论哪种,图表背后的数据都从 PDF 里拿不回来——它从来就没在里面。",
          ],
        },
        {
          heading: "演示文稿到处流通;转换前让它留在家里",
          paragraphs: [
            "演示文稿默认就是商业机密:战略 deck、财务评审、并购材料、未发布的产品计划。这类 deck 的 PDF 包含除演讲备注外的一切——把它上传给转换服务,意味着一场内部演示的完整视觉内容,在别人的服务器上可读,而且往往就在展示它的会议之后的几分钟里。",
            "本工具完全在浏览器里重建幻灯片:PDF 在你设备上解析渲染,幻灯片元素在本地重组,PPT 文件由浏览器直接保存。什么都不上传,没有处理队列,离线时转换照常进行——这份 deck 以任何形式都不会存在于你机器之外。",
            "反正转换出的 deck 就是要编辑的,本地处理也正好契合工作流:转换、在演示软件里打开、需要几轮就迭代几轮,尝试之间不用重新上传。每次转换只花几秒、成本为零——你可以放开手脚试、看、调,直到这份 deck 表现成你需要的样子。",
          ],
        },
      ],
    },
    ja: {
      name: "PDF を PowerPoint に変換",
      tagline: "PDF の各ページを高解像度画像のスライドに変換。レイアウトをそのままに、.pptx を自分の端末上で生成します。",
      intro: [
        "PDF をスライド資料に入れたいときに。各ページは高解像度でレンダリングされ、16:9 のスライドに 1 枚ずつ配置されます。フォント・色・グラフィックはそのまま、フォントが入っていない端末でも表示は崩れません。",
        "スライドはテキストボックスではなく画像です。これは意図的な設計で、画像スライドはどの環境でも崩れません。編集可能なテキストが必要なときは「PDF を Word に」と併用してください。",
      ],
      steps: [
        "資料に入れたい PDF をドロップします。",
        "「PowerPoint に変換」をクリックし、各ページの描画を待ちます。",
        ".pptx をダウンロードし、PowerPoint・Keynote・Google スライドで開きます。",
      ],
      faqs: [
        {
          q: "スライドの文字を編集できますか?",
          a: "できません。各スライドはページの忠実な画像であり、テキストボックスではありません。だからこそどこでも同じ見た目になります。編集用のテキストは「PDF を Word に」で別途抽出できます。",
        },
        {
          q: "スライドのサイズは?",
          a: "ワイド画面 16:9(13.33 × 7.5 インチ)、PowerPoint の既定サイズです。アスペクト比が違うページは、歪みなしで中央に収めて配置します。",
        },
        {
          q: ".pptx のファイルサイズはどのくらい?",
          a: "各ページ画像の合計が目安です。高解像度の 20 ページ PDF では数十 MB になることもあります。軽くしたい場合は元 PDF を先に圧縮してください。",
        },
      ],
      deepDive: [
        {
          heading: "PDF から PPT へが誠実に届けられるもの",
          paragraphs: [
            "PDF に書き出されたスライドは平たんです。元のプレゼンの、編集可能だったテキストボックスや図形やプレースホルダは、PDF では配置された文字と長方形になります。逆変換は再構築です。どの文字が一つのテキストボックスを作るか、何が図形で何が画像か、すべてがスライドキャンバスのどこに座るかを、変換器が推測しなければなりません。元の構造へ遡れるメタデータの痕跡はどこにもありません。",
            "だから誠実な期待値はこうです。元に似た見た目のスライドが、選択と編集できるテキストとともに、ほぼ正しい位置で手に入ります。手に入らないのは、元の正確な入れ子構造、アニメーション(PDF には最初から存在しなかった)、スライドマスターの構造、正確なテーマのトークン。フォントは元が埋め込まれていなければ代替されます。",
            "この変換が輝く場面:.pptx を失い PDF だけが残ったときに編集可能な deck を復元する。同僚の deck から二枚だけ抜き出して自分のものへ使う。受け取った deck の内容を、ソースを頼まずに微調整する。失望する場面:要素を幾重にも重ねたデザイン性の高い deck。再構築されると正しく見えて編集すると扱いにくい、積み重なったレイヤーになります。",
          ],
        },
        {
          heading: "編集の期待値と、結果との付き合い方",
          paragraphs: [
            "同一を期待せず、調整を前提にしてください。変換後の定番の清掃は、テキストボックスの境界が表示テキストよりわずかに大きいこと(クリックすると予想以上に選ばれる)、画像の位置が近いが正確ではないこと、フォントサイズが利用可能なサイズへ丸められること。どれも発表モードでの見た目には影響せず、編集の整理しやすさに影響します。",
            "実践的な流れ:PPT へ変換したら、すぐに最も大事なスライド——通常はタイトルと一枚の内容スライド——を確認します。フォントと一つのレイアウトを直し、構造が保っていればスライドマスターで残りを一括修正します。構造が保たない(箱が激しく重なる)なら、元の deck のデザインが層が深すぎてきれいに逆変換できなかったということです。その特定のスライドを手で作り直すほうが、変換結果と格闘するより速いでしょう。",
            "グラフには特記が必要です。PDF で埋め込み画像だったグラフは PPT でも画像のままです(編集可能なグラフデータではない)。ベクタ図形として描かれたグラフはグループ化された図形として再構成され、色は変えられますが新しい数値で再プロットはできません。いずれにせよ、グラフの裏のデータは PDF からは復元できません。最初から入っていなかったのですから。",
          ],
        },
        {
          heading: "deck は流通する。変換までは家に置いておく",
          paragraphs: [
            "プレゼン資料は既定で業務機密です。戦略 deck、財務レビュー、M&A 資料、未発表の製品計画。そういう deck の PDF には発表者メモ以外のすべてが入っています。それを変換サービスにアップロードすることは、社内プレゼンの視覚内容の全体が他人のサーバー上で読める状態になることで、しかも多くの場合、提示した会議の数分後にはです。",
            "このツールはスライドを完全にブラウザ内で再構築します。PDF は端末上で解析・描画され、スライド要素はローカルで組み立てられ、PPT ファイルはブラウザが直接保存します。アップロードは一切なく、処理の待ち行列もなく、オフラインでも変換は同じように動きます。deck はどんな形でも端末の外には存在しません。",
            "変換後の deck は元々編集するためのものなので、ローカル処理はワークフローにも合います。変換、プレゼンソフトで開く、必要なだけ反復。試行の間に再アップロードは不要です。各試行は数秒とゼロのコストなので、deck が望む通りに振る舞うまで、自由に試して、見て、調整できます。",
          ],
        },
      ],
    },
    es: {
      name: "PDF a PowerPoint",
      tagline:
        "Convierte cada página del PDF en una diapositiva de PowerPoint como imagen de alta resolución: diapositivas fieles generadas en tu dispositivo.",
      intro: [
        "¿Necesitas tu PDF dentro de una presentación? Cada página se dibuja en alta resolución y se coloca en su propia diapositiva 16:9, así que el resultado visual coincide exactamente con el original: las fuentes, los colores y los gráficos no se mueven, aunque al que lo abra le falten fuentes.",
        "Las diapositivas son imágenes, no cuadros de texto editables: es a propósito, porque las diapositivas de imagen nunca se rompen entre equipos. Combínalo con PDF a Word cuando también necesites el texto.",
      ],
      steps: [
        "Suelta el PDF que quieres en tu presentación.",
        "Pulsa Convertir a PowerPoint y deja que se dibuje cada página.",
        "Descarga el .pptx y ábrelo en PowerPoint, Keynote o Google Slides.",
      ],
      faqs: [
        {
          q: "¿Puedo editar el texto de las diapositivas?",
          a: "No: cada diapositiva contiene una imagen fiel de la página, no cuadros de texto. Eso garantiza idéntica apariencia en todas partes. Extrae el texto con PDF a Word si lo necesitas editable.",
        },
        {
          q: "¿Qué tamaño de diapositiva se usa?",
          a: "Panorámica 16:9 (13,33 × 7,5 pulgadas), la opción predeterminada de PowerPoint. Las páginas con otra proporción se centran y ajustan sin deformarse.",
        },
        {
          q: "¿Cuánto pesa el .pptx?",
          a: "Aproximadamente la suma de las imágenes de página: un PDF de 20 páginas en alta resolución puede alcanzar decenas de megabytes. Comprime el PDF de origen primero si quieres algo más ligero.",
        },
      ],
      deepDive: [
        {
          heading: "Lo que PDF-a-PPT puede entregar con honestidad",
          paragraphs: [
            "Una presentación exportada a PDF está aplanada: los cuadros de texto, formas y marcadores de posición editables de la presentación original se convierten en glifos y rectángulos colocados en el PDF. Convertir de vuelta es reconstrucción — el conversor tiene que adivinar qué glifos forman un cuadro de texto, qué era forma y qué imagen, y dónde estaba todo en el lienzo de la diapositiva. No hay rastro de metadatos hacia la estructura original.",
            "Así que la expectativa honesta: obtienes diapositivas que se parecen a la original, con texto seleccionable y editable, en posiciones aproximadamente correctas. No recuperas la anidación exacta del original, ni las animaciones (que nunca existieron en el PDF), ni la estructura de patrón de diapositivas ni los tokens precisos del tema. Las fuentes pueden sustituirse si las originales no estaban incrustadas.",
            "Dónde brilla esta conversión: recuperar una presentación editable cuando se perdió el .pptx y solo sobrevive el PDF; sacar dos diapositivas de la presentación de un colega para reutilizarlas en la tuya; retocar el contenido de una presentación recibida sin pedir el original. Dónde decepciona: presentaciones de diseño construidas sobre elementos superpuestos, que se reconstruyen como capas apiladas que se ven bien pero se editan con dificultad.",
          ],
        },
        {
          heading: "Expectativas de edición y cómo trabajar con el resultado",
          paragraphs: [
            "Planea ajustar, no esperar identidad. Las limpiezas más comunes tras convertir: cuadros de texto cuyos límites son algo mayores que su texto visible (al hacer clic seleccionas más de lo esperado), imágenes en posiciones cercanas pero no exactas, y tamaños de fuente redondeados al tamaño disponible más próximo. Nada de esto afecta a cómo se ven las diapositivas en modo presentación; afecta a lo pulido que resulta el archivo al editar.",
            "Un flujo práctico: convierte el PDF a PPT y revisa enseguida las diapositivas que más te importan — normalmente la portada y una de contenido. Corrige fuentes y una maquetación, y si la estructura aguanta, corrige el resto por el patrón de diapositivas. Si la estructura no aguanta — cuadros amontonados — el diseño de la fuente tenía demasiadas capas para revertir limpiamente, y recrear esas diapositivas a mano será más rápido que pelear con la conversión.",
            "Las gráficas merecen mención especial: una gráfica que era imagen incrustada en el PDF sigue siendo imagen en el PPT (sin datos de gráfica editables); una gráfica dibujada como formas vectoriales se reconstruye como grupo de formas, que puedes recolorear pero no volver a trazar con números nuevos. En cualquier caso, los datos detrás de una gráfica no se pueden recuperar del PDF — nunca estuvieron ahí.",
          ],
        },
        {
          heading: "Las presentaciones viajan; tenlas en casa hasta convertirlas",
          paragraphs: [
            "Las presentaciones son confidenciales por defecto: decks de estrategia, revisiones financieras, materiales de fusiones, planes de producto no lanzados. El PDF de semejante deck contiene todo salvo las notas del ponente — y subirlo a un servicio de conversión significa que el contenido visual completo de una presentación interna es legible en el servidor de otra persona, a menudo minutos después de la reunión en que se mostró.",
            "Esta herramienta reconstruye las diapositivas por completo en tu navegador: el PDF se analiza y se dibuja en tu dispositivo, los elementos se reconstruyen en local, y el archivo PPT lo guarda directamente tu navegador. No se sube nada, no hay cola de procesamiento, y la conversión funciona igual sin conexión — la presentación no existe fuera de tu máquina en ninguna forma.",
            "Como las presentaciones convertidas van a editarse de todos modos, el procesamiento local encaja con el flujo: convertir, abrir en tu software de presentaciones e iterar lo que haga falta sin re-subir entre intentos. Cada intento cuesta segundos y nada más — puedes probar, inspeccionar y ajustar libremente hasta que la presentación se comporte como necesitas.",
          ],
        },
      ],
    },
    pt: {
      name: "PDF para PowerPoint",
      tagline:
        "Converta cada página do PDF em um slide do PowerPoint como imagem de alta resolução — slides fiéis gerados no seu próprio dispositivo.",
      intro: [
        "Precisa do seu PDF dentro de uma apresentação? Cada página é renderizada em alta resolução e colocada no seu próprio slide 16:9, então o resultado visual é idêntico ao original — fontes, cores e gráficos ficam no lugar, mesmo sem as fontes instaladas em quem abrir.",
        "Os slides são imagens, não caixas de texto editáveis: é de propósito, porque slides em imagem nunca quebram entre máquinas. Combine com PDF para Word quando também precisar do texto.",
      ],
      steps: [
        "Solte o PDF que quer na sua apresentação.",
        "Clique em Converter para PowerPoint e aguarde a renderização de cada página.",
        "Baixe o .pptx e abra no PowerPoint, Keynote ou Google Slides.",
      ],
      faqs: [
        {
          q: "Dá para editar o texto dos slides?",
          a: "Não — cada slide contém uma imagem fiel da página, não caixas de texto. Isso garante aparência idêntica em todo lugar. Extraia o texto com PDF para Word se precisar dele editável.",
        },
        {
          q: "Qual o tamanho dos slides?",
          a: "Widescreen 16:9 (13,33 × 7,5 pol), o padrão do PowerPoint. Páginas com outras proporções são centralizadas e ajustadas sem distorção.",
        },
        {
          q: "Quanto pesa o arquivo .pptx?",
          a: "Mais ou menos a soma das imagens das páginas — um PDF de 20 páginas em alta resolução pode chegar a dezenas de megabytes. Comprima o PDF de origem antes se quiser algo mais leve.",
        },
      ],
      deepDive: [
        {
          heading: "O que PDF-para-PPT pode entregar com honestidade",
          paragraphs: [
            "Uma apresentação exportada para PDF está achatada: as caixas de texto, formas e espaços reservados editáveis da apresentação original viram glifos e retângulos posicionados no PDF. Converter de volta é reconstrução — o conversor precisa adivinhar quais glifos formam uma caixa de texto, o que era forma e o que era imagem, e onde cada coisa estava na tela do slide. Não há trilha de metadados de volta à estrutura original.",
            "A expectativa honesta então: você recebe slides parecidos com o original, com texto selecionável e editável, em posições aproximadamente corretas. Você não recupera o aninhamento exato do original, nem as animações (que nunca existiram no PDF), nem a estrutura de slide mestre nem os tokens precisos do tema. Fontes podem ser substituídas se as originais não estavam embutidas.",
            "Onde essa conversão brilha: recuperar uma apresentação editável quando o .pptx se perdeu e só sobrou o PDF; tirar dois slides da apresentação de um colega para reutilizar na sua; retocar o conteúdo de uma apresentação recebida sem pedir o original. Onde decepciona: decks de design construídos sobre elementos sobrepostos, que se reconstruem como camadas empilhadas que parecem certas mas editam com dificuldade.",
          ],
        },
        {
          heading: "Expectativas de edição e como trabalhar com o resultado",
          paragraphs: [
            "Planeje ajustar, não esperar identidade. As limpezas mais comuns depois de converter: caixas de texto cujos limites são um pouco maiores que o texto visível (clicar seleciona mais do que esperado), imagens em posições próximas mas não exatas, e tamanhos de fonte arredondados ao tamanho disponível mais próximo. Nada disso afeta como os slides aparecem em modo apresentação; afeta o quão arrumado o arquivo fica para editar.",
            "Um fluxo prático: converta o PDF para PPT e confira logo os slides que mais importam — normalmente a capa e um de conteúdo. Corrija fontes e um layout, e se a estrutura aguentar, corrija o resto pelo slide mestre. Se a estrutura não aguentar — caixas amontoadas — o design da origem tinha camadas demais para reverter limpo, e recriar esses slides à mão será mais rápido que brigar com a conversão.",
            "Gráficos merecem menção especial: um gráfico que era imagem embutida no PDF continua imagem no PPT (sem dados de gráfico editáveis); um gráfico desenhado como formas vetoriais se reconstrói como grupo de formas, que você pode recolorir mas não replotar com números novos. De qualquer jeito, os dados por trás de um gráfico não se recuperam do PDF — nunca estiveram lá.",
          ],
        },
        {
          heading: "Apresentações viajam; mantenha-as em casa até converter",
          paragraphs: [
            "Apresentações são confidenciais por padrão: decks de estratégia, revisões financeiras, materiais de fusões, planos de produto não lançados. O PDF de tal deck contém tudo menos as notas do apresentador — e enviá-lo a um serviço de conversão significa que o conteúdo visual completo de uma apresentação interna fica legível no servidor de outra pessoa, muitas vezes minutos depois da reunião em que foi mostrado.",
            "Esta ferramenta reconstrói os slides inteiramente no seu navegador: o PDF é analisado e desenhado no seu dispositivo, os elementos são remontados localmente, e o arquivo PPT é salvo diretamente pelo seu navegador. Nada é enviado, não há fila de processamento, e a conversão funciona igual offline — a apresentação não existe fora da sua máquina em nenhuma forma.",
            "Como os decks convertidos vão ser editados de qualquer jeito, o processamento local encaixa no fluxo: converter, abrir no seu software de apresentação e iterar o quanto precisar sem reenviar entre tentativas. Cada tentativa custa segundos e nada mais — você pode tentar, inspecionar e ajustar livremente até o deck se comportar como você precisa.",
          ],
        },
      ],
    },
  },
});
