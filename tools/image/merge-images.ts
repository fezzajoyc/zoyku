import { ImageMergeEngine } from "../_engines/image-engine-merge";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "merge-images",
  category: "image",
  icon: "layers",
  engine: { component: ImageMergeEngine },
  related: ["image-compressor", "crop-image", "jpg-to-pdf", "image-resizer", "grayscale-image", "image-border", "image-splitter", "compress-image-to-size", "crop-circle-image", "heic-to-jpg"],
  copy: {
    en: {
      name: "Merge Images",
      tagline: "Combine 2–9 images into one — side by side, stacked or as a grid, with gap and background control.",
      intro: [
        "Build before/after shots, comparison strips and sprite sheets: drop 2 to 9 images, pick a layout, set the gap and background color, and the merged image is composed on your device at full resolution.",
        "Images are scaled to a common height (side by side), width (stacked) or cell (grid), so nothing gets cropped or stretched.",
      
        "Layout math is deterministic: side-by-side scales all images to the tallest image's height, stacked to the widest width, and grid places each in an equal cell — so a landscape and a portrait merge cleanly without cropping. Gap color is user-picked; on PNG output with transparent padding the gaps can stay see-through.",
        "Compared with stitching in a photo editor or building an HTML screenshot, the merged result is a single real file at full resolution — no browser zoom artifacts, no per-image alignment fiddling. And unlike upload-based combiners, a set of client mockups or private screenshots never travels anywhere for the merge.",
      ],
      steps: [
        "Drop 2–9 images in the order you want them merged.",
        "Pick a layout and tune the gap and background color.",
        "Click Merge images and download the result.",
      ],
      faqs: [
        {
          q: "What resolution is the output?",
          a: "Full resolution: the canvas is sized from the (scaled) input dimensions, so a merge of 3 × 2000px photos is roughly 6000px wide.",
        },
        {
          q: "Does the order matter?",
          a: "Yes — images are placed in the list order, left to right, top to bottom. Remove and re-add to change it.",
        },
      ],
      deepDive: [
        {
          heading: "Choosing a layout: side by side, stacked, or grid",
          paragraphs: [
            "Merging is a layout decision before it is a technical one. Horizontal merging suits sequences that read left to right — before/after comparisons, step one beside step two. Vertical stacking suits lists and chat-style content, where each image continues downward. Grid layouts suit collages and multi-panel comparisons where no reading order dominates.",
            "The hidden variable is differing input sizes. When merged images do not share a dimension, the tool has to decide: stretch to match (distorts), pad to match (letterboxes with background color), or align to one edge and accept asymmetry. Knowing which behavior you are getting prevents most surprises.",
            "Spacing and background color are the polish layer: a few pixels of gap with a neutral background turns two slapped-together images into a deliberate composite. On transparent backgrounds the gap stays see-through in PNG output, which matters for overlays.",
          ],
        },
        {
          heading: "Format behavior when merging",
          paragraphs: [
            "Merging is usually lossless in structure — it is composition, not compression — but the output format decides what happens next. PNG output preserves every input pixel exactly and keeps transparency; it is the safe default for screenshots, graphics and anything with text.",
            "JPG output bakes the merged result into a flat rectangle: transparent gaps become a solid fill, and the whole composite takes one round of lossy compression. That is fine for photographic composites and required size-wise when many large photos merge into one file.",
            "Watch total dimensions: merging vertically stacks heights and keeps the widest width, so a folder of tall screenshots can produce a result taller than many viewers display comfortably. Splitting or scaling inputs before merging sometimes beats one enormous output.",
          ],
        },
        {
          heading: "Local merging keeps composites private",
          paragraphs: [
            "Merged images often combine sensitive content: a comparison of two internal dashboards, documentation screenshots showing file paths and user names, personal before/after photos. An upload-based merger sees every input in full — the composite and all its parts.",
            "This tool composites entirely in your browser: each image is decoded and drawn onto a shared canvas locally, and the merged file is written to your disk. No input ever leaves your device, so the parts stay as private as the final result.",
            "Order matters for reproducibility: note or keep the order in which images were added, since a reversed or shuffled merge produces a visually similar but semantically different file — deadly for before/after comparisons where direction is the entire message.",
          ],
        },
      ],
    },
    zh: {
      name: "图片拼接",
      tagline: "把 2–9 张图片合成一张:横向并排、纵向堆叠或网格,间距与背景色可调,本地全分辨率输出。",
      intro: [
        "做前后对比图、长图合集、雪碧图:拖入 2–9 张图片,选一种排法,调好间距和背景色,合成图在你的设备上按原始分辨率生成。",
        "拼接时会统一等高(横向)、等宽(纵向)或等格(网格),不会裁切也不会拉伸变形。",
      ],
      steps: [
        "按想要的顺序拖入 2–9 张图片。",
        "选择排列方式,调整间距和背景色。",
        "点击拼接,下载结果。",
      ],
      faqs: [
        {
          q: "输出的分辨率是多少?",
          a: "全分辨率:画布按(缩放后的)输入尺寸计算,3 张 2000px 宽的照片横排约 6000px 宽。",
        },
        {
          q: "顺序有影响吗?",
          a: "有——按列表顺序从左到右、从上到下排列。想调整就先移除再重新添加。",
        },
      ],
      deepDive: [
        {
          heading: "先选布局:横排、竖排还是网格",
          paragraphs: [
            "拼图首先是布局决策,其次才是技术活。横向合并适合从左往右读的序列——前后对比、第一步挨着第二步。纵向堆叠适合列表和聊天式内容,每张图向下延续。网格布局适合没有主导阅读顺序的拼贴和多格对比。",
            "隐藏变量是输入尺寸不一致。被合并的图片不共边时,工具必须做决定:拉伸对齐(变形)、补边对齐(用背景色加边),或对齐一边接受不对称。搞清楚会得到哪种行为,能避免大多数意外。",
            "间距和背景色是抛光层:几像素间隙加中性背景,能把两张硬拼的图变成有意的合成图。透明背景下,PNG 输出的间隙保持透空,做叠加素材时很关键。",
          ],
        },
        {
          heading: "合并时的格式行为",
          paragraphs: [
            "合并本身在结构上通常无损——它是合成,不是压缩——但输出格式决定接下来发生什么。PNG 输出逐像素保留每个输入,并保留透明;对截图、图形和一切带文字的内容,它是安全默认。",
            "JPG 输出把合并结果压成一块平面矩形:透明间隙变成实色填充,整张合成图再经历一轮有损压缩。照片类合成没问题,而且当大量大照片要合一个文件时,体积上反而必须选它。",
            "盯住总尺寸:纵向合并是高度相加、取最宽,一文件夹竖长截图可能产出一张比多数查看器舒适范围还高的图。有时先拆分或缩小输入,再合并,胜过产出一张巨型输出。",
          ],
        },
        {
          heading: "本地合并让合成保持私密",
          paragraphs: [
            "被合并的图片往往组合着敏感内容:两个内部后台的对比、显示文件路径和用户名的文档截图、个人的前后对比照。上传式合并服务会把每一张输入完整看一遍——合成图连同它的所有部件。",
            "本工具完全在浏览器内合成:每张图在本地解码、绘制到共享画布上,合并结果直接写入磁盘。任何输入都不离开你的设备,部件和最终成品一样私密。",
            "顺序关系到可复现性:记录或保留图片加入的顺序,因为倒序或乱序合并产出的文件视觉相似、语义却不同——对方向就是全部信息的前后对比图,这是致命的。",
          ],
        },
      ],
    },
    ja: {
      name: "画像を結合",
      tagline: "2〜9 枚の画像を 1 枚に:横並び・縦積み・グリッドから選び、間隔と背景色も調整。すべてローカルでフル解像度。",
      intro: [
        "ビフォーアフター、比較ストリップ、スプライトシートを:2〜9 枚の画像をドロップし、レイアウトを選び、間隔と背景色を設定。合成画像は端末内でフル解像度のまま生成されます。",
        "画像は等高(横並び)・等幅(縦積み)・等セル(グリッド)にスケールされるので、切り取られたり引き伸ばされたりしません。",
      ],
      steps: [
        "好きな順に 2〜9 枚の画像をドロップします。",
        "レイアウトを選び、間隔と背景色を調整します。",
        "「画像を結合」を押してダウンロードします。",
      ],
      faqs: [
        {
          q: "出力の解像度は?",
          a: "フル解像度です。キャンバスは(スケール後の)入力サイズから計算され、2000px 幅の写真 3 枚の横並びは約 6000px 幅になります。",
        },
        {
          q: "順番は意味がありますか?",
          a: "あります。リスト順に左から右、上から下へ配置されます。変更したい場合は削除して再度追加してください。",
        },
      ],
      deepDive: [
        {
          heading: "レイアウトを選ぶ:横並び・縦積み・グリッド",
          paragraphs: [
            "合成は技術作業の前にレイアウトの決断です。横方向の結合は左から右へ読む系列に向きます——ビフォーアフター、手順 1 と手順 2 を並べる。縦積みはリストやチャット風コンテンツに向き、各画像が下へ続きます。グリッドは読む順序が支配的でないコラージュや多画面比較に向きます。",
            "隠れた変数は入力サイズの不一致です。結合する画像が寸法を共有しない場合、ツールは決めねばなりません:合わせるために引き伸ばす(歪む)、パディングで合わせる(背景色の帯)、片側に寄せて非対称を受け入れる。どの挙動になるかを知っていれば、驚きの大半は防げます。",
            "間隔と背景色は仕上げの層です:数ピクセルの隙間と中性背景は、張り合わせの 2 枚を意図的な合成に変えます。透過背景なら、PNG 出力の隙間は透けたままで、オーバーレイ素材として重要です。",
          ],
        },
        {
          heading: "合成時のフォーマットの挙動",
          paragraphs: [
            "合成は構造上、通常ロスレスです——圧縮ではなく構成——しかし出力フォーマットが次を決めます。PNG 出力は入力の全ピクセルを正確に保ち、透過も維持します。スクショ、グラフィック、文字を含むすべてにとって安全な既定値です。",
            "JPG 出力は合成結果を平面の矩形に焼き込みます:透過の隙間は単色の塗りになり、合成全体が一巡の非可逆圧縮を受けます。写真系の合成には問題なく、多くの大きな写真を 1 ファイルにまとめるならサイズ面でむしろ必須です。",
            "合計寸法に注意:縦積みは高さを加算し最大幅を保つため、縦長スクショのフォルダは多くのビューアが快適に表示できるより高い結果を生み得ます。時には、巨大な出力 1 枚より、入力を分割・縮小してから合成する方が勝ります。",
          ],
        },
        {
          heading: "ローカル合成がプライバシーを保つ",
          paragraphs: [
            "合成される画像はしばしばセンシティブな内容を組み合わせます:社内ダッシュボード 2 枚の比較、ファイルパスやユーザー名が写るドキュメント用スクショ、個人的なビフォーアフター写真。アップロード型の合成サービスは全入力を丸ごと見ます——合成物と、その全パーツを。",
            "このツールは完全にブラウザ内で合成します:各画像はローカルでデコードされ共有キャンバスに描かれ、合成ファイルはディスクに書き込まれます。入力は 1 つも端末を離れず、パーツは最終結果と同じだけプライベートです。",
            "順序は再現性に関わります:画像を追加した順を記録または保持してください。逆順や混ぜ替えた合成は、視覚的には似ていて意味的に異なるファイルを生み——方向こそが全メッセージであるビフォーアフター比較には致命的です。",
          ],
        },
      ],
    },
    es: {
      name: "Combinar imágenes",
      tagline: "Une de 2 a 9 imágenes en una — en horizontal, apiladas o en cuadrícula, con separación y fondo ajustables.",
      intro: [
        "Crea comparativas antes/después, tiras y sprites: suelta de 2 a 9 imágenes, elige la disposición, ajusta separación y color de fondo, y la imagen combinada se compone en tu dispositivo a resolución completa.",
        "Las imágenes se escalan a una altura común (horizontal), anchura común (apiladas) o celda común (cuadrícula): nada se recorta ni se deforma.",
      ],
      steps: [
        "Suelta de 2 a 9 imágenes en el orden que quieras.",
        "Elige la disposición y ajusta separación y fondo.",
        "Pulsa Combinar y descarga el resultado.",
      ],
      faqs: [
        {
          q: "¿Qué resolución tiene la salida?",
          a: "Resolución completa: el lienzo se dimensiona con las entradas escaladas; combinar 3 fotos de 2000px en horizontal da unos 6000px de ancho.",
        },
        {
          q: "¿Importa el orden?",
          a: "Sí: se colocan en el orden de la lista, de izquierda a derecha y de arriba abajo. Quita y vuelve a añadir para cambiarlo.",
        },
      ],
      deepDive: [
        {
          heading: "Elegir la maquetación: lado a lado, apilado o cuadrícula",
          paragraphs: [
            "Combinar es una decisión de maquetación antes que un trabajo técnico. La fusión horizontal sirve para secuencias que se leen de izquierda a derecha — comparaciones antes/después, el paso uno junto al paso dos. El apilado vertical sirve para listas y contenido estilo chat, donde cada imagen continúa hacia abajo. Las cuadrículas sirven para collages y comparaciones multipanel donde ningún orden de lectura domina.",
            "La variable oculta son los tamaños distintos de entrada. Cuando las imágenes combinadas no comparten una dimensión, la herramienta debe decidir: estirar para igualar (deforma), rellenar para igualar (añade bandas con el color de fondo) o alinear a un borde y aceptar la asimetría. Saber qué comportamiento vas a obtener evita casi todas las sorpresas.",
            "El espaciado y el color de fondo son la capa de pulido: unos píxeles de hueco con un fondo neutro convierten dos imágenes pegadas a lo bruto en una composición deliberada. Sobre fondos transparentes, el hueco sigue transparente en la salida PNG, algo importante para superposiciones.",
          ],
        },
        {
          heading: "El comportamiento del formato al combinar",
          paragraphs: [
            "Combinar suele ser sin pérdida en cuanto a estructura — es composición, no compresión — pero el formato de salida decide lo que viene después. La salida PNG conserva cada píxel de entrada exactamente y mantiene la transparencia; es el valor por defecto seguro para capturas, gráficos y todo lo que lleve texto.",
            "La salida JPG hornea el resultado combinado en un rectángulo plano: los huecos transparentes se convierten en un relleno sólido y toda la composición sufre una ronda de compresión con pérdida. Para composiciones fotográficas está bien, y en tamaño es casi obligatorio cuando muchas fotos grandes se funden en un archivo.",
            "Vigila las dimensiones totales: apilar verticalmente suma alturas y conserva la anchura máxima, así que una carpeta de capturas altas puede producir un resultado más alto de lo que muchos visores muestran con comodidad. A veces dividir o reducir las entradas antes de combinar supera una única salida gigantesca.",
          ],
        },
        {
          heading: "La combinación local mantiene privadas las composiciones",
          paragraphs: [
            "Las imágenes combinadas a menudo reúnen contenido sensible: una comparación de dos paneles internos, capturas de documentación con rutas de archivos y nombres de usuario, fotos personales de antes y después. Un combinador basado en subida ve cada entrada completa — la composición y todas sus partes.",
            "Esta herramienta compone íntegramente en tu navegador: cada imagen se decodifica y se dibuja sobre un lienzo compartido localmente, y el archivo combinado se escribe en tu disco. Ninguna entrada sale de tu dispositivo, así que las partes quedan tan privadas como el resultado final.",
            "El orden importa para la reproducibilidad: anota o conserva el orden en que se añadieron las imágenes, porque una fusión invertida o barajada produce un archivo visualmente similar pero semánticamente distinto — letal para comparaciones antes/después donde la dirección es todo el mensaje.",
          ],
        },
      ],
    },
    pt: {
      name: "Combinar imagens",
      tagline: "Junte de 2 a 9 imagens em uma — lado a lado, empilhadas ou em grade, com espaço e fundo ajustáveis.",
      intro: [
        "Monte comparações antes/depois, tiras e sprites: solte de 2 a 9 imagens, escolha a disposição, ajuste o espaço e a cor de fundo, e a imagem combinada é composta no seu dispositivo em resolução total.",
        "As imagens são escaladas para uma altura comum (lado a lado), largura comum (empilhadas) ou célula comum (grade) — nada é cortado nem esticado.",
      ],
      steps: [
        "Solte de 2 a 9 imagens na ordem desejada.",
        "Escolha a disposição e ajuste espaço e fundo.",
        "Clique em Combinar e baixe o resultado.",
      ],
      faqs: [
        {
          q: "Qual a resolução da saída?",
          a: "Resolução total: o canvas é dimensionado pelas entradas escaladas; combinar 3 fotos de 2000px lado a lado dá cerca de 6000px de largura.",
        },
        {
          q: "A ordem importa?",
          a: "Sim — as imagens entram na ordem da lista, da esquerda para a direita e de cima para baixo. Remova e reinsira para mudar.",
        },
      ],
      deepDive: [
        {
          heading: "Escolhendo o layout: lado a lado, empilhado ou grade",
          paragraphs: [
            "Mesclar é uma decisão de layout antes de ser um trabalho técnico. A fusão horizontal serve a sequências que se leem da esquerda para a direita — comparações antes/depois, o passo um ao lado do passo dois. O empilhamento vertical serve a listas e conteúdo estilo conversa, onde cada imagem continua para baixo. As grades servem a colagens e comparações multipainel onde nenhuma ordem de leitura domina.",
            "A variável oculta são os tamanhos diferentes de entrada. Quando as imagens mescladas não compartilham uma dimensão, a ferramenta precisa decidir: esticar para igualar (deforma), preencher para igualar (adiciona faixas com a cor de fundo) ou alinhar a uma borda e aceitar a assimetria. Saber qual comportamento você vai receber evita quase todas as surpresas.",
            "O espaçamento e a cor de fundo são a camada de polimento: alguns pixels de folga com um fundo neutro transformam duas imagens coladas de qualquer jeito numa composição deliberada. Sobre fundos transparentes, a folga continua transparente na saída PNG, o que importa para sobreposições.",
          ],
        },
        {
          heading: "O comportamento do formato ao mesclar",
          paragraphs: [
            "Mesclar costuma ser sem perdas em estrutura — é composição, não compressão — mas o formato de saída decide o que vem depois. A saída PNG preserva cada pixel de entrada exatamente e mantém a transparência; é o padrão seguro para capturas, gráficos e tudo que tenha texto.",
            "A saída JPG assa o resultado mesclado num retângulo chapado: as folgas transparentes viram preenchimento sólido e toda a composição sofre uma rodada de compressão com perdas. Para composições fotográficas está bom, e em tamanho quase obrigatório quando muitas fotos grandes se fundem num arquivo.",
            "Fique de olho nas dimensões totais: empilhar verticalmente soma alturas e mantém a maior largura, então uma pasta de capturas altas pode produzir um resultado mais alto do que muitos visualizadores exibem com conforto. Às vezes dividir ou reduzir as entradas antes de mesclar supera uma única saída gigantesca.",
          ],
        },
        {
          heading: "A mesclagem local mantém as composições privadas",
          paragraphs: [
            "Imagens mescladas frequentemente combinam conteúdo sensível: uma comparação de dois painéis internos, capturas de documentação mostrando caminhos de arquivo e nomes de usuário, fotos pessoais de antes e depois. Um mesclador baseado em envio vê cada entrada por completo — a composição e todas as suas partes.",
            "Esta ferramenta compõe inteiramente no seu navegador: cada imagem é decodificada e desenhada numa tela compartilhada localmente, e o arquivo mesclado é gravado no seu disco. Nenhuma entrada sai do seu dispositivo, então as partes ficam tão privadas quanto o resultado final.",
            "A ordem importa para a reprodutibilidade: anote ou mantenha a ordem em que as imagens foram adicionadas, porque uma mesclagem invertida ou embaralhada produz um arquivo visualmente semelhante, mas semanticamente diferente — fatal para comparações antes/depois em que a direção é toda a mensagem.",
          ],
        },
      ],
    },
  },
});
