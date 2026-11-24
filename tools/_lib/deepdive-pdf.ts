/**
 * deepDive 补充模块 —— PDF 能力族与图像族。
 * 写作纪律:2 节 × 3 段 × 5 核心语;讲原理、边界与实务。
 */

import type { Locale } from "@/lib/site";

type Section = { heading: string; paragraphs: [string, string, string] };
const CORE = ["en", "zh", "ja", "es", "pt"] as const;

function pick5(map: Record<(typeof CORE)[number], Section[]>, locale: Locale): Section[] | undefined {
  // overlay 语种(fr/de/ru/it/tr/ko/ar/hi/id/vi)设计上回退英文深文:
  // 这些语种的界面与页面文案各有 overlay,但深文不铺(与全站既有约定一致)。
  return (map as Record<string, Section[] | undefined>)[locale] ?? map.en;
}

/** Word(DOCX)→ PDF */
export function wordToPdfDeepDive(locale: Locale): Section[] | undefined {
  return pick5(
    {
      en: [
        {
          heading: "Why a browser cannot reproduce Word's layout",
          paragraphs: [
            "A DOCX file is not a page description: it is a tree of styles, runs and relationship references, and the exact rendering is whatever the consumer decides those styles mean. Word's own layout engine resolves font metrics, line breaking, table autofit, floating anchors and section properties in ways that are not fully specified anywhere public. A browser that reads the text runs can reproduce the characters, but it cannot reproduce the layout, because the input does not contain the resolved layout — only the recipe that Word used to compute it.",
            "That is the honest reason this tool converts text rather than pretending to convert documents. Extracting paragraphs and producing a paginated PDF with a standard font gives a readable, searchable artefact whose fidelity is limited to the text itself. Images, tables, headers and footers, footnotes and exact spacing are outside what the conversion can carry, and the tool says so in the same sentence where it describes the capability.",
            "The practical consequence is that this is the right tool for text extraction into a portable format and the wrong tool for archival reproduction. Anyone who needs the visual document intact should convert through an office suite, which has the engines and the fonts; anyone who needs the words in a PDF, searchable and printable, gets exactly that here.",
          ],
        },
        {
          heading: "What " + "unsupported characters" + " actually means in practice",
          paragraphs: [
            "Font coverage is the second hard boundary. A PDF writer embeds fonts by reference; if a character in the DOCX has no glyph in any available font, the output must either substitute (changing appearance) or drop (losing content). This tool refuses rather than substituting silently, because a silently substituted character is a document that looks complete and says something different.",
            "CJK and emoji are where this bites most often. A DOCX authored on a machine with Chinese fonts may reference characters that a Western default font cannot render, and a naive converter produces tofu boxes or missing text. Detecting that and stopping is the only honest behaviour — the message names the character so the user can fix the source or choose a different route.",
            "The note on the page states the limits in the same place the action is offered, rather than only in documentation. A capability claim that lives only in a help page is a claim most users will never read, and the failure then looks like a bug rather than a stated boundary.",
          ],
        },
      ],
      zh: [
        {
          heading: "为什么浏览器无法复现 Word 的版式",
          paragraphs: [
            "DOCX 不是页面描述:它是样式、文本段与关系引用的树,而确切渲染结果取决于消费方如何解释这些样式。Word 自己的排版引擎如何解析字体度量、断行、表格自适应、浮动锚点与节属性,在任何公开资料里都没有完整规定。浏览器能读出文本段从而复现字符,但复现不了版式,因为输入里并不包含已解析的版式——只有 Word 用来算出它的配方。",
            "这就是本工具只转文本、而不假装转「文档」的诚实理由。抽取段落并产出使用标准字体的分页 PDF,得到的是可读、可搜索的产物,其保真度仅限于文本本身。图片、表格、页眉页脚、脚注与精确间距都在转换能力之外,工具在描述能力的同一句话里就把这件事说了。",
            "实际后果是:这是把文本抽成便携格式的正确工具,是归档复现的错误工具。需要视觉上完整还原的人应该走办公套件——那里有引擎也有字体;需要文字进入 PDF、可搜索可打印的人,在这里得到的正是这个。",
          ],
        },
        {
          heading: "「不支持的字符」在实务中到底意味着什么",
          paragraphs: [
            "字体覆盖是第二道硬边界。PDF 写入器以引用方式嵌入字体;如果 DOCX 里某个字符在任何可用字体里都没有字形,输出就必须要么替换(改变外观)要么丢弃(丢失内容)。本工具选择拒绝而不是静默替换,因为被静默替换的字符会产出「看起来完整、说的却是另一件事」的文档。",
            "CJK 与 emoji 是最常触发这一点的场景。在装有中文字体的机器上编写的 DOCX 可能引用了西文默认字体无法渲染的字符,一个天真的转换器会产出豆腐块或缺失文本。检测到并停下来是唯一诚实的行为——提示会点名那个字符,让用户去修源文件或换一条路。",
            "页面上的说明把局限写在提供操作的同一处,而不是只写在文档里。只存在于帮助页的能力声明,是多数用户永远不会读到的声明,而失败随后就会看起来像 bug 而不是已声明的边界。",
          ],
        },
      ],
      ja: [
        {
          heading: "ブラウザが Word の版面を再現できない理由",
          paragraphs: [
            "DOCX はページ記述ではありません。スタイル・ラン・関係参照の木であり、正確な描画は消費側がそれらのスタイルをどう解釈するかで決まります。Word 自身のレイアウトエンジンがフォントメトリクス、改行、表の自動調整、フローティングアンカー、セクション属性をどう解決するかは、公開資料のどこにも完全には規定されていません。ブラウザはテキストランを読んで文字を再現できますが、版面は再現できません。入力に解決済みの版面が含まれておらず、Word がそれを計算するための処方箋しか入っていないからです。",
            "これが、本ツールが「文書を変換する」ふりをせずテキストを変換する誠実な理由です。段落を抽出し標準フォントでページ付けした PDF を作れば、読みやすく検索可能な成果物が得られ、その忠実度はテキスト自体に限られます。画像、表、ヘッダーとフッター、脚注、正確な字間は変換が運べる範囲の外にあり、ツールは能力を説明する同じ文の中でそう述べます。",
            "実務上の帰結は、これがテキストを可搬形式へ抽出する正しい道具であり、アーカイブ再現には誤った道具だということです。見た目まで完全に保つ必要がある人はオフィススイート経由で変換すべきです。エンジンもフォントもあります。単語が PDF に入り検索・印刷できればよい人は、ここでまさにそれを得ます。",
          ],
        },
        {
          heading: "「未対応文字」が実務で意味すること",
          paragraphs: [
            "フォント被覆は第二の厳格な境界です。PDF ライタはフォントを参照で埋め込みます。DOCX の文字が利用可能などのフォントにも字形を持たない場合、出力は置換(見た目が変わる)か脱落(内容が失われる)のどちらかになります。本ツールは黙って置換せず拒否します。黙って置換された文字は、完全に見えて別のことを言う文書を作るからです。",
            "CJK と絵文字が最も頻繁にこれを引き起こします。中国語フォントのある環境で作られた DOCX は、西欧の既定フォントが描けない文字を参照していることがあり、素朴な変換器は豆腐や欠落テキストを出します。それを検出して止まるのが唯一誠実な挙動です。メッセージは問題の文字を名指しし、利用者が元を直すか別の経路を選べるようにします。",
            "ページ上の注記は、操作を提供するのと同じ場所に制限を書きます。ヘルプページにだけ住む能力の主張は、ほとんどの利用者が決して読まない主張であり、失敗はそのあとバグのように見えます。宣言された境界ではなく。",
          ],
        },
      ],
      es: [
        {
          heading: "Por qué un navegador no puede reproducir la maquetación de Word",
          paragraphs: [
            "Un DOCX no es una descripción de página: es un árbol de estilos, runs y referencias de relación, y el renderizado exacto es lo que el consumidor decida que significan esos estilos. El motor de maquetación de Word resuelve métricas de fuente, cortes de línea, autofit de tablas, anclas flotantes y propiedades de sección de formas que no están completamente especificadas en ningún lugar público. Un navegador que lee los runs puede reproducir los caracteres, pero no la maquetación, porque la entrada no contiene la maquetación resuelta: solo la receta con la que Word la calculó.",
            "Esa es la razón honesta por la que esta herramienta convierte texto en vez de fingir convertir documentos. Extraer párrafos y producir un PDF paginado con una fuente estándar da un artefacto legible y buscable cuya fidelidad se limita al texto. Imágenes, tablas, encabezados y pies, notas al pie y espaciado exacto quedan fuera de lo que la conversión puede transportar, y la herramienta lo dice en la misma frase donde describe la capacidad.",
            "La consecuencia práctica es que esta es la herramienta correcta para extraer texto a un formato portable y la incorrecta para reproducción de archivo. Quien necesite el documento visualmente intacto debería convertir mediante una suite ofimática, que tiene los motores y las fuentes; quien necesite las palabras en un PDF buscable e imprimible obtiene exactamente eso aquí.",
          ],
        },
        {
          heading: "Qué significa realmente «caracteres no admitidos» en la práctica",
          paragraphs: [
            "La cobertura de fuentes es la segunda frontera dura. Un escritor de PDF incrusta fuentes por referencia; si un carácter del DOCX no tiene glifo en ninguna fuente disponible, la salida debe o sustituir (cambiando la apariencia) o descartar (perdiendo contenido). Esta herramienta rechaza en vez de sustituir en silencio, porque un carácter sustituido en silencio produce un documento que parece completo y dice algo distinto.",
            "CJK y emoji es donde esto muerde con más frecuencia. Un DOCX creado en una máquina con fuentes chinas puede referenciar caracteres que una fuente occidental por defecto no puede renderizar, y un conversor ingenuo produce cajas tofu o texto ausente. Detectar eso y detenerse es el único comportamiento honesto: el mensaje nombra el carácter para que el usuario corrija el origen o elija otra vía.",
            "La nota en la página declara los límites en el mismo lugar donde se ofrece la acción, y no solo en la documentación. Una afirmación de capacidad que vive solo en una página de ayuda es una afirmación que la mayoría de usuarios nunca leerá, y el fallo entonces parece un bug en vez de un límite declarado.",
          ],
        },
      ],
      pt: [
        {
          heading: "Por que um navegador não consegue reproduzir o layout do Word",
          paragraphs: [
            "Um DOCX não é uma descrição de página: é uma árvore de estilos, runs e referências de relacionamento, e o renderizado exato é o que o consumidor decidir que esses estilos significam. O motor de layout do Word resolve métricas de fonte, quebra de linha, autofit de tabelas, âncoras flutuantes e propriedades de seção de formas que não estão completamente especificadas em lugar público algum. Um navegador que lê os runs consegue reproduzir os caracteres, mas não o layout, porque a entrada não contém o layout resolvido — apenas a receita com que o Word o calculou.",
            "Essa é a razão honesta pela qual esta ferramenta converte texto em vez de fingir converter documentos. Extrair parágrafos e produzir um PDF paginado com fonte padrão dá um artefato legível e pesquisável cuja fidelidade se limita ao texto. Imagens, tabelas, cabeçalhos e rodapés, notas de rodapé e espaçamento exato ficam fora do que a conversão consegue carregar, e a ferramenta diz isso na mesma frase em que descreve a capacidade.",
            "A consequência prática é que esta é a ferramenta certa para extrair texto para um formato portável e a errada para reprodução de arquivo. Quem precisa do documento visualmente intacto deve converter por uma suíte de escritório, que tem os motores e as fontes; quem precisa das palavras num PDF pesquisável e imprimível recebe exatamente isso aqui.",
          ],
        },
        {
          heading: "O que «caracteres não suportados» realmente significa na prática",
          paragraphs: [
            "A cobertura de fontes é a segunda fronteira dura. Um escritor de PDF embute fontes por referência; se um caractere do DOCX não tem glifo em nenhuma fonte disponível, a saída precisa ou substituir (mudando a aparência) ou descartar (perdendo conteúdo). Esta ferramenta recusa em vez de substituir em silêncio, porque um caractere substituído em silêncio produz um documento que parece completo e diz outra coisa.",
            "CJK e emoji é onde isso morde com mais frequência. Um DOCX criado numa máquina com fontes chinesas pode referenciar caracteres que uma fonte ocidental padrão não consegue renderizar, e um conversor ingênuo produz caixas tofu ou texto ausente. Detectar isso e parar é o único comportamento honesto — a mensagem nomeia o caractere para o usuário corrigir a origem ou escolher outro caminho.",
            "A nota na página declara os limites no mesmo lugar onde a ação é oferecida, não só na documentação. Uma afirmação de capacidade que vive apenas numa página de ajuda é uma afirmação que a maioria dos usuários nunca lerá, e a falha então parece um bug em vez de um limite declarado.",
          ],
        },
      ],
    },
    locale,
  );
}

/** PDF 内容抹除(Redact) */
export function redactPdfDeepDive(locale: Locale): Section[] | undefined {
  return pick5(
    {
      en: [
        {
          heading: "Why redaction must remove data, not cover it",
          paragraphs: [
            "A black rectangle drawn over text is not redaction. The text is still in the file, still extractable with any copy operation, still present in the underlying content stream and often still in an invisible text layer. Real redaction has to remove the glyphs from the content stream and rewrite the page, which is a destructive operation — and that is precisely why it is the one operation where a tool must be explicit about what it does not guarantee.",
            "This implementation removes the marked region from the rendered content and rewrites the surviving content, which produces a PDF where the marked area no longer contains the original glyphs. It does not claim to scrub metadata, embedded thumbnails, unreferenced objects or forensic remnants at the binary level — those require a dedicated sanitiser, and claiming otherwise would be a false assurance in the one context where a false assurance is most dangerous.",
            "The distinction matters legally and practically. If a redaction cannot be trusted, the safe alternative is to rasterise the page or generate a new document from scratch — both of which lose text searchability. This tool does the content-stream removal and states its limits in the same panel where the result appears, so nobody has to infer the guarantee.",
          ],
        },
        {
          heading: "Where exports fail: external resources, custom fonts and form fields",
          paragraphs: [
            "PDF content can depend on resources outside the page itself: an image XObject referenced by multiple pages, a form XObject that draws a shared header, an embedded font subset shared across the document. Rewriting one page while leaving shared resources intact can produce a file that fails to open, or worse, one where the marked region reappears because another page still draws the shared object. The tool refuses to export when it detects that structure rather than producing a file whose guarantee cannot hold.",
            "Custom and subset fonts are the second failure mode. Removing glyphs from the content stream is safe only when the font subset can be rewritten or the surviving text re-encoded; a subset that cannot be rebuilt makes the removal ambiguous, and ambiguous removal is exactly what a redaction must not be.",
            "Form fields are the third. A field's appearance stream and its value are two separate objects, and clearing one while leaving the other intact leaves the data readable through a different path. When the structure cannot be handled confidently, refusing is the correct behaviour and the reason is shown to the user.",
          ],
        },
      ],
      zh: [
        {
          heading: "为什么抹除必须删掉数据,而不是盖住它",
          paragraphs: [
            "在文本上画个黑色矩形不是抹除。那段文字仍在文件里,仍能被任何复制操作提取,仍存在于底层内容流中,而且往往仍留在不可见的文本层里。真正的抹除必须从内容流里移除字形并重写页面,这是一个破坏性操作——正因为如此,它也是唯一一种工具必须明确说明自己「不保证什么」的操作。",
            "本实现把标记区域从渲染内容中移除并重写幸存内容,产出标记区域不再包含原始字形的 PDF。它不声称清理元数据、内嵌缩略图、未被引用的对象或二进制层面的取证残留——那些需要专门的净化器,而声称能做到,在「虚假保证最危险」的这一语境里就是虚假保证。",
            "这个区分在法律和实务上都很重要。如果一次抹除无法被信任,安全的替代方案是把页面栅格化,或从零生成一份新文档——两者都失去文本可搜索性。本工具做内容流移除,并在结果出现的同一面板里声明其边界,这样没有人需要去推断保证范围。",
          ],
        },
        {
          heading: "导出会在哪里失败:外部资源、自定义字体与表单域",
          paragraphs: [
            "PDF 内容可能依赖页面之外的资源:被多页引用的图像 XObject、绘制共享页眉的表单 XObject、跨文档共享的内嵌字体子集。只重写一页而保持共享资源不动,可能产出打不开的文件,更糟的是产出一个标记区域会重新出现的文件——因为另一页仍在绘制那个共享对象。当检测到这种结构时,工具拒绝导出,而不是产出一个保证无法成立的文件。",
            "自定义字体与子集是第二类失败模式。从内容流移除字形只有在字体子集可被重写、或幸存文本可被重新编码时才是安全的;一个无法重建的子集会让移除变得歧义,而歧义的移除恰恰是抹除绝不能出现的东西。",
            "表单域是第三类。一个域的外观流与它的值是两个独立对象,清掉一个而保留另一个,数据仍能通过另一条路径被读出。当结构无法被自信处理时,拒绝是正确行为,原因也会展示给用户。",
          ],
        },
      ],
      ja: [
        {
          heading: "墨消しはデータを隠すのではなく削除しなければならない理由",
          paragraphs: [
            "テキストの上に黒い矩形を描くことは墨消しではありません。そのテキストはまだファイル内にあり、あらゆるコピー操作で抽出でき、基になるコンテンツストリームに残り、しばしば不可視テキスト層にも残ります。本当の墨消しはコンテンツストリームから字形を除きページを書き換える必要があり、これは破壊的操作です。だからこそ、ツールが「保証しないこと」を明示しなければならない唯一の操作なのです。",
            "本実装はマーク領域を描画内容から取り除き、残存内容を書き換えて、マーク領域に元の字形が含まれない PDF を作ります。メタデータ、埋め込みサムネイル、未被参照オブジェクト、バイナリレベルの鑑識残存を消すことは主張しません。それには専用のサニタイザが必要で、そう主張することは「偽の保証が最も危険な文脈」での偽の保証になります。",
            "この区別は法的にも実務的にも重要です。墨消しが信頼できないなら、安全な代替はページをラスタライズするか、ゼロから新しい文書を作ることです。どちらもテキスト検索性を失います。本ツールはコンテンツストリームの削除を行い、結果が表示される同じパネルで限界を述べるので、誰も保証範囲を推測する必要がありません。",
          ],
        },
        {
          heading: "書き出しが失敗する場所:外部リソース、カスタムフォント、フォームフィールド",
          paragraphs: [
            "PDF の内容はページ外のリソースに依存できます。複数ページが参照する画像 XObject、共有ヘッダーを描くフォーム XObject、文書全体で共有される埋め込みフォントサブセット。一ページだけ書き換えて共有リソースを残すと、開けないファイル、さらに悪い場合はマーク領域が再び現れるファイルができます。別のページがその共有オブジェクトをまだ描いているからです。その構造を検出したとき、ツールは保証が成立しないファイルを作るのではなく、書き出しを拒否します。",
            "カスタムフォントとサブセットは第二の失敗モードです。コンテンツストリームから字形を除くのは、フォントサブセットを書き換えられるか残存テキストを再エンコードできるときだけ安全です。再構築できないサブセットは削除を曖昧にし、曖昧な削除は墨消しにあってはならないものそのものです。",
            "フォームフィールドが第三です。フィールドのアピアランスストリームと値は別オブジェクトで、片方を消して片方を残すとデータは別経路で読めます。構造を自信をもって扱えないとき、拒否が正しい挙動で、理由も利用者に示されます。",
          ],
        },
      ],
      es: [
        {
          heading: "Por qué la redacción debe eliminar datos, no taparlos",
          paragraphs: [
            "Un rectángulo negro dibujado sobre texto no es redacción. El texto sigue en el archivo, sigue siendo extraíble con cualquier operación de copia, sigue presente en el flujo de contenido subyacente y a menudo sigue en una capa de texto invisible. La redacción real tiene que eliminar los glifos del flujo de contenido y reescribir la página, lo que es una operación destructiva, y precisamente por eso es la única operación en la que una herramienta debe ser explícita sobre lo que no garantiza.",
            "Esta implementación elimina la región marcada del contenido renderizado y reescribe el contenido superviviente, lo que produce un PDF donde el área marcada ya no contiene los glifos originales. No afirma depurar metadatos, miniaturas incrustadas, objetos no referenciados ni restos forenses a nivel binario, porque eso requiere un saneador dedicado y afirmar lo contrario sería una falsa garantía en el contexto donde una falsa garantía es más peligrosa.",
            "La distinción importa legal y prácticamente. Si no se puede confiar en una redacción, la alternativa segura es rasterizar la página o generar un documento nuevo desde cero, y ambas pierden la buscabilidad del texto. Esta herramienta hace la eliminación del flujo de contenido y declara sus límites en el mismo panel donde aparece el resultado, así nadie tiene que inferir la garantía.",
          ],
        },
        {
          heading: "Dónde fallan las exportaciones: recursos externos, fuentes personalizadas y campos de formulario",
          paragraphs: [
            "El contenido PDF puede depender de recursos externos a la página: una imagen XObject referenciada por varias páginas, un form XObject que dibuja un encabezado compartido, un subconjunto de fuente incrustado compartido en todo el documento. Reescribir una página dejando intactos los recursos compartidos puede producir un archivo que no abre o, peor, uno donde la región marcada reaparece porque otra página sigue dibujando el objeto compartido. La herramienta se niega a exportar cuando detecta esa estructura en vez de producir un archivo cuya garantía no puede sostenerse.",
            "Las fuentes personalizadas y los subconjuntos son el segundo modo de fallo. Eliminar glifos del flujo de contenido solo es seguro cuando el subconjunto de fuente puede reescribirse o el texto superviviente re-codificarse; un subconjunto que no puede reconstruirse vuelve ambigua la eliminación, y una eliminación ambigua es exactamente lo que una redacción no debe ser.",
            "Los campos de formulario son el tercero. El flujo de apariencia de un campo y su valor son dos objetos distintos, y limpiar uno dejando el otro intacto deja los datos legibles por otra vía. Cuando la estructura no puede manejarse con confianza, negarse es el comportamiento correcto y el motivo se muestra al usuario.",
          ],
        },
      ],
      pt: [
        {
          heading: "Por que a redação deve remover dados, não cobri-los",
          paragraphs: [
            "Um retângulo preto desenhado sobre texto não é redação. O texto continua no arquivo, continua extraível com qualquer operação de cópia, continua presente no fluxo de conteúdo subjacente e frequentemente continua numa camada de texto invisível. A redação real precisa remover os glifos do fluxo de conteúdo e reescrever a página, o que é uma operação destrutiva — e é exatamente por isso a única operação em que uma ferramenta deve ser explícita sobre o que não garante.",
            "Esta implementação remove a região marcada do conteúdo renderizado e reescreve o conteúdo sobrevivente, produzindo um PDF onde a área marcada já não contém os glifos originais. Ela não afirma depurar metadados, miniaturas embutidas, objetos não referenciados nem resíduos forenses em nível binário — isso exige um saneador dedicado, e afirmar o contrário seria uma falsa garantia no contexto em que uma falsa garantia é mais perigosa.",
            "A distinção importa legal e praticamente. Se uma redação não pode ser confiada, a alternativa segura é rasterizar a página ou gerar um documento novo do zero — ambas perdem a pesquisabilidade do texto. Esta ferramenta faz a remoção do fluxo de conteúdo e declara seus limites no mesmo painel onde o resultado aparece, então ninguém precisa inferir a garantia.",
          ],
        },
        {
          heading: "Onde as exportações falham: recursos externos, fontes personalizadas e campos de formulário",
          paragraphs: [
            "O conteúdo PDF pode depender de recursos externos à página: uma imagem XObject referenciada por várias páginas, um form XObject que desenha um cabeçalho compartilhado, um subconjunto de fonte embutido compartilhado no documento inteiro. Reescrever uma página deixando os recursos compartilhados intactos pode produzir um arquivo que não abre ou, pior, um onde a região marcada reaparece porque outra página ainda desenha o objeto compartilhado. A ferramenta se recusa a exportar quando detecta essa estrutura em vez de produzir um arquivo cuja garantia não se sustenta.",
            "Fontes personalizadas e subconjuntos são o segundo modo de falha. Remover glifos do fluxo de conteúdo só é seguro quando o subconjunto de fonte pode ser reescrito ou o texto sobrevivente recodificado; um subconjunto que não pode ser reconstruído torna a remoção ambígua, e remoção ambígua é exatamente o que uma redação não deve ser.",
            "Campos de formulário são o terceiro. O fluxo de aparência de um campo e seu valor são dois objetos distintos, e limpar um deixando o outro intacto deixa os dados legíveis por outro caminho. Quando a estrutura não pode ser tratada com confiança, recusar é o comportamento correto e o motivo é mostrado ao usuário.",
          ],
        },
      ],
    },
    locale,
  );
}

/** PDF 保护状态检查(原名「解锁 PDF」,实为只检查不解除) */
export function unlockPdfDeepDive(locale: Locale): Section[] | undefined {
  return pick5(
    {
      en: [
        {
          heading: "Encryption and permissions are two different things",
          paragraphs: [
            "A PDF can carry encryption, which makes the bytes unreadable without a key, and it can carry permissions, which declare what a compliant reader is allowed to do with content it can already read. These are separate mechanisms, and a file can have permissions without encryption — the text is fully readable by any parser, and the permission flags are a request that well-behaved software honours. It is worth being precise about that because the two are routinely conflated, and the consequences of conflating them are different.",
            "This tool reads which of the two applies and reports it. It does not attempt decryption, does not attempt permission removal, and produces no output file. That is a deliberate boundary: a browser tool that promised to defeat document protection would be a tool for circumventing someone else's access control, and the honest response is to state the status and point to the document owner instead.",
            "The distinction also explains why " + "the file opens in my viewer" + " proves nothing. Many viewers cache a password, or silently honour permissions without surfacing them, so a file can open normally while still being encrypted for anyone else. Reading the encryption dictionary is the only way to know.",
          ],
        },
        {
          heading: "What a status check can and cannot tell you",
          paragraphs: [
            "Reading the encryption dictionary tells you the algorithm family, the key length and which protection handler is in play. It does not tell you whether the password is correct, because this tool never tries a password: guessing would be the first step of the bypass it deliberately does not implement.",
            "It also cannot tell you whether the document is legally free to share. Permission flags are the publisher's request, not a legal determination, and ownership of the content is separate from the technical ability to read it. A tool that reported " + "safe to distribute" + " based on a flag would be giving legal advice it has no basis for.",
            "What it can do is save you the guesswork: if a downstream process fails on an encrypted file, knowing that the file is encrypted changes the next step entirely, and knowing that the permissions are absent changes it again. That is a real, modest, honest capability, and the tool's copy names it as exactly that.",
          ],
        },
      ],
      zh: [
        {
          heading: "加密与权限是两件不同的事",
          paragraphs: [
            "一个 PDF 可以带加密,使字节在没有密钥时不可读;也可以带权限声明,声明合规的阅读器可以对它「本来就能读到」的内容做什么。这是两套独立机制,一个文件可以只有权限没有加密——文本对任何解析器都完全可读,而权限标志只是一份请求,守规矩的软件会遵守。把这件事说准确是有价值的,因为两者经常被混为一谈,而混淆的后果并不相同。",
            "本工具读取这两者中哪一个生效并报告出来。它不尝试解密,不尝试移除权限,也不产出任何输出文件。这是一条刻意的边界:一个承诺破解文档保护的浏览器工具,就是一个绕过他人访问控制的工具;诚实的回应是说明状态,并指向文档所有者。",
            "这个区分也解释了为什么「文件在我的阅读器里能打开」什么也证明不了。许多阅读器会缓存密码,或默默遵守权限而不把它显示出来,于是一个文件可以正常打开,同时对其他任何人仍然是加密的。读加密字典是唯一能确知的方式。",
          ],
        },
        {
          heading: "状态检查能告诉你什么,不能告诉你什么",
          paragraphs: [
            "读加密字典可以告诉你算法族、密钥长度,以及用的是哪个保护处理器。它不告诉你密码是否正确,因为本工具从不尝试密码:猜测正是它刻意不实现的那种绕过行为的第一步。",
            "它也无法告诉你这份文档在法律上是否可自由分享。权限标志是发布方的一份请求,不是法律判定;内容的归属与技术上能否读取是两回事。一个基于某个标志就报告「可以分发」的工具,是在给出它毫无依据的法律建议。",
            "它能做的是省去猜测:如果某个下游流程在一个加密文件上失败了,知道「这个文件是加密的」会完全改变下一步;知道「权限标志不存在」又会再改变一次。这是一个真实、温和、诚实的能力,工具的文案也正是这样命名它的。",
          ],
        },
      ],
      ja: [
        {
          heading: "暗号化と権限は別物です",
          paragraphs: [
            "PDF は暗号化を伴えます。鍵なしではバイトが読めなくなります。また権限宣言を伴えます。すでに読める内容に対して、準拠したリーダーが何をしてよいかを宣言します。これは別個の仕組みで、暗号化なしに権限だけを持つファイルもあり得ます。テキストはどのパーサーでも完全に読め、権限フラグは行儀のよいソフトが守る「お願い」です。これを正確に述べる価値は、両者が日常的に混同され、混同の結果が同じでないことです。",
            "本ツールはどちらが当てはまるかを読み、報告します。復号は試みず、権限解除も試みず、出力ファイルも作りません。これは意図的な境界です。文書保護を破ることを約束するブラウザツールは、他人のアクセス制御を回避する道具であり、誠実な応答は状態を述べて所有者を指すことです。",
            "この区別は「自分のビューアで開く」が何も証明しない理由でもあります。多くのビューアはパスワードをキャッシュし、権限を表示せず黙って守るので、ファイルは普通に開きながら他人には暗号化されたまま、ということが起こります。暗号化辞書を読むのが確かめる唯一の方法です。",
          ],
        },
        {
          heading: "状態確認が伝えられること、伝えられないこと",
          paragraphs: [
            "暗号化辞書を読むと、アルゴリズム族、鍵長、どの保護ハンドラが使われているかが分かります。パスワードが正しいかは分かりません。本ツールはパスワードを一度も試さないからです。推測は、意図的に実装しない回避行為の第一歩です。",
            "文書が法的に自由に共有できるかも分かりません。権限フラグは発行者のお願いであり法的判断ではなく、内容の所有権は技術的な読解能力とは別です。フラグに基づいて「配布してよい」と報告するツールは、根拠のない法的助言をしていることになります。",
            "できるのは当て推量を省くことです。下流の処理が暗号化ファイルで失敗したとき、「このファイルは暗号化されている」と知ることは次の一手をまったく変えますし、「権限フラグが無い」と知ることはさらに変えます。これは実在する、控えめで誠実な能力であり、ツールのコピーはまさにそう名付けています。",
          ],
        },
      ],
      es: [
        {
          heading: "Cifrado y permisos son dos cosas distintas",
          paragraphs: [
            "Un PDF puede llevar cifrado, que hace los bytes ilegibles sin clave, y puede llevar permisos, que declaran qué puede hacer con el contenido —que ya puede leer— un lector conforme. Son mecanismos separados, y un archivo puede tener permisos sin cifrado: el texto es plenamente legible por cualquier parser y los flags de permiso son una petición que el software bien educado respeta. Vale la pena ser preciso porque ambos se confunden rutinariamente, y las consecuencias de confundirlos son distintas.",
            "Esta herramienta lee cuál de los dos aplica y lo informa. No intenta descifrar, no intenta quitar permisos y no produce archivo de salida. Es una frontera deliberada: una herramienta de navegador que prometiera derrotar la protección de documentos sería una herramienta para eludir el control de acceso de otra persona, y la respuesta honesta es declarar el estado y señalar al propietario del documento.",
            "La distinción también explica por qué «el archivo se abre en mi visor» no prueba nada. Muchos visores cachean una contraseña o respetan los permisos en silencio sin mostrarlos, así que un archivo puede abrirse normalmente y seguir cifrado para todos los demás. Leer el diccionario de cifrado es la única forma de saberlo.",
          ],
        },
        {
          heading: "Qué puede y qué no puede decirte una comprobación de estado",
          paragraphs: [
            "Leer el diccionario de cifrado te dice la familia de algoritmo, la longitud de clave y qué gestor de protección interviene. No te dice si la contraseña es correcta, porque esta herramienta nunca pruea una contraseña: adivinar sería el primer paso del bypass que deliberadamente no implementa.",
            "Tampoco puede decirte si el documento es legalmente libre de compartir. Los flags de permiso son la petición del editor, no una determinación legal, y la propiedad del contenido es distinta de la capacidad técnica de leerlo. Una herramienta que informara «seguro para distribuir» a partir de un flag estaría dando asesoría legal sin base.",
            "Lo que sí puede hacer es ahorrarte conjeturas: si un proceso posterior falla con un archivo cifrado, saber que está cifrado cambia por completo el siguiente paso, y saber que los permisos están ausentes lo cambia otra vez. Es una capacidad real, modesta y honesta, y el copy de la herramienta la nombra exactamente así.",
          ],
        },
      ],
      pt: [
        {
          heading: "Criptografia e permissões são duas coisas diferentes",
          paragraphs: [
            "Um PDF pode carregar criptografia, que torna os bytes ilegíveis sem chave, e pode carregar permissões, que declaram o que um leitor em conformidade pode fazer com conteúdo que ele já consegue ler. São mecanismos separados, e um arquivo pode ter permissões sem criptografia — o texto é plenamente legível por qualquer parser e as flags de permissão são um pedido que software bem comportado respeita. Vale a pena ser preciso porque os dois são rotineiramente confundidos, e as consequências de confundi-los são diferentes.",
            "Esta ferramenta lê qual dos dois se aplica e reporta. Não tenta descriptografar, não tenta remover permissões e não produz arquivo de saída. É uma fronteira deliberada: uma ferramenta de navegador que prometesse derrotar a proteção de documentos seria uma ferramenta para contornar o controle de acesso de outra pessoa, e a resposta honesta é declarar o estado e apontar para o dono do documento.",
            "A distinção também explica por que «o arquivo abre no meu visualizador» não prova nada. Muitos visualizadores fazem cache de senha ou honram permissões em silêncio sem mostrá-las, então um arquivo pode abrir normalmente e continuar criptografado para todo mundo. Ler o dicionário de criptografia é o único jeito de saber.",
          ],
        },
        {
          heading: "O que uma verificação de estado pode e não pode dizer",
          paragraphs: [
            "Ler o dicionário de criptografia diz a família de algoritmo, o comprimento de chave e qual handler de proteção está em jogo. Não diz se a senha está correta, porque esta ferramenta nunca testa uma senha: adivinhar seria o primeiro passo do bypass que ela deliberadamente não implementa.",
            "Também não pode dizer se o documento é legalmente livre para compartilhar. As flags de permissão são o pedido do editor, não uma determinação legal, e a propriedade do conteúdo é distinta da capacidade técnica de lê-lo. Uma ferramenta que informasse «seguro para distribuir» a partir de uma flag estaria dando consultoria jurídica sem base.",
            "O que ela pode fazer é poupar adivinhação: se um processo adiante falha num arquivo criptografado, saber que está criptografado muda totalmente o próximo passo, e saber que as permissões estão ausentes muda outra vez. É uma capacidade real, modesta e honesta, e o copy da ferramenta a nomeia exatamente assim.",
          ],
        },
      ],
    },
    locale,
  );
}
