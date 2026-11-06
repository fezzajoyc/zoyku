import { ImageCropEngine } from "../_engines/image-engine-crop";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "crop-image",
  category: "image",
  icon: "crop",
  engine: { component: ImageCropEngine },
  related: ["image-resizer", "rotate-image", "image-compressor", "screenshot-tool", "image-border", "image-splitter", "compress-image-to-size", "grayscale-image", "crop-circle-image", "heic-to-jpg"],
  copy: {
    en: {
      name: "Crop Image",
      tagline:
        "Crop photos to 1:1, 4:3, 16:9 or a free area with draggable handles and pixel-accurate offsets — fast, private and batch-ready.",
      intro: [
        "Drag the corner handles to frame exactly what you want to keep, or type X, Y, width and height directly for pixel-perfect crops. Ratio presets — 1:1 for avatars, 4:3 and 3:2 for prints, 16:9 and 9:16 for video and stories — snap the selection to the right shape instantly.",
        "Working with a set of photos? The same selection is scaled proportionally to every file in the batch, so a whole folder gets cropped consistently. Cropping only cuts pixels — it never rescales — so the kept area stays at full original quality.",
        "Internally the crop is a canvas drawImage with a source rectangle: pixels outside the selection are discarded, and nothing inside is rescaled or re-compressed beyond the format's own encoding, so the kept region comes out at its original resolution. The ratio presets are not arbitrary — 1:1 matches avatar fields, 16:9 and 9:16 match video and stories formats, 3:2 and 4:3 match classic print sizes.",
        "That no-rescale behavior is the difference from many phone gallery apps, which silently resize crops to a fixed output dimension. Here a 4000-pixel-wide photo cropped to a quarter stays around 2000 pixels wide, full quality — which is what you want before sending images to a resizer or compressor as a next step."
      ],
      steps: [
        "Drop one or more images; click a file name to preview and crop each one.",
        "Choose a ratio preset or drag the selection handles; fine-tune with the X / Y / W / H fields.",
        "Apply the crop and download the results.",
      ],
      faqs: [
        {
          q: "Does cropping reduce image quality?",
          a: "No. Cropping simply cuts away the outside pixels — the area you keep is copied at its full original resolution. Quality only changes if you later resize or compress the result.",
        },
        {
          q: "How does batch cropping work with different image sizes?",
          a: "The selection is stored relative to the image you preview. When applied to other files it is scaled proportionally to each image's own dimensions, so the composition of the crop stays consistent across the whole batch.",
        },
        {
          q: "Which ratio should I use for a profile picture?",
          a: "1:1 (square). Most social platforms crop avatars to a circle inside a square, so centering the subject in a 1:1 selection is the safest choice.",
        },
      ],
      deepDive: [
        {
          heading: "Cropping removes pixels — plan before you cut",
          paragraphs: [
            "Cropping is destructive in a way resizing is not: resizing keeps all content at lower detail, cropping deletes content permanently. Once you save the crop, the pixels outside the selection are gone from that file. This is why the golden rule is to keep the original and treat every cropped version as a derived file you can regenerate.",
            "Work from the largest source you have. Cropping a small image and then upscaling it compounds softness; cropping the full-resolution original and downsizing the result keeps edges sharp. If you need both a wide banner and a square avatar, make two crops from the same original rather than cropping the crop.",
            "Also crop with intent about aspect ratio: decide the destination first (blog header, platform post, print frame) and set the crop to that ratio, rather than cutting freely and discovering the result does not fit anywhere without further padding.",
          ],
        },
        {
          heading: "Composition basics that make crops better",
          paragraphs: [
            "Two framing conventions carry most of the value. The rule of thirds places the subject near the intersection of lines that divide the frame into three-by-three — placing a horizon on the upper or lower third line rather than dead center usually reads as more deliberate. Centered framing, by contrast, is right for symmetric subjects, faces and product shots.",
            "Give moving subjects room in the direction they face or travel: a runner with empty space ahead looks dynamic, the same runner cropped tight behind looks about to hit a wall. The same applies to gazes — portraits usually benefit from a little space on the side the person is looking toward.",
            "Check the edges last: stray limbs, half-objects and distracting highlights at the frame boundary pull attention away. Zoom out after setting the crop and look at the whole rectangle once before committing.",
          ],
        },
        {
          heading: "Local processing keeps sensitive crops private",
          paragraphs: [
            "Crops are often taken precisely because a photo contains something that must not be shown — a document edge, a bystander, an address label. Sending that image to an upload-based cropper to hide a detail is self-defeating: the full, uncropped photo then lives on someone else's server.",
            "This tool processes entirely in your browser: decoding, selection and re-encoding happen on your device, and nothing is transmitted or stored. The version you crop is the version you publish; the full original stays with you.",
            "One workflow note: cropping is not redaction. Removing a region from the visible area removes it from the file, which is genuine deletion — unlike blurring or black rectangles drawn over content, which can sometimes be reversed if applied carelessly over compressed data. For hiding sensitive regions, cropping or covering before export is the safer move.",
          ],
        },
      ],
    },
    zh: {
      name: "图片裁剪",
      tagline: "拖拽手柄或输入精确坐标,按 1:1、4:3、16:9 或自由比例裁剪,批量套选区——本地处理,瞬间完成。",
      intro: [
        "拖动角部手柄框出想保留的区域,或直接输入 X、Y、宽、高实现像素级精准裁剪。比例预设一步到位:头像用 1:1,打印用 4:3 和 3:2,视频和短视频封面用 16:9 和 9:16。",
        "处理一组照片时,同一个选区会按各图尺寸等比缩放后套用,整个文件夹风格一致。裁剪只做像素切割、不做缩放,保留区域的画质与原图完全一致。",
      ],
      steps: [
        "拖入一张或多张图片;点击文件名可切换预览和逐张取景。",
        "选择比例预设或拖动选框;用 X / Y / 宽 / 高 数值框微调。",
        "点击裁剪,下载结果。",
      ],
      faqs: [
        {
          q: "裁剪会损失画质吗?",
          a: "不会。裁剪只是切掉外围像素,保留区域按原始分辨率原样复制。只有之后再去缩放或压缩,画质才会变化。",
        },
        {
          q: "批量裁剪时图片尺寸不一样怎么办?",
          a: "选区按你预览的那张图记录,套用到其他文件时会按各自尺寸等比缩放,因此整批图片的构图保持一致。",
        },
        {
          q: "头像应该用什么比例?",
          a: "1:1(正方形)。大多数社交平台的头像都是在正方形内裁圆形,把主体放在 1:1 选区中心最稳妥。",
        },
      ],
      deepDive: [
        {
          heading: "裁剪会删掉像素——下手前先想清楚",
          paragraphs: [
            "裁剪和缩放不一样,它是破坏性的:缩放保留全部内容只是降低细节,裁剪则把选区外的内容永久删除。保存裁剪之后,选区外的像素就从这个文件里消失了。所以黄金法则是:保留原图,把每张裁剪版本都当作可以随时重新生成的衍生文件。",
            "从最大的源图开始做。先裁小图再放大会把模糊叠加放大;裁原始全分辨率图、再把结果缩小,边缘才能保持锐利。如果你同时需要一张宽横幅和一张方形头像,应该从同一张原图分别裁两次,而不是在裁剪结果上再裁。",
            "裁剪时也要有意识地处理宽高比:先确定目的地(博客头图、平台帖子、打印相框),把裁剪比例设成目标比例,而不是随手一裁,然后发现哪里都放不下还得补边。",
          ],
        },
        {
          heading: "让裁剪更好看的两条构图常识",
          paragraphs: [
            "两条取景惯例覆盖了大部分价值。三分法把主体放在三分线交点附近——地平线放在上三分线或下三分线,通常比死板居中显得更讲究。反过来,居中构图适合对称主体、面部特写和产品图。",
            "给运动中的主体在朝向或运动方向上留出空间:前方留白的跑者看起来有动感,身后裁得死紧的跑者则像要撞墙。视线同理——人像通常在人物注视的一侧留一点空间更好。",
            "最后检查边缘:切进画面的半截肢体、残缺物体和边缘上的高光点都会分散注意力。设好裁剪框后退远看一次整个矩形,再确认。",
          ],
        },
        {
          heading: "本地处理让敏感裁剪保持私密",
          paragraphs: [
            "很多裁剪恰恰是因为照片里有不能示人的内容——文件边角、路人、快递面单。把这样的图交给上传式裁剪工具去“隐藏细节”是自我矛盾:完整的未裁剪原图从此躺在别人的服务器上。",
            "本工具完全在浏览器内处理:解码、选区、重新编码都在你的设备上完成,不传输、不存储。你裁出来的就是你要发布的,完整原图留在你手里。",
            "一个工作流说明:裁剪不等于涂改。把区域裁掉是从文件中真正删除了它——这和盖在内容上的模糊块或黑条不同,后者在压缩数据上处理不当时有时还能被还原。要隐藏敏感区域,导出前裁掉或盖住是更稳妥的做法。",
          ],
        },
      ],
    },
    ja: {
      name: "画像切り抜き",
      tagline:
        "ドラッグハンドルとピクセル単位の座標指定で 1:1・4:3・16:9・自由比率に切り抜き。選択範囲を一括適用でき、すべてローカル処理です。",
      intro: [
        "四隅のハンドルをドラッグして残したい範囲を指定するか、X・Y・幅・高さを直接入力してピクセル単位の正確な切り抜きができます。比率プリセット(アイコン用 1:1、印刷用 4:3 と 3:2、動画やストーリーズ用 16:9 と 9:16)を選べば、一瞬で正しい形に揃います。",
        "複数枚の写真を扱う場合、同じ選択範囲が各画像のサイズに比例して拡大縮小され、フォルダ単位でも統一感のある切り抜きに。切り抜きはピクセルを切り取るだけの操作で再スケールしないため、残した部分は元画像と同じ画質を保ちます。",
      ],
      steps: [
        "画像を 1 枚以上ドロップします。ファイル名をクリックすると切り替えてプレビューできます。",
        "比率プリセットを選ぶかハンドルをドラッグし、X / Y / 幅 / 高さの数値で微調整します。",
        "切り抜きを適用して結果をダウンロードします。",
      ],
      faqs: [
        {
          q: "切り抜きで画質は落ちますか?",
          a: "落ちません。切り抜きは外側のピクセルを切り捨てるだけなので、残した領域は元の解像度のままコピーされます。画質が変わるのは、その後リサイズや圧縮をした場合だけです。",
        },
        {
          q: "サイズの違う画像の一括切り抜きはどう動きますか?",
          a: "選択範囲はプレビュー中の画像を基準に記録され、他のファイルに適用する際は各画像の寸法に比例して拡大縮小されます。そのためバッチ全体で構図がそろいます。",
        },
        {
          q: "プロフィール画像にはどの比率がいい?",
          a: "1:1(正方形)です。多くの SNS では正方形の中に円形でアイコンが切り抜かれるため、被写体を 1:1 選択範囲の中央に置くのが最も安全です。",
        },
      ],
      deepDive: [
        {
          heading: "トリミングはピクセルを削除する——切る前に考える",
          paragraphs: [
            "トリミングはリサイズと違って破壊的です:リサイズは全内容を低ディテールで残しますが、トリミングは選択範囲外を永久に削除する。保存した時点で、選択範囲外のピクセルはそのファイルから消えます。だから黄金律は「元画像を残し、切り出した版は再生成できる派生ファイルとして扱う」こと。",
            "持っている最大のソースから始める。小さい画像をトリミングしてから拡大するとぼやけが増幅され、フル解像度の原画をトリミングして結果を縮小すればエッジはシャープなまま。ワイドバナーと正方形アバターの両方が要るなら、同じ原画から2回トリミングするのが正解で、トリミング結果の上でさらに切るのは避けます。",
            "アスペクト比も意図的に:まず行き先(ブログヘッダー、SNS 投稿、印刷フレーム)を決め、その比率でトリミングする。自由に切ってから「どこにも収まらない」と気づいて余白を足す、という順序は避けましょう。",
          ],
        },
        {
          heading: "トリミングを上達させる構図の基本",
          paragraphs: [
            "2つのフレーミング慣行で価値の大半をカバーできます。三分割法は被写体を三分線の交点近くに置く方法で、地平線を上下の三分線に置くと中央固定より意図が伝わります。逆に中央構図が正しいのは、対称な被写体・顔・プロダクトショットです。",
            "動く被写体には、向いている・進んでいる方向に余白を与えます:前が空いたランナーはダイナミックに見え、背後を切り詰められたランナーは壁にぶつかる直前に見えます。視線も同様で、ポートレートは人物が見ている側に少し空間がある方が通常良い。",
            "最後に端をチェック:画面の縁に混入した手足の一部、途中で切れた物、まぶしいハイライトは注意を奪います。トリミング枠を決めたら一度引きで全矩形を見てから確定を。",
          ],
        },
        {
          heading: "ローカル処理がセンシティブな切り抜きを守る",
          paragraphs: [
            "トリミングが必要になるのは、写真に見せられないもの——書類の端、通行人、配送ラベル——があるときこそ。その画像をアップロード型ツールに送って「細部を隠す」のは自己矛盾です:切り抜き前の完全な元画像が他人のサーバー上に残るからです。",
            "このツールは完全にブラウザ内で処理します:デコード、選択、再エンコードはすべて端末上で行われ、送信も保存もされません。切り抜いた版だけが公開され、完全な元画像はあなたの手元に留まります。",
            "ワークフロー上の注意:トリミングは涂りつぶし(黑条)とは違います。領域を切り落とすことはファイルからの本当の削除であり、コンテンツの上に描いたぼかしや黒矩形とは異なります。後者は圧縮データへの適用方法によっては復元され得ます。センシティブな領域を隠すなら、書き出す前に切り落とすか覆う方が安全です。",
          ],
        },
      ],
    },
    es: {
      name: "Recortar imágenes",
      tagline:
        "Recorta fotos a 1:1, 4:3, 16:9 o un área libre con tiradores arrastrables y desfases exactos en píxeles: rápido, privado y por lotes.",
      intro: [
        "Arrastra los tiradores de las esquinas para enmarcar lo que quieres conservar, o escribe X, Y, ancho y alto directamente para recortes exactos al píxel. Los preajustes de proporción — 1:1 para avatares, 4:3 y 3:2 para impresión, 16:9 y 9:16 para vídeo y stories — ajustan la selección al instante.",
        "¿Trabajas con varias fotos? La misma selección se escala proporcionalmente en cada archivo del lote, así una carpeta entera queda recortada de forma consistente. Recortar solo corta píxeles, nunca reescala: el área conservada mantiene la calidad original completa.",
      ],
      steps: [
        "Suelta una o varias imágenes; haz clic en un nombre de archivo para previsualizar y enmarcar cada una.",
        "Elige un preajuste de proporción o arrastra los tiradores; afina con los campos X / Y / An / Al.",
        "Aplica el recorte y descarga los resultados.",
      ],
      faqs: [
        {
          q: "¿Recortar reduce la calidad de la imagen?",
          a: "No. Recortar simplemente corta los píxeles exteriores: el área que conservas se copia a su resolución original íntegra. La calidad solo cambia si después reescala o comprimes el resultado.",
        },
        {
          q: "¿Cómo funciona el recorte por lotes con tamaños distintos?",
          a: "La selección se guarda de forma relativa a la imagen previsualizada. Al aplicarla a otros archivos se escala proporcionalmente a las dimensiones de cada uno, así la composición del recorte se mantiene en todo el lote.",
        },
        {
          q: "¿Qué proporción usar para una foto de perfil?",
          a: "1:1 (cuadrado). Casi todas las redes recortan el avatar en un círculo dentro de un cuadrado, así que centrar el sujeto en una selección 1:1 es la opción más segura.",
        },
      ],
      deepDive: [
        {
          heading: "Recortar elimina píxeles — planifica antes de cortar",
          paragraphs: [
            "Recortar es destructivo de una forma en que redimensionar no lo es: redimensionar conserva todo el contenido con menos detalle, recortar borra contenido de forma permanente. Una vez guardado el recorte, los píxeles fuera de la selección desaparecen de ese archivo. Por eso la regla de oro es conservar el original y tratar cada versión recortada como un archivo derivado que puedes regenerar.",
            "Trabaja desde la fuente más grande que tengas. Recortar una imagen pequeña y luego ampliarla acumula suavidad; recortar el original a resolución completa y reducir el resultado mantiene los bordes nítidos. Si necesitas a la vez un banner ancho y un avatar cuadrado, haz dos recortes desde el mismo original en vez de recortar sobre el recorte.",
            "Recorta también con intención sobre la relación de aspecto: decide primero el destino (cabecera de blog, publicación, marco de impresión) y ajusta el recorte a esa proporción, en lugar de cortar libremente y descubrir que no encaja en ningún sitio sin rellenar.",
          ],
        },
        {
          heading: "Fundamentos de composición que mejoran los recortes",
          paragraphs: [
            "Dos convenciones de encuadre aportan casi todo el valor. La regla de los tercios coloca al sujeto cerca de las intersecciones que dividen el encuadre en tres por tres — poner el horizonte en la línea del tercio superior o inferior suele leerse como más deliberado que el centrado absoluto. El encuadre centrado, en cambio, es correcto para sujetos simétricos, rostros y tomas de producto.",
            "Da a los sujetos en movimiento espacio en la dirección en la que miran o avanzan: un corredor con aire delante se ve dinámico, el mismo recortado por detrás parece a punto de chocar con un muro. Con las miradas ocurre igual: los retratos ganan con un poco de espacio hacia el lado que mira la persona.",
            "Revisa los bordes al final: extremos cortados, medios objetos y brillos que distraen en el límite del marco roban atención. Aleja el zoom tras fijar el recorte y mira el rectángulo completo una vez antes de confirmar.",
          ],
        },
        {
          heading: "El procesado local mantiene privados los recortes sensibles",
          paragraphs: [
            "Los recortes se hacen precisamente porque la foto contiene algo que no debe mostrarse — el borde de un documento, un transeúnte, una etiqueta de envío. Enviar esa imagen a un recortador basado en subidas para ocultar un detalle es contradictorio: la foto completa y sin recortar pasa a vivir en el servidor de otro.",
            "Esta herramienta procesa íntegramente en tu navegador: la decodificación, la selección y la recodificación ocurren en tu dispositivo, y no se transmite ni almacena nada. La versión que recortas es la que publicas; el original completo se queda contigo.",
            "Una nota de flujo: recortar no es censurar. Retirar una región del área visible la elimina del archivo, una supresión real — a diferencia de un desenfoque o un rectángulo negro dibujados sobre el contenido, que a veces pueden revertirse si se aplicaron sin cuidado sobre datos comprimidos. Para ocultar regiones sensibles, recortar o tapar antes de exportar es lo seguro.",
          ],
        },
      ],
    },
    pt: {
      name: "Recortar imagens",
      tagline:
        "Recorte fotos em 1:1, 4:3, 16:9 ou área livre com alças arrastáveis e deslocamentos exatos em pixels — rápido, privado e em lote.",
      intro: [
        "Arraste as alças dos cantos para enquadrar o que quer manter, ou digite X, Y, largura e altura direto para recortes exatos ao pixel. As predefinições de proporção — 1:1 para avatares, 4:3 e 3:2 para impressão, 16:9 e 9:16 para vídeos e stories — ajustam a seleção na hora.",
        "Vai tratar um conjunto de fotos? A mesma seleção é escalada proporcionalmente em cada arquivo do lote, então uma pasta inteira sai recortada de forma consistente. Recortar apenas corta pixels — nunca reescala — e a área mantida conserva a qualidade original.",
      ],
      steps: [
        "Solte uma ou mais imagens; clique num nome de arquivo para visualizar e enquadrar cada uma.",
        "Escolha uma predefinição de proporção ou arraste as alças; ajuste fino com os campos X / Y / L / A.",
        "Aplique o recorte e baixe os resultados.",
      ],
      faqs: [
        {
          q: "Recortar reduz a qualidade da imagem?",
          a: "Não. Recortar apenas corta os pixels externos — a área mantida é copiada na resolução original completa. A qualidade só muda se você depois redimensionar ou comprimir o resultado.",
        },
        {
          q: "Como funciona o recorte em lote com tamanhos diferentes?",
          a: "A seleção é guardada em relação à imagem pré-visualizada. Ao aplicar nos outros arquivos, ela é escalada proporcionalmente às dimensões de cada um, então a composição fica consistente no lote inteiro.",
        },
        {
          q: "Qual proporção usar para foto de perfil?",
          a: "1:1 (quadrado). Quase todas as redes sociais recortam o avatar num círculo dentro de um quadrado, então centralizar o motivo numa seleção 1:1 é a escolha mais segura.",
        },
      ],
      deepDive: [
        {
          heading: "Recortar elimina pixels — planeje antes de cortar",
          paragraphs: [
            "Recortar é destrutivo de um jeito que redimensionar não é: redimensionar mantém todo o conteúdo com menos detalhe, recortar apaga conteúdo permanentemente. Depois de salvar o recorte, os pixels fora da seleção somem desse arquivo. Por isso a regra de ouro é guardar o original e tratar cada versão recortada como um arquivo derivado que você pode regenerar.",
            "Trabalhe a partir da maior fonte que tiver. Recortar uma imagem pequena e depois ampliá-la acumula suavidade; recortar o original em resolução total e reduzir o resultado mantém as bordas nítidas. Se você precisa de um banner largo e de um avatar quadrado ao mesmo tempo, faça dois recortes do mesmo original em vez de recortar sobre o recorte.",
            "Recorte também com intenção quanto à proporção: decida primeiro o destino (cabeçalho de blog, post, moldura de impressão) e ajuste o recorte a essa proporção, em vez de cortar livremente e descobrir que não cabe em lugar nenhum sem preenchimento.",
          ],
        },
        {
          heading: "Fundamentos de composição que melhoram os recortes",
          paragraphs: [
            "Duas convenções de enquadramento carregam quase todo o valor. A regra dos terços coloca o assunto perto das interseções que dividem o quadro em três por três — pôr o horizonte na linha do terço superior ou inferior costuma parecer mais deliberado que o centrado absoluto. O enquadramento centrado, por sua vez, é certo para assuntos simétricos, rostos e fotos de produto.",
            "Dê aos assuntos em movimento espaço na direção em que olham ou caminham: um corredor com espaço à frente parece dinâmico, o mesmo recortado por trás parece prestes a bater numa parede. Com os olhares é igual: retratos ganham com um pouco de espaço no lado para onde a pessoa olha.",
            "Confira as bordas por último: membros cortados, meio objetos e brilhos distrativos no limite do quadro roubam atenção. Aumente o zoom de novo depois de fixar o recorte e olhe o retângulo inteiro uma vez antes de confirmar.",
          ],
        },
        {
          heading: "O processamento local mantém privados os recortes sensíveis",
          paragraphs: [
            "Os recortes acontecem justamente porque a foto contém algo que não deve aparecer — a borda de um documento, um transeunte, uma etiqueta de envio. Enviar essa imagem a um recortador baseado em envio para esconder um detalhe é contraditório: a foto completa e sem recorte passa a viver no servidor de outra pessoa.",
            "Esta ferramenta processa inteiramente no seu navegador: a decodificação, a seleção e a recodificação acontecem no seu dispositivo, e nada é transmitido ou armazenado. A versão que você recorta é a que publica; o original completo fica com você.",
            "Uma nota de fluxo: recortar não é censurar. Retirar uma região da área visível a elimina do arquivo, uma supressão real — diferente de um borrão ou de um retângulo preto desenhados sobre o conteúdo, que às vezes podem ser revertidos se aplicados sem cuidado sobre dados comprimidos. Para esconder regiões sensíveis, recortar ou cobrir antes de exportar é o caminho seguro.",
          ],
        },
      ],
    },
  },
});
