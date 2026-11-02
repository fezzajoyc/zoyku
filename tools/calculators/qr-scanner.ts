import { CalcEngineQrScan } from "../_engines/calc-engine-qrscan";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "qr-scanner",
  category: "utility",
  icon: "qr",
  engine: { component: CalcEngineQrScan },
  related: ["qr-generator", "barcode-generator", "url-decoder", "image-metadata-viewer"],
  copy: {
    en: {
      name: "QR Code Scanner",
      tagline:
        "Decode a QR code from any image or straight from your camera — read locally in your browser, with copy and open-as-link output and nothing uploaded.",
      intro: [
        "Drop in a screenshot or photo of a QR code and the decoder reads it right on the page, highlighting the detected corners over the image. If it is a URL you get a copy button plus a one-click open link; any other content — WiFi credentials, vCards, plain text — comes out exactly as encoded, ready to copy.",
        "Prefer pointing your camera at the code? The live mode streams to a local video element and analyzes frames in memory until one decodes, then stops the camera immediately. Because both paths run entirely in your browser, the image or camera feed is never uploaded to any server, and nothing is recorded.",
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
    },
  },
});
