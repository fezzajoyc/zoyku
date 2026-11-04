import { CalcEngineQr } from "../_engines/calc-engine-qr";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "qr-generator",
  category: "utility",
  icon: "qr",
  engine: { component: CalcEngineQr },
  related: ["barcode-generator", "color-picker", "color-converter", "uuid-generator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "QR Code Generator",
      tagline: "Turn any text or URL into a crisp QR code with adjustable size, colors and error-correction level — download as PNG or SVG.",
      intro: [
        "Paste a link, a Wi-Fi password, a phone number or any text and watch the QR code render live at up to 768 px. Choose an error-correction level from L (7%) to H (30%) so the code still scans when printed small or partially covered, and pick code and background colors to match your brand.",
        "Encoding runs entirely in your browser with the qrcode library — the image is generated on your device and never uploaded. Download a PNG for screens or a resolution-independent SVG for print.",
      ],
      steps: [
        "Type or paste the text or URL to encode.",
        "Adjust size, error-correction level and the two colors.",
        "Download the result as PNG (screens) or SVG (print, any size).",
      ],
      faqs: [
        {
          q: "Which error-correction level should I pick?",
          a: "M (15%) is the everyday default. Choose H (30%) for codes that will be printed on fabric, stickers or busy backgrounds, or when you plan to place a logo in the middle — the higher the level, the more damage a code survives.",
        },
        {
          q: "Do the QR codes expire or contain tracking?",
          a: "No. These are static codes: the encoded text lives in the pattern itself and works forever with no service behind it. No redirects, no scan counters, no analytics — the data is only what you typed.",
        },
        {
          q: "Is my text or URL uploaded anywhere?",
          a: "No. The qrcode library runs inside your browser and renders to a local canvas; neither the text nor the generated image ever leaves your device.",
        },
      ],
    },
    zh: {
      name: "二维码生成器",
      tagline: "把任意文本或网址变成清晰的二维码,尺寸、颜色、纠错级别可调,支持 PNG 和 SVG 下载,编码完全在浏览器本地完成。",
      intro: [
        "粘贴链接、Wi-Fi 密码、电话号码或任意文本,二维码即时渲染,最大 768 像素。纠错级别从 L(7%)到 H(30%)可选,即使印得小或被遮挡一部分也能扫出;码色与底色可自定义以匹配品牌。",
        "编码由浏览器内的 qrcode 库完成——图片在你的设备上生成,绝不上传。屏幕使用下载 PNG,印刷使用无损缩放的 SVG。",
      ],
      steps: [
        "输入或粘贴要编码的文本或网址。",
        "调整尺寸、纠错级别和两种颜色。",
        "下载 PNG(屏幕用)或 SVG(印刷用,任意尺寸)。",
      ],
      faqs: [
        {
          q: "纠错级别应该选哪个?",
          a: "日常使用选 M(15%)。如果二维码要印在布料、贴纸或花哨背景上,或打算在中间放 logo,选 H(30%)——级别越高,能承受的遮挡越强。",
        },
        {
          q: "二维码会过期或包含追踪吗?",
          a: "不会。这是静态二维码:内容直接编码在图案里,不依赖任何服务,永久可用。没有跳转、没有扫码统计、没有埋点——数据只有你输入的内容。",
        },
        {
          q: "我的文本或网址会被上传吗?",
          a: "不会。qrcode 库在浏览器里运行并渲染到本地画布;文本和生成的图片都不会离开你的设备。",
        },
      ],
    },
    ja: {
      name: "QR コード生成",
      tagline: "テキストや URL を鮮明な QR コードに。サイズ・色・誤り訂正レベルを調整でき、PNG と SVG でダウンロードできます。",
      intro: [
        "リンク、Wi-Fi パスワード、電話番号、任意のテキストを貼り付けると、最大 768 px で QR コードがリアルタイムに描画されます。誤り訂正レベルは L(7%)〜H(30%)から選べ、小さく印刷したり一部が隠れても読み取れ、コード色と背景色もブランドに合わせられます。",
        "エンコードはブラウザ内の qrcode ライブラリがすべて行い、画像は端末上で生成されアップロードされません。画面用には PNG、印刷用には拡大に強い SVG をダウンロードできます。",
      ],
      steps: [
        "エンコードするテキストか URL を入力・貼り付けします。",
        "サイズ・誤り訂正レベル・2 つの色を調整します。",
        "PNG(画面用)または SVG(印刷用・任意サイズ)でダウンロードします。",
      ],
      faqs: [
        {
          q: "誤り訂正レベルはどれを選べばいいですか?",
          a: "普段は M(15%)で十分です。布やステッカー、にぎやかな背景への印刷や、中央にロゴを置く予定があれば H(30%)を選びます。レベルが高いほど破損に強くなります。",
        },
        {
          q: "QR コードに期限やトラッキングはありますか?",
          a: "ありません。静的コードなので、内容はパターン自体に埋め込まれ、サービスを介さず永久に使えます。リダイレクトも読み取り回数の計測も解析もなく、データは入力したものだけです。",
        },
        {
          q: "入力したテキストや URL はアップロードされますか?",
          a: "いいえ。qrcode ライブラリはブラウザ内で動き、ローカルの canvas に描画します。テキストも生成画像も端末の外に出ることはありません。",
        },
      ],
    },
    es: {
      name: "Generador de códigos QR",
      tagline: "Convierta cualquier texto o URL en un código QR nítido con tamaño, colores y corrección de errores ajustables — descárguelo en PNG o SVG.",
      intro: [
        "Pegue un enlace, una contraseña Wi-Fi, un teléfono o cualquier texto y vea el QR renderizarse en vivo hasta 768 px. Elija la corrección de errores de L (7%) a H (30%) para que el código se lea aunque se imprima pequeño o quede parcialmente tapado, y combine colores de código y fondo con su marca.",
        "La codificación ocurre por completo en su navegador con la librería qrcode — la imagen se genera en su dispositivo y nunca se sube. Descargue PNG para pantallas o un SVG independiente de la resolución para imprimir.",
      ],
      steps: [
        "Escriba o pegue el texto o URL que desea codificar.",
        "Ajuste tamaño, nivel de corrección y los dos colores.",
        "Descargue en PNG (pantallas) o SVG (impresión, cualquier tamaño).",
      ],
      faqs: [
        {
          q: "¿Qué nivel de corrección de errores conviene?",
          a: "M (15%) es el valor diario. Elija H (30%) para códigos impresos en tela, pegatinas o fondos cargados, o si va a colocar un logotipo en el centro: cuanto mayor el nivel, más daño resiste el código.",
        },
        {
          q: "¿Los códigos caducan o incluyen rastreo?",
          a: "No. Son códigos estáticos: el texto vive dentro del propio patrón y funcionan para siempre sin ningún servicio detrás. Sin redirecciones, sin contadores de escaneo, sin analítica: los datos son solo lo que usted escribió.",
        },
        {
          q: "¿Se sube mi texto o URL a algún sitio?",
          a: "No. La librería qrcode se ejecuta dentro del navegador y dibuja en un canvas local; ni el texto ni la imagen generada salen de su dispositivo.",
        },
      ],
    },
    pt: {
      name: "Gerador de QR Code",
      tagline: "Transforme qualquer texto ou URL num QR code nítido com tamanho, cores e correção de erros ajustáveis — baixe em PNG ou SVG.",
      intro: [
        "Cole um link, uma senha de Wi-Fi, um telefone ou qualquer texto e veja o QR renderizar ao vivo em até 768 px. Escolha a correção de erros de L (7%) a H (30%) para o código continuar legível impresso pequeno ou parcialmente coberto, e combine as cores com a sua marca.",
        "A codificação acontece inteiramente no seu navegador com a biblioteca qrcode — a imagem é gerada no seu dispositivo e nunca enviada. Baixe PNG para telas ou um SVG independente de resolução para impressão.",
      ],
      steps: [
        "Digite ou cole o texto ou URL para codificar.",
        "Ajuste tamanho, nível de correção e as duas cores.",
        "Baixe em PNG (telas) ou SVG (impressão, qualquer tamanho).",
      ],
      faqs: [
        {
          q: "Qual nível de correção de erros escolher?",
          a: "M (15%) serve para o dia a dia. Escolha H (30%) para códigos impressos em tecido, adesivos ou fundos cheios, ou se pretende colocar um logotipo no meio — quanto maior o nível, mais dano o código suporta.",
        },
        {
          q: "Os QR codes expiram ou têm rastreamento?",
          a: "Não. São códigos estáticos: o texto vive no próprio padrão e funciona para sempre, sem nenhum serviço por trás. Sem redirecionamentos, sem contadores de leitura, sem análise — os dados são só o que você digitou.",
        },
        {
          q: "Meu texto ou URL é enviado para algum lugar?",
          a: "Não. A biblioteca qrcode roda dentro do navegador e desenha num canvas local; nem o texto nem a imagem gerada saem do seu dispositivo.",
        },
      ],
    },
  },
});
