import { DevCodeEngine } from "../_engines/dev-engine-code";
import { defineTool } from "../_lib/types";

const SAMPLE = '{"name":"Zoyku","tags":["dev","json"],"nested":{"ok":true,"count":3}}';

export default defineTool({
  slug: "json-minifier",
  category: "developer",
  icon: "crop",
  engine: { component: DevCodeEngine, props: { mode: "json-minify", showSize: true, sample: SAMPLE } },
  related: ["json-formatter", "json-validator", "css-minifier", "html-minifier", "md5-generator", "sha256-generator", "base64-image", "url-encoder", "url-decoder", "json-path-query"],
  copy: {
    en: {
      name: "JSON Minifier",
      tagline:
        "Minify JSON online: strip all whitespace to shrink payloads for faster API responses and smaller storage — see the exact bytes saved, privately in your browser.",
      intro: [
        "Paste pretty-printed JSON and get the most compact valid equivalent back in real time: every space, newline and indentation is removed without touching your data. A live size readout shows the original size, the minified size and the percentage saved.",
        "Use it to slim down API responses, fixture files, translations and JSON config before shipping or storing them. If the input is not valid JSON, the tool tells you the exact line and column of the problem instead of failing silently.",
      ],
      steps: [
        "Paste your formatted JSON into the input box.",
        "The minified one-line output appears instantly, with the size saved shown below.",
        "Copy the compact result or clear the input to start over.",
      ],
      faqs: [
        {
          q: "Does minifying JSON change the data?",
          a: "No. Whitespace outside strings carries no meaning in JSON, so removing it produces an equivalent document with identical values when parsed.",
        },
        {
          q: "How much smaller will my JSON get?",
          a: "It depends on the indentation you are removing — heavily indented files often shrink by 30–60%. The tool shows the exact percentage for your input.",
        },
        {
          q: "Is my data sent anywhere?",
          a: "No. Minification runs entirely in your browser — nothing is uploaded, logged or stored.",
        },
      ],
      deepDive: [
        {
          heading: "Whitespace is free in JSON — except inside strings",
          paragraphs: [
            "The JSON grammar defines whitespace (spaces, tabs, newlines) as ignorable between tokens: between an object's keys and values, between array elements, around brackets. Removing it produces a document that parses to exactly the same value — which is why minification here is a lossless transform, unlike image or audio compression.",
            "The one place whitespace is sacred is inside string values. \"hello world\" with a collapsed space is a different value. A correct minifier walks the grammar rather than applying blind text replacement — that is why the input must be valid JSON first, and why an invalid document gets a line-and-column error instead of a mangled one-liner.",
            "One subtlety the size readout makes visible: numbers and key names are not touched. A minifier does not round 3.14159, reorder keys or shorten \"someVeryLongKeyName\" — those would all change the data. Everything saved comes from formatting alone, which is why the percentage varies so much between a four-space-indented file and a tab-indented one.",
          ],
        },
        {
          heading: "What minification buys you — and what compression does instead",
          paragraphs: [
            "Minified JSON typically shrinks 30–60% versus pretty-printed input, depending on indentation depth. For API responses that figure matters less than it seems, because transport compression eats most of the same bytes: gzip and brotli collapse the repeated indentation and key names almost for free. The minified version still wins on top — compression ratios improve once redundancy is gone — but the marginal gain per response is modest.",
            "Where minification genuinely pays: storage at scale (logs, event archives, embedded fixtures), machine-to-machine file exchange where every megabyte of transfer or disk counts, and JSON embedded inside other documents — a script tag, a data attribute, a config string — where indentation multiplies across thousands of repetitions.",
            "Keep the formatted version as your source of truth. Minified JSON is for machines; debugging a one-line wall of tokens by eye is a losing game. Pair this tool with the formatter: keep pretty files in the repo, minify at the point of use, and reformat whenever a minified payload needs reading.",
          ],
        },
        {
          heading: "Shrinking payloads without shipping them anywhere",
          paragraphs: [
            "The JSON you minify before shipping is often sensitive: configuration with endpoints and keys, translation files for an unreleased product, customer records exported for a migration. A minifier that uploads documents to a backend turns a purely local byte-saving step into a data egress — so this one runs entirely in your browser's JavaScript.",
            "Local execution also means no size ceilings and no latency: a multi-megabyte export minifies as readily as a snippet, and the whole flow works offline. Nothing is logged, so repeated iterations on the same file leave no trace.",
            "A workflow that keeps you honest: minify a copy, never the original. The tool gives you the exact byte savings so you can decide whether the compact form is worth maintaining — for config consumed by machines it usually is; for files humans still edit, formatted source plus minified output at build time beats hand-minified files every time.",
          ],
        },
      ],
    },
    zh: {
      name: "JSON 压缩",
      tagline: "在线压缩 JSON:去掉全部空白,让接口响应更小、存储更省——实时显示节省的字节数与百分比,数据不出浏览器。",
      intro: [
        "粘贴带格式的 JSON,实时得到最紧凑的等价结果:所有空格、换行和缩进都会移除,数据本身不变。下方实时显示原始大小、压缩后大小和节省的百分比。",
        "适合在发布或存储前瘦身接口响应、测试数据、翻译文件和 JSON 配置。如果输入不是合法 JSON,工具会给出精确的行列位置,而不是静默失败。",
      ],
      steps: [
        "把格式化好的 JSON 粘贴到输入框。",
        "压缩后的单行结果即时出现,下方显示节省的比例。",
        "复制紧凑结果,或清空输入重新开始。",
      ],
      faqs: [
        {
          q: "压缩 JSON 会改变数据吗?",
          a: "不会。字符串之外的空白在 JSON 中没有意义,移除后解析出的值完全一致。",
        },
        {
          q: "我的 JSON 能小多少?",
          a: "取决于要去掉的缩进——缩进较多的文件通常能缩小 30%–60%。工具会针对你的输入给出精确百分比。",
        },
        {
          q: "数据会被发送到别处吗?",
          a: "不会。压缩完全在浏览器中完成,不上传、不记录、不存储。",
        },
      ],
      deepDive: [
        {
          heading: "JSON 里空白不占语义——但字符串里例外",
          paragraphs: [
            "JSON 语法把空白(空格、制表符、换行)定义为记号之间可忽略的部分:对象的键值之间、数组元素之间、括号周围。去掉它得到的是解析结果完全相同的文档——所以这里的压缩是无损变换,和图片、音频压缩不是一回事。",
            "唯一神圣的空白在字符串值内部。\"hello world\" 空格被折叠就成了另一个值。正确的压缩器走的是语法而不是盲目文本替换——所以输入必须先是合法 JSON,非法文档得到的是行列报错,而不是一行被搅碎的东西。",
            "大小读数还能揭示一个细节:数字和键名不动。压缩器不会舍入 3.14159,不会重排键,也不会缩短 \"someVeryLongKeyName\"——那些都会改变数据。省下来的全部来自排版本身,所以四空格缩进和 Tab 缩进的文件,节省百分比差很多。",
          ],
        },
        {
          heading: "压缩能省到什么,什么该交给传输压缩",
          paragraphs: [
            "相对带格式的输入,压缩后的 JSON 通常小 30%–60%,取决于缩进深度。对接口响应来说,这个数字比看起来不重要,因为传输压缩吃掉的大多是同一批字节:gzip 和 brotli 几乎免费地折掉重复的缩进和键名。压缩版仍在此基础上再赢一点——冗余消失后压缩率更高——但每条响应的边际收益有限。",
            "真正划算的地方:规模化存储(日志、事件归档、内嵌夹具)、机器对机器的文件交换(每 MB 传输或磁盘都算钱)、以及嵌在其他文档里的 JSON——script 标签、data 属性、配置字符串——那里的缩进会乘上千遍万遍。",
            "把带格式的版本留作唯一事实来源。压缩后的 JSON 是给机器的;肉眼调试一行 token 墙必输。和格式化工具配对使用:仓库里存漂亮文件,使用现场才压缩,拿到压缩 payload 需要读的时候再格式化回来。",
          ],
        },
        {
          heading: "瘦身的 payload 哪儿都不去",
          paragraphs: [
            "发布前要压缩的 JSON 往往敏感:带端点和密钥的配置、未发布产品的翻译文件、迁移导出的客户记录。把文档上传到后端的压缩器,会把一步纯本地的省字节操作变成数据外泄——所以这里完全在浏览器 JavaScript 里跑。",
            "本地执行还意味着没有大小天花板、没有延迟:几 MB 的导出照样轻快压缩,整个流程离线可用。什么都不记录,同一个文件反复迭代也不留痕迹。",
            "一个让你不吃亏的工作流:压缩副本,永远不压原件。工具给出精确的字节节省,让你自己判断紧凑形态值不值得维护——给机器消费的配置通常值得;人还要编辑的文件,格式化源码加构建时压缩输出,永远胜过手工压缩的文件。",
          ],
        },
      ],
    },
    ja: {
      name: "JSON ミニファイアー",
      tagline:
        "JSON をオンラインで圧縮:余白をすべて取り除き、API レスポンスや保存容量を削減。節約できたバイト数をリアルタイム表示します。",
      intro: [
        "整形済みの JSON を貼り付けると、最もコンパクトで等価な結果がリアルタイムに得られます。空白・改行・インデントをすべて除去しますが、データは一切変わりません。元のサイズ・圧縮後のサイズ・節約率を常時表示します。",
        "API レスポンス、フィクスチャ、翻訳ファイル、JSON 設定を公開や保存の前に軽量化するのに便利です。入力が不正な JSON の場合は、黙って失敗せずに行と列を正確に通知します。",
      ],
      steps: [
        "整形済み JSON を入力欄に貼り付けます。",
        "圧縮された 1 行の出力が即座に表示され、節約率も下部に出ます。",
        "結果をコピーするか、入力をクリアしてやり直します。",
      ],
      faqs: [
        {
          q: "圧縮すると JSON のデータは変わりますか?",
          a: "変わりません。文字列の外側の空白は JSON では意味を持たないため、除去してもパース結果は同一です。",
        },
        {
          q: "どれくらい小さくなりますか?",
          a: "除去するインデントの量によります。インデントが多いファイルは 30〜60% 縮むことも多いです。入力ごとの正確な割合を表示します。",
        },
        {
          q: "データはどこかに送信されますか?",
          a: "いいえ。圧縮は完全にブラウザ内で行われ、アップロード・記録・保存は一切ありません。",
        },
      ],
      deepDive: [
        {
          heading: "JSON では空白は意味を持たない——文字列の中を除いて",
          paragraphs: [
            "JSON の文法は空白(スペース、タブ、改行)をトークン間の無視できるものとして定義します。オブジェクトのキーと値の間、配列要素の間、括弧の周り。それを取り除いた文書は解析結果が完全に同一の値になります。だからここの圧縮は可逆変換で、画像や音声の圧縮とは別物です。",
            "空白が聖域なのは文字列値の内側だけです。\"hello world\" のスペースを詰めれば別の値になります。正しいミニファイアーは盲目的な文字列置換ではなく文法に沿って歩みます。だから入力はまず有効な JSON でなければならず、不正な文書にはぐちゃぐちゃの 1 行ではなく行・列のエラーが返ります。",
            "サイズ表示から見えるもう一つの細部。数値とキー名は手を付けません。3.14159 を丸めず、キーを並べ替えず、\"someVeryLongKeyName\" を短縮しません。どれもデータを変えてしまいます。節約はすべて整形由来なので、4 スペースとタブのファイルで節約率が大きく違うのは当然です。",
          ],
        },
        {
          heading: "圧縮で得られるもの、転送圧縮に任せるもの",
          paragraphs: [
            "整形済み入力に比べ、ミニファイ後の JSON は 30〜60% 縮むのが普通です。縮めるのはインデントの深さ次第。API レスポンスではこの数字は見た目ほど効きません。転送圧縮がほぼ同じバイトを食べてくれるからです。gzip や brotli は繰り返すインデントとキー名をほぼ無料で潰します。ミニファイはその上でも勝ちます——冗長が消えたぶん圧縮率が上がる——が、レスポンスあたりの限界利益は控えめです。",
            "本当に効く場所はこうです。大規模な保管(ログ、イベント アーカイブ、組み込みフィクスチャ)。マシン間のファイル交換(転送もディスクも 1 MB ごとに課金される)。そして別の文書に埋め込まれた JSON——script タグ、data 属性、設定文字列——では、インデントが何千回も掛け算されます。",
            "整形版を唯一の事実の源として残してください。ミニファイ後の JSON はマシン向けです。トークンの壁を 1 行で目視デバッグは負けゲーム。フォーマッターとペアにします。リポジトリには整形版を置き、使う現場で圧縮し、読む必要が生きたら整形して戻す。",
          ],
        },
        {
          heading: "スリム化したペイロードはどこにも送らない",
          paragraphs: [
            "出荷前に圧縮する JSON はしばしば機密です。エンドポイントとキー入りの設定、未公開プロダクトの翻訳ファイル、移行用に書き出した顧客レコード。文書をバックエンドへアップロードするミニファイアーは、純粋にローカルの節約ステップをデータ流出に変えます。だからここでは完全にブラウザの JavaScript で動きます。",
            "ローカル実行は、サイズの天井なし、遅延なしも意味します。数 MB のエクスポートも断片と同じ手軽さで圧縮でき、フロー全体がオフラインで動きます。何も記録しないので、同じファイルで繰り返しても痕跡は残りません。",
            "損をしないワークフローが一つ。圧縮するのはコピーで、原稿は常に手元に。ツールは正確なバイト節約を出すので、コンパクト形を維持する価値があるか自分で判断できます。マシンが消費する設定ならたいてい価値があります。人間がまだ編集するファイルは、整形ソースとビルド時の圧縮出力の組み合わせが、手圧縮ファイルに毎回勝ります。",
          ],
        },
      ],
    },
    es: {
      name: "Minificador JSON",
      tagline:
        "Minifica JSON en línea: elimina todo el espacio en blanco para respuestas de API más ligeras y menos almacenamiento, con el ahorro exacto en bytes. Sin salir del navegador.",
      intro: [
        "Pega JSON con formato y obtén en tiempo real el equivalente válido más compacto: se eliminan todos los espacios, saltos de línea e indentación sin tocar tus datos. Un indicador muestra el tamaño original, el reducido y el porcentaje ahorrado.",
        "Úsalo para aligerar respuestas de API, fixtures, traducciones y configuración JSON antes de publicarlas o guardarlas. Si la entrada no es JSON válido, la herramienta indica la línea y columna exactas del problema.",
      ],
      steps: [
        "Pega tu JSON formateado en el cuadro de entrada.",
        "La salida minificada en una sola línea aparece al instante, con el ahorro indicado debajo.",
        "Copia el resultado compacto o borra la entrada para empezar de nuevo.",
      ],
      faqs: [
        {
          q: "¿Minificar JSON cambia los datos?",
          a: "No. Los espacios fuera de las cadenas no tienen significado en JSON, así que eliminarlos produce un documento equivalente con los mismos valores.",
        },
        {
          q: "¿Cuánto más pequeño quedará mi JSON?",
          a: "Depende de la indentación que elimines: los archivos muy indentados suelen reducirse entre un 30 % y un 60 %. La herramienta muestra el porcentaje exacto de tu entrada.",
        },
        {
          q: "¿Mis datos se envían a algún sitio?",
          a: "No. La minificación ocurre íntegramente en tu navegador: nada se sube, registra o almacena.",
        },
      ],
      deepDive: [
        {
          heading: "El espacio en blanco no significa nada en JSON — salvo dentro de las cadenas",
          paragraphs: [
            "La gramática JSON define el espacio en blanco (espacios, tabulaciones, saltos de línea) como ignorable entre tokens: entre las claves y valores de un objeto, entre elementos de un array, alrededor de los corchetes. Quitarlo produce un documento que parsea exactamente al mismo valor — por eso la minificación aquí es una transformación sin pérdida, al contrario que la compresión de imagen o audio.",
            "El único lugar donde el espacio es sagrado es dentro de los valores de cadena. \"hello world\" con el espacio colapsado es otro valor. Un minificador correcto recorre la gramática en vez de aplicar reemplazos de texto a ciegas — por eso la entrada debe ser JSON válido primero, y un documento inválido recibe un error de línea y columna en lugar de una línea triturada.",
            "Un detalle que hace visible el indicador de tamaño: los números y los nombres de clave no se tocan. El minificador no redondea 3.14159, no reordena claves ni abrevia \"someVeryLongKeyName\" — cualquiera de esas cosas cambiaría los datos. Todo lo ahorrado viene del formato, y de ahí que el porcentaje varíe tanto entre un archivo indentado a cuatro espacios y uno con tabulaciones.",
          ],
        },
        {
          heading: "Lo que la minificación compra — y lo que hace la compresión en su lugar",
          paragraphs: [
            "El JSON minificado suele encoger un 30–60% frente al formateado, según la profundidad de la indentación. Para respuestas de API esa cifra importa menos de lo que parece, porque la compresión de transporte se come casi los mismos bytes: gzip y brotli colapsan la indentación repetida y los nombres de clave casi gratis. La versión minificada todavía gana encima — los ratios de compresión mejoran al desaparecer la redundancia — pero la ganancia marginal por respuesta es modesta.",
            "Donde la minificación paga de verdad: almacenamiento a escala (logs, archivos de eventos, fixtures embebidos), intercambio de archivos entre máquinas donde cada megabyte de transferencia o disco cuenta, y JSON incrustado en otros documentos — una etiqueta script, un atributo data, una cadena de configuración — donde la indentación se multiplica por miles de repeticiones.",
            "Conserva la versión formateada como fuente de verdad. El JSON minificado es para máquinas; depurar una pared de tokens a simple vista es un juego perdido. Emparéjala con el formateador: archivos bonitos en el repositorio, minificar en el punto de uso, y reformatear cuando un payload minificado necesite leerse.",
          ],
        },
        {
          heading: "Reducir payloads sin enviarlos a ninguna parte",
          paragraphs: [
            "El JSON que minificas antes de publicarlo suele ser sensible: configuración con endpoints y claves, archivos de traducción de un producto sin lanzar, registros de clientes exportados para una migración. Un minificador que sube documentos a un backend convierte un paso puramente local de ahorro de bytes en una salida de datos — por eso este corre íntegramente en el JavaScript de tu navegador.",
            "La ejecución local también significa sin techos de tamaño y sin latencia: una exportación de varios megabytes se minifica tan fácil como un fragmento, y todo el flujo funciona sin conexión. Nada se registra, así que iterar repetidamente sobre el mismo archivo no deja rastro.",
            "Un flujo que te mantiene honesto: minifica una copia, nunca el original. La herramienta te da el ahorro exacto en bytes para que decidas si la forma compacta merece mantenerse — para configuración consumida por máquinas casi siempre; para archivos que humanos aún editan, fuente formateada más salida minificada en build le gana siempre a archivos minificados a mano.",
          ],
        },
      ],
    },
    pt: {
      name: "Minificador JSON",
      tagline:
        "Minifique JSON on-line: remova todo o espaço em branco para respostas de API mais leves e menos armazenamento, vendo exatamente quantos bytes você economiza.",
      intro: [
        "Cole JSON formatado e receba em tempo real o equivalente válido mais compacto: todos os espaços, quebras de linha e indentações são removidos sem tocar nos seus dados. Um indicador mostra o tamanho original, o reduzido e a porcentagem economizada.",
        "Use para enxugar respostas de API, fixtures, arquivos de tradução e configuração JSON antes de publicar ou armazenar. Se a entrada não for JSON válido, a ferramenta informa a linha e a coluna exatas do problema.",
      ],
      steps: [
        "Cole seu JSON formatado na caixa de entrada.",
        "A saída minificada em uma linha aparece na hora, com a economia indicada abaixo.",
        "Copie o resultado compacto ou limpe a entrada para começar de novo.",
      ],
      faqs: [
        {
          q: "Minificar o JSON altera os dados?",
          a: "Não. Espaços fora das strings não têm significado em JSON, então removê-los produz um documento equivalente com os mesmos valores.",
        },
        {
          q: "Quanto menor meu JSON pode ficar?",
          a: "Depende da indentação removida — arquivos bem indentados costumam encolher de 30% a 60%. A ferramenta mostra a porcentagem exata da sua entrada.",
        },
        {
          q: "Meus dados são enviados para algum lugar?",
          a: "Não. A minificação acontece inteiramente no seu navegador — nada é enviado, registrado ou armazenado.",
        },
      ],
      deepDive: [
        {
          heading: "Espaço em branco não significa nada em JSON — exceto dentro de strings",
          paragraphs: [
            "A gramática JSON define o espaço em branco (espaços, tabulações, quebras de linha) como ignorável entre tokens: entre as chaves e valores de um objeto, entre elementos de um array, ao redor dos colchetes. Removê-lo produz um documento que parseia exatamente para o mesmo valor — por isso a minificação aqui é uma transformação sem perda, ao contrário da compressão de imagem ou áudio.",
            "O único lugar onde o espaço é sagrado é dentro dos valores de string. \"hello world\" com o espaço colapsado é outro valor. Um minificador correto percorre a gramática em vez de aplicar substituições de texto às cegas — por isso a entrada precisa ser JSON válido primeiro, e um documento inválido recebe um erro de linha e coluna em vez de uma linha triturada.",
            "Um detalhe que o indicador de tamanho torna visível: números e nomes de chaves não são tocados. O minificador não arredonda 3.14159, não reordena chaves nem abrevia \"someVeryLongKeyName\" — qualquer uma dessas coisas mudaria os dados. Tudo o que se economiza vem da formatação, e daí o percentual variar tanto entre um arquivo indentado com quatro espaços e um com tabulação.",
          ],
        },
        {
          heading: "O que a minificação compra — e o que a compressão faz no lugar",
          paragraphs: [
            "JSON minificado costuma encolher 30–60% diante da entrada formatada, dependendo da profundidade da indentação. Para respostas de API, esse número importa menos do que parece, porque a compressão de transporte come quase os mesmos bytes: gzip e brotli colapsam a indentação repetida e os nomes de chaves quase de graça. A versão minificada ainda vence por cima — os índices de compressão melhoram quando a redundância desaparece — mas o ganho marginal por resposta é modesto.",
            "Onde a minificação realmente paga: armazenamento em escala (logs, arquivos de eventos, fixtures embutidos), troca de arquivos entre máquinas onde cada megabyte de transferência ou disco conta, e JSON embutido em outros documentos — uma tag script, um atributo data, uma string de configuração — onde a indentação se multiplica por milhares de repetições.",
            "Guarde a versão formatada como fonte de verdade. JSON minificado é para máquinas; depurar uma parede de tokens a olho é um jogo perdido. Faça par com o formatador: arquivos bonitos no repositório, minificar no ponto de uso, e reformatar quando um payload minificado precisar ser lido.",
          ],
        },
        {
          heading: "Encolher payloads sem enviá-los a lugar nenhum",
          paragraphs: [
            "O JSON que você minifica antes de publicar costuma ser sensível: configuração com endpoints e chaves, arquivos de tradução de um produto não lançado, registros de clientes exportados para migração. Um minificador que sobe documentos para um backend transforma um passo puramente local de economia de bytes numa saída de dados — por este roda inteiramente no JavaScript do seu navegador.",
            "Execução local também significa sem tetos de tamanho e sem latência: uma exportação de vários megabytes minifica tão facilmente quanto um trecho, e todo o fluxo funciona offline. Nada é registrado, então iterar repetidamente sobre o mesmo arquivo não deixa rastro.",
            "Um fluxo que mantém você honesto: minifique uma cópia, nunca o original. A ferramenta dá a economia exata em bytes para você decidir se a forma compacta merece ser mantida — para configuração consumida por máquinas, quase sempre; para arquivos que humanos ainda editam, fonte formatada mais saída minificada em build ganha sempre de arquivos minificados à mão.",
          ],
        },
      ],
    },
  },
});
