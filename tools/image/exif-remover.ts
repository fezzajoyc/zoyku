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
  related: ["image-metadata-viewer", "image-compressor", "png-to-jpg", "convert-image", "image-border", "image-splitter", "compress-image-to-size", "grayscale-image", "crop-circle-image", "crop-image"],
  copy: {
    en: {
      name: "EXIF Remover",
      tagline:
        "Strip EXIF, GPS and other hidden metadata from photos by re-encoding them locally — share images without leaking location or device.",
      intro: [
        "Every phone photo can carry hidden luggage: GPS coordinates of where it was taken, your camera model, timestamps, sometimes even serial numbers. This tool removes all of it by re-encoding the image from its raw pixels — metadata has nowhere to hide in a freshly drawn canvas, so EXIF, GPS, thumbnails and comments are all gone.",
        "The result keeps the original format and a visually identical picture (92% quality for JPG and WebP), and each row shows the size before and after. Batch mode scrubs a whole folder of photos in one pass, all offline on your device.",
      
        "The stripping happens by re-encoding, not by editing bytes in place: the browser decodes your image into raw pixels, draws it to a fresh canvas and re-encodes. Since canvas has no metadata storage, every EXIF block, GPS coordinate, ICC profile, thumbnail and comment field simply ceases to exist in the output.",
        "Compared with renaming a file or pasting into a chat (which often strips metadata by accident), this gives you a verifiable scrub with the before/after size shown per row. Unlike upload-based scrubbers, a passport scan or a home address encoded in GPS data never leaves your device — the privacy problem solves itself.",
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
      deepDive: [
        {
          heading: "What EXIF hides inside your photos",
          paragraphs: [
            "Every photo from a modern camera or phone carries more than pixels. The EXIF block stores the camera model, lens, exposure settings, timestamps — and, most consequentially, GPS coordinates in many cases. A casual snapshot posted online can reveal the exact room or street corner where it was taken.",
            "The block often also includes a small embedded preview thumbnail and, on some devices, software and editing history. Screenshots and images you downloaded from elsewhere typically have little or no EXIF, which is why metadata viewers sometimes show \"nothing found\" — the absence is normal, not a bug.",
            "Stripping EXIF is not about hiding wrongdoing; it is routine hygiene before publishing. Journalists, activists, medical professionals and ordinary users all have sound reasons to separate a picture's content from its recording metadata.",
          ],
        },
        {
          heading: "What removal changes — and what it does not",
          paragraphs: [
            "Removing EXIF leaves the visible image untouched: dimensions, colors and quality stay exactly the same. What disappears is the metadata block, so the file becomes anonymous — no camera, no location, no timestamps attached.",
            "Removal does not change pixel content, which means visible information stays visible. If the photo shows a street sign, a name tag or a screen with text, removing EXIF will not help; you need to crop or cover those regions separately.",
            "Geotagging is the reason most people care, but timestamps matter too: combined with other public posts, creation dates can help build a pattern of someone's movements or habits. Full metadata removal closes both channels at once.",
          ],
        },
        {
          heading: "Local processing is the whole point",
          paragraphs: [
            "There is an irony in uploading a photo to a \"privacy\" tool: the privacy-sensitive file then passes through someone else's server, which sees the exact metadata you are trying to remove — including the GPS tags. An upload-based remover defeats much of its own purpose.",
            "This tool reads and rewrites the file entirely in your browser. The image is decoded locally, the metadata is stripped, and the clean file is produced on your device; nothing is transmitted anywhere, so the very data you wanted gone never leaves your hands.",
            "A practical habit: strip metadata at the last step before sharing, from the exported file you actually intend to publish. Keep the original with its EXIF as your master — it retains useful information like exposure settings for future editing.",
          ],
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
      deepDive: [
        {
          heading: "EXIF 在照片里藏了什么",
          paragraphs: [
            "现代相机或手机拍出的每一张照片,携带的都不只是像素。EXIF 数据块里存着相机型号、镜头、曝光参数、时间戳——而在很多情况下最关键的是 GPS 坐标。随手发布到网上的一张快照,可能暴露拍摄时所在的确切房间或街角。",
            "这个数据块通常还嵌着一小张预览缩略图,部分设备上还有软件和编辑历史。截图和从别处下载的图片一般几乎没有 EXIF,所以元数据查看器有时显示“未找到”——没有才是正常的,不是故障。",
            "清除 EXIF 不是为了隐瞒什么,而是发布前的常规卫生动作。记者、活动人士、医务人员和普通用户都有充分理由把图片内容和它的拍摄元数据分开。",
          ],
        },
        {
          heading: "清除改变了什么,不改变什么",
          paragraphs: [
            "移除 EXIF 不影响可见图像:尺寸、颜色、画质分毫不动。消失的是元数据块,文件从此匿名——没有相机信息、没有位置、没有时间戳。",
            "清除不改像素内容,所以画面里可见的信息仍然可见。如果照片里有路牌、姓名牌或带文字的屏幕,清 EXIF 帮不上忙;那些区域需要另行裁剪或遮挡。",
            "地理标签是多数人在意的点,但时间戳同样重要:与其他公开信息交叉比对,创建日期可以拼出一个人的行动或作息规律。完整清除元数据可以一次关掉这两个通道。",
          ],
        },
        {
          heading: "本地处理正是这件事的核心",
          paragraphs: [
            "把照片上传到一个“隐私”工具,本身就有些讽刺:这份对隐私敏感的文件会先经过别人的服务器——它看到的恰恰是你想删掉的那些元数据,包括 GPS 标签。上传式清除工具在很大程度上败给了自己的目的。",
            "本工具完全在浏览器内读取并重写文件。图像在本地解码,元数据被剥离,干净的文件就在你的设备上生成;什么都不外传,你想删掉的数据从头到尾没有离开过你的手。",
            "一个实用习惯:在分享前的最后一步,对真正要发布的那份导出文件做清除。保留带 EXIF 的原图作为母本——曝光参数之类的信息对以后修图仍然有用。",
          ],
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
      deepDive: [
        {
          heading: "EXIF は写真の中に何を隠しているか",
          paragraphs: [
            "現代のカメラやスマホが撮る写真は、ピクセル以上のものを運んでいます。EXIF ブロックにはカメラの機種、レンズ、露出設定、タイムスタンプ——そして多くの場合、最も重大な GPS 座標が保存されます。何気なく投稿したスナップショットが、撮影時の正確な部屋や街角を明かし得ます。",
            "ブロックには通常、小さな埋め込みサムネイルが含まれ、機種によってはソフトウェアや編集履歴まで。スクリーンショットや他から入手した画像には EXIF がほとんどないのが普通で、メタデータビューアが「何も見つからない」と表示するのは不具合ではなく正常です。",
            "EXIF 除去は悪事を隠すためではなく、公開前の日常的な衛生動作です。ジャーナリスト、活動家、医療従事者、一般ユーザーいずれにも、画像の中身と撮影メタデータを分ける正当な理由があります。",
          ],
        },
        {
          heading: "除去で変わるもの、変わらないもの",
          paragraphs: [
            "EXIF を除いても可視画像は無傷です:寸法・色・品質はまったく同じまま。消えるのはメタデータブロックで、ファイルは匿名化されます——カメラ情報、位置、タイムスタンプは一切付かなくなります。",
            "除去はピクセル内容を変えません。つまり見えている情報は見えたままです。写真に道路標識、名札、文字のある画面が写っていれば、EXIF 除去は役に立ちません。それらの領域は別途トリミングやマスキングが必要です。",
            "位置情報タグが注目されがちですが、タイムスタンプも重要です:他の公開投稿と突き合わせると、作成日時から行動や生活のパターンを組み立てられ得ます。完全なメタデータ除去は両方の経路を一度に閉じます。",
          ],
        },
        {
          heading: "ローカル処理こそが核心",
          paragraphs: [
            "「プライバシー」ツールに写真をアップロードするのには皮肉が伴います:プライバシーに関わるファイルが他人のサーバーを経由し、そこがあなたが消そうとしているメタデータ——GPS タグを含む——をそのまま見るからです。アップロード型の除去ツールは自分の目的を自分で台無しにします。",
            "このツールはファイルを完全にブラウザ内で読み取り・書き換えます。画像はローカルでデコードされ、メタデータが剥ぎ取られ、クリーンなファイルが端末上で生成される。何も送信されないため、消したいデータ自体があなたの手元を出ません。",
            "実用的な習慣:共有直前の最後のステップで、実際に公開する書き出しファイルに対して除去を行う。EXIF 付きの元画像はマスターとして残す——露出設定のような情報は、後の編集でも役立ちます。",
          ],
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
      deepDive: [
        {
          heading: "Qué esconde EXIF dentro de tus fotos",
          paragraphs: [
            "Cada foto de una cámara o móvil moderno lleva más que píxeles. El bloque EXIF almacena el modelo de cámara, la lente, los ajustes de exposición, las marcas de tiempo — y, lo más consecuente en muchos casos, las coordenadas GPS. Una instantánea casual publicada en internet puede revelar la habitación o la esquina exacta donde se tomó.",
            "El bloque suele incluir además una miniatura incrustada de vista previa y, en algunos dispositivos, software e historial de edición. Las capturas de pantalla y las imágenes descargadas de otros sitios suelen tener poco o ningún EXIF, por eso un visor de metadatos a veces muestra \"nada encontrado\" — la ausencia es normal, no un fallo.",
            "Quitar EXIF no va de ocultar nada ilícito: es higiene rutinaria antes de publicar. Periodistas, activistas, profesionales de la salud y usuarios corrientes tienen todas las razones para separar el contenido de una imagen de sus metadatos de grabación.",
          ],
        },
        {
          heading: "Qué cambia la eliminación — y qué no",
          paragraphs: [
            "Eliminar EXIF deja la imagen visible intacta: dimensiones, colores y calidad quedan exactamente igual. Lo que desaparece es el bloque de metadatos, así que el archivo se vuelve anónimo — sin cámara, sin ubicación, sin marcas de tiempo.",
            "La eliminación no cambia el contenido de los píxeles, o sea que la información visible sigue visible. Si la foto muestra un cartel callejero, una etiqueta con nombre o una pantalla con texto, quitar EXIF no ayuda; hay que recortar o tapar esas regiones por separado.",
            "El geotagging es la razón por la que la mayoría se preocupa, pero las marcas de tiempo también importan: combinadas con otras publicaciones públicas, las fechas de creación pueden ayudar a reconstruir patrones de movimientos o hábitos. La eliminación completa de metadatos cierra ambos canales a la vez.",
          ],
        },
        {
          heading: "El procesado local es el punto entero",
          paragraphs: [
            "Hay una ironía en subir una foto a una herramienta de \"privacidad\": el archivo sensible pasa por el servidor de otra persona, que ve exactamente los metadatos que intentas eliminar — incluidas las etiquetas GPS. Un eliminador basado en subida frustra gran parte de su propio propósito.",
            "Esta herramienta lee y reescribe el archivo íntegramente en tu navegador. La imagen se decodifica localmente, los metadatos se eliminan y el archivo limpio se genera en tu dispositivo; no se transmite nada, así que los datos que querías fuera jamás salen de tus manos.",
            "Un hábito práctico: elimina los metadatos en el último paso antes de compartir, sobre el archivo exportado que realmente piensas publicar. Conserva el original con su EXIF como máster — conserva información útil como los ajustes de exposición para futuras ediciones.",
          ],
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
      deepDive: [
        {
          heading: "O que o EXIF esconde dentro das suas fotos",
          paragraphs: [
            "Cada foto de uma câmera ou celular moderna carrega mais que pixels. O bloco EXIF guarda o modelo da câmera, a lente, as configurações de exposição, os carimbos de tempo — e, o mais consequente em muitos casos, as coordenadas GPS. Uma foto casual publicada na internet pode revelar o quarto ou a esquina exata onde foi tirada.",
            "O bloco normalmente inclui também uma pequena miniatura embutida e, em alguns aparelhos, software e histórico de edições. Capturas de tela e imagens baixadas de outros lugares costumam ter pouco ou nenhum EXIF, por isso um visualizador de metadados às vezes mostra \"nada encontrado\" — a ausência é normal, não um defeito.",
            "Remover o EXIF não vai de esconder nada ilícito: é higiene rotineira antes de publicar. Jornalistas, ativistas, profissionais de saúde e usuários comuns têm todas as razões para separar o conteúdo de uma imagem dos seus metadados de captura.",
          ],
        },
        {
          heading: "O que a remoção muda — e o que não muda",
          paragraphs: [
            "Remover o EXIF deixa a imagem visível intacta: dimensões, cores e qualidade ficam exatamente iguais. O que desaparece é o bloco de metadados, então o arquivo se torna anônimo — sem câmera, sem localização, sem carimbos de tempo.",
            "A remoção não muda o conteúdo dos pixels, ou seja, a informação visível continua visível. Se a foto mostra uma placa de rua, um crachá ou uma tela com texto, remover EXIF não ajuda; é preciso recortar ou cobrir essas regiões separadamente.",
            "A geolocalização é o motivo pelo qual a maioria se preocupa, mas os carimbos de tempo também importam: combinadas com outras publicações públicas, as datas de criação podem ajudar a reconstruir padrões de movimento ou hábitos. A remoção completa de metadados fecha os dois canais de uma vez.",
          ],
        },
        {
          heading: "O processamento local é o ponto central",
          paragraphs: [
            "Há uma ironia em enviar uma foto a uma ferramenta de \"privacidade\": o arquivo sensível passa pelo servidor de outra pessoa, que vê exatamente os metadados que você tenta remover — incluindo as etiquetas GPS. Um removedor baseado em envio frustra boa parte do próprio propósito.",
            "Esta ferramenta lê e reescreve o arquivo inteiramente no seu navegador. A imagem é decodificada localmente, os metadatos são removidos e o arquivo limpo é gerado no seu dispositivo; nada é transmitido, então os dados que você queria fora jamais saem das suas mãos.",
            "Um hábito prático: remova os metadatos no último passo antes de compartilhar, sobre o arquivo exportado que realmente pretende publicar. Guarde o original com o EXIF como master — ele retém informações úteis como as configurações de exposição para edições futuras.",
          ],
        },
      ],
    },
  },
});
