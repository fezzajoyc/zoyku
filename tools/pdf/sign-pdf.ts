import { PdfSignEngine } from "../_engines/pdf-engine-sign";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "sign-pdf",
  category: "pdf",
  icon: "check",
  engine: { component: PdfSignEngine },
  related: ["watermark-pdf", "merge-pdf", "split-pdf", "rotate-pdf", "pdf-to-word", "delete-pdf-pages", "pdf-to-ppt", "compress-pdf", "ocr-pdf", "pdf-to-text"],
  copy: {
    en: {
      name: "Sign PDF",
      tagline:
        "Draw your signature with a mouse or finger and place it on any PDF page — a natural ink-style stamp created and saved fully offline.",
      intro: [
        "Sign contracts, permission slips and forms without printing them. Draw your signature on the pad, position it on a 3×3 grid (bottom right is the usual spot), set its width, and optionally add today's date underneath. The transparent PNG is embedded straight into the PDF.",
        "This is a visible, image-based signature — perfect for everyday documents. It is not a cryptographic certificate signature, and whether it satisfies a given legal process depends on your jurisdiction.",
      
        "The signature is drawn on a canvas pad, exported as a transparent PNG, and embedded into the PDF via pdf-lib — positioned on a 3×3 grid relative to the page with an adjustable width, plus an optional date line. Because it is an image stamp, it renders identically in every viewer and prints without surprises.",
        "Compared with printing, signing and rescanning (which produces a huge raster file and destroys the searchable text), the stamp adds a few kilobytes and leaves the original PDF intact. The honesty note: this is a visible signature, not a cryptographic certificate — for workflows that require certificate-level non-repudiation, a dedicated signing service is the right tool.",
      ],
      steps: [
        "Drop the PDF, then draw your signature on the pad.",
        "Choose the position, width and target page (1 by default).",
        "Click Sign & download and save the signed PDF.",
      ],
      faqs: [
        {
          q: "Is this signature legally binding?",
          a: "A drawn signature image is widely accepted for everyday agreements, but legal weight varies by country and document type. For transactions that require one, use a qualified digital certificate instead.",
        },
        {
          q: "Is the signature secure here?",
          a: "Yes. You draw in the browser, the image is embedded into the PDF on your own device, and nothing is transmitted — not even the signature itself.",
        },
        {
          q: "Can I sign every page of the document?",
          a: "Yes. Fill the pages field with a list such as “1-5” or leave a single page; the signature is stamped in the same position on each selected page.",
        },
      ],
      deepDive: [
        {
          heading: "What this signature actually is — and is not",
          paragraphs: [
            "This tool adds a drawn or typed signature image onto a page — the way you would sign a printout by hand. It is an electronic signature in the broad everyday sense: visible ink on the document, placed by you, from your own device. It is not a digital certificate signature: there is no cryptographic key pair, no certificate authority, and no tamper-detection that a viewer can verify.",
            "The distinction matters for legal purposes. Many jurisdictions accept simple electronic signatures for most everyday agreements (employment paperwork, supplier forms, internal approvals), while specific classes of documents may require qualified digital signatures with a certificate. If your counterparty or the law requires a certificate-based signature, this tool is not that — use a qualified signing service.",
            "What it does give you: a fast, zero-cost way to sign documents without printing, scanning and emailing paper, while keeping the document entirely on your machine. For the enormous volume of everyday sign-offs where a visible signature suffices, that covers the real need.",
          ],
        },
        {
          heading: "Getting a signature that looks like you",
          paragraphs: [
            "A drawn signature with a mouse usually looks worse than your real hand signature. If the result matters visually, two practical options: draw on a touchscreen if you have one, or sign a piece of white paper, photograph it, crop it tightly, and use the image. A photographed signature on plain white paper imports cleanly and looks exactly like your hand.",
            "Placement is half the craft: the signature should sit where a signature belongs — above or beside the signature line, not floating in whitespace. Zoom to the signature area, place it precisely, and resize so its scale matches the document's text; a signature the size of a paragraph looks pasted-on. Check the next page too if fields continue there.",
            "Understand what you are signing: because this is an image overlay, it does not lock the document. Anyone with the file can remove the image or edit the text around it. Sign a final version — flatten and finalize first — and send it in a form you control (PDF, not an editable draft), so what was signed is what circulates.",
          ],
        },
        {
          heading: "Signing is the most private act; keep it local",
          paragraphs: [
            "A signature is the single most identity-laden act performed on a document — more personal than the content itself. Handing your signature image to a signing website means a copy of your handwritten signature sits on someone else's server: a reusable artifact of your identity that could be lifted and pasted onto other documents. Very few people would hand a sheet of their signatures to a stranger; uploading one is the same act with better optics.",
            "This tool signs entirely in your browser: the document is processed on your device, the signature is drawn into the page locally, and the signed file is saved by your machine. The signature image is used in memory and never transmitted, and the whole operation works offline.",
            "One habit worth adopting when signing locally: keep your signature source (photo or drawing) in a private folder rather than your general downloads, and produce the signed PDF per document. That way the reusable signature artifact exists in exactly one place you control, and each signed document is a distinct final file — no shared intermediates floating around.",
          ],
        },
      ],
    },
    zh: {
      name: "PDF 签名",
      tagline: "用鼠标或手指手写签名,放到 PDF 的任意页面——墨迹自然的图片签名,从绘制到保存全程离线。",
      intro: [
        "合同、许可单、表格不用打印也能签。在画板上手写签名,用 3×3 网格选位置(右下角最常用),调整宽度,还可以选择在签名下方自动加上当天日期。透明 PNG 会直接嵌入 PDF。",
        "这是可见的图片签名,适合日常文件;不是基于数字证书的加密签名。是否满足特定法律流程,取决于你所在地区的规定。",
      ],
      steps: [
        "拖入 PDF,然后在画板上手写签名。",
        "选择位置、宽度和目标页(默认第 1 页)。",
        "点击“签署并下载”,保存签名后的 PDF。",
      ],
      faqs: [
        {
          q: "这种签名具有法律效力吗?",
          a: "手绘签名图片在日常协议中被广泛接受,但法律效力因国家和地区、文件类型而异。需要更强效力的场景请使用合规的数字证书签名。",
        },
        {
          q: "签名过程安全吗?",
          a: "安全。手绘在浏览器里完成,图片直接嵌入你设备上的 PDF,任何数据——包括签名本身——都不会被传输。",
        },
        {
          q: "可以给每一页都签名吗?",
          a: "可以。在页码框填入“1-5”这样的列表,签名会以相同位置盖在每个选中页面上;填单个页码则只签一页。",
        },
      ],
      deepDive: [
        {
          heading: "这个签名到底是什么、不是什么",
          paragraphs: [
            "本工具是把一个手绘或输入的签名图像放到页面上——就像你亲手在打印件上签字。它在广义的日常意义上是电子签名:文档上有可见的墨迹,由你、用你自己的设备放置。它不是数字证书签名:没有密钥对、没有证书机构、没有阅读器可以验证的防篡改机制。",
            "这个区别在法律意义上重要。多数法域对大部分日常协议(人事文件、供应商表单、内部审批)接受简单电子签名,而特定类别的文件可能要求带证书的合格数字签名。如果对方或法律要求基于证书的签名,本工具不是那个——请使用合格的签署服务。",
            "它真正给你的是:一份不打印、不扫描、不用邮件传纸面文件就能签完的零成本方案,而且文档全程留在你的机器上。对日常大量的“可见签名即可”的签署场景,这就覆盖了真实需求。",
          ],
        },
        {
          heading: "让签名看起来像你自己",
          paragraphs: [
            "用鼠标画的签名通常不如你真手写的。如果观感重要,两个实用选项:有触屏就用触屏画;或者在白纸上签字、拍照、裁得紧凑些、用这张图。普通白纸上拍下的签名导入干净,看起来和你手写的一模一样。",
            "摆放占一半功夫:签名应该放在签名该在的地方——签名线上方或旁边,而不是漂在空白里。缩放到签名区,精确放置,缩放大小和文档文字匹配;段落大小的签名看着像贴上去的。如果签字栏延续到下一页,下一页也要检查。",
            "弄清你在签什么:因为这是图像叠加,它不锁定文档。任何拿到文件的人都能移除这张图或改它周围的文字。签定稿——先展平、先定稿——并用你可控的形式发送(PDF,不是可编辑草稿),让被签署的就是流通的版本。",
          ],
        },
        {
          heading: "签署是最私密的行为;让它留在本地",
          paragraphs: [
            "签名是对文档进行的、身份感最重的单一行为——比内容本身更私人。把手写签名图像交给签署网站,意味着一份你的手写签名副本躺在别人的服务器上:一个可以取下、贴到别的文档上的可复用身份工件。很少有人会把一整页自己的签名递给陌生人;上传一张,本质是同一件事,只是观感好些。",
            "本工具完全在浏览器里签署:文档在你设备上处理,签名本地画进页面,签好的文件由你的机器保存。签名图像只在内存里使用、从不传输,整个操作离线可用。",
            "本地签署有个值得养成的习惯:把签名源文件(照片或手绘图)放在专门的私密文件夹而不是通用下载目录,并按文档逐份产出签好的 PDF。这样,可复用的签名工件只存在于你掌控的唯一一处,每份签好的文档都是独立的定稿文件——不会有共享的中间件四处漂浮。",
          ],
        },
      ],
    },
    ja: {
      name: "PDF 署名",
      tagline: "マウスや指で手書き署名を描き、PDF の任意のページに配置。インクのような自然な画像署名を、描いてから保存まで完全オフラインで。",
      intro: [
        "契約書や同意書、申込書を印刷せずに署名しましょう。パッドに署名を描き、3×3 のグリッドで位置を選び(右上ではなく右下が定番)、幅を調整。必要ならその下に当日の日付を追加できます。透過 PNG がそのまま PDF に埋め込まれます。",
        "これは可視的な画像署名で、日常的な文書に最適です。暗号学的な証明書署名ではないため、法的な有効性は管轄や文書の種類によります。",
      ],
      steps: [
        "PDF をドロップし、パッドに署名を描きます。",
        "位置・幅・対象ページ(既定は 1 ページ)を選びます。",
        "「署名してダウンロード」をクリックし、PDF を保存します。",
      ],
      faqs: [
        {
          q: "この署名に法的効力はありますか?",
          a: "手描きの署名画像は日常的な合意で広く受け入れられていますが、効力は国や文書の種類によって異なります。必要な取引では適格なデジタル証明書をご利用ください。",
        },
        {
          q: "署名は安全ですか?",
          a: "はい。描画はブラウザ内で行われ、画像は端末上の PDF に埋め込まれます。署名自体を含め、何も送信されません。",
        },
        {
          q: "全ページに署名できますか?",
          a: "できます。ページ欄に「1-5」のようなリストを入力すると、選択した各ページの同じ位置に署名が押されます。1 ページだけの指定も可能です。",
        },
      ],
      deepDive: [
        {
          heading: "この署名が実際に何であり、何でないか",
          paragraphs: [
            "このツールは、手描きまたは入力した署名画像をページに載せます——印刷物に手で署名するのと同じやり方です。これは広い日常的な意味での電子署名です。文書に見えるインクが、あなたが、自分の端末から置いた。電子証明書によるデジタル署名ではありません。鍵対も、認証局も、ビューアが検証できる改ざん検知もありません。",
            "この区別は法的な目的で重要です。多くの法域では、ほとんどの日常的な合意(雇用書類、仕入先フォーム、社内承認)に単純な電子署名が認められますが、特定の種類の文書は証明書付きの適格なデジタル署名を要求することがあります。相手方や法律が証明書ベースの署名を要求するなら、このツールはそれではありません。適格な署名サービスを使ってください。",
            "実際に得られるものはこうです。印刷して、走査して、紙をメールで送ることなく、文書を丸ごと自分のマシンに置いたまま、素早く無償で署名する方法。可視の署名で足りる日常の膨大な承認には、これが本物の需要を覆います。",
          ],
        },
        {
          heading: "あなたらしく見える署名にする",
          paragraphs: [
            "マウスで描いた署名は、たいてい本物の手書きより見栄えが落ちます。見た目が重要なら、実用的な選択肢が二つあります。タッチスクリーンがあればそれで描く。あるいは白い紙に署名し、写真を撮り、きつく切り抜き、その画像を使う。白紙に撮った署名はきれいに取り込まれ、あなたの手書きそのものに見えます。",
            "配置が腕の半分を占めます。署名は署名のあるべき場所——署名欄の上か隣——に置くべきで、空白に浮いているのは違います。署名エリアへズームし、正確に置き、文書のテキストに合うよう大きさを調整します。段落一つ分の大きさの署名は、貼り付けたように見えます。署名欄が次のページに続くなら、そこも確認してください。",
            "何に署名しているのかを理解してください。これが画像オーバーレイである以上、文書はロックされません。ファイルを持つ者なら誰でも、画像を取り除き、周囲のテキストを編集できます。最終版に署名する——まずフラット化し仕上げる——そして自分の制御する形(PDF であって編集可能な草案ではない)で送る。署名されたものが流通するものになるように。",
          ],
        },
        {
          heading: "署名は最も私的な行為。ローカルに保つ",
          paragraphs: [
            "署名は、文書に対して行われる行為の中で最もアイデンティティの重い単一の行為です。内容そのものより私的です。署名画像を署名サイトに渡すことは、あなたの手書き署名のコピーが他人のサーバーに座ることを意味します。取り上げて別の文書に貼り得る、あなたのアイデンティティの再利用可能な成果物です。自分の署名の書かれた一枚を他人に手渡す人はほとんどいません。一枚アップロードすることは、見た目が良いだけで同じ行為です。",
            "このツールは署名を完全にブラウザ内で行います。文書は端末上で処理され、署名はローカルでページに描き込まれ、署名済みファイルはあなたのマシンが保存します。署名画像はメモリ内で使われ、決して送信されず、操作全体はオフラインで動きます。",
            "ローカルで署名する際に採る価値のある習慣:署名のソース(写真か描画)を汎用のダウンロードではなく専用の私的フォルダに置き、署名済み PDF を文書ごとに作る。こうすれば再利用可能な署名の成果物は、あなたが制御するただ一つの場所にのみ存在し、各署名済み文書は独立した最終ファイルになります。共有の中間物があちこちに浮かぶことはありません。",
          ],
        },
      ],
    },
    es: {
      name: "Firmar PDF",
      tagline:
        "Dibuja tu firma con el ratón o el dedo y colócala en cualquier página del PDF: un sello con aspecto de tinta, creado y guardado sin conexión.",
      intro: [
        "Firma contratos, autorizaciones y formularios sin imprimirlos. Dibuja tu firma en el recuadro, colócala en la cuadrícula 3×3 (abajo a la derecha es lo habitual), ajusta su ancho y añade la fecha de hoy si quieres. El PNG transparente se incrusta directamente en el PDF.",
        "Es una firma visible basada en imagen, ideal para documentos cotidianos. No es una firma criptográfica con certificado, y su validez en un trámite concreto depende de tu jurisdicción.",
      ],
      steps: [
        "Suelta el PDF y dibuja tu firma en el recuadro.",
        "Elige posición, ancho y página destino (la 1 por defecto).",
        "Pulsa Firmar y descargar y guarda el PDF firmado.",
      ],
      faqs: [
        {
          q: "¿Esta firma es legalmente vinculante?",
          a: "Una imagen de firma dibujada se acepta de forma generalizada en acuerdos cotidianos, pero su peso legal varía según el país y el tipo de documento. Para operaciones que lo exijan, usa un certificado digital cualificado.",
        },
        {
          q: "¿Es segura la firma aquí?",
          a: "Sí. Dibujas en el navegador, la imagen se incrusta en el PDF de tu propio dispositivo y no se transmite nada, ni siquiera la firma.",
        },
        {
          q: "¿Puedo firmar todas las páginas?",
          a: "Sí. Escribe en el campo de páginas una lista como “1-5” o indica una sola; la firma se estampa en la misma posición de cada página seleccionada.",
        },
      ],
      deepDive: [
        {
          heading: "Lo que esta firma realmente es — y no es",
          paragraphs: [
            "Esta herramienta añade una imagen de firma dibujada o escrita sobre la página — la forma en que firmarías una copia impresa a mano. Es una firma electrónica en el sentido amplio y cotidiano: tinta visible en el documento, colocada por ti, desde tu propio dispositivo. No es una firma digital con certificado: no hay par de claves criptográficas, ni autoridad certificadora, ni detección de manipulación verificable por un visor.",
            "La distinción importa para fines legales. Muchas jurisdicciones aceptan firmas electrónicas simples para la mayoría de los acuerdos cotidianos (papeleo de empleo, formularios de proveedores, aprobaciones internas), mientras que clases específicas de documentos pueden exigir firmas digitales cualificadas con certificado. Si tu contraparte o la ley exige firma basada en certificado, esta herramienta no es eso — usa un servicio de firma cualificado.",
            "Lo que sí te da: una forma rápida y sin coste de firmar documentos sin imprimir, escanear y enviar papel por correo, manteniendo el documento por completo en tu máquina. Para el enorme volumen de aprobaciones cotidianas donde basta una firma visible, eso cubre la necesidad real.",
          ],
        },
        {
          heading: "Conseguir una firma que se parezca a ti",
          paragraphs: [
            "Una firma dibujada con ratón suele verse peor que tu firma real a mano. Si el aspecto importa, dos opciones prácticas: dibuja en una pantalla táctil si tienes, o firma un papel blanco, fotografíalo, recórtalo ajustado y usa la imagen. Una firma fotografiada sobre papel blanco se importa limpia y se ve exactamente como tu mano.",
            "La colocación es la mitad del oficio: la firma debe estar donde corresponde una firma — sobre o junto a la línea de firma, no flotando en espacio en blanco. Haz zoom a la zona de firma, colócala con precisión y ajusta el tamaño para que su escala coincida con el texto del documento; una firma del tamaño de un párrafo parece pegada. Revisa también la página siguiente si los campos continúan ahí.",
            "Entiende lo que firmas: como es una superposición de imagen, no bloquea el documento. Cualquiera con el archivo puede quitar la imagen o editar el texto alrededor. Firma una versión final — aplana y finaliza primero — y envíala en una forma que controles (PDF, no un borrador editable), para que lo firmado sea lo que circula.",
          ],
        },
        {
          heading: "Firmar es el acto más privado; mantenlo local",
          paragraphs: [
            "La firma es el acto más cargado de identidad que se realiza sobre un documento — más personal que el propio contenido. Entregar tu imagen de firma a un sitio de firmas significa que una copia de tu firma manuscrita descansa en el servidor de otra persona: un artefacto reutilizable de tu identidad que podría extraerse y pegarse en otros documentos. Muy pocos entregarían a un desconocido una hoja con sus firmas; subir una es el mismo acto con mejor imagen.",
            "Esta herramienta firma por completo en tu navegador: el documento se procesa en tu dispositivo, la firma se dibuja en la página en local, y el archivo firmado lo guarda tu máquina. La imagen de firma se usa en memoria y nunca se transmite, y toda la operación funciona sin conexión.",
            "Un hábito que vale adoptar al firmar en local: guarda tu fuente de firma (foto o dibujo) en una carpeta privada en vez de tus descargas generales, y produce el PDF firmado por documento. Así el artefacto reutilizable de la firma existe exactamente en un lugar que controlas, y cada documento firmado es un archivo final distinto — sin intermediarios compartidos flotando por ahí.",
          ],
        },
      ],
    },
    pt: {
      name: "Assinar PDF",
      tagline:
        "Desenhe sua assinatura com o mouse ou o dedo e coloque em qualquer página do PDF — um selo com aparência de tinta, criado e salvo offline.",
      intro: [
        "Assine contratos, autorizações e formulários sem imprimir nada. Desenhe sua assinatura no quadro, posicione na grade 3×3 (embaixo à direita é o usual), ajuste a largura e, se quiser, adicione a data de hoje abaixo. O PNG transparente é embutido direto no PDF.",
        "Esta é uma assinatura visível baseada em imagem — ótima para documentos do dia a dia. Não é uma assinatura criptográfica com certificado, e o valor jurídico depende da sua jurisdição.",
      ],
      steps: [
        "Solte o PDF e desenhe sua assinatura no quadro.",
        "Escolha posição, largura e página de destino (a 1 por padrão).",
        "Clique em Assinar e baixar para salvar o PDF assinado.",
      ],
      faqs: [
        {
          q: "Essa assinatura tem validade legal?",
          a: "Uma imagem de assinatura desenhada é amplamente aceita em acordos cotidianos, mas o peso legal varia por país e tipo de documento. Para transações que exijam, use um certificado digital qualificado.",
        },
        {
          q: "A assinatura é segura aqui?",
          a: "Sim. Você desenha no navegador, a imagem é embutida no PDF no seu próprio dispositivo e nada é transmitido — nem a própria assinatura.",
        },
        {
          q: "Posso assinar todas as páginas do documento?",
          a: "Sim. Preencha o campo de páginas com uma lista como “1-5” ou indique uma única; a assinatura é aplicada na mesma posição em cada página selecionada.",
        },
      ],
      deepDive: [
        {
          heading: "O que esta assinatura realmente é — e não é",
          paragraphs: [
            "Esta ferramenta coloca uma imagem de assinatura desenhada ou digitada sobre a página — do jeito que você assinaria uma via impressa à mão. É uma assinatura eletrônica no sentido amplo e cotidiano: tinta visível no documento, colocada por você, do seu próprio dispositivo. Não é assinatura digital com certificado: não há par de chaves criptográficas, nem autoridade certificadora, nem detecção de violação verificável por um visualizador.",
            "A distinção importa para fins legais. Muitas jurisdições aceitam assinaturas eletrônicas simples para a maioria dos acordos cotidianos (papeladas de emprego, formulários de fornecedores, aprovações internas), enquanto classes específicas de documentos podem exigir assinaturas digitais qualificadas com certificado. Se a contraparte ou a lei exigir assinatura baseada em certificado, esta ferramenta não é isso — use um serviço de assinatura qualificado.",
            "O que ela dá de verdade: um jeito rápido e sem custo de assinar documentos sem imprimir, digitalizar e enviar papel por e-mail, mantendo o documento inteiramente na sua máquina. Para o enorme volume de aprovações cotidianas em que uma assinatura visível basta, isso cobre a necessidade real.",
          ],
        },
        {
          heading: "Conseguir uma assinatura que pareça você",
          paragraphs: [
            "Uma assinatura desenhada com mouse costuma ficar pior que sua assinatura real à mão. Se a aparência importa, duas opções práticas: desenhe numa tela sensível ao toque se tiver, ou assine um papel branco, fotografe, recorte bem apertado e use a imagem. Uma assinatura fotografada em papel branco é importada limpa e fica exatamente como sua mão.",
            "O posicionamento é metade do ofício: a assinatura deve ficar onde assinatura pertence — acima ou ao lado da linha, não flutuando no espaço em branco. Dê zoom na área da assinatura, posicione com precisão e redimensione para a escala combinar com o texto do documento; uma assinatura do tamanho de um parágrafo parece colada. Confira a página seguinte também, se os campos continuam lá.",
            "Entenda o que está assinando: como é uma sobreposição de imagem, ela não trava o documento. Qualquer um com o arquivo pode remover a imagem ou editar o texto ao redor. Assine uma versão final — achate e finalize primeiro — e envie numa forma que você controla (PDF, não um rascunho editável), para que o assinado seja o que circula.",
          ],
        },
        {
          heading: "Assinar é o ato mais privado; mantenha local",
          paragraphs: [
            "A assinatura é o ato mais carregado de identidade realizado sobre um documento — mais pessoal que o próprio conteúdo. Entregar sua imagem de assinatura a um site de assinatura significa que uma cópia da sua assinatura manuscrita repousa no servidor de outra pessoa: um artefato reutilizável da sua identidade que poderia ser arrancado e colado em outros documentos. Pouquíssimos entregariam a um estranho uma folha com suas assinaturas; enviar uma é o mesmo ato com melhor aparência.",
            "Esta ferramenta assina inteiramente no seu navegador: o documento é processado no seu dispositivo, a assinatura é desenhada na página localmente, e o arquivo assinado é salvo pela sua máquina. A imagem da assinatura é usada em memória e nunca transmitida, e toda a operação funciona offline.",
            "Um hábito que vale adotar ao assinar localmente: guarde sua origem de assinatura (foto ou desenho) numa pasta privada em vez das suas downloads gerais, e produza o PDF assinado por documento. Assim o artefato reutilizável de assinatura existe exatamente num lugar que você controla, e cada documento assinado é um arquivo final distinto — sem intermediários compartilhados flutuando por aí.",
          ],
        },
      ],
    },
  },
});
