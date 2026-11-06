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
      deepDive: [
        {
          heading: "What HEIC actually is — and why it exists",
          paragraphs: [
            "HEIC is the container format behind Apple's High Efficiency Image format, adopted as the default for iPhone camera photos since iOS 11. It is based on the same HEVC video compression family and stores images at roughly half the size of an equivalent JPEG, which is why a phone can keep shooting high-resolution photos without the storage filling up.",
            "The trade-off is compatibility. HEIC is well supported inside the Apple ecosystem and in some recent Windows and Android versions, but plenty of websites, government portals, printers, older software and non-Apple devices still expect JPG. A photo that opens fine on your phone may be rejected the moment you upload it somewhere.",
            "Converting to JPG trades file size for universality: the resulting file is larger but opens anywhere, from a decade-old browser to a print shop. That is the right trade whenever the destination is outside your control.",
          ],
        },
        {
          heading: "Conversion details worth knowing",
          paragraphs: [
            "JPEG is a lossy format, so converting HEIC to JPG is a re-encode, not a repackaging. With high-quality settings the difference is imperceptible for typical photos; with low settings you inherit artifacts on top of the original compression. Use the highest quality available unless file size matters more than fidelity.",
            "Metadata may not survive conversion: HEIC supports features JPEG does not, such as depth maps used by Portrait mode. A plain JPEG carries the visible image, dimensions and standard EXIF data, but not Apple-specific extensions. If you rely on editing a photo's depth later, keep the HEIC original.",
            "Batch conversion is the realistic workflow: an iPhone library contains hundreds or thousands of HEIC files, and they usually need converting the moment they must go to a PC, a web form or a shared drive. Convert only what the destination needs, and keep the HEIC masters as the source of truth.",
          ],
        },
        {
          heading: "Privacy matters most with personal photos",
          paragraphs: [
            "Camera photos are among the most sensitive files people own: family moments, home interiors, travel patterns. Photo-conversion sites that require uploads see all of that — and EXIF location tags can even record where each picture was taken.",
            "This converter runs entirely in your browser: the HEIC is decoded and re-encoded to JPG on your device, and nothing is transmitted. It is the sensible choice for personal libraries precisely because there is no server that ever sees the pictures.",
            "A related tip: if you plan to share the JPG publicly rather than just open it somewhere, consider stripping location EXIF as well — converting the format does not by itself remove location metadata unless the tool drops it during re-encode.",
          ],
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
      deepDive: [
        {
          heading: "HEIC 到底是什么,为什么会有它",
          paragraphs: [
            "HEIC 是苹果高效图像格式背后的容器格式,自 iOS 11 起成为 iPhone 相机的默认输出。它基于 HEVC 视频压缩同源的技术,同画质下体积约为 JPEG 的一半——这正是手机能不断拍高分辨率照片而存储空间不爆炸的原因。",
            "代价是兼容性。HEIC 在苹果生态和部分新版 Windows、Android 上支持良好,但大量网站、政务门户、打印机、老软件和非苹果设备仍然只认 JPG。在手机上打开一切正常的照片,一上传可能就被拒收。",
            "转成 JPG 是用体积换通用性:结果文件更大,但十年前的浏览器和打印店都能打开。凡是目的地不在你掌控之内的场合,这笔交换都是划算的。",
          ],
        },
        {
          heading: "转换中值得知道的细节",
          paragraphs: [
            "JPEG 是有损格式,所以 HEIC 转 JPG 是一次重新编码,不是换个封装。高质量设置下,普通照片的差别难以察觉;低质量设置下,你会在原有压缩之上再叠加一层伪影。除非体积比画质更重要,否则用可用的最高质量。",
            "元数据不一定能完全保留:HEIC 支持一些 JPEG 没有的特性,比如人像模式用的景深图。普通 JPEG 携带可见图像、尺寸和标准 EXIF,但不包含苹果的专有扩展。如果之后还要编辑照片的景深,请保留 HEIC 原件。",
            "批量转换才是现实工作流:iPhone 图库里动辄成百上千个 HEIC 文件,而它们往往在需要传到 PC、网页表单或共享盘的那一刻才被要求转换。只转目的地需要的那些,把 HEIC 原件当作唯一事实来源。",
          ],
        },
        {
          heading: "私人照片场景下隐私最要紧",
          paragraphs: [
            "相机照片是人拥有的最敏感的文件之一:家庭时刻、居家环境、出行轨迹。要求上传的图片转换网站会看到这一切——EXIF 里的位置标签甚至记录着每张照片的拍摄地点。",
            "本转换器完全在浏览器内运行:HEIC 在你的设备上解码并重编码为 JPG,不传输任何数据。正因为没有服务器见过这些照片,处理私人图库时它是合理选择。",
            "一个相关提示:如果 JPG 是要公开发布而不是仅在某处打开,考虑连位置 EXIF 一起清除——仅转换格式并不自动删除位置元数据,除非工具在重编码时把它丢弃。",
          ],
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
      deepDive: [
        {
          heading: "HEIC とは何か、なぜ存在するのか",
          paragraphs: [
            "HEIC は Apple の High Efficiency Image フォーマットの基盤となるコンテナ形式で、iOS 11 以降は iPhone カメラの既定出力です。HEVC 動画圧縮と同系の技術に基づき、同等品質の JPEG の約半分のサイズで保存できます。これが、スマートフォンが高解像度写真を撮り続けてもストレージが爆発しない理由です。",
            "代償は互換性です。HEIC は Apple エコシステムと一部の新しい Windows・Android では十分に対応していますが、多くの Web サイト、公的ポータル、プリンター、古いソフトウェア、非 Apple 端末はいまだ JPG を前提とします。スマホでは問題なく開ける写真が、アップロードした瞬間に拒否されることがあります。",
            "JPG への変換は「サイズと引き換えに万能性を得る」取引です:結果のファイルは大きくなりますが、10年前のブラウザから印刷店までどこでも開けます。行き先が自分で管理できない場面では、常に正しい選択です。",
          ],
        },
        {
          heading: "変換で知っておきたい細部",
          paragraphs: [
            "JPEG は非可逆形式なので、HEIC→JPG は再梱包ではなく再エンコードです。高品質設定なら通常の写真で差は知覚できず、低品質では元の圧縮にさらにアーティファクトが上乗せされます。ファイルサイズが画質より重要でない限り、最高品質を使ってください。",
            "メタデータは完全には残らないことがあります:HEIC は Portrait モードが使う深度マップなど、JPEG が持たない機能に対応しています。普通の JPEG には可視画像・寸法・標準 EXIF が入りますが、Apple 固有の拡張は入りません。後から深度を編集するつもりなら HEIC 原本を残してください。",
            "現実のワークフローは一括変換です:iPhone のライブラリには数百〜数千の HEIC があり、PC や Web フォーム、共有ドライブに渡す瞬間に変換が求められます。行き先が必要な分だけ変換し、HEIC のマスターを唯一の情報源として保持しましょう。",
          ],
        },
        {
          heading: "個人の写真こそプライバシーが重要",
          paragraphs: [
            "カメラ写真は人が持つ最もセンシティブなファイルの一つです:家族の瞬間、部屋の内観、移動の傾向。アップロードを要求する変換サイトはそのすべてを見ます——EXIF の位置タグは撮影場所まで記録していることもあります。",
            "このコンバーターは完全にブラウザ内で動きます:HEIC は端末上でデコードされ JPG に再エンコードされ、何も送信されません。サーバーが写真を見ることが一切ないため、個人ライブラリには理にかなった選択です。",
            "関連するヒント:JPG をどこかで開くだけでなく公開するつもりなら、位置情報 EXIF の除去も検討してください——形式の変換だけでは位置メタデータは消えず、再エンコード時に破棄する実装であることが必要です。",
          ],
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
      deepDive: [
        {
          heading: "Qué es realmente HEIC y por qué existe",
          paragraphs: [
            "HEIC es el formato contenedor detrás del formato High Efficiency Image de Apple, predeterminado para las fotos de cámara del iPhone desde iOS 11. Se basa en la misma familia de compresión que el vídeo HEVC y almacena imágenes a aproximadamente la mitad del tamaño de un JPEG equivalente, por eso un teléfono puede seguir disparando fotos de alta resolución sin llenar el almacenamiento.",
            "La contrapartida es la compatibilidad. HEIC está bien soportado dentro del ecosistema Apple y en algunas versiones recientes de Windows y Android, pero muchos sitios web, portales oficiales, impresoras, software antiguo y dispositivos ajenos a Apple siguen esperando JPG. Una foto que se abre perfecta en tu móvil puede ser rechazada en el momento en que la subes a cualquier parte.",
            "Convertir a JPG cambia tamaño por universalidad: el archivo resultante pesa más pero se abre en cualquier sitio, desde un navegador de hace una década hasta una imprenta. Es el intercambio correcto siempre que el destino esté fuera de tu control.",
          ],
        },
        {
          heading: "Detalles de la conversión que conviene conocer",
          paragraphs: [
            "JPEG es un formato con pérdida, así que convertir HEIC a JPG es una recodificación, no un cambio de envoltorio. Con ajustes de alta calidad la diferencia es imperceptible en fotos normales; con ajustes bajos heredas artefactos sobre la compresión original. Usa la máxima calidad disponible salvo que el tamaño importe más que la fidelidad.",
            "Los metadatos pueden no sobrevivir: HEIC admite funciones que JPEG no tiene, como los mapas de profundidad del modo Retrato. Un JPEG corriente lleva la imagen visible, las dimensiones y el EXIF estándar, pero no las extensiones específicas de Apple. Si piensas editar la profundidad después, conserva el HEIC original.",
            "La conversión por lotes es el flujo realista: una biblioteca de iPhone contiene cientos o miles de HEIC, y suelen necesitar conversión justo cuando deben ir a un PC, un formulario web o un disco compartido. Convierte solo lo que el destino necesita y guarda los HEIC originales como fuente de verdad.",
          ],
        },
        {
          heading: "Con fotos personales, la privacidad importa más",
          paragraphs: [
            "Las fotos de cámara están entre los archivos más sensibles que una persona posee: momentos familiares, interiores de casa, patrones de viaje. Los sitios de conversión que exigen subida ven todo eso — y las etiquetas EXIF de ubicación pueden incluso registrar dónde se tomó cada imagen.",
            "Este convertidor funciona íntegramente en tu navegador: el HEIC se decodifica y se recodifica a JPG en tu dispositivo, y no se transmite nada. Es la elección sensata para bibliotecas personales precisamente porque ningún servidor llega a ver las fotos.",
            "Un consejo relacionado: si el JPG va a publicarse en público y no solo abrirse en algún sitio, considera eliminar también el EXIF de ubicación — convertir el formato no elimina por sí mismo los metadatos de ubicación salvo que la herramienta los descarte al recodificar.",
          ],
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
      deepDive: [
        {
          heading: "O que é realmente HEIC e por que existe",
          paragraphs: [
            "HEIC é o formato contêiner por trás do formato High Efficiency Image da Apple, padrão das fotos de câmera do iPhone desde o iOS 11. Baseia-se na mesma família de compressão do vídeo HEVC e armazena imagens com cerca de metade do tamanho de um JPEG equivalente — por isso um celular segue fotografando em alta resolução sem encher o armazenamento.",
            "O contraponto é a compatibilidade. HEIC é bem suportado no ecossistema Apple e em algumas versões recentes de Windows e Android, mas muitos sites, portais oficiais, impressoras, softwares antigos e dispositivos não-Apple ainda esperam JPG. Uma foto que abre perfeitamente no seu celular pode ser rejeitada no momento em que você a envia para qualquer lugar.",
            "Converter para JPG troca tamanho por universalidade: o arquivo resultante é maior, mas abre em qualquer lugar, de um navegador de uma década atrás a uma gráfica. É a troca certa sempre que o destino está fora do seu controle.",
          ],
        },
        {
          heading: "Detalhes da conversão que valem saber",
          paragraphs: [
            "JPEG é um formato com perdas, então converter HEIC para JPG é uma recodificação, não uma mudança de embalagem. Com configurações de alta qualidade a diferença é imperceptível em fotos comuns; com valores baixos você herda artefatos por cima da compressão original. Use a maior qualidade disponível, salvo quando o tamanho importar mais que a fidelidade.",
            "Os metadados podem não sobreviver: HEIC suporta recursos que o JPEG não tem, como os mapas de profundidade usados pelo modo Retrato. Um JPEG comum carrega a imagem visível, as dimensões e o EXIF padrão, mas não as extensões específicas da Apple. Se pretende editar a profundidade depois, guarde o HEIC original.",
            "A conversão em lote é o fluxo realista: uma biblioteca de iPhone contém centenas ou milhares de arquivos HEIC, e eles normalmente precisam de conversão justamente quando precisam ir para um PC, um formulário web ou um drive compartilhado. Converta apenas o que o destino precisa e mantenha os HEIC originais como fonte da verdade.",
          ],
        },
        {
          heading: "Com fotos pessoais, privacidade importa mais",
          paragraphs: [
            "Fotos de câmera estão entre os arquivos mais sensíveis que uma pessoa possui: momentos em família, interiores de casa, padrões de viagem. Sites de conversão que exigem envio veem tudo isso — e as etiquetas EXIF de localização podem até registrar onde cada imagem foi tirada.",
            "Este conversor funciona inteiramente no seu navegador: o HEIC é decodificado e recodificado em JPG no seu dispositivo, e nada é transmitido. É a escolha sensata para bibliotecas pessoais justamente porque nenhum servidor chega a ver as fotos.",
            "Uma dica relacionada: se o JPG será publicado publicamente e não apenas aberto em algum lugar, considere remover também o EXIF de localização — converter o formato não elimina por si só os metadados de localização, a menos que a ferramenta os descarte ao recodificar.",
          ],
        },
      ],
    },
  },
});
