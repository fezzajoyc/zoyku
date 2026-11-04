import { PdfPagesEngine } from "../_engines/pdf-engine-pages";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "rearrange-pdf-pages",
  category: "pdf",
  icon: "shuffle",
  engine: { component: PdfPagesEngine, props: { op: "rearrange" } },
  related: ["split-pdf", "delete-pdf-pages", "rotate-pdf", "merge-pdf", "pdf-to-jpg", "pdf-to-ppt", "compress-pdf", "ocr-pdf", "pdf-to-text", "jpg-to-pdf"],
  copy: {
    en: {
      name: "Rearrange PDF Pages",
      tagline:
        "Reorder PDF pages visually with live thumbnails — move pages up and down, reverse everything, and export a fresh PDF locally.",
      intro: [
        "Scanned a document out of order? Each page shows up as a real thumbnail, so you can see exactly what you are moving. Shuffle with the arrow buttons, flip the whole document with Reverse, and reset to the original order at any time.",
        "The new sequence is written into a brand-new PDF on your device — pages are copied byte-for-byte, so quality, fonts and selectable text all survive the reshuffle.",
      ],
      steps: [
        "Drop the PDF and wait for the page thumbnails to appear.",
        "Move pages with ↑ / ↓, or use Reverse for the opposite order.",
        "Click Apply order & download to get the rearranged PDF.",
      ],
      faqs: [
        {
          q: "Why do very long PDFs show numbers instead of thumbnails for later pages?",
          a: "Thumbnails are pre-rendered for the first 60 pages to keep the browser responsive. Beyond that you still see page numbers and can reorder them exactly the same way.",
        },
        {
          q: "Can I move a page from position 40 to position 2?",
          a: "Yes, but it takes repeated clicks with arrow buttons. For large jumps it is often faster to reverse the document first, or to split it and merge the pieces in a new order.",
        },
        {
          q: "Does reordering affect quality?",
          a: "None at all. Pages are copied unchanged into the new document — only their sequence differs.",
        },
      ],
    },
    zh: {
      name: "PDF 页面重排",
      tagline: "用实时缩略图可视化调整 PDF 页序——上下移动、一键反序、随时恢复原序,在本地导出新文件。",
      intro: [
        "扫描顺序乱了?每一页都会显示真实缩略图,移动前看得一清二楚。用箭头按钮调序,用“反序”整体倒转,也可随时恢复原始顺序。",
        "新顺序会写入一个全新的 PDF,在本地生成——页面按原始字节复制,画质、字体、可选中文字在重排后全部保留。",
      ],
      steps: [
        "拖入 PDF,等待页面缩略图加载。",
        "用 ↑ / ↓ 移动页面,或用“反序”整体倒转。",
        "点击“应用新顺序并下载”,获得重排后的 PDF。",
      ],
      faqs: [
        {
          q: "为什么很长的 PDF 后面的页面只显示数字?",
          a: "为保证浏览器流畅,缩略图最多预渲染前 60 页。之后显示页码,排序操作方式完全相同。",
        },
        {
          q: "能把第 40 页移到第 2 页吗?",
          a: "可以,但需要多次点击箭头。跨度大时,先整体反序,或者拆分后按新顺序合并,往往更快。",
        },
        {
          q: "重排会影响画质吗?",
          a: "完全不会。页面按原样复制到新文档,只有先后顺序不同。",
        },
      ],
    },
    ja: {
      name: "PDF ページ並べ替え",
      tagline: "サムネイルを見ながら PDF のページ順を並べ替え。移動・反転・リセットが簡単で、新しい PDF をローカルで書き出します。",
      intro: [
        "スキャンの順番がバラバラ?各ページが実際のサムネイルで表示されるので、動かす対象をひと目で確認できます。矢印ボタンで入れ替え、「逆順」で全体を反転、いつでも元の順序にリセット可能です。",
        "新しい順序は端末上で真新しい PDF に書き込まれます。ページはバイト単位でコピーされるため、品質・フォント・選択可能なテキストはすべてそのまま保たれます。",
      ],
      steps: [
        "PDF をドロップし、サムネイルの表示を待ちます。",
        "↑ / ↓ でページを移動するか、「逆順」で順序を反転します。",
        "「順序を適用してダウンロード」をクリックして PDF を取得します。",
      ],
      faqs: [
        {
          q: "長い PDF で後半のページが数字だけ表示されるのはなぜ?",
          a: "ブラウザを軽く保つため、サムネイルは先頭 60 ページ分のみ生成します。それ以降はページ番号が表示されますが、同じ操作で並べ替えられます。",
        },
        {
          q: "40 ページ目を 2 ページ目に移せますか?",
          a: "可能ですが、矢印の反復クリックが必要です。大きな移動は、まず反転するか、分割してから新しい順に結合するほうが早いことが多いです。",
        },
        {
          q: "並べ替えると画質は変わりますか?",
          a: "まったく変わりません。ページは変更なしで新しい文書へコピーされ、順序だけが変わります。",
        },
      ],
    },
    es: {
      name: "Reordenar páginas PDF",
      tagline:
        "Reordena las páginas de un PDF con miniaturas en vivo: súbelas y bájalas, invierte todo el orden y exporta un PDF nuevo en local.",
      intro: [
        "¿Escaneaste un documento desordenado? Cada página aparece como una miniatura real, así que ves exactamente qué mueves. Cambia el orden con las flechas, dale la vuelta con Invertir y vuelve al orden original cuando quieras.",
        "La nueva secuencia se escribe en un PDF nuevo en tu dispositivo: las páginas se copian byte a byte, así que la calidad, las fuentes y el texto seleccionable sobreviven al cambio.",
      ],
      steps: [
        "Suelta el PDF y espera a que aparezcan las miniaturas.",
        "Mueve páginas con ↑ / ↓, o usa Invertir para el orden contrario.",
        "Pulsa Aplicar orden y descargar para obtener el PDF reordenado.",
      ],
      faqs: [
        {
          q: "¿Por qué los PDF muy largos muestran números en lugar de miniaturas al final?",
          a: "Las miniaturas se pregeneran solo para las primeras 60 páginas para mantener el navegador ágil. Después ves números de página y puedes reordenarlos igual.",
        },
        {
          q: "¿Puedo llevar una página de la posición 40 a la 2?",
          a: "Sí, aunque requiere varios clics con las flechas. Para saltos grandes suele ser más rápido invertir el documento primero, o dividirlo y combinar las partes en otro orden.",
        },
        {
          q: "¿Reordenar afecta a la calidad?",
          a: "Ninguna. Las páginas se copian sin cambios al nuevo documento; solo cambia su secuencia.",
        },
      ],
    },
    pt: {
      name: "Reordenar páginas de PDF",
      tagline:
        "Reordene as páginas de um PDF com miniaturas ao vivo — mova para cima e para baixo, inverta tudo e exporte um novo PDF localmente.",
      intro: [
        "Digitalizou um documento fora de ordem? Cada página aparece como uma miniatura real, então você vê exatamente o que está movendo. Troque com os botões de seta, inverta tudo com Inverter e volte à ordem original quando quiser.",
        "A nova sequência é gravada em um PDF novo no seu dispositivo — as páginas são copiadas byte a byte, então qualidade, fontes e texto selecionável sobrevivem à reorganização.",
      ],
      steps: [
        "Solte o PDF e aguarde as miniaturas aparecerem.",
        "Mova páginas com ↑ / ↓, ou use Inverter para a ordem oposta.",
        "Clique em Aplicar ordem e baixar para receber o PDF reordenado.",
      ],
      faqs: [
        {
          q: "Por que PDFs muito longos mostram números em vez de miniaturas nas páginas finais?",
          a: "As miniaturas são pré-renderizadas só para as primeiras 60 páginas para manter o navegador leve. Depois disso você vê números e pode reordenar exatamente da mesma forma.",
        },
        {
          q: "Posso levar uma página da posição 40 para a 2?",
          a: "Sim, mas exige vários cliques nas setas. Para saltos grandes costuma ser mais rápido inverter o documento primeiro, ou dividir e mesclar as partes em outra ordem.",
        },
        {
          q: "Reordenar afeta a qualidade?",
          a: "Nenhuma. As páginas são copiadas sem alteração para o novo documento — apenas a sequência muda.",
        },
      ],
    },
  },
});
