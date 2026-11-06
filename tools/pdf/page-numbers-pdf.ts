import { PdfPageNumEngine } from "../_engines/pdf-engine-pagenum";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "page-numbers-pdf",
  category: "pdf",
  icon: "file",
  engine: { component: PdfPageNumEngine },
  related: ["merge-pdf", "split-pdf", "watermark-pdf", "compress-pdf", "rotate-pdf", "delete-pdf-pages", "pdf-to-ppt", "ocr-pdf", "pdf-to-text", "rearrange-pdf-pages"],
  copy: {
    en: {
      name: "Add Page Numbers to PDF",
      tagline: "Stamp page numbers on a PDF — choose format, corner and starting number, all locally in your browser.",
      intro: [
        "Give a PDF proper page numbers before printing or sharing: pick a format (1, 1/N or Page 1 of N), pick one of six corners, set the starting number — the file is rebuilt on your device and ready to download.",
        "Useful for reports, contracts, scanned bundles and anything that gets referenced by page in a meeting.",
      
        "Numbers are stamped with pdf-lib: the text is drawn onto each page in the chosen corner at a fixed inset, using the PDF's built-in fonts so the file stays small and crisp at any zoom. The starting number can be shifted, which matters when the PDF is a continuation — a chapter that opens on page 47 can start numbering there.",
        "Compared with re-generating the source document or editing in Acrobat, this is a thirty-second operation with no layout risk — the numbers are added to the existing pages rather than rebuilding them. And unlike adding numbers by printing and rescanning, the text stays vector-sharp and the file size barely changes.",
      ],
      steps: [
        "Drop in the PDF you want to number.",
        "Pick the format, the corner and the starting number.",
        "Click Add page numbers and download the stamped file.",
      ],
      faqs: [
        {
          q: "Can I skip the cover page?",
          a: "Set 'Start numbering at' to 0 and the cover gets number 0 — or split the cover off first, number the rest, then merge them back.",
        },
        {
          q: "Will the numbers look consistent across page sizes?",
          a: "Each page is stamped relative to its own width and height, so mixed orientations and page sizes all get their number in the same visual corner.",
        },
      ],
      deepDive: [
        {
          heading: "How page numbering overlays work in a PDF",
          paragraphs: [
            "Adding page numbers to an existing PDF does not re-process the pages. The original content — text, images, everything — is untouched; the tool appends a small extra drawing instruction to each page's content stream that paints the number at your chosen position. Technically this is an overlay: new ink drawn on top of the existing page, like a stamp added after the fact.",
            "This is why numbering is safe and reversible-by-source: the original file stays on your disk unmodified, and the numbered output differs from it only by those few extra drawing commands. Fonts used for the numbers are added to the document or drawn with standard fonts, and at typical sizes (9–12 pt) the numbers occupy a tiny fraction of each page.",
            "The format options mirror what real documents use: plain digits (1, 2, 3) for most cases, or patterns like \"Page 3 of 12\" for contracts and reports where the total count matters. The total is computed from the actual page count at numbering time, so it is always consistent with the document you produce.",
          ],
        },
        {
          heading: "Placement decisions: margins, first pages and collisions",
          paragraphs: [
            "The classic placement is bottom-center or bottom-right, inside the bottom margin — where readers expect it and printers won't clip it. Printers often cannot print to the very edge of the paper, so a number placed too close to the physical edge may be cut off on some machines even though it looks fine on screen. Keeping numbers roughly half an inch (about 36 pt) from the page edge is the safe zone.",
            "Cover pages and title pages usually should not carry a number — a \"1\" stamped on the cover looks like an accident. Numbering tools commonly offer a start-offset for exactly this: begin numbering at page 2 (or after a table of contents), so the visible numbers match the body while the cover stays clean. Note the offset affects which page the count starts from, so \"Page 1\" lands wherever you point it.",
            "Collisions are the other trap: if the source pages already have numbers printed (say, you merged chapters that were numbered separately), overlaying new numbers produces two competing numbers per page. Overlay numbering cannot erase the old ink — that would require rasterizing or content surgery. In that case, merge unnumbered sources, or accept one document's numbering and skip overlaying.",
          ],
        },
        {
          heading: "A local edit for documents that circulate",
          paragraphs: [
            "Numbering is typically the last touch before a document goes out: the contract to be countersigned, the report for the board, the manuscript for submission. These are exactly the files where \"just upload it to a numbering site\" is the wrong trade — a numbered contract uploaded to a third-party server is your nearly-final legal document sitting in someone's logs for the sake of adding two digits per page.",
            "This tool does the overlay entirely in your browser: pages are processed locally, numbers are drawn into the page content in memory, and the output is written by your device. The document never leaves your machine in any form, and the operation is instant — there is no upload phase to wait for at all.",
            "A small quality habit: after numbering, open the output and flip through a few pages checking that numbers don't overlap footnotes, captions or content in the bottom margin — dense academic layouts sometimes run content where you'd expect margin. If a collision appears, shifting the position up or to the other side solves it without touching anything else.",
          ],
        },
      ],
    },
    zh: {
      name: "PDF 添加页码",
      tagline: "给 PDF 盖上页码:格式、角落、起始号自选,全程浏览器本地处理,文件不上传。",
      intro: [
        "打印或分享前给 PDF 加上像样的页码:三种格式(1、1/N、Page 1 of N)、六个角落、自定义起始号——文件在你的设备上重建,完成后直接下载。",
        "适合报告、合同、扫描合集,以及任何会上按页码讨论的材料。",
      ],
      steps: [
        "拖入要加页码的 PDF。",
        "选择格式、角落和起始页码。",
        "点击“添加页码”,下载盖章后的文件。",
      ],
      faqs: [
        {
          q: "能跳过封面页吗?",
          a: "把起始页码设为 0,封面就是第 0 页;或者先把封面拆出来,给剩余部分加页码,再合并回去。",
        },
        {
          q: "页面尺寸不一时页码位置一致吗?",
          a: "每页按自身宽高定位,横竖混排、大小不一的页面都会出现在同一个视觉角落。",
        },
      ],
      deepDive: [
        {
          heading: "页码叠加在 PDF 里是怎么实现的",
          paragraphs: [
            "给现有 PDF 加页码不会重新处理页面。原始内容——文字、图片、一切——原封不动;工具只是在每页的内容流末尾追加一小段绘制指令,把数字画在你选的位置。技术上这是叠加:在已有页面之上画新墨迹,就像事后盖了一个章。",
            "这也说明加页码是安全的、源头可逆的:原文件在磁盘上保持原样,带页码的输出与之相比只多了那几条绘制指令。页码用的字体要么加进文档要么用标准字体,在常规字号(9–12 磅)下,页码只占每页极小的面积。",
            "格式选项对应真实文档的用法:多数场合用纯数字(1、2、3),合同和报告这类需要体现总数的用“第 3 页,共 12 页”这类样式。总数按编号时的实际页数计算,所以永远和你产出的文档一致。",
          ],
        },
        {
          heading: "位置决策:页边距、首页与碰撞",
          paragraphs: [
            "经典位置是页脚居中或右下,放在下边距之内——读者期待的位置,打印机也不会裁掉。打印机常常打不到纸的最边缘,数字离物理边缘太近,在屏幕上看着没问题,在某些机器上却会被切掉。离页边约半英寸(约 36 磅)是安全区。",
            "封面和扉页通常不该带页码——封面上盖一个“1”看着像事故。编号工具一般都提供起始偏移正是为此:从第 2 页(或目录之后)开始编号,正文页码正常,封面保持干净。注意偏移影响的是从哪一页开始计数,“第 1 页”落在你指定的地方。",
            "另一个坑是碰撞:如果源页面已经印着页码(比如合并了各自编过号的章节),再叠加新页码就会出现一页两个号码互相竞争。叠加无法擦掉旧墨迹——那需要栅格化或对内容动手术。这种情况下,要么合并未编号的源文件,要么接受其中一方的编号、放弃叠加。",
          ],
        },
        {
          heading: "给外发文档做一次本地编辑",
          paragraphs: [
            "加页码通常是文档出门前的最后一道工序:待会签的合同、给董事会的报告、投稿的稿件。恰恰是这些文件,“传到某个编号网站”是笔错误的买卖——为每页加两个数字,让一份接近定稿的法律文书躺在别人的服务器日志里。",
            "本工具在浏览器里完成叠加:页面本地处理,页码在内存中画进页面内容,输出由你的设备写出。文档不以任何形式离开你的机器,操作即时完成——根本没有上传阶段可等。",
            "一个小的质量习惯:加完页码后打开输出翻几页,确认页码没有压到脚注、图注或下边距里的内容——排版密集的学术版式有时会把内容排进你以为的边距里。出现压叠,把位置上移或换到另一侧即可,不用动其他任何东西。",
          ],
        },
      ],
    },
    ja: {
      name: "PDF にページ番号を追加",
      tagline: "PDF にページ番号を焼き込みます。形式・隅・開始番号を選べる、すべてブラウザ内で処理。",
      intro: [
        "印刷や共有の前に PDF にページ番号を付けましょう。形式(1、1/N、Page 1 of N)、6 つの隅、開始番号を選ぶだけ。ファイルは端末内で再構築され、すぐダウンロードできます。",
        "報告書、契約書、スキャン資料など、ページ番号で参照される資料に便利です。",
      ],
      steps: [
        "番号を付けたい PDF をドロップします。",
        "形式・隅・開始番号を選びます。",
        "「ページ番号を追加」を押してダウンロードします。",
      ],
      faqs: [
        {
          q: "表紙に番号を付けずに済みますか?",
          a: "開始番号を 0 にすると表紙が 0 ページになります。または表紙を先に分割し、残りに番号を付けてから結合し直してください。",
        },
        {
          q: "ページサイズが混在していても位置は揃いますか?",
          a: "各ページは自分の幅と高さを基準に配置されるため、横向きやサイズが違うページでも同じ見た目の隅に入ります。",
        },
      ],
      deepDive: [
        {
          heading: "PDF におけるページ番号オーバーレイの仕組み",
          paragraphs: [
            "既存の PDF にページ番号を追加しても、ページは再処理されません。元の内容——テキストも画像もすべて——は無傷です。ツールは各ページのコンテンツストリームの末尾に小さな描画命令を追加し、選択した位置に番号を描くだけです。技術的にはこれはオーバーレイです。既存のページの上に新しいインクを置く、後から押したスタンプのようなものです。",
            "だから番号付けは安全で、ソース側からは取り消し可能です。元ファイルはディスク上で変更されず、番号付き出力との違いはその数行の描画命令だけです。番号のフォントは文書に追加されるか標準フォントで描かれ、通常のサイズ(9〜12 ポイント)では番号は各ページのごく一部しか占めません。",
            "書式の選択肢は実際の文書の作法に対応します。多くの場面では素の数字(1、2、3)、総数が意味を持つ契約書や報告書では「3 ページ / 全 12 ページ」のような形式です。総数は番号付け時点の実際のページ数から計算されるので、出力される文書と常に一致します。",
          ],
        },
        {
          heading: "配置の判断:余白、表紙、衝突",
          paragraphs: [
            "定番の位置は下中央または下右、下余白の内側です。読者が期待する場所であり、プリンタに切られることもありません。プリンタは紙の最端まで印刷できないことが多く、番号が物理端に近すぎると画面では良く見えても一部の機械で切られます。ページ端から約半インチ(36 ポイント程度)が安全圏です。",
            "表紙とタイトルページには通常番号を付けません。表紙に押された「1」は事故のように見えます。番号付けツールが開始オフセットを備えているのはまさにこのためで、2 ページ目(または目次の後)から番号を始めれば、本文の番号は正常で表紙は清潔に保たれます。オフセットは何ページ目から数え始めるかに影響するので、「1 ページ」はあなたが指した場所に落ちます。",
            "もう一つの罠は衝突です。ソースページに既に番号が印字されている場合(番号が別々に振られた章を結合した、など)、新しい番号を重ねると 1 ページに競合する番号が二つ並びます。オーバーレイは古いインクを消せません——消すにはラスタライズか内容の手術が要ります。その場合は番号なしのソースを結合するか、どちらか一方の番号を採用して重ねるのをやめるかです。",
          ],
        },
        {
          heading: "出回る文書のためのローカル編集",
          paragraphs: [
            "番号付けは通常、文書が出て行く直前の最後の仕上げです。副署される契約書、役員会の報告書、投稿原稿。まさにこういうファイルで「番号付けサイトにアップロードすればいい」は誤った取引です。1 ページに数字を二つ足すために、ほぼ最終版の法的文書を他人のサーバーのログに座らせることになります。",
            "このツールはオーバーレイを完全にブラウザ内で行います。ページはローカルで処理され、番号はメモリ内でページ内容に描き込まれ、出力は端末が書き出します。文書はいかなる形でも端末を離れず、操作は即時です。待つべきアップロード工程は最初から存在しません。",
            "小さな品質習慣:番号付け後に出力を開いて数ページめくり、番号が脚注・キャプション・下余白の内容と重なっていないか確認してください。密度の高い学術レイアウトは、余白のはずの場所に内容を走らせることがあります。重なりが出たら、位置を上か反対側へずらせば、他に何も触れずに解決します。",
          ],
        },
      ],
    },
    es: {
      name: "Añadir números de página al PDF",
      tagline: "Estampa números de página en un PDF: formato, esquina y número inicial a elegir, todo local en tu navegador.",
      intro: [
        "Dale números de página a un PDF antes de imprimirlo o compartirlo: elige formato (1, 1/N o Page 1 of N), una de seis esquinas y el número inicial; el archivo se reconstruye en tu dispositivo y se descarga al instante.",
        "Útil para informes, contratos, escaneos y cualquier documento que se cite por página.",
      ],
      steps: [
        "Suelta el PDF que quieres numerar.",
        "Elige formato, esquina y número inicial.",
        "Pulsa Añadir números y descarga el archivo.",
      ],
      faqs: [
        {
          q: "¿Puedo saltarme la portada?",
          a: "Pon 'Empezar en' en 0 y la portada tendrá el número 0; o separa la portada, numera el resto y vuelve a combinarlos.",
        },
        {
          q: "¿La posición queda igual con tamaños de página distintos?",
          a: "Cada página se estampa según su propio ancho y alto, así que orientaciones y tamaños mezclados llevan el número en la misma esquina visual.",
        },
      ],
      deepDive: [
        {
          heading: "Cómo funciona el superpuesto de números de página en un PDF",
          paragraphs: [
            "Añadir números de página a un PDF existente no re-procesa las páginas. El contenido original — texto, imágenes, todo — queda intacto; la herramienta añade una pequeña instrucción de dibujo extra al flujo de contenido de cada página que pinta el número en la posición que elijas. Técnicamente es un superpuesto: tinta nueva dibujada sobre la página existente, como un sello añadido después.",
            "Por eso numerar es seguro y reversible desde el origen: el archivo original permanece en tu disco sin modificar, y la salida numerada solo se diferencia por esos pocos comandos de dibujo extra. Las fuentes de los números se añaden al documento o se dibujan con fuentes estándar, y en tamaños típicos (9–12 pt) los números ocupan una fracción minúscula de cada página.",
            "Las opciones de formato reflejan lo que usan los documentos reales: dígitos simples (1, 2, 3) para la mayoría de los casos, o patrones como \"Página 3 de 12\" para contratos e informes donde importa el total. El total se calcula del número real de páginas en el momento de numerar, así que siempre coincide con el documento que produces.",
          ],
        },
        {
          heading: "Decisiones de colocación: márgenes, primeras páginas y colisiones",
          paragraphs: [
            "La colocación clásica es abajo-centro o abajo-derecha, dentro del margen inferior — donde los lectores la esperan y las impresoras no la recortan. Las impresoras a menudo no pueden imprimir hasta el borde físico del papel, así que un número demasiado pegado al borde puede cortarse en algunas máquinas aunque se vea bien en pantalla. Mantener los números a unos dos centímetros (36 pt) del borde de la página es la zona segura.",
            "Las portadas y las páginas de título normalmente no deberían llevar número — un \"1\" estampado en la portada parece un accidente. Las herramientas de numeración suelen ofrecer un desplazamiento inicial justo para esto: empezar a numerar en la página 2 (o tras un índice), así los números visibles corresponden al cuerpo y la portada queda limpia. Ojo: el desplazamiento afecta desde qué página empieza el conteo, así que \"Página 1\" cae donde tú la señales.",
            "Las colisiones son la otra trampa: si las páginas de origen ya llevan números impresos (por ejemplo, fusionaste capítulos numerados por separado), superponer números nuevos produce dos números competidores por página. El superpuesto no puede borrar la tinta vieja — eso exigiría rasterizar o hacer cirugía del contenido. En ese caso, fusiona fuentes sin numerar, o acepta la numeración de uno y renuncia a superponer.",
          ],
        },
        {
          heading: "Una edición local para documentos que circulan",
          paragraphs: [
            "Numerar suele ser el último toque antes de que un documento salga: el contrato por countersignar, el informe para el consejo, el manuscrito para envío. Son justo los archivos donde \"súbelo a un sitio de numeración\" es el mal intercambio — un contrato numerado subido a un servidor de terceros es tu documento legal casi final sentado en los registros de otro, todo por añadir dos dígitos por página.",
            "Esta herramienta hace el superpuesto por completo en tu navegador: las páginas se procesan en local, los números se dibujan en el contenido de la página en memoria y la salida la escribe tu dispositivo. El documento no sale de tu máquina de ninguna forma, y la operación es instantánea — no hay fase de subida que esperar en absoluto.",
            "Un pequeño hábito de calidad: tras numerar, abre la salida y hojea unas páginas comprobando que los números no pisan notas al pie, leyendas ni contenido del margen inferior — las maquetaciones académicas densas a veces meten contenido donde esperarías margen. Si aparece una colisión, desplazar la posición hacia arriba o al otro lado lo resuelve sin tocar nada más.",
          ],
        },
      ],
    },
    pt: {
      name: "Adicionar números de página ao PDF",
      tagline: "Estampe números de página num PDF — formato, canto e número inicial à sua escolha, tudo local no navegador.",
      intro: [
        "Dê números de página a um PDF antes de imprimir ou compartilhar: escolha o formato (1, 1/N ou Page 1 of N), um de seis cantos e o número inicial — o arquivo é reconstruído no seu dispositivo e sai pronto para download.",
        "Útil para relatórios, contratos, escaneamentos e qualquer material citado por página.",
      ],
      steps: [
        "Solte o PDF que quer numerar.",
        "Escolha formato, canto e número inicial.",
        "Clique em Adicionar números e baixe o arquivo.",
      ],
      faqs: [
        {
          q: "Dá para pular a capa?",
          a: "Defina 'Começar em' como 0 e a capa fica com o número 0 — ou separe a capa, numere o resto e junte tudo de novo.",
        },
        {
          q: "A posição fica igual com tamanhos de página diferentes?",
          a: "Cada página é estampada pela própria largura e altura, então orientações e tamanhos mistos recebem o número no mesmo canto visual.",
        },
      ],
      deepDive: [
        {
          heading: "Como funciona a sobreposição de numeração de página num PDF",
          paragraphs: [
            "Adicionar números de página a um PDF existente não reprocessa as páginas. O conteúdo original — texto, imagens, tudo — fica intacto; a ferramenta acrescenta uma pequena instrução extra de desenho ao fluxo de conteúdo de cada página, que pinta o número na posição que você escolher. Tecnicamente é uma sobreposição: tinta nova desenhada por cima da página existente, como um carimbo posto depois.",
            "Por isso numerar é seguro e reversível pela origem: o arquivo original permanece no seu disco sem modificação, e a saída numerada só se diferencia por esses poucos comandos de desenho extras. As fontes dos números são adicionadas ao documento ou desenhadas com fontes padrão, e em tamanhos típicos (9–12 pt) os números ocupam uma fração minúscula de cada página.",
            "As opções de formato espelham o que documentos reais usam: dígitos simples (1, 2, 3) para a maioria dos casos, ou padrões como \"Página 3 de 12\" para contratos e relatórios em que o total importa. O total é calculado da contagem real de páginas na hora da numeração, então sempre coincide com o documento que você produz.",
          ],
        },
        {
          heading: "Decisões de posicionamento: margens, primeiras páginas e colisões",
          paragraphs: [
            "O posicionamento clássico é inferior-central ou inferior-direito, dentro da margem de baixo — onde o leitor espera e as impressoras não cortam. Impressoras frequentemente não conseguem imprimir até a borda física do papel, então um número colado demais na borda pode ser cortado em algumas máquinas mesmo que pareça bem na tela. Manter os números a cerca de meio centímetro e meio (36 pt) da borda da página é a zona segura.",
            "Capas e páginas de título normalmente não deveriam levar número — um \"1\" estampado na capa parece acidente. Ferramentas de numeração costumam oferecer um deslocamento inicial justamente para isso: começar a numerar na página 2 (ou depois do sumário), assim os números visíveis batem com o corpo e a capa fica limpa. Atenção: o deslocamento afeta de que página começa a contagem, então \"Página 1\" cai onde você apontar.",
            "Colisões são a outra armadilha: se as páginas de origem já têm números impressos (digamos, você mesclou capítulos numerados separadamente), sobrepor números novos produz dois números competindo por página. A sobreposição não pode apagar a tinta velha — isso exigiria rasterizar ou fazer cirurgia no conteúdo. Nesse caso, mescle origens sem numeração, ou aceite a numeração de um deles e desista de sobrepor.",
          ],
        },
        {
          heading: "Uma edição local para documentos que circulam",
          paragraphs: [
            "Numerar costuma ser o último toque antes de o documento sair: o contrato a ser contra-assinado, o relatório para o conselho, o manuscrito para submissão. São exatamente os arquivos em que \"só subir num site de numeração\" é a troca errada — um contrato numerado enviado a um servidor de terceiros é o seu documento jurídico quase final sentado nos registros de outra pessoa, tudo para acrescentar dois dígitos por página.",
            "Esta ferramenta faz a sobreposição inteira no seu navegador: as páginas são processadas localmente, os números são desenhados no conteúdo da página em memória e a saída é escrita pelo seu dispositivo. O documento não sai da sua máquina de forma nenhuma, e a operação é instantânea — não há fase de envio para esperar de todo.",
            "Um pequeno hábito de qualidade: depois de numerar, abra o resultado e folheie algumas páginas conferindo que os números não pisam notas de rodapé, legendas ou conteúdo na margem inferior — layouts acadêmicos densos às vezes colocam conteúdo onde você esperaria margem. Se aparecer colisão, deslocar a posição para cima ou para o outro lado resolve sem mexer em mais nada.",
          ],
        },
      ],
    },
  },
});
