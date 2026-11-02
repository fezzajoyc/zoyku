import { PdfToImagesEngine } from "../_engines/pdf-engine-pdf-to-images";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "pdf-to-jpg",
  category: "pdf",
  icon: "image",
  featured: true,
  engine: { component: PdfToImagesEngine, props: { format: "jpg" } },
  related: ["pdf-to-png", "jpg-to-pdf", "compress-pdf", "ocr-pdf", "split-pdf"],
  copy: {
    en: {
      name: "PDF to JPG",
      tagline:
        "Export every PDF page as a JPG image at up to 300 DPI — single pages or a ZIP for many, converted right on your device.",
      intro: [
        "Turn a PDF into shareable images: each page becomes a JPG at the resolution you choose, rendered exactly as the page looks — fonts, colors and images included. Ten pages give you ten numbered files; more than one and you also get a ZIP.",
        "JPG is the format chats, slides and social platforms accept everywhere. Rendering happens locally with pdf.js — the PDF is never uploaded, which matters for contracts and personal documents.",
      ],
      steps: [
        "Drop the PDF you want to convert.",
        "Choose the output resolution (150 DPI suits most screens).",
        "Click Convert and download each page or the ZIP.",
      ],
      faqs: [
        {
          q: "Which resolution should I pick?",
          a: "96 DPI is fine for screen viewing, 150 DPI is the balanced default, and 200–300 DPI suits printing. Higher DPI means bigger files and slower rendering on long documents.",
        },
        {
          q: "Why does text look softer than in the PDF?",
          a: "JPG is a lossy photo format — at low quality, sharp letter edges get slight artifacts. Raise the DPI or use the PDF to PNG tool for pixel-perfect text.",
        },
        {
          q: "Can I convert only some pages?",
          a: "This tool converts the whole document and names files by page number, so you can keep just the ones you need. Use Split PDF first if you want a specific range in advance.",
        },
      ],
    },
    zh: {
      name: "PDF 转 JPG",
      tagline: "把每一页 PDF 导出为最高 300 DPI 的 JPG 图片——单页逐一下载或多页打包 ZIP,全部在你的设备上转换。",
      intro: [
        "把 PDF 变成方便分享的图片:每一页按你选择的分辨率渲染成 JPG,字体、颜色、图片与原页面一致。10 页就是 10 个编号文件,多页时还会自动提供 ZIP。",
        "JPG 是聊天、幻灯片和社交平台通吃的格式。渲染由 pdf.js 在本地完成——PDF 不会被上传,这对合同和个人文档尤为重要。",
      ],
      steps: [
        "拖入要转换的 PDF。",
        "选择输出分辨率(150 DPI 适合大多数屏幕)。",
        "点击“转换”,逐页下载或下载 ZIP。",
      ],
      faqs: [
        {
          q: "应该选多大分辨率?",
          a: "屏幕查看 96 DPI 就够;150 DPI 是均衡的默认值;要打印选 200–300 DPI。DPI 越高文件越大,长文档渲染也越慢。",
        },
        {
          q: "为什么文字看起来比 PDF 里模糊?",
          a: "JPG 是有损的照片格式,低质量下锐利的笔画边缘会出现轻微伪影。提高 DPI,或改用“PDF 转 PNG”获得像素级清晰的文字。",
        },
        {
          q: "可以只转换部分页面吗?",
          a: "本工具转换整个文档并按页码命名文件,留下需要的即可。想提前圈定范围,可以先用“拆分 PDF”。",
        },
      ],
    },
    ja: {
      name: "PDF を JPG に変換",
      tagline: "PDF の各ページを最大 300 DPI の JPG 画像として書き出し。1 ページずつでも ZIP 一括でも、変換はすべて端末内で行われます。",
      intro: [
        "PDF を共有しやすい画像に変換します。各ページが選択した解像度の JPG になり、フォント・色・画像も見た目どおりに描画されます。10 ページなら 10 個の連番ファイル、複数ページなら ZIP も用意されます。",
        "JPG はチャット・スライド・SNS のどこでも使える形式です。描画は pdf.js によるローカル処理で、PDF はアップロードされません。契約書や個人文書でも安心です。",
      ],
      steps: [
        "変換したい PDF をドロップします。",
        "出力解像度を選びます(150 DPI が標準的です)。",
        "「変換」をクリックし、各ページまたは ZIP をダウンロードします。",
      ],
      faqs: [
        {
          q: "解像度はどれを選ぶべき?",
          a: "画面表示なら 96 DPI、バランス重視の既定は 150 DPI、印刷は 200〜300 DPI が目安です。DPI が高いほどファイルは大きく、長い文書の描画も遅くなります。",
        },
        {
          q: "文字が PDF よりにじんで見えるのはなぜ?",
          a: "JPG は非可逆の写真形式で、低品質では文字のエッジに軽いノイズが出ます。DPI を上げるか、「PDF を PNG に」を使うとテキストがピクセル単位でくっきりします。",
        },
        {
          q: "一部のページだけ変換できますか?",
          a: "このツールは文書全体を変換し、ページ番号付きで保存します。必要なものだけ残してください。範囲を先に絞りたい場合は「PDF 分割」を併用できます。",
        },
      ],
    },
    es: {
      name: "PDF a JPG",
      tagline:
        "Exporta cada página de un PDF como imagen JPG de hasta 300 DPI: páginas sueltas o un ZIP para muchas, convertido en tu propio dispositivo.",
      intro: [
        "Convierte un PDF en imágenes fáciles de compartir: cada página se convierte en un JPG a la resolución que elijas, dibujada tal y como se ve la página: fuentes, colores e imágenes incluidos. Diez páginas dan diez archivos numerados; si hay varios, también un ZIP.",
        "JPG es el formato que aceptan chats, presentaciones y redes sociales. El renderizado es local con pdf.js: el PDF nunca se sube, algo importante en contratos y documentos personales.",
      ],
      steps: [
        "Suelta el PDF que quieres convertir.",
        "Elige la resolución de salida (150 DPI va bien para pantalla).",
        "Pulsa Convertir y descarga cada página o el ZIP.",
      ],
      faqs: [
        {
          q: "¿Qué resolución elijo?",
          a: "96 DPI basta para ver en pantalla, 150 DPI es el valor equilibrado y 200–300 DPI sirve para imprimir. Cuanto mayor el DPI, más pesan los archivos y más tarda el renderizado en documentos largos.",
        },
        {
          q: "¿Por qué el texto se ve más suave que en el PDF?",
          a: "JPG es un formato fotográfico con pérdida: a baja calidad, los bordes de las letras sufren ligeras alteraciones. Sube el DPI o usa PDF a PNG para un texto píxel-perfecto.",
        },
        {
          q: "¿Puedo convertir solo algunas páginas?",
          a: "Esta herramienta convierte todo el documento y nombra los archivos por página, así que puedes quedarte con las que necesites. Usa Dividir PDF antes si quieres fijar un rango concreto.",
        },
      ],
    },
    pt: {
      name: "PDF para JPG",
      tagline:
        "Exporte cada página de um PDF como imagem JPG de até 300 DPI — páginas individuais ou um ZIP para muitas, convertido no seu dispositivo.",
      intro: [
        "Transforme um PDF em imagens fáceis de compartilhar: cada página vira um JPG na resolução escolhida, renderizada exatamente como aparece — fontes, cores e imagens incluídas. Dez páginas geram dez arquivos numerados; com vários, você também recebe um ZIP.",
        "JPG é o formato aceito em chats, slides e redes sociais. A renderização é local com pdf.js — o PDF nunca é enviado, o que importa em contratos e documentos pessoais.",
      ],
      steps: [
        "Solte o PDF que quer converter.",
        "Escolha a resolução de saída (150 DPI serve para a maioria das telas).",
        "Clique em Converter e baixe cada página ou o ZIP.",
      ],
      faqs: [
        {
          q: "Qual resolução escolher?",
          a: "96 DPI basta para ver na tela, 150 DPI é o padrão equilibrado e 200–300 DPI servem para impressão. Quanto maior o DPI, maiores os arquivos e mais lenta a renderização em documentos longos.",
        },
        {
          q: "Por que o texto fica mais suave que no PDF?",
          a: "JPG é um formato fotográfico com perdas — em qualidade baixa, as bordas das letras ganham pequenos artefatos. Aumente o DPI ou use PDF para PNG para um texto pixel-perfect.",
        },
        {
          q: "Posso converter só algumas páginas?",
          a: "Esta ferramenta converte o documento inteiro e nomeia os arquivos por página, então basta manter as que precisar. Use Dividir PDF antes se quiser fixar um intervalo específico.",
        },
      ],
    },
  },
});
