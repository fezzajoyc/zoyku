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
      
        "Desaturation uses the canvas composite pipeline: each pixel's RGB channels are collapsed to a luminance value, so the tonal range of the original is preserved rather than just averaged to flat gray. Output can be JPG (smaller, fine for print proofs) or PNG (lossless, for scans headed to OCR).",
        "Compared with converting in an image editor, there is no per-file dialog, no color-profile surprises and no accidental re-crop — a batch of a hundred photos processes in one pass. Unlike a CSS filter or preview toggle, the output is a real grayscale file that stays gray everywhere, including printers and other apps.",
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
      deepDive: [
        {
          heading: "Why grayscale is more than \"remove the colors\"",
          paragraphs: [
            "The naive way to make an image gray is to average the red, green and blue channels equally. That misses how human vision works: we are far more sensitive to green light than to red, and barely to blue. Equal averaging makes green grass and red brick — which look equally bright to the eye — come out with wrong relative brightness.",
            "Proper conversion uses luminance weights derived from how the eye perceives each primary, roughly 0.299 red + 0.587 green + 0.114 blue (the ITU-R BT.601 coefficients that television standards standardized decades ago). This tool converts with such perceptual weighting, so the grayscale result matches what your eye actually sees in the color original.",
            "The result is also a useful editing primitive: many photographers convert to grayscale first to judge an image's tonal structure — whether it has a real black, a real white and smooth midtones — before worrying about color at all.",
          ],
        },
        {
          heading: "Output format and what stays intact",
          paragraphs: [
            "Grayscale conversion changes color data only — pixel geometry is untouched, so dimensions, sharpness and composition survive exactly. That makes it safe to apply at any stage of a workflow without cascading side effects the way resampling would.",
            "Format choice still matters: save as PNG when the image contains text, flat graphics or you want maximum fidelity and no further loss; save as JPG for photographic content where file size matters. A grayscale JPEG is typically smaller than its color version because the color channels carry much of what gets compressed away.",
            "One subtle difference to know: a true grayscale image and a color image whose three channels happen to be equal can both \"look gray\", but they are stored differently. Tools and printers may treat them differently; if exact behavior matters for a print pipeline, keep a PNG.",
          ],
        },
        {
          heading: "Where grayscale earns its keep — and privacy",
          paragraphs: [
            "Classic uses go beyond aesthetics: document scans read more cleanly without color casts from the scanner lamp; accessibility checks use grayscale to verify that a design still works without relying on color; and prints intended for black-and-white reproduction should always be previewed in gray first.",
            "It is also a debugging tool for photos: if a portrait has an odd color cast or uneven skin tones, converting to grayscale separates the tonal problem from the color problem, telling you whether to fix exposure or white balance.",
            "As with every tool here, conversion runs entirely in your browser — the image never leaves your device. Grayscale a batch of personal scans, client drafts or private documents without any of them touching a server.",
          ],
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
      deepDive: [
        {
          heading: "灰度不只是“把颜色去掉”",
          paragraphs: [
            "最朴素的转灰办法是把红、绿、蓝三个通道取平均。这忽略了人眼的工作方式:我们对绿光远比对红光敏感,对蓝光最不敏感。取平均后,肉眼看起来同样亮的草地和红砖,灰度结果亮度关系却是错的。",
            "正确的转换使用来自人眼感知特性的亮度权重,大约 0.299 红 + 0.587 绿 + 0.114 蓝(几十年前电视标准定下的 ITU-R BT.601 系数)。本工具按这种感知权重转换,灰度结果和你看彩色原图时的实际明暗感受一致。",
            "转灰本身也是有效的编辑手段:很多摄影师先把图转灰,检查影调结构——有没有真正的黑、真正的白、中间调是否顺滑——之后才谈颜色。",
          ],
        },
        {
          heading: "输出格式与哪些东西不受影响",
          paragraphs: [
            "灰度转换只改颜色数据——像素几何完全不动,尺寸、锐度、构图原样保留。因此可以在工作流的任何阶段使用,不会像重采样那样产生连锁副作用。",
            "格式仍然有讲究:含文字、平面图形或想保留最高保真度的图存 PNG;照片类内容存 JPG。灰度 JPEG 通常比彩色版更小,因为颜色通道承担了压缩丢掉的大部分数据。",
            "一个值得知道的细节:真灰度图和三通道恰好相等的彩色图,看起来都“是灰的”,但存储方式不同。工具和打印机的处理可能不一样;如果打印流程对行为有严格要求,请保留 PNG。",
          ],
        },
        {
          heading: "灰度的实际用处与隐私",
          paragraphs: [
            "经典用途不止美观:文档扫描去掉扫描仪灯管带来的偏色后更易读;无障碍检查用灰度验证设计在失去颜色信息后是否仍然可用;准备黑白印刷的图片,永远应该先看灰度预览。",
            "它也是照片排错的工具:人像出现奇怪的偏色或肤色不均时,先转灰可以把影调问题和色彩问题分开——立刻知道该修曝光还是修白平衡。",
            "和站内所有工具一样,转换完全在浏览器内完成——图片不离开你的设备。批量灰度化个人扫描件、客户草稿或私密文档,任何一张都不会经过服务器。",
          ],
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
      deepDive: [
        {
          heading: "グレースケールは「色を消す」以上のこと",
          paragraphs: [
            "素朴なグレー化は R・G・B の3チャンネルを単純平均する方法ですが、それは人間の視覚の仕組みを見落としています。緑の光には赤よりずっと敏感で、青にはほとんど感じません。単純平均では、目には同じ明るさに見える草地と赤レンガの相対的な明るさが崩れます。",
            "正しい変換は、目が各原色をどう知覚するかに由来する輝度の重みを使います:約 0.299 赤 + 0.587 緑 + 0.114 青(数十年前にテレビ規格として定められた ITU-R BT.601 系数)。このツールはその知覚重みで変換するため、結果はカラー原画を見たときの実際の明るさ感覚と一致します。",
            "グレー化自体も有効な編集手段です:多くの写真家はまずグレースケールに変換して階調構造——真の黒、真の白、なめらかな中間調があるか——を確認してから、色を考えます。",
          ],
        },
        {
          heading: "出力形式と、変わらないもの",
          paragraphs: [
            "グレースケール変換が変えるのは色のデータだけ——ピクセルの幾何は無傷で、寸法・シャープネス・構図はそのまま保たれます。そのためリサンプリングのような連鎖的副作用を生まず、ワークフローのどの段階でも安全に使えます。",
            "形式選びは依然重要:文字やフラットなグラフィックスを含む画像、最大限の忠実度が必要なものは PNG。写真系でファイルサイズが重要なら JPG。グレーの JPEG は通常カラーより小さくなります。圧縮で捨てられるデータの多くを色チャンネルが担っているからです。",
            "知っておきたい細部:「見た目がグレー」でも、真のグレースケール画像と3チャンネルが偶然等しいカラー画像では保存形式が違います。ツールやプリンターの扱いが変わることがあるため、印刷パイプラインで厳密さが要るなら PNG を保持してください。",
          ],
        },
        {
          heading: "グレースケールが活きる場面とプライバシー",
          paragraphs: [
            "定番の用途は美観だけではありません:ドキュメントのスキャンはスキャナ光源の色かぶりを除いた方が読みやすく、アクセシビリティ検証ではグレースケールにしてデザインが色に依存せず機能するかを確かめ、モノクロ印刷を予定した画像は必ずグレーでプレビューすべきです。",
            "写真のデバッグ道具にもなります:ポートレートに妙な色かぶりや不均一な肌色があるとき、グレーに変換すると階調の問題と色の問題を切り分けられ、露出を直すかホワイトバランスを直すかがすぐ分かります。",
            "このサイトの全ツール同様、変換は完全にブラウザ内で実行され、画像は端末から出ません。個人のスキャン資料、クライアントの下書き、プライベートな文書を、サーバーを経由させずにグレースケール化できます。",
          ],
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
      deepDive: [
        {
          heading: "La escala de grises es más que \"quitar los colores\"",
          paragraphs: [
            "La forma ingenua de grisar una imagen es promediar por igual los canales rojo, verde y azul. Eso ignora cómo funciona la visión humana: somos mucho más sensibles a la luz verde que a la roja, y apenas a la azul. El promedio plano hace que la hierba verde y el ladrillo rojo — igual de brillantes al ojo — salgan con brillos relativos equivocados.",
            "La conversión correcta usa pesos de luminancia derivados de cómo el ojo percibe cada primario: aproximadamente 0,299 rojo + 0,587 verde + 0,114 azul (los coeficientes ITU-R BT.601 que las normas de televisión fijaron hace décadas). Esta herramienta convierte con ese peso perceptual, así que el resultado coincide con lo que tu ojo ve en el original a color.",
            "El resultado es además una primitiva útil de edición: muchos fotógrafos convierten a grises primero para juzgar la estructura tonal — si hay un negro real, un blanco real y medios tonos suaves — antes de ocuparse del color.",
          ],
        },
        {
          heading: "Formato de salida y qué queda intacto",
          paragraphs: [
            "La conversión a grises solo cambia los datos de color — la geometría de píxeles no se toca, así que dimensiones, nitidez y composición sobreviven exactamente. Eso permite aplicarla en cualquier fase del flujo sin efectos secundarios en cadena como los del remuestreo.",
            "El formato sigue importando: guarda en PNG si la imagen lleva texto, gráficos planos o quieres máxima fidelidad sin más pérdidas; guarda en JPG para contenido fotográfico donde el tamaño importa. Un JPEG en grises suele pesar menos que su versión a color porque los canales de color llevan buena parte de lo que se comprime.",
            "Un detalle que conviene saber: una imagen en escala de grises real y una a color cuyos tres canales coinciden pueden \"verse grises\", pero se almacenan distinto. Herramientas e impresoras pueden tratarlas diferente; si la exactitud importa en un flujo de impresión, conserva un PNG.",
          ],
        },
        {
          heading: "Dónde la escala de grises rinde — y privacidad",
          paragraphs: [
            "Los usos clásicos van más allá de la estética: los escaneos de documentos se leen mejor sin las dominantes de color de la lámpara del escáner; las comprobaciones de accesibilidad usan grises para verificar que un diseño funciona sin depender del color; y toda imagen destinada a impresión en blanco y negro debería previsualizarse en gris primero.",
            "También sirve para depurar fotos: si un retrato tiene un tono extraño o pieles desparejas, convertir a grises separa el problema tonal del problema de color, y te dice si corregir exposición o balance de blancos.",
            "Como en todas las herramientas del sitio, la conversión ocurre íntegramente en tu navegador — la imagen nunca sale de tu dispositivo. Grisa lotes de escaneos personales, borradores de clientes o documentos privados sin que ninguno toque un servidor.",
          ],
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
      deepDive: [
        {
          heading: "Escala de cinza é mais que \"tirar as cores\"",
          paragraphs: [
            "O jeito ingênuo de cinzar uma imagem é calcular a média igual dos canais vermelho, verde e azul. Isso ignora como a visão humana funciona: somos muito mais sensíveis à luz verde que à vermelha, e quase nada à azul. A média simples faz que a grama verde e o tijolo vermelho — igualmente brilhantes ao olho — saiam com brilhos relativos errados.",
            "A conversão correta usa pesos de luminância derivados de como o olho percebe cada primária: aproximadamente 0,299 vermelho + 0,587 verde + 0,114 azul (os coeficientes ITU-R BT.601 que as normas de televisão fixaram décadas atrás). Esta ferramenta converte com esse peso perceptual, então o resultado coincide com o que seu olho vê no original em cores.",
            "O resultado também é uma primitiva útil de edição: muitos fotógrafos convertem para cinza primeiro para julgar a estrutura tonal — se há um preto real, um branco real e meios-tons suaves — antes de cuidar da cor.",
          ],
        },
        {
          heading: "Formato de saída e o que permanece intacto",
          paragraphs: [
            "A conversão para cinza muda apenas os dados de cor — a geometria dos pixels fica intocada, então dimensões, nitidez e composição sobrevivem exatamente. Isso permite aplicá-la em qualquer fase do fluxo sem efeitos colaterais em cadeia como os do reamostramento.",
            "O formato continua importando: salve em PNG quando a imagem tem texto, gráficos planos ou você quer fidelidade máxima sem mais perdas; salve em JPG para conteúdo fotográfico onde o tamanho importa. Um JPEG em cinza costuma pesar menos que sua versão colorida, porque os canais de cor carregam boa parte do que a compressão descarta.",
            "Um detalhe que vale saber: uma imagem em escala de cinza verdadeira e uma colorida cujos três canais coincidem podem \"parecer cinzas\", mas são armazenadas de forma diferente. Ferramentas e impressoras podem tratá-las diferente; se a precisão importa num fluxo de impressão, mantenha um PNG.",
          ],
        },
        {
          heading: "Onde a escala de cinza rende — e privacidade",
          paragraphs: [
            "Os usos clássicos vão além da estética: digitalizações de documentos ficam mais legíveis sem as dominâncias de cor da lâmpada do scanner; as verificações de acessibilidade usam cinza para confirmar que um design funciona sem depender da cor; e toda imagem destinada à impressão em preto e branco deveria ser pré-visualizada em cinza primeiro.",
            "Também serve para depurar fotos: se um retrato tem um tom estranho ou peles desiguais, converter para cinza separa o problema tonal do problema de cor, dizendo se você deve corrigir exposição ou balanço de branco.",
            "Como em todas as ferramentas do site, a conversão acontece inteiramente no seu navegador — a imagem nunca sai do seu dispositivo. Cinze lotes de digitalizações pessoais, rascunhos de clientes ou documentos privados sem que nenhum passe por um servidor.",
          ],
        },
      ],
    },
  },
});
