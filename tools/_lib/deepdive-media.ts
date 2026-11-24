/**
 * deepDive 补充模块 —— 图像族 + 开发者数据族 + 日历 + 文件族。
 * 写作纪律:2 节 × 3 段 × 5 核心语。
 */

import type { Locale } from "@/lib/site";

type Section = { heading: string; paragraphs: [string, string, string] };
const CORE = ["en", "zh", "ja", "es", "pt"] as const;

function pick5(map: Record<(typeof CORE)[number], Section[]>, locale: Locale): Section[] | undefined {
  // overlay 语种(fr/de/ru/it/tr/ko/ar/hi/id/vi)设计上回退英文深文:
  // 这些语种的界面与页面文案各有 overlay,但深文不铺(与全站既有约定一致)。
  return (map as Record<string, Section[] | undefined>)[locale] ?? map.en;
}

/** 水印(批量图片) */
export function watermarkDeepDive(locale: Locale): Section[] | undefined {
  return pick5(
    {
      en: [
        {
          heading: "A watermark is a second drawing pass, not a filter",
          paragraphs: [
            "Watermarking is compositing: draw the image, then draw the mark on top with its own alpha, colour and placement. That is why quality decisions compound — re-encoding the image and then placing text over it means one lossy step for the image and one raster text layer that cannot be edited afterwards. Doing it in a single canvas pass keeps it to exactly one encode.",
            "Placement is where most watermarks fail. A mark positioned at a fixed pixel offset drifts off-centre as soon as the batch contains images of different sizes, and a mark scaled to the image dimension changes apparent size between landscape and portrait. Percentage placement with a size derived from the shorter edge keeps the mark consistent across a mixed batch, which is what a brand mark needs and what a forensic mark does not.",
            "Tile mode exists for the opposite requirement. A single corner mark protects an image from casual reuse; a tiled diagonal mark makes removal materially harder because the mark is everywhere. Both are offered with their trade-off stated, because choosing between them is an editorial decision about how much the mark should interfere with the image.",
          ],
        },
        {
          heading: "What the output format actually costs you",
          paragraphs: [
            "JPEG re-encoding is lossy and gets worse the more it happens. A watermarked JPEG is a second generation, so the source quality must be high enough to survive the pass; text drawn over a photograph also produces ringing around sharp glyph edges at low quality settings, which is visible as halos. When the goal is archival, PNG keeps the composite exact at the cost of size.",
            "Alpha handling is the subtler trap. Text drawn with partial opacity over an image produces a composite that is final — the transparency is flattened into the pixels. That is correct for a watermark because the mark should not be removable by a viewer, but it means the output can never be un-watermarked, and the tool says so rather than implying reversibility.",
            "Orientation metadata is where batches quietly break. EXIF orientation flags rotate an image in the viewer without changing the pixels, so a watermark drawn on raw pixel coordinates can end up in the wrong corner for rotated photos. Handling orientation before drawing is the only way the mark lands where it looks like it should.",
          ],
        },
      ],
      zh: [
        {
          heading: "水印是第二遍绘制,不是滤镜",
          paragraphs: [
            "加水印是合成:先画图片,再用自己的透明度、颜色和位置把标记画上去。这就是质量决策会叠加的原因——先重编码图片、再把文字压上去,等于对图片做一次有损、对文字留一层再也改不了的栅格层。在一次 canvas 绘制里完成,就恰好只有一次编码。",
            "位置是多数水印失败的地方。坐标固定在像素偏移上的标记,一旦批次里出现不同尺寸的图片就会偏离中心;按图片边长缩放的标记,在横构图与竖构图之间会改变视觉大小。按百分比定位、尺寸从较短边推导,能让标记在混尺寸批次里保持一致——这是品牌标记需要的,而取证标记不需要。",
            "平铺模式是为相反的需求存在的。单个角标能防止随意挪用;平铺斜纹标记让去除变得实质性地更难,因为标记无处不在。两者都提供,并写明取舍,因为在这两者之间选择,是一个「标记该在多大程度上干扰图像」的编辑决策。",
          ],
        },
        {
          heading: "输出格式到底让你付出什么",
          paragraphs: [
            "JPEG 重编码是有损的,而且越做越差。带水印的 JPEG 是第二代,所以源图质量必须高到能挺过一次;文字压在照片上,在低质量设定下还会在字形锐边周围产生振铃,看起来像光晕。目标是归档时,PNG 牺牲体积换来合成精确。",
            "透明度处理是更微妙的陷阱。用部分不透明度在图上绘字,产出的是最终合成——透明被压进像素。这对水印是正确的,因为标记不该被阅读器去掉;但它也意味着输出永远无法「去水印」,工具会明说这一点,而不是暗示可逆。",
            "方向元数据是批次悄悄出错的地方。EXIF 方向标志让图片在阅读器里旋转却不改像素,于是在原始像素坐标上绘制的水印,对被旋转过的照片可能落在错误的角。绘制前先处理方向,是让标记落到它看起来该在的位置的唯一办法。",
          ],
        },
      ],
      ja: [
        {
          heading: "透かしはフィルタではなく二度目の描画",
          paragraphs: [
            "透かし入れは合成です。画像を描き、その上にマークを独自の不透明度・色・位置で描きます。画質判断が積み重なるのはそのためです。画像を再エンコードしてから文字を重ねると、画像に一度の非可逆工程、文字に後から編集できないラスタ層が加わります。一度の canvas 描画で済ませれば、エンコードはちょうど一度です。",
            "位置は多くの透かしが失敗する箇所です。固定ピクセルオフセットに置いたマークは、バッチに異なるサイズの画像が混ざった瞬間に中心から外れます。画像寸法に合わせて拡大縮小したマークは、横長と縦長で見た目の大きさが変わります。短辺から導いたサイズでパーセント配置すれば、混在バッチ全体でマークが一貫します。ブランドマークに必要なことで、鑑識用マークには不要なことです。",
            "タイルモードは逆の要件のためです。隅のマーク一つは気軽な再利用を防ぎます。斜めタイルのマークは、マークがどこにでもあるため除去を実質的に難しくします。どちらもトレードオフを明示して提供します。両者の選択は、マークが画像をどれだけ邪魔すべきかという編集判断だからです。",
          ],
        },
        {
          heading: "出力形式が実際に何を犠牲にするか",
          paragraphs: [
            "JPEG の再エンコードは非可逆で、回数を重ねるほど悪化します。透かし入り JPEG は第二世代なので、元画質が一度の工程に耐えるだけ高い必要があります。低品質設定では写真上の文字が字形の鋭い縁の周りにリンギングを生み、ハローとして見えます。目的がアーカイブなら、PNG はサイズと引き換えに合成を正確に保ちます。",
            "アルファの扱いがより微妙な罠です。部分的な不透明度で文字を描くと、合成は最終結果になります。透明は画素に平坦化されるからです。透かしとしては正しい挙動です。マークはビューアで外されるべきではないからです。しかし出力は決して「透かし除去」できず、ツールは可逆性を示唆せずそう明言します。",
            "方向メタデータはバッチが静かに壊れる箇所です。EXIF 方向フラグは画素を変えずにビューアで画像を回転させるため、生の画素座標で描いた透かしは回転した写真で誤った隅に落ちることがあります。描画前に方向を処理するのが、マークが本来あるべき位置に落ちる唯一の方法です。",
          ],
        },
      ],
      es: [
        {
          heading: "Una marca de agua es una segunda pasada de dibujo, no un filtro",
          paragraphs: [
            "Marcar es componer: dibuja la imagen, luego dibuja la marca encima con su propio alfa, color y colocación. Por eso las decisiones de calidad se acumulan: recodificar la imagen y después poner texto encima significa un paso con pérdida para la imagen y una capa de texto rasterizada que ya no se puede editar. Hacerlo en una sola pasada de canvas lo deja en exactamente una codificación.",
            "La colocación es donde fallan la mayoría de las marcas. Una marca posicionada en un desplazamiento de píxeles fijo se descentra en cuanto el lote contiene imágenes de distintos tamaños, y una marca escalada a la dimensión de la imagen cambia de tamaño aparente entre horizontal y vertical. La colocación porcentual con un tamaño derivado del lado corto mantiene la marca consistente en un lote mixto, que es lo que necesita una marca de marca y lo que no necesita una marca forense.",
            "El modo mosaico existe para el requisito opuesto. Una marca de esquina protege la imagen del reuso casual; una marca diagonal en mosaico hace la eliminación materialmente más difícil porque la marca está en todas partes. Ambas se ofrecen con su compromiso declarado, porque elegir entre ellas es una decisión editorial sobre cuánto debe interferir la marca con la imagen.",
          ],
        },
        {
          heading: "Qué te cuesta realmente el formato de salida",
          paragraphs: [
            "La recodificación JPEG es con pérdida y empeora cuanto más se repite. Un JPEG marcado es segunda generación, así que la calidad del origen debe ser lo bastante alta para sobrevivir la pasada; texto dibujado sobre una fotografía también produce ringing alrededor de bordes nítidos de glifo con ajustes de baja calidad, visible como halos. Cuando el objetivo es archivo, PNG mantiene el compuesto exacto a costa de tamaño.",
            "El manejo de alfa es la trampa más sutil. Texto dibujado con opacidad parcial sobre una imagen produce un compuesto final: la transparencia queda aplanada en los píxeles. Eso es correcto para una marca de agua, porque la marca no debería poder quitarse con un visor, pero significa que la salida no puede desmarcarse nunca, y la herramienta lo dice en vez de insinuar reversibilidad.",
            "Los metadatos de orientación son donde los lotes se rompen en silencio. Los flags EXIF de orientación rotan una imagen en el visor sin cambiar los píxeles, así que una marca dibujada sobre coordenadas de píxel crudas puede acabar en la esquina equivocada para fotos rotadas. Manejar la orientación antes de dibujar es la única forma de que la marca caiga donde parece que debería.",
          ],
        },
      ],
      pt: [
        {
          heading: "Uma marca d'água é uma segunda passada de desenho, não um filtro",
          paragraphs: [
            "Marcar é compor: desenhe a imagem, depois desenhe a marca por cima com seu próprio alfa, cor e colocação. É por isso que as decisões de qualidade se acumulam — recodificar a imagem e depois colocar texto em cima significa um passo com perda para a imagem e uma camada de texto rasterizada que não dá mais para editar. Fazer numa única passada de canvas deixa exatamente uma codificação.",
            "A colocação é onde a maioria das marcas falha. Uma marca posicionada num deslocamento de pixels fixo sai do centro assim que o lote tem imagens de tamanhos diferentes, e uma marca escalada pela dimensão da imagem muda de tamanho aparente entre horizontal e vertical. Colocação percentual com tamanho derivado do lado menor mantém a marca consistente num lote misto — o que uma marca de marca precisa e o que uma marca forense não precisa.",
            "O modo mosaico existe para o requisito oposto. Uma marca de canto protege a imagem contra reuso casual; uma marca diagonal em mosaico dificulta materialmente a remoção porque a marca está em todo lugar. Ambas são oferecidas com o trade-off declarado, porque escolher entre elas é uma decisão editorial sobre quanto a marca deve interferir na imagem.",
          ],
        },
        {
          heading: "O que o formato de saída realmente custa",
          paragraphs: [
            "A recodificação JPEG é com perda e piora quanto mais se repete. Um JPEG marcado é segunda geração, então a qualidade da origem precisa ser alta o bastante para sobreviver à passada; texto desenhado sobre uma fotografia também produz ringing em torno de bordas nítidas de glifo com ajustes de baixa qualidade, visível como halos. Quando o objetivo é arquivo, o PNG mantém o composto exato ao custo de tamanho.",
            "O tratamento de alfa é a armadilha mais sutil. Texto desenhado com opacidade parcial sobre uma imagem produz um composto final: a transparência é achatada nos pixels. Isso é correto para uma marca d'água, porque a marca não deveria poder ser removida por um visualizador, mas significa que a saída nunca pode ser desmarcada, e a ferramenta diz isso em vez de insinuar reversibilidade.",
            "Metadados de orientação é onde lotes quebram em silêncio. Flags EXIF de orientação rotacionam uma imagem no visualizador sem mudar os pixels, então uma marca desenhada sobre coordenadas de pixel cruas pode acabar no canto errado para fotos rotacionadas. Tratar a orientação antes de desenhar é o único jeito de a marca cair onde parece que deveria.",
          ],
        },
      ],
    },
    locale,
  );
}

/** 图片配色提取 */
export function paletteDeepDive(locale: Locale): Section[] | undefined {
  return pick5(
    {
      en: [
        {
          heading: "Quantisation is a decision about what to throw away",
          paragraphs: [
            "Extracting a palette means reducing millions of colours to a handful, and every reduction method answers a different question. Frequency counting keeps the colours that cover the most pixels — useful for a design brief that asks what the image is mostly made of. Median cut and k-means keep colours that represent distinct clusters — useful when a small but visually important accent would otherwise be lost under a large flat background.",
            "The honest consequence is that two correct palettes from the same image can disagree, and neither is wrong. Frequency answers “what dominates”, clustering answers “what are the distinct regions”. A tool that offers only one silently frames the answer as the only answer, which is why the mode is exposed and the copy states which question each mode answers.",
            "Pixel counting also has a sampling decision built in. Every pixel is expensive on a large image, so implementations downscale before counting, which biases toward large areas and away from thin details. That is a reasonable trade for palette extraction and a bad one for forensic colour analysis, and it belongs in the documentation rather than in a footnote nobody reads.",
          ],
        },
        {
          heading: "Colour space, hex notation and what the numbers mean",
          paragraphs: [
            "A hex triplet is sRGB, not absolute colour. The same hex value displayed on two uncalibrated monitors looks different, and printed it looks different again. Presenting hex and RGB is honest about being a device-referred value; presenting “the colour of the object” would not be, because that requires a colour profile the image may not carry and a calibration the viewer may not have.",
            "Alpha is a separate channel and is usually dropped in palette extraction, because a palette is about hue and value rather than compositing. Dropping it silently is a real decision: a transparent PNG's dominant colour may be an edge artefact rather than a design colour, and knowing that transparency was ignored changes how the palette should be read.",
            "Sorting matters more than it looks. Sorting by frequency puts the dominant colour first, which is what a design brief wants; sorting by lightness or hue puts similar colours adjacent, which is what a visual comparison wants. The tool exposes the sort because a palette list whose order is arbitrary is a list you cannot scan.",
          ],
        },
      ],
      zh: [
        {
          heading: "量化就是决定丢掉什么",
          paragraphs: [
            "提取调色板意味着把数百万种颜色缩减成一把,而每种缩减方法回答的是不同问题。频次统计保留覆盖像素最多的颜色——适合「这张图主要由什么构成」这类设计需求。中位切分与 k-means 保留代表不同簇的颜色——适合当一小片但视觉上重要的点缀会被大片纯色背景淹没时。",
            "诚实的后果是:同一张图的两张都正确的调色板可以互相不一致,而且两者都不算错。频次回答「什么占主导」,聚类回答「有哪些不同区域」。一个只提供单一模式的工具,把那个答案悄悄框定成唯一答案——这就是模式被暴露出来、且文案说明每种模式回答哪个问题的原因。",
            "像素计数里还内建了一个采样决策。大图上逐像素太贵,实现通常会先降采样再计数,于是偏向大面积、偏离细节。对调色板提取这是合理取舍,对取证式的颜色分析这是糟糕取舍,而这件事该写在文档里,而不是写在没人会读的脚注里。",
          ],
        },
        {
          heading: "色彩空间、十六进制写法与这些数字的含义",
          paragraphs: [
            "十六进制三元组是 sRGB,不是绝对颜色。同一个十六进制值在两台未校准显示器上看起来不同,打印出来又是另一种。呈现 hex 与 RGB,是诚实地呈现一个「设备相关值」;呈现「这个物体的颜色」则不诚实,因为那需要图像未必带有的色彩配置文件,以及观看者未必拥有的校准。",
            "透明度是独立通道,调色板提取通常把它丢掉,因为调色板关心的是色相与明度,不是合成。静默丢掉它是一个真实决策:一张透明 PNG 的主色可能是边缘伪影而不是设计色,而知道「透明度被忽略」会改变你该怎样读这张调色板。",
            "排序比看起来更重要。按频次排序把主色放最前,这是设计需求想要的;按明度或色相排序把相近颜色放相邻,这是视觉对比想要的。工具暴露排序选项,因为顺序任意的调色板列表,是一张没法扫视的列表。",
          ],
        },
      ],
      ja: [
        {
          heading: "量子化は何を捨てるかの判断",
          paragraphs: [
            "パレット抽出は数百万色をひと握りに減らすことで、どの削減手法も別の問いに答えます。頻度集計は最も多くの画素を覆う色を残します。画像が主に何でできているかを問うデザイン要件に有用です。中央値分割や k-means は異なるクラスタを代表する色を残します。小さくても視覚的に重要な差し色が、大きな平坦な背景に埋もれる場合に有用です。",
            "正直な帰結は、同じ画像から得た二つの正しいパレットが食い違い得て、どちらも間違いではないことです。頻度は「何が支配的か」に、クラスタリングは「どのような別領域があるか」に答えます。単一モードだけを提供するツールは、その答えを唯一の答えとして静かに枠付けます。モードを公開し、各モードがどの問いに答えるかを文案に書くのはそのためです。",
            "画素集計にはサンプリング判断も組み込まれています。大きな画像では全画素は高コストなので、実装は集計前に縮小し、広い領域に偏り細部から離れます。パレット抽出には妥当な取引で、鑑識的な色分析には悪い取引です。それは誰も読まない脚注ではなく文書に属します。",
          ],
        },
        {
          heading: "色空間、16 進表記、そして数値の意味",
          paragraphs: [
            "16 進の三つ組は sRGB であり絶対色ではありません。同じ 16 進値が未較正の二台のモニタで違って見え、印刷ではさらに違います。16 進と RGB を示すのは、デバイス参照値であることに誠実です。「物体の色」を示すのは誠実ではありません。画像が持たないかもしれないカラープロファイルと、閲覧者が持たないかもしれない較正が必要だからです。",
            "アルファは独立チャネルで、パレット抽出では通常捨てられます。パレットは合成ではなく色相と明度についてだからです。黙って捨てるのは実際の判断です。透明 PNG の主色はデザイン色ではなくエッジのアーティファクトかもしれず、透明が無視されたと知ることはパレットの読み方を変えます。",
            "並び順は見た目以上に重要です。頻度順は主色を先頭に置き、デザイン要件が望む形です。明度順や色相順は似た色を隣接させ、視覚比較が望む形です。ツールが並び順を公開するのは、順序が任意のパレット一覧が走査できない一覧だからです。",
          ],
        },
      ],
      es: [
        {
          heading: "La cuantización es una decisión sobre qué descartar",
          paragraphs: [
            "Extraer una paleta significa reducir millones de colores a un puñado, y cada método de reducción responde una pregunta distinta. El conteo de frecuencia conserva los colores que cubren más píxeles: útil para un brief de diseño que pregunta de qué está hecha mayormente la imagen. El corte de mediana y k-means conservan colores que representan clústeres distintos: útil cuando un acento pequeño pero visualmente importante se perdería bajo un fondo plano grande.",
            "La consecuencia honesta es que dos paletas correctas de la misma imagen pueden discrepar, y ninguna está mal. Frecuencia responde «qué domina», agrupamiento responde «cuáles son las regiones distintas». Una herramienta que ofrece solo un modo enmarca en silencio la respuesta como la única respuesta, y por eso el modo se expone y el copy declara qué pregunta responde cada modo.",
            "El conteo de píxeles también lleva incorporada una decisión de muestreo. Cada píxel es caro en una imagen grande, así que las implementaciones reducen antes de contar, lo que sesga hacia áreas grandes y away de detalles finos. Es un compromiso razonable para extracción de paleta y uno malo para análisis forense de color, y pertenece a la documentación en vez de a una nota al pie que nadie lee.",
          ],
        },
        {
          heading: "Espacio de color, notación hex y qué significan los números",
          paragraphs: [
            "Una terna hex es sRGB, no color absoluto. El mismo valor hex mostrado en dos monitores sin calibrar se ve distinto, e impreso se ve distinto otra vez. Presentar hex y RGB es honesto sobre ser un valor referido al dispositivo; presentar «el color del objeto» no lo sería, porque eso requiere un perfil de color que la imagen puede no llevar y una calibración que el visor puede no tener.",
            "El alfa es un canal separado y normalmente se descarta en la extracción de paleta, porque una paleta trata de tono y valor y no de composición. Descartarlo en silencio es una decisión real: el color dominante de un PNG transparente puede ser un artefacto de borde en vez de un color de diseño, y saber que la transparencia se ignoró cambia cómo debe leerse la paleta.",
            "El orden importa más de lo que parece. Ordenar por frecuencia pone el color dominante primero, que es lo que un brief de diseño quiere; ordenar por luminosidad o tono pone colores similares adyacentes, que es lo que quiere una comparación visual. La herramienta expone el orden porque una lista de paleta cuyo orden es arbitrario es una lista que no puedes escanear.",
          ],
        },
      ],
      pt: [
        {
          heading: "A quantização é uma decisão sobre o que descartar",
          paragraphs: [
            "Extrair uma paleta significa reduzir milhões de cores a um punhado, e cada método de redução responde a uma pergunta diferente. A contagem de frequência mantém as cores que cobrem mais pixels — útil para um brief de design que pergunta do que a imagem é majoritariamente feita. O corte pela mediana e o k-means mantêm cores que representam clusters distintos — útil quando um acento pequeno mas visualmente importante se perderia sob um fundo plano grande.",
            "A consequência honesta é que duas paletas corretas da mesma imagem podem discordar, e nenhuma está errada. Frequência responde «o que domina», agrupamento responde «quais são as regiões distintas». Uma ferramenta que oferece um único modo enquadra em silêncio a resposta como a única resposta, e é por isso que o modo é exposto e o copy declara qual pergunta cada modo responde.",
            "A contagem de pixels também traz embutida uma decisão de amostragem. Cada pixel é caro numa imagem grande, então implementações reduzem antes de contar, o que enviesa para áreas grandes e afasta de detalhes finos. É um trade-off razoável para extração de paleta e ruim para análise forense de cor, e pertence à documentação em vez de uma nota de rodapé que ninguém lê.",
          ],
        },
        {
          heading: "Espaço de cor, notação hex e o que os números significam",
          paragraphs: [
            "Uma tríade hex é sRGB, não cor absoluta. O mesmo valor hex exibido em dois monitores sem calibração parece diferente, e impresso parece diferente outra vez. Apresentar hex e RGB é honesto sobre ser um valor referido ao dispositivo; apresentar «a cor do objeto» não seria, porque isso exige um perfil de cor que a imagem pode não carregar e uma calibração que o visualizador pode não ter.",
            "O alfa é um canal separado e normalmente é descartado na extração de paleta, porque uma paleta trata de matiz e valor e não de composição. Descartá-lo em silêncio é uma decisão real: a cor dominante de um PNG transparente pode ser um artefato de borda em vez de uma cor de design, e saber que a transparência foi ignorada muda como a paleta deve ser lida.",
            "A ordenação importa mais do que parece. Ordenar por frequência põe a cor dominante primeiro, que é o que um brief de design quer; ordenar por luminosidade ou matiz põe cores similares adjacentes, que é o que uma comparação visual quer. A ferramenta expõe a ordenação porque uma lista de paleta cuja ordem é arbitrária é uma lista que você não consegue escanear.",
          ],
        },
      ],
    },
    locale,
  );
}

/** CSV 表格编辑器 */
export function csvTableDeepDive(locale: Locale): Section[] | undefined {
  return pick5(
    {
      en: [
        {
          heading: "CSV is not one format, and the difference breaks naive tools",
          paragraphs: [
            "RFC 4180 defines CSV with quoted fields, doubled quotes for a literal quote, and CRLF line endings, but a large share of real CSV in circulation is none of those things. Excel writes its own dialect, semicolon-separated files are common in European locales where the comma is a decimal separator, and pasted text may use tabs. A tool that assumes one dialect produces a table that looks right and is silently shifted by one column on a file that used another.",
            "Delimiter detection is therefore not a convenience but a correctness feature. Counting candidate delimiters on the first non-empty line and choosing the one that produces consistent column counts across the file is what distinguishes a parser from a split. The preview showing the resulting grid is the verification step: if the grid looks wrong, the delimiter was wrong and it is visible before anything is exported.",
            "Quoting is the part that quietly corrupts data. A field containing the delimiter, a quote, or a newline must be quoted, and the quotes must be doubled inside. A splitter that does not handle this turns one row into two and shifts every subsequent row — which is worse than refusing, because the output looks plausible.",
          ],
        },
        {
          heading: "Editing in place without inventing structure",
          paragraphs: [
            "Transposing is the operation users reach for most often, and it has an important property: it requires a rectangular table. A ragged table transposes into nonsense, so the tool has to either reject it or pad it, and padding invents empty cells that were never in the data. Rejecting with a clear message is the honest option, and the reason names the row and column count so the fix is obvious.",
            "Cell editing preserves what it does not touch. A value that is edited gets written back exactly as typed; a value that is not edited keeps its original text, including the specific number spelling. That distinction matters for identifiers with leading zeros and for numbers a spreadsheet would round — retyping every cell on rewrite would lose both.",
            "Export is where the round-trip guarantee is tested. A file read with one dialect must be written with a compatible one, or the next tool in the pipeline misreads it. The export states which delimiter and quoting convention it uses, so a reviewer can check the assumption rather than discover it in production.",
          ],
        },
      ],
      zh: [
        {
          heading: "CSV 不是一种格式,而差异会打垮天真的工具",
          paragraphs: [
            "RFC 4180 规定 CSV 使用引号包裹字段、用重复引号表示字面引号、行尾为 CRLF,但流通中的真实 CSV 有很大一部分三者都不符合。Excel 写它自己的方言;欧洲地区因逗号是小数分隔符而常用分号分隔;粘贴文本可能用制表符。一个假定单一方言的工具产出的表格看起来正确,却在用了另一种方言的文件上悄悄错开一列。",
            "所以分隔符探测不是便利功能,而是正确性功能。在首个非空行上统计候选分隔符,并选择那个能让全文件列数一致的分隔符——这才是解析器与「按字符切分」的区别。预览展示结果网格就是验证步骤:如果网格看起来不对,那就是分隔符不对,而且是在导出任何东西之前就能看见。",
            "引号处理是最容易悄悄损坏数据的一环。字段里若含分隔符、引号或换行,必须被引号包裹,且内部引号要重复。一个不处理这些的切分器会把一行变成两行、并让后续每一行错位——这比拒绝更糟,因为输出看起来还挺合理。",
          ],
        },
        {
          heading: "就地编辑,同时不凭空造结构",
          paragraphs: [
            "转置是用户最常伸手去用的操作,它有个重要性质:要求表格是矩形的。参差表格转置后得到的是无意义内容,所以工具必须要么拒绝、要么填充,而填充会凭空造出数据里从未存在的空单元格。带着明确消息拒绝才是诚实的选项,而且理由会点名行数与列数,让修法一目了然。",
            "单元格编辑保持它不动的东西。被编辑的值按所键入内容原样写回;未被编辑的值保留原始文本,包括具体的数字写法。这个区分对带前导零的标识符和会被表格软件四舍五入的数字很重要——重写时把每个单元格都重新键入,两者都会丢。",
            "导出是往返保证被检验的地方。用一种方言读入的文件必须用兼容方言写出,否则流水线里的下一个工具会误读它。导出会声明它用的是哪种分隔符与引号惯例,这样复核者能去检查这个假设,而不是在生产里才发现。",
          ],
        },
      ],
      ja: [
        {
          heading: "CSV は一つの形式ではなく、その差が素朴なツールを壊す",
          paragraphs: [
            "RFC 4180 は引用符付きフィールド、リテラル引用符の二重化、CRLF 行末を定めますが、流通している実データの多くはそのいずれでもありません。Excel は独自方言を書き、欧州のロケールでは小数点がカンマであるためセミコロン区切りが一般的で、貼り付けたテキストはタブを使うことがあります。単一方言を仮定するツールは正しく見える表を作り、別の方言を使ったファイルでは静かに一列ずれます。",
            "したがって区切り検出は利便機能ではなく正確性機能です。最初の非空行で候補区切りを数え、ファイル全体で列数が一致するものを選ぶことが、パーサーと単なる分割の違いです。結果の格子を表示するプレビューが検証段階です。格子がおかしければ区切りが間違っており、何かを書き出す前に見えます。",
            "引用符はデータを静かに壊す箇所です。区切り・引用符・改行を含むフィールドは引用符で囲み、内側の引用符は二重化します。これを扱わない分割器は一行を二行にし、以降のすべての行をずらします。拒否より悪いのは、出力がもっともらしく見えるからです。",
          ],
        },
        {
          heading: "構造を作り出さずにその場で編集する",
          paragraphs: [
            "転置は利用者が最もよく使う操作で、重要な性質があります。矩形の表が必要です。いびつな表を転置すると無意味な内容ができ、ツールは拒否するか埋めるかのどちらかになり、埋めることはデータになかった空セルを発明します。明確なメッセージで拒否するのが誠実な選択で、理由は行数と列数を示すので修正は明白です。",
            "セル編集は触らないものを保ちます。編集された値は入力どおり書かれ、編集されていない値は元のテキストを保ち、数字の綴りも含みます。この区別は先行ゼロ付き識別子や、表計算ソフトが丸める数値にとって重要です。書き換えで全セルを打ち直せば、どちらも失われます。",
            "書き出しは往復保証が試される場所です。ある方言で読んだファイルは互換な方言で書かねばならず、さもないとパイプラインの次のツールが誤読します。書き出しは使った区切りと引用規則を明示するので、レビュー担当はその仮定を確認でき、本番で発見する必要がありません。",
          ],
        },
      ],
      es: [
        {
          heading: "CSV no es un solo formato, y la diferencia rompe herramientas ingenuas",
          paragraphs: [
            "RFC 4180 define CSV con campos entre comillas, comillas duplicadas para una comilla literal y finales de línea CRLF, pero una gran parte del CSV real en circulación no es ninguna de esas cosas. Excel escribe su propio dialecto, los archivos separados por punto y coma son comunes en locales europeos donde la coma es separador decimal, y el texto pegado puede usar tabuladores. Una herramienta que supone un dialecto produce una tabla que parece correcta y está silenciosamente desfasada una columna en un archivo que usó otro.",
            "La detección de delimitador no es por tanto una comodidad sino una característica de corrección. Contar candidatos en la primera línea no vacía y elegir el que produce conteos de columna consistentes en todo el archivo es lo que distingue un parser de un split. La vista previa mostrando la rejilla resultante es el paso de verificación: si la rejilla se ve mal, el delimitador estaba mal y se ve antes de exportar nada.",
            "Las comillas son la parte que corrompe datos en silencio. Un campo que contiene el delimitador, una comilla o un salto de línea debe ir entre comillas, y las comillas deben duplicarse dentro. Un separador que no maneja esto convierte una fila en dos y desplaza cada fila posterior, lo que es peor que negarse, porque la salida parece plausible.",
          ],
        },
        {
          heading: "Editar in situ sin inventar estructura",
          paragraphs: [
            "Transponer es la operación que los usuarios más buscan, y tiene una propiedad importante: requiere una tabla rectangular. Una tabla irregular transpuesta se vuelve absurda, así que la herramienta debe rechazarla o rellenarla, y rellenar inventa celdas vacías que nunca estuvieron en los datos. Rechazar con un mensaje claro es la opción honesta, y el motivo nombra la fila y el número de columnas para que la corrección sea obvia.",
            "La edición de celdas preserva lo que no toca. Un valor editado se escribe exactamente como se tecleó; un valor no editado mantiene su texto original, incluida la ortografía específica del número. Esa distinción importa para identificadores con ceros iniciales y para números que una hoja de cálculo redondearía: reescribir cada celda perdería ambos.",
            "La exportación es donde se prueba la garantía de ida y vuelta. Un archivo leído con un dialecto debe escribirse con uno compatible, o la siguiente herramienta de la cadena lo malinterpreta. La exportación declara qué delimitador y convención de comillas usa, así un revisor puede comprobar la suposición en vez de descubrirla en producción.",
          ],
        },
      ],
      pt: [
        {
          heading: "CSV não é um único formato, e a diferença quebra ferramentas ingênuas",
          paragraphs: [
            "O RFC 4180 define CSV com campos entre aspas, aspas duplicadas para uma aspa literal e finais de linha CRLF, mas boa parte do CSV real em circulação não é nada disso. O Excel escreve seu próprio dialeto, arquivos separados por ponto e vírgula são comuns em locales europeus onde a vírgula é separador decimal, e texto colado pode usar tabulações. Uma ferramenta que supõe um dialeto produz uma tabela que parece correta e está silenciosamente deslocada uma coluna num arquivo que usou outro.",
            "A detecção de separador não é, portanto, uma conveniência mas uma característica de correção. Contar candidatos na primeira linha não vazia e escolher o que produz contagens de coluna consistentes no arquivo inteiro é o que distingue um parser de um split. A prévia mostrando a grade resultante é o passo de verificação: se a grade parece errada, o separador estava errado e isso é visível antes de exportar qualquer coisa.",
            "As aspas são a parte que corrompe dados em silêncio. Um campo contendo o separador, uma aspa ou uma quebra de linha precisa estar entre aspas, e as aspas devem ser duplicadas dentro. Um divisor que não trata isso transforma uma linha em duas e desloca cada linha seguinte — o que é pior que recusar, porque a saída parece plausível.",
          ],
        },
        {
          heading: "Editar no lugar sem inventar estrutura",
          paragraphs: [
            "Transpor é a operação que os usuários mais buscam, e ela tem uma propriedade importante: exige uma tabela retangular. Uma tabela irregular transposta vira absurdo, então a ferramenta precisa recusá-la ou preenchê-la, e preencher inventa células vazias que nunca estiveram nos dados. Recusar com uma mensagem clara é a opção honesta, e o motivo nomeia a linha e a contagem de colunas para que a correção seja óbvia.",
            "A edição de células preserva o que não toca. Um valor editado é escrito exatamente como foi digitado; um valor não editado mantém seu texto original, incluindo a grafia específica do número. Essa distinção importa para identificadores com zeros à esquerda e para números que uma planilha arredondaria — reescrever cada célula perderia ambos.",
            "A exportação é onde a garantia de ida e volta é testada. Um arquivo lido com um dialeto precisa ser escrito com um compatível, ou a próxima ferramenta da cadeia o interpreta mal. A exportação declara qual separador e convenção de aspas usa, então um revisor pode checar a suposição em vez de descobri-la em produção.",
          ],
        },
      ],
    },
    locale,
  );
}
