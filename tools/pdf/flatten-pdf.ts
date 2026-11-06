import { PdfProtectEngine } from "../_engines/pdf-engine-protect";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "flatten-pdf",
  category: "pdf",
  icon: "layers",
  engine: { component: PdfProtectEngine, props: { op: "flatten" } },
  related: ["sign-pdf", "merge-pdf", "split-pdf", "rotate-pdf", "pdf-to-jpg", "compress-pdf", "page-numbers-pdf", "unlock-pdf"],
  copy: {
    en: {
      name: "Flatten PDF",
      tagline:
        "Bake PDF form fields into the page as static content before submitting — checkboxes, text boxes and signatures become permanent ink, locally in your browser.",
      intro: [
        "Filled PDF forms are interactive: the values live in separate field objects that some viewers reset, drop or re-order when the file is forwarded. Flattening with pdf-lib draws each field directly onto its page, so what you filled is exactly what every reader will show — a requirement for many job portals, tax portals and filing systems.",
        "The processed document looks identical but contains no form fields anymore: nothing can be unfilled, changed or resubmitted. Everything runs on your device with pdf-lib; the file never leaves your browser. If the PDF has no fillable fields, the tool tells you so instead of producing a pointless copy.",
      
        "pdf-lib's form.flatten() reads every AcroField and draws its current value — text, checkbox, dropdown — directly onto the page content stream, then removes the interactive field objects. The file looks identical but is now static: no viewer can reset the values, reorder the fields or prompt 'this document has a form' on open.",
        "Compared with printing a filled form to PDF (which rasterizes it into a picture of itself), the flattened file keeps real text — searchable, selectable, and a fraction of the size. And unlike editing the form again in Acrobat, flattening is one-directional and permanent, which is exactly what submission portals and counter-signatories require.",
      ],
      steps: [
        "Drop the filled PDF form you are about to submit.",
        "Click Flatten form — fields are drawn onto the pages as static content.",
        "Download the flattened PDF and submit or share it safely.",
      ],
      faqs: [
        {
          q: "Will the pages look the same after flattening?",
          a: "Yes. Field values are rendered onto the page in place, so the visual result matches what you see in your viewer. The difference is underneath: the file no longer contains interactive field objects.",
        },
        {
          q: "Can the form be edited again afterwards?",
          a: "No, and that is the point. Flattening is irreversible in the output — the values are plain page content. Keep the original interactive file if you may need to revise it later.",
        },
        {
          q: "Does it work with digital signature fields?",
          a: "Visible signature appearance fields are flattened like any other field. Cryptographic signature validity is a separate matter: flattening does not re-validate or repair signatures, and a flattened copy should not be treated as a newly signed document.",
        },
      ],
      deepDive: [
        {
          heading: "What flattening actually fixes",
          paragraphs: [
            "A PDF can carry interactive layers on top of its printed content: form fields with values someone typed in, annotation objects (highlights, comments, stamps), and optional content groups (layers). None of these are ink. A form field is a widget that reads its value from the document's data structures at display time; an annotation is a separate object placed over the page. Viewers and printers are supposed to render them, but not everything does — a printer that ignores form fields produces a page with empty boxes where the answers should be.",
            "Flattening burns these layers into the page permanently. Each field's current value is drawn as ordinary page content, each annotation is rasterized or converted into page graphics, and the interactive machinery is removed from the output. The result looks identical in any viewer, prints identically on any printer, and can no longer be edited as a form.",
            "The classic failure this prevents: you fill a form, save it, email it — and the recipient opens it in a viewer that shows empty fields, or their \"reply with signature\" app strips the fields on export. Flattening before sending freezes your answers into the page itself, so what you saw is what they get.",
          ],
        },
        {
          heading: "When to flatten, when not to",
          paragraphs: [
            "Flatten when the document is finished and outbound: a completed application form, a signed contract being mailed, a reviewed draft whose comments must survive a careless printer. Flattening is also the standard move before combining: merging two files where one has form fields can produce conflicting field names, and flattened inputs merge as inert pages.",
            "Do not flatten working documents. Once flattened, field values are pixels and text on the page — you cannot re-open the form and change an entry; you would have to keep the original interactive copy. Likewise, annotations that a colleague still needs to resolve as comments lose their comment-ness and become part of the page.",
            "One subtlety: flattening bakes in the current state. If a field displays \"select...\" because nobody filled it, that placeholder is what gets burned in. Fill everything you intend to fill first, then flatten — the operation captures the document exactly as it looks at that moment.",
          ],
        },
        {
          heading: "Local flattening and document confidentiality",
          paragraphs: [
            "Flattened documents are, by nature, the most finished and most sensitive versions: the signed lease, the filled tax form, the final offer letter. These are precisely the files people upload to \"free PDF fixer\" sites, and those sites process your completed legal and financial paperwork on their servers as an ordinary business expense of running the site.",
            "Here the entire operation happens in your browser: the document is parsed and re-rendered locally, fields and annotations are composed into the page graphics in memory, and the flattened file is written straight to your downloads. Nothing is uploaded, queued or retained anywhere, and there is no scenario in which the filled-in values exist outside your device.",
            "A practical tip for the truly cautious: after flattening, open the result and try clicking where a field used to be. Nothing should be selectable or editable — that is your confirmation the interactive layer is gone. If you also want the text non-copyable, that is a different operation (rasterizing, like the compress tool does), not flattening; flattening removes interactivity, not the text layer.",
          ],
        },
      ],
    },
    zh: {
      name: "扁平化 PDF",
      tagline: "把 PDF 表单字段固化为页面静态内容再提交——复选框、文本框和签名变成永久内容,全在浏览器本地完成。",
      intro: [
        "已填写的 PDF 表单是交互式的:数据存放在独立的字段对象里,某些阅读器在转发文件时会重置、丢失或打乱这些值。扁平化通过 pdf-lib 把每个字段直接画到页面上,你填的内容就是所有阅读器显示的内容——很多招聘、报税和归档系统都有此要求。",
        "处理后的文档外观完全一致,但不再包含表单字段:任何值都无法再被清空、修改或重复提交。全部处理由 pdf-lib 在本地完成,文件不会离开浏览器。如果 PDF 没有可填字段,工具会如实提示,而不是生成一份无意义的副本。",
      ],
      steps: [
        "拖入即将提交的已填写 PDF 表单。",
        "点击“扁平化表单”——字段会被绘制为页面上的静态内容。",
        "下载扁平化后的 PDF,放心提交或分享。",
      ],
      faqs: [
        {
          q: "扁平化后页面外观会变吗?",
          a: "不会。字段值原位绘制到页面上,视觉效果与阅读器中看到的一致。区别在底层:文件不再包含可交互的字段对象。",
        },
        {
          q: "之后还能再编辑表单吗?",
          a: "不能,这正是目的。输出文件的扁平化不可逆——字段值已是普通页面内容。如果以后可能还要修改,请保留原始的可交互文件。",
        },
        {
          q: "支持数字签名字段吗?",
          a: "可见的签名外观字段会像其他字段一样被固化。加密签名的有效性是另一回事:扁平化不会重新验证或修复签名,扁平化副本不应被视为新签署的文件。",
        },
      ],
      deepDive: [
        {
          heading: "展平到底在修什么",
          paragraphs: [
            "PDF 可以在印刷内容之上携带交互层:有人填过值的表单字段、注释对象(高亮、批注、图章)以及可选内容组(图层)。这些都不是墨迹。表单字段是一个控件,显示时才从文档数据结构里读值;注释是叠在页面之上的独立对象。阅读器和打印机“理应”把它们渲染出来,但并非所有都照做——忽略表单字段的打印机,打出来的页面就是空框,答案不翼而飞。",
            "展平把这些层永久烧进页面。每个字段的当前值被绘制为普通页面内容,每个注释被栅格化或转为页面图形,交互机制从输出中被移除。结果在任何阅读器里看起来一致,在任何打印机上打出来一致,而且不能再当表单编辑。",
            "它防止的经典事故是:你填好表单、保存、发邮件——对方用某个阅读器打开却是空字段,或者对方的“回复签名”应用在导出时把字段剥掉了。发送前展平,你的答案就凝固在页面本身里,所见即所得。",
          ],
        },
        {
          heading: "什么时候该展平,什么时候不该",
          paragraphs: [
            "文档定稿且要外发时展平:填完的申请表、要寄出的已签合同、批注必须能挺过粗心打印机的评审稿。合并前展平也是标准动作:两个文件合并时若其一含表单字段,可能出现字段名冲突,展平后的输入合并起来就是惰性页面。",
            "还在改的文档不要展平。展平之后,字段值就成了像素和页面文字——没法重新打开表单改一个条目,只能留着原始的交互副本。同样,同事还需要以批注形式处理的注释,展平后就失去了“批注”属性,变成页面的一部分。",
            "一个细节:展平固化的是当前状态。如果某字段因为没人填而显示“请选择……”,被烧进去的就是这个占位符。先把该填的都填完,再展平——这一步会把文档“此刻看起来的样子”原样定格。",
          ],
        },
        {
          heading: "本地展平与文档机密性",
          paragraphs: [
            "被展平的文档,天然就是最定稿、最敏感的版本:已签的租约、填好的报税表、最终的录用信。这些恰恰是大家最爱传给“免费 PDF 修复站”的文件,而那些网站在自己的服务器上处理你填完的法律和财务文书,只是运营网站的日常成本。",
            "这里整个操作都发生在你的浏览器里:文档在本地解析、重新渲染,字段和注释在内存里合成进页面图形,展平后的文件直接写进你的下载目录。不上传、不排队、不留存,填入的值不存在出现在你设备之外的任何可能。",
            "给特别谨慎的人一个实用技巧:展平后打开结果,在原来字段的位置点一点。应该没有任何东西可选中、可编辑——这就是交互层已被移除的确认。如果你还想让文字不可复制,那是另一种操作(栅格化,压缩工具做的那种),不是展平;展平移除的是交互性,不是文字层。",
          ],
        },
      ],
    },
    ja: {
      name: "PDF フラット化",
      tagline: "PDF フォームのフィールドをページに静的コンテンツとして焼き込みます。チェックボックス・テキスト欄・署名が永久に固定され、処理はブラウザ内で完結します。",
      intro: [
        "記入済みの PDF フォームは対話型です。値は独立したフィールドオブジェクトに保存されており、ビューアによってはファイルの転送時にリセット・欠落・並べ替えが起こります。フラット化すると pdf-lib が各フィールドをページに直接描画するため、記入した内容がすべてのビューアでそのまま表示されます。求人ポータルや確定申告、ファイリングシステムで必須の処理です。",
        "処理後の見た目は変わりませんが、フォームフィールドはもう含まれません。値の消去・変更・再送信はできません。処理は pdf-lib で端末内のみ。ファイルがブラウザの外に出ることはありません。入力可能なフィールドがない PDF には、無意味なコピーを作らずその旨をお知らせします。",
      ],
      steps: [
        "提出予定の記入済み PDF フォームをドロップします。",
        "「フォームを平坦化」をクリックすると、フィールドがページに静的コンテンツとして描かれます。",
        "フラット化された PDF をダウンロードし、安心して提出・共有します。",
      ],
      faqs: [
        {
          q: "フラット化後も見た目は同じですか?",
          a: "はい。フィールドの値はその位置に描画されるため、ビューアで見た内容と同じに仕上がります。違いは内部にあり、対話的なフィールドオブジェクトはもう含まれません。",
        },
        {
          q: "後からフォームを編集できますか?",
          a: "できません。それがフラット化の目的です。出力後の変更は不可逆で、値はただのページコンテンツです。後で修正する可能性があれば、元の対話型ファイルを保管してください。",
        },
        {
          q: "電子署名フィールドにも使えますか?",
          a: "外観を持つ署名フィールドは他と同じくフラット化されます。暗号署名の有効性は別の問題で、フラット化は署名を再検証・修復しません。フラット化したコピーを新たに署名された文書として扱わないでください。",
        },
      ],
      deepDive: [
        {
          heading: "フラット化が実際に直すもの",
          paragraphs: [
            "PDF は印字内容の上に対話レイヤーを載せられます。誰かが入力した値を持つフォームフィールド、注釈オブジェクト(ハイライト、コメント、スタンプ)、オプションコンテンツグループ(レイヤー)です。これらはどれもインクではありません。フォームフィールドは表示時に文書のデータ構造から値を読むウィジェットであり、注釈はページの上に置かれた独立のオブジェクトです。ビューアやプリンタは描画すべきことになっていますが、全部がそうするとは限りません。フォームフィールドを無視するプリンタは、答えがあるべき場所に空欄の枠だけを印刷します。",
            "フラット化はこれらのレイヤーをページに恒久的に焼き込みます。各フィールドの現在値を通常のページ内容として描画し、各注釈をラスタライズまたはページグラフィックに変換し、対話の仕組みを出力から取り除きます。結果はどのビューアでも同じ見た目、どのプリンタでも同じ印刷になり、フォームとして編集することはもうできません。",
            "これが防ぐ定番の事故はこうです。フォームを記入して保存し、メールで送る——相手のビューアには空欄が表示される、あるいは「署名付き返信」アプリが書き出し時にフィールドを剥がす。送信前にフラット化すれば、あなたの回答はページそのものに凍結され、自分が見たものがそのまま相手に届きます。",
          ],
        },
        {
          heading: "フラット化すべき時、すべきでない時",
          paragraphs: [
            "文書が完成して外へ出るときにフラット化します。記入済みの申込書、郵送する署名済み契約書、コメントが雑なプリンタを生き延びるべきレビュー済み原稿。結合の前も定番の手順です。片方にフォームフィールドがあるファイル同士を結合するとフィールド名が衝突することがあり、フラット化済みの入力なら不活性なページとして結合されます。",
            "作業中の文書はフラット化しないでください。フラット化後のフィールド値はピクセルとページ上のテキストであり、フォームを開き直して項目を変えることはできません。対話可能な元コピーを別に取っておくしかありません。同様に、同僚がまだコメントとして処理すべき注釈は、コメント性を失いページの一部になります。",
            "細かい点として、フラット化は現在の状態を焼き込みます。誰も記入していないフィールドが「選択してください…」と表示されていれば、焼き込まれるのはそのプレースホルダです。記入すべきものを先にすべて記入してからフラット化してください。この操作は、その瞬間に見えている通りの文書をそのまま固めます。",
          ],
        },
        {
          heading: "ローカルでのフラット化と機密性",
          paragraphs: [
            "フラット化された文書は、本来、最も完成しており最も機密性の高い版です。署名済みの賃貸契約、記入済みの税務書類、最終のオファーレター。これらはまさに「無料 PDF 修復サイト」へアップロードされがちなファイルで、そうしたサイトはあなたの記入済みの法的・金融文書を自社サーバーで処理するのが、サイト運営の日常的なコストになっています。",
            "ここでは操作全体がブラウザ内で完結します。文書をローカルで解析・再描画し、フィールドと注釈をメモリ内でページグラフィックに合成し、フラット化済みファイルをそのままダウンロードへ書き出します。アップロードも待ち行列もどこにもなく、記入値が端末の外に存在する筋は一切ありません。",
            "特に慎重な方への実用的なヒントです。フラット化後に結果を開き、以前フィールドがあった場所をクリックしてみてください。選択も編集もできないはずです。それが対話レイヤー消失の確認です。テキストのコピーまで禁じたい場合は、それは別の操作(圧縮ツールが行うようなラスタライズ)であって、フラット化ではありません。フラット化が取り除くのは対話性であって、テキストレイヤーではないのです。",
          ],
        },
      ],
    },
    es: {
      name: "Aplanar PDF",
      tagline:
        "Graba los campos de formulario del PDF en la página como contenido estático antes de enviarlo: casillas, cuadros de texto y firmas se vuelven permanentes, en tu navegador.",
      intro: [
        "Los formularios PDF rellenados son interactivos: los valores viven en objetos de campo independientes que algunos visores restablecen, pierden o reordenan al reenviar el archivo. Aplanar con pdf-lib dibuja cada campo directamente en su página, así que lo que rellenaste es exactamente lo que mostrará cualquier lector — requisito en muchos portales de empleo, trámites fiscales y sistemas de archivado.",
        "El documento procesado se ve idéntico pero ya no contiene campos de formulario: nada se puede borrar, cambiar ni reenviar. Todo se ejecuta en tu dispositivo con pdf-lib; el archivo nunca sale del navegador. Si el PDF no tiene campos rellenables, la herramienta te lo dice en lugar de producir una copia inútil.",
      ],
      steps: [
        "Suelta el formulario PDF rellenado que vas a enviar.",
        "Pulsa Aplanar formulario: los campos se dibujan en las páginas como contenido estático.",
        "Descarga el PDF aplanado y envíalo o compártelo con seguridad.",
      ],
      faqs: [
        {
          q: "¿Las páginas se ven igual después de aplanar?",
          a: "Sí. Los valores se dibujan en su lugar, así que el resultado visual coincide con lo que ves en tu visor. La diferencia está por debajo: el archivo ya no contiene objetos de campo interactivos.",
        },
        {
          q: "¿Se puede editar el formulario después?",
          a: "No, y ese es el objetivo. El aplanado es irreversible en el resultado: los valores son contenido normal de la página. Conserva el original interactivo si quizá necesites revisarlo más adelante.",
        },
        {
          q: "¿Funciona con campos de firma digital?",
          a: "Los campos de apariencia de firma visibles se aplanan como cualquier otro. La validez criptográfica de una firma es otra cuestión: aplanar no revalida ni repara firmas, y una copia aplanada no debe tratarse como documento recién firmado.",
        },
      ],
      deepDive: [
        {
          heading: "Lo que el aplanado realmente arregla",
          paragraphs: [
            "Un PDF puede llevar capas interactivas encima de su contenido impreso: campos de formulario con valores que alguien escribió, objetos de anotación (resaltados, comentarios, sellos) y grupos de contenido opcional (capas). Ninguna de estas cosas es tinta. Un campo de formulario es un widget que lee su valor de las estructuras de datos del documento en el momento de mostrarlo; una anotación es un objeto aparte colocado sobre la página. Los visores e impresoras deberían representarlas, pero no todos lo hacen: una impresora que ignora los campos de formulario produce una página con casillas vacías donde deberían estar las respuestas.",
            "Aplanar quema esas capas en la página de forma permanente. El valor actual de cada campo se dibuja como contenido ordinario de la página, cada anotación se rasteriza o convierte en gráficos de página, y la maquinaria interactiva se elimina de la salida. El resultado se ve igual en cualquier visor, se imprime igual en cualquier impresora y ya no puede editarse como formulario.",
            "El fallo clásico que esto evita: rellenas un formulario, lo guardas, lo envías por correo — y el destinatario lo abre en un visor que muestra campos vacíos, o su aplicación de \"responder con firma\" elimina los campos al exportar. Aplanar antes de enviar congela tus respuestas en la propia página, así que lo que viste es lo que reciben.",
          ],
        },
        {
          heading: "Cuándo aplanar y cuándo no",
          paragraphs: [
            "Aplana cuando el documento está terminado y va saliendo: una solicitud completada, un contrato firmado que se va a enviar, un borrador revisado cuyos comentarios deben sobrevivir a una impresora descuidada. Aplanar también es el movimiento estándar antes de combinar: mezclar dos archivos donde uno tiene campos de formulario puede producir nombres de campo en conflicto, y las entradas aplanadas se combinan como páginas inertes.",
            "No aplanes documentos en marcha. Una vez aplanado, los valores de los campos son píxeles y texto en la página — no puedes reabrir el formulario y cambiar una entrada; tendrías que conservar la copia interactiva original. Igualmente, las anotaciones que un colega todavía debe resolver como comentarios pierden su condición de comentario y pasan a ser parte de la página.",
            "Un detalle: el aplanado horada el estado actual. Si un campo muestra \"seleccionar...\" porque nadie lo rellenó, ese texto de relleno es lo que se quema. Completa todo lo que vayas a completar primero y aplane después — la operación captura el documento exactamente como se ve en ese momento.",
          ],
        },
        {
          heading: "Aplanado local y confidencialidad del documento",
          paragraphs: [
            "Los documentos aplanados son, por naturaleza, las versiones más terminadas y más sensibles: el contrato de alquiler firmado, el formulario fiscal rellenado, la carta de oferta final. Son justo los archivos que la gente sube a sitios de \"arregla tu PDF gratis\", y esos sitios procesan tu papel legal y financiero completado en sus servidores como un gasto operativo corriente de mantener la web.",
            "Aquí toda la operación ocurre en tu navegador: el documento se analiza y re-dibuja en local, los campos y anotaciones se componen en los gráficos de la página en memoria, y el archivo aplanado se escribe directamente en tus descargas. No se sube nada, no se retiene nada en ningún sitio, y no existe un escenario en el que los valores rellenados existan fuera de tu dispositivo.",
            "Un consejo práctico para los muy precavidos: tras aplanar, abre el resultado e intenta hacer clic donde había un campo. No debería haber nada seleccionable ni editable — esa es tu confirmación de que la capa interactiva desapareció. Si además quieres que el texto no se pueda copiar, eso es otra operación (rasterizar, como hace la herramienta de comprimir), no aplanar; el aplanado quita la interactividad, no la capa de texto.",
          ],
        },
      ],
    },
    pt: {
      name: "Achatar PDF",
      tagline:
        "Grave os campos de formulário do PDF na página como conteúdo estático antes de enviar — caixas de seleção, campos de texto e assinaturas viram permanentes, no seu navegador.",
      intro: [
        "Formulários PDF preenchidos são interativos: os valores ficam em objetos de campo separados que alguns visualizadores redefinem, perdem ou reordenam ao repassar o arquivo. Achatar com pdf-lib desenha cada campo diretamente na página, então o que você preencheu é exatamente o que qualquer leitor mostrará — exigência de muitos portais de emprego, receitas e sistemas de arquivamento.",
        "O documento processado fica idêntico, mas não contém mais campos de formulário: nada pode ser apagado, alterado ou reenviado. Tudo roda no seu dispositivo com pdf-lib; o arquivo nunca sai do navegador. Se o PDF não tiver campos preenchíveis, a ferramenta avisa em vez de gerar uma cópia inútil.",
      ],
      steps: [
        "Solte o formulário PDF preenchido que você vai enviar.",
        "Clique em Achatar formulário — os campos são desenhados nas páginas como conteúdo estático.",
        "Baixe o PDF achatado e envie ou compartilhe com segurança.",
      ],
      faqs: [
        {
          q: "As páginas ficam com o mesmo visual depois de achatar?",
          a: "Sim. Os valores são desenhados no lugar, então o resultado visual coincide com o que você vê no visualizador. A diferença está por baixo: o arquivo não contém mais objetos de campo interativos.",
        },
        {
          q: "Dá para editar o formulário depois?",
          a: "Não, e esse é o objetivo. O achatamento é irreversível na saída — os valores viram conteúdo comum da página. Guarde o arquivo interativo original se talvez precise revisá-lo depois.",
        },
        {
          q: "Funciona com campos de assinatura digital?",
          a: "Campos de aparência de assinatura visíveis são achatados como qualquer outro. A validade criptográfica da assinatura é outra questão: achatar não revalida nem repara assinaturas, e uma cópia achatada não deve ser tratada como documento recém-assinado.",
        },
      ],
      deepDive: [
        {
          heading: "O que o achatamento realmente conserta",
          paragraphs: [
            "Um PDF pode carregar camadas interativas por cima do conteúdo impresso: campos de formulário com valores que alguém digitou, objetos de anotação (marcações, comentários, carimbos) e grupos de conteúdo opcional (camadas). Nada disso é tinta. Um campo de formulário é um widget que lê seu valor das estruturas de dados do documento na hora de exibir; uma anotação é um objeto à parte colocado sobre a página. Visualizadores e impressoras deveriam renderizá-los, mas nem todos fazem — uma impressora que ignora campos de formulário produz uma página com caixas vazias onde deveriam estar as respostas.",
            "Achatamento queima essas camadas na página de forma permanente. O valor atual de cada campo é desenhado como conteúdo comum da página, cada anotação é rasterizada ou convertida em gráficos de página, e a maquinaria interativa é removida da saída. O resultado fica idêntico em qualquer visualizador, imprime idêntico em qualquer impressora e não pode mais ser editado como formulário.",
            "A falha clássica que isso evita: você preenche um formulário, salva, envia por e-mail — e o destinatário abre num visualizador que mostra campos vazios, ou o aplicativo de \"responder com assinatura\" dele descarta os campos ao exportar. Achatar antes de enviar congela suas respostas na própria página, então o que você viu é o que eles recebem.",
          ],
        },
        {
          heading: "Quando achatar e quando não",
          paragraphs: [
            "Achate quando o documento está pronto e vai sair: um formulário de inscrição completo, um contrato assinado que será enviado, um rascunho revisado cujos comentários precisam sobreviver a uma impressora descuidada. Achatar também é o passo padrão antes de mesclar: combinar dois arquivos em que um tem campos de formulário pode gerar nomes de campo em conflito, e entradas achatadas se mesclam como páginas inertes.",
            "Não achate documentos em andamento. Depois de achatado, os valores dos campos viram pixels e texto na página — você não reabre o formulário e muda um campo; teria de guardar a cópia interativa original. Da mesma forma, anotações que um colega ainda precisa resolver como comentários perdem a condição de comentário e viram parte da página.",
            "Um detalhe: o achatamento fixa o estado atual. Se um campo mostra \"selecione...\" porque ninguém preencheu, esse texto de preenchimento é o que será queimado. Complete tudo que pretende completar primeiro e achate depois — a operação captura o documento exatamente como ele está naquele momento.",
          ],
        },
        {
          heading: "Achatamento local e confidencialidade",
          paragraphs: [
            "Documentos achatados são, por natureza, as versões mais finalizadas e mais sensíveis: o contrato de aluguel assinado, o formulário fiscal preenchido, a carta de oferta final. São exatamente os arquivos que as pessoas sobem para sites de \"conserte seu PDF grátis\", e esses sites processam seu papel jurídico e financeiro completo nos servidores deles como despesa corriqueira de manter o site.",
            "Aqui toda a operação acontece no seu navegador: o documento é analisado e redesenhado localmente, campos e anotações são compostos nos gráficos da página em memória, e o arquivo achatado é escrito direto nos seus downloads. Nada é enviado, nada fica em fila, nada é retido em lugar algum, e não existe cenário em que os valores preenchidos existam fora do seu dispositivo.",
            "Uma dica prática para os muito cautelosos: depois de achatar, abra o resultado e tente clicar onde havia um campo. Nada deve ser selecionável ou editável — essa é a confirmação de que a camada interativa sumiu. Se você também quer que o texto não seja copiável, isso é outra operação (rasterizar, como faz a ferramenta de compressão), não achatamento; achatar remove a interatividade, não a camada de texto.",
          ],
        },
      ],
    },
  },
});
