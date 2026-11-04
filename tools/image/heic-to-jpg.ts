import { ImageHeicEngine } from "../_engines/image-engine-heic";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "heic-to-jpg",
  featured: true,
  category: "image",
  icon: "image",
  engine: { component: ImageHeicEngine },
  related: ["jpg-to-png", "convert-image", "image-compressor", "exif-remover", "image-border", "image-splitter", "compress-image-to-size", "grayscale-image", "crop-circle-image", "crop-image"],
  copy: {
    en: {
      name: "HEIC to JPG",
      tagline:
        "Convert iPhone HEIC photos to JPG or PNG so they open anywhere — batch conversion with quality control, all on your device.",
      intro: [
        "iPhones save photos in HEIC, a space-efficient format that Windows, many websites and older apps still refuse to open. Drop your .heic files here and get universally readable JPG copies (or lossless PNG) in seconds — the decoder runs locally, so your photos never touch a server.",
        "Batch mode handles an entire camera roll at once, and the quality slider lets you balance JPG size against fidelity. Large photos can take a few seconds each because the HEIC decoding happens right in your browser.",
      
        "HEIC is Apple's implementation of HEIF, using HEVC compression; browsers do not decode it natively, so the tool bundles a WebAssembly decoder that runs in your tab. Decoding a 12-megapixel photo takes a second or two — noticeable but private, since nothing goes near a network. JPG output quality is adjustable from 10 to 100%.",
        "Compared with emailing photos to yourself (which re-compresses them again) or installing a desktop converter, this handles a whole camera roll in one drop with zero upload. And unlike cloud converters that queue your files on a server, the HEIC bitstream is decoded and re-encoded entirely on your own machine.",
      ],
      steps: [
        "Drop your .heic or .heif files (AirDrop or download them from your iPhone first).",
        "Choose JPG or PNG output and set the JPEG quality.",
        "Press convert and download the images that open anywhere.",
      ],
      faqs: [
        {
          q: "What is HEIC and why do my photos use it?",
          a: "HEIC (High Efficiency Image Container) is the default photo format on iPhones since iOS 11. It stores photos at roughly half the size of JPEG, but support outside Apple's ecosystem is still patchy — which is why converting to JPG remains the reliable choice for sharing.",
        },
        {
          q: "Does converting HEIC to JPG lose quality?",
          a: "A little, but at the default quality of 90% the difference is invisible in practice. If you want zero further loss, choose PNG output instead — at the cost of much larger files.",
        },
        {
          q: "Are my iPhone photos uploaded anywhere?",
          a: "No. Conversion happens in your browser using a local HEIC decoder. Your photos stay on your device the whole time — this tool even works offline once the page has loaded.",
        },
      ],
    },
    zh: {
      name: "HEIC 转 JPG",
      tagline: "iPhone HEIC 照片一键转 JPG / PNG,任何设备都能打开——批量转换、画质可调,解码全程在本机完成。",
      intro: [
        "iPhone 默认用 HEIC 存照片,体积虽小,但 Windows、不少网站和旧应用仍然打不开。把 .heic 文件拖到这里,几秒钟得到到处可用的 JPG(或无损 PNG)。解码完全在本地进行,照片不会经过任何服务器。",
        "批量模式一次处理整个相册导出,画质滑块帮你在 JPG 体积与保真度之间取舍。由于 HEIC 解码就在浏览器里完成,大图每张可能需要几秒钟。",
      ],
      steps: [
        "拖入 .heic 或 .heif 文件(先用 AirDrop 或下载把照片传到电脑)。",
        "选择输出 JPG 或 PNG,并设置 JPEG 画质。",
        "点击转换,下载到任何地方都能打开的图片。",
      ],
      faqs: [
        {
          q: "HEIC 是什么?为什么我的照片是这种格式?",
          a: "HEIC(高效图像容器)是 iOS 11 起 iPhone 的默认照片格式,体积约为 JPEG 的一半,但在苹果生态之外的支持仍不完善——所以分享前转成 JPG 依然是最稳妥的做法。",
        },
        {
          q: "HEIC 转 JPG 会损失画质吗?",
          a: "会有一点点,但默认 90% 画质下实际看不出差别。想要零损失可以选择 PNG 输出,代价是文件体积大得多。",
        },
        {
          q: "我的 iPhone 照片会被上传吗?",
          a: "不会。转换由浏览器内的本地 HEIC 解码器完成,照片全程留在你的设备上——页面加载完成后,断网也能继续转换。",
        },
      ],
    },
    ja: {
      name: "HEIC から JPG へ変換",
      tagline:
        "iPhone の HEIC 写真をどこでも開ける JPG・PNG へ一括変換。品質調整付きで、デコードはすべて端末内で完結します。",
      intro: [
        "iPhone は写真を HEIC で保存します。容量効率は良いものの、Windows や多くのサイト、古いアプリはまだ開けません。.heic をここにドロップすれば、どこでも読める JPG(またはロスレス PNG)が数秒で手に入ります。デコードはローカルで行われるため、写真がサーバーに送られることはありません。",
        "一括モードならカメラロール全体もまとめて処理でき、品質スライダーで JPG のサイズと忠実度のバランスを取れます。HEIC のデコードはブラウザ内で行われるため、大きな写真は 1 枚数秒かかることがあります。",
      ],
      steps: [
        ".heic / .heif ファイルをドロップします(先に AirDrop やダウンロードで iPhone から取り出してください)。",
        "JPG か PNG の出力を選び、JPEG 品質を設定します。",
        "変換を実行し、どこでも開ける画像をダウンロードします。",
      ],
      faqs: [
        {
          q: "HEIC とは何ですか?なぜ写真がこの形式に?",
          a: "HEIC(High Efficiency Image Container)は iOS 11 以降の iPhone の既定写真フォーマットです。JPEG の約半分のサイズで保存できますが、Apple の生態系以外での対応はまだ不完全で、共有時は JPG への変換が最も確実です。",
        },
        {
          q: "HEIC から JPG への変換で画質は落ちますか?",
          a: "わずかに落ちますが、既定の品質 90% では実用上わかりません。画質の劣化をゼロにしたい場合は PNG 出力を選んでください——その分ファイルは大幅に大きくなります。",
        },
        {
          q: "iPhone の写真はどこかにアップロードされますか?",
          a: "いいえ。変換はブラウザ内のローカル HEIC デコーダーで行われ、写真はずっと端末内にあります。ページを読み込んだ後はオフラインでも変換できます。",
        },
      ],
    },
    es: {
      name: "HEIC a JPG",
      tagline:
        "Convierte fotos HEIC de iPhone a JPG o PNG para que se abran en cualquier sitio — conversión por lotes con control de calidad, todo en tu dispositivo.",
      intro: [
        "Los iPhone guardan las fotos en HEIC, un formato eficiente que Windows, muchas webs y apps antiguas siguen sin abrir. Suelta tus archivos .heic aquí y obtén copias JPG legibles en todas partes (o PNG sin pérdida) en segundos: el decodificador funciona en local, así que tus fotos nunca tocan un servidor.",
        "El modo por lote procesa un carrete entero de una vez, y el deslizador de calidad equilibra el tamaño del JPG con la fidelidad. Las fotos grandes pueden tardar unos segundos cada una porque la decodificación HEIC ocurre dentro de tu navegador.",
      ],
      steps: [
        "Suelta tus archivos .heic o .heif (pásalos antes del iPhone por AirDrop o descarga).",
        "Elige salida JPG o PNG y ajusta la calidad JPEG.",
        "Pulsa convertir y descarga las imágenes que se abren en cualquier lugar.",
      ],
      faqs: [
        {
          q: "¿Qué es HEIC y por qué mis fotos usan ese formato?",
          a: "HEIC (High Efficiency Image Container) es el formato fotográfico predeterminado de los iPhone desde iOS 11. Guarda fotos a la mitad del tamaño de JPEG, pero el soporte fuera del ecosistema Apple sigue siendo irregular: por eso convertir a JPG sigue siendo la opción fiable para compartir.",
        },
        {
          q: "¿Convertir HEIC a JPG pierde calidad?",
          a: "Un poco, pero con la calidad del 90% por defecto la diferencia es invisible en la práctica. Si quieres cero pérdidas adicionales, elige salida PNG — a costa de archivos mucho más grandes.",
        },
        {
          q: "¿Mis fotos del iPhone se suben a algún sitio?",
          a: "No. La conversión ocurre en tu navegador con un decodificador HEIC local. Tus fotos permanecen en tu dispositivo todo el tiempo — la herramienta funciona incluso sin conexión una vez cargada la página.",
        },
      ],
    },
    pt: {
      name: "HEIC para JPG",
      tagline:
        "Converta fotos HEIC do iPhone em JPG ou PNG para abrir em qualquer lugar — conversão em lote com controle de qualidade, tudo no seu dispositivo.",
      intro: [
        "Os iPhones salvam fotos em HEIC, um formato eficiente que o Windows, muitos sites e apps antigos ainda se recusam a abrir. Solte seus arquivos .heic aqui e receba cópias JPG legíveis em qualquer lugar (ou PNG sem perdas) em segundos — o decodificador roda localmente, então suas fotos nunca tocam um servidor.",
        "O modo em lote cuida de um rolo inteiro de uma vez, e o controle de qualidade equilibra o tamanho do JPG com a fidelidade. Fotos grandes podem levar alguns segundos cada, porque a decodificação HEIC acontece dentro do seu navegador.",
      ],
      steps: [
        "Solte seus arquivos .heic ou .heif (passe-os do iPhone por AirDrop ou baixe antes).",
        "Escolha a saída JPG ou PNG e defina a qualidade do JPEG.",
        "Pressione converter e baixe as imagens que abrem em qualquer lugar.",
      ],
      faqs: [
        {
          q: "O que é HEIC e por que minhas fotos usam esse formato?",
          a: "HEIC (High Efficiency Image Container) é o formato de foto padrão dos iPhones desde o iOS 11. Guarda fotos com cerca da metade do tamanho do JPEG, mas o suporte fora do ecossistema Apple ainda é irregular — por isso converter para JPG continua sendo a escolha confiável para compartilhar.",
        },
        {
          q: "Converter HEIC para JPG perde qualidade?",
          a: "Um pouco, mas com a qualidade padrão de 90% a diferença é invisível na prática. Se quiser zero perdas adicionais, escolha saída PNG — ao custo de arquivos bem maiores.",
        },
        {
          q: "Minhas fotos do iPhone são enviadas para algum lugar?",
          a: "Não. A conversão acontece no seu navegador com um decodificador HEIC local. Suas fotos ficam no seu dispositivo o tempo todo — a ferramenta funciona até offline depois que a página carrega.",
        },
      ],
    },
  },
});
