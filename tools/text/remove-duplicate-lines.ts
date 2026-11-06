import { TextTransform } from "../_engines/text-tool";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "remove-duplicate-lines",
  category: "text",
  icon: "layers",
  engine: {
    component: TextTransform,
    props: {
      transform: "dedupe-lines",
      options: [
        { key: "ignoreCase", label: { en: "Ignore case", zh: "忽略大小写", ja: "大文字小文字を無視", es: "Ignorar mayúsculas", pt: "Ignorar maiúsculas" } },
        { key: "trimFirst", label: { en: "Trim lines first", zh: "先去行首尾空格", ja: "先にトリム", es: "Recortar antes", pt: "Trim antes" } },
        { key: "removeEmpty", label: { en: "Remove empty lines", zh: "删除空行", ja: "空行を削除", es: "Quitar líneas vacías", pt: "Remover linhas vazias" } },
        { key: "sortAfter", label: { en: "Sort result A→Z", zh: "结果按 A→Z 排序", ja: "結果を A→Z で整列", es: "Ordenar A→Z", pt: "Ordenar A→Z" } },
      ],
    },
  },
  related: ["remove-extra-spaces", "text-sorter", "text-cleaner", "word-counter", "text-diff", "lorem-ipsum-generator", "sentence-counter", "text-to-binary", "reverse-text", "slug-generator"],
  copy: {
    en: {
      name: "Remove Duplicate Lines",
      tagline: "Delete repeated lines from lists and logs while keeping the original order — with case and trim options.",
      intro: [
        "Paste any list — email addresses, URLs, keywords, coupon codes, log lines — and get back the same list with duplicates removed in one pass. The first occurrence keeps its position and every later repeat is dropped, which is usually what you want when cleaning a mailing list or a keyword export.",
        "Four options cover the usual variants: ignore letter case so 'Apple' and 'apple' collapse to one entry, trim surrounding whitespace so ' item' matches 'item', drop empty lines left over from double pastes, and sort the result after de-duplication so the cleaned list comes out ordered.",
        "De-duplication uses a hash set, so it runs in linear time — a list of tens of thousands of lines is processed instantly instead of grinding through pairwise comparisons. Case folding is a simple lowercase mapping; accents stay significant, so 'Café' and 'café' remain two entries unless ignoring case makes them equal.",
        "Compared with spreadsheet Remove Duplicates, there is no workbook, no column selection and no file upload — the list never leaves your browser. Pair it with text-sorter for ordered output, or run remove-extra-spaces first to normalize spacing and catch near-duplicates that differ only in whitespace.",
      ],
      steps: [
        "Paste your list into the input box — one entry per line.",
        "Toggle options if you need case-insensitive matching or cleanup.",
        "Copy the deduplicated output; the original order is preserved unless you enable sorting.",
      ],
      faqs: [
        {
          q: "Does it keep the original line order?",
          a: "Yes. The first occurrence of each line is kept in place. Sorting only happens if you enable the sort option.",
        },
        {
          q: "Can it treat 'Apple' and 'apple' as duplicates?",
          a: "Enable 'Ignore case' and they will be treated as the same line; the first variant seen is kept.",
        },
      ],
      deepDive: [
        {
          heading: "What counts as a duplicate depends on the comparison rule",
          paragraphs: [
            "Duplicate detection is a comparison decision, and three decisions change the result. Exact match: \"data\" and \"data\" are duplicates, but \"data \" (trailing space) and \"Data\" (capital) are not. Trim-and-case-insensitive matching treats \"Data \" and \"data\" as the same line — usually what you want when the input comes from copy-paste or form exports, where invisible whitespace sneaks in constantly.",
            "There is also a semantic decision: keep the first occurrence or the last? For logs and IDs, first-occurrence preserves the original order of arrival. For price lists where later rows update earlier ones, keeping the last is the correct choice. This tool keeps the first occurrence and preserves line order, which matches most deduplication expectations.",
            "A related trap is invisible characters: tabs, non-breaking spaces and zero-width characters make two visually identical lines differ. If a dedup runs clean but you can still see duplicates, run a whitespace cleanup first — the remove-extra-spaces tool on this site exists precisely for that step.",
          ],
        },
        {
          heading: "Why deduplication before sorting and counting",
          paragraphs: [
            "Deduplication is usually a preprocessing step, not the goal. Before counting unique values, dedup — otherwise the count counts repeats twice. Before sorting, dedup — sorting a list with thousands of identical rows wastes the reader's attention and any downstream line-number references. Before building a CSV import or a SQL IN list, dedup — duplicate keys there cause either errors or silent double-processing.",
            "The classic data-cleaning order is: normalize whitespace, then dedup, then sort, then transform. Doing it backwards (sort first, dedup later) still works but makes the diff against the previous version noisy: every removed duplicate shows as a scattered deletion instead of a tidy block.",
            "For text corpora — keyword lists, email recipients, tag inventories — deduplication is also a correctness tool: a duplicated recipient gets mailed twice, a duplicated tag skews frequency analysis. One click here beats a spreadsheet formula chain.",
          ],
        },
        {
          heading: "Local processing, order preserved",
          paragraphs: [
            "The whole list is processed in browser JavaScript: split on line breaks, compare, emit unique lines in first-occurrence order. No upload, no round trip, and the tool works offline after the page loads.",
            "Large inputs are fine — hundreds of thousands of lines process in well under a second on a normal machine, since the comparison is a hash-set lookup per line, not a pairwise scan. Pairwise comparison is what makes naive dedup slow at scale; this tool does not do that.",
            "Nothing is stored: refresh the page and the input is gone. For customer lists, internal ID inventories or any dataset with personal data, that is the safe shape of tool to use — the data never becomes someone else's log entry.",
          ],
        },
      ],
    },
    zh: {
      name: "删除重复行",
      tagline: "一键删除列表和日志中的重复行,保留原始顺序,支持忽略大小写等选项。",
      intro: [
        "把任何列表——邮箱、URL、关键词、日志行——粘贴进来,一遍跑完去重。常用变体都有开关:忽略大小写、比较前先去空格、丢掉空行、对结果排序。",
      ],
      steps: [
        "把列表粘贴到输入框,每行一条。",
        "需要忽略大小写或清理时,打开对应选项。",
        "复制去重后的输出;不开排序时保持原始顺序。",
      ],
      faqs: [
        {
          q: "会保留原始行序吗?",
          a: "会。每行保留第一次出现的位置;只有打开排序选项才会重排。",
        },
        {
          q: "能把 'Apple' 和 'apple' 视为重复吗?",
          a: "打开“忽略大小写”即可;两者算同一行,保留先出现的那个。",
        },
      ],
      deepDive: [
        {
          heading: "什么算“重复”,取决于比较规则",
          paragraphs: [
            "重复检测本质上是一次比较决策,有三个决策会改变结果。精确匹配:“data” 和 “data” 重复,但带尾随空格的 “data ” 和大写的 “Data” 不算。忽略大小写并修剪空白后,“Data ” 和 “data” 就是同一行——当输入来自复制粘贴或表单导出时,这通常才是你想要的,因为不可见空白几乎无孔不入。",
            "还有语义层面的选择:保留第一次出现还是最后一次?日志和 ID 场景里,保留首次出现等于保留到达顺序;价格表里后一行覆盖前一行时,保留末次才正确。本工具保留首次出现并维持行序,符合绝大多数去重预期。",
            "另一个坑是不可见字符:制表符、不间断空格、零宽字符会让两条看起来一模一样的行判为不同。如果去重跑完却还看得见重复,先做一遍空白清理——本站的 remove-extra-spaces 就是为这一步准备的。",
          ],
        },
        {
          heading: "为什么去重要排在排序和计数之前",
          paragraphs: [
            "去重通常是预处理,不是目的。统计唯一值之前先去重,否则重复项会被数两遍。排序之前先去重,否则几千行完全相同的记录既浪费读者注意力,也会让下游的行号引用失真。生成 CSV 导入或 SQL IN 列表之前先去重,重复键要么报错、要么被静默处理两次。",
            "经典的数据清洗顺序是:先规范空白,再去重,再排序,最后做变换。反着来(先排序后去重)也能跑通,但和上一版的 diff 会很吵:每处删除都散落各处,而不是整块消失。",
            "对文本语料——关键词表、收件人列表、标签清单——去重还是正确性工具:重复的收件人会收到两封邮件,重复的标签会污染频次统计。在这里点一下,胜过在表格里搭一串公式。",
          ],
        },
        {
          heading: "本地处理,保序",
          paragraphs: [
            "整份列表在浏览器 JavaScript 里处理:按换行切分、比较、按首次出现顺序输出唯一行。不上传、无往返,页面加载后断网也能用。",
            "大输入没有压力:几十万行在普通机器上远不到一秒,因为每行的比较是一次哈希查找,而不是两两扫描。两两比较正是朴素去重在数据量大时变慢的原因,本工具不走那条路。",
            "不保存任何内容:刷新页面输入即消失。对客户名单、内部 ID 清单或任何含个人信息的数据集,这正是该用的工具形态——数据永远不会变成别人服务器上的一条日志。",
          ],
        },
      ],
    },
    ja: {
      name: "重複行の削除",
      tagline: "リストやログから重複行を元の順序を保ったまま一括削除。大文字無視などのオプション付き。",
      intro: [
        "メールアドレス、URL、キーワード、ログ行など、どんなリストも貼り付ければ一発で重複解除。大文字小文字を無視、比較前にトリム、空行の削除、結果の整列という定番オプションを用意しています。",
      ],
      steps: [
        "リストを入力欄に貼り付けます(1 行 1 項目)。",
        "必要に応じて大小文字の無視やクリーンアップのオプションを切り替えます。",
        "重複を除いた出力をコピーします。整列を有効にしない限り元の順序は保持されます。",
      ],
      faqs: [
        {
          q: "元の行の順序は保持されますか?",
          a: "はい。各行の最初の出現位置がそのまま残ります。整列オプションを有効にした場合のみ並べ替えます。",
        },
        {
          q: "'Apple' と 'apple' を重複扱いにできますか?",
          a: "「大文字小文字を無視」を有効にすると同一行として扱われ、先に現れた方が残ります。",
        },
      ],
      deepDive: [
        {
          heading: "何が重複かは比較ルール次第",
          paragraphs: [
            "重複検出は本質的に比較の意思決定で、3 つの決定が結果を変えます。完全一致では「data」と「data」は重複ですが、末尾空白付きの「data 」や大文字の「Data」は別物です。空白のトリムと大文字小文字を無視すれば、「Data 」と「data」は同一行になります。入力がコピペやフォーム出力由来なら、通常はこちらが望む挙動です。不可視の空白は絶えず紛れ込みます。",
            "意味面の選択もあり、最初の出現を残すか最後を残すかの違いがあります。ログや ID では最初の出現が到着順を保ち、後の行が前の行を更新する価格表では最後を残すのが正解です。このツールは最初の出現を保持し行順を維持します。ほとんどの重複除去の期待に合う挙動です。",
            "もう一つの落とし穴が不可視文字です。タブ、ノーブレークスペース、ゼロ幅の文字は、見た目が同じ 2 行を別判定させます。重複除去を走らせたのに重複が見えるままなら、まず空白のクリーンアップを——本サイトの remove-extra-spaces はまさにこの工程のためのものです。",
          ],
        },
        {
          heading: "並べ替えとカウントの前に重複除去を",
          paragraphs: [
            "重複除去は通常、前処理であって目的ではありません。一意な値を数える前に行うのは、重複を二重に数えないためです。並べ替えの前に行うのは、同一行数千の浪费から読み手の注意を守り、下流の行番号参照を正しく保つためです。CSV 取り込みや SQL の IN リストを作る前に行うのは、重複キーがエラーを起こしたり、黙って二重処理されたりするのを防ぐためです。",
            "定番のデータ整形順序は、空白の正規化→重複除去→並べ替え→変換です。逆(並べ替え→重複除去)でも動きますが、以前の版との差分が騒がしくなります。削除された重複が散在的な削除として現れ、整然とした塊として現れないからです。",
            "テキストコーパス——キーワードリスト、受信者リスト、タグ在庫——では、重複除去は正しさの道具でもあります。重複した受信者は 2 通のメールを受け取り、重複したタグは頻度分析を歪めます。ここでの 1 クリックは、表計算の数式の連鎖に勝ちます。",
          ],
        },
        {
          heading: "ローカル処理、順序保持",
          paragraphs: [
            "リスト全体はブラウザの JavaScript で処理されます。改行で分割し、比較し、最初の出現順に一意な行を出力する。アップロードも往復もなく、ページ読み込み後はオフラインで動きます。",
            "大きな入力も問題ありません。数十万行が普通のマシンで 1 秒未満で処理されます。行ごとの比較がハッシュセット参照であって、全ペア走査ではないからです。全ペア比較こそが素朴な重複除去を大規模で遅くするもので、このツールはそれをしません。",
            "何も保存しません。ページを更新すれば入力は消えます。顧客リスト、内部 ID の在庫、個人データを含むデータセットにとって、それが安全なツールの形です。データが誰か他の人のログエントリになることは決してありません。",
          ],
        },
      ],
    },
    es: {
      name: "Eliminar líneas duplicadas",
      tagline: "Borra líneas repetidas de listas y registros conservando el orden, con opciones de mayúsculas y recorte.",
      intro: [
        "Pega cualquier lista —correos, URLs, palabras clave, líneas de log— y recupérala sin duplicados en una sola pasada. Las opciones cubren los casos típicos: ignorar mayúsculas, recortar antes de comparar, quitar líneas vacías u ordenar el resultado.",
      ],
      steps: [
        "Pega tu lista en el cuadro de entrada: una entrada por línea.",
        "Activa opciones si necesitas comparación sin mayúsculas o limpieza.",
        "Copia la salida sin duplicados; el orden original se conserva salvo que actives la ordenación.",
      ],
      faqs: [
        {
          q: "¿Se mantiene el orden original?",
          a: "Sí. De cada línea se conserva su primera aparición en su sitio. Solo se reordena si activas la opción de ordenar.",
        },
        {
          q: "¿Puede tratar 'Apple' y 'apple' como duplicadas?",
          a: "Activa «Ignorar mayúsculas» y se considerarán la misma línea; se conserva la primera variante vista.",
        },
      ],
      deepDive: [
        {
          heading: "Qué cuenta como duplicado depende de la regla de comparación",
          paragraphs: [
            "La detección de duplicados es una decisión de comparación, y tres decisiones cambian el resultado. Coincidencia exacta: \"datos\" y \"datos\" son duplicados, pero \"datos \" (con espacio final) y \"Datos\" (con mayúscula) no lo son. Con recorte de espacios y comparación sin distinción de mayúsculas, \"Datos \" y \"datos\" pasan a ser la misma línea — normalmente lo que quieres cuando la entrada viene de copiar-pegar o de exportaciones de formularios, donde el espacio invisible se cuela sin parar.",
            "También hay una decisión semántica: ¿conservar la primera aparición o la última? En registros e IDs, la primera aparición conserva el orden de llegada. En listas de precios donde las filas posteriores actualizan a las anteriores, lo correcto es conservar la última. Esta herramienta conserva la primera aparición y mantiene el orden de las líneas, que es lo que espera la mayoría de las deduplicaciones.",
            "Otra trampa son los caracteres invisibles: tabulaciones, espacios de no separación y caracteres de ancho cero hacen que dos líneas visualmente idénticas difieran. Si la dedup limpia pero sigues viendo duplicados, pasa antes una limpieza de espacios — la herramienta remove-extra-spaces de este sitio existe justo para ese paso.",
          ],
        },
        {
          heading: "Por qué deduplicar antes de ordenar y contar",
          paragraphs: [
            "La deduplicación suele ser un paso de preparación, no el objetivo. Antes de contar valores únicos, deduplica — si no, el recuento cuenta dos veces los repetidos. Antes de ordenar, deduplica — ordenar miles de filas idénticas gasta la atención del lector y distorsiona cualquier referencia de número de línea aguas abajo. Antes de montar un import CSV o una lista IN de SQL, deduplica — las claves duplicadas provocan errores o procesamiento doble silencioso.",
            "El orden clásico de limpieza es: normalizar espacios, deduplicar, ordenar y transformar. Al revés (ordenar primero, deduplicar después) también funciona, pero el diff contra la versión anterior se vuelve ruidoso: cada eliminación aparece dispersa en lugar de como un bloque limpio.",
            "Para corpus de texto — listas de palabras clave, destinatarios, inventarios de etiquetas — la deduplicación es además una herramienta de corrección: un destinatario duplicado recibe dos correos y una etiqueta duplicada sesga el análisis de frecuencia. Un clic aquí gana a una cadena de fórmulas de hoja de cálculo.",
          ],
        },
        {
          heading: "Procesado local, orden conservado",
          paragraphs: [
            "La lista entera se procesa en JavaScript del navegador: partir por saltos de línea, comparar y emitir las líneas únicas en orden de primera aparición. Sin subida, sin ida y vuelta, y la herramienta funciona sin conexión una vez cargada la página.",
            "Las entradas grandes van bien: cientos de miles de líneas se procesan en menos de un segundo en una máquina normal, porque comparar cada línea es una búsqueda en un conjunto hash, no un barrido por pares. La comparación por pares es lo que vuelve lento el dedup ingenuo a escala; esta herramienta no hace eso.",
            "No se guarda nada: recarga la página y la entrada desaparece. Para listas de clientes, inventarios de IDs internos o cualquier dataset con datos personales, esa es la forma segura de herramienta: los datos nunca se convierten en la entrada del registro de otro.",
          ],
        },
      ],
    },
    pt: {
      name: "Remover linhas duplicadas",
      tagline: "Apague linhas repetidas de listas e logs mantendo a ordem original, com opções de maiúsculas e trim.",
      intro: [
        "Cole qualquer lista — e-mails, URLs, palavras-chave, linhas de log — e receba de volta a lista sem duplicados numa passada. As opções cobrem os casos comuns: ignorar maiúsculas, trim antes de comparar, descartar linhas vazias ou ordenar o resultado.",
      ],
      steps: [
        "Cole sua lista na caixa de entrada — uma entrada por linha.",
        "Ative opções se precisar de comparação sem diferenciar maiúsculas ou de limpeza.",
        "Copie a saída sem duplicados; a ordem original é mantida, a menos que você ative a ordenação.",
      ],
      faqs: [
        {
          q: "A ordem original é mantida?",
          a: "Sim. A primeira ocorrência de cada linha fica no lugar. Só reordena se você ativar a opção de ordenar.",
        },
        {
          q: "Dá para tratar 'Apple' e 'apple' como duplicadas?",
          a: "Ative “Ignorar maiúsculas” e as duas serão a mesma linha; a primeira variante vista é a que fica.",
        },
      ],
      deepDive: [
        {
          heading: "O que conta como duplicado depende da regra de comparação",
          paragraphs: [
            "A detecção de duplicados é uma decisão de comparação, e três decisões mudam o resultado. Correspondência exata: \"dados\" e \"dados\" são duplicados, mas \"dados \" (com espaço no fim) e \"Dados\" (com maiúscula) não são. Com corte de espaços e comparação sem distinguir maiúsculas, \"Dados \" e \"dados\" viram a mesma linha — normalmente o que você quer quando a entrada vem de copiar e colar ou de exportações de formulários, onde o espaço invisível entra sem parar.",
            "Há também uma decisão semântica: manter a primeira ocorrência ou a última? Em logs e IDs, a primeira ocorrência preserva a ordem de chegada. Em listas de preços onde linhas posteriores atualizam as anteriores, o correto é manter a última. Esta ferramenta mantém a primeira ocorrência e preserva a ordem das linhas, que é o que a maioria das deduplicações espera.",
            "Outra armadilha são os caracteres invisíveis: tabulações, espaços rígidos e caracteres de largura zero fazem duas linhas visualmente idênticas diferirem. Se a dedup roda limpa mas você ainda vê duplicados, passe antes uma limpeza de espaços — a ferramenta remove-extra-spaces deste site existe justamente para esse passo.",
          ],
        },
        {
          heading: "Por que deduplicar antes de ordenar e contar",
          paragraphs: [
            "A deduplicação costuma ser um passo de preparação, não o objetivo. Antes de contar valores únicos, deduplique — senão a contagem conta os repetidos duas vezes. Antes de ordenar, deduplique — ordenar milhares de linhas idênticas desperdiça a atenção do leitor e distorce referências de número de linha a jusante. Antes de montar um import CSV ou uma lista IN de SQL, deduplique — chaves duplicadas causam erros ou processamento duplo silencioso.",
            "A ordem clássica de limpeza é: normalizar espaços, deduplicar, ordenar e transformar. Ao contrário (ordenar primeiro, deduplicar depois) também funciona, mas o diff contra a versão anterior fica ruidoso: cada remoção aparece espalhada em vez de como um bloco limpo.",
            "Para corpora de texto — listas de palavras-chave, destinatários, inventários de tags — a deduplicação é também uma ferramenta de correção: um destinatário duplicado recebe dois e-mails, e uma tag duplicada enviesa a análise de frequência. Um clique aqui vence uma cadeia de fórmulas de planilha.",
          ],
        },
        {
          heading: "Processamento local, ordem preservada",
          paragraphs: [
            "A lista inteira é processada em JavaScript do navegador: dividir por quebras de linha, comparar e emitir as linhas únicas na ordem da primeira ocorrência. Sem upload, sem ida e volta, e a ferramenta funciona offline depois que a página carrega.",
            "Entradas grandes vão bem: centenas de milhares de linhas processam em menos de um segundo numa máquina normal, porque comparar cada linha é uma busca em conjunto hash, não uma varredura por pares. A comparação por pares é o que deixa o dedup ingênuo lento em escala; esta ferramenta não faz isso.",
            "Nada é guardado: recarregue a página e a entrada some. Para listas de clientes, inventários de IDs internos ou qualquer dataset com dados pessoais, essa é a forma segura de ferramenta — os dados nunca viram um registro no log de outra pessoa.",
          ],
        },
      ],
    },
  },
});
