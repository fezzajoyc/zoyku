import { ImageColorPickerEngine } from "../_engines/image-engine-color-picker";
import { defineTool } from "../_lib/types";
import { colorPickerDeepDive } from "../_lib/deepdive-misc";
import type { Locale } from "@/lib/site";

export default defineTool({
  slug: "image-color-picker",
  category: "image",
  icon: "palette",
  featured: true,
  engine: { component: ImageColorPickerEngine },
  related: ["image-palette-generator", "color-picker", "image-metadata-viewer", "image-splitter", "image-compressor", "image-resizer", "convert-image"],
  copy: {
    en: {
      name: "Image Color Picker",
      tagline: "Pick an exact pixel from a local image and copy HEX, HEX8, RGB or RGBA values with alpha, entirely in your browser.",
      intro: [
        "Drop one raster image, click any pixel and get its source coordinates plus HEX, HEX8, RGB and RGBA values. The canvas stays at the image's native size, so a displayed preview can be sampled without losing the original pixel position.",
        "Transparent pixels stay transparent: HEX8 keeps the exact alpha byte, while RGBA rounds the channel fraction to five decimal places. X/Y fields and arrow keys provide a precise keyboard path when a mouse click is not enough.",
        "The file is decoded and sampled locally with Canvas. There is no image URL mode, upload endpoint, account or history, and clearing the tool releases the local image state. A 25 MiB file, 16,384-pixel side and 40-megapixel budget keep decoding bounded.",
      ],
      steps: ["Drop one image or choose it from your device.", "Click a pixel, move the focused canvas with arrow keys, or enter X/Y coordinates.", "Copy the HEX, HEX8, RGB or RGBA value you need."],
      faqs: [
        { q: "Does the image leave my device?", a: "No. This tool accepts a local file and decodes it in your browser. It does not send the image to a server or store a sampling history." },
        { q: "What is the difference between HEX and HEX8?", a: "HEX contains red, green and blue as #RRGGBB. HEX8 adds the alpha channel as #RRGGBBAA, so fully transparent and semi-transparent pixels stay distinguishable." },
        { q: "Why is my image rejected?", a: "The browser must be able to decode it, the file must be at most 25 MiB, each side at most 16,384 pixels and the image at most 40 million pixels. These limits protect the tab from oversized canvas allocations." },
      ],
      deepDive: [
        { heading: "Coordinates remain tied to source pixels", paragraphs: ["A responsive preview may be smaller than the source image. The click point is scaled from the preview rectangle back to the native canvas and floored to one source pixel, with the right and bottom edges clamped safely inside the image.", "The same sampler powers pointer clicks, arrow keys and the numeric X/Y fields. That means keyboard correction and mouse selection cannot silently use different rounding rules."] },
        { heading: "Alpha is part of the answer", paragraphs: ["A transparent PNG can contain RGB bytes even when its alpha is zero. Showing only #RRGGBB would hide that distinction, so the result always includes HEX8 and RGBA. HEX8 retains the exact 8-bit alpha byte; the RGBA decimal alpha is rounded to five decimal places. The checkerboard swatch is presentation only.", "Canvas returns the browser's decoded sRGB pixels. Color profiles, animation frames and format-specific metadata are not preserved in the sampled value, which is why the tool describes its result as the pixel the browser decoded."] },
      ],
    },
    zh: {
      name: "图片像素取色",
      tagline: "从本地图片精确取出任意像素,复制 HEX、HEX8、RGB 或带透明度的 RGBA,全程在浏览器内完成。",
      intro: [
        "拖入一张位图,点击任意像素即可得到原图坐标以及 HEX、HEX8、RGB、RGBA 四种值。预览可以响应式缩放,取样仍回到图片原始像素位置。",
        "透明像素也会保留:HEX8 包含透明度字节,RGBA 用小数表示 0–255 的 alpha。鼠标之外还可以用 X/Y 输入框和方向键精确移动取样点。",
        "图片只在浏览器 Canvas 中本地解码和取样,没有图片 URL、上传接口、账号或历史记录。单文件 25 MiB、单边 16,384 像素、总计 4,000 万像素上限用于控制内存占用。",
      ],
      steps: ["拖入一张图片,或从设备选择文件。", "点击像素,聚焦画布后用方向键移动,或输入 X/Y 坐标。", "复制需要的 HEX、HEX8、RGB 或 RGBA 值。"],
      faqs: [
        { q: "图片会离开我的设备吗?", a: "不会。工具只接收本地文件,在浏览器内解码,不会把图片发送到服务器,也不会保存取样历史。" },
        { q: "HEX 和 HEX8 有什么区别?", a: "HEX 用 #RRGGBB 表示红绿蓝三个通道。HEX8 增加 #RRGGBBAA 透明度通道,可以区分完全透明与半透明像素。" },
        { q: "为什么图片被拒绝了?", a: "浏览器必须能解码图片,文件不能超过 25 MiB,单边不能超过 16,384 像素,总像素不能超过 4,000 万。这样可以避免过大的 Canvas 分配。" },
      ],
      deepDive: [
        { heading: "坐标始终对应原图像素", paragraphs: ["响应式预览可能比原图小。点击位置会从显示矩形换算回原始画布,向下取整到一个像素,并安全处理右边和下边界。", "鼠标点击、方向键和 X/Y 输入共用同一个取样函数,键盘修正不会因为换了操作方式而使用另一套舍入规则。"] },
        { heading: "透明度也是颜色答案的一部分", paragraphs: ["透明 PNG 即使 alpha 为 0 也可能保存 RGB 字节。只显示 #RRGGBB 会丢掉这个区别,所以结果同时提供 HEX8 和 RGBA。棋盘格只是显示效果,复制值仍是实际通道。", "Canvas 返回浏览器解码后的 sRGB 像素。色彩配置、动画帧和格式元数据不会进入取样值,因此页面说明的是浏览器解码到的像素。"] },
      ],
    },
    ja: {
      name: "画像ピクセルカラーピッカー",
      tagline: "ローカル画像の正確なピクセルを選び、HEX・HEX8・RGB・アルファ付き RGBA をブラウザでコピーします。",
      intro: [
        "ラスター画像を 1 枚ドロップしてピクセルをクリックすると、元画像の座標と HEX・HEX8・RGB・RGBA を取得できます。表示プレビューを縮小してもサンプル位置は元のピクセルに戻ります。",
        "透過ピクセルも保持されます。HEX8 はアルファバイトを含み、RGBA は 0〜255 の alpha を小数で示します。マウスだけでなく X/Y 入力と矢印キーでも正確に移動できます。",
        "画像は Canvas でブラウザ内だけでデコードします。画像 URL、アップロード API、アカウント、履歴はありません。25 MiB、1 辺 16,384 px、総 4,000 万 px の上限で大きすぎる割り当てを防ぎます。",
      ],
      steps: ["画像を 1 枚ドロップまたは端末から選択します。", "ピクセルをクリックし、フォーカスしたキャンバスを矢印キーで移動するか X/Y を入力します。", "必要な HEX、HEX8、RGB、RGBA をコピーします。"],
      faqs: [
        { q: "画像は端末の外へ送られますか?", a: "いいえ。ローカルファイルをブラウザ内でデコードするだけで、サーバーへ送信せず、サンプル履歴も保存しません。" },
        { q: "HEX と HEX8 の違いは?", a: "HEX は #RRGGBB の 3 色チャンネル、HEX8 は #RRGGBBAA でアルファを加えた表記です。透過と半透明を区別できます。" },
        { q: "画像が拒否される理由は?", a: "ブラウザでデコードでき、ファイル 25 MiB 以下、各辺 16,384 px 以下、総 4,000 万 px 以下である必要があります。Canvas の過大な割り当てを避けるためです。" },
      ],
      deepDive: colorPickerDeepDive("ja" as Locale),
    },
    es: {
      name: "Selector de color de píxel",
      tagline: "Elige un píxel exacto de una imagen local y copia valores HEX, HEX8, RGB o RGBA con alfa dentro del navegador.",
      intro: ["Suelta una imagen rasterizada, haz clic en cualquier píxel y obtén sus coordenadas y cuatro formatos de color. Aunque la vista previa se adapte, la muestra vuelve al píxel nativo.", "La transparencia se conserva: HEX8 incluye el byte alfa y RGBA muestra el canal 0–255 como fracción decimal. También puedes usar campos X/Y y las flechas para seleccionar sin ratón.", "La imagen se decodifica y se muestrea localmente con Canvas. No hay URL remota, subida, cuenta ni historial; los límites de 25 MiB, 16.384 píxeles por lado y 40 megapíxeles protegen la memoria."],
      steps: ["Suelta una imagen o elígela en tu dispositivo.", "Haz clic en un píxel, mueve el lienzo enfocado con las flechas o escribe X/Y.", "Copia el valor HEX, HEX8, RGB o RGBA que necesites."],
      faqs: [{ q: "¿La imagen sale de mi dispositivo?", a: "No. El archivo local se decodifica en el navegador, sin enviarlo a un servidor ni guardar un historial." }, { q: "¿Qué diferencia hay entre HEX y HEX8?", a: "HEX usa #RRGGBB; HEX8 añade el canal alfa como #RRGGBBAA para conservar la transparencia." }, { q: "¿Por qué se rechaza una imagen?", a: "Debe poder decodificarla el navegador y cumplir los límites de 25 MiB, 16.384 píxeles por lado y 40 megapíxeles." }],
      deepDive: colorPickerDeepDive("es" as Locale),
    },
    pt: {
      name: "Seletor de cor de pixel",
      tagline: "Escolha um pixel exato de uma imagem local e copie HEX, HEX8, RGB ou RGBA com alfa no navegador.",
      intro: ["Solte uma imagem raster, clique em qualquer pixel e veja suas coordenadas e quatro formatos de cor. Mesmo com a prévia redimensionada, a amostra volta ao pixel original.", "A transparência permanece: HEX8 inclui o byte alfa e RGBA mostra o canal 0–255 como fração decimal. Campos X/Y e setas permitem selecionar sem mouse.", "A imagem é decodificada e amostrada localmente com Canvas. Não há URL remota, upload, conta ou histórico; limites de 25 MiB, 16.384 pixels por lado e 40 megapixels protegem a memória."],
      steps: ["Solte uma imagem ou escolha-a no dispositivo.", "Clique em um pixel, mova o canvas focado com as setas ou informe X/Y.", "Copie o valor HEX, HEX8, RGB ou RGBA desejado."],
      faqs: [{ q: "A imagem sai do meu dispositivo?", a: "Não. O arquivo local é decodificado no navegador, sem envio a servidor ou histórico salvo." }, { q: "Qual é a diferença entre HEX e HEX8?", a: "HEX usa #RRGGBB; HEX8 acrescenta o canal alfa como #RRGGBBAA para manter a transparência." }, { q: "Por que uma imagem é recusada?", a: "O navegador precisa decodificá-la e ela deve respeitar 25 MiB, 16.384 pixels por lado e 40 megapixels." }],
      deepDive: colorPickerDeepDive("pt" as Locale),
    },
  },
});
