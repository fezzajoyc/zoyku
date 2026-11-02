import { ImageCanvasEngine } from "../_engines/image-engine-canvas";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "exif-remover",
  category: "image",
  icon: "shield",
  engine: {
    component: ImageCanvasEngine,
    props: { op: "exif-remove", accept: "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp", suffix: "-clean" },
  },
  related: ["image-metadata-viewer", "image-compressor", "png-to-jpg", "convert-image"],
  copy: {
    en: {
      name: "EXIF Remover",
      tagline:
        "Strip EXIF, GPS and other hidden metadata from photos by re-encoding them locally — share images without leaking location or device.",
      intro: [
        "Every phone photo can carry hidden luggage: GPS coordinates of where it was taken, your camera model, timestamps, sometimes even serial numbers. This tool removes all of it by re-encoding the image from its raw pixels — metadata has nowhere to hide in a freshly drawn canvas, so EXIF, GPS, thumbnails and comments are all gone.",
        "The result keeps the original format and a visually identical picture (92% quality for JPG and WebP), and each row shows the size before and after. Batch mode scrubs a whole folder of photos in one pass, all offline on your device.",
      ],
      steps: [
        "Drop the photos you plan to share — one or a whole batch.",
        "Wait a moment while each image is re-encoded locally without its metadata.",
        "Download the cleaned images individually or all at once.",
      ],
      faqs: [
        {
          q: "How does re-encoding remove metadata?",
          a: "The image is decoded to raw pixels and redrawn onto a blank canvas, then encoded again. Metadata lives in special file sections outside the pixels, and a fresh encoding simply does not include them — so EXIF, GPS, thumbnails and editing history are dropped completely.",
        },
        {
          q: "Does removing EXIF change how the photo looks?",
          a: "No visible change. Pixels are preserved at 92% JPEG/WebP quality (PNG is lossless), so the picture looks identical to the eye. One side effect: rotation stored only as an EXIF orientation flag gets baked into the pixels, which actually makes the file display more consistently across apps.",
        },
        {
          q: "Can I remove metadata without re-compressing the image?",
          a: "Not in a browser-based way that stays safe. Lossless metadata stripping requires rewriting the file container — PNGs can be cleaned losslessly with special tools, but for JPEG the reliable, simple approach is exactly this re-encode. PNG inputs here stay bit-perfect in pixels.",
        },
      ],
    },
    zh: {
      name: "EXIF 清除工具",
      tagline: "重新编码本地清除照片中的 EXIF、GPS 等隐藏元数据——分享图片不泄露拍摄地点和设备信息,支持批量。",
      intro: [
        "每张手机照片都可能藏着“行李”:拍摄地点的 GPS 坐标、相机型号、时间戳,有时甚至有序列号。本工具通过从原始像素重新编码来清除全部元数据——崭新的画布里元数据无处藏身,EXIF、GPS、缩略图和注释一并移除。",
        "结果保持原格式、肉眼完全一致的画面(JPG 和 WebP 按 92% 画质),每行显示处理前后的体积。批量模式一次清洗整个文件夹,全程离线在你的设备上完成。",
      ],
      steps: [
        "拖入准备分享的照片——一张或一批。",
        "稍等片刻,每张图片都会在本地重新编码并去掉元数据。",
        "逐张或一键下载“干净”的图片。",
      ],
      faqs: [
        {
          q: "重新编码为什么能去掉元数据?",
          a: "图片先被解码成原始像素,再重绘到一张空白画布上并重新编码。元数据存放在像素之外的专用文件段里,全新的编码天然不包含它们——EXIF、GPS、缩略图和编辑历史因此被彻底移除。",
        },
        {
          q: "清除 EXIF 会改变照片的观感吗?",
          a: "不会有可见变化。像素按 92% 的 JPEG/WebP 画质保留(PNG 为无损),肉眼看上去完全相同。一个附带效果:仅以 EXIF 方向标记保存的旋转会被“烘焙”进像素,这反而让照片在各种应用里显示得更一致。",
        },
        {
          q: "能不能不重新压缩就删除元数据?",
          a: "在浏览器里没有既安全又无损的办法。无损剥离元数据需要重写文件容器——PNG 可以用专门工具无损清理,而 JPEG 简单可靠的方式正是这种重编码。本工具处理 PNG 输入时像素保持逐位无损。",
        },
      ],
    },
    ja: {
      name: "EXIF 削除ツール",
      tagline:
        "再エンコードで写真から EXIF・GPS などの隠れたメタデータをローカル除去——撮影場所や機種を漏らさず、まとめて処理できます。",
      intro: [
        "スマホの写真には隠れた荷物が付きものです:撮影場所の GPS 座標、カメラの型番、タイムスタンプ、場合によってはシリアル番号まで。このツールは生ピクセルから画像を再エンコードしてすべてを除去します。新しく描いたキャンバスにメタデータの居場所はなく、EXIF・GPS・サムネイル・コメントがすべて消えます。",
        "結果は元のフォーマットと見た目を保ち(JPG / WebP は品質 92%)、各行に処理前後のサイズを表示します。一括モードならフォルダ一枚分の写真も一回の処理で、すべてオフラインで端末内だけ完結します。",
      ],
      steps: [
        "共有予定の写真を 1 枚でもまとめてでもドロップします。",
        "各画像がメタデータなしでローカルに再エンコードされるのを少し待ちます。",
        "クリーンな画像を 1 枚ずつ、またはまとめてダウンロードします。",
      ],
      faqs: [
        {
          q: "なぜ再エンコードでメタデータを消せるのですか?",
          a: "画像は生ピクセルにデコードされ、真っさらなキャンバスに描き直してから再度エンコードされます。メタデータはピクセル外の専用セクションにあり、新しいエンコードには含まれないため、EXIF・GPS・サムネイル・編集履歴が完全に失われます。",
        },
        {
          q: "EXIF を消すと写真の見た目は変わりますか?",
          a: "見た目の変化はありません。ピクセルは 92% の JPEG/WebP 品質で保持され(PNG はロスレス)、目には同一に見えます。副次効果として、EXIF の方向フラグだけだった回転がピクセルに焼き込まれ、アプリ間でより一貫して表示されるようになります。",
        },
        {
          q: "再圧縮せずにメタデータだけ消せませんか?",
          a: "ブラウザ内で安全にやる方法としてはできません。ロスレスのメタデータ除去にはファイルコンテナの書き換えが必要です。PNG は専用ツールでロスレス清掃できますが、JPEG にはこの再エンコードが確実で簡単な方法です。PNG 入力ならピクセルは完全に無劣化で保たれます。",
        },
      ],
    },
    es: {
      name: "Eliminador de EXIF",
      tagline:
        "Elimina EXIF, GPS y otros metadatos ocultos de las fotos recodificándolas en local — comparte imágenes sin filtrar ubicación ni dispositivo.",
      intro: [
        "Cada foto de móvil puede llevar equipaje oculto: coordenadas GPS del lugar, modelo de cámara, marcas de tiempo y a veces hasta números de serie. Esta herramienta lo elimina todo recodificando la imagen desde sus píxeles originales: en un lienzo recién dibujado los metadatos no tienen dónde esconderse, así que EXIF, GPS, miniaturas y comentarios desaparecen.",
        "El resultado conserva el formato original y una imagen visualmente idéntica (92% de calidad para JPG y WebP), y cada fila muestra el tamaño antes y después. El modo por lotes limpia una carpeta entera de fotos en una pasada, todo sin conexión en tu dispositivo.",
      ],
      steps: [
        "Suelta las fotos que piensas compartir — una o todo un lote.",
        "Espera un instante mientras cada imagen se recodifica en local sin sus metadatos.",
        "Descarga las imágenes limpias individualmente o todas a la vez.",
      ],
      faqs: [
        {
          q: "¿Cómo elimina los metadatos la recodificación?",
          a: "La imagen se decodifica a píxeles puros, se redibuja en un lienzo vacío y se vuelve a codificar. Los metadatos viven en secciones del archivo fuera de los píxeles, y una codificación nueva simplemente no los incluye: EXIF, GPS, miniaturas e historial de edición se descartan por completo.",
        },
        {
          q: "¿Quitar el EXIF cambia el aspecto de la foto?",
          a: "Ningún cambio visible. Los píxeles se conservan al 92% de calidad JPEG/WebP (PNG es sin pérdida), así la imagen se ve idéntica al ojo. Un efecto secundario: la rotación guardada solo como marca de orientación EXIF se hornea en los píxeles, lo que hace que el archivo se muestre de forma más consistente entre apps.",
        },
        {
          q: "¿Puedo eliminar metadatos sin recomprimir la imagen?",
          a: "No de una forma segura basada en navegador. El borrado sin pérdida requiere reescribir el contenedor del archivo: los PNG se pueden limpiar sin pérdida con herramientas especiales, pero para JPEG el método fiable y sencillo es justamente esta recodificación. Con entradas PNG aquí los píxeles quedan idénticos bit a bit.",
        },
      ],
    },
    pt: {
      name: "Removedor de EXIF",
      tagline:
        "Remova EXIF, GPS e outros metadados ocultos das fotos recodificando-as localmente — compartilhe imagens sem vazar local nem aparelho.",
      intro: [
        "Toda foto de celular pode trazer bagagem escondida: coordenadas GPS do local, modelo da câmera, datas e às vezes até números de série. Esta ferramenta remove tudo re-codificando a imagem a partir dos pixels originais — numa tela recém-desenhada os metadados não têm onde se esconder, então EXIF, GPS, miniaturas e comentários desaparecem.",
        "O resultado mantém o formato original e uma imagem visualmente idêntica (92% de qualidade para JPG e WebP), e cada linha mostra o tamanho antes e depois. O modo em lote limpa uma pasta inteira de fotos de uma vez, tudo offline no seu dispositivo.",
      ],
      steps: [
        "Solte as fotos que pretende compartilhar — uma ou um lote inteiro.",
        "Aguarde um instante enquanto cada imagem é re-codificada localmente sem os metadados.",
        "Baixe as imagens limpas individualmente ou todas de uma vez.",
      ],
      faqs: [
        {
          q: "Como a re-codificação remove os metadados?",
          a: "A imagem é decodificada em pixels puros, redesenhada numa tela em branco e codificada de novo. Os metadados vivem em seções do arquivo fora dos pixels, e uma codificação nova simplesmente não os inclui: EXIF, GPS, miniaturas e histórico de edição são descartados por completo.",
        },
        {
          q: "Remover o EXIF muda a aparência da foto?",
          a: "Nenhuma mudança visível. Os pixels são preservados a 92% de qualidade JPEG/WebP (PNG é sem perdas), então a imagem parece idêntica a olho nu. Um efeito colateral: a rotação guardada só como marca de orientação EXIF é gravada nos pixels, o que faz o arquivo aparecer de forma mais consistente entre apps.",
        },
        {
          q: "Dá para remover metadados sem recomprimir a imagem?",
          a: "Não de um modo seguro baseado em navegador. A limpeza sem perdas exige reescrever o contêiner do arquivo: PNGs podem ser limpos sem perdas com ferramentas especiais, mas para JPEG a abordagem simples e confiável é justamente esta re-codificação. Com entradas PNG aqui, os pixels ficam idênticos bit a bit.",
        },
      ],
    },
  },
});
