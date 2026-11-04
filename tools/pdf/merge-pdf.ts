import { PdfPagesEngine } from "../_engines/pdf-engine-pages";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "merge-pdf",
  category: "pdf",
  icon: "layers",
  featured: true,
  engine: { component: PdfPagesEngine, props: { op: "merge" } },
  related: ["split-pdf", "rotate-pdf", "compress-pdf", "delete-pdf-pages", "jpg-to-pdf", "pdf-to-ppt", "ocr-pdf", "pdf-to-text", "rearrange-pdf-pages", "page-numbers-pdf"],
  copy: {
    en: {
      name: "Merge PDF",
      tagline:
        "Combine multiple PDFs into one document right in your browser — reorder files freely, no uploads, no watermarks, no signup.",
      intro: [
        "Drop in as many PDFs as you need, arrange them in the exact order you want, and merge them into a single file. Bookings, invoices, scanned chapters, application bundles — anything that arrives as ten separate attachments becomes one tidy document.",
        "Unlike online mergers that upload your files to a server, this tool reads and writes PDFs entirely on your device with pdf-lib. Your contracts, IDs and financial documents never leave your browser.",
        "Under the hood the merge uses pdf-lib's copyPages: every page is copied byte-for-byte from its source document, so text stays selectable, vector graphics stay sharp and embedded fonts, images and color profiles are never re-encoded. The output keeps PDF version 1.7, and files of mixed page sizes — A4 mixed with Letter, portrait with landscape — coexist in one document without rescaling.",
        "Compared with merging via printing to a virtual printer or screenshotting pages, nothing is rasterized here, so the merged file is as small as the sum of its sources and just as crisp. Unlike desktop suites, there is no install, no account and no page-count cap; the practical limit is your device's memory, not a paywall."
      ],
      steps: [
        "Drop two or more PDF files into the box (or click to choose them).",
        "Rearrange the list with the ↑ / ↓ buttons until the order is right.",
        "Click Merge PDFs and download the combined file.",
      ],
      faqs: [
        {
          q: "How many PDFs can I merge, and how large can they be?",
          a: "There is no artificial limit — the practical ceiling is your device's memory. A modern laptop comfortably merges 20+ files or around 100–200 MB total; very large scans may be slower but still work.",
        },
        {
          q: "Will bookmarks, form fields or annotations survive the merge?",
          a: "Page content, images and most annotations are preserved. Document-level extras such as bookmarks and form field values are not carried over — the merged file contains the visual pages of each source.",
        },
        {
          q: "Are my files uploaded anywhere?",
          a: "No. Merging happens locally in your browser with JavaScript. Nothing is sent to any server, and the merged PDF is generated on your own device.",
        },
      ],
    },
    zh: {
      name: "合并 PDF",
      tagline: "把多个 PDF 合并为一个文件,支持自由排序,全程在浏览器本地完成,不上传、无水印、无需注册。",
      intro: [
        "把需要合并的 PDF 一起拖进来,按想要的顺序排列,一键生成单个文件。机票、发票、扫描章节、申请材料——十个零散附件从此变成一份整齐的文档。",
        "与其他需要上传文件到服务器的在线合并工具不同,本工具通过 pdf-lib 在你的设备上直接读写 PDF。合同、证件、财务文件永远不会离开你的浏览器。",
      ],
      steps: [
        "把两个或更多 PDF 文件拖入方框(或点击选择)。",
        "用 ↑ / ↓ 按钮调整文件顺序,直到排列正确。",
        "点击“合并 PDF”,下载合并后的文件。",
      ],
      faqs: [
        {
          q: "最多能合并多少个 PDF?文件可以多大?",
          a: "没有人为限制,实际取决于设备内存。现代笔记本轻松合并 20 个以上文件或约 100–200 MB 总量;超大扫描件会慢一些,但同样可以完成。",
        },
        {
          q: "书签、表单和批注会保留吗?",
          a: "页面内容、图片和大部分批注会保留。书签、表单填写值等文档级信息不会带入合并结果——合并文件包含每个源文件的页面内容。",
        },
        {
          q: "文件会被上传吗?",
          a: "不会。合并在浏览器中用 JavaScript 本地完成,不会向任何服务器发送数据,合并结果也只在你的设备上生成。",
        },
      ],
    },
    ja: {
      name: "PDF 結合",
      tagline: "複数の PDF をブラウザ内で 1 つに結合。順序は自由に入れ替えでき、アップロード不要・ウォーターマークなし・登録不要です。",
      intro: [
        "必要な PDF をまとめてドラッグし、好きな順番に並べ替えて 1 ファイルに結合。航空券、請求書、スキャンした章、申請書類など、バラバラの添付ファイルを 1 冊にまとめられます。",
        "ファイルをサーバーにアップロードする他のオンライン結合ツールと違い、このツールは pdf-lib で端末上で直接 PDF を読み書きします。契約書や身分証、財務資料がブラウザの外に出ることはありません。",
      ],
      steps: [
        "PDF ファイルを 2 つ以上ボックスにドロップします(クリックで選択も可)。",
        "↑ / ↓ ボタンでリストを並べ替え、順序を確定します。",
        "「PDF を結合」をクリックし、結合ファイルをダウンロードします。",
      ],
      faqs: [
        {
          q: "結合できる PDF の数やサイズに上限はありますか?",
          a: "人为的な制限はありません。実用上の上限は端末のメモリです。最新のノート PC なら 20 ファイル以上・合計 100〜200 MB 程度を快適に結合できます。大きなスキャンデータは時間がかかる場合があります。",
        },
        {
          q: "しおりやフォーム、注釈は保持されますか?",
          a: "ページの内容・画像・多くの注釈は保持されます。しおりやフォーム入力値などの文書単位の情報は引き継がれません。結合後のファイルには各ソースのページが入ります。",
        },
        {
          q: "ファイルはアップロードされますか?",
          a: "いいえ。結合はブラウザ内の JavaScript でローカルに行われ、サーバーには何も送信されません。結果も端末上で生成されます。",
        },
      ],
    },
    es: {
      name: "Combinar PDF",
      tagline:
        "Une varios PDF en un solo documento directamente en tu navegador: reordena los archivos libremente, sin subirlos, sin marcas de agua y sin registro.",
      intro: [
        "Arrastra todos los PDF que necesites, ordénalos como quieras y combínalos en un único archivo. Reservas, facturas, capítulos escaneados o dossiers de solicitud: diez adjuntos sueltos pasan a ser un documento ordenado.",
        "A diferencia de otras herramientas que suben tus archivos a un servidor, esta lee y escribe los PDF en tu propio dispositivo con pdf-lib. Tus contratos, documentos de identidad y datos financieros nunca salen del navegador.",
      ],
      steps: [
        "Suelta dos o más archivos PDF en el recuadro (o haz clic para elegirlos).",
        "Reordena la lista con los botones ↑ / ↓ hasta dejar el orden correcto.",
        "Pulsa Combinar PDF y descarga el archivo resultante.",
      ],
      faqs: [
        {
          q: "¿Cuántos PDF puedo combinar y de qué tamaño?",
          a: "No hay límite artificial: el tope práctico es la memoria de tu equipo. Un portátil actual combina sin problemas más de 20 archivos o unos 100–200 MB en total; los escaneos muy grandes tardan más pero también funcionan.",
        },
        {
          q: "¿Se conservan los marcadores, formularios y anotaciones?",
          a: "El contenido de las páginas, las imágenes y la mayoría de anotaciones se conservan. Los marcadores y los valores de formularios no se transfieren: el archivo combinado contiene las páginas visibles de cada original.",
        },
        {
          q: "¿Mis archivos se suben a algún sitio?",
          a: "No. La combinación ocurre localmente en tu navegador con JavaScript. No se envía nada a ningún servidor y el PDF resultante se genera en tu propio dispositivo.",
        },
      ],
    },
    pt: {
      name: "Mesclar PDF",
      tagline:
        "Junte vários PDFs em um único documento direto no navegador — reordene os arquivos livremente, sem upload, sem marca d'água e sem cadastro.",
      intro: [
        "Arraste quantos PDFs precisar, organize na ordem exata que quiser e mescle tudo em um arquivo só. Reservas, notas fiscais, capítulos escaneados, documentos de candidatura — dez anexos soltos viram um documento organizado.",
        "Diferente das ferramentas online que enviam seus arquivos para um servidor, esta lê e grava PDFs no seu próprio dispositivo com pdf-lib. Seus contratos, documentos e dados financeiros nunca saem do navegador.",
      ],
      steps: [
        "Solte dois ou mais arquivos PDF na área (ou clique para escolher).",
        "Reordene a lista com os botões ↑ / ↓ até ficar na ordem certa.",
        "Clique em Mesclar PDFs e baixe o arquivo combinado.",
      ],
      faqs: [
        {
          q: "Quantos PDFs posso mesclar e qual o tamanho máximo?",
          a: "Não há limite artificial — o teto prático é a memória do seu aparelho. Um notebook moderno mescla tranquilamente mais de 20 arquivos ou cerca de 100–200 MB no total; digitalizações muito grandes demoram mais, mas funcionam.",
        },
        {
          q: "Marcadores, formulários e anotações são mantidos?",
          a: "O conteúdo das páginas, imagens e a maioria das anotações são preservados. Marcadores e valores de formulários não são transferidos — o arquivo mesclado contém as páginas visíveis de cada original.",
        },
        {
          q: "Meus arquivos são enviados para algum servidor?",
          a: "Não. A mesclagem acontece localmente no seu navegador com JavaScript. Nada é enviado a nenhum servidor e o PDF resultante é gerado no seu próprio dispositivo.",
        },
      ],
    },
  },
});
