import { categoryFaqPool } from "@/tools/_lib/category-faqs";

/**
 * 分类页长内容:每个分类 3-4 段正文(定位/隐私/工作流/与竞品差异),
 * 7 语 × 7 分类。分类页是 hub 页,承担 "pdf tools" 类大词——内容量对排名影响大。
 * 取词入口 categoryIntro(cat, locale),未覆盖语言回退英文。
 */

export const CATEGORY_INTROS: Record<string, { en: string[] } & Partial<Record<string, string[]>>> = {
  pdf: {
    en: [
      "PDF is the format work arrives in: contracts to sign, bank statements to file, scans to combine, forms to submit. The tools in this category cover the full lifecycle — merging scattered files into one document, splitting a 200-page manual into chapters, rotating sideways scans, deleting sensitive pages, flattening form fields before submission, and converting between PDF and the formats around it (Word, Excel, PowerPoint, JPG).",
      "Every tool here runs entirely in your browser. The file you drop is read by JavaScript on your own device with pdf-lib and pdf.js — it is never uploaded to a server, never queued for processing, never retained. That matters for the documents people are most careful with: IDs, contracts, medical and financial records. Close the tab and nothing remains anywhere.",
      "The workflow is deliberately minimal: drag, adjust, download. There are no accounts, no watermarks stamped onto your output, no 'free tier' limits that quietly require payment, and no email gate in front of the download button. Batch operations (splitting into many files, merging many sources) produce a ZIP when there is more than one result.",
      "Compared with the well-known PDF suites, the difference is structural rather than cosmetic: they process files on their servers because the business model needs the upload — this site processes them locally because the browser can. The output is the same standard PDF; the difference is that your document never crosses the network.",
    ],
    zh: [
      "PDF 是工作找上门的格式:要签的合同、要归档的银行流水、要合并的扫描件、要提交的表格。这个分类的工具覆盖完整生命周期——把散落文件合并成一份、把 200 页手册拆成章节、转正横着的扫描页、删掉敏感页、提交前展平表单字段,以及 PDF 与周边格式(Word、Excel、PowerPoint、JPG)互转。",
      "这里每个工具完全在你的浏览器里运行。你拖进来的文件由你自己设备上的 JavaScript(pdf-lib 和 pdf.js)读取——从不上传服务器、不排队处理、不留存。这对人们最谨慎对待的文件很重要:证件、合同、医疗和财务记录。关掉标签页,任何地方都不留痕迹。",
      "工作流刻意做到极简:拖入、调整、下载。没有账号、不在输出上盖水印、没有悄悄要求付费的“免费额度”限制、下载按钮前没有邮箱关卡。批量操作(拆成多个文件、合并多个来源)在结果不止一个时会打成 ZIP。",
      "与知名 PDF 套件相比,差别是结构性的而非表面的:它们的商业模式需要上传,所以在服务器上处理文件——这个站在浏览器能做到的前提下本地处理。输出都是同样的标准 PDF,区别在于你的文件从不经过网络。",
    ],
    ja: [
      "PDF は仕事が届く形のフォーマットです。署名を待つ契約書、保管すべき銀行明細、つなぎ合わせたいスキャン画像、提出前のフォーム。このカテゴリのツールはそのライフサイクル全体をカバーします——散らばったファイルを 1 つに結合、200 ページのマニュアルを章ごとに分割、横向きスキャンの回転補正、機密ページの削除、提出前のフォームフィールドのフラット化、そして PDF と周辺フォーマット(Word・Excel・PowerPoint・JPG)の相互変換。",
      "ここにあるすべてのツールはブラウザ内で完結します。ドロップしたファイルは、あなた自身のデバイス上で pdf-lib と pdf.js を使った JavaScript が読み取ります。サーバーへアップロードされることも、処理待ちのキューに入ることも、保存されることもありません。身分証、契約書、医療・金融の記録など、もっとも慎重に扱いたい書類にとって、これは決定的に重要です。タブを閉じれば、どこにも何も残りません。",
      "ワークフローは意図的に最小限です。ドラッグ、調整、ダウンロードの三拍子。アカウント登録は不要、出力への透かし押印もなく、黙って課金を要求してくる「無料枠」の制限も、ダウンロードボタン前のメール登録もありません。バッチ操作(多数ファイルへの分割、複数ソースの結合)は、結果が 2 つ以上になると ZIP にまとめて出力します。",
      "有名な PDF スイートとの違いは見た目ではなく構造にあります。あちらはビジネスモデルがアップロードを必要とするためサーバー側で処理します。当サイトはブラウザで処理できるのだから、それをローカルで実行しています。出力は同じ標準 PDF ですが、違うのは、あなたの文書が一度もネットワークを通らないことです。",
    ],
    es: [
      "El PDF es el formato en el que llega el trabajo: contratos por firmar, estados de cuenta que archivar, escaneos que unir, formularios que enviar. Las herramientas de esta categoría cubren todo el ciclo de vida: fusionar archivos sueltos en un solo documento, dividir un manual de 200 páginas por capítulos, enderezar escaneos ladeados, eliminar páginas sensibles, aplanar los campos de formulario antes de enviarlos y convertir entre PDF y los formatos que lo rodean (Word, Excel, PowerPoint, JPG).",
      "Todas las herramientas funcionan íntegramente en tu navegador. El archivo que sueltas lo lee JavaScript en tu propio dispositivo mediante pdf-lib y pdf.js: nunca se sube a un servidor, nunca entra en una cola de procesamiento, nunca se guarda. Esto importa precisamente con los documentos que más cuidamos: documentos de identidad, contratos, registros médicos y financieros. Cierras la pestaña y no queda nada en ningún sitio.",
      "El flujo de trabajo es deliberadamente mínimo: arrastrar, ajustar, descargar. Sin cuentas, sin marcas de agua en el resultado, sin «planes gratuitos» que acaban exigiendo pago y sin muro de correo electrónico delante del botón de descarga. Las operaciones por lotes (dividir en muchos archivos, unir muchas fuentes) generan un ZIP cuando hay más de un resultado.",
      "Frente a las conocidas suites de PDF, la diferencia es estructural, no cosmética: ellas procesan los archivos en sus servidores porque su modelo de negocio necesita la subida; este sitio los procesa en local porque el navegador puede. La salida es el mismo PDF estándar; la diferencia es que tu documento nunca cruza la red.",
    ],
    pt: [
      "O PDF é o formato em que o trabalho chega: contratos para assinar, extratos bancários para arquivar, digitalizações para juntar, formulários para enviar. As ferramentas desta categoria cobrem o ciclo de vida completo — unir arquivos espalhados em um único documento, dividir um manual de 200 páginas em capítulos, endireitar digitalizações tortas, excluir páginas sensíveis, achatar os campos de formulário antes do envio e converter entre PDF e os formatos vizinhos (Word, Excel, PowerPoint, JPG).",
      "Todas as ferramentas aqui funcionam inteiramente no seu navegador. O arquivo que você solta é lido por JavaScript no seu próprio dispositivo, com pdf-lib e pdf.js — nunca é enviado a um servidor, nunca entra em fila de processamento, nunca fica retido. Isso importa justamente nos documentos com os quais as pessoas mais se preocupam: documentos de identidade, contratos, registros médicos e financeiros. Feche a aba e não sobra nada em lugar nenhum.",
      "O fluxo de trabalho é deliberadamente mínimo: arrastar, ajustar, baixar. Sem contas, sem marcas d'água no resultado, sem «plano gratuito» que discretamente passa a exigir pagamento e sem cadastro de e-mail na frente do botão de download. Operações em lote (dividir em vários arquivos, unir várias fontes) geram um ZIP quando há mais de um resultado.",
      "Em comparação com as suítes de PDF conhecidas, a diferença é estrutural, não cosmética: elas processam os arquivos nos servidores delas porque o modelo de negócio depende do upload; este site processa localmente porque o navegador dá conta. A saída é o mesmo PDF padrão; a diferença é que o seu documento nunca atravessa a rede.",
    ],
  },
  image: {
    en: [
      "Image work is mostly repetitive and local: compress a photo until it fits a marketplace limit, resize a batch to uniform dimensions, crop screenshots, strip EXIF before sharing, convert between WebP, PNG and JPG for different platforms. This category covers those jobs with the same rule every time — the image stays on your device.",
      "Compression and conversion run through the browser's own Canvas and WebCodecs pipelines, so quality behavior matches what you see in native apps: real downsampling instead of quality degradation stacked through repeated server re-encodes. File size targets (like 'compress to under 500 KB') are supported with iterative quality search rather than a fixed guess.",
      "Privacy is not a bonus feature here — it is the mechanism. EXIF data (GPS coordinates, device serials, timestamps) never leaves the photo because the photo never leaves the browser. Removing metadata before posting is a two-click job instead of an act of trust in a remote service.",
      "The tools are built for repetition: batch inputs, consistent output naming, and an interface that keeps your settings between files instead of resetting after every download. For one-off edits, each tool still works in a single pass with no signup in the way.",
    ],
    zh: [
      "图片处理大多是重复的本地活:把照片压到市场平台的大小限制、把一批图统一尺寸、裁截图、分享前抹掉 EXIF、为不同平台在 WebP/PNG/JPG 之间转换。这个分类用同一条规则覆盖这些活——图片不离开你的设备。",
      "压缩与转换走浏览器自己的 Canvas 和 WebCodecs 管线,画质表现和原生应用一致:是真正的降采样,而不是服务器反复转码叠加的画质劣化。“压到 500 KB 以内”这类目标体积,用迭代质量搜索实现,而不是拍脑袋定一个压缩率。",
      "隐私在这里不是加分项,而是机制本身。EXIF(GPS 坐标、设备序列号、时间戳)不会离开照片,因为照片从未离开浏览器。发帖前抹掉元数据是两下点击的事,而不是对一个远程服务交付信任。",
      "工具为重复劳动而建:支持批量输入、输出命名一致、界面记住你在文件间的设置而不是每次下载后重置。就算只处理一张,每个工具也是单次完成,没有注册流程挡路。",
    ],
    ja: [
      "画像処理のほとんどは、繰り返しのローカル作業です。出品制限に収まるまで写真を圧縮する、複数画像を同じサイズに揃える、スクリーンショットを切り抜く、共有前に EXIF を落とす、プラットフォームに合わせて WebP・PNG・JPG を変換する。このカテゴリは、こうした作業を常に同じルールで処理します——画像はあなたのデバイスから出ない。",
      "圧縮と変換はブラウザ標準の Canvas と WebCodecs のパイプラインを通って動くので、画質の挙動はネイティブアプリと同じです。サーバーで再エンコードを繰り返すことで積み重なる画質劣化ではなく、本当のダウンサンプリングを行います。「500 KB 以下に圧縮」といった目標サイズは、固定値の当てずっぽうではなく、反復的な品質探索で実現します。",
      "ここでプライバシーはおまけ機能ではなく、仕組みそのものです。EXIF データ(GPS 座標、デバイスのシリアル番号、タイムスタンプ)は、写真自体がブラウザから出ない以上、外に出ることがありません。投稿前のメタデータ削除が、遠隔サービスへの信頼という行為ではなく、クリック二回の作業になります。",
      "ツールは反復作業のために作られています。バッチ入力、一貫した出力ファイル名、そしてダウンロードのたびにリセットされるのではなくファイル間で設定を保持するインターフェース。使い捨ての編集でも、各ツールは登録なしで一回の処理で完了します。",
    ],
    es: [
      "El trabajo con imágenes es sobre todo repetitivo y local: comprimir una foto hasta que quepa en el límite de una plataforma, redimensionar un lote a dimensiones uniformes, recortar capturas de pantalla, limpiar el EXIF antes de compartir, convertir entre WebP, PNG y JPG según la plataforma. Esta categoría aborda esos encargos siempre con la misma regla: la imagen se queda en tu dispositivo.",
      "La compresión y la conversión pasan por los pipelines nativos del navegador, Canvas y WebCodecs, así que la calidad se comporta como en las aplicaciones nativas: un downsampling real en lugar del deterioro acumulado que provocan las recodificaciones sucesivas en servidores. Objetivos de tamaño como «comprimir a menos de 500 KB» se resuelven con una búsqueda iterativa de calidad, no con una estimación fija.",
      "Aquí la privacidad no es una función extra: es el mecanismo. Los datos EXIF (coordenadas GPS, números de serie del dispositivo, marcas de tiempo) nunca abandonan la foto, porque la foto nunca sale del navegador. Quitar metadatos antes de publicar es cuestión de dos clics, no un acto de confianza en un servicio remoto.",
      "Las herramientas están pensadas para la repetición: entradas por lotes, nombres de salida coherentes y una interfaz que conserva tus ajustes entre archivos en lugar de restablecerse tras cada descarga. Para arreglos puntuales, cada herramienta igualmente funciona de una sola pasada, sin registros de por medio.",
    ],
    pt: [
      "O trabalho com imagens é sobretudo repetitivo e local: comprimir uma foto até caber no limite de uma plataforma, redimensionar um lote para dimensões uniformes, recortar capturas de tela, remover o EXIF antes de compartilhar, converter entre WebP, PNG e JPG conforme a plataforma. Esta categoria trata dessas tarefas sempre com a mesma regra — a imagem fica no seu dispositivo.",
      "A compressão e a conversão passam pelos pipelines nativos do navegador, Canvas e WebCodecs, então a qualidade se comporta como nos aplicativos nativos: downsampling de verdade, em vez da degradação acumulada de recodificações sucessivas em servidores. Metas de tamanho como «comprimir para menos de 500 KB» são atendidas com busca iterativa de qualidade, não com um chute fixo.",
      "Aqui a privacidade não é um recurso extra — é o mecanismo. Os dados EXIF (coordenadas de GPS, números de série do aparelho, carimbos de tempo) nunca deixam a foto, porque a foto nunca sai do navegador. Remover metadados antes de publicar vira uma tarefa de dois cliques, e não um ato de confiança num serviço remoto.",
      "As ferramentas são feitas para a repetição: entradas em lote, nomes de saída consistentes e uma interface que mantém suas configurações entre arquivos em vez de redefinir tudo a cada download. Para ajustes pontuais, cada ferramenta também funciona numa única passada, sem cadastro no caminho.",
    ],
  },
  text: {
    en: [
      "Text tools earn their place by being instant: no submit button, no round trip, results updating as you type. Counting words and characters against an essay limit, cleaning paste artifacts out of a document, deduplicating a mailing list, sorting lines, comparing two versions of a paragraph — these are seconds-long tasks that shouldn't require opening an editor.",
      "Everything in this category processes text in memory as you type, which makes it safe for sensitive content: drafts, internal notes, customer messages, anything you wouldn't paste into a stranger's website. Nothing is transmitted, logged, or stored — reload the page and even the recent-tools memory is the only trace.",
      "The counting tools understand what word processors count: words are split the way writers expect, CJK text is counted per character rather than per space-separated chunk, and sentence and paragraph counts use the conventions of the language you're writing in. That makes the numbers trustworthy against Word, Google Docs, or manuscript submission limits.",
      "Transform tools (case conversion, slug generation, duplicate removal, diff) use shared, tested text-processing functions — the same implementations that power this site's AI-callable tools — so edge cases (Unicode whitespace, emoji clusters, mixed scripts) behave predictably instead of surprising you.",
    ],
    zh: [
      "文本工具靠“即时”立足:没有提交按钮、没有往返等待,结果随输入实时更新。对着作文字数限制数字数、清掉文档里的粘贴残留、给邮件列表去重、排序列、比较两版段落——都是几秒钟的事,不该为此打开编辑器。",
      "本分类的一切都在内存中随输入即时处理,因此对敏感内容也安全:草稿、内部笔记、客户消息、任何你不会贴进陌生人网站的东西。不传输、不记录、不存储——刷新页面,连最近使用记录都是唯一痕迹。",
      "计数工具按文字处理器的口径数:分词方式和写作者预期一致,中日韩文本按字符而非空格分段统计,句子与段落计数遵循你所写语言的惯例。对着 Word、Google Docs 或投稿限制,这些数字经得起对账。",
      "转换类工具(大小写、slug 生成、去重、diff)用共享且经过测试的文本处理函数——与本站 AI 可调用工具是同一套实现——所以边界情况(Unicode 空白、emoji 簇、混合文字)表现可预期,不会给你惊喜。",
    ],
    ja: [
      "テキストツールは「即時」で立ちます。送信ボタンなし、往復待ちなし、結果は入力に合わせてリアルタイム更新。作文の字数制限に対してカウントし、貼り付けの痕跡を文章から除去し、メーリングリストを重複排除し、行を並べ替え、段落の2バージョンを比較——どれも数秒の作業で、エディタを開くべき仕事ではありません。",
      "このカテゴリのすべては入力に合わせてメモリ内で処理されるため、機密内容にも安全です。草稿、社内メモ、顧客メッセージ、見知らぬサイトに貼りたくないもの全て。送信も記録も保存もなく——ページを再読み込みすれば、最近使用の履歴が唯一の痕跡です。",
      "カウント系ツールはワープロと同じ基準で数えます。単語の分かち書きは書き手の期待どおり、中日韓テキストは空白区切りではなく文字単位で、文と段落の数え方は書いている言語の慣例に従います。Word や Google Docs、投稿制限と突き合わせても、数字は裏付けになります。",
      "変換系ツール(大文字小文字、slug 生成、重複削除、diff)は、共有されテスト済みのテキスト処理関数を使います——本サイトの AI 呼び出しツールと同一実装なので、エッジケース(Unicode 空白、絵文字クラスター、混合文字体系)も予測どおりに動きます。",
    ],

    es: [
      "Las herramientas de texto ganan su sitio siendo instantáneas: sin botón de enviar, sin ida y vuelta, resultados que se actualizan al escribir. Contar palabras contra un límite de ensayo, limpiar artefactos de pegado, deduplicar una lista de correo, ordenar líneas, comparar dos versiones de un párrafo — tareas de segundos que no deberían exigir abrir un editor.",
      "Todo en esta categoría procesa el texto en memoria mientras escribes, lo que lo hace seguro para contenido sensible: borradores, notas internas, mensajes de clientes, cualquier cosa que no pegarías en el sitio de un desconocido. Nada se transmite, registra o almacena — recarga la página y ni siquiera queda el recuerdo de herramientas recientes.",
      "Las herramientas de conteo entienden lo que cuentan los procesadores: las palabras se dividen como espera quien escribe, el texto CJK se cuenta por caracteres en vez de por trozos separados por espacios, y las frases y párrafos siguen las convenciones del idioma en el que escribes. Los números se sostienen contra Word, Google Docs o límites de envío.",
      "Las herramientas de transformación (mayúsculas, slug, deduplicación, diff) usan funciones compartidas y probadas — la misma implementación que alimenta las herramientas invocables por IA de este sitio — así que los casos límite (espacios Unicode, grupos emoji, escrituras mixtas) se comportan de forma predecible.",
    ],

    pt: [
      "As ferramentas de texto conquistam seu lugar sendo instantâneas: sem botão de enviar, sem ida e volta, resultados que atualizam enquanto você digita. Contar palavras contra um limite de redação, limpar resíduos de colagem, deduplicar uma lista de e-mails, ordenar linhas, comparar duas versões de um parágrafo — tarefas de segundos que não deveriam exigir abrir um editor.",
      "Tudo nesta categoria processa o texto em memória enquanto você digita, o que o torna seguro para conteúdo sensível: rascunhos, notas internas, mensagens de clientes, qualquer coisa que você não colaria no site de um desconhecido. Nada é transmitido, registrado ou armazenado — recarregue a página e nem o histórico de ferramentas recentes sobra.",
      "As ferramentas de contagem entendem o que os processadores contam: palavras são divididas como quem escreve espera, texto CJK é contado por caractere em vez de blocos separados por espaço, e frases e parágrafos seguem as convenções do idioma em que você escreve. Os números se sustentam contra Word, Google Docs ou limites de submissão.",
      "As ferramentas de transformação (maiúsculas, slug, deduplicação, diff) usam funções compartilhadas e testadas — a mesma implementação que alimenta as ferramentas invocáveis por IA deste site — então os casos de borda (espaços Unicode, clusters de emoji, escritas mistas) se comportam de forma previsível.",
    ],
  },
  developer: {
    en: [
      "Daily development is full of small conversions: format this JSON, decode that URL, hash these strings, generate test identifiers, check what a user-agent claims. Each is thirty seconds of work that shouldn't cost a context switch to a heavyweight IDE feature or a sketchy ad-filled converter site.",
      "This category is a set of small, sharp tools that each do one job correctly: JSON formatting with real error locations, Base64 and URL codecs that follow RFC 4648 and RFC 3986, hash generation through the browser's native WebCrypto, UUID generation per RFC 9562, and formatters that preserve your input rather than re-serializing it into something subtly different.",
      "Everything runs client-side, which is exactly what developers need for real work: pasted API responses, tokens, connection strings and internal payloads stay in the browser. Pasting production secrets into a server-side 'formatter' is a habit worth breaking — here there is no server to send them to.",
      "The tools double as a reference: where a format has rules (JSON number precision, Base64 padding, JWT structure), the output shows the relevant detail instead of hiding it. For AI agents, the same logic behind these tools is also exposed through this site's MCP server, so scripts and chat assistants can call the identical tested implementations.",
    ],
    zh: [
      "日常开发充满小转换:格式化这段 JSON、解码那个 URL、哈希这些字符串、生成测试标识符、看看 user-agent 声称自己是什么。每件都是三十秒的活,不该为此切进笨重的 IDE 功能,也不该屈就去一个满是广告的转换站。",
      "这个分类是一组小而锋利的工具,每件把一件事做对:JSON 格式化带真实报错位置、遵循 RFC 4648 和 RFC 3986 的 Base64 与 URL 编解码、走浏览器原生 WebCrypto 的哈希、符合 RFC 9562 的 UUID 生成,以及保留你输入原貌而不是悄悄重新序列化的格式化器。",
      "一切在客户端运行,这正是真实工作需要的:贴进来的 API 响应、令牌、连接串和内部载荷都留在浏览器里。把生产密钥贴进服务端“格式化器”是个该戒掉的习惯——这里根本没有服务器可送。",
      "这些工具同时是参考资料:格式有规则的地方(JSON 数字精度、Base64 padding、JWT 结构),输出会把相关细节摆出来而不是藏起来。对 AI 智能体,这些工具背后的同一套逻辑也通过本站 MCP 服务器暴露,脚本和对话助手调用的是同一份经过测试的实现。",
    ],
    ja: [
      "日々の開発は小さな変換の連続です。この JSON を整形、あの URL をデコード、文字列をハッシュ、テスト用 ID を生成、user-agent の自己申告を確認。どれも 30 秒の仕事で、重い IDE 機能へのコンテキストスイッチや、広告だらけの怪しい変換サイトに費やすべきものではありません。",
      "このカテゴリは、一つの仕事を正しくこなす小さく鋭いツールの集合です。実際のエラー位置を示す JSON 整形、RFC 4648 と RFC 3986 に準拠した Base64 と URL コーデック、ブラウザ native の WebCrypto によるハッシュ生成、RFC 9562 準拠の UUID 生成、そして入力を保持する(こっそり再シリアライズしない)フォーマッタ。",
      "すべてクライアントサイドで動きます。これは実務にこそ必要な性質です。貼り付けた API レスポンス、トークン、接続文字列、内部ペイロードはブラウザから出ません。本番のシークレットをサーバーサイドの「フォーマッタ」に貼るのは、戒めるべき習慣です——ここには送り先のサーバーが存在しません。",
      "ツールはリファレンスも兼ねます。フォーマットに規則がある箇所(JSON の数値精度、Base64 パディング、JWT 構造)では、出力が関連する詳細を見せます。AI エージェントには、これらのツールの背後のロジックが本サイトの MCP サーバー経由でも公開されており、スクリプトやチャットアシスタントは同じテスト済み実装を呼び出せます。",
    ],

    es: [
      "El desarrollo diario está lleno de conversiones pequeñas: formatear este JSON, decodificar ese URL, hashear estas cadenas, generar identificadores de prueba, ver qué dice ser un user-agent. Cada una son treinta segundos de trabajo que no deberían costar un cambio de contexto a una función pesada del IDE ni acabar en un sitio de conversión lleno de anuncios.",
      "Esta categoría es un conjunto de herramientas pequeñas y afiladas que hacen bien un solo trabajo: formateo de JSON con ubicaciones reales de error, códecs Base64 y URL que siguen RFC 4648 y RFC 3986, hashes mediante el WebCrypto nativo del navegador, generación de UUID según RFC 9562, y formateadores que preservan tu entrada en vez de re-serializarla en algo sutilmente distinto.",
      "Todo corre en el cliente, que es justo lo que el trabajo real necesita: las respuestas de API pegadas, los tokens, las cadenas de conexión y los payloads internos se quedan en el navegador. Pegar secretos de producción en un \"formateador\" del lado servidor es un hábito que conviene romper — aquí no hay servidor al que enviarlos.",
      "Las herramientas sirven también de referencia: donde un formato tiene reglas (precisión numérica de JSON, padding de Base64, estructura de JWT), la salida muestra el detalle relevante en vez de esconderlo. Para agentes de IA, la misma lógica detrás de estas herramientas está expuesta vía el servidor MCP de este sitio — scripts y asistentes llaman a la misma implementación probada.",
    ],

    pt: [
      "O desenvolvimento diário está cheio de conversões pequenas: formatar este JSON, decodificar aquele URL, hashear estas strings, gerar identificadores de teste, ver o que um user-agent alega ser. Cada uma é trinta segundos de trabalho que não deveriam custar uma troca de contexto para um recurso pesado do IDE nem terminar num site de conversão cheio de anúncios.",
      "Esta categoria é um conjunto de ferramentas pequenas e afiadas que fazem bem um único trabalho: formatação de JSON com posições reais de erro, codecs Base64 e URL que seguem RFC 4648 e RFC 3986, hashes pelo WebCrypto nativo do navegador, geração de UUID conforme RFC 9562, e formatadores que preservam sua entrada em vez de re-serializá-la em algo sutilmente diferente.",
      "Tudo roda no cliente — exatamente o que o trabalho real precisa: respostas de API coladas, tokens, strings de conexão e payloads internos ficam no navegador. Colar segredos de produção num \"formatador\" do lado servidor é um hábito a quebrar — aqui não existe servidor para enviá-los.",
      "As ferramentas servem também de referência: onde um formato tem regras (precisão numérica de JSON, padding de Base64, estrutura de JWT), a saída mostra o detalhe relevante em vez de escondê-lo. Para agentes de IA, a mesma lógica por trás destas ferramentas está exposta via o servidor MCP deste site — scripts e assistentes chamam a mesma implementação testada.",
    ],
  },
  seo: {
    en: [
      "On-page SEO is mostly mechanical: write a title that fits the pixel width, generate schema markup that validates, produce hreflang tags that don't contradict your sitemap, preview how a snippet actually renders before publishing. This category automates the mechanical part so the time goes to content instead of tag syntax.",
      "Generators produce current best-practice output: JSON-LD schema (not the deprecated microdata formats), hreflang with x-default handled correctly, meta tag sets that match what Google actually displays, and robots/sitemap files with the syntax validators expect. Where search engines have documented limits (title pixel width, description truncation points), the tools enforce them live as you type.",
      "The SERP preview renders an approximation of the actual result layout — mobile and desktop — so you catch a truncated title or an ugly URL before it ships, not after it's indexed. Schema output can be pasted directly into a page and checked against Google's Rich Results requirements.",
      "These are the same checks used on this site's own 180+ tool pages, so the generators reflect practice rather than theory: they produce exactly the markup that ships here, kept current as search engine requirements change.",
    ],
    zh: [
      "页面 SEO 大多是机械活:写一个不超像素宽度的标题、生成能通过校验的 schema 标记、产出不与 sitemap 矛盾的 hreflang、发布前预览摘要的真实渲染效果。这个分类把机械部分自动化,时间留给内容而不是标签语法。",
      "生成器输出的是当下最佳实践:JSON-LD schema(而非已弃用的微数据格式)、正确处理 x-default 的 hreflang、与 Google 实际展示一致的 meta 标签组、以及语法符合校验器预期的 robots/sitemap 文件。在搜索引擎给出过明确限制的地方(标题像素宽度、描述截断点),工具在你输入时即时执行这些限制。",
      "SERP 预览按移动端和桌面端近似渲染真实结果版式——标题被截断或 URL 不好看,你在上线前就能发现,而不是被收录之后。schema 输出可以直接贴进页面,再对照 Google 富结果要求核验。",
      "这些就是本站自己 180+ 个工具页面在用的同一套检查,生成器反映的是实践而非理论:它们产出的正是本站上线的那套标记,并随搜索引擎要求变化持续更新。",
    ],
    ja: [
      "オンページ SEO の大部分は機械的な作業です:ピクセル幅に収まるタイトルを書く、検証に通るスキーママークアップを生成、サイトマップと矛盾しない hreflang を作る、公開前にスニペットの実際の描画を確認する。このカテゴリは機械的な部分を自動化し、時間をタグの構文ではなくコンテンツに回します。",
      "ジェネレータは現行のベストプラクティスを出力します。廃止されたマイクロデータではなく JSON-LD スキーマ、x-default を正しく処理した hreflang、Google が実際に表示するものに一致するメタタグ群、バリデータが期待する構文の robots/sitemap。検索エンジンが明示している制限(タイトルのピクセル幅、説明の切り詰め点)では、ツールが入力中にその制限をその場で適用します。",
      "SERP プレビューはモバイルとデスクトップの実際の結果レイアウトを近似描画します。切れるタイトルや見苦しい URL は、インデックスされた後ではなく公開前に捕捉できます。スキーマ出力はそのままページに貼り、Google のリッチリザルト要件に対して確認できます。",
      "これらは本サイト自身の 180 以上のツールページで使っているのと同じチェックです。ジェネレータは理論ではなく実務を反映し、ここで実際に出荷されるマークアップをそのまま作り、検索エンジンの要件変化に合わせて更新されます。",
    ],

    es: [
      "El SEO on-page es en su mayoría mecánico: escribir un título que quepa en píxeles, generar marcado schema que valide, producir hreflang que no contradiga tu sitemap, prever cómo se renderiza realmente el snippet antes de publicar. Esta categoría automatiza la parte mecánica para que el tiempo vaya al contenido, no a la sintaxis de etiquetas.",
      "Los generadores producen salida con las mejores prácticas actuales: schema JSON-LD (no los formatos de microdata obsoletos), hreflang con x-default bien manejado, conjuntos de meta etiquetas que coinciden con lo que Google realmente muestra, y archivos robots/sitemap con la sintaxis que esperan los validadores. Donde los buscadores han documentado límites (ancho en píxeles del título, puntos de truncado de la descripción), las herramientas los aplican en vivo mientras escribes.",
      "La vista previa SERP renderiza una aproximación del layout real de resultados — móvil y escritorio — así que detectas un título truncado o una URL fea antes de publicar, no después de indexar. La salida schema se pega directamente en una página y se comprueba contra los requisitos de Rich Results de Google.",
      "Estas son las mismas comprobaciones que usan las más de 180 páginas de herramientas de este sitio, así que los generadores reflejan práctica y no teoría: producen exactamente el marcado que aquí se publica, mantenido al día conforme cambian los requisitos de los buscadores.",
    ],

    pt: [
      "O SEO on-page é em grande parte mecânico: escrever um título que caiba em pixels, gerar marcação schema que valide, produzir hreflang que não contradiga seu sitemap, pré-visualizar como o snippet realmente renderiza antes de publicar. Esta categoria automatiza a parte mecânica para que o tempo vá para o conteúdo, não para a sintaxe de tags.",
      "Os geradores produzem saída com as melhores práticas atuais: schema JSON-LD (não os formatos de microdata obsoletos), hreflang com x-default bem tratado, conjuntos de meta tags que batem com o que o Google realmente exibe, e arquivos robots/sitemap com a sintaxe que os validadores esperam. Onde os buscadores documentaram limites (largura em pixels do título, pontos de truncamento da descrição), as ferramentas os aplicam ao vivo enquanto você digita.",
      "A pré-visualização SERP renderiza uma aproximação do layout real de resultados — mobile e desktop — então você pega um título truncado ou uma URL feia antes de publicar, não depois de indexar. A saída schema cola direto numa página e se verifica contra os requisitos de Rich Results do Google.",
      "Estas são as mesmas checagens usadas nas mais de 180 páginas de ferramentas deste site, então os geradores refletem prática, não teoria: produzem exatamente a marcação que aqui entra no ar, mantida em dia conforme os requisitos dos buscadores mudam.",
    ],
  },
  security: {
    en: [
      "Security checks and generators are the tools people most need and most wrongly trust to random websites: password generators, hash verifiers, TOTP codes, key strength checks. The paradox of using an online generator is obvious — if the site knows your password, it isn't secret. Every tool here closes that hole by generating and computing locally.",
      "Generation uses the browser's cryptographic random source (crypto.getRandomValues), not Math.random. Passwords, tokens and keys produced here have never existed anywhere but your device's memory. Hash verification (MD5, SHA family) runs through WebCrypto against the same file you're checking, byte for byte, without uploading a download to compare it.",
      "The lookup tools (HTTP status codes, header references) are the documentation half of the category: fast answers to 'what does a 418 mean' during an incident, without ads or a blog post wrapped around the answer.",
      "For anything beyond browser-scale work — key ceremonies, compliance audits, password manager vaults — use dedicated tooling. For the everyday jobs: generating a strong passphrase, verifying a checksum, decoding a JWT to see what it actually claims, these tools do it honestly, which here means: locally.",
    ],
    zh: [
      "安全检查与生成器是人们最需要、却又最容易错信陌生网站的工具:密码生成器、哈希校验、TOTP 验证码、密钥强度检查。用在线生成器的悖论显而易见——网站若知道你的密码,它就不再保密。这里每个工具都用本地生成与计算堵上这个洞。",
      "生成用的是浏览器的密码学随机源(crypto.getRandomValues),不是 Math.random。这里产出的密码、令牌和密钥,只存在于你设备的内存里。哈希校验(MD5、SHA 家族)通过 WebCrypto 对着你要校验的原始文件逐字节运行,不上传文件去比对。",
      "查询类工具(HTTP 状态码、请求头参考)是这一分类的文档面:事故中快速回答“418 是什么意思”,没有广告,也没有裹着答案的一整篇博客。",
      "超出浏览器尺度的场景——密钥仪式、合规审计、密码管理器保险库——请用专门工具。而日常的活:生成一个强口令、校验一个校验和、解码 JWT 看看它到底声称了什么,这些工具做得诚实——这里的诚实意味着:在本地。",
    ],
    ja: [
      "セキュリティのチェックと生成ツールは、人が最も必要とし、最も無邪気なウェブサイトに預けてしまうものです。パスワードジェネレータ、ハッシュ検証、TOTP コード、鍵の強度チェック。オンラインジェネレータを使うことの悖論は明白です——サイトがあなたのパスワードを知っていたら、それはもう秘密ではありません。ここでは全ツールがローカル生成・計算でその穴を塞いでいます。",
      "生成には Math.random ではなくブラウザの暗号論的乱数源(crypto.getRandomValues)を使います。ここで作られたパスワード、トークン、鍵は、あなたの端末のメモリ以外のどこにも存在したことがありません。ハッシュ検証(MD5、SHA ファミリー)は WebCrypto で、検証対象のファイルそのものに対してバイト単位で実行され、比較のためにアップロードは行いません。",
      "ルックアップ系ツール(HTTP ステータスコード、ヘッダーリファレンス)はカテゴリのドキュメント面です。インシデント中に「418 は何を意味するか」へ素早く答え、広告も、答えを包む長いブログ記事もありません。",
      "ブラウザ規模を超える仕事——鍵セレモニー、コンプライアンス監査、パスワードマネージャーの保管庫——には専用ツールを。そして日常の仕事:強いパスフレーズの生成、チェックサムの検証、JWT をデコードして実際に何を主張しているか見る——そうした仕事をこれらのツールは誠実に行います。ここでの誠実とは、すなわちローカルという意味です。",
    ],

    es: [
      "Las comprobaciones y generadores de seguridad son las herramientas que la gente más necesita y en las que más erróneamente confía en sitios aleatorios: generadores de contraseñas, verificación de hashes, códigos TOTP, comprobaciones de fortaleza de claves. La paradoja de usar un generador en línea es evidente — si el sitio conoce tu contraseña, ya no es secreta. Cada herramienta de aquí cierra ese hueco generando y computando localmente.",
      "La generación usa la fuente criptográfica de aleatoriedad del navegador (crypto.getRandomValues), no Math.random. Las contraseñas, tokens y claves producidos aquí nunca han existido en otro lugar que la memoria de tu dispositivo. La verificación de hashes (MD5, familia SHA) corre por WebCrypto contra el mismo archivo que estás comprobando, byte a byte, sin subir la descarga para compararla.",
      "Las herramientas de consulta (códigos de estado HTTP, referencia de cabeceras) son la mitad documental de la categoría: respuestas rápidas a \"qué significa un 418\" durante un incidente, sin anuncios ni un artículo de blog envolviendo la respuesta.",
      "Para trabajo más allá de la escala del navegador — ceremonias de claves, auditorías de cumplimiento, bóvedas de gestores de contraseñas — usa herramientas dedicadas. Para el trabajo cotidiano: generar una passphrase fuerte, verificar un checksum, decodificar un JWT para ver qué afirma realmente, estas herramientas lo hacen honestamente — y aquí honesto significa: localmente.",
    ],

    pt: [
      "As checagens e geradores de segurança são as ferramentas que as pessoas mais precisam e nas quais mais erroneamente confiam a sites aleatórios: geradores de senha, verificação de hash, códigos TOTP, checagem de força de chaves. A paradoja de usar um gerador online é óbvia — se o site conhece sua senha, ela não é secreta. Cada ferramenta aqui fecha esse buraco gerando e computando localmente.",
      "A geração usa a fonte criptográfica de aleatoriedade do navegador (crypto.getRandomValues), não Math.random. Senhas, tokens e chaves produzidos aqui nunca existiram em outro lugar além da memória do seu aparelho. A verificação de hashes (MD5, família SHA) roda pelo WebCrypto contra o mesmo arquivo que você está checando, byte a byte, sem subir o download para comparar.",
      "As ferramentas de consulta (códigos de status HTTP, referência de headers) são a metade documental da categoria: respostas rápidas para \"o que significa um 418\" durante um incidente, sem anúncios nem um artigo de blog embrulhando a resposta.",
      "Para trabalho além da escala do navegador — cerimônias de chave, auditorias de compliance, cofres de gerenciadores de senha — use ferramentas dedicadas. Para o cotidiano: gerar uma passphrase forte, verificar um checksum, decodificar um JWT para ver o que ele realmente alega, estas ferramentas fazem isso honestamente — e aqui honesto significa: localmente.",
    ],
  },
  utility: {
    en: [
      "Unit conversion is the internet's oldest utility-tool genre, and the common failure modes are well known: rounded constants, missing unit pairs, and the silent US/imperial confusion (a 'gallon' that changes meaning at the border). This category is built against those failures: exact defined constants, six significant digits, and both systems labeled.",
      "The factors come from official definitions, not convenient approximations — the inch is exactly 2.54 cm, the pound exactly 0.45359237 kg, the US gallon exactly 3.785411784 liters. Conversions route through the SI base unit at full precision, so chained conversions (acres → hectares → m²) accumulate no rounding error.",
      "Beyond physical units, the everyday calculators here — date arithmetic, cooking conversions, shoe sizes, timezone-aware time tools — follow the same principle: use the standard definition, show the assumption, and never let a display rounding decision masquerade as a measurement fact.",
      "Everything computes as you type, works offline once loaded, and handles the full range without magic limits. For AI agents, the complete conversion engine is also exposed through this site's MCP server — the browser tool and the agent tool share one tested implementation.",
    ],
    zh: [
      "单位换算是互联网最古老的工具品类,常见的翻车方式人所共知:系数被舍入、单位对缺失、还有美制/英制的无声混淆(“加仑”过了边境就变了含义)。这个分类就是冲着这些翻车点建的:精确的定义常数、六位有效数字、两套制式都标清楚。",
      "系数来自官方定义而非顺手好记的近似——1 英寸精确等于 2.54 厘米,1 磅精确等于 0.45359237 千克,1 美制加仑精确等于 3.785411784 升。换算以全精度经由 SI 基本单位中转,链式换算(英亩 → 公顷 → 平方米)不累积舍入误差。",
      "除物理单位外,这里的日常计算器——日期运算、烹饪换算、鞋码、带时区的时间工具——遵循同一原则:用标准定义、亮出假设,绝不让显示层的舍入决定冒充测量事实。",
      "一切随输入即时计算,页面加载后可离线使用,全量程没有玄学上限。对 AI 智能体,完整换算引擎也通过本站 MCP 服务器暴露——浏览器工具与智能体工具共享同一份经过测试的实现。",
    ],
    ja: [
      "単位換算はインターネット最古のユーティリティジャンルで、ありがちな失敗はよく知られています。丸められた係数、足りない単位ペア、そしてサイレントな US/ヤード・ポンド法の混同(境界を越えると意味が変わる「ガロン」)。このカテゴリはそれらの失敗に対して構築されています。正確な定義値、有効数字 6 桁、両方式の明示。",
      "係数は便利な近似ではなく公式の定義から来ています。1 インチはちょうど 2.54 cm、1 ポンドはちょうど 0.45359237 kg、1 米ガロンはちょうど 3.785411784 リットル。換算は完全な精度で SI 基本単位経由でルーティングされるため、連鎖換算(エーカー → ヘクタール → m²)でも丸め誤差は蓄積しません。",
      "物理単位を超えて、ここの日常的な計算機——日付演算、料理の換算、靴サイズ、タイムゾーン対応の時間ツール——も同じ原則に従います。標準定義を使い、仮定を示し、表示上の丸め判断を測定の事実のように見せない。",
      "すべて入力に合わせて即時計算し、読み込み後はオフラインで動作、不思議な上限なしで全レンジを扱います。AI エージェントには、完全な換算エンジンが本サイトの MCP サーバー経由でも公開されています。ブラウザツールとエージェントツールは、同じテスト済み実装を共有します。",
    ],

    es: [
      "La conversión de unidades es el género de utilidad más viejo de internet, y los modos de fallo comunes son bien conocidos: constantes redondeadas, pares de unidades ausentes y la confusión silenciosa entre el sistema estadounidense y el imperial (un \"galón\" que cambia de significado al cruzar la frontera). Esta categoría está construida contra esos fallos: constantes definidas exactas, seis dígitos significativos y ambos sistemas etiquetados.",
      "Los factores provienen de definiciones oficiales, no de aproximaciones convenientes — la pulgada es exactamente 2,54 cm, la libra exactamente 0,45359237 kg, el galón estadounidense exactamente 3,785411784 litros. Las conversiones pasan por la unidad base del SI a precisión completa, así que las conversiones encadenadas (acres → hectáreas → m²) no acumulan error de redondeo.",
      "Más allá de las unidades físicas, las calculadoras cotidianas de aquí — aritmética de fechas, conversiones de cocina, tallas de zapato, herramientas de tiempo con zona horaria — siguen el mismo principio: usar la definición estándar, mostrar el supuesto, y nunca dejar que una decisión de redondeo de pantalla se haga pasar por un hecho de medición.",
      "Todo calcula al escribir, funciona sin conexión una vez cargado, y maneja el rango completo sin límites arbitrarios. Para agentes de IA, el motor de conversión completo también está expuesto vía el servidor MCP de este sitio — la herramienta del navegador y la del agente comparten una misma implementación probada.",
    ],

    pt: [
      "Conversão de unidades é o gênero de utilidade mais antigo da internet, e os modos de falha comuns são bem conhecidos: constantes arredondadas, pares de unidades faltantes e a confusão silenciosa entre sistema americano e imperial (um \"galão\" que muda de significado ao cruzar a fronteira). Esta categoria é construída contra essas falhas: constantes definidas com exatidão, seis dígitos significativos e ambos os sistemas rotulados.",
      "Os fatores vêm de definições oficiais, não de aproximações convenientes — a polegada é exatamente 2,54 cm, a libra exatamente 0,45359237 kg, o galão americano exatamente 3,785411784 litros. As conversões passam pela unidade base do SI em precisão total, então conversões encadeadas (acres → hectares → m²) não acumulam erro de arredondamento.",
      "Além das unidades físicas, as calculadoras cotidianas daqui — aritmética de datas, conversões de cozinha, tamanhos de sapato, ferramentas de tempo com fuso — seguem o mesmo princípio: usar a definição padrão, mostrar a premissa, e nunca deixar uma decisão de arredondamento de tela passar por fato de medição.",
      "Tudo calcula ao digitar, funciona offline depois de carregado e cobre a faixa completa sem limites arbitrários. Para agentes de IA, o motor de conversão completo também está exposto via o servidor MCP deste site — a ferramenta do navegador e a do agente compartilham uma mesma implementação testada.",
    ],
  },
};

export function categoryIntro(cat: string, locale: string): string[] {
  const entry = CATEGORY_INTROS[cat];
  if (!entry) return [];
  return entry[locale] ?? entry.en!;
}
