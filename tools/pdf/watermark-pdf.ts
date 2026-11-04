import { PdfWatermarkEngine } from "../_engines/pdf-engine-watermark";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "watermark-pdf",
  category: "pdf",
  icon: "palette",
  engine: { component: PdfWatermarkEngine },
  related: ["sign-pdf", "merge-pdf", "compress-pdf", "split-pdf", "rotate-pdf", "delete-pdf-pages", "pdf-to-ppt", "ocr-pdf", "pdf-to-text", "rearrange-pdf-pages"],
  copy: {
    en: {
      name: "Watermark PDF",
      tagline:
        "Stamp text watermarks on every PDF page — centered or tiled, with full control of size, opacity, rotation and color, fully offline.",
      intro: [
        "Mark drafts as CONFIDENTIAL, DRAFT or FOR REVIEW before they leave your hands. Choose a single centered stamp or a tiled pattern across the whole page, tune the opacity so text stays readable underneath, and pick a color that suits the document.",
        "The watermark becomes real PDF text drawn on each page — no images, no server round-trip. Because it is processed with pdf-lib on your device, even sensitive contracts can be marked without uploading them.",
      ],
      steps: [
        "Drop the PDF you want to mark.",
        "Type the watermark text and adjust layout, size, opacity and color.",
        "Click Add watermark and download the stamped PDF.",
      ],
      faqs: [
        {
          q: "What opacity works best?",
          a: "Between 10% and 25% for most documents: visible at a glance but light enough to keep body text readable. Drafts meant to be hard to read can go up to 40–50%.",
        },
        {
          q: "Can I remove an existing watermark with this tool?",
          a: "No. This tool only adds watermarks. Removing one requires editing the page content streams, which is a different (and often legally questionable) operation.",
        },
        {
          q: "Which characters can the watermark use?",
          a: "The standard PDF fonts cover Latin text, punctuation and common symbols like ©. Other scripts (Chinese, Japanese, Arabic…) are replaced with ? — keep the watermark in Latin letters.",
        },
      ],
    },
    zh: {
      name: "PDF 水印",
      tagline: "给每一页 PDF 加上文字水印——居中或平铺,字号、透明度、角度、颜色全可控,完全离线运行。",
      intro: [
        "在文件出手之前打上 CONFIDENTIAL、DRAFT 或“内部资料”。可选居中单枚或整页平铺,调节透明度让正文依然可读,颜色也能随意搭配。",
        "水印以真实 PDF 文字的形式绘制在每页上——不是图片,也不经过服务器。处理由 pdf-lib 在本地完成,即使敏感合同也能在不上传的前提下加印。",
      ],
      steps: [
        "拖入要加水印的 PDF。",
        "输入水印文字,调整排版、字号、透明度和颜色。",
        "点击“添加水印”,下载加水印后的 PDF。",
      ],
      faqs: [
        {
          q: "透明度设多少合适?",
          a: "大多数文档建议 10%–25%:一眼可见,又不影响正文阅读。如果想让草稿更难阅读,可以提高到 40%–50%。",
        },
        {
          q: "能用这个工具去掉已有水印吗?",
          a: "不能。本工具只负责添加水印。移除水印需要编辑页面内容流,是另一种操作(而且往往涉及法律问题)。",
        },
        {
          q: "水印文字支持哪些字符?",
          a: "PDF 标准字体覆盖拉丁字母、标点和 © 等常用符号。中文、日文、阿拉伯文等其他文字会被替换为 ? ——水印请使用拉丁字符。",
        },
      ],
    },
    ja: {
      name: "PDF ウォーターマーク",
      tagline: "PDF の全ページに文字ウォーターマークを追加。中央配置もタイル状も可能で、サイズ・不透明度・角度・色を細かく制御、完全オフライン。",
      intro: [
        "配布前に CONFIDENTIAL、DRAFT、 REVIEW などの印を付けましょう。ページ中央に 1 つ、または全体にタイル状に配置でき、不透明度を調整すれば本文の可読性を保てます。色も文書に合わせて選べます。",
        "ウォーターマークは各ページに描かれた本物の PDF テキストであり、画像でもサーバー経由でもありません。pdf-lib による端末内処理のため、機密性の高い契約書もアップロードせずに加工できます。",
      ],
      steps: [
        "マークを付けたい PDF をドロップします。",
        "ウォーターマークの文字とレイアウト・サイズ・不透明度・色を調整します。",
        "「ウォーターマークを追加」をクリックし、PDF をダウンロードします。",
      ],
      faqs: [
        {
          q: "不透明度はどのくらいが適切ですか?",
          a: "ほとんどの文書は 10〜25% が最適です。ひと目で分かりつつ本文を読みやすく保てます。読みにくくしたいドラフトなら 40〜50% まで上げられます。",
        },
        {
          q: "既存のウォーターマークを削除できますか?",
          a: "できません。このツールは追加専用です。削除にはページのコンテンツストリーム編集が必要で、別の(法的に問題になりやすい)操作です。",
        },
        {
          q: "ウォーターマークに使える文字は?",
          a: "PDF 標準フォントはラテン文字・句読点・© などの記号に対応します。中国語・日本語・アラビア語などは ? に置き換えられるため、ラテン文字でご入力ください。",
        },
      ],
    },
    es: {
      name: "Marca de agua PDF",
      tagline:
        "Estampa marcas de agua de texto en todas las páginas del PDF: centrada o en mosaico, con control de tamaño, opacidad, ángulo y color, sin conexión.",
      intro: [
        "Marca borradores como CONFIDENCIAL, BORRADOR o PARA REVISIÓN antes de que salgan de tus manos. Elige un sello centrado o un mosaico por toda la página, ajusta la opacidad para que el texto siga legible y escoge el color adecuado.",
        "La marca se convierte en texto PDF real dibujado en cada página: sin imágenes ni viajes al servidor. Como se procesa con pdf-lib en tu dispositivo, hasta contratos confidenciales pueden marcarse sin subirlos.",
      ],
      steps: [
        "Suelta el PDF que quieres marcar.",
        "Escribe el texto y ajusta disposición, tamaño, opacidad y color.",
        "Pulsa Añadir marca de agua y descarga el PDF sellado.",
      ],
      faqs: [
        {
          q: "¿Qué opacidad conviene usar?",
          a: "Entre el 10% y el 25% para la mayoría de documentos: visible de un vistazo pero lo bastante ligera para leer el texto. Los borradores que deban ser difíciles de leer pueden llegar al 40–50%.",
        },
        {
          q: "¿Puedo quitar una marca de agua existente?",
          a: "No. Esta herramienta solo añade marcas. Quitar una exige editar los flujos de contenido de la página, una operación distinta (y a menudo legalmente discutible).",
        },
        {
          q: "¿Qué caracteres admite la marca de agua?",
          a: "Las fuentes PDF estándar cubren texto latino, puntuación y símbolos comunes como ©. Otros alfabetos (chino, japonés, árabe…) se sustituyen por ? — usa letras latinas en la marca.",
        },
      ],
    },
    pt: {
      name: "Marca d'água PDF",
      tagline:
        "Aplique marcas d'água de texto em todas as páginas do PDF — centralizada ou em mosaico, com controle de tamanho, opacidade, rotação e cor, offline.",
      intro: [
        "Marque rascunhos como CONFIDENCIAL, RASCUNHO ou PARA REVISÃO antes de circularem. Escolha um selo centralizado ou um mosaico pela página toda, ajuste a opacidade para o texto continuar legível e escolha a cor ideal.",
        "A marca vira texto PDF real desenhado em cada página — sem imagens e sem passagem por servidor. Como é processado com pdf-lib no seu dispositivo, até contratos confidenciais podem ser marcados sem upload.",
      ],
      steps: [
        "Solte o PDF que quer marcar.",
        "Digite o texto e ajuste layout, tamanho, opacidade e cor.",
        "Clique em Adicionar marca d'água e baixe o PDF carimbado.",
      ],
      faqs: [
        {
          q: "Qual opacidade funciona melhor?",
          a: "Entre 10% e 25% na maioria dos documentos: visível de relance, mas leve o bastante para o texto continuar legível. Rascunhos que devem ficar difíceis de ler podem chegar a 40–50%.",
        },
        {
          q: "Dá para remover uma marca d'água existente?",
          a: "Não. Esta ferramenta apenas adiciona marcas. Remover exige editar os fluxos de conteúdo da página, uma operação diferente (e frequentemente legalmente questionável).",
        },
        {
          q: "Quais caracteres a marca d'água aceita?",
          a: "As fontes PDF padrão cobrem texto latino, pontuação e símbolos comuns como ©. Outros alfabetos (chinês, japonês, árabe…) viram ? — use letras latinas na marca.",
        },
      ],
    },
  },
});
