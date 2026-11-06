import { ImageScreenshotEngine } from "../_engines/image-engine-screenshot";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "screenshot-tool",
  category: "image",
  icon: "download",
  engine: { component: ImageScreenshotEngine },
  related: ["crop-image", "image-compressor", "svg-converter", "exif-remover", "image-border", "image-splitter", "compress-image-to-size", "grayscale-image", "crop-circle-image", "heic-to-jpg"],
  copy: {
    en: {
      name: "Screenshot Tool",
      tagline:
        "Capture a single frame of your screen, crop it precisely and save it as a PNG — one authorized snapshot, nothing recorded or uploaded.",
      intro: [
        "Click capture, pick a screen, window or tab in your browser's own share dialog, and the tool grabs exactly one still frame. The share ends immediately — there is no recording, no session, and nothing leaves your device. What you get is a normal PNG ready to save.",
        "Need only part of the capture? Toggle the crop mode and drag a precise selection before saving, powered by the same pixel-accurate crop widget as our crop tool. Perfect for bug reports, quick documentation and receipts.",
      
        "Capture uses the browser's getDisplayMedia API — the same screen-share dialog video calls use — so the OS-level permission prompt is the security boundary, not the tool. One frame is grabbed from the video stream, the stream is closed immediately, and the result is a standard PNG at whatever resolution your display provided.",
        "Compared with OS screenshot hotkeys, the built-in crop step means no second app: grab, drag the region, save. And unlike browser extensions that request permanent screen access, the share dialog re-asks every time, so there is no standing permission to abuse — the capture happens once and is done.",
      ],
      steps: [
        "Click “Choose screen & capture” and grant permission in the browser dialog.",
        "Pick the screen, window or tab you want; one frame is captured instantly and sharing stops.",
        "Optionally crop the frame, then save the PNG to your downloads.",
      ],
      faqs: [
        {
          q: "Is my screen being recorded?",
          a: "No. The tool requests a one-frame capture through your browser's standard screen-share permission. The stream is stopped the instant the frame is saved in memory, so nothing continues running and nothing is uploaded anywhere.",
        },
        {
          q: "Why does my browser ask for permission?",
          a: "Screen capture is a powerful capability, so browsers always require an explicit user choice through their native dialog. You pick exactly which screen, window or tab to share — the tool never sees anything you did not select.",
        },
        {
          q: "Does it work on phones or tablets?",
          a: "No. Browsers on iOS and Android do not offer screen capture to web pages, so the tool explains that it is unavailable there. On desktop, Chrome, Edge, Firefox and Safari all support it.",
        },
      ],
      deepDive: [
        {
          heading: "Capture to clipboard, then dress it up",
          paragraphs: [
            "A screen capture is rarely the final asset: it needs a frame, rounded corners, a color or size adjustment before it fits into a slide, a bug report or a social post. Capturing directly into the editing view collapses two steps into one — grab the region, adjust, download — instead of jumping between an OS shortcut, an editor and a file manager.",
            "Frames are the single most valuable dressing for screenshots: a thin border in a neutral color separates the image from whatever background it lands on, especially on pages with the same white background as the screenshot itself. Without a border, a white-background screenshot simply dissolves into the page.",
            "Annotations fade quickly in memory, so the workflow habit that pays off is capturing, dressing and saving immediately — screenshots left as raw clipboard data tend to lose context, and re-capturing a transient UI state (a dropdown open, a tooltip visible) may be impossible minutes later.",
          ],
        },
        {
          heading: "Why screenshots deserve lossless PNG",
          paragraphs: [
            "Screenshots are the poster child for PNG over JPG: they contain flat fills, hard edges and text — exactly the content JPEG compression damages with ringing halos around letters and banding in flat gradients. A JPG screenshot looks subtly dirty; a PNG one is pixel-identical to what was on screen.",
            "The one place JPG wins is screenshots of photographs: a photo displayed on screen contains natural image detail that compresses fine. For everything else — windows, terminals, documents, UI elements — the size premium of PNG buys visible cleanliness.",
            "If file size matters (some forms limit screenshots to a few hundred KB), the honest lever is the capture region: crop tightly before reaching for quality settings. A tightly cropped PNG of the relevant window is both smaller and more useful than a full-screen JPG.",
          ],
        },
        {
          heading: "What stays on your device",
          paragraphs: [
            "Screenshots frequently show private context: internal dashboards, personal messages, file names, browser tabs, client data. Uploading a screenshot to a capture service sends all of that context to a stranger's server — a risk entirely avoided when capture and editing happen locally.",
            "This tool captures and processes within your browser: the pixels come from your screen session, the dressing steps run on your device, and the file is written straight to your disk. Nothing is transmitted at any point.",
            "One privacy habit worth adopting: before saving any screenshot for sharing, scan the edges of the capture for unintended context — a second monitor, a notification, an address bar. It is easier to re-capture a clean frame than to undo a leak.",
          ],
        },
      ],
    },
    zh: {
      name: "屏幕截图工具",
      tagline: "经浏览器授权截取屏幕单帧画面,可精确裁剪后存为 PNG——只抓一帧、即刻断开,不录制、不上传。",
      intro: [
        "点击截取,在浏览器自带的共享弹窗里选择屏幕、窗口或标签页,工具只抓取一帧静止画面,共享立即结束——没有录制、没有会话,任何数据都不离开设备,得到的就是一张可直接保存的 PNG。",
        "只需要画面的一部分?打开裁剪开关,保存前拖出精确选区即可,裁剪组件与我们的裁剪工具同源、同样支持像素级微调。写 Bug 报告、快速留档、保存凭证都很好用。",
      ],
      steps: [
        "点击“选择屏幕并截取”,在浏览器弹窗中授予许可。",
        "选择要共享的屏幕、窗口或标签页;工具立即抓取一帧并结束共享。",
        "可选:裁剪画面,然后把 PNG 保存到下载目录。",
      ],
      faqs: [
        {
          q: "我的屏幕会被录制吗?",
          a: "不会。工具通过浏览器标准的屏幕共享权限只请求一帧画面,该帧存入内存后数据流立即停止,不会有任何进程继续运行,也不会向任何地方上传。",
        },
        {
          q: "为什么浏览器要请求权限?",
          a: "屏幕捕捉是高敏感能力,浏览器一律要求用户在原生弹窗中明确选择。你共享哪块屏幕、哪个窗口或标签页完全由你决定,工具看不到你没有选择的内容。",
        },
        {
          q: "手机或平板上能用吗?",
          a: "不能。iOS 和 Android 的浏览器不向网页提供屏幕捕捉能力,工具会提示当前环境不可用。桌面端 Chrome、Edge、Firefox 和 Safari 均可使用。",
        },
      ],
      deepDive: [
        {
          heading: "先截到编辑区,再给它穿衣打扮",
          paragraphs: [
            "屏幕截图很少直接就是成品:要放进幻灯片、Bug 报告或社交帖子之前,通常需要边框、圆角、调色或调尺寸。直接截进编辑视图,等于把两步合并成一步——框选区域、调整、下载——而不用在系统快捷键、编辑器和文件管理器之间来回跳。",
            "边框是截图最有价值的装饰:一圈中性色细边框能把图片和落点背景分开——尤其是页面背景和截图同为白色时。没有边框的白底截图,会直接“溶”进页面里。",
            "注解很快会被遗忘,所以真正划算的工作流习惯是:截完立刻打扮、立刻保存——留在剪贴板里的原始截图容易丢失上下文,而稍纵即逝的界面状态(下拉框展开、工具提示可见)过几分钟可能就再也截不到了。",
          ],
        },
        {
          heading: "为什么截图理应用无损 PNG",
          paragraphs: [
            "截图是“PNG 优于 JPG”的教科书案例:截图里全是平涂色、硬边缘和文字——恰恰是 JPEG 压缩最擅长破坏的内容,字母周围出现振铃光晕、平色渐变出现色带。JPG 截图看着总有点脏;PNG 截图与屏幕显示逐像素一致。",
            "JPG 唯一占优的情形是屏幕上的照片截图:照片本身是自然图像细节,压缩得很好。其余一切——窗口、终端、文档、界面元素——PNG 的体积溢价买来的是看得见的干净。",
            "如果体积确实重要(有些表单把截图限制在几百 KB),诚实的杠杆是截取范围:先收紧裁剪,再去碰质量设置。一张裁得紧凑的相关窗口 PNG,比全屏 JPG 既小又更有用。",
          ],
        },
        {
          heading: "哪些东西留在你的设备上",
          paragraphs: [
            "截图经常带着私密上下文:内部后台、个人消息、文件名、浏览器标签、客户数据。把截图上传给截图服务,等于把这一切上下文送到陌生人的服务器——而本地完成截取和编辑,可以把这个风险整个避开。",
            "本工具在浏览器内完成截取和处理:像素来自你的屏幕会话,装饰步骤在你的设备上运行,文件直接写进你的磁盘。任何时刻都没有数据外传。",
            "一个值得养成的隐私习惯:保存任何要分享的截图前,扫一遍画面边缘有没有意外入镜的上下文——第二块显示器、一条通知、地址栏。重新截一张干净的图,总比事后追回泄露容易。",
          ],
        },
      ],
    },
    ja: {
      name: "スクリーンショットツール",
      tagline:
        "ブラウザの許可を得て画面の 1 フレームを取得し、精密に切り抜いて PNG 保存。録画は一切なし、アップロードもなし、1 枚だけの取得です。",
      intro: [
        "キャプチャをクリックし、ブラウザ純正の共有ダイアログで画面・ウィンドウ・タブを選ぶと、ツールは静止画 1 枚だけを取得します。共有は即座に終了——録画もセッションもなく、何も端末の外へ出ません。手に入るのは普通に保存できる PNG です。",
        "画面の一部だけで十分なら、保存前に切り抜きモードで正確な範囲をドラッグできます。切り抜きは当サイトの切り抜きツールと同じピクセル単位ウィジェットを使用。バグ報告・簡単な資料・領収書の保存に最適です。",
      ],
      steps: [
        "「画面を選んでキャプチャ」をクリックし、ブラウザのダイアログで許可します。",
        "共有したい画面・ウィンドウ・タブを選ぶと、1 フレームを即取得して共有を終了します。",
        "必要なら切り抜いてから、PNG をダウンロードに保存します。",
      ],
      faqs: [
        {
          q: "画面は録画されますか?",
          a: "されません。ツールはブラウザ標準の画面共有許可を通じて 1 フレームのみを要求し、フレームをメモリに保存した瞬間にストリームを停止します。処理が継続することも、どこかへアップロードすることもありません。",
        },
        {
          q: "なぜブラウザが許可を求めてくるのですか?",
          a: "画面キャプチャは強力な機能のため、ブラウザは必ずネイティブ ダイアログでの明示的な選択を求めます。どの画面・ウィンドウ・タブを共有するかは完全にユーザーが決め、選択していないものはツールから見えません。",
        },
        {
          q: "スマホやタブレットでも使えますか?",
          a: "使えません。iOS と Android のブラウザは Web ページに画面キャプチャを提供しないため、利用不可と表示されます。デスクトップの Chrome・Edge・Firefox・Safari なら利用できます。",
        },
      ],
      deepDive: [
        {
          heading: "クリップボードへ取得し、そのまま整える",
          paragraphs: [
            "画面キャプチャはめったに最終資産になりません:スライド、バグ報告、SNS 投稿に収める前に、フレーム・角丸・色やサイズの調整が要るのが普通です。編集ビューに直接取得すれば2工程が1つに——領域を取り、調整し、ダウンロード——OS ショートカット、エディタ、ファイラーの間を往復する必要がなくなります。",
            "フレームはスクリーンショットにとって最も価値のある飾りです:中性色の細い枠は、画像を貼り付け先の背景から切り分けます——特にページ背景とスクショの背景が同じ白の場合。枠のない白背景スクショは、そのままページに溶け込みます。",
            "注釈は記憶からすぐ消えるので、効くワークフロー習慣は「取得、整え、即保存」——クリップボードに置きっぱなしのスクショは文脈を失いがちで、一時的な UI 状態(開いたドロップダウン、見えているツールチップ)は数分後には二度と取得できないこともあります。",
          ],
        },
        {
          heading: "スクショにロスレス PNG がふさわしい理由",
          paragraphs: [
            "スクリーンショットは「PNG が JPG に勝る」の見本のような存在です:フラットな塗り、硬いエッジ、文字——まさに JPEG 圧縮が傷つける内容で、文字の周りにリンギング、フラットなグラデーションにバンディングが出ます。JPG のスクショはわずかに汚く見え、PNG のスクショは画面表示とピクセル単位で同一です。",
            "JPG が勝つ唯一の場面は画面上の写真のスクショです:写真自体は自然画像のディテールで、圧縮がよく効きます。それ以外すべて——ウィンドウ、ターミナル、文書、UI 要素——では、PNG のサイズ増分が見える清潔さを買っています。",
            "サイズが本当に重要な場合(数百 KB に制限するフォームもあります)、正直なレバーは取得範囲です:品質設定に手を伸ばす前にまずタイトにクロップする。関連ウィンドウだけのタイトな PNG は、フルスクリーンの JPG より小さく有用です。",
          ],
        },
        {
          heading: "端末に留まるもの",
          paragraphs: [
            "スクショにはしばしばプライベートな文脈が写ります:社内ダッシュボード、個人メッセージ、ファイル名、ブラウザタブ、クライアントデータ。キャプチャをスクショ系サービスにアップロードすることは、この文脈のすべてを他人のサーバーに送ることであり、取得と編集をローカルで行えば丸ごと回避できます。",
            "このツールはブラウザ内で取得・処理します:ピクセルはあなたの画面セッションから来て、飾りの工程は端末上で実行され、ファイルはディスクに直接書き込まれます。どの時点でも送信はありません。",
            "採用する価値のあるプライバシー習慣:共有するスクショを保存する前に、意図しない文脈——セカンドモニター、通知、アドレスバー——が端に写っていないか走査する。きれいなフレームを撮り直す方が、漏えいの後始末よりずっと簡単です。",
          ],
        },
      ],
    },
    es: {
      name: "Herramienta de captura de pantalla",
      tagline:
        "Captura un solo fotograma de tu pantalla, recórtalo con precisión y guárdalo como PNG — una instantánea autorizada, sin grabaciones ni subidas.",
      intro: [
        "Haz clic en capturar, elige una pantalla, ventana o pestaña en el diálogo de compartir del propio navegador, y la herramienta toma exactamente un fotograma fijo. La compartición termina al instante: no hay grabación, ni sesión, y nada sale de tu dispositivo. Lo que obtienes es un PNG normal listo para guardar.",
        "¿Solo necesitas una parte? Activa el modo recorte y arrastra una selección precisa antes de guardar, con el mismo widget de recorte al píxel de nuestra herramienta de recorte. Ideal para reportes de errores, documentación rápida y recibos.",
      ],
      steps: [
        "Pulsa “Elegir pantalla y capturar” y concede el permiso en el diálogo del navegador.",
        "Elige la pantalla, ventana o pestaña; se captura un fotograma al instante y la compartición se detiene.",
        "Opcionalmente recorta el fotograma y guarda el PNG en tus descargas.",
      ],
      faqs: [
        {
          q: "¿Se está grabando mi pantalla?",
          a: "No. La herramienta solicita una captura de un fotograma mediante el permiso estándar de compartir pantalla del navegador. El flujo se detiene en cuanto el fotograma queda en memoria: nada sigue ejecutándose y no se sube nada a ningún sitio.",
        },
        {
          q: "¿Por qué mi navegador pide permiso?",
          a: "La captura de pantalla es una capacidad sensible, así que los navegadores exigen siempre una elección explícita en su diálogo nativo. Tú decides exactamente qué pantalla, ventana o pestaña compartir: la herramienta nunca ve nada que no hayas seleccionado.",
        },
        {
          q: "¿Funciona en teléfonos o tabletas?",
          a: "No. Los navegadores de iOS y Android no ofrecen captura de pantalla a las páginas web, así que la herramienta indica que no está disponible allí. En escritorio, Chrome, Edge, Firefox y Safari la admiten.",
        },
      ],
      deepDive: [
        {
          heading: "Capturar al área de edición y vestirlo enseguida",
          paragraphs: [
            "Una captura de pantalla rara vez es el recurso final: antes de que encaje en una diapositiva, un reporte de error o una publicación social, suele necesitar marco, esquinas redondeadas, un ajuste de color o tamaño. Capturar directamente en la vista de edición fusiona dos pasos en uno — tomar la región, ajustar, descargar — sin saltar entre un atajo del sistema, un editor y un gestor de archivos.",
            "El marco es el aderezo más valioso para las capturas: un borde fino de color neutro separa la imagen del fondo donde aterriza, sobre todo en páginas con el mismo fondo blanco que la propia captura. Sin borde, una captura con fondo blanco simplemente se disuelve en la página.",
            "Las anotaciones se olvidan rápido, así que el hábito de flujo que compensa es capturar, vestir y guardar de inmediato — las capturas que se quedan como datos crudos del portapapeles pierden contexto, y recapturar un estado efímero de la interfaz (un desplegable abierto, un tooltip visible) puede ser imposible minutos después.",
          ],
        },
        {
          heading: "Por qué las capturas merecen PNG sin pérdida",
          paragraphs: [
            "Las capturas son el ejemplo de manual de PNG sobre JPG: contienen rellenos planos, bordes duros y texto — justo el contenido que la compresión JPEG daña con halos alrededor de las letras y bandas en los degradados planos. Una captura en JPG se ve sutilmente sucia; una en PNG es idéntica píxel a píxel a lo que había en pantalla.",
            "El único caso donde gana el JPG son capturas de fotografías en pantalla: una foto contiene detalle natural de imagen que comprime bien. Para todo lo demás — ventanas, terminales, documentos, elementos de interfaz — la prima de tamaño del PNG compra limpieza visible.",
            "Si el tamaño importa (algunos formularios limitan las capturas a unos cientos de KB), la palanca honesta es la región de captura: recorta ajustado antes de tocar los ajustes de calidad. Un PNG bien recortado de la ventana relevante es más pequeño y más útil que un JPG de pantalla completa.",
          ],
        },
        {
          heading: "Qué se queda en tu dispositivo",
          paragraphs: [
            "Las capturas suelen mostrar contexto privado: paneles internos, mensajes personales, nombres de archivo, pestañas del navegador, datos de clientes. Subir una captura a un servicio de capturas envía todo ese contexto al servidor de un desconocido — un riesgo que se evita por completo cuando la captura y la edición ocurren localmente.",
            "Esta herramienta captura y procesa dentro de tu navegador: los píxeles vienen de tu sesión de pantalla, los pasos de vestimenta corren en tu dispositivo y el archivo se escribe directamente en tu disco. No se transmite nada en ningún momento.",
            "Un hábito de privacidad que vale adoptar: antes de guardar cualquier captura para compartirla, revisa los bordes en busca de contexto no intencionado — un segundo monitor, una notificación, una barra de direcciones. Recapturar un fotograma limpio es más fácil que deshacer una fuga.",
          ],
        },
      ],
    },
    pt: {
      name: "Ferramenta de captura de tela",
      tagline:
        "Capture um único quadro da sua tela, recorte com precisão e salve como PNG — uma foto autorizada, sem gravação e sem envio.",
      intro: [
        "Clique em capturar, escolha uma tela, janela ou aba no diálogo de compartilhamento do próprio navegador, e a ferramenta pega exatamente um quadro estático. O compartilhamento termina imediatamente — não há gravação, não há sessão, e nada sai do seu dispositivo. O resultado é um PNG comum pronto para salvar.",
        "Precisa de só uma parte da captura? Ative o modo de recorte e arraste uma seleção precisa antes de salvar, com o mesmo widget de recorte ao pixel da nossa ferramenta de recorte. Perfeito para relatórios de bugs, documentação rápida e comprovantes.",
      ],
      steps: [
        "Clique em “Escolher tela e capturar” e conceda a permissão no diálogo do navegador.",
        "Escolha a tela, janela ou aba; um quadro é capturado na hora e o compartilhamento para.",
        "Opcionalmente recorte o quadro e salve o PNG na pasta de downloads.",
      ],
      faqs: [
        {
          q: "Minha tela está sendo gravada?",
          a: "Não. A ferramenta pede uma captura de um quadro pela permissão padrão de compartilhamento de tela do navegador. O fluxo é interrompido no instante em que o quadro fica na memória: nada continua rodando e nada é enviado a lugar algum.",
        },
        {
          q: "Por que o navegador pede permissão?",
          a: "Captura de tela é um recurso poderoso, então os navegadores sempre exigem uma escolha explícita no diálogo nativo. Você decide exatamente qual tela, janela ou aba compartilhar — a ferramenta nunca vê o que você não selecionou.",
        },
        {
          q: "Funciona em celulares ou tablets?",
          a: "Não. Os navegadores de iOS e Android não oferecem captura de tela para páginas web, então a ferramenta avisa que não está disponível ali. No desktop, Chrome, Edge, Firefox e Safari suportam.",
        },
      ],
      deepDive: [
        {
          heading: "Capturar para a área de edição e arrumar logo em seguida",
          paragraphs: [
            "Uma captura de tela raramente é o recurso final: antes de caber num slide, num relatório de erro ou numa postagem social, normalmente precisa de moldura, cantos arredondados, um ajuste de cor ou tamanho. Capturar direto na vista de edição funde dois passos em um — pegar a região, ajustar, baixar — sem pular entre um atalho do sistema, um editor e um gerenciador de arquivos.",
            "A moldura é o enfeite mais valioso para capturas: uma borda fina de cor neutra separa a imagem do fundo onde ela aterrissa, sobretudo em páginas com o mesmo fundo branco da própria captura. Sem borda, uma captura com fundo branco simplesmente se dissolve na página.",
            "As anotações se apagam rápido da memória, então o hábito de fluxo que compensa é capturar, arrumar e salvar imediatamente — capturas deixadas como dados crus da área de transferência tendem a perder contexto, e recapturar um estado efêmero da interface (um dropdown aberto, um tooltip visível) pode ser impossível minutos depois.",
          ],
        },
        {
          heading: "Por que capturas merecem PNG sem perdas",
          paragraphs: [
            "Capturas são o exemplo de manual de PNG sobre JPG: contêm preenchimentos chapados, bordas duras e texto — exatamente o conteúdo que a compressão JPEG danifica com halos ao redor das letras e bandas em gradientes chapados. Uma captura em JPG parece sutilmente suja; uma em PNG é idêntica pixel a pixel ao que estava na tela.",
            "O único caso em que o JPG vence são capturas de fotografias na tela: uma foto contém detalhe natural de imagem que comprime bem. Para todo o resto — janelas, terminais, documentos, elementos de interface — o prêmio de tamanho do PNG compra limpeza visível.",
            "Se o tamanho importa (alguns formulários limitam capturas a algumas centenas de KB), a alavanca honesta é a região de captura: recorte apertado antes de mexer nas configurações de qualidade. Um PNG bem recortado da janela relevante é menor e mais útil que um JPG de tela cheia.",
          ],
        },
        {
          heading: "O que fica no seu dispositivo",
          paragraphs: [
            "Capturas frequentemente mostram contexto privado: painéis internos, mensagens pessoais, nomes de arquivo, abas do navegador, dados de clientes. Enviar uma captura a um serviço de capturas manda todo esse contexto para o servidor de um desconhecido — um risco totalmente evitado quando a captura e a edição acontecem localmente.",
            "Esta ferramenta captura e processa dentro do seu navegador: os pixels vêm da sua sessão de tela, os passos de enfeite rodam no seu dispositivo e o arquivo é gravado direto no seu disco. Nada é transmitido em nenhum momento.",
            "Um hábito de privacidade que vale adotar: antes de salvar qualquer captura para compartilhar, examine as bordas atrás de contexto não intencional — um segundo monitor, uma notificação, uma barra de endereço. Recapturar um quadro limpo é mais fácil que desfazer um vazamento.",
          ],
        },
      ],
    },
  },
});
