import { PdfCompareEngine } from "../_engines/pdf-engine-compare";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "compare-pdf",
  category: "pdf",
  icon: "diff",
  engine: { component: PdfCompareEngine },
  related: ["redact-pdf", "merge-pdf", "split-pdf", "pdf-to-text", "text-diff", "sign-pdf", "flatten-pdf", "rotate-pdf"],
  copy: {
    en: {
      name: "Compare PDFs",
      tagline: "Render two PDFs page by page and highlight exactly what changed — visual diff with changed-pixel scores, everything local.",
      intro: [
        "Drop the original and the revised version, and the tool renders both documents side by side at the same scale, then compares every page pixel by pixel with a small tolerance that keeps anti-aliasing from producing false positives. Pages that differ are listed with a changed-pixel percentage; click one to see a heatmap where every changed region is painted red over the original render.",
        "This is a visual comparison, and that is its strength: it catches text edits, image swaps, layout shifts, added or removed paragraphs, moved signatures — anything that renders differently shows up, regardless of how the PDF was produced. Two exports from different word processors with no text layer at all compare just as cleanly as two revisions of the same source.",
        "Both documents stay in your browser for the entire comparison — pdf.js renders them, the pixel math runs on your device, and nothing is uploaded. That matters precisely in the case this tool is built for: two drafts of a contract, an offer revision, a pre-publication proof.",
      ],
      steps: [
        "Drop the original PDF on the left, the revised one on the right.",
        "Compare — the scan runs page by page with a progress bar.",
        "Open any differing page to see the red diff heatmap over the original render.",
      ],
      faqs: [
        {
          q: "How is this different from a text diff?",
          a: "A text diff compares extracted characters and misses anything visual: swapped logos, moved tables, changed line spacing, a signature that disappeared. This tool compares what the reader actually sees. Use text-diff for wording changes in clean text PDFs; use this when appearance, layout or images are in question — or when the files have no text layer at all.",
        },
        {
          q: "What does the percentage mean?",
          a: "It is the fraction of pixels on that page that differ beyond the tolerance. A re-flowed footer scores low; a rewritten page scores high. The number is a pointer for where to look, not a verdict — open the heatmap to see exactly which regions changed.",
        },
        {
          q: "What if the two PDFs have different page counts?",
          a: "Comparison runs to the longer document's page count; pages that exist in only one file are flagged as full-page differences, which is usually exactly the change you are looking for — an added or deleted page.",
        },
        {
          q: "Do the documents leave my device?",
          a: "No. Rendering and pixel comparison run entirely in your browser with pdf.js. Given that the typical use is comparing two versions of something confidential before it ships, uploading them anywhere would defeat the purpose.",
        },
      ],
      deepDive: [
        {
          heading: "Why visual diff, not text diff",
          paragraphs: [
            "PDFs are a print instruction set, not a document tree: the same visual page can be produced by a thousand different internal representations, and the same wording can render differently because of a font substitution. A text-level comparison silently assumes both files came from the same source and survived the same export path — an assumption that breaks the moment a lawyer re-exports from Word or a counterparty scans and OCRs the contract.",
            "Comparing renders sidesteps all of it. If two pages show the reader the same thing, they are equivalent for every practical purpose; if a single pixel region differs, something changed that a reader will see. That symmetry is what makes a pixel diff the honest default for documents whose origin you do not control.",
            "The cost is equally real: a visual diff cannot tell you which word changed, only where. The workflow that works is visual diff first to find the pages, then a text extraction of those pages when the files support it — both tools live on this site and run under the same local-first rule.",
          ],
        },
        {
          heading: "Tolerance, scale and the art of not crying wolf",
          paragraphs: [
            "Raw pixel equality between two renders is almost never achievable: font rasterization, anti-aliasing and compression noise move individual pixels without any semantic change. This tool therefore allows a small per-channel tolerance and renders both files at the same fixed scale — a difference is only counted when a pixel genuinely shifts beyond that band.",
            "Scale matters too. Too low and small edits hide inside a smear; too high and every JPEG re-encode screams. The default sits at a level where body-text edits are unmissable in the heatmap while ordinary re-compression noise stays under the radar.",
            "One blind spot to know: pure metadata changes (author fields, bookmarks) do not render and therefore do not appear — deliberately. If you need document-property comparison, extract with the metadata viewer; if you need to know what a reader would see, this is the tool.",
          ],
        },
        {
          heading: "The workflows this unlocks locally",
          paragraphs: [
            "The canonical one is revision control without a version tracker: counterparty sends back the contract \"unchanged\", you compare and the changed-pixel list is twenty pages long — the negotiation just got concrete. The same flow catches quiet substitutions in supplier quotes, policy renewals and published terms of service.",
            "A second use is print QC: compare the proof against the approved version before the print run. A swapped logo or a dropped disclaimer renders as a red rectangle in seconds, not as a reprint discovered by a customer.",
            "Both documents stay on your device for the entire run — pdf.js renders, the canvas math computes, nothing uploads. The files people diff are, almost by definition, files they are not ready to publish; they should not have to leak them to compare them.",
          ],
        },
      ],
    },
    zh: {
      name: "对比 PDF",
      tagline: "两份 PDF 逐页渲染并精确高亮变化处——视觉 diff + 差异像素占比,全程本地。",
      intro: [
        "拖入原版和修订版,工具把两份文档按同一比例逐页渲染,再逐像素比较——带轻微容差,抗锯齿不会产生误报。有差异的页面列出差异像素占比;点开任意一页,可以看到热图:所有变化区域在原版渲染上以红色标出。",
        "这是视觉对比,而这正是它的强项:文字改动、图片替换、版式位移、段落增删、签名消失——只要渲染结果不同就会被发现,不管 PDF 是怎么产出的。两个来自不同文字处理器的导出文件,即使完全没有文本层,也能干净地对比。",
        "整个对比过程两份文档都留在浏览器里——pdf.js 渲染,像素计算在本地,什么都不上传。这个工具本来就是为这种场景造的:合同的两版草稿、报价的修订版、付印前的样张。",
      ],
      steps: [
        "左侧拖入原版 PDF,右侧拖入修订版。",
        "点对比——逐页扫描并显示进度条。",
        "打开任意差异页,查看叠加在原版渲染上的红色差异热图。",
      ],
      faqs: [
        {
          q: "这和文本 diff 有什么区别?",
          a: "文本 diff 比较提取出的字符,会漏掉一切视觉变化:换掉的 logo、移位的表格、变了的行距、消失的签名。本工具比较的是读者实际看到的东西。干净的文本 PDF 查措辞用 text-diff;版式、图像有疑问,或者文件根本没有文本层时,用这个。",
        },
        {
          q: "百分比是什么意思?",
          a: "是该页超出容差的差异像素占比。页脚重排得分很低,整页重写得分很高。这个数字是定位线索,不是判决——打开热图看具体哪些区域变了。",
        },
        {
          q: "两份 PDF 页数不同怎么办?",
          a: "对比会跑到较长那份的页数;只在一方存在的页面会被标记为整页差异——通常这恰好就是你要找的变化:增页或删页。",
        },
        {
          q: "文档会离开我的设备吗?",
          a: "不会。渲染与像素比较全部由浏览器内的 pdf.js 完成。这个工具的典型用法就是在机密文件发出前对比两个版本——上传到任何地方都违背它的初衷。",
        },
      ],
      deepDive: [
        {
          heading: "为什么用视觉 diff 而不是文本 diff",
          paragraphs: [
            "PDF 是一套打印指令,不是文档树:同一个视觉页面可以由一千种内部表示产生,同一段措辞也会因为字体替换而渲染不同。文本级对比悄悄假设两个文件出自同一源头、走过同一条导出路径——一旦对方律师从 Word 重新导出,或者对手方把合同扫描加 OCR,这个假设就碎了。",
            "比较渲染结果绕开了所有这些。两页如果给读者看的东西一样,那它们在一切实际用途上等价;只要有一个像素区域不同,就是读者会看到的变化。这种对称性,让像素 diff 成为面对不受你控制的文件来源时,最诚实的默认选择。",
            "代价同样真实:视觉 diff 无法告诉你哪个词变了,只能告诉你哪里变了。可行的工作流是先用视觉 diff 定位页面,文件支持时再对那几页做文本提取——两个工具都在本站,都遵守同一条本地优先规则。",
          ],
        },
        {
          heading: "容差、比例与\"不狼来了\"的艺术",
          paragraphs: [
            "两次渲染之间原始像素完全相等几乎不可能:字体栅格化、抗锯齿、压缩噪声都会移动单个像素而没有任何语义变化。所以本工具允许一个小的逐通道容差,并把两份文件按同一固定比例渲染——只有像素真正越过容差带的差异才被计入。",
            "比例同样关键。太低,小改动藏进糊成一片的画面;太高,每次 JPEG 重编码都在尖叫。默认值卡在正文改动在热图里无所遁形、而普通重压缩噪声隐身的水平。",
            "一个要知晓的盲点:纯元数据变化(作者字段、书签)不参与渲染,因此不会出现——这是刻意的。要比较文档属性,用元数据查看器;要知道读者会看到什么,用这个工具。",
          ],
        },
        {
          heading: "本地对比解锁的工作流",
          paragraphs: [
            "最经典的一个:没有版本管理器时的修订控制。对手方说合同\"没改\",你一对比,差异页列表有二十页——谈判立刻有了具体抓手。同样的流程能抓出供应商报价、保单续约、公开发布的服务条款里的悄悄替换。",
            "第二个用途是印前质检:付印前把样张和定稿对比。换掉的 logo、漏掉的免责声明,几秒钟就以红色矩形现形,而不是等客户发现后重印。",
            "整个对比过程两份文件都留在你的设备上——pdf.js 渲染、canvas 计算、零上传。人们需要 diff 的文件,几乎按定义都是还没准备好公开的文件;对比它们不该以泄露为代价。",
          ],
        },
      ],
    },
    ja: {
      name: "PDF 比較",
      tagline: "2 つの PDF をページごとに描画して変更箇所を正確にハイライト——差分ピクセル率つきビジュアル diff、完全ローカル。",
      intro: [
        "元文書と改訂版をドロップすると、ツールは両方を同じスケールでページごとに描画し、軽い許容差つきでピクセルごとに比較します(アンチエイリアスの誤検出を防ぐ)。差分のあるページは変更ピクセル率つきで一覧表示され、クリックすると元の描画に赤で差分領域を重ねたヒートマップが見られます。",
        "これはビジュアル比較であり、そこが強みです。テキストの編集、画像の差し替え、レイアウトの移動、段落の追加削除、消えた署名——描画結果が異なるものはすべて検出されます。PDF がどう作られたかには依存しません。テキスト層のない別々のワープロ由来の 2 ファイルでも、同じソースの 2 改訂版と同じくらいきれいに比較できます。",
        "比較の間、両文書はブラウザ内に留まります——pdf.js が描画し、ピクセル演算は端末内、アップロードは一切ありません。このツールが想定するのはまさにそのための场景です:契約書の 2 つのドラフト、見積もりの改訂版、印刷前の校正刷り。",
      ],
      steps: [
        "左に元の PDF、右に改訂版をドロップします。",
        "比較を押す——ページごとの走査が進行状況バーつきで実行されます。",
        "差分ページを開くと、元の描画に赤い差分ヒートマップが重なって表示されます。",
      ],
      faqs: [
        {
          q: "テキスト diff との違いは?",
          a: "テキスト diff は抽出した文字を比較するため、視覚的な変化を見逃します:差し替えられたロゴ、移動した表、変わった行間、消えた署名。このツールは読者が実際に見るものを比較します。きれいなテキスト PDF の文言変更には text-diff を、レイアウトや画像が疑わしい場合、テキスト層がないファイルにはこちらを。",
        },
        {
          q: "パーセンテージの意味は?",
          a: "そのページで許容差を超えて異なるピクセルの割合です。フッターの再流しは低く、丸ごと書き直したページは高く出ます。数字はどこを見るべきかの目安であって判定ではありません——ヒートマップを開いてどの領域が変わったかを確認してください。",
        },
        {
          q: "2 つの PDF のページ数が違う場合は?",
          a: "長いほうのページ数まで比較が走ります。片方にしか存在しないページは全ページ差分としてフラグが立ります——通常、それこそが探している変化:追加か削除されたページです。",
        },
        {
          q: "文書は端末の外に出ますか?",
          a: "出ません。描画とピクセル比較はブラウザ内の pdf.js だけで実行されます。このツールの典型的な用途は、機密文書が出る前に 2 バージョンを比較すること——どこかにアップロードしては本末転倒です。",
        },
      ],
      deepDive: [
        {
          heading: "テキスト diff ではなくビジュアル diff である理由",
          paragraphs: [
            "PDF は文書ツリーではなく印刷命令の集合です。同じ見た目のページが千通り以上の内部表現から作れ、同じ文言もフォント置換ひとつで描画が変わります。テキスト比較は黙って「両ファイルが同じソースから来て、同じ書き出し経路を通った」と仮定します——相手側が Word から再書き出しした瞬間、あるいは契約書がスキャン+OCR された瞬間に、その仮定は壊れます。",
            "描画の比較はそのすべてを回避します。2 ページが読者に同じものを見せているなら、実務上はすべて等価です。1 つのピクセル領域でも違えば、読者に見える変化があります。この対称性こそ、出所を自分で管理できない文書に対する最も誠実なデフォルトがピクセル diff である理由です。",
            "代償も同じくらい本物です。ビジュアル diff はどの単語が変わったかは教えられず、どこが変わったかだけを教えます。うまくいくワークフローは、まずビジュアル diff でページを特定し、対応していればそのページのテキスト抽出——両ツールとも本サイトにあり、同じローカル優先ルールで動きます。",
          ],
        },
        {
          heading: "許容差・スケール、「狼少年」にならない技術",
          paragraphs: [
            "2 つの描画の生のピクセル一致はほぼ達成不可能です:フォントのラスタライズ、アンチエイリアス、圧縮ノイズが、意味の変化なしに個々のピクセルを動かします。そこでこのツールは小さなチャネルごとの許容差を設け、両ファイルを同じ固定スケールで描画します。ピクセルが本当にその帯域を超えて動いた場合だけ差分として数えます。",
            "スケールも重要です。低すぎると小さな編集がにじみに隠れ、高すぎると JPEG の再エンコードのたびに悲鳴が上がります。既定値は、本文の編集がヒートマップで見逃せず、通常の再圧縮ノイズはレーダーの下に留まる水準です。",
            "知っておくべき盲点:メタデータだけの変化(作者欄、しおり)は描画されないため現れません——意図的です。文書プロパティの比較にはメタデータビューアを、読者が何を見るかを知るにはこのツールを使ってください。",
          ],
        },
        {
          heading: "ローカル比較が解き放つワークフロー",
          paragraphs: [
            "最も典型的なのは、バージョン管理なしの改訂管理です。先方が契約書を「無変更」で送り返す——比較すると差分ページのリストが 20 ページ。交渉が一気に具体的になります。同じ流れで、仕入れ先の見積もりの静かな差し替え、保険更新、公開後の利用規約の変更も捕まえられます。",
            "2 つ目は印刷 QC:印刷前に校正刷りと承認版を比較します。差し替えられたロゴ、落ちた免責事項が、数秒で赤い矩形として現れます。顧客の指摘で再印刷、ではなく。",
            "比較の間、両ファイルは端末内に留まります——pdf.js が描画し、canvas が計算し、アップロードはゼロ。diff が必要なファイルは、ほぼ定義によってまだ公開する準備ができていないファイルです。比較するために漏えいする必要はありません。",
          ],
        },
      ],
    },
    es: {
      name: "Comparar PDFs",
      tagline: "Renderice dos PDF página a página y resalte exactamente qué cambió — diff visual con porcentajes de píxeles cambiados, todo local.",
      intro: [
        "Suelte el original y la versión revisada: la herramienta renderiza ambos lado a lado a la misma escala y compara cada página píxel a píxel con una pequeña tolerancia que evita que el anti-aliasing produzca falsos positivos. Las páginas que difieren se listan con su porcentaje; haga clic en una para ver un mapa de calor donde cada región cambiada se pinta en rojo sobre el render original.",
        "Es una comparación visual, y ahí está su fuerza: detecta ediciones de texto, cambios de imagen, desplazamientos de maquetación, párrafos añadidos o eliminados, firmas que desaparecen — todo lo que se renderice de forma distinta aparece, sin importar cómo se produjo el PDF. Dos exportaciones de procesadores distintos, incluso sin capa de texto, se comparan tan limpiamente como dos revisiones del mismo origen.",
        "Ambos documentos permanecen en su navegador durante toda la comparación — pdf.js los renderiza, la aritmética de píxeles corre en su dispositivo y nada se sube. Eso importa justo en el caso para el que está hecha esta herramienta: dos borradores de un contrato, una revisión de oferta, una prueba de imprenta.",
      ],
      steps: [
        "Suelte el PDF original a la izquierda y el revisado a la derecha.",
        "Compare — el escaneo corre página a página con barra de progreso.",
        "Abra cualquier página con diferencias para ver el mapa de calor rojo sobre el render original.",
      ],
      faqs: [
        {
          q: "¿En qué se diferencia de un diff de texto?",
          a: "Un diff de texto compara caracteres extraídos y se pierde todo lo visual: logos cambiados, tablas movidas, interlineados alterados, una firma que desapareció. Esta herramienta compara lo que el lector realmente ve. Use text-diff para cambios de redacción en PDFs de texto limpio; use esta cuando la apariencia, el diseño o las imágenes estén en cuestión — o cuando los archivos ni siquiera tengan capa de texto.",
        },
        {
          q: "¿Qué significa el porcentaje?",
          a: "Es la fracción de píxeles de esa página que difieren más allá de la tolerancia. Un pie de página reflotado puntúa bajo; una página reescrita, alto. La cifra es una pista de dónde mirar, no un veredicto — abra el mapa de calor para ver exactamente qué regiones cambiaron.",
        },
        {
          q: "¿Y si los dos PDF tienen números de página distintos?",
          a: "La comparación corre hasta la cantidad de páginas del documento más largo; las páginas que existen solo en uno se marcan como diferencias de página completa — que suele ser exactamente el cambio buscado: una página añadida o eliminada.",
        },
        {
          q: "¿Los documentos salen de mi dispositivo?",
          a: "No. El renderizado y la comparación de píxeles corren por completo en su navegador con pdf.js. Dado que el uso típico es comparar dos versiones de algo confidencial antes de publicarlo, subirlos a cualquier parte anularía el propósito.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué diff visual y no diff de texto",
          paragraphs: [
            "Un PDF es un conjunto de instrucciones de impresión, no un árbol de documento: la misma página visual puede producirse con mil representaciones internas distintas, y el mismo texto puede renderizar diferente por una sustitución de fuente. Una comparación a nivel de texto asume en silencio que ambos archivos vinieron de la misma fuente y sobrevivieron al mismo camino de exportación — supuesto que se rompe en cuanto la contraparte reexporta desde Word o escanea y aplica OCR al contrato.",
            "Comparar renders lo esquiva todo. Si dos páginas le muestran al lector lo mismo, son equivalentes para todo propósito práctico; si una sola región de píxeles difiere, algo cambió que el lector verá. Esa simetría hace del diff de píxeles el valor por defecto honesto para documentos cuyo origen no controla.",
            "El costo es igual de real: un diff visual no puede decirle qué palabra cambió, solo dónde. El flujo que funciona es diff visual primero para localizar páginas y luego extracción de texto de esas páginas cuando los archivos lo permitan — ambas herramientas viven en este sitio y corren bajo la misma regla local primero.",
          ],
        },
        {
          heading: "Tolerancia, escala y el arte de no gritar lobo",
          paragraphs: [
            "La igualdad cruda de píxeles entre dos renders casi nunca es alcanzable: la rasterización de fuentes, el anti-aliasing y el ruido de compresión mueven píxeles individuales sin cambio semántico alguno. Por eso la herramienta permite una pequeña tolerancia por canal y renderiza ambos archivos a la misma escala fija — una diferencia solo cuenta cuando un píxel se desplaza de verdad fuera de esa banda.",
            "La escala también importa. Demasiado baja y las ediciones pequeñas se esconden en una mancha; demasiado alta y cada re-codificación JPEG grita. El valor por defecto está en el nivel donde las ediciones de texto son ineludibles en el mapa de calor y el ruido ordinario de recompresión queda bajo el radar.",
            "Un punto ciego que conviene conocer: los cambios puramente de metadatos (campos de autor, marcadores) no se renderizan y por tanto no aparecen — deliberadamente. Para comparar propiedades del documento, el visor de metadatos; para saber lo que vería el lector, esta herramienta.",
          ],
        },
        {
          heading: "Los flujos que esto habilita en local",
          paragraphs: [
            "El canónico es control de revisiones sin gestor de versiones: la contraparte devuelve el contrato \"sin cambios\", usted compara y la lista de páginas cambiadas tiene veinte entradas — la negociación acaba de volverse concreta. El mismo flujo caza sustituciones silenciosas en cotizaciones de proveedores, renovaciones de pólizas y términos de servicio ya publicados.",
            "Un segundo uso es QC de imprenta: compare la prueba contra la versión aprobada antes de tirar. Un logo cambiado o un descargo omitido se vuelve un rectángulo rojo en segundos, no una reimpresión descubierta por un cliente.",
            "Ambos documentos se quedan en su dispositivo durante toda la corrida — pdf.js renderiza, el canvas calcula, nada se sube. Los archivos que la gente necesita comparar son, casi por definición, archivos que aún no están listos para publicarse; no deberían tener que filtrarse para compararse.",
          ],
        },
      ],
    },
    pt: {
      name: "Comparar PDFs",
      tagline: "Renderize dois PDFs página a página e destaque exatamente o que mudou — diff visual com percentuais de pixels alterados, tudo local.",
      intro: [
        "Solte o original e a versão revisada: a ferramenta renderiza os dois lado a lado na mesma escala e compara cada página pixel a pixel com uma pequena tolerância que impede o anti-aliasing de gerar falsos positivos. As páginas que diferem aparecem com seu percentual; clique numa para ver um mapa de calor onde cada região alterada fica vermelha sobre o render original.",
        "É uma comparação visual, e aí está a força: detecta edições de texto, trocas de imagem, deslocamentos de layout, parágrafos adicionados ou removidos, assinaturas que sumiram — tudo que renderizar diferente aparece, sem importar como o PDF foi produzido. Duas exportações de processadores diferentes, mesmo sem camada de texto, comparam tão limpo quanto duas revisões da mesma origem.",
        "Os dois documentos ficam no seu navegador durante toda a comparação — pdf.js renderiza, a matemática de pixels roda no seu aparelho e nada é enviado. Isso importa exatamente no caso para o qual a ferramenta foi feita: dois rascunhos de um contrato, uma revisão de proposta, uma prova de impressão.",
      ],
      steps: [
        "Solte o PDF original à esquerda e o revisado à direita.",
        "Compare — a varredura roda página a página com barra de progresso.",
        "Abra qualquer página com diferenças para ver o mapa de calor vermelho sobre o render original.",
      ],
      faqs: [
        {
          q: "Qual a diferença de um diff de texto?",
          a: "Um diff de texto compara caracteres extraídos e perde tudo que é visual: logos trocados, tabelas movidas, espaçamentos alterados, uma assinatura que desapareceu. Esta ferramenta compara o que o leitor realmente vê. Use text-diff para mudanças de redação em PDFs de texto limpo; use esta quando aparência, layout ou imagens estiverem em questão — ou quando os arquivos nem tenham camada de texto.",
        },
        {
          q: "O que significa o percentual?",
          a: "É a fração de pixels da página que diferem além da tolerância. Um rodapé refluido pontua baixo; uma página reescrita, alto. O número é uma pista de onde olhar, não um veredito — abra o mapa de calor para ver exatamente quais regiões mudaram.",
        },
        {
          q: "E se os dois PDFs tiverem quantidades de páginas diferentes?",
          a: "A comparação roda até a contagem do documento mais longo; páginas que existem só num lado são marcadas como diferença de página inteira — geralmente exatamente a mudança procurada: uma página adicionada ou removida.",
        },
        {
          q: "Os documentos saem do meu aparelho?",
          a: "Não. Renderização e comparação de pixels rodam inteiramente no navegador com pdf.js. Dado que o uso típico é comparar duas versões de algo confidencial antes de sair, enviá-los a qualquer lugar anularia o propósito.",
        },
      ],
      deepDive: [
        {
          heading: "Por que diff visual e não diff de texto",
          paragraphs: [
            "Um PDF é um conjunto de instruções de impressão, não uma árvore de documento: a mesma página visual pode ser produzida por mil representações internas diferentes, e o mesmo texto pode renderizar diferente por causa de uma substituição de fonte. Uma comparação em nível de texto assume em silêncio que os dois arquivos vieram da mesma fonte e sobreviveram ao mesmo caminho de exportação — pressuposto que quebra no momento em que a outra parte reexporta do Word ou escaneia e aplica OCR no contrato.",
            "Comparar renders contorna tudo isso. Se duas páginas mostram ao leitor a mesma coisa, são equivalentes para todo propósito prático; se uma única região de pixels difere, algo mudou que o leitor verá. Essa simetria é o que torna o diff de pixels o padrão honesto para documentos cuja origem você não controla.",
            "O custo é igualmente real: um diff visual não diz qual palavra mudou, só onde. O fluxo que funciona é diff visual primeiro para localizar as páginas, depois extração de texto dessas páginas quando os arquivos permitirem — as duas ferramentas vivem neste site e rodam sob a mesma regra local-primeiro.",
          ],
        },
        {
          heading: "Tolerância, escala e a arte de não gritar lobo",
          paragraphs: [
            "Igualdade crua de pixels entre dois renders quase nunca é alcançável: rasterização de fontes, anti-aliasing e ruído de compressão movem pixels individuais sem nenhuma mudança semântica. Por isso a ferramenta permite uma pequena tolerância por canal e renderiza os dois arquivos na mesma escala fixa — uma diferença só conta quando um pixel genuinamente sai dessa banda.",
            "A escala também importa. Baixa demais e edições pequenas se escondem numa mancha; alta demais e cada re-encodação JPEG grita. O padrão fica no nível em que edições de corpo de texto são impossíveis de perder no mapa de calor enquanto o ruído comum de recompressão fica sob o radar.",
            "Um ponto cego a conhecer: mudanças puramente de metadados (campos de autor, marcadores) não renderizam e portanto não aparecem — deliberadamente. Para comparar propriedades do documento, o visualizador de metadados; para saber o que o leitor veria, esta ferramenta.",
          ],
        },
        {
          heading: "Os fluxos que isso desbloqueia em local",
          paragraphs: [
            "O canônico é controle de revisões sem gestor de versões: a outra parte devolve o contrato \"inalterado\", você compara e a lista de páginas alteradas tem vinte entradas — a negociação acaba de ficar concreta. O mesmo fluxo caça substituições silenciosas em cotações de fornecedores, renovações de apólices e termos de serviço já publicados.",
            "Um segundo uso é QC de impressão: compare a prova contra a versão aprovada antes da tiragem. Um logo trocado ou um disclaimer esquecido vira um retângulo vermelho em segundos, não uma reimpressão descoberta pelo cliente.",
            "Os dois documentos ficam no seu aparelho durante toda a execução — pdf.js renderiza, o canvas calcula, nada é enviado. Os arquivos que as pessoas precisam comparar são, quase por definição, arquivos que ainda não estão prontos para serem publicados; não deveriam ter que vazar para serem comparados.",
          ],
        },
      ],
    },
  },
});
