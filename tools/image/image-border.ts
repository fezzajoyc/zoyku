import { ImageBorderEngine } from "../_engines/image-engine-border";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "image-border",
  category: "image",
  icon: "crop",
  engine: { component: ImageBorderEngine },
  related: ["image-resizer", "round-corners-image", "watermark-image", "crop-image", "image-compressor", "image-splitter", "compress-image-to-size", "grayscale-image", "crop-circle-image", "heic-to-jpg"],
  copy: {
    en: {
      name: "Image Border",
      tagline:
        "Add a solid-color or transparent border around one image or a whole batch — live preview, PNG or JPG output, runs entirely in your browser.",
      intro: [
        "A border frames screenshots, product shots and avatars without opening an editor. Drop in one image or a whole batch, drag the width slider and pick a padding style: the canvas expands outward, so no pixel of the original is cropped or rescaled.",
        "Transparent padding keeps the frame see-through in PNG output — handy for stickers and cut-outs on any background. A solid color works everywhere, including JPG, and every file is processed on your device.",
      
        "The border is added by expanding the canvas outward rather than painting over the image: a 20 px border on a 1000×800 photo produces a 1040×840 canvas with the original pixels untouched in the center. That means zero resampling — the border is new space, not a stretched frame.",
        "Compared with CSS borders or screenshot annotations, the frame is baked into the file itself, so it survives uploads to platforms that strip styling or re-render images. And unlike an editor's canvas-resize dialog, the width slider shows a live preview and the batch applies to every loaded image in one click.",
      ],
      steps: [
        "Drop in one image or a whole batch.",
        "Drag the border width slider and watch the live preview.",
        "Choose transparent padding or a solid color, and PNG or JPG output.",
        "Add borders to all images and download each result, or grab one ZIP.",
      ],
      faqs: [
        {
          q: "Does the border shrink or crop my image?",
          a: "No. The canvas grows by twice the border width — one border on every side — and your image is placed inside at full size. Nothing is cropped, scaled or moved.",
        },
        {
          q: "When should I pick a transparent border?",
          a: "Transparent padding only makes sense in PNG output: the frame stays see-through so the image works on any background. JPG has no alpha channel, so there the border is filled with the solid color you chose.",
        },
        {
          q: "Why is JPG not available with transparent padding?",
          a: "JPG cannot store transparency — saving would turn the frame white. The tool switches to PNG automatically whenever transparent padding is selected; pick the Color option if you want a JPG.",
        },
      ],
      deepDive: [
        {
          heading: "Padding versus scaling: why the canvas grows outward",
          paragraphs: [
            "The most common confusion with image borders is what happens to the pixels underneath. Some editors apply a border as an overlay that eats into the image, effectively shrinking what is visible. This tool does the opposite: it expands the canvas outward, so a 20 px border on a 1000×800 photo produces a 1040×840 result with the original pixels untouched in the center.",
            "Zero resampling is the practical benefit. Nothing is stretched, scaled or re-encoded at a new size, so a border never softens the image the way an aggressive upscale can. The pixels you had are the pixels you keep; the border is purely new space around them.",
            "Because the border width applies on all four sides, the total dimension grows by twice the slider value in each direction. Watching the live preview as you drag the slider makes the trade-off obvious: wide borders eat into surrounding layout space, which matters when you are fitting a screenshot into a fixed-width blog column.",
          ],
        },
        {
          heading: "Transparent padding, PNG alpha and the JPG exception",
          paragraphs: [
            "Transparency in a border sounds exotic but solves a real problem: stickers, cut-outs and overlay assets must sit on any background without a visible white or black rectangle around them. PNG stores an alpha channel, so a transparent border stays genuinely see-through after saving.",
            "JPG simply has no alpha channel — it was designed for photographs, where every pixel has a color. Saving a transparent border as JPG would force it to a flat color, usually white. That is why the tool switches to PNG automatically when transparent padding is selected, and why the JPG option stays available only when you pick a solid color.",
            "A related trick for social posts: instead of transparent, choose a solid border in the background color of the page or feed you are posting to. A border that matches the destination background reads as generous white space rather than a frame, and it keeps the JPG workflow intact.",
          ],
        },
        {
          heading: "Batch workflows, baked-in frames and privacy",
          paragraphs: [
            "Framing screenshots for documentation or a product gallery is repetitive work: every image needs the same width, the same color. The batch mode applies one slider value to every loaded file and hands back each result plus an optional ZIP, which turns a per-image editor task into a single click.",
            "A baked-in frame also survives places a CSS border does not. Platforms that re-render uploaded images, chat apps that strip styling, and markdown renderers all keep the pixels of the file itself — so the frame travels with the image wherever it is posted.",
            "As with everything on this site, processing happens entirely in your browser. No image is uploaded to a server: the files are decoded and re-encoded locally, which matters for product photos under NDA, client work or anything you simply do not want leaving your device.",
          ],
        },
      ],
    },
    zh: {
      name: "图片加边框",
      tagline:
        "给一张或多张图片加纯色或透明边框,实时预览,输出 PNG 或 JPG,画布向外扩展、原图不被裁剪,全程浏览器本地完成。",
      intro: [
        "边框能让截图、产品图和头像更完整,不必打开编辑器。拖入一张或多张图片,拖动宽度滑块并选择边框样式:画布向四周各扩展一个边宽,原图一个像素都不会被裁剪或缩放。",
        "透明边框在 PNG 输出下保持透空,适合贴纸和抠图素材;纯色边框任何场景都适用,JPG 也支持。所有处理都在你的设备上完成。",
      ],
      steps: [
        "拖入一张或多张图片。",
        "拖动边框宽度滑块,实时预览效果。",
        "选择透明边框或纯色边框,以及 PNG / JPG 输出。",
        "批量加边框,逐张下载,或打包成一个 ZIP。",
      ],
      faqs: [
        {
          q: "加边框会裁剪或缩小原图吗?",
          a: "不会。画布向四周各扩展一个边宽,原图完整放入中间,不做任何裁剪、缩放或位移。",
        },
        {
          q: "什么时候选透明边框?",
          a: "透明边框只在 PNG 输出下有意义:边框保持透空,放在任何背景上都自然。JPG 没有透明通道,只能用所选纯色填充。",
        },
        {
          q: "为什么透明边框不能选 JPG?",
          a: "JPG 不支持透明,保存后边框会变成白色。选择「透明」时工具会自动改用 PNG;想输出 JPG 请选「纯色」。",
        },
      ],
      deepDive: [
        {
          heading: "扩边不缩图:画布为什么向外生长",
          paragraphs: [
            "给图片加边框最常见的疑问是:原来的像素会怎样?有些编辑器把边框当覆盖层,会“吃掉”一圈画面,相当于缩小了可见内容。本工具相反:画布向四周扩展,1000×800 的照片加 20 px 边框得到 1040×840 的结果,原图像素在中央原封不动。",
            "零重采样是实际的好处。不拉伸、不缩放、不按新尺寸重新编码,边框不会像激进放大那样让画面变糊。你原有的像素就是保留下来的像素,边框只是围绕它们新增的一圈空间。",
            "因为四条边都加同一边宽,总尺寸在每个方向上增长两倍滑块值。拖动滑块时看实时预览就能直观感受取舍:边框越宽,越占版面空间——把截图放进固定宽度的博客栏目时尤其要注意。",
          ],
        },
        {
          heading: "透明边框、PNG 透明通道与 JPG 的例外",
          paragraphs: [
            "透明边框听起来少见,却解决真问题:贴纸、抠图素材和叠加元素必须放在任意背景上都不出现白框或黑框。PNG 支持透明通道,保存后边框区域保持真正的透空。",
            "JPG 从设计上就没有透明通道——它面向照片,每个像素必须有颜色。把透明边框存成 JPG 会强制变成一种平色,通常是白色。所以选了透明边框时工具会自动切到 PNG;只有选纯色边框时才提供 JPG 输出。",
            "一个社交发图的变通用法:不选透明,而是选一个与你发布页面或信息流背景同色的边框。与目标背景一致的边框看起来是留白而不是画框,还能保留 JPG 工作流。",
          ],
        },
        {
          heading: "批量工作流、随文件走的边框与隐私",
          paragraphs: [
            "给文档或商品图集配截图边框是重复劳动:每张图同样的宽度、同样的颜色。批量模式把一个滑块值应用到所有已加载文件,逐张返回结果并支持打包 ZIP,把逐张编辑变成一次点击。",
            "烘焙进文件的边框也能在 CSS 边框失效的地方存活。重新渲染上传图片的平台、剔除样式的聊天工具、Markdown 渲染器,保住的永远是文件本身的像素——边框跟着图片走到哪都还在。",
            "和站内所有工具一样,处理完全在浏览器内完成。没有任何图片上传到服务器:文件在本地解码、再编码,这对涉密产品图、客户交付物或任何不想离开设备的内容都很重要。",
          ],
        },
      ],
    },
    ja: {
      name: "画像に枠を追加",
      tagline:
        "1 枚でもまとめてでも画像に単色または透明の枠を追加。リアルタイムプレビュー、出力は PNG / JPG、キャンバスは外側に広がり元画像は切り抜かれません。",
      intro: [
        "枠を付けるだけで、スクリーンショット・商品画像・アバターが引き締まります。画像を 1 枚でもまとめてでもドロップし、幅スライダーとスタイルを選ぶだけ——キャンバスは外側に拡張され、元のピクセルは 1 つも切り取られず縮小もされません。",
        "透明の枠は PNG 出力で透過したままになり、ステッカーや切り抜き素材に便利です。単色ならどんな場面でも使え、JPG にも対応します。処理はすべて端末内で行われます。",
      ],
      steps: [
        "画像を 1 枚でもまとめてでもドロップします。",
        "幅スライダーを動かすと、プレビューがリアルタイムに変わります。",
        "透明または単色の枠、出力フォーマット(PNG / JPG)を選びます。",
        "一括で枠を付け、各結果をダウンロード——ZIP 一括保存も可能です。",
      ],
      faqs: [
        {
          q: "枠を付けると画像は切り抜かれますか?",
          a: "いいえ。キャンバスが各辺 1 枠ぶん広がり、元画像はそのままのサイズで中央に置かれます。切り抜きも縮小も移動もありません。",
        },
        {
          q: "透明の枠はどんなときに使いますか?",
          a: "透明な枠は PNG 出力でのみ意味があります。枠が透過したままなので、どんな背景にもなじみます。JPG にはアルファがないため、選んだ単色で埋められます。",
        },
        {
          q: "透明枠なのに JPG を選べないのは?",
          a: "JPG は透過を保存できず、枠が白くなってしまいます。「透明」を選ぶと自動で PNG に切り替わります。JPG が必要な場合は「単色」を選んでください。",
        },
      ],
      deepDive: [
        {
          heading: "拡張は外側へ:キャンバスが大きくなる理由",
          paragraphs: [
            "画像の枠付けでよくある混乱は「元のピクセルがどうなるか」です。オーバーレイで枠を重げるエディタは画像を内側から削り、見える範囲が狭まる。このツールは逆で、キャンバスを外側へ拡張します:1000×800 の写真に 20 px の枠を付けると 1040×840 になり、元のピクセルは中央にそのまま残ります。",
            "リサンプリングゼロが実用上の利点です。引き伸ばし・縮小・新しいサイズでの再エンコードが一切なく、無理な拡大で起こるぼやけが枠付けで起きません。元のピクセルはそのまま保たれ、枠は純粋に周囲の新しい空間です。",
            "四辺すべてに同じ幅を付けるため、全体サイズは各方向でスライダー値の2倍ずつ増えます。スライダーを動かしながらプレビューを見ればトレードオフが分かり、固定幅のブログ列にスクリーンショットを収める場合などに注意すべき点も見えてきます。",
          ],
        },
        {
          heading: "透過パディングと PNG・JPG の違い",
          paragraphs: [
            "透過する枠は一見ニッチですが、実際の問題を解決します:ステッカーや切り抜き素材、重ね合わせ素材は、どんな背景に置いても白や黒の四角形が見えては困ります。PNG はアルファチャンネルを持つため、透過枠は保存後も本当に透けたままです。",
            "JPG にはアルファチャンネルがありません。写真向けに設計され、全ピクセルが色を持つ前提だからです。透過枠を JPG で保存すると平色(通常は白)に置き換わるため、透過パディング選択時はツールが自動で PNG に切り替え、JPG は単色を選んだ場合のみ選択できます。",
            "SNS 投稿の応用技:透過ではなく、投稿先のページやフィードの背景色と同じ単色の枠を選ぶ方法があります。背景に馴染む枠は「フレーム」ではなく余白のように見え、JPG ワークフローも保てます。",
          ],
        },
        {
          heading: "一括処理、ファイルに焼き込まれる枠、プライバシー",
          paragraphs: [
            "ドキュメントや商品ギャラリー用のスクリーンショット枠付けは繰り返し作業です:全画像に同じ幅・同じ色。一括モードでは 1 つのスライダー値が読み込んだ全ファイルに適用され、結果は個別ダウンロードと ZIP に対応し、1枚ずつ編集する作業がワンクリックになります。",
            "ファイルに焼き込まれた枠は、CSS 枠が効かない場所でも生き残ります。アップロード画像を再レンダリングするプラットフォーム、スタイルを落とすチャットアプリ、Markdown レンダラーが保持するのはファイル自体のピクセルです。",
            "このサイトの全ツールと同様、処理はブラウザ内だけで完結します。画像はサーバーにアップロードされず、ローカルでデコード・再エンコードされます。社外秘の商品写真やクライアント納品物に安心して使えます。",
          ],
        },
      ],
    },
    es: {
      name: "Borde de imagen",
      tagline:
        "Añade un borde de color sólido o transparente a una imagen o a un lote: vista previa en vivo, salida en PNG o JPG, todo en tu navegador.",
      intro: [
        "Un borde enmarca capturas, fotos de producto y avatares sin abrir un editor. Suelta una imagen o un lote entero, mueve el deslizador de ancho y elige el estilo: el lienzo se expande hacia fuera, así que no se recorta ni reescala ni un píxel del original.",
        "El relleno transparente deja el marco translúcido en la salida PNG, ideal para pegatinas y recortes sobre cualquier fondo. El color sólido funciona en todos los casos, incluido JPG, y todo se procesa en tu dispositivo.",
      ],
      steps: [
        "Suelta una imagen o un lote entero.",
        "Mueve el deslizador de ancho y mira la vista previa en vivo.",
        "Elige relleno transparente o color sólido, y salida PNG o JPG.",
        "Añade bordes a todo y descarga cada resultado, o llévatelos en un ZIP.",
      ],
      faqs: [
        {
          q: "¿El borde recorta o reduce mi imagen?",
          a: "No. El lienzo crece el doble del ancho del borde —uno por lado— y tu imagen se coloca dentro a tamaño completo. Nada se recorta, escala ni desplaza.",
        },
        {
          q: "¿Cuándo conviene un borde transparente?",
          a: "El relleno transparente solo tiene sentido en PNG: el marco queda translúcido y la imagen encaja en cualquier fondo. JPG no tiene canal alfa, así que allí el borde se rellena con el color sólido elegido.",
        },
        {
          q: "¿Por qué no hay JPG con relleno transparente?",
          a: "JPG no puede guardar transparencia: al guardar, el marco sería blanco. La herramienta cambia a PNG automáticamente con relleno transparente; elige Color si quieres un JPG.",
        },
      ],
      deepDive: [
        {
          heading: "Relleno hacia fuera: por qué crece el lienzo",
          paragraphs: [
            "La duda más habitual al enmarcar una imagen es qué pasa con los píxeles de debajo. Algunos editores aplican el borde como una capa superpuesta que se come la imagen y reduce lo visible. Esta herramienta hace lo contrario: expande el lienzo hacia fuera, así que un borde de 20 px sobre una foto de 1000×800 produce un resultado de 1040×840 con los píxeles originales intactos en el centro.",
            "El beneficio práctico es el remuestreo cero. Nada se estira, se escala o se recodifica a otro tamaño, así que el borde nunca suaviza la imagen como puede hacerlo una ampliación agresiva. Los píxeles que tenías son los que conservas; el borde es solo espacio nuevo a su alrededor.",
            "Como el ancho se aplica a los cuatro lados, la dimensión total crece el doble del valor del deslizador en cada dirección. Arrastrar el deslizador con la vista previa en vivo deja claro el compromiso: los bordes anchos ocupan espacio de maquetación, algo importante al encajar una captura en una columna de blog de ancho fijo.",
          ],
        },
        {
          heading: "Relleno transparente, canal alfa y la excepción del JPG",
          paragraphs: [
            "Un borde transparente suena raro pero resuelve un problema real: pegatinas, recortes y recursos superpuestos deben verse bien sobre cualquier fondo sin un rectángulo blanco o negro alrededor. PNG guarda un canal alfa, así que un borde transparente sigue siendo transparente tras guardar.",
            "El JPG no tiene canal alfa: fue diseñado para fotografías, donde cada píxel tiene un color. Guardar un borde transparente como JPG lo convertiría en un color plano, normalmente blanco. Por eso la herramienta cambia a PNG automáticamente al elegir relleno transparente, y el JPG solo está disponible con color sólido.",
            "Un truco para redes: en vez de transparente, elige un borde sólido del mismo color que el fondo de la página o el feed donde vas a publicar. Un borde que coincide con el fondo se lee como espacio en blanco y no como marco, y conserva el flujo de trabajo JPG.",
          ],
        },
        {
          heading: "Lotes, marcos que viajan con el archivo y privacidad",
          paragraphs: [
            "Enmarcar capturas para documentación o una galería de productos es trabajo repetitivo: todas las imágenes con el mismo ancho y color. El modo por lotes aplica un único valor a todos los archivos cargados y devuelve cada resultado, más un ZIP opcional: convierte una tarea de edición por imagen en un clic.",
            "Un marco horneado en el archivo también sobrevive donde un borde CSS no llega. Las plataformas que re-renderizan las imágenes subidas, las apps de chat que eliminan estilos y los renderizadores de Markdown conservan los píxeles del propio archivo, así que el marco acompaña a la imagen a todas partes.",
            "Como en todo el sitio, el procesado ocurre íntegramente en tu navegador. Ninguna imagen se sube a un servidor: los archivos se decodifican y recodifican localmente, lo que importa para fotos de producto bajo confidencialidad o cualquier material que no quieras sacar de tu dispositivo.",
          ],
        },
      ],
    },
    pt: {
      name: "Borda de imagem",
      tagline:
        "Adicione uma borda de cor sólida ou transparente a uma imagem ou a um lote — pré-visualização ao vivo, saída em PNG ou JPG, tudo no navegador.",
      intro: [
        "Uma borda emoldura capturas de tela, fotos de produto e avatares sem abrir um editor. Solte uma imagem ou um lote inteiro, arraste o controle de largura e escolha o estilo: a tela se expande para fora, então nenhum pixel do original é cortado ou redimensionado.",
        "O preenchimento transparente mantém a moldura translúcida na saída PNG — ótimo para figurinhas e recortes em qualquer fundo. A cor sólida funciona em todo caso, inclusive JPG, e tudo é processado no seu dispositivo.",
      ],
      steps: [
        "Solte uma imagem ou um lote inteiro.",
        "Arraste o controle de largura e veja a pré-visualização ao vivo.",
        "Escolha preenchimento transparente ou cor sólida, e saída PNG ou JPG.",
        "Aplique bordas em todas e baixe cada resultado, ou tudo em um ZIP.",
      ],
      faqs: [
        {
          q: "A borda corta ou reduz minha imagem?",
          a: "Não. A tela cresce o dobro da largura da borda — uma em cada lado — e a imagem é colocada dentro em tamanho integral. Nada é cortado, redimensionado ou deslocado.",
        },
        {
          q: "Quando escolher borda transparente?",
          a: "O preenchimento transparente só faz sentido em PNG: a moldura fica translúcida e a imagem serve para qualquer fundo. O JPG não tem canal alfa, então ali a borda é preenchida com a cor sólida escolhida.",
        },
        {
          q: "Por que não há JPG com preenchimento transparente?",
          a: "O JPG não guarda transparência — ao salvar, a moldura ficaria branca. A ferramenta muda para PNG automaticamente com preenchimento transparente; escolha Cor para ter um JPG.",
        },
      ],
      deepDive: [
        {
          heading: "Preenchimento para fora: por que a tela cresce",
          paragraphs: [
            "A dúvida mais comum ao enquadrar uma imagem é o que acontece com os pixels de baixo. Alguns editores aplicam a borda como camada sobreposta que rouba parte da imagem e reduz o que aparece. Esta ferramenta faz o oposto: expande a tela para fora, então uma borda de 20 px sobre uma foto de 1000×800 resulta em 1040×840 com os pixels originais intactos no centro.",
            "O benefício prático é a reamostragem zero. Nada é esticado, escalado ou recodificado em outro tamanho, então a borda nunca suaviza a imagem como uma ampliação agressiva pode fazer. Os pixels que você tinha são os que ficam; a borda é apenas espaço novo ao redor.",
            "Como a largura vale para os quatro lados, a dimensão total cresce o dobro do valor do controle em cada direção. Arrastar o controle com a pré-visualização ao vivo deixa claro o compromisso: bordas largas ocupam espaço de layout, o que importa ao encaixar uma captura numa coluna de blog de largura fixa.",
          ],
        },
        {
          heading: "Preenchimento transparente, canal alfa e a exceção do JPG",
          paragraphs: [
            "Uma borda transparente parece exótica, mas resolve um problema real: figurinhas, recortes e recursos sobrepostos precisam funcionar em qualquer fundo sem um retângulo branco ou preto ao redor. O PNG guarda um canal alfa, então o preenchimento transparente continua transparente depois de salvar.",
            "O JPG não tem canal alfa: foi projetado para fotografias, onde cada pixel tem uma cor. Salvar uma borda transparente em JPG a transformaria em cor chapada, normalmente branca. Por isso a ferramenta muda para PNG automaticamente quando o preenchimento transparente é escolhido, e o JPG só fica disponível com cor sólida.",
            "Um truque para redes sociais: em vez de transparente, escolha uma borda sólida na cor do fundo da página ou do feed onde vai publicar. Uma borda que combina com o fundo parece espaço em branco, não moldura, e mantém o fluxo JPG.",
          ],
        },
        {
          heading: "Lotes, molduras que viajam com o arquivo e privacidade",
          paragraphs: [
            "Enquadrar capturas para documentação ou galeria de produtos é trabalho repetitivo: todas as imagens com a mesma largura e cor. O modo em lote aplica um único valor a todos os arquivos carregados e devolve cada resultado, além de um ZIP opcional: uma tarefa de edição por imagem vira um clique.",
            "Uma moldura embutida no arquivo também sobrevive onde uma borda CSS não chega. Plataformas que re-renderizam imagens enviadas, apps de chat que removem estilos e renderizadores de Markdown preservam os pixels do próprio arquivo, então a moldura acompanha a imagem aonde ela for.",
            "Como em todo o site, o processamento acontece inteiramente no seu navegador. Nenhuma imagem é enviada a um servidor: os arquivos são decodificados e recodificados localmente, o que importa para fotos de produto sob confidencialidade ou qualquer material que você não queira deixar sair do seu dispositivo.",
          ],
        },
      ],
    },
  },
});
