import { ImageCircleEngine } from "../_engines/image-engine-circle";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "crop-circle-image",
  category: "image",
  icon: "palette",
  engine: { component: ImageCircleEngine },
  related: ["round-corners-image", "crop-image", "image-resizer", "grayscale-image", "image-compressor", "image-border", "image-splitter", "compress-image-to-size", "heic-to-jpg", "image-metadata-viewer"],
  copy: {
    en: {
      name: "Circle Crop Image",
      tagline:
        "Crop one image or a whole batch into a centered circle with transparent corners — shrink slider, live preview, lossless PNG output, in your browser.",
      intro: [
        "Circular avatars, profile pictures, badges and stickers all start with a circle crop. The tool centers a circle on each image, keeps everything inside it and discards the corners as transparency — the diameter starts at the shorter side, and a slider shrinks it in percent if you want more margin.",
        "Output is always PNG so the corners stay genuinely transparent, not white. Drop a whole batch to convert many images at once, preview the first one live, and download each circle on its own.",
      
        "Under the hood each image is drawn onto a canvas, clipped to a circle path, and re-encoded as PNG — no interpolation, no compression loss on the pixels that survive. The slider expresses shrink as a percent of the shorter side, so a 90% crop on a 2000×1500 photo yields the same 1350 px diameter every time.",
        "Compared with cropping a circle in a photo editor, there is no manual selection, no exported JPG with baked-in white corners, and no per-file clicking — a batch of fifty images crops in one pass. The live preview on the first image lets you verify the result before committing the rest.",
      ],
      steps: [
        "Drop in one image or a whole batch.",
        "Drag the shrink slider if you want the circle smaller than the full shorter side.",
        "Check the live preview of the first image.",
        "Crop all images into circles and download each PNG.",
      ],
      faqs: [
        {
          q: "What determines the circle's size?",
          a: "By default the diameter equals the image's shorter side: a square image becomes a full circle, and a rectangle is cropped to the largest centered circle that fits. The shrink slider reduces that diameter in percent.",
        },
        {
          q: "Are the corners white?",
          a: "No — output is PNG with a real alpha channel, so the area outside the circle is fully transparent and the result sits cleanly on any background.",
        },
        {
          q: "Is my image re-encoded and degraded?",
          a: "The pixels inside the circle are copied as-is into a lossless PNG. Only the area outside the circle disappears; nothing inside is rescaled or recompressed.",
        },
      ],
      deepDive: [
        {
          heading: "How a circular crop differs from a rectangular one",
          paragraphs: [
            "A rectangular crop just moves a window over the pixels and keeps what is inside. A circular crop cannot do that alone, because images are rectangular grids: the circle has to be drawn by adding transparency outside its edge. That is why a circular avatar is always saved as PNG — JPG has no alpha channel and would turn the outside of the circle into a solid square of color.",
            "The circle inscribed in the image touches the middle of each edge, so the diameter equals the smaller of width and height. Corner regions are simply discarded. If your subject is not centered, move or crop the source first — no circle tool can recover pixels that fall outside its radius.",
            "Edges matter too: a circle cut with no anti-aliasing looks jagged on screen. Smoothing the edge with partial transparency over a few pixels is what separates a clean result from an obviously homemade one, and it only works in PNG.",
          ],
        },
        {
          heading: "Where circular crops are expected",
          paragraphs: [
            "Avatars and profile pictures are the big use case: most social platforms, forums and messaging apps display profile images as circles, and many crop them to a circle themselves if you upload a square. Cropping to a circle before uploading means what you see is what gets shown — no surprise platform-side recropping that cuts off the top of your head.",
            "Logos and badges benefit for the same reason. A circular logo mark placed on a colored page looks intentional; a square logo with a mismatched background looks like a sticker slapped on. Design systems increasingly specify circular avatar slots precisely because the circle reads as neutral on any background.",
            "Print and merchandise use it differently: circular sticker templates, button pins and coasters all need the design bounded by a circle. Producing the PNG with transparency at the right diameter saves a round of manual masking later.",
          ],
        },
        {
          heading: "Privacy and local processing",
          paragraphs: [
            "Profile photos are personal by nature — often faces of you, family or colleagues. Running the crop locally in your browser means those pixels never leave your device; there is no upload step that could log, cache or retain the image.",
            "The processing model is simple and inspectable: the image is decoded onto a canvas, a circle mask is applied with an alpha channel, and the result is encoded back to PNG in the same session. Nothing is stored between visits.",
            "A small workflow tip: keep the original square photo saved somewhere before cropping. The circle discards corners permanently, and the only way to change the framing later is to start again from the uncropped source.",
          ],
        },
      ],
    },
    zh: {
      name: "圆形裁剪",
      tagline:
        "把一张或多张图片裁成居中圆形、四角透明:直径可按百分比缩小,实时预览,输出无损 PNG,全程浏览器本地完成。",
      intro: [
        "圆形头像、徽章、贴纸都要先做圆形裁剪。工具会在每张图片上取居中圆,保留圆内内容,四角以透明舍弃——直径默认取短边,需要留边时用滑块按百分比缩小。",
        "输出一律是 PNG,四角是真正的透明而不是白色。支持整批处理,第一张图实时预览,结果逐张下载。",
      ],
      steps: [
        "拖入一张或多张图片。",
        "需要留边时,拖动缩小滑块让圆小于短边。",
        "查看第一张图的实时预览。",
        "批量裁成圆形,逐张下载 PNG。",
      ],
      faqs: [
        {
          q: "圆形的大小是怎么定的?",
          a: "直径默认等于图片短边:正方形图会变成完整圆形,长方形图取能放下的最大居中圆。缩小滑块按百分比调小这个直径。",
        },
        {
          q: "四角是白色的吗?",
          a: "不是。输出是带真实 alpha 通道的 PNG,圆外完全透明,放在任何背景上都很干净。",
        },
        {
          q: "画质会下降吗?",
          a: "圆内的像素原样复制进无损 PNG,只有圆外被舍弃,圆内不做缩放或重新压缩。",
        },
      ],
      deepDive: [
        {
          heading: "圆形裁剪和矩形裁剪有什么不同",
          paragraphs: [
            "矩形裁剪只是在像素上移动一个窗口,保留窗口内的内容。圆形裁剪单靠这一步做不到,因为图片本质是矩形网格:圆形必须靠在圆外添加透明来“画”出来。这就是圆形头像永远存成 PNG 的原因——JPG 没有透明通道,圆外会变成一整块实色方形。",
            "内切圆与图片四边中点相切,直径等于宽高中较小的一边,四个角落直接丢弃。如果主体不在正中央,请先移动或裁剪原图——任何圆形裁剪工具都救不回落在半径之外的像素。",
            "边缘同样重要:没有抗锯齿的圆切出来在屏幕上呈锯齿状。用几像素的半透明过渡平滑边缘,是干净成品和明显手工感作品的分水岭,而这只有在 PNG 里才有效。",
          ],
        },
        {
          heading: "哪些场合默认用圆形",
          paragraphs: [
            "头像和资料图是最大场景:多数社交平台、论坛和聊天应用都把头像显示为圆形,有些还会在你上传方形图后自行裁圆。上传前先裁成圆,所见即所得——不会出现平台二次裁剪把头顶切掉的意外。",
            "Logo 和徽章同理。放在彩色页面上的圆形 Logo 看起来是有意设计;背景颜色对不上的方形 Logo 则像一张随手贴上的贴纸。设计系统越来越普遍地规定圆形头像位,正因为圆形在任何背景上都显得中性。",
            "印刷和周边是另一种用法:圆形贴纸模板、徽章胸针、杯垫,都需要设计被圆形收边。按正确直径导出带透明的 PNG,能省掉后续一轮手动抠图。",
          ],
        },
        {
          heading: "隐私与本地处理",
          paragraphs: [
            "头像照片天然带私人属性——往往是你自己、家人或同事的脸。在浏览器本地完成裁剪意味着这些像素不离开你的设备;不存在可能记录、缓存或留存图片的上传环节。",
            "处理模型简单透明:图片解码到画布,应用带透明通道的圆形蒙版,再在同一会话里编码回 PNG。两次访问之间不保存任何东西。",
            "一个小工作流提示:裁剪前把原始方形照片存好。圆形裁剪会永久丢弃角落像素,以后想换构图,只能从未裁剪的原图重新开始。",
          ],
        },
      ],
    },
    ja: {
      name: "円形に切り抜き",
      tagline:
        "1 枚でもまとめてでも画像を中央の円に切り抜き、四隅は透明に。直径はパーセントで縮小でき、プレビューはリアルタイム、出力はロスレス PNG。",
      intro: [
        "円形のアイコン・プロフィール画像・バッジ・ステッカーは、円形への切り抜きから始まります。各画像の中央に円を置き、円の内側を残して四隅は透明として切り捨てます。直径は短辺が基準で、余白が欲しいときはスライダーでパーセント縮小できます。",
        "出力は常に PNG なので、四隅は白ではなく本当に透過します。まとめて一括変換でき、1 枚目はリアルタイムにプレビュー、結果は個別にダウンロードします。",
      ],
      steps: [
        "画像を 1 枚でもまとめてでもドロップします。",
        "余白が欲しいときは、縮小スライダーで円を短辺より小さくします。",
        "1 枚目のライブプレビューを確認します。",
        "全画像を円形に切り抜き、各 PNG をダウンロードします。",
      ],
      faqs: [
        {
          q: "円の大きさはどう決まりますか?",
          a: "直径は既定で画像の短辺と同じです。正方形ならぴったりの正円に、長方形なら収まる最大の中央円に切り抜かれます。縮小スライダーでこの直径をパーセントで小さくできます。",
        },
        {
          q: "四隅は白くなりますか?",
          a: "なりません。出力はアルファ付き PNG で、円の外側は完全に透明です。どんな背景にもきれいに置けます。",
        },
        {
          q: "画質は劣化しますか?",
          a: "円の内側のピクセルはそのままロスレス PNG にコピーされます。外側が消えるだけで、内側の拡大縮小や再圧縮はありません。",
        },
      ],
      deepDive: [
        {
          heading: "円形トリミングが四角形と違う点",
          paragraphs: [
            "四角形のトリミングは、ピクセル上でウィンドウを動かして中身を残すだけです。円形はそれだけでは実現できません。画像は本質的に矩形グリッドであり、円は「円の外側に透明を足す」ことで描くしかないからです。だから円形アバターは常に PNG で保存します——JPG にはアルファチャンネルがなく、円の外が単色の四角になってしまいます。",
            "内接円は各辺の中点に接し、直径は幅と高さの小さい方に一致します。四隅は単に捨てられます。被写体が中央にいないなら、まず元画像を移動・トリミングしてください——半径の外に落ちたピクセルはどんなツールも復元できません。",
            "エッジも重要です:アンチエイリアスなしで切った円は画面上でギザギザに見えます。数ピクセルの半透明で縁をなめらかにするのが、きれいな仕上がりと明らかな素人感の分かれ目で、これは PNG でしか機能しません。",
          ],
        },
        {
          heading: "円形が期待される場面",
          paragraphs: [
            "アバターとプロフィール画像が最大の用途です:多くの SNS・フォーラム・メッセージアプリはプロフィール画像を円で表示し、正方形をアップするとこちら側で円に切り取るものもあります。アップ前に円形にしておけば表示は見た目どおり——頭のてっぺんが削れる再トリミングのサプライズがなくなります。",
            "ロゴやバッジも同じ理由で有利です。色のついたページに置かれた円形ロゴは意図的に見え、背景色の合わない四角ロゴは貼り付けたステッカーに見えます。円はあらゆる背景で中立に見えるため、デザインシステムで円形アバタースロットが指定されることが増えています。",
            "印刷やグッズは別の使い方です:円形ステッカーのテンプレート、缶バッジ、コースターはいずれもデザインが円で収まる必要があります。正しい直径で透過 PNG を作っておけば、後のマスキング作業が一巡省けます。",
          ],
        },
        {
          heading: "プライバシーとローカル処理",
          paragraphs: [
            "プロフィール写真は本質的に個人的です——自分、家族、同僚の顔であることが多い。ブラウザ内でローカルにトリミングすれば、そのピクセルは端末から出ません。画像を記録・キャッシュ・保持しうるアップロード工程が存在しません。",
            "処理モデルはシンプルで検証可能です:画像をキャンバスにデコードし、アルファチャンネル付きの円形マスクを適用し、同じセッション内で PNG に再エンコード。訪問の間に何かを保存することはありません。",
            "小さなワークフローのヒント:トリミング前に元の正方形写真を保管してください。円形トリミングは四隅を永久に失うため、後で構図を変えるには未加工のソースからやり直すしかありません。",
          ],
        },
      ],
    },
    es: {
      name: "Recorte circular",
      tagline:
        "Recorta una imagen o un lote en un círculo centrado con esquinas transparentes: deslizador de reducción, vista previa en vivo, salida PNG.",
      intro: [
        "Los avatares circulares, fotos de perfil, insignias y pegatinas empiezan con un recorte circular. La herramienta centra un círculo en cada imagen, conserva su interior y descarta las esquinas como transparencia: el diámetro parte del lado corto, y un deslizador lo reduce en porcentaje si quieres margen.",
        "La salida siempre es PNG, así que las esquinas quedan transparentes de verdad, no blancas. Suelta un lote entero para convertir muchas imágenes a la vez, previsualiza la primera en vivo y descarga cada círculo por separado.",
      ],
      steps: [
        "Suelta una imagen o un lote entero.",
        "Mueve el deslizador de reducción si quieres el círculo más pequeño que el lado corto.",
        "Comprueba la vista previa en vivo de la primera imagen.",
        "Recorta todas en círculos y descarga cada PNG.",
      ],
      faqs: [
        {
          q: "¿Qué determina el tamaño del círculo?",
          a: "Por defecto el diámetro es igual al lado corto de la imagen: una imagen cuadrada se convierte en un círculo completo y una rectangular se recorta al mayor círculo centrado que cabe. El deslizador de reducción disminuye ese diámetro en porcentaje.",
        },
        {
          q: "¿Las esquinas quedan blancas?",
          a: "No: la salida es PNG con canal alfa real, así que el área fuera del círculo es totalmente transparente y el resultado encaja limpio en cualquier fondo.",
        },
        {
          q: "¿Se recodifica y pierde calidad mi imagen?",
          a: "Los píxeles dentro del círculo se copian tal cual en un PNG sin pérdida. Solo desaparece el área exterior; nada interior se reescala o recomprime.",
        },
      ],
      deepDive: [
        {
          heading: "En qué difiere un recorte circular de uno rectangular",
          paragraphs: [
            "Un recorte rectangular solo mueve una ventana sobre los píxeles y conserva lo que queda dentro. Un recorte circular no puede limitarse a eso, porque las imágenes son rejillas rectangulares: el círculo debe dibujarse añadiendo transparencia fuera de su borde. Por eso un avatar circular siempre se guarda en PNG — el JPG no tiene canal alfa y convertiría el exterior del círculo en un cuadrado sólido de color.",
            "El círculo inscrito toca el punto medio de cada borde, así que el diámetro equivale al menor de anchura y altura. Las esquinas simplemente se descartan. Si tu sujeto no está centrado, mueve o recorta antes la fuente: ninguna herramienta circular recupera píxeles que caen fuera del radio.",
            "Los bordes importan también: un círculo cortado sin antialiasing se ve dentado en pantalla. Suavizar el borde con transparencia parcial a lo largo de unos píxeles separa un resultado limpio de uno claramente casero, y solo funciona en PNG.",
          ],
        },
        {
          heading: "Dónde se espera un recorte circular",
          paragraphs: [
            "Los avatares y fotos de perfil son el gran caso de uso: la mayoría de redes sociales, foros y apps de mensajería muestran las imágenes de perfil como círculos, y muchas las recortan a círculo por su cuenta si subes un cuadrado. Recortar a círculo antes de subir significa que lo que ves es lo que se muestra — sin el recorte sorpresa de la plataforma que te corta la parte superior de la cabeza.",
            "Los logos y distintivos se benefician por la misma razón. Una marca circular sobre una página con color parece intencionada; un logo cuadrado con un fondo que no coincide parece una pegatina colocada a lo bruto. Los sistemas de diseño especifican cada vez más huecos de avatar circulares precisamente porque el círculo resulta neutro sobre cualquier fondo.",
            "La impresión y el merchandising lo usan de otra manera: las plantillas de pegatinas circulares, los chapas y los posavasos necesitan el diseño acotado por un círculo. Generar el PNG con transparencia al diámetro correcto ahorra una ronda de enmascarado manual.",
          ],
        },
        {
          heading: "Privacidad y procesado local",
          paragraphs: [
            "Las fotos de perfil son personales por naturaleza — a menudo caras tuyas, de familia o de colegas. Hacer el recorte localmente en tu navegador significa que esos píxeles nunca salen de tu dispositivo; no hay paso de subida que pueda registrar, cachear o retener la imagen.",
            "El modelo de procesado es simple e inspeccionable: la imagen se decodifica en un lienzo, se aplica una máscara circular con canal alfa y el resultado se recodifica a PNG en la misma sesión. Nada se guarda entre visitas.",
            "Un consejo de flujo: guarda la foto cuadrada original antes de recortar. El círculo descarta las esquinas de forma permanente, y la única forma de cambiar el encuadre después es empezar de nuevo desde la fuente sin recortar.",
          ],
        },
      ],
    },
    pt: {
      name: "Corte circular",
      tagline:
        "Recorte uma imagem ou um lote em um círculo centralizado com cantos transparentes — controle de redução, pré-visualização ao vivo, PNG sem perdas.",
      intro: [
        "Avatares circulares, fotos de perfil, emblemas e figurinhas começam com um corte circular. A ferramenta centraliza um círculo em cada imagem, mantém o interior e descarta os cantos como transparência — o diâmetro parte do lado menor, e um controle o reduz em porcentagem se você quiser margem.",
        "A saída é sempre PNG, então os cantos ficam realmente transparentes, não brancos. Solte um lote inteiro para converter várias imagens de uma vez, veja a pré-visualização da primeira ao vivo e baixe cada círculo separadamente.",
      ],
      steps: [
        "Solte uma imagem ou um lote inteiro.",
        "Arraste o controle de redução se quiser o círculo menor que o lado menor.",
        "Confira a pré-visualização ao vivo da primeira imagem.",
        "Corte todas em círculos e baixe cada PNG.",
      ],
      faqs: [
        {
          q: "O que determina o tamanho do círculo?",
          a: "Por padrão o diâmetro é igual ao lado menor da imagem: uma imagem quadrada vira um círculo completo e uma retangular é cortada no maior círculo centrado que cabe. O controle de redução diminui esse diâmetro em porcentagem.",
        },
        {
          q: "Os cantos ficam brancos?",
          a: "Não — a saída é PNG com canal alfa real, então a área fora do círculo é totalmente transparente e o resultado assenta limpo em qualquer fundo.",
        },
        {
          q: "Minha imagem é recodificada e perde qualidade?",
          a: "Os pixels dentro do círculo são copiados como estão para um PNG sem perdas. Só a área externa desaparece; nada internamente é redimensionado ou recomprimido.",
        },
      ],
      deepDive: [
        {
          heading: "Em que um recorte circular difere de um retangular",
          paragraphs: [
            "Um recorte retangular apenas move uma janela sobre os pixels e mantém o que fica dentro. Um recorte circular não pode se limitar a isso, porque as imagens são grades retangulares: o círculo precisa ser desenhado adicionando transparência fora de sua borda. Por isso um avatar circular sempre é salvo em PNG — o JPG não tem canal alfa e transformaria o exterior do círculo num quadrado sólido de cor.",
            "O círculo inscrito toca o ponto médio de cada lado, então o diâmetro equivale ao menor entre largura e altura. Os cantos simplesmente são descartados. Se o seu assunto não está centralizado, mova ou recorte antes a fonte: nenhuma ferramenta circular recupera pixels que caem fora do raio.",
            "As bordas também importam: um círculo cortado sem anti-aliasing parece serrilhado na tela. Suavizar a borda com transparência parcial em alguns pixels é o que separa um resultado limpo de um claramente caseiro, e só funciona em PNG.",
          ],
        },
        {
          heading: "Onde o recorte circular é esperado",
          paragraphs: [
            "Avatares e fotos de perfil são o grande caso de uso: a maioria das redes sociais, fóruns e apps de mensagem exibe imagens de perfil como círculos, e muitas as recortam para círculo por conta própria se você envia um quadrado. Recortar para círculo antes de enviar significa que o que você vê é o que aparece — sem o recorte surpresa da plataforma que corta o topo da sua cabeça.",
            "Logos e emblemas se beneficiam pelo mesmo motivo. Uma marca circular sobre uma página colorida parece intencional; um logo quadrado com fundo destoante parece um adesivo colado de qualquer jeito. Sistemas de design cada vez mais especificam espaços de avatar circulares justamente porque o círculo parece neutro em qualquer fundo.",
            "Impressão e brindes usam de outra maneira: modelos de adesivos circulares, botton pins e porta-copos precisam do design delimitado por um círculo. Gerar o PNG com transparência no diâmetro certo economiza uma rodada de mascaramento manual depois.",
          ],
        },
        {
          heading: "Privacidade e processamento local",
          paragraphs: [
            "Fotos de perfil são pessoais por natureza — muitas vezes rostos seus, de família ou colegas. Fazer o recorte localmente no navegador significa que esses pixels nunca saem do seu dispositivo; não há etapa de envio que possa registrar, armazenar em cache ou reter a imagem.",
            "O modelo de processamento é simples e inspecionável: a imagem é decodificada numa tela, uma máscara circular com canal alfa é aplicada e o resultado é recodificado em PNG na mesma sessão. Nada é guardado entre visitas.",
            "Uma dica de fluxo: guarde a foto quadrada original antes de recortar. O círculo descarta os cantos permanentemente, e a única forma de mudar o enquadramento depois é recomeçar da fonte sem recorte.",
          ],
        },
      ],
    },
  },
});
