import { ImageWatermarkEngine } from "../_engines/image-engine-watermark";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "watermark-image",
  category: "image",
  icon: "image",
  engine: { component: ImageWatermarkEngine },
  related: ["image-resizer", "crop-image", "exif-remover", "image-compressor", "grayscale-image", "image-border", "image-splitter", "compress-image-to-size", "crop-circle-image", "heic-to-jpg"],
  copy: {
    en: {
      name: "Watermark Image",
      tagline: "Add a text watermark to images — position, opacity, size or tile it, processed entirely in your browser.",
      intro: [
        "Protect drafts, proofs and photos with a text watermark you fully control: place it in any corner or center, tile it across the whole image, tune size and opacity — the watermarked copies are generated on your device.",
        "Nothing is uploaded, so you can watermark unreleased work, client proofs and confidential scans without sending them anywhere.",
      
        "Rendering draws the text on a canvas overlaid on your image, with opacity, size and position controlled per copy; tiled mode repeats the stamp across the full image so a crop cannot remove it. The text is anti-aliased by the browser's font engine, so a watermark at 30% opacity stays legible without looking like a post-it note.",
        "Compared with marking images one by one in an editor, the batch applies identical placement and styling to every file — consistent branding across a proof set. And unlike cloud watermark services, unreleased product shots or confidential scans never transit a server, which is often the entire point of watermarking them.",
      ],
      steps: [
        "Drop in one image or a whole batch.",
        "Type the watermark text and set opacity, size, position — or enable tiling.",
        "Apply and download each watermarked copy.",
      ],
      faqs: [
        {
          q: "Can someone remove my watermark?",
          a: "A visible watermark is a deterrent, not encryption — anything visible can be edited out with effort. For real protection, share low-resolution proofs instead.",
        },
        {
          q: "Does it work with transparent PNGs?",
          a: "Output is JPG, so transparency is flattened onto white. Watermark the original PNG with a background color of your choice if you need alpha.",
        },
      ],
      deepDive: [
        {
          heading: "What a watermark can and cannot protect",
          paragraphs: [
            "A watermark is a deterrent and an attribution, not a lock. Visible marks make casual theft less attractive — scraped images with a logo are worthless for someone passing off work as their own — but they do not prevent cropping, inpainting or determined removal, and they prove nothing about authorship by themselves.",
            "Placement is the whole game for visibility: a mark in a corner is trivially cropped away, while a repeated or centered mark survives cropping but changes the image more. Editorial and preview use favors corner marks on the honest assumption that the buyer gets the clean version; protection of shared-only images favors more intrusive placement.",
            "Opacity is the other dial: too subtle and the mark vanishes on busy backgrounds, too strong and it devalues the preview it is meant to advertise. Around 40–60% opacity with a color that contrasts against most of the image is the usual working range.",
          ],
        },
        {
          heading: "Text marks versus image logos",
          paragraphs: [
            "A text watermark is quick and flexible — type a name, a handle or a copyright line and adjust size and position. Its weakness is impersonality: plain text marks are easy to imitate, so a text watermark attributes but barely brands.",
            "An image-based watermark (a logo PNG with transparency) carries brand identity and survives format changes — anyone copying the watermarked photo copies your logo with it. It requires a prepared asset, but that one asset then watermarks an entire batch in one pass.",
            "For batch work the combination matters less than consistency: same position, same opacity, same size across every image. A watermarked portfolio looks professional when the mark is predictable, and amateur when it jumps around frame to frame.",
          ],
        },
        {
          heading: "Local processing protects the clean originals",
          paragraphs: [
            "Watermarking means feeding a tool your best, unwatermarked images — the very assets you most want to keep off other people's servers. An upload-based watermarking service receives your clean originals in full resolution, which inverts the point of the exercise.",
            "This tool processes entirely in your browser: the original image and the watermark asset are composited locally, and the output is written to your disk. The clean version never leaves your device, so only the marked version ever exists outside it.",
            "Keep the unwatermarked masters separately and carefully: if you ever need to re-watermark at a new size or position, the clean original is the only source. And never publish the clean file by accident — most leaks of protected images come from the unprotected copy, not from someone erasing the mark.",
          ],
        },
      ],
    },
    zh: {
      name: "图片加水印",
      tagline: "给图片加文字水印:位置、透明度、大小、平铺全图自选,全程浏览器本地处理。",
      intro: [
        "给草稿、样片和照片加上完全可控的文字水印:九宫格任选位置、可平铺全图、透明度大小随意调——带水印的副本在你的设备上生成。",
        "不上传任何文件,未发布的作品、客户样片、机密扫描件都可以放心处理。",
      ],
      steps: [
        "拖入一张或多张图片。",
        "输入水印文字,调整透明度、大小、位置,或开启平铺。",
        "点击添加,逐张下载带水印的副本。",
      ],
      faqs: [
        {
          q: "水印能被去掉吗?",
          a: "可见水印是威慑不是加密——只要看得见就有人能花功夫修掉。真要保护,建议分享低分辨率样片。",
        },
        {
          q: "支持透明 PNG 吗?",
          a: "输出是 JPG,透明区域会变成白色底。需要保留透明通道的话,请用 PNG 输出的工具处理。",
        },
      ],
      deepDive: [
        {
          heading: "水印能保护什么,不能保护什么",
          paragraphs: [
            "水印是威慑和署名,不是锁。可见水印让随手盗图变得不划算——带着 Logo 的扒图,对冒充原创的人来说一文不值——但它挡不住裁剪、修补或铁了心的移除,而且单凭水印本身也证明不了作者归属。",
            "摆放位置决定可见性的成败:角落水印一裁就没,居中或重复水印能扛住裁剪但改变画面更多。编辑预览场景常用角标,默认买家会拿到无水印版;只分享不卖图的场景更适合更强的摆放方式。",
            "另一个旋钮是不透明度:太淡,水印在花哨背景上消失;太重,则贬低了它本该宣传的预览图。40–60% 左右的不透明度,配上与画面主体有对比度的颜色,是常见的实用区间。",
          ],
        },
        {
          heading: "文字水印对比图片 Logo",
          paragraphs: [
            "文字水印快捷灵活——输入名字、账号或版权行,调好大小和位置即可。弱点是没有个性:素文字水印容易模仿,所以它能署名,却几乎建立不了品牌感。",
            "图片水印(带透明的 Logo PNG)承载品牌识别,还能跟着图片传播——别人复制带水印的照片,等于把你的 Logo 一起复制了。它需要先备好一个素材,但备好之后,一次就能给整批图片打上。",
            "批量作业时,一致性比组合方式更重要:每张图同样的位置、同样的不透明度、同样的大小。水印位置稳定的作品集显得专业,反之每张乱跳就显得业余。",
          ],
        },
        {
          heading: "本地处理保护无水印原图",
          paragraphs: [
            "加水印意味着把你最好、没有水印的图片交给工具——恰恰是你最不想放到别人服务器上的那批资产。上传式水印服务会收到你的全分辨率干净原图,这与做这件事的初衷正好相反。",
            "本工具完全在浏览器内处理:原图和水印素材在本地合成,输出直接写入磁盘。干净版本从不离开你的设备,外界存在的永远只有带水印的版本。",
            "无水印母本要单独、谨慎地保管:日后想换尺寸或位置重新加水印,干净原图是唯一来源。并且千万别把干净文件误发出去——受保护图片的泄露,大多来自那份没打水印的副本,而不是有人抹掉了水印。",
          ],
        },
      ],
    },
    ja: {
      name: "画像にウォーターマーク",
      tagline: "画像に文字ウォーターマークを追加。位置・不透明度・サイズ・タイル表示を自由に設定、処理はすべてブラウザ内。",
      intro: [
        "下書き・校正用画像・写真に、完全に制御できる文字ウォーターマークを:9 宮格の好きな位置、全画面タイル、サイズと不透明度を調整——ウォーターマーク付きのコピーは端末内で生成されます。",
        "アップロードが一切ないので、未公開の作品やクライアント向け校正画像も安心して処理できます。",
      ],
      steps: [
        "画像を 1 枚でもまとめてでもドロップします。",
        "文字を入力し、不透明度・サイズ・位置を設定(タイルも可)。",
        "適用して、各コピーをダウンロードします。",
      ],
      faqs: [
        {
          q: "ウォーターマークは消せますか?",
          a: "可視ウォーターマークは抑止力であって暗号化ではありません。本気で保護するなら、低解像度の校正画像を共有してください。",
        },
        {
          q: "透明 PNG にも使えますか?",
          a: "出力は JPG のため透明部分は白に置き換わります。アルファが必要な場合は PNG 出力のツールをご利用ください。",
        },
      ],
      deepDive: [
        {
          heading: "ウォーターマークが守れること、守れないこと",
          paragraphs: [
            "ウォーターマークは抑止力であり署名であって、鍵ではありません。可視のマークは気軽な盗用を割に合わなくします——ロゴ入りのスクレイピング画像は、自分の作品として見せかける人にとって無価値——しかしトリミング、修復、意図的な除去は防げず、それ自体は著者性の証明にもなりません。",
            "配置が可視性のすべてです:隅のマークはトリミングで簡単に消せ、繰り返しや中央配置はトリミングに耐える代わりに画像をより変えます。編集プレビュー用途は「購入者にクリーン版を渡す」前提で隅のマークが好まれ、共有のみの画像の保護にはより強い配置が向きます。",
            "もう一つのダイヤルは不透明度:薄すぎると忙しい背景で消え、濃すぎると宣伝すべきプレビューの価値を下げます。不透明度 40〜60% 程度で、画像の大部分とコントラストのある色が、実務上の定番域です。",
          ],
        },
        {
          heading: "テキストマークと画像ロゴ",
          paragraphs: [
            "テキストのウォーターマークは速くて柔軟です——名前、ハンドル、コピーライト行を入力し、サイズと位置を調整するだけ。弱点は個性のなさ:素のテキストは模倣しやすく、テキストマークは署名にはなるがブランドにはほぼなりません。",
            "画像ベースのウォーターマーク(透過付きロゴ PNG)はブランド認識を運び、形式変化にも耐えます——ウォーターマーク付き写真をコピーする者はロゴごと持ち去ります。準備したアセットが必要ですが、一度用意すれば一括処理で全体に適用できます。",
            "一括処理では、組み合わせよりも一貫性が重要:全画像で同じ位置・同じ不透明度・同じサイズ。マークの位置が予測できるポートフォリオはプロフェッショナルに見え、フレームごとに動き回ると素人っぽく見えます。",
          ],
        },
        {
          heading: "ローカル処理がクリーンな元画像を守る",
          paragraphs: [
            "ウォーターマーク付けは、あなたの最良の、まだマークのない画像——他人のサーバーに置きたくない資産そのもの——をツールに預ける行為です。アップロード型サービスはクリーンな元画像をフル解像度で受け取り、目的が逆転します。",
            "このツールは完全にブラウザ内で処理します:元画像とウォーターマーク素材はローカルで合成され、出力はディスクへ。クリーン版は端末を離れず、外に存在するのはマーク付き版だけです。",
            "マークなしのマスターは別に、丁寧に保管してください:サイズや位置を変えて再マークする時、クリーンな元画像が唯一の情報源です。そしてクリーンファイルの誤公開だけは避ける——保護画像の漏えいの大半は、マークを消されたからではなく、保護されていないコピーから起きています。",
          ],
        },
      ],
    },
    es: {
      name: "Marca de agua en imagen",
      tagline: "Añade una marca de agua de texto a tus imágenes: posición, opacidad, tamaño o mosaico, procesado 100% local.",
      intro: [
        "Protege borradores, pruebas y fotos con una marca de texto que controlas del todo: colócala en cualquier esquina o centro, tesélala por toda la imagen y ajusta tamaño y opacidad; las copias se generan en tu dispositivo.",
        "No se sube nada, así que puedes marcar trabajo sin publicar, pruebas de cliente y escaneos confidenciales sin enviarlos a ningún sitio.",
      ],
      steps: [
        "Suelta una imagen o un lote entero.",
        "Escribe el texto y ajusta opacidad, tamaño y posición, o activa el mosaico.",
        "Aplica y descarga cada copia marcada.",
      ],
      faqs: [
        {
          q: "¿Pueden quitar mi marca de agua?",
          a: "Una marca visible disuade, no cifra: lo visible se puede editar con esfuerzo. Para protección real, comparte pruebas en baja resolución.",
        },
        {
          q: "¿Funciona con PNG transparentes?",
          a: "La salida es JPG, así que la transparencia se aplana sobre blanco. Si necesitas alfa, usa una herramienta con salida PNG.",
        },
      ],
      deepDive: [
        {
          heading: "Qué puede y no puede proteger una marca de agua",
          paragraphs: [
            "Una marca de agua es un disuasivo y una atribución, no una cerradura. Las marcas visibles hacen poco atractivo el robo casual — una imagen raspada con logo no vale nada para quien hace pasar el trabajo por suyo — pero no impiden recortes, rellenado ni una eliminación decidida, y por sí solas no prueban la autoría.",
            "La colocación es todo el juego de la visibilidad: una marca en la esquina se elimina recortando, mientras que una marca repetida o centrada sobrevive al recorte pero cambia más la imagen. El uso editorial y de vista previa favorece las esquinas, con la suposición honesta de que el comprador recibe la versión limpia; la protección de imágenes de solo compartir favorece colocaciones más intrusivas.",
            "La opacidad es la otra rueda: demasiado sutil y la marca desaparece sobre fondos recargados; demasiado fuerte y devalúa la vista previa que se supone que anuncia. En torno al 40–60 % de opacidad con un color que contraste con la mayor parte de la imagen es el rango habitual de trabajo.",
          ],
        },
        {
          heading: "Marcas de texto frente a logos en imagen",
          paragraphs: [
            "Una marca de texto es rápida y flexible — escribes un nombre, un usuario o una línea de copyright y ajustas tamaño y posición. Su debilidad es la impersonalidad: las marcas de texto planas se imitan fácilmente, así que atribuyen pero casi no construyen marca.",
            "Una marca basada en imagen (un logo PNG con transparencia) transporta identidad de marca y sobrevive a los cambios de formato — quien copia la foto con marca copia tu logo con ella. Exige un recurso preparado, pero ese único recurso marca después un lote entero de una pasada.",
            "Para el trabajo por lotes importa más la consistencia que la combinación: misma posición, misma opacidad, mismo tamaño en todas las imágenes. Un portafolio con marca se ve profesional cuando la marca es predecible, y aficionado cuando salta de un encuadre a otro.",
          ],
        },
        {
          heading: "El procesado local protege los originales limpios",
          paragraphs: [
            "Marcar con agua significa entregar a una herramienta tus mejores imágenes sin marca — justo los recursos que más quieres mantener fuera de los servidores ajenos. Un servicio de marcas basado en subida recibe tus originales limpios a resolución completa, lo que invierte el propósito del ejercicio.",
            "Esta herramienta procesa íntegramente en tu navegador: la imagen original y el recurso de marca se componen localmente, y la salida se escribe en tu disco. La versión limpia nunca sale de tu dispositivo, así que fuera solo existe la versión marcada.",
            "Guarda los másters sin marca por separado y con cuidado: si algún día necesitas remarcar con otro tamaño u otra posición, el original limpio es la única fuente. Y nunca publiques el archivo limpio por accidente — la mayoría de las fugas de imágenes protegidas vienen de la copia sin protección, no de alguien borrando la marca.",
          ],
        },
      ],
    },
    pt: {
      name: "Marca d'água em imagem",
      tagline: "Adicione marca d'água de texto às imagens — posição, opacidade, tamanho ou mosaico, tudo processado no navegador.",
      intro: [
        "Proteja rascunhos, provas e fotos com uma marca de texto sob controle total: posicione em qualquer canto ou centro, aplique em mosaico, ajuste tamanho e opacidade — as cópias são geradas no seu dispositivo.",
        "Nada é enviado, então você pode marcar trabalhos não publicados, provas de clientes e escaneamentos confidenciais sem enviá-los para lugar nenhum.",
      ],
      steps: [
        "Solte uma imagem ou um lote inteiro.",
        "Digite o texto e ajuste opacidade, tamanho e posição — ou ative o mosaico.",
        "Aplique e baixe cada cópia marcada.",
      ],
      faqs: [
        {
          q: "Dá para remover minha marca d'água?",
          a: "Marca visível é um deterrente, não criptografia — o que é visível pode ser editado com esforço. Para proteção real, compartilhe provas em baixa resolução.",
        },
        {
          q: "Funciona com PNG transparente?",
          a: "A saída é JPG, então a transparência é achatada no branco. Se precisar de alfa, use uma ferramenta com saída PNG.",
        },
      ],
      deepDive: [
        {
          heading: "O que uma marca d'água pode e não pode proteger",
          paragraphs: [
            "Uma marca d'água é um dissuasor e uma atribuição, não uma fechadura. Marcas visíveis tornam o roubo casual pouco atraente — uma imagem raspada com logo não vale nada para quem quer passar o trabalho por seu — mas não impedem recortes, retoques de preenchimento nem uma remoção decidida, e por si só não provam autoria.",
            "O posicionamento decide a visibilidade: uma marca no canto se elimina recortando, enquanto uma marca repetida ou centrada sobrevive ao recorte, mas muda mais a imagem. O uso editorial e de pré-visualização prefere marcas no canto, com a suposição honesta de que o comprador recebe a versão limpa; a proteção de imagens só de compartilhamento prefere posicionamentos mais intrusivos.",
            "A opacidade é o outro controle: sutil demais e a marca desaparece em fundos carregados; forte demais e desvaloriza a pré-visualização que deveria anunciar. Em torno de 40–60 % de opacidade, com uma cor que contraste com a maior parte da imagem, é a faixa habitual de trabalho.",
          ],
        },
        {
          heading: "Marcas de texto versus logos em imagem",
          paragraphs: [
            "Uma marca de texto é rápida e flexível — digite um nome, um usuário ou uma linha de copyright e ajuste tamanho e posição. A fraqueza é a falta de personalidade: marcas de texto simples são fáceis de imitar, então atribuem mas quase não constroem marca.",
            "Uma marca baseada em imagem (um logo PNG com transparência) carrega identidade de marca e sobrevive a mudanças de formato — quem copia a foto com marca copia o seu logo junto. Exige um recurso preparado, mas esse único recurso marca depois um lote inteiro numa passada.",
            "Para trabalho em lote, a consistência importa mais que a combinação: mesma posição, mesma opacidade, mesmo tamanho em todas as imagens. Um portfólio com marca parece profissional quando a marca é previsível, e amador quando ela salta de um quadro para outro.",
          ],
        },
        {
          heading: "O processamento local protege os originais limpos",
          paragraphs: [
            "Marcar com água significa entregar a uma ferramenta suas melhores imagens sem marca — exatamente os recursos que você mais quer manter fora dos servidores alheios. Um serviço de marcas baseado em envio recebe seus originais limpos em resolução total, o que inverte o propósito do exercício.",
            "Esta ferramenta processa inteiramente no seu navegador: a imagem original e o recurso de marca são compostos localmente, e a saída é gravada no seu disco. A versão limpa nunca sai do seu dispositivo, então fora dele só existe a versão marcada.",
            "Guarde os masters sem marca separadamente e com cuidado: se um dia precisar remarcar com outro tamanho ou posição, o original limpo é a única fonte. E nunca publique o arquivo limpo por acidente — a maioria dos vazamentos de imagens protegidas vem da cópia sem proteção, não de alguém apagando a marca.",
          ],
        },
      ],
    },
  },
});
