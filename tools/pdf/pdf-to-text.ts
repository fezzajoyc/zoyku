import { PdfOfficeEngine } from "../_engines/pdf-engine-office";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "pdf-to-text",
  category: "pdf",
  icon: "text",
  engine: { component: PdfOfficeEngine, props: { target: "text" } },
  related: ["ocr-pdf", "pdf-to-word", "pdf-to-excel", "word-counter", "split-pdf", "delete-pdf-pages", "pdf-to-ppt", "compress-pdf", "rotate-pdf", "merge-pdf"],
  copy: {
    en: {
      name: "PDF to Text",
      tagline:
        "Pull plain text out of any PDF instantly — preview it, copy to clipboard or save as .txt, extracted page by page in your browser.",
      intro: [
        "Get the raw words out of a PDF without copy-pasting page by page. The extractor walks through the document, rebuilds reading order and hands you clean plain text you can preview, copy at once or download as a .txt file.",
        "Use it to feed quotes into notes, run text through another tool, or make a text-only archive of a document. Word counts are shown as you go, and extraction is instant because everything happens locally.",
      ],
      steps: [
        "Drop a PDF with selectable text.",
        "Click Extract text and read the preview.",
        "Copy the result or download it as a .txt file.",
      ],
      faqs: [
        {
          q: "The result is empty — why?",
          a: "The PDF is probably a scan: its pages are photos of text with no text layer. Use the OCR tool instead; it reads the letters out of the images.",
        },
        {
          q: "How is reading order determined?",
          a: "Text items are grouped into lines by their coordinates and lines are ordered top to bottom, left to right. Multi-column layouts may interleave columns; splitting the PDF per column range first can help.",
        },
        {
          q: "Is there a page or size limit?",
          a: "No artificial one. Hundreds of pages work; the practical limit is browser memory, typically well beyond 100 MB documents.",
        },
      ],
    },
    zh: {
      name: "PDF 转文本",
      tagline: "从任意 PDF 中即时提取纯文本——预览、一键复制或保存为 .txt,按页提取,全程在浏览器本地完成。",
      intro: [
        "不用逐页复制粘贴,直接把 PDF 里的文字拿出来。提取器遍历文档、按坐标重建阅读顺序,输出干净的纯文本:可预览、一键复制,或下载为 .txt 文件。",
        "适合把引文整理进笔记、把文字交给其他工具处理,或为文档做纯文本存档。随时显示字数统计,提取即时完成,因为一切都在本地进行。",
      ],
      steps: [
        "拖入有可选中文字的 PDF。",
        "点击“提取文本”并查看预览。",
        "复制结果或下载为 .txt 文件。",
      ],
      faqs: [
        {
          q: "结果为什么是空的?",
          a: "这个 PDF 多半是扫描件:页面是文字的照片,没有文本层。请改用 OCR 工具,它能从图片中识别文字。",
        },
        {
          q: "阅读顺序是怎么确定的?",
          a: "文字条目按坐标聚合成行,行再按从上到下、从左到右排序。多栏排版可能出现两栏交错;先用“拆分 PDF”按栏位拆分会有帮助。",
        },
        {
          q: "有页数或大小限制吗?",
          a: "没有人为主观限制。几百页没问题;实际限制是浏览器内存,通常远超 100 MB 的文档。",
        },
      ],
    },
    ja: {
      name: "PDF をテキストに変換",
      tagline: "あらゆる PDF からプレーンテキストを即座に取り出し。プレビュー・一括コピー・.txt 保存に対応。ページ単位の抽出をブラウザ内で。",
      intro: [
        "ページごとのコピペなしで、PDF の文章をそのまま取り出します。抽出処理は文書をなぞり、座標から読む順序を再構築し、プレビュー・一括コピー・.txt としてダウンロードできるきれいなプレーンテキストを返します。",
        "引用をノートに集める、別のツールにテキストを渡す、文書のテキスト専用アーカイブを作る、といった用途に。文字数も常に表示され、すべてローカル処理なので抽出は一瞬です。",
      ],
      steps: [
        "テキストを選択できる PDF をドロップします。",
        "「テキストを抽出」をクリックし、プレビューを確認します。",
        "結果をコピーするか、.txt としてダウンロードします。",
      ],
      faqs: [
        {
          q: "結果が空になるのはなぜ?",
          a: "その PDF はスキャン画像の可能性が高いです。ページは文字の写真で、テキスト層がありません。代わりに OCR ツールを使うと、画像から文字を読み取れます。",
        },
        {
          q: "読む順序はどう決まりますか?",
          a: "テキスト要素を座標で行にまとめ、上から下・左から右に並べます。段組みレイアウトでは段が交互になることがあり、先に PDF を段ごとに分割すると改善します。",
        },
        {
          q: "ページ数やサイズの上限は?",
          a: "人為的な上限はありません。数百ページも問題なく動きます。実用上の上限はブラウザのメモリで、通常は 100 MB 超の文書でも十分足ります。",
        },
      ],
    },
    es: {
      name: "PDF a texto",
      tagline:
        "Saca el texto plano de cualquier PDF al instante: véalo, cópielo o guárdelo como .txt, extraído página a página en su navegador.",
      intro: [
        "Obtén las palabras de un PDF sin copiar y pegar página por página. El extractor recorre el documento, reconstruye el orden de lectura y te entrega texto plano limpio que puedes previsualizar, copiar de una vez o descargar como .txt.",
        "Úsalo para llevar citas a tus notas, pasar el texto por otra herramienta o crear un archivo solo de texto de un documento. El recuento de palabras se muestra sobre la marcha, y la extracción es instantánea porque todo ocurre en local.",
      ],
      steps: [
        "Suelta un PDF con texto seleccionable.",
        "Pulsa Extraer texto y lee la vista previa.",
        "Copia el resultado o descárgalo como .txt.",
      ],
      faqs: [
        {
          q: "El resultado sale vacío, ¿por qué?",
          a: "Probablemente es un escaneo: sus páginas son fotos del texto sin capa de texto. Usa la herramienta de OCR, que lee las letras de las imágenes.",
        },
        {
          q: "¿Cómo se determina el orden de lectura?",
          a: "Los fragmentos se agrupan en líneas por sus coordenadas y las líneas se ordenan de arriba abajo y de izquierda a derecha. En maquetaciones a varias columnas pueden entremezclarse; dividir el PDF por columnas antes ayuda.",
        },
        {
          q: "¿Hay límite de páginas o de tamaño?",
          a: "No artificial. Cientos de páginas funcionan; el límite práctico es la memoria del navegador, normalmente muy por encima de documentos de 100 MB.",
        },
      ],
    },
    pt: {
      name: "PDF para texto",
      tagline:
        "Extraia o texto puro de qualquer PDF na hora — visualize, copie ou salve como .txt, página por página, direto no navegador.",
      intro: [
        "Tire as palavras de um PDF sem copiar e colar página por página. O extrator percorre o documento, reconstrói a ordem de leitura e entrega um texto puro limpo para visualizar, copiar de uma vez ou baixar como .txt.",
        "Use para levar citações às suas anotações, passar o texto por outra ferramenta ou criar um arquivo só de texto de um documento. A contagem de palavras aparece durante o processo, e a extração é instantânea porque tudo roda localmente.",
      ],
      steps: [
        "Solte um PDF com texto selecionável.",
        "Clique em Extrair texto e leia a prévia.",
        "Copie o resultado ou baixe como .txt.",
      ],
      faqs: [
        {
          q: "O resultado veio vazio — por quê?",
          a: "Provavelmente é uma digitalização: as páginas são fotos do texto, sem camada de texto. Use a ferramenta de OCR, que lê as letras das imagens.",
        },
        {
          q: "Como a ordem de leitura é definida?",
          a: "Os trechos são agrupados em linhas pelas coordenadas e as linhas ordenadas de cima para baixo, da esquerda para a direita. Layouts de várias colunas podem se entrelaçar; dividir o PDF por colunas antes ajuda.",
        },
        {
          q: "Existe limite de páginas ou tamanho?",
          a: "Nenhum artificial. Centenas de páginas funcionam; o limite prático é a memória do navegador, normalmente bem acima de documentos de 100 MB.",
        },
      ],
    },
  },
});
