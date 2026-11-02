import { ImageCanvasEngine } from "../_engines/image-engine-canvas";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "rotate-image",
  category: "image",
  icon: "rotate",
  engine: {
    component: ImageCanvasEngine,
    props: { op: "rotate", accept: "image/*", suffix: "-rotated" },
  },
  related: ["crop-image", "image-resizer", "convert-image", "image-compressor"],
  copy: {
    en: {
      name: "Rotate Image",
      tagline:
        "Rotate images by 90°, 180° or 270° and flip them horizontally or vertically — batch-friendly, instant and completely in your browser.",
      intro: [
        "Turn photos the right way up, straighten scans that came in sideways, or mirror an image for a flipped layout. Each button applies to every file you have loaded at once, and a small readout always shows the current rotation and mirror state so you never lose track.",
        "Rotations and flips are baked into the actual pixels, which means the saved file looks identical everywhere — no player or viewer will ever “correct” it back. The output keeps each image's original format.",
      ],
      steps: [
        "Drop one or more images into the box.",
        "Click the rotation and flip buttons until the preview state reads the way you want.",
        "Download the corrected images individually or all at once.",
      ],
      faqs: [
        {
          q: "Is rotating a JPEG lossless?",
          a: "Rotating in this tool is applied by re-encoding the pixels, so the file is regenerated (at 92% JPEG quality by default for JPG). In practice the difference is invisible, but it is not bit-for-bit identical — tools that claim “lossless rotation” only work on sizes that are multiples of the JPEG block grid.",
        },
        {
          q: "Why does a photo look rotated in one app but correct in another?",
          a: "Some images store only an orientation flag in their EXIF data instead of truly rotated pixels, and not every app applies that flag. This tool writes the rotation directly into the pixels and drops the flag, so the result displays the same everywhere.",
        },
        {
          q: "Can I flip a photo horizontally like a mirror?",
          a: "Yes — use the “Flip horizontal” button to mirror left–right, or “Flip vertical” for top–bottom. They can be combined with any rotation.",
        },
      ],
    },
    zh: {
      name: "图片旋转",
      tagline: "按 90°、180°、270° 旋转图片,支持水平 / 垂直镜像,批量一键生效——纯浏览器本地处理。",
      intro: [
        "把拍歪的照片转正,把横着的扫描件立起来,或者做镜像翻转排版。每个按钮都会一次性作用于已加载的全部文件,当前旋转与镜像状态会实时显示,不会转晕。",
        "旋转和翻转直接写入像素,保存后的文件在任何设备、任何软件里显示都一致,不会被播放器“自动纠正”回去。输出保持每张图的原格式。",
      ],
      steps: [
        "把一张或多张图片拖入方框。",
        "点击旋转和翻转按钮,直到状态指示符合预期。",
        "逐张或一键下载修正后的图片。",
      ],
      faqs: [
        {
          q: "旋转 JPEG 是无损的吗?",
          a: "本工具通过重新编码像素来旋转,JPG 会按默认 92% 的画质重新生成。实际观感差异不可见,但并非逐字节一致——所谓“无损旋转”只对恰好是 JPEG 块网格整数倍的尺寸才成立。",
        },
        {
          q: "为什么同一张照片在一个应用里是横的,另一个里是正的?",
          a: "有些图片只在 EXIF 里存了一个方向标记,像素本身没转,而并非所有软件都会读取这个标记。本工具把旋转直接写入像素并去掉该标记,结果在任何地方显示都一致。",
        },
        {
          q: "可以把照片水平镜像吗?",
          a: "可以。“水平翻转”按钮实现左右镜像,“垂直翻转”实现上下镜像,两者可与任意旋转叠加。",
        },
      ],
    },
    ja: {
      name: "画像回転",
      tagline:
        "画像を 90°・180°・270° で回転し、左右・上下反転にも対応。一括で即時適用、処理はすべてブラウザ内で完結します。",
      intro: [
        "傾いた写真をまっすぐに、横向きのスキャンを立てに、レイアウト用に左右反転——ボタン 1 つで読み込んだ全ファイルにまとめて適用でき、現在の回転・反転状態が常に表示されるので迷いません。",
        "回転と反転は実際のピクセルに書き込まれるため、保存したファイルはどの環境でも同じ見た目になります。ビューアが勝手に「修正」して戻すこともありません。出力は各画像の元フォーマットを維持します。",
      ],
      steps: [
        "画像を 1 枚以上ボックスにドロップします。",
        "回転・反転ボタンを押して、状態表示が意図どおりになるまで調整します。",
        "修正後の画像を 1 枚ずつ、またはまとめてダウンロードします。",
      ],
      faqs: [
        {
          q: "JPEG の回転はロスレスですか?",
          a: "このツールはピクセルを再エンコードして回転するため、JPG は既定で品質 92% で再生成されます。見た目の差は実質わかりませんが、ビット単位で同一ではありません。「ロスレス回転」を謳うツールは JPEG ブロック格子の整数倍サイズでしか機能しない仕組みです。",
        },
        {
          q: "あるアプリでは横向き、別のアプリでは正しいのはなぜ?",
          a: "画像によっては EXIF の方向フラグだけを持つものがあり、すべてのアプリがそのフラグを解釈するとは限りません。このツールは回転をピクセルに直接書き込みフラグを破棄するため、どこで表示しても同じになります。",
        },
        {
          q: "写真を鏡のように左右反転できますか?",
          a: "できます。「左右反転」で鏡像に、「上下反転」で上下さかさまに。どちらも任意の回転と組み合わせられます。",
        },
      ],
    },
    es: {
      name: "Rotar imágenes",
      tagline:
        "Gira imágenes 90°, 180° o 270° y voltealas horizontal o verticalmente — por lotes, al instante y por completo en tu navegador.",
      intro: [
        "Endereza fotos torcidas, pone de pie escaneos en horizontal o crea un espejo para diseños invertidos. Cada botón se aplica a todos los archivos cargados a la vez, y un pequeño indicador muestra siempre la rotación y el espejo actuales para que no te pierdas.",
        "Las rotaciones y volteos se hornean en los píxeles reales: el archivo guardado se ve idéntico en cualquier lugar y ningún visor lo “corregirá” de nuevo. La salida conserva el formato original de cada imagen.",
      ],
      steps: [
        "Suelta una o varias imágenes en el recuadro.",
        "Pulsa los botones de rotación y volteo hasta que el indicador muestre lo que buscas.",
        "Descarga las imágenes corregidas una a una o todas a la vez.",
      ],
      faqs: [
        {
          q: "¿Rotar un JPEG es sin pérdida?",
          a: "Esta herramienta rota re-codificando los píxeles, así que el JPG se regenera (al 92% de calidad por defecto). En la práctica la diferencia es invisible, pero no es idéntico bit a bit: la “rotación sin pérdida” solo funciona con tamaños múltiplos de la cuadrícula de bloques JPEG.",
        },
        {
          q: "¿Por qué una foto se ve girada en una app y bien en otra?",
          a: "Algunas imágenes guardan solo una marca de orientación en el EXIF, con los píxeles sin girar, y no todas las apps aplican esa marca. Esta herramienta escribe la rotación en los píxeles y elimina la marca, así el resultado se ve igual en todas partes.",
        },
        {
          q: "¿Puedo voltear una foto como un espejo?",
          a: "Sí: usa “Voltear horizontal” para el espejo izquierda–derecha o “Voltear vertical” para arriba–abajo. Se pueden combinar con cualquier rotación.",
        },
      ],
    },
    pt: {
      name: "Girar imagens",
      tagline:
        "Gire imagens em 90°, 180° ou 270° e espelhe na horizontal ou vertical — em lote, na hora e totalmente no seu navegador.",
      intro: [
        "Endireite fotos tortas, coloque em pé digitalizações que saíram deitadas ou espelhe uma imagem para um layout invertido. Cada botão é aplicado a todos os arquivos carregados de uma vez, e um pequeno indicador mostra sempre a rotação e o espelhamento atuais.",
        "As rotações e espelhamentos são gravados nos pixels reais, então o arquivo salvo aparece idêntico em qualquer lugar — nenhum visualizador vai “corrigir” de volta. A saída mantém o formato original de cada imagem.",
      ],
      steps: [
        "Solte uma ou mais imagens na caixa.",
        "Clique nos botões de rotação e espelhamento até o indicador mostrar o que você quer.",
        "Baixe as imagens corrigidas individualmente ou todas de uma vez.",
      ],
      faqs: [
        {
          q: "Girar um JPEG é sem perdas?",
          a: "Esta ferramenta gira re-codificando os pixels, então o JPG é regenerado (a 92% de qualidade por padrão). Na prática a diferença é invisível, mas não é idêntica bit a bit — a “rotação sem perdas” só funciona em tamanhos múltiplos da grade de blocos do JPEG.",
        },
        {
          q: "Por que uma foto aparece deitada num app e certa em outro?",
          a: "Algumas imagens guardam apenas uma marca de orientação no EXIF, sem os pixels girados, e nem todo app aplica essa marca. Esta ferramenta grava a rotação nos pixels e descarta a marca, então o resultado aparece igual em qualquer lugar.",
        },
        {
          q: "Posso espelhar uma foto horizontalmente?",
          a: "Sim — use “Espelhar horizontal” para inverter esquerda–direita ou “Espelhar vertical” para cima–baixo. Podem ser combinados com qualquer rotação.",
        },
      ],
    },
  },
});
