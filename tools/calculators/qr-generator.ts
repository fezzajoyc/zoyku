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
        "Error correction follows the QR standard's four levels — L (7%), M (15%), Q (25%) and H (30%) — where the percentage is the share of codewords recoverable from damage. Higher levels trade density for resilience: H suits stickers and apparel, while M or L keeps a URL scannable at small print sizes.",
        "Compared with pasting a screenshot of someone else's QR tool, output here is a clean vector SVG that prints at any size, plus a sized PNG for screens, generated entirely on your device. Dark-on-light coloring with an adequate quiet zone scans most reliably; always test a printed code with two different phones before a production run.",
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
      deepDive: [
        {
          heading: "Error-correction levels and the logo overlay trade",
          paragraphs: [
            "QR codes survive damage through Reed–Solomon error correction: the encoded data is augmented with redundancy codewords, and the scanner can reconstruct the message from whatever fraction survives. The standard defines four levels — L recovers 7% of codewords, M 15%, Q 25%, H 30% — and every extra percentage point of resilience costs symbol space, so the same URL at level H produces a denser grid than at level L.",
            "The logo overlay trick exploits exactly this budget: print a logo over the center of an H-level code and the damaged region falls inside the 30% that correction can rebuild. The same overlay on an M-level code frequently kills it. The rule of thumb: only cover the middle when the level is H, keep the covered area modest, and never obscure the three corner finder patterns — scanners locate the symbol by them, and no amount of error correction helps if the corners are gone.",
            "For ordinary screen use, higher levels are not free quality: the denser grid needs more pixels per module and scans worse at the same image size. Pick L or M for a URL on a website, step up to Q or H only when the physical medium is rough, small or partially occludable.",
          ],
        },
        {
          heading: "Static codes, tracking and what \"expires\" would even mean",
          paragraphs: [
            "A QR code is just a picture of data: the URL or text is encoded in the module pattern itself, and any phone decodes it directly with no server involved. That is why these codes never expire and why there is no tracking — there is no service behind the picture, so there is nothing to count scans or shut down. \"Dynamic\" QR services, by contrast, encode a short redirect URL and keep the mapping on their servers; when the subscription lapses, every printed code dies at once.",
            "Static is the right choice for anything carved into the physical world: restaurant menus, conference badges, equipment labels. Dynamic is justified only when you need to change the destination after printing or genuinely want scan analytics — and then you should weigh what you are signing up for.",
            "One caution cuts both ways: because nothing stands behind a static code, a malicious actor can print their own static code pointing at a hostile site and stick it over a legitimate one. Scanners show a raw URL for good reason; check where a code claims to go before opening it, and when you distribute codes, consider encoding the full domain visibly rather than a shortener.",
          ],
        },
        {
          heading: "Color, contrast and printing realities",
          paragraphs: [
            "Scanners read the contrast between modules and background, not the colors themselves. Dark modules on a light background with strong contrast is the reliable arrangement; inverted codes (light modules on dark) fail on many readers, and low-contrast pairs like light blue on white drop out entirely in ambient light. Keep the dark module color near black unless brand constraints demand otherwise, and always test with a real phone camera.",
            "The quiet zone — the empty border around the symbol — is part of the standard for a reason: scanners use it to find the symbol's edge. Cropping a QR flush to the edge of a flyer or overlaying it on a busy photograph removes the zone and degrades scanning even when every module is intact.",
            "For output format, SVG wins for print because it scales without jagged edges at any size; PNG at 768 px is ample for screens and small print. And the whole pipeline runs locally in your browser — the text you encode, whether a Wi-Fi password or an internal URL, is never uploaded anywhere.",
          ],
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
      deepDive: [
        {
          heading: "纠错级别与叠 logo 的取舍",
          paragraphs: [
            "二维码靠里德–所罗门纠错在受损后存活:编码数据会附加冗余码字,扫描器从幸存的部分重建原文。标准定义四个级别——L 恢复 7% 的码字,M 15%,Q 25%,H 30%——每多一分抗损能力就消耗一分符号空间,所以同一个网址在 H 级下生成的网格比 L 级更密。",
            "叠 logo 的技巧正是利用这份预算:在 H 级码的中心盖住一块,被破坏的区域落在 30% 可重建的范围里;同样的遮挡放到 M 级码上经常直接报废。经验规则:只有 H 级才敢盖中心,遮挡面积要克制,三个角的定位图案永远不要碰——扫描器靠它们找到符号,角没了,再多纠错也无济于事。",
            "对普通屏幕使用,更高级别并不是\"更高质量\":网格更密意味着每个模块需要更多像素,同等图尺寸下反而更难扫。网站上的网址选 L 或 M;只有承印物粗糙、尺寸小或会被部分遮挡时,才升级到 Q 或 H。",
          ],
        },
        {
          heading: "静态码、追踪,以及\"过期\"到底意味着什么",
          paragraphs: [
            "二维码本质上是数据的图片:网址或文本直接编码在模块图案里,任何手机都能独立解码,不需要服务器。这就是静态码永不过期、也无追踪的原因——图案背后没有任何服务,没有地方统计扫码量,也没有地方可被关停。相比之下,\"动态\"二维码服务编码的是一个短跳转网址,映射存在他们的服务器上;订阅一到期,所有印出去的码同时死亡。",
            "凡是刻进物理世界的东西,静态码都是正确选择:餐厅菜单、会议胸牌、设备标签。只有打印之后还要改目标地址、或确实需要扫码统计时,动态码才有理由——那时也要想清楚自己签下了什么。",
            "有一条双向成立的提醒:正因为静态码背后没有服务,恶意者可以印自己的静态码指向钓鱼网站,贴在合法码上面。扫描器显示原始网址是有道理的;打开之前先确认码声称去哪里。你自己分发二维码时,考虑编码完整可见的域名,而不是短链。",
          ],
        },
        {
          heading: "颜色、对比度与印刷现实",
          paragraphs: [
            "扫描器读的是模块与背景之间的对比度,不是颜色本身。深色模块配浅色背景、对比强烈,是最可靠的组合;反色码(浅色模块配深色背景)在很多读取器上失败,浅蓝配白底这类低对比组合在环境光下完全失效。除非品牌约束别无选择,深色模块尽量接近纯黑,并且永远用真实手机摄像头试扫。",
            "静区——符号四周的空白边——是标准的一部分,不是装饰:扫描器靠它定位符号边界。把二维码裁到传单边缘或压在花哨照片上,静区消失,即使每个模块都完好,扫描成功率也会下降。",
            "输出格式上,印刷选 SVG——任意尺寸无损缩放;768 像素的 PNG 对屏幕和小幅印刷绰绰有余。整条流水线在你的浏览器本地运行——你编码的内容,无论是 Wi-Fi 密码还是内部网址,都不会上传到任何地方。",
          ],
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
      deepDive: [
        {
          heading: "誤り訂正レベルとロゴ重ねのトレードオフ",
          paragraphs: [
            "QR コードはリード・ソロモン誤り訂正で損傷に耐えます。符号化データに冗長コードワードを付け加え、スキャナーは生き残った部分から元のメッセージを復元します。規格は 4 レベルを定めており、L はコードワードの 7%、M は 15%、Q は 25%、H は 30% を回復できます。耐性を 1 ポイント上げるごとにシンボル領域を消費するため、同じ URL でも H レベルの方が L より密なグリッドになります。",
            "ロゴを重ねる技法はまさにこの予算を利用します。H レベルのコードの中央にロゴを載せても、損傷領域は再構築可能な 30% の内側に収まります。同じ重ね方でも M レベルではしばしば致命傷になります。経験則:中央を覆ってよいのは H レベルのときだけ、覆う面積は控えめに、そして 3 つの角の位置合わせパターンは決して触らないこと。スキャナーはそれでシンボルを発見するため、角が消えたらどんな訂正も助けになりません。",
            "画面用途では、高いレベルは「高品質」ではありません。グリッドが密になるほど 1 モジュールに必要なピクセルが増え、同じ画像サイズではかえって読みにくくなります。ウェブ上の URL は L か M にし、物理媒体が粗い・小さい・一部隠れうる場合に限って Q や H へ上げてください。",
          ],
        },
        {
          heading: "静的コード、トラッキング、「期限切れ」の意味",
          paragraphs: [
            "QR コードは本質的にデータの絵です。URL やテキストはモジュールのパターンそのものに符号化され、どのスマホもサーバーなしで直接復号します。静的コードが期限切れにならず追跡もない理由はここにあります。絵の背後にサービスが存在しないので、読み取りを数える場所も、停止させられる場所もないのです。逆に「動的」QR サービスは短いリダイレクト URL を符号化し、対応表を自社サーバーに置きます。契約が切れると、印刷済みの全コードが同時に死にます。",
            "物理世界に刻むものには、静的が正解です。レストランのメニュー、カンファレンスのバッジ、機器のラベル。動的が正当化されるのは、印刷後に遷先を変えたい場合や、本当に読み取り分析が必要な場合だけです。そのときは何に署名したのかを理解してからにしてください。",
            "両方向に効く注意点が一つ。静的コードの背後に何もないということは、悪意ある者が敵対サイトへ向く静的コードを印刷し、正規のコードに貼れるという意味でもあります。スキャナーが素の URL を表示するのは理由のある設計です。開く前にどこへ行くのか確認し、自分が配布する側なら、短縮 URL ではなく完全なドメインを符号化することを検討してください。",
          ],
        },
        {
          heading: "色、コントラスト、印刷の現実",
          paragraphs: [
            "スキャナーが読むのはモジュールと背景のコントラストであって、色そのものではありません。信頼できるのは、明るい背景に濃いモジュール、強いコントラストです。反転コード(暗い背景に明るいモジュール)は多くのリーダーで失敗し、白地に淡い青のような低コントラストの組は環境光で完全に読めなくなります。ブランド制約がなければ濃色モジュールは黒に近づけ、必ず実機のカメラで試してください。",
            "クワイエットゾーン(シンボル周囲の空白)は規格の一部であり飾りではありません。スキャナーはここでシンボルの縁を見つけます。チラシの端ぎりぎりに配置したり、賑やかな写真に重ねたりすると、ゾーンが消えてモジュールが全て無事でも読み取り性能が落ちます。",
            "出力形式は、印刷なら SVG が勝ります。どのサイズでもギザギザなく拡縮できるためです。768 px の PNG は画面や小さな印刷には十分です。パイプライン全体がブラウザ内でローカルに動き、符号化する内容 — Wi-Fi パスワードでも社内 URL でも — はどこにもアップロードされません。",
          ],
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
      deepDive: [
        {
          heading: "Niveles de corrección y la apuesta del logo superpuesto",
          paragraphs: [
            "Los códigos QR sobreviven al daño mediante la corrección de errores Reed–Solomon: los datos van acompañados de código­words de redundancia y el lector reconstruye el mensaje a partir de la fracción que sobrevive. El estándar define cuatro niveles — L recupera el 7% de las palabras de código, M el 15%, Q el 25% y H el 30% — y cada punto extra de resiliencia consume espacio del símbolo, así que la misma URL a nivel H produce una cuadrícula más densa que a nivel L.",
            "El truco del logo superpuesto explota exactamente ese presupuesto: imprimir un logo sobre el centro de un código de nivel H daña una región que cae dentro del 30% reconstruible. La misma superposición sobre un código de nivel M suele matarlo. Regla práctica: cubra el centro solo con nivel H, mantenga el área cubierta discreta y nunca tape los tres patrones de localización de las esquinas — el lector localiza el símbolo por ellos, y ninguna corrección ayuda si las esquinas desaparecen.",
            "Para uso en pantalla, un nivel mayor no es calidad gratis: la cuadrícula más densa necesita más píxeles por módulo y se lee peor al mismo tamaño de imagen. Elija L o M para una URL en un sitio web y suba a Q o H solo cuando el medio físico sea áspero, pequeño o pueda quedar parcialmente tapado.",
          ],
        },
        {
          heading: "Códigos estáticos, rastreo y qué significaría «caducar»",
          paragraphs: [
            "Un código QR es solo la imagen de unos datos: la URL o el texto está codificado en el propio patrón de módulos y cualquier teléfono lo descodifica directamente sin servidor de por medio. Por eso estos códigos no caducan y no hay rastreo: no hay ningún servicio detrás de la imagen, así que no existe dónde contar lecturas ni qué apagar. Los servicios de QR «dinámico», en cambio, codifican una URL corta de redirección y guardan la correspondencia en sus servidores; cuando la suscripción vence, todos los códigos impresos mueren a la vez.",
            "Estático es la elección correcta para todo lo que queda grabado en el mundo físico: cartas de restaurante, credenciales de congresos, etiquetas de equipo. Dinámico se justifica solo cuando necesita cambiar el destino tras imprimir o de verdad quiere analítica de lecturas — y entonces conviene sopesar qué está firmando.",
            "Una advertencia que corta en ambos sentidos: precisamente porque nada respalda a un código estático, un actor malintencionado puede imprimir su propio código estático hacia un sitio hostil y pegarlo sobre uno legítimo. Los lectores muestran la URL cruda por una buena razón; compruebe adónde dice ir un código antes de abrirlo, y si usted distribuye códigos, considere codificar el dominio completo a la vista en lugar de un acortador.",
          ],
        },
        {
          heading: "Color, contraste y realidades de imprenta",
          paragraphs: [
            "Los lectores leen el contraste entre módulos y fondo, no los colores en sí. La disposición fiable es módulos oscuros sobre fondo claro con contraste alto; los códigos invertidos (módulos claros sobre oscuro) fallan en muchos lectores, y las parejas de bajo contraste como azul claro sobre blanco se pierden por completo con luz ambiente. Mantenga el color del módulo oscuro cerca del negro salvo que la marca lo prohíba, y pruebe siempre con la cámara de un teléfono real.",
            "La zona silenciosa — el borde vacío alrededor del símbolo — es parte del estándar, no decoración: los lectores la usan para hallar el borde del símbolo. Recortar un QR hasta el borde de un folleto o superponerlo sobre una foto cargada elimina la zona y degrada la lectura aunque todos los módulos estén intactos.",
            "En formato de salida, el SVG gana para impresión porque escala sin dientes de sierra a cualquier tamaño; el PNG a 768 px sobra para pantallas y estampados pequeños. Y toda la cadena corre localmente en su navegador — el texto que codifica, sea una contraseña Wi-Fi o una URL interna, nunca se sube a ningún sitio.",
          ],
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
      deepDive: [
        {
          heading: "Níveis de correção e a aposta do logo sobreposto",
          paragraphs: [
            "QR codes sobrevivem a danos pela correção de erros Reed–Solomon: os dados vêm acompanhados de códigos de redundância e o leitor reconstrói a mensagem a partir da fração que sobrevive. O padrão define quatro níveis — L recupera 7% das palavras de código, M 15%, Q 25% e H 30% — e cada ponto extra de resiliência consome espaço do símbolo, então a mesma URL no nível H produz uma grade mais densa que no nível L.",
            "O truque do logo sobreposto explora exatamente esse orçamento: imprimir um logo no centro de um código nível H danifica uma região que cai dentro dos 30% reconstruíveis. A mesma sobreposição num código nível M costuma matá-lo. Regra prática: cubra o centro apenas no nível H, mantenha a área coberta discreta e nunca tape os três padrões de localização dos cantos — o leitor localiza o símbolo por eles, e nenhuma correção ajuda se os cantos desaparecerem.",
            "Para uso em tela, nível maior não é qualidade de graça: a grade mais densa precisa de mais pixels por módulo e lê pior no mesmo tamanho de imagem. Escolha L ou M para uma URL num site e suba para Q ou H só quando o meio físico for áspero, pequeno ou puder ficar parcialmente tapado.",
          ],
        },
        {
          heading: "Códigos estáticos, rastreamento e o que \"expirar\" significaria",
          paragraphs: [
            "Um QR code é só a imagem de uns dados: a URL ou o texto está codificado no próprio padrão de módulos e qualquer celular o decodifica direto, sem servidor. Por isso esses códigos nunca expiram e não há rastreamento — não há serviço atrás da imagem, então não existe onde contar leituras nem o que desligar. Serviços de QR \"dinâmico\", em contraste, codificam uma URL curta de redirecionamento e guardam o mapeamento nos seus servidores; quando a assinatura vence, todos os códigos impressos morrem junto.",
            "Estático é a escolha certa para tudo que fica gravado no mundo físico: menus de restaurante, crachás de evento, etiquetas de equipamento. Dinâmico se justifica só quando você precisa mudar o destino depois de imprimir ou quer mesmo análise de leituras — e aí vale pesar no que está assinando.",
            "Um alerta que corta nos dois sentidos: justamente porque nada sustenta um código estático, um agente malicioso pode imprimir o próprio código estático apontando para um site hostil e colar sobre um legítimo. Os leitores mostram a URL crua por um bom motivo; confira para onde um código diz ir antes de abrir, e se você distribui códigos, considere codificar o domínio completo à vista em vez de um encurtador.",
          ],
        },
        {
          heading: "Cor, contraste e realidades de impressão",
          paragraphs: [
            "Os leitores leem o contraste entre módulos e fundo, não as cores em si. O arranjo confiável é módulos escuros sobre fundo claro com contraste alto; códigos invertidos (módulos claros sobre escuro) falham em muitos leitores, e pares de baixo contraste como azul claro sobre branco somem por completo na luz ambiente. Mantenha a cor do módulo escuro perto do preto salvo que a marca exija, e teste sempre com a câmera de um celular real.",
            "A zona silenciosa — a borda vazia em volta do símbolo — é parte do padrão, não decoração: os leitores a usam para achar a borda do símbolo. Cortar um QR rente à borda de um panfleto ou sobrepô-lo a uma foto cheia elimina a zona e degrada a leitura mesmo com todos os módulos intactos.",
            "No formato de saída, o SVG ganha para impressão porque escala sem serrilhado em qualquer tamanho; o PNG em 768 px sobra para telas e estampas pequenas. E toda a cadeia roda localmente no seu navegador — o texto que você codifica, seja uma senha de Wi-Fi ou uma URL interna, nunca é enviado a lugar algum.",
          ],
        },
      ],
    },
  },
});
