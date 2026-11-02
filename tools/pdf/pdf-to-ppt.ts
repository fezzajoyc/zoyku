import { PdfOfficeEngine } from "../_engines/pdf-engine-office";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "pdf-to-ppt",
  category: "pdf",
  icon: "file",
  engine: { component: PdfOfficeEngine, props: { target: "pptx" } },
  related: ["word-to-pdf", "pdf-to-jpg", "pdf-to-word", "merge-pdf", "compress-pdf"],
  copy: {
    en: {
      name: "PDF to PowerPoint",
      tagline:
        "Convert each PDF page into a PowerPoint slide as a high-resolution image — layout-perfect slides generated on your own device.",
      intro: [
        "Need your PDF inside a slide deck? Each page is rendered at high resolution and placed on its own 16:9 slide, so the visual result matches the original exactly — fonts, colors and graphics stay put, even when the viewer has no fonts installed.",
        "Slides are images rather than editable text boxes: that is deliberate, because image slides never break across machines. Combine it with our PDF to Word tool when you also need the text.",
      ],
      steps: [
        "Drop the PDF you want in your deck.",
        "Click Convert to PowerPoint and let each page render.",
        "Download the .pptx and open it in PowerPoint, Keynote or Google Slides.",
      ],
      faqs: [
        {
          q: "Can I edit the text on the slides?",
          a: "No — each slide contains a faithful picture of the page, not text boxes. That guarantees identical appearance everywhere. Extract the text separately with PDF to Word if you need it editable.",
        },
        {
          q: "What slide size is used?",
          a: "Widescreen 16:9 (13.33 × 7.5 in), the PowerPoint default. Pages with other aspect ratios are centered and fitted without distortion.",
        },
        {
          q: "How large is the .pptx file?",
          a: "Roughly the size of all page images together — a 20-page PDF at high resolution can reach tens of megabytes. Compress the source PDF first if you need a lighter deck.",
        },
      ],
    },
    zh: {
      name: "PDF 转 PowerPoint",
      tagline: "把 PDF 每页转成高分辨率图片式幻灯片——版式完全一致,在你自己的设备上生成 .pptx。",
      intro: [
        "需要把 PDF 放进演示文稿?每页都会以高分辨率渲染,放进独立的 16:9 幻灯片,视觉效果与原文件完全一致——字体、颜色、图形原样呈现,对方电脑缺字体也不会乱。",
        "幻灯片是图片而不是可编辑文本框:这是有意为之,图片幻灯片在任何电脑上都不会跑版。如果还需要文字,可以配合“PDF 转 Word”使用。",
      ],
      steps: [
        "拖入要放进演示文稿的 PDF。",
        "点击“转换为 PowerPoint”,等待各页渲染完成。",
        "下载 .pptx,用 PowerPoint、Keynote 或 Google Slides 打开。",
      ],
      faqs: [
        {
          q: "幻灯片上的文字可以编辑吗?",
          a: "不可以——每张幻灯片是页面的忠实图片,不是文本框。这保证了在任何设备上显示一致。需要可编辑文字时,可另外使用“PDF 转 Word”。",
        },
        {
          q: "幻灯片是什么尺寸?",
          a: "宽屏 16:9(13.33 × 7.5 英寸),即 PowerPoint 默认尺寸。比例不同的页面会居中缩放,不会变形。",
        },
        {
          q: "生成的 .pptx 会很大吗?",
          a: "大约等于所有页面图片的体积之和——20 页的高分辨率 PDF 可能达到几十 MB。想要更小的文件,可以先用“压缩 PDF”处理原件。",
        },
      ],
    },
    ja: {
      name: "PDF を PowerPoint に変換",
      tagline: "PDF の各ページを高解像度画像のスライドに変換。レイアウトをそのままに、.pptx を自分の端末上で生成します。",
      intro: [
        "PDF をスライド資料に入れたいときに。各ページは高解像度でレンダリングされ、16:9 のスライドに 1 枚ずつ配置されます。フォント・色・グラフィックはそのまま、フォントが入っていない端末でも表示は崩れません。",
        "スライドはテキストボックスではなく画像です。これは意図的な設計で、画像スライドはどの環境でも崩れません。編集可能なテキストが必要なときは「PDF を Word に」と併用してください。",
      ],
      steps: [
        "資料に入れたい PDF をドロップします。",
        "「PowerPoint に変換」をクリックし、各ページの描画を待ちます。",
        ".pptx をダウンロードし、PowerPoint・Keynote・Google スライドで開きます。",
      ],
      faqs: [
        {
          q: "スライドの文字を編集できますか?",
          a: "できません。各スライドはページの忠実な画像であり、テキストボックスではありません。だからこそどこでも同じ見た目になります。編集用のテキストは「PDF を Word に」で別途抽出できます。",
        },
        {
          q: "スライドのサイズは?",
          a: "ワイド画面 16:9(13.33 × 7.5 インチ)、PowerPoint の既定サイズです。アスペクト比が違うページは、歪みなしで中央に収めて配置します。",
        },
        {
          q: ".pptx のファイルサイズはどのくらい?",
          a: "各ページ画像の合計が目安です。高解像度の 20 ページ PDF では数十 MB になることもあります。軽くしたい場合は元 PDF を先に圧縮してください。",
        },
      ],
    },
    es: {
      name: "PDF a PowerPoint",
      tagline:
        "Convierte cada página del PDF en una diapositiva de PowerPoint como imagen de alta resolución: diapositivas fieles generadas en tu dispositivo.",
      intro: [
        "¿Necesitas tu PDF dentro de una presentación? Cada página se dibuja en alta resolución y se coloca en su propia diapositiva 16:9, así que el resultado visual coincide exactamente con el original: las fuentes, los colores y los gráficos no se mueven, aunque al que lo abra le falten fuentes.",
        "Las diapositivas son imágenes, no cuadros de texto editables: es a propósito, porque las diapositivas de imagen nunca se rompen entre equipos. Combínalo con PDF a Word cuando también necesites el texto.",
      ],
      steps: [
        "Suelta el PDF que quieres en tu presentación.",
        "Pulsa Convertir a PowerPoint y deja que se dibuje cada página.",
        "Descarga el .pptx y ábrelo en PowerPoint, Keynote o Google Slides.",
      ],
      faqs: [
        {
          q: "¿Puedo editar el texto de las diapositivas?",
          a: "No: cada diapositiva contiene una imagen fiel de la página, no cuadros de texto. Eso garantiza idéntica apariencia en todas partes. Extrae el texto con PDF a Word si lo necesitas editable.",
        },
        {
          q: "¿Qué tamaño de diapositiva se usa?",
          a: "Panorámica 16:9 (13,33 × 7,5 pulgadas), la opción predeterminada de PowerPoint. Las páginas con otra proporción se centran y ajustan sin deformarse.",
        },
        {
          q: "¿Cuánto pesa el .pptx?",
          a: "Aproximadamente la suma de las imágenes de página: un PDF de 20 páginas en alta resolución puede alcanzar decenas de megabytes. Comprime el PDF de origen primero si quieres algo más ligero.",
        },
      ],
    },
    pt: {
      name: "PDF para PowerPoint",
      tagline:
        "Converta cada página do PDF em um slide do PowerPoint como imagem de alta resolução — slides fiéis gerados no seu próprio dispositivo.",
      intro: [
        "Precisa do seu PDF dentro de uma apresentação? Cada página é renderizada em alta resolução e colocada no seu próprio slide 16:9, então o resultado visual é idêntico ao original — fontes, cores e gráficos ficam no lugar, mesmo sem as fontes instaladas em quem abrir.",
        "Os slides são imagens, não caixas de texto editáveis: é de propósito, porque slides em imagem nunca quebram entre máquinas. Combine com PDF para Word quando também precisar do texto.",
      ],
      steps: [
        "Solte o PDF que quer na sua apresentação.",
        "Clique em Converter para PowerPoint e aguarde a renderização de cada página.",
        "Baixe o .pptx e abra no PowerPoint, Keynote ou Google Slides.",
      ],
      faqs: [
        {
          q: "Dá para editar o texto dos slides?",
          a: "Não — cada slide contém uma imagem fiel da página, não caixas de texto. Isso garante aparência idêntica em todo lugar. Extraia o texto com PDF para Word se precisar dele editável.",
        },
        {
          q: "Qual o tamanho dos slides?",
          a: "Widescreen 16:9 (13,33 × 7,5 pol), o padrão do PowerPoint. Páginas com outras proporções são centralizadas e ajustadas sem distorção.",
        },
        {
          q: "Quanto pesa o arquivo .pptx?",
          a: "Mais ou menos a soma das imagens das páginas — um PDF de 20 páginas em alta resolução pode chegar a dezenas de megabytes. Comprima o PDF de origem antes se quiser algo mais leve.",
        },
      ],
    },
  },
});
