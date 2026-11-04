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
    },
  },
});
