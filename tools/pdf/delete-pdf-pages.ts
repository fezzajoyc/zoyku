import { PdfPagesEngine } from "../_engines/pdf-engine-pages";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "delete-pdf-pages",
  category: "pdf",
  icon: "file",
  engine: { component: PdfPagesEngine, props: { op: "delete" } },
  related: ["split-pdf", "rearrange-pdf-pages", "rotate-pdf", "merge-pdf", "compress-pdf", "pdf-to-ppt", "ocr-pdf", "pdf-to-text", "jpg-to-pdf", "page-numbers-pdf"],
  copy: {
    en: {
      name: "Delete PDF Pages",
      tagline:
        "Remove unwanted pages from a PDF in seconds — type the pages to drop, download the trimmed file, all processed inside your browser.",
      intro: [
        "Blank pages, an old cover, a page with someone else's data — enter them as “1, 3-5” and get a clean PDF with everything else intact. The tool shows your document's page count so you can check the numbers before cutting.",
        "The remaining pages are copied byte-for-byte, so text stays selectable and images keep their quality. Everything happens locally with pdf-lib; the file is never uploaded.",
      
        "Page deletion uses pdf-lib's copyPages to write a new document containing only the pages you keep — the ones you cut are never copied into the output file, so their content is gone rather than hidden. Ranges like '1, 3-5' are parsed after the tool shows the document's real page count, so a mistaken range is caught before you write.",
        "Compared with printing to PDF and skipping pages (which rasterizes everything and destroys text), the kept pages are cloned object-for-object: fonts, vectors and selectable text all survive. And unlike desktop editors, there is no save-as dialog maze — one field, one click, one clean file, with no upload of the source document.",
      ],
      steps: [
        "Drop the PDF you want to trim.",
        "Type the pages to delete, for example “2, 6-8”.",
        "Click Delete pages and download the remaining document.",
      ],
      faqs: [
        {
          q: "Can I delete all pages of a document?",
          a: "No — a PDF needs at least one page. If you enter every page the tool will refuse; delete all but one instead if that is what you need.",
        },
        {
          q: "How do I keep only a few pages?",
          a: "Easier to think in reverse: delete everything you do not need. “2-10, 12” on a 12-page document leaves pages 1 and 11.",
        },
        {
          q: "What happens to the page numbering?",
          a: "Pages close up automatically: after deleting pages 2-4, the former page 5 becomes page 2. Internal links that pointed at deleted pages may stop working.",
        },
      ],
      deepDive: [
        {
          heading: "Removing pages touches the page tree, not the content",
          paragraphs: [
            "Inside a PDF there is a page tree: an ordered list of references, each pointing to one page object that in turn points to its content streams, fonts and images. Deleting a page is an operation on this tree — the reference is removed from the list — while the page's content streams, fonts and images simply become unreferenced and are dropped. Nothing about the surviving pages is redrawn, re-encoded or altered in any way.",
            "This has a practical consequence worth knowing: deleting pages is a perfectly lossless operation for the pages you keep. Fonts stay embedded exactly as they were, image resolution is untouched, text remains selectable, and even the surviving pages' internal object numbers usually stay the same. Unlike compression, there is no quality dial because nothing is re-processed.",
            "The reverse is also true: whatever lived on the deleted pages disappears entirely. If a page contained an annotation or a hidden layer you wanted, make sure it is on a page you keep — the tool works at page granularity and cannot lift content from one page onto another. For that, use an extraction or merge workflow instead.",
          ],
        },
        {
          heading: "Common traps when deleting pages",
          paragraphs: [
            "The most common mistake is miscounting because of a mismatch between what a viewer shows and the internal page order. Page labels — the \"1, 2, iii, A-4\" printed in the corner of a PDF — are a display layer on top of the real sequence; a document whose labels restart per chapter still has a single linear page order underneath. This tool always works on the real sequence, shown as 1..N, so verify positions by content, not by the printed label.",
            "A second trap is deleting pages that other pages depend on. A table of contents or an index that says \"see page 12\" contains a plain-text reference (or in better documents, a link annotation pointing to a page object). If you delete page 12, the plain-text reference silently rots and the link may break or jump to the wrong place. The tool will not warn about this — no tool can reliably — so scan your document for cross-references before a big deletion.",
            "Third, remember that some viewers cache the old file. If the deleted version looks unchanged, close and reopen the PDF, or check the file size — the new file should be smaller. And if the document is a form whose later pages contain field definitions referenced earlier, test the form after editing.",
          ],
        },
        {
          heading: "Why the file never leaves your device",
          paragraphs: [
            "Deleting pages is often done for privacy reasons in the first place: removing a page with personal data, a salary appendix, or a draft that was not meant to circulate. Sending that same file to a web service to perform the deletion defeats the purpose — the very page you wanted gone now sits in someone else's processing queue and logs. This tool does the edit locally, in your browser, so the file never crosses the network at any point.",
            "The mechanics are entirely client-side: the PDF is parsed in JavaScript, the page references you selected are removed from the tree, and a fresh file is written to your downloads. No account, no upload progress bar, no retention policy to take on faith. If you are offline, it works exactly the same.",
            "A useful habit after deleting: run the result through a text search for the terms that were on the removed pages. It is a ten-second check that the sensitive content is truly gone from the output file — and it doubles as a reminder that deletion here removes whole pages, not selected words within a page.",
          ],
        },
      ],
    },
    zh: {
      name: "删除 PDF 页面",
      tagline: "几秒钟删除 PDF 中不需要的页面——输入要删的页码,下载裁剪后的文件,全程在浏览器本地处理。",
      intro: [
        "空白页、旧封面、带他人信息的页面——按“1, 3-5”的格式输入,一键得到干净的 PDF,其余页面原样保留。工具会显示文档总页数,删之前可以核对。",
        "保留的页面按原始字节复制,文字仍可选中、图片不失真。全部处理通过 pdf-lib 在本地完成,文件不会被上传。",
      ],
      steps: [
        "拖入要裁剪的 PDF。",
        "输入要删除的页码,例如“2, 6-8”。",
        "点击“删除页面”,下载剩余内容。",
      ],
      faqs: [
        {
          q: "可以把文档的页面全部删光吗?",
          a: "不可以——PDF 至少要有一页。如果输入了所有页码,工具会拒绝执行;如确有需要,可以保留一页删掉其余。",
        },
        {
          q: "只想保留少数几页怎么办?",
          a: "反过来想更容易:把不要的都删掉。比如 12 页的文档删除“2-10, 12”,就只剩第 1 页和第 11 页。",
        },
        {
          q: "删除后页码怎么算?",
          a: "页面会自动前移:删除第 2–4 页后,原来的第 5 页变成第 2 页。指向被删页面的内部链接可能失效。",
        },
      ],
      deepDive: [
        {
          heading: "删页动的是页面树,不是页面内容",
          paragraphs: [
            "PDF 内部是一棵页面树:一个有序的引用列表,每一项指向一个页面对象,页面对象再指向自己的内容流、字体和图片。删除页面的本质是操作这棵树——把某项引用从列表里移除——该页的内容流、字体和图片随之失去引用而被丢弃。保留下来的页面不会被重绘、重编码或做任何改动。",
            "这带来一个值得知道的实际结论:对留下的页面而言,删页是完全无损的操作。字体按原样嵌入,图片分辨率原封不动,文字仍可选中,连保留页面的内部对象编号通常都不变。和压缩不同,这里没有质量旋钮——因为根本没有重新处理。",
            "反过来也成立:被删页面上的东西会彻底消失。如果某页上有你想要的批注或隐藏图层,务必确认它在你保留的页上——工具以整页为粒度,无法把内容从一页搬到另一页。要挪内容,应该走提取或合并的工作流。",
          ],
        },
        {
          heading: "删页时的几个常见坑",
          paragraphs: [
            "最常见的错误是页码数错:阅读器显示的页码和内部页序对不上。页码标签——印在页面角落的“1、2、iii、A-4”——是叠在真实顺序之上的显示层;按章重新编号的文档,底层仍是单一的线性页序。本工具始终按真实顺序(1..N)操作,所以请以页面内容确认位置,别信印出来的标签。",
            "第二个坑是删掉被别的页面依赖的页。目录或索引里的“见第 12 页”是一段纯文本(较好的文档里才是指向页面对象的链接注释)。删掉第 12 页后,纯文本引用静默失效,链接可能断掉或跳错位置。任何工具都无法可靠地提醒这一点,所以大动作删页前,先通读文档排查交叉引用。",
            "第三,有些阅读器会缓存旧文件。如果删页后的版本看起来没变,关掉重开,或核对文件大小——新文件应该更小。另外,如果文档是表单,且后面的页面里有被前面引用的字段定义,编辑完记得测试一遍表单。",
          ],
        },
        {
          heading: "为什么文件始终不出你的设备",
          paragraphs: [
            "删页往往本来就是出于隐私动机:删掉带个人信息的页、工资附表、或本不该外传的草稿。把同一个文件上传到网页服务去做删除,目的就落空了——你想删掉的那一页,此刻正躺在别人的处理队列和日志里。本工具在浏览器里本地完成编辑,文件自始至终不经过网络。",
            "机制完全是客户端的:PDF 在 JavaScript 里解析,你选中的页面引用从树中移除,新文件写入你的下载目录。没有账号,没有上传进度条,没有需要凭空信任的留存政策。离线状态下一切照常工作。",
            "删页之后有个好习惯:在结果文件里搜索被删页面上出现过的关键词。十秒钟就能确认敏感内容确实不在输出文件里——这也顺便提醒你:这里的删除是整页粒度,不是页内选词删除。",
          ],
        },
      ],
    },
    ja: {
      name: "PDF ページ削除",
      tagline: "PDF から不要なページを数秒で削除。削除するページを入力して切り詰めたファイルをダウンロード。処理はブラウザ内で完結します。",
      intro: [
        "白紙ページ、古い表紙、他人の情報が載ったページ——「1, 3-5」のように入力すれば、それ以外をそのまま残したきれいな PDF が手に入ります。ツールが総ページ数を表示するので、削除前に確認できます。",
        "残ったページはバイト単位でコピーされるため、テキストは選択可能、画像も劣化しません。処理は pdf-lib によりローカルで行われ、ファイルはアップロードされません。",
      ],
      steps: [
        "削減したい PDF をドロップします。",
        "削除するページを入力します(例:「2, 6-8」)。",
        "「ページを削除」をクリックし、残りの文書をダウンロードします。",
      ],
      faqs: [
        {
          q: "すべてのページを削除できますか?",
          a: "できません。PDF には最低 1 ページ必要です。全ページを指定するとツールは実行を拒否します。必要なら 1 ページだけ残してください。",
        },
        {
          q: "数ページだけ残したい場合は?",
          a: "逆に考えると簡単です。不要なページを削除対象にします。12 ページの文書で「2-10, 12」を指定すると、1 ページ目と 11 ページ目が残ります。",
        },
        {
          q: "削除後のページ番号はどうなりますか?",
          a: "ページは自動的に詰まります。2〜4 ページ目を削除すると、元の 5 ページ目が 2 ページ目になります。削除したページへの内部リンクは機能しないことがあります。",
        },
      ],
      deepDive: [
        {
          heading: "ページ削除が触るのはページツリーで、内容ではない",
          paragraphs: [
            "PDF の内部にはページツリーがあります。順序付きの参照リストで、各項目が 1 つのページオブジェクトを指し、そのページオブジェクトがさらに自分のコンテンツストリーム・フォント・画像を指します。ページ削除の実体はこのツリーへの操作です。参照をリストから取り除くと、そのページのコンテンツストリームやフォントや画像は参照を失い、捨てられます。残ったページは再描画も再エンコードも何もされません。",
            "これには知っておく価値のある帰結があります。残すページにとって、ページ削除は完全に可逆(無劣化)な操作です。フォントはそのまま埋め込まれ、画像の解像度は無傷で、テキストは選択可能のまま、内部オブジェクト番号まで通常は変わりません。圧縮と違って品質のダイヤルがないのは、何も再処理していないからです。",
            "逆もまた真です。削除したページにあったものは完全に消えます。注釈や隠しレイヤーなど欲しいものがそのページにあった場合、残す側のページに載っているか必ず確認してください。このツールはページ単位で動くため、内容を別のページへ移すことはできません。移すなら抽出や結合のワークフローを使います。",
          ],
        },
        {
          heading: "ページ削除でよくある落とし穴",
          paragraphs: [
            "最も多いミスは、ビューアの表示と内部のページ順の不一致による数え間違いです。ページラベル——ページの隅に印字される「1、2、iii、A-4」——は実際の順序の上に重ねられた表示層にすぎません。章ごとに番号が振り直される文書でも、下では単一の線形なページ順が続いています。このツールは常に実際の順序(1..N)で動くので、位置は印字ラベルではなく内容で確認してください。",
            "二つ目は、他のページが依存しているページを削除すること。目次や索引の「12 ページ参照」はただのテキストです(きちんとした文書ではページオブジェクトへのリンク注釈)。12 ページを消すとテキストの参照は黙って腐り、リンクは切れたり別の場所に飛んだりします。これを確実に警告できるツールはないので、大きく削る前に文書内の相互参照を一通り確認してください。",
            "三つ目は、ビューアが古いファイルをキャッシュしている場合です。削除後の版に変化が見えなければ、PDF を開き直すかファイルサイズを確認してください。新しいほうが小さいはずです。またフォームで、後続ページに前から参照されるフィールド定義がある場合は、編集後にフォームの動作をテストしてください。",
          ],
        },
        {
          heading: "ファイルが端末から出ない理由",
          paragraphs: [
            "ページ削除はそもそもプライバシー目的で行われることが多いものです。個人情報のあるページ、給与の付録、流通させるはずだった草案の削除。そのファイルを同じ目的のために Web サービスへ送るのは目的に反します。消したかったそのページが、今まさに他人の処理キューとログに載っているからです。このツールはブラウザ内でローカルに編集するので、ファイルはどの時点でもネットワークを横切りません。",
            "仕組みは完全にクライアントサイドです。PDF を JavaScript で解析し、選択したページ参照をツリーから取り除き、新しいファイルをダウンロードへ書き出します。アカウントも、アップロードのプログレスバーも、鵜呑みにするしかない保持ポリシーもありません。オフラインでもまったく同じように動きます。",
            "削除後の習慣として有効なのは、削除したページにあった語を結果ファイル内で検索することです。10 秒の確認で、機密内容が出力に残っていないことを確かめられます。同時に、ここでの削除はページ内の語ではなくページ単位であるという再確認にもなります。",
          ],
        },
      ],
    },
    es: {
      name: "Eliminar páginas PDF",
      tagline:
        "Quita las páginas que no quieras de un PDF en segundos: escribe cuáles eliminar, descarga el archivo recortado, todo en tu navegador.",
      intro: [
        "Páginas en blanco, una portada antigua, una hoja con datos ajenos: escríbelas como “1, 3-5” y obtén un PDF limpio con el resto intacto. La herramienta muestra el número de páginas para que lo compruebes antes de cortar.",
        "Las páginas restantes se copian byte a byte: el texto sigue siendo seleccionable y las imágenes no pierden calidad. Todo ocurre en local con pdf-lib; el archivo nunca se sube.",
      ],
      steps: [
        "Suelta el PDF que quieres recortar.",
        "Escribe las páginas a eliminar, por ejemplo “2, 6-8”.",
        "Pulsa Eliminar páginas y descarga el documento restante.",
      ],
      faqs: [
        {
          q: "¿Puedo eliminar todas las páginas?",
          a: "No: un PDF necesita al menos una página. Si indicas todas, la herramienta lo rechazará; si es lo que buscas, deja una y elimina el resto.",
        },
        {
          q: "¿Cómo conservo solo unas pocas páginas?",
          a: "Piénsalo al revés: elimina todo lo que no necesites. “2-10, 12” en un documento de 12 páginas deja las páginas 1 y 11.",
        },
        {
          q: "¿Qué pasa con la numeración?",
          a: "Las páginas se reordenan automáticamente: tras eliminar las páginas 2-4, la antigua página 5 pasa a ser la 2. Los enlaces internos a páginas eliminadas pueden dejar de funcionar.",
        },
      ],
      deepDive: [
        {
          heading: "Borrar páginas toca el árbol de páginas, no el contenido",
          paragraphs: [
            "Dentro de un PDF hay un árbol de páginas: una lista ordenada de referencias, cada una apuntando a un objeto de página que a su vez apunta a sus flujos de contenido, fuentes e imágenes. Borrar una página es una operación sobre ese árbol: la referencia se quita de la lista, y los flujos, fuentes e imágenes de esa página quedan sin referencia y se descartan. Las páginas que sobreviven no se redibujan, ni re-codifican, ni se alteran de ninguna manera.",
            "Esto tiene una consecuencia práctica que conviene conocer: borrar páginas es una operación perfectamente sin pérdidas para las páginas que conservas. Las fuentes siguen incrustadas tal cual, la resolución de las imágenes no se toca, el texto sigue seleccionable y hasta los números internos de objeto de las páginas supervivientes suelen quedarse igual. A diferencia de la compresión, aquí no hay dial de calidad porque nada se re-procesa.",
            "Lo inverso también vale: todo lo que vivía en las páginas borradas desaparece por completo. Si una página contenía una anotación o una capa oculta que querías, asegúrate de que esté en una página que conservas — la herramienta trabaja a nivel de página y no puede mover contenido de una página a otra. Para eso, mejor un flujo de extracción o de fusión.",
          ],
        },
        {
          heading: "Errores típicos al borrar páginas",
          paragraphs: [
            "El error más común es contar mal por un desajuste entre lo que muestra el visor y el orden interno de páginas. Las etiquetas de página — el \"1, 2, iii, A-4\" impreso en la esquina — son una capa de visualización sobre la secuencia real; un documento cuyas etiquetas se reinician por capítulo sigue teniendo debajo un único orden lineal. Esta herramienta siempre trabaja sobre la secuencia real (1..N), así que verifica posiciones por el contenido, no por la etiqueta impresa.",
            "El segundo error es borrar páginas de las que otras dependen. Un índice que dice \"ver página 12\" contiene una referencia de texto plano (o, en documentos mejores, una anotación de enlace que apunta al objeto de página). Si borras la página 12, la referencia de texto se pudre en silencio y el enlace puede romperse o saltar a otro sitio. Ninguna herramienta puede avisar de esto de forma fiable, así que revisa las referencias cruzadas antes de un borrado grande.",
            "Tercero, recuerda que algunos visores guardan el archivo antiguo en caché. Si la versión borrada parece igual, cierra y reabre el PDF, o mira el tamaño del archivo — el nuevo debería pesar menos. Y si el documento es un formulario cuyas páginas posteriores contienen definiciones de campos referenciadas antes, prueba el formulario tras editar.",
          ],
        },
        {
          heading: "Por qué el archivo nunca sale de tu dispositivo",
          paragraphs: [
            "Borrar páginas suele hacerse por privacidad en primer lugar: quitar una página con datos personales, un anexo salarial o un borrador que no debía circular. Enviar ese mismo archivo a un servicio web para que haga el borrado frustra el propósito — la página que querías eliminar está ahora mismo en la cola y los registros de otra persona. Esta herramienta hace la edición en local, en tu navegador, así que el archivo no cruza la red en ningún momento.",
            "La mecánica es enteramente del lado del cliente: el PDF se analiza en JavaScript, las referencias seleccionadas se quitan del árbol y un archivo nuevo se escribe en tus descargas. Sin cuenta, sin barra de subida, sin política de retención que haya que creer a ciegas. Si estás sin conexión, funciona exactamente igual.",
            "Un hábito útil tras borrar: busca en el resultado los términos que estaban en las páginas eliminadas. Son diez segundos que confirman que el contenido sensible ya no está en el archivo de salida — y de paso recuerdan que aquí se borran páginas enteras, no palabras sueltas dentro de una página.",
          ],
        },
      ],
    },
    pt: {
      name: "Excluir páginas de PDF",
      tagline:
        "Remova as páginas indesejadas de um PDF em segundos — digite quais excluir, baixe o arquivo aparado, tudo processado no navegador.",
      intro: [
        "Páginas em branco, uma capa antiga, uma folha com dados de outra pessoa — digite como “1, 3-5” e receba um PDF limpo com o resto intacto. A ferramenta mostra o total de páginas para você conferir antes de cortar.",
        "As páginas restantes são copiadas byte a byte, então o texto continua selecionável e as imagens mantêm a qualidade. Tudo acontece localmente com pdf-lib; o arquivo nunca é enviado.",
      ],
      steps: [
        "Solte o PDF que quer aparar.",
        "Digite as páginas a excluir, por exemplo “2, 6-8”.",
        "Clique em Excluir páginas e baixe o documento restante.",
      ],
      faqs: [
        {
          q: "Posso excluir todas as páginas de um documento?",
          a: "Não — um PDF precisa de pelo menos uma página. Se você indicar todas, a ferramenta recusará; se for isso que precisa, deixe uma e exclua o resto.",
        },
        {
          q: "Como manter apenas algumas páginas?",
          a: "Pense ao contrário: exclua tudo o que não precisa. “2-10, 12” em um documento de 12 páginas deixa as páginas 1 e 11.",
        },
        {
          q: "Como fica a numeração depois?",
          a: "As páginas se fecham automaticamente: após excluir as páginas 2-4, a antiga página 5 vira a página 2. Links internos apontando para páginas excluídas podem parar de funcionar.",
        },
      ],
      deepDive: [
        {
          heading: "Excluir páginas mexe na árvore de páginas, não no conteúdo",
          paragraphs: [
            "Dentro de um PDF existe uma árvore de páginas: uma lista ordenada de referências, cada uma apontando para um objeto de página que por sua vez aponta para seus fluxos de conteúdo, fontes e imagens. Excluir uma página é uma operação nessa árvore — a referência sai da lista — e os fluxos, fontes e imagens daquela página ficam sem referência e são descartados. As páginas que sobrevivem não são redesenhadas, recodificadas nem alteradas de forma alguma.",
            "Isso traz uma consequência prática que vale saber: excluir páginas é uma operação perfeitamente sem perdas para as páginas que você mantém. As fontes continuam embutidas como estavam, a resolução das imagens fica intacta, o texto continua selecionável e até os números internos de objeto das páginas restantes costumam permanecer iguais. Diferente da compressão, aqui não existe dial de qualidade porque nada é reprocessado.",
            "O inverso também vale: tudo que morava nas páginas excluídas desaparece por completo. Se uma página tinha uma anotação ou camada oculta que você queria, garanta que esteja numa página que mantém — a ferramenta trabalha no nível da página e não consegue mover conteúdo de uma para outra. Para isso, prefira um fluxo de extração ou de mesclagem.",
          ],
        },
        {
          heading: "Armadilhas comuns ao excluir páginas",
          paragraphs: [
            "O erro mais comum é contar errado por um descompasso entre o que o visualizador mostra e a ordem interna das páginas. Os rótulos de página — o \"1, 2, iii, A-4\" impresso no canto — são uma camada de exibição sobre a sequência real; um documento cujos rótulos recomeçam por capítulo continua tendo embaixo uma única ordem linear. Esta ferramenta sempre trabalha na sequência real (1..N), então confirme posições pelo conteúdo, não pelo rótulo impresso.",
            "A segunda armadilha é excluir páginas de que outras dependem. Um sumário que diz \"ver página 12\" contém uma referência de texto simples (ou, em documentos melhores, uma anotação de link apontando para o objeto da página). Se você excluir a página 12, a referência de texto apodrece em silêncio e o link pode quebrar ou saltar para o lugar errado. Nenhuma ferramenta consegue avisar disso com confiabilidade, então revise as referências cruzadas antes de uma exclusão grande.",
            "Terceiro, lembre que alguns visualizadores mantêm o arquivo antigo em cache. Se a versão excluída parece igual, feche e reabra o PDF, ou confira o tamanho do arquivo — o novo deve ser menor. E se o documento é um formulário cujas páginas posteriores têm definições de campos referenciadas antes, teste o formulário depois de editar.",
          ],
        },
        {
          heading: "Por que o arquivo nunca sai do seu dispositivo",
          paragraphs: [
            "Excluir páginas muitas vezes já é feito por privacidade: tirar uma página com dados pessoais, um anexo salarial ou um rascunho que não devia circular. Enviar esse mesmo arquivo a um serviço na web para fazer a exclusão derrota o propósito — a página que você queria eliminar está agora mesmo na fila e nos registros de outra pessoa. Esta ferramenta faz a edição localmente, no navegador, então o arquivo não cruza a rede em nenhum momento.",
            "A mecânica é totalmente no lado do cliente: o PDF é analisado em JavaScript, as referências selecionadas saem da árvore e um arquivo novo é escrito nos seus downloads. Sem conta, sem barra de envio, sem política de retenção para acreditar por fé. Se você estiver offline, funciona exatamente igual.",
            "Um hábito útil depois de excluir: procure no resultado os termos que estavam nas páginas removidas. São dez segundos que confirmam que o conteúdo sensível realmente não está no arquivo final — e lembram que a exclusão aqui é de páginas inteiras, não de palavras escolhidas dentro de uma página.",
          ],
        },
      ],
    },
  },
});
