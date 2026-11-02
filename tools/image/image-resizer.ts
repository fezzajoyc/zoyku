import { ImageCanvasEngine } from "../_engines/image-engine-canvas";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "image-resizer",
  category: "image",
  icon: "ruler",
  engine: {
    component: ImageCanvasEngine,
    props: { op: "resize", accept: "image/*", suffix: "-resized" },
  },
  related: ["crop-image", "image-compressor", "convert-image", "rotate-image"],
  copy: {
    en: {
      name: "Image Resizer",
      tagline:
        "Resize images to exact pixels or a percentage with aspect-ratio lock, and process whole batches at once — nothing leaves your device.",
      intro: [
        "Type the exact width and height in pixels, or scale by a percentage (25%, 50%, 200%…). The aspect-ratio lock keeps proportions correct when you change one side, and unlocking lets you force any custom dimension — useful for platform avatar or banner sizes.",
        "Batch mode applies your settings to every file you drop in, so a folder of photos can be downsized for the web in one pass. Shrinking is done with high-quality smoothing, and the output keeps the original format.",
      ],
      steps: [
        "Drop one or more images into the box.",
        "Enter a width/height in pixels or a scale percentage; toggle the lock to keep or free the aspect ratio.",
        "Download the resized images individually or all together.",
      ],
      faqs: [
        {
          q: "Does enlarging an image reduce its quality?",
          a: "Yes. Enlargement has to invent pixels, which produces softness or blur — no tool can add real detail that was never captured. Shrinking is safe: it discards pixels with clean interpolation. For enlarging, keep expectations modest (up to ~150% usually looks fine).",
        },
        {
          q: "What does the aspect-ratio lock do?",
          a: "With the lock on, changing the width automatically recalculates the height (and vice versa) so the image never gets stretched or squashed. Turn it off only if you deliberately want a different shape — the picture will be distorted.",
        },
        {
          q: "Will resized PNG images keep their transparency?",
          a: "Yes. Resizing keeps the original format, so PNG transparency and WebP alpha survive untouched. Only converting to JPG would flatten transparency onto a white background.",
        },
      ],
    },
    zh: {
      name: "图片尺寸调整",
      tagline: "按精确像素或百分比缩放图片,宽高比锁定不变形,支持整批处理——全程本地完成,文件不上传。",
      intro: [
        "直接输入精确的像素宽高,或按百分比缩放(25%、50%、200%…)。锁定宽高比时改一边另一边自动换算,比例永不变形;解锁后可强制任意尺寸,适合各种平台的头像、横幅规格。",
        "批量模式会把当前设置套用到拖入的每一张图,一整文件夹照片一次过即可完成瘦身。缩小使用高质量平滑插值,输出保持原格式。",
      ],
      steps: [
        "把一张或多张图片拖入方框。",
        "输入像素宽高或缩放百分比;用锁形按钮切换是否保持宽高比。",
        "逐张或一键下载调整后的图片。",
      ],
      faqs: [
        {
          q: "放大图片会损失画质吗?",
          a: "会。放大需要凭空补充像素,结果必然偏软或模糊,任何工具都无法还原从未捕捉到的细节。缩小则安全得多。放大建议控制在 150% 以内,效果通常可以接受。",
        },
        {
          q: "宽高比锁定有什么用?",
          a: "锁定时,修改宽度会自动换算高度(反之亦然),图片不会被拉伸或压扁。只有刻意想要不同形状时才需要解锁——那样画面会变形。",
        },
        {
          q: "调整尺寸后 PNG 的透明背景还在吗?",
          a: "在。缩放保持原格式输出,PNG 透明通道和 WebP alpha 都不会丢失。只有转成 JPG 才会把透明区域铺成白色。",
        },
      ],
    },
    ja: {
      name: "画像リサイズ",
      tagline:
        "正確なピクセル指定やパーセント指定で画像をリサイズ。アスペクト比固定にも対応し、まとめて一括処理——ファイルは端末から出ません。",
      intro: [
        "幅と高さを正確なピクセルで入力するか、パーセントで拡大縮小(25%、50%、200% など)できます。アスペクト比ロックを付ければ片方を変えたときにもう片方が自動計算され、比率は崩れません。ロックを解除すれば任意のサイズに強制できるので、各プラットフォームのアイコンやバナー規格にも対応します。",
        "一括モードではドロップした全ファイルに同じ設定が適用され、フォルダ一枚分の写真も一括で Web 向けに縮小できます。縮小は高品質スムージングで行い、出力は元のフォーマットを維持します。",
      ],
      steps: [
        "画像を 1 枚以上ボックスにドロップします。",
        "ピクセルまたは拡大率を入力し、ロックボタンでアスペクト比の固定を切り替えます。",
        "リサイズ後の画像を 1 枚ずつ、またはまとめてダウンロードします。",
      ],
      faqs: [
        {
          q: "画像を拡大すると画質は落ちますか?",
          a: "落ちます。拡大は存在しないピクセルを作り出すため、にじみやぼやけが発生します。取得されていないディテールを後から復元できるツールはありません。縮小は安全です。拡大は 150% 程度までにしておくと違和感が少ないです。",
        },
        {
          q: "アスペクト比ロックとは何ですか?",
          a: "ロック中は幅を変えると高さが(その逆も)自動で再計算され、画像が伸びたり潰れたりしません。意図的に別の形にしたいときだけロックを外してください——その場合画像は歪みます。",
        },
        {
          q: "リサイズした PNG の透明度は保たれますか?",
          a: "保たれます。リサイズは元フォーマットのまま出力するので、PNG の透明部分も WebP のアルファもそのままです。JPG に変換したときのみ透明部分が白くなります。",
        },
      ],
    },
    es: {
      name: "Redimensionar imágenes",
      tagline:
        "Cambia el tamaño de imágenes a píxeles exactos o porcentajes con bloqueo de proporción y procesa lotes completos — nada sale de tu dispositivo.",
      intro: [
        "Escribe el ancho y alto exactos en píxeles o escala por porcentaje (25%, 50%, 200%…). El bloqueo de proporción recalcula un lado al cambiar el otro para que la imagen nunca se deforme; desactívalo para forzar cualquier medida, útil para avatares o banners de cada plataforma.",
        "El modo por lotes aplica tus ajustes a todos los archivos que sueltes, así una carpeta de fotos se reduce para la web de una pasada. La reducción usa suavizado de alta calidad y la salida conserva el formato original.",
      ],
      steps: [
        "Suelta una o varias imágenes en el recuadro.",
        "Introduce ancho/alto en píxeles o un porcentaje; usa el candado para mantener o liberar la proporción.",
        "Descarga las imágenes redimensionadas una a una o todas juntas.",
      ],
      faqs: [
        {
          q: "¿Ampliar una imagen reduce su calidad?",
          a: "Sí. Al ampliar hay que inventar píxeles, lo que produce bordes suaves o desenfoque; ninguna herramienta puede añadir detalle que nunca se capturó. Reducir es seguro. Para ampliar, sé conservador: hasta ~150% suele verse bien.",
        },
        {
          q: "¿Qué hace el bloqueo de proporción?",
          a: "Con el bloqueo activo, al cambiar el ancho se recalcula la altura automáticamente (y al revés), así la imagen no se estira ni se aplasta. Desactívalo solo si quieres deliberadamente otra forma: la imagen quedará distorsionada.",
        },
        {
          q: "¿Los PNG redimensionados conservan la transparencia?",
          a: "Sí. El cambio de tamaño mantiene el formato original, así que la transparencia PNG y el alfa WebP quedan intactos. Solo convertir a JPG aplanaría la transparencia sobre un fondo blanco.",
        },
      ],
    },
    pt: {
      name: "Redimensionar imagens",
      tagline:
        "Redimensione imagens em pixels exatos ou porcentagem com trava de proporção e processe lotes inteiros de uma vez — nada sai do seu dispositivo.",
      intro: [
        "Digite a largura e altura exatas em pixels ou escale por porcentagem (25%, 50%, 200%…). Com a trava de proporção ativa, mudar um lado recalcula o outro automaticamente, então a imagem nunca distorce; desbloqueie para forçar qualquer medida, útil para avatares e banners de cada plataforma.",
        "O modo em lote aplica suas configurações a todos os arquivos soltos de uma vez, então uma pasta de fotos pode ser reduzida para a web numa única passada. A redução usa suavização de alta qualidade e a saída mantém o formato original.",
      ],
      steps: [
        "Solte uma ou mais imagens na caixa.",
        "Informe largura/altura em pixels ou uma porcentagem; use o cadeado para manter ou liberar a proporção.",
        "Baixe as imagens redimensionadas individualmente ou todas juntas.",
      ],
      faqs: [
        {
          q: "Ampliar uma imagem reduz a qualidade?",
          a: "Sim. Ampliar exige inventar pixels, o que gera bordas moles ou desfoque — nenhuma ferramenta consegue recuperar detalhes que nunca foram capturados. Reduzir é seguro. Para ampliar, seja modesto: até ~150% costuma ficar bom.",
        },
        {
          q: "Para que serve a trava de proporção?",
          a: "Com a trava ativa, mudar a largura recalcula a altura automaticamente (e vice-versa), então a imagem não estica nem achata. Desligue apenas se quiser outra forma de propósito — a imagem ficará distorcida.",
        },
        {
          q: "PNGs redimensionados mantêm a transparência?",
          a: "Sim. O redimensionamento mantém o formato original, então a transparência de PNG e o alfa de WebP ficam intactos. Só converter para JPG achataria a transparência num fundo branco.",
        },
      ],
    },
  },
});
