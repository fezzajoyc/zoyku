import { CalcEnginePlaceholder } from "../_engines/calc-engine-placeholder";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "placeholder-image-generator",
  category: "developer",
  icon: "image",
  engine: { component: CalcEnginePlaceholder },
  related: ["qr-generator", "base64-image", "color-picker", "aspect-ratio-calculator"],
  copy: {
    en: {
      name: "Placeholder Image Generator",
      tagline: "Generate placeholder images of any size in SVG, PNG or JPG — pick colors and a label, preview instantly, then download the file or copy the SVG markup.",
      intro: [
        "Mockups and wireframes need image boxes before the real assets exist. Type a width and height — a hero at 1200×630, an avatar at 256×256, or anything from 1×1 up to 5000×5000 — choose background and text colors, optionally add a label, and the placeholder renders live as you type.",
        "Download the result as SVG, PNG or JPG, or copy the SVG markup straight to your clipboard: it is a handful of readable elements, not base64 soup, so you can paste it into HTML, JSX or Figma and edit the text and colors by hand. Everything is generated in your browser; nothing is uploaded.",
      ],
      steps: [
        "Enter the width and height in pixels.",
        "Set the background and text colors, and an optional label (defaults to the dimensions).",
        "Download as SVG, PNG or JPG — or copy the SVG markup and paste it anywhere.",
      ],
      faqs: [
        {
          q: "When should I use SVG instead of PNG or JPG?",
          a: "SVG is text: tiny, infinitely scalable and editable by hand, which makes it ideal for mockups, docs and e-mail-safe layouts. PNG is the safer pick for platforms that mangle inline SVG (some CMSes and chat apps), and JPG suits photo-like placeholders at small file sizes. The preview is identical in all three.",
        },
        {
          q: "What are the size and color limits?",
          a: "Width and height must be whole numbers between 1 and 5000 pixels; colors must be hex — #RRGGBB or the short #RGB form. Anything else is rejected with a hint rather than silently producing a broken image.",
        },
        {
          q: "Is anything sent to a server?",
          a: "No. The SVG is built from a string template in your browser and raster versions are drawn on a local canvas. Nothing leaves the page, so it works offline and is safe for unreleased designs.",
        },
      ],
    },
    zh: {
      name: "占位图生成器",
      tagline: "生成任意尺寸的占位图,支持 SVG、PNG、JPG 三种格式——自定义颜色与文字,即时预览,可下载文件或直接复制 SVG 标记。",
      intro: [
        "做原型和线框图时,真实素材往往还没到位,但版面里需要图片占位。输入宽高——首图 1200×630、头像 256×256,或 1×1 到 5000×5000 之间的任意尺寸——选好背景色和文字色,按需加一行文字,占位图随输入实时呈现。",
        "结果可下载为 SVG、PNG 或 JPG,也可以直接复制 SVG 标记:它是几行可读的标签而非 base64 长串,粘进 HTML、JSX 或 Figma 后还能继续手改文字和颜色。全部在浏览器本地生成,不上传任何内容。",
      ],
      steps: [
        "输入以像素为单位的宽度和高度。",
        "设置背景色与文字色,可选填一行文字(默认显示尺寸)。",
        "下载为 SVG、PNG 或 JPG——或复制 SVG 标记粘贴到任何地方。",
      ],
      faqs: [
        {
          q: "什么时候该用 SVG 而不是 PNG 或 JPG?",
          a: "SVG 是文本:体积极小、无限缩放、可手工编辑,适合原型、文档和对内联 SVG 友好的布局。PNG 更适合会破坏内联 SVG 的平台(部分 CMS 和聊天工具),JPG 适合照片感占位、文件更小。三种格式的预览效果完全一致。",
        },
        {
          q: "尺寸和颜色有什么限制?",
          a: "宽高必须是 1–5000 之间的整数(像素);颜色必须是十六进制格式——#RRGGBB 或简写 #RGB。非法输入会得到明确提示,而不是悄悄生成坏图。",
        },
        {
          q: "数据会被上传吗?",
          a: "不会。SVG 由浏览器里的字符串模板拼出,位图版本由本地画布渲染。没有任何数据离开页面,离线可用,也适合未发布的设计稿。",
        },
      ],
    },
    ja: {
      name: "プレースホルダー画像生成",
      tagline: "任意サイズのプレースホルダー画像を SVG・PNG・JPG で生成。色とラベルを指定して即時プレビュー、ファイルのダウンロードも SVG のコピーも可能。",
      intro: [
        "モックアップやワイヤーフレームでは、実素材が揃う前に画像ボックスが必要です。幅と高さを入力してください。ヒーローは 1200×630、アバターは 256×256、1×1 から 5000×5000 まで任意のサイズに対応します。背景色と文字色を選び、必要ならラベルを付けると、入力に合わせてリアルタイムに描画されます。",
        "結果は SVG・PNG・JPG でダウンロードできるほか、SVG のマークアップをそのままコピーすることもできます。base64 の塊ではなく数行の読める要素なので、HTML・JSX・Figma に貼り付けて文字や色を手で直せます。生成はすべてブラウザ内で行われ、アップロードは一切ありません。",
      ],
      steps: [
        "幅と高さをピクセルで入力します。",
        "背景色と文字色、任意のラベルを設定します(既定はサイズ表記)。",
        "SVG・PNG・JPG でダウンロードするか、SVG マークアップをコピーして好きな場所に貼り付けます。",
      ],
      faqs: [
        {
          q: "PNG や JPG ではなく SVG を使うべき場面は?",
          a: "SVG はテキストなので、軽量・無限に拡大可能・手で編集でき、モックアップやドキュメント、インライン SVG を壊さないレイアウトに最適です。CMS やチャットなどインライン SVG を壊すプラットフォームには PNG が無難で、写真風のプレースホルダーにはファイルサイズの小さい JPG が向きます。プレビューは 3 形式とも同じです。",
        },
        {
          q: "サイズと色の制限は?",
          a: "幅と高さは 1〜5000 ピクセルの整数、色は #RRGGBB または短縮形 #RGB の 16 進表記です。それ以外の入力は壊れた画像を黙って生成するのではなく、ヒント付きで拒否されます。",
        },
        {
          q: "データはサーバーに送られますか?",
          a: "いいえ。SVG はブラウザ内の文字列テンプレートから組み立てられ、ラスター版はローカルのキャンバスで描画されます。ページの外に出るデータはなく、オフラインで動作し、未公開デザインにも安全です。",
        },
      ],
    },
    es: {
      name: "Generador de imágenes de marcador",
      tagline: "Genere imágenes de marcador de cualquier tamaño en SVG, PNG o JPG — elija colores y una etiqueta, previsualice al instante y descargue o copie el marcado SVG.",
      intro: [
        "En maquetas y wireframes hacen falta cajas de imagen antes de tener los recursos reales. Escriba un ancho y un alto — un hero de 1200×630, un avatar de 256×256, o cualquier tamaño de 1×1 a 5000×5000 — elija colores de fondo y de texto, añada una etiqueta opcional, y el marcador se dibuja en vivo mientras escribe.",
        "Descargue el resultado como SVG, PNG o JPG, o copie el marcado SVG directamente: son unos pocos elementos legibles, no una sopa de base64, así que puede pegarlo en HTML, JSX o Figma y editar el texto y los colores a mano. Todo se genera en su navegador; no se sube nada.",
      ],
      steps: [
        "Introduzca el ancho y el alto en píxeles.",
        "Fije los colores de fondo y del texto, y una etiqueta opcional (por defecto, las dimensiones).",
        "Descargue como SVG, PNG o JPG — o copie el marcado SVG y péguelo donde quiera.",
      ],
      faqs: [
        {
          q: "¿Cuándo conviene SVG en vez de PNG o JPG?",
          a: "El SVG es texto: minúsculo, escalable sin límite y editable a mano, ideal para maquetas, documentación y diseños donde el SVG en línea funciona. PNG es la opción más segura en plataformas que rompen el SVG en línea (algunos CMS y chats), y JPG encaja con marcadores fotográficos a menor peso. La vista previa es idéntica en los tres.",
        },
        {
          q: "¿Qué límites tienen tamaño y colores?",
          a: "Ancho y alto deben ser números enteros entre 1 y 5000 píxeles; los colores van en hexadecimal — #RRGGBB o la forma corta #RGB. Cualquier otra cosa se rechaza con una pista en lugar de producir en silencio una imagen rota.",
        },
        {
          q: "¿Se envía algo a un servidor?",
          a: "No. El SVG se construye con una plantilla de texto en su navegador y las versiones raster se dibujan en un lienzo local. Nada sale de la página: funciona sin conexión y es seguro para diseños sin publicar.",
        },
      ],
    },
    pt: {
      name: "Gerador de imagem de marcador",
      tagline: "Gere imagens de marcador de qualquer tamanho em SVG, PNG ou JPG — escolha cores e um texto, visualize na hora e baixe o arquivo ou copie a marcação SVG.",
      intro: [
        "Mockups e wireframes precisam de caixas de imagem antes dos assets reais existirem. Digite uma largura e uma altura — um hero de 1200×630, um avatar de 256×256, ou qualquer tamanho de 1×1 a 5000×5000 — escolha as cores de fundo e do texto, adicione um texto opcional, e o marcador é renderizado ao vivo enquanto você digita.",
        "Baixe o resultado em SVG, PNG ou JPG, ou copie a marcação SVG direto para a área de transferência: são poucos elementos legíveis, não uma sopa de base64, então dá para colar em HTML, JSX ou Figma e editar texto e cores à mão. Tudo é gerado no seu navegador; nada é enviado.",
      ],
      steps: [
        "Informe a largura e a altura em pixels.",
        "Defina as cores de fundo e do texto, e um texto opcional (o padrão é a dimensão).",
        "Baixe em SVG, PNG ou JPG — ou copie a marcação SVG e cole em qualquer lugar.",
      ],
      faqs: [
        {
          q: "Quando usar SVG em vez de PNG ou JPG?",
          a: "SVG é texto: minúsculo, escalável sem limite e editável à mão, ideal para mockups, documentação e layouts onde o SVG inline funciona. PNG é a escolha mais segura em plataformas que quebram SVG inline (alguns CMS e apps de mensagens), e JPG serve para marcadores com cara de foto em arquivos menores. A prévia é idêntica nos três.",
        },
        {
          q: "Quais são os limites de tamanho e cor?",
          a: "Largura e altura devem ser números inteiros entre 1 e 5000 pixels; as cores vão em hexadecimal — #RRGGBB ou a forma curta #RGB. Qualquer outra coisa é rejeitada com uma dica, em vez de gerar silenciosamente uma imagem quebrada.",
        },
        {
          q: "Algo é enviado para um servidor?",
          a: "Não. O SVG é construído a partir de um template de texto no seu navegador e as versões raster são desenhadas num canvas local. Nada sai da página: funciona offline e é seguro para designs não publicados.",
        },
      ],
    },
  },
});
