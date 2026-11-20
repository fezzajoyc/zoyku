import type { Locale } from "@/lib/site";
import { JSON_FORMAT_LIMITS, type JsonFormatLimitKind } from "./json-format";
import { fill, type ToolCopy } from "./types";

type Messages = {
  formatterTagline: string; minifierTagline: string;
  preserve: string; duplicates: string; sorting: string; limits: string;
  inputStep: string; formatStep: string; minifyStep: string; reviewStep: string;
  preserveQuestion: string; duplicatesQuestion: string; sortQuestion: string; limitsQuestion: string;
  errors: Record<JsonFormatLimitKind, string>;
};

/** Authored in every supported locale; limits are filled from the formatter. */
export const JSON_CAPABILITY_MESSAGES: Record<Locale, Messages> = {
  en: {
    formatterTagline: "Format JSON locally while preserving number literals, Unicode escapes, duplicate keys and original key order; sort keys only when you choose.",
    minifierTagline: "Minify JSON locally by removing whitespace outside strings while preserving number literals, Unicode escapes, duplicate keys and key order.",
    preserve: "By default, only whitespace outside strings changes. Exact number literals (including large integers, exponents and -0), Unicode escapes, duplicate keys and original key order are preserved. Text is not rebuilt from JavaScript number values.",
    duplicates: "Keeping duplicate keys preserves the source text; it does not guarantee consistent downstream interpretation. Consumers may reject duplicates or select different values. Resolve them before relying on the document's meaning.",
    sorting: "Sorting is off by default. Enable Sort keys A→Z to recursively apply stable lexicographic ordering to decoded key strings using UTF-16 code units. Equal decoded keys keep their relative order; array order and literal spelling stay unchanged. This is not numeric or locale-aware sorting.",
    limits: "Limits: input {input} and output {output} UTF-16 code units; nesting depth {depth}; {values} values, including object and array containers but excluding keys. Over-limit documents are rejected, never truncated. These are code-unit limits, not byte limits.",
    inputStep: "Paste valid JSON within the displayed resource limits.", formatStep: "Choose 2 spaces, 4 spaces or a tab; enable stable key sorting only if wanted.", minifyStep: "Review the compact output; only whitespace outside strings is removed.", reviewStep: "Review literals and any duplicate keys, then copy the result or correct the reported error.",
    preserveQuestion: "What exactly is preserved?", duplicatesQuestion: "Does preserving duplicate keys make them interoperable?", sortQuestion: "What does optional key sorting change?", limitsQuestion: "What are the resource limits?",
    errors: { input: "JSON input exceeds {input} UTF-16 code units. Reduce the input; it was rejected without truncation.", output: "JSON output exceeds {output} UTF-16 code units. Reduce the input or indentation; no partial result is returned.", depth: "JSON nesting depth exceeds {depth}. Reduce nesting; no partial result is returned.", values: "JSON value count exceeds {values}, including object and array containers but excluding keys. Reduce the input; no partial result is returned." },
  },
  zh: {
    formatterTagline: "在本机格式化 JSON，默认保留数字字面量、Unicode 转义、重复键与原始键顺序；仅在主动开启时稳定排序，并明确显示资源限额。",
    minifierTagline: "在本机压缩 JSON，仅删除字符串外的空白，保留数字字面量、Unicode 转义、重复键和原始键顺序；超过资源限额时拒绝处理，不截断内容。",
    preserve: "默认仅改变字符串外的空白。数字字面量（包括大整数、指数和 -0）、Unicode 转义、重复键及原始键顺序均按原文保留，不会先转成 JavaScript 数值再重建文本。",
    duplicates: "保留重复键只表示保留原文，不保证下游解释一致。其他程序可能拒绝重复键，或选择不同的值；依赖文档含义前应先处理重复键。",
    sorting: "默认关闭排序。主动开启“键名 A→Z 排序”后，按解码后的键字符串以 UTF-16 代码单元字典序递归稳定排序；解码后相等的键保留相对顺序，数组顺序与字面量写法不变。这不是数值排序或语言区域排序。",
    limits: "资源限额：输入 {input}、输出 {output} 个 UTF-16 代码单元；嵌套深度 {depth}；值数量 {values}（含对象和数组容器，不含键）。超限会拒绝处理，不截断文本。这里按代码单元计数，不是字节数。",
    inputStep: "粘贴合法 JSON，并遵守显示的资源限额。", formatStep: "选择 2 空格、4 空格或 Tab；只有需要时才主动开启稳定键名排序。", minifyStep: "核对紧凑输出；工具仅移除字符串外的空白。", reviewStep: "检查字面量和重复键后复制结果，或根据错误提示修改输入。",
    preserveQuestion: "哪些内容会按原文保留？", duplicatesQuestion: "保留重复键是否保证其他程序解释一致？", sortQuestion: "可选的键名排序改变什么？", limitsQuestion: "资源限额是多少？",
    errors: { input: "JSON 输入超过 {input} 个 UTF-16 代码单元。请减少输入；已拒绝处理，没有截断。", output: "JSON 输出超过 {output} 个 UTF-16 代码单元。请减少输入或缩进；不会返回部分结果。", depth: "JSON 嵌套深度超过 {depth}。请减少嵌套；不会返回部分结果。", values: "JSON 值数量超过 {values}（含对象和数组容器，不含键）。请减少输入；不会返回部分结果。" },
  },
  ja: {
    formatterTagline: "数値リテラル、Unicode エスケープ、重複キーと元のキー順を保って JSON を端末内で整形。キーの安定ソートは明示的に選んだ場合だけ行います。",
    minifierTagline: "文字列外の空白だけを除き JSON を端末内で圧縮。数値リテラル、Unicode エスケープ、重複キーとキー順を保持し、上限超過時は切り詰めず拒否します。",
    preserve: "既定では文字列外の空白だけを変更します。数値リテラル（大きな整数、指数、-0 を含む）、Unicode エスケープ、重複キー、元のキー順を原文のまま保持します。JavaScript の数値から再構築しません。",
    duplicates: "重複キーの保持は原文の保持であり、後続処理の解釈が一致する保証ではありません。利用側が拒否したり異なる値を選んだりするため、意味に依存する前に重複を解消してください。",
    sorting: "ソートは既定で無効です。キーの A→Z ソートを明示的に選ぶと、復号したキー文字列を UTF-16 コード単位の辞書順で再帰的に安定ソートします。同じキーの相対順、配列順、リテラル表記は維持します。数値順や言語別の照合順ではありません。",
    limits: "上限：入力 {input}、出力 {output} UTF-16 コード単位、入れ子の深さ {depth}、値 {values} 個（オブジェクト・配列の容器を含み、キーは除く）。超過時は切り詰めず拒否します。バイト数ではありません。",
    inputStep: "表示された上限内の有効な JSON を貼り付けます。", formatStep: "2・4 スペースかタブを選び、必要な場合だけ安定キーソートを有効にします。", minifyStep: "文字列外の空白だけが除かれた圧縮結果を確認します。", reviewStep: "リテラルと重複キーを確認してコピーするか、エラーに従って修正します。",
    preserveQuestion: "何が原文のまま保持されますか？", duplicatesQuestion: "重複キーの解釈は他の処理でも同じですか？", sortQuestion: "任意のキーソートは何を変えますか？", limitsQuestion: "リソースの上限は？",
    errors: { input: "JSON 入力が {input} UTF-16 コード単位を超えています。入力を減らしてください。切り詰めず拒否しました。", output: "JSON 出力が {output} UTF-16 コード単位を超えています。入力か字下げを減らしてください。部分結果は返しません。", depth: "JSON の入れ子が深さ {depth} を超えています。入れ子を減らしてください。部分結果は返しません。", values: "JSON の値が {values} 個を超えています（オブジェクト・配列を含み、キーを除く）。入力を減らしてください。部分結果は返しません。" },
  },
  es: {
    formatterTagline: "Formatea JSON localmente y conserva números literales, escapes Unicode, claves duplicadas y orden original; ordena solo si lo eliges.",
    minifierTagline: "Minifica JSON localmente: elimina espacios fuera de cadenas y conserva números literales, escapes Unicode, claves duplicadas y su orden.",
    preserve: "Por defecto solo cambia el espacio fuera de cadenas. Se conservan los números literales exactos (enteros grandes, exponentes y -0), escapes Unicode, claves duplicadas y orden original. No se reconstruye el texto desde números JavaScript.",
    duplicates: "Conservar claves duplicadas conserva el texto, pero no garantiza la misma interpretación posterior. Otros programas pueden rechazarlas o elegir valores distintos. Resuelve las duplicadas antes de confiar en el significado del documento.",
    sorting: "La ordenación está desactivada por defecto. Activa A→Z para ordenar recursiva y establemente las claves decodificadas por orden lexicográfico de unidades UTF-16. Las claves iguales mantienen su orden relativo; no cambian los arrays ni la escritura de los literales. No es orden numérico ni regional.",
    limits: "Límites: entrada {input} y salida {output} unidades UTF-16; profundidad {depth}; {values} valores, incluidos contenedores de objetos y arrays, sin contar claves. Se rechaza el exceso, nunca se trunca. No son límites en bytes.",
    inputStep: "Pega JSON válido dentro de los límites indicados.", formatStep: "Elige 2 espacios, 4 o tabulador; activa la ordenación estable solo si la necesitas.", minifyStep: "Revisa la salida compacta: solo se eliminan espacios fuera de cadenas.", reviewStep: "Revisa literales y claves duplicadas, copia el resultado o corrige el error indicado.",
    preserveQuestion: "¿Qué se conserva exactamente?", duplicatesQuestion: "¿Las claves duplicadas se interpretarán igual en otros programas?", sortQuestion: "¿Qué cambia la ordenación opcional?", limitsQuestion: "¿Cuáles son los límites?",
    errors: { input: "La entrada JSON supera {input} unidades UTF-16. Redúcela; se ha rechazado sin truncarla.", output: "La salida JSON supera {output} unidades UTF-16. Reduce la entrada o sangría; no se devuelve un resultado parcial.", depth: "La profundidad JSON supera {depth}. Reduce la anidación; no se devuelve un resultado parcial.", values: "JSON supera {values} valores, incluidos objetos y arrays, sin claves. Reduce la entrada; no se devuelve un resultado parcial." },
  },
  pt: {
    formatterTagline: "Formate JSON localmente preservando números literais, escapes Unicode, chaves duplicadas e ordem original; ordene só quando escolher.",
    minifierTagline: "Minifique JSON localmente, removendo espaços fora de strings e preservando números literais, escapes Unicode, chaves duplicadas e ordem.",
    preserve: "Por padrão, só muda o espaço fora de strings. Números literais exatos (inteiros grandes, expoentes e -0), escapes Unicode, chaves duplicadas e ordem original são preservados. O texto não é reconstruído a partir de números JavaScript.",
    duplicates: "Preservar chaves duplicadas preserva o texto, sem garantir interpretação igual em sistemas posteriores. Eles podem rejeitar duplicatas ou escolher valores diferentes. Resolva as duplicatas antes de depender do significado do documento.",
    sorting: "A ordenação começa desativada. Ative A→Z para ordenar recursiva e estavelmente as chaves decodificadas pela ordem lexicográfica de unidades UTF-16. Chaves iguais mantêm a ordem relativa; arrays e grafia dos literais não mudam. Não é ordenação numérica nem regional.",
    limits: "Limites: entrada {input} e saída {output} unidades UTF-16; profundidade {depth}; {values} valores, incluindo contêineres de objetos e arrays, excluindo chaves. O excesso é rejeitado, nunca truncado. Não são limites em bytes.",
    inputStep: "Cole JSON válido dentro dos limites exibidos.", formatStep: "Escolha 2 espaços, 4 ou tabulação; ative a ordenação estável apenas se desejar.", minifyStep: "Confira a saída compacta: apenas espaços fora de strings são removidos.", reviewStep: "Revise literais e chaves duplicadas, copie o resultado ou corrija o erro informado.",
    preserveQuestion: "O que é preservado exatamente?", duplicatesQuestion: "Duplicatas terão a mesma interpretação em outros sistemas?", sortQuestion: "O que a ordenação opcional altera?", limitsQuestion: "Quais são os limites?",
    errors: { input: "A entrada JSON excede {input} unidades UTF-16. Reduza a entrada; ela foi rejeitada sem truncamento.", output: "A saída JSON excede {output} unidades UTF-16. Reduza a entrada ou indentação; não há resultado parcial.", depth: "A profundidade JSON excede {depth}. Reduza os níveis; não há resultado parcial.", values: "JSON excede {values} valores, incluindo objetos e arrays, excluindo chaves. Reduza a entrada; não há resultado parcial." },
  },
  fr: {
    formatterTagline: "Formatez le JSON localement en conservant nombres littéraux, échappements Unicode, clés doubles et ordre initial ; tri sur demande.",
    minifierTagline: "Minifiez le JSON localement : retirez les blancs hors chaînes et gardez nombres littéraux, échappements Unicode, clés doubles et ordre.",
    preserve: "Par défaut, seuls les blancs hors chaînes changent. Les nombres littéraux exacts (grands entiers, exposants et -0), échappements Unicode, clés en double et ordre initial sont conservés. Le texte n'est pas reconstruit à partir de nombres JavaScript.",
    duplicates: "Conserver les clés en double préserve le texte, sans garantir une interprétation identique en aval. Les logiciels peuvent les refuser ou choisir d'autres valeurs. Résolvez les doublons avant de vous fier au sens du document.",
    sorting: "Le tri est désactivé par défaut. Activez A→Z pour trier récursivement et de façon stable les clés décodées selon l'ordre lexicographique des unités UTF-16. Les clés égales gardent leur ordre relatif ; tableaux et écriture des littéraux restent inchangés. Ce n'est ni un tri numérique ni un tri linguistique.",
    limits: "Limites : entrée {input} et sortie {output} unités UTF-16 ; profondeur {depth} ; {values} valeurs, objets et tableaux conteneurs inclus, clés exclues. Tout dépassement est refusé, jamais tronqué. Il ne s'agit pas d'octets.",
    inputStep: "Collez un JSON valide respectant les limites affichées.", formatStep: "Choisissez 2 espaces, 4 ou une tabulation ; activez le tri stable seulement si souhaité.", minifyStep: "Vérifiez la sortie compacte : seuls les blancs hors chaînes sont retirés.", reviewStep: "Vérifiez littéraux et doublons, puis copiez le résultat ou corrigez l'erreur indiquée.",
    preserveQuestion: "Qu'est-ce qui est conservé ?", duplicatesQuestion: "Les doublons ont-ils le même sens en aval ?", sortQuestion: "Que change le tri facultatif ?", limitsQuestion: "Quelles sont les limites ?",
    errors: { input: "L'entrée JSON dépasse {input} unités UTF-16. Réduisez-la ; elle est refusée sans troncature.", output: "La sortie JSON dépasse {output} unités UTF-16. Réduisez l'entrée ou l'indentation ; aucun résultat partiel n'est renvoyé.", depth: "La profondeur JSON dépasse {depth}. Réduisez l'imbrication ; aucun résultat partiel n'est renvoyé.", values: "JSON dépasse {values} valeurs, objets et tableaux inclus, clés exclues. Réduisez l'entrée ; aucun résultat partiel n'est renvoyé." },
  },
  de: {
    formatterTagline: "JSON lokal formatieren: Zahlenliterale, Unicode-Escapes, doppelte Schlüssel und ursprüngliche Reihenfolge erhalten; Sortierung nur auf Wunsch.",
    minifierTagline: "JSON lokal verkleinern: Leerraum außerhalb von Strings entfernen; Zahlenliterale, Unicode-Escapes, doppelte Schlüssel und Reihenfolge bewahren.",
    preserve: "Standardmäßig ändert sich nur Leerraum außerhalb von Strings. Exakte Zahlenliterale (große Ganzzahlen, Exponenten und -0), Unicode-Escapes, doppelte Schlüssel und die ursprüngliche Reihenfolge bleiben erhalten. Der Text wird nicht aus JavaScript-Zahlen neu aufgebaut.",
    duplicates: "Doppelte Schlüssel zu erhalten bewahrt den Quelltext, garantiert aber keine einheitliche Auslegung in nachfolgenden Programmen. Diese können Duplikate ablehnen oder andere Werte wählen. Bereinigen Sie sie vor der weiteren Nutzung.",
    sorting: "Sortierung ist zunächst aus. A→Z sortiert auf Wunsch rekursiv und stabil nach den dekodierten Schlüsselstrings in lexikografischer UTF-16-Reihenfolge. Gleiche Schlüssel behalten ihre relative Reihenfolge; Arrays und Literalschreibweisen bleiben unverändert. Keine numerische oder sprachabhängige Sortierung.",
    limits: "Grenzen: Eingabe {input} und Ausgabe {output} UTF-16-Codeeinheiten; Tiefe {depth}; {values} Werte einschließlich Objekt- und Array-Container, ohne Schlüssel. Überschreitungen werden abgelehnt, nie abgeschnitten. Das sind keine Bytegrenzen.",
    inputStep: "Gültiges JSON innerhalb der angezeigten Grenzen einfügen.", formatStep: "2 oder 4 Leerzeichen bzw. Tab wählen; stabile Schlüsselsortierung nur bei Bedarf einschalten.", minifyStep: "Kompakte Ausgabe prüfen: Nur Leerraum außerhalb von Strings wird entfernt.", reviewStep: "Literale und doppelte Schlüssel prüfen, dann kopieren oder gemeldete Fehler korrigieren.",
    preserveQuestion: "Was bleibt genau erhalten?", duplicatesQuestion: "Werden doppelte Schlüssel überall gleich interpretiert?", sortQuestion: "Was ändert die optionale Sortierung?", limitsQuestion: "Welche Ressourcengrenzen gelten?",
    errors: { input: "Die JSON-Eingabe überschreitet {input} UTF-16-Codeeinheiten. Eingabe reduzieren; sie wurde ohne Abschneiden abgelehnt.", output: "Die JSON-Ausgabe überschreitet {output} UTF-16-Codeeinheiten. Eingabe oder Einrückung reduzieren; keine Teilausgabe.", depth: "Die JSON-Verschachtelung überschreitet Tiefe {depth}. Verschachtelung reduzieren; keine Teilausgabe.", values: "JSON überschreitet {values} Werte einschließlich Objekten und Arrays, ohne Schlüssel. Eingabe reduzieren; keine Teilausgabe." },
  },
  ru: {
    formatterTagline: "Форматируйте JSON локально, сохраняя числовые литералы, Unicode-экранирование, повторяющиеся ключи и исходный порядок; сортировка по выбору.",
    minifierTagline: "Сжимайте JSON локально: удаляйте пробелы вне строк, сохраняя числовые литералы, Unicode-экранирование, повторяющиеся ключи и их порядок.",
    preserve: "По умолчанию меняются только пробелы вне строк. Точные числовые литералы (большие целые, экспоненты и -0), Unicode-экранирование, повторяющиеся ключи и исходный порядок сохраняются. Текст не пересобирается из чисел JavaScript.",
    duplicates: "Сохранение повторяющихся ключей сохраняет текст, но не гарантирует одинаковую интерпретацию последующими программами. Они могут отклонить повторы или выбрать разные значения. Устраните повторы, прежде чем полагаться на смысл документа.",
    sorting: "Сортировка изначально выключена. Включите A→Z для рекурсивной стабильной лексикографической сортировки декодированных ключей по единицам UTF-16. Равные ключи сохраняют взаимный порядок; порядок массивов и запись литералов не меняются. Это не числовая и не языковая сортировка.",
    limits: "Пределы: ввод {input} и вывод {output} единиц UTF-16; глубина {depth}; {values} значений, включая контейнеры объектов и массивов, но не ключи. Превышение отклоняется без обрезки. Это не лимиты в байтах.",
    inputStep: "Вставьте корректный JSON в пределах указанных ограничений.", formatStep: "Выберите 2 или 4 пробела либо табуляцию; включайте стабильную сортировку только при необходимости.", minifyStep: "Проверьте компактный вывод: удаляются только пробелы вне строк.", reviewStep: "Проверьте литералы и повторы ключей, скопируйте результат или исправьте указанную ошибку.",
    preserveQuestion: "Что именно сохраняется?", duplicatesQuestion: "Одинаково ли другие программы понимают повторяющиеся ключи?", sortQuestion: "Что меняет необязательная сортировка?", limitsQuestion: "Каковы ограничения ресурсов?",
    errors: { input: "Ввод JSON превышает {input} единиц UTF-16. Уменьшите ввод; он отклонён без обрезки.", output: "Вывод JSON превышает {output} единиц UTF-16. Уменьшите ввод или отступы; частичного результата нет.", depth: "Глубина JSON превышает {depth}. Уменьшите вложенность; частичного результата нет.", values: "JSON содержит более {values} значений, включая объекты и массивы, без ключей. Уменьшите ввод; частичного результата нет." },
  },
  it: {
    formatterTagline: "Formatta JSON localmente conservando numeri letterali, escape Unicode, chiavi duplicate e ordine originale; ordina solo su tua richiesta.",
    minifierTagline: "Minifica JSON localmente: rimuove gli spazi fuori dalle stringhe e conserva numeri letterali, escape Unicode, chiavi duplicate e ordine.",
    preserve: "Per impostazione iniziale cambia solo lo spazio fuori dalle stringhe. Numeri letterali esatti (interi grandi, esponenti e -0), escape Unicode, chiavi duplicate e ordine originale restano invariati. Il testo non viene ricostruito da numeri JavaScript.",
    duplicates: "Conservare chiavi duplicate preserva il testo, senza garantire la stessa interpretazione nei programmi successivi. Possono rifiutarle o scegliere valori diversi. Risolvi i duplicati prima di fare affidamento sul significato del documento.",
    sorting: "L'ordinamento è inizialmente disattivato. Attiva A→Z per ordinare ricorsivamente e stabilmente le chiavi decodificate in ordine lessicografico di unità UTF-16. Le chiavi uguali mantengono l'ordine relativo; array e grafia dei letterali non cambiano. Non è un ordine numerico o linguistico.",
    limits: "Limiti: ingresso {input} e uscita {output} unità UTF-16; profondità {depth}; {values} valori, compresi contenitori oggetto e array, escluse le chiavi. Gli eccessi vengono rifiutati, mai troncati. Non sono limiti in byte.",
    inputStep: "Incolla JSON valido entro i limiti mostrati.", formatStep: "Scegli 2 spazi, 4 o tabulazione; attiva l'ordinamento stabile solo se desiderato.", minifyStep: "Controlla l'uscita compatta: si rimuovono solo spazi fuori dalle stringhe.", reviewStep: "Controlla letterali e duplicati, quindi copia il risultato o correggi l'errore indicato.",
    preserveQuestion: "Che cosa viene conservato?", duplicatesQuestion: "I duplicati avranno lo stesso significato altrove?", sortQuestion: "Che cosa cambia l'ordinamento facoltativo?", limitsQuestion: "Quali limiti si applicano?",
    errors: { input: "L'ingresso JSON supera {input} unità UTF-16. Riducilo: è stato rifiutato senza troncamento.", output: "L'uscita JSON supera {output} unità UTF-16. Riduci ingresso o rientri; nessun risultato parziale.", depth: "La profondità JSON supera {depth}. Riduci i livelli; nessun risultato parziale.", values: "JSON supera {values} valori, compresi oggetti e array ma escluse le chiavi. Riduci l'ingresso; nessun risultato parziale." },
  },
  tr: {
    formatterTagline: "JSON'u yerelde biçimlendirin; sayı yazımları, Unicode kaçışları, yinelenen anahtarlar ve ilk sıra korunsun. Sıralamayı yalnızca siz açın.",
    minifierTagline: "JSON'u yerelde küçültün: dizeler dışındaki boşluğu silin; sayı yazımlarını, Unicode kaçışlarını, yinelenen anahtarları ve sırayı koruyun.",
    preserve: "Varsayılan olarak yalnızca dizeler dışındaki boşluk değişir. Sayıların tam yazımı (büyük tam sayılar, üsler ve -0), Unicode kaçışları, yinelenen anahtarlar ve ilk sıra korunur. Metin JavaScript sayılarından yeniden oluşturulmaz.",
    duplicates: "Yinelenen anahtarları korumak metni korur; sonraki programların aynı yorumlayacağını garanti etmez. Programlar bunları reddedebilir veya farklı değerler seçebilir. Belgenin anlamına güvenmeden önce yinelenenleri çözün.",
    sorting: "Sıralama başlangıçta kapalıdır. A→Z açılınca çözümlenmiş anahtar dizeleri UTF-16 kod birimlerine göre sözlük sırasında, özyinelemeli ve kararlı sıralanır. Eşit anahtarların göreli sırası, dizi sırası ve sabitlerin yazımı korunur. Sayısal veya dile özgü sıralama değildir.",
    limits: "Sınırlar: girdi {input}, çıktı {output} UTF-16 kod birimi; derinlik {depth}; nesne ve dizi kapsayıcıları dahil, anahtarlar hariç {values} değer. Sınır aşımı reddedilir, metin kesilmez. Bunlar bayt sınırı değildir.",
    inputStep: "Gösterilen sınırlar içinde geçerli JSON yapıştırın.", formatStep: "2 boşluk, 4 boşluk veya sekme seçin; kararlı anahtar sırasını yalnızca isterseniz açın.", minifyStep: "Küçük çıktıyı inceleyin: yalnızca dizeler dışındaki boşluk silinir.", reviewStep: "Sayı yazımlarını ve yinelenen anahtarları kontrol edip kopyalayın veya hatayı düzeltin.",
    preserveQuestion: "Tam olarak ne korunur?", duplicatesQuestion: "Yinelenen anahtarlar sonraki programlarda aynı mı yorumlanır?", sortQuestion: "İsteğe bağlı sıralama neyi değiştirir?", limitsQuestion: "Kaynak sınırları nelerdir?",
    errors: { input: "JSON girdisi {input} UTF-16 kod birimini aşıyor. Girdiyi azaltın; kesilmeden reddedildi.", output: "JSON çıktısı {output} UTF-16 kod birimini aşıyor. Girdiyi veya girintiyi azaltın; kısmi sonuç verilmez.", depth: "JSON derinliği {depth} sınırını aşıyor. İç içe düzeyleri azaltın; kısmi sonuç verilmez.", values: "JSON, nesne ve diziler dahil, anahtarlar hariç {values} değeri aşıyor. Girdiyi azaltın; kısmi sonuç verilmez." },
  },
  ko: {
    formatterTagline: "숫자 리터럴, Unicode 이스케이프, 중복 키와 원래 키 순서를 보존하며 기기에서 JSON을 정리합니다. 안정 정렬은 직접 켤 때만 적용합니다.",
    minifierTagline: "문자열 밖의 공백만 지워 기기에서 JSON을 압축합니다. 숫자 리터럴, Unicode 이스케이프, 중복 키와 순서를 보존하며 한도 초과 시 잘라내지 않고 거부합니다.",
    preserve: "기본적으로 문자열 밖의 공백만 바꿉니다. 정확한 숫자 리터럴(큰 정수, 지수, -0 포함), Unicode 이스케이프, 중복 키와 원래 키 순서를 그대로 보존합니다. JavaScript 숫자로 바꾼 뒤 텍스트를 다시 만들지 않습니다.",
    duplicates: "중복 키 보존은 원문 보존이며 이후 프로그램의 해석이 같다는 보장은 아닙니다. 다른 프로그램은 중복을 거부하거나 다른 값을 고를 수 있습니다. 문서의 의미에 의존하기 전에 중복을 해결하세요.",
    sorting: "정렬은 기본적으로 꺼져 있습니다. A→Z를 켜면 디코딩한 키 문자열을 UTF-16 코드 단위의 사전 순서로 재귀적으로 안정 정렬합니다. 같은 키의 상대 순서, 배열 순서와 리터럴 표기는 유지합니다. 숫자순 또는 언어별 정렬은 아닙니다.",
    limits: "한도: 입력 {input}, 출력 {output} UTF-16 코드 단위, 중첩 깊이 {depth}, 값 {values}개(객체·배열 컨테이너 포함, 키 제외). 초과하면 잘라내지 않고 거부합니다. 바이트 한도가 아닙니다.",
    inputStep: "표시된 자원 한도 안의 유효한 JSON을 붙여넣으세요.", formatStep: "공백 2개, 4개 또는 탭을 고르고 원할 때만 안정 키 정렬을 켜세요.", minifyStep: "문자열 밖의 공백만 제거된 압축 결과를 확인하세요.", reviewStep: "리터럴과 중복 키를 확인한 뒤 복사하거나 표시된 오류를 수정하세요.",
    preserveQuestion: "무엇을 그대로 보존하나요?", duplicatesQuestion: "다른 프로그램도 중복 키를 똑같이 해석하나요?", sortQuestion: "선택적 키 정렬은 무엇을 바꾸나요?", limitsQuestion: "자원 한도는 얼마인가요?",
    errors: { input: "JSON 입력이 {input} UTF-16 코드 단위를 넘습니다. 입력을 줄이세요. 잘라내지 않고 거부했습니다.", output: "JSON 출력이 {output} UTF-16 코드 단위를 넘습니다. 입력이나 들여쓰기를 줄이세요. 일부 결과는 반환하지 않습니다.", depth: "JSON 중첩 깊이가 {depth}을 넘습니다. 중첩을 줄이세요. 일부 결과는 반환하지 않습니다.", values: "JSON 값이 {values}개를 넘습니다(객체·배열 포함, 키 제외). 입력을 줄이세요. 일부 결과는 반환하지 않습니다." },
  },
  ar: {
    formatterTagline: "نسّق JSON محلياً مع حفظ صيغ الأرقام وهروب Unicode والمفاتيح المكررة وترتيبها الأصلي؛ لا يُطبّق الفرز المستقر إلا عند اختياره.",
    minifierTagline: "صغّر JSON محلياً بحذف الفراغات خارج النصوص فقط، مع حفظ صيغ الأرقام وهروب Unicode والمفاتيح المكررة وترتيبها، ورفض تجاوز الحدود.",
    preserve: "افتراضياً تتغير الفراغات خارج النصوص فقط. تُحفظ صيغ الأرقام الدقيقة، بما فيها الأعداد الصحيحة الكبيرة والأسس و-0، وهروب Unicode والمفاتيح المكررة والترتيب الأصلي. لا يُعاد بناء النص من أرقام JavaScript.",
    duplicates: "حفظ المفاتيح المكررة يحفظ النص ولا يضمن تفسيراً موحداً في البرامج اللاحقة. قد ترفضها البرامج أو تختار قيماً مختلفة. عالج التكرار قبل الاعتماد على معنى المستند.",
    sorting: "الفرز معطّل افتراضياً. فعّل A→Z لفرز المفاتيح بعد فك هروبها تكرارياً وبثبات وفق الترتيب المعجمي لوحدات UTF-16. تبقى المفاتيح المتساوية بترتيبها النسبي، ولا يتغير ترتيب المصفوفات أو صيغ القيم. ليس فرزاً عددياً أو لغوياً.",
    limits: "الحدود: الإدخال {input} والإخراج {output} وحدة UTF-16؛ عمق التداخل {depth}؛ عدد القيم {values} شاملاً حاويات الكائنات والمصفوفات دون المفاتيح. يُرفض التجاوز دون اقتطاع. هذه ليست حدود بايتات.",
    inputStep: "الصق JSON صالحاً ضمن الحدود المعروضة.", formatStep: "اختر مسافتين أو أربعاً أو جدولة، وفعّل الفرز المستقر عند الرغبة فقط.", minifyStep: "راجع الإخراج المضغوط؛ لا تُحذف إلا الفراغات خارج النصوص.", reviewStep: "راجع صيغ القيم والمفاتيح المكررة ثم انسخ النتيجة أو أصلح الخطأ المعروض.",
    preserveQuestion: "ما الذي يُحفظ كما هو؟", duplicatesQuestion: "هل تتفق البرامج اللاحقة على تفسير المفاتيح المكررة؟", sortQuestion: "ماذا يغيّر الفرز الاختياري؟", limitsQuestion: "ما حدود الموارد؟",
    errors: { input: "يتجاوز إدخال JSON حد {input} وحدة UTF-16. قلّل الإدخال؛ رُفض دون اقتطاع.", output: "يتجاوز إخراج JSON حد {output} وحدة UTF-16. قلّل الإدخال أو المسافات البادئة؛ لا تُعاد نتيجة جزئية.", depth: "يتجاوز عمق JSON الحد {depth}. قلّل التداخل؛ لا تُعاد نتيجة جزئية.", values: "يتجاوز JSON عدد {values} قيمة شاملاً الكائنات والمصفوفات دون المفاتيح. قلّل الإدخال؛ لا تُعاد نتيجة جزئية." },
  },
  hi: {
    formatterTagline: "JSON स्थानीय रूप से सजाएँ; संख्या लिटरल, Unicode एस्केप, दोहराई कुंजियाँ और मूल क्रम बनाए रखें। स्थिर क्रमबद्धता केवल चुनने पर लगेगी।",
    minifierTagline: "स्ट्रिंग के बाहर की खाली जगह हटाकर JSON स्थानीय रूप से छोटा करें; संख्या लिटरल, Unicode एस्केप, दोहराई कुंजियाँ और उनका क्रम सुरक्षित रहें।",
    preserve: "डिफ़ॉल्ट रूप से केवल स्ट्रिंग के बाहर की खाली जगह बदलती है। संख्या लिटरल का सटीक लेखन (बड़े पूर्णांक, घात और -0), Unicode एस्केप, दोहराई कुंजियाँ और मूल क्रम सुरक्षित रहते हैं। JavaScript संख्याओं से पाठ दोबारा नहीं बनाया जाता।",
    duplicates: "दोहराई कुंजियाँ बनाए रखना मूल पाठ को बचाता है, पर आगे के प्रोग्राम एक ही अर्थ निकालेंगे, इसकी गारंटी नहीं है। वे उन्हें अस्वीकार कर सकते हैं या अलग मान चुन सकते हैं। दस्तावेज़ के अर्थ पर निर्भर होने से पहले दोहराव सुलझाएँ।",
    sorting: "क्रमबद्धता शुरू में बंद है। A→Z चालू करने पर डिकोड की गई कुंजियों को UTF-16 कोड इकाइयों के शब्दकोश क्रम में पुनरावर्ती स्थिर क्रम दिया जाता है। समान कुंजियों का आपसी क्रम, ऐरे का क्रम और लिटरल लेखन नहीं बदलता। यह संख्यात्मक या भाषा-आधारित क्रम नहीं है।",
    limits: "सीमाएँ: इनपुट {input}, आउटपुट {output} UTF-16 कोड इकाइयाँ; गहराई {depth}; {values} मान, जिनमें ऑब्जेक्ट और ऐरे कंटेनर शामिल हैं, कुंजियाँ नहीं। सीमा पार होने पर बिना काटे अस्वीकार किया जाता है। ये बाइट सीमाएँ नहीं हैं।",
    inputStep: "दिखाई सीमाओं के अंदर मान्य JSON पेस्ट करें।", formatStep: "2 स्पेस, 4 स्पेस या टैब चुनें; स्थिर कुंजी क्रम केवल चाहने पर चालू करें।", minifyStep: "संक्षिप्त आउटपुट देखें; केवल स्ट्रिंग के बाहर की खाली जगह हटती है।", reviewStep: "लिटरल और दोहराई कुंजियाँ जाँचकर कॉपी करें या दिखाई त्रुटि सुधारें।",
    preserveQuestion: "ठीक क्या सुरक्षित रहता है?", duplicatesQuestion: "क्या आगे के प्रोग्राम दोहराई कुंजियों को समान समझेंगे?", sortQuestion: "वैकल्पिक कुंजी क्रम क्या बदलता है?", limitsQuestion: "संसाधन सीमाएँ क्या हैं?",
    errors: { input: "JSON इनपुट {input} UTF-16 कोड इकाइयों से अधिक है। इनपुट घटाएँ; बिना काटे अस्वीकार किया गया है।", output: "JSON आउटपुट {output} UTF-16 कोड इकाइयों से अधिक है। इनपुट या इंडेंट घटाएँ; आंशिक परिणाम नहीं मिलेगा।", depth: "JSON की गहराई {depth} से अधिक है। नेस्टिंग घटाएँ; आंशिक परिणाम नहीं मिलेगा।", values: "JSON में {values} से अधिक मान हैं, ऑब्जेक्ट और ऐरे सहित, कुंजियाँ छोड़कर। इनपुट घटाएँ; आंशिक परिणाम नहीं मिलेगा।" },
  },
  id: {
    formatterTagline: "Format JSON secara lokal, pertahankan literal angka, escape Unicode, kunci duplikat dan urutan awal; pengurutan stabil hanya jika dipilih.",
    minifierTagline: "Minifikasi JSON secara lokal: hapus spasi di luar string dan pertahankan literal angka, escape Unicode, kunci duplikat serta urutannya.",
    preserve: "Secara bawaan hanya spasi di luar string yang berubah. Literal angka persis (bilangan bulat besar, eksponen dan -0), escape Unicode, kunci duplikat dan urutan awal tetap dipertahankan. Teks tidak dibangun ulang dari angka JavaScript.",
    duplicates: "Mempertahankan kunci duplikat menjaga teks sumber, bukan menjamin penafsiran yang sama oleh program berikutnya. Program dapat menolaknya atau memilih nilai berbeda. Selesaikan duplikat sebelum mengandalkan makna dokumen.",
    sorting: "Pengurutan awalnya mati. Aktifkan A→Z untuk mengurutkan kunci yang telah didekode secara rekursif dan stabil menurut urutan leksikografis unit UTF-16. Kunci sama tetap dalam urutan relatifnya; urutan array dan ejaan literal tidak berubah. Bukan pengurutan angka atau lokal bahasa.",
    limits: "Batas: masukan {input} dan keluaran {output} unit UTF-16; kedalaman {depth}; {values} nilai termasuk wadah objek dan array, tanpa kunci. Kelebihan ditolak, tidak dipotong. Ini bukan batas bita.",
    inputStep: "Tempel JSON valid dalam batas yang ditampilkan.", formatStep: "Pilih 2 spasi, 4 spasi atau tab; aktifkan pengurutan stabil hanya jika diinginkan.", minifyStep: "Tinjau keluaran ringkas: hanya spasi di luar string yang dihapus.", reviewStep: "Periksa literal dan kunci duplikat, lalu salin hasil atau perbaiki kesalahan yang ditampilkan.",
    preserveQuestion: "Apa yang dipertahankan persis?", duplicatesQuestion: "Apakah program berikutnya menafsirkan kunci duplikat sama?", sortQuestion: "Apa yang diubah pengurutan opsional?", limitsQuestion: "Apa batas sumber dayanya?",
    errors: { input: "Masukan JSON melebihi {input} unit UTF-16. Kurangi masukan; ditolak tanpa pemotongan.", output: "Keluaran JSON melebihi {output} unit UTF-16. Kurangi masukan atau indentasi; tidak ada hasil parsial.", depth: "Kedalaman JSON melebihi {depth}. Kurangi tingkat bersarang; tidak ada hasil parsial.", values: "JSON melebihi {values} nilai termasuk objek dan array, tanpa kunci. Kurangi masukan; tidak ada hasil parsial." },
  },
  vi: {
    formatterTagline: "Định dạng JSON cục bộ, giữ nguyên số dạng chữ, escape Unicode, khóa trùng và thứ tự gốc; chỉ sắp xếp ổn định khi bạn chọn.",
    minifierTagline: "Thu gọn JSON cục bộ bằng cách bỏ khoảng trắng ngoài chuỗi, giữ nguyên số dạng chữ, escape Unicode, khóa trùng và thứ tự của khóa.",
    preserve: "Mặc định chỉ khoảng trắng ngoài chuỗi thay đổi. Giữ nguyên cách viết số (số nguyên lớn, số mũ và -0), escape Unicode, khóa trùng và thứ tự gốc. Không dựng lại văn bản từ giá trị số JavaScript.",
    duplicates: "Giữ khóa trùng là giữ văn bản nguồn, không bảo đảm các chương trình phía sau hiểu giống nhau. Chúng có thể từ chối khóa trùng hoặc chọn giá trị khác. Hãy xử lý trùng lặp trước khi dựa vào ý nghĩa tài liệu.",
    sorting: "Mặc định tắt sắp xếp. Bật A→Z để sắp xếp đệ quy, ổn định theo thứ tự từ điển của khóa đã giải mã bằng đơn vị UTF-16. Khóa bằng nhau giữ thứ tự tương đối; thứ tự mảng và cách viết giá trị không đổi. Đây không phải thứ tự số hay theo ngôn ngữ.",
    limits: "Giới hạn: đầu vào {input}, đầu ra {output} đơn vị UTF-16; độ sâu {depth}; {values} giá trị gồm cả vùng chứa đối tượng và mảng, không tính khóa. Vượt giới hạn sẽ bị từ chối, không cắt bớt. Đây không phải giới hạn byte.",
    inputStep: "Dán JSON hợp lệ trong giới hạn hiển thị.", formatStep: "Chọn 2 dấu cách, 4 dấu cách hoặc tab; chỉ bật sắp xếp ổn định khi cần.", minifyStep: "Kiểm tra đầu ra gọn: chỉ bỏ khoảng trắng ngoài chuỗi.", reviewStep: "Kiểm tra cách viết giá trị và khóa trùng, rồi sao chép hoặc sửa lỗi hiển thị.",
    preserveQuestion: "Chính xác những gì được giữ nguyên?", duplicatesQuestion: "Các chương trình phía sau có hiểu khóa trùng giống nhau không?", sortQuestion: "Sắp xếp tùy chọn thay đổi gì?", limitsQuestion: "Giới hạn tài nguyên là gì?",
    errors: { input: "Đầu vào JSON vượt {input} đơn vị UTF-16. Hãy giảm đầu vào; đã từ chối mà không cắt bớt.", output: "Đầu ra JSON vượt {output} đơn vị UTF-16. Giảm đầu vào hoặc thụt lề; không trả kết quả một phần.", depth: "Độ sâu JSON vượt {depth}. Giảm số cấp lồng nhau; không trả kết quả một phần.", values: "JSON vượt {values} giá trị gồm đối tượng và mảng, không tính khóa. Giảm đầu vào; không trả kết quả một phần." },
  },
};

const LIMIT_VALUES = {
  input: JSON_FORMAT_LIMITS.inputCharacters.toLocaleString("en-US"),
  output: JSON_FORMAT_LIMITS.outputCharacters.toLocaleString("en-US"),
  depth: JSON_FORMAT_LIMITS.maxDepth.toLocaleString("en-US"),
  values: JSON_FORMAT_LIMITS.maxValues.toLocaleString("en-US"),
};

export function jsonFormatResourceNote(locale: Locale): string {
  return fill(JSON_CAPABILITY_MESSAGES[locale].limits, LIMIT_VALUES);
}

export function jsonFormatLimitMessage(locale: Locale, kind: JsonFormatLimitKind): string {
  return fill(JSON_CAPABILITY_MESSAGES[locale].errors[kind], LIMIT_VALUES);
}

/** Apply after locale overlays so obsolete capability promises cannot leak back. */
export function jsonCapabilityCopy(locale: Locale, base: ToolCopy, mode: "formatter" | "minifier"): ToolCopy {
  const l = JSON_CAPABILITY_MESSAGES[locale];
  const limits = jsonFormatResourceNote(locale);
  return {
    ...base,
    tagline: mode === "formatter" ? l.formatterTagline : l.minifierTagline,
    intro: [l.preserve, ...(mode === "formatter" ? [l.sorting] : []), l.duplicates, limits],
    steps: [l.inputStep, mode === "formatter" ? l.formatStep : l.minifyStep, l.reviewStep],
    faqs: [
      { q: l.preserveQuestion, a: l.preserve },
      ...(mode === "formatter" ? [{ q: l.sortQuestion, a: l.sorting }] : []),
      { q: l.duplicatesQuestion, a: l.duplicates },
      { q: l.limitsQuestion, a: limits },
    ],
    deepDive: undefined,
  };
}
