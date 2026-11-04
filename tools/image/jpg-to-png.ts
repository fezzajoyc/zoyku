import { ImageCanvasEngine } from "../_engines/image-engine-canvas";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "jpg-to-png",
  category: "image",
  icon: "image",
  engine: {
    component: ImageCanvasEngine,
    props: { op: "convert", accept: "image/jpeg,.jpg,.jpeg", defaultFormat: "image/png", lockFormat: true, suffix: "" },
  },
  related: ["png-to-jpg", "convert-image", "webp-converter", "heic-to-jpg", "image-border", "image-splitter", "compress-image-to-size", "image-compressor", "grayscale-image", "crop-circle-image"],
  copy: {
    en: {
      name: "JPG to PNG",
      tagline:
        "Convert JPG photos to PNG instantly with lossless output and batch support — free, private and with no upload, right in your browser.",
      intro: [
        "Drop your .jpg files and get pixel-identical .png copies in one click. PNG stores the image without further loss, which makes it the format of choice for re-editing, archiving, or platforms and tools that refuse JPEG files.",
        "Batch mode converts a whole stack of photos in one pass and shows the resulting size for each file. Note that PNG typically produces larger files than JPG — that is the price of lossless storage, not a defect of the conversion.",
      
        "The conversion is a decode-then-encode: the browser decodes JPEG into pixels, then the canvas encoder writes them as PNG. The output is pixel-identical to what the JPEG showed — no additional loss, but also no quality gain, since JPEG artifacts are already baked into the source pixels.",
        "Compared with renaming the extension or pasting into an editor, this produces a real PNG with a proper color profile and alpha-capable structure. And unlike upload-based converters that re-compress or resize, the file comes back at full resolution with only the container changed — useful for tools that strictly check magic bytes.",
      ],
      steps: [
        "Drop your JPG images (or click to browse) — multiple files are welcome.",
        "Wait a moment while each file is converted locally.",
        "Download the PNG files individually or all at once.",
      ],
      faqs: [
        {
          q: "Will the PNG file look better than the JPG?",
          a: "No — it will look the same. Conversion cannot undo compression that already happened; the PNG simply preserves the current appearance without adding new artifacts if you edit and re-save it later. Use it for workflows, not for a quality boost.",
        },
        {
          q: "Why is my PNG larger than the original JPG?",
          a: "JPG uses aggressive lossy compression designed for photos, while PNG stores every pixel exactly. The same picture therefore takes more space as PNG. If file size matters more than lossless editing, JPG or WebP is the better target.",
        },
        {
          q: "Does converting JPG to PNG add transparency?",
          a: "No. JPEG never stores transparency, so nothing can be recovered — your converted PNG is fully opaque. To cut out a background you would need a dedicated background-removal tool.",
        },
      ],
    },
    zh: {
      name: "JPG 转 PNG",
      tagline: "JPG 一键转 PNG,无损输出、支持批量——免费、私密、不上传,整个流程都在浏览器里完成。",
      intro: [
        "拖入 .jpg 文件,一键得到逐像素一致的 .png 副本。PNG 无进一步损失地保存画面,是二次编辑、归档,以及那些不接受 JPEG 的平台或工具的首选格式。",
        "批量模式一次转换整叠照片,并逐张显示转换后的体积。注意 PNG 通常比 JPG 更大——这是无损存储的正常代价,不是转换出了问题。",
      ],
      steps: [
        "拖入 JPG 图片(或点击选择),支持多张。",
        "稍等片刻,每个文件都在本地完成转换。",
        "逐张或一键下载 PNG。",
      ],
      faqs: [
        {
          q: "转出来的 PNG 会比 JPG 更清晰吗?",
          a: "不会——画面完全一样。转换无法撤销已经发生的压缩,PNG 只是把当前观感无损保存,以后再编辑、再保存也不会叠加新噪点。它的价值在流程,不在画质提升。",
        },
        {
          q: "为什么 PNG 比原来的 JPG 大?",
          a: "JPG 为照片设计了激进的有损压缩,而 PNG 逐像素精确存储,同样的画面用 PNG 存自然更大。如果体积比无损编辑更重要,JPG 或 WebP 才是更合适的目标。",
        },
        {
          q: "JPG 转 PNG 会获得透明背景吗?",
          a: "不会。JPEG 本身不存透明通道,也就无透明可恢复——转换出的 PNG 是完全不透明的。要抠掉背景需要专门的抠图工具。",
        },
      ],
    },
    ja: {
      name: "JPG から PNG へ変換",
      tagline:
        "JPG 写真をワンクリックで PNG に変換。ロスレス出力と一括処理に対応——無料・非公開・アップロードなし、すべてブラウザ内で完結します。",
      intro: [
        ".jpg ファイルをドロップすれば、ピクセル単位で一致する .png を一発で生成します。PNG はそれ以上劣化せずに画像を保存できるため、再編集・アーカイブ、JPEG を受け付けないプラットフォームやツールに最適です。",
        "一括モードなら大量の写真も一気に変換し、ファイルごとのサイズを表示します。PNG は通常 JPG より大きくなりますが、それはロスレス保存の正当な代償であって、変換の欠陥ではありません。",
      ],
      steps: [
        "JPG 画像をドロップ(またはクリックして選択)。複数枚 OK です。",
        "各ファイルがローカルで変換されるのを少しだけお待ちください。",
        "PNG を 1 枚ずつ、またはまとめてダウンロードします。",
      ],
      faqs: [
        {
          q: "変換後の PNG は JPG より綺麗に見えますか?",
          a: "いいえ——見た目は同じです。変換はすでに起きた圧縮を取り消せません。PNG は現在の見た目をロスレスで保存するだけで、後で編集や再保存をしても新たなノイズが乗りません。画質向上ではなくワークフローのための変換です。",
        },
        {
          q: "PNG が元の JPG より大きくなるのはなぜ?",
          a: "JPG は写真向けの強力な非可逆圧縮、PNG は全ピクセルを完全に記録します。同じ絵なら PNG の方が大きくなるのは自然なことです。サイズ重視なら JPG か WebP を選びましょう。",
        },
        {
          q: "JPG から PNG に変えると透明になりますか?",
          a: "なりません。JPEG は透明情報を保存しないため、復元できるものがありません。変換後の PNG は完全に不透明です。背景を切り抜くには専用の背景除去ツールが必要です。",
        },
      ],
    },
    es: {
      name: "JPG a PNG",
      tagline:
        "Convierte fotos JPG a PNG al instante con salida sin pérdida y lotes — gratis, privado y sin subidas, directamente en tu navegador.",
      intro: [
        "Suelta tus archivos .jpg y obtén copias .png idénticas píxel a píxel en un clic. PNG guarda la imagen sin más pérdidas, lo que lo hace ideal para reeditar, archivar o para plataformas y herramientas que rechazan archivos JPEG.",
        "El modo por lotes convierte una pila entera de fotos de una pasada y muestra el tamaño resultante de cada archivo. Ten en cuenta que PNG suele ocupar más que JPG: es el precio del almacenamiento sin pérdida, no un defecto.",
      ],
      steps: [
        "Suelta tus imágenes JPG (o haz clic para explorar) — varios archivos son bienvenidos.",
        "Espera un momento mientras cada archivo se convierte localmente.",
        "Descarga los PNG individualmente o todos a la vez.",
      ],
      faqs: [
        {
          q: "¿El PNG se verá mejor que el JPG?",
          a: "No — se verá igual. La conversión no puede deshacer una compresión ya aplicada; el PNG solo conserva la apariencia actual sin añadir artefactos nuevos si lo editas y guardas después. Úsalo por flujo de trabajo, no por una mejora de calidad.",
        },
        {
          q: "¿Por qué mi PNG pesa más que el JPG original?",
          a: "JPG usa una compresión con pérdida muy agresiva pensada para fotos, mientras PNG almacena cada píxel exactamente. La misma imagen ocupa más como PNG. Si el tamaño importa más que la edición sin pérdida, JPG o WebP es mejor destino.",
        },
        {
          q: "¿Convertir JPG a PNG añade transparencia?",
          a: "No. JPEG nunca almacena transparencia, así que no hay nada que recuperar: tu PNG convertido es totalmente opaco. Para quitar un fondo necesitarías una herramienta específica de eliminación de fondo.",
        },
      ],
    },
    pt: {
      name: "JPG para PNG",
      tagline:
        "Converta fotos JPG em PNG na hora, com saída sem perdas e lote — grátis, privado e sem upload, direto no seu navegador.",
      intro: [
        "Solte seus arquivos .jpg e receba cópias .png idênticas pixel a pixel num clique. O PNG guarda a imagem sem novas perdas, o que o torna ideal para reeditar, arquivar ou para plataformas e ferramentas que rejeitam JPEG.",
        "O modo em lote converte uma pilha inteira de fotos numa passada e mostra o tamanho resultante de cada arquivo. Note que o PNG costuma ficar maior que o JPG — esse é o preço do armazenamento sem perdas, não um defeito.",
      ],
      steps: [
        "Solte suas imagens JPG (ou clique para escolher) — vários arquivos são bem-vindos.",
        "Aguarde um instante enquanto cada arquivo é convertido localmente.",
        "Baixe os PNGs individualmente ou todos de uma vez.",
      ],
      faqs: [
        {
          q: "O PNG vai ficar melhor que o JPG?",
          a: "Não — vai ficar igual. A conversão não pode desfazer uma compressão já aplicada; o PNG apenas preserva a aparência atual sem adicionar artefatos novos se você editar e salvar depois. Use pelo fluxo de trabalho, não por ganho de qualidade.",
        },
        {
          q: "Por que meu PNG é maior que o JPG original?",
          a: "O JPG usa compressão com perdas agressiva, feita para fotos, enquanto o PNG armazena cada pixel exatamente. A mesma imagem ocupa mais espaço em PNG. Se o tamanho importa mais que a edição sem perdas, JPG ou WebP é o destino melhor.",
        },
        {
          q: "Converter JPG para PNG adiciona transparência?",
          a: "Não. O JPEG nunca armazena transparência, então não há nada a recuperar — seu PNG convertido é totalmente opaco. Para recortar um fundo você precisaria de uma ferramenta específica de remoção de fundo.",
        },
      ],
    },
  },
});
