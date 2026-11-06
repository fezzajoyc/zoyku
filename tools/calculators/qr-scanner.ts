import { CalcEngineQrScan } from "../_engines/calc-engine-qrscan";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "qr-scanner",
  category: "utility",
  icon: "qr",
  engine: { component: CalcEngineQrScan },
  related: ["qr-generator", "barcode-generator", "url-decoder", "image-metadata-viewer", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "QR Code Scanner",
      tagline:
        "Decode a QR code from any image or straight from your camera — read locally in your browser, with copy and open-as-link output and nothing uploaded.",
      intro: [
        "Drop in a screenshot or photo of a QR code and the decoder reads it right on the page, highlighting the detected corners over the image. If it is a URL you get a copy button plus a one-click open link; any other content — WiFi credentials, vCards, plain text — comes out exactly as encoded, ready to copy.",
        "Prefer pointing your camera at the code? The live mode streams to a local video element and analyzes frames in memory until one decodes, then stops the camera immediately. Because both paths run entirely in your browser, the image or camera feed is never uploaded to any server, and nothing is recorded.",
        "Decoding uses the jsQR library on the pixels of your image or camera frames, detecting the three finder patterns that anchor every QR symbol before reading the data grid. Camera mode stops the stream the moment one frame decodes, so the sensor is not left running in the background.",
        "Compared with pointing your phone camera and trusting its preview, this shows the decoded content as text first — the safe way to inspect a code from a poster or package before visiting the link it encodes. Nothing is uploaded; decoding happens in your browser's memory. Damaged, low-contrast or glare-covered codes may fail — a sharper photo usually fixes it.",
      ],
      steps: [
        "Choose the 'From an image' tab and drop in a picture of the QR code, or switch to 'Live camera'.",
        "For the camera, press Start camera, allow the permission prompt and aim at the code.",
        "Read the decoded text in the result card.",
        "Copy it, or open it directly if it looks like a link.",
      ],
      faqs: [
        {
          q: "Do my images or camera frames leave my device?",
          a: "No. Decoding runs on this page with the jsqr library, in JavaScript: uploaded images are read from their local pixels and camera frames are drawn to an in-memory canvas and analyzed there. Nothing is uploaded, logged or stored, and the camera stream is stopped as soon as a code is found or you press stop.",
        },
        {
          q: "The camera will not start — what is wrong?",
          a: "Most often the browser blocked camera permission for this site; allow it in the address bar and press start again. Live scanning also requires a secure https page, and if the device has no camera at all the tool tells you instead of failing silently.",
        },
        {
          q: "What kinds of QR content can it read?",
          a: "Any standard QR code: URLs, plain text, phone numbers, WiFi join strings, vCard contacts, UPI or PIX payment strings and more. The tool shows the raw decoded content — for WiFi or payment codes, copy the text into the app that consumes that format.",
        },
      ],
      deepDive: [
        {
          heading: "Camera permissions: why the browser asks and what it means",
          paragraphs: [
            "The getUserMedia API behind camera mode is guarded by two gates the browser enforces, not the page. First, a permission prompt: the site can only request, and you can grant or refuse — a refusal is remembered and can be changed from the address bar icon. Second, a secure-context rule: camera access is only allowed on https pages, so a non-secure mirror of this tool would not even be able to ask.",
            "What the permission does not grant is equally important: there is no background access. A page can only read frames while a video stream is alive, browsers visibly indicate the active camera with an indicator, and stopping the stream (which this tool does automatically on a successful decode) ends all access. No frame can be captured silently in the background.",
            "This is the reason the failure mode is so specific: a camera that will not start is almost always a blocked permission, an https-context problem, or genuinely no camera on the device. The tool distinguishes these cases rather than showing a generic error, because each has a different fix.",
          ],
        },
        {
          heading: "How QR decoding actually finds the code",
          paragraphs: [
            "A QR symbol anchors itself with three large finder patterns — the squares in the top-left, top-right and bottom-left corners. A decoder scans the pixel grid for exactly those shapes, uses their positions to establish the symbol's rotation and perspective, and only then reads the data modules and runs error correction. That is why a code photographed at an angle can still decode: the finder patterns supply the geometry.",
            "Image quality drives the outcome more than anything else. The classic failures are glare over a finder pattern, a code that occupies too few pixels after downscaling, and low contrast between modules and background. A sharper photo, a closer crop or a straighter angle fixes most misreads — the decoder is deterministic, not probabilistic.",
            "The decoded payload is shown as raw text deliberately. QR codes can encode WiFi join strings, vCards and payment formats, but the code itself does not announce its type; showing the raw string lets you verify what a code actually contains before any app consumes it — which is the entire point of inspecting a code from a poster or package before opening its link.",
          ],
        },
        {
          heading: "Inspecting codes before trusting them",
          paragraphs: [
            "Phone camera apps increasingly open QR links straight away, which is convenient and precisely what a malicious sticker exploit relies on. A QR code is unauthenticated data: anyone can print one pointing anywhere. Reading the decoded text first — as this tool does before offering the open button — inserts a deliberate pause between seeing a code and acting on it.",
            "The practical habits: check that the URL's domain matches what the context promises (a parking meter, a restaurant menu), be suspicious of shorteners that hide the destination, and never enter credentials on a page you reached from an unverified code. For payment codes, verify the payee string character by character rather than trusting the label.",
            "Privacy holds for both paths: image decoding reads only the local pixels of the file you dropped in, and camera frames are analyzed in memory and discarded. Nothing is uploaded, logged or stored — the inspection stays entirely on your device.",
          ],
        },
      ],
    },
    zh: {
      name: "二维码扫描器",
      tagline:
        "上传图片或直接打开摄像头即可解码二维码——全程在浏览器本地完成,结果可一键复制或作为链接打开,任何内容都不会上传。",
      intro: [
        "把二维码的截图或照片拖进来,解码器会在页面上直接读取,并在图片上标出识别到的四个角。如果内容是网址,会同时提供复制按钮和一键打开链接;WiFi 信息、名片(vCard)、纯文本等其他内容则按原样输出,直接复制即可。",
        "更喜欢用摄像头对着扫?实时模式会把画面送到本地 video 元素,在内存里逐帧分析,直到识别成功后立即关闭摄像头。两条路径都完全在浏览器内运行,图片和摄像头画面永远不会上传到任何服务器,也不会被录制。",
      ],
      steps: [
        "在“从图片识别”中拖入二维码图片,或切换到“摄像头实时扫描”。",
        "摄像头模式下点击“开启摄像头”,允许权限提示后将镜头对准二维码。",
        "在结果卡片中查看解码出的文本。",
        "复制结果;如果看起来是链接,可以直接打开。",
      ],
      faqs: [
        {
          q: "图片或摄像头画面会离开我的设备吗?",
          a: "不会。解码由本页的 jsqr 库用 JavaScript 完成:上传的图片只读取本地像素,摄像头画面绘制到内存画布中分析。任何内容都不上传、不留日志、不存储;识别到二维码或点击停止后,摄像头立即关闭。",
        },
        {
          q: "摄像头无法启动是怎么回事?",
          a: "最常见的原因是浏览器拒绝了本站的摄像头权限,在地址栏允许后重新点击即可。实时扫描还需要安全的 https 页面;如果设备上根本没有摄像头,工具会明确提示,而不是无声失败。",
        },
        {
          q: "能读取哪些类型的二维码内容?",
          a: "任何标准二维码:网址、纯文本、电话号码、WiFi 连接串、vCard 名片、UPI 或 PIX 支付串等。工具展示的是原始解码内容——WiFi 或支付类二维码请把文本复制到对应 App 中使用。",
        },
      ],
      deepDive: [
        {
          heading: "摄像头权限:浏览器为什么要问,问了什么",
          paragraphs: [
            "摄像头模式背后的 getUserMedia API 受两道浏览器强制的关卡保护,不是页面说了算。第一道是权限提示:网站只能\"请求\",允不允许由你决定,拒绝会被记住,之后可以在地址栏图标里改。第二道是安全上下文规则:摄像头访问只允许在 https 页面上,所以本工具的非安全镜像连提问的资格都没有。",
            "同样重要的是,这个权限不授出什么:没有后台访问。只有视频流存活时页面才能读帧,浏览器会用指示器明示摄像头正在使用;流一停(本工具在解码成功后自动停止)所有访问随之结束。不存在悄悄在后台截帧的可能。",
            "这也解释了失败原因为什么如此具体:摄像头起不来,几乎总是权限被拒、非 https 环境,或设备上真的没有摄像头这三种。工具会区分这几种情况,而不是扔一句笼统的报错,因为每种情况的解法不同。",
          ],
        },
        {
          heading: "二维码解码到底是怎么找到码的",
          paragraphs: [
            "二维码用三个大定位图案自我锚定——左上、右上、左下角的三个方块。解码器在像素网格里精确寻找这三种形状,用它们的位置确立符号的旋转和透视,然后才读取数据模块、跑纠错。这就是斜着拍的码也能解出来的原因:定位图案供出了几何信息。",
            "成败更多取决于图像质量而非别的。经典失败场景是定位图案上有反光、缩图后码占的像素太少、模块与背景对比度不足。换一张更清晰的照片、裁近一点、把角度摆正,大多数误读都能解决——解码是确定性的,不是概率性的。",
            "解码结果刻意以原始文本展示。二维码可以编码 WiFi 连接串、名片和支付格式,但码本身不会声明自己的类型;先看原始字符串,再让任何 App 消费它——这正是\"打开海报或包装上的链接之前先验一验码\"的全部意义。",
          ],
        },
        {
          heading: "先验码,再信任",
          paragraphs: [
            "手机相机应用越来越倾向于直接打开二维码链接——很方便,而这恰恰是恶意贴纸攻击依赖的行为。二维码是未经认证的数据:任何人都能印一个指向任何地方的码。先读解码文本(本工具在提供打开按钮之前就是这么做的),在\"看到码\"和\"照它行动\"之间插入一次有意识的停顿。",
            "实用习惯:核对网址域名是否符合场景的承诺(停车计时器、餐厅菜单);对隐藏目标的短链保持警惕;永远不要在从未经核实的码跳转到的页面上输入凭据。支付码请逐字核对收款方字符串,不要信标签。",
            "两条路径的隐私都成立:图片解码只读取你拖入文件的本地像素,摄像头帧在内存里分析后即弃。不上传、不留日志、不存储——整个查验过程完全留在你的设备上。",
          ],
        },
      ],
    },
    ja: {
      name: "QR コードスキャナー",
      tagline:
        "画像のアップロードでもカメラでも QR コードをその場で解読。結果はワンクリックでコピー、リンクならそのまま開けます。データは一切送信されません。",
      intro: [
        "QR コードのスクリーンショットや写真をドロップすると、このページ上で直接デコードし、検出した四隅を画像の上に表示します。内容が URL ならコピーボタンとワンクリックで開くリンクを表示。Wi-Fi 情報や vCard、プレーンテキストなど、それ以外の内容もそのままの形で出力します。",
        "カメラをかざして読み取りたい場合は、ライブモードがローカルの video 要素に映像を流し、メモリ上でフレームを解析して、読み取れた時点ですぐにカメラを停止します。どちらの方法も完全にブラウザ内で動作するため、画像もカメラ映像もサーバーへ送信されず、録画もされません。",
      ],
      steps: [
        "「画像から読み取り」タブで QR 画像をドロップするか、「カメラで読み取り」に切り替えます。",
        "カメラでは「カメラを起動」を押し、権限を許可してコードに向けてください。",
        "結果カードで解読されたテキストを確認します。",
        "コピーするか、リンクらしき内容ならそのまま開けます。",
      ],
      faqs: [
        {
          q: "画像やカメラ映像は端末の外に出ますか?",
          a: "出ません。デコードはこのページ上で jsqr ライブラリが JavaScript で実行します。アップロード画像はローカルのピクセルから読み、カメラのフレームはメモリ内のキャンバスに描いて解析します。アップロード・記録・保存は一切なく、コードが見つかるか停止を押すとすぐにカメラを止めます。",
        },
        {
          q: "カメラが起動しない場合は?",
          a: "多くはブラウザがこのサイトのカメラ権限をブロックしているケースです。アドレスバーから許可して再度お試しください。ライブ読み取りには安全な https ページも必要です。デバイスにカメラがない場合は、黙って失敗するのではなく明確に表示します。",
        },
        {
          q: "どんな QR の内容を読み取れますか?",
          a: "標準的な QR コードなら何でも:URL、テキスト、電話番号、Wi-Fi 接続文字列、vCard、UPI や PIX の支払い文字列など。ツールはデコードされた生の内容を表示します。Wi-Fi や支払い用のコードは、その形式を受け付けるアプリにテキストを貼り付けてご利用ください。",
        },
      ],
      deepDive: [
        {
          heading: "カメラ権限:なぜブラウザが尋ね、何を意味するのか",
          paragraphs: [
            "カメラモードの裏にある getUserMedia API は、ページではなくブラウザが強制する二つの関門で守られています。第一は権限の確認です。サイトは要求できるだけで、許可するか拒むかは利用者が決め、拒否は記憶されてアドレスバーのアイコンから後で変更できます。第二はセキュアコンテキストの規則で、カメラへのアクセスは https ページでのみ許されます。このツールの非セキュアな複製は尋ねることすらできません。",
            "権限が与えていないものも同じくらい重要です。バックグラウンドでのアクセスはありません。ビデオストリームが生きている間だけページはフレームを読め、ブラウザはカメラ使用中をインジケータで明示し、ストリームを止めれば(本ツールはデコード成功時に自動で止めます)すべてのアクセスが終わります。背景で黙ってフレームを取得することは不可能です。",
            "だから失敗の原因がこれほど具体的に決まっています。カメラが起動しないのは、ほぼ常に拒否された権限、https コンテキストの欠落、デバイスにカメラが実在しないことの三つのどれかです。本ツールは汎用エラーではなくこれらを区別して表示します。対処がそれぞれ違うからです。",
          ],
        },
        {
          heading: "QR のデコードはどうやってコードを見つけるか",
          paragraphs: [
            "QR シンボルは三つの大きなファインダーパターンで自分を固定します。左上・右上・左下の角にある正方形です。デコーダーはピクセルグリッドからこの形状を正確に探し、その位置でシンボルの回転と透視を確定してから、データモジュールを読み、誤り訂正をかけます。斜めから撮ったコードでも読める理由はここにあり、ファインダーパターンが幾何情報を供給します。",
            "成否は他の何よりも画質で決まります。典型例は、ファインダーパターンに映り込む反射、縮小後にコードが占めるピクセルが少なすぎること、モジュールと背景のコントラスト不足です。より鋭い写真、寄り気のクロップ、まっすぐな角度で、誤読の大半は解決します。デコードは確率的ではなく決定論的です。",
            "ペイロードを生テキストで示すのは意図的です。QR は Wi-Fi の接続文字列や vCard、支払い形式を符号化できますが、コード自体はその型を宣言しません。生の文字列を先に見せることで、アプリに渡す前にコードの中身を確認できます。ポスターや荷札のリンクを開く前に点検する、ということのすべてです。",
          ],
        },
        {
          heading: "信じる前にコードを点検する",
          paragraphs: [
            "スマホのカメラアプリは QR のリンクをますます直接開くようになりました。便利ですが、悪意あるステッカー攻撃が依拠するのはまさにこの挙動です。QR コードは認証されていないデータであり、誰でもどこへでも指すコードを印刷できます。先にデコードテキストを読む(本ツールは開くボタンを出す前にこれをします)ことで、「見る」と「従う」の間に意図的な間を挟みます。",
            "実務の習慣:URL のドメインがその場の文脈と一致するか(駐車計器、レストランのメニュー)、行き先を隠す短縮 URL を疑い、検証されていないコードから辿ったページに認証情報を入力しない。支払いコードは表示名ではなく收款文字列を一文字ずつ確認します。",
            "プライバシーは両方の経路で保たれます。画像デコードはドロップしたファイルのローカルピクセルだけを読み、カメラのフレームはメモリ上で解析した後破棄します。アップロード・記録・保存は一切なく、点検は完全に端末の上に留まります。",
          ],
        },
      ],
    },
    es: {
      name: "Escáner de códigos QR",
      tagline:
        "Decodifique un código QR desde cualquier imagen o directamente con su cámara — todo se lee localmente en su navegador, con copia y enlace, sin subidas.",
      intro: [
        "Suelte una captura o foto de un código QR y el decodificador lo lee en la propia página, resaltando las esquinas detectadas sobre la imagen. Si es una URL obtiene un botón de copia y un enlace de apertura directa; cualquier otro contenido —credenciales WiFi, vCards, texto plano— sale exactamente como está codificado, listo para copiar.",
        "¿Prefiere apuntar con la cámara? El modo en vivo envía la señal a un elemento de vídeo local y analiza fotogramas en memoria hasta que uno se decodifica; entonces detiene la cámara de inmediato. Como ambas vías funcionan por completo en su navegador, la imagen o la cámara nunca se suben a ningún servidor y no se graba nada.",
      ],
      steps: [
        "Elija la pestaña «Desde una imagen» y suelte la foto del código, o cambie a «Cámara en vivo».",
        "Con la cámara, pulse Iniciar cámara, permita el acceso y apunte al código.",
        "Lea el texto decodificado en la tarjeta de resultado.",
        "Cópielo o ábralo directamente si parece un enlace.",
      ],
      faqs: [
        {
          q: "¿Mis imágenes o los fotogramas de la cámara salen de mi dispositivo?",
          a: "No. La decodificación se ejecuta en esta página con la librería jsqr, en JavaScript: las imágenes subidas se leen de sus píxeles locales y los fotogramas de la cámara se dibujan en un lienzo en memoria y se analizan allí. Nada se sube, registra o almacena, y la cámara se detiene en cuanto se encuentra un código o usted pulsa detener.",
        },
        {
          q: "La cámara no arranca, ¿qué ocurre?",
          a: "Normalmente el navegador bloqueó el permiso de cámara para este sitio; permítalo en la barra de direcciones y vuelva a pulsar iniciar. El escaneo en vivo también exige una página https segura, y si el dispositivo no tiene cámara, la herramienta se lo indica en lugar de fallar en silencio.",
        },
        {
          q: "¿Qué tipo de contenido QR puede leer?",
          a: "Cualquier código QR estándar: URLs, texto plano, números de teléfono, cadenas de conexión WiFi, contactos vCard, cadenas de pago UPI o PIX y más. La herramienta muestra el contenido decodificado en bruto; para códigos WiFi o de pago, copie el texto en la aplicación que consuma ese formato.",
        },
      ],
      deepDive: [
        {
          heading: "Permisos de cámara: por qué pregunta el navegador y qué significa",
          paragraphs: [
            "La API getUserMedia detrás del modo de cámara está protegida por dos puertas que impone el navegador, no la página. La primera es el aviso de permiso: el sitio solo puede solicitar, y usted decide conceder o negar; una negativa se recuerda y se cambia desde el icono de la barra de direcciones. La segunda es la regla de contexto seguro: el acceso a cámara solo se permite en páginas https, así que una réplica no segura de esta herramienta ni siquiera podría preguntar.",
            "Lo que el permiso no concede es igual de importante: no hay acceso en segundo plano. Una página solo puede leer fotogramas mientras el flujo de vídeo está vivo, los navegadores indican de forma visible la cámara activa, y detener el flujo — lo que esta herramienta hace automáticamente al decodificar — termina todo el acceso. Ningún fotograma puede capturarse en silencio al fondo.",
            "Por eso el modo de fallo es tan concreto: una cámara que no arranca casi siempre es un permiso bloqueado, un problema de contexto https o que el dispositivo realmente no tiene cámara. La herramienta distingue estos casos en lugar de mostrar un error genérico, porque cada uno tiene arreglo distinto.",
          ],
        },
        {
          heading: "Cómo encuentra realmente el código la decodificación QR",
          paragraphs: [
            "Un símbolo QR se ancla con tres patrones de localización grandes: los cuadrados de la esquina superior izquierda, superior derecha e inferior izquierda. El decodificador busca exactamente esas formas en la rejilla de píxeles, usa sus posiciones para fijar la rotación y perspectiva del símbolo y solo entonces lee los módulos de datos y aplica la corrección de errores. Por eso un código fotografiado en ángulo puede decodificarse igual: los patrones aportan la geometría.",
            "La calidad de la imagen decide el resultado más que cualquier otra cosa. Los fallos clásicos son el reflejo sobre un patrón de localización, un código que ocupa demasiado pocos píxeles tras la reducción y el bajo contraste entre módulos y fondo. Una foto más nítida, un recorte más cercano o un ángulo más recto arreglan la mayoría de lecturas erróneas — la decodificación es determinista, no probabilística.",
            "La carga decodificada se muestra como texto en bruto a propósito. Los códigos QR pueden llevar cadenas de WiFi, vCards y formatos de pago, pero el propio código no anuncia su tipo; mostrar la cadena cruda permite verificar qué contiene un código antes de que cualquier app la consuma — que es justo el punto de inspeccionar un código de un póster o un paquete antes de abrir su enlace.",
          ],
        },
        {
          heading: "Inspeccionar antes de confiar",
          paragraphs: [
            "Las apps de cámara de los teléfonos abren cada vez más enseguida los enlaces de un QR, algo cómodo y que es justo de lo que depende la estafa de la pegatina maliciosa. Un código QR es dato sin autenticar: cualquiera puede imprimir uno que apunte donde quiera. Leer primero el texto decodificado — como hace esta herramienta antes de ofrecer el botón de abrir — mete una pausa deliberada entre ver un código y actuar según él.",
            "Los hábitos prácticos: compruebe que el dominio de la URL coincide con lo que el contexto promete (un parquímetro, la carta de un restaurante), sospeche de acortadores que ocultan el destino y nunca introduzca credenciales en una página a la que llegó desde un código no verificado. En códigos de pago, verifique la cadena del beneficiario carácter a carácter, sin fiarse de la etiqueta.",
            "La privacidad se sostiene en ambas vías: la decodificación de imagen solo lee los píxeles locales del archivo soltado, y los fotogramas de cámara se analizan en memoria y se descartan. Nada se sube, registra o almacena — la inspección se queda por completo en su dispositivo.",
          ],
        },
      ],
    },
    pt: {
      name: "Leitor de QR Code",
      tagline:
        "Decodifique um QR code de qualquer imagem ou direto da câmera — lido localmente no navegador, com cópia e abrir-como-link, e nada é enviado.",
      intro: [
        "Solte uma captura ou foto de um QR code e o leitor decodifica na própria página, destacando os cantos detectados sobre a imagem. Se for uma URL você recebe botão de copiar e abrir-link com um clique; qualquer outro conteúdo — credenciais de Wi-Fi, vCards, texto puro — sai exatamente como foi codificado, pronto para copiar.",
        "Prefere apontar a câmera para o código? O modo ao vivo envia a imagem para um elemento de vídeo local e analisa quadros na memória até um deles ser decodificado; aí a câmera desliga na hora. Como os dois caminhos rodam inteiramente no navegador, a imagem ou o vídeo nunca vão para servidor algum e nada é gravado.",
      ],
      steps: [
        "Escolha a aba “De uma imagem” e solte a foto do QR code, ou mude para “Câmera ao vivo”.",
        "Na câmera, aperte Iniciar câmera, permita o acesso e aponte para o código.",
        "Leia o texto decodificado no cartão de resultado.",
        "Copie, ou abra direto se parecer um link.",
      ],
      faqs: [
        {
          q: "Minhas imagens ou os quadros da câmera saem do meu aparelho?",
          a: "Não. A decodificação roda nesta página com a biblioteca jsqr, em JavaScript: imagens enviadas são lidas dos pixels locais e os quadros da câmera são desenhados num canvas em memória e analisados ali. Nada é enviado, registrado ou armazenado, e a câmera para assim que um código é encontrado ou você aperta parar.",
        },
        {
          q: "A câmera não inicia — o que está errado?",
          a: "Na maioria das vezes o navegador bloqueou a permissão de câmera para este site; permita na barra de endereço e aperte iniciar de novo. A leitura ao vivo também exige uma página https segura, e se o aparelho não tem câmera alguma, a ferramenta avisa em vez de falhar em silêncio.",
        },
        {
          q: "Que tipos de conteúdo QR ele lê?",
          a: "Qualquer QR code padrão: URLs, texto puro, números de telefone, strings de conexão Wi-Fi, contatos vCard, strings de pagamento UPI ou PIX e mais. A ferramenta mostra o conteúdo decodificado em bruto — para códigos de Wi-Fi ou pagamento, copie o texto no app que consome esse formato.",
        },
      ],
      deepDive: [
        {
          heading: "Permissões de câmera: por que o navegador pede e o que isso significa",
          paragraphs: [
            "A API getUserMedia por trás do modo câmera é protegida por duas barreiras que o navegador impõe, não a página. A primeira é o pedido de permissão: o site só pode solicitar, e você decide conceder ou negar; uma negativa fica lembrada e pode ser mudada pelo ícone da barra de endereço. A segunda é a regra de contexto seguro: acesso à câmera só é permitido em páginas https, então uma réplica não segura desta ferramenta nem conseguiria perguntar.",
            "O que a permissão não concede é igualmente importante: não existe acesso em segundo plano. Uma página só pode ler quadros enquanto o fluxo de vídeo está vivo, os navegadores indicam de forma visível a câmera ativa, e parar o fluxo — o que esta ferramenta faz automaticamente ao decodificar — encerra todo o acesso. Nenhum quadro pode ser capturado em silêncio ao fundo.",
            "É por isso que o modo de falha é tão específico: uma câmera que não inicia quase sempre é permissão bloqueada, problema de contexto https ou realmente ausência de câmera no aparelho. A ferramenta distingue esses casos em vez de mostrar um erro genérico, porque cada um tem um conserto diferente.",
          ],
        },
        {
          heading: "Como a decodificação QR realmente encontra o código",
          paragraphs: [
            "Um símbolo QR se ancora em três padrões de localização grandes: os quadrados nos cantos superior esquerdo, superior direito e inferior esquerdo. O leitor procura exatamente essas formas na grade de pixels, usa suas posições para fixar a rotação e a perspectiva do símbolo e só então lê os módulos de dados e aplica a correção de erros. Por isso um código fotografado em ângulo ainda decodifica: os padrões fornecem a geometria.",
            "A qualidade da imagem decide o resultado mais que qualquer outra coisa. As falhas clássicas são reflexo sobre um padrão de localização, um código que ocupa poucos pixels demais depois da redução e o baixo contraste entre módulos e fundo. Uma foto mais nítida, um recorte mais próximo ou um ângulo mais reto consertam a maioria das leituras erradas — a decodificação é determinística, não probabilística.",
            "O conteúdo decodificado é mostrado como texto em bruto de propósito. QR codes podem carregar strings de Wi-Fi, vCards e formatos de pagamento, mas o próprio código não anuncia seu tipo; mostrar a string cruda permite verificar o que um código contém antes que qualquer app a consuma — que é exatamente o ponto de inspecionar um código de um cartaz ou pacote antes de abrir seu link.",
          ],
        },
        {
          heading: "Inspecionar antes de confiar",
          paragraphs: [
            "Os apps de câmera dos celulares abrem cada vez mais na hora os links de um QR, algo conveniente e que é justamente do que depende o golpe do adesivo malicioso. Um QR code é dado sem autenticação: qualquer um pode imprimir um apontando para qualquer lugar. Ler antes o texto decodificado — como esta ferramenta faz antes de oferecer o botão abrir — insere uma pausa deliberada entre ver um código e agir por causa dele.",
            "Os hábitos práticos: confira se o domínio da URL bate com o que o contexto promete (um parquímetro, o menu do restaurante), desconfie de encurtadores que escondem o destino e nunca digite credenciais numa página que você chegou por um código não verificado. Em códigos de pagamento, verifique a string do beneficiário caractere a caractere, sem confiar no rótulo.",
            "A privacidade se mantém nos dois caminhos: a decodificação de imagem só lê os pixels locais do arquivo solto, e os quadros da câmera são analisados na memória e descartados. Nada é enviado, registrado ou armazenado — a inspeção fica por inteiro no seu aparelho.",
          ],
        },
      ],
    },
  },
});
