import { PdfPagesEngine } from "../_engines/pdf-engine-pages";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "split-pdf",
  featured: true,
  category: "pdf",
  icon: "crop",
  engine: { component: PdfPagesEngine, props: { op: "split" } },
  related: ["merge-pdf", "delete-pdf-pages", "rearrange-pdf-pages", "rotate-pdf", "pdf-to-jpg", "pdf-to-ppt", "compress-pdf", "ocr-pdf", "pdf-to-text", "jpg-to-pdf"],
  copy: {
    en: {
      name: "Split PDF",
      tagline:
        "Split a PDF into separate files by fixed page count or custom ranges — every output is generated locally and nothing is uploaded.",
      intro: [
        "Break a long PDF into smaller files in two ways: cut it every N pages (handy for 1-page-per-file or chapter-sized chunks), or define custom ranges like “1-3, 4-6, 8” and get one file per range. Multiple outputs are bundled into a ZIP automatically.",
        "The split runs on your device with pdf-lib — original files stay untouched, and the pieces never pass through a server. Ideal for confidential documents you would rather not upload anywhere.",
        "Splitting relies on pdf-lib's copyPages, which moves each page's full content stream, fonts and images into the new file untouched — there is no re-rendering and no quality loss anywhere in the pipeline. A 30 MB source split into five parts yields five files whose sizes add up to roughly the original, since the page data is carried over as-is.",
        "That is the key difference from printing a PDF range to a new PDF, which rasterizes or re-distills the content and often breaks links and selectable text. Here the pieces are faithful copies, produced locally in your browser; nothing is uploaded, and your original file is left exactly as it was on disk."
      ],
      steps: [
        "Drop the PDF you want to split.",
        "Choose “every N pages” or custom ranges and enter the values.",
        "Click Split PDF, then download each part or the whole ZIP.",
      ],
      faqs: [
        {
          q: "How do I split a PDF into single pages?",
          a: "Choose “Every N pages”, set it to 1, and each page becomes its own PDF. For more than one output file you also get a ZIP containing all of them.",
        },
        {
          q: "What range syntax is supported?",
          a: "Comma-separated values and hyphenated spans, for example “1-3, 5, 8-10”. Ranges may overlap and are processed in the order you type them.",
        },
        {
          q: "Does splitting change the quality of my pages?",
          a: "No. Pages are copied byte-for-byte into new documents, so text stays selectable and images keep their original quality.",
        },
      ],
    },
    zh: {
      name: "拆分 PDF",
      tagline: "按固定页数或自定义范围把 PDF 拆成多个文件,全部在本地生成,文件不上传到任何服务器。",
      intro: [
        "两种拆法:每 N 页切一份(适合一页一文件或按章节切分),或输入自定义范围(如“1-3, 4-6, 8”)按范围出文件。多个结果会自动打包成 ZIP 下载。",
        "拆分通过 pdf-lib 在你的设备上完成——原文件保持不变,拆出的文件也不经过任何服务器,适合处理不方便上传的机密文档。",
      ],
      steps: [
        "拖入需要拆分的 PDF。",
        "选择“每 N 页一份”或“自定义范围”并填写数值。",
        "点击“拆分 PDF”,逐个下载或直接下载 ZIP 压缩包。",
      ],
      faqs: [
        {
          q: "怎么把 PDF 拆成单页文件?",
          a: "选择“每 N 页一份”并把 N 设为 1,每一页就会变成独立的 PDF。输出多于一个文件时,还会额外提供包含全部文件的 ZIP。",
        },
        {
          q: "范围支持什么格式?",
          a: "支持逗号分隔和连写区间,例如“1-3, 5, 8-10”。范围可以重叠,并按输入顺序依次处理。",
        },
        {
          q: "拆分会影响页面质量吗?",
          a: "不会。页面按原始字节复制进新文档,文字仍可选中,图片保持原有质量。",
        },
      ],
    },
    ja: {
      name: "PDF 分割",
      tagline: "PDF を固定ページ数または範囲指定で複数ファイルに分割。生成はすべてローカルで、ファイルはサーバーにアップロードされません。",
      intro: [
        "長い PDF を 2 通りの方法で分割できます。N ページごとに切る方法(1 ページずつや章ごとに便利)と、「1-3, 4-6, 8」のような範囲を指定して 1 範囲 1 ファイルにする方法。複数の出力は自動的に ZIP にまとめられます。",
        "分割は pdf-lib により端末上で実行されます。元ファイルは変更されず、出力もサーバーを経由しません。アップロードしたくない機密文書に最適です。",
      ],
      steps: [
        "分割したい PDF をドロップします。",
        "「N ページごと」または「範囲を指定」を選び、値を入力します。",
        "「PDF を分割」をクリックし、各ファイルまたは ZIP をダウンロードします。",
      ],
      faqs: [
        {
          q: "PDF を 1 ページずつに分割するには?",
          a: "「N ページごと」を選んで 1 に設定すると、各ページが個別の PDF になります。出力が 2 ファイル以上のときは、すべてを含む ZIP もダウンロードできます。",
        },
        {
          q: "範囲の書き方は?",
          a: "カンマ区切りとハイフン範囲に対応します(例:「1-3, 5, 8-10」)。範囲の重複も可能で、入力した順に処理されます。",
        },
        {
          q: "分割するとページの品質は変わりますか?",
          a: "変わりません。ページはバイト単位で新しい文書にコピーされるため、テキストは選択可能なまま、画像も元の品質を保ちます。",
        },
      ],
    },
    es: {
      name: "Dividir PDF",
      tagline:
        "Divide un PDF en varios archivos por número de páginas fijo o por rangos personalizados: todo se genera en local y nada se sube a la red.",
      intro: [
        "Divide un PDF largo de dos formas: cortarlo cada N páginas (útil para una página por archivo o por capítulos) o definir rangos como “1-3, 4-6, 8” y obtener un archivo por rango. Si salen varios archivos, se empaquetan en un ZIP automáticamente.",
        "La división se ejecuta en tu dispositivo con pdf-lib: los originales quedan intactos y las partes nunca pasan por un servidor. Perfecto para documentos confidenciales que prefieres no subir a ningún sitio.",
      ],
      steps: [
        "Suelta el PDF que quieres dividir.",
        "Elige “cada N páginas” o “rangos personalizados” e introduce los valores.",
        "Pulsa Dividir PDF y descarga cada parte o el ZIP completo.",
      ],
      faqs: [
        {
          q: "¿Cómo divido un PDF en páginas sueltas?",
          a: "Elige “Cada N páginas”, pon 1 y cada página se convierte en un PDF propio. Cuando hay más de un archivo de salida también obtienes un ZIP con todos.",
        },
        {
          q: "¿Qué formato admiten los rangos?",
          a: "Valores separados por comas y tramos con guion, por ejemplo “1-3, 5, 8-10”. Los rangos pueden solaparse y se procesan en el orden en que los escribes.",
        },
        {
          q: "¿La división afecta a la calidad?",
          a: "No. Las páginas se copian byte a byte en documentos nuevos, así que el texto sigue siendo seleccionable y las imágenes mantienen su calidad original.",
        },
      ],
    },
    pt: {
      name: "Dividir PDF",
      tagline:
        "Divida um PDF em vários arquivos por contagem fixa de páginas ou por intervalos personalizados — tudo gerado localmente, sem upload.",
      intro: [
        "Divida um PDF longo de duas formas: cortando a cada N páginas (útil para uma página por arquivo ou por capítulos) ou definindo intervalos como “1-3, 4-6, 8” e recebendo um arquivo por intervalo. Vários saídas saem em um ZIP automaticamente.",
        "A divisão roda no seu dispositivo com pdf-lib — os originais ficam intactos e as partes nunca passam por um servidor. Ideal para documentos confidenciais que você prefere não enviar a lugar nenhum.",
      ],
      steps: [
        "Solte o PDF que quer dividir.",
        "Escolha “a cada N páginas” ou “intervalos personalizados” e informe os valores.",
        "Clique em Dividir PDF e baixe cada parte ou o ZIP completo.",
      ],
      faqs: [
        {
          q: "Como dividir um PDF em páginas individuais?",
          a: "Escolha “A cada N páginas”, defina 1 e cada página vira um PDF próprio. Quando há mais de um arquivo de saída, você também recebe um ZIP com todos.",
        },
        {
          q: "Qual é a sintaxe dos intervalos?",
          a: "Valores separados por vírgula e faixas com hífen, por exemplo “1-3, 5, 8-10”. Intervalos podem se sobrepor e são processados na ordem digitada.",
        },
        {
          q: "Dividir reduz a qualidade das páginas?",
          a: "Não. As páginas são copiadas byte a byte para novos documentos, então o texto continua selecionável e as imagens mantêm a qualidade original.",
        },
      ],
    },
  },
});
