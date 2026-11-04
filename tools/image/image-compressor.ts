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
    },
  },
});
