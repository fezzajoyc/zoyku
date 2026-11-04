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
    },
  },
});
