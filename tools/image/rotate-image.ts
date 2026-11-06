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
  related: ["crop-image", "image-resizer", "convert-image", "image-compressor", "image-border", "image-splitter", "compress-image-to-size", "grayscale-image", "crop-circle-image", "heic-to-jpg"],
  copy: {
    en: {
      name: "Rotate Image",
      tagline:
        "Rotate images by 90°, 180° or 270° and flip them horizontally or vertically — batch-friendly, instant and completely in your browser.",
      intro: [
        "Turn photos the right way up, straighten scans that came in sideways, or mirror an image for a flipped layout. Each button applies to every file you have loaded at once, and a small readout always shows the current rotation and mirror state so you never lose track.",
        "Rotations and flips are baked into the actual pixels, which means the saved file looks identical everywhere — no player or viewer will ever “correct” it back. The output keeps each image's original format.",
      
        "Rotation and mirroring are pixel transforms, not metadata edits: a 90° turn redraws the image with axes swapped and EXIF orientation cleared, so the saved file displays correctly in every viewer — including old apps and print services that ignore EXIF. The current angle and flip state stay visible on screen, so 270° never happens by accident.",
        "Compared with rotating via EXIF alone (which many viewers still ignore) or re-importing into an editor, this bakes the change into the file in one click across a batch. And because output keeps each image's original format, a JPG comes back a JPG — there is no surprise conversion to PNG doubling the file size.",
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
      deepDive: [
        {
          heading: "Rotation rearranges pixels — it never resamples them",
          paragraphs: [
            "A 90-degree rotation is the clean case: every pixel moves to a new coordinate and no interpolation is needed, so the image content is pixel-for-pixel identical afterward. Dimensions simply swap — a 4000×3000 photo becomes 3000×4000.",
            "Arbitrary angles are different: no rotated rectangle fits back onto the original pixel grid, so the corners must be filled with a background color and the content must be interpolated to land on grid points. That is why a 10-degree tilt shows corner triangles and why heavy rotations on small images soften edges.",
            "The practical consequence is to prefer quarter turns when possible and to make free-angle rotations from the highest-resolution source available. If you need a 5-degree correction, do it on the original, not on an already-resized copy.",
          ],
        },
        {
          heading: "Why photos come out sideways: EXIF orientation",
          paragraphs: [
            "The classic sideways-phone-photo problem is not a rotation bug — it is metadata. Cameras record how the sensor was held in an EXIF orientation flag and store the pixels in one fixed orientation; viewers that read the flag display the photo upright, and software that ignores it displays it sideways.",
            "This is why one image looks correct on your phone and sideways in an old web tool or a photo editor: the two disagree about whether to trust the flag. Browsers mostly honor it now, which can be confusing when the same file rotates unexpectedly once downloaded and re-opened elsewhere.",
            "Rotation tools like this one work on actual pixels and output a properly oriented file, so the result is correct everywhere regardless of how the next software treats metadata. After a deliberate rotation, the file no longer depends on the flag at all.",
          ],
        },
        {
          heading: "Local processing and safe rotation habits",
          paragraphs: [
            "Rotation runs entirely in your browser: the image is decoded, transformed and re-encoded on your device with no upload. Documents, family photos or unreleased shots rotate without any of them traveling to a server.",
            "Rotate from the original, save the result as a new file, and keep both. Rotation with arbitrary angles re-encodes the image, and stacking such operations — rotate, crop, resize, rotate again — compounds generation loss exactly like repeated JPEG saves.",
            "One more habit: flip and mirror are not rotation. A mirrored image reverses left and right, which matters for text, logos and recognizably asymmetric scenes. If a photo needs mirroring, use a tool that says so — the output is a genuinely different image, not just a turned one.",
          ],
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
      deepDive: [
        {
          heading: "旋转只是重排像素,从不重采样",
          paragraphs: [
            "90 度旋转是最干净的情形:每个像素移动到新坐标,无需任何插值,旋转后图像内容逐像素完全一致。尺寸只是对调——4000×3000 的照片变成 3000×4000。",
            "任意角度就不同了:旋转后的矩形无法套回原像素网格,所以四角必须用背景色填补,内容也必须经过插值才能落在网格点上。这就是倾斜 10 度会出现四角三角形、小图大幅旋转会边缘变糊的原因。",
            "实际结论是:能整九十度就整九十度;要做任意角度旋转,尽量从最高分辨率的源图出发。需要矫正 5 度时,请用原图做,不要在已经缩放过的副本上做。",
          ],
        },
        {
          heading: "照片为什么会横过来:EXIF 方向标记",
          paragraphs: [
            "手机照片横着的经典问题不是旋转 bug,而是元数据。相机把传感器被握持的方向写进 EXIF 方向标记,像素本身只按一个固定方向存储;读标记的看图软件会把照片正过来显示,忽略标记的软件就把它横着显示。",
            "这就是为什么同一张图在手机上看着正常,在某个老旧网页工具或图片编辑器里却横着:两个软件对“要不要信标记”意见不一。现在浏览器大多会尊重它,但同一下载文件在别处打开时突然转了个方向,还是会让人困惑。",
            "像本工具这样的旋转工具作用于真实像素,输出方向已经正确的文件,所以无论下一个软件怎么对待元数据,结果都是正的。经过一次主动旋转之后,文件就完全不再依赖那个标记了。",
          ],
        },
        {
          heading: "本地处理与安全旋转习惯",
          paragraphs: [
            "旋转完全在浏览器内进行:图像在你的设备上解码、变换、重新编码,没有上传。文档、家人照片或未发布的照片,旋转时谁都不会跑到服务器上。",
            "从原图开始旋转,把结果另存为新文件,两份都保留。任意角度旋转会重新编码图像,把这类操作叠起来——旋转、裁剪、缩放、再旋转——累积的世代损失和反复保存 JPEG 一模一样。",
            "还有一个习惯:翻转不是旋转。镜像图会把左右对调,这对文字、Logo 和明显不对称的场景至关重要。如果照片需要镜像,请用明确写着镜像的工具——输出的是一张真正不同的图,不只是转了个方向。",
          ],
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
      deepDive: [
        {
          heading: "回転はピクセルの並べ替え——再サンプリングはしない",
          paragraphs: [
            "90 度回転は最もきれいなケースです:全ピクセルが新しい座標へ移動し、補間は一切不要。回転後の画像内容はピクセル単位で完全に一致します。寸法は単に入れ替わる——4000×3000 の写真は 3000×4000 になります。",
            "任意の角度は別物です:回転した矩形は元のピクセルグリッドに収まらないため、四隅は背景色で埋める必要があり、内容もグリッド点に載るよう補間されます。10 度の傾きで隅に三角形が出るのも、小さい画像の大回転でエッジが軟化するのもこのためです。",
            "実務の帰結:可能なら四半期回転(90 度単位)を選び、自由角度の回転は最高解像度のソースから行う。5 度の補正が要るなら、リサイズ済みのコピーではなく元画像で行ってください。",
          ],
        },
        {
          heading: "写真が横向きになる理由:EXIF の方向フラグ",
          paragraphs: [
            "スマホ写真が横向きになる古典的問題は、回転バグではなくメタデータです。カメラはセンサーをどう持っていたかを EXIF の方向フラグに記録し、ピクセル自体は一つの固定方向で保存します。フラグを読むビューアは写真を正立表示し、無視するソフトは横向きに表示します。",
            "だから同じ画像がスマホでは正しく、古い Web ツールや画像エディタでは横向きになる——2 つは「フラグを信じるか」で意見が割れているのです。ブラウザは現在ほぼフラグを尊重しますが、ダウンロードした同じファイルが別の場所で突然回転すると混乱します。",
            "このような回転ツールは実際のピクセルに作用し、正しい向きのファイルを出力するため、次のソフトがメタデータをどう扱っても結果は正しくなります。意図的な回転の後、ファイルはフラグに一切依存しなくなります。",
          ],
        },
        {
          heading: "ローカル処理と安全な回転の習慣",
          paragraphs: [
            "回転は完全にブラウザ内で実行されます:画像は端末上でデコード、変換、再エンコードされ、アップロードはありません。文書、家族写真、未公開ショットを、サーバーに一つも送らずに回転できます。",
            "元画像から回転し、結果は新しいファイルとして保存し、両方を残す。任意角度の回転は画像を再エンコードするため、そのような操作を重ねる——回転、トリミング、リサイズ、再回転——と、JPEG の繰り返し保存と同じく世代損失が蓄積します。",
            "もう一つの習慣:反転と回転は別物です。ミラー画像は左右を入れ替え、文字、ロゴ、明らかに非対称なシーンでは重要です。写真を反転させる必要があるなら、そう明記しているツールを使って——出力は方向を変えただけでなく、本当に別の画像です。",
          ],
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
      deepDive: [
        {
          heading: "La rotación reordena píxeles — nunca los remuestrea",
          paragraphs: [
            "Una rotación de 90 grados es el caso limpio: cada píxel se mueve a una nueva coordenada y no hace falta interpolación, así que el contenido queda idéntico píxel a píxel. Las dimensiones simplemente se intercambian — una foto de 4000×3000 pasa a 3000×4000.",
            "Los ángulos arbitrarios son otra cosa: ningún rectángulo rotado encaja de nuevo en la rejilla original de píxeles, así que las esquinas deben rellenarse con un color de fondo y el contenido debe interpolarse para caer en puntos de la rejilla. Por eso una inclinación de 10 grados muestra triángulos en las esquinas, y por qué rotaciones fuertes en imágenes pequeñas suavizan los bordes.",
            "La consecuencia práctica es preferir los giros de cuarto cuando se pueda y hacer las rotaciones de ángulo libre desde la fuente de mayor resolución disponible. Si necesitas corregir 5 grados, hazlo sobre el original, no sobre una copia ya redimensionada.",
          ],
        },
        {
          heading: "Por qué salen fotos ladeadas: la orientación EXIF",
          paragraphs: [
            "El clásico problema de la foto de móvil ladeada no es un fallo de rotación — son los metadatos. Las cámaras registran cómo se sostuvo el sensor en un indicador de orientación EXIF y guardan los píxeles en una orientación fija; los visores que leen el indicador muestran la foto derecha, y el software que lo ignora la muestra ladeada.",
            "Por eso una misma imagen se ve correcta en tu móvil y ladeada en una vieja herramienta web o editor: los dos discrepan sobre si fiarse del indicador. Los navegadores hoy casi siempre lo respetan, lo que confunde cuando el mismo archivo rota de improviso al descargarlo y abrirlo en otro sitio.",
            "Las herramientas de rotación como esta trabajan sobre píxeles reales y producen un archivo correctamente orientado, así que el resultado es correcto en todas partes sin importar cómo trate los metadatos el siguiente software. Tras una rotación deliberada, el archivo deja de depender del indicador por completo.",
          ],
        },
        {
          heading: "Procesado local y hábitos de rotación seguros",
          paragraphs: [
            "La rotación ocurre íntegramente en tu navegador: la imagen se decodifica, transforma y recodifica en tu dispositivo sin subida. Documentos, fotos familiares o tomas no publicadas rotan sin que ninguna viaje a un servidor.",
            "Rota desde el original, guarda el resultado como un archivo nuevo y conserva ambos. La rotación con ángulos arbitrarios recodifica la imagen, y apilar esas operaciones — rotar, recortar, redimensionar, rotar otra vez — acumula pérdida de generación exactamente como los guardados repetidos de JPEG.",
            "Un hábito más: voltear y espejar no es rotar. Una imagen espejada invierte izquierda y derecha, lo que importa para texto, logos y escenas reconociblemente asimétricas. Si una foto necesita espejo, usa una herramienta que lo diga — la salida es una imagen genuinamente distinta, no solo girada.",
          ],
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
      deepDive: [
        {
          heading: "A rotação reorganiza pixels — nunca os reamostra",
          paragraphs: [
            "Uma rotação de 90 graus é o caso limpo: cada pixel se move para uma nova coordenada e nenhuma interpolação é necessária, então o conteúdo fica idêntico pixel a pixel. As dimensões simplesmente trocam — uma foto de 4000×3000 vira 3000×4000.",
            "Ângulos arbitrários são diferentes: nenhum retângulo rotacionado volta a encaixar na grade original de pixels, então os cantos precisam ser preenchidos com uma cor de fundo e o conteúdo precisa ser interpolado para cair em pontos da grade. É por isso que uma inclinação de 10 graus mostra triângulos nos cantos, e por que rotações fortes em imagens pequenas suavizam as bordas.",
            "A consequência prática é preferir os giros de quarto quando possível e fazer as rotações de ângulo livre a partir da fonte de maior resolução disponível. Se você precisa corrigir 5 graus, faça no original, não numa cópia já redimensionada.",
          ],
        },
        {
          heading: "Por que saem fotos de lado: a orientação EXIF",
          paragraphs: [
            "O clássico problema da foto de celular de lado não é um bug de rotação — são os metadados. As câmeras registram como o sensor foi segurado numa etiqueta de orientação EXIF e guardam os pixels numa única orientação fixa; visualizadores que leem a etiqueta mostram a foto em pé, e software que a ignora mostra de lado.",
            "Por isso a mesma imagem parece correta no seu celular e de lado numa velha ferramenta web ou editor: os dois discordam sobre confiar ou não na etiqueta. Os navegadores hoje quase sempre a respeitam, o que confunde quando o mesmo arquivo gira de repente ao ser baixado e aberto em outro lugar.",
            "Ferramentas de rotação como esta agem sobre pixels reais e produzem um arquivo corretamente orientado, então o resultado é correto em todo lugar, não importa como o próximo software trate os metadados. Depois de uma rotação deliberada, o arquivo deixa de depender da etiqueta por completo.",
          ],
        },
        {
          heading: "Processamento local e hábitos de rotação seguros",
          paragraphs: [
            "A rotação acontece inteiramente no seu navegador: a imagem é decodificada, transformada e recodificada no seu dispositivo sem envio. Documentos, fotos de família ou imagens não publicadas giram sem que nenhuma delas viaje a um servidor.",
            "Gire a partir do original, salve o resultado como um arquivo novo e guarde os dois. A rotação com ângulos arbitrários recodifica a imagem, e empilhar essas operações — girar, recortar, redimensionar, girar de novo — acumula perda de geração exatamente como os salvamentos repetidos de JPEG.",
            "Mais um hábito: virar e espelhar não é rotacionar. Uma imagem espelhada inverte esquerda e direita, o que importa para texto, logos e cenas reconhecidamente assimétricas. Se uma foto precisa de espelho, use uma ferramenta que diga isso — a saída é uma imagem genuinamente diferente, não apenas girada.",
          ],
        },
      ],
    },
  },
});
