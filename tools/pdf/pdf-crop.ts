import { PdfCropEngine } from "../_engines/pdf-engine-crop";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "pdf-crop",
  category: "pdf",
  icon: "crop",
  engine: { component: PdfCropEngine },
  related: ["rotate-pdf", "split-pdf", "merge-pdf", "compress-pdf", "delete-pdf-pages", "page-numbers-pdf", "pdf-to-jpg", "watermark-pdf"],
  copy: {
    en: {
      name: "Crop PDF",
      tagline:
        "Crop PDF pages by dragging a rectangle on a live preview — trim margins or scan borders for all pages or a custom page list, entirely in your browser.",
      intro: [
        "Scanners add wide borders, slides come with black frames, and presentations carry more whitespace than the screen allows. Drag a rectangle on the rendered first page, or fine-tune the left, top, width and height percentages with number inputs, and the choice is applied to every page or just the ones you list, such as “1-3, 7”.",
        "The crop is written as the PDF crop box with pdf-lib: viewers and printers then show only the chosen region while the original content stays in the file, so nothing is destroyed and the trim can be undone by resetting the box. No upload, no rasterization — text stays selectable and quality is untouched.",
      ],
      steps: [
        "Drop the PDF and review the page 1 preview.",
        "Drag a rectangle over the area to keep, or type exact percentages below the preview.",
        "Choose all pages or a custom list, then click Crop PDF and download the result.",
      ],
      faqs: [
        {
          q: "Is the crop destructive?",
          a: "No. The crop box only changes which region is displayed and printed; the underlying content stays in the file. A reader that resets the crop box to the media box shows the full original page again.",
        },
        {
          q: "Why does the preview show page 1 only?",
          a: "The rectangle is defined as percentages of the page, so it scales to every target page even when sizes differ. Page 1 is a live rendering via pdf.js, and the four number inputs give exact control if dragging is not precise enough.",
        },
        {
          q: "What coordinate system does the crop use?",
          a: "You work in screen space (percentages from the top-left, like the canvas preview), and the tool converts to the PDF coordinate space where the origin is bottom-left — the flip is handled automatically.",
        },
      ],
    },
    zh: {
      name: "裁剪 PDF",
      tagline: "在实时预览上拖出矩形裁剪 PDF 页面——去掉页边距或扫描黑边,可应用到所有页或指定页码,全程在浏览器完成。",
      intro: [
        "扫描件带大片白边,胶片扫描有黑框,演示文稿的留白常常超出屏幕需要。在渲染好的第一页上拖出矩形,或用数字输入框精确设置左、上、宽、高百分比,即可应用到每一页,也可以只指定部分页面,如“1-3, 7”。",
        "裁剪以 PDF 裁剪框(crop box)方式通过 pdf-lib 写入:阅读器和打印机只显示所选区域,原始内容仍保留在文件中,不破坏任何数据,重置裁剪框即可还原。无需上传、不栅格化——文字仍可选中,画质不受影响。",
      ],
      steps: [
        "拖入 PDF,查看第 1 页预览。",
        "在预览上拖出要保留的区域,或在预览下方输入精确的百分比。",
        "选择所有页或自定义页码,点击“裁剪 PDF”并下载结果。",
      ],
      faqs: [
        {
          q: "裁剪会破坏内容吗?",
          a: "不会。裁剪框只改变显示和打印的区域;底层内容仍保留在文件里。把裁剪框重置为媒体框,就能重新看到完整的原始页面。",
        },
        {
          q: "为什么预览只有第 1 页?",
          a: "裁剪矩形按页面百分比定义,会自动缩放适配每个目标页,即使各页尺寸不同也没问题。第 1 页由 pdf.js 实时渲染;拖拽不够精确时,四个数字输入框可以精确控制。",
        },
        {
          q: "裁剪用的是什么坐标系?",
          a: "你操作的是屏幕坐标(从左上角起算的百分比,与 canvas 预览一致),工具会自动换算到原点在左下角的 PDF 坐标系——翻转逻辑已内置。",
        },
      ],
    },
    ja: {
      name: "PDF 切り抜き",
      tagline: "プレビュー上でドラッグして PDF のページを切り抜き — 余白やスキャンの黒枠を全ページまたは指定ページだけトリミング、処理はすべてブラウザ内です。",
      intro: [
        "スキャンには大きな余白が付き、スライドには黒枠が残り、資料には画面より多い余白が含まれがちです。レンダリングされた 1 ページ目で矩形をドラッグするか、左・上・幅・高さのパーセントを数値入力で微調整すると、全ページまたは「1-3, 7」のような指定ページに適用できます。",
        "切り抜きは pdf-lib で PDF のクロップボックスとして書き込まれます。ビューアやプリンターは選択領域だけを表示しますが、元の内容はファイルに残るため、データは失われず、ボックスをリセットすれば元に戻せます。アップロードもラスター化も不要で、テキストは選択可能、品質もそのままです。",
      ],
      steps: [
        "PDF をドロップし、1 ページ目のプレビューを確認します。",
        "残したい範囲をドラッグするか、プレビュー下の数値で正確なパーセントを入力します。",
        "全ページか指定ページを選び、「PDF を切り抜き」をクリックしてダウンロードします。",
      ],
      faqs: [
        {
          q: "切り抜きは元のデータを壊しますか?",
          a: "いいえ。クロップボックスは表示・印刷の範囲を変えるだけで、内容はファイルに残ります。ビューアでクロップボックスをメディアボックスに戻すと、元のページ全体が再び表示されます。",
        },
        {
          q: "プレビューが 1 ページ目だけなのはなぜですか?",
          a: "矩形はページに対するパーセントで定義されるため、ページごとにサイズが違っても自動でスケールします。1 ページ目は pdf.js でリアルタイム描画されており、ドラッグで精度が足りない場合は 4 つの数値入力で正確に指定できます。",
        },
        {
          q: "切り抜きの座標系はどうなっていますか?",
          a: "操作は画面座標(左上起点のパーセント、canvas プレビューと同じ)で行い、原点が左下の PDF 座標系への変換はツールが自動で処理します。",
        },
      ],
    },
    es: {
      name: "Recortar PDF",
      tagline:
        "Recorta páginas de un PDF arrastrando un rectángulo sobre una vista previa en vivo — recorta márgenes o bordes de escaneo en todas las páginas o en una lista personalizada, todo en tu navegador.",
      intro: [
        "Los escáneres añaden bordes anchos, las diapositivas traen marcos negros y las presentaciones llevan más espacio en blanco del que la pantalla necesita. Arrastra un rectángulo sobre la primera página renderizada, o ajusta los porcentajes de izquierda, arriba, ancho y alto con campos numéricos, y aplícalo a todas las páginas o solo a las que enumeres, como “1-3, 7”.",
        "El recorte se escribe como crop box del PDF con pdf-lib: los visores y las impresoras muestran solo la zona elegida mientras el contenido original queda en el archivo, así que no se destruye nada y el recorte se deshace restableciendo el cuadro. Sin subidas ni rasterización: el texto sigue siendo seleccionable y la calidad no cambia.",
      ],
      steps: [
        "Suelta el PDF y revisa la vista previa de la página 1.",
        "Arrastra un rectángulo sobre la zona a conservar, o escribe porcentajes exactos bajo la vista previa.",
        "Elige todas las páginas o una lista personalizada, pulsa Recortar PDF y descarga el resultado.",
      ],
      faqs: [
        {
          q: "¿El recorte es destructivo?",
          a: "No. El crop box solo cambia qué zona se muestra e imprime; el contenido subyacente sigue en el archivo. Un lector que restablezca el crop box al media box vuelve a mostrar la página original completa.",
        },
        {
          q: "¿Por qué la vista previa muestra solo la página 1?",
          a: "El rectángulo se define en porcentajes de la página, así que escala a cada página objetivo aunque tengan tamaños distintos. La página 1 se renderiza en vivo con pdf.js, y los cuatro campos numéricos dan control exacto si arrastrar no es preciso.",
        },
        {
          q: "¿Qué sistema de coordenadas usa el recorte?",
          a: "Trabajas en coordenadas de pantalla (porcentajes desde la esquina superior izquierda, como la vista previa del canvas), y la herramienta convierte al espacio PDF, cuyo origen está abajo a la izquierda — el volteo es automático.",
        },
      ],
    },
    pt: {
      name: "Recortar PDF",
      tagline:
        "Recorte páginas de um PDF arrastando um retângulo sobre uma pré-visualização em tempo real — corte margens ou bordas de digitalização em todas as páginas ou numa lista personalizada, tudo no navegador.",
      intro: [
        "Digitalizadoras adicionam bordas largas, slides vêm com molduras pretas e apresentações carregam mais espaço em branco do que a tela precisa. Arraste um retângulo sobre a primeira página renderizada, ou ajuste os percentuais de esquerda, topo, largura e altura com campos numéricos, e aplique a todas as páginas ou apenas às que listar, como “1-3, 7”.",
        "O recorte é gravado como crop box do PDF com pdf-lib: visualizadores e impressoras mostram só a área escolhida enquanto o conteúdo original permanece no arquivo, então nada é destruído e o corte pode ser desfeito redefinindo o box. Sem upload, sem rasterização — o texto continua selecionável e a qualidade intacta.",
      ],
      steps: [
        "Solte o PDF e confira a pré-visualização da página 1.",
        "Arraste um retângulo sobre a área a manter, ou digite percentuais exatos abaixo da pré-visualização.",
        "Escolha todas as páginas ou uma lista personalizada, clique em Recortar PDF e baixe o resultado.",
      ],
      faqs: [
        {
          q: "O recorte é destrutivo?",
          a: "Não. O crop box muda apenas qual área é exibida e impressa; o conteúdo subjacente permanece no arquivo. Um leitor que redefinir o crop box para o media box mostra a página original completa de novo.",
        },
        {
          q: "Por que a pré-visualização mostra só a página 1?",
          a: "O retângulo é definido em percentuais da página, então escala para cada página-alvo mesmo com tamanhos diferentes. A página 1 é renderizada em tempo real com pdf.js, e os quatro campos numéricos dão controle exato se arrastar não for preciso.",
        },
        {
          q: "Que sistema de coordenadas o recorte usa?",
          a: "Você trabalha em coordenadas de tela (percentuais a partir do canto superior esquerdo, como a pré-visualização do canvas), e a ferramenta converte para o espaço PDF, cuja origem fica no canto inferior esquerdo — a inversão é automática.",
        },
      ],
    },
  },
});
