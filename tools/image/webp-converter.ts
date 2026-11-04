import { ImageCanvasEngine } from "../_engines/image-engine-canvas";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "webp-converter",
  category: "image",
  icon: "swap",
  engine: {
    component: ImageCanvasEngine,
    props: { op: "convert", accept: "image/*,.webp", defaultFormat: "image/webp", defaultQuality: 0.9, suffix: "-converted" },
  },
  related: ["convert-image", "jpg-to-png", "png-to-jpg", "image-compressor", "image-border", "image-splitter", "compress-image-to-size", "grayscale-image", "crop-circle-image", "crop-image"],
  copy: {
    en: {
      name: "WebP Converter",
      tagline:
        "Convert images to WebP or turn WebP files back into JPG and PNG — pick the target format, tune the quality, batch-process in bulk.",
      intro: [
        "Going to WebP cuts file sizes by 25–35% compared to JPG at the same visual quality — ideal for websites and apps. Coming back from WebP to JPG or PNG makes images open in older software that never learned Google's format.",
        "Drop any mix of WebP, JPG, PNG and more, choose the output format, and every file converts at once with the size before and after shown per row. Everything is encoded by your browser on your own device — no uploads, ever.",
      ],
      steps: [
        "Drop WebP files to convert away from WebP, or any images to convert to WebP.",
        "Pick the output format (WebP, JPG or PNG) and set the quality for lossy formats.",
        "Download the converted files individually or all at once.",
      ],
      faqs: [
        {
          q: "Why should I use WebP instead of JPG?",
          a: "WebP compresses 25–35% smaller than JPG at equivalent quality and supports both transparency and animation. Every current browser renders it, so it is the standard choice for web images. Only pick JPG if you must support very old software.",
        },
        {
          q: "Will a WebP file open in any app?",
          a: "All modern browsers and recent versions of Windows, macOS, Android and iOS handle WebP. Some older photo editors and some web forms still reject it — that is exactly when you convert it back to JPG or PNG here.",
        },
        {
          q: "Is converting to WebP lossless?",
          a: "You choose: WebP supports both lossless and lossy encoding. At the default quality 90 the result is visually indistinguishable but much smaller; lower the slider for maximum savings, or pick PNG output for strict losslessness.",
        },
      ],
    },
    zh: {
      name: "WebP 转换器",
      tagline: "图片一键转 WebP 省体积,WebP 也能转回 JPG / PNG 兼容旧软件——目标格式任选、画质可调、支持批量。",
      intro: [
        "转成 WebP,同画质下比 JPG 小 25–35%,网站和应用首选;从 WebP 转回 JPG 或 PNG,让尚未支持该格式的老软件也能正常打开。",
        "WebP、JPG、PNG 混着拖入都行,选好输出格式,所有文件一次转换,每行显示转换前后的体积。编码全部由浏览器在你自己的设备上完成——从不发生上传。",
      ],
      steps: [
        "想转出 WebP 就拖入 WebP 文件;想转成 WebP 就拖入任意图片。",
        "选择输出格式(WebP、JPG 或 PNG),按需调整有损格式的画质。",
        "逐张或一键下载转换结果。",
      ],
      faqs: [
        {
          q: "为什么用 WebP 替代 JPG?",
          a: "同等画质下 WebP 比 JPG 小 25–35%,还同时支持透明和动图。当前所有主流浏览器都能渲染,是网页图片的默认之选。只有需要兼容很旧的软件时才考虑 JPG。",
        },
        {
          q: "WebP 文件在任何软件里都能打开吗?",
          a: "所有现代浏览器以及较新版本的 Windows、macOS、Android 和 iOS 都支持 WebP。少数老牌图片编辑器和部分网页表单仍会拒绝——这时用本工具转回 JPG 或 PNG 即可。",
        },
        {
          q: "转成 WebP 是无损的吗?",
          a: "由你决定:WebP 同时支持无损和有损编码。默认画质 90 下肉眼无法分辨差异而体积显著减小;追求极致体积可调低滑块,需要严格无损则选 PNG 输出。",
        },
      ],
    },
    ja: {
      name: "WebP コンバーター",
      tagline:
        "画像を WebP へ一括変換、あるいは WebP を JPG・PNG に戻すことも。出力形式を選び品質を調整してまとめて処理——アップロードは一切なし。",
      intro: [
        "WebP にすれば同品質で JPG より 25〜35% 小さくなり、Web サイトやアプリに最適です。逆に WebP を JPG や PNG に戻せば、この形式に対応していない古いソフトでも開けるようになります。",
        "WebP・JPG・PNG が混ざっていてもそのままドロップし、出力形式を選べば全ファイルを一括変換。各行に変換前後のサイズを表示します。エンコードはすべてブラウザがあなたの端末上で実行——アップロードは一切発生しません。",
      ],
      steps: [
        "WebP から変換したいなら WebP ファイルを、WebP に変換したいなら任意の画像をドロップします。",
        "出力形式(WebP・JPG・PNG)を選び、非可逆形式の品質を設定します。",
        "変換後のファイルを 1 枚ずつ、またはまとめてダウンロードします。",
      ],
      faqs: [
        {
          q: "JPG の代わりに WebP を使うメリットは?",
          a: "同等品質で JPG より 25〜35% 小さく、透過にもアニメーションにも対応しています。現在のすべてのブラウザが表示できるため、Web 画像の標準選択です。非常に古いソフトに対応させたいときだけ JPG を選びましょう。",
        },
        {
          q: "WebP ファイルはどんなアプリでも開けますか?",
          a: "最新のブラウザと近年の Windows・macOS・Android・iOS なら問題なく開けます。一部の古い画像エディタや Web フォームは未対応です——まさにそのとき、ここで JPG や PNG に戻してください。",
        },
        {
          q: "WebP への変換はロスレスですか?",
          a: "選べます。WebP はロスレスと非可逆の両方に対応します。既定の品質 90 なら見た目はほぼ同じで大幅に小さくなり、節約を最優先するならスライダーを下げ、厳密なロスレスが必要なら PNG 出力を選びます。",
        },
      ],
    },
    es: {
      name: "Convertidor WebP",
      tagline:
        "Convierte imágenes a WebP o devuelve los WebP a JPG y PNG — elige el formato de salida, ajusta la calidad y procesa por lotes.",
      intro: [
        "Pasar a WebP reduce el tamaño entre un 25 y un 35% frente a JPG con la misma calidad visual: ideal para webs y apps. Volver de WebP a JPG o PNG hace que las imágenes se abran en software antiguo que nunca aprendió el formato de Google.",
        "Suelta cualquier mezcla de WebP, JPG, PNG y más, elige el formato de salida y todos los archivos se convierten a la vez, mostrando el tamaño antes y después en cada fila. Todo lo codifica tu navegador en tu propio dispositivo: nunca hay subidas.",
      ],
      steps: [
        "Suelta archivos WebP para salir de WebP, o cualquier imagen para convertirla a WebP.",
        "Elige el formato de salida (WebP, JPG o PNG) y fija la calidad en los formatos con pérdida.",
        "Descarga los archivos convertidos uno a uno o todos juntos.",
      ],
      faqs: [
        {
          q: "¿Por qué usar WebP en lugar de JPG?",
          a: "WebP comprime un 25–35% menor que JPG con calidad equivalente y admite transparencia y animación. Todos los navegadores actuales lo muestran, así que es la opción estándar para imágenes web. Elige JPG solo si debes dar soporte a software muy antiguo.",
        },
        {
          q: "¿Un archivo WebP se abre en cualquier aplicación?",
          a: "Todos los navegadores modernos y las versiones recientes de Windows, macOS, Android e iOS manejan WebP. Algunos editores antiguos y algunos formularios web aún lo rechazan: justo para eso puedes convertirlo aquí de nuevo a JPG o PNG.",
        },
        {
          q: "¿Convertir a WebP es sin pérdida?",
          a: "Tú eliges: WebP admite codificación con y sin pérdida. Con la calidad 90 por defecto el resultado es visualmente idéntico pero mucho más pequeño; baja el deslizador para ahorrar al máximo o elige salida PNG para pureza sin pérdida.",
        },
      ],
    },
    pt: {
      name: "Conversor WebP",
      tagline:
        "Converta imagens para WebP ou transforme WebP de volta em JPG e PNG — escolha o formato de saída, ajuste a qualidade e processe em lote.",
      intro: [
        "Mudar para WebP corta 25–35% do tamanho em relação ao JPG com a mesma qualidade visual — ideal para sites e apps. Voltar de WebP para JPG ou PNG faz as imagens abrirem em programas antigos que nunca aprenderam o formato do Google.",
        "Solte qualquer mistura de WebP, JPG, PNG e mais, escolha o formato de saída e todos os arquivos são convertidos de uma vez, com o tamanho antes e depois em cada linha. Tudo é codificado pelo seu navegador no seu próprio dispositivo — nunca há upload.",
      ],
      steps: [
        "Solte arquivos WebP para sair do WebP, ou quaisquer imagens para converter para WebP.",
        "Escolha o formato de saída (WebP, JPG ou PNG) e ajuste a qualidade nos formatos com perdas.",
        "Baixe os arquivos convertidos individualmente ou todos de uma vez.",
      ],
      faqs: [
        {
          q: "Por que usar WebP em vez de JPG?",
          a: "O WebP comprime 25–35% menor que JPG com qualidade equivalente e suporta transparência e animação. Todos os navegadores atuais o exibem, então é a escolha padrão para imagens na web. Escolha JPG apenas se precisar dar suporte a programas muito antigos.",
        },
        {
          q: "Um arquivo WebP abre em qualquer aplicativo?",
          a: "Todos os navegadores modernos e as versões recentes de Windows, macOS, Android e iOS lidam com WebP. Alguns editores antigos e alguns formulários web ainda o rejeitam — exatamente quando você o converte de volta para JPG ou PNG aqui.",
        },
        {
          q: "Converter para WebP é sem perdas?",
          a: "Você escolhe: o WebP suporta codificação com e sem perdas. Na qualidade padrão 90 o resultado é visualmente idêntico e bem menor; abaixe o controle para poupar ao máximo, ou escolha saída PNG para rigidez sem perdas.",
        },
      ],
    },
  },
});
