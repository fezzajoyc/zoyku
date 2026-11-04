import { ImageMetadataEngine } from "../_engines/image-engine-metadata";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "image-metadata-viewer",
  category: "image",
  icon: "search",
  engine: { component: ImageMetadataEngine },
  related: ["exif-remover", "image-compressor", "convert-image", "heic-to-jpg", "image-border", "image-splitter", "compress-image-to-size", "grayscale-image", "crop-circle-image", "crop-image"],
  copy: {
    en: {
      name: "Image Metadata Viewer",
      tagline:
        "Inspect image dimensions, file type, size and EXIF details — camera, lens, exposure, date and GPS — without uploading anything.",
      intro: [
        "Drop a photo and see everything it carries: pixel dimensions, megapixels, file type and size at a glance. For JPEG photos the built-in EXIF reader digs deeper — camera make and model, lens, exposure time, aperture, ISO, focal length, capture date and orientation, parsed by a minimal reader that runs entirely on your device.",
        "If a photo contains GPS coordinates, they are shown in decimal form with a one-click maps lookup — handy for checking what your phone embeds before you share. Non-JPEG files show their PNG bit depth and color type instead, since EXIF is a JPEG-era standard they do not carry.",
      
        "EXIF is parsed straight from the JPEG's APP1 segment using a purpose-built reader rather than a library — it walks the TIFF header, reads the IFD directory, and decodes tags for camera, lens, exposure, ISO, focal length, orientation and GPS. PNG files show their IHDR fields (bit depth, color type) since PNG has no EXIF slot.",
        "Compared with right-click → Properties, this shows the full EXIF block including fields most file managers hide — aperture, shutter speed, lens model, GPS coordinates with a maps link. Unlike upload-based EXIF viewers, the image bytes never leave your machine, so a photo's home address stays private while you inspect it.",
      ],
      steps: [
        "Drop one or more images into the box.",
        "Read the summary card: dimensions, type, size and any EXIF fields found.",
        "Open the GPS position in maps if present — or jump to the EXIF remover to strip it.",
      ],
      faqs: [
        {
          q: "What is EXIF data?",
          a: "EXIF (Exchangeable Image File Format) is the metadata standard cameras embed in JPEG photos: device model, lens, exposure settings, timestamps, orientation and sometimes GPS coordinates. It is invisible in the picture itself but can reveal where and with what a photo was taken.",
        },
        {
          q: "Why does my PNG or WebP file show no EXIF?",
          a: "EXIF is carried mainly by JPEG. PNG, GIF and most WebP files do not embed it, so there is genuinely nothing to show — the viewer reports their dimensions and, for PNG, the bit depth and color type from the file header instead.",
        },
        {
          q: "Does viewing the metadata change my image?",
          a: "No. Files are opened read-only; the tool decodes a copy in memory and never writes back to the original. Your image is displayed and analyzed entirely on your device.",
        },
      ],
    },
    zh: {
      name: "图片元数据查看器",
      tagline: "查看图片尺寸、格式、体积与 EXIF 详情——相机、镜头、曝光、拍摄时间和 GPS 位置——全程本地解析,不上传任何文件。",
      intro: [
        "拖入照片即可看到它携带的全部信息:像素尺寸、百万像素数、文件类型与体积一目了然。对 JPEG 照片,内置的 EXIF 解析器会读得更深——相机品牌型号、镜头、快门、光圈、ISO、焦距、拍摄时间和方向,全部由一个极简解析器在本机完成。",
        "如果照片带有 GPS 坐标,会以十进制显示并附一键地图查询——分享前检查手机到底嵌入了什么,非常方便。非 JPEG 文件则显示 PNG 位深和颜色类型等头部信息,因为 EXIF 是 JPEG 时代的标准,它们并不携带。",
      ],
      steps: [
        "把一张或多张图片拖入方框。",
        "查看摘要卡片:尺寸、类型、体积以及找到的 EXIF 字段。",
        "如有 GPS 位置可在地图中打开——或直接跳到 EXIF 清除工具把它删掉。",
      ],
      faqs: [
        {
          q: "EXIF 数据是什么?",
          a: "EXIF(可交换图像文件格式)是相机写入 JPEG 照片的元数据标准:设备型号、镜头、曝光参数、时间戳、方向,有时还有 GPS 坐标。画面上看不见,却能透露照片在哪里、用什么设备拍摄。",
        },
        {
          q: "为什么我的 PNG 或 WebP 文件没有 EXIF?",
          a: "EXIF 主要由 JPEG 携带。PNG、GIF 和大多数 WebP 文件并不内嵌,因此确实无内容可显示——查看器会改而报告其尺寸,以及 PNG 文件头中的位深和颜色类型。",
        },
        {
          q: "查看元数据会改动我的图片吗?",
          a: "不会。文件以只读方式打开,工具只在内存里解码副本,从不写回原文件。图片的展示与分析完全在你的设备上完成。",
        },
      ],
    },
    ja: {
      name: "画像メタデータビューア",
      tagline:
        "画像の寸法・形式・サイズと EXIF の詳細(カメラ・レンズ・露出・日時・GPS)をアップロードなしで確認できる、完全ローカル解析ツールです。",
      intro: [
        "写真をドロップすると、保持している情報をすべて表示:ピクセル寸法、メガピクセル、形式とサイズがひと目でわかります。JPEG 写真には内蔵の EXIF リーダーがさらに深く読み取り、カメラのメーカーと型番、レンズ、シャッター速度、絞り、ISO、焦点距離、撮影日時、向きを最小構成のパーサーで端末内だけ解析します。",
        "写真に GPS 座標が含まれていれば、10 進表記とワンクリックの地図検索で表示——共有前にスマホが何を埋め込んでいるか確認するのに便利です。JPEG 以外は PNG のビット深度やカラータイプなどを表示します(EXIF は JPEG 時代の標準で、これらの形式は保持しないため)。",
      ],
      steps: [
        "画像を 1 枚以上ボックスにドロップします。",
        "サマリーカードで寸法・形式・サイズと見つかった EXIF 項目を確認します。",
        "GPS 位置があれば地図で開く——または EXIF 削除ツールに進んで消去します。",
      ],
      faqs: [
        {
          q: "EXIF データとは何ですか?",
          a: "EXIF(Exchangeable Image File Format)はカメラが JPEG 写真に埋め込むメタデータ規格です:機種、レンズ、露出設定、タイムスタンプ、向き、場合により GPS 座標。画像自体には見えませんが、どこで何を使って撮られたかを明かしかねません。",
        },
        {
          q: "PNG や WebP に EXIF が表示されないのはなぜ?",
          a: "EXIF は主に JPEG が持ちます。PNG・GIF・大半の WebP は埋め込んでいないため、表示するものが実際に存在しません——ビューアは代わりに寸法と、PNG ならヘッダーからビット深度とカラータイプを表示します。",
        },
        {
          q: "メタデータの閲覧で画像は変更されますか?",
          a: "されません。ファイルは読み取り専用で開かれ、ツールはメモリ上のコピーをデコードするだけで元ファイルに書き戻しません。表示も解析も完全にあなたの端末上で行われます。",
        },
      ],
    },
    es: {
      name: "Visor de metadatos de imágenes",
      tagline:
        "Inspecciona las dimensiones, el tipo, el tamaño y los datos EXIF de tus imágenes — cámara, objetivo, exposición, fecha y GPS — sin subir nada.",
      intro: [
        "Suelta una foto y ve todo lo que lleva: dimensiones en píxeles, megapíxeles, tipo y tamaño de archivo de un vistazo. Para fotos JPEG, el lector EXIF integrado profundiza: marca y modelo de cámara, objetivo, tiempo de exposición, apertura, ISO, distancia focal, fecha y orientación, analizados por un lector mínimo que corre por completo en tu dispositivo.",
        "Si la foto contiene coordenadas GPS, se muestran en decimal con búsqueda en mapas de un clic — útil para comprobar qué incrusta tu móvil antes de compartir. Los archivos no JPEG muestran su profundidad de bits y tipo de color PNG, ya que EXIF es un estándar de la era JPEG que no llevan.",
      ],
      steps: [
        "Suelta una o varias imágenes en el recuadro.",
        "Lee la tarjeta resumen: dimensiones, tipo, tamaño y los campos EXIF encontrados.",
        "Abre la posición GPS en mapas si existe — o salta al eliminador de EXIF para borrarla.",
      ],
      faqs: [
        {
          q: "¿Qué son los datos EXIF?",
          a: "EXIF (Exchangeable Image File Format) es el estándar de metadatos que las cámaras incrustan en fotos JPEG: modelo de dispositivo, objetivo, ajustes de exposición, marcas de tiempo, orientación y a veces coordenadas GPS. Es invisible en la imagen, pero puede revelar dónde y con qué se tomó la foto.",
        },
        {
          q: "¿Por qué mi PNG o WebP no muestra EXIF?",
          a: "El EXIF lo llevan sobre todo los JPEG. Los PNG, GIF y la mayoría de los WebP no lo incrustan, así que de verdad no hay nada que mostrar: el visor informa de sus dimensiones y, en PNG, de la profundidad de bits y el tipo de color de la cabecera.",
        },
        {
          q: "¿Ver los metadatos modifica mi imagen?",
          a: "No. Los archivos se abren en solo lectura; la herramienta decodifica una copia en memoria y nunca reescribe el original. Tu imagen se muestra y analiza por completo en tu dispositivo.",
        },
      ],
    },
    pt: {
      name: "Visualizador de metadados de imagens",
      tagline:
        "Inspecione dimensões, tipo, tamanho e detalhes EXIF das imagens — câmera, lente, exposição, data e GPS — sem enviar nada.",
      intro: [
        "Solte uma foto e veja tudo o que ela carrega: dimensões em pixels, megapixels, tipo e tamanho do arquivo num relance. Para fotos JPEG, o leitor EXIF embutido vai mais fundo — marca e modelo da câmera, lente, tempo de exposição, abertura, ISO, distância focal, data e orientação — interpretados por um leitor mínimo que roda inteiramente no seu dispositivo.",
        "Se a foto tiver coordenadas GPS, elas aparecem em forma decimal com consulta em mapas de um clique — ótimo para conferir o que seu celular embute antes de compartilhar. Arquivos não JPEG mostram a profundidade de bits e o tipo de cor do PNG, já que EXIF é um padrão da era JPEG que eles não carregam.",
      ],
      steps: [
        "Solte uma ou mais imagens na caixa.",
        "Leia o cartão-resumo: dimensões, tipo, tamanho e os campos EXIF encontrados.",
        "Abra a posição GPS no mapa se houver — ou vá para o removedor de EXIF e apague.",
      ],
      faqs: [
        {
          q: "O que são dados EXIF?",
          a: "EXIF (Exchangeable Image File Format) é o padrão de metadados que as câmeras embutem em fotos JPEG: modelo do aparelho, lente, ajustes de exposição, datas, orientação e às vezes coordenadas GPS. É invisível na imagem, mas pode revelar onde e com o quê a foto foi tirada.",
        },
        {
          q: "Por que meu PNG ou WebP não mostra EXIF?",
          a: "O EXIF é carregado principalmente por JPEG. PNG, GIF e a maioria dos WebP não o embutem, então de fato não há nada a mostrar — o visualizador informa as dimensões e, em PNG, a profundidade de bits e o tipo de coloração do cabeçalho.",
        },
        {
          q: "Ver os metadados altera minha imagem?",
          a: "Não. Os arquivos são abertos apenas para leitura; a ferramenta decodifica uma cópia na memória e nunca reescreve o original. Sua imagem é exibida e analisada inteiramente no seu dispositivo.",
        },
      ],
    },
  },
});
