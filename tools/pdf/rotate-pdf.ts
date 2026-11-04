import { PdfPagesEngine } from "../_engines/pdf-engine-pages";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "rotate-pdf",
  category: "pdf",
  icon: "rotate",
  engine: { component: PdfPagesEngine, props: { op: "rotate" } },
  related: ["merge-pdf", "split-pdf", "delete-pdf-pages", "rearrange-pdf-pages", "compress-pdf", "pdf-to-ppt", "ocr-pdf", "pdf-to-text", "jpg-to-pdf", "page-numbers-pdf"],
  copy: {
    en: {
      name: "Rotate PDF",
      tagline:
        "Rotate PDF pages by 90, 180 or 270 degrees and save the change permanently — fix sideways scans in your browser, no upload.",
      intro: [
        "Scanned sideways or upside down? Rotate every page at once, or target just the pages that need fixing with a list like “1, 3-5”. The rotation is written into the PDF itself, so it opens right-side up in every reader.",
        "Many viewers only rotate pages temporarily — this tool changes the page /Rotate attribute with pdf-lib on your device, which is why the fix survives printing, sharing and re-uploading.",
        "Rotation is applied through each page's /Rotate attribute — one of the four standard values 0, 90, 180 or 270 defined by the PDF specification — rather than by re-rendering or moving content. That makes the operation completely lossless: file size barely changes, text remains selectable, and the change is recognized by every conforming PDF reader, viewer and printer.",
        "The distinction matters because many desktop viewers only rotate pages in their own display state. A page fixed here stays fixed when it is printed, attached to an email, or opened on a phone — the attribute travels inside the file itself. You can also mix orientations within one document, rotating only the pages you list."
      ],
      steps: [
        "Drop the PDF whose pages need rotating.",
        "Pick 90°, 180° or 270° and optionally limit the rotation to specific pages.",
        "Click Rotate pages and download the corrected PDF.",
      ],
      faqs: [
        {
          q: "Is the rotation permanent?",
          a: "Yes. The page rotation attribute is updated inside the file, so every PDF reader, printer and preview shows the corrected orientation — not just this browser tab.",
        },
        {
          q: "How do I rotate only some pages?",
          a: "Fill the pages field with a list such as “2, 5-7”. Leave it empty to rotate the whole document. Ranges follow the same syntax as the other page tools.",
        },
        {
          q: "Does rotating re-encode or compress my pages?",
          a: "No. Only the rotation flag changes; page content is untouched, so quality is identical and text remains selectable.",
        },
      ],
    },
    zh: {
      name: "旋转 PDF",
      tagline: "把 PDF 页面旋转 90°、180° 或 270° 并永久保存——在浏览器里修正横倒的扫描件,无需上传。",
      intro: [
        "扫描件横着或倒着?可以一次性旋转全部页面,也可以用“1, 3-5”这样的列表只转需要的页。旋转信息会写入 PDF 文件本身,任何阅读器打开都是正的。",
        "很多阅读器只是临时旋转显示;本工具通过 pdf-lib 在本地修改页面 /Rotate 属性,因此修正后的方向在打印、分享、再上传时都保持不变。",
      ],
      steps: [
        "拖入需要旋转的 PDF。",
        "选择 90°、180° 或 270°,也可只指定部分页码。",
        "点击“旋转页面”,下载修正后的 PDF。",
      ],
      faqs: [
        {
          q: "旋转是永久生效的吗?",
          a: "是的。旋转属性直接写入文件,所有阅读器、打印机和预览都会显示修正后的方向,而不是只在当前浏览器里。",
        },
        {
          q: "怎么只旋转部分页面?",
          a: "在页码框填入列表,如“2, 5-7”;留空则旋转整个文档。范围语法与其他页面工具一致。",
        },
        {
          q: "旋转会重新编码或压缩页面吗?",
          a: "不会。只修改旋转标志,页面内容不动,质量完全一致,文字仍可选中。",
        },
      ],
    },
    ja: {
      name: "PDF 回転",
      tagline: "PDF のページを 90°・180°・270° 回転して変更をファイルに保存。横向きスキャンをブラウザ内で修正でき、アップロード不要です。",
      intro: [
        "スキャンした文書が横向き・逆向き?全ページを一括で回転できるほか、「1, 3-5」のような指定で必要なページだけを修正できます。回転情報は PDF 自体に書き込まれるため、どのビューアでも正しい向きで開きます。",
        "多くのビューアの回転は一時的な表示変更にすぎません。このツールは pdf-lib でページの /Rotate 属性を端末上で書き換えるため、印刷・共有・再アップロード後も向きは保たれます。",
      ],
      steps: [
        "回転したい PDF をドロップします。",
        "90°・180°・270° から選び、必要なら対象ページを指定します。",
        "「ページを回転」をクリックし、修正済み PDF をダウンロードします。",
      ],
      faqs: [
        {
          q: "回転は恒久的に保存されますか?",
          a: "はい。ページの回転属性をファイル内で更新するため、すべての PDF リーダー・印刷・プレビューで修正後の向きが表示されます。",
        },
        {
          q: "特定のページだけ回転できますか?",
          a: "ページ欄に「2, 5-7」のようなリストを入力してください。空欄のままなら文書全体を回転します。範囲の書式は他のページツールと同じです。",
        },
        {
          q: "回転するとページが再エンコードされますか?",
          a: "されません。回転フラグだけが変わり、ページ内容は無傷です。品質は同一で、テキストも選択可能なままです。",
        },
      ],
    },
    es: {
      name: "Rotar PDF",
      tagline:
        "Gira las páginas de un PDF 90, 180 o 270 grados y guarda el cambio de forma permanente: endereza escaneos en tu navegador, sin subirlos.",
      intro: [
        "¿Un escaneo tumbado o boca abajo? Gira todas las páginas de una vez o apunta solo a las que lo necesitan con una lista como “1, 3-5”. La rotación se escribe dentro del propio PDF, así que se abre bien en cualquier lector.",
        "Muchos visores solo giran las páginas temporalmente: esta herramienta modifica el atributo /Rotate con pdf-lib en tu dispositivo, por eso la corrección sobrevive a imprimir, compartir y volver a subir el archivo.",
      ],
      steps: [
        "Suelta el PDF cuyas páginas hay que girar.",
        "Elige 90°, 180° o 270° y, si quieres, limita la rotación a páginas concretas.",
        "Pulsa Rotar páginas y descarga el PDF corregido.",
      ],
      faqs: [
        {
          q: "¿La rotación es permanente?",
          a: "Sí. El atributo de rotación se actualiza dentro del archivo, así que todos los lectores, impresoras y vistas previas muestran la orientación corregida, no solo esta pestaña.",
        },
        {
          q: "¿Cómo giro solo algunas páginas?",
          a: "Escribe en el campo de páginas una lista como “2, 5-7”. Déjalo vacío para girar todo el documento. Los rangos usan la misma sintaxis que las demás herramientas.",
        },
        {
          q: "¿Al girar se re-codifican las páginas?",
          a: "No. Solo cambia el indicador de rotación; el contenido de las páginas no se toca, la calidad es idéntica y el texto sigue siendo seleccionable.",
        },
      ],
    },
    pt: {
      name: "Rotacionar PDF",
      tagline:
        "Gire as páginas de um PDF em 90, 180 ou 270 graus e salve a mudança em definitivo — endireite digitalizações no navegador, sem upload.",
      intro: [
        "Digitalização de lado ou de cabeça para baixo? Rotacione todas as páginas de uma vez ou apenas as que precisam, com uma lista como “1, 3-5”. A rotação é gravada dentro do próprio PDF, então ele abre certo em qualquer leitor.",
        "Muitos visualizadores apenas giram a exibição temporariamente — esta ferramenta altera o atributo /Rotate com pdf-lib no seu dispositivo, e é por isso que a correção sobrevive à impressão, ao compartilhamento e a novos envios.",
      ],
      steps: [
        "Solte o PDF com as páginas a girar.",
        "Escolha 90°, 180° ou 270° e, se quiser, limite a rotação a páginas específicas.",
        "Clique em Rotacionar páginas e baixe o PDF corrigido.",
      ],
      faqs: [
        {
          q: "A rotação é permanente?",
          a: "Sim. O atributo de rotação é atualizado dentro do arquivo, então todos os leitores, impressoras e pré-visualizações mostram a orientação corrigida — não apenas esta aba do navegador.",
        },
        {
          q: "Como girar somente algumas páginas?",
          a: "Preencha o campo de páginas com uma lista como “2, 5-7”. Deixe vazio para girar o documento inteiro. Os intervalos usam a mesma sintaxe das outras ferramentas.",
        },
        {
          q: "Rotacionar recodifica ou comprime as páginas?",
          a: "Não. Apenas o sinalizador de rotação muda; o conteúdo da página permanece intacto, com qualidade idêntica e texto continuando selecionável.",
        },
      ],
    },
  },
});
