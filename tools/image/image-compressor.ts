import { ImageCanvasEngine } from "../_engines/image-engine-canvas";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "image-compressor",
  featured: true,
  category: "image",
  icon: "image",
  engine: {
    component: ImageCanvasEngine,
    props: { op: "compress", accept: "image/*", defaultFormat: "image/jpeg", defaultQuality: 0.7, suffix: "-min" },
  },
  related: ["convert-image", "image-resizer", "webp-converter", "png-to-jpg", "image-border", "image-splitter", "compress-image-to-size", "grayscale-image", "crop-circle-image", "crop-image"],
  copy: {
    en: {
      name: "Image Compressor",
      tagline:
        "Compress JPG, PNG and WebP images with a live quality slider, batch processing and instant before/after sizes — all in your browser.",
      intro: [
        "Drop one image or a whole batch and watch the file sizes fall in real time. A quality slider from 10% to 100% lets you balance weight against crispness, and every row shows the original size next to the compressed result so you know exactly what you saved.",
        "Output can be JPG (smallest for photos), WebP (usually 20–30% smaller than JPG at the same quality) or PNG (lossless). Everything runs on your device with the browser's own image encoder — no uploads, no queue, no watermark.",
      
        "Compression happens through the browser's built-in encoders: canvas.toBlob for JPG and WebP, and PNG re-encoding for lossless output. Quality maps directly to the encoder's quantization — 80% JPG typically yields visually identical results at 40–60% of the original size for photos, with diminishing returns below 30%.",
        "Compared with upload-based compressors, there is no queue, no file-size cap and no daily limit — a 20 MB RAW export compresses as readily as a thumbnail. And unlike setting a fixed quality for everything, the per-file before/after readout lets you spot the one file that did not shrink and adjust it individually.",
      ],
      steps: [
        "Drop your images into the box (or click to browse) — as many as you like.",
        "Pick an output format and drag the quality slider until the size column looks right.",
        "Download each compressed image, or grab them all at once.",
      ],
      faqs: [
        {
          q: "Why does compressing a JPEG twice make it look worse?",
          a: "JPEG is lossy: every save discards detail that cannot be recovered. Compressing an already-compressed JPEG adds new artifacts on top of the old ones. For best results, always compress from the original file and avoid re-saving JPEGs repeatedly.",
        },
        {
          q: "Which format gives the smallest files?",
          a: "For photos, WebP is usually 20–30% smaller than JPEG at the same visual quality, and JPEG beats PNG. PNG only wins for flat graphics, screenshots and logos with few colors. Try WebP at quality 75–85 as a starting point.",
        },
        {
          q: "Is my image uploaded to a server?",
          a: "No. Compression is done by your browser's built-in canvas encoder. The files never leave your device — you can even disconnect from the internet and it keeps working.",
        },
      ],
      deepDive: [
        {
          heading: "What lossy compression actually discards",
          paragraphs: [
            "JPEG-style compression works in three moves: it converts the image into frequency data, throws away the high-frequency components your eye is least sensitive to, and packs the rest efficiently. That is why compression is nearly invisible on photographs — smooth skin and sky lose little — while hard-edged text and fine line work suffer first, showing ringing halos around letters.",
            "The quality slider maps onto how much frequency information survives. At high settings the discarded data is genuinely imperceptible; as you go lower, blockiness appears in gradients and noise amplifies around edges. There is no universal \"best\" number: a busy photo can look fine at 60 while a screenshot needs 85 to stay clean.",
            "Compression is one-way. Every save re-discard information, so repeatedly editing and saving a JPEG at moderate quality compounds artifacts generation after generation — a phenomenon called generation loss. Always keep the original, and compress once, at the end of the workflow.",
          ],
        },
        {
          heading: "Choosing quality, and when dimensions beat the slider",
          paragraphs: [
            "A practical starting ladder: 80–90 for hero images and anything with text; 60–80 for ordinary photos on the web; below 50 only when a hard size limit forces it. Then judge with your eyes at the size the image will actually be displayed — artifacts visible at 100% zoom may disappear entirely at page width.",
            "When even low quality cannot reach your target size, the pixel count is the real problem. Halving both dimensions removes roughly three quarters of the pixels, an order of magnitude the quality slider cannot match. Resize first, compress second — the two levers work at different scales.",
            "Watch the before/after byte numbers rather than assuming: some already-compressed files barely shrink further, and re-compressing them only costs quality. If a file is already well compressed, the best optimization is to leave it alone or resize it.",
          ],
        },
        {
          heading: "Local processing and workflow fit",
          paragraphs: [
            "The compression runs entirely in your browser: the image is decoded, re-encoded and measured locally, with no upload step. That makes it usable for client work, unreleased product photos, or personal documents you would rather not hand to a random web service.",
            "Because processing is instant, the natural workflow is iterative: try a quality value, look at the preview and size, adjust, repeat. This is exactly what an upload-based compressor makes painful, since each attempt costs a round trip.",
            "Keep the tool in perspective: it is the last step before publishing. Do editing and retouching first on the original, export once, then compress that export. Compressing early means every later edit re-compresses an already-damaged file.",
          ],
        },
      ],
    },
    zh: {
      name: "图片压缩",
      tagline: "画质滑块实时可调,支持批量处理,压缩前后体积一目了然——全程在浏览器本地完成,文件不出设备。",
      intro: [
        "拖入单张或多张图片,文件体积实时下降。10%–100% 的画质滑块让你在体积与清晰度之间自由取舍,每行结果都会并排显示原始大小与压缩后大小,省了多少一目了然。",
        "输出可选 JPG(照片最小)、WebP(同画质下通常比 JPG 小 20–30%)或 PNG(无损)。全部由浏览器内置编码器在本机完成——无需上传、没有排队、也不加水印。",
      ],
      steps: [
        "把图片拖入方框(或点击选择),数量不限。",
        "选择输出格式,拖动画质滑块,直到体积符合预期。",
        "逐张下载压缩结果,或一键全部下载。",
      ],
      faqs: [
        {
          q: "为什么 JPEG 压缩两次画质会更差?",
          a: "JPEG 是有损压缩,每次保存都会丢弃无法恢复的细节。对已经压缩过的 JPEG 再压缩,会在旧噪点之上叠加新噪点。建议始终从原始文件压缩,避免反复保存 JPEG。",
        },
        {
          q: "哪种格式体积最小?",
          a: "照片类内容:同画质下 WebP 通常比 JPEG 小 20–30%,JPEG 又明显小于 PNG。PNG 只在纯色图形、截图和图标等低色彩场景占优。可以从 WebP 画质 75–85 开始尝试。",
        },
        {
          q: "图片会被上传到服务器吗?",
          a: "不会。压缩由浏览器内置的 canvas 编码器完成,文件不离开你的设备——断网也能正常使用。",
        },
      ],
      deepDive: [
        {
          heading: "有损压缩到底丢了什么",
          paragraphs: [
            "JPEG 一类的压缩分三步:把图像转成频率数据,丢掉人眼最不敏感的高频成分,再把剩下的高效打包。所以压缩在照片上几乎不可见——平滑的皮肤和天空损失很小;而硬边缘的文字和细线条最先遭殃,字母周围会出现振铃光晕。",
            "质量滑块对应的是保留多少频率信息。高设置下被丢弃的数据确实难以察觉;越往下调,渐变里开始出现块状纹理,边缘周围噪点被放大。不存在放之四海皆准的“最佳值”:繁杂照片在 60 可能照样好看,截图却需要 85 才干净。",
            "压缩是单向的。每保存一次就再丢一次信息,反复编辑反复保存的 JPEG 会一代代累积伪影——这叫世代损失。永远保留原图,把压缩留到工作流的最后一步,只压一次。",
          ],
        },
        {
          heading: "质量怎么选,以及什么时候尺寸比滑块更管用",
          paragraphs: [
            "一个实用的起步阶梯:主视觉图和带文字的内容用 80–90;普通网页照片用 60–80;只有硬性体积限制逼你时才降到 50 以下。然后用图片实际显示尺寸去判断——100% 放大可见的伪影,在页面宽度下可能完全看不见。",
            "当低质量也压不到目标体积时,真正的问题是像素数。宽高各减半可以去掉大约四分之三的像素,这个量级是质量滑块达不到的。先缩尺寸、再压质量——两个杠杆作用在不同的尺度上。",
            "别猜,看前后字节数:有些已经充分压缩的文件再压几乎不减体积,只会白赔质量。如果文件已经压缩得很好,最好的优化是不动它,或者缩尺寸。",
          ],
        },
        {
          heading: "本地处理与工作流位置",
          paragraphs: [
            "压缩完全在浏览器内完成:解码、再编码、测量体积都在本地,没有上传环节。因此它可以用于客户项目、未发布的产品图,或任何你不想交给陌生网络服务的个人文件。",
            "处理是即时的,天然适合迭代式操作:试一个质量值,看预览和体积,调整,再试。这正是上传式压缩服务最痛苦的地方——每次尝试都要等一次往返。",
            "摆正工具的位置:它是发布前的最后一步。先在原图上完成编辑和修饰,导出一次,再压缩那份导出。提前压缩意味着之后的每次编辑都在压缩一份已经受损的文件。",
          ],
        },
      ],
    },
    ja: {
      name: "画像圧縮",
      tagline:
        "品質スライダーをリアルタイム調整しながら JPG・PNG・WebP を圧縮。一括処理と圧縮前後のサイズ表示付き、すべてブラウザ内で完結します。",
      intro: [
        "画像を 1 枚でもまとめてでもドロップすると、ファイルサイズがリアルタイムで縮みます。10%〜100% の品質スライダーで軽さと鮮明さのバランスを調整でき、各行に圧縮前後のサイズを並べて表示するので、どれだけ節約できたか一目瞭然です。",
        "出力は JPG(写真に最軽量)、WebP(同品質なら JPG より通常 20〜30% 小さい)、PNG(ロスレス)から選べます。処理はブラウザ内蔵エンコーダーで端末内だけで完結——アップロードも待ち行列も透かしもありません。",
      ],
      steps: [
        "画像をボックスにドロップ(またはクリックして選択)。枚数は無制限です。",
        "出力フォーマットを選び、サイズが納得いくまで品質スライダーを調整します。",
        "圧縮後の画像を 1 枚ずつ、またはまとめてダウンロードします。",
      ],
      faqs: [
        {
          q: "JPEG を二重に圧縮すると劣化するのはなぜ?",
          a: "JPEG は非可逆圧縮で、保存のたびに元に戻せないディテールを捨てています。圧縮済みの JPEG をさらに圧縮すると、既存のノイズに新しいノイズが上書きされます。常に元ファイルから圧縮し、JPEG の再保存を繰り返さないのがおすすめです。",
        },
        {
          q: "一番小さくなるフォーマットは?",
          a: "写真なら同品質で WebP が JPG より通常 20〜30% 小さく、JPG は PNG より小さくなります。PNG が有利なのは、単色グラフィック・スクリーンショット・色数の少ないロゴなどです。まずは WebP 品質 75〜85 から試してみてください。",
        },
        {
          q: "画像はサーバーにアップロードされますか?",
          a: "いいえ。圧縮はブラウザ内蔵の canvas エンコーダーが行い、ファイルは端末の外に出ません。オフラインでも動作します。",
        },
      ],
      deepDive: [
        {
          heading: "非可逆圧縮は実際に何を捨てているか",
          paragraphs: [
            "JPEG 式の圧縮は3つの段階で動きます:画像を周波数データに変換し、目が最も感じにくい高周波成分を捨て、残りを効率的に詰める。だから写真では圧縮はほとんど見えません——滑らかな肌や空の損失は小さい。逆に硬いエッジの文字や細かい線が最初に犠牲になり、文字の周りにリンギング(にじみ)が出ます。",
            "品質スライダーは「どれだけの周波数情報を残すか」に対応します。高い設定では捨てられるデータは実際には知覚不能。下げるにつれグラデーションにブロックノイズが出て、エッジ周辺のノイズが増幅します。万能の「最適値」は存在しません:情報量の多い写真は 60 でも十分でも、スクリーンショットは 85 が必要なことも。",
            "圧縮は一方通行です。保存のたびに情報を再度捨てるため、JPEG を繰り返し編集・保存すると世代を追うごとにノイズが蓄積します(世代損失)。必ず元画像を保管し、圧縮はワークフローの最後に一度だけ。",
          ],
        },
        {
          heading: "品質の選び方、寸法がスライダーに勝つとき",
          paragraphs: [
            "実用的な初期値の目安:ヒーロー画像や文字入りは 80–90、普通の Web 写真は 60–80、50 未満は硬いサイズ制限があるときだけ。判定は「実際に表示されるサイズ」で目視で行うのが正解です——100% ズームで見えるノイズは、ページ幅では完全に消えていることがあります。",
            "低品質でも目標サイズに届かないなら、本当の問題はピクセル数です。縦横を半分にすれば約4分の3のピクセルが消え、品質スライダーでは届かない規模です。先にリサイズ、次に圧縮——2つのレバーは効く尺度が違います。",
            "推測せず、前後のバイト数を見る:すでに十分圧縮されたファイルはこれ以上ほとんど縮まず、再圧縮は品質だけを消耗します。よく圧縮されたファイルには、触れないかリサイズするのが最適解です。",
          ],
        },
        {
          heading: "ローカル処理とワークフロー上の位置",
          paragraphs: [
            "圧縮は完全にブラウザ内で実行されます:デコード、再エンコード、サイズ測定はすべてローカルで、アップロード工程はありません。クライアントワーク、未公開の商品写真、見知らぬ Web サービスに渡したくない個人文書に使えます。",
            "処理が即時なので、自然な流れは反復型です:品質を試し、プレビューとサイズを見て、調整し、また試す。アップロード型の圧縮サービスがつらいのはまさにここで、試行のたびに往復が発生します。",
            "ツールの位置づけは「公開前の最後の一歩」。編集やレタッチは先に元画像で済ませ、一度書き出し、その書き出しを圧縮する。早く圧縮すると、その後のすべての編集が「すでに劣化したファイルの再圧縮」になります。",
          ],
        },
      ],
    },
    es: {
      name: "Compresor de imágenes",
      tagline:
        "Comprime imágenes JPG, PNG y WebP con un deslizador de calidad en vivo, procesamiento por lotes y tamaños antes/después al instante, todo en tu navegador.",
      intro: [
        "Suelta una imagen o un lote completo y mira cómo bajan los tamaños en tiempo real. Un deslizador de calidad del 10% al 100% te permite equilibrar peso y nitidez, y cada fila muestra el tamaño original junto al resultado comprimido para que sepas exactamente cuánto ahorraste.",
        "La salida puede ser JPG (el más pequeño para fotos), WebP (suele ser un 20–30% menor que JPG con la misma calidad) o PNG (sin pérdida). Todo funciona en tu dispositivo con el codificador del propio navegador: sin subidas, sin colas y sin marcas de agua.",
      ],
      steps: [
        "Suelta tus imágenes en el recuadro (o haz clic para elegirlas), tantas como quieras.",
        "Elige el formato de salida y mueve el deslizador de calidad hasta que el tamaño te convenza.",
        "Descarga cada imagen comprimida o descárgalas todas de una vez.",
      ],
      faqs: [
        {
          q: "¿Por qué comprimir dos veces un JPEG empeora la imagen?",
          a: "JPEG tiene pérdida: cada guardado descarta detalle irrecuperable. Comprimir un JPEG ya comprimido añade artefactos nuevos sobre los viejos. Lo ideal es comprimir siempre desde el archivo original y no res guardar JPEG repetidamente.",
        },
        {
          q: "¿Qué formato da los archivos más pequeños?",
          a: "Para fotos, WebP suele ser un 20–30% más pequeño que JPEG con la misma calidad visual, y JPEG supera a PNG. PNG solo gana en gráficos planos, capturas y logos con pocos colores. Prueba WebP con calidad 75–85 como punto de partida.",
        },
        {
          q: "¿Mi imagen se sube a algún servidor?",
          a: "No. La compresión la hace el codificador canvas integrado en tu navegador. Los archivos nunca salen de tu dispositivo; funciona incluso sin conexión.",
        },
      ],
      deepDive: [
        {
          heading: "Qué descarta realmente la compresión con pérdida",
          paragraphs: [
            "La compresión tipo JPEG funciona en tres pasos: convierte la imagen en datos de frecuencia, descarta los componentes de alta frecuencia a los que el ojo es menos sensible y empaqueta el resto de forma eficiente. Por eso es casi invisible en fotografías — piel y cielos suaves pierden poco — mientras que el texto y las líneas finas de bordes duros sufren primero, con halos alrededor de las letras.",
            "El deslizador de calidad equivale a cuánta información de frecuencia sobrevive. En ajustes altos lo descartado es genuinamente imperceptible; al bajar, aparecen bloques en los degradados y el ruido se amplifica en los bordes. No hay un número \"óptimo\" universal: una foto recargada puede verse bien a 60 mientras una captura necesita 85.",
            "La compresión es de un solo sentido. Cada guardado vuelve a descartar información, así que editar y guardar repetidamente un JPEG a calidad media acumula artefactos generación tras generación: la llamada pérdida de generación. Conserva siempre el original y comprime una sola vez, al final del flujo.",
          ],
        },
        {
          heading: "Elegir calidad, y cuándo las dimensiones ganan al deslizador",
          paragraphs: [
            "Una escalera práctica de partida: 80–90 para imágenes principales y todo lo que lleve texto; 60–80 para fotos web corrientes; por debajo de 50 solo si un límite duro de tamaño lo obliga. Juzga después con los ojos al tamaño real de visualización — artefactos visibles al 100 % pueden desaparecer por completo al ancho de página.",
            "Cuando ni con calidad baja llegas al tamaño objetivo, el problema son los píxeles. Reducir ambos lados a la mitad elimina unas tres cuartas partes de ellos, una magnitud que el deslizador no alcanza. Primero redimensiona, después comprime: las dos palancas operan a escalas distintas.",
            "Mira los bytes antes y después en vez de asumir: algunos archivos ya bien comprimidos apenas reducen más, y recomprimirlos solo cuesta calidad. Si un archivo ya está bien comprimido, la mejor optimización es dejarlo quieto o redimensionarlo.",
          ],
        },
        {
          heading: "Procesado local y encaje en el flujo de trabajo",
          paragraphs: [
            "La compresión ocurre íntegramente en tu navegador: la imagen se decodifica, se recodifica y se mide localmente, sin paso de subida. Eso permite usarla con trabajos de clientes, fotos de producto no publicadas o documentos personales que preferirías no entregar a un servicio web cualquiera.",
            "Como el procesado es instantáneo, el flujo natural es iterativo: prueba una calidad, mira la vista previa y el tamaño, ajusta, repite. Justo lo que un compresor basado en subidas vuelve doloroso, porque cada intento cuesta un viaje de ida y vuelta.",
            "Sitúa la herramienta en su lugar: es el último paso antes de publicar. Edita y retoca primero sobre el original, exporta una vez y comprime ese export. Comprimir antes significa que cada edición posterior re-comprime un archivo ya dañado.",
          ],
        },
      ],
    },
    pt: {
      name: "Compressor de imagens",
      tagline:
        "Comprima imagens JPG, PNG e WebP com controle de qualidade em tempo real, processamento em lote e tamanhos antes/depois na hora — tudo no seu navegador.",
      intro: [
        "Solte uma imagem ou um lote inteiro e veja os tamanhos caírem em tempo real. O controle de qualidade de 10% a 100% equilibra peso e nitidez, e cada linha mostra o tamanho original ao lado do resultado comprimido, para você saber exatamente quanto economizou.",
        "A saída pode ser JPG (menor para fotos), WebP (geralmente 20–30% menor que JPG com a mesma qualidade) ou PNG (sem perdas). Tudo roda no seu dispositivo com o codificador do próprio navegador — sem upload, sem fila e sem marca d'água.",
      ],
      steps: [
        "Solte suas imagens na caixa (ou clique para escolher), quantas quiser.",
        "Escolha o formato de saída e ajuste o controle de qualidade até o tamanho ficar bom.",
        "Baixe cada imagem comprimida ou baixe todas de uma vez.",
      ],
      faqs: [
        {
          q: "Por que comprimir um JPEG duas vezes piora a imagem?",
          a: "JPEG tem perda: cada salvamento descarta detalhes irrecuperáveis. Comprimir um JPEG já comprimido adiciona artefatos novos sobre os antigos. O ideal é comprimir sempre a partir do arquivo original e evitar resalvar JPEG repetidamente.",
        },
        {
          q: "Qual formato gera os arquivos menores?",
          a: "Para fotos, o WebP costuma ser 20–30% menor que JPEG com a mesma qualidade visual, e o JPEG ganha do PNG. O PNG só leva vantagem em gráficos planos, capturas de tela e logos com poucas cores. Comece testando WebP com qualidade 75–85.",
        },
        {
          q: "Minha imagem é enviada para algum servidor?",
          a: "Não. A compressão é feita pelo codificador canvas do próprio navegador. Os arquivos nunca saem do seu dispositivo — funciona até sem internet.",
        },
      ],
      deepDive: [
        {
          heading: "O que a compressão com perdas realmente descarta",
          paragraphs: [
            "A compressão estilo JPEG funciona em três movimentos: converte a imagem em dados de frequência, descarta os componentes de alta frequência a que o olho é menos sensível e empacota o resto de forma eficiente. Por isso ela é quase invisível em fotografias — pele e céu suaves perdem pouco — enquanto texto de bordas duras e linhas finas sofrem primeiro, com halos ao redor das letras.",
            "O controle de qualidade corresponde a quanta informação de frequência sobrevive. Em valores altos o que é descartado é genuinamente imperceptível; ao reduzir, surgem blocos nos gradientes e o ruído se amplifica nas bordas. Não existe número \"ideal\" universal: uma foto cheia pode ficar boa a 60, enquanto uma captura precisa de 85.",
            "A compressão é de sentido único. Cada salvamento descarta informação de novo, então editar e salvar repetidamente um JPEG em qualidade média acumula artefatos geração após geração — a chamada perda de geração. Guarde sempre o original e comprima uma única vez, no fim do fluxo.",
          ],
        },
        {
          heading: "Escolhendo a qualidade, e quando as dimensões vencem o controle",
          paragraphs: [
            "Uma escada prática de partida: 80–90 para imagens principais e tudo que tenha texto; 60–80 para fotos comuns na web; abaixo de 50 só quando um limite rígido de tamanho obrigar. Julgue depois com os olhos no tamanho real de exibição — artefatos visíveis em zoom de 100 % podem desaparecer por completo na largura da página.",
            "Quando nem com qualidade baixa você chega ao tamanho-alvo, o problema são os pixels. Reduzir os dois lados pela metade elimina cerca de três quartos deles, uma magnitude que o controle de qualidade jamais alcança. Primeiro redimensione, depois comprima: as duas alavancas atuam em escalas diferentes.",
            "Olhe os bytes antes e depois em vez de presumir: alguns arquivos já bem comprimidos mal reduzem mais, e recomprimi-los só custa qualidade. Se um arquivo já está bem comprimido, a melhor otimização é deixá-lo quieto ou redimensioná-lo.",
          ],
        },
        {
          heading: "Processamento local e lugar no fluxo de trabalho",
          paragraphs: [
            "A compressão roda inteiramente no seu navegador: a imagem é decodificada, recodificada e medida localmente, sem etapa de envio. Isso permite usá-la com trabalhos de clientes, fotos de produto não publicadas ou documentos pessoais que você não entregaria a um serviço web qualquer.",
            "Como o processamento é instantâneo, o fluxo natural é iterativo: teste uma qualidade, olhe a pré-visualização e o tamanho, ajuste, repita. Exatamente o que um compressor baseado em envio torna doloroso, pois cada tentativa custa uma ida e volta.",
            "Coloque a ferramenta em perspectiva: é o último passo antes de publicar. Edite e retoque primeiro no original, exporte uma vez e comprima esse export. Comprimir cedo significa que cada edição seguinte re-comprime um arquivo já danificado.",
          ],
        },
      ],
    },
  },
});
