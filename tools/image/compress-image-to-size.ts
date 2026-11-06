import { ImageEngineSize } from "../_engines/image-engine-size";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "compress-image-to-size",
  category: "image",
  icon: "image",
  engine: { component: ImageEngineSize, props: { defaultTargetKb: 100 } },
  related: ["image-compressor", "image-resizer", "convert-image", "webp-converter", "image-border", "image-splitter", "grayscale-image", "crop-circle-image", "crop-image", "heic-to-jpg"],
  copy: {
    en: {
      name: "Compress Image to Size",
      tagline:
        "Shrink images to an exact KB budget: a binary search over JPEG or WebP quality lands as close as the format allows — batch, offline, no upload.",
      intro: [
        "Upload forms, email limits and CMS fields demand a size, not a quality slider. Type the ceiling in KB, drop your images, and the tool binary-searches the encoder's quality until the file slips under the line — reporting the exact quality and any downscale it used, per image, in a batch.",
        "It is honest about physics: if the floor of the quality range still exceeds your target, the image is progressively downscaled; if even that cannot reach a tiny budget on a large, detailed photo, you get the closest achievable result, clearly flagged as over target, instead of a silently terrible image.",
        "The mechanism is a binary search over the encoder's quality parameter: each trial encodes the full image, measures the real output size, and halves the search range until it converges — typically within about eight encode passes. The reported quality value is the actual parameter used, not an estimate, and the same search runs independently for every file in the batch.",
        "Compression here is the browser's native canvas JPEG encoder, so results are deterministic and run entirely offline. Note the limits honestly: JPEG is lossy, so very small budgets on large photos will cost visible detail, and PNG input with transparency is flattened against a background during encoding — there is no alpha channel in the output."
      ],
      steps: [
        "Drop in one image or a whole batch.",
        "Type the target size in KB and pick JPEG or WebP.",
        "Hit compress — each row shows the achieved size, quality and scale used.",
        "Download the results that fit, or the honest best-effort copy.",
      ],
      faqs: [
        {
          q: "Why can't every image hit a tiny target size?",
          a: "A photo keeps information even at the lowest quality, so a 2 MB, 4000-px picture may never squeeze into 10 KB. When quality reaches its floor, the tool downscales the pixels too, because resolution is the other lever that reduces bytes. If the target is still out of reach, you get the closest result with an explicit “over target” flag — never a quietly corrupted file.",
        },
        {
          q: "Should I pick JPEG or WebP?",
          a: "WebP typically lands 20–30% smaller than JPEG at the same visual quality, so for a strict budget it usually fits with less quality loss. JPEG is the safer choice when the file must open everywhere, including old software that predates WebP support.",
        },
        {
          q: "How does the search work?",
          a: "The tool re-encodes your image at candidate qualities and binary-searches, halving the range each step, until it finds the highest quality that stays under your target — at most a couple of dozen encodes instead of trial and error. The reported quality percentage is the real value used for the file you download.",
        },
      ],
      deepDive: [
        {
          heading: "Why hitting an exact file size requires iteration",
          paragraphs: [
            "There is no formula that maps a quality value directly to a resulting file size: JPEG output size depends on the image's own complexity — detail, noise, texture — so the same quality setting can produce 200 KB on a flat diagram and 2 MB on a grainy photo. The only reliable way to land under a limit is to compress, measure, adjust and repeat.",
            "This tool automates that loop. You state a target size, it encodes at a starting quality, checks the real byte count and iterates — adjusting quality until the file fits or the quality floor is reached. The result is a file that actually passes the upload check, not one that \"should be about right\".",
            "A quality floor exists for a reason: chasing an aggressive 20 KB target on a detailed photo can push quality so low that blocking artifacts appear. If the loop stops above your target, the honest reading is that the image needs to be smaller in pixels, not just more squeezed.",
          ],
        },
        {
          heading: "Reading the trade-off: quality, dimensions and format",
          paragraphs: [
            "You control two levers and one constraint. The levers are quality (how aggressively pixels are discarded during encoding) and dimensions (how many pixels there are to encode). When a size target cannot be met, shrinking dimensions usually preserves perceived quality better than crushing quality — a 1200 px wide image at quality 70 usually looks better than a 2000 px image at quality 25.",
            "Order of operations matters: resize first, then let quality find the last few percent. Halving both dimensions cuts pixel count by roughly four times, which dwarfs anything the quality slider can achieve.",
            "Format also matters: if the destination accepts WebP, the same perceived quality often lands at a noticeably smaller byte count than JPEG. Keep the original file safe before compressing — compression here is one-way, and there is no quality setting that recovers information already discarded.",
          ],
        },
        {
          heading: "Where hard size limits come from — and privacy",
          paragraphs: [
            "Hard limits surround you in real workflows: government and visa application portals, university admission systems, marketplace listings and email attachments all enforce exact maximums (often 100 KB, 200 KB, 500 KB or 1 MB), and their upload forms reject anything larger without negotiating.",
            "The trick to passing these checks painlessly is to aim slightly below the limit rather than exactly at it: some servers measure the size after their own re-processing, or round differently, and a file that lands 5% under the cap survives those quirks.",
            "Everything here runs locally in your browser — the image is decoded, resized, encoded and measured on your device, and never uploaded. That matters for passport scans, ID documents and application photos, which are exactly the file types these strict portals tend to demand.",
          ],
        },
      ],
    },
    zh: {
      name: "图片压到指定体积",
      tagline:
        "把图片压进精确的 KB 预算:对 JPEG 或 WebP 画质做二分搜索,压到格式允许的最接近值——支持批量,全程本地,不上传。",
      intro: [
        "上传表单、邮件限制、CMS 字段要求的是体积,不是画质滑杆。填入 KB 上限、拖入图片,工具对编码器画质做二分搜索,直到文件落在线下——并逐张报告实际使用的画质与缩放比例,批量处理。",
        "它对物理规律很诚实:如果画质下限仍然超出目标,就渐进缩小尺寸;大而精细的照片实在压不进极小的预算时,你会拿到最接近的结果,并明确标注“超出目标”,而不是一张被悄悄毁掉的图。",
      ],
      steps: [
        "拖入一张或多张图片。",
        "填写目标体积(KB),选择 JPEG 或 WebP。",
        "点击压缩——每行显示实际达到的体积、画质和缩放。",
        "下载达标的结果,或诚实标注的最接近版本。",
      ],
      faqs: [
        {
          q: "为什么不是所有图片都能压到很小的体积?",
          a: "照片即使最低画质也保留大量信息,一张 2 MB、4000 像素的照片可能永远进不了 10 KB。画质触底后,工具会继续缩小分辨率——分辨率是另一个减少字节的杠杆。目标仍不可达时,你拿到的是最接近的结果并带明确的“超出目标”标注,绝不会是悄悄损坏的文件。",
        },
        {
          q: "选 JPEG 还是 WebP?",
          a: "同等观感下 WebP 通常比 JPEG 小 20–30%,严格预算下往往能用更小的画质损失达标。JPEG 更稳妥的场景是文件必须在任何地方都能打开,包括不支持 WebP 的老软件。",
        },
        {
          q: "搜索是怎么工作的?",
          a: "工具用候选画质反复重编码你的图片并做二分搜索,每步把区间减半,直到找到不超目标的最高画质——几十次编码封顶,不用手动试错。报告的画质百分比就是下载文件真实使用的值。",
        },
      ],
      deepDive: [
        {
          heading: "为什么精确命中目标体积必须迭代",
          paragraphs: [
            "不存在“质量值 → 文件体积”的直接公式:JPEG 输出大小取决于图片自身的复杂度——细节、噪点、纹理——同一质量参数在扁平图表上可能出 200 KB,在噪点多的照片上可能出 2 MB。想稳定压进某个限制,唯一的可靠办法就是压一次、量一次、调一次,反复逼近。",
            "本工具把这个循环自动化了。你给出目标体积,它先按一个起始质量编码,检查真实字节数再迭代——不断调整质量,直到达标或触及质量下限。产出的是真正能通过上传校验的文件,而不是“大概差不多”的文件。",
            "设质量下限是有原因的:对细节丰富的照片硬追 20 KB 的激进目标,质量可能被压到出现块状伪影。如果循环停在一个高于目标的体积,诚实的结论是图片需要缩小像素尺寸,而不只是继续挤压质量。",
          ],
        },
        {
          heading: "权衡怎么读:质量、尺寸与格式",
          paragraphs: [
            "你有两个杠杆和一个约束。杠杆是质量(编码时丢弃像素信息的激进程度)和尺寸(有多少像素要编码)。当体积目标压不进去时,缩小尺寸通常比砸质量更能保住观感——1200 px 宽、质量 70 的图,通常比 2000 px、质量 25 的图好看。",
            "操作顺序也有讲究:先缩尺寸,再让质量去找最后几个百分点。宽高各减半,像素数大约降到四分之一,这个量级是质量滑块无论如何都达不到的。",
            "格式同样影响结果:如果目标平台接受 WebP,同样观感下的字节数往往明显小于 JPEG。压缩前务必保留原图——这里的压缩是单向的,没有任何质量参数能找回已经丢弃的信息。",
          ],
        },
        {
          heading: "硬性体积限制从哪来,以及隐私",
          paragraphs: [
            "真实工作流里硬限制无处不在:政务和签证申请门户、高校报名系统、电商上架、邮件附件,都规定精确的最大体积(常见 100 KB、200 KB、500 KB 或 1 MB),上传表单对超出的文件不做任何通融。",
            "顺利过审的诀窍是瞄准比上限略低而不是正好压线:有些服务器在自身处理之后再量体积,或四舍五入口径不同,比上限低 5% 左右的文件才扛得住这些怪癖。",
            "这里的一切都在浏览器本地运行——解码、缩放、编码、测体积都在你的设备上完成,从不上传。这对护照扫描件、证件照和申请照片尤其重要,而这些恰恰是那些严格门户最爱索要的文件类型。",
          ],
        },
      ],
    },
    ja: {
      name: "画像を目標サイズに圧縮",
      tagline:
        "画像を正確な KB 予算に収める:JPEG または WebP の品質を二分探索し、フォーマットが届く限界まで。バッチ対応・完全オフライン・アップロードなし。",
      intro: [
        "アップロードフォームやメールの制限、CMS の入力欄が求めるのはサイズであって品質スライダーではありません。KB の上限を入力して画像をドロップすると、ツールはエンコーダの品質を二分探索し、ファイルが基準を下回る一点を探します。使用した品質と縮小率を 1 枚ごとに報告し、バッチで処理します。",
        "物理法則には正直です:品質の下限でも目標を超えるなら画像を段階的に縮小し、大きく精細な写真が極小の予算に到底入らない場合は、達成可能な最接近結果を「目標超過」と明示して渡します。静かに劣化した画像を渡すことはありません。",
      ],
      steps: [
        "画像を 1 枚でもまとめてでもドロップします。",
        "目標サイズを KB で入力し、JPEG か WebP を選びます。",
        "圧縮を実行 — 各行に達成サイズ・品質・縮小率を表示します。",
        "収まった結果、または正直なベストエフォートをダウンロードします。",
      ],
      faqs: [
        {
          q: "すべての画像が小さい目標サイズに収まらないのはなぜ?",
          a: "写真は最低品質でも多くの情報を保持するため、2 MB・4000 px の画像が 10 KB に入ることはまずありません。品質が下限に達したら、ツールはピクセル数も段階的に縮小します — 解像度はバイト数を減らすもう一つのレバーだからです。それでも届かない場合は、明示的な「目標超過」表示付きの最接近結果を返します。黙って壊れたファイルを渡すことはありません。",
        },
        {
          q: "JPEG と WebP、どちらを選ぶべき?",
          a: "同じ見た目なら WebP は通常 JPEG より 20〜30% 小さくなるため、厳しい予算では少ない品質低下で収まりやすいです。WebP 非対応の古いソフトでも開けることを優先するなら JPEG が無難です。",
        },
        {
          q: "探索の仕組みは?",
          a: "候補の品質で画像を再エンコードし、範囲を半分ずつ絞る二分探索で、目標を下回る最高品質を特定します。手当たり次第ではなく最大数十回のエンコードで済みます。表示される品質パーセントは、ダウンロードするファイルに実際に使った値です。",
        },
      ],
      deepDive: [
        {
          heading: "正確なサイズ達成に反復が必要な理由",
          paragraphs: [
            "「品質値 → ファイルサイズ」を直接計算する公式は存在しません。JPEG の出力サイズは画像自体の複雑さ(ディテール・ノイズ・テクスチャ)に依存し、同じ品質設定でもフラットな図なら 200 KB、ノイズの多い写真では 2 MB になり得ます。制限内に収める唯一の確実な方法は、圧縮して測って調整する反復です。",
            "このツールはそのループを自動化します。目標サイズを指定すると、初期品質でエンコードし、実際のバイト数を確認しながら品質を調整——収まるか品質の下限に達するまで繰り返します。結果として「たぶん大丈夫」ではなく、アップロードチェックを実際に通るファイルが得られます。",
            "品質の下限を設けているのには理由があります:ディテールの多い写真で 20 KB を追いかけると、品質が下がりすぎてブロックノイズが出ます。ループが目標より大きい所で止まったら、正直な結論は「画素数を減らすべき」であって、品質をさらに絞ることではありません。",
          ],
        },
        {
          heading: "トレードオフの読み方:品質・寸法・フォーマット",
          paragraphs: [
            "操作できるのは2つのレバーと1つの制約です。レバーは品質(エンコード時にピクセル情報をどれだけ捨てるか)と寸法(エンコード対象のピクセル数)。サイズ目標が達成できないときは、品質を極端に下げるより寸法を縮める方が見た目の品質を保てます——幅 1200 px・品質 70 の画像は、2000 px・品質 25 より通常きれいです。",
            "順序も大事:まずリサイズし、その後で品質が最後の数%を探ります。縦横を半分にすればピクセル数は約1/4になり、品質スライダーでは届かない規模の削減になります。",
            "フォーマットも影響します:先が WebP を受け付けるなら、同じ見た目で JPEG より明確に小さくなることが多い。圧縮前に元ファイルは必ず保管を——ここでの圧縮は一方通行で、捨てた情報を戻す品質設定は存在しません。",
          ],
        },
        {
          heading: "厳しいサイズ制限の出所とプライバシー",
          paragraphs: [
            "実務には硬い制限が溢れています:官公庁やビザ申請ポータル、大学の出願システム、マーケットプレイス出品、メール添付はいずれも正確な上限(100 KB・200 KB・500 KB・1 MB が典型)を設け、超過ファイルは一切受け付けません。",
            "これらを苦もなく通すコツは、上限ぎりぎりではなく少し下を目指すこと:サーバーが独自の再処理後にサイズを測ったり、丸め方が違ったりするため、上限の5%程度下に収まったファイルだけがそうした癖を生き延びます。",
            "ここではすべてブラウザ内で完結——デコード、リサイズ、エンコード、サイズ測定はすべて端末上で行われ、アップロードは一切ありません。パスポートのスキャン、身分証、申請写真に特に重要で、まさにそうした厳格なポータルが要求するファイル種別です。",
          ],
        },
      ],
    },
    es: {
      name: "Comprimir imagen a tamaño",
      tagline:
        "Reduce imágenes a un presupuesto exacto en KB: una búsqueda binaria de la calidad JPEG o WebP llega tan cerca como el formato permite — por lotes, sin subidas.",
      intro: [
        "Los formularios de subida, los límites de correo y los campos del CMS exigen un tamaño, no un deslizador de calidad. Escribe el techo en KB, suelta tus imágenes y la herramienta busca por bisección la calidad del codificador hasta que el archivo quede bajo la línea — informando la calidad exacta y cualquier reducción usada, imagen por imagen, en lote.",
        "Es honesta con la física: si el suelo del rango de calidad sigue superando tu objetivo, la imagen se reduce progresivamente; y si ni así cabe en un presupuesto diminuto para una foto grande y detallada, obtienes el resultado más cercano, marcado claramente como «sobre el objetivo», nunca una imagen silenciosamente destrozada.",
      ],
      steps: [
        "Suelta una imagen o un lote entero.",
        "Escribe el tamaño objetivo en KB y elige JPEG o WebP.",
        "Pulsa comprimir — cada fila muestra el tamaño logrado, la calidad y la escala usadas.",
        "Descarga los resultados que cumplan, o la copia honesta de mejor esfuerzo.",
      ],
      faqs: [
        {
          q: "¿Por qué no toda imagen puede alcanzar un objetivo minúsculo?",
          a: "Una foto conserva información incluso a la calidad más baja, así que una imagen de 2 MB y 4000 px puede que nunca entre en 10 KB. Cuando la calidad toca su suelo, la herramienta reduce también los píxeles, porque la resolución es la otra palanca que baja los bytes. Si el objetivo sigue fuera de alcance, recibes el resultado más cercano con la marca explícita de «sobre el objetivo» — jamás un archivo corrupto en silencio.",
        },
        {
          q: "¿JPEG o WebP?",
          a: "WebP suele quedar un 20–30% más pequeño que JPEG con la misma calidad visual, así que con un presupuesto estricto normalmente cabe con menos pérdida. JPEG es la apuesta segura cuando el archivo debe abrirse en cualquier parte, incluido software antiguo sin soporte WebP.",
        },
        {
          q: "¿Cómo funciona la búsqueda?",
          a: "La herramienta recodifica tu imagen en calidades candidatas y hace una búsqueda binaria, dividiendo el rango a la mitad en cada paso, hasta hallar la calidad más alta que se mantiene bajo tu objetivo — dos docenas de codificaciones como máximo, en lugar de ensayo y error. El porcentaje de calidad informado es el valor real usado para el archivo que descargas.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué acertar un tamaño exacto exige iterar",
          paragraphs: [
            "No existe una fórmula que convierta un valor de calidad en un tamaño de archivo resultante: el peso del JPEG depende de la complejidad de la propia imagen — detalle, ruido, textura — así que la misma calidad puede producir 200 KB en un diagrama plano y 2 MB en una foto con grano. La única forma fiable de entrar en un límite es comprimir, medir, ajustar y repetir.",
            "Esta herramienta automatiza ese bucle. Tú fijas un tamaño objetivo; ella codifica con una calidad inicial, comprueba los bytes reales e itera — ajustando la calidad hasta que el archivo quepa o se alcance el suelo de calidad. El resultado es un archivo que realmente pasa la verificación de subida, no uno que \"debería estar bien\".",
            "El suelo de calidad existe por algo: perseguir un objetivo agresivo de 20 KB sobre una foto detallada puede hundir la calidad hasta aparecer artefactos en bloques. Si el bucle se detiene por encima de tu objetivo, la lectura honesta es que la imagen necesita menos píxeles, no más compresión.",
          ],
        },
        {
          heading: "Leer el equilibrio: calidad, dimensiones y formato",
          paragraphs: [
            "Gestionas dos palancas y una restricción. Las palancas son la calidad (cuánta información de píxel se descarta al codificar) y las dimensiones (cuántos píxeles hay que codificar). Cuando el objetivo no se alcanza, reducir dimensiones suele conservar mejor la calidad percibida que aplastar la calidad: una imagen de 1200 px al 70 suele verse mejor que una de 2000 px al 25.",
            "El orden importa: primero redimensiona, y deja que la calidad encuentre los últimos puntos. Reducir ambos lados a la mitad deja los píxeles en una cuarta parte, algo que el deslizador de calidad jamás consigue.",
            "El formato también cuenta: si el destino acepta WebP, la misma calidad percibida suele caber en bastantes menos bytes que en JPEG. Guarda el original antes de comprimir: aquí la compresión es de un solo sentido y no hay ajuste que recupere la información ya descartada.",
          ],
        },
        {
          heading: "De dónde salen los límites duros — y privacidad",
          paragraphs: [
            "Los límites duros están por todos lados: portales de trámites y visados, sistemas de admisión universitaria, mercados online y adjuntos de correo imponen máximos exactos (a menudo 100 KB, 200 KB, 500 KB o 1 MB) y sus formularios rechazan lo que se pasa, sin negociación.",
            "El truco para superarlos sin dolor es apuntar algo por debajo del límite y no justo al borde: algunos servidores miden el tamaño tras su propio reprocesado o redondean distinto, y un archivo un 5 % por debajo del tope sobrevive a esas peculiaridades.",
            "Todo aquí funciona localmente en tu navegador — la imagen se decodifica, redimensiona, codifica y mide en tu dispositivo, y nunca se sube. Eso importa con escaneos de pasaporte, documentos de identidad y fotos de solicitud, justo los tipos de archivo que esos portales exigentes piden.",
          ],
        },
      ],
    },
    pt: {
      name: "Comprimir imagem para tamanho",
      tagline:
        "Encolhe imagens para um orçamento exato em KB: uma busca binária na qualidade JPEG ou WebP vai até onde o formato permite — em lote, offline, sem upload.",
      intro: [
        "Formulários de upload, limites de e-mail e campos de CMS exigem um tamanho, não um slider de qualidade. Digite o teto em KB, solte suas imagens e a ferramenta faz uma busca binária na qualidade do codificador até o arquivo ficar sob a linha — relatando a qualidade exata e qualquer redução usada, imagem por imagem, em lote.",
        "Ela é honesta com a física: se o piso da faixa de qualidade ainda passa do alvo, a imagem é reduzida progressivamente; e se nem assim uma foto grande e detalhada cabe num orçamento minúsculo, você recebe o resultado mais próximo possível, sinalizado claramente como “acima do alvo” — nunca uma imagem silenciosamente arruinada.",
      ],
      steps: [
        "Solte uma imagem ou um lote inteiro.",
        "Digite o tamanho alvo em KB e escolha JPEG ou WebP.",
        "Clique em comprimir — cada linha mostra o tamanho alcançado, a qualidade e a escala usadas.",
        "Baixe os resultados que couberem, ou a cópia honesta de melhor esforço.",
      ],
      faqs: [
        {
          q: "Por que nem toda imagem alcança um alvo minúsculo?",
          a: "Uma foto mantém informação mesmo na qualidade mais baixa, então uma imagem de 2 MB e 4000 px pode nunca caber em 10 KB. Quando a qualidade chega ao piso, a ferramenta reduz também os pixels — resolução é a outra alavanca que diminui os bytes. Se o alvo ainda estiver fora de alcance, você recebe o resultado mais próximo com a marcação explícita “acima do alvo” — jamais um arquivo corrompido em silêncio.",
        },
        {
          q: "Devo escolher JPEG ou WebP?",
          a: "WebP normalmente fica 20–30% menor que JPEG na mesma qualidade visual, então num orçamento rígido costuma caber com menos perda. JPEG é a escolha segura quando o arquivo precisa abrir em qualquer lugar, inclusive em software antigo sem suporte a WebP.",
        },
        {
          q: "Como funciona a busca?",
          a: "A ferramenta recodifica sua imagem em qualidades candidatas e faz uma busca binária, dividindo o intervalo pela metade a cada passo, até achar a maior qualidade que fica sob o alvo — no máximo algumas dezenas de codificações, em vez de tentativa e erro. A porcentagem de qualidade relatada é o valor real usado no arquivo que você baixa.",
        },
      ],
      deepDive: [
        {
          heading: "Por que acertar um tamanho exato exige iterar",
          paragraphs: [
            "Não existe fórmula que converta um valor de qualidade num tamanho de arquivo resultante: o peso do JPEG depende da complexidade da própria imagem — detalhe, ruído, textura — então a mesma qualidade pode gerar 200 KB num diagrama plano e 2 MB numa foto com grão. O único caminho confiável para caber num limite é comprimir, medir, ajustar e repetir.",
            "Esta ferramenta automatiza esse ciclo. Você define um tamanho-alvo; ela codifica com uma qualidade inicial, verifica os bytes reais e itera — ajustando a qualidade até o arquivo caber ou atingir o piso de qualidade. O resultado é um arquivo que realmente passa na verificação de envio, não um que \"deveria estar certo\".",
            "O piso de qualidade existe por um motivo: perseguir uma meta agressiva de 20 KB numa foto detalhada pode derrubar a qualidade até surgirem artefatos em blocos. Se o ciclo parar acima do seu alvo, a leitura honesta é que a imagem precisa de menos pixels, não de mais espremimento.",
          ],
        },
        {
          heading: "Lendo a troca: qualidade, dimensões e formato",
          paragraphs: [
            "Você controla duas alavancas e uma restrição. As alavancas são a qualidade (quanta informação de pixel é descartada ao codificar) e as dimensões (quantos pixels existem para codificar). Quando o alvo não é alcançado, reduzir as dimensões costuma preservar melhor a qualidade percebida do que esmagar a qualidade: uma imagem de 1200 px a 70 normalmente parece melhor que uma de 2000 px a 25.",
            "A ordem importa: primeiro redimensione, e deixe a qualidade achar os últimos pontos. Reduzir os dois lados pela metade deixa os pixels em um quarto, algo que o controle de qualidade jamais alcança.",
            "O formato também conta: se o destino aceita WebP, a mesma qualidade percebida costuma caber em bem menos bytes que no JPEG. Guarde o original antes de comprimir: a compressão aqui é de sentido único e nenhum ajuste recupera a informação já descartada.",
          ],
        },
        {
          heading: "De onde vêm os limites rígidos — e privacidade",
          paragraphs: [
            "Limites rígidos cercam você nos fluxos reais: portais de trâmites e vistos, sistemas de admissão universitária, marketplaces e anexos de e-mail impõem máximos exatos (frequentemente 100 KB, 200 KB, 500 KB ou 1 MB) e seus formulários rejeitam qualquer arquivo maior, sem negociação.",
            "O truque para passar sem sofrimento é mirar um pouco abaixo do limite, não exatamente nele: alguns servidores medem o tamanho após o próprio reprocessamento ou arredondam de outro jeito, e um arquivo 5 % abaixo do teto sobrevive a essas particularidades.",
            "Tudo aqui roda localmente no seu navegador — a imagem é decodificada, redimensionada, codificada e medida no seu dispositivo, e nunca enviada. Isso importa com digitalizações de passaporte, documentos de identidade e fotos de candidatura, exatamente os tipos de arquivo que esses portais exigentes pedem.",
          ],
        },
      ],
    },
  },
});
