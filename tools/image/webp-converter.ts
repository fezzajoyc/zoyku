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
      
        "WebP supports both lossy and lossless compression plus alpha, which is why Google pushes it for web delivery; the browser's canvas encoder handles the lossy path and PNG output preserves alpha losslessly. When converting WebP→JPG the same alpha-flattening rule applies as PNG→JPG — transparent areas become white.",
        "Compared with opening each file in an editor and re-saving, the batch converts a mixed folder in one pass with the size delta shown per row. And unlike server-side converters that route images through a queue, the encoder is your browser — the same code path that renders every web page you visit, running entirely offline.",
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
      deepDive: [
        {
          heading: "Why WebP exists and what it wins",
          paragraphs: [
            "WebP was created by Google to solve a specific problem: JPEG is three decades old and PNG's lossless files are large. WebP compresses better on both fronts — its lossy mode uses VP8 video coding techniques, and its lossless mode typically beats PNG — while also supporting transparency and animation, which JPEG cannot.",
            "The practical win is page weight. Photos encoded as WebP at visually equivalent quality commonly come out tens of percent smaller than JPEG. On an image-heavy page that translates directly into faster loads, less bandwidth and better Core Web Vitals scores, which is why most major sites now serve WebP to capable browsers.",
            "The catch has always been support. WebP works in all modern browsers, but some native apps, older operating systems, certain image editors and plenty of CMS installations still refuse it — which is exactly why converting WebP into JPG or PNG remains a common, practical need.",
          ],
        },
        {
          heading: "Converting out of WebP: what to expect",
          paragraphs: [
            "If your WebP was saved in lossy mode, converting to JPG is a re-encode of already-compressed data: quality loss is usually minor at high settings, but going through multiple lossy formats compounds artifacts, so convert once and keep the result.",
            "Converting to PNG produces a lossless file that will be noticeably larger than the WebP — often several times for photos. That is not a bug: PNG is paying for exact pixel fidelity, and it is the right choice when you need transparency or plan to re-edit the image.",
            "Rule of thumb: JPG for photographic content destined for sharing or upload forms that do not accept WebP; PNG for graphics, screenshots, transparent images and anything that will be edited further. Watch the output size after conversion — if the PNG balloons, the source was photographic and JPG was probably the better target.",
          ],
        },
        {
          heading: "Local conversion and workflow notes",
          paragraphs: [
            "This converter decodes the WebP and re-encodes it to your chosen format entirely in your browser — no upload, no queue, no waiting for a server round trip. The file never leaves your device, which matters for unreleased designs, client assets or personal photos.",
            "Batch mode fits the common scenario: you downloaded a set of WebP images from a site or design handoff and a downstream tool — a CMS, a marketplace, a print service — only accepts JPG or PNG. Convert the whole folder once instead of wrestling with each file.",
            "Keep the original WebP when in doubt. If the source was lossy WebP, it is already the best-quality version you own; any conversion can only go down in fidelity from there, so the original is your re-encode safety net.",
          ],
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
      deepDive: [
        {
          heading: "WebP 为什么存在,它赢在哪里",
          paragraphs: [
            "WebP 是谷歌为解决一个具体问题而创造的:JPEG 已有约三十年历史,PNG 的无损文件又偏大。WebP 在两条战线上同时占优——有损模式使用 VP8 视频编码技术,无损模式通常也胜过 PNG——并且还支持透明和动画,这两样 JPEG 都做不到。",
            "实际收益是页面重量。视觉等效质量下,WebP 编码的照片通常比 JPEG 小百分之几十。对图片密集的页面来说,这直接转化为更快的加载、更少的流量和更好的核心网页指标——这就是主流网站纷纷向支持的浏览器提供 WebP 的原因。",
            "问题始终是兼容性。WebP 在所有现代浏览器中都能用,但一些原生应用、旧系统、部分图像编辑器和大量 CMS 仍然拒收——这正是把 WebP 转成 JPG 或 PNG 依然是常见实际需求的原因。",
          ],
        },
        {
          heading: "从 WebP 转出来:会发生什么",
          paragraphs: [
            "如果你的 WebP 是有损模式保存的,转 JPG 是对已压缩数据的再次编码:高设置下损失通常很小,但多次经过有损格式会累积伪影,所以只转一次并保存好结果。",
            "转 PNG 得到的是无损文件,体积会比 WebP 明显更大——照片类常常大好几倍。这不是 bug:PNG 付出的是精确到每个像素的代价,当你需要透明通道或打算继续编辑时,它是正确选择。",
            "经验法则:要分享或上传到只认 JPG/PNG 的表单的照片类内容用 JPG;图形、截图、透明图和要继续编辑的内容用 PNG。转换后盯一下输出体积——如果 PNG 暴涨,说明源图是照片类,JPG 多半才是更好的目标。",
          ],
        },
        {
          heading: "本地转换与工作流提示",
          paragraphs: [
            "本转换器在你的浏览器内完成 WebP 解码和目标格式重编码——无上传、无排队、不用等服务器往返。文件不离开设备,这对未发布的设计稿、客户素材和个人照片都很重要。",
            "批量模式贴合常见场景:你从某个网站或设计交付里下载了一批 WebP,而下游工具——CMS、电商平台、印刷服务——只接受 JPG 或 PNG。把整个文件夹一次转完,别一张一张折腾。",
            "拿不准时保留原 WebP。如果源图是有损 WebP,它已经是你手中画质最好的版本;任何转换只会往下走,原图就是你的重编码安全网。",
          ],
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
      deepDive: [
        {
          heading: "WebP が生まれた理由と、勝っているところ",
          paragraphs: [
            "WebP は Google が明確な問題を解決するために作りました:JPEG は約30年前の方式で、PNG のロスレスはファイルが大きい。WebP は両面で圧縮性能が上回ります——非可逆モードは VP8 動画符号化の技術を使い、可逆モードも通常 PNG に勝つ——さらに JPEG が扱えない透過とアニメーションにも対応します。",
            "実利はページの軽さです。視覚的に同等の品質でエンコードした写真は、JPEG より数割小さくなることが普通です。画像の多いページでは高速な読み込み・帯域の節約・Core Web Vitals の改善に直結し、主要サイトが対応ブラウザに WebP を配信する理由です。",
            "難点は一貫して対応状況です。WebP は現行ブラウザすべてで動きますが、一部のネイティブアプリ、旧 OS、特定の画像エディタ、多くの CMS はまだ拒否します——だからこそ WebP を JPG/PNG に変換する需要は今も実務的に存在します。",
          ],
        },
        {
          heading: "WebP から変換するときに起こること",
          paragraphs: [
            "元の WebP が非可逆保存なら、JPG への変換はすでに圧縮済みデータの再エンコードです:高品質設定なら損失は小さいものの、複数の非可逆形式を経るたびにアーティファクトが蓄積するため、変換は一度だけにして結果を保管してください。",
            "PNG への変換はロスレスなファイルを生みますが、WebP より明確に大きくなります——写真では数倍に及ぶことも。バグではなく、PNG は完全な画素忠実度の対価を払っており、透過が必要なときや再編集を予定するときの正しい選択です。",
            "経験則:共有や「WebP 非対応のフォーム」に向ける写真系は JPG、グラフィック・スクリーンショット・透過画像・追加編集するものは PNG。変換後に出力サイズを確認——PNG が急に膨れたら、元画像は写真系で、JPG の方が適切だった可能性が高いです。",
          ],
        },
        {
          heading: "ローカル変換とワークフローのメモ",
          paragraphs: [
            "このコンバーターは WebP のデコードと選択形式への再エンコードを完全にブラウザ内で行います——アップロードなし、待ち行列なし、サーバー往復なし。ファイルは端末を出ないため、未公開のデザイン、クライアント資産、個人写真に適します。",
            "一括モードは定番シナリオに合います:サイトやデザイン納品から WebP の一式をダウンロードしたが、下流の CMS・マーケットプレイス・印刷サービスは JPG/PNG しか受け付けない。ファイルごとに格闘せず、フォルダ単位で一度に変換します。",
            "迷ったら元の WebP を残す。元が非可逆 WebP なら、それがあなたの手元にある最高品質の版です。どんな変換もそこから画質は下がる一方で、元画像は再エンコードの安全網になります。",
          ],
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
      deepDive: [
        {
          heading: "Por qué existe WebP y qué gana",
          paragraphs: [
            "WebP lo creó Google para resolver un problema concreto: JPEG tiene tres décadas y los archivos sin pérdida de PNG son grandes. WebP comprime mejor en ambos frentes — su modo con pérdida usa técnicas de codificación de vídeo VP8, y su modo sin pérdida suele vencer a PNG — además de soportar transparencia y animación, cosas que JPEG no puede.",
            "La ganancia práctica es el peso de la página. Fotos codificadas como WebP a calidad visualmente equivalente suelen salir decenas por ciento más ligeras que en JPEG. En una página con muchas imágenes eso se traduce directamente en cargas más rápidas, menos ancho de banda y mejores Core Web Vitals, y por eso la mayoría de los grandes sitios sirven WebP a los navegadores capaces.",
            "El problema siempre ha sido el soporte. WebP funciona en todos los navegadores modernos, pero algunas apps nativas, sistemas antiguos, ciertos editores y bastantes instalaciones de CMS aún lo rechazan — y justo por eso convertir WebP a JPG o PNG sigue siendo una necesidad común y práctica.",
          ],
        },
        {
          heading: "Convertir fuera de WebP: qué esperar",
          paragraphs: [
            "Si tu WebP se guardó en modo con pérdida, convertir a JPG es una recodificación de datos ya comprimidos: la pérdida es menor con ajustes altos, pero pasar por varios formatos con pérdida acumula artefactos, así que convierte una vez y guarda el resultado.",
            "Convertir a PNG produce un archivo sin pérdida que será claramente mayor que el WebP — a menudo varias veces para fotos. No es un error: PNG paga la fidelidad exacta de cada píxel, y es la elección correcta si necesitas transparencia o vas a reeditar la imagen.",
            "Regla práctica: JPG para contenido fotográfico destinado a compartir o a formularios que no aceptan WebP; PNG para gráficos, capturas, imágenes transparentes y todo lo que se editará después. Mira el tamaño de salida tras convertir — si el PNG se dispara, la fuente era fotográfica y el JPG probablemente era el mejor destino.",
          ],
        },
        {
          heading: "Conversión local y notas de flujo",
          paragraphs: [
            "Este conversor decodifica el WebP y lo recodifica al formato elegido íntegramente en tu navegador — sin subida, sin cola, sin esperar un viaje al servidor. El archivo nunca sale de tu dispositivo, algo que importa con diseños no publicados, recursos de clientes o fotos personales.",
            "El modo por lotes encaja en el escenario común: descargaste un conjunto de WebP de un sitio o de una entrega de diseño y una herramienta posterior — un CMS, un marketplace, un servicio de imprenta — solo acepta JPG o PNG. Convierte la carpeta entera de una vez en vez de pelear con cada archivo.",
            "Ante la duda, conserva el WebP original. Si la fuente era WebP con pérdida, ya es la mejor versión que tienes; cualquier conversión solo puede bajar en fidelidad desde ahí, así que el original es tu red de seguridad para futuras recodificaciones.",
          ],
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
      deepDive: [
        {
          heading: "Por que o WebP existe e o que ele ganha",
          paragraphs: [
            "O WebP foi criado pelo Google para resolver um problema específico: o JPEG tem três décadas e os arquivos sem perdas do PNG são grandes. O WebP comprime melhor nas duas frentes — seu modo com perdas usa técnicas de codificação de vídeo VP8, e seu modo sem perdas geralmente vence o PNG — além de suportar transparência e animação, coisas que o JPEG não consegue.",
            "O ganho prático é o peso da página. Fotos codificadas em WebP com qualidade visualmente equivalente costumam sair dezenas por cento mais leves que em JPEG. Numa página cheia de imagens isso vira carregamentos mais rápidos, menos banda e melhores notas de Core Web Vitals, e é por isso que a maioria dos grandes sites serve WebP para navegadores capazes.",
            "A pendência sempre foi o suporte. O WebP funciona em todos os navegadores modernos, mas alguns apps nativos, sistemas antigos, certos editores de imagem e bastantes instalações de CMS ainda o recusam — e exatamente por isso converter WebP em JPG ou PNG continua sendo uma necessidade comum e prática.",
          ],
        },
        {
          heading: "Convertendo para fora do WebP: o que esperar",
          paragraphs: [
            "Se o seu WebP foi salvo em modo com perdas, converter para JPG é uma recodificação de dados já comprimidos: a perda costuma ser pequena com valores altos, mas passar por vários formatos com perdas acumula artefatos, então converta uma vez e guarde o resultado.",
            "Converter para PNG produz um arquivo sem perdas que será visivelmente maior que o WebP — frequentemente várias vezes para fotos. Não é defeito: o PNG paga pela fidelidade exata de cada pixel, e é a escolha certa quando você precisa de transparência ou pretende reeditar a imagem.",
            "Regra prática: JPG para conteúdo fotográfico destinado a compartilhar ou a formulários que não aceitam WebP; PNG para gráficos, capturas, imagens transparentes e tudo que será editado depois. Observe o tamanho de saída após converter — se o PNG disparar, a fonte era fotográfica e o JPG provavelmente era o melhor alvo.",
          ],
        },
        {
          heading: "Conversão local e notas de fluxo",
          paragraphs: [
            "Este conversor decodifica o WebP e o recodifica no formato escolhido inteiramente no seu navegador — sem envio, sem fila, sem esperar uma viagem ao servidor. O arquivo nunca sai do seu dispositivo, o que importa com designs não publicados, recursos de clientes ou fotos pessoais.",
            "O modo em lote encaixa no cenário comum: você baixou um conjunto de WebP de um site ou de uma entrega de design e uma ferramenta posterior — um CMS, um marketplace, um serviço de impressão — só aceita JPG ou PNG. Converta a pasta inteira de uma vez em vez de brigar com cada arquivo.",
            "Na dúvida, guarde o WebP original. Se a fonte era WebP com perdas, ela já é a melhor versão que você tem; qualquer conversão só pode cair em fidelidade a partir daí, então o original é sua rede de segurança para futuras recodificações.",
          ],
        },
      ],
    },
  },
});
