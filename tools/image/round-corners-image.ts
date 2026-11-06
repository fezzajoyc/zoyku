import { ImageRoundEngine } from "../_engines/image-engine-round";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "round-corners-image",
  category: "image",
  icon: "crop",
  engine: { component: ImageRoundEngine },
  related: ["crop-image", "image-resizer", "watermark-image", "grayscale-image", "image-compressor", "image-border", "image-splitter", "compress-image-to-size", "crop-circle-image", "heic-to-jpg"],
  copy: {
    en: {
      name: "Round Image Corners",
      tagline:
        "Give one image or a whole batch rounded corners — transparent PNG corners or a solid color, live preview, output in PNG or JPG. Runs in your browser.",
      intro: [
        "Rounded corners soften screenshots, avatars and product shots without opening an editor. Drop one image or a whole batch, drag the radius slider and watch the preview update live — the radius goes all the way to a full circle, capped at half of the shorter side.",
        "Choose whether the clipped corners stay transparent (PNG) or get filled with a solid color, which is also what JPG output needs since it has no alpha channel. Every file is processed on your device and downloaded individually.",
      
        "Clipping uses the canvas path: the image is drawn normally, then a rounded-rectangle path erases everything outside the radius. The slider caps at half the shorter side because a larger radius is geometrically impossible — at that point the shape is a full circle or ellipse, handled by the circle-crop tool instead.",
        "Compared with CSS border-radius (which only affects on-screen rendering), the rounding is baked into the pixels, so the image looks rounded in print, in chat previews and on platforms that strip styling. Unlike an editor's selection-and-invert flow, one slider produces the same radius across a whole batch.",
      ],
      steps: [
        "Drop in one image or a whole batch.",
        "Drag the radius slider — the preview shows the first image live.",
        "Pick transparent or solid-color corners and the output format.",
        "Round them all and download each result.",
      ],
      faqs: [
        {
          q: "Can the corners be transparent instead of white?",
          a: "Yes — pick PNG output and the Transparent option, and the corners stay see-through. JPG has no alpha channel, so it always fills the corners with the solid color you chose.",
        },
        {
          q: "The same radius looks different on each image — why?",
          a: "The slider sets the radius in pixels, and every file is rounded with exactly that radius, clamped to half of its own shorter side. For a uniform look across differently sized images, match their sizes first (for example with the image resizer).",
        },
        {
          q: "Does rounding reduce image quality?",
          a: "Only the corners are touched — the pixels inside stay untouched. PNG output is lossless, while JPG is re-encoded at high quality, which can shift the file size a little either way.",
        },
      ],
      deepDive: [
        {
          heading: "How rounded corners actually work",
          paragraphs: [
            "Images are rectangular by nature, so a rounded corner is not something an image \"has\" — it is transparency carved out of the four corners. The rounding is done with an alpha channel: pixels inside the quarter-circle stay opaque, pixels outside become fully transparent, and the few pixels on the arc itself get partial transparency to smooth the curve.",
            "This is why the output must be PNG (or WebP with alpha): JPG cannot store transparency, so it would fill the carved corners with a solid color and the rounding would be fake — a visible white or black square edge on any non-matching background.",
            "The radius decides the character: a small radius reads as a subtle modern touch, a radius of half the shorter side turns the whole image into a pill or circle. Matching the radius to the design system's border-radius values keeps screenshots consistent with the UI around them.",
          ],
        },
        {
          heading: "Where rounded corners matter in real layouts",
          paragraphs: [
            "Design systems round almost everything: cards, buttons, avatars, image tiles. A sharp-cornered screenshot dropped into a rounded card looks like an artifact from another era; rounding the screenshot to the same radius makes it feel native to the layout.",
            "Presentations and documentation benefit similarly: rounded screenshots read as deliberate design, while square ones read as raw pastes. The few pixels of transparency also let the page or slide background show through, tying the image to its surroundings.",
            "For social media and messaging, rounded corners borrow credibility from app UI — images that look like they came from a polished product get taken more seriously than hard-edged raw captures. The effect is small but consistent.",
          ],
        },
        {
          heading: "Local processing and workflow notes",
          paragraphs: [
            "The rounding runs entirely in your browser: the image is decoded, the corner mask is applied, and the transparent PNG is generated on your device. Nothing is uploaded — relevant when the screenshots being rounded show internal tools, client data or personal context.",
            "Batch mode handles the common case: a documentation set where every screenshot needs the same radius. Apply one radius to the whole folder and download the results, rather than re-typing the value per image.",
            "Keep the square original. Corner pixels are permanently removed, so if the radius choice changes later — a design system update, a different platform — the only path is re-rounding from the un-cropped source, not from the already-rounded output.",
          ],
        },
      ],
    },
    zh: {
      name: "图片圆角",
      tagline:
        "给一张或多张图片加上圆角——角可以透明(PNG)或填充纯色,实时预览,输出 PNG 或 JPG,全部在浏览器本地完成。",
      intro: [
        "圆角能让截图、头像和产品图看起来更柔和,不必打开编辑器。拖入一张或多张图片,拉动半径滑块即可实时预览——半径最大可到正圆,上限是短边的一半。",
        "裁掉的角可以保持透明(PNG),也可以填充纯色;JPG 没有透明通道,必须用纯色填充。每个文件都在你的设备上处理,逐张下载。",
      ],
      steps: [
        "拖入一张或多张图片。",
        "拉动半径滑块,预览区实时显示第一张图的效果。",
        "选择透明角或纯色角,以及输出格式。",
        "一键批量处理,逐张下载结果。",
      ],
      faqs: [
        {
          q: "角可以是透明的吗?",
          a: "可以。选择 PNG 输出和「透明」选项,四角就是透明的。JPG 没有透明通道,只能用你选的纯色填充四角。",
        },
        {
          q: "同样的半径在不同图上看起来不一样?",
          a: "滑块设定的是像素半径,每张图都按这个半径处理,上限是各自短边的一半。如果想让尺寸不同的图片看起来一致,先用改尺寸工具把它们调成一样大。",
        },
        {
          q: "加圆角会降低画质吗?",
          a: "只有四个角被改动,内部的像素原样保留。PNG 输出无损;JPG 会以高质量重新编码,体积可能略有变化。",
        },
      ],
      deepDive: [
        {
          heading: "圆角到底是怎么实现的",
          paragraphs: [
            "图片天生是矩形的,所以圆角不是图片“自带”的属性——而是从四个角落抠出来的透明。圆角靠透明通道实现:四分之一圆内的像素保持不透明,圆外的完全透明,弧线上的少数像素用部分透明来平滑曲线。",
            "这就是为什么输出必须是 PNG(或带透明的 WebP):JPG 存不了透明,会把抠掉的角填成实色,圆角变成假的——背景颜色对不上时,会看到一圈白边或黑边。",
            "半径决定气质:小半径是含蓄的现代感,半径达到短边一半时,整张图变成药丸形或圆形。把半径对齐设计系统的 border-radius 数值,截图才能和周围的界面风格一致。",
          ],
        },
        {
          heading: "圆角在真实版面里的价值",
          paragraphs: [
            "设计系统把几乎所有东西都做了圆角:卡片、按钮、头像、图块。直角截图放进圆角卡片里,像上一个时代的遗物;把截图圆角调成同样的半径,它就显得和版面融为一体。",
            "幻灯片和文档同理:圆角截图读起来是有意的设计,直角的读起来像原样粘贴。那几像素的透明还能让页面或幻灯片背景透出来,把图片和它所在的环境绑在一起。",
            "在社交媒体和聊天场景,圆角会从应用 UI 借来可信度——看起来像出自打磨过的产品的图片,比硬边的原始截图更受认真对待。效果不大,但稳定存在。",
          ],
        },
        {
          heading: "本地处理与工作流提示",
          paragraphs: [
            "圆角处理完全在浏览器内完成:图片解码、应用圆角蒙版、在你设备上生成带透明的 PNG。什么都不上传——当被处理的截图显示内部工具、客户数据或个人上下文时,这一点很重要。",
            "批量模式处理常见情形:一套文档截图需要统一半径。给整个文件夹应用一个半径然后下载结果,而不是每张图重新输入一遍数值。",
            "保留方角原图。角落像素被永久移除,如果之后改主意——设计系统更新、换平台——唯一的路径是从未裁剪的源图重新做,而不是从已经圆角化的输出上再加工。",
          ],
        },
      ],
    },
    ja: {
      name: "画像の角を丸く",
      tagline:
        "1 枚でもまとめてでも画像の角を丸く加工。角は透明(PNG)または単色で選べ、プレビューはリアルタイム、出力は PNG / JPG。すべてブラウザ内で処理します。",
      intro: [
        "角を丸くするだけで、スクリーンショットやアバター、商品画像がぐっと柔らかくなります。画像を 1 枚でもまとめてでもドロップし、半径スライダーを動かせばプレビューがリアルタイムで更新——最大は正円で、短辺の半分まで設定できます。",
        "切り取られた角は透明のまま(PNG)にも、単色で埋めることもできます。JPG にはアルファチャンネルがないため、必ず単色で埋めます。各ファイルは端末内で処理され、個別にダウンロードします。",
      ],
      steps: [
        "画像を 1 枚でもまとめてでもドロップします。",
        "半径スライダーを動かすと、1 枚目のプレビューがリアルタイムに変わります。",
        "角を透明にするか単色にするか、出力フォーマットを選びます。",
        "一括で丸め、各結果をダウンロードします。",
      ],
      faqs: [
        {
          q: "角を白ではなく透明にできますか?",
          a: "できます。PNG 出力と「透明」を選べば、角は透過したままです。JPG にはアルファチャンネルがないため、選んだ単色で埋められます。",
        },
        {
          q: "同じ半径でも画像によって見え方が違うのは?",
          a: "スライダーはピクセル単位の半径を設定し、各ファイルはその半径(それぞれの短辺の半分を上限)で丸められます。サイズの違う画像で見た目を揃えたい場合は、先にリサイズツールで揃えてください。",
        },
        {
          q: "角を丸めると画質は落ちますか?",
          a: "触るのは四隅だけで、内側のピクセルはそのままです。PNG 出力はロスレス、JPG は高品質で再エンコードされるため、ファイルサイズは前後することがあります。",
        },
      ],
      deepDive: [
        {
          heading: "角丸は実際にはどう実現されるか",
          paragraphs: [
            "画像は本質的に矩形なので、角丸は画像が「持つ」性質ではありません——4 つの隅から透明を切り出したものです。角丸はアルファチャンネルで実現します:四分円の内側のピクセルは不透明のまま、外側は完全に透明、円弧上のわずかなピクセルは部分透明で曲線をなめらかにします。",
            "だから出力は PNG(またはアルファ付き WebP)でなければなりません:JPG は透過を保存できず、切り出した隅を単色で埋めるため、角丸は偽物になります——背景色が合わないと白や黒の四角い縁が見えます。",
            "半径が性格を決めます:小さい半径はさりげないモダンな印象、短辺の半分に達すると画像全体がピル形や円形になります。デザインシステムの border-radius 値に半径を合わせると、スクショが周囲の UI と調和します。",
          ],
        },
        {
          heading: "実際のレイアウトで角丸が効く場面",
          paragraphs: [
            "デザインシステムはほぼすべてに角丸を付けます:カード、ボタン、アバター、画像タイル。角丸のカードに四角いままのスクショを落とすと、別の時代の遺物に見えます。スクショを同じ半径で角丸にすれば、レイアウトに自然に馴染みます。",
            "スライドやドキュメントも同様です:角丸のスクショは意図的なデザインに読め、四角は生の貼り付けに読めます。数ピクセルの透過はページやスライドの背景を透けさせ、画像をその環境に結びつけます。",
            "SNS とメッセージングでは、角丸はアプリ UI から信頼性を借ります——磨かれたプロダクト出身に見える画像は、硬いエッジの生キャプチャより真剣に受け取られます。効果は小さいが一貫しています。",
          ],
        },
        {
          heading: "ローカル処理とワークフローのメモ",
          paragraphs: [
            "角丸処理は完全にブラウザ内で実行されます:画像のデコード、隅のマスク適用、透過 PNG の生成はすべて端末上。アップロードは一切なし——処理するスクショに内部ツール、クライアントデータ、個人的な文脈が写っている場合に重要です。",
            "一括モードは定番のケースを扱います:ドキュメント用スクショ全員が同じ半径を要するセット。画像ごとに値を打ち直すのではなく、フォルダ全体に 1 つの半径を適用して結果をダウンロードします。",
            "四角い元画像を残す。隅のピクセルは永久に失われるため、後で半径を変えたくなったら——デザインシステムの更新、プラットフォームの変更——唯一の道は未加工のソースからのやり直しで、角丸済みの出力からではありません。",
          ],
        },
      ],
    },
    es: {
      name: "Esquinas redondeadas",
      tagline:
        "Redondea las esquinas de una imagen o de un lote entero: transparentes en PNG o de color sólido, vista previa en vivo, salida en PNG o JPG. En tu navegador.",
      intro: [
        "Las esquinas redondeadas suavizan capturas, avatares y fotos de producto sin abrir un editor. Suelta una imagen o un lote entero, mueve el deslizador de radio y mira la vista previa actualizarse en vivo: el radio llega hasta el círculo completo, con tope en la mitad del lado corto.",
        "Elige si las esquinas recortadas quedan transparentes (PNG) o se rellenan con un color sólido, que es lo que necesita la salida JPG al no tener canal alfa. Cada archivo se procesa en tu dispositivo y se descarga por separado.",
      ],
      steps: [
        "Suelta una imagen o un lote entero.",
        "Mueve el deslizador de radio: la vista previa muestra la primera imagen en vivo.",
        "Elige esquinas transparentes o de color, y el formato de salida.",
        "Redondea todo y descarga cada resultado.",
      ],
      faqs: [
        {
          q: "¿Pueden quedar transparentes en vez de blancas?",
          a: "Sí: elige salida PNG y la opción Transparente, y las esquinas quedan translúcidas. JPG no tiene canal alfa, así que siempre rellena las esquinas con el color sólido que elijas.",
        },
        {
          q: "El mismo radio se ve distinto en cada imagen, ¿por qué?",
          a: "El deslizador fija el radio en píxeles y cada archivo se redondea con ese radio exacto, limitado a la mitad de su propio lado corto. Para un aspecto uniforme en imágenes de tamaños distintos, primero iguálalas con el redimensionador.",
        },
        {
          q: "¿Redondear reduce la calidad?",
          a: "Solo se tocan las esquinas: los píxeles interiores quedan intactos. La salida PNG es sin pérdida, mientras que JPG se recodifica con alta calidad, lo que puede mover un poco el tamaño del archivo.",
        },
      ],
      deepDive: [
        {
          heading: "Cómo funcionan realmente las esquinas redondeadas",
          paragraphs: [
            "Las imágenes son rectangulares por naturaleza, así que una esquina redondeada no es algo que la imagen \"tenga\" — es transparencia tallada en los cuatro rincones. El redondeo se hace con un canal alfa: los píxeles dentro del cuarto de círculo siguen opacos, los de fuera se vuelven totalmente transparentes, y los pocos píxeles del propio arco reciben transparencia parcial para suavizar la curva.",
            "Por eso la salida debe ser PNG (o WebP con alfa): el JPG no puede guardar transparencia, así que rellenaría los rincones tallados con un color sólido y el redondeo sería falso — un borde cuadrado blanco o negro visible sobre cualquier fondo que no coincida.",
            "El radio decide el carácter: un radio pequeño se lee como un toque moderno discreto, y un radio de la mitad del lado más corto convierte toda la imagen en una píldora o un círculo. Igualar el radio a los valores de border-radius del sistema de diseño mantiene las capturas coherentes con la interfaz que las rodea.",
          ],
        },
        {
          heading: "Dónde importan las esquinas redondeadas en maquetas reales",
          paragraphs: [
            "Los sistemas de diseño redondean casi todo: tarjetas, botones, avatares, mosaicos de imagen. Una captura de esquinas rectas colocada dentro de una tarjeta redondeada parece un artefacto de otra época; redondear la captura al mismo radio la hace sentirse nativa de la maqueta.",
            "Las presentaciones y la documentación se benefician igual: las capturas redondeadas se leen como diseño deliberado, mientras que las cuadradas se leen como pegados crudos. Los pocos píxeles de transparencia además dejan ver el fondo de la página o diapositiva, atando la imagen a su entorno.",
            "En redes sociales y mensajería, las esquinas redondeadas toman prestada credibilidad de la interfaz de las apps — las imágenes que parecen salidas de un producto pulido se toman más en serio que las capturas crudas de bordes duros. El efecto es pequeño pero consistente.",
          ],
        },
        {
          heading: "Procesado local y notas de flujo",
          paragraphs: [
            "El redondeo ocurre íntegramente en tu navegador: la imagen se decodifica, se aplica la máscara de esquinas y el PNG transparente se genera en tu dispositivo. Nada se sube — relevante cuando las capturas por redondear muestran herramientas internas, datos de clientes o contexto personal.",
            "El modo por lotes resuelve el caso común: un set de documentación donde cada captura necesita el mismo radio. Aplica un radio a toda la carpeta y descarga los resultados, en lugar de reescribir el valor por imagen.",
            "Conserva el original cuadrado. Los píxeles de las esquinas se eliminan de forma permanente, así que si más adelante cambia la elección del radio — una actualización del sistema de diseño, otra plataforma — el único camino es rehacerlo desde la fuente sin recortar, no desde la salida ya redondeada.",
          ],
        },
      ],
    },
    pt: {
      name: "Cantos arredondados",
      tagline:
        "Arredonde os cantos de uma imagem ou de um lote inteiro — cantos transparentes em PNG ou cor sólida, pré-visualização ao vivo, saída em PNG ou JPG. No navegador.",
      intro: [
        "Cantos arredondados deixam capturas de tela, avatares e fotos de produto mais suaves sem abrir um editor. Solte uma imagem ou um lote inteiro, arraste o controle de raio e veja a pré-visualização mudar ao vivo — o raio vai até o círculo completo, limitado à metade do lado menor.",
        "Escolha se os cantos cortados ficam transparentes (PNG) ou recebem uma cor sólida, que é o que a saída JPG precisa por não ter canal alfa. Cada arquivo é processado no seu dispositivo e baixado separadamente.",
      ],
      steps: [
        "Solte uma imagem ou um lote inteiro.",
        "Arraste o controle de raio — a pré-visualização mostra a primeira imagem ao vivo.",
        "Escolha cantos transparentes ou de cor sólida, e o formato de saída.",
        "Arredonde tudo e baixe cada resultado.",
      ],
      faqs: [
        {
          q: "Os cantos podem ficar transparentes em vez de brancos?",
          a: "Sim — escolha saída PNG e a opção Transparente, e os cantos ficam translúcidos. O JPG não tem canal alfa, então sempre preenche os cantos com a cor sólida escolhida.",
        },
        {
          q: "O mesmo raio fica diferente em cada imagem — por quê?",
          a: "O controle define o raio em pixels, e cada arquivo é arredondado com exatamente esse raio, limitado à metade do próprio lado menor. Para um visual uniforme em imagens de tamanhos diferentes, iguale os tamanhos antes (por exemplo com o redimensionador).",
        },
        {
          q: "Arredondar reduz a qualidade da imagem?",
          a: "Só os cantos são tocados — os pixels internos ficam intactos. A saída PNG é sem perdas; o JPG é recodificado em alta qualidade, o que pode mudar um pouco o tamanho do arquivo.",
        },
      ],
      deepDive: [
        {
          heading: "Como os cantos arredondados realmente funcionam",
          paragraphs: [
            "Imagens são retangulares por natureza, então um canto arredondado não é algo que a imagem \"tenha\" — é transparência esculpida nos quatro cantos. O arredondamento é feito com um canal alfa: os pixels dentro do quarto de círculo continuam opacos, os de fora ficam totalmente transparentes, e os poucos pixels do próprio arco recebem transparência parcial para suavizar a curva.",
            "É por isso que a saída precisa ser PNG (ou WebP com alfa): o JPG não consegue guardar transparência, então preencheria os cantos esculpidos com uma cor sólida e o arredondamento seria falso — uma borda quadrada branca ou preta visível em qualquer fundo que não combine.",
            "O raio decide o caráter: um raio pequeno parece um toque moderno discreto, e um raio de metade do lado mais curto transforma a imagem inteira numa pílula ou círculo. Igualar o raio aos valores de border-radius do sistema de design mantém as capturas coerentes com a interface ao redor.",
          ],
        },
        {
          heading: "Onde cantos arredondados importam em layouts reais",
          paragraphs: [
            "Sistemas de design arredondam quase tudo: cartões, botões, avatares, blocos de imagem. Uma captura de cantos retos colocada dentro de um cartão arredondado parece um artefato de outra época; arredondar a captura com o mesmo raio faz com que pareça nativa do layout.",
            "Apresentações e documentação se beneficiam igualmente: capturas arredondadas parecem design deliberado, enquanto as quadradas parecem colagens cruas. Os poucos pixels de transparência também deixam o fundo da página ou do slide aparecer, ligando a imagem ao seu entorno.",
            "Nas redes sociais e mensageiros, os cantos arredondados tomam emprestada a credibilidade da interface dos apps — imagens que parecem vir de um produto polido são levadas mais a sério que capturas cruas de bordas duras. O efeito é pequeno, mas consistente.",
          ],
        },
        {
          heading: "Processamento local e notas de fluxo",
          paragraphs: [
            "O arredondamento acontece inteiramente no seu navegador: a imagem é decodificada, a máscara de cantos é aplicada e o PNG transparente é gerado no seu dispositivo. Nada é enviado — relevante quando as capturas a arredondar mostram ferramentas internas, dados de clientes ou contexto pessoal.",
            "O modo em lote resolve o caso comum: um conjunto de documentação onde toda captura precisa do mesmo raio. Aplique um raio à pasta inteira e baixe os resultados, em vez de redigitar o valor por imagem.",
            "Guarde o original quadrado. Os pixels dos cantos são removidos permanentemente, então se a escolha do raio mudar depois — uma atualização do sistema de design, outra plataforma — o único caminho é refazer a partir da fonte sem recorte, não da saída já arredondada.",
          ],
        },
      ],
    },
  },
});
