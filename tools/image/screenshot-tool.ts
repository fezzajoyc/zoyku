import { ImageScreenshotEngine } from "../_engines/image-engine-screenshot";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "screenshot-tool",
  category: "image",
  icon: "download",
  engine: { component: ImageScreenshotEngine },
  related: ["crop-image", "image-compressor", "svg-converter", "exif-remover"],
  copy: {
    en: {
      name: "Screenshot Tool",
      tagline:
        "Capture a single frame of your screen, crop it precisely and save it as a PNG — one authorized snapshot, nothing recorded or uploaded.",
      intro: [
        "Click capture, pick a screen, window or tab in your browser's own share dialog, and the tool grabs exactly one still frame. The share ends immediately — there is no recording, no session, and nothing leaves your device. What you get is a normal PNG ready to save.",
        "Need only part of the capture? Toggle the crop mode and drag a precise selection before saving, powered by the same pixel-accurate crop widget as our crop tool. Perfect for bug reports, quick documentation and receipts.",
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
    },
  },
});
