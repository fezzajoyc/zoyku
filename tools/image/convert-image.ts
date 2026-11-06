import { ImageCanvasEngine } from "../_engines/image-engine-canvas";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "convert-image",
  category: "image",
  icon: "swap",
  engine: {
    component: ImageCanvasEngine,
    props: { op: "convert", accept: "image/*", defaultFormat: "image/webp", defaultQuality: 0.9, suffix: "-converted" },
  },
  related: ["webp-converter", "jpg-to-png", "png-to-jpg", "image-compressor", "image-border", "image-splitter", "compress-image-to-size", "grayscale-image", "crop-circle-image", "crop-image"],
  copy: {
    en: {
      name: "Image Converter",
      tagline:
        "Convert images between PNG, JPG and WebP with adjustable quality — drop a whole folder and download every result in one click.",
      intro: [
        "One converter for the three formats that matter: PNG for lossless graphics and transparency, JPG for universal photo compatibility, WebP for the smallest files at high quality. Pick the target format, tune the quality slider when the format allows it, and every dropped file is converted in place.",
        "Conversion runs on your device with the browser's own canvas encoder — there is no upload step at all. Each result row shows the size before and after, so you can see immediately whether the format change actually helped.",
        "The conversions run through the browser's own encoders via canvas: PNG is produced losslessly, JPG is lossy with the quality slider controlling the trade-off, and WebP support depends on your browser — all current versions of Chrome, Edge, Firefox and Safari encode it. Sizes before and after are shown per file, so the format choice is judged on real numbers.",
        "Two format realities to plan around: converting PNG to JPG flattens transparency onto a solid background (JPG has no alpha channel), and converting JPG to PNG rarely shrinks the file, since PNG is lossless and photographs compress poorly in it. Pick JPG or WebP for photos, PNG for graphics, screenshots and anything with sharp edges or transparency."
      ],
      steps: [
        "Drop any images — mixed formats are fine.",
        "Choose PNG, JPG or WebP as the output; set quality for JPG or WebP.",
        "Download the converted files individually or all together.",
      ],
      faqs: [
        {
          q: "Which output format should I choose?",
          a: "JPG for photos that must open anywhere; WebP for the web when smaller files matter; PNG for screenshots, logos and anything needing transparency or pixel-perfect saves. When in doubt for photos, WebP at quality ~85 is a great default.",
        },
        {
          q: "Does converting a JPG to PNG improve its quality?",
          a: "No. The JPEG compression artifacts are already baked into the pixels and converting cannot remove them — the PNG will simply store the same look losslessly, usually at a larger size. Converting only changes the container and encoding, not the captured detail.",
        },
        {
          q: "Do all browsers support WebP conversion?",
          a: "Chrome, Edge, Firefox and Safari 17+ can save WebP. If your browser cannot encode WebP, the tool tells you and falls back to JPG so you always get a usable file.",
        },
      ],
      deepDive: [
        {
          heading: "Picking a target format by what must survive",
          paragraphs: [
            "Format conversion is really a question about which properties matter for the destination. Ask three questions: does it need transparency (PNG or WebP yes, JPG no), is it photographic or graphic content (JPG/WebP for photos, PNG for text and hard edges), and does the receiver accept the format at all (some platforms, CMS and older software only take JPG and PNG).",
            "Two constraints narrow the choice quickly. If transparency must survive, JPG is out immediately. If the file must open in unknown software — a form, a printer, a client's ancient Windows — JPG and PNG are the safest bets because every image system of the last decades reads them.",
            "WebP occupies the efficient middle: smaller than JPG at equal quality, transparent-capable, but with the longest compatibility tail. The pragmatic pattern is to convert to WebP for your own sites and to JPG/PNG for everywhere you cannot control.",
          ],
        },
        {
          heading: "What conversion actually costs",
          paragraphs: [
            "Conversion between lossy formats is a re-encode: a JPG re-saved as lossy WebP discards data a second time. At high quality the loss is invisible, but chained lossy conversions — JPG to WebP to JPG — accumulate artifacts like any repeated compression. Convert once, toward the final format.",
            "Going to a lossless format is always information-preserving relative to the source: JPG to PNG keeps everything the JPG contains, including its artifacts, but loses nothing further. The file grows because losslessness must record every pixel faithfully.",
            "Watch transparency through the pipeline: converting an image with an alpha channel to JPG silently fills the transparent areas with a background color. If the result shows an unexpected white or black box, that is the alpha channel being flattened, not corruption.",
          ],
        },
        {
          heading: "Batch conversion and local processing",
          paragraphs: [
            "The realistic scenario for a general converter is a folder of mismatched files: screenshots in PNG that a form wants as JPG, downloaded WebP that an old editor cannot open, mixed batches headed to one platform's uploader. Batch mode applies one target format and one quality setting across the folder.",
            "Sorting the batch before converting saves rework: photographic items can go to JPG, graphic items to PNG, in two passes instead of one compromise setting. A single universal choice usually serves the platform, not the images.",
            "Everything runs in your browser: decode, conversion and download happen on your device with no upload. Converting client assets, unreleased designs or personal archives means those files never leave your machine at any point.",
          ],
        },
      ],
    },
    zh: {
      name: "图片格式转换",
      tagline: "PNG、JPG、WebP 三种格式互转,画质可调,整批拖入一键转换——全部在本机完成,不上传任何文件。",
      intro: [
        "一个转换器覆盖三种常用格式:PNG 无损、支持透明,适合图形;JPG 兼容性最好,适合照片;WebP 同画质体积最小,适合网页。选好目标格式,按需拖动画质滑块,拖入的每个文件即刻转换。",
        "转换由浏览器自带的 canvas 编码器在本机完成,完全没有上传环节。每行结果都显示转换前后的体积,格式换了到底省没省,一眼便知。",
      ],
      steps: [
        "拖入任意图片——格式混杂也没关系。",
        "选择 PNG、JPG 或 WebP 输出;JPG / WebP 可调画质。",
        "逐张或一键下载转换后的文件。",
      ],
      faqs: [
        {
          q: "应该选哪种输出格式?",
          a: "照片需要到处都能打开选 JPG;网页上追求体积选 WebP;截图、Logo 和需要透明或像素级无损的场景选 PNG。拿不准时,照片用 WebP 画质 85 左右是很稳的默认值。",
        },
        {
          q: "把 JPG 转成 PNG 画质会变好吗?",
          a: "不会。JPEG 的压缩痕迹已经写进像素里,转换无法消除——PNG 只是无损地保存同样的画面,体积通常反而更大。转换只改封装和编码方式,不改变已捕获的细节。",
        },
        {
          q: "所有浏览器都支持 WebP 转换吗?",
          a: "Chrome、Edge、Firefox 和 Safari 17+ 都能保存 WebP。如果你的浏览器不支持 WebP 编码,工具会提示并自动改用 JPG,保证你总能拿到可用的文件。",
        },
      ],
      deepDive: [
        {
          heading: "按“什么必须保留”来选目标格式",
          paragraphs: [
            "格式转换本质上是问:对目的地而言,哪些属性最重要。先问三个问题:需要透明吗(PNG 和 WebP 支持,JPG 不支持);内容是照片还是图形(照片用 JPG/WebP,文字和硬边缘用 PNG);接收方认不认这个格式(有些平台、CMS 和旧软件只收 JPG 和 PNG)。",
            "两个约束条件能很快缩小选择。如果透明必须保留,JPG 立刻出局。如果文件要在未知软件里打开——表单、打印机、客户的祖传 Windows——JPG 和 PNG 是最稳的选项,因为过去几十年的所有图像系统都读它们。",
            "WebP 占据高效中间带:同等质量比 JPG 小、支持透明,但兼容性尾巴最长。务实的模式是:自己的网站用 WebP,无法掌控的场合用 JPG/PNG。",
          ],
        },
        {
          heading: "转换真正的代价是什么",
          paragraphs: [
            "有损格式之间的转换是重新编码:JPG 另存为有损 WebP 会第二次丢弃数据。高质量设置下损失不可见,但把有损转换串成链——JPG 转 WebP 再转回 JPG——伪影会和任何重复压缩一样越积越多。只转一次,直接转向最终格式。",
            "转向无损格式,相对源图永远是信息保持的:JPG 转 PNG 会保住 JPG 里的一切,包括它的伪影,但不再丢失任何东西。文件变大,是因为无损必须逐像素如实记录。",
            "在整条流水线里盯着透明:带透明通道的图转 JPG 时,透明区域会被静默填充成背景色。如果结果出现意外的白框或黑框,那是透明通道被拍平了,不是文件损坏。",
          ],
        },
        {
          heading: "批量转换与本地处理",
          paragraphs: [
            "通用转换器的现实场景是一文件夹的格式不齐:表单要 JPG 的 PNG 截图、老编辑器打不开的下载 WebP、发往同一个上传口的混合批次。批量模式把一个目标格式、一个质量设置应用到整个文件夹。",
            "转换前先给批次分类能省返工:照片类走 JPG、图形类走 PNG,分两轮做,而不是用一个折中设置。单一的全局选择通常服务的是平台,不是图片。",
            "一切都在浏览器内运行:解码、转换、下载都发生在你的设备上,没有上传。转换客户素材、未发布设计或个人归档,意味着这些文件在任何时刻都不曾离开你的机器。",
          ],
        },
      ],
    },
    ja: {
      name: "画像フォーマット変換",
      tagline:
        "PNG・JPG・WebP を品質調整付きで相互変換。フォルダごとドロップして結果をワンクリックで保存——処理はすべて端末内です。",
      intro: [
        "重要な 3 フォーマットを 1 つの変換器で:PNG はロスレスと透明対応のグラフィック向け、JPG は互換性最優先の写真向け、WebP は同品質で最も小さい Web 向け。出力形式を選び、可能な場合は品質スライダーを調整すれば、ドロップした全ファイルがその場で変換されます。",
        "変換はブラウザ内蔵の canvas エンコーダーで端末内のみで実行——アップロード工程は一切ありません。各行に変換前後のサイズを表示するので、形式を変えて実際に得したかすぐわかります。",
      ],
      steps: [
        "任意の画像をドロップ——形式が混在していても構いません。",
        "出力を PNG・JPG・WebP から選び、JPG / WebP は品質を設定します。",
        "変換後のファイルを 1 枚ずつ、またはまとめてダウンロードします。",
      ],
      faqs: [
        {
          q: "出力フォーマットはどれを選ぶべき?",
          a: "どこでも開ける写真には JPG、サイズを重視する Web には WebP、スクリーンショット・ロゴ・透明やピクセル完璧な保存が必要なものには PNG。迷ったら写真は WebP 品質 85 前後が良い既定値です。",
        },
        {
          q: "JPG を PNG に変えると画質は上がりますか?",
          a: "上がりません。JPEG の圧縮ノイズはすでにピクセルに焼き付いており、変換では消せません。PNG は同じ見た目をロスレスで保存するだけで、サイズはむしろ大きくなりがちです。変換は容器とエンコードを変えるだけで、捉えたディテールは変わりません。",
        },
        {
          q: "すべてのブラウザで WebP 変換できますか?",
          a: "Chrome・Edge・Firefox・Safari 17 以降なら WebP で保存できます。対応していないブラウザではツールが通知し、JPG に自動フォールバックするので、常に使えるファイルが手に入ります。",
        },
      ],
      deepDive: [
        {
          heading: "「何を残すべきか」で目標フォーマットを選ぶ",
          paragraphs: [
            "フォーマット変換の本質は、行き先にとってどの性質が重要かという問いです。3 つ聞いてください:透過が必要か(PNG と WebP は可、JPG は不可)、写真系かグラフィック系か(写真は JPG/WebP、文字と硬いエッジは PNG)、受け手がそのフォーマットを認めるか(一部のプラットフォーム、CMS、旧ソフトは JPG と PNG しか受け付けない)。",
            "2 つの制約が選択を速く絞ります。透過が生き残るべきなら、JPG は即アウト。未知のソフト——フォーム、プリンター、クライアントの古い Windows——で開く必要があるなら、JPG と PNG が最も安全で、ここ数十年のあらゆる画像システムが読めます。",
            "WebP は効率的な中間に位置します:同品質なら JPG より小さく、透過にも対応するが、互換性の裾が最も長い。実務パターンは、自分のサイトには WebP、コントロールできない場所には JPG/PNG。",
          ],
        },
        {
          heading: "変換が実際に払う代償",
          paragraphs: [
            "非可逆フォーマット間の変換は再エンコードです:JPG を非可逆 WebP で保存し直すと、データが 2 度目に捨てられます。高品質なら損失は見えませんが、非可逆変換を連結する——JPG→WebP→JPG——と、繰り返し圧縮と同じくアーティファクトが積み重なります。変換は一度、最終フォーマットへ直接。",
            "可逆フォーマットへの変換は、ソース相対で常に情報を保持します:JPG→PNG は JPG が含むすべて(アーティファクト込み)を保ち、それ以上は失いません。ファイルが増えるのは、可逆性が全ピクセルを忠実に記録する必要があるからです。",
            "パイプライン全体で透過を見張る:アルファチャンネル付き画像を JPG へ変換すると、透過領域は背景色で静かに埋められます。結果に予期しない白や黒の四角が現れたら、それはアルファが平坦化されたのであって、破損ではありません。",
          ],
        },
        {
          heading: "一括変換とローカル処理",
          paragraphs: [
            "汎用コンバーターの現実的なシナリオは、フォーマットの揃わないフォルダです:フォームが JPG を求める PNG スクショ、古いエディタが開けないダウンロード WebP、同じアップローダーへ向かう混在バッチ。一括モードは 1 つの目標フォーマットと 1 つの品質設定をフォルダ全体に適用します。",
            "変換前にバッチを仕分けすると手戻りが減ります:写真系は JPG、グラフィック系は PNG へ、1 つの妥協設定ではなく 2 回のパスで。単一の万能選択は通常、画像ではなくプラットフォームに奉仕します。",
            "すべてはブラウザ内で実行:デコード、変換、ダウンロードは端末上で行われ、アップロードはありません。クライアント資産、未公開デザイン、個人アーカイブの変換は、それらのファイルがいかなる時点でも端末を離れないことを意味します。",
          ],
        },
      ],
    },
    es: {
      name: "Convertidor de imágenes",
      tagline:
        "Convierte imágenes entre PNG, JPG y WebP con calidad ajustable — suelta una carpeta entera y descarga todos los resultados de una vez.",
      intro: [
        "Un convertidor para los tres formatos que importan: PNG para gráficos sin pérdida y transparencia, JPG para fotos compatibles con todo, WebP para los archivos más pequeños con gran calidad. Elige el formato de salida, ajusta la calidad cuando el formato lo permita y cada archivo soltado se convierte al instante.",
        "La conversión ocurre en tu dispositivo con el codificador canvas del navegador: no hay ningún paso de subida. Cada fila muestra el tamaño antes y después, así ves de inmediato si el cambio de formato realmente ayudó.",
      ],
      steps: [
        "Suelta cualquier imagen — pueden mezclarse formatos.",
        "Elige PNG, JPG o WebP como salida; fija la calidad para JPG o WebP.",
        "Descarga los archivos convertidos uno a uno o todos juntos.",
      ],
      faqs: [
        {
          q: "¿Qué formato de salida elijo?",
          a: "JPG para fotos que deben abrirse en cualquier sitio; WebP para la web cuando importan los archivos pequeños; PNG para capturas, logos y todo lo que necesite transparencia o guardado píxel-perfecto. Si dudas con fotos, WebP con calidad ~85 es un gran valor por defecto.",
        },
        {
          q: "¿Convertir un JPG a PNG mejora su calidad?",
          a: "No. Los artefactos de compresión JPEG ya están horneados en los píxeles y la conversión no puede eliminarlos: el PNG simplemente guarda el mismo aspecto sin pérdida, normalmente en un tamaño mayor. Convertir solo cambia el contenedor y la codificación, no el detalle capturado.",
        },
        {
          q: "¿Todos los navegadores soportan conversión a WebP?",
          a: "Chrome, Edge, Firefox y Safari 17+ pueden guardar WebP. Si tu navegador no puede codificar WebP, la herramienta te avisa y usa JPG como alternativa para que siempre obtengas un archivo utilizable.",
        },
      ],
      deepDive: [
        {
          heading: "Elegir el formato de destino según lo que deba sobrevivir",
          paragraphs: [
            "La conversión de formato es realmente una pregunta sobre qué propiedades importan para el destino. Haz tres preguntas: ¿necesita transparencia (PNG y WebP sí, JPG no), es contenido fotográfico o gráfico (JPG/WebP para fotos, PNG para texto y bordes duros), y acaso el receptor acepta el formato (algunas plataformas, CMS y software antiguo solo toman JPG y PNG)?",
            "Dos restricciones estrechan la elección rápido. Si la transparencia debe sobrevivir, el JPG queda fuera de inmediato. Si el archivo debe abrirse en software desconocido — un formulario, una imprenta, el Windows ancestral de un cliente — JPG y PNG son las apuestas más seguras, porque todos los sistemas de imagen de las últimas décadas los leen.",
            "WebP ocupa el punto medio eficiente: más pequeño que JPG a igual calidad, capaz de transparencia, pero con la cola de compatibilidad más larga. El patrón pragmático es convertir a WebP para tus propios sitios y a JPG/PNG para todos los sitios que no controlas.",
          ],
        },
        {
          heading: "Lo que la conversión realmente cuesta",
          paragraphs: [
            "La conversión entre formatos con pérdida es una recodificación: un JPG re-guardado como WebP con pérdida descarta datos por segunda vez. Con calidad alta la pérdida es invisible, pero encadenar conversiones con pérdida — JPG a WebP a JPG — acumula artefactos como cualquier compresión repetida. Convierte una vez, hacia el formato final.",
            "Ir a un formato sin pérdida siempre conserva la información respecto a la fuente: JPG a PNG guarda todo lo que el JPG contiene, incluidos sus artefactos, pero no pierde nada más. El archivo crece porque la ausencia de pérdidas debe registrar cada píxel fielmente.",
            "Vigila la transparencia por todo el flujo: convertir una imagen con canal alfa a JPG rellena silenciosamente las zonas transparentes con un color de fondo. Si el resultado muestra un recuadro blanco o negro inesperado, es el canal alfa aplanándose, no corrupción.",
          ],
        },
        {
          heading: "Conversión por lotes y procesado local",
          paragraphs: [
            "El escenario realista de un conversor general es una carpeta de archivos desiguales: capturas en PNG que un formulario quiere en JPG, WebP descargados que un editor antiguo no abre, lotes mixtos rumbo al cargador de una sola plataforma. El modo por lotes aplica un formato objetivo y una calidad a toda la carpeta.",
            "Ordenar el lote antes de convertir ahorra retrabajo: los elementos fotográficos pueden ir a JPG y los gráficos a PNG, en dos pasadas en lugar de un ajuste de compromiso. Una elección universal única suele servir a la plataforma, no a las imágenes.",
            "Todo ocurre en tu navegador: decodificar, convertir y descargar suceden en tu dispositivo sin subida. Convertir recursos de clientes, diseños no publicados o archivos personales significa que esos archivos nunca salen de tu máquina en ningún momento.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor de imagens",
      tagline:
        "Converta imagens entre PNG, JPG e WebP com qualidade ajustável — solte uma pasta inteira e baixe todos os resultados de uma vez.",
      intro: [
        "Um conversor para os três formatos que importam: PNG para gráficos sem perdas e transparência, JPG para fotos com compatibilidade universal, WebP para os arquivos menores com ótima qualidade. Escolha o formato de saída, ajuste a qualidade quando o formato permitir e cada arquivo solto é convertido na hora.",
        "A conversão acontece no seu dispositivo com o codificador canvas do navegador — não existe etapa de upload. Cada linha mostra o tamanho antes e depois, então você vê na hora se a mudança de formato realmente compensou.",
      ],
      steps: [
        "Solte quaisquer imagens — formatos misturados são bem-vindos.",
        "Escolha PNG, JPG ou WebP como saída; ajuste a qualidade para JPG ou WebP.",
        "Baixe os arquivos convertidos individualmente ou todos juntos.",
      ],
      faqs: [
        {
          q: "Qual formato de saída escolher?",
          a: "JPG para fotos que precisam abrir em qualquer lugar; WebP para a web quando o tamanho importa; PNG para capturas, logos e tudo que precisa de transparência ou salvamento fiel ao pixel. Na dúvida com fotos, WebP com qualidade ~85 é um ótimo padrão.",
        },
        {
          q: "Converter um JPG para PNG melhora a qualidade?",
          a: "Não. Os artefatos de compressão JPEG já estão gravados nos pixels e a conversão não os remove — o PNG apenas guarda o mesmo visual sem perdas, geralmente num tamanho maior. Converter muda o contêiner e a codificação, não o detalhe capturado.",
        },
        {
          q: "Todos os navegadores suportam conversão para WebP?",
          a: "Chrome, Edge, Firefox e Safari 17+ podem salvar WebP. Se o seu navegador não conseguir codificar WebP, a ferramenta avisa e usa JPG como alternativa para que você sempre receba um arquivo utilizável.",
        },
      ],
      deepDive: [
        {
          heading: "Escolher o formato de destino pelo que precisa sobreviver",
          paragraphs: [
            "A conversão de formato é, no fundo, uma pergunta sobre quais propriedades importam para o destino. Faça três perguntas: precisa de transparência (PNG e WebP sim, JPG não), é conteúdo fotográfico ou gráfico (JPG/WebP para fotos, PNG para texto e bordas duras), e o receptor aceita o formato (algumas plataformas, CMS e software antigo só tomam JPG e PNG)?",
            "Duas restrições estreitam a escolha rápido. Se a transparência precisa sobreviver, o JPG sai de imediato. Se o arquivo deve abrir em software desconhecido — um formulário, uma gráfica, o Windows antigo de um cliente — JPG e PNG são as apostas mais seguras, porque todos os sistemas de imagem das últimas décadas os leem.",
            "O WebP ocupa o meio eficiente: menor que JPG com igual qualidade, capaz de transparência, mas com a cauda de compatibilidade mais longa. O padrão pragmático é converter para WebP nos seus próprios sites e para JPG/PNG em todos os lugares que você não controla.",
          ],
        },
        {
          heading: "O que a conversão realmente custa",
          paragraphs: [
            "A conversão entre formatos com perdas é uma recodificação: um JPG salvo de novo como WebP com perdas descarta dados uma segunda vez. Com qualidade alta a perda é invisível, mas encadear conversões com perdas — JPG para WebP para JPG — acumula artefatos como qualquer compressão repetida. Converta uma vez, direto ao formato final.",
            "Ir para um formato sem perdas sempre preserva a informação em relação à fonte: JPG para PNG mantém tudo o que o JPG contém, incluindo seus artefatos, mas não perde nada além disso. O arquivo cresce porque a ausência de perdas precisa registrar cada pixel fielmente.",
            "Fique de olho na transparência por todo o fluxo: converter uma imagem com canal alfa para JPG preenche silenciosamente as áreas transparentes com uma cor de fundo. Se o resultado mostra um retângulo branco ou preto inesperado, é o canal alfa sendo achatado, não corrupção.",
          ],
        },
        {
          heading: "Conversão em lote e processamento local",
          paragraphs: [
            "O cenário realista de um conversor geral é uma pasta de arquivos desiguais: capturas em PNG que um formulário quer em JPG, WebP baixados que um editor antigo não abre, lotes mistos rumo ao envio de uma única plataforma. O modo em lote aplica um formato-alvo e uma qualidade a toda a pasta.",
            "Ordenar o lote antes de converter economiza retrabalho: os itens fotográficos podem ir para JPG e os gráficos para PNG, em duas passadas em vez de uma configuração de compromisso. Uma única escolha universal geralmente serve à plataforma, não às imagens.",
            "Tudo acontece no seu navegador: decodificar, converter e baixar ocorrem no seu dispositivo sem envio. Converter recursos de clientes, designs não publicados ou arquivos pessoais significa que esses arquivos nunca saem da sua máquina em nenhum momento.",
          ],
        },
      ],
    },
  },
});
