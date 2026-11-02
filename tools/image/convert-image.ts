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
  related: ["webp-converter", "jpg-to-png", "png-to-jpg", "image-compressor"],
  copy: {
    en: {
      name: "Image Converter",
      tagline:
        "Convert images between PNG, JPG and WebP with adjustable quality — drop a whole folder and download every result in one click.",
      intro: [
        "One converter for the three formats that matter: PNG for lossless graphics and transparency, JPG for universal photo compatibility, WebP for the smallest files at high quality. Pick the target format, tune the quality slider when the format allows it, and every dropped file is converted in place.",
        "Conversion runs on your device with the browser's own canvas encoder — there is no upload step at all. Each result row shows the size before and after, so you can see immediately whether the format change actually helped.",
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
    },
  },
});
