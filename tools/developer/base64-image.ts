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
    },
  },
});
