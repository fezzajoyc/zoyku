import { PdfOfficeEngine } from "../_engines/pdf-engine-office";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "pdf-to-excel",
  category: "pdf",
  icon: "calc",
  engine: { component: PdfOfficeEngine, props: { target: "xlsx" } },
  related: ["pdf-to-word", "pdf-to-text", "ocr-pdf", "merge-pdf", "split-pdf"],
  copy: {
    en: {
      name: "PDF to Excel",
      tagline:
        "Extract the rows and columns of a PDF into an editable Excel spreadsheet (.xlsx) — row-by-row conversion in your browser, free.",
      intro: [
        "Bank statements, price lists and reports locked in PDF become workable data again: each visual line becomes a spreadsheet row, and text split by wide spacing is separated into columns automatically. Page numbers are kept in the first column so you can trace everything back.",
        "This is a practical, text-based extraction — not an AI table reconstruction. It shines on monospaced statements and aligned lists; messy multi-line tables may need a quick cleanup in Excel. The trade: your data never leaves the device.",
      ],
      steps: [
        "Drop a text-based PDF (selectable text, not a photo scan).",
        "Click Convert to Excel.",
        "Download the .xlsx and tidy up any merged rows in Excel.",
      ],
      faqs: [
        {
          q: "How are columns detected?",
          a: "Lines are split into cells wherever two or more spaces appear — the usual alignment cue in PDF text. Well-aligned tables convert cleanly; prose turns into one cell per line.",
        },
        {
          q: "My scanned statement gives an empty sheet.",
          a: "Scans have no text layer. Run the file through our OCR tool first, then paste the recognized text into Excel, or convert the OCR output here.",
        },
        {
          q: "Can numbers keep their formatting?",
          a: "Values land as text exactly as printed, preserving leading zeros and regional decimal commas — Excel treats them as strings until you convert the column.",
        },
      ],
    },
    zh: {
      name: "PDF 转 Excel",
      tagline: "把 PDF 中的行列提取成可编辑的 Excel 表格(.xlsx)——逐行转换,浏览器本地完成,免费。",
      intro: [
        "锁在 PDF 里的银行流水、价目表和报告重新变成可处理的数据:每个视觉行变成一行,按宽间距分隔的文字自动拆成多列。第一列保留页码,方便回溯核对。",
        "这是实用的文本提取,不是 AI 表格还原。对等宽字体流水和对齐列表效果最好;凌乱的多行表格可能需要在 Excel 里简单整理。换来的是:数据永远不离开你的设备。",
      ],
      steps: [
        "拖入文本型 PDF(文字可选中,而非照片扫描件)。",
        "点击“转换为 Excel”。",
        "下载 .xlsx,在 Excel 里整理需要合并的行。",
      ],
      faqs: [
        {
          q: "列是怎么识别的?",
          a: "凡是出现两个及以上连续空格的位置就会拆分为单元格——这是 PDF 文本里常见的对齐特征。对齐良好的表格转换得很干净;普通文章则每行一个单元格。",
        },
        {
          q: "扫描的流水单导出是空表?",
          a: "扫描件没有文本层。先用我们的 OCR 工具识别,再把识别文本粘进 Excel,或在这里继续转换 OCR 输出。",
        },
        {
          q: "数字格式会保留吗?",
          a: "数值按打印原样作为文本导入,保留前导零和小数逗号等写法——在 Excel 里它们是字符串,需要时再转换列格式。",
        },
      ],
    },
    ja: {
      name: "PDF を Excel に変換",
      tagline: "PDF の行と列を編集可能な Excel 表(.xlsx)に抽出。行単位の変換をブラウザ内で無料で実行します。",
      intro: [
        "PDF に閉じ込められた明細書・価格表・報告書を、扱えるデータに戻します。見た目の 1 行が表の 1 行になり、広い空白で区切られた文字は自動的に列へ分割されます。先頭列にはページ番号が残るので、元の位置をたどれます。",
        "実用的なテキスト抽出であり、AI による表の再構成ではありません。等幅の明細や整列したリストに最も効果を発揮し、乱れた複数行の表は Excel での微調整が必要なことも。その代わり、データが端末から出ることはありません。",
      ],
      steps: [
        "テキストベースの PDF(文字を選択できるもの)をドロップします。",
        "「Excel に変換」をクリックします。",
        ".xlsx をダウンロードし、必要なら Excel で整えます。",
      ],
      faqs: [
        {
          q: "列はどう検出されますか?",
          a: "2 つ以上の連続した空白がある位置でセルに分割します。これは PDF テキストで一般的な整列の合図です。整った表はきれいに変換され、文章は 1 行 1 セルになります。",
        },
        {
          q: "スキャンした明細から空の表が出ます。",
          a: "スキャンにはテキスト層がありません。まず OCR ツールで認識し、そのテキストを Excel に貼るか、ここで OCR 出力を変換してください。",
        },
        {
          q: "数値の書式は保持されますか?",
          a: "値は印刷どおり文字列として取り込まれ、先頭の 0 や小数点コンマもそのままです。Excel では文字列扱いなので、必要に応じて列を変換してください。",
        },
      ],
    },
    es: {
      name: "PDF a Excel",
      tagline:
        "Extrae las filas y columnas de un PDF a una hoja de cálculo editable (.xlsx): conversión fila a fila en tu navegador, gratis.",
      intro: [
        "Extractos bancarios, listas de precios e informes atrapados en un PDF vuelven a ser datos manejables: cada línea visual se convierte en una fila y el texto separado por espacios anchos se reparte en columnas automáticamente. La primera columna guarda el número de página para poder rastrearlo todo.",
        "Es una extracción práctica basada en texto, no una reconstrucción de tablas con IA. Brilla en extractos monoespaciados y listas alineadas; las tablas multilínea caóticas pueden requerir un repaso en Excel. A cambio, tus datos nunca salen del dispositivo.",
      ],
      steps: [
        "Suelta un PDF con texto (seleccionable, no un escaneo).",
        "Pulsa Convertir a Excel.",
        "Descarga el .xlsx y arregla en Excel las filas que lo necesiten.",
      ],
      faqs: [
        {
          q: "¿Cómo se detectan las columnas?",
          a: "Las líneas se dividen en celdas donde aparecen dos o más espacios seguidos, la pista habitual de alineación en el texto PDF. Las tablas bien alineadas se convierten limpias; la prosa queda como una celda por línea.",
        },
        {
          q: "Mi extracto escaneado da una hoja vacía.",
          a: "Los escaneos no tienen capa de texto. Pasa el archivo primero por nuestra herramienta de OCR y pega el texto reconocido en Excel, o convierte aquí la salida del OCR.",
        },
        {
          q: "¿Los números conservan su formato?",
          a: "Los valores llegan como texto tal y como están impresos, conservando ceros a la izquierda y comas decimales. Excel los trata como cadenas hasta que conviertas la columna.",
        },
      ],
    },
    pt: {
      name: "PDF para Excel",
      tagline:
        "Extraia as linhas e colunas de um PDF para uma planilha editável (.xlsx) — conversão linha a linha no navegador, de graça.",
      intro: [
        "Extratos bancários, tabelas de preços e relatórios presos em um PDF voltam a ser dados utilizáveis: cada linha visual vira uma linha da planilha e o texto separado por espaços largos é dividido em colunas automaticamente. A primeira coluna guarda o número da página para rastrear tudo.",
        "Esta é uma extração prática baseada em texto — não uma reconstrução de tabelas com IA. Funciona muito bem em extratos monoespaçados e listas alinhadas; tabelas bagunçadas de várias linhas podem precisar de um ajuste no Excel. Em troca, seus dados nunca saem do dispositivo.",
      ],
      steps: [
        "Solte um PDF com texto (selecionável, não uma digitalização).",
        "Clique em Converter para Excel.",
        "Baixe o .xlsx e organize no Excel as linhas que precisarem.",
      ],
      faqs: [
        {
          q: "Como as colunas são detectadas?",
          a: "As linhas são divididas em células onde aparecem dois ou mais espaços seguidos — o sinal clássico de alinhamento no texto de PDFs. Tabelas bem alinhadas convertem limpas; prosa vira uma célula por linha.",
        },
        {
          q: "Meu extrato digitalizado gera uma planilha vazia.",
          a: "Digitalizações não têm camada de texto. Passe o arquivo primeiro pela nossa ferramenta de OCR e cole o texto reconhecido no Excel, ou converta aqui a saída do OCR.",
        },
        {
          q: "Os números mantêm a formatação?",
          a: "Os valores chegam como texto exatamente como impressos, preservando zeros à esquerda e vírgulas decimais. O Excel os trata como texto até você converter a coluna.",
        },
      ],
    },
  },
});
