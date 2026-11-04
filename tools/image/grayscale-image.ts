import { ImageGrayscaleEngine } from "../_engines/image-engine-grayscale";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "grayscale-image",
  category: "image",
  icon: "palette",
  engine: { component: ImageGrayscaleEngine },
  related: ["image-compressor", "convert-image", "rotate-image", "watermark-image", "merge-images", "image-border", "image-splitter", "compress-image-to-size", "crop-circle-image", "crop-image"],
  copy: {
    en: {
      name: "Grayscale Image",
      tagline: "Convert images to black & white in a batch — keep colors out of scans, prints and photo sets, all locally.",
      intro: [
        "Turn any set of photos into clean black & white versions in one pass: drop a batch, pick JPG or PNG output, and every image is desaturated on your device with the browser's own color engine.",
        "Handy for preparing print-ready scans, unifying a photo set, or stripping color from documents before OCR.",
      ],
      steps: [
        "Drop one image or a whole batch.",
        "Pick JPG (smaller) or PNG (lossless) output.",
        "Run the conversion and download each grayscale copy.",
      ],
      faqs: [
        {
          q: "Is this the same as desaturating with a photo editor?",
          a: "It uses the browser's standard grayscale filter — a neutral luminance conversion. For artistic black & white with contrast curves, use an editor; for clean, uniform desaturation, this is it.",
        },
        {
          q: "Why is my PNG bigger after conversion?",
          a: "Grayscale doesn't change compression: a noisy photo may compress slightly differently. Choose JPG for photos and PNG only for flat graphics.",
        },
      ],
    },
    zh: {
      name: "图片黑白化",
      tagline: "批量把图片转成黑白:扫描件、打印稿、照片组统一去色,全程浏览器本地处理。",
      intro: [
        "一批照片一次转成干净的黑白版本:拖入图片,选 JPG 或 PNG 输出,每张都用浏览器自带的色彩引擎在本设备上去色。",
        "适合准备打印扫描件、统一照片组色调,或在 OCR 前去掉文档颜色。",
      ],
      steps: [
        "拖入一张或多张图片。",
        "选择 JPG(更小)或 PNG(无损)输出。",
        "执行转换,逐张下载黑白副本。",
      ],
      faqs: [
        {
          q: "和修图软件里的去饱和一样吗?",
          a: "用的是浏览器标准灰度滤镜,即中性亮度转换。要艺术感的黑白对比曲线请用修图软件;要干净统一的去色,就是这个。",
        },
        {
          q: "为什么转换后 PNG 反而更大?",
          a: "黑白不改变压缩方式:噪点多的照片压缩结果可能略有不同。照片选 JPG,纯图形才选 PNG。",
        },
      ],
    },
    ja: {
      name: "画像をグレースケールに",
      tagline: "画像をまとめて白黒に:スキャン・印刷・写真セットの色を統一,処理はすべてブラウザ内。",
      intro: [
        "何枚もの写真を一気にきれいな白黒へ:バッチでドロップし、JPG か PNG を選ぶと、各画像がブラウザの色エンジンで端末内的に変換されます。",
        "印刷用スキャンの準備、写真セットのトーン統一、OCR 前の書類の色除去に便利です。",
      ],
      steps: [
        "1 枚でもバッチでもドロップします。",
        "JPG(小さい)か PNG(ロスレス)を選びます。",
        "変換を実行して各コピーをダウンロードします。",
      ],
      faqs: [
        {
          q: "写真編集アプリの彩度ゼロと同じ?",
          a: "ブラウザ標準のグレースケールフィルター=中間的な輝度変換です。コントラストカーブで芸術的にやりたい場合は編集アプリを、均一な去色にはこちらを。",
        },
        {
          q: "PNG が変換後に大きくなるのは?",
          a: "グレースケールは圧縮方式を変えません:ノイズの多い写真は結果が変わることがあります。写真は JPG、フラットな図形だけ PNG を。",
        },
      ],
    },
    es: {
      name: "Imagen en blanco y negro",
      tagline: "Convierte imágenes a blanco y negro por lotes — quita el color de escaneos, impresiones y series, todo local.",
      intro: [
        "Pasa cualquier serie de fotos a limpio blanco y negro de una vez: suelta un lote, elige salida JPG o PNG, y cada imagen se desatura en tu dispositivo con el motor de color del navegador.",
        "Útil para preparar escaneos listos para imprimir, unificar una serie o quitar color a documentos antes del OCR.",
      ],
      steps: [
        "Suelta una imagen o un lote entero.",
        "Elige salida JPG (más ligero) o PNG (sin pérdida).",
        "Ejecuta la conversión y descarga cada copia.",
      ],
      faqs: [
        {
          q: "¿Es igual que desaturar en un editor?",
          a: "Usa el filtro estándar de gris del navegador: una conversión de luminancia neutra. Para blanco y negro artístico con curvas, un editor; para desaturación uniforme, esto.",
        },
        {
          q: "¿Por qué mi PNG pesa más después?",
          a: "El gris no cambia la compresión: una foto con ruido puede comprimir distinto. Usa JPG para fotos y PNG solo para gráficos planos.",
        },
      ],
    },
    pt: {
      name: "Imagem em preto e branco",
      tagline: "Converta imagens para preto e branco em lote — tire a cor de escaneamentos, impressos e séries, tudo local.",
      intro: [
        "Transforme qualquer série de fotos em versões limpas de preto e branco de uma vez: solte um lote, escolha saída JPG ou PNG, e cada imagem é dessaturada no seu dispositivo com o motor de cor do navegador.",
        "Útil para preparar escaneamentos prontos para impressão, unificar um conjunto de fotos ou tirar a cor de documentos antes do OCR.",
      ],
      steps: [
        "Solte uma imagem ou um lote inteiro.",
        "Escolha saída JPG (menor) ou PNG (sem perda).",
        "Rode a conversão e baixe cada cópia.",
      ],
      faqs: [
        {
          q: "É igual a dessaturar num editor?",
          a: "Usa o filtro padrão de cinza do navegador — uma conversão de luminância neutra. Para preto e branco artístico com curvas, use um editor; para dessaturação uniforme, é esta.",
        },
        {
          q: "Por que meu PNG ficou maior depois?",
          a: "O cinza não muda a compressão: foto com ruído pode comprimir diferente. Escolha JPG para fotos e PNG só para gráficos planos.",
        },
      ],
    },
  },
});
