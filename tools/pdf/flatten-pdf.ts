import { PdfProtectEngine } from "../_engines/pdf-engine-protect";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "flatten-pdf",
  category: "pdf",
  icon: "layers",
  engine: { component: PdfProtectEngine, props: { op: "flatten" } },
  related: ["sign-pdf", "merge-pdf", "split-pdf", "rotate-pdf", "pdf-to-jpg", "compress-pdf", "page-numbers-pdf", "unlock-pdf"],
  copy: {
    en: {
      name: "Flatten PDF",
      tagline:
        "Bake PDF form fields into the page as static content before submitting — checkboxes, text boxes and signatures become permanent ink, locally in your browser.",
      intro: [
        "Filled PDF forms are interactive: the values live in separate field objects that some viewers reset, drop or re-order when the file is forwarded. Flattening with pdf-lib draws each field directly onto its page, so what you filled is exactly what every reader will show — a requirement for many job portals, tax portals and filing systems.",
        "The processed document looks identical but contains no form fields anymore: nothing can be unfilled, changed or resubmitted. Everything runs on your device with pdf-lib; the file never leaves your browser. If the PDF has no fillable fields, the tool tells you so instead of producing a pointless copy.",
      
        "pdf-lib's form.flatten() reads every AcroField and draws its current value — text, checkbox, dropdown — directly onto the page content stream, then removes the interactive field objects. The file looks identical but is now static: no viewer can reset the values, reorder the fields or prompt 'this document has a form' on open.",
        "Compared with printing a filled form to PDF (which rasterizes it into a picture of itself), the flattened file keeps real text — searchable, selectable, and a fraction of the size. And unlike editing the form again in Acrobat, flattening is one-directional and permanent, which is exactly what submission portals and counter-signatories require.",
      ],
      steps: [
        "Drop the filled PDF form you are about to submit.",
        "Click Flatten form — fields are drawn onto the pages as static content.",
        "Download the flattened PDF and submit or share it safely.",
      ],
      faqs: [
        {
          q: "Will the pages look the same after flattening?",
          a: "Yes. Field values are rendered onto the page in place, so the visual result matches what you see in your viewer. The difference is underneath: the file no longer contains interactive field objects.",
        },
        {
          q: "Can the form be edited again afterwards?",
          a: "No, and that is the point. Flattening is irreversible in the output — the values are plain page content. Keep the original interactive file if you may need to revise it later.",
        },
        {
          q: "Does it work with digital signature fields?",
          a: "Visible signature appearance fields are flattened like any other field. Cryptographic signature validity is a separate matter: flattening does not re-validate or repair signatures, and a flattened copy should not be treated as a newly signed document.",
        },
      ],
    },
    zh: {
      name: "扁平化 PDF",
      tagline: "把 PDF 表单字段固化为页面静态内容再提交——复选框、文本框和签名变成永久内容,全在浏览器本地完成。",
      intro: [
        "已填写的 PDF 表单是交互式的:数据存放在独立的字段对象里,某些阅读器在转发文件时会重置、丢失或打乱这些值。扁平化通过 pdf-lib 把每个字段直接画到页面上,你填的内容就是所有阅读器显示的内容——很多招聘、报税和归档系统都有此要求。",
        "处理后的文档外观完全一致,但不再包含表单字段:任何值都无法再被清空、修改或重复提交。全部处理由 pdf-lib 在本地完成,文件不会离开浏览器。如果 PDF 没有可填字段,工具会如实提示,而不是生成一份无意义的副本。",
      ],
      steps: [
        "拖入即将提交的已填写 PDF 表单。",
        "点击“扁平化表单”——字段会被绘制为页面上的静态内容。",
        "下载扁平化后的 PDF,放心提交或分享。",
      ],
      faqs: [
        {
          q: "扁平化后页面外观会变吗?",
          a: "不会。字段值原位绘制到页面上,视觉效果与阅读器中看到的一致。区别在底层:文件不再包含可交互的字段对象。",
        },
        {
          q: "之后还能再编辑表单吗?",
          a: "不能,这正是目的。输出文件的扁平化不可逆——字段值已是普通页面内容。如果以后可能还要修改,请保留原始的可交互文件。",
        },
        {
          q: "支持数字签名字段吗?",
          a: "可见的签名外观字段会像其他字段一样被固化。加密签名的有效性是另一回事:扁平化不会重新验证或修复签名,扁平化副本不应被视为新签署的文件。",
        },
      ],
    },
    ja: {
      name: "PDF フラット化",
      tagline: "PDF フォームのフィールドをページに静的コンテンツとして焼き込みます。チェックボックス・テキスト欄・署名が永久に固定され、処理はブラウザ内で完結します。",
      intro: [
        "記入済みの PDF フォームは対話型です。値は独立したフィールドオブジェクトに保存されており、ビューアによってはファイルの転送時にリセット・欠落・並べ替えが起こります。フラット化すると pdf-lib が各フィールドをページに直接描画するため、記入した内容がすべてのビューアでそのまま表示されます。求人ポータルや確定申告、ファイリングシステムで必須の処理です。",
        "処理後の見た目は変わりませんが、フォームフィールドはもう含まれません。値の消去・変更・再送信はできません。処理は pdf-lib で端末内のみ。ファイルがブラウザの外に出ることはありません。入力可能なフィールドがない PDF には、無意味なコピーを作らずその旨をお知らせします。",
      ],
      steps: [
        "提出予定の記入済み PDF フォームをドロップします。",
        "「フォームを平坦化」をクリックすると、フィールドがページに静的コンテンツとして描かれます。",
        "フラット化された PDF をダウンロードし、安心して提出・共有します。",
      ],
      faqs: [
        {
          q: "フラット化後も見た目は同じですか?",
          a: "はい。フィールドの値はその位置に描画されるため、ビューアで見た内容と同じに仕上がります。違いは内部にあり、対話的なフィールドオブジェクトはもう含まれません。",
        },
        {
          q: "後からフォームを編集できますか?",
          a: "できません。それがフラット化の目的です。出力後の変更は不可逆で、値はただのページコンテンツです。後で修正する可能性があれば、元の対話型ファイルを保管してください。",
        },
        {
          q: "電子署名フィールドにも使えますか?",
          a: "外観を持つ署名フィールドは他と同じくフラット化されます。暗号署名の有効性は別の問題で、フラット化は署名を再検証・修復しません。フラット化したコピーを新たに署名された文書として扱わないでください。",
        },
      ],
    },
    es: {
      name: "Aplanar PDF",
      tagline:
        "Graba los campos de formulario del PDF en la página como contenido estático antes de enviarlo: casillas, cuadros de texto y firmas se vuelven permanentes, en tu navegador.",
      intro: [
        "Los formularios PDF rellenados son interactivos: los valores viven en objetos de campo independientes que algunos visores restablecen, pierden o reordenan al reenviar el archivo. Aplanar con pdf-lib dibuja cada campo directamente en su página, así que lo que rellenaste es exactamente lo que mostrará cualquier lector — requisito en muchos portales de empleo, trámites fiscales y sistemas de archivado.",
        "El documento procesado se ve idéntico pero ya no contiene campos de formulario: nada se puede borrar, cambiar ni reenviar. Todo se ejecuta en tu dispositivo con pdf-lib; el archivo nunca sale del navegador. Si el PDF no tiene campos rellenables, la herramienta te lo dice en lugar de producir una copia inútil.",
      ],
      steps: [
        "Suelta el formulario PDF rellenado que vas a enviar.",
        "Pulsa Aplanar formulario: los campos se dibujan en las páginas como contenido estático.",
        "Descarga el PDF aplanado y envíalo o compártelo con seguridad.",
      ],
      faqs: [
        {
          q: "¿Las páginas se ven igual después de aplanar?",
          a: "Sí. Los valores se dibujan en su lugar, así que el resultado visual coincide con lo que ves en tu visor. La diferencia está por debajo: el archivo ya no contiene objetos de campo interactivos.",
        },
        {
          q: "¿Se puede editar el formulario después?",
          a: "No, y ese es el objetivo. El aplanado es irreversible en el resultado: los valores son contenido normal de la página. Conserva el original interactivo si quizá necesites revisarlo más adelante.",
        },
        {
          q: "¿Funciona con campos de firma digital?",
          a: "Los campos de apariencia de firma visibles se aplanan como cualquier otro. La validez criptográfica de una firma es otra cuestión: aplanar no revalida ni repara firmas, y una copia aplanada no debe tratarse como documento recién firmado.",
        },
      ],
    },
    pt: {
      name: "Achatar PDF",
      tagline:
        "Grave os campos de formulário do PDF na página como conteúdo estático antes de enviar — caixas de seleção, campos de texto e assinaturas viram permanentes, no seu navegador.",
      intro: [
        "Formulários PDF preenchidos são interativos: os valores ficam em objetos de campo separados que alguns visualizadores redefinem, perdem ou reordenam ao repassar o arquivo. Achatar com pdf-lib desenha cada campo diretamente na página, então o que você preencheu é exatamente o que qualquer leitor mostrará — exigência de muitos portais de emprego, receitas e sistemas de arquivamento.",
        "O documento processado fica idêntico, mas não contém mais campos de formulário: nada pode ser apagado, alterado ou reenviado. Tudo roda no seu dispositivo com pdf-lib; o arquivo nunca sai do navegador. Se o PDF não tiver campos preenchíveis, a ferramenta avisa em vez de gerar uma cópia inútil.",
      ],
      steps: [
        "Solte o formulário PDF preenchido que você vai enviar.",
        "Clique em Achatar formulário — os campos são desenhados nas páginas como conteúdo estático.",
        "Baixe o PDF achatado e envie ou compartilhe com segurança.",
      ],
      faqs: [
        {
          q: "As páginas ficam com o mesmo visual depois de achatar?",
          a: "Sim. Os valores são desenhados no lugar, então o resultado visual coincide com o que você vê no visualizador. A diferença está por baixo: o arquivo não contém mais objetos de campo interativos.",
        },
        {
          q: "Dá para editar o formulário depois?",
          a: "Não, e esse é o objetivo. O achatamento é irreversível na saída — os valores viram conteúdo comum da página. Guarde o arquivo interativo original se talvez precise revisá-lo depois.",
        },
        {
          q: "Funciona com campos de assinatura digital?",
          a: "Campos de aparência de assinatura visíveis são achatados como qualquer outro. A validade criptográfica da assinatura é outra questão: achatar não revalida nem repara assinaturas, e uma cópia achatada não deve ser tratada como documento recém-assinado.",
        },
      ],
    },
  },
});
