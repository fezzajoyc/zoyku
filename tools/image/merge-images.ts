import { ImageMergeEngine } from "../_engines/image-engine-merge";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "merge-images",
  category: "image",
  icon: "layers",
  engine: { component: ImageMergeEngine },
  related: ["image-compressor", "crop-image", "jpg-to-pdf", "image-resizer", "grayscale-image"],
  copy: {
    en: {
      name: "Merge Images",
      tagline: "Combine 2–9 images into one — side by side, stacked or as a grid, with gap and background control.",
      intro: [
        "Build before/after shots, comparison strips and sprite sheets: drop 2 to 9 images, pick a layout, set the gap and background color, and the merged image is composed on your device at full resolution.",
        "Images are scaled to a common height (side by side), width (stacked) or cell (grid), so nothing gets cropped or stretched.",
      ],
      steps: [
        "Drop 2–9 images in the order you want them merged.",
        "Pick a layout and tune the gap and background color.",
        "Click Merge images and download the result.",
      ],
      faqs: [
        {
          q: "What resolution is the output?",
          a: "Full resolution: the canvas is sized from the (scaled) input dimensions, so a merge of 3 × 2000px photos is roughly 6000px wide.",
        },
        {
          q: "Does the order matter?",
          a: "Yes — images are placed in the list order, left to right, top to bottom. Remove and re-add to change it.",
        },
      ],
    },
    zh: {
      name: "图片拼接",
      tagline: "把 2–9 张图片合成一张:横向并排、纵向堆叠或网格,间距与背景色可调,本地全分辨率输出。",
      intro: [
        "做前后对比图、长图合集、雪碧图:拖入 2–9 张图片,选一种排法,调好间距和背景色,合成图在你的设备上按原始分辨率生成。",
        "拼接时会统一等高(横向)、等宽(纵向)或等格(网格),不会裁切也不会拉伸变形。",
      ],
      steps: [
        "按想要的顺序拖入 2–9 张图片。",
        "选择排列方式,调整间距和背景色。",
        "点击拼接,下载结果。",
      ],
      faqs: [
        {
          q: "输出的分辨率是多少?",
          a: "全分辨率:画布按(缩放后的)输入尺寸计算,3 张 2000px 宽的照片横排约 6000px 宽。",
        },
        {
          q: "顺序有影响吗?",
          a: "有——按列表顺序从左到右、从上到下排列。想调整就先移除再重新添加。",
        },
      ],
    },
    ja: {
      name: "画像を結合",
      tagline: "2〜9 枚の画像を 1 枚に:横並び・縦積み・グリッドから選び、間隔と背景色も調整。すべてローカルでフル解像度。",
      intro: [
        "ビフォーアフター、比較ストリップ、スプライトシートを:2〜9 枚の画像をドロップし、レイアウトを選び、間隔と背景色を設定。合成画像は端末内でフル解像度のまま生成されます。",
        "画像は等高(横並び)・等幅(縦積み)・等セル(グリッド)にスケールされるので、切り取られたり引き伸ばされたりしません。",
      ],
      steps: [
        "好きな順に 2〜9 枚の画像をドロップします。",
        "レイアウトを選び、間隔と背景色を調整します。",
        "「画像を結合」を押してダウンロードします。",
      ],
      faqs: [
        {
          q: "出力の解像度は?",
          a: "フル解像度です。キャンバスは(スケール後の)入力サイズから計算され、2000px 幅の写真 3 枚の横並びは約 6000px 幅になります。",
        },
        {
          q: "順番は意味がありますか?",
          a: "あります。リスト順に左から右、上から下へ配置されます。変更したい場合は削除して再度追加してください。",
        },
      ],
    },
    es: {
      name: "Combinar imágenes",
      tagline: "Une de 2 a 9 imágenes en una — en horizontal, apiladas o en cuadrícula, con separación y fondo ajustables.",
      intro: [
        "Crea comparativas antes/después, tiras y sprites: suelta de 2 a 9 imágenes, elige la disposición, ajusta separación y color de fondo, y la imagen combinada se compone en tu dispositivo a resolución completa.",
        "Las imágenes se escalan a una altura común (horizontal), anchura común (apiladas) o celda común (cuadrícula): nada se recorta ni se deforma.",
      ],
      steps: [
        "Suelta de 2 a 9 imágenes en el orden que quieras.",
        "Elige la disposición y ajusta separación y fondo.",
        "Pulsa Combinar y descarga el resultado.",
      ],
      faqs: [
        {
          q: "¿Qué resolución tiene la salida?",
          a: "Resolución completa: el lienzo se dimensiona con las entradas escaladas; combinar 3 fotos de 2000px en horizontal da unos 6000px de ancho.",
        },
        {
          q: "¿Importa el orden?",
          a: "Sí: se colocan en el orden de la lista, de izquierda a derecha y de arriba abajo. Quita y vuelve a añadir para cambiarlo.",
        },
      ],
    },
    pt: {
      name: "Combinar imagens",
      tagline: "Junte de 2 a 9 imagens em uma — lado a lado, empilhadas ou em grade, com espaço e fundo ajustáveis.",
      intro: [
        "Monte comparações antes/depois, tiras e sprites: solte de 2 a 9 imagens, escolha a disposição, ajuste o espaço e a cor de fundo, e a imagem combinada é composta no seu dispositivo em resolução total.",
        "As imagens são escaladas para uma altura comum (lado a lado), largura comum (empilhadas) ou célula comum (grade) — nada é cortado nem esticado.",
      ],
      steps: [
        "Solte de 2 a 9 imagens na ordem desejada.",
        "Escolha a disposição e ajuste espaço e fundo.",
        "Clique em Combinar e baixe o resultado.",
      ],
      faqs: [
        {
          q: "Qual a resolução da saída?",
          a: "Resolução total: o canvas é dimensionado pelas entradas escaladas; combinar 3 fotos de 2000px lado a lado dá cerca de 6000px de largura.",
        },
        {
          q: "A ordem importa?",
          a: "Sim — as imagens entram na ordem da lista, da esquerda para a direita e de cima para baixo. Remova e reinsira para mudar.",
        },
      ],
    },
  },
});
