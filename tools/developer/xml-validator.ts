import { DevCodeEngine } from "../_engines/dev-engine-code";
import { defineTool } from "../_lib/types";

const SAMPLE = '<catalog><book id="1"><title>Design</title><year>1971</year></book><book id="2"><title>Code</title></catalog>';

export default defineTool({
  slug: "xml-validator",
  category: "developer",
  icon: "check",
  engine: { component: DevCodeEngine, props: { mode: "xml-validate", validator: "xml", sample: SAMPLE } },
  related: ["xml-formatter", "html-formatter", "json-validator", "md5-generator", "sha256-generator", "base64-image", "json-formatter", "url-encoder", "html-minifier", "url-decoder"],
  copy: {
    en: {
      name: "XML Validator",
      tagline:
        "Check XML for well-formedness in real time: mismatched tags, broken attributes and invalid entities are reported the moment you paste. Nothing is uploaded.",
      intro: [
        "The validator uses the browser's built-in XML parser, so it enforces exactly the rules real XML tooling enforces: every tag must close, attributes must be quoted, entities must be valid, and there must be exactly one root element.",
        "Well-formed XML gets a green status plus a pretty-printed preview; problems show up with the parser's own error description, which pinpoints the offending construct — useful before feeding feeds, sitemaps or SOAP payloads to picky consumers.",
      ],
      steps: [
        "Paste your XML into the input box.",
        "A green status appears if the XML is well-formed; otherwise the parser error is shown.",
        "Fix the reported problem, or copy the formatted preview when it passes.",
      ],
      faqs: [
        {
          q: "Does this validate against a DTD or XSD schema?",
          a: "No — it checks well-formedness only (structure, quoting, entities, single root). Schema validation needs a dedicated tool with your XSD or DTD.",
        },
        {
          q: "What counts as an XML error here?",
          a: "Unclosed or mismatched tags, unquoted attributes, duplicate attributes, invalid entity references, multiple root elements and illegal characters are all rejected.",
        },
        {
          q: "Is my XML sent anywhere?",
          a: "No. The check runs in your browser with the native DOMParser — your data never leaves the device.",
        },
      ],
      deepDive: [
        {
          heading: "Well-formedness: the rules every consumer enforces",
          paragraphs: [
            "A validator here answers one question — is this document well-formed XML? — using the browser's own XML parser, which enforces exactly what real XML tooling enforces. The rule list is short but absolute: every opened tag must close, and in order; attributes must be quoted and appear once per element; entity references must be defined; a document has exactly one root element; illegal characters (control characters, stray < or & in text) are rejected.",
            "These are not style rules but the format's load-bearing walls. A mismatched tag is not a warning — it makes the document unparseable for every consumer downstream, from a browser to a feed reader to a SOAP stack. That is why failing validation stops the pipeline: there is no \"mostly well-formed\" for a parser to work with. The flip side is that passing is a strong statement: any XML library anywhere will be able to open the document.",
            "What passing does not mean: that the document is valid against a schema. A document whose <price> contains \"free\" instead of a number, or that omits a required element, can be perfectly well-formed and still wrong. Schema validation (XSD or DTD) is a separate, stricter job that needs your schema definition — this tool tells you the document parses; only you can tell whether it means anything.",
          ],
        },
        {
          heading: "Reading the errors: the usual suspects",
          paragraphs: [
            "The most common failures are mundane. An unclosed tag — usually from a deleted or renamed closing tag — cascades: the parser reports it where the structure finally breaks, which can be far from the actual mistake. Unquoted attributes (id=7 instead of id=\"7\") are illegal everywhere; HTML habits like <br> and <img ...> without self-closing are rejected too, because XML has no optional closing.",
            "Entity trouble is the second family. A bare & in text starts an entity reference and must be written &amp;; a stray < likewise must be &lt;. Pasting content from HTML or from word processors is the usual source — those environments tolerate what XML does not. Invalid or undefined entities (&nbsp; in a document without the XHTML namespace declaration, for instance) also fail.",
            "The practical debugging loop is short: fix the first reported error, re-run, repeat. Errors cascade, so the first one is usually the root cause and later ones are echoes. When the input came from conversion or generation rather than hand-editing, the error location usually points at the generating code's bug, not at the data.",
          ],
        },
        {
          heading: "Why validate in your browser",
          paragraphs: [
            "The check runs on the browser's native DOMParser — your XML never leaves the device, and there is no upload, no rate limit, no trace. The documents you validate are frequently the confidential kind: internal service payloads, sitemaps not yet published, SOAP envelopes with credentials, files under legal hold. A validator that uploads them turns every check into a disclosure; local validation removes that risk entirely.",
            "Local also means it fits inside iteration: paste, read the error, fix, paste again — each cycle takes seconds, works offline, and handles multi-megabyte documents bounded only by memory. It pairs naturally with the formatter (a clean parse plus readable structure) and with XML to JSON (validate before converting, so a schema-shaped error never masquerades as a conversion bug).",
            "One boundary worth stating plainly: the browser's parser enforces well-formedness with high fidelity, but it does not load external DTDs or perform schema validation. If your pipeline requires XSD validation, this tool is the cheap first gate — catch every structural error here, and send only clean documents to the schema validator, where failures then actually mean schema violations.",
          ],
        },
      ],
    },
    zh: {
      name: "XML 校验",
      tagline: "实时检查 XML 是否格式良好:标签不匹配、属性引号缺失、实体非法,粘贴即报。数据全程不上传。",
      intro: [
        "校验使用浏览器内置的 XML 解析器,规则与真实 XML 工具完全一致:标签必须闭合、属性必须加引号、实体必须合法,并且只能有一个根元素。",
        "格式良好时显示绿色状态和格式化预览;有问题时给出解析器的错误描述,直接指向出错位置——在把订阅源、站点地图或 SOAP 报文交给挑剔的消费方之前先自检一遍很有用。",
      ],
      steps: [
        "把 XML 粘贴到输入框。",
        "格式良好时显示绿色状态;否则显示解析器错误。",
        "按提示修复问题;校验通过后可复制格式化预览。",
      ],
      faqs: [
        {
          q: "会按 DTD 或 XSD schema 校验吗?",
          a: "不会——只检查格式良好性(结构、引号、实体、唯一根元素)。schema 校验需要配合你的 XSD 或 DTD 的专用工具。",
        },
        {
          q: "哪些算 XML 错误?",
          a: "未闭合或不匹配的标签、属性没加引号、重复属性、非法实体引用、多个根元素、非法字符,全都会被拒绝。",
        },
        {
          q: "XML 会被发送到别处吗?",
          a: "不会。校验在浏览器中用原生 DOMParser 完成,数据不离开设备。",
        },
      ],
      deepDive: [
        {
          heading: "良构性:每个消费方都会执行的规则",
          paragraphs: [
            "这里的校验器回答一个问题——这份文档是不是良构的 XML?——用的是浏览器自带的 XML 解析器,它执行的正是真实 XML 工具执行的规则。规则清单不长但绝对:每个开标签必须闭合且顺序正确;属性必须加引号且每个元素只出现一次;实体引用必须有定义;文档有且只有一个根元素;非法字符(控制字符、文本里游离的 < 或 &)一律拒绝。",
            "这些不是风格规则,而是格式的承重墙。错配的标签不是警告——它让文档对下游每一个消费方都不可解析,从浏览器到订阅阅读器到 SOAP 栈。所以校验失败就该停下管线:解析器面对的世界里没有「大体良构」。反面同样成立:通过是一个强声明——任何地方任何 XML 库都能打开这份文档。",
            "通过不意味着什么:不代表文档对某个 schema 有效。一个 <price> 里写着 \"free\" 而不是数字、或漏了必备元素的文档,可以完全良构却依然错误。Schema 校验(XSD 或 DTD)是另一份更严格的工作,需要你的 schema 定义——本工具告诉你文档能解析;它是否有意义只有你能判断。",
          ],
        },
        {
          heading: "读报错:惯犯名单",
          paragraphs: [
            "最常见的失败都很平淡。未闭合的标签——多半来自被删掉或改名的闭合标签——会级联:解析器在结构最终断裂处报告,那里可能离真正的错误很远。不加引号的属性(id=7 而不是 id=\"7\")处处非法;HTML 习惯如 <br> 和不带自闭合的 <img …> 也被拒绝,因为 XML 没有可选闭合。",
            "实体问题是第二族。文本里裸露的 & 会开启实体引用,必须写成 &amp;;游离的 < 同样必须写成 &lt;。从 HTML 或文字处理软件粘贴内容是常见来源——那些环境容忍 XML 不容忍的东西。无效或未定义的实体(比如没有 XHTML 命名空间声明的文档里的 &nbsp;)同样失败。",
            "实用的调试循环很短:修第一个报错,重跑,重复。错误会级联,所以第一个通常是根因,后面的是回声。当输入来自转换或生成而非手改时,报错位置指向的往往是生成代码的 bug,而不是数据。",
          ],
        },
        {
          heading: "为什么在浏览器里校验",
          paragraphs: [
            "检查跑在浏览器原生的 DOMParser 上——你的 XML 不离开设备,没有上传、没有限速、没有痕迹。你要校验的文档常常是机密的那类:内部服务载荷、尚未发布的站点地图、带凭据的 SOAP 信封、被法律保全的文件。会上传它们的校验器把每次检查变成一次披露;本地校验直接消灭这个风险。",
            "本地也意味着适合放进迭代:贴入、读报错、修复、再贴——每个循环只要几秒,离线可用,几兆的文档也能处理,上限只有内存。它和格式化器(干净的解析加可读的结构)、XML 转 JSON(转换前先校验,免得 schema 形状的错误假扮成转换 bug)自然成对。",
            "有一条边界值得说清楚:浏览器解析器高保真地执行良构性,但不加载外部 DTD,也不做 schema 校验。如果你的管线要求 XSD 校验,本工具是便宜的第一道闸——在这里拦下所有结构性错误,只把干净的文档送去 schema 校验器,之后的失败才真正意味着违反 schema。",
          ],
        },
      ],
    },
    ja: {
      name: "XML バリデーター",
      tagline:
        "XML の整形式性をリアルタイムにチェック。タグの不一致・属性の引用符漏れ・不正な実体を貼り付けた瞬間に検出します。",
      intro: [
        "検証にはブラウザ内蔵の XML パーサーを使うため、実際の XML ツールと同じ規則が適用されます。タグは必ず閉じる、属性は必ず引用符で囲む、実体は有効、ルート要素は 1 つだけ。",
        "整形式なら緑のステータスと整形プレビューを表示。問題があればパーサー自身のエラー説明が表示され、原因の箇所が特定できます。フィードやサイトマップ、SOAP を渡す前のセルフチェックに便利です。",
      ],
      steps: [
        "XML を入力欄に貼り付けます。",
        "整形式なら緑のステータス、そうでなければパーサーのエラーが表示されます。",
        "指摘箇所を修正するか、合格したら整形プレビューをコピーします。",
      ],
      faqs: [
        {
          q: "DTD や XSD スキーマに対する検証もできますか?",
          a: "できません。整形式性(構造・引用符・実体・単一根)のみをチェックします。スキーマ検証には XSD や DTD を扱う専用ツールが必要です。",
        },
        {
          q: "どんなものがエラーになりますか?",
          a: "閉じられていないタグや不一致タグ、引用符のない属性、重複属性、不正な実体参照、複数のルート要素、不正な文字はすべて拒否されます。",
        },
        {
          q: "XML はどこかに送信されますか?",
          a: "いいえ。ネイティブの DOMParser でブラウザ内チェックするため、データは端末の外に出ません。",
        },
      ],
      deepDive: [
        {
          heading: "整形式性:あらゆる消費側が執行する規則",
          paragraphs: [
            "ここでのバリデーターは一つの問いに答えます — この文書は整形式の XML か? — そしてブラウザ自身の XML パーサーを使います。それは実際の XML ツールが執行するのとまさに同じことを執行します。規則の一覧は短いですが絶対です。開いたタグはすべて、順序どおりに閉じねばならない。属性は引用符で囲まれ、要素ごとに一度だけ現れる。実体参照は定義済みでなければならない。文書はルート要素を正確に一つ持つ。不正な文字(制御文字、テキスト内の遊離した < や &)は拒否される。",
            "これらはスタイル規則ではなく、形式の耐力壁です。一致しないタグは警告ではありません — ブラウザからフィード リーダー、SOAP スタックまで、下流のすべての消費側にとって文書を解析不能にします。だから検証の失敗はパイプラインを止めるべきです。パーサーが扱える「ほぼ整形式」は存在しないのです。裏返しも強い声明です。通れば、どこかのどの XML ライブラリもその文書を開けます。",
            "合格が意味しないこと:文書がスキーマに対して妥当であること。<price> に数値ではなく \"free\" が入っている文書も、必須要素を欠く文書も、完全に整形式でありながら間違いでありえます。スキーマ検証(XSD や DTD)は別の、より厳格な仕事で、あなたのスキーマ定義を要ります。このツールは文書が解析できることだけを伝えます。それが意味を持つかは、あなたしか判断できません。",
          ],
        },
        {
          heading: "エラーの読み方:いつもの容疑者たち",
          paragraphs: [
            "最もよくある失敗は平凡です。閉じられていないタグ — たいてい削除や改名された閉じタグから — は連鎖します。パーサーは構造がついに壊れる場所で報告し、そこは実際の間違いから遠いことがあります。引用符のない属性(id=\"7\" ではなく id=7)はどこでも違法です。<br> や自己閉じなしの <img …> のような HTML の癖も拒否されます。XML に任意の閉じはないからです。",
            "実体のトラブルが第二の一族です。テキスト内の裸の & は実体参照を始め、&amp; と書かねばなりません。遊離した < も同様に &lt; です。HTML やワープロからの貼り付けがいつもの源です — それらの環境は XML が許さないものを許容します。無効または未定義の実体(たとえば XHTML 名前空間宣言のない文書の &nbsp;)も失敗します。",
            "実務のデバッグ ループは短いです。最初に報告されたエラーを直し、再実行し、繰り返す。エラーは連鎖するので、最初のものがたいてい根因で、後のものは反響です。入力が手編集ではなく変換や生成から来た場合、エラー位置が指すのはたいていデータではなく、生成コードのバグです。",
          ],
        },
        {
          heading: "なぜブラウザ内で検証するのか",
          paragraphs: [
            "検査はブラウザのネイティブな DOMParser で走ります — XML は端末の外に出ず、アップロードも速度制限も痕跡もありません。検証する文書はしばしば機密の類です。内部サービスのペイロード、まだ公開していないサイトマップ、資格情報入りの SOAP エンベロープ、法的保全下のファイル。それらをアップロードするバリデーターは検査のたびに開示に変えます。ローカル検証はそのリスクを丸ごと消します。",
            "ローカルであることは反復への適合も意味します。貼り、エラーを読み、直し、また貼る — 各サイクルは数秒で、オフラインで動き、数メガバイトの文書もメモリを上限に処理します。整形器(きれいな解析と読める構造)や XML から JSON(変換の前に検証し、スキーマ形状のエラーが変換バグに化装するのを防ぐ)と自然に組めます。",
            "一つの境界を平明に述べておきます。ブラウザのパーサーは整形式性を高精度で執行しますが、外部の DTD を読み込まず、スキーマ検証もしません。パイプラインが XSD 検証を要するなら、このツールは安価な最初の門です。ここで構造エラーをすべて捉え、きれいな文書だけをスキーマ バリデーターへ送れば、以後の失敗は実際にスキーマ違反を意味します。",
          ],
        },
      ],
    },
    es: {
      name: "Validador XML",
      tagline:
        "Comprueba la buena formación del XML en tiempo real: etiquetas sin cerrar, atributos sin comillas y entidades inválidas se detectan al pegar. Nada se sube.",
      intro: [
        "El validador usa el parser XML integrado del navegador, así que aplica exactamente las reglas del XML real: toda etiqueta debe cerrarse, los atributos deben ir entre comillas, las entidades deben ser válidas y solo puede haber un elemento raíz.",
        "El XML bien formado recibe un estado verde y una vista formateada; los problemas muestran la descripción del parser, que señala la construcción problemática — útil antes de entregar feeds, sitemaps o SOAP a consumidores exigentes.",
      ],
      steps: [
        "Pega tu XML en el cuadro de entrada.",
        "Si está bien formado aparece un estado verde; si no, el error del parser.",
        "Corrige el problema indicado, o copia la vista formateada si pasa la comprobación.",
      ],
      faqs: [
        {
          q: "¿Valida contra un esquema DTD o XSD?",
          a: "No — solo comprueba la buena formación (estructura, comillas, entidades, raíz única). La validación por esquema requiere una herramienta dedicada con tu XSD o DTD.",
        },
        {
          q: "¿Qué cuenta como error XML aquí?",
          a: "Etiquetas sin cerrar o sin emparejar, atributos sin comillas, atributos duplicados, referencias a entidades inválidas, varias raíces y caracteres ilegales se rechazan.",
        },
        {
          q: "¿Mi XML se envía a algún sitio?",
          a: "No. La comprobación corre en tu navegador con el DOMParser nativo: tus datos nunca salen del dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Buena formación: las reglas que todo consumidor aplica",
          paragraphs: [
            "Un validador aquí responde una pregunta — ¿es este documento XML bien formado? — usando el parser XML del propio navegador, que aplica exactamente lo que aplica la herramienta XML real. La lista de reglas es corta pero absoluta: toda etiqueta abierta debe cerrarse, y en orden; los atributos deben ir entre comillas y aparecer una vez por elemento; las referencias a entidades deben estar definidas; un documento tiene exactamente un elemento raíz; los caracteres ilegales (caracteres de control, un < o & perdido en el texto) se rechazan.",
            "No son reglas de estilo sino los muros de carga del formato. Una etiqueta mismatched no es una advertencia — deja el documento inanalizable para todo consumidor aguas abajo, desde un navegador hasta un lector de feeds o una pila SOAP. Por eso fallar la validación detiene la canalización: no existe \"mayormente bien formado\" con lo que un parser pueda trabajar. El reverso es una afirmación fuerte: si pasa, cualquier biblioteca XML en cualquier sitio podrá abrir el documento.",
            "Lo que pasar no significa: que el documento sea válido contra un esquema. Un documento cuyo <price> contiene \"free\" en vez de un número, u que omite un elemento requerido, puede estar perfectamente bien formado y seguir estando mal. La validación por esquema (XSD o DTD) es un trabajo aparte y más estricto que necesita tu definición de esquema — esta herramienta te dice que el documento analiza; solo tú puedes decir si significa algo.",
          ],
        },
        {
          heading: "Leer los errores: los sospechosos habituales",
          paragraphs: [
            "Los fallos más comunes son mundanos. Una etiqueta sin cerrar — normalmente por una etiqueta de cierre borrada o renombrada — entra en cascada: el parser la reporta donde la estructura finalmente se rompe, que puede quedar lejos del error real. Los atributos sin comillas (id=7 en vez de id=\"7\") son ilegales en todas partes; los hábitos de HTML como <br> y <img ...> sin autocierre también se rechazan, porque el XML no tiene cierre opcional.",
            "Los problemas de entidades son la segunda familia. Un & desnudo en el texto inicia una referencia a entidad y debe escribirse &amp;; un < perdido igualmente debe ser &lt;. Pegar contenido desde HTML o procesadores de texto es la fuente habitual — esos entornos toleran lo que XML no tolera. Las entidades inválidas o no definidas (&nbsp; en un documento sin la declaración del espacio de nombres XHTML, por ejemplo) también fallan.",
            "El bucle práctico de depuración es corto: corrige el primer error reportado, vuelve a ejecutar, repite. Los errores entran en cascada, así que el primero suele ser la causa raíz y los siguientes son ecos. Cuando la entrada vino de una conversión o generación en vez de una edición a mano, la ubicación del error suele apuntar al bug del código generador, no a los datos.",
          ],
        },
        {
          heading: "Por qué validar en tu navegador",
          paragraphs: [
            "La comprobación corre sobre el DOMParser nativo del navegador — tu XML nunca sale del dispositivo, y no hay subida, ni límite de tasa, ni rastro. Los documentos que validas son frecuentemente de la clase confidencial: payloads de servicios internos, sitemaps aún no publicados, sobres SOAP con credenciales, archivos bajo reserva legal. Un validador que los suba convierte cada comprobación en una divulgación; la validación local elimina ese riesgo por completo.",
            "Lo local también significa que encaja en la iteración: pega, lee el error, corrige, pega otra vez — cada ciclo tarda segundos, funciona sin conexión y maneja documentos de varios megabytes acotados solo por la memoria. Se empareja naturalmente con el formateador (un análisis limpio más estructura legible) y con XML a JSON (valida antes de convertir, así un error con forma de esquema jamás se disfraza de bug de conversión).",
            "Una frontera que conviene enunciar claramente: el parser del navegador aplica la buena formación con alta fidelidad, pero no carga DTDs externas ni hace validación por esquema. Si tu canalización exige validación XSD, esta herramienta es la primera puerta barata — atrapa aquí todo error estructural, y envía solo documentos limpios al validador de esquema, donde los fallos pasan a significar realmente violaciones de esquema.",
          ],
        },
      ],
    },
    pt: {
      name: "Validador XML",
      tagline:
        "Verifique a integridade estrutural do XML em tempo real: tags sem fechar, atributos sem aspas e entidades inválidas aparecem ao colar. Nada é enviado.",
      intro: [
        "O validador usa o parser XML nativo do navegador, então aplica exatamente as regras das ferramentas XML reais: toda tag deve fechar, atributos devem estar entre aspas, entidades devem ser válidas e só pode haver um elemento raiz.",
        "XML bem formado recebe status verde e uma pré-visualização formatada; problemas mostram a descrição do próprio parser, apontando o trecho com defeito — útil antes de entregar feeds, sitemaps ou SOAP a consumidores exigentes.",
      ],
      steps: [
        "Cole seu XML na caixa de entrada.",
        "Se estiver bem formado aparece um status verde; senão, o erro do parser.",
        "Corrija o problema indicado ou copie a pré-visualização formatada se passar.",
      ],
      faqs: [
        {
          q: "Valida contra um schema DTD ou XSD?",
          a: "Não — verifica apenas a boa formação (estrutura, aspas, entidades, raiz única). A validação por schema exige uma ferramenta dedicada com seu XSD ou DTD.",
        },
        {
          q: "O que conta como erro de XML aqui?",
          a: "Tags não fechadas ou desencontradas, atributos sem aspas, atributos duplicados, referências de entidade inválidas, múltiplas raízes e caracteres ilegais são todos rejeitados.",
        },
        {
          q: "Meu XML é enviado para algum lugar?",
          a: "Não. A verificação roda no seu navegador com o DOMParser nativo — seus dados nunca saem do dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Boa formação: as regras que todo consumidor aplica",
          paragraphs: [
            "Um validador aqui responde uma pergunta — este documento é XML bem formado? — usando o parser XML do próprio navegador, que aplica exatamente o que a ferramenta XML real aplica. A lista de regras é curta mas absoluta: toda tag aberta deve fechar, e em ordem; atributos devem ir entre aspas e aparecer uma vez por elemento; referências a entidades devem estar definidas; um documento tem exatamente um elemento raiz; caracteres ilegais (caracteres de controle, um < ou & perdido no texto) são recusados.",
            "Não são regras de estilo mas as paredes de carga do formato. Uma tag descasada não é um aviso — deixa o documento inanalisável para todo consumidor a jusante, de um navegador a um leitor de feeds a uma pilha SOAP. Por isso falhar a validação deve parar o pipeline: não existe \"majoritariamente bem formado\" com que um parser possa trabalhar. O reverso é uma afirmação forte: se passa, qualquer biblioteca XML em qualquer lugar poderá abrir o documento.",
            "O que passar não significa: que o documento é válido contra um esquema. Um documento cujo <price> contém \"free\" em vez de um número, ou que omite um elemento obrigatório, pode estar perfeitamente bem formado e seguir errado. Validação por esquema (XSD ou DTD) é um trabalho à parte e mais estrito que precisa da sua definição de esquema — esta ferramenta diz que o documento analisa; só você pode dizer se significa algo.",
          ],
        },
        {
          heading: "Lendo os erros: os suspeitos de sempre",
          paragraphs: [
            "As falhas mais comuns são mundanas. Uma tag não fechada — normalmente por uma tag de fechamento apagada ou renomeada — entra em cascata: o parser a reporta onde a estrutura finalmente quebra, que pode ficar longe do erro real. Atributos sem aspas (id=7 em vez de id=\"7\") são ilegais em todo lugar; hábitos de HTML como <br> e <img ...> sem auto-fechamento também são recusados, porque o XML não tem fechamento opcional.",
            "Problemas de entidade são a segunda família. Um & nu no texto inicia uma referência a entidade e deve ser escrito &amp;; um < perdido igualmente deve ser &lt;. Colar conteúdo de HTML ou de processadores de texto é a fonte habitual — esses ambientes toleram o que o XML não tolera. Entidades inválidas ou não definidas (&nbsp; num documento sem a declaração do namespace XHTML, por exemplo) também falham.",
            "O ciclo prático de depuração é curto: conserte o primeiro erro reportado, rode de novo, repita. Erros entram em cascata, então o primeiro costuma ser a causa raiz e os seguintes são ecos. Quando a entrada veio de conversão ou geração em vez de edição à mão, a localização do erro costuma apontar para o bug do código gerador, não para os dados.",
          ],
        },
        {
          heading: "Por que validar no seu navegador",
          paragraphs: [
            "A checagem roda no DOMParser nativo do navegador — seu XML nunca sai do dispositivo, e não há upload, nem limite de taxa, nem rastro. Os documentos que você valida são frequentemente da classe confidencial: payloads de serviços internos, sitemaps ainda não publicados, envelopes SOAP com credenciais, arquivos sob custódia legal. Um validador que os envie transforma cada checagem numa divulgação; a validação local elimina esse risco por completo.",
            "Ser local também significa caber na iteração: cole, leia o erro, conserte, cole de novo — cada ciclo leva segundos, funciona offline e maneja documentos de vários megabytes limitados só pela memória. Combina naturalmente com o formatador (uma análise limpa mais estrutura legível) e com XML para JSON (valide antes de converter, para que um erro com forma de esquema nunca se disfrace de bug de conversão).",
            "Uma fronteira que vale enunciar claramente: o parser do navegador aplica a boa formação com alta fidelidade, mas não carrega DTDs externas nem faz validação por esquema. Se seu pipeline exige validação XSD, esta ferramenta é a primeira porta barata — capture aqui todo erro estrutural, e envie só documentos limpos ao validador de esquema, onde as falhas passam a significar de fato violações de esquema.",
          ],
        },
      ],
    },
  },
});
