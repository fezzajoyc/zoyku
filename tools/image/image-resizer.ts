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
  related: ["crop-image", "image-compressor", "convert-image", "rotate-image", "image-border", "image-splitter", "compress-image-to-size", "grayscale-image", "crop-circle-image", "heic-to-jpg"],
  copy: {
    en: {
      name: "Image Resizer",
      tagline:
        "Resize images to exact pixels or a percentage with aspect-ratio lock, and process whole batches at once — nothing leaves your device.",
      intro: [
        "Type the exact width and height in pixels, or scale by a percentage (25%, 50%, 200%…). The aspect-ratio lock keeps proportions correct when you change one side, and unlocking lets you force any custom dimension — useful for platform avatar or banner sizes.",
        "Batch mode applies your settings to every file you drop in, so a folder of photos can be downsized for the web in one pass. Shrinking is done with high-quality smoothing, and the output keeps the original format.",
        "Resizing runs through the browser's canvas pipeline with high-quality (Lanczos-style) image smoothing enabled, which keeps edges clean when downscaling — noticeably better than the naive nearest-neighbor result many quick tools produce. Upscaling is allowed too, though no algorithm can invent detail, so enlargements beyond about 200% will soften.",
        "Output keeps the input format: JPG stays JPG, PNG stays PNG with its transparency preserved, so a resized asset can drop straight into the same workflow it came from. Compared with doing this in an image editor, the win is batch speed — one settings panel applied to a whole folder of photos in a single pass, all locally."
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
      deepDive: [
        {
          heading: "Downscaling well: which direction, which presets",
          paragraphs: [
            "Resizing comes in two directions with different physics. Downscaling removes pixels, and when done well loses almost nothing visible — a photo resized to half its width and viewed at page size is indistinguishable from the original. Upscaling invents pixels that were never captured, which is why it can only ever soften or blur.",
            "Keep aspect ratio locked unless the destination truly demands distortion: free-width-and-height edits stretch circles into ovals and faces into funhouse versions. Platforms usually crop or letterbox to enforce their ratios themselves, so distorting manually is rarely what anyone wants.",
            "The common presets map to real constraints: 1920 px wide fits full-HD screens and most blog content columns, 1080 px suits social posts, 512 px and below serves avatars and icons. Resizing to the display size rather than shipping a 6000 px camera original is the single biggest page-speed win available.",
          ],
        },
        {
          heading: "Order of operations: resize before compression",
          paragraphs: [
            "If an image needs both resizing and compressing, resize first. Every pixel removed is data the compressor never has to encode, and the reduction scales with area — halving width and height leaves a quarter of the pixels. No quality setting can match that order of magnitude.",
            "Resizing also interacts with formats: resizing a PNG screenshot stays lossless, while resizing a JPG re-compresses it and adds a round of artifacts. When possible, resize from the least-compressed source you have and let the final format be decided last.",
            "One detail people miss: after downscaling, sharpening slightly can restore the perceived crispness that interpolation washes out — but over-sharpening a resized image creates halos that are worse than softness. Restraint applies to sharpening more than to any other setting here.",
          ],
        },
        {
          heading: "Local resizing and privacy",
          paragraphs: [
            "Resize jobs often involve the most private categories of image: identity documents sized for a form, family photos reduced for sharing, unreleased product shots prepped for a listing. Sending them to an upload-based resizer hands the full-resolution original to a stranger's storage.",
            "This tool resizes entirely in your browser: decoding, scaling and re-encoding happen on your device, and the output downloads directly. Nothing is transmitted, so there is no copy of your original living anywhere but your machine.",
            "Batch mode fits the recurring case — a photo set that all needs the same web width. Apply one size to the folder, download the results as a ZIP, and keep the originals untouched as the source of truth for every future resize.",
          ],
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
      deepDive: [
        {
          heading: "把缩小说做好:方向与预设",
          paragraphs: [
            "缩放有两个方向,物理规律不同。缩小是去掉像素,做得好的话几乎看不出损失——照片宽减半后在页面尺寸下观看,和原图难以区分。放大是凭空造出从未拍到的像素,所以只能越放越糊。",
            "除非目的地真的要求变形,否则锁住宽高比:自由改宽高会把圆形拉成椭圆、把脸拉成哈哈镜。平台自己就会按比例裁剪或加边,手动变形几乎从来不是任何人想要的结果。",
            "常见预设对应真实约束:1920 px 宽适配全高清屏幕和大多数博客正文栏,1080 px 适合社交帖子,512 px 及以下用于头像和图标。把图缩到显示尺寸而不是直接发 6000 px 的相机原图,是唾手可得的最大的提速收益。",
          ],
        },
        {
          heading: "操作顺序:先缩放,再压缩",
          paragraphs: [
            "如果一张图既要缩放又要压缩,先缩放。每去掉一个像素,压缩器就少编码一份数据,而且减少量按面积计算——宽高各减半,像素只剩四分之一。任何质量设置都达不到这个量级。",
            "缩放还和格式互相作用:缩放 PNG 截图保持无损;缩放 JPG 则会再压缩一次、追加一轮伪影。尽量从压缩最少的那份源图缩放,把最终格式的决定放到最后。",
            "一个常被忽略的细节:缩小之后轻微锐化,可以找回插值冲淡的锐度观感——但过度锐化会产生光晕,比模糊更难看。在所有设置里,锐化最需要克制。",
          ],
        },
        {
          heading: "本地缩放与隐私",
          paragraphs: [
            "缩放任务常常涉及最私密的图片类别:为表单调整尺寸的证件、准备分享的家庭照片、上架前的未发布产品图。交给上传式缩放服务,等于把全分辨率原图交给陌生人的存储。",
            "本工具完全在浏览器内缩放:解码、缩放、重新编码都在你的设备上完成,结果直接下载。什么都不外传,你的原图副本只存在于你自己的机器上。",
            "批量模式适合反复出现的场景——一组照片都需要同一网页宽度。给整个文件夹应用一个尺寸,结果打包 ZIP 下载,原图原封不动,作为未来每次缩放的事实来源。",
          ],
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
      deepDive: [
        {
          heading: "縮小をうまくやる:方向とプリセット",
          paragraphs: [
            "リサイズには物理の違う 2 方向があります。縮小はピクセルを取り除く処理で、うまくやれば視覚的な損失はほぼゼロ——幅を半分にした写真をページサイズで見れば、元画像と見分けがつきません。拡大は一度も捉えられなかったピクセルを発明する処理で、だから柔らかくなるかぼやけるかしかありません。",
            "行き先が本当に歪みを要求しない限りアスペクト比はロック:幅と高さを自由に変えると円は楕円に、顔はお化け屋敷のようになります。プラットフォームは自前で比率に合わせてクロップやレターボックスを行うため、手動の歪曲はほぼ誰の望みでもありません。",
            "定番プリセットは現実の制約に対応します:幅 1920 px はフル HD 画面と多くのブログ本文列に、1080 px は SNS 投稿に、512 px 以下はアバターとアイコンに。6000 px のカメラ原画を送るのではなく表示サイズに縮小することは、手に入る最大のページ速度改善です。",
          ],
        },
        {
          heading: "処理の順序:圧縮の前にリサイズ",
          paragraphs: [
            "画像にリサイズと圧縮の両方が要るなら、まずリサイズ。取り除いたピクセル 1 つ 1 つは、圧縮器がエンコードしなくて済むデータで、削減は面積に比例——幅と高さを半分にすればピクセルは 4 分の 1。どんな品質設定もこの桁には届きません。",
            "リサイズはフォーマットとも相互作用します:PNG スクショのリサイズは可逆のまま、JPG のリサイズは再圧縮になりアーティファクトが一巡追加されます。可能なら最も圧縮の少ないソースからリサイズし、最終フォーマットの決定は最後に。",
            "見落とされがちな細部:縮小後の軽いシャープ化は、補間で洗い流されたシャープさの感覚を取り戻せます——ただし縮小画像の過剰シャープは、柔らかさより悪いハロを生みます。ここでの設定すべての中で、シャープ化が最も抑制を要します。",
          ],
        },
        {
          heading: "ローカルのリサイズとプライバシー",
          paragraphs: [
            "リサイズ作業は最もプライベートな画像カテゴリを扱いがちです:フォーム用にサイズ調整した身分証、共有用に縮小した家族写真、出品前の未公開商品写真。アップロード型リサイザーに送ることは、フル解像度の元画像を他人のストレージに渡すことです。",
            "このツールは完全にブラウザ内でリサイズします:デコード、スケーリング、再エンコードは端末上で行われ、出力は直接ダウンロード。何も送信されないため、元画像のコピーはあなたのマシン以外のどこにも存在しません。",
            "一括モードは繰り返しのケース——全員が同じ Web 幅を要する写真セット——に合います。フォルダに 1 つのサイズを適用し、結果を ZIP でダウンロードし、元画像は無傷のまま、未来のすべてのリサイズの情報源として保持します。",
          ],
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
      deepDive: [
        {
          heading: "Reducir bien: dirección y plantillas",
          paragraphs: [
            "Redimensionar tiene dos direcciones con físicas distintas. Reducir elimina píxeles y, bien hecho, apenas pierde nada visible — una foto reducida a la mitad de su anchura y vista a tamaño de página es indistinguible del original. Ampliar inventa píxeles que nunca se capturaron, y por eso solo puede suavizar o emborronar.",
            "Mantén la relación de aspecto bloqueada salvo que el destino exija deformación: editar ancho y alto libremente estira círculos en óvalos y caras en versiones de casa de los espejos. Las plataformas suelen recortar o añadir bandas para imponer sus proporciones, así que deformar a mano casi nunca es lo que nadie quiere.",
            "Las plantillas comunes corresponden a restricciones reales: 1920 px de ancho encaja en pantallas full-HD y la mayoría de columnas de blog, 1080 px sirve para publicaciones sociales, 512 px y menos para avatares e iconos. Redimensionar al tamaño de visualización en lugar de enviar un original de cámara de 6000 px es la mayor mejora de velocidad de página disponible.",
          ],
        },
        {
          heading: "Orden de operaciones: reducir antes de comprimir",
          paragraphs: [
            "Si una imagen necesita reducirse y comprimirse, reduce primero. Cada píxel eliminado es información que el compresor nunca tiene que codificar, y la reducción escala con el área — a la mitad de anchura y altura queda un cuarto de los píxeles. Ningún ajuste de calidad alcanza ese orden de magnitud.",
            "Reducir también interactúa con los formatos: reducir una captura PNG sigue siendo sin pérdida, mientras que reducir un JPG lo re-comprime y añade otra ronda de artefactos. Cuando se pueda, reduce desde la fuente menos comprimida que tengas y decide el formato final al final.",
            "Un detalle que la gente se pierde: tras reducir, un poco de enfoque puede recuperar la nitidez percibida que la interpolación lava — pero enfocar en exceso una imagen reducida crea halos peores que la suavidad. De todos los ajustes aquí, el enfoque es el que más mesura exige.",
          ],
        },
        {
          heading: "Redimensionado local y privacidad",
          paragraphs: [
            "Los trabajos de redimensionado suelen involucrar las categorías más privadas de imagen: documentos de identidad ajustados a un formulario, fotos familiares reducidas para compartir, tomas de producto no publicadas preparadas para un anuncio. Enviarlas a un redimensionador basado en subida entrega el original a resolución completa al almacenamiento de un desconocido.",
            "Esta herramienta reduce íntegramente en tu navegador: la decodificación, el escalado y la recodificación ocurren en tu dispositivo, y la salida se descarga directamente. No se transmite nada, así que no existe copia de tu original en ningún lugar que no sea tu máquina.",
            "El modo por lotes encaja en el caso recurrente — un set de fotos que necesita el mismo ancho web. Aplica un tamaño a la carpeta, descarga los resultados en un ZIP y conserva los originales intactos como fuente de verdad para cada redimensionado futuro.",
          ],
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
      deepDive: [
        {
          heading: "Reduzir bem: direção e predefinições",
          paragraphs: [
            "Redimensionar tem duas direções com físicas diferentes. Reduzir elimina pixels e, bem feito, quase não perde nada visível — uma foto reduzida à metade da largura e vista em tamanho de página é indistinguível do original. Ampliar inventa pixels que nunca foram capturados, e por isso só pode suavizar ou borrar.",
            "Mantenha a proporção travada a menos que o destino exija deformação: editar largura e altura livremente estira círculos em ovais e rostos em versões de casa de espelhos. As plataformas normalmente recortam ou adicionam faixas para impor suas proporções, então deformar manualmente quase nunca é o que alguém quer.",
            "As predefinições comuns correspondem a restrições reais: 1920 px de largura serve a telas full-HD e à maioria das colunas de blog, 1080 px serve a posts sociais, 512 px e abaixo a avatares e ícones. Redimensionar para o tamanho de exibição em vez de enviar um original de câmera de 6000 px é a maior melhoria de velocidade de página disponível.",
          ],
        },
        {
          heading: "Ordem das operações: reduzir antes de comprimir",
          paragraphs: [
            "Se uma imagem precisa de redução e compressão, reduza primeiro. Cada pixel removido é informação que o compressor nunca precisa codificar, e a redução escala com a área — metade da largura e da altura deixa um quarto dos pixels. Nenhuma configuração de qualidade alcança essa ordem de grandeza.",
            "Reduzir também interage com os formatos: reduzir uma captura PNG segue sem perdas, enquanto reduzir um JPG o recomprime e adiciona mais uma rodada de artefatos. Quando possível, reduza da fonte menos comprimida que tiver e decida o formato final por último.",
            "Um detalhe que a gente perde: depois de reduzir, uma leve nitidez pode recuperar a sensação de contorno que a interpolação lava — mas exagerar na nitidez de uma imagem reduzida cria halos piores que a suavidade. De todas as configurações aqui, a nitidez é a que mais exige moderação.",
          ],
        },
        {
          heading: "Redimensionamento local e privacidade",
          paragraphs: [
            "Trabalhos de redimensionamento frequentemente envolvem as categorias mais privadas de imagem: documentos de identidade ajustados a um formulário, fotos de família reduzidas para compartilhar, imagens de produto não publicadas preparadas para anúncio. Enviá-las a um redimensionador baseado em envio entrega o original em resolução total ao armazenamento de um desconhecido.",
            "Esta ferramenta reduz inteiramente no seu navegador: a decodificação, o escalonamento e a recodificação acontecem no seu dispositivo, e a saída baixa diretamente. Nada é transmitido, então não existe cópia do seu original em lugar nenhum além da sua máquina.",
            "O modo em lote serve ao caso recorrente — um conjunto de fotos que precisa da mesma largura web. Aplique um tamanho à pasta, baixe os resultados num ZIP e mantenha os originais intactos como fonte da verdade para cada redimensionamento futuro.",
          ],
        },
      ],
    },
  },
});
