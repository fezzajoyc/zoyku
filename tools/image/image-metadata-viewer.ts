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
      deepDive: [
        {
          heading: "The layers of metadata inside an image file",
          paragraphs: [
            "Metadata in an image file sits in layers. The container level is always there: file format, pixel dimensions, file size and color depth. Above that sits EXIF — camera make and model, lens, aperture, shutter speed, ISO, focal length, flash state, capture timestamp. Deeper still are format-specific blocks: PNG tEXt/iTXt chunks, JPEG comment markers, sometimes embedded color profiles (ICC) and even thumbnails, which are themselves small images.",
            "A viewer reads these layers without touching the pixels, which is exactly the safe way to inspect a file: nothing is decoded into a new file, nothing is rewritten, and nothing can be corrupted in the process. What you see is what the file genuinely carries — including the parts the original author may not have realized were there.",
          ],
        },
        {
          heading: "EXIF's GPS data: the privacy headline",
          paragraphs: [
            "Most phone cameras embed GPS coordinates in every photo by default. The coordinates are precise enough to place a photo within a few meters — which means a casual snapshot can quietly reveal your home, your child's school or your hotel room. Before sharing photos publicly, checking for GPS tags is the single highest-value metadata habit.",
            "If GPS data is present and you plan to publish the image, run it through the EXIF remover afterwards. Metadata viewers and metadata strippers are two halves of one workflow: look first to know what would leak, strip second to make sure it does not. Note that re-sharing through messaging apps often strips metadata automatically, but direct file sharing — email, cloud links, uploads — does not.",
          ],
        },
        {
          heading: "Inspection without upload",
          paragraphs: [
            "The file is parsed locally in your browser: the raw bytes are read from disk into memory and the metadata tables are decoded there. Nothing is transmitted, so it is safe to inspect photos that are sensitive — evidence for a dispute, location-tagged work photos, images under NDA — with zero exposure risk.",
            "Because no upload is involved, there is no size ceiling: a 50-megapixel camera original inspects exactly as fast as a thumbnail. Pair the viewer with the EXIF remover for a complete check-then-clean loop, both running on your device.",
          ],
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
      deepDive: [
        {
          heading: "图像文件里元数据的分层",
          paragraphs: [
            "图像文件里的元数据分层存放。容器层永远存在:文件格式、像素尺寸、文件体积、色深。再往上是 EXIF——相机品牌型号、镜头、光圈、快门速度、ISO、焦距、闪光灯状态、拍摄时间戳。更深一层是格式专属块:PNG 的 tEXt/iTXt 块、JPEG 的注释段,有时还有内嵌色彩配置文件(ICC)甚至缩略图——缩略图本身又是一张小图。",
            "查看器只读这些层,不碰像素,这正是“检查”的安全姿势:不把文件解码成新文件、不重写任何东西,也就不存在损坏的可能。你看到的就是文件真实携带的内容——包括原作者可能都不知道存在的部分。",
          ],
        },
        {
          heading: "EXIF 的 GPS 数据:隐私的头号话题",
          paragraphs: [
            "大多数手机相机默认给每张照片嵌入 GPS 坐标。精度足以把照片定位到几米之内——随手一张快照可能悄悄暴露你家、孩子的学校或酒店房间。公开分享照片前先查 GPS 标签,是所有元数据习惯里价值最高的一条。",
            "如果有 GPS 数据而且你打算发布图片,之后过一遍 EXIF 移除工具。元数据查看器和清除器是同一工作流的两半:先看清楚会泄露什么,再清掉确保不泄露。注意:通过聊天软件转发常常自动剥离元数据,但直接传文件——邮件、网盘链接、上传——不会。",
          ],
        },
        {
          heading: "不上传的检查",
          paragraphs: [
            "文件在你的浏览器里本地解析:原始字节从磁盘读进内存,元数据表就地解码。什么都不传输,所以检查敏感照片完全零暴露——纠纷证据、带定位的工作照片、受保密协议约束的图片都适用。",
            "因为不上传,也没有体积上限:五千万像素的相机原片和缩略图检查起来一样快。配合 EXIF 移除工具就是完整的“查完再清”闭环,两步都在你设备上完成。",
          ],
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
      deepDive: [
        {
          heading: "画像ファイル内メタデータの階層",
          paragraphs: [
            "画像ファイルのメタデータは階層をなしています。コンテナ層は常にあります。ファイル形式、ピクセル寸法、ファイルサイズ、色深度。その上に EXIF——カメラのメーカーと型番、レンズ、絞り、シャッター速度、ISO、焦点距離、フラッシュ状態、撮影タイムスタンプ。さらに深いところに形式固有のブロックがあります。PNG の tEXt/iTXt チャンク、JPEG のコメントマーカー、カラープロファイル(ICC)の埋め込み、そしてサムネイル——サムネイル自体がまた小さな画像です。",
            "ビューアはこれらの層をピクセルに触れずに読みます。これこそファイルを検査する安全なやり方です。新しいファイルにデコードせず、何も書き換えず、したがって破損の可能性もありません。見えるものはファイルが本当に運んでいるものであり、作者本人が気づいていなかった部分も含みます。",
          ],
        },
        {
          heading: "EXIF の GPS データ:プライバシーの筆頭",
          paragraphs: [
            "多くのスマホカメラは既定ですべての写真に GPS 座標を埋め込みます。精度は数メートル単位で場所を特定できるほどです——気軽な一枚が、自宅、子どもの学校、ホテルの部屋を静かに暴けます。写真を公開する前に GPS タグの有無を確認するのは、メタデータ習慣の中で最も価値の高い一つです。",
            "GPS データがあり、画像を公開する予定なら、その後に EXIF 除去ツールに通してください。メタデータビューアと除去ツールは一つのワークフローの二つの半分です。まず見て何が漏れるかを知り、次に除去して確実に漏らさない。チャットアプリ経由の再共有はしばしばメタデータを自動で剥ぎ取りますが、直接のファイル共有——メール、クラウドリンク、アップロード——はそうしません。",
          ],
        },
        {
          heading: "アップロードなしの検査",
          paragraphs: [
            "ファイルはブラウザ内でローカルに解析されます。生のバイトをディスクからメモリに読み込み、メタデータテーブルをその場でデコードします。何も送信しないため、機密性の高い写真——紛争の証拠、位置情報付きの業務写真、NDA 下の画像——もゼロ露出で検査できます。",
            "アップロードがないためサイズ上限もありません。5000 万ピクセルのカメラ原寸でもサムネイルと同じ速さで検査できます。EXIF 除去ツールと組み合わせれば、「見てから清める」完全なループが端末上で完結します。",
          ],
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
      deepDive: [
        {
          heading: "Las capas de metadatos dentro de un archivo de imagen",
          paragraphs: [
            "Los metadatos de una imagen se organizan en capas. La del contenedor siempre está: formato del archivo, dimensiones en píxeles, tamaño y profundidad de color. Encima está EXIF — marca y modelo de cámara, objetivo, apertura, velocidad de obturación, ISO, distancia focal, estado del flash, marca de tiempo de captura. Más adentro hay bloques específicos del formato: chunks tEXt/iTXt de PNG, marcadores de comentario de JPEG, a veces perfiles de color incrustados (ICC) e incluso miniaturas, que son a su vez pequeñas imágenes.",
            "Un visor lee estas capas sin tocar los píxeles, que es exactamente la forma segura de inspeccionar un archivo: nada se decodifica a un archivo nuevo, nada se reescribe y nada puede corromperse en el proceso. Lo que ves es lo que el archivo realmente lleva — incluidas las partes que el autor original quizá no sabía que estaban ahí.",
          ],
        },
        {
          heading: "Los datos GPS de EXIF: el titular de la privacidad",
          paragraphs: [
            "La mayoría de cámaras de teléfono incrustan coordenadas GPS en cada foto por defecto. La precisión basta para situar una foto a pocos metros — lo que significa que una foto casual puede revelar silenciosamente tu casa, el colegio de tu hijo o tu habitación de hotel. Antes de compartir fotos públicamente, mirar si hay etiquetas GPS es el hábito de metadatos de mayor valor.",
            "Si hay datos GPS y piensas publicar la imagen, pásala después por el eliminador de EXIF. Visor y eliminador de metadatos son dos mitades de un mismo flujo: mirar primero para saber qué se filtraría, quitar después para asegurar que no se filtre. Ojo: reenviar por apps de mensajería a menudo elimina los metadatos automáticamente, pero compartir el archivo directo — correo, enlaces de nube, subidas — no.",
          ],
        },
        {
          heading: "Inspección sin subida",
          paragraphs: [
            "El archivo se analiza localmente en tu navegador: los bytes crudos se leen del disco a la memoria y las tablas de metadatos se decodifican allí. No se transmite nada, así que puedes inspeccionar fotos sensibles — pruebas de una disputa, fotos de trabajo geolocalizadas, imágenes bajo NDA — con riesgo de exposición cero.",
            "Como no hay subida, tampoco hay techo de tamaño: el original de 50 megapíxeles de una cámara se inspecciona tan rápido como una miniatura. Combina el visor con el eliminador de EXIF para un ciclo completo de mirar-y-limpiar, todo en tu dispositivo.",
          ],
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
      deepDive: [
        {
          heading: "As camadas de metadados dentro de um arquivo de imagem",
          paragraphs: [
            "Os metadados de uma imagem ficam em camadas. A do contêiner sempre está lá: formato do arquivo, dimensões em pixels, tamanho e profundidade de cor. Acima dela fica o EXIF — marca e modelo da câmera, lente, abertura, velocidade do obturador, ISO, distância focal, estado do flash, carimbo de data da captura. Mais a fundo há blocos específicos do formato: chunks tEXt/iTXt do PNG, marcadores de comentário do JPEG, às vezes perfis de cor incorporados (ICC) e até miniaturas, que são elas mesmas pequenas imagens.",
            "Um visualizador lê essas camadas sem tocar nos pixels, que é exatamente a forma segura de inspecionar um arquivo: nada é decodificado para um arquivo novo, nada é reescrito e nada pode se corromper no processo. O que você vê é o que o arquivo realmente carrega — incluindo as partes que o autor original talvez não soubesse que estavam lá.",
          ],
        },
        {
          heading: "Os dados GPS do EXIF: o destaque de privacidade",
          paragraphs: [
            "A maioria das câmeras de celular incorpora coordenadas GPS em cada foto por padrão. A precisão basta para situar uma foto a poucos metros — o que significa que uma foto casual pode revelar silenciosamente sua casa, a escola do seu filho ou seu quarto de hotel. Antes de compartilhar fotos publicamente, verificar se há etiquetas GPS é o hábito de metadatos de maior valor.",
            "Se há dados GPS e você pretende publicar a imagem, passe-a depois pelo removedor de EXIF. Visualizador e removedor de metadatos são duas metades de um mesmo fluxo: olhar primeiro para saber o que vazaria, remover depois para garantir que não vaze. Atenção: reenviar por apps de mensagens muitas vezes remove os metadatos automaticamente, mas compartilhamento direto do arquivo — e-mail, links de nuvem, uploads — não.",
          ],
        },
        {
          heading: "Inspeção sem upload",
          paragraphs: [
            "O arquivo é analisado localmente no seu navegador: os bytes crus são lidos do disco para a memória e as tabelas de metadatos são decodificadas ali. Nada é transmitido, então é seguro inspecionar fotos sensíveis — provas de uma disputa, fotos de trabalho geolocalizadas, imagens sob NDA — com risco de exposição zero.",
            "Como não há upload, também não há teto de tamanho: o original de 50 megapixels de uma câmera é inspecionado tão rápido quanto uma miniatura. Combine o visualizador com o removedor de EXIF para um ciclo completo de olhar-e-limpar, tudo no seu dispositivo.",
          ],
        },
      ],
    },
  },
});
