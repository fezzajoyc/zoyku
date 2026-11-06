import { ImageCanvasEngine } from "../_engines/image-engine-canvas";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "jpg-to-png",
  category: "image",
  icon: "image",
  engine: {
    component: ImageCanvasEngine,
    props: { op: "convert", accept: "image/jpeg,.jpg,.jpeg", defaultFormat: "image/png", lockFormat: true, suffix: "" },
  },
  related: ["png-to-jpg", "convert-image", "webp-converter", "heic-to-jpg", "image-border", "image-splitter", "compress-image-to-size", "image-compressor", "grayscale-image", "crop-circle-image"],
  copy: {
    en: {
      name: "JPG to PNG",
      tagline:
        "Convert JPG photos to PNG instantly with lossless output and batch support — free, private and with no upload, right in your browser.",
      intro: [
        "Drop your .jpg files and get pixel-identical .png copies in one click. PNG stores the image without further loss, which makes it the format of choice for re-editing, archiving, or platforms and tools that refuse JPEG files.",
        "Batch mode converts a whole stack of photos in one pass and shows the resulting size for each file. Note that PNG typically produces larger files than JPG — that is the price of lossless storage, not a defect of the conversion.",
      
        "The conversion is a decode-then-encode: the browser decodes JPEG into pixels, then the canvas encoder writes them as PNG. The output is pixel-identical to what the JPEG showed — no additional loss, but also no quality gain, since JPEG artifacts are already baked into the source pixels.",
        "Compared with renaming the extension or pasting into an editor, this produces a real PNG with a proper color profile and alpha-capable structure. And unlike upload-based converters that re-compress or resize, the file comes back at full resolution with only the container changed — useful for tools that strictly check magic bytes.",
      ],
      steps: [
        "Drop your JPG images (or click to browse) — multiple files are welcome.",
        "Wait a moment while each file is converted locally.",
        "Download the PNG files individually or all at once.",
      ],
      faqs: [
        {
          q: "Will the PNG file look better than the JPG?",
          a: "No — it will look the same. Conversion cannot undo compression that already happened; the PNG simply preserves the current appearance without adding new artifacts if you edit and re-save it later. Use it for workflows, not for a quality boost.",
        },
        {
          q: "Why is my PNG larger than the original JPG?",
          a: "JPG uses aggressive lossy compression designed for photos, while PNG stores every pixel exactly. The same picture therefore takes more space as PNG. If file size matters more than lossless editing, JPG or WebP is the better target.",
        },
        {
          q: "Does converting JPG to PNG add transparency?",
          a: "No. JPEG never stores transparency, so nothing can be recovered — your converted PNG is fully opaque. To cut out a background you would need a dedicated background-removal tool.",
        },
      ],
      deepDive: [
        {
          heading: "What JPG to PNG can and cannot recover",
          paragraphs: [
            "The first fact to accept: converting JPG to PNG does not improve the image. PNG is lossless, but it can only preserve what exists — and what exists in a JPG is already the result of lossy compression. Artifacts baked into the file travel into the PNG untouched.",
            "What the conversion does provide is a safe future. A PNG holds every pixel exactly, so from the moment of conversion onward, editing, cropping and re-saving cost nothing in quality. Keeping a JPG as your working master means every save re-compresses and compounds the damage.",
            "So the right mental model is \"stabilize\": the conversion is worthwhile when the JPG is your best copy and you plan to keep editing, archiving or re-exporting it. It is pointless as a cosmetic claim — nobody can look at the PNG and see improvement.",
          ],
        },
        {
          heading: "Size expectations and format behavior",
          paragraphs: [
            "Expect the file to grow. JPEG's clever compression discards data that PNG must store faithfully, so the same picture as a PNG is typically several times larger than the JPG — the PNG is paying for exactness, including recording every artifact the JPG left behind.",
            "For photographic content this size is usually not worth paying unless you need it: keep photos as JPG for sharing, and convert to PNG when the image enters an editing workflow where repeated saves would otherwise degrade it.",
            "Where conversion genuinely shines is a mixed case: images with text or flat graphics that were incorrectly saved as JPG. They are already damaged, but freezing them in PNG stops the damage from growing with each additional edit or save.",
          ],
        },
        {
          heading: "Editing workflows and local processing",
          paragraphs: [
            "The practical rule for editing pipelines: convert to PNG at the start, do all editing in lossless territory, and export to JPG only as the final delivery step. This way the lossy step happens exactly once, at the end, instead of once per edit.",
            "Archives and masters benefit for a different reason: formats drift and software ages, but PNG's lossless pixel data is the most durable representation of what the file actually contains. Converting your best copy to PNG is a small insurance policy against future re-compression mistakes.",
            "As everywhere on this site, the conversion runs locally in your browser — decode, encode and download happen on your device with no upload. Converting personal photos or client masters therefore never exposes them to a third-party server.",
          ],
        },
      ],
    },
    zh: {
      name: "JPG 转 PNG",
      tagline: "JPG 一键转 PNG,无损输出、支持批量——免费、私密、不上传,整个流程都在浏览器里完成。",
      intro: [
        "拖入 .jpg 文件,一键得到逐像素一致的 .png 副本。PNG 无进一步损失地保存画面,是二次编辑、归档,以及那些不接受 JPEG 的平台或工具的首选格式。",
        "批量模式一次转换整叠照片,并逐张显示转换后的体积。注意 PNG 通常比 JPG 更大——这是无损存储的正常代价,不是转换出了问题。",
      ],
      steps: [
        "拖入 JPG 图片(或点击选择),支持多张。",
        "稍等片刻,每个文件都在本地完成转换。",
        "逐张或一键下载 PNG。",
      ],
      faqs: [
        {
          q: "转出来的 PNG 会比 JPG 更清晰吗?",
          a: "不会——画面完全一样。转换无法撤销已经发生的压缩,PNG 只是把当前观感无损保存,以后再编辑、再保存也不会叠加新噪点。它的价值在流程,不在画质提升。",
        },
        {
          q: "为什么 PNG 比原来的 JPG 大?",
          a: "JPG 为照片设计了激进的有损压缩,而 PNG 逐像素精确存储,同样的画面用 PNG 存自然更大。如果体积比无损编辑更重要,JPG 或 WebP 才是更合适的目标。",
        },
        {
          q: "JPG 转 PNG 会获得透明背景吗?",
          a: "不会。JPEG 本身不存透明通道,也就无透明可恢复——转换出的 PNG 是完全不透明的。要抠掉背景需要专门的抠图工具。",
        },
      ],
      deepDive: [
        {
          heading: "JPG 转 PNG 能恢复什么,不能恢复什么",
          paragraphs: [
            "先接受一个事实:JPG 转 PNG 不会让图片变好。PNG 是无损格式,但它只能保住已经存在的东西——而 JPG 里存在的东西,已经是有损压缩的结果。文件里烙下的伪影会原样走进 PNG。",
            "转换真正提供的是一个安全的未来。PNG 精确保存每个像素,所以从转换那一刻起,编辑、裁剪、反复保存都不再损失画质。继续把 JPG 当工作母本,意味着每次保存都在重复压缩、叠加损伤。",
            "所以正确的心智模型是“定格”:当 JPG 是你手里最好的版本,而且你打算继续编辑、归档或反复导出时,转换才值得。把它当“画质提升”则毫无意义——没有任何人能从 PNG 里看出变好。",
          ],
        },
        {
          heading: "体积预期与格式行为",
          paragraphs: [
            "要有文件变大的心理准备。JPEG 靠聪明的压缩丢掉数据,而 PNG 必须忠实地存下所有东西,所以同一张图的 PNG 通常比 JPG 大好几倍——PNG 付出的是精确的代价,连 JPG 留下的每个伪影都要如实记录。",
            "对照片内容,这个体积通常不值得付出,除非你确实需要:照片分享用 JPG;当图片进入会反复保存的编辑流程时,再转成 PNG。",
            "转换真正出彩的是混合情形:带文字或平面图形、却错误存成 JPG 的图。它们已经受损,但用 PNG 定格能阻止损伤随着每次编辑和保存继续扩大。",
          ],
        },
        {
          heading: "编辑工作流与本地处理",
          paragraphs: [
            "编辑管线的实用规则:开头转成 PNG,所有编辑都在无损地带完成,最后交付时才导出 JPG。这样有损环节只发生一次——在结尾——而不是每次编辑都发生一次。",
            "归档和母本出于另一个理由受益:格式会过时、软件会老去,而 PNG 的无损像素数据是对文件实际内容最耐久的表达。把最好的副本转成 PNG,是对未来某次误压缩的小额保险。",
            "和站内所有地方一样,转换在浏览器本地运行——解码、编码、下载都在你的设备上,无上传。转换个人照片或客户母本,因此永远不会把它们暴露给第三方服务器。",
          ],
        },
      ],
    },
    ja: {
      name: "JPG から PNG へ変換",
      tagline:
        "JPG 写真をワンクリックで PNG に変換。ロスレス出力と一括処理に対応——無料・非公開・アップロードなし、すべてブラウザ内で完結します。",
      intro: [
        ".jpg ファイルをドロップすれば、ピクセル単位で一致する .png を一発で生成します。PNG はそれ以上劣化せずに画像を保存できるため、再編集・アーカイブ、JPEG を受け付けないプラットフォームやツールに最適です。",
        "一括モードなら大量の写真も一気に変換し、ファイルごとのサイズを表示します。PNG は通常 JPG より大きくなりますが、それはロスレス保存の正当な代償であって、変換の欠陥ではありません。",
      ],
      steps: [
        "JPG 画像をドロップ(またはクリックして選択)。複数枚 OK です。",
        "各ファイルがローカルで変換されるのを少しだけお待ちください。",
        "PNG を 1 枚ずつ、またはまとめてダウンロードします。",
      ],
      faqs: [
        {
          q: "変換後の PNG は JPG より綺麗に見えますか?",
          a: "いいえ——見た目は同じです。変換はすでに起きた圧縮を取り消せません。PNG は現在の見た目をロスレスで保存するだけで、後で編集や再保存をしても新たなノイズが乗りません。画質向上ではなくワークフローのための変換です。",
        },
        {
          q: "PNG が元の JPG より大きくなるのはなぜ?",
          a: "JPG は写真向けの強力な非可逆圧縮、PNG は全ピクセルを完全に記録します。同じ絵なら PNG の方が大きくなるのは自然なことです。サイズ重視なら JPG か WebP を選びましょう。",
        },
        {
          q: "JPG から PNG に変えると透明になりますか?",
          a: "なりません。JPEG は透明情報を保存しないため、復元できるものがありません。変換後の PNG は完全に不透明です。背景を切り抜くには専用の背景除去ツールが必要です。",
        },
      ],
      deepDive: [
        {
          heading: "JPG→PNG で回復すること、できないこと",
          paragraphs: [
            "まず受け入れる事実:JPG を PNG に変換しても画像は良くなりません。PNG は可逆ですが、存在するものしか保存できず、JPG に存在するものはすでに非可逆圧縮の結果です。ファイルに焼き付いたアーティファクトはそのまま PNG に移ります。",
            "変換が本当に与えるのは「安全な未来」です。PNG はすべてのピクセルを正確に保持するため、変換後は編集・トリミング・再保存が画質を一切消耗しません。JPG を作業マスターにしたままなら、保存のたびに再圧縮が損傷を積み重ねます。",
            "だから正しい mental model は「固定」です:JPG が手持ちの最良コピーで、これから編集・アーカイブ・再書き出しを続けるつもりなら変換は価値があります。「見た目が改善する」という期待は無意味で、PNG を見て改善を確認できる人はいません。",
          ],
        },
        {
          heading: "サイズの予想とフォーマットの挙動",
          paragraphs: [
            "ファイルが大きくなることを織り込んでください。JPEG の巧みな圧縮が捨てたデータを PNG は忠実に保存しなければならず、同じ絵の PNG は通常 JPG の数倍——PNG は正確さの対価を払い、JPG が残したアーティファクトまで記録します。",
            "写真系ではこのサイズを払う価値は通常ありません:共有には JPG を使い、繰り返し保存で劣化し得る編集ワークフローに入るときだけ PNG に変換します。",
            "変換が真価を発揮するのは混在ケースです:文字やフラットなグラフィックを含むのに誤って JPG で保存された画像。すでに損傷していますが、PNG に固定すれば、追加の編集・保存のたびに損傷が増えることは止まります。",
          ],
        },
        {
          heading: "編集ワークフローとローカル処理",
          paragraphs: [
            "編集パイプラインの実務ルール:最初に PNG へ変換し、すべての編集を可逆の領域で行い、最終納品の時点でのみ JPG へ書き出す。これにより非可逆の工程は一度きり——最後に——発生し、編集のたびに発生するのを防げます。",
            "アーカイブとマスターには別の理由があります:フォーマットは移り変わり、ソフトは古くなりますが、PNG の可逆ピクセルデータは「ファイルが実際に含むもの」の最も耐久性ある表現です。最良コピーを PNG にしておくのは、将来の再圧縮ミスへの小さな保険です。",
            "このサイトのどこでも同様に、変換はブラウザ内でローカルに実行されます——デコード、エンコード、ダウンロードは端末上で、アップロードなし。個人写真やクライアントのマスターの変換が第三者のサーバーに露出することはありません。",
          ],
        },
      ],
    },
    es: {
      name: "JPG a PNG",
      tagline:
        "Convierte fotos JPG a PNG al instante con salida sin pérdida y lotes — gratis, privado y sin subidas, directamente en tu navegador.",
      intro: [
        "Suelta tus archivos .jpg y obtén copias .png idénticas píxel a píxel en un clic. PNG guarda la imagen sin más pérdidas, lo que lo hace ideal para reeditar, archivar o para plataformas y herramientas que rechazan archivos JPEG.",
        "El modo por lotes convierte una pila entera de fotos de una pasada y muestra el tamaño resultante de cada archivo. Ten en cuenta que PNG suele ocupar más que JPG: es el precio del almacenamiento sin pérdida, no un defecto.",
      ],
      steps: [
        "Suelta tus imágenes JPG (o haz clic para explorar) — varios archivos son bienvenidos.",
        "Espera un momento mientras cada archivo se convierte localmente.",
        "Descarga los PNG individualmente o todos a la vez.",
      ],
      faqs: [
        {
          q: "¿El PNG se verá mejor que el JPG?",
          a: "No — se verá igual. La conversión no puede deshacer una compresión ya aplicada; el PNG solo conserva la apariencia actual sin añadir artefactos nuevos si lo editas y guardas después. Úsalo por flujo de trabajo, no por una mejora de calidad.",
        },
        {
          q: "¿Por qué mi PNG pesa más que el JPG original?",
          a: "JPG usa una compresión con pérdida muy agresiva pensada para fotos, mientras PNG almacena cada píxel exactamente. La misma imagen ocupa más como PNG. Si el tamaño importa más que la edición sin pérdida, JPG o WebP es mejor destino.",
        },
        {
          q: "¿Convertir JPG a PNG añade transparencia?",
          a: "No. JPEG nunca almacena transparencia, así que no hay nada que recuperar: tu PNG convertido es totalmente opaco. Para quitar un fondo necesitarías una herramienta específica de eliminación de fondo.",
        },
      ],
      deepDive: [
        {
          heading: "Qué puede y no puede recuperar el paso de JPG a PNG",
          paragraphs: [
            "El primer hecho que hay que aceptar: convertir JPG a PNG no mejora la imagen. PNG es sin pérdida, pero solo puede conservar lo que existe — y lo que existe en un JPG ya es el resultado de una compresión con pérdida. Los artefactos horneados en el archivo viajan al PNG intactos.",
            "Lo que la conversión sí proporciona es un futuro seguro. Un PNG guarda cada píxel exactamente, así que desde el momento de la conversión en adelante, editar, recortar y volver a guardar no cuesta nada de calidad. Mantener un JPG como máster de trabajo significa que cada guardado vuelve a comprimir y acumula el daño.",
            "El modelo mental correcto es \"estabilizar\": la conversión merece la pena cuando el JPG es tu mejor copia y piensas seguir editándolo, archivándolo o reexportándolo. Como afirmación cosmética no tiene sentido — nadie puede mirar el PNG y ver una mejora.",
          ],
        },
        {
          heading: "Expectativas de tamaño y comportamiento del formato",
          paragraphs: [
            "Espera que el archivo crezca. La astuta compresión de JPEG descarta datos que PNG debe guardar fielmente, así que la misma imagen como PNG suele pesar varias veces más que el JPG — el PNG paga la exactitud, incluido el registro de cada artefacto que el JPG dejó.",
            "Para contenido fotográfico ese tamaño no suele valer la pena salvo que lo necesites: mantén las fotos en JPG para compartir, y convierte a PNG cuando la imagen entra en un flujo de edición donde los guardados repetidos la degradarían.",
            "Donde la conversión brilla de verdad es en un caso mixto: imágenes con texto o gráficos planos que se guardaron incorrectamente como JPG. Ya están dañadas, pero congelarlas en PNG evita que el daño crezca con cada edición o guardado adicional.",
          ],
        },
        {
          heading: "Flujos de edición y procesado local",
          paragraphs: [
            "La regla práctica para pipelines de edición: convierte a PNG al principio, haz toda la edición en terreno sin pérdida y exporta a JPG solo como paso final de entrega. Así el paso con pérdida ocurre exactamente una vez, al final, en lugar de una vez por edición.",
            "Los archivos y másters se benefician por otra razón: los formatos cambian y el software envejece, pero los datos de píxeles sin pérdida de PNG son la representación más duradera de lo que el archivo contiene realmente. Convertir tu mejor copia a PNG es un pequeño seguro contra futuros errores de recompresión.",
            "Como en todo el sitio, la conversión se ejecuta localmente en tu navegador — decodificar, codificar y descargar ocurren en tu dispositivo sin subida. Convertir fotos personales o másters de clientes nunca los expone a un servidor de terceros.",
          ],
        },
      ],
    },
    pt: {
      name: "JPG para PNG",
      tagline:
        "Converta fotos JPG em PNG na hora, com saída sem perdas e lote — grátis, privado e sem upload, direto no seu navegador.",
      intro: [
        "Solte seus arquivos .jpg e receba cópias .png idênticas pixel a pixel num clique. O PNG guarda a imagem sem novas perdas, o que o torna ideal para reeditar, arquivar ou para plataformas e ferramentas que rejeitam JPEG.",
        "O modo em lote converte uma pilha inteira de fotos numa passada e mostra o tamanho resultante de cada arquivo. Note que o PNG costuma ficar maior que o JPG — esse é o preço do armazenamento sem perdas, não um defeito.",
      ],
      steps: [
        "Solte suas imagens JPG (ou clique para escolher) — vários arquivos são bem-vindos.",
        "Aguarde um instante enquanto cada arquivo é convertido localmente.",
        "Baixe os PNGs individualmente ou todos de uma vez.",
      ],
      faqs: [
        {
          q: "O PNG vai ficar melhor que o JPG?",
          a: "Não — vai ficar igual. A conversão não pode desfazer uma compressão já aplicada; o PNG apenas preserva a aparência atual sem adicionar artefatos novos se você editar e salvar depois. Use pelo fluxo de trabalho, não por ganho de qualidade.",
        },
        {
          q: "Por que meu PNG é maior que o JPG original?",
          a: "O JPG usa compressão com perdas agressiva, feita para fotos, enquanto o PNG armazena cada pixel exatamente. A mesma imagem ocupa mais espaço em PNG. Se o tamanho importa mais que a edição sem perdas, JPG ou WebP é o destino melhor.",
        },
        {
          q: "Converter JPG para PNG adiciona transparência?",
          a: "Não. O JPEG nunca armazena transparência, então não há nada a recuperar — seu PNG convertido é totalmente opaco. Para recortar um fundo você precisaria de uma ferramenta específica de remoção de fundo.",
        },
      ],
      deepDive: [
        {
          heading: "O que JPG para PNG pode e não pode recuperar",
          paragraphs: [
            "O primeiro fato a aceitar: converter JPG para PNG não melhora a imagem. O PNG é sem perdas, mas só pode conservar o que existe — e o que existe num JPG já é resultado de compressão com perdas. Os artefatos gravados no arquivo viajam para o PNG intactos.",
            "O que a conversão realmente fornece é um futuro seguro. Um PNG guarda cada pixel exatamente, então a partir do momento da conversão em diante, editar, recortar e salvar de novo não custa nada em qualidade. Manter um JPG como master de trabalho significa que cada salvamento recomprime e acumula o dano.",
            "O modelo mental certo é \"estabilizar\": a conversão vale a pena quando o JPG é sua melhor cópia e você pretende continuar editando, arquivando ou reexportando. Como alegação estética não faz sentido — ninguém consegue olhar o PNG e ver melhora.",
          ],
        },
        {
          heading: "Expectativas de tamanho e comportamento do formato",
          paragraphs: [
            "Espere que o arquivo cresça. A compressão esperta do JPEG descarta dados que o PNG precisa guardar fielmente, então a mesma imagem como PNG costuma pesar várias vezes mais que o JPG — o PNG paga pela exatidão, inclusive registrando cada artefato que o JPG deixou.",
            "Para conteúdo fotográfico esse tamanho normalmente não vale a pena a menos que você precise: mantenha fotos em JPG para compartilhar, e converta para PNG quando a imagem entrar num fluxo de edição onde salvamentos repetidos a degradariam.",
            "Onde a conversão realmente brilha é num caso misto: imagens com texto ou gráficos planos que foram salvas incorretamente como JPG. Elas já estão danificadas, mas congelá-las em PNG impede que o dano cresça a cada edição ou salvamento adicional.",
          ],
        },
        {
          heading: "Fluxos de edição e processamento local",
          paragraphs: [
            "A regra prática para pipelines de edição: converta para PNG no início, faça toda a edição em território sem perdas e exporte para JPG só como passo final de entrega. Assim o passo com perdas acontece exatamente uma vez, no fim, em vez de uma vez por edição.",
            "Arquivos e masters se beneficiam por outro motivo: formatos mudam e software envelhece, mas os dados de pixels sem perdas do PNG são a representação mais duradoura do que o arquivo realmente contém. Converter sua melhor cópia para PNG é um pequeno seguro contra futuros erros de recompressão.",
            "Como em todo o site, a conversão roda localmente no seu navegador — decodificar, codificar e baixar acontecem no seu dispositivo sem envio. Converter fotos pessoais ou masters de clientes nunca os expõe a um servidor de terceiros.",
          ],
        },
      ],
    },
  },
});
