import { PdfPagesEngine } from "../_engines/pdf-engine-pages";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "rotate-pdf",
  category: "pdf",
  icon: "rotate",
  engine: { component: PdfPagesEngine, props: { op: "rotate" } },
  related: ["merge-pdf", "split-pdf", "delete-pdf-pages", "rearrange-pdf-pages", "compress-pdf", "pdf-to-ppt", "ocr-pdf", "pdf-to-text", "jpg-to-pdf", "page-numbers-pdf"],
  copy: {
    en: {
      name: "Rotate PDF",
      tagline:
        "Rotate PDF pages by 90, 180 or 270 degrees and save the change permanently — fix sideways scans in your browser, no upload.",
      intro: [
        "Scanned sideways or upside down? Rotate every page at once, or target just the pages that need fixing with a list like “1, 3-5”. The rotation is written into the PDF itself, so it opens right-side up in every reader.",
        "Many viewers only rotate pages temporarily — this tool changes the page /Rotate attribute with pdf-lib on your device, which is why the fix survives printing, sharing and re-uploading.",
        "Rotation is applied through each page's /Rotate attribute — one of the four standard values 0, 90, 180 or 270 defined by the PDF specification — rather than by re-rendering or moving content. That makes the operation completely lossless: file size barely changes, text remains selectable, and the change is recognized by every conforming PDF reader, viewer and printer.",
        "The distinction matters because many desktop viewers only rotate pages in their own display state. A page fixed here stays fixed when it is printed, attached to an email, or opened on a phone — the attribute travels inside the file itself. You can also mix orientations within one document, rotating only the pages you list."
      ],
      steps: [
        "Drop the PDF whose pages need rotating.",
        "Pick 90°, 180° or 270° and optionally limit the rotation to specific pages.",
        "Click Rotate pages and download the corrected PDF.",
      ],
      faqs: [
        {
          q: "Is the rotation permanent?",
          a: "Yes. The page rotation attribute is updated inside the file, so every PDF reader, printer and preview shows the corrected orientation — not just this browser tab.",
        },
        {
          q: "How do I rotate only some pages?",
          a: "Fill the pages field with a list such as “2, 5-7”. Leave it empty to rotate the whole document. Ranges follow the same syntax as the other page tools.",
        },
        {
          q: "Does rotating re-encode or compress my pages?",
          a: "No. Only the rotation flag changes; page content is untouched, so quality is identical and text remains selectable.",
        },
      ],
      deepDive: [
        {
          heading: "Rotation is metadata, not pixels",
          paragraphs: [
            "Each page in a PDF carries a rotation flag — a simple value (in 90-degree steps) that tells viewers to display the page turned. Rotating a page with this tool changes that flag, not the page's content: text, images and vectors stay exactly where they were in the file. This is why rotation is instant and perfectly lossless, even for hundred-megabyte files.",
            "The flag mechanism explains a familiar quirk: a page can contain upright content but display sideways (or vice versa) depending on its rotation flag. Some scanners and some PDF producers set the flag rather than truly rotating the content. Rotating such a page flips the flag; the underlying content is untouched either way.",
            "One consequence worth knowing: because rotation lives in a flag, tools that ignore it — some basic parsers, some thumbnail generators — can show the \"raw\" orientation. And if you later rasterize the page (e.g., compress it), the rendering happens at the rotated orientation and the flag's job becomes permanent. Rotation before rasterization is therefore the correct order.",
          ],
        },
        {
          heading: "Scans, mixed orientations and practical fixes",
          paragraphs: [
            "The most common rotation job is fixing scans: a duplex scanner flips the back sides, a phone camera produces a sideways receipt, a batch comes out with alternating orientations. Fixing these per-page is exactly what this tool is for — select the odd ones out and turn them. Rotate-all is the wrong move there; it fixes the right ones by breaking them.",
            "For documents that will be printed or bound, think about which edge is the binding edge after rotation. A page rotated 90 degrees reads naturally on screen but may print with its \"top\" along the sheet's short edge, which changes how margins fall. Checking one printed page before running the whole batch saves paper and frustration.",
            "A note on why some pages seem to \"un-rotate\": if a viewer remembers the flag and another tool re-saves the file without carrying the flag over, orientation resets. Keeping the edit chain within flag-preserving tools (like this one) avoids the reset; if a page keeps coming back sideways after every fix, some step in your pipeline is dropping the flag.",
          ],
        },
        {
          heading: "Turning pages locally, at zero cost",
          paragraphs: [
            "Rotating is usually a fix applied to documents you already possess and trust: your own scans, files colleagues sent you. The reason to still insist on local processing is consistency of principle — a document that never goes to a third party for any operation is a document whose exposure surface you fully control. There is no operation so trivial that it justifies establishing an upload habit with confidential files.",
            "This tool rotates in your browser: the PDF is read locally, page flags are updated in memory, and the output is saved by your device. No upload occurs, and because only flags change, the operation is effectively instant even for very large files — there is no re-encoding wait of any kind.",
            "The flag-level nature also means rotation here is safely reversible: rotate 90 degrees four times and you are back to the exact original, bit for bit. You can experiment freely — flip a page, view it, flip it back — without any risk to the file, which is exactly the kind of low-stakes operation where local tools shine.",
          ],
        },
      ],
    },
    zh: {
      name: "旋转 PDF",
      tagline: "把 PDF 页面旋转 90°、180° 或 270° 并永久保存——在浏览器里修正横倒的扫描件,无需上传。",
      intro: [
        "扫描件横着或倒着?可以一次性旋转全部页面,也可以用“1, 3-5”这样的列表只转需要的页。旋转信息会写入 PDF 文件本身,任何阅读器打开都是正的。",
        "很多阅读器只是临时旋转显示;本工具通过 pdf-lib 在本地修改页面 /Rotate 属性,因此修正后的方向在打印、分享、再上传时都保持不变。",
      ],
      steps: [
        "拖入需要旋转的 PDF。",
        "选择 90°、180° 或 270°,也可只指定部分页码。",
        "点击“旋转页面”,下载修正后的 PDF。",
      ],
      faqs: [
        {
          q: "旋转是永久生效的吗?",
          a: "是的。旋转属性直接写入文件,所有阅读器、打印机和预览都会显示修正后的方向,而不是只在当前浏览器里。",
        },
        {
          q: "怎么只旋转部分页面?",
          a: "在页码框填入列表,如“2, 5-7”;留空则旋转整个文档。范围语法与其他页面工具一致。",
        },
        {
          q: "旋转会重新编码或压缩页面吗?",
          a: "不会。只修改旋转标志,页面内容不动,质量完全一致,文字仍可选中。",
        },
      ],
      deepDive: [
        {
          heading: "旋转是元数据,不是像素",
          paragraphs: [
            "PDF 里每一页都带一个旋转标志——一个简单值(以 90 度为单位)告诉阅读器把页面转着显示。本工具旋转页面改的是这个标志,不是页面内容:文字、图片、矢量在文件里原位不动。这就是为什么旋转是瞬时的、完全无损的,哪怕文件有一百 MB。",
            "标志机制解释了一个熟悉的现象:一页的内容是正的,显示却是横的(或反过来),取决于它的旋转标志。有些扫描仪和有些 PDF 生成器会设置标志而不是真正旋转内容。旋转这样的页面就是翻转标志;底层内容无论如何都没被碰过。",
            "一个值得知道的后果:因为旋转住在标志里,忽略它的工具——一些基础解析器、一些缩略图生成器——会显示“原始”方向。而且如果之后把页面栅格化(比如压缩),渲染发生在旋转后的方向上,标志的任务从此成为永久。所以先旋转、后栅格化才是正确顺序。",
          ],
        },
        {
          heading: "扫描件、横竖混杂与实用修法",
          paragraphs: [
            "最常见的旋转活是修扫描件:双面扫描器把背面翻了个方向,手机拍出的票据是横的,一批页出来方向交替。逐页修正是本工具的本职——挑出不对的那些页,转过来。这种场合“全部旋转”是错误动作;把对的修成了错的。",
            "对要打印或装订的文档,想想旋转之后哪条边是装订边。旋转 90 度的页在屏幕上读着自然,打印时“顶边”可能落在纸张短边上,页边距随之改变。整批跑之前先打一页试试,省纸又省心。",
            "说说为什么有的页面好像“转回去了”:如果阅读器记住了标志,而另一个工具重新保存文件时没把标志带过去,方向就会复位。把编辑链条保持在保留标志的工具里(比如本工具)就不会复位;如果一页每修一次又横回来,说明流水线里有一步把标志丢了。",
          ],
        },
        {
          heading: "本地翻页,零成本",
          paragraphs: [
            "旋转通常是对你已拥有、已信任的文档做的修整:自己的扫描件、同事发来的文件。仍然坚持本地处理的理由是原则的一致性——一份从不为任何操作去第三方的文档,是一份暴露面完全在你掌控中的文档。没有哪个操作琐碎到值得为机密文件养成上传习惯。",
            "本工具在浏览器里旋转:PDF 本地读取,页面标志在内存中更新,输出由你的设备保存。没有任何上传,而且因为只改标志,即使很大的文件也近乎瞬时——没有任何形式的重新编码等待。",
            "标志级的本质还意味着这里的旋转可以放心撤销:90 度转四次,回到的正是原文件,逐位一致。你可以随便实验——翻一页、看看、再翻回去——对文件毫无风险,而这正是本地工具最能发光的那类低风险操作。",
          ],
        },
      ],
    },
    ja: {
      name: "PDF 回転",
      tagline: "PDF のページを 90°・180°・270° 回転して変更をファイルに保存。横向きスキャンをブラウザ内で修正でき、アップロード不要です。",
      intro: [
        "スキャンした文書が横向き・逆向き?全ページを一括で回転できるほか、「1, 3-5」のような指定で必要なページだけを修正できます。回転情報は PDF 自体に書き込まれるため、どのビューアでも正しい向きで開きます。",
        "多くのビューアの回転は一時的な表示変更にすぎません。このツールは pdf-lib でページの /Rotate 属性を端末上で書き換えるため、印刷・共有・再アップロード後も向きは保たれます。",
      ],
      steps: [
        "回転したい PDF をドロップします。",
        "90°・180°・270° から選び、必要なら対象ページを指定します。",
        "「ページを回転」をクリックし、修正済み PDF をダウンロードします。",
      ],
      faqs: [
        {
          q: "回転は恒久的に保存されますか?",
          a: "はい。ページの回転属性をファイル内で更新するため、すべての PDF リーダー・印刷・プレビューで修正後の向きが表示されます。",
        },
        {
          q: "特定のページだけ回転できますか?",
          a: "ページ欄に「2, 5-7」のようなリストを入力してください。空欄のままなら文書全体を回転します。範囲の書式は他のページツールと同じです。",
        },
        {
          q: "回転するとページが再エンコードされますか?",
          a: "されません。回転フラグだけが変わり、ページ内容は無傷です。品質は同一で、テキストも選択可能なままです。",
        },
      ],
      deepDive: [
        {
          heading: "回転はピクセルではなくメタデータ",
          paragraphs: [
            "PDF の各ページは回転フラグを持っています。90 度刻みの単純な値で、ビューアにページを回して表示するよう指示するものです。このツールでのページ回転はそのフラグを変えるだけで、ページの内容は変えません。テキスト、画像、ベクタはファイル内の元の位置に正確に留まります。だから回転は瞬時で、完全に可逆です。百 MB のファイルでも同じです。",
            "フラグの仕組みは、見慣れた気まぐれを説明します。ページの内容は正立なのに横に表示される(あるいはその逆)ことがあります。それは回転フラグ次第です。一部の走査器や PDF 生成器は、内容を本当に回転させずにフラグを設定します。そういうページを回転するとフラグが反転します。下にある内容はどちらにしても無傷です。",
            "知っておくべき帰結が一つ。回転はフラグの中に住むので、それを無視する道具——基礎的なパーサ、一部のサムネイル生成器——は「生」の向きを表示し得ます。さらに後でページをラスタライズすると(圧縮など)、描画は回転後の向きで行われ、フラグの仕事は恒久になります。だからラスタライズの前の回転が正しい順序です。",
          ],
        },
        {
          heading: "走査、混在した向き、実用的な直し方",
          paragraphs: [
            "最も多い回転の仕事は走査の修正です。両面走査器は裏面を反転させ、携帯カメラは領収書を横向きに産み、一括は方向が交互になることがあります。こうしたものをページごとに直すのがまさにこのツールの役目です。外れのページを選んで回します。ここで「全部回転」は誤りです。正しいものを壊して直すことになります。",
            "印刷や製本を予定する文書では、回転後にどの辺が製本辺かを考えてください。90 度回転したページは画面では自然に読めますが、印刷では「上」が用紙の短辺に沿うことがあり、余白の落ち方が変わります。一括の前に一頁印刷して確かめると、紙と苛立ちを節約できます。",
            "一部のページが「元に戻る」ように見える理由:ビューアがフラグを覚えていても、別の道具がフラグを引き継がずにファイルを再保存すると、向きは初期化されます。編集の連鎖をフラグを保つ道具(このツールのように)の中に保てば初期化を避けられます。直すたびに横に戻るなら、パイプラインのどこかの段がフラグを落としています。",
          ],
        },
        {
          heading: "端末内でページを回す。コストはゼロ",
          paragraphs: [
            "回転はたいてい、自分がすでに持ち、信頼している文書への修正です。自分の走査、同僚から来たファイル。それでもローカル処理にこだわる理由は原則の一貫性です。どんな操作でも第三者に行かせない文書は、露出面を完全に制御できる文書です。機密ファイルとのアップロード習慣を確立してまで正当化されるほど些細な操作はありません。",
            "このツールはブラウザ内で回転します。PDF はローカルで読み込まれ、ページフラグはメモリ内で更新され、出力は端末が保存します。アップロードは一切なく、フラグしか変わらないため、非常に大きなファイルでも実質即時です。再符号化の待ち時間はどんな形でもありません。",
            "フラグ段階であることは、ここでの回転が安全に取り消せることも意味します。90 度を四度回せば、ビット単位で正確な元に戻ります。自由に実験できます。一頁ひっくり返し、見て、また戻す。ファイルへのリスクはゼロで、まさにローカル道具が輝く種類の低リスク操作です。",
          ],
        },
      ],
    },
    es: {
      name: "Rotar PDF",
      tagline:
        "Gira las páginas de un PDF 90, 180 o 270 grados y guarda el cambio de forma permanente: endereza escaneos en tu navegador, sin subirlos.",
      intro: [
        "¿Un escaneo tumbado o boca abajo? Gira todas las páginas de una vez o apunta solo a las que lo necesitan con una lista como “1, 3-5”. La rotación se escribe dentro del propio PDF, así que se abre bien en cualquier lector.",
        "Muchos visores solo giran las páginas temporalmente: esta herramienta modifica el atributo /Rotate con pdf-lib en tu dispositivo, por eso la corrección sobrevive a imprimir, compartir y volver a subir el archivo.",
      ],
      steps: [
        "Suelta el PDF cuyas páginas hay que girar.",
        "Elige 90°, 180° o 270° y, si quieres, limita la rotación a páginas concretas.",
        "Pulsa Rotar páginas y descarga el PDF corregido.",
      ],
      faqs: [
        {
          q: "¿La rotación es permanente?",
          a: "Sí. El atributo de rotación se actualiza dentro del archivo, así que todos los lectores, impresoras y vistas previas muestran la orientación corregida, no solo esta pestaña.",
        },
        {
          q: "¿Cómo giro solo algunas páginas?",
          a: "Escribe en el campo de páginas una lista como “2, 5-7”. Déjalo vacío para girar todo el documento. Los rangos usan la misma sintaxis que las demás herramientas.",
        },
        {
          q: "¿Al girar se re-codifican las páginas?",
          a: "No. Solo cambia el indicador de rotación; el contenido de las páginas no se toca, la calidad es idéntica y el texto sigue siendo seleccionable.",
        },
      ],
      deepDive: [
        {
          heading: "La rotación es metadatos, no píxeles",
          paragraphs: [
            "Cada página de un PDF lleva una bandera de rotación — un valor simple (en pasos de 90 grados) que dice a los visores que muestren la página girada. Rotar una página con esta herramienta cambia esa bandera, no el contenido de la página: el texto, las imágenes y los vectores se quedan exactamente donde estaban en el archivo. Por eso la rotación es instantánea y perfectamente sin pérdidas, incluso con archivos de cien megabytes.",
            "El mecanismo de la bandera explica una rareza familiar: una página puede contener contenido vertical pero mostrarse ladeada (o al revés) según su bandera de rotación. Algunos escáneres y algunos productores de PDF establecen la bandera en vez de rotar realmente el contenido. Rotar semejante página invierte la bandera; el contenido subyacente queda intacto de cualquier manera.",
            "Una consecuencia que vale conocer: como la rotación vive en una bandera, las herramientas que la ignoran — algunos analizadores básicos, algunos generadores de miniaturas — pueden mostrar la orientación \"cruda\". Y si más tarde rasterizas la página (por ejemplo, al comprimir), el renderizado ocurre en la orientación rotada y el trabajo de la bandera se vuelve permanente. Rotar antes de rasterizar es por tanto el orden correcto.",
          ],
        },
        {
          heading: "Escaneos, orientaciones mezcladas y arreglos prácticos",
          paragraphs: [
            "El trabajo de rotación más común es arreglar escaneos: un escáner dúplex voltea los reversos, una cámara de móvil produce un recibo ladeado, un lote sale con orientaciones alternadas. Arreglar esto página a página es exactamente lo que esta herramienta hace — selecciona las que están mal y gíralas. Rotar-todas es el movimiento equivocado ahí; arregla las buenas rompiéndolas.",
            "Para documentos que se imprimirán o encuadernarán, piensa qué borde será el de encuadernación tras rotar. Una página rotada 90 grados se lee natural en pantalla pero puede imprimirse con su \"arriba\" a lo largo del lado corto de la hoja, lo que cambia cómo caen los márgenes. Comprobar una página impresa antes de procesar todo el lote ahorra papel y frustración.",
            "Una nota sobre por qué algunas páginas parecen \"des-rotarse\": si un visor recuerda la bandera y otra herramienta re-guarda el archivo sin llevarse la bandera, la orientación se restablece. Mantener la cadena de edición dentro de herramientas que preservan la bandera (como esta) evita el restablecimiento; si una página vuelve a aparecer ladeada tras cada arreglo, algún paso de tu cadena está descartando la bandera.",
          ],
        },
        {
          heading: "Girar páginas en local, a coste cero",
          paragraphs: [
            "Rotar suele ser un arreglo aplicado a documentos que ya posees y en los que confías: tus propios escaneos, archivos que te enviaron colegas. La razón para aun así insistir en el procesamiento local es la consistencia del principio — un documento que nunca va a un tercero para ninguna operación es un documento cuya superficie de exposición controlas por completo. No hay operación tan trivial que justifique establecer el hábito de subir archivos confidenciales.",
            "Esta herramienta rota en tu navegador: el PDF se lee en local, las banderas de página se actualizan en memoria y la salida la guarda tu dispositivo. No ocurre ninguna subida, y como solo cambian banderas, la operación es efectivamente instantánea incluso con archivos muy grandes — no hay espera de re-codificación de ningún tipo.",
            "La naturaleza a nivel de bandera también significa que rotar aquí es reversible con seguridad: girar 90 grados cuatro veces te devuelve el original exacto, bit a bit. Puedes experimentar libremente — girar una página, verla, devolverla — sin ningún riesgo para el archivo, que es justo el tipo de operación de bajo riesgo donde las herramientas locales brillan.",
          ],
        },
      ],
    },
    pt: {
      name: "Rotacionar PDF",
      tagline:
        "Gire as páginas de um PDF em 90, 180 ou 270 graus e salve a mudança em definitivo — endireite digitalizações no navegador, sem upload.",
      intro: [
        "Digitalização de lado ou de cabeça para baixo? Rotacione todas as páginas de uma vez ou apenas as que precisam, com uma lista como “1, 3-5”. A rotação é gravada dentro do próprio PDF, então ele abre certo em qualquer leitor.",
        "Muitos visualizadores apenas giram a exibição temporariamente — esta ferramenta altera o atributo /Rotate com pdf-lib no seu dispositivo, e é por isso que a correção sobrevive à impressão, ao compartilhamento e a novos envios.",
      ],
      steps: [
        "Solte o PDF com as páginas a girar.",
        "Escolha 90°, 180° ou 270° e, se quiser, limite a rotação a páginas específicas.",
        "Clique em Rotacionar páginas e baixe o PDF corrigido.",
      ],
      faqs: [
        {
          q: "A rotação é permanente?",
          a: "Sim. O atributo de rotação é atualizado dentro do arquivo, então todos os leitores, impressoras e pré-visualizações mostram a orientação corrigida — não apenas esta aba do navegador.",
        },
        {
          q: "Como girar somente algumas páginas?",
          a: "Preencha o campo de páginas com uma lista como “2, 5-7”. Deixe vazio para girar o documento inteiro. Os intervalos usam a mesma sintaxe das outras ferramentas.",
        },
        {
          q: "Rotacionar recodifica ou comprime as páginas?",
          a: "Não. Apenas o sinalizador de rotação muda; o conteúdo da página permanece intacto, com qualidade idêntica e texto continuando selecionável.",
        },
      ],
      deepDive: [
        {
          heading: "A rotação é metadado, não pixels",
          paragraphs: [
            "Cada página num PDF carrega uma bandeira de rotação — um valor simples (em passos de 90 graus) que diz aos visualizadores para exibir a página girada. Rotacionar uma página com esta ferramenta muda essa bandeira, não o conteúdo da página: texto, imagens e vetores ficam exatamente onde estavam no arquivo. Por isso a rotação é instantânea e perfeitamente sem perdas, mesmo em arquivos de cem megabytes.",
            "O mecanismo da bandeira explica uma esquisitice familiar: uma página pode conter conteúdo em pé mas aparecer de lado (ou vice-versa) dependendo da bandeira de rotação. Alguns scanners e alguns produtores de PDF definem a bandeira em vez de realmente rotacionar o conteúdo. Rotacionar tal página inverte a bandeira; o conteúdo por baixo fica intacto de qualquer forma.",
            "Uma consequência que vale saber: como a rotação mora numa bandeira, ferramentas que a ignoram — alguns parsers básicos, alguns geradores de miniatura — podem mostrar a orientação \"crua\". E se mais tarde você rasterizar a página (por exemplo, ao comprimir), a renderização acontece na orientação rotacionada e o trabalho da bandeira vira permanente. Rotacionar antes de rasterizar é, portanto, a ordem correta.",
          ],
        },
        {
          heading: "Digitalizações, orientações misturadas e correções práticas",
          paragraphs: [
            "O trabalho de rotação mais comum é consertar digitalizações: um scanner duplex vira os versos, a câmera do celular produz um recibo de lado, um lote sai com orientações alternadas. Consertar isso página a página é exatamente o que esta ferramenta faz — selecione as que estão erradas e gire-as. Rotacionar-tudo é o movimento errado ali; conserta as certas quebrando-as.",
            "Para documentos que serão impressos ou encadernados, pense qual borda será a de encadernação depois da rotação. Uma página rotacionada 90 graços se lê natural na tela mas pode imprimir com o \"topo\" ao longo do lado curto da folha, o que muda como as margens caem. Conferir uma página impressa antes de rodar o lote todo economiza papel e frustração.",
            "Uma nota sobre por que algumas páginas parecem \"des-rotacionar\": se um visualizador lembra a bandeira e outra ferramenta re-salva o arquivo sem levar a bandeira, a orientação se reseta. Manter a corrente de edição dentro de ferramentas que preservam a bandeira (como esta) evita o reset; se uma página continua voltando de lado a cada conserto, algum passo da sua esteira está descartando a bandeira.",
          ],
        },
        {
          heading: "Girar páginas localmente, a custo zero",
          paragraphs: [
            "Rotacionar costuma ser um conserto aplicado a documentos que você já tem e confia: suas próprias digitalizações, arquivos que colegas mandaram. A razão de mesmo assim insistir no processamento local é a consistência do princípio — um documento que nunca vai a um terceiro para nenhuma operação é um documento cuja superfície de exposição você controla por completo. Não existe operação tão trivial que justifique estabelecer o hábito de enviar arquivos confidenciais.",
            "Esta ferramenta rotaciona no seu navegador: o PDF é lido localmente, as bandeiras de página são atualizadas na memória e a saída é salva pelo seu dispositivo. Não ocorre nenhum envio, e como só bandeiras mudam, a operação é efetivamente instantânea mesmo em arquivos muito grandes — não há espera de recodificação de nenhum tipo.",
            "A natureza em nível de bandeira também significa que rotacionar aqui é reversível com segurança: girar 90 graus quatro vezes devolve o original exato, bit a bit. Você pode experimentar livremente — girar uma página, ver, girar de volta — sem nenhum risco ao arquivo, que é justamente o tipo de operação de baixo risco onde ferramentas locais brilham.",
          ],
        },
      ],
    },
  },
});
