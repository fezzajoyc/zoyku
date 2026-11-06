import { DevBase64ImageEngine } from "../_engines/dev-engine-base64-image";
import { defineTool } from "../_lib/types";

/** 1×1 PNG,解码页示例(编码页走文件拖放,不需要文本样例)。 */
const SAMPLE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

export default defineTool({
  slug: "base64-image",
  category: "developer",
  icon: "code",
  engine: { component: DevBase64ImageEngine, props: { sample: SAMPLE } },
  related: ["base64-encoder", "base64-decoder", "hash-generator", "url-encoder", "md5-generator", "sha256-generator", "json-validator", "json-formatter", "html-minifier", "url-decoder"],
  copy: {
    en: {
      name: "Base64 Image",
      tagline:
        "Convert images to base64 data URLs and back — preview, validate and download, with an exact size comparison. Everything runs in your browser.",
      intro: [
        "Drop in a PNG, JPEG, GIF, WebP or SVG and get a ready-to-paste data:image/…;base64,… URL for inline CSS, HTML or JSON payloads. The tool shows the original file size next to the resulting text size, so you can see the ~33% base64 overhead before you commit to inlining.",
        "Paste a data URL and the reverse view decodes it: the image is previewed, the declared MIME type is checked against the actual bytes, and a download button saves it back to a file. Invalid base64 or a non-image type fails with a clear message instead of a broken preview.",
      ],
      steps: [
        "Drop an image into the panel (or paste one from the clipboard) to encode it.",
        "Copy the data URL — or just the base64 payload — and check the size comparison before inlining.",
        "Switch to the decode tab, paste any image data URL, then preview or download it.",
      ],
      faqs: [
        {
          q: "When is it worth inlining an image as a data URL?",
          a: "For small icons, avatars and loading placeholders. Base64 makes text ~33% larger than the binary file, so below a couple of kilobytes you usually save an HTTP request overall; for photos the overhead almost always outweighs the benefit.",
        },
        {
          q: "Why is the base64 version bigger than my file?",
          a: "Base64 encodes every 3 bytes as 4 text characters — a fixed 33% inflation, plus the data:image/…;base64, prefix. Nothing is compressed or lost; it is simply a text-safe encoding of the same bytes.",
        },
        {
          q: "Which formats can the decoder handle?",
          a: "Anything your browser can render as an image: PNG, JPEG, GIF, WebP, SVG, BMP, AVIF and more. The tool verifies that the payload is valid base64, that the declared MIME is an image type, and warns you when the file's magic bytes don't match the declared type.",
        },
      ],
      deepDive: [
        {
          heading: "Why base64 inflates images by about 33%",
          paragraphs: [
            "Base64 packs every 3 bytes into 4 text characters, so the payload always ends up a third larger than the binary file — 4/3 is the fixed ratio, independent of format or content. Add the data:image/…;base64, prefix and any line wrapping a consumer applies, and the effective overhead creeps a bit higher. Nothing is compressed or discarded; the same bytes are simply re-expressed in a text-safe alphabet so they can travel inside CSS, HTML or JSON.",
            "That inflation is why the size comparison in this tool matters more than the conversion itself. The classic decision: inlining saves an HTTP request, but costs bandwidth and blocks caching. A 1 KB icon inlined in CSS is usually a win; a 100 KB photo as a data URL is almost never — it inflates the stylesheet by ~133 KB, gets re-downloaded with every page that references it, and cannot be cached independently. JPEG and WebP photos in particular compress binary data so efficiently that base64 text undoes much of the compression.",
            "A subtlety people miss: SVG is text already, so encoding an SVG to base64 often wastes space versus a URL-encoded or raw inline SVG. On the other hand, gzip compresses base64 text reasonably well, so when a server serves the payload compressed the effective transfer cost is closer to the original size than the raw +33% suggests.",
          ],
        },
        {
          heading: "Decoding safely: MIME types, magic bytes and trust",
          paragraphs: [
            "A data URL is self-describing on its face — data:image/png;base64, claims to be a PNG — but the claim is just a string. This decoder checks the actual bytes: PNG files start with a distinctive 8-byte signature, JPEG starts with FF D8, GIF with GIF8, and so on. When the declared MIME type and the magic bytes disagree, you get a warning rather than a silently broken image — useful when inspecting payloads from unknown sources or debugging why an <img> refuses to render.",
            "The decode also fails loudly on malformed input: invalid base64 characters, wrong padding, or a declared type that is not an image at all. That matters for security. A data: URL claiming to be text/html can execute script in some contexts, which is why browsers restrict data URLs in top-level navigation. Treating a pasted data URL as untrusted input — validating before rendering — is the safe default, and is exactly what this tool does for you.",
            "Note what the preview cannot tell you: whether the image is well-formed beyond the header bytes, or what it depicts. It renders in the browser, so anything your browser can display (PNG, JPEG, GIF, WebP, SVG, AVIF and more) works, and anything it cannot shows the same way it would in a page.",
          ],
        },
        {
          heading: "Local conversion as the privacy baseline",
          paragraphs: [
            "Images are exactly the kind of asset you do not want to upload just to inspect: screenshots with personal data, design comps under NDA, scanned documents, internal product imagery. Many online base64 converters POST the file to their server, which means your image travels, is stored by someone else's infrastructure, and may be cached or logged. This tool does the conversion in your browser with JavaScript — the file never leaves your device, there is no size quota set by a server, and the page works offline.",
            "The workflow it replaces is the round-trip through a terminal: base64 -i image.png to encode, pasting the wall of text into a file, stitching the data URI prefix by hand. Here you drop the file, copy the finished URL, and the reverse direction is just as fast — paste a data URL from a stylesheet or API response and get the image back, validated and downloadable.",
          ],
        },
      ],
    },
    zh: {
      name: "Base64 图片",
      tagline: "图片与 base64 data URL 双向转换——预览、校验、下载,附精确的体积对比,全部在浏览器本地完成。",
      intro: [
        "拖入 PNG、JPEG、GIF、WebP 或 SVG,立即得到可直接粘贴的 data:image/…;base64,… 地址,用于内联 CSS、HTML 或 JSON 载荷。工具会并排显示原文件体积和转换后的文本体积,内联前就能看清 base64 约 33% 的膨胀。",
        "粘贴 data URL 即可反向解码:预览图片、用文件魔数核对声明的 MIME 类型,一键下载还原成文件。base64 非法或类型不是图片时,会给出清晰的错误提示,而不是一张裂图。",
      ],
      steps: [
        "把图片拖进面板(或直接粘贴剪贴板里的图片)进行编码。",
        "复制完整的 data URL 或仅 base64 部分,并参考体积对比决定是否内联。",
        "切到解码页,粘贴任意图片 data URL,即可预览或下载。",
      ],
      faqs: [
        {
          q: "什么时候值得把图片内联成 data URL?",
          a: "适合小图标、头像和加载占位图。base64 会让文本比二进制大约 33%,所以几 KB 以内通常省掉一次请求整体是划算的;对照片来说,膨胀几乎总是大于收益。",
        },
        {
          q: "为什么 base64 版本比原文件大?",
          a: "base64 把每 3 个字节编码成 4 个文本字符,固定膨胀 33%,再加上 data:image/…;base64, 前缀。内容没有压缩也没有丢失,只是同一份字节的文本安全表示。",
        },
        {
          q: "解码支持哪些格式?",
          a: "浏览器能渲染的图片都可以:PNG、JPEG、GIF、WebP、SVG、BMP、AVIF 等。工具会校验 base64 是否合法、声明的 MIME 是否为图片类型,并在文件魔数与声明类型不符时给出提醒。",
        },
      ],
      deepDive: [
        {
          heading: "base64 为什么让图片膨胀约 33%",
          paragraphs: [
            "base64 把每 3 个字节打包成 4 个文本字符,所以载荷总是比二进制文件大三分之一——4/3 是固定比例,与格式和内容无关。再加上 data:image/…;base64, 前缀以及某些消费方添加的换行,实际开销还要略高一点。内容没有被压缩也没有丢失,只是同一份字节用文本安全的字母表重新表达,让它能放进 CSS、HTML 或 JSON 里。",
            "这个膨胀正是本工具的体积对比比转换本身更值得看的原因。经典的权衡是:内联省一次 HTTP 请求,但多花带宽并破坏缓存。内联进 CSS 的 1 KB 图标通常划算;100 KB 的照片做成 data URL 几乎从不划算——样式表会膨胀约 133 KB,每个引用它的页面都要重新下载,而且无法独立缓存。JPEG 和 WebP 的照片二进制压缩效率很高,base64 文本会抵消掉相当一部分压缩效果。",
            "一个常被忽略的细节:SVG 本身就是文本,把 SVG 编码成 base64 往往不如 URL 编码或直接内联 SVG 节省。反过来,gzip 对 base64 文本的压缩效果尚可,所以当服务器以压缩方式传输时,实际传输开销比原始 +33% 的直觉更接近原始大小。",
          ],
        },
        {
          heading: "安全解码:MIME 类型、魔数与信任",
          paragraphs: [
            "data URL 表面上是自描述的——data:image/png;base64, 声称自己是 PNG——但这只是一个字符串。本解码器核对的是实际字节:PNG 文件以独特的 8 字节签名开头,JPEG 以 FF D8 开头,GIF 以 GIF8 开头,等等。当声明的 MIME 类型和魔数不一致时,你会收到警告而不是一张静默损坏的图——排查来源不明的载荷、或调试 img 标签为什么不渲染时很有用。",
            "对格式错误的输入,解码会明确报错:非法 base64 字符、填充错误、或声明的类型根本不是图片。这对安全性很重要。声称是 text/html 的 data: URL 在某些场景下可以执行脚本,这也是浏览器限制 data URL 用于顶层导航的原因。把粘贴进来的 data URL 当作不可信输入——渲染前先校验——是安全的默认做法,也正是本工具替你做的事。",
            "还要注意预览不能告诉你的事:文件除了头部字节之外是否完整合法、图片内容是什么。它是在浏览器里渲染的,所以浏览器能显示的格式(PNG、JPEG、GIF、WebP、SVG、AVIF 等)都能预览,不能显示的会像在页面里一样显示出来。",
          ],
        },
        {
          heading: "本地转换是隐私的底线",
          paragraphs: [
            "图片恰恰是最不该为了检查就上传的资产:带个人信息的截图、保密协议下的设计稿、扫描件、内部产品图。很多在线 base64 转换器会把文件 POST 到自己的服务器——你的图片要经过传输,存在别人的基础设施上,还可能被缓存或记日志。本工具完全在浏览器里用 JavaScript 完成转换——文件不离开设备,没有服务器设的大小限额,页面加载后离线也能用。",
            "它替代的工作流是绕终端的往返:base64 -i image.png 编码,把一大段文本贴进文件,再手工拼 data URI 前缀。在这里,拖入文件、复制成品 URL 即可;反方向同样快——把样式表或 API 响应里的 data URL 粘贴进来,拿回经过校验、可下载的图片。",
          ],
        },
      ],
    },
    ja: {
      name: "Base64 画像変換",
      tagline:
        "画像と base64 data URL を双方向に変換 — プレビュー・検証・ダウンロードに加え、正確なサイズ比較付き。すべてブラウザ内で処理します。",
      intro: [
        "PNG、JPEG、GIF、WebP、SVG をドロップすると、CSS・HTML・JSON にそのまま貼れる data:image/…;base64,… を即座に生成します。元ファイルのサイズと変換後のテキストサイズを並べて表示するので、base64 約 33% の膨張をインライン化の前に確認できます。",
        "data URL を貼り付けると逆方向のデコードができます:画像をプレビューし、宣言された MIME 型をファイルのマジックバイトと照合し、ワンクリックでファイルとしてダウンロード。不正な base64 や画像以外の型は、壊れたプレビューではなく明確なエラーで知らせます。",
      ],
      steps: [
        "画像をパネルにドロップ(またはクリップボードから貼り付け)してエンコードします。",
        "data URL 全体、または base64 部分だけをコピーし、サイズ比較を参考にインライン化を判断します。",
        "デコードタブに切り替え、画像の data URL を貼り付けてプレビューまたはダウンロードします。",
      ],
      faqs: [
        {
          q: "どんなときに data URL へのインライン化が得ですか?",
          a: "小さなアイコン、アバター、ローディング用プレースホルダーに向いています。base64 はテキストをバイナリより約 33% 大きくするため、数 KB 以下ならリクエスト削減で全体としてお得になることが多いですが、写真では膨張のほうが大きくなりがちです。",
        },
        {
          q: "base64 版が元ファイルより大きくなるのはなぜですか?",
          a: "base64 は 3 バイトを 4 文字のテキストにエンコードするため、固定で 33% 膨張します(data:image/…;base64, 接頭辞も加算)。圧縮も欠落もなく、同じバイトのテキスト安全な表現にすぎません。",
        },
        {
          q: "デコーダーはどんな形式に対応していますか?",
          a: "ブラウザが描画できる画像なら何でも:PNG、JPEG、GIF、WebP、SVG、BMP、AVIF など。base64 の整合性、MIME 型が画像かどうかを検証し、マジックバイトが宣言と一致しない場合は警告します。",
        },
      ],
      deepDive: [
        {
          heading: "base64 が画像を約 33% 膨らませる理由",
          paragraphs: [
            "base64 は 3 バイトを 4 文字のテキストに詰め込むため、ペイロードは必ずバイナリより 3 分の 1 大きくなります。4/3 という固定比率で、形式や内容には依存しません。data:image/…;base64, の接頭辞と、消費側が適用する改行が加われば、実効的なオーバーヘッドはさらに少し上がります。圧縮も欠落もなく、同じバイトをテキスト安全な文字で表し直しているだけで、CSS・HTML・JSON の中を通せるようにしているのです。",
            "この膨張こそ、変換そのものよりサイズ比較を見る意味がある理由です。古典的な判断基準は、インライン化が HTTP リクエストを節約する一方で、帯域を食いキャッシュを妨げるというものです。CSS に入れる 1 KB のアイコンなら通常は得ですが、100 KB の写真を data URL にするのはほぼ得になりません。スタイルシートが約 133 KB 膨らみ、参照するページごとに再ダウンロードされ、独立したキャッシュが効きません。JPEG や WebP の写真は特に圧縮効率が高いので、base64 テキストがその効果をかなり相殺します。",
            "見落とされがちな細部があります。SVG はすでにテキストなので、base64 にするより URL エンコードや生のインライン SVG のほうが省スペースなことが多いです。逆に gzip は base64 テキストをそこそこ圧縮できるので、サーバーが圧縮付きで配信する場合、実効的な転送コストは +33% の直感よりも元のサイズに近づきます。",
          ],
        },
        {
          heading: "安全なデコード:MIME 型、マジックバイト、信頼",
          paragraphs: [
            "data URL は表面は自己記述的です。data:image/png;base64, は自分を PNG だと主張しますが、それはただの文字列です。このデコーダーは実際のバイトを確認します。PNG は特徴的な 8 バイトの署名で始まり、JPEG は FF D8、GIF は GIF8 で始まります。宣言された MIME 型とマジックバイトが食い違う場合、静かに壊れた画像ではなく警告が出ます。出所不明のペイロードの調査や、img タグが描画を拒む原因の切り分けに役立ちます。",
            "不正な入力もはっきり失敗します。base64 として不正な文字、誤ったパディング、そもそも画像でない宣言型です。これはセキュリティに関わります。text/html を名乗る data: URL は一部の文脈でスクリプトを実行でき得るため、ブラウザはトップレベルナビゲーションでの data URL を制限しています。貼り付けられた data URL を信頼できない入力として扱い、描画の前に検証するのが安全な既定動作で、このツールはまさにそれを代行します。",
            "プレビューが教えてくれないことも押さえておいてください。ヘッダーバイト以降の整合性や、画像の内容そのものです。レンダリングはブラウザが行うため、表示できる形式(PNG、JPEG、GIF、WebP、SVG、AVIF など)はすべてプレビューでき、できない形式はページ上と同じように表示されます。",
          ],
        },
        {
          heading: "ローカル変換というプライバシーの基準線",
          paragraphs: [
            "画像は、確認のためだけにアップロードしたくない資産の典型です。個人情報を含むスクリーンショット、NDA 下のデザインカンプ、スキャン文書、社内の製品画像などです。多くのオンライン base64 変換サービスはファイルをサーバーに POST します。画像は通信を経て他人のインフラに保存され、キャッシュやログに残るかもしれません。このツールは変換をすべてブラウザ内の JavaScript で行います。ファイルは端末の外に出ず、サーバー側のサイズ制限もなく、ページを読み込めばオフラインでも使えます。",
            "置き換えるワークフローはターミナル経由の往復です。base64 -i image.png でエンコードし、長いテキストをファイルに貼り、data URI の接頭辞を手作業で組み立てる。ここではファイルをドロップして完成した URL をコピーするだけです。逆方向も同じ速さで、スタイルシートや API レスポンスの data URL を貼り付ければ、検証済みでダウンロード可能な画像が手に入ります。",
          ],
        },
      ],
    },
    es: {
      name: "Imagen Base64",
      tagline:
        "Convierte imágenes a data URLs base64 y viceversa: previsualiza, valida y descarga, con comparación exacta de tamaños. Todo en tu navegador.",
      intro: [
        "Suelta un PNG, JPEG, GIF, WebP o SVG y obtén al instante un data:image/…;base64,… listo para pegar en CSS, HTML o JSON en línea. La herramienta muestra el tamaño del archivo original junto al del texto resultante, así ves el sobrecoste del ~33% de base64 antes de decidirte a incrustar.",
        "Pega un data URL y la vista inversa lo decodifica: previsualiza la imagen, comprueba el MIME declarado contra los bytes reales y un botón lo guarda de nuevo como archivo. Un base64 inválido o un tipo que no es imagen da un mensaje claro en lugar de una imagen rota.",
      ],
      steps: [
        "Suelta una imagen en el panel (o pega una desde el portapapeles) para codificarla.",
        "Copia el data URL — o solo el base64 — y revisa la comparación de tamaños antes de incrustar.",
        "Cambia a la pestaña de decodificado, pega cualquier data URL de imagen y previsualízala o descárgala.",
      ],
      faqs: [
        {
          q: "¿Cuándo merece la pena incrustar una imagen como data URL?",
          a: "Para iconos pequeños, avatares y placeholders de carga. Base64 hace el texto un ~33% más grande que el binario, así que por debajo de unos pocos KB suele compensar por la petición HTTP ahorrada; para fotos el sobrecoste casi siempre pesa más.",
        },
        {
          q: "¿Por qué la versión base64 es más grande que mi archivo?",
          a: "Base64 codifica cada 3 bytes como 4 caracteres de texto: una inflación fija del 33%, más el prefijo data:image/…;base64,. No se comprime ni se pierde nada; es simplemente una representación textual de los mismos bytes.",
        },
        {
          q: "¿Qué formatos acepta el decodificador?",
          a: "Todo lo que tu navegador pueda mostrar como imagen: PNG, JPEG, GIF, WebP, SVG, BMP, AVIF y más. La herramienta verifica que el base64 sea válido, que el MIME declarado sea de imagen, y avisa cuando los bytes mágicos no coinciden con el tipo declarado.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué base64 infla las imágenes un ~33%",
          paragraphs: [
            "Base64 empaqueta cada 3 bytes en 4 caracteres de texto, así que el payload siempre acaba un tercio más grande que el archivo binario — 4/3 es la proporción fija, independiente del formato o del contenido. Suma el prefijo data:image/…;base64, y cualquier salto de línea que aplique el consumidor, y el sobrecoste efectivo sube un poco más. No se comprime ni se descarta nada; los mismos bytes simplemente se reescriben en un alfabeto seguro para texto para poder viajar dentro de CSS, HTML o JSON.",
            "Esa inflación es la razón por la que la comparación de tamaños de esta herramienta importa más que la conversión misma. La decisión clásica: incrustar ahorra una petición HTTP, pero cuesta ancho de banda y bloquea la caché. Un icono de 1 KB incrustado en CSS suele compensar; una foto de 100 KB como data URL casi nunca — infla la hoja de estilos en ~133 KB, se descarga de nuevo con cada página que la referencia y no se puede cachear de forma independiente. Las fotos JPEG y WebP en particular comprimen tan eficientemente que el texto base64 deshace buena parte de la compresión.",
            "Un detalle que se pasa por alto: SVG ya es texto, así que codificar un SVG a base64 suele desperdiciar espacio frente a un SVG en línea crudo o codificado por URL. A cambio, gzip comprime razonablemente bien el texto base64, así que cuando el servidor sirve el payload comprimido, el coste de transferencia efectivo queda más cerca del tamaño original de lo que sugiere el +33% bruto.",
          ],
        },
        {
          heading: "Decodificar con seguridad: MIME, bytes mágicos y confianza",
          paragraphs: [
            "Un data URL se describe a sí mismo en apariencia — data:image/png;base64, dice ser un PNG — pero la afirmación es solo una cadena. Este decodificador comprueba los bytes reales: los PNG empiezan con una firma distintiva de 8 bytes, los JPEG con FF D8, los GIF con GIF8, etc. Cuando el MIME declarado y los bytes mágicos discrepan, recibes una advertencia en lugar de una imagen silenciosamente rota — útil al inspeccionar payloads de fuentes desconocidas o al depurar por qué un <img> se niega a renderizar.",
            "La decodificación también falla de forma ruidosa ante entrada malformada: caracteres base64 inválidos, relleno incorrecto o un tipo declarado que no es imagen. Eso importa para la seguridad. Un data: URL que dice ser text/html puede ejecutar script en ciertos contextos, y por eso los navegadores restringen los data URLs en la navegación de nivel superior. Tratar un data URL pegado como entrada no confiable — validar antes de renderizar — es el valor por defecto seguro, y es exactamente lo que esta herramienta hace por ti.",
            "Ten en cuenta lo que la vista previa no puede decirte: si la imagen está bien formada más allá de los bytes de cabecera, o qué representa. Se renderiza en el navegador, así que todo lo que tu navegador pueda mostrar (PNG, JPEG, GIF, WebP, SVG, AVIF y más) funciona, y lo que no se muestra igual que en una página.",
          ],
        },
        {
          heading: "Conversión local como línea base de privacidad",
          paragraphs: [
            "Las imágenes son justo el tipo de activo que no quieres subir solo para inspeccionarlas: capturas con datos personales, diseños bajo NDA, documentos escaneados, imágenes internas de producto. Muchos convertidores base64 en línea hacen POST del archivo a su servidor, lo que significa que tu imagen viaja, queda almacenada en la infraestructura de otra persona y puede quedar cacheada o registrada. Esta herramienta hace la conversión en tu navegador con JavaScript — el archivo nunca sale de tu dispositivo, no hay cuota de tamaño impuesta por un servidor, y la página funciona sin conexión.",
            "El flujo que reemplaza es el viaje de ida y vuelta por la terminal: base64 -i image.png para codificar, pegar el muro de texto en un archivo, montar el prefijo del data URI a mano. Aquí sueltas el archivo, copias la URL terminada, y el sentido inverso es igual de rápido — pega un data URL de una hoja de estilos o una respuesta de API y recupera la imagen, validada y descargable.",
          ],
        },
      ],
    },
    pt: {
      name: "Imagem Base64",
      tagline:
        "Converta imagens em data URLs base64 e vice-versa: pré-visualize, valide e baixe, com comparação exata de tamanhos. Tudo no seu navegador.",
      intro: [
        "Solte um PNG, JPEG, GIF, WebP ou SVG e receba na hora um data:image/…;base64,… pronto para colar em CSS, HTML ou JSON inline. A ferramenta mostra o tamanho do arquivo original ao lado do tamanho do texto resultante, então você vê o sobrecusto de ~33% do base64 antes de optar por inline.",
        "Cole um data URL e a visualização reversa decodifica: pré-visualiza a imagem, confere o MIME declarado contra os bytes reais e um botão salva de volta como arquivo. Base64 inválido ou tipo que não é imagem gera uma mensagem clara em vez de uma imagem quebrada.",
      ],
      steps: [
        "Solte uma imagem no painel (ou cole uma da área de transferência) para codificar.",
        "Copie o data URL — ou apenas o base64 — e confira a comparação de tamanhos antes de usar inline.",
        "Mude para a aba de decodificação, cole qualquer data URL de imagem e visualize ou baixe.",
      ],
      faqs: [
        {
          q: "Quando vale a pena embutir uma imagem como data URL?",
          a: "Para ícones pequenos, avatares e placeholders de carregamento. O base64 deixa o texto ~33% maior que o binário, então abaixo de poucos KB geralmente compensa pela requisição HTTP economizada; para fotos, o sobrecusto quase sempre pesa mais.",
        },
        {
          q: "Por que a versão base64 é maior que meu arquivo?",
          a: "O base64 codifica cada 3 bytes como 4 caracteres de texto — uma inflação fixa de 33%, mais o prefixo data:image/…;base64,. Nada é comprimido ou perdido; é apenas uma representação em texto dos mesmos bytes.",
        },
        {
          q: "Quais formatos o decodificador aceita?",
          a: "Tudo o que seu navegador renderiza como imagem: PNG, JPEG, GIF, WebP, SVG, BMP, AVIF e mais. A ferramenta verifica se o base64 é válido, se o MIME declarado é de imagem, e avisa quando os bytes mágicos não batem com o tipo declarado.",
        },
      ],
      deepDive: [
        {
          heading: "Por que o base64 infla imagens em cerca de 33%",
          paragraphs: [
            "O base64 empacota cada 3 bytes em 4 caracteres de texto, então o payload sempre acaba um terço maior que o arquivo binário — 4/3 é a proporção fixa, independente do formato ou do conteúdo. Some o prefixo data:image/…;base64, e qualquer quebra de linha que o consumidor aplique, e o sobrecusto efetivo sobe um pouco mais. Nada é comprimido ou descartado; os mesmos bytes apenas são reescritos num alfabeto seguro para texto para poderem viajar dentro de CSS, HTML ou JSON.",
            "Essa inflação é o motivo pelo qual a comparação de tamanhos desta ferramenta importa mais que a conversão em si. A decisão clássica: embutir economiza uma requisição HTTP, mas custa banda e quebra o cache. Um ícone de 1 KB embutido no CSS geralmente compensa; uma foto de 100 KB como data URL quase nunca — infla a folha de estilo em ~133 KB, é baixada de novo por cada página que a referencia e não pode ser cacheada de forma independente. Fotos JPEG e WebP em particular comprimem tão eficientemente que o texto base64 desfaz boa parte da compressão.",
            "Um detalhe que passa despercebido: SVG já é texto, então codificar um SVG para base64 frequentemente desperdiça espaço em comparação com um SVG inline cru ou codificado por URL. Por outro lado, o gzip comprime razoavelmente bem o texto base64, então quando o servidor entrega o payload comprimido, o custo de transferência efetivo fica mais perto do tamanho original do que o +33% bruto sugere.",
          ],
        },
        {
          heading: "Decodificar com segurança: MIME, bytes mágicos e confiança",
          paragraphs: [
            "Um data URL se descreve à primeira vista — data:image/png;base64, diz ser um PNG — mas a afirmação é só uma string. Este decodificador confere os bytes reais: arquivos PNG começam com uma assinatura distinta de 8 bytes, JPEG começa com FF D8, GIF com GIF8, e assim por diante. Quando o MIME declarado e os bytes mágicos discordam, você recebe um aviso em vez de uma imagem silenciosamente quebrada — útil ao inspecionar payloads de fontes desconhecidas ou depurar por que um <img> se recusa a renderizar.",
            "A decodificação também falha de forma clara diante de entrada malformada: caracteres base64 inválidos, padding errado ou um tipo declarado que nem é imagem. Isso importa para a segurança. Um data: URL que diz ser text/html pode executar script em certos contextos, e é por isso que os navegadores restringem data URLs na navegação de nível superior. Tratar um data URL colado como entrada não confiável — validar antes de renderizar — é o padrão seguro, e é exatamente o que esta ferramenta faz por você.",
            "Note o que a pré-visualização não pode dizer: se a imagem está bem-formada além dos bytes de cabeçalho, ou o que ela retrata. Ela renderiza no navegador, então tudo que o navegador conseguir mostrar (PNG, JPEG, GIF, WebP, SVG, AVIF e mais) funciona, e o que não consegue aparece como apareceria numa página.",
          ],
        },
        {
          heading: "Conversão local como linha de base de privacidade",
          paragraphs: [
            "Imagens são exatamente o tipo de ativo que você não quer subir só para inspecionar: capturas de tela com dados pessoais, mockups sob NDA, documentos escaneados, imagens internas de produto. Muitos conversores base64 online fazem POST do arquivo para o servidor deles, o que significa que sua imagem viaja, fica armazenada na infraestrutura de outra pessoa e pode ser cacheada ou registrada em log. Esta ferramenta faz a conversão no seu navegador com JavaScript — o arquivo nunca sai do seu dispositivo, não há cota de tamanho imposta por servidor, e a página funciona offline.",
            "O fluxo que ela substitui é a ida e volta pelo terminal: base64 -i image.png para codificar, colar o muro de texto num arquivo, montar o prefixo do data URI à mão. Aqui você solta o arquivo, copia a URL pronta, e o sentido inverso é igualmente rápido — cole um data URL de uma folha de estilo ou resposta de API e recupere a imagem, validada e baixável.",
          ],
        },
      ],
    },
  },
});
