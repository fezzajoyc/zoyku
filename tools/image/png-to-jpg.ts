import { ImageCanvasEngine } from "../_engines/image-engine-canvas";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "png-to-jpg",
  category: "image",
  icon: "image",
  engine: {
    component: ImageCanvasEngine,
    props: { op: "convert", accept: "image/png,.png", defaultFormat: "image/jpeg", defaultQuality: 0.92, lockFormat: true, suffix: "" },
  },
  related: ["jpg-to-png", "convert-image", "image-compressor", "exif-remover", "image-border", "image-splitter", "compress-image-to-size", "grayscale-image", "crop-circle-image", "crop-image"],
  copy: {
    en: {
      name: "PNG to JPG",
      tagline:
        "Convert PNG images to JPG and shrink file size dramatically — transparent areas get a clean white background and quality stays adjustable.",
      intro: [
        "Turn heavy .png files into compact .jpg copies that upload faster and open everywhere. A quality slider (default 92%) keeps the result visually indistinguishable while cutting the size by 60–90% for typical screenshots and photos.",
        "PNG transparency cannot survive in JPG, so transparent areas are flattened onto pure white — the standard treatment for forms, avatars and marketplaces that only accept JPEG. Batch mode handles a whole folder in one go.",
      
        "JPEG is lossy DCT compression designed for photographic content; at 92% quality it typically matches the source visually at a fraction of PNG's size. Transparency is the real constraint: JPG has no alpha channel, so the tool flattens transparent regions onto white — the standard treatment most platforms expect.",
        "Compared with generic 'convert' tools, the quality slider is explicit and the output size is shown per file, so you can trade a smaller download for a softer image knowingly. And because re-encoding happens in your browser, a folder of product screenshots converts without hitting an upload cap or a privacy policy.",
      ],
      steps: [
        "Drop your PNG images — one or many.",
        "Adjust the JPG quality if you want smaller files or maximum fidelity.",
        "Download the JPG files individually or all at once.",
      ],
      faqs: [
        {
          q: "What happens to transparent areas when converting PNG to JPG?",
          a: "JPG has no alpha channel, so transparent pixels are filled with solid white before saving. If you need a different backdrop color, or must keep real transparency, stay with PNG (or use WebP).",
        },
        {
          q: "How much smaller will the JPG be?",
          a: "Typically 60–90% smaller for screenshots and photos. Flat graphics with sharp edges compress less dramatically and may show slight fuzziness at low quality — keep the slider above 85% for text and UI images.",
        },
        {
          q: "Can conversion make the image sharper or fix artifacts?",
          a: "No. Converting only changes the encoding; it cannot add detail. If the PNG itself already looks soft, the JPG will look equally soft (possibly with faint compression noise at very low quality settings).",
        },
      ],
      deepDive: [
        {
          heading: "What happens when lossless meets lossy",
          paragraphs: [
            "PNG stores every pixel exactly: compression is lossless, so decode gives back the identical image. JPEG discards data the eye is less likely to notice, trading exact fidelity for much smaller files. Converting PNG to JPG therefore means choosing to lose information in exchange for size.",
            "For photographs the trade is nearly invisible: a photo saved from PNG to JPG at high quality looks the same and typically shrinks several-fold. The losses concentrate where PNG was protecting precision — hard edges, text, flat-color graphics and uniform gradients — where JPEG produces ringing halos and banding.",
            "One structural loss is total: transparency. PNG's alpha channel cannot survive in JPG, so transparent areas must be filled with a background color, usually white. If your PNG has see-through regions and the destination background is not white, expect a visible box unless you fill with the right color first.",
          ],
        },
        {
          heading: "When the conversion is worth it — and when it is not",
          paragraphs: [
            "Convert when size or compatibility demands it: platforms that reject PNG uploads, forms with file-size limits, photo galleries with hundreds of images. A photographic PNG is almost always a waste of bytes — cameras never output PNG, so a photographic PNG usually came from a screenshot pipeline or an export mistake, and JPG halves it without visible change.",
            "Do not convert when precision is the point: logos, UI screenshots, diagrams, pixel art and anything with text should stay PNG. Converting those to JPG buys little size and costs crisp edges that cannot be recovered.",
            "The background fill question deserves a decision rather than a default: white suits most print and document contexts; a color matching the destination page suits web graphics. Choosing the fill color deliberately is the difference between a clean conversion and an obvious one.",
          ],
        },
        {
          heading: "Local conversion keeps files private",
          paragraphs: [
            "The conversion runs entirely in your browser: the PNG is decoded, composited over the chosen background, re-encoded as JPG and delivered back — all on your device. No upload step means screenshots of internal tools, client materials or personal documents never touch a server.",
            "Processing is instant, so the practical workflow for mixed batches is to check each image's content first: photographic ones go through conversion, graphic ones stay PNG. There is no single setting that makes this call for you — the right answer depends on what is in each file.",
            "Keep the PNG original after converting. JPG cannot go back: once the high-frequency detail and alpha channel are gone, no tool can restore them, and the original is your only path to a different background color or a lossless re-export later.",
          ],
        },
      ],
    },
    zh: {
      name: "PNG 转 JPG",
      tagline: "PNG 一键转 JPG,体积大幅缩小,透明区域自动铺白底,画质可调——批量处理,本地完成不上传。",
      intro: [
        "把体积庞大的 .png 变成紧凑的 .jpg,上传更快、处处能开。画质滑块默认 92%,肉眼几乎看不出差别,而常见的截图和照片体积可缩减 60–90%。",
        "JPG 不支持透明,所以透明区域会铺成纯白色——这也是各类表单、头像和电商平台只收 JPEG 时的标准处理方式。批量模式一次搞定整个文件夹。",
      ],
      steps: [
        "拖入一张或多张 PNG 图片。",
        "需要更小体积或最高保真时,调整 JPG 画质。",
        "逐张或一键下载 JPG。",
      ],
      faqs: [
        {
          q: "PNG 转 JPG 时透明区域会怎样?",
          a: "JPG 没有 alpha 通道,透明像素会在保存前填充为纯白。如果需要其他底色,或必须保留真透明,请继续用 PNG(或改用 WebP)。",
        },
        {
          q: "JPG 能小多少?",
          a: "截图和照片通常能缩小 60–90%。边缘锐利的扁平图形缩幅较小,低画质下可能出现轻微模糊——文字和 UI 截图建议画质保持在 85% 以上。",
        },
        {
          q: "转换能让图片更清晰或修复瑕疵吗?",
          a: "不能。转换只改变编码方式,无法补充细节。如果 PNG 本身就偏软,JPG 只会同样偏软(画质设得很低时还可能叠加轻微压缩噪点)。",
        },
      ],
      deepDive: [
        {
          heading: "当无损遇上有损",
          paragraphs: [
            "PNG 精确保存每一个像素:压缩是无损的,解码后得到完全相同的图像。JPEG 则丢弃人眼不太可能注意到的数据,用精确性换小体积。PNG 转 JPG 因此意味着主动选择“丢一些信息,换更小的文件”。",
            "对照片来说这笔交换几乎不可见:高质量设置下,照片从 PNG 转 JPG 看起来没有差别,体积通常缩小数倍。损失集中在 PNG 原本保护精确性的地方——硬边缘、文字、纯色图形和均匀渐变——JPEG 会在这些地方产生振铃光晕和色带。",
            "有一种结构性损失是彻底的:透明。PNG 的透明通道在 JPG 里无法存活,透明区域必须填成背景色,通常是白色。如果 PNG 有透空区域而目标背景不是白色,不先填对颜色就会得到一个明显的方框。",
          ],
        },
        {
          heading: "什么时候值得转,什么时候不该转",
          paragraphs: [
            "体积或兼容性提出要求时才转:平台拒收 PNG、表单限制文件大小、几百张图的相册。照片类 PNG 几乎总是浪费字节——相机从不输出 PNG,照片类 PNG 多半来自截图流程或导出失误,转成 JPG 体积减半而肉眼无感。",
            "精确性就是价值时不要转:Logo、界面截图、图表、像素画和一切带文字的内容都应留在 PNG。把它们转成 JPG 省不了多少体积,却买不回不可逆的锐利边缘。",
            "背景填色值得做个决定而不是走默认:白色适合大多数打印和文档场景;与目标页面同色适合网页图形。主动选填色,是干净转换和一眼假的转换之间的分界线。",
          ],
        },
        {
          heading: "本地转换让文件保持私密",
          paragraphs: [
            "转换完全在浏览器内进行:PNG 解码、合成到所选背景色上、重编码为 JPG、回传——全程在你的设备上。没有上传环节,内部工具截图、客户材料和个人文档永远不会经过服务器。",
            "处理是即时的,所以混合批次的实用做法是先看每张图的内容:照片类的走转换,图形类的留 PNG。没有任何设置能替你做这个判断——正确答案取决于每个文件里装的是什么。",
            "转换后保留 PNG 原件。JPG 回不去:高频细节和透明通道一旦消失,任何工具都无法恢复,原图是你日后换背景色或无损再导出的唯一途径。",
          ],
        },
      ],
    },
    ja: {
      name: "PNG から JPG へ変換",
      tagline:
        "PNG を JPG に変換してファイルサイズを大幅削減。透明部分は白背景になり、品質は自由に調整——一括処理でローカル完結、アップロードなし。",
      intro: [
        "重い .png をコンパクトな .jpg に変えて、アップロードを速く、どこでも開けるように。品質スライダー(既定 92%)は視覚的な違いをほぼ残したまま、一般的なスクリーンショットや写真で 60〜90% のサイズ削減を実現します。",
        "JPG は透過を保持できないため、透明部分は真っ白に平らになります。これは JPEG のみを受け付けるフォーム・アイコン・マーケットプレイスでの標準的な扱いです。一括モードならフォルダ単位でも一度で処理できます。",
      ],
      steps: [
        "PNG 画像を 1 枚でも複数でもドロップします。",
        "より小さいファイルか最大限の忠実度かで、JPG 品質を調整します。",
        "JPG を 1 枚ずつ、またはまとめてダウンロードします。",
      ],
      faqs: [
        {
          q: "PNG から JPG への変換で透明部分はどうなりますか?",
          a: "JPG にアルファチャンネルはないため、透明ピクセルは保存前に白で塗りつぶされます。別の背景色が必要な場合や、真の透過を保ちたい場合は PNG(または WebP)のままにしてください。",
        },
        {
          q: "JPG はどれくらい小さくなりますか?",
          a: "スクリーンショットや写真なら通常 60〜90% 小さくなります。エッジの鋭いフラットなグラフィックは削減率が小さく、低品質ではわずかなにじみが出ることがあります。文字や UI 画像は品質 85% 以上を推奨します。",
        },
        {
          q: "変換で画像がシャープになったり、ノイズを修復したりしますか?",
          a: "しません。変換はエンコードを変えるだけでディテールを追加できません。元の PNG がすでに soft なら JPG も同様で、極端に低い品質設定ではわずかな圧縮ノイズが加わることもあります。",
        },
      ],
      deepDive: [
        {
          heading: "ロスレスがロッシーに出会うとき",
          paragraphs: [
            "PNG はすべてのピクセルを正確に保存します:圧縮は可逆で、デコードすれば同一の画像が戻ります。JPEG は目が気づきにくいデータを捨て、正確さを大幅な軽量さと引き換えにする。PNG→JPG 変換は therefore「情報を捨ててサイズを得る」ことを選ぶ行為です。",
            "写真ではその取引はほとんど見えません:高品質設定で PNG から JPG に保存した写真は見た目が変わらず、通常は数分の一に縮みます。損失が集中するのは PNG が精度を守っていた場所——硬いエッジ、文字、フラットなグラフィック、均一なグラデーション——で、JPEG はここでリンギングやバンディングを生みます。",
            "一つだけ構造的な損失が完全なものです:透過。PNG のアルファチャンネルは JPG では生き残れず、透過領域は背景色(通常は白)で塗りつぶされます。透過部分がある PNG で、貼り付け先の背景が白でない場合、正しい色で先に埋めないと目立つ四角形が残ります。",
          ],
        },
        {
          heading: "変換が割に合うとき、合わないとき",
          paragraphs: [
            "変えるべきはサイズや互換性が求めるとき:PNG を拒むプラットフォーム、ファイルサイズ制限のあるフォーム、数百枚のギャラリー。写真系の PNG はほぼ常にバイトの無駄です——カメラは PNG を出力しないため、写真系 PNG はスクリーンショット工程か書き出しミス由来であることが多く、JPG なら見た目を変えずに半減します。",
            "精度こそ価値なら変えない:ロゴ、UI スクリーンショット、図表、ピクセルアート、文字を含むすべては PNG のままで。これらを JPG にしてもサイズの伸びは僅かで、取り返しのつかないシャープなエッジを失います。",
            "背景色の選択は既定に任せず決めるべきです:白は印刷や文書の多くの場面に合い、貼り付け先ページに合わせた色は Web グラフィックに合う。意図的に色を選ぶことが、きれいな変換と一目で分かる変換の分かれ目です。",
          ],
        },
        {
          heading: "ローカル変換がファイルを守る",
          paragraphs: [
            "変換は完全にブラウザ内で実行されます:PNG のデコード、選択した背景への合成、JPG への再エンコード、取得まで——すべて端末上です。アップロード工程がないため、内部ツールのスクショ、クライアント資材、個人文書がサーバーに触れることはありません。",
            "処理は即時なので、混在バッチの実務的な進め方はまず各画像の中身を見ること:写真系は変換へ、グラフィック系は PNG のまま。代行してくれる設定は存在せず、正解は各ファイルの中身次第です。",
            "変換後も PNG 元ファイルを保持する。JPG は戻れません:高周波のディテールとアルファチャンネルが消えた後、復元できるツールはなく、元画像だけが将来の背景色変更やロスレス再書き出しへの道です。",
          ],
        },
      ],
    },
    es: {
      name: "PNG a JPG",
      tagline:
        "Convierte imágenes PNG a JPG y reduce el tamaño drásticamente — las zonas transparentes reciben un fondo blanco limpio y la calidad es ajustable.",
      intro: [
        "Convierte esos .png pesados en copias .jpg compactas que se suben más rápido y se abren en cualquier sitio. El deslizador de calidad (92% por defecto) mantiene el resultado visualmente idéntico mientras recorta un 60–90% del tamaño en capturas y fotos habituales.",
        "La transparencia PNG no puede sobrevivir en JPG, así que las zonas transparentes se aplanan sobre blanco puro: el tratamiento estándar para formularios, avatares y marketplaces que solo aceptan JPEG. El modo por lotes procesa una carpeta entera de una vez.",
      ],
      steps: [
        "Suelta tus imágenes PNG — una o muchas.",
        "Ajusta la calidad del JPG si quieres archivos más pequeños o máxima fidelidad.",
        "Descarga los JPG individualmente o todos a la vez.",
      ],
      faqs: [
        {
          q: "¿Qué pasa con las zonas transparentes al convertir PNG a JPG?",
          a: "JPG no tiene canal alfa, así que los píxeles transparentes se rellenan de blanco puro antes de guardar. Si necesitas otro color de fondo o mantener transparencia real, quédate con PNG (o usa WebP).",
        },
        {
          q: "¿Cuánto pesará menos el JPG?",
          a: "Normalmente entre un 60 y un 90% menos en capturas y fotos. Los gráficos planos con bordes nítidos se comprimen menos y pueden mostrar un ligero difuminado con calidad baja: mantén el deslizador por encima de 85% para texto e imágenes de interfaz.",
        },
        {
          q: "¿La conversión puede hacer la imagen más nítida o reparar artefactos?",
          a: "No. Convertir solo cambia la codificación; no añade detalle. Si el PNG ya se ve blando, el JPG se verá igual de blando (quizá con un leve ruido de compresión con calidades muy bajas).",
        },
      ],
      deepDive: [
        {
          heading: "Cuando lo sin pérdida se encuentra con lo con pérdida",
          paragraphs: [
            "PNG guarda cada píxel exactamente: su compresión es sin pérdida y al decodificar vuelve la imagen idéntica. JPEG descarta los datos que el ojo es menos probable que note, cambiando fidelidad exacta por archivos mucho más ligeros. Convertir PNG a JPG significa, por tanto, elegir perder información a cambio de tamaño.",
            "Para fotografías el intercambio es casi invisible: una foto guardada de PNG a JPG con calidad alta se ve igual y normalmente se reduce varias veces. Las pérdidas se concentran donde PNG protegía la precisión — bordes duros, texto, gráficos de color plano y degradados uniformes — donde JPEG produce halos de contorno y bandas.",
            "Una pérdida estructural es total: la transparencia. El canal alfa de PNG no puede sobrevivir en JPG, así que las zonas transparentes deben rellenarse con un color de fondo, normalmente blanco. Si tu PNG tiene zonas transparentes y el fondo de destino no es blanco, espera un recuadro visible salvo que rellenes antes con el color correcto.",
          ],
        },
        {
          heading: "Cuándo la conversión compensa — y cuándo no",
          paragraphs: [
            "Convierte cuando el tamaño o la compatibilidad lo exigen: plataformas que rechazan PNG, formularios con límites de tamaño, galerías con cientos de imágenes. Un PNG fotográfico es casi siempre un desperdicio de bytes — las cámaras nunca generan PNG, así que un PNG fotográfico suele venir de un flujo de capturas o un error de exportación, y JPG lo reduce a la mitad sin cambio visible.",
            "No conviertas cuando la precisión es el punto: logos, capturas de interfaz, diagramas, pixel art y todo lo que lleve texto debería seguir en PNG. Convertirlos a JPG compra poco tamaño y cuesta bordes nítidos que no se recuperan.",
            "La pregunta del relleno merece una decisión y no un valor por defecto: el blanco encaja en la mayoría de contextos de impresión y documentos; un color acorde a la página de destino encaja en gráficos web. Elegir el color de relleno deliberadamente es la diferencia entre una conversión limpia y una evidente.",
          ],
        },
        {
          heading: "La conversión local mantiene los archivos privados",
          paragraphs: [
            "La conversión ocurre íntegramente en tu navegador: el PNG se decodifica, se compone sobre el fondo elegido, se recodifica a JPG y se devuelve — todo en tu dispositivo. Sin paso de subida, las capturas de herramientas internas, los materiales de clientes y los documentos personales jamás tocan un servidor.",
            "El procesado es instantáneo, así que el flujo práctico con lotes mixtos es revisar primero el contenido de cada imagen: las fotográficas pasan por la conversión, las gráficas se quedan en PNG. No existe un ajuste que tome esa decisión por ti — la respuesta correcta depende de qué hay en cada archivo.",
            "Conserva el PNG original tras convertir. El JPG no puede volver: una vez perdidos el detalle de alta frecuencia y el canal alfa, ninguna herramienta los recupera, y el original es tu único camino hacia otro color de fondo o una reexportación sin pérdida más adelante.",
          ],
        },
      ],
    },
    pt: {
      name: "PNG para JPG",
      tagline:
        "Converta imagens PNG em JPG e reduza o tamanho drasticamente — áreas transparentes ganham fundo branco limpo e a qualidade é ajustável.",
      intro: [
        "Transforme aqueles .png pesados em cópias .jpg compactas que sobem mais rápido e abrem em qualquer lugar. O controle de qualidade (92% por padrão) mantém o resultado visualmente idêntico enquanto corta 60–90% do tamanho em capturas e fotos comuns.",
        "A transparência de PNG não sobrevive no JPG, então as áreas transparentes são achatadas sobre branco puro — o tratamento padrão para formulários, avatares e marketplaces que só aceitam JPEG. O modo em lote processa uma pasta inteira de uma vez.",
      ],
      steps: [
        "Solte suas imagens PNG — uma ou muitas.",
        "Ajuste a qualidade do JPG se quiser arquivos menores ou fidelidade máxima.",
        "Baixe os JPGs individualmente ou todos de uma vez.",
      ],
      faqs: [
        {
          q: "O que acontece com as áreas transparentes ao converter PNG para JPG?",
          a: "O JPG não tem canal alfa, então os pixels transparentes são preenchidos com branco puro antes de salvar. Se precisar de outra cor de fundo ou de transparência real, fique com PNG (ou use WebP).",
        },
        {
          q: "Quanto menor fica o JPG?",
          a: "Normalmente 60–90% menor para capturas e fotos. Gráficos planos com bordas nítidas comprimem menos e podem ficar levemente desfocados em qualidade baixa — mantenha o controle acima de 85% para textos e imagens de interface.",
        },
        {
          q: "A conversão deixa a imagem mais nítida ou corrige artefatos?",
          a: "Não. Converter só muda a codificação; não adiciona detalhe. Se o PNG já parece macio, o JPG ficará igualmente macio (talvez com um leve ruído de compressão em qualidades muito baixas).",
        },
      ],
      deepDive: [
        {
          heading: "Quando o sem perdas encontra o com perdas",
          paragraphs: [
            "O PNG guarda cada pixel exatamente: sua compressão é sem perdas e, ao decodificar, a imagem idêntica volta. O JPEG descarta os dados que o olho tem menos chance de notar, trocando fidelidade exata por arquivos muito mais leves. Converter PNG para JPG significa, portanto, escolher perder informação em troca de tamanho.",
            "Para fotografias a troca é quase invisível: uma foto salva de PNG para JPG com qualidade alta parece igual e normalmente encolhe várias vezes. As perdas se concentram onde o PNG protegia a precisão — bordas duras, texto, gráficos de cor chapada e gradientes uniformes — onde o JPEG produz halos de contorno e bandas.",
            "Uma perda estrutural é total: a transparência. O canal alfa do PNG não sobrevive no JPG, então as áreas transparentes precisam ser preenchidas com uma cor de fundo, normalmente branca. Se o seu PNG tem áreas transparentes e o fundo de destino não é branco, espere um retângulo visível a menos que preencha antes com a cor certa.",
          ],
        },
        {
          heading: "Quando a conversão compensa — e quando não compensa",
          paragraphs: [
            "Converta quando o tamanho ou a compatibilidade exigirem: plataformas que rejeitam PNG, formulários com limite de tamanho, galerias com centenas de imagens. Um PNG fotográfico é quase sempre um desperdício de bytes — câmeras nunca geram PNG, então um PNG fotográfico geralmente veio de um fluxo de capturas ou de um erro de exportação, e o JPG corta pela metade sem mudança visível.",
            "Não converta quando a precisão é o ponto: logos, capturas de interface, diagramas, pixel art e tudo que tenha texto deveria ficar em PNG. Converter esses para JPG compra pouco tamanho e custa bordas nítidas que não voltam.",
            "A questão do preenchimento merece uma decisão, não um padrão: o branco serve à maioria dos contextos de impressão e documentos; uma cor compatível com a página de destino serve a gráficos web. Escolher a cor de preenchimento deliberadamente é a diferença entre uma conversão limpa e uma evidente.",
          ],
        },
        {
          heading: "A conversão local mantém os arquivos privados",
          paragraphs: [
            "A conversão acontece inteiramente no seu navegador: o PNG é decodificado, composto sobre o fundo escolhido, recodificado em JPG e devolvido — tudo no seu dispositivo. Sem etapa de envio, capturas de ferramentas internas, materiais de clientes e documentos pessoais nunca tocam um servidor.",
            "O processamento é instantâneo, então o fluxo prático com lotes mistos é conferir primeiro o conteúdo de cada imagem: as fotográficas passam pela conversão, as gráficas ficam em PNG. Não existe uma configuração que tome essa decisão por você — a resposta certa depende do que há em cada arquivo.",
            "Guarde o PNG original depois de converter. O JPG não volta: uma vez perdidos o detalhe de alta frequência e o canal alfa, nenhuma ferramenta os recupera, e o original é seu único caminho para outra cor de fundo ou uma reexportação sem perdas no futuro.",
          ],
        },
      ],
    },
  },
});
